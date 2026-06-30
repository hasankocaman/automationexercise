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
  // Some data files use `code` (e.g. pythonData plain string),
  // others use `content` with bilingual objects (e.g. javascriptData).
  const source = block.code != null ? block.code : block.content
  return pickLocalized(source, lang)
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
    hintsTr: ['FROM satirindaki base image katman olustururken cache dongusuyle calisir — once bagimliliklari kopyala, sonra kaynak kodu koy; sira degisince her build sifirdan baslar.', 'COPY package*.json ./ satirini RUN npm install den once yaz — boylece sadece package.json degisince install katmani yeniden calisir, kaynak kodu degisince calismaZ.', 'TODO satiri buyuk ihtimalle RUN install/build komutu veya son COPY satirıdır; katman sirasini boz.'],
    hintsEn: ['The base image in FROM works with the layer cache — copy dependency files first, then source; reversing the order invalidates cache on every build.', 'Put COPY package*.json ./ before RUN npm install — so the install layer only reruns when package.json changes, not when source changes.', 'The TODO line is likely the RUN install/build command or the final COPY line; do not break layer order.'],
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
    hintsTr: ['depends_on servisi baslatar ama hazirligini garantilemez; healthcheck tanimla veya wait-for-it scripti kullan — yoksa app, db ayaga kalkmadan baglanti dener.', 'Compose servis adi otomatik olarak hostname olur: app servisi db\'ye "db:5432" ile erisir, "localhost:5432" ile degil.', 'TODO satiri buyuk ihtimalle environment degiskeni, depends_on veya healthcheck satiridir; servis iliskisini dogru kur.'],
    hintsEn: ['depends_on starts the service but does not guarantee readiness; define a healthcheck or use wait-for-it — otherwise the app tries to connect before db is up.', 'The Compose service name is automatically the hostname: app reaches db at "db:5432", not "localhost:5432".', 'The TODO line is likely an environment variable, depends_on, or healthcheck line; wire service relationships correctly.'],
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
    hintsTr: ['Docker komutlari object-verb sirasiyla okunur: "docker container run", "docker image ls" — nesne once, eylem sonra gelir.', '-it interaktif terminal acar, -d arka planda calistirir, --rm cikinca container\'i siler; flaglerin konumu onemlidir.', 'TODO satiri buyuk ihtimalle flag veya image adi satiridır; siralamaya dikkat et.'],
    hintsEn: ['Docker commands read as object-verb: "docker container run", "docker image ls" — object first, action second.', '-it opens an interactive terminal, -d runs in background, --rm removes the container on exit; flag placement matters.', 'The TODO line is likely a flag or image name line; pay attention to ordering.'],
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
    hintsTr: ['Jenkinsfile hiyerarsisi Java class-method-statement gibidir: pipeline > stages > stage > steps — her katman bir ust katmani gerektirir.', 'post { always { ... } } blogu test fail etse bile calisir; JUnit raporu ve bildirim buraya gider — yoksa fail\'de rapor kaybolur.', 'TODO satiri buyuk ihtimalle stage adi veya steps icindeki sh/bat komutudur.'],
    hintsEn: ['Jenkinsfile hierarchy is like Java class-method-statement: pipeline > stages > stage > steps — each layer requires its parent.', 'The post { always { ... } } block runs even when tests fail; JUnit reports and notifications go here — otherwise reports are lost on failure.', 'The TODO line is likely a stage name or an sh/bat command inside steps.'],
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
    hintsTr: ['spec.selector.matchLabels ile Pod template.metadata.labels birebir eslesmeli — tek harf farki bile Deployment\'in Pod bulmamisina neden olur.', 'readinessProbe trafigi ne zaman alacagini, livenessProbe container canliligini kontrol eder; ikisi farkli amac tasiyor, birbiriyle karıstirma.', 'TODO satiri buyuk ihtimalle metadata.name, image tag veya port satiridir.'],
    hintsEn: ['spec.selector.matchLabels must exactly match Pod template.metadata.labels — a single character difference causes the Deployment to find no Pods.', 'readinessProbe controls when traffic is received, livenessProbe checks container liveness; they serve different purposes, do not mix them up.', 'The TODO line is likely metadata.name, image tag, or a port line.'],
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
    hintsTr: ['kubectl get ozet verir, kubectl describe Events bolumunu gosterir — teshis always describe ile baslar, get ile degil.', 'logs --previous son olum oncesi container\'in loglarini gosterir; CrashLoopBackOff teshisinde bu kritiktir.', 'TODO satiri buyuk ihtimalle -n namespace flag veya kaynak tipidir (pod/deployment/service).'],
    hintsEn: ['kubectl get gives a summary, kubectl describe shows the Events section — diagnosis always starts with describe, not get.', 'logs --previous shows logs from the container before its last death; this is critical for CrashLoopBackOff diagnosis.', 'The TODO line is likely the -n namespace flag or the resource type (pod/deployment/service).'],
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
    hintsTr: ['Image tag olarak "latest" kullanma — commit SHA veya CI build numarasi kullan; yoksa hangi kod deploy oldu takip edilemez.', 'kubectl rollout status deployment/app-name ile deploy tamamlanmadan CI gecmemeli — yoksa yetersiz pod sayisiyla trafik gelir.', 'TODO satiri buyuk ihtimalle image tag veya namespace satiridir.'],
    hintsEn: ['Do not use "latest" as image tag — use commit SHA or CI build number; otherwise you cannot track which code was deployed.', 'CI should not pass before kubectl rollout status deployment/app-name completes — otherwise traffic hits an insufficient number of pods.', 'The TODO line is likely the image tag or namespace line.'],
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
    hintsTr: ['TypeScript tip hatası calisma zamanında degil derleme zamanında yakalanır — Java\'da compiler\'in yakalayacagi hata gibi; ancak .js dosyasinda bu koruma yoktur.', 'interface nesne sozlesmeleri icin, type alias union/intersection icin tercih edilir; ikisi de calısır ama iyi pratik ayrimi kullan.', 'TODO satiri buyuk ihtimalle tip annotation (:string, :number) veya return tip bildirimi satiridir.'],
    hintsEn: ['TypeScript type errors are caught at compile time, not runtime — like a Java compiler error; without it, a .js file has no such protection.', 'interface is preferred for object contracts, type alias for union/intersection; both work but follow the good-practice distinction.', 'The TODO line is likely a type annotation (:string, :number) or return type declaration.'],
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
    hintsTr: ['Python\'da girinti (indentation) Java\'daki {} yerine blok sinirlarini belirler — 4 bosluk standardi; tab ile bosluk karistirma.', 'pytest fixture\'lari Java\'daki @BeforeEach gibi calisir ama scope parametresiyle her test, her session veya her modul icin ayri olusturulabilir.', 'TODO satiri buyuk ihtimalle assert, return veya ilk anlamli islem satirıdır.'],
    hintsEn: ['In Python, indentation defines block boundaries instead of {} like Java — 4-space standard; do not mix tabs and spaces.', 'pytest fixtures work like Java @BeforeEach but can be scoped per test, session, or module with the scope parameter.', 'The TODO line is likely an assert, return, or the first meaningful operation line.'],
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
    hintsTr: ['By.ID en hizli ve guvenilir locatordur — sayfada benzersiz bir ID varsa her zaman bunu sec; CSS veya XPath gereksiz kırılganlık ekler.', '//div[@class="x"]//button gibi uzun XPath zincirleri UI degisince kirilir; By.cssSelector("[data-testid=btn]") gibi kisa ve stabil bir alternatif tercih et.', 'TODO satiri buyuk ihtimalle By.ID("x"), By.cssSelector(".class") veya By.xpath("...") satiridır.'],
    hintsEn: ['By.ID is the fastest and most reliable locator — if there is a unique ID on the page, always use it; CSS or XPath adds unnecessary fragility.', 'Long XPath chains like //div[@class="x"]//button break when UI changes; prefer a short stable alternative like By.cssSelector("[data-testid=btn]").', 'The TODO line is likely By.ID("x"), By.cssSelector(".class"), or By.xpath("...").'],
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
    hintsTr: ['Thread.sleep(5000) agin hizına korkek bir guvence verir — 5sn beklesen de hata beklesen de 5sn sur; WebDriverWait ise element hazir olmaz olmaz devam eder.', 'ExpectedConditions.elementToBeClickable hem gorunur hem tiklanabilir olmayi bekler — visibilityOf sadece gorunurlugu kontrol eder.', 'TODO satiri buyuk ihtimalle new WebDriverWait(...) olusturma veya wait.until(...) satiridir.'],
    hintsEn: ['Thread.sleep(5000) is a fearful bet on network speed — it waits 5s whether it errors in 0.5s or takes 5s; WebDriverWait continues the moment the element is ready.', 'ExpectedConditions.elementToBeClickable waits for both visible AND clickable — visibilityOf only checks visibility.', 'The TODO line is likely the new WebDriverWait(...) creation or the wait.until(...) call.'],
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
    hintsTr: ['click() cagirmadan once WebDriverWait ile tiklanabilir oldugunu dogrula — yoksa StaleElementReferenceException alabilirsin.', 'sendKeys() metni girer, clear() onceki metni temizler — form alanına yazarken once .clear() sonra .sendKeys("yeni") dene.', 'TODO satiri buyuk ihtimalle findElement(), click() veya sendKeys() satiridir.'],
    hintsEn: ['Verify the element is clickable with WebDriverWait before calling click() — otherwise you may get StaleElementReferenceException.', 'sendKeys() types text, clear() clears existing text — when filling a form field, try .clear() then .sendKeys("new") in sequence.', 'The TODO line is likely a findElement(), click(), or sendKeys() call.'],
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
    hintsTr: ['switchTo().frame() sonrasinda defaultContent()\'e donmeyi unutursan ana sayfadaki elementler "no such element" verir — baglam degismeden bulunmazlar.', 'Alert handle etmek icin switchTo().alert() ile alerte gec, getText() ile mesaji al, accept() veya dismiss() ile kapat.', 'TODO satiri buyuk ihtimalle switchTo().frame(...) veya switchTo().defaultContent() satiridir.'],
    hintsEn: ['If you forget to call defaultContent() after switchTo().frame(), elements on the main page give "no such element" — they cannot be found without context switch.', 'To handle an alert, switch with switchTo().alert(), get the message with getText(), then close with accept() or dismiss().', 'The TODO line is likely switchTo().frame(...) or switchTo().defaultContent().'],
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
    hintsTr: ['Screenshot almak icin WebDriver\'i TakesScreenshot\'a cast et: ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE)', 'driver.getPageSource() test anindaki HTML dumpini verir — locator bulmada "element neden gorunmuyor" sorusunun cevabini gosteriyor.', 'TODO satiri buyuk ihtimalle getScreenshotAs(OutputType.FILE) veya getPageSource() satiridir.'],
    hintsEn: ['To take a screenshot, cast WebDriver to TakesScreenshot: ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE)', 'driver.getPageSource() returns the HTML dump at test time — it shows why an element is "not visible" when the locator cannot find it.', 'The TODO line is likely getScreenshotAs(OutputType.FILE) or getPageSource().'],
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
    hintsTr: ['RemoteWebDriver\'i olustururken Hub URL (http://hub:4444/wd/hub) ve DesiredCapabilities (browserName, platform) dogru olmali — aksi halde Node bulunamaz.', 'Paralel testte TestNG paralel="methods" her metodu, paralel="tests" her test tag\'ini farkli thread\'de calistirir; WebDriver instance thread-safe olmali.', 'TODO satiri buyuk ihtimalle RemoteWebDriver olusturma veya capabilities ayarlama satiridir.'],
    hintsEn: ['When creating RemoteWebDriver, Hub URL (http://hub:4444/wd/hub) and DesiredCapabilities (browserName, platform) must be correct — otherwise no Node is found.', 'In parallel testing, TestNG parallel="methods" runs each method in a separate thread, parallel="tests" runs each test tag; WebDriver instances must be thread-safe.', 'The TODO line is likely the RemoteWebDriver creation or capabilities setup.'],
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
    hintsTr: ['getByRole semantic locator olarak ARIA role kullanir — buton ID veya class degisince bile calisir; CSS locator bu durumda kirilir.', 'Bir locator birden fazla element donuyorsa .first() veya .filter({ hasText: "..." }) ile daralt — yoksa Playwright hangi elementi kullanacagini bilemez.', 'TODO satiri buyuk ihtimalle getByRole(), getByLabel() veya page.locator() satiridir.'],
    hintsEn: ['getByRole uses ARIA role as a semantic locator — it keeps working even when button IDs or classes change; a CSS locator would break in that scenario.', 'If a locator returns multiple elements, narrow with .first() or .filter({ hasText: "..." }) — otherwise Playwright does not know which element to use.', 'The TODO line is likely getByRole(), getByLabel(), or page.locator().'],
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
    hintsTr: ['Playwright auto-wait icerdigindan ayri bir bekleme kodu yazmana gerek yok — ama timeout artirmak cop cozum; "neden element actionable degil" sorusunu sor.', 'fill() once alani temizler sonra doldurur; type() karakter karakter yazar — form testlerinde fill() tercih et.', 'TODO satiri buyuk ihtimalle click(), fill(), press() veya selectOption() satiridir.'],
    hintsEn: ['Playwright includes auto-wait so you do not need separate wait code — but increasing timeout is a bad solution; ask "why is the element not actionable?".', 'fill() clears the field first then fills it; type() types character by character — prefer fill() in form tests.', 'The TODO line is likely click(), fill(), press(), or selectOption().'],
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
    hintsTr: ['toBeVisible() element DOM\'da VE gorunur olmasi icin kontrol eder; toHaveText() icerigi kontrol eder — ikisini karistirma, ikisi farkli seyler sorar.', 'Yanlis matcher yanlis PASS verebilir: element gizli olsa dahi toHaveText gecer — once toBeVisible(), sonra toHaveText() yaz.', 'TODO satiri buyuk ihtimalle expect(locator).toBeVisible() veya toHaveText("...") satiridir.'],
    hintsEn: ['toBeVisible() checks the element is in the DOM AND visible; toHaveText() checks content — do not mix them, they ask different questions.', 'A wrong matcher gives wrong PASS: toHaveText may pass even if the element is hidden — write toBeVisible() first, then toHaveText().', 'The TODO line is likely expect(locator).toBeVisible() or toHaveText("...").'],
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
    hintsTr: ['page.route() glob pattern kabul eder: "**/api/**" tum /api/ altindaki istekleri yakalar; sadece belirli endpoint icin "**users**" gibi yazilabilir.', 'route.fulfill() ile status, body ve headers ayri ayri belirtilebilir — 500 hata senaryosu test etmek icin { status: 500, body: "Server Error" } ver.', 'TODO satiri buyuk ihtimalle route.fulfill({...}) veya waitForResponse() satiridir.'],
    hintsEn: ['page.route() accepts glob patterns: "**/api/**" catches all requests under /api/; use "**users**" to target a specific endpoint.', 'With route.fulfill() you can set status, body and headers separately — for a 500 error scenario, pass { status: 500, body: "Server Error" }.', 'The TODO line is likely route.fulfill({...}) or waitForResponse().'],
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
    hintsTr: ['Playwright fixture\'larinda scope: "test" her test icin, scope: "worker" worker basina bir kez olusturur — login pahaliysa worker scope daha verimli.', 'beforeEach icinde page hazirlanmis olsa da goto() test baslamadan URL\'de olmani gerektirir — yoksa tests bos sayfayla baslayabilir.', 'TODO satiri buyuk ihtimalle fixture tanimlama veya beforeEach icindeki goto() satiridir.'],
    hintsEn: ['In Playwright fixtures, scope: "test" creates one per test, scope: "worker" creates once per worker — if login is expensive, worker scope is more efficient.', 'Even if page is prepared in beforeEach, goto() requires you to already be at the URL before tests start — otherwise tests may begin on a blank page.', 'The TODO line is likely the fixture definition or goto() inside beforeEach.'],
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
    hintsTr: ['data-cy attribute test icin ozel tasarlanmistir — production\'a etki etmez, stilden bagimsizdir, UI yeniden yapilaninca bile sabit kalir.', 'cy.contains() metin aramayi retry ile yapar: element DOM\'da guncellense bile Cypress 4sn icinde tekrar dener — ayri bekleme kodu gerekmez.', 'TODO satiri buyuk ihtimalle cy.get("[data-cy=...]") veya cy.contains("metin") satiridir.'],
    hintsEn: ['The data-cy attribute is designed specifically for testing — it does not affect production, is style-independent, and stays stable even when UI is restructured.', 'cy.contains() does text search with retry: even if the element updates in the DOM, Cypress retries within 4s — no separate wait code needed.', 'The TODO line is likely cy.get("[data-cy=...]") or cy.contains("text").'],
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
    hintsTr: ['cy.intercept() visit\'ten ONCE tanimlanmali — request visit ile tetiklenir; sonra tanimlarsan yakalanamaz.', 'cy.wait("@alias") ile istek gerceklesene kadar bekleme yapilir — response olmadan assertion yaparsan yanlis PASS alabilirsin.', 'TODO satiri buyuk ihtimalle cy.intercept() kurulumu veya cy.wait("@alias") satiridir.'],
    hintsEn: ['cy.intercept() must be defined BEFORE cy.visit() — the request is triggered by the visit; defining it after means it cannot be captured.', 'cy.wait("@alias") waits until the request fires — if you assert before the response arrives you may get a wrong PASS.', 'The TODO line is likely the cy.intercept() setup or cy.wait("@alias").'],
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
    hintsTr: ['Cypress komutlari senkron gibi gorunur ama her biri kuyruga girer ve oncekinin tamamlanmasini bekler — manuel await yazmana gerek yok.', '.type() oncesinde .clear() kullanmayi unutma — onceki metin kalirsa test belirsiz PASS veya yanlis veri ile devam eder.', 'TODO satiri buyuk ihtimalle .type("metin"), .click() veya .select("secenek") satiridir.'],
    hintsEn: ['Cypress commands look synchronous but each enters a queue and waits for the previous to complete — no manual await needed.', 'Do not forget to use .clear() before .type() — leftover text causes an ambiguous PASS or tests continuing with wrong data.', 'The TODO line is likely .type("text"), .click(), or .select("option").'],
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
    itemsTr: ['Neyi dogrulayacagini belirle: gorunurluk / metin / CSS / attribute', '.should("be.visible") ile elementin gorunur oldugunu dogrula', '.should("contain.text", "Giris Basarili") ile metin içeriğini kontrol et', '.should("have.attr", "disabled") veya "href" ile attribute dogrula', 'Test fail ettiginde Cypress hata mesajini oku: expected X to ... but got Y'],
    itemsEn: ['Determine what to assert: visibility / text / CSS / attribute', 'Verify element is visible with .should("be.visible")', 'Check text content with .should("contain.text", "Login Successful")', 'Verify attribute with .should("have.attr", "disabled") or "href"', 'When test fails, read Cypress error: expected X to ... but got Y'],
    hintsTr: ['.should("be.visible") elementin DOM\'da VE gorunur oldugunu kontrol eder — element DOM\'da ama hidden olsa dahi bu fail eder.', '.should("have.text", x) tam metin eslesimi yapar; .should("contain.text", x) kismi metin icin — icerigi tum bos bosluklar dahil eslestirir.', 'TODO satiri buyuk ihtimalle .should("be.visible") veya .should("contain.text", "...") satiridir.'],
    hintsEn: ['.should("be.visible") checks the element is in the DOM AND visible — it fails even if the element is in the DOM but hidden.', '.should("have.text", x) is an exact text match; .should("contain.text", x) is for partial text — it matches including all whitespace.', 'The TODO line is likely .should("be.visible") or .should("contain.text", "...").'],
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
    hintsTr: ['PRIMARY KEY otomatik NOT NULL demektir — ayrica NOT NULL yazman gerekmez; ama bunu bilmeden iki kez yazabilirsin, hata vermez sadece gereksiz olur.', 'VARCHAR(255) cok kullanilir ama uygun uzunluk sec — e-mail icin 320, telefon icin 20 yeter; gereksiz buyuk alan disk israf eder.', 'TODO satiri buyuk ihtimalle sutun tanimlama satiri veya PRIMARY KEY/NOT NULL kisit bildirimidir.'],
    hintsEn: ['PRIMARY KEY implies NOT NULL automatically — you do not need to write NOT NULL again; writing it twice is harmless but redundant.', 'VARCHAR(255) is common but choose an appropriate length — 320 for email, 20 for phone is enough; unnecessarily large fields waste disk.', 'The TODO line is likely a column definition line or a PRIMARY KEY/NOT NULL constraint declaration.'],
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
    hintsTr: ['Sutun listesi yazmayi atlarsan tablo yeni sutun alinca sorgu bozulur veya yanlis sutuna veri gider — her INSERT\'te sutun listesi yaz.', 'ON CONFLICT DO NOTHING ayni PRIMARY KEY ikinci kez eklenmeye calisilinca hatayi sessizce yutar — idempotent veri yuklemelerinde kullanilir.', 'TODO satiri buyuk ihtimalle VALUES listesi veya eksik olan sutun deger satiridır.'],
    hintsEn: ['Skipping the column list means your query breaks when the table gets a new column, or data goes to the wrong column — always write the column list in INSERT.', 'ON CONFLICT DO NOTHING silently absorbs a duplicate PRIMARY KEY insertion — used for idempotent data loads.', 'The TODO line is likely the VALUES list or a missing column value.'],
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
    hintsTr: ['SQL yurütme sirasi ile yazma sirasi farklıdır: FROM → WHERE → SELECT → ORDER BY → LIMIT; ama yazarken SELECT once, FROM sonra yazılır.', 'SELECT * yerine acik sutun listesi yaz — bu hem performansi iyilestrir (gereksiz veri cekilmez) hem de sorgu amacini netlestirir.', 'TODO satiri buyuk ihtimalle WHERE kosulu veya SELECT edilen sutun listesidir.'],
    hintsEn: ['SQL execution order differs from writing order: FROM → WHERE → SELECT → ORDER BY → LIMIT; but you write SELECT first, then FROM.', 'Write an explicit column list instead of SELECT * — it improves performance (no unnecessary data fetched) and clarifies query intent.', 'The TODO line is likely the WHERE condition or the list of columns in SELECT.'],
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
    hintsTr: ['WHERE OLMADAN UPDATE tum tabloyu degistirir — once SELECT ile kac satir etkilenecegini gor, sonra UPDATE yaz.', 'ROLLBACK\'in calismasi icin BEGIN TRANSACTION ile baslamis olmalisin — yoksa geri alma imkani yok.', 'TODO satiri buyuk ihtimalle WHERE kosulu veya SET deger atamasidir.'],
    hintsEn: ['UPDATE without WHERE changes the ENTIRE TABLE — first see how many rows will be affected with SELECT, then write the UPDATE.', 'ROLLBACK only works if you started with BEGIN TRANSACTION — otherwise there is no way to undo.', 'The TODO line is likely the WHERE condition or the SET value assignment.'],
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
    hintsTr: ['ON kosulsuz JOIN kartezyen carpim uretir: 1000 satır x 1000 satir = 1.000.000 satir sonuc — her zaman ON kosulunu yaz.', 'LEFT JOIN\'de sagdaki tablodan esleme yoksa NULL gelir — hangi siparislerin musteri kaydı yok bulmak icin IS NULL kosuluyla kullan.', 'TODO satiri buyuk ihtimalle JOIN turu (INNER/LEFT) secimi veya ON kosulunun tamamlanmasidir.'],
    hintsEn: ['A JOIN without ON produces a Cartesian product: 1000 rows × 1000 rows = 1,000,000 result rows — always write the ON condition.', 'In a LEFT JOIN, NULL comes from the right table when there is no match — use with IS NULL to find orders that have no customer record.', 'The TODO line is likely the JOIN type selection (INNER/LEFT) or completing the ON condition.'],
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
    hintsTr: ['HAVING WHERE gibi calisir ama GROUP BY SONRASINDA filtreler — WHERE satirlari GROUP BY oncesinde filtreler; HAVING gruplanmis sonuclara kosul uygulamak icin kullanilir.', 'CTE (WITH x AS ...) sorguyu parcalara boler ve her parcayi adlandirabilirsin — karmasik JOIN ve alt sorgu zincirlerini okunabilir yapar.', 'TODO satiri buyuk ihtimalle OVER(PARTITION BY ...) veya HAVING kosulunun tamamlanmasidir.'],
    hintsEn: ['HAVING works like WHERE but filters AFTER GROUP BY — WHERE filters rows before GROUP BY; HAVING applies conditions to grouped results.', 'CTE (WITH x AS ...) breaks the query into named parts — it makes complex JOIN and subquery chains readable.', 'The TODO line is likely OVER(PARTITION BY ...) or completing the HAVING condition.'],
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
    hintsTr: ['async fonksiyon icinde await yazmadan Promise beklenmez — sonucu almadan assertion yaparsan yanlis PASS verebilirsin.', 'try/catch ile asenkron hatalari yakala — test senaryolarinda 4xx/5xx yaniti bekleniyorsa bu kritiktir.', 'TODO satiri buyuk ihtimalle await, return veya assertion satiridir.'],
    hintsEn: ['Without await inside an async function, the Promise is not awaited — asserting before getting the result may give a wrong PASS.', 'Use try/catch to catch async errors — critical in test scenarios where 4xx/5xx responses are expected.', 'The TODO line is likely await, return, or an assertion line.'],
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
    hintsTr: ['pm.test("aciklama", () => { pm.expect(pm.response.json().field).to.equal("deger") }) seklinde yaz — test ismi aciklayici olmali.', 'pm.environment.set("token", pm.response.json().token) ile auth token\'i bir sonraki request\'e aktar — manuel kopyalama gerekmez.', 'TODO satiri buyuk ihtimalle pm.expect() assertion veya pm.environment.set() satiridir.'],
    hintsEn: ['Write: pm.test("description", () => { pm.expect(pm.response.json().field).to.equal("value") }) — test name should be descriptive.', 'Pass the auth token to the next request with pm.environment.set("token", pm.response.json().token) — no manual copying needed.', 'The TODO line is likely a pm.expect() assertion or pm.environment.set().'],
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
    hintsTr: ['given/when/then zinciri okunurlugu arttirir ve Java stream\'i gibi metodlari zincirler — hepsini tek satirda yaz, ara degisken atama.', 'body("kullanici.adi", equalTo("test")) ile nested JSON alanini nokta noktasyonuyla dogrula; JsonPath kullanir.', 'TODO satiri buyuk ihtimalle .statusCode(200) veya .body("field", equalTo(...)) assertion satiridir.'],
    hintsEn: ['The given/when/then chain improves readability and chains methods like a Java stream — write all in one chain, do not assign intermediate variables.', 'Verify a nested JSON field with dot notation: body("user.name", equalTo("test")); it uses JsonPath internally.', 'The TODO line is likely .statusCode(200) or .body("field", equalTo(...)).'],
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
    hintsTr: ['TODO satiri, orijinal kod ornegindeki ilk anlamli satirin yerine kondu.', 'Cozumle birebir eslesme gerekir; bosluk ve satir sirasini dikkatli koru.', 'Takilirsan Beklenen Cikti veya orijinal kod blogundaki akisi oku, sonra yalnizca TODO satirini degistir.'],
    hintsEn: ['The TODO line replaces the first meaningful line in the original code sample.', 'The solution must match exactly; preserve spacing and line order carefully.', 'If stuck, read the expected output or the original code flow, then change only the TODO line.'],
  },
}

const DEFAULT_STEP_LABELS_TR = ['Amaci oku', 'Kritik yeri bul', 'Calistir', 'Kaniti oku', 'Pekistir']
const DEFAULT_STEP_LABELS_EN = ['Read goal', 'Find critical point', 'Run', 'Read evidence', 'Reinforce']
const DEFAULT_STEP_ICONS = ['1', '2', '3', '4', '5']

function profileText(profile) {
  return PROFILE_TEXT[profile] ?? PROFILE_TEXT.code
}

// Generates 3 hints by analyzing the ACTUAL code content of the block —
// not the profile. Each block gets hints that describe what that specific
// code does, not what the section is about.
// Generates 3 code-specific hints by looking at what the code block actually
// contains. Scoped by pageKey so Selenium hints use Selenium Java syntax,
// Cypress hints use Cypress syntax — no cross-framework contamination.
function hintsForCode(block, pageKey) {
  const raw = codeFor(block, 'en') || codeFor(block, 'tr') || ''
  const c = raw.toLowerCase()

  const candidates = []

  // ── SELENIUM ────────────────────────────────────────────────────────────────
  if (pageKey === 'selenium') {
    if (c.includes('by.id(')) candidates.push({
      tr: 'By.id("...") ile elementleri HTML id attribute\'una gore buluyorsun. id benzersiz olmali — sayfada iki elementte ayni id varsa findElement ilkini alir.',
      en: 'By.id("...") finds elements by their HTML id attribute. id must be unique — if two elements share the same id, findElement picks the first one.',
    })
    if (c.includes('by.xpath(')) candidates.push({
      tr: 'XPath ifadesini kisa tut. //tag[@attr="val"] gibi kisa form, //div/ul/li/span gibi uzun zincirden cok daha saglamdir; UI degisince uzun zincir kirilir.',
      en: 'Keep XPath short. A form like //tag[@attr="val"] is far more stable than a long chain like //div/ul/li/span; the long chain breaks when the UI changes.',
    })
    if (c.includes('by.cssselector(') || c.includes('by.css(')) candidates.push({
      tr: 'CSS selector kisa tut. "#id" veya "[data-testid=btn]" gibi tekil stabil attribute yeterli — .parent > .child gibi uzun zincir gerekirse yeniden dusun.',
      en: 'Keep CSS selectors short. A single stable attribute like "#id" or "[data-testid=btn]" is enough — if you need a long chain like .parent > .child, reconsider.',
    })
    if (c.includes('sendkeys(')) candidates.push({
      tr: 'sendKeys() metni alana yazar. Alan dolu ise onceki metin kalir ve yeni metin ardindan eklenir — once element.clear() cagirmayi unutma.',
      en: 'sendKeys() types text into the field. If the field already has content it appends — remember to call element.clear() first.',
    })
    if (c.includes('webdriverwait') || c.includes('expectedconditions')) candidates.push({
      tr: 'WebDriverWait kosul saglandigi anda devam eder, sabit beklemez. Timeout suresi fazlaysa artirma — locatoru veya sayfayi duzelt.',
      en: 'WebDriverWait continues the moment the condition is met. If you hit a timeout, do not increase the duration — fix the locator or the page.',
    })
    if (c.includes('elementtobeclickable')) candidates.push({
      tr: 'elementToBeClickable hem gorunur hem tiklanabilir olmasi gerektigini kontrol eder. visibilityOf sadece gorunurlugu test eder — aktif elementler icin elementToBeClickable kullan.',
      en: 'elementToBeClickable checks that the element is both visible AND clickable. visibilityOf only tests visibility — use elementToBeClickable for interactive elements.',
    })
    if (c.includes('switchto()') && c.includes('frame')) candidates.push({
      tr: 'switchTo().frame() ile iframe\'e girince driver baglamini degistirdin. Isi bitince switchTo().defaultContent() ile ana icerige don — yoksa sonraki findElement "no such element" verir.',
      en: 'switchTo().frame() switches the driver context into the iframe. When done, return with switchTo().defaultContent() — otherwise the next findElement throws "no such element".',
    })
    if (c.includes('switchto()') && c.includes('alert')) candidates.push({
      tr: 'JavaScript alert icin switchTo().alert() ile alerte bak; alert.getText() ile mesaji oku, accept() ile onayla, dismiss() ile kapat.',
      en: 'For a JavaScript alert, switch with switchTo().alert(); read the message with alert.getText(), confirm with accept() or cancel with dismiss().',
    })
    if (c.includes('getscreenshotas') || c.includes('outputtype')) candidates.push({
      tr: 'Screenshot icin driver\'i TakesScreenshot\'a cast et: ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE). Her WebDriver bunu destekler.',
      en: 'To take a screenshot, cast the driver: ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE). Every WebDriver implementation supports this.',
    })
    if (c.includes('actions') && (c.includes('movetoelement') || c.includes('dragand') || c.includes('build()'))) candidates.push({
      tr: 'Actions zincirinde her adimi builder\'a ekle, en son build().perform() ile calistir — perform() olmadan hicbir hareket gerceklesmez.',
      en: 'In an Actions chain, add each step to the builder, then execute with build().perform() at the end — without perform() nothing happens.',
    })
    if (c.includes('new select(')) candidates.push({
      tr: 'Select sinifi yalnizca HTML <select> elementi ile calisir. selectByVisibleText() gorunen metne, selectByValue() value attribute\'una gore secer.',
      en: 'The Select class only works with an HTML <select> element. selectByVisibleText() by visible text, selectByValue() by value attribute.',
    })
    if (c.includes('navigate()')) candidates.push({
      tr: 'driver.navigate().back/forward/refresh() tarayici gecmisinde hareket eder. Yeni sekme acilmissa once switchTo().window() ile dogru sekmeye gec.',
      en: 'driver.navigate().back/forward/refresh() moves through browser history. If a new tab was opened, switch to it first with switchTo().window().',
    })
    if (c.includes('getwindowhandles') || (c.includes('switchto()') && c.includes('window'))) candidates.push({
      tr: 'getWindowHandles() tum acik pencerelerin String Set\'ini dondurur. Yeni sekme sondadir — for-each ile son handle\'i al ve switchTo().window() ile gec.',
      en: 'getWindowHandles() returns a String Set of all open window handles. The new tab is last — iterate to the last element and switch with switchTo().window().',
    })
    if (c.includes('thread.sleep(')) candidates.push({
      tr: 'Thread.sleep() sabit bekler ve flaky testin kaynagindan biridir. Yerine WebDriverWait + ExpectedConditions kullan — test 10 kat hizlanabilir.',
      en: 'Thread.sleep() blindly waits and is a main source of flaky tests. Replace with WebDriverWait + ExpectedConditions — tests can run 10x faster.',
    })
    if (c.includes('isdisplayed()')) candidates.push({
      tr: 'isDisplayed() elementin gorunur olup olmadigini dondurur. DOM\'da varsa ama display:none ise false gelir. Assertion icin assertTrue(element.isDisplayed()) kullan.',
      en: 'isDisplayed() returns whether the element is visible. In the DOM but display:none returns false. For assertion use assertTrue(element.isDisplayed()).',
    })
    if (c.includes('isenabled()')) candidates.push({
      tr: 'isEnabled() elementin etkilesime acik olup olmadigini dondurur. disabled attribute olan form alani veya buton false dondurur.',
      en: 'isEnabled() returns whether the element is interactive. A form field or button with the disabled attribute returns false.',
    })
    if (c.includes('getattribute(')) candidates.push({
      tr: 'getAttribute("attr") HTML attribute degerini string olarak dondurur. Boolean attribute (disabled, checked) icin null veya "true" gelir — null, attribute yok demektir.',
      en: 'getAttribute("attr") returns the HTML attribute value as string. For boolean attributes (disabled, checked) returns null or "true" — null means the attribute is absent.',
    })
    if (c.includes('gettext()') || (c.includes('.text') && !c.includes('getbytext') && !c.includes('bytext'))) candidates.push({
      tr: 'getText() elementin gorunur metin icerigini dondurur. Input alanindaki deger icin getAttribute("value") kullan — getText() input\'ta bos string dondurur.',
      en: 'getText() returns the visible text content. For the value inside an input field, use getAttribute("value") — getText() returns empty string for inputs.',
    })
    if (c.includes('remotewebdriver') || c.includes('desiredcapabilities')) candidates.push({
      tr: 'RemoteWebDriver Grid Hub\'e baglanir. Hub URL ve DesiredCapabilities dogru olmali — yanlis olursa "no such session" hatasi gelir.',
      en: 'RemoteWebDriver connects to the Grid Hub. Hub URL and DesiredCapabilities must be correct — otherwise you get "no such session".',
    })
    if (c.includes('.click()') && !c.includes('webdriverwait') && !c.includes('elementtobeclickable')) candidates.push({
      tr: 'click() cagirmadan once WebDriverWait ile elementToBeClickable kosulunu bekle — element gorunur ama disabled olabilir, o durumda click yutulur.',
      en: 'Before click(), wait with WebDriverWait for elementToBeClickable — the element may be visible but disabled; in that case click is silently ignored.',
    })
  }

  // ── PLAYWRIGHT ──────────────────────────────────────────────────────────────
  if (pageKey === 'playwright') {
    if (c.includes('getbyrole(')) candidates.push({
      tr: 'getByRole() elementin ARIA rolunu kullanir. Buton label\'i veya CSS class degisse bile calisir cunku semantik katmana bakar, gorunum katmanina degil.',
      en: 'getByRole() uses the element ARIA role. It keeps working even if the button label or CSS class changes because it reads the semantic layer, not the visual layer.',
    })
    if (c.includes('getbylabel(')) candidates.push({
      tr: 'getByLabel() form alanini HTML <label> ile iliskilendirir. data-testid gerekmeden semantik olarak bulur — erisebilirlik ve test icin iyi pratik.',
      en: 'getByLabel() associates the field with its HTML <label>. Finds it semantically without data-testid — good practice for both accessibility and testing.',
    })
    if (c.includes('getbytext(')) candidates.push({
      tr: 'getByText() varsayilan tam metin eslesmesi yapar. Kismi metin icin { exact: false } sec. Dinamik veya cevrilmis metin varsa dikkatli kullan.',
      en: 'getByText() does exact text matching by default. Use { exact: false } for partial text. Be careful with dynamic or translated text.',
    })
    if (c.includes('getbytestid(')) candidates.push({
      tr: 'getByTestId() data-testid attribute\'unu arar. Stil ve yapi degisikliklerinden etkilenmez — ama HTML\'e data-testid="..." eklemen gerekir.',
      en: 'getByTestId() looks for the data-testid attribute. Unaffected by style or structure changes — but requires adding data-testid="..." to HTML.',
    })
    if (c.includes('.filter(')) candidates.push({
      tr: 'Locator birden fazla element donduruyorsa .filter({ hasText: "..." }) veya .first() / .nth(N) ile daralt — yoksa Playwright hangi elementi kullanacagini bilemez.',
      en: 'If a locator returns multiple elements, narrow it with .filter({ hasText: "..." }) or .first() / .nth(N) — otherwise Playwright does not know which element to use.',
    })
    if (c.includes('tobevisible()')) candidates.push({
      tr: 'toBeVisible() elementi DOM\'da ve gorunur halde kontrol eder. display:none ise toBeVisible FAIL eder ama toHaveText PASS edebilir — ikisini karistirma.',
      en: 'toBeVisible() checks the element is in the DOM AND visible. If display:none, toBeVisible FAILS but toHaveText may PASS — do not mix them.',
    })
    if (c.includes('tohavetext(')) candidates.push({
      tr: 'toHaveText() varsayilan tam eslesme; { exact: false } ile kismi eslesmeye gec. Bos bosluklar dahil eslestirir.',
      en: 'toHaveText() does exact matching by default; use { exact: false } for partial matching. It matches including all whitespace.',
    })
    if (c.includes('tohaveurl(')) candidates.push({
      tr: 'toHaveURL() string veya regex kabul eder. /dashboard/ gibi regex ile URL\'nin sadece o kisminin icerdigi dogrulanabilir.',
      en: 'toHaveURL() accepts a string or regex. A regex like /dashboard/ verifies only that part of the URL — no need to write the full URL.',
    })
    if (c.includes('page.route(')) candidates.push({
      tr: 'page.route() glob pattern kabul eder. "**/api/**" tum /api/ isteklerini, "**/users*" sadece /users ile baslayan istekleri yakalar.',
      en: 'page.route() accepts glob patterns. "**/api/**" catches all /api/ requests, "**/users*" catches only requests starting with /users.',
    })
    if (c.includes('route.fulfill(')) candidates.push({
      tr: 'route.fulfill({ status, body, headers }) ile tam kontrollu sahte yanit dondur. 500 senaryosu icin { status: 500, body: "error" } ver.',
      en: 'Return a controlled fake response with route.fulfill({ status, body, headers }). For a 500 scenario pass { status: 500, body: "error" }.',
    })
    if (c.includes('waitforresponse(')) candidates.push({
      tr: 'waitForResponse() bir click ile Promise.all\'da kullan: const [res] = await Promise.all([page.waitForResponse("**/api"), page.click("btn")]). Boylece race condition olmaz.',
      en: 'Use waitForResponse() with Promise.all alongside a click: const [res] = await Promise.all([page.waitForResponse("**/api"), page.click("btn")]). This avoids race conditions.',
    })
    if (c.includes('.fill(')) candidates.push({
      tr: 'fill() once alani temizler sonra doldurur. type() karakter karakter simule eder. Form doldurmada fill() daha hizli ve guvenilir.',
      en: 'fill() clears the field first then writes the value. type() simulates typing character by character. For form filling, fill() is faster and more reliable.',
    })
    if (c.includes('.click(')) candidates.push({
      tr: 'Playwright click() zaten actionable olana kadar bekler — element disabled veya gorunmez ise otomatik bekler. Ayri wait kodu yazmana gerek yok.',
      en: 'Playwright click() already waits until the element is actionable — if disabled or not visible it waits automatically. No separate wait code needed.',
    })
    if (c.includes('beforeeach(') || c.includes('test.use(')) candidates.push({
      tr: 'test.beforeEach her test oncesinde calisir. Fixture daha esnektir: scope="worker" ile login gibi pahalı islemleri worker basina bir kez yapabilirsin.',
      en: 'test.beforeEach runs before each test. Fixtures are more flexible: with scope="worker" you can do expensive operations like login once per worker.',
    })
    if (c.includes('newcontext(') || c.includes('context.newpage(')) candidates.push({
      tr: 'Her BrowserContext kendi cookie ve session izolasyonunu saglar. Farkli kullanici rolleri icin ayri context olustur, tek page paylasma.',
      en: 'Each BrowserContext has its own cookie and session isolation. For different user roles create a separate context per role, do not share a single page.',
    })
  }

  // ── CYPRESS ─────────────────────────────────────────────────────────────────
  if (pageKey === 'cypress') {
    if (c.includes('cy.get(') || c.includes('cy.find(')) candidates.push({
      tr: 'cy.get() her denemede DOM\'u yeniden sorgular ve 4 saniyeye kadar retry yapar. Element gecikmeyle yukleniyor olsa bile ayri bekleme kodu yazmana gerek yok.',
      en: 'cy.get() re-queries the DOM on every attempt and retries for up to 4 seconds. Even if the element loads with a delay, no separate wait code is needed.',
    })
    if (c.includes('[data-cy=') || c.includes('[data-testid=')) candidates.push({
      tr: 'data-cy/data-testid attribute test icin ayri tutulur. CSS sinifi veya metin degisse bile bu attribute kalir — production\'u etkilemez.',
      en: 'data-cy/data-testid attribute is reserved for testing. Even if CSS class or text changes this attribute stays — it does not affect production.',
    })
    if (c.includes('cy.contains(')) candidates.push({
      tr: 'cy.contains("metin") DOM\'da o metni iceren ilk elementi arar. cy.get(".list").contains("Item") ile kombinlince sadece .list icinde arar.',
      en: 'cy.contains("text") searches for the first element containing that text. Combined as cy.get(".list").contains("Item") it only searches inside .list.',
    })
    if (c.includes('.should') && c.includes('be.visible')) candidates.push({
      tr: '.should("be.visible") Cypress\'in retry ile dogruladigi assertion. Element DOM\'da var ama display:none ise fail eder — visibility:hidden da fail eder.',
      en: '.should("be.visible") is a Cypress assertion that retries. If the element is in the DOM but display:none or visibility:hidden this assertion fails.',
    })
    if (c.includes('.should') && (c.includes('have.text') || c.includes('contain.text'))) candidates.push({
      tr: '.should("have.text", x) tam metin, .should("contain.text", x) kismi metin icin. Dinamik veya fazla bosluklu metin icin contain daha guvenli.',
      en: '.should("have.text", x) is exact text, .should("contain.text", x) is partial. For dynamic or whitespace-heavy text, contain is safer.',
    })
    if (c.includes('cy.intercept(')) candidates.push({
      tr: 'cy.intercept() tanimini cy.visit() veya aksiyondan ONCE yap. Intercept kurulmadan request atilirsa artik yakalanamaz — siralama kritiktir.',
      en: 'Define cy.intercept() BEFORE cy.visit() or the triggering action. If the request fires before the intercept is set, it cannot be captured — order is critical.',
    })
    if (c.includes('cy.wait(') && c.includes('@')) candidates.push({
      tr: 'cy.wait("@alias") intercept ateslenene kadar testi bekletir. Response gelmeden assertion yapilirsa undefined veya eski veriyle karsilasabilirsin.',
      en: 'cy.wait("@alias") holds the test until the intercept fires. Asserting before the response arrives may give undefined or stale data.',
    })
    if (c.includes('cy.fixture(')) candidates.push({
      tr: 'cy.fixture("dosya.json") fixtures/ klasorunundeki JSON\'u yukler. cy.intercept(..., { fixture: "dosya.json" }) ile direk kullanabilirsin.',
      en: 'cy.fixture("file.json") loads JSON from the fixtures/ folder. Use it directly as cy.intercept(..., { fixture: "file.json" }), no separate parsing needed.',
    })
    if (c.includes('.type(')) candidates.push({
      tr: '.type() yazmadan once alan dolu olabilir. Once .clear() ile temizle, sonra .type() — yoksa eski metin kalir ve test yanlis veri girebilir.',
      en: 'Before .type() the field might already have content. Clear it first with .clear(), then .type() — otherwise old text stays and the test may enter wrong data.',
    })
    if (c.includes('.click()')) candidates.push({
      tr: '.click() otomatik retry yapar. Element gizli veya disabled ise fail eder. Gerekirse once .should("be.visible") ile gorundugunu dogrula, sonra click yap.',
      en: 'Cypress .click() auto-retries. If the element is hidden or disabled the click fails. If needed, first assert with .should("be.visible"), then click.',
    })
    if (c.includes('cy.request(')) candidates.push({
      tr: 'cy.request() dogrudan HTTP istegi gonderir, tarayici uzerinden gitmez. API testleri veya auth token almak icin kullanilir.',
      en: 'cy.request() sends an HTTP request directly, bypassing the browser. Use it for API tests or getting an auth token.',
    })
  }

  // ── SQL ──────────────────────────────────────────────────────────────────────
  if (pageKey === 'sql') {
    // SQLite CLI dot-commands — önce kontrol et, yorum içindeki "CREATE TABLE" metnini tetiklememek için
    const isSqliteCli = c.includes('sqlite3 ') || (c.includes('.tables') && c.includes('.quit')) || c.includes('.schema ') || c.includes('.headers on') || c.includes('.mode column')
    if (isSqliteCli) {
      candidates.push({
        tr: 'sqlite3 komutundan sonra veritabanı adını yaz (sqlite3 mytest.db). Dosya yoksa sıfırdan oluşturur; varsa açar. `.quit` ile çıkana kadar bağlantı açık kalır.',
        en: 'Write the database name after sqlite3 (sqlite3 mytest.db). If the file does not exist it is created; if it does, it is opened. The connection stays open until you type `.quit`.',
      })
      candidates.push({
        tr: '`.tables` tüm tabloları listeler, `.schema tablo_adı` o tablonun CREATE TABLE ifadesini gösterir. `.headers on` ve `.mode column` birlikte çıktıyı sütun hizalı ve başlıklı yapar.',
        en: '`.tables` lists all tables, `.schema tablename` shows that table\'s CREATE TABLE statement. `.headers on` and `.mode column` together make output column-aligned with headers.',
      })
      candidates.push({
        tr: '`SELECT sqlite_version()` bağlantının gerçekten çalıştığını doğrular. Kurulum sorunlarını debug ederken ilk yazman gereken komuttur.',
        en: '`SELECT sqlite_version()` verifies the connection is truly working. It\'s the first command to write when debugging installation issues.',
      })
    }
    if (!isSqliteCli && c.includes('select *')) candidates.push({
      tr: 'SELECT * tum sutunlari ceker. Buyuk tablolarda gereksiz veri tasir. Hangi sutunlara ihtiyacin var, sadece onlari yaz.',
      en: 'SELECT * fetches all columns. On large tables this transfers unnecessary data. Write only the columns you actually need.',
    })
    if (!isSqliteCli && c.includes('where ') && (c.includes('update ') || c.includes('delete '))) candidates.push({
      tr: 'WHERE olmadan UPDATE veya DELETE tum tabloyu etkiler. Once SELECT ile kac satir etkilenecegini gor, sonra yap.',
      en: 'UPDATE or DELETE without WHERE affects the entire table. First run a SELECT to see how many rows are affected, then make the change.',
    })
    if (!isSqliteCli && c.includes('where ') && c.includes('select ') && !c.includes('update') && !c.includes('delete')) candidates.push({
      tr: 'WHERE yurutme sirasinda FROM\'dan hemen sonra calisir. SELECT\'te kullandigin alias\'lara WHERE icinde erisemezsin — alias henuz tanimlanmamistir.',
      en: 'WHERE runs immediately after FROM in execution order. You cannot access SELECT aliases inside WHERE — the alias is not defined yet at that point.',
    })
    if (!isSqliteCli && c.includes('join ') && !c.includes(' on ')) candidates.push({
      tr: 'JOIN ifadesinde ON kosulunu yazmayi unutursan kartezyen carpim olusur: 1000 satir x 1000 satir = 1.000.000 satir. ON her zaman olmali.',
      en: 'Forgetting the ON condition in a JOIN creates a Cartesian product: 1000 rows x 1000 rows = 1,000,000 rows. ON must always be present.',
    })
    if (!isSqliteCli && c.includes('left join')) candidates.push({
      tr: 'LEFT JOIN soldaki tum satirlari, sagdaki tablodan eslesenleri dondurur. Eslesme yoksa sagdaki sutunlar NULL gelir — IS NULL ile filtreleyebilirsin.',
      en: 'LEFT JOIN returns all rows from the left and matched rows from the right. When there is no match, right table columns come as NULL — filter with IS NULL.',
    })
    if (!isSqliteCli && c.includes('inner join')) candidates.push({
      tr: 'INNER JOIN sadece her iki tabloda da eslesen satirlari dondurur. Sadece bir tarafta olan kayit sonuca dahil edilmez.',
      en: 'INNER JOIN only returns rows that match in both tables. A record that exists only on one side is excluded from results.',
    })
    if (!isSqliteCli && c.includes('insert into')) candidates.push({
      tr: 'INSERT INTO\'da sutun listesi yaz: INSERT INTO tablo (s1, s2) VALUES (...). Listeyi atlarsan tablo yeni sutun alinca degerler yanlis sutuna gidebilir.',
      en: 'Write the column list in INSERT INTO: INSERT INTO table (c1, c2) VALUES (...). Skip it and adding a new column may send values to the wrong column.',
    })
    if (!isSqliteCli && c.includes('group by')) candidates.push({
      tr: 'HAVING GROUP BY SONRASINDA filtreler. WHERE satirlari filtreler, HAVING grupları filtreler. Bir grubun min/max/sum degerine gore filtre icin HAVING kullan.',
      en: 'HAVING filters AFTER GROUP BY. WHERE filters rows, HAVING filters groups. Use HAVING to filter by a group min/max/sum value.',
    })
    if (!isSqliteCli && (c.includes('over(') || c.includes('over ('))) candidates.push({
      tr: 'Window fonksiyonu OVER() satirlari cokmez — her satir hesabini alinirken liste korunur. SUM(fiyat) OVER (PARTITION BY kategori) her satira kategorinin toplaminı yazar.',
      en: 'Window function with OVER() does not collapse rows — each row gets its own calculation while the list is preserved. SUM(price) OVER (PARTITION BY category) writes the category total on every row.',
    })
    if (!isSqliteCli && c.includes('with ') && c.includes(' as (')) candidates.push({
      tr: 'CTE (WITH x AS ...) karmasik sorguyu adli bloklara boler. Tekrar kullanman gerekecek alt sorguyu CTE\'ye al — ic ice zincirden cok daha okunabilir.',
      en: 'CTE (WITH x AS ...) breaks a complex query into named blocks. Move a reused subquery into a CTE — far more readable than nested subquery chains.',
    })
    // Yalnızca gerçek CREATE TABLE ifadesi varsa tetikle (yorum içindeki "CREATE TABLE" metnini es geç)
    if (!isSqliteCli && c.includes('create table') && c.includes('(')) candidates.push({
      tr: 'PRIMARY KEY otomatik NOT NULL icerir. FOREIGN KEY taniminda ON DELETE CASCADE veya SET NULL davranisini sec.',
      en: 'PRIMARY KEY includes NOT NULL automatically. In FOREIGN KEY, choose ON DELETE CASCADE or SET NULL behavior.',
    })
    if (!isSqliteCli && c.includes('order by')) candidates.push({
      tr: 'ORDER BY olmadan sonuc sirasi belirsizdir. Deterministik siralama icin ORDER BY her zaman yaz.',
      en: 'Without ORDER BY the result order is undefined. Always write ORDER BY for deterministic sorting.',
    })
  }

  // ── PYTHON / PYTEST ──────────────────────────────────────────────────────────
  if (pageKey === 'python') {
    if (c.includes('@pytest.fixture')) candidates.push({
      tr: '@pytest.fixture Java @BeforeEach gibi calisir ama scope parametresiyle daha esnektir. scope="session" tum oturum icin bir kez calisir.',
      en: '@pytest.fixture works like Java @BeforeEach but is more flexible with scope. scope="session" runs once for the whole session — ideal for expensive setups like login.',
    })
    if (c.includes('def test_')) candidates.push({
      tr: 'pytest test fonksiyonu test_ ile baslamali, yoksa kesfedilmez. Fonksiyon adi ne test ettigini aciklamali: test_login_with_invalid_password gibi.',
      en: 'pytest test functions must start with test_, otherwise not discovered. The function name should explain what is tested: test_login_with_invalid_password.',
    })
    if (c.includes('assert ')) candidates.push({
      tr: 'pytest assert\'te == deger eslesmesi, is kimlik eslesmesi yapar. None kontrolu icin assert result is None kullan.',
      en: 'In pytest assert, == checks value equality, is checks identity. For None checks use assert result is None.',
    })
    if (c.includes('requests.get(') || c.includes('requests.post(')) candidates.push({
      tr: 'response.json() body\'yi dict\'e cevirir — JSON olmasi gerekir, yoksa JSONDecodeError firlatir. Once response.status_code == 200 kontrol et, sonra json() cagir.',
      en: 'response.json() converts the body to dict — needs valid JSON, otherwise throws JSONDecodeError. Check response.status_code == 200 first, then call json().',
    })
    if (c.includes('pytest.mark.parametrize')) candidates.push({
      tr: '@pytest.mark.parametrize ayni test fonksiyonunu farkli parametrelerle calistirir. Java TestNG @DataProvider gibi.',
      en: '@pytest.mark.parametrize runs the same test with different parameters. Like Java TestNG @DataProvider.',
    })
    if (c.includes('with pytest.raises(')) candidates.push({
      tr: 'with pytest.raises(HataAdi) blogu icindeki kod o hatayi firlatmali. Firlatmazsa test FAIL eder. Hata mesajini str(excinfo.value) ile kontrol edebilirsin.',
      en: 'Code inside with pytest.raises(ErrorName) must raise that exception. If not, the test FAILS. Check the error message with str(excinfo.value).',
    })
    if (c.includes('def ') && c.includes('yield')) candidates.push({
      tr: 'pytest fixture\'da yield once setup, sonra teardown demektir. yield\'dan sonraki kod her testten sonra calisir — try/finally ile teardown guvence altina alinir.',
      en: 'In a pytest fixture, yield separates setup from teardown. Code after yield runs after each test — use try/finally to ensure teardown always runs.',
    })
    if (c.includes('.click()') || c.includes('find_element') || c.includes('send_keys')) candidates.push({
      tr: 'Python Selenium\'da driver metotlari Java ile ayni anlama sahip: find_element, send_keys, click. Tek fark: Java camelCase, Python snake_case kullanir.',
      en: 'Python Selenium driver methods have the same meaning as Java: find_element, send_keys, click. The only difference: Java uses camelCase, Python uses snake_case.',
    })
  }

  // ── TYPESCRIPT ───────────────────────────────────────────────────────────────
  if (pageKey === 'typescript') {
    if (c.includes('interface ')) candidates.push({
      tr: 'interface nesne sozlesmesi tanimlar. type alias daha geneldir: union (A | B), intersection (A & B) gibi yapilar icin type kullan.',
      en: 'interface defines an object contract. type alias is more general: use type for unions (A | B), intersections (A & B), and utility types (Partial<T>).',
    })
    if (c.includes(': string') || c.includes(': number') || c.includes(': boolean')) candidates.push({
      tr: 'TypeScript tipleri derleme zamaninda kontrol edilir — Java derleyicisi gibi, runtime\'a gelmez. Editorde gordugun hatayi orada duzelt.',
      en: 'TypeScript types are checked at compile time — like a Java compiler, errors never reach runtime. Fix the error in the editor; it will not exist at runtime.',
    })
    if (c.includes(' as any')) candidates.push({
      tr: '"as any" tip denetimini tamamen kapatir — runtime hatasi alabilirsin. "as unknown as Tip" daha guvenli: adim adim cast eder.',
      en: '"as any" completely disables type checking — you can get runtime errors. "as unknown as Type" is safer: it forces step-by-step casting.',
    })
    if (c.includes('<t>') || c.includes('<t,') || (c.includes('<') && c.includes('>') && c.includes('function '))) candidates.push({
      tr: 'Generic <T> fonksiyon veya sinifi farkli tiplerle calistirir. Java List<E> gibi. T yerine anlam tasiyan isim (Item, Response) kullanmak okunurlugu arttirir.',
      en: 'Generic <T> makes a function or class reusable with different types. Like Java List<E>. Using a meaningful name (Item, Response) instead of T improves readability.',
    })
    if (c.includes('async ') || c.includes('await ') || c.includes('promise<')) candidates.push({
      tr: 'async fonksiyon Promise<T> dondurur. await olmadan cagirilirsa Promise nesnesi gelir, T degeri degil. await her zaman async icinde kullanilmali.',
      en: 'An async function returns Promise<T>. Calling without await gives the Promise object, not T. await must always be used inside an async function.',
    })
    if (c.includes('partial<') || c.includes('required<') || c.includes('pick<') || c.includes('omit<')) candidates.push({
      tr: 'Utility tip: Partial<T> tum fieldlari opsiyonel, Required<T> zorunlu yapar. Pick<T,"a"> sadece secili fieldlari alir, Omit<T,"a"> secili fieldi cikarir.',
      en: 'Utility types: Partial<T> makes all fields optional, Required<T> makes all mandatory. Pick<T,"a"> takes selected fields, Omit<T,"a"> removes the selected field.',
    })
  }

  // ── DOCKER ───────────────────────────────────────────────────────────────────
  if (pageKey === 'docker') {
    if (c.match(/^from /m) || c.includes('\nfrom ')) candidates.push({
      tr: 'FROM satiri base image\'i sectigin ilk katmandir. node:alpine veya python:slim gibi kucuk image\'ler hem boyutu azaltir hem guvenlik acigini.',
      en: 'The FROM line selects the base image as the first layer. Small images like node:alpine or python:slim reduce both image size and the attack surface.',
    })
    if (c.includes('copy ') && c.includes('package')) candidates.push({
      tr: 'COPY package*.json ./ satirini RUN npm install\'dan ONCE yaz. Kaynak kodu degisince install katmani cache\'den gelir.',
      en: 'Put COPY package*.json ./ BEFORE RUN npm install. When source code changes, the install layer comes from cache.',
    })
    if (c.includes('run ') && (c.includes('&&') || c.includes('apt') || c.includes('pip') || c.includes('npm'))) candidates.push({
      tr: 'Her RUN satirı ayri bir layer olusturur. Birbirine bagli komutlari && ile tek RUN\'da birlestir — toplam layer sayisi ve image boyutu azalir.',
      en: 'Every RUN line creates a separate layer. Combine related commands in a single RUN with && — this reduces the total layer count and image size.',
    })
    if (c.includes('docker run')) candidates.push({
      tr: '-d arka planda calistirir, -p 8080:80 port yonlendirir, --name isim verir, --rm cikinca siler. Birlikte: docker run -d -p 8080:80 --name app image.',
      en: '-d runs in background, -p 8080:80 forwards a port, --name gives a name, --rm removes on exit. Together: docker run -d -p 8080:80 --name app image.',
    })
    if (c.includes('services:') || c.includes('depends_on')) candidates.push({
      tr: 'depends_on servisi baslAtir ama hazirligini garantilemez. Healthcheck tanimla ya da wait-for-it kullan — yoksa app servis db hazir olmadan baglanti dener.',
      en: 'depends_on starts the service but does not guarantee readiness. Define a healthcheck or use wait-for-it — otherwise the app tries to connect before db is ready.',
    })
    if (c.includes('env') || c.includes('environment')) candidates.push({
      tr: 'Hassas degerleri Dockerfile\'a yazma. Docker secrets veya .env dosyasi kullan — .env\'i .gitignore\'a ekle.',
      en: 'Do not write sensitive values in the Dockerfile. Use Docker secrets or a .env file — add .env to .gitignore.',
    })
  }

  // ── JENKINS ──────────────────────────────────────────────────────────────────
  if (pageKey === 'jenkins') {
    if (c.includes('pipeline {') || c.includes('stage(') || c.includes('stages {')) candidates.push({
      tr: 'post { always { ... } } blogu stage fail etse bile calisir. JUnit raporu ve bildirimler buraya koy — yoksa test basarisiz olunca rapor kaybolur.',
      en: 'The post { always { ... } } block runs even if a stage fails. Put JUnit reports and notifications here — otherwise reports are lost when a test fails.',
    })
    if (c.includes('environment {') || c.includes('env.')) candidates.push({
      tr: 'credentials("id") ile hassas veriyi Jenkins Credentials Store\'dan al. Sifre veya token Jenkinsfile\'a dogrudan yazilirsa git gecmisinde sonsuza kalir.',
      en: 'Use credentials("id") to pull sensitive data from Jenkins Credentials Store. Writing a password or token directly in the Jenkinsfile makes it permanent in git history.',
    })
    if (c.includes('sh ') || c.includes('bat ')) candidates.push({
      tr: 'sh Linux agent\'ta, bat Windows agent\'ta calisir. Agent Linux ise sh yeterli; cross-platform pipeline\'da agent etiketiyle isletim sistemini kontrol et.',
      en: 'sh runs on a Linux agent, bat on Windows. If the agent is Linux, sh is enough; in cross-platform pipelines control the OS via the agent label.',
    })
    if (c.includes('parallel {') || c.includes('parallel(')) candidates.push({
      tr: 'parallel blok ile birden fazla stage ayni anda calistirilabilir. Test suitesini paralel stage\'lere bolerek toplam sure kisaltilebilir.',
      en: 'The parallel block can run multiple stages simultaneously. Split test suites into parallel stages to reduce total pipeline duration.',
    })
  }

  // ── KUBERNETES ───────────────────────────────────────────────────────────────
  if (pageKey === 'kubernetes') {
    if (c.includes('kubectl get')) candidates.push({
      tr: 'kubectl get ozet verir: NAME, STATUS, READY. Detay ve Events icin kubectl describe kullan — teshis her zaman describe ile baslar.',
      en: 'kubectl get gives a summary: NAME, STATUS, READY. For details and Events use kubectl describe — diagnosis always starts with describe.',
    })
    if (c.includes('kubectl describe')) candidates.push({
      tr: 'kubectl describe ciktisindaki Events bolumu sorun teshisinin en onemli kismidir. "FailedScheduling", "CrashLoopBackOff" gibi olaylar orada gorulur.',
      en: 'The Events section in kubectl describe is the most important part for diagnosis. Events like "FailedScheduling" or "CrashLoopBackOff" appear there.',
    })
    if (c.includes('kubectl logs')) candidates.push({
      tr: 'kubectl logs PODADI mevcut container logunu gosterir. Container yeniden baslatilmissa --previous ile son olum oncesinin loglarini al.',
      en: 'kubectl logs PODNAME shows the current container log. If the container was restarted, use --previous to get logs from before the last death.',
    })
    if (c.includes('kubectl apply')) candidates.push({
      tr: 'kubectl apply idempotent\'tir — ayni manifest tekrar gonderilince sadece degisen alan guncellenir, kaynak silinip yeniden olusturulmaz.',
      en: 'kubectl apply is idempotent — sending the same manifest again only updates changed fields, it does not delete and recreate the resource.',
    })
    if (c.includes('matchlabels:') || (c.includes('labels:') && c.includes('selector:'))) candidates.push({
      tr: 'spec.selector.matchLabels ile Pod template.metadata.labels birebir eslesmeli. Tek harf farki bile Deployment\'in Pod bulmamamasina neden olur.',
      en: 'spec.selector.matchLabels must exactly match Pod template.metadata.labels. Even a single character difference causes the Deployment to find no Pods.',
    })
  }

  // ── REST ASSURED ─────────────────────────────────────────────────────────────
  if (pageKey === 'restassured') {
    if (c.includes('given()') || c.includes('when()') || c.includes('.then()')) candidates.push({
      tr: 'given/when/then zinciri okunurlugu arttirir. given() kurulum, when() istek, then() dogrulama. Hepsini tek zincirde yaz.',
      en: 'given/when/then chain improves readability. given() is setup, when() is the request, then() is verification. Write all in one chain.',
    })
    if (c.includes('body(') && (c.includes('equalto(') || c.includes('hasitems('))) candidates.push({
      tr: 'body("alan.adi", equalTo("deger")) JSON alanini JsonPath ile dogrular. Ic ice alan icin nokta notasyonu: "data.user.name". Dizi icin "items[0].id".',
      en: 'body("field.name", equalTo("value")) verifies a JSON field with JsonPath. For nested fields use dot notation: "data.user.name". For arrays: "items[0].id".',
    })
    if (c.includes('statuscode(')) candidates.push({
      tr: 'then().statusCode(200) HTTP status kodunu dogrular. Sadece 200 degil, 201, 204, 400, 404 gibi tum senaryolari ayri testlerle kapsa.',
      en: 'then().statusCode(200) verifies the HTTP status code. Cover all scenarios with separate tests — not just 200, but also 201, 204, 400, 404.',
    })
  }

  // ── POSTMAN ──────────────────────────────────────────────────────────────────
  if (pageKey === 'postman') {
    if (c.includes('pm.test(')) candidates.push({
      tr: 'pm.test("aciklama", () => { ... }) seklinde yaz. Test ismi ne dogrulandigini aciklamali: "Status 200 dondurur" gibi.',
      en: 'Write pm.test("description", () => { ... }). The name should explain what is verified: "Returns status 200".',
    })
    if (c.includes('pm.expect(')) candidates.push({
      tr: 'pm.expect(pm.response.json().alan).to.equal(deger) ile JSON alanini dogrula. .to.include() kismi string, .to.have.lengthOf() dizi uzunlugu icin.',
      en: 'Verify a JSON field with pm.expect(pm.response.json().field).to.equal(value). Use .to.include() for partial string, .to.have.lengthOf() for array length.',
    })
    if (c.includes('pm.environment.set(') || c.includes('pm.variables.set(')) candidates.push({
      tr: 'pm.environment.set("anahtar", deger) ile dinamik degeri bir sonraki request\'e aktar. Token, id veya URL parcalari icin kullan.',
      en: 'Transfer dynamic values to the next request with pm.environment.set("key", value). Use this for tokens, ids, or URL parts.',
    })
    if (c.includes('pm.response.json()')) candidates.push({
      tr: 'pm.response.json() body\'yi parse eder. Body JSON degilse hata firlatir — once pm.response.code kontrolu yap, sonra json() cagir.',
      en: 'pm.response.json() parses the body. If not JSON it throws — check pm.response.code first, then call json().',
    })
  }

  // ── JAVASCRIPT ───────────────────────────────────────────────────────────────
  if (pageKey === 'javascript') {
    if (c.includes('async ') && c.includes('await ')) candidates.push({
      tr: 'async fonksiyon Promise dondurur. await olmadan cagirilirsa Promise nesnesi gelir, asil deger gelmez. await her zaman async fonksiyon icinde kullan.',
      en: 'An async function returns a Promise. Calling without await gives the Promise object, not the actual value. Always use await inside an async function.',
    })
    if (c.includes('fetch(')) candidates.push({
      tr: 'fetch() network hatalarinda reject eder ama 4xx/5xx durumlarinda reject ETMEZ — response.ok veya response.status kontrolunu yapman gerekir.',
      en: 'fetch() rejects on network errors but does NOT reject on 4xx/5xx — you must check response.ok or response.status yourself.',
    })
    if (c.includes('promise.all(') || c.includes('promise.allsettled(')) candidates.push({
      tr: 'Promise.all() herhangi birinde basarisiz olunca hepsini iptal eder. Her istegin sonucunu ayri gormek icin Promise.allSettled() kullan.',
      en: 'Promise.all() cancels all if one fails. Use Promise.allSettled() to see each request\'s result separately.',
    })
    if (c.includes('try {') && c.includes('catch')) candidates.push({
      tr: 'fetch veya await hata verdiginde catch blogu devreye girer. catch olmadan assertion yazarsan 4xx/5xx\'de test yanlis hata verir.',
      en: 'When fetch or await errors, the catch block runs. Writing assertions without catch produces misleading errors on 4xx/5xx.',
    })
    if (c.includes('new promise(') || (c.includes('resolve') && c.includes('reject'))) candidates.push({
      tr: 'new Promise() icinde resolve() basari, reject() hata bildirir. Sadece birini cagirmali ve return etmelisin — ikisin de cagirirsan sadece ilki gerceklenir.',
      en: 'Inside new Promise(), resolve() signals success, reject() signals failure. Call only one and return — if you call both, only the first takes effect.',
    })
    if (c.includes('addeventlistener(')) candidates.push({
      tr: 'addEventListener ikinci parametresi fonksiyon referansidir. Arrow function kullanirsan this kapsayici scope\'dan gelir; normal function kullanirsan this elementi isaret eder.',
      en: 'The second parameter of addEventListener is a function reference. With arrow function this comes from the enclosing scope; with normal function this points to the element.',
    })
    if (c.includes('innerhtml') || c.includes('textcontent')) candidates.push({
      tr: 'innerHTML HTML parse eder ve XSS riski tasir. Kullanici girdisi olusecekse textContent kullan — sadece metin yazar, HTML calistirmaz.',
      en: 'innerHTML parses HTML and carries XSS risk. Use textContent when content comes from user input — it writes text only, does not run HTML.',
    })
    if (c.includes('queryselectorall(') || c.includes('queryselector(')) candidates.push({
      tr: 'querySelectorAll() NodeList dondurur, bu bir Array degildir. forEach calisir ama map/filter calistirmak icin Array.from() ile diziye donustur.',
      en: 'querySelectorAll() returns a NodeList, which is not an Array. forEach works on it, but for map/filter convert it with Array.from().',
    })
    if (c.includes('export class') || c.includes('export const') || (c.includes('import ') && c.includes(' from '))) candidates.push({
      tr: 'named export birden fazla seyi paylasir (import { A, B }), default export tek seyi paylasir (import X from ...). Birini karmasan SyntaxError alirsin.',
      en: 'Named export shares multiple things (import { A, B }), default export shares one thing (import X from ...). Mixing them causes SyntaxError.',
    })
    if (c.includes('.reduce(')) candidates.push({
      tr: 'reduce() ikinci parametresi baslangic degeridir. Unutursan ilk eleman baslangic kabul edilir ve sayi/obje toplama gibi senaryolarda yanlis sonuc verir.',
      en: 'The second parameter of reduce() is the initial value. Forgetting it uses the first element as start and gives wrong results in number/object accumulation.',
    })
    if (c.includes('.find(') || c.includes('.some(') || c.includes('.every(')) candidates.push({
      tr: 'find() bulamazsa undefined dondurur — sonucu kullanmadan once null/undefined kontrolu yap. some() ve every() boolean dondurur, element degil.',
      en: 'find() returns undefined when not found — check for null/undefined before using the result. some() and every() return boolean, not an element.',
    })
    if (c.includes('.map(') || c.includes('.filter(')) candidates.push({
      tr: 'map() ve filter() orijinal diziyi degistirmez, yeni dizi dondurur. Sonucu bir degiskene ataman gerekir — yoksa islem kaybolur.',
      en: 'map() and filter() do not modify the original array, they return a new one. You must assign the result to a variable — otherwise the operation is lost.',
    })
    if (c.includes('math.') || c.includes('parseint') || c.includes('parsefloat') || c.includes('.tofixed(')) candidates.push({
      tr: 'NaN === NaN her zaman false\'dur — NaN kontrolu icin Number.isNaN() kullan, == veya === kullanma. toFixed() string dondurur, number degil.',
      en: 'NaN === NaN is always false — use Number.isNaN() for NaN checks, not == or ===. toFixed() returns a string, not a number.',
    })
    if (c.includes('function ') || (c.includes('=>') && c.includes('const '))) candidates.push({
      tr: 'Function declaration hoisting destekler — tanimlanmadan once cagirabilirsin. Arrow function \'this\'i devralir; normal function\'da this cagiran nesneye baglidir.',
      en: 'Function declarations support hoisting — you can call them before definition. Arrow functions inherit \'this\'; in normal functions this depends on who calls them.',
    })
    if (c.includes('class ') && c.includes('constructor')) candidates.push({
      tr: 'ES6 class\'ta constructor this. ile property atar. Method\'u baska bir degiskene atayip cagirirsan this undefined olabilir — bind(this) veya arrow function kullan.',
      en: 'In ES6 class constructor assigns properties with this. Assigning a method to another variable and calling it may make this undefined — use bind(this) or arrow function.',
    })
    if (c.includes('if (') && c.includes('else')) candidates.push({
      tr: 'if/else zinciri okunabilirlik sinirina gelince switch veya lookup object kullanimini dusun. Ternary ( ? : ) kisaysa guzel, uzun ifadeler icin degil.',
      en: 'When if/else chains reach a readability limit, consider switch or a lookup object. Ternary ( ? : ) is good for short expressions, not long ones.',
    })
  }

  // ── GENERIC FALLBACK ─────────────────────────────────────────────────────────
  if (candidates.length === 0) {
    candidates.push(
      { tr: 'Yukaridaki kod bloguna bak. Bu alandaki TODO satirini orijinal koddaki ilk anlamli satirla degistir.', en: 'Look at the code block above. Replace the TODO line in this field with the first meaningful line from the original code.' },
      { tr: 'Cozumle birebir eslesme gerekir — bosluk, girintileme ve satir sirasina dikkat et.', en: 'The solution must match exactly — pay attention to spacing, indentation, and line order.' },
      { tr: 'Takilirsan sadece TODO olan satiri yaz, geri kalanina dokunma.', en: 'If stuck, write only the TODO line, leave everything else unchanged.' },
    )
  }

  const fallbacks = [
    { tr: 'Yukaridaki kod bloguna bak ve TODO\'yu orijinal satirla degistir.', en: 'Look at the code block above and replace TODO with the original line.' },
    { tr: 'Cozumle birebir eslesme gerekir — girintileme ve satir sirasini koru.', en: 'The solution must match exactly — preserve indentation and line order.' },
    { tr: 'Takilirsan sadece TODO satirini yaz, geri kalanina dokunma.', en: 'If stuck, write only the TODO line, leave everything else unchanged.' },
  ]
  while (candidates.length < 3) {
    candidates.push(fallbacks[candidates.length % fallbacks.length])
  }

  return candidates.slice(0, 3)
}
// Generates a code-SPECIFIC task description by analysing what the block
// actually contains.  Returns {tr, en} or null (fall back to profile text).
function taskDescForCode(block, pageKey) {
  const raw = codeFor(block, 'en') || codeFor(block, 'tr') || ''
  const c = raw.toLowerCase()

  // ── SELENIUM ────────────────────────────────────────────────────────────────
  if (pageKey === 'selenium') {
    if (c.includes('webdriverwait') || c.includes('expectedconditions')) return {
      tr: 'Bu kodda WebDriverWait ile akıllı bekleme kuruyorsun. Thread.sleep() yerine "element hazır olana kadar max N saniye bekle" mantığıyla çalışır — TODO satırı wait nesnesini veya until() çağrısını oluşturuyor.',
      en: 'This code sets up intelligent waiting with WebDriverWait. Instead of Thread.sleep() it works as "wait at most N seconds until element is ready" — the TODO line creates the wait object or the until() call.',
    }
    if (c.includes('by.id(') && !c.includes('xpath') && !c.includes('css')) return {
      tr: 'Bu kodda By.id() ile element arıyorsun. HTML id attribute\'u benzersiz olduğunda en hızlı locator stratejisidir — TODO satırı bu findElement çağrısını oluşturuyor.',
      en: 'This code finds an element with By.id(). When the HTML id attribute is unique this is the fastest locator strategy — the TODO line creates this findElement call.',
    }
    if (c.includes('by.xpath(')) return {
      tr: 'Bu kodda XPath ile element arıyorsun. Güçlü ama kırılgan olabilir — mümkün olan en kısa ifadeyi kullan. TODO satırı XPath locator çağrısını oluşturuyor.',
      en: 'This code finds elements with XPath. Powerful but can be brittle — use the shortest possible expression. The TODO line creates the XPath locator call.',
    }
    if (c.includes('by.cssselector(') || c.includes('by.css(')) return {
      tr: 'Bu kodda CSS selector ile element arıyorsun. "#id" veya "[data-testid=x]" gibi kısa ve stabil selektörler tercih et — TODO satırı bu CSS selector çağrısını oluşturuyor.',
      en: 'This code finds elements with CSS selector. Prefer short stable selectors like "#id" or "[data-testid=x]" — the TODO line creates this CSS selector call.',
    }
    if (c.includes('actions') && (c.includes('build()') || c.includes('movetoelement') || c.includes('perform'))) return {
      tr: 'Bu kodda Actions sınıfı ile karmaşık UI hareketleri yapıyorsun. Her adımı builder\'a ekle, build().perform() ile çalıştır — TODO satırı bu zincirin kritik adımı.',
      en: 'This code performs complex UI moves with the Actions class. Add each step to the builder, run with build().perform() — the TODO line is the critical step in this chain.',
    }
    if (c.includes('switchto()') && (c.includes('frame') || c.includes('alert') || c.includes('window'))) return {
      tr: 'Bu kodda switchTo() ile driver bağlamını değiştiriyorsun. iframe veya alert\'e geçince işin bitince defaultContent() veya window\'a geri dönmeyi unutma — TODO satırı bu bağlam geçişini yapıyor.',
      en: 'This code switches driver context with switchTo(). After entering an iframe or alert, remember to return with defaultContent() or to the window — the TODO line performs this context switch.',
    }
    if (c.includes('getscreenshotas') || c.includes('takescreenshot')) return {
      tr: 'Bu kodda test screenshot alıyorsun. Test fail ettiğinde görsel kanıt için driver\'ı TakesScreenshot\'a cast et — TODO satırı bu cast ve kayıt işlemini yapıyor.',
      en: 'This code takes a test screenshot. Cast the driver to TakesScreenshot for visual evidence when tests fail — the TODO line performs this cast and save operation.',
    }
    if (c.includes('new select(')) return {
      tr: 'Bu kodda Select sınıfı ile HTML dropdown yönetiyorsun. Yalnızca <select> elementiyle çalışır — selectByVisibleText() veya selectByValue() kullanılır. TODO satırı bu seçim işlemini yapıyor.',
      en: 'This code manages an HTML dropdown with the Select class. Only works with <select> elements — use selectByVisibleText() or selectByValue(). The TODO line performs this selection.',
    }
    if (c.includes('sendkeys(')) return {
      tr: 'Bu kodda sendKeys() ile forma metin giriyorsun. Alan doluysa önce clear() çağırman gerekir — TODO satırı bu metin girişini veya clear() çağrısını yapıyor.',
      en: 'This code types text into a field with sendKeys(). If the field has content, call clear() first — the TODO line performs this text input or clear() call.',
    }
    if (c.includes('remotewebdriver')) return {
      tr: 'Bu kodda RemoteWebDriver ile Selenium Grid\'e bağlanıyorsun. Hub URL ve browser capabilities doğru olmalı — TODO satırı bu bağlantı kurulumunu yapıyor.',
      en: 'This code connects to Selenium Grid with RemoteWebDriver. Hub URL and browser capabilities must be correct — the TODO line sets up this connection.',
    }
    if (c.includes('isdisplayed()') || c.includes('isenabled()') || c.includes('getattribute(') || c.includes('gettext()')) return {
      tr: 'Bu kodda element durumunu sorguluyorsun. isDisplayed() görünürlük, isEnabled() etkileşim, getAttribute() attribute değeri, getText() görünür metin döner — TODO satırı bu sorguyu yapıyor.',
      en: 'This code queries element state. isDisplayed() checks visibility, isEnabled() interactivity, getAttribute() returns attribute value, getText() returns visible text — the TODO line performs this query.',
    }
    return {
      tr: 'Bu Selenium kodunun eksik satırını tamamla. Kodun tamamını oku, locator stratejisini ve aksiyon sırasını anla, sonra TODO\'yu orijinal satırla değiştir.',
      en: 'Complete the missing line in this Selenium code. Read all the code, understand the locator strategy and action order, then replace TODO with the original line.',
    }
  }

  // ── PLAYWRIGHT ──────────────────────────────────────────────────────────────
  if (pageKey === 'playwright') {
    if (c.includes('page.route(') || c.includes('route.fulfill(')) return {
      tr: 'Bu kodda page.route() ile API isteğini mock\'luyorsun. Backend olmadan UI testleri çalıştırmak veya hata senaryosu üretmek için kullanılır — TODO satırı bu intercept veya fulfill adımını kuruyor.',
      en: 'This code mocks an API request with page.route(). Used to run UI tests without a backend or to produce error scenarios — the TODO line sets up this intercept or fulfill step.',
    }
    if (c.includes('waitforresponse(')) return {
      tr: 'Bu kodda waitForResponse() ile ağ yanıtı bekliyorsun. Promise.all ile click\'ten önce tanımla — race condition olmaz. TODO satırı bu bekleyişi kuruyor.',
      en: 'This code waits for a network response with waitForResponse(). Define with Promise.all before the click — no race condition. The TODO line sets up this wait.',
    }
    if (c.includes('tobevisible()') || c.includes('tohavetext(') || c.includes('tohaveurl(') || c.includes('tohavevalue(') || c.includes('tobeenabled(')) return {
      tr: 'Bu kodda Playwright expect() assertion yazıyorsun. Doğru matcher seçmek kritik: toBeVisible() görünürlük, toHaveText() içerik, toHaveURL() URL — TODO satırı bu assertion\'ı oluşturuyor.',
      en: 'This code writes Playwright expect() assertions. Choosing the right matcher is critical: toBeVisible() for visibility, toHaveText() for content, toHaveURL() for URL — the TODO line creates this assertion.',
    }
    if (c.includes('getbyrole(')) return {
      tr: 'Bu kodda getByRole() ile semantik locator kullanıyorsun. ARIA role kullandığı için ID/CSS değişse bile çalışır — TODO satırı bu locator çağrısını yapıyor.',
      en: 'This code uses getByRole() for semantic locating. Since it uses ARIA role it works even when ID/CSS changes — the TODO line creates this locator call.',
    }
    if (c.includes('getbylabel(') || c.includes('getbyplaceholder(')) return {
      tr: 'Bu kodda getByLabel() veya getByPlaceholder() ile form alanı arıyorsun. HTML <label> ile ilişkilendirir, data-testid gerekmez — TODO satırı bu semantik locator çağrısını yapıyor.',
      en: 'This code finds form fields with getByLabel() or getByPlaceholder(). Associates with HTML <label>, no data-testid needed — the TODO line creates this semantic locator call.',
    }
    if (c.includes('getbytext(') || c.includes('getbytestid(')) return {
      tr: 'Bu kodda getByText() veya getByTestId() ile element arıyorsun. getByText() metin içeriğine, getByTestId() data-testid attribute\'una bakarak çalışır — TODO satırı bu locator çağrısını yapıyor.',
      en: 'This code finds elements with getByText() or getByTestId(). getByText() matches text content, getByTestId() matches data-testid attribute — the TODO line creates this locator call.',
    }
    if (c.includes('beforeeach(') || c.includes('test.use(') || c.includes('fixture') || c.includes('newcontext(')) return {
      tr: 'Bu kodda test fixture veya context kuruyorsun. Java @BeforeEach gibi; ama scope ile worker başına bir kez yapılabilir — TODO satırı bu kurulum adımını oluşturuyor.',
      en: 'This code sets up a test fixture or context. Like Java @BeforeEach; but with scope it can run once per worker — the TODO line creates this setup step.',
    }
    if (c.includes('.fill(') || c.includes('.click(') || c.includes('.press(') || c.includes('.selectoption(')) return {
      tr: 'Bu kodda Playwright aksiyonu yapıyorsun. click/fill/press auto-wait içerir — element actionable olana kadar otomatik bekler. TODO satırı bu aksiyonu tamamlıyor.',
      en: 'This code performs a Playwright action. click/fill/press include auto-wait — they automatically wait until the element is actionable. The TODO line completes this action.',
    }
    return {
      tr: 'Bu Playwright kodunun eksik satırını tamamla. Locator stratejisini ve assertion mantığını kodun tamamından okuyarak anla, sonra TODO\'yu yerine yaz.',
      en: 'Complete the missing line in this Playwright code. Read the full code to understand locator strategy and assertion logic, then write the original line in place of TODO.',
    }
  }

  // ── CYPRESS ──────────────────────────────────────────────────────────────────
  if (pageKey === 'cypress') {
    if (c.includes('cy.intercept(')) return {
      tr: 'Bu kodda cy.intercept() ile ağ isteğini yakalıyorsun. intercept\'i visit() veya aksiyondan ÖNCE tanımla — sıralama kritik, sonradan tanımlanırsa yakalanmaz. TODO satırı bu intercept kurulumunu yapıyor.',
      en: 'This code intercepts network requests with cy.intercept(). Define the intercept BEFORE visit() or the triggering action — it cannot be captured if defined afterward. The TODO line sets up this intercept.',
    }
    if (c.includes('cy.wait(') && c.includes('@')) return {
      tr: 'Bu kodda cy.wait("@alias") ile intercept\'in ateşlenmesini bekliyorsun. Yanıt gelmeden assertion yaparsan eski veri veya undefined ile karşılaşabilirsin — TODO satırı bu bekleme adımını oluşturuyor.',
      en: 'This code waits for an intercept to fire with cy.wait("@alias"). Asserting before the response may give stale data or undefined — the TODO line creates this wait step.',
    }
    if (c.includes('.should(') && c.includes('be.visible')) return {
      tr: 'Bu kodda .should("be.visible") ile element görünürlüğünü doğruluyorsun. Cypress retry ile dener — display:none veya visibility:hidden ise fail eder. TODO satırı bu assertion\'ı oluşturuyor.',
      en: 'This code verifies element visibility with .should("be.visible"). Cypress retries — fails if display:none or visibility:hidden. The TODO line creates this assertion.',
    }
    if (c.includes('.should(') && (c.includes('have.text') || c.includes('contain.text') || c.includes('have.value'))) return {
      tr: 'Bu kodda .should() ile metin veya değer doğruluyorsun. have.text tam eşleşme, contain.text kısmi eşleşme yapar — dinamik içerik için contain daha güvenli. TODO satırı bu assertion\'ı oluşturuyor.',
      en: 'This code validates text or value with .should(). have.text is exact match, contain.text is partial — for dynamic content contain is safer. The TODO line creates this assertion.',
    }
    if (c.includes('cy.fixture(')) return {
      tr: 'Bu kodda cy.fixture() ile fixtures/ klasöründen test verisi yüklüyorsun. intercept ile birlikte mock response olarak kullanılabilir — TODO satırı bu yükleme veya eşleştirme adımını yapıyor.',
      en: 'This code loads test data from fixtures/ with cy.fixture(). Can be used as mock response together with intercept — the TODO line performs this loading or matching step.',
    }
    if (c.includes('cy.get(') || c.includes('cy.find(') || c.includes('cy.contains(')) return {
      tr: 'Bu kodda cy.get() veya cy.contains() ile DOM\'dan element arıyorsun. Her denemede DOM\'u yeniden sorgular, 4 saniyeye kadar retry yapar — TODO satırı bu element bulma çağrısını yapıyor.',
      en: 'This code finds elements from the DOM with cy.get() or cy.contains(). Re-queries the DOM on every attempt, retries for up to 4 seconds — the TODO line creates this element-finding call.',
    }
    return {
      tr: 'Bu Cypress kodunun eksik satırını tamamla. cy komutları zincirlenebilir ve retry içerir — TODO\'nun üstündeki ve altındaki komutları okuyarak bağlamı anla.',
      en: 'Complete the missing line in this Cypress code. cy commands are chainable and include retry — read the commands above and below TODO to understand the context.',
    }
  }

  // ── PYTHON ───────────────────────────────────────────────────────────────────
  if (pageKey === 'python') {
    if (c.includes('@pytest.fixture')) return {
      tr: 'Bu kodda pytest fixture tanımlıyorsun. Java @BeforeEach gibi çalışır ama scope parametresiyle her test, worker veya session için ayrı oluşturulabilir — TODO satırı bu fixture\'ın kritik kısmını tamamlıyor.',
      en: 'This code defines a pytest fixture. Works like Java @BeforeEach but with scope parameter can be created per test, worker or session — the TODO line completes the critical part of this fixture.',
    }
    if (c.includes('@pytest.mark.parametrize')) return {
      tr: 'Bu kodda pytest parametrize ile aynı testi farklı verilerle çalıştırıyorsun. Java @ParameterizedTest gibi — tek fonksiyon, birden fazla veri seti — TODO satırı bu parametre tanımını tamamlıyor.',
      en: 'This code runs the same test with different data using pytest parametrize. Like Java @ParameterizedTest — one function, multiple data sets — the TODO line completes this parameter definition.',
    }
    if (c.includes('def test_')) return {
      tr: 'Bu kodda pytest test fonksiyonu yazıyorsun. pytest, test_ ile başlayan fonksiyonları otomatik keşfeder — Java @Test annotation\'ının Python karşılığıdır. TODO satırı bu fonksiyonun kritik adımını tamamlıyor.',
      en: 'This code writes a pytest test function. pytest auto-discovers functions starting with test_ — the Python equivalent of Java @Test annotation. The TODO line completes the critical step of this function.',
    }
    if (c.includes('class ') && c.includes(':') && !c.includes('def test_')) return {
      tr: 'Bu kodda Python sınıfı tanımlıyorsun. Java\'dan farkı: constructor __init__ olarak adlandırılır, self parametresi her metoda açıkça geçilir — TODO satırı bu sınıf yapısının kritik kısmını tamamlıyor.',
      en: 'This code defines a Python class. Different from Java: constructor is named __init__, self is explicitly passed to every method — the TODO line completes the critical part of this class structure.',
    }
    if (c.includes('try:') && (c.includes('except') || c.includes('finally'))) return {
      tr: 'Bu kodda try/except ile hata yönetimi yapıyorsun. Java try/catch gibi çalışır; except Exception as e: ile hata nesnesine erişilir — TODO satırı bu hata yönetiminin kritik kısmı.',
      en: 'This code handles errors with try/except. Works like Java try/catch; except Exception as e: gives access to the error object — the TODO line is the critical part of this error handling.',
    }
    if (c.includes('assert ')) return {
      tr: 'Bu kodda Python assert kullanıyorsun. pytest bu ifadeyi yakalar ve başarısız olunca ne beklendi/ne geldi bilgisini ayrıntılı gösterir — Java assertEquals\'dan daha okunabilir. TODO satırı bu assertion\'ı tamamlıyor.',
      en: 'This code uses Python assert. pytest intercepts this statement and shows detailed expected/got information on failure — more readable than Java assertEquals. The TODO line completes this assertion.',
    }
    if (c.includes('for ') && c.includes(' in ')) return {
      tr: 'Bu kodda Python for-in döngüsü kullanıyorsun. Java for-each gibi — koleksiyon veya range üzerinde doğrudan iterasyon. TODO satırı bu döngünün kritik kısmını tamamlıyor.',
      en: 'This code uses a Python for-in loop. Like Java for-each — iterates directly over a collection or range. The TODO line completes the critical part of this loop.',
    }
    if (c.includes('def ') && !c.includes('def test_') && !c.includes('@pytest')) return {
      tr: 'Bu kodda Python fonksiyonu tanımlıyorsun. Girintileme {} yerine blok sınırını belirler; return tipi yazılmaz (dinamik tipleme). TODO satırı bu fonksiyonun kritik adımını tamamlıyor.',
      en: 'This code defines a Python function. Indentation replaces {} for block boundaries; no return type declaration (dynamic typing). The TODO line completes the critical step of this function.',
    }
    if (c.includes('import ') || c.includes('from ')) return {
      tr: 'Bu kodda Python modül import\'u yapıyorsun. Java import gibi ama paket yönetimi pip ile, modül keşfi sys.path ile yapılır — TODO satırı bu import yapısını tamamlıyor.',
      en: 'This code imports Python modules. Like Java import but package management is with pip and module discovery is with sys.path — the TODO line completes this import structure.',
    }
    return {
      tr: 'Bu Python kodunun eksik satırını tamamla. Girintileme kritik — 4 boşluk standardını koru. TODO\'nun üstündeki ve altındaki satırları okuyarak bağlamı anla.',
      en: 'Complete the missing line in this Python code. Indentation is critical — maintain the 4-space standard. Read the lines above and below TODO to understand the context.',
    }
  }

  // ── TYPESCRIPT ───────────────────────────────────────────────────────────────
  if (pageKey === 'typescript') {
    if (c.includes('interface ')) return {
      tr: 'Bu kodda TypeScript interface tanımlıyorsun. Nesne veri sözleşmesini belirler; farklı sınıflar bu sözleşmeyi örtük olarak uygulayabilir — Java interface\'e benzer. TODO satırı bu tanımı tamamlıyor.',
      en: 'This code defines a TypeScript interface. Specifies the object data contract; different classes can implement it implicitly — similar to Java interface. The TODO line completes this definition.',
    }
    if (c.includes(' type ') && !c.includes('typeof ') && !c.includes('getbytype')) return {
      tr: 'Bu kodda TypeScript type alias tanımlıyorsun. Union/intersection tipler ve utility tipler için tercih edilir — TODO satırı bu tip tanımını tamamlıyor.',
      en: 'This code defines a TypeScript type alias. Preferred for union/intersection types and utility types — the TODO line completes this type definition.',
    }
    if ((c.includes('<t>') || c.includes('<t,') || c.includes('generic')) && c.includes('function ')) return {
      tr: 'Bu kodda TypeScript generics kullanıyorsun. Java generic\'leri gibi, tip güvenliğini koruyarak farklı tiplerle çalışır — TODO satırı bu generic yapının kritik kısmını tamamlıyor.',
      en: 'This code uses TypeScript generics. Like Java generics, works with different types while maintaining type safety — the TODO line completes the critical part of this generic structure.',
    }
    if (c.includes('async ') && c.includes('await ')) return {
      tr: 'Bu kodda async/await ile asenkron işlem yönetiyorsun. Playwright testlerinde her page action await gerektirir — TODO satırı bu asenkron çağrıyı tamamlıyor.',
      en: 'This code manages async operations with async/await. In Playwright tests every page action needs await — the TODO line completes this async call.',
    }
    if (c.includes('class ')) return {
      tr: 'Bu kodda TypeScript sınıfı tanımlıyorsun. Java sınıfına benzer ama constructor parametrelerine erişim modifier eklenerek field otomatik oluşturulur — TODO satırı bu sınıf yapısını tamamlıyor.',
      en: 'This code defines a TypeScript class. Similar to Java class but adding an access modifier to constructor parameters auto-creates fields — the TODO line completes this class structure.',
    }
    if (c.includes('partial<') || c.includes('required<') || c.includes('readonly<') || c.includes('pick<') || c.includes('omit<') || c.includes('record<')) return {
      tr: 'Bu kodda TypeScript utility tipi kullanıyorsun. Partial<T> tüm alanları opsiyonel yapar, Pick<T,K> alt küme alır, Readonly<T> değişmez yapar — TODO satırı bu tip dönüşümünü tamamlıyor.',
      en: 'This code uses a TypeScript utility type. Partial<T> makes all fields optional, Pick<T,K> takes a subset, Readonly<T> makes immutable — the TODO line completes this type transformation.',
    }
    return {
      tr: 'Bu TypeScript kodunun eksik satırını tamamla. tsc\'nin bu satırda ne kontrol ettiğini düşün — tip hatası derleme zamanında yakalanır, runtime\'da değil. TODO\'nun bağlamını oku.',
      en: 'Complete the missing line in this TypeScript code. Think about what tsc checks at this line — type errors are caught at compile time, not runtime. Read the TODO\'s context.',
    }
  }

  // ── JAVASCRIPT ───────────────────────────────────────────────────────────────
  if (pageKey === 'javascript') {
    // Async/await ve Playwright testleri
    if (c.includes('async ') && c.includes('await ') && (c.includes('page.') || c.includes('playwright'))) return {
      tr: 'Bu Playwright JS testinde async/await ile tarayıcı işlemleri yapıyorsun. Her page aksiyonu await gerektirir — yoksa test element hazır olmadan geçer gibi görünür. TODO satırı bu await çağrısını tamamlıyor.',
      en: 'This Playwright JS test uses async/await for browser actions. Every page action needs await — without it the test appears to pass before the element is ready. The TODO line completes this await call.',
    }
    if (c.includes('async ') && c.includes('await ')) return {
      tr: 'Bu kodda async/await kullanıyorsun. await olmadan çağrılan async fonksiyon gerçek değer yerine Promise nesnesi döner — TODO satırı bu asenkron çağrıyı tamamlıyor.',
      en: 'This code uses async/await. Calling an async function without await returns the Promise object, not the real value — the TODO line completes this async call.',
    }
    // fetch API
    if (c.includes('fetch(')) return {
      tr: 'Bu kodda fetch() ile HTTP isteği yapıyorsun. fetch() 4xx/5xx\'de reject ETMEZ — response.ok veya response.status kontrolü şart. TODO satırı bu istek veya yanıt işleme adımını tamamlıyor.',
      en: 'This code makes HTTP requests with fetch(). fetch() does NOT reject on 4xx/5xx — checking response.ok or response.status is required. The TODO line completes this request or response-handling step.',
    }
    // Promise kombinatörleri
    if (c.includes('promise.all(') || c.includes('promise.allsettled(') || c.includes('promise.race(')) return {
      tr: 'Bu kodda paralel Promise yönetiyorsun. Promise.all() birinde hata varsa hepsini iptal eder; allSettled() her sonucu ayrı saklar — QA testlerinde hangi sayfa/API başarısız olduğunu görmek için allSettled() daha bilgilendirici. TODO satırı bu zinciri tamamlıyor.',
      en: 'This code manages parallel Promises. Promise.all() cancels all if one fails; allSettled() stores each result separately — in QA tests allSettled() is more informative to see which page/API failed. The TODO line completes this chain.',
    }
    // try/catch
    if (c.includes('try {') && c.includes('catch')) return {
      tr: 'Bu kodda try/catch ile hata yönetimi yapıyorsun. fetch veya await hata verirse catch bloğu devreye girer — assertion\'ı catch bloğu olmadan yazarsan 4xx/5xx\'de test yanlış hata üretir. TODO satırı bu hata yakalama mantığını tamamlıyor.',
      en: 'This code handles errors with try/catch. If fetch or await errors, the catch block runs — writing assertions without a catch block produces misleading errors on 4xx/5xx. The TODO line completes this error-catching logic.',
    }
    // new Promise / resolve / reject
    if (c.includes('new promise(') || (c.includes('resolve') && c.includes('reject'))) return {
      tr: 'Bu kodda new Promise() ile manuel Promise oluşturuyorsun. resolve() başarıyı, reject() hatayı bildirir — Java\'da Future.complete() / completeExceptionally() gibi. TODO satırı bu Promise yapısının kritik adımını tamamlıyor.',
      en: 'This code creates a manual Promise with new Promise(). resolve() signals success, reject() signals failure — like Java\'s Future.complete() / completeExceptionally(). The TODO line completes the critical step in this Promise structure.',
    }
    // Closure
    if (c.includes('closure') || (c.includes('function') && c.includes('return') && c.includes('function'))) return {
      tr: 'Bu kodda closure (kapatma) kullanıyorsun. İç fonksiyon, dış fonksiyonun değişkenlerine kendi scope\'u bittikten sonra da erişebilir — private state için güçlü bir pattern. TODO satırı bu closure yapısını tamamlıyor.',
      en: 'This code uses a closure. The inner function can still access the outer function\'s variables after its scope ends — a powerful pattern for private state. The TODO line completes this closure structure.',
    }
    // addEventListener
    if (c.includes('addeventlistener(')) return {
      tr: 'Bu kodda addEventListener() ile DOM eventi dinliyorsun. İkinci parametre event handler fonksiyonu — arrow function kullanırsan \'this\' otomatik capture olmaz, dikkat et. TODO satırı bu event kurulumunu tamamlıyor.',
      en: 'This code listens to DOM events with addEventListener(). The second parameter is the event handler function — using an arrow function means \'this\' is not auto-captured, be careful. The TODO line completes this event setup.',
    }
    // DOM manipülasyon
    if (c.includes('innerhtml') || c.includes('textcontent')) return {
      tr: 'Bu kodda DOM element içeriğini değiştiriyorsun. innerHTML HTML parçalıyor ve XSS riski taşıyor — kullanıcı girdisi içeriyorsa textContent kullan. TODO satırı bu DOM güncellemesini tamamlıyor.',
      en: 'This code changes DOM element content. innerHTML parses HTML and carries XSS risk — use textContent when content comes from user input. The TODO line completes this DOM update.',
    }
    // querySelectorAll / querySelector / DOM sorgulama
    if (c.includes('queryselectorall(') || c.includes('queryselector(') || c.includes('getelementbyid(')) return {
      tr: 'Bu kodda DOM\'dan element seçiyorsun. querySelector() ilk eşleşmeyi, querySelectorAll() NodeList döner — NodeList bir Array değildir, dizi metodları için Array.from() kullan. TODO satırı bu seçim işlemini tamamlıyor.',
      en: 'This code selects elements from the DOM. querySelector() returns the first match, querySelectorAll() returns a NodeList — NodeList is not an Array, use Array.from() for array methods. The TODO line completes this selection.',
    }
    // import / export (ES6 modüller)
    if (c.includes('export class') || c.includes('export const') || c.includes('export function') || (c.includes('import ') && c.includes(' from '))) return {
      tr: 'Bu kodda ES6 modül sistemi kullanıyorsun. named export/import ile birden fazla şey paylaşılır, default export ile tek şey paylaşılır — Page Object pattern\'de her sayfa kendi named export\'unu yapar. TODO satırı bu modül yapısını tamamlıyor.',
      en: 'This code uses the ES6 module system. Named export/import shares multiple items, default export shares one thing — in the Page Object pattern each page makes its own named export. The TODO line completes this module structure.',
    }
    // class ES6
    if (c.includes('class ') && c.includes('constructor')) return {
      tr: 'Bu kodda ES6 sınıfı tanımlıyorsun. Java sınıfına benzer ama `this` bağlamına dikkat et — method\'u ayrı bir değişkene atarsan `this` kaybolur. TODO satırı bu sınıf yapısını tamamlıyor.',
      en: 'This code defines an ES6 class. Similar to Java class but watch out for `this` binding — if you assign a method to a separate variable, `this` is lost. The TODO line completes this class structure.',
    }
    // Dizi yüksek dereceli fonksiyonlar: reduce, find, some, every
    if (c.includes('.reduce(')) return {
      tr: 'Bu kodda .reduce() ile dizi elemanlarını tek bir değere indirgiyorsun. İkinci parametre başlangıç değeri — unutursan ilk eleman başlangıç sayılır ve tiplerde hata alabilirsin. TODO satırı bu reduce adımını tamamlıyor.',
      en: 'This code uses .reduce() to reduce array elements to a single value. The second parameter is the initial value — without it the first element is used as start and you may get type errors. The TODO line completes this reduce step.',
    }
    if (c.includes('.find(') || c.includes('.some(') || c.includes('.every(')) return {
      tr: 'Bu kodda dizi arama metodları kullanıyorsun. find() ilk eşleşmeyi döner (bulamazsa undefined), some() herhangi biri eşleşirse true, every() hepsi eşleşirse true döner — Java stream().findFirst(), anyMatch(), allMatch() gibi. TODO satırı bu işlemi tamamlıyor.',
      en: 'This code uses array search methods. find() returns the first match (undefined if not found), some() returns true if any matches, every() returns true if all match — like Java stream().findFirst(), anyMatch(), allMatch(). The TODO line completes this operation.',
    }
    if (c.includes('.map(') || c.includes('.filter(')) return {
      tr: 'Bu kodda .map() veya .filter() ile dizi dönüşümü yapıyorsun. map() her elemanı dönüştürür (yeni dizi), filter() koşula uymayanları atar — orijinal diziyi değiştirmez, yeni dizi döner. TODO satırı bu dönüşüm adımını tamamlıyor.',
      en: 'This code transforms arrays with .map() or .filter(). map() transforms each element (new array), filter() removes non-matching elements — neither modifies the original array, both return a new one. The TODO line completes this transformation step.',
    }
    // Koşul yapıları
    if (c.includes('if (') && c.includes('else')) return {
      tr: 'Bu kodda if/else veya ternary ile koşul kontrol ediyorsun. Birden fazla koşul varsa else if zinciri yerine switch daha okunabilir olabilir — TODO satırı bu koşul mantığını tamamlıyor.',
      en: 'This code controls conditions with if/else or ternary. For many conditions switch may be more readable than else if chains — the TODO line completes this conditional logic.',
    }
    // Math / Number
    if (c.includes('math.') || c.includes('parseint') || c.includes('parsefloat') || c.includes('.tofixed(') || c.includes('number.isnan')) return {
      tr: 'Bu kodda JavaScript sayı işlemleri yapıyorsun. parseInt("42px") sayıyı parse eder ve sonrasını atar; Number("hello") NaN döner — NaN kontrolü için Number.isNaN() kullan, çünkü NaN === NaN her zaman false\'dur. TODO satırı bu sayı işlemini tamamlıyor.',
      en: 'This code performs JavaScript number operations. parseInt("42px") parses the number and drops the rest; Number("hello") returns NaN — use Number.isNaN() for NaN checks because NaN === NaN is always false. The TODO line completes this number operation.',
    }
    // Function declarations/expressions/arrow
    if (c.includes('function ') || (c.includes('=>') && c.includes('const '))) return {
      tr: 'Bu kodda JavaScript fonksiyon tanımı yapıyorsun. function declaration hoisting destekler (tanımlanmadan önce çağrılabilir); arrow function ise \'this\'i kapsayıcı scope\'dan devralır — TODO satırı bu fonksiyon yapısını tamamlıyor.',
      en: 'This code defines JavaScript functions. Function declarations support hoisting (callable before definition); arrow functions inherit \'this\' from the enclosing scope — the TODO line completes this function structure.',
    }
    return {
      tr: 'Bu JavaScript kodunun eksik satırını tamamla. Kodun hangi konsepti öğrettiğini üst satırlardan anla, ardından TODO\'yu uygun JavaScript sözdizimiyle değiştir.',
      en: 'Complete the missing line in this JavaScript code. Understand what concept the code teaches from the lines above, then replace TODO with the correct JavaScript syntax.',
    }
  }

  // ── POSTMAN ──────────────────────────────────────────────────────────────────
  if (pageKey === 'postman') {
    if (c.includes('pm.test(')) return {
      tr: 'Bu kodda Postman pm.test() ile API yanıtını doğruluyorsun. Test açıklaması anlamlı olmalı — Newman CI\'da test ismi hatanın nerede olduğunu gösterir. TODO satırı bu testi tamamlıyor.',
      en: 'This code validates API responses with Postman pm.test(). The test description should be meaningful — Newman CI shows test name to locate the error. The TODO line completes this test.',
    }
    if (c.includes('pm.environment.set(') || c.includes('pm.globals.set(') || c.includes('pm.collectionvariables.set(')) return {
      tr: 'Bu kodda Postman değişkenine dinamik değer kaydediyorsun. Auth token gibi değerleri bir sonraki isteğe taşımak için kullan — manuel kopyalama gerekmez. TODO satırı bu kaydı yapıyor.',
      en: 'This code saves a dynamic value to a Postman variable. Use it to pass values like auth tokens to the next request — no manual copying needed. The TODO line performs this save.',
    }
    if (c.includes('pm.expect(')) return {
      tr: 'Bu kodda pm.expect() ile Chai assertion zinciri kuruyorsun. .to.equal(), .to.include(), .to.have.property() gibi matcher\'lar kullanılır — TODO satırı bu assertion\'ı tamamlıyor.',
      en: 'This code builds a Chai assertion chain with pm.expect(). Matchers like .to.equal(), .to.include(), .to.have.property() are used — the TODO line completes this assertion.',
    }
    return {
      tr: 'Bu Postman test scriptinin eksik satırını tamamla. pm.response, pm.environment veya pm.expect zincirini okuyarak hangi adımın eksik olduğunu bul.',
      en: 'Complete the missing line in this Postman test script. Read the pm.response, pm.environment or pm.expect chain to find which step is missing.',
    }
  }

  // ── REST ASSURED ─────────────────────────────────────────────────────────────
  if (pageKey === 'restassured') {
    if ((c.includes('given()') || c.includes('.given()')) && c.includes('when()')) return {
      tr: 'Bu kodda REST Assured given/when/then zinciri kuruyorsun. Java stream gibi metodları zincirliyorsun — given() kurulum, when() istek, then() doğrulama. TODO satırı bu zincirin kritik halkasını tamamlıyor.',
      en: 'This code builds the REST Assured given/when/then chain. Chains methods like a Java stream — given() setup, when() request, then() validation. The TODO line completes the critical link in this chain.',
    }
    if (c.includes('statuscode(') || c.includes('.statuscode(')) return {
      tr: 'Bu kodda HTTP yanıt kodunu doğruluyorsun. statusCode(200) gibi basit bir doğrulama CI\'da hızlı geri bildirim sağlar — TODO satırı bu doğrulamayı tamamlıyor.',
      en: 'This code validates the HTTP response code. A simple check like statusCode(200) gives fast CI feedback — the TODO line completes this validation.',
    }
    if (c.includes('.body(') || c.includes('equalto(') || c.includes('hasitem(') || c.includes('containsstring(')) return {
      tr: 'Bu kodda REST Assured body() ve Hamcrest matcher ile JSON alanı doğruluyorsun. Nokta notasyonu ile nested JSON erişimi yapılır (ör: body("user.name", equalTo(...))) — TODO satırı bu assertion\'ı tamamlıyor.',
      en: 'This code validates a JSON field with REST Assured body() and Hamcrest matcher. Dot notation accesses nested JSON (e.g., body("user.name", equalTo(...))) — the TODO line completes this assertion.',
    }
    if (c.includes('headers(') || c.includes('contenttype(') || c.includes('accept(')) return {
      tr: 'Bu kodda REST Assured header veya content type ayarlıyorsun. given().header() veya contentType() ile istek hazırlığı yapılır — TODO satırı bu header adımını tamamlıyor.',
      en: 'This code sets REST Assured headers or content type. Request preparation is done with given().header() or contentType() — the TODO line completes this header step.',
    }
    return {
      tr: 'Bu REST Assured test kodunun eksik satırını tamamla. given/when/then zincirinin hangi halkasında olduğunu kodun tamamından okuyarak anla.',
      en: 'Complete the missing line in this REST Assured test code. Read the full code to understand which link in the given/when/then chain is missing.',
    }
  }

  // ── SQL ──────────────────────────────────────────────────────────────────────
  if (pageKey === 'sql') {
    // SQLite CLI dot-commands — gerçek SQL sorgusu değil, kabuk komutları
    if (c.includes('sqlite3 ') || (c.includes('.tables') && c.includes('.quit')) || c.includes('.schema ') || c.includes('.headers on')) return {
      tr: 'Bu SQLite CLI komutları veritabanına bağlanmayı ve temel navigasyonu gösteriyor. `sqlite3 dosya.db` ile bağlan, `.tables` ile mevcut tabloları gör, `.schema tablo` ile yapıyı incele, `.quit` ile çık. TODO satırını doğru CLI komutuyla tamamla.',
      en: 'These SQLite CLI commands show how to connect and navigate the database. Connect with `sqlite3 file.db`, view tables with `.tables`, inspect structure with `.schema table`, exit with `.quit`. Complete the TODO line with the correct CLI command.',
    }
    if (c.includes(' join ') && c.includes(' on ')) return {
      tr: 'Bu SQL sorgusunda JOIN ile tabloları birleştiriyorsun. ON koşulunu doğru kur — yanlış JOIN katlanan satırlar veya kayıp veri üretir. TODO satırı bu JOIN veya ON koşulunu tamamlıyor.',
      en: 'This SQL query joins tables with JOIN. Set the ON condition correctly — a wrong JOIN produces multiplied rows or missing data. The TODO line completes this JOIN or ON condition.',
    }
    if (c.includes('group by ') || c.includes('having ')) return {
      tr: 'Bu SQL sorgusunda GROUP BY ile grupluyorsun. HAVING gruplara filtre uygular — WHERE değil, aggregation sonrası koşul için kullanılır. TODO satırı bu gruplama veya filtre adımını tamamlıyor.',
      en: 'This SQL query groups data with GROUP BY. HAVING filters groups — not WHERE, used for conditions after aggregation. The TODO line completes this grouping or filter step.',
    }
    if (c.includes('insert into ')) return {
      tr: 'Bu SQL sorgusunda INSERT INTO ile veri ekliyorsun. Sütun listesi ve VALUES sırası ve tipi uyumlu olmalı — TODO satırı bu INSERT ifadesini tamamlıyor.',
      en: 'This SQL query inserts data with INSERT INTO. Column list and VALUES must match in order and type — the TODO line completes this INSERT statement.',
    }
    if (c.includes('update ') && c.includes('set ')) return {
      tr: 'Bu SQL sorgusunda UPDATE ile kayıt güncelliyorsun. WHERE olmadan tüm satırları günceller — production\'da çalıştırmadan önce dikkat et. TODO satırı bu UPDATE veya WHERE koşulunu tamamlıyor.',
      en: 'This SQL query updates records with UPDATE. Without WHERE it updates all rows — be careful before running in production. The TODO line completes this UPDATE or WHERE condition.',
    }
    if (c.includes('delete from ')) return {
      tr: 'Bu SQL sorgusunda DELETE FROM ile kayıt siliyorsun. WHERE olmadan tüm satırları siler — production\'da önce SELECT ile doğrula. TODO satırı bu DELETE veya WHERE koşulunu tamamlıyor.',
      en: 'This SQL query deletes records with DELETE FROM. Without WHERE it deletes all rows — verify with SELECT before running in production. The TODO line completes this DELETE or WHERE condition.',
    }
    if (c.includes('create table ') || c.includes('create index ') || c.includes('alter table ')) return {
      tr: 'Bu SQL sorgusunda DDL (Data Definition Language) kullanıyorsun. Tablo yapısı, index veya constraint değişikliği yapar — TODO satırı bu DDL ifadesini tamamlıyor.',
      en: 'This SQL query uses DDL (Data Definition Language). Changes table structure, index or constraint — the TODO line completes this DDL statement.',
    }
    if (c.includes('over(') || c.includes('over (') || c.includes('partition by') || c.includes('with ') || c.includes('cte')) return {
      tr: 'Bu SQL sorgusunda Window fonksiyonu veya CTE kullanıyorsun. OVER(PARTITION BY) satır bazlı hesap yapar, WITH bir sorguyu modüler hale getirir — TODO satırı bu ileri SQL yapısını tamamlıyor.',
      en: 'This SQL query uses a Window function or CTE. OVER(PARTITION BY) computes row-by-row, WITH makes a query modular — the TODO line completes this advanced SQL structure.',
    }
    return {
      tr: 'Bu SQL sorgusunun eksik kısmını tamamla. Yürütme sırasına dikkat et: FROM → WHERE → SELECT → ORDER BY — yazdığın sıra değil bu sıra. TODO\'yu orijinal satırla değiştir.',
      en: 'Complete the missing part of this SQL query. Note execution order: FROM → WHERE → SELECT → ORDER BY — not the order you wrote it. Replace TODO with the original line.',
    }
  }

  // ── JAVA ─────────────────────────────────────────────────────────────────────
  if (pageKey === 'java') {
    if (c.includes('webdriverwait') || c.includes('expectedconditions')) return {
      tr: 'Bu Java Selenium kodunda WebDriverWait ile akıllı bekleme kuruyorsun. Thread.sleep() flaky testlerin ana kaynağı — WebDriverWait element hazır olana kadar bekler. TODO satırı bu wait yapısını tamamlıyor.',
      en: 'This Java Selenium code sets up intelligent waiting with WebDriverWait. Thread.sleep() is a main source of flaky tests — WebDriverWait waits until the element is ready. The TODO line completes this wait structure.',
    }
    if (c.includes('@test') || c.includes('@test\n')) return {
      tr: 'Bu Java kodunda JUnit/TestNG test metodu yazıyorsun. @Test annotation metodu test runner\'a bildirir — Java\'da explicit annotation gerekir, Python\'da test_ ön eki yeterli. TODO satırı bu test adımını tamamlıyor.',
      en: 'This Java code writes a JUnit/TestNG test method. @Test annotation registers the method with the test runner — Java needs explicit annotation, Python just needs the test_ prefix. The TODO line completes this test step.',
    }
    if (c.includes('assertequals') || c.includes('asserttrue') || c.includes('assertnotnull') || c.includes('assertthat')) return {
      tr: 'Bu Java kodunda assertion ile test doğrulaması yapıyorsun. assertEquals(expected, actual) sırası önemli — hata mesajı bu sıraya göre "beklenen X ama Y geldi" der. TODO satırı bu assertion\'ı tamamlıyor.',
      en: 'This Java code writes test assertions. assertEquals(expected, actual) order matters — the error message says "expected X but got Y" based on this order. The TODO line completes this assertion.',
    }
    if (c.includes('arraylist') || c.includes('hashmap') || c.includes('linkedlist') || c.includes('hashset')) return {
      tr: 'Bu Java kodunda Collections API kullanıyorsun. ArrayList dinamik dizi, HashMap anahtar-değer, LinkedList çift yönlü liste — her birinin farklı O(n) karmaşıklığı var. TODO satırı bu koleksiyon adımını tamamlıyor.',
      en: 'This Java code uses the Collections API. ArrayList is a dynamic array, HashMap is key-value, LinkedList is doubly-linked — each has different O(n) complexity. The TODO line completes this collection step.',
    }
    if (c.includes('webdriver ') || c.includes('driver.') || c.includes('findelement')) return {
      tr: 'Bu Java Selenium kodunda WebDriver ile tarayıcıyı kontrol ediyorsun. driver her test başında oluşturulur, teardown\'da quit() ile kapatılır — TODO satırı bu driver adımını tamamlıyor.',
      en: 'This Java Selenium code controls the browser with WebDriver. driver is created at test start and closed with quit() in teardown — the TODO line completes this driver step.',
    }
    if (c.includes('interface ')) return {
      tr: 'Bu Java kodunda interface tanımlıyorsun. Interface uygulama bağımlılığını kırar — test sırasında gerçek implementasyon yerine mock/stub kullanabilirsin. TODO satırı bu tanımı tamamlıyor.',
      en: 'This Java code defines an interface. Interfaces break implementation dependencies — you can use a mock/stub instead of real implementation during testing. The TODO line completes this definition.',
    }
    return {
      tr: 'Bu Java kodunun eksik satırını tamamla. Java\'da tip güvenliği zorunlu — TODO\'nun tipi ve metodun imzasını üst/alt satırlardan okuyarak anla.',
      en: 'Complete the missing line in this Java code. Java enforces type safety — read the type and method signature from lines above and below TODO to understand what is needed.',
    }
  }

  // ── GIT ──────────────────────────────────────────────────────────────────────
  if (pageKey === 'git') {
    if (c.includes('git commit')) return {
      tr: 'Bu Git komutunda commit ile değişiklikleri Git tarihine kaydediyorsun. Her commit mantıksal bir değişiklik birimi olmalı — TODO satırı bu commit adımını veya mesajını tamamlıyor.',
      en: 'This Git command saves changes to Git history with commit. Each commit should be a logical unit of change — the TODO line completes this commit step or message.',
    }
    if (c.includes('git merge') || c.includes('git rebase')) return {
      tr: 'Bu Git komutunda branch\'leri birleştiriyorsun. merge commit tarihini korur, rebase lineer geçmiş oluşturur — public branch\'leri rebase etme. TODO satırı bu adımı tamamlıyor.',
      en: 'This Git command merges branches. merge preserves commit history, rebase creates linear history — do not rebase public branches. The TODO line completes this step.',
    }
    if (c.includes('git pull') || c.includes('git push') || c.includes('git fetch')) return {
      tr: 'Bu Git komutunda uzak depo ile senkronizasyon yapıyorsun. pull = fetch + merge; fetch sadece indirir merge yapmaz — TODO satırı bu remote işlemini tamamlıyor.',
      en: 'This Git command syncs with the remote repository. pull = fetch + merge; fetch only downloads without merging — the TODO line completes this remote operation.',
    }
    if (c.includes('git branch') || c.includes('git checkout') || c.includes('git switch')) return {
      tr: 'Bu Git komutunda branch yönetimi yapıyorsun. Feature branch\'te çalış, main\'i temiz tut — her yeni özellik için yeni branch aç. TODO satırı bu branch adımını tamamlıyor.',
      en: 'This Git command manages branches. Work in feature branches, keep main clean — open a new branch for each new feature. The TODO line completes this branch step.',
    }
    if (c.includes('git stash')) return {
      tr: 'Bu Git komutunda stash ile yarım kalan değişiklikleri geçici olarak saklıyorsun. Başka bir branch\'e geçmeden önce commit etmeden saklamak için idealdir — TODO satırı bu stash adımını tamamlıyor.',
      en: 'This Git command temporarily stores unfinished changes with stash. Ideal for saving without committing before switching branches — the TODO line completes this stash step.',
    }
    return {
      tr: 'Bu Git komutunun eksik kısmını tamamla. Git komutları object-verb sırasıyla çalışır — TODO\'nun üst satırındaki komutu ve amacı okuyarak ne yazılması gerektiğini anla.',
      en: 'Complete the missing part of this Git command. Git commands follow object-verb order — read the command and its purpose in the lines above TODO to understand what is needed.',
    }
  }

  // ── LINUX ─────────────────────────────────────────────────────────────────────
  if (pageKey === 'linux') {
    if (c.includes('chmod') || c.includes('chown')) return {
      tr: 'Bu Linux komutunda dosya izinlerini yönetiyorsun. chmod 755 = rwxr-xr-x (owner tüm izinler, group+diğerleri okuma+çalıştırma) — TODO satırı bu izin adımını tamamlıyor.',
      en: 'This Linux command manages file permissions. chmod 755 = rwxr-xr-x (owner all permissions, group+others read+execute) — the TODO line completes this permission step.',
    }
    if (c.includes('grep ') || c.includes('sed ') || c.includes('awk ') || c.includes('cut ') || c.includes('sort ') || c.includes('uniq ')) return {
      tr: 'Bu Linux komutunda metin işleme yapıyorsun. grep arar, sed değiştirir, awk sütun işler — pipeline ile birleştirince güçlü veri dönüştürme aracı olur. TODO satırı bu adımı tamamlıyor.',
      en: 'This Linux command processes text. grep searches, sed substitutes, awk processes columns — combining with pipeline creates a powerful data transformation tool. The TODO line completes this step.',
    }
    if (c.includes('| ') || c.includes('> ') || c.includes('>> ') || c.includes('< ')) return {
      tr: 'Bu Linux komutunda pipe veya yönlendirme kullanıyorsun. | çıktıyı sonraki komuta geçirir, > üzerine yazar, >> sona ekler — TODO satırı bu komut zincirini tamamlıyor.',
      en: 'This Linux command uses pipe or redirection. | passes output to the next command, > overwrites, >> appends — the TODO line completes this command chain.',
    }
    if (c.includes('systemctl') || c.includes('service ') || c.includes('journalctl')) return {
      tr: 'Bu Linux komutunda servis yönetimi yapıyorsun. systemctl start/stop/status ile servis kontrolü, journalctl ile log okuma yapılır — TODO satırı bu servis adımını tamamlıyor.',
      en: 'This Linux command manages services. Use systemctl start/stop/status for service control, journalctl for log reading — the TODO line completes this service step.',
    }
    return {
      tr: 'Bu Linux komutunun eksik kısmını tamamla. Komut seçeneklerini (flag\'leri) ve argüman sırasını dikkatli oku — Linux komutlarında sıralama ve boşluk önemlidir.',
      en: 'Complete the missing part of this Linux command. Read the options (flags) and argument order carefully — in Linux commands, ordering and spacing matter.',
    }
  }

  // ── JMETER, KAFKA, APPIUM, BROWSERSTACK, AWS, AZURE, BRUNO, vb. ─────────────
  // Bu sayfalar için genel bir kod-bilinçli açıklama döndür
  return {
    tr: 'Yukarıdaki kod bloğunu dikkatlice oku, sonra bu micro lab\'da TODO satırını tamamla. Hint düğmesiyle ipuçlarına, "Beklenen Çıktıyı Göster" ile çözüme bakabilirsin.',
    en: 'Read the code block above carefully, then complete the TODO line in this micro lab. Use the Hint button for clues and "Show Expected Output" to see the solution.',
  }
}

function makePracticeBlock(pageKey, sectionIndex, codeIndex, block, profile) {
  const info = profileText(profile)
  const trCode = codeFor(block, 'tr') || codeFor(block, 'en')
  const enCode = codeFor(block, 'en') || codeFor(block, 'tr')
  const codeTask = taskDescForCode(block, pageKey)

  return {
    type: 'code-playground',
    id: `${pageKey}-auto-practice-${sectionIndex + 1}-${codeIndex + 1}`,
    label: {
      tr: `Micro Lab: ${info.tr}`,
      en: `Micro Lab: ${info.en}`,
    },
    language: block.language || 'text',
    task: {
      tr: codeTask?.tr ?? info.taskTr,
      en: codeTask?.en ?? info.taskEn,
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
    hints: hintsForCode(block, pageKey),
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

      // Per-section dedup: step-animation and order-sort added at most once per profile
      const addedStepProfiles = new Set()
      const addedOrderProfiles = new Set()

      for (let index = blocks.length - 1; index >= 0; index -= 1) {
        const block = blocks[index]
        if (block?.type !== 'code') continue

        // Terminal/shell commands are shown for reference, not for interactive practice
        const blockLang = compact(block?.language || '')
        if (
          blockLang === 'bash' || blockLang === 'shell' || blockLang === 'sh' ||
          blockLang === 'powershell' || blockLang === 'cmd' || blockLang === 'text'
        ) continue

        const state = sectionNeedsTrioAfterCode(blocks, index)
        const profile = resolveProfile(pageKey, block, sectionTitle)

        const needsPractice = !state.practice
        const needsStep = !state.step && !addedStepProfiles.has(profile)
        const needsOrder = !state.order && !addedOrderProfiles.has(profile)

        if (!needsPractice && !needsStep && !needsOrder) continue

        const additions = []
        if (needsPractice) additions.push(makePracticeBlock(pageKey, sectionIndex, index, block, profile))
        if (needsStep) {
          additions.push(makeStepBlock(pageKey, sectionIndex, index, profile))
          addedStepProfiles.add(profile)
        }
        if (needsOrder) {
          additions.push(makeOrderBlock(pageKey, sectionIndex, index, profile))
          addedOrderProfiles.add(profile)
        }

        blocks.splice(index + 1, 0, ...additions)
      }
    })
  })
}
