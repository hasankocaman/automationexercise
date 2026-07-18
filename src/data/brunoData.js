// brunoData.js - Bruno API Client Learning Page
// Git-native, offline-first API testing alternative to Postman

import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

const brunoArchSvg = `<svg viewBox='0 0 600 200' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <defs>
    <marker id='ar' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#10b981'/></marker>
  </defs>
  <rect x='20' y='50' width='120' height='100' rx='10' fill='#6366f1' opacity='0.2' stroke='#6366f1' stroke-width='1.5'/>
  <text x='80' y='80' fill='#a78bfa' text-anchor='middle' font-size='18'>📦</text>
  <text x='80' y='100' fill='#a78bfa' text-anchor='middle' font-size='12' font-weight='bold'>Bruno</text>
  <text x='80' y='115' fill='#9ca3af' text-anchor='middle' font-size='10'>.bru files</text>
  <line x1='145' y1='100' x2='195' y2='100' stroke='#f59e0b' stroke-width='2' marker-end='url(#ar)'/>
  <text x='170' y='92' fill='#f59e0b' text-anchor='middle' font-size='9'>git add</text>
  <rect x='200' y='55' width='90' height='90' rx='10' fill='#f59e0b' opacity='0.15' stroke='#f59e0b' stroke-width='1.5'/>
  <text x='245' y='90' fill='#fbbf24' text-anchor='middle' font-size='20'>🔀</text>
  <text x='245' y='110' fill='#fbbf24' text-anchor='middle' font-size='11' font-weight='bold'>Git Repo</text>
  <line x1='295' y1='100' x2='345' y2='100' stroke='#10b981' stroke-width='2' marker-end='url(#ar)'/>
  <text x='320' y='92' fill='#10b981' text-anchor='middle' font-size='10' font-family='monospace'>GET /users</text>
  <rect x='350' y='30' width='130' height='140' rx='10' fill='#7c3aed' opacity='0.15' stroke='#7c3aed' stroke-width='1.5'/>
  <text x='415' y='70' fill='#a78bfa' text-anchor='middle' font-size='22'>🖥️</text>
  <text x='415' y='95' fill='#c4b5fd' text-anchor='middle' font-size='11' font-weight='bold'>API Server</text>
  <text x='415' y='112' fill='#9ca3af' text-anchor='middle' font-size='10'>:3000</text>
  <line x1='485' y1='100' x2='525' y2='100' stroke='#60a5fa' stroke-width='1.5' marker-end='url(#ar)'/>
  <rect x='530' y='65' width='55' height='70' rx='10' fill='#10b981' opacity='0.15' stroke='#10b981' stroke-width='1.5'/>
  <text x='557' y='100' fill='#34d399' text-anchor='middle' font-size='18'>✓</text>
  <text x='557' y='118' fill='#6ee7b7' text-anchor='middle' font-size='9'>200 OK</text>
</svg>`

const bruCliSvg = `<svg viewBox='0 0 600 280' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <rect x='15' y='15' width='570' height='250' rx='10' fill='#111827' stroke='#374151' stroke-width='1'/>
  <text x='30' y='40' fill='#6366f1' font-size='12' font-weight='bold'>Terminal</text>
  <rect x='25' y='50' width='550' height='30' rx='5' fill='#1e293b'/>
  <text x='35' y='70' fill='#10b981' font-size='11'>$ bru run collections/users/get.bru --env dev</text>
  <rect x='25' y='85' width='550' height='150' rx='5' fill='#0f172a'/>
  <text x='35' y='105' fill='#94a3b8' font-size='10'>Running GET /users...</text>
  <text x='35' y='125' fill='#34d399' font-size='10'>✓ Status: 200 OK</text>
  <text x='35' y='145' fill='#34d399' font-size='10'>✓ Response time: 42ms (&lt; 500ms)</text>
  <text x='35' y='165' fill='#34d399' font-size='10'>✓ Body: JSON array with 10 users</text>
  <text x='35' y='185' fill='#fbbf24' font-size='10'>⚠ Warning: responseTime 42ms close to threshold</text>
  <text x='35' y='205' fill='#f87171' font-size='10'>✗ Assertion failed: expected email to include "@"</text>
  <text x='35' y='225' fill='#94a3b8' font-size='10'>Failed: 1 | Passed: 3 | Total: 1 collection</text>
  <rect x='25' y='242' width='550' height='20' rx='5' fill='#6366f1'/>
  <text x='35' y='257' fill='#c4b5fd' font-size='11'>exit code 1 — CI build will fail</text>
</svg>`

const bruUiMockupSvg = `<svg viewBox='0 0 720 400' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <rect x='10' y='10' width='150' height='380' rx='8' fill='#111827' stroke='#374151'/>
  <text x='25' y='32' fill='#6366f1' font-size='11' font-weight='bold'>COLLECTIONS</text>
  <text x='25' y='55' fill='#9ca3af' font-size='10'>📁 users</text>
  <text x='35' y='72' fill='#34d399' font-size='9'>📄 get.bru</text>
  <text x='35' y='88' fill='#60a5fa' font-size='9'>📄 post.bru</text>
  <text x='25' y='108' fill='#9ca3af' font-size='10'>📁 orders</text>
  <text x='25' y='128' fill='#9ca3af' font-size='10'>📁 auth</text>
  <circle cx='140' cy='65' r='10' fill='#6366f1'/>
  <text x='140' y='69' fill='white' text-anchor='middle' font-size='10'>①</text>
  <rect x='170' y='10' width='340' height='380' rx='8' fill='#0f172a' stroke='#374151'/>
  <rect x='185' y='25' width='60' height='24' rx='4' fill='#10b981'/>
  <text x='215' y='41' fill='white' text-anchor='middle' font-size='10' font-weight='bold'>GET</text>
  <rect x='250' y='25' width='245' height='24' rx='4' fill='#1e293b'/>
  <text x='260' y='41' fill='#e5e7eb' font-size='9'>{{baseUrl}}/users</text>
  <circle cx='505' cy='37' r='10' fill='#6366f1'/>
  <text x='505' y='41' fill='white' text-anchor='middle' font-size='10'>②</text>
  <text x='185' y='75' fill='#9ca3af' font-size='9'>Params | Headers | Body | Vars | Script | Assert</text>
  <rect x='185' y='85' width='310' height='90' rx='4' fill='#111827'/>
  <text x='195' y='105' fill='#fbbf24' font-size='9'>test("status is 200", function() {</text>
  <text x='205' y='122' fill='#a78bfa' font-size='9'>expect(res.getStatus()).to.equal(200)</text>
  <text x='195' y='139' fill='#fbbf24' font-size='9'>})</text>
  <circle cx='505' cy='130' r='10' fill='#6366f1'/>
  <text x='505' y='134' fill='white' text-anchor='middle' font-size='10'>③</text>
  <rect x='530' y='10' width='180' height='380' rx='8' fill='#111827' stroke='#374151'/>
  <text x='545' y='32' fill='#34d399' font-size='11' font-weight='bold'>200 OK · 42ms</text>
  <text x='545' y='55' fill='#9ca3af' font-size='9'>[</text>
  <text x='555' y='72' fill='#e5e7eb' font-size='9'>{ "id": 1,</text>
  <text x='565' y='88' fill='#e5e7eb' font-size='9'>"name": "Ada" },</text>
  <text x='545' y='105' fill='#9ca3af' font-size='9'>...</text>
  <text x='545' y='122' fill='#9ca3af' font-size='9'>]</text>
  <circle cx='700' cy='37' r='10' fill='#6366f1'/>
  <text x='700' y='41' fill='white' text-anchor='middle' font-size='10'>④</text>
</svg>`

const gitDiffSvg = `<svg viewBox='0 0 620 230' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <rect x='15' y='15' width='590' height='200' rx='8' fill='#111827' stroke='#374151'/>
  <text x='30' y='38' fill='#9ca3af' font-size='10'>Pull Request #482 · collections/users/get.bru</text>
  <rect x='30' y='50' width='560' height='22' rx='3' fill='#7f1d1d' opacity='0.4'/>
  <text x='40' y='66' fill='#fca5a5' font-size='10'>-  expect(res.getBody().userName).to.equal("ada")</text>
  <rect x='30' y='75' width='560' height='22' rx='3' fill='#14532d' opacity='0.5'/>
  <text x='40' y='91' fill='#86efac' font-size='10'>+  expect(res.getBody().user_name).to.equal("ada")</text>
  <rect x='30' y='105' width='420' height='40' rx='6' fill='#1e293b' stroke='#6366f1'/>
  <text x='42' y='122' fill='#a5b4fc' font-size='9'>💬 Reviewer: API switched to snake_case —</text>
  <text x='42' y='136' fill='#a5b4fc' font-size='9'>good catch, this would've broken in prod.</text>
  <rect x='465' y='105' width='125' height='40' rx='6' fill='#064e3b' stroke='#10b981'/>
  <text x='480' y='128' fill='#6ee7b7' font-size='10'>✓ Approved</text>
  <text x='30' y='175' fill='#fbbf24' font-size='9'>Caught in code review — before merge, before prod.</text>
  <text x='30' y='195' fill='#6b7280' font-size='9'>(A Postman cloud collection change would not show up in this diff at all.)</text>
</svg>`

const ciPipelineSvg = `<svg viewBox='0 0 680 180' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <defs>
    <marker id='ar2' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#60a5fa'/></marker>
  </defs>
  <rect x='15' y='60' width='100' height='60' rx='8' fill='#6366f1' opacity='0.2' stroke='#6366f1'/>
  <text x='65' y='85' fill='#a78bfa' text-anchor='middle' font-size='10' font-weight='bold'>git push</text>
  <text x='65' y='102' fill='#9ca3af' text-anchor='middle' font-size='9'>commit + .bru</text>
  <line x1='118' y1='90' x2='158' y2='90' stroke='#60a5fa' stroke-width='2' marker-end='url(#ar2)'/>
  <rect x='163' y='60' width='110' height='60' rx='8' fill='#0ea5e9' opacity='0.2' stroke='#0ea5e9'/>
  <text x='218' y='85' fill='#7dd3fc' text-anchor='middle' font-size='10' font-weight='bold'>GitHub Actions</text>
  <text x='218' y='102' fill='#9ca3af' text-anchor='middle' font-size='9'>npm i -g @usebruno/cli</text>
  <line x1='276' y1='90' x2='316' y2='90' stroke='#60a5fa' stroke-width='2' marker-end='url(#ar2)'/>
  <rect x='321' y='60' width='110' height='60' rx='8' fill='#f59e0b' opacity='0.2' stroke='#f59e0b'/>
  <text x='376' y='85' fill='#fbbf24' text-anchor='middle' font-size='10' font-weight='bold'>bru run</text>
  <text x='376' y='102' fill='#9ca3af' text-anchor='middle' font-size='9'>--reporter-junit</text>
  <line x1='434' y1='90' x2='474' y2='90' stroke='#60a5fa' stroke-width='2' marker-end='url(#ar2)'/>
  <rect x='479' y='40' width='90' height='40' rx='8' fill='#10b981' opacity='0.2' stroke='#10b981'/>
  <text x='524' y='65' fill='#6ee7b7' text-anchor='middle' font-size='10'>✓ Pass → Deploy</text>
  <rect x='479' y='100' width='90' height='40' rx='8' fill='#ef4444' opacity='0.2' stroke='#ef4444'/>
  <text x='524' y='125' fill='#fca5a5' text-anchor='middle' font-size='10'>✗ Fail → Block</text>
  <line x1='435' y1='80' x2='479' y2='60' stroke='#60a5fa' stroke-width='1.5' marker-end='url(#ar2)'/>
  <line x1='435' y1='100' x2='479' y2='120' stroke='#60a5fa' stroke-width='1.5' marker-end='url(#ar2)'/>
  <text x='340' y='155' fill='#6b7280' text-anchor='middle' font-size='9' font-family='monospace'>exit code 0 = pass, exit code 1 = fail (CI reads this)</text>
</svg>`

const ecosystemSvg = `<svg viewBox='0 0 600 320' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <circle cx='300' cy='160' r='55' fill='#6366f1' opacity='0.25' stroke='#6366f1' stroke-width='2'/>
  <text x='300' y='155' fill='#a78bfa' text-anchor='middle' font-size='16' font-weight='bold'>Bruno</text>
  <text x='300' y='172' fill='#c4b5fd' text-anchor='middle' font-size='9'>.bru core</text>
  <g font-size='9' fill='#e5e7eb'>
    <line x1='300' y1='105' x2='300' y2='45' stroke='#475569'/>
    <rect x='240' y='15' width='120' height='35' rx='6' fill='#0f172a' stroke='#60a5fa'/>
    <text x='300' y='37' text-anchor='middle'>🧩 VS Code Extension</text>

    <line x1='345' y1='130' x2='430' y2='80' stroke='#475569'/>
    <rect x='430' y='55' width='130' height='35' rx='6' fill='#0f172a' stroke='#34d399'/>
    <text x='495' y='77' text-anchor='middle'>📑 OpenAPI / Swagger import</text>

    <line x1='355' y1='160' x2='450' y2='160' stroke='#475569'/>
    <rect x='450' y='142' width='130' height='35' rx='6' fill='#0f172a' stroke='#fbbf24'/>
    <text x='515' y='164' text-anchor='middle'>📮 Postman collection import</text>

    <line x1='345' y1='190' x2='430' y2='240' stroke='#475569'/>
    <rect x='430' y='230' width='130' height='35' rx='6' fill='#0f172a' stroke='#f472b6'/>
    <text x='495' y='252' text-anchor='middle'>🔗 GraphQL / gRPC / WS</text>

    <line x1='300' y1='215' x2='300' y2='270' stroke='#475569'/>
    <rect x='225' y='270' width='150' height='35' rx='6' fill='#0f172a' stroke='#94a3b8'/>
    <text x='300' y='292' text-anchor='middle'>🖥️ bru CLI (npm)</text>

    <line x1='255' y1='160' x2='170' y2='160' stroke='#475569'/>
    <rect x='30' y='142' width='140' height='35' rx='6' fill='#0f172a' stroke='#a78bfa'/>
    <text x='100' y='164' text-anchor='middle'>☁️ Bruno Cloud (opsiyonel)</text>
  </g>
</svg>`

// ─── §9.5 sekme standardı: her dikey sekmeye 1 film + 1 animasyon + 1 sandbox ─
// brunoData EN+TR AYRI AĞAÇLI — her sabit HEM en.sections HEM tr.sections'a
// aynı bare identifier ile eklenir. Veri şeması: Documents/video-rollout-plan.md
// / src/data/gaugeData.js referans.

// 🎯 Introduction — .bru dosyasının Git diff'i vs Postman'ın opak JSON blob'u
const brunoBruDiffFilm = {
  type: 'video-scene',
  id: 'bruno-bru-diff-film',
  title: {
    tr: '🎬 Bir Satırlık Değişiklik: .bru Diff vs Postman JSON Blob',
    en: '🎬 A One-Line Change: .bru Diff vs the Postman JSON Blob',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'dev',      emoji: '👩‍💻', label: { tr: 'QA Mühendisi',        en: 'QA Engineer' },        color: '#0ea5e9' },
    { id: 'file',     emoji: '📇', label: { tr: 'get.bru',               en: 'get.bru' },             color: '#6366f1' },
    { id: 'git',      emoji: '🗂️', label: { tr: 'Git Repo',              en: 'Git Repo' },            color: '#f59e0b' },
    { id: 'diff',     emoji: '🧾', label: { tr: 'git diff Çıktısı',      en: 'git diff Output' },     color: '#10b981' },
    { id: 'reviewer', emoji: '👀', label: { tr: 'Reviewer',              en: 'Reviewer' },            color: '#22c55e' },
    { id: 'blob',     emoji: '☁️', label: { tr: 'Postman JSON Blob',     en: 'Postman JSON Blob' },   color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir backend değişikliği geldi: response alanı "userName" yerine artık "user_name" dönüyor. QA mühendisi .bru dosyasındaki assertion satırını buna göre güncelliyor.',
        en: 'A backend change lands: the response field is now "user_name" instead of "userName". The QA engineer updates the assertion line in the .bru file to match.',
      },
      code: { tr: `res.body.user_name: contains @`, en: `res.body.user_name: contains @` },
      positions: {
        dev: { x: 16, y: 50, scale: 1.1, pulse: true },
        file: { x: 40, y: 50, scale: 1.05 },
      },
      beams: [{ from: 'dev', to: 'file' }],
    },
    {
      caption: {
        tr: 'Adım 1 — dosya kaydedilir kaydedilmez, bu değişiklik ZATEN Git repo\'nun bir parçası: ayrı bir "export" adımına gerek yok, .bru dosyası zaten projenin içindeki düz metin.',
        en: 'Step 1 — the moment the file is saved, this change is ALREADY part of the Git repo: no separate "export" step needed, the .bru file is already plain text inside the project.',
      },
      code: { tr: `git status\n# modified: collections/users/get.bru`, en: `git status\n# modified: collections/users/get.bru` },
      positions: {
        dev: { x: 12, y: 50, opacity: 0.5, scale: 0.85 },
        file: { x: 34, y: 50, scale: 1.1 },
        git: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'file', to: 'git', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — `git diff` çalıştırıldığında, tam olarak HANGİ SATIRIN değiştiğini kırmızı/yeşil renkte gösterir — herhangi bir kod dosyasıyla birebir aynı davranış.',
        en: 'Step 2 — running `git diff` shows exactly WHICH LINE changed, in red/green — identical behavior to any other code file.',
      },
      code: { tr: `- res.body.userName: contains @\n+ res.body.user_name: contains @`, en: `- res.body.userName: contains @\n+ res.body.user_name: contains @` },
      positions: {
        git: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        diff: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'git', to: 'diff', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Reviewer, Bruno\'yu hiç açmadan bile pull request\'te bu diff\'i okur: "test artık user_name bekliyor" cümlesini görür ve "mobil uygulama bu rename için güncellendi mi?" diye sorar.',
        en: 'Step 3 — the reviewer reads this diff in the pull request without ever opening Bruno: they see "the test now expects user_name" and ask "was the mobile app updated for this rename too?"',
      },
      positions: {
        diff: { x: 28, y: 50, opacity: 0.5, scale: 0.85 },
        reviewer: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'diff', to: 'reviewer', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — AYNI değişiklik Postman\'da yapılsaydı: koleksiyon buluta senkronize olur ama Git\'e giren tek şey (varsa) tüm koleksiyonu kapsayan tek bir opak JSON blob\'u olurdu — hangi satırın değiştiğini kimse GÖREMEZ, sadece "bir şeyler değişti" bilinir.',
        en: 'Final (the contrast) — had the SAME change been made in Postman: the collection syncs to the cloud, but the only thing that could enter Git (if anyone remembered) is one opaque JSON blob covering the whole collection — NOBODY can see which line changed, only that "something changed".',
      },
      positions: {
        dev: { x: 14, y: 30, scale: 0.9 },
        reviewer: { x: 40, y: 60, scale: 1.0 },
        blob: { x: 72, y: 40, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'dev', to: 'blob', color: '#ef4444' }],
    },
  ],
}

const brunoFileVsCloudSteps = {
  type: 'step-animation',
  id: 'bruno-file-vs-cloud-steps',
  title: { tr: 'Adım Adım: Bir Değişiklik Nereye Gider?', en: 'Step by Step: Where Does a Change Go?' },
  steps: [
    { id: 1, icon: '✏️', label: { tr: 'Değişikliği yap', en: 'Make the change' }, detail: { tr: 'Bruno\'da .bru dosyasını düzenle ya da Postman\'da bir field\'ı değiştir — her iki tarafta da tıklama adımları hemen hemen aynı görünür.', en: 'Edit the .bru file in Bruno, or change a field in Postman — from the outside, both feel like the same few clicks.' } },
    { id: 2, icon: '💾', label: { tr: 'Kaydet', en: 'Save' }, detail: { tr: 'Bruno\'da kayıt = diskte gerçek bir dosya güncellenir. Postman\'da kayıt = bulut sunucusuna bir istek gider, senkron biter.', en: 'In Bruno, saving means a real file on disk is updated. In Postman, saving means a request goes to a cloud server and the sync completes.' } },
    { id: 3, icon: '🗂️', label: { tr: 'Git\'e girer mi?', en: 'Does it enter Git?' }, detail: { tr: '.bru dosyası ZATEN proje klasöründe — otomatik olarak `git status`\'ta görünür. Postman koleksiyonu Git\'e girmek için MANUEL export gerektirir.', en: 'The .bru file is ALREADY inside the project folder — it shows up in `git status` automatically. A Postman collection needs a MANUAL export to enter Git at all.' } },
    { id: 4, icon: '🧾', label: { tr: 'Diff okunabilir mi?', en: 'Is the diff readable?' }, detail: { tr: '.bru düz metin olduğu için `git diff` satır satır kırmızı/yeşil gösterir. Export edilmiş bir Postman JSON\'u tek bir dev blob olarak görünür — satır bazlı diff anlamsızdır.', en: 'Because .bru is plain text, `git diff` shows red/green line by line. An exported Postman JSON appears as one giant blob — a line-based diff is meaningless there.' } },
    { id: 5, icon: '👀', label: { tr: 'Reviewer ne görür?', en: 'What does the reviewer see?' }, detail: { tr: 'Bruno: "hangi assertion değişti" net görünür. Postman export\'u: reviewer koskoca bir JSON\'u satır satır okumak zorunda kalır ya da hiç bakmaz.', en: 'Bruno: "which assertion changed" is immediately clear. Postman export: the reviewer must read a giant JSON line by line, or simply doesn\'t bother.' } },
  ],
}

const brunoWhatIsPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-what-is-bruno',
  id: 'bruno-what-is-practice-01',
  label: {
    tr: 'Micro Lab: Değişen bir .bru dosyasının diff\'ini gör',
    en: 'Micro Lab: See the diff of a changed .bru file',
  },
  language: 'bash',
  task: {
    tr: 'get.bru dosyasında bir assertion satırını değiştirdin. TODO satırını, bu değişikliği reviewer\'ın okuyabileceği kırmızı/yeşil bir diff olarak gösteren komutla tamamla.',
    en: 'You changed an assertion line in get.bru. Complete the TODO line with the command that shows this change as a red/green diff the reviewer can read.',
  },
  explanation: {
    tr: 'Bu gercek bir terminal degil; amac .bru dosyasinin diger kod dosyalari gibi Git ile diff\'lenebildigini komutu kendin yazarak pekistirmek.',
    en: 'This is not a real terminal; the goal is to reinforce that a .bru file is diffable with Git just like any other code file, by writing the command yourself.',
  },
  code: {
    tr: `# get.bru icinde assertion satiri degisti\n# TODO: degisikligi kirmizi/yesil olarak goster\ngit diff collections/users/get.bru`,
    en: `# the assertion line in get.bru changed\n# TODO: show the change as red/green\ngit diff collections/users/get.bru`,
  },
  starterCode: {
    tr: `# get.bru icinde assertion satiri degisti\n# TODO: degisikligi kirmizi/yesil olarak goster\n`,
    en: `# the assertion line in get.bru changed\n# TODO: show the change as red/green\n`,
  },
  solutionCode: {
    tr: `# get.bru icinde assertion satiri degisti\n# TODO: degisikligi kirmizi/yesil olarak goster\ngit diff collections/users/get.bru`,
    en: `# the assertion line in get.bru changed\n# TODO: show the change as red/green\ngit diff collections/users/get.bru`,
  },
  expected: 'git diff collections/users/get.bru',
}

// 📦 Installation — indirmeden ilk yeşil response'a kadar
const brunoInstallFirstRequestFilm = {
  type: 'video-scene',
  id: 'bruno-install-first-request-film',
  title: {
    tr: '🎬 İndirmeden İlk Yeşil Response\'a',
    en: '🎬 From Download to the First Green Response',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'installer', emoji: '⬇️', label: { tr: 'Yükleyici',            en: 'Installer' },        color: '#0ea5e9' },
    { id: 'app',       emoji: '📦', label: { tr: 'Bruno Uygulaması',      en: 'Bruno App' },        color: '#6366f1' },
    { id: 'coll',      emoji: '🗂️', label: { tr: 'Yeni Collection',       en: 'New Collection' },   color: '#f59e0b' },
    { id: 'req',       emoji: '📇', label: { tr: 'GET Users İsteği',      en: 'GET Users Request' }, color: '#8b5cf6' },
    { id: 'api',       emoji: '🌐', label: { tr: 'Test API Sunucusu',     en: 'Test API Server' },  color: '#22c55e' },
    { id: 'resp',      emoji: '✅', label: { tr: '200 OK Response',       en: '200 OK Response' },  color: '#10b981' },
    { id: 'typo',      emoji: '👻', label: { tr: 'ENOTFOUND (yazım hatası)', en: 'ENOTFOUND (typo)' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'usebruno.com/downloads\'tan işletim sistemine uygun yükleyici indirilir — hesap açmaya, veritabanı kurmaya gerek yok.',
        en: 'The installer matching your OS is downloaded from usebruno.com/downloads — no account, no database to set up.',
      },
      code: { tr: `brew install --cask bruno`, en: `brew install --cask bruno` },
      positions: { installer: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — uygulama açılır, Help → About "Bruno v1.x.x" gösterir. Bu tek başına doğrulama adımıdır; login YOKTUR.',
        en: 'Step 1 — the app opens, Help → About shows "Bruno v1.x.x". This alone is the verification step; there is NO login.',
      },
      positions: {
        installer: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        app: { x: 44, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'installer', to: 'app' }],
    },
    {
      caption: {
        tr: 'Adım 2 — "Create Collection" tıklanır: bu tek tık, diskte GERÇEK bir klasör oluşturur — bulutta değil, bilgisayarında.',
        en: 'Step 2 — "Create Collection" is clicked: this one click creates a REAL folder on disk — on your machine, not in the cloud.',
      },
      positions: {
        app: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        coll: { x: 48, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'app', to: 'coll', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — "New Request", GET, URL: jsonplaceholder.typicode.com/users. "Send" tıklanır ve istek gerçek bir sunucuya gider.',
        en: 'Step 3 — "New Request", GET, URL: jsonplaceholder.typicode.com/users. "Send" is clicked and the request travels to a real server.',
      },
      code: { tr: `GET https://jsonplaceholder.typicode.com/users`, en: `GET https://jsonplaceholder.typicode.com/users` },
      positions: {
        coll: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        req: { x: 46, y: 50, scale: 1.1 },
        api: { x: 72, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'coll', to: 'req' }, { from: 'req', to: 'api', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Response paneli bir saniye içinde dolar: status 200, 10 kullanıcılık JSON dizisi. İlk istek başarıyla tamamlandı.',
        en: 'Step 4 — the Response panel fills within a second: status 200, a JSON array of 10 users. The first request completed successfully.',
      },
      positions: {
        api: { x: 26, y: 50, opacity: 0.5, scale: 0.85 },
        resp: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'api', to: 'resp', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — URL\'de tek bir harf yanlış yazılsaydı ("jsonplacehlder"), aynı akış "ENOTFOUND" ile kırılırdı: DNS bu hostname\'i hiç bulamaz. Body boş kalır, status bile gelmez — hata mesajı doğrudan sebebi söyler.',
        en: 'Final (the contrast) — had a single letter been mistyped in the URL ("jsonplacehlder"), the same flow would break with "ENOTFOUND": DNS never finds that hostname at all. The body stays empty, not even a status arrives — the error message names the cause directly.',
      },
      positions: {
        req: { x: 18, y: 30, scale: 0.9 },
        api: { x: 46, y: 50, scale: 1.0, opacity: 0.4 },
        typo: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'req', to: 'typo', color: '#ef4444' }],
    },
  ],
}

const brunoInstallJourneySteps = {
  type: 'step-animation',
  id: 'bruno-install-journey-steps',
  title: { tr: 'Adım Adım: Sıfırdan İlk Response\'a', en: 'Step by Step: From Zero to the First Response' },
  steps: [
    { id: 1, icon: '⬇️', label: { tr: 'Doğru yükleyiciyi seç', en: 'Pick the right installer' }, detail: { tr: 'Windows için .exe/winget, macOS için .dmg/brew, Linux için .deb/.AppImage/snap — hepsi ayni usebruno.com/downloads kaynagindan gelir.', en: 'exe/winget for Windows, .dmg/brew for macOS, .deb/.AppImage/snap for Linux — all come from the same usebruno.com/downloads source.' } },
    { id: 2, icon: '✅', label: { tr: 'Sürümü doğrula', en: 'Verify the version' }, detail: { tr: 'Help → About (veya `bru --version`) bir versiyon numarasi gostermeli. Hicbir login veya hesap adimi YOKTUR.', en: 'Help → About (or `bru --version`) should print a version number. There is NO login or account step.' } },
    { id: 3, icon: '🗂️', label: { tr: 'Collection oluştur', en: 'Create a collection' }, detail: { tr: 'Bu tik diskte gercek bir klasor acar — sonra o klasoru Finder/Explorer\'da acip duz dosyalari gorebilirsin.', en: 'This click opens a real folder on disk — you can later open that same folder in Finder/Explorer and see plain files.' } },
    { id: 4, icon: '📇', label: { tr: 'İlk isteği kur', en: 'Set up the first request' }, detail: { tr: 'Method GET, URL girilir. Auth veya API key GEREKMEZ cunku jsonplaceholder herkese acik bir test API\'sidir.', en: 'Method GET, URL entered. No auth or API key is NEEDED because jsonplaceholder is a public test API.' } },
    { id: 5, icon: '📊', label: { tr: 'Send + oku', en: 'Send + read' }, detail: { tr: 'Status 200 ve JSON body bir saniyede doner. ENOTFOUND gorursen ilk supheli URL yaziminda arama yap, uygulamada degil.', en: 'Status 200 and the JSON body arrive within a second. If you see ENOTFOUND, suspect a URL typo first, not the app itself.' } },
  ],
}

const brunoInstallationPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-installation',
  id: 'bruno-installation-practice-01',
  label: {
    tr: 'Micro Lab: bru CLI kurulumunu doğrula',
    en: 'Micro Lab: Verify the bru CLI installation',
  },
  language: 'bash',
  task: {
    tr: '`bru` komutu terminalde "command not found" veriyor. TODO satırını, CLI\'yi global kurup versiyonunu doğrulayan iki komutla tamamla.',
    en: 'The `bru` command gives "command not found" in the terminal. Complete the TODO line with the two commands that install the CLI globally and verify its version.',
  },
  explanation: {
    tr: 'Bu gercek bir terminal degil; amac CLI kurulum + dogrulama refleksini (npm install -g, sonra --version) elle yazarak pekistirmek.',
    en: 'This is not a real terminal; the goal is to reinforce the install + verify reflex for the CLI (npm install -g, then --version) by writing it yourself.',
  },
  code: {
    tr: `$ bru --version\nzsh: command not found: bru\n\n# TODO: CLI'yi global kur, sonra versiyonu dogrula\nnpm install -g @usebruno/cli\nbru --version`,
    en: `$ bru --version\nzsh: command not found: bru\n\n# TODO: install the CLI globally, then verify the version\nnpm install -g @usebruno/cli\nbru --version`,
  },
  starterCode: {
    tr: `$ bru --version\nzsh: command not found: bru\n\n# TODO: CLI'yi global kur, sonra versiyonu dogrula\n`,
    en: `$ bru --version\nzsh: command not found: bru\n\n# TODO: install the CLI globally, then verify the version\n`,
  },
  solutionCode: {
    tr: `$ bru --version\nzsh: command not found: bru\n\n# TODO: CLI'yi global kur, sonra versiyonu dogrula\nnpm install -g @usebruno/cli\nbru --version`,
    en: `$ bru --version\nzsh: command not found: bru\n\n# TODO: install the CLI globally, then verify the version\nnpm install -g @usebruno/cli\nbru --version`,
  },
  expected: '1.x.x',
}

// 📚 Core Concepts — .bru dosyasının anatomisi + {{baseUrl}} çözümleme zinciri
const brunoAnatomyFilm = {
  type: 'video-scene',
  id: 'bruno-anatomy-film',
  title: {
    tr: '🎬 Bir .bru Dosyasının Anatomisi: {{baseUrl}} Nasıl Çözülür?',
    en: '🎬 The Anatomy of a .bru File: How {{baseUrl}} Gets Resolved',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'file',  emoji: '📇', label: { tr: 'get.bru',              en: 'get.bru' },              color: '#6366f1' },
    { id: 'meta',  emoji: '🏷️', label: { tr: 'meta { }',             en: 'meta { }' },             color: '#0ea5e9' },
    { id: 'get',   emoji: '🔗', label: { tr: 'get { url }',          en: 'get { url }' },          color: '#f59e0b' },
    { id: 'env',   emoji: '🌱', label: { tr: 'dev.bru (env)',        en: 'dev.bru (env)' },        color: '#8b5cf6' },
    { id: 'assert', emoji: '✅', label: { tr: 'assert { }',          en: 'assert { }' },           color: '#22c55e' },
    { id: 'script', emoji: '📜', label: { tr: 'script:post-response', en: 'script:post-response' }, color: '#10b981' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Environment Seçilmemiş', en: 'No Environment Selected' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'get.bru dosyası aslında dört küçük bölümden oluşur: meta, get, headers, assert. Bugün odak: get bölümündeki {{baseUrl}} nasıl gerçek bir URL\'e dönüşüyor?',
        en: 'The get.bru file is really four small sections: meta, get, headers, assert. Today\'s focus: how does {{baseUrl}} inside the get section become a real URL?',
      },
      code: { tr: `get {\n  url: {{baseUrl}}/users\n}`, en: `get {\n  url: {{baseUrl}}/users\n}` },
      positions: { file: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — meta bölümü sadece görüntüleme bilgisi taşır (sidebar\'daki isim). Henüz hiçbir network isteği yok, sadece dosya okunuyor.',
        en: 'Step 1 — the meta section carries only display info (the name shown in the sidebar). No network request yet, just the file being read.',
      },
      positions: {
        file: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        meta: { x: 42, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'file', to: 'meta' }],
    },
    {
      caption: {
        tr: 'Adım 2 — get bölümüne gelinir: {{baseUrl}} bir PLACEHOLDER\'dır, henüz gerçek bir domain değil. Bruno bunu çözmek için sağ üstteki seçili Environment dosyasına bakar.',
        en: 'Step 2 — the get section is reached: {{baseUrl}} is a PLACEHOLDER, not yet a real domain. Bruno looks at the currently selected Environment file to resolve it.',
      },
      positions: {
        meta: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        get: { x: 42, y: 50, scale: 1.15, pulse: true },
        env: { x: 68, y: 50, scale: 1.1 },
      },
      beams: [{ from: 'meta', to: 'get' }, { from: 'get', to: 'env', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — dev.bru dosyasında baseUrl = https://api-dev.example.com tanımlı. {{baseUrl}}/users artık https://api-dev.example.com/users olur ve GERÇEK istek bu adrese gider.',
        en: 'Step 3 — dev.bru defines baseUrl = https://api-dev.example.com. {{baseUrl}}/users now becomes https://api-dev.example.com/users, and the REAL request goes to that address.',
      },
      code: { tr: `baseUrl: https://api-dev.example.com`, en: `baseUrl: https://api-dev.example.com` },
      positions: {
        get: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        env: { x: 46, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'get', to: 'env', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — response geldikten sonra assert bölümü res.status: eq 200 gibi basit kontrolleri çalıştırır; script:post-response ise bru.setVar() ile bir sonraki isteğe değer taşıyabilir.',
        en: 'Step 4 — once the response arrives, the assert section runs simple checks like res.status: eq 200; script:post-response can carry a value to the next request with bru.setVar().',
      },
      positions: {
        env: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        assert: { x: 48, y: 40, scale: 1.15, pulse: true },
        script: { x: 48, y: 68, scale: 1.05 },
      },
      beams: [{ from: 'env', to: 'assert', color: '#10b981' }, { from: 'env', to: 'script' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — sağ üstte "No Environment" seçiliyse, adım 2\'deki arama HİÇBİR dosya bulamaz: {{baseUrl}} literal metin olarak kalır ve istek gerçek bir hostname\'e gitmeden başarısız olur.',
        en: 'Final (the contrast) — if the top-right shows "No Environment" selected, the lookup in step 2 finds NO file at all: {{baseUrl}} stays literal text and the request fails before ever reaching a real hostname.',
      },
      positions: {
        get: { x: 20, y: 40, scale: 0.95 },
        env: { x: 46, y: 60, scale: 0.9, opacity: 0.4 },
        ghost: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'get', to: 'ghost', color: '#ef4444' }],
    },
  ],
}

const brunoEnvVarResolutionSteps = {
  type: 'step-animation',
  id: 'bruno-env-var-resolution-steps',
  title: { tr: 'Adım Adım: Değişken Öncelik Sırası', en: 'Step by Step: Variable Priority Order' },
  steps: [
    { id: 1, icon: '⚡', label: { tr: 'Runtime (bru.setVar)', en: 'Runtime (bru.setVar)' }, detail: { tr: 'Bir script icinde calisma zamaninda set edilen deger en yuksek onceliklidir — diger tum katmanlari GECERSIZ kilar.', en: 'A value set at runtime inside a script has the HIGHEST priority — it overrides every other layer.' } },
    { id: 2, icon: '🌱', label: { tr: 'Environment (dev/staging/prod)', en: 'Environment (dev/staging/prod)' }, detail: { tr: 'Sag ustten secilen environment dosyasindaki deger, runtime\'da bir override yoksa kullanilir.', en: 'The value in the environment file selected at the top-right is used if no runtime override exists.' } },
    { id: 3, icon: '🗂️', label: { tr: 'Collection değişkeni', en: 'Collection variable' }, detail: { tr: 'Environment\'ta o degisken tanimli degilse, koleksiyon seviyesindeki varsayilan deger devreye girer.', en: 'If the environment doesn\'t define that variable, the collection-level default kicks in.' } },
    { id: 4, icon: '🌐', label: { tr: 'Global değişken', en: 'Global variable' }, detail: { tr: 'Son care olarak process/global seviyesindeki deger kullanilir — en genis, en dusuk oncelikli katman.', en: 'As a last resort, the process/global-level value is used — the broadest, lowest-priority layer.' } },
    { id: 5, icon: '👻', label: { tr: 'Hiçbiri yoksa?', en: 'If none exist?' }, detail: { tr: 'Hicbir katmanda deger yoksa {{baseUrl}} LITERAL metin olarak kalir ve istek yanlis/eksik bir URL\'e gider.', en: 'If no layer defines it, {{baseUrl}} stays LITERAL text and the request goes to a wrong/incomplete URL.' } },
  ],
}

const brunoCoreConceptsPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-core-concepts',
  id: 'bruno-core-concepts-practice-01',
  label: {
    tr: 'Micro Lab: .bru dosyasına assert bölümü ekle',
    en: 'Micro Lab: Add an assert section to a .bru file',
  },
  language: 'text',
  task: {
    tr: 'get.bru dosyasında meta, get ve headers bölümleri hazır ama assert bölümü eksik. TODO satırını, response status\'unun 200 olduğunu kontrol eden assert bloğuyla tamamla.',
    en: 'The get.bru file has meta, get and headers sections ready, but the assert section is missing. Complete the TODO line with an assert block that checks the response status is 200.',
  },
  explanation: {
    tr: 'Bu gercek bir Bruno runtime\'i degil; amac .bru dosyasinin assert sozdizimini (res.status: eq 200) elle yazarak pekistirmek.',
    en: 'This is not a real Bruno runtime; the goal is to reinforce the .bru assert syntax (res.status: eq 200) by writing it yourself.',
  },
  code: {
    tr: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status 200 olmali\nassert {\n  res.status: eq 200\n}`,
    en: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status should be 200\nassert {\n  res.status: eq 200\n}`,
  },
  starterCode: {
    tr: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status 200 olmali\n`,
    en: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status should be 200\n`,
  },
  solutionCode: {
    tr: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status 200 olmali\nassert {\n  res.status: eq 200\n}`,
    en: `meta {\n  name: Get Users\n  type: http\n}\n\nget {\n  url: {{baseUrl}}/users\n}\n\n# TODO: response status should be 200\nassert {\n  res.status: eq 200\n}`,
  },
  expected: 'res.status: eq 200',
}

// 🔥 Test Automation — post-response script'in çalışma akışı + CI exit code
const brunoTestScriptFilm = {
  type: 'video-scene',
  id: 'bruno-test-script-film',
  title: {
    tr: '🎬 Response Sonrası: test()/expect() Nasıl Karar Verir?',
    en: '🎬 After the Response: How test()/expect() Decides',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'req',    emoji: '📤', label: { tr: 'İstek Gönderildi',   en: 'Request Sent' },      color: '#0ea5e9' },
    { id: 'res',    emoji: '📥', label: { tr: 'Response Geldi',     en: 'Response Arrived' },  color: '#6366f1' },
    { id: 'script', emoji: '📜', label: { tr: 'post-response script', en: 'post-response script' }, color: '#f59e0b' },
    { id: 'test',   emoji: '🧪', label: { tr: 'test()/expect()',    en: 'test()/expect()' },   color: '#8b5cf6' },
    { id: 'exit',   emoji: '🚦', label: { tr: 'Exit Code',          en: 'Exit Code' },          color: '#22c55e' },
    { id: 'ci',     emoji: '🏗️', label: { tr: 'CI Pipeline',        en: 'CI Pipeline' },        color: '#10b981' },
    { id: 'fail',   emoji: '👻', label: { tr: 'expect() Fail',      en: 'expect() Fail' },      color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '"Send" tıklanır tıklanmaz istek yola çıkar. Test otomasyonunun asıl hikayesi response GELDİKTEN SONRA başlar.',
        en: 'The moment "Send" is clicked, the request travels out. The real story of test automation begins AFTER the response arrives.',
      },
      positions: { req: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — sunucu yanıt verir: status code + body Bruno\'ya döner. Bu ana kadar henüz hiçbir test() çalışmadı.',
        en: 'Step 1 — the server responds: status code + body return to Bruno. No test() has run yet at this point.',
      },
      positions: {
        req: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        res: { x: 44, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'req', to: 'res' }],
    },
    {
      caption: {
        tr: 'Adım 2 — post-response script tetiklenir: res değişkeni artık dolu, script bu response\'a erişebilir.',
        en: 'Step 2 — the post-response script fires: the res variable is now populated, and the script can access this response.',
      },
      positions: {
        res: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        script: { x: 44, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'res', to: 'script', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — test("...", function() { expect(...) }) çalışır: users.length > 0 gibi bir koşul GERÇEKTEN kontrol edilir, sadece görsel bir kontrol DEĞİLDİR.',
        en: 'Step 3 — test("...", function() { expect(...) }) runs: a condition like users.length > 0 is ACTUALLY checked, not just eyeballed.',
      },
      code: { tr: `test("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});`, en: `test("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});` },
      positions: {
        script: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        test: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'script', to: 'test', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 4 — tüm test()\'ler geçerse process exit code 0 olur. Bu tek sayı CI\'a "devam et, deploy\'a izin ver" der — insan log okumasa bile.',
        en: 'Step 4 — if every test() passes, the process exit code becomes 0. This single number tells CI "proceed, allow the deploy" — even without a human reading the logs.',
      },
      positions: {
        test: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        exit: { x: 48, y: 50, scale: 1.15 },
        ci: { x: 74, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'exit', color: '#22c55e' }, { from: 'exit', to: 'ci', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — expect(users.length).to.be.above(0) başarısız olsaydı (API boş dizi dönseydi): exit code 1 olur, CI pipeline\'ı deploy\'u BLOKE eder — insan hiç bakmadan bile.',
        en: 'Final (the contrast) — had expect(users.length).to.be.above(0) failed (the API returned an empty array): exit code becomes 1, and the CI pipeline BLOCKS the deploy — even without a human looking.',
      },
      positions: {
        test: { x: 20, y: 30, scale: 0.9 },
        exit: { x: 46, y: 55, scale: 1.0, opacity: 0.5 },
        fail: { x: 72, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'test', to: 'fail', color: '#ef4444' }],
    },
  ],
}

const brunoCiExitCodeSteps = {
  type: 'step-animation',
  id: 'bruno-ci-exit-code-steps',
  title: { tr: 'Adım Adım: Exit Code CI\'a Nasıl Karar Aldırır?', en: 'Step by Step: How Exit Code Drives CI\'s Decision' },
  steps: [
    { id: 1, icon: '🧪', label: { tr: 'Tüm test()\'ler çalışır', en: 'Every test() runs' }, detail: { tr: '`bru run`, koleksiyondaki her istegi sirayla calistirir ve her assert/script test\'ini degerlendirir.', en: '`bru run` executes every request in the collection in order and evaluates every assert/script test.' } },
    { id: 2, icon: '✅', label: { tr: 'Hepsi geçerse', en: 'If all pass' }, detail: { tr: 'Process exit code 0 doner — "hicbir sey kirilmadi" anlamina gelir.', en: 'The process returns exit code 0 — meaning "nothing broke".' } },
    { id: 3, icon: '❌', label: { tr: 'Biri bile fail ederse', en: 'If even one fails' }, detail: { tr: 'Exit code 1 (veya sifirdan farkli) doner — TEK bir basarisiz assertion bile tum run\'i "fail" isaretler.', en: 'Exit code 1 (or any non-zero) is returned — even ONE failing assertion marks the whole run as "fail".' } },
    { id: 4, icon: '🚦', label: { tr: 'CI bu sayıyı okur', en: 'CI reads that number' }, detail: { tr: 'GitHub Actions/Jenkins insan log\'u okumaz — sadece shell adiminin exit code\'una bakar.', en: 'GitHub Actions/Jenkins doesn\'t read logs like a human — it just checks the shell step\'s exit code.' } },
    { id: 5, icon: '🚫', label: { tr: 'Deploy gate tetiklenir', en: 'The deploy gate triggers' }, detail: { tr: 'Sifirdan farkli exit code, sonraki deploy job\'inin ATLANMASINA veya PR\'in merge edilememesine sebep olur.', en: 'A non-zero exit code causes the next deploy job to be SKIPPED, or the PR to be blocked from merging.' } },
  ],
}

const brunoAssertTabStep = {
  type: 'step-animation',
  id: 'bruno-assert-tab-step-01',
  title: { tr: "res.status: eq 200 Satırı JavaScript Yazmadan Nasıl Çalışır?", en: 'How Does res.status: eq 200 Work Without Writing JavaScript?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Assert tab, YAZILI her satırı…', en: 'The Assert tab reads every line…' }, detail: { tr: "Assert tab, YAZILI her satırı kendi ÖZEL mini-dilinde OKUR — res.status: eq 200 gerçek JavaScript DEĞİLDİR, Bruno'nun İÇSEL olarak yorumladığı bir KARŞILAŞTIRMA ifadesidir.", en: "The Assert tab READS every written line in its OWN mini-language — res.status: eq 200 is NOT real JavaScript, it's a COMPARISON expression Bruno INTERPRETS internally." } },
    { id: 2, icon: '2️⃣', label: { tr: 'eq, lt, gt gibi operatörler…', en: 'Operators like eq, lt, gt…' }, detail: { tr: "eq, lt, gt gibi operatörler ÖNCEDEN TANIMLI bir KÜMEDİR — yeni bir operatör İCAT edemezsin, sadece Bruno'nun DESTEKLEDİĞİ birkaç karşılaştırma türünü KULLANABİLİRSİN.", en: "Operators like eq, lt, gt are a PREDEFINED set — you cannot INVENT a new operator, you can only USE the handful of comparison types Bruno SUPPORTS." } },
    { id: 3, icon: '3️⃣', label: { tr: 'res.body.email: contains @ satırı…', en: 'res.body.email: contains @…' }, detail: { tr: 'res.body.email: contains @ satırı, yanıt gövdesindeki email ALANININ İÇİNDE "@" karakterinin GEÇİP GEÇMEDİĞİNİ kontrol eder — TAM eşleşme değil, KISMİ bir metin arama YAPAR.', en: 'res.body.email: contains @ checks WHETHER the "@" character APPEARS INSIDE the email field of the response body — not an EXACT match, a PARTIAL text search.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'res.responseTime: lt 500 ise…', en: 'res.responseTime: lt 500 compares…' }, detail: { tr: "res.responseTime: lt 500 ise Bruno'nun KENDİSİNİN ölçtüğü GERÇEK yanıt süresini (milisaniye) 500 ile KARŞILAŞTIRIR — bu değer sunucudan GELMEZ, istemci tarafında HESAPLANIR.", en: "res.responseTime: lt 500 COMPARES the ACTUAL response time (in milliseconds) that Bruno ITSELF measured against 500 — this value doesn't COME from the server, it's CALCULATED client-side." } },
    { id: 5, icon: '5️⃣', label: { tr: 'Bu satırların HER BİRİ BAĞIMSIZ…', en: 'EACH of these lines is an INDEPENDENT…' }, detail: { tr: "Bu satırların HER BİRİ BAĞIMSIZ bir assertion'dır — biri FAIL olsa bile diğerleri ÇALIŞMAYA devam eder, ve TÜM sonuçlar tek bir run raporunda TOPLU olarak GÖSTERİLİR.", en: "EACH of these lines is an INDEPENDENT assertion — even if one FAILS, the others keep RUNNING, and ALL results are shown TOGETHER in a single run report." } },
  ],
}

const brunoRunScopeStep = {
  type: 'step-animation',
  id: 'bruno-run-scope-step-01',
  title: { tr: 'bru run collections/users/get.bru Üç Farklı Kapsamda Neyi Çalıştırır?', en: 'What Does bru run collections/users/get.bru Actually Run at Three Different Scopes?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'bru run collections/users/get.bru --env dev…', en: 'bru run collections/users/get.bru --env dev…' }, detail: { tr: "bru run collections/users/get.bru --env dev, TEK bir .bru dosyasını HEDEF alır — sadece o istek GÖNDERİLİR, klasördeki DİĞER istekler ETKİLENMEZ.", en: "bru run collections/users/get.bru --env dev TARGETS a SINGLE .bru file — only that request is SENT, the OTHER requests in the folder are UNAFFECTED." } },
    { id: 2, icon: '2️⃣', label: { tr: 'bru run collections/users --env dev ise…', en: 'bru run collections/users --env dev instead…' }, detail: { tr: "bru run collections/users --env dev ise bir KLASÖRÜ hedef alır — o klasördeki TÜM .bru dosyaları SIRAYLA çalıştırılır, her biri kendi assertion'larıyla DEĞERLENDİRİLİR.", en: "bru run collections/users --env dev instead TARGETS a FOLDER — EVERY .bru file in that folder RUNS in sequence, each EVALUATED against its own assertions." } },
    { id: 3, icon: '3️⃣', label: { tr: 'bru run --env dev (yol BELİRTİLMEDEN)…', en: 'bru run --env dev with NO path…' }, detail: { tr: "bru run --env dev (yol BELİRTİLMEDEN) çalıştırıldığında, o an bulunduğun KOLEKSİYONUN TAMAMI çalıştırılır — CI pipeline'ında genelde bu SON form kullanılır.", en: "Running bru run --env dev with NO path RUNS the ENTIRE collection you're currently in — CI pipelines usually use this LAST form." } },
    { id: 4, icon: '4️⃣', label: { tr: '--env dev bayrağı…', en: 'The --env dev flag…' }, detail: { tr: "--env dev bayrağı, HANGİ ortam değişkenleri setinin (baseUrl, token gibi) kullanılacağını BELİRLER — aynı .bru dosyaları --env staging ile TAMAMEN farklı bir sunucuya GİDEBİLİR.", en: "The --env dev flag DETERMINES which environment variable set (baseUrl, token, etc.) gets used — the SAME .bru files can HIT a COMPLETELY different server with --env staging." } },
    { id: 5, icon: '5️⃣', label: { tr: 'Üç komut da AYNI .bru dosyalarını…', en: 'All three commands read the SAME…' }, detail: { tr: "Üç komut da AYNI .bru dosyalarını okur, sadece KAPSAMLARI farklıdır — bu, Java'da tek bir test metodu, bir test class'ı veya TÜM test suite'ini ÇALIŞTIRMAK arasındaki farka BENZER.", en: "All three commands read the SAME .bru files, only their SCOPE differs — this RESEMBLES the difference between running ONE Java test method, a test class, or the WHOLE test suite." } },
  ],
}

const brunoReportersStep = {
  type: 'step-animation',
  id: 'bruno-reporters-step-01',
  title: { tr: '--reporter-junit Neden CI İçin, --reporter-html Neden İnsan İçin?', en: 'Why Is --reporter-junit for CI, and --reporter-html for Humans?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'bru run --env dev --reporter-junit results.xml…', en: 'bru run --env dev --reporter-junit results.xml…' }, detail: { tr: "bru run --env dev --reporter-junit results.xml çalıştırıldığında, SONUÇLAR JUnit XML FORMATINDA bir dosyaya YAZILIR — bu format Java dünyasından GELİR ve HEMEN HEMEN her CI aracı (Jenkins, GitHub Actions) bunu NATIVE olarak OKUYABİLİR.", en: "Running bru run --env dev --reporter-junit results.xml WRITES the results into a JUnit XML FORMATTED file — this format COMES from the Java world and ALMOST every CI tool (Jenkins, GitHub Actions) can read it NATIVELY." } },
    { id: 2, icon: '2️⃣', label: { tr: 'CI aracı bu XML\'i OKUYUNCA…', en: 'Once the CI tool READS this XML…' }, detail: { tr: "CI aracı bu XML'i OKUYUNCA, hangi testin GEÇTİĞİNİ/BAŞARISIZ olduğunu PR ekranında veya build panosunda GÖRSEL bir ÖZET olarak GÖSTEREBİLİR — ham terminal logunu OKUMANA gerek KALMAZ.", en: "Once the CI tool READS this XML, it can SHOW which test PASSED/FAILED as a VISUAL summary right on the PR screen or build dashboard — you don't NEED to READ the raw terminal log." } },
    { id: 3, icon: '3️⃣', label: { tr: '--reporter-html report.html ise…', en: '--reporter-html report.html instead…' }, detail: { tr: "--reporter-html report.html ise TAMAMEN farklı bir hedef için TASARLANMIŞTIR: bir İNSANIN tarayıcıda AÇIP OKUYACAĞI, renkli ve GEZİLEBİLİR bir rapor ÜRETİR.", en: "--reporter-html report.html instead is DESIGNED for a COMPLETELY different target: it PRODUCES a colorful, browsable report meant for a HUMAN to OPEN in a browser." } },
    { id: 4, icon: '4️⃣', label: { tr: '--reporter-json results.json…', en: '--reporter-json results.json…' }, detail: { tr: "--reporter-json results.json, ham SONUÇLARI yapılandırılmış bir veri FORMATINDA verir — bunu KENDİ dashboard'una veya BAŞKA bir aracın veri işleme HATTINA BESLEYEBİLİRSİN.", en: "--reporter-json results.json gives the raw RESULTS in a structured data FORMAT — you can FEED this into YOUR OWN dashboard or ANOTHER tool's data pipeline." } },
    { id: 5, icon: '5️⃣', label: { tr: 'Aynı bru run komutuna BİRDEN FAZLA…', en: 'Adding MULTIPLE --reporter flags…' }, detail: { tr: "Aynı bru run komutuna BİRDEN FAZLA --reporter bayrağı EKLEYEREK, TEK bir çalıştırmadan üç FARKLI formatta rapor AYNI ANDA ÜRETEBİLİRSİN — CI için XML, insan için HTML, dashboard için JSON.", en: "Adding MULTIPLE --reporter flags to the SAME bru run command lets you PRODUCE three DIFFERENT report formats from ONE run AT ONCE — XML for CI, HTML for humans, JSON for a dashboard." } },
  ],
}

const brunoTestAutomationPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-test-automation',
  id: 'bruno-test-automation-practice-01',
  label: {
    tr: 'Micro Lab: post-response script\'e bir test ekle',
    en: 'Micro Lab: Add a test to the post-response script',
  },
  language: 'javascript',
  task: {
    tr: 'Response gelen kullanıcı listesinin boş olmadığını doğrulayan bir test yazman gerekiyor. TODO satırını, users.length\'in 0\'dan büyük olduğunu kontrol eden expect() ile tamamla.',
    en: 'You need to write a test verifying the returned user list is not empty. Complete the TODO line with an expect() that checks users.length is greater than 0.',
  },
  explanation: {
    tr: 'Bu gercek bir JS runtime\'i degil; amac Bruno\'nun test()/expect() sozdizimini (Postman\'in pm.test()\'ine denk) elle yazarak pekistirmek.',
    en: 'This is not a real JS runtime; the goal is to reinforce Bruno\'s test()/expect() syntax (the counterpart of Postman\'s pm.test()) by writing it yourself.',
  },
  code: {
    tr: `const users = res.getBody();\n\n// TODO: kullanici listesi bos olmamali\ntest("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});`,
    en: `const users = res.getBody();\n\n// TODO: the user list must not be empty\ntest("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});`,
  },
  starterCode: {
    tr: `const users = res.getBody();\n\n// TODO: kullanici listesi bos olmamali\n`,
    en: `const users = res.getBody();\n\n// TODO: the user list must not be empty\n`,
  },
  solutionCode: {
    tr: `const users = res.getBody();\n\n// TODO: kullanici listesi bos olmamali\ntest("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});`,
    en: `const users = res.getBody();\n\n// TODO: the user list must not be empty\ntest("user list is not empty", function() {\n  expect(users.length).to.be.above(0);\n});`,
  },
  expected: 'expect(users.length).to.be.above(0)',
}

// 🛠️ Real World — bru CLI'nin CI'da bir collection çalıştırma akışı
const brunoCliCiRunFilm = {
  type: 'video-scene',
  id: 'bruno-cli-ci-run-film',
  title: {
    tr: '🎬 git push\'tan bru run\'a: CI Bir Koleksiyonu Nasıl Çalıştırır?',
    en: '🎬 From git push to bru run: How CI Runs a Collection',
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'dev',    emoji: '👩‍💻', label: { tr: 'Geliştirici',        en: 'Developer' },       color: '#0ea5e9' },
    { id: 'push',   emoji: '📤', label: { tr: 'git push',            en: 'git push' },        color: '#6366f1' },
    { id: 'runner', emoji: '🤖', label: { tr: 'GitHub Actions Runner', en: 'GitHub Actions Runner' }, color: '#f59e0b' },
    { id: 'cli',    emoji: '💻', label: { tr: 'bru CLI Kurulumu',     en: 'bru CLI Install' },  color: '#8b5cf6' },
    { id: 'run',    emoji: '🏃', label: { tr: 'bru run --env staging', en: 'bru run --env staging' }, color: '#22c55e' },
    { id: 'gate',   emoji: '🚧', label: { tr: 'Deploy Gate',          en: 'Deploy Gate' },      color: '#10b981' },
    { id: 'block',  emoji: '🚫', label: { tr: 'Merge Bloke',          en: 'Merge Blocked' },    color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Geliştirici, hem backend kodunu hem de ilgili .bru koleksiyonunu içeren bir commit\'i push\'lar. Aynı pull request\'te ikisi de var.',
        en: 'The developer pushes a commit containing both the backend code and the related .bru collection. Both live in the same pull request.',
      },
      code: { tr: `git push origin feature/orders-api`, en: `git push origin feature/orders-api` },
      positions: {
        dev: { x: 14, y: 50, scale: 1.05 },
        push: { x: 38, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'dev', to: 'push' }],
    },
    {
      caption: {
        tr: 'Adım 1 — GitHub Actions, pull_request event\'ini yakalar ve temiz bir ubuntu-latest runner ayağa kaldırır. Bu runner\'da HİÇBİR önceki state yoktur.',
        en: 'Step 1 — GitHub Actions catches the pull_request event and spins up a clean ubuntu-latest runner. This runner has NO prior state.',
      },
      positions: {
        push: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        runner: { x: 46, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'push', to: 'runner', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — checkout adımı .bru dosyalarını da çeker (onlar da sadece kod), sonra `npm install -g @usebruno/cli` CLI\'yi kurar.',
        en: 'Step 2 — the checkout step also pulls in the .bru files (they\'re just code too), then `npm install -g @usebruno/cli` installs the CLI.',
      },
      code: { tr: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli`, en: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli` },
      positions: {
        runner: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        cli: { x: 48, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'runner', to: 'cli', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — `bru run --env staging --reporter-junit results.xml` tüm koleksiyonu terminalden çalıştırır — GUI\'ye hiç ihtiyaç yok.',
        en: 'Step 3 — `bru run --env staging --reporter-junit results.xml` runs the whole collection from the terminal — no GUI needed at all.',
      },
      positions: {
        cli: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        run: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'cli', to: 'run', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — her assertion geçerse exit code 0 döner, deploy gate açılır ve PR merge edilebilir hale gelir.',
        en: 'Step 4 — if every assertion passes, exit code 0 returns, the deploy gate opens, and the PR becomes mergeable.',
      },
      positions: {
        run: { x: 26, y: 50, opacity: 0.5, scale: 0.85 },
        gate: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'run', to: 'gate', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — bir assertion fail etseydi ("user_name" yerine "userName" beklendiği için): exit code 1 döner, GitHub bu job\'u kırmızıya boyar ve "Merge" butonu FİZİKSEL olarak devre dışı kalır.',
        en: 'Final (the contrast) — had one assertion failed (because it expected "userName" instead of "user_name"): exit code 1 returns, GitHub paints this job red, and the "Merge" button becomes PHYSICALLY disabled.',
      },
      positions: {
        run: { x: 20, y: 30, scale: 0.9 },
        gate: { x: 46, y: 55, scale: 1.0, opacity: 0.4 },
        block: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'run', to: 'block', color: '#ef4444' }],
    },
  ],
}

const brunoPrReviewSteps = {
  type: 'step-animation',
  id: 'bruno-pr-review-steps',
  title: { tr: 'Adım Adım: Bir Breaking Change Merge\'den Önce Nasıl Yakalanır?', en: 'Step by Step: How a Breaking Change Is Caught Before Merge' },
  steps: [
    { id: 1, icon: '✏️', label: { tr: 'Backend değişir', en: 'Backend changes' }, detail: { tr: 'Bir gelistirici response field\'ini "userName"den "user_name"e cevirir, QA\'ya haber vermeden.', en: 'A developer renames a response field from "userName" to "user_name", without telling QA.' } },
    { id: 2, icon: '🧾', label: { tr: 'Aynı PR\'de görünür', en: 'It shows up in the same PR' }, detail: { tr: '.bru assertion dosyasi ayni repo\'da oldugu icin, PR diff\'i API degisikligini VE eski assertion\'in guncellenmedigini birlikte gosterir.', en: 'Because the .bru assertion file lives in the same repo, the PR diff shows the API change AND that the old assertion was never updated.' } },
    { id: 3, icon: '👀', label: { tr: 'Reviewer boşluğu görür', en: 'The reviewer spots the gap' }, detail: { tr: 'Insan reviewer, "assertion hala eski field adini bekliyor" seklinde bir yorum birakabilir.', en: 'The human reviewer can leave a comment like "the assertion still expects the old field name".' } },
    { id: 4, icon: '🤖', label: { tr: 'CI fiziksel olarak fail eder', en: 'CI physically fails' }, detail: { tr: 'Insan yorum birakmasa bile bru run, eski assertion\'in yeni field ile eslesmedigini gorup exit code 1 doner.', en: 'Even if no human comments, bru run sees the old assertion doesn\'t match the new field and returns exit code 1.' } },
    { id: 5, icon: '🔧', label: { tr: 'Doğru düzeltme', en: 'The right fix' }, detail: { tr: 'Assertion\'i SILMEK yerine yeni field adiyla GUNCELLEMEK ve baska tuketen servis olup olmadigini sormak dogru refleks.', en: 'The right reflex is UPDATING the assertion to the new field name — not deleting it — and asking whether any other consumer depends on the old name.' } },
  ],
}

const brunoRealWorldPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-real-world',
  id: 'bruno-real-world-practice-01',
  label: {
    tr: 'Micro Lab: CI\'da bru run\'ı JUnit raporuyla çalıştır',
    en: 'Micro Lab: Run bru run in CI with a JUnit report',
  },
  language: 'yaml',
  task: {
    tr: 'GitHub Actions job\'ında CLI kurulu ama koşum adımı eksik. TODO satırını, staging environment\'ında JUnit raporu üreten bru run komutuyla tamamla.',
    en: 'The GitHub Actions job has the CLI installed but the run step is missing. Complete the TODO line with the bru run command that produces a JUnit report against the staging environment.',
  },
  explanation: {
    tr: 'Bu gercek bir CI calistirmasi degil; amac CI\'da bru run\'i dogru flag\'lerle (--env, --reporter-junit) yazma refleksini pekistirmek.',
    en: 'This is not a real CI run; the goal is to reinforce writing bru run in CI with the correct flags (--env, --reporter-junit) yourself.',
  },
  code: {
    tr: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: staging ortaminda calistir, JUnit raporu uret\n- run: bru run --env staging --reporter-junit results.xml`,
    en: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: run against staging, produce a JUnit report\n- run: bru run --env staging --reporter-junit results.xml`,
  },
  starterCode: {
    tr: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: staging ortaminda calistir, JUnit raporu uret\n`,
    en: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: run against staging, produce a JUnit report\n`,
  },
  solutionCode: {
    tr: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: staging ortaminda calistir, JUnit raporu uret\n- run: bru run --env staging --reporter-junit results.xml`,
    en: `- uses: actions/checkout@v4\n- run: npm install -g @usebruno/cli\n# TODO: run against staging, produce a JUnit report\n- run: bru run --env staging --reporter-junit results.xml`,
  },
  expected: 'bru run --env staging --reporter-junit results.xml',
}

// 🔗 Ecosystem — offline-first / dosya-tabanlı mimari vs Postman'ın bulut modeli
const brunoOfflineFirstFilm = {
  type: 'video-scene',
  id: 'bruno-offline-first-film',
  title: {
    tr: '🎬 Uçakta Wi-Fi Yok: Offline-First Mimari Testte',
    en: '🎬 No Wi-Fi on the Plane: Offline-First Architecture in Action',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'qa',    emoji: '👩‍💻', label: { tr: 'QA Mühendisi',     en: 'QA Engineer' },     color: '#0ea5e9' },
    { id: 'disk',  emoji: '💾', label: { tr: '.bru Dosyaları (Disk)', en: '.bru Files (Disk)' }, color: '#6366f1' },
    { id: 'app',   emoji: '📦', label: { tr: 'Bruno App',        en: 'Bruno App' },       color: '#f59e0b' },
    { id: 'local', emoji: '🖥️', label: { tr: 'Local API Sunucusu', en: 'Local API Server' }, color: '#22c55e' },
    { id: 'cloud', emoji: '☁️', label: { tr: 'Postman Cloud',    en: 'Postman Cloud' },   color: '#8b5cf6' },
    { id: 'nowifi', emoji: '📵', label: { tr: 'İnternet Yok',    en: 'No Internet' },     color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'QA mühendisi bir uçuşta, internetsiz, ama sabahki API regresyonunu yine de çalıştırması gerekiyor.',
        en: 'A QA engineer is on a flight, no internet, but still needs to run this morning\'s API regression.',
      },
      positions: { qa: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Bruno açılır: .bru dosyaları zaten diskte, bulut bağlantısı gerektirmez. Koleksiyon anında yüklenir.',
        en: 'Step 1 — Bruno opens: the .bru files are already on disk, no cloud connection required. The collection loads instantly.',
      },
      positions: {
        qa: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        disk: { x: 40, y: 50, scale: 1.1 },
        app: { x: 62, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'qa', to: 'disk' }, { from: 'disk', to: 'app', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 2 — local API sunucusu (localhost:3000, uçakta da çalışan bir mock/test sunucusu) hedeflenir. İstek internet gerektirmez, sadece kendi makinesinde döner.',
        en: 'Step 2 — the local API server (localhost:3000, a mock/test server that runs fine on the plane too) is targeted. The request needs no internet, it just loops on the same machine.',
      },
      positions: {
        app: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        local: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'app', to: 'local', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 3 — regresyon çalışır, response gelir, assert\'ler geçer. Hiçbir noktada internete çıkma İHTİYACI olmadı.',
        en: 'Step 3 — the regression runs, the response arrives, the assertions pass. At no point was there a NEED to reach the internet.',
      },
      positions: {
        local: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        app: { x: 50, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'local', to: 'app', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — aynı senaryo Postman\'la denenseydi: koleksiyon buluta senkronize olduğu için ilk açılışta "syncing..." beklemesi ya da eski, önbelleğe alınmış bir sürümle çalışma riski doğardı — internet yoksa senkron da yoktur.',
        en: 'Final (the contrast) — had the same scenario been tried with Postman: because the collection syncs to the cloud, first launch could mean waiting on "syncing..." or risk working from a stale, cached version — no internet means no sync.',
      },
      positions: {
        qa: { x: 14, y: 30, scale: 0.9 },
        cloud: { x: 46, y: 55, scale: 1.1 },
        nowifi: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'qa', to: 'cloud' }, { from: 'cloud', to: 'nowifi', color: '#ef4444' }],
    },
  ],
}

const brunoEcosystemPluginSteps = {
  type: 'step-animation',
  id: 'bruno-ecosystem-plugin-steps',
  title: { tr: 'Adım Adım: Ekosistem Neye Bağlanır?', en: 'Step by Step: What Plugs Into the Ecosystem' },
  steps: [
    { id: 1, icon: '📮', label: { tr: 'Postman koleksiyonu import', en: 'Import a Postman collection' }, detail: { tr: 'Export edilmis Collection v2.1 JSON dosyasi, Bruno\'nun Import ozelligiyle .bru dosyalarina cevrilir.', en: 'An exported Collection v2.1 JSON file gets converted into .bru files via Bruno\'s Import feature.' } },
    { id: 2, icon: '📑', label: { tr: 'OpenAPI/Swagger import', en: 'Import OpenAPI/Swagger' }, detail: { tr: 'Bir API spec dosyasindan, hicbir istegi elle yazmadan tam bir koleksiyon uretilir.', en: 'A full collection is generated straight from an API spec file, without typing any request by hand.' } },
    { id: 3, icon: '🧩', label: { tr: 'VS Code Extension', en: 'VS Code Extension' }, detail: { tr: '.bru dosyalarini syntax highlight ile editorde gormeni saglar — Bruno app\'ini acmadan hizli bir bakis.', en: 'Lets you view .bru files with syntax highlighting right in the editor — a quick peek without opening the Bruno app.' } },
    { id: 4, icon: '🔗', label: { tr: 'GraphQL / gRPC / WebSocket', en: 'GraphQL / gRPC / WebSocket' }, detail: { tr: 'REST disina cikan protokoller icin de ayni .bru dosya modeli kullanilir — tek bir mental model her yerde gecerli.', en: 'The same .bru file model is used for protocols beyond REST — one mental model applies everywhere.' } },
    { id: 5, icon: '☁️', label: { tr: 'Bruno Cloud (opsiyonel)', en: 'Bruno Cloud (optional)' }, detail: { tr: 'Ekip senkronu isteyenler icin opsiyonel ucretli katman — ayni .bru dosyalarinin UZERINE eklenir, onlari degistirmez.', en: 'An optional paid layer for teams wanting sync — it sits ON TOP of the same .bru files, it doesn\'t replace them.' } },
  ],
}

const brunoEcosystemPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-ecosystem',
  id: 'bruno-ecosystem-practice-01',
  label: {
    tr: 'Micro Lab: Postman koleksiyonunu Bruno\'ya taşı',
    en: 'Micro Lab: Migrate a Postman collection to Bruno',
  },
  language: 'text',
  task: {
    tr: '80 isteklik bir Postman koleksiyonunu elle yeniden yazmadan taşıman gerekiyor. TODO satırını, doğru göç sırasını yazan iki adımla tamamla.',
    en: 'You need to migrate an 80-request Postman collection without retyping it by hand. Complete the TODO line with the two steps of the correct migration order.',
  },
  explanation: {
    tr: 'Bu gercek bir import islemi degil; amac Postman -> Bruno gocunde dogru sirayi (export sonra import) elle yazarak pekistirmek.',
    en: 'This is not a real import operation; the goal is to reinforce the correct order for a Postman -> Bruno migration (export, then import) by writing it yourself.',
  },
  code: {
    tr: `# TODO: 80 istegi elle yeniden yazmadan tasi\n# 1) Postman: collection menu -> Export -> Collection v2.1 (JSON)\n# 2) Bruno: Import Collection -> "Postman Collection" -> JSON dosyasini sec`,
    en: `# TODO: migrate 80 requests without retyping them by hand\n# 1) Postman: collection menu -> Export -> Collection v2.1 (JSON)\n# 2) Bruno: Import Collection -> "Postman Collection" -> select the JSON file`,
  },
  starterCode: {
    tr: `# TODO: 80 istegi elle yeniden yazmadan tasi\n`,
    en: `# TODO: migrate 80 requests without retyping them by hand\n`,
  },
  solutionCode: {
    tr: `# TODO: 80 istegi elle yeniden yazmadan tasi\n# 1) Postman: collection menu -> Export -> Collection v2.1 (JSON)\n# 2) Bruno: Import Collection -> "Postman Collection" -> JSON dosyasini sec`,
    en: `# TODO: migrate 80 requests without retyping them by hand\n# 1) Postman: collection menu -> Export -> Collection v2.1 (JSON)\n# 2) Bruno: Import Collection -> "Postman Collection" -> select the JSON file`,
  },
  expected: 'Export -> Collection v2.1 (JSON) -> Bruno Import Collection',
}

// 🚨 Common Errors — {{baseUrl}} çözülemedi hatasının teşhis akışı
const brunoEnvVarErrorFilm = {
  type: 'video-scene',
  id: 'bruno-envvar-error-film',
  title: {
    tr: '🎬 "Could not resolve variable": Bir Hatanın Teşhisi',
    en: '🎬 "Could not resolve variable": Diagnosing an Error',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'send',   emoji: '📤', label: { tr: 'Send Tıklandı',        en: 'Send Clicked' },       color: '#0ea5e9' },
    { id: 'error',  emoji: '🚨', label: { tr: 'Could not resolve variable', en: 'Could not resolve variable' }, color: '#ef4444' },
    { id: 'dropdown', emoji: '🔽', label: { tr: 'Environment Dropdown', en: 'Environment Dropdown' }, color: '#f59e0b' },
    { id: 'file',   emoji: '📄', label: { tr: 'dev.bru Dosyası',      en: 'dev.bru File' },       color: '#8b5cf6' },
    { id: 'fixed',  emoji: '✅', label: { tr: 'baseUrl Çözüldü',      en: 'baseUrl Resolved' },  color: '#10b981' },
    { id: 'typo',   emoji: '👻', label: { tr: 'baseURL (yanlış case)', en: 'baseURL (wrong case)' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '"Send" tıklanır ama Response paneli yerine kırmızı bir hata çıkar: "Could not resolve variable {{baseUrl}}".',
        en: '"Send" is clicked, but instead of the Response panel, a red error appears: "Could not resolve variable {{baseUrl}}".',
      },
      code: { tr: `Error: Could not resolve variable "{{baseUrl}}"`, en: `Error: Could not resolve variable "{{baseUrl}}"` },
      positions: {
        send: { x: 20, y: 50, scale: 1.05 },
        error: { x: 50, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'send', to: 'error', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 1 — teşhis Bruno\'yu yeniden kurmak DEĞİL, sağ üstteki Environment dropdown\'a bakmakla başlar: "No Environment" mi seçili?',
        en: 'Step 1 — diagnosis does NOT start with reinstalling Bruno, it starts by checking the top-right Environment dropdown: is "No Environment" selected?',
      },
      positions: {
        error: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        dropdown: { x: 46, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'error', to: 'dropdown' }],
    },
    {
      caption: {
        tr: 'Adım 2 — doğru environment ("dev") seçilir. Şimdi asıl soru: dev.bru dosyasında baseUrl gerçekten TANIMLI mı?',
        en: 'Step 2 — the correct environment ("dev") is selected. Now the real question: is baseUrl actually DEFINED in dev.bru?',
      },
      positions: {
        dropdown: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        file: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dropdown', to: 'file', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — dosya açılır: baseUrl: https://api-dev.example.com satırı gerçekten var. Environment doğru seçiliyken bu artık çözülür.',
        en: 'Step 3 — the file opens: the line baseUrl: https://api-dev.example.com is indeed there. With the environment correctly selected, this now resolves.',
      },
      positions: {
        file: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        fixed: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'file', to: 'fixed', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — dosyada değişken "baseURL" (büyük harf) olarak yazılsaydı: {{baseUrl}} yine ÇÖZÜLEMEZDİ çünkü Bruno değişken adlarında BÜYÜK/küçük harfe duyarlıdır — bir tek harf farkı aynı hatayı tekrar üretir.',
        en: 'Final (the contrast) — had the variable in the file been written as "baseURL" (capitalized): {{baseUrl}} would STILL fail to resolve, because Bruno is case-sensitive about variable names — a single-letter casing mismatch reproduces the exact same error.',
      },
      positions: {
        file: { x: 20, y: 30, scale: 0.9 },
        fixed: { x: 46, y: 55, scale: 1.0, opacity: 0.4 },
        typo: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'file', to: 'typo', color: '#ef4444' }],
    },
  ],
}

const brunoErrorDiagnosisSteps = {
  type: 'step-animation',
  id: 'bruno-error-diagnosis-steps',
  title: { tr: 'Adım Adım: Bruno Hata Teşhis Refleksi', en: 'Step by Step: The Bruno Error Diagnosis Reflex' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Mesajı tam oku', en: 'Read the full message' }, detail: { tr: '"Could not resolve" bir degisken sorunudur, "ECONNREFUSED" bir sunucu sorunudur, "Unexpected token" bir syntax sorunudur — ilk kelime kok nedeni zaten soyler.', en: '"Could not resolve" is a variable problem, "ECONNREFUSED" is a server problem, "Unexpected token" is a syntax problem — the first phrase already states the root cause.' } },
    { id: 2, icon: '🔽', label: { tr: 'Environment\'ı kontrol et', en: 'Check the environment' }, detail: { tr: 'Degisken hatalarinin cogu, sag ustteki dropdown\'da yanlis/hic environment secili olmasindan kaynaklanir.', en: 'Most variable errors come from the wrong (or no) environment being selected in the top-right dropdown.' } },
    { id: 3, icon: '📄', label: { tr: 'Dosyayı aç, tanımı doğrula', en: 'Open the file, confirm the definition' }, detail: { tr: 'Environment dogruysa, o degiskenin gercekten o dosyada tanimli oldugunu ve yazim/case hatasi olmadigini kontrol et.', en: 'If the environment is right, confirm the variable is actually defined in that file, with no typo/casing mismatch.' } },
    { id: 4, icon: '🔧', label: { tr: 'En küçük düzeltmeyi yap', en: 'Apply the smallest fix' }, detail: { tr: 'Dogru environment\'i sec ya da eksik degiskeni ekle — dosyayi silip yeniden olusturmak gibi asiri hamlelere gerek yok.', en: 'Select the right environment, or add the missing variable — no need for drastic moves like deleting and recreating the file.' } },
    { id: 5, icon: '✅', label: { tr: 'Aynı isteği tekrar gönder', en: 'Resend the same request' }, detail: { tr: '"Send"i tekrar tikla ve hatanin gercekten gittigini gor — hala ayni hata varsa teshis yanlisti, 1. adima don.', en: 'Click "Send" again and confirm the error is truly gone — if the same error persists, the diagnosis was wrong, go back to step 1.' } },
  ],
}

const brunoErrorsPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-errors',
  id: 'bruno-errors-practice-01',
  label: {
    tr: 'Micro Lab: Kapanmamış .bru bloğunu düzelt',
    en: 'Micro Lab: Fix an unclosed .bru block',
  },
  language: 'text',
  task: {
    tr: 'assert bloğu elle düzenlenirken kapanış parantezi silinmiş ve dosya "Unexpected token" hatasıyla parse edilemiyor. TODO satırını, eksik kapanış parantezini ekleyerek tamamla.',
    en: 'The assert block\'s closing brace was accidentally deleted during manual editing and the file fails to parse with "Unexpected token". Complete the TODO line by adding the missing closing brace.',
  },
  explanation: {
    tr: 'Bu gercek bir parser degil; amac .bru dosyasinin duz metin oldugunu ve tek bir kapanmamis parantezin bile parse\'i kirdigini elle duzelterek pekistirmek.',
    en: 'This is not a real parser; the goal is to reinforce that a .bru file is plain text and even one unclosed brace breaks parsing, by fixing it yourself.',
  },
  code: {
    tr: `assert {\n  res.status: eq 200\n// TODO: eksik kapanis parantezini ekle\n}`,
    en: `assert {\n  res.status: eq 200\n// TODO: add the missing closing brace\n}`,
  },
  starterCode: {
    tr: `assert {\n  res.status: eq 200\n// TODO: eksik kapanis parantezini ekle\n`,
    en: `assert {\n  res.status: eq 200\n// TODO: add the missing closing brace\n`,
  },
  solutionCode: {
    tr: `assert {\n  res.status: eq 200\n// TODO: eksik kapanis parantezini ekle\n}`,
    en: `assert {\n  res.status: eq 200\n// TODO: add the missing closing brace\n}`,
  },
  expected: 'assert { res.status: eq 200 }',
}

// 💼 Interview Q&A — DELETE idempotency testi (advanced sorularla bire bir bağlı)
const brunoIdempotentDeleteFilm = {
  type: 'video-scene',
  id: 'bruno-idempotent-delete-film',
  title: {
    tr: '🎬 Aynı DELETE İki Kez: İdempotency Testi Ne Bekler?',
    en: '🎬 The Same DELETE Twice: What Idempotency Testing Expects',
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'res1',   emoji: '1️⃣', label: { tr: '1. DELETE',          en: '1st DELETE' },        color: '#0ea5e9' },
    { id: 'srv',    emoji: '🌐', label: { tr: 'Order Sunucusu',      en: 'Order Server' },      color: '#6366f1' },
    { id: 'gone',   emoji: '🗑️', label: { tr: 'Kaynak Silindi',      en: 'Resource Deleted' },  color: '#f59e0b' },
    { id: 'res2',   emoji: '2️⃣', label: { tr: '2. DELETE',          en: '2nd DELETE' },        color: '#8b5cf6' },
    { id: 'ok404',  emoji: '✅', label: { tr: '404 (beklenen)',      en: '404 (expected)' },   color: '#10b981' },
    { id: 'bug200', emoji: '👻', label: { tr: '200 (idempotency bug)', en: '200 (idempotency bug)' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir "delete order" akışı test ediliyor. İlk soru: aynı DELETE isteği İKİ KEZ gönderilirse ne olmalı?',
        en: 'A "delete order" flow is being tested. The first question: what should happen if the SAME DELETE request is sent TWICE?',
      },
      code: { tr: `DELETE /api/orders/{{orderId}}`, en: `DELETE /api/orders/{{orderId}}` },
      positions: { res1: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — ilk DELETE gönderilir: kaynak gerçekten var, sunucu onu siler ve 200/204 döner.',
        en: 'Step 1 — the first DELETE is sent: the resource genuinely exists, the server deletes it and returns 200/204.',
      },
      positions: {
        res1: { x: 16, y: 50, opacity: 0.5, scale: 0.85 },
        srv: { x: 44, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'res1', to: 'srv' }],
    },
    {
      caption: {
        tr: 'Adım 2 — kaynak artık gitti. bru.setVar() ile orderId saklanır ki ikinci istek AYNI ID\'yi tekrar dener, farklı bir ID değil.',
        en: 'Step 2 — the resource is now gone. bru.setVar() stores the orderId so the second request retries the SAME ID, not a different one.',
      },
      positions: {
        srv: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        gone: { x: 48, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'srv', to: 'gone', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — aynı orderId ile İKİNCİ DELETE gönderilir. Bu, gerçek idempotency testinin kalbi: kaynak zaten yokken ne dönmeli?',
        en: 'Step 3 — the SECOND DELETE is sent with the same orderId. This is the heart of a real idempotency test: what should return when the resource is already gone?',
      },
      positions: {
        gone: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        res2: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'gone', to: 'res2', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 4 — doğru davranış: 404 "Not Found". "Zaten yoktu" demek, tekrar "başarıyla silindi" demekten farklıdır — assert 404\'ü BEKLER.',
        en: 'Step 4 — the correct behavior: 404 "Not Found". Saying "it was already gone" is different from saying "successfully deleted again" — the assert EXPECTS 404.',
      },
      code: { tr: `assert {\n  res.status: eq 404\n}`, en: `assert {\n  res.status: eq 404\n}` },
      positions: {
        res2: { x: 24, y: 50, opacity: 0.5, scale: 0.85 },
        ok404: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'res2', to: 'ok404', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — bir idempotency bug\'ı olsaydı: ikinci DELETE de 200/204 dönerdi, sanki bir şey silinmiş gibi — bu, backend\'in "zaten silinmiş" durumunu HİÇ takip etmediğinin kanıtıdır ve assert bu farkı yakalamak için özellikle var.',
        en: 'Final (the contrast) — had there been an idempotency bug: the second DELETE would also return 200/204, as if something were deleted again — proof the backend NEVER tracks the "already deleted" state, and the assert exists specifically to catch this gap.',
      },
      positions: {
        res2: { x: 20, y: 30, scale: 0.9 },
        ok404: { x: 46, y: 55, scale: 1.0, opacity: 0.4 },
        bug200: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'res2', to: 'bug200', color: '#ef4444' }],
    },
  ],
}

const brunoTokenRefreshSteps = {
  type: 'step-animation',
  id: 'bruno-token-refresh-steps',
  title: { tr: 'Adım Adım: 50 İstek İçin Tek Bir Token-Refresh Yeri', en: 'Step by Step: One Token-Refresh Spot for 50 Requests' },
  steps: [
    { id: 1, icon: '🗂️', label: { tr: 'Collection-level pre-request script', en: 'Collection-level pre-request script' }, detail: { tr: 'Refresh mantigi TEK bir yere, koleksiyonun (veya ust klasorun) pre-request script\'ine konur — 50 istegin her birine kopyalanmaz.', en: 'The refresh logic is placed in ONE spot, the collection\'s (or top folder\'s) pre-request script — not copy-pasted into all 50 requests.' } },
    { id: 2, icon: '⏱️', label: { tr: 'Süresi dolmuş mu kontrol et', en: 'Check if expired' }, detail: { tr: 'bru.getVar("tokenExpiry") ile saklanan zaman damgasi okunur ve simdiki zamanla karsilastirilir.', en: 'bru.getVar("tokenExpiry") reads the stored timestamp and compares it against the current time.' } },
    { id: 3, icon: '🔄', label: { tr: 'Gerekirse yenile', en: 'Refresh if needed' }, detail: { tr: 'Suresi dolmussa, script kendi icinde bir auth istegi tetikler ve yeni token/expiry degerini bru.setVar() ile saklar.', en: 'If expired, the script fires its own auth request internally and stores the new token/expiry via bru.setVar().' } },
    { id: 4, icon: '➡️', label: { tr: 'Asıl istek devam eder', en: 'The original request proceeds' }, detail: { tr: 'Token guncel oldugu icin asil istek (orn. GET /orders) simdi gecerli bir Authorization header\'iyla gonderilir.', en: 'Because the token is now current, the original request (e.g. GET /orders) is sent with a valid Authorization header.' } },
    { id: 5, icon: '☕', label: { tr: 'Java karşılaştırması', en: 'The Java comparison' }, detail: { tr: 'Bu, ozel bir OkHttp/RestAssured interceptor\'inin yaptigi seyle aynidir — cross-cutting bir sorumluluk TEK bir yerde sahiplenilir, 50 kopyada degil.', en: 'This is the same idea as a custom OkHttp/RestAssured interceptor — one cross-cutting concern is owned in ONE place, not 50 copies.' } },
  ],
}

const brunoInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'bruno-api-client',
  id: 'bruno-interview-practice-01',
  label: {
    tr: 'Micro Lab: İkinci DELETE için idempotency assertion\'ı yaz',
    en: 'Micro Lab: Write the idempotency assertion for the second DELETE',
  },
  language: 'text',
  task: {
    tr: 'Bir mülakat senaryosu: aynı kaynağa ikinci kez DELETE gönderiliyor, kaynak zaten silinmiş durumda. TODO satırını, beklenen status\'un 404 olduğunu doğrulayan assertion ile tamamla.',
    en: 'An interview scenario: DELETE is sent a second time to the same resource, which is already deleted. Complete the TODO line with the assertion verifying the expected status is 404.',
  },
  explanation: {
    tr: 'Bu gercek bir API cagrisi degil; amac idempotency testinin kalbini (ikinci DELETE\'in 404 beklemesi) elle yazarak pekistirmek.',
    en: 'This is not a real API call; the goal is to reinforce the heart of idempotency testing (the second DELETE expects 404) by writing it yourself.',
  },
  code: {
    tr: `# senaryo: orderId zaten ilk DELETE ile silindi\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: kaynak zaten yok, 404 beklenmeli\nassert {\n  res.status: eq 404\n}`,
    en: `# scenario: orderId was already deleted by the first DELETE\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: the resource is already gone, 404 is expected\nassert {\n  res.status: eq 404\n}`,
  },
  starterCode: {
    tr: `# senaryo: orderId zaten ilk DELETE ile silindi\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: kaynak zaten yok, 404 beklenmeli\n`,
    en: `# scenario: orderId was already deleted by the first DELETE\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: the resource is already gone, 404 is expected\n`,
  },
  solutionCode: {
    tr: `# senaryo: orderId zaten ilk DELETE ile silindi\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: kaynak zaten yok, 404 beklenmeli\nassert {\n  res.status: eq 404\n}`,
    en: `# scenario: orderId was already deleted by the first DELETE\nDELETE {{baseUrl}}/orders/{{orderId}}\n\n# TODO: the resource is already gone, 404 is expected\nassert {\n  res.status: eq 404\n}`,
  },
  expected: 'res.status: eq 404',
}

export const brunoData = {
  en: {
    hero: {
      title: `📦 Bruno`,
      subtitle: `Git-Native API Client`,
      intro: `Never heard of Bruno? No problem. This page assumes zero prior knowledge and walks you from "what even is an API client" to writing automated, CI-ready API tests — comparing every step to Postman, since that's the tool most QA engineers already know.`,
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Core Concepts', '🔥 Test Automation', '🛠️ Real World', '🔗 Ecosystem', '🚨 Common Errors', '💼 Interview Q&A'],
    sections: [
      {
        title: `🎯 What is Bruno?`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: `Imagine every API request you ever send is written on its own index card. Bruno keeps those cards in a physical box that sits on YOUR desk — you can put the whole box in your backpack (Git), and if a teammate changes a card, you can literally see which line they changed. Postman, by default, keeps the cards in a rented locker across town (the cloud) — convenient, but you don't fully control it and you can't see "what changed" without asking for an export.`,
          },
          { type: 'heading', text: `Why Does a "New Postman" Even Need to Exist?` },
          {
            type: 'text',
            content: `An API client is just a tool for sending HTTP requests (GET, POST...) without writing code — useful for exploring an API, debugging a bug, and writing repeatable automated checks. Postman popularized this category over a decade ago. Bruno is a newer, open-source entrant (first released 2021) that asks one specific question: "what if the requests themselves lived as files in my project, the same way my source code does?" That single design choice — plain text files instead of a cloud database — is the whole reason Bruno exists.`,
          },
          {
            type: 'text',
            content: `Reasoning #1 — Why store requests as files instead of a database? Think about how you already trust your source code: it lives in Git, every change is diffable, and a bad change can be reverted with one command. Postman's cloud-synced collections don't get any of that for free — a collection is one opaque JSON blob behind a UI. Bruno's designers reasoned: "API tests ARE code, written by developers and QA, reviewed in pull requests — so they should be treated exactly like code." That's why .bru files sit in your repo right next to the source they test.`,
          },
          {
            type: 'diagram-svg',
            title: 'Bruno Architecture — Requests Travel With Your Git Repo',
            svg: brunoArchSvg,
          },
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `LEGO analogy #1: A Bruno collection is like a labeled LEGO storage bin you keep at home. Every brick (request) has its own little compartment (.bru file) with a sticker describing it. You can hand the whole bin to a teammate, they open it, see exactly which bricks are inside, and add their own without asking your permission first. A Postman cloud workspace is more like a LEGO set photo someone keeps on a shelf in their own house — you can look at the picture (export/import), but you're not holding the actual bricks.`,
          },
          { type: 'heading', text: `Bruno vs Postman — First Look` },
          {
            type: 'table',
            headers: ['Aspect', 'Bruno', 'Postman'],
            rows: [
              ['Where requests live', 'Plain .bru text files in your project folder', 'Cloud-synced collections (local "Scratch Pad" is limited)'],
              ['Version control', 'Native — it IS your Git repo', 'Manual export/import as JSON'],
              ['Works offline', 'Fully, by design', 'Mostly, but login/sync can require internet'],
              ['Price', 'Free and open-source for core features', 'Free tier limited; Pro/Enterprise paid'],
              ['CLI runner', 'bru CLI (npm install -g @usebruno/cli)', 'Newman (npm install -g newman)'],
              ['Best for', 'Git-heavy teams, privacy-sensitive projects, CI/CD-first workflows', 'Large enterprise teams needing hosted docs, mock servers, monitoring'],
            ],
          },
          {
            type: 'text',
            content: `Reasoning #2 — If Bruno is "better" for Git workflows, why do so many companies still pay for Postman? Because Bruno deliberately did NOT try to rebuild Postman's entire platform. Postman also offers hosted API documentation, uptime monitoring, a public API marketplace, and enterprise governance — things a small Git repo can't replicate. The trade-off is real: Bruno optimizes for "developers and QA who live in the terminal and in pull requests," while Postman optimizes for "an entire organization, including non-technical stakeholders, collaborating in one cloud workspace." Picking one is a team-fit decision, not a strictly-better-or-worse one.`,
          },
          {
            type: 'simple-box',
            emoji: '🧩',
            content: `LEGO analogy #2: Postman's cloud workspace is like a LEGO display case in a shared community center — anyone in the building can walk up and admire the set, leave comments, even request changes through a front desk (the cloud API). That's powerful for big, mixed audiences. Bruno's bin-at-your-desk model is faster and more private, but there's no shared display case — if a non-technical product manager wants to "see the API tests," they need someone to walk them through the Git repo.`,
          },
          brunoBruDiffFilm,
          brunoFileVsCloudSteps,
          brunoWhatIsPractice,
          {
            type: 'quiz',
            question: `You want every API test to be committed alongside the backend code it tests, diffable in the same pull request, with zero extra cloud account required. Which tool's default storage model fits this requirement?`,
            options: [
              { id: 'a', text: 'Postman — collections sync to the cloud automatically' },
              { id: 'b', text: 'Bruno — requests are saved as .bru files inside your project directory' },
              { id: 'c', text: 'Neither — API tests cannot be version-controlled' },
              { id: 'd', text: 'curl scripts only, since GUI tools never support Git' },
            ],
            correct: 'b',
            explanation: `Bruno stores each request as a plain .bru text file directly inside your project folder, so it's automatically part of any Git commit and visible in pull request diffs with no extra steps. Postman's default behavior is cloud sync, which requires a manual export to get a JSON file into your repo — and that export quickly goes stale as the team keeps editing in the cloud.`,
            retryQuestion: {
              question: `A teammate asks: "If Bruno just uses text files, can't I get the same Git-tracking benefit by exporting my Postman collection to JSON and committing that file once?"`,
              options: [
                { id: 'a', text: 'Yes, and it stays in sync automatically forever after that one export' },
                { id: 'b', text: 'No — that one-time exported JSON immediately starts drifting from the live cloud collection the moment anyone edits it in Postman, so the committed file silently goes stale' },
                { id: 'c', text: 'No — Postman collections cannot be exported as JSON at all' },
                { id: 'd', text: 'Yes, because Postman automatically re-exports on every save' },
              ],
              correct: 'b',
              explanation: `A one-time export is a snapshot, not a live link. As soon as anyone keeps editing the collection inside Postman's cloud UI (the normal workflow), the committed JSON file in Git becomes outdated — and nothing forces anyone to remember to re-export. Bruno avoids this entirely because there is no separate "cloud copy" to drift from; the .bru file in your editor IS the same file Git tracks.`,
            },
          },
        ],
      },
      {
        title: `📦 Installation & First Request`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '⬇️',
            content: `Installing Bruno is like installing any notebook app — download it, open it, start typing. There's no database server to configure and no account you're forced to create. The only extra piece, if you want automation later, is a small command-line tool (the "CLI") that you can install with one line whenever you're ready for that step.`,
          },
          { type: 'heading', text: `Where to Download Bruno` },
          {
            type: 'installation',
            title: 'Bruno Desktop App — Windows / macOS / Linux',
            steps: [
              { cmd: 'Open usebruno.com/downloads', explanation: 'Official source. Pick the installer for your OS: .exe (Windows), .dmg (macOS), .deb/.AppImage/.snap (Linux). The GitHub releases page (github.com/usebruno/bruno/releases) hosts the exact same installers if you prefer downloading from there.' },
              { cmd: 'winget install Bruno.Bruno', explanation: 'Windows alternative if you use a package manager. Run in PowerShell. Expected output ends with "Successfully installed".' },
              { cmd: 'brew install --cask bruno', explanation: 'macOS via Homebrew. Expected output: "🍺 bruno was successfully installed!" Bruno.app then appears in Launchpad.' },
              { cmd: 'sudo snap install bruno', explanation: 'Linux via Snap. Expected output: "bruno <version> from Bruno Software installed". A .AppImage or .deb works the same way if your distro doesn\'t use Snap.' },
              { cmd: 'Launch Bruno and check Help → About', explanation: 'Verification step for ALL platforms — confirms the app opened and shows a version number, e.g. "Bruno v1.x.x". No login is required to start using it.' },
            ],
          },
          { type: 'heading', text: `Installing the CLI (Optional, for Automation Later)` },
          {
            type: 'installation',
            title: 'bru CLI — works the same on Windows, macOS and Linux',
            steps: [
              { cmd: 'npm install -g @usebruno/cli', explanation: 'Requires Node.js already installed. The -g flag makes the "bru" command available everywhere in your terminal, not just one project folder.' },
              { cmd: 'bru --version', explanation: 'Verification command. Expected output: something like "1.x.x" printed directly — if you instead see "command not found", Node\'s global npm bin folder is likely missing from your PATH (covered in Common Errors).' },
            ],
          },
          { type: 'heading', text: `Bruno's Interface — Three Panels` },
          {
            type: 'diagram-svg',
            title: 'Bruno UI — Sidebar, Request Builder, Response (labeled)',
            svg: bruUiMockupSvg,
          },
          {
            type: 'text',
            content: `① Sidebar — your collections and folders, each request shown as its own .bru file icon. ② Request builder — method + URL bar at top, then tabs for Params, Headers, Body, Vars, Script and Assert. ③ The Script/Assert area is where you write checks (more in Test Automation). ④ Response panel — status code, timing, and the response body, refreshed every time you click Send.`,
          },
          { type: 'heading', text: `Your First Request — Step by Step` },
          {
            type: 'steps',
            items: [
              { label: 'Click "Create Collection"', desc: 'Give it any name, e.g. "my-first-api-tests". This creates a real folder on disk — open it later and you\'ll see plain files.' },
              { label: 'Click "New Request"', desc: 'Method defaults to GET. Name it "Get Users".' },
              { label: 'Type the URL', desc: 'https://jsonplaceholder.typicode.com/users — a free public test API, no auth needed.' },
              { label: 'Click "Send"', desc: 'Bruno fires the HTTP request and the Response panel fills in below within a second.' },
              { label: 'Read the response', desc: 'You should see status 200 and a JSON array of 10 users.' },
            ],
          },
          {
            type: 'code',
            language: 'json',
            label: 'Expected Response (first user):',
            code: `{
  "id": 1,                          // Unique user ID
  "name": "Leanne Graham",          // Full name
  "username": "Bret",               // Login username
  "email": "Sincere@april.biz",     // Email address
  "address": { "city": "Gwenborough" }  // Nested object
}`,
            expected: 'Status: 200 OK | 10 users returned as a JSON array',
          },
          brunoInstallFirstRequestFilm,
          brunoInstallJourneySteps,
          brunoInstallationPractice,
          {
            type: 'quiz',
            question: `After clicking "Send" on your first GET request, you see a status but no body, and Bruno shows "ENOTFOUND". What's the most likely cause?`,
            options: [
              { id: 'a', text: 'Bruno is broken and needs reinstalling' },
              { id: 'b', text: 'A typo in the URL/domain — the DNS name could not be resolved' },
              { id: 'c', text: 'The Assert tab is empty' },
              { id: 'd', text: 'You forgot to create a collection first' },
            ],
            correct: 'b',
            explanation: `ENOTFOUND is a DNS resolution failure — the hostname you typed doesn't exist or has a typo (e.g. "jsonplacehlder.typicode.com"). It has nothing to do with collections or assertions; always double-check the URL first when you see this specific error.`,
            retryQuestion: {
              question: `You fix the typo, send again, and now get status 200 but the Response panel shows an empty body and 0ms... then a second later the real response appears. Is this a bug?`,
              options: [
                { id: 'a', text: 'Yes, Bruno is broken' },
                { id: 'b', text: 'No — the panel briefly shows a loading/placeholder state before the network round-trip completes; this is normal latency, not a defect' },
                { id: 'c', text: 'Yes, you must restart the app every time' },
                { id: 'd', text: 'No — 0ms always means the request failed silently' },
              ],
              correct: 'b',
              explanation: `Any HTTP client briefly shows a pending state while waiting for the server — this is normal network latency, not a Bruno defect. If the final state never arrives and it hangs indefinitely, THAT would point to a real connectivity issue worth investigating.`,
            },
          },
        ],
      },
      {
        title: `📚 Core Concepts — .bru Files, Collections & Scripting`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗂️',
            content: `A .bru file is like a single recipe card: it lists the ingredients (URL, headers, body) and the steps (any scripts), all in one short, human-readable block of text. A whole collection is just a recipe box — a folder full of these cards, organized into sub-folders the same way you'd group recipes by "breakfast" or "dinner".`,
          },
          { type: 'heading', text: `The .bru File Format` },
          {
            type: 'code',
            language: 'text',
            label: 'collections/users/get.bru — what a real request file looks like:',
            code: `meta {
  name: Get Users           // shown in the sidebar
  type: http
}

get {
  url: {{baseUrl}}/users    // {{ }} = environment variable, resolved at send-time
}

headers {
  Accept: application/json // sent with every request
}

assert {
  res.status: eq 200        // no script needed for simple checks
}

script:post-response {
  // for anything Assert can't express, write real JS here
  bru.setVar("firstUserId", res.getBody()[0].id);
}`,
          },
          { type: 'heading', text: `Project Folder Structure` },
          {
            type: 'file-tree',
            title: 'A typical Bruno collection on disk',
            tree: `my-first-api-tests/
├── bruno.json              ← collection config (auto-created)
├── environments/
│   ├── dev.bru             ← baseUrl = https://api-dev.example.com
│   └── prod.bru            ← baseUrl = https://api.example.com
├── users/
│   ├── get.bru
│   └── post.bru
└── orders/
    ├── get-by-id.bru
    └── create.bru`,
            note: `Every single file here is plain text. Open any .bru file in VS Code and you can read and even edit it without ever opening the Bruno app.`,
          },
          {
            type: 'text',
            content: `Reasoning #1 — Why does Bruno split "Assert" and "Script" into two separate tabs instead of one script box like Postman's pm.test()? Most checks are trivially simple ("is status 200?", "does body.id equal 1?") — forcing every tester to write JavaScript for that is unnecessary friction, similar to how JUnit's @Test annotation handles the common case while you only drop into custom Java code for genuinely complex assertions. The Assert tab is the low-friction path; the Script tab is there exactly when logic gets too dynamic for a simple key-operator-value row.`,
          },
          { type: 'heading', text: `Environments & Variables` },
          {
            type: 'table',
            headers: ['Concept', 'Bruno', 'Postman equivalent'],
            rows: [
              ['Switch dev/staging/prod', 'environments/dev.bru, environments/prod.bru files', 'Environment dropdown (cloud-stored)'],
              ['Use a variable in a URL', '{{baseUrl}}/users', '{{baseUrl}}/users (identical syntax)'],
              ['Set a variable at runtime', 'bru.setVar("token", value)', 'pm.environment.set("token", value)'],
              ['Read a variable at runtime', 'bru.getVar("token")', 'pm.environment.get("token")'],
            ],
          },
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `LEGO analogy: an Environment file is like a labeled tray that holds the specific-colored bricks for one build — a "dev" tray with dull gray bricks (a safe sandbox server) and a "prod" tray with shiny gold bricks (the real server). You build the exact same model (the same request) but swap which tray you pull from — you never have to rebuild the request itself just to point it somewhere else.`,
          },
          {
            type: 'text',
            content: `Reasoning #2 — why variables instead of just hardcoding the URL? If a junior tester hardcodes https://api-dev.example.com into 40 different requests, switching to staging means editing 40 files and almost certainly missing one. With {{baseUrl}}, switching environments is a single dropdown change — every request updates automatically. This is the exact same reasoning Java engineers already know from externalizing config out of hardcoded strings into application.properties.`,
          },
          brunoAnatomyFilm,
          brunoEnvVarResolutionSteps,
          brunoCoreConceptsPractice,
          {
            type: 'quiz',
            question: `You need a value computed from one request's response (e.g. an auth token) to be reused in the very next request. Which Bruno mechanism is designed for that?`,
            options: [
              { id: 'a', text: 'Hardcode the value into the next request manually each time' },
              { id: 'b', text: 'bru.setVar() in the first request\'s post-response script, then {{varName}} in the next request' },
              { id: 'c', text: 'The Assert tab only' },
              { id: 'd', text: 'It cannot be done — each request is fully isolated' },
            ],
            correct: 'b',
            explanation: `bru.setVar() (or bru.setEnvVar() for a value that should persist across runs) stores a value during a post-response script. Any later request in the same run can read it back with {{varName}} in its URL, headers or body — this is exactly how request chaining (e.g. login → use token) works.`,
            retryQuestion: {
              question: `You used bru.setVar("token", res.getBody().token) in request A, but request B's header still shows the LITERAL text "{{token}}" instead of the real value. What's the most likely mistake?`,
              options: [
                { id: 'a', text: 'bru.setVar only works for numbers, not strings' },
                { id: 'b', text: 'Request A was never actually sent before request B ran, or the script had a typo/wrong field name so it silently failed to set the variable' },
                { id: 'c', text: 'Bruno does not support variable chaining at all' },
                { id: 'd', text: 'The collection needs to be re-imported' },
              ],
              correct: 'b',
              explanation: `Variable chaining only works if the producing request actually ran first (in a folder/collection run or manually) AND the script successfully executed without errors. A common mistake is referencing the wrong response field name (e.g. res.getBody().accessToken when the API actually returns .token) — the script throws quietly and the variable is never set, so the placeholder stays literal.`,
            },
          },
        ],
      },
      {
        title: `🔥 Test Automation — Assertions, CLI & CI/CD`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '✅',
            content: `Clicking "Send" and eyeballing the response is like tasting soup once while cooking. Automated assertions are a kitchen timer and a thermometer that check the soup every single time, automatically, even at 3am when nobody's awake to taste it — that's what lets a computer (CI) decide pass/fail instead of a human.`,
          },
          { type: 'heading', text: `Writing Checks — Assert Tab vs Script Tab` },
          {
            type: 'code',
            language: 'text',
            label: 'Assert tab — no JavaScript needed:',
            code: `res.status: eq 200            // status must equal 200
res.body.email: contains @    // simple substring check
res.responseTime: lt 500      // must respond under 500ms`,
          },
          brunoAssertTabStep,
          {
            type: 'code',
            language: 'javascript',
            label: 'Script tab (post-response) — for anything more complex:',
            code: `test("user list is not empty", function() {
  const users = res.getBody();           // parsed JSON body
  expect(users.length).to.be.above(0);    // chai-style assertion
});

test("every user has a valid email", function() {
  const users = res.getBody();
  users.forEach(u => expect(u.email).to.include("@"));
});`,
          },
          {
            type: 'text',
            content: `This test()/expect() pair is Bruno's equivalent of JUnit's @Test + assertEquals(), or Postman's pm.test()/pm.expect() — same idea, different brand name. If you already know any of those, this syntax should feel immediately familiar.`,
          },
          { type: 'heading', text: `Running From the CLI — bru run` },
          {
            type: 'code',
            language: 'bash',
            label: 'Run one request, a folder, or a whole collection:',
            code: `bru run collections/users/get.bru --env dev   # single request
bru run collections/users --env dev           # whole folder
bru run --env dev                             # entire collection`,
          },
          brunoRunScopeStep,
          {
            type: 'diagram-svg',
            title: 'bru run in the Terminal — Pass/Fail Output',
            svg: bruCliSvg,
          },
          {
            type: 'text',
            content: `Notice the exit code at the bottom of that terminal output. This single detail is what makes CI/CD possible: a non-zero exit code tells any pipeline tool "something failed, stop the deploy" — no human needs to read the logs for the pipeline itself to react.`,
          },
          { type: 'heading', text: `Reports for CI: JUnit, HTML, JSON` },
          {
            type: 'code',
            language: 'bash',
            label: 'Generate a machine-readable report:',
            code: `bru run --env dev --reporter-junit results.xml   # CI tools parse this
bru run --env dev --reporter-html report.html     # for humans
bru run --env dev --reporter-json results.json    # for custom dashboards`,
          },
          brunoReportersStep,
          { type: 'heading', text: `Wiring It Into GitHub Actions` },
          {
            type: 'code',
            language: 'yaml',
            label: '.github/workflows/api-tests.yml:',
            code: `name: API Tests
on: [pull_request]
jobs:
  bruno:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4               # pulls .bru files too — they're just code
      - run: npm install -g @usebruno/cli
      - run: bru run --env staging --reporter-junit results.xml
      # if bru run exits non-zero, this job fails and blocks the PR merge`,
          },
          {
            type: 'diagram-svg',
            title: 'Full CI/CD Flow — Commit to Deploy Gate',
            svg: ciPipelineSvg,
          },
          {
            type: 'table',
            headers: ['', 'bru CLI (Bruno)', 'Newman (Postman)'],
            rows: [
              ['Install', 'npm install -g @usebruno/cli', 'npm install -g newman'],
              ['Run a collection', 'bru run --env dev', 'newman run collection.json -e env.json'],
              ['What it reads', '.bru files directly from your repo', 'Exported collection.json + environment.json'],
              ['Stays in sync with edits automatically', 'Yes — same files the GUI edits', 'No — re-export needed after every change'],
            ],
          },
          brunoTestScriptFilm,
          brunoCiExitCodeSteps,
          brunoTestAutomationPractice,
          {
            type: 'quiz',
            question: `A request passes every time you click "Send" manually in the Bruno GUI, but fails when run via "bru run" in the CI pipeline. What's the single most common root cause to check first?`,
            options: [
              { id: 'a', text: 'The CI server is broken' },
              { id: 'b', text: 'The CLI run used a different --env than the one you test with locally (e.g. staging vs dev), so baseUrl or a secret variable differs' },
              { id: 'c', text: 'bru run never actually executes scripts' },
              { id: 'd', text: 'JUnit reporters always fail intentionally' },
            ],
            correct: 'b',
            explanation: `The #1 cause of "works locally, fails in CI" for any API client is an environment mismatch — wrong --env flag, a missing secret that exists locally but wasn't configured in the CI runner, or a variable that defaults differently. Always diff the exact environment file/flag used in CI against the one used locally before suspecting the tool itself.`,
            retryQuestion: {
              question: `You confirm --env staging is correct in both places, but CI still fails with "expected status 200 but got 401" while local passes. Locally you're logged in already from a previous session. What's the likely gap?`,
              options: [
                { id: 'a', text: 'bru run doesn\'t support authentication at all' },
                { id: 'b', text: 'A token/cookie set by a previous manual login persists locally (e.g. via bru.setEnvVar) but CI always starts from a clean slate, so the login/token-fetch step must run explicitly inside the CI test suite itself' },
                { id: 'c', text: 'CI servers cannot send Authorization headers' },
                { id: 'd', text: 'The staging server blocks all CI traffic by IP' },
              ],
              correct: 'b',
              explanation: `CI runners start with zero prior state every run — no leftover environment variable from yesterday's manual testing. If your suite relies on "I already logged in earlier," it must instead include an explicit login/token-fetch request as the very first step of the CLI run, storing the token with bru.setEnvVar() so subsequent requests in that same run can use it.`,
            },
          },
        ],
      },
      {
        title: `🛠️ Real World — Git Workflows & Code Review`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '👀',
            content: `Picture two QA engineers, Ada and Sam, both editing API tests for the same "orders" service in the same week. With Bruno, their changes are just two Git branches — if they touch the same file, Git shows a normal merge conflict they resolve like any code conflict. With a cloud-synced tool, whoever saves last can silently overwrite the other's edits unless the team has a separate, manual coordination process.`,
          },
          { type: 'heading', text: `API Tests Living Next to the Code` },
          {
            type: 'text',
            content: `In a typical setup, a backend repo has a tests/api/ folder containing a Bruno collection right alongside the source code it tests. When a backend developer renames a field or changes a status code, the .bru files for the affected endpoint sit in the same pull request — a reviewer sees the API change AND the test change together, instead of trusting that "someone updated Postman somewhere."`,
          },
          {
            type: 'diagram-svg',
            title: 'A Real Pull Request — Catching a Breaking Change Before Merge',
            svg: gitDiffSvg,
          },
          { type: 'heading', text: `Code Review for API Changes` },
          {
            type: 'text',
            content: `This is the practical payoff of everything in the Core Concepts tab: because a .bru file is plain text, GitHub/GitLab renders a proper diff — red line removed, green line added — exactly like a code change. A reviewer who has never opened the Bruno app can still read "this test now expects user_name instead of userName" and immediately understand the blast radius of the change, asking "did the mobile app get updated for this rename too?" before it ever reaches production.`,
          },
          {
            type: 'table',
            headers: ['Collaboration need', 'Bruno approach', 'Postman approach'],
            rows: [
              ['Review a test change before merge', 'Normal Git pull request diff', 'Manual screen-share or relying on team discipline to re-export'],
              ['Know who changed what, when', 'git log / git blame on the .bru file', 'Cloud activity log (Team plan or higher)'],
              ['Roll back a bad test change', 'git revert one commit', 'Manually restore from collection version history (if available on plan)'],
              ['Onboard a new teammate', 'git clone — they have everything instantly', 'Invite to workspace, wait for cloud sync'],
            ],
          },
          brunoCliCiRunFilm,
          brunoPrReviewSteps,
          brunoRealWorldPractice,
          {
            type: 'quiz',
            question: `A backend developer's pull request silently changes an endpoint's response field from "userName" to "user_name" without telling QA. With Bruno collections committed in the same repo, how does this typically get caught BEFORE merging to main?`,
            options: [
              { id: 'a', text: 'It can\'t be caught before merge — only after deployment when something breaks' },
              { id: 'b', text: 'The reviewer sees the .bru assertion file in the same PR diff still expecting "userName", flags the mismatch, and CI\'s bru run actually fails the build on that assertion' },
              { id: 'c', text: 'Bruno automatically renames the field back' },
              { id: 'd', text: 'QA has to manually open every endpoint in Postman every day to check' },
            ],
            correct: 'b',
            explanation: `Because the test assertion lives as a text file in the same repository, both a human reviewer (reading the diff) and CI (running bru run automatically on the PR) have a chance to catch the mismatch — the human sees the diff doesn't include an updated assertion, and the CI job physically fails because "user_name" doesn't equal what the old assertion expected. Neither safety net exists if the test lived only in a separate cloud tool nobody re-checked.`,
            retryQuestion: {
              question: `The CI job catches the failure and blocks the merge. The backend developer says "just delete the failing assertion, it's just a renamed field." What's the better response as the QA reviewer?`,
              options: [
                { id: 'a', text: 'Agree immediately and delete the assertion to unblock the PR' },
                { id: 'b', text: 'Update the assertion to check the new field name "user_name" instead of deleting it, and ask whether any other consumer (mobile app, other services) still expects the old field name' },
                { id: 'c', text: 'Block the PR forever and refuse to discuss it' },
                { id: 'd', text: 'Disable CI for this repository' },
              ],
              correct: 'b',
              explanation: `Deleting the assertion removes coverage entirely — exactly the failure mode tests exist to prevent. The correct fix is updating the assertion to match the new, intentional contract, while also using the moment to ask the broader question a rename like this should always raise: who else consumes this field, and do they need a heads-up or a versioned API instead of a silent breaking change?`,
            },
          },
        ],
      },
      {
        title: `🔗 Ecosystem`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌐',
            content: `Bruno doesn't ask you to throw away tools you already use — it plugs into them. Already have 200 requests in Postman? Import them in one step. Have an OpenAPI/Swagger spec? Generate a whole collection from it. Live in VS Code all day? There's an extension so you barely have to leave it.`,
          },
          { type: 'heading', text: `Migrating From Postman or OpenAPI` },
          {
            type: 'steps',
            items: [
              { label: 'Export your Postman collection', desc: 'In Postman: collection menu → Export → Collection v2.1 (JSON).' },
              { label: 'In Bruno: Import Collection', desc: 'Choose "Postman Collection" as the source format and select the exported JSON file.' },
              { label: 'Bruno converts requests to .bru files', desc: 'URLs, headers, bodies and even most pm.* scripts get translated automatically; complex scripts may need a manual touch-up.' },
              { label: 'Or skip Postman entirely', desc: 'Import → "OpenAPI/Swagger" to generate a full collection straight from your API\'s spec file — useful when QA starts testing a brand-new service.' },
            ],
          },
          { type: 'heading', text: `Beyond REST — Other Protocols` },
          {
            type: 'table',
            headers: ['Protocol', 'Bruno support', 'Typical use case'],
            rows: [
              ['REST / HTTP', 'Full support', 'Most everyday API testing'],
              ['GraphQL', 'Built-in, with schema introspection', 'Testing a single flexible query endpoint'],
              ['gRPC', 'Supported', 'Internal microservice-to-microservice calls'],
              ['WebSocket', 'Supported', 'Real-time/streaming endpoints (chat, live prices)'],
            ],
          },
          { type: 'heading', text: `VS Code Extension & Bruno Cloud` },
          {
            type: 'diagram-svg',
            title: 'Bruno Ecosystem — What Plugs Into What',
            svg: ecosystemSvg,
          },
          {
            type: 'text',
            content: `The VS Code extension lets you view and lightly edit .bru files with syntax highlighting right inside your editor — handy when you're already there fixing a backend bug and want to peek at the related test. Bruno Cloud is an entirely optional paid layer for teams that want some cloud convenience (shared secrets, team sync) without giving up the local-first, Git-based core — it sits on top of the same .bru files, it doesn't replace them.`,
          },
          brunoOfflineFirstFilm,
          brunoEcosystemPluginSteps,
          brunoEcosystemPractice,
          {
            type: 'quiz',
            question: `Your team has 80 existing requests in Postman and wants to switch to Bruno without retyping everything by hand. What's the correct first move?`,
            options: [
              { id: 'a', text: 'Manually recreate all 80 requests by reading the Postman UI' },
              { id: 'b', text: 'Export the Postman collection as JSON (Collection v2.1), then use Bruno\'s Import Collection feature to convert it' },
              { id: 'c', text: 'It\'s impossible — Bruno cannot read anything created in Postman' },
              { id: 'd', text: 'Ask the backend team to rewrite the API to match Bruno' },
            ],
            correct: 'b',
            explanation: `Bruno has a dedicated importer for Postman's exported Collection v2.1 JSON format, converting requests, folders, variables and most scripts automatically. This is the standard migration path and avoids hours of manual re-entry.`,
            retryQuestion: {
              question: `After importing, 75 of 80 requests work perfectly but 5 pre-request scripts throw errors referencing "pm is not defined". Why, and what's the fix?`,
              options: [
                { id: 'a', text: 'The import completely failed' },
                { id: 'b', text: 'Postman scripts use the pm.* API while Bruno scripts use the bru.* API — the importer translates simple cases automatically, but more complex pm.* calls need to be manually rewritten to their bru.* equivalent' },
                { id: 'c', text: 'Those 5 requests need to stay in Postman forever' },
                { id: 'd', text: 'Bruno does not support pre-request scripts at all' },
              ],
              correct: 'b',
              explanation: `Bruno's importer handles the common, simple pm.* patterns automatically, but the two tools have different scripting APIs (pm.* vs bru.*) under the hood, so unusual or complex scripts can fail translation. The fix is opening each failing script and swapping pm.environment.set(...) for bru.setEnvVar(...) and similar one-to-one renames — usually a quick manual pass, not a rewrite from scratch.`,
            },
          },
        ],
      },
      {
        title: `🚨 Common Errors`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚨',
            content: `Every error message is a clue, not a dead end — like a doctor reading symptoms instead of guessing. "Could not resolve variable" means "you forgot to pick an environment", "command not found" means "the tool isn't on your PATH", and "ECONNREFUSED" means "nobody picked up the phone on the other end." Learn to read the symptom and you skip straight to the cure.`,
          },
          { type: 'heading', text: `8 Real Errors You Will Hit — and How to Fix Them` },
          {
            type: 'error-dictionary',
              relatedTopicId: 'bruno-errors',
            framework: 'Bruno',
            errors: [
              {
                error: 'Could not resolve variable: {{baseUrl}}',
                fullMessage: 'Error: Could not resolve variable "{{baseUrl}}" — sent as literal text',
                cause: { tr: 'Sağ üstteki Environment seçili değil ("No Environment") veya seçili environment\'ta bu değişken tanımlı değil.', en: 'No Environment is selected in the top-right dropdown, or the selected environment does not define this variable.' },
                solution: { tr: '1) Sağ üstten doğru environment\'ı seç. 2) Environment dosyasını aç, baseUrl tanımlı mı kontrol et. 3) Yazım hatası olup olmadığına bak (baseURL vs baseUrl).', en: '1) Pick the correct environment from the top-right dropdown. 2) Open the environment file and confirm baseUrl is actually defined. 3) Check for a casing typo (baseURL vs baseUrl).' },
                codeWrong: `// No environment selected\nGET {{baseUrl}}/users\n// sent literally, request fails`,
                codeFixed: `// "dev" environment selected, baseUrl = https://api-dev.example.com\nGET {{baseUrl}}/users\n// resolves correctly`,
              },
              {
                error: 'bru: command not found',
                fullMessage: 'zsh: command not found: bru',
                cause: { tr: 'CLI npm ile global kurulmadı veya npm\'in global bin klasörü PATH\'te değil.', en: 'The CLI was not installed globally with npm, or npm\'s global bin folder is missing from PATH.' },
                solution: { tr: '1) npm install -g @usebruno/cli komutunu çalıştır. 2) npm config get prefix ile global bin klasörünü bul ve PATH\'e ekle. 3) Terminali yeniden başlat.', en: '1) Run npm install -g @usebruno/cli. 2) Run npm config get prefix to find the global bin folder and add it to PATH. 3) Restart your terminal.' },
                codeWrong: `$ bru --version\nzsh: command not found: bru`,
                codeFixed: `$ npm install -g @usebruno/cli\n$ bru --version\n1.x.x`,
              },
              {
                error: 'Script Error: bru is not defined',
                fullMessage: 'ReferenceError: bru is not defined',
                cause: { tr: 'Script yanlış sekmeye yapıştırılmış (örn. Assert yerine Script gerekiyor) veya çok eski bir CLI sürümü kullanılıyor.', en: 'The script was pasted into the wrong tab, or a very outdated CLI version is being used that predates the bru.* sandbox API.' },
                solution: { tr: '1) Script\'in Script tab\'ında olduğunu doğrula. 2) npm update -g @usebruno/cli ile CLI\'yi güncelle.', en: '1) Verify the script is actually in the Script tab. 2) Run npm update -g @usebruno/cli to update.' },
                codeWrong: `// Pasted into the wrong context\nbru.setVar("x", 1); // ReferenceError`,
                codeFixed: `// Correctly placed in Script tab (post-response)\nbru.setVar("x", 1); // works`,
              },
              {
                error: "AssertionError: expected 404 to equal 200",
                fullMessage: 'AssertionError: expected response status 404 to equal 200',
                cause: { tr: 'Endpoint yanlış yazılmış, kaynak henüz oluşturulmamış (önceki POST adımı çalışmadı) veya API endpoint\'i değişmiş.', en: 'Wrong endpoint path, the resource was never created because a prior POST step failed, or the API endpoint itself changed.' },
                solution: { tr: '1) URL\'i tarayıcıda/curl ile manuel dene. 2) Önceki adımın (örn. create) gerçekten 201 döndüğünü doğrula. 3) API değişiklik loglarına bak.', en: '1) Try the URL manually in a browser or curl. 2) Confirm the prior step (e.g. create) actually returned 201. 3) Check the API\'s changelog for a renamed route.' },
                codeWrong: `GET /api/orders/999  // order 999 was never created\n// 404 Not Found`,
                codeFixed: `POST /api/orders → 201, save id\nGET /api/orders/{{orderId}}\n// 200 OK`,
              },
              {
                error: 'self-signed certificate in certificate chain',
                fullMessage: 'Error: self signed certificate in certificate chain',
                cause: { tr: 'Lokal veya staging sunucusu kendinden imzalı SSL sertifikası kullanıyor.', en: 'The local or staging server uses a self-signed SSL certificate.' },
                solution: { tr: '1) Sadece güvenilir, dış erişimi olmayan staging ortamlarında Settings → "Verify SSL" seçeneğini kapat. 2) Daha iyisi: staging sunucusuna gerçek/internal CA sertifikası kur.', en: '1) Only for trusted, non-public staging environments, disable "Verify SSL" in Settings. 2) Better long-term: install a real or internal-CA certificate on the staging server instead.' },
                codeWrong: `GET https://staging.internal/health\n// self signed certificate in certificate chain`,
                codeFixed: `// Settings → Verify SSL OFF (trusted internal staging only)\nGET https://staging.internal/health\n// 200 OK`,
              },
              {
                error: 'connect ECONNREFUSED 127.0.0.1:3000',
                fullMessage: 'Error: connect ECONNREFUSED 127.0.0.1:3000',
                cause: { tr: 'Lokal API sunucusu çalışmıyor, yanlış port kullanılıyor veya henüz tam başlamadı.', en: 'The local API server is not running, the wrong port is configured, or it hasn\'t finished starting up yet.' },
                solution: { tr: '1) Sunucuyu başlat (npm run dev / mvn spring-boot:run vb.). 2) Doğru portu kontrol et. 3) Sunucu loglarında "listening on port" satırını gör.', en: '1) Start the server (npm run dev / mvn spring-boot:run, etc.). 2) Double-check the configured port. 3) Look for a "listening on port" line in the server logs before retrying.' },
                codeWrong: `GET http://localhost:3000/health\n// ECONNREFUSED — server not started`,
                codeFixed: `$ npm run dev\nServer listening on port 3000\nGET http://localhost:3000/health\n// 200 OK`,
              },
              {
                error: '.bru file fails to parse — Unexpected token',
                fullMessage: 'Error parsing collections/users/get.bru: Unexpected token at line 12',
                cause: { tr: '.bru dosyası elle düzenlenirken bir parantez/blok kapatılmamış, ya da Git merge conflict işaretleri (<<<<<<<) dosyada kalmış.', en: 'A brace/block was left unclosed during manual editing, or leftover Git merge-conflict markers (<<<<<<<) are still in the file.' },
                solution: { tr: '1) Dosyayı bir editörde aç, eksik } parantezini bul. 2) Git merge conflict işaretlerini temizle. 3) Bruno UI üzerinden düzenleyip kaydetmek genelde daha güvenlidir.', en: '1) Open the file in an editor and find the missing closing brace. 2) Remove any leftover Git merge-conflict markers. 3) Editing and saving through the Bruno UI is usually safer than hand-editing.' },
                codeWrong: `assert {\n  res.status: eq 200\n// missing closing brace`,
                codeFixed: `assert {\n  res.status: eq 200\n}`,
              },
              {
                error: 'Newman-style CI failure: exit code 1 with no clear reason',
                fullMessage: '$ bru run --env staging\n... 1 failing\nProcess completed with exit code 1.',
                cause: { tr: 'CI log\'unda hangi assertion\'ın başarısız olduğu görülmüyor çünkü --reporter-junit/html eklenmemiş, sadece terminal özeti var.', en: 'The CI log doesn\'t show which specific assertion failed because no --reporter-junit/html flag was used — only a terse terminal summary exists.' },
                solution: { tr: '1) CI komutuna --reporter-junit results.xml ekle. 2) CI aracını bu XML\'i "Test Results" sekmesinde göstermesi için ayarla. 3) Lokal olarak aynı komutu --env staging ile tekrar çalıştırıp detaylı çıktıyı oku.', en: '1) Add --reporter-junit results.xml to the CI command. 2) Configure the CI tool to surface that XML in its "Test Results" tab. 3) Reproduce locally with the exact same --env staging flag to read the detailed output.' },
                codeWrong: `bru run --env staging\n// exit code 1, no detail in CI summary`,
                codeFixed: `bru run --env staging --reporter-junit results.xml\n// CI parses results.xml and shows the exact failing assertion`,
              },
            ],
          },
          brunoEnvVarErrorFilm,
          brunoErrorDiagnosisSteps,
          brunoErrorsPractice,
          {
            type: 'quiz',
            question: `In CI, "bru run" exits with code 1 but the terminal log only shows a one-line summary with no detail about which assertion failed. What should you add to the CI command to get actionable detail?`,
            options: [
              { id: 'a', text: 'Nothing — exit code 1 is already enough information' },
              { id: 'b', text: 'A reporter flag like --reporter-junit results.xml (or --reporter-html), then have CI surface that report' },
              { id: 'c', text: 'Re-run the entire pipeline until it passes by luck' },
              { id: 'd', text: 'Switch to checking response status manually in production' },
            ],
            correct: 'b',
            explanation: `A reporter flag produces a structured report listing exactly which assertions passed and failed, with messages — without it, you only get a terse pass/fail summary. Most CI systems can render a JUnit XML report directly in their "Tests" tab, turning a vague failure into an actionable one.`,
            retryQuestion: {
              question: `With --reporter-junit added, the report now clearly shows "expected status 200 but got 401" for a request that passes locally. Locally you're authenticated from an earlier session. What's missing in CI?`,
              options: [
                { id: 'a', text: 'The reporter flag itself caused the 401' },
                { id: 'b', text: 'An explicit login/token-fetch request as the first step of the CI run, since CI starts with no prior session state' },
                { id: 'c', text: 'CI cannot send Authorization headers' },
                { id: 'd', text: 'The staging server rejects all automated traffic' },
              ],
              correct: 'b',
              explanation: `This is the same root cause covered in Test Automation: CI never carries over a manual login from a previous local session. The suite must explicitly authenticate as its own first step and store the resulting token with bru.setEnvVar() for the rest of the run to use.`,
            },
          },
        ],
      },
      {
        title: `💼 Interview Questions`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '💼',
            content: `These questions span everything above: basic onboarding knowledge, intermediate day-to-day usage and trade-offs, and advanced production/architecture scenarios. Basic ≠ "definition trivia" here — even the easy ones are framed around a real decision you'd actually make on the job.`,
          },
          {
            type: 'diagram-svg',
            title: 'Interview Lens — Read the Bruno UI Like an Interviewer Would',
            svg: bruUiMockupSvg,
          },
          brunoIdempotentDeleteFilm,
          brunoTokenRefreshSteps,
          brunoInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'bruno-api-client',
            topic: 'Bruno API Client',
            questions: [
              { level: 'basic', q: `Your team lead hands you a laptop with Bruno already installed and asks you to send your first request. Walk through exactly what you click and type to GET a list of users from a test API.`, a: `First, create or open a Collection, then click "New Request". Leave the method as GET, type the URL (e.g. https://jsonplaceholder.typicode.com/users), and click "Send". The Response panel below fills in with the status code and JSON body within a second. No login or account setup is required before any of this — that's a deliberate Bruno design choice versus Postman, which nudges you toward signing in.` },
              { level: 'basic', q: `A teammate says "just hardcode the URL into the request, it's faster." Why would you push back and use an environment variable like {{baseUrl}} instead?`, a: `Hardcoding means every single request needs manual editing when you switch from dev to staging to prod — and it's easy to miss one. With {{baseUrl}} defined in an environment file, switching environments is a single dropdown change that updates every request at once. It's the same reasoning behind externalizing config in any Java app instead of hardcoding connection strings.` },
              { level: 'basic', q: `Where exactly does Bruno store a collection you create, and why does that location matter if your team uses Git?`, a: `Bruno creates a real folder on disk containing a bruno.json config file plus one .bru text file per request. Because it's just files in a folder, you can point Git at that same folder and every request becomes part of your normal commit history — no export step needed, unlike Postman's cloud-first default.` },
              { level: 'basic', q: `You open a .bru file in a plain text editor instead of Bruno. What do you see, and is that expected?`, a: `You'd see readable plain text with sections like meta {}, get {}/post {}, headers {}, and assert {} — it's expected and intentional. .bru is a deliberately simple, human-readable format, which is exactly why Git can diff it like source code instead of treating it as an opaque binary blob.` },
              { level: 'basic', q: `What's the very first thing to check when a request fails with "Could not resolve variable {{baseUrl}}"?`, a: `Check the environment dropdown in the top-right corner — if it says "No Environment" or the wrong one is selected, {{baseUrl}} has nothing to resolve against. The fix is almost always picking the correct environment, then double-checking that environment actually defines that variable.` },
              { level: 'basic', q: `How would you organize 30 requests for a "users" and "orders" API so a new teammate can find things quickly?`, a: `Create two folders, "users" and "orders", inside the collection, and put the relevant requests in each — Bruno mirrors this as real subfolders on disk. This is the same instinct as organizing Java packages by feature instead of dumping every class in one folder.` },
              { level: 'basic', q: `You need to test a GraphQL endpoint, not a plain REST one. Does Bruno support that, and how would the request look different?`, a: `Yes — Bruno has built-in GraphQL support including schema introspection. Instead of a typical URL+method+JSON body, you write a GraphQL query/mutation in a dedicated query editor and supply variables separately, and Bruno sends it correctly formatted to the GraphQL endpoint.` },
              { level: 'basic', q: `Your manager asks you to "just run all the API tests from the terminal, not the app, because we're setting up CI." What tool do you reach for?`, a: `The bru CLI (installed via npm install -g @usebruno/cli). It reads the exact same .bru files the GUI uses — no separate export needed — and bru run --env dev runs the whole collection from a terminal, producing a pass/fail result CI can act on.` },
              { level: 'basic', q: `After running "bru run", what specific detail in the output tells a CI pipeline whether to continue or stop?`, a: `The process exit code — 0 means every assertion passed, any non-zero code (typically 1) means at least one failed. CI tools don't read prose output; they check this exit code to decide whether to block a deploy.` },
              { level: 'basic', q: `A non-technical product manager asks "can I see the API tests without installing anything?" What's the honest answer for a Bruno-based setup?`, a: `Not as easily as with a hosted tool — they'd need someone to either walk them through the Git repo's .bru files, open a generated HTML report from bru run --reporter-html, or use the optional Bruno Cloud layer if the team has it. This is a genuine trade-off versus Postman's cloud workspace, which a non-technical stakeholder can browse directly.` },
              { level: 'basic', q: `You're given an OpenAPI/Swagger spec file for a brand-new service and asked to start testing it in Bruno. What's the fastest starting point?`, a: `Use Bruno's Import → "OpenAPI/Swagger" option and point it at the spec file — it generates a full collection with requests for every documented endpoint automatically, instead of typing each one in by hand from the spec.` },
              { level: 'basic', q: `What does Bruno's Assert tab let you check WITHOUT writing any JavaScript, and when would you reach for the Script tab instead?`, a: `The Assert tab handles simple key-operator-value checks like res.status: eq 200 or res.body.email: contains @. You reach for the Script tab when the check needs real logic — looping over an array, computing a derived value, or conditional branching — things a single row can't express.` },
              { level: 'basic', q: `Can Bruno send a file upload (multipart/form-data) request, the same way you'd test an avatar-upload endpoint?`, a: `Yes — the Body tab supports a "Multipart Form" mode where you add fields and attach a file from disk, the same general workflow as Postman's form-data body type.` },
              { level: 'basic', q: `You accidentally close Bruno without saving a new request you just built. Is your work lost?`, a: `It depends — Bruno does prompt to save unsaved changes, and once a request is saved it's immediately written to its .bru file on disk (not held only in memory like an unsaved cloud draft), so the risk window is much smaller than you might expect from a typical app.` },
              { level: 'basic', q: `Why might your team specifically choose Bruno's free tier over Postman's free tier for a small 4-person QA team?`, a: `Bruno's core local-first features (collections, environments, scripting, CLI runs, Git workflow) have no usage caps because there's no cloud infrastructure cost tying them to a paid plan. Postman's free tier does work but historically has gated some collaboration and request-limit features behind paid tiers — relevant if the team is cost-sensitive and already lives in Git.` },

              { level: 'intermediate', q: `You need request A's response value available in request B (request chaining, e.g. login then use the token). Walk through exactly how you'd wire that up in Bruno.`, a: `In request A's post-response Script tab, write bru.setVar("token", res.getBody().token) — or bru.setEnvVar() if it should persist beyond a single run. Then in request B, reference {{token}} in the Authorization header or wherever it's needed. This mirrors Postman's pm.environment.set()/get() pattern almost one-to-one, just with a different namespace (bru.* instead of pm.*).` },
              { level: 'intermediate', q: `Explain Bruno's variable scope priority — if the same variable name exists in both a collection variable and an environment variable, which one wins?`, a: `Bruno resolves more specific scopes over broader ones at request time — runtime/script-set variables (bru.setVar) generally win over environment variables, which win over collection-level variables, which win over global/process variables. This is conceptually the same layered-override pattern Postman uses (local > environment > collection > global), so the mental model transfers directly if you already know Postman.` },
              { level: 'intermediate', q: `Two QA engineers both edit collections/orders/get.bru in their own Git branches and now need to merge. What actually happens, and how do they resolve a conflict?`, a: `Because .bru is plain text, Git treats it exactly like a code file — if their edits touch different lines, Git merges automatically; if they touch the same line, Git produces a normal conflict with <<<<<<< markers that they resolve by hand or with a merge tool, the same skill any developer already has. There's no special "collection merge" feature needed because it was never a special binary format to begin with.` },
              { level: 'intermediate', q: `Your team wants a JUnit report from "bru run" to show up in your CI tool's native "Tests" tab instead of just raw console output. How do you get that?`, a: `Add --reporter-junit results.xml to the bru run command, then configure the CI tool (GitHub Actions, Jenkins, GitLab CI) to publish/parse that XML file using its built-in test-report step — most CI systems already know how to render generic JUnit XML, regardless of which tool produced it.` },
              { level: 'intermediate', q: `Show the difference between asserting "status is 200" using the Assert tab versus the Script tab, and explain when you'd pick one over the other.`, a: `Assert tab: res.status: eq 200 — a single declarative row, no code, instant to write and read. Script tab: test("status is 200", function() { expect(res.getStatus()).to.equal(200) }) — more verbose but lets you combine it with other logic in the same block. Pick Assert for simple, isolated checks; pick Script when you need branching, loops, or to compute something before asserting it.` },
              { level: 'intermediate', q: `How do you avoid committing a real API key or password into Git when your .bru environment file needs one to authenticate?`, a: `Mark the variable as a "secret" in the environment editor — Bruno stores secret values in a local, gitignored secrets file separate from the regular environment file, so the environment.bru committed to Git only contains the variable's name/placeholder, never the actual value. Teammates then set their own local secret value, and CI injects its own via --env-var flags or CI secrets.` },
              { level: 'intermediate', q: `What's Bruno's equivalent of Postman's pm.test(), and how similar is the syntax really?`, a: `It's test(description, function), paired with expect() for assertions — for example test("user exists", function() { expect(res.getBody().id).to.equal(1) }). The syntax is intentionally close to Postman's pm.test()/pm.expect() (both are Mocha/Chai-flavored), specifically to make migrating existing test logic straightforward rather than a rewrite.` },
              { level: 'intermediate', q: `Your company is migrating 50 requests from Postman to Bruno. After the automated import, what's the most likely category of thing that still needs manual fixing?`, a: `Complex pre-request/post-response scripts that use Postman-specific pm.* calls without a direct Bruno equivalent, or rely on Postman-only features (like the Postman Vault or certain collection-level settings). Simple request data (URL, headers, body, basic variables) imports cleanly almost every time; it's custom JavaScript logic that occasionally needs a manual pass.` },
              { level: 'intermediate', q: `Why does running tests via the GUI's folder Runner behave differently for CI purposes than running the same folder via "bru run" in a terminal?`, a: `The GUI Runner is built for interactive human use — it's not naturally scriptable inside a headless CI container, and exit codes/automation hooks aren't really the point of a UI. bru run is built specifically to be invoked non-interactively, return a script-friendly exit code, and write machine-readable reports — that's the API surface CI integration actually depends on.` },
              { level: 'intermediate', q: `How would you validate that an entire API response matches an expected JSON structure (schema), not just one or two fields?`, a: `Write a Script tab assertion that checks each required key and type explicitly (e.g. expect(body).to.have.property("id"); expect(body.id).to.be.a("number")), or use a JSON-schema validation library bundled/available in the script sandbox if your Bruno version supports it. This catches a developer accidentally removing or retyping a field — not just the one value you happened to check manually.` },
              { level: 'intermediate', q: `A request that works fine when you click Send in the GUI fails when run via "bru run" with the exact same --env. What's a likely Bruno-specific (not generic CI) explanation?`, a: `A folder-level or collection-level pre-request script that only runs in certain execution contexts, or a script that depends on interactive state (like a previously-opened tab's leftover variable) that the GUI happened to retain but a fresh CLI run does not. Always re-test by closing and reopening the collection in the GUI too, to rule out leftover in-memory state versus a true execution-order bug.` },
              { level: 'intermediate', q: `How do you parameterize the same request to run against 20 different input rows (data-driven testing) using the CLI?`, a: `Supply an external CSV or JSON file of test data and reference it from a runner script, or loop over the dataset in a collection-level script that calls the request logic per row — the CLI's --env-var flag can also inject one-off values per invocation for simpler cases. This is conceptually identical to Postman's Collection Runner + CSV file approach, just driven from the command line instead of a GUI dialog.` },
              { level: 'intermediate', q: `What's the practical difference between a folder-level script and a request-level script, and when would you use a folder-level one?`, a: `A folder-level pre-request script runs automatically before EVERY request in that folder — ideal for shared setup like "always attach this auth header" — instead of pasting the same script into 15 individual requests. A request-level script only affects that one request, useful for something genuinely unique to it, like extracting a one-off ID nothing else needs.` },
              { level: 'intermediate', q: `How would you structure Bruno collections to test a system made of 4 separate microservices, each with its own base URL?`, a: `Either one Bruno workspace with 4 separate collections (one per service) each with its own environment files, or one collection with 4 top-level folders and a shared environment that defines a distinct baseUrl variable per service (e.g. {{usersBaseUrl}}, {{ordersBaseUrl}}). The folder approach keeps cross-service flows (e.g. create user → create order) easier to chain in one run; separate collections keep service boundaries cleaner for ownership.` },
              { level: 'intermediate', q: `Your staging server uses a self-signed certificate, and "Verify SSL" is currently off so the team can keep testing. What's the actual security trade-off being made, and when is it acceptable?`, a: `Disabling SSL verification removes protection against man-in-the-middle interception for that connection — acceptable ONLY for a trusted, non-public internal staging environment that the team controls end-to-end, never for anything touching real user data or production. The better long-term fix is installing a proper certificate (even an internal CA) on staging so this toggle never needs to be off at all.` },
              { level: 'intermediate', q: `You want backend developers AND QA to share one Bruno collection inside a monorepo. Where would you place it and why?`, a: `A tests/api/ (or similar) folder at the root of the relevant service, committed in the same repo as that service's source. This way, the same pull request that changes the API also contains the matching test change, code owners can require review on that folder specifically, and there's exactly one source of truth instead of a separate QA-only repo that drifts out of sync.` },
              { level: 'intermediate', q: `Explain how disabling a flaky assertion differs from genuinely fixing it, using a Bruno example.`, a: `Commenting out or deleting res.responseTime: lt 500 because "it sometimes fails" removes real coverage and hides a potential performance regression — it's a Band-Aid, not a fix. A genuine fix investigates why the response is sometimes slow (server-side issue, network variance, unrealistic threshold) and either fixes the root cause or sets a more realistic, evidence-based threshold — the assertion stays meaningful either way.` },
              { level: 'intermediate', q: `How would you make a Bruno collection runnable by someone who has never used Bruno before, in under 5 minutes?`, a: `Make sure environment files with sensible defaults are committed (secrets excluded), add a short README in the same folder with the exact bru run command and required setup (Node version, npm install -g @usebruno/cli), and keep request names self-explanatory. The goal is git clone → npm install -g @usebruno/cli → bru run --env dev with zero additional tribal knowledge required.` },
              { level: 'intermediate', q: `What would make you recommend AGAINST Bruno for a particular team, even knowing its Git-native advantages?`, a: `A large team with many non-technical stakeholders (product, support, sales) who need to browse, run, and discuss API requests without ever touching Git or a terminal — that audience is better served by Postman's cloud workspace and hosted documentation. Bruno's strengths assume the people touching it are comfortable with Git, which isn't universally true outside engineering and QA.` },
              { level: 'intermediate', q: `How do environment files differ from collection-level variables in terms of what they're meant to hold?`, a: `Environment variables hold values that change depending on WHERE you're pointing (dev vs staging vs prod base URLs, environment-specific credentials) — you swap the whole environment to change them all at once. Collection-level variables hold values meant to stay the same regardless of environment (a fixed API version header, a constant test username) — they don't change when you switch environments.` },

              { level: 'advanced', q: `Design a Bruno-based smoke test suite that runs automatically on every pull request for a mid-sized API. What goes in it and why?`, a: `A small, fast subset (5-10 requests) covering one critical happy-path per major resource — health check, login, create+read for the most important entity — kept under 30 seconds total runtime, run via bru run --reporter-junit in a GitHub Actions job triggered on pull_request. It deliberately excludes slow/exhaustive edge-case tests (those run on a schedule or pre-deploy instead), because a PR gate needs to be fast enough that developers don't start ignoring or skipping it.` },
              { level: 'advanced', q: `A developer's PR silently changes a response field from camelCase to snake_case. Walk through exactly how Bruno's Git-native model surfaces this before merge, compared to a Postman-cloud-only setup.`, a: `The .bru assertion file (e.g. expecting body.userName) lives in the same repo, so the PR diff shows the API change but NOT a matching assertion update — a reviewer sees that gap directly. Simultaneously, CI's bru run physically fails because the live response no longer matches the stale assertion, blocking merge automatically. In a Postman-cloud-only setup, the test lives outside the repo entirely — there's no diff to review and no CI gate tied to the PR unless someone built a separate, easily-forgotten integration for it.` },
              { level: 'advanced', q: `You're integrating "bru run" into Jenkins instead of GitHub Actions. What specifically do you rely on in the Jenkins pipeline to fail the build correctly?`, a: `Jenkins (like any CI system) inspects the shell step's exit code — bru run returns non-zero on any assertion failure, so a Jenkinsfile sh 'bru run --env staging' step naturally fails the stage without extra glue code. For better visibility, you'd also archive the --reporter-junit XML and use the junit Jenkins plugin to render it in the build's Test Result trend, the same pattern used for any other test framework's JUnit output.` },
              { level: 'advanced', q: `What are Bruno's real limitations for a 200-person enterprise organization, and when would you still recommend Postman despite Bruno's Git advantages?`, a: `Bruno has no hosted API documentation portal, no built-in mock server, no API monitoring/uptime alerting, and weaker built-in governance for who-can-edit-what across hundreds of non-technical stakeholders — all things Postman Enterprise specifically sells. If the organization needs a single platform spanning API design, hosted docs for external partners, monitoring, and engineering test automation, Postman's all-in-one platform may be worth the cost; Bruno is the better fit when the audience is primarily engineers/QA who already live in Git.` },
              { level: 'advanced', q: `Design a shared token-refresh mechanism so 50 requests across a collection don't each duplicate the same "check if expired, refresh if needed" script.`, a: `Put the refresh logic in a collection-level (or top folder-level) pre-request script, which Bruno runs automatically before every request in that scope: check a stored expiry timestamp (bru.getVar("tokenExpiry")), and if expired, fire a synchronous-style auth request and store the new token/expiry with bru.setVar() before the original request proceeds. This is the same "interceptor" pattern as a custom OkHttp/RestAssured filter in Java — one place owns the cross-cutting concern instead of 50 copies of it.` },
              { level: 'advanced', q: `How would you set up a response-time regression gate so a build fails if the API gets meaningfully slower, without being flaky on normal network jitter?`, a: `Add a Script-tab assertion checking expect(res.getResponseTime()).to.be.below(threshold) where the threshold is set generously above the historical p95 (not the average) to avoid false failures from normal variance, and run it against a stable, dedicated performance/staging environment rather than a shared noisy one. For real trend tracking, also export --reporter-json results regularly and plot response times over time externally — a single pass/fail threshold catches gross regressions but won't show gradual creep.` },
              { level: 'advanced', q: `Your CI runner is a clean, ephemeral container with no access to a developer's local Bruno secrets file. How do you supply staging credentials safely?`, a: `Store the credential in the CI platform's own secrets manager (GitHub Actions secrets, Jenkins credentials store) and inject it at run time via bru run --env-var apiKey=$STAGING_API_KEY (or an equivalent env-var flag), never committing the real value anywhere in the repo. The committed environment.bru file only ever contains the variable's name as a placeholder — the actual value is supplied per-environment, exactly like how a Java Spring app reads secrets from environment variables rather than application.properties in production.` },
              { level: 'advanced', q: `A collection has grown to 200+ requests over two years and has become hard to maintain. What's your strategy to bring it back under control?`, a: `Audit and delete genuinely dead requests against retired endpoints (Git history shows you when they last changed), reorganize into folders that mirror the current service/resource boundaries rather than historical accidents, extract repeated setup into folder-level scripts instead of duplicated request-level ones, and split an overly broad single collection into per-service collections if it now spans unrelated systems. Treat this exactly like a code refactor — small, reviewed PRs, not one giant rewrite.` },
              { level: 'advanced', q: `The GUI Collection Runner has a practical limit on how much external test data you can load for data-driven testing. How do you scale this up using the CLI?`, a: `Write a small Node.js (or shell) wrapper script that reads an external CSV/JSON file row by row and invokes bru run with --env-var flags per row (or generates a temporary environment file per row), looping as many times as needed — this isn't limited by any GUI dialog's data size constraints since it's just process invocations. For very large datasets, batch them and run in parallel CI jobs (matrix builds) to keep total runtime reasonable.` },
              { level: 'advanced', q: `Design an idempotency test strategy for a DELETE endpoint using Bruno's assertion model — what exactly do you assert, and across how many calls?`, a: `Call DELETE on the same resource twice in sequence: assert the FIRST call returns 200/204 (resource existed, now removed), then assert the SECOND call returns 404 (already gone) rather than another 200 — a true idempotency bug would be the second call also returning 200/204 as if it deleted something, or worse, a 500 error. Chain this with bru.setVar() so the second request reuses the exact same resource ID from the first, removing any ambiguity about what's actually being retried.` },
              { level: 'advanced', q: `You're choosing between Bruno and REST Assured for a Java-heavy team's API test automation. What actually decides it?`, a: `REST Assured wins when tests need to live inside the same Java/Maven build as application code, share Java utility classes and CI tooling with unit/integration tests, and run via the same mvn test command the rest of the team already uses. Bruno wins when the team wants a fast, visual GUI for exploratory testing plus a lightweight Git-tracked automation layer without requiring every API tester to write Java. Many teams pragmatically use both: Bruno for exploration and quick regression, REST Assured for deep integration tests embedded in the Java codebase.` },
              { level: 'advanced', q: `A scenario requires simulating a third-party API that doesn't exist yet, so the team can develop and test against it in parallel. Bruno doesn't have a built-in hosted mock server — what do you do?`, a: `Pair Bruno with a separate lightweight mock server tool (e.g. a local json-server, WireMock, or Prism running from the same OpenAPI spec) — Bruno simply points its baseUrl environment variable at the mock server's local address instead of the real one. This is a clean example of Bruno intentionally NOT trying to be a complete platform; you compose it with a purpose-built tool for the one feature it doesn't cover, rather than working around its absence awkwardly.` },
              { level: 'advanced', q: `Two QA engineers keep producing merge conflicts on the same large .bru collection file every week. What's the actual fix, beyond "communicate more"?`, a: `Split overly broad single files/folders along ownership lines so each engineer's typical work touches different files — e.g. one folder per resource instead of one giant flat folder — and adopt the same small-PR discipline used for application code (commit and push frequently instead of batching a week's worth of edits). Frequent small commits reduce the surface area of any single conflict, exactly like the standard advice for avoiding merge pain in any codebase.` },
              { level: 'advanced', q: `The API is moving from v1 to v2 with breaking changes, but v1 must keep working for existing clients during a transition period. How do you structure ONE Bruno collection to test both without breaking existing v1 coverage?`, a: `Create parallel folders (v1/ and v2/) each with their own requests and assertions pointed at distinct paths (/v1/users vs /v2/users) or distinct baseUrl variables per version, rather than overwriting the v1 assertions in place. This keeps v1 regression coverage fully intact while v2 development proceeds, and the folders can be deleted independently once v1 is formally retired — mirroring how the backend itself would version the API surface.` },
              { level: 'advanced', q: `A non-technical stakeholder wants to see pass/fail trends over time, not just today's CI run. What reporting strategy would you build around "bru run" to support that?`, a: `Have every CI run emit --reporter-json results.json, archive each run's JSON as a build artifact (or push it to a small results database/dashboard), and build a lightweight trend chart externally (a simple internal dashboard, or even a scheduled script appending to a spreadsheet) showing pass rate and response-time trends across builds over weeks. bru run itself is a point-in-time tool — turning its output into a trend is a deliberate reporting layer you build on top, the same way you would for any other test framework's raw results.` },
            ],
          },
          {
            type: 'glossary-section',
            terms: [
              { term: '.bru', definition: { tr: 'Bruno\'nun istekleri sakladığı düz metin dosya formatı. İnsan tarafından okunabilir, Git ile diff edilebilir.', en: 'Bruno\'s plain-text file format for storing requests. Human-readable, Git-diffable.' } },
              { term: 'bru CLI', definition: { tr: 'Koleksiyonları terminalden/CI\'dan çalıştıran araç. npm install -g @usebruno/cli ile kurulur.', en: 'The command-line tool that runs collections from a terminal/CI. Installed via npm install -g @usebruno/cli.' } },
              { term: 'Assert tab', definition: { tr: 'Kod yazmadan basit kontrol satırları eklemeye yarar (res.status: eq 200).', en: 'Lets you add simple check rows without writing code (res.status: eq 200).' } },
              { term: 'Script tab', definition: { tr: 'test()/expect() ile gerçek JavaScript mantığı yazılan sekme.', en: 'The tab where you write real JavaScript logic using test()/expect().' } },
              { term: 'bru.setVar() / bru.getVar()', definition: { tr: 'Script içinde çalışma zamanı değişkeni kaydetme/okuma — Postman\'ın pm.environment.set()/get() karşılığı.', en: 'Set/read a runtime variable inside a script — Bruno\'s equivalent of Postman\'s pm.environment.set()/get().' } },
              { term: 'Environment', definition: { tr: 'dev/staging/prod gibi ortam bazlı değişkenleri tutan .bru dosyası.', en: 'A .bru file holding environment-specific variables like dev/staging/prod.' } },
              { term: 'Newman', definition: { tr: 'Postman\'ın CLI runner\'ı — bru CLI\'nin Postman karşılığı.', en: 'Postman\'s CLI runner — the Postman equivalent of bru CLI.' } },
              { term: 'ECONNREFUSED', definition: { tr: 'Sunucu çalışmıyor veya yanlış port. Sunucunun ayakta olduğunu doğrula.', en: 'Server not running or wrong port. Verify the server is up.' } },
            ],
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: `📦 Bruno`,
      subtitle: `Git-Native API İstemcisi`,
      intro: `Bruno'yu hiç duymadın mı? Sorun değil. Bu sayfa hiçbir ön bilgi varsaymıyor — "API istemcisi nedir" sorusundan başlayıp CI'da otomatik çalışan API testleri yazmaya kadar her adımı, çoğu QA mühendisinin zaten bildiği Postman ile karşılaştırarak anlatıyor.`,
    },
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Temel Kavramlar', '🔥 Test Otomasyonu', '🛠️ Gerçek Hayat', '🔗 Ekosistem', '🚨 Yaygın Hatalar', '💼 Mülakat Q&A'],
    sections: [
      {
        title: `🎯 Bruno Nedir?`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: `Gönderdiğin her API isteğinin kendi kartına yazıldığını düşün. Bruno bu kartları SENİN masandaki bir kutuda tutar — kutunun tamamını sırt çantana (Git) koyabilirsin, bir arkadaşın bir kartı değiştirdiğinde tam olarak hangi satırı değiştirdiğini görebilirsin. Postman ise varsayılan olarak kartları şehrin öbür ucundaki kiralık bir dolapta (bulut) tutar — pratik ama tam kontrolün sende değildir, "ne değişti" sorusunun cevabını export almadan göremezsin.`,
          },
          { type: 'heading', text: `"Yeni Bir Postman"a Gerçekten İhtiyaç Var mı?` },
          {
            type: 'text',
            content: `API client (istemci), kod yazmadan HTTP isteği (GET, POST...) göndermeye yarayan bir araçtır — bir API'yi keşfetmek, bir hatayı debug etmek ve tekrarlanabilir otomatik kontroller yazmak için kullanılır. Postman on yılı aşkın süre önce bu kategoriyi popülerleştirdi. Bruno ise daha yeni, açık kaynaklı bir oyuncu (ilk sürümü 2021) ve tek bir soru soruyor: "isteklerin kendisi, kaynak kodum gibi projemin içinde dosya olarak yaşasa ne olur?" Bu tek tasarım kararı — bulut veritabanı yerine düz metin dosyaları — Bruno'nun var olma sebebinin tamamı.`,
          },
          {
            type: 'text',
            content: `Akıl Yürütme #1 — İstekler neden veritabanı yerine dosya olarak saklanıyor? Kaynak koduna zaten nasıl güvendiğini düşün: Git'te yaşar, her değişiklik diff'lenebilir, kötü bir değişiklik tek komutla geri alınabilir. Postman'ın buluta senkronize koleksiyonları bunlardan hiçbirini bedavaya almaz — koleksiyon, bir UI'nin arkasındaki opak bir JSON yığınıdır. Bruno'nun tasarımcıları şöyle düşündü: "API testleri zaten KOD'dur, geliştiriciler ve QA tarafından yazılır, pull request'lerde review edilir — o zaman tam olarak kod gibi davranılmalı." Bu yüzden .bru dosyaları, test ettikleri kaynak kodun tam yanında repo'da otururlar.`,
          },
          {
            type: 'diagram-svg',
            title: 'Bruno Mimarisi — İstekler Git Repo\'n ile Birlikte Seyahat Eder',
            svg: brunoArchSvg,
          },
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `LEGO benzetmesi #1: Bruno koleksiyonu, evde tuttuğun etiketli bir LEGO saklama kutusu gibidir. Her tuğlanın (istek) kendine ait küçük bir bölmesi (.bru dosyası) ve onu açıklayan bir etiketi vardır. Kutunun tamamını bir arkadaşına verebilirsin, açar, içinde tam olarak hangi tuğlaların olduğunu görür ve senden izin istemeden kendi tuğlasını ekleyebilir. Postman'ın bulut workspace'i ise daha çok birinin kendi evindeki rafta tuttuğu bir LEGO seti fotoğrafı gibidir — resme bakabilirsin (export/import) ama gerçek tuğlaları elinde tutmuyorsun.`,
          },
          { type: 'heading', text: `Bruno vs Postman — İlk Bakış` },
          {
            type: 'table',
            headers: ['Yön', 'Bruno', 'Postman'],
            rows: [
              ['İstekler nerede yaşar', 'Proje klasöründe düz .bru metin dosyaları', 'Buluta senkronize koleksiyonlar (yerel "Scratch Pad" sınırlı)'],
              ['Versiyon kontrolü', 'Native — zaten Git repo\'nun kendisi', 'Manuel export/import (JSON olarak)'],
              ['Çevrimdışı çalışma', 'Tasarım olarak tam destek', 'Çoğunlukla, ama login/sync internet isteyebilir'],
              ['Ücret', 'Temel özellikler için ücretsiz ve açık kaynak', 'Ücretsiz katman sınırlı; Pro/Enterprise ücretli'],
              ['CLI runner', 'bru CLI (npm install -g @usebruno/cli)', 'Newman (npm install -g newman)'],
              ['En uygun olduğu durum', 'Git-ağırlıklı ekipler, gizlilik hassasiyeti olan projeler, CI/CD-first iş akışları', 'Hosted dokümantasyon, mock server, monitoring isteyen büyük enterprise ekipler'],
            ],
          },
          {
            type: 'text',
            content: `Akıl Yürütme #2 — Bruno Git iş akışları için "daha iyi"yse, neden bu kadar çok şirket hâlâ Postman'a para ödüyor? Çünkü Bruno bilinçli olarak Postman'ın tüm platformunu yeniden inşa etmeye çalışmadı. Postman ayrıca hosted API dokümantasyonu, uptime monitoring, bir public API marketplace ve enterprise governance sunuyor — bunlar küçük bir Git repo'nun taklit edemeyeceği şeyler. Trade-off gerçek: Bruno, "terminalde ve pull request'lerde yaşayan geliştirici ve QA'lar" için optimize ederken, Postman "teknik olmayan stakeholder'lar dahil tüm bir organizasyonun aynı bulut workspace'inde işbirliği yapması" için optimize ediyor. Birini seçmek, kesin olarak "daha iyi/daha kötü" değil, ekip uyumu kararıdır.`,
          },
          {
            type: 'simple-box',
            emoji: '🧩',
            content: `LEGO benzetmesi #2: Postman'ın bulut workspace'i, paylaşımlı bir topluluk merkezindeki LEGO vitrini gibidir — binadaki herkes gelip sete bakabilir, yorum bırakabilir, hatta resepsiyon üzerinden (bulut API) değişiklik isteyebilir. Bu, büyük ve karma kitleler için güçlüdür. Bruno'nun "masandaki kutu" modeli daha hızlı ve daha özeldir ama paylaşımlı bir vitrin yoktur — teknik olmayan bir ürün yöneticisi "API testlerini görmek" istiyorsa, birinin onu Git repo'su içinde gezdirmesi gerekir.`,
          },
          brunoBruDiffFilm,
          brunoFileVsCloudSteps,
          brunoWhatIsPractice,
          {
            type: 'quiz',
            question: `Her API testinin, test ettiği backend koduyla birlikte commit edilmesini, aynı pull request'te diff'lenebilmesini ve hiçbir ek bulut hesabı gerektirmemesini istiyorsun. Hangi aracın varsayılan depolama modeli bu gereksinime uyar?`,
            options: [
              { id: 'a', text: 'Postman — koleksiyonlar otomatik olarak buluta senkronize olur' },
              { id: 'b', text: 'Bruno — istekler proje dizininin içinde .bru dosyaları olarak kaydedilir' },
              { id: 'c', text: 'Hiçbiri — API testleri version-control edilemez' },
              { id: 'd', text: 'Sadece curl script\'leri, çünkü GUI araçları Git\'i hiç desteklemez' },
            ],
            correct: 'b',
            explanation: `Bruno her isteği doğrudan proje klasörünün içinde düz bir .bru metin dosyası olarak kaydeder, böylece ek bir adım olmadan otomatik olarak her Git commit'inin parçası olur ve pull request diff'lerinde görünür. Postman'ın varsayılan davranışı bulut senkronizasyonudur, bu da repo'ya bir JSON dosyası koymak için manuel export gerektirir — ve ekip buluttaki koleksiyonu düzenlemeye devam ettikçe bu export hızla eskir.`,
            retryQuestion: {
              question: `Bir arkadaşın soruyor: "Bruno sadece metin dosyası kullanıyorsa, ben de Postman koleksiyonumu JSON'a export edip o dosyayı bir kez commit'lesem aynı Git-takibi avantajını alamaz mıyım?"`,
              options: [
                { id: 'a', text: 'Evet, ve o export sonsuza dek otomatik senkron kalır' },
                { id: 'b', text: 'Hayır — birisi Postman içinde düzenleme yaptığı anda o tek seferlik export edilmiş JSON canlı bulut koleksiyonundan sapmaya başlar, commit edilen dosya sessizce eskir' },
                { id: 'c', text: 'Hayır — Postman koleksiyonları hiç JSON olarak export edilemez' },
                { id: 'd', text: 'Evet, çünkü Postman her kaydetmede otomatik olarak yeniden export eder' },
              ],
              correct: 'b',
              explanation: `Tek seferlik export bir anlık görüntüdür, canlı bir bağlantı değil. Biri koleksiyonu Postman'ın bulut UI'sinde düzenlemeye devam ettiği anda (normal iş akışı), Git'teki commit edilmiş JSON dosyası eskir — ve kimseyi yeniden export etmeyi hatırlamaya zorlayan bir mekanizma yoktur. Bruno bunu tamamen önler çünkü sapabilecek ayrı bir "bulut kopyası" yoktur; editöründeki .bru dosyası, Git'in takip ettiği dosyanın ta kendisidir.`,
            },
          },
        ],
      },
      {
        title: `📦 Kurulum ve İlk İstek`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '⬇️',
            content: `Bruno kurmak, herhangi bir not defteri uygulaması kurmak gibidir — indir, aç, yazmaya başla. Yapılandırılacak bir veritabanı sunucusu yoktur ve seni zorla hesap açtıran bir şey yoktur. Tek ek parça, ileride otomasyon istersen, hazır olduğunda tek satırla kurabileceğin küçük bir komut satırı aracıdır ("CLI").`,
          },
          { type: 'heading', text: `Bruno Nereden İndirilir` },
          {
            type: 'installation',
            title: 'Bruno Desktop Uygulaması — Windows / macOS / Linux',
            steps: [
              { cmd: 'usebruno.com/downloads adresini aç', explanation: 'Resmi kaynak. İşletim sistemine uygun yükleyiciyi seç: .exe (Windows), .dmg (macOS), .deb/.AppImage/.snap (Linux). GitHub releases sayfası (github.com/usebruno/bruno/releases) tercih edersen aynı yükleyicileri barındırır.' },
              { cmd: 'winget install Bruno.Bruno', explanation: 'Paket yöneticisi kullanıyorsan Windows alternatifi. PowerShell\'de çalıştır. Beklenen çıktı "Successfully installed" ile biter.' },
              { cmd: 'brew install --cask bruno', explanation: 'macOS için Homebrew. Beklenen çıktı: "🍺 bruno was successfully installed!" Ardından Bruno.app Launchpad\'de görünür.' },
              { cmd: 'sudo snap install bruno', explanation: 'Linux için Snap. Beklenen çıktı: "bruno <versiyon> from Bruno Software installed". Dağıtımın Snap kullanmıyorsa .AppImage veya .deb aynı işi görür.' },
              { cmd: 'Bruno\'yu aç ve Help → About kontrol et', explanation: 'TÜM platformlar için doğrulama adımı — uygulamanın açıldığını ve bir versiyon numarası gösterdiğini doğrular, örn. "Bruno v1.x.x". Kullanmaya başlamak için login gerekmez.' },
            ],
          },
          { type: 'heading', text: `CLI Kurulumu (Opsiyonel, İleride Otomasyon İçin)` },
          {
            type: 'installation',
            title: 'bru CLI — Windows, macOS ve Linux\'ta aynı şekilde çalışır',
            steps: [
              { cmd: 'npm install -g @usebruno/cli', explanation: 'Node.js\'in zaten kurulu olması gerekir. -g flag\'i "bru" komutunu sadece bir proje klasöründe değil, terminalin her yerinde kullanılabilir yapar.' },
              { cmd: 'bru --version', explanation: 'Doğrulama komutu. Beklenen çıktı: doğrudan "1.x.x" gibi bir şey yazdırır — bunun yerine "command not found" görüyorsan, Node\'un global npm bin klasörü büyük olasılıkla PATH\'te eksik (Yaygın Hatalar\'da işlenir).' },
            ],
          },
          { type: 'heading', text: `Bruno Arayüzü — Üç Panel` },
          {
            type: 'diagram-svg',
            title: 'Bruno UI — Sidebar, Request Builder, Response (etiketli)',
            svg: bruUiMockupSvg,
          },
          {
            type: 'text',
            content: `① Sidebar — koleksiyonların ve klasörlerin, her isteğin kendi .bru dosya ikonuyla gösterildiği yer. ② Request builder — üstte method + URL barı, ardından Params, Headers, Body, Vars, Script ve Assert sekmeleri. ③ Script/Assert alanı, kontrolleri yazdığın yerdir (detayı Test Otomasyonu'nda). ④ Response paneli — her "Send" tıklamasında yenilenen status code, süre ve response body.`,
          },
          { type: 'heading', text: `İlk İsteğin — Adım Adım` },
          {
            type: 'steps',
            items: [
              { label: '"Create Collection" tıkla', desc: 'Herhangi bir isim ver, örn. "my-first-api-tests". Bu, diskte gerçek bir klasör oluşturur — sonra açtığında düz dosyalar görürsün.' },
              { label: '"New Request" tıkla', desc: 'Method varsayılan olarak GET. İsmini "Get Users" yap.' },
              { label: 'URL\'i yaz', desc: 'https://jsonplaceholder.typicode.com/users — ücretsiz, public bir test API\'si, auth gerekmez.' },
              { label: '"Send" tıkla', desc: 'Bruno HTTP isteğini gönderir ve Response paneli bir saniye içinde altta dolar.' },
              { label: 'Response\'u oku', desc: 'Status 200 ve 10 kullanıcılık bir JSON dizisi görmelisin.' },
            ],
          },
          {
            type: 'code',
            language: 'json',
            label: 'Beklenen Response (ilk kullanıcı):',
            code: `{
  "id": 1,                          // Benzersiz kullanıcı ID
  "name": "Leanne Graham",          // Tam ad
  "username": "Bret",               // Login kullanıcı adı
  "email": "Sincere@april.biz",     // E-posta adresi
  "address": { "city": "Gwenborough" }  // İç içe (nested) obje
}`,
            expected: 'Status: 200 OK | JSON dizisi olarak 10 kullanıcı döner',
          },
          brunoInstallFirstRequestFilm,
          brunoInstallJourneySteps,
          brunoInstallationPractice,
          {
            type: 'quiz',
            question: `İlk GET isteğinde "Send" tıkladıktan sonra bir status görüyorsun ama body yok ve Bruno "ENOTFOUND" gösteriyor. En olası sebep nedir?`,
            options: [
              { id: 'a', text: 'Bruno bozuk, yeniden kurulması gerekiyor' },
              { id: 'b', text: 'URL/domain\'de bir yazım hatası — DNS adı çözümlenemedi' },
              { id: 'c', text: 'Assert tab boş' },
              { id: 'd', text: 'Önce bir collection oluşturmayı unuttun' },
            ],
            correct: 'b',
            explanation: `ENOTFOUND bir DNS çözümleme hatasıdır — yazdığın hostname mevcut değil veya yazım hatası içeriyor (örn. "jsonplacehlder.typicode.com"). Collection veya assertion ile hiçbir ilgisi yoktur; bu spesifik hatayı gördüğünde önce her zaman URL'i tekrar kontrol et.`,
            retryQuestion: {
              question: `Yazım hatasını düzeltip tekrar gönderiyorsun, şimdi status 200 ama Response paneli boş body ve 0ms gösteriyor... bir saniye sonra gerçek response geliyor. Bu bir bug mu?`,
              options: [
                { id: 'a', text: 'Evet, Bruno bozuk' },
                { id: 'b', text: 'Hayır — network round-trip tamamlanmadan önce panel kısa süreliğine bir loading/placeholder durumu gösterir; bu normal gecikmedir, bir kusur değil' },
                { id: 'c', text: 'Evet, her seferinde uygulamayı yeniden başlatman gerekiyor' },
                { id: 'd', text: 'Hayır — 0ms her zaman isteğin sessizce başarısız olduğu anlamına gelir' },
              ],
              correct: 'b',
              explanation: `Herhangi bir HTTP client, sunucu yanıtını beklerken kısa süreliğine bir pending durumu gösterir — bu normal network gecikmesidir, Bruno kusuru değildir. Eğer son durum hiç gelmeyip sonsuza dek asılı kalırsa, BU gerçek bir bağlantı sorununa işaret eder ve araştırmaya değer.`,
            },
          },
        ],
      },
      {
        title: `📚 Temel Kavramlar — .bru Dosyaları, Koleksiyonlar ve Script`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗂️',
            content: `Bir .bru dosyası, tek bir yemek tarifi kartı gibidir: malzemeleri (URL, headers, body) ve adımları (varsa script'ler) kısa, insan tarafından okunabilir bir metin bloğunda listeler. Bir koleksiyonun tamamı ise bir tarif kutusudur — bu kartlarla dolu, "kahvaltı" veya "akşam yemeği" gibi gruplandığın alt klasörlere bölünmüş bir klasör.`,
          },
          { type: 'heading', text: `.bru Dosya Formatı` },
          {
            type: 'code',
            language: 'text',
            label: 'collections/users/get.bru — gerçek bir istek dosyası şöyle görünür:',
            code: `meta {
  name: Get Users           // sidebar'da görünen isim
  type: http
}

get {
  url: {{baseUrl}}/users    // {{ }} = environment variable, gönderilirken çözümlenir
}

headers {
  Accept: application/json // her istekle birlikte gönderilir
}

assert {
  res.status: eq 200        // basit kontroller için script gerekmez
}

script:post-response {
  // Assert'in ifade edemediği her şey için gerçek JS yaz
  bru.setVar("firstUserId", res.getBody()[0].id);
}`,
          },
          { type: 'heading', text: `Proje Klasör Yapısı` },
          {
            type: 'file-tree',
            title: 'Diskte tipik bir Bruno koleksiyonu',
            tree: `my-first-api-tests/
├── bruno.json              ← collection config (otomatik oluşturulur)
├── environments/
│   ├── dev.bru             ← baseUrl = https://api-dev.example.com
│   └── prod.bru            ← baseUrl = https://api.example.com
├── users/
│   ├── get.bru
│   └── post.bru
└── orders/
    ├── get-by-id.bru
    └── create.bru`,
            note: `Buradaki her dosya düz metindir. Herhangi bir .bru dosyasını VS Code'da açıp Bruno uygulamasını hiç açmadan okuyabilir, hatta düzenleyebilirsin.`,
          },
          {
            type: 'text',
            content: `Akıl Yürütme #1 — Bruno neden Postman'ın tek pm.test() script kutusu yerine "Assert" ve "Script" diye iki ayrı sekmeye bölüyor? Çoğu kontrol son derece basittir ("status 200 mi?", "body.id 1'e eşit mi?") — her tester'ı bunun için JavaScript yazmaya zorlamak gereksiz bir sürtünmedir, JUnit'in @Test annotation'ının yaygın durumu hallederken sadece gerçekten karmaşık assertion'lar için özel Java koduna inmene benzer. Assert tab düşük sürtünmeli yoldur; Script tab ise mantık basit bir key-operator-value satırı için fazla dinamikleştiğinde tam o noktada vardır.`,
          },
          { type: 'heading', text: `Environment'lar ve Değişkenler` },
          {
            type: 'table',
            headers: ['Kavram', 'Bruno', 'Postman karşılığı'],
            rows: [
              ['dev/staging/prod arasında geçiş', 'environments/dev.bru, environments/prod.bru dosyaları', 'Environment dropdown (bulutta saklanır)'],
              ['URL\'de değişken kullanmak', '{{baseUrl}}/users', '{{baseUrl}}/users (aynı sözdizimi)'],
              ['Çalışma zamanında değişken ayarlamak', 'bru.setVar("token", value)', 'pm.environment.set("token", value)'],
              ['Çalışma zamanında değişken okumak', 'bru.getVar("token")', 'pm.environment.get("token")'],
            ],
          },
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `LEGO benzetmesi: Bir Environment dosyası, bir build için kullanılacak belirli renkteki tuğlaları tutan etiketli bir tepsi gibidir — mat gri tuğlalı bir "dev" tepsisi (güvenli sandbox sunucu) ve parlak altın tuğlalı bir "prod" tepsisi (gerçek sunucu). Aynı modeli (aynı isteği) kurarsın ama hangi tepsiden çektiğini değiştirirsin — isteği sadece başka bir yere işaret etmek için yeniden inşa etmen gerekmez.`,
          },
          {
            type: 'text',
            content: `Akıl Yürütme #2 — neden URL'yi hardcode etmek yerine değişken kullanılır? Junior bir tester https://api-dev.example.com'u 40 farklı isteğe sabit yazarsa, staging'e geçmek 40 dosyayı düzenlemek ve büyük olasılıkla birini gözden kaçırmak demektir. {{baseUrl}} ile environment değiştirmek tek bir dropdown değişikliğidir — her istek otomatik güncellenir. Bu, Java mühendislerinin connection string'leri sabit metin yerine application.properties'e taşımaktan zaten bildiği aynı akıl yürütmedir.`,
          },
          brunoAnatomyFilm,
          brunoEnvVarResolutionSteps,
          brunoCoreConceptsPractice,
          {
            type: 'quiz',
            question: `Bir istekten gelen response'tan hesaplanan bir değeri (örn. auth token) bir sonraki istekte tekrar kullanman gerekiyor. Bunun için tasarlanmış Bruno mekanizması hangisidir?`,
            options: [
              { id: 'a', text: 'Her seferinde değeri bir sonraki isteğe manuel olarak hardcode et' },
              { id: 'b', text: 'İlk isteğin post-response script\'inde bru.setVar(), sonraki istekte {{varName}}' },
              { id: 'c', text: 'Sadece Assert tab' },
              { id: 'd', text: 'Yapılamaz — her istek tamamen izole çalışır' },
            ],
            correct: 'b',
            explanation: `bru.setVar() (veya çalıştırmalar arası kalıcı olması gereken bir değer için bru.setEnvVar()) bir değeri post-response script sırasında saklar. Aynı çalıştırmadaki sonraki herhangi bir istek, URL'sinde, header'larında veya body'sinde {{varName}} ile bunu geri okuyabilir — request chaining (örn. login → token kullan) tam olarak böyle çalışır.`,
            retryQuestion: {
              question: `A isteğinde bru.setVar("token", res.getBody().token) kullandın, ama B isteğinin header'ı hâlâ gerçek değer yerine LİTERAL "{{token}}" metnini gösteriyor. En olası hata nedir?`,
              options: [
                { id: 'a', text: 'bru.setVar sadece sayılar için çalışır, string için çalışmaz' },
                { id: 'b', text: 'A isteği B isteğinden önce gerçekten gönderilmedi, ya da script\'te yazım hatası/yanlış field adı vardı ve değişken sessizce ayarlanamadı' },
                { id: 'c', text: 'Bruno değişken chaining\'i hiç desteklemiyor' },
                { id: 'd', text: 'Collection\'ın yeniden import edilmesi gerekiyor' },
              ],
              correct: 'b',
              explanation: `Değişken chaining sadece üreten istek gerçekten önce çalıştıysa (bir folder/collection run'ında veya manuel olarak) VE script hatasız başarıyla çalıştıysa işe yarar. Yaygın bir hata, yanlış response field adına referans vermektir (API gerçekte .token döndürürken res.getBody().accessToken kullanmak gibi) — script sessizce hata fırlatır ve değişken hiç ayarlanmaz, böylece placeholder literal kalır.`,
            },
          },
        ],
      },
      {
        title: `🔥 Test Otomasyonu — Assertion, CLI ve CI/CD`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '✅',
            content: `"Send" tıklayıp response'a göz gezdirmek, pişirirken çorbayı bir kez tatmak gibidir. Otomatik assertion'lar ise çorbayı her seferinde, otomatik olarak, hatta kimsenin uyanık olmadığı sabahın 3'ünde bile kontrol eden bir mutfak zamanlayıcısı ve termometredir — pass/fail kararını bir insan yerine bilgisayarın (CI) verebilmesini sağlayan şey budur.`,
          },
          { type: 'heading', text: `Kontrol Yazmak — Assert Tab vs Script Tab` },
          {
            type: 'code',
            language: 'text',
            label: 'Assert tab — JavaScript gerekmez:',
            code: `res.status: eq 200            // status 200'e eşit olmalı
res.body.email: contains @    // basit alt-string kontrolü
res.responseTime: lt 500      // 500ms'den hızlı olmalı`,
          },
          brunoAssertTabStep,
          {
            type: 'code',
            language: 'javascript',
            label: 'Script tab (post-response) — daha karmaşık her şey için:',
            code: `test("user list is not empty", function() {
  const users = res.getBody();           // parse edilmiş JSON body
  expect(users.length).to.be.above(0);    // chai tarzı assertion
});

test("every user has a valid email", function() {
  const users = res.getBody();
  users.forEach(u => expect(u.email).to.include("@"));
});`,
          },
          {
            type: 'text',
            content: `Bu test()/expect() ikilisi, Bruno'nun JUnit'in @Test + assertEquals() ikilisine, ya da Postman'ın pm.test()/pm.expect() ikilisine karşılığıdır — aynı fikir, farklı marka adı. Bunlardan birini zaten biliyorsan, bu sözdizimi hemen tanıdık gelmeli.`,
          },
          { type: 'heading', text: `CLI'den Çalıştırmak — bru run` },
          {
            type: 'code',
            language: 'bash',
            label: 'Tek bir isteği, bir klasörü veya tüm collection\'ı çalıştır:',
            code: `bru run collections/users/get.bru --env dev   # tek istek
bru run collections/users --env dev           # tüm klasör
bru run --env dev                             # tüm collection`,
          },
          brunoRunScopeStep,
          {
            type: 'diagram-svg',
            title: 'Terminalde bru run — Pass/Fail Çıktısı',
            svg: bruCliSvg,
          },
          {
            type: 'text',
            content: `Bu terminal çıktısının altındaki exit code'a dikkat et. CI/CD'yi mümkün kılan tek detay tam olarak budur: sıfır olmayan bir exit code, herhangi bir pipeline aracına "bir şey başarısız oldu, deploy'u durdur" der — pipeline'ın tepki vermesi için hiçbir insanın log'ları okuması gerekmez.`,
          },
          { type: 'heading', text: `CI İçin Raporlar: JUnit, HTML, JSON` },
          {
            type: 'code',
            language: 'bash',
            label: 'Makine tarafından okunabilir bir rapor üret:',
            code: `bru run --env dev --reporter-junit results.xml   # CI araçları bunu parse eder
bru run --env dev --reporter-html report.html     # insanlar için
bru run --env dev --reporter-json results.json    # özel dashboard'lar için`,
          },
          brunoReportersStep,
          { type: 'heading', text: `GitHub Actions'a Bağlamak` },
          {
            type: 'code',
            language: 'yaml',
            label: '.github/workflows/api-tests.yml:',
            code: `name: API Tests
on: [pull_request]
jobs:
  bruno:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4               # .bru dosyalarını da çeker — onlar zaten kod
      - run: npm install -g @usebruno/cli
      - run: bru run --env staging --reporter-junit results.xml
      # bru run sıfır olmayan bir kodla çıkarsa, bu job başarısız olur ve PR merge'ini bloklar`,
          },
          {
            type: 'diagram-svg',
            title: 'Tam CI/CD Akışı — Commit\'ten Deploy Gate\'ine',
            svg: ciPipelineSvg,
          },
          {
            type: 'table',
            headers: ['', 'bru CLI (Bruno)', 'Newman (Postman)'],
            rows: [
              ['Kurulum', 'npm install -g @usebruno/cli', 'npm install -g newman'],
              ['Collection çalıştırma', 'bru run --env dev', 'newman run collection.json -e env.json'],
              ['Neyi okur', 'Repo\'dan doğrudan .bru dosyaları', 'Export edilmiş collection.json + environment.json'],
              ['Düzenlemelerle otomatik senkron', 'Evet — GUI\'nin düzenlediği aynı dosyalar', 'Hayır — her değişiklik sonrası yeniden export gerekir'],
            ],
          },
          brunoTestScriptFilm,
          brunoCiExitCodeSteps,
          brunoTestAutomationPractice,
          {
            type: 'quiz',
            question: `Bir istek, Bruno GUI'sinde manuel "Send" tıkladığında her zaman geçiyor ama CI pipeline'ında "bru run" ile çalıştırıldığında başarısız oluyor. Önce kontrol edilmesi gereken en yaygın temel sebep nedir?`,
            options: [
              { id: 'a', text: 'CI sunucusu bozuk' },
              { id: 'b', text: 'CLI çalıştırması lokalde test ettiğinden farklı bir --env kullandı (örn. staging vs dev), bu yüzden baseUrl veya bir secret değişken farklı' },
              { id: 'c', text: 'bru run script\'leri asla çalıştırmaz' },
              { id: 'd', text: 'JUnit reporter\'lar kasıtlı olarak her zaman başarısız olur' },
            ],
            correct: 'b',
            explanation: `Herhangi bir API client için "lokalde çalışıyor, CI'da çalışmıyor" durumunun #1 sebebi environment uyumsuzluğudur — yanlış --env flag'i, lokalde olan ama CI runner'da yapılandırılmamış eksik bir secret, ya da farklı varsayılan değer alan bir değişken. Aracın kendisinden şüphelenmeden önce her zaman CI'da kullanılan tam environment dosyasını/flag'i lokalde kullanılanla karşılaştır.`,
            retryQuestion: {
              question: `Her iki yerde de --env staging'in doğru olduğunu doğruluyorsun, ama CI hâlâ "expected status 200 but got 401" ile başarısız oluyor, lokalde ise zaten önceki bir oturumdan login olmuş durumdasın. Olası eksik nedir?`,
              options: [
                { id: 'a', text: 'bru run hiç authentication desteklemiyor' },
                { id: 'b', text: 'Önceki manuel bir login\'den kalan token/cookie lokalde kalıcı oluyor (örn. bru.setEnvVar ile) ama CI her zaman temiz bir durumdan başlıyor, bu yüzden login/token-fetch adımının CI test suite\'inin kendi içinde açıkça çalışması gerekiyor' },
                { id: 'c', text: 'CI sunucuları Authorization header gönderemez' },
                { id: 'd', text: 'Staging sunucusu tüm CI trafiğini IP\'ye göre engelliyor' },
              ],
              correct: 'b',
              explanation: `CI runner'lar her çalıştırmada sıfır önceki durumla başlar — dünkü manuel testten kalan bir environment variable yoktur. Suite'in "zaten daha önce login oldum" varsayımına güvenmesi yerine, CLI çalıştırmasının ilk adımı olarak açık bir login/token-fetch isteği içermesi ve token'ı bru.setEnvVar() ile saklayıp aynı çalıştırmadaki sonraki isteklerin kullanmasını sağlaması gerekir.`,
            },
          },
        ],
      },
      {
        title: `🛠️ Gerçek Hayat — Git İş Akışları ve Code Review`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '👀',
            content: `İki QA mühendisini, Ada ve Sam'i düşün — ikisi de aynı hafta aynı "orders" servisi için API testleri düzenliyor. Bruno ile değişiklikleri sadece iki Git branch'idir — aynı dosyaya dokunurlarsa, Git herhangi bir kod conflict'i gibi normal bir merge conflict gösterir ve onlar bunu çözer. Buluta senkronize bir araçla, kim son kaydederse, ekipte ayrı bir manuel koordinasyon süreci yoksa diğerinin değişikliklerini sessizce ezebilir.`,
          },
          { type: 'heading', text: `API Testleri Kodun Yanında Yaşıyor` },
          {
            type: 'text',
            content: `Tipik bir kurulumda, bir backend repo'sunun tests/api/ klasöründe, test ettiği kaynak kodun tam yanında bir Bruno collection'ı bulunur. Bir backend developer bir field'ı yeniden adlandırdığında veya status code'u değiştirdiğinde, etkilenen endpoint'in .bru dosyaları aynı pull request'te oturur — reviewer, "biri Postman'da bir yerde güncelleme yaptı" diye güvenmek yerine API değişikliğini VE test değişikliğini birlikte görür.`,
          },
          {
            type: 'diagram-svg',
            title: 'Gerçek Bir Pull Request — Merge\'den Önce Breaking Change\'i Yakalamak',
            svg: gitDiffSvg,
          },
          { type: 'heading', text: `API Değişiklikleri İçin Code Review` },
          {
            type: 'text',
            content: `Bu, Temel Kavramlar sekmesindeki her şeyin pratik kazancıdır: .bru dosyası düz metin olduğu için GitHub/GitLab tam bir diff render eder — kırmızı satır silinmiş, yeşil satır eklenmiş — tam olarak bir kod değişikliği gibi. Bruno uygulamasını hiç açmamış bir reviewer bile "bu test artık userName yerine user_name bekliyor" satırını okuyup değişikliğin etki alanını anında kavrayabilir, prod'a ulaşmadan önce "mobil uygulama da bu rename için güncellendi mi?" diye sorabilir.`,
          },
          {
            type: 'table',
            headers: ['İşbirliği İhtiyacı', 'Bruno yaklaşımı', 'Postman yaklaşımı'],
            rows: [
              ['Merge\'den önce test değişikliğini review etmek', 'Normal Git pull request diff\'i', 'Manuel ekran paylaşımı veya yeniden export etme konusunda ekip disiplinine güvenmek'],
              ['Kimin neyi ne zaman değiştirdiğini bilmek', '.bru dosyası üzerinde git log / git blame', 'Bulut activity log (Team plan veya üstü)'],
              ['Kötü bir test değişikliğini geri almak', 'git revert ile bir commit', 'Collection version history\'den manuel geri yükleme (plan destekliyorsa)'],
              ['Yeni bir takım arkadaşını onboard etmek', 'git clone — her şeye anında sahip olur', 'Workspace\'e davet, bulut senkronunu beklemek'],
            ],
          },
          brunoCliCiRunFilm,
          brunoPrReviewSteps,
          brunoRealWorldPractice,
          {
            type: 'quiz',
            question: `Bir backend developer'ın pull request'i, QA'ya haber vermeden bir endpoint'in response field'ını "userName"den "user_name"e sessizce değiştiriyor. Bruno collection'ları aynı repo'da commit edilmişken, bu genellikle main'e merge edilmeden ÖNCE nasıl yakalanır?`,
            options: [
              { id: 'a', text: 'Merge\'den önce yakalanamaz — sadece deploy sonrası bir şey bozulduğunda anlaşılır' },
              { id: 'b', text: 'Reviewer aynı PR diff\'inde hâlâ "userName" bekleyen .bru assertion dosyasını görür, uyumsuzluğu işaretler, ve CI\'daki bru run o assertion üzerinde gerçekten başarısız olarak build\'i durdurur' },
              { id: 'c', text: 'Bruno field\'ı otomatik olarak geri eski haline döndürür' },
              { id: 'd', text: 'QA her gün her endpoint\'i Postman\'da manuel açıp kontrol etmek zorundadır' },
            ],
            correct: 'b',
            explanation: `Test assertion'ı aynı repo'da bir metin dosyası olarak yaşadığı için, hem insan reviewer (diff'i okuyarak) hem de CI (PR üzerinde otomatik bru run çalıştırarak) uyumsuzluğu yakalama şansına sahip olur — insan, diff'te güncellenmiş bir assertion olmadığını görür, CI ise "user_name" eski assertion'ın beklediğine eşit olmadığı için fiziksel olarak başarısız olur. Test sadece kimsenin yeniden kontrol etmediği ayrı bir bulut aracında yaşasaydı, bu güvenlik ağlarından hiçbiri var olmazdı.`,
            retryQuestion: {
              question: `CI job hatayı yakalar ve merge'i bloklar. Backend developer "başarısız assertion'ı sil, sadece yeniden adlandırılmış bir field" diyor. QA reviewer olarak daha doğru yanıt nedir?`,
              options: [
                { id: 'a', text: 'Hemen kabul et ve PR\'ı açmak için assertion\'ı sil' },
                { id: 'b', text: 'Assertion\'ı silmek yerine yeni field adı "user_name"i kontrol edecek şekilde güncelle, ve başka bir tüketicinin (mobil uygulama, başka servisler) hâlâ eski field adını bekleyip beklemediğini sor' },
                { id: 'c', text: 'PR\'ı sonsuza dek blokla ve konuşmayı reddet' },
                { id: 'd', text: 'Bu repo için CI\'ı devre dışı bırak' },
              ],
              correct: 'b',
              explanation: `Assertion'ı silmek kapsamı tamamen kaldırır — testlerin önlemeye çalıştığı başarısızlık modu tam olarak budur. Doğru çözüm, assertion'ı yeni, kasıtlı kontrata uyacak şekilde güncellemek, aynı zamanda bu fırsatı böyle bir rename'in her zaman sorması gereken daha geniş soruyu sormak için kullanmaktır: bu field'ı başka kim tüketiyor, ve onların bir uyarıya veya sessiz bir breaking change yerine versiyonlanmış bir API'ye ihtiyacı var mı?`,
            },
          },
        ],
      },
      {
        title: `🔗 Ekosistem`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🌐',
            content: `Bruno, zaten kullandığın araçları çöpe atmanı istemiyor — onlarla entegre oluyor. Postman'da 200 isteğin mi var? Tek adımda import et. Bir OpenAPI/Swagger spec'in mi var? Ondan bütün bir collection üret. Gününün tamamını VS Code'da mı geçiriyorsun? Çıkmana gerek kalmaması için bir extension var.`,
          },
          { type: 'heading', text: `Postman'dan veya OpenAPI'den Geçiş` },
          {
            type: 'steps',
            items: [
              { label: 'Postman collection\'ını export et', desc: 'Postman\'da: collection menüsü → Export → Collection v2.1 (JSON).' },
              { label: 'Bruno\'da: Import Collection', desc: 'Kaynak format olarak "Postman Collection"ı seç ve export edilen JSON dosyasını işaret et.' },
              { label: 'Bruno istekleri .bru dosyalarına çevirir', desc: 'URL\'ler, header\'lar, body\'ler ve hatta çoğu pm.* script otomatik çevrilir; karmaşık script\'ler manuel düzeltme gerektirebilir.' },
              { label: 'Veya Postman\'ı tamamen atla', desc: 'Import → "OpenAPI/Swagger" ile API\'nin spec dosyasından doğrudan tam bir collection üret — QA yepyeni bir servisi test etmeye başladığında kullanışlıdır.' },
            ],
          },
          { type: 'heading', text: `REST'in Ötesinde — Diğer Protokoller` },
          {
            type: 'table',
            headers: ['Protokol', 'Bruno desteği', 'Tipik kullanım senaryosu'],
            rows: [
              ['REST / HTTP', 'Tam destek', 'Günlük API testlerinin çoğu'],
              ['GraphQL', 'Built-in, schema introspection ile', 'Tek, esnek bir query endpoint\'ini test etmek'],
              ['gRPC', 'Destekleniyor', 'Mikroservisler arası dahili çağrılar'],
              ['WebSocket', 'Destekleniyor', 'Gerçek zamanlı/streaming endpoint\'ler (chat, canlı fiyatlar)'],
            ],
          },
          { type: 'heading', text: `VS Code Extension ve Bruno Cloud` },
          {
            type: 'diagram-svg',
            title: 'Bruno Ekosistemi — Hangisi Neye Bağlanıyor',
            svg: ecosystemSvg,
          },
          {
            type: 'text',
            content: `VS Code extension'ı, .bru dosyalarını editörünün içinde syntax highlight ile görüntülemene ve hafifçe düzenlemene izin verir — zaten orada bir backend bug'ı düzeltiyorken ilgili teste göz atmak istediğinde kullanışlıdır. Bruno Cloud, local-first, Git tabanlı çekirdekten vazgeçmeden biraz bulut konforu (paylaşılan secret'lar, ekip senkronu) isteyen ekipler için tamamen opsiyonel, ücretli bir katmandır — aynı .bru dosyalarının üzerine oturur, onların yerini almaz.`,
          },
          brunoOfflineFirstFilm,
          brunoEcosystemPluginSteps,
          brunoEcosystemPractice,
          {
            type: 'quiz',
            question: `Ekibinin Postman'da 80 mevcut isteği var ve her şeyi elle yeniden yazmadan Bruno'ya geçmek istiyor. Doğru ilk adım nedir?`,
            options: [
              { id: 'a', text: 'Postman UI\'sini okuyarak 80 isteği manuel olarak yeniden oluştur' },
              { id: 'b', text: 'Postman collection\'ını JSON olarak export et (Collection v2.1), ardından Bruno\'nun Import Collection özelliğiyle çevir' },
              { id: 'c', text: 'İmkansız — Bruno, Postman\'da oluşturulmuş hiçbir şeyi okuyamaz' },
              { id: 'd', text: 'Backend ekibinden API\'yi Bruno\'ya uyacak şekilde yeniden yazmasını iste' },
            ],
            correct: 'b',
            explanation: `Bruno, Postman'ın export edilmiş Collection v2.1 JSON formatı için özel bir importer'a sahiptir, istekleri, klasörleri, değişkenleri ve çoğu script'i otomatik olarak çevirir. Bu standart geçiş yoludur ve saatler süren manuel yeniden girişten kaçınmanı sağlar.`,
            retryQuestion: {
              question: `Import sonrası 80 isteğin 75'i kusursuz çalışıyor ama 5 pre-request script "pm is not defined" hatası fırlatıyor. Neden, ve çözüm nedir?`,
              options: [
                { id: 'a', text: 'Import tamamen başarısız oldu' },
                { id: 'b', text: 'Postman script\'leri pm.* API\'sini kullanırken Bruno script\'leri bru.* API\'sini kullanır — importer basit durumları otomatik çevirir ama daha karmaşık pm.* çağrılarının manuel olarak bru.* karşılığına yeniden yazılması gerekir' },
                { id: 'c', text: 'Bu 5 istek sonsuza dek Postman\'da kalmalı' },
                { id: 'd', text: 'Bruno pre-request script\'leri hiç desteklemiyor' },
              ],
              correct: 'b',
              explanation: `Bruno'nun importer'ı yaygın, basit pm.* pattern'lerini otomatik olarak halleder, ama iki aracın altında farklı script API'leri vardır (pm.* vs bru.*), bu yüzden alışılmadık veya karmaşık script'ler çeviride başarısız olabilir. Çözüm, her başarısız script'i açıp pm.environment.set(...) yerine bru.setEnvVar(...) ve benzer bire-bir yeniden adlandırmaları yapmaktır — genellikle sıfırdan yeniden yazmak değil, hızlı bir manuel geçiştir.`,
            },
          },
        ],
      },
      {
        title: `🚨 Yaygın Hatalar`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚨',
            content: `Her hata mesajı bir tahmin değil, bir ipucudur — semptomlara bakan bir doktor gibi. "Could not resolve variable" şu demektir: "environment seçmeyi unuttun", "command not found" şu demektir: "araç PATH'te değil", ve "ECONNREFUSED" şu demektir: "karşı taraf telefonu açmadı." Semptomu okumayı öğren, doğrudan çözüme atla.`,
          },
          { type: 'heading', text: `Karşılaşacağın 8 Gerçek Hata — ve Çözümleri` },
          {
            type: 'error-dictionary',
              relatedTopicId: 'bruno-errors',
            framework: 'Bruno',
            errors: [
              {
                error: 'Could not resolve variable: {{baseUrl}}',
                fullMessage: 'Error: Could not resolve variable "{{baseUrl}}" — sent as literal text',
                cause: { tr: 'Sağ üstteki Environment seçili değil ("No Environment") veya seçili environment\'ta bu değişken tanımlı değil.', en: 'No Environment is selected in the top-right dropdown, or the selected environment does not define this variable.' },
                solution: { tr: '1) Sağ üstten doğru environment\'ı seç. 2) Environment dosyasını aç, baseUrl tanımlı mı kontrol et. 3) Yazım hatası olup olmadığına bak (baseURL vs baseUrl).', en: '1) Pick the correct environment from the top-right dropdown. 2) Open the environment file and confirm baseUrl is actually defined. 3) Check for a casing typo (baseURL vs baseUrl).' },
                codeWrong: `// Environment seçili değil\nGET {{baseUrl}}/users\n// literal olarak gönderilir, istek başarısız olur`,
                codeFixed: `// "dev" environment seçili, baseUrl = https://api-dev.example.com\nGET {{baseUrl}}/users\n// doğru çözümlenir`,
              },
              {
                error: 'bru: command not found',
                fullMessage: 'zsh: command not found: bru',
                cause: { tr: 'CLI npm ile global kurulmadı veya npm\'in global bin klasörü PATH\'te değil.', en: 'The CLI was not installed globally with npm, or npm\'s global bin folder is missing from PATH.' },
                solution: { tr: '1) npm install -g @usebruno/cli komutunu çalıştır. 2) npm config get prefix ile global bin klasörünü bul ve PATH\'e ekle. 3) Terminali yeniden başlat.', en: '1) Run npm install -g @usebruno/cli. 2) Run npm config get prefix to find the global bin folder and add it to PATH. 3) Restart your terminal.' },
                codeWrong: `$ bru --version\nzsh: command not found: bru`,
                codeFixed: `$ npm install -g @usebruno/cli\n$ bru --version\n1.x.x`,
              },
              {
                error: 'Script Error: bru is not defined',
                fullMessage: 'ReferenceError: bru is not defined',
                cause: { tr: 'Script yanlış sekmeye yapıştırılmış (örn. Assert yerine Script gerekiyor) veya çok eski bir CLI sürümü kullanılıyor.', en: 'The script was pasted into the wrong tab, or a very outdated CLI version is being used that predates the bru.* sandbox API.' },
                solution: { tr: '1) Script\'in Script tab\'ında olduğunu doğrula. 2) npm update -g @usebruno/cli ile CLI\'yi güncelle.', en: '1) Verify the script is actually in the Script tab. 2) Run npm update -g @usebruno/cli to update.' },
                codeWrong: `// Yanlış context\'e yapıştırılmış\nbru.setVar("x", 1); // ReferenceError`,
                codeFixed: `// Script tab\'ında (post-response) doğru yerleştirilmiş\nbru.setVar("x", 1); // çalışır`,
              },
              {
                error: "AssertionError: expected 404 to equal 200",
                fullMessage: 'AssertionError: expected response status 404 to equal 200',
                cause: { tr: 'Endpoint yanlış yazılmış, kaynak henüz oluşturulmamış (önceki POST adımı çalışmadı) veya API endpoint\'i değişmiş.', en: 'Wrong endpoint path, the resource was never created because a prior POST step failed, or the API endpoint itself changed.' },
                solution: { tr: '1) URL\'i tarayıcıda/curl ile manuel dene. 2) Önceki adımın (örn. create) gerçekten 201 döndüğünü doğrula. 3) API değişiklik loglarına bak.', en: '1) Try the URL manually in a browser or curl. 2) Confirm the prior step (e.g. create) actually returned 201. 3) Check the API\'s changelog for a renamed route.' },
                codeWrong: `GET /api/orders/999  // 999 numaralı order hiç oluşturulmadı\n// 404 Not Found`,
                codeFixed: `POST /api/orders → 201, id\'i kaydet\nGET /api/orders/{{orderId}}\n// 200 OK`,
              },
              {
                error: 'self-signed certificate in certificate chain',
                fullMessage: 'Error: self signed certificate in certificate chain',
                cause: { tr: 'Lokal veya staging sunucusu kendinden imzalı SSL sertifikası kullanıyor.', en: 'The local or staging server uses a self-signed SSL certificate.' },
                solution: { tr: '1) Sadece güvenilir, dış erişimi olmayan staging ortamlarında Settings → "Verify SSL" seçeneğini kapat. 2) Daha iyisi: staging sunucusuna gerçek/internal CA sertifikası kur.', en: '1) Only for trusted, non-public staging environments, disable "Verify SSL" in Settings. 2) Better long-term: install a real or internal-CA certificate on the staging server instead.' },
                codeWrong: `GET https://staging.internal/health\n// self signed certificate in certificate chain`,
                codeFixed: `// Settings → Verify SSL KAPALI (sadece güvenilir internal staging)\nGET https://staging.internal/health\n// 200 OK`,
              },
              {
                error: 'connect ECONNREFUSED 127.0.0.1:3000',
                fullMessage: 'Error: connect ECONNREFUSED 127.0.0.1:3000',
                cause: { tr: 'Lokal API sunucusu çalışmıyor, yanlış port kullanılıyor veya henüz tam başlamadı.', en: 'The local API server is not running, the wrong port is configured, or it hasn\'t finished starting up yet.' },
                solution: { tr: '1) Sunucuyu başlat (npm run dev / mvn spring-boot:run vb.). 2) Doğru portu kontrol et. 3) Sunucu loglarında "listening on port" satırını gör.', en: '1) Start the server (npm run dev / mvn spring-boot:run, etc.). 2) Double-check the configured port. 3) Look for a "listening on port" line in the server logs before retrying.' },
                codeWrong: `GET http://localhost:3000/health\n// ECONNREFUSED — sunucu başlatılmamış`,
                codeFixed: `$ npm run dev\nServer listening on port 3000\nGET http://localhost:3000/health\n// 200 OK`,
              },
              {
                error: '.bru file fails to parse — Unexpected token',
                fullMessage: 'Error parsing collections/users/get.bru: Unexpected token at line 12',
                cause: { tr: '.bru dosyası elle düzenlenirken bir parantez/blok kapatılmamış, ya da Git merge conflict işaretleri (<<<<<<<) dosyada kalmış.', en: 'A brace/block was left unclosed during manual editing, or leftover Git merge-conflict markers (<<<<<<<) are still in the file.' },
                solution: { tr: '1) Dosyayı bir editörde aç, eksik } parantezini bul. 2) Git merge conflict işaretlerini temizle. 3) Bruno UI üzerinden düzenleyip kaydetmek genelde daha güvenlidir.', en: '1) Open the file in an editor and find the missing closing brace. 2) Remove any leftover Git merge-conflict markers. 3) Editing and saving through the Bruno UI is usually safer than hand-editing.' },
                codeWrong: `assert {\n  res.status: eq 200\n// kapanış parantezi eksik`,
                codeFixed: `assert {\n  res.status: eq 200\n}`,
              },
              {
                error: 'Newman-style CI failure: exit code 1 with no clear reason',
                fullMessage: '$ bru run --env staging\n... 1 failing\nProcess completed with exit code 1.',
                cause: { tr: 'CI log\'unda hangi assertion\'ın başarısız olduğu görülmüyor çünkü --reporter-junit/html eklenmemiş, sadece terminal özeti var.', en: 'The CI log doesn\'t show which specific assertion failed because no --reporter-junit/html flag was used — only a terse terminal summary exists.' },
                solution: { tr: '1) CI komutuna --reporter-junit results.xml ekle. 2) CI aracını bu XML\'i "Test Results" sekmesinde göstermesi için ayarla. 3) Lokal olarak aynı komutu --env staging ile tekrar çalıştırıp detaylı çıktıyı oku.', en: '1) Add --reporter-junit results.xml to the CI command. 2) Configure the CI tool to surface that XML in its "Test Results" tab. 3) Reproduce locally with the exact same --env staging flag to read the detailed output.' },
                codeWrong: `bru run --env staging\n// exit code 1, CI özetinde detay yok`,
                codeFixed: `bru run --env staging --reporter-junit results.xml\n// CI results.xml\'i parse eder ve tam olarak hangi assertion\'ın başarısız olduğunu gösterir`,
              },
            ],
          },
          brunoEnvVarErrorFilm,
          brunoErrorDiagnosisSteps,
          brunoErrorsPractice,
          {
            type: 'quiz',
            question: `CI'da "bru run" exit code 1 ile çıkıyor ama terminal log'u hangi assertion'ın başarısız olduğuna dair detay içermeyen tek satırlık bir özet gösteriyor. Aksiyon alınabilir detay için CI komutuna ne eklemelisin?`,
            options: [
              { id: 'a', text: 'Hiçbir şey — exit code 1 zaten yeterli bilgi' },
              { id: 'b', text: '--reporter-junit results.xml (veya --reporter-html) gibi bir reporter flag\'i, sonra CI\'ı bu raporu göstermesi için ayarla' },
              { id: 'c', text: 'Pipeline\'ı şans eseri geçene kadar tekrar tekrar çalıştır' },
              { id: 'd', text: 'Response status\'unu production\'da manuel kontrol etmeye geç' },
            ],
            correct: 'b',
            explanation: `Bir reporter flag'i, hangi assertion'ların geçtiğini ve başarısız olduğunu mesajlarla birlikte listeleyen yapılandırılmış bir rapor üretir — bu olmadan sadece kısa bir pass/fail özeti alırsın. Çoğu CI sistemi bir JUnit XML raporunu "Tests" sekmesinde doğrudan render edebilir, belirsiz bir başarısızlığı aksiyon alınabilir bir şeye dönüştürür.`,
            retryQuestion: {
              question: `--reporter-junit eklendikten sonra rapor, lokalde geçen bir istek için açıkça "expected status 200 but got 401" gösteriyor. Lokalde önceki bir oturumdan authenticate olmuş durumdasın. CI'da eksik olan ne?`,
              options: [
                { id: 'a', text: 'Reporter flag\'inin kendisi 401\'e sebep oldu' },
                { id: 'b', text: 'CI çalıştırmasının ilk adımı olarak açık bir login/token-fetch isteği, çünkü CI hiçbir önceki oturum durumunu taşımaz' },
                { id: 'c', text: 'CI Authorization header gönderemez' },
                { id: 'd', text: 'Staging sunucusu tüm otomatik trafiği reddediyor' },
              ],
              correct: 'b',
              explanation: `Bu, Test Otomasyonu'nda işlenen aynı temel sebeptir: CI hiçbir zaman önceki lokal oturumdan bir manuel login'i taşımaz. Suite, kendi ilk adımı olarak açıkça authenticate olmalı ve elde edilen token'ı çalıştırmanın kalanının kullanması için bru.setEnvVar() ile saklamalıdır.`,
            },
          },
        ],
      },
      {
        title: `💼 Mülakat Soruları`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '💼',
            content: `Bu sorular yukarıdaki her şeyi kapsıyor: temel onboarding bilgisi, günlük kullanım ve trade-off'lara dair orta seviye, ve production/mimari senaryolarına dair ileri seviye. Burada basic ≠ "tanım ezberi" — kolay sorular bile işte gerçekten alacağın bir karar etrafında kurulu.`,
          },
          {
            type: 'diagram-svg',
            title: 'Mülakat Merceği — Bruno UI\'sini Bir Mülakatçı Gibi Oku',
            svg: bruUiMockupSvg,
          },
          brunoIdempotentDeleteFilm,
          brunoTokenRefreshSteps,
          brunoInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'bruno-api-client',
            topic: 'Bruno API Client',
            questions: [
              { level: 'basic', q: `Takım liderin sana Bruno kurulu bir laptop veriyor ve ilk isteğini göndermeni istiyor. Bir test API'sinden kullanıcı listesi GET etmek için tam olarak ne tıklayıp ne yazacağını anlat.`, a: `Önce bir Collection oluştur veya aç, sonra "New Request" tıkla. Method'u GET olarak bırak, URL'i yaz (örn. https://jsonplaceholder.typicode.com/users), ve "Send" tıkla. Aşağıdaki Response paneli bir saniye içinde status code ve JSON body ile dolar. Bunlardan hiçbiri öncesinde login veya hesap kurulumu gerekmez — bu, login olmaya iten Postman'a karşı bilinçli bir Bruno tasarım kararıdır.` },
              { level: 'basic', q: `Bir arkadaşın "URL'i isteğe direkt yaz, daha hızlı" diyor. Neden buna karşı çıkıp {{baseUrl}} gibi bir environment variable kullanırsın?`, a: `Hardcode etmek, dev'den staging'e prod'a geçerken her isteğin manuel düzenlenmesi gerektiği anlamına gelir — ve birini gözden kaçırmak çok kolaydır. Environment dosyasında tanımlı {{baseUrl}} ile environment değiştirmek tek bir dropdown değişikliğidir ve tüm istekleri aynı anda günceller. Bu, herhangi bir Java uygulamasında connection string'leri hardcode etmek yerine config'i dışsallaştırmanın arkasındaki aynı mantıktır.` },
              { level: 'basic', q: `Bruno, oluşturduğun bir collection'ı tam olarak nerede saklar, ve ekibin Git kullanıyorsa bu konum neden önemlidir?`, a: `Bruno, diskte bir bruno.json config dosyası ve her istek için bir .bru metin dosyası içeren gerçek bir klasör oluşturur. Sadece bir klasördeki dosyalar olduğu için, Git'i aynı klasöre işaret edebilirsin ve her istek normal commit geçmişinin parçası olur — Postman'ın bulut-öncelikli varsayılanının aksine export adımına gerek yoktur.` },
              { level: 'basic', q: `Bir .bru dosyasını Bruno yerine düz bir metin editöründe açıyorsun. Ne görürsün, ve bu beklenen bir şey mi?`, a: `meta {}, get {}/post {}, headers {} ve assert {} gibi bölümlerle okunabilir düz metin görürsün — bu beklenen ve kasıtlıdır. .bru, bilinçli olarak basit, insan tarafından okunabilir bir formattır, ve Git'in onu opak bir binary blob gibi değil de kaynak kod gibi diff'leyebilmesinin tam sebebi budur.` },
              { level: 'basic', q: `Bir istek "Could not resolve variable {{baseUrl}}" hatasıyla başarısız olduğunda kontrol edilecek ilk şey nedir?`, a: `Sağ üst köşedeki environment dropdown'ını kontrol et — "No Environment" yazıyorsa veya yanlış olan seçiliyse, {{baseUrl}}'in çözümleyeceği hiçbir şey yoktur. Çözüm neredeyse her zaman doğru environment'ı seçmek, sonra o environment'ın bu değişkeni gerçekten tanımladığını tekrar kontrol etmektir.` },
              { level: 'basic', q: `"users" ve "orders" API'si için 30 isteği, yeni bir takım arkadaşı hızlıca bulabilsin diye nasıl organize edersin?`, a: `Collection içinde "users" ve "orders" adında iki klasör oluştur ve ilgili istekleri her birine koy — Bruno bunu diskte gerçek alt klasörler olarak yansıtır. Bu, Java paketlerini her şeyi bir klasöre yığmak yerine feature'a göre organize etme içgüdüsünün aynısıdır.` },
              { level: 'basic', q: `Düz bir REST endpoint'i değil, bir GraphQL endpoint'i test etmen gerekiyor. Bruno bunu destekler mi, ve istek nasıl farklı görünür?`, a: `Evet — Bruno'da schema introspection dahil built-in GraphQL desteği var. Tipik bir URL+method+JSON body yerine, özel bir query editöründe bir GraphQL query/mutation yazarsın ve değişkenleri ayrıca sağlarsın, Bruno bunu GraphQL endpoint'ine doğru formatlanmış şekilde gönderir.` },
              { level: 'basic', q: `Yöneticin "CI kuruyoruz, tüm API testlerini uygulamadan değil terminalden çalıştır" diyor. Hangi araca yönelirsin?`, a: `bru CLI (npm install -g @usebruno/cli ile kurulur). GUI'nin kullandığı tam olarak aynı .bru dosyalarını okur — ayrı bir export gerekmez — ve bru run --env dev tüm collection'ı bir terminalden çalıştırıp CI'nin aksiyon alabileceği bir pass/fail sonucu üretir.` },
              { level: 'basic', q: `"bru run" çalıştırdıktan sonra, çıktıdaki hangi spesifik detay bir CI pipeline'ına devam mı yoksa durmak mı gerektiğini söyler?`, a: `Process exit code — 0 her assertion'ın geçtiğini, sıfır olmayan bir kod (tipik olarak 1) en az birinin başarısız olduğunu gösterir. CI araçları düz metin çıktısını okumaz; bir deploy'u bloklamaya karar vermek için bu exit code'u kontrol ederler.` },
              { level: 'basic', q: `Teknik olmayan bir ürün yöneticisi "hiçbir şey kurmadan API testlerini görebilir miyim?" diye soruyor. Bruno tabanlı bir kurulum için dürüst cevap nedir?`, a: `Hosted bir araçla olduğu kadar kolay değil — birinin onlara ya Git repo'daki .bru dosyalarını gezdirmesi, bru run --reporter-html ile üretilmiş bir HTML rapor açması, ya da ekibin varsa opsiyonel Bruno Cloud katmanını kullanması gerekir. Bu, teknik olmayan bir stakeholder'ın direkt gezinebileceği Postman'ın bulut workspace'ine karşı gerçek bir trade-off'tur.` },
              { level: 'basic', q: `Sana yepyeni bir servis için bir OpenAPI/Swagger spec dosyası verildi ve Bruno'da test etmeye başlaman isteniyor. En hızlı başlangıç noktası nedir?`, a: `Bruno'nun Import → "OpenAPI/Swagger" seçeneğini kullan ve spec dosyasını işaret et — spec'teki her endpoint için otomatik olarak tam bir collection üretir, her birini spec'ten elle yazmak yerine.` },
              { level: 'basic', q: `Bruno'nun Assert tab'ı HİÇ JavaScript yazmadan ne kontrol etmene izin verir, ve ne zaman Script tab'a yönelirsin?`, a: `Assert tab, res.status: eq 200 veya res.body.email: contains @ gibi basit key-operator-value kontrollerini halleder. Script tab'a, kontrol gerçek mantık gerektirdiğinde yönelirsin — bir dizi üzerinde döngü, türetilmiş bir değer hesaplama, veya koşullu dallanma — tek bir satırın ifade edemeyeceği şeyler.` },
              { level: 'basic', q: `Bruno bir dosya yükleme (multipart/form-data) isteği gönderebilir mi, bir avatar-yükleme endpoint'ini test ettiğin gibi?`, a: `Evet — Body tab, alanlar eklediğin ve diskten bir dosya eklediğin bir "Multipart Form" modunu destekler, Postman'ın form-data body tipiyle aynı genel iş akışı.` },
              { level: 'basic', q: `Az önce oluşturduğun yeni bir isteği kaydetmeden Bruno'yu yanlışlıkla kapatıyorsun. İşin kaybolur mu?`, a: `Duruma bağlı — Bruno kaydedilmemiş değişiklikleri kaydetmen için sorar, ve bir istek bir kez kaydedildiğinde anında diskteki .bru dosyasına yazılır (kaydedilmemiş bir bulut taslağı gibi sadece bellekte tutulmaz), bu yüzden risk penceresi tipik bir uygulamadan bekleyebileceğinden çok daha küçüktür.` },
              { level: 'basic', q: `4 kişilik küçük bir QA ekibi neden Postman'ın ücretsiz katmanı yerine özellikle Bruno'nun ücretsiz katmanını seçebilir?`, a: `Bruno'nun çekirdek local-first özellikleri (collections, environments, scripting, CLI runs, Git workflow) bulut altyapı maliyeti ücretli bir plana bağlı olmadığı için kullanım sınırı taşımaz. Postman'ın ücretsiz katmanı çalışır ama tarihsel olarak bazı işbirliği ve istek-limiti özelliklerini ücretli katmanların arkasına koymuştur — ekip maliyete hassassa ve zaten Git'te yaşıyorsa bu önemlidir.` },

              { level: 'intermediate', q: `A isteğinin response değerinin B isteğinde kullanılabilir olmasını istiyorsun (request chaining, örn. login sonra token kullan). Bunu Bruno'da nasıl bağlarsın, adım adım anlat.`, a: `A isteğinin post-response Script tab'ında bru.setVar("token", res.getBody().token) yaz — ya da tek bir çalıştırmanın ötesinde kalıcı olması gerekiyorsa bru.setEnvVar(). Sonra B isteğinde, Authorization header'ında veya gerektiği yerde {{token}}'a referans ver. Bu, Postman'ın pm.environment.set()/get() pattern'ini neredeyse bire bir yansıtır, sadece farklı bir namespace ile (pm.* yerine bru.*).` },
              { level: 'intermediate', q: `Bruno'nun değişken scope önceliğini açıkla — aynı değişken adı hem bir collection variable'da hem bir environment variable'da varsa, hangisi kazanır?`, a: `Bruno, istek anında daha spesifik scope'ları daha geniş olanlara göre önceliklendirir — çalışma zamanı/script ile ayarlanan değişkenler (bru.setVar) genelde environment variable'ları yener, onlar da collection-level değişkenleri yener, onlar da global/process değişkenlerini yener. Bu, Postman'ın kullandığı aynı katmanlı override pattern'idir (local > environment > collection > global), bu yüzden Postman'ı zaten biliyorsan mental model direkt taşınır.` },
              { level: 'intermediate', q: `İki QA mühendisi kendi Git branch'lerinde collections/orders/get.bru'yu düzenliyor ve şimdi merge etmeleri gerekiyor. Gerçekte ne olur, ve bir conflict'i nasıl çözerler?`, a: `.bru düz metin olduğu için Git ona tam olarak bir kod dosyası gibi davranır — değişiklikleri farklı satırlara dokunuyorsa Git otomatik merge eder; aynı satıra dokunuyorsa Git, <<<<<<< işaretleriyle normal bir conflict üretir ve bunu elle veya bir merge tool ile çözerler, herhangi bir developer'ın zaten sahip olduğu aynı yetenek. Hiçbir özel "collection merge" özelliğine gerek yoktur çünkü o zaten özel bir binary format değildi.` },
              { level: 'intermediate', q: `Ekibin "bru run"dan gelen bir JUnit raporunun, ham konsol çıktısı yerine CI aracının native "Tests" sekmesinde görünmesini istiyor. Bunu nasıl sağlarsın?`, a: `bru run komutuna --reporter-junit results.xml ekle, sonra CI aracını (GitHub Actions, Jenkins, GitLab CI) bu XML dosyasını kendi built-in test-report adımıyla yayınlayacak/parse edecek şekilde yapılandır — çoğu CI sistemi hangi araç ürettiğine bakmadan generic JUnit XML'i render etmeyi zaten bilir.` },
              { level: 'intermediate', q: `"status 200" kontrolünü Assert tab ile Script tab kullanarak yapmanın farkını göster, ve ne zaman birini diğerine tercih edersin?`, a: `Assert tab: res.status: eq 200 — tek bir deklaratif satır, kod yok, yazması ve okuması anında. Script tab: test("status is 200", function() { expect(res.getStatus()).to.equal(200) }) — daha ayrıntılı ama aynı blok içinde başka mantıkla birleştirmene izin verir. Basit, izole kontroller için Assert'i, dallanma, döngü, veya assert etmeden önce bir şey hesaplaman gerektiğinde Script'i seç.` },
              { level: 'intermediate', q: `.bru environment dosyan authenticate olmak için gerçek bir API key veya şifreye ihtiyaç duyarken bunu Git'e commit etmekten nasıl kaçınırsın?`, a: `Environment editöründe değişkeni "secret" olarak işaretle — Bruno secret değerleri normal environment dosyasından ayrı, gitignore'lanmış lokal bir secrets dosyasında saklar, bu yüzden Git'e commit edilen environment.bru sadece değişkenin adını/placeholder'ını içerir, gerçek değeri asla içermez. Takım arkadaşları kendi lokal secret değerlerini ayarlar, ve CI kendi değerini --env-var flag'leri veya CI secret'ları üzerinden enjekte eder.` },
              { level: 'intermediate', q: `Bruno'nun Postman'ın pm.test()'ine karşılığı nedir, ve sözdizimi gerçekte ne kadar benzer?`, a: `Assertion için expect() ile eşleştirilmiş test(açıklama, fonksiyon)'dır — örneğin test("user exists", function() { expect(res.getBody().id).to.equal(1) }). Sözdizimi kasıtlı olarak Postman'ın pm.test()/pm.expect()'ine yakındır (her ikisi de Mocha/Chai tarzıdır), spesifik olarak mevcut test mantığının göçünü yeniden yazım yerine basit bir geçiş haline getirmek için.` },
              { level: 'intermediate', q: `Şirketin 50 isteği Postman'dan Bruno'ya taşıyor. Otomatik import sonrası, manuel düzeltme gerektirmesi en olası kategori nedir?`, a: `Doğrudan bir Bruno karşılığı olmayan Postman'a özel pm.* çağrıları kullanan veya Postman-only özelliklere (Postman Vault veya belirli collection-level ayarlar gibi) bağımlı karmaşık pre-request/post-response script'ler. Basit istek verisi (URL, header, body, basit değişkenler) neredeyse her zaman temiz şekilde import edilir; ara sıra manuel bir geçiş gerektiren özel JavaScript mantığıdır.` },
              { level: 'intermediate', q: `GUI'nin klasör Runner'ı ile aynı klasörü terminalde "bru run" ile çalıştırmak neden CI amaçları için farklı davranır?`, a: `GUI Runner interaktif insan kullanımı için yapılmıştır — headless bir CI container içinde doğal olarak script'lenebilir değildir, ve exit code'lar/otomasyon hook'ları gerçekten bir UI'nin amacı değildir. bru run özellikle interaktif olmayan şekilde çağrılmak, script-dostu bir exit code döndürmek ve makine tarafından okunabilir raporlar yazmak için yapılmıştır — CI entegrasyonunun gerçekten bağlı olduğu API yüzeyi budur.` },
              { level: 'intermediate', q: `Bir API response'unun sadece bir-iki field'ı değil, tüm bir JSON yapısını (schema) beklenenle eşleştirdiğini nasıl doğrularsın?`, a: `Her gerekli key ve type'ı açıkça kontrol eden bir Script tab assertion'ı yaz (örn. expect(body).to.have.property("id"); expect(body.id).to.be.a("number")), ya da Bruno sürümün destekliyorsa script sandbox'ında bundle'lanmış/mevcut bir JSON-schema doğrulama kütüphanesi kullan. Bu, bir developer'ın yanlışlıkla bir field'ı silmesini veya yeniden yazmasını yakalar — sadece elle kontrol ettiğin bir değeri değil.` },
              { level: 'intermediate', q: `GUI'de Send tıklandığında sorunsuz çalışan bir istek, aynı --env ile "bru run" üzerinden çalıştırıldığında başarısız oluyor. Genel CI değil, Bruno'ya özgü olası bir açıklama nedir?`, a: `Sadece belirli çalıştırma bağlamlarında çalışan bir folder-level veya collection-level pre-request script, veya GUI'nin tesadüfen tuttuğu ama taze bir CLI çalıştırmasının tutmadığı, önceden açılmış bir tab'dan kalan interaktif bir duruma bağımlı bir script. Bellekte kalan durumu gerçek bir çalıştırma-sırası hatasından ayırmak için collection'ı GUI'de kapatıp yeniden açarak da tekrar test et.` },
              { level: 'intermediate', q: `CLI kullanarak aynı isteği 20 farklı input satırına karşı (data-driven testing) nasıl parametrize edersin?`, a: `Harici bir CSV veya JSON test verisi dosyası sağla ve bir runner script'inden buna referans ver, ya da satır başına istek mantığını çağıran bir collection-level script içinde veri seti üzerinde döngü kur — CLI'nin --env-var flag'i de daha basit durumlar için tek seferlik değerler enjekte edebilir. Bu, Postman'ın Collection Runner + CSV dosyası yaklaşımıyla kavramsal olarak aynıdır, sadece bir GUI diyaloğu yerine komut satırından yönlendirilir.` },
              { level: 'intermediate', q: `Bir folder-level script ile bir request-level script arasındaki pratik fark nedir, ve ne zaman folder-level olanı kullanırsın?`, a: `Bir folder-level pre-request script, o klasördeki HER istekten önce otomatik olarak çalışır — "her zaman bu auth header'ı ekle" gibi paylaşılan kurulum için idealdir — aynı script'i 15 ayrı isteğe yapıştırmak yerine. Request-level bir script sadece o tek isteği etkiler, başka hiçbir şeyin ihtiyacı olmadığı tek seferlik bir ID çıkarmak gibi gerçekten o isteğe özgü bir şey için kullanışlıdır.` },
              { level: 'intermediate', q: `4 ayrı mikroservisten oluşan bir sistemi test etmek için Bruno collection'larını nasıl yapılandırırsın, her birinin kendi base URL'i varken?`, a: `Ya her birinin kendi environment dosyaları olduğu 4 ayrı collection'lı bir Bruno workspace'i, ya da servis başına ayrı bir baseUrl değişkeni tanımlayan paylaşılan bir environment'a sahip 4 üst-seviye klasörlü tek bir collection (örn. {{usersBaseUrl}}, {{ordersBaseUrl}}). Folder yaklaşımı servisler-arası akışları (örn. kullanıcı oluştur → order oluştur) tek bir çalıştırmada zincirlemeyi daha kolay tutar; ayrı collection'lar sahiplik için servis sınırlarını daha temiz tutar.` },
              { level: 'intermediate', q: `Staging sunucun kendinden imzalı bir sertifika kullanıyor ve ekibin teste devam edebilmesi için şu an "Verify SSL" kapalı. Gerçekte yapılan güvenlik trade-off'u nedir, ve ne zaman kabul edilebilir?`, a: `SSL doğrulamasını kapatmak, o bağlantı için man-in-the-middle müdahalesine karşı korumayı kaldırır — SADECE ekibin uçtan uca kontrol ettiği, güvenilir, dış erişimi olmayan bir internal staging ortamı için kabul edilebilir, gerçek kullanıcı verisine veya production'a dokunan hiçbir şey için asla değil. Daha iyi uzun vadeli çözüm, staging'e uygun bir sertifika (internal CA dahi) kurmaktır, böylece bu toggle hiç kapalı olmak zorunda kalmaz.` },
              { level: 'intermediate', q: `Backend developer'lar VE QA'nın bir monorepo içinde tek bir Bruno collection'ını paylaşmasını istiyorsun. Nereye koyarsın ve neden?`, a: `İlgili servisin kökünde bir tests/api/ (veya benzeri) klasör, o servisin kaynak koduyla aynı repo'da commit edilmiş. Bu şekilde, API'yi değiştiren aynı pull request eşleşen test değişikliğini de içerir, code owners o klasör için özel olarak review zorunlu kılabilir, ve zamanla senkron dışı kalan ayrı bir QA-only repo yerine tam olarak bir doğruluk kaynağı vardır.` },
              { level: 'intermediate', q: `Bir Bruno örneği kullanarak flaky bir assertion'ı devre dışı bırakmanın onu gerçekten düzeltmekten farkını açıkla.`, a: `res.responseTime: lt 500'ü "bazen başarısız oluyor" diye yorum satırına almak veya silmek gerçek kapsamı kaldırır ve potansiyel bir performans regresyonunu gizler — bu bir yara bandıdır, çözüm değil. Gerçek bir düzeltme, response'un neden bazen yavaş olduğunu araştırır (sunucu tarafı sorun, network varyansı, gerçekçi olmayan eşik) ve ya kök sebebi düzeltir ya da daha gerçekçi, kanıta dayalı bir eşik belirler — assertion her durumda anlamlı kalır.` },
              { level: 'intermediate', q: `Bruno'yu hiç kullanmamış birinin 5 dakikadan kısa sürede bir Bruno collection'ını çalıştırabilmesini nasıl sağlarsın?`, a: `Mantıklı varsayılanlara sahip environment dosyalarının commit edildiğinden (secret'lar hariç) emin ol, aynı klasöre tam bru run komutunu ve gerekli kurulumu (Node sürümü, npm install -g @usebruno/cli) içeren kısa bir README ekle, ve istek isimlerini kendi kendini açıklayan tut. Hedef, sıfır ek tribal bilgi gerektirmeden git clone → npm install -g @usebruno/cli → bru run --env dev'dir.` },
              { level: 'intermediate', q: `Bruno'nun Git-native avantajlarını bilsen bile, belirli bir ekip için Bruno'yu ÖNERMEMENE sebep olacak şey nedir?`, a: `Git'e veya terminale hiç dokunmadan API isteklerine göz atması, çalıştırması ve tartışması gereken çok sayıda teknik olmayan stakeholder'ı (ürün, destek, satış) olan büyük bir ekip — bu kitleye Postman'ın bulut workspace'i ve hosted dokümantasyonu daha iyi hizmet eder. Bruno'nun güçlü yanları, ona dokunan insanların Git'le rahat olduğunu varsayar, ki bu mühendislik ve QA dışında evrensel olarak doğru değildir.` },
              { level: 'intermediate', q: `Environment dosyaları, ne tutmaları gerektiği açısından collection-level değişkenlerden nasıl farklıdır?`, a: `Environment değişkenleri, NEREYE işaret ettiğine bağlı olarak değişen değerleri tutar (dev vs staging vs prod base URL'leri, environment'a özgü credential'lar) — hepsini bir anda değiştirmek için tüm environment'ı değiştirirsin. Collection-level değişkenler, environment'tan bağımsız olarak aynı kalması gereken değerleri tutar (sabit bir API versiyon header'ı, sabit bir test kullanıcı adı) — environment değiştirdiğinde değişmezler.` },

              { level: 'advanced', q: `Orta ölçekli bir API için her pull request'te otomatik çalışan bir Bruno-tabanlı smoke test suite'i tasarla. İçine ne girer ve neden?`, a: `Her büyük resource için bir kritik happy-path'i kapsayan küçük, hızlı bir alt küme (5-10 istek) — health check, login, en önemli entity için create+read — toplam çalışma süresi 30 saniyenin altında tutulur, pull_request ile tetiklenen bir GitHub Actions job'ında bru run --reporter-junit ile çalıştırılır. Yavaş/kapsamlı edge-case testlerini kasıtlı olarak hariç tutar (onlar bunun yerine bir zamanlamada veya deploy öncesi çalışır), çünkü bir PR gate'inin developer'ların onu görmezden gelmeye veya atlamaya başlamayacağı kadar hızlı olması gerekir.` },
              { level: 'advanced', q: `Bir developer'ın PR'ı bir response field'ını sessizce camelCase'den snake_case'e değiştiriyor. Bruno'nun Git-native modelinin bunu merge'den önce, Postman-cloud-only bir kuruluma kıyasla, tam olarak nasıl ortaya çıkardığını anlat.`, a: `.bru assertion dosyası (örn. body.userName bekleyen) aynı repo'da yaşar, bu yüzden PR diff'i API değişikliğini gösterir ama eşleşen bir assertion güncellemesini GÖSTERMEZ — bir reviewer bu boşluğu direkt görür. Eş zamanlı olarak, CI'nin bru run'ı canlı response artık eskimiş assertion'a uymadığı için fiziksel olarak başarısız olur, merge'i otomatik olarak bloklar. Postman-cloud-only bir kurulumda, test tamamen repo'nun dışında yaşar — birisi bunun için ayrı, kolayca unutulan bir entegrasyon kurmadıkça PR'a bağlı hiçbir diff veya CI gate yoktur.` },
              { level: 'advanced', q: `GitHub Actions yerine "bru run"ı Jenkins'e entegre ediyorsun. Build'i doğru şekilde başarısız kılmak için Jenkins pipeline'ında tam olarak neye güvenirsin?`, a: `Jenkins (her CI sistemi gibi) shell adımının exit code'unu inceler — bru run herhangi bir assertion başarısızlığında sıfır olmayan bir değer döndürür, bu yüzden bir Jenkinsfile sh 'bru run --env staging' adımı ekstra yapıştırma kodu olmadan doğal olarak stage'i başarısız kılar. Daha iyi görünürlük için, --reporter-junit XML'ini de arşivler ve build'in Test Result trend'inde render etmek için junit Jenkins plugin'ini kullanırsın — başka herhangi bir test framework'ünün JUnit çıktısı için kullanılan aynı pattern.` },
              { level: 'advanced', q: `Bruno'nun 200 kişilik bir enterprise organizasyon için gerçek sınırlamaları nedir, ve Bruno'nun Git avantajlarına rağmen hâlâ ne zaman Postman önerirsin?`, a: `Bruno'da hosted bir API dokümantasyon portalı, built-in bir mock server, API monitoring/uptime alerting yok, ve yüzlerce teknik olmayan stakeholder genelinde kimin neyi düzenleyebileceğine dair daha zayıf built-in governance var — bunların hepsi Postman Enterprise'ın spesifik olarak sattığı şeyler. Organizasyon API tasarımı, dış ortaklar için hosted dokümantasyon, monitoring ve mühendislik test otomasyonunu kapsayan tek bir platforma ihtiyaç duyuyorsa, Postman'ın hepsi-bir-arada platformu maliyetine değebilir; Bruno, kitle çoğunlukla zaten Git'te yaşayan mühendisler/QA olduğunda daha uygun bir tercihtir.` },
              { level: 'advanced', q: `Bir collection'daki 50 isteğin her birinin aynı "süresi dolmuş mu kontrol et, gerekirse yenile" script'ini tekrarlamaması için paylaşılan bir token-refresh mekanizması tasarla.`, a: `Yenileme mantığını, Bruno'nun o scope'taki her istekten önce otomatik çalıştırdığı bir collection-level (veya üst folder-level) pre-request script'ine koy: saklanan bir expiry timestamp'ini kontrol et (bru.getVar("tokenExpiry")), ve süresi dolmuşsa, senkron-tarzı bir auth isteği gönder ve orijinal istek devam etmeden önce yeni token/expiry'yi bru.setVar() ile sakla. Bu, Java'da özel bir OkHttp/RestAssured filter'ı ile aynı "interceptor" pattern'idir — cross-cutting concern'i 50 kopya yerine bir yer sahiplenir.` },
              { level: 'advanced', q: `Normal network jitter'ında flaky olmadan, API anlamlı şekilde yavaşlarsa bir build'in başarısız olmasını sağlayan bir response-time regresyon gate'i nasıl kurarsın?`, a: `Eşiğin normal varyanstan kaynaklanan yanlış başarısızlıklardan kaçınmak için (ortalama değil) tarihsel p95'in cömertçe üstüne ayarlandığı bir Script-tab assertion'ı ekle: expect(res.getResponseTime()).to.be.below(threshold), ve bunu paylaşılan gürültülü bir ortam yerine stabil, özel bir performans/staging ortamına karşı çalıştır. Gerçek trend takibi için, --reporter-json sonuçlarını da düzenli olarak export et ve response time'ları dışarıda zaman içinde çiz — tek bir pass/fail eşiği büyük regresyonları yakalar ama kademeli artışı göstermez.` },
              { level: 'advanced', q: `CI runner'ın, bir developer'ın lokal Bruno secrets dosyasına erişimi olmayan temiz, ephemeral bir container. Staging credential'larını güvenli şekilde nasıl sağlarsın?`, a: `Credential'ı CI platformunun kendi secrets manager'ında sakla (GitHub Actions secrets, Jenkins credentials store) ve çalışma zamanında bru run --env-var apiKey=$STAGING_API_KEY (veya eşdeğer bir env-var flag'i) üzerinden enjekte et, gerçek değeri repo'da hiçbir yere asla commit etme. Commit edilen environment.bru dosyası her zaman değişkenin adını sadece bir placeholder olarak içerir — gerçek değer environment başına sağlanır, bir Java Spring uygulamasının production'da secret'ları application.properties'ten değil environment variable'lardan okuması gibi.` },
              { level: 'advanced', q: `Bir collection iki yılda 200+ isteğe büyümüş ve sürdürülmesi zorlaşmış. Kontrolü geri kazanmak için stratejin nedir?`, a: `Emekli edilmiş endpoint'lere karşı gerçekten ölü istekleri denetle ve sil (Git geçmişi onları son ne zaman değiştirdiğini gösterir), tarihsel kazalar yerine güncel servis/resource sınırlarını yansıtan klasörlere yeniden organize et, tekrarlanan kurulumu duplicate edilmiş request-level script'ler yerine folder-level script'lere çıkar, ve eğer artık ilişkisiz sistemleri kapsıyorsa aşırı geniş tek bir collection'ı servis başına collection'lara böl. Bunu tam olarak bir kod refactor'ü gibi ele al — küçük, review edilmiş PR'lar, bir büyük yeniden yazım değil.` },
              { level: 'advanced', q: `GUI Collection Runner'ın data-driven testing için ne kadar harici test verisi yükleyebileceğine dair pratik bir sınırı var. Bunu CLI kullanarak nasıl ölçeklendirirsin?`, a: `Harici bir CSV/JSON dosyasını satır satır okuyan ve satır başına --env-var flag'leriyle bru run'ı çağıran (veya satır başına geçici bir environment dosyası üreten) küçük bir Node.js (veya shell) wrapper script'i yaz, gerektiği kadar döngüye al — bu sadece process çağrıları olduğu için herhangi bir GUI diyaloğunun veri boyutu kısıtlamasıyla sınırlı değildir. Çok büyük veri setleri için, toplam çalışma süresini akılcı tutmak için bunları batch'le ve paralel CI job'larında (matrix build'ler) çalıştır.` },
              { level: 'advanced', q: `Bruno'nun assertion modelini kullanarak bir DELETE endpoint'i için bir idempotency test stratejisi tasarla — tam olarak neyi assert edersin, ve kaç çağrı boyunca?`, a: `Aynı kaynak üzerinde DELETE'i sırayla iki kez çağır: İLK çağrının 200/204 döndürdüğünü assert et (kaynak vardı, şimdi kaldırıldı), sonra İKİNCİ çağrının başka bir 200 değil 404 (zaten gitmiş) döndürdüğünü assert et — gerçek bir idempotency bug'ı ikinci çağrının da bir şey siliyormuş gibi 200/204 döndürmesi, ya da daha kötüsü, bir 500 hatası olurdu. İkinci isteğin gerçekte ne yeniden denendiğine dair hiçbir belirsizlik kalmaması için bunu bru.setVar() ile zincirleyerek ikinci isteğin ilkiyle tam olarak aynı resource ID'sini yeniden kullanmasını sağla.` },
              { level: 'advanced', q: `Java-ağırlıklı bir ekibin API test otomasyonu için Bruno ile REST Assured arasında seçim yapıyorsun. Gerçekte neye göre karar verirsin?`, a: `REST Assured, testlerin uygulama koduyla aynı Java/Maven build'i içinde yaşaması, Java utility sınıflarını ve CI tooling'ini unit/integration testleriyle paylaşması, ve ekibin zaten kullandığı aynı mvn test komutuyla çalışması gerektiğinde kazanır. Bruno, ekip her API tester'ını Java yazmaya zorlamadan hafif bir Git-takipli otomasyon katmanı ile birlikte exploratory testing için hızlı, görsel bir GUI istediğinde kazanır. Çoğu ekip pragmatik olarak ikisini de kullanır: keşif ve hızlı regresyon için Bruno, Java kod tabanına gömülü derin entegrasyon testleri için REST Assured.` },
              { level: 'advanced', q: `Bir senaryo, henüz var olmayan bir üçüncü parti API'yi simüle etmeyi gerektiriyor, böylece ekip paralel olarak ona karşı geliştirme ve test yapabilir. Bruno'nun built-in hosted bir mock server'ı yok — ne yaparsın?`, a: `Bruno'yu ayrı, hafif bir mock server aracıyla eşleştir (örn. lokal bir json-server, WireMock, veya aynı OpenAPI spec'ten çalışan Prism) — Bruno sadece baseUrl environment değişkenini gerçek olan yerine mock server'ın lokal adresine işaret eder. Bu, Bruno'nun bilinçli olarak tam bir platform olmaya çalışmadığının temiz bir örneğidir; eksikliğini garip bir şekilde aşmak yerine, kapsamadığı tek özellik için amaca özel bir araçla onu birleştirirsin.` },
              { level: 'advanced', q: `İki QA mühendisi her hafta aynı büyük .bru collection dosyasında merge conflict üretiyor. "Daha çok iletişim kur"un ötesinde gerçek çözüm nedir?`, a: `Her mühendisin tipik işinin farklı dosyalara dokunması için aşırı geniş tek dosyaları/klasörleri sahiplik hatlarına göre böl — örn. bir devasa düz klasör yerine resource başına bir klasör — ve uygulama kodu için kullanılan aynı küçük-PR disiplinini benimse (bir haftalık değişikliği biriktirmek yerine sık sık commit et ve push et). Sık küçük commit'ler, herhangi bir tekil conflict'in yüzey alanını azaltır, herhangi bir kod tabanında merge ağrısından kaçınma için verilen standart tavsiyeyle aynı.` },
              { level: 'advanced', q: `API, breaking change'lerle v1'den v2'ye geçiyor, ama mevcut client'lar için bir geçiş süresi boyunca v1'in çalışmaya devam etmesi gerekiyor. v1 kapsamasını bozmadan her ikisini de test etmek için TEK bir Bruno collection'ını nasıl yapılandırırsın?`, a: `v1 assertion'larını yerinde ezmek yerine, her biri farklı path'lere (/v1/users vs /v2/users) veya versiyon başına farklı baseUrl değişkenlerine işaret eden kendi istekleri ve assertion'larıyla paralel klasörler (v1/ ve v2/) oluştur. Bu, v2 geliştirmesi ilerlerken v1 regresyon kapsamasını tamamen sağlam tutar, ve v1 resmi olarak emekliye ayrıldığında klasörler bağımsız olarak silinebilir — backend'in kendisinin API yüzeyini versiyonlamasını yansıtır.` },
              { level: 'advanced', q: `Teknik olmayan bir stakeholder sadece bugünün CI çalıştırmasını değil, zaman içindeki pass/fail trendlerini görmek istiyor. Bunu desteklemek için "bru run" etrafında ne raporlama stratejisi kurarsın?`, a: `Her CI çalıştırmasının --reporter-json results.json üretmesini sağla, her çalıştırmanın JSON'unu bir build artifact olarak arşivle (veya küçük bir sonuç veritabanına/dashboard'a push et), ve build'ler boyunca haftalarca pass rate ve response-time trendlerini gösteren hafif bir trend grafiği dışarıda inşa et (basit bir internal dashboard, ya da bir spreadsheet'e ekleme yapan zamanlanmış bir script bile). bru run'ın kendisi bir anlık-zaman aracıdır — çıktısını bir trende dönüştürmek, başka herhangi bir test framework'ünün ham sonuçları için yapacağın gibi üzerine inşa ettiğin kasıtlı bir raporlama katmanıdır.` },
            ],
          },
          {
            type: 'glossary-section',
            terms: [
              { term: '.bru', definition: { tr: 'Bruno\'nun istekleri sakladığı düz metin dosya formatı. İnsan tarafından okunabilir, Git ile diff edilebilir.', en: 'Bruno\'s plain-text file format for storing requests. Human-readable, Git-diffable.' } },
              { term: 'bru CLI', definition: { tr: 'Koleksiyonları terminalden/CI\'dan çalıştıran araç. npm install -g @usebruno/cli ile kurulur.', en: 'The command-line tool that runs collections from a terminal/CI. Installed via npm install -g @usebruno/cli.' } },
              { term: 'Assert tab', definition: { tr: 'Kod yazmadan basit kontrol satırları eklemeye yarar (res.status: eq 200).', en: 'Lets you add simple check rows without writing code (res.status: eq 200).' } },
              { term: 'Script tab', definition: { tr: 'test()/expect() ile gerçek JavaScript mantığı yazılan sekme.', en: 'The tab where you write real JavaScript logic using test()/expect().' } },
              { term: 'bru.setVar() / bru.getVar()', definition: { tr: 'Script içinde çalışma zamanı değişkeni kaydetme/okuma — Postman\'ın pm.environment.set()/get() karşılığı.', en: 'Set/read a runtime variable inside a script — Bruno\'s equivalent of Postman\'s pm.environment.set()/get().' } },
              { term: 'Environment', definition: { tr: 'dev/staging/prod gibi ortam bazlı değişkenleri tutan .bru dosyası.', en: 'A .bru file holding environment-specific variables like dev/staging/prod.' } },
              { term: 'Newman', definition: { tr: 'Postman\'ın CLI runner\'ı — bru CLI\'nin Postman karşılığı.', en: 'Postman\'s CLI runner — the Postman equivalent of bru CLI.' } },
              { term: 'ECONNREFUSED', definition: { tr: 'Sunucu çalışmıyor veya yanlış port. Sunucunun ayakta olduğunu doğrula.', en: 'Server not running or wrong port. Verify the server is up.' } },
            ],
          },
        ],
      },
    ],
  },
}

fillMissingCodeTrios(brunoData, 'bruno')
