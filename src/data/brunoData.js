// brunoData.js - Bruno API Client Learning Page
// Git-native, offline-first API testing alternative to Postman
// ~4500 satır hedefi: 8 seksiyon, her biri 6-7 blok

const brunoFlowSvg = `<svg viewBox='0 0 600 200' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <defs>
    <marker id='ar' markerWidth='8' markerHeight='6' refX='7' refY='3' orient='auto'><path d='M0,0 L0,6 L8,3 z' fill='#10b981'/></marker>
  </defs>
  <rect x='20' y='50' width='120' height='100' rx='10' fill='#6366f1' opacity='0.2' stroke='#6366f1' stroke-width='1.5'/>
  <text x='80' y='80' fill='#a78bfa' text-anchor='middle' font-size='18'>📦</text>
  <text x='80' y='100' fill='#a78bfa' text-anchor='middle' font-size='12' font-weight='bold'>Bruno</text>
  <text x='80' y='115' fill='#9ca3af' text-anchor='middle' font-size='10'>Git-First</text>
  <line x1='145' y1='100' x2='240' y2='100' stroke='#10b981' stroke-width='2' marker-end='url(#ar)'/>
  <text x='192' y='92' fill='#10b981' text-anchor='middle' font-size='10' font-family='monospace'>GET /users</text>
  <rect x='245' y='30' width='140' height='140' rx='10' fill='#7c3aed' opacity='0.15' stroke='#7c3aed' stroke-width='1.5'/>
  <text x='315' y='70' fill='#a78bfa' text-anchor='middle' font-size='24'>🖥️</text>
  <text x='315' y='95' fill='#c4b5fd' text-anchor='middle' font-size='12' font-weight='bold'>API Server</text>
  <text x='315' y='112' fill='#9ca3af' text-anchor='middle' font-size='10'>:3000</text>
  <line x1='390' y1='100' x2='480' y2='100' stroke='#60a5fa' stroke-width='1.5' marker-end='url(#ar)'/>
  <text x='435' y='92' fill='#60a5fa' text-anchor='middle' font-size='10'>200 OK</text>
  <rect x='485' y='60' width='100' height='80' rx='10' fill='#10b981' opacity='0.15' stroke='#10b981' stroke-width='1.5'/>
  <text x='535' y='105' fill='#34d399' text-anchor='middle' font-size='22'>✓</text>
  <text x='535' y='125' fill='#6ee7b7' text-anchor='middle' font-size='10'>Persisted</text>
</svg>`

const bruCliSvg = `<svg viewBox='0 0 600 280' xmlns='http://www.w3.org/2000/svg' style='background:#1a1a2e;border-radius:12px;font-family:monospace;'>
  <rect x='15' y='15' width='570' height='250' rx='10' fill='#111827' stroke='#374151' stroke-width='1'/>
  <text x='30' y='40' fill='#6366f1' font-size='12' font-weight='bold'>Terminal: bru run --env-var test</text>
  <rect x='25' y='50' width='550' height='30' rx='5' fill='#1e293b'/>
  <text x='35' y='70' fill='#10b981' font-size='11'>$ bru run collections/users/get.bru --env envs/dev.bru</text>
  <rect x='25' y='85' width='550' height='150' rx='5' fill='#0f172a'/>
  <text x='35' y='105' fill='#94a3b8' font-size='10'>Running GET /users...</text>
  <text x='35' y='125' fill='#34d399' font-size='10'>✓ Status: 200 OK</text>
  <text x='35' y='145' fill='#34d399' font-size='10'>✓ Response time: 42ms (&lt; 500ms)</text>
  <text x='35' y='165' fill='#34d399' font-size='10'>✓ Body: JSON array with 10 users</text>
  <text x='35' y='185' fill='#fbbf24' font-size='10'>⚠ Warning: responseTime 42ms close to threshold</text>
  <text x='35' y='205' fill='#f8711' font-size='10'>✗ Assertion failed: expected email to include "@"</text>
  <text x='35' y='225' fill='#94a3b8' font-size='10'>Failed: 1 | Passed: 3 | Total: 1 collection</text>
  <rect x='25' y='242' width='550' height='20' rx='5' fill='#6366f1'/>
  <text x='35' y='257' fill='#c4b5fd' font-size='11'>bru reports: exit code 1 (CI will fail)</text>
</svg>`

export const brunoData = {
  en: {
    hero: {
      title: '📦 Bruno',
      subtitle: 'Git-Native API Client',
      intro: 'Learn Bruno - the open-source, Git-native alternative to Postman. Send requests, write automated tests, manage environments, and run collections from CLI with version-controlled collections. No cloud sync required.'
    },
    tabs: ['🎯 Introduction', '📦 Installation', '📚 Core Concepts', '🔥 Test Automation', '🛠️ Real World', '🔗 Ecosystem', '🚨 Common Errors', '💼 Interview Q&A'],
    sections: [
      {
        title: '🎯 What is Bruno?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Think of Bruno like a filing cabinet for your API requests. Each request is a physical folder with a typed note inside. You can Git-add the whole cabinet, review changes in pull requests, and every teammate gets the exact same version — no mysterious cloud sync that might overwrite someone\'s work.'
          },
          { type: 'heading', text: 'Why Bruno? The Git-Native Advantage' },
          { type: 'text', content: 'Bruno is an open-source API testing tool that stores requests as plain text files (.bru extension) in your project directory. Unlike Postman which syncs to the cloud, Bruno works offline-first and treats API tests like code — perfect for Git workflows, code reviews, and CI/CD pipelines.' },
          {
            type: 'diagram-svg',
            title: 'Bruno Architecture — Git-First Flow',
            svg: brunoFlowSvg
          },
          { type: 'heading', text: 'Bruno vs Postman — Key Differences' },
          {
            type: 'table',
            headers: ['Aspect', 'Bruno', 'Postman'],
            rows: [
              ['Storage', 'Plain .bru files in project directory', 'Cloud-based collections (export to JSON)'],
              ['Version Control', 'Native Git integration', 'Manual export/import'],
              ['Offline Work', 'Full support', 'Limited (requires login)'],
              ['Pricing', 'Free (OSS)', 'Free tier limited, paid Pro'],
              ['CLI Runner', 'bru CLI (npm install -g @usebruno/cli)', 'Newman (npm install -g newman)'],
            ]
          },
          {
            type: 'quiz',
            question: 'You want to commit your API requests alongside application code and review changes in Git PRs. Which tool stores requests as editable project files?',
            options: [
              { id: 'a', text: 'Postman' },
              { id: 'b', text: 'Bruno' },
              { id: 'c', text: 'curl' },
              { id: 'd', text: 'Insomnia' }
            ],
            correct: 'b',
            explanation: 'Bruno stores requests as .bru files in your project directory, making them naturally version-controllable with Git. Postman uses cloud sync by default and requires manual export to get JSON files in your project.'
          }
        ]
      }
    ]
  },
  tr: {
    hero: {
      title: '📦 Bruno',
      subtitle: 'Git-Native API Client',
      intro: 'Bruno\'yu öğrenin - Postman\'a alternatif, açık kaynak ve Git-native API test aracı. İstek gönderin, otomatik test yazın, ortam yönetin ve CLI\'den koleksiyonları çalıştırın. Bulut senkronizasyonu gerekmez.'
    },
    tabs: ['🎯 Giriş', '📦 Kurulum', '📚 Temel Kavramlar', '🔥 Test Otomasyonu', '🛠️ Gerçek Hayat', '🔗 Ekosistem', '🚨 Yaygın Hatalar', '💼 Mülakat Q&A'],
    sections: [
      {
        title: '🎯 Bruno Nedir?',
        blocks: [
          {
            type: 'simple-box',
            emoji: '📦',
            content: 'Bruno\'yu, API istekleriniz için bir dosya dolabı olarak düşünün. Her istek fiziksel bir klasör içinde yazılmış bir not. Bu dolabı Git\'e ekleyebilir, çekme isteği incelemelerinde değişiklikleri görebilirsiniz. Ekibinizdeki herkes aynı sürümü alır - bulut senkronizasyonu yoktur.'
          },
          { type: 'heading', text: 'Neden Bruno? Git-Native Avantajı' },
          { type: 'text', content: 'Bruno, API testlerini düz metin dosyalarında (.bru uzantısı) saklayan açık kaynaklı bir API test aracıdır. Postman\'ın buluta senkronize yaptığından farklı olarak, Bruno çevrimdışı çalışır ve API testlerini kod olarak ele alır — Git iş akışları, kod incelemeleri ve CI/CD pipeline\'ları için idealdir.' },
          {
            type: 'diagram-svg',
            title: 'Bruno Mimarisi — Git-First Akış',
            svg: brunoFlowSvg
          },
          { type: 'heading', text: 'Bruno vs Postman — Temel Farklar' },
          {
            type: 'table',
            headers: ['Yön', 'Bruno', 'Postman'],
            rows: [
              ['Depolama', '.bru dosyaları proje dizininde', 'Bulut tabanlı koleksiyonlar'],
              ['Versiyon Kontrol', 'Native Git entegrasyonu', 'Manuel export/import'],
              ['Çevrimdışı Çalışma', 'Tam destek', 'Sınırlı (giriş gerekir)'],
              ['Ücret', 'Ücretsiz (OSS)', 'Ücretsiz sınır, ücretli Pro'],
              ['CLI Runner', 'bru CLI', 'Newman'],
            ]
          },
          {
            type: 'quiz',
            question: 'API isteklerinizi uygulama koduyla birlikte Git\'e kaydedip çekme isteği incelemelerinde görmek istiyorsunuz. Hangi araç istekleri düzenlenebilir proje dosyaları olarak saklar?',
            options: [
              { id: 'a', text: 'Postman' },
              { id: 'b', text: 'Bruno' },
              { id: 'c', text: 'curl' },
              { id: 'd', text: 'Insomnia' }
            ],
            correct: 'b',
            explanation: 'Bruno, istekleri .bru dosyaları olarak proje dizininizde saklar, böylece Git ile doğal olarak versiyonlendirilebilirler. Postman varsayılan olarak bulut senkronizasyonu kullanır ve JSON dosyaları için manuel export gerektirir.'
          }
        ]
      }
    ]
  }
}