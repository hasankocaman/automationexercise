const httpFlowSvg = `<svg viewBox='0 0 680 200' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <defs>
    <marker id='ag' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#10b981'/></marker>
    <marker id='ar' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#f59e0b'/></marker>
    <marker id='ab' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#60a5fa'/></marker>
  </defs>
  <rect x='20' y='55' width='140' height='90' rx='10' fill='#FF6C37' opacity='0.15' stroke='#FF6C37' stroke-width='1.5'/>
  <text x='90' y='88' fill='#FF6C37' text-anchor='middle' font-size='22'>📮</text>
  <text x='90' y='110' fill='#FF6C37' text-anchor='middle' font-size='12' font-weight='bold'>Postman</text>
  <text x='90' y='128' fill='#aaa' text-anchor='middle' font-size='10'>API Client / Tester</text>
  <line x1='165' y1='88' x2='270' y2='88' stroke='#10b981' stroke-width='2' marker-end='url(#ag)'/>
  <text x='218' y='80' fill='#10b981' text-anchor='middle' font-size='10' font-family='monospace'>GET /api/users</text>
  <text x='218' y='100' fill='#6c7086' text-anchor='middle' font-size='9'>Headers + Auth + Body</text>
  <rect x='275' y='45' width='140' height='110' rx='10' fill='#7c3aed' opacity='0.15' stroke='#7c3aed' stroke-width='1.5'/>
  <text x='345' y='80' fill='#a78bfa' text-anchor='middle' font-size='22'>🖥️</text>
  <text x='345' y='102' fill='#a78bfa' text-anchor='middle' font-size='12' font-weight='bold'>API Server</text>
  <text x='345' y='120' fill='#aaa' text-anchor='middle' font-size='10'>Node / Python / Java</text>
  <text x='345' y='140' fill='#6c7086' text-anchor='middle' font-size='9' font-family='monospace'>:8080</text>
  <line x1='420' y1='100' x2='490' y2='100' stroke='#60a5fa' stroke-width='1.5' marker-end='url(#ab)'/>
  <rect x='495' y='70' width='110' height='60' rx='10' fill='#1e3a5f' stroke='#60a5fa' stroke-width='1.5'/>
  <text x='550' y='97' fill='#60a5fa' text-anchor='middle' font-size='22'>🗄️</text>
  <text x='550' y='118' fill='#93c5fd' text-anchor='middle' font-size='11' font-weight='bold'>Database</text>
  <line x1='270' y1='118' x2='165' y2='118' stroke='#f59e0b' stroke-width='2' marker-end='url(#ar)'/>
  <text x='218' y='138' fill='#f59e0b' text-anchor='middle' font-size='10' font-family='monospace'>200 OK + JSON body</text>
  <text x='340' y='185' fill='#4b5563' text-anchor='middle' font-size='10'>REQUEST (test gonder) --- RESPONSE (sonucu dogrula) --- DB sorgusu sunucu tarafinda</text>
</svg>`

const uiMockupSvg = `<svg viewBox='0 0 720 430' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <rect x='0' y='0' width='720' height='36' rx='10' fill='#0f0f23'/>
  <circle cx='20' cy='18' r='6' fill='#ef4444' opacity='0.8'/>
  <circle cx='40' cy='18' r='6' fill='#f59e0b' opacity='0.8'/>
  <circle cx='60' cy='18' r='6' fill='#10b981' opacity='0.8'/>
  <text x='360' y='24' fill='#FF6C37' text-anchor='middle' font-size='13' font-weight='bold'>📮 Postman</text>
  <rect x='0' y='36' width='180' height='394' fill='#111827'/>
  <text x='15' y='58' fill='#FF6C37' font-size='11' font-weight='bold'>📁 Collections</text>
  <rect x='8' y='65' width='164' height='28' rx='5' fill='#1f2937'/>
  <text x='20' y='84' fill='#d1d5db' font-size='10'>📂 User Endpoints</text>
  <text x='32' y='100' fill='#9ca3af' font-size='9'>📄 GET /users</text>
  <text x='32' y='114' fill='#9ca3af' font-size='9'>📄 POST /users</text>
  <text x='32' y='128' fill='#9ca3af' font-size='9'>📄 DELETE /users/1</text>
  <text x='20' y='148' fill='#d1d5db' font-size='10'>📂 Auth</text>
  <text x='32' y='163' fill='#9ca3af' font-size='9'>📄 POST /login</text>
  <text x='15' y='195' fill='#6b7280' font-size='9'>🌍 Environments</text>
  <text x='20' y='212' fill='#60a5fa' font-size='9' font-weight='bold'>▶ dev</text>
  <text x='20' y='226' fill='#6b7280' font-size='9'>○ staging</text>
  <text x='20' y='240' fill='#6b7280' font-size='9'>○ production</text>
  <rect x='5' y='350' width='170' height='22' rx='4' fill='#7c3aed' opacity='0.3' stroke='#7c3aed' stroke-width='1'/>
  <text x='90' y='365' fill='#a78bfa' text-anchor='middle' font-size='9'>① Sidebar: Collections + Envs</text>
  <rect x='183' y='36' width='537' height='394' fill='#161625'/>
  <rect x='190' y='45' width='523' height='38' rx='7' fill='#0f0f1e' stroke='#374151' stroke-width='1'/>
  <rect x='196' y='50' width='65' height='28' rx='5' fill='#10b981'/>
  <text x='229' y='69' fill='white' text-anchor='middle' font-size='12' font-weight='bold'>GET</text>
  <rect x='268' y='50' width='350' height='28' rx='5' fill='#1f2937'/>
  <text x='280' y='69' fill='#60a5fa' font-size='11'>https://api.example.com/users</text>
  <rect x='625' y='50' width='80' height='28' rx='5' fill='#FF6C37'/>
  <text x='665' y='69' fill='white' text-anchor='middle' font-size='12' font-weight='bold'>Send</text>
  <rect x='190' y='88' width='523' height='18' rx='3' fill='#f59e0b' opacity='0.15' stroke='#f59e0b' stroke-width='1'/>
  <text x='452' y='101' fill='#f59e0b' text-anchor='middle' font-size='9'>② Method + URL + Send — her istegin kalbi</text>
  <rect x='190' y='110' width='523' height='28' fill='#111827'/>
  <text x='200' y='128' fill='#FF6C37' font-size='10' font-weight='bold'>Params</text>
  <text x='255' y='128' fill='#9ca3af' font-size='10'>Authorization</text>
  <text x='360' y='128' fill='#9ca3af' font-size='10'>Headers</text>
  <text x='430' y='128' fill='#9ca3af' font-size='10'>Body</text>
  <text x='475' y='128' fill='#9ca3af' font-size='10'>Pre-request</text>
  <text x='545' y='128' fill='#9ca3af' font-size='10'>Tests</text>
  <rect x='190' y='138' width='523' height='18' rx='3' fill='#7c3aed' opacity='0.15' stroke='#7c3aed' stroke-width='1'/>
  <text x='452' y='151' fill='#a78bfa' text-anchor='middle' font-size='9'>③ Request Tabs — params, auth, headers, body, test scriptleri</text>
  <rect x='190' y='160' width='523' height='100' fill='#0d0d1e'/>
  <text x='205' y='183' fill='#6b7280' font-size='10'>Key</text>
  <text x='380' y='183' fill='#6b7280' font-size='10'>Value</text>
  <line x1='190' y1='190' x2='713' y2='190' stroke='#1f2937' stroke-width='1'/>
  <text x='205' y='208' fill='#60a5fa' font-size='10'>page</text>
  <text x='380' y='208' fill='#10b981' font-size='10'>1</text>
  <text x='205' y='226' fill='#60a5fa' font-size='10'>limit</text>
  <text x='380' y='226' fill='#10b981' font-size='10'>10</text>
  <text x='205' y='244' fill='#374151' font-size='10'>+ Add param</text>
  <rect x='190' y='264' width='523' height='32' fill='#111827'/>
  <text x='205' y='285' fill='#f59e0b' font-size='11' font-weight='bold'>Response</text>
  <text x='530' y='285' fill='#10b981' font-size='11' font-weight='bold'>200 OK</text>
  <text x='590' y='285' fill='#9ca3af' font-size='10'>128 ms</text>
  <text x='645' y='285' fill='#9ca3af' font-size='10'>2.1 KB</text>
  <rect x='190' y='296' width='523' height='24' fill='#0f0f1e'/>
  <text x='205' y='313' fill='#FF6C37' font-size='10' font-weight='bold'>Body</text>
  <text x='243' y='313' fill='#9ca3af' font-size='10'>Cookies</text>
  <text x='298' y='313' fill='#9ca3af' font-size='10'>Headers</text>
  <text x='360' y='313' fill='#9ca3af' font-size='10'>Test Results 2/2</text>
  <rect x='190' y='320' width='523' height='110' fill='#0a0a18'/>
  <text x='205' y='340' fill='#6b7086' font-size='10'>{</text>
  <text x='220' y='355' fill='#60a5fa' font-size='10'>"data": [</text>
  <text x='235' y='370' fill='#9ca3af' font-size='10'>{ "id": 1, "name": "Alice" },</text>
  <text x='235' y='385' fill='#9ca3af' font-size='10'>{ "id": 2, "name": "Bob" }</text>
  <text x='220' y='400' fill='#6b7086' font-size='10'>]</text>
  <rect x='190' y='415' width='523' height='15' rx='3' fill='#10b981' opacity='0.15' stroke='#10b981' stroke-width='1'/>
  <text x='452' y='426' fill='#34d399' text-anchor='middle' font-size='9'>④ Response — status, sure, boyut, body, headers, test sonuclari</text>
</svg>`

const varScopeSvg = `<svg viewBox='0 0 640 290' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='20' y='20' width='580' height='250' rx='12' fill='none' stroke='#ef4444' stroke-width='2' stroke-dasharray='6,3'/>
  <text x='38' y='44' fill='#ef4444' font-size='11' font-weight='bold'>🌐 Global Variables — tum workspace</text>
  <text x='38' y='60' fill='#9ca3af' font-size='9' font-family='monospace'>pm.globals.set("apiKey", "abc123")</text>
  <rect x='50' y='72' width='520' height='185' rx='10' fill='none' stroke='#f59e0b' stroke-width='2' stroke-dasharray='6,3'/>
  <text x='68' y='92' fill='#f59e0b' font-size='11' font-weight='bold'>🌍 Environment Variables — secili ortam (dev / staging / prod)</text>
  <text x='68' y='108' fill='#9ca3af' font-size='9' font-family='monospace'>pm.environment.set("baseUrl", "https://dev.api.com")</text>
  <rect x='80' y='118' width='460' height='127' rx='8' fill='none' stroke='#10b981' stroke-width='2' stroke-dasharray='6,3'/>
  <text x='98' y='138' fill='#10b981' font-size='11' font-weight='bold'>📁 Collection Variables — bu koleksiyon</text>
  <text x='98' y='154' fill='#9ca3af' font-size='9' font-family='monospace'>pm.collectionVariables.set("token", "jwt...")</text>
  <rect x='110' y='163' width='400' height='72' rx='6' fill='none' stroke='#60a5fa' stroke-width='2' stroke-dasharray='6,3'/>
  <text x='126' y='182' fill='#60a5fa' font-size='11' font-weight='bold'>📄 Local Variables — tek istek</text>
  <text x='126' y='197' fill='#9ca3af' font-size='9' font-family='monospace'>pm.variables.set("tmpId", "42")  // istek bittikten sonra silinir</text>
  <text x='126' y='213' fill='#a78bfa' font-size='9' font-family='monospace'>URL: {{baseUrl}}/users/{{tmpId}}  — cift suslu parantez kullan</text>
  <text x='126' y='228' fill='#a78bfa' font-size='9' font-family='monospace'>Header: Authorization: {{token}}</text>
  <text x='525' y='158' fill='#6b7280' font-size='8' text-anchor='middle'>Oncelik:</text>
  <text x='525' y='172' fill='#60a5fa' font-size='8' text-anchor='middle'>Local</text>
  <text x='525' y='186' fill='#10b981' font-size='8' text-anchor='middle'>Collection</text>
  <text x='525' y='200' fill='#f59e0b' font-size='8' text-anchor='middle'>Environment</text>
  <text x='525' y='214' fill='#ef4444' font-size='8' text-anchor='middle'>Global</text>
  <text x='525' y='228' fill='#6b7280' font-size='7' text-anchor='middle'>(en dusuk)</text>
  <text x='525' y='140' fill='#6b7280' font-size='8' text-anchor='middle'>(en yuksek)</text>
</svg>`

const collectionHierarchySvg = `<svg viewBox='0 0 640 260' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:monospace;'>
  <text x='30' y='35' fill='#a78bfa' font-size='12' font-weight='bold'>🏢 Workspace</text>
  <line x1='45' y1='40' x2='45' y2='260' stroke='#374151' stroke-width='1' stroke-dasharray='4,3'/>
  <line x1='45' y1='65' x2='75' y2='65' stroke='#374151' stroke-width='1'/>
  <text x='80' y='70' fill='#FF6C37' font-size='11' font-weight='bold'>📁 My API Tests  (Collection)</text>
  <line x1='90' y1='75' x2='90' y2='230' stroke='#374151' stroke-width='1' stroke-dasharray='4,3'/>
  <line x1='90' y1='100' x2='120' y2='100' stroke='#374151' stroke-width='1'/>
  <text x='125' y='105' fill='#60a5fa' font-size='10'>📂 User Endpoints  (Folder)</text>
  <line x1='135' y1='110' x2='135' y2='185' stroke='#374151' stroke-width='1' stroke-dasharray='4,3'/>
  <line x1='135' y1='125' x2='160' y2='125' stroke='#374151' stroke-width='1'/>
  <text x='165' y='130' fill='#10b981' font-size='10'>📄 GET /users</text>
  <text x='400' y='130' fill='#6b7280' font-size='9'>Tum kullanicilari getir</text>
  <line x1='135' y1='148' x2='160' y2='148' stroke='#374151' stroke-width='1'/>
  <text x='165' y='153' fill='#f59e0b' font-size='10'>📄 POST /users</text>
  <text x='400' y='153' fill='#6b7280' font-size='9'>Yeni kullanici olustur</text>
  <line x1='135' y1='171' x2='160' y2='171' stroke='#374151' stroke-width='1'/>
  <text x='165' y='176' fill='#ef4444' font-size='10'>📄 DELETE /users/1</text>
  <text x='400' y='176' fill='#6b7280' font-size='9'>Kullanici sil</text>
  <line x1='90' y1='205' x2='120' y2='205' stroke='#374151' stroke-width='1'/>
  <text x='125' y='210' fill='#60a5fa' font-size='10'>📂 Auth  (Folder)</text>
  <line x1='135' y1='215' x2='135' y2='248' stroke='#374151' stroke-width='1' stroke-dasharray='4,3'/>
  <line x1='135' y1='228' x2='160' y2='228' stroke='#374151' stroke-width='1'/>
  <text x='165' y='233' fill='#10b981' font-size='10'>📄 POST /login</text>
  <text x='400' y='233' fill='#6b7280' font-size='9'>Token al, env'e kaydet</text>
  <line x1='135' y1='248' x2='160' y2='248' stroke='#374151' stroke-width='1'/>
  <text x='165' y='253' fill='#f59e0b' font-size='10'>📄 POST /logout</text>
</svg>`

const microservicesSvg = `<svg viewBox='0 0 700 390' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <style>
    .ms-auth { animation: ms-glow 2s ease-in-out 0s infinite alternate; }
    .ms-user { animation: ms-glow 2s ease-in-out 0.5s infinite alternate; }
    .ms-order { animation: ms-glow 2s ease-in-out 1s infinite alternate; }
    .ms-pay { animation: ms-glow 2s ease-in-out 1.5s infinite alternate; }
    .ms-la { animation: ms-dash 1.5s linear 0s infinite; stroke-dasharray: 8 5; }
    .ms-lu { animation: ms-dash 1.5s linear 0.4s infinite; stroke-dasharray: 8 5; }
    .ms-lo { animation: ms-dash 1.5s linear 0.8s infinite; stroke-dasharray: 8 5; }
    .ms-lp { animation: ms-dash 1.5s linear 1.2s infinite; stroke-dasharray: 8 5; }
    @keyframes ms-glow { from { opacity:0.5; } to { opacity:1; } }
    @keyframes ms-dash { to { stroke-dashoffset: -26; } }
  </style>
  <rect x='270' y='158' width='160' height='74' rx='12' fill='#FF6C37' opacity='0.2' stroke='#FF6C37' stroke-width='2'/>
  <text x='350' y='193' fill='#FF6C37' text-anchor='middle' font-size='26'>📮</text>
  <text x='350' y='214' fill='#FF6C37' text-anchor='middle' font-size='12' font-weight='bold'>Postman</text>
  <text x='350' y='228' fill='#9ca3af' text-anchor='middle' font-size='9'>Test Client</text>
  <rect x='265' y='20' width='170' height='72' rx='10' fill='#7c3aed' opacity='0.15' stroke='#7c3aed' stroke-width='1.5' class='ms-auth'/>
  <text x='350' y='52' fill='#a78bfa' text-anchor='middle' font-size='22'>🔐</text>
  <text x='350' y='70' fill='#c4b5fd' text-anchor='middle' font-size='11' font-weight='bold'>Auth Service</text>
  <text x='350' y='84' fill='#6b7280' text-anchor='middle' font-size='9'>:3001 — POST /login  POST /refresh</text>
  <line x1='350' y1='158' x2='350' y2='96' stroke='#7c3aed' stroke-width='1.5' class='ms-la'/>
  <rect x='20' y='163' width='168' height='72' rx='10' fill='#60a5fa' opacity='0.15' stroke='#60a5fa' stroke-width='1.5' class='ms-user'/>
  <text x='104' y='196' fill='#93c5fd' text-anchor='middle' font-size='22'>👤</text>
  <text x='104' y='214' fill='#bfdbfe' text-anchor='middle' font-size='11' font-weight='bold'>User Service</text>
  <text x='104' y='228' fill='#6b7280' text-anchor='middle' font-size='9'>:3002 — GET/POST /users</text>
  <line x1='270' y1='197' x2='192' y2='197' stroke='#60a5fa' stroke-width='1.5' class='ms-lu'/>
  <rect x='512' y='163' width='168' height='72' rx='10' fill='#f59e0b' opacity='0.15' stroke='#f59e0b' stroke-width='1.5' class='ms-order'/>
  <text x='596' y='196' fill='#fcd34d' text-anchor='middle' font-size='22'>📦</text>
  <text x='596' y='214' fill='#fde68a' text-anchor='middle' font-size='11' font-weight='bold'>Order Service</text>
  <text x='596' y='228' fill='#6b7280' text-anchor='middle' font-size='9'>:3003 — POST/GET /orders</text>
  <line x1='430' y1='197' x2='510' y2='197' stroke='#f59e0b' stroke-width='1.5' class='ms-lo'/>
  <rect x='265' y='308' width='170' height='72' rx='10' fill='#10b981' opacity='0.15' stroke='#10b981' stroke-width='1.5' class='ms-pay'/>
  <text x='350' y='340' fill='#34d399' text-anchor='middle' font-size='22'>💳</text>
  <text x='350' y='358' fill='#6ee7b7' text-anchor='middle' font-size='11' font-weight='bold'>Payment Service</text>
  <text x='350' y='372' fill='#6b7280' text-anchor='middle' font-size='9'>:3004 — POST /payments</text>
  <line x1='350' y1='235' x2='350' y2='306' stroke='#10b981' stroke-width='1.5' class='ms-lp'/>
  <text x='350' y='388' fill='#374151' text-anchor='middle' font-size='9'>Her servis kendi ortam degiskenini kullanir: {{authUrl}} {{userUrl}} {{orderUrl}} {{payUrl}}</text>
</svg>`

const varCreateSvg = `<svg viewBox='0 0 700 330' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <style>
    .vc-r1 { animation: vc-in 0.4s ease-out 0.3s both; }
    .vc-r2 { animation: vc-in 0.4s ease-out 0.8s both; }
    .vc-r3 { animation: vc-in 0.4s ease-out 1.3s both; }
    .vc-r4 { animation: vc-in 0.4s ease-out 1.8s both; }
    .vc-cur { animation: vc-blink 1s step-start infinite; }
    @keyframes vc-in { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
    @keyframes vc-blink { 50% { opacity:0; } }
  </style>
  <rect x='0' y='0' width='700' height='34' fill='#0d0d1e' rx='8'/>
  <text x='350' y='22' fill='#FF6C37' text-anchor='middle' font-size='12' font-weight='bold'>Environments → + Create environment → "microservices-dev"</text>
  <rect x='10' y='42' width='680' height='270' rx='10' fill='#111827'/>
  <text x='24' y='64' fill='#FF6C37' font-size='10' font-weight='bold'>Adim 1: Sol sidebar → Environments → + Create → Adi: microservices-dev</text>
  <rect x='18' y='72' width='664' height='22' fill='#1f2937' rx='3'/>
  <text x='110' y='87' fill='#9ca3af' font-size='9'>VARIABLE</text>
  <text x='300' y='87' fill='#9ca3af' font-size='9'>INITIAL VALUE</text>
  <text x='500' y='87' fill='#9ca3af' font-size='9'>CURRENT VALUE</text>
  <g class='vc-r1'>
    <rect x='18' y='94' width='664' height='30' fill='#161625' stroke='#1f2937' stroke-width='0.5'/>
    <rect x='22' y='98' width='150' height='22' rx='3' fill='#1f2937' stroke='#60a5fa' stroke-width='1'/>
    <text x='30' y='113' fill='#60a5fa' font-size='10'>baseUrl</text>
    <rect x='222' y='98' width='240' height='22' rx='3' fill='#1f2937'/>
    <text x='230' y='113' fill='#10b981' font-size='9'>https://dev.api.company.com</text>
    <rect x='472' y='98' width='200' height='22' rx='3' fill='#1f2937'/>
    <text x='480' y='113' fill='#10b981' font-size='9'>https://dev.api.company.com</text>
  </g>
  <g class='vc-r2'>
    <rect x='18' y='124' width='664' height='30' fill='#161625' stroke='#1f2937' stroke-width='0.5'/>
    <rect x='22' y='128' width='150' height='22' rx='3' fill='#1f2937' stroke='#60a5fa' stroke-width='1'/>
    <text x='30' y='143' fill='#60a5fa' font-size='10'>authToken</text>
    <rect x='222' y='128' width='240' height='22' rx='3' fill='#1f2937'/>
    <text x='230' y='143' fill='#6b7280' font-size='9'>(login test scripti dolduracak)</text>
    <rect x='472' y='128' width='200' height='22' rx='3' fill='#1f2937'/>
    <text x='480' y='143' fill='#6b7280' font-size='9'>eyJhbGci... (test sonrasi)</text>
  </g>
  <g class='vc-r3'>
    <rect x='18' y='154' width='664' height='30' fill='#161625' stroke='#1f2937' stroke-width='0.5'/>
    <rect x='22' y='158' width='150' height='22' rx='3' fill='#1f2937' stroke='#60a5fa' stroke-width='1'/>
    <text x='30' y='173' fill='#60a5fa' font-size='10'>userId</text>
    <rect x='222' y='158' width='240' height='22' rx='3' fill='#1f2937'/>
    <text x='230' y='173' fill='#6b7280' font-size='9'>(POST /users sonrasi kayit)</text>
    <rect x='472' y='158' width='200' height='22' rx='3' fill='#1f2937'/>
    <text x='480' y='173' fill='#6b7280' font-size='9'>42</text>
  </g>
  <g class='vc-r4'>
    <rect x='18' y='184' width='664' height='30' fill='#161625' stroke='#1f2937' stroke-width='0.5'/>
    <rect x='22' y='188' width='150' height='22' rx='3' fill='#1f2937' stroke='#60a5fa' stroke-width='1'/>
    <text x='30' y='203' fill='#60a5fa' font-size='10'>orderId</text>
    <rect x='222' y='188' width='240' height='22' rx='3' fill='#1f2937'/>
    <text x='230' y='203' fill='#6b7280' font-size='9'>(POST /orders sonrasi kayit)</text>
    <rect x='472' y='188' width='200' height='22' rx='3' fill='#1f2937'/>
    <text x='480' y='203' fill='#6b7280' font-size='9'>101</text>
  </g>
  <rect x='578' y='230' width='110' height='26' rx='5' fill='#FF6C37'/>
  <text x='633' y='247' fill='white' text-anchor='middle' font-size='11' font-weight='bold'>Update</text>
  <text x='24' y='278' fill='#10b981' font-size='10' font-weight='bold'>Adim 2: URL barinda cift suslu parantez kullan:</text>
  <rect x='18' y='285' width='664' height='22' rx='4' fill='#0f0f1e' stroke='#374151' stroke-width='1'/>
  <text x='26' y='300' fill='#60a5fa' font-size='9'>GET {{baseUrl}}/api/orders/{{orderId}}     Authorization: Bearer {{authToken}}</text>
  <rect x='667' y='128' width='6' height='22' rx='2' fill='#FF6C37' class='vc-cur'/>
</svg>`

const collectionRunnerSvg = `<svg viewBox='0 0 700 355' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:sans-serif;'>
  <style>
    .cr-prog { animation: cr-p 4s ease-out 0.5s both; }
    .cr-1 { animation: cr-row 0.3s ease-out 1.0s both; }
    .cr-2 { animation: cr-row 0.3s ease-out 1.8s both; }
    .cr-3 { animation: cr-row 0.3s ease-out 2.6s both; }
    .cr-4 { animation: cr-row 0.3s ease-out 3.4s both; }
    .cr-5 { animation: cr-row 0.3s ease-out 4.2s both; }
    .cr-chk1 { animation: cr-chk 0.2s ease-out 1.2s both; }
    .cr-chk2 { animation: cr-chk 0.2s ease-out 2.0s both; }
    .cr-chk3 { animation: cr-chk 0.2s ease-out 2.8s both; }
    .cr-chk4 { animation: cr-chk 0.2s ease-out 3.6s both; }
    .cr-chk5 { animation: cr-chk 0.2s ease-out 4.4s both; }
    @keyframes cr-p {
      from { stroke-dashoffset: 640; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes cr-row { from { opacity:0; } to { opacity:1; } }
    @keyframes cr-chk { from { opacity:0; transform:scale(0); } to { opacity:1; transform:scale(1); } }
  </style>
  <rect x='0' y='0' width='700' height='32' fill='#0d0d1e' rx='8'/>
  <text x='350' y='21' fill='#FF6C37' text-anchor='middle' font-size='12' font-weight='bold'>Collection Runner — Microservices E2E Akisi (5 istek, 12 test)</text>
  <rect x='28' y='40' width='644' height='16' rx='8' fill='#1f2937'/>
  <line x1='28' y1='48' x2='672' y2='48' stroke='#10b981' stroke-width='16' stroke-linecap='round' stroke-dasharray='644 644' stroke-dashoffset='644' class='cr-prog'/>
  <text x='350' y='52' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>5 / 5</text>
  <g class='cr-1'>
    <rect x='18' y='65' width='664' height='42' rx='6' fill='#0d2818'/>
    <rect x='26' y='72' width='54' height='18' rx='3' fill='#10b981'/>
    <text x='53' y='85' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>POST</text>
    <text x='92' y='83' fill='#d1d5db' font-size='10'>{{authUrl}}/login</text>
    <text x='92' y='97' fill='#9ca3af' font-size='8'>Auth Service · 200 OK · token kaydet → pm.environment.set("authToken", body.token)</text>
  </g>
  <text x='655' y='91' fill='#10b981' font-size='18' text-anchor='middle' class='cr-chk1'>✓</text>
  <g class='cr-2'>
    <rect x='18' y='115' width='664' height='42' rx='6' fill='#0d2818'/>
    <rect x='26' y='122' width='54' height='18' rx='3' fill='#f59e0b'/>
    <text x='53' y='135' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>POST</text>
    <text x='92' y='133' fill='#d1d5db' font-size='10'>{{userUrl}}/users</text>
    <text x='92' y='147' fill='#9ca3af' font-size='8'>User Service · 201 Created · userId kaydet → pm.environment.set("userId", body.id)</text>
  </g>
  <text x='655' y='141' fill='#10b981' font-size='18' text-anchor='middle' class='cr-chk2'>✓</text>
  <g class='cr-3'>
    <rect x='18' y='165' width='664' height='42' rx='6' fill='#0d2818'/>
    <rect x='26' y='172' width='44' height='18' rx='3' fill='#10b981'/>
    <text x='48' y='185' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>GET</text>
    <text x='82' y='183' fill='#d1d5db' font-size='10'>{{userUrl}}/users/{{userId}}</text>
    <text x='82' y='197' fill='#9ca3af' font-size='8'>User Service · 200 OK · ad, email alanlari kontrol edildi</text>
  </g>
  <text x='655' y='191' fill='#10b981' font-size='18' text-anchor='middle' class='cr-chk3'>✓</text>
  <g class='cr-4'>
    <rect x='18' y='215' width='664' height='42' rx='6' fill='#0d2818'/>
    <rect x='26' y='222' width='54' height='18' rx='3' fill='#f59e0b'/>
    <text x='53' y='235' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>POST</text>
    <text x='92' y='233' fill='#d1d5db' font-size='10'>{{orderUrl}}/orders</text>
    <text x='92' y='247' fill='#9ca3af' font-size='8'>Order Service · 201 Created · orderId kaydet → pm.environment.set("orderId", body.id)</text>
  </g>
  <text x='655' y='241' fill='#10b981' font-size='18' text-anchor='middle' class='cr-chk4'>✓</text>
  <g class='cr-5'>
    <rect x='18' y='265' width='664' height='42' rx='6' fill='#0d2818'/>
    <rect x='26' y='272' width='54' height='18' rx='3' fill='#ef4444'/>
    <text x='53' y='285' fill='white' text-anchor='middle' font-size='9' font-weight='bold'>POST</text>
    <text x='92' y='283' fill='#d1d5db' font-size='10'>{{payUrl}}/payments</text>
    <text x='92' y='297' fill='#9ca3af' font-size='8'>Payment Service · 201 Created · odeme tamamlandi dogrulandi</text>
  </g>
  <text x='655' y='291' fill='#10b981' font-size='18' text-anchor='middle' class='cr-chk5'>✓</text>
  <rect x='18' y='318' width='664' height='26' rx='5' fill='#064e3b'/>
  <text x='350' y='335' fill='#34d399' text-anchor='middle' font-size='11' font-weight='bold'>5 istek · 12 test · 0 basarisizlik · 847ms toplam sure</text>
</svg>`

const shareFlowSvg = `<svg viewBox='0 0 700 290' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <style>
    .sf-1 { animation: sf-up 0.4s ease-out 0.2s both; }
    .sf-2 { animation: sf-up 0.4s ease-out 0.5s both; }
    .sf-3 { animation: sf-up 0.4s ease-out 0.8s both; }
    .sf-4 { animation: sf-up 0.4s ease-out 1.1s both; }
    @keyframes sf-up { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  </style>
  <rect x='265' y='14' width='170' height='60' rx='10' fill='#FF6C37' opacity='0.2' stroke='#FF6C37' stroke-width='2'/>
  <text x='350' y='42' fill='#FF6C37' text-anchor='middle' font-size='24'>📮</text>
  <text x='350' y='62' fill='#FF6C37' text-anchor='middle' font-size='11' font-weight='bold'>collection.json</text>
  <line x1='308' y1='76' x2='104' y2='162' stroke='#374151' stroke-width='1.5' stroke-dasharray='5 3'/>
  <line x1='328' y1='76' x2='265' y2='162' stroke='#374151' stroke-width='1.5' stroke-dasharray='5 3'/>
  <line x1='372' y1='76' x2='435' y2='162' stroke='#374151' stroke-width='1.5' stroke-dasharray='5 3'/>
  <line x1='392' y1='76' x2='596' y2='162' stroke='#374151' stroke-width='1.5' stroke-dasharray='5 3'/>
  <g class='sf-1'>
    <rect x='22' y='164' width='162' height='104' rx='10' fill='#1f2937' stroke='#60a5fa' stroke-width='1.5'/>
    <text x='103' y='194' fill='#60a5fa' text-anchor='middle' font-size='24'>📄</text>
    <text x='103' y='213' fill='#93c5fd' text-anchor='middle' font-size='11' font-weight='bold'>Export JSON</text>
    <text x='103' y='229' fill='#9ca3af' text-anchor='middle' font-size='9'>Sag tikla → Export</text>
    <text x='103' y='244' fill='#6b7280' text-anchor='middle' font-size='9'>Collection v2.1 formatinda</text>
    <text x='103' y='258' fill='#6b7280' text-anchor='middle' font-size='9'>Tek seferlik paylasim</text>
  </g>
  <g class='sf-2'>
    <rect x='196' y='164' width='162' height='104' rx='10' fill='#1f2937' stroke='#10b981' stroke-width='1.5'/>
    <text x='277' y='194' fill='#10b981' text-anchor='middle' font-size='24'>🌿</text>
    <text x='277' y='213' fill='#34d399' text-anchor='middle' font-size='11' font-weight='bold'>Git Repository</text>
    <text x='277' y='229' fill='#9ca3af' text-anchor='middle' font-size='9'>tests/postman/ klasoru</text>
    <text x='277' y='244' fill='#6b7280' text-anchor='middle' font-size='9'>Versiyon kontrollu</text>
    <text x='277' y='258' fill='#6b7280' text-anchor='middle' font-size='9'>CI/CD icin zorunlu</text>
  </g>
  <g class='sf-3'>
    <rect x='370' y='164' width='162' height='104' rx='10' fill='#1f2937' stroke='#a78bfa' stroke-width='1.5'/>
    <text x='451' y='194' fill='#a78bfa' text-anchor='middle' font-size='24'>☁️</text>
    <text x='451' y='213' fill='#c4b5fd' text-anchor='middle' font-size='11' font-weight='bold'>Postman Cloud</text>
    <text x='451' y='229' fill='#9ca3af' text-anchor='middle' font-size='9'>Share → Workspace</text>
    <text x='451' y='244' fill='#6b7280' text-anchor='middle' font-size='9'>Gercek zamanli sync</text>
    <text x='451' y='258' fill='#6b7280' text-anchor='middle' font-size='9'>Takim paylasimi</text>
  </g>
  <g class='sf-4'>
    <rect x='544' y='164' width='162' height='104' rx='10' fill='#1f2937' stroke='#f59e0b' stroke-width='1.5'/>
    <text x='625' y='194' fill='#f59e0b' text-anchor='middle' font-size='24'>⚡</text>
    <text x='625' y='213' fill='#fcd34d' text-anchor='middle' font-size='11' font-weight='bold'>Newman CLI</text>
    <text x='625' y='229' fill='#9ca3af' text-anchor='middle' font-size='9'>newman run col.json</text>
    <text x='625' y='244' fill='#6b7280' text-anchor='middle' font-size='9'>Otomatik regresyon</text>
    <text x='625' y='258' fill='#6b7280' text-anchor='middle' font-size='9'>Exit code 1 = FAIL</text>
  </g>
</svg>`

const pmRequestCycleFilm = {
  type: 'video-scene',
  id: 'pm-request-cycle-film',
  title: { tr: '🎬 Postman\'da Tek Tıkla İstek: Sahne Arkasında Ne Olur?', en: '🎬 One Click in Postman: What Happens Behind the Scenes?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'client', emoji: '📮', label: { tr: 'Postman İstemcisi', en: 'Postman Client' }, color: '#f59e0b' },
    { id: 'request', emoji: '📤', label: { tr: 'HTTP İsteği', en: 'HTTP Request' }, color: '#0ea5e9' },
    { id: 'server', emoji: '🌐', label: { tr: 'API Sunucusu', en: 'API Server' }, color: '#8b5cf6' },
    { id: 'response', emoji: '📥', label: { tr: 'Response + Test Sonucu', en: 'Response + Test Result' }, color: '#22c55e' },
    { id: 'ghost', emoji: '👻', label: { tr: '200 ama YANLIŞ veri', en: '200 but WRONG data' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: '"Send" butonuna tıklıyorsun ve saniyeler içinde bir yanıt geliyor — ama bu tek tık aslında kaç ayrı adımı gizliyor?', en: 'You click "Send" and a response arrives in seconds — but how many separate steps does that one click actually hide?' },
      positions: { client: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — Postman, GUI\'de girdiğin method/URL/header/body\'yi GERÇEK bir HTTP isteğine dönüştürür — bu, senin daha önce yazdığın bir cURL komutuyla BİREBİR aynı işi yapar.', en: 'Step 1 — Postman converts the method/URL/headers/body you entered in the GUI into a REAL HTTP request — this does the EXACT same job as a cURL command you might have typed by hand.' },
      code: { tr: `GET https://reqres.in/api/users/2\nAccept: application/json`, en: `GET https://reqres.in/api/users/2\nAccept: application/json` },
      positions: { client: { x: 20, y: 40, scale: 1.0 }, request: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'client', to: 'request', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Adım 2 — istek gerçek ağ üzerinden sunucuya ulaşır — Postman burada sadece bir "istemci" (client), tıpkı bir tarayıcı gibi; API\'nin kendisiyle hiçbir özel anlaşması yoktur.', en: 'Step 2 — the request travels over the real network to the server — Postman here is just a "client", like a browser; it has no special agreement with the API itself.' },
      positions: { request: { x: 22, y: 40, scale: 0.95 }, server: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'server', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 3 (kontrast) — sunucu 200 OK döner ama body\'deki `email` alanı BEKLENENDEN farklıdır — status kodu YEŞİL ışık yakar ama veri aslında YANLIŞTIR, ve status koduna bakan biri bunu asla fark etmez.', en: 'Step 3 (the contrast) — the server returns 200 OK but the `email` field in the body is DIFFERENT than expected — the status code gives a GREEN light but the data is actually WRONG, and anyone only glancing at the status code would never notice.' },
      code: { tr: `HTTP/1.1 200 OK\n{ "data": { "email": "yanlis@ornek.com" } } // beklenmiyordu!`, en: `HTTP/1.1 200 OK\n{ "data": { "email": "wrong@example.com" } } // not expected!` },
      positions: { server: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'server', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 4 — bu yüzden "Tests" sekmesindeki script\'ler status koduyla YETİNMEZ, body\'nin İÇİNDEKİ alanları da tek tek kontrol eder — response gelir gelmez bu script\'ler otomatik çalışır.', en: 'Step 4 — this is why the scripts in the "Tests" tab do NOT stop at the status code, they also check the fields INSIDE the body one by one — these scripts run automatically the moment the response arrives.' },
      positions: { ghost: { x: 22, y: 40, scale: 0.9 }, response: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'ghost', to: 'response', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — Postman "Send" butonu bir kısayoldur, sihir değil: senin manuel yazacağın bir HTTP isteğini GUI ile hazırlar. Gerçek doğrulama işi hâlâ "Tests" sekmesindeki assertion\'lara aittir — status kodu tek başına asla YETERLİ bir kanıt değildir.', en: 'The lesson — Postman\'s "Send" button is a shortcut, not magic: it prepares an HTTP request you\'d otherwise write by hand, via a GUI. The real verification work still belongs to the assertions in the "Tests" tab — a status code alone is NEVER sufficient proof.' },
      positions: { response: { x: 35, y: 50, scale: 1.1 }, client: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const pmFirstRequestFilm = {
  type: 'video-scene',
  id: 'pm-first-request-film',
  title: { tr: '🎬 Kurulumdan İlk Yeşil Teste: Postman\'de Sıfırdan Başlamak', en: '🎬 From Install to First Green Test: Starting from Zero in Postman' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'download', emoji: '⬇️', label: { tr: 'Postman İndir/Kur', en: 'Download/Install Postman' }, color: '#0ea5e9' },
    { id: 'workspace', emoji: '🗂️', label: { tr: 'Workspace Oluştur', en: 'Create Workspace' }, color: '#f59e0b' },
    { id: 'collection', emoji: '📁', label: { tr: 'Collection Oluştur', en: 'Create Collection' }, color: '#8b5cf6' },
    { id: 'firstreq', emoji: '✅', label: { tr: 'İlk İstek Gönderildi', en: 'First Request Sent' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'Postman\'i az önce kurdun, boş bir ekranla karşılaştın — ilk anlamlı isteği gönderene kadar hangi adımlardan geçmen gerekiyor?', en: 'You just installed Postman and see an empty screen — which steps do you need before sending your first meaningful request?' },
      positions: { download: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — postman.com/downloads\'tan işletim sistemine uygun sürüm indirilir, kurulur; ilk açılışta ücretsiz bir hesapla giriş yapman istenir (senkronizasyon için).', en: 'Step 1 — the OS-appropriate version is downloaded from postman.com/downloads and installed; on first launch you\'re asked to sign in with a free account (for sync).' },
      positions: { download: { x: 20, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — bir Workspace oluşturulur — bu, ilgili tüm collection\'ların, environment\'ların ve ekip üyelerinin bir arada tutulduğu bir "proje klasörü"dür.', en: 'Step 2 — a Workspace is created — this is a "project folder" holding all related collections, environments, and team members together.' },
      positions: { download: { x: 18, y: 55, opacity: 0.5, scale: 0.85 }, workspace: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'download', to: 'workspace', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 3 — Workspace içinde bir Collection oluşturulur — ilgili tüm istekleri (login, users, orders...) mantıksal olarak bir arada gruplayan bir klasördür.', en: 'Step 3 — a Collection is created inside the Workspace — a folder logically grouping all related requests (login, users, orders...) together.' },
      positions: { workspace: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, collection: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'workspace', to: 'collection', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 4 — collection\'ın içine "New Request" ile bir GET isteği eklenir, URL yazılır, "Send" tıklanır — ilk gerçek yanıt ekrana gelir.', en: 'Step 4 — a GET request is added inside the collection via "New Request", the URL is typed, "Send" is clicked — the first real response appears on screen.' },
      code: { tr: `GET https://reqres.in/api/users/2`, en: `GET https://reqres.in/api/users/2` },
      positions: { collection: { x: 22, y: 40, scale: 0.95 }, firstreq: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'collection', to: 'firstreq', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — bu hiyerarşi (Workspace → Collection → Request) tesadüfi değil: Java\'daki proje → paket → sınıf hiyerarşisiyle AYNI organizasyon mantığını taşır — ilgili şeyleri bir arada tutup büyüdükçe kaosu önler.', en: 'The lesson — this hierarchy (Workspace → Collection → Request) isn\'t accidental: it carries the SAME organizational logic as Java\'s project → package → class hierarchy — keeping related things together and preventing chaos as things grow.' },
      positions: { firstreq: { x: 35, y: 50, scale: 1.1 }, collection: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const pmVariableResolutionFilm = {
  type: 'video-scene',
  id: 'pm-variable-resolution-film',
  title: { tr: '🎬 {{baseUrl}}: Bir Değişken Nasıl Gerçek Bir URL\'e Dönüşür?', en: '🎬 {{baseUrl}}: How a Variable Becomes a Real URL' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'request', emoji: '📝', label: { tr: '{{baseUrl}}/users/2', en: '{{baseUrl}}/users/2' }, color: '#0ea5e9' },
    { id: 'local', emoji: '📗', label: { tr: 'Local (en yüksek öncelik)', en: 'Local (highest priority)' }, color: '#22c55e' },
    { id: 'environment', emoji: '📘', label: { tr: 'Environment', en: 'Environment' }, color: '#f59e0b' },
    { id: 'global', emoji: '📙', label: { tr: 'Global (en düşük öncelik)', en: 'Global (lowest priority)' }, color: '#94a3b8' },
    { id: 'resolved', emoji: '✅', label: { tr: 'https://staging.api.com/users/2', en: 'https://staging.api.com/users/2' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: { tr: '`{{baseUrl}}` yazıyorsun, ama BAZEN staging\'e, bazen production\'a gidiyor — bu tek satır her seferinde farklı bir gerçek URL\'e nasıl dönüşüyor?', en: 'You write `{{baseUrl}}`, but SOMETIMES it goes to staging, sometimes to production — how does this single line turn into a different real URL each time?' },
      positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — Postman `{{baseUrl}}`\'i gördüğünde, bu değişkeni ÇÖZMEK için bir öncelik sırasına göre ARAMA yapar — rastgele bir yerden almaz.', en: 'Step 1 — when Postman sees `{{baseUrl}}`, it SEARCHES for this variable following a priority order to RESOLVE it — it doesn\'t grab it from a random place.' },
      positions: { request: { x: 20, y: 40, scale: 1.0 }, local: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'local', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 2 — ÖNCE Local (o isteğe özel, geçici) değişkenlere bakılır — varsa bu KAZANIR ve arama burada durur.', en: 'Step 2 — FIRST it checks Local (request-specific, temporary) variables — if one exists, this WINS and the search stops here.' },
      positions: { local: { x: 22, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 3 — Local\'de yoksa, aktif seçili Environment\'a (örn. "Staging") bakılır — bu genelde takım içinde en sık kullanılan katmandır.', en: 'Step 3 — if not in Local, the active selected Environment (e.g. "Staging") is checked — this is usually the most commonly used layer within a team.' },
      positions: { local: { x: 20, y: 55, opacity: 0.5, scale: 0.85 }, environment: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'local', to: 'environment', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 4 (kontrast) — Environment\'ta da yoksa Global değişkenlere düşülür — bu EN DÜŞÜK öncelikli katmandır ve genelde nadiren değişen sabitler için kullanılır. Yanlışlıkla hem Environment\'ta hem Global\'de AYNI isimde farklı değerler tanımlarsan, Environment HER ZAMAN kazanır — bu şaşırtıcı bir "neden yanlış URL\'e gitti?" hatasının kaynağıdır.', en: 'Step 4 (the contrast) — if not in Environment either, it falls back to Global variables — this is the LOWEST priority layer, usually for rarely-changing constants. If you accidentally define the SAME name with different values in both Environment and Global, Environment ALWAYS wins — this is the source of a confusing "why did it hit the wrong URL?" bug.' },
      positions: { environment: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, global: { x: 55, y: 55, scale: 1.15 } },
      beams: [{ from: 'environment', to: 'global', color: '#94a3b8' }],
    },
    {
      caption: { tr: 'Adım 5 — hangi katmandan geldiğine bakılmaksızın, `{{baseUrl}}` GERÇEK bir string ile değiştirilir ve istek bu TAM URL\'e gönderilir.', en: 'Step 5 — regardless of which layer it came from, `{{baseUrl}}` is replaced with a REAL string, and the request is sent to this FULL URL.' },
      positions: { global: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, resolved: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'global', to: 'resolved', color: '#8b5cf6' }],
    },
  ],
}

const pmTestScriptTimingFilm = {
  type: 'video-scene',
  id: 'pm-test-script-timing-film',
  title: { tr: '🎬 pm.test(): Script Ne Zaman, Response\'tan ÖNCE mi SONRA mı Çalışır?', en: '🎬 pm.test(): Does the Script Run BEFORE or AFTER the Response?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'request', emoji: '📤', label: { tr: 'İstek Gönderilir', en: 'Request Sent' }, color: '#0ea5e9' },
    { id: 'server', emoji: '🌐', label: { tr: 'Sunucu İşler', en: 'Server Processes' }, color: '#8b5cf6' },
    { id: 'response', emoji: '📥', label: { tr: 'Response Gelir', en: 'Response Arrives' }, color: '#f59e0b' },
    { id: 'testscript', emoji: '🧪', label: { tr: '"Tests" Script\'i Çalışır', en: '"Tests" Script Runs' }, color: '#22c55e' },
    { id: 'ghost', emoji: '👻', label: { tr: 'response HENÜZ yok — ReferenceError', en: 'response does NOT exist yet — ReferenceError' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: '"Tests" sekmesine `pm.response.json()` yazıyorsun — bu script GÖNDERMEDEN önce mi, response GELDİKTEN sonra mı çalışıyor? Bu sırayı bilmek neden kritik?', en: 'You write `pm.response.json()` in the "Tests" tab — does this script run before sending, or after the response arrives? Why is knowing this order critical?' },
      positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — istek "Send" ile ağa gönderilir — bu ana kadar "Tests" sekmesindeki KOD hiç çalışmamıştır, sadece yazılıp beklemektedir.', en: 'Step 1 — the request goes out over the network on "Send" — up to this point the CODE in the "Tests" tab has not run at all, it just sits there written.' },
      positions: { request: { x: 20, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — sunucu isteği işler, bir süre alır (network gecikmesi + sunucu işleme süresi) — bu SÜREÇ boyunca "Tests" kodu hâlâ ÇALIŞMAMIŞTIR.', en: 'Step 2 — the server processes the request, taking some time (network latency + server processing time) — throughout this PROCESS, the "Tests" code has still NOT run.' },
      positions: { request: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, server: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'server', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 3 — response GERİ döner — Postman şimdi "Tests" sekmesindeki script\'i çalıştırır, `pm.response` nesnesi ARTIK gerçek veriyle DOLUDUR.', en: 'Step 3 — the response comes back — Postman NOW runs the "Tests" tab script, and the `pm.response` object is NOW filled with real data.' },
      code: { tr: `pm.test("Status is 200", function() {\n  pm.response.to.have.status(200); // response ARTIK var\n});`, en: `pm.test("Status is 200", function() {\n  pm.response.to.have.status(200); // response NOW exists\n});` },
      positions: { server: { x: 22, y: 40, scale: 0.95 }, response: { x: 45, y: 55, scale: 1.1 }, testscript: { x: 68, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'response', to: 'testscript', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 4 (kontrast) — "Pre-request Script" sekmesine YANLIŞLIKLA `pm.response.json()` yazsaydın: istek DAHA GÖNDERİLMEDEN çalışır, `pm.response` henüz YOKTUR — bu "Cannot read properties of undefined" hatasıyla PATLAR.', en: 'Step 4 (the contrast) — if you accidentally wrote `pm.response.json()` in the "Pre-request Script" tab instead: it runs BEFORE the request is even sent, `pm.response` does NOT exist yet — it CRASHES with "Cannot read properties of undefined".' },
      code: { tr: `// Pre-request Script'te (YANLIŞ sekme!):\npm.response.json() // TypeError: Cannot read properties of undefined`, en: `// In Pre-request Script (WRONG tab!):\npm.response.json() // TypeError: Cannot read properties of undefined` },
      positions: { testscript: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'testscript', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Ders — "Pre-request Script" İSTEKTEN ÖNCE (auth token yenileme, dinamik veri üretme için), "Tests" script\'i RESPONSE\'TAN SONRA çalışır (assertion için) — bu ikisi asla karıştırılmamalı, ismindeki "pre"/"test" kelimesi tam olarak ZAMANLAMAYI anlatır.', en: 'The lesson — "Pre-request Script" runs BEFORE the request (for refreshing auth tokens, generating dynamic data), "Tests" script runs AFTER the response (for assertions) — these must never be confused; the words "pre"/"test" in their names describe exactly this TIMING.' },
      positions: { ghost: { x: 35, y: 50, scale: 1.1 }, request: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const pmNewmanCiFilm = {
  type: 'video-scene',
  id: 'pm-newman-ci-film',
  title: { tr: '🎬 Newman: Postman Koleksiyonunu GUI\'siz CI\'da Çalıştırmak', en: '🎬 Newman: Running a Postman Collection Without a GUI in CI' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'export', emoji: '📤', label: { tr: 'Collection Export (JSON)', en: 'Collection Export (JSON)' }, color: '#0ea5e9' },
    { id: 'push', emoji: '🔀', label: { tr: 'git push', en: 'git push' }, color: '#8b5cf6' },
    { id: 'newman', emoji: '⚡', label: { tr: 'newman run collection.json', en: 'newman run collection.json' }, color: '#f59e0b' },
    { id: 'exitcode', emoji: '🚦', label: { tr: 'Exit Code (0=PASS, 1=FAIL)', en: 'Exit Code (0=PASS, 1=FAIL)' }, color: '#22c55e' },
    { id: 'blocked', emoji: '👻', label: { tr: 'Merge Engellendi', en: 'Merge Blocked' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Postman GUI\'sinde her şey PASS oluyor — ama CI sunucusunda ekranı yok, kimse tıklamıyor. Bu koleksiyon CI\'da nasıl otomatik çalışır?', en: 'Everything PASSes in the Postman GUI — but a CI server has no screen, nobody clicks anything. How does this collection run automatically in CI?' },
      positions: { export: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — collection, "Export" ile düz bir JSON dosyasına dönüştürülür ve projenin Git deposuna eklenir.', en: 'Step 1 — the collection is turned into a plain JSON file via "Export" and added to the project\'s Git repository.' },
      positions: { export: { x: 20, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — bu JSON dosyası `git push` ile repoya gider — artık collection, GUI\'ye değil, GİT\'e bağlıdır.', en: 'Step 2 — this JSON file goes to the repo via `git push` — the collection is now tied to GIT, not the GUI.' },
      positions: { export: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, push: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'export', to: 'push', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 3 — CI pipeline\'ında `newman run collection.json` çalıştırılır — Newman, Node.js tabanlı bir CLI\'dır ve TAM OLARAK GUI\'nin yaptığı isteklerin AYNISINI, ekran olmadan gönderir.', en: 'Step 3 — `newman run collection.json` runs in the CI pipeline — Newman is a Node.js-based CLI that sends EXACTLY the SAME requests the GUI would, with no screen.' },
      code: { tr: `newman run collection.json -e staging.postman_environment.json`, en: `newman run collection.json -e staging.postman_environment.json` },
      positions: { push: { x: 22, y: 40, scale: 0.95 }, newman: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'push', to: 'newman', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 4 (kontrast) — bir test FAIL olursa Newman süreç çıkış kodunu (exit code) 1 yapar — CI sistemi bunu OKUR ve pipeline\'ı KIRMIZI işaretler, PR\'ın merge edilmesini ENGELLER.', en: 'Step 4 (the contrast) — if a test FAILS, Newman sets the process exit code to 1 — the CI system READS this and marks the pipeline RED, BLOCKING the PR from merging.' },
      code: { tr: `# 3 failing tests found\nprocess.exit(1) // CI bunu görüp pipeline'ı kırar`, en: `# 3 failing tests found\nprocess.exit(1) // CI sees this and breaks the pipeline` },
      positions: { newman: { x: 20, y: 40, scale: 0.95 }, blocked: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'newman', to: 'blocked', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Ders — Newman, Postman GUI\'sinin script\'lerini (Tests tab) BİREBİR aynı şekilde çalıştırır — GUI\'de yazdığın hiçbir assertion, CI\'da yeniden yazılmaz, sadece komut satırından tetiklenir.', en: 'The lesson — Newman runs the Postman GUI\'s scripts (Tests tab) EXACTLY the same way — none of the assertions you wrote in the GUI get rewritten for CI, they\'re just triggered from the command line instead.' },
      positions: { blocked: { x: 35, y: 50, scale: 1.1 }, exitcode: { x: 65, y: 50, scale: 1.0, opacity: 0.7 } },
    },
  ],
}

const pmMockServerFilm = {
  type: 'video-scene',
  id: 'pm-mock-server-film',
  title: { tr: '🎬 Mock Server: Backend Hazır Olmadan Frontend\'i Test Etmek', en: '🎬 Mock Server: Testing the Frontend Before the Backend Exists' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'collection', emoji: '📁', label: { tr: 'Collection (örnek response tanımlı)', en: 'Collection (example responses defined)' }, color: '#0ea5e9' },
    { id: 'mockserver', emoji: '🎭', label: { tr: 'Postman Mock Server', en: 'Postman Mock Server' }, color: '#f59e0b' },
    { id: 'frontend', emoji: '💻', label: { tr: 'Frontend Geliştiricisi', en: 'Frontend Developer' }, color: '#8b5cf6' },
    { id: 'realapi', emoji: '👻', label: { tr: 'Gerçek Backend (henüz YOK)', en: 'Real Backend (does NOT exist yet)' }, color: '#94a3b8' },
  ],
  scenes: [
    {
      caption: { tr: 'Backend ekibi API\'yi henüz bitirmedi, ama frontend ekibi ŞİMDİ entegrasyona başlamak istiyor — gerçek bir sunucu olmadan bu nasıl mümkün olur?', en: 'The backend team hasn\'t finished the API yet, but the frontend team wants to start integrating NOW — how is this possible without a real server?' },
      positions: { collection: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — collection\'daki her isteğe "Example Response" olarak beklenen JSON yanıtı ELLE tanımlanır — bu, API sözleşmesinin (contract) bir taslağıdır.', en: 'Step 1 — an "Example Response" with the expected JSON is MANUALLY defined for each request in the collection — this is a draft of the API contract.' },
      positions: { collection: { x: 20, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — Postman bu collection\'dan GERÇEK, çalışan bir URL (bir Mock Server) üretir — bu URL, tanımladığın örnek yanıtları GERÇEK bir HTTP sunucusu gibi döner.', en: 'Step 2 — Postman generates a REAL, working URL (a Mock Server) from this collection — this URL returns your defined example responses just like a REAL HTTP server would.' },
      code: { tr: `https://xxxx.mock.pstmn.io/api/users/2`, en: `https://xxxx.mock.pstmn.io/api/users/2` },
      positions: { collection: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, mockserver: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'collection', to: 'mockserver', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 3 — frontend geliştiricisi bu Mock URL\'i kendi uygulamasına baseUrl olarak verir — uygulama, gerçek backend VARMIŞ gibi geliştirilip test edilebilir.', en: 'Step 3 — the frontend developer points their app\'s baseUrl at this Mock URL — the app can be developed and tested as if the real backend EXISTED.' },
      positions: { mockserver: { x: 22, y: 40, scale: 0.95 }, frontend: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'mockserver', to: 'frontend', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 4 (kontrast) — gerçek backend hazır olduğunda, frontend sadece baseUrl\'i değiştirir — Mock Server\'a hiç bağımlı kalınmaz, o sadece bir GEÇİŞ aracıdır, kalıcı bir bağımlılık değil.', en: 'Step 4 (the contrast) — once the real backend is ready, the frontend just changes the baseUrl — there\'s no lingering dependency on the Mock Server, it was only a TRANSITIONAL tool, not a permanent dependency.' },
      positions: { frontend: { x: 22, y: 40, scale: 0.95 }, realapi: { x: 58, y: 55, scale: 1.2, opacity: 0.6 } },
      beams: [{ from: 'frontend', to: 'realapi', color: '#94a3b8' }],
    },
    {
      caption: { tr: 'Ders — Mock Server, ekipler arası PARALEL çalışmayı mümkün kılar: backend ve frontend birbirini beklemeden, ORTAK bir sözleşme (contract) üzerinden aynı anda ilerleyebilir.', en: 'The lesson — a Mock Server enables PARALLEL work across teams: backend and frontend can move forward at the same time on a SHARED contract, without waiting for each other.' },
      positions: { realapi: { x: 35, y: 50, scale: 1.0 }, collection: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const pmUnauthorizedDiagnosisFilm = {
  type: 'video-scene',
  id: 'pm-unauthorized-diagnosis-film',
  title: { tr: '🎬 401 Unauthorized: Token Eksik mi, Yanlış Environment mı?', en: '🎬 401 Unauthorized: Missing Token or Wrong Environment?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'request', emoji: '📤', label: { tr: 'İstek — 401 alıyor', en: 'Request — getting 401' }, color: '#8b5cf6' },
    { id: 'checkenv', emoji: '🔍', label: { tr: '1. Aktif Environment\'ı kontrol et', en: '1. Check active Environment' }, color: '#0ea5e9' },
    { id: 'checktoken', emoji: '🔑', label: { tr: '2. Token değerini kontrol et', en: '2. Check the token value' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Yanlış Environment seçili!', en: 'Wrong Environment selected!' }, color: '#ef4444' },
    { id: 'fixed', emoji: '✅', label: { tr: 'Doğru environment + geçerli token', en: 'Correct environment + valid token' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'Dün çalışan bir istek bugün 401 Unauthorized dönüyor — hiçbir kod değişmedi. Sistematik olarak nasıl teşhis edersin?', en: 'A request that worked yesterday returns 401 Unauthorized today — no code changed. How do you diagnose this systematically?' },
      positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — İLK kontrol: sağ üstteki Environment seçici gerçekten DOĞRU ortamı mı gösteriyor? Bir dropdown\'dan yanlışlıkla "Production" yerine "Staging (eski)" seçilmiş olabilir.', en: 'Step 1 — FIRST check: does the Environment selector in the top right actually show the CORRECT environment? A dropdown might have accidentally been left on "Staging (old)" instead of "Production".' },
      positions: { request: { x: 20, y: 40, scale: 1.0 }, checkenv: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'checkenv', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Adım 2 (tuzak bulundu) — evet, yanlış environment seçiliydi: "Staging (eski)"\'deki token SÜRESİ DOLMUŞ, ama "Production"\'daki token GEÇERLİ.', en: 'Step 2 (the trap found) — yes, the wrong environment was selected: the token in "Staging (old)" had EXPIRED, but the token in "Production" is VALID.' },
      positions: { checkenv: { x: 22, y: 40, scale: 0.95 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'checkenv', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 3 — İKİNCİ kontrol (environment doğruysa): token değerinin KENDİSİ süresi dolmuş (expired JWT) olabilir — `{{token}}` değişkeninin GERÇEK değerine (Environment paneli, göz ikonu) bakılır.', en: 'Step 3 — SECOND check (if the environment was correct): the token VALUE itself might have expired (an expired JWT) — the ACTUAL value of the `{{token}}` variable is checked (Environment panel, the eye icon).' },
      positions: { ghost: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, checktoken: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'ghost', to: 'checktoken', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 4 — doğru environment seçilir, gerekirse login isteği yeniden koşulup TAZE bir token alınır — istek artık 200 döner.', en: 'Step 4 — the correct environment is selected, and if needed the login request is re-run to get a FRESH token — the request now returns 200.' },
      positions: { checktoken: { x: 22, y: 40, scale: 0.95 }, fixed: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'checktoken', to: 'fixed', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — 401 hatalarının çoğu "yanlış kod" değil "yanlış bağlam" (context) sorunudur: hangi environment aktif, o environment\'taki değişken GÜNCEL mi? Sistematik teşhis, rastgele denemekten HER ZAMAN daha hızlıdır.', en: 'The lesson — most 401 errors aren\'t a "wrong code" problem, they\'re a "wrong context" problem: which environment is active, is the variable in that environment CURRENT? Systematic diagnosis is ALWAYS faster than random guessing.' },
      positions: { fixed: { x: 35, y: 50, scale: 1.1 }, request: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const pmInterviewApiVsUiFilm = {
  type: 'video-scene',
  id: 'pm-interview-api-vs-ui-film',
  title: { tr: '🎬 Mülakat Katmanları: "API Testi vs UI Testi" Sorusuna Derinlemesine Cevap', en: '🎬 Interview Layers: A Deep Answer to "API Testing vs UI Testing"' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'definition', emoji: '📖', label: { tr: 'Katman 1: Tanım', en: 'Layer 1: Definition' }, color: '#94a3b8' },
    { id: 'mechanism', emoji: '⚙️', label: { tr: 'Katman 2: Mekanizma', en: 'Layer 2: Mechanism' }, color: '#0ea5e9' },
    { id: 'tradeoff', emoji: '⚖️', label: { tr: 'Katman 3: Trade-off', en: 'Layer 3: Trade-off' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: '"Sadece piramidi ezberlemiş"', en: '"Just memorized the pyramid"' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Mülakatçı sorar: "API testleri neden UI testlerinden daha hızlı ve daha az flaky?" — bu soruyu tek cümlelik bir cevapla mı geçersin?', en: 'The interviewer asks: "Why are API tests faster and less flaky than UI tests?" — do you get through with a one-sentence answer?' },
      positions: { definition: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Katman 1 (TANIM) — "API testleri HTTP katmanında çalışır, UI testleri tarayıcı render\'ını bekler." Doğru ama yüzeysel.', en: 'Layer 1 (DEFINITION) — "API tests operate at the HTTP layer, UI tests wait for browser rendering." Correct but shallow.' },
      positions: { definition: { x: 22, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Katman 2 (MEKANİZMA) — "UI testi bir butona tıklamadan önce DOM\'un render olmasını, animasyonların bitmesini, JS\'in çalışmasını BEKLEMEK zorundadır — bu, saniyeler süren gizli bir gecikme zinciridir. API testi bu zinciri tamamen ATLAR."', en: 'Layer 2 (MECHANISM) — "a UI test has to WAIT for the DOM to render, animations to finish, JS to execute before clicking a button — this is a hidden chain of delays lasting seconds. An API test SKIPS this chain entirely."' },
      positions: { definition: { x: 20, y: 55, opacity: 0.5, scale: 0.85 }, mechanism: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'definition', to: 'mechanism', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Katman 3 (TRADE-OFF) — "ama bu hız bedelsiz değil: API testi, kullanıcının GERÇEKTEN gördüğü ekranı hiç doğrulamaz — bir buton CSS\'le gizlenmiş olsa bile API testi bunu FARK ETMEZ. Bu yüzden test piramidinde ikisi de gereklidir, biri diğerinin yerine geçmez."', en: 'Layer 3 (TRADE-OFF) — "but this speed isn\'t free: an API test never verifies what the user ACTUALLY sees on screen — even if a button is hidden by CSS, the API test won\'t NOTICE. That\'s why both are needed in the test pyramid, neither replaces the other."' },
      positions: { mechanism: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, tradeoff: { x: 55, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'mechanism', to: 'tradeoff', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Final (kontrast) — sadece "test piramidi" diyagramını ezbere çizen bir aday, mülakatçıya "bunu bir yerden okumuş ama neden öyle olduğunu düşünmemiş" izlenimi bırakır. Trade-off\'u da açıklayan bir cevap GERÇEK anlayışı kanıtlar.', en: 'The final contrast — a candidate who just draws the "test pyramid" diagram from memory leaves the interviewer with "they read this somewhere but never thought about why". An answer that also explains the trade-off PROVES real understanding.' },
      positions: { tradeoff: { x: 22, y: 40, scale: 0.9 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'tradeoff', to: 'ghost', color: '#ef4444' }],
    },
  ],
}

const pmInterviewStep = {
  type: 'step-animation',
  title: { tr: 'Postman Mülakat Cevabı — 3 Katman', en: 'Postman Interview Answer — 3 Layers' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Katman 1…', en: 'Layer 1…' }, detail: { tr: 'Katman 1: Kavramı tek cümlede tanımla.', en: 'Layer 1: Define the concept in one sentence.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Katman 2…', en: 'Layer 2…' }, detail: { tr: 'Katman 2: NASIL çalıştığını (mekanizmayı) göster.', en: 'Layer 2: Show HOW it works (the mechanism).' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Katman 3…', en: 'Layer 3…' }, detail: { tr: 'Katman 3: Bedelini/trade-off\'unu söyle — hiçbir araç bedelsiz değildir.', en: 'Layer 3: State the cost/trade-off — no tool is free.' } },
  ],
}

const pmInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-interview',
  title: { tr: 'Kendin Dene: Eksik Assertion\'ı Tamamla', en: 'Try It Yourself: Complete the Missing Assertion' },
  starterCode: `pm.test("Response has valid user email", function () {
    const json = pm.response.json();
    // TODO: json.data.email alaninin bos olmadigini dogrula
});`,
  solutionCode: `pm.test("Response has valid user email", function () {
    const json = pm.response.json();
    pm.expect(json.data.email).to.be.a("string").and.not.empty;
});`,
  hint: { tr: '`pm.expect(değer).to.be.a("string").and.not.empty` bir alanın hem string TİPİNDE hem BOŞ OLMADIĞINI aynı anda doğrular.', en: '`pm.expect(value).to.be.a("string").and.not.empty` verifies a field is BOTH the string type AND not empty, at the same time.' },
  successMessage: { tr: 'Doğru! Sadece "var mı" değil, "doğru TİPTE mi" kontrolü de flaky testleri önler.', en: 'Correct! Checking not just "does it exist" but "is it the right TYPE" also prevents flaky tests.' },
}

const pmMethodSemanticsStep = {
  type: 'step-animation',
  title: { tr: 'HTTP Metodları: Hangisi Veri Değiştirir, Hangisi Sadece Okur?', en: 'HTTP Methods: Which Ones Change Data, Which Just Read?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'GET — sadece OKUR, sunucuda hiçbir şeyi…', en: 'GET — only READS, changes nothing on…' }, detail: { tr: 'GET — sadece OKUR, sunucuda hiçbir şeyi değiştirmez. Aynı GET isteğini 100 kez atmak GÜVENLİDİR.', en: 'GET — only READS, changes nothing on the server. Firing the same GET 100 times is SAFE.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'POST — YENİ bir kayıt OLUŞTURUR. Aynı…', en: 'POST — CREATES a new record. Fire the…' }, detail: { tr: 'POST — YENİ bir kayıt OLUŞTURUR. Aynı POST\'u 2 kez atarsan, 2 AYRI kayıt oluşabilir — bu "idempotent" DEĞİLDİR.', en: 'POST — CREATES a new record. Fire the same POST twice and you may get 2 SEPARATE records — this is NOT idempotent.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'PUT/DELETE…', en: 'PUT/DELETE…' }, detail: { tr: 'PUT/DELETE — idempotent\'tir: aynı isteği 5 kez atmak, 1 kez atmakla AYNI son duruma götürür.', en: 'PUT/DELETE — idempotent: firing the same request 5 times leads to the SAME final state as firing it once.' } },
  ],
}

const pmMethodSemanticsPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-introduction',
  title: { tr: 'Kendin Dene: Doğru HTTP Metodunu Seç', en: 'Try It Yourself: Pick the Right HTTP Method' },
  starterCode: `// Gereksinim: mevcut bir kullanicinin SADECE email alanini guncelle
// TODO: Dogru metodu sec (GET/POST/PUT/DELETE)
fetch("/api/users/2", { method: "???", body: JSON.stringify({ email: "yeni@ornek.com" }) })`,
  solutionCode: `// PUT: mevcut kaynagi GUNCELLER, idempotent'tir
fetch("/api/users/2", { method: "PUT", body: JSON.stringify({ email: "yeni@ornek.com" }) })`,
  hint: { tr: 'Mevcut bir kaynağı güncellemek istiyorsun (yeni kayıt DEĞİL) — bu PUT\'un tam işidir. POST yeni kayıt oluşturur, GET sadece okur.', en: 'You want to update an existing resource (NOT create a new one) — that\'s exactly PUT\'s job. POST creates new records, GET only reads.' },
  successMessage: { tr: 'Doğru! PUT idempotenttir — bu isteği yanlışlıkla 2 kez gönderirsen bile sonuç değişmez.', en: 'Correct! PUT is idempotent — even if you accidentally send this request twice, the result stays the same.' },
}

const pmEnvSetupStep = {
  type: 'step-animation',
  title: { tr: 'İlk Ortam (Environment) Kurulumu — Adım Adım', en: 'Setting Up Your First Environment — Step by Step' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Sağ üstteki "Environments" sekmesine git…', en: 'Go to the "Environments" tab in the top right…' }, detail: { tr: 'Sağ üstteki "Environments" sekmesine git, "+" ile yeni bir environment oluştur (örn. "Staging").', en: 'Go to the "Environments" tab in the top right, create a new environment with "+" (e.g. "Staging").' } },
    { id: 2, icon: '2️⃣', label: { tr: 'baseUrl adında bir değişken ekle…', en: 'Add a variable named baseUrl…' }, detail: { tr: '`baseUrl` adında bir değişken ekle, Initial Value VE Current Value alanlarına staging URL\'ini yaz.', en: 'Add a variable named `baseUrl`, write the staging URL into BOTH the Initial Value and Current Value fields.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Sağ üstteki dropdown\'dan bu…', en: 'Select this environment as ACTIVE from…' }, detail: { tr: 'Sağ üstteki dropdown\'dan bu environment\'ı AKTİF olarak seç — seçilmezse istekler `{{baseUrl}}`\'i ÇÖZEMEZ.', en: 'Select this environment as ACTIVE from the top-right dropdown — if not selected, requests CANNOT resolve `{{baseUrl}}`.' } },
  ],
}

const pmEnvSetupPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-installation',
  title: { tr: 'Kendin Dene: URL\'i Değişkenle Değiştir', en: 'Try It Yourself: Replace the URL with a Variable' },
  starterCode: `// BUG: URL hardcoded, farkli ortamlarda calismiyor
GET https://staging.api.example.com/users/2`,
  solutionCode: `// FIX: {{baseUrl}} degiskeni her ortamda farkli deger cozer
GET {{baseUrl}}/users/2`,
  hint: { tr: 'Hardcoded bir URL, sadece TEK bir ortamda çalışır. `{{baseUrl}}` yazıp bu değeri Environment\'ta tanımlarsan, aynı istek staging/production arasında ortam değiştirerek çalışır.', en: 'A hardcoded URL only works in ONE environment. Write `{{baseUrl}}` and define its value in the Environment, and the same request works across staging/production by switching environments.' },
  successMessage: { tr: 'Doğru! Artık bu isteği hiç değiştirmeden farklı ortamlarda kullanabilirsin.', en: 'Correct! Now you can use this request across different environments without ever changing it.' },
}

const pmCollectionHierarchyStep = {
  type: 'step-animation',
  title: { tr: 'Collection İçinde Klasörleme ve Kalıtım', en: 'Folder Organization and Inheritance Inside a Collection' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Bir Collection\'a Authorization ayarı yaparsan…', en: 'If you set Authorization at the Collection…' }, detail: { tr: 'Bir Collection\'a Authorization ayarı yaparsan, İÇİNDEKİ TÜM klasör ve isteklerin varsayılan olarak bu ayarı MİRAS ALDIĞINI unutma.', en: 'If you set Authorization at the Collection level, remember that ALL folders and requests INSIDE it INHERIT this setting by default.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Bir alt klasörde farklı bir…', en: 'If you set a different Authorization at…' }, detail: { tr: 'Bir alt klasörde farklı bir Authorization ayarı yaparsan, bu SADECE o klasör ve altındakiler için üst ayarı EZER (override).', en: 'If you set a different Authorization at a sub-folder level, this OVERRIDES the parent setting ONLY for that folder and what\'s inside it.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bu miras zinciri…', en: 'This inheritance chain lets you manage…' }, detail: { tr: 'Bu miras zinciri, 50 isteğin HER birine ayrı ayrı auth yazmak yerine, TEK bir yerden yönetmeni sağlar.', en: 'This inheritance chain lets you manage auth from ONE place instead of writing it separately into all 50 requests.' } },
  ],
}

const pmCollectionHierarchyPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-core-concepts',
  title: { tr: 'Kendin Dene: Ortak Header\'ı Collection Seviyesine Taşı', en: 'Try It Yourself: Move a Shared Header to the Collection Level' },
  starterCode: `// BUG: Content-Type header'i HER istekte ayri ayri tekrar yaziliyor
Request 1: headers = { "Content-Type": "application/json" }
Request 2: headers = { "Content-Type": "application/json" }
Request 3: headers = { "Content-Type": "application/json" }`,
  solutionCode: `// FIX: Collection seviyesinde TEK yerde tanimla, tum istekler miras alir
Collection.headers = { "Content-Type": "application/json" }
Request 1, 2, 3: header'i TEKRAR yazmaya gerek yok`,
  hint: { tr: 'Her istekte tekrar eden bir header/auth ayarı görüyorsan, bu genelde Collection seviyesine taşınması gereken bir sinyaldir.', en: 'If you see a header/auth setting repeating in every request, that\'s usually a signal it should move to the Collection level.' },
  successMessage: { tr: 'Doğru! Artık header değişirse tek bir yerden güncellersin, 50 isteği tek tek düzenlemezsin.', en: 'Correct! Now if the header changes you update one place, not 50 requests one by one.' },
}

const pmAssertionOrderStep = {
  type: 'step-animation',
  title: { tr: 'Birden Fazla pm.test() Bloğu Nasıl Çalışır?', en: 'How Do Multiple pm.test() Blocks Run?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Bir response için 5 ayrı pm.test() bloğu…', en: 'You can write 5 separate pm.test()…' }, detail: { tr: 'Bir response için 5 ayrı `pm.test()` bloğu yazabilirsin — her biri BAĞIMSIZ çalışır, biri FAIL olsa bile DİĞERLERİ çalışmaya devam eder.', en: 'You can write 5 separate `pm.test()` blocks for one response — each runs INDEPENDENTLY; even if one FAILS, the OTHERS keep running.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Bu, tek bir assert satırında dursaydı…', en: 'This gives you information a single…' }, detail: { tr: 'Bu, tek bir `assert` satırında dursaydı alamayacağın bir bilgi verir: "hangi 3 test PASS, hangi 2 test FAIL oldu?" hepsi TEK koşumda görünür.', en: 'This gives you information a single `assert` line couldn\'t: "which 3 tests PASSed, which 2 FAILed?" all visible in ONE run.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Test Results panelinde her pm.test()…', en: 'In the Test Results panel…' }, detail: { tr: 'Test Results panelinde her `pm.test()` ayrı bir satır olarak ✅/❌ ile listelenir — hangi assertion\'ın kırıldığını ANINDA görürsün.', en: 'In the Test Results panel, every `pm.test()` is listed as its own row with ✅/❌ — you see INSTANTLY which assertion broke.' } },
  ],
}

const pmAssertionOrderPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-test-automation',
  title: { tr: 'Kendin Dene: İkinci Bir Assertion Ekle', en: 'Try It Yourself: Add a Second Assertion' },
  starterCode: `pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});
// TODO: response time'in 500ms'den az oldugunu dogrulayan ikinci bir test ekle`,
  solutionCode: `pm.test("Status is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,
  hint: { tr: 'Her `pm.test()` bağımsız bir bloktur — ikinci bir performans assertion\'ı eklemek için sadece yeni bir `pm.test(...)` çağrısı yeterlidir.', en: 'Every `pm.test()` is an independent block — adding a second performance assertion just needs another `pm.test(...)` call.' },
  successMessage: { tr: 'Doğru! Artık status kodu VE performans, ayrı ayrı raporlanan iki bağımsız test.', en: 'Correct! Now status code AND performance are two independent tests, reported separately.' },
}

const pmCiGateStep = {
  type: 'step-animation',
  title: { tr: 'Bir Newman Koşumunun CI\'da Kalite Kapısı Olması', en: 'A Newman Run Acting as a CI Quality Gate' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'PR açılır → CI pipeline tetiklenir →…', en: 'A PR is opened → the CI pipeline…' }, detail: { tr: 'PR açılır → CI pipeline tetiklenir → `newman run` collection\'ı çalıştırır.', en: 'A PR is opened → the CI pipeline triggers → `newman run` executes the collection.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'TÜM testler PASS olursa…', en: 'If ALL tests PASS…' }, detail: { tr: 'TÜM testler PASS olursa: exit code 0, pipeline YEŞİL, merge butonu AÇIK.', en: 'If ALL tests PASS: exit code 0, pipeline GREEN, merge button UNLOCKED.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'EN AZ 1 test FAIL olursa…', en: 'If EVEN 1 test FAILS…' }, detail: { tr: 'EN AZ 1 test FAIL olursa: exit code 1, pipeline KIRMIZI, merge butonu KİLİTLİ — geliştirici düzeltmeden birleştiremez.', en: 'If EVEN 1 test FAILS: exit code 1, pipeline RED, merge button LOCKED — the developer cannot merge without fixing it.' } },
  ],
}

const pmCiGatePractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-real-world',
  title: { tr: 'Kendin Dene: Newman Komutunu Düzelt', en: 'Try It Yourself: Fix the Newman Command' },
  starterCode: `# BUG: environment dosyasi belirtilmemis, degiskenler cozulemiyor
newman run collection.json`,
  solutionCode: `# FIX: -e ile hangi environment kullanilacagi belirtiliyor
newman run collection.json -e staging.postman_environment.json`,
  hint: { tr: '`newman run` sadece collection dosyasını alır ama `{{baseUrl}}` gibi değişkenleri çözmek için `-e` bayrağıyla bir environment dosyası GEREKİR.', en: '`newman run` only takes the collection file, but it NEEDS an environment file via the `-e` flag to resolve variables like `{{baseUrl}}`.' },
  successMessage: { tr: 'Doğru! Environment dosyası olmadan tüm `{{değişkenler}}` boş kalır ve testler 404/401 ile FAIL olur.', en: 'Correct! Without an environment file, all `{{variables}}` stay empty and tests FAIL with 404/401.' },
}

const pmToolLandscapeStep = {
  type: 'step-animation',
  title: { tr: 'Postman Ekosistemi: Hangi Araç Ne İşe Yarar?', en: 'The Postman Ecosystem: What Does Each Tool Do?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Postman App…', en: 'Postman App…' }, detail: { tr: 'Postman App — isteği GUI\'de manuel oluşturmak ve keşif (exploratory) testi için.', en: 'Postman App — for manually building requests in the GUI and exploratory testing.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Newman…', en: 'Newman…' }, detail: { tr: 'Newman — aynı collection\'ı GUI olmadan CI/CD\'de otomatik çalıştırmak için (komut satırı).', en: 'Newman — for running the same collection automatically in CI/CD without a GUI (command line).' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Mock Server…', en: 'Mock Server…' }, detail: { tr: 'Mock Server — backend hazır olmadan frontend\'in geliştirme yapabilmesi için sahte ama gerçek bir URL üretir.', en: 'Mock Server — generates a fake-but-real URL so the frontend can develop before the backend exists.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Monitor…', en: 'Monitor…' }, detail: { tr: 'Monitor — bir collection\'ı ZAMANLANMIŞ aralıklarla (örn. her 15 dakikada) otomatik çalıştırıp production\'ı sürekli izler.', en: 'Monitor — runs a collection on a SCHEDULED interval (e.g. every 15 minutes) to continuously watch production.' } },
  ],
}

const pmToolLandscapePractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-ecosystem',
  title: { tr: 'Kendin Dene: Doğru Postman Aracını Seç', en: 'Try It Yourself: Pick the Right Postman Tool' },
  starterCode: `// Senaryo: production API'sinin her 15 dakikada bir ayakta oldugunu
// dogrulamak istiyorsun, kimse tiklamadan
// TODO: Postman App mi, Newman mi, Monitor mi kullanmalisin?`,
  solutionCode: `// Monitor: zamanlanmis, otomatik, GUI acilmadan calisan
// tek arac budur — Newman CI'da tek seferlik calisir, Monitor SUREKLI izler`,
  hint: { tr: '"Kimse tıklamadan, ZAMANLANMIŞ aralıklarla, sürekli" anahtar kelimeleri Monitor\'ü işaret eder — Newman bir PR\'da BİR KEZ koşar, Monitor 7/24 zamanlanmış koşar.', en: 'The keywords "without anyone clicking, on a SCHEDULE, continuously" point to Monitor — Newman runs ONCE per PR, Monitor runs 24/7 on a schedule.' },
  successMessage: { tr: 'Doğru! Monitor, production\'ı proaktif olarak izlemek için tasarlanmış araçtır.', en: 'Correct! Monitor is the tool designed for proactively watching production.' },
}

const pmDiagnosisFlowStep = {
  type: 'step-animation',
  title: { tr: 'Bir API Hatasını Sistematik Teşhis Etme Sırası', en: 'The Order for Systematically Diagnosing an API Error' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '1. Status kodunu oku: 4xx istemci…', en: '1. Read the status code: 4xx is a…' }, detail: { tr: '1. Status kodunu oku: 4xx istemci hatası (senin isteğin), 5xx sunucu hatası (backend\'de sorun).', en: '1. Read the status code: 4xx is a client error (your request), 5xx is a server error (backend problem).' } },
    { id: 2, icon: '2️⃣', label: { tr: '2. Aktif Environment\'ı kontrol et:…', en: '2. Check the active Environment: is the…' }, detail: { tr: '2. Aktif Environment\'ı kontrol et: doğru ortam mı seçili?', en: '2. Check the active Environment: is the correct one selected?' } },
    { id: 3, icon: '3️⃣', label: { tr: '3. Değişken değerlerini (göz ikonuyla)…', en: '3. Check the variable values (via the…' }, detail: { tr: '3. Değişken değerlerini (göz ikonuyla) kontrol et: token/URL GERÇEKTEN beklediğin değer mi?', en: '3. Check the variable values (via the eye icon): is the token/URL REALLY the value you expect?' } },
    { id: 4, icon: '4️⃣', label: { tr: '4. Console\'u (View → Show Postman…', en: '4. Open the Console (View → Show…' }, detail: { tr: '4. Console\'u (View → Show Postman Console) aç: GERÇEKTEN giden isteğin tam header/body\'sini gör.', en: '4. Open the Console (View → Show Postman Console): see the ACTUAL full headers/body of the request that went out.' } },
  ],
}

const pmDiagnosisFlowPractice = {
  type: 'code-playground',
  relatedTopicId: 'postman-common-errors',
  title: { tr: 'Kendin Dene: Yanlış Değişken Adını Düzelt', en: 'Try It Yourself: Fix the Wrong Variable Name' },
  starterCode: `// BUG: environment'ta degisken "base_url" ama istekte "{{baseUrl}}" kullaniliyor
GET {{baseUrl}}/api/users/2
// Sonuc: {{baseUrl}} COZULEMEDI, istek literal string'e gitti`,
  solutionCode: `// FIX: degisken adi environment'takiyle BIREBIR ayni olmali (case-sensitive)
GET {{base_url}}/api/users/2`,
  hint: { tr: 'Postman değişken adlarında BÜYÜK/küçük harf duyarlıdır (`baseUrl` ≠ `base_url`) — Environment\'taki GERÇEK adı kontrol et.', en: 'Postman variable names are case-sensitive (`baseUrl` ≠ `base_url`) — check the ACTUAL name in the Environment.' },
  successMessage: { tr: 'Doğru! Değişken adı eşleşmezse Postman sessizce literal string\'i gönderir, hiçbir hata FIRLATMAZ — bu yüzden Console kontrolü kritiktir.', en: 'Correct! If the variable name doesn\'t match, Postman silently sends the literal string, throwing NO error — which is why checking the Console is critical.' },
}

const pmGetRequestStep = {
  type: 'step-animation',
  title: { tr: 'Send Tuşuna Bastığında Postman Perde Arkasında Ne Yapar?', en: 'What Does Postman Actually Do Behind the Scenes When You Click Send?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'URL çubuğundaki adres sadece bir metin…', en: 'The address in the URL bar is just…' }, detail: { tr: 'URL çubuğundaki adres sadece bir metin DEĞİLDİR — Send\'e basınca Postman gerçek bir TCP bağlantısı açar ve o sunucuya GERÇEK bir HTTP isteği gönderir.', en: 'The address in the URL bar is NOT just text — clicking Send makes Postman open a real TCP connection and send an ACTUAL HTTP request to that server.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Sunucu isteği ALIR, işler ve bir…', en: 'The server RECEIVES the request…' }, detail: { tr: 'Sunucu isteği ALIR, işler ve bir HTTP status kodu (200, 404, 500…) İLE birlikte bir yanıt gövdesi DÖNDÜRÜR.', en: 'The server RECEIVES the request, processes it, and RETURNS a response body TOGETHER WITH an HTTP status code (200, 404, 500…).' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Status kodu 200 OK ise…', en: 'A status code of 200 OK means…' }, detail: { tr: 'Status kodu 200 OK ise, sunucunun isteği ANLADIĞINI ve BAŞARIYLA işlediğini gösterir — ama body\'nin İÇERİĞİNİN doğru olduğunu KANITLAMAZ, onu SEN kontrol etmelisin.', en: 'A status code of 200 OK shows the server UNDERSTOOD and SUCCESSFULLY processed the request — but it does NOT PROVE the body CONTENT is correct, YOU still have to verify that.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Response paneli JSON\'ı otomatik…', en: 'The Response panel automatically…' }, detail: { tr: 'Response paneli JSON\'ı otomatik olarak biçimlendirir — burada `id`, `name`, `email` gibi alanların BEKLEDİĞİN değerlerle eşleştiğini gözle KONTROL edersin.', en: 'The Response panel automatically formats the JSON — here you VISUALLY CHECK that fields like `id`, `name`, `email` match the values you EXPECTED.' } },
  ],
}

const pmPostRequestStep = {
  type: 'step-animation',
  title: { tr: 'POST İsteği ile Kaynak Oluşturma: Body\'den 201\'e Giden Yol', en: 'Creating a Resource with POST: The Path from Body to 201' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Body → raw → JSON sekmesine yazdığın…', en: 'What you write in the Body → raw…' }, detail: { tr: 'Body → raw → JSON sekmesine yazdığın veri, isteğin GÖVDESİ olarak sunucuya GÖNDERİLİR — GET\'ten farklı olarak POST\'ta bu alan BOŞ olamaz.', en: 'What you write in the Body → raw → JSON tab is SENT to the server as the request BODY — unlike GET, this field CANNOT be empty for POST.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Sunucu bu JSON\'ı PARSE eder, doğrular…', en: 'The server PARSES this JSON, validates…' }, detail: { tr: 'Sunucu bu JSON\'ı PARSE eder, doğrular (örn. email zorunlu mu?) ve veritabanında YENİ bir kayıt OLUŞTURUR.', en: 'The server PARSES this JSON, validates it (e.g. is email required?), and CREATES a NEW record in the database.' } },
    { id: 3, icon: '3️⃣', label: { tr: '201 Created, 200 OK\'den FARKLI bir…', en: '201 Created carries a DIFFERENT meaning…' }, detail: { tr: '201 Created, 200 OK\'den FARKLI bir anlam taşır: "yeni bir KAYNAK oluşturuldu" — sunucu genelde bu yeni kaydın `id`\'sini de yanıt gövdesinde GERİ döndürür.', en: '201 Created carries a DIFFERENT meaning than 200 OK: "a new RESOURCE was created" — the server typically returns that new record\'s `id` BACK in the response body too.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Gerçek doğrulama burada bitmez…', en: 'Real verification doesn\'t stop here…' }, detail: { tr: 'Gerçek doğrulama burada bitmez: 201 aldıktan sonra dönen `id` ile bir GET isteği atıp kaydın GERÇEKTEN veritabanına YAZILDIĞINI teyit etmek QA\'nın işidir.', en: 'Real verification doesn\'t stop here: after getting 201, sending a GET request with the returned `id` to confirm the record was ACTUALLY WRITTEN to the database is the QA\'s job.' } },
  ],
}

const pmEnvVarChainStep = {
  type: 'step-animation',
  title: { tr: '5 İsteklik Bir Zincirde Değişken Nasıl Bir İstekten Diğerine Akar?', en: 'How Does a Variable Flow from One Request to the Next in a 5-Request Chain?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'İstek 1 (login) yanıt döndüğünde…', en: 'When Request 1 (login) returns…' }, detail: { tr: 'İstek 1 (login) yanıt döndüğünde, Tests sekmesindeki `pm.environment.set("authToken", ...)` satırı bu token\'ı ORTAM DEĞİŞKENİ olarak KAYDEDER — sadece o AN için değil, environment değişene kadar KALICI olarak.', en: 'When Request 1 (login) returns, the `pm.environment.set("authToken", ...)` line in the Tests tab SAVES this token as an ENVIRONMENT VARIABLE — PERSISTENTLY, not just for that moment, until the environment changes.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'İstek 2\'nin URL veya Header alanına…', en: 'When you type {{userId}} into Request…' }, detail: { tr: 'İstek 2\'nin URL veya Header alanına `{{userId}}` yazdığında, Postman bunu göndermeden HEMEN ÖNCE o an environment\'ta kayıtlı GERÇEK değerle DEĞİŞTİRİR.', en: 'When you type `{{userId}}` into Request 2\'s URL or Header field, Postman REPLACES it with the ACTUAL value currently stored in the environment RIGHT BEFORE sending.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bu zincir 5 isteğe kadar UZAYABİLİR…', en: 'This chain can EXTEND across 5 requests…' }, detail: { tr: 'Bu zincir 5 isteğe kadar UZAYABİLİR: login → user → order → payment — her istek BİR ÖNCEKİNİN ürettiği veriyi OKUR, Java\'da bir metottan diğerine paylaşılan bir Properties nesnesi geçirmek gibi.', en: 'This chain can EXTEND across 5 requests: login → user → order → payment — each request READS the data PRODUCED by the previous one, like passing a shared Properties object from one Java method to another.' } },
  ],
}

const pmCollectionVarsStep = {
  type: 'step-animation',
  title: { tr: 'pm.globals, pm.environment, pm.collectionVariables — Hangisi Ne Zaman Kazanır?', en: 'pm.globals, pm.environment, pm.collectionVariables — Which One Wins When?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'pm.collectionVariables.set() ile kaydedilen…', en: 'A value saved with pm.collectionVariables…' }, detail: { tr: '`pm.collectionVariables.set()` ile kaydedilen bir değer, o Collection\'daki HANGİ environment aktif olursa olsun AYNI kalır — `apiVersion` gibi sabitler için idealdir.', en: 'A value saved with `pm.collectionVariables.set()` stays the SAME regardless of which environment is active on that Collection — ideal for constants like `apiVersion`.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Aynı isimde bir değişken hem…', en: 'If a variable with the same name…' }, detail: { tr: 'Aynı isimde bir değişken hem environment\'ta hem collection\'da tanımlıysa, Postman ÖNCELİK sırasına göre `pm.environment` değerini KAZANDIRIR — Java\'daki local/instance/static alan gölgeleme (shadowing) kuralına BENZER.', en: 'If a variable with the same name exists in both the environment and the collection, Postman makes `pm.environment` WIN by priority order — SIMILAR to Java\'s local/instance/static field shadowing rule.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'URL çubuğundaki {{apiVersion}} çözülürken…', en: 'When {{apiVersion}} resolves in the URL…' }, detail: { tr: 'URL çubuğundaki `{{apiVersion}}` çözülürken bu öncelik sırası SESSİZCE uygulanır — bu yüzden beklenmedik bir değer görürsen önce HANGİ scope\'un kazandığını KONTROL et.', en: 'When `{{apiVersion}}` resolves in the URL bar, this priority order is applied SILENTLY — so if you see an unexpected value, first CHECK which scope WON.' } },
  ],
}

const pmFolderStructureStep = {
  type: 'step-animation',
  title: { tr: 'Bir Klasör Hiyerarşisi Bağımsız Mikroservisleri Nasıl Yansıtır?', en: 'How Does a Folder Hierarchy Mirror Independent Microservices?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Her mikroservis KENDİ üst-seviye…', en: 'Each microservice gets its OWN top-level…' }, detail: { tr: 'Her mikroservis KENDİ üst-seviye klasörünü alır (Auth Service, User Service, Order Service…) — Java\'da her mikroservisin kendi Maven modülüne sahip olması gibi, kod birbirine KARIŞMAZ.', en: 'Each microservice gets its OWN top-level folder (Auth Service, User Service, Order Service…) — like each microservice having its own Maven module in Java, the code doesn\'t GET TANGLED together.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Klasör içindeki alt-klasörler (CRUD,…', en: 'Sub-folders inside (CRUD, Negative Tests…' }, detail: { tr: 'Klasör içindeki alt-klasörler (CRUD, Negative Tests) SENARYO tipine göre gruplar — bir geliştirici sadece "duplicate email" testini ARIYORSA, tüm collection\'ı taramadan doğru yeri BULUR.', en: 'Sub-folders inside (CRUD, Negative Tests) group by SCENARIO type — if a developer is only LOOKING for the "duplicate email" test, they FIND the right place without scanning the whole collection.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bu yapı Collection Runner\'da SIRALI…', en: 'This structure runs in SEQUENTIAL order…' }, detail: { tr: 'Bu yapı Collection Runner\'da SIRALI olarak çalışır: önce Auth (token üretir), sonra User (o token\'ı KULLANIR) — klasör sırası, bağımlılık SIRASINI da temsil eder.', en: 'This structure runs in SEQUENTIAL order in the Collection Runner: Auth first (produces the token), then User (USES that token) — folder order also represents the dependency ORDER.' } },
  ],
}

const pmNewmanCliStep = {
  type: 'step-animation',
  title: { tr: 'Newman Komutundaki Her Bayrak Hangi Kararı Temsil Eder?', en: 'What Decision Does Each Flag in a Newman Command Represent?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'newman run collection.json, Postman GUI\'sini…', en: 'newman run collection.json runs the exact…' }, detail: { tr: '`newman run collection.json`, Postman GUI\'sini HİÇ açmadan collection\'daki AYNI istekleri, AYNI Tests scriptleriyle terminalden çalıştırır.', en: '`newman run collection.json` runs the EXACT SAME requests with the EXACT SAME Tests scripts from the terminal, WITHOUT ever opening the Postman GUI.' } },
    { id: 2, icon: '2️⃣', label: { tr: '-e env.json bayrağı olmadan, isteklerdeki…', en: 'Without the -e env.json flag, {{variables}}…' }, detail: { tr: '`-e env.json` bayrağı olmadan, isteklerdeki `{{baseUrl}}` gibi değişkenler ÇÖZÜLEMEZ ve testler 404/401 ile SESSİZCE başarısız olur.', en: 'Without the `-e env.json` flag, variables like `{{baseUrl}}` in requests CANNOT resolve and tests SILENTLY fail with 404/401.' } },
    { id: 3, icon: '3️⃣', label: { tr: '--iteration-data test-users.csv, aynı…', en: '--iteration-data test-users.csv runs the same…' }, detail: { tr: '`--iteration-data test-users.csv`, AYNI collection\'ı CSV\'deki HER satır için bir kez daha çalıştırır — 10 satır = veri odaklı 10 test koşumu.', en: '`--iteration-data test-users.csv` runs the SAME collection once more for EVERY row in the CSV — 10 rows = 10 data-driven test runs.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Newman testlerin TAMAMI PASS olursa exit…', en: 'Newman exits with code 0 if ALL tests…' }, detail: { tr: 'Newman testlerin TAMAMI PASS olursa exit code 0, EN AZ biri FAIL olursa exit code 1 döndürür — CI pipeline\'ının build\'i KIRMASI ya da GEÇİRMESİ bu tek sayıya bağlıdır.', en: 'Newman exits with code 0 if ALL tests PASS, code 1 if EVEN ONE FAILS — whether the CI pipeline BREAKS the build or LETS it PASS depends on this single number.' } },
  ],
}

const pmCoreAssertionsStep = {
  type: 'step-animation',
  title: { tr: 'pm.test() ile pm.expect() Arasındaki Fark Neden Önemli?', en: 'Why Does the Difference Between pm.test() and pm.expect() Matter?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'pm.test("isim", fn) bir test BLOĞU…', en: 'pm.test("name", fn) DEFINES a test BLOCK…' }, detail: { tr: '`pm.test("isim", fn)` bir test BLOĞU tanımlar ve Test Results panelinde GÖRÜNECEK ismi verir — Java\'da `@Test public void testX()` yazmaya benzer.', en: '`pm.test("name", fn)` DEFINES a test BLOCK and gives it the name that will APPEAR in the Test Results panel — similar to writing `@Test public void testX()` in Java.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'pm.expect(...) o blok İÇİNDE gerçek…', en: 'pm.expect(...) is the actual assertion…' }, detail: { tr: '`pm.expect(...)` o blok İÇİNDE gerçek doğrulamayı yapan Chai assertion\'ıdır — `pm.test`\'siz bir `pm.expect` de çalışır ama Test Results\'ta AYRI bir satır olarak GÖRÜNMEZ.', en: '`pm.expect(...)` is the Chai assertion that does the actual checking INSIDE that block — a `pm.expect` without `pm.test` still runs but WON\'T appear as a SEPARATE row in Test Results.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bir response için 5 ayrı pm.test()…', en: 'Five separate pm.test() blocks for one…' }, detail: { tr: 'Bir response için 5 ayrı `pm.test()` yazmak, birini FAIL etse bile diğer 4\'ünün ÇALIŞMAYA devam etmesini sağlar — bir kod bloğu bir yerde patlarsa TÜMÜNÜN durduğu klasik try/catch\'ten FARKLI bir davranış.', en: 'Writing 5 separate `pm.test()` blocks for one response means even if one FAILS, the other 4 keep RUNNING — a DIFFERENT behavior from a classic try/catch where one break STOPS everything.' } },
  ],
}

const pmRequestChainStep = {
  type: 'step-animation',
  title: { tr: 'Bir Token Bir İstekten Diğerine Nasıl Taşınır?', en: 'How Does a Token Travel from One Request to the Next?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'İstek 1\'in (login) Tests sekmesi…', en: 'Request 1\'s (login) Tests tab runs…' }, detail: { tr: 'İstek 1\'in (login) Tests sekmesi, yanıt geldikten SONRA çalışır ve `pm.environment.set("authToken", ...)` ile token\'ı ortam değişkenine YAZAR.', en: 'Request 1\'s (login) Tests tab runs AFTER the response arrives and WRITES the token to the environment variable via `pm.environment.set("authToken", ...)`.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'İstek 2\'nin (profile) Headers sekmesi…', en: 'Request 2\'s (profile) Headers tab reads…' }, detail: { tr: 'İstek 2\'nin (profile) Headers sekmesindeki `Authorization: Bearer {{authToken}}` satırı, Postman isteği GÖNDERMEDEN hemen önce bu değeri OKUR.', en: 'Request 2\'s (profile) `Authorization: Bearer {{authToken}}` line in Headers is READ by Postman right before it SENDS the request.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Eğer İstek 1 ÇALIŞMADAN İstek 2 tek…', en: 'If Request 2 runs ALONE without Request 1…' }, detail: { tr: 'Eğer İstek 1 ÇALIŞMADAN İstek 2 tek başına çalıştırılırsa, `{{authToken}}` BOŞ kalır ve sunucu 401 Unauthorized döner — bu yüzden Collection Runner\'da istekler DOĞRU SIRADA olmalıdır.', en: 'If Request 2 runs ALONE without Request 1 having run first, `{{authToken}}` stays EMPTY and the server returns 401 Unauthorized — which is why requests must be in the CORRECT ORDER in the Collection Runner.' } },
  ],
}

const pmPreRequestScriptStep = {
  type: 'step-animation',
  title: { tr: 'Pre-request Script, Tests Sekmesinden Zamanlama Olarak Nasıl Farklıdır?', en: 'How Does a Pre-request Script Differ from the Tests Tab in Timing?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Pre-request Script, istek DAHA…', en: 'The Pre-request Script runs BEFORE the…' }, detail: { tr: 'Pre-request Script, istek DAHA sunucuya GİTMEDEN ÖNCE çalışır — Tests sekmesi ise yanıt GERİ geldikten SONRA çalışır. Bu ikisi zaman ekseninde tam TERS uçlardadır.', en: 'The Pre-request Script runs BEFORE the request even GOES to the server — the Tests tab runs AFTER the response comes BACK. These two sit at OPPOSITE ends of the timeline.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Bu bloktaki pm.environment.set("testEmail",…', en: 'The pm.environment.set("testEmail", ...) line…' }, detail: { tr: 'Bu bloktaki `pm.environment.set("testEmail", ...)`, her koşumda BENZERSİZ bir email üretir — aynı email\'i tekrar tekrar POST etmek "duplicate email" hatasına YOL AÇARDI.', en: 'The `pm.environment.set("testEmail", ...)` line in this block generates a UNIQUE email on every run — POSTing the same email repeatedly would CAUSE a "duplicate email" error.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Bu değişken, aynı isteğin Body sekmesinde…', en: 'This variable is then read as {{testEmail}}…' }, detail: { tr: 'Bu değişken, aynı isteğin Body sekmesinde `{{testEmail}}` olarak OKUNUR — Pre-request Script\'in ÜRETTİĞİ değer, o isteğin GÖVDESİNE anında akar.', en: 'This variable is then READ as `{{testEmail}}` in that same request\'s Body tab — the value PRODUCED by the Pre-request Script flows instantly into that request\'s BODY.' } },
  ],
}

const pmNewmanCiCdStep = {
  type: 'step-animation',
  title: { tr: 'Bir GitHub Actions Workflow\'u Postman Testlerini Nasıl Otomatik Kalite Kapısına Çevirir?', en: 'How Does a GitHub Actions Workflow Turn Postman Tests into an Automatic Quality Gate?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'push/pull_request tetikleyicisi, main\'e…', en: 'The push/pull_request trigger fires this…' }, detail: { tr: '`push`/`pull_request` tetikleyicisi, main\'e her push veya PR açıldığında bu workflow\'u OTOMATİK çalıştırır — kimse elle bir düğmeye BASMAZ.', en: 'The `push`/`pull_request` trigger fires this workflow AUTOMATICALLY on every push or PR to main — nobody manually PRESSES a button.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Runner önce Node.js kurar, sonra…', en: 'The runner first installs Node.js, then…' }, detail: { tr: 'Runner önce Node.js kurar, sonra `npm install -g newman` ile Newman\'ı GLOBAL olarak yükler — her CI koşumu SIFIRDAN, temiz bir ortamda başlar.', en: 'The runner first installs Node.js, then installs Newman GLOBALLY via `npm install -g newman` — every CI run starts FROM SCRATCH in a clean environment.' } },
    { id: 3, icon: '3️⃣', label: { tr: '"Run API Tests" adımı newman run\'ı…', en: 'The "Run API Tests" step runs newman…' }, detail: { tr: '"Run API Tests" adımı `newman run`\'ı çalıştırır — bu adım FAIL olursa (exit code 1), workflow\'un GERİ KALANI durur ve PR "checks failed" olarak İŞARETLENİR.', en: 'The "Run API Tests" step runs `newman run` — if this step FAILS (exit code 1), the REST of the workflow stops and the PR gets MARKED "checks failed".' } },
    { id: 4, icon: '4️⃣', label: { tr: 'if: always() sayesinde rapor, testler…', en: 'Thanks to if: always(), the report…' }, detail: { tr: '`if: always()` sayesinde rapor, testler PASS olsa da FAIL olsa da HER ZAMAN yüklenir — böylece bir hata durumunda TAM olarak neyin kırıldığını görebilirsin.', en: 'Thanks to `if: always()`, the report is uploaded ALWAYS, whether tests PASS or FAIL — so on a failure you can see EXACTLY what broke.' } },
  ],
}

export const postmanData = {
  en: {
    hero: {
      title: '📮 Postman',
      subtitle: 'API Testing & Collaboration Platform',
      intro: 'From zero to interview-level Postman mastery. Learn to send requests, write automated test scripts, manage environments, chain requests, run collections with Newman, and integrate into CI/CD pipelines — with real QA scenarios throughout.',
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Core Concepts', '🔥 Test Automation', '🛠️ Real World', '🔗 Ecosystem', '🚨 Common Errors', '💼 Interview Q&A'],
    sections: [
      // ── 0. INTRODUCTION ──────────────────────────────────────────────────
      {
        title: '🎯 What is Postman & API Testing?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📱',
            content: 'Postman is like a universal telephone exchange for APIs — instead of walking into every office (opening a browser, clicking through a UI) to place an order, you pick up one handset and dial any department directly: "GET me the product list", "POST this order", "DELETE that user." The handset remembers your PIN (auth token), your speed-dials (collections), and even runs a callback check after every call (test scripts). But here is the real question: if a developer already has curl and Java HttpClient, why does a QA engineer need yet another tool? Because curl is write-only — it fires a request but gives you no assertion layer, no environment switching, and no CI export. In Java terms Postman is not just an HttpClient; it is HttpClient + JUnit assertions + TestNG suite runner + Maven build report, all wired together without a single line of code. In QA practice this matters enormously: when a backend endpoint silently changes its response shape between sprints, a Postman collection wired into CI via Newman catches the regression in the pipeline — before the frontend team even notices that their app is broken.',
          },
          { type: 'heading', text: 'What is an API?' },
          { type: 'text', content: 'An API (Application Programming Interface) is a contract between a client (your app, browser, or test tool) and a server. It defines what requests the server accepts, what data it expects, and what it returns. Every modern application — weather apps, payment systems, social media — runs on APIs behind the scenes.' },
          {
            type: 'diagram-svg',
            title: 'HTTP Request-Response Cycle',
            svg: httpFlowSvg,
          },
          { type: 'heading', text: 'What is Postman?' },
          { type: 'text', content: 'Postman is a free GUI platform for building, sending, and verifying HTTP requests. QA engineers use it for manual API testing, automated regression suites, environment management, and sharing test collections with the team.' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '🖱️', label: 'No Code Required', desc: 'Build and send requests with clicks — perfect for exploratory API testing.' },
              { icon: '📁', label: 'Collections', desc: 'Group related requests, export as JSON, version-control in Git.' },
              { icon: '🌍', label: 'Environments', desc: 'Switch dev/staging/prod with one click using variables.' },
              { icon: '🤖', label: 'Test Scripts', desc: 'Write JavaScript assertions that run automatically after every request.' },
              { icon: '⚡', label: 'Newman CLI', desc: 'Run entire collections from the command line — perfect for CI/CD.' },
              { icon: '🔗', label: 'Mock Servers', desc: 'Create fake API endpoints to unblock frontend before backend is ready.' },
            ],
          },
          { type: 'heading', text: 'HTTP Methods — The Core Vocabulary' },
          {
            type: 'table',
            headers: ['Method', 'Action', 'Body?', 'Example', 'SQL Analogy'],
            rows: [
              ['GET', 'Read data', '❌', 'GET /users/42', 'SELECT * WHERE id=42'],
              ['POST', 'Create new resource', '✅', 'POST /users', 'INSERT INTO users'],
              ['PUT', 'Replace entire resource', '✅', 'PUT /users/42', 'UPDATE (full replace)'],
              ['PATCH', 'Update partial fields', '✅', 'PATCH /users/42', 'UPDATE SET name=...'],
              ['DELETE', 'Remove resource', '❌', 'DELETE /users/42', 'DELETE WHERE id=42'],
            ],
          },
          { type: 'heading', text: 'HTTP Status Codes' },
          {
            type: 'visual', variant: 'pyramid',
            title: 'HTTP Status Code Groups',
            levels: [
              { label: '5xx — Server Error', color: 'red', desc: '500 Internal Server Error · 503 Service Unavailable' },
              { label: '4xx — Client Error', color: 'orange', desc: '400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found' },
              { label: '3xx — Redirection', color: 'yellow', desc: '301 Moved Permanently · 302 Found' },
              { label: '2xx — Success', color: 'green', desc: '200 OK · 201 Created · 204 No Content' },
              { label: '1xx — Informational', color: 'blue', desc: '100 Continue · 101 Switching Protocols' },
            ],
            note: '2xx = pass. 4xx = your test data/auth is wrong. 5xx = server-side bug (escalate to dev).',
          },
          pmRequestCycleFilm,
          pmMethodSemanticsStep,
          pmMethodSemanticsPractice,
          {
            type: 'quiz',
            question: 'A POST /api/login request returns status 401. What does this mean?',
            options: [
              { id: 'a', text: 'The server crashed — escalate immediately' },
              { id: 'b', text: 'Unauthorized — wrong credentials or missing token' },
              { id: 'c', text: 'Success — the user is logged in' },
              { id: 'd', text: 'The endpoint does not exist — fix the URL' },
            ],
            correct: 'b',
            explanation: '401 Unauthorized means the request reached the server but authentication failed. 4xx = client-side issue. 500 = server error. 404 = not found. 200/201 = success.',
          
        retryQuestion: {
      "question": "A DELETE /api/products/101 request returns status 403. What does this mean?",
      "options": [
            {
                  "id": "a",
                  "text": "The resource was successfully deleted"
            },
            {
                  "id": "b",
                  "text": "The product ID 101 does not exist"
            },
            {
                  "id": "c",
                  "text": "Forbidden — the user is authenticated but lacks permission to delete this product"
            },
            {
                  "id": "d",
                  "text": "The server is overloaded and cannot process the request"
            }
      ],
      "correct": "c",
      "explanation": "403 Forbidden indicates that the server understood the request but refuses to authorize it. Unlike 401 (Authentication), 403 is about Authorization (having the right permissions/roles). 204/200 = success for delete, 404 = resource not found, 503 = service unavailable."
}
},
          {
            type: 'api-traffic-chain',
            endpoint: 'GET /api/users/1',
            method: 'GET',
            statusCode: 200,
            requestHeaders: { 'Authorization': 'Bearer {{token}}', 'Accept': 'application/json' },
            responseBody: '{\n  "data": {\n    "id": 1,\n    "email": "george@reqres.in",\n    "first_name": "George"\n  }\n}',
            raCode: 'given()\n  .header("Authorization", "Bearer " + token)\n  .header("Accept", "application/json")\n.when()\n  .get("/api/users/1")\n.then()\n  .statusCode(200)\n  .body("data.id", equalTo(1))\n  .body("data.email", notNullValue());',
          },
        ],
      },

      // ── 1. INSTALLATION ──────────────────────────────────────────────────
      {
        title: '📦 Installation & First Request',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'Installing Postman is like setting up a fully equipped QA workbench on day one: every drawer is already labeled (GET, POST, PUT, DELETE), every clamp pre-fitted (auth headers, environment variables), and every measuring gauge ready (test assertions). Contrast that with setting up a Java REST test framework — you would spend the first day wrestling with pom.xml dependencies, BaseTest classes, and Jackson configuration before sending a single request. But here is the deeper question: if the team already has curl scripts and a Java HttpClient wrapper, why invest time in Postman at all? Because neither curl scripts nor raw HttpClient give you a GUI for collaborative authoring, one-click environment switching between dev/staging/prod, or a format that Newman can execute headlessly in a CI pipeline. In QA terms, a Postman collection committed to Git is a living regression suite that every engineer — regardless of Java knowledge — can run, modify, and review. The installation cost is under 2 minutes; the return is a shared, executable API specification that catches broken contracts before they reach production.',
          },
          { type: 'heading', text: 'Downloading Postman' },
          {
            type: 'installation',
            title: 'Postman Setup',
            steps: [
              { cmd: '1. Go to postman.com/downloads', explanation: 'Postman is free for individual use. Download the desktop app for Windows, macOS, or Linux. A web version also exists at app.getpostman.com.' },
              { cmd: '2. Run the installer', explanation: 'Windows: PostmanSetup.exe. macOS: drag to Applications. Linux: use the .tar.gz or AppImage. Under 2 minutes.' },
              { cmd: '3. Sign in or skip', explanation: 'A free account syncs collections across devices and enables team sharing. You can skip login (just close the dialog).' },
              { cmd: '4. Done!', explanation: 'Click the + tab to create your first request. No config files, no CLI setup needed.' },
            ],
          },
          { type: 'heading', text: 'Postman Interface Overview' },
          {
            type: 'diagram-svg',
            title: 'Postman UI — Key Areas (labeled)',
            svg: uiMockupSvg,
          },
          { type: 'heading', text: 'Your First GET Request — Step by Step' },
          {
            type: 'steps',
            items: [
              { label: 'Click the "+" tab', desc: 'Opens a new request tab.' },
              { label: 'Select method: GET', desc: 'Click the dropdown on the left (default is already GET).' },
              { label: 'Enter URL', desc: 'Type: https://jsonplaceholder.typicode.com/users — a free test API.' },
              { label: 'Click Send', desc: 'Postman sends the request and shows the response below.' },
              { label: 'Read the response', desc: 'You should see 10 users in JSON. Status: "200 OK".' },
            ],
          },
          {
            type: 'code',
            language: 'json',
            label: 'Expected Response (first user):',
            code: `{
  "id": 1,                            // Unique user ID
  "name": "Leanne Graham",            // Full name
  "username": "Bret",                 // Login username
  "email": "Sincere@april.biz",       // Email address
  "phone": "1-770-736-0988",          // Phone
  "website": "hildegard.org",         // Website
  "address": {                        // Nested object
    "street": "Kulas Light",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  }
}`,
            expected: 'Status: 200 OK | 10 users returned as a JSON array',
          },
          pmGetRequestStep,
          { type: 'heading', text: 'Making a POST Request' },
          {
            type: 'code',
            language: 'json',
            label: 'POST /api/users — Body → raw → JSON:',
            code: `{
  "name": "Alice Johnson",      // Required: full name
  "email": "alice@test.com",    // Required: must be unique
  "role": "tester",             // Optional
  "active": true                // Boolean
}`,
          },
          {
            type: 'code',
            language: 'json',
            label: 'Expected Response — 201 Created:',
            code: `{
  "id": 99,                          // Server-generated ID
  "name": "Alice Johnson",           // Echoed back
  "email": "alice@test.com",         // Echoed back
  "createdAt": "2024-01-15T10:30:00Z" // Server timestamp
}`,
          },
          pmPostRequestStep,
          pmFirstRequestFilm,
          pmEnvSetupStep,
          pmEnvSetupPractice,
          {
            type: 'quiz',
            question: 'You send POST /api/users and the server responds 201. What should you verify next as a QA tester?',
            options: [
              { id: 'a', text: 'Nothing — 201 means success, you\'re done' },
              { id: 'b', text: 'Verify the response body contains the created user data, then send GET to confirm persistence' },
              { id: 'c', text: 'The test failed — POST should return 200, not 201' },
              { id: 'd', text: 'Report a bug — 201 is not a valid status code' },
            ],
            correct: 'b',
            explanation: '201 Created is the correct status for a successful POST. Good QA: 1) Verify the response body, 2) Confirm the resource was persisted by fetching it with GET. 200 is for updates, 201 is specifically for resource creation.',
          
        retryQuestion: {
      "question": "You send a PUT /api/settings/profile request and the server responds 200. What is the most appropriate QA verification step?",
      "options": [
            {
                  "id": "a",
                  "text": "Check if the server returns 201 instead, as 200 is invalid for PUT"
            },
            {
                  "id": "b",
                  "text": "Assume the database was updated correctly because 200 means success"
            },
            {
                  "id": "c",
                  "text": "Verify the status code, then perform a GET request to confirm the updated profile fields are stored correctly"
            },
            {
                  "id": "d",
                  "text": "Check the server logs to ensure no 500 error occurred during the update"
            }
      ],
      "correct": "c",
      "explanation": "While 200 OK confirms the request was processed, a thorough QA test validates that the state change persisted in the system. A subsequent GET request ensures the update was actually applied to the database, rather than just returning a 'success' response without saving data."
}
},
          {
            type: 'http-flow-animation',
            method: 'POST',
            endpoint: '/api/users',
            dbQuery: 'INSERT INTO users (name, email) VALUES (?, ?)',
            statusCode: 201,
            expectedValue: '201',
            actualValue: '201',
          },
        ],
      },

      // ── 2. CORE CONCEPTS ────────────────────────────────────────────────
      {
        title: '📚 Collections, Variables & Microservices',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏙️',
            content: 'Imagine a large logistics hub with four independent warehouses: Security (Auth), HR (Users), Logistics (Orders), Finance (Payments). Each warehouse speaks a slightly different dialect, has its own keycard (auth token), and its own loading dock URL. Without a coordination layer, a QA engineer has to physically run between buildings, re-key codes at every door, and scribble addresses on paper — that is manual API testing across microservices. Postman Collections are the hub\'s master dispatch system: one control panel, one environment file per deployment (dev/staging/prod), and every token and base URL injected automatically via {{variables}}. But here is the question every Java developer asks: "I already have TestNG test classes and a shared BaseTest — why not just code this?" Because Postman does something that Java test code cannot without significant glue work: it lets a non-developer QA engineer swap the entire environment with a single dropdown click, chain requests so that the login token from Request 1 flows directly into Request 2\'s Authorization header, and export the entire suite as a JSON file that Newman runs in CI without any compile step. In production environments where a single wrong baseUrl or stale token causes an entire order flow to fail silently, this environment-switching precision is the difference between catching a broken microservice contract in the pipeline and discovering it in a customer\'s failed checkout.',
          },
          { type: 'heading', text: 'Microservices — Why Postman Collections Are Essential' },
          { type: 'text', content: 'In a microservices architecture each service lives at its own URL and has its own auth. Testing manually means switching URLs, updating tokens, and managing base addresses constantly. Postman Collections + Environments solve this: one collection, four environment files (dev, staging, prod) — switch with a single click. Variables like {{baseUrl}}, {{authToken}}, {{userId}} carry data automatically between requests.' },
          {
            type: 'diagram-svg',
            title: 'Microservices Architecture — One Postman, 4 Services (Animated)',
            svg: microservicesSvg,
          },
          { type: 'heading', text: 'Creating Variables — Method 1: Environment UI' },
          { type: 'text', content: 'Environments store key-value pairs scoped to a deployment context. Create one per environment (dev, staging, prod). Every request that uses {{baseUrl}} automatically picks up the right value — no manual editing needed when switching contexts.' },
          {
            type: 'steps',
            items: [
              { label: 'Click the 🌍 Environments icon (left sidebar)', desc: 'Opens the Environments panel.' },
              { label: 'Click "+ Create environment"', desc: 'Name it "microservices-dev".' },
              { label: 'Add row: Variable = baseUrl, Initial Value = https://dev.api.company.com', desc: 'Click the first empty row to type. Initial value is the template; current value is runtime-overridable.' },
              { label: 'Add: authToken — leave blank', desc: 'The POST /login test script will fill this after login. Current value is set dynamically at runtime.' },
              { label: 'Add: userId, orderId — leave blank', desc: 'These get populated as your E2E test suite runs in sequence via pm.environment.set().' },
              { label: 'Click "Save" then select from the top-right dropdown', desc: 'All {{variables}} in every request now resolve to this environment\'s values.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Environment Editor — Variables Animating In',
            svg: varCreateSvg,
          },
          { type: 'heading', text: 'Creating Variables — Method 2: Via Script (pm.environment.set)' },
          { type: 'text', content: 'Use pm.environment.set() in a Tests tab script to dynamically set variables during a run. This is how request chaining works — POST /login saves the token, all subsequent requests use {{authToken}} automatically. Java analogy: this is like writing to a shared Properties object that all test classes can read.' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Tests tab — Save response values as environment variables:',
            code: `// ── Request 1: POST /auth/login ─────────────────────────
pm.test("Login success", () => pm.response.to.have.status(200));
const auth = pm.response.json();
pm.environment.set("authToken", auth.token);       // → {{authToken}}
pm.environment.set("tokenExpiry", Date.now() + 3600000);

// ── Request 2: POST /users (User Service) ────────────
pm.test("User created 201", () => pm.response.to.have.status(201));
const user = pm.response.json();
pm.environment.set("userId", user.id);             // → {{userId}}

// ── Request 3: GET /users/{{userId}} ─────────────────
// URL bar: {{baseUrl}}/users/{{userId}}   resolves to: .../users/42
// Header:  Authorization: Bearer {{authToken}}

// ── Request 4: POST /orders (Order Service) ──────────
pm.test("Order created 201", () => pm.response.to.have.status(201));
const order = pm.response.json();
pm.environment.set("orderId", order.id);           // → {{orderId}}

// ── Request 5: POST /payments (Payment Service) ──────
// Body: { "orderId": "{{orderId}}", "userId": "{{userId}}" }`,
          },
          pmEnvVarChainStep,
          { type: 'heading', text: 'Creating Variables — Method 3: Collection Variables' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Collection variables — shared constants across all environments:',
            code: `// Collection variables: right-click Collection → Edit → Variables tab
// Or set via script — persists for the whole collection run:

pm.collectionVariables.set("apiVersion", "v1");    // {{apiVersion}}
pm.collectionVariables.set("pageSize", "20");      // {{pageSize}}

// Use in URL bar:
// {{baseUrl}}/api/{{apiVersion}}/users?limit={{pageSize}}
// → resolves to: https://dev.api.company.com/api/v1/users?limit=20

// When to use which:
// pm.globals.set()             → whole workspace (API key, shared constant)
// pm.environment.set()         → changes per env (baseUrl, token, dynamic IDs)
// pm.collectionVariables.set() → constant within collection (apiVersion, pageSize)
// pm.variables.set()           → single request only (temp calculation, deleted after)`,
          },
          pmCollectionVarsStep,
          { type: 'heading', text: 'Creating a Collection — Step by Step' },
          { type: 'text', content: 'One collection per microservice is the recommended QA pattern. Start with the Auth Service collection — once login works and saves the token, all other services inherit authentication through environment variables.' },
          {
            type: 'steps',
            items: [
              { label: 'Click "New" → "Collection" (or the + icon in the Collections sidebar)', desc: 'A new empty collection appears.' },
              { label: 'Name it "Auth Service Tests"', desc: 'Add a description explaining what this collection covers.' },
              { label: 'Right-click collection → "Add folder"', desc: 'Create folders: "Auth Flows", "Token Refresh", "Negative Tests".' },
              { label: 'Inside a folder: "Add request"', desc: 'Name it "POST /login — valid credentials". Set method, URL, body, and Tests script.' },
              { label: 'Save with Ctrl+S', desc: 'The request is now permanently saved in the collection. Zero re-typing needed.' },
              { label: 'Repeat for each service', desc: 'User Service Collection → Order Service Collection → Payment Service Collection.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Collection Hierarchy — Microservices Structure',
            svg: collectionHierarchySvg,
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'Recommended collection folder structure for microservices:',
            code: `// Workspace
// ├── 📁 Auth Service Tests
// │   ├── 📂 Auth Flows
// │   │   ├── POST /login — valid credentials       → 200 + save authToken
// │   │   ├── POST /login — wrong password          → 401 expected
// │   │   └── POST /refresh — expired token         → 200 + new authToken
// │   └── 📂 Negative Tests
// │       └── POST /login — missing body fields     → 400 expected
// │
// ├── 📁 User Service Tests
// │   ├── 📂 CRUD
// │   │   ├── POST /users — create user             → 201 + save userId
// │   │   ├── GET /users/{{userId}}                 → 200 + verify name/email
// │   │   └── DELETE /users/{{userId}}              → 204 expected
// │   └── 📂 Validation
// │       └── POST /users — duplicate email         → 409 Conflict
// │
// ├── 📁 Order Service Tests
// │   └── POST /orders — create order              → 201 + save orderId
// │
// └── 📁 Payment Service Tests
//     └── POST /payments — process payment        → 201 Created`,
          },
          pmFolderStructureStep,
          { type: 'heading', text: 'Sharing a Collection — 4 Methods' },
          { type: 'text', content: 'Once your collection is ready, sharing it ensures the whole team tests consistently. Git is the recommended approach for CI/CD teams — version-controlled, reviewable in PRs, and runnable by Newman on every commit.' },
          {
            type: 'diagram-svg',
            title: 'Collection Sharing — 4 Distribution Methods (Animated)',
            svg: shareFlowSvg,
          },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '📄', label: 'Export as JSON', desc: 'Right-click collection → Export → Collection v2.1. Send the .json file. Recipient imports via File → Import. Best for one-off sharing without Git.' },
              { icon: '🌿', label: 'Git (Recommended for CI/CD)', desc: 'Export collection.json + env.json into a tests/postman/ directory in your repo. CI/CD pipeline pulls and runs them on every push. Version-controlled and auditable.' },
              { icon: '☁️', label: 'Postman Cloud Workspace', desc: 'Share → "Via Run in Postman" link, or invite teammates to a shared Workspace. Changes sync in real-time — everyone sees the latest version immediately.' },
              { icon: '⚡', label: 'Newman CLI', desc: 'Export JSON → commit to Git → run via newman run. Exit code 1 on any test failure automatically fails the CI build. The core of automated regression.' },
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Git workflow for collection version control:',
            code: `# 1. Create postman directory in project
mkdir tests/postman

# 2. Export from Postman (File → Export):
#    tests/postman/auth-service.collection.json
#    tests/postman/user-service.collection.json
#    tests/postman/env.dev.json
#    tests/postman/env.staging.json

# 3. Commit
git add tests/postman/
git commit -m "chore: add postman collections for microservices e2e"

# 4. Run from CI/CD:
newman run tests/postman/auth-service.collection.json \\
  -e tests/postman/env.staging.json \\
  -r cli,htmlextra \\
  --reporter-htmlextra-export results/auth-report.html`,
          },
          { type: 'heading', text: 'Running a Collection — Collection Runner GUI' },
          { type: 'text', content: 'Collection Runner executes all requests in sequence — each request\'s test scripts run automatically after the response. Perfect for manual regression checks after a deployment. Java analogy: it\'s like running a full TestNG suite but clicking a button instead of "mvn test".' },
          {
            type: 'steps',
            items: [
              { label: 'Click "▶ Run" next to a collection name', desc: 'Opens the Collection Runner panel.' },
              { label: 'Select Environment: "microservices-dev"', desc: 'All {{variables}} resolve to this environment\'s values.' },
              { label: 'Set Iterations (default: 1)', desc: 'Increase for data-driven testing — each iteration reads one row from a CSV file.' },
              { label: 'Set Delay (optional)', desc: 'Add milliseconds between requests if the server needs processing time between steps.' },
              { label: 'Click "Run [collection name]"', desc: 'Postman executes every request in the order you arranged them. Test scripts fire after each response.' },
              { label: 'Review the results panel', desc: 'Green ✅ = assertion passed. Red ❌ = failed — click to see which assertion and what was expected vs actual.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Collection Runner — E2E Microservices Flow (Animated)',
            svg: collectionRunnerSvg,
          },
          { type: 'heading', text: 'Running via Newman CLI' },
          {
            type: 'code',
            language: 'bash',
            label: 'Newman — CLI options for all scenarios:',
            code: `# Basic run
newman run auth-service.collection.json

# With environment file
newman run auth-service.collection.json -e env.dev.json

# With HTML report
newman run auth-service.collection.json \\
  -e env.staging.json \\
  -r cli,htmlextra \\
  --reporter-htmlextra-export report.html

# Data-driven testing (CSV with 1 row per test scenario)
newman run user-service.collection.json \\
  -e env.dev.json \\
  --iteration-data test-users.csv \\
  --iteration-count 10

# Run all 4 microservices in sequence (fails fast on first error)
newman run tests/postman/auth-service.collection.json   -e env.staging.json &&
newman run tests/postman/user-service.collection.json   -e env.staging.json &&
newman run tests/postman/order-service.collection.json  -e env.staging.json &&
newman run tests/postman/payment-service.collection.json -e env.staging.json`,
          },
          pmNewmanCliStep,
          { type: 'heading', text: 'Variable Scope — Priority Order' },
          {
            type: 'diagram-svg',
            title: 'Variable Scope — Which Value Wins',
            svg: varScopeSvg,
          },
          {
            type: 'table',
            headers: ['Scope', 'Set With', 'Lifetime', 'Best For'],
            rows: [
              ['Local (highest priority)', 'pm.variables.set()', 'Single request', 'Temp calculations'],
              ['Collection', 'pm.collectionVariables.set()', 'Whole collection run', 'API version, page size'],
              ['Environment', 'pm.environment.set()', 'Until changed', 'baseUrl, authToken, dynamic IDs'],
              ['Global (lowest priority)', 'pm.globals.set()', 'Whole workspace', 'Shared API keys, constants'],
            ],
          },
          {
            type: 'feynman-checkpoint',
            promptTr: 'Postman\'da Environment Variable zincirlemesi nasıl çalışır? POST /login\'den dönen token\'ı sonraki isteklerde nasıl kullanırsın? Jargon kullanmadan, sektöre yeni giren birine anlat.',
            promptEn: 'How does Environment Variable chaining work in Postman? How do you use the token from POST /login in subsequent requests? Explain without jargon, as to a newcomer.',
            keywords: [['token','auth'], ['environment','variable','değişken'], ['pm.environment.set','set'], ['tests tab','tests','test script'], ['{{','curly']],
            minScore: 3,
            modelAnswerTr: 'Postman\'da bir istekten dönen değeri (örn. token) "Tests" sekmesine küçük bir kod yazarak environment\'a kaydedebilirsin: pm.environment.set("token", yanıt.body.token). Sonraki isteklerde Authorization header\'ına {{token}} yazınca Postman otomatik olarak kaydettiğin değeri oraya yerleştirir. Böylece her istekte token\'ı elle kopyalamazsın.',
            modelAnswerEn: 'In Postman you can save a value from one response (e.g. a token) into the environment by writing a small script in the Tests tab: pm.environment.set("token", response.body.token). In subsequent requests you write {{token}} in the Authorization header and Postman automatically fills in the saved value. This way you never copy-paste the token manually.',
          },
          pmVariableResolutionFilm,
          pmCollectionHierarchyStep,
          pmCollectionHierarchyPractice,
          {
            type: 'quiz',
            question: 'Your E2E flow: POST /login → POST /users → POST /orders → POST /payments. The /orders request needs the userId from step 2. What is the correct approach?',
            options: [
              { id: 'a', text: 'Manually copy the userId from step 2 response and paste into step 3 URL each time' },
              { id: 'b', text: 'In step 2 Tests tab: pm.environment.set("userId", body.id). Use {{userId}} in step 3 URL.' },
              { id: 'c', text: 'Hardcode a known userId in all requests — it won\'t change' },
              { id: 'd', text: 'Create a separate collection per step so they don\'t interfere' },
            ],
            correct: 'b',
            explanation: 'Request chaining via environment variables is the core Postman E2E pattern. Step 2\'s Tests script saves the dynamic server-generated ID; step 3 reads it via {{userId}}. This works even when the server generates different IDs on each run. Hardcoding breaks after the first test run deletes the user.',
          
        retryQuestion: {
      "question": "In a Postman test suite: POST /auth → POST /items, where the second request requires an 'itemId' returned from the first. How should you automate this data transfer?",
      "options": [
            {
                  "id": "a",
                  "text": "Use the 'Pre-request Script' to manually type the ID before running the suite"
            },
            {
                  "id": "b",
                  "text": "Use the 'Tests' script in the first request to save the variable to an environment, and use {{variableName}} in the second request"
            },
            {
                  "id": "c",
                  "text": "Use hardcoded IDs in both requests and update them manually every time the database is reset"
            },
            {
                  "id": "d",
                  "text": "Store the ID in a static global file and manually update it before every test run"
            }
      ],
      "correct": "b",
      "explanation": "Dynamic chaining is essential for automated suites. By extracting the ID from the response body in the 'Tests' tab using pm.environment.set(), you ensure the second request always uses the data generated by the current run. This makes tests robust against database changes and independent of previous execution values."
}
},
        ],
      },

      // ── 3. TEST AUTOMATION ──────────────────────────────────────────────
      {
        title: '🔥 Writing Automated Tests',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔍',
            content: 'Postman test scripts work exactly like a quality control gate at the end of a factory conveyor belt — every product (API response) passes through an automated inspection before it is allowed to leave the line. The inspector does not just look at the label (status code 200); it measures dimensions (response time under 500ms), checks the materials list (JSON schema), verifies the serial number is not null (id field), and confirms the product is not a duplicate (unique token). Now the real question: if you are already writing JUnit assertions in Java to test business logic, why write JavaScript assertions in Postman too? Because Postman tests are executed at the HTTP boundary, not inside the JVM — they prove that the API contract as experienced by any external consumer is correct, independent of the implementation language. In CI terms, a failing Postman test in Newman is a broken API contract: the kind of silent regression that causes a mobile app or a third-party integration to receive wrong data formats, empty arrays where items were expected, or 200 status codes masking a failed transaction — exactly the bugs that unit tests never catch because they never cross the network.',
          },
          { type: 'heading', text: 'The pm.test() API — Writing Assertions' },
          { type: 'text', content: 'The Tests tab runs JavaScript after every request. The pm (Postman) object provides all assertion tools. Results appear in the "Test Results" tab in the response panel — with green ✅ or red ❌ per test.' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Tests Tab — Core Assertions:',
            code: `// Test 1: Status code
pm.test("Status is 200 OK", function() {
    pm.response.to.have.status(200);           // fails if status != 200
});

// Test 2: Response time (performance assertion)
pm.test("Response time < 500ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Response is valid JSON
pm.test("Response is JSON", function() {
    pm.response.to.be.json;                    // fails if not JSON content-type
});

// Test 4: Specific field check
pm.test("User name is Alice", function() {
    const json = pm.response.json();           // parse the JSON body
    pm.expect(json.name).to.equal("Alice");    // exact equality check
});

// Test 5: Array has items
pm.test("Users list not empty", function() {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");         // type check
    pm.expect(json.length).to.be.greaterThan(0); // length check
});`,
          },
          pmCoreAssertionsStep,
          {
            type: 'java-compare',
            topic: 'API Assertions',
            why: 'Java QA engineers use REST Assured for API testing. Postman uses the same BDD-style assertion concepts — just JavaScript (Chai library) instead of Java.',
            java: `// Java — REST Assured (TestNG/JUnit)
@Test
public void testGetUsers() {
    given()
        .header("Authorization","Bearer " + token)
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)                     // status assertion
        .body("name[0]", equalTo("Alice"))   // body assertion
        .body("", hasSize(greaterThan(0)))   // array size
        .time(lessThan(500L));               // performance
}`,
            python: `// Postman — JavaScript (Tests tab)
pm.test("Status 200", () => {
    pm.response.to.have.status(200);
});
pm.test("First user Alice", () => {
    const users = pm.response.json();
    pm.expect(users[0].name).to.equal("Alice");
});
pm.test("Has users", () => {
    pm.expect(pm.response.json()).to.have.length.above(0);
});
pm.test("Fast response", () => {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,
            note: 'Both use given/when/then style. pm.test() names the test; pm.expect() is the assertion. Chai assertion library is built into Postman.',
          },
          { type: 'heading', text: 'Chaining Requests — Passing Data Between Requests' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Request 1 (POST /login) — Tests tab: save the token',
            code: `// After POST /login succeeds, extract and save the JWT
pm.test("Login successful", function() {
    pm.response.to.have.status(200);           // verify login worked first
});

const responseJson = pm.response.json();           // parse the response
pm.environment.set("authToken", responseJson.token); // save for next request
console.log("Token saved:", responseJson.token);   // visible in Postman Console`,
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'Request 2 (GET /profile) — use the saved token:',
            code: `// In Headers tab:
// Authorization: Bearer {{authToken}}   ← uses what Request 1 saved

// In Tests tab:
pm.test("Profile returned", function() {
    const profile = pm.response.json();
    pm.expect(profile.email).to.include("@");   // email format check
    pm.expect(profile).to.have.property("id");   // id field exists
});`,
          },
          pmRequestChainStep,
          { type: 'heading', text: 'Pre-request Scripts — Setup Before the Request' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Pre-request Script tab (runs BEFORE the request):',
            code: `// Generate a unique email for each test run (avoid duplicate conflicts)
const timestamp = Date.now();                                   // epoch ms
pm.environment.set("testEmail", "test+" + timestamp + "@qa.com");

// Set a dynamic date
const today = new Date().toISOString().split("T")[0];          // "2024-01-15"
pm.environment.set("today", today);

// Use in request body:
// { "email": "{{testEmail}}", "date": "{{today}}" }`,
          },
          pmPreRequestScriptStep,
          { type: 'heading', text: 'Newman — Running Collections from CLI' },
          { type: 'text', content: 'Newman is the command-line runner for Postman collections. It executes every request and runs all test scripts. Newman is how you put Postman tests into Jenkins, GitHub Actions, or any CI/CD pipeline.' },
          {
            type: 'installation',
            title: 'Newman Setup',
            steps: [
              { cmd: 'npm install -g newman', explanation: 'Install Newman globally via npm. Requires Node.js 14+.' },
              { cmd: 'npm install -g newman-reporter-htmlextra', explanation: 'Install the HTML reporter for beautiful test reports.' },
              { cmd: 'newman --version', explanation: 'Verify installation — should print newman/6.x.x.' },
              { cmd: 'newman run collection.json -e env.json -r htmlextra --reporter-htmlextra-export report.html', explanation: 'Run collection with environment. Exports an HTML report to report.html. This is your CI/CD command.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'GitHub Actions — CI/CD integration:',
            code: `# .github/workflows/api-tests.yml
name: API Tests (Newman)

on:
  push:
    branches: [main, develop]     # run on every push
  pull_request:
    branches: [main]              # run on PR to main

jobs:
  api-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3             # clone repo

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API Tests
        run: |
          newman run postman/collection.json \\
            -e postman/env_staging.json \\    # use staging env file
            -r cli,htmlextra \\              # CLI output + HTML
            --reporter-htmlextra-export report.html

      - name: Upload Report
        uses: actions/upload-artifact@v3
        if: always()                          # upload even if tests fail
        with:
          name: api-test-report
          path: report.html`,
          },
          pmNewmanCiCdStep,
          { type: 'heading', text: 'Common Postman Errors & Solutions' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'postman-errors-en',
            framework: 'Postman',
            errors: [
              {
                error: 'ECONNREFUSED',
                fullMessage: 'Error: connect ECONNREFUSED 127.0.0.1:3000',
                cause: { tr: 'Hedef sunucu çalışmıyor veya yanlış port/URL kullanılıyor.', en: 'Target server is not running, or wrong port/URL.' },
                solution: { tr: '1) Sunucunun çalıştığını doğrula. 2) Port numarasını kontrol et. 3) localhost yerine 127.0.0.1 dene.', en: '1) Verify the server is running. 2) Check the port. 3) Try 127.0.0.1 instead of localhost.' },
                codeWrong: `// Server is not running
GET http://localhost:3000/api/users
// Error: connect ECONNREFUSED`,
                codeFixed: `// 1. Start your server first:
// npm start  OR  python app.py  OR  java -jar app.jar

// 2. Then send:
GET http://localhost:3000/api/users
// 200 OK`,
              },
              {
                error: 'SSL Certificate Error',
                fullMessage: 'Error: unable to verify the first certificate',
                cause: { tr: 'Sunucu self-signed SSL sertifikası kullanıyor (lokal geliştirme ortamı).', en: 'Server uses a self-signed SSL certificate (common in local dev).' },
                solution: { tr: 'Postman Settings → General → SSL certificate verification → OFF. Sadece dev ortamında yap, production\'da asla.', en: 'Postman Settings → General → SSL certificate verification → OFF. Dev only — never in production.' },
                codeWrong: `// SSL verification ON — fails for self-signed certs
GET https://local-dev.example.com/api
// Error: unable to verify the first certificate`,
                codeFixed: `// Postman Settings → SSL certificate verification → OFF
GET https://local-dev.example.com/api
// 200 OK (for self-signed cert environments)`,
              },
              {
                error: 'AssertionError: expected 404 to equal 200',
                fullMessage: 'AssertionError: expected 404 to deeply equal 200',
                cause: { tr: 'URL yanlış, endpoint adı değişmiş veya resource silinmiş.', en: 'Wrong URL, endpoint was renamed, or the resource no longer exists.' },
                solution: { tr: '1) URL\'yi API dokümantasyonuyla karşılaştır. 2) /v1/ gibi versiyonu kontrol et. 3) Auth token eksik olabilir (bazı API\'ler 404 döner yetkisiz isteklere).', en: '1) Compare URL against API docs. 2) Check version prefix (/v1/). 3) Missing auth token — some APIs return 404 instead of 401.' },
                codeWrong: `// Wrong path — missing plural 's'
GET https://api.example.com/user/42   // 404`,
                codeFixed: `// Correct
GET https://api.example.com/users/42  // 200`,
              },
              {
                error: 'SyntaxError in Tests script',
                fullMessage: 'SyntaxError: Unexpected token } (in Tests tab)',
                cause: { tr: 'Test scriptinde JavaScript sözdizimi hatası — eksik parantez veya yanlış noktalı virgül.', en: 'JavaScript syntax error in the test script — missing brackets or wrong semicolons.' },
                solution: { tr: 'Postman\'daki kırmızı hata satırına tıkla. Parantezlerin kapalı olduğunu kontrol et.', en: 'Click the red error line at the bottom. Verify all brackets are properly closed.' },
                codeWrong: `// Missing closing });
pm.test("Status OK", function() {
    pm.response.to.have.status(200);
// ERROR: missing });`,
                codeFixed: `// Correct — all brackets closed
pm.test("Status OK", function() {       // open
    pm.response.to.have.status(200);    // assertion
});                                     // close`,
              },
            ],
          },
          pmTestScriptTimingFilm,
          pmAssertionOrderStep,
          pmAssertionOrderPractice,
          {
            type: 'quiz',
            question: 'You need to run your Postman collection every night at 2 AM as a scheduled regression. What should you use?',
            options: [
              { id: 'a', text: 'Open Postman manually at 2 AM and click Run Collection' },
              { id: 'b', text: 'Newman in a cron job or scheduled CI/CD pipeline — runs collections from CLI without GUI' },
              { id: 'c', text: 'Postman emails you results automatically — no extra tools needed' },
              { id: 'd', text: 'Duplicate all requests into Selenium for scheduling' },
            ],
            correct: 'b',
            explanation: 'Newman is the CLI runner for Postman. Set up a cron job (Linux: crontab -e) or a scheduled CI/CD pipeline trigger. The --reporter-junit flag generates JUnit XML that CI/CD platforms parse for pass/fail.',
          
        retryQuestion: {
      "question": "You have a suite of API tests and you want them to execute automatically whenever code is pushed to your Git repository. What is the standard approach for this?",
      "options": [
            {
                  "id": "a",
                  "text": "Wait for a QA engineer to manually trigger the tests every day"
            },
            {
                  "id": "b",
                  "text": "Integrate Newman into your CI/CD pipeline (e.g., Jenkins, GitHub Actions) to execute tests automatically on commit"
            },
            {
                  "id": "c",
                  "text": "Attach a local Postman monitor that only runs on the developer's laptop"
            },
            {
                  "id": "d",
                  "text": "Convert all API tests into manual test cases in a spreadsheet"
            }
      ],
      "correct": "b",
      "explanation": "Integrating Newman into CI/CD pipelines is the standard automation practice. It allows the Newman command-line interface to execute collections as part of the build process, ensuring immediate feedback on every commit without manual intervention."
}
},
          {
            type: 'interleaving-challenge',
            challenges: [
              {
                topic: 'Postman',
                questionEn: 'In the Tests tab, you extract a token: pm.environment.set("token", pm.response.json().token). In the next request, where do you use {{token}}?',
                questionTr: 'Tests sekmesinde pm.environment.set("token", pm.response.json().token) yazdın. Sonraki istekte {{token}}\'ı nereye yazarsın?',
                optionsEn: ['In the URL path only', 'In the Authorization header (Bearer {{token}})', 'In the Body tab only', 'In the Pre-request Script'],
                optionsTr: ['Sadece URL yoluna', 'Authorization header\'ına (Bearer {{token}})', 'Sadece Body sekmesine', 'Pre-request Script\'e'],
                correct: 1,
                explanationEn: 'Environment variables set via pm.environment.set() are accessible in any part of the next request using {{variableName}} — most commonly in headers like Authorization: Bearer {{token}}.',
                explanationTr: 'pm.environment.set() ile kaydedilen değerler sonraki istekte {{değişkenAdı}} olarak her yerde kullanılabilir. En yaygın kullanım Authorization: Bearer {{token}} şeklinde header\'dadır.',
              },
              {
                topic: 'SQL',
                questionEn: 'After POST /users returns 201, you run a DB check. Which SQL query validates the user was actually stored?',
                questionTr: 'POST /users 201 döndürdükten sonra DB kontrolü yapıyorsun. Kullanıcının gerçekten kaydedildiğini hangi SQL ile doğrularsın?',
                optionsEn: ['INSERT INTO users VALUES (...)', 'SELECT * FROM users WHERE email = \'test@test.com\'', 'UPDATE users SET verified = true', 'DELETE FROM users WHERE id = 1'],
                optionsTr: ['INSERT INTO users VALUES (...)', 'SELECT * FROM users WHERE email = \'test@test.com\'', 'UPDATE users SET verified = true', 'DELETE FROM users WHERE id = 1'],
                correct: 1,
                explanationEn: 'After a POST creates a resource, a SELECT query against the DB directly is the gold-standard QA check — it confirms persistence independent of the API layer.',
                explanationTr: 'POST bir kaynak oluşturduktan sonra, DB\'ye doğrudan SELECT sorgusu atmak altın standarttır — API katmanından bağımsız olarak verinin kalıcı olduğunu doğrular.',
              },
              {
                topic: 'RestAssured',
                questionEn: 'You want to assert that the response JSON has a field "status" equal to "active". What is the correct RestAssured assertion?',
                questionTr: 'Yanıt JSON\'ında "status" alanının "active" olduğunu doğrulamak istiyorsun. Doğru RestAssured assertion hangisi?',
                optionsEn: ['.body("status", is("active"))', '.statusCode("active")', '.header("status", equalTo("active"))', '.json("status").equals("active")'],
                optionsTr: ['.body("status", is("active"))', '.statusCode("active")', '.header("status", equalTo("active"))', '.json("status").equals("active")'],
                correct: 0,
                explanationEn: '.body(jsonPath, matcher) is the RestAssured method for JSON field assertions. Hamcrest matchers like is(), equalTo(), hasSize() are used as the second argument.',
                explanationTr: '.body(jsonPath, matcher) RestAssured\'ın JSON alan doğrulaması için kullandığı metoddur. Hamcrest matcher\'ları (is(), equalTo(), hasSize()) ikinci argüman olarak verilir.',
              },
            ],
          },
        ],
      },

      // ── 4. REAL WORLD ─────────────────────────────────────────────────────
      {
        title: '🛠️ Real World Usage',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: "Postman works like a professional sound engineer's mixing board in a live venue: every channel (endpoint) feeds into one console, the engineer can solo any channel (send a single request), mute others (skip flaky endpoints in a run), and record the entire session (export the collection to JSON) so the next engineer does not have to re-wire the board from scratch. But here is what even seasoned developers miss: Postman is not just for exploratory testing — it is the only tool that lets a QA engineer build an end-to-end API regression suite without writing a single line of Java or Python. In Java terms, imagine having a JUnit test suite where you can swap the entire test data set (environment file), chain test outputs into subsequent test inputs (collection variables), and hand the suite to a non-programmer without them ever opening an IDE. In a real QA scenario this means: when a microservices backend ships a new API contract, a Postman collection catches every broken response field, missing header, or incorrect status code in Newman's CI run — before a single UI automation test is even triggered, saving minutes per pipeline run and eliminating the category of bugs that unit tests never see." },
          { type: 'heading', text: 'What Need Does This Fill? Life Without Postman' },
          { type: 'text', content: "Without Postman, testing an API meant either waiting for a frontend to be built (so you could click through a UI) or writing throwaway curl commands / Java HttpClient snippets by hand for every single endpoint. Headers, auth tokens, and request bodies had to be retyped every time, and there was no easy way to chain 'login, then use that token in the next 5 requests.' Postman replaces all of that with a reusable, shareable, scriptable client — the API equivalent of a Selenium IDE for browsers." },
          { type: 'heading', text: 'Real-World Scenario: Microservices Order Flow' },
          { type: 'text', content: "A mid-size e-commerce company has 4 microservices: Auth, Catalog, Cart, and Orders. A new QA engineer joins and is asked: 'Before the frontend team finishes the checkout UI, verify the entire backend order flow works end-to-end.'" },
          {
            type: 'steps',
            items: [
              'Create a Postman Collection "Order Flow E2E" with 4 folders matching the 4 services',
              'Request 1 — POST /auth/login: save the returned JWT into a collection variable using pm.collectionVariables.set("token", pm.response.json().token) in the Tests tab',
              'Request 2 — GET /catalog/products: add Authorization: Bearer {{token}} to the headers, write a test asserting pm.response.json().length > 0',
              'Request 3 — POST /cart/add: send {{token}} + a productId captured from Request 2\'s response, chaining data between requests automatically',
              'Request 4 — POST /orders/checkout: the final step — assert response.status === "CONFIRMED" and the order total matches cart total',
              'Run the whole folder with Collection Runner — all 4 requests execute in sequence, each test result shown pass/fail',
              'Export the collection + environment as JSON, commit to tests/postman/ in Git, and wire Newman into the CI pipeline so this E2E check runs on every backend PR — long before the frontend exists',
            ]
          },
          { type: 'heading', text: 'Comparing Postman to Alternatives — Real-World Trade-offs' },
          {
            type: 'table',
            headers: ['Tool', 'Advantages ✅', 'Disadvantages ❌', 'Choose it when...'],
            rows: [
              ['Postman', 'No-code GUI, chaining via collection variables, huge ecosystem (mock servers, monitors), Newman for CI', 'GUI-first workflow can drift from version control if not exported regularly', 'Your team wants fast exploratory testing AND a path to CI automation without writing a full code framework'],
              ['curl / raw HTTP', 'Zero setup, scriptable in any shell, great for one-off debugging', 'No built-in chaining, no test assertions, painful to maintain a suite of requests', 'You need a single quick request from a terminal, not a reusable suite'],
              ['REST Assured (Java)', 'Full programming language power, fits naturally into a Java/Maven test suite, easy to integrate with JUnit/TestNG', 'Requires writing Java code for every request — slower for exploratory testing', 'Your team is Java-heavy and wants API tests living in the same repo/language as the app code'],
            ]
          },
          { type: 'heading', text: 'Real-World Integration Flow' },
          {
            type: 'visual', variant: 'flow',
            title: 'How a Postman Collection Actually Reaches Production Decisions',
            steps: [
              { num: '1', label: 'Build Collection', desc: 'QA chains requests in Postman GUI' },
              { num: '2', label: 'Export JSON', desc: 'tests/postman/order-flow.json' },
              { num: '3', label: 'Commit to Git', desc: 'versioned alongside app code', highlight: true },
              { num: '4', label: 'CI runs Newman', desc: 'newman run order-flow.json -e prod.json' },
              { num: '5', label: 'JUnit report', desc: '--reporter-junit feeds CI dashboard' },
              { num: '6', label: 'Pass/Fail gate', desc: 'Build blocked if any pm.test() fails', highlight: true },
            ],
            note: 'This is the same pipeline shape as a Selenium regression suite — only the layer being tested moved from UI to HTTP.',
          },
          { type: 'heading', text: 'Hands-On Mini Project — Try It Yourself' },
          { type: 'text', content: 'Build this 2-request chain against a free public API to see variable-passing between requests in under 5 minutes.' },
          {
            type: 'code', code: `// Request 1: GET https://jsonplaceholder.typicode.com/users/1
// Tests tab:
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.collectionVariables.set("userId", pm.response.json().id);
pm.collectionVariables.set("userEmail", pm.response.json().email);

// Request 2: GET https://jsonplaceholder.typicode.com/posts?userId={{userId}}
// Tests tab:
pm.test("Status is 200", () => pm.response.to.have.status(200));
pm.test("All posts belong to chained userId", () => {
    const posts = pm.response.json();
    posts.forEach(p => pm.expect(p.userId).to.eql(
        parseInt(pm.collectionVariables.get("userId"))
    ));
});

// Run both with Collection Runner — Request 2 automatically uses
// the userId captured from Request 1's response. No manual copy-paste.`
          },
          pmNewmanCiFilm,
          pmCiGateStep,
          pmCiGatePractice,
          {
            type: 'quiz',
            question: 'A team wants to do fast, exploratory API testing AND eventually move to CI automation without writing a full code framework from scratch. Which tool fits both needs?',
            options: [
              { id: 'a', text: 'curl only' },
              { id: 'b', text: 'Postman, since the same collection can be explored in the GUI and run unattended in CI via Newman' },
              { id: 'c', text: 'A custom Java framework written from scratch' },
              { id: 'd', text: 'A spreadsheet of manual test cases' },
            ],
            correct: 'b',
            explanation: 'Postman lets you build and explore requests with a no-code GUI, then export the exact same collection.json and run it unattended in CI with Newman — no separate framework rewrite needed. curl has zero built-in chaining/assertions for a maintained suite, and a custom Java framework (like REST Assured) gives full programming power but requires writing real code from day one, which is overkill for fast exploratory testing.',
            retryQuestion: {
              question: 'A team has outgrown Postman and now needs complex programmatic logic (custom retry strategies, conditional branching across hundreds of test cases) that the Postman UI struggles to express cleanly. What is the natural next step?',
              options: [
                { id: 'a', text: 'Keep forcing everything into Postman regardless of complexity' },
                { id: 'b', text: 'Migrate the suite to a full code framework like REST Assured (Java), which gives complete programming language power' },
                { id: 'c', text: 'Switch to curl, since it is simpler' },
                { id: 'd', text: 'Postman cannot be outgrown, no migration is ever needed' },
              ],
              correct: 'b',
              explanation: "Postman's no-code GUI is excellent for fast exploration and straightforward CI suites, but it is not a general-purpose programming environment — once test logic needs real conditionals, loops, or custom abstractions beyond what pm.* scripting comfortably supports, a full code framework like REST Assured gives the complete expressiveness of Java itself. This is a normal progression as a test suite's complexity grows, not a sign Postman was the wrong choice originally.",
            },
          },
        ],
      },

      // ── 5. ECOSYSTEM ──────────────────────────────────────────────────────
      {
        title: '🔗 Ecosystem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: "The Postman ecosystem works like a modern newspaper publishing pipeline: a journalist (QA engineer) writes and edits the article in a GUI editor (Postman), but the article only reaches readers when it goes through the printing press (Newman CLI), which is scheduled to run automatically by the editorial clock (CI/CD trigger on every Git push), and the resulting output is version-controlled in the archive (Git repository). Postman alone without Newman is like writing brilliant copy that never gets printed. But here is the real question: why not just write the whole suite in Java with RestAssured and skip Postman entirely? Because Postman's GUI authoring loop — type a URL, add a header, hit Send, see the response in 2 seconds — is five to ten times faster for exploratory testing and on-boarding new team members than standing up a Java project. The two tools are complementary: Postman for authoring and exploration, Newman for execution, Git for versioning, and CI/CD for scheduling. In QA practice, this four-part chain means that every API regression check that used to take a manual tester 3 hours runs automatically in under 2 minutes on every backend pull request — with a JUnit-format report that Jenkins or GitHub Actions can use as a build gate." },
          { type: 'heading', text: 'How Postman Fits Into the Bigger Picture' },
          { type: 'text', content: 'On its own, Postman is a manual tool — someone has to click "Send". Its real value in a QA pipeline comes from being wired into three other systems: Newman (the CLI runner that removes the GUI dependency), a CI/CD tool that triggers Newman automatically on every push, and Git for version-controlling the collection JSON itself alongside the application code it tests.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Postman Ecosystem — Who Talks to Whom',
            items: [
              { icon: '📮', label: 'Postman GUI', desc: 'build & debug collection interactively' },
              { arrow: true },
              { icon: '📄', label: 'Export collection.json', desc: 'committed to Git, versioned with the app' },
              { arrow: true },
              { icon: '⚡', label: 'Newman (CLI)', desc: 'runs the same collection headlessly' },
              { arrow: true },
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'triggers Newman on every PR/push', highlight: true },
              { arrow: true },
              { icon: '📊', label: 'JUnit/HTML report', desc: 'pass/fail gate + Slack alert', highlight: true },
            ],
            note: 'Each tool does one job well — Postman authors, Newman executes, Git versions, CI/CD schedules and gates.',
          },
          { type: 'heading', text: 'Three Key Relationships' },
          {
            type: 'table',
            headers: ['Relationship', 'How They Work Together', 'What Problem It Solves'],
            rows: [
              ['Postman ↔ Newman', 'Same collection.json file runs in both — GUI for authoring/debugging, Newman for unattended execution', 'Avoids writing the suite twice: once for humans, once for automation'],
              ['Postman ↔ Git', 'Collections + environments exported as JSON, committed next to the API source code', 'Version history, code review on test changes, rollback if a bad assertion is merged'],
              ['Newman ↔ CI/CD (Jenkins/GH Actions)', 'A pipeline stage runs `newman run` after every deploy to staging, fails the build on any failed pm.test()', 'Catches API regressions before they reach production, without a human clicking Send'],
              ['Postman ↔ Mock Servers', 'Postman can spin up a mock server from the same collection so frontend devs can build against it before the real backend exists', 'Decouples frontend and backend development timelines'],
            ]
          },
          { type: 'heading', text: 'Where Postman Sits Next to Other QA Tools' },
          { type: 'text', content: 'A Selenium/Playwright suite tests the UI; a Postman/Newman suite tests the API layer underneath it. Both typically run as separate stages in the same CI pipeline — API tests usually run first because they are faster and catch backend bugs before spending time on slower UI tests that depend on that same backend.' },
          pmMockServerFilm,
          pmToolLandscapeStep,
          pmToolLandscapePractice,
          {
            type: 'quiz',
            question: 'What is used to run a Postman collection unattended inside a CI/CD pipeline, without opening the Postman GUI?',
            options: [
              { id: 'a', text: 'Postman Mock Servers' },
              { id: 'b', text: 'Newman' },
              { id: 'c', text: 'Postman Sync' },
              { id: 'd', text: 'A browser extension' },
            ],
            correct: 'b',
            explanation: 'Newman is the command-line companion to Postman: it runs the exact same exported collection.json (with environments) headlessly, with no GUI, and reports pass/fail exit codes a CI pipeline (Jenkins, GitHub Actions) can act on. The same collection authored and debugged in the Postman app runs unattended via Newman in CI — no duplicate suite needed.',
            retryQuestion: {
              question: 'A Newman run in CI fails with `Error: ENOENT: no such file or directory, open \'./environments/staging.json\'`. What is the most likely cause?',
              options: [
                { id: 'a', text: 'Newman is fundamentally incompatible with CI environments' },
                { id: 'b', text: 'The environment JSON file was not exported/committed alongside the collection, or the path passed to `-e` is wrong on the CI runner' },
                { id: 'c', text: 'The collection itself is corrupted' },
                { id: 'd', text: 'Newman requires a paid Postman license to use environments' },
              ],
              correct: 'b',
              explanation: "Newman needs the collection.json AND the environment.json (if variables are used) to both exist as actual files at the paths passed on the command line — if the environment file was never exported from Postman and committed to the repo, or if the CI runner's working directory does not match the expected relative path, Newman cannot find it and fails with exactly this kind of file-not-found error.",
            },
          },
        ],
      },

      // ── 6. COMMON ERRORS ────────────────────────────────────────────────────
      {
        title: '🚨 Common Errors',
        blocks: [
          { type: 'simple-box', emoji: '🚨', content: 'Postman errors work exactly like a hospital triage system: every symptom has a known cause, and the severity label tells you how urgently to act. A 401 is the triage nurse saying "I do not know who you are — show your ID first." A 404 is "the department you asked for does not exist in this hospital." A CORS error is a security guard stopping you at the building entrance before you even reach the nurse. A timeout is an unanswered emergency call — the ambulance never arrived. The real question is not "what does this error mean?" but "at which layer of the system did the failure originate?" — and this is where QA engineers who understand the HTTP stack outperform developers who only know the application code. In Java terms, Postman errors map directly to familiar exception types: 401 → AuthenticationException, 404 → ResourceNotFoundException, 5xx → InternalServerError. Understanding the error taxonomy means you can reproduce, report, and isolate a backend bug in minutes rather than hours — and in a CI pipeline where Newman runs on every push, a correctly categorized error in the JUnit report tells the on-call engineer exactly which service boundary broke and what to fix, before any user is affected.' },
          { type: 'heading', text: 'Real Errors You Will Hit — and How to Fix Them' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'postman-errors-en',
            framework: 'Postman',
            errors: [
              {
                error: '401 Unauthorized',
                fullMessage: '{ "error": "Unauthorized", "message": "Invalid or missing token" }',
                cause: { tr: 'Authorization header eksik, token süresi dolmuş veya yanlış formatta gönderilmiş.', en: 'Authorization header is missing, the token expired, or it was sent in the wrong format.' },
                solution: { tr: '1) Headers sekmesinde Authorization: Bearer {{token}} olduğunu doğrula. 2) Token\'ın güncel login isteğinden geldiğini kontrol et. 3) Token süresini kontrol et (JWT exp claim).', en: '1) Verify Headers tab has Authorization: Bearer {{token}}. 2) Confirm the token came from a fresh login request. 3) Check token expiry (JWT exp claim).' },
                codeWrong: `// Missing Authorization header
GET https://api.example.com/orders
// 401 Unauthorized`,
                codeFixed: `// Add header after a successful login request
Authorization: Bearer {{token}}
GET https://api.example.com/orders
// 200 OK`,
              },
              {
                error: 'Could not get response — timeout',
                fullMessage: 'Error: connect ETIMEDOUT / "Could not get any response"',
                cause: { tr: 'Sunucu yanıt vermiyor (yanlış URL, sunucu kapalı, firewall engelliyor veya çok yavaş çalışıyor).', en: 'Server is not responding — wrong URL, server is down, firewall blocking, or server is too slow.' },
                solution: { tr: '1) URL\'yi tarayıcıda dene. 2) VPN/firewall kapatıp tekrar dene. 3) Settings → General → Request timeout süresini artır.', en: '1) Try the URL in a browser. 2) Disable VPN/firewall and retry. 3) Increase Settings → General → Request timeout.' },
                codeWrong: `GET https://staging-api-typo.example.com/health
// Error: Could not get any response`,
                codeFixed: `GET https://staging-api.example.com/health
// 200 OK — typo in subdomain was the cause`,
              },
              {
                error: 'JSON parse error in Tests',
                fullMessage: 'SyntaxError: Unexpected token < in JSON at position 0',
                cause: { tr: 'pm.response.json() çağrılıyor ama sunucu JSON yerine HTML (örn. 500 hata sayfası) döndürüyor.', en: 'pm.response.json() is called, but the server returned HTML (e.g. a 500 error page) instead of JSON.' },
                solution: { tr: '1) Response body\'i önce Postman Body sekmesinde gözle kontrol et. 2) Status code\'u logla — muhtemelen 500/502 dönüyor. 3) JSON parse etmeden önce status kontrolü ekle.', en: '1) First eyeball the response body in the Body tab. 2) Log the status code — likely a 500/502. 3) Guard the JSON parse behind a status check.' },
                codeWrong: `pm.test("Check name", () => {
    pm.expect(pm.response.json().name).to.eql("Ada");
    // crashes if server returned an HTML error page
});`,
                codeFixed: `pm.test("Status is 200 before parsing", () => {
    pm.response.to.have.status(200);
    pm.expect(pm.response.json().name).to.eql("Ada");
});`,
              },
              {
                error: 'Variable shows as literal {{baseUrl}} in URL',
                fullMessage: 'Request sent to literal string: https://{{baseUrl}}/users',
                cause: { tr: 'Doğru Environment seçilmemiş veya değişken o environment\'ta tanımlı değil.', en: 'The correct Environment is not selected in the top-right dropdown, or the variable is not defined in it.' },
                solution: { tr: '1) Sağ üstteki Environment dropdown\'ında "No Environment" değil doğru ortamın seçili olduğunu doğrula. 2) Environment\'ı aç, baseUrl değişkeninin tanımlı olduğunu kontrol et.', en: '1) Confirm the top-right Environment dropdown is not "No Environment" — pick the right one. 2) Open the environment and verify baseUrl is actually defined there.' },
                codeWrong: `// No environment selected (dropdown shows "No Environment")
GET https://{{baseUrl}}/users
// sent literally, fails to resolve`,
                codeFixed: `// "Dev" environment selected, baseUrl = api-dev.example.com
GET https://{{baseUrl}}/users
// resolves to https://api-dev.example.com/users`,
              },
              {
                error: 'ReferenceError in Pre-request Script',
                fullMessage: 'ReferenceError: pm is not defined',
                cause: { tr: 'Script Pre-request Script sekmesi yerine yanlışlıkla Tests sekmesine yazılmış, ya da sandbox dışı bir API kullanılıyor.', en: 'Script was pasted into the wrong tab (Tests instead of Pre-request Script), or a non-sandbox API is being used.' },
                solution: { tr: '1) Script\'in doğru sekmede olduğunu kontrol et. 2) Sadece pm.* sandbox API\'lerini kullan (require, fetch gibi Node API\'leri çalışmaz).', en: '1) Verify the script is in the correct tab. 2) Only use pm.* sandbox APIs — Node APIs like require or fetch are not available.' },
                codeWrong: `// Pasted in wrong tab, or using unsupported API
const fetch = require('node-fetch'); // not available in sandbox`,
                codeFixed: `// Pre-request Script tab, sandbox-safe
pm.environment.set("timestamp", Date.now());`,
              },
              {
                error: 'Newman build fails: 429 Too Many Requests',
                fullMessage: 'AssertionError: expected response to have status code 200 but got 429',
                cause: { tr: 'Hedef API rate limiting uyguluyor; CI çok hızlı ardışık istek gönderiyor.', en: 'The target API enforces rate limiting and CI is firing requests too fast back-to-back.' },
                solution: { tr: '1) Newman çalıştırmasına --delay-request 500 ekle. 2) Test ortamında rate limit\'i artırmayı backend ekibinden iste. 3) Paralel collection çalıştırmalarını sınırla.', en: '1) Add --delay-request 500 to the Newman run. 2) Ask backend to raise the rate limit for the test environment. 3) Limit parallel collection runs in CI.' },
                codeWrong: `newman run collection.json -e ci.json
// 429 errors midway through the run`,
                codeFixed: `newman run collection.json -e ci.json --delay-request 500
// requests spaced 500ms apart — no more 429s`,
              },
              {
                error: 'Body data not received by server',
                fullMessage: 'Server logs: req.body is undefined / empty object {}',
                cause: { tr: 'Body sekmesinde "raw / JSON" yerine yanlış format seçilmiş, veya Content-Type header body ile uyuşmuyor.', en: 'Wrong format selected in the Body tab (e.g. "raw / Text" instead of "raw / JSON"), or Content-Type header mismatches the actual body.' },
                solution: { tr: '1) Body tab → raw → sağdaki dropdown\'dan JSON seç (otomatik Content-Type ekler). 2) Headers\'ta manuel eklenmiş yanlış Content-Type varsa sil.', en: '1) Body tab → raw → select JSON from the right-side dropdown (auto-sets Content-Type). 2) Remove any manually-added conflicting Content-Type header.' },
                codeWrong: `// Body tab set to "Text" instead of "JSON"
{"name": "Ada"}
// Server receives: req.body === undefined`,
                codeFixed: `// Body tab set to raw → JSON (Content-Type: application/json auto-added)
{"name": "Ada"}
// Server receives: req.body === { name: "Ada" }`,
              },
              {
                error: 'CORS error (in Postman sandbox/embedded contexts)',
                fullMessage: 'Access to fetch has been blocked by CORS policy',
                cause: { tr: 'Postman Desktop uygulaması normalde CORS\'tan etkilenmez, ama Postman Web veya bir tarayıcı tabanlı mock server kullanırken sunucu Access-Control-Allow-Origin header\'ı döndürmüyor.', en: 'The Postman Desktop app normally bypasses CORS, but Postman Web or a browser-based mock-server flow fails when the server does not return an Access-Control-Allow-Origin header.' },
                solution: { tr: '1) Mümkünse Postman Desktop uygulamasına geç (CORS bypass edilir). 2) Backend\'e CORS header eklenmesini iste. 3) Geçici çözüm: Postman\'ın yerleşik proxy/agent özelliğini kullan.', en: '1) Switch to Postman Desktop where possible (bypasses CORS). 2) Ask backend to add CORS headers. 3) Workaround: use Postman\'s built-in proxy/agent feature.' },
                codeWrong: `// Postman Web, server has no CORS headers
GET https://api.example.com/data
// blocked by browser CORS policy`,
                codeFixed: `// Switched to Postman Desktop app — no browser sandbox restrictions
GET https://api.example.com/data
// 200 OK`,
              },
            ],
          },
          pmUnauthorizedDiagnosisFilm,
          pmDiagnosisFlowStep,
          pmDiagnosisFlowPractice,
          {
            type: 'quiz',
            question: 'A pm.test() block fails with "SyntaxError: Unexpected token < in JSON at position 0". What is the root cause and fix?',
            options: [
              { id: 'a', text: 'The test script has a typo' },
              { id: 'b', text: 'The server returned an HTML error page instead of JSON — guard pm.response.json() behind a status check' },
              { id: 'c', text: 'The collection variable is undefined' },
              { id: 'd', text: 'Postman cannot parse JSON responses at all' },
            ],
            correct: 'b',
            explanation: 'The "<" at position 0 is the start of an HTML `<html>` error page (typically a 500/502), not JSON. `pm.response.json()` tries to parse it as JSON and throws. The fix is to assert the status code is 200 BEFORE calling `.json()`, so the test fails with a clear "expected 200, got 500" message instead of a confusing JSON parse crash.',
            retryQuestion: {
              question: 'After adding `pm.response.to.have.status(200)` before `pm.response.json()`, the test still occasionally throws a JSON parse error — but only on a 200 response. What is now the likely cause?',
              options: [
                { id: 'a', text: 'The status check is broken and never actually runs' },
                { id: 'b', text: 'The server returned a 200 status but with a malformed or empty JSON body (e.g. an empty string), which is a different bug from the one the status check guards against' },
                { id: 'c', text: 'Postman cannot parse JSON on status 200' },
                { id: 'd', text: 'pm.response.json() only works on 4xx/5xx responses' },
              ],
              correct: 'b',
              explanation: 'The status-check guard specifically protects against the HTML-error-page case (server returns a non-200 with HTML). A 200 response with a genuinely malformed or empty JSON body is a separate bug entirely — likely a backend issue serializing the response — and needs its own diagnosis, typically by logging the raw response body (`pm.response.text()`) before attempting to parse it.',
            },
          },
        ],
      },

      // ── 7. INTERVIEW Q&A ────────────────────────────────────────────────
      {
        title: '💼 Interview Questions',
        blocks: [
          {
            type: 'simple-box',
            emoji: '💼',
            content: 'Postman interview questions follow the same layered structure as the tool itself: basic questions probe whether you understand the HTTP request-response cycle and can navigate the UI (the equivalent of asking a Java developer whether they know what a class is); intermediate questions test whether you can set up a real regression suite — environments, variable chaining, pre-request scripts — which is where most candidates fail because they have only used Postman for ad-hoc requests; advanced questions ask how you integrate Postman into a CI/CD pipeline with Newman, handle data-driven testing across hundreds of rows, and architect a collection that a team can co-own in Git. Why does the structure matter? Because interviewers at companies with mature QA pipelines are not looking for someone who can click "Send" — they want someone who understands that a Postman collection is a living contract document, and that every broken test in a Newman CI run is a broken promise to an API consumer. Prepare answers that connect each Postman feature to a real QA risk: not "collections organize requests" but "collections give us a single executable source of truth for API contracts, version-controlled alongside the application code, runnable on every PR without a QA engineer being present."',
          },
          {
            type: 'diagram-svg',
            title: 'Interview Lens: Read the Postman UI like an interviewer would',
            svg: uiMockupSvg,
          },
          {
            type: 'simple-box',
            emoji: '🧭',
            content: 'Think of the Postman UI as a flight cockpit divided into four instrument panels — and interviewers expect you to know which panel controls which system. Panel ① (Collections/Environments sidebar) is your navigation computer: it holds the route plan (collection structure), fuel presets (environment variables), and autopilot profiles (pre-request scripts). Panel ② (Method + URL + Send bar) is the throttle and heading selector: choosing GET vs POST is choosing whether to observe or to act — a distinction with real consequences in a live API. Panel ③ (Authorization / Headers / Body / Tests tabs) is the communication and sensor suite: auth is your transponder ID, headers are your radio frequencies, body is your payload manifest, and the Tests tab is your automated pre-landing checklist. Panel ④ (Response area) is your instrument readout: status code is altitude (200 = cruising, 5xx = stall warning), response time is airspeed, and the response body schema is your fuel gauge — if the shape changes unexpectedly, something has gone wrong upstream. In Java terms, Panels ③ and ④ together are equivalent to your test setup (given) and assertions (then) in a JUnit/REST Assured test — the difference is that in Postman they are visible to every team member without opening an IDE.',
          },
          pmInterviewApiVsUiFilm,
          pmInterviewStep,
          pmInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'postman-interview-en',
            topic: 'Postman & API Testing',
            questions: [
              { level: 'basic', q: "What is Postman and why do QA engineers use it?", a: "Postman is a GUI-based API testing platform for sending HTTP requests, inspecting responses, and writing automated test scripts without code. QA engineers use it for manual API testing, automated regression suites, environment management, and team sharing. Faster than Java/Python code for exploratory testing; collections automate via Newman in CI/CD." },
              { level: 'basic', q: "What is the difference between GET, POST, PUT, PATCH, and DELETE?", a: "GET reads without modifying — idempotent. POST creates — NOT idempotent. PUT replaces entirely. PATCH updates specified fields only. DELETE removes — idempotent. Always verify idempotency in tests." },
              { level: 'basic', q: "What is a Collection in Postman and why is it useful?", a: "Groups related requests with URL, method, headers, body, and test scripts. Run as a suite, export to Git, share with team. Think of it as a JUnit test class for HTTP requests." },
              { level: 'basic', q: "Which status codes do you assert in API tests?", a: "200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 500 Server Error. Always assert exact expected code." },
              { level: 'basic', q: "How do you add a JSON body to a POST request?", a: "Body tab → raw → select JSON from dropdown. Type the JSON object. Postman auto-adds Content-Type: application/json. For forms use form-data or x-www-form-urlencoded." },
              { level: 'intermediate', q: "How do you pass data between requests (request chaining)?", a: "Via environment variables and test scripts. In Request 1 Tests tab: pm.environment.set(\"userId\", body.id). Use {{userId}} in Request 2. Always assert success before extracting." },
              { level: 'intermediate', q: "What is Newman and how is it used in CI/CD?", a: "CLI runner for Postman collections. Install via npm. In CI/CD: export collection+env to Git, install Newman in pipeline, run collection. --reporter-junit generates XML for CI. Exits with code 1 on failure, failing the build automatically." },
              { level: 'intermediate', q: "Difference between environment, collection, and global variables?", a: "Global: whole workspace. Environment: current env only. Collection: one collection. Local: single request. Priority: Local wins over Environment over Collection over Global." },
              { level: 'intermediate', q: "How do you write a test checking a specific JSON field?", a: "Parse first: pm.response.json(). Then: .to.equal() exact, .to.include() partial, .to.be.a() type, .to.have.property() existence. Always wrap in pm.test() for named results." },
              { level: 'intermediate', q: "How do you handle endpoints with expiring auth tokens?", a: "Collection-level Pre-request Script checks expiry and refreshes: if (!expiry || Date.now() > expiry) pm.sendRequest to refresh endpoint, save new token. Runs before every request automatically." },
              { level: 'advanced', q: "How do you implement data-driven API testing in Postman?", a: "Use external CSV/JSON where each row is an iteration. pm.iterationData.get(\"field\") in scripts. Newman: --iteration-data data.csv. Test 100 scenarios without 100 separate requests." },
              { level: 'advanced', q: "What strategies ensure comprehensive API test coverage?", a: "Happy path, boundary testing, authorization matrix (no auth/wrong auth/insufficient/correct), schema validation, idempotency, informative error messages, performance assertions." },
              { level: 'advanced', q: "A dev says \"/users endpoint is changing to snake_case.\" How do you respond?", a: "Breaking change. Run collection immediately to document impact — all camelCase assertions fail. If frontend uses old names, escalate for versioning. If proceeding, update assertions, document in Git, create v1/v2 regression tests." },
              { level: 'advanced', q: "How do you design a Postman test suite for microservices?", a: "One workspace, one collection per service. Each with: collection-level token refresh, endpoint-grouped folders, env files per environment, smoke tests folder for deployment health, integration tests folder for cross-service flows. Store JSON files in tests/, run Newman in CI/CD on every merge." },
              { level: 'advanced', q: "How do you validate JSON schema in Postman?", a: "Use built-in tv4 validator. Define schema with required fields and types. pm.expect(tv4.validate(body, schema)).to.be.true catches renamed/removed fields immediately." },
              { level: 'basic', q: "How do you set a Bearer Token in Postman Authorization tab?", a: "Authorization tab → Type: Bearer Token → enter token value or {{authToken}} variable. Set at collection level so all requests inherit it — equivalent to setting a base header in RestAssured.given().header(\"Authorization\",\"Bearer \"+token)." },
              { level: 'basic', q: "What is Postman Console and when do you use it?", a: "Postman Console (Ctrl+Alt+C) shows console.log() output from scripts, full request/response headers, and network errors. Equivalent to System.out.println() in Java debugging. Essential for script debugging and variable chaining issues." },
              { level: 'basic', q: "What is the difference between Bearer Token, Basic Auth, and API Key?", a: "Bearer Token: JWT sent in Authorization header, time-limited. Basic Auth: Base64-encoded user:pass in Authorization header, simple but needs HTTPS. API Key: static key in header or query param for service-to-service. As QA, test all three plus missing/expired/wrong auth scenarios." },
              { level: 'basic', q: "What is the difference between pre-request and test scripts in Postman?", a: "Pre-request: runs BEFORE the request — token refresh, dynamic data prep, signing. Test script: runs AFTER response — pm.test() assertions, saving values for next request. Java analogy: pre-request = @BeforeEach, test script = @AfterEach/@Test." },
              { level: 'basic', q: "How do you make URLs dynamic at runtime in Postman?", a: "Use {{variableName}} in URLs: https://{{baseUrl}}/api/{{version}}/users/{{userId}}. Resolved from active Environment at runtime. Same collection runs on dev/staging/prod by switching environments — zero code change." },
              { level: 'basic', q: "Why is response time testing important and how is it done in Postman?", a: "API SLAs specify max response times. Assert in Postman: pm.expect(pm.response.responseTime).to.be.below(200). Detects performance regressions — if endpoint slows from 80ms to 400ms after a code change, this test fails in CI." },
              { level: 'basic', q: "When do you need to manually add Content-Type header in Postman?", a: "Postman auto-adds Content-Type when you select raw→JSON or form-data. Add manually when: API expects XML (application/xml), or you get 415 Unsupported Media Type. Always verify in Headers tab what is actually being sent." },
              { level: 'basic', q: "What steps do you follow when testing an API endpoint for the first time?", a: "Check Swagger docs, create request, test happy path (200/201), validate schema, test negative cases (400/401/403/422), test edge cases (empty/null/max-length), write assertions, save to collection." },
              { level: 'intermediate', q: "How do you test OAuth2 flow in Postman?", a: "Manual: POST /oauth/token with credentials, save access_token via pm.environment.set(). Automatic: Authorization → OAuth2 → \"Get New Access Token\". Test: invalid credentials, expired token refresh, scope restrictions, token revocation." },
              { level: 'intermediate', q: "What is Postman Mock Server and how is it used for frontend testing?", a: "Creates fake API endpoints using saved Examples in collections. Frontend hits the mock URL and gets predefined responses. Unblocks frontend development before backend is ready. Equivalent to WireMock in Java testing." },
              { level: 'intermediate', q: "How do you organize negative test scenarios in Postman?", a: "Create folders: \"Happy Path\", \"Negative Tests\", \"Edge Cases\". Each negative case is a separate request with a descriptive name showing input and expected status. Assert exact error codes. Descriptive naming is crucial for maintainability." },
              { level: 'intermediate', q: "What does the iteration count do in Collection Runner?", a: "Sets how many times the collection repeats. Combined with CSV data file: each iteration uses one row = data-driven testing. With 100-row CSV and 100 iterations → 100 different test scenarios. Equivalent to @ParameterizedTest in JUnit 5." },
              { level: 'intermediate', q: "When do you use form-data vs raw JSON in Postman POST requests?", a: "form-data: HTML forms and file uploads. x-www-form-urlencoded: legacy APIs with URL-encoded params. raw→JSON: modern REST APIs. raw→XML: SOAP or XML REST. Check Swagger requestBody content-type to choose correctly." },
              { level: 'intermediate', q: "What do you do when you get CORS or SSL errors in Postman?", a: "CORS errors: only affect browser-based Postman. Use desktop app. SSL errors: Settings → disable SSL verification (test only, never production). Or import CA cert into Postman. Like configuring trustStore in Java HttpClient." },
              { level: 'intermediate', q: "What is the best way to share a Postman collection with multiple team members?", a: "Best: Postman Workspace for real-time sharing + Git for version control and CI/CD. Export collection JSON to repo, team imports. \"Run in Postman\" link for public sharing. Workspace = immediate sync; Git = auditability and PR review." },
              { level: 'intermediate', q: "How do you access nested JSON in Postman response body?", a: "pm.response.json() parses to JS object. Dot notation: body.user.address.city. Array index: body.items[0].price. Optional chaining for safety: body?.user?.city. Equivalent to JSONPath or Jackson nested field access in Java." },
              { level: 'intermediate', q: "What causes flaky tests in Postman test suites?", a: "Race conditions (fix: add delay between requests), stale environment variables (fix: clear at collection start), test data conflicts (fix: use dynamic unique data like Date.now()), network timeouts (fix: increase timeout in settings)." },
              { level: 'intermediate', q: "How do you generate HTML reports with Newman and archive them in CI?", a: "npm install -g newman-reporter-htmlextra. Run: newman run ... -r cli,htmlextra,junit. In GitHub Actions use \"Upload Artifact\" to archive report.html. In Jenkins use \"Publish HTML Reports\" plugin." },
              { level: 'advanced', q: "How do you implement contract testing with Postman?", a: "Define schema from OpenAPI spec, validate every response with tv4. Run in CI: if producer removes/renames a field, consumer collection fails immediately. Alternative to dedicated tools like Pact, implementable directly in Postman." },
              { level: 'advanced', q: "How do you version and manage changes to Postman collections?", a: "Store collection.json in tests/postman/ in Git. PR-based changes for review and revert. Feature branches for new endpoints. Use Postman Forks for parallel v1/v2 maintenance. Semantic versioning in collection name. Description field as CHANGELOG." },
              { level: 'advanced', q: "How do you run Postman tests in a Kubernetes or Docker environment?", a: "Use postman/newman Docker image. Mount collection files as volumes. In Kubernetes use Job manifest. Benefits: isolation, clean environment per run, parallel execution across environments. Manage secrets via Kubernetes Secrets or Vault." },
              { level: 'advanced', q: "Can you do performance/load testing with Postman?", a: "Postman supports response time assertions but is not designed for load testing. Run Newman in parallel for basic concurrency. For real load testing use JMeter, Gatling, k6 (k6 can import Postman collections). Postman = exploratory; JMeter = load testing." },
              { level: 'advanced', q: "How do you perform API security testing in Postman?", a: "Auth bypass (no token→401, wrong user token→403), injection attacks in body fields, IDOR testing, rate limiting verification (429), mass assignment checks. For deep security testing use OWASP ZAP or Burp Suite alongside Postman." },
              { level: 'advanced', q: "How do you maintain Postman test suites in large teams?", a: "Naming convention for every request, folder structure per microservice, collection-level scripts for shared setup, PR-based review via Git, quarterly cleanup, onboarding docs in collection description, nightly CI baseline run." },
              { level: 'advanced', q: "How do you set up API monitoring in Postman?", a: "Postman Monitors run collections on schedules (5 min, hourly). Set email/Slack alerts for failures. Use for production health checks, critical user journey verification, SLA monitoring. Free tier limited; alternative: schedule Newman via cron job on own infrastructure." },
              { level: 'advanced', q: "How do you test GraphQL APIs in Postman?", a: "Body → GraphQL tab. Postman auto-loads schema via introspection. Autocomplete works. Test queries and mutations. Important: GraphQL always returns 200 — check body.errors is undefined. pm.expect(body.errors).to.be.undefined for error validation." },
              { level: 'basic', q: "What is the Params tab used for in Postman?", a: "Manages URL query parameters as key-value pairs. Add Key=page, Value=2 instead of typing ?page=2&limit=10 manually. Uncheck parameters to disable them. Path params (:userId) go directly in the URL. Equivalent to .queryParam() in RestAssured." },
              { level: 'basic', q: "What should you pay attention to when saving a request in Postman?", a: "Use descriptive names, save to correct folder, fill Description with business context, use {{variables}} instead of hardcoded secrets, keep template body clean for reuse. Verify the request appears under the correct collection after saving." },
              { level: 'basic', q: "What information does the pm.response object provide?", a: "pm.response.code (status code), .status (status text), .responseTime (ms), .headers (all headers), .json() (parsed body), .text() (raw body), .size() (byte size). Equivalent to response.getStatusCode()/.getTime()/.getHeader() in RestAssured." },
              { level: 'intermediate', q: "How do you test multiple environments simultaneously in Postman?", a: "GUI only runs one env at a time. Use Newman in parallel: run with different -e env.json files simultaneously. In CI/CD use matrix strategy for parallel jobs per environment. Separate report files per env for isolated results." },
              { level: 'intermediate', q: "How do you make your API test suite run faster?", a: "Parallel Newman runs, independent test group separation, minimize assertions per test, use mocks for slow external services, remove unnecessary delays, split into smoke vs full regression suites." },
              { level: 'intermediate', q: "How do you prepare test data before running tests in Postman?", a: "Setup via collection-level pre-request (create test user, save ID to env var) or data files (CSV/JSON). Teardown: last request deletes created data. Keep test env clean to prevent parallel test interference. Equivalent to @BeforeClass in Java." },
              { level: 'intermediate', q: "How do you assert response headers in Postman?", a: "pm.response.headers.get(\"Content-Type\"). Assert CORS headers, Cache-Control, security headers (X-Content-Type-Options, X-Frame-Options, HSTS). Critical for API security testing. Equivalent to .then().header() in RestAssured." },
              { level: 'advanced', q: "How do you import an OpenAPI/Swagger spec into Postman and what are the benefits?", a: "File → Import swagger.json/yaml. Postman auto-generates all endpoints as collection. Benefits: zero manual setup, body schemas from spec, re-import on spec changes. Disadvantage: no test scripts auto-generated. Workflow: dev updates swagger → QA imports → adds assertions → CI runs." },
              { level: 'advanced', q: "How do you implement a retry mechanism in Postman?", a: "No built-in retry, implement via pre-request script: track retryCount in env var, if response code is wrong and count < 3, increment count and use postman.setNextRequest() to re-run. Always set max retry limit. Equivalent to @RetryingTest or Awaitility in Java." },
            ],
          },
          {
            type: 'glossary-section',
            terms: [
              { term: 'API', definition: { tr: 'Application Programming Interface — uygulamalar arası iletişim sözleşmesi.', en: 'Application Programming Interface — a contract between applications.' } },
              { term: 'REST', definition: { tr: 'HTTP üzerinden çalışan durumsuz API mimarisi. En yaygın stil.', en: 'Stateless API architecture over HTTP. The most common API style today.' } },
              { term: 'Collection', definition: { tr: 'İlişkili isteklerin grubu. Export edilebilir, Git\'e eklenebilir, Newman ile çalıştırılabilir.', en: 'Group of related requests. Exportable, version-controllable, runnable with Newman.' } },
              { term: 'Environment', definition: { tr: 'Ortam bazlı değişkenler (dev/staging/prod). Değiştirince tüm istekler güncellenir.', en: 'Holds environment-specific variables. Switching updates all requests automatically.' } },
              { term: 'pm.test()', definition: { tr: 'Test assertion fonksiyonu. Test adı + assertion içerir.', en: 'Test assertion function. Contains test name and assertion logic.' } },
              { term: 'pm.expect()', definition: { tr: 'Chai tabanlı değer doğrulama. .to.equal(), .include(), .be.a() destekler.', en: 'Chai-based value assertion. Supports .to.equal(), .include(), .be.a() etc.' } },
              { term: 'Newman', definition: { tr: 'Koleksiyonları CLI\'dan çalıştırır. CI/CD entegrasyonu için zorunlu.', en: 'CLI runner for collections. Essential for CI/CD integration.' } },
              { term: 'Pre-request Script', definition: { tr: 'İstek gönderilmeden önce çalışan JavaScript. Token yenileme veya dinamik değer üretme için.', en: 'JavaScript that runs before a request. Used for token refresh or dynamic value generation.' } },
              { term: 'Bearer Token', definition: { tr: 'Authorization: Bearer <token> formatında JWT. Authorization başlığında taşınır.', en: 'JWT sent as Authorization: Bearer <token>.' } },
              { term: 'ECONNREFUSED', definition: { tr: 'Sunucu çalışmıyor veya yanlış port. Sunucunun ayakta olduğunu kontrol et.', en: 'Server not running or wrong port. Verify the server is up.' } },
            ],
          },
        ],
      },
    ],
  },

  tr: {
    hero: {
      title: '📮 Postman',
      subtitle: 'API Test ve İşbirliği Platformu',
      intro: 'Sıfırdan mülakat seviyesine Postman uzmanlığı. İstek göndermeyi, otomatik test yazmayı, ortamları yönetmeyi, Newman ile CI/CD\'ye entegre etmeyi gerçek QA senaryolarıyla öğren.',
    },
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Temel Kavramlar', '🔥 Test Otomasyonu', '🛠️ Gerçek Hayat', '🔗 Ekosistem', '🚨 Yaygın Hatalar', '💼 Mülakat Q&A'],
    sections: [
      // ── 0. GİRİŞ ─────────────────────────────────────────────────────────
      {
        title: '🎯 Postman ve API Testi Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📱',
            content: 'Postman, API\'ler için evrensel bir telefon santralı gibi çalışır: her ofise (tarayıcıda UI açıp tıklayarak) bizzat gitmen yerine tek bir ahizeden herhangi bir departmanı arayabilirsin — "Ürün listesini GET ile ver", "Bu siparişi POST et", "Şu kullanıcıyı DELETE et." Ahize PIN\'ini (auth token) hatırlıyor, hız arama listeni (collection) saklıyor ve her aramadan sonra otomatik geri arama kontrolü yapıyor (test scripts). Ama şunu sormak gerekir: geliştirici zaten curl ve Java HttpClient kullanıyorken neden QA mühendisinin ayrı bir araca ihtiyacı olsun? Çünkü curl tek yönlüdür — istek gönderir ama assertion katmanı, environment geçişi ve CI export özelliği yoktur. Java terimleriyle söylersek Postman sadece bir HttpClient değildir; tek satır kod yazmadan HttpClient + JUnit assertion\'ları + TestNG suite runner + Maven build raporu içeren her şeyi bir arada sunar. QA pratiğinde bu muazzam bir fark yaratır: bir backend endpoint\'i sprint\'ler arasında sessizce response formatını değiştirdiğinde, Newman üzerinden CI\'a bağlı Postman collection\'ı bu regresyonu pipeline\'da yakalar — frontend ekibi uygulamasının bozulduğunu fark etmeden önce.',
          },
          { type: 'heading', text: 'API Nedir?' },
          { type: 'text', content: 'API (Application Programming Interface), bir istemci (uygulaman, tarayıcın veya test aracın) ile sunucu arasındaki sözleşmedir. Sunucunun hangi istekleri kabul ettiğini, hangi veriyi beklediğini ve ne döndürdüğünü tanımlar. Hava durumu uygulaması, ödeme sistemi, sosyal medya — tüm modern uygulamalar arka planda API\'ler üzerinden çalışır.' },
          {
            type: 'diagram-svg',
            title: 'HTTP İstek-Yanıt Döngüsü',
            svg: httpFlowSvg,
          },
          { type: 'heading', text: 'Postman Nedir?' },
          { type: 'text', content: 'Postman, HTTP istekleri oluşturmak, göndermek ve doğrulamak için ücretsiz bir GUI platformudur. QA mühendisleri API\'leri manuel test etmek, otomatik regresyon süitleri yazmak, ortam yönetimi yapmak ve test koleksiyonlarını ekiple paylaşmak için kullanır.' },
          {
            type: 'grid', cols: 3,
            items: [
              { icon: '🖱️', label: 'Kod Gerekmez', desc: 'Tıklama ile istek oluştur ve gönder — keşif API testleri için idealdir.' },
              { icon: '📁', label: 'Koleksiyonlar', desc: 'İlgili istekleri grupla, JSON olarak export et, Git\'te versiyonla.' },
              { icon: '🌍', label: 'Ortamlar', desc: 'Tek tıkla dev/staging/prod arası geçiş — değişkenler her şeyi halleder.' },
              { icon: '🤖', label: 'Test Scriptleri', desc: 'Her istekten sonra otomatik çalışan JavaScript assertion\'ları yaz.' },
              { icon: '⚡', label: 'Newman CLI', desc: 'Komut satırından tüm koleksiyonları çalıştır — CI/CD için mükemmel.' },
              { icon: '🔗', label: 'Mock Sunucular', desc: 'Backend hazır olmadan frontend\'i kaldırmak için sahte API endpoint\'leri oluştur.' },
            ],
          },
          { type: 'heading', text: 'HTTP Metodları — Temel Kelime Hazinesi' },
          {
            type: 'table',
            headers: ['Metot', 'Eylem', 'Body?', 'Örnek', 'SQL Karşılığı'],
            rows: [
              ['GET', 'Veri oku', '❌', 'GET /users/42', 'SELECT * WHERE id=42'],
              ['POST', 'Yeni kaynak oluştur', '✅', 'POST /users', 'INSERT INTO users'],
              ['PUT', 'Tüm kaynağı değiştir', '✅', 'PUT /users/42', 'UPDATE (tam değiştirme)'],
              ['PATCH', 'Belirli alanları güncelle', '✅', 'PATCH /users/42', 'UPDATE SET name=...'],
              ['DELETE', 'Kaynağı sil', '❌', 'DELETE /users/42', 'DELETE WHERE id=42'],
            ],
          },
          {
            type: 'simulation',
            icon: '📮',
            color: '#f97316',
            title: { tr: 'HTTP İstek-Yanıt Döngüsü — Canlı Simülasyon', en: 'HTTP Request-Response Cycle — Live Simulation' },
            scenario: 'api-request',
            description: {
              tr: '"Send" butonuna tıkla: GET isteğinin sunucuya yolculuğunu, sunucunun işleyişini ve Postman test assertion\'larının çalışmasını adım adım izle.',
              en: 'Click "Send": watch the GET request travel to the server, the server process it, and Postman test assertions run — step by step.',
            },
            code: `// Postman Test Script (Tests sekmesi)
// Bu kod her istekten sonra otomatik çalışır

pm.test("Status 200 OK", () => {
  pm.response.to.have.status(200);
});

pm.test("Response time < 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("User id correct", () => {
  const body = pm.response.json();
  pm.expect(body.id).to.eql(42);
});

pm.test("Status is active", () => {
  const body = pm.response.json();
  pm.expect(body.status).to.eql("active");
});`,
            language: 'javascript',
          },
          { type: 'heading', text: 'HTTP Durum Kodları' },
          {
            type: 'visual', variant: 'pyramid',
            title: 'HTTP Durum Kodu Grupları',
            levels: [
              { label: '5xx — Sunucu Hatası', color: 'red', desc: '500 Internal Server Error · 503 Service Unavailable' },
              { label: '4xx — İstemci Hatası', color: 'orange', desc: '400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found' },
              { label: '3xx — Yönlendirme', color: 'yellow', desc: '301 Moved Permanently · 302 Found' },
              { label: '2xx — Başarı', color: 'green', desc: '200 OK · 201 Created · 204 No Content' },
              { label: '1xx — Bilgilendirme', color: 'blue', desc: '100 Continue · 101 Switching Protocols' },
            ],
            note: '2xx = geçti. 4xx = test verim/auth hatalı. 5xx = sunucu hatası (geliştirici ekibine eskalasyon yap).',
          },
          pmRequestCycleFilm,
          pmMethodSemanticsStep,
          pmMethodSemanticsPractice,
          {
            type: 'quiz',
            question: 'POST /api/login isteği 401 durumu döndürdü. Bu ne anlama gelir?',
            options: [
              { id: 'a', text: 'Sunucu çöktü — hemen eskalasyon yap' },
              { id: 'b', text: 'Yetkisiz — yanlış kimlik bilgileri veya eksik token' },
              { id: 'c', text: 'Başarılı — kullanıcı oturum açtı' },
              { id: 'd', text: 'Endpoint bulunamadı — URL\'yi düzelt' },
            ],
            correct: 'b',
            explanation: '401 Unauthorized, isteğin sunucuya ulaştığını ama kimlik doğrulamanın başarısız olduğunu gösterir. 4xx = istemci tarafı sorun. 500 = sunucu hatası. 404 = bulunamadı. 200/201 = başarı.',
          
        retryQuestion: {
      "question": {
            "tr": "GET /api/profile isteği 403 Forbidden hatası verdi. Bu durum neyi ifade eder?",
            "en": "The GET /api/profile request returned a 403 Forbidden status. What does this mean?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sunucu şu an bakımda",
                        "en": "The server is currently under maintenance"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Sunucu kimlik doğrulamayı kabul etti ancak erişim izniniz yok",
                        "en": "The server understood the authentication, but you do not have permission to access the resource"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "İstek zaman aşımına uğradı",
                        "en": "The request timed out"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "URL adresi yanlış yazılmış",
                        "en": "The URL address is typed incorrectly"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "403 Forbidden, kullanıcının kimliği doğrulanmış olsa bile, istenen kaynağa erişmek için yeterli yetkiye sahip olmadığını gösterir. 401 kimlik eksikliği, 403 ise yetersiz yetki demektir.",
            "en": "403 Forbidden means that even if the user is authenticated, they do not have the necessary permissions to access the specific resource. 401 means missing credentials, while 403 means insufficient privileges."
      }
}
},
        ],
      },

      // ── 1. KURULUM ────────────────────────────────────────────────────────
      {
        title: '📦 Kurulum ve İlk İstek',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔧',
            content: 'Postman kurmak, birinci gün tam donanımlı bir QA tezgahı kuruyormuşsun gibidir: her çekmece zaten etiketlenmiş (GET, POST, PUT, DELETE), her kelepçe hazır takılı (auth header\'lar, environment variable\'lar), her ölçüm aleti kullanıma hazır (test assertion\'ları). Bunu bir Java REST test framework\'ü kurmakla karşılaştır — ilk günü pom.xml bağımlılıklarıyla, BaseTest sınıfıyla ve Jackson konfigürasyonuyla boğuşarak geçirirsin, tek bir istek göndermeden önce. Ama daha derin soruyu soralım: ekip zaten curl script\'leri ve Java HttpClient wrapper\'ı kullanıyorsa neden Postman\'a zaman yatırsın? Çünkü ne curl script\'leri ne de ham HttpClient şunları sağlar: kolaboratif authoring için bir GUI, dev/staging/prod arasında tek tıkla environment geçişi veya Newman\'ın CI pipeline\'ında başsız çalıştırabileceği bir format. QA açısından Git\'e commit edilmiş bir Postman collection, Java bilgisi olmayan her mühendis tarafından çalıştırılabilir, değiştirilebilir ve incelenebilir canlı bir regresyon suite\'idir. Kurulum maliyeti 2 dakika; getirisi ise production\'a ulaşmadan bozuk sözleşmeleri yakalayan, paylaşılabilir, çalıştırılabilir bir API spesifikasyonudur.',
          },
          { type: 'heading', text: 'Postman\'ı İndirmek' },
          {
            type: 'installation',
            title: 'Postman Kurulumu',
            steps: [
              { cmd: '1. postman.com/downloads adresine git', explanation: 'Postman bireysel kullanım için ücretsiz. Windows, macOS veya Linux için masaüstü uygulamasını indir. app.getpostman.com\'da web versiyonu da var — kurulum gerekmez.' },
              { cmd: '2. Kurulum dosyasını çalıştır', explanation: 'Windows: PostmanSetup.exe. macOS: Postman.app\'i Applications\'a sürükle. Linux: .tar.gz veya AppImage kullan. 2 dakikadan az sürer.' },
              { cmd: '3. Giriş yap veya atla', explanation: 'Ücretsiz hesap, koleksiyonları cihazlar arasında senkronize eder ve ekip paylaşımını sağlar. Giriş ekranını kapatarak atlanabilir.' },
              { cmd: '4. Hazırsın!', explanation: '+ sekmesine tıkla ve ilk isteğini oluştur. Config dosyası yok, CLI kurulumu yok.' },
            ],
          },
          { type: 'heading', text: 'Postman Arayüzüne Genel Bakış' },
          {
            type: 'diagram-svg',
            title: 'Postman UI — Temel Alanlar (etiketli)',
            svg: uiMockupSvg,
          },
          { type: 'heading', text: 'İlk GET İsteği — Adım Adım' },
          {
            type: 'steps',
            items: [
              { label: '"+" sekmesine tıkla', desc: 'Yeni bir istek sekmesi açılır.' },
              { label: 'Metot: GET seç', desc: 'Sol taraftaki dropdown\'a tıkla (varsayılan zaten GET).' },
              { label: 'URL gir', desc: 'https://jsonplaceholder.typicode.com/users — ücretsiz test API\'si.' },
              { label: 'Send\'e tıkla', desc: 'Postman isteği gönderir ve yanıtı aşağıda gösterir.' },
              { label: 'Yanıtı oku', desc: 'JSON formatında 10 kullanıcı görmelisin. Durum: "200 OK".' },
            ],
          },
          {
            type: 'code',
            language: 'json',
            label: 'Beklenen Yanıt (ilk kullanıcı):',
            code: `{
  "id": 1,                            // Benzersiz kullanıcı ID
  "name": "Leanne Graham",            // Tam ad
  "username": "Bret",                 // Kullanıcı adı
  "email": "Sincere@april.biz",       // E-posta
  "phone": "1-770-736-0988",          // Telefon
  "website": "hildegard.org",         // Web sitesi
  "address": {                        // İç içe nesne
    "street": "Kulas Light",
    "city": "Gwenborough",
    "zipcode": "92998-3874"
  }
}`,
            expected: 'Durum: 200 OK | JSON dizisi olarak 10 kullanıcı döner',
          },
          pmGetRequestStep,
          { type: 'heading', text: 'POST İsteği Yapmak' },
          {
            type: 'code',
            language: 'json',
            label: 'POST /api/users — Body → raw → JSON:',
            code: `{
  "name": "Ayşe Kaya",          // Zorunlu: tam ad
  "email": "ayse@test.com",     // Zorunlu: benzersiz olmalı
  "role": "tester",             // Opsiyonel
  "active": true                // Boolean
}`,
          },
          {
            type: 'code',
            language: 'json',
            label: 'Beklenen Yanıt — 201 Created:',
            code: `{
  "id": 99,                          // Sunucu tarafından üretilen ID
  "name": "Ayşe Kaya",               // Geri döndürüldü
  "email": "ayse@test.com",          // Geri döndürüldü
  "createdAt": "2024-01-15T10:30:00Z" // Sunucu zaman damgası
}`,
          },
          pmPostRequestStep,
          pmFirstRequestFilm,
          pmEnvSetupStep,
          pmEnvSetupPractice,
          {
            type: 'quiz',
            question: 'POST /api/users gönderdin ve sunucu 201 döndürdü. QA test uzmanı olarak bundan sonra ne doğrulamalısın?',
            options: [
              { id: 'a', text: 'Hiçbir şey — 201 başarı demek, bitti' },
              { id: 'b', text: 'Yanıt body\'nin oluşturulan kullanıcıyı içerdiğini doğrula, ardından GET ile kaydın kalıcı olup olmadığını kontrol et' },
              { id: 'c', text: 'Test başarısız — POST 200 dönmeli, 201 değil' },
              { id: 'd', text: 'Hata bildir — 201 geçerli bir durum kodu değil' },
            ],
            correct: 'b',
            explanation: '201 Created, başarılı POST için doğru durum kodudur. İyi QA pratiği: 1) Yanıt body\'sini doğrula, 2) GET ile kaydın gerçekten oluşturulduğunu teyit et. 200 güncelleme içindir, 201 kaynak oluşturma içindir.',
          
        retryQuestion: {
      "question": {
            "tr": "PUT /api/settings isteğini gönderdiniz ve 200 OK yanıtı aldınız. Bir QA uzmanı olarak, bu işlemin gerçekten başarılı olduğunu nasıl doğrularsınız?",
            "en": "You sent a PUT /api/settings request and received a 200 OK response. As a QA, how do you verify that this update was truly successful?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Yanıt kodunun 200 olduğunu görmek yeterlidir",
                        "en": "Seeing the 200 status code is sufficient"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Yapılan değişikliği yansıtan güncel değerleri almak için bir GET isteği yaparak durumu kontrol etmelisiniz",
                        "en": "You should perform a GET request to retrieve the updated values and verify the changes persisted"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Veritabanına manuel giriş yaparak kontrol etmelisiniz",
                        "en": "You must manually log into the database to check"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "İsteği 3 kez tekrar göndererek tutarlılığı test etmelisiniz",
                        "en": "You should send the request 3 times to test consistency"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "200 OK, isteğin başarıyla işlendiğini belirtir ancak sistemin durumu gerçekten değiştirdiğini doğrulamak için GET isteği ile güncel durumu çekmek en güvenilir yöntemdir.",
            "en": "200 OK indicates the request was processed successfully, but to verify that the system state actually changed, performing a GET request to fetch the current state is the most reliable validation method."
      }
}
},
        ],
      },

      // ── 2. TEMEL KAVRAMLAR ────────────────────────────────────────────────
      {
        title: '📚 Collections, Variables ve Microservisler',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏙️',
            content: 'Dört bağımsız depoya sahip büyük bir lojistik merkezi hayal et: Güvenlik (Auth), İK (Users), Lojistik (Orders), Finans (Payments). Her depo biraz farklı bir dil konuşuyor, kendi bina kartına (auth token) sahip ve kendi yükleme rıhtımı URL\'i var. Koordinasyon katmanı olmadan bir QA mühendisi binalar arasında koşmak, her kapıda kodu yeniden girmek ve adresleri kağıda yazmak zorunda kalır — bu microservislerde manuel API testidir. Postman Collections, merkezin ana sevkiyat sistemidir: tek kontrol paneli, her deployment için bir environment dosyası (dev/staging/prod) ve her token ile base URL {{variable}}\'lar aracılığıyla otomatik enjekte edilir. Ama her Java geliştiricisinin sorduğu soru şudur: "Zaten TestNG test sınıflarım ve paylaşımlı bir BaseTest\'im var — bunu neden kodlamıyoruz?" Çünkü Postman, Java test koduyla önemli miktarda ek çalışma yapılmadan sağlanamayan bir şeyi yapıyor: teknik olmayan bir QA mühendisinin tüm environment\'ı tek açılır menü tıklamasıyla değiştirmesine, 1. İstek\'teki login token\'ını doğrudan 2. İstek\'in Authorization header\'ına aktarmasına ve compile adımı olmadan Newman\'ın CI\'da çalıştırabileceği bir format olarak tüm suite\'i dışa aktarmasına olanak tanıyor. Hatalı bir baseUrl veya bayat token\'ın tüm sipariş akışının sessizce başarısız olmasına yol açtığı production ortamlarında, bu environment geçişi hassasiyeti; bozuk bir microservis sözleşmesini pipeline\'da yakalamak ile bunu müşterinin başarısız checkout\'unda keşfetmek arasındaki farktır.',
          },
          { type: 'heading', text: 'Microservisler — Postman Collections Neden Şart?' },
          { type: 'text', content: 'Microservis mimarisinde her servis kendi URL\'inde yaşar, kendi auth\'una sahiptir. Auth (:3001), User (:3002), Order (:3003), Payment (:3004) — her biri farklı base URL. Manuel test etmek URL değiştirmeyi, token güncellemeyi ve base adresleri yönetmeyi gerektirir. Collections + Environment\'lar bu kaosa son verir: tek collection, dört environment dosyası — tek tıkla geçiş. {{baseUrl}}, {{authToken}}, {{userId}} gibi variable\'lar veriyi request\'ler arasında otomatik taşır.' },
          {
            type: 'diagram-svg',
            title: 'Microservis Mimarisi — Postman ile 4 Servis (Animasyonlu)',
            svg: microservicesSvg,
          },
          { type: 'heading', text: 'Variable Oluşturma — Yöntem 1: Environment Arayüzü' },
          { type: 'text', content: 'Environment\'lar, bir deployment bağlamına özel key-value çiftleri tutar. Her context için bir tane oluştur (dev, staging, prod). {{baseUrl}} kullanan her request, environment değiştirilince otomatik güncellenir — 20 request\'i tek tek düzenlemeye gerek yok.' },
          {
            type: 'steps',
            items: [
              { label: '🌍 Environments ikonuna tıkla (sol sidebar)', desc: 'Environments paneli açılır.' },
              { label: '"+ Create environment" tıkla', desc: '"microservices-dev" olarak adlandır.' },
              { label: 'Satır ekle: Variable = baseUrl, Initial Value = https://dev.api.company.com', desc: 'İlk boş satıra tıkla ve yaz. Initial value şablon; current value runtime\'da değiştirilebilir.' },
              { label: 'authToken ekle — boş bırak', desc: 'POST /login test script\'i çalışıp token alınca bu variable otomatik dolar.' },
              { label: 'userId, orderId ekle — boş bırak', desc: 'E2E akış ilerledikçe pm.environment.set() ile otomatik atanır.' },
              { label: '"Save" → sağ üst dropdown\'dan seç', desc: 'Her request\'teki {{variable\'lar}} artık bu environment\'ın değerleriyle çözümlenir.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Environment Editor — Variable\'lar Oluşturuluyor (Animasyonlu)',
            svg: varCreateSvg,
          },
          { type: 'heading', text: 'Variable Oluşturma — Yöntem 2: Script ile (pm.environment.set)' },
          { type: 'text', content: 'pm.environment.set() metodunu Tests sekmesindeki script\'te kullanarak çalışma sırasında variable\'ı dinamik olarak ata. Request chaining böyle çalışır: POST /login token kaydeder, sonraki tüm request\'ler {{authToken}} variable\'ını otomatik kullanır. Java analogisi: tüm test sınıflarının okuyabildiği paylaşılan bir Properties nesnesine yazmak gibi.' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Tests sekmesi — yanıt değerlerini ortam değişkenlerine kaydet:',
            code: `// ── İstek 1: POST /auth/login ───────────────────────────
pm.test("Giris basarili", () => pm.response.to.have.status(200));
const auth = pm.response.json();
pm.environment.set("authToken", auth.token);       // → {{authToken}}
pm.environment.set("tokenExpiry", Date.now() + 3600000);

// ── İstek 2: POST /users (User Service) ──────────────
pm.test("Kullanici olusturuldu 201", () => pm.response.to.have.status(201));
const user = pm.response.json();
pm.environment.set("userId", user.id);             // → {{userId}}

// ── İstek 3: GET /users/{{userId}} ───────────────────
// URL bar: {{baseUrl}}/users/{{userId}}   → cozumlenir: .../users/42
// Header:  Authorization: Bearer {{authToken}}

// ── İstek 4: POST /orders (Order Service) ────────────
pm.test("Siparis olusturuldu 201", () => pm.response.to.have.status(201));
const order = pm.response.json();
pm.environment.set("orderId", order.id);           // → {{orderId}}

// ── İstek 5: POST /payments (Payment Service) ────────
// Body: { "orderId": "{{orderId}}", "userId": "{{userId}}" }`,
          },
          pmEnvVarChainStep,
          { type: 'heading', text: 'Variable Oluşturma — Yöntem 3: Collection Variables' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Collection variables — tüm environment\'larda sabit paylaşılan değerler:',
            code: `// Koleksiyon değişkenleri: Koleksiyona sag tikla → Edit → Variables sekmesi
// Ya da script ile — tüm koleksiyon boyunca kalıcı:

pm.collectionVariables.set("apiVersion", "v1");    // {{apiVersion}}
pm.collectionVariables.set("pageSize", "20");      // {{pageSize}}

// URL barında:
// {{baseUrl}}/api/{{apiVersion}}/users?limit={{pageSize}}
// → cozumlenir: https://dev.api.company.com/api/v1/users?limit=20

// Hangisini ne zaman kullan:
// pm.globals.set()             → tum workspace (API key, paylasilan sabit)
// pm.environment.set()         → ortama gore degisir (baseUrl, token, dinamik ID)
// pm.collectionVariables.set() → koleksiyonda sabit (apiVersion, pageSize)
// pm.variables.set()           → yalnizca tek istek (gecici hesaplama, sonra silinir)`,
          },
          pmCollectionVarsStep,
          { type: 'heading', text: 'Koleksiyon Oluşturma — Adım Adım' },
          { type: 'text', content: 'Her microservis için ayrı Collection, önerilen QA yaklaşımıdır. Auth Service Collection\'ıyla başla — login çalışıp token environment variable\'ına kaydedilince, diğer tüm servisler bu token\'ı miras alır.' },
          {
            type: 'steps',
            items: [
              { label: '"New" → "Collection" tıkla (ya da sidebar\'daki "+" ikonu)', desc: 'Yeni boş Collection oluşur.' },
              { label: '"Auth Service Tests" olarak adlandır', desc: 'Bu Collection\'ın neyi kapsadığını açıklayan bir description ekle.' },
              { label: 'Collection\'a sağ tıkla → "Add folder"', desc: '"Auth Flows", "Token Refresh", "Negative Tests" klasörlerini oluştur.' },
              { label: 'Klasörün içinde "Add request" tıkla', desc: '"POST /login — geçerli kimlik" adını ver. Method, URL, body ve Tests script\'ini ayarla.' },
              { label: 'Ctrl+S ile kaydet', desc: 'Request Collection\'a kalıcı kaydedildi. Bir daha yazmana gerek yok.' },
              { label: 'Her servis için tekrarla', desc: 'User Service → Order Service → Payment Service Collection\'larını oluştur.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Collection Hiyerarşisi — Microservis Yapısı',
            svg: collectionHierarchySvg,
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'Microservisler için önerilen koleksiyon klasör yapısı:',
            code: `// Workspace
// ├── 📁 Auth Service Testleri
// │   ├── 📂 Auth Akislari
// │   │   ├── POST /login — gecerli kimlik          → 200 + authToken kaydet
// │   │   ├── POST /login — yanlis sifre            → 401 beklenir
// │   │   └── POST /refresh — suresi dolmus token   → 200 + yeni authToken
// │   └── 📂 Negatif Testler
// │       └── POST /login — eksik alanlar           → 400 beklenir
// │
// ├── 📁 User Service Testleri
// │   ├── 📂 CRUD
// │   │   ├── POST /users — kullanici olustur       → 201 + userId kaydet
// │   │   ├── GET /users/{{userId}}                 → 200 + ad/email kontrol
// │   │   └── DELETE /users/{{userId}}              → 204 beklenir
// │   └── 📂 Dogrulama
// │       └── POST /users — ayni e-posta            → 409 Conflict
// │
// ├── 📁 Order Service Testleri
// │   └── POST /orders — siparis olustur           → 201 + orderId kaydet
// │
// └── 📁 Payment Service Testleri
//     └── POST /payments — odemeyi isle            → 201 Created`,
          },
          pmFolderStructureStep,
          { type: 'heading', text: 'Collection Paylaşma — 4 Yöntem' },
          { type: 'text', content: 'Collection hazır olunca ekiple paylaşmak şarttır. CI/CD ekipleri için Git en iyi yaklaşımdır — versiyonlanmış, PR\'da incelenebilir, her commit\'te Newman ile otomatik çalıştırılabilir.' },
          {
            type: 'diagram-svg',
            title: 'Collection Paylaşımı — 4 Dağıtım Yöntemi (Animasyonlu)',
            svg: shareFlowSvg,
          },
          {
            type: 'grid', cols: 2,
            items: [
              { icon: '📄', label: 'JSON Export', desc: 'Collection\'a sağ tıkla → Export → Collection v2.1. .json dosyasını gönder. Alıcı File → Import ile içe aktarır. Git olmadan tek seferlik paylaşım için idealdir.' },
              { icon: '🌿', label: 'Git (CI/CD için Önerilen)', desc: 'collection.json + env.json dosyalarını repo\'nun tests/postman/ klasörüne export et. CI/CD pipeline her push\'ta bunları çeker ve çalıştırır. Versiyonlanmış, denetlenebilir.' },
              { icon: '☁️', label: 'Postman Cloud Workspace', desc: 'Share → "Run in Postman" linki oluştur veya takım üyesini paylaşılan Workspace\'e davet et. Gerçek zamanlı sync — herkes güncel sürümü anında görür.' },
              { icon: '⚡', label: 'Newman CLI', desc: 'JSON export → Git\'e ekle → newman run. Herhangi bir test başarısız olursa exit code 1 döner ve CI build\'i otomatik durdurur. Otomatik regresyonun çekirdeği.' },
            ],
          },
          {
            type: 'code',
            language: 'bash',
            label: 'Collection dosyaları için Git iş akışı:',
            code: `# 1. Projede postman dizini oluştur
mkdir tests/postman

# 2. Postman'dan dosyaları export et (File → Export):
#    tests/postman/auth-service.collection.json
#    tests/postman/user-service.collection.json
#    tests/postman/env.dev.json
#    tests/postman/env.staging.json

# 3. Git'e ekle
git add tests/postman/
git commit -m "chore: microservisler icin postman e2e koleksiyonlari eklendi"

# 4. CI/CD pipeline'ından çalıştır:
newman run tests/postman/auth-service.collection.json \\
  -e tests/postman/env.staging.json \\
  -r cli,htmlextra \\
  --reporter-htmlextra-export results/auth-report.html`,
          },
          { type: 'heading', text: 'Collection Çalıştırma — Collection Runner GUI' },
          { type: 'text', content: 'Collection Runner tüm request\'leri sırayla yürütür — her request\'in test script\'leri yanıttan sonra otomatik çalışır. Deployment sonrası manuel regresyon kontrolleri için mükemmel. Java analogisi: "mvn test" yerine bir buton tıklayarak tam TestNG suite\'ini çalıştırmak gibi.' },
          {
            type: 'steps',
            items: [
              { label: 'Collection adının yanındaki "▶ Run" düğmesine tıkla', desc: 'Collection Runner paneli sağda açılır.' },
              { label: 'Environment seç: "microservices-dev"', desc: 'Tüm {{variable\'lar}} bu environment\'ın değerleriyle çözümlenir.' },
              { label: 'Iterations ayarla (varsayılan: 1)', desc: 'Data-driven test için artır — her iteration CSV dosyasından bir satır okur.' },
              { label: 'Delay ayarla (opsiyonel)', desc: 'Request\'ler arasında işleme süresi gerekiyorsa milisaniye ekle.' },
              { label: '"Run [collection adı]"\'na tıkla', desc: 'Postman her request\'i sırayla çalıştırır. Her yanıttan sonra test script\'leri tetiklenir.' },
              { label: 'Sonuçları incele', desc: 'Yeşil ✅ = geçti. Kırmızı ❌ = başarısız — hangi assertion\'ın tutmadığını ve expected/actual değerleri görmek için tıkla.' },
            ],
          },
          {
            type: 'diagram-svg',
            title: 'Collection Runner — Microservis E2E Akışı (Animasyonlu)',
            svg: collectionRunnerSvg,
          },
          { type: 'heading', text: 'Newman CLI ile Çalıştırma' },
          {
            type: 'code',
            language: 'bash',
            label: 'Newman — tüm senaryo seçenekleri:',
            code: `# Temel çalıştırma
newman run auth-service.collection.json

# Ortam dosyasıyla
newman run auth-service.collection.json -e env.dev.json

# HTML rapor ile
newman run auth-service.collection.json \\
  -e env.staging.json \\
  -r cli,htmlextra \\
  --reporter-htmlextra-export report.html

# Data-driven test (her senaryo için CSV)
newman run user-service.collection.json \\
  -e env.dev.json \\
  --iteration-data test-kullanicilar.csv \\
  --iteration-count 10

# 4 servisi sırayla çalıştır (ilk hatada dur)
newman run tests/postman/auth-service.collection.json   -e env.staging.json &&
newman run tests/postman/user-service.collection.json   -e env.staging.json &&
newman run tests/postman/order-service.collection.json  -e env.staging.json &&
newman run tests/postman/payment-service.collection.json -e env.staging.json`,
          },
          pmNewmanCliStep,
          { type: 'heading', text: 'Variable Scope — Öncelik Sırası' },
          {
            type: 'diagram-svg',
            title: 'Variable Scope — Hangisi Kazanır',
            svg: varScopeSvg,
          },
          {
            type: 'table',
            headers: ['Scope', 'Nasıl Set Edilir', 'Ömrü', 'En İyi Kullanım'],
            rows: [
              ['Local (en yüksek öncelik)', 'pm.variables.set()', 'Tek request', 'Geçici hesaplamalar'],
              ['Collection', 'pm.collectionVariables.set()', 'Tüm collection run', 'API versiyonu, sayfa boyutu'],
              ['Environment', 'pm.environment.set()', 'Değiştirilene kadar', 'baseUrl, authToken, dinamik ID'],
              ['Global (en düşük öncelik)', 'pm.globals.set()', 'Tüm workspace', 'Paylaşılan API key, sabitler'],
            ],
          },
          pmVariableResolutionFilm,
          pmCollectionHierarchyStep,
          pmCollectionHierarchyPractice,
          {
            type: 'quiz',
            question: 'E2E akışın: POST /login → POST /users → POST /orders → POST /payments. /orders request\'i (3. adım) 2. adımdaki userId\'yi kullanıyor. Doğru Postman yaklaşımı nedir?',
            options: [
              { id: 'a', text: '2. adımın yanıtından userId\'yi manuel kopyalayıp 3. adımın URL\'ine her seferinde yapıştır' },
              { id: 'b', text: '2. adımın Tests sekmesinde: pm.environment.set("userId", body.id). 3. adımın URL\'inde {{userId}} kullan.' },
              { id: 'c', text: 'Tüm request\'lerde bilinen sabit bir userId kullan — değişmez' },
              { id: 'd', text: 'Her adım için ayrı Collection oluştur ki birbirlerine karışmasın' },
            ],
            correct: 'b',
            explanation: 'Environment variable\'ları üzerinden request chaining, E2E akışlar için temel Postman desenidir. 2. adımın Tests script\'i sunucu tarafından üretilen dinamik ID\'yi kaydeder; 3. adım {{userId}} ile okur. Bu sayede sunucu her çalışmada farklı ID üretse bile Collection çalışır. Sabit ID kullanmak, test kullanıcısı silindiğinde başarısız olur.',
          
        retryQuestion: {
      "question": "E2E akışın: GET /products → POST /cart → POST /checkout. /cart isteği (2. adım), 1. adımdan gelen ürünün productId'sini kullanıyor. Bu bağımlılığı yönetmek için en doğru Postman yöntemi hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "Her yeni testte ürün ID'sini bir metin dosyasına yazıp oradan oku"
            },
            {
                  "id": "b",
                  "text": "1. adımın Tests sekmesinde: pm.collectionVariables.set(\"pid\", jsonData.id). 2. adımın request body'sinde {{pid}} kullan."
            },
            {
                  "id": "c",
                  "text": "Global değişkenlerde sabit bir ürün ID tanımla, asla güncelleme"
            },
            {
                  "id": "d",
                  "text": "Requestleri farklı tablarda aç ve manuel değer girerek ilerle"
            }
      ],
      "correct": "b",
      "explanation": "Postman değişkenleri (Collection veya Environment), istekler arasında veri taşımanın en etkili yoludur. Collection değişkenleri, test sürecinde üretilen dinamik verileri bir sonraki isteğe aktararak, testin birbirinden bağımsız ve otomatize edilebilir kalmasını sağlar. Sabit değerler yerine dinamik atama yapmak, testin her seferinde taze veri ile çalışmasını garantiler."
}
},
        ],
      },

      // ── 3. TEST OTOMASYONU ────────────────────────────────────────────────
      {
        title: '🔥 Otomatik Test Yazma',
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔍',
            content: 'Postman test script\'leri, fabrika konveyör bandının sonundaki bir kalite kontrol kapısı gibi çalışır — her ürün (API response\'u) dışarı çıkmadan önce otomatik bir inceleme sürecinden geçer. Kontrolör sadece etikete (200 status kodu) bakmaz; boyutları ölçer (response time 500ms\'nin altında mı), malzeme listesini kontrol eder (JSON schema doğru mu), seri numarasının boş olmadığını doğrular (id field null mı) ve ürünün kopya olmadığını teyit eder (token benzersiz mi). Şimdi gerçek soru: iş mantığını test etmek için zaten Java\'da JUnit assertion\'ları yazıyorsan neden Postman\'da da JavaScript assertion yazmak gerekiyor? Çünkü Postman testleri HTTP sınırında, JVM\'nin içinde değil çalışır — herhangi bir harici tüketicinin deneyimlediği şekliyle API sözleşmesinin doğru olduğunu, uygulama dilinden bağımsız olarak kanıtlarlar. CI açısından bakıldığında Newman\'da başarısız olan bir Postman testi, bozuk bir API sözleşmesidir: unit testlerin hiçbir zaman yakalamadığı sessiz regresyon türü — bir mobil uygulamanın veya üçüncü taraf entegrasyonunun yanlış veri formatları, beklenen öğeler yerine boş diziler veya başarısız bir işlemi gizleyen 200 status kodları almasına yol açan türden hatalar.',
          },
          { type: 'heading', text: 'pm.test() API — Assertion Yazma' },
          { type: 'text', content: 'Tests sekmesi, her istekten sonra JavaScript çalıştırır. pm (Postman) nesnesi tüm assertion araçlarını sağlar. Sonuçlar yanıt panelindeki "Test Results" sekmesinde ✅ veya ❌ olarak görünür.' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Tests Sekmesi — Temel Assertion\'lar:',
            code: `// Test 1: Durum kodu kontrolü
pm.test("Durum 200 OK", function() {
    pm.response.to.have.status(200);          // 200 değilse başarısız
});

// Test 2: Yanıt süresi (performans assertion)
pm.test("Yanıt süresi < 500ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Geçerli JSON kontrolü
pm.test("Yanıt JSON formatında", function() {
    pm.response.to.be.json;                   // Content-Type JSON değilse başarısız
});

// Test 4: Belirli alan kontrolü
pm.test("Kullanıcı adı Alice", function() {
    const json = pm.response.json();          // JSON body'yi parse et
    pm.expect(json.name).to.equal("Alice");   // Tam eşitlik kontrolü
});

// Test 5: Dizi boş değil
pm.test("Kullanıcı listesi dolu", function() {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");        // Tür kontrolü
    pm.expect(json.length).to.be.greaterThan(0); // Uzunluk kontrolü
});`,
          },
          pmCoreAssertionsStep,
          {
            type: 'java-compare',
            topic: 'API Assertion\'ları',
            why: 'Java QA mühendisleri API testi için REST Assured kullanır. Postman aynı BDD tarzı assertion kavramlarını kullanır — Java yerine JavaScript (Chai kütüphanesi).',
            java: `// Java — REST Assured (TestNG/JUnit)
@Test
public void testGetUsers() {
    given()
        .header("Authorization","Bearer " + token)
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)                     // durum assertion
        .body("name[0]", equalTo("Alice"))   // body assertion
        .body("", hasSize(greaterThan(0)))   // dizi boyutu
        .time(lessThan(500L));               // performans
}`,
            python: `// Postman — JavaScript (Tests sekmesi)
pm.test("Durum 200", () => {
    pm.response.to.have.status(200);
});
pm.test("İlk kullanıcı Alice", () => {
    const users = pm.response.json();
    pm.expect(users[0].name).to.equal("Alice");
});
pm.test("Kullanıcı var", () => {
    pm.expect(pm.response.json()).to.have.length.above(0);
});
pm.test("Hızlı yanıt", () => {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,
            note: 'Her iki araç da BDD tarzını (given/when/then) kullanır. pm.test() testi adlandırır; pm.expect() assertion\'ı yapar. Chai assertion kütüphanesi Postman\'a dahil.',
          },
          { type: 'heading', text: 'İstek Zincirleme — İstekler Arası Veri Aktarımı' },
          {
            type: 'code',
            language: 'javascript',
            label: 'İstek 1 (POST /login) — Tests sekmesi: token\'ı kaydet',
            code: `// POST /login başarılı olduktan sonra JWT token'ı çıkar ve kaydet
pm.test("Giriş başarılı", function() {
    pm.response.to.have.status(200);          // Önce girişin çalıştığını doğrula
});

const responseJson = pm.response.json();          // Yanıtı parse et
pm.environment.set("authToken", responseJson.token); // Sonraki istek için kaydet
console.log("Token kaydedildi:", responseJson.token); // Postman Console'da görünür`,
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'İstek 2 (GET /profile) — kaydedilen token\'ı kullan:',
            code: `// Headers sekmesinde:
// Authorization: Bearer {{authToken}}  ← İstek 1'in kaydettiği token

// Tests sekmesinde:
pm.test("Profil döndü", function() {
    const profile = pm.response.json();
    pm.expect(profile.email).to.include("@");   // E-posta format kontrolü
    pm.expect(profile).to.have.property("id");   // id alanı var mı
});`,
          },
          pmRequestChainStep,
          { type: 'heading', text: 'Pre-request Script — İstekten Önce Hazırlık' },
          {
            type: 'code',
            language: 'javascript',
            label: 'Pre-request Script sekmesi (istek gönderilmeden ÖNCE çalışır):',
            code: `// Her test çalışması için benzersiz e-posta üret (çakışmaları önler)
const timestamp = Date.now();                                   // epoch ms
pm.environment.set("testEmail", "test+" + timestamp + "@qa.com");

// Dinamik tarih ayarla
const today = new Date().toISOString().split("T")[0];          // "2024-01-15"
pm.environment.set("today", today);

// İstek body'sinde kullan:
// { "email": "{{testEmail}}", "date": "{{today}}" }`,
          },
          pmPreRequestScriptStep,
          { type: 'heading', text: 'Newman — CLI\'dan Koleksiyon Çalıştırma' },
          { type: 'text', content: 'Newman, Postman koleksiyonlarını komut satırından çalıştıran araçtır. Her isteği gönderir ve tüm test scriptlerini çalıştırır. Newman, Postman testlerini Jenkins, GitHub Actions veya herhangi bir CI/CD pipeline\'ına dahil etmenin yoludur.' },
          {
            type: 'installation',
            title: 'Newman Kurulumu',
            steps: [
              { cmd: 'npm install -g newman', explanation: 'Newman\'ı npm ile global olarak yükle. Node.js 14+ gerekir.' },
              { cmd: 'npm install -g newman-reporter-htmlextra', explanation: 'Güzel HTML raporları için reporter\'ı yükle.' },
              { cmd: 'newman --version', explanation: 'Kurulumu doğrula — newman/6.x.x yazmalı.' },
              { cmd: 'newman run collection.json -e env.json -r htmlextra --reporter-htmlextra-export report.html', explanation: 'Ortam dosyasıyla koleksiyonu çalıştır. HTML raporu report.html\'e kaydet. CI/CD komutun bu.' },
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            label: 'GitHub Actions — CI/CD entegrasyonu:',
            code: `# .github/workflows/api-tests.yml
name: API Testleri (Newman)

on:
  push:
    branches: [main, develop]     # her push'ta çalış
  pull_request:
    branches: [main]              # main'e PR'da çalış

jobs:
  api-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3             # repo'yu klonla

      - name: Node.js Kur
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Newman Kur
        run: npm install -g newman newman-reporter-htmlextra

      - name: API Testlerini Çalıştır
        run: |
          newman run postman/collection.json \\
            -e postman/env_staging.json \\    # staging ortam dosyası
            -r cli,htmlextra \\              # CLI çıktı + HTML rapor
            --reporter-htmlextra-export report.html

      - name: Raporu Yükle
        uses: actions/upload-artifact@v3
        if: always()                          # testler başarısız olsa da yükle
        with:
          name: api-test-raporu
          path: report.html`,
          },
          pmNewmanCiCdStep,
          { type: 'heading', text: 'Sık Karşılaşılan Postman Hataları ve Çözümleri' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'postman-errors-tr',
            framework: 'Postman',
            errors: [
              {
                error: 'ECONNREFUSED',
                fullMessage: 'Error: connect ECONNREFUSED 127.0.0.1:3000',
                cause: { tr: 'Hedef sunucu çalışmıyor veya yanlış port/URL kullanılıyor.', en: 'Target server is not running, or wrong port/URL.' },
                solution: { tr: '1) Sunucunun çalıştığını doğrula. 2) Port numarasını kontrol et. 3) localhost yerine 127.0.0.1 dene.', en: '1) Verify the server is running. 2) Check the port. 3) Try 127.0.0.1 instead of localhost.' },
                codeWrong: `// Sunucu çalışmıyor
GET http://localhost:3000/api/users
// Hata: connect ECONNREFUSED`,
                codeFixed: `// 1. Önce sunucuyu başlat:
// npm start  VEYA  python app.py  VEYA  java -jar app.jar

// 2. Sonra gönder:
GET http://localhost:3000/api/users
// 200 OK`,
              },
              {
                error: { tr: 'SSL Sertifika Hatası', en: 'SSL Certificate Error' },
                fullMessage: 'Error: unable to verify the first certificate',
                cause: { tr: 'Sunucu self-signed SSL sertifikası kullanıyor (lokal geliştirme ortamında yaygın).', en: 'Server uses a self-signed SSL certificate (common in local dev).' },
                solution: { tr: 'Postman Settings → General → SSL certificate verification → OFF. Sadece dev ortamında yap, production\'da asla kapatma.', en: 'Postman Settings → General → SSL certificate verification → OFF. Dev only — never in production.' },
                codeWrong: `// SSL doğrulama AÇIK — self-signed sertifika için başarısız
GET https://local-dev.example.com/api
// Hata: unable to verify the first certificate`,
                codeFixed: `// Postman Settings → SSL certificate verification → OFF
GET https://local-dev.example.com/api
// 200 OK (self-signed sertifika ortamları için)`,
              },
              {
                error: 'AssertionError: expected 404 to equal 200',
                fullMessage: 'AssertionError: expected 404 to deeply equal 200',
                cause: { tr: 'URL yanlış, endpoint adı değişmiş veya kaynak silinmiş.', en: 'Wrong URL, endpoint was renamed, or resource was deleted.' },
                solution: { tr: '1) URL\'yi API dokümantasyonuyla karşılaştır. 2) /v1/ versiyonunu kontrol et. 3) Auth token eksik olabilir.', en: '1) Compare URL with API docs. 2) Check version prefix (/v1/). 3) Missing auth token?' },
                codeWrong: `// Yanlış yol — çoğul 's' eksik
GET https://api.example.com/user/42   // 404`,
                codeFixed: `// Doğru
GET https://api.example.com/users/42  // 200`,
              },
              {
                error: 'Tests sekmesinde SyntaxError',
                fullMessage: 'SyntaxError: Unexpected token } (Tests sekmesinde)',
                cause: { tr: 'Test scriptinde JavaScript sözdizimi hatası — eksik parantez veya yanlış noktalı virgül.', en: 'JavaScript syntax error — missing brackets or wrong semicolons.' },
                solution: { tr: 'Alt paneldeki kırmızı hata satırına tıkla. Tüm parantezlerin düzgün kapatıldığını kontrol et.', en: 'Click the red error at the bottom. Verify all brackets are properly closed.' },
                codeWrong: `// Kapanış }); eksik
pm.test("Durum OK", function() {
    pm.response.to.have.status(200);
// HATA: }); eksik`,
                codeFixed: `// Doğru — tüm parantezler kapalı
pm.test("Durum OK", function() {       // aç
    pm.response.to.have.status(200);   // assertion
});                                    // kapat`,
              },
            ],
          },
          pmTestScriptTimingFilm,
          pmAssertionOrderStep,
          pmAssertionOrderPractice,
          {
            type: 'quiz',
            question: 'Her gece saat 02:00\'de Postman koleksiyonunu zamanlanmış regresyon testi olarak çalıştırman gerekiyor. Ne kullanmalısın?',
            options: [
              { id: 'a', text: 'Her gece 02:00\'de Postman\'ı manuel açıp Run Collection\'a tıkla' },
              { id: 'b', text: 'Cron job veya zamanlanmış CI/CD pipeline\'ında Newman — GUI olmadan CLI\'dan koleksiyonları çalıştırır' },
              { id: 'c', text: 'Postman sonuçları otomatik e-posta gönderir — ek araç gerekmez' },
              { id: 'd', text: 'Tüm istekleri zamanlama için Selenium\'a kopyala' },
            ],
            correct: 'b',
            explanation: 'Newman, Postman için CLI çalıştırıcıdır. Cron job (Linux: crontab -e) veya zamanlanmış CI/CD pipeline tetikleyicisi kur. --reporter-junit flag\'i CI/CD platformlarının parse ettiği JUnit XML raporu üretir.',
          
        retryQuestion: {
      "question": "CI/CD süreçlerinde Postman koleksiyonlarını 'headless' modda çalıştırmak ve test sonuçlarını otomatik olarak raporlamak istiyorsun. Hangi araç kullanılmalıdır?",
      "options": [
            {
                  "id": "a",
                  "text": "Postman masaüstü uygulamasını sunucuya kurup Run butonunu otomatize et"
            },
            {
                  "id": "b",
                  "text": "Newman kullanarak koleksiyonu CLI üzerinden çalıştır ve sonuçları raporla"
            },
            {
                  "id": "c",
                  "text": "Tüm testleri manuel olarak Postman Cloud üzerinden tetikle"
            },
            {
                  "id": "d",
                  "text": "Her test için ayrı bir API dokümantasyon aracı kullan"
            }
      ],
      "correct": "b",
      "explanation": "Newman, Postman koleksiyonlarını komut satırı arayüzünden (CLI) çalıştırmak için kullanılan resmi bir araçtır. CI/CD entegrasyonu (Jenkins, GitLab CI, GitHub Actions) için zorunludur çünkü grafik arayüz (GUI) gerektirmez ve test sonuçlarını formatlı (JSON, JUnit, HTML) olarak çıktı alarak raporlama araçlarına aktarılmasını sağlar."
}
},
        ],
      },

      // ── 4. GERÇEK HAYAT ─────────────────────────────────────────────────────
      {
        title: '🛠️ Gerçek Hayat',
        blocks: [
          { type: 'simple-box', emoji: '🛠️', content: 'Postman, her çalışanın projeden projeye iş değiştirirken yeniden baştan başlamak zorunda kalmadığı bir yapı bürosu gibi çalışır — şablonlar kayıtlıdır, standart ölçüm aletleri dolaplarda hazırdır ve yeni gelen mühendis birkaç dakikada üretim hattına katılır. Peki Java\'da zaten RestAssured ve HttpClient var iken neden bir GUI\'ye para yatıralım? Çünkü RestAssured her API isteği için Maven bağımlılığı, BaseTest sınıfı, Jackson nesneleri ve JUnit assertion\'ları gerektirirken, Postman\'da aynı isteği 20 saniyede yapıp sonucu anında görürsünüz — ve bu fark keşif testinde saatler anlamına gelir. Java\'daki anloji şudur: RestAssured is the JUnit test code, Postman is the IntelliJ HTTP Client plugin — aynı sonucu iki farklı bağlamda üretirler, biri üretim süiti için, diğeri hızlı doğrulama için. QA pratiğinde bu en çok kritik öneme sahip olur: backend mikroservisi yeni bir alan ekler veya kaldırır, QA test kodunu hiç dokunmadan Postman\'da endpoint\'i açıp 30 saniyede doğrular — aynı değişikliği Java test koduyla karşılamak 15 dakika debug gerektirirdi.' },
          { type: 'heading', text: 'Hangi İhtiyaca Cevap Verir? Postman Olmadan Hayat Nasıl Zordu' },
          { type: 'text', content: "Postman olmadan bir API'yi test etmek ya frontend'in bitmesini bekleyip UI üzerinden tıklamak ya da her endpoint için elle atılabilir curl komutları / Java HttpClient kod parçacıkları yazmak demekti. Header'lar, auth token'ları ve request body'leri her seferinde yeniden yazılırdı, 'önce login ol, sonra o token'ı sonraki 5 istekte kullan' gibi bir zincirleme yapmanın kolay bir yolu yoktu. Postman bunların hepsini yeniden kullanılabilir, paylaşılabilir, scriptlenebilir bir client ile değiştirir — tarayıcılar için Selenium IDE'nin API karşılığı gibidir." },
          { type: 'heading', text: 'Gerçek Senaryo: Mikroservis Sipariş Akışı' },
          { type: 'text', content: "Orta ölçekli bir e-ticaret şirketinin 4 mikroservisi var: Auth, Catalog, Cart ve Orders. Yeni bir QA mühendisi işe başlıyor ve şu görevi alıyor: 'Frontend ekibi checkout UI'ını bitirmeden önce, backend'deki tüm sipariş akışının uçtan uca çalıştığını doğrula.'" },
          {
            type: 'steps',
            items: [
              '4 servise karşılık gelen 4 klasörlü "Order Flow E2E" adlı bir Postman Collection oluştur',
              'İstek 1 — POST /auth/login: dönen JWT\'yi Tests sekmesinde pm.collectionVariables.set("token", pm.response.json().token) ile collection değişkenine kaydet',
              'İstek 2 — GET /catalog/products: header\'lara Authorization: Bearer {{token}} ekle, pm.response.json().length > 0 doğrulayan bir test yaz',
              'İstek 3 — POST /cart/add: {{token}} + İstek 2\'nin yanıtından alınan bir productId gönder, istekler arası veriyi otomatik zincirle',
              'İstek 4 — POST /orders/checkout: son adım — response.status === "CONFIRMED" ve sipariş toplamının sepet toplamıyla eşleştiğini doğrula',
              'Tüm klasörü Collection Runner ile çalıştır — 4 istek sırayla çalışır, her test sonucu pass/fail olarak görünür',
              'Collection + environment\'ı JSON olarak export et, Git\'teki tests/postman/ klasörüne commit et, Newman\'ı CI pipeline\'ına bağla — böylece bu E2E kontrol her backend PR\'ında, frontend daha var olmadan önce çalışır',
            ]
          },
          { type: 'heading', text: 'Postman\'i Alternatiflerle Karşılaştırma — Gerçek Hayat Trade-off\'ları' },
          {
            type: 'table',
            headers: ['Araç', 'Avantajlar ✅', 'Dezavantajlar ❌', 'Ne zaman tercih edilmeli?'],
            rows: [
              ['Postman', 'Kod gerektirmeyen GUI, collection değişkenleriyle zincirleme, geniş ekosistem (mock server, monitor), CI için Newman', 'GUI-öncelikli iş akışı düzenli export edilmezse version control\'den kopabilir', 'Ekip hızlı keşif testi VE tam bir kod framework\'ü yazmadan CI otomasyonuna geçiş istiyorsa'],
              ['curl / ham HTTP', 'Sıfır kurulum, herhangi bir shell\'de scriptlenebilir, tek seferlik debug için harika', 'Yerleşik zincirleme yok, test assertion\'ı yok, bir istek süitini sürdürmek zahmetli', 'Terminalden tek ve hızlı bir istek gerekiyorsa, yeniden kullanılabilir bir süit değil'],
              ['REST Assured (Java)', 'Tam programlama dili gücü, Java/Maven test süitine doğal şekilde uyar, JUnit/TestNG ile kolay entegrasyon', 'Her istek için Java kodu yazmak gerekir — keşif testi için daha yavaş', 'Ekip Java ağırlıklıysa ve API testlerinin uygulama koduyla aynı repo/dilde yaşamasını istiyorsa'],
            ]
          },
          { type: 'heading', text: 'Gerçek Hayat Entegrasyon Akışı' },
          {
            type: 'visual', variant: 'flow',
            title: 'Bir Postman Collection\'ı Gerçekten Nasıl Production Kararlarına Ulaşır',
            steps: [
              { num: '1', label: 'Collection Oluştur', desc: 'QA, Postman GUI\'sinde istekleri zincirler' },
              { num: '2', label: 'JSON Export Et', desc: 'tests/postman/order-flow.json' },
              { num: '3', label: 'Git\'e Commit Et', desc: 'uygulama koduyla birlikte versiyonlanır', highlight: true },
              { num: '4', label: 'CI Newman Çalıştırır', desc: 'newman run order-flow.json -e prod.json' },
              { num: '5', label: 'JUnit Raporu', desc: '--reporter-junit CI dashboard\'unu besler' },
              { num: '6', label: 'Pass/Fail Kapısı', desc: 'Herhangi bir pm.test() başarısız olursa build durur', highlight: true },
            ],
            note: 'Bu, bir Selenium regresyon süitiyle aynı pipeline şeklidir — yalnızca test edilen katman UI\'dan HTTP\'ye değişti.',
          },
          { type: 'heading', text: 'Uygulamalı Mini Proje — Kendin Dene' },
          { type: 'text', content: 'İstekler arası değişken aktarımını 5 dakikadan kısa sürede görmek için bu 2 istekli zinciri ücretsiz bir public API\'ye karşı kur.' },
          {
            type: 'code', code: `// İstek 1: GET https://jsonplaceholder.typicode.com/users/1
// Tests sekmesi:
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.collectionVariables.set("userId", pm.response.json().id);
pm.collectionVariables.set("userEmail", pm.response.json().email);

// İstek 2: GET https://jsonplaceholder.typicode.com/posts?userId={{userId}}
// Tests sekmesi:
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.test("Tüm postlar zincirlenen userId'ye ait", () => {
    const posts = pm.response.json();
    posts.forEach(p => pm.expect(p.userId).to.eql(
        parseInt(pm.collectionVariables.get("userId"))
    ));
});

// Her ikisini de Collection Runner ile çalıştır — İstek 2 otomatik
// olarak İstek 1'in yanıtından yakalanan userId'yi kullanır. Elle
// kopyala-yapıştır gerekmez.`
          },
          pmNewmanCiFilm,
          pmCiGateStep,
          pmCiGatePractice,
          {
            type: 'quiz',
            question: 'Bir ekip hızlı, keşif amaçlı API testi yapmak VE sıfırdan tam bir kod framework\'ü yazmadan CI otomasyonuna geçmek istiyor. Hangi araç bu iki ihtiyacı da karşılar?',
            options: [
              { id: 'a', text: 'Sadece curl' },
              { id: 'b', text: 'Postman — aynı collection GUI\'de keşfedilebilir, Newman ile CI\'da gözetimsiz çalıştırılabilir' },
              { id: 'c', text: 'Sıfırdan yazılmış özel bir Java framework\'ü' },
              { id: 'd', text: 'Manuel test case\'lerden oluşan bir spreadsheet' },
            ],
            correct: 'b',
            explanation: 'Postman, kod yazmadan bir GUI ile istek oluşturup keşfetmeni sağlar, sonra TAM AYNI collection.json\'ı export edip Newman ile CI\'da gözetimsiz çalıştırabilirsin — ayrı bir framework yeniden yazmaya gerek yok. curl\'de sürdürülebilir bir süit için yerleşik zincirleme/assertion yoktur, özel bir Java framework (REST Assured gibi) tam programlama gücü verir ama ilk günden gerçek kod yazmayı gerektirir — hızlı keşif testi için fazla ağırdır.',
            retryQuestion: {
              question: 'Bir ekip Postman\'ı aştı ve artık Postman UI\'ının düzgün ifade etmekte zorlandığı karmaşık programatik mantığa (özel retry stratejileri, yüzlerce test case arasında koşullu dallanma) ihtiyaç duyuyor. Doğal sıradaki adım nedir?',
              options: [
                { id: 'a', text: 'Karmaşıklığa bakmadan her şeyi Postman\'a sıkıştırmaya devam etmek' },
                { id: 'b', text: 'Süiti tam bir kod framework\'üne (REST Assured/Java gibi) geçirmek, bu da tam programlama dili gücü verir' },
                { id: 'c', text: 'curl\'e geçmek, çünkü daha basittir' },
                { id: 'd', text: 'Postman aşılamaz, hiçbir geçiş asla gerekmez' },
              ],
              correct: 'b',
              explanation: 'Postman\'ın kod yazmadan GUI\'si hızlı keşif ve doğrudan CI süitleri için harikadır, ama genel amaçlı bir programlama ortamı değildir — test mantığı gerçek koşullar, döngüler veya pm.* scripting\'in rahatça desteklemediği özel abstraction\'lara ihtiyaç duyduğunda, REST Assured gibi tam bir kod framework\'ü Java\'nın kendisinin tam ifade gücünü verir. Bu, bir test süitinin karmaşıklığı büyürken normal bir ilerleyiştir, Postman\'ın başta yanlış seçim olduğunun göstergesi değildir.',
            },
          },
        ],
      },

      // ── 5. EKOSİSTEM ──────────────────────────────────────────────────────
      {
        title: '🔗 Ekosistem',
        blocks: [
          { type: 'simple-box', emoji: '🔗', content: 'Postman ekosistemi, bir gazetecinin haberi masaüstü editörde (Postman GUI) yazıp baskı makinesine (Newman CLI) gönderdiği ve baskının editoryal saate (CI/CD trigger) göre otomatik çalıştığı modern bir gazete yayın hattı gibi çalışır. Postman\'ı Newman olmadan kullanmak, harika bir metin yazmak ama hiç basmamak gibidir. Asıl soru şu: tüm suite\'i Java\'da RestAssured ile yazıp Postman\'ı tamamen atlasak olmaz mıydı? Olmaz, çünkü Postman\'ın GUI authoring döngüsü — URL yaz, header ekle, Send\'e bas, 2 saniyede yanıtı gör — keşif testi ve yeni ekip üyelerinin adaptasyonunda Java projesini kurmaktan beş ila on kat daha hızlıdır. Bu iki araç tamamlayıcıdır: Postman authoring ve keşif için, Newman execution için, Git versiyonlama için, CI/CD zamanlama için. QA pratiğinde bu dört parçalı zincir şu anlama gelir: üç saatlik manuel testi gerektiren her API regresyon kontrolü, her backend pull request\'inde Newman\'da 2 dakikada otomatik çalışır — Jenkins veya GitHub Actions\'ın build gate olarak kullanabileceği JUnit formatlı bir raporla.' },
          { type: 'heading', text: 'Postman Büyük Resme Nasıl Uyuyor' },
          { type: 'text', content: 'Tek başına Postman manuel bir araçtır — birinin "Send"e tıklaması gerekir. QA pipeline\'ındaki gerçek değeri üç sisteme bağlanmasından gelir: GUI bağımlılığını ortadan kaldıran CLI çalıştırıcısı Newman, her push\'ta Newman\'ı otomatik tetikleyen bir CI/CD aracı, ve collection JSON\'unun test ettiği uygulama koduyla birlikte versiyonlanmasını sağlayan Git.' },
          {
            type: 'visual', variant: 'boxes',
            title: 'Postman Ekosistemi — Kim Kiminle Konuşuyor',
            items: [
              { icon: '📮', label: 'Postman GUI', desc: 'collection\'ı interaktif olarak kur ve debug et' },
              { arrow: true },
              { icon: '📄', label: 'collection.json export', desc: 'Git\'e commit edilir, uygulamayla versiyonlanır' },
              { arrow: true },
              { icon: '⚡', label: 'Newman (CLI)', desc: 'aynı collection\'ı headless çalıştırır' },
              { arrow: true },
              { icon: '🔧', label: 'Jenkins / GitHub Actions', desc: 'her PR/push\'ta Newman\'ı tetikler', highlight: true },
              { arrow: true },
              { icon: '📊', label: 'JUnit/HTML rapor', desc: 'pass/fail kapısı + Slack uyarısı', highlight: true },
            ],
            note: 'Her araç kendi işini iyi yapar — Postman yazar, Newman çalıştırır, Git versiyonlar, CI/CD zamanlar ve kapı görevi görür.',
          },
          { type: 'heading', text: 'Üç Temel İlişki' },
          {
            type: 'table',
            headers: ['İlişki', 'Nasıl Birlikte Çalışırlar', 'Hangi Sorunu Çözer'],
            rows: [
              ['Postman ↔ Newman', 'Aynı collection.json dosyası ikisinde de çalışır — GUI yazma/debug için, Newman gözetimsiz çalıştırma için', 'Süiti iki kez yazmaktan kaçınır: biri insanlar için, biri otomasyon için'],
              ['Postman ↔ Git', 'Collection + environment\'lar JSON olarak export edilir, API kaynak koduyla birlikte commit edilir', 'Versiyon geçmişi, test değişikliklerinde code review, kötü bir assertion merge edilirse rollback'],
              ['Newman ↔ CI/CD (Jenkins/GH Actions)', 'Bir pipeline aşaması staging\'e her deploy sonrası `newman run` çalıştırır, başarısız pm.test() olursa build\'i durdurur', 'Bir insan Send\'e tıklamadan API regresyonlarını production\'a ulaşmadan yakalar'],
              ['Postman ↔ Mock Sunucular', 'Postman aynı collection\'dan bir mock server başlatabilir, böylece frontend ekibi gerçek backend var olmadan önce ona karşı geliştirme yapabilir', 'Frontend ve backend geliştirme zaman çizelgelerini birbirinden ayırır'],
            ]
          },
          { type: 'heading', text: 'Postman Diğer QA Araçları Yanında Nerede Duruyor' },
          { type: 'text', content: 'Selenium/Playwright süiti UI\'ı test eder; Postman/Newman süiti altındaki API katmanını test eder. İkisi de tipik olarak aynı CI pipeline\'ında ayrı aşamalar olarak çalışır — API testleri genellikle önce çalışır çünkü daha hızlıdır ve aynı backend\'e bağımlı olan daha yavaş UI testlerine zaman harcamadan önce backend hatalarını yakalar.' },
          pmMockServerFilm,
          pmToolLandscapeStep,
          pmToolLandscapePractice,
          {
            type: 'quiz',
            question: 'Postman GUI\'sini hiç açmadan bir CI/CD pipeline\'ı içinde bir Postman collection\'ını gözetimsiz çalıştırmak için ne kullanılır?',
            options: [
              { id: 'a', text: 'Postman Mock Sunucuları' },
              { id: 'b', text: 'Newman' },
              { id: 'c', text: 'Postman Sync' },
              { id: 'd', text: 'Bir tarayıcı eklentisi' },
            ],
            correct: 'b',
            explanation: 'Newman, Postman\'in komut satırı eşlik aracıdır: export edilen TAM AYNI collection.json\'ı (environment\'larla birlikte) GUI olmadan başsız (headless) çalıştırır ve bir CI pipeline\'ının (Jenkins, GitHub Actions) tepki verebileceği geçti/geçmedi exit kodları raporlar. Postman uygulamasında yazılıp debug edilen aynı collection, CI\'da Newman ile gözetimsiz çalışır — ayrı bir süite gerek yok.',
            retryQuestion: {
              question: 'CI\'da bir Newman çalışması `Error: ENOENT: no such file or directory, open \'./environments/staging.json\'` hatasıyla başarısız oluyor. En olası neden nedir?',
              options: [
                { id: 'a', text: 'Newman, CI ortamlarıyla temelden uyumsuzdur' },
                { id: 'b', text: 'Environment JSON dosyası collection ile birlikte export edilip commit edilmemiş, veya `-e`\'ye geçilen yol CI runner\'da yanlış' },
                { id: 'c', text: 'Collection\'ın kendisi bozulmuş' },
                { id: 'd', text: 'Newman, environment kullanmak için ücretli bir Postman lisansı gerektirir' },
              ],
              correct: 'b',
              explanation: 'Newman\'ın çalışması için collection.json VE (değişken kullanılıyorsa) environment.json\'ın komut satırına verilen yollarda GERÇEK dosyalar olarak var olması gerekir — environment dosyası Postman\'dan hiç export edilip repo\'ya commit edilmemişse, veya CI runner\'ın çalışma dizini beklenen relative path ile eşleşmiyorsa, Newman onu bulamaz ve tam olarak bu tür bir "dosya bulunamadı" hatasıyla başarısız olur.',
            },
          },
        ],
      },

      // ── 6. YAYGIN HATALAR ────────────────────────────────────────────────────
      {
        title: '🚨 Yaygın Hatalar',
        blocks: [
          { type: 'simple-box', emoji: '🚨', content: 'Postman hata mesajları, bir hastanenin triaj sistemi gibi çalışır: her semptomun bilinen bir nedeni vardır ve şiddet etiketi ne kadar acil hareket etmeniz gerektiğini söyler. 401, triaj hemşiresinin "sizi tanımıyorum — önce kimliğinizi gösterin" demesidir. 404, "istediğiniz departman bu hastanede yok" demektir. CORS hatası, güvenlik görevlisinin sizi binanın girişinde hemşirelere bile ulaşmadan durdurmacısıdır. Timeout, yanıtsız bir acil çağrıdır — ambulans hiç gelmedi. Asıl soru "bu hata ne anlama geliyor" değil, "hatanın sistemin hangi katmanında kaynaklandığı" — ve HTTP stack\'ini anlayan QA mühendisleri burada yalnızca uygulama kodunu bilen geliştiricileri geride bırakır. Java açısından Postman hataları tanıdık exception türlerine karşılık gelir: 401 → AuthenticationException, 404 → ResourceNotFoundException, 5xx → InternalServerError. Hata taksonomisini bilmek, bir backend bug\'ını saatler yerine dakikalar içinde yeniden oluşturmanızı, raporlamanızı ve izole etmenizi sağlar — ve Newman\'ın her push\'ta çalıştığı CI pipeline\'ında JUnit raporundaki doğru kategorize edilmiş bir hata, on-call mühendisine tam olarak hangi servis sınırının kırıldığını ve ne düzeltilmesi gerektiğini söyler.' },
          { type: 'heading', text: 'Karşılaşacağın Gerçek Hatalar ve Çözümleri' },
          {
            type: 'error-dictionary',
              relatedTopicId: 'postman-errors-tr',
            framework: 'Postman',
            errors: [
              {
                error: '401 Unauthorized',
                fullMessage: '{ "error": "Unauthorized", "message": "Invalid or missing token" }',
                cause: { tr: 'Authorization header eksik, token süresi dolmuş veya yanlış formatta gönderilmiş.', en: 'Authorization header is missing, the token expired, or it was sent in the wrong format.' },
                solution: { tr: '1) Headers sekmesinde Authorization: Bearer {{token}} olduğunu doğrula. 2) Token\'ın güncel login isteğinden geldiğini kontrol et. 3) Token süresini kontrol et (JWT exp claim).', en: '1) Verify Headers tab has Authorization: Bearer {{token}}. 2) Confirm the token came from a fresh login request. 3) Check token expiry (JWT exp claim).' },
                codeWrong: `// Authorization header eksik
GET https://api.example.com/orders
// 401 Unauthorized`,
                codeFixed: `// Başarılı bir login isteğinden sonra header ekle
Authorization: Bearer {{token}}
GET https://api.example.com/orders
// 200 OK`,
              },
              {
                error: 'Could not get response — timeout',
                fullMessage: 'Error: connect ETIMEDOUT / "Could not get any response"',
                cause: { tr: 'Sunucu yanıt vermiyor (yanlış URL, sunucu kapalı, firewall engelliyor veya çok yavaş çalışıyor).', en: 'Server is not responding — wrong URL, server is down, firewall blocking, or server is too slow.' },
                solution: { tr: '1) URL\'yi tarayıcıda dene. 2) VPN/firewall kapatıp tekrar dene. 3) Settings → General → Request timeout süresini artır.', en: '1) Try the URL in a browser. 2) Disable VPN/firewall and retry. 3) Increase Settings → General → Request timeout.' },
                codeWrong: `GET https://staging-api-typo.example.com/health
// Hata: Could not get any response`,
                codeFixed: `GET https://staging-api.example.com/health
// 200 OK — sorun subdomain'deki yazım hatasıydı`,
              },
              {
                error: { tr: 'Tests\'te JSON parse hatası', en: 'JSON parse error in Tests' },
                fullMessage: 'SyntaxError: Unexpected token < in JSON at position 0',
                cause: { tr: 'pm.response.json() çağrılıyor ama sunucu JSON yerine HTML (örn. 500 hata sayfası) döndürüyor.', en: 'pm.response.json() is called, but the server returned HTML (e.g. a 500 error page) instead of JSON.' },
                solution: { tr: '1) Response body\'i önce Postman Body sekmesinde gözle kontrol et. 2) Status code\'u logla — muhtemelen 500/502 dönüyor. 3) JSON parse etmeden önce status kontrolü ekle.', en: '1) First eyeball the response body in the Body tab. 2) Log the status code — likely a 500/502. 3) Guard the JSON parse behind a status check.' },
                codeWrong: `pm.test("Check name", () => {
    pm.expect(pm.response.json().name).to.eql("Ada");
    // sunucu HTML hata sayfası dönerse çöker
});`,
                codeFixed: `pm.test("Parse etmeden once status 200 kontrol et", () => {
    pm.response.to.have.status(200);
    pm.expect(pm.response.json().name).to.eql("Ada");
});`,
              },
              {
                error: 'URL\'de değişken literal {{baseUrl}} olarak görünüyor',
                fullMessage: 'Request sent to literal string: https://{{baseUrl}}/users',
                cause: { tr: 'Doğru Environment seçilmemiş veya değişken o environment\'ta tanımlı değil.', en: 'The correct Environment is not selected in the top-right dropdown, or the variable is not defined in it.' },
                solution: { tr: '1) Sağ üstteki Environment dropdown\'ında "No Environment" değil doğru ortamın seçili olduğunu doğrula. 2) Environment\'ı aç, baseUrl değişkeninin tanımlı olduğunu kontrol et.', en: '1) Confirm the top-right Environment dropdown is not "No Environment" — pick the right one. 2) Open the environment and verify baseUrl is actually defined there.' },
                codeWrong: `// Hiçbir environment seçili değil (dropdown "No Environment" gösteriyor)
GET https://{{baseUrl}}/users
// literal olarak gönderilir, çözümlenemez`,
                codeFixed: `// "Dev" environment seçili, baseUrl = api-dev.example.com
GET https://{{baseUrl}}/users
// https://api-dev.example.com/users olarak çözümlenir`,
              },
              {
                error: 'Pre-request Script\'te ReferenceError',
                fullMessage: 'ReferenceError: pm is not defined',
                cause: { tr: 'Script Pre-request Script sekmesi yerine yanlışlıkla Tests sekmesine yazılmış, ya da sandbox dışı bir API kullanılıyor.', en: 'Script was pasted into the wrong tab (Tests instead of Pre-request Script), or a non-sandbox API is being used.' },
                solution: { tr: '1) Script\'in doğru sekmede olduğunu kontrol et. 2) Sadece pm.* sandbox API\'lerini kullan (require, fetch gibi Node API\'leri çalışmaz).', en: '1) Verify the script is in the correct tab. 2) Only use pm.* sandbox APIs — Node APIs like require or fetch are not available.' },
                codeWrong: `// Yanlış sekmeye yapıştırılmış, veya desteklenmeyen API kullanılmış
const fetch = require('node-fetch'); // sandbox'ta mevcut değil`,
                codeFixed: `// Pre-request Script sekmesi, sandbox-güvenli
pm.environment.set("timestamp", Date.now());`,
              },
              {
                error: { tr: 'Newman build başarısız: 429 Too Many Requests', en: 'Newman build fails: 429 Too Many Requests' },
                fullMessage: 'AssertionError: expected response to have status code 200 but got 429',
                cause: { tr: 'Hedef API rate limiting uyguluyor; CI çok hızlı ardışık istek gönderiyor.', en: 'The target API enforces rate limiting and CI is firing requests too fast back-to-back.' },
                solution: { tr: '1) Newman çalıştırmasına --delay-request 500 ekle. 2) Test ortamında rate limit\'i artırmayı backend ekibinden iste. 3) Paralel collection çalıştırmalarını sınırla.', en: '1) Add --delay-request 500 to the Newman run. 2) Ask backend to raise the rate limit for the test environment. 3) Limit parallel collection runs in CI.' },
                codeWrong: `newman run collection.json -e ci.json
// çalışma ortasında 429 hataları`,
                codeFixed: `newman run collection.json -e ci.json --delay-request 500
// istekler 500ms aralıklarla — artık 429 yok`,
              },
              {
                error: { tr: 'Body verisi sunucuya ulaşmıyor', en: "Body data isn't reaching the server" },
                fullMessage: 'Server logs: req.body is undefined / empty object {}',
                cause: { tr: 'Body sekmesinde "raw / JSON" yerine yanlış format seçilmiş, veya Content-Type header body ile uyuşmuyor.', en: 'Wrong format selected in the Body tab (e.g. "raw / Text" instead of "raw / JSON"), or Content-Type header mismatches the actual body.' },
                solution: { tr: '1) Body tab → raw → sağdaki dropdown\'dan JSON seç (otomatik Content-Type ekler). 2) Headers\'ta manuel eklenmiş yanlış Content-Type varsa sil.', en: '1) Body tab → raw → select JSON from the right-side dropdown (auto-sets Content-Type). 2) Remove any manually-added conflicting Content-Type header.' },
                codeWrong: `// Body sekmesi "Text" olarak ayarlı, "JSON" değil
{"name": "Ada"}
// Sunucu alır: req.body === undefined`,
                codeFixed: `// Body sekmesi raw → JSON (Content-Type: application/json otomatik eklenir)
{"name": "Ada"}
// Sunucu alır: req.body === { name: "Ada" }`,
              },
              {
                error: { tr: 'CORS hatası (Postman sandbox/embedded bağlamlarında)', en: 'CORS error (in Postman sandbox/embedded contexts)' },
                fullMessage: 'Access to fetch has been blocked by CORS policy',
                cause: { tr: 'Postman Desktop uygulaması normalde CORS\'tan etkilenmez, ama Postman Web veya bir tarayıcı tabanlı mock server kullanırken sunucu Access-Control-Allow-Origin header\'ı döndürmüyor.', en: 'The Postman Desktop app normally bypasses CORS, but Postman Web or a browser-based mock-server flow fails when the server does not return an Access-Control-Allow-Origin header.' },
                solution: { tr: '1) Mümkünse Postman Desktop uygulamasına geç (CORS bypass edilir). 2) Backend\'e CORS header eklenmesini iste. 3) Geçici çözüm: Postman\'ın yerleşik proxy/agent özelliğini kullan.', en: '1) Switch to Postman Desktop where possible (bypasses CORS). 2) Ask backend to add CORS headers. 3) Workaround: use Postman\'s built-in proxy/agent feature.' },
                codeWrong: `// Postman Web, sunucuda CORS header yok
GET https://api.example.com/data
// tarayıcı CORS politikasınca engellendi`,
                codeFixed: `// Postman Desktop uygulamasına geçildi — tarayıcı sandbox kısıtlaması yok
GET https://api.example.com/data
// 200 OK`,
              },
            ],
          },
          pmUnauthorizedDiagnosisFilm,
          pmDiagnosisFlowStep,
          pmDiagnosisFlowPractice,
          {
            type: 'quiz',
            question: 'Bir pm.test() bloğu "SyntaxError: Unexpected token < in JSON at position 0" hatasıyla başarısız oluyor. Kök neden ve çözüm nedir?',
            options: [
              { id: 'a', text: 'Test script\'inde yazım hatası var' },
              { id: 'b', text: 'Sunucu JSON yerine HTML hata sayfası döndürdü — pm.response.json()\'dan önce status kontrolü ekle' },
              { id: 'c', text: 'Collection variable tanımlı değil' },
              { id: 'd', text: 'Postman JSON yanıtları hiç parse edemez' },
            ],
            correct: 'b',
            explanation: 'Position 0\'daki "<" karakteri, JSON değil bir HTML `<html>` hata sayfasının (genelde 500/502) başlangıcıdır. `pm.response.json()` bunu JSON olarak parse etmeye çalışır ve hata fırlatır. Çözüm, `.json()` çağırmadan ÖNCE status code\'un 200 olduğunu doğrulamaktır — böylece test, kafa karıştırıcı bir JSON parse çökmesi yerine net bir "200 bekleniyordu, 500 alındı" mesajıyla başarısız olur.',
            retryQuestion: {
              question: '`pm.response.to.have.status(200)`\'u `pm.response.json()`\'dan önce ekledikten sonra, test hâlâ ara sıra bir JSON parse hatası fırlatıyor — ama sadece 200 yanıtında. Şimdi olası neden nedir?',
              options: [
                { id: 'a', text: 'Status kontrolü bozuk ve gerçekte hiç çalışmıyor' },
                { id: 'b', text: 'Sunucu 200 status döndürdü ama bozuk veya boş bir JSON body ile (örn. boş bir string) — bu, status kontrolünün önlediğinden farklı bir bug' },
                { id: 'c', text: 'Postman 200 status\'ta JSON parse edemez' },
                { id: 'd', text: 'pm.response.json() sadece 4xx/5xx yanıtlarında çalışır' },
              ],
              correct: 'b',
              explanation: 'Status kontrolü özellikle HTML-hata-sayfası durumuna (sunucu HTML ile non-200 döndürür) karşı korur. Gerçekten bozuk veya boş JSON body\'li bir 200 yanıtı tamamen ayrı bir bug\'dır — muhtemelen backend\'in yanıtı serialize etme sorunu — ve kendi teşhisini gerektirir, genelde parse etmeden önce ham response body\'yi (`pm.response.text()`) loglayarak.',
            },
          },
        ],
      },

      // ── 7. MÜLAKAT Q&A ────────────────────────────────────────────────────
      {
        title: '💼 Mülakat Soruları',
        blocks: [
          {
            type: 'simple-box',
            emoji: '💼',
            content: 'Postman mülakat soruları, aracın kendisiyle aynı katmanlı yapıyı izler — ve bir mülakat, sadece araç bilgisini test eden sözel bir sınav değildir: bu bir tanı simülasyonudur. Mülakatçı, gerçek bir API akışına bakıp sistemin içinde ne olduğunu akıl yürüterek söyleyip söyleyemeyeceğinizi öğrenmeye çalışır. Temel seviye soruları günlük Postman bilginizi test eder; orta seviye ortam yönetimi, request chaining ve Newman CI entegrasyonunu; ileri seviye ise mikro servis test mimarisini, data-driven stratejiyi ve API sözleşme korumayı sorgular. Java analojisi: basic soruları "HttpClient ile GET nasıl gönderilir" düzeyinde, advanced soruları ise "büyük bir sprint boyunca bozulan API sözleşmelerini CI pipeline\'ında nasıl tespit edersiniz, ve bulduğunuzda ekip sürecini nasıl yönetirsiniz" düzeyindedir. QA mülakatlarında öne çıkan adaylar hataları ve senaryoları hem araç bilgisi hem de iş etkisi açısından açıklayabilenlerdir.',
          },
          {
            type: 'diagram-svg',
            title: 'Mülakat gözüyle Postman arayüzü',
            svg: uiMockupSvg,
          },
          {
            type: 'simple-box',
            emoji: '🧭',
            content: 'Postman arayüzünü dört ayrı ölçüm aletine bölünmüş bir uçuş kokpiti gibi düşünün — ve deneyimli bir pilot her aletin ne zaman önemli olduğunu sezgisel olarak bilir. Peki neden bu ayrımı öğrenmek gerekiyor? Çünkü mülakatta "Postman\'da header\'ı nereye koyarsınız?" sorusu aslında şunu sorar: arayüzde kaybolmak yerine doğrudan hedefe gidebilir misiniz? Java\'da şu analoji işe yarar: ③ Sekmeler (Authorization / Headers / Body / Tests) bir test sınıfının annotation alanları gibidir, ④ Response alanı assertion\'ların çalıştırıldığı çıktı konsolu gibidir. Cevap verirken görseldeki numaraları referans alın: ① Collections/Environments alanı koleksiyon-değişken-ortam soruları için, ② Method + URL + Send alanı HTTP metodunu ve request kurulumunu sorgulayan sorular için, ③ Authorization / Headers / Body / Tests sekmeleri auth-body-script soruları için, ④ Response alanı status code, schema, response time ve assertion soruları için. QA mülakatında bu haritayı bilmek, "hangi sekmeye gidip ne yapacağınızı" anında söyleyebildiğinizi kanıtlar.',
          },
          pmInterviewApiVsUiFilm,
          pmInterviewStep,
          pmInterviewPractice,
          {
            type: 'interview-questions',
              relatedTopicId: 'postman-interview-tr',
            topic: 'Postman ve API Testi',
            questions: [
              { level: 'basic', q: { tr: 'Postman nedir ve QA mühendisleri neden kullanır?', en: 'What is Postman and why do QA engineers use it?' }, a: { tr: 'Postman, uygulama kodu yazmadan HTTP istekleri göndermeye, yanıtları incelemeye ve otomatik test scriptleri yazmaya yarayan GUI tabanlı bir API test platformudur. QA mühendisleri şu amaçlarla kullanır: manuel API testi (API\'nin çalışıp çalışmadığını keşif amaçlı doğrulama), otomatik regresyon süitleri, dev/staging/prod ortam yönetimi ve koleksiyonları ekiple paylaşma. Keşif testi için Java/Python test kodu yazmaktan çok daha hızlıdır. Koleksiyonlar daha sonra Newman üzerinden CI/CD\'de otomatikleştirilebilir.', en: 'Postman is a GUI-based API testing platform for sending HTTP requests, inspecting responses, and writing automated test scripts without code. QA engineers use it for manual API testing, automated regression suites, environment management, and team sharing. Faster than Java/Python code for exploratory testing; collections automate via Newman in CI/CD.' } },
              { level: 'basic', q: { tr: 'GET, POST, PUT, PATCH ve DELETE arasındaki fark nedir?', en: 'What is the difference between GET, POST, PUT, PATCH, and DELETE?' }, a: { tr: 'GET veri okur ve değiştirmez — idempotent\'tir (iki kez çağırmak aynı sonucu verir). POST yeni kaynak oluşturur — idempotent DEĞİLDİR (iki kez çağırmak iki kaynak oluşturur). PUT kaynağın tamamını değiştirir — eksik alanlar boş kalır. PATCH yalnızca belirtilen alanları günceller. DELETE kaynağı kaldırır — idempotent\'tir. Test ederken idempotency\'yi mutlaka doğrula: GET ve DELETE iki kez çağrıldığında aynı sonucu vermeli.', en: 'GET reads without modifying — idempotent. POST creates — NOT idempotent. PUT replaces entirely. PATCH updates specified fields only. DELETE removes — idempotent. Always verify idempotency in tests.' } },
              { level: 'basic', q: { tr: 'Postman\'da Koleksiyon nedir ve neden kullanışlıdır?', en: 'What is a Collection in Postman and why is it useful?' }, a: { tr: 'Koleksiyon, ilgili API isteklerini URL, metot, header, body ve test scriptleriyle birlikte gruplar. Kullanışlıdır çünkü: 1) URL\'leri her seferinde yeniden yazmazsın, 2) Koleksiyon Runner veya Newman ile tüm koleksiyonu bir seferde çalıştırabilirsin, 3) JSON olarak export edip Git\'te versiyonlayabilirsin, 4) Geliştiricilerle paylaşabilir veya API spec dosyasından import edebilirsin. API için test süiti gibi düşün — HTTP istekleri için JUnit test sınıfı karşılığı.', en: 'Groups related requests with URL, method, headers, body, and test scripts. Run as a suite, export to Git, share with team. Think of it as a JUnit test class for HTTP requests.' } },
              { level: 'basic', q: { tr: 'Hangi durum kodlarını API testlerinde genellikle doğrularsın?', en: 'Which status codes do you assert in API tests?' }, a: { tr: '200 OK (başarılı GET/PATCH), 201 Created (başarılı POST), 204 No Content (başarılı DELETE), 400 Bad Request (geçersiz girdi), 401 Unauthorized (eksik/geçersiz token), 403 Forbidden (geçerli token, yetersiz izin), 404 Not Found, 409 Conflict (çakışan kayıt), 422 Unprocessable Entity (doğrulama hatası), 500 Internal Server Error. Hep tam beklenen kodu assert ederim — kullanıcı oluşturan POST 201 dönmeli, 200 değil.', en: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 500 Server Error. Always assert exact expected code.' } },
              { level: 'basic', q: { tr: 'Postman\'da POST isteğine JSON body nasıl eklenir?', en: 'How do you add a JSON body to a POST request?' }, a: { tr: 'İstek sekmesi → Body → raw → dropdown\'dan JSON seç. JSON nesnesini yaz. Postman JSON seçince Content-Type: application/json header\'ını otomatik ekler. JSON\'un geçerli olduğundan emin ol. Form gönderimleri için Body → form-data veya x-www-form-urlencoded kullan.', en: 'Body tab → raw → select JSON from dropdown. Type the JSON object. Postman auto-adds Content-Type: application/json. For forms use form-data or x-www-form-urlencoded.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da istekler arası veri aktarımı (request chaining) nasıl yapılır?', en: 'How do you pass data between requests (request chaining)?' }, a: { tr: 'Ortam değişkenleri ve test scriptleriyle yapılır. İstek 1\'in Tests sekmesinde: const body = pm.response.json(); pm.environment.set("userId", body.id). İstek 2\'de URL veya body\'de {{userId}} kullan. Örnek akış: POST /login → token\'ı kaydet → GET /profile token ile. İlk adımın başarılı olduğunu assert ettikten sonra değer çıkar (önce durum 200 assert, sonra çıkar). Kayıt → giriş → sipariş oluştur → siparişi doğrula gibi iş akışlarını test etmek için zorunlu.', en: 'Via environment variables and test scripts. In Request 1 Tests tab: pm.environment.set("userId", body.id). Use {{userId}} in Request 2. Always assert success before extracting.' } },
              { level: 'intermediate', q: { tr: 'Newman nedir ve CI/CD\'de nasıl kullanılır?', en: 'What is Newman and how is it used in CI/CD?' }, a: { tr: 'Newman, Postman koleksiyonları için CLI çalıştırıcıdır. Yükle: npm install -g newman. Çalıştır: newman run collection.json -e env.json -r htmlextra. CI/CD\'de: 1) Koleksiyon ve ortamı JSON olarak export et, Git\'e ekle. 2) Pipeline\'da Newman\'ı kur ve çalıştır. 3) --reporter-junit ile CI\'ın parse ettiği JUnit XML raporu üret. 4) Herhangi bir test başarısız olursa Newman 1 çıkış kodu verir — CI build\'i otomatik başarısız kılar. Bu, Postman testlerinin otomatik regresyonun parçası olmasını sağlar.', en: 'CLI runner for Postman collections. Install via npm. In CI/CD: export collection+env to Git, install Newman in pipeline, run collection. --reporter-junit generates XML for CI. Exits with code 1 on failure, failing the build automatically.' } },
              { level: 'intermediate', q: { tr: 'Ortam, koleksiyon ve global değişkenler arasındaki fark nedir?', en: 'Difference between environment, collection, and global variables?' }, a: { tr: 'Global değişkenler tüm workspace\'de geçerli — asla değişmeyen paylaşılan sabitler için (API key gibi). Ortam değişkenleri seçili ortama özgü (dev/staging/prod) — ortama göre değişen base URL ve token\'lar için. Koleksiyon değişkenleri tek koleksiyona özel — koleksiyon çalışması sırasında alınan ve birden fazla istekte paylaşılan tokenlar için. Local değişkenler script\'de oluşturulur ve istek bittikten sonra silinir. Öncelik (aynı ada sahipse hangisi kazanır): Local > Ortam > Koleksiyon > Global.', en: 'Global: whole workspace. Environment: current env only. Collection: one collection. Local: single request. Priority: Local wins over Environment over Collection over Global.' } },
              { level: 'intermediate', q: { tr: 'JSON yanıtındaki belirli bir alanı kontrol eden test nasıl yazılır?', en: 'How do you write a test checking a specific JSON field?' }, a: { tr: 'Önce parse et: const body = pm.response.json(). Sonra Chai assertion\'ları kullan: pm.expect(body.name).to.equal("Alice") tam eşleşme için, pm.expect(body.email).to.include("@") kısmi eşleşme, pm.expect(body.age).to.be.a("number") tür kontrolü, pm.expect(body.roles).to.include("admin") dizi üyeliği, pm.expect(body).to.have.property("id") alanın var olup olmadığı. Her zaman isimlendirilmiş sonuçlar için pm.test() içine sar.', en: 'Parse first: pm.response.json(). Then: .to.equal() exact, .to.include() partial, .to.be.a() type, .to.have.property() existence. Always wrap in pm.test() for named results.' } },
              { level: 'intermediate', q: { tr: 'Sona eren token gerektiren endpoint\'leri nasıl test edersin?', en: 'How do you handle endpoints with expiring auth tokens?' }, a: { tr: 'Koleksiyon düzeyinde Pre-request Script kullanarak token geçerliliğini kontrol et ve gerekirse yenile: const expiry = pm.environment.get("tokenExpiry"); if (!expiry || Date.now() > expiry) { pm.sendRequest(...refresh request..., (err, res) => { pm.environment.set("token", res.json().token); pm.environment.set("tokenExpiry", Date.now() + 3600000) }) }. Bu, her istekten önce çalışarak token\'ı otomatik yeniler — uzun regresyon çalışmalarında manuel müdahale gerekmez.', en: 'Collection-level Pre-request Script checks expiry and refreshes: if (!expiry || Date.now() > expiry) pm.sendRequest to refresh endpoint, save new token. Runs before every request automatically.' } },
              { level: 'advanced', q: { tr: 'Postman\'da data-driven API testi nasıl uygulanır?', en: 'How do you implement data-driven API testing in Postman?' }, a: { tr: 'Data-driven test, her satırın ayrı bir test iterasyonu olduğu harici CSV veya JSON dosyası kullanır. CSV oluştur: email,password,expectedStatus\\nayse@test.com,dogru_sifre,200\\nyanlish@test.com,kotu_sifre,401. Test scriptlerinde: pm.iterationData.get("expectedStatus"). Collection Runner ile (GUI) CSV dosyasını yükle. Newman CLI ile: newman run collection.json --iteration-data data.csv. 100 ayrı istek olmadan 100 giriş senaryosunu test eder — sınır değer testi ve denklik bölümleme için zorunlu.', en: 'Use external CSV/JSON where each row is an iteration. pm.iterationData.get("field") in scripts. Newman: --iteration-data data.csv. Test 100 scenarios without 100 separate requests.' } },
              { level: 'advanced', q: { tr: 'Kapsamlı API test kapsamını sağlamak için hangi stratejileri kullanırsın?', en: 'What strategies ensure comprehensive API test coverage?' }, a: { tr: '1) Happy path — geçerli girdi, beklenen çıktı. 2) Sınır testi — boş string, null, maksimum uzunluk, negatif sayı. 3) Yetkilendirme matrisi — her endpoint\'i auth yok, yanlış auth, yetersiz izin ve doğru auth ile test et. 4) Şema doğrulama — yanıt yapısının sözleşmeyle eşleştiğini kontrol et. 5) Idempotency — GET/DELETE iki kez aynı sonucu vermeli. 6) Hata mesajları — 4xx yanıtlar hata ayıklama için yeterince bilgilendirici mi? 7) Performans — yanıt süresini her kritik endpoint için assert et.', en: 'Happy path, boundary testing, authorization matrix (no auth/wrong auth/insufficient/correct), schema validation, idempotency, informative error messages, performance assertions.' } },
              { level: 'advanced', q: { tr: 'Bir geliştirici "/users endpoint\'i snake_case\'e geçiyor" dedi. Nasıl yaklaşırsın?', en: 'A dev says "/users endpoint is changing to snake_case." How do you respond?' }, a: { tr: 'Bu, mevcut API sözleşmesini bozan bir değişiklik. Yaklaşımım: 1) Koleksiyonu hemen çalıştırarak etkiyi belgele — tüm camelCase assertion\'ları başarısız olur. 2) Frontend eski alan adlarını kullanıyor mu? Evet ise eskalasyon — API versiyonlama (/v2/users) veya deprecation planı gerekir. 3) Devam kararı alınırsa test assertion\'larını güncelle. 4) Koleksiyon açıklamasına ve Git commit mesajına belgele. 5) Geçiş sürecinde v1\'in hâlâ çalıştığını doğrulayan regresyon testleri oluştur. Bu, Postman testlerinin sadece "200 dönüyor mu" değil, API sözleşmesini koruduğunu gösterir.', en: 'Breaking change. Run collection immediately to document impact — all camelCase assertions fail. If frontend uses old names, escalate for versioning. If proceeding, update assertions, document in Git, create v1/v2 regression tests.' } },
              { level: 'advanced', q: { tr: 'Microservice mimarisi için Postman test süiti nasıl tasarlanır?', en: 'How do you design a Postman test suite for microservices?' }, a: { tr: 'Tek workspace, birden fazla koleksiyon — her microservice için bir koleksiyon. Her koleksiyonda: 1) Token yenileme için koleksiyon düzeyi Pre-request Script. 2) Endpoint grubuna göre klasörler. 3) Her deployment ortamı için env dosyaları. 4) "Smoke Tests" klasörü — deployment sağlık kontrolleri için her servisten bir kritik test. 5) "Integration Tests" klasörü — servisler arası akışlar için (kullanıcı oluştur → sipariş oluştur → ödeme yap). Tüm collection.json ve env.json dosyalarını monorepo\'da tests/ dizininde sakla, her main merge\'de CI/CD\'de Newman çalıştır.', en: 'One workspace, one collection per service. Each with: collection-level token refresh, endpoint-grouped folders, env files per environment, smoke tests folder for deployment health, integration tests folder for cross-service flows. Store JSON files in tests/, run Newman in CI/CD on every merge.' } },
              { level: 'advanced', q: { tr: 'Postman\'da JSON şema doğrulaması nasıl yapılır?', en: 'How do you validate JSON schema in Postman?' }, a: { tr: 'Şema doğrulaması, yanıt yapısının sözleşmeyle eşleştiğini kontrol eder — geliştiricilerin yanlışlıkla alan ekleyip kaldırmasını yakalar. Postman tv4 doğrulayıcısını dahil eder. Örnek: const schema = { type: "object", required: ["id","name","email"], properties: { id: {type:"number"}, name: {type:"string"}, email: {type:"string"} } }; pm.test("Şema geçerli", () => { pm.expect(tv4.validate(pm.response.json(), schema)).to.be.true }). Her API yanıtında çalıştır. Geliştirici "email"i yanlışlıkla kaldırırsa veya "id" tipini sayıdan stringe değiştirirse, bu test manuel QA başlamadan önce yakalar.', en: 'Use built-in tv4 validator. Define schema with required fields and types. pm.expect(tv4.validate(body, schema)).to.be.true catches renamed/removed fields immediately.' } },

              { level: 'basic', q: { tr: 'Postman\'da Authorization sekmesinde Bearer Token nasıl ayarlanır?', en: 'How do you set a Bearer Token in Postman Authorization tab?' }, a: { tr: 'İstek sekmesinde Authorization → Type: Bearer Token seç. Token alanına değeri gir — ya direkt (exploratory test için) ya da {{authToken}} gibi ortam değişkeni referansı (otomasyon için). Postman, her istekte otomatik olarak Authorization: Bearer <token> header\'ını ekler. Aynı token\'ı tüm koleksiyonda kullanmak için koleksiyon düzeyinde Authorization ayarla — her istek "Inherit auth from parent" ile devralır. Java\'da RestAssured\'da .header("Authorization", "Bearer " + token) ile aynı şeyi yaparsın.', en: 'Authorization tab → Type: Bearer Token → enter token value or {{authToken}} variable. Set at collection level so all requests inherit it — equivalent to setting a base header in RestAssured.given().header("Authorization","Bearer "+token).' } },
              { level: 'basic', q: { tr: 'Postman Console nedir ve ne zaman kullanılır?', en: 'What is Postman Console and when do you use it?' }, a: { tr: 'Postman Console (View → Show Postman Console veya Ctrl+Alt+C), pre-request ve test scriptlerindeki console.log() çıktılarını, tam HTTP istek/yanıt başlıklarını ve ağ hatalarını gösterir. console.log(pm.response.json()) ile yanıt body\'sini görüntüleyebilirsin. "Why does my test script fail?" sorusunun cevabı genelde burada. Java\'da System.out.println() debug\'ına eşdeğerdir. Özellikle request chaining ve ortam değişkeni sorunlarını debug ederken vazgeçilmezdir.', en: 'Postman Console (Ctrl+Alt+C) shows console.log() output from scripts, full request/response headers, and network errors. Equivalent to System.out.println() in Java debugging. Essential for script debugging and variable chaining issues.' } },
              { level: 'basic', q: { tr: 'API\'de Bearer Token, Basic Auth ve API Key arasındaki fark nedir?', en: 'What is the difference between Bearer Token, Basic Auth, and API Key?' }, a: { tr: 'Bearer Token: Login sonrası alınan JWT/OAuth token — Authorization: Bearer <token> header\'ında gönderilir, süreli geçerli. Basic Auth: kullanıcı:şifre kombinasyonu Base64 encode edilerek Authorization: Basic <encoded> headerında gönderilir — basit ama HTTPS olmadan güvensiz. API Key: servis-servis iletişimi için statik anahtar — genellikle X-API-Key header\'ında veya query parametresi olarak gönderilir (?api_key=xxx). QA olarak üçünü de test etmek gerekir: doğru auth, eksik auth (401), yanlış auth (401 veya 403), geçmiş/süresi dolmuş auth (401).', en: 'Bearer Token: JWT sent in Authorization header, time-limited. Basic Auth: Base64-encoded user:pass in Authorization header, simple but needs HTTPS. API Key: static key in header or query param for service-to-service. As QA, test all three plus missing/expired/wrong auth scenarios.' } },
              { level: 'basic', q: { tr: 'Postman\'da pre-request script ve test script arasındaki fark nedir?', en: 'What is the difference between pre-request and test scripts in Postman?' }, a: { tr: 'Pre-request Script: istek gönderilmeden ÖNCE çalışır. Kullanım: token yenileme, dinamik timestamp üretme, ortam değişkeni hazırlama, request imzalama. Test Script (Tests sekmesi): yanıt alındıktan SONRA çalışır. Kullanım: pm.test() ile assertion yazmak, pm.environment.set() ile sonraki istek için değer kaydetmek. Her ikisi de JavaScript\'tir. Java\'da @BeforeEach ve @AfterEach analojisidir: pre-request = @BeforeEach, test script = @AfterEach (veya @Test assertion\'ları).', en: 'Pre-request: runs BEFORE the request — token refresh, dynamic data prep, signing. Test script: runs AFTER response — pm.test() assertions, saving values for next request. Java analogy: pre-request = @BeforeEach, test script = @AfterEach/@Test.' } },
              { level: 'basic', q: { tr: 'Postman\'da çalışma zamanında URL nasıl dinamik hale getirilir?', en: 'How do you make URLs dynamic at runtime in Postman?' }, a: { tr: 'URL\'de çift süslü parantez kullan: https://{{baseUrl}}/api/{{version}}/users/{{userId}}. Bu değerler aktif Environment\'dan çözümlenir. Örnek: baseUrl = api.mycompany.com, version = v2, userId = script ile set edilen değer. Collection Runner veya Newman ile farklı environment dosyaları verirsen aynı koleksiyon dev/staging/prod\'da çalışır — sıfır kod değişikliği. Java\'da String.format("https://%s/api/%s/users/%s", baseUrl, version, userId) ile aynı konsept.', en: 'Use {{variableName}} in URLs: https://{{baseUrl}}/api/{{version}}/users/{{userId}}. Resolved from active Environment at runtime. Same collection runs on dev/staging/prod by switching environments — zero code change.' } },
              { level: 'basic', q: { tr: 'Response time test etmek neden önemlidir ve Postman\'da nasıl yapılır?', en: 'Why is response time testing important and how is it done in Postman?' }, a: { tr: 'API SLA\'ları (Service Level Agreement) genellikle belirli endpoint\'ler için maksimum yanıt süresi belirtir — örn. GET /products 200ms altında dönmeli. Postman\'da: pm.test("Yanıt süresi 200ms altında", () => { pm.expect(pm.response.responseTime).to.be.below(200) }). Bu test, performans regresyonu tespit eder — değişiklikten önceki 80ms olan endpoint aniden 400ms\'ye çıktığında CI\'da başarısız olur. Java\'da assertTimeout(Duration.ofMillis(200), () -> api.getProducts()) ile aynı yaklaşım.', en: 'API SLAs specify max response times. Assert in Postman: pm.expect(pm.response.responseTime).to.be.below(200). Detects performance regressions — if endpoint slows from 80ms to 400ms after a code change, this test fails in CI.' } },
              { level: 'basic', q: { tr: 'Postman\'da Content-Type header\'ı ne zaman manuel eklemen gerekir?', en: 'When do you need to manually add Content-Type header in Postman?' }, a: { tr: 'POST/PUT/PATCH isteklerinde genellikle gerekir. Body → raw → JSON seçince Postman Content-Type: application/json\'ı otomatik ekler — bu durumda manuel ekleme gerekmez. Form-data seçersen multipart/form-data otomatik eklenir. Ancak: API XML bekliyorsa Content-Type: application/xml manuel ekle. Sunucu isteği reddediyorsa ve 415 Unsupported Media Type alıyorsanız, genellikle eksik veya yanlış Content-Type sebebiyle olur. Her zaman Headers sekmesinde hangi headerların gönderildiğini doğrula.', en: 'Postman auto-adds Content-Type when you select raw→JSON or form-data. Add manually when: API expects XML (application/xml), or you get 415 Unsupported Media Type. Always verify in Headers tab what is actually being sent.' } },
              { level: 'basic', q: { tr: 'Bir API endpoint\'ini ilk kez test ederken hangi adımları izlersin?', en: 'What steps do you follow when testing an API endpoint for the first time?' }, a: { tr: '1) Swagger/OpenAPI dokümantasyonunu incele: endpoint URL, HTTP metot, beklenen body, zorunlu header\'lar ve olası yanıt kodları. 2) Postman\'da yeni istek oluştur, URL ve metodu ayarla. 3) Happy path\'i test et — geçerli giriş, 200/201 bekleniyor. 4) Yanıtın beklenen şemaya uyduğunu doğrula (alan adları, tipler). 5) Negatif case\'leri test et: eksik zorunlu alan (400), yanlış format (422), yetkilendirme (401/403). 6) Edge case\'ler: boş string, max uzunluk, özel karakterler. 7) Test scriptlerini yaz ve collection\'a kaydet.', en: 'Check Swagger docs, create request, test happy path (200/201), validate schema, test negative cases (400/401/403/422), test edge cases (empty/null/max-length), write assertions, save to collection.' } },
              { level: 'intermediate', q: { tr: 'OAuth2 akışını Postman\'da nasıl test edersin?', en: 'How do you test OAuth2 flow in Postman?' }, a: { tr: 'Postman\'da iki yol var. 1) Manuel: POST /oauth/token ile grant_type, client_id, client_secret, username, password gönder → access_token\'ı test scriptinde pm.environment.set("accessToken", res.json().access_token) ile kaydet → sonraki isteklerde Authorization: Bearer {{accessToken}} kullan. 2) Otomatik: Authorization → OAuth 2.0 → "Get New Access Token" → callback URL, scope, client ID gir → Postman token akışını otomatik yönetir. Test edilmesi gerekenler: geçersiz credentials, süresi dolmuş token refresh, scope kısıtlamaları, token revocation.', en: 'Manual: POST /oauth/token with credentials, save access_token via pm.environment.set(). Automatic: Authorization → OAuth2 → "Get New Access Token". Test: invalid credentials, expired token refresh, scope restrictions, token revocation.' } },
              { level: 'intermediate', q: { tr: 'Postman Mock Server nedir ve frontend testi için nasıl kullanılır?', en: 'What is Postman Mock Server and how is it used for frontend testing?' }, a: { tr: 'Mock Server, gerçek backend hazır olmadan önce API yanıtlarını simüle eden sahte bir endpoint oluşturur. Nasıl: 1) Koleksiyona "Examples" kaydet — her istek için beklenen yanıt şablonunu yaz (status, body, header). 2) Mock Server oluştur → Postman bir URL verir (örn. https://xxx.mock.pstmn.io). 3) Frontend bu URL\'e istek gönderir, Postman kayıtlı örneği döndürür. Kullanım senaryosu: backend team sprint\'in ortasında, frontend team mock URL\'i kullanarak geliştirme ve testlere devam eder. Java\'da WireMock veya Mockito kullanımına eşdeğerdir.', en: 'Creates fake API endpoints using saved Examples in collections. Frontend hits the mock URL and gets predefined responses. Unblocks frontend development before backend is ready. Equivalent to WireMock in Java testing.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da negatif test senaryolarını nasıl organize edersin?', en: 'How do you organize negative test scenarios in Postman?' }, a: { tr: 'Koleksiyon içinde ayrı klasörler oluştur: "Happy Path", "Negative Tests", "Edge Cases". Negative Tests klasöründe: "POST /users — eksik email alanı (400 bekleniyor)", "POST /users — geçersiz email formatı (422)", "GET /users/99999 — olmayan ID (404)", "DELETE /users/1 — yetersiz izin (403)". Her negatifin kendi isteği ve test scripti olsun: pm.test("400 döndü", () => pm.expect(pm.response.code).to.equal(400)). Açıklayıcı isimlendirme kritik — 3 ay sonra neden bu isteğin 400 döndüğünü anlamak için.', en: 'Create folders: "Happy Path", "Negative Tests", "Edge Cases". Each negative case is a separate request with a descriptive name showing input and expected status. Assert exact error codes. Descriptive naming is crucial for maintainability.' } },
              { level: 'intermediate', q: { tr: 'Collection Runner\'da iterasyon (iteration) sayısı ne işe yarar?', en: 'What does the iteration count do in Collection Runner?' }, a: { tr: 'Koleksiyonun kaç kez tekrar çalıştırılacağını belirler. Tek iterasyon: normal collection run (varsayılan). Birden fazla iterasyon: CSV/JSON data dosyasıyla birleşince her iterasyon bir veri satırını kullanır — bu data-driven testing\'dir. Örnek: 100 satırlı CSV ve iterations=100 → 100 farklı kullanıcıyla 100 login denemesi. Delay değeri (ms): iterasyonlar arasındaki bekleme süresi — sunucu darboğazı önlemek için. Newman\'da: --iteration-count 100 --delay-request 500. Java\'da @ParameterizedTest ile JUnit 5\'in veri tabanlı testi gibi.', en: 'Sets how many times the collection repeats. Combined with CSV data file: each iteration uses one row = data-driven testing. With 100-row CSV and 100 iterations → 100 different test scenarios. Equivalent to @ParameterizedTest in JUnit 5.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da bir POST isteğine form-data ve raw JSON ne zaman kullanılır?', en: 'When do you use form-data vs raw JSON in Postman POST requests?' }, a: { tr: 'form-data: HTML <form> gönderimlerinde veya dosya upload\'larında kullanılır (multipart/form-data). Dosya seçimi yapılabilir. x-www-form-urlencoded: URL-encoded form verileri için (key=value&key2=value2 formatı). Bazı eski API\'lar bu formatı kullanır. raw → JSON: modern REST API\'larda en yaygın format. Backend JSON parser bekliyor. raw → XML: SOAP servisleri veya XML bazlı REST için. GraphQL: Body → GraphQL sekmesi. Her API\'ın Swagger dokümantasyonuna bak: "requestBody" altında "application/json" veya "multipart/form-data" yazar — buna göre seç.', en: 'form-data: HTML forms and file uploads. x-www-form-urlencoded: legacy APIs with URL-encoded params. raw→JSON: modern REST APIs. raw→XML: SOAP or XML REST. Check Swagger requestBody content-type to choose correctly.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da "CORS error" veya "SSL error" aldığında ne yaparsın?', en: 'What do you do when you get CORS or SSL errors in Postman?' }, a: { tr: 'CORS hatası: CORS, tarayıcı güvenlik kısıtlamasıdır — Postman bir tarayıcı değil (desktop app), bu yüzden Postman\'da CORS hatası almamalısın. Alıyorsan muhtemelen Postman web versiyonunu kullanıyorsun. Desktop uygulamayı kullan. SSL/TLS hatası "Error: SSL certificate verification failed": Settings → General → "SSL certificate verification" kapat (SADECE test ortamı için — prod\'da kullanma!). Alternatif: CA sertifikasını Postman\'a import et. Bu, Java\'da javax.net.ssl.trustStore ayarı veya HttpClient\'ta SSL context configure etmeye benzer.', en: 'CORS errors: only affect browser-based Postman. Use desktop app. SSL errors: Settings → disable SSL verification (test only, never production). Or import CA cert into Postman. Like configuring trustStore in Java HttpClient.' } },
              { level: 'intermediate', q: { tr: 'Birden fazla kişiyle koleksiyonu paylaşmanın en iyi yolu nedir?', en: 'What is the best way to share a Postman collection with multiple team members?' }, a: { tr: 'Üç yöntem var. 1) Postman Workspace (önerilen): Takım Workspace\'i oluştur → koleksiyonu oraya taşı → ekip üyelerini davet et. Herkes her zaman güncel versiyona erişir. 2) Git (CI/CD için): koleksiyonu JSON olarak export et (v2.1), repo\'ya commit et. PR review süreci sağlar, değişiklikleri takip eder. 3) Postman "Run in Postman" butonu: public link paylaşımı için. Öneri: Workspace + Git kombinasyonu — Workspace anlık paylaşım için, Git ise version control ve CI/CD için. Java projelerindeki Maven artifactory veya Nexus benzeri bir yaklaşım.', en: 'Best: Postman Workspace for real-time sharing + Git for version control and CI/CD. Export collection JSON to repo, team imports. "Run in Postman" link for public sharing. Workspace = immediate sync; Git = auditability and PR review.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da response body\'deki nested JSON\'a nasıl erişirsin?', en: 'How do you access nested JSON in Postman response body?' }, a: { tr: 'pm.response.json() tüm yanıtı JavaScript object\'ine parse eder. Nested alana nokta notasyonu veya köşeli parantez ile eriş: const body = pm.response.json(); body.user.address.city — nested. body.items[0].price — array elemanı. body.data[0].attributes.name — derin nested. Dinamik key için: body["some-hyphenated-key"]. Null güvenliği için: body?.user?.address?.city (optional chaining). Test örneği: pm.test("Şehir İstanbul", () => pm.expect(body.user.address.city).to.equal("Istanbul")). Java\'da JSONPath veya Jackson\'da objectNode.get("user").get("address").get("city").asText() ile aynı.', en: 'pm.response.json() parses to JS object. Dot notation: body.user.address.city. Array index: body.items[0].price. Optional chaining for safety: body?.user?.city. Equivalent to JSONPath or Jackson nested field access in Java.' } },
              { level: 'intermediate', q: { tr: 'Test senaryolarında "flaky" (kararsız) testlerin sebebi ne olabilir?', en: 'What causes flaky tests in Postman test suites?' }, a: { tr: 'Yaygın flaky test nedenleri: 1) Race condition — istek A tamamlanmadan istek B çalışıyor. Çözüm: Collection Runner\'da delay ekle veya istek B\'nin pre-request script\'inde bekleme mantığı yaz. 2) Ortam değişkeni kirliği — önceki başarısız run\'dan kalan geçersiz token. Çözüm: collection başında tüm değişkenleri temizle. 3) Test verisi çakışması — iki paralel run aynı kullanıcı adını oluşturmaya çalışıyor. Çözüm: dinamik + unique test verisi kullan (pm.variables.set("email", "test_"+Date.now()+"@test.com")). 4) Ağ gecikmesi — timeout değerini artır.', en: 'Race conditions (fix: add delay between requests), stale environment variables (fix: clear at collection start), test data conflicts (fix: use dynamic unique data like Date.now()), network timeouts (fix: increase timeout in settings).' } },
              { level: 'intermediate', q: { tr: 'Newman\'da HTML raporu nasıl oluşturulur ve CI\'da nasıl arşivlenir?', en: 'How do you generate HTML reports with Newman and archive them in CI?' }, a: { tr: 'HTMLExtra reporter kur: npm install -g newman-reporter-htmlextra. Çalıştır: newman run collection.json -e env.json -r htmlextra --reporter-htmlextra-export report.html. Aynı anda birden fazla reporter: -r cli,htmlextra,junit — hem terminale yaz hem HTML hem JUnit XML üret. CI/CD (GitHub Actions): test adımından sonra "Upload Artifact" action ile report.html\'i arşivle. Jenkins\'te "Publish HTML Reports" plugin. Bu raporlar: hangi testlerin geçtiği/kaldığı, yanıt süreleri, tam request/response detayı. Java TestNG raporlarına eşdeğer.', en: 'npm install -g newman-reporter-htmlextra. Run: newman run ... -r cli,htmlextra,junit. In GitHub Actions use "Upload Artifact" to archive report.html. In Jenkins use "Publish HTML Reports" plugin.' } },
              { level: 'advanced', q: { tr: 'Postman ile contract testing (sözleşme testi) nasıl uygulanır?', en: 'How do you implement contract testing with Postman?' }, a: { tr: 'Contract testing, API üretici ve tüketici arasındaki sözleşmenin (field adları, tipler, zorunlu alanlar) her iki tarafça korunduğunu doğrular. Postman\'da şema doğrulama + tv4 ile uygulama: 1) OpenAPI/Swagger spec\'ten şema tanımla. 2) Her yanıt için şema doğrulaması yap: pm.expect(tv4.validate(body, schema)).to.be.true. 3) Bu testleri koleksiyona ekle ve CI\'da çalıştır. Üretici (backend) bir alanı kaldırırsa veya tipini değiştirirse, tüketici (frontend) koleksiyonundaki şema testi derhal başarısız olur. Pact gibi dedicated contract testing tool\'larına alternatif olarak Postman bu ihtiyacı karşılayabilir.', en: 'Define schema from OpenAPI spec, validate every response with tv4. Run in CI: if producer removes/renames a field, consumer collection fails immediately. Alternative to dedicated tools like Pact, implementable directly in Postman.' } },
              { level: 'advanced', q: { tr: 'Postman koleksiyonunun versiyonlaması ve change management\'ı nasıl yapılır?', en: 'How do you version and manage changes to Postman collections?' }, a: { tr: '1) Git-first yaklaşımı: collection.json dosyasını src/main değil tests/postman/ dizininde tut. Her değişiklik PR\'ı gerektirir — gözden geçirilebilir ve revert edilebilir. 2) Branch stratejisi: feature/add-payment-endpoint gibi branch\'lerde koleksiyonu güncelle, main\'e merge\'de CI çalışır. 3) Koleksiyon versiyonlama: Postman, Koleksiyon Forks özelliğiyle paralel versiyonları destekler — legacy endpoint için v1 fork\'u korurken v2\'yi geliştir. 4) Semantic versioning: koleksiyon adını güncelle "Payment API Tests v2.1.0" — her breaking change major version artırır. 5) Changelog: koleksiyon Description alanını CHANGELOG olarak kullan.', en: 'Store collection.json in tests/postman/ in Git. PR-based changes for review and revert. Feature branches for new endpoints. Use Postman Forks for parallel v1/v2 maintenance. Semantic versioning in collection name. Description field as CHANGELOG.' } },
              { level: 'advanced', q: { tr: 'Postman\'ı Kubernetes/Docker ortamında çalıştırmak için ne yapmalısın?', en: 'How do you run Postman tests in a Kubernetes or Docker environment?' }, a: { tr: 'Newman Docker image kullan: docker pull postman/newman. Çalıştır: docker run -v $(pwd)/tests:/etc/newman postman/newman:latest run collection.json -e env.json. Kubernetes\'te Job manifest: image: postman/newman, command: ["run","collection.json","-e","env.json"], volumeMount ile collection dosyalarını bağla. Avantajları: 1) CI/CD pipeline\'da ayrı container — diğer servislerden izole. 2) Her run temiz ortam — önceki run\'dan kirlilik yok. 3) Paralel çalışma: farklı ortamlar için aynı anda birden fazla Newman pod\'u. Secret yönetimi: Kubernetes Secret veya Vault ile env dosyasındaki token\'ları güvenli tut.', en: 'Use postman/newman Docker image. Mount collection files as volumes. In Kubernetes use Job manifest. Benefits: isolation, clean environment per run, parallel execution across environments. Manage secrets via Kubernetes Secrets or Vault.' } },
              { level: 'advanced', q: { tr: 'Postman ile performance/load testi yapılabilir mi?', en: 'Can you do performance/load testing with Postman?' }, a: { tr: 'Postman temel düzeyde yanıt süresi assertion\'ı destekler (pm.response.responseTime), ancak gerçek load testing için tasarlanmamıştır. Bunun için Newman\'ı paralel çalıştırabilirsin: birden fazla terminal penceresi veya CI\'da paralel job\'lar. Örnek: 10 paralel newman run — yaklaşık eşzamanlılık simüle eder. Ancak gerçek load testi için JMeter (bu projede ayrı sekme), Gatling, k6 veya Locust kullan. Postman koleksiyonunu k6\'ya dönüştürebilirsin: k6\'nın Postman import özelliği veya postman-to-k6 npm paketi. Java QA\'lar genelde Postman keşif testi için, JMeter/Gatling load testi için kullanır.', en: 'Postman supports response time assertions but is not designed for load testing. Run Newman in parallel for basic concurrency. For real load testing use JMeter, Gatling, k6 (k6 can import Postman collections). Postman = exploratory; JMeter = load testing.' } },
              { level: 'advanced', q: { tr: 'API güvenlik testini Postman\'da nasıl yaparsın?', en: 'How do you perform API security testing in Postman?' }, a: { tr: 'Postman ile temel güvenlik testi: 1) Auth bypass: token olmadan istek gönder (401 bekleniyor), başka kullanıcının token\'ıyla istek gönder (403 bekleniyor), expired token (401). 2) Injection: SQL injection girişi: {"name": "admin\'--"}, XSS: {"name": "<script>alert(1)</script>"} — sunucu bunları strip etmeli veya escape etmeli. 3) IDOR (Insecure Direct Object Reference): /users/1 için geçerli token iken /users/2\'ye eriş — 403 bekleniyor. 4) Rate limiting: aynı endpoint\'i hızlıca çok kez çağır — 429 Too Many Requests bekleniyor. 5) Mass assignment: body\'ye yetkisiz alan ekle ({"isAdmin": true}) — sunucu görmezden gelmeli. Derin güvenlik testi için OWASP ZAP veya Burp Suite kullan.', en: 'Auth bypass (no token→401, wrong user token→403), injection attacks in body fields, IDOR testing, rate limiting verification (429), mass assignment checks. For deep security testing use OWASP ZAP or Burp Suite alongside Postman.' } },
              { level: 'advanced', q: { tr: 'Büyük ekiplerde Postman test süitlerini nasıl bakımlı tutarsın?', en: 'How do you maintain Postman test suites in large teams?' }, a: { tr: '1) Naming convention: "[HTTPMethod] [endpoint] — [beklenti]" formatı (örn. "POST /users — 201 unique email"). 2) Folder structure: her microservice için ayrı koleksiyon, her koleksiyonda Happy Path / Negative / Edge Case / Integration klasörleri. 3) Collection-level scripts: token yenileme ve setup kodunu her istek yerine koleksiyon düzeyine taşı. 4) Code review: koleksiyon JSON dosyaları Git\'te, PR ile gözden geçirilir. 5) Quarterly cleanup: kullanılmayan request\'leri sil, duplicate assertion\'ları temizle. 6) Onboarding dokümantasyonu: koleksiyon Description\'ına "Nasıl başlatılır" yaz. 7) CI\'da "golden run": main branch her gecenin sonunda tam koleksiyon çalıştırır — regresyon base line.', en: 'Naming convention for every request, folder structure per microservice, collection-level scripts for shared setup, PR-based review via Git, quarterly cleanup, onboarding docs in collection description, nightly CI baseline run.' } },
              { level: 'advanced', q: { tr: 'Postman\'da API monitoring nasıl kurulur?', en: 'How do you set up API monitoring in Postman?' }, a: { tr: 'Postman Monitors, koleksiyonları belirli aralıklarla otomatik çalıştırır (5 dakikada bir, saatte bir vb.). Kurulum: Koleksiyon → "..." → Monitor → Create Monitor → interval ve environment seç. Sonuçlar Postman\'ın web arayüzünde görünür, e-posta/Slack alert\'i konfigüre edilebilir. Kullanım: 1) Production API\'nin her 5 dakikada health check\'i. 2) Kritik user journey\'nin saatte bir doğrulanması (login → order → payment). 3) SLA metrik takibi — yanıt süresi threshold\'u aştığında alert. Ücretli özellik, ücretsiz tier\'da sınırlı. Alternatif: Newman\'ı cron job ile kendin zamanla (ücretsiz, on-premise).', en: 'Postman Monitors run collections on schedules (5 min, hourly). Set email/Slack alerts for failures. Use for production health checks, critical user journey verification, SLA monitoring. Free tier limited; alternative: schedule Newman via cron job on own infrastructure.' } },
              { level: 'advanced', q: { tr: 'GraphQL API\'leri Postman\'da nasıl test edilir?', en: 'How do you test GraphQL APIs in Postman?' }, a: { tr: 'Postman\'da GraphQL desteği: 1) Body → GraphQL sekmesi seç. 2) Introspection: Postman, şemayı otomatik yükleyebilir (API URL\'i gir → "Load Schema"). 3) Query yaz — autocomplete çalışır. 4) Variables kısmına JSON değişkenleri ekle. 5) Assertions: REST ile aynı — pm.response.json(). Rest API\'de GET /users yerine GraphQL\'de: query { users { id name email } }. Mutation test: mutation { createUser(name:"Ali", email:"ali@test.com") { id } }. Error handling: GraphQL her zaman 200 döndürür, hata errors[] alanında gelir — pm.expect(body.errors).to.be.undefined ile hata olmamasını doğrula.', en: 'Body → GraphQL tab. Postman auto-loads schema via introspection. Autocomplete works. Test queries and mutations. Important: GraphQL always returns 200 — check body.errors is undefined. pm.expect(body.errors).to.be.undefined for error validation.' } },

              { level: 'basic', q: { tr: 'Postman\'da "Params" sekmesi ne işe yarar?', en: 'What is the Params tab used for in Postman?' }, a: { tr: 'Params sekmesi, URL query parametrelerini yönetir. GET /users?page=2&limit=10&status=active gibi parametreleri URL\'e elle yazmak yerine tabloya ekle: Key=page, Value=2. Postman otomatik olarak URL\'i oluşturur. Devre dışı bırakmak istediğin parametrelerin checkbox\'ını kaldır — testi kolaylaştırır. Path parametreler için (:userId gibi) URL\'de direkt yazılır, Params sekmesi değil. Test senaryosu: sayfalama testinde farklı page ve limit kombinasyonları. Java\'da RestAssured\'da .queryParam("page", 2) ile aynı.', en: 'Manages URL query parameters as key-value pairs. Add Key=page, Value=2 instead of typing ?page=2&limit=10 manually. Uncheck parameters to disable them. Path params (:userId) go directly in the URL. Equivalent to .queryParam() in RestAssured.' } },
              { level: 'basic', q: { tr: 'Postman\'da bir isteği test ettikten sonra "Save" yaparken ne dikkat etmelisin?', en: 'What should you pay attention to when saving a request in Postman?' }, a: { tr: '"Save" yaparken: 1) İsim açıklayıcı olsun: "GET /users — aktif kullanıcılar sayfalı" > "getUsers". 2) Doğru Collection ve Folder\'a kaydet — yanlış yere kaydedilen request kaybedilmiş gibidir. 3) Description alanını doldur: neden bu request var, hangi business case\'i test ediyor. 4) Hassas veriyi (şifre, API key) direkt body\'e yazma — {{password}} gibi ortam değişkeni kullan. 5) Request body template\'ini temiz bırak — gerçek test verilerini her çalıştırmada değiştir veya Collection Runner\'da data file kullan. Kaydettikten sonra koleksiyon altında göründüğünü doğrula.', en: 'Use descriptive names, save to correct folder, fill Description with business context, use {{variables}} instead of hardcoded secrets, keep template body clean for reuse. Verify the request appears under the correct collection after saving.' } },
              { level: 'basic', q: { tr: 'pm.response nesnesi hangi bilgileri sunar?', en: 'What information does the pm.response object provide?' }, a: { tr: 'pm.response, test scriptinde yanıtın tüm detaylarına erişim sağlar: pm.response.code → HTTP status code (200, 404...). pm.response.status → status text ("OK", "Not Found"). pm.response.responseTime → ms cinsinden yanıt süresi. pm.response.headers → tüm yanıt headerları. pm.response.json() → body\'yi JSON parse eder. pm.response.text() → body\'yi ham metin döndürür. pm.response.size() → body + header boyutu (bytes). Örnek kullanım: pm.test("201 Created", () => pm.expect(pm.response.code).to.equal(201)); pm.test("<500ms", () => pm.expect(pm.response.responseTime).to.be.below(500)). Java RestAssured\'da response.getStatusCode(), response.getTime(), response.getHeader() ile aynı bilgiler.', en: 'pm.response.code (status code), .status (status text), .responseTime (ms), .headers (all headers), .json() (parsed body), .text() (raw body), .size() (byte size). Equivalent to response.getStatusCode()/.getTime()/.getHeader() in RestAssured.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da aynı anda birden fazla ortamı (environment) test etmek gerekirse ne yaparsın?', en: 'How do you test multiple environments simultaneously in Postman?' }, a: { tr: 'Postman GUI\'de aynı anda tek ortam aktif olabilir — bunu Newman ile çözersin. Newman ile paralel çalıştır: newman run collection.json -e dev.json & newman run collection.json -e staging.json & newman run collection.json -e prod.json — üç terminal penceresinde eş zamanlı. CI/CD\'de (GitHub Actions): matrix strategy kullan: matrix: env: [dev, staging, prod] → her env için ayrı job. Raporları ayrı dosyalara yaz: --reporter-htmlextra-export report-dev.html. Bu yaklaşım her ortamı izole eder — bir ortamın başarısızlığı diğerini etkilemez. Java\'da @Test metodlarında @Tag kullanarak ortam bazlı test gruplarını çalıştırmaya benzer.', en: 'GUI only runs one env at a time. Use Newman in parallel: run with different -e env.json files simultaneously. In CI/CD use matrix strategy for parallel jobs per environment. Separate report files per env for isolated results.' } },
              { level: 'intermediate', q: { tr: 'API test süitini daha hızlı çalıştırmak için ne yapabilirsin?', en: 'How do you make your API test suite run faster?' }, a: { tr: '1) Paralel çalıştırma: Newman\'da --parallel flag\'i (deneysel) veya CI matrix ile servis bazlı paralel job\'lar. 2) Bağımsız test grupları ayır: login testleri ayrı, ürün testleri ayrı — bağımlılık olmayan gruplar paralel çalışır. 3) Gereksiz assertion\'ları temizle: her test 10 assertion doğrulamak zorunda değil — kritik olanları bırak. 4) Mock server kullan: yavaş external servisler için Postman mock veya WireMock. 5) Delay değerini kaldır: test ortamı hızlıysa request arası gecikme gereksizdir. 6) Koleksiyonu böl: smoke (5 dk) vs full regression (30 dk) — PR merge\'de smoke, nightly\'de full regression çalışır. Java\'da test kategorizasyonu (@Tag("smoke") @Tag("regression")) ile aynı yaklaşım.', en: 'Parallel Newman runs, independent test group separation, minimize assertions per test, use mocks for slow external services, remove unnecessary delays, split into smoke vs full regression suites.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da test çalıştırmadan önce test verisini nasıl hazırlarsın?', en: 'How do you prepare test data before running tests in Postman?' }, a: { tr: 'İki yaklaşım: 1) Collection-level pre-request script ile setup: koleksiyon başlamadan önce çalışır — örn. POST /users ile test kullanıcısı oluştur, ID\'yi ortam değişkenine kaydet, diğer testlerde kullan. 2) Data file yaklaşımı: CSV/JSON\'da önceden hazırlanmış veriler — Collection Runner veya Newman\'a data file ver. Teardown (temizlik): koleksiyonun son request\'i olarak DELETE endpoint\'ini çağır, oluşturulan test verisini sil. Önemli: test ortamını temiz bırak, paralel testlerin birbirini etkilemesini önle. Java\'da @BeforeClass ile test fixture hazırlamaya eşdeğerdir.', en: 'Setup via collection-level pre-request (create test user, save ID to env var) or data files (CSV/JSON). Teardown: last request deletes created data. Keep test env clean to prevent parallel test interference. Equivalent to @BeforeClass in Java.' } },
              { level: 'intermediate', q: { tr: 'Postman\'da yanıt header\'larını nasıl doğrularsın?', en: 'How do you assert response headers in Postman?' }, a: { tr: 'pm.response.headers objesi yanıt header\'larını içerir. Örnekler: pm.test("Content-Type JSON", () => { pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json") }). pm.test("CORS header var", () => { pm.expect(pm.response.headers.get("Access-Control-Allow-Origin")).to.not.be.undefined }). pm.test("Cache-Control no-store", () => { pm.expect(pm.response.headers.get("Cache-Control")).to.include("no-store") }). Güvenlik headerları (OWASP): X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security. API security testinde bu headerları mutlaka doğrula. Java\'da RestAssured\'da .then().header("Content-Type", containsString("json")) ile aynı.', en: 'pm.response.headers.get("Content-Type"). Assert CORS headers, Cache-Control, security headers (X-Content-Type-Options, X-Frame-Options, HSTS). Critical for API security testing. Equivalent to .then().header() in RestAssured.' } },
              { level: 'advanced', q: { tr: 'OpenAPI/Swagger dosyasından Postman koleksiyonu nasıl import edilir ve bu yaklaşımın avantajları nelerdir?', en: 'How do you import an OpenAPI/Swagger spec into Postman and what are the benefits?' }, a: { tr: 'Import: File → Import → swagger.json veya swagger.yaml dosyasını sürükle-bırak veya URL gir. Postman, tüm endpoint\'leri otomatik koleksiyon olarak oluşturur. Avantajları: 1) Sıfır manuel request oluşturma — yüzlerce endpoint için otomatik. 2) Request body şemaları Swagger\'dan alınır — type, required field\'lar hazır. 3) Swagger\'daki her değişiklik tekrar import ile koleksiyonu günceller — senkronizasyon. 4) Contract testing başlangıcı — swagger şemasını baz alarak tv4 assertion\'ları ekle. Dezavantajlar: import sonrası test scriptleri yoktur, bunları kendin yazman gerekir. İş akışı: geliştirici swagger günceller → QA import eder → test scriptlerini ekler → CI\'da çalışır. Java RestAssured\'da io.swagger.parser ile aynı kavram.', en: 'File → Import swagger.json/yaml. Postman auto-generates all endpoints as collection. Benefits: zero manual setup, body schemas from spec, re-import on spec changes. Disadvantage: no test scripts auto-generated. Workflow: dev updates swagger → QA imports → adds assertions → CI runs.' } },
              { level: 'advanced', q: { tr: 'Postman\'da retry mekanizması nasıl uygulanır?', en: 'How do you implement a retry mechanism in Postman?' }, a: { tr: 'Postman yerleşik retry özelliği sunmaz, ancak pre-request script\'te manuel uygulanabilir. Yaklaşım: pm.environment.get("retryCount") ile sayacı tut. Pre-request script\'te: const count = parseInt(pm.environment.get("retryCount") || 0); if (count < 3 && pm.response && pm.response.code !== 200) { pm.environment.set("retryCount", count + 1); postman.setNextRequest(pm.info.requestName) }. Bu yaklaşım flaky third-party API\'larda veya eventually consistent sistemlerde kullanışlıdır. Dikkat: sonsuz döngü riskine karşı mutlaka maksimum retry sayısı belirle. Production\'da retry exponential backoff ile birlikte kullanılmalı. Java\'da Awaitility veya @RetryingTest annotation\'ına eşdeğerdir.', en: 'No built-in retry, implement via pre-request script: track retryCount in env var, if response code is wrong and count < 3, increment count and use postman.setNextRequest() to re-run. Always set max retry limit. Equivalent to @RetryingTest or Awaitility in Java.' } },
            ],
          },
          {
            type: 'glossary-section',
            terms: [
              { term: 'API', definition: { tr: 'Application Programming Interface — uygulamalar arası iletişim sözleşmesi.', en: 'Application Programming Interface — a contract between applications.' } },
              { term: 'REST', definition: { tr: 'HTTP üzerinden çalışan durumsuz API mimarisi. En yaygın stil.', en: 'Stateless API architecture over HTTP. Most common style.' } },
              { term: 'Collection', definition: { tr: 'İlgili isteklerin grubu. Export, Git, Newman ile çalıştırılabilir.', en: 'Group of related requests. Exportable, versionable, runnable.' } },
              { term: 'Environment', definition: { tr: 'Ortam bazlı değişkenler. dev/staging/prod arası tek tıkla geçiş.', en: 'Environment-specific variables. One-click switch between dev/staging/prod.' } },
              { term: 'pm.test()', definition: { tr: 'Test assertion fonksiyonu. İsim + assertion içerir.', en: 'Named test assertion function.' } },
              { term: 'pm.expect()', definition: { tr: 'Chai tabanlı değer doğrulama. .to.equal(), .include(), .be.a() gibi.', en: 'Chai-based value assertion.' } },
              { term: 'Newman', definition: { tr: 'Koleksiyonları CLI\'dan çalıştırır. CI/CD için zorunlu.', en: 'CLI runner for collections. Essential for CI/CD.' } },
              { term: 'Pre-request Script', definition: { tr: 'İstekten önce çalışan JavaScript. Token yenileme veya dinamik değer için.', en: 'JavaScript before request. Token refresh or dynamic values.' } },
              { term: 'Bearer Token', definition: { tr: 'Authorization: Bearer <token> formatında JWT.', en: 'JWT sent as Authorization: Bearer <token>.' } },
              { term: 'ECONNREFUSED', definition: { tr: 'Sunucu çalışmıyor veya yanlış port. Sunucuyu başlat.', en: 'Server not running or wrong port.' } },
            ],
          },
        ],
      },
    ],
  },
}
