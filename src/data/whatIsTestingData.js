import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

// ─── Dalga 19 film sabitleri (video-scene — TEK ağaç, bilingual field'lar) ──
// Spesifikasyon kalıbı: Documents/video-rollout-plan.md §2 · CLAUDE.md §9.5

const bugCostSdlcFilm = {
  type: 'video-scene',
  id: 'wit-bug-cost-sdlc-film',
  title: { tr: '🎬 Bir Hatanın SDLC\'de Katlanan Maliyeti', en: '🎬 A Bug\'s Compounding Cost Through the SDLC' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'req',    emoji: '📋', label: { tr: 'Gereksinim ($1)',   en: 'Requirement ($1)' },   color: '#22c55e' },
    { id: 'design', emoji: '📐', label: { tr: 'Tasarım ($10)',     en: 'Design ($10)' },        color: '#0ea5e9' },
    { id: 'code',   emoji: '💻', label: { tr: 'Kod ($100)',        en: 'Code ($100)' },         color: '#f59e0b' },
    { id: 'test',   emoji: '🧪', label: { tr: 'Test ($1.000)',     en: 'Test ($1,000)' },       color: '#f97316' },
    { id: 'prod',   emoji: '💥', label: { tr: 'Production ($440M / 45dk)', en: 'Production ($440M / 45min)' }, color: '#ef4444' },
  ],
  scenes: [
    { caption: { tr: 'Bir gereksinim toplantısında bulunan belirsizlik, düzeltilmesi en UCUZ anda yakalanır — sadece bir cümleyi netleştirmek yeterlidir.', en: 'An ambiguity caught during a requirements meeting is fixed at its CHEAPEST point — clarifying one sentence is enough.' }, code: { tr: `Gereksinim netlestir: maliyet ~$1`, en: `Clarify requirement: cost ~$1` }, positions: { req: { x: 16, y: 40, scale: 1.15, pulse: true } } },
    { caption: { tr: 'Aynı belirsizlik tasarım aşamasına sızarsa, birden fazla diyagramın yeniden çizilmesi gerekir.', en: 'If the same ambiguity leaks into design, multiple diagrams need to be redrawn.' }, code: { tr: `Tasarim revize: maliyet ~$10`, en: `Design revision: cost ~$10` }, positions: { req: { x: 14, y: 40, opacity: 0.5, scale: 0.9 }, design: { x: 42, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'req', to: 'design', color: '#0ea5e9' }] },
    { caption: { tr: 'Kodlama aşamasına ulaşırsa, yazılmış onlarca satır kod yeniden yazılmalıdır.', en: 'If it reaches the coding phase, dozens of already-written lines need rewriting.' }, code: { tr: `Kod yeniden yaz: maliyet ~$100`, en: `Rewrite code: cost ~$100` }, positions: { design: { x: 24, y: 40, opacity: 0.6, scale: 0.9 }, code: { x: 50, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'design', to: 'code', color: '#f59e0b' }] },
    { caption: { tr: 'Test aşamasında yakalanırsa, hatayı bulan, raporlayan ve doğrulayan üç ayrı adım gerekir.', en: 'Caught at the testing phase, it takes three separate steps: finding, reporting, and verifying the fix.' }, code: { tr: `Bul + rapor + retest: maliyet ~$1.000`, en: `Find + report + retest: cost ~$1,000` }, positions: { code: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, test: { x: 58, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'code', to: 'test', color: '#f97316' }] },
    { caption: { tr: 'Final — hiç yakalanmadan production\'a ulaşırsa: Knight Capital, kontrol edilmemiş bir deploy yüzünden 45 dakikada 440 milyon dolar kaybetti. Maliyet eğrisi doğrusal değil, KATLANARAKTIR.', en: 'Final — reaching production uncaught: Knight Capital lost $440 million in 45 minutes due to an unverified deploy. The cost curve isn\'t linear, it COMPOUNDS.' }, positions: { test: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, prod: { x: 62, y: 40, scale: 1.3, pulse: true } }, beams: [{ from: 'test', to: 'prod', color: '#ef4444' }] },
  ],
}

const pesticideParadoxFilm = {
  type: 'video-scene',
  id: 'wit-pesticide-paradox-film',
  title: { tr: '🎬 Pestisit Paradoksu: Aynı Testler Neden Artık Hata Bulmuyor?', en: '🎬 The Pesticide Paradox: Why the Same Tests Stop Finding Bugs' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'suite',  emoji: '🧪', label: { tr: 'Test Suite (v1)',    en: 'Test Suite (v1)' },    color: '#f97316' },
    { id: 'run1',   emoji: '🐛', label: { tr: 'Koşum 1: 5 hata bulur', en: 'Run 1: finds 5 bugs' }, color: '#ef4444' },
    { id: 'run10',  emoji: '😴', label: { tr: 'Koşum 10: 0 yeni hata', en: 'Run 10: 0 new bugs' }, color: '#64748b' },
    { id: 'hidden', emoji: '👻', label: { tr: 'Gizli Kalan Hatalar',  en: 'Bugs Still Hiding' },  color: '#a855f7' },
    { id: 'revised', emoji: '🔄', label: { tr: 'Güncellenmiş Testler', en: 'Revised Tests' },     color: '#22c55e' },
  ],
  scenes: [
    { caption: { tr: 'Bir test suite ilk yazıldığında 5 gerçek hata bulur — herkes etkilenir, hepsi düzeltilir.', en: 'When a test suite is first written, it finds 5 real bugs — everyone is impressed, all get fixed.' }, code: { tr: `Run 1: 5 bugs found`, en: `Run 1: 5 bugs found` }, positions: { suite: { x: 20, y: 40, scale: 1.1, pulse: true } } },
    { caption: { tr: 'AYNI testler tekrar tekrar çalıştırılır — kod değişse de test senaryoları hiç güncellenmez.', en: 'The SAME tests are run over and over — even as the code changes, the test scenarios never get updated.' }, code: { tr: `Run 2..9: ayni senaryolar`, en: `Run 2..9: same scenarios` }, positions: { suite: { x: 18, y: 40, opacity: 0.6, scale: 0.9 }, run1: { x: 46, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'suite', to: 'run1', color: '#ef4444' }] },
    { caption: { tr: '10. koşumda artık hiçbir yeni hata bulunmaz — sanki uygulama mükemmelmiş gibi görünür.', en: 'By run 10, no new bugs are found at all — the app looks perfect, as if bug-free.' }, code: { tr: `Run 10: 0 new bugs`, en: `Run 10: 0 new bugs` }, positions: { run1: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, run10: { x: 58, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'run1', to: 'run10', color: '#64748b' }] },
    { caption: { tr: 'Ama tıpkı böceklerin aynı pestisite bağışıklık kazanması gibi, kod YENİ hatalar üretmeye devam eder — sadece bu ESKİ testlerin GÖREMEDİĞİ yerlerde.', en: 'But just like pests build immunity to the same pesticide, the code keeps producing NEW bugs — just in places these OLD tests can\'t SEE.' }, code: { tr: `Yeni kod yollari test edilmiyor`, en: `New code paths untested` }, positions: { run10: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, hidden: { x: 62, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'run10', to: 'hidden', color: '#a855f7' }] },
    { caption: { tr: 'Final — çözüm: test senaryoları düzenli olarak GÖZDEN GEÇİRİLİR ve YENİ senaryolar eklenir. Sabit bir test suite, zamanla giderek daha az işe yarar.', en: 'Final — the fix: test scenarios get REVIEWED regularly and NEW scenarios get added. A frozen test suite becomes less useful over time.' }, positions: { hidden: { x: 40, y: 40, opacity: 0.6, scale: 0.9 }, revised: { x: 66, y: 40, scale: 1.25, pulse: true } }, beams: [{ from: 'hidden', to: 'revised', color: '#22c55e' }] },
  ],
}

const qaVsQcFilm = {
  type: 'video-scene',
  id: 'wit-qa-vs-qc-film',
  title: { tr: '🎬 QA Süreci Önler, QC Ürünü Yakalar', en: '🎬 QA Prevents the Process, QC Catches the Product' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'req',   emoji: '📋', label: { tr: 'Belirsiz Gereksinim',  en: 'Ambiguous Requirement' }, color: '#f97316' },
    { id: 'qa',    emoji: '🛡️', label: { tr: 'QA: Toplantıda Yakalar', en: 'QA: Catches It in the Meeting' }, color: '#22c55e' },
    { id: 'build', emoji: '💻', label: { tr: 'Uygulama İnşa Edilir', en: 'App Gets Built' },       color: '#0ea5e9' },
    { id: 'qc',    emoji: '🔍', label: { tr: 'QC: Bitmiş Üründe Test Eder', en: 'QC: Tests the Finished Product' }, color: '#a855f7' },
    { id: 'fire',  emoji: '🔥', label: { tr: 'QA Olmadan: Tekrar Eden Yangın', en: 'Without QA: Recurring Fire' }, color: '#ef4444' },
  ],
  scenes: [
    { caption: { tr: 'Bir gereksinim toplantısında belirsiz bir cümle var: "Kullanıcı ödeme yapabilmeli."', en: 'A requirements meeting has an ambiguous sentence: "The user should be able to pay."' }, code: { tr: `"Kullanici odeme yapabilmeli" // hangi yontemle?`, en: `"User should be able to pay" // which method?` }, positions: { req: { x: 50, y: 30, scale: 1.1, pulse: true } } },
    { caption: { tr: 'QA (süreç odaklı), bunu KOD YAZILMADAN ÖNCE toplantıda sorgular: "Kredi kartı mı, havale mi, ikisi de mi?"', en: 'QA (process-focused) questions this in the meeting BEFORE any code is written: "Credit card, bank transfer, or both?"' }, code: { tr: `QA: "hangi odeme yontemleri destekleniyor?"`, en: `QA: "which payment methods are supported?"` }, positions: { req: { x: 44, y: 30, scale: 1.0 }, qa: { x: 72, y: 20, scale: 1.2, pulse: true } }, beams: [{ from: 'req', to: 'qa', color: '#22c55e' }] },
    { caption: { tr: 'Netleşen gereksinimle uygulama inşa edilir — belirsizlik koda hiç ulaşmaz.', en: 'The app gets built with the clarified requirement — the ambiguity never reaches the code.' }, code: { tr: `build(clearRequirement)`, en: `build(clearRequirement)` }, positions: { qa: { x: 60, y: 20, opacity: 0.6, scale: 0.9 }, build: { x: 34, y: 45, scale: 1.15, pulse: true } }, beams: [{ from: 'qa', to: 'build', color: '#0ea5e9' }] },
    { caption: { tr: 'QC (ürün odaklı), bitmiş uygulamada gerçek testleri çalıştırır — kredi kartı akışı gerçekten çalışıyor mu?', en: 'QC (product-focused) runs real tests on the finished app — does the credit card flow actually work?' }, code: { tr: `QC: driver.click(payButton) -> assert success`, en: `QC: driver.click(payButton) -> assert success` }, positions: { build: { x: 40, y: 45, opacity: 0.6, scale: 0.9 }, qc: { x: 66, y: 45, scale: 1.2, pulse: true } }, beams: [{ from: 'build', to: 'qc', color: '#a855f7' }] },
    { caption: { tr: 'Final (kontrast) — QA olmadan çalışsaydı: belirsizlik koda sızar, QC her release\'de AYNI belirsizlikten doğan hatayı bulur, ekip sürekli aynı yangını söndürür.', en: 'Final (the contrast) — without QA: the ambiguity leaks into code, QC finds the SAME ambiguity-born bug every release, the team keeps fighting the same fire.' }, positions: { qc: { x: 40, y: 45, scale: 1.0, opacity: 0.5 }, fire: { x: 66, y: 45, scale: 1.25, pulse: true } }, beams: [{ from: 'qc', to: 'fire', color: '#ef4444' }] },
  ],
}

const automationPyramidFilm = {
  type: 'video-scene',
  id: 'wit-automation-pyramid-film',
  title: { tr: '🎬 Test Otomasyon Piramidi: Neden Çoğu Test Birim Seviyesinde?', en: '🎬 The Test Automation Pyramid: Why Most Tests Should Be Unit Tests' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'unit',   emoji: '⚡', label: { tr: 'Birim Testleri (1000x, ms)', en: 'Unit Tests (1000x, ms)' }, color: '#22c55e' },
    { id: 'integ',  emoji: '🔗', label: { tr: 'Entegrasyon (100x, sn)',    en: 'Integration (100x, sec)' }, color: '#0ea5e9' },
    { id: 'e2e',    emoji: '🌐', label: { tr: 'E2E (10x, dk)',             en: 'E2E (10x, min)' },      color: '#f97316' },
    { id: 'cone',   emoji: '🍦', label: { tr: 'Dondurma Külahı Anti-Pattern', en: 'Ice-Cream Cone Anti-Pattern' }, color: '#ef4444' },
  ],
  scenes: [
    { caption: { tr: 'Piramidin tabanı: yüzlerce birim testi, milisaniyeler içinde, tek bir fonksiyonu izole test eder.', en: 'The base of the pyramid: hundreds of unit tests, running in milliseconds, testing one function in isolation.' }, code: { tr: `assert calculate_total([10,20]) == 30`, en: `assert calculate_total([10,20]) == 30` }, positions: { unit: { x: 50, y: 65, scale: 1.15, pulse: true } } },
    { caption: { tr: 'Ortada daha az sayıda entegrasyon testi — birden fazla bileşenin (DB + API) birlikte çalıştığını doğrular, saniyeler sürer.', en: 'In the middle, fewer integration tests — verifying multiple components (DB + API) work together, taking seconds.' }, code: { tr: `test_order_saves_to_db_and_returns_id()`, en: `test_order_saves_to_db_and_returns_id()` }, positions: { unit: { x: 40, y: 65, opacity: 0.6, scale: 0.9 }, integ: { x: 55, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'unit', to: 'integ', color: '#0ea5e9' }] },
    { caption: { tr: 'Tepede en az sayıda E2E testi — gerçek bir tarayıcıda TÜM sistemi uçtan uca doğrular, dakikalar sürer, en KIRILGAN olanıdır.', en: 'At the top, the fewest E2E tests — verifying the ENTIRE system end to end in a real browser, taking minutes, the most FRAGILE kind.' }, code: { tr: `driver.click(checkout) -> assert orderConfirmed`, en: `driver.click(checkout) -> assert orderConfirmed` }, positions: { integ: { x: 45, y: 40, opacity: 0.6, scale: 0.9 }, e2e: { x: 60, y: 18, scale: 1.2, pulse: true } }, beams: [{ from: 'integ', to: 'e2e', color: '#f97316' }] },
    { caption: { tr: 'Neden bu oran? Bir E2E test, aynı mantığı doğrulayan bir birim testinden 100 KAT daha yavaş ve 10 kat daha kırılgandır (ağ, tarayıcı, timing).', en: 'Why this ratio? An E2E test verifying the same logic is 100x SLOWER and 10x more fragile (network, browser, timing) than a unit test.' }, positions: { e2e: { x: 50, y: 30, scale: 1.0 } } },
    { caption: { tr: 'Final (kontrast) — piramit tersine çevrilirse ("dondurma külahı"): çoğu test E2E olur, suite 2 saat sürer, sık sık rastgele başarısız olur ve kimse ona güvenmez.', en: 'Final (the contrast) — invert the pyramid ("ice-cream cone"): most tests become E2E, the suite takes 2 hours, fails randomly often, and nobody trusts it.' }, positions: { e2e: { x: 40, y: 30, scale: 0.9, opacity: 0.6 }, cone: { x: 66, y: 40, scale: 1.25, pulse: true } }, beams: [{ from: 'e2e', to: 'cone', color: '#ef4444' }] },
  ],
}

const devopsLoopFilm = {
  type: 'video-scene',
  id: 'wit-devops-loop-film',
  title: { tr: '🎬 Bir Özelliğin DevOps Döngüsündeki Yolculuğu', en: '🎬 A Feature\'s Journey Through the DevOps Loop' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'plan',   emoji: '📋', label: { tr: 'Plan',    en: 'Plan' },    color: '#0ea5e9' },
    { id: 'code',   emoji: '💻', label: { tr: 'Code',    en: 'Code' },    color: '#f97316' },
    { id: 'test',   emoji: '🧪', label: { tr: 'Test',    en: 'Test' },    color: '#22c55e' },
    { id: 'deploy', emoji: '🚀', label: { tr: 'Deploy',  en: 'Deploy' },  color: '#a855f7' },
    { id: 'monitor', emoji: '📊', label: { tr: 'Monitor', en: 'Monitor' }, color: '#f59e0b' },
  ],
  scenes: [
    { caption: { tr: 'Bir özellik "Plan" aşamasında tanımlanır — kullanıcı hikayesi ve kabul kriterleri yazılır.', en: 'A feature is defined in the "Plan" phase — user story and acceptance criteria get written.' }, code: { tr: `Kullanici hikayesi + kabul kriterleri`, en: `User story + acceptance criteria` }, positions: { plan: { x: 50, y: 40, scale: 1.1, pulse: true } } },
    { caption: { tr: '"Code" aşamasında geliştirici özelliği yazar — QA aynı sprint içinde test senaryolarını PARALEL yazar.', en: 'In the "Code" phase the developer writes the feature — QA writes test scenarios in PARALLEL within the same sprint.' }, code: { tr: `feature branch + test senaryolari`, en: `feature branch + test scenarios` }, positions: { plan: { x: 20, y: 40, opacity: 0.6, scale: 0.9 }, code: { x: 46, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'plan', to: 'code', color: '#f97316' }] },
    { caption: { tr: '"Test" aşamasında otomasyon suite\'i çalışır — CI pipeline\'ı her commit\'te otomatik tetiklenir.', en: 'In the "Test" phase the automation suite runs — the CI pipeline triggers automatically on every commit.' }, code: { tr: `CI: npm test -> pass/fail`, en: `CI: npm test -> pass/fail` }, positions: { code: { x: 26, y: 40, opacity: 0.6, scale: 0.9 }, test: { x: 52, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'code', to: 'test', color: '#22c55e' }] },
    { caption: { tr: 'Testler geçince "Deploy" aşamasına otomatik geçilir — insan onayı beklemeden production\'a çıkar.', en: 'Once tests pass, it automatically moves to "Deploy" — reaching production without waiting for human approval.' }, code: { tr: `CD: auto-deploy on green build`, en: `CD: auto-deploy on green build` }, positions: { test: { x: 30, y: 40, opacity: 0.6, scale: 0.9 }, deploy: { x: 58, y: 40, scale: 1.2, pulse: true } }, beams: [{ from: 'test', to: 'deploy', color: '#a855f7' }] },
    { caption: { tr: 'Final — "Monitor" aşaması, production\'daki gerçek kullanıcı davranışını izler ve bir sonraki "Plan" aşamasına GERİ BESLEME sağlar. Döngü kapanmaz, sürekli döner.', en: 'Final — the "Monitor" phase watches real user behavior in production and feeds back into the next "Plan" phase. The loop never closes, it keeps spinning.' }, positions: { deploy: { x: 34, y: 40, opacity: 0.6, scale: 0.9 }, monitor: { x: 62, y: 40, scale: 1.25, pulse: true } }, beams: [{ from: 'deploy', to: 'monitor', color: '#f59e0b' }] },
  ],
}

const learningRoadmapFilm = {
  type: 'video-scene',
  id: 'wit-learning-roadmap-film',
  title: { tr: '🎬 Neden Önce Python, Sonra Selenium?', en: '🎬 Why Python First, Then Selenium?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'jump',     emoji: '🎯', label: { tr: 'Doğrudan Selenium\'a Atla', en: 'Jump Straight to Selenium' }, color: '#ef4444' },
    { id: 'stuck',    emoji: '🚧', label: { tr: 'Syntax Hatasında Takılır', en: 'Stuck on Syntax Errors' }, color: '#ef4444' },
    { id: 'python',   emoji: '🐍', label: { tr: '1. Python Temelleri',    en: '1. Python Basics' },   color: '#22c55e' },
    { id: 'pytest',   emoji: '🧪', label: { tr: '2. pytest Framework\'ü', en: '2. pytest Framework' }, color: '#0ea5e9' },
    { id: 'selenium', emoji: '🟢', label: { tr: '3. Selenium + POM',      en: '3. Selenium + POM' },   color: '#a855f7' },
  ],
  scenes: [
    { caption: { tr: 'Bir yeni başlayan, heyecanla doğrudan Selenium tutorial\'ına atlar — "web testi öğreneceğim" diye.', en: 'A beginner excitedly jumps straight into a Selenium tutorial — "I\'ll learn web testing".' }, code: { tr: `driver.find_element(By.ID, "login")`, en: `driver.find_element(By.ID, "login")` }, positions: { jump: { x: 50, y: 30, scale: 1.15, pulse: true } } },
    { caption: { tr: 'İlk satırda takılır: "for", "def", girinti nedir? Selenium\'u değil, Python\'un TEMELİNİ öğrenmesi gerektiğini fark eder.', en: 'They get stuck on the first line: what\'s "for", "def", indentation? They realize they need Python BASICS, not Selenium.' }, code: { tr: `IndentationError: unexpected indent`, en: `IndentationError: unexpected indent` }, positions: { jump: { x: 44, y: 30, scale: 1.0 }, stuck: { x: 72, y: 20, scale: 1.2, pulse: true } }, beams: [{ from: 'jump', to: 'stuck', color: '#ef4444' }] },
    { caption: { tr: 'Doğru sıra: ÖNCE Python temelleri — değişkenler, fonksiyonlar, döngüler — sağlam bir zemin kurulur.', en: 'The right order: Python basics FIRST — variables, functions, loops — building solid ground.' }, code: { tr: `def greet(name): return f"Merhaba {name}"`, en: `def greet(name): return f"Hello {name}"` }, positions: { stuck: { x: 60, y: 20, opacity: 0.5, scale: 0.9 }, python: { x: 30, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'stuck', to: 'python', color: '#22c55e' }] },
    { caption: { tr: 'SONRA pytest — test yazma, assert, fixture kavramları Python\'un ÜZERİNE oturur, sıfırdan öğrenilmez.', en: 'THEN pytest — writing tests, assert, fixture concepts build ON TOP of Python, not learned from scratch.' }, code: { tr: `def test_login(): assert login("a","b") == True`, en: `def test_login(): assert login("a","b") == True` }, positions: { python: { x: 36, y: 50, opacity: 0.6, scale: 0.9 }, pytest: { x: 58, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'python', to: 'pytest', color: '#0ea5e9' }] },
    { caption: { tr: 'Final — EN SON Selenium: artık Python\'u ve test yazmayı bildiği için, sadece "tarayıcıyı nasıl kontrol ederim" kısmına odaklanır. Sıra, öğrenme hızını ve motivasyonu doğrudan belirler.', en: 'Final — Selenium LAST: now knowing Python and how to write tests, they focus only on "how do I control the browser". Order directly determines learning speed and motivation.' }, positions: { pytest: { x: 40, y: 50, opacity: 0.6, scale: 0.9 }, selenium: { x: 66, y: 50, scale: 1.25, pulse: true } }, beams: [{ from: 'pytest', to: 'selenium', color: '#a855f7' }] },
  ],
}

// Eksik animasyon/sandbox tamamlamaları — kodsuz sekmeler (CLAUDE.md §9.5)

const bugCostStep = {
  type: 'step-animation',
  title: { tr: 'Bir Hatanın SDLC Aşamalarındaki Maliyeti', en: 'A Bug\'s Cost Across SDLC Phases' },
  steps: [
    { tr: 'Gereksinim aşaması: bir belirsizliği netleştirmek sadece bir cümle demektir.', en: 'Requirements phase: clarifying an ambiguity is just one sentence.' },
    { tr: 'Kodlama aşaması: aynı hata artık yazılmış kodun yeniden yazılmasını gerektirir.', en: 'Coding phase: the same bug now requires rewriting already-written code.' },
    { tr: 'Production: aynı hata artık müşteri kaybı, itibar zedelenmesi ve acil müdahale demektir.', en: 'Production: the same bug now means customer loss, reputation damage, and an emergency response.' },
  ],
}

const bugCostPractice = {
  type: 'code-playground',
  relatedTopicId: 'wit-intro',
  title: { tr: 'Kendin Dene: Hatayı En Ucuz Aşamada Yakala', en: 'Try It Yourself: Catch the Bug at the Cheapest Stage' },
  starterCode: `// Senaryo: gereksinim toplantisinda "kullanici sifresini sifirlayabilmeli" yaziyor
// ama HANGI yontemle (email? SMS?) belirtilmemis
// TODO: bu belirsizligi hangi asamada yakalamak en UCUZ olur?
const asama = "?"; // "gereksinim" | "kodlama" | "production"`,
  solutionCode: `// Senaryo: gereksinim toplantisinda "kullanici sifresini sifirlayabilmeli" yaziyor
// ama HANGI yontemle (email? SMS?) belirtilmemis
const asama = "gereksinim";`,
  hint: { tr: 'Bir belirsizlik ne kadar erken yakalanırsa, düzeltme maliyeti o kadar düşüktür — gereksinim aşamasında bir SORU sormak, production\'da bir INCIDENT yönetmekten çok daha ucuzdur.', en: 'The earlier an ambiguity is caught, the cheaper the fix — asking a QUESTION at the requirements stage is far cheaper than managing an INCIDENT in production.' },
  successMessage: { tr: 'Doğru! QA mühendisinin en değerli katkılarından biri, kod hiç yazılmadan önce soru sormaktır.', en: 'Correct! One of a QA engineer\'s most valuable contributions is asking questions before any code gets written.' },
}

const istqbStep = {
  type: 'step-animation',
  title: { tr: 'ISTQB\'nin 7 İlkesini Hatırlama Sırası', en: 'The Order to Recall ISTQB\'s 7 Principles' },
  steps: [
    { tr: 'Test, hataların VARLIĞINI gösterir — YOKLUĞUNU asla kanıtlayamaz.', en: 'Testing shows the PRESENCE of defects — it can never prove their ABSENCE.' },
    { tr: 'Eksiksiz test imkansızdır — bu yüzden risk analizi ve önceliklendirme şarttır.', en: 'Exhaustive testing is impossible — so risk analysis and prioritization are required.' },
    { tr: 'Pestisit paradoksu: aynı testler tekrarlanınca yeni hata bulmayı bırakır — senaryolar güncellenmeli.', en: 'Pesticide paradox: repeated tests stop finding new bugs — scenarios must be revised.' },
  ],
}

const istqbPractice = {
  type: 'code-playground',
  relatedTopicId: 'wit-istqb',
  title: { tr: 'Kendin Dene: Doğru İlkeyi Eşleştir', en: 'Try It Yourself: Match the Right Principle' },
  starterCode: `// Senaryo: ayni regresyon suite'i 6 aydir hic degismedi,
// son 20 kosumda hic yeni hata bulunmadi
// TODO: bu hangi ISTQB ilkesinin somut ornegi?
const ilke = "?";`,
  solutionCode: `// Senaryo: ayni regresyon suite'i 6 aydir hic degismedi,
// son 20 kosumda hic yeni hata bulunmadi
const ilke = "pestisit paradoksu";`,
  hint: { tr: 'Sabit kalan bir test suite, tıpkı aynı pestisite bağışıklık kazanan böcekler gibi, kodun yeni değişen kısımlarını GÖREMEZ hale gelir.', en: 'A frozen test suite, just like pests building immunity to the same pesticide, becomes UNABLE TO SEE the newly changed parts of the code.' },
  successMessage: { tr: 'Doğru! 20 koşumda hiç yeni hata bulunmaması "mükemmel kod" değil, "kör test suite" anlamına gelir.', en: 'Correct! Finding zero new bugs in 20 runs doesn\'t mean "perfect code", it means "blind test suite".' },
}

const devopsStep = {
  type: 'step-animation',
  title: { tr: 'DevOps Döngüsünde QA\'in Yeri', en: 'Where QA Fits in the DevOps Loop' },
  steps: [
    { tr: 'Plan: QA, kabul kriterlerini geliştiriciyle BİRLİKTE yazar — sadece kod bitince devreye girmez.', en: 'Plan: QA writes acceptance criteria TOGETHER with the developer — not just stepping in once code is done.' },
    { tr: 'Test: CI pipeline\'ı her commit\'te otomatik tetiklenir, insan beklemez.', en: 'Test: the CI pipeline triggers automatically on every commit, no human waits.' },
    { tr: 'Monitor: production\'daki gerçek davranış, bir sonraki Plan aşamasına GERİ BESLEME sağlar — döngü hiç kapanmaz.', en: 'Monitor: real production behavior feeds back into the next Plan phase — the loop never closes.' },
  ],
}

const devopsPractice = {
  type: 'code-playground',
  relatedTopicId: 'wit-web-mobile-process',
  title: { tr: 'Kendin Dene: DevOps Döngüsündeki Doğru Aşamayı Bul', en: 'Try It Yourself: Find the Right DevOps Loop Phase' },
  starterCode: `// Senaryo: production'da bir hata sepete ekleme oranini dusuruyor,
// bu veri bir sonraki sprint planlamasina giriyor
// TODO: bu geri besleme hangi iki asama arasinda gerceklesir?
const gecis = "? -> ?";`,
  solutionCode: `// Senaryo: production'da bir hata sepete ekleme oranini dusuruyor,
// bu veri bir sonraki sprint planlamasina giriyor
const gecis = "Monitor -> Plan";`,
  hint: { tr: 'DevOps döngüsü doğrusal değil DAİRESELDİR — Monitor aşamasında toplanan gerçek kullanıcı verisi, bir sonraki Plan aşamasının GİRDİSİ olur.', en: 'The DevOps loop isn\'t linear, it\'s CIRCULAR — real user data gathered in Monitor becomes the INPUT for the next Plan phase.' },
  successMessage: { tr: 'Doğru! Bu geri besleme döngüsü olmadan, ekip aynı hatayı fark etmeden tekrar tekrar üretebilir.', en: 'Correct! Without this feedback loop, a team can keep producing the same bug without ever noticing.' },
}

const roadmapStep = {
  type: 'step-animation',
  title: { tr: 'Doğru Öğrenme Sırasını Kurma', en: 'Building the Right Learning Order' },
  steps: [
    { tr: 'Önce temel test kavramları — QA, QC, test seviyeleri — anlaşılır.', en: 'First, basic testing concepts — QA, QC, test levels — are understood.' },
    { tr: 'Sonra programlama dili (Python/Java/TS) öğrenilir — bu, ARAÇ öğrenmenin ön koşuludur.', en: 'Then the programming language (Python/Java/TS) is learned — this is the PREREQUISITE for tool learning.' },
    { tr: 'En son araç (Selenium/Playwright) öğrenilir — artık sadece "tarayıcıyı nasıl kontrol ederim" kalır.', en: 'Finally the tool (Selenium/Playwright) is learned — now only "how do I control the browser" remains.' },
  ],
}

const roadmapPractice = {
  type: 'code-playground',
  relatedTopicId: 'wit-site-map',
  title: { tr: 'Kendin Dene: Öğrenme Sırasını Doğru Diz', en: 'Try It Yourself: Order the Learning Path Correctly' },
  starterCode: `// Hedef: Java bilen bir QA'nin dogru ogrenme sirasini yaz
// TODO: dogru sirayi yaz (1, 2, 3)
// A) Selenium + Page Object Model
// B) Python temelleri (sozdizimi, fonksiyonlar)
// C) pytest framework'u (assert, fixture)
const sira = ["?", "?", "?"];`,
  solutionCode: `// Hedef: Java bilen bir QA'nin dogru ogrenme sirasini yaz
const sira = ["B", "C", "A"];
// B) Python temelleri -> C) pytest -> A) Selenium + POM`,
  hint: { tr: 'Selenium\'a doğrudan atlamak, önce Python\'u sıfırdan öğrenmeyi GEREKTİRİR — sıra atlanırsa, kişi Selenium hatası mı yoksa Python syntax hatası mı olduğunu ayırt edemez.', en: 'Jumping straight to Selenium REQUIRES learning Python from scratch anyway — skip the order and you can\'t tell if it\'s a Selenium error or a Python syntax error.' },
  successMessage: { tr: 'Doğru! Java bildiğin için Python\'un syntax\'ı hızlı geçer — ama yine de atlanmaması gereken bir adımdır.', en: 'Correct! Knowing Java means Python\'s syntax goes fast — but it\'s still a step that shouldn\'t be skipped.' },
}

const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: { tr: '🎯 Giriş & Yazılım Testinin Önemi', en: '🎯 Intro & Why Testing Matters' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛡️',
        content: {
          tr: "Yazılım testi, bir köprünün trafiğe açılmadan önce statik ve dinamik yük altında her bağlantı noktasının ayrı ayrı test edilmesine benzer — her parça tek başına sağlamsa da sistemin bütünü farklı davranabilir. Peki Java'da JUnit ile her metodu ayrı ayrı test ediyorken neden farklı katmanları birleştirip entegrasyon veya E2E testi yapmak gerekir? Çünkü birim testleri hiçbir zaman gerçek kullanıcının tarayıcısını, ağ gecikmesini veya bir servisin güncellenmesiyle bozulan sözleşmeyi görmez. QA açısından en kritik gerçek: test etmeden canlıya çıkılan her özellik, sessizce yanlış çalışan ve ancak müşteri şikâyetiyle fark edilen bir zaman bombası haline gelir — Knight Capital'in 45 dakikada 440 milyon dolar kaybetmesi bunun en somut kanıtıdır.",
          en: "Software testing is like stress-testing every joint of a bridge under static and dynamic load before it opens to traffic — even if each part passes alone, the integrated system can behave differently. You already have JUnit for every method in Java, so why do you also need integration or E2E tests? Because unit tests never see the real browser, network latency, or a contract broken by a third-party service update. The most critical QA truth: every untested feature that reaches production is a silent time bomb only discovered through a customer complaint — Knight Capital losing $440 million in 45 minutes is the most concrete proof of that."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testi Nedir?', en: 'What is Software Testing?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Yazılım testi; bir yazılım uygulamasının kalitesini ölçmek, hataları (bug) tespit etmek ve yazılımın iş gereksinimlerine uygun olduğunu doğrulamak amacıyla yürütülen sistematik bir süreçtir. Sadece kod yazıldıktan sonra yapılan bir aktivite değil, yazılım geliştirme yaşam döngüsünün (SDLC) her aşamasında yer alan kritik bir disiplindir.',
          en: 'Software testing is a systematic process conducted to measure the quality of a software application, identify defects (bugs), and verify that it meets business requirements. It is not just an activity performed after coding, but a critical discipline integrated throughout the Software Development Life Cycle (SDLC).'
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testinin Amaçları Nelerdir?', en: 'What are the Objectives of Testing?' }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🐛',
            label: { tr: 'Hataları Bulmak', en: 'Finding Defects' },
            desc: { tr: 'Uygulama canlıya çıkmadan önce gizli hataları tespit edip düzeltilmesini sağlamak.', en: 'Detecting hidden issues and ensuring they are fixed before the application goes live.' }
          },
          {
            icon: '🤝',
            label: { tr: 'Güven Kazanmak', en: 'Gaining Confidence' },
            desc: { tr: 'Yazılımın kalitesi ve belirlenen gereksinimleri karşıladığı konusunda paydaşlara güven vermek.', en: 'Providing stakeholders with confidence in the quality and compliance of the software.' }
          },
          {
            icon: '🛑',
            label: { tr: 'Hataları Önlemek', en: 'Preventing Defects' },
            desc: { tr: 'Gereksinimler analiz edilirken mantık hatalarını erken fark edip kodlama aşamasında hata yapılmasını önlemek.', en: 'Identifying logic flaws early during requirement analysis to prevent bugs from being coded.' }
          },
          {
            icon: '📊',
            label: { tr: 'Kalite Seviyesini Raporlamak', en: 'Reporting Quality Level' },
            desc: { tr: 'Yöneticilere ve müşterilere ürünün durumu hakkında objektif veri sunmak.', en: 'Providing managers and clients with objective data about the state of the product.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testi Olmasaydı Ne Olurdu? (Somut Felaket Örnekleri)', en: 'What If We Didn\'t Test? (Real-World Disasters)' }
      },
      {
        type: 'text',
        content: {
          tr: 'Tarih, yeterince test edilmeyen yazılımların şirketleri iflasa sürüklediği, milyonlarca dolarlık kayıplara ve hatta can kayıplarına yol açtığı somut örneklerle doludur:',
          en: 'History is full of concrete examples where insufficiently tested software drove companies to bankruptcy, caused millions of dollars in losses, or even resulted in loss of life:'
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Olay', en: 'Event' },
          { tr: 'Hatanın Nedeni', en: 'Root Cause' },
          { tr: 'Sonuç & Zarar', en: 'Impact & Cost' }
        ],
        rows: [
          [
            { tr: 'Knight Capital Group (2012)', en: 'Knight Capital Group (2012)' },
            { tr: 'Yeni kod canlıya alınırken eski sistemdeki bir bayrağın (flag) yanlış yorumlanması ve regression testlerinin eksikliği.', en: 'An unused configuration flag was re-enabled in a deployment without adequate regression testing.' },
            { tr: 'Sistem 45 dakikada milyonlarca hatalı işlem yaptı; şirket 440 Milyon Dolar zarar ederek iflas etti.', en: 'The system made millions of unintended trades in 45 minutes; the firm lost $440 Million and collapsed.' }
          ],
          [
            { tr: 'Ariane 5 Roketi (1996)', en: 'Ariane 5 Flight 501 (1996)' },
            { tr: '64-bitlik kayan noktalı (double) bir sayının 16-bitlik tam sayıya (integer) dönüştürülmesi sırasında oluşan taşma (overflow) hatası. Entegrasyon testi yapılmadı.', en: 'A 64-bit floating-point value was cast to a 16-bit signed integer, causing a data overflow. Missing integration testing.' },
            { tr: 'Roket kalkıştan 40 saniye sonra patladı. Kayıp: 370 Milyon Dolar.', en: 'The launcher self-destructed 40 seconds after launch. Cost: $370 Million.' }
          ],
          [
            { tr: 'Therac-25 Cihazı (1985)', en: 'Therac-25 Radiation Machine (1985)' },
            { tr: 'Yazılımdaki eşzamanlılık (race condition) hatası nedeniyle dozaj hesaplamasının yanlış yapılması. Yetersiz sistem testi.', en: 'A race condition in the software caused incorrect dosage calculations. Lack of end-to-end system testing.' },
            { tr: 'Hastalara aşırı dozda radyasyon verildi; 3 kişi hayatını kaybetti, birçok kişi ağır yaralandı.', en: 'Patients received massive radiation overdoses; 3 deaths and multiple severe injuries.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Firmalara Faydası Nedir? (ROI - Yatırım Getirisi)', en: 'What is the Business Benefit? (ROI - Return on Investment)' }
      },
      {
        type: 'text',
        content: {
          tr: "Bir hatayı kod yazılırken bulmanın maliyeti 1 birim ise, test aşamasında bulmak 10 birim, canlıya (üretime) çıktıktan sonra bulup düzeltmek 100 birimdir. Erken test etmek şirketlere doğrudan milyonlarca lira tasarruf sağlar, marka itibarını korur ve müşteri memnuniyetini en üst düzeyde tutar.",
          en: "If finding a bug during coding costs 1 unit, finding it during testing costs 10 units, and fixing it in production costs 100 units. Early testing saves companies millions of dollars, protects brand reputation, and keeps customers satisfied."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'Hata Bulma Maliyetinin SDLC Aşamalarına Göre Artışı', en: 'Cost of Finding a Bug Across SDLC Phases' },
        items: [
          { icon: '📝', label: { tr: 'Gereksinimler', en: 'Requirements' }, desc: { tr: '1x Maliyet', en: '1x Cost' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Kodlama / Geliştirme', en: 'Development' }, desc: { tr: '5x Maliyet', en: '5x Cost' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'QA / Test Aşaması', en: 'QA / Testing' }, desc: { tr: '15x Maliyet', en: '15x Cost' } },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Üretim / Canlı', en: 'Production' }, desc: { tr: '100x+ Maliyet', en: '100x+ Cost' }, highlight: true }
        ],
        note: {
          tr: 'Hata ne kadar geç bulunursa, mimari değişiklik, yeniden kodlama, veritabanı temizleme ve müşteri kaybı gibi faktörlerden dolayı düzeltme maliyeti katlanarak artar.',
          en: 'The later a bug is caught, the cost of correction increases exponentially due to redesign, recoding, data cleanup, and customer attrition.'
        }
      },
      bugCostSdlcFilm,
      bugCostStep,
      bugCostPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Yazılım testinin en önemli finansal gerekçesi aşağıdakilerden hangisidir?',
          en: 'What is the primary financial justification for software testing?'
        },
        options: [
          { id: 'a', text: { tr: 'Test uzmanlarının geliştiricilerden daha az maaş alması.', en: 'Testers earn lower salaries than developers.' } },
          { id: 'b', text: { tr: 'Hataları erken bulmanın düzeltme maliyetini katlanarak düşürmesi.', en: 'Finding defects early reduces the cost of correction exponentially.' } },
          { id: 'c', text: { tr: 'Müşterilerin hatasız yazılımlara daha çok para ödemesi.', en: 'Customers pay more money for bug-free software.' } },
          { id: 'd', text: { tr: 'Test araçlarının tamamen ücretsiz olması.', en: 'Testing tools are completely free of charge.' } }
        ],
        correct: 'b',
        explanation: {
          tr: 'Yazılım geliştirme yaşam döngüsünde (SDLC) hataları analiz veya geliştirme aşamasında bulup çözmek, canlı ortamda (production) bulmaktan kat kat daha ucuzdur.',
          en: 'Catching and resolving bugs during requirements or development is orders of magnitude cheaper than resolving them in production.'
        }
      ,
        retryQuestion: {
      "question": {
            "tr": "Yazılım geliştirme sürecinde 'Shift-Left' (Sola Kaydırma) yaklaşımının temel amacı nedir?",
            "en": "What is the core objective of the 'Shift-Left' approach in the software development process?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Testleri sadece geliştirme süreci bittikten sonra yapmak.",
                        "en": "Performing tests only after the development process is finished."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Test faaliyetlerini erken aşamalara çekerek hata maliyetini azaltmak.",
                        "en": "Reducing defect costs by initiating testing activities in earlier stages."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Yazılımı kullanıcıya daha hızlı teslim etmek için dokümantasyonu azaltmak.",
                        "en": "Reducing documentation to deliver software faster to the user."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Tüm testleri otomatik araçlarla tamamen ücretsiz bir şekilde gerçekleştirmek.",
                        "en": "Executing all tests completely for free using automated tools."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Shift-Left yaklaşımı, testin yazılım geliştirme sürecinin en başından itibaren dahil edilmesini ve hataların henüz kodlanmadan veya erken aşamalarda tespit edilerek düzeltilmesini amaçlar; bu da maliyet tasarrufu sağlar.",
            "en": "The Shift-Left approach emphasizes involving testing from the very beginning of the software development lifecycle to identify and resolve defects early, which significantly saves costs."
      }
}
}
    ]
  },

  // ── 1. ISTQB & FOUNDATIONS ──────────────────────────────────────────────────
  {
    title: { tr: '📖 ISTQB & Test Temelleri', en: '📖 ISTQB & Testing Core' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📖',
        content: {
          tr: "ISTQB, yazılım testinin tıp sertifikasyon sistemine benzeyen bir akreditasyon çerçevesidir — bir anestezi uzmanının 'ilaç dozu hesabı' için izleyeceği protokol nasıl dünya genelinde aynıysa, ISTQB'nin 7 İlkesi de farklı ülkelerdeki ekiplerin aynı kavramsal dili konuşmasını sağlar. Peki neden Java'nın kendi test standardı (JUnit + TestNG) yetmez, ayrıca bir ISTQB çerçevesine ihtiyaç duyulur? Çünkü JUnit bir araç sözlüğüdür, ISTQB ise 'bu aracı ne zaman, neden, hangi risk analizine göre kullanırsın' sorusuna yanıt verir. QA açısından en kritik bağlam: mülakatlarda ve çok uluslu projelerde 'regression testi mi, smoke testi mi koşalım?' tartışması ISTQB terminolojisi olmadan ortak bir zemin bulamaz — sessiz bir anlaşmazlık olarak kalır ve hatalı canlıya çıkışa zemin hazırlar.",
          en: "ISTQB is an accreditation framework for software testing similar to the certification system in medicine — just as an anesthesiologist's dosage protocol is the same worldwide, ISTQB's 7 Principles ensure teams in different countries speak the same conceptual language. But if Java already gives you JUnit and TestNG, why do you need a separate ISTQB framework on top? Because JUnit is a vocabulary of tools; ISTQB answers when, why, and based on which risk analysis you use those tools. The most critical QA context: in interviews and multinational projects, debates like 'should we run regression or smoke tests?' cannot find common ground without ISTQB terminology — they stay silent disagreements that pave the way for defective production releases."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Testinin 7 Temel İlkesi', en: 'The 7 Principles of Software Testing' }
      },
      {
        type: 'text',
        content: {
          tr: 'ISTQB tarafından tanımlanan bu 7 kural, her test mühendisinin felsefesi olmalıdır:',
          en: 'These 7 principles defined by ISTQB should guide every test engineer\'s mindset:'
        }
      },
      {
        type: 'list',
        icon: '📌',
        items: [
          {
            label: { tr: '1. Test hataların varlığını gösterir, yokluğunu değil', en: '1. Testing shows the presence of defects, not their absence' },
            desc: { tr: 'Testler sistemde hata bulabilir ama sistemin %100 hatasız olduğunu kanıtlayamaz.', en: 'Testing can show that defects are present, but cannot prove that there are no remaining defects.' }
          },
          {
            label: { tr: '2. Eksiksiz (tüm olasılıkları) test etmek imkansızdır', en: '2. Exhaustive testing is impossible' },
            desc: { tr: 'Her kombinasyonu test etmek sonsuz zaman alır. Risk analizi ve önceliklendirme şarttır.', en: 'Testing everything (all combinations of inputs and preconditions) is not feasible. Risk analysis is required.' }
          },
          {
            label: { tr: '3. Erken test zaman ve para kazandırır', en: '3. Early testing saves time and money' },
            desc: { tr: 'Test faaliyetleri SDLC başlar başlamaz, henüz kod yazılmadan (doküman inceleme ile) başlamalıdır.', en: 'Testing should start as early as possible in the SDLC to find issues before they are coded.' }
          },
          {
            label: { tr: '4. Hatalar belirli alanlarda kümelenir', en: '4. Defects cluster together' },
            desc: { tr: 'Hataların %80\'i sistemin %20\'lik karmaşık modüllerinde bulunur (Pareto İlkesi).', en: 'A small number of modules usually contain most of the defects discovered (80/20 rule).' }
          },
          {
            label: { tr: '5. Tarım ilacı paradoksuna dikkat edin (Pesticide Paradox)', en: '5. Beware of the pesticide paradox' },
            desc: { tr: 'Aynı testleri defalarca koşarsanız yeni hatalar bulamazsınız. Test senaryoları sürekli güncellenmelidir.', en: 'If the same tests are repeated, they will eventually stop finding new defects. Tests must be revised.' }
          },
          {
            label: { tr: '6. Test bağlama bağımlıdır', en: '6. Testing is context dependent' },
            desc: { tr: 'Bir e-ticaret sitesiyle, bir kalp pili yazılımı veya nükleer santral kontrol yazılımı aynı yöntemlerle test edilemez.', en: 'Testing is done differently in different contexts (e.g., e-commerce app vs. safety-critical medical software).' }
          },
          {
            label: { tr: '7. Hata olmaması yanılgısı', en: '7. Absence-of-errors fallacy' },
            desc: { tr: 'Sıfır hatalı bir uygulama yapsanız bile, eğer kullanıcı ihtiyaçlarını karşılamıyorsa o sistem başarısızdır.', en: 'Finding and fixing defects does not help if the system is unusable and does not fulfill user needs.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Statik Test vs Dinamik Test', en: 'Static Testing vs Dynamic Testing' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Özellik', en: 'Feature' },
          { tr: 'Statik Test (Static Testing)', en: 'Static Testing' },
          { tr: 'Dinamik Test (Dynamic Testing)', en: 'Dynamic Testing' }
        ],
        rows: [
          [
            { tr: 'Kodun Çalıştırılması', en: 'Code Execution' },
            { tr: 'Kod veya doküman çalıştırılmaz.', en: 'Code is NOT executed.' },
            { tr: 'Kod çalıştırılarak test edilir.', en: 'Code IS executed.' }
          ],
          [
            { tr: 'Yapılan Aktivite', en: 'Activity' },
            { tr: 'Gereksinim analizi, kod inceleme (code review), tasarım kontrolü.', en: 'Requirements review, design check, code reviews.' },
            { tr: 'Fonksiyonel testler, performans testleri, otomasyon koşumları.', en: 'Functional testing, performance runs, UI/API automation.' }
          ],
          [
            { tr: 'Amaç', en: 'Goal' },
            { tr: 'Daha kodlama yapılmadan mantık hatalarını ve eksiklikleri bulmak.', en: 'To prevent bugs and logical flaws before coding begins.' },
            { tr: 'Uygulamanın çalışma anındaki hatalarını ve çökmelerini yakalamak.', en: 'To identify runtime failures, UI glitches, and API errors.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Test Seviyeleri', en: 'Levels of Software Testing' }
      },
      {
        type: 'grid',
        cols: 4,
        items: [
          {
            icon: '📦',
            label: { tr: 'Birim Testi (Unit Testing)', en: 'Unit Testing' },
            desc: { tr: 'En küçük kod parçalarının (metotlar, sınıflar) genellikle yazılımcılar tarafından izole şekilde test edilmesidir. Java\'da JUnit ile yazılır.', en: 'Testing individual components (methods, classes) in isolation. Typically written by developers using JUnit/TestNG.' }
          },
          {
            icon: '⚙️',
            label: { tr: 'Entegrasyon (Integration)', en: 'Integration Testing' },
            desc: { tr: 'Farklı modüllerin birbirleriyle iletişiminin test edilmesidir. Örneğin, UI\'ın veritabanına veri yazması veya API\'ların birbiriyle konuşması.', en: 'Testing the interactions between integrated modules or systems, such as database or API connections.' }
          },
          {
            icon: '🖥️',
            label: { tr: 'Sistem Testi (System Testing)', en: 'System Testing' },
            desc: { tr: 'Uygulamanın uçtan uca (E2E), tüm özellikleri entegre edilmiş şekilde, gerçek kullanıcı senaryolarıyla fonksiyonel ve performans yönüyle test edilmesidir.', en: 'Testing the fully integrated software product end-to-end to verify it meets functional and non-functional specifications.' }
          },
          {
            icon: '🎓',
            label: { tr: 'Kabul Testi (Acceptance)', en: 'Acceptance Testing' },
            desc: { tr: 'Sistemin teslimata hazır olup olmadığını doğrulamak amacıyla son kullanıcılar (UAT) veya iş birimleri tarafından yapılan son test seviyesidir.', en: 'Determining whether the system satisfies its acceptance criteria and is ready for production deployment.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Test Tipleri: Fonksiyonel vs Fonksiyonel Olmayan', en: 'Test Types: Functional vs Non-Functional' }
      },
      {
        type: 'text',
        content: {
          tr: 'Yazılım testleri, testin odağına göre iki ana gruba ayrılır. Fonksiyonel testler sistemin ne yaptığını (sayfa açılıyor mu, login olunuyor mu), fonksiyonel olmayan testler ise sistemin bu işi ne kadar iyi yaptığını (hızlı mı, güvenli mi, yük altında çöküyor mu) ölçer.',
          en: 'Tests are divided into two categories. Functional testing verifies *what* the system does (e.g. login, payment). Non-functional testing evaluates *how well* the system performs (speed, security, stability under heavy load).'
        }
      },
      pesticideParadoxFilm,
      istqbStep,
      istqbPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Bir web sitesine 10.000 kullanıcının aynı anda girmesi durumunda sitenin yanıt verme hızını ölçen test türü aşağıdakilerden hangisine girer?',
          en: 'Which testing category evaluates a website\'s response time under 10,000 concurrent users?'
        },
        options: [
          { id: 'a', text: { tr: 'Fonksiyonel Test (Kullanıcı Giriş Testi)', en: 'Functional Testing (Login Flow)' } },
          { id: 'b', text: { tr: 'Birim Testi (Unit Testing)', en: 'Unit Testing' } },
          { id: 'c', text: { tr: 'Fonksiyonel Olmayan Test (Performans/Yük Testi)', en: 'Non-Functional Testing (Performance/Load Test)' } },
          { id: 'd', text: { tr: 'Kabul Testi (Acceptance Testing)', en: 'Acceptance Testing' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'Sistemin yük, stres, yanıt süresi ve ölçeklenebilirlik gibi davranışlarını inceleyen testler, fonksiyonel olmayan testlerin (Non-Functional Testing) altındaki Performans Testleri alanına girer.',
          en: 'Evaluating system behavior under heavy load, stress, and response times falls under Performance Testing, which is a subcategory of Non-Functional Testing.'
        }
      ,
        retryQuestion: {
      "question": {
            "tr": "Bir e-ticaret sitesinin, indirim dönemlerinde artan trafiğe rağmen sistemin ne kadar kararlı çalıştığını belirlemek için yapılan test türü hangisidir?",
            "en": "Which type of testing is used to determine how stable an e-commerce site remains despite increased traffic during sales periods?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Birim Testi (Unit Testing)",
                        "en": "Unit Testing"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Uyumluluk Testi (Compatibility Testing)",
                        "en": "Compatibility Testing"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Yük ve Stres Testi (Load and Stress Testing)",
                        "en": "Load and Stress Testing"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Arayüz Testi (UI Testing)",
                        "en": "UI Testing"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Yük ve stres testleri, uygulamanın yüksek trafik altında nasıl performans gösterdiğini, sistemin çöküp çökmediğini ve yanıt sürelerinin ne kadar değiştiğini anlamak için kullanılır ve bu fonksiyonel olmayan bir test türüdür.",
            "en": "Load and stress testing are used to understand how an application performs under high traffic, whether it crashes, and how response times vary; this is a category of non-functional testing."
      }
}
}
    ]
  },

  // ── 2. QA vs QC ─────────────────────────────────────────────────────────────
  {
    title: { tr: '🛡️ Quality Assurance (QA) Nedir?', en: '🛡️ Quality Assurance (QA) vs QC' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍳',
        content: {
          tr: "QA ile QC arasındaki farkı şöyle düşün: bir ilaç fabrikasında QA, üretim hattının kendisini denetleyen ISO sertifikasyon sürecidir — malzeme raflarının etiketlenmesi, temiz oda prosedürü, çalışan eğitimi. QC ise band sonunda her kapsülün ağırlığını ölçerek kusurlu olanı banttan çıkaran son kontrol noktasıdır. Java'da JUnit testleri yazıyorsun; bu bir QC aktivitesidir. Peki neden ayrıca pull request şablonu, code review standartı ve test planlama süreci gibi QA pratiklerine de ihtiyaç var? Çünkü JUnit, hatalı tasarlanmış bir mimarinin veya belirsiz bir gereksinimin ürettiği bug'ı asla göremez — o bug hiç test edilemeyecek kadar erken bir kararın ürünüdür. QA açısından en kritik gerçek: QC olmadan hata production'a ulaşır; QA olmadan hata sürekli tekrar üretilir ve her release döngüsünde ekip aynı yangını söndürmek zorunda kalır.",
          en: "Think of the difference between QA and QC like a pharmaceutical factory: QA is the ISO certification process auditing the production line itself — labeling material racks, clean-room procedures, employee training. QC is the final checkpoint at the end of the line, measuring every capsule's weight and removing defective ones. Writing JUnit tests in Java is a QC activity. But why do you also need QA practices like pull request templates, code review standards, and test planning processes? Because JUnit can never catch a bug produced by a poorly designed architecture or an ambiguous requirement — that bug is the product of a decision made too early to be tested. The most critical QA truth: without QC, bugs reach production; without QA, bugs keep being regenerated and every release cycle forces the team to fight the same fire."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Quality Assurance (QA) ne demektir?', en: 'What does Quality Assurance mean?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Quality Assurance (Kalite Güvence), yazılım geliştirme sürecinin kalitesini artırmaya ve standartları belirlemeye odaklanan, süreç yönelimli (process-oriented) bir disiplindir. Amacı, geliştirme aşamasında hataların en başından ortaya çıkmasını önlemektir (Defect Prevention).',
          en: 'Quality Assurance (QA) is a process-oriented discipline focused on improving the software development process and setting quality standards. Its primary goal is to prevent defects from occurring in the first place (Defect Prevention).'
        }
      },
      {
        type: 'heading',
        text: { tr: 'QA, QC ve Test Arasındaki Farklar', en: 'Differences Between QA, QC, and Testing' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Karşılaştırma Noktası', en: 'Comparison point' },
          { tr: 'Kalite Güvence (QA)', en: 'Quality Assurance (QA)' },
          { tr: 'Kalite Kontrol (QC)', en: 'Quality Control (QC)' },
          { tr: 'Yazılım Testi (Testing)', en: 'Software Testing' }
        ],
        rows: [
          [
            { tr: 'Odak Noktası', en: 'Focus' },
            { tr: 'Süreç (Süreci iyileştirerek hata oluşumunu önlemek)', en: 'Process (Preventing defects by improving the process)' },
            { tr: 'Ürün (Nihai üründeki hataları bulup ayıklamak)', en: 'Product (Finding defects in the final product)' },
            { tr: 'Aktivite (Kodu çalıştırıp bug aramak)', en: 'Activity (Running code and looking for bugs)' }
          ],
          [
            { tr: 'Yaklaşım', en: 'Approach' },
            { tr: 'Önleyici (Proactive - Preventative)', en: 'Preventative (Proactive)' },
            { tr: 'Bulucu (Reactive - Detective)', en: 'Detective (Reactive)' },
            { tr: 'Doğrulayıcı (Verification)', en: 'Verification' }
          ],
          [
            { tr: 'Sorumluluk', en: 'Responsibility' },
            { tr: 'Tüm proje ekibi (Analist, Geliştirici, Test Uzmanı)', en: 'Entire project team (Analyst, Dev, Tester)' },
            { tr: 'Test Uzmanları / Kalite Ekibi', en: 'Testing Team / QC inspectors' },
            { tr: 'Test Mühendisleri', en: 'Test Engineers' }
          ],
          [
            { tr: 'Örnek Aktivite', en: 'Example Activity' },
            { tr: 'Kod standartlarını belirleme, dokümantasyon inceleme, süreç denetimi.', en: 'Defining code standards, reviewing specs, auditing processes.' },
            { tr: 'Çalışan uygulamanın gereksinimlere uyup uymadığını kontrol etme.', en: 'Verifying if the working application meets the specifications.' },
            { tr: 'Selenium/Playwright ile script koşma, butonları tıklama, log inceleme.', en: 'Executing Selenium/Playwright scripts, clicking buttons, inspecting logs.' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Yazılım Geliştirme Yaşam Döngüsünde (SDLC) QA\'in Yeri', en: 'The Role of QA in the SDLC' }
      },
      {
        type: 'text',
        content: {
          tr: 'Modern yazılım dünyasında test uzmanları artık kod yazımı bittikten sonra devreye giren kişiler değildir. Çevik (Agile/Scrum) yöntemlerde QA mühendisleri gereksinimlerin yazıldığı ilk günden itibaren projededir. Yanlış veya eksik yazılmış bir gereksinimi analiz toplantısında fark edip düzeltmek, kod yazıldıktan sonra çıkacak onlarca hatayı daha doğmadan engeller.',
          en: 'In modern software teams, QA engineers are no longer downstream operators waiting for coding to finish. In Agile/Scrum environments, QA engineers participate from day one. Catching a requirement error during design saves dozens of future coding bugs from being created.'
        }
      },
      {
        type: 'code',
        topicId: 'qa-test-levels-example',
        language: 'python',
        code: {
          tr: `# Test seviyeleri: Birim → Entegrasyon → E2E
# Birim Testi: sadece bir fonksiyon test edilir
def test_login_gecerli_kullanici():
    sonuc = login("admin", "sifre123")
    assert sonuc["basarili"] == True

# Entegrasyon Testi: servis + veritabanı birlikte test edilir
def test_kullanici_kaydedildi_mi(db_baglantisi):
    kullanici = KullaniciServisi(db_baglantisi)
    kullanici.olustur("yeni@test.com", "test123")
    assert db_baglantisi.bul(email="yeni@test.com") is not None

# E2E Testi: gerçek tarayıcı + tüm sistem test edilir
def test_urun_satin_alma(tarayici):
    tarayici.get("https://example.com")
    tarayici.find_element("id", "urun-ekle").click()
    tarayici.find_element("id", "odeme-yap").click()
    assert "Sipariş onaylandı" in tarayici.page_source`,
          en: `# Test levels: Unit → Integration → E2E
# Unit Test: only one function is tested
def test_login_valid_user():
    result = login("admin", "password123")
    assert result["success"] == True

# Integration Test: service + database tested together
def test_user_was_saved(db_connection):
    user_service = UserService(db_connection)
    user_service.create("new@test.com", "test123")
    assert db_connection.find(email="new@test.com") is not None

# E2E Test: real browser + full system tested
def test_product_purchase(browser):
    browser.get("https://example.com")
    browser.find_element("id", "add-product").click()
    browser.find_element("id", "checkout").click()
    assert "Order confirmed" in browser.page_source`,
        },
      },
      qaVsQcFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Yazılım geliştirme sürecinin kalitesini iyileştirerek hataların oluşmasını en baştan önlemeyi hedefleyen disiplin hangisidir?',
          en: 'Which discipline focuses on preventing defects by improving the software development process itself?'
        },
        options: [
          { id: 'a', text: { tr: 'Kalite Kontrol (Quality Control)', en: 'Quality Control (QC)' } },
          { id: 'b', text: { tr: 'Yazılım Testi (Testing)', en: 'Software Testing' } },
          { id: 'c', text: { tr: 'Kalite Güvence (Quality Assurance)', en: 'Quality Assurance (QA)' } },
          { id: 'd', text: { tr: 'Sistem Entegrasyonu (System Integration)', en: 'System Integration' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'Quality Assurance (QA) süreç odaklıdır ve hataları önlemeye (defect prevention) odaklanır. Quality Control (QC) ise ürün odaklıdır ve mevcut hataları bulmaya (defect detection) çalışır.',
          en: 'Quality Assurance (QA) is process-oriented and focuses on defect prevention. Quality Control (QC) is product-oriented and focuses on defect detection.'
        }
      ,
        retryQuestion: {
      "question": {
            "tr": "Aşağıdakilerden hangisi doğrudan bir 'Kalite Güvence' (QA) aktivitesidir?",
            "en": "Which of the following is directly a 'Quality Assurance' (QA) activity?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Bir hata bulunduğunda test raporu oluşturmak.",
                        "en": "Creating a test report when a defect is found."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Yazılım süreçlerini iyileştirmek için standartlar ve prosedürler belirlemek.",
                        "en": "Defining standards and procedures to improve software processes."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Canlıya çıkacak sürümü manuel olarak test etmek.",
                        "en": "Manually testing the build before it goes live."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Yazılımdaki hataları bulup geliştiricilere raporlamak.",
                        "en": "Finding defects in the software and reporting them to developers."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Kalite Güvence (QA), hata bulmaktan ziyade hata oluşmasını önleyecek süreçleri ve standartları yönetmeyi hedefler. Hata bulma, raporlama ve doğrulama faaliyetleri Kalite Kontrol (QC) kapsamındadır.",
            "en": "Quality Assurance (QA) aims to manage processes and standards to prevent defects rather than just finding them. Bug finding, reporting, and verification activities fall under Quality Control (QC)."
      }
}
}
    ]
  },

  // ── 3. SDET & AUTOMATION ────────────────────────────────────────────────────
  {
    title: { tr: '💻 SDET ve Otomasyon Nedir?', en: '💻 What is SDET & Automation?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '💻',
        content: {
          tr: "Manuel Test, Otomasyon ve SDET rolleri arasındaki farkı bir hastanenin acil servisine benzetebiliriz: acil doktor (Manuel Tester) hasta önüne geldiğinde durumu gerçek zamanlı değerlendirir ve sezgisel kararlar alır — robot yapamaz bunu; tıbbi cihaz teknisyeni (Otomasyon Mühendisi) rutin EKG, tansiyon, oksijen ölçümlerini otomatik çalıştıran sistemleri kurar ve insanı bu rutinden kurtarır; biyomedikal mühendis (SDET) ise bu cihazların yazılımını yazar, test eder, hastane bilgi sistemiyle konuşturur ve sistem çöktüğünde onu ayağa kaldırır. Peki 'otomasyon her şeyi yapabiliyorsa neden hâlâ manuel tester\'a ihtiyaç var?' Çünkü otomasyon ancak önceden tanımlı senaryoları kontrol eder; kullanıcının 'checkout formuna emoji yazması' gibi hiçbir spesifikasyon metninde geçmeyen kenar senaryolar ancak insan sezgisiyle keşfedilir. Java\'da bu rolleri JUnit testlerine benzetebilirsin: @Test metotları SDET\'in yazdığı otomasyondur, CI pipeline\'ındaki smoke suite Otomasyon Mühendisi\'nin kurduğu sistemdir; ama pre-launch exploratory session\'ı düzenleyen deneyimli QA Manuel Tester\'dır. QA kariyeri açısından pratik strateji: yeni başlayan bir QA Manuel Test becerisiyle neyin test edilmesi gerektiğini anlar; sonra otomasyonla bunu ölçeklendirir; SDET seviyesinde ise test altyapısını tasarlar — bu üç seviye birbiriyle rekabet etmez, birbirinin üzerine inşa edilir.",
          en: "The difference between Manual Testing, Automation, and SDET roles can be compared to a hospital emergency room: the emergency doctor (Manual Tester) evaluates the patient in real time and makes intuitive decisions that a robot cannot; the medical device technician (Automation Engineer) sets up systems that automatically run routine ECG, blood pressure, and oxygen measurements, freeing humans from that repetition; the biomedical engineer (SDET) writes and tests the software for those devices, makes them talk to the hospital information system, and brings the system back up when it crashes. 'If automation can do everything, why do we still need manual testers?' Because automation only checks pre-defined scenarios; edge cases like 'a user types an emoji into the checkout form' — never appearing in any specification — can only be discovered by human intuition. In Java you can map these roles to JUnit tests: the @Test methods are what the SDET writes, the smoke suite in the CI pipeline is the system the Automation Engineer set up, but the experienced QA who runs the pre-launch exploratory session is the Manual Tester. The practical QA career strategy: a new QA starts with Manual Testing to understand what needs to be tested; then learns automation to scale it; at SDET level, designs test infrastructure and manages the team's test process with an engineering mindset — these three levels do not compete with each other, they are built one on top of the other."
        }
      },
      {
        type: 'heading',
        text: { tr: 'SDET Ne Demektir?', en: 'What does SDET mean?' }
      },
      {
        type: 'text',
        content: {
          tr: "SDET (Software Development Engineer in Test), hem yazılım geliştirici (developer) seviyesinde kod yazabilen hem de bir test uzmanının ürün kalitesini sorgulayan vizyonuna sahip hibrit bir mühendislik rolüdür. SDET'ler sadece test koşmazlar; testleri koşturacak otomasyon altyapılarını, test framework'lerini ve CI/CD (Continuous Integration/Continuous Deployment) entegrasyonlarını sıfırdan inşa ederler.",
          en: "SDET stands for Software Development Engineer in Test. It is a hybrid role requiring the coding skills of a software developer combined with the quality-focused mindset of a test engineer. SDETs do not just execute test cases; they architect test automation frameworks and build continuous integration (CI/CD) pipelines from scratch."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Manuel Tester vs Otomasyon Mühendisi vs SDET', en: 'Manual Tester vs Automation Engineer vs SDET' }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kriter', en: 'Criteria' },
          { tr: 'Manuel Test Uzmanı', en: 'Manual Tester' },
          { tr: 'Otomasyon Mühendisi', en: 'Automation Engineer' },
          { tr: 'SDET', en: 'SDET' }
        ],
        rows: [
          [
            { tr: 'Kod Yazma Becerisi', en: 'Coding Skill' },
            { tr: 'Gerekmiyor (Temel seviye)', en: 'No programming (Basic scripting)' },
            { tr: 'Orta Seviye (Selenium/Playwright ile test yazma)', en: 'Intermediate (Writing scripts in Selenium/Playwright)' },
            { tr: 'İleri Seviye (OOP, Tasarım Şablonları, Algoritmalar)', en: 'Advanced (OOP, Design Patterns, Algorithms)' }
          ],
          [
            { tr: 'Ana Sorumluluk', en: 'Core Focus' },
            { tr: 'Kullanıcı gözüyle test, UX kontrolü, keşif testleri.', en: 'Exploratory testing, usability, manual execution.' },
            { tr: 'Mevcut manuel senaryoları kod diline dönüştürmek.', en: 'Automating existing manual test cases.' },
            { tr: 'Test altyapısı kurmak, framework yazmak, birim testleri incelemek.', en: 'Architecting frameworks, code review, performance testing, tooling.' }
          ],
          [
            { tr: 'CI/CD & DevOps Katılımı', en: 'CI/CD & DevOps' },
            { tr: 'Çok az / Yok', en: 'Minimal / None' },
            { tr: 'Orta (Jenkins\'te hazır test tetiklemek)', en: 'Moderate (Triggering tests in Jenkins)' },
            { tr: 'Çok Yüksek (Pipeline kurma, Dockerize etme, Kubernetes yönetimi)', en: 'High (Designing pipelines, Dockerization, Kubernetes clusters)' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'SDET Olmak İçin Hangi Beceriler Gerekir?', en: 'Required Skills for an SDET' }
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '☕',
            label: { tr: 'Programlama Dilleri', en: 'Programming Languages' },
            desc: { tr: "Java, Python, TypeScript gibi en az bir dilde 'Temiz Kod' yazabilmek.", en: "Strong command of at least one programming language like Java, Python, or TypeScript." }
          },
          {
            icon: '🚀',
            label: { tr: 'Otomasyon Araçları', en: 'Automation Frameworks' },
            desc: { tr: 'Selenium WebDriver, Playwright, REST Assured, Appium gibi sektör standartlarında uzmanlık.', en: 'Expertise in industry-standard tools like Selenium, Playwright, REST Assured, and Appium.' }
          },
          {
            icon: '♾️',
            label: { tr: 'CI/CD & DevOps', en: 'CI/CD & DevOps' },
            desc: { tr: 'Jenkins, GitHub Actions, Docker ve Git kullanımı ile testleri pipeline\'a bağlamak.', en: 'Integrating tests into automation pipelines using Jenkins, GitHub Actions, Docker, and Git.' }
          },
          {
            icon: '🗄️',
            label: { tr: 'SQL & Veritabanı', en: 'SQL & Database' },
            desc: { tr: 'Veritabanı düzeyinde sorgular yazıp backend durumunu doğrulayabilmek.', en: 'Writing database queries to validate backend state and ensure data integrity.' }
          },
          {
            icon: '🧠',
            label: { tr: 'Tasarım Şablonları', en: 'Design Patterns' },
            desc: { tr: "Page Object Model (POM), Singleton, Factory gibi otomasyonda kod tekrarını azaltan yapılar.", en: 'Implementing Page Object Model (POM), Singleton, and Factory patterns to reduce code duplication.' }
          },
          {
            icon: '🛡️',
            label: { tr: 'Mülakat & Kalite Vizyonu', en: 'Quality Mindset' },
            desc: { tr: 'Nerede bug çıkabileceğini kestirme, risk analizi yapma ve sınır değerleri (boundary) test edebilme.', en: 'Understanding edge cases, boundary values, risk analysis, and software architecture.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Java Kullanan QA Mühendisleri İçin SDET Perspektifi', en: 'SDET Perspective for Java-Based QA Engineers' }
      },
      {
        type: 'text',
        content: {
          tr: "Java, kurumsal şirketlerin test otomasyonlarında en çok tercih ettiği dildir. Bir Java QA mühendisi, sadece `driver.findElement` yazmakla kalmaz; Java'nın OOP (Nesne Yönelimli Programlama) prensiplerini kullanarak ölçeklenebilir, bakımı kolay framework'ler yazar. Örneğin, test raporlarını otomatik gönderen, paralel çalışabilen ve hata anında otomatik ekran görüntüsü alan sistemleri Java Collection ve Concurrency yapılarıyla inşa eder.",
          en: "Java is the most popular language for enterprise test automation. A Java QA engineer does not just write `driver.findElement`. They leverage OOP (Object-Oriented Programming) concepts to build robust, scalable frameworks. Using Java Collections and Concurrency, they design frameworks that run tests in parallel, handle failures gracefully, and auto-capture screenshots upon test failures."
        }
      },
      {
        type: 'code',
        topicId: 'sdet-pytest-basics',
        language: 'python',
        code: {
          tr: `# SDET'in yazdığı tipik bir pytest testi
# Aşama 1: Arrange — test verisi hazırla
def hesapla_indirim(fiyat, oran):
    """İndirim hesaplayan fonksiyon."""
    return fiyat * (1 - oran / 100)

# Aşama 2: Test sınıfı — pytest otomatik keşfeder
class TestIndirimHesaplama:

    def test_standart_indirim(self):
        # Act — fonksiyonu çağır
        sonuc = hesapla_indirim(100, 20)
        # Assert — beklenen ile gerçeği karşılaştır
        assert sonuc == 80.0, f"Beklenen 80, gelen: {sonuc}"

    def test_sifir_indirim(self):
        sonuc = hesapla_indirim(100, 0)
        assert sonuc == 100.0  # İndirim yoksa fiyat değişmemeli

    def test_tam_indirim(self):
        sonuc = hesapla_indirim(100, 100)
        assert sonuc == 0.0   # %100 indirimde fiyat sıfır olmalı`,
          en: `# A typical pytest test written by an SDET
# Stage 1: Arrange — prepare test data
def calculate_discount(price, rate):
    """Function that calculates discount."""
    return price * (1 - rate / 100)

# Stage 2: Test class — pytest auto-discovers it
class TestDiscountCalculation:

    def test_standard_discount(self):
        # Act — call the function
        result = calculate_discount(100, 20)
        # Assert — compare expected vs actual
        assert result == 80.0, f"Expected 80, got: {result}"

    def test_zero_discount(self):
        result = calculate_discount(100, 0)
        assert result == 100.0  # No discount means no price change

    def test_full_discount(self):
        result = calculate_discount(100, 100)
        assert result == 0.0   # 100% discount should make price zero`,
        },
      },
      automationPyramidFilm,
      {
        type: 'quiz',
        question: {
          tr: "Bir yazılım projesinde test otomasyon mimarisini sıfırdan tasarlayan, testleri Docker üzerinde ayağa kaldıran ve CI/CD pipeline'ını kurgulayan role ne ad verilir?",
          en: "Which role is responsible for designing automation architectures from scratch, dockerizing test suites, and setting up CI/CD pipelines?"
        },
        options: [
          { id: 'a', text: { tr: 'Manuel Test Uzmanı (Manual QA)', en: 'Manual QA Tester' } },
          { id: 'b', text: { tr: 'SDET (Software Development Engineer in Test)', en: 'SDET' } },
          { id: 'c', text: { tr: 'İş Analisti (Business Analyst)', en: 'Business Analyst' } },
          { id: 'd', text: { tr: 'Proje Yöneticisi (Project Manager)', en: 'Project Manager' } }
        ],
        correct: 'b',
        explanation: {
          tr: "SDET'ler ileri seviye kodlama, mimari tasarım, DevOps araçları (Docker, CI/CD) entegrasyonu ve framework oluşturma yetkinliklerine sahip test mühendisleridir.",
          en: "SDETs are test engineers equipped with advanced software development capabilities, systems design, DevOps integration (Docker, CI/CD), and framework engineering."
        }
      ,
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonu için ölçeklenebilir bir framework geliştiren, bulut tabanlı altyapıları yöneten ve test süreçlerini yazılım geliştirme döngüsüne entegre eden mühendislik rolü hangisidir?",
            "en": "Which engineering role is responsible for developing scalable automation frameworks, managing cloud-based test infrastructures, and integrating test processes into the software development lifecycle?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Destek Uzmanı (Support Specialist)",
                        "en": "Support Specialist"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "SDET (Software Development Engineer in Test)",
                        "en": "SDET"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "UI Tasarımcısı (UI Designer)",
                        "en": "UI Designer"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sistem Yöneticisi (System Administrator)",
                        "en": "System Administrator"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "SDET rolü, hem yazılım geliştirme prensiplerini hem de test otomasyonunu birleştirerek, altyapı yönetimi ve pipeline kurulumu gibi teknik sorumlulukları üstlenen uzmanları tanımlar.",
            "en": "The SDET role defines experts who combine software development principles with test automation, taking on technical responsibilities such as infrastructure management and pipeline setup."
      }
}
}
    ]
  },

  // ── 4. WEB, MOBILE & PROCESS ────────────────────────────────────────────────
  {
    title: { tr: '🌐 Web, Mobil Test & Süreçler', en: '🌐 Web, Mobile Testing & Process' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍽️',
        content: {
          tr: "Web mimarisini bir şehrin belediye sistemi gibi düşünebilirsin: vatandaş (kullanıcı) belediye binasına (Frontend/UI) gelir; gişe görevlisi (API) vatandaşın talebini alır ve doğru departmana iletir; arka ofisteki bürokratlar (Backend) talebi işler; arşiv odası (Database) tüm kayıtları tutar. Peki 'test ederken sadece UI\'yı tıklamak yeterli değil mi?' Çünkü gişe görevlisi 'başvurunuzu aldım' dese bile arka ofis süreci başlatmamış olabilir — bir ödeme formu 'tamamlandı' mesajı gösterse bile backend transaction kaydetmemiş olabilir; bu sessiz başarısızlığı ancak API seviyesinde assertion yaparak veya database\'i sorgulayarak yakalarsın. Java\'da bu mimariyi Spring Boot projesi olarak düşünebilirsin: Controller → Service → Repository → Entity katmanları; her katmanı birim testi yazmak önemli ama sadece `@SpringBootTest` ile tüm yığını entegrasyon testi yapmak gerçek akışı valide eder. QA açısından kritik fark: UI testi 'onay sayfasını gördüğünde' geçer; API testi `/payment` endpoint\'inin 200 döndürdüğünü kontrol eder; entegrasyon testi ise database\'deki `orders` tablosunda kayıt oluştuğunu doğrular — üçünü birden yapan QA 'ödeme sayfası açılıyor ama para çekilmiyor' gibi katman sınırındaki hataları yakalar, sadece UI testi yapan ise bu hataları müşteri şikayetiyle öğrenir.",
          en: "Think of web architecture like a city's municipal system: a citizen (user) comes to the municipal building (Frontend/UI); the counter clerk (API) takes the citizen's request and routes it to the right department; the back-office staff (Backend) process the request; the archive room (Database) holds all the records. 'When testing, isn't clicking the UI enough?' Because even if the counter clerk says 'your application has been received,' the back office may not have started the process — even if a payment form shows 'completed,' the backend may not have recorded the transaction. You can only catch this silent failure by asserting at the API level or querying the database. In Java you can map this architecture to a Spring Boot project: Controller → Service → Repository → Entity layers; writing unit tests for each layer matters, but only `@SpringBootTest` with a full-stack integration test validates the real flow. The critical QA difference: a UI test passes when it sees the 'confirmation page'; an API test checks that `/payment` returned 200; an integration test verifies that a record was created in the `orders` table. A QA who does all three catches boundary-layer bugs like 'the payment page loads but no money is charged' — a QA who only does UI testing learns about those bugs from customer complaints."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Bir Web Uygulaması Hangi Katmanlardan Oluşur?', en: 'What Layers Make Up a Web Application?' }
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🎨',
            label: { tr: 'UI / Frontend Nedir?', en: 'What is UI / Frontend?' },
            desc: { tr: "Kullanıcının tarayıcıda gördüğü ve etkileşime girdiği her şey: butonlar, formlar, sayfa tasarımı. HTML/CSS/JavaScript (React, Angular, Vue) ile yazılır. Test ederken locator'larla element bulunup tıklama/yazma işlemleri doğrulanır.", en: 'Everything the user sees and interacts with in the browser: buttons, forms, page layout. Built with HTML/CSS/JavaScript (React, Angular, Vue). Testing it means locating elements and verifying clicks/inputs behave correctly.' }
          },
          {
            icon: '⚙️',
            label: { tr: 'Backend Nedir?', en: 'What is the Backend?' },
            desc: { tr: 'Kullanıcının görmediği, iş mantığını çalıştıran sunucu tarafı kod. İstekleri (request) işler, kuralları uygular, veritabanıyla konuşur. Java (Spring Boot), Python (Django/Flask), Node.js gibi dillerle yazılır.', en: 'The server-side code the user never sees, running business logic. Processes requests, applies rules, talks to the database. Written in Java (Spring Boot), Python (Django/Flask), Node.js, etc.' }
          },
          {
            icon: '🗄️',
            label: { tr: 'Database Nedir?', en: 'What is a Database?' },
            desc: { tr: 'Kullanıcı bilgileri, siparişler, ürünler gibi verilerin kalıcı olarak saklandığı sistem. MySQL/PostgreSQL gibi ilişkisel (SQL) veya MongoDB gibi NoSQL olabilir. Test ederken UI üzerinde yapılan işlemin veritabanına doğru yazılıp yazılmadığı kontrol edilir.', en: 'The system where user info, orders, products, etc. are permanently stored. Can be relational (SQL) like MySQL/PostgreSQL or NoSQL like MongoDB. Testing it means verifying that UI actions are correctly persisted in the database.' }
          },
          {
            icon: '🔌',
            label: { tr: 'API Nedir?', en: 'What is an API?' },
            desc: { tr: "Frontend ile Backend'in veya iki farklı sistemin birbiriyle konuşmasını sağlayan kurallar bütünü. Genellikle REST (HTTP + JSON) şeklindedir. Postman veya REST Assured ile UI'a hiç dokunmadan doğrudan test edilebilir.", en: 'The set of rules that lets the frontend and backend (or two different systems) talk to each other. Usually REST (HTTP + JSON). Can be tested directly with Postman or REST Assured without touching the UI at all.' }
          }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Web Testi Nedir?', en: 'What is Web Testing?' }
      },
      {
        type: 'text',
        content: {
          tr: 'Web testi; bir web uygulamasının fonksiyonel olarak doğru çalıştığını (linkler, formlar, butonlar), farklı tarayıcılarda (Chrome, Firefox, Safari) ve farklı ekran boyutlarında (responsive) doğru göründüğünü, hızlı yüklendiğini ve güvenli olduğunu doğrulayan test sürecidir. Selenium ve Playwright gibi araçlar, bir kullanıcının yapacağı tıklama ve yazma işlemlerini otomatik olarak tekrarlayarak bu testleri yapar.',
          en: 'Web testing verifies that a web application works correctly functionally (links, forms, buttons), renders correctly across browsers (Chrome, Firefox, Safari) and screen sizes (responsive), loads fast, and is secure. Tools like Selenium and Playwright automate the clicks and inputs a real user would perform to run these checks.'
        }
      },
      {
        type: 'heading',
        text: { tr: 'Mobil Uygulama Testi Nedir, Nasıl Yapılır?', en: 'What is Mobile App Testing & How is it Done?' }
      },
      {
        type: 'text',
        content: {
          tr: "Mobil test, bir uygulamanın Android ve iOS gibi farklı işletim sistemlerinde, farklı ekran boyutu ve donanımlara sahip cihazlarda doğru çalıştığını doğrular. Üç uygulama tipi vardır: Native (Kotlin/Swift ile yazılan, mağazadan indirilen), Hybrid (tek kod tabanından hem Android hem iOS'a derlenen, React Native/Flutter gibi) ve Mobil Web (tarayıcıda açılan responsive site). Appium gibi araçlar, Selenium'a çok benzer bir mantıkla gerçek cihaz veya emülatör üzerinde dokunma, kaydırma (swipe) gibi gerçek kullanıcı hareketlerini otomatikleştirir.",
          en: "Mobile testing verifies that an app works correctly across different operating systems (Android, iOS) and devices with varying screen sizes and hardware. There are three app types: Native (written in Kotlin/Swift, downloaded from a store), Hybrid (compiled from one codebase to both platforms, e.g. React Native/Flutter), and Mobile Web (a responsive site opened in a browser). Tools like Appium, working very similarly to Selenium, automate real user gestures like tapping and swiping on real devices or emulators."
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Uygulama Tipi', en: 'App Type' },
          { tr: 'Nasıl Yazılır?', en: 'How is it Built?' },
          { tr: 'Nasıl Test Edilir?', en: 'How is it Tested?' }
        ],
        rows: [
          [
            { tr: 'Native', en: 'Native' },
            { tr: 'Kotlin/Java (Android), Swift (iOS) ile platforma özel yazılır.', en: 'Written natively per platform: Kotlin/Java (Android), Swift (iOS).' },
            { tr: 'Appium + platforma özel locator (resource-id, accessibility id) ile.', en: 'With Appium, using platform-specific locators (resource-id, accessibility id).' }
          ],
          [
            { tr: 'Hybrid', en: 'Hybrid' },
            { tr: 'React Native, Flutter gibi tek kod tabanıyla her iki platforma derlenir.', en: 'Compiled to both platforms from one codebase, e.g. React Native, Flutter.' },
            { tr: 'Appium aynı test mantığıyla çoğunlukla her iki platformda da çalışır.', en: 'Appium tests largely work on both platforms with the same logic.' }
          ],
          [
            { tr: 'Mobil Web', en: 'Mobile Web' },
            { tr: 'Normal web teknolojileriyle (HTML/CSS/JS) yazılır, tarayıcıda açılır.', en: 'Built with standard web tech (HTML/CSS/JS), opened in a browser.' },
            { tr: 'Selenium/Playwright ile, mobil tarayıcı emülasyonu (responsive mode) kullanılarak.', en: 'With Selenium/Playwright, using mobile browser emulation (responsive mode).' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'DevOps Nedir? Amacı Nedir?', en: 'What is DevOps and What is its Purpose?' }
      },
      {
        type: 'text',
        content: {
          tr: "DevOps (Development + Operations), yazılımı geliştiren (Dev) ve canlı ortamda çalıştıran (Ops) ekipleri birleştiren bir kültür ve pratikler bütünüdür. Amacı, kod yazıldıktan sonra üretime (production) çıkana kadar geçen süreci otomatikleştirip hızlandırmak, hataları erken yakalamak ve sık, güvenli sürümler (release) yapabilmektir. Jenkins gibi araçlarla kurulan CI/CD (Continuous Integration/Continuous Deployment) pipeline'ları, kod her push edildiğinde otomatik build + test + deploy adımlarını çalıştırır. Docker ve Kubernetes ise bu uygulamaların her ortamda (geliştirici bilgisayarı, test sunucusu, canlı) aynı şekilde çalışmasını garanti eder.",
          en: "DevOps (Development + Operations) is a culture and set of practices that unifies the teams building software (Dev) and running it in production (Ops). Its goal is to automate and accelerate the path from code to production, catch issues early, and enable frequent, safe releases. CI/CD (Continuous Integration/Continuous Deployment) pipelines built with tools like Jenkins automatically run build + test + deploy steps on every code push. Docker and Kubernetes guarantee that these applications run identically across every environment (a developer's laptop, a test server, production)."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'DevOps Döngüsü (Basitleştirilmiş)', en: 'The DevOps Loop (Simplified)' },
        items: [
          { icon: '📝', label: { tr: 'Planla', en: 'Plan' }, desc: { tr: 'Gereksinim', en: 'Requirement' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Geliştir', en: 'Code' }, desc: { tr: 'Backend/Frontend', en: 'Backend/Frontend' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'Test Et', en: 'Test' }, desc: { tr: 'Selenium/API', en: 'Selenium/API' } },
          { arrow: true },
          { icon: '📦', label: { tr: 'Paketle', en: 'Build' }, desc: { tr: 'Docker image', en: 'Docker image' } },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Dağıt', en: 'Deploy' }, desc: { tr: 'Kubernetes', en: 'Kubernetes' }, highlight: true },
          { arrow: true },
          { icon: '📡', label: { tr: 'İzle', en: 'Monitor' }, desc: { tr: 'Loglar/Metrikler', en: 'Logs/Metrics' } }
        ],
        note: {
          tr: "Bu döngü Jenkins/GitHub Actions gibi CI/CD araçlarıyla otomatikleştirilir; her adımda otomatik test koşulmazsa hatalar canlıya kadar fark edilmeyebilir.",
          en: "This loop is automated with CI/CD tools like Jenkins/GitHub Actions; without automated tests at each step, defects may go unnoticed until production."
        }
      },
      {
        type: 'heading',
        text: { tr: 'Agile Nedir? Scrum Nedir?', en: 'What is Agile? What is Scrum?' }
      },
      {
        type: 'text',
        content: {
          tr: "Agile (Çevik), büyük bir projeyi tek seferde teslim etmek yerine küçük, sürekli geri bildirim alınan parçalara (sprint) bölerek geliştirme felsefesidir. Scrum ise Agile felsefesini uygulamak için kullanılan en yaygın çerçevedir (framework): iş genellikle 2 haftalık sprint'lere bölünür, her sprint planlama, günlük kısa toplantı (daily stand-up), sprint sonu demo (review) ve retrospektif ile yönetilir. Eski Waterfall (Şelale) modelinde ise tüm gereksinimler en başta belirlenir, test aşaması en sona bırakılır — bu da hataların çok geç fark edilmesine yol açar.",
          en: "Agile is a development philosophy that breaks a large project into small, continuously reviewed pieces (sprints) instead of delivering everything at once. Scrum is the most common framework for applying Agile: work is typically split into 2-week sprints, each managed with sprint planning, daily stand-ups, a sprint review/demo, and a retrospective. In the older Waterfall model, all requirements are fixed upfront and testing is pushed to the very end — meaning bugs are caught far too late."
        }
      },
      {
        type: 'table',
        headers: [
          { tr: 'Özellik', en: 'Feature' },
          { tr: 'Waterfall (Şelale)', en: 'Waterfall' },
          { tr: 'Agile / Scrum', en: 'Agile / Scrum' }
        ],
        rows: [
          [
            { tr: 'Test ne zaman yapılır?', en: 'When is testing done?' },
            { tr: 'Sadece en sonda, geliştirme bitince.', en: 'Only at the very end, after development finishes.' },
            { tr: 'Her sprint içinde, sürekli (continuous testing).', en: 'Continuously, inside every sprint.' }
          ],
          [
            { tr: 'Değişikliklere uyum', en: 'Adapting to change' },
            { tr: 'Zor — plan baştan belirlenir ve değişmez.', en: 'Hard — the plan is fixed upfront and rarely changes.' },
            { tr: 'Kolay — her sprint sonunda yön değiştirilebilir.', en: 'Easy — direction can shift after every sprint.' }
          ],
          [
            { tr: 'Müşteriye teslimat', en: 'Customer delivery' },
            { tr: 'Tek seferde, proje sonunda (aylar/yıllar sonra).', en: 'Once, at project end (months/years later).' },
            { tr: 'Sık sık, her sprint sonunda çalışan bir parça.', en: 'Frequently — a working increment after every sprint.' }
          ],
          [
            { tr: "QA'in rolü", en: "QA's role" },
            { tr: 'Ayrı bir "test fazı"nda devreye girer.', en: 'Joins in a separate, late "testing phase".' },
            { tr: 'Geliştirmeyle iç içe, en baştan katılır (shift-left).', en: 'Embedded with development from day one (shift-left).' }
          ]
        ]
      },
      {
        type: 'heading',
        text: { tr: 'Bir Yazılım Geliştirme (Development) Takımı Kimlerden Oluşur?', en: 'Who Makes Up a Software Development Team?' }
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🧭', label: { tr: 'Product Owner', en: 'Product Owner' }, desc: { tr: 'Neyin yapılacağına karar verir, önceliklendirir; iş birimi ile geliştirme ekibi arasındaki köprüdür.', en: 'Decides what gets built and prioritizes it; bridges the business side with the dev team.' } },
          { icon: '🌀', label: { tr: 'Scrum Master', en: 'Scrum Master' }, desc: { tr: 'Ekibin Scrum sürecini doğru uygulamasına yardım eder, engelleri (blocker) kaldırır.', en: 'Helps the team follow the Scrum process correctly and removes blockers.' } },
          { icon: '👨‍💻', label: { tr: 'Developer', en: 'Developer' }, desc: { tr: 'Frontend, Backend veya Full-stack kod yazan, özellikleri (feature) hayata geçiren kişidir.', en: 'Writes frontend, backend, or full-stack code that implements features.' } },
          { icon: '🛡️', label: { tr: 'QA / Test Mühendisi', en: 'QA / Test Engineer' }, desc: { tr: 'Geliştirilen özelliklerin doğru çalıştığını manuel veya otomasyonla doğrular, hata raporlar.', en: 'Verifies features work correctly — manually or via automation — and reports bugs.' } },
          { icon: '🤖', label: { tr: 'SDET / Otomasyon Mühendisi', en: 'SDET / Automation Engineer' }, desc: { tr: 'Test süreçlerini hızlandıran otomasyon framework\'leri ve CI/CD entegrasyonları kurar.', en: 'Builds automation frameworks and CI/CD integrations that speed up testing.' } },
          { icon: '🐳', label: { tr: 'DevOps Mühendisi', en: 'DevOps Engineer' }, desc: { tr: 'Build, deploy ve sunucu altyapısını (Docker, Kubernetes, Jenkins) kurar ve yönetir.', en: 'Sets up and maintains build, deploy, and infrastructure (Docker, Kubernetes, Jenkins).' } },
          { icon: '🎨', label: { tr: 'UI/UX Tasarımcı', en: 'UI/UX Designer' }, desc: { tr: 'Kullanıcının göreceği arayüzü ve deneyimi tasarlar, geliştiriciye mockup/prototip sağlar.', en: 'Designs the interface and experience users see, providing mockups/prototypes to developers.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: 'SDLC Nedir? (Software Development Life Cycle)', en: 'What is SDLC? (Software Development Life Cycle)' }
      },
      {
        type: 'text',
        content: {
          tr: "SDLC (Yazılım Geliştirme Yaşam Döngüsü), bir yazılımın fikir aşamasından emekli edilmesine kadar geçirdiği tüm aşamaları tanımlayan standart süreçtir. Her aşamada test uzmanlarının farklı bir görevi vardır — sadece 'Test' aşamasında değil, 'Gereksinim Analizi' aşamasında bile (gereksinim dokümanını inceleyip belirsizlikleri sorgulayarak) devrededirler.",
          en: "SDLC (Software Development Life Cycle) is the standard process describing every phase a piece of software goes through, from idea to retirement. Testers have a role at every phase — not just the 'Testing' phase, but even during 'Requirement Analysis' (reviewing the requirements doc and questioning ambiguities)."
        }
      },
      {
        type: 'visual',
        variant: 'boxes',
        title: { tr: 'SDLC Aşamaları', en: 'SDLC Phases' },
        items: [
          { icon: '📋', label: { tr: 'Gereksinim Analizi', en: 'Requirement Analysis' } },
          { arrow: true },
          { icon: '📐', label: { tr: 'Tasarım', en: 'Design' } },
          { arrow: true },
          { icon: '💻', label: { tr: 'Geliştirme', en: 'Development' } },
          { arrow: true },
          { icon: '🧪', label: { tr: 'Test', en: 'Testing' }, highlight: true },
          { arrow: true },
          { icon: '🚀', label: { tr: 'Dağıtım', en: 'Deployment' } },
          { arrow: true },
          { icon: '🔧', label: { tr: 'Bakım', en: 'Maintenance' } }
        ],
        note: {
          tr: 'Çevik (Agile) ekiplerde bu aşamalar sırayla bir kere değil, her sprint içinde küçük döngüler halinde tekrar tekrar yaşanır.',
          en: 'In Agile teams these phases do not happen once in sequence — they repeat in small loops inside every sprint.'
        }
      },
      devopsLoopFilm,
      devopsStep,
      devopsPractice,
      {
        type: 'quiz',
        question: {
          tr: "Bir e-ticaret sitesinde kullanıcı 'Sepete Ekle' butonuna tıkladığında, ürün bilgisinin kalıcı olarak saklandığı katman hangisidir?",
          en: "On an e-commerce site, when a user clicks 'Add to Cart', which layer is responsible for permanently storing that product information?"
        },
        options: [
          { id: 'a', text: { tr: 'UI / Frontend', en: 'UI / Frontend' } },
          { id: 'b', text: { tr: 'API', en: 'API' } },
          { id: 'c', text: { tr: 'Database', en: 'Database' } },
          { id: 'd', text: { tr: 'DevOps pipeline', en: 'DevOps pipeline' } }
        ],
        correct: 'c',
        explanation: {
          tr: 'UI tıklamayı yakalar, API isteği backend\'e taşır, backend mantığı işler ve veriyi kalıcı olarak saklayan katman Database\'dir.',
          en: 'The UI captures the click, the API carries the request to the backend, backend logic processes it, and the Database is the layer that permanently stores the data.'
        }
      ,
        retryQuestion: {
      "question": {
            "tr": "Bir kullanıcı profil sayfasında 'Kaydet' butonuna bastığında, güncellenen kullanıcı bilgilerinin sistemde kalıcı hale getirilmesi hangi katmanda gerçekleşir?",
            "en": "When a user clicks 'Save' on a profile page, at which layer does the persistence of the updated user information occur?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Tarayıcı Önbelleği (Browser Cache)",
                        "en": "Browser Cache"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Test Ortamı (Test Environment)",
                        "en": "Test Environment"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Veritabanı (Database)",
                        "en": "Database"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "İstemci Tarafı (Client-side)",
                        "en": "Client-side"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Verilerin uzun vadeli tutulduğu, güncellendiği ve sorgulanabildiği yer veritabanıdır. Frontend ve API sadece arayüz ve iletişim görevlerini üstlenirken, veritabanı kalıcılığı sağlar.",
            "en": "The database is where data is kept, updated, and queried for the long term. While frontend and API handle the interface and communication, the database provides persistence."
      }
}
}
    ]
  },

  // ── 5. SITE MAP ──────────────────────────────────────────────────────────────
  {
    title: { tr: '🗺️ Site Haritası — Bu Platformda Neler Var?', en: '🗺️ Site Map — What\'s on This Platform?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: "Yazılım testi öğrenmek, bir şehirde ilk kez navigasyon kullanmak gibidir: GPS seni doğrudan hedefe götürür ama etraftaki sokakları, kestirmeleri ve tehlikeli bölgeleri ancak biraz dolaşarak öğrenirsin — o dolaşmayı doğru haritayla yapman zamandan kazandırır. 'Önce hangi konuyu öğreneyim sorusunu kendim çözemez miyim; neden bir roadmap\'e ihtiyacım var?' Çünkü 'Selenium mi önce, pytest mi?' sorusuna yanlış cevap versen Selenium öğrenmeye çalışırken Python\'u da sıfırdan öğrenmek zorunda olduğunu sonradan keşfedersin — önce Python → sonra pytest → sonra Selenium Page Object sıralaması hem öğrenme hızını artırır hem motivasyonu korur. Java\'da sertifikalı bir öğrenme yolun var: Syntax → OOP → Collections → Generics → Concurrency; test otomasyonunda da benzer bir hiyerarşi geçerlidir: Temel Test Kavramları → Programlama Dili → Test Framework → Araç → CI/CD Entegrasyonu. QA kariyeri açısından pratik değer: roadmap\'e göre ilerlediğinde her yeni konunun önceki konuya oturduğunu görürsün — hedefsiz atlama yöntemiyle ise 3 ayda 10 araç tanıyıp hiçbirini gerçek projede kullanamaz hale gelirsin.",
          en: "Learning software testing is like using GPS navigation in a city for the first time: the GPS takes you straight to the destination, but you only truly learn the surrounding streets, shortcuts, and dangerous zones by exploring a little — doing that exploring with the right map saves you time. 'Can't I figure out which topic to learn first on my own — why do I need a roadmap?' Because if you answer 'Selenium first or pytest first?' incorrectly you discover only later that learning Selenium requires also learning Python from scratch — the Python → pytest → Selenium Page Object sequence both speeds up learning and keeps motivation intact. In Java you have a certified learning path: Syntax → OOP → Collections → Generics → Concurrency; a similar hierarchy applies in test automation: Basic Testing Concepts → Programming Language → Test Framework → Tool → CI/CD Integration. The practical career value: following the roadmap, you find that every new topic builds on the previous one — the 'jump around randomly' approach results in knowing 10 tools after 3 months but being unable to use any of them in a real project."
        }
      },
      {
        type: 'heading',
        text: { tr: '🛡️ Test Temelleri & Manuel Test', en: '🛡️ Testing Fundamentals & Manual Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🛡️', route: '/what-is-testing', label: { tr: 'Yazılım Testi & QA Temelleri', en: 'Software Testing & QA Fundamentals' }, desc: { tr: 'Yazılım testi nedir, neden test yapılır, ISTQB temel prensipleri, QA vs QC ve SDET rolleri.', en: 'What is software testing, why we test, ISTQB core principles, QA vs QC, and SDET roles.' } },
          { icon: '✍️', route: '/manual-testing', label: { tr: 'Manuel Test Temelleri', en: 'Manual Testing Fundamentals' }, desc: { tr: 'Test senaryosu (test case) yazımı, hata (bug) raporlama, test tasarım teknikleri ve Agile QA süreçleri.', en: 'Writing test cases, reporting bugs, test design techniques, and Agile QA processes.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🎨 UI / Web Test Otomasyonu', en: '🎨 UI / Web Test Automation' }
      },
      {
        type: 'link-grid',
        cols: 3,
        items: [
          { icon: '🟢', route: '/selenium', label: { tr: 'Selenium WebDriver', en: 'Selenium WebDriver' }, desc: { tr: "En yaygın web otomasyon aracı: locator stratejileri, wait'ler, gerçek senaryolar ve 50+ mülakat sorusu.", en: 'The most widely used web automation tool: locator strategies, waits, real scenarios, and 50+ interview questions.' } },
          { icon: '🎭', route: '/playwright', label: { tr: 'Playwright', en: 'Playwright' }, desc: { tr: 'Modern, hızlı ve otomatik bekleyen (auto-wait) yeni nesil web test aracı.', en: 'A modern, fast, auto-waiting next-generation web testing tool.' } },
          { icon: '🌲', route: '/cypress', label: { tr: 'Cypress', en: 'Cypress' }, desc: { tr: 'Modern frontend test aracı: test izolasyonu, time-travel, intercepting ve Selector Playground.', en: 'Modern frontend testing tool: test isolation, time-travel debugging, network intercepting, and Selector Playground.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🔌 API Testi', en: '🔌 API Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '📮', route: '/postman', label: { tr: 'Postman', en: 'Postman' }, desc: { tr: "Collection, environment, script ve Newman ile CI'a entegre API testi.", en: 'API testing with collections, environments, scripts, and CI integration via Newman.' } },
          { icon: '☕', route: '/rest-assured', label: { tr: 'REST Assured', en: 'REST Assured' }, desc: { tr: 'Java ile kod tabanlı API otomasyonu: given-when-then zinciri ve assertion\'lar.', en: 'Code-based API automation in Java: the given-when-then chain and assertions.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🗄️ Database Testi', en: '🗄️ Database Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🗃️', route: '/sql', label: { tr: 'SQL & Veri Doğrulama', en: 'SQL & Data Validation' }, desc: { tr: 'SELECT, JOIN, GROUP BY ve interaktif sorgu pratiğiyle backend veri doğrulama.', en: 'Validate backend data with SELECT, JOIN, GROUP BY, and interactive query practice.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '📱 Mobil Test', en: '📱 Mobile Testing' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '📱', route: '/appium', label: { tr: 'Appium', en: 'Appium' }, desc: { tr: 'Android ve iOS\'ta gerçek cihaz/emülatör üzerinde dokunma, kaydırma gibi gerçek kullanıcı hareketlerini otomatikleştirme.', en: 'Automate real user gestures like tapping and swiping on real devices or emulators for Android and iOS.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '⚡ Performans & Bulut Test Çalıştırma', en: '⚡ Performance & Cloud Test Execution' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '⚡', route: '/jmeter', label: { tr: 'JMeter', en: 'JMeter' }, desc: { tr: 'Yük testi (load testing), test planları ve performans raporları.', en: 'Load testing, test plans, and performance reports.' } },
          { icon: '☁️', route: '/browserstack', label: { tr: 'BrowserStack', en: 'BrowserStack' }, desc: { tr: 'Selenium/Playwright/Appium testlerini gerçek cihaz bulutunda çalıştırma.', en: 'Run Selenium/Playwright/Appium tests on a real device cloud.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🐳 DevOps, CI/CD & Cloud', en: '🐳 DevOps, CI/CD & Cloud' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🐙', route: '/git-github', label: { tr: 'Git & GitHub', en: 'Git & GitHub' }, desc: { tr: 'Versiyon kontrol temelleri, branch yönetimi, conflict çözümü ve GitHub Actions ile Pages arayüz rehberi.', en: 'Version control fundamentals, branch management, conflict resolution, and GitHub Actions/Pages UI guide.' } },
          { icon: '🐧', route: '/linux', label: { tr: 'Linux Temelleri', en: 'Linux Fundamentals' }, desc: { tr: 'Dosya sistemi, izinler (chmod), metin işleme (pipe/grep), süreç yönetimi ve QA için Linux senaryoları.', en: 'File system, permissions (chmod), text processing (pipes/grep), process management, and QA Linux scenarios.' } },
          { icon: '🐳', route: '/docker', label: { tr: 'Docker', en: 'Docker' }, desc: { tr: 'Container, image, Selenium Grid ve test ortamlarını izole şekilde ayağa kaldırma.', en: 'Containers, images, Selenium Grid, and spinning up isolated test environments.' } },
          { icon: '🔧', route: '/jenkins', label: { tr: 'Jenkins', en: 'Jenkins' }, desc: { tr: 'Pipeline, build aşamaları, test raporları ve otomatik tetiklenen CI/CD akışları.', en: 'Pipelines, build stages, test reports, and automatically triggered CI/CD flows.' } },
          { icon: '☸️', route: '/kubernetes', label: { tr: 'Kubernetes', en: 'Kubernetes' }, desc: { tr: 'Pod, deployment, service kavramları ve kubectl ile test ortamı yönetimi.', en: 'Pods, deployments, services, and managing test environments with kubectl.' } },
          { icon: '📨', route: '/kafka', label: { tr: 'Kafka', en: 'Kafka' }, desc: { tr: 'Producer/consumer, topic/partition kavramları ve event-driven sistemlerde test.', en: 'Producers/consumers, topics/partitions, and testing event-driven systems.' } },
          { icon: '🟧', route: '/aws', label: { tr: 'AWS', en: 'AWS' }, desc: { tr: 'QA otomasyonu için bulut servisleri, CI pipeline\'ları ve ölçeklenebilir test çalıştırma.', en: 'Cloud services for QA automation, CI pipelines, and scalable test execution.' } },
          { icon: '🔷', route: '/azure', label: { tr: 'Azure', en: 'Azure' }, desc: { tr: 'Azure DevOps pipeline\'ları, bulut test ortamları ve CI/CD iş akışları.', en: 'Azure DevOps pipelines, cloud test environments, and CI/CD workflows.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '💻 Programlama Dilleri', en: '💻 Programming Languages' }
      },
      {
        type: 'link-grid',
        cols: 3,
        items: [
          { icon: '☕', route: '/java', label: { tr: 'Java', en: 'Java' }, desc: { tr: 'Selenium/REST Assured otomasyonu ve mülakatlar için Java temelleri.', en: 'Java fundamentals for Selenium/REST Assured automation and interviews.' } },
          { icon: '🐍', route: '/python', label: { tr: 'Python', en: 'Python' }, desc: { tr: 'pytest, Selenium ve Playwright ile sıfırdan Python otomasyonu.', en: 'Python automation from scratch with pytest, Selenium, and Playwright.' } },
          { icon: '🔷', route: '/typescript', label: { tr: 'TypeScript', en: 'TypeScript' }, desc: { tr: 'Playwright TS ile tip güvenli (type-safe) test otomasyonu.', en: 'Type-safe test automation with Playwright TS.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🧩 Algoritmalar & Problem Çözme', en: '🧩 Algorithms & Problem Solving' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🧠', route: '/algorithms', label: { tr: 'Temel Algoritmalar', en: 'Basic Algorithms' }, desc: { tr: 'QA mülakatlarında sıkça sorulan algoritma soruları, dizi/sicim işlemleri ve interaktif soru bankası.', en: 'Algorithm questions frequently asked in QA interviews, array/string operations, and interactive question bank.' } },
          { icon: '🚀', route: '/advanced-algorithms', label: { tr: 'İleri Seviye Algoritmalar', en: 'Advanced Algorithms' }, desc: { tr: 'Arama ve sıralama algoritmaları, karmaşıklık analizi (Big O) ve gelişmiş problem çözme pratikleri.', en: 'Search and sort algorithms, complexity analysis (Big O), and advanced problem solving practices.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '🗺️ Kariyer & Rehberlik', en: '🗺️ Career & Guidance' }
      },
      {
        type: 'link-grid',
        cols: 2,
        items: [
          { icon: '🗺️', route: '/qa-mentor', label: { tr: 'QA Mentor (AI)', en: 'QA Mentor (AI)' }, desc: { tr: 'AI destekli kariyer yol haritası oluşturucu: Manuel, Otomasyon veya DevOps yönelimli kişisel planlar.', en: 'AI-backed career roadmap builder: personalized plans tailored for Manual, Automation, or DevOps paths.' } }
        ]
      },
      {
        type: 'heading',
        text: { tr: '📚 Karşılaştırma & Referans', en: '📚 Comparison & Reference' }
      },
      {
        type: 'link-grid',
        cols: 3,
        items: [
          { icon: '⚖️', route: '/test-frameworks', label: { tr: 'pytest vs Selenium vs Playwright', en: 'pytest vs Selenium vs Playwright' }, desc: { tr: 'Üç framework\'ün güçlü/zayıf yönlerini ve ne zaman hangisinin seçileceğini karşılaştırma.', en: 'Compare the strengths, trade-offs, and when to choose each of the three frameworks.' } },
          { icon: '📖', route: '/java-document', label: { tr: 'Java Referans Dokümanı', en: 'Java Reference Document' }, desc: { tr: 'Collections, OOP, exception ve concurrency konularını kapsayan aranabilir Java rehberi.', en: 'A searchable Java reference covering collections, OOP, exceptions, and concurrency.' } },
          { icon: '🐙', route: '/git-document', label: { tr: 'Git Referans Dokümanı', en: 'Git Reference Document' }, desc: { tr: 'Git kurulumu, hesap açma, branching, conflict ve gelişmiş Git konularını içeren rehber.', en: 'A searchable Git reference covering installation, account creation, branching, conflict resolution, and advanced Git concepts.' } }
        ]
      },
      learningRoadmapFilm,
      roadmapStep,
      roadmapPractice
    ]
  }
]

const trHero = {
  title: '🛡️ Yazılım Testi ve QA Temelleri',
  subtitle: 'Sıfırdan Başlayanlar İçin Test Mühendisliği Kılavuzu',
  intro: "Yazılım testinin ne olduğunu, modern yazılımdaki hayati önemini, ISTQB temellerini, Kalite Güvencesi (QA) ve SDET rollerinin ne anlama geldiğini somut örnekler ve günlük hayat benzetmeleriyle öğrenin.",
}

const trTabs = ['🎯 Giriş & Neden', '📖 ISTQB & Temeller', '🛡️ QA vs QC', '💻 SDET & Otomasyon', '🌐 Web, Mobil & Süreçler', '🗺️ Site Haritası']

const enHero = {
  title: '🛡️ Software Testing & QA Fundamentals',
  subtitle: 'A Beginner\'s Guide to Software Test Engineering',
  intro: 'Learn what software testing is, its vital role in modern software development, ISTQB fundamentals, and the differences between QA, QC, and SDET roles with concrete real-world examples.',
}

const enTabs = ['🎯 Intro & Why', '📖 ISTQB & Core', '🛡️ QA vs QC', '💻 SDET & Automation', '🌐 Web, Mobile & Process', '🗺️ Site Map']

export const whatIsTestingData = {
  en: { hero: enHero, tabs: enTabs, sections },
  tr: { hero: trHero, tabs: trTabs, sections },
}

fillMissingCodeTrios(whatIsTestingData, 'what-is-testing')
