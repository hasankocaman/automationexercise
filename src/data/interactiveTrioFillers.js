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

function resolveProfile(pageKey, block) {
  const language = compact(block.language)
  const code = compact(codeFor(block, 'en') || codeFor(block, 'tr'))

  if (pageKey === 'docker') {
    if (language.includes('dockerfile') || code.includes(' from ') || code.startsWith('from ')) return 'dockerfile'
    if (language.includes('yaml') || code.includes('services:') || code.includes('docker compose')) return 'compose'
    return 'docker'
  }

  if (pageKey === 'jenkins') return 'jenkins'

  if (pageKey === 'kubernetes') {
    if (language.includes('yaml') || code.includes('apiversion:') || code.includes('kind:')) return 'k8s-manifest'
    if (code.includes('kubectl') || language.includes('bash')) return 'kubectl'
    return 'k8s-pipeline'
  }

  if (pageKey === 'typescript') return 'typescript'
  if (pageKey === 'python') return 'python'
  if (pageKey === 'selenium') return 'selenium'
  if (pageKey === 'playwright') return 'playwright'
  if (pageKey === 'cypress') return 'cypress'
  if (pageKey === 'javascript') return 'javascript'
  if (pageKey === 'postman') return 'postman'
  if (pageKey === 'restassured') return 'restassured'
  return 'code'
}

const PROFILE_TEXT = {
  dockerfile: {
    tr: 'Dockerfile duzeltme',
    en: 'Dockerfile repair',
    taskTr: 'Bu micro lab, pasif Dockerfile ornegini aktif bir duzeltme alistirmasina cevirir: kritik satiri sen tamamla, sonra layer/cache mantigini animasyon ve siralama ile pekistir.',
    taskEn: 'This micro-lab turns the passive Dockerfile example into an active repair exercise: complete the critical line, then reinforce layer/cache logic with animation and ordering.',
    orderTr: 'Dockerfile duzeltme akisini sirala.',
    orderEn: 'Order the Dockerfile repair flow.',
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
    itemsTr: ['Komutun hangi nesneyi hedefledigini belirle', 'Flagleri image adindan once dogru yere koy', 'Komutu calistir ve cikis kodunu oku', 'ps/logs/inspect ile kanit topla', 'Gerekirse stop/rm/prune ile temizle'],
    itemsEn: ['Identify which object the command targets', 'Put flags in the right place before the image name', 'Run the command and read the exit code', 'Collect evidence with ps/logs/inspect', 'Clean up with stop/rm/prune if needed'],
  },
  jenkins: {
    tr: 'Jenkinsfile pipeline stage tamamlama',
    en: 'Jenkinsfile pipeline stage completion',
    taskTr: 'Bu micro lab, Jenkinsfile ornegini aktif pipeline tamamlama alistirmasina cevirir. Java analojisi: class-method-statement hiyerarsisi gibi pipeline-stages-stage-steps hiyerarsisini elle kurarsin.',
    taskEn: 'This micro-lab turns the Jenkinsfile example into an active pipeline completion exercise. Java analogy: like class-method-statement hierarchy, you build pipeline-stages-stage-steps by hand.',
    orderTr: 'Jenkinsfile kalite kapisi akisini sirala.',
    orderEn: 'Order the Jenkinsfile quality-gate flow.',
    itemsTr: ['pipeline ve agent ile calisma yerini sec', 'checkout ile kaynak kodu al', 'build/dependency stageini calistir', 'test stageinde kanit uret', 'post always icinde rapor ve bildirim yayinla'],
    itemsEn: ['Choose execution place with pipeline and agent', 'Fetch source code with checkout', 'Run the build/dependency stage', 'Produce evidence in the test stage', 'Publish reports and notifications inside post always'],
  },
  'k8s-manifest': {
    tr: 'Kubernetes YAML manifest repair',
    en: 'Kubernetes YAML manifest repair',
    taskTr: 'Bu micro lab, YAML manifestini aktif onarim alistirmasina cevirir: alanlari okuyup selector/label/probe/spec zincirinin neden calistigini kanitlarsin.',
    taskEn: 'This micro-lab turns the YAML manifest into an active repair exercise: read fields and prove why selector/label/probe/spec relationships work.',
    orderTr: 'Kubernetes manifest onarim akisini sirala.',
    orderEn: 'Order the Kubernetes manifest repair flow.',
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
    itemsTr: ['Build edilen image tagini sabitle', 'Manifest veya Helm values icine ayni tagi gec', 'Namespace ve credential kapsamlarini dogrula', 'Rollout tamamlanana kadar bekle', 'Smoke test, logs ve raporu yayinla'],
    itemsEn: ['Pin the built image tag', 'Pass the same tag into manifests or Helm values', 'Verify namespace and credential scope', 'Wait until rollout completes', 'Publish smoke test, logs, and reports'],
  },
  typescript: {
    tr: 'TypeScript kod yazma',
    en: 'TypeScript coding practice',
    taskTr: 'Bu micro lab, TypeScript ornegini pasif okumadan cikarir: kritik satiri sen tamamla, tsc gibi dusun, sonra tip kanitini adim adim izle.',
    taskEn: 'This micro-lab moves the TypeScript example beyond passive reading: complete the critical line, think like tsc, then follow the type evidence step by step.',
    orderTr: 'TypeScript tip guvenligi akisini sirala.',
    orderEn: 'Order the TypeScript type-safety flow.',
    itemsTr: ['Veri sozlesmesini interface/type ile tanimla', 'Fonksiyon veya degiskene acik tip ver', 'tsc/editor hatasini kodu calistirmadan yakala', 'Runtime test veya assertion ile davranisi dogrula', 'CI icine tsc --noEmit kontrolu ekle'],
    itemsEn: ['Define the data contract with interface/type', 'Give the function or variable an explicit type', 'Catch the tsc/editor error before runtime', 'Verify behavior with runtime test or assertion', 'Add tsc --noEmit to CI'],
  },
  python: {
    tr: 'Python kod yazma',
    en: 'Python coding practice',
    taskTr: 'Bu micro lab, Python kodunu aktif denemeye cevirir: kritik satiri sen tamamla, beklenen sonuc ile karsilastir ve QA senaryosundaki kaniti oku.',
    taskEn: 'This micro-lab turns the Python code into active practice: complete the critical line, compare with expected result, and read the QA evidence.',
    orderTr: 'Python QA kodunu guvenli calistirma sirasi nedir?',
    orderEn: 'What is the safe order for running Python QA code?',
    itemsTr: ['Girdi ve veri tiplerini oku', 'Kritik satiri en kucuk degisiklikle tamamla', 'Kodu calistirip beklenen ciktiyi karsilastir', 'Hata varsa traceback veya assertion mesajini oku', 'Test raporu icin sonucu tekrar kullanilabilir hale getir'],
    itemsEn: ['Read inputs and data types', 'Complete the critical line with the smallest change', 'Run the code and compare expected output', 'If it fails, read traceback or assertion message', 'Make the result reusable for a test report'],
  },
  selenium: {
    tr: 'Selenium WebDriver adim adim',
    en: 'Selenium WebDriver step by step',
    taskTr: 'Bu micro lab, Selenium ornegini aktif alistirmaya cevirir: WebDriver kurulumundan locator seciminden assertion\'a kadar her adimi sen tamamla ve hangi satirin ne isi yaptigini acikla.',
    taskEn: 'This micro-lab turns the Selenium example into active practice: complete each step from WebDriver setup through locator selection to assertion and explain what each line does.',
    orderTr: 'Selenium WebDriver test akisini dogru sirala.',
    orderEn: 'Order the Selenium WebDriver test flow correctly.',
    itemsTr: ['WebDriver olustur ve tarayiciyi ac', 'URL\'ye git ve sayfayi yukle', 'Element locator\'i sec (ID, CSS, XPath)', 'WebDriverWait ile elementin hazir olmasini bekle', 'Aksiyonu gerceklestir ve assertion ile dogrula'],
    itemsEn: ['Create WebDriver and open the browser', 'Navigate to URL and load the page', 'Select element locator (ID, CSS, XPath)', 'Wait for element readiness with WebDriverWait', 'Perform the action and verify with assertion'],
  },
  playwright: {
    tr: 'Playwright test yazma',
    en: 'Playwright test writing',
    taskTr: 'Bu micro lab, Playwright snippet\'ini aktif alistirmaya cevirir: locator zinciri, auto-wait ve expect assertion siralamasini sen kurarsun; gecen ile gecemeyen arasindaki farki gorursun.',
    taskEn: 'This micro-lab turns the Playwright snippet into active practice: you build the locator chain, auto-wait, and expect assertion order; you see the difference between passing and failing.',
    orderTr: 'Playwright test akisini dogru sirala.',
    orderEn: 'Order the Playwright test flow correctly.',
    itemsTr: ['page.goto() ile hedef URL\'yi yukle', 'page.locator() ile elementi sec', 'Aksiyonu gerceklestir (click, fill, press)', 'expect(locator) assertion ile sonucu dogrula', 'test.afterEach hook\'unda temizle veya ekran goruntusu al'],
    itemsEn: ['Load the target URL with page.goto()', 'Select the element with page.locator()', 'Perform the action (click, fill, press)', 'Verify the result with expect(locator) assertion', 'Clean up or take screenshot in test.afterEach hook'],
  },
  cypress: {
    tr: 'Cypress komutu yazma',
    en: 'Cypress command writing',
    taskTr: 'Bu micro lab, Cypress ornegini aktif alistirmaya cevirir: cy.get(), cy.intercept() ve assertion zincirini sen kurarsun; tarayici icinde calistigi icin neden farkli davrandigini gorursun.',
    taskEn: 'This micro-lab turns the Cypress example into active practice: you build the cy.get(), cy.intercept() and assertion chain; you see why it behaves differently because it runs inside the browser.',
    orderTr: 'Cypress test akisini dogru sirala.',
    orderEn: 'Order the Cypress test flow correctly.',
    itemsTr: ['cy.visit() ile sayfayi ac', 'cy.intercept() ile network istegini yakala (gerekirse)', 'cy.get() veya cy.contains() ile elementi sec', 'Aksiyon gerceklestir: click, type, select', 'should() veya expect() ile assertion yap'],
    itemsEn: ['Open the page with cy.visit()', 'Intercept network request with cy.intercept() if needed', 'Select element with cy.get() or cy.contains()', 'Perform action: click, type, select', 'Assert with should() or expect()'],
  },
  javascript: {
    tr: 'JavaScript QA kod yazma',
    en: 'JavaScript QA coding practice',
    taskTr: 'Bu micro lab, JavaScript snippet\'ini aktif alistirmaya cevirir: kritik satiri tamamla, async/await veya assertion mantigi uzerinden QA kaniti kur.',
    taskEn: 'This micro-lab turns the JavaScript snippet into active practice: complete the critical line, build QA evidence through async/await or assertion logic.',
    orderTr: 'JavaScript QA kodunu guvenli yazma ve test etme sirasi nedir?',
    orderEn: 'What is the safe order for writing and testing JavaScript QA code?',
    itemsTr: ['Amaci ve asenkron bagimliliklari oku', 'await / Promise zincirini dogru yere yerlestir', 'assertion veya beklenti satirini tamamla', 'Kodu calistirip console veya test ciktisini oku', 'Flaky olursa bekleme stratejisi veya retry ekle'],
    itemsEn: ['Read the goal and async dependencies', 'Place await / Promise chain in the right spot', 'Complete the assertion or expectation line', 'Run and read console or test output', 'If flaky, add a wait strategy or retry'],
  },
  postman: {
    tr: 'Postman test scripti yazma',
    en: 'Postman test script writing',
    taskTr: 'Bu micro lab, Postman ornegini pasif okumadan aktif alistirmaya tasir: pm.test / pm.expect satirini tamamla, response alanini dogrula ve Newman CI akisina dahil et.',
    taskEn: 'This micro-lab moves the Postman example from passive reading to active practice: complete the pm.test / pm.expect line, verify the response field, and include it in the Newman CI flow.',
    orderTr: 'Postman ile API test yazma ve CI\'a ekleme sirasi nedir?',
    orderEn: 'What is the order for writing Postman API tests and adding them to CI?',
    itemsTr: ['Request gonder ve status code\'u oku', 'pm.test ile response body alanini dogrula', 'Environment variable\'a dinamik degeri kaydet', 'Collection\'a dahil et ve Newman ile calistir', 'CI pipeline ciktisindan PASS/FAIL kanitini oku'],
    itemsEn: ['Send the request and read the status code', 'Validate a response body field with pm.test', 'Save the dynamic value to an environment variable', 'Include in the collection and run with Newman', 'Read the PASS/FAIL evidence from CI pipeline output'],
  },
  restassured: {
    tr: 'REST Assured assertion yazma',
    en: 'REST Assured assertion writing',
    taskTr: 'Bu micro lab, REST Assured ornegini aktif assertion alistirmasina cevirir: given/when/then zincirini tamamla, Hamcrest matcher\'ini dogru yere koy ve CI testini gec.',
    taskEn: 'This micro-lab turns the REST Assured example into an active assertion exercise: complete the given/when/then chain, place the Hamcrest matcher correctly, and pass the CI test.',
    orderTr: 'REST Assured ile API testi yazma ve dogrulama sirasi nedir?',
    orderEn: 'What is the order for writing and validating a REST Assured API test?',
    itemsTr: ['given() ile base URL ve auth\'u kur', 'when().get/post/put/delete ile istegi gonder', 'then().statusCode() ile HTTP kodunu dogrula', 'body() ve Hamcrest ile JSON alanlarini kontrol et', 'Testi JUnit/TestNG runner ve CI pipeline\'a dahil et'],
    itemsEn: ['Set base URL and auth with given()', 'Send the request with when().get/post/put/delete', 'Validate the HTTP code with then().statusCode()', 'Check JSON fields with body() and Hamcrest matchers', 'Include the test in JUnit/TestNG runner and CI pipeline'],
  },
  code: {
    tr: 'Kod yazma',
    en: 'Code practice',
    taskTr: 'Bu micro lab, pasif kod blogunu aktif alistirmaya cevirir: kritik satiri tamamla, adimlari izle ve siralamayi kur.',
    taskEn: 'This micro-lab turns a passive code block into active practice: complete the critical line, follow the steps, and build the order.',
    orderTr: 'Kod okuma ve dogrulama akisini sirala.',
    orderEn: 'Order the code reading and verification flow.',
    itemsTr: ['Amaci ve girdiyi belirle', 'Kritik satiri tamamla', 'Cikti veya davranisi kontrol et', 'Hata mesajini kanit olarak oku', 'Duzeltmeyi tekrar calistir'],
    itemsEn: ['Identify goal and input', 'Complete the critical line', 'Check output or behavior', 'Read the error message as evidence', 'Run the fix again'],
  },
}

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
  return {
    type: 'step-animation',
    id: `${pageKey}-auto-step-${sectionIndex + 1}-${codeIndex + 1}`,
    title: {
      tr: `Adim Adim: ${info.tr}`,
      en: `Step by Step: ${info.en}`,
    },
    steps: [
      { id: 1, icon: '1', label: { tr: 'Amaci oku', en: 'Read goal' }, detail: { tr: info.itemsTr[0], en: info.itemsEn[0] } },
      { id: 2, icon: '2', label: { tr: 'Kritik yeri bul', en: 'Find critical point' }, detail: { tr: info.itemsTr[1], en: info.itemsEn[1] } },
      { id: 3, icon: '3', label: { tr: 'Calistir', en: 'Run' }, detail: { tr: info.itemsTr[2], en: info.itemsEn[2] } },
      { id: 4, icon: '4', label: { tr: 'Kaniti oku', en: 'Read evidence' }, detail: { tr: info.itemsTr[3], en: info.itemsEn[3] } },
      { id: 5, icon: '5', label: { tr: 'Pekistir', en: 'Reinforce' }, detail: { tr: info.itemsTr[4], en: info.itemsEn[4] } },
    ],
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

      for (let index = blocks.length - 1; index >= 0; index -= 1) {
        const block = blocks[index]
        if (block?.type !== 'code') continue

        const state = sectionNeedsTrioAfterCode(blocks, index)
        if (state.practice && state.step && state.order) continue

        const profile = resolveProfile(pageKey, block)
        const additions = []
        if (!state.practice) additions.push(makePracticeBlock(pageKey, sectionIndex, index, block, profile))
        if (!state.step) additions.push(makeStepBlock(pageKey, sectionIndex, index, profile))
        if (!state.order) additions.push(makeOrderBlock(pageKey, sectionIndex, index, profile))

        blocks.splice(index + 1, 0, ...additions)
      }
    })
  })
}
