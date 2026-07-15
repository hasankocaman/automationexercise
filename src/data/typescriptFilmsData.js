// TypeScript video-scene filmleri — LAZY-LOADED ayrı chunk.
//
// typescriptData.js chunk boyutu (350KB gzip eşiğine yakın, CLAUDE.md
// Bölüm 4) nedeniyle film verileri BU dosyaya taşındı ve typescriptData.js
// içindeki placeholder bloklar (`{ type: 'video-scene', lazyLoader, filmId }`)
// üzerinden `VideoSceneBlock.jsx`'in desteklediği lazy-loading mekanizmasıyla
// asenkron çözülür — ana typescriptData chunk'ı büyümez, film verisi SADECE
// o video-scene bloğu ekranda render edildiğinde ayrı bir chunk olarak
// indirilir. Yeni film eklerken: sabiti bu dosyaya ekle, aşağıdaki default
// export map'ine `[id]: sabit` olarak ekle, typescriptData.js'e SADECE
// `{ type: 'video-scene', lazyLoader: () => import('./typescriptFilmsData.js'), filmId: '...' }`
// placeholder'ı ekle.

const tsCompileChainFilm = {
  type: 'video-scene',
  id: 'ts-compile-chain-film',
  title: {
    tr: '🎬 tsc Derleme Zinciri: .ts\'ten Çalışan .js\'e',
    en: '🎬 The tsc Compile Chain: From .ts to Runnable .js',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'src', emoji: '📄', label: { tr: 'login.ts (kaynak kod)', en: 'login.ts (source)' }, color: '#0ea5e9' },
    { id: 'tsc', emoji: '🔎', label: { tr: 'tsc (Type Checker)', en: 'tsc (Type Checker)' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Tip Hatası — DURDURULDU', en: 'Type Error — HALTED' }, color: '#ef4444' },
    { id: 'js', emoji: '📜', label: { tr: 'login.js (düz JavaScript)', en: 'login.js (plain JavaScript)' }, color: '#22c55e' },
    { id: 'runtime', emoji: '🌐', label: { tr: 'Tarayıcı / Node.js', en: 'Browser / Node.js' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Tarayıcı ve Node.js `.ts` dosyasını DOĞRUDAN çalıştıramaz — sadece düz JavaScript anlar. Peki o zaman TypeScript kodu nasıl "çalışıyor"?',
        en: 'Neither the browser nor Node.js can run a `.ts` file DIRECTLY — they only understand plain JavaScript. So how does TypeScript code actually "run"?',
      },
      positions: { src: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — `tsc login.ts` çalıştırılır. Derleyici önce kodu OKUR ve her değişkenin/parametrenin tipini kontrol eder — bu adımda HENÜZ hiçbir JavaScript üretilmedi.',
        en: 'Step 1 — `tsc login.ts` runs. The compiler first READS the code and checks every variable/parameter\'s type — at this point NO JavaScript has been produced yet.',
      },
      code: { tr: `function login(username: string, password: string) {\n  // ...\n}`, en: `function login(username: string, password: string) {\n  // ...\n}` },
      positions: {
        src: { x: 20, y: 40, scale: 1.0 },
        tsc: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'src', to: 'tsc', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 (kontrast/hayalet) — eğer kodda `login(username, 12345)` gibi yanlış tipte bir argüman varsa, tsc BURADA durur: hiçbir `.js` dosyası üretilmez, hata mesajı verilir. Bu, "derleme zamanında yakalama" dediğimiz şeydir.',
        en: 'Step 2 (the contrast/ghost) — if the code has a wrong-typed argument like `login(username, 12345)`, tsc STOPS right here: no `.js` file gets produced, an error is reported. This is what "catching it at compile time" means.',
      },
      code: { tr: `login(username, 12345)\n// Error: Argument of type 'number' is not assignable to type 'string'.`, en: `login(username, 12345)\n// Error: Argument of type 'number' is not assignable to type 'string'.` },
      positions: {
        tsc: { x: 22, y: 40, scale: 0.95 },
        ghost: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'tsc', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 3 — tip hatası yoksa, tsc devam eder ve tip bilgilerini (annotation\'ları) SİLEREK düz bir `.js` dosyası üretir. Üretilen dosyada `: string` gibi hiçbir TypeScript söz dizimi kalmaz.',
        en: 'Step 3 — if there\'s no type error, tsc proceeds and produces a plain `.js` file by STRIPPING the type annotations. The generated file contains none of TypeScript\'s syntax like `: string`.',
      },
      code: { tr: `// login.js — tip bilgisi silinmiş\nfunction login(username, password) {\n  // ...\n}`, en: `// login.js — type info stripped\nfunction login(username, password) {\n  // ...\n}` },
      positions: {
        tsc: { x: 20, y: 40, opacity: 0.4, scale: 0.85 },
        js: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'tsc', to: 'js', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — tarayıcı ya da Node.js SADECE bu `.js` dosyasını görür ve çalıştırır — TypeScript\'in kendisi hiçbir zaman runtime\'a ulaşmaz, sadece derleme ANINDA bir güvenlik katmanı olarak var olur.',
        en: 'Step 4 — the browser or Node.js sees and runs ONLY this `.js` file — TypeScript itself never reaches the runtime, it exists only as a safety layer AT COMPILE TIME.',
      },
      positions: {
        js: { x: 22, y: 40, scale: 0.95 },
        runtime: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'js', to: 'runtime', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da `javac` da tam olarak aynı işi yapar: `.java` dosyasını derler, tip hatalarını YAKALAR, `.class` bytecode\'u üretir — JVM asla kaynak koddaki tip annotation\'larını görmez. TypeScript\'in `tsc`\'si, JavaScript ekosistemine Java\'nın zaten sahip olduğu "derleme zamanında yakala" güvencesini getirir.',
        en: 'The lesson — Java\'s `javac` does the exact same job: it compiles the `.java` file, CATCHES type errors, produces `.class` bytecode — the JVM never sees the source\'s type annotations. TypeScript\'s `tsc` brings the "catch it at compile time" guarantee Java already had into the JavaScript ecosystem.',
      },
      positions: {
        runtime: { x: 35, y: 50, scale: 1.1 },
        ghost: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [1] Installation — tsconfig.json'un tek bir yerden TÜM tsc çağrılarını yönetmesi
const tsTsconfigInitFilm = {
  type: 'video-scene',
  id: 'ts-tsconfig-init-film',
  title: {
    tr: '🎬 tsc --init: Tek Dosya, Her tsc Çağrısını Yönetiyor',
    en: '🎬 tsc --init: One File Governing Every tsc Call',
  },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'files', emoji: '📄', label: { tr: '.ts dosyaları (config yok)', en: '.ts files (no config)' }, color: '#0ea5e9' },
    { id: 'init', emoji: '⚙️', label: { tr: 'tsc --init', en: 'tsc --init' }, color: '#f59e0b' },
    { id: 'config', emoji: '📋', label: { tr: 'tsconfig.json', en: 'tsconfig.json' }, color: '#22c55e' },
    { id: 'compiler', emoji: '🔎', label: { tr: 'tsc (her çağrı)', en: 'tsc (every call)' }, color: '#8b5cf6' },
    { id: 'strict', emoji: '🛡️', label: { tr: 'strict: true — TÜM dosyalarda', en: 'strict: true — across ALL files' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Projede sadece .ts dosyaları var, ama henüz bir tsconfig.json yok. tsc her çalıştığında hangi JS sürümünü hedefleyeceğini, strict modun açık olup olmadığını nereden bilecek?',
        en: 'The project only has .ts files, but no tsconfig.json yet. Every time tsc runs, how does it know which JS version to target, or whether strict mode is on?',
      },
      positions: { files: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: '`tsc --init` çalıştırılır. Bu komut kodu derlemez — sadece varsayılan seçeneklerle (çoğu satır başta yorum olarak kapalı) bir tsconfig.json ÜRETİR.',
        en: '`tsc --init` runs. This command does not compile code — it just GENERATES a tsconfig.json with default options (most lines commented out at first).',
      },
      code: { tr: `npx tsc --init\n// Oluşturuldu: tsconfig.json`, en: `npx tsc --init\n// Created: tsconfig.json` },
      positions: {
        files: { x: 20, y: 40, scale: 1.0 },
        init: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'files', to: 'init', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'tsconfig.json artık projenin KÖKÜNDE oturuyor. Bundan sonra çalıştırılan HER `tsc` komutu, hiçbir flag yazmadan bu dosyayı otomatik okur.',
        en: 'tsconfig.json now sits at the project ROOT. From now on, EVERY `tsc` command that runs reads this file automatically, with zero flags typed.',
      },
      code: { tr: `{\n  "compilerOptions": {\n    "target": "ESNext",\n    "strict": false\n  }\n}`, en: `{\n  "compilerOptions": {\n    "target": "ESNext",\n    "strict": false\n  }\n}` },
      positions: {
        init: { x: 20, y: 40, scale: 0.9 },
        config: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'init', to: 'config', color: '#22c55e' }],
    },
    {
      caption: {
        tr: '`"strict": true` yazıp kaydediyoruz. Tek bir satır değişti — ama bu satır, projedeki HER .ts dosyasını aynı anda etkiler; her dosyaya tek tek gitmeye gerek yok.',
        en: 'We write `"strict": true` and save. One line changed — but that line affects EVERY .ts file in the project at once; there is no need to go into each file individually.',
      },
      code: { tr: `{ "compilerOptions": { "strict": true } }`, en: `{ "compilerOptions": { "strict": true } }` },
      positions: {
        config: { x: 25, y: 45, scale: 1.1, pulse: true },
        strict: { x: 60, y: 55, scale: 1.15 },
      },
      beams: [{ from: 'config', to: 'strict', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Projede `tsc`, `tsc --watch` veya editörün arka planda çalıştırdığı tsserver — HANGİSİ çalışırsa çalışsın, hepsi AYNI tsconfig.json\'u okur ve aynı kurallarla tip kontrolü yapar.',
        en: 'Whether it is `tsc`, `tsc --watch`, or the tsserver your editor runs in the background — WHICHEVER one runs, all of them read the SAME tsconfig.json and type-check by the same rules.',
      },
      positions: {
        config: { x: 30, y: 40, scale: 1.0 },
        compiler: { x: 65, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'config', to: 'compiler', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bu rol `pom.xml`/`build.gradle` içindeki derleyici eklentisine aittir: `javac`\'a her seferinde flag yazmak yerine, ayarlar bir kere yazılır, her `mvn compile` onu otomatik okur. tsconfig.json JavaScript ekosistemine aynı disiplini getirir.',
        en: 'The lesson — in Java this role belongs to the compiler plugin inside `pom.xml`/`build.gradle`: instead of typing flags into `javac` every time, settings are written once, and every `mvn compile` reads them automatically. tsconfig.json brings that same discipline to the JavaScript ecosystem.',
      },
      positions: {
        compiler: { x: 35, y: 50, scale: 1.1 },
        strict: { x: 65, y: 50, scale: 1.0, opacity: 0.6 },
      },
    },
  ],
}

// ── [2] Simple & Special Types — any (kapı) vs unknown (kilit) riski
const tsAnyUnknownFilm = {
  type: 'video-scene',
  id: 'ts-any-unknown-film',
  title: {
    tr: '🎬 any vs unknown: Kapıyı Sonuna Kadar Açık mı Bırakalım?',
    en: '🎬 any vs unknown: Do We Leave the Door Wide Open?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'api', emoji: '📦', label: { tr: 'API yanıtı (şekli belirsiz)', en: 'API response (shape unknown)' }, color: '#0ea5e9' },
    { id: 'anyDoor', emoji: '🚪', label: { tr: 'any — kapı sonuna kadar açık', en: 'any — door wide open' }, color: '#ef4444' },
    { id: 'crash', emoji: '💥', label: { tr: 'RUNTIME çökmesi', en: 'RUNTIME crash' }, color: '#ef4444' },
    { id: 'unknownLock', emoji: '🔒', label: { tr: 'unknown — kilitli kutu', en: 'unknown — locked box' }, color: '#f59e0b' },
    { id: 'guard', emoji: '🕵️', label: { tr: 'typeof kontrolü', en: 'typeof check' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir API çağrısından veri geliyor ama gerçek şekli (shape) derleme anında BİLİNMİYOR — kullanıcı bir string mi, number mı, yoksa hatalı bir obje mi döndü?',
        en: 'Data comes back from an API call, but its real shape is NOT known at compile time — did the server return a string, a number, or a malformed object?',
      },
      positions: { api: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Yol 1: veriyi `any` olarak tipleriz. Kapı sonuna kadar açılır — derleyici bu değişken üzerinde ARTIK hiçbir kontrol yapmaz, her metot çağrılabilir.',
        en: 'Path 1: we type the data as `any`. The door swings wide open — the compiler no longer performs ANY check on this variable, every method can be called.',
      },
      code: { tr: `let userInput: any = await response.json();\nuserInput.email.toUpperCase();  // derleyici sessiz`, en: `let userInput: any = await response.json();\nuserInput.email.toUpperCase();  // compiler stays silent` },
      positions: {
        api: { x: 20, y: 40, scale: 1.0 },
        anyDoor: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'api', to: 'anyDoor', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Gerçek yanıtta `email` alanı hiç yoktu. Derleme anında hiçbir uyarı çıkmadı — hata ancak kod ÇALIŞIRKEN, `.toUpperCase()` çağrılırken patlıyor: "Cannot read properties of undefined".',
        en: 'The real response never had an `email` field. No warning appeared at compile time — the error only explodes while the code RUNS, right at `.toUpperCase()`: "Cannot read properties of undefined".',
      },
      positions: {
        anyDoor: { x: 22, y: 40, scale: 0.95 },
        crash: { x: 58, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'anyDoor', to: 'crash', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Yol 2 (geri sar, kontrast) — AYNI veriyi bu sefer `unknown` olarak tipleriz. Kutu kilitli: hiçbir property\'e veya metoda dokunmadan önce derleyici sizi durdurur.',
        en: 'Path 2 (rewind, the contrast) — the SAME data, but typed as `unknown` this time. The box is locked: the compiler stops you before you touch any property or method.',
      },
      code: { tr: `let userInput: unknown = await response.json();\nuserInput.email;  // Hata: 'userInput' 'unknown' tipinde`, en: `let userInput: unknown = await response.json();\nuserInput.email;  // Error: 'userInput' is of type 'unknown'` },
      positions: {
        api: { x: 22, y: 40, scale: 0.9 },
        unknownLock: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'api', to: 'unknownLock', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`typeof userInput === "object" && userInput !== null && "email" in userInput` kontrolü eklenince, TypeScript kilidi açar — artık `email` alanına GÜVENLE erişilebilir, çünkü şekil doğrulandı.',
        en: 'Once the check `typeof userInput === "object" && userInput !== null && "email" in userInput` is added, TypeScript unlocks the box — `email` can now be accessed SAFELY, because the shape was verified.',
      },
      positions: {
        unknownLock: { x: 25, y: 45, scale: 1.05 },
        guard: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'unknownLock', to: 'guard', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'daki en yakın karşılığı bir `Object` referansıdır: kullanmadan önce her zaman `instanceof` ile cast etmeniz gerekir. `unknown`, JavaScript\'in `any` alışkanlığına Java\'nın bu disiplinini geri getirir; `any` ise disiplini tamamen kapatır.',
        en: 'The lesson — the closest Java equivalent is an `Object` reference: you always have to cast it with `instanceof` before use. `unknown` brings that same Java discipline back into JavaScript\'s `any` habit; `any` switches that discipline off entirely.',
      },
      positions: {
        guard: { x: 35, y: 50, scale: 1.1 },
        crash: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [3] Arrays & Tuples — tuple'ın sabit uzunluk + sabit sıra garantisi
const tsTupleFixedOrderFilm = {
  type: 'video-scene',
  id: 'ts-tuple-fixed-order-film',
  title: {
    tr: '🎬 Tuple: Sabit Sıra, Sabit Uzunluk Garantisi',
    en: '🎬 Tuple: The Fixed-Order, Fixed-Length Guarantee',
  },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'array', emoji: '📚', label: { tr: 'string[] — serbest uzunluk', en: 'string[] — free length' }, color: '#0ea5e9' },
    { id: 'tuple', emoji: '🎁', label: { tr: '[string, boolean, number] — sabit', en: '[string, boolean, number] — fixed' }, color: '#f59e0b' },
    { id: 'swap', emoji: '🔀', label: { tr: 'Sıra değiştirme denemesi', en: 'Attempt to swap order' }, color: '#ef4444' },
    { id: 'block', emoji: '🚫', label: { tr: 'Derleyici BLOKLADI', en: 'Compiler BLOCKED it' }, color: '#ef4444' },
    { id: 'result', emoji: '✅', label: { tr: '[stepName, passed, ms]', en: '[stepName, passed, ms]' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'string[] gibi bir array, "aynı tipten istediğin kadar eleman" der — kaç eleman olacağı ya da sırası hakkında HİÇBİR garanti vermez.',
        en: 'An array like string[] says "as many elements as you want, of the same type" — it gives NO guarantee at all about how many elements there are or in what order.',
      },
      positions: { array: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Bir tuple ise `[string, boolean, number]` yazınca "tam 3 eleman, tam bu sırada, tam bu tiplerde" der — her SLOT önceden ayrılmış ve etiketlenmiştir.',
        en: 'A tuple, written as `[string, boolean, number]`, says "exactly 3 elements, in exactly this order, of exactly these types" — every SLOT is pre-assigned and labeled.',
      },
      code: { tr: `let result: [string, boolean, number] = ["login_test", true, 342];`, en: `let result: [string, boolean, number] = ["login_test", true, 342];` },
      positions: {
        array: { x: 20, y: 40, scale: 0.9 },
        tuple: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'array', to: 'tuple', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Birisi yanlışlıkla ilk iki elemanın yerini değiştirir: `[true, "login_test", 342]`. Sıra karıştı — 1. slot artık boolean, 2. slot artık string.',
        en: 'Someone accidentally swaps the first two elements: `[true, "login_test", 342]`. The order got mixed up — slot 1 is now boolean, slot 2 is now string.',
      },
      code: { tr: `result = [true, "login_test", 342];  // sıra karıştı`, en: `result = [true, "login_test", 342];  // order mixed up` },
      positions: {
        tuple: { x: 22, y: 40, scale: 0.95 },
        swap: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'tuple', to: 'swap', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'tuple, her slotun tipini HATIRLIYOR. Derleyici hemen durdurur: "Type \'boolean\' is not assignable to type \'string\'" — testi hiç çalıştırmadan, satırı yazarken.',
        en: 'The tuple REMEMBERS the type of every slot. The compiler stops it immediately: "Type \'boolean\' is not assignable to type \'string\'" — before the test ever runs, right as the line is typed.',
      },
      positions: {
        swap: { x: 25, y: 45, scale: 1.0 },
        block: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'swap', to: 'block', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Sıra doğru yazıldığında ise her şey yerli yerinde: `[stepName, passed, durationMs]` — 3 slot, 3 sabit anlam, hiçbir karışıklık riski yok.',
        en: 'When the order is written correctly, everything is exactly in place: `[stepName, passed, durationMs]` — 3 slots, 3 fixed meanings, zero risk of confusion.',
      },
      positions: {
        block: { x: 30, y: 45, scale: 0.9, opacity: 0.5 },
        result: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'block', to: 'result', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bunun birebir karşılığı yoktur; en yakını sabit alanlı bir record/class yazmaktır. Normal bir array bu sıra hatasını sessizce KABUL ederdi; tuple aynı hatayı derleme anında yakalar.',
        en: 'The lesson — Java has no direct equivalent; the closest is writing a fixed-field record/class. A regular array would have silently ACCEPTED this ordering mistake; a tuple catches the same mistake at compile time.',
      },
      positions: {
        result: { x: 40, y: 50, scale: 1.1 },
        array: { x: 65, y: 50, scale: 0.9, opacity: 0.5 },
      },
    },
  ],
}

// ── [4] Object Types & Enums — enum'ın derleme-zamanı sabit kümesi
const tsEnumFixedSetFilm = {
  type: 'video-scene',
  id: 'ts-enum-fixed-set-film',
  title: {
    tr: '🎬 Enum: Panoda Olmayan Bir Rengi Var Etmemek',
    en: '🎬 Enum: A Color That Never Existed on the Panel',
  },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'str', emoji: '📝', label: { tr: 'status: string ("red")', en: 'status: string ("red")' }, color: '#0ea5e9' },
    { id: 'typo', emoji: '👻', label: { tr: '"redd" — sessiz yazım hatası', en: '"redd" — silent typo' }, color: '#ef4444' },
    { id: 'enumDef', emoji: '🚦', label: { tr: 'enum Status { RED, YELLOW, GREEN }', en: 'enum Status { RED, YELLOW, GREEN }' }, color: '#f59e0b' },
    { id: 'blocked', emoji: '🚫', label: { tr: 'Status.REDD — YOK, blokland', en: 'Status.REDD — DOES NOT EXIST' }, color: '#ef4444' },
    { id: 'safe', emoji: '✅', label: { tr: 'Status.RED — güvenli', en: 'Status.RED — safe' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test durumu düz bir string olarak tutulur: `status = "red"`. Metin serbesttir — kimse bunu kısıtlamaz.',
        en: 'A test status is kept as a plain string: `status = "red"`. Text is free-form — nothing constrains it.',
      },
      positions: { str: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Birisi başka bir dosyada yanlışlıkla `"redd"` yazar (fazladan bir harf). Karşılaştırma sessizce `false` döner — derleyiciden HİÇBİR uyarı gelmez.',
        en: 'Somewhere else, someone accidentally types `"redd"` (one extra letter). The comparison silently returns `false` — NO warning comes from the compiler at all.',
      },
      code: { tr: `if (status === "redd") { ... }  // asla true olmaz, sessizce`, en: `if (status === "redd") { ... }  // never true, silently` },
      positions: {
        str: { x: 20, y: 40, scale: 0.95 },
        typo: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'str', to: 'typo', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Geri sar — bu kez `enum Status { RED, YELLOW, GREEN }` tanımlanır. Trafik lambası gibidir: panoda sadece bu 3 renk vardır, üretici "bu sefer mor" diye bir seçenek SUNMAZ.',
        en: 'Rewind — this time `enum Status { RED, YELLOW, GREEN }` is defined. Like a traffic light: only these 3 colors exist on the panel, the manufacturer does NOT offer "let it glow purple" as an option.',
      },
      code: { tr: `enum Status { RED = "RED", YELLOW = "YELLOW", GREEN = "GREEN" }`, en: `enum Status { RED = "RED", YELLOW = "YELLOW", GREEN = "GREEN" }` },
      positions: {
        str: { x: 22, y: 40, scale: 0.85, opacity: 0.5 },
        enumDef: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'str', to: 'enumDef', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`Status.REDD` yazmayı denersen, derleyici anında durdurur: böyle bir üye YOK. Panoda hiç var olmayan bir rengi ortaya çıkarmak imkansız hale gelir.',
        en: 'Try writing `Status.REDD`, and the compiler stops it instantly: no such member EXISTS. Bringing a color that never existed on the panel into being becomes impossible.',
      },
      positions: {
        enumDef: { x: 25, y: 45, scale: 1.05 },
        blocked: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'enumDef', to: 'blocked', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`Status.RED` yazıldığında hem derleyici hem IDE bunu tanır, otomatik tamamlar ve log çıktısında okunabilir "RED" değerini üretir — sayı kodu (0, 1, 2) değil.',
        en: 'When `Status.RED` is written, both the compiler and the IDE recognize it, autocomplete it, and produce the readable "RED" value in log output — not a numeric code (0, 1, 2).',
      },
      positions: {
        blocked: { x: 30, y: 45, scale: 0.9, opacity: 0.5 },
        safe: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'blocked', to: 'safe', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da enum doğuştan bu garantiyi verir, TypeScript aynı disiplini taşır. Plain string bu yazım kazasını sessizce kabul ederdi; enum aynı hatayı derleme anında imkansız hale getirir.',
        en: 'The lesson — Java\'s enum gives this guarantee from birth, and TypeScript carries the same discipline forward. A plain string would have silently accepted this typo; an enum makes the same mistake impossible at compile time.',
      },
      positions: {
        safe: { x: 40, y: 50, scale: 1.1 },
        typo: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [5] Interface & Type Aliases — declaration merging vs birleşemeyen type alias
const tsInterfaceMergeFilm = {
  type: 'video-scene',
  id: 'ts-interface-merge-film',
  title: {
    tr: '🎬 Declaration Merging: İki Bildirim, Tek Interface',
    en: '🎬 Declaration Merging: Two Declarations, One Interface',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'iface1', emoji: '🤝', label: { tr: 'interface Config { url }', en: 'interface Config { url }' }, color: '#0ea5e9' },
    { id: 'iface2', emoji: '🔓', label: { tr: 'interface Config { timeout } (2. kez)', en: 'interface Config { timeout } (2nd time)' }, color: '#f59e0b' },
    { id: 'merged', emoji: '🧬', label: { tr: 'Config { url, timeout } — BİRLEŞTİ', en: 'Config { url, timeout } — MERGED' }, color: '#22c55e' },
    { id: 'typeAlias', emoji: '📐', label: { tr: 'type Config = { url }', en: 'type Config = { url }' }, color: '#0ea5e9' },
    { id: 'error', emoji: '🚫', label: { tr: 'Duplicate identifier — HATA', en: 'Duplicate identifier — ERROR' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`interface Config { url: string }` bir yerde tanımlanır — sözleşme henüz sadece `url` alanını zorunlu kılıyor.',
        en: '`interface Config { url: string }` is declared somewhere — the contract currently only requires the `url` field.',
      },
      positions: { iface1: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Başka bir dosyada AYNI isimle `interface Config { timeout: number }` yeniden açılır (örneğin Playwright\'in fixture tipini genişletmek için).',
        en: 'In another file, `interface Config { timeout: number }` is reopened with the SAME name (for example, to extend Playwright\'s fixture type).',
      },
      code: { tr: `interface Config { url: string }\ninterface Config { timeout: number }  // yeniden açıldı`, en: `interface Config { url: string }\ninterface Config { timeout: number }  // reopened` },
      positions: {
        iface1: { x: 20, y: 40, scale: 0.95 },
        iface2: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'iface1', to: 'iface2', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'TypeScript bu iki bildirimi hiçbir çakışma vermeden OTOMATİK olarak birleştirir (declaration merging): artık `Config` hem `url` hem `timeout` içerir.',
        en: 'TypeScript AUTOMATICALLY merges these two declarations with no conflict at all (declaration merging): `Config` now contains both `url` and `timeout`.',
      },
      positions: {
        iface2: { x: 25, y: 45, scale: 1.0 },
        merged: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'iface2', to: 'merged', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Geri sar, kontrast — AYNI numarayı `type Config = { url: string }` ile deneriz. `type` yerine `interface` yazsaydık olurdu; ama bir de AYNI isimle `type Config` yazmayı deneyelim.',
        en: 'Rewind, the contrast — we try the SAME trick with `type Config = { url: string }`. Let\'s attempt writing a SECOND `type Config` with the same name.',
      },
      code: { tr: `type Config = { url: string }\ntype Config = { timeout: number }  // ikinci deneme`, en: `type Config = { url: string }\ntype Config = { timeout: number }  // second attempt` },
      positions: {
        merged: { x: 22, y: 40, scale: 0.9, opacity: 0.5 },
        typeAlias: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'merged', to: 'typeAlias', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Derleyici hemen durdurur: "Duplicate identifier \'Config\'." type alias YENİDEN AÇILAMAZ — bir kere tanımlandıktan sonra kapanır, birleşme burada olmaz.',
        en: 'The compiler stops immediately: "Duplicate identifier \'Config\'." A type alias CANNOT be reopened — once declared, it is closed, and no merging happens here.',
      },
      positions: {
        typeAlias: { x: 28, y: 45, scale: 1.0 },
        error: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'typeAlias', to: 'error', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — bu yüzden Playwright\'in `TestFixtures` tipine yeni fixture eklemek SADECE interface ile mümkündür. QA\'de fark: interface\'i unutup type kullanırsanız, üçüncü taraf tipini genişletme özelliğini kaybedersiniz.',
        en: 'The lesson — this is exactly why adding new fixtures to Playwright\'s `TestFixtures` type is ONLY possible with an interface. The QA-relevant gap: forget interface and use type instead, and you lose the ability to extend a third-party type.',
      },
      positions: {
        error: { x: 35, y: 50, scale: 1.0, opacity: 0.5 },
        merged: { x: 65, y: 50, scale: 1.1 },
      },
    },
  ],
}

// ── [6] Functions & Casting — `as` type assertion'ın yanlış kullanım riski
const tsAsAssertionRiskFilm = {
  type: 'video-scene',
  id: 'ts-as-assertion-risk-film',
  title: {
    tr: '🎬 `as` Casting: Sessizce Yalan Söyleyebilen Etiket',
    en: '🎬 `as` Casting: The Label That Can Silently Lie',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'raw', emoji: '📦', label: { tr: 'raw: unknown (API yanıtı)', en: 'raw: unknown (API response)' }, color: '#0ea5e9' },
    { id: 'label', emoji: '🏷️', label: { tr: 'raw as User — "güven bana"', en: 'raw as User — "trust me"' }, color: '#f59e0b' },
    { id: 'compiler', emoji: '🤐', label: { tr: 'Derleyici — SESSİZ kaldı', en: 'Compiler — stayed SILENT' }, color: '#8b5cf6' },
    { id: 'boom', emoji: '💥', label: { tr: 'RUNTIME çökmesi', en: 'RUNTIME crash' }, color: '#ef4444' },
    { id: 'guardOk', emoji: '🕵️', label: { tr: 'Gerçek type guard — güvenli', en: 'Real type guard — safe' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir mock API çağrısından `raw: unknown` veri gelir — gerçek şekli test yazarken bilinmiyor, sadece varsayılıyor.',
        en: 'Data comes back from a mock API call as `raw: unknown` — its real shape is assumed while writing the test, not actually known.',
      },
      positions: { raw: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Geliştirici `raw as User` yazar — "buna güven, bu bir User" der. Bu, gümrükte "çantamda sadece kitap var, açmana gerek yok" demeye benzer.',
        en: 'The developer writes `raw as User` — saying "trust this, it is a User". It is like telling a customs officer "there\'s only books in this bag, no need to open it".',
      },
      code: { tr: `const user = raw as User;  // "güven bana" etiketi`, en: `const user = raw as User;  // the "trust me" label` },
      positions: {
        raw: { x: 20, y: 40, scale: 0.95 },
        label: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'raw', to: 'label', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Ama gerçek veride `email` alanı hiç yoktu. `as` hiçbir runtime dönüşümü yapmadığı için, derleyici de BURADA hiçbir şey kontrol etmez — etiket sessizce yapıştırılır.',
        en: 'But the real data never had an `email` field. Because `as` performs no runtime conversion at all, the compiler checks NOTHING right here either — the label gets stuck on silently.',
      },
      positions: {
        label: { x: 22, y: 40, scale: 0.9 },
        compiler: { x: 58, y: 55, scale: 1.15 },
      },
      beams: [{ from: 'label', to: 'compiler', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Kod çalışır: `user.email.toUpperCase()` satırına gelindiğinde — işte ANCAK burada, testin ortasında — "Cannot read properties of undefined" ile çöker.',
        en: 'The code runs: the moment it reaches `user.email.toUpperCase()` — ONLY right here, in the middle of the test — it crashes with "Cannot read properties of undefined".',
      },
      code: { tr: `user.email.toUpperCase();  // 💥 email hiç yoktu`, en: `user.email.toUpperCase();  // 💥 email never existed` },
      positions: {
        compiler: { x: 25, y: 45, scale: 0.9, opacity: 0.5 },
        boom: { x: 60, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'compiler', to: 'boom', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Geri sar — aynı veri bu kez casting\'den ÖNCE gerçek bir type guard\'dan (`typeof`/`in` kontrolü) geçirilir. Şekil uymuyorsa, `as`\'a hiç ulaşılmadan hata fırlatılır.',
        en: 'Rewind — the same data is run through a real type guard (`typeof`/`in` check) BEFORE the casting this time. If the shape does not match, an error is thrown before `as` is ever reached.',
      },
      positions: {
        raw: { x: 30, y: 45, scale: 0.95 },
        guardOk: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'raw', to: 'guardOk', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'daki `(String) obj` cast\'i en azından YANLIŞSA `ClassCastException` ile o SATIRDA patlar. TypeScript\'in `as`\'ı cast anında HİÇBİR ŞEY fırlatmaz — çökme, ilk gerçek alan erişimine kadar sessizce ERTELENİR.',
        en: 'The lesson — Java\'s `(String) obj` cast at least throws a `ClassCastException` right AT that line if it is wrong. TypeScript\'s `as` throws NOTHING at cast time — the crash is silently DEFERRED until the first real field access.',
      },
      positions: {
        guardOk: { x: 35, y: 50, scale: 1.1 },
        boom: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [7] Classes & Decorators — @decorator'ın sınıf tanımlanma anında BİR KEZ çalışması
const tsDecoratorOnceFilm = {
  type: 'video-scene',
  id: 'ts-decorator-once-film',
  title: {
    tr: '🎬 Decorator: Bir Kez Sarar, Her Çağrıda Çalışır',
    en: '🎬 Decorator: Wraps Once, Runs on Every Call',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'classDef', emoji: '🏗️', label: { tr: 'class LoginPage TANIMLANIYOR', en: 'class LoginPage being DEFINED' }, color: '#0ea5e9' },
    { id: 'decorator', emoji: '🎗️', label: { tr: '@Step("...") — BİR KEZ çalışır', en: '@Step("...") — runs ONCE' }, color: '#f59e0b' },
    { id: 'wrapped', emoji: '📦', label: { tr: 'navigate() — önceden sarılmış', en: 'navigate() — pre-wrapped' }, color: '#22c55e' },
    { id: 'call1', emoji: '▶️', label: { tr: 'Test #1: navigate() çağrısı', en: 'Test #1: navigate() call' }, color: '#8b5cf6' },
    { id: 'call2', emoji: '▶️', label: { tr: 'Test #2: navigate() çağrısı', en: 'Test #2: navigate() call' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Modül yüklenir: `class LoginPage { @Step("...") navigate() {...} }` şu an TANIMLANIYOR — henüz hiç çağrılmadı, hiç test başlamadı.',
        en: 'The module loads: `class LoginPage { @Step("...") navigate() {...} }` is currently being DEFINED — not called yet, no test has started.',
      },
      positions: { classDef: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'TAM BU ANDA — sınıf tanımlanırken, test hiç çalışmadan önce — `@Step(...)` decorator fonksiyonu BİR KEZ çalışır ve orijinal `navigate` metodunu loglama koduyla sarar.',
        en: 'RIGHT AT THIS MOMENT — while the class is being defined, before any test ever runs — the `@Step(...)` decorator function runs ONCE and wraps the original `navigate` method with logging code.',
      },
      code: { tr: `function Step(name: string) {\n  return function (target, key, descriptor) {\n    const original = descriptor.value;\n    descriptor.value = async function (...args) {\n      console.log("[REPORT STEP]", name);\n      return original.apply(this, args);\n    };\n  };\n}`, en: `function Step(name: string) {\n  return function (target, key, descriptor) {\n    const original = descriptor.value;\n    descriptor.value = async function (...args) {\n      console.log("[REPORT STEP]", name);\n      return original.apply(this, args);\n    };\n  };\n}` },
      positions: {
        classDef: { x: 20, y: 40, scale: 0.95 },
        decorator: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'classDef', to: 'decorator', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Sınıf artık var olduğunda, `navigate` metodu ZATEN önceden sarılmış (pre-wrapped) haldedir — orijinal mantık + loglama tek bir pakette birleşmiştir.',
        en: 'By the time the class exists, `navigate` is ALREADY in a pre-wrapped state — the original logic and the logging are fused into a single package.',
      },
      positions: {
        decorator: { x: 22, y: 40, scale: 0.9 },
        wrapped: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'decorator', to: 'wrapped', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Test #1 çalışır: `loginPage.navigate()` çağrılır. Sarılmış versiyon devreye girer — önce log basılır, sonra orijinal navigasyon mantığı çalışır.',
        en: 'Test #1 runs: `loginPage.navigate()` is called. The wrapped version kicks in — the log prints first, then the original navigation logic runs.',
      },
      positions: {
        wrapped: { x: 25, y: 45, scale: 1.05 },
        call1: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'wrapped', to: 'call1', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Test #2 (tamamen farklı bir test dosyasında) AYNI `navigate()`\'i tekrar çağırır. Decorator fonksiyonu BİR DAHA çalışmaz — sadece sarılmış versiyon, her çağrıda yeniden çalışır.',
        en: 'Test #2 (in a completely different test file) calls the SAME `navigate()` again. The decorator function does NOT run again — only the already-wrapped version re-runs, on every single call.',
      },
      positions: {
        call1: { x: 28, y: 45, scale: 0.9, opacity: 0.5 },
        call2: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'call1', to: 'call2', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da `@Test`/`@BeforeEach` anotasyonları da benzer şekilde çerçeve tarafından bir kere işlenir; TypeScript decorator\'ı ise bunu daha da somut yapar: sarmalama, sınıf tanımlanırken TEK SEFERDE olur, her çağrıda TEKRARLANMAZ.',
        en: 'The lesson — Java\'s `@Test`/`@BeforeEach` annotations are similarly processed once by the framework; a TypeScript decorator makes this even more concrete: the wrapping happens ONCE, at class-definition time, and is NEVER repeated per call.',
      },
      positions: {
        call2: { x: 35, y: 50, scale: 1.1 },
        decorator: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [8] Generics — <T>'nin her çağrıda farklı tipe bağlanması
const tsGenericBindingFilm = {
  type: 'video-scene',
  id: 'ts-generic-binding-film',
  title: {
    tr: '🎬 Generic <T>: Aynı Kalıp, Her Çağrıda Farklı Tip',
    en: '🎬 Generic <T>: Same Mold, a Different Type Each Call',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'boxDef', emoji: '🧩', label: { tr: 'class Box<T> — T boş slot', en: 'class Box<T> — T is a blank slot' }, color: '#0ea5e9' },
    { id: 'boxStr', emoji: '📦', label: { tr: 'Box<string>("TypeScript")', en: 'Box<string>("TypeScript")' }, color: '#22c55e' },
    { id: 'boxNum', emoji: '📦', label: { tr: 'Box<number>(42)', en: 'Box<number>(42)' }, color: '#f59e0b' },
    { id: 'getStr', emoji: '🔤', label: { tr: 'get() → string bilinir', en: 'get() → known as string' }, color: '#22c55e' },
    { id: 'getNum', emoji: '🔢', label: { tr: 'get() → number bilinir', en: 'get() → known as number' }, color: '#f59e0b' },
  ],
  scenes: [
    {
      caption: {
        tr: '`class Box<T> { get(): T }` BİR KEZ tanımlanır — `T` henüz boş, doldurulmamış bir slot gibidir; ne tip olacağı ÇAĞRILDIĞI ana kadar belli değildir.',
        en: '`class Box<T> { get(): T }` is defined ONCE — `T` is like a blank, unfilled slot right now; what type it will be is not decided until the moment it is CALLED.',
      },
      positions: { boxDef: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: '`new Box<string>("TypeScript")` çağrılır. TAM BU ANDA `T` slotu `string`e BAĞLANIR — kalıp aynı, ama bu örnekte artık `T` = `string`.',
        en: '`new Box<string>("TypeScript")` is called. RIGHT AT THIS MOMENT, the `T` slot gets BOUND to `string` — the mold is the same, but in this instance `T` = `string` now.',
      },
      code: { tr: `const strBox = new Box<string>("TypeScript");`, en: `const strBox = new Box<string>("TypeScript");` },
      positions: {
        boxDef: { x: 20, y: 40, scale: 0.95 },
        boxStr: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'boxDef', to: 'boxStr', color: '#22c55e' }],
    },
    {
      caption: {
        tr: '`new Box<number>(42)` AYNI sınıftan başka bir örnek yaratır — ama bu sefer `T` slotu `number`e bağlanır. İki örnek, iki BAĞIMSIZ bağlanma.',
        en: '`new Box<number>(42)` creates another instance of the SAME class — but this time the `T` slot binds to `number`. Two instances, two INDEPENDENT bindings.',
      },
      code: { tr: `const numBox = new Box<number>(42);`, en: `const numBox = new Box<number>(42);` },
      positions: {
        boxDef: { x: 22, y: 40, scale: 0.85, opacity: 0.6 },
        boxNum: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'boxDef', to: 'boxNum', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`strBox.get()` çağrıldığında derleyici SONUCUN `string` olduğunu bilir — IDE otomatik olarak `.toUpperCase()` gibi string metotlarını önerir.',
        en: 'When `strBox.get()` is called, the compiler knows the result is a `string` — the IDE automatically suggests string methods like `.toUpperCase()`.',
      },
      positions: {
        boxStr: { x: 25, y: 45, scale: 1.0 },
        getStr: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'boxStr', to: 'getStr', color: '#22c55e' }],
    },
    {
      caption: {
        tr: '`numBox.get()` çağrıldığında ise derleyici SONUCUN `number` olduğunu bilir — bu kez IDE `.toFixed()` gibi number metotlarını önerir. Aynı `get()` metodu, iki farklı bağlanma.',
        en: 'When `numBox.get()` is called, the compiler knows the result is a `number` — this time the IDE suggests number methods like `.toFixed()`. The same `get()` method, two different bindings.',
      },
      positions: {
        boxNum: { x: 28, y: 45, scale: 0.9, opacity: 0.6 },
        getNum: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'boxNum', to: 'getNum', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Ders — Playwright\'ta bunun QA karşılığı: aynı generic `Page<T>` sarmalayıcısı, bir yerde `Page<LoginPage>` olarak, başka bir yerde `Page<CartPage>` olarak bağlanır. Java\'da `List<T>`, `Box<T>` ile birebir aynı mantık — sözdizimi neredeyse özdeş.',
        en: 'The lesson — the QA parallel in Playwright: the same generic `Page<T>` wrapper binds as `Page<LoginPage>` in one place and `Page<CartPage>` in another. In Java, `List<T>` follows the exact same logic as `Box<T>` — the syntax is nearly identical.',
      },
      positions: {
        getStr: { x: 35, y: 50, scale: 1.0 },
        getNum: { x: 60, y: 50, scale: 1.0 },
      },
    },
  ],
}

// ── [9] Utility Types & Keyof — Partial/Pick'in var olan tipten YENİ tip türetmesi
const tsPartialPickDeriveFilm = {
  type: 'video-scene',
  id: 'ts-partial-pick-derive-film',
  title: {
    tr: '🎬 Partial & Pick: Var Olan Tipten Yeni Tip Türetmek',
    en: '🎬 Partial & Pick: Deriving a New Type From an Existing One',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'source', emoji: '📐', label: { tr: 'interface TestCase (kaynak)', en: 'interface TestCase (source)' }, color: '#0ea5e9' },
    { id: 'partial', emoji: '🔧', label: { tr: 'Partial<TestCase>', en: 'Partial<TestCase>' }, color: '#f59e0b' },
    { id: 'pick', emoji: '✂️', label: { tr: 'Pick<TestCase, "id"|"name">', en: 'Pick<TestCase, "id"|"name">' }, color: '#22c55e' },
    { id: 'manual', emoji: '📝', label: { tr: 'Elle kopyalanmış TestSummary', en: 'Manually copied TestSummary' }, color: '#ef4444' },
    { id: 'drift', emoji: '👻', label: { tr: 'Senkron dışı kaldı — sessiz', en: 'Drifted out of sync — silently' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`interface TestCase { id, name, status, duration, tags }` tek bir KAYNAK tip olarak tanımlanır — projedeki her test case bu şekli izler.',
        en: '`interface TestCase { id, name, status, duration, tags }` is defined as a single SOURCE type — every test case in the project follows this shape.',
      },
      positions: { source: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: '`Partial<TestCase>` AYNI kaynaktan, tüm alanları opsiyonel yapan YENİ bir tip türetir — bir PATCH isteğinde sadece değişen alanı göndermek için idealdir.',
        en: '`Partial<TestCase>` derives a NEW type from the SAME source, making every field optional — ideal for sending only the changed field in a PATCH request.',
      },
      code: { tr: `type PartialTestCase = Partial<TestCase>;\nconst update: PartialTestCase = { status: "PASS" };`, en: `type PartialTestCase = Partial<TestCase>;\nconst update: PartialTestCase = { status: "PASS" };` },
      positions: {
        source: { x: 20, y: 40, scale: 0.95 },
        partial: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'source', to: 'partial', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`Pick<TestCase, "id"|"name"|"status">` AYNI kaynaktan BAŞKA bir yeni tip türetir — sadece 3 alanı seçer. İki farklı türetme, TEK bir kaynağa bağlı.',
        en: '`Pick<TestCase, "id"|"name"|"status">` derives ANOTHER new type from the SAME source — selecting only 3 fields. Two different derivations, both wired to a SINGLE source.',
      },
      code: { tr: `type TestSummary = Pick<TestCase, "id" | "name" | "status">;`, en: `type TestSummary = Pick<TestCase, "id" | "name" | "status">;` },
      positions: {
        source: { x: 22, y: 40, scale: 0.9 },
        pick: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'source', to: 'pick', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — birisi bunun yerine elle ayrı bir `TestSummary` interface\'i YAZAR: `{ id: number; name: string; status: string }`. Görünüşte aynı sonuç, ama bağlantı yoktur.',
        en: 'The contrast — someone instead hand-WRITES a separate `TestSummary` interface: `{ id: number; name: string; status: string }`. Same result on the surface, but there is no connection.',
      },
      positions: {
        pick: { x: 25, y: 45, scale: 0.9, opacity: 0.5 },
        manual: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pick', to: 'manual', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`TestCase`\'e yeni bir zorunlu alan (`retries: number`) eklenir. `Pick`/`Partial` türetmeleri OTOMATİK güncellenir — ama elle yazılan `TestSummary` bunu HİÇ fark etmez, sessizce eskimiş kalır.',
        en: 'A new required field (`retries: number`) is added to `TestCase`. The `Pick`/`Partial` derivations update AUTOMATICALLY — but the hand-written `TestSummary` NEVER notices, silently going stale.',
      },
      positions: {
        manual: { x: 28, y: 45, scale: 0.9 },
        drift: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'manual', to: 'drift', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bu tür türetmeler genelde elle yeni sınıflar yazarak ya da Lombok gibi bir kütüphaneyle yapılır. TypeScript\'in utility type\'ları, kaynağa BAĞLI kalarak bu senkron kaybı riskini dilin kendisinden ortadan kaldırır.',
        en: 'The lesson — in Java, this kind of derivation is usually done by hand-writing new classes or via a library like Lombok. TypeScript\'s utility types stay WIRED to the source, eliminating this drift risk right at the language level.',
      },
      positions: {
        drift: { x: 35, y: 50, scale: 0.9, opacity: 0.4 },
        partial: { x: 65, y: 50, scale: 1.05 },
      },
    },
  ],
}

// ── [10] Template Literals & Null — ??/?. optional chaining'in kısa devre yapması
const tsOptionalChainingShortcircuitFilm = {
  type: 'video-scene',
  id: 'ts-optional-chaining-shortcircuit-film',
  title: {
    tr: '🎬 ?. Zinciri: undefined\'da Anında Kısa Devre',
    en: '🎬 The ?. Chain: An Instant Short-Circuit at undefined',
  },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'user', emoji: '👤', label: { tr: 'user (var)', en: 'user (exists)' }, color: '#0ea5e9' },
    { id: 'profile', emoji: '📇', label: { tr: 'profile? — bu kullanıcıda YOK', en: 'profile? — MISSING on this user' }, color: '#f59e0b' },
    { id: 'shortcircuit', emoji: '⛔', label: { tr: 'Zincir burada DURDU', en: 'Chain STOPPED right here' }, color: '#ef4444' },
    { id: 'noOptional', emoji: '💥', label: { tr: '?. olmadan: ÇÖKME', en: 'without ?.: CRASH' }, color: '#ef4444' },
    { id: 'fallback', emoji: '🛟', label: { tr: '?? "No phone" — varsayılan', en: '?? "No phone" — default' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '`user.profile?.phone` ifadesi zincire `user`den başlar — `user` nesnesi gerçekten var.',
        en: 'The expression `user.profile?.phone` starts the chain at `user` — the `user` object genuinely exists.',
      },
      positions: { user: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Ama bu kullanıcının `profile` alanı yok (`profile?: {...}` opsiyonel olarak tanımlanmıştı) — API bazı kullanıcılar için bu alanı hiç döndürmüyor.',
        en: 'But this particular user has no `profile` field (`profile?: {...}` was declared as optional) — the API simply does not return this field for some users.',
      },
      code: { tr: `interface User { id: number; profile?: { phone?: string } }\nconst u2: User = { id: 2 };  // profile yok`, en: `interface User { id: number; profile?: { phone?: string } }\nconst u2: User = { id: 2 };  // no profile` },
      positions: {
        user: { x: 20, y: 40, scale: 0.95 },
        profile: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'user', to: 'profile', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`?.` işaretine gelindiğinde, `profile` gerçekten `undefined`. Zincir TAM BURADA kısa devre yapar — `.phone`e hiç uğramadan bütün ifade `undefined` olarak sonuçlanır.',
        en: 'At the `?.` mark, `profile` really is `undefined`. The chain SHORT-CIRCUITS right here — the whole expression evaluates to `undefined` without ever visiting `.phone`.',
      },
      positions: {
        profile: { x: 22, y: 40, scale: 0.95 },
        shortcircuit: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'profile', to: 'shortcircuit', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kontrast — `?.` OLMADAN `user.profile.phone` yazılsaydı, aynı anda "Cannot read properties of undefined (reading \'phone\')" ile testin ortasında ÇÖKERDİ.',
        en: 'The contrast — WITHOUT `?.`, writing `user.profile.phone` would have CRASHED right there, mid-test, with "Cannot read properties of undefined (reading \'phone\')".',
      },
      code: { tr: `user.profile.phone;  // 💥 ?. olmadan çöker`, en: `user.profile.phone;  // 💥 crashes without ?.` },
      positions: {
        shortcircuit: { x: 25, y: 45, scale: 1.0, opacity: 0.6 },
        noOptional: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'shortcircuit', to: 'noOptional', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Zincirin sonuna eklenen `?? "No phone"`, bu `undefined`\'ı yakalar ve okunabilir bir varsayılan değer sağlar — test çökmeden, akıcı bir şekilde devam eder.',
        en: 'The `?? "No phone"` appended to the end of the chain catches that `undefined` and supplies a readable default — the test continues smoothly, with no crash.',
      },
      positions: {
        noOptional: { x: 28, y: 45, scale: 0.9, opacity: 0.4 },
        fallback: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'noOptional', to: 'fallback', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — QA\'de bu, kısmi API yanıtlarını parse ederken bir testin eksik iç içe alan yüzünden çökmemesini sağlar. `??`, sadece `null`/`undefined`\'ı kontrol eder — `||` ise `0` veya `""` gibi geçerli değerleri de yanlışlıkla varsayılana düşürür.',
        en: 'The lesson — in QA, this keeps a test from crashing on a missing nested field while parsing partial API responses. `??` only checks for `null`/`undefined` — `||` would incorrectly fall back to the default even for valid values like `0` or `""`.',
      },
      positions: {
        fallback: { x: 35, y: 50, scale: 1.1 },
        user: { x: 65, y: 50, scale: 0.9, opacity: 0.5 },
      },
    },
  ],
}

// ── [11] Error Handling & Advanced Types — catch(error): unknown ve instanceof narrowing
const tsCatchUnknownNarrowingFilm = {
  type: 'video-scene',
  id: 'ts-catch-unknown-narrowing-film',
  title: {
    tr: '🎬 catch(error: unknown): Narrowing Olmadan .message Yok',
    en: '🎬 catch(error: unknown): No .message Without Narrowing',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'thrower', emoji: '⚠️', label: { tr: 'throw ... (Error, string, sayı — HERŞEY)', en: 'throw ... (Error, string, number — ANYTHING)' }, color: '#0ea5e9' },
    { id: 'caught', emoji: '📥', label: { tr: 'catch (error) — tip: unknown', en: 'catch (error) — type: unknown' }, color: '#f59e0b' },
    { id: 'blocked', emoji: '🚫', label: { tr: 'error.message — BLOKLANDI', en: 'error.message — BLOCKED' }, color: '#ef4444' },
    { id: 'guard', emoji: '🕵️', label: { tr: 'if (error instanceof Error)', en: 'if (error instanceof Error)' }, color: '#22c55e' },
    { id: 'narrowed', emoji: '🔓', label: { tr: 'İçeride: error artık Error tipi', en: 'Inside: error is now type Error' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'JavaScript\'te `throw` HERHANGİ bir değeri fırlatabilir: `throw new Error(...)`, `throw "boom"`, hatta `throw 500` — derleyici bunu ENGELLEMEZ.',
        en: 'In JavaScript, `throw` can throw ANY value at all: `throw new Error(...)`, `throw "boom"`, even `throw 500` — the compiler does NOT prevent this.',
      },
      positions: { thrower: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Tam da bu özgürlük yüzünden, modern TypeScript `catch (error)` bloğundaki `error`\'ü `Error` değil, `unknown` olarak tipler — çünkü içinde GERÇEKTEN ne olduğu önceden bilinemez.',
        en: 'Precisely because of that freedom, modern TypeScript types the `error` in a `catch (error)` block as `unknown`, not `Error` — because what is REALLY inside it cannot be known ahead of time.',
      },
      code: { tr: `try {\n  riskyOperation();\n} catch (error) {\n  // error: unknown\n}`, en: `try {\n  riskyOperation();\n} catch (error) {\n  // error: unknown\n}` },
      positions: {
        thrower: { x: 20, y: 40, scale: 0.95 },
        caught: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'thrower', to: 'caught', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`error.message`\'a doğrudan erişmeyi denersen, derleyici hemen durdurur: `unknown` tipinde `.message` diye bir şey YOKTUR — kontrol etmeden dokunulamaz.',
        en: 'Try accessing `error.message` directly, and the compiler stops it immediately: there is NO `.message` on the `unknown` type — it cannot be touched without a check first.',
      },
      positions: {
        caught: { x: 22, y: 40, scale: 0.95 },
        blocked: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'caught', to: 'blocked', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`if (error instanceof Error)` eklenir. Bu, çalışma zamanında GERÇEKTEN prototype zincirini kontrol eder — sadece bir varsayım değil, gerçek bir doğrulamadır.',
        en: '`if (error instanceof Error)` is added. This REALLY checks the prototype chain at runtime — it is a genuine verification, not just an assumption.',
      },
      code: { tr: `if (error instanceof Error) {\n  console.log(error.message);\n}`, en: `if (error instanceof Error) {\n  console.log(error.message);\n}` },
      positions: {
        blocked: { x: 25, y: 45, scale: 0.9, opacity: 0.5 },
        guard: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'blocked', to: 'guard', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'BU IF BLOĞUNUN İÇİNDE, TypeScript `error`\'ü `Error` tipine DARALTIR (narrowing) — artık `.message`e erişmek tamamen güvenlidir, hiçbir cast gerekmez.',
        en: 'INSIDE THIS IF BLOCK, TypeScript NARROWS `error` down to the `Error` type — accessing `.message` is now completely safe, no cast needed at all.',
      },
      positions: {
        guard: { x: 28, y: 45, scale: 0.9 },
        narrowed: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'guard', to: 'narrowed', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da `catch (Exception e)` yazdığın an `e`\'nin bir `Exception` olduğunu zaten BİLİRSİN, çünkü Java\'da `throw` sadece `Throwable` alt sınıflarını kabul eder. TypeScript aynı garantiyi veremez, çünkü JS `throw`\'unun hiçbir tip kısıtlaması yoktur.',
        en: 'The lesson — in Java, the moment you write `catch (Exception e)` you already KNOW `e` is an `Exception`, because Java\'s `throw` only accepts `Throwable` subclasses. TypeScript cannot make that same guarantee, because JS `throw` has no type restriction whatsoever.',
      },
      positions: {
        narrowed: { x: 35, y: 50, scale: 1.1 },
        thrower: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [12] QA Use Cases — Locator tipinin IDE otomatik tamamlaması + derleme-zamanı yakalama
const tsTypedPomAutocompleteFilm = {
  type: 'video-scene',
  id: 'ts-typed-pom-autocomplete-film',
  title: {
    tr: '🎬 Tipli Page Object: IDE Doğru Metodu Söyler',
    en: '🎬 Typed Page Object: The IDE Tells You the Right Method',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'pageObj', emoji: '📄', label: { tr: 'class LoginPage — tipli Locator alanları', en: 'class LoginPage — typed Locator fields' }, color: '#0ea5e9' },
    { id: 'typing', emoji: '⌨️', label: { tr: 'loginPage. yazılıyor', en: 'typing loginPage.' }, color: '#f59e0b' },
    { id: 'ide', emoji: '💡', label: { tr: 'IDE — GERÇEK metotları önerir', en: 'IDE — suggests the REAL methods' }, color: '#22c55e' },
    { id: 'typo', emoji: '❌', label: { tr: 'clickLogin() — yok, ama YAZILDI', en: 'clickLogin() — does not exist, but TYPED' }, color: '#ef4444' },
    { id: 'plainJs', emoji: '👻', label: { tr: 'Plain JS\'te: sessiz, teste kadar', en: 'In plain JS: silent, until the test runs' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`class LoginPage` Playwright\'in `Locator` tipiyle tanımlanmış private alanlara sahiptir — her alanın NE olduğu derleyici tarafından bilinir.',
        en: '`class LoginPage` has private fields declared with Playwright\'s `Locator` type — the compiler knows exactly WHAT each field is.',
      },
      positions: { pageObj: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Bir test dosyasında geliştirici `loginPage.` yazmaya başlar — henüz hangi metodu çağıracağına karar vermedi.',
        en: 'In a test file, the developer starts typing `loginPage.` — not yet decided which method to call.',
      },
      code: { tr: `await loginPage.`, en: `await loginPage.` },
      positions: {
        pageObj: { x: 20, y: 40, scale: 0.95 },
        typing: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pageObj', to: 'typing', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'IDE, `LoginPage` sınıfının TİP bilgisini okur ve SADECE gerçekten var olan metotları listeler: `navigate()`, `login()`, `getErrorMessage()`, `isLoggedIn()`.',
        en: 'The IDE reads the TYPE information of the `LoginPage` class and lists ONLY the methods that genuinely exist: `navigate()`, `login()`, `getErrorMessage()`, `isLoggedIn()`.',
      },
      positions: {
        typing: { x: 22, y: 40, scale: 0.95 },
        ide: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'typing', to: 'ide', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Başka bir geliştirici listeye bakmadan `loginPage.clickLogin()` yazar — böyle bir metot YOK, bu bir yazım hatası (gerçek isim `login()`). Derleyici bunu ANINDA kırmızı çizgiyle işaretler.',
        en: 'Another developer types `loginPage.clickLogin()` without checking the list — no such method EXISTS, it is a typo (the real name is `login()`). The compiler flags it with a red squiggle INSTANTLY.',
      },
      code: { tr: `loginPage.clickLogin();  // Hata: Property 'clickLogin' does not exist`, en: `loginPage.clickLogin();  // Error: Property 'clickLogin' does not exist` },
      positions: {
        ide: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        typo: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'ide', to: 'typo', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kontrast — plain JavaScript bir Page Object\'te AYNI yazım hatası hiçbir uyarı vermez; hata ancak test ÇALIŞTIRILDIĞINDA "clickLogin is not a function" olarak ortaya çıkar.',
        en: 'The contrast — the SAME typo in a plain JavaScript Page Object gives no warning at all; the error only surfaces when the test RUNS, as "clickLogin is not a function".',
      },
      positions: {
        typo: { x: 28, y: 45, scale: 0.9, opacity: 0.4 },
        plainJs: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'typo', to: 'plainJs', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — tipler sadece hatayı ENGELLEMEKLE kalmaz, aynı zamanda doğru çağrıya YÖNLENDİRİR. Java\'da bir interface\'e karşı derleme yapmanın IDE güvenliğiyle birebir aynı mantık.',
        en: 'The lesson — types do not just PREVENT the bug, they also GUIDE you to the right call in the first place. The exact same logic as the IDE safety you get from compiling against an interface in Java.',
      },
      positions: {
        plainJs: { x: 35, y: 50, scale: 0.9, opacity: 0.5 },
        ide: { x: 65, y: 50, scale: 1.05 },
      },
    },
  ],
}

// ── [13] Java → TS — Java generic <T> ile TS generic <T> karşılaştırması
const tsJavaGenericsCompareFilm = {
  type: 'video-scene',
  id: 'ts-java-generics-compare-film',
  title: {
    tr: '🎬 Java <T> vs TypeScript <T>: %80 Aynı, %20 Fazlası',
    en: '🎬 Java <T> vs TypeScript <T>: 80% the Same, 20% More',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'javaRepo', emoji: '☕', label: { tr: 'Java: class Repository<T>', en: 'Java: class Repository<T>' }, color: '#0ea5e9' },
    { id: 'tsRepo', emoji: '🔷', label: { tr: 'TS: class Repository<T> — AYNI!', en: 'TS: class Repository<T> — SAME!' }, color: '#22c55e' },
    { id: 'bound', emoji: '🔗', label: { tr: '<T extends X> — ikisinde de aynı', en: '<T extends X> — identical in both' }, color: '#22c55e' },
    { id: 'union', emoji: '🔀', label: { tr: 'T | null — Java\'da YOK', en: 'T | null — does NOT exist in Java' }, color: '#f59e0b' },
    { id: 'conditional', emoji: '🧠', label: { tr: 'T extends Promise<infer R> ? R : T', en: 'T extends Promise<infer R> ? R : T' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Java: `class Repository<T> { void add(T item); List<T> getAll(); }` — `T` boş bir slottur, sınıf tanımlanırken hangi tip olacağı belli değildir.',
        en: 'Java: `class Repository<T> { void add(T item); List<T> getAll(); }` — `T` is a blank slot, not yet decided which type it will be when the class is defined.',
      },
      positions: { javaRepo: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'TypeScript: `class Repository<T> { add(item: T): void; getAll(): T[] }` — SÖZDİZİMİ neredeyse birebir aynı. Bir Java geliştiricisi bunu anında tanır.',
        en: 'TypeScript: `class Repository<T> { add(item: T): void; getAll(): T[] }` — the SYNTAX is almost identical. A Java developer recognizes this instantly.',
      },
      code: { tr: `class Repository<T> {\n  private items: T[] = [];\n  add(item: T): void { this.items.push(item); }\n  getAll(): T[] { return this.items; }\n}`, en: `class Repository<T> {\n  private items: T[] = [];\n  add(item: T): void { this.items.push(item); }\n  getAll(): T[] { return this.items; }\n}` },
      positions: {
        javaRepo: { x: 20, y: 40, scale: 0.95 },
        tsRepo: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'javaRepo', to: 'tsRepo', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Java\'daki `<T extends Comparable<T>>` sınırlaması, TypeScript\'te `<T extends { compareTo(other: T): number }>` olarak YAZIM açısından bile neredeyse aynıdır — `extends` keyword\'ü bile ortak.',
        en: 'Java\'s `<T extends Comparable<T>>` constraint is written in TypeScript as `<T extends { compareTo(other: T): number }>` — almost identical even down to the SYNTAX, sharing the very `extends` keyword.',
      },
      positions: {
        tsRepo: { x: 22, y: 40, scale: 0.9 },
        bound: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'tsRepo', to: 'bound', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Burada yollar AYRILIR — TypeScript `type MaybeNull<T> = T | null;` gibi bir UNION generic yazabilir. Java\'da `T`\'yi doğrudan bir birleşim tipiyle ifade etmenin bir yolu YOKTUR.',
        en: 'Here the paths DIVERGE — TypeScript can write a UNION generic like `type MaybeNull<T> = T | null;`. Java has NO way to express `T` as a direct union type like this.',
      },
      code: { tr: `type MaybeNull<T> = T | null;   // Java'da doğrudan karşılığı yok`, en: `type MaybeNull<T> = T | null;   // no direct Java equivalent` },
      positions: {
        bound: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        union: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'bound', to: 'union', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Daha da ileride TypeScript, `T extends Promise<infer R> ? R : T` gibi bir CONDITIONAL type yazabilir — tipler üzerinde bir if/else gibi çalışır. Java\'da bunun HİÇBİR karşılığı yoktur.',
        en: 'Even further, TypeScript can write a CONDITIONAL type like `T extends Promise<infer R> ? R : T` — an if/else that operates on types themselves. Java has NO equivalent to this at all.',
      },
      positions: {
        union: { x: 28, y: 45, scale: 0.9, opacity: 0.5 },
        conditional: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'union', to: 'conditional', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — Java bilen bir QA mühendisi için TypeScript generic\'lerinin %80\'i anında tanıdıktır (aynı `<T>`, aynı `extends`); geri kalan %20\'lik fazla güç (union, conditional, infer), temeller oturunca doğal olarak gelir.',
        en: 'The lesson — for a QA engineer who knows Java, 80% of TypeScript generics feel instantly familiar (the same `<T>`, the same `extends`); the remaining 20% of extra power (union, conditional, infer) comes naturally once the basics are comfortable.',
      },
      positions: {
        conditional: { x: 35, y: 50, scale: 1.0 },
        tsRepo: { x: 65, y: 50, scale: 1.0, opacity: 0.5 },
      },
    },
  ],
}

// ── [14] Test Runners — Vitest'in esbuild tabanlı anlık derlemesi vs Jest'in ayrı derleme adımı
const tsVitestWatchFilm = {
  type: 'video-scene',
  id: 'ts-vitest-watch-film',
  title: {
    tr: '🎬 Vitest Watch: Sadece Değişen Dosya, Saniyeler İçinde',
    en: '🎬 Vitest Watch: Only the Changed File, in Seconds',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'edit', emoji: '📄', label: { tr: 'formatPrice.ts — 1 satır değişti', en: 'formatPrice.ts — 1 line changed' }, color: '#0ea5e9' },
    { id: 'jestPath', emoji: '🐌', label: { tr: 'Jest → ayrı Babel/ts-jest derlemesi', en: 'Jest → separate Babel/ts-jest compile' }, color: '#ef4444' },
    { id: 'vitestPath', emoji: '⚡', label: { tr: 'Vitest → Vite\'in esbuild\'i (anlık)', en: 'Vitest → Vite\'s esbuild (instant)' }, color: '#22c55e' },
    { id: 'watch', emoji: '👁️', label: { tr: 'watch mode — SADECE bu dosya', en: 'watch mode — ONLY this file' }, color: '#22c55e' },
    { id: 'report', emoji: '✅', label: { tr: 'pass/fail raporu — saniyeler içinde', en: 'pass/fail report — in seconds' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Geliştirici `formatPrice.ts` içindeki TEK bir satırı değiştirir — bu değişikliğin testlere ulaşması ne kadar sürecek?',
        en: 'The developer changes just ONE line inside `formatPrice.ts` — how long will it take for that change to reach the tests?',
      },
      positions: { edit: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Jest yolunda: dosya ÖNCE ayrı bir derleme adımından (Babel veya ts-jest) geçirilmeli — bu adım her seferinde çalışır ve gözle görülür bir gecikme yaratır.',
        en: 'The Jest path: the file must FIRST pass through a separate compile step (Babel or ts-jest) — this step runs every single time and creates a noticeable delay.',
      },
      positions: {
        edit: { x: 20, y: 40, scale: 0.95 },
        jestPath: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'edit', to: 'jestPath', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Vitest yolunda (kontrast): Vite\'in zaten kullandığı esbuild tabanlı anlık derleme yeniden kullanılır — bu ekstra adım neredeyse SIFIRA iner.',
        en: 'The Vitest path (the contrast): the esbuild-based instant compilation that Vite already uses is reused — this extra step shrinks to almost ZERO.',
      },
      positions: {
        edit: { x: 22, y: 40, scale: 0.9 },
        vitestPath: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'edit', to: 'vitestPath', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Vitest watch mode devreye girer — yüzlerce test dosyası varken, SADECE değişen `formatPrice.ts` ile ilişkili testler yeniden çalıştırılır, geri kalanı DOKUNULMADAN kalır.',
        en: 'Vitest watch mode kicks in — with hundreds of test files, ONLY the tests related to the changed `formatPrice.ts` re-run, everything else stays UNTOUCHED.',
      },
      code: { tr: `npx vitest\n// watching for file changes...\n// re-run: formatPrice.test.ts (only)`, en: `npx vitest\n// watching for file changes...\n// re-run: formatPrice.test.ts (only)` },
      positions: {
        vitestPath: { x: 25, y: 45, scale: 1.0 },
        watch: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'vitestPath', to: 'watch', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Sonuç saniyeler içinde ekrana düşer: her `it()` bloğu için ayrı ayrı ✅/❌ ve bir coverage özeti — Jest\'te aynı senaryo derleme adımı yüzünden gözle görülür şekilde daha yavaş hissedilir.',
        en: 'The result lands on screen within seconds: a separate ✅/❌ per `it()` block plus a coverage summary — the same scenario under Jest feels noticeably slower because of that compile step.',
      },
      positions: {
        watch: { x: 28, y: 45, scale: 0.9, opacity: 0.6 },
        report: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'watch', to: 'report', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bu fark, Maven\'in her seferinde tüm projeyi yeniden derlemesi yerine artımlı (incremental) derleme yapmasına benzer: aynı sonuç, sadece DEĞİŞEN kısmı yeniden işleyerek çok daha hızlı elde edilir.',
        en: 'The lesson — in Java, this difference resembles Maven doing incremental compilation instead of rebuilding the entire project every time: the same result is reached much faster by only reprocessing what CHANGED.',
      },
      positions: {
        report: { x: 35, y: 50, scale: 1.1 },
        jestPath: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

// ── [15] Interview Q&A — exhaustive switch + never ile eksik case'i derleme anında yakalamak
const tsExhaustiveNeverFilm = {
  type: 'video-scene',
  id: 'ts-exhaustive-never-film',
  title: {
    tr: '🎬 Exhaustive Switch: Yeni Bir Durum Eklenince Derleyici Uyarır',
    en: '🎬 Exhaustive Switch: The Compiler Warns When a New Case Appears',
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'union', emoji: '🔀', label: { tr: 'TestStatus = "pass"|"fail"|"skip"', en: 'TestStatus = "pass"|"fail"|"skip"' }, color: '#0ea5e9' },
    { id: 'switchStmt', emoji: '🔁', label: { tr: 'switch — 3 case TAM ele alınmış', en: 'switch — all 3 cases FULLY handled' }, color: '#22c55e' },
    { id: 'neverCase', emoji: '🚫', label: { tr: 'default: assertNever(s) — s: never', en: 'default: assertNever(s) — s: never' }, color: '#8b5cf6' },
    { id: 'newMember', emoji: '🆕', label: { tr: 'Başka dosyada "flaky" eklendi', en: '"flaky" added elsewhere' }, color: '#f59e0b' },
    { id: 'caught', emoji: '🎯', label: { tr: 'BU switch\'te derleme hatası!', en: 'Compile error AT THIS switch!' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`type TestStatus = "pass" | "fail" | "skip"` tanımlıdır ve bir `switch` bu 3 durumun HER BİRİNİ ayrı ayrı ele alır.',
        en: '`type TestStatus = "pass" | "fail" | "skip"` is defined, and a `switch` handles EACH of these 3 cases separately.',
      },
      positions: { union: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Üç `case` de yazılmıştır: `"pass"`, `"fail"`, `"skip"` — hepsi ele alınmış görünüyor.',
        en: 'All three `case`s are written: `"pass"`, `"fail"`, `"skip"` — everything looks handled.',
      },
      code: { tr: `switch (s) {\n  case "pass": return "green";\n  case "fail": return "red";\n  case "skip": return "grey";\n  default: return assertNever(s);\n}`, en: `switch (s) {\n  case "pass": return "green";\n  case "fail": return "red";\n  case "skip": return "grey";\n  default: return assertNever(s);\n}` },
      positions: {
        union: { x: 20, y: 40, scale: 0.95 },
        switchStmt: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'union', to: 'switchStmt', color: '#22c55e' }],
    },
    {
      caption: {
        tr: '`default` dalı `assertNever(s)`\'i çağırır. Şu an TÜM durumlar yukarıda ele alındığı için, TypeScript burada `s`\'in tipini `never` olarak görür — "buraya asla ulaşılamaz" demektir.',
        en: 'The `default` branch calls `assertNever(s)`. Since ALL cases are handled above right now, TypeScript sees `s`\'s type here as `never` — meaning "this can never be reached".',
      },
      positions: {
        switchStmt: { x: 22, y: 40, scale: 0.95 },
        neverCase: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'switchStmt', to: 'neverCase', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Aylar sonra, BAŞKA bir dosyada `TestStatus` union\'ına `"flaky"` durumu EKLENİR — bu switch\'e hiç dokunulmadan.',
        en: 'Months later, in ANOTHER file, `"flaky"` gets ADDED to the `TestStatus` union — without ever touching this switch.',
      },
      code: { tr: `type TestStatus = "pass" | "fail" | "skip" | "flaky";`, en: `type TestStatus = "pass" | "fail" | "skip" | "flaky";` },
      positions: {
        neverCase: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        newMember: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'neverCase', to: 'newMember', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Artık `default` dalına `"flaky"` değeri de ulaşabilir — ama bu dal `never` BEKLİYORDU. `"flaky"`, `never` DEĞİLDİR, ve derleyici bu switch\'in TAM İÇİNDE bir hata fırlatır.',
        en: 'Now `"flaky"` can also reach the `default` branch — but that branch was EXPECTING `never`. `"flaky"` is NOT `never`, and the compiler throws an error RIGHT INSIDE this switch.',
      },
      positions: {
        newMember: { x: 28, y: 45, scale: 0.9, opacity: 0.5 },
        caught: { x: 62, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'newMember', to: 'caught', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — bu kalıp, "yeni bir durum ekle"yi projedeki HER switch için otomatik bir derleme-zamanı hatırlatıcıya çevirir; aksi halde eksik `case` sessizce bir runtime boşluğu olarak kalırdı.',
        en: 'The lesson — this pattern turns "add a new status" into an automatic compile-time reminder for EVERY switch in the project; otherwise the missing `case` would have remained a silent runtime gap.',
      },
      positions: {
        caught: { x: 35, y: 50, scale: 1.1 },
        union: { x: 65, y: 50, scale: 0.9, opacity: 0.5 },
      },
    },
  ],
}

// ── [16] Practice & Reference — isSuccessResponse guard'ının ApiResponse<T>'yi daraltması
const tsResponseNarrowingFilm = {
  type: 'video-scene',
  id: 'ts-response-narrowing-film',
  title: {
    tr: '🎬 ApiResponse<T> Daraltma: null Riskini Tek Guard\'da Yok Etmek',
    en: '🎬 Narrowing ApiResponse<T>: Erasing the null Risk in One Guard',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'response', emoji: '📦', label: { tr: 'ApiResponse<T> — data: T | null', en: 'ApiResponse<T> — data: T | null' }, color: '#0ea5e9' },
    { id: 'directAccess', emoji: '🚫', label: { tr: 'res.data.id — BLOKLANDI', en: 'res.data.id — BLOCKED' }, color: '#ef4444' },
    { id: 'guardFn', emoji: '🕵️', label: { tr: 'isSuccessResponse(res)', en: 'isSuccessResponse(res)' }, color: '#f59e0b' },
    { id: 'narrowed', emoji: '🔓', label: { tr: 'ApiResponse<NonNullable<T>>', en: 'ApiResponse<NonNullable<T>>' }, color: '#22c55e' },
    { id: 'safeAccess', emoji: '✅', label: { tr: 'res.data.id — güvenli', en: 'res.data.id — safe' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '`ApiResponse<T>` tipi `{ data: T | null; ok: boolean; error: string | null }` şeklinde tanımlıdır — `data` alanı HER ZAMAN `null` olabilir.',
        en: '`ApiResponse<T>` is defined as `{ data: T | null; ok: boolean; error: string | null }` — the `data` field CAN ALWAYS be `null`.',
      },
      positions: { response: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Doğrudan `res.data.id` okunmaya çalışılır. Derleyici hemen durdurur: "Object is possibly \'null\'" — `data` gerçekten `null` olabileceği için `.id`\'ye güvenle erişilemez.',
        en: 'An attempt is made to read `res.data.id` directly. The compiler stops it right away: "Object is possibly \'null\'" — since `data` can genuinely be `null`, `.id` cannot be accessed safely.',
      },
      code: { tr: `res.data.id;  // Hata: Object is possibly 'null'`, en: `res.data.id;  // Error: Object is possibly 'null'` },
      positions: {
        response: { x: 20, y: 40, scale: 0.95 },
        directAccess: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'response', to: 'directAccess', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`isSuccessResponse(res)` type guard fonksiyonu çağrılır: `res.ok === true && res.data !== null` kontrolünü GERÇEKTEN çalışma zamanında yapar.',
        en: 'The `isSuccessResponse(res)` type guard function is called: it REALLY performs the `res.ok === true && res.data !== null` check at runtime.',
      },
      code: { tr: `function isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {\n  return res.ok === true && res.data !== null;\n}`, en: `function isSuccessResponse<T>(res: ApiResponse<T>): res is ApiResponse<NonNullable<T>> {\n  return res.ok === true && res.data !== null;\n}` },
      positions: {
        directAccess: { x: 22, y: 40, scale: 0.9, opacity: 0.5 },
        guardFn: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'directAccess', to: 'guardFn', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`if (isSuccessResponse(res))` bloğunun İÇİNDE, TypeScript `res`\'in tipini `ApiResponse<NonNullable<T>>`\'e DARALTIR — `null` ihtimali bu dalda artık MATEMATİKSEL olarak imkansızdır.',
        en: 'INSIDE the `if (isSuccessResponse(res))` block, TypeScript NARROWS the type of `res` to `ApiResponse<NonNullable<T>>` — the `null` possibility is now MATHEMATICALLY impossible in this branch.',
      },
      positions: {
        guardFn: { x: 25, y: 45, scale: 1.0 },
        narrowed: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'guardFn', to: 'narrowed', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Artık `res.data.id` tamamen güvenlidir — hiçbir `as` cast\'ine, hiçbir `!` non-null assertion\'a gerek yoktur; `null` dalı zaten kanıtlanarak elenmiştir.',
        en: 'Now `res.data.id` is completely safe — no `as` cast, no `!` non-null assertion is needed at all; the `null` branch has already been proven away.',
      },
      positions: {
        narrowed: { x: 28, y: 45, scale: 0.9, opacity: 0.6 },
        safeAccess: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'narrowed', to: 'safeAccess', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — TEK bir generic guard fonksiyonu, `User`, `Product` veya `Order` — HANGİ `T` olursa olsun, HER endpoint\'in yanıtını aynı şekilde korur; kod tekrarı olmadan tip güvenliği her yere yayılır.',
        en: 'The lesson — a SINGLE generic guard function protects EVERY endpoint\'s response the same way, no matter which `T` — `User`, `Product`, or `Order`; type safety spreads everywhere without any code duplication.',
      },
      positions: {
        safeAccess: { x: 35, y: 50, scale: 1.1 },
        response: { x: 65, y: 50, scale: 0.9, opacity: 0.5 },
      },
    },
  ],
}

export default {
  'ts-compile-chain-film': tsCompileChainFilm,
  'ts-tsconfig-init-film': tsTsconfigInitFilm,
  'ts-any-unknown-film': tsAnyUnknownFilm,
  'ts-tuple-fixed-order-film': tsTupleFixedOrderFilm,
  'ts-enum-fixed-set-film': tsEnumFixedSetFilm,
  'ts-interface-merge-film': tsInterfaceMergeFilm,
  'ts-as-assertion-risk-film': tsAsAssertionRiskFilm,
  'ts-decorator-once-film': tsDecoratorOnceFilm,
  'ts-generic-binding-film': tsGenericBindingFilm,
  'ts-partial-pick-derive-film': tsPartialPickDeriveFilm,
  'ts-optional-chaining-shortcircuit-film': tsOptionalChainingShortcircuitFilm,
  'ts-catch-unknown-narrowing-film': tsCatchUnknownNarrowingFilm,
  'ts-typed-pom-autocomplete-film': tsTypedPomAutocompleteFilm,
  'ts-java-generics-compare-film': tsJavaGenericsCompareFilm,
  'ts-vitest-watch-film': tsVitestWatchFilm,
  'ts-exhaustive-never-film': tsExhaustiveNeverFilm,
  'ts-response-narrowing-film': tsResponseNarrowingFilm,
}
