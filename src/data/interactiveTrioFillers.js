function pickLocalized(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.en ?? value.tr ?? ''
}

function compact(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function codeFor(block, lang) {
  return pickLocalized(block.code, lang)
}

function makeStarterFromCode(code) {
  const lines = String(code || '').split('\n')
  const editableIndex = lines.findIndex((line) => {
    const trimmed = line.trim()
    return trimmed &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('/*') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('<!--')
  })

  if (editableIndex === -1) return 'TODO'

  const indent = lines[editableIndex].match(/^\s*/)?.[0] ?? ''
  lines[editableIndex] = `${indent}TODO`
  return lines.join('\n')
}

// sectionTitle: plain string from section.title, already in the root language (tr or en).
// Code is always compacted to lowercase for matching.
function resolveProfile(pageKey, block, sectionTitle) {
  const language = compact(block.language)
  const code = compact(codeFor(block, 'en') || codeFor(block, 'tr'))
  const title = compact(sectionTitle || '')

  // ── DOCKER ────────────────────────────────────────────────────────────────
  if (pageKey === 'docker') {
    if (language.includes('dockerfile') || code.includes(' from ') || code.startsWith('from ')) return 'dockerfile'
    if (language.includes('yaml') || code.includes('services:') || code.includes('docker compose')) return 'compose'
    return 'docker'
  }

  // ── JENKINS ───────────────────────────────────────────────────────────────
  if (pageKey === 'jenkins') return 'jenkins'

  // ── KUBERNETES ────────────────────────────────────────────────────────────
  if (pageKey === 'kubernetes') {
    if (language.includes('yaml') || code.includes('apiversion:') || code.includes('kind:')) return 'k8s-manifest'
    if (code.includes('kubectl') || language.includes('bash')) return 'kubectl'
    return 'k8s-pipeline'
  }

  // ── TYPESCRIPT ────────────────────────────────────────────────────────────
  if (pageKey === 'typescript') return 'typescript'

  // ── PYTHON ────────────────────────────────────────────────────────────────
  if (pageKey === 'python') return 'python'

  // ── SELENIUM — section-title first, then code-content fallback ────────────
  if (pageKey === 'selenium') {
    if (title.includes('locator') || title.includes('element bulma')) return 'selenium-locator'
    if (title.includes('wait') || title.includes('bekleme') || title.includes('bekle')) return 'selenium-wait'
    if (title.includes('frame') || title.includes('alert') || title.includes('window')) return 'selenium-frames'
    if (title.includes('debug') || title.includes('screenshot') || title.includes('ekran goruntu') || title.includes('ide')) return 'selenium-debug'
    if (title.includes('grid') || title.includes('dagitin') || title.includes('parallel') || title.includes('paralel')) return 'selenium-grid'
    if (title.includes('cdp') || title.includes('bidi') || title.includes('devtools')) return 'selenium-debug'
    if (code.includes('webdriverwait') || code.includes('expectedconditions') || code.includes('fluent')) return 'selenium-wait'
    if (code.includes('by.id') || code.includes('by.xpath') || code.includes('by.css') || code.includes('findelement')) return 'selenium-locator'
    if (code.includes('switchto') || code.includes('.alert') || code.includes('.frame(')) return 'selenium-frames'
    if (code.includes('takescreenshot') || code.includes('getscreenshotas')) return 'selenium-debug'
    return 'selenium-action'
  }

  // ── PLAYWRIGHT — section-title first, then code-content fallback ──────────
  if (pageKey === 'playwright') {
    if (title.includes('locator') || title.includes('selector') || title.includes('element bulma')) return 'playwright-locator'
    if (title.includes('assertion') || title.includes('expect') || title.includes('dogrulama') || title.includes('verify')) return 'playwright-assertion'
    if (title.includes('network') || title.includes('mock') || title.includes('intercept') || title.includes('route') || title.includes('api')) return 'playwright-network'
    if (title.includes('fixture') || title.includes('setup') || title.includes('hook') || title.includes('context') || title.includes('kurulum')) return 'playwright-fixture'
    if (code.includes('getbyrole') || code.includes('getbytext') || code.includes('getbylabel') || code.includes('page.locator')) return 'playwright-locator'
    if (code.includes('expect(') || code.includes('tobevisible') || code.includes('tohavetext') || code.includes('tohaveurl')) return 'playwright-assertion'
    if (code.includes('page.route') || code.includes('waitforresponse') || code.includes('route.fulfill')) return 'playwright-network'
    if (code.includes('beforeeach') || code.includes('aftereach') || code.includes('test.use(') || code.includes('fixture')) return 'playwright-fixture'
    return 'playwright-action'
  }

  // ── CYPRESS — section-title first, then code-content fallback ─────────────
  if (pageKey === 'cypress') {
    if (title.includes('intercept') || title.includes('fixture') || title.includes('stub') || title.includes('mock') || title.includes('network') || title.includes('ag')) return 'cypress-intercept'
    if (title.includes('assertion') || title.includes('should') || title.includes('expect') || title.includes('dogrulama')) return 'cypress-assert'
    if (title.includes('get') || title.includes('selector') || title.includes('element') || title.includes('locator')) return 'cypress-get'
    if (code.includes('cy.intercept') || code.includes('cy.fixture') || code.includes('cy.stub')) return 'cypress-intercept'
    if (code.includes('.should(') || code.includes('expect(')) return 'cypress-assert'
    if (code.includes('cy.get') || code.includes('cy.contains') || code.includes('cy.find')) return 'cypress-get'
    return 'cypress-command'
  }

  // ── SQL — section-title first, then code-content fallback ─────────────────
  if (pageKey === 'sql') {
    if (title.includes('join')) return 'sql-join'
    if (
      title.includes('group by') || title.includes('window') || title.includes('cte') ||
      title.includes('aggregate') || title.includes('transaction') || title.includes('index') ||
      title.includes('view') || title.includes('injection') || title.includes('sorgu sirasi') ||
      title.includes('query order') || title.includes('null') || title.includes('null deger')
    ) return 'sql-advanced'
    if (title.includes('insert') || title.includes('veri ekleme')) return 'sql-insert'
    if (title.includes('select') || title.includes('sorgulama') || title.includes('sort') || title.includes('siralama')) return 'sql-select'
    if (title.includes('update') || title.includes('delete') || title.includes('guncelleme') || title.includes('silme')) return 'sql-modify'
    if (title.includes('create') || title.includes('olusturma') || title.includes('installation') || title.includes('kurulum')) return 'sql-create'
    // Code-content fallback
    if (code.includes(' join ')) return 'sql-join'
    if (code.includes('insert into') && !code.includes('select')) return 'sql-insert'
    if (code.includes('update ') && code.includes('set ')) return 'sql-modify'
    if (code.includes('delete from')) return 'sql-modify'
    if (code.includes('create table')) return 'sql-create'
    if (code.includes('group by') || code.includes('having ') || code.includes('over(') || code.includes('with ')) return 'sql-advanced'
    return 'sql-select'
  }

  if (pageKey === 'javascript') return 'javascript'
  if (pageKey === 'postman') return 'postman'
  if (pageKey === 'restassured') return 'restassured'
  return 'code'
}

const PROFILE_TEXT = {
  // ── DOCKER ────────────────────────────────────────────────────────────────
  dockerfile: {
    tr: 'Dockerfile duzeltme',
    en: 'Dockerfile repair',
    taskTr: 'Bu micro lab, pasif Dockerfile ornegini aktif bir duzeltme alistirmasina cevirir: kritik satiri sen tamamla, sonra layer/cache mantigini animasyon ve siralama ile pekistir.',
    taskEn: 'This micro-lab turns the passive Dockerfile example into an active repair exercise: complete the critical line, then reinforce layer/cache logic with animation and ordering.',
    orderTr: 'Dockerfile duzeltme akisini sirala.',
    orderEn: 'Order the Dockerfile repair flow.',
    stepIcons: ['📋', '📦', '⚡', '📂', '✅'],
    stepLabelsTr: ['Base image oku', 'Bagimliliklari kopyala', 'Install katmani', 'Kaynak kodu ekle', 'Komut dogrula'],
    stepLabelsEn: ['Read base image', 'Copy dependencies', 'Install layer', 'Add source', 'Verify command'],
    itemsTr: ['Base image ve calisma dizinini oku', 'Dependency manifestini kaynak koddan once kopyala', 'Install/build katmanini cache dostu calistir', 'Uygulama kaynaklarini en sona kopyala', 'Container komutu ve test kanitini dogrula'],
    itemsEn: ['Read the base image and workdir', 'Copy dependency manifests before source code', 'Run the install/build layer in a cache-friendly way', 'Copy application source last', 'Verify the container command and test evidence'],
  },
  compose: {
    tr: 'Compose service siralama',
    en: 'Compose service ordering',
    taskTr: 'Bu micro lab, Compose ornegini servis sirasi ve hazirlik dusuncesiyle yeniden kurdurur. Amac sadece YAML okumak degil, app-db-test runner iliskisini aktif olarak kurmaktir.',
    taskEn: 'This micro-lab rebuilds the Compose example around service order and readiness. The goal is not just reading YAML, but actively wiring app, db, and test runner relationships.',
    orderTr: 'Compose tabanli test ortami baslatma sirasi nedir?',
    orderEn: 'What is the startup order for a Compose-based test environment?',
    stepIcons: ['🌐', '🗄️', '❤️', '🔗', '🧪'],
    stepLabelsTr: ['Network/volume belirle', 'Bagimliligi tanimla', 'Hazirlik dogrula', 'App bagla', 'Test runner'],
    stepLabelsEn: ['Define network/volume', 'Declare dependency', 'Prove readiness', 'Connect app', 'Run tests'],
    itemsTr: ['Ortak network ve volume ihtiyacini belirle', 'DB/cache gibi bagimliliklari tanimla', 'Healthcheck veya retry ile hazirligi kanitla', 'App servisini dogru hostname ile bagla', 'Test runner ve rapor volume adimini calistir'],
    itemsEn: ['Identify shared network and volume needs', 'Define dependencies such as db/cache', 'Prove readiness with healthcheck or retry', 'Connect the app service with the correct hostname', 'Run the test runner and report volume step'],
  },
  docker: {
    tr: 'Docker komut debug',
    en: 'Docker command debug',
    taskTr: 'Bu micro lab, Docker komutunu ezber yerine kanit akisi olarak kurdurur: komutu tamamla, container/image/volume sonucunu gozlemle, sonra temizleme kararini ver.',
    taskEn: 'This micro-lab turns the Docker command into an evidence flow instead of memorization: complete the command, observe container/image/volume output, then decide cleanup.',
    orderTr: 'Docker komutunu guvenli calistirma ve debug sirasi nedir?',
    orderEn: 'What is the safe Docker command and debug order?',
    stepIcons: ['🎯', '🚩', '▶️', '🔍', '🧹'],
    stepLabelsTr: ['Nesneyi belirle', 'Flag sirasi', 'Komutu calistir', 'Kanit topla', 'Temizle'],
    stepLabelsEn: ['Identify object', 'Flag order', 'Run command', 'Collect evidence', 'Clean up'],
    itemsTr: ['Komutun hangi nesneyi hedefledigini belirle', 'Flagleri image adindan once dogru yere koy', 'Komutu calistir ve cikis kodunu oku', 'ps/logs/inspect ile kanit topla', 'Gerekirse stop/rm/prune ile temizle'],
    itemsEn: ['Identify which object the command targets', 'Put flags in the right place before the image name', 'Run the command and read the exit code', 'Collect evidence with ps/logs/inspect', 'Clean up with stop/rm/prune if needed'],
  },
  // ── JENKINS ───────────────────────────────────────────────────────────────
  jenkins: {
    tr: 'Jenkinsfile pipeline stage tamamlama',
    en: 'Jenkinsfile pipeline stage completion',
    taskTr: 'Bu micro lab, Jenkinsfile ornegini aktif pipeline tamamlama alistirmasina cevirir. Java analojisi: class-method-statement hiyerarsisi gibi pipeline-stages-stage-steps hiyerarsisini elle kurarsin.',
    taskEn: 'This micro-lab turns the Jenkinsfile example into an active pipeline completion exercise. Java analogy: like class-method-statement hierarchy, you build pipeline-stages-stage-steps by hand.',
    orderTr: 'Jenkinsfile kalite kapisi akisini sirala.',
    orderEn: 'Order the Jenkinsfile quality-gate flow.',
    stepIcons: ['🏗️', '📂', '📦', '🧪', '📢'],
    stepLabelsTr: ['Agent sec', 'Checkout', 'Build/deps', 'Test kaniti', 'Rapor yayinla'],
    stepLabelsEn: ['Select agent', 'Checkout', 'Build/deps', 'Test evidence', 'Publish report'],
    itemsTr: ['pipeline ve agent ile calisma yerini sec', 'checkout ile kaynak kodu al', 'build/dependency stageini calistir', 'test stageinde kanit uret', 'post always icinde rapor ve bildirim yayinla'],
    itemsEn: ['Choose execution place with pipeline and agent', 'Fetch source code with checkout', 'Run the build/dependency stage', 'Produce evidence in the test stage', 'Publish reports and notifications inside post always'],
  },
  // ── KUBERNETES ────────────────────────────────────────────────────────────
  'k8s-manifest': {
    tr: 'Kubernetes YAML manifest repair',
    en: 'Kubernetes YAML manifest repair',
    taskTr: 'Bu micro lab, YAML manifestini aktif onarim alistirmasina cevirir: alanlari okuyup selector/label/probe/spec zincirinin neden calistigini kanitlarsin.',
    taskEn: 'This micro-lab turns the YAML manifest into an active repair exercise: read fields and prove why selector/label/probe/spec relationships work.',
    orderTr: 'Kubernetes manifest onarim akisini sirala.',
    orderEn: 'Order the Kubernetes manifest repair flow.',
    stepIcons: ['🏷️', '📋', '🔗', '🩺', '📊'],
    stepLabelsTr: ['Kaynak tipi', 'Namespace', 'Label/selector', 'Spec onar', 'Rollout kanitla'],
    stepLabelsEn: ['Resource type', 'Namespace', 'Label/selector', 'Repair spec', 'Prove rollout'],
    itemsTr: ['apiVersion ve kind ile kaynak tipini dogrula', 'metadata.name ve namespace kapsamlarini oku', 'selector ile pod label eslesmesini kontrol et', 'probe/resource/port gibi spec alanlarini onar', 'apply sonrasi rollout ve endpoint kanitini topla'],
    itemsEn: ['Verify resource type with apiVersion and kind', 'Read metadata.name and namespace scope', 'Check selector to pod label matching', 'Repair spec fields such as probes, resources, and ports', 'Collect rollout and endpoint evidence after apply'],
  },
  kubectl: {
    tr: 'kubectl output diagnosis',
    en: 'kubectl output diagnosis',
    taskTr: 'Bu micro lab, kubectl komutunu aktif teshis akisi olarak kullandirir: once ozet durum, sonra events/logs, en son dogrulama. Amac komutu ezberlemek degil ciktiyi yorumlamaktir.',
    taskEn: 'This micro-lab uses kubectl as an active diagnosis flow: summary first, then events/logs, then verification. The goal is interpreting output, not memorizing commands.',
    orderTr: 'kubectl teshis sirasi nedir?',
    orderEn: 'What is the kubectl diagnosis order?',
    stepIcons: ['📊', '🔍', '📋', '🔧', '✅'],
    stepLabelsTr: ['Status oku', 'Events incele', 'Logs ara', 'Duzeltme uygula', 'Sonucu kanitla'],
    stepLabelsEn: ['Read status', 'Check events', 'Search logs', 'Apply fix', 'Prove result'],
    itemsTr: ['get ile STATUS ve READY sutunlarini oku', 'describe ile Events bolumunu incele', 'logs veya logs --previous ile uygulama hatasini ara', 'manifest/image/config duzeltmesini uygula', 'rollout status ve get ile sonucu kanitla'],
    itemsEn: ['Read STATUS and READY columns with get', 'Inspect the Events section with describe', 'Search app errors with logs or logs --previous', 'Apply the manifest/image/config fix', 'Prove the result with rollout status and get'],
  },
  'k8s-pipeline': {
    tr: 'Kubernetes pipeline dogrulama',
    en: 'Kubernetes pipeline verification',
    taskTr: 'Bu micro lab, CI ile Kubernetes deploy ornegini aktif kalite kapisina cevirir: image tag, namespace, rollout ve rapor kanitini tek akista baglarsin.',
    taskEn: 'This micro-lab turns the CI-to-Kubernetes deploy example into an active quality gate: you connect image tag, namespace, rollout, and report evidence in one flow.',
    orderTr: 'Kubernetes CI/CD kalite kapisi sirasi nedir?',
    orderEn: 'What is the Kubernetes CI/CD quality-gate order?',
    stepIcons: ['🏷️', '📦', '🔐', '⏳', '📢'],
    stepLabelsTr: ['Image tagi sabitle', 'Manifest guncelle', 'Namespace dogrula', 'Rollout bekle', 'Rapor yayinla'],
    stepLabelsEn: ['Pin image tag', 'Update manifest', 'Verify namespace', 'Wait rollout', 'Publish report'],
    itemsTr: ['Build edilen image tagini sabitle', 'Manifest veya Helm values icine ayni tagi gec', 'Namespace ve credential kapsamlarini dogrula', 'Rollout tamamlanana kadar bekle', 'Smoke test, logs ve raporu yayinla'],
    itemsEn: ['Pin the built image tag', 'Pass the same tag into manifests or Helm values', 'Verify namespace and credential scope', 'Wait until rollout completes', 'Publish smoke test, logs, and reports'],
  },
  // ── TYPESCRIPT ────────────────────────────────────────────────────────────
  typescript: {
    tr: 'TypeScript kod yazma',
    en: 'TypeScript coding practice',
    taskTr: 'Bu micro lab, TypeScript ornegini pasif okumadan cikarir: kritik satiri sen tamamla, tsc gibi dusun, sonra tip kanitini adim adim izle.',
    taskEn: 'This micro-lab moves the TypeScript example beyond passive reading: complete the critical line, think like tsc, then follow the type evidence step by step.',
    orderTr: 'TypeScript tip guvenligi akisini sirala.',
    orderEn: 'Order the TypeScript type-safety flow.',
    stepIcons: ['📝', '🔍', '❌', '🧪', '🔁'],
    stepLabelsTr: ['Sozlesme tanimla', 'Tip ver', 'Hatayi yakala', 'Test dogrula', 'CI ekle'],
    stepLabelsEn: ['Define contract', 'Annotate type', 'Catch error', 'Verify test', 'Add to CI'],
    itemsTr: ['Veri sozlesmesini interface/type ile tanimla', 'Fonksiyon veya degiskene acik tip ver', 'tsc/editor hatasini kodu calistirmadan yakala', 'Runtime test veya assertion ile davranisi dogrula', 'CI icine tsc --noEmit kontrolu ekle'],
    itemsEn: ['Define the data contract with interface/type', 'Give the function or variable an explicit type', 'Catch the tsc/editor error before runtime', 'Verify behavior with runtime test or assertion', 'Add tsc --noEmit to CI'],
  },
  // ── PYTHON ────────────────────────────────────────────────────────────────
  python: {
    tr: 'Python kod yazma',
    en: 'Python coding practice',
    taskTr: 'Bu micro lab, Python kodunu aktif denemeye cevirir: kritik satiri sen tamamla, beklenen sonuc ile karsilastir ve QA senaryosundaki kaniti oku.',
    taskEn: 'This micro-lab turns the Python code into active practice: complete the critical line, compare with expected result, and read the QA evidence.',
    orderTr: 'Python QA kodunu guvenli calistirma sirasi nedir?',
    orderEn: 'What is the safe order for running Python QA code?',
    stepIcons: ['📖', '✏️', '▶️', '🔍', '♻️'],
    stepLabelsTr: ['Girdiyi oku', 'Satiri tamamla', 'Ciktiyi karsilastir', 'Hatayi oku', 'Yeniden kullan'],
    stepLabelsEn: ['Read input', 'Complete line', 'Compare output', 'Read error', 'Reuse result'],
    itemsTr: ['Girdi ve veri tiplerini oku', 'Kritik satiri en kucuk degisiklikle tamamla', 'Kodu calistirip beklenen ciktiyi karsilastir', 'Hata varsa traceback veya assertion mesajini oku', 'Test raporu icin sonucu tekrar kullanilabilir hale getir'],
    itemsEn: ['Read inputs and data types', 'Complete the critical line with the smallest change', 'Run the code and compare expected output', 'If it fails, read traceback or assertion message', 'Make the result reusable for a test report'],
  },
  // ── SELENIUM ──────────────────────────────────────────────────────────────
  'selenium-locator': {
    tr: 'Selenium — Locator secimi',
    en: 'Selenium — Locator selection',
    taskTr: 'Bu micro lab, locator secim mantigini pekistirir: once ID (benzersiz + sabit) dene, sonra CSS, XPath yalnizca zorunluysa kullan. Kotu locator → flaky test → gece alarmı. Dogru strateji secimini elle yeniden kur.',
    taskEn: 'This micro-lab reinforces locator selection logic: try ID first (unique + stable), then CSS, use XPath only when necessary. Bad locator → flaky test → midnight alarm. Rebuild the correct strategy by hand.',
    orderTr: 'Selenium locator stratejisi secme sirasi nedir?',
    orderEn: 'What is the Selenium locator strategy selection order?',
    stepIcons: ['🔍', '🎯', '🎨', '🔀', '🛡️'],
    stepLabelsTr: ['ID kontrol et', 'Stabil attribute', 'CSS yaz', 'XPath son care', 'CI\'da dogrula'],
    stepLabelsEn: ['Check ID', 'Stable attribute', 'Write CSS', 'XPath last resort', 'Verify in CI'],
    itemsTr: ['Elementin ID attribute\'u var mi kontrol et — varsa By.ID kullan', 'ID yoksa data-testid, name gibi stabil attribute dene', 'Attribute yoksa CSS selector yaz (.class, #id, tag[attr="val"])', 'CSS de calismazsa XPath yaz — ama mumkun oldugunca kisa tut', 'Test calisinca locator\'in CI\'da da stabil oldugunu dogrula'],
    itemsEn: ['Check if element has an ID attribute — if yes, use By.ID', 'If no ID, try stable attributes like data-testid or name', 'If no attribute, write a CSS selector (.class, #id, tag[attr="val"])', 'If CSS also fails, write XPath — but keep it as short as possible', 'After test runs, verify the locator is also stable in CI'],
  },
  'selenium-wait': {
    tr: 'Selenium — Wait stratejisi',
    en: 'Selenium — Wait strategy',
    taskTr: 'Bu micro lab, Thread.sleep\'in yerine WebDriverWait + ExpectedConditions kullanma mantigini pekistirir. sleep(5000) agin hizina korkece guvenin — WebDriverWait ise "element gorunene kadar max 10s bekle" der. Test 0.5s\'de gecebilir.',
    taskEn: 'This micro-lab reinforces replacing Thread.sleep with WebDriverWait + ExpectedConditions. sleep(5000) blindly trusts network speed — WebDriverWait says "wait max 10s until element is visible". The test can pass in 0.5s.',
    orderTr: 'Dogru Selenium wait stratejisi kurma sirasi nedir?',
    orderEn: 'What is the correct Selenium wait strategy setup order?',
    stepIcons: ['🗑️', '⏳', '🎯', '⏱️', '🔍'],
    stepLabelsTr: ['Sleep kaldir', 'WebDriverWait olustur', 'Kosul sec', 'wait.until() yaz', 'Timeout mesajini oku'],
    stepLabelsEn: ['Remove sleep', 'Create WebDriverWait', 'Select condition', 'Write wait.until()', 'Read timeout message'],
    itemsTr: ['Thread.sleep veya implicit wait kullaniliyorsa kaldir', 'WebDriverWait nesnesi olustur: new WebDriverWait(driver, Duration.ofSeconds(10))', 'ExpectedConditions ile kosulu sec: visibilityOf, elementToBeClickable', 'wait.until(ExpectedConditions.X(locator)) ile elementi bekle', 'Timeout hatasi alirsan sureyi artirma — locator veya sayfayi duzelt'],
    itemsEn: ['Remove Thread.sleep or implicit wait if present', 'Create WebDriverWait: new WebDriverWait(driver, Duration.ofSeconds(10))', 'Set the condition with ExpectedConditions: visibilityOf, elementToBeClickable', 'Wait for element with wait.until(ExpectedConditions.X(locator))', 'If you get a timeout error, do not increase the time — fix the locator or the page'],
  },
  'selenium-action': {
    tr: 'Selenium — UI Aksiyonlari',
    en: 'Selenium — UI Actions',
    taskTr: 'Bu micro lab, click/sendKeys/select gibi UI aksiyonunu eksiksiz akisa cevirir: locator bul → element gorunur mu kontrol et → aksiyonu gerceklestir → DOM degisikligini dogrula. Her adim atlanamaz.',
    taskEn: 'This micro-lab turns a click/sendKeys/select UI action into a complete flow: find locator → check visibility → perform action → verify DOM change. No step can be skipped.',
    orderTr: 'Selenium UI aksiyonu ve assertion sirasi nedir?',
    orderEn: 'What is the Selenium UI action and assertion order?',
    stepIcons: ['🔍', '👁️', '🖱️', '🔄', '✅'],
    stepLabelsTr: ['Elementi bul', 'Gorunur mu?', 'Aksiyon yap', 'DOM degisikligini izle', 'Assertion ekle'],
    stepLabelsEn: ['Find element', 'Is visible?', 'Perform action', 'Watch DOM change', 'Add assertion'],
    itemsTr: ['Locator ile elementi bul (By.ID, By.CSS veya By.XPath)', 'WebDriverWait ile elementin tiklanabilir oldugunu dogrula', 'click() / sendKeys() / select() aksiyonunu gerceklestir', 'Aksiyon sonrasi DOM degisikligini gozlemle (alert, yeni sayfa, renk vs.)', 'assertEquals / assertTrue ile beklenen durumu kanitla'],
    itemsEn: ['Find element with locator (By.ID, By.CSS or By.XPath)', 'Verify element is clickable with WebDriverWait', 'Perform the click() / sendKeys() / select() action', 'Observe the DOM change after action (alert, new page, color, etc.)', 'Prove the expected state with assertEquals / assertTrue'],
  },
  'selenium-frames': {
    tr: 'Selenium — Frame ve Alert yonetimi',
    en: 'Selenium — Frame and Alert handling',
    taskTr: 'Bu micro lab, iframe veya JavaScript alert\'i handle etme akisini pekistirir. Unutulursa "no such element" hatasi vermez — calisma baglami degismeden elementler gorunmez olur. switchTo() ile konteksi elle kur.',
    taskEn: 'This micro-lab reinforces the flow for handling iframes or JavaScript alerts. Forgetting it does not cause "no such element" error — elements just become invisible without context switch. Build the context manually with switchTo().',
    orderTr: 'iframe icerisindeki elementle etkilesim sirasi nedir?',
    orderEn: 'What is the order to interact with an element inside an iframe?',
    stepIcons: ['🪟', '🔀', '⚡', '🔙', '⚠️'],
    stepLabelsTr: ['Frame mi alert mi?', 'switchTo() gir', 'Aksiyon yap', 'defaultContent\'e don', 'Alert varsa handle et'],
    stepLabelsEn: ['Frame or alert?', 'Enter switchTo()', 'Perform action', 'Return to defaultContent', 'Handle alert if present'],
    itemsTr: ['iframe mi JavaScript alert mi? Onu belirle', 'driver.switchTo().frame(id veya WebElement) ile iframe\'e gec', 'iframe icindeki elementi bul ve aksiyon gerceklestir', 'driver.switchTo().defaultContent() ile ana icerge don', 'Alert varsa accept() veya dismiss() ile kapat'],
    itemsEn: ['Is it an iframe or JavaScript alert? Determine that first', 'Switch to iframe with driver.switchTo().frame(id or WebElement)', 'Find the element inside the iframe and perform the action', 'Return to main content with driver.switchTo().defaultContent()', 'If alert, close with accept() or dismiss()'],
  },
  'selenium-debug': {
    tr: 'Selenium — Debug ve Screenshot',
    en: 'Selenium — Debug and Screenshot',
    taskTr: 'Bu micro lab, test hata verdiginde gorsel ve metin kanitlarla teshis yapmayi pekistirir. Screenshot + HTML dump + console log uclu teshis yaklasimidir — sadece hata mesajina bakmak yetersizdir.',
    taskEn: 'This micro-lab reinforces diagnosing test failures using visual and text evidence. Screenshot + HTML dump + console log is a three-pronged approach — looking only at the error message is not enough.',
    orderTr: 'Selenium test hatasini teshis etme sirasi nedir?',
    orderEn: 'What is the Selenium test failure diagnosis order?',
    stepIcons: ['💥', '📸', '🗃️', '📋', '🚀'],
    stepLabelsTr: ['Test fail', 'Screenshot al', 'HTML kaydet', 'Console log oku', 'CI artifact ekle'],
    stepLabelsEn: ['Test fails', 'Take screenshot', 'Save HTML', 'Read console log', 'Add CI artifact'],
    itemsTr: ['Test fail ettiginde hata mesajini ve stack trace\'i oku', 'getScreenshotAs(OutputType.FILE) ile anlik goruntu al', 'driver.getPageSource() ile HTML dumpini kaydet', 'browser.manage().logs() ile JS console hatalarini incele', 'CI\'a screenshot/log artifact olarak ekle, tekrar uretebilir ol'],
    itemsEn: ['When test fails, read the error message and stack trace', 'Take a snapshot with getScreenshotAs(OutputType.FILE)', 'Save the HTML dump with driver.getPageSource()', 'Inspect JS console errors with browser.manage().logs()', 'Add screenshot/log as CI artifact, make failure reproducible'],
  },
  'selenium-grid': {
    tr: 'Selenium Grid — Paralel test',
    en: 'Selenium Grid — Parallel testing',
    taskTr: 'Bu micro lab, Selenium Grid ile paralel test calistirma akisini pekistirir. Hub + Node mimarisini veya Standalone modunu kur, DesiredCapabilities ile hedef ortami sec, sonra test sonuclarini topla.',
    taskEn: 'This micro-lab reinforces the Selenium Grid parallel test run flow. Set up Hub + Node architecture or Standalone mode, select the target environment with DesiredCapabilities, then collect test results.',
    orderTr: 'Selenium Grid ile paralel test calistirma sirasi nedir?',
    orderEn: 'What is the order to run parallel tests with Selenium Grid?',
    stepIcons: ['🌐', '💻', '🎯', '▶️', '📊'],
    stepLabelsTr: ['Grid kur', 'Node ekle', 'Capabilities sec', 'Paralel calistir', 'Sonuclari topla'],
    stepLabelsEn: ['Set up Grid', 'Add Node', 'Set capabilities', 'Run in parallel', 'Collect results'],
    itemsTr: ['Grid Hub\'i baslat veya Standalone modunu yap', 'Test makinelerini Node olarak Hub\'a bagla', 'RemoteWebDriver icinde DesiredCapabilities ile hedef tarayici/OS sec', 'Test suite\'ini paralel modda calistir (TestNG paralel, JUnit parallel runner)', 'Raporu topla, hata alan Node\'u teshis et'],
    itemsEn: ['Start the Grid Hub or configure Standalone mode', 'Connect test machines as Nodes to the Hub', 'Select target browser/OS with DesiredCapabilities inside RemoteWebDriver', 'Run the test suite in parallel mode (TestNG parallel, JUnit parallel runner)', 'Collect reports, diagnose the failing Node'],
  },
  // ── PLAYWRIGHT ────────────────────────────────────────────────────────────
  'playwright-locator': {
    tr: 'Playwright — Locator secimi',
    en: 'Playwright — Locator selection',
    taskTr: 'Bu micro lab, Playwright\'in locator secim onceliklerini pekistirir: getByRole/getByLabel/getByText semantic locatorlar ID/class degisiminden etkilenmez. page.locator() CSS/XPath icin son kapıdır.',
    taskEn: 'This micro-lab reinforces Playwright locator priority: getByRole/getByLabel/getByText semantic locators survive ID/class changes. page.locator() is the last resort for CSS/XPath.',
    orderTr: 'Playwright locator secimi ve dogrulama sirasi nedir?',
    orderEn: 'What is the Playwright locator selection and verification order?',
    stepIcons: ['🎭', '🏷️', '🎯', '✅', '🎛️'],
    stepLabelsTr: ['Semantic dene', 'TestId kullan', 'CSS/locator() yaz', 'toBeVisible dogrula', 'filter() ile daralt'],
    stepLabelsEn: ['Try semantic', 'Use TestId', 'Write CSS/locator()', 'Verify toBeVisible', 'Narrow with filter()'],
    itemsTr: ['Once getByRole, getByLabel, getByPlaceholder gibi semantic locator dene', 'Semantic bulamazsan getByText veya getByTestId kullan', 'CSS/XPath gerekiyorsa page.locator("css") veya page.locator("xpath=...") yaz', 'await expect(locator).toBeVisible() ile locatorin calistigini dogrula', 'Birden fazla element eslesiryorsa .first() / .nth() / .filter() ile daralt'],
    itemsEn: ['Try semantic locators first: getByRole, getByLabel, getByPlaceholder', 'If not semantic, use getByText or getByTestId', 'If CSS/XPath needed, write page.locator("css") or page.locator("xpath=...")', 'Verify locator works with await expect(locator).toBeVisible()', 'If multiple elements match, narrow with .first() / .nth() / .filter()'],
  },
  'playwright-action': {
    tr: 'Playwright — Aksiyonlar',
    en: 'Playwright — Actions',
    taskTr: 'Bu micro lab, Playwright aksiyonlarini pekistirir. click/fill/press auto-wait icerdiği icin bekleme kodu yazmana gerek yok — ama ne bekledigini bilmek hala gerekli. Aksiyon zincirini kendisi kur.',
    taskEn: 'This micro-lab reinforces Playwright actions. click/fill/press include auto-wait so you do not need to write waiting code — but you still need to know what it waits for. Build the action chain yourself.',
    orderTr: 'Playwright ile UI aksiyonu ve dogrulama sirasi nedir?',
    orderEn: 'What is the Playwright UI action and verification order?',
    stepIcons: ['🔍', '⏳', '🖱️', '🔄', '✅'],
    stepLabelsTr: ['Locator hazirla', 'Auto-wait anlat', 'Aksiyonu yap', 'DOM\'u izle', 'expect() ekle'],
    stepLabelsEn: ['Prepare locator', 'Understand auto-wait', 'Perform action', 'Watch DOM', 'Add expect()'],
    itemsTr: ['page.locator() veya getByRole() ile locatoru hazirla', 'Playwright\'in auto-wait mantigini hatirla: actionable olana kadar bekler', 'click(), fill(), press(), selectOption() aksiyonunu gerceklestir', 'Aksiyon sonrasi DOM degisikligini takip et (yeni sayfa, modal, hata mesaji)', 'await expect(locator).toBeVisible() veya toHaveText() ile sonucu kanitla'],
    itemsEn: ['Prepare the locator with page.locator() or getByRole()', 'Remember Playwright auto-wait logic: waits until actionable', 'Perform click(), fill(), press(), selectOption() action', 'Track DOM change after action (new page, modal, error message)', 'Prove the result with await expect(locator).toBeVisible() or toHaveText()'],
  },
  'playwright-assertion': {
    tr: 'Playwright — Assertion yazma',
    en: 'Playwright — Writing assertions',
    taskTr: 'Bu micro lab, dogru expect() matcher secimini pekistirir. toBeVisible() mu? toHaveText() mu? toHaveURL() mu? Yanlis matcher yanlis PASS verebilir — assertion kalitesi test kalitesidir.',
    taskEn: 'This micro-lab reinforces choosing the right expect() matcher. toBeVisible()? toHaveText()? toHaveURL()? Wrong matcher gives wrong PASS — assertion quality is test quality.',
    orderTr: 'Playwright assertion yazma ve dogrulama sirasi nedir?',
    orderEn: 'What is the Playwright assertion writing and verification order?',
    stepIcons: ['🎯', '📋', '✍️', '🔍', '🛡️'],
    stepLabelsTr: ['Ne dogrulanacak?', 'Matcher sec', 'Assertion yaz', 'Fail mesajini oku', 'CI kararliligi'],
    stepLabelsEn: ['What to assert?', 'Select matcher', 'Write assertion', 'Read fail message', 'CI stability'],
    itemsTr: ['Ne dogulanacagini belirle: gorunurluk mu? metin mi? URL mi? attribute mu?', 'Dogru matcher\'i sec: toBeVisible / toHaveText / toHaveURL / toHaveAttribute', 'await expect(locator).matcher(beklenenDeger) seklinde yaz', 'Test fail ettiginde olusan hata mesajini oku — hangi deger beklendi vs geldi?', 'Ayni assertion CI\'da farkli ortamlarda da geciyor mu dogrula'],
    itemsEn: ['Determine what to assert: visibility? text? URL? attribute?', 'Select the right matcher: toBeVisible / toHaveText / toHaveURL / toHaveAttribute', 'Write: await expect(locator).matcher(expectedValue)', 'When test fails, read the error message — which value was expected vs received?', 'Verify the same assertion also passes in CI across different environments'],
  },
  'playwright-network': {
    tr: 'Playwright — Network mock',
    en: 'Playwright — Network mocking',
    taskTr: 'Bu micro lab, page.route() ile API isteklerini yakalamay ve mock response vermeyi pekistirir. Amac backend olmadan frontend testini calistirmak veya hata senaryosunu kontrollü uretmektir.',
    taskEn: 'This micro-lab reinforces intercepting API requests and returning mock responses with page.route(). The goal is running frontend tests without a backend or producing error scenarios under control.',
    orderTr: 'Playwright ile API mock kurma sirasi nedir?',
    orderEn: 'What is the Playwright API mock setup order?',
    stepIcons: ['🌐', '🎣', '📦', '▶️', '🧹'],
    stepLabelsTr: ['Endpoint belirle', 'page.route() kur', 'Mock response yaz', 'Testi calistir', 'Route temizle'],
    stepLabelsEn: ['Identify endpoint', 'Set page.route()', 'Write mock response', 'Run test', 'Clean route'],
    itemsTr: ['Hangi API endpoint mock\'lanacak belirle (URL pattern)', 'await page.route("**/api/endpoint", ...) ile intercept\'i kur', 'route.fulfill({ status: 200, body: JSON.stringify(mockData) }) ile response ver', 'Testi calistir: UI mock veriye gore cevap veriyor mu dogrula', 'Test sonrasi await page.unroute() ile mock\'u iptal et'],
    itemsEn: ['Determine which API endpoint to mock (URL pattern)', 'Set up intercept with await page.route("**/api/endpoint", ...)', 'Return response with route.fulfill({ status: 200, body: JSON.stringify(mockData) })', 'Run the test: verify that UI responds correctly to mock data', 'Cancel mock after test with await page.unroute()'],
  },
  'playwright-fixture': {
    tr: 'Playwright — Fixture ve Setup',
    en: 'Playwright — Fixture and Setup',
    taskTr: 'Bu micro lab, test.beforeEach, fixture ve browser context kullanim mantigini pekistirir. Java\'da @BeforeEach gibi — ama Playwright\'ta her testin kendi izole sayfa context\'i vardir, paylasilan state bug\'a davet cikarir.',
    taskEn: 'This micro-lab reinforces test.beforeEach, fixture and browser context usage. Like Java\'s @BeforeEach — but in Playwright each test has its own isolated page context, shared state is an invitation for bugs.',
    orderTr: 'Playwright test kurulum (setup/teardown) sirasi nedir?',
    orderEn: 'What is the Playwright test setup/teardown order?',
    stepIcons: ['🏗️', '🌐', '🔧', '▶️', '🧹'],
    stepLabelsTr: ['Ne paylasılacak?', 'Context olustur', 'Page hazirla', 'Test calistir', 'Teardown'],
    stepLabelsEn: ['What to share?', 'Create context', 'Prepare page', 'Run test', 'Teardown'],
    itemsTr: ['Testler arasi paylasılacak kodu belirle: login, URL, cookie', 'test.beforeEach(() => ...) veya fixture ile context/page olustur', 'await page.goto(baseURL) ile baslangic durumunu hazirla', 'Test icinde sadece o teste ozel aksiyonlari yap', 'test.afterEach veya scope\'dan cikinca Playwright otomatik temizler'],
    itemsEn: ['Identify what to share between tests: login, URL, cookie', 'Create context/page with test.beforeEach(() => ...) or fixture', 'Prepare the initial state with await page.goto(baseURL)', 'Only perform actions specific to that test inside the test body', 'test.afterEach or Playwright auto-cleans when scope exits'],
  },
  // ── CYPRESS ───────────────────────────────────────────────────────────────
  'cypress-get': {
    tr: 'Cypress — cy.get() secimi',
    en: 'Cypress — cy.get() selection',
    taskTr: 'Bu micro lab, cy.get() / cy.contains() / cy.find() secim mantigini pekistirir. Cypress komutlari sanki senkron gibi gorunur ama aslinda bir komut kuyrugu olusturur — retry-ability burada devreye girer.',
    taskEn: 'This micro-lab reinforces cy.get() / cy.contains() / cy.find() selection logic. Cypress commands look synchronous but actually build a command queue — retry-ability kicks in here.',
    orderTr: 'Cypress ile element secme ve zincir kurma sirasi nedir?',
    orderEn: 'What is the Cypress element selection and chaining order?',
    stepIcons: ['🏷️', '📝', '📋', '👶', '✅'],
    stepLabelsTr: ['data-cy kontrol et', 'cy.get() yaz', 'Metin filtrele', 'Cocuk ara', 'Assertion zincirle'],
    stepLabelsEn: ['Check data-cy', 'Write cy.get()', 'Filter by text', 'Find child', 'Chain assertion'],
    itemsTr: ['data-cy attribute var mi kontrol et — varsa cy.get("[data-cy=btn]") kullan', 'data-cy yoksa cy.get("#id") veya cy.get(".class") yaz', 'Metin icerigi onemse cy.contains("Giris Yap") veya .contains() zincirle', 'Ic iceye yapi gerekiyorsa .find("button") ile cocuk elementi ara', 'Assertion: .should("be.visible"), .should("have.text", "...")'],
    itemsEn: ['Check if data-cy attribute exists — if yes, use cy.get("[data-cy=btn]")', 'If no data-cy, write cy.get("#id") or cy.get(".class")', 'If text content matters, use cy.contains("Login") or chain .contains()', 'If nested structure needed, find child element with .find("button")', 'Assert: .should("be.visible"), .should("have.text", "...")'],
  },
  'cypress-intercept': {
    tr: 'Cypress — API Intercept',
    en: 'Cypress — API Intercept',
    taskTr: 'Bu micro lab, cy.intercept() ile ag isteklerini yakalamay, stub\'lamayi ve gecikme eklemeyi pekistirir. Gerçek API olmadan veya hata senaryosu uretmek icin kullan — frontend testi backend\'den bagimsiz olmali.',
    taskEn: 'This micro-lab reinforces intercepting, stubbing and delaying network requests with cy.intercept(). Use to test without a real API or to produce error scenarios — frontend tests should be independent of the backend.',
    orderTr: 'Cypress ile API intercept kurma sirasi nedir?',
    orderEn: 'What is the Cypress API intercept setup order?',
    stepIcons: ['🌐', '🎯', '🚀', '⏳', '✅'],
    stepLabelsTr: ['Endpoint belirle', 'cy.intercept() kur', 'cy.visit() calistir', 'cy.wait() bekle', 'Response dogrula'],
    stepLabelsEn: ['Identify endpoint', 'Set cy.intercept()', 'Run cy.visit()', 'Wait with cy.wait()', 'Verify response'],
    itemsTr: ['Hangi endpoint yakalanacak belirle: URL pattern veya method + pattern', 'cy.intercept("GET", "**/api/users", { fixture: "users.json" }).as("getUsers") kur', 'cy.visit() veya aksiyonu tetikle, intercept\'in ateşlenmesini bekle', 'cy.wait("@getUsers") ile istek gerceklesene kadar bekle', 'cy.get("@getUsers").its("response.statusCode").should("eq", 200) dogrula'],
    itemsEn: ['Determine which endpoint to capture: URL pattern or method + pattern', 'Set up: cy.intercept("GET", "**/api/users", { fixture: "users.json" }).as("getUsers")', 'Trigger cy.visit() or action, wait for the intercept to fire', 'Wait for the request with cy.wait("@getUsers")', 'Verify: cy.get("@getUsers").its("response.statusCode").should("eq", 200)'],
  },
  'cypress-command': {
    tr: 'Cypress — Komut zinciri',
    en: 'Cypress — Command chaining',
    taskTr: 'Bu micro lab, Cypress komut zincirini ve retry-ability mantigini pekistirir. click(), type(), select() komutlari kuyruga girer, her komut oncekinin tamamlanmasini bekler. Manuel await gerekmez.',
    taskEn: 'This micro-lab reinforces the Cypress command chain and retry-ability logic. click(), type(), select() go into the queue; each command waits for the previous to complete. No manual await needed.',
    orderTr: 'Cypress ile UI etkilesimi ve dogrulama sirasi nedir?',
    orderEn: 'What is the Cypress UI interaction and verification order?',
    stepIcons: ['🔗', '⚡', '⏳', '✅', '🛡️'],
    stepLabelsTr: ['cy.get() ile sec', 'Komut zincirle', 'Retry bekle', 'should() ekle', 'CI\'da test et'],
    stepLabelsEn: ['Select with cy.get()', 'Chain command', 'Wait retry', 'Add should()', 'Test in CI'],
    itemsTr: ['cy.get(locator) ile hedef elementi se', 'Aksiyon komutunu zincirle: .click() / .type("metin") / .select("secenek")', 'Cypress otomatik retry yapar — 4s icinde komut basarili olmassa fail eder', '.should("have.value", "metin") ile DOM degisikligini dogrula', 'Ayni zinciri CI\'da farkli viewport\'ta da calistir, responsive kontrol et'],
    itemsEn: ['Select the target element with cy.get(locator)', 'Chain the action command: .click() / .type("text") / .select("option")', 'Cypress auto-retries — if command does not succeed within 4s it fails', 'Verify DOM change with .should("have.value", "text")', 'Run the same chain in CI with a different viewport, check responsive behavior'],
  },
  'cypress-assert': {
    tr: 'Cypress — Assertion yazma',
    en: 'Cypress — Writing assertions',
    taskTr: 'Bu micro lab, Cypress Chai tabanli assertion sistemini pekistirir: .should() zincir, .and() coklu kosul, expect() kapsayici assertion. Yanlis assertion test\'i gecirtir — dogru olanini sec.',
    taskEn: 'This micro-lab reinforces Cypress Chai-based assertion system: .should() chain, .and() for multiple conditions, expect() for wrapped assertion. Wrong assertion makes tests pass incorrectly — choose the right one.',
    orderTr: 'Cypress assertion yazma ve dogrulama sirasi nedir?',
    orderEn: 'What is the Cypress assertion writing and verification order?',
    stepIcons: ['🎯', '👁️', '📝', '🏷️', '💬'],
    stepLabelsTr: ['Ne dogrulanacak?', 'Gorunurluk', 'Metin kontrol', 'Attribute kontrol', 'Fail mesajini oku'],
    stepLabelsEn: ['What to assert?', 'Visibility', 'Text check', 'Attribute check', 'Read fail message'],
    itemsTr: ['Neyi dogrulayacagini belirle: gorunurluk / metin / CSS / attribute', '.should("be.visible") ile elementin gorunur oldugunu dogrula', '.should("contain.text", "Giris Basarili") ile metin iceriginii kontrol et', '.should("have.attr", "disabled") veya "href" ile attribute dogrula', 'Test fail ettiginde Cypress hata mesajini oku: expected X to ... but got Y'],
    itemsEn: ['Determine what to assert: visibility / text / CSS / attribute', 'Verify element is visible with .should("be.visible")', 'Check text content with .should("contain.text", "Login Successful")', 'Verify attribute with .should("have.attr", "disabled") or "href"', 'When test fails, read Cypress error: expected X to ... but got Y'],
  },
  // ── SQL ───────────────────────────────────────────────────────────────────
  'sql-create': {
    tr: 'SQL — Tablo olusturma',
    en: 'SQL — Table creation',
    taskTr: 'Bu micro lab, CREATE TABLE soz dizimini pekistirir: sutun adi, veri tipi ve kisit (NOT NULL, PRIMARY KEY, FOREIGN KEY) zinciri. Her kisit bir is kurali — "bu alan bos olamaz" veya "bu alan baska tabloya baglidedir".',
    taskEn: 'This micro-lab reinforces CREATE TABLE syntax: column name, data type and constraint (NOT NULL, PRIMARY KEY, FOREIGN KEY) chain. Each constraint is a business rule — "this field cannot be empty" or "this field links to another table".',
    orderTr: 'Yeni bir SQL tablosu tasarlarken dogru sira nedir?',
    orderEn: 'What is the correct order when designing a new SQL table?',
    stepIcons: ['🏗️', '📊', '🔑', '🚫', '🔗'],
    stepLabelsTr: ['Varligi tanimla', 'Tip sec', 'PRIMARY KEY', 'NOT NULL kisit', 'FOREIGN KEY'],
    stepLabelsEn: ['Define entity', 'Select type', 'PRIMARY KEY', 'NOT NULL constraint', 'FOREIGN KEY'],
    itemsTr: ['Tablonun hangi varligi temsil ettigini belirle (users, orders, products)', 'Her sutun icin isim ve uygun veri tipi sec (INT, VARCHAR(255), DATE, BOOLEAN)', 'PRIMARY KEY sutununu belirle — benzersiz, degismez, NULL olamaz', 'NOT NULL kisitini zorunlu is alanlarina ekle', 'FOREIGN KEY ile iliskili tabloya referans ver, ON DELETE davranisini sec'],
    itemsEn: ['Determine what entity the table represents (users, orders, products)', 'Choose name and appropriate data type for each column (INT, VARCHAR(255), DATE, BOOLEAN)', 'Identify PRIMARY KEY column — unique, immutable, cannot be NULL', 'Add NOT NULL constraint to mandatory business fields', 'Reference the related table with FOREIGN KEY, choose ON DELETE behavior'],
  },
  'sql-insert': {
    tr: 'SQL — Veri ekleme',
    en: 'SQL — Data insertion',
    taskTr: 'Bu micro lab, INSERT INTO soz dizimini pekistirir: sutun listesi + VALUES zorunlulugu, tek/coklu satir farki ve conflict stratejisi. Sutun listesi yazmamak yeni sutun eklenince test verisini bozar.',
    taskEn: 'This micro-lab reinforces INSERT INTO syntax: column list + VALUES requirement, single/multiple row difference, and conflict strategy. Omitting the column list breaks test data when a new column is added.',
    orderTr: 'SQL ile test verisi ekleme sirasi nedir?',
    orderEn: 'What is the SQL test data insertion order?',
    stepIcons: ['➕', '📝', '🔍', '📋', '⚡'],
    stepLabelsTr: ['Tablo ve sutunlari listele', 'VALUES hazirla', 'NULL alanlari belirle', 'Sonucu oku', 'Conflict stratejisi'],
    stepLabelsEn: ['List table and columns', 'Prepare VALUES', 'Identify NULL fields', 'Read result', 'Conflict strategy'],
    itemsTr: ['INSERT INTO tabloadi (sutun1, sutun2) seklinde sutunlari ac.a yaz', 'VALUES (deger1, deger2) ile her sutun icin deger sagla', 'NULL olabilecek alanlari NULL olarak ya da default deger ile gec', 'RETURNING id veya SELECT son satir ile eklenen kaydı dogrula', 'Cakisma ihtimali varsa ON CONFLICT DO NOTHING / UPDATE ile strateji belirle'],
    itemsEn: ['Write column names explicitly: INSERT INTO tablename (col1, col2)', 'Provide a value for each column with VALUES (val1, val2)', 'Pass nullable fields as NULL or with default value', 'Verify the inserted record with RETURNING id or SELECT last row', 'If conflict is possible, set strategy with ON CONFLICT DO NOTHING / UPDATE'],
  },
  'sql-select': {
    tr: 'SQL — Veri sorgulama',
    en: 'SQL — Data querying',
    taskTr: 'Bu micro lab, SELECT sorgusunun yurutme sirasini pekistirir: FROM → WHERE → SELECT → ORDER BY → LIMIT. Yazim sirasi ile yurutme sirasi farklıdır — bu farki bilmeden JOIN ve WHERE hatalari anlasilmaz.',
    taskEn: 'This micro-lab reinforces the SELECT execution order: FROM → WHERE → SELECT → ORDER BY → LIMIT. Writing order and execution order differ — without knowing this, JOIN and WHERE mistakes are incomprehensible.',
    orderTr: 'SQL SELECT sorgusunun yurutme sirasi nedir?',
    orderEn: 'What is the SQL SELECT query execution order?',
    stepIcons: ['🗄️', '🔍', '📊', '📈', '🔢'],
    stepLabelsTr: ['FROM — kaynak', 'WHERE — filtre', 'SELECT — sutunlar', 'ORDER BY — siralama', 'LIMIT — sayi kisiti'],
    stepLabelsEn: ['FROM — source', 'WHERE — filter', 'SELECT — columns', 'ORDER BY — sort', 'LIMIT — count limit'],
    itemsTr: ['FROM ile hangi tablodan veri cekecegini belirle', 'WHERE ile satrılari filtrele — calistirilacak ilk mantiksal adim', 'SELECT ile hangi sutunları gorecegini sec — * yerine acik sutun adi yaz', 'ORDER BY ile siralama sutununu ve yonunu (ASC/DESC) belirle', 'LIMIT ile donecek maksimum satir sayisini kisıtla'],
    itemsEn: ['Determine which table to query with FROM', 'Filter rows with WHERE — the first logical step that runs', 'Select which columns to see with SELECT — write explicit column names, not *', 'Set sorting column and direction (ASC/DESC) with ORDER BY', 'Limit the maximum number of rows returned with LIMIT'],
  },
  'sql-modify': {
    tr: 'SQL — Guncelleme ve Silme',
    en: 'SQL — Update and Delete',
    taskTr: 'Bu micro lab, UPDATE ve DELETE guvenlik akisini pekistirir. WHERE olmadan UPDATE butun tabloyu degistirir, WHERE olmadan DELETE butun tabloyu siler. Once SELECT ile kontrol et, sonra duzenleme yap.',
    taskEn: 'This micro-lab reinforces the UPDATE and DELETE safety flow. UPDATE without WHERE changes the entire table, DELETE without WHERE deletes the entire table. Check with SELECT first, then make the change.',
    orderTr: 'SQL guncelleme veya silme islemini guvenli yapma sirasi nedir?',
    orderEn: 'What is the safe SQL update or delete order?',
    stepIcons: ['🔒', '👁️', '🎯', '⚡', '✅'],
    stepLabelsTr: ['Transaction baslat', 'SELECT ile kontrol et', 'WHERE yaz', 'UPDATE/DELETE calistir', 'COMMIT/ROLLBACK'],
    stepLabelsEn: ['Begin transaction', 'Check with SELECT', 'Write WHERE', 'Run UPDATE/DELETE', 'COMMIT/ROLLBACK'],
    itemsTr: ['BEGIN TRANSACTION ile islemleri sardır — hata durumunda geri alinabilir ol', 'Once SELECT * FROM tablo WHERE kosul ile etkilenecek kayitları goruntule', 'WHERE kosulunu yazarken PRIMARY KEY veya benzersiz sutun kullan', 'UPDATE tablo SET sutun=deger WHERE kosul veya DELETE FROM tablo WHERE kosul calistir', 'Sonucu dogrulayip COMMIT et; sorun varsa ROLLBACK ile geri don'],
    itemsEn: ['Wrap operations with BEGIN TRANSACTION — make it reversible on error', 'First view affected records with SELECT * FROM table WHERE condition', 'Use PRIMARY KEY or unique column when writing WHERE condition', 'Run UPDATE table SET col=value WHERE condition or DELETE FROM table WHERE condition', 'Verify the result and COMMIT; if there is a problem, use ROLLBACK'],
  },
  'sql-join': {
    tr: 'SQL — JOIN sorgulari',
    en: 'SQL — JOIN queries',
    taskTr: 'Bu micro lab, JOIN tur secimini ve ON kosulunu pekistirir. INNER sadece eslesen → LEFT tum sol + eslesen sag → RIGHT tum sag. ON olmadan yapilan JOIN kartezyen carpim uretir — binlerce satirlik yanlış sonuc.',
    taskEn: 'This micro-lab reinforces JOIN type selection and ON condition. INNER only matching → LEFT all left + matching right → RIGHT all right. A JOIN without ON produces a Cartesian product — thousands of wrong rows.',
    orderTr: 'SQL JOIN sorgusunu dogru yazma sirasi nedir?',
    orderEn: 'What is the correct SQL JOIN query writing order?',
    stepIcons: ['🔗', '🎯', '📊', '🔍', '⚡'],
    stepLabelsTr: ['JOIN turu sec', 'ON kosulunu yaz', 'Sutunlari belirt', 'NULL sonuclari yorumla', 'Index kontrol et'],
    stepLabelsEn: ['Select JOIN type', 'Write ON condition', 'Specify columns', 'Interpret NULLs', 'Check index'],
    itemsTr: ['Hangi JOIN turu lazim: kesisim icin INNER, sol tam icin LEFT, sag tam icin RIGHT', 'ON tablo1.id = tablo2.foreign_key ile tablolar arasi baglantı kur', 'SELECT komutu ile tablo.sutun formatinda hangi sutunlar gorunecek belirt', 'LEFT JOIN sonucunda NULL gelen satirlari yorumla: esleme yok demek', 'JOIN yapilan sutunlar icin INDEX var mi kontrol et — performans kritik'],
    itemsEn: ['Which JOIN type: INNER for intersection, LEFT for full left, RIGHT for full right', 'Connect tables with ON table1.id = table2.foreign_key', 'Specify which columns appear in SELECT with table.column format', 'Interpret NULL rows in LEFT JOIN result: no match found', 'Check if INDEX exists on JOIN columns — performance is critical'],
  },
  'sql-advanced': {
    tr: 'SQL — GROUP BY / CTE / Window',
    en: 'SQL — GROUP BY / CTE / Window',
    taskTr: 'Bu micro lab, aggregation ve ileri SQL yapilarini pekistirir: GROUP BY gruplayarak ozetler, HAVING gruplara filtre uygular, CTE (WITH) sorguyu modüler yapar, Window fonksiyonlari satir bazlı hesap yapar.',
    taskEn: 'This micro-lab reinforces aggregation and advanced SQL structures: GROUP BY groups and summarizes, HAVING filters groups, CTE (WITH) makes queries modular, Window functions compute row-by-row.',
    orderTr: 'SQL GROUP BY ve Window Function sorgusu yazma sirasi nedir?',
    orderEn: 'What is the SQL GROUP BY and Window Function query writing order?',
    stepIcons: ['📊', '🗂️', '🔍', '📦', '🪟'],
    stepLabelsTr: ['Aggregation mi Window mi?', 'GROUP BY sec', 'HAVING filtrele', 'CTE ile modüler yap', 'OVER(PARTITION BY) ekle'],
    stepLabelsEn: ['Aggregation or Window?', 'Select GROUP BY', 'Filter with HAVING', 'Make modular with CTE', 'Add OVER(PARTITION BY)'],
    itemsTr: ['Aggregation (ozetleme) mi Window (satir bazli hesap) mi? Onu belirle', 'Aggregation icin GROUP BY ile ozetlenecek sutunu sec', 'HAVING ile gruplara kosul uygula — WHERE gibi ama agregasyon sonrasinda', 'WITH cte_adi AS (...) SELECT ... FROM cte_adi ile sorguyu modülerlestir', 'Window icin SUM(col) OVER (PARTITION BY bolum ORDER BY siralama) kullan'],
    itemsEn: ['Determine: aggregation (summarizing) or Window (row-by-row computing)?', 'For aggregation, select the summary column with GROUP BY', 'Apply condition on groups with HAVING — like WHERE but after aggregation', 'Modularize query with WITH cte_name AS (...) SELECT ... FROM cte_name', 'For Window, use SUM(col) OVER (PARTITION BY partition ORDER BY sort)'],
  },
  // ── JAVASCRIPT ────────────────────────────────────────────────────────────
  javascript: {
    tr: 'JavaScript QA kod yazma',
    en: 'JavaScript QA coding practice',
    taskTr: 'Bu micro lab, JavaScript snippet\'ini aktif alistirmaya cevirir: kritik satiri tamamla, async/await veya assertion mantigi uzerinden QA kaniti kur.',
    taskEn: 'This micro-lab turns the JavaScript snippet into active practice: complete the critical line, build QA evidence through async/await or assertion logic.',
    orderTr: 'JavaScript QA kodunu guvenli yazma ve test etme sirasi nedir?',
    orderEn: 'What is the safe order for writing and testing JavaScript QA code?',
    stepIcons: ['📖', '⏳', '✍️', '▶️', '🔁'],
    stepLabelsTr: ['Amaci oku', 'Async baglantisi', 'Assertion tamamla', 'Ciktıyi oku', 'Flaky ise strateji'],
    stepLabelsEn: ['Read goal', 'Async dependency', 'Complete assertion', 'Read output', 'Strategy if flaky'],
    itemsTr: ['Amaci ve asenkron bagimliliklari oku', 'await / Promise zincirini dogru yere yerlestir', 'assertion veya beklenti satirini tamamla', 'Kodu calistirip console veya test ciktisini oku', 'Flaky olursa bekleme stratejisi veya retry ekle'],
    itemsEn: ['Read the goal and async dependencies', 'Place await / Promise chain in the right spot', 'Complete the assertion or expectation line', 'Run and read console or test output', 'If flaky, add a wait strategy or retry'],
  },
  // ── POSTMAN ───────────────────────────────────────────────────────────────
  postman: {
    tr: 'Postman test scripti yazma',
    en: 'Postman test script writing',
    taskTr: 'Bu micro lab, Postman ornegini pasif okumadan aktif alistirmaya tasir: pm.test / pm.expect satirini tamamla, response alanini dogrula ve Newman CI akisina dahil et.',
    taskEn: 'This micro-lab moves the Postman example from passive reading to active practice: complete the pm.test / pm.expect line, verify the response field, and include it in the Newman CI flow.',
    orderTr: 'Postman ile API test yazma ve CI\'a ekleme sirasi nedir?',
    orderEn: 'What is the order for writing Postman API tests and adding them to CI?',
    stepIcons: ['📤', '✅', '💾', '📦', '🚀'],
    stepLabelsTr: ['Request gonder', 'pm.test yaz', 'Degisken kaydet', 'Collection\'a ekle', 'CI kanitini oku'],
    stepLabelsEn: ['Send request', 'Write pm.test', 'Save variable', 'Add to collection', 'Read CI evidence'],
    itemsTr: ['Request gonder ve status code\'u oku', 'pm.test ile response body alanini dogrula', 'Environment variable\'a dinamik degeri kaydet', 'Collection\'a dahil et ve Newman ile calistir', 'CI pipeline ciktisindan PASS/FAIL kanitini oku'],
    itemsEn: ['Send the request and read the status code', 'Validate a response body field with pm.test', 'Save the dynamic value to an environment variable', 'Include in the collection and run with Newman', 'Read the PASS/FAIL evidence from CI pipeline output'],
  },
  // ── REST ASSURED ──────────────────────────────────────────────────────────
  restassured: {
    tr: 'REST Assured assertion yazma',
    en: 'REST Assured assertion writing',
    taskTr: 'Bu micro lab, REST Assured ornegini aktif assertion alistirmasina cevirir: given/when/then zincirini tamamla, Hamcrest matcher\'ini dogru yere koy ve CI testini gec.',
    taskEn: 'This micro-lab turns the REST Assured example into an active assertion exercise: complete the given/when/then chain, place the Hamcrest matcher correctly, and pass the CI test.',
    orderTr: 'REST Assured ile API testi yazma ve dogrulama sirasi nedir?',
    orderEn: 'What is the order for writing and validating a REST Assured API test?',
    stepIcons: ['🔧', '📤', '📊', '📋', '🚀'],
    stepLabelsTr: ['given() kur', 'when() gonder', 'statusCode dogrula', 'body() kontrol', 'CI runner'],
    stepLabelsEn: ['Set up given()', 'Send with when()', 'Verify statusCode', 'Check body()', 'CI runner'],
    itemsTr: ['given() ile base URL ve auth\'u kur', 'when().get/post/put/delete ile istegi gonder', 'then().statusCode() ile HTTP kodunu dogrula', 'body() ve Hamcrest ile JSON alanlarini kontrol et', 'Testi JUnit/TestNG runner ve CI pipeline\'a dahil et'],
    itemsEn: ['Set base URL and auth with given()', 'Send the request with when().get/post/put/delete', 'Validate the HTTP code with then().statusCode()', 'Check JSON fields with body() and Hamcrest matchers', 'Include the test in JUnit/TestNG runner and CI pipeline'],
  },
  // ── GENERIC FALLBACK ──────────────────────────────────────────────────────
  code: {
    tr: 'Kod yazma',
    en: 'Code practice',
    taskTr: 'Bu micro lab, pasif kod blogunu aktif alistirmaya cevirir: kritik satiri tamamla, adimlari izle ve siralamayi kur.',
    taskEn: 'This micro-lab turns a passive code block into active practice: complete the critical line, follow the steps, and build the order.',
    orderTr: 'Kod okuma ve dogrulama akisini sirala.',
    orderEn: 'Order the code reading and verification flow.',
    stepIcons: ['🎯', '✏️', '▶️', '🔍', '🔁'],
    stepLabelsTr: ['Amaci belirle', 'Satiri tamamla', 'Ciktiyi kontrol et', 'Hatayı oku', 'Yeniden calistir'],
    stepLabelsEn: ['Identify goal', 'Complete line', 'Check output', 'Read error', 'Run again'],
    itemsTr: ['Amaci ve girdiyi belirle', 'Kritik satiri tamamla', 'Cikti veya davranisi kontrol et', 'Hata mesajini kanit olarak oku', 'Duzeltmeyi tekrar calistir'],
    itemsEn: ['Identify goal and input', 'Complete the critical line', 'Check output or behavior', 'Read the error message as evidence', 'Run the fix again'],
  },
}

const DEFAULT_STEP_LABELS_TR = ['Amaci oku', 'Kritik yeri bul', 'Calistir', 'Kaniti oku', 'Pekistir']
const DEFAULT_STEP_LABELS_EN = ['Read goal', 'Find critical point', 'Run', 'Read evidence', 'Reinforce']
const DEFAULT_STEP_ICONS = ['1', '2', '3', '4', '5']

function profileText(profile) {
  return PROFILE_TEXT[profile] ?? PROFILE_TEXT.code
}

function makePracticeBlock(pageKey, sectionIndex, codeIndex, block, profile) {
  const info = profileText(profile)
  const trCode = codeFor(block, 'tr') || codeFor(block, 'en')
  const enCode = codeFor(block, 'en') || codeFor(block, 'tr')

  return {
    type: 'code-playground',
    id: `${pageKey}-auto-practice-${sectionIndex + 1}-${codeIndex + 1}`,
    label: {
      tr: `Micro Lab: ${info.tr}`,
      en: `Micro Lab: ${info.en}`,
    },
    language: block.language || 'text',
    task: {
      tr: info.taskTr,
      en: info.taskEn,
    },
    explanation: {
      tr: 'TODO satirini beklenen cozumdeki kritik satirla degistir. Bu gercek runtime degil; amac dogru yapinin yazilmasini kontrollu olarak pekistirmek.',
      en: 'Replace the TODO line with the critical line from the expected solution. This is not a real runtime; the goal is to reinforce writing the correct structure in a controlled way.',
    },
    code: {
      tr: trCode,
      en: enCode,
    },
    starterCode: {
      tr: makeStarterFromCode(trCode),
      en: makeStarterFromCode(enCode),
    },
    solutionCode: {
      tr: trCode,
      en: enCode,
    },
    expected: {
      tr: 'Cozum beklenen kod yapisiyla eslesti. Artik ayni ornegi sadece okumakla kalmadin; kritik satiri elinle yeniden kurdun.',
      en: 'The solution matches the expected code structure. You did not just read the example; you rebuilt the critical line by hand.',
    },
    hints: [
      { tr: 'TODO satiri, orijinal kod ornegindeki ilk anlamli satirin yerine kondu.', en: 'The TODO line replaces the first meaningful line in the original code sample.' },
      { tr: 'Cozumle birebir eslesme gerekir; bosluk ve satir sirasini dikkatli koru.', en: 'The solution must match exactly; preserve spacing and line order carefully.' },
      { tr: 'Takilirsan Beklenen Cikti veya orijinal kod blogundaki akisi oku, sonra yalnizca TODO satirini degistir.', en: 'If stuck, read the expected output or the original code flow, then change only the TODO line.' },
    ],
    xpReward: 10,
  }
}

function makeStepBlock(pageKey, sectionIndex, codeIndex, profile) {
  const info = profileText(profile)
  const labelsTr = info.stepLabelsTr ?? DEFAULT_STEP_LABELS_TR
  const labelsEn = info.stepLabelsEn ?? DEFAULT_STEP_LABELS_EN
  const icons = info.stepIcons ?? DEFAULT_STEP_ICONS

  return {
    type: 'step-animation',
    id: `${pageKey}-auto-step-${sectionIndex + 1}-${codeIndex + 1}`,
    title: {
      tr: `Adim Adim: ${info.tr}`,
      en: `Step by Step: ${info.en}`,
    },
    steps: info.itemsTr.map((detail, i) => ({
      id: i + 1,
      icon: icons[i] ?? String(i + 1),
      label: {
        tr: labelsTr[i] ?? DEFAULT_STEP_LABELS_TR[i] ?? String(i + 1),
        en: labelsEn[i] ?? DEFAULT_STEP_LABELS_EN[i] ?? String(i + 1),
      },
      detail: {
        tr: detail,
        en: info.itemsEn[i],
      },
    })),
  }
}

function makeOrderBlock(pageKey, sectionIndex, codeIndex, profile) {
  const info = profileText(profile)
  return {
    type: 'challenge',
    variant: 'order-sort',
    id: `${pageKey}-auto-order-${sectionIndex + 1}-${codeIndex + 1}`,
    question: {
      tr: info.orderTr,
      en: info.orderEn,
    },
    items: info.itemsTr.map((text, index) => ({
      id: String(index + 1),
      text: {
        tr: text,
        en: info.itemsEn[index],
      },
      order: index + 1,
    })),
    xpReward: 10,
  }
}

function segmentUntilNextCode(blocks, codeIndex) {
  const segment = []
  for (let index = codeIndex + 1; index < blocks.length; index += 1) {
    if (blocks[index]?.type === 'code') break
    segment.push(blocks[index])
  }
  return segment
}

function hasPractice(block) {
  return block?.type === 'code-playground' && Boolean(block.starterCode || block.solutionCode)
}

function sectionNeedsTrioAfterCode(blocks, codeIndex) {
  const segment = segmentUntilNextCode(blocks, codeIndex)
  return {
    practice: segment.some(hasPractice),
    step: segment.some((block) => block?.type === 'step-animation'),
    order: segment.some((block) => block?.type === 'challenge' && block.variant === 'order-sort'),
  }
}

// defs: array of { sectionIndex, promptTr, promptEn, keywords, minScore, modelAnswerTr, modelAnswerEn }
// Adds a feynman-checkpoint block to the end of each section that is missing one.
// Works with both shared-sections (restAssured, javascript) and separate en/tr (postman).
export function fillMissingFeynman(data, defs) {
  const roots = data?.en || data?.tr ? [data.en, data.tr].filter(Boolean) : [data]
  const seenBlocks = new WeakSet()

  roots.forEach((root) => {
    const sections = root?.sections || []
    defs.forEach(({ sectionIndex, promptTr, promptEn, keywords, minScore, modelAnswerTr, modelAnswerEn }) => {
      const section = sections[sectionIndex]
      if (!section) return
      const blocks = section.blocks
      if (!Array.isArray(blocks)) return
      if (seenBlocks.has(blocks)) return
      const hasFeynman = blocks.some((b) => b?.type === 'feynman-checkpoint')
      if (hasFeynman) return
      seenBlocks.add(blocks)
      blocks.push({
        type: 'feynman-checkpoint',
        promptTr,
        promptEn,
        keywords,
        minScore: minScore ?? Math.ceil(keywords.length * 0.5),
        modelAnswerTr,
        modelAnswerEn,
      })
    })
  })
}

export function fillMissingCodeTrios(data, pageKey) {
  const roots = data?.en || data?.tr ? [data.en, data.tr].filter(Boolean) : [data]
  const seenBlocks = new WeakSet()

  roots.forEach((root) => {
    ;(root.sections || []).forEach((section, sectionIndex) => {
      const blocks = section.blocks
      if (!Array.isArray(blocks) || seenBlocks.has(blocks)) return
      seenBlocks.add(blocks)

      // Extract plain text title for section-aware profile selection
      const sectionTitle = typeof section.title === 'string'
        ? section.title
        : (section.title?.en || section.title?.tr || section.label || '')

      for (let index = blocks.length - 1; index >= 0; index -= 1) {
        const block = blocks[index]
        if (block?.type !== 'code') continue

        const state = sectionNeedsTrioAfterCode(blocks, index)
        if (state.practice && state.step && state.order) continue

        const profile = resolveProfile(pageKey, block, sectionTitle)
        const additions = []
        if (!state.practice) additions.push(makePracticeBlock(pageKey, sectionIndex, index, block, profile))
        if (!state.step) additions.push(makeStepBlock(pageKey, sectionIndex, index, profile))
        if (!state.order) additions.push(makeOrderBlock(pageKey, sectionIndex, index, profile))

        blocks.splice(index + 1, 0, ...additions)
      }
    })
  })
}
