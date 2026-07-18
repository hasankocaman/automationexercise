import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

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
  "🛠️ DBeaver",
  "💼 Interview Q&A"
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
  "🛠️ DBeaver",
  "💼 Mülakat"
];

// ─── SQL Query Order film bloğu (video-scene — EN + TR paylaşımlı) ───────────
// Veri şeması: PILOT_PLAN_ve_PROMPT.md §2 / src/components/VideoSceneBlock.jsx
const sqlQueryOrderFilm = {
  type: 'video-scene',
  id: 'sql-query-order-film',
  title: {
    tr: '🎬 SELECT\'in Gerçek Çalışma Sırası',
    en: '🎬 The Real Execution Order of SELECT',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'table',  emoji: '🗄️', label: { tr: 'test_results Tablosu', en: 'test_results Table' },  color: '#0ea5e9' },
    { id: 'packet', emoji: '📦', label: { tr: 'Satırlar',              en: 'Rows' },                color: '#8b5cf6' },
    { id: 'ghost',  emoji: '👻', label: { tr: 'Elenen Satır',          en: 'Rejected Row' },         color: '#ef4444' },
    { id: 'groups', emoji: '🗂️', label: { tr: 'env\'e Göre Gruplar',   en: 'Groups by env' },        color: '#f59e0b' },
    { id: 'having', emoji: '🚦', label: { tr: 'HAVING Kapısı',         en: 'HAVING Gate' },          color: '#f97316' },
    { id: 'alias',  emoji: '🏷️', label: { tr: 'count Alias\'ı',        en: 'count Alias' },          color: '#22c55e' },
    { id: 'sorted', emoji: '🔀', label: { tr: 'Sıralanmış Sonuç',      en: 'Sorted Result' },        color: '#6366f1' },
    { id: 'final',  emoji: '🏆', label: { tr: 'Final: 1 Satır',        en: 'Final: 1 Row' },         color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'SELECT en üstte yazılır ama çalıştırılma sırası tamamen farklıdır. Bu filmde, aşağıdaki sorgunun motor içinde GERÇEKTE hangi sırayla işlendiğini adım adım izleyeceksin.',
        en: 'SELECT is written at the top, but its execution order is completely different. In this film you will watch, step by step, the ACTUAL order the engine uses to process the query below.',
      },
      code: {
        tr: `SELECT env, COUNT(*) AS count\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nORDER BY count DESC\nLIMIT 1;`,
        en: `SELECT env, COUNT(*) AS count\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nORDER BY count DESC\nLIMIT 1;`,
      },
      positions: {
        table: { x: 50, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — FROM: motor önce test_results tablosunun TÜM satırlarını belleğe yükler. Henüz hiçbir filtre veya sütun seçimi yapılmadı.',
        en: 'Step 1 — FROM: the engine first loads ALL rows of the test_results table into memory. No filtering or column selection has happened yet.',
      },
      code: { tr: `FROM test_results`, en: `FROM test_results` },
      positions: {
        table: { x: 14, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — WHERE: status = \'FAIL\' koşulunu KARŞILAMAYAN satırlar burada elenir (soluk figür). Sadece FAIL durumundaki satırlar bir sonraki adıma geçer.',
        en: 'Step 2 — WHERE: rows that do NOT satisfy status = \'FAIL\' are rejected here (faded figure). Only FAIL rows survive to the next step.',
      },
      code: { tr: `WHERE status = 'FAIL'`, en: `WHERE status = 'FAIL'` },
      positions: {
        table: { x: 14, y: 50, opacity: 0.45, scale: 0.85 },
        packet: { x: 40, y: 35, scale: 1.1, pulse: true },
        ghost: { x: 40, y: 72, opacity: 0.5, scale: 0.85 },
      },
      beams: [{ from: 'table', to: 'packet' }],
    },
    {
      caption: {
        tr: 'Adım 3 — GROUP BY: kalan satırlar env sütununa göre kovalara ayrılır (staging, prod...). Her kova artık tek bir grup olarak işlem görecek.',
        en: 'Step 3 — GROUP BY: the surviving rows are bucketed by the env column (staging, prod...). Each bucket is now treated as a single group.',
      },
      code: { tr: `GROUP BY env`, en: `GROUP BY env` },
      positions: {
        packet: { x: 36, y: 50, opacity: 0.5, scale: 0.85 },
        groups: { x: 62, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'packet', to: 'groups' }],
    },
    {
      caption: {
        tr: 'Adım 4 — HAVING: bu sorguda HAVING yazılmadı ama motor yine de bu adımdan geçer — tıpkı boş bir if(true) gibi hiçbir grubu elemeden ilerler. HAVING yazılsaydı, grup bazlı filtre tam burada uygulanırdı (WHERE satır bazında, HAVING grup bazında filtreler).',
        en: 'Step 4 — HAVING: this query has no HAVING clause, but the engine still passes through this stage — like an empty if(true), rejecting nothing. If HAVING were present, group-level filtering would happen right here (WHERE filters rows, HAVING filters groups).',
      },
      code: {
        tr: `-- HAVING yazılmadı, tüm gruplar geçer`,
        en: `-- no HAVING clause, all groups pass through`,
      },
      positions: {
        groups: { x: 36, y: 50, opacity: 0.55, scale: 0.85 },
        having: { x: 62, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'groups', to: 'having' }],
    },
    {
      caption: {
        tr: 'Adım 5 — SELECT: ancak ŞİMDİ env ve COUNT(*) AS count sütunları hesaplanır. count alias\'ı tam olarak burada doğar — bu yüzden Adım 2\'deki WHERE aşamasında bu alias henüz YOKTU ve kullanılamazdı.',
        en: 'Step 5 — SELECT: only NOW are the env and COUNT(*) AS count columns computed. The count alias is born right here — which is exactly why the WHERE stage back in Step 2 did NOT have this alias available.',
      },
      code: { tr: `SELECT env, COUNT(*) AS count`, en: `SELECT env, COUNT(*) AS count` },
      positions: {
        having: { x: 30, y: 50, opacity: 0.5, scale: 0.85 },
        alias: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'having', to: 'alias' }],
    },
    {
      caption: {
        tr: 'Adım 6 — ORDER BY: SELECT\'te hesaplanan count alias\'ı artık mevcut olduğu için ORDER BY onu sorunsuzca kullanabilir — sonuçlar count\'a göre azalan sıralanır.',
        en: 'Step 6 — ORDER BY: since the count alias computed in SELECT now exists, ORDER BY can freely use it — results are sorted by count, descending.',
      },
      code: { tr: `ORDER BY count DESC`, en: `ORDER BY count DESC` },
      positions: {
        alias: { x: 30, y: 50, opacity: 0.5, scale: 0.85 },
        sorted: { x: 62, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'alias', to: 'sorted' }],
    },
    {
      caption: {
        tr: 'Adım 7 — LIMIT: sıralı sonuçtan sadece ilk 1 satır kalır. Yolculuğun sonu: FROM\'dan başlayan satırlar WHERE → GROUP BY → HAVING → SELECT → ORDER BY\'dan geçerek tek bir satıra indirgendi — SELECT yazıda ilk, çalışmada ise neredeyse SON adımdı.',
        en: 'Step 7 — LIMIT: only the first row of the sorted result survives. Journey\'s end: rows that started at FROM passed through WHERE → GROUP BY → HAVING → SELECT → ORDER BY to become one single row — SELECT was written first, but it executed nearly LAST.',
      },
      code: { tr: `LIMIT 1`, en: `LIMIT 1` },
      positions: {
        sorted: { x: 30, y: 50, opacity: 0.5, scale: 0.85 },
        final: { x: 62, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'sorted', to: 'final' }],
    },
  ],
}
// ─── Intro & Why film — SELECT'in bildirimsel (declarative) doğası ─────────
const sqlIntroWhyFilm = {
  type: 'video-scene',
  id: 'sql-intro-why-film',
  title: { tr: '🎬 SQL Neden "Nasıl" Değil "Ne" Sorar', en: '🎬 Why SQL Asks "What", Not "How"' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'request', emoji: '📝', label: { tr: 'SELECT İsteği', en: 'SELECT Request' }, color: '#6366f1' },
    { id: 'javaLoop', emoji: '☕', label: { tr: 'Java for-döngüsü', en: 'Java for-loop' }, color: '#94a3b8' },
    { id: 'engine', emoji: '🗄️', label: { tr: 'SQL Motoru', en: 'SQL Engine' }, color: '#0ea5e9' },
    { id: 'plan', emoji: '🧭', label: { tr: 'Execution Plan', en: 'Execution Plan' }, color: '#f59e0b' },
    { id: 'rows', emoji: '📦', label: { tr: 'Sonuç Satırları', en: 'Result Rows' }, color: '#22c55e' },
    { id: 'final', emoji: '✅', label: { tr: 'QA Doğrulaması', en: 'QA Verification' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir QA mühendisi backend durumunu doğrulamak istiyor: "FAIL durumundaki testleri göster." Bunu Java\'da yazsaydın bir for-döngüsüyle listeyi elle tarardın; SQL\'de sadece SONUCU tarif edersin.',
        en: 'A QA engineer wants to verify backend state: "show me the FAIL tests." In Java you would write a for-loop to walk the list by hand; in SQL you only describe the RESULT you want.',
      },
      code: { tr: `SELECT * FROM test_results WHERE status = 'FAIL';`, en: `SELECT * FROM test_results WHERE status = 'FAIL';` },
      positions: { request: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Java\'da aynı isteği karşılamak için "nasıl" yapılacağını adım adım söylersin: listeyi gez, her elemanı kontrol et, uyanı ayrı bir listeye ekle. Bu emir cümlesi (imperative) tarzıdır.',
        en: 'In Java, satisfying the same request means spelling out HOW step by step: walk the list, check each item, add matches to a new list. This is the imperative style.',
      },
      code: { tr: `for (TestResult r : results) {\n    if (r.getStatus().equals("FAIL")) {\n        failed.add(r);\n    }\n}`, en: `for (TestResult r : results) {\n    if (r.getStatus().equals("FAIL")) {\n        failed.add(r);\n    }\n}` },
      positions: {
        request: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        javaLoop: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'request', to: 'javaLoop', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'SQL motoru ise cümleyi hiç bu şekilde okumaz. İsteği alır ve kendi başına en verimli fiziksel planı (execution plan) üretir — index kullanılsın mı, tablo baştan mı taransın, motor karar verir.',
        en: 'The SQL engine never reads the request that way. It receives the request and produces its own most efficient physical execution plan — whether to use an index or scan the table, the engine decides.',
      },
      positions: {
        javaLoop: { x: 14, y: 60, scale: 0.7, opacity: 0.35 },
        engine: { x: 40, y: 45, scale: 1.1, pulse: true },
        plan: { x: 66, y: 55, scale: 1.15 },
      },
      beams: [{ from: 'engine', to: 'plan' }],
    },
    {
      caption: {
        tr: 'Plan çalıştırılır, tablo taranır, koşula uyan satırlar toplanır. Sen "nasıl tarayacağını" hiç yazmadın — sadece "FAIL olanları istiyorum" dedin.',
        en: 'The plan executes, the table is scanned, matching rows are collected. You never wrote HOW to scan — you only said "I want the FAIL ones."',
      },
      positions: {
        plan: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        rows: { x: 62, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'plan', to: 'rows' }],
    },
    {
      caption: {
        tr: 'Final: QA mühendisi için bu fark hayatidir — UI testinin arkasındaki gerçek veriyi doğrulamak için karmaşık bir traversal kodu yazmana gerek yok, sadece istediğin sonucu tarif eden tek satır SQL yeter.',
        en: 'Final: for a QA engineer this difference matters — verifying the real data behind a UI test does not require writing complex traversal code, just one SQL line describing the result you want.',
      },
      positions: {
        rows: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        final: { x: 66, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'rows', to: 'final' }],
    },
  ],
}

// ─── Installation film — İlk bağlantı akışı ─────────────────────────────────
const sqlInstallationFilm = {
  type: 'video-scene',
  id: 'sql-installation-film',
  title: { tr: '🎬 Kurulum Sonrası: İlk Bağlantı El Sıkışması', en: '🎬 After Installation: The First Connection Handshake' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'client', emoji: '💻', label: { tr: 'SQL İstemcisi', en: 'SQL Client' }, color: '#6366f1' },
    { id: 'wrongAuth', emoji: '🔑', label: { tr: 'Yanlış Şifre', en: 'Wrong Password' }, color: '#94a3b8' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Reddedilen Bağlantı', en: 'Rejected Connection' }, color: '#ef4444' },
    { id: 'engine', emoji: '🗄️', label: { tr: 'Veritabanı Sunucusu', en: 'Database Server' }, color: '#0ea5e9' },
    { id: 'session', emoji: '🔌', label: { tr: 'Açık Session', en: 'Open Session' }, color: '#f59e0b' },
    { id: 'verify', emoji: '✅', label: { tr: 'SELECT 1 Doğrulaması', en: 'SELECT 1 Verification' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Kurulum bitti ama iş burada bitmiyor — istemci, veritabanı sunucusuna gerçekten konuşabildiğini KANITLAMALI. İlk adım her zaman bir bağlantı denemesidir.',
        en: 'Installation is done, but the job is not finished — the client must PROVE it can actually talk to the database server. The first step is always a connection attempt.',
      },
      positions: { client: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Yanlış şifreyle bağlanmaya çalışırsan sunucu seni tanımaz ve bağlantıyı reddeder — bu, kurulumun bozuk olduğu anlamına gelmez, sadece kimlik doğrulamanın çalıştığını gösterir.',
        en: 'If you try to connect with the wrong password, the server does not recognize you and rejects the connection — this does NOT mean the install is broken, it proves authentication is working.',
      },
      code: { tr: `psql -U postgres -d testdb\n# Şifre: yanlis_sifre123`, en: `psql -U postgres -d testdb\n# Password: wrong_password123` },
      positions: {
        client: { x: 16, y: 40, scale: 0.9, opacity: 0.7 },
        wrongAuth: { x: 45, y: 55, scale: 1.1 },
        ghost: { x: 74, y: 45, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'wrongAuth', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Doğru kimlik bilgileriyle tekrar denersin — sunucu bu sefer seni tanır ve bir oturum (session) açar. Kurulum artık gerçekten çalışıyor demektir.',
        en: 'You try again with the correct credentials — this time the server recognizes you and opens a session. The installation is now genuinely working.',
      },
      code: { tr: `psql -U postgres -d testdb\n# Şifre: (doğru şifre)`, en: `psql -U postgres -d testdb\n# Password: (correct password)` },
      positions: {
        ghost: { x: 14, y: 60, scale: 0.65, opacity: 0.3 },
        engine: { x: 44, y: 45, scale: 1.1, pulse: true },
        session: { x: 72, y: 55, scale: 1.15 },
      },
      beams: [{ from: 'engine', to: 'session' }],
    },
    {
      caption: {
        tr: 'Son adım: kurulumu KANITLAYAN doğrulama sorgusu. `SELECT 1;` sonuç döndürüyorsa, istemciden motora kadar tüm zincir çalışıyor demektir — artık test veritabanına güvenle bağlanabilirsin.',
        en: 'Final step: the verification query that PROVES the install. If `SELECT 1;` returns a result, the whole chain from client to engine works — you can now safely connect to your test database.',
      },
      code: { tr: `SELECT 1;\n-- çıktı: 1 satır döndü`, en: `SELECT 1;\n-- output: 1 row returned` },
      positions: {
        session: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        verify: { x: 66, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'session', to: 'verify' }],
    },
  ],
}

// ─── CREATE TABLE film — Şema kalıbı ve constraint reddi ───────────────────
const sqlCreateTableFilm = {
  type: 'video-scene',
  id: 'sql-create-table-film',
  title: { tr: '🎬 CREATE TABLE: Kalıcı Şema Kalıbı', en: '🎬 CREATE TABLE: The Permanent Schema Mold' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'blueprint', emoji: '📐', label: { tr: 'Şema Tasarımı', en: 'Schema Design' }, color: '#6366f1' },
    { id: 'engine', emoji: '🗄️', label: { tr: 'Veritabanı Motoru', en: 'Database Engine' }, color: '#0ea5e9' },
    { id: 'table', emoji: '🗂️', label: { tr: 'Kalıcı Tablo', en: 'Persistent Table' }, color: '#f59e0b' },
    { id: 'badRow', emoji: '📦', label: { tr: 'Kısıtlamayı İhlal Eden Satır', en: 'Row Violating Constraint' }, color: '#8b5cf6' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Reddedilen INSERT', en: 'Rejected INSERT' }, color: '#ef4444' },
    { id: 'goodRow', emoji: '✅', label: { tr: 'Kabul Edilen Satır', en: 'Accepted Row' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'CREATE TABLE, Java\'daki bir class tanımına benzer — ama fark şu: Java nesnesi program kapanınca bellekten silinir, SQL tablosu ise diske kalıcı olarak yazılır.',
        en: 'CREATE TABLE resembles a Java class definition — but the difference is: a Java object disappears from memory when the program exits, while a SQL table is written permanently to disk.',
      },
      code: { tr: `CREATE TABLE test_results (\n    id     INT PRIMARY KEY,\n    status VARCHAR(10) NOT NULL\n);`, en: `CREATE TABLE test_results (\n    id     INT PRIMARY KEY,\n    status VARCHAR(10) NOT NULL\n);` },
      positions: { blueprint: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Motor bu şemayı alır ve tabloyu fiziksel olarak diske kalıcı hale getirir. Artık her satır bu kalıba uymak ZORUNDADIR.',
        en: 'The engine takes this schema and physically persists the table to disk. From now on every row is FORCED to conform to this mold.',
      },
      positions: {
        blueprint: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        engine: { x: 45, y: 55, scale: 1.1 },
        table: { x: 72, y: 45, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'engine', to: 'table' }],
    },
    {
      caption: {
        tr: 'Kontrast: id sütununu boş bırakan bir INSERT deneriz. PRIMARY KEY NULL olamayacağı için motor bu satırı KABUL ETMEZ — kalıba uymayan hiçbir veri tabloya giremez.',
        en: 'Contrast: we try an INSERT that leaves id empty. Since PRIMARY KEY can never be NULL, the engine REJECTS this row — no data that violates the mold can enter the table.',
      },
      code: { tr: `INSERT INTO test_results (status) VALUES ('PASS');\n-- HATA: id NOT NULL/PRIMARY KEY`, en: `INSERT INTO test_results (status) VALUES ('PASS');\n-- ERROR: id NOT NULL/PRIMARY KEY` },
      positions: {
        table: { x: 20, y: 40, scale: 0.9, opacity: 0.6 },
        badRow: { x: 48, y: 55, scale: 1.1 },
        ghost: { x: 76, y: 45, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'badRow', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final: id ve status ile eksiksiz bir satır gönderdiğimizde, motor kalıba uyduğunu doğrular ve satırı kalıcı olarak kabul eder. QA için bu şu demektir: yanlış tanımlı bir sütun tipi, ilerideki test verisi eklemede sessiz hatalara yol açar.',
        en: 'Final: when we send a complete row with id and status, the engine confirms it matches the mold and permanently accepts it. For QA this means: a wrongly defined column type can cause silent failures later when seeding test data.',
      },
      code: { tr: `INSERT INTO test_results (id, status) VALUES (1, 'PASS');\n-- OK`, en: `INSERT INTO test_results (id, status) VALUES (1, 'PASS');\n-- OK` },
      positions: {
        ghost: { x: 16, y: 60, scale: 0.65, opacity: 0.3 },
        goodRow: { x: 62, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'table', to: 'goodRow' }],
    },
  ],
}

// ─── INSERT INTO film — Satır oluşturma ve tip/constraint reddi ─────────────
const sqlInsertIntoFilm = {
  type: 'video-scene',
  id: 'sql-insert-into-film',
  title: { tr: '🎬 INSERT INTO: Yeni Satırın Yolculuğu', en: '🎬 INSERT INTO: A New Row\'s Journey' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'newRow', emoji: '📦', label: { tr: 'Yeni Satır', en: 'New Row' }, color: '#6366f1' },
    { id: 'check', emoji: '🔍', label: { tr: 'Tip/Constraint Kontrolü', en: 'Type/Constraint Check' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Reddedilen Satır', en: 'Rejected Row' }, color: '#ef4444' },
    { id: 'table', emoji: '🗄️', label: { tr: 'test_results Tablosu', en: 'test_results Table' }, color: '#0ea5e9' },
    { id: 'stored', emoji: '✅', label: { tr: 'Kalıcı Satır', en: 'Persisted Row' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'INSERT INTO, tabloya yeni bir satır teklif etmektir — Java\'da bir listeye `.add()` çağırmak gibi görünür ama SQL\'de bu satır önce bir denetimden geçmelidir.',
        en: 'INSERT INTO proposes a new row to the table — it looks like calling `.add()` on a Java list, but in SQL this row must first pass an inspection.',
      },
      code: { tr: `INSERT INTO test_results (test_name, status)\nVALUES ('Signup Test', 'PASS');`, en: `INSERT INTO test_results (test_name, status)\nVALUES ('Signup Test', 'PASS');` },
      positions: { newRow: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Motor her değeri sütunun tipiyle ve kısıtlamalarıyla (NOT NULL, UNIQUE, PRIMARY KEY) karşılaştırır — bu satır kalıba uyuyor mu diye kontrol eder.',
        en: 'The engine checks every value against the column\'s type and constraints (NOT NULL, UNIQUE, PRIMARY KEY) — verifying this row fits the mold.',
      },
      positions: {
        newRow: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        check: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'newRow', to: 'check' }],
    },
    {
      caption: {
        tr: 'Kontrast: aynı id ile ikinci bir satır eklemeye çalışırsak — PRIMARY KEY zaten kullanılmış olduğu için motor bu satırı reddeder, veritabanına asla girmez.',
        en: 'Contrast: if we try inserting a second row with the same id — since PRIMARY KEY is already taken, the engine rejects this row, it never enters the database.',
      },
      code: { tr: `INSERT INTO test_results (id, test_name) VALUES (1, 'Duplicate');\n-- HATA: UNIQUE constraint failed`, en: `INSERT INTO test_results (id, test_name) VALUES (1, 'Duplicate');\n-- ERROR: UNIQUE constraint failed` },
      positions: {
        check: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 66, y: 55, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'check', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final: kalıba uyan satır kontrolü geçer ve tabloya KALICI olarak yazılır. Java nesnesinin aksine, bu satır programı kapatsan da diskte durmaya devam eder.',
        en: 'Final: a row that fits the mold passes the check and is written PERMANENTLY to the table. Unlike a Java object, this row keeps existing on disk even after the program closes.',
      },
      positions: {
        ghost: { x: 16, y: 60, scale: 0.65, opacity: 0.3 },
        table: { x: 42, y: 45, scale: 1.05 },
        stored: { x: 70, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'table', to: 'stored' }],
    },
  ],
}

// ─── SELECT & Sort film — WHERE filtresi + ORDER BY sıralama ───────────────
const sqlSelectSortFilm = {
  type: 'video-scene',
  id: 'sql-select-sort-film',
  title: { tr: '🎬 SELECT: Önce Filtrele, Sonra Sırala', en: '🎬 SELECT: Filter First, Then Sort' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'table', emoji: '🗄️', label: { tr: 'Tüm Satırlar', en: 'All Rows' }, color: '#0ea5e9' },
    { id: 'filter', emoji: '🔍', label: { tr: 'WHERE Filtresi', en: 'WHERE Filter' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Elenen Satır', en: 'Rejected Row' }, color: '#ef4444' },
    { id: 'sorter', emoji: '🔀', label: { tr: 'ORDER BY', en: 'ORDER BY' }, color: '#8b5cf6' },
    { id: 'result', emoji: '🏆', label: { tr: 'Sıralı Sonuç', en: 'Sorted Result' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Tabloda hem PASS hem FAIL satırları var. Amacımız: sadece FAIL olanları, en uzun süren en üstte olacak şekilde görmek.',
        en: 'The table has both PASS and FAIL rows. Our goal: see only the FAIL ones, with the longest-running test at the top.',
      },
      code: { tr: `SELECT test_name, duration_ms\nFROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;`, en: `SELECT test_name, duration_ms\nFROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;` },
      positions: { table: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'WHERE devreye girer: her satırı tek tek kontrol eder. `status = \'FAIL\'` olmayan satırlar burada elenir (soluk figür) ve sonraki adıma HİÇ ulaşmaz.',
        en: 'WHERE kicks in: it checks each row one by one. Rows where `status = \'FAIL\'` is false are rejected here (faded figure) and NEVER reach the next step.',
      },
      positions: {
        table: { x: 16, y: 40, scale: 0.9, opacity: 0.6 },
        filter: { x: 45, y: 55, scale: 1.15, pulse: true },
        ghost: { x: 74, y: 45, opacity: 0.5, scale: 0.85 },
      },
      beams: [{ from: 'filter', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Sadece FAIL satırları kalır. Şimdi ORDER BY devreye girer ve kalan satırları duration_ms\'e göre BÜYÜKTEN küçüğe diziyor.',
        en: 'Only the FAIL rows remain. Now ORDER BY kicks in and arranges the remaining rows by duration_ms from LARGEST to smallest.',
      },
      positions: {
        ghost: { x: 14, y: 60, scale: 0.6, opacity: 0.3 },
        filter: { x: 34, y: 45, scale: 0.85, opacity: 0.6 },
        sorter: { x: 66, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'filter', to: 'sorter' }],
    },
    {
      caption: {
        tr: 'Final: yalnızca FAIL testleri, en yavaş en üstte olacak şekilde sıralı geldi. Filtreleme HER ZAMAN sıralamadan önce çalışır — sıralamanın işi yalnızca zaten filtrelenmiş satırları düzenlemektir.',
        en: 'Final: only FAIL tests arrive, with the slowest at the top. Filtering ALWAYS runs before sorting — sorting\'s only job is to arrange rows that are already filtered.',
      },
      positions: {
        sorter: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        result: { x: 66, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'sorter', to: 'result' }],
    },
  ],
}

// ─── UPDATE & DELETE film — WHERE'siz komutun felaketi ─────────────────────
const sqlUpdateDeleteFilm = {
  type: 'video-scene',
  id: 'sql-update-delete-film',
  title: { tr: '🎬 WHERE\'siz UPDATE: Klasik QA Felaketi', en: '🎬 UPDATE Without WHERE: The Classic QA Disaster' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'table', emoji: '🗄️', label: { tr: 'test_results (500 satır)', en: 'test_results (500 rows)' }, color: '#0ea5e9' },
    { id: 'noWhere', emoji: '💥', label: { tr: 'WHERE\'siz UPDATE', en: 'UPDATE Without WHERE' }, color: '#ef4444' },
    { id: 'ghostAll', emoji: '👻', label: { tr: '500 Satır ETKİLENDİ', en: '500 Rows AFFECTED' }, color: '#ef4444' },
    { id: 'safeSelect', emoji: '🔍', label: { tr: 'Önce SELECT ile Kontrol', en: 'Check with SELECT First' }, color: '#f59e0b' },
    { id: 'safeWhere', emoji: '🎯', label: { tr: 'WHERE\'li UPDATE', en: 'UPDATE With WHERE' }, color: '#8b5cf6' },
    { id: 'oneRow', emoji: '✅', label: { tr: '1 Satır Etkilendi', en: '1 Row Affected' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'test_results tablosunda 500 satır var. Bir mühendis "id=42 olan testi PASS yap" derken WHERE yazmayı unutuyor.',
        en: 'The test_results table has 500 rows. An engineer means "mark test id=42 as PASS" but forgets to write WHERE.',
      },
      code: { tr: `UPDATE test_results SET status = 'PASS';\n-- WHERE YOK!`, en: `UPDATE test_results SET status = 'PASS';\n-- NO WHERE!` },
      positions: { table: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Felaket: UPDATE her satırı hedef alır çünkü hiçbir koşul onu sınırlamıyor. 500 satırın TAMAMI status=\'PASS\' oluyor — geçmiş FAIL kayıtları sessizce kayboluyor.',
        en: 'Disaster: UPDATE targets every row because no condition limits it. ALL 500 rows become status=\'PASS\' — the history of FAIL records silently vanishes.',
      },
      positions: {
        table: { x: 16, y: 40, scale: 0.9, opacity: 0.6 },
        noWhere: { x: 45, y: 55, scale: 1.15, pulse: true },
        ghostAll: { x: 76, y: 45, opacity: 0.55, scale: 1.1 },
      },
      beams: [{ from: 'noWhere', to: 'ghostAll', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Doğru refleks: HERHANGİ bir UPDATE/DELETE yazmadan önce, aynı WHERE koşuluyla bir SELECT çalıştır. Kaç satırın etkileneceğini önceden GÖR.',
        en: 'The correct reflex: before writing ANY UPDATE/DELETE, run a SELECT with the same WHERE condition. SEE how many rows will be affected beforehand.',
      },
      code: { tr: `SELECT * FROM test_results WHERE id = 42;\n-- 1 satır döner, doğrula`, en: `SELECT * FROM test_results WHERE id = 42;\n-- returns 1 row, verify` },
      positions: {
        ghostAll: { x: 14, y: 65, scale: 0.6, opacity: 0.3 },
        safeSelect: { x: 50, y: 45, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Şimdi WHERE ile aynı komutu çalıştır — motor sadece id=42 olan TEK satırı hedefler, geri kalan 499 satır dokunulmadan kalır.',
        en: 'Now run the same command WITH WHERE — the engine targets only the SINGLE row where id=42, the remaining 499 rows stay untouched.',
      },
      code: { tr: `UPDATE test_results SET status = 'PASS' WHERE id = 42;\n-- 1 satır etkilendi`, en: `UPDATE test_results SET status = 'PASS' WHERE id = 42;\n-- 1 row affected` },
      positions: {
        safeSelect: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        safeWhere: { x: 48, y: 55, scale: 1.1 },
        oneRow: { x: 78, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'safeWhere', to: 'oneRow' }],
    },
    {
      caption: {
        tr: 'Kural asla değişmez: production\'da WHERE\'siz UPDATE/DELETE çalıştırmak kariyeri bitirebilecek bir hatadır. Her zaman önce SELECT ile aynı koşulu dene, sonra UPDATE/DELETE\'e geç.',
        en: 'The rule never changes: running UPDATE/DELETE without WHERE in production is a career-ending mistake. Always test the same condition with SELECT first, then move to UPDATE/DELETE.',
      },
      positions: {
        oneRow: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
    },
  ],
}

// ─── NULL Values film — = NULL tuzağı vs IS NULL ───────────────────────────
const sqlNullValuesFilm = {
  type: 'video-scene',
  id: 'sql-null-values-film',
  title: { tr: '🎬 = NULL Tuzağı: Neden Hep 0 Satır Dönüyor', en: '🎬 The = NULL Trap: Why It Always Returns 0 Rows' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'row', emoji: '📦', label: { tr: 'phone = NULL Olan Satır', en: 'Row Where phone = NULL' }, color: '#8b5cf6' },
    { id: 'eqNull', emoji: '❓', label: { tr: '= NULL Karşılaştırması', en: '= NULL Comparison' }, color: '#f59e0b' },
    { id: 'unknown', emoji: '👻', label: { tr: 'UNKNOWN (0 Satır)', en: 'UNKNOWN (0 Rows)' }, color: '#ef4444' },
    { id: 'isNull', emoji: '🔑', label: { tr: 'IS NULL Operatörü', en: 'IS NULL Operator' }, color: '#0ea5e9' },
    { id: 'found', emoji: '✅', label: { tr: 'Doğru Bulunan Satır', en: 'Correctly Found Row' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Tabloda phone sütunu NULL olan bir satır var — telefon numarası hiç girilmemiş. Bu satırı bulmaya çalışıyoruz.',
        en: 'The table has a row where the phone column is NULL — no phone number was ever entered. We are trying to find this row.',
      },
      positions: { row: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Sezgisel yaklaşım: `WHERE phone = NULL` yazarız — tıpkı Java\'da `x == null` gibi görünür. Ama SQL\'in üç değerli mantığında NULL hiçbir şeye "eşit" DEĞİLDİR, kendisi dahil.',
        en: 'The intuitive approach: write `WHERE phone = NULL` — it looks like Java\'s `x == null`. But in SQL\'s three-valued logic, NULL is never "equal" to anything, not even itself.',
      },
      code: { tr: `SELECT * FROM users WHERE phone = NULL;`, en: `SELECT * FROM users WHERE phone = NULL;` },
      positions: {
        row: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        eqNull: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'row', to: 'eqNull' }],
    },
    {
      caption: {
        tr: 'Sonuç: karşılaştırma UNKNOWN döner (TRUE değil!) ve WHERE sadece TRUE olan satırları tutar. Sonuç: 0 satır — telefon numarası eksik olan satır GERÇEKTEN var olsa bile.',
        en: 'Result: the comparison evaluates to UNKNOWN (not TRUE!) and WHERE only keeps rows that are TRUE. Result: 0 rows — even though the row with the missing phone number REALLY exists.',
      },
      positions: {
        eqNull: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        unknown: { x: 66, y: 55, opacity: 0.55, scale: 1.1 },
      },
      beams: [{ from: 'eqNull', to: 'unknown', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kontrast: `IS NULL` özel bir operatördür — "eşitlik" sormaz, "bu değer bilinmiyor mu?" diye sorar. Bu soru NULL için TRUE döner.',
        en: 'Contrast: `IS NULL` is a special operator — it does not ask "is this equal", it asks "is this value unknown?". This question returns TRUE for NULL.',
      },
      code: { tr: `SELECT * FROM users WHERE phone IS NULL;`, en: `SELECT * FROM users WHERE phone IS NULL;` },
      positions: {
        unknown: { x: 16, y: 60, scale: 0.65, opacity: 0.3 },
        isNull: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final: `IS NULL` doğru satırı bulur. QA için ders: bir sorgu 0 satır döndürüyorsa ve "olmaması gerekiyor" diye düşünüyorsan, ilk şüphelin `= NULL` yazıp yazmadığın olmalı.',
        en: 'Final: `IS NULL` finds the correct row. Lesson for QA: if a query returns 0 rows and you think "that shouldn\'t happen", your first suspect should be whether you wrote `= NULL`.',
      },
      positions: {
        isNull: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        found: { x: 66, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'isNull', to: 'found' }],
    },
  ],
}

// ─── SQL Query Order sekmesi — eksik sandbox (code-playground) ─────────────
const sqlQueryOrderPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-query-order',
  id: 'sql-query-order-practice-01',
  label: { tr: 'Micro Lab: Alias Kırılmasını Kendi Elinle Çöz', en: 'Micro Lab: Fix the Alias Break Yourself' },
  language: 'sql',
  task: {
    tr: 'Filmdeki kuralı uygula: SELECT aşamasında tanımlanan bir alias, WHERE aşamasında henüz mevcut değildir çünkü WHERE, SELECT\'ten ÖNCE çalışır. TODO satırını, alias yerine ham sütun adını kullanarak tamamla.',
    en: 'Apply the rule from the film: an alias defined in SELECT is not yet available in WHERE, because WHERE runs BEFORE SELECT. Complete the TODO line using the raw column name instead of the alias.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç mantıksal çalışma sırasını (FROM → WHERE → SELECT) elle uygulayarak pekiştirmek.',
    en: 'This is not a real runtime; the goal is to reinforce the logical execution order (FROM → WHERE → SELECT) by applying it yourself.',
  },
  code: {
    tr: `-- Hedef: sadece 5\'ten uzun süren testleri göster\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\nWHERE duration_ms > 5000;  -- alias değil, ham sütun adı!`,
    en: `-- Goal: show only tests running longer than 5s\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\nWHERE duration_ms > 5000;  -- raw column, not the alias!`,
  },
  starterCode: {
    tr: `-- Hedef: sadece 5sn'den uzun süren testleri göster\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\n-- TODO: WHERE koşulunu ham sütun adıyla yaz (alias kullanma!)`,
    en: `-- Goal: show only tests running longer than 5s\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\n-- TODO: write the WHERE condition with the raw column name (do not use the alias!)`,
  },
  solutionCode: {
    tr: `-- Hedef: sadece 5sn'den uzun süren testleri göster\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\nWHERE duration_ms > 5000;`,
    en: `-- Goal: show only tests running longer than 5s\nSELECT test_name, duration_ms AS slow_ms\nFROM test_results\nWHERE duration_ms > 5000;`,
  },
  expected: {
    tr: 'Sorgu hatasız çalışır ve duration_ms > 5000 olan satırları döndürür — slow_ms alias\'ı sadece SELECT çıktısında görünür isim olarak kalır.',
    en: 'The query runs without error and returns rows where duration_ms > 5000 — the slow_ms alias remains only a display name in the SELECT output.',
  },
  hints: [
    { tr: 'WHERE, SELECT\'ten ÖNCE çalıştığı için orada tanımlanan alias\'lar (slow_ms gibi) WHERE aşamasında henüz doğmamıştır.', en: 'Because WHERE runs BEFORE SELECT, aliases defined there (like slow_ms) do not yet exist during the WHERE stage.' },
    { tr: 'TODO satırında `slow_ms` yerine gerçek sütun adı olan `duration_ms`\'i kullan.', en: 'In the TODO line, use the real column name `duration_ms` instead of `slow_ms`.' },
    { tr: 'Doğru sözdizimi: `WHERE duration_ms > 5000;` — alias sadece SELECT çıktısında görünür.', en: 'The correct syntax is: `WHERE duration_ms > 5000;` — the alias only appears in the SELECT output.' },
  ],
  xpReward: 10,
}

// ─── Aggregate Functions film — Satırların tek özet değere çökmesi ─────────
const sqlAggregateFilm = {
  type: 'video-scene',
  id: 'sql-aggregate-film',
  title: { tr: '🎬 Aggregate: Yüzlerce Satır, Tek Sayı', en: '🎬 Aggregate: Hundreds of Rows, One Number' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'rows', emoji: '📦', label: { tr: 'Tüm Test Satırları', en: 'All Test Rows' }, color: '#0ea5e9' },
    { id: 'count', emoji: '🔢', label: { tr: 'COUNT(*)', en: 'COUNT(*)' }, color: '#f59e0b' },
    { id: 'avg', emoji: '📊', label: { tr: 'AVG(duration_ms)', en: 'AVG(duration_ms)' }, color: '#8b5cf6' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Ham Satırlar (Görünmez Oldu)', en: 'Raw Rows (Vanished)' }, color: '#94a3b8' },
    { id: 'summary', emoji: '🏆', label: { tr: 'Tek Özet Satır', en: 'One Summary Row' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'test_results tablosunda 500 satır var. "Kaç test var, ortalama ne kadar sürüyor?" sorusuna cevap ararken 500 satırı tek tek OKUMAK istemeyiz.',
        en: 'The test_results table has 500 rows. When asking "how many tests are there, what\'s the average duration?", we do NOT want to read 500 rows one by one.',
      },
      code: { tr: `SELECT COUNT(*) AS total, AVG(duration_ms) AS avg_ms\nFROM test_results;`, en: `SELECT COUNT(*) AS total, AVG(duration_ms) AS avg_ms\nFROM test_results;` },
      positions: { rows: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'COUNT(*), satırları teker teker sayar ama sana her satırı GÖSTERMEZ — sadece kaç tane olduğunu söyler. 500 satır tek bir sayıya dönüşür.',
        en: 'COUNT(*) counts rows one by one but does NOT show you each row — it only tells you how many there are. 500 rows collapse into a single number.',
      },
      positions: {
        rows: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        count: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'rows', to: 'count' }],
    },
    {
      caption: {
        tr: 'Aynı anda AVG de tüm duration_ms değerlerini toplar ve satır sayısına böler. Ham satırlar artık görünmez oldu (soluk figür) — sadece özet kaldı.',
        en: 'At the same time AVG sums all duration_ms values and divides by the row count. The raw rows have become invisible (faded figure) — only the summary remains.',
      },
      positions: {
        count: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        avg: { x: 55, y: 55, scale: 1.15, pulse: true },
        ghost: { x: 80, y: 45, opacity: 0.4, scale: 0.8 },
      },
      beams: [{ from: 'avg', to: 'ghost', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Final: 500 satır tek bir özet satıra çöktü — total=500, avg_ms=1840. Java analojisi: bu, bir List üzerinde `.stream().count()` ve `.stream().mapToInt(...).average()` çağırmak gibidir — ama SQL bunu TEK sorguda yapar.',
        en: 'Final: 500 rows collapsed into one summary row — total=500, avg_ms=1840. Java analogy: this is like calling `.stream().count()` and `.stream().mapToInt(...).average()` on a List — but SQL does it in ONE query.',
      },
      positions: {
        avg: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        summary: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'avg', to: 'summary' }],
    },
  ],
}

// ─── GROUP BY & HAVING film — Gruplama sonra grup filtreleme ──────────────
const sqlGroupByHavingFilm = {
  type: 'video-scene',
  id: 'sql-group-by-having-film',
  title: { tr: '🎬 GROUP BY Gruplar, HAVING Grupları Filtreler', en: '🎬 GROUP BY Buckets, HAVING Filters Buckets' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'rows', emoji: '📦', label: { tr: 'FAIL Satırları', en: 'FAIL Rows' }, color: '#6366f1' },
    { id: 'buckets', emoji: '🗂️', label: { tr: 'env\'e Göre Gruplar', en: 'Groups by env' }, color: '#f59e0b' },
    { id: 'having', emoji: '🚦', label: { tr: 'HAVING Kapısı', en: 'HAVING Gate' }, color: '#f97316' },
    { id: 'ghostGroup', emoji: '👻', label: { tr: 'Elenen Grup (az hata)', en: 'Rejected Group (few failures)' }, color: '#ef4444' },
    { id: 'passedGroup', emoji: '✅', label: { tr: 'Geçen Grup (çok hata)', en: 'Passed Group (many failures)' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Amaç: "5\'ten FAZLA hatası olan ortamları göster." Önce satırları env\'e (staging, prod) göre kovalara ayırmamız gerekiyor.',
        en: 'Goal: "show environments with MORE THAN 5 failures." First we need to bucket rows by env (staging, prod).',
      },
      code: { tr: `SELECT env, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nHAVING COUNT(*) > 5;`, en: `SELECT env, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'\nGROUP BY env\nHAVING COUNT(*) > 5;` },
      positions: { rows: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'GROUP BY, satırları env değerine göre kovalara ayırır. Her kova artık TEK bir grup olarak işlem görür — satırlar birer birer değil, grup halinde ele alınır.',
        en: 'GROUP BY buckets rows by their env value. Each bucket is now treated as a SINGLE group — rows are handled as a group, not one by one.',
      },
      positions: {
        rows: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        buckets: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'rows', to: 'buckets' }],
    },
    {
      caption: {
        tr: 'HAVING devreye girer — ama WHERE\'den FARKLI bir şey filtreler: WHERE satırları eler, HAVING ise GRUPLARI eler. "staging" grubunda 3 hata var, 5\'i geçmiyor — bu grup reddedilir.',
        en: 'HAVING kicks in — but it filters something DIFFERENT from WHERE: WHERE rejects rows, HAVING rejects GROUPS. The "staging" group has 3 failures, not over 5 — this group is rejected.',
      },
      positions: {
        buckets: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        having: { x: 50, y: 55, scale: 1.15, pulse: true },
        ghostGroup: { x: 80, y: 45, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'having', to: 'ghostGroup', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '"prod" grubunda ise 12 hata var — 5\'i geçiyor, HAVING kapısından GEÇER. Final: sadece gerçekten sorunlu ortamlar listelenir.',
        en: 'The "prod" group has 12 failures — it exceeds 5, it PASSES through the HAVING gate. Final: only environments that are genuinely problematic are listed.',
      },
      positions: {
        ghostGroup: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        having: { x: 30, y: 45, scale: 0.85, opacity: 0.6 },
        passedGroup: { x: 66, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'having', to: 'passedGroup' }],
    },
  ],
}

// ─── SQL JOINs film — INNER vs LEFT JOIN eşleşmeyen satır ──────────────────
const sqlJoinsFilm = {
  type: 'video-scene',
  id: 'sql-joins-film',
  title: { tr: '🎬 INNER JOIN Kaybeder, LEFT JOIN Korur', en: '🎬 INNER JOIN Loses It, LEFT JOIN Keeps It' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'testers', emoji: '🧑‍💼', label: { tr: 'testers Tablosu', en: 'testers Table' }, color: '#6366f1' },
    { id: 'bugs', emoji: '🐞', label: { tr: 'bugs Tablosu', en: 'bugs Table' }, color: '#f59e0b' },
    { id: 'inner', emoji: '🔗', label: { tr: 'INNER JOIN', en: 'INNER JOIN' }, color: '#8b5cf6' },
    { id: 'ghostTester', emoji: '👻', label: { tr: 'Bug\'ı Olmayan Tester (Kayboldu)', en: 'Tester Without Bugs (Vanished)' }, color: '#ef4444' },
    { id: 'leftJoin', emoji: '🔀', label: { tr: 'LEFT JOIN', en: 'LEFT JOIN' }, color: '#0ea5e9' },
    { id: 'nullFill', emoji: '⬜', label: { tr: 'NULL ile Dolduruldu', en: 'Filled with NULL' }, color: '#94a3b8' },
    { id: 'final', emoji: '✅', label: { tr: 'Tüm Testerlar Görünür', en: 'All Testers Visible' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'İki tablo var: testers (3 kişi) ve bugs (sadece 2 kişinin raporladığı hatalar). Amaç: her testerın kaç bug raporladığını görmek.',
        en: 'There are two tables: testers (3 people) and bugs (bugs reported by only 2 of them). Goal: see how many bugs each tester reported.',
      },
      positions: { testers: { x: 30, y: 45, scale: 1.05 }, bugs: { x: 70, y: 55, scale: 1.05 } },
    },
    {
      caption: {
        tr: 'INNER JOIN ile denersek: sadece HER İKİ tabloda da eşleşme olan satırlar kalır. Hiç bug raporlamamış tester tamamen KAYBOLUR — sanki hiç yokmuş gibi.',
        en: 'If we use INNER JOIN: only rows with a match in BOTH tables survive. A tester who never reported a bug DISAPPEARS entirely — as if they never existed.',
      },
      code: { tr: `SELECT t.name, COUNT(b.id) AS bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.name;`, en: `SELECT t.name, COUNT(b.id) AS bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.name;` },
      positions: {
        testers: { x: 16, y: 40, scale: 0.9, opacity: 0.6 },
        bugs: { x: 16, y: 65, scale: 0.9, opacity: 0.6 },
        inner: { x: 46, y: 52, scale: 1.1, pulse: true },
        ghostTester: { x: 78, y: 45, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'inner', to: 'ghostTester', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kontrast: LEFT JOIN yazarsak — sol tablodaki (testers) TÜM satırlar korunur. Eşleşme yoksa sağ taraf (bug bilgisi) NULL ile doldurulur, satır KAYBOLMAZ.',
        en: 'Contrast: if we write LEFT JOIN — ALL rows from the left table (testers) are preserved. If there is no match, the right side (bug info) is filled with NULL, the row does NOT vanish.',
      },
      code: { tr: `SELECT t.name, COUNT(b.id) AS bugs\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.name;`, en: `SELECT t.name, COUNT(b.id) AS bugs\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.name;` },
      positions: {
        ghostTester: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        leftJoin: { x: 48, y: 45, scale: 1.15, pulse: true },
        nullFill: { x: 76, y: 55, scale: 0.95 },
      },
      beams: [{ from: 'leftJoin', to: 'nullFill' }],
    },
    {
      caption: {
        tr: 'Final: bug raporlamayan tester bile listede görünür — bugs=0 ile. QA raporlaması için LEFT JOIN kritiktir: "hiç hata bulmayan" testerları da GÖRMEK isteriz, onları listeden silmek değil.',
        en: 'Final: even the tester who reported no bugs appears in the list — with bugs=0. LEFT JOIN is critical for QA reporting: we WANT to see testers who found zero bugs too, not erase them from the list.',
      },
      positions: {
        nullFill: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        final: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'nullFill', to: 'final' }],
    },
  ],
}

// ─── Subqueries film — İç sorgu önce çalışır ────────────────────────────────
const sqlSubqueriesFilm = {
  type: 'video-scene',
  id: 'sql-subqueries-film',
  title: { tr: '🎬 Alt Sorgu: İçeriden Dışarıya Doğru Çalışır', en: '🎬 Subquery: Executes From Inside Out' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'inner', emoji: '🔎', label: { tr: 'İç Sorgu (AVG)', en: 'Inner Query (AVG)' }, color: '#f59e0b' },
    { id: 'value', emoji: '📦', label: { tr: 'Tek Sonuç Değeri', en: 'Single Result Value' }, color: '#8b5cf6' },
    { id: 'outer', emoji: '🗄️', label: { tr: 'Dış Sorgu', en: 'Outer Query' }, color: '#0ea5e9' },
    { id: 'ghostLoop', emoji: '👻', label: { tr: 'Correlated: Her Satır İçin Tekrar', en: 'Correlated: Reruns Per Row' }, color: '#ef4444' },
    { id: 'final', emoji: '✅', label: { tr: 'Filtrelenmiş Sonuç', en: 'Filtered Result' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Amaç: "ortalamadan daha uzun süren testleri bul." Bu soruda önce "ortalama nedir?" sorusunun cevaplanması gerekiyor — bu, iç sorgunun işi.',
        en: 'Goal: "find tests that ran longer than average." This question requires first answering "what is the average?" — that is the inner query\'s job.',
      },
      code: { tr: `SELECT * FROM test_results\nWHERE duration_ms > (\n    SELECT AVG(duration_ms) FROM test_results\n);`, en: `SELECT * FROM test_results\nWHERE duration_ms > (\n    SELECT AVG(duration_ms) FROM test_results\n);` },
      positions: { inner: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Motor önce parantez içindeki iç sorguyu TAMAMEN çalıştırır — BİR KEZ. Bu sorgu tek bir sayı üretir: ortalama süre.',
        en: 'The engine fully executes the inner query inside the parentheses FIRST — ONCE. This query produces a single number: the average duration.',
      },
      positions: {
        inner: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        value: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'inner', to: 'value' }],
    },
    {
      caption: {
        tr: 'Bu tek değer artık dış sorgunun WHERE koşuluna sabit bir sayı gibi enjekte edilir — sanki `WHERE duration_ms > 1840` yazmışsın gibi.',
        en: 'This single value is now injected into the outer query\'s WHERE condition like a fixed number — as if you had written `WHERE duration_ms > 1840`.',
      },
      positions: {
        value: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        outer: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'value', to: 'outer' }],
    },
    {
      caption: {
        tr: 'Uyarı: bir de "correlated" alt sorgu türü var — dış sorgudaki bir sütuna referans verir ve dış sorgunun HER satırı için TEKRAR TEKRAR çalışır. Büyük tablolarda bu çok yavaş olabilir.',
        en: 'Warning: there is also a "correlated" subquery type — it references a column from the outer query and REPEATS for EACH row of the outer query. On large tables this can be very slow.',
      },
      code: { tr: `SELECT t.name,\n  (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;`, en: `SELECT t.name,\n  (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;` },
      positions: {
        outer: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        ghostLoop: { x: 60, y: 55, opacity: 0.5, scale: 1.05 },
      },
      beams: [{ from: 'outer', to: 'ghostLoop', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final: basit alt sorgu bir kez çalışıp filtrelenmiş sonucu döndürür — hızlıdır. Correlated alt sorgu tekrar tekrar çalışır — mümkünse yerine JOIN kullan.',
        en: 'Final: a simple subquery runs once and returns the filtered result — it is fast. A correlated subquery reruns repeatedly — use a JOIN instead when possible.',
      },
      positions: {
        ghostLoop: { x: 16, y: 62, scale: 0.6, opacity: 0.3 },
        final: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
    },
  ],
}

// ─── LIKE/BETWEEN/IN film — Üç farklı filtreleme mekanizması ───────────────
const sqlLikeBetweenInFilm = {
  type: 'video-scene',
  id: 'sql-like-between-in-film',
  title: { tr: '🎬 LIKE, BETWEEN, IN: Üç Farklı Eşleşme Şekli', en: '🎬 LIKE, BETWEEN, IN: Three Different Ways to Match' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'rows', emoji: '📦', label: { tr: 'Test Satırları', en: 'Test Rows' }, color: '#0ea5e9' },
    { id: 'like', emoji: '🔤', label: { tr: "LIKE '%Login%'", en: "LIKE '%Login%'" }, color: '#f59e0b' },
    { id: 'between', emoji: '📏', label: { tr: 'BETWEEN 1000 AND 3000', en: 'BETWEEN 1000 AND 3000' }, color: '#8b5cf6' },
    { id: 'inList', emoji: '📋', label: { tr: "IN ('staging','prod')", en: "IN ('staging','prod')" }, color: '#6366f1' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Eşleşmeyen Satır', en: 'Non-matching Row' }, color: '#ef4444' },
    { id: 'matched', emoji: '✅', label: { tr: 'Eşleşen Satırlar', en: 'Matched Rows' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Üç farklı arama ihtiyacımız var: isimde bir kelime GEÇEN testler, bir SÜRE ARALIĞINDAKİ testler, belirli bir LİSTEDEKİ ortamlar. Her biri farklı bir operatör ister.',
        en: 'We have three different search needs: tests where the name CONTAINS a word, tests within a DURATION RANGE, environments in a specific LIST. Each needs a different operator.',
      },
      positions: { rows: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: '`LIKE \'%Login%\'` bir DESEN arar: % işareti "önce/sonra herhangi bir şey olabilir" demektir. "Login Test" ve "User Login Flow" ikisi de eşleşir, "Checkout" eşleşmez (soluk figür).',
        en: '`LIKE \'%Login%\'` searches for a PATTERN: the % sign means "anything can come before/after". Both "Login Test" and "User Login Flow" match, "Checkout" does not (faded figure).',
      },
      code: { tr: `SELECT * FROM test_results WHERE test_name LIKE '%Login%';`, en: `SELECT * FROM test_results WHERE test_name LIKE '%Login%';` },
      positions: {
        rows: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        like: { x: 50, y: 55, scale: 1.15, pulse: true },
        ghost: { x: 80, y: 45, opacity: 0.5, scale: 0.85 },
      },
      beams: [{ from: 'like', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`BETWEEN 1000 AND 3000` bir ARALIK arar: iki sınır DAHİL olmak üzere arasındaki her değeri kabul eder — 999 veya 3001 kabul edilmez.',
        en: '`BETWEEN 1000 AND 3000` searches a RANGE: it accepts every value between the two bounds, INCLUSIVE — 999 or 3001 are not accepted.',
      },
      code: { tr: `SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;`, en: `SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;` },
      positions: {
        like: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        between: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'like', to: 'between' }],
    },
    {
      caption: {
        tr: '`IN (\'staging\', \'prod\')` bir LİSTE arar: birden fazla `OR environment = X` yazmak yerine, kabul edilecek tüm değerleri tek satırda listelersin.',
        en: '`IN (\'staging\', \'prod\')` searches a LIST: instead of writing multiple `OR environment = X`, you list all accepted values in one line.',
      },
      code: { tr: `SELECT * FROM test_results WHERE environment IN ('staging', 'prod');`, en: `SELECT * FROM test_results WHERE environment IN ('staging', 'prod');` },
      positions: {
        between: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        inList: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'between', to: 'inList' }],
    },
    {
      caption: {
        tr: 'Final: üçü de farklı bir eşleşme mantığı sunar ama ortak amaçları aynıdır — WHERE\'i tek tek `=` yazmaktan kurtarıp okunabilir hale getirmek.',
        en: 'Final: all three offer a different matching logic but share the same purpose — freeing WHERE from writing `=` one by one and making it readable.',
      },
      positions: {
        inList: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        matched: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'inList', to: 'matched' }],
    },
  ],
}

// ─── Window Functions film — Satırlar KORUNUR, GROUP BY gibi çökmez ───────
const sqlWindowFunctionsFilm = {
  type: 'video-scene',
  id: 'sql-window-functions-film',
  title: { tr: '🎬 Window Function: Satırları Kaybetmeden Sırala', en: '🎬 Window Function: Rank Without Losing Rows' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'rows', emoji: '📦', label: { tr: 'Tüm Satırlar (Korunur)', en: 'All Rows (Preserved)' }, color: '#6366f1' },
    { id: 'partition', emoji: '🪟', label: { tr: 'PARTITION BY env', en: 'PARTITION BY env' }, color: '#f59e0b' },
    { id: 'rank', emoji: '🏅', label: { tr: 'RANK() OVER', en: 'RANK() OVER' }, color: '#8b5cf6' },
    { id: 'groupGhost', emoji: '👻', label: { tr: 'GROUP BY Olsaydı: Satırlar Kaybolurdu', en: 'If GROUP BY: Rows Would Vanish' }, color: '#ef4444' },
    { id: 'final', emoji: '✅', label: { tr: 'Sıralı AMA Tam Satırlar', en: 'Ranked BUT Full Rows' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Amaç: her ortamda (env) testleri süreye göre sırala — ama HER satırı ayrı ayrı görmeye devam etmek istiyoruz, GROUP BY gibi özet satıra çökmesin.',
        en: 'Goal: rank tests by duration within each env — but we still want to see EVERY row individually, not collapsed into a summary like GROUP BY.',
      },
      code: { tr: `SELECT test_name, environment, duration_ms,\n  RANK() OVER (PARTITION BY environment ORDER BY duration_ms DESC) AS rnk\nFROM test_results;`, en: `SELECT test_name, environment, duration_ms,\n  RANK() OVER (PARTITION BY environment ORDER BY duration_ms DESC) AS rnk\nFROM test_results;` },
      positions: { rows: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'PARTITION BY, satırları env\'e göre gruplara ayırır — GROUP BY\'a benzer bir bölme. AMA fark hemen sonraki sahnede ortaya çıkacak.',
        en: 'PARTITION BY divides rows into groups by env — a split that looks like GROUP BY. BUT the difference reveals itself in the next scene.',
      },
      positions: {
        rows: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        partition: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'rows', to: 'partition' }],
    },
    {
      caption: {
        tr: 'Kontrast — GROUP BY olsaydı: env başına TEK bir özet satır kalır, hangi testin hangi sırada olduğu bilgisi tamamen KAYBOLURDU (hayalet).',
        en: 'Contrast — if GROUP BY were used instead: only ONE summary row per env would remain, all information about which test ranked where would be COMPLETELY LOST (ghost).',
      },
      positions: {
        partition: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        groupGhost: { x: 60, y: 55, opacity: 0.5, scale: 1.05 },
      },
      beams: [{ from: 'partition', to: 'groupGhost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'RANK() OVER ise farklı davranır: her satır kendi kimliğini KORUR, sadece yanına bir sıra numarası eklenir. Hiçbir satır kaybolmaz veya birleşmez.',
        en: 'RANK() OVER behaves differently: every row KEEPS its own identity, only a rank number is added next to it. No row is lost or merged.',
      },
      positions: {
        groupGhost: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        rank: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final: env başına sıralanmış AMA TAM satır listesi elde ederiz — "her testi göster, ayrıca hangi sırada olduğunu da söyle." Bu, GROUP BY\'ın asla veremeyeceği bir sonuçtur.',
        en: 'Final: we get a ranked list PER env but with FULL rows preserved — "show every test, and also tell me its rank." This is a result GROUP BY could never give.',
      },
      positions: {
        rank: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        final: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'rank', to: 'final' }],
    },
  ],
}

// ─── CTEs film — WITH bloğu okunabilir ara adım ────────────────────────────
const sqlCtesFilm = {
  type: 'video-scene',
  id: 'sql-ctes-film',
  title: { tr: '🎬 CTE: İç İçe Karmaşadan Okunabilir Adımlara', en: '🎬 CTE: From Nested Chaos to Readable Steps' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'messy', emoji: '🌀', label: { tr: 'İç İçe Alt Sorgu', en: 'Nested Subquery' }, color: '#ef4444' },
    { id: 'cte1', emoji: '📦', label: { tr: 'CTE: failed_tests', en: 'CTE: failed_tests' }, color: '#f59e0b' },
    { id: 'cte2', emoji: '📦', label: { tr: 'CTE: env_failures', en: 'CTE: env_failures' }, color: '#8b5cf6' },
    { id: 'final', emoji: '✅', label: { tr: 'Okunabilir Sonuç', en: 'Readable Result' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Karmaşık bir soru: "5\'ten fazla FAIL alan ortamları göster." Bunu tek bir iç içe alt sorguyla yazmaya çalışırsak, parantezler birbirine karışır ve okunması ZORLAŞIR.',
        en: 'A complex question: "show environments with more than 5 FAILs." Trying to write this as a single nested subquery makes the parentheses tangle and HARD to read.',
      },
      code: { tr: `SELECT * FROM (\n  SELECT environment, COUNT(*) c FROM (\n    SELECT * FROM test_results WHERE status='FAIL'\n  ) x GROUP BY environment\n) y WHERE c > 5;  -- okumak zor!`, en: `SELECT * FROM (\n  SELECT environment, COUNT(*) c FROM (\n    SELECT * FROM test_results WHERE status='FAIL'\n  ) x GROUP BY environment\n) y WHERE c > 5;  -- hard to read!` },
      positions: { messy: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'CTE devreye girer: `WITH failed_tests AS (...)` — ilk adımı ADLANDIRILMIŞ, geçici bir tabloya dönüştürür. Artık bu adım kendi başına OKUNABİLİR.',
        en: 'CTE steps in: `WITH failed_tests AS (...)` — turns the first step into a NAMED, temporary table. This step is now READABLE on its own.',
      },
      code: { tr: `WITH failed_tests AS (\n    SELECT * FROM test_results WHERE status = 'FAIL'\n)`, en: `WITH failed_tests AS (\n    SELECT * FROM test_results WHERE status = 'FAIL'\n)` },
      positions: {
        messy: { x: 16, y: 60, scale: 0.65, opacity: 0.35 },
        cte1: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'İkinci CTE, birinciye referans verir: `env_failures AS (SELECT ... FROM failed_tests GROUP BY env)`. Her adım kendinden ÖNCEKİ adımı isimle çağırır — sanki cümle cümle okuyorsun.',
        en: 'The second CTE references the first: `env_failures AS (SELECT ... FROM failed_tests GROUP BY env)`. Each step calls the PREVIOUS step by name — like reading sentence by sentence.',
      },
      code: { tr: `WITH failed_tests AS (...),\nenv_failures AS (\n    SELECT environment, COUNT(*) AS fails\n    FROM failed_tests\n    GROUP BY environment\n)`, en: `WITH failed_tests AS (...),\nenv_failures AS (\n    SELECT environment, COUNT(*) AS fails\n    FROM failed_tests\n    GROUP BY environment\n)` },
      positions: {
        cte1: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        cte2: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cte1', to: 'cte2' }],
    },
    {
      caption: {
        tr: 'Final: `SELECT * FROM env_failures WHERE fails > 5;` — son sorgu tek satırda okunur. Java analojisi: bu, uzun bir tek satırlık ifade yerine ara değişkenlere (`var step1 = ...`) bölmek gibidir.',
        en: 'Final: `SELECT * FROM env_failures WHERE fails > 5;` — the last query reads in one line. Java analogy: this is like splitting one giant expression into intermediate variables (`var step1 = ...`).',
      },
      positions: {
        cte2: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        final: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'cte2', to: 'final' }],
    },
  ],
}

// ─── Transactions film — BEGIN/COMMIT/ROLLBACK atomikliği ──────────────────
const sqlTransactionsFilm = {
  type: 'video-scene',
  id: 'sql-transactions-film',
  title: { tr: '🎬 Transaction: Ya Hepsi, Ya Hiçbiri', en: '🎬 Transaction: All or Nothing' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'begin', emoji: '🚦', label: { tr: 'BEGIN', en: 'BEGIN' }, color: '#6366f1' },
    { id: 'step1', emoji: '➖', label: { tr: 'Bakiye Düş (A hesabı)', en: 'Debit (Account A)' }, color: '#f59e0b' },
    { id: 'crash', emoji: '💥', label: { tr: 'Kesinti / Hata', en: 'Crash / Error' }, color: '#ef4444' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Yarım Kalan Değişiklik', en: 'Half-applied Change' }, color: '#ef4444' },
    { id: 'rollback', emoji: '⏪', label: { tr: 'ROLLBACK', en: 'ROLLBACK' }, color: '#8b5cf6' },
    { id: 'safe', emoji: '✅', label: { tr: 'Eski Hale Dönüldü', en: 'Restored to Before' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test verisi kurulumu: A hesabından B hesabına 100 birim aktarılacak — bu iki UPDATE ya BİRLİKTE başarılı olmalı ya da HİÇBİRİ uygulanmamalı.',
        en: 'Test data setup: transferring 100 units from account A to account B — these two UPDATEs must either succeed TOGETHER or NEITHER apply at all.',
      },
      code: { tr: `BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;`, en: `BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;` },
      positions: { begin: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'BEGIN ile transaction açılır. İlk UPDATE çalışır: A hesabından 100 düşülür. Ama bu değişiklik HENÜZ kalıcı değil — sadece transaction\'ın içinde bekliyor.',
        en: 'BEGIN opens the transaction. The first UPDATE runs: 100 is deducted from account A. But this change is NOT yet permanent — it only waits inside the transaction.',
      },
      positions: {
        begin: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        step1: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'begin', to: 'step1' }],
    },
    {
      caption: {
        tr: 'Kesinti! İkinci UPDATE çalışmadan bağlantı kopuyor veya hata fırlıyor. Şu an sistemde YARIM kalmış bir durum var: A\'dan düşüldü ama B\'ye eklenmedi.',
        en: 'Interruption! The connection drops or an error is thrown before the second UPDATE runs. Right now the system is in a HALF-applied state: deducted from A but not added to B.',
      },
      positions: {
        step1: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        crash: { x: 50, y: 55, scale: 1.15, pulse: true },
        ghost: { x: 78, y: 45, opacity: 0.5, scale: 0.9 },
      },
      beams: [{ from: 'crash', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Motor devreye girer: transaction tamamlanmadığı için otomatik veya elle ROLLBACK çalıştırılır — A hesabındaki 100 birim, hiç düşülmemiş gibi GERİ GELİR.',
        en: 'The engine steps in: since the transaction never completed, ROLLBACK runs automatically or manually — the 100 units in account A come BACK as if never deducted.',
      },
      code: { tr: `ROLLBACK;\n-- A hesabı eski bakiyesine döner`, en: `ROLLBACK;\n-- account A returns to its previous balance` },
      positions: {
        ghost: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        rollback: { x: 48, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final: sistem transaction öncesindeki HALİYLE aynı — hiçbir bakiye tutarsız kalmadı. Kontrast: transaction OLMASAYDI, ilk UPDATE kalıcı olurdu ve para "kaybolurdu".',
        en: 'Final: the system is EXACTLY as it was before the transaction — no balance ends up inconsistent. Contrast: WITHOUT a transaction, the first UPDATE would have stuck and the money would "vanish".',
      },
      positions: {
        rollback: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        safe: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'rollback', to: 'safe' }],
    },
  ],
}

// ─── Indexes & Views film — Full table scan vs Index scan ─────────────────
const sqlIndexesViewsFilm = {
  type: 'video-scene',
  id: 'sql-indexes-views-film',
  title: { tr: '🎬 Index: Kitabın Sonundaki Dizin Gibi Atla', en: '🎬 Index: Jump Like a Book\'s Back Index' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'query', emoji: '🔍', label: { tr: "WHERE status='FAIL'", en: "WHERE status='FAIL'" }, color: '#6366f1' },
    { id: 'fullScan', emoji: '🐢', label: { tr: 'Full Table Scan', en: 'Full Table Scan' }, color: '#94a3b8' },
    { id: 'ghost', emoji: '👻', label: { tr: '49.995 Gereksiz Satır Okundu', en: '49,995 Unnecessary Rows Read' }, color: '#ef4444' },
    { id: 'index', emoji: '📇', label: { tr: 'CREATE INDEX (B-tree)', en: 'CREATE INDEX (B-tree)' }, color: '#f59e0b' },
    { id: 'fastScan', emoji: '⚡', label: { tr: 'Index Scan', en: 'Index Scan' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '50.000 satırlık bir tabloda `status = \'FAIL\'` sorgusu var. Index YOKSA motor bunu bulmak için ne yapar?',
        en: 'There is a `status = \'FAIL\'` query on a 50,000-row table. WITHOUT an index, what does the engine do to find it?',
      },
      code: { tr: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL`, en: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL` },
      positions: { query: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Motor kitabı BAŞTAN SONA okuyan biri gibi davranır: 50.000 satırın HER birini teker teker kontrol eder — buna Full Table Scan denir. 49.995 satır boşuna okunmuş olur (hayalet).',
        en: 'The engine behaves like someone reading a book cover to cover: it checks EVERY single one of the 50,000 rows — this is called a Full Table Scan. 49,995 rows are read for nothing (ghost).',
      },
      positions: {
        query: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        fullScan: { x: 50, y: 55, scale: 1.15, pulse: true },
        ghost: { x: 80, y: 45, opacity: 0.5, scale: 1.05 },
      },
      beams: [{ from: 'fullScan', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Çözüm: `CREATE INDEX idx_status ON test_results(status);` — bu, kitabın SONUNA bir dizin (index) eklemek gibidir: "FAIL kelimesi hangi sayfalarda geçiyor?" listesi hazırlanır.',
        en: 'Solution: `CREATE INDEX idx_status ON test_results(status);` — this is like adding an index to the BACK of the book: a list of "which pages contain the word FAIL?" is prepared.',
      },
      code: { tr: `CREATE INDEX idx_status ON test_results(status);`, en: `CREATE INDEX idx_status ON test_results(status);` },
      positions: {
        ghost: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        index: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'AYNI sorgu şimdi index üzerinden doğrudan FAIL satırlarına ATLAR — B-tree yapısı sayesinde 50.000 satırın çoğunu hiç dokunmaz. `EXPLAIN` artık type: ref gösterir.',
        en: 'The SAME query now JUMPS directly to the FAIL rows via the index — thanks to the B-tree structure, it never touches most of the 50,000 rows. `EXPLAIN` now shows type: ref.',
      },
      code: { tr: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref (index kullanıldı)`, en: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref (index used)` },
      positions: {
        index: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        fastScan: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'index', to: 'fastScan' }],
    },
  ],
}

// ─── SQL Injection film — Concatenation exploit vs parametreli sorgu ───────
const sqlInjectionFilm = {
  type: 'video-scene',
  id: 'sql-injection-film',
  title: { tr: '🎬 SQL Injection: Girdi Nasıl Komuta Dönüşür', en: '🎬 SQL Injection: How Input Becomes a Command' },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'input', emoji: '⌨️', label: { tr: "Girdi: admin' OR '1'='1", en: "Input: admin' OR '1'='1" }, color: '#ef4444' },
    { id: 'concat', emoji: '🧵', label: { tr: 'String Concatenation', en: 'String Concatenation' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Sorgu Anlamı Değişti', en: 'Query Meaning Changed' }, color: '#ef4444' },
    { id: 'param', emoji: '🔒', label: { tr: 'Parametreli Sorgu (?)', en: 'Parameterized Query (?)' }, color: '#0ea5e9' },
    { id: 'safe', emoji: '✅', label: { tr: 'Girdi Sadece Veri', en: 'Input Is Just Data' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir login formu kullanıcı adını doğrudan SQL string\'ine yapıştırıyor (concatenation). Saldırgan normal bir isim yerine `admin\' OR \'1\'=\'1` yazıyor.',
        en: 'A login form pastes the username directly into the SQL string (concatenation). Instead of a normal name, the attacker types `admin\' OR \'1\'=\'1`.',
      },
      positions: { input: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kod bu girdiyi hiç sorgulamadan sorguya YAPIŞTIRIR: `"SELECT * FROM users WHERE user=\'" + input + "\'"`. Girdi artık SADECE veri değil, SQL\'in bir PARÇASI oldu.',
        en: 'The code PASTES this input into the query without question: `"SELECT * FROM users WHERE user=\'" + input + "\'"`. The input is no longer JUST data, it became PART of the SQL.',
      },
      code: { tr: `query = "SELECT * FROM users WHERE user = '" + input + "'";`, en: `query = "SELECT * FROM users WHERE user = '" + input + "'";` },
      positions: {
        input: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        concat: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'input', to: 'concat' }],
    },
    {
      caption: {
        tr: 'Sonuç sorgu: `WHERE user=\'admin\' OR \'1\'=\'1\'`. `\'1\'=\'1\'` HER ZAMAN doğru olduğu için WHERE koşulu anlamsızlaşır — motor TÜM kullanıcıları döndürür, şifre hiç kontrol edilmeden giriş yapılır.',
        en: 'The resulting query: `WHERE user=\'admin\' OR \'1\'=\'1\'`. Since `\'1\'=\'1\'` is ALWAYS true, the WHERE condition becomes meaningless — the engine returns ALL users, login succeeds without ever checking the password.',
      },
      positions: {
        concat: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 62, y: 55, opacity: 0.55, scale: 1.1 },
      },
      beams: [{ from: 'concat', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kontrast — savunma: parametreli sorgu, SQL kalıbını ÖNCE derler, sonra girdiyi SADECE bir DEĞER olarak bağlar. `?` işareti asla SQL kodu olarak yorumlanmaz.',
        en: 'Contrast — the defense: a parameterized query compiles the SQL template FIRST, then binds the input as a VALUE ONLY. The `?` placeholder is never interpreted as SQL code.',
      },
      code: { tr: `query = "SELECT * FROM users WHERE user = ?";\nps.setString(1, input);  -- input SADECE veri`, en: `query = "SELECT * FROM users WHERE user = ?";\nps.setString(1, input);  -- input is JUST data` },
      positions: {
        ghost: { x: 16, y: 62, scale: 0.6, opacity: 0.3 },
        param: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final: aynı zararlı girdi bu sefer sadece bir string DEĞERİ olarak aranır — kimse böyle bir isimde kullanıcı olmadığı için giriş REDDEDİLİR. QA için ders: her formda bu senaryoyu test senaryosu olarak dene.',
        en: 'Final: the same malicious input this time is searched only as a string VALUE — since no user has that exact name, login is REJECTED. Lesson for QA: try this exact scenario as a test case on every form.',
      },
      positions: {
        param: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        safe: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'param', to: 'safe' }],
    },
  ],
}

// ─── QA Use Cases film — "UI PASS dedi ama DB yanlış" ──────────────────────
const sqlQaUseCasesFilm = {
  type: 'video-scene',
  id: 'sql-qa-use-cases-film',
  title: { tr: '🎬 UI PASS Dedi, Ama DB\'de Kayıt Yanlış', en: '🎬 UI Said PASS, But the DB Record Is Wrong' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'uiTest', emoji: '🖥️', label: { tr: 'UI Testi: PASS ✔', en: 'UI Test: PASS ✔' }, color: '#22c55e' },
    { id: 'hidden', emoji: '❓', label: { tr: 'DB\'deki Gerçek Durum?', en: 'Real State in the DB?' }, color: '#94a3b8' },
    { id: 'sqlCheck', emoji: '🔍', label: { tr: 'SQL Doğrulama Sorgusu', en: 'SQL Verification Query' }, color: '#f59e0b' },
    { id: 'db', emoji: '🗄️', label: { tr: 'orders Tablosu', en: 'orders Table' }, color: '#0ea5e9' },
    { id: 'ghost', emoji: '⚠️', label: { tr: 'Uyuşmazlık: status hâlâ pending', en: 'Mismatch: status still pending' }, color: '#ef4444' },
    { id: 'fixed', emoji: '✅', label: { tr: 'Gerçek Bug Yakalandı', en: 'Real Bug Caught' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Selenium testi bir sipariş verir, "Siparişiniz alındı" mesajını görür ve PASS yeşil ışığı yakar. Ama bu mesaj SADECE ekranda ne göründüğünü doğrular.',
        en: 'A Selenium test places an order, sees the "Order received" message, and lights up green PASS. But this message only verifies what APPEARS on screen.',
      },
      positions: { uiTest: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Soru: bu mesajın ARKASINDA veritabanına gerçekten doğru veri yazıldı mı? UI testi bunu HİÇ bilemez — sadece DOM\'a bakar, veritabanına bakmaz.',
        en: 'Question: BEHIND this message, was the correct data actually written to the database? The UI test can NEVER know this — it only looks at the DOM, not the database.',
      },
      positions: {
        uiTest: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        hidden: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'uiTest', to: 'hidden', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Gerçek doğrulama burada başlar: test sonrası veritabanına doğrudan bir SQL sorgusu at ve gerçek satırı OKU — arayüzün söylediğine değil, veriye güven.',
        en: 'Real verification starts here: after the test, run a direct SQL query against the database and READ the actual row — trust the data, not what the interface claims.',
      },
      code: { tr: `SELECT id, status FROM orders WHERE id = 4471;`, en: `SELECT id, status FROM orders WHERE id = 4471;` },
      positions: {
        hidden: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        sqlCheck: { x: 50, y: 55, scale: 1.15, pulse: true },
        db: { x: 78, y: 45, scale: 1.05 },
      },
      beams: [{ from: 'sqlCheck', to: 'db' }],
    },
    {
      caption: {
        tr: 'Sonuç şaşırtıcı: `status = \'pending\'` — hâlâ "beklemede"! UI "alındı" dese de arka planda bir async job siparişi henüz "shipped" durumuna GEÇİRMEMİŞ. UI testi bunu asla YAKALAYAMAZDI.',
        en: 'The result is shocking: `status = \'pending\'` — still "pending"! Even though the UI said "received", a background async job has NOT yet moved the order to "shipped". The UI test could never have CAUGHT this.',
      },
      positions: {
        db: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 62, y: 55, opacity: 0.6, scale: 1.1 },
      },
      beams: [{ from: 'db', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final: SQL doğrulaması sayesinde gerçek bir bug yakalandı — UI yeşil yanarken arka planda veri tutarsızdı. Ders: kritik akışlarda UI PASS\'i tek kanıt sayma, SQL ile backend durumunu da doğrula.',
        en: 'Final: thanks to SQL verification, a real bug was caught — while the UI showed green, the backend data was inconsistent. Lesson: on critical flows, do not treat UI PASS as sole proof — verify backend state with SQL too.',
      },
      positions: {
        ghost: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        fixed: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'ghost', to: 'fixed' }],
    },
  ],
}

// ─── Ecosystem film — Script → Driver → Engine, ORM kontrastı ─────────────
const sqlEcosystemFilm = {
  type: 'video-scene',
  id: 'sql-ecosystem-film',
  title: { tr: '🎬 Test Scriptinden Motora: Driver Köprüsü', en: '🎬 From Test Script to Engine: The Driver Bridge' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'script', emoji: '🧪', label: { tr: 'Test Scripti', en: 'Test Script' }, color: '#6366f1' },
    { id: 'driver', emoji: '🔌', label: { tr: 'Driver (psycopg2/JDBC)', en: 'Driver (psycopg2/JDBC)' }, color: '#f59e0b' },
    { id: 'engine', emoji: '🗄️', label: { tr: 'Veritabanı Motoru', en: 'Database Engine' }, color: '#0ea5e9' },
    { id: 'orm', emoji: '📦', label: { tr: 'ORM (Ekstra Katman)', en: 'ORM (Extra Layer)' }, color: '#94a3b8' },
    { id: 'rawSql', emoji: '⚡', label: { tr: 'Ham SQL (Doğrudan)', en: 'Raw SQL (Direct)' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test scriptin (Python veya Java) veritabanıyla DOĞRUDAN konuşamaz — aralarında bir çevirmen gerekir: Driver.',
        en: 'Your test script (Python or Java) cannot talk to the database DIRECTLY — a translator is needed between them: the Driver.',
      },
      positions: { script: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Script, driver kütüphanesini çağırır — Python\'da `psycopg2`/yerleşik `sqlite3`, Java\'da JDBC. Driver, sorguyu motorun anlayacağı ağ protokolüne çevirir.',
        en: 'The script calls the driver library — `psycopg2`/built-in `sqlite3` in Python, JDBC in Java. The driver translates the query into the wire protocol the engine understands.',
      },
      positions: {
        script: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        driver: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'script', to: 'driver' }],
    },
    {
      caption: {
        tr: 'Driver, motorla konuşur, sorguyu çalıştırır ve ham satırları geri getirir. Bu üç katman (script → driver → engine) her SQL testinin temel akışıdır.',
        en: 'The driver talks to the engine, executes the query, and brings back the raw rows. These three layers (script → driver → engine) are the basic flow of every SQL test.',
      },
      positions: {
        driver: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        engine: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'driver', to: 'engine' }],
    },
    {
      caption: {
        tr: 'Kontrast: bir ORM (SQLAlchemy/Hibernate) kullanırsan araya EK bir katman girer — nesneleri tablolara eşlemek için ekstra kurulum ve gecikme gerekir. Basit bir test verisi seed işlemi için bu genelde gereksizdir.',
        en: 'Contrast: if you use an ORM (SQLAlchemy/Hibernate), an EXTRA layer is inserted — mapping objects to tables requires extra setup and latency. For a simple test data seed, this is usually unnecessary.',
      },
      positions: {
        engine: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        orm: { x: 60, y: 55, opacity: 0.6, scale: 1.05 },
      },
      beams: [{ from: 'engine', to: 'orm', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Final: QA otomasyonunda ham SQL (driver → engine, ORM\'siz) genelde tercih edilir — daha hızlı, daha az kurulum, hatayı daha az katmanda arayacaksın.',
        en: 'Final: in QA automation, raw SQL (driver → engine, no ORM) is usually preferred — faster, less setup, fewer layers to search when debugging.',
      },
      positions: {
        orm: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        rawSql: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'orm', to: 'rawSql' }],
    },
  ],
}

// ─── Ecosystem sekmesi — eksik animasyon + sandbox ─────────────────────────
const sqlEcosystemSteps = {
  type: 'step-animation',
  id: 'sql-ecosystem-steps',
  title: { tr: 'Adım Adım: Test Scriptinden Veritabanına', en: 'Step by Step: From Test Script to Database' },
  steps: [
    { id: 1, icon: '🧪', label: { tr: 'Test scripti sorguyu hazırlar', en: 'Test script prepares the query' }, detail: { tr: 'Python veya Java kodun calisirken cagiracagi SQL metnini olusturur — henuz veritabanina hicbir sey gitmedi.', en: 'Your Python or Java code builds the SQL text it will call — nothing has reached the database yet.' } },
    { id: 2, icon: '🔌', label: { tr: 'Driver bağlantıyı açar', en: 'Driver opens the connection' }, detail: { tr: 'sqlite3, psycopg2 veya JDBC driver, dil ile motor arasindaki agi protokolunu konusan cevirmendir.', en: 'sqlite3, psycopg2, or the JDBC driver is the translator speaking the wire protocol between the language and the engine.' } },
    { id: 3, icon: '🗄️', label: { tr: 'Motor sorguyu çalıştırır', en: 'The engine executes the query' }, detail: { tr: 'Veritabani motoru (PostgreSQL/MySQL/SQLite) sorguyu isler ve ham satirlari geri dondurur.', en: 'The database engine (PostgreSQL/MySQL/SQLite) processes the query and returns raw rows.' } },
    { id: 4, icon: '📦', label: { tr: 'ORM (opsiyonel) satırları nesneye çevirir', en: 'ORM (optional) maps rows to objects' }, detail: { tr: 'SQLAlchemy/Hibernate gibi bir ORM kullanirsan, satirlar once nesnelere eslenir — ekstra bir katman ve kurulum demektir.', en: 'If you use an ORM like SQLAlchemy/Hibernate, rows are mapped to objects first — an extra layer and extra setup.' } },
    { id: 5, icon: '⚡', label: { tr: 'QA scriptinde ham SQL tercih edilir', en: 'QA scripts prefer raw SQL' }, detail: { tr: 'Test verisi seed/cleanup gibi basit islerde ORM kurulumu yerine dogrudan SQL calistirmak cogu zaman daha hizli ve daha az kirilgandir.', en: 'For simple jobs like seeding/cleaning test data, running direct SQL is usually faster and less fragile than setting up an ORM.' } },
  ],
}

const sqlEcosystemPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-ecosystem',
  id: 'sql-ecosystem-practice-01',
  label: { tr: 'Micro Lab: Driver Bağlantısını Kendin Kur', en: 'Micro Lab: Set Up the Driver Connection Yourself' },
  language: 'sql',
  task: {
    tr: 'Bir test scriptinin veritabanına bağlanıp doğrulama yapmasını simüle eden akışı tamamla. TODO satırını, bağlantı açıldıktan sonra çalıştırılması gereken doğrulama sorgusuyla tamamla.',
    en: 'Complete the flow simulating a test script connecting to a database to verify data. Complete the TODO line with the verification query that should run after the connection opens.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç script → driver → engine akışının hangi adımda hangi sorgunun çalıştığını pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce which query runs at which step of the script → driver → engine flow.',
  },
  code: {
    tr: `-- 1) driver bağlantıyı açtı, oturum hazır\n-- 2) test verisini doğrula\nSELECT status FROM orders WHERE id = 4471;`,
    en: `-- 1) driver opened the connection, session is ready\n-- 2) verify the test data\nSELECT status FROM orders WHERE id = 4471;`,
  },
  starterCode: {
    tr: `-- 1) driver bağlantıyı açtı, oturum hazır\n-- TODO: id=4471 olan siparişin status'unu okuyan sorguyu yaz`,
    en: `-- 1) driver opened the connection, session is ready\n-- TODO: write the query that reads the status of order id=4471`,
  },
  solutionCode: {
    tr: `-- 1) driver bağlantıyı açtı, oturum hazır\n-- 2) test verisini doğrula\nSELECT status FROM orders WHERE id = 4471;`,
    en: `-- 1) driver opened the connection, session is ready\n-- 2) verify the test data\nSELECT status FROM orders WHERE id = 4471;`,
  },
  expected: {
    tr: 'Sorgu, id=4471 olan siparişin gerçek status değerini döndürür — UI\'ın söylediğine değil, veritabanının kendisine bakılmış olur.',
    en: 'The query returns the real status value of order id=4471 — verifying the database itself, not what the UI claims.',
  },
  hints: [
    { tr: 'Driver zaten bağlantıyı açtı — senin yazman gereken şey basit bir SELECT sorgusu.', en: 'The driver already opened the connection — what you need to write is a simple SELECT query.' },
    { tr: 'Hedef sütun `status`, hedef tablo `orders`, koşul `id = 4471`.', en: 'The target column is `status`, the target table is `orders`, the condition is `id = 4471`.' },
    { tr: 'Doğru sözdizimi: `SELECT status FROM orders WHERE id = 4471;`', en: 'Correct syntax: `SELECT status FROM orders WHERE id = 4471;`' },
  ],
  xpReward: 10,
}

// ─── Troubleshooting film — Lock wait timeout senaryosu ────────────────────
const sqlTroubleshootingFilm = {
  type: 'video-scene',
  id: 'sql-troubleshooting-film',
  title: { tr: '🎬 Lock Wait Timeout: Kim Kilidi Tutuyor?', en: '🎬 Lock Wait Timeout: Who Is Holding the Lock?' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'txA', emoji: '🔒', label: { tr: 'Transaction A (COMMIT yok)', en: 'Transaction A (no COMMIT)' }, color: '#ef4444' },
    { id: 'rowLock', emoji: '🚫', label: { tr: 'Satır Kilidi', en: 'Row Lock' }, color: '#f59e0b' },
    { id: 'txB', emoji: '⏳', label: { tr: 'Transaction B (Bekliyor)', en: 'Transaction B (Waiting)' }, color: '#8b5cf6' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Timeout Hatası', en: 'Timeout Error' }, color: '#ef4444' },
    { id: 'commit', emoji: '✅', label: { tr: 'COMMIT', en: 'COMMIT' }, color: '#22c55e' },
    { id: 'released', emoji: '🔓', label: { tr: 'Kilit Açıldı', en: 'Lock Released' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir test önceki adımda bir transaction başlatıp id=1 satırını güncelledi — ama COMMIT ya da ROLLBACK ÇAĞIRMAYI unuttu. Bağlantı açık kaldı.',
        en: 'A test started a transaction in an earlier step and updated the row id=1 — but FORGOT to call COMMIT or ROLLBACK. The connection stayed open.',
      },
      code: { tr: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- COMMIT çağrılmadı!`, en: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- COMMIT never called!` },
      positions: { txA: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Bu açık transaction, id=1 satırını KİLİTLER — COMMIT ya da ROLLBACK gelene kadar bu satıra kimse dokunamaz.',
        en: 'This open transaction LOCKS the id=1 row — until COMMIT or ROLLBACK arrives, no one else can touch this row.',
      },
      positions: {
        txA: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        rowLock: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'txA', to: 'rowLock', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Bir sonraki test (Transaction B) aynı satırı güncellemeye çalışır — ama kilit açık olduğu için BEKLEMEK zorunda kalır.',
        en: 'The next test (Transaction B) tries to update the same row — but since the lock is held, it is forced to WAIT.',
      },
      code: { tr: `UPDATE users SET status = 'DONE' WHERE id = 1;\n-- bekliyor...`, en: `UPDATE users SET status = 'DONE' WHERE id = 1;\n-- waiting...` },
      positions: {
        rowLock: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        txB: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'rowLock', to: 'txB' }],
    },
    {
      caption: {
        tr: 'Yeterince uzun beklerse: "Lock wait timeout exceeded" hatası fırlar. Kök neden AYNI satırı yeniden filtrelemek değil — bir önceki transaction\'ın kilidi HİÇ bırakmamış olmasıdır.',
        en: 'If it waits long enough: "Lock wait timeout exceeded" is thrown. The root cause is NOT re-filtering the same row — it is that the previous transaction NEVER released the lock.',
      },
      positions: {
        txB: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 62, y: 55, opacity: 0.55, scale: 1.05 },
      },
      beams: [{ from: 'txB', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Düzeltme: Transaction A\'ya dönüp COMMIT çağırırız — kilit ANINDA açılır ve Transaction B beklemeden devam eder. Ders: her transaction MUTLAKA COMMIT ya da ROLLBACK ile bitmelidir.',
        en: 'Fix: we go back to Transaction A and call COMMIT — the lock is released IMMEDIATELY and Transaction B proceeds without waiting. Lesson: every transaction MUST end with either COMMIT or ROLLBACK.',
      },
      code: { tr: `COMMIT;\n-- kilit kalkti, B artik calisabilir`, en: `COMMIT;\n-- lock released, B can now proceed` },
      positions: {
        ghost: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        commit: { x: 42, y: 45, scale: 1.1 },
        released: { x: 70, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'commit', to: 'released' }],
    },
  ],
}

const sqlTroubleshootingSteps = {
  type: 'step-animation',
  id: 'sql-troubleshooting-steps',
  title: { tr: 'Adım Adım: Bir SQL Hatasını Teşhis Etme', en: 'Step by Step: Diagnosing a SQL Error' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Hata mesajını tam oku', en: 'Read the full error message' }, detail: { tr: 'Hata metni cogu zaman kok nedeni acikca soyler: "UNIQUE constraint failed" ile "Lock wait timeout" tamamen farkli sorunlardir.', en: 'The error text usually states the root cause explicitly: "UNIQUE constraint failed" and "Lock wait timeout" are completely different problems.' } },
    { id: 2, icon: '🗺️', label: { tr: 'Hangi katman konuşuyor?', en: 'Which layer is speaking?' }, detail: { tr: 'Hata syntax (yazim), constraint (kisitlama) veya concurrency (kilit) katmanindan mi geliyor? Her biri farkli bir cozum ister.', en: 'Does the error come from the syntax, constraint, or concurrency (lock) layer? Each requires a different fix.' } },
    { id: 3, icon: '🔍', label: { tr: 'Değiştirmeyen sorguyla kanıt topla', en: 'Collect evidence with a non-destructive query' }, detail: { tr: 'SELECT ile ilgili satiri veya transaction durumunu kontrol et — hicbir seyi bozmadan durumu gozlemle.', en: 'Check the row or transaction state with SELECT — observe the situation without breaking anything.' } },
    { id: 4, icon: '🔧', label: { tr: 'En küçük güvenli düzeltme', en: 'Apply the smallest safe fix' }, detail: { tr: 'Sozlukteki cozumu uygula: eksik COMMIT\'i tamamla, FK icin once parent kaydi ekle, syntax hatasini duzelt.', en: 'Apply the dictionary fix: complete a missing COMMIT, insert the parent record for FK, fix the syntax error.' } },
    { id: 5, icon: '✅', label: { tr: 'Aynı sorguyla doğrula', en: 'Verify with the same query' }, detail: { tr: 'Basarisiz olan sorguyu AYNEN tekrar calistir ve gectigini gor — gecmediyse teshis yanlisti, 2. adima don.', en: 'Rerun the EXACT query that failed and watch it pass — if it still fails, the diagnosis was wrong, go back to step 2.' } },
  ],
}

const sqlTroubleshootingPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-troubleshooting',
  id: 'sql-troubleshooting-practice-01',
  label: { tr: 'Micro Lab: Kilitlenmiş Transaction\'ı Çöz', en: 'Micro Lab: Fix a Stuck Transaction' },
  language: 'sql',
  task: {
    tr: 'Filmdeki senaryoyu kendin çöz: Transaction A açık kaldı ve id=1 satırını kilitledi. TODO satırını, kilidi açacak komutla tamamla.',
    en: 'Solve the scenario from the film yourself: Transaction A stayed open and locked the id=1 row. Complete the TODO line with the command that releases the lock.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç açık kalan bir transaction\'ın kilidi nasıl serbest bıraktığını elle yazarak pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce how an open transaction releases its lock by writing it yourself.',
  },
  code: {
    tr: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- kilit hâlâ açık, başka bir sorgu bekliyor\nCOMMIT;\n-- kilit kalktı`,
    en: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- lock still held, another query is waiting\nCOMMIT;\n-- lock released`,
  },
  starterCode: {
    tr: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- kilit hâlâ açık, başka bir sorgu bekliyor\n-- TODO: kilidi açacak komutu yaz`,
    en: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- lock still held, another query is waiting\n-- TODO: write the command that releases the lock`,
  },
  solutionCode: {
    tr: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- kilit hâlâ açık, başka bir sorgu bekliyor\nCOMMIT;\n-- kilit kalktı`,
    en: `START TRANSACTION;\nUPDATE users SET status = 'IN_PROGRESS' WHERE id = 1;\n-- lock still held, another query is waiting\nCOMMIT;\n-- lock released`,
  },
  expected: {
    tr: 'Transaction tamamlanır, satır kilidi kalkar ve bekleyen ikinci sorgu artık zaman aşımına uğramadan çalışabilir.',
    en: 'The transaction completes, the row lock is released, and the waiting second query can now run without timing out.',
  },
  hints: [
    { tr: 'Açık kalan transaction her zaman iki şekilde bitirilir: değişiklikleri kalıcılaştıran COMMIT ya da geri alan ROLLBACK.', en: 'An open transaction always ends in one of two ways: COMMIT to persist changes, or ROLLBACK to undo them.' },
    { tr: 'Bu senaryoda UPDATE başarılı olduğu için değişikliği geri almak değil, kalıcılaştırmak istiyoruz.', en: 'In this scenario the UPDATE succeeded, so we want to persist the change, not undo it.' },
    { tr: 'TODO satırının cevabı tek kelimedir: `COMMIT;`', en: 'The answer to the TODO line is one word: `COMMIT;`' },
  ],
  xpReward: 10,
}

// ─── Java → SQL film — ResultSet imleci vs fetchall() listesi ──────────────
const sqlJavaToSqlFilm = {
  type: 'video-scene',
  id: 'sql-java-to-sql-film',
  title: { tr: '🎬 rs.next() İmleci vs fetchall() Listesi', en: '🎬 The rs.next() Cursor vs the fetchall() List' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'query', emoji: '🗄️', label: { tr: 'SELECT Sonucu (3 satır)', en: 'SELECT Result (3 rows)' }, color: '#0ea5e9' },
    { id: 'cursor', emoji: '👉', label: { tr: 'ResultSet İmleci (rs.next())', en: 'ResultSet Cursor (rs.next())' }, color: '#f59e0b' },
    { id: 'row', emoji: '📦', label: { tr: 'Tek Satır', en: 'Single Row' }, color: '#8b5cf6' },
    { id: 'pythonList', emoji: '📋', label: { tr: 'fetchall() Listesi', en: 'fetchall() List' }, color: '#6366f1' },
    { id: 'final', emoji: '✅', label: { tr: 'Aynı Veri, Farklı Erişim', en: 'Same Data, Different Access' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir sorgu 3 satır döndürüyor. Java ve Python bu SONUCA tamamen farklı iki şekilde erişir.',
        en: 'A query returns 3 rows. Java and Python access this RESULT in two completely different ways.',
      },
      code: { tr: `SELECT test_name, status FROM test_results WHERE status='FAIL';`, en: `SELECT test_name, status FROM test_results WHERE status='FAIL';` },
      positions: { query: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Java: ResultSet bir İMLEÇ gibi çalışır — başta hiçbir satırın üzerinde durmaz. `rs.next()` çağrısı imleci bir SONRAKİ satıra taşır ve o satır varsa true döner.',
        en: 'Java: ResultSet works like a CURSOR — it starts positioned before any row. Calling `rs.next()` moves the cursor to the NEXT row and returns true if it exists.',
      },
      code: { tr: `while (rs.next()) {\n    String name = rs.getString("test_name");\n}`, en: `while (rs.next()) {\n    String name = rs.getString("test_name");\n}` },
      positions: {
        query: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        cursor: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'query', to: 'cursor' }],
    },
    {
      caption: {
        tr: 'Her `rs.next()` çağrısı imleci bir satır ilerletir — üç satır için while döngüsü ÜÇ KEZ döner, her seferinde tek bir satırla çalışırsın.',
        en: 'Each `rs.next()` call advances the cursor by one row — for three rows the while loop runs THREE TIMES, working with a single row each time.',
      },
      positions: {
        cursor: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        row: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cursor', to: 'row' }],
    },
    {
      caption: {
        tr: 'Python: `cursor.fetchall()` imleç mantığı KULLANMAZ — sonucun TAMAMINI tek seferde bir liste (tuple listesi) olarak belleğe alır. Döngü listenin üzerinde gezer, imleci ilerletmez.',
        en: 'Python: `cursor.fetchall()` does NOT use cursor logic — it loads the ENTIRE result into memory at once as a list (of tuples). The loop walks the list, it does not advance a cursor.',
      },
      code: { tr: `rows = cursor.fetchall()  # [(...), (...), (...)]\nfor name, status in rows:\n    print(name)`, en: `rows = cursor.fetchall()  # [(...), (...), (...)]\nfor name, status in rows:\n    print(name)` },
      positions: {
        row: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        pythonList: { x: 60, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'row', to: 'pythonList' }],
    },
    {
      caption: {
        tr: 'Final: aynı 3 satırlık sonucu farklı API\'lerle geziyorsun — Java satır satır ilerler (bellek dostu, büyük tablolarda tercih edilir), Python hepsini tek seferde alır (küçük sonuçlarda pratiktir). QA olarak her iki dilde de assertion yazarken bu farkı bilmelisin.',
        en: 'Final: you walk the same 3-row result with different APIs — Java advances row by row (memory-friendly, preferred for large tables), Python grabs everything at once (convenient for small results). As QA you must know this difference when writing assertions in either language.',
      },
      positions: {
        pythonList: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        final: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'pythonList', to: 'final' }],
    },
  ],
}

const sqlJavaToSqlSteps = {
  type: 'step-animation',
  id: 'sql-java-to-sql-steps',
  title: { tr: 'Adım Adım: JDBC Sonucunu Okuma', en: 'Step by Step: Reading a JDBC Result' },
  steps: [
    { id: 1, icon: '🔌', label: { tr: 'Bağlantı ve Statement', en: 'Connection and Statement' }, detail: { tr: 'DriverManager.getConnection() ile baglanti acilir, Statement veya PreparedStatement olusturulur.', en: 'DriverManager.getConnection() opens the connection, then a Statement or PreparedStatement is created.' } },
    { id: 2, icon: '🗄️', label: { tr: 'executeQuery() çağrılır', en: 'executeQuery() is called' }, detail: { tr: 'Sorgu motora gonderilir ve bir ResultSet nesnesi doner — ama imlec henuz hicbir satirda degildir.', en: 'The query is sent to the engine and a ResultSet object returns — but the cursor is not yet positioned on any row.' } },
    { id: 3, icon: '👉', label: { tr: 'rs.next() imleci ilerletir', en: 'rs.next() advances the cursor' }, detail: { tr: 'Her cagri imleci bir sonraki satira tasir; satir yoksa false doner ve while dongusu biter.', en: 'Each call moves the cursor to the next row; if none remain it returns false and the while loop ends.' } },
    { id: 4, icon: '📥', label: { tr: 'Sütun değerleri okunur', en: 'Column values are read' }, detail: { tr: 'rs.getString("test_name"), rs.getInt("id") gibi tip-guvenli getter\'larla o anki satirin sutunlari okunur.', en: 'Type-safe getters like rs.getString("test_name"), rs.getInt("id") read the current row\'s columns.' } },
    { id: 5, icon: '🔒', label: { tr: 'Kaynaklar kapatılır', en: 'Resources are closed' }, detail: { tr: 'try-with-resources veya rs.close()/stmt.close()/conn.close() ile baglanti kaynaklari serbest birakilir.', en: 'try-with-resources, or rs.close()/stmt.close()/conn.close(), releases the connection resources.' } },
  ],
}

const sqlJavaToSqlPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-java-to-sql',
  id: 'sql-java-to-sql-practice-01',
  label: { tr: 'Micro Lab: ResultSet Döngüsünü Tamamla', en: 'Micro Lab: Complete the ResultSet Loop' },
  language: 'sql',
  task: {
    tr: 'JDBC ResultSet mantığını SQL tarafında simüle et: motor önce tüm eşleşen satırları üretir, sonra Java bu satırları tek tek okur. TODO satırını, FAIL testlerini süreye göre azalan sıralayan komutla tamamla — Java tarafında `while(rs.next())` bu sırayla gezecek.',
    en: 'Simulate JDBC ResultSet logic on the SQL side: the engine first produces all matching rows, then Java reads them one by one. Complete the TODO line with the command that sorts FAIL tests by duration descending — the Java side\'s `while(rs.next())` will walk them in this order.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç SQL motorunun ürettiği satır sırasının, ResultSet imlecinin hangi sırayla ilerleyeceğini belirlediğini pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce that the row order the SQL engine produces determines the order the ResultSet cursor will walk.',
  },
  code: {
    tr: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;`,
    en: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;`,
  },
  starterCode: {
    tr: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\n-- TODO: en yavaş test en üstte olacak şekilde sırala`,
    en: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\n-- TODO: sort so the slowest test appears first`,
  },
  solutionCode: {
    tr: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;`,
    en: `SELECT test_name, duration_ms FROM test_results\nWHERE status = 'FAIL'\nORDER BY duration_ms DESC;`,
  },
  expected: {
    tr: 'Sonuç kümesi duration_ms\'e göre büyükten küçüğe sıralanır — Java\'daki `while(rs.next())` döngüsü satırları tam bu sırayla okur.',
    en: 'The result set is sorted by duration_ms descending — Java\'s `while(rs.next())` loop will read the rows in exactly this order.',
  },
  hints: [
    { tr: 'ResultSet imleci, motorun ÜRETTİĞİ sırayla ilerler — sıralama sorumluluğu SQL tarafındadır, Java tarafında değil.', en: 'The ResultSet cursor advances in whatever order the engine PRODUCES — sorting responsibility belongs to SQL, not to Java.' },
    { tr: '"En yavaş en üstte" demek, duration_ms\'i BÜYÜKTEN küçüğe sıralamak demektir.', en: '"Slowest first" means sorting duration_ms from LARGEST to smallest.' },
    { tr: 'Doğru sözdizimi: `ORDER BY duration_ms DESC;`', en: 'Correct syntax: `ORDER BY duration_ms DESC;`' },
  ],
  xpReward: 10,
}

// ─── Practice & Reference film — Exercise 3 çözüm akışı ────────────────────
const sqlPracticeReferenceFilm = {
  type: 'video-scene',
  id: 'sql-practice-reference-film',
  title: { tr: '🎬 Zor Bir Alıştırmayı Adım Adım Çözmek', en: '🎬 Solving a Hard Exercise Step by Step' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'req', emoji: '📋', label: { tr: 'Gereksinim: Sprint Bazlı Sıralama', en: 'Requirement: Rank Per Sprint' }, color: '#6366f1' },
    { id: 'cte1', emoji: '📦', label: { tr: 'CTE 1: sprint_stats', en: 'CTE 1: sprint_stats' }, color: '#f59e0b' },
    { id: 'cte2', emoji: '🔗', label: { tr: 'CTE 2: isim JOIN', en: 'CTE 2: name JOIN' }, color: '#8b5cf6' },
    { id: 'rank', emoji: '🏅', label: { tr: 'RANK() OVER', en: 'RANK() OVER' }, color: '#0ea5e9' },
    { id: 'final', emoji: '✅', label: { tr: 'Sıralı Rapor', en: 'Ranked Report' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Zor görünen bir alıştırma: "Testerları her sprint içinde başarı oranına göre sırala." Bu tek bir sorguda yazılamayacak kadar KARMAŞIK görünüyor — o yüzden ADIMLARA bölüyoruz.',
        en: 'A hard-looking exercise: "rank testers by pass rate within each sprint." This looks too COMPLEX to write in one query — so we break it into STEPS.',
      },
      positions: { req: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1: ilk CTE sadece HAM SAYILARI toplar — sprint ve user_id\'ye göre grupla, toplam test ve geçen test sayısını say. Henüz isim veya sıralama YOK.',
        en: 'Step 1: the first CTE only aggregates RAW NUMBERS — group by sprint and user_id, count total tests and passed tests. No name or ranking YET.',
      },
      code: { tr: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total,\n        SUM(CASE WHEN status='PASS' THEN 1 ELSE 0 END) AS passed\n    FROM results GROUP BY sprint, user_id\n)`, en: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total,\n        SUM(CASE WHEN status='PASS' THEN 1 ELSE 0 END) AS passed\n    FROM results GROUP BY sprint, user_id\n)` },
      positions: {
        req: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        cte1: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'req', to: 'cte1' }],
    },
    {
      caption: {
        tr: 'Adım 2: ikinci CTE, ilk CTE\'ye referans verir ve users tablosuyla JOIN yaparak isimleri ve pass_rate yüzdesini ekler — önceki adımın üzerine İNŞA eder.',
        en: 'Step 2: the second CTE references the first and JOINs with users to add names and the pass_rate percentage — it BUILDS ON the previous step.',
      },
      code: { tr: `sprint_rates AS (\n    SELECT s.sprint, u.name AS tester,\n        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate\n    FROM sprint_stats s JOIN users u ON s.user_id = u.id\n)`, en: `sprint_rates AS (\n    SELECT s.sprint, u.name AS tester,\n        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate\n    FROM sprint_stats s JOIN users u ON s.user_id = u.id\n)` },
      positions: {
        cte1: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        cte2: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cte1', to: 'cte2' }],
    },
    {
      caption: {
        tr: 'Adım 3: son SELECT, RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) ekler — her sprint İÇİNDE testerları başarı oranına göre sıralar, satırları kaybetmeden.',
        en: 'Step 3: the final SELECT adds RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) — ranking testers by pass rate WITHIN each sprint, without losing any rows.',
      },
      positions: {
        cte2: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        rank: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cte2', to: 'rank' }],
    },
    {
      caption: {
        tr: 'Final: karmaşık gereksinim üç okunabilir adıma bölündü — her CTE bağımsız test edilebilir, hata varsa hangi adımda olduğu hemen görülür. Zor bir alıştırmayı çözmenin sırrı budur: böl, adlandır, birleştir.',
        en: 'Final: the complex requirement split into three readable steps — each CTE can be tested independently, and if something is wrong you see exactly which step it is in. This is the secret to solving a hard exercise: split, name, combine.',
      },
      positions: {
        rank: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        final: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'rank', to: 'final' }],
    },
  ],
}

const sqlPracticeReferenceSteps = {
  type: 'step-animation',
  id: 'sql-practice-reference-steps',
  title: { tr: 'Adım Adım: Zor Bir Sorguyu Parçalara Bölme', en: 'Step by Step: Breaking a Hard Query Into Pieces' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Gereksinimi tam oku', en: 'Read the requirement fully' }, detail: { tr: 'Hangi tablolar, hangi gruplama, hangi siralama gerekiyor — yazmadan once cumle cumle cikar.', en: 'Which tables, which grouping, which ordering is needed — extract it sentence by sentence before writing anything.' } },
    { id: 2, icon: '📦', label: { tr: 'İlk CTE: ham sayıları topla', en: 'First CTE: aggregate raw numbers' }, detail: { tr: 'GROUP BY ile en temel sayilari (COUNT, SUM) cikar — henuz isim veya siralama ekleme.', en: 'Use GROUP BY to extract the most basic numbers (COUNT, SUM) — do not add names or ordering yet.' } },
    { id: 3, icon: '🔗', label: { tr: 'İkinci CTE: JOIN ile zenginleştir', en: 'Second CTE: enrich with JOIN' }, detail: { tr: 'Birinci CTE\'ye referans ver, users gibi baska bir tabloyla JOIN yaparak isim/etiket ekle.', en: 'Reference the first CTE, JOIN with another table like users to add names/labels.' } },
    { id: 4, icon: '🏅', label: { tr: 'Window fonksiyonu ekle', en: 'Add the window function' }, detail: { tr: 'RANK()/ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) ile satirlari kaybetmeden sirala.', en: 'Use RANK()/ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) to rank without losing rows.' } },
    { id: 5, icon: '✅', label: { tr: 'Her adımı ayrı çalıştırıp doğrula', en: 'Run and verify each step separately' }, detail: { tr: 'Her CTE\'yi tek basina SELECT * FROM cte_adi ile calistirip ara sonucu goz ile dogrula, sonra bir sonraki adima gec.', en: 'Run each CTE alone with SELECT * FROM cte_name to visually verify the intermediate result, then move to the next step.' } },
  ],
}

const sqlPracticeReferencePractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-practice-reference',
  id: 'sql-practice-reference-practice-01',
  label: { tr: 'Micro Lab: İkinci CTE\'yi Kendin Tamamla', en: 'Micro Lab: Complete the Second CTE Yourself' },
  language: 'sql',
  task: {
    tr: 'Filmdeki adım 2\'yi tekrarla: ilk CTE (sprint_stats) hazır, senin görevin onu users tablosuyla JOIN edip tester ismini eklemek. TODO satırını tamamla.',
    en: 'Repeat step 2 from the film: the first CTE (sprint_stats) is ready, your job is to JOIN it with users to add the tester name. Complete the TODO line.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç bir CTE\'nin bir önceki CTE\'ye nasıl referans verdiğini elle yazarak pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce how one CTE references the previous one by writing it yourself.',
  },
  code: {
    tr: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\nJOIN users u ON s.user_id = u.id;`,
    en: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\nJOIN users u ON s.user_id = u.id;`,
  },
  starterCode: {
    tr: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\n-- TODO: users tablosuyla user_id üzerinden JOIN yap`,
    en: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\n-- TODO: JOIN with the users table on user_id`,
  },
  solutionCode: {
    tr: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\nJOIN users u ON s.user_id = u.id;`,
    en: `WITH sprint_stats AS (\n    SELECT sprint, user_id, COUNT(*) AS total\n    FROM results GROUP BY sprint, user_id\n)\nSELECT s.sprint, u.name AS tester, s.total\nFROM sprint_stats s\nJOIN users u ON s.user_id = u.id;`,
  },
  expected: {
    tr: 'Sonuç, her sprint-user_id çifti için tester ismini ve toplam test sayısını gösterir — CTE ile users tablosu user_id üzerinden başarıyla eşleşmiştir.',
    en: 'The result shows the tester name and total test count for each sprint-user_id pair — the CTE and users table are successfully matched on user_id.',
  },
  hints: [
    { tr: 'CTE\'ye normal bir tablo gibi FROM içinde referans verirsin — burada alias `s` olarak kullanılmış.', en: 'You reference a CTE like a normal table in FROM — here it is aliased as `s`.' },
    { tr: 'JOIN koşulu, sprint_stats\'taki user_id ile users tablosundaki id\'yi eşlemelidir.', en: 'The JOIN condition must match user_id from sprint_stats with id from the users table.' },
    { tr: 'Doğru sözdizimi: `JOIN users u ON s.user_id = u.id;`', en: 'Correct syntax: `JOIN users u ON s.user_id = u.id;`' },
  ],
  xpReward: 10,
}

// ─── DBeaver film — Görsel bağlantı + SQL editör + sonuç grid'i ────────────
const sqlDbeaverFilm = {
  type: 'video-scene',
  id: 'sql-dbeaver-film',
  title: { tr: '🎬 DBeaver: Terminal Olmadan Sorgudan Sonuca', en: '🎬 DBeaver: From Query to Result Without a Terminal' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'wizard', emoji: '🔌', label: { tr: 'Bağlantı Sihirbazı', en: 'Connection Wizard' }, color: '#6366f1' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Terminal + JDBC Kodu (Eski Yöntem)', en: 'Terminal + JDBC Code (Old Way)' }, color: '#94a3b8' },
    { id: 'editor', emoji: '📝', label: { tr: 'SQL Editor (F3)', en: 'SQL Editor (F3)' }, color: '#f59e0b' },
    { id: 'engine', emoji: '🗄️', label: { tr: 'Veritabanı', en: 'Database' }, color: '#0ea5e9' },
    { id: 'grid', emoji: '📊', label: { tr: 'Sonuç Grid\'i', en: 'Result Grid' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'DBeaver açılınca Bağlantı Sihirbazı ile başlarsın: host, port, kullanıcı adı, şifre gir — Host/Port/User/Password alanlarını doldurup Test Connection\'a tıkla.',
        en: 'DBeaver opens with the Connection Wizard: enter host, port, username, password — fill the Host/Port/User/Password fields and click Test Connection.',
      },
      positions: { wizard: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Kontrast: bunu koda dökseydin, Java\'da DriverManager.getConnection() ile bağlantı dizesi yazman ve pom.xml\'e sürücü bağımlılığı eklemen gerekirdi — burada tek tıkla aynı işi yaparsın.',
        en: 'Contrast: if you did this in code, you would write a connection string with Java\'s DriverManager.getConnection() and add a driver dependency to pom.xml — here you do the same thing with one click.',
      },
      positions: {
        wizard: { x: 16, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 62, y: 55, opacity: 0.5, scale: 0.95 },
      },
      beams: [{ from: 'wizard', to: 'ghost', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Bağlantı kurulunca SQL Editor\'ü açarsın (F3) — burası, terminaldeki `psql` komut satırının görsel karşılığıdır: syntax highlight ve autocomplete ile.',
        en: 'Once connected you open the SQL Editor (F3) — this is the visual counterpart of the terminal\'s `psql` command line, with syntax highlighting and autocomplete.',
      },
      code: { tr: `SELECT u.name, p.title, p.published\nFROM app.users u\nJOIN app.posts p ON p.author_id = u.id;`, en: `SELECT u.name, p.title, p.published\nFROM app.users u\nJOIN app.posts p ON p.author_id = u.id;` },
      positions: {
        ghost: { x: 14, y: 62, scale: 0.6, opacity: 0.3 },
        editor: { x: 48, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Ctrl+Enter ile çalıştırırsın — sorgu veritabanı motoruna gider, işlenir ve sonuç geri döner. Tüm bu iletişim ekranın arkasında saniyeler içinde gerçekleşir.',
        en: 'Ctrl+Enter runs it — the query goes to the database engine, gets processed, and the result comes back. All this communication happens behind the screen in seconds.',
      },
      positions: {
        editor: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        engine: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'editor', to: 'engine' }],
    },
    {
      caption: {
        tr: 'Final: sonuç bir Excel benzeri grid\'de belirir — satırlara tıklayabilir, sıralayabilir, CSV\'ye aktarabilirsin. Terminaldeki düz metin çıktısına göre çok daha okunabilir bir deneyim.',
        en: 'Final: the result appears in an Excel-like grid — you can click rows, sort them, export to CSV. A far more readable experience than the terminal\'s plain-text output.',
      },
      positions: {
        engine: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        grid: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'engine', to: 'grid' }],
    },
  ],
}

// ─── Interview Q&A film — EXPLAIN planını mülakatta okumak ─────────────────
const sqlInterviewFilm = {
  type: 'video-scene',
  id: 'sql-interview-film',
  title: { tr: '🎬 Mülakatta EXPLAIN Planını Okumak', en: '🎬 Reading an EXPLAIN Plan in an Interview' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '🎤', label: { tr: 'Soru: "Bu Sorgu Neden Yavaş?"', en: 'Question: "Why Is This Query Slow?"' }, color: '#6366f1' },
    { id: 'explain', emoji: '🔍', label: { tr: 'EXPLAIN Komutu', en: 'EXPLAIN Command' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'type: ALL (Full Scan)', en: 'type: ALL (Full Scan)' }, color: '#ef4444' },
    { id: 'index', emoji: '📇', label: { tr: 'CREATE INDEX Önerisi', en: 'CREATE INDEX Suggestion' }, color: '#8b5cf6' },
    { id: 'answer', emoji: '🏆', label: { tr: 'Güçlü Cevap', en: 'Strong Answer' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Mülakatta klasik senaryo sorusu: "Bu sorgu production\'da çok yavaş çalışıyor, ne yaparsın?" Zayıf cevap sadece "index eklerim" der — GÜÇLÜ cevap önce KANIT ister.',
        en: 'A classic interview scenario question: "This query runs very slowly in production, what do you do?" A weak answer just says "I add an index" — a STRONG answer asks for EVIDENCE first.',
      },
      positions: { question: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Güçlü cevabın ilk katmanı: "Önce `EXPLAIN` ile sorgu planını incelerim" — tahmin etmek yerine motorun NE YAPTIĞINI gözlemlemek.',
        en: 'Layer 1 of the strong answer: "First I inspect the query plan with `EXPLAIN`" — observing WHAT the engine does instead of guessing.',
      },
      code: { tr: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';`, en: `EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';` },
      positions: {
        question: { x: 16, y: 40, scale: 0.9, opacity: 0.65 },
        explain: { x: 52, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'question', to: 'explain' }],
    },
    {
      caption: {
        tr: 'Çıktı `type: ALL` gösteriyor — bu, motorun HER satırı taradığı anlamına gelir (Full Table Scan). Aday burada durup "işte kanıt bu" diyebilmelidir, sadece "yavaş" demek yetmez.',
        en: 'The output shows `type: ALL` — this means the engine scans EVERY row (Full Table Scan). The candidate must be able to stop here and say "here is the evidence", not just "it\'s slow".',
      },
      positions: {
        explain: { x: 18, y: 40, scale: 0.85, opacity: 0.6 },
        ghost: { x: 62, y: 55, opacity: 0.55, scale: 1.05 },
      },
      beams: [{ from: 'explain', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '2. katman — çözüm + gerekçe: "WHERE\'de kullanılan `status` sütununa index eklerim, çünkü `EXPLAIN` böylece `type: ref`\'e döner ve motor artık HER satırı değil, sadece ilgili satırları okur."',
        en: 'Layer 2 — solution + rationale: "I add an index on the `status` column used in WHERE, because then `EXPLAIN` switches to `type: ref` and the engine reads only the relevant rows, not EVERY row."',
      },
      code: { tr: `CREATE INDEX idx_status ON test_results(status);`, en: `CREATE INDEX idx_status ON test_results(status);` },
      positions: {
        ghost: { x: 16, y: 62, scale: 0.6, opacity: 0.3 },
        index: { x: 50, y: 45, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final — formül: KANIT topla (EXPLAIN) → sorunu ADLANDIR (Full Scan) → çözüm + GEREKÇE ver (neden index type: ref\'e çevirir). Komut adı ezberleyen değil, NEDENİ açıklayan aday kazanır.',
        en: 'Final — the formula: gather EVIDENCE (EXPLAIN) → NAME the problem (Full Scan) → give solution + RATIONALE (why the index flips it to type: ref). The candidate who explains WHY wins, not the one who memorized a command name.',
      },
      positions: {
        index: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        answer: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'index', to: 'answer' }],
    },
  ],
}

const sqlInterviewSteps = {
  type: 'step-animation',
  id: 'sql-interview-steps',
  title: { tr: 'Adım Adım: Bir SQL Senaryo Sorusuna Cevap Kurma', en: 'Step by Step: Building an Answer to a SQL Scenario Question' },
  steps: [
    { id: 1, icon: '🧭', label: { tr: 'Durumu netleştir', en: 'Clarify the situation' }, detail: { tr: 'Hangi sorgu, hangi tablo boyutu, ne zamandan beri yavas? Once soru sormak derinligi gosterir.', en: 'Which query, what table size, how long has it been slow? Asking questions first shows depth.' } },
    { id: 2, icon: '🔍', label: { tr: 'Kanıt komutunu söyle', en: 'Name the evidence command' }, detail: { tr: '"Once EXPLAIN ile bakarim" de — tahmin yerine gozlem refleksini goster.', en: 'Say "first I look with EXPLAIN" — show the observation reflex instead of guessing.' } },
    { id: 3, icon: '🏷️', label: { tr: 'Sorunu adlandır', en: 'Name the problem' }, detail: { tr: '"type: ALL yani full table scan goruyorum" gibi somut bir bulguyu soyle, sadece "yavas" deme.', en: 'State a concrete finding like "I see type: ALL, meaning a full table scan", not just "it\'s slow".' } },
    { id: 4, icon: '🔧', label: { tr: 'Çözüm + gerekçe ver', en: 'Give solution + rationale' }, detail: { tr: '"Index eklerim, cunku..." diyerek NEDEN o cozumun isledigini acikla.', en: 'Say "I add an index, because..." and explain WHY that solution works.' } },
    { id: 5, icon: '✅', label: { tr: 'Sonucu doğrulamayı söyle', en: 'Mention verifying the result' }, detail: { tr: '"Ayni EXPLAIN\'i tekrar calistirir, type: ref\'e dondugunu dogrularim" diyerek cevabi kapat.', en: 'Close the answer with "I rerun the same EXPLAIN and verify it now shows type: ref".' } },
  ],
}

const sqlInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql',
  id: 'sql-interview-practice-01',
  label: { tr: 'Micro Lab: Yavaş Sorguyu Mülakat Formatında Çöz', en: 'Micro Lab: Fix a Slow Query in Interview Format' },
  language: 'sql',
  task: {
    tr: 'Filmdeki formülü uygula: EXPLAIN zaten çalıştırıldı ve type: ALL görüldü. TODO satırını, status sütununa index ekleyen komutla tamamla.',
    en: 'Apply the formula from the film: EXPLAIN has already run and shows type: ALL. Complete the TODO line with the command that adds an index on the status column.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç mülakatta anlatacağın "kanıt → çözüm → doğrulama" akışını elle yazarak pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce the "evidence → solution → verify" flow you would narrate in an interview by writing it yourself.',
  },
  code: {
    tr: `-- 1) kanıt topla\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) çözüm: index ekle\nCREATE INDEX idx_status ON test_results(status);\n\n-- 3) doğrula\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
    en: `-- 1) collect evidence\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) fix: add an index\nCREATE INDEX idx_status ON test_results(status);\n\n-- 3) verify\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
  },
  starterCode: {
    tr: `-- 1) kanıt topla\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) TODO: status sütununa index ekleyen komutu yaz\n\n-- 3) doğrula\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
    en: `-- 1) collect evidence\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) TODO: write the command that adds an index on the status column\n\n-- 3) verify\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
  },
  solutionCode: {
    tr: `-- 1) kanıt topla\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) çözüm: index ekle\nCREATE INDEX idx_status ON test_results(status);\n\n-- 3) doğrula\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
    en: `-- 1) collect evidence\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ALL (full table scan)\n\n-- 2) fix: add an index\nCREATE INDEX idx_status ON test_results(status);\n\n-- 3) verify\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n-- type: ref`,
  },
  expected: {
    tr: 'İkinci EXPLAIN çalıştırıldığında type: ref görünür — motor artık status sütunundaki index sayesinde sadece ilgili satırları okur.',
    en: 'When the second EXPLAIN runs, it shows type: ref — the engine now reads only the relevant rows thanks to the index on the status column.',
  },
  hints: [
    { tr: 'Hedef sütun WHERE koşulunda kullanılan sütundur: `status`.', en: 'The target column is the one used in the WHERE clause: `status`.' },
    { tr: 'Index oluşturma komutu her zaman şu kalıptadır: `CREATE INDEX isim ON tablo(sütun);`', en: 'The index creation command always follows this pattern: `CREATE INDEX name ON table(column);`' },
    { tr: 'Doğru komut: `CREATE INDEX idx_status ON test_results(status);`', en: 'Correct command: `CREATE INDEX idx_status ON test_results(status);`' },
  ],
  xpReward: 10,
}

// ─── Intro & Why sekmesi — eksik sandbox (code-playground) ─────────────────
const sqlIntroPractice = {
  type: 'code-playground',
  relatedTopicId: 'sql-intro-why',
  id: 'sql-intro-why-practice-01',
  label: { tr: 'Micro Lab: İlk Bildirimsel Sorgunu Yaz', en: 'Micro Lab: Write Your First Declarative Query' },
  language: 'sql',
  task: {
    tr: 'Filmdeki fikri uygula: "nasıl" yapılacağını değil, "ne" istediğini tarif et. TODO satırını, test_results tablosundaki FAIL durumundaki satırları isteyen bir sorguyla tamamla.',
    en: 'Apply the idea from the film: describe "what" you want, not "how" to get it. Complete the TODO line with a query that asks for FAIL rows in the test_results table.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç SQL\'in bildirimsel (declarative) doğasını — sonucu tarif etmeyi — elle yazarak pekiştirmektir.',
    en: 'This is not a real runtime; the goal is to reinforce SQL\'s declarative nature — describing the result — by writing it yourself.',
  },
  code: {
    tr: `SELECT * FROM test_results WHERE status = 'FAIL';`,
    en: `SELECT * FROM test_results WHERE status = 'FAIL';`,
  },
  starterCode: {
    tr: `-- TODO: test_results tablosundaki FAIL durumundaki tüm satırları iste`,
    en: `-- TODO: ask for all rows in test_results where status is FAIL`,
  },
  solutionCode: {
    tr: `SELECT * FROM test_results WHERE status = 'FAIL';`,
    en: `SELECT * FROM test_results WHERE status = 'FAIL';`,
  },
  expected: {
    tr: 'Sorgu, status sütunu FAIL olan tüm satırları döndürür — motorun bunu NASIL bulduğunu hiç yazmadan, sadece NE istediğini tarif ederek.',
    en: 'The query returns all rows where the status column is FAIL — without ever writing HOW the engine finds them, only describing WHAT you want.',
  },
  hints: [
    { tr: 'Bir Java for-döngüsü yazmana gerek yok — sadece hangi satırları istediğini tarif et.', en: 'You do not need to write a Java for-loop — just describe which rows you want.' },
    { tr: 'Hedef sütun `status`, hedef değer `\'FAIL\'`.', en: 'The target column is `status`, the target value is `\'FAIL\'`.' },
    { tr: 'Doğru sözdizimi: `SELECT * FROM test_results WHERE status = \'FAIL\';`', en: 'Correct syntax: `SELECT * FROM test_results WHERE status = \'FAIL\';`' },
  ],
  xpReward: 10,
}


const finalEnSections = [
  {
    "title": "🎯 What is SQL & Why Does Every QA Engineer Need It?",
    "blocks": [
      {
        "type": "simple-box",
        "emoji": "🗃️",
        "content": {
          "tr": "SQL, bir veritabanını sorgulamak için kullandığın dildir — tıpkı bir muhasebe defterinin sayfaları arasında arama yaparken 'sadece 2024 yılına ait, 1000 TL üzeri kalemleri getir' diye asistanına yazılı talimat vermen gibi. Ama şunu düşün: uygulamanın arayüzü zaten sonuçları gösteriyor, neden SQL'e ihtiyaç var? Çünkü UI'nın gösterdiği ile veritabanında gerçekte yazılı olan her zaman aynı değildir — API 201 döndürmüş ama kayıt yanlış tabloya gitmiş, ya da ödeme tamamlandı mesajı gelmiş ama transaction ROLLBACK olmuş olabilir. Java'da bir HashMap'i for döngüsüyle tararken 'koşula uyanları getir' diye yazıyordun; SQL'de WHERE ile tek satırda tarif edersin, veritabanı nasıl bulacağını kendisi çözer — sen algoritmayı değil, sonucu tanımlarsın. Bir QA mühendisi olarak SQL bilmek, uygulamaya yalnızca ekrana bakarak değil, altındaki gerçeğe bakarak test edebilmek demektir — ve production'da 'kullanıcı kaydı başarılı ama kullanıcı giremiyor' gibi sessiz hataları yakalayabilmenin en güvenilir yolu budur.",
          "en": "SQL is the language you use to interrogate a database — like writing precise instructions to an assistant: 'bring me only 2024 entries above $1000, sorted by date.' But if the UI already shows results, why bother with SQL? Because what the interface shows and what is actually written in the database are not always the same: the API returned 201 but the record landed in the wrong table, or the 'payment complete' message appeared but the transaction was silently rolled back. In Java you'd loop through a HashMap checking conditions manually; in SQL you declare the result you want with WHERE and the database figures out how to retrieve it — you define the outcome, not the algorithm. For a QA engineer, knowing SQL means testing not just what appears on screen but what is actually true underneath — and it is the most reliable way to catch silent bugs like 'user registration succeeded but the user cannot log in' before they reach production."
        }
      },
      {
        "type": "css-animation",
        "kind": "sql-select",
        "label": { "tr": "SQL Sorgu Yürütme Sırası", "en": "SQL Query Execution Order" }
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
      sqlIntroWhyFilm,
      sqlIntroPractice,
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
          "tr": "SQL kurulumu, seçtiğin veritabanı motoruna göre köklü biçimde farklılaşır — SQLite için tek bir kütüphane yeterken, PostgreSQL için sunucu sürecini başlatman, kullanıcı oluşturman ve bağlantı parametrelerini yapılandırman gerekir. Peki 'en basit' ile 'production\\'a en yakın' kurulum arasında nasıl karar verirsin? SQLite, tüm veritabanını tek bir dosyada taşır — Java'da bir ArrayList'i bir .ser dosyasına serileştirip sonra geri okuman gibi, sunucu, port, şifre yok. PostgreSQL ise tam bir istemci-sunucu mimarisine sahiptir; Java'da DriverManager ile JDBC bağlantısı açarken bir URL, kullanıcı ve şifre verirsin, PostgreSQL kurulumu da aynı kavramları gerektirir. QA mühendisi için bu fark kritiktir: CI/CD pipeline'ında hızlı, bağımlılıksız veri doğrulaması için SQLite yeterken, uygulamanın gerçek production veritabanını yansıtan entegrasyon testleri için PostgreSQL kurulumu şarttır — yanlış motoru seçmek, testlerin geçmesine ama production'da hataların yaşanmasına yol açabilir.",
          "en": "SQL setup varies dramatically depending on the database engine you choose — SQLite needs just one library, while PostgreSQL requires starting a server process, creating users, and configuring connection parameters. But how do you decide between 'simplest' and 'closest to production'? SQLite stores the entire database in a single file — like serializing a Java ArrayList to a .ser file and reading it back; no server, no port, no password. PostgreSQL has a full client-server architecture; just like opening a JDBC connection with DriverManager requires a URL, username, and password, setting up PostgreSQL demands the same concepts. For a QA engineer this difference is critical: SQLite is enough for fast, dependency-free data verification in a CI/CD pipeline, but integration tests that mirror the real production database require PostgreSQL setup — choosing the wrong engine can lead to green tests but production failures."
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
        "type": "step-animation",
        "title": { "tr": "sqlite3 mytest.db Çalıştırınca Perde Arkasında Ne Olur?", "en": "What Actually Happens When You Run sqlite3 mytest.db?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "Komut çalıştırıldığı anda dosya YOKSA…", "en": "The moment the command runs, if the file DOESN'T exist…" }, "detail": { "tr": "sqlite3 mytest.db komutu çalıştırıldığı anda, eğer mytest.db dosyası diskte yoksa YENİ boş bir dosya oluşturulur — ayrı bir \"create database\" komutuna gerek yoktur.", "en": "The moment sqlite3 mytest.db runs, if mytest.db doesn't exist on disk yet, a brand-new empty file is created — there's no separate \"create database\" command." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "Nokta (.) ile başlayan komutlar…", "en": "Commands starting with a dot (.)…" }, "detail": { "tr": "Açılan shell'de nokta (.) ile başlayan komutlar (.tables, .schema, .headers) SQLite'ın KENDİ komutlarıdır — SQL standardının parçası değildir, MySQL/PostgreSQL'de ÇALIŞMAZ.", "en": "Commands starting with a dot (.tables, .schema, .headers) are SQLite's OWN commands — they are not part of the SQL standard and will NOT work in MySQL/PostgreSQL." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": ".headers on ve .mode column…", "en": ".headers on and .mode column…" }, "detail": { "tr": ".headers on ve .mode column ayarları SADECE terminal görünümünü değiştirir — veritabanındaki veriyi hiç etkilemez, sonuçları okunur hale getirir.", "en": ".headers on and .mode column only change how results are DISPLAYED in the terminal — they never touch the actual data, they just make output readable." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "SELECT sqlite_version(); ise noktasız…", "en": "SELECT sqlite_version(), without a dot…" }, "detail": { "tr": "SELECT sqlite_version(); ise noktasız, standart bir SQL sorgusudur — noktalı virgülle biter ve (farklı fonksiyon adıyla) tüm SQL motorlarında bir karşılığı vardır.", "en": "SELECT sqlite_version(), with no leading dot, is a standard SQL query — it ends with a semicolon and has an equivalent (under a different function name) in every SQL engine." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": ".quit shell'den çıkar ama…", "en": ".quit exits the shell, but…" }, "detail": { "tr": ".quit komutu shell'den çıkar ama mytest.db dosyası DİSKTE kalır — bir sonraki sqlite3 mytest.db çağrısında aynı veriler kaldığı yerden erişilir.", "en": ".quit exits the shell, but mytest.db stays on DISK — the next time you run sqlite3 mytest.db, the same data is right where you left it." } }
        ]
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
        "type": "step-animation",
        "title": { "tr": "mysql -u root -p Komutu Neyi Doğrular?", "en": "What Does mysql -u root -p Actually Verify?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "Komut çalıştırılınca terminal bir şifre İSTER…", "en": "Running the command makes the terminal PROMPT for a password…" }, "detail": { "tr": "mysql -u root -p çalıştırılınca terminal bir şifre İSTER — şifre komut satırına açık yazılmaz, bu yüzden bash geçmişinde (history) asla görünmez.", "en": "Running mysql -u root -p makes the terminal PROMPT for a password — the password is never typed on the command line itself, so it never shows up in bash history." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "Doğru şifreyle sunucuya bir TCP bağlantısı açılır…", "en": "A correct password opens a TCP connection to the server…" }, "detail": { "tr": "Doğru şifre girilirse MySQL sunucusuna bir TCP bağlantısı açılır (varsayılan port 3306) — SQLite'ın aksine burada ayrı bir sunucu PROCESS'i zaten ÇALIŞIYOR olmalıdır.", "en": "With the correct password, a TCP connection opens to the MySQL server (default port 3306) — unlike SQLite, a separate server PROCESS must already be RUNNING." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "mysql> prompt'u görününce…", "en": "Once the mysql> prompt appears…" }, "detail": { "tr": "Bağlantı başarılı olursa mysql> prompt'u görünür — bu, komutların artık sunucuya GÖNDERİLDİĞİ anlamına gelir, yerel bir dosyaya değil.", "en": "Once the connection succeeds, the mysql> prompt appears — this means commands are now being SENT to the server, not to a local file." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "SELECT VERSION(); çalıştırıldığında…", "en": "When SELECT VERSION(); runs…" }, "detail": { "tr": "SELECT VERSION(); çalıştırıldığında sorgu ağ üzerinden sunucuya gider, sunucu sonucu hesaplar ve geri gönderir — bu round-trip, SQLite'ın aynı process içinde çalışmasından farklı bir gecikme kaynağıdır.", "en": "When SELECT VERSION(); runs, the query travels over the network to the server, gets computed, and comes back — this round-trip is a latency source SQLite doesn't have, since SQLite runs in the same process." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Şifre yanlışsa \"Access denied\" hatası…", "en": "A wrong password produces \"Access denied\"…" }, "detail": { "tr": "Şifre yanlışsa \"Access denied for user\" hatası alınır — bu, QA'nın CI/CD ortamında en sık karşılaştığı \"DB bağlantısı reddedildi\" sorunlarından biridir, genelde yanlış env variable/secret'tan kaynaklanır.", "en": "A wrong password produces \"Access denied for user\" — this is one of the most common \"DB connection refused\" issues QA engineers hit in CI/CD, usually caused by a wrong env variable or secret." } }
        ]
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
      sqlInstallationFilm,
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
          "tr": "CREATE TABLE, bir Excel tablosunun sütun başlıklarını ve her sütunun kabul edeceği veri tipini kalıba dökmek gibidir — ama bir farkla: tabloya girilen her veri bu kalıba uymak zorundadır, aksi hâlde veritabanı reddeder. Peki Java'da bir sınıf tanımlarken field tipleri belirtiyorken, neden SQL'de ayrıca CREATE TABLE yazmak gerekiyor? Çünkü veritabanında tablo bir kez oluşturulur ve kalıcı olarak disk üzerinde durur; Java nesneleri ise programı kapattığında bellekten silinir. Java'da `class TestResult { String name; String status; int durationMs; }` yazdığında, SQL karşılığı `CREATE TABLE test_results (name VARCHAR(100), status VARCHAR(10), duration_ms INT)` olur — fark şu ki SQL tipler, kısıtlamalar (NOT NULL, PRIMARY KEY) ve varsayılan değerlerle birlikte şemayı fiziksel olarak kalıcı hale getirir. QA mühendisi için bu şemanın doğru tasarlanması kritiktir: yanlış tanımlanan bir sütun tipi (örneğin mikrosaniye testler için INT yerine BIGINT olması gerekebilir), test verisi ekleme aşamasında sessiz veri kaybına ya da assertion hatalarına yol açabilir — ve bu hata üretim ortamına kadar fark edilmeyebilir.",
          "en": "CREATE TABLE is like casting the column headers and accepted data types of an Excel spreadsheet into a permanent mold — with one key difference: every piece of data entered into the table must conform to that mold, or the database rejects it. But if Java class definitions already declare field types, why write CREATE TABLE separately? Because a database table is created once and persists on disk permanently; Java objects vanish from memory when the program exits. When you write `class TestResult { String name; String status; int durationMs; }` in Java, the SQL equivalent is `CREATE TABLE test_results (name VARCHAR(100), status VARCHAR(10), duration_ms INT)` — the difference is that SQL makes the schema physically permanent with constraints (NOT NULL, PRIMARY KEY) and default values. For a QA engineer, getting this schema right is critical: a wrongly typed column (for example, INT instead of BIGINT for microsecond-precision timings) can cause silent data loss or assertion failures during test data setup — and that bug may not surface until production."
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
      sqlCreateTableFilm,
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
          "tr": "INSERT INTO, doldurduğunda bir şeylerin resmi olarak kayıt altına alındığı bir forma benzer — hangi sütuna ne değer gireceğini sıraya koyarsın, veritabanı da bu veriyi disk üzerinde kalıcı olarak saklar. Ama şunu düşün: Java'da `list.add(yeniEleman)` yazmak yeterliyken, SQL'de sütun isimlerini neden ayrıca belirtmek zorundasın? Çünkü SQL şeması sıkı tiplidir; sütun sırası değişebilir, yeni sütunlar eklenmiş olabilir — değerleri sütun adlarıyla eşleştirmezsen veriler yanlış yere gider. Java'daki `ArrayList.add()` bellekteki listeye geçici eleman ekler; INSERT INTO ise tablonun disk üzerindeki kalıcı kaydına ACID garantisiyle yazar. QA mühendisi için INSERT INTO'nun en kritik kullanım alanı test verisi hazırlamaktır: bir ödeme akışını test etmeden önce doğru kullanıcı, ürün ve sepet verilerini tablolara eklemezsen, automation testleri tutarsız ya da yanlış başlangıç durumu nedeniyle hatalı PASS verebilir — bu durum gerçek bir production bug'ını CI'da yakalamayı imkânsız kılar.",
          "en": "INSERT INTO resembles filling out a form where completion means something is officially recorded — you line up the values for each column in order, and the database writes that data to disk permanently. But if `list.add(newElement)` is enough in Java, why must you explicitly name columns in SQL? Because SQL schemas are strictly typed; column order can change and new columns may be added — without mapping values to column names, data lands in the wrong place. Java's `ArrayList.add()` appends a temporary element to an in-memory list; INSERT INTO writes a permanent record to the table on disk with ACID guarantees. For a QA engineer the most critical use of INSERT INTO is test data setup: if you don't insert the correct user, product, and cart records before a payment flow test, your automation may receive a false PASS because it started from an inconsistent initial state — which means a real production bug never gets caught in CI."
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
      sqlInsertIntoFilm,
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
          "tr": "SELECT, bir müdürün asistanına 'geçen hafta staging ortamında 3 saniyeden uzun süren ve başarısız olan testleri en yavaştan başlayarak getir' demesi gibidir — sen sadece sonucu tarif edersin, asistan (veritabanı motoru) hangi reyonlara, hangi sırayla bakacağını kendi çözer. Peki Java'da zaten `stream().filter().sorted()` zincirleri var, neden SQL'e gerek var? Çünkü Java'da önce tüm satırları belleğe çekmen, sonra filtrelip sıralaman gerekir; milyonlarca satırda bu hem yavaş hem de hafızayı patlatır. SQL motoru aynı işlemi index kullanarak diskte yapar — çekilen veri miktarı küçülür, sorgu milisaniyeler içinde döner. Java `stream().filter(t -> t.status.equals(\"FAIL\") && t.durationMs > 3000).sorted(Comparator.comparingInt(t -> -t.durationMs))` yazarken SQL'de tek bir SELECT ile aynı sonucu alırsın. Bir QA mühendisi olarak SELECT'i en sık test sonuçlarını doğrulamak için kullanırsın: UI 'başarılı' dese bile `SELECT * FROM test_results WHERE status = 'FAIL' AND run_date >= NOW() - INTERVAL 1 HOUR` sorgusu, son bir saatteki gerçek durumu sana söyler.",
          "en": "SELECT is like a manager instructing an assistant: 'bring me tests from last week, staging only, longer than 3 seconds, that failed — sorted slowest first' — you describe the result, the assistant (the database engine) decides which indexes to hit and in what order. But if Java already has `stream().filter().sorted()` chains, why bother with SQL? Because in Java you'd first load all rows into memory and then filter and sort — on millions of rows that is both slow and memory-intensive. A SQL engine performs the same operation on disk using indexes, returning only the matching data in milliseconds. Writing `stream().filter(t -> t.status.equals(\"FAIL\") && t.durationMs > 3000).sorted(...)` in Java becomes a single SELECT statement in SQL. As a QA engineer you'll use SELECT most often to verify test outcomes: even if the UI reports success, `SELECT * FROM test_results WHERE status = 'FAIL' AND run_date >= NOW() - INTERVAL 1 HOUR` tells you the ground truth of the last hour."
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
      sqlSelectSortFilm,
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
          "tr": "UPDATE ve DELETE, kayıt sözlüğüne el atmanın iki farklı biçimidir — biri kaydı düzeltir, diğeri tamamen siler. İkisinin de ortak tuzağı şudur: WHERE koşulunu unutursan, komut tablodaki tüm satırlara uygulanır. Java'da `map.put(key, newValue)` yazdığında yalnızca o key'in değerini değiştirirsin; SQL'de `UPDATE test_results SET status = 'PASS'` yazmak ise tablodaki tüm satırların status'ünü değiştirir, çünkü SQL'de hedef key değil WHERE koşuludur. Peki her ikisinde de değiştirmek için anahtar belirtmek gerekmiyor mu? Java'da anahtar zorunlu; SQL'de opsiyonel — işte bu asimetri production veri felaketlerinin en yaygın sebebidir. QA mühendisi için bu risk özellikle test cleanup aşamasında kritiktir: testin ardından `DELETE FROM test_results WHERE environment = 'ci-temp'` yerine `DELETE FROM test_results` yazarsan, tüm test geçmişini silersin — CI dashboard'u boş kalır, raporlar anlamsızlaşır ve ekip neden son haftalık sonuçların kaybolduğunu anlayamaz. Kural: UPDATE veya DELETE yazmadan önce aynı WHERE ile önce SELECT çalıştır ve kaç satır etkileneceğini gözle doğrula.",
          "en": "UPDATE and DELETE are two ways of reaching into a record store — one corrects a record, the other erases it entirely. Both share the same trap: omit WHERE and the command applies to every row in the table. In Java `map.put(key, newValue)` modifies only that key's value; in SQL `UPDATE test_results SET status = 'PASS'` changes the status of every single row, because the target in SQL is a WHERE condition, not a key. Isn't a key required in both cases? In Java yes — in SQL no, and that asymmetry is the most common cause of production data disasters. For a QA engineer this risk is especially acute during test cleanup: if you write `DELETE FROM test_results` instead of `DELETE FROM test_results WHERE environment = 'ci-temp'` after a test run, you wipe the entire test history — the CI dashboard goes blank, reports become meaningless, and the team can't explain why last week's results disappeared. Rule: always run a SELECT with the same WHERE clause first and visually confirm the row count before writing UPDATE or DELETE."
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
      sqlUpdateDeleteFilm,
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
          "tr": "NULL, 'değer yok' değil, 'bilinmiyor' anlamına gelir — bir müşterinin telefon numarasının boş bırakılması 'telefonu yok' demek değil, 'girilmedi' demektir. Bu nüans SQL'i Java'dan temelden ayırır: Java'da `null == null` ifadesi `true` döndürür; SQL'de `NULL = NULL` ise `NULL` döndürür, yani ne true ne false. Peki neden bu kadar karmaşık bir davranış tasarlandı? Çünkü 'bilinmeyen' ile 'bilinmeyen'in eşit olup olmadığı bilinmez — iki ayrı müşteri kaydının telefon alanı boşsa, bunlar aynı müşteri mi? Bilinmez. Java'da `Objects.isNull(value)` ya da `value == null` kullanırsın; SQL'de `IS NULL` ya da `IS NOT NULL` zorunludur, `= NULL` her zaman 0 satır döndürür. QA mühendisi için NULL'ın en sinsi riski şudur: opsiyonel alanlar içeren test verisi sorgularken `WHERE error_msg = NULL` yazarsan sorgu sıfır satır döner ve assertion geçer — oysa tabloda NULL değerleri olan satırlar mevcut olabilir; bu yanlış PASS, gerçek bir regression'ı gizler.",
          "en": "NULL means 'unknown', not 'no value' — a blank phone number field on a customer form doesn't mean the customer has no phone; it means the value was never entered. This nuance fundamentally separates SQL from Java: in Java `null == null` returns `true`; in SQL `NULL = NULL` returns `NULL` — neither true nor false. Why was such a complex behavior designed? Because it is unknowable whether two unknowns are equal — if two customer records have a blank phone field, are they the same customer? Unknown. In Java you use `Objects.isNull(value)` or `value == null`; in SQL `IS NULL` or `IS NOT NULL` is mandatory — `= NULL` always returns 0 rows. For a QA engineer NULL's most insidious risk is this: if you write `WHERE error_msg = NULL` while querying test data with optional fields, the query returns zero rows and the assertion passes — yet rows with NULL values may exist in the table; that false PASS hides a real regression."
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
      sqlNullValuesFilm,
      {
        "type": "quiz",
        "question": {
          "tr": "WHERE discount = NULL filtresi uyguladığında sorgu 0 satır döndürüyor. Neden?",
          "en": "A query returns 0 rows when you filter: WHERE discount = NULL. Why?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tabloda NULL indirim yok",
              "en": "There are no NULL discounts in the table"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "= ile NULL karşılaştırması her zaman NULL (TRUE değil) döndürür, hiçbir satır eşleşmez",
              "en": "NULL comparisons with = always return NULL (not TRUE), so no rows match"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tırnak gerekiyor: WHERE discount = \"NULL\"",
              "en": "You need quotes: WHERE discount = \"NULL\""
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "NULL otomatik olarak 0'a dönüştürülür",
              "en": "NULL is automatically converted to 0"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "= veya != ile yapılan NULL karşılaştırmaları FALSE gibi davranır. Bunun yerine IS NULL veya IS NOT NULL kullanın. Bu, en yaygın SQL hatalarından biridir.",
          "en": "Any comparison with NULL using = or != returns NULL, which is treated as FALSE. Use IS NULL or IS NOT NULL instead. This is one of the most common SQL bugs."
        },
        "retryQuestion": {
          "question": {
            "tr": "If you execute 'SELECT * FROM users WHERE age = NULL;', why might you get no results even if some users have no age recorded?",
            "en": "If you execute 'SELECT * FROM users WHERE age = NULL;', why might you get no results even if some users have no age recorded?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "NULL değerleri WHERE ifadesinde sorgulanamaz",
                "en": "NULL values cannot be queried in a WHERE clause"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "= operatörüyle yapılan NULL karşılaştırmaları UNKNOWN ile sonuçlanır, bunun yerine IS NULL operatörü kullanılmalıdır",
                "en": "Comparisons with NULL using = result in UNKNOWN, requiring the IS NULL operator instead"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sözdizimi 'WHERE age IS 0' şeklinde olmalıdır",
                "en": "The syntax requires 'WHERE age IS 0'"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "NULL değerleri SQL sonuçlarında varsayılan olarak gizlenir",
                "en": "NULL values are hidden by default in SQL results"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "SQL'de NULL bilinmeyen bir değeri temsil eder. NULL değerine karşı standart eşittir operatörü (=) kullanmak TRUE değil UNKNOWN ile sonuçlanır. Boş alanları filtrelemek için 'IS NULL' veya 'IS NOT NULL' ifadelerini kullanmalısınız.",
            "en": "In SQL, NULL represents an unknown value. Using standard equality operators (=) against NULL results in UNKNOWN, not TRUE. To filter for empty fields, you must use the 'IS NULL' or 'IS NOT NULL' predicates."
          }
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
          "tr": "SQL sorgusunun yazım sırası ile veritabanı motorunun onu işleyiş sırası tamamen farklıdır — SELECT en üste yazılır ama neredeyse en son çalışır. Fabrikadaki üretim hattını düşün: önce hammaddeyi depoya çek (FROM), kalite kontrolden geçir (WHERE), bantları kategoriye göre ayır (GROUP BY), sadece yeterli miktarda üretilen kategorileri ilerlet (HAVING), sonunda ne göndereceğini seç (SELECT). Peki Java’da metotlar yukarıdan aşağıya çalışırken, neden SQL bu sırayı tersine çeviriyor? Çünkü SQL ‘ne istediğini’ tarif eden bir dildir, ‘nasıl yapılacağını’ adım adım söyleyen bir dil değil — motor en verimli fiziksel planı kendi üretir. Bu farkın pratik sonucu şudur: Java’da `int total = count()` sonra o değişkeni if içinde kullanabilirsin; SQL’de `SELECT COUNT(*) AS total ... WHERE total > 5` yazarsan hata alırsın, çünkü WHERE aşamasında SELECT henüz çalışmamıştır ve `total` alias’ı mevcut değildir. QA mühendisi için bu sırayı yanlış anlamak, flaky sorgular ve anlamsız hata mesajlarına yol açar; sorgunun neden WHERE’de alias kabul etmediğini veya neden aggregate fonksiyon HAVING’e gittiğini anlamak debug süresini dramatik biçimde kısaltır.",
          "en": "The order in which you write a SQL query and the order in which the database engine processes it are completely different — SELECT appears at the top but executes almost last. Think of a factory assembly line: first pull raw materials from the warehouse (FROM), run quality control (WHERE), separate the conveyor belts by category (GROUP BY), advance only categories with sufficient output (HAVING), then decide what to ship (SELECT). But if Java methods execute top to bottom, why does SQL invert this order? Because SQL is a declarative language that describes ‘what you want’, not an imperative one that says ‘how to do it step by step’ — the engine produces its own most efficient physical plan. The practical consequence of this difference is: in Java you can declare `int total = count()` and then use that variable inside an if; in SQL writing `SELECT COUNT(*) AS total ... WHERE total > 5` throws an error, because WHERE runs before SELECT, and the alias `total` does not yet exist. For a QA engineer misunderstanding this order leads to flaky queries and cryptic error messages; knowing why an alias is rejected in WHERE and why aggregate functions belong in HAVING dramatically shortens debugging time."
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
        "type": "simulation",
        "scenario": "sql-interactive-terminal",
        "icon": "💻",
        "title": {
          "tr": "Etkileşimli SQL Terminali",
          "en": "Interactive SQL Terminal"
        },
        "description": {
          "tr": "SELECT, INSERT, UPDATE, DELETE sorgularını çalıştır ve veri tabanı tablosunun anlık değişimini şemada izle.",
          "en": "Run SELECT, INSERT, UPDATE, DELETE queries and see the database table update live on the diagram."
        }
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
      sqlQueryOrderFilm,
      sqlQueryOrderPractice,
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
          "tr": "Aggregate fonksiyonlar, yüzlerce satıra bakan ve sana tek bir özet değer getiren bir muhasebeci gibi çalışır: 'bu aydaki en uzun test kaç saniye sürdü?' sorusunu yanıtlamak için her satırı kendin okumak yerine MAX(duration_ms) yazar ve sonucu alırsın. Peki Java'da `list.stream().mapToInt(t -> t.durationMs).max()` zinciri de aynı şeyi yapmıyor mu? Yapıyor — ama önce tüm kayıtları belleğe çekiyor; veritabanı ise MAX'ı index üzerinde hesaplayarak çoğu zaman tek bir disk okumasıyla bitirir. Java'daki Collectors.summarizingInt() ile SQL aggregate'leri arasındaki temel fark şudur: SQL'de GROUP BY olmadan kullandığında tüm tablo tek grup gibi işlenir, GROUP BY eklersen her gruba ayrı bir muhasebeci atanır. QA mühendisi için aggregate'lerin kritik kullanımı test koşu istatistiklerini izlemektir: `AVG(duration_ms) GROUP BY environment` sorgusu hangi ortamın testlerin yavaşlattığını, `COUNT(*) WHERE status='FAIL' GROUP BY test_name` ise hangi testlerin tutarsız (flaky) olduğunu net biçimde gösterir — bu bilgi olmadan hangi testin düzeltileceğine doğru öncelik vermek imkânsızdır.",
          "en": "Aggregate functions work like an accountant who scans hundreds of rows and hands you a single summary value: instead of reading every row yourself to answer 'what was the longest test duration this month?' you write MAX(duration_ms) and get the answer instantly. Doesn't Java's `list.stream().mapToInt(t -> t.durationMs).max()` chain do the same? It does — but it first loads all records into memory; the database computes MAX via an index, often finishing with a single disk read. The core difference between Java's Collectors.summarizingInt() and SQL aggregates is: without GROUP BY, SQL treats the entire table as one group; add GROUP BY and each group gets its own aggregation calculation. For a QA engineer the critical use of aggregates is monitoring test run statistics: `AVG(duration_ms) GROUP BY environment` reveals which environment is slowing tests down, and `COUNT(*) WHERE status='FAIL' GROUP BY test_name` clearly shows which tests are flaky — without this data it is impossible to prioritize which tests to fix first."
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
      sqlAggregateFilm,
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
          "tr": "GROUP BY, büyük bir çamaşırhaneyi düşün: yüzlerce gömlek farklı sahiplerinden gelmiş, sen önce her müşterinin gömleklerini kendi yığınına koyuyorsun (GROUP BY customer_id), sonra her yığını sayıyorsun (COUNT), ardından 5'ten fazla gömlekli müşterileri öne alıyorsun (HAVING COUNT > 5). WHERE bu sürecin neresine giriyor? HAVING'den önce — yırtık olanları gelmeden önce zaten çıkarıyorsun (WHERE condition). Java'da `list.stream().collect(Collectors.groupingBy(t -> t.environment, Collectors.counting()))` yazıp sonucu ayrıca filtrelersin; SQL'de GROUP BY + HAVING tek sorguda ikisini birden yapar. Fark kritiktir: WHERE gruplama yapılmadan önce çalışır ve aggregate sonuçlara erişemez; HAVING ise gruplandıktan sonra çalışır ve COUNT/SUM/AVG üzerinde filtre kurar. QA mühendisi için bu sırayı yanlış anlamak 'HAVING yerine WHERE kullandım, sıfır sonuç döndü' hatasına yol açar — ve sorgu herhangi bir hata mesajı vermeden yanlış sıfır sonuç döndürdüğünde, sessiz yanlış PASS riski en yüksek noktasına ulaşır.",
          "en": "GROUP BY: imagine a large laundry service — hundreds of shirts arrive from different customers, you first sort each customer's shirts into separate piles (GROUP BY customer_id), then count each pile (COUNT), then push forward only customers with more than 5 shirts (HAVING COUNT > 5). Where does WHERE fit in this process? Before HAVING — you discard torn shirts before they even enter the sorting floor (WHERE condition). In Java you'd write `list.stream().collect(Collectors.groupingBy(t -> t.environment, Collectors.counting()))` and filter the result separately; SQL's GROUP BY + HAVING does both in a single query. The distinction is critical: WHERE runs before grouping and cannot access aggregate results; HAVING runs after grouping and can filter on COUNT/SUM/AVG. For a QA engineer misunderstanding this order leads to 'I used WHERE instead of HAVING and got zero results' — and when a query silently returns zero rows without an error message, the risk of a false PASS reaches its peak."
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
      sqlGroupByHavingFilm,
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
          "tr": "JOIN, iki ayrı dosyada duran verileri ortak bir anahtar üzerinden tek bir tabloymuş gibi birleştirmek için kullanılır — bir hastanedeki 'hastalar' ve 'randevular' dosyaları hasta_id üzerinden JOIN'lenince, her hastanın randevu geçmişini tek satırda görebilirsin. Ama neden veriler tek tabloda tutulmuyor ki, JOIN'e neden gerek var? Çünkü tek tabloda tutsan, aynı hasta bilgilerini her randevu için tekrar tekrar yazman gerekir; bu hem yer israfı hem de veri tutarsızlığı riskidir — normalizasyon bunu önler. Java'da iki ayrı listeyi birleştirmek için iç içe for döngüleri ya da Map index'i kurman gerekir; SQL'de JOIN tek satırda motor tarafından optimize edilmiş biçimde gerçekleştirilir. INNER JOIN sadece her iki tabloda da eşleşen satırları getirir; LEFT JOIN sol tablonun tamamını korur, sağ tarafta eşleşme yoksa NULL yazar — bu fark QA için kritiktir: 'bug raporu olmayan testçileri bul' sorgusu LEFT JOIN gerektirir, INNER JOIN ile bu kişiler tamamen kaybolur ve yanlış PASS elde edilir.",
          "en": "JOIN combines data sitting in two separate tables by a shared key, making them queryable as if they were one — joining a hospital's 'patients' and 'appointments' tables on patient_id lets you see each patient's full appointment history in a single row. But why not keep everything in one table to begin with? Because storing the same patient details repeatedly for every appointment wastes space and creates data inconsistency risks — normalization prevents this. In Java you'd build nested for loops or a Map index to combine two lists; in SQL JOIN is written in one line and executed by the engine with optimized algorithms. INNER JOIN returns only rows that match in both tables; LEFT JOIN keeps every row from the left table and writes NULL where the right side has no match — this difference is critical for QA: 'find testers with no assigned bugs' requires a LEFT JOIN; with INNER JOIN those testers disappear entirely from the result, producing a false PASS."
        }
      },
      {
        "type": "css-animation",
        "kind": "sql-join",
        "label": { "tr": "SQL JOIN Görselleştirmesi", "en": "SQL JOIN Visualization" }
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
        "content": "The 4 diagrams below use the same data. Click \"Show Matches\" to highlight matched rows, then \"Show Result\" to see the query result. This is the fastest way to truly understand JOINs."
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
      sqlJoinsFilm,
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
      sqlSubqueriesFilm,
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
      sqlLikeBetweenInFilm,
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
      sqlWindowFunctionsFilm,
      {
        "type": "quiz",
        "question": {
          "tr": "Window fonksiyonlarini GROUP BY dan ayiran temel ozellik nedir?",
          "en": "What is the key difference between window functions and GROUP BY?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Window fonksiyonları sadece tarih değerlerinde çalışır",
              "en": "Window functions only work on dates"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Window fonksiyonları satırları gruplar halinde daraltır/indirger",
              "en": "Window functions collapse rows into groups"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Window fonksiyonları satırları daraltmadan (indirgemeden) satırlar boyunca hesaplama yapar",
              "en": "Window functions calculate across rows without collapsing them"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "GROUP BY, window fonksiyonlarından daha hızlıdır",
              "en": "GROUP BY is faster than window functions"
            }
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
              "text": {
                "tr": "Window fonksiyonları tabloyu gruplara ayırarak satır sayısını azaltır",
                "en": "Window functions divide the table into groups to reduce the row count"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Aggregate fonksiyonlar satır bazlı hesaplama yapamaz",
                "en": "Aggregate functions cannot perform row-level calculations"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Window fonksiyonları her satırı korur ve sonuç satırı sayısını değiştirmez",
                "en": "Window functions preserve each row and do not change the number of output rows"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Aggregate fonksiyonlar sadece sayısal (numerik) verilerde çalışır",
                "en": "Aggregate functions only work on numeric data"
              }
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
      sqlCtesFilm,
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
      sqlTransactionsFilm,
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
        "type": "step-animation",
        "title": { "tr": "CREATE INDEX Aslında Diskte Ne İnşa Eder?", "en": "What Does CREATE INDEX Actually Build on Disk?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "CREATE INDEX çalıştırıldığında…", "en": "When CREATE INDEX runs…" }, "detail": { "tr": "CREATE INDEX çalıştırıldığında veritabanı o sütunun (örn. status) mevcut TÜM değerlerini okur ve ayrı, sıralı bir B-Tree yapısı diskte İNŞA eder — büyük tablolarda bu işlem saniyeler/dakikalar sürebilir.", "en": "When CREATE INDEX runs, the database reads EVERY existing value in that column (e.g. status) and BUILDS a separate, sorted B-Tree structure on disk — on large tables this can take seconds or minutes." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "İndeks oluşturulduktan SONRA…", "en": "AFTER the index exists…" }, "detail": { "tr": "İndeks oluşturulduktan SONRA yapılan her INSERT/UPDATE/DELETE, hem asıl tabloyu hem de bu B-Tree'yi GÜNCELLER — bu yüzden çok fazla index, yazma işlemlerini yavaşlatır.", "en": "AFTER the index exists, every INSERT/UPDATE/DELETE UPDATES both the base table and this B-Tree — this is why too many indexes slow down writes." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "EXPLAIN SELECT ... sorguyu ÇALIŞTIRMAZ…", "en": "EXPLAIN SELECT ... does NOT run the query…" }, "detail": { "tr": "EXPLAIN SELECT ... çalıştırıldığında veritabanı sorguyu ÇALIŞTIRMAZ — sadece \"type: ALL\" (tüm tabloyu tara) mı yoksa \"type: ref\" (indeksi kullan) mı planladığını GÖSTERİR.", "en": "When EXPLAIN SELECT ... runs, the database does NOT execute the query — it just SHOWS whether it plans \"type: ALL\" (scan the whole table) or \"type: ref\" (use the index)." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İndeks eklenmeden önce EXPLAIN \"ALL\" derse…", "en": "Before the index, if EXPLAIN says \"ALL\"…" }, "detail": { "tr": "İndeks eklenmeden önce EXPLAIN \"ALL\" derse, veritabanı status='FAIL' eşleşmesini bulmak için TÜM satırları TEK TEK kontrol eder — tablo büyüdükçe bu süre DOĞRUSAL olarak artar.", "en": "Before the index, if EXPLAIN says \"ALL\", the database checks EVERY row ONE BY ONE to find status='FAIL' matches — this time grows LINEARLY as the table grows." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "İndeks eklendikten sonra aynı EXPLAIN…", "en": "After the index, the same EXPLAIN…" }, "detail": { "tr": "İndeks eklendikten sonra aynı EXPLAIN \"ref\" ve düşük bir \"rows\" sayısı gösterir — veritabanı artık B-Tree'de DOĞRUDAN o değere ATLAR, tıpkı bir kitabın arka indeksine bakmak gibi.", "en": "After the index, the same EXPLAIN shows \"ref\" and a low \"rows\" count — the database now JUMPS DIRECTLY to that value in the B-Tree, exactly like checking a book's back index." } }
        ]
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
      sqlIndexesViewsFilm,
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
      sqlInjectionFilm,
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
        "type": "step-animation",
        "title": { "tr": "NOW() - INTERVAL 7 DAY Aslında Neyi Hesaplar?", "en": "What Does NOW() - INTERVAL 7 DAY Actually Compute?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "NOW() çalıştırıldığı ANDA…", "en": "The MOMENT NOW() runs…" }, "detail": { "tr": "NOW() çalıştırıldığı ANDA sunucunun güncel tarih/saatini döndürür — sorgu her çalıştığında bu değer YENİDEN hesaplanır, sabit bir tarih DEĞİLDİR.", "en": "The MOMENT NOW() runs, it returns the server's current date/time — this value is RECALCULATED every time the query runs, it's not a fixed date." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "NOW() - INTERVAL 7 DAY bu andan…", "en": "NOW() - INTERVAL 7 DAY produces…" }, "detail": { "tr": "NOW() - INTERVAL 7 DAY bu andan tam 7 gün ÖNCEKİ zaman damgasını üretir — örn. bugün 18 Temmuz'sa sonuç 11 Temmuz olur.", "en": "NOW() - INTERVAL 7 DAY produces the timestamp exactly 7 days BEFORE this moment — e.g. if today is July 18, the result is July 11." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "WHERE run_date >= ... koşulu…", "en": "The WHERE run_date >= ... condition…" }, "detail": { "tr": "WHERE run_date >= ... koşulu, bu eşik değerinden SONRAKİ (veya eşit) her satırı filtreler — 8 gün önceki bir kayıt bu sınırın DIŞINDA kalır, sonuca hiç girmez.", "en": "The WHERE run_date >= ... condition keeps every row AT OR AFTER this threshold — a record from 8 days ago falls OUTSIDE the boundary and never enters the result." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "status = 'FAIL' koşulu AYNI WHERE'de…", "en": "status = 'FAIL' combined in the SAME WHERE…" }, "detail": { "tr": "status = 'FAIL' koşulu AYNI WHERE'de AND ile birleşince, veritabanı HER İKİ koşulu da sağlayan satırları arar — sıra önemli değildir, optimizer ikisini birlikte değerlendirir.", "en": "When status = 'FAIL' is combined in the SAME WHERE with AND, the database looks for rows satisfying BOTH conditions — order doesn't matter, the optimizer evaluates them together." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "İkinci sorgudaki GROUP BY test_name…", "en": "The second query's GROUP BY test_name…" }, "detail": { "tr": "İkinci sorgudaki GROUP BY test_name, aynı test_name'e sahip TÜM FAIL satırlarını TEK bir gruba toplar; COUNT(*) o grubun satır sayısını, ORDER BY fail_count DESC en çok başarısız olan testi EN ÜSTE taşır.", "en": "The second query's GROUP BY test_name collapses ALL FAIL rows sharing the same test_name into ONE group; COUNT(*) counts that group's rows, and ORDER BY fail_count DESC puts the most-failing test AT THE TOP." } }
        ]
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
        "type": "step-animation",
        "title": { "tr": "HAVING COUNT(*) > 1 Neden WHERE Değil?", "en": "Why HAVING COUNT(*) > 1 and Not WHERE?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "GROUP BY email, aynı email'e sahip…", "en": "GROUP BY email collapses rows…" }, "detail": { "tr": "GROUP BY email, aynı email değerine sahip TÜM satırları TEK bir grup haline getirir — 3 kullanıcı aynı email'i kullanıyorsa bu 3 satır BİR gruba düşer.", "en": "GROUP BY email collapses ALL rows sharing the same email value into ONE group — if 3 users share an email, those 3 rows fall into ONE group." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "COUNT(*) her grubun İÇİNDEKİ…", "en": "COUNT(*) counts rows INSIDE…" }, "detail": { "tr": "COUNT(*) her grubun İÇİNDEKİ satır sayısını hesaplar — bu hesaplama GRUPLAMA yapıldıktan SONRA çalışır.", "en": "COUNT(*) counts the rows INSIDE each group — this calculation runs AFTER grouping has already happened." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "HAVING COUNT(*) > 1, tam da bu…", "en": "HAVING COUNT(*) > 1 filters exactly…" }, "detail": { "tr": "HAVING COUNT(*) > 1, tam da bu grup bazlı sayıya göre filtre yapar — WHERE bunu YAPAMAZ çünkü WHERE gruplama OLUŞMADAN ÖNCE çalışır, COUNT(*) henüz hesaplanmamıştır.", "en": "HAVING COUNT(*) > 1 filters exactly on this per-group count — WHERE CANNOT do this because WHERE runs BEFORE grouping happens, so COUNT(*) doesn't exist yet." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İkinci sorgudaki alt sorgu…", "en": "The second query's subquery…" }, "detail": { "tr": "İkinci sorgudaki alt sorgu önce \"hangi email'ler tekrarlı\" listesini üretir, dış sorgu SONRA bu listedeki email'lere sahip TÜM satırları (ilk kopya dahil) getirir — sadece sayıyı değil, kaydın KENDİSİNİ görmeni sağlar.", "en": "The second query's subquery first produces the list of \"which emails repeat\", then the outer query fetches EVERY row (including the first copy) matching those emails — showing you the actual record, not just a count." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Üçüncü sorgu GROUP BY'ı birden fazla sütuna…", "en": "The third query extends GROUP BY…" }, "detail": { "tr": "Üçüncü sorgu GROUP BY'ı birden fazla sütuna (test_name, environment, run_date) genişletir — bu, \"aynı testin aynı ortamda aynı tarihte iki kez kaydedilmesi\" gibi TAM satır tekrarlarını yakalar.", "en": "The third query extends GROUP BY across multiple columns (test_name, environment, run_date) — this catches EXACT row duplicates, like the same test being recorded twice for the same environment on the same date." } }
        ]
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
      sqlQaUseCasesFilm,
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
      sqlEcosystemFilm,
      sqlEcosystemSteps,
      sqlEcosystemPractice,
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
      sqlTroubleshootingFilm,
      sqlTroubleshootingSteps,
      sqlTroubleshootingPractice,
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
      sqlJavaToSqlFilm,
      sqlJavaToSqlSteps,
      sqlJavaToSqlPractice,
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
      sqlPracticeReferenceFilm,
      sqlPracticeReferenceSteps,
      sqlPracticeReferencePractice,
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
        "text": "What is DBeaver?"
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
            "label": "Completely Free",
            "desc": "Community Edition is 100% free and open-source. No license fee, no subscription."
          },
          {
            "icon": "🗄️",
            "label": "80+ Databases",
            "desc": "MySQL, PostgreSQL, SQLite, Oracle, SQL Server, MongoDB, Redis, and more."
          },
          {
            "icon": "🎨",
            "label": "Visual Schema Editor",
            "desc": "Click-through tables, ER diagrams, a visual foreign key browser."
          },
          {
            "icon": "⚡",
            "label": "SQL Editor + Autocomplete",
            "desc": "Syntax highlighting, autocomplete, query history, and explain plan."
          },
          {
            "icon": "📊",
            "label": "Data Export",
            "desc": "Export to CSV, Excel, JSON, SQL formats. Import from file."
          },
          {
            "icon": "🔐",
            "label": "SSH Tunnel",
            "desc": "Secure, encrypted connection to remote production databases via SSH tunnel."
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
            "desc": "dbeaver.io → Community Edition → pick the package for your operating system"
          },
          {
            "icon": "2️⃣",
            "label": "Kur",
            "desc": "Windows: run the .exe · macOS: drag the .dmg · Linux: .deb or snap"
          },
          {
            "icon": "3️⃣",
            "label": "Aç",
            "desc": "Downloads a bundled Java (JRE) on first launch — requires an internet connection"
          },
          {
            "icon": "4️⃣",
            "label": "Verify",
            "desc": "Help → About DBeaver → versiyon bilgisi görünmeli"
          }
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# Windows install (winget package manager)\nwinget install dbeaver.dbeaver\n\n# macOS install (Homebrew)\nbrew install --cask dbeaver-community\n\n# Ubuntu/Debian install\nwget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -\necho 'deb https://dbeaver.io/debs/dbeaver-ce /' | sudo tee /etc/apt/sources.list.d/dbeaver.list\nsudo apt update && sudo apt install dbeaver-ce\n\n# Linux Snap (easiest route)\nsnap install dbeaver-ce\n\n# Verify version: Help → About DBeaver menu shows the version"
      },
      {
        "type": "step-animation",
        "title": { "tr": "DBeaver Kurulum Komutu Perde Arkasında Ne Yapar?", "en": "What Does the DBeaver Install Command Actually Do?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "winget/brew/apt komutlarının HER BİRİ…", "en": "EACH of winget/brew/apt…" }, "detail": { "tr": "winget/brew/apt komutlarının HER BİRİ, işletim sisteminin KENDİ paket yöneticisini kullanır — dbeaver.io'dan manuel .exe/.dmg indirmenin otomatikleştirilmiş hâlidir, sonuç AYNIDIR.", "en": "EACH of winget/brew/apt uses the operating system's OWN package manager — it's the automated version of manually downloading the .exe/.dmg from dbeaver.io, the end result is IDENTICAL." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "macOS'taki --cask bayrağı…", "en": "The --cask flag on macOS…" }, "detail": { "tr": "macOS'taki --cask bayrağı, Homebrew'e bunun bir GUI uygulaması (komut satırı aracı değil) olduğunu söyler — DBeaver.app klasörü Applications'a KOPYALANIR.", "en": "The --cask flag on macOS tells Homebrew this is a GUI app (not a command-line tool) — the DBeaver.app bundle gets COPIED into Applications." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "Ubuntu/Debian'da önce GPG anahtarı…", "en": "On Ubuntu/Debian, the GPG key…" }, "detail": { "tr": "Ubuntu/Debian'da önce GPG anahtarı eklenir (apt-key add) — bu, indirilecek paketin GERÇEKTEN DBeaver'ın resmi sunucusundan geldiğini KRİPTOGRAFİK olarak doğrular, sahte paket kurulumunu ENGELLER.", "en": "On Ubuntu/Debian, the GPG key gets added first (apt-key add) — this CRYPTOGRAPHICALLY verifies the package really comes from DBeaver's official server, PREVENTING a spoofed package install." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İlk açılışta DBeaver kendi içine gömülü…", "en": "On first launch, DBeaver downloads…" }, "detail": { "tr": "İlk açılışta DBeaver kendi içine gömülü bir Java (JRE) İNDİRİR — bu yüzden ilk açılış internet bağlantısı GEREKTİRİR, sonraki açılışlar çevrimdışı çalışabilir.", "en": "On first launch, DBeaver DOWNLOADS a bundled Java runtime (JRE) — this is why the first launch REQUIRES an internet connection, later launches can work offline." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Help → About DBeaver menüsü…", "en": "The Help → About DBeaver menu…" }, "detail": { "tr": "Help → About DBeaver menüsü kurulan versiyonu GÖSTERİR — bu, \"kurulum gerçekten başarılı oldu mu\" sorusuna dönen tek güvenilir doğrulama adımıdır.", "en": "The Help → About DBeaver menu SHOWS the installed version — this is the one reliable check that answers \"did the install actually succeed\"." } }
        ]
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
        "text": "Create DB & Schema From Scratch"
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
            "label": "1. Connect",
            "desc": "Database Navigator (left) → + icon → pick the database type → fill Host/Port/User/Password"
          },
          {
            "icon": "🗃️",
            "label": "2. Create Database",
            "desc": "Right-click the connection → Create → Database → give it a name (e.g. myapp_db)"
          },
          {
            "icon": "📋",
            "label": "3. Write SQL Schema",
            "desc": "Open SQL Editor (F3) → write your CREATE TABLE statements → run with Ctrl+Enter"
          },
          {
            "icon": "✅",
            "label": "4. Verify",
            "desc": "Double-click the table in Navigator → Data tab → see the rows in the grid"
          }
        ]
      },
      {
        "type": "code",
        "language": "sql",
        "code": "-- Run in DBeaver SQL Editor (open with F3, run with Ctrl+Enter)\n\n-- 1. Create the database (for PostgreSQL)\nCREATE DATABASE myapp_db;\n\n-- 2. Create the schema (like a package in Java — provides a namespace)\nCREATE SCHEMA IF NOT EXISTS app;\n\n-- 3. Users table\nCREATE TABLE app.users (\n  id         SERIAL       PRIMARY KEY,           -- auto-incrementing primary key\n  email      VARCHAR(255) UNIQUE NOT NULL,        -- unique and required\n  name       VARCHAR(100) NOT NULL,               -- required field\n  role       VARCHAR(20)  DEFAULT 'user',         -- default value\n  created_at TIMESTAMP    DEFAULT NOW()           -- timestamp set automatically\n);\n\n-- 4. Posts table (foreign key relationship to users)\nCREATE TABLE app.posts (\n  id         SERIAL       PRIMARY KEY,\n  title      VARCHAR(300) NOT NULL,\n  content    TEXT,\n  author_id  INT REFERENCES app.users(id) ON DELETE CASCADE, -- FK → users table\n  published  BOOLEAN      DEFAULT false,\n  created_at TIMESTAMP    DEFAULT NOW()\n);\n\n-- 5. Insert test data\nINSERT INTO app.users (email, name, role) VALUES\n  ('alice@example.com', 'Alice', 'admin'),\n  ('bob@example.com',   'Bob',   'user');\n\nINSERT INTO app.posts (title, content, author_id, published) VALUES\n  ('Hello World', 'First post', 1, true),\n  ('Draft Post', NULL,         2, false);\n\n-- 6. JOIN to verify the related data\nSELECT u.name, p.title, p.published\nFROM   app.users u\nJOIN   app.posts p ON p.author_id = u.id\nORDER  BY p.created_at DESC;"
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
        "text": "Next.js + PostgreSQL Integration"
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
            "desc": "fetch('/api/users') → sends an HTTP request"
          },
          {
            "icon": "⚡",
            "label": "Next.js API Route",
            "desc": "/app/api/users/route.ts → handles the request"
          },
          {
            "icon": "🔗",
            "label": "Driver / ORM",
            "desc": "pg (raw SQL) or Prisma (ORM) — talks to the DB"
          },
          {
            "icon": "🗄️",
            "label": "PostgreSQL",
            "desc": "PostgreSQL database managed via DBeaver"
          }
        ]
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Approach 1: pg package (raw SQL) — like JDBC in Java, full control\n// Install: npm install pg @types/pg\n\n// lib/db.ts — create a single connection pool\nimport { Pool } from 'pg';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL, // define this in .env.local\n  max: 10,                                    // maximum concurrent connections\n});\n\nexport default pool;\n\n// app/api/users/route.ts\nimport { NextResponse } from 'next/server';\nimport pool from '@/lib/db';\n\nexport async function GET() {\n  const result = await pool.query(\n    'SELECT id, name, email FROM app.users ORDER BY created_at DESC'\n  );\n  return NextResponse.json(result.rows);\n}\n\nexport async function POST(req: Request) {\n  const { name, email } = await req.json();\n  const result = await pool.query(\n    'INSERT INTO app.users (name, email) VALUES ($1, $2) RETURNING *',\n    [name, email]  // parameterized query — safe against SQL injection\n  );\n  return NextResponse.json(result.rows[0], { status: 201 });\n}"
      },
      {
        "type": "code",
        "language": "typescript",
        "code": "// Approach 2: Prisma ORM — like Hibernate/JPA in Java, type-safe\n// Install: npm install prisma @prisma/client && npx prisma init\n\n// prisma/schema.prisma — schema written in a TypeScript-like DSL\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  role      String   @default(\"user\")\n  posts     Post[]   // relation — User has a list of Posts\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String?\n  author    User     @relation(fields: [authorId], references: [id])\n  authorId  Int      // FK column\n  published Boolean  @default(false)\n  createdAt DateTime @default(now())\n}\n\n// app/api/users/route.ts — with Prisma\nimport { NextResponse } from 'next/server';\nimport { PrismaClient }  from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport async function GET() {\n  const users = await prisma.user.findMany({\n    include: { posts: { where: { published: true } } } // include published posts only\n  });\n  return NextResponse.json(users);\n}\n\n// Run the migration (the equivalent of CREATE TABLE in DBeaver)\n// npx prisma migrate dev --name init"
      },
      {
        "type": "table",
        "headers": [
          { "tr": "Özellik / Feature", "en": "Feature" },
          "pg (Raw SQL)",
          "Prisma ORM"
        ],
        "rows": [
          [
            { "tr": "Öğrenme eğrisi", "en": "Learning curve" },
            { "tr": "SQL biliyorsan sıfır", "en": "Zero if you already know SQL" },
            { "tr": "Prisma DSL öğren (~1 gün)", "en": "Learn the Prisma DSL (~1 day)" }
          ],
          [
            "Type safety",
            { "tr": "Manuel cast gerekir", "en": "Requires manual casting" },
            { "tr": "✅ Otomatik TypeScript tipleri", "en": "✅ Automatic TypeScript types" }
          ],
          [
            { "tr": "Migration yönetimi", "en": "Migration management" },
            { "tr": "Elle SQL dosyası yaz", "en": "Write SQL files by hand" },
            "✅ npx prisma migrate dev"
          ],
          [
            { "tr": "Sorgu performansı", "en": "Query performance" },
            { "tr": "Tam kontrol, optimize et", "en": "Full control, optimize yourself" },
            { "tr": "Karmaşık JOIN'lerde dikkatli ol", "en": "Be careful with complex JOINs" }
          ],
          [
            { "tr": "DBeaver uyumu", "en": "DBeaver compatibility" },
            { "tr": "✅ Aynı DB'ye bağlanır", "en": "✅ Connects to the same DB" },
            { "tr": "✅ Prisma Studio da var", "en": "✅ Prisma Studio is also available" }
          ],
          [
            { "tr": "Java karşılığı", "en": "Java equivalent" },
            "JDBC",
            "Hibernate / JPA"
          ],
          [
            { "tr": "Ne zaman seç", "en": "When to choose" },
            { "tr": "Karmaşık SQL, tam kontrol", "en": "Complex SQL, full control" },
            { "tr": "Hızlı başlangıç, type-safe API", "en": "Fast start, type-safe API" }
          ]
        ]
      },
      {
        "type": "code",
        "language": "bash",
        "code": "# .env.local file (do NOT commit — add it to .gitignore!)\n\n# PostgreSQL connection URL format\nDATABASE_URL=\"postgresql://user:password@localhost:5432/myapp_db?schema=app\"\n\n# For SQLite (dev environment — no server needed)\n# DATABASE_URL=\"file:./dev.db\"\n\n# DBeaver connection settings (connects to the same database)\n# Host     : localhost\n# Port     : 5432  (PostgreSQL default)\n# Database : myapp_db\n# Username : user\n# Password : password\n# Schema   : app"
      },
      {
        "type": "step-animation",
        "title": { "tr": "DATABASE_URL Tek Satırda Aslında 5 Bilgiyi Taşır", "en": "DATABASE_URL Actually Packs 5 Pieces of Info Into One Line" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "postgresql:// öneki…", "en": "The postgresql:// prefix…" }, "detail": { "tr": "postgresql:// öneki, sürücüye HANGİ veritabanı motoruna bağlanacağını söyler — pg paketi bu ön eki okuyup doğru protokolü SEÇER.", "en": "The postgresql:// prefix tells the driver WHICH database engine to connect to — the pg package reads this prefix and SELECTS the correct protocol." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "user:password@ kısmı…", "en": "The user:password@ portion…" }, "detail": { "tr": "user:password@ kısmı, DBeaver'da \"New Connection Wizard\"da AYRI AYRI girdiğin Username/Password alanlarının TEK satırda birleşmiş hâlidir.", "en": "The user:password@ portion is the Username/Password fields you enter SEPARATELY in DBeaver's \"New Connection Wizard\", merged into ONE line." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "localhost:5432 kısmı…", "en": "The localhost:5432 portion…" }, "detail": { "tr": "localhost:5432 kısmı sunucunun ADRESİNİ ve PORTUNU taşır — production'da bu genelde bir cloud sağlayıcının hostname'i olur, localhost DEĞİL.", "en": "The localhost:5432 portion carries the server's ADDRESS and PORT — in production this is usually a cloud provider's hostname, NOT localhost." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "/myapp_db kısmı…", "en": "The /myapp_db portion…" }, "detail": { "tr": "/myapp_db kısmı HANGİ veritabanına bağlanılacağını belirtir — aynı sunucuda birden fazla veritabanı olabilir, bu segment ARALARINDA SEÇİM yapar.", "en": "The /myapp_db portion specifies WHICH database to connect to — a single server can host multiple databases, and this segment SELECTS between them." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "?schema=app kısmı PostgreSQL'e özgüdür…", "en": "?schema=app is PostgreSQL-specific…" }, "detail": { "tr": "?schema=app kısmı PostgreSQL'e özgüdür — Java'daki paket (package) gibi, aynı veritabanı içinde tabloları isim çakışmasından KORUYAN bir NAMESPACE belirtir; bu satır DEĞİŞTİĞİNDE hem Next.js kodunun hem DBeaver bağlantısının GÜNCELLENMESİ gerekir.", "en": "?schema=app is PostgreSQL-specific — like a package in Java, it defines a NAMESPACE that PROTECTS tables in the same database from name collisions; when this line CHANGES, both the Next.js code and the DBeaver connection need UPDATING." } }
        ]
      },
      sqlDbeaverFilm,
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
,
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
        type: 'interview-questions',
          relatedTopicId: 'sql',
        topic: 'SQL',
        questions: [
              // ── BASIC ──────────────────────────────────────────
              {"level":"basic","q":{"en":"Q1: What is the difference between WHERE and HAVING?","tr":"Soru 1: WHERE ile HAVING arasındaki fark nedir?"},"a":{"en":"WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.","tr":"WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE."},"code":{"en":"-- WHERE: filter rows before grouping\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: filter groups after aggregation\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- first filter rows (only FAIL rows)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)","tr":"-- WHERE: gruplamadan önce satırları filtreler\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: gruplamadan sonra grupları filtreler\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- önce satırları filtrele (sadece FAIL olanlar)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- sonra grupları filtrele (sık hata alanlar)"}},
              {"level":"basic","q":{"en":"Q2: Explain the different types of JOINs.","tr":"Soru 2: Farklı JOIN türlerini açıklayın."},"a":{"en":"INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.","tr":"INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir."},"code":{"en":"-- Find testers WITH open bugs (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Find ALL testers, even those with no bugs (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;","tr":"-- Açık bug raporu olan testçileri bul (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Tüm testçileri bul, bug raporu olmayanlar dahil (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;"}},
              {"level":"basic","q":{"en":"Q3: What is a PRIMARY KEY vs FOREIGN KEY?","tr":"Soru 3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?"},"a":{"en":"PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn't exist in the parent table.","tr":"PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez."},"code":{"en":"CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    user_id INT NOT NULL,                    -- FK column\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint\n    -- → cannot insert user_id = 999 if no user with id=999 exists\n);","tr":"CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    user_id INT NOT NULL,                    -- FK (Yabancı Anahtar) sütunu\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK (Yabancı Anahtar) kısıtlaması\n    -- → id=999 olan bir kullanıcı yoksa user_id = 999 eklenemez\n);"}},
              {"level":"basic","q":{"en":"Q4: What is NULL and how do you check for it?","tr":"Soru 4: NULL nedir ve nasıl kontrol edilir?"},"a":{"en":"NULL means \"no value\" or \"unknown\". It's not the same as 0, empty string \"\", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.","tr":"NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın."},"code":{"en":"-- Wrong:\nSELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.\nSELECT * FROM users WHERE phone != NULL;   -- same problem\n\n-- Correct:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- Provide default with COALESCE:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;","tr":"-- Yanlış:\nSELECT * FROM users WHERE phone = NULL;    -- 0 satır döndürür! Her zaman false.\nSELECT * FROM users WHERE phone != NULL;   -- aynı sorun\n\n-- Doğru:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- COALESCE ile varsayılan değer sağla:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;"}},
              {"level":"basic","q":{"en":"Q5: What is the difference between DELETE, TRUNCATE, and DROP?","tr":"Soru 5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?"},"a":{"en":"DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.","tr":"DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir."},"code":{"en":"DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows\nDELETE FROM test_results;                           -- remove all rows (slow)\n\nTRUNCATE TABLE test_results;                        -- remove all rows (fast)\n\nDROP TABLE test_results;                            -- delete entire table!","tr":"DELETE FROM test_results WHERE status = 'SKIP';    -- belirli satırları sil\nDELETE FROM test_results;                           -- tüm satırları sil (yavaş)\n\nTRUNCATE TABLE test_results;                        -- tüm satırları sil (hızlı)\n\nDROP TABLE test_results;                            -- tüm tabloyu sil!"}},
              {"level":"basic","q":{"en":"Q6: What is the difference between UNION and UNION ALL?","tr":"Soru 6: UNION ile UNION ALL arasındaki fark nedir?"},"a":{"en":"UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.","tr":"UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır."},"code":{"en":"-- UNION: removes duplicates (slower):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: keeps duplicates (faster):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';","tr":"-- UNION: tekrarlananları kaldırır (daha yavaş):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: tekrarlananları korur (daha hızlı):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';"}},
              {"level":"basic","q":{"en":"Q7: How do subqueries work? What is a correlated subquery?","tr":"Soru 7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?"},"a":{"en":"A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.","tr":"Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın."},"code":{"en":"-- Simple subquery (runs ONCE):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Correlated subquery (runs once per outer row — slow on large tables!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Better: use LEFT JOIN + GROUP BY instead","tr":"-- Basit alt sorgu (BİR KEZ çalışır):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Bağlantılı alt sorgu (dış sorgunun her satırı için çalışır — büyük tablolarda yavaş!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Daha iyi: bunun yerine LEFT JOIN + GROUP BY kullanın"}},
              {"level":"basic","q":{"en":"Q8: What are indexes and how do they affect performance?","tr":"Soru 8: Index nedir, performansı nasıl etkiler?"},"a":{"en":"An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book's index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon't index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.","tr":"Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan dizinden atlarsınız.\n\nHızlandırır: SELECT with WHERE, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, status), sık güncellenen sütunlar."},"code":{"en":"-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Add index:\nCREATE INDEX idx_status ON test_results(status);\n\n-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';","tr":"-- İndeksten önce: EXPLAIN type=ALL gösterir (TÜM 50,000 satırı okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- İndeks ekle:\nCREATE INDEX idx_status ON test_results(status);\n\n-- İndeksten sonra: EXPLAIN type=ref gösterir (indeks kullanır, ~5000 satır okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';"}},
              {"level":"basic","q":{"en":"Q9: Write a query to find the second highest value in a table.","tr":"Soru 9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın."},"a":{"en":"Finding the second highest value is a classic. You can use LIMIT/OFFSET, a subquery, or window functions. LIMIT/OFFSET is the simplest, but the subquery method is database-agnostic.","tr":"En yüksek ikinci değeri bulmak için LIMIT/OFFSET, alt sorgu veya window fonksiyonları kullanılabilir. LIMIT ve OFFSET en kolay yoldur ancak alt sorgu yaklaşımı veritabanından bağımsız olarak çalışır."},"code":{"en":"-- Option 1: LIMIT + OFFSET (simplest, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Option 2: Subquery (works in all databases, handles duplicates):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Option 3: Window Function (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;","tr":"-- Seçenek 1: LIMIT + OFFSET (en basit, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Seçenek 2: Alt sorgu (tüm veritabanlarında çalışır, tekrarlananları yönetir):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Seçenek 3: Pencere Fonksiyonu (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;"}},
              {"level":"basic","q":{"en":"Q10: GROUP BY — What rules apply to SELECT columns?","tr":"Soru 10: GROUP BY kullanırken SELECT sütunlarına hangi kurallar uygulanır?"},"a":{"en":"In standard SQL, every column in the SELECT clause must either be specified in the GROUP BY clause, or wrapped in an aggregate function (COUNT, SUM, AVG, etc.). Otherwise, the engine throws an error because it cannot choose a single value from the multiple rows collapsing into that group.","tr":"SELECT listesindeki her sütun ya GROUP BY içinde yer almalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır. Aksi takdirde veritabanı motoru her grup için hangi tekil değeri göstereceğini bilemez ve hata fırlatır."},"code":{"en":"-- WRONG in standard SQL (MySQL without ONLY_FULL_GROUP_BY might allow it, but returns random name!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- CORRECT:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- ALSO CORRECT:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;","tr":"-- Standart SQL'de YANLIŞ (ONLY_FULL_GROUP_BY kapalı MySQL izin verebilir ama rastgele ad döndürür!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- DOĞRU:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- BU DA DOĞRU:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;"}},
              {"level":"basic","q":{"en":"Q11: Explain window functions with a practical example.","tr":"Soru 11: Window fonksiyonlarını pratik bir örnekle açıklayın."},"a":{"en":"Window functions perform calculations across a set of table rows that are somehow related to the current row, without collapsing them into a single output row like GROUP BY. Each row retains its identity. `OVER()` defines the window, `PARTITION BY` groups the window, and `ORDER BY` sorts within it.","tr":"Window fonksiyonları, satırları tek bir grupta birleştirmeden (GROUP BY yapmadan) satır kümeleri üzerinde hesaplama yapar. Her satır kendi kimliğini korur ve window hesaplaması sonucunu alır. `OVER()` pencereyi, `PARTITION BY` grupları, `ORDER BY` ise sıralamayı belirler."},"code":{"en":"-- Show each test run alongside the average duration of its environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Rank tests by duration within each environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;","tr":"-- Her test çalışmasını, kendi ortamının ortalama süresiyle birlikte göster:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Testleri her ortamda kendi içlerinde sürelerine göre sırala:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;"}},
              {"level":"basic","q":{"en":"Q12: What is a CTE? When should it be preferred over a subquery?","tr":"Soru 12: CTE nedir? Alt sorguya göre ne zaman tercih edilmelidir?"},"a":{"en":"A CTE (Common Table Expression) is a temporary named result set defined using the `WITH` clause. It improves readability by breaking complex nested subqueries into logical top-down steps, and can be referenced multiple times within the same query.","tr":"CTE (Common Table Expression), `WITH` ifadesiyle tanımlanan adlandırılmış geçici bir sonuç kümesidir. Karmaşık iç içe sorguları yukarıdan aşağıya mantıklı adımlara bölerek okunabilirliği artırır ve aynı geçici tabloya tek sorguda birden çok kez atıfta bulunulmasını sağlar."},"code":{"en":"-- Readable queries with CTE:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;","tr":"-- CTE ile okunabilir sorgular:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;"}},
              {"level":"basic","q":{"en":"Q13: How does a transaction work? What are the ACID properties?","tr":"Soru 13: Transaction nasıl çalışır? ACID özellikleri nelerdir?"},"a":{"en":"A database transaction is a sequence of SQL statements executed as a single, atomic unit of work. ACID stands for:\nAtomicity: All-or-nothing execution.\nConsistency: Moves the DB from one valid state to another, enforcing constraints.\nIsolation: Concurrent transactions do not interfere with each other.\nDurability: Once committed, updates survive system failures.","tr":"Transaction, tek bir birim olarak işlenen SQL komutları dizisidir. ACID özellikleri şunlardır:\nAtomicity (Atomiklik): Hepsi ya da hiçbiri.\nConsistency (Tutarlılık): Şema kuralları korunur.\nIsolation (İzolasyon): Eşzamanlı işlemler birbirini etkilemez.\nDurability (Kalıcılık): COMMIT sonrası veriler kalıcı diske yazılır."},"code":{"en":"START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If both succeeded:\nCOMMIT;\n\n-- If any failed:\nROLLBACK;","tr":"START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Eğer ikisi de başarılı olursa:\nCOMMIT;\n\n-- Eğer herhangi biri başarısız olursa:\nROLLBACK;"}},
              {"level":"basic","q":{"en":"Q14: What is SQL injection and how do parameterized queries prevent it?","tr":"Soru 14: SQL Injection nedir ve parametreli sorgular bunu nasıl önler?"},"a":{"en":"SQL Injection is a vulnerability where malicious SQL commands are injected into database queries through untrusted user inputs. Parameterized queries (Prepared Statements) compile the SQL query template first, then bind parameters as raw values. The inputs are never interpreted as SQL executable code.","tr":"SQL Injection, kullanıcı girdilerinin SQL kodu gibi yorumlanması zafiyetidir. Parametreli sorgular (Prepared Statements), SQL yapısı ile kullanıcı verisini tamamen ayırır. Veri ne olursa olsun (zararlı kodlar dahil) sadece bir parametre/değer olarak işlenir ve çalıştırılamaz."},"code":{"en":"-- VULNERABLE to SQL injection:\n-- Input: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Generates: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- SAFE (Parameterized query):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir","tr":"-- SQL injection'a karşı savunmasız:\n-- Girdi: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Üretilen: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- GÜVENLİ (Parametreli sorgu):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir"}},
              {"level":"basic","q":{"en":"Q15: How do you optimize a slow SQL query?","tr":"Soru 15: Yavaş bir sorguyu nasıl optimize edersiniz?"},"a":{"en":"1. Use `EXPLAIN` to audit the query plan and identify Full Table Scans.\n2. Add indexes on columns commonly used in WHERE clauses, JOIN conditions, and ORDER BY constraints.\n3. Avoid `SELECT *`; only request the specific columns you need.\n4. Rewrite subqueries as JOINs where possible to allow optimizer optimizations.\n5. Use LIMIT to return only the subset of data required by the application.","tr":"1. `EXPLAIN` ile sorgu planını inceleyin, full table scan olan adımları tespit edin.\n2. Sık filtrelenen (WHERE), birleştirilen (JOIN ON) ve sıralanan (ORDER BY) sütunlara index ekleyin.\n3. `SELECT *` yerine sadece gerekli sütunları çağırın.\n4. Alt sorguları (subquery) mümkünse JOIN'e dönüştürün.\n5. Ağır sorgularda performansı optimize etmek için LIMIT kullanın."},"code":{"en":"-- EXPLAIN query plan:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Create compound index for multi-column filters:\nCREATE INDEX idx_user_status ON orders(user_id, status);","tr":"-- EXPLAIN sorgu planı:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Çoklu sütun filtreleri için birleşik indeks oluştur:\nCREATE INDEX idx_user_status ON orders(user_id, status);"}},
              // ── INTERMEDIATE ────────────────────────────────────
              {"level":"intermediate","q":{"en":"Q16: What is a Database Schema?","tr":"Soru 16: Veritabanı Şeması (Schema) ne anlama gelir?"},"a":{"en":"A database schema is the skeleton structure that represents the logical view of the entire database. It defines how the data is organized, including tables, columns, data types, primary/foreign keys, and relationships. For a QA engineer, the schema serves as the map to design database validation tests.","tr":"Veritabanı şeması, veritabanının mantıksal ve fiziksel yapısını tanımlayan bir plandır (blueprint). Tabloları, sütunları, veri tiplerini, primary/foreign key kısıtlamalarını ve tablolar arası ilişkileri içerir. Bir QA mühendisi için, uygulamanın veri yapısını anlamak ve test verisi tasarlamak için şema bilgisi kritik önem taşır."},"code":{"en":"-- Example of schema definition (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);","tr":"-- Şema tanımı örneği (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"}},
              {"level":"intermediate","q":{"en":"Q17: What does the SELECT DISTINCT statement do?","tr":"Soru 17: SELECT DISTINCT ifadesi ne işe yarar?"},"a":{"en":"The SELECT DISTINCT statement is used to return only distinct (different) values from a column, filtering out all duplicate rows in the result set. In QA testing, it is useful to check all unique values present in a table, such as tested environments or unique statuses.","tr":"SELECT DISTINCT, sorgu sonucunda tekrar eden satırları kaldırarak sadece benzersiz (unique) değerlerin listelenmesini sağlar. QA otomasyonunda, test sonuçlarında hangi farklı ortamların (environment) kullanıldığını veya tablodaki benzersiz durumları listelemek için sıkça kullanılır."},"code":{"en":"-- Get list of unique environments tested:\nSELECT DISTINCT environment FROM test_results;","tr":"-- Test edilen benzersiz ortamların listesini al:\nSELECT DISTINCT environment FROM test_results;"}},
              {"level":"intermediate","q":{"en":"Q18: What is the difference between = and LIKE in a WHERE clause?","tr":"Soru 18: WHERE koşulunda = ve LIKE arasındaki temel fark nedir?"},"a":{"en":"The `=` operator searches for an exact match, whereas the `LIKE` operator performs pattern matching using wildcard characters. `LIKE` supports `%` (matches any sequence of zero or more characters) and `_` (matches exactly one character). Using wildcard characters with `=` treats them as literal characters.","tr":"`=` tam (birebir) eşleşme ararken, `LIKE` karakter bazlı şablon (pattern matching) eşleşmeleri arar. `LIKE` ile birlikte `%` (sıfır veya daha fazla karakter) ve `_` (tek bir karakter) wildcard karakterleri kullanılabilir. `=` ile wildcard karakterleri çalışmaz, düz string olarak eşleştirilmeye çalışılır."},"code":{"en":"-- Exact match:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Pattern match:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- Starts with 'Login'","tr":"-- Birebir eşleşme:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Şablon eşleşmesi:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- 'Login' ile başlayanlar"}},
              {"level":"intermediate","q":{"en":"Q19: What is the purpose of the LIMIT clause?","tr":"Soru 19: LIMIT ifadesinin amacı nedir?"},"a":{"en":"The LIMIT clause specifies the maximum number of rows that the query should return. It is crucial when testing against large datasets to prevent memory overflow in your test script or UI by fetching only a small subset of records. Often combined with OFFSET for pagination.","tr":"LIMIT, sorgu sonucunda dönecek maksimum satır sayısını sınırlandırmak için kullanılır. Özellikle milyonlarca satır içeren büyük tablolarda test yaparken tarayıcıyı veya test scriptini çökertmemek için sorgunun sadece ilk birkaç satırını (örn: LIMIT 10) getirmesini sağlamak amacıyla kullanılır. Pagination (sayfalama) için OFFSET ile birlikte kullanılır."},"code":{"en":"-- Get the 5 most recent test failures:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;","tr":"-- En son 5 test hatasını al:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;"}},
              {"level":"intermediate","q":{"en":"Q20: Explain what AS (alias) keyword does.","tr":"Soru 20: AS (alias) anahtar kelimesi ne işe yarar?"},"a":{"en":"The AS keyword is used to assign a temporary name (alias) to a column or table in a query. It makes output columns more readable (e.g. naming aggregate results) and keeps JOIN queries concise by creating short aliases for table names.","tr":"AS, bir sütuna veya tabloya sorgu süresince geçici bir takma ad (alias) vermek için kullanılır. Özellikle aggregate sonuçlarda sütun adını anlamlı kılmak (`COUNT(*) AS total_runs`) veya JOIN sorgularında tablo adlarını kısaltarak okunabilirliği artırmak için kullanılır."},"code":{"en":"-- Column alias:\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Table alias:\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;","tr":"-- Sütun takma adı (alias):\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Tablo takma adı (alias):\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;"}},
              {"level":"intermediate","q":{"en":"Q21: What is the default sorting order of ORDER BY?","tr":"Soru 21: ORDER BY ifadesinin varsayılan sıralama yönü nedir?"},"a":{"en":"The default sorting order of the ORDER BY clause is ascending (ASC). This means it sorts numbers from lowest to highest, and text alphabetically from A to Z. To sort in descending order, you must explicitly append the `DESC` keyword after the column name.","tr":"ORDER BY ifadesinin varsayılan sıralama yönü artan sıralamadır (ASC - Ascending). Yani sayılarda küçükten büyüğe, metinlerde ise A'dan Z'ye doğru sıralar. Azalan sıralama (büyükten küçüğe / Z'den A'ya) yapmak için sütun adından sonra açıkça `DESC` yazılmalıdır."},"code":{"en":"-- Sorts ascending (default):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Sorts descending:\nSELECT * FROM test_results ORDER BY duration_ms DESC;","tr":"-- Artan sıralama (varsayılan):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Azalan sıralama:\nSELECT * FROM test_results ORDER BY duration_ms DESC;"}},
              {"level":"intermediate","q":{"en":"Q22: What happens if you try to insert a duplicate value into a PRIMARY KEY column?","tr":"Soru 22: PRIMARY KEY olan bir sütuna tekrar eden (duplicate) değer eklemeye çalışırsanız ne olur?"},"a":{"en":"The database engine throws a primary key constraint violation error and rejects the INSERT operation. If the query is part of a transaction, the transaction will be rolled back. In automation, you must clean up test data or use UPSERT syntax to prevent duplicate key failures.","tr":"Veritabanı motoru hata fırlatır ve ekleme işlemini reddeder (Unique Constraint Violation). Transaction içindeyse tüm transaction iptal edilir. Test otomasyonunda, test verisi eklerken bu hatayı önlemek için her çalıştırmadan önce temizlik (cleanup) yapmak veya UPSERT (ON CONFLICT) mekanizması kullanmak önemlidir."},"code":{"en":"-- Duplicate insert will throw: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- fails!","tr":"-- Tekrarlanan ekleme hata fırlatacaktır: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- başarısız olur!"}},
              {"level":"intermediate","q":{"en":"Q23: What does the IN operator do in a SQL query?","tr":"Soru 23: IN operatörü ne işe yarar?"},"a":{"en":"The IN operator allows you to specify multiple values in a WHERE clause, acting as a shorthand for multiple OR conditions. It filters rows where the column value matches any value in the provided list. It is also commonly used to match against the results of a subquery.","tr":"IN operatörü, WHERE koşulunda birden fazla OR (veya) ifadesini tek bir liste halinde yazmayı sağlar. Sütunun değerinin belirtilen listedeki elemanlardan herhangi biriyle eşleşmesi durumunda satırı filtreye dahil eder. Alt sorgulardan dönen küme kontrollerinde de sıkça kullanılır."},"code":{"en":"-- Shorthand for OR:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Equivalent to:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';","tr":"-- OR için kısaltma:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Şuna eşdeğerdir:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';"}},
              {"level":"intermediate","q":{"en":"Q24: What is the difference between CHAR and VARCHAR data types?","tr":"Soru 24: CHAR ve VARCHAR veri tipleri arasındaki fark nedir?"},"a":{"en":"CHAR is fixed-length, while VARCHAR is variable-length. If you define a CHAR(10) and store a 3-character string, it pads the remaining 7 spaces with blanks, consuming 10 bytes. A VARCHAR(10) will only consume 3 bytes of data, making it more space-efficient for fields with varying lengths.","tr":"CHAR sabit uzunlukta (fixed-length), VARCHAR ise değişken uzunlukta (variable-length) metin depolar. CHAR(10) tanımlanmış bir sütuna 3 harfli bir kelime yazılırsa boşluklarla 10 karaktere tamamlanır ve diskte hep 10 karakter yer kaplar. VARCHAR(10) ise girilen metin boyutu kadar (örn: 3 karakter + uzunluk belirten 1 byte) yer kaplar."},"code":{"en":"-- Fixed length (ideal for ISO country codes, hashes):\ncountry_code CHAR(2) -- always 2 chars\n\n-- Variable length (ideal for names, emails):\nemail VARCHAR(255) -- stores actual length","tr":"-- Sabit uzunluk (ISO ülke kodları, hash değerleri için ideal):\ncountry_code CHAR(2) -- her zaman 2 karakter\n\n-- Değişken uzunluk (adlar, e-postalar için ideal):\nemail VARCHAR(255) -- gerçek uzunluğu saklar"}},
              {"level":"intermediate","q":{"en":"Q25: How do you add a comment in SQL?","tr":"Soru 25: SQL'de yorum satırı (comment) nasıl eklenir?"},"a":{"en":"In SQL, single-line comments are created using double dashes (`--`). Multi-line comments are wrapped inside block markers (`/* comment here */`). Using comments is highly recommended in automated test fixtures to explain complex SQL data setup queries.","tr":"SQL'de tek satırlık yorumlar için çift tire (`--`) kullanılır. Çok satırlı yorumlar için ise C-tarzı (`/* yorum */`) bloklar kullanılır. Test otomasyonunda, karmaşık veritabanı doğrulama sorgularını dökümante etmek için yorum satırları eklemek önemlidir."},"code":{"en":"-- This is a single line comment\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;","tr":"-- Bu tek satırlık bir yorumdur\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;"}},
              {"level":"intermediate","q":{"en":"Q26: What is a Self Join and when would you use it in QA testing?","tr":"Soru 26: Self-Join nedir ve QA otomasyon testlerinde ne amaçla kullanılabilir?"},"a":{"en":"A Self Join is a regular join, but the table is joined with itself. It is used to query hierarchical data stored in a single table, such as an employee-manager hierarchy or category-subcategory levels. In QA, you can use it to verify data integrity, like checking if deleting a parent category correctly flags its child categories.","tr":"Self-join, bir tablonun kendisiyle JOIN yapılmasıdır. Tablonun içindeki satırlar arasında hiyerarşik veya ilişkisel bir bağ olduğunda kullanılır (Örn: çalışan-yönetici tablosu veya alt-üst kategori tablosu). QA testlerinde, bir kategori silindiğinde alt kategorilerin de doğru şekilde güncellenip güncellenmediğini doğrulamak için self-join sorgusu atılabilir."},"code":{"en":"-- Find employees and their managers from the same table:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;","tr":"-- Aynı tablodan çalışanları ve yöneticilerini bul:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;"}},
              {"level":"intermediate","q":{"en":"Q27: How do you write a query to find and delete duplicate rows in a table?","tr":"Soru 27: Bir tablodaki tekrar eden (duplicate) satırları nasıl bulursunuz ve bunları nasıl silersiniz?"},"a":{"en":"To find duplicates, use `GROUP BY` on the target columns and filter with `HAVING COUNT(*) > 1`. To delete them, you can perform a DELETE query that selects the minimum ID for each duplicate group and removes rows with IDs greater than the minimum.","tr":"Tekrarlanan satırları bulmak için `GROUP BY` ve `HAVING COUNT(*) > 1` kullanılır. Silmek için ise, tablonun benzersiz ID sütununu (primary key) kullanarak, kendisiyle karşılaştırıp daha büyük ID'ye sahip olan kopyaları silebiliriz."},"code":{"en":"-- 1. Find duplicates:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. Delete duplicates keeping only the lowest ID (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);","tr":"-- 1. Tekrarlanan kayıtları bul:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. En düşük ID'yi koruyarak tekrarlananları sil (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);"}},
              {"level":"intermediate","q":{"en":"Q28: Explain the difference between CROSS JOIN and INNER JOIN.","tr":"Soru 28: CROSS JOIN ile INNER JOIN arasındaki fark nedir?"},"a":{"en":"CROSS JOIN returns the cartesian product of two tables, matching every row of the first table with every row of the second table without any condition. INNER JOIN requires a join condition (`ON`) and only matches rows satisfying that condition. CROSS JOIN is useful in QA for generating test matrices.","tr":"CROSS JOIN, iki tablonun kartezyen çarpımını (cartesian product) üretir; yani sol tablodaki her satırı sağ tablodaki her satırla eşleştirir (koşulsuz). INNER JOIN ise sadece iki tablo arasında belirtilen `ON` koşulunu sağlayan satırları birleştirir. CROSS JOIN genellikle test verisi kombinasyonları (matrix testing) oluşturmak için yararlıdır."},"code":{"en":"-- CROSS JOIN (Combines all sizes with all colors):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Matches orders to existing users):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;","tr":"-- CROSS JOIN (Tüm bedenleri tüm renklerle birleştirir):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Siparişleri mevcut kullanıcılarla eşleştirir):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;"}},
              {"level":"intermediate","q":{"en":"Q29: What is a Composite Primary Key?","tr":"Soru 29: Bileşik Birincil Anahtar (Composite Primary Key) nedir?"},"a":{"en":"A Composite Primary Key is a primary key that consists of two or more columns in a table. Individually, the columns may contain duplicate values, but their combination must be unique. It is commonly used in junction tables for many-to-many relationships to prevent duplicate links.","tr":"Birden fazla sütunun bir araya gelerek tablodaki bir satırı benzersiz şekilde tanımlamasıdır. Tek başına hiçbir sütun benzersiz değildir ancak birleşimleri benzersizdir. Özellikle çoktan-çoğa (many-to-many) ilişki tablolarında (Örn: user_id ve badge_id birleşimi) sıklıkla kullanılır."},"code":{"en":"-- Example of composite primary key (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- combination must be unique\n);","tr":"-- Birleşik birincil anahtar örneği (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- birleşim benzersiz olmalıdır\n);"}},
              {"level":"intermediate","q":{"en":"Q30: How does a Foreign Key constraint protect referential integrity?","tr":"Soru 30: Foreign Key (Dış Anahtar) kısıtlaması ilişkisel bütünlüğü nasıl korur?"},"a":{"en":"A Foreign Key constraint ensures that values in a child table correspond to valid primary keys in a parent table. It prevents orphaned records by blocking inserts of invalid IDs in the child table, and blocking deletions of parent records that still have child dependencies (unless cascaded).","tr":"Foreign Key, bir tablodaki değerlerin başka bir tablonun Primary Key'i ile eşleşmesini zorunlu kılar. Bu sayede veritabanı motoru: 1) Parent tabloda olmayan bir id ile child tabloya kayıt eklenmesini engeller. 2) Child tabloda kaydı olan bir parent satırının silinmesini (veya güncellenmesini) engeller (`ON DELETE RESTRICT` varsayılan ise)."},"code":{"en":"-- Prevent deleting user if they have active orders:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;","tr":"-- Aktif siparişi olan kullanıcının silinmesini engelle:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;"}},
              {"level":"intermediate","q":{"en":"Q31: Does the BETWEEN operator include the boundary values?","tr":"Soru 31: BETWEEN operatörü alt ve üst limit sınırlarını dahil eder mi?"},"a":{"en":"Yes, the `BETWEEN` operator is inclusive of both boundary values. For example, `WHERE age BETWEEN 18 AND 25` is equivalent to `WHERE age >= 18 AND age <= 25`. This is important for QA engineers to keep in mind when designing Boundary Value Analysis tests.","tr":"Evet, `BETWEEN` operatörü arama yaparken alt ve üst sınır değerlerini de sonuca dahil eder (inclusive). Yani `WHERE age BETWEEN 18 AND 25` koşulu, yaşı 18 ve 25 olan kişileri de getirir. Bu durum, sınır değer testlerinde (boundary value analysis) QA mühendislerinin dikkat etmesi gereken bir kuraldır."},"code":{"en":"-- Inclusive range:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Equivalent to:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;","tr":"-- Dahil aralık:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Şuna eşdeğerdir:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;"}},
              {"level":"intermediate","q":{"en":"Q32: How do you handle case-sensitive text comparisons in SQL?","tr":"Soru 32: SQL'de büyük/küçük harf duyarlı (case-sensitive) metin karşılaştırması nasıl yapılır?"},"a":{"en":"Case sensitivity depends on the database engine and the collation configuration of the tables/columns. PostgreSQL is case-sensitive by default, whereas MySQL and SQLite are case-insensitive. To force case-sensitivity in MySQL, use the `BINARY` keyword. In Postgres, use `ILIKE` for case-insensitive searches.","tr":"Büyük/küçük harf duyarlılığı veritabanı motoruna ve tablonun karakter setine (collation) bağlıdır. PostgreSQL varsayılan olarak case-sensitive'dir. MySQL ve SQLite varsayılan olarak case-insensitive'dir. Case-sensitive karşılaştırma yapmak için MySQL'de `BINARY` keyword'ü, PostgreSQL'de ise case-insensitive için `ILIKE` kullanılır."},"code":{"en":"-- MySQL Case-sensitive search:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' won't match\n\n-- PostgreSQL Case-insensitive search:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- matches 'Alice', 'ALICE'","tr":"-- MySQL Büyük/küçük harf duyarlı arama:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' eşleşmeyecektir\n\n-- PostgreSQL Büyük/küçük harf duyarsız arama:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- 'Alice', 'ALICE' ile eşleşir"}},
              {"level":"intermediate","q":{"en":"Q33: What is a Stored Procedure and when is it used?","tr":"Soru 33: Saklı Yordam (Stored Procedure) nedir ve test otomasyonunda ne zaman kullanılır?"},"a":{"en":"A Stored Procedure is a prepared SQL code block that you can save in the database, allowing it to be reused with parameters. In test automation, they are highly useful to quickly seed complex datasets or run database resets in a single database call, reducing network overhead.","tr":"Stored Procedure, veritabanı sunucusunda derlenip saklanan ve parametre kabul eden SQL kod bloklarıdır. Ağ trafiğini azaltır ve performans sağlar. QA test otomasyonunda, testler öncesinde karmaşık test verisi setleri oluşturmak veya test sonrası veritabanı sıfırlama işlemlerini tek bir komutla tetiklemek için kullanılabilir."},"code":{"en":"-- Call stored procedure from test automation:\nCALL SeedMockTestData(100, 'staging');","tr":"-- Test otomasyonundan stored procedure çağır:\nCALL SeedMockTestData(100, 'staging');"}},
              {"level":"intermediate","q":{"en":"Q34: What are wildcards in SQL and how do they work with LIKE?","tr":"Soru 34: SQL'de LIKE ile kullanılan wildcards (joker karakterler) nelerdir?"},"a":{"en":"The two most common wildcards used with the `LIKE` operator are: 1) `%`: Represents zero, one, or multiple characters (e.g. `A%` matches any string starting with A). 2) `_`: Represents a single character (e.g. `t_st` matches test, tast, tost).","tr":"SQL LIKE ile en sık kullanılan iki joker karakter şunlardır: 1) `%`: Sıfır, bir veya daha fazla karakteri temsil eder (Örn: `A%` -> A ile başlayanlar). 2) `_`: Tam olarak tek bir karakteri temsil eder (Örn: `T_st` -> Test, Tast vb.)."},"code":{"en":"-- Matches: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Matches: 'Test', 'Tast', 'Tost' (exactly 4 characters):\nSELECT * FROM tests WHERE title LIKE 'T_st';","tr":"-- Şunlarla eşleşir: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Şunlarla eşleşir: 'Test', 'Tast', 'Tost' (tam olarak 4 karakter):\nSELECT * FROM tests WHERE title LIKE 'T_st';"}},
              {"level":"intermediate","q":{"en":"Q35: How can you count the number of NULL values in a column?","tr":"Soru 35: Bir sütundaki NULL değerlerin sayısını nasıl bulursunuz?"},"a":{"en":"Standard `COUNT(column_name)` ignores NULL values. To count NULLs, you must either count all records matching a `WHERE column IS NULL` filter, or use a conditional aggregation like `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)`.","tr":"`COUNT(column_name)` fonksiyonu NULL değerleri saymaz, sadece NULL olmayanları sayar. Bu yüzden NULL değerleri saymak için `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)` veya `COUNT(*)` ile filtreyi birleştirip `WHERE column IS NULL` koşulunu kullanmalıyız."},"code":{"en":"-- Option 1: Simple filter\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Option 2: Conditional aggregation (useful when counting other metrics too):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;","tr":"-- Seçenek 1: Basit filtre\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Seçenek 2: Koşullu toplama (diğer metrikleri de sayarken kullanışlıdır):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;"}},
              // ── ADVANCED ────────────────────────────────────────
              {"level":"advanced","q":{"en":"Q36: What is the difference between COALESCE and NULLIF?","tr":"Soru 36: COALESCE ve NULLIF fonksiyonları arasındaki fark nedir?"},"a":{"en":"`COALESCE(val1, val2, ...)` returns the first non-NULL value in the list (used for default fallbacks). `NULLIF(val1, val2)` returns NULL if the two arguments are equal, otherwise it returns the first value (used to prevent division-by-zero errors).","tr":"`COALESCE(val1, val2, ...)` verilen parametreler arasından NULL olmayan ilk değeri döndürür (varsayılan değer sağlamak için kullanılır). `NULLIF(val1, val2)` ise iki değer birbirine eşitse NULL, eşit değilse ilk değeri döndürür (bölme işlemlerinde sıfıra bölme hatasını önlemek için kullanılır)."},"code":{"en":"-- COALESCE: Fallback to 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Prevent division by zero (turns 0 duration to NULL, rendering avg division safe)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;","tr":"-- COALESCE: Son çare olarak 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Sıfıra bölmeyi engelle (0 süreyi NULL yapar, böylece avg bölmesi güvenli olur)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;"}},
              {"level":"advanced","q":{"en":"Q37: Can you use a SELECT alias in a GROUP BY clause? Why or why not?","tr":"Soru 37: SELECT alias'larını GROUP BY içinde kullanabilir miyiz? Neden?"},"a":{"en":"In standard SQL, no. Because the GROUP BY clause is evaluated BEFORE the SELECT clause, the alias does not exist yet. However, engines like MySQL, PostgreSQL, and SQLite allow it as an extension. For ANSI SQL compliance, always use the raw column names in GROUP BY.","tr":"Standart SQL'e göre hayır. Çünkü GROUP BY mantıksal çalışma sırasında SELECT'ten ÖNCE çalıştırılır. Ancak PostgreSQL, MySQL ve SQLite gibi birçok modern veritabanı motoru buna esneklik sağlayarak alias kullanımına izin verir. Yine de standart SQL uyumluluğu için ham sütun adlarını veya ifadeleri kullanmak en güvenli yoldur."},"code":{"en":"-- Might fail in strict ANSI SQL databases:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standard compliant way:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);","tr":"-- Katı ANSI SQL veritabanlarında başarısız olabilir:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standartlara uygun yol:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);"}},
              {"level":"advanced","q":{"en":"Q38: What is a Non-Repeatable Read and under what conditions does it occur?","tr":"Soru 38: Tekrarlanamayan Okuma (Non-Repeatable Read) nedir ve hangi koşulda ortaya çıkar?"},"a":{"en":"A Non-Repeatable Read happens when a transaction reads the same row twice but gets different data because another committed transaction modified that row in between. This occurs under the 'Read Committed' isolation level and is prevented under 'Repeatable Read' using snapshots.","tr":"Aynı transaction (işlem) içinde aynı sorgu iki kez çalıştırıldığında, aradaki sürede başka bir transaction'ın veriyi güncelleyip COMMIT etmesi nedeniyle ikinci sorgunun farklı sonuç dönmesi durumudur. 'Read Committed' izolasyon seviyesinde bu durum yaşanabilir, 'Repeatable Read' seviyesinde ise snapshot kullanıldığı için engellenir."},"code":{"en":"-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- Returns $1000\n\n-- Transaction B (concurrent):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- Returns $800! (Non-repeatable read)","tr":"-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- $1000 döndürür\n\n-- Transaction B (eşzamanlı):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- $800 döndürür! (Non-repeatable read)"}},
              {"level":"advanced","q":{"en":"Q39: What does EXPLAIN do and how do you read its output?","tr":"Soru 39: EXPLAIN komutu ne işe yarar ve bir QA otomasyon mühendisi için neden önemlidir?"},"a":{"en":"EXPLAIN displays the execution plan generated by the database query optimizer. It shows index lookups, join orders, and estimated rows scanned. For QA automation, it is the primary debugging tool to optimize slow tests caused by sub-optimal DB queries triggering full-table scans.","tr":"EXPLAIN, veritabanı motorunun bir sorguyu çalıştırırken izleyeceği yolu (Execution Plan) gösterir. Hangi indexlerin kullanılacağını, kaç satırın taranacağını (Scan) ve tabloların birleştirilme sırasını raporlar. QA otomasyon mühendisleri için, yavaş koşan testlerdeki veritabanı sorgularının performans dar boğazlarını (örn: Full Table Scan) bulmak için en önemli araçtır."},"code":{"en":"-- Run EXPLAIN:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- Look for \"scan type\" (e.g. 'ALL' is slow table scan, 'const' or 'ref' is fast index scan)","tr":"-- EXPLAIN çalıştır:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- \"Tarama türü\"ne bakın (ör. 'ALL' yavaş tablo taramasıdır, 'const' veya 'ref' hızlı indeks taramasıdır)"}},
              {"level":"advanced","q":{"en":"Q40: Explain the difference between Read Committed and Repeatable Read isolation levels.","tr":"Soru 40: Read Committed ile Repeatable Read izolasyon seviyeleri arasındaki temel fark nedir?"},"a":{"en":"Read Committed takes a new data snapshot for each query statement inside the transaction, allowing concurrent updates to be read if committed. Repeatable Read locks the snapshot at the transaction start, ensuring the exact same values are read throughout the entire transaction session.","tr":"Read Committed seviyesinde, bir sorgu sadece sorgunun başladığı anda commit edilmiş verileri okur; işlem içindeki her SELECT yeni bir snapshot alır. Repeatable Read seviyesinde ise, işlem içindeki ilk SELECT sorgusunun başladığı andaki snapshot korunur; işlem sonlanana kadar aynı satırlar hep aynı değeri döner, başka işlemler commit etse bile değişiklik görülmez."},"code":{"en":"-- Read Committed: Sees committed changes mid-transaction.\n-- Repeatable Read: Read values are guaranteed not to change until rollback/commit.","tr":"-- Read Committed: Transaction ortasında commited edilmiş değişiklikleri görür.\n-- Repeatable Read: Okunan değerlerin rollback/commit olana kadar değişmeyeceği garanti edilir."}},
              {"level":"advanced","q":{"en":"Q41: What is a Phantom Read and how does Serializable isolation prevent it?","tr":"Soru 41: Phantom Read (Hayalet Okuma) nedir ve Serializable seviyesi bunu nasıl önler?"},"a":{"en":"A Phantom Read occurs when a transaction queries a range of rows, and another transaction inserts a NEW row into that range and commits. Re-running the query reveals a 'phantom' row. Serializable isolation prevents this by placing Range Locks on the index, blocking inserts until the transaction finishes.","tr":"Phantom Read, bir transaction içinde bir filtreye uyan satırlar sorgulanırken, araya giren başka bir transaction'ın YENİ satır ekleyip commit etmesi sonucu, ilk transaction aynı sorguyu tekrar attığında daha önce olmayan yeni 'hayalet' satırlarla karşılaşması durumudur. Serializable seviyesi, aralık kilitleri (range locks) kullanarak bu aralığa yeni satır eklenmesini tamamen bloke ederek bunu önler."},"code":{"en":"-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 3 rows\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 4 rows! (Phantom read)","tr":"-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 3 satır döndürür\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 4 satır döndürür! (Phantom read)"}},
              {"level":"advanced","q":{"en":"Q42: What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?","tr":"Soru 42: ROW_NUMBER(), RANK() ve DENSE_RANK() window fonksiyonları arasındaki fark nedir?"},"a":{"en":"All three assign ranks. Difference lies in handling tied values: 1) `ROW_NUMBER()` ignores ties and assigns sequential numbers (1, 2, 3). 2) `RANK()` gives tied rows the same rank, leaving gaps afterwards (1, 1, 3). 3) `DENSE_RANK()` gives tied rows the same rank but leaves no gaps (1, 1, 2).","tr":"Üçü de satırları sıralamak için numara verir. Fark eşit değerlerde (ties) ortaya çıkar: 1) `ROW_NUMBER()` eşitliğe bakmaksızın ardışık benzersiz numaralar verir (1, 2, 3). 2) `RANK()` eşit değerlere aynı numarayı verir ama sonrasında sıra atlar (1, 1, 3). 3) `DENSE_RANK()` eşit değerlere aynı numarayı verir ama sıra atlamaz (1, 1, 2)."},"code":{"en":"-- Example output for tied durations (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2","tr":"-- Eşit süreler için örnek çıktı (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2"}},
              {"level":"advanced","q":{"en":"Q43: What is a Recursive CTE and when would you use it?","tr":"Soru 43: Özyinelemeli CTE (Recursive CTE) nedir ve ne zaman kullanılır?"},"a":{"en":"A Recursive CTE is a subquery that references its own name, executing iteratively until a termination condition is met. It is typically used to traverse hierarchical or tree-structured database records like manager-employee org charts, category folders, or dependency trees.","tr":"Kendi kendini referans alan ve bir durdurma koşuluna kadar döngü şeklinde çalışan CTE türüdür. Genellikle hiyerarşik veri yapılarını (Örn: organizasyon şemaları, kategori ağaçları, parça listeleri) veya grafik yollarını sorgulamak için kullanılır. QA testlerinde ağaç yapısındaki verilerin doğruluğunu kontrol etmek için idealdir."},"code":{"en":"-- Traverse manager-employee tree recursively:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;","tr":"-- Yönetici-çalışan ağacını özyinelemeli (recursive) olarak dolaş:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor (Başlangıç noktası)\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;"}},
              {"level":"advanced","q":{"en":"Q44: What is a database deadlock and how does it happen?","tr":"Soru 44: Veritabanında Deadlock (Kilitlenme) nedir ve otomasyon testlerinizde bu durumla karşılaşırsanız ne yaparsınız?"},"a":{"en":"A deadlock occurs when two or more transactions hold locks on resources the others need, creating a circular dependency where neither can proceed. The DB engine aborts one transaction to break the loop. In test runs: 1) Isolate test data. 2) Always lock/update resources in the exact same order. 3) Implement automatic database transaction retries.","tr":"İki veya daha fazla transaction'ın, birbirlerinin kilitlediği (lock) kaynakları beklemesi ve bu nedenle sonsuz döngüye girip kilitlenmesi durumudur. Veritabanı motoru bunu algılar ve birini feda ederek hata fırlatır (rollback). Testlerde paralelleştirmeden kaynaklı deadlock oluşursa: 1) Test verilerini izole edin (farklı user'lar kullanın). 2) Güncelleme sorgularını her zaman aynı sırayla çalıştırın. 3) Otomatik retry (tekrar deneme) mekanizmaları kurun."},"code":{"en":"-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts","tr":"-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts"}},
              {"level":"advanced","q":{"en":"Q45: Explain B-Tree vs Hash index.","tr":"Soru 45: B-Tree ve Hash Index arasındaki temel fark nedir? Hangisi ne zaman tercih edilmelidir?"},"a":{"en":"B-Tree indexes store data in a balanced tree structure, keeping elements sorted. They support equality (`=`) and range queries (`>`, `<`, `BETWEEN`). Hash indexes use hash tables and only support exact equality checks (`=`) with O(1) complexity, rendering them useless for range filters.","tr":"B-Tree indexleri verileri dengeli bir ağaç yapısında sıralı tutar; `=`, `<` , `>`, `BETWEEN` ve range (aralık) sorgularını destekler. Hash indexleri ise bir hash tablosu kullanır ve SADECE `=` (birebir eşitlik) sorgularını çok hızlı yanıtlar; büyüktür/küçüktür veya aralık sorgularını desteklemez. Çoğu ilişkisel DB varsayılan olarak B-Tree kullanır."},"code":{"en":"-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;","tr":"-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;"}},
              {"level":"advanced","q":{"en":"Q46: What is the difference between Clustered and Non-Clustered indexes?","tr":"Soru 46: Kümeli (Clustered) ve Kümesiz (Non-Clustered) index arasındaki fark nedir?"},"a":{"en":"A Clustered index dictates the physical sorting order of rows on disk (only one allowed per table, usually the Primary Key). A Non-Clustered index is a separate structure containing copy columns and pointers linking back to the physical rows (multiple allowed per table, like a book index).","tr":"Clustered index, tablonun fiziksel satırlarının diskteki sıralamasını belirler (kitabın kendisi gibidir; her tabloda sadece 1 tane olabilir, genelde Primary Key'dir). Non-clustered index ise veriden ayrı bir yapıdır ve satırların fiziksel adreslerine işaret eden işaretçiler (pointers) tutar (kitabın arkasındaki dizin gibidir; tablo başına çok sayıda oluşturulabilir)."},"code":{"en":"-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);","tr":"-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);"}},
              {"level":"advanced","q":{"en":"Q47: What is a database trigger and what are its risks in test automation?","tr":"Soru 47: Veritabanı Tetikleyicileri (Triggers) nedir? Test otomasyonu için ne gibi riskler barındırır?"},"a":{"en":"A database trigger is a stored program that fires automatically in response to DML operations on a table. Risks for QA: 1) They create hidden side-effects not documented in the test code, leading to flaky runs. 2) Finding failures is harder as trigger stack traces might not bubbled up to the test logger. 3) They can interfere with test cleanup scripts.","tr":"Trigger, bir tabloda INSERT, UPDATE veya DELETE yapıldığında otomatik çalışan veritabanı kodlarıdır. QA otomasyonu için riskleri: 1) 'Gizli' yan etkilere yol açarlar; otomasyon kodunda hata olmasa da trigger arka planda hata fırlatıp testi çökertebilir. 2) Hata analizi zordur, loglarda trigger adımları görünmeyebilir. 3) Test verisi temizleme süreçlerini bozabilirler. Mümkünse test ortamlarında trigger'ları simüle etmek yerine kapatmak veya izole etmek tercih edilir."},"code":{"en":"-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;","tr":"-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;"}},
              {"level":"advanced","q":{"en":"Q48: How do you optimize a query that is performing a Full Table Scan?","tr":"Soru 48: EXPLAIN planında 'Full Table Scan' (Tüm Tablo Taraması) gördüğünüz yavaş bir sorguyu nasıl optimize edersiniz?"},"a":{"en":"1) Add an index on the column used in the WHERE or JOIN conditions. 2) Re-run EXPLAIN to verify if the engine uses the index. 3) Avoid wrapping index columns in functions (e.g. use `WHERE date >= '2024-01-01'` instead of `WHERE YEAR(date) = 2024`) as functions disable indexing. 4) Note that if the table is tiny, the engine might bypass the index deliberately.","tr":"1) WHERE ve JOIN koşulundaki sütuna index ekleyin. 2) İndex'in gerçekten kullanılıp kullanılmadığını doğrulamak için EXPLAIN planını tekrar kontrol edin. 3) Sütunun bir fonksiyon içine sarılmadığından emin olun (Örn: `WHERE YEAR(date) = 2024` yerine `WHERE date >= '2024-01-01'`). Fonksiyonlar index kullanımını engeller. 4) Tablo çok küçükse veritabanı motorunun index kullanmayı bilerek reddetmiş olabileceğini unutmayın."},"code":{"en":"-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';","tr":"-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';"}},
              {"level":"advanced","q":{"en":"Q49: How do you handle schema migrations (e.g. Liquibase or Flyway) in a QA automation pipeline?","tr":"Soru 49: QA otomasyon pipeline'larında veritabanı şema göçlerini (schema migrations - Flyway/Liquibase) nasıl yönetmeliyiz?"},"a":{"en":"In CI/CD pipelines, schema migrations must run before automated tests execute. Steps: 1) Spin up a clean test DB container (e.g. using Testcontainers or Docker Compose). 2) Run Flyway/Liquibase update commands against the database. 3) Verify successful migration, then kick off the automated test execution suite. This ensures tests align with active schema code.","tr":"QA pipeline'ında testler koşmadan önce, veritabanı şemasını en güncel sürüme taşımak (migration) kritik önem taşır. Adımlar: 1) Test veritabanı konteynerini (Docker) ayağa kaldır. 2) Flyway/Liquibase komutunu çalıştırıp şemayı test DB'ye uygula. 3) Şema başarılı göç ettikten sonra test scriptlerini koştur. Bu sayede testler her zaman en güncel DB yapısıyla çalışır."},"code":{"en":"# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update","tr":"# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update"}},
              {"level":"advanced","q":{"en":"Q50: What is the N+1 query problem and how do you detect it in QA test automation?","tr":"Soru 50: N+1 sorgu problemi nedir ve QA test otomasyonunda nasıl tespit edilir?"},"a":{"en":"The N+1 problem: 1 query fetches N parent records, then N more queries fetch each child separately (N+1 DB round-trips). Example: 100 orders + 100 item queries instead of 1 JOIN. Detect in QA: 1) Enable SQL query logging in test env. 2) Assert page load triggers fewer queries than a threshold. 3) Use Hibernate stats or p6spy to count queries per test. Java analogy: calling a DB method inside a for-each loop.","tr":"N+1 problemi: 1 sorgu N parent kaydı getirir, ardından her biri için N sorgu daha koşar (N+1 DB turu). Örnek: 100 sipariş + 100 ürün sorgusu yerine 1 JOIN yeterli. QA tespit: 1) Test ortamında SQL loglama etkinleştir. 2) Sayfa yüklemesinin sorgu limitini aşmadığını assert et. 3) Hibernate istatistikleri veya p6spy ile test başına sorgu sayısını say. Java analogu: for-each döngüsü içinde DB metodu çağırmak."},"code":{"en":"-- N+1 (bad): 1 parent query + N child queries in loop\nSELECT * FROM orders;  -- then loop: SELECT * FROM items WHERE order_id = ?\n\n-- Fix: single JOIN (1 query total)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;","tr":"-- N+1 (kötü): 1 parent sorgusu + döngüde N alt sorgu\nSELECT * FROM orders;  -- sonra: SELECT * FROM items WHERE order_id = ?\n\n-- Düzeltme: tek JOIN (toplam 1 sorgu)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;"}},
        ],
      },
      sqlInterviewFilm,
      sqlInterviewSteps,
      sqlInterviewPractice,
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
        "type": "css-animation",
        "kind": "sql-select",
        "label": { "tr": "SQL Sorgu Yürütme Sırası", "en": "SQL Query Execution Order" }
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
      sqlIntroWhyFilm,
      sqlIntroPractice,
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
        "type": "step-animation",
        "title": { "tr": "sqlite3 mytest.db Çalıştırınca Perde Arkasında Ne Olur?", "en": "What Actually Happens When You Run sqlite3 mytest.db?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "Komut çalıştırıldığı anda dosya YOKSA…", "en": "The moment the command runs, if the file DOESN'T exist…" }, "detail": { "tr": "sqlite3 mytest.db komutu çalıştırıldığı anda, eğer mytest.db dosyası diskte yoksa YENİ boş bir dosya oluşturulur — ayrı bir \"create database\" komutuna gerek yoktur.", "en": "The moment sqlite3 mytest.db runs, if mytest.db doesn't exist on disk yet, a brand-new empty file is created — there's no separate \"create database\" command." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "Nokta (.) ile başlayan komutlar…", "en": "Commands starting with a dot (.)…" }, "detail": { "tr": "Açılan shell'de nokta (.) ile başlayan komutlar (.tables, .schema, .headers) SQLite'ın KENDİ komutlarıdır — SQL standardının parçası değildir, MySQL/PostgreSQL'de ÇALIŞMAZ.", "en": "Commands starting with a dot (.tables, .schema, .headers) are SQLite's OWN commands — they are not part of the SQL standard and will NOT work in MySQL/PostgreSQL." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": ".headers on ve .mode column…", "en": ".headers on and .mode column…" }, "detail": { "tr": ".headers on ve .mode column ayarları SADECE terminal görünümünü değiştirir — veritabanındaki veriyi hiç etkilemez, sonuçları okunur hale getirir.", "en": ".headers on and .mode column only change how results are DISPLAYED in the terminal — they never touch the actual data, they just make output readable." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "SELECT sqlite_version(); ise noktasız…", "en": "SELECT sqlite_version(), without a dot…" }, "detail": { "tr": "SELECT sqlite_version(); ise noktasız, standart bir SQL sorgusudur — noktalı virgülle biter ve (farklı fonksiyon adıyla) tüm SQL motorlarında bir karşılığı vardır.", "en": "SELECT sqlite_version(), with no leading dot, is a standard SQL query — it ends with a semicolon and has an equivalent (under a different function name) in every SQL engine." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": ".quit shell'den çıkar ama…", "en": ".quit exits the shell, but…" }, "detail": { "tr": ".quit komutu shell'den çıkar ama mytest.db dosyası DİSKTE kalır — bir sonraki sqlite3 mytest.db çağrısında aynı veriler kaldığı yerden erişilir.", "en": ".quit exits the shell, but mytest.db stays on DISK — the next time you run sqlite3 mytest.db, the same data is right where you left it." } }
        ]
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
        "type": "step-animation",
        "title": { "tr": "mysql -u root -p Komutu Neyi Doğrular?", "en": "What Does mysql -u root -p Actually Verify?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "Komut çalıştırılınca terminal bir şifre İSTER…", "en": "Running the command makes the terminal PROMPT for a password…" }, "detail": { "tr": "mysql -u root -p çalıştırılınca terminal bir şifre İSTER — şifre komut satırına açık yazılmaz, bu yüzden bash geçmişinde (history) asla görünmez.", "en": "Running mysql -u root -p makes the terminal PROMPT for a password — the password is never typed on the command line itself, so it never shows up in bash history." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "Doğru şifreyle sunucuya bir TCP bağlantısı açılır…", "en": "A correct password opens a TCP connection to the server…" }, "detail": { "tr": "Doğru şifre girilirse MySQL sunucusuna bir TCP bağlantısı açılır (varsayılan port 3306) — SQLite'ın aksine burada ayrı bir sunucu PROCESS'i zaten ÇALIŞIYOR olmalıdır.", "en": "With the correct password, a TCP connection opens to the MySQL server (default port 3306) — unlike SQLite, a separate server PROCESS must already be RUNNING." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "mysql> prompt'u görününce…", "en": "Once the mysql> prompt appears…" }, "detail": { "tr": "Bağlantı başarılı olursa mysql> prompt'u görünür — bu, komutların artık sunucuya GÖNDERİLDİĞİ anlamına gelir, yerel bir dosyaya değil.", "en": "Once the connection succeeds, the mysql> prompt appears — this means commands are now being SENT to the server, not to a local file." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "SELECT VERSION(); çalıştırıldığında…", "en": "When SELECT VERSION(); runs…" }, "detail": { "tr": "SELECT VERSION(); çalıştırıldığında sorgu ağ üzerinden sunucuya gider, sunucu sonucu hesaplar ve geri gönderir — bu round-trip, SQLite'ın aynı process içinde çalışmasından farklı bir gecikme kaynağıdır.", "en": "When SELECT VERSION(); runs, the query travels over the network to the server, gets computed, and comes back — this round-trip is a latency source SQLite doesn't have, since SQLite runs in the same process." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Şifre yanlışsa \"Access denied\" hatası…", "en": "A wrong password produces \"Access denied\"…" }, "detail": { "tr": "Şifre yanlışsa \"Access denied for user\" hatası alınır — bu, QA'nın CI/CD ortamında en sık karşılaştığı \"DB bağlantısı reddedildi\" sorunlarından biridir, genelde yanlış env variable/secret'tan kaynaklanır.", "en": "A wrong password produces \"Access denied for user\" — this is one of the most common \"DB connection refused\" issues QA engineers hit in CI/CD, usually caused by a wrong env variable or secret." } }
        ]
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
      sqlInstallationFilm,
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
      sqlCreateTableFilm,
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
      sqlInsertIntoFilm,
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
      sqlSelectSortFilm,
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
      sqlUpdateDeleteFilm,
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
      sqlNullValuesFilm,
      {
        "type": "quiz",
        "question": {
          "tr": "WHERE discount = NULL filtresi uyguladığında sorgu 0 satır döndürüyor. Neden?",
          "en": "A query returns 0 rows when you filter: WHERE discount = NULL. Why?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Tabloda NULL indirim yok",
              "en": "There are no NULL discounts in the table"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "= ile NULL karşılaştırması her zaman NULL (TRUE değil) döndürür, hiçbir satır eşleşmez",
              "en": "NULL comparisons with = always return NULL (not TRUE), so no rows match"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Tırnak gerekiyor: WHERE discount = \"NULL\"",
              "en": "You need quotes: WHERE discount = \"NULL\""
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "NULL otomatik olarak 0'a dönüştürülür",
              "en": "NULL is automatically converted to 0"
            }
          }
        ],
        "correct": "b",
        "explanation": {
          "tr": "= veya != ile yapılan NULL karşılaştırmaları FALSE gibi davranır. Bunun yerine IS NULL veya IS NOT NULL kullanın. Bu, en yaygın SQL hatalarından biridir.",
          "en": "Any comparison with NULL using = or != returns NULL, which is treated as FALSE. Use IS NULL or IS NOT NULL instead. This is one of the most common SQL bugs."
        },
        "retryQuestion": {
          "question": {
            "tr": "If you execute 'SELECT * FROM users WHERE age = NULL;', why might you get no results even if some users have no age recorded?",
            "en": "If you execute 'SELECT * FROM users WHERE age = NULL;', why might you get no results even if some users have no age recorded?"
          },
          "options": [
            {
              "id": "a",
              "text": {
                "tr": "NULL değerleri WHERE ifadesinde sorgulanamaz",
                "en": "NULL values cannot be queried in a WHERE clause"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "= operatörüyle yapılan NULL karşılaştırmaları UNKNOWN ile sonuçlanır, bunun yerine IS NULL operatörü kullanılmalıdır",
                "en": "Comparisons with NULL using = result in UNKNOWN, requiring the IS NULL operator instead"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Sözdizimi 'WHERE age IS 0' şeklinde olmalıdır",
                "en": "The syntax requires 'WHERE age IS 0'"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "NULL değerleri SQL sonuçlarında varsayılan olarak gizlenir",
                "en": "NULL values are hidden by default in SQL results"
              }
            }
          ],
          "correct": "b",
          "explanation": {
            "tr": "SQL'de NULL bilinmeyen bir değeri temsil eder. NULL değerine karşı standart eşittir operatörü (=) kullanmak TRUE değil UNKNOWN ile sonuçlanır. Boş alanları filtrelemek için 'IS NULL' veya 'IS NOT NULL' ifadelerini kullanmalısınız.",
            "en": "In SQL, NULL represents an unknown value. Using standard equality operators (=) against NULL results in UNKNOWN, not TRUE. To filter for empty fields, you must use the 'IS NULL' or 'IS NOT NULL' predicates."
          }
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
        "type": "simulation",
        "scenario": "sql-interactive-terminal",
        "icon": "💻",
        "title": {
          "tr": "Etkileşimli SQL Terminali",
          "en": "Interactive SQL Terminal"
        },
        "description": {
          "tr": "SELECT, INSERT, UPDATE, DELETE sorgularını çalıştır ve veri tabanı tablosunun anlık değişimini şemada izle.",
          "en": "Run SELECT, INSERT, UPDATE, DELETE queries and see the database table update live on the diagram."
        }
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
      sqlQueryOrderFilm,
      sqlQueryOrderPractice,
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
      sqlAggregateFilm,
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
      sqlGroupByHavingFilm,
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
        "content": { "tr": "Aşağıdaki 4 diyagram aynı veriyi kullanıyor. Eşleşen satırları vurgulamak için 'Eşleşmeleri Göster', sorgu sonucunu görmek için 'Sonucu Göster'e tıklayın. JOIN'leri gerçekten anlamanın en hızlı yolu bu.", "en": "The 4 diagrams below use the same data. Click 'Show Matches' to highlight matched rows, then 'Show Result' to see the query result. This is the fastest way to truly understand JOINs." }
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
        "explanation": "RIGHT JOIN, SAĞ tablodan (bugs) TÜM satırları döndürür. Bug #4'ün test uzmanı yok — hâlâ tester=NULL ile görünür. Nadiren kullanılır — çoğu geliştirici bunu tablolar yer değiştirilerek LEFT JOIN olarak yeniden yazar."
      },
      {
        "type": "comparison",
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
      sqlJoinsFilm,
      {
        "type": "quiz",
        "question": "Hangi JOIN türü, sağ tabloda eşleşmesi olmayan satırlar dahil sol tablodan TÜM satırları döndürür?",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT JOIN",
          "RIGHT JOIN"
        ],
        "correct": 2,
        "explanation": "LEFT JOIN (LEFT OUTER JOIN olarak da bilinir), sol tablodan her satırı döndürür. Sağ tabloda eşleşme yoksa NULL değerler görünür. \"Sıfır hataya sahip olanlar dahil tüm test uzmanları\" gibi durumlarda kullanılır.",
        "retryQuestion": {
          "question": "Sağ tablodaki tüm kayıtları, sol tabloda eşleşen veri olmasa bile getiren SQL işlemi hangisidir?",
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
          "explanation": "RIGHT JOIN (veya RIGHT OUTER JOIN) sağ tablodaki tüm satırların sonuç kümesine dahil edilmesini sağlar, sol tabloda eşleşen bir ilişki yoksa o sütunlar NULL olarak doldurulur."
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
      sqlSubqueriesFilm,
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
      sqlLikeBetweenInFilm,
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
      sqlWindowFunctionsFilm,
      {
        "type": "quiz",
        "question": {
          "tr": "Window fonksiyonlarini GROUP BY dan ayiran temel ozellik nedir?",
          "en": "What is the key difference between window functions and GROUP BY?"
        },
        "options": [
          {
            "id": "a",
            "text": {
              "tr": "Window fonksiyonları sadece tarih değerlerinde çalışır",
              "en": "Window functions only work on dates"
            }
          },
          {
            "id": "b",
            "text": {
              "tr": "Window fonksiyonları satırları gruplar halinde daraltır/indirger",
              "en": "Window functions collapse rows into groups"
            }
          },
          {
            "id": "c",
            "text": {
              "tr": "Window fonksiyonları satırları daraltmadan (indirgemeden) satırlar boyunca hesaplama yapar",
              "en": "Window functions calculate across rows without collapsing them"
            }
          },
          {
            "id": "d",
            "text": {
              "tr": "GROUP BY, window fonksiyonlarından daha hızlıdır",
              "en": "GROUP BY is faster than window functions"
            }
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
              "text": {
                "tr": "Window fonksiyonları tabloyu gruplara ayırarak satır sayısını azaltır",
                "en": "Window functions divide the table into groups to reduce the row count"
              }
            },
            {
              "id": "b",
              "text": {
                "tr": "Aggregate fonksiyonlar satır bazlı hesaplama yapamaz",
                "en": "Aggregate functions cannot perform row-level calculations"
              }
            },
            {
              "id": "c",
              "text": {
                "tr": "Window fonksiyonları her satırı korur ve sonuç satırı sayısını değiştirmez",
                "en": "Window functions preserve each row and do not change the number of output rows"
              }
            },
            {
              "id": "d",
              "text": {
                "tr": "Aggregate fonksiyonlar sadece sayısal (numerik) verilerde çalışır",
                "en": "Aggregate functions only work on numeric data"
              }
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
      sqlCtesFilm,
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
      sqlTransactionsFilm,
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
        "type": "step-animation",
        "title": { "tr": "CREATE INDEX Aslında Diskte Ne İnşa Eder?", "en": "What Does CREATE INDEX Actually Build on Disk?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "CREATE INDEX çalıştırıldığında…", "en": "When CREATE INDEX runs…" }, "detail": { "tr": "CREATE INDEX çalıştırıldığında veritabanı o sütunun (örn. status) mevcut TÜM değerlerini okur ve ayrı, sıralı bir B-Tree yapısı diskte İNŞA eder — büyük tablolarda bu işlem saniyeler/dakikalar sürebilir.", "en": "When CREATE INDEX runs, the database reads EVERY existing value in that column (e.g. status) and BUILDS a separate, sorted B-Tree structure on disk — on large tables this can take seconds or minutes." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "İndeks oluşturulduktan SONRA…", "en": "AFTER the index exists…" }, "detail": { "tr": "İndeks oluşturulduktan SONRA yapılan her INSERT/UPDATE/DELETE, hem asıl tabloyu hem de bu B-Tree'yi GÜNCELLER — bu yüzden çok fazla index, yazma işlemlerini yavaşlatır.", "en": "AFTER the index exists, every INSERT/UPDATE/DELETE UPDATES both the base table and this B-Tree — this is why too many indexes slow down writes." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "EXPLAIN SELECT ... sorguyu ÇALIŞTIRMAZ…", "en": "EXPLAIN SELECT ... does NOT run the query…" }, "detail": { "tr": "EXPLAIN SELECT ... çalıştırıldığında veritabanı sorguyu ÇALIŞTIRMAZ — sadece \"type: ALL\" (tüm tabloyu tara) mı yoksa \"type: ref\" (indeksi kullan) mı planladığını GÖSTERİR.", "en": "When EXPLAIN SELECT ... runs, the database does NOT execute the query — it just SHOWS whether it plans \"type: ALL\" (scan the whole table) or \"type: ref\" (use the index)." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İndeks eklenmeden önce EXPLAIN \"ALL\" derse…", "en": "Before the index, if EXPLAIN says \"ALL\"…" }, "detail": { "tr": "İndeks eklenmeden önce EXPLAIN \"ALL\" derse, veritabanı status='FAIL' eşleşmesini bulmak için TÜM satırları TEK TEK kontrol eder — tablo büyüdükçe bu süre DOĞRUSAL olarak artar.", "en": "Before the index, if EXPLAIN says \"ALL\", the database checks EVERY row ONE BY ONE to find status='FAIL' matches — this time grows LINEARLY as the table grows." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "İndeks eklendikten sonra aynı EXPLAIN…", "en": "After the index, the same EXPLAIN…" }, "detail": { "tr": "İndeks eklendikten sonra aynı EXPLAIN \"ref\" ve düşük bir \"rows\" sayısı gösterir — veritabanı artık B-Tree'de DOĞRUDAN o değere ATLAR, tıpkı bir kitabın arka indeksine bakmak gibi.", "en": "After the index, the same EXPLAIN shows \"ref\" and a low \"rows\" count — the database now JUMPS DIRECTLY to that value in the B-Tree, exactly like checking a book's back index." } }
        ]
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
      sqlIndexesViewsFilm,
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
      sqlInjectionFilm,
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
        "type": "step-animation",
        "title": { "tr": "NOW() - INTERVAL 7 DAY Aslında Neyi Hesaplar?", "en": "What Does NOW() - INTERVAL 7 DAY Actually Compute?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "NOW() çalıştırıldığı ANDA…", "en": "The MOMENT NOW() runs…" }, "detail": { "tr": "NOW() çalıştırıldığı ANDA sunucunun güncel tarih/saatini döndürür — sorgu her çalıştığında bu değer YENİDEN hesaplanır, sabit bir tarih DEĞİLDİR.", "en": "The MOMENT NOW() runs, it returns the server's current date/time — this value is RECALCULATED every time the query runs, it's not a fixed date." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "NOW() - INTERVAL 7 DAY bu andan…", "en": "NOW() - INTERVAL 7 DAY produces…" }, "detail": { "tr": "NOW() - INTERVAL 7 DAY bu andan tam 7 gün ÖNCEKİ zaman damgasını üretir — örn. bugün 18 Temmuz'sa sonuç 11 Temmuz olur.", "en": "NOW() - INTERVAL 7 DAY produces the timestamp exactly 7 days BEFORE this moment — e.g. if today is July 18, the result is July 11." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "WHERE run_date >= ... koşulu…", "en": "The WHERE run_date >= ... condition…" }, "detail": { "tr": "WHERE run_date >= ... koşulu, bu eşik değerinden SONRAKİ (veya eşit) her satırı filtreler — 8 gün önceki bir kayıt bu sınırın DIŞINDA kalır, sonuca hiç girmez.", "en": "The WHERE run_date >= ... condition keeps every row AT OR AFTER this threshold — a record from 8 days ago falls OUTSIDE the boundary and never enters the result." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "status = 'FAIL' koşulu AYNI WHERE'de…", "en": "status = 'FAIL' combined in the SAME WHERE…" }, "detail": { "tr": "status = 'FAIL' koşulu AYNI WHERE'de AND ile birleşince, veritabanı HER İKİ koşulu da sağlayan satırları arar — sıra önemli değildir, optimizer ikisini birlikte değerlendirir.", "en": "When status = 'FAIL' is combined in the SAME WHERE with AND, the database looks for rows satisfying BOTH conditions — order doesn't matter, the optimizer evaluates them together." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "İkinci sorgudaki GROUP BY test_name…", "en": "The second query's GROUP BY test_name…" }, "detail": { "tr": "İkinci sorgudaki GROUP BY test_name, aynı test_name'e sahip TÜM FAIL satırlarını TEK bir gruba toplar; COUNT(*) o grubun satır sayısını, ORDER BY fail_count DESC en çok başarısız olan testi EN ÜSTE taşır.", "en": "The second query's GROUP BY test_name collapses ALL FAIL rows sharing the same test_name into ONE group; COUNT(*) counts that group's rows, and ORDER BY fail_count DESC puts the most-failing test AT THE TOP." } }
        ]
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
        "type": "step-animation",
        "title": { "tr": "HAVING COUNT(*) > 1 Neden WHERE Değil?", "en": "Why HAVING COUNT(*) > 1 and Not WHERE?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "GROUP BY email, aynı email'e sahip…", "en": "GROUP BY email collapses rows…" }, "detail": { "tr": "GROUP BY email, aynı email değerine sahip TÜM satırları TEK bir grup haline getirir — 3 kullanıcı aynı email'i kullanıyorsa bu 3 satır BİR gruba düşer.", "en": "GROUP BY email collapses ALL rows sharing the same email value into ONE group — if 3 users share an email, those 3 rows fall into ONE group." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "COUNT(*) her grubun İÇİNDEKİ…", "en": "COUNT(*) counts rows INSIDE…" }, "detail": { "tr": "COUNT(*) her grubun İÇİNDEKİ satır sayısını hesaplar — bu hesaplama GRUPLAMA yapıldıktan SONRA çalışır.", "en": "COUNT(*) counts the rows INSIDE each group — this calculation runs AFTER grouping has already happened." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "HAVING COUNT(*) > 1, tam da bu…", "en": "HAVING COUNT(*) > 1 filters exactly…" }, "detail": { "tr": "HAVING COUNT(*) > 1, tam da bu grup bazlı sayıya göre filtre yapar — WHERE bunu YAPAMAZ çünkü WHERE gruplama OLUŞMADAN ÖNCE çalışır, COUNT(*) henüz hesaplanmamıştır.", "en": "HAVING COUNT(*) > 1 filters exactly on this per-group count — WHERE CANNOT do this because WHERE runs BEFORE grouping happens, so COUNT(*) doesn't exist yet." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İkinci sorgudaki alt sorgu…", "en": "The second query's subquery…" }, "detail": { "tr": "İkinci sorgudaki alt sorgu önce \"hangi email'ler tekrarlı\" listesini üretir, dış sorgu SONRA bu listedeki email'lere sahip TÜM satırları (ilk kopya dahil) getirir — sadece sayıyı değil, kaydın KENDİSİNİ görmeni sağlar.", "en": "The second query's subquery first produces the list of \"which emails repeat\", then the outer query fetches EVERY row (including the first copy) matching those emails — showing you the actual record, not just a count." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Üçüncü sorgu GROUP BY'ı birden fazla sütuna…", "en": "The third query extends GROUP BY…" }, "detail": { "tr": "Üçüncü sorgu GROUP BY'ı birden fazla sütuna (test_name, environment, run_date) genişletir — bu, \"aynı testin aynı ortamda aynı tarihte iki kez kaydedilmesi\" gibi TAM satır tekrarlarını yakalar.", "en": "The third query extends GROUP BY across multiple columns (test_name, environment, run_date) — this catches EXACT row duplicates, like the same test being recorded twice for the same environment on the same date." } }
        ]
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
      sqlQaUseCasesFilm,
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
      sqlEcosystemFilm,
      sqlEcosystemSteps,
      sqlEcosystemPractice,
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
      sqlTroubleshootingFilm,
      sqlTroubleshootingSteps,
      sqlTroubleshootingPractice,
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
      sqlJavaToSqlFilm,
      sqlJavaToSqlSteps,
      sqlJavaToSqlPractice,
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
      sqlPracticeReferenceFilm,
      sqlPracticeReferenceSteps,
      sqlPracticeReferencePractice,
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
        "type": "step-animation",
        "title": { "tr": "DBeaver Kurulum Komutu Perde Arkasında Ne Yapar?", "en": "What Does the DBeaver Install Command Actually Do?" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "winget/brew/apt komutlarının HER BİRİ…", "en": "EACH of winget/brew/apt…" }, "detail": { "tr": "winget/brew/apt komutlarının HER BİRİ, işletim sisteminin KENDİ paket yöneticisini kullanır — dbeaver.io'dan manuel .exe/.dmg indirmenin otomatikleştirilmiş hâlidir, sonuç AYNIDIR.", "en": "EACH of winget/brew/apt uses the operating system's OWN package manager — it's the automated version of manually downloading the .exe/.dmg from dbeaver.io, the end result is IDENTICAL." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "macOS'taki --cask bayrağı…", "en": "The --cask flag on macOS…" }, "detail": { "tr": "macOS'taki --cask bayrağı, Homebrew'e bunun bir GUI uygulaması (komut satırı aracı değil) olduğunu söyler — DBeaver.app klasörü Applications'a KOPYALANIR.", "en": "The --cask flag on macOS tells Homebrew this is a GUI app (not a command-line tool) — the DBeaver.app bundle gets COPIED into Applications." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "Ubuntu/Debian'da önce GPG anahtarı…", "en": "On Ubuntu/Debian, the GPG key…" }, "detail": { "tr": "Ubuntu/Debian'da önce GPG anahtarı eklenir (apt-key add) — bu, indirilecek paketin GERÇEKTEN DBeaver'ın resmi sunucusundan geldiğini KRİPTOGRAFİK olarak doğrular, sahte paket kurulumunu ENGELLER.", "en": "On Ubuntu/Debian, the GPG key gets added first (apt-key add) — this CRYPTOGRAPHICALLY verifies the package really comes from DBeaver's official server, PREVENTING a spoofed package install." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "İlk açılışta DBeaver kendi içine gömülü…", "en": "On first launch, DBeaver downloads…" }, "detail": { "tr": "İlk açılışta DBeaver kendi içine gömülü bir Java (JRE) İNDİRİR — bu yüzden ilk açılış internet bağlantısı GEREKTİRİR, sonraki açılışlar çevrimdışı çalışabilir.", "en": "On first launch, DBeaver DOWNLOADS a bundled Java runtime (JRE) — this is why the first launch REQUIRES an internet connection, later launches can work offline." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "Help → About DBeaver menüsü…", "en": "The Help → About DBeaver menu…" }, "detail": { "tr": "Help → About DBeaver menüsü kurulan versiyonu GÖSTERİR — bu, \"kurulum gerçekten başarılı oldu mu\" sorusuna dönen tek güvenilir doğrulama adımıdır.", "en": "The Help → About DBeaver menu SHOWS the installed version — this is the one reliable check that answers \"did the install actually succeed\"." } }
        ]
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
        "type": "step-animation",
        "title": { "tr": "DATABASE_URL Tek Satırda Aslında 5 Bilgiyi Taşır", "en": "DATABASE_URL Actually Packs 5 Pieces of Info Into One Line" },
        "steps": [
          { "id": 1, "icon": "1️⃣", "label": { "tr": "postgresql:// öneki…", "en": "The postgresql:// prefix…" }, "detail": { "tr": "postgresql:// öneki, sürücüye HANGİ veritabanı motoruna bağlanacağını söyler — pg paketi bu ön eki okuyup doğru protokolü SEÇER.", "en": "The postgresql:// prefix tells the driver WHICH database engine to connect to — the pg package reads this prefix and SELECTS the correct protocol." } },
          { "id": 2, "icon": "2️⃣", "label": { "tr": "kullanici:sifre@ kısmı…", "en": "The user:password@ portion…" }, "detail": { "tr": "kullanici:sifre@ kısmı, DBeaver'da \"New Connection Wizard\"da AYRI AYRI girdiğin Username/Password alanlarının TEK satırda birleşmiş hâlidir.", "en": "The user:password@ portion is the Username/Password fields you enter SEPARATELY in DBeaver's \"New Connection Wizard\", merged into ONE line." } },
          { "id": 3, "icon": "3️⃣", "label": { "tr": "localhost:5432 kısmı…", "en": "The localhost:5432 portion…" }, "detail": { "tr": "localhost:5432 kısmı sunucunun ADRESİNİ ve PORTUNU taşır — production'da bu genelde bir cloud sağlayıcının hostname'i olur, localhost DEĞİL.", "en": "The localhost:5432 portion carries the server's ADDRESS and PORT — in production this is usually a cloud provider's hostname, NOT localhost." } },
          { "id": 4, "icon": "4️⃣", "label": { "tr": "/myapp_db kısmı…", "en": "The /myapp_db portion…" }, "detail": { "tr": "/myapp_db kısmı HANGİ veritabanına bağlanılacağını belirtir — aynı sunucuda birden fazla veritabanı olabilir, bu segment ARALARINDA SEÇİM yapar.", "en": "The /myapp_db portion specifies WHICH database to connect to — a single server can host multiple databases, and this segment SELECTS between them." } },
          { "id": 5, "icon": "5️⃣", "label": { "tr": "?schema=app kısmı PostgreSQL'e özgüdür…", "en": "?schema=app is PostgreSQL-specific…" }, "detail": { "tr": "?schema=app kısmı PostgreSQL'e özgüdür — Java'daki paket (package) gibi, aynı veritabanı içinde tabloları isim çakışmasından KORUYAN bir NAMESPACE belirtir; bu satır DEĞİŞTİĞİNDE hem Next.js kodunun hem DBeaver bağlantısının GÜNCELLENMESİ gerekir.", "en": "?schema=app is PostgreSQL-specific — like a package in Java, it defines a NAMESPACE that PROTECTS tables in the same database from name collisions; when this line CHANGES, both the Next.js code and the DBeaver connection need UPDATING." } }
        ]
      },
      sqlDbeaverFilm,
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
,
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
        type: 'interview-questions',
          relatedTopicId: 'sql',
        topic: 'SQL',
        questions: [
              // ── BASIC ──────────────────────────────────────────
              {"level":"basic","q":{"en":"Q1: What is the difference between WHERE and HAVING?","tr":"Soru 1: WHERE ile HAVING arasındaki fark nedir?"},"a":{"en":"WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.","tr":"WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE."},"code":{"en":"-- WHERE: filter rows before grouping\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: filter groups after aggregation\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- first filter rows (only FAIL rows)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)","tr":"-- WHERE: gruplamadan önce satırları filtreler\nSELECT * FROM test_results WHERE status = 'FAIL';\n\n-- HAVING: gruplamadan sonra grupları filtreler\nSELECT test_name, COUNT(*) AS fails\nFROM test_results\nWHERE status = 'FAIL'          -- önce satırları filtrele (sadece FAIL olanlar)\nGROUP BY test_name\nHAVING COUNT(*) > 5;           -- sonra grupları filtrele (sık hata alanlar)"}},
              {"level":"basic","q":{"en":"Q2: Explain the different types of JOINs.","tr":"Soru 2: Farklı JOIN türlerini açıklayın."},"a":{"en":"INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.","tr":"INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir."},"code":{"en":"-- Find testers WITH open bugs (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Find ALL testers, even those with no bugs (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;","tr":"-- Açık bug raporu olan testçileri bul (INNER JOIN):\nSELECT t.name, COUNT(b.id) AS open_bugs\nFROM testers t\nINNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'\nGROUP BY t.id, t.name;\n\n-- Tüm testçileri bul, bug raporu olmayanlar dahil (LEFT JOIN):\nSELECT t.name, COUNT(b.id) AS bug_count\nFROM testers t\nLEFT JOIN bugs b ON t.id = b.tester_id\nGROUP BY t.id, t.name;"}},
              {"level":"basic","q":{"en":"Q3: What is a PRIMARY KEY vs FOREIGN KEY?","tr":"Soru 3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?"},"a":{"en":"PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn't exist in the parent table.","tr":"PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez."},"code":{"en":"CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK\n    user_id INT NOT NULL,                    -- FK column\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint\n    -- → cannot insert user_id = 999 if no user with id=999 exists\n);","tr":"CREATE TABLE users (\n    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    email VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK (Birincil Anahtar)\n    user_id INT NOT NULL,                    -- FK (Yabancı Anahtar) sütunu\n    total   DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK (Yabancı Anahtar) kısıtlaması\n    -- → id=999 olan bir kullanıcı yoksa user_id = 999 eklenemez\n);"}},
              {"level":"basic","q":{"en":"Q4: What is NULL and how do you check for it?","tr":"Soru 4: NULL nedir ve nasıl kontrol edilir?"},"a":{"en":"NULL means \"no value\" or \"unknown\". It's not the same as 0, empty string \"\", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.","tr":"NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın."},"code":{"en":"-- Wrong:\nSELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.\nSELECT * FROM users WHERE phone != NULL;   -- same problem\n\n-- Correct:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- Provide default with COALESCE:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;","tr":"-- Yanlış:\nSELECT * FROM users WHERE phone = NULL;    -- 0 satır döndürür! Her zaman false.\nSELECT * FROM users WHERE phone != NULL;   -- aynı sorun\n\n-- Doğru:\nSELECT * FROM users WHERE phone IS NULL;\nSELECT * FROM users WHERE phone IS NOT NULL;\n\n-- COALESCE ile varsayılan değer sağla:\nSELECT name, COALESCE(phone, 'N/A') AS phone FROM users;"}},
              {"level":"basic","q":{"en":"Q5: What is the difference between DELETE, TRUNCATE, and DROP?","tr":"Soru 5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?"},"a":{"en":"DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.","tr":"DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir."},"code":{"en":"DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows\nDELETE FROM test_results;                           -- remove all rows (slow)\n\nTRUNCATE TABLE test_results;                        -- remove all rows (fast)\n\nDROP TABLE test_results;                            -- delete entire table!","tr":"DELETE FROM test_results WHERE status = 'SKIP';    -- belirli satırları sil\nDELETE FROM test_results;                           -- tüm satırları sil (yavaş)\n\nTRUNCATE TABLE test_results;                        -- tüm satırları sil (hızlı)\n\nDROP TABLE test_results;                            -- tüm tabloyu sil!"}},
              {"level":"basic","q":{"en":"Q6: What is the difference between UNION and UNION ALL?","tr":"Soru 6: UNION ile UNION ALL arasındaki fark nedir?"},"a":{"en":"UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.","tr":"UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır."},"code":{"en":"-- UNION: removes duplicates (slower):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: keeps duplicates (faster):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';","tr":"-- UNION: tekrarlananları kaldırır (daha yavaş):\nSELECT email FROM users WHERE role = 'admin'\nUNION\nSELECT email FROM users WHERE is_verified = TRUE;\n\n-- UNION ALL: tekrarlananları korur (daha hızlı):\nSELECT test_name FROM test_results WHERE status = 'FAIL'\nUNION ALL\nSELECT test_name FROM archived_results WHERE status = 'FAIL';"}},
              {"level":"basic","q":{"en":"Q7: How do subqueries work? What is a correlated subquery?","tr":"Soru 7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?"},"a":{"en":"A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.","tr":"Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın."},"code":{"en":"-- Simple subquery (runs ONCE):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Correlated subquery (runs once per outer row — slow on large tables!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Better: use LEFT JOIN + GROUP BY instead","tr":"-- Basit alt sorgu (BİR KEZ çalışır):\nSELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);\n\n-- Bağlantılı alt sorgu (dış sorgunun her satırı için çalışır — büyük tablolarda yavaş!):\nSELECT t.name,\n    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count\nFROM testers t;\n-- Daha iyi: bunun yerine LEFT JOIN + GROUP BY kullanın"}},
              {"level":"basic","q":{"en":"Q8: What are indexes and how do they affect performance?","tr":"Soru 8: Index nedir, performansı nasıl etkiler?"},"a":{"en":"An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book's index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon't index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.","tr":"Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan dizinden atlarsınız.\n\nHızlandırır: SELECT with WHERE, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, status), sık güncellenen sütunlar."},"code":{"en":"-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- Add index:\nCREATE INDEX idx_status ON test_results(status);\n\n-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';","tr":"-- İndeksten önce: EXPLAIN type=ALL gösterir (TÜM 50,000 satırı okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';\n\n-- İndeks ekle:\nCREATE INDEX idx_status ON test_results(status);\n\n-- İndeksten sonra: EXPLAIN type=ref gösterir (indeks kullanır, ~5000 satır okur)\nEXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';"}},
              {"level":"basic","q":{"en":"Q9: Write a query to find the second highest value in a table.","tr":"Soru 9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın."},"a":{"en":"Finding the second highest value is a classic. You can use LIMIT/OFFSET, a subquery, or window functions. LIMIT/OFFSET is the simplest, but the subquery method is database-agnostic.","tr":"En yüksek ikinci değeri bulmak için LIMIT/OFFSET, alt sorgu veya window fonksiyonları kullanılabilir. LIMIT ve OFFSET en kolay yoldur ancak alt sorgu yaklaşımı veritabanından bağımsız olarak çalışır."},"code":{"en":"-- Option 1: LIMIT + OFFSET (simplest, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Option 2: Subquery (works in all databases, handles duplicates):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Option 3: Window Function (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;","tr":"-- Seçenek 1: LIMIT + OFFSET (en basit, MySQL/PostgreSQL/SQLite):\nSELECT duration_ms FROM test_results\nORDER BY duration_ms DESC\nLIMIT 1 OFFSET 1;\n\n-- Seçenek 2: Alt sorgu (tüm veritabanlarında çalışır, tekrarlananları yönetir):\nSELECT MAX(duration_ms) FROM test_results\nWHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);\n\n-- Seçenek 3: Pencere Fonksiyonu (CTEs, SQL Server/Oracle/Postgre):\nWITH RankedResults AS (\n    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) as rk\n    FROM test_results\n)\nSELECT duration_ms FROM RankedResults WHERE rk = 2 LIMIT 1;"}},
              {"level":"basic","q":{"en":"Q10: GROUP BY — What rules apply to SELECT columns?","tr":"Soru 10: GROUP BY kullanırken SELECT sütunlarına hangi kurallar uygulanır?"},"a":{"en":"In standard SQL, every column in the SELECT clause must either be specified in the GROUP BY clause, or wrapped in an aggregate function (COUNT, SUM, AVG, etc.). Otherwise, the engine throws an error because it cannot choose a single value from the multiple rows collapsing into that group.","tr":"SELECT listesindeki her sütun ya GROUP BY içinde yer almalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır. Aksi takdirde veritabanı motoru her grup için hangi tekil değeri göstereceğini bilemez ve hata fırlatır."},"code":{"en":"-- WRONG in standard SQL (MySQL without ONLY_FULL_GROUP_BY might allow it, but returns random name!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- CORRECT:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- ALSO CORRECT:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;","tr":"-- Standart SQL'de YANLIŞ (ONLY_FULL_GROUP_BY kapalı MySQL izin verebilir ama rastgele ad döndürür!):\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY status;\n\n-- DOĞRU:\nSELECT status, COUNT(*), AVG(duration_ms)\nFROM test_results\nGROUP BY status;\n\n-- BU DA DOĞRU:\nSELECT name, status, COUNT(*)\nFROM test_results\nGROUP BY name, status;"}},
              {"level":"basic","q":{"en":"Q11: Explain window functions with a practical example.","tr":"Soru 11: Window fonksiyonlarını pratik bir örnekle açıklayın."},"a":{"en":"Window functions perform calculations across a set of table rows that are somehow related to the current row, without collapsing them into a single output row like GROUP BY. Each row retains its identity. `OVER()` defines the window, `PARTITION BY` groups the window, and `ORDER BY` sorts within it.","tr":"Window fonksiyonları, satırları tek bir grupta birleştirmeden (GROUP BY yapmadan) satır kümeleri üzerinde hesaplama yapar. Her satır kendi kimliğini korur ve window hesaplaması sonucunu alır. `OVER()` pencereyi, `PARTITION BY` grupları, `ORDER BY` ise sıralamayı belirler."},"code":{"en":"-- Show each test run alongside the average duration of its environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Rank tests by duration within each environment:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;","tr":"-- Her test çalışmasını, kendi ortamının ortalama süresiyle birlikte göster:\nSELECT test_name,\n       environment,\n       duration_ms,\n       AVG(duration_ms) OVER(PARTITION BY environment) AS env_avg\nFROM test_results;\n\n-- Testleri her ortamda kendi içlerinde sürelerine göre sırala:\nSELECT test_name,\n       environment,\n       duration_ms,\n       RANK() OVER(PARTITION BY environment ORDER BY duration_ms DESC) as env_rank\nFROM test_results;"}},
              {"level":"basic","q":{"en":"Q12: What is a CTE? When should it be preferred over a subquery?","tr":"Soru 12: CTE nedir? Alt sorguya göre ne zaman tercih edilmelidir?"},"a":{"en":"A CTE (Common Table Expression) is a temporary named result set defined using the `WITH` clause. It improves readability by breaking complex nested subqueries into logical top-down steps, and can be referenced multiple times within the same query.","tr":"CTE (Common Table Expression), `WITH` ifadesiyle tanımlanan adlandırılmış geçici bir sonuç kümesidir. Karmaşık iç içe sorguları yukarıdan aşağıya mantıklı adımlara bölerek okunabilirliği artırır ve aynı geçici tabloya tek sorguda birden çok kez atıfta bulunulmasını sağlar."},"code":{"en":"-- Readable queries with CTE:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;","tr":"-- CTE ile okunabilir sorgular:\nWITH failed_tests AS (\n    SELECT id, test_name, environment\n    FROM test_results\n    WHERE status = 'FAIL'\n),\nenv_failures AS (\n    SELECT environment, COUNT(*) as fail_count\n    FROM failed_tests\n    GROUP BY environment\n)\nSELECT * FROM env_failures WHERE fail_count > 10;"}},
              {"level":"basic","q":{"en":"Q13: How does a transaction work? What are the ACID properties?","tr":"Soru 13: Transaction nasıl çalışır? ACID özellikleri nelerdir?"},"a":{"en":"A database transaction is a sequence of SQL statements executed as a single, atomic unit of work. ACID stands for:\nAtomicity: All-or-nothing execution.\nConsistency: Moves the DB from one valid state to another, enforcing constraints.\nIsolation: Concurrent transactions do not interfere with each other.\nDurability: Once committed, updates survive system failures.","tr":"Transaction, tek bir birim olarak işlenen SQL komutları dizisidir. ACID özellikleri şunlardır:\nAtomicity (Atomiklik): Hepsi ya da hiçbiri.\nConsistency (Tutarlılık): Şema kuralları korunur.\nIsolation (İzolasyon): Eşzamanlı işlemler birbirini etkilemez.\nDurability (Kalıcılık): COMMIT sonrası veriler kalıcı diske yazılır."},"code":{"en":"START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If both succeeded:\nCOMMIT;\n\n-- If any failed:\nROLLBACK;","tr":"START TRANSACTION;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Eğer ikisi de başarılı olursa:\nCOMMIT;\n\n-- Eğer herhangi biri başarısız olursa:\nROLLBACK;"}},
              {"level":"basic","q":{"en":"Q14: What is SQL injection and how do parameterized queries prevent it?","tr":"Soru 14: SQL Injection nedir ve parametreli sorgular bunu nasıl önler?"},"a":{"en":"SQL Injection is a vulnerability where malicious SQL commands are injected into database queries through untrusted user inputs. Parameterized queries (Prepared Statements) compile the SQL query template first, then bind parameters as raw values. The inputs are never interpreted as SQL executable code.","tr":"SQL Injection, kullanıcı girdilerinin SQL kodu gibi yorumlanması zafiyetidir. Parametreli sorgular (Prepared Statements), SQL yapısı ile kullanıcı verisini tamamen ayırır. Veri ne olursa olsun (zararlı kodlar dahil) sadece bir parametre/değer olarak işlenir ve çalıştırılamaz."},"code":{"en":"-- VULNERABLE to SQL injection:\n-- Input: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Generates: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- SAFE (Parameterized query):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir","tr":"-- SQL injection'a karşı savunmasız:\n-- Girdi: \"admin' OR '1'='1\"\nquery = \"SELECT * FROM users WHERE user = '\" + input + \"' AND pass = '\" + password + \"'\";\n-- Üretilen: SELECT * FROM users WHERE user = 'admin' OR '1'='1' ...\n\n-- GÜVENLİ (Parametreli sorgu):\nquery = \"SELECT * FROM users WHERE user = ? AND pass = ?\";\n-- Girdi doğrudan SQL derleyicisine veri olarak iletilir"}},
              {"level":"basic","q":{"en":"Q15: How do you optimize a slow SQL query?","tr":"Soru 15: Yavaş bir sorguyu nasıl optimize edersiniz?"},"a":{"en":"1. Use `EXPLAIN` to audit the query plan and identify Full Table Scans.\n2. Add indexes on columns commonly used in WHERE clauses, JOIN conditions, and ORDER BY constraints.\n3. Avoid `SELECT *`; only request the specific columns you need.\n4. Rewrite subqueries as JOINs where possible to allow optimizer optimizations.\n5. Use LIMIT to return only the subset of data required by the application.","tr":"1. `EXPLAIN` ile sorgu planını inceleyin, full table scan olan adımları tespit edin.\n2. Sık filtrelenen (WHERE), birleştirilen (JOIN ON) ve sıralanan (ORDER BY) sütunlara index ekleyin.\n3. `SELECT *` yerine sadece gerekli sütunları çağırın.\n4. Alt sorguları (subquery) mümkünse JOIN'e dönüştürün.\n5. Ağır sorgularda performansı optimize etmek için LIMIT kullanın."},"code":{"en":"-- EXPLAIN query plan:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Create compound index for multi-column filters:\nCREATE INDEX idx_user_status ON orders(user_id, status);","tr":"-- EXPLAIN sorgu planı:\nEXPLAIN SELECT * FROM orders WHERE status = 'SHIPPED';\n\n-- Çoklu sütun filtreleri için birleşik indeks oluştur:\nCREATE INDEX idx_user_status ON orders(user_id, status);"}},
              // ── INTERMEDIATE ────────────────────────────────────
              {"level":"intermediate","q":{"en":"Q16: What is a Database Schema?","tr":"Soru 16: Veritabanı Şeması (Schema) ne anlama gelir?"},"a":{"en":"A database schema is the skeleton structure that represents the logical view of the entire database. It defines how the data is organized, including tables, columns, data types, primary/foreign keys, and relationships. For a QA engineer, the schema serves as the map to design database validation tests.","tr":"Veritabanı şeması, veritabanının mantıksal ve fiziksel yapısını tanımlayan bir plandır (blueprint). Tabloları, sütunları, veri tiplerini, primary/foreign key kısıtlamalarını ve tablolar arası ilişkileri içerir. Bir QA mühendisi için, uygulamanın veri yapısını anlamak ve test verisi tasarlamak için şema bilgisi kritik önem taşır."},"code":{"en":"-- Example of schema definition (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);","tr":"-- Şema tanımı örneği (DDL):\nCREATE TABLE testers (\n    id         INT PRIMARY KEY,\n    name       VARCHAR(50) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);"}},
              {"level":"intermediate","q":{"en":"Q17: What does the SELECT DISTINCT statement do?","tr":"Soru 17: SELECT DISTINCT ifadesi ne işe yarar?"},"a":{"en":"The SELECT DISTINCT statement is used to return only distinct (different) values from a column, filtering out all duplicate rows in the result set. In QA testing, it is useful to check all unique values present in a table, such as tested environments or unique statuses.","tr":"SELECT DISTINCT, sorgu sonucunda tekrar eden satırları kaldırarak sadece benzersiz (unique) değerlerin listelenmesini sağlar. QA otomasyonunda, test sonuçlarında hangi farklı ortamların (environment) kullanıldığını veya tablodaki benzersiz durumları listelemek için sıkça kullanılır."},"code":{"en":"-- Get list of unique environments tested:\nSELECT DISTINCT environment FROM test_results;","tr":"-- Test edilen benzersiz ortamların listesini al:\nSELECT DISTINCT environment FROM test_results;"}},
              {"level":"intermediate","q":{"en":"Q18: What is the difference between = and LIKE in a WHERE clause?","tr":"Soru 18: WHERE koşulunda = ve LIKE arasındaki temel fark nedir?"},"a":{"en":"The `=` operator searches for an exact match, whereas the `LIKE` operator performs pattern matching using wildcard characters. `LIKE` supports `%` (matches any sequence of zero or more characters) and `_` (matches exactly one character). Using wildcard characters with `=` treats them as literal characters.","tr":"`=` tam (birebir) eşleşme ararken, `LIKE` karakter bazlı şablon (pattern matching) eşleşmeleri arar. `LIKE` ile birlikte `%` (sıfır veya daha fazla karakter) ve `_` (tek bir karakter) wildcard karakterleri kullanılabilir. `=` ile wildcard karakterleri çalışmaz, düz string olarak eşleştirilmeye çalışılır."},"code":{"en":"-- Exact match:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Pattern match:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- Starts with 'Login'","tr":"-- Birebir eşleşme:\nSELECT * FROM test_results WHERE test_name = 'Login Test';\n\n-- Şablon eşleşmesi:\nSELECT * FROM test_results WHERE test_name LIKE 'Login%'; -- 'Login' ile başlayanlar"}},
              {"level":"intermediate","q":{"en":"Q19: What is the purpose of the LIMIT clause?","tr":"Soru 19: LIMIT ifadesinin amacı nedir?"},"a":{"en":"The LIMIT clause specifies the maximum number of rows that the query should return. It is crucial when testing against large datasets to prevent memory overflow in your test script or UI by fetching only a small subset of records. Often combined with OFFSET for pagination.","tr":"LIMIT, sorgu sonucunda dönecek maksimum satır sayısını sınırlandırmak için kullanılır. Özellikle milyonlarca satır içeren büyük tablolarda test yaparken tarayıcıyı veya test scriptini çökertmemek için sorgunun sadece ilk birkaç satırını (örn: LIMIT 10) getirmesini sağlamak amacıyla kullanılır. Pagination (sayfalama) için OFFSET ile birlikte kullanılır."},"code":{"en":"-- Get the 5 most recent test failures:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;","tr":"-- En son 5 test hatasını al:\nSELECT * FROM test_results\nWHERE status = 'FAIL'\nORDER BY run_date DESC\nLIMIT 5;"}},
              {"level":"intermediate","q":{"en":"Q20: Explain what AS (alias) keyword does.","tr":"Soru 20: AS (alias) anahtar kelimesi ne işe yarar?"},"a":{"en":"The AS keyword is used to assign a temporary name (alias) to a column or table in a query. It makes output columns more readable (e.g. naming aggregate results) and keeps JOIN queries concise by creating short aliases for table names.","tr":"AS, bir sütuna veya tabloya sorgu süresince geçici bir takma ad (alias) vermek için kullanılır. Özellikle aggregate sonuçlarda sütun adını anlamlı kılmak (`COUNT(*) AS total_runs`) veya JOIN sorgularında tablo adlarını kısaltarak okunabilirliği artırmak için kullanılır."},"code":{"en":"-- Column alias:\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Table alias:\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;","tr":"-- Sütun takma adı (alias):\nSELECT COUNT(*) AS total_failures FROM test_results WHERE status = 'FAIL';\n\n-- Tablo takma adı (alias):\nSELECT r.status, u.name\nFROM test_results r\nJOIN users u ON r.user_id = u.id;"}},
              {"level":"intermediate","q":{"en":"Q21: What is the default sorting order of ORDER BY?","tr":"Soru 21: ORDER BY ifadesinin varsayılan sıralama yönü nedir?"},"a":{"en":"The default sorting order of the ORDER BY clause is ascending (ASC). This means it sorts numbers from lowest to highest, and text alphabetically from A to Z. To sort in descending order, you must explicitly append the `DESC` keyword after the column name.","tr":"ORDER BY ifadesinin varsayılan sıralama yönü artan sıralamadır (ASC - Ascending). Yani sayılarda küçükten büyüğe, metinlerde ise A'dan Z'ye doğru sıralar. Azalan sıralama (büyükten küçüğe / Z'den A'ya) yapmak için sütun adından sonra açıkça `DESC` yazılmalıdır."},"code":{"en":"-- Sorts ascending (default):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Sorts descending:\nSELECT * FROM test_results ORDER BY duration_ms DESC;","tr":"-- Artan sıralama (varsayılan):\nSELECT * FROM test_results ORDER BY duration_ms;\n\n-- Azalan sıralama:\nSELECT * FROM test_results ORDER BY duration_ms DESC;"}},
              {"level":"intermediate","q":{"en":"Q22: What happens if you try to insert a duplicate value into a PRIMARY KEY column?","tr":"Soru 22: PRIMARY KEY olan bir sütuna tekrar eden (duplicate) değer eklemeye çalışırsanız ne olur?"},"a":{"en":"The database engine throws a primary key constraint violation error and rejects the INSERT operation. If the query is part of a transaction, the transaction will be rolled back. In automation, you must clean up test data or use UPSERT syntax to prevent duplicate key failures.","tr":"Veritabanı motoru hata fırlatır ve ekleme işlemini reddeder (Unique Constraint Violation). Transaction içindeyse tüm transaction iptal edilir. Test otomasyonunda, test verisi eklerken bu hatayı önlemek için her çalıştırmadan önce temizlik (cleanup) yapmak veya UPSERT (ON CONFLICT) mekanizması kullanmak önemlidir."},"code":{"en":"-- Duplicate insert will throw: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- fails!","tr":"-- Tekrarlanan ekleme hata fırlatacaktır: \"UNIQUE constraint failed\"\nINSERT INTO users (id, email) VALUES (1, 'user@test.com');\nINSERT INTO users (id, email) VALUES (1, 'other@test.com'); -- başarısız olur!"}},
              {"level":"intermediate","q":{"en":"Q23: What does the IN operator do in a SQL query?","tr":"Soru 23: IN operatörü ne işe yarar?"},"a":{"en":"The IN operator allows you to specify multiple values in a WHERE clause, acting as a shorthand for multiple OR conditions. It filters rows where the column value matches any value in the provided list. It is also commonly used to match against the results of a subquery.","tr":"IN operatörü, WHERE koşulunda birden fazla OR (veya) ifadesini tek bir liste halinde yazmayı sağlar. Sütunun değerinin belirtilen listedeki elemanlardan herhangi biriyle eşleşmesi durumunda satırı filtreye dahil eder. Alt sorgulardan dönen küme kontrollerinde de sıkça kullanılır."},"code":{"en":"-- Shorthand for OR:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Equivalent to:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';","tr":"-- OR için kısaltma:\nSELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');\n\n-- Şuna eşdeğerdir:\nSELECT * FROM test_results WHERE status = 'FAIL' OR status = 'SKIP';"}},
              {"level":"intermediate","q":{"en":"Q24: What is the difference between CHAR and VARCHAR data types?","tr":"Soru 24: CHAR ve VARCHAR veri tipleri arasındaki fark nedir?"},"a":{"en":"CHAR is fixed-length, while VARCHAR is variable-length. If you define a CHAR(10) and store a 3-character string, it pads the remaining 7 spaces with blanks, consuming 10 bytes. A VARCHAR(10) will only consume 3 bytes of data, making it more space-efficient for fields with varying lengths.","tr":"CHAR sabit uzunlukta (fixed-length), VARCHAR ise değişken uzunlukta (variable-length) metin depolar. CHAR(10) tanımlanmış bir sütuna 3 harfli bir kelime yazılırsa boşluklarla 10 karaktere tamamlanır ve diskte hep 10 karakter yer kaplar. VARCHAR(10) ise girilen metin boyutu kadar (örn: 3 karakter + uzunluk belirten 1 byte) yer kaplar."},"code":{"en":"-- Fixed length (ideal for ISO country codes, hashes):\ncountry_code CHAR(2) -- always 2 chars\n\n-- Variable length (ideal for names, emails):\nemail VARCHAR(255) -- stores actual length","tr":"-- Sabit uzunluk (ISO ülke kodları, hash değerleri için ideal):\ncountry_code CHAR(2) -- her zaman 2 karakter\n\n-- Değişken uzunluk (adlar, e-postalar için ideal):\nemail VARCHAR(255) -- gerçek uzunluğu saklar"}},
              {"level":"intermediate","q":{"en":"Q25: How do you add a comment in SQL?","tr":"Soru 25: SQL'de yorum satırı (comment) nasıl eklenir?"},"a":{"en":"In SQL, single-line comments are created using double dashes (`--`). Multi-line comments are wrapped inside block markers (`/* comment here */`). Using comments is highly recommended in automated test fixtures to explain complex SQL data setup queries.","tr":"SQL'de tek satırlık yorumlar için çift tire (`--`) kullanılır. Çok satırlı yorumlar için ise C-tarzı (`/* yorum */`) bloklar kullanılır. Test otomasyonunda, karmaşık veritabanı doğrulama sorgularını dökümante etmek için yorum satırları eklemek önemlidir."},"code":{"en":"-- This is a single line comment\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;","tr":"-- Bu tek satırlık bir yorumdur\nSELECT * FROM test_results;\n\n/* This is a\n   multi-line comment block */\nSELECT COUNT(*) FROM users;"}},
              {"level":"intermediate","q":{"en":"Q26: What is a Self Join and when would you use it in QA testing?","tr":"Soru 26: Self-Join nedir ve QA otomasyon testlerinde ne amaçla kullanılabilir?"},"a":{"en":"A Self Join is a regular join, but the table is joined with itself. It is used to query hierarchical data stored in a single table, such as an employee-manager hierarchy or category-subcategory levels. In QA, you can use it to verify data integrity, like checking if deleting a parent category correctly flags its child categories.","tr":"Self-join, bir tablonun kendisiyle JOIN yapılmasıdır. Tablonun içindeki satırlar arasında hiyerarşik veya ilişkisel bir bağ olduğunda kullanılır (Örn: çalışan-yönetici tablosu veya alt-üst kategori tablosu). QA testlerinde, bir kategori silindiğinde alt kategorilerin de doğru şekilde güncellenip güncellenmediğini doğrulamak için self-join sorgusu atılabilir."},"code":{"en":"-- Find employees and their managers from the same table:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;","tr":"-- Aynı tablodan çalışanları ve yöneticilerini bul:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;"}},
              {"level":"intermediate","q":{"en":"Q27: How do you write a query to find and delete duplicate rows in a table?","tr":"Soru 27: Bir tablodaki tekrar eden (duplicate) satırları nasıl bulursunuz ve bunları nasıl silersiniz?"},"a":{"en":"To find duplicates, use `GROUP BY` on the target columns and filter with `HAVING COUNT(*) > 1`. To delete them, you can perform a DELETE query that selects the minimum ID for each duplicate group and removes rows with IDs greater than the minimum.","tr":"Tekrarlanan satırları bulmak için `GROUP BY` ve `HAVING COUNT(*) > 1` kullanılır. Silmek için ise, tablonun benzersiz ID sütununu (primary key) kullanarak, kendisiyle karşılaştırıp daha büyük ID'ye sahip olan kopyaları silebiliriz."},"code":{"en":"-- 1. Find duplicates:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. Delete duplicates keeping only the lowest ID (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);","tr":"-- 1. Tekrarlanan kayıtları bul:\nSELECT email, COUNT(*)\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- 2. En düşük ID'yi koruyarak tekrarlananları sil (SQLite/MySQL):\nDELETE FROM users\nWHERE id NOT IN (\n    SELECT MIN(id)\n    FROM users\n    GROUP BY email\n);"}},
              {"level":"intermediate","q":{"en":"Q28: Explain the difference between CROSS JOIN and INNER JOIN.","tr":"Soru 28: CROSS JOIN ile INNER JOIN arasındaki fark nedir?"},"a":{"en":"CROSS JOIN returns the cartesian product of two tables, matching every row of the first table with every row of the second table without any condition. INNER JOIN requires a join condition (`ON`) and only matches rows satisfying that condition. CROSS JOIN is useful in QA for generating test matrices.","tr":"CROSS JOIN, iki tablonun kartezyen çarpımını (cartesian product) üretir; yani sol tablodaki her satırı sağ tablodaki her satırla eşleştirir (koşulsuz). INNER JOIN ise sadece iki tablo arasında belirtilen `ON` koşulunu sağlayan satırları birleştirir. CROSS JOIN genellikle test verisi kombinasyonları (matrix testing) oluşturmak için yararlıdır."},"code":{"en":"-- CROSS JOIN (Combines all sizes with all colors):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Matches orders to existing users):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;","tr":"-- CROSS JOIN (Tüm bedenleri tüm renklerle birleştirir):\nSELECT s.size, c.color FROM sizes s CROSS JOIN colors c;\n\n-- INNER JOIN (Siparişleri mevcut kullanıcılarla eşleştirir):\nSELECT o.id, u.name FROM orders o INNER JOIN users u ON o.user_id = u.id;"}},
              {"level":"intermediate","q":{"en":"Q29: What is a Composite Primary Key?","tr":"Soru 29: Bileşik Birincil Anahtar (Composite Primary Key) nedir?"},"a":{"en":"A Composite Primary Key is a primary key that consists of two or more columns in a table. Individually, the columns may contain duplicate values, but their combination must be unique. It is commonly used in junction tables for many-to-many relationships to prevent duplicate links.","tr":"Birden fazla sütunun bir araya gelerek tablodaki bir satırı benzersiz şekilde tanımlamasıdır. Tek başına hiçbir sütun benzersiz değildir ancak birleşimleri benzersizdir. Özellikle çoktan-çoğa (many-to-many) ilişki tablolarında (Örn: user_id ve badge_id birleşimi) sıklıkla kullanılır."},"code":{"en":"-- Example of composite primary key (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- combination must be unique\n);","tr":"-- Birleşik birincil anahtar örneği (user_badges):\nCREATE TABLE user_badges (\n    user_id  INT,\n    badge_id INT,\n    PRIMARY KEY (user_id, badge_id) -- birleşim benzersiz olmalıdır\n);"}},
              {"level":"intermediate","q":{"en":"Q30: How does a Foreign Key constraint protect referential integrity?","tr":"Soru 30: Foreign Key (Dış Anahtar) kısıtlaması ilişkisel bütünlüğü nasıl korur?"},"a":{"en":"A Foreign Key constraint ensures that values in a child table correspond to valid primary keys in a parent table. It prevents orphaned records by blocking inserts of invalid IDs in the child table, and blocking deletions of parent records that still have child dependencies (unless cascaded).","tr":"Foreign Key, bir tablodaki değerlerin başka bir tablonun Primary Key'i ile eşleşmesini zorunlu kılar. Bu sayede veritabanı motoru: 1) Parent tabloda olmayan bir id ile child tabloya kayıt eklenmesini engeller. 2) Child tabloda kaydı olan bir parent satırının silinmesini (veya güncellenmesini) engeller (`ON DELETE RESTRICT` varsayılan ise)."},"code":{"en":"-- Prevent deleting user if they have active orders:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;","tr":"-- Aktif siparişi olan kullanıcının silinmesini engelle:\nALTER TABLE orders\nADD CONSTRAINT fk_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE RESTRICT;"}},
              {"level":"intermediate","q":{"en":"Q31: Does the BETWEEN operator include the boundary values?","tr":"Soru 31: BETWEEN operatörü alt ve üst limit sınırlarını dahil eder mi?"},"a":{"en":"Yes, the `BETWEEN` operator is inclusive of both boundary values. For example, `WHERE age BETWEEN 18 AND 25` is equivalent to `WHERE age >= 18 AND age <= 25`. This is important for QA engineers to keep in mind when designing Boundary Value Analysis tests.","tr":"Evet, `BETWEEN` operatörü arama yaparken alt ve üst sınır değerlerini de sonuca dahil eder (inclusive). Yani `WHERE age BETWEEN 18 AND 25` koşulu, yaşı 18 ve 25 olan kişileri de getirir. Bu durum, sınır değer testlerinde (boundary value analysis) QA mühendislerinin dikkat etmesi gereken bir kuraldır."},"code":{"en":"-- Inclusive range:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Equivalent to:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;","tr":"-- Dahil aralık:\nSELECT * FROM users WHERE age BETWEEN 18 AND 25;\n\n-- Şuna eşdeğerdir:\nSELECT * FROM users WHERE age >= 18 AND age <= 25;"}},
              {"level":"intermediate","q":{"en":"Q32: How do you handle case-sensitive text comparisons in SQL?","tr":"Soru 32: SQL'de büyük/küçük harf duyarlı (case-sensitive) metin karşılaştırması nasıl yapılır?"},"a":{"en":"Case sensitivity depends on the database engine and the collation configuration of the tables/columns. PostgreSQL is case-sensitive by default, whereas MySQL and SQLite are case-insensitive. To force case-sensitivity in MySQL, use the `BINARY` keyword. In Postgres, use `ILIKE` for case-insensitive searches.","tr":"Büyük/küçük harf duyarlılığı veritabanı motoruna ve tablonun karakter setine (collation) bağlıdır. PostgreSQL varsayılan olarak case-sensitive'dir. MySQL ve SQLite varsayılan olarak case-insensitive'dir. Case-sensitive karşılaştırma yapmak için MySQL'de `BINARY` keyword'ü, PostgreSQL'de ise case-insensitive için `ILIKE` kullanılır."},"code":{"en":"-- MySQL Case-sensitive search:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' won't match\n\n-- PostgreSQL Case-insensitive search:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- matches 'Alice', 'ALICE'","tr":"-- MySQL Büyük/küçük harf duyarlı arama:\nSELECT * FROM users WHERE BINARY username = 'Alice'; -- 'alice' eşleşmeyecektir\n\n-- PostgreSQL Büyük/küçük harf duyarsız arama:\nSELECT * FROM users WHERE username ILIKE 'alice'; -- 'Alice', 'ALICE' ile eşleşir"}},
              {"level":"intermediate","q":{"en":"Q33: What is a Stored Procedure and when is it used?","tr":"Soru 33: Saklı Yordam (Stored Procedure) nedir ve test otomasyonunda ne zaman kullanılır?"},"a":{"en":"A Stored Procedure is a prepared SQL code block that you can save in the database, allowing it to be reused with parameters. In test automation, they are highly useful to quickly seed complex datasets or run database resets in a single database call, reducing network overhead.","tr":"Stored Procedure, veritabanı sunucusunda derlenip saklanan ve parametre kabul eden SQL kod bloklarıdır. Ağ trafiğini azaltır ve performans sağlar. QA test otomasyonunda, testler öncesinde karmaşık test verisi setleri oluşturmak veya test sonrası veritabanı sıfırlama işlemlerini tek bir komutla tetiklemek için kullanılabilir."},"code":{"en":"-- Call stored procedure from test automation:\nCALL SeedMockTestData(100, 'staging');","tr":"-- Test otomasyonundan stored procedure çağır:\nCALL SeedMockTestData(100, 'staging');"}},
              {"level":"intermediate","q":{"en":"Q34: What are wildcards in SQL and how do they work with LIKE?","tr":"Soru 34: SQL'de LIKE ile kullanılan wildcards (joker karakterler) nelerdir?"},"a":{"en":"The two most common wildcards used with the `LIKE` operator are: 1) `%`: Represents zero, one, or multiple characters (e.g. `A%` matches any string starting with A). 2) `_`: Represents a single character (e.g. `t_st` matches test, tast, tost).","tr":"SQL LIKE ile en sık kullanılan iki joker karakter şunlardır: 1) `%`: Sıfır, bir veya daha fazla karakteri temsil eder (Örn: `A%` -> A ile başlayanlar). 2) `_`: Tam olarak tek bir karakteri temsil eder (Örn: `T_st` -> Test, Tast vb.)."},"code":{"en":"-- Matches: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Matches: 'Test', 'Tast', 'Tost' (exactly 4 characters):\nSELECT * FROM tests WHERE title LIKE 'T_st';","tr":"-- Şunlarla eşleşir: 'Test', 'Tested', 'Testing':\nSELECT * FROM tests WHERE title LIKE 'Test%';\n\n-- Şunlarla eşleşir: 'Test', 'Tast', 'Tost' (tam olarak 4 karakter):\nSELECT * FROM tests WHERE title LIKE 'T_st';"}},
              {"level":"intermediate","q":{"en":"Q35: How can you count the number of NULL values in a column?","tr":"Soru 35: Bir sütundaki NULL değerlerin sayısını nasıl bulursunuz?"},"a":{"en":"Standard `COUNT(column_name)` ignores NULL values. To count NULLs, you must either count all records matching a `WHERE column IS NULL` filter, or use a conditional aggregation like `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)`.","tr":"`COUNT(column_name)` fonksiyonu NULL değerleri saymaz, sadece NULL olmayanları sayar. Bu yüzden NULL değerleri saymak için `SUM(CASE WHEN column IS NULL THEN 1 ELSE 0 END)` veya `COUNT(*)` ile filtreyi birleştirip `WHERE column IS NULL` koşulunu kullanmalıyız."},"code":{"en":"-- Option 1: Simple filter\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Option 2: Conditional aggregation (useful when counting other metrics too):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;","tr":"-- Seçenek 1: Basit filtre\nSELECT COUNT(*) FROM users WHERE phone IS NULL;\n\n-- Seçenek 2: Koşullu toplama (diğer metrikleri de sayarken kullanışlıdır):\nSELECT COUNT(id) AS total,\n       SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_phones\nFROM users;"}},
              // ── ADVANCED ────────────────────────────────────────
              {"level":"advanced","q":{"en":"Q36: What is the difference between COALESCE and NULLIF?","tr":"Soru 36: COALESCE ve NULLIF fonksiyonları arasındaki fark nedir?"},"a":{"en":"`COALESCE(val1, val2, ...)` returns the first non-NULL value in the list (used for default fallbacks). `NULLIF(val1, val2)` returns NULL if the two arguments are equal, otherwise it returns the first value (used to prevent division-by-zero errors).","tr":"`COALESCE(val1, val2, ...)` verilen parametreler arasından NULL olmayan ilk değeri döndürür (varsayılan değer sağlamak için kullanılır). `NULLIF(val1, val2)` ise iki değer birbirine eşitse NULL, eşit değilse ilk değeri döndürür (bölme işlemlerinde sıfıra bölme hatasını önlemek için kullanılır)."},"code":{"en":"-- COALESCE: Fallback to 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Prevent division by zero (turns 0 duration to NULL, rendering avg division safe)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;","tr":"-- COALESCE: Son çare olarak 'N/A'\nSELECT COALESCE(phone, 'N/A') FROM users;\n\n-- NULLIF: Sıfıra bölmeyi engelle (0 süreyi NULL yapar, böylece avg bölmesi güvenli olur)\nSELECT total_amount / NULLIF(item_count, 0) FROM orders;"}},
              {"level":"advanced","q":{"en":"Q37: Can you use a SELECT alias in a GROUP BY clause? Why or why not?","tr":"Soru 37: SELECT alias'larını GROUP BY içinde kullanabilir miyiz? Neden?"},"a":{"en":"In standard SQL, no. Because the GROUP BY clause is evaluated BEFORE the SELECT clause, the alias does not exist yet. However, engines like MySQL, PostgreSQL, and SQLite allow it as an extension. For ANSI SQL compliance, always use the raw column names in GROUP BY.","tr":"Standart SQL'e göre hayır. Çünkü GROUP BY mantıksal çalışma sırasında SELECT'ten ÖNCE çalıştırılır. Ancak PostgreSQL, MySQL ve SQLite gibi birçok modern veritabanı motoru buna esneklik sağlayarak alias kullanımına izin verir. Yine de standart SQL uyumluluğu için ham sütun adlarını veya ifadeleri kullanmak en güvenli yoldur."},"code":{"en":"-- Might fail in strict ANSI SQL databases:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standard compliant way:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);","tr":"-- Katı ANSI SQL veritabanlarında başarısız olabilir:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY run_year;\n\n-- Standartlara uygun yol:\nSELECT YEAR(run_date) AS run_year, COUNT(*)\nFROM test_results\nGROUP BY YEAR(run_date);"}},
              {"level":"advanced","q":{"en":"Q38: What is a Non-Repeatable Read and under what conditions does it occur?","tr":"Soru 38: Tekrarlanamayan Okuma (Non-Repeatable Read) nedir ve hangi koşulda ortaya çıkar?"},"a":{"en":"A Non-Repeatable Read happens when a transaction reads the same row twice but gets different data because another committed transaction modified that row in between. This occurs under the 'Read Committed' isolation level and is prevented under 'Repeatable Read' using snapshots.","tr":"Aynı transaction (işlem) içinde aynı sorgu iki kez çalıştırıldığında, aradaki sürede başka bir transaction'ın veriyi güncelleyip COMMIT etmesi nedeniyle ikinci sorgunun farklı sonuç dönmesi durumudur. 'Read Committed' izolasyon seviyesinde bu durum yaşanabilir, 'Repeatable Read' seviyesinde ise snapshot kullanıldığı için engellenir."},"code":{"en":"-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- Returns $1000\n\n-- Transaction B (concurrent):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- Returns $800! (Non-repeatable read)","tr":"-- Transaction A:\nSTART TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1; -- $1000 döndürür\n\n-- Transaction B (eşzamanlı):\nUPDATE accounts SET balance = 800 WHERE id = 1; COMMIT;\n\n-- Transaction A:\nSELECT balance FROM accounts WHERE id = 1; -- $800 döndürür! (Non-repeatable read)"}},
              {"level":"advanced","q":{"en":"Q39: What does EXPLAIN do and how do you read its output?","tr":"Soru 39: EXPLAIN komutu ne işe yarar ve bir QA otomasyon mühendisi için neden önemlidir?"},"a":{"en":"EXPLAIN displays the execution plan generated by the database query optimizer. It shows index lookups, join orders, and estimated rows scanned. For QA automation, it is the primary debugging tool to optimize slow tests caused by sub-optimal DB queries triggering full-table scans.","tr":"EXPLAIN, veritabanı motorunun bir sorguyu çalıştırırken izleyeceği yolu (Execution Plan) gösterir. Hangi indexlerin kullanılacağını, kaç satırın taranacağını (Scan) ve tabloların birleştirilme sırasını raporlar. QA otomasyon mühendisleri için, yavaş koşan testlerdeki veritabanı sorgularının performans dar boğazlarını (örn: Full Table Scan) bulmak için en önemli araçtır."},"code":{"en":"-- Run EXPLAIN:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- Look for \"scan type\" (e.g. 'ALL' is slow table scan, 'const' or 'ref' is fast index scan)","tr":"-- EXPLAIN çalıştır:\nEXPLAIN SELECT * FROM test_results WHERE test_name = 'Login';\n-- \"Tarama türü\"ne bakın (ör. 'ALL' yavaş tablo taramasıdır, 'const' veya 'ref' hızlı indeks taramasıdır)"}},
              {"level":"advanced","q":{"en":"Q40: Explain the difference between Read Committed and Repeatable Read isolation levels.","tr":"Soru 40: Read Committed ile Repeatable Read izolasyon seviyeleri arasındaki temel fark nedir?"},"a":{"en":"Read Committed takes a new data snapshot for each query statement inside the transaction, allowing concurrent updates to be read if committed. Repeatable Read locks the snapshot at the transaction start, ensuring the exact same values are read throughout the entire transaction session.","tr":"Read Committed seviyesinde, bir sorgu sadece sorgunun başladığı anda commit edilmiş verileri okur; işlem içindeki her SELECT yeni bir snapshot alır. Repeatable Read seviyesinde ise, işlem içindeki ilk SELECT sorgusunun başladığı andaki snapshot korunur; işlem sonlanana kadar aynı satırlar hep aynı değeri döner, başka işlemler commit etse bile değişiklik görülmez."},"code":{"en":"-- Read Committed: Sees committed changes mid-transaction.\n-- Repeatable Read: Read values are guaranteed not to change until rollback/commit.","tr":"-- Read Committed: Transaction ortasında commited edilmiş değişiklikleri görür.\n-- Repeatable Read: Okunan değerlerin rollback/commit olana kadar değişmeyeceği garanti edilir."}},
              {"level":"advanced","q":{"en":"Q41: What is a Phantom Read and how does Serializable isolation prevent it?","tr":"Soru 41: Phantom Read (Hayalet Okuma) nedir ve Serializable seviyesi bunu nasıl önler?"},"a":{"en":"A Phantom Read occurs when a transaction queries a range of rows, and another transaction inserts a NEW row into that range and commits. Re-running the query reveals a 'phantom' row. Serializable isolation prevents this by placing Range Locks on the index, blocking inserts until the transaction finishes.","tr":"Phantom Read, bir transaction içinde bir filtreye uyan satırlar sorgulanırken, araya giren başka bir transaction'ın YENİ satır ekleyip commit etmesi sonucu, ilk transaction aynı sorguyu tekrar attığında daha önce olmayan yeni 'hayalet' satırlarla karşılaşması durumudur. Serializable seviyesi, aralık kilitleri (range locks) kullanarak bu aralığa yeni satır eklenmesini tamamen bloke ederek bunu önler."},"code":{"en":"-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 3 rows\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- Returns 4 rows! (Phantom read)","tr":"-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 3 satır döndürür\n-- Transaction B:\nINSERT INTO users (name, age) VALUES ('Bob', 22); COMMIT;\n-- Transaction A:\nSELECT * FROM users WHERE age > 20; -- 4 satır döndürür! (Phantom read)"}},
              {"level":"advanced","q":{"en":"Q42: What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?","tr":"Soru 42: ROW_NUMBER(), RANK() ve DENSE_RANK() window fonksiyonları arasındaki fark nedir?"},"a":{"en":"All three assign ranks. Difference lies in handling tied values: 1) `ROW_NUMBER()` ignores ties and assigns sequential numbers (1, 2, 3). 2) `RANK()` gives tied rows the same rank, leaving gaps afterwards (1, 1, 3). 3) `DENSE_RANK()` gives tied rows the same rank but leaves no gaps (1, 1, 2).","tr":"Üçü de satırları sıralamak için numara verir. Fark eşit değerlerde (ties) ortaya çıkar: 1) `ROW_NUMBER()` eşitliğe bakmaksızın ardışık benzersiz numaralar verir (1, 2, 3). 2) `RANK()` eşit değerlere aynı numarayı verir ama sonrasında sıra atlar (1, 1, 3). 3) `DENSE_RANK()` eşit değerlere aynı numarayı verir ama sıra atlamaz (1, 1, 2)."},"code":{"en":"-- Example output for tied durations (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2","tr":"-- Eşit süreler için örnek çıktı (1000ms, 1000ms, 1200ms):\nROW_NUMBER() -> 1, 2, 3\nRANK()       -> 1, 1, 3\nDENSE_RANK() -> 1, 1, 2"}},
              {"level":"advanced","q":{"en":"Q43: What is a Recursive CTE and when would you use it?","tr":"Soru 43: Özyinelemeli CTE (Recursive CTE) nedir ve ne zaman kullanılır?"},"a":{"en":"A Recursive CTE is a subquery that references its own name, executing iteratively until a termination condition is met. It is typically used to traverse hierarchical or tree-structured database records like manager-employee org charts, category folders, or dependency trees.","tr":"Kendi kendini referans alan ve bir durdurma koşuluna kadar döngü şeklinde çalışan CTE türüdür. Genellikle hiyerarşik veri yapılarını (Örn: organizasyon şemaları, kategori ağaçları, parça listeleri) veya grafik yollarını sorgulamak için kullanılır. QA testlerinde ağaç yapısındaki verilerin doğruluğunu kontrol etmek için idealdir."},"code":{"en":"-- Traverse manager-employee tree recursively:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;","tr":"-- Yönetici-çalışan ağacını özyinelemeli (recursive) olarak dolaş:\nWITH RECURSIVE org_chart AS (\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL -- Anchor (Başlangıç noktası)\n    UNION ALL\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id -- Recursive join\n)\nSELECT * FROM org_chart;"}},
              {"level":"advanced","q":{"en":"Q44: What is a database deadlock and how does it happen?","tr":"Soru 44: Veritabanında Deadlock (Kilitlenme) nedir ve otomasyon testlerinizde bu durumla karşılaşırsanız ne yaparsınız?"},"a":{"en":"A deadlock occurs when two or more transactions hold locks on resources the others need, creating a circular dependency where neither can proceed. The DB engine aborts one transaction to break the loop. In test runs: 1) Isolate test data. 2) Always lock/update resources in the exact same order. 3) Implement automatic database transaction retries.","tr":"İki veya daha fazla transaction'ın, birbirlerinin kilitlediği (lock) kaynakları beklemesi ve bu nedenle sonsuz döngüye girip kilitlenmesi durumudur. Veritabanı motoru bunu algılar ve birini feda ederek hata fırlatır (rollback). Testlerde paralelleştirmeden kaynaklı deadlock oluşursa: 1) Test verilerini izole edin (farklı user'lar kullanın). 2) Güncelleme sorgularını her zaman aynı sırayla çalıştırın. 3) Otomatik retry (tekrar deneme) mekanizmaları kurun."},"code":{"en":"-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts","tr":"-- Transaction A locks Row 1, wants Row 2\n-- Transaction B locks Row 2, wants Row 1 (Deadlock!)\n-- Mitigation: always update Row 1 before Row 2 in both scripts"}},
              {"level":"advanced","q":{"en":"Q45: Explain B-Tree vs Hash index.","tr":"Soru 45: B-Tree ve Hash Index arasındaki temel fark nedir? Hangisi ne zaman tercih edilmelidir?"},"a":{"en":"B-Tree indexes store data in a balanced tree structure, keeping elements sorted. They support equality (`=`) and range queries (`>`, `<`, `BETWEEN`). Hash indexes use hash tables and only support exact equality checks (`=`) with O(1) complexity, rendering them useless for range filters.","tr":"B-Tree indexleri verileri dengeli bir ağaç yapısında sıralı tutar; `=`, `<` , `>`, `BETWEEN` ve range (aralık) sorgularını destekler. Hash indexleri ise bir hash tablosu kullanır ve SADECE `=` (birebir eşitlik) sorgularını çok hızlı yanıtlar; büyüktür/küçüktür veya aralık sorgularını desteklemez. Çoğu ilişkisel DB varsayılan olarak B-Tree kullanır."},"code":{"en":"-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;","tr":"-- B-Tree supports:\nSELECT * FROM products WHERE price BETWEEN 10 AND 50;\n\n-- Hash index only supports:\nSELECT * FROM products WHERE id = 123;"}},
              {"level":"advanced","q":{"en":"Q46: What is the difference between Clustered and Non-Clustered indexes?","tr":"Soru 46: Kümeli (Clustered) ve Kümesiz (Non-Clustered) index arasındaki fark nedir?"},"a":{"en":"A Clustered index dictates the physical sorting order of rows on disk (only one allowed per table, usually the Primary Key). A Non-Clustered index is a separate structure containing copy columns and pointers linking back to the physical rows (multiple allowed per table, like a book index).","tr":"Clustered index, tablonun fiziksel satırlarının diskteki sıralamasını belirler (kitabın kendisi gibidir; her tabloda sadece 1 tane olabilir, genelde Primary Key'dir). Non-clustered index ise veriden ayrı bir yapıdır ve satırların fiziksel adreslerine işaret eden işaretçiler (pointers) tutar (kitabın arkasındaki dizin gibidir; tablo başına çok sayıda oluşturulabilir)."},"code":{"en":"-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);","tr":"-- Clustered: primary key (rows sorted physically by id)\nCREATE TABLE users (id INT PRIMARY KEY); \n\n-- Non-Clustered: auxiliary index pointing to clustered key\nCREATE INDEX idx_username ON users(username);"}},
              {"level":"advanced","q":{"en":"Q47: What is a database trigger and what are its risks in test automation?","tr":"Soru 47: Veritabanı Tetikleyicileri (Triggers) nedir? Test otomasyonu için ne gibi riskler barındırır?"},"a":{"en":"A database trigger is a stored program that fires automatically in response to DML operations on a table. Risks for QA: 1) They create hidden side-effects not documented in the test code, leading to flaky runs. 2) Finding failures is harder as trigger stack traces might not bubbled up to the test logger. 3) They can interfere with test cleanup scripts.","tr":"Trigger, bir tabloda INSERT, UPDATE veya DELETE yapıldığında otomatik çalışan veritabanı kodlarıdır. QA otomasyonu için riskleri: 1) 'Gizli' yan etkilere yol açarlar; otomasyon kodunda hata olmasa da trigger arka planda hata fırlatıp testi çökertebilir. 2) Hata analizi zordur, loglarda trigger adımları görünmeyebilir. 3) Test verisi temizleme süreçlerini bozabilirler. Mümkünse test ortamlarında trigger'ları simüle etmek yerine kapatmak veya izole etmek tercih edilir."},"code":{"en":"-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;","tr":"-- Example of trigger side-effect:\nCREATE TRIGGER log_user_delete\nAFTER DELETE ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_logs (action, date) VALUES ('DELETE', NOW());\n    -- If user_logs table is missing/locked, normal user delete fails!\nEND;"}},
              {"level":"advanced","q":{"en":"Q48: How do you optimize a query that is performing a Full Table Scan?","tr":"Soru 48: EXPLAIN planında 'Full Table Scan' (Tüm Tablo Taraması) gördüğünüz yavaş bir sorguyu nasıl optimize edersiniz?"},"a":{"en":"1) Add an index on the column used in the WHERE or JOIN conditions. 2) Re-run EXPLAIN to verify if the engine uses the index. 3) Avoid wrapping index columns in functions (e.g. use `WHERE date >= '2024-01-01'` instead of `WHERE YEAR(date) = 2024`) as functions disable indexing. 4) Note that if the table is tiny, the engine might bypass the index deliberately.","tr":"1) WHERE ve JOIN koşulundaki sütuna index ekleyin. 2) İndex'in gerçekten kullanılıp kullanılmadığını doğrulamak için EXPLAIN planını tekrar kontrol edin. 3) Sütunun bir fonksiyon içine sarılmadığından emin olun (Örn: `WHERE YEAR(date) = 2024` yerine `WHERE date >= '2024-01-01'`). Fonksiyonlar index kullanımını engeller. 4) Tablo çok küçükse veritabanı motorunun index kullanmayı bilerek reddetmiş olabileceğini unutmayın."},"code":{"en":"-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';","tr":"-- Slow (ignores index on created_at):\nSELECT * FROM logs WHERE DATE(created_at) = '2024-01-01';\n\n-- Optimized (uses index):\nSELECT * FROM logs WHERE created_at >= '2024-01-01 00:00:00' AND created_at <= '2024-01-01 23:59:59';"}},
              {"level":"advanced","q":{"en":"Q49: How do you handle schema migrations (e.g. Liquibase or Flyway) in a QA automation pipeline?","tr":"Soru 49: QA otomasyon pipeline'larında veritabanı şema göçlerini (schema migrations - Flyway/Liquibase) nasıl yönetmeliyiz?"},"a":{"en":"In CI/CD pipelines, schema migrations must run before automated tests execute. Steps: 1) Spin up a clean test DB container (e.g. using Testcontainers or Docker Compose). 2) Run Flyway/Liquibase update commands against the database. 3) Verify successful migration, then kick off the automated test execution suite. This ensures tests align with active schema code.","tr":"QA pipeline'ında testler koşmadan önce, veritabanı şemasını en güncel sürüme taşımak (migration) kritik önem taşır. Adımlar: 1) Test veritabanı konteynerini (Docker) ayağa kaldır. 2) Flyway/Liquibase komutunu çalıştırıp şemayı test DB'ye uygula. 3) Şema başarılı göç ettikten sonra test scriptlerini koştur. Bu sayede testler her zaman en güncel DB yapısıyla çalışır."},"code":{"en":"# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update","tr":"# CLI execution in CI/CD pipeline:\nliquibase --changeLogFile=db/changelog/db.changelog-master.xml           --url=jdbc:postgresql://localhost:5432/testdb           --username=postgres --password=secret update"}},
              {"level":"advanced","q":{"en":"Q50: What is the N+1 query problem and how do you detect it in QA test automation?","tr":"Soru 50: N+1 sorgu problemi nedir ve QA test otomasyonunda nasıl tespit edilir?"},"a":{"en":"The N+1 problem: 1 query fetches N parent records, then N more queries fetch each child separately (N+1 DB round-trips). Example: 100 orders + 100 item queries instead of 1 JOIN. Detect in QA: 1) Enable SQL query logging in test env. 2) Assert page load triggers fewer queries than a threshold. 3) Use Hibernate stats or p6spy to count queries per test. Java analogy: calling a DB method inside a for-each loop.","tr":"N+1 problemi: 1 sorgu N parent kaydı getirir, ardından her biri için N sorgu daha koşar (N+1 DB turu). Örnek: 100 sipariş + 100 ürün sorgusu yerine 1 JOIN yeterli. QA tespit: 1) Test ortamında SQL loglama etkinleştir. 2) Sayfa yüklemesinin sorgu limitini aşmadığını assert et. 3) Hibernate istatistikleri veya p6spy ile test başına sorgu sayısını say. Java analogu: for-each döngüsü içinde DB metodu çağırmak."},"code":{"en":"-- N+1 (bad): 1 parent query + N child queries in loop\nSELECT * FROM orders;  -- then loop: SELECT * FROM items WHERE order_id = ?\n\n-- Fix: single JOIN (1 query total)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;","tr":"-- N+1 (kötü): 1 parent sorgusu + döngüde N alt sorgu\nSELECT * FROM orders;  -- sonra: SELECT * FROM items WHERE order_id = ?\n\n-- Düzeltme: tek JOIN (toplam 1 sorgu)\nSELECT o.id, o.total, i.name\nFROM orders o JOIN order_items i ON i.order_id = o.id;"}},
        ],
      },
      sqlInterviewFilm,
      sqlInterviewSteps,
      sqlInterviewPractice,
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
  }
];

export const sqlData = {
  en: { hero: enHero, tabs: enTabs, sections: finalEnSections },
  tr: { hero: trHero, tabs: trTabs, sections: finalTrSections },
};

fillMissingCodeTrios(sqlData, 'sql')
