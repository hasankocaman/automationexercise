// claudeAiData.js - Claude AI for Testers Learning Page
// Bir tester Claude yapay zekayı junior'dan senior'a nasıl kullanır.
// Sekme mimarisi ve iş paketleri: claudesayfa.md (CS1 bu dosyanın ilk 2 sekmesi).

// ─── Paylaşılan bilingual interaktif bloklar (EN + TR section'larda aynı const kullanılır) ───

const claudeDailyLoopAnimation = {
  type: 'step-animation',
  id: 'claude-daily-loop-step-01',
  title: { tr: 'Adım Adım: Bir Tester\'ın Claude Döngüsü', en: 'Step by Step: A Tester\'s Claude Loop' },
  steps: [
    { id: 1, icon: '📥', label: { tr: 'Bağlam ver', en: 'Provide context' }, detail: { tr: 'User story, kabul kriterleri, kod parçası veya hata log\'u yapıştırılır — Claude senin projeni bilmez, bildiği tek şey o an verdiğindir.', en: 'Paste the user story, acceptance criteria, code snippet or error log — Claude does not know your project; it only knows what you give it right now.' } },
    { id: 2, icon: '🎯', label: { tr: 'Spesifik iste', en: 'Ask specifically' }, detail: { tr: 'Görev + çıktı formatı + kısıt birlikte istenir: "6 test case, tablo formatında, negatifler dahil". Belirsiz istek belirsiz cevap üretir.', en: 'Ask for task + output format + constraint together: "6 test cases, in a table, negatives included". A vague request produces a vague answer.' } },
    { id: 3, icon: '🔍', label: { tr: 'Doğrula', en: 'Verify' }, detail: { tr: 'Çıktı, kabul kriterleri ve domain bilginle satır satır karşılaştırılır — var olmayan metod, uydurulmuş kural veya eksik senaryo burada yakalanır.', en: 'Compare the output line by line against the acceptance criteria and your domain knowledge — nonexistent methods, invented rules and missing scenarios are caught here.' } },
    { id: 4, icon: '🔁', label: { tr: 'İterasyon yap', en: 'Iterate' }, detail: { tr: 'Eksik veya hatalı kısım Claude\'a açıkça söylenir: "TC04 kabul kriterinde yok, çıkar; boundary senaryosu ekle". Cevap tek seferde değil, konuşarak olgunlaşır.', en: 'Tell Claude explicitly what is missing or wrong: "TC04 is not in the acceptance criteria, remove it; add a boundary scenario". The answer matures through conversation, not in one shot.' } },
    { id: 5, icon: '💾', label: { tr: 'Kaydet & paylaş', en: 'Save & share' }, detail: { tr: 'İşe yarayan prompt bir şablona dönüştürülüp ekip prompt kütüphanesine eklenir — Java\'daki utility sınıfı gibi: bir kez yaz, herkes kullansın.', en: 'Turn the working prompt into a template and add it to the team prompt library — like a Java utility class: write once, everyone reuses it.' } },
  ],
}

const claudeWorkflowOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-daily-loop-order-01',
  question: { tr: 'Verimli bir Claude iş akışının adımlarını doğru sıraya diz.', en: 'Arrange the steps of an efficient Claude workflow in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Bağlamı ver (user story, kabul kriterleri, log)', en: 'Provide context (user story, acceptance criteria, log)' }, order: 1 },
    { id: '2', text: { tr: 'Spesifik görev + format + kısıt iste', en: 'Ask for a specific task + format + constraint' }, order: 2 },
    { id: '3', text: { tr: 'Çıktıyı kabul kriterlerine karşı doğrula', en: 'Verify the output against the acceptance criteria' }, order: 3 },
    { id: '4', text: { tr: 'Eksikleri söyleyip iterasyon yap', en: 'Point out gaps and iterate' }, order: 4 },
    { id: '5', text: { tr: 'İşe yarayan prompt\'u şablonlaştırıp paylaş', en: 'Turn the working prompt into a template and share it' }, order: 5 },
  ],
  xpReward: 10,
}

const promptIterationAnimation = {
  type: 'step-animation',
  id: 'claude-prompt-iteration-step-01',
  title: { tr: 'Adım Adım: Zayıf Prompt Nasıl Güçlenir?', en: 'Step by Step: How a Weak Prompt Gets Strong' },
  steps: [
    { id: 1, icon: '💬', label: { tr: 'Zayıf başlangıç', en: 'Weak start' }, detail: { tr: '"Login için test yaz" gönderilir; cevap herkese uyan, projene uymayan 3 jenerik maddedir.', en: '"Write tests for login" is sent; the answer is 3 generic bullets that fit everyone and match no project.' } },
    { id: 2, icon: '🎭', label: { tr: 'Rol ekle', en: 'Add a role' }, detail: { tr: '"Sen kıdemli bir QA mühendisisin" eklenir — cevap dili teknikleşir, severity/önceliklendirme gibi kavramlar görünmeye başlar.', en: '"You are a senior QA engineer" is added — the answer language turns technical; concepts like severity and prioritization start appearing.' } },
    { id: 3, icon: '📋', label: { tr: 'Bağlamı yapıştır', en: 'Paste the context' }, detail: { tr: 'Kabul kriterleri prompt\'a eklenir — cevap artık SENİN kilitlenme kuralını test ediyor, hayal ürünü bir formu değil.', en: 'The acceptance criteria are added to the prompt — the answer now tests YOUR lockout rule, not an imaginary form.' } },
    { id: 4, icon: '📐', label: { tr: 'Format + kısıt ver', en: 'Give format + constraint' }, detail: { tr: '"6 test case, tablo: ID | Senaryo | Beklenen | Tip" istenir — çıktı test yönetim aracına kopyalanabilir hale gelir.', en: 'Ask for "6 test cases, table: ID | Scenario | Expected | Type" — the output becomes copy-ready for a test management tool.' } },
    { id: 5, icon: '🏆', label: { tr: 'Karşılaştır ve öğren', en: 'Compare and learn' }, detail: { tr: 'İlk ve son cevap yan yana konur: soru aynıydı, değişen tek şey prompt\'tu. Bu farkı bir kez GÖREN tester bir daha zayıf prompt yazmaz.', en: 'Put the first and last answers side by side: the question was the same; the only thing that changed was the prompt. A tester who SEES this difference once never writes a weak prompt again.' } },
  ],
}

const promptLabBlock = {
  type: 'claude-prompt-lab',
  missions: [
    { id: 'send-first', text: { tr: 'İlk prompt\'unu gönder — ne yazarsan yaz, simüle Claude cevap versin', en: 'Send your first prompt — whatever you write, let simulated Claude answer' } },
    { id: 'add-role', text: { tr: 'Prompt\'una bir rol ekle ("Sen kıdemli bir QA mühendisisin...") ve tekrar gönder', en: 'Add a role to your prompt ("You are a senior QA engineer...") and resend' } },
    { id: 'add-format', text: { tr: 'Çıktı formatı iste (tablo, Gherkin veya madde listesi) — cevabın yapısının değiştiğini gör', en: 'Request an output format (table, Gherkin or bullet list) — watch the answer structure change' } },
    { id: 'add-negative', text: { tr: 'Negatif / sınır değer senaryoları talep et — kilitlenme kuralının cevaba girdiğini gör', en: 'Request negative / boundary scenarios — see the lockout rule enter the answer' } },
    { id: 'full-house', text: { tr: '5/5 prompt gücüne ulaş: rol + bağlam + format + negatif talep + sayısal kısıt aynı prompt\'ta', en: 'Reach 5/5 prompt strength: role + context + format + negative request + numeric constraint in one prompt' } },
  ],
}

const promptFixOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-prompt-fix-order-01',
  question: { tr: 'Claude\'dan jenerik bir cevap aldın. İyileştirme adımlarını doğru sıraya diz.', en: 'You got a generic answer from Claude. Arrange the improvement steps in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Cevabı oku, neyin eksik olduğunu not et (senaryoya özgü mü, format var mı?)', en: 'Read the answer and note what is missing (is it scenario-specific, is there a format?)' }, order: 1 },
    { id: '2', text: { tr: 'Prompt\'a rol ekle: "Sen kıdemli bir QA mühendisisin"', en: 'Add a role to the prompt: "You are a senior QA engineer"' }, order: 2 },
    { id: '3', text: { tr: 'Senaryonun kabul kriterlerini prompt\'a yapıştır', en: 'Paste the scenario\'s acceptance criteria into the prompt' }, order: 3 },
    { id: '4', text: { tr: 'Çıktı formatı ve sayısal kısıt belirt (tablo, 6 adet)', en: 'Specify output format and a numeric constraint (table, 6 cases)' }, order: 4 },
    { id: '5', text: { tr: 'Yeniden gönder ve iki cevabı yan yana karşılaştır', en: 'Resend and compare the two answers side by side' }, order: 5 },
  ],
  xpReward: 10,
}

const promptRewritePlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-prompt-rewrite-practice',
  id: 'claude-prompt-rewrite-practice',
  label: { tr: 'Pratik: Zayıf prompt\'u 4 bileşenle yeniden yaz', en: 'Practice: Rewrite the weak prompt with the 4 ingredients' },
  language: 'text',
  task: {
    tr: 'Amaç: "Login için test yaz" gibi zayıf bir prompt\'u; rol, bağlam, format ve kısıt içeren profesyonel bir prompt\'a dönüştürmek. Bu dönüşüm, Prompt Lab\'da yaşadığın 0/5 → 5/5 farkının yazılı halidir.',
    en: 'Goal: transform a weak prompt like "Write tests for login" into a professional prompt containing role, context, format and constraint. This transformation is the written form of the 0/5 → 5/5 difference you experienced in the Prompt Lab.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: 1. satıra rol, 2. satıra kabul kriterleri bağlamı, son satıra format + sayısal kısıt gelecek.',
    en: 'Fill in the TODO lines: line 1 gets the role, line 2 gets the acceptance-criteria context, the last line gets format + numeric constraint.',
  },
  code: {
    tr: `TODO (rol)
TODO (bağlam: kabul kriterleri)
Login özelliği için test case yaz.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (context: acceptance criteria)
Write test cases for the login feature.
TODO (format + constraint)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (bağlam: kabul kriterleri)
Login özelliği için test case yaz.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (context: acceptance criteria)
Write test cases for the login feature.
TODO (format + constraint)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Kabul kriterleri: geçerli e-posta + şifre girişte dashboard açılır; hatalı bilgide "Hatalı bilgi" mesajı gösterilir; 5 hatalı denemede hesap kilitlenir.
Login özelliği için negatif ve sınır değer senaryoları dahil test case yaz.
Çıktı: 6 adet test case, tablo formatında: ID | Senaryo | Beklenen Sonuç | Tip.`,
    en: `You are a senior QA engineer.
Acceptance criteria: valid email + password opens the dashboard; invalid credentials show an "Invalid credentials" message; the account locks after 5 failed attempts.
Write test cases for the login feature, including negative and boundary scenarios.
Output: 6 test cases in table format: ID | Scenario | Expected Result | Type.`,
  },
  expected: {
    tr: `Prompt artık 4 bileşeni de taşıyor: rol (kıdemli QA), bağlam (3 kabul kriteri), görev (negatif + sınır dahil test case) ve format + kısıt (6 adet, tablo).
Simüle Claude bu prompt'a 5/5 kademesinde, kilitlenme kuralını isabetle test eden bir tablo döndürür.`,
    en: `The prompt now carries all 4 ingredients: role (senior QA), context (3 acceptance criteria), task (test cases incl. negative + boundary) and format + constraint (6 cases, table).
Simulated Claude answers this prompt at the 5/5 tier with a table that accurately tests the lockout rule.`,
  },
  hints: [
    { tr: 'Rol satırı cevabın bakış açısını belirler: "Sen kıdemli bir QA mühendisisin."', en: 'The role line sets the answer\'s perspective: "You are a senior QA engineer."' },
    { tr: 'Bağlam satırına senaryonun 3 kabul kriterini kendi cümlelerinle yapıştır — Claude senin kilitlenme kuralını ancak böyle öğrenir.', en: 'Paste the scenario\'s 3 acceptance criteria into the context line in your own words — that is the only way Claude learns your lockout rule.' },
    { tr: 'Son satır ölçülebilir olmalı: kaç adet istiyorsun, hangi sütunlarla?', en: 'The last line must be measurable: how many cases do you want, with which columns?' },
  ],
  xpReward: 15,
}

const qaAssistantCallout = {
  type: 'callout',
  icon: '🤖',
  content: {
    tr: 'Buradaki Claude cevapları deterministik bir simülasyondur (gerçek API çağrısı yok). Öğrendiğin prompt tekniklerini GERÇEK bir yapay zekaya karşı denemek istersen, üye girişiyle /qa-assistant sayfasındaki AI QA asistanını kullanabilirsin.',
    en: 'The Claude answers here are a deterministic simulation (no real API call). If you want to try the prompt techniques you learned against a REAL AI, sign in and use the AI QA assistant on the /qa-assistant page.',
  },
}

// ─── CS2 paylaşılan bloklar: Erişim & Kurulum ────────────────────────────────

const claudeCliInstallStepAnimation = {
  type: 'step-animation',
  id: 'claude-cli-install-step-01',
  title: { tr: 'Adım Adım: Claude Code Kurulumu', en: 'Step by Step: Installing Claude Code' },
  steps: [
    { id: 1, icon: '🔍', label: { tr: 'Ön koşulu kontrol et', en: 'Check the prerequisite' }, detail: { tr: 'node -v ile Node.js sürümü doğrulanır — Claude Code CLI\'ın çalışması için modern bir Node runtime gerekir.', en: 'Verify the Node.js version with node -v — Claude Code CLI needs a modern Node runtime to run.' } },
    { id: 2, icon: '📦', label: { tr: 'Global kur', en: 'Install globally' }, detail: { tr: 'npm install -g @anthropic-ai/claude-code CLI\'ı bir kez indirir; sonrasında her proje klasöründe kullanılabilir.', en: 'npm install -g @anthropic-ai/claude-code downloads the CLI once; it becomes available in every project folder afterward.' } },
    { id: 3, icon: '🔑', label: { tr: 'Yetkilendir', en: 'Authenticate' }, detail: { tr: 'claude ilk çalıştırıldığında bir giriş/API key adımı ister; kimlik bilgileri yerelde saklanır, asla proje klasörüne yazılmaz.', en: 'The first run of claude asks for a login/API key step; credentials are stored locally, never written into your project folder.' } },
    { id: 4, icon: '📂', label: { tr: 'Proje içinde çalıştır', en: 'Run inside a project' }, detail: { tr: 'Bir repository\'ye cd\'lenip claude çalıştırılır — klasördeki dosyaları, yapıştırılan bir kod parçası gibi bağlam olarak okur.', en: 'cd into a repository and run claude — it reads the folder\'s files as context, the same way it would read a pasted snippet.' } },
    { id: 5, icon: '✅', label: { tr: 'Doğrula', en: 'Verify' }, detail: { tr: 'claude --version hatasız bir sürüm numarası döndürür — Node kurulumundan sonra node -v çalıştırmakla aynı disiplin.', en: 'claude --version returns a version number with no error — the same discipline as running node -v right after installing Node.' } },
  ],
}

const claudeCliInstallOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-cli-install-order-01',
  question: { tr: 'Claude Code CLI kurulum adımlarını doğru sıraya diz.', en: 'Arrange the Claude Code CLI installation steps in the correct order.' },
  items: [
    { id: '1', text: { tr: 'node -v ile Node.js sürümünü kontrol et', en: 'Check the Node.js version with node -v' }, order: 1 },
    { id: '2', text: { tr: 'npm install -g @anthropic-ai/claude-code komutunu çalıştır', en: 'Run npm install -g @anthropic-ai/claude-code' }, order: 2 },
    { id: '3', text: { tr: 'claude\'u ilk çalıştırışında yetkilendirme adımını tamamla', en: 'Complete the authentication step on the first run of claude' }, order: 3 },
    { id: '4', text: { tr: 'Bir proje klasörüne cd\'lenip claude\'u başlat', en: 'cd into a project folder and start claude' }, order: 4 },
    { id: '5', text: { tr: 'claude --version ile kurulumu doğrula', en: 'Verify the install with claude --version' }, order: 5 },
  ],
  xpReward: 10,
}

const claudeInstallTroubleshootPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-install-troubleshoot-practice',
  id: 'claude-install-troubleshoot-practice',
  label: { tr: 'Pratik: Kurulum hatasını Claude\'un gerçekten çözebileceği bir prompt\'a dönüştür', en: 'Practice: Turn an install error into a prompt Claude can actually solve' },
  language: 'text',
  task: {
    tr: 'Amaç: "Kurulum çalışmadı, yardım et" gibi belirsiz bir prompt\'u; işletim sistemi, tam hata metni ve Node sürümü içeren, gerçekten çözülebilir bir prompt\'a dönüştürmek.',
    en: 'Goal: turn a vague prompt like "The install did not work, please help" into a genuinely solvable prompt containing the operating system, the exact error text and the Node version.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: işletim sistemi, tam hata mesajı ve node -v çıktısı.',
    en: 'Fill in the TODO lines: operating system, exact error message, and node -v output.',
  },
  code: {
    tr: `TODO (işletim sistemi)
TODO (tam hata mesajı)
TODO (node -v çıktısı)
Kurulum çalışmadı, yardım et.`,
    en: `TODO (operating system)
TODO (exact error message)
TODO (node -v output)
The install did not work, please help.`,
  },
  starterCode: {
    tr: `TODO (işletim sistemi)
TODO (tam hata mesajı)
TODO (node -v çıktısı)
Kurulum çalışmadı, yardım et.`,
    en: `TODO (operating system)
TODO (exact error message)
TODO (node -v output)
The install did not work, please help.`,
  },
  solutionCode: {
    tr: `İşletim sistemim: macOS 14 (Apple Silicon).
Şu hatayı alıyorum: "npm ERR! code EACCES: permission denied".
node -v çıktım: v20.11.0.
npm install -g @anthropic-ai/claude-code komutunu çalıştırdım. Bu EACCES hatasının kök nedenini ve sudo kullanmadan çözecek bir yolu (örneğin nvm) adım adım anlat.`,
    en: `My operating system: macOS 14 (Apple Silicon).
I am getting this error: "npm ERR! code EACCES: permission denied".
My node -v output: v20.11.0.
I ran npm install -g @anthropic-ai/claude-code. Explain the root cause of this EACCES error and a step-by-step fix that avoids sudo (e.g. nvm).`,
  },
  expected: {
    tr: `Prompt artık işletim sistemi, tam hata metni ve Node sürümünü taşıyor — Claude artık "genel bir kurulum tavsiyesi" yerine SENİN EACCES hatana özgü, doğrulanabilir bir çözüm (nvm kurulumu veya npm prefix değişikliği) önerebilir.`,
    en: `The prompt now carries the OS, the exact error text and the Node version — Claude can now propose a verifiable fix specific to YOUR EACCES error (installing nvm or changing the npm prefix) instead of generic install advice.`,
  },
  hints: [
    { tr: 'İşletim sistemini belirtmeden "kurulum hata verdi" demek, Windows\'a özgü bir PATH sorunuyla macOS\'a özgü bir izin sorununu ayırt edilemez hale getirir.', en: 'Saying "the install failed" without naming the OS makes a Windows-specific PATH issue indistinguishable from a macOS-specific permission issue.' },
    { tr: 'Hata mesajını TAM olarak (kod dahil, örn. EACCES) yapıştır — parafraze edilmiş bir hata Claude\'un doğru tanıyı koymasını zorlaştırır.', en: 'Paste the error message EXACTLY (including the code, e.g. EACCES) — a paraphrased error makes it harder for Claude to pin down the right diagnosis.' },
    { tr: 'node -v çıktısı, önerilen çözümün senin Node sürümünle uyumlu olup olmadığını belirler.', en: 'The node -v output determines whether the suggested fix is compatible with your Node version.' },
  ],
  xpReward: 15,
}

// ─── CS2 paylaşılan bloklar: Test Case Üretimi ───────────────────────────────

const promptLabCrossCallout = {
  type: 'callout',
  icon: '🧪',
  content: {
    tr: 'Prompt Mühendisliği sekmesindeki Prompt Lab\'da öğrendiğin 4 bileşeni burada da kullan: rol = "kıdemli QA mühendisi", bağlam = user story + kabul kriterleri, format = "Gherkin", kısıt = "sadece onaylanmış kurallara dayan".',
    en: 'Reuse the 4 ingredients you learned in the Prompt Lab on the Prompt Engineering tab: role = "senior QA engineer", context = user story + acceptance criteria, format = "Gherkin", constraint = "base it only on confirmed rules".',
  },
}

const testCaseFromStoryAnimation = {
  type: 'step-animation',
  id: 'claude-testcase-story-step-01',
  title: { tr: 'Adım Adım: User Story\'den Gherkin\'e', en: 'Step by Step: From User Story to Gherkin' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Story\'yi yapıştır', en: 'Paste the story' }, detail: { tr: 'User story ve kabul kriterleri prompt\'a bağlam olarak yapıştırılır.', en: 'The user story and acceptance criteria are pasted into the prompt as context.' } },
    { id: 2, icon: '❓', label: { tr: 'Önce belirsizlikleri sordur', en: 'Ask for gaps first' }, detail: { tr: 'Test yazmadan önce Claude\'a story\'deki belirsiz veya eksik HER kuralı listelettirilir.', en: 'Before writing any test, Claude is asked to list every rule in the story that is unclear or missing.' } },
    { id: 3, icon: '🤝', label: { tr: 'Ekiple çöz', en: 'Resolve with your team' }, detail: { tr: 'Gerçek belirsizlikler PO/ekiple netleştirilir — Claude\'un uydurduğu bir varsayımla değil.', en: 'Real ambiguities are resolved with the PO/team — not with an assumption Claude invented.' } },
    { id: 4, icon: '🥒', label: { tr: 'Gherkin\'de üret', en: 'Generate in Gherkin' }, detail: { tr: 'SADECE onaylanmış kurallara dayanan N adet Given/When/Then senaryosu istenir.', en: 'N Given/When/Then scenarios are requested, based ONLY on the confirmed rules.' } },
    { id: 5, icon: '🔍', label: { tr: 'Oracle olarak incele', en: 'Review as the oracle' }, detail: { tr: 'Her senaryo, kabul kriterleri listesine karşı SEN tarafından kontrol edilir — akıcı Gherkin sözdizimi kapsamın doğru olduğunun kanıtı değildir.', en: 'Each scenario is checked by YOU against the acceptance criteria checklist — fluent Gherkin syntax is not proof that the coverage is correct.' } },
  ],
}

const testCaseGherkinOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-testcase-gherkin-order-01',
  question: { tr: 'User story\'den güvenilir Gherkin senaryosu üretme akışını doğru sıraya diz.', en: 'Arrange the flow for generating reliable Gherkin scenarios from a user story in the correct order.' },
  items: [
    { id: '1', text: { tr: 'User story + kabul kriterlerini bağlam olarak yapıştır', en: 'Paste the user story + acceptance criteria as context' }, order: 1 },
    { id: '2', text: { tr: 'Claude\'dan önce belirsizlikleri listelemesini iste', en: 'Ask Claude to list ambiguities first' }, order: 2 },
    { id: '3', text: { tr: 'Belirsizlikleri PO/ekiple netleştir', en: 'Clarify the ambiguities with the PO/team' }, order: 3 },
    { id: '4', text: { tr: 'Onaylanmış kurallara dayanan Gherkin senaryoları iste', en: 'Ask for Gherkin scenarios based on the confirmed rules' }, order: 4 },
    { id: '5', text: { tr: 'Her senaryoyu kabul kriterlerine karşı kendin doğrula', en: 'Verify each scenario against the acceptance criteria yourself' }, order: 5 },
  ],
  xpReward: 10,
}

const testCasePlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-testcase-gherkin-practice',
  id: 'claude-testcase-gherkin-practice',
  label: { tr: 'Pratik: Belirsizlik-önce tekniğiyle Gherkin prompt\'u yaz', en: 'Practice: Write a Gherkin prompt using the ambiguity-first technique' },
  language: 'text',
  task: {
    tr: 'Amaç: Doğrudan test yazdırmak yerine, önce belirsizlikleri sordurup sonra sadece onaylanmış kurallara dayanan Gherkin senaryoları isteyen iki aşamalı bir prompt kurmak.',
    en: 'Goal: build a two-phase prompt that asks for ambiguities first, instead of generating tests directly, then requests Gherkin scenarios based only on the confirmed rules.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: rol, "önce belirsizlikleri listelet" talimatı, format + kısıt.',
    en: 'Fill in the TODO lines: role, the "list ambiguities first" instruction, format + constraint.',
  },
  code: {
    tr: `TODO (rol)
TODO (önce belirsizlikleri listelet)
Kayıt ol özelliği için Gherkin senaryosu yaz.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (ask for ambiguities first)
Write a Gherkin scenario for the sign-up feature.
TODO (format + constraint)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (önce belirsizlikleri listelet)
Kayıt ol özelliği için Gherkin senaryosu yaz.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (ask for ambiguities first)
Write a Gherkin scenario for the sign-up feature.
TODO (format + constraint)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Önce, aşağıdaki user story ve kabul kriterlerinde belirsiz veya eksik olan HER kuralı listele; henüz test yazma.
Kayıt ol özelliği: [user story + kabul kriterleri buraya yapıştırılır].
Belirsizlikleri onayladıktan sonra, SADECE onaylanmış kurallara dayanarak 5 adet Gherkin senaryosu yaz (Given/When/Then), negatif senaryo dahil.`,
    en: `You are a senior QA engineer.
First, list every rule in the user story and acceptance criteria below that is ambiguous or missing; do not write tests yet.
Sign-up feature: [paste the user story + acceptance criteria here].
Once ambiguities are confirmed, write 5 Gherkin scenarios (Given/When/Then) based ONLY on the confirmed rules, including one negative scenario.`,
  },
  expected: {
    tr: `Prompt artık iki aşamalı: önce belirsizlik listesi (oracle boşluğunu SANA sordurur), sonra sadece onaylanmış kurallara dayanan Gherkin üretimi. Bu sıralama, Claude'un sessizce varsayım uydurmasını engeller.`,
    en: `The prompt is now two-phase: first a list of ambiguities (forces the oracle gap back to YOU), then Gherkin generation based only on confirmed rules. This ordering prevents Claude from silently inventing assumptions.`,
  },
  hints: [
    { tr: '"Önce belirsizlikleri listele, sonra yaz" sırası, Claude\'un rastgele bir varsayımla devam etmesini engeller.', en: 'The "list ambiguities first, then write" order stops Claude from continuing with a random assumption.' },
    { tr: '"SADECE onaylanmış kurallara dayanarak" ifadesi, modelin eğitim verisinden gelen jenerik bir login/kayıt kalıbını sızdırmasını engeller.', en: 'The phrase "ONLY based on confirmed rules" blocks the model from leaking a generic login/signup pattern from its training data.' },
    { tr: 'Negatif senaryo talebi olmadan Claude çoğunlukla sadece mutlu yol (happy path) senaryosu üretir.', en: 'Without explicitly requesting a negative scenario, Claude mostly produces only the happy-path case.' },
  ],
  xpReward: 15,
}

// ─── CS2 paylaşılan bloklar: Bug Analizi & Rapor ─────────────────────────────

const bugAnalysisAnimation = {
  type: 'step-animation',
  id: 'claude-bug-analysis-step-01',
  title: { tr: 'Adım Adım: Log\'dan Bug Raporuna', en: 'Step by Step: From Log to Bug Report' },
  steps: [
    { id: 1, icon: '🧼', label: { tr: 'Önce temizle', en: 'Sanitize first' }, detail: { tr: 'Hiçbir şey yapıştırmadan önce log\'daki e-posta, token, IP ve müşteri adları temizlenir.', en: 'Before pasting anything, emails, tokens, IPs and customer names are removed from the log.' } },
    { id: 2, icon: '📊', label: { tr: 'Flaky test için birden fazla koşum yapıştır', en: 'Paste multiple runs for flaky bugs' }, detail: { tr: 'Tek bir başarısızlık log\'u rastgele görünür; aynı flaky testin 3-5 koşumu bir ÖRÜNTÜ ortaya çıkarır.', en: 'One failure log looks random; 3-5 logs from the same flaky test reveal a PATTERN.' } },
    { id: 3, icon: '🧠', label: { tr: 'Olasılık sıralı hipotez iste', en: 'Ask for ranked hypotheses' }, detail: { tr: 'Tek bir "kesin neden" yerine, olasılığa göre sıralanmış kök neden hipotezleri gerekçeleriyle istenir.', en: 'Instead of a single "definite cause", root-cause hypotheses ordered by likelihood are requested, each with reasoning.' } },
    { id: 4, icon: '🧾', label: { tr: 'Raporu taslakla', en: 'Draft the report' }, detail: { tr: 'Önerilen bir severity/priority VE gerekçesiyle birlikte yapılandırılmış bir bug raporu istenir.', en: 'A structured bug report is requested with a suggested severity/priority AND its justification.' } },
    { id: 5, icon: '✅', label: { tr: 'Göndermeden önce doğrula', en: 'Confirm before filing' }, detail: { tr: 'En olası hipotez sen tarafından tekrar üretilir; nihai severity gerçek iş etkisine göre SEN tarafından belirlenir.', en: 'The top hypothesis is reproduced by YOU; the final severity is set by YOU based on real business impact.' } },
  ],
}

const bugAnalysisOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-bug-analysis-order-01',
  question: { tr: 'Ham bir hatadan güvenli bir bug raporuna giden akışı doğru sıraya diz.', en: 'Arrange the flow from a raw error to a safe bug report in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Log\'daki hassas veriyi (e-posta, token, IP) temizle', en: 'Scrub sensitive data (email, token, IP) from the log' }, order: 1 },
    { id: '2', text: { tr: 'Flaky testse birden fazla koşumun log\'unu birlikte yapıştır', en: 'If it is flaky, paste multiple runs\' logs together' }, order: 2 },
    { id: '3', text: { tr: 'Olasılık sırasına göre kök neden hipotezleri iste', en: 'Ask for root-cause hypotheses ordered by likelihood' }, order: 3 },
    { id: '4', text: { tr: 'Gerekçeli severity/priority önerisiyle rapor taslağı iste', en: 'Ask for a report draft with a justified severity/priority suggestion' }, order: 4 },
    { id: '5', text: { tr: 'En olası nedeni kendin tekrar üretip nihai severity\'yi sen belirle', en: 'Reproduce the top cause yourself and set the final severity' }, order: 5 },
  ],
  xpReward: 10,
}

const bugReportPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-bug-report-practice',
  id: 'claude-bug-report-practice',
  label: { tr: 'Pratik: Temizlenmiş log\'dan profesyonel bug raporu prompt\'u kur', en: 'Practice: Build a professional bug report prompt from a sanitized log' },
  language: 'text',
  task: {
    tr: 'Amaç: "Bug raporu yaz" gibi belirsiz bir isteği; temizlenmiş log, gerekçeli severity/priority talebi ve net format içeren bir prompt\'a dönüştürmek.',
    en: 'Goal: turn a vague request like "Write a bug report" into a prompt containing a sanitized log, a justified severity/priority request and a clear format.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: rol, temizlenmiş log, format + severity/priority talebi.',
    en: 'Fill in the TODO lines: role, sanitized log, format + severity/priority request.',
  },
  code: {
    tr: `TODO (rol)
TODO (temizlenmiş log/stack trace)
Bug raporu yaz.
TODO (format + severity/priority talebi)`,
    en: `TODO (role)
TODO (sanitized log/stack trace)
Write a bug report.
TODO (format + severity/priority request)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (temizlenmiş log/stack trace)
Bug raporu yaz.
TODO (format + severity/priority talebi)`,
    en: `TODO (role)
TODO (sanitized log/stack trace)
Write a bug report.
TODO (format + severity/priority request)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Log (hassas veri temizlendi): [ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42, 3 farklı ortamda tekrarlanıyor.
Bu log için önce olası kök nedenleri olasılık sırasına göre listele, sonra severity/priority önerisi VE gerekçesiyle birlikte yapılandırılmış bir bug raporu yaz: Başlık | Adımlar | Beklenen | Gerçekleşen | Önerilen Severity/Priority.`,
    en: `You are a senior QA engineer.
Log (sensitive data scrubbed): [ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42, reproducing across 3 environments.
For this log, first list likely root causes ordered by probability, then write a structured bug report with a suggested severity/priority AND its justification: Title | Steps | Expected | Actual | Suggested Severity/Priority.`,
  },
  expected: {
    tr: `Log temizlenmiş halde yapıştırıldı, rol ve format+severity talebi eklendi. Claude artık hem olası nedenleri hem de gerekçeli bir severity önerisi içeren, doğrudan bug tracker'a kopyalanabilir bir rapor üretir — son onay hâlâ sende.`,
    en: `The log is pasted scrubbed, with a role and a format+severity request added. Claude now produces a copy-ready report with ranked causes and a justified severity suggestion — the final call is still yours.`,
  },
  hints: [
    { tr: 'Log\'u yapıştırmadan önce e-posta ve token gibi hassas alanları <REDACTED> ile değiştir — bu adım prompt kalitesinden önce gelir.', en: 'Replace sensitive fields like email and token with <REDACTED> before pasting the log — this step comes before prompt quality.' },
    { tr: '"Severity/priority öner VE gerekçesini yaz" istemek, çıplak bir "S1" etiketi yerine değerlendirebileceğin bir akıl yürütme getirir.', en: 'Asking to "suggest severity/priority AND write the justification" gets you reasoning you can evaluate, not a bare "S1" label.' },
    { tr: '3 farklı ortamda tekrarlandığını belirtmek, Claude\'un "tek seferlik hata" yerine "sistemik sorun" ihtimalini de değerlendirmesini sağlar.', en: 'Mentioning it reproduces across 3 environments lets Claude also weigh a "systemic issue" possibility instead of just a "one-off glitch".' },
  ],
  xpReward: 15,
}

// ─── CS2 paylaşılan bloklar: Test Verisi Üretimi ─────────────────────────────

const testDataAnimation = {
  type: 'step-animation',
  id: 'claude-testdata-step-01',
  title: { tr: 'Adım Adım: Sınır Değerden Test Verisine', en: 'Step by Step: From Boundary Rule to Test Data' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Sınıfları isimlendir', en: 'Name the classes' }, detail: { tr: 'Geçerli/geçersiz equivalence class\'lar ve tam sınır sayıları prompt\'ta açıkça belirtilir.', en: 'Valid/invalid equivalence classes and the exact boundary numbers are stated explicitly in the prompt.' } },
    { id: 2, icon: '🤖', label: { tr: 'Claude\'a tasarlat', en: 'Ask Claude to design' }, detail: { tr: 'Rastgele bir sayı yığını yerine, her sınıftan bir temsilci değer istenir.', en: 'Instead of a random pile of numbers, one representative value per class is requested.' } },
    { id: 3, icon: '📐', label: { tr: 'Çıktı formatını seç', en: 'Pick the output format' }, detail: { tr: 'JSON, CSV veya SQL INSERT belirtilir — sonuç doğrudan ihtiyacın olan yere düşer.', en: 'JSON, CSV or SQL INSERT is specified — the result drops directly where you need it.' } },
    { id: 4, icon: '🔍', label: { tr: 'Gerçek kişisel veri var mı kontrol et', en: 'Check for real PII' }, detail: { tr: 'Çıktı taranır: her değer format olarak geçerli ama açıkça kurgusal mı?', en: 'The output is scanned: is every value format-valid but clearly fake?' } },
    { id: 5, icon: '⚡', label: { tr: 'Hacim için Faker, tasarım için Claude', en: 'Faker for volume, Claude for design' }, detail: { tr: 'Sınıflar onaylandıktan sonra hacimli/CI versiyonu Faker ile üretilir; Claude tek seferlik tasarım kararları için kalır.', en: 'Once the classes are confirmed, the bulk/CI version is generated with Faker; Claude stays for one-off design decisions.' } },
  ],
}

const testDataOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-testdata-order-01',
  question: { tr: 'Bir kuraldan güvenli, sınır-değerli test verisine giden akışı doğru sıraya diz.', en: 'Arrange the flow from a business rule to safe, boundary-aware test data in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Geçerli/geçersiz sınıfları ve tam sınır sayılarını belirt', en: 'State the valid/invalid classes and the exact boundary numbers' }, order: 1 },
    { id: '2', text: { tr: 'Her sınıftan bir temsilci değer üretmesini iste', en: 'Ask for one representative value per class' }, order: 2 },
    { id: '3', text: { tr: 'Çıktı formatını belirt (JSON, CSV veya SQL INSERT)', en: 'Specify the output format (JSON, CSV or SQL INSERT)' }, order: 3 },
    { id: '4', text: { tr: 'Üretilen verinin gerçek bir kişiye ait olmadığını doğrula', en: 'Verify the generated data does not belong to a real person' }, order: 4 },
    { id: '5', text: { tr: 'Hacimli/CI versiyonu için Faker\'a geç', en: 'Switch to Faker for the bulk/CI version' }, order: 5 },
  ],
  xpReward: 10,
}

const testDataPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-testdata-boundary-practice',
  id: 'claude-testdata-boundary-practice',
  label: { tr: 'Pratik: Sınır değer kuralını test verisi prompt\'una dönüştür', en: 'Practice: Turn a boundary rule into a test data prompt' },
  language: 'text',
  task: {
    tr: 'Amaç: "Yaş alanı için test verisi üret" gibi belirsiz bir isteği; sayısal kuralı, sınır değerleri ve çıktı formatını içeren bir prompt\'a dönüştürmek.',
    en: 'Goal: turn a vague request like "Generate test data for the age field" into a prompt containing the numeric rule, the boundary values and the output format.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: rol, sınır değerleri ve equivalence class\'lar, format + kısıt.',
    en: 'Fill in the TODO lines: role, boundary values and equivalence classes, format + constraint.',
  },
  code: {
    tr: `TODO (rol)
TODO (sınır değerleri ve equivalence class'lar)
Yaş alanı için test verisi üret.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (boundary values and equivalence classes)
Generate test data for the age field.
TODO (format + constraint)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (sınır değerleri ve equivalence class'lar)
Yaş alanı için test verisi üret.
TODO (format + kısıt)`,
    en: `TODO (role)
TODO (boundary values and equivalence classes)
Generate test data for the age field.
TODO (format + constraint)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Kural: yaş alanı 18-65 arası geçerlidir, 18'in altı ve 65'in üstü geçersizdir.
Bu alan için sınır değerleri (17, 18, 65, 66) ve geçerli sınıfın ortasını (örn. 40) kapsayan test verisi üret; hiçbir değer gerçek bir kişiye ait olmasın, tamamen kurgusal olsun.
Çıktı: SQL INSERT formatında, her satırda beklenen sonuç (KABUL/REDDEDILDI) sütunuyla.`,
    en: `You are a senior QA engineer.
Rule: the age field is valid between 18-65, invalid below 18 and above 65.
Generate test data for this field covering the boundary values (17, 18, 65, 66) and the middle of the valid class (e.g. 40); no value should belong to a real person, all must be entirely fictional.
Output: SQL INSERT format, with an expected-result column (ACCEPTED/REJECTED) on each row.`,
  },
  expected: {
    tr: `Prompt artık kuralı, sınır değerlerini ve çıktı formatını taşıyor. Claude, tahmin etmeden tam olarak istenen 5 satırlık sınır değer setini SQL INSERT formatında üretir — çıktı doğrudan test veritabanına çalıştırılabilir.`,
    en: `The prompt now carries the rule, the boundary values and the output format. Claude generates exactly the requested 5-row boundary set in SQL INSERT format without guessing — ready to run directly against a test database.`,
  },
  hints: [
    { tr: 'Kuralı sayısal olarak vermeden ("yaş alanı için veri üret" demek) Claude hangi sınırların önemli olduğunu tahmin etmek zorunda kalır.', en: 'Without giving the rule as numbers (just saying "generate data for the age field"), Claude has to guess which boundaries matter.' },
    { tr: '"Hiçbir değer gerçek bir kişiye ait olmasın" talimatı, üretilen verinin kazara gerçek görünen ama aslında rastgele olmayan bir formatta çıkmasını engeller.', en: 'The instruction "no value should belong to a real person" prevents the generated data from accidentally looking like a real, non-random record.' },
    { tr: 'Çıktı formatını (SQL INSERT) belirtmezsen, sonucu elle veritabanına uygun hale getirmen gerekir.', en: 'If you don\'t specify the output format (SQL INSERT), you\'ll have to manually reshape the result to fit your database.' },
  ],
  xpReward: 15,
}

// ─── CS3 paylaşılan bloklar: UI Otomasyonu ───────────────────────────────────

const uiFixLoopAnimation = {
  type: 'step-animation',
  id: 'claude-ui-fix-loop-step-01',
  title: { tr: 'Adım Adım: Kırık Testten Doğrulanmış Düzeltmeye', en: 'Step by Step: From Broken Test to Verified Fix' },
  steps: [
    { id: 1, icon: '📋', label: { tr: 'Tam hatayı yapıştır', en: 'Paste the exact failure' }, detail: { tr: 'Hatanın açıklaması değil, gerçek hata mesajı/stack trace ve mevcut locator/kod yapıştırılır.', en: 'Not a description of the bug, but the actual error message/stack trace and the current locator/code are pasted.' } },
    { id: 2, icon: '🧠', label: { tr: 'Gerekçeli düzeltme iste', en: 'Ask for a reasoned fix' }, detail: { tr: 'Sadece yeni bir selector tahmini değil, neden kırıldığının açıklamasıyla birlikte bir düzeltme istenir.', en: 'A fix is requested with an explanation of why it broke, not just a new selector guess.' } },
    { id: 3, icon: '▶️', label: { tr: 'Canlı sayfada çalıştır', en: 'Run it against the live page' }, detail: { tr: 'Düzeltme, güvenilmeden önce SEN tarafından gerçek sayfaya karşı çalıştırılır.', en: 'The fix is run against the real page by YOU before it is trusted.' } },
    { id: 4, icon: '🔁', label: { tr: 'Hâlâ kırıksa yeni hatayı yapıştır', en: 'If still broken, paste the new failure' }, detail: { tr: 'Claude\'un iki kez körlemesine tahmin etmesine izin verilmez — her koşumun gerçek çıktısı geri beslenir.', en: 'Claude is not allowed to guess blindly twice — the real output of each run is fed back.' } },
    { id: 5, icon: '🔍', label: { tr: 'Kararlılığı gözden geçir', en: 'Review for stability' }, detail: { tr: 'Yeşile dönünce, düzeltmenin kararlı bir nitelik mi yoksa başka bir kırılgan selector mü kullandığı kontrol edilir.', en: 'Once green, it is checked whether the fix used a stable attribute or another fragile selector.' } },
  ],
}

const uiFixLoopOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-ui-fix-loop-order-01',
  question: { tr: 'Kırık bir UI testini Claude ile güvenli şekilde düzeltme akışını doğru sıraya diz.', en: 'Arrange the flow for safely fixing a broken UI test with Claude in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Gerçek hata mesajını ve mevcut kodu yapıştır', en: 'Paste the real error message and the current code' }, order: 1 },
    { id: '2', text: { tr: 'Gerekçeli bir düzeltme iste', en: 'Ask for a fix with reasoning' }, order: 2 },
    { id: '3', text: { tr: 'Düzeltmeyi canlı sayfaya karşı kendin çalıştır', en: 'Run the fix against the live page yourself' }, order: 3 },
    { id: '4', text: { tr: 'Hâlâ kırıksa yeni hata çıktısını geri yapıştır', en: 'If still broken, paste the new error output back' }, order: 4 },
    { id: '5', text: { tr: 'Yeşil olunca kullanılan selector\'ın kararlılığını gözden geçir', en: 'Once green, review the stability of the selector used' }, order: 5 },
  ],
  xpReward: 10,
}

const uiLocatorFixPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-ui-locator-fix-practice',
  id: 'claude-ui-locator-fix-practice',
  label: { tr: 'Pratik: Kırık bir locator\'ı güvenli bir düzeltme prompt\'una dönüştür', en: 'Practice: Turn a broken locator into a safe fix prompt' },
  language: 'text',
  task: {
    tr: 'Amaç: "Bu test kırıldı, düzelt" gibi belirsiz bir isteği; tam hata mesajı, mevcut kod ve kararlı nitelik tercihi içeren bir prompt\'a dönüştürmek.',
    en: 'Goal: turn a vague request like "This test broke, fix it" into a prompt containing the exact error message, the current code and a preference for stable attributes.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: rol, tam hata mesajı + mevcut locator kodu, kararlı nitelik tercihi.',
    en: 'Fill in the TODO lines: role, exact error message + current locator code, stable-attribute preference.',
  },
  code: {
    tr: `TODO (rol)
TODO (tam hata mesajı + mevcut locator kodu)
Bu test kırıldı, düzelt.
TODO (kararlı nitelik tercihi)`,
    en: `TODO (role)
TODO (exact error message + current locator code)
This test broke, fix it.
TODO (stable-attribute preference)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (tam hata mesajı + mevcut locator kodu)
Bu test kırıldı, düzelt.
TODO (kararlı nitelik tercihi)`,
    en: `TODO (role)
TODO (exact error message + current locator code)
This test broke, fix it.
TODO (stable-attribute preference)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA otomasyon mühendisisin.
Hata: "NoSuchElementException: Unable to locate element: //div[3]/div[2]/button". Mevcut kod: driver.findElement(By.xpath("//div[3]/div[2]/button")).click();
Bu locator'ı düzelt; eğer sayfada data-testid veya aria-label gibi kararlı bir nitelik varsa onu kullan, yoksa bunun eksik olduğunu açıkça belirt, kırılgan bir XPath'i sessizce uydurma.`,
    en: `You are a senior QA automation engineer.
Error: "NoSuchElementException: Unable to locate element: //div[3]/div[2]/button". Current code: driver.findElement(By.xpath("//div[3]/div[2]/button")).click();
Fix this locator; if the page has a stable attribute like data-testid or aria-label, use it — if not, explicitly flag that gap instead of silently inventing another fragile XPath.`,
  },
  expected: {
    tr: `Prompt artık tam hatayı, mevcut kodu ve "kararlı nitelik yoksa söyle" talimatını taşıyor. Claude, çalışmayacağını bilmeden bir XPath tahmini uydurmak yerine, ya kararlı bir nitelik önerir ya da eksikliği açıkça bildirir.`,
    en: `The prompt now carries the exact error, the current code and the "flag it if no stable attribute exists" instruction. Instead of inventing another XPath guess it cannot verify, Claude either proposes a stable attribute or explicitly reports the gap.`,
  },
  hints: [
    { tr: 'Hatayı "kırıldı" diye özetlemek yerine tam exception mesajını yapıştırmak, Claude\'un DOM\'un nasıl değiştiğini tahmin etmesine yardımcı olur.', en: 'Pasting the exact exception message instead of summarizing it as "broke" helps Claude guess how the DOM actually changed.' },
    { tr: '"Kararlı nitelik yoksa söyle" talimatı olmadan Claude, çalışıp çalışmayacağını bilmediği başka bir kırılgan XPath uydurabilir.', en: 'Without the "flag it if no stable attribute exists" instruction, Claude may invent another fragile XPath it has no way of knowing will work.' },
    { tr: 'Üretilen düzeltmeyi çalıştırmadan güvenmek, bu sekmenin ana disiplin kuralını çiğnemektir.', en: 'Trusting the generated fix without running it violates this tab\'s core discipline.' },
  ],
  xpReward: 15,
}

// ─── CS3 paylaşılan bloklar: API Testinde Claude ─────────────────────────────

const apiAssertionAnimation = {
  type: 'step-animation',
  id: 'claude-api-assertion-step-01',
  title: { tr: 'Adım Adım: Endpoint\'ten Doğrulanmış Assertion\'lara', en: 'Step by Step: From Endpoint to Verified Assertions' },
  steps: [
    { id: 1, icon: '📄', label: { tr: 'Tanımı ve gerçek yanıtı yapıştır', en: 'Paste the definition and a real response' }, detail: { tr: 'OpenAPI/endpoint tanımı ve gerçek bir 200 OK yanıtı bağlam olarak yapıştırılır.', en: 'The OpenAPI/endpoint definition and a real 200 OK response are pasted as context.' } },
    { id: 2, icon: '✅', label: { tr: 'Mutlu yol assertion\'larını iste', en: 'Ask for positive scenarios' }, detail: { tr: 'Dokümante edilmiş her alanı kapsayan pozitif senaryolar istenir.', en: 'Positive scenarios covering every documented field are requested.' } },
    { id: 3, icon: '🚨', label: { tr: 'Negatif senaryoları açıkça sor', en: 'Explicitly ask for negative scenarios' }, detail: { tr: '4xx/5xx senaryoları istenir, ama bunlar doğrulanana kadar hipotez olarak işaretlenir.', en: '4xx/5xx scenarios are requested, but flagged as hypotheses until confirmed.' } },
    { id: 4, icon: '🧰', label: { tr: 'Framework\'ü seç', en: 'Pick the framework' }, detail: { tr: 'REST Assured veya Postman/Bruno belirtilir — çıktı doğrudan projene düşer.', en: 'REST Assured or Postman/Bruno is specified — the output drops directly into your project.' } },
    { id: 5, icon: '🔬', label: { tr: 'En az bir negatifi gerçekten tekrar üret', en: 'Reproduce at least one negative for real' }, detail: { tr: 'Hipotez edilen assertion, güvenilmeden önce en az bir kez gerçek bir hata yanıtına karşı doğrulanır.', en: 'The hypothesized assertion is verified against at least one real error response before being trusted.' } },
  ],
}

const apiAssertionOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-api-assertion-order-01',
  question: { tr: 'Bir endpoint tanımından güvenilir API assertion\'larına giden akışı doğru sıraya diz.', en: 'Arrange the flow from an endpoint definition to reliable API assertions in the correct order.' },
  items: [
    { id: '1', text: { tr: 'OpenAPI/endpoint tanımı + gerçek bir yanıtı yapıştır', en: 'Paste the OpenAPI/endpoint definition + a real response' }, order: 1 },
    { id: '2', text: { tr: 'Dokümante edilmiş her alan için pozitif senaryo iste', en: 'Ask for positive scenarios for every documented field' }, order: 2 },
    { id: '3', text: { tr: 'Negatif/hata senaryolarını (4xx/5xx) açıkça sor', en: 'Explicitly ask for negative/error scenarios (4xx/5xx)' }, order: 3 },
    { id: '4', text: { tr: 'Framework\'ü seç (REST Assured veya Postman/Bruno)', en: 'Pick the framework (REST Assured or Postman/Bruno)' }, order: 4 },
    { id: '5', text: { tr: 'En az bir negatif senaryoyu gerçekten tekrar üretip doğrula', en: 'Reproduce at least one negative scenario for real to verify it' }, order: 5 },
  ],
  xpReward: 10,
}

const apiAssertionPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-api-assertion-practice',
  id: 'claude-api-assertion-practice',
  label: { tr: 'Pratik: Yanıt JSON\'ından hata senaryolu bir assertion prompt\'u kur', en: 'Practice: Build an assertion prompt with error scenarios from a response JSON' },
  language: 'text',
  task: {
    tr: 'Amaç: "Bu response için test yaz" gibi belirsiz bir isteği; gerçek yanıt, framework seçimi ve açık hata senaryosu talebi içeren bir prompt\'a dönüştürmek.',
    en: 'Goal: turn a vague request like "Write tests for this response" into a prompt containing the real response, the framework choice and an explicit error-scenario request.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: rol, gerçek response JSON\'ı, framework + hata senaryosu talebi.',
    en: 'Fill in the TODO lines: role, real response JSON, framework + error-scenario request.',
  },
  code: {
    tr: `TODO (rol)
TODO (gerçek response JSON'ı)
Bu response için test yaz.
TODO (framework + hata senaryosu talebi)`,
    en: `TODO (role)
TODO (real response JSON)
Write tests for this response.
TODO (framework + error-scenario request)`,
  },
  starterCode: {
    tr: `TODO (rol)
TODO (gerçek response JSON'ı)
Bu response için test yaz.
TODO (framework + hata senaryosu talebi)`,
    en: `TODO (role)
TODO (real response JSON)
Write tests for this response.
TODO (framework + error-scenario request)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA API test mühendisisin.
Gerçek 200 OK yanıtı: { "id": 42, "email": "user@test.com" }.
Bu alanlar için REST Assured (Java) assertion'ları yaz; ayrıca id geçersizse (404) ve email formatı bozuksa (422) beklenen yanıt şeklini hipotez olarak öner, doğrulanana kadar "onaylanmamış" diye işaretle.`,
    en: `You are a senior QA API test engineer.
Real 200 OK response: { "id": 42, "email": "user@test.com" }.
Write REST Assured (Java) assertions for these fields; also hypothesize the expected response shape for an invalid id (404) and a malformed email (422), marking them "unconfirmed" until verified.`,
  },
  expected: {
    tr: `Prompt artık gerçek yanıtı, framework seçimini ve açık hata senaryosu talebini taşıyor. Claude hem mutlu yol assertion'larını hem de doğrulanana kadar işaretli hata hipotezlerini üretir — hiçbiri sessizce "kesin doğru" gibi sunulmaz.`,
    en: `The prompt now carries the real response, the framework choice and an explicit error-scenario request. Claude produces both happy-path assertions and flagged error hypotheses — none presented silently as "definitely correct".`,
  },
  hints: [
    { tr: 'Gerçek bir yanıt yapıştırmadan "test yaz" demek, Claude\'un alan adlarını ve tiplerini tahmin etmesine yol açar.', en: 'Saying "write tests" without pasting a real response makes Claude guess field names and types.' },
    { tr: 'Hata senaryolarını "hipotez, onaylanana kadar işaretli" olarak istemek, uydurma bir 404 şeklinin gerçekmiş gibi sete girmesini engeller.', en: 'Requesting error scenarios as "hypothesis, flagged until confirmed" prevents a made-up 404 shape from entering the suite as if it were real.' },
    { tr: 'Framework belirtmezsen (REST Assured mı, Postman/Bruno script\'i mi), çıktıyı elle uyarlaman gerekir.', en: 'If you don\'t specify the framework (REST Assured or a Postman/Bruno script), you\'ll have to manually adapt the output.' },
  ],
  xpReward: 15,
}

// ─── CS3 paylaşılan bloklar: Claude Code ─────────────────────────────────────

const claudeCodeLoopAnimation = {
  type: 'step-animation',
  id: 'claude-code-loop-step-01',
  title: { tr: 'Adım Adım: Claude Code\'un Döngüsü', en: 'Step by Step: The Claude Code Loop' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Oku', en: 'Read' }, detail: { tr: 'Ajan, başarısız test dosyasını ve ilgili kaynak kodu okur.', en: 'The agent reads the failing test file and the related source code.' } },
    { id: 2, icon: '▶️', label: { tr: 'Çalıştır', en: 'Run' }, detail: { tr: 'Testi (veya test setini) terminalde çalıştırır.', en: 'It executes the test (or the suite) in the terminal.' } },
    { id: 3, icon: '🩺', label: { tr: 'Teşhis et', en: 'Diagnose' }, detail: { tr: 'Gerçek hata çıktısını okur ve bir hipotez kurar.', en: 'It reads the actual error output and forms a hypothesis.' } },
    { id: 4, icon: '✏️', label: { tr: 'Düzenle', en: 'Edit' }, detail: { tr: 'Bir düzeltme önerir ve iznin varsa uygular.', en: 'It proposes a fix and, with your permission, applies it.' } },
    { id: 5, icon: '🔁', label: { tr: 'Tekrar çalıştır', en: 'Re-run' }, detail: { tr: 'Testi tekrar çalıştırarak doğrular; hâlâ kırıksa döngü tekrarlanır.', en: 'It runs the test again to confirm; if still red, the loop repeats.' } },
  ],
}

const claudeCodeLoopOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-code-loop-order-01',
  question: { tr: 'Claude Code\'un başarısız bir testle çalışırken izlediği döngüyü doğru sıraya diz.', en: 'Arrange the loop Claude Code follows when working on a failing test in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Başarısız test dosyasını ve ilgili kodu oku', en: 'Read the failing test file and related code' }, order: 1 },
    { id: '2', text: { tr: 'Testi terminalde çalıştır', en: 'Run the test in the terminal' }, order: 2 },
    { id: '3', text: { tr: 'Gerçek hata çıktısını okuyup hipotez kur', en: 'Read the actual error output and form a hypothesis' }, order: 3 },
    { id: '4', text: { tr: 'İzinle bir düzeltme öner ve uygula', en: 'Propose and, with permission, apply a fix' }, order: 4 },
    { id: '5', text: { tr: 'Testi tekrar çalıştırıp doğrula', en: 'Re-run the test to confirm' }, order: 5 },
  ],
  xpReward: 10,
}

const claudeCodeScopedTaskPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-code-scoped-task-practice',
  id: 'claude-code-scoped-task-practice',
  label: { tr: 'Pratik: "Her şeyi düzelt" komutunu kapsamlı, izin-bilinçli bir göreve dönüştür', en: 'Practice: Turn a "fix everything" command into a scoped, permission-aware task' },
  language: 'text',
  task: {
    tr: 'Amaç: "Bütün testleri düzelt" gibi geniş ve riskli bir komutu; tek bir dosyaya kapsamlı, uygulamadan önce göstermesini isteyen bir göreve dönüştürmek.',
    en: 'Goal: turn a broad, risky command like "Fix all the tests" into a task scoped to a single file that asks to show the fix before applying it.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: kapsam (tek dosya), teşhis adımı, uygulamadan önce göster talimatı.',
    en: 'Fill in the TODO lines: scope (a single file), the diagnose step, the "show before applying" instruction.',
  },
  code: {
    tr: `TODO (kapsam: tek dosya)
Bütün testleri düzelt.
TODO (uygulamadan önce göster talimatı)`,
    en: `TODO (scope: a single file)
Fix all the tests.
TODO (show-before-applying instruction)`,
  },
  starterCode: {
    tr: `TODO (kapsam: tek dosya)
Bütün testleri düzelt.
TODO (uygulamadan önce göster talimatı)`,
    en: `TODO (scope: a single file)
Fix all the tests.
TODO (show-before-applying instruction)`,
  },
  solutionCode: {
    tr: `Sadece tests/login.spec.ts dosyasındaki başarısız testi oku ve çalıştır; kök nedeni bul.
Düzeltmeyi uygulamadan önce bana göster, ben onaylamadan dosyayı değiştirme.`,
    en: `Read and run only the failing test in tests/login.spec.ts; find the root cause.
Show me the fix before applying it — do not modify the file until I approve.`,
  },
  expected: {
    tr: `Görev artık tek bir dosyayla sınırlı ve uygulamadan önce onay istiyor — ajanın etki alanı, "bütün testleri düzelt" komutunun tüm repository'ye açık bıraktığı riskten çok daha küçük.`,
    en: `The task is now scoped to a single file and asks for approval before applying — the agent's blast radius is far smaller than the one "fix all the tests" leaves open across the whole repository.`,
  },
  hints: [
    { tr: '"Bütün testleri düzelt" demek, ajana ilgisiz onlarca dosyayı değiştirme yetkisi verir — kapsam daraltılmalı.', en: 'Saying "fix all the tests" grants the agent authority to change dozens of unrelated files — the scope must be narrowed.' },
    { tr: '"Uygulamadan önce bana göster" talimatı, otomatik-onaylı bir izin modunda bile bir inceleme adımı ekler.', en: 'The "show me before applying" instruction adds a review step even under an auto-approve permission mode.' },
    { tr: 'Kapsamı tek bir dosyaya indirmek, düzeltmenin etki alanını (blast radius) küçültür.', en: 'Narrowing the scope to a single file shrinks the fix\'s blast radius.' },
  ],
  xpReward: 15,
}

// ─── CS3 paylaşılan bloklar: MCP ──────────────────────────────────────────────

const mcpFlowAnimation = {
  type: 'step-animation',
  id: 'claude-mcp-flow-step-01',
  title: { tr: 'Adım Adım: MCP İstek Akışı', en: 'Step by Step: The MCP Request Flow' },
  steps: [
    { id: 1, icon: '💬', label: { tr: 'Görevi sor', en: 'Ask the task' }, detail: { tr: 'Konuşmada bir görev istenir: "login bug\'ının gerçekten düzeldiğini kontrol et".', en: 'A task is requested in the conversation: "check if the login bug is actually fixed".' } },
    { id: 2, icon: '🔧', label: { tr: 'Ajan bir araç çağrısına karar verir', en: 'The agent decides a tool call is needed' }, detail: { tr: 'Bir MCP araç çağrısı gerektiğine karar verilir (örn. tarayıcıda gezinme).', en: 'It decides an MCP tool call is needed (e.g. browser navigation).' } },
    { id: 3, icon: '⚙️', label: { tr: 'MCP server gerçek eylemi yapar', en: 'The MCP server executes the real action' }, detail: { tr: 'Server gerçek sayfayı açar ve sonucu döndürür.', en: 'The server opens the real page and returns the result.' } },
    { id: 4, icon: '🧠', label: { tr: 'Ajan gerçek sonucu okur', en: 'The agent reads the real result' }, detail: { tr: 'Gerçek DOM çıktısını veya sorgu sonucunu okuyup bir sonraki adımı akıl yürütür.', en: 'It reads the real DOM or query result and reasons about the next step.' } },
    { id: 5, icon: '🔁', label: { tr: 'Döngü tamamlanana kadar tekrarlanır', en: 'The loop repeats until done' }, detail: { tr: 'Görev bitene veya ajan sana rapor verene kadar döngü sürer.', en: 'The loop continues until the task is done or the agent reports back to you.' } },
  ],
}

const mcpFlowOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-mcp-flow-order-01',
  question: { tr: 'MCP bağlantılı bir ajanın bir görevi tamamlama akışını doğru sıraya diz.', en: 'Arrange the flow an MCP-connected agent follows to complete a task in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Konuşmada bir görev iste', en: 'Request a task in the conversation' }, order: 1 },
    { id: '2', text: { tr: 'Ajan bir MCP araç çağrısı gerektiğine karar verir', en: 'The agent decides an MCP tool call is needed' }, order: 2 },
    { id: '3', text: { tr: 'MCP server gerçek eylemi yapıp sonucu döndürür', en: 'The MCP server executes the real action and returns the result' }, order: 3 },
    { id: '4', text: { tr: 'Ajan gerçek sonucu okuyup bir sonraki adımı akıl yürütür', en: 'The agent reads the real result and reasons about the next step' }, order: 4 },
    { id: '5', text: { tr: 'Döngü, görev bitene kadar tekrarlanır', en: 'The loop repeats until the task is done' }, order: 5 },
  ],
  xpReward: 10,
}

const mcpScopedTaskPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-mcp-scoped-task-practice',
  id: 'claude-mcp-scoped-task-practice',
  label: { tr: 'Pratik: MCP bağlantılı bir görevi ortam ve izin sınırıyla kapsamla', en: 'Practice: Scope an MCP-connected task with environment and permission boundaries' },
  language: 'text',
  task: {
    tr: 'Amaç: "MCP ile login\'i test et" gibi tehlikeli derecede belirsiz bir görevi; ortam (asla production), izin sınırı (salt-okunur) ve net görev içeren bir talimata dönüştürmek.',
    en: 'Goal: turn a dangerously vague task like "Test login with MCP" into an instruction containing the environment (never production), a permission boundary (read-only) and a clear task.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: ortam kısıtı, izin sınırı, net görev.',
    en: 'Fill in the TODO lines: environment constraint, permission boundary, clear task.',
  },
  code: {
    tr: `TODO (ortam kısıtı: asla production)
TODO (izin sınırı: salt-okunur)
MCP ile login'i test et.`,
    en: `TODO (environment constraint: never production)
TODO (permission boundary: read-only)
Test login with MCP.`,
  },
  starterCode: {
    tr: `TODO (ortam kısıtı: asla production)
TODO (izin sınırı: salt-okunur)
MCP ile login'i test et.`,
    en: `TODO (environment constraint: never production)
TODO (permission boundary: read-only)
Test login with MCP.`,
  },
  solutionCode: {
    tr: `Sadece staging ortamında çalış, asla production'a bağlanma.
Veritabanı MCP bağlantısını salt-okunur modda kullan.
Login akışını dene ve test kullanıcısının seed verisinin gerçekten veritabanında var olduğunu doğrula.`,
    en: `Work only in the staging environment, never connect to production.
Use the database MCP connection in read-only mode.
Try the login flow and verify the test user's seed data actually exists in the database.`,
  },
  expected: {
    tr: `Görev artık ortamı (staging, asla production) ve izin sınırını (salt-okunur) açıkça taşıyor. Ajan gerçek bir tarayıcı/veritabanı bağlantısını kullanır ama etki alanı önceden daraltılmıştır.`,
    en: `The task now explicitly carries the environment (staging, never production) and the permission boundary (read-only). The agent uses a real browser/database connection, but its blast radius has already been narrowed.`,
  },
  hints: [
    { tr: 'Ortamı belirtmeden bir MCP görevi vermek, ajanın hangi sunucuya bağlanacağını varsaymasına yol açar — bu asla production olmamalı.', en: 'Giving an MCP task without naming the environment leaves the agent to assume which server to connect to — that must never be production.' },
    { tr: '"Salt-okunur" sınırı, veritabanı MCP bağlantısının yanlışlıkla veri değiştirmesini engeller.', en: 'The "read-only" boundary prevents the database MCP connection from accidentally modifying data.' },
    { tr: 'Net bir görev (hangi kullanıcı, hangi veri) olmadan ajan neyi doğrulayacağını tahmin etmek zorunda kalır.', en: 'Without a clear task (which user, which data), the agent has to guess what to verify.' },
  ],
  xpReward: 15,
}

// ─── CS4 paylaşılan bloklar: CI/CD & Ekipte AI ───────────────────────────────

const promptLibraryLifecycleAnimation = {
  type: 'step-animation',
  id: 'claude-prompt-library-step-01',
  title: { tr: 'Adım Adım: Ekip Prompt Kütüphanesinin Yaşam Döngüsü', en: 'Step by Step: The Team Prompt Library Lifecycle' },
  steps: [
    { id: 1, icon: '🔁', label: { tr: 'Bir prompt\'u iterasyonla olgunlaştır', en: 'Iterate a prompt to maturity' }, detail: { tr: 'Bir tester, gerçek bir görev için (Prompt Mühendisliği sekmesindeki disiplinle) güvenilir sonuç verene kadar bir prompt\'u iyileştirir.', en: 'A tester refines a prompt for a real task until it produces reliable results (the discipline from the Prompt Engineering tab).' } },
    { id: 2, icon: '📐', label: { tr: 'Yer tutuculu şablona dönüştür', en: 'Turn it into a placeholder template' }, detail: { tr: 'İşe yarayan prompt, özellik adı gibi sabit detaylar yerine {{yer_tutucu}} içeren tekrar kullanılabilir bir şablona çevrilir.', en: 'The working prompt is turned into a reusable template with {{placeholders}} instead of hardcoded specifics like the feature name.' } },
    { id: 3, icon: '👀', label: { tr: 'Ekip incelemesinden geçir', en: 'Get it reviewed by the team' }, detail: { tr: 'Şablon, paylaşılan bir utility metodu gibi ekip tarafından incelenir — kalite tek bir kişinin onayına bağlı kalmaz.', en: 'The template is reviewed by the team, like a shared utility method — quality doesn\'t depend on a single person\'s approval.' } },
    { id: 4, icon: '📚', label: { tr: 'Kütüphaneye ekle', en: 'Add it to the library' }, detail: { tr: 'Onaylanan şablon, paylaşılan ve versiyon kontrollü bir prompt kütüphanesine eklenir.', en: 'The approved template is added to a shared, version-controlled prompt library.' } },
    { id: 5, icon: '♻️', label: { tr: 'Tekrar kullan ve geliştir', en: 'Reuse and improve it' }, detail: { tr: 'Ekip, her seferinde sıfırdan icat etmek yerine zaman içinde şablonu tekrar kullanır ve geliştirir.', en: 'The team reuses and improves the template over time instead of reinventing it per person.' } },
  ],
}

const promptLibraryLifecycleOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-prompt-library-order-01',
  question: { tr: 'Tek seferlik bir prompt\'tan paylaşılan bir ekip şablonuna giden akışı doğru sıraya diz.', en: 'Arrange the flow from a one-off prompt to a shared team template in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Prompt\'u gerçek bir görevde güvenilir sonuç verene kadar iyileştir', en: 'Refine the prompt on a real task until it produces reliable results' }, order: 1 },
    { id: '2', text: { tr: 'Sabit detayları yer tutucuyla değiştirip şablonlaştır', en: 'Replace hardcoded specifics with placeholders to templatize it' }, order: 2 },
    { id: '3', text: { tr: 'Şablonu ekip incelemesinden geçir', en: 'Get the template reviewed by the team' }, order: 3 },
    { id: '4', text: { tr: 'Paylaşılan prompt kütüphanesine ekle', en: 'Add it to the shared prompt library' }, order: 4 },
    { id: '5', text: { tr: 'Zaman içinde tekrar kullan ve geliştir', en: 'Reuse and improve it over time' }, order: 5 },
  ],
  xpReward: 10,
}

const promptTemplatePlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-prompt-template-practice',
  id: 'claude-prompt-template-practice',
  label: { tr: 'Pratik: Tek seferlik bir prompt\'u tekrar kullanılabilir bir ekip şablonuna dönüştür', en: 'Practice: Turn a one-off prompt into a reusable team template' },
  language: 'text',
  task: {
    tr: 'Amaç: sadece "kayıt ol" özelliğine özel, sabit kodlanmış bir prompt\'u; herhangi bir teammate\'in herhangi bir özellik için doldurabileceği yer tutuculu bir şablona dönüştürmek.',
    en: 'Goal: turn a prompt hardcoded to the "sign-up" feature specifically into a placeholder template any teammate can fill in for any feature.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: özellik adı ve user story\'yi sabit metin yerine yer tutucuyla değiştir.',
    en: 'Fill in the TODO lines: replace the feature name and user story with placeholders instead of fixed text.',
  },
  code: {
    tr: `Sen kıdemli bir QA mühendisisin.
Önce, aşağıdaki user story ve kabul kriterlerinde belirsiz veya eksik olan HER kuralı listele.
Kayıt ol özelliği: [buraya kayıt ol story'si sabit yapıştırıldı].
TODO (özellik adı ve story'yi yer tutucuyla değiştir)
Onaylandıktan sonra 5 adet Gherkin senaryosu yaz.`,
    en: `You are a senior QA engineer.
First, list every rule in the user story and acceptance criteria below that is ambiguous or missing.
Sign-up feature: [the sign-up story is hardcoded here].
TODO (replace the feature name and story with placeholders)
Once confirmed, write 5 Gherkin scenarios.`,
  },
  starterCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Önce, aşağıdaki user story ve kabul kriterlerinde belirsiz veya eksik olan HER kuralı listele.
Kayıt ol özelliği: [buraya kayıt ol story'si sabit yapıştırıldı].
TODO (özellik adı ve story'yi yer tutucuyla değiştir)
Onaylandıktan sonra 5 adet Gherkin senaryosu yaz.`,
    en: `You are a senior QA engineer.
First, list every rule in the user story and acceptance criteria below that is ambiguous or missing.
Sign-up feature: [the sign-up story is hardcoded here].
TODO (replace the feature name and story with placeholders)
Once confirmed, write 5 Gherkin scenarios.`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA mühendisisin.
Önce, aşağıdaki user story ve kabul kriterlerinde belirsiz veya eksik olan HER kuralı listele.
Özellik: {{ozellik_adi}}
User story + kabul kriterleri: {{user_story}}
Onaylandıktan sonra {{n}} adet Gherkin senaryosu yaz.`,
    en: `You are a senior QA engineer.
First, list every rule in the user story and acceptance criteria below that is ambiguous or missing.
Feature: {{feature_name}}
User story + acceptance criteria: {{user_story}}
Once confirmed, write {{n}} Gherkin scenarios.`,
  },
  expected: {
    tr: `Prompt artık "kayıt ol"a özel değil — {{özellik_adı}}, {{user_story}} ve {{n}} yer tutucularıyla herhangi bir teammate, herhangi bir özellik için doldurup kullanabilir. Kalite tek bir kişinin o günkü prompt yazma becerisine bağlı kalmaz.`,
    en: `The prompt is no longer specific to "sign-up" — with {{feature_name}}, {{user_story}} and {{n}} placeholders, any teammate can fill it in for any feature. Quality no longer depends on one person's prompt-writing skill that day.`,
  },
  hints: [
    { tr: 'Özellik adını sabit yazmak, şablonu SADECE o özellik için kullanılabilir kılar — bir sonraki kişi baştan yazmak zorunda kalır.', en: 'Hardcoding the feature name makes the template usable ONLY for that feature — the next person has to write it from scratch.' },
    { tr: 'Yer tutucu sayısı ({{n}}) bile parametrelenebilir — her ekip üyesi kaç senaryo istediğine kendi karar verir.', en: 'Even the count ({{n}}) can be parametrized — each team member decides how many scenarios they want.' },
    { tr: 'Şablonun kalitesi hâlâ ekip incelemesinden geçmelidir — paylaşılan olması onu otomatik doğru yapmaz.', en: 'The template\'s quality still needs team review — being shared doesn\'t automatically make it correct.' },
  ],
  xpReward: 15,
}

// ─── CS4 paylaşılan bloklar: Riskler & Yaygın Hatalar ────────────────────────

const riskVerificationAnimation = {
  type: 'step-animation',
  id: 'claude-risk-verification-step-01',
  title: { tr: 'Adım Adım: Güvenmeden Önce Doğrulama', en: 'Step by Step: Verifying Before Trusting' },
  steps: [
    { id: 1, icon: '🔍', label: { tr: 'Halüsinasyonu kontrol et', en: 'Check for hallucination' }, detail: { tr: 'Önerilen her API/metodu dokümantasyona veya IDE otomatik tamamlamaya karşı doğrula.', en: 'Verify every suggested API/method against the docs or IDE autocomplete.' } },
    { id: 2, icon: '🔒', label: { tr: 'Gizlilik maruziyetini kontrol et', en: 'Check for privacy exposure' }, detail: { tr: 'Temizlenmemiş kişisel veri veya kimlik bilgisi yapıştırılmadığını doğrula.', en: 'Confirm no unsanitized PII or credentials were pasted.' } },
    { id: 3, icon: '📜', label: { tr: 'Şirket politikasını kontrol et', en: 'Check company policy' }, detail: { tr: 'Bu görevin şirketinin AI kullanım politikasına uygun olduğunu doğrula.', en: 'Confirm this task is allowed by your company\'s AI usage policy.' } },
    { id: 4, icon: '🧠', label: { tr: 'Aşırı bağımlılığı kontrol et', en: 'Check for over-reliance' }, detail: { tr: 'Düzeltmenin sadece çalıştığını değil, NEDEN çalıştığını açıklayabildiğini doğrula.', en: 'Confirm you can explain WHY the fix works, not just that it works.' } },
    { id: 5, icon: '✅', label: { tr: 'İnsan incelemesi iste', en: 'Require human review' }, detail: { tr: 'Çıktı, diğer her kod gibi aynı inceleme çıtasından geçer.', en: 'The output goes through the same review bar as any other code.' } },
  ],
}

const riskVerificationOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-claude-risk-verification-order-01',
  question: { tr: 'Bir Claude çıktısına güvenmeden önceki doğrulama kontrol listesini doğru sıraya diz.', en: 'Arrange the verification checklist before trusting a Claude output in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Önerilen API/metodun gerçekten var olduğunu doğrula', en: 'Verify the suggested API/method actually exists' }, order: 1 },
    { id: '2', text: { tr: 'Hassas veri/kimlik bilgisi maruziyeti olmadığını kontrol et', en: 'Check there is no PII/credential exposure' }, order: 2 },
    { id: '3', text: { tr: 'Şirket AI kullanım politikasına uygun olduğunu doğrula', en: 'Confirm it complies with company AI usage policy' }, order: 3 },
    { id: '4', text: { tr: 'Düzeltmeyi kendi cümlelerinle açıklayabildiğini doğrula', en: 'Confirm you can explain the fix in your own words' }, order: 4 },
    { id: '5', text: { tr: 'Normal insan kod review\'undan geçir', en: 'Send it through normal human code review' }, order: 5 },
  ],
  xpReward: 10,
}

const uncertaintyFlagPlayground = {
  type: 'code-playground',
  relatedTopicId: 'claude-risk-uncertainty-flag-practice',
  id: 'claude-risk-uncertainty-flag-practice',
  label: { tr: 'Pratik: Claude\'a kendi belirsizliğini işaretlettir', en: 'Practice: Make Claude flag its own uncertainty' },
  language: 'text',
  task: {
    tr: 'Amaç: sıradan bir kod üretim isteğini; kullanılan framework sürümünü belirten ve Claude\'un emin olmadığı herhangi bir API\'yi açıkça işaretlemesini isteyen bir prompt\'a dönüştürerek halüsinasyon riskini görünür kılmak.',
    en: 'Goal: turn an ordinary code-generation request into a prompt that states the framework version and asks Claude to explicitly flag any API it is not certain exists, making hallucination risk visible.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: framework sürümü ve "emin olmadığını işaretle" talimatı.',
    en: 'Fill in the TODO lines: the framework version and the "flag uncertainty" instruction.',
  },
  code: {
    tr: `TODO (kullandığın Selenium sürümü)
Bu senaryo için Selenium kodu yaz.
TODO ("emin olmadığın API'yi işaretle" talimatı)`,
    en: `TODO (the Selenium version you use)
Write Selenium code for this scenario.
TODO ("flag any API you're not certain about" instruction)`,
  },
  starterCode: {
    tr: `TODO (kullandığın Selenium sürümü)
Bu senaryo için Selenium kodu yaz.
TODO ("emin olmadığın API'yi işaretle" talimatı)`,
    en: `TODO (the Selenium version you use)
Write Selenium code for this scenario.
TODO ("flag any API you're not certain about" instruction)`,
  },
  solutionCode: {
    tr: `Sen kıdemli bir QA otomasyon mühendisisin. Kullandığım Selenium sürümü: 4.18.
Bu senaryo için kod yaz; emin olmadığın herhangi bir metod veya API varsa sessizce var saymak yerine açıkça "⚠ doğrulanmadı" diye işaretle.`,
    en: `You are a senior QA automation engineer. My Selenium version is: 4.18.
Write code for this scenario; if there is any method or API you are not certain about, explicitly mark it "⚠ unverified" instead of silently assuming it exists.`,
  },
  expected: {
    tr: `Bu teknik halüsinasyon riskini SIFIRLAMAZ, ama görünür kılar — Claude, "⚠ doğrulanmadı" etiketiyle kendinden emin görünen ama aslında tahmin olan kısımları işaretler. Doğrulama adımı hâlâ senin sorumluluğundadır.`,
    en: `This technique does NOT eliminate hallucination risk, but it makes it visible — Claude marks the parts that look confident but are actually guesses with an "⚠ unverified" tag. The verification step is still your responsibility.`,
  },
  hints: [
    { tr: 'Sürüm bilgisi vermeden Claude en yaygın (genelde eski) API şeklini varsayar.', en: 'Without version info, Claude defaults to the most commonly-seen (often older) API shape.' },
    { tr: '"Emin olmadığını işaretle" talimatı olmadan, bir halüsinasyon gerçek bir cevaptan görsel olarak ayırt edilemez.', en: 'Without the "flag uncertainty" instruction, a hallucination is visually indistinguishable from a real answer.' },
    { tr: 'Bu teknik riski azaltır, ortadan kaldırmaz — işaretlenmeyen kısımlar da hâlâ senin doğrulamana ihtiyaç duyar.', en: 'This technique reduces the risk, it doesn\'t remove it — unflagged parts still need your verification too.' },
  ],
  xpReward: 15,
}

// ─── Sayfa verisi ─────────────────────────────────────────────────────────────

export const claudeAiData = {
  en: {
    hero: {
      title: `🤖 Claude AI for Testers`,
      subtitle: `From Junior Prompts to Senior Agent Workflows`,
      intro: `AI will not replace testers — but testers who use AI well will replace testers who do not. This page teaches you, hands-on, how a QA engineer uses Claude at every career stage: writing prompts that actually work, generating test cases and automation code you can trust, and graduating to Claude Code and MCP-driven workflows.`,
    },
    tabs: ['🎯 Intro: AI-Assisted Testing', '✍️ Prompt Engineering', '⚙️ Access & Setup', '📋 Test Case Generation', '🐛 Bug Analysis & Reporting', '🧬 Test Data Generation', '🤖 UI Automation: Selenium & Playwright', '🔌 Claude for API Testing', '💻 Claude Code: Agent in the Terminal', '🔗 MCP (Model Context Protocol)', '🏗️ CI/CD & AI in the Team', '🚨 Risks & Common Mistakes', '💼 Interview Q&A'],
    sections: [
      {
        title: `🎯 Intro: AI-Assisted Testing`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧑‍🏫',
            content: `Claude is like a consultant who has read millions of pages about testing, programming and every framework you can name — but has never once seen YOUR application, YOUR test data or YOUR team's definition of done. The mechanism of that analogy is exact: a large language model carries enormous general knowledge, yet knows nothing about your project except what you paste into the conversation. Here is the question worth pausing on: if this consultant is so well-read, why does the same question ("write tests for login") get a useless generic answer from one tester and a production-grade test suite from another? Java comparison: it is method overloading resolution — the compiler picks the RIGHT method only when your argument types are specific; pass everything as Object and you get the most generic match. A vague prompt is an Object-typed call. And the QA stake is real: a tester who accepts generic AI test cases gets fake confidence — the suite is green, yet the one scenario your acceptance criteria actually cared about (the account lockout) was never tested, and it breaks in production.`,
          },
          { type: 'heading', text: `What Is AI-Assisted Testing?` },
          {
            type: 'text',
            content: `AI-assisted testing means using a large language model (LLM) like Claude as an active partner in QA work: generating test cases from user stories, explaining unfamiliar errors, drafting automation code, analyzing logs and reviewing test plans. An LLM predicts the most plausible continuation of text based on patterns learned from vast training data — which is exactly why it is brilliant at producing well-structured, plausible-looking output, and exactly why that output can be confidently WRONG. The tool changes; the tester's core skill does not: deciding what is worth testing and judging whether a result is correct.`,
          },
          {
            type: 'text',
            content: `Reasoning: why can AI not replace the tester? Because of the oracle problem — testing's oldest question: "who decides what the CORRECT behavior is?" Claude can generate 50 test cases in seconds, but it cannot know that in YOUR company a locked account must auto-unlock after 15 minutes, because that rule lives in your acceptance criteria and your domain knowledge, not in Claude's training data. Java comparison: Claude is like a powerful code generator that writes JUnit tests with perfect syntax — but only YOU can write the assertion values, because only you know the expected behavior. AI produces; the tester verifies. That division of labor is permanent.`,
          },
          { type: 'heading', text: `The Junior → Senior Claude Ladder` },
          {
            type: 'table',
            headers: ['Level', 'Typical Claude Usage', 'Biggest Risk at This Level'],
            rows: [
              ['Junior', 'Q&A learning: explaining concepts, decoding error messages, understanding stack traces', 'Trusting answers without verifying them'],
              ['Junior+', 'Generating test cases and test data from user stories and acceptance criteria', 'Accepting generic cases that miss YOUR acceptance criteria'],
              ['Mid', 'Generating and fixing automation code (Selenium, Playwright, API tests)', 'Merging code with hallucinated methods or fragile locators'],
              ['Mid-Senior', 'Claude Code in the terminal: an agent that reads files, runs tests, fixes and re-runs', 'Giving the agent broad permissions without reviewing its changes'],
              ['Senior', 'MCP integrations, AI in CI/CD, team prompt libraries and AI usage standards', 'Letting the team ship AI output without review discipline'],
            ],
          },
          claudeDailyLoopAnimation,
          claudeWorkflowOrder,
          qaAssistantCallout,
          {
            type: 'quiz',
            question: `Claude confidently generates a Selenium test using driver.findElementByAI("login button") and the code looks clean. What should you do first?`,
            options: [
              { id: 'a', text: 'Merge it — Claude is trained on Selenium documentation, so the method must exist' },
              { id: 'b', text: 'Verify the method exists (IDE autocomplete, official docs) before running anything — LLMs can hallucinate plausible-looking APIs that do not exist' },
              { id: 'c', text: 'Rewrite the whole test manually, since AI-generated code can never be used' },
              { id: 'd', text: 'Ask Claude "are you sure?" and merge if it says yes' },
            ],
            correct: 'b',
            explanation: `findElementByAI does not exist in Selenium — it is a hallucination: statistically plausible text that looks like a real API. The professional reflex is verification against an external source (compiler, IDE, official docs), never the model's own confidence. Asking "are you sure?" does not help, because the model can confidently repeat its own error.`,
            retryQuestion: {
              question: `Claude generates 20 test cases for your payment feature in 10 seconds. What ultimately determines whether those cases are CORRECT?`,
              options: [
                { id: 'a', text: 'How fast they were generated — modern models are reliable' },
                { id: 'b', text: 'The number of cases — 20 is more than enough for any feature' },
                { id: 'c', text: 'Your acceptance criteria and domain knowledge — the oracle that defines expected behavior lives with you, not inside the model' },
                { id: 'd', text: 'Whether the cases are written in fluent English' },
              ],
              correct: 'c',
              explanation: `This is the oracle problem: correctness is defined by the specification and domain rules, which Claude only knows if you provide them. Speed and fluency are presentation qualities; correctness is a judgment only the tester can make against the acceptance criteria.`,
            },
          },
        ],
      },
      {
        title: `✍️ Prompt Engineering`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: `A prompt is the "steps to reproduce" field of a bug report — and the mechanism matches one-to-one. When you write a vague repro ("login is broken"), the developer returns "cannot reproduce" and you lose a day; when you write exact steps, browser version and test data, the fix starts in minutes. A vague prompt ("write tests for login") gets the AI equivalent of "cannot reproduce": a generic answer that fits every login form on earth and helps with none. So here is the question to sit with: Claude has read millions of pages — why does it still depend on YOUR five lines of context? Because it has read everyone's login rules, and without your acceptance criteria it cannot know which of a thousand possible login behaviors is yours. Java comparison: an interface contract — the more specific the method signature, the more precisely the compiler binds the call; a prompt is the type signature you hand to the model. The QA stake: teams that skip prompt discipline get generic test suites, generic suites create fake PASS confidence, and fake confidence is how the untested lockout rule reaches production on a Friday evening.`,
          },
          { type: 'heading', text: `The 4 Ingredients of a Strong Prompt` },
          {
            type: 'text',
            content: `Every strong QA prompt carries four ingredients. 1) ROLE: "You are a senior QA engineer" — sets the perspective and vocabulary of the answer. 2) CONTEXT: the user story, acceptance criteria, code or logs — the only project knowledge Claude will ever have. 3) TASK + CONSTRAINT: what to produce and within which limits ("6 test cases, negatives included"). 4) OUTPUT FORMAT: table, Gherkin, JSON — so the result drops directly into your test management tool instead of needing manual reformatting. Missing ingredients are not a style problem; each absence measurably degrades the answer, as you are about to see in the lab below.`,
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `ZAYIF PROMPT (jenerik cevap üretir):
Login için test yaz.

GÜÇLÜ PROMPT (4 bileşen işaretli):
Sen kıdemli bir QA mühendisisin.                        <- 1) ROL
Kabul kriterleri: geçerli e-posta + şifre -> dashboard;  <- 2) BAĞLAM
hatalı bilgi -> hata mesajı; 5 hatalı deneme -> kilit.
Negatif ve sınır değer senaryoları dahil test case yaz.  <- 3) GÖREV + KISIT
Çıktı: 6 adet, tablo: ID | Senaryo | Beklenen | Tip.     <- 4) FORMAT`,
              en: `WEAK PROMPT (produces a generic answer):
Write tests for login.

STRONG PROMPT (4 ingredients marked):
You are a senior QA engineer.                            <- 1) ROLE
Acceptance criteria: valid email + password -> dashboard; <- 2) CONTEXT
invalid credentials -> error message; 5 failures -> lock.
Write test cases including negative and boundary cases.   <- 3) TASK + CONSTRAINT
Output: 6 cases, table: ID | Scenario | Expected | Type.  <- 4) FORMAT`,
            },
          },
          promptIterationAnimation,
          { type: 'heading', text: `Prompt Lab — Experience the Difference Yourself` },
          {
            type: 'text',
            content: `Reading about prompt quality is passive; below you will EXPERIENCE it. Write a real prompt for the login scenario and watch the simulated Claude respond. Send a lazy one-liner first — see the generic answer. Then add the ingredients one by one and watch the same question produce a professional, copy-ready test case table. This simulation is deterministic and keyword-based (it is honest about that), but the lesson transfers one-to-one to the real Claude.`,
          },
          promptLabBlock,
          promptFixOrder,
          promptRewritePlayground,
          {
            type: 'text',
            content: `Reasoning: why is iteration normal rather than a failure? Because a prompt is a specification, and specifications are refined through review — no test plan survives its first review either. Seniors treat the first answer as a draft: they point at what is wrong ("TC04 tests a rule that is not in my acceptance criteria — remove it, add an email boundary case instead") and let the answer converge. Java comparison: it is red-green-refactor from TDD — the first red run is not failure, it is information. One warning: in very long conversations the model can lose track of earlier decisions, so for a new feature start a fresh conversation and re-paste the essential context.`,
          },
          {
            type: 'quiz',
            question: `Two testers ask about the same user story. Tester A sends: "write login tests". Tester B sends a prompt with a role, the acceptance criteria, a request for negative cases and "6 cases in a table". Why is B's answer dramatically better, mechanically speaking?`,
            options: [
              { id: 'a', text: 'B\'s prompt is longer, and longer prompts always produce better answers' },
              { id: 'b', text: 'B narrowed the model\'s prediction space: role sets vocabulary, context injects the project rules the model cannot know, and format/constraint shape verifiable output' },
              { id: 'c', text: 'B got lucky — LLM answers are random, so quality cannot be influenced' },
              { id: 'd', text: 'The model recognizes senior testers and gives them better answers' },
            ],
            correct: 'b',
            explanation: `An LLM predicts plausible continuations. A vague prompt leaves millions of plausible continuations, so the model outputs the safest generic one. Each ingredient eliminates wrong continuations: the acceptance criteria are the decisive one, because they contain project rules (like the lockout) that exist nowhere in the training data. Length alone does nothing — specificity does.`,
            retryQuestion: {
              question: `Claude's test case table includes "account unlocks automatically after 15 minutes" — but your acceptance criteria never mention an unlock time. What is this, and what is the senior move?`,
              options: [
                { id: 'a', text: 'A helpful detail — add it to the test suite as-is' },
                { id: 'b', text: 'A hallucinated assumption presented as fact — verify it against the acceptance criteria, remove or flag it, and tell Claude to base cases only on the given criteria and list its assumptions separately' },
                { id: 'c', text: 'Proof that Claude read your company\'s internal wiki' },
                { id: 'd', text: 'A reason to stop using AI for test design entirely' },
              ],
              correct: 'b',
              explanation: `The model filled a specification gap with a plausible invented value — the most dangerous failure mode, because it looks professional. The senior habit is double defense: verify output against the source of truth, and engineer the prompt to force assumptions into the open ("list every assumption separately; use only the criteria I provide").`,
            },
          },
        ],
      },
      {
        title: `⚙️ Access & Setup`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚪',
            content: `Claude has three doors into your daily work: the claude.ai web chat, the Claude Code CLI running in your terminal, and IDE extensions for VS Code or JetBrains — and the mechanism behind that analogy is exact: all three are just different transports carrying your prompt to the same underlying model, the way ChromeDriver, FirefoxDriver and EdgeDriver are different transports carrying the same WebDriver API calls to different browsers. Here is the question worth sitting with: if they all talk to "the same Claude", why would a tester ever leave the comfortable web chat for a terminal tool that needs installing and a PATH that might break? Because the web chat cannot read your repository, run your test suite, or edit a file on disk — it only sees what you paste. Java comparison: it is the difference between pasting a stack trace into a colleague's inbox (web chat) and having that colleague sit at your keyboard with full access to your IDE and terminal (a CLI agent) — both can help, but only one can actually run mvn test and watch it fail. The QA stake is concrete: a junior who only ever pastes snippets into the web chat caps their own ceiling; a tester who installs the CLI can eventually let Claude read a failing test, run it, and propose a fix in the same terminal session — the difference between asking for advice and delegating a task.`,
          },
          { type: 'heading', text: `Three Doors, One Model` },
          {
            type: 'text',
            content: `claude.ai is the web chat: free to start, with a paid Pro tier that raises usage limits and unlocks longer conversations — the natural starting point for Q&A learning and one-off test case or test data generation, exactly what you practiced in the Prompt Engineering tab. Claude Code is a command-line agent: install it once, run it inside any project folder, and it can read files, run your test suite, and edit code with your permission — this is the tool that turns Claude from an advisor into an active participant in your repository. IDE extensions (VS Code, JetBrains) embed the same agent inside your editor, showing suggested edits inline instead of in a separate terminal window — convenient once you are already comfortable with the underlying CLI workflow.`,
          },
          {
            type: 'text',
            content: `Reasoning: if the CLI is strictly more powerful, why not always use it? Because power implies risk — a CLI agent that can edit files and run shell commands needs explicit permission settings, and running it against a live production branch without reviewing its diffs is asking for trouble. The web chat's read-only nature is a feature when you only want a second opinion on a test plan, not a code change. Senior testers pick the tool by blast radius: web chat for advice, CLI for supervised repository work.`,
          },
          {
            type: 'table',
            headers: ['Access Method', 'Best For', 'Limitation'],
            rows: [
              ['claude.ai (web)', 'Q&A learning, quick test case drafts, one-off explanations', 'Cannot read your repo or run commands — everything must be pasted manually'],
              ['Claude Code (CLI)', 'Reading failing tests, running the suite, proposing and applying fixes', 'Requires installation and explicit permission review — a bigger blast radius'],
              ['IDE extension (VS Code / JetBrains)', 'Inline suggestions while writing automation code', 'Same underlying agent as the CLI, just a different surface — no extra capability'],
            ],
          },
          { type: 'heading', text: `Installing Claude Code (CLI)` },
          {
            type: 'code',
            language: 'bash',
            label: 'Windows (PowerShell)',
            code: {
              tr: `node -v
# Beklenen çıktı: v18 veya üzeri bir sürüm numarası
# Node.js kurulu değilse: nodejs.org üzerinden LTS sürümünü indir ve kur

npm install -g @anthropic-ai/claude-code
# PowerShell'i normal kullanıcı olarak çalıştırmak genelde yeterlidir

claude --version
# Beklenen çıktı: bir sürüm numarası (örn. 1.x.x)
# Doğrulama: hata vermeden bir sürüm numarası dönerse kurulum tamamdır`,
              en: `node -v
# Expected output: v18 or higher
# If Node.js is missing, install the LTS version from nodejs.org

npm install -g @anthropic-ai/claude-code
# Running PowerShell as a regular user is usually enough

claude --version
# Expected output: a version number (e.g. 1.x.x)
# Verification: no error and a version number means the install succeeded`,
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'macOS / Linux (Terminal)',
            code: {
              tr: `node -v
# Beklenen çıktı: v18 veya üzeri bir sürüm numarası

sudo npm install -g @anthropic-ai/claude-code
# macOS/Linux'ta global npm paketleri genelde sudo veya nvm gerektirir;
# sudo kullanmak istemiyorsan nvm ile Node kurup sudo'suz global kurulum yapabilirsin

claude --version
# Beklenen çıktı: bir sürüm numarası (örn. 1.x.x)
# Doğrulama: hata vermeden bir sürüm numarası dönerse kurulum tamamdır`,
              en: `node -v
# Expected output: v18 or higher

sudo npm install -g @anthropic-ai/claude-code
# Global npm packages on macOS/Linux usually need sudo or nvm;
# if you don't want sudo, install Node via nvm for a sudo-free global install

claude --version
# Expected output: a version number (e.g. 1.x.x)
# Verification: no error and a version number means the install succeeded`,
            },
          },
          { type: 'heading', text: `IDE Extensions` },
          {
            type: 'text',
            content: `VS Code and JetBrains both offer a Claude extension from their respective marketplaces. Installing it adds a Claude panel inside the editor and lets you trigger the same agent on the currently open file — useful once you already trust the CLI workflow, since the extension is a thinner UI over the identical underlying tool, not a separate product.`,
          },
          { type: 'heading', text: `API Key Concept and Security` },
          {
            type: 'text',
            content: `An API key is a secret string that authenticates your requests to Claude without a browser login — it is what lets a CI pipeline or a custom script call Claude programmatically. Treat it exactly like a database password: never hardcode it into source code, never commit it to a repository, and never paste it into a Claude conversation to "test if it works" — a model transcript is not a secure secrets store. Java comparison: this is the same discipline as keeping database credentials in an environment variable or an application.properties file that is gitignored, instead of hardcoding them into a Java class — the secret lives outside version control, and the code only references its name.`,
          },
          {
            type: 'code',
            language: 'javascript',
            code: {
              tr: `// YANLIŞ: API key doğrudan kod içinde
const client = new Anthropic({ apiKey: 'sk-ant-api03-abc123...' })

// DOĞRU: API key ortam değişkeninden okunur, .env dosyası .gitignore'dadır
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })`,
              en: `// WRONG: API key hardcoded directly in the code
const client = new Anthropic({ apiKey: 'sk-ant-api03-abc123...' })

// CORRECT: API key read from an environment variable, .env is gitignored
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })`,
            },
          },
          { type: 'heading', text: `Which Language Should You Write Prompts In?` },
          {
            type: 'text',
            content: `You can write prompts to Claude in Turkish or English with no functional restriction — the model handles both fluently. What actually affects answer quality is consistency with your codebase's vocabulary: if your test framework, error messages and documentation use English technical terms (assertion, locator, fixture), keep those terms in English inside your prompt even when the surrounding sentence is Turkish — translating a term into its native-language equivalent can make the model guess which concept you mean instead of matching it directly to a known API. This mirrors the exact rule this platform itself follows: local-language explanation, English technical terms unchanged.`,
          },
          claudeCliInstallStepAnimation,
          claudeCliInstallOrder,
          claudeInstallTroubleshootPlayground,
          {
            type: 'quiz',
            question: `You need Claude to read a failing Playwright test, run it, and propose a code fix in the same session. Which access method fits this task?`,
            options: [
              { id: 'a', text: 'claude.ai web chat, since it has no installation step' },
              { id: 'b', text: 'Claude Code CLI, because only an agent with file and command access can read a specific test file, execute it, and edit the fix in place' },
              { id: 'c', text: 'An IDE extension is required — the CLI is not capable of this' },
              { id: 'd', text: 'Any method works identically, since they all use the same model' },
            ],
            correct: 'b',
            explanation: `The web chat can only see what you paste; it cannot open a specific file or execute a command. The CLI (and the IDE extension, which wraps the same agent) is the only option with real file and shell access, which is a prerequisite for "run it and propose a fix in place".`,
            retryQuestion: {
              question: `A teammate asks: "Is it safe to paste my ANTHROPIC_API_KEY into a Claude Code conversation to check if it's the correct format?" What is the correct answer?`,
              options: [
                { id: 'a', text: 'Yes, the conversation is private and never leaves your machine' },
                { id: 'b', text: 'No — treat the key like a database password: never paste it into any conversation; to verify it, check the length/prefix locally or rotate it if you suspect exposure' },
                { id: 'c', text: 'Yes, but only if you delete the message afterward' },
                { id: 'd', text: 'It does not matter — API keys cannot be misused even if exposed' },
              ],
              correct: 'b',
              explanation: `A model transcript (local or remote) is not a secrets vault, and "delete afterward" does not guarantee the value was never processed or logged upstream. The safe habit is identical to database credentials: never type the secret anywhere outside your secrets manager; if exposure is suspected, rotate the key.`,
            },
          },
        ],
      },
      {
        title: `📋 Test Case Generation`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: `Claude generating test cases from an incomplete user story is like a contractor building from a floor plan missing dimensions — the mechanism is exact: the contractor CAN guess a wall's length (a statistically plausible number), but the building might not fit the lot. Here is the question worth sitting with: if Claude can generate 20 test cases in seconds, why should the FIRST thing you ask it to do be to list what's missing, not to write the tests? Because most user stories are silent on edge cases and thresholds — skip asking for the gaps, and Claude fills them with its own trained-in defaults, not your product's actual rule. Java comparison: this is like writing a JUnit test against an interface method with no Javadoc — you can compile a guess, but without the contract's real pre/postconditions you are testing your assumption, not the requirement. The QA stake: a test suite built on Claude's silently-filled assumptions passes in CI yet misses the real acceptance criterion — the same fake-confidence trap from the Intro tab's oracle problem, this time at the story-intake stage rather than the test-design stage.`,
          },
          { type: 'heading', text: `Ask Before You Generate` },
          {
            type: 'text',
            content: `Use a two-step technique instead of asking for tests directly. Step one: paste the user story and acceptance criteria, and ask Claude to LIST every rule that is ambiguous or missing — do not request any test yet. Step two: take that list to your product owner or team and get real, confirmed answers. Only then do you ask for test cases, explicitly instructing Claude to use ONLY the confirmed rules. This ordering turns a one-shot generation into a controlled, two-phase conversation where the oracle gap surfaces before it can be silently filled.`,
          },
          {
            type: 'text',
            content: `Reasoning: why generate in Gherkin specifically, rather than a plain bullet list? Given/When/Then forces an explicit precondition, action and expected-result triple for every scenario, which happens to be exactly the shape Claude needs filled to avoid vague output — the format itself becomes a forcing function for specificity, the same way a strongly-typed method signature forces you to supply every parameter before the code compiles.`,
          },
          {
            type: 'table',
            headers: ['Step', 'What You Ask Claude', 'What You Still Own'],
            rows: [
              ['List ambiguities', 'Given this story and these acceptance criteria, list every rule that is unclear or missing before writing any test', 'Taking the list to your PO/team and getting real answers'],
              ['Generate in Gherkin', 'Using ONLY the confirmed rules below, write N Gherkin scenarios: Given/When/Then', 'Reviewing scenario titles against your acceptance criteria checklist'],
              ['Review as the oracle', '(no Claude step here)', 'Deciding pass/fail correctness — Claude\'s fluent syntax is not proof of coverage'],
            ],
          },
          {
            type: 'code',
            language: 'gherkin',
            code: {
              tr: `Feature: Giriş
  # Sadece onaylanmış kabul kriterlerine dayanır: AC-12, AC-13, AC-14
  Scenario: Geçerli bilgilerle giriş başarılı
    Given kullanıcı login sayfasındadır
    When geçerli e-posta ve şifre girer
    Then dashboard sayfasına yönlendirilir

  Scenario: 5 hatalı denemeden sonra hesap kilitlenir
    Given kullanıcı 4 kez hatalı şifre girmiştir
    When 5. kez hatalı şifre girer
    Then hesap 15 dakika kilitlenir`,
              en: `Feature: Login
  # Based only on confirmed acceptance criteria: AC-12, AC-13, AC-14
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When they enter a valid email and password
    Then they are redirected to the dashboard

  Scenario: Account locks after 5 failed attempts
    Given the user has entered the wrong password 4 times
    When they enter the wrong password a 5th time
    Then the account locks for 15 minutes`,
            },
          },
          promptLabCrossCallout,
          testCaseFromStoryAnimation,
          testCaseGherkinOrder,
          testCasePlayground,
          {
            type: 'quiz',
            question: `Claude generated 8 Gherkin scenarios for a checkout feature in one shot, without ever asking about the story's ambiguous "partial refund" rule. What went wrong in the PROCESS, not the output?`,
            options: [
              { id: 'a', text: 'Nothing — 8 scenarios is already a lot of coverage' },
              { id: 'b', text: 'The tester skipped step one — asking Claude to list ambiguities BEFORE generating — so the model filled the partial-refund gap with a plausible but unverified assumption' },
              { id: 'c', text: 'The Gherkin format itself caused the problem' },
              { id: 'd', text: 'Claude should have refused to generate anything without a fully specified story' },
            ],
            correct: 'b',
            explanation: `Skipping the ambiguity-first step means the oracle gap (what SHOULD "partial refund" mean here?) never reaches a human. Claude does not refuse an ambiguous request — it produces the most statistically plausible completion, which reads as confident but may not match your actual business rule.`,
            retryQuestion: {
              question: `A generated scenario says "Then a partial refund of 50% is issued" but your acceptance criteria never specify a percentage. What is the senior move?`,
              options: [
                { id: 'a', text: 'Keep it — 50% is a common default in refund systems' },
                { id: 'b', text: 'Flag it as an unconfirmed assumption, verify the real rule with the product owner, and only add it to the suite once confirmed — this is the oracle problem in a single line' },
                { id: 'c', text: 'Delete the entire scenario — refunds cannot be tested with AI help' },
                { id: 'd', text: 'Change it to 100%, since that is the safer number' },
              ],
              correct: 'b',
              explanation: `A plausible-sounding number is not a confirmed rule. The senior habit is to treat any unverified detail in AI output as a flagged assumption requiring a real answer, not a coin flip between two guesses.`,
            },
          },
        ],
      },
      {
        title: `🐛 Bug Analysis & Reporting`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧳',
            content: `Pasting a raw, unsanitized log into Claude is like handing a courier your entire wallet to deliver one document — the mechanism is exact: the courier only needed the document (the error line), not the ID card and credit cards (session tokens, emails, IPs) that happened to be in the same envelope (the log file). Here is the question worth sitting with: if Claude only needs the ERROR to help you, why do so many testers paste the entire raw log, customer emails and auth tokens included? Because scrubbing feels like an extra step of friction — but that friction IS the safety mechanism: once a secret leaves your terminal into any external service's request, you cannot revoke that exposure the way you can rotate a leaked API key you control. Java comparison: this is the same category of mistake as catch(Exception e) { log.error(e.getMessage()) } where getMessage() happens to contain a raw JDBC connection string with a password — logging frameworks that don't scrub are a known source of real incidents, and pasting into an AI chat is the same sink with one extra hop (a third party) removed. The QA stake is not hypothetical: a leaked session token or customer email in a shared Claude conversation (a screenshot posted in a team channel, an enterprise log-retention policy) is a real privacy incident — sanitize BEFORE you paste, every time, not after you notice something looks sensitive.`,
          },
          { type: 'heading', text: `From Stack Trace to Ranked Hypotheses` },
          {
            type: 'text',
            content: `Paste the sanitized stack trace and ask Claude to rank possible root causes by likelihood, with reasoning for each — not to declare a single "the" cause. Treat the answer as a set of hypotheses to test, the same way you would treat a colleague's educated guess, not as a verdict.`,
          },
          {
            type: 'text',
            content: `Reasoning: why paste a FLAKY test's last 3-5 run logs together instead of just the latest failure? A single failure log looks like a normal one-time hypothesis: "the element wasn't found." But 3-5 logs across different intermittent points can expose a PATTERN — always fails when run in parallel, or only after a specific prior test — that no single log can reveal. The fix lives in the pattern, not in any individual stack trace.`,
          },
          {
            type: 'table',
            headers: ['Input You Paste', 'What to Ask For', 'What You Still Own'],
            rows: [
              ['Sanitized stack trace / log', 'Rank likely root causes by probability, with reasoning for each', 'Confirming which hypothesis is actually true by reproducing it'],
              ['3-5 runs of a flaky test\'s logs', 'Identify the pattern across runs (timing, order, environment)', 'Deciding whether the fix is a code change or a test-isolation issue'],
              ['Repro steps + business impact', 'Draft a bug report with a suggested severity/priority and justification', 'The final severity/priority call — Claude does not know today\'s production traffic'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# YANLIŞ: ham log olduğu gibi yapıştırılır
[ERROR] user=ayse.yilmaz@sirket.com token=eyJhbGciOiJIUzI1NiIs... login failed at LoginService.java:42

# DOĞRU: hassas veri temizlendikten sonra yapıştırılır
[ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42`,
              en: `# WRONG: the raw log is pasted as-is
[ERROR] user=ayse.yilmaz@company.com token=eyJhbGciOiJIUzI1NiIs... login failed at LoginService.java:42

# CORRECT: sensitive data is scrubbed before pasting
[ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42`,
            },
          },
          bugAnalysisAnimation,
          bugAnalysisOrder,
          bugReportPlayground,
          {
            type: 'quiz',
            question: `You paste a raw log containing a customer's email and an active session token into Claude to get a root-cause hypothesis. What is wrong with this action, independent of whether the hypothesis turns out correct?`,
            options: [
              { id: 'a', text: 'Nothing — the conversation is private' },
              { id: 'b', text: 'You exposed personally identifiable information and a live credential to an external service before scrubbing them — an exposure that cannot be undone the way a leaked API key can be rotated' },
              { id: 'c', text: 'Claude cannot process logs containing real data anyway, so it does not matter' },
              { id: 'd', text: 'This is only a problem if the hypothesis turns out to be wrong' },
            ],
            correct: 'b',
            explanation: `Sanitization is not conditional on the outcome. A live session token pasted anywhere outside your own systems is exposed the moment it is sent — the correctness of the resulting hypothesis has no bearing on whether that exposure happened.`,
            retryQuestion: {
              question: `A flaky test fails intermittently. You paste ONE failing run's log and ask Claude for the root cause. What is missing from your approach?`,
              options: [
                { id: 'a', text: 'Nothing — one clear failure log is enough for any root-cause analysis' },
                { id: 'b', text: 'A single run cannot reveal a pattern — pasting 3-5 runs lets Claude spot what changes between failures (timing, test order, shared state), which one log cannot show' },
                { id: 'c', text: 'You should have asked for the fix directly instead of the root cause' },
                { id: 'd', text: 'Flaky tests cannot be analyzed with AI assistance at all' },
              ],
              correct: 'b',
              explanation: `Flakiness is, by definition, a pattern across runs, not a property of any single run. One log gives Claude the same blind spot it gives you: it can only theorize about what might vary, not identify what actually does.`,
            },
          },
        ],
      },
      {
        title: `🧬 Test Data Generation`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🪆',
            content: `Asking Claude for equivalence-partitioning test data is like asking a tailor for one garment per size category (XS/S/M/L/XL) instead of ordering one of every possible measurement — the mechanism matches exactly: equivalence partitioning already reduces infinite possible inputs down to representative classes, and an LLM is excellent at instantiating "one believable example per class" once you name the classes, but it cannot invent the classes correctly if you don't specify the actual business rule (what counts as a "valid" range for THIS field). Here is the question worth sitting with: if Claude can generate a thousand fake ID-shaped numbers in a second, why is it still dangerous to grab 10 REAL customer records from production for a test instead? Because a real record carries real consequences if it leaks in a shared test environment or a bug-report screenshot, while a well-formed FAKE record that merely LOOKS valid (right digit count, right checksum shape) exercises the exact same code path with zero privacy exposure. Java comparison: this is the same reasoning behind the Java Faker library shipping in test scope only, generating Faker.name().fullName() instead of hardcoding a real employee's name into a unit test fixture. The QA stake: a test database seeded with real customer PII — even in a "test" environment — is a compliance incident waiting to be discovered during an audit, while one seeded with LLM- or Faker-generated look-alike data carries the same test coverage with zero regulatory exposure.`,
          },
          { type: 'heading', text: `Boundary and Equivalence Data, On Demand` },
          {
            type: 'text',
            content: `Name the equivalence classes and boundaries explicitly in the prompt — for example, "age field: valid 18-65, invalid below 18 and above 65, boundary exactly 18 and 65." Claude then generates one instance per class instead of guessing which boundaries matter for a field it has never seen before.`,
          },
          {
            type: 'text',
            content: `Reasoning: why not just use Java Faker for everything? Faker is deterministic, fast and battle-tested for GENERIC fields (names, addresses, emails) — reach for it on every automated CI run. Claude is better when the DATA SHAPE itself needs domain judgment your Faker call doesn't encode, like "generate 5 boundary-value rows for a discount field that behaves differently above 40% due to a specific business rule." Rule of thumb: Faker for volume and CI-speed, Claude for one-off DESIGN of which values matter before you wire them into Faker or a fixed dataset.`,
          },
          {
            type: 'table',
            headers: ['Need', 'Faker (Java)', 'Claude'],
            rows: [
              ['Bulk realistic names/emails/addresses for load tests', 'Best — deterministic, offline, zero API cost per record', 'Overkill — do not spend an LLM call per test row'],
              ['Deciding which boundary/edge values matter for a specific rule', 'Cannot decide this — Faker only randomizes within a type', 'Best — reasons about the rule and proposes representative classes'],
              ['One-off realistic-looking ID / IBAN-shaped test values', 'Possible with a locale plugin, if one is maintained', 'Fast for prototyping — but verify the checksum/format algorithm is actually valid before trusting it'],
            ],
          },
          {
            type: 'code',
            language: 'sql',
            code: {
              tr: `-- İstenen format: SQL INSERT, sınır değer + equivalence class'lar dahil
INSERT INTO test_users (id, age, expected_result) VALUES
  (1, 17, 'REDDEDILDI'),   -- sınırın hemen altı (geçersiz sınıf)
  (2, 18, 'KABUL'),        -- alt sınır (geçerli sınıfın başı)
  (3, 40, 'KABUL'),        -- geçerli sınıfın ortası
  (4, 65, 'KABUL'),        -- üst sınır (geçerli sınıfın sonu)
  (5, 66, 'REDDEDILDI');   -- sınırın hemen üstü (geçersiz sınıf)`,
              en: `-- Requested format: SQL INSERT, including boundary values + equivalence classes
INSERT INTO test_users (id, age, expected_result) VALUES
  (1, 17, 'REJECTED'),   -- just below the boundary (invalid class)
  (2, 18, 'ACCEPTED'),   -- lower boundary (start of the valid class)
  (3, 40, 'ACCEPTED'),   -- middle of the valid class
  (4, 65, 'ACCEPTED'),   -- upper boundary (end of the valid class)
  (5, 66, 'REJECTED');   -- just above the boundary (invalid class)`,
            },
          },
          testDataAnimation,
          testDataOrder,
          testDataPlayground,
          {
            type: 'quiz',
            question: `You need 500 realistic fake customer names and emails for a load test running every night in CI. What is the right tool for this specific need?`,
            options: [
              { id: 'a', text: 'Ask Claude to generate all 500 in one prompt' },
              { id: 'b', text: 'Java Faker (or an equivalent library) — deterministic, fast, offline, and built exactly for bulk generic field generation; an LLM call per CI run adds cost and latency for no design benefit' },
              { id: 'c', text: 'Copy 500 real customer records from a backup, since they are the most realistic' },
              { id: 'd', text: 'Hand-write 500 rows manually for accuracy' },
            ],
            correct: 'b',
            explanation: `The task has no design ambiguity — it is pure volume of generic fields, exactly Faker's specialty. Reaching for an LLM here adds latency and cost to every CI run for output that a deterministic library already produces instantly and offline.`,
            retryQuestion: {
              question: `Claude generates a batch of test data that includes numbers formatted exactly like real national ID numbers, complete with a valid-looking checksum. What must you verify before this data touches a shared test database?`,
              options: [
                { id: 'a', text: 'Nothing — if Claude generated it, it must be fake' },
                { id: 'b', text: 'That every generated value is genuinely fictional and does not coincidentally collide with a real identifier, plus that your team\'s data policy allows even format-valid fake IDs in that environment' },
                { id: 'c', text: 'That the checksum algorithm is publicly documented' },
                { id: 'd', text: 'This is a Faker-only concern, not relevant when Claude generates the data' },
              ],
              correct: 'b',
              explanation: `An LLM does not guarantee non-collision with real identifiers, and format-valid fake data can still trip compliance rules in some organizations. "Claude made it up" is not a substitute for your team's actual data-handling policy.`,
            },
          },
        ],
      },
      {
        title: `🤖 UI Automation: Selenium & Playwright`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗝️',
            content: `Asking Claude to generate a locator from a pasted HTML snippet is like asking a locksmith to cut a key from a PHOTOGRAPH of a lock instead of the lock itself — the mechanism is exact: a photograph (a static HTML snippet) shows the lock's shape at one instant, but if the actual lock (the live DOM) has a slightly different keyway the next time the page renders (a re-ordered class list, a dynamically generated id), the cut key (the generated locator) may not fit. Here is the question worth sitting with: if Claude produced a working XPath from your snippet, why does it break on the next deploy when nothing about the FEATURE changed? Because a fragile locator (a deep XPath position, a framework-generated class hash) encodes the DOM's accidental structure, not the developer's intent — and Claude, working only from a frozen HTML snapshot, has no way to know which attributes are STABLE (a QA-owned data-testid) versus INCIDENTAL (a CSS-module hash) unless you tell it to prefer the former. Java comparison: this is the same fragility class as hardcoding a reflection call to a private field by its exact declaration order — it happens to compile and run today, but the contract you're actually relying on was never a guarantee. The QA stake: a CI suite full of Claude-generated XPath locators that quietly break on every unrelated frontend refactor is slower to maintain than the manual locators it replaced — the fix is prompting Claude to prefer data-testid, not accepting whatever selector it invents first.`,
          },
          { type: 'heading', text: `From HTML Snippet to a Locator That Survives a Refactor` },
          {
            type: 'text',
            content: `Paste the actual HTML element (not a description of it), and explicitly instruct Claude to prefer a stable attribute (data-testid, aria-label, a role) over positional/structural selectors (nth-child, deep XPath). If no stable attribute exists in the pasted HTML, ask Claude to flag that gap explicitly rather than silently inventing a fragile fallback.`,
          },
          {
            type: 'text',
            content: `Reasoning: why generate a full Page Object Model skeleton instead of one-off locators? A POM centralizes exactly the fragility risk above into ONE file per page — if a locator breaks, you fix it in one place instead of hunting through every test that duplicated it inline. Claude is good at the MECHANICAL skeleton (class structure, constructor, method names mirroring user actions) once you give it the page's HTML and the actions you need — but the actual selector STRINGS inside it still need your review for stability, exactly like the previous point.`,
          },
          {
            type: 'table',
            headers: ['Task', 'Prompt Element to Include', 'What You Still Verify'],
            rows: [
              ['Generate a locator', 'The actual pasted HTML element + "prefer data-testid/aria-label over XPath position"', 'Run it against the live page before trusting it — a plausible selector is not a working one'],
              ['Generate a Page Object skeleton', 'The page\'s key elements + the actions your tests perform (login, submit, navigate)', 'That method names match your test\'s actual vocabulary, not Claude\'s guess at it'],
              ['Fix a broken test', 'The exact failure message/stack trace + the current locator/code, not a description of the bug', 'That the fix addresses the real DOM change, not just silences the assertion'],
            ],
          },
          { type: 'heading', text: `Page Object Model: Java Selenium vs TypeScript Playwright` },
          {
            type: 'code',
            language: 'java',
            label: 'Java (Selenium)',
            code: {
              tr: `public class LoginPage {
    private WebDriver driver;

    // Konum yerine kararlı data-testid nitelikleri kullanılır
    private By emailInput = By.cssSelector("[data-testid='login-email']");
    private By passwordInput = By.cssSelector("[data-testid='login-password']");
    private By submitButton = By.cssSelector("[data-testid='login-submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String email, String password) {
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitButton).click();
    }
}`,
              en: `public class LoginPage {
    private WebDriver driver;

    // Stable data-testid attributes are used instead of position
    private By emailInput = By.cssSelector("[data-testid='login-email']");
    private By passwordInput = By.cssSelector("[data-testid='login-password']");
    private By submitButton = By.cssSelector("[data-testid='login-submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String email, String password) {
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitButton).click();
    }
}`,
            },
          },
          {
            type: 'code',
            language: 'typescript',
            label: 'TypeScript (Playwright)',
            code: {
              tr: `export class LoginPage {
  constructor(private page: Page) {}

  // Aynı kararlı data-testid nitelikleri, Playwright locator API'si
  private email = this.page.getByTestId('login-email');
  private password = this.page.getByTestId('login-password');
  private submit = this.page.getByTestId('login-submit');

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}`,
              en: `export class LoginPage {
  constructor(private page: Page) {}

  // Same stable data-testid attributes, Playwright locator API
  private email = this.page.getByTestId('login-email');
  private password = this.page.getByTestId('login-password');
  private submit = this.page.getByTestId('login-submit');

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}`,
            },
          },
          uiFixLoopAnimation,
          uiFixLoopOrder,
          uiLocatorFixPlayground,
          {
            type: 'quiz',
            question: `Claude generates a working XPath locator from your pasted HTML, and the test passes today. Two weeks later, after an unrelated frontend refactor, the same test fails. What is the most likely explanation?`,
            options: [
              { id: 'a', text: 'Claude\'s model quality degraded over the two weeks' },
              { id: 'b', text: 'The XPath likely encoded the DOM\'s incidental structure (element position, generated class names) rather than a stable, developer-owned attribute — refactors change incidental structure freely' },
              { id: 'c', text: 'XPath locators always break regardless of how they are written' },
              { id: 'd', text: 'The test itself must have a logic bug unrelated to the locator' },
            ],
            correct: 'b',
            explanation: `Position and structure are never a contract a frontend team promises to preserve; a data-testid or aria-label is. A locator generated from a frozen HTML snapshot, without an explicit instruction to prefer stable attributes, has no way to distinguish the two.`,
            retryQuestion: {
              question: `Claude generates a complete Page Object Model class for your login page, including method names and locators. What must you still do before trusting it in your suite?`,
              options: [
                { id: 'a', text: 'Nothing — a generated POM skeleton is always production-ready' },
                { id: 'b', text: 'Run it against the live page to confirm the locators actually resolve, and check that method names match your test\'s real vocabulary rather than Claude\'s guess at it' },
                { id: 'c', text: 'Rewrite the entire class manually, since generated code is never usable' },
                { id: 'd', text: 'Only check that the class compiles — a compiling locator is a working locator' },
              ],
              correct: 'b',
              explanation: `Compiling is not the same as resolving on the live DOM — a plausible selector string is not a verified one. The mechanical skeleton (structure, naming) is where Claude is strong; whether the specific selectors and method names actually match your app and your team's vocabulary is still your call.`,
            },
          },
        ],
      },
      {
        title: `🔌 Claude for API Testing`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: `Asking Claude to write API test assertions from a pasted response JSON is like asking an inspector to write a building code checklist after seeing photos of ONE finished room — the mechanism is exact: the photo shows what the response happened to look like this once (the actual JSON), but a good assertion set also needs to cover what happens when the room ISN'T finished correctly (a missing field, a wrong type, an error status) — information the happy-path response alone never shows you. Here is the question worth sitting with: if Claude can read your 200 OK JSON and write perfect assertions for every field in it, why is that suite still incomplete? Because it only saw the happy path — nobody showed it what a 422 validation error or a 500 looks like, so it cannot assert on failure shapes it never saw; you must supply or explicitly request those scenarios. Java comparison: this is like writing JUnit assertions purely from a single passing run's captured output instead of from the actual API contract (the OpenAPI spec) — you'll perfectly test what happened once, and miss what the contract actually promises for edge cases. The QA stake: an API suite that's 100% green but never asserts on a documented 400/401/404/500 behavior gives false confidence exactly where production incidents (bad input, auth failures, downstream timeouts) actually happen.`,
          },
          { type: 'heading', text: `From Response JSON to Real Assertions` },
          {
            type: 'text',
            content: `Paste one real response and add the explicit constraint "also ask what happens for X invalid input" — Claude then proposes assertions for the happy path field-by-field and, if asked, hypothesizes plausible 4xx/5xx shapes to also assert once you confirm the real contract.`,
          },
          {
            type: 'text',
            content: `Reasoning: why paste the OpenAPI spec instead of just describing the endpoint in words? An OpenAPI definition is already the same Given/When/Then-style forcing function as Gherkin — it names every parameter, its required/optional flag and the response schema explicitly, removing exactly the kind of oracle ambiguity discussed in the Test Case Generation tab. If you don't have an OpenAPI spec, describing the endpoint informally still works, but expect more of Claude's output to be flagged assumptions rather than confirmed rules.`,
          },
          {
            type: 'table',
            headers: ['Input', 'What to Ask For', 'Framework Output'],
            rows: [
              ['OpenAPI/endpoint definition', 'Generate positive + negative test scenarios covering every documented status code', 'REST Assured (Java) test class OR a Postman/Bruno test script — specify which'],
              ['A real 200 OK response body', 'Field-by-field assertions, plus what a missing/null/wrong-type field SHOULD look like', 'Assertion code in your chosen framework'],
              ['(no real response for the error path)', 'Hypothesize the likely 4xx/5xx shape based on the spec, flagged as unconfirmed until reproduced', 'A draft assertion you verify against a real error response before trusting it'],
            ],
          },
          {
            type: 'code',
            language: 'java',
            label: 'REST Assured (Java)',
            code: {
              tr: `given()
    .header("Authorization", "Bearer " + token)
.when()
    .get("/api/users/{id}", 42)
.then()
    .statusCode(200)
    .body("id", equalTo(42))
    .body("email", notNullValue())
    // Sözleşmeye göre henüz doğrulanmamış: 404 durumunda body şekli
    .body("email", containsString("@"));`,
              en: `given()
    .header("Authorization", "Bearer " + token)
.when()
    .get("/api/users/{id}", 42)
.then()
    .statusCode(200)
    .body("id", equalTo(42))
    .body("email", notNullValue())
    // Not yet confirmed against the contract: the body shape on a 404
    .body("email", containsString("@"));`,
            },
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'Postman / Bruno test script',
            code: {
              tr: `// tests bloğu - Postman/Bruno ikisinde de aynı sözdizimi
pm.test("status is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("email field is valid", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.include("@");
});`,
              en: `// tests block - same syntax in both Postman and Bruno
pm.test("status is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("email field is valid", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.include("@");
});`,
            },
          },
          apiAssertionAnimation,
          apiAssertionOrder,
          apiAssertionPlayground,
          {
            type: 'quiz',
            question: `An API test suite is 100% green: every assertion on the 200 OK response passes. The suite has never once asserted on the documented 404 or 422 behavior. What is the real state of this suite's coverage?`,
            options: [
              { id: 'a', text: 'Complete — a fully green suite means the API is fully tested' },
              { id: 'b', text: 'Incomplete — it only validated the happy path; the documented error behaviors, which is exactly where real production incidents (bad input, missing auth) occur, were never exercised' },
              { id: 'c', text: 'Error status codes cannot be tested with Claude\'s help' },
              { id: 'd', text: 'The suite is complete as long as REST Assured is used' },
            ],
            correct: 'b',
            explanation: `"100% green" only describes what was actually asserted, not what the contract promises. A suite that never touches documented 4xx/5xx behavior has a coverage gap in exactly the area most likely to cause a real incident.`,
            retryQuestion: {
              question: `Claude hypothesizes that a malformed email should return a 422 with { "error": "invalid_email" }, but you have never actually triggered this response. What must happen before this assertion enters your suite?`,
              options: [
                { id: 'a', text: 'Nothing — Claude\'s hypothesis is trained on real API conventions, so it is safe to trust' },
                { id: 'b', text: 'You reproduce the actual 422 response by sending a malformed email yourself, and confirm the real shape matches the hypothesis before adding the assertion' },
                { id: 'c', text: 'The hypothesis should be discarded — AI cannot reason about error responses' },
                { id: 'd', text: 'Add it directly, then fix it later if it turns out wrong' },
              ],
              correct: 'b',
              explanation: `A plausible error shape is still a guess until reproduced. Adding an unverified assertion "to fix later" is how a suite ends up asserting on behavior that was never real, silently passing for the wrong reason if the actual API ever matches the guess by coincidence.`,
            },
          },
        ],
      },
      {
        title: `💻 Claude Code: Agent in the Terminal`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧑‍💼',
            content: `Claude Code is like handing a very capable new team member a keyboard and telling them "you may touch these files, run these commands, but ask before doing THAT" — the mechanism is exact: permission modes (ask-every-time vs. auto-approve for read-only vs. full access) are literally the boundary of what the new hire is allowed to do without a manager present, the same distinction between a junior who needs sign-off on every commit and a senior with merge rights. Here is the question worth sitting with: if Claude Code can read a failing test, run it, and edit the fix itself, why would you ever want it to ASK before running a command instead of just doing it? Because the blast radius of an autonomous agent scales with what it's allowed to touch — a read-only permission mode is safe by construction (nothing to undo), while a mode that can run arbitrary shell commands or push to a branch needs the same review discipline you'd apply to a new hire's first unsupervised week. Java comparison: this is access control the same way a role-based permission system draws a line between "can read this resource" and "can write/execute" it — you don't grant the wider permission just because the narrower one works fine. The QA stake: an agent given unreviewed write+execute access to a shared CI runner or a production-adjacent branch, without a human checking its diffs, is a supply-chain-shaped risk — the same category of concern covered on this platform's own security page, just with an AI as the actor instead of a human attacker.`,
          },
          { type: 'heading', text: `The Read → Run → Fix → Re-run Loop` },
          {
            type: 'text',
            content: `Once given permission, Claude Code reads the failing test file, executes it, reads the actual error output, proposes an edit, and re-runs — the same debugging loop a developer does manually, but the agent does it in the same terminal session without you retyping every command in between.`,
          },
          {
            type: 'text',
            content: `Meta-example — this very platform: this project's own repository has a CLAUDE.md file at its root, a written constitution the agent reads at the start of every session so it doesn't have to be told the same project rules over and over. A representative excerpt (not the real file, a stand-in of the same shape):`,
          },
          {
            type: 'code',
            language: 'markdown',
            code: {
              tr: `# CLAUDE.md (örnek özet, gerçek dosya değil)
## Kurallar
- İçerik değişikliği src/data/*.js dışına taşmaz.
- Her yeni kod bloğu bir practice/animasyon ile eşleşmeli.
- Build'i her değişiklikten sonra çalıştır.`,
              en: `# CLAUDE.md (representative summary, not the real file)
## Rules
- Content changes stay within src/data/*.js.
- Every new code block must pair with a practice/animation.
- Run the build after every change.`,
            },
          },
          {
            type: 'text',
            content: `Reasoning: why write project rules into a file the agent reads, instead of repeating them in every prompt? Because a file like this is read ONCE per session and then silently informs every subsequent action — the same reason a team writes a CONTRIBUTING.md instead of re-explaining code style in every pull request review.`,
          },
          { type: 'heading', text: `Permission Modes and Safe Usage` },
          {
            type: 'text',
            content: `Ask-every-time, auto-approve-read-only, and auto-approve-all are different points on the same blast-radius scale. Pick the narrowest mode that lets the agent do the task, and review diffs before accepting write actions on shared or production-adjacent branches — the same discipline you'd apply to any new team member's unsupervised first week.`,
          },
          { type: 'heading', text: `Command-Line Patterns` },
          {
            type: 'code',
            language: 'bash',
            code: {
              tr: `# İnteraktif ajan oturumu başlat
claude

# Tek seferlik, headless bir görev çalıştır (CI'da kullanışlı)
claude -p "flaky testleri bul ve nedenini raporla"

# Belirli bir görevle başlat, sonra manuel devam et
claude "son commit'teki başarısız testi düzelt"`,
              en: `# Start an interactive agent session
claude

# Run a one-off, headless task (useful in CI)
claude -p "find flaky tests and report why"

# Start with a specific task, then continue manually
claude "fix the failing test from the last commit"`,
            },
          },
          claudeCodeLoopAnimation,
          claudeCodeLoopOrder,
          claudeCodeScopedTaskPlayground,
          {
            type: 'quiz',
            question: `Why would a senior tester deliberately choose a read-only permission mode for Claude Code on a shared branch, even though a full-access mode would let it fix the failing test faster?`,
            options: [
              { id: 'a', text: 'Read-only mode is always slower and offers no real safety benefit' },
              { id: 'b', text: 'A read-only mode is safe by construction — nothing to undo — while a write-capable agent on a shared branch needs the same diff-review discipline as any new hire\'s unsupervised changes' },
              { id: 'c', text: 'Claude Code cannot run tests in read-only mode' },
              { id: 'd', text: 'Permission modes only affect speed, not risk' },
            ],
            correct: 'b',
            explanation: `Speed and blast radius are separate axes. A faster, write-capable agent on a branch other people rely on introduces a real risk (an unreviewed change landing where others build on it); the narrower mode trades some speed for the guarantee that nothing happens without your review.`,
            retryQuestion: {
              question: `You tell Claude Code "fix all the tests" on your main branch with auto-approve-all permissions enabled. What is the most likely problem with this instruction, independent of whether the fixes turn out correct?`,
              options: [
                { id: 'a', text: 'Nothing — a broader instruction just means more gets fixed faster' },
                { id: 'b', text: 'The scope is unbounded, so the agent can modify any number of unrelated files without your review — the instruction should be scoped to a specific file or test with a request to show the fix before applying it' },
                { id: 'c', text: 'Claude Code cannot process instructions covering multiple files' },
                { id: 'd', text: 'This is only a problem if the tests were already passing' },
              ],
              correct: 'b',
              explanation: `An unbounded instruction combined with auto-approve-all permissions removes both scope AND review — exactly the two safeguards that limit an autonomous agent's blast radius. Correctness of the eventual fixes does not retroactively make the missing safeguards safe.`,
            },
          },
        ],
      },
      {
        title: `🔗 MCP (Model Context Protocol)`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔌',
            content: `MCP is like a hospital's standardized equipment port — the mechanism is exact: before a standard port existed, every device (an infusion pump, a monitor) needed its own custom connector built for each specific hospital bed; MCP defines one standard interface that any tool (a browser driver, a database reader, a ticketing system) can plug into, and any AI agent that speaks the protocol can use it without a custom integration per tool. Here is the question worth sitting with: if Claude could already "browse the web" by generating Selenium code for you to run, why do we need a SEPARATE protocol for it to control a browser directly? Because generating code you run yourself and an agent directly driving a live browser through a standardized tool interface are different capability classes — the first still requires you to execute and report results back manually; MCP lets the agent see the actual DOM or query result and decide its next action in the same loop, without you being the messenger. Java comparison: this is the same leap as JDBC standardizing "any Java program can talk to any database" instead of writing a custom driver per vendor — MCP standardizes "any AI agent can talk to any external tool," and a browser or database becomes just another JDBC-shaped connector. The QA stake: an MCP-connected agent that can query your test database directly is powerful for verifying seeded data, but the same connection is a real credential with real write access if misconfigured — the permission boundary matters exactly as much as it did for Claude Code CLI in the previous tab, just extended to external systems instead of your local filesystem.`,
          },
          { type: 'heading', text: `Real Browser Control vs. Generated Code` },
          {
            type: 'text',
            content: `Without MCP, asking Claude for browser automation gets you Selenium/Playwright CODE that YOU must run and report results from. With a Playwright-MCP-style connection, Claude can drive an actual browser session directly — navigate, click, read the resulting DOM — and decide its next step in the same conversation, closing the loop that previously required you as a manual relay.`,
          },
          {
            type: 'text',
            content: `Reasoning: why would a QA engineer want an agent to control a REAL browser instead of just generating a script? Because some tasks are exploratory, not scripted — "log in and tell me what breaks" has no pre-written test to run; a live-browser-connected agent can improvise the way a manual tester does, while a generated script can only execute exactly what was written in advance.`,
          },
          { type: 'heading', text: `Database MCP for Test Data Verification` },
          {
            type: 'text',
            content: `A database-connected MCP server lets Claude query a test database directly to verify seeded data or confirm a bug's actual state, instead of you copy-pasting query results back and forth. The same read-only-first discipline as Claude Code applies: a read-only DB connection is safe by construction, while a write-capable one needs the same review discipline as a write-capable CLI permission mode.`,
          },
          {
            type: 'table',
            headers: ['MCP Connection', 'What It Enables', 'Permission Boundary to Set'],
            rows: [
              ['Browser (Playwright-style)', 'The agent navigates, clicks and reads a live page directly, without you relaying results', 'Which environment it may open — never point it at production by default'],
              ['Database', 'The agent queries test data directly to verify seeding or reproduce a bug', 'Read-only by default; write access reviewed the same as a CLI write permission'],
              ['(any third-party tool server)', 'The agent calls that tool\'s actions as part of its own reasoning loop', 'Scope credentials to the narrowest tool/action the task actually needs'],
            ],
          },
          {
            type: 'code',
            language: 'bash',
            code: {
              tr: `# Örnek: bir tarayıcı MCP server'ını projeye ekle (isim/sürüm kavramsaldır)
claude mcp add playwright-browser

# Örnek: salt-okunur bir veritabanı MCP server'ı ekle
claude mcp add test-database --read-only`,
              en: `# Example: add a browser MCP server to the project (name/version is conceptual)
claude mcp add playwright-browser

# Example: add a read-only database MCP server
claude mcp add test-database --read-only`,
            },
          },
          mcpFlowAnimation,
          mcpFlowOrder,
          mcpScopedTaskPlayground,
          {
            type: 'quiz',
            question: `What is the key capability difference between "Claude generates Playwright code for you to run" and "Claude drives a browser through an MCP connection"?`,
            options: [
              { id: 'a', text: 'There is no real difference — both approaches produce the same test coverage' },
              { id: 'b', text: 'With MCP, the agent sees the actual DOM/response and decides its next action directly, closing the loop; with generated code, you remain the manual relay who runs it and reports results back' },
              { id: 'c', text: 'MCP is only useful for database access, never for browsers' },
              { id: 'd', text: 'Generated code is always more reliable than a live MCP connection' },
            ],
            correct: 'b',
            explanation: `Generating code you must execute yourself keeps a human in the loop as the messenger between the agent and the real system. An MCP connection removes that hop — the agent perceives real results and acts on them directly, which is what enables exploratory, non-scripted tasks.`,
            retryQuestion: {
              question: `A teammate configures a database MCP connection with full write access and points it at the same database used for production reporting, "just to save time setting up a separate test instance." What is the risk here?`,
              options: [
                { id: 'a', text: 'None — MCP connections are inherently safe regardless of scope' },
                { id: 'b', text: 'An agent with write access to a production-adjacent database can modify real data as part of its own reasoning loop — the same blast-radius concern as an unreviewed CLI write permission, just extended to a live database' },
                { id: 'c', text: 'This is only a problem if the agent makes a mistake' },
                { id: 'd', text: 'Database MCP connections cannot have write access by design' },
              ],
              correct: 'b',
              explanation: `Correctness is not the safeguard here — scope is. An agent with write access to a system used for production reporting can alter real data as a side effect of pursuing its task, regardless of whether any individual action it takes is a "mistake". The fix is the same one from Claude Code: grant the narrowest permission and environment the task actually needs.`,
            },
          },
        ],
      },
      {
        title: `🏗️ CI/CD & AI in the Team`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: `A team's shared prompt library is like a shared Java utility class (a StringUtils or DateUtils) — the mechanism is exact: instead of every developer re-inventing "how do I ask Claude to write boundary test data" from scratch each time, with subtly different quality every time, the team writes ONE well-tuned prompt template once, and everyone reuses it, the same way nobody rewrites their own leftPad() when a tested utility already exists. Here is the question worth sitting with: if every tester on the team can already write working prompts individually, why bother maintaining a shared library at all? Because "working" and "consistently good" are different bars — without a shared template, five testers produce five different qualities of Gherkin scenario or bug report, some skipping the ambiguity-first step, some skipping PII scrubbing; a shared, reviewed template raises the FLOOR for the whole team, not just the ceiling for the best prompt-writer. Java comparison: this is exactly the reasoning for extracting a repeated snippet into a shared utility method reviewed once in a pull request, instead of trusting every future caller to copy it correctly by hand. The QA stake: a team without a shared prompt library relearns the same lessons (forgetting to ask for negative scenarios, pasting unsanitized logs) independently and repeatedly — the same class of avoidable waste as not having a shared Page Object Model.`,
          },
          { type: 'heading', text: `Claude in the PR Review Loop` },
          {
            type: 'text',
            content: `Using Claude (via GitHub Actions or manually) for a first-pass PR review — summarizing a diff, drafting a commit/PR description, flagging an obviously risky change — is a supplement to human review, not a replacement. The human reviewer still owns the merge decision.`,
          },
          {
            type: 'text',
            content: `Reasoning: why is "Claude approved this PR" a category error? Approval is a judgment about whether a change is safe for THIS codebase, THIS team's standards and THIS release timing — none of which Claude has full visibility into from a diff alone. Its real value is surfacing what a tired human reviewer might miss (an unhandled edge case, a missing test) — a first pass, not a final say.`,
          },
          { type: 'heading', text: `Summarizing Test Reports for the Team` },
          {
            type: 'text',
            content: `Pasting a large test run's failure summary and asking Claude to produce a short, human-readable summary for a standup or a team update is genuinely useful — but the same "verify before repeating a number" discipline applies: if Claude says "12 failures, mostly in the checkout module," confirm that grouping against the actual report before stating it as fact in a meeting.`,
          },
          { type: 'heading', text: `Building a Team Prompt Library` },
          {
            type: 'text',
            content: `Once a prompt proves itself through the iteration discipline from the Prompt Engineering tab, promote it into a shared, version-controlled file the whole team can reuse and improve — reviewed the same way a shared utility method would be, not copy-pasted ad hoc from person to person.`,
          },
          {
            type: 'table',
            headers: ['Team Practice', 'Why It Matters', 'Who Owns It'],
            rows: [
              ['Shared prompt library (test case, bug report, test data templates)', 'Raises the floor for the whole team, not just the best prompt-writer', 'Reviewed and versioned like shared code, not copy-pasted informally'],
              ['AI-assisted PR review (summary, first-pass risk flags)', 'Catches obvious gaps faster, before a human review round', 'The human reviewer, who still owns the final merge decision'],
              ['Team rule: no AI-generated test/code merges without a human diff review', 'Protects junior testers from confidently-wrong output reaching production', 'Senior engineers, who set and enforce the review bar'],
            ],
          },
          {
            type: 'code',
            language: 'markdown',
            label: 'prompt-templates/test-case-from-story.md',
            code: {
              tr: `Sen kıdemli bir QA mühendisisin.
Önce belirsizlikleri listele: {{user_story}}
Onaylandıktan sonra {{n}} adet Gherkin senaryosu yaz.`,
              en: `You are a senior QA engineer.
First list the ambiguities: {{user_story}}
Once confirmed, write {{n}} Gherkin scenarios.`,
            },
          },
          promptLibraryLifecycleAnimation,
          promptLibraryLifecycleOrder,
          promptTemplatePlayground,
          {
            type: 'quiz',
            question: `A GitHub Actions workflow runs Claude on every PR and posts "✅ Looks good" as a comment. A junior treats this comment as approval and merges without further review. What is the flaw in this workflow?`,
            options: [
              { id: 'a', text: 'There is no flaw — an AI comment is equivalent to a human approval' },
              { id: 'b', text: 'AI review is a first-pass supplement, not a merge decision — it lacks full visibility into the codebase, team standards and release timing that a human reviewer accounts for; the human must still own the merge' },
              { id: 'c', text: 'GitHub Actions cannot run AI tools at all' },
              { id: 'd', text: 'The workflow is fine as long as the comment is worded confidently' },
            ],
            correct: 'b',
            explanation: `"Approved" is a judgment call about safety for a specific codebase and team, made from a diff alone with no deeper context. Treating an AI comment as equivalent to human sign-off removes the review step it was only ever meant to supplement.`,
            retryQuestion: {
              question: `Five testers on a team each write their own prompt for generating bug reports, with noticeably different quality — some remember to ask for a severity suggestion, others don't. What structural fix addresses this, beyond telling everyone to "write better prompts"?`,
              options: [
                { id: 'a', text: 'Nothing — prompt quality is a personal skill that can\'t be standardized' },
                { id: 'b', text: 'Promote the best-performing prompt into a shared, reviewed template in a team prompt library — this raises the floor for everyone, not just the individual skill of the best prompt-writer' },
                { id: 'c', text: 'Require everyone to use the exact same wording, with zero customization ever allowed' },
                { id: 'd', text: 'Switch to a different AI tool — the model is the source of the inconsistency' },
              ],
              correct: 'b',
              explanation: `Individual skill varies; a shared, reviewed template is a structural fix that doesn't depend on everyone independently reaching the same quality bar — the same reasoning that justifies a shared Page Object Model instead of five people writing their own locators.`,
            },
          },
        ],
      },
      {
        title: `🚨 Risks & Common Mistakes`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎭',
            content: `Trusting Claude's confident-sounding output without verification is like trusting a very well-read intern who has never actually worked at your company but speaks with total confidence — the mechanism is exact: the intern has read every textbook (an enormous training corpus) but has zero memory of YOUR specific codebase's quirks, so a confidently delivered answer and a CORRECT answer are two independent properties that happen to often coincide, not the same thing. Here is the question worth sitting with: if Claude is right most of the time, why build a whole tab of "risks" around the rare times it's wrong? Because the failure mode isn't random noise you can average away — it's SYSTEMATICALLY invisible: a hallucinated method looks exactly like a real one, a tautological assertion looks exactly like a real check, right up until it silently fails in production. Java comparison: it's the difference between a compiler error (loud, blocks the build) and a logic bug that compiles fine and passes a rushed review (silent, ships) — most of these risks are the second kind, precisely because they're syntactically perfect. The QA stake: this whole page has taught active verification habits (run it, reproduce it, check it against the acceptance criteria) — this tab collects the concrete failure shapes those habits exist to catch, so treat it as the reference checklist you hold yourself to, not a warning meant to scare you off using the tool.`,
          },
          { type: 'heading', text: `Four Risk Categories, One Discipline: Verify` },
          {
            type: 'text',
            content: `Hallucination: Claude can state a nonexistent API or method with full confidence because it predicts plausible text, not verified fact — the counter, covered in the UI Automation tab, is to always verify against the compiler, IDE or official docs before running anything. Privacy: pasting customer data, tokens or credentials into any AI conversation is an exposure the moment it's sent — the counter, covered in depth in the Bug Analysis tab, is to sanitize before pasting, every time.`,
          },
          {
            type: 'text',
            content: `Copyright & company policy: some organizations restrict what code or data can be pasted into third-party AI tools, or require review before AI-assisted code ships — the counter is knowing and following your company's actual AI usage policy; "I didn't know" is not a defense a reviewer accepts. Over-reliance (skill atrophy): a tester who always asks Claude first and never builds independent debugging instincts loses the skill of spotting a wrong assertion or a bad locator on their own — the counter is using Claude to accelerate work you already understand, not to substitute for understanding you haven't built yet; the verification habits from earlier tabs ARE that understanding, in practice.`,
          },
          {
            type: 'error-dictionary',
            relatedTopicId: 'claude-ai-risks-error-dictionary',
            framework: 'Claude AI',
            errors: [
              {
                error: 'Claude suggested a Selenium method that doesn\'t exist',
                fullMessage: `AttributeError: 'WebDriver' object has no attribute 'findElementByAI'`,
                cause: {
                  en: 'An LLM predicts plausible-looking API names; a method that matches Selenium\'s naming convention can be entirely invented (a hallucination), and nothing about its confident phrasing signals that.',
                },
                solution: {
                  en: 'Verify every suggested method against the IDE\'s autocomplete or the official Selenium docs before running it — never trust a method name because it "looks right".',
                },
                codeWrong: `# ❌ findElementByAI does not exist in Selenium — a hallucination
element = driver.findElementByAI("login button")`,
                codeFixed: `# ✅ Real Selenium API, verified against IDE autocomplete
element = driver.find_element(By.CSS_SELECTOR, "[data-testid='login-button']")`,
              },
              {
                error: 'The generated XPath broke on the first DOM change',
                fullMessage: `NoSuchElementException: Unable to locate element: //div[3]/div[2]/button`,
                cause: {
                  en: 'Claude generated a positional XPath from a frozen HTML snapshot without being told to prefer a stable attribute (see the UI Automation tab) — position is never a contract a frontend team promises to preserve.',
                },
                solution: {
                  en: 'Always instruct Claude to prefer data-testid or aria-label over positional selectors; if neither exists in the markup, ask it to flag that gap instead of guessing.',
                },
                codeWrong: `# ❌ Position-dependent, fragile XPath
driver.find_element(By.XPATH, "//div[3]/div[2]/button")`,
                codeFixed: `# ✅ A stable attribute is used instead
driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-button']")`,
              },
              {
                error: 'The AI-written assertion always returned true (a fake PASS)',
                fullMessage: `Test suite: 47 passed, 0 failed (but the login bug is still reproducible manually)`,
                cause: {
                  en: 'A generated assertion checked a value against itself or a trivially-true condition instead of the actual expected value — a tautology that passes regardless of the real behavior.',
                },
                solution: {
                  en: 'Read every generated assertion and confirm it turns red when you intentionally break the feature (mutate the code and re-run) — a real assertion should fail on a real bug.',
                },
                codeWrong: `# ❌ Tautology — this assertion always passes
assert response.status_code == response.status_code`,
                codeFixed: `# ✅ Checked against the real expected value
assert response.status_code == 200`,
              },
              {
                error: 'The log pasted into the prompt contained an API token',
                fullMessage: `[ERROR] Authorization: Bearer eyJhbGciOiJIUzI1NiIs... request failed`,
                cause: {
                  en: 'The raw log was pasted without scrubbing sensitive fields first — the same mistake covered in the Bug Analysis tab, shown here as a real incident shape.',
                },
                solution: {
                  en: 'Sanitize every log or response before pasting — replace tokens, emails and any credential-shaped value with a placeholder like <REDACTED>, regardless of how urgent the debugging feels.',
                },
                codeWrong: `# ❌ Raw log, token pasted without scrubbing
[ERROR] Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`,
                codeFixed: `# ✅ Token scrubbed before pasting
[ERROR] Authorization: Bearer <REDACTED>`,
              },
              {
                error: 'Generated test data came out in the exact format of a real national ID number and was VALID',
                fullMessage: `One of 500 records inserted into the test database happened to match a real citizen's ID number exactly (a coincidence, unnoticed until much later)`,
                cause: {
                  en: 'LLM-generated ID-shaped numbers can, by chance, collide with a real valid identifier, especially at volume — a "make it clearly fake" instruction alone does not guarantee non-collision.',
                },
                solution: {
                  en: 'For bulk realistic-ID-shaped data, prefer a deterministic generator with a documented fake-range or reserved-prefix guarantee over ad hoc LLM output; if using Claude, generate small batches and spot-check, and confirm your team\'s data policy allows format-valid synthetic IDs in that environment at all.',
                },
                codeWrong: `# ❌ Used directly, with no reserved-range or collision check
INSERT INTO test_users (national_id) VALUES ('...LLM-generated number...');`,
                codeFixed: `# ✅ Generated from a documented fake-range / reserved prefix
INSERT INTO test_users (national_id) VALUES ('00000000001'); -- reserved test prefix`,
              },
              {
                error: 'Claude used the syntax of an outdated library version',
                fullMessage: `TypeError: page.waitForSelector is not a function (the generated code used an API removed in the project's installed Playwright version)`,
                cause: {
                  en: 'The model\'s training data spans years of documentation across many library versions; without being told your exact installed version, it defaults to the most commonly-seen (often older) API shape.',
                },
                solution: {
                  en: 'State your exact framework/library version in the prompt, and cross-check any unfamiliar-looking method against your installed version\'s changelog before trusting it.',
                },
                codeWrong: `// ❌ Outdated Playwright API (removed)
await page.waitForSelector('[data-testid="submit"]');`,
                codeFixed: `// ✅ Current Playwright locator API
await page.getByTestId('submit').waitFor();`,
              },
              {
                error: 'In a long conversation, context was lost and earlier decisions were forgotten',
                fullMessage: `Claude forgot the rule stated 40 messages earlier — "base it only on confirmed acceptance criteria" — and started inventing assumptions again`,
                cause: {
                  en: 'Very long conversations can push earlier context out of effective focus, especially across many topic switches — earlier decisions compete with everything said since, without a hard memory failure being visible.',
                },
                solution: {
                  en: 'For a new feature or task, start a fresh conversation and re-paste the essential confirmed context, rather than continuing an old, long thread indefinitely.',
                },
                codeWrong: `# ❌ Continuing a 40-message-old unrelated thread for a new feature
(...40 messages of unrelated history...)
Now write tests for the payment feature.`,
                codeFixed: `# ✅ A fresh conversation, confirmed context re-pasted
You are a senior QA engineer.
Payment feature acceptance criteria: [...confirmed rules here...]`,
              },
              {
                error: 'AI output was merged without a code review',
                fullMessage: `Production incident: PR #482 (a Claude-generated test fix) merged with auto-approve, introduced a tautological assertion that masked a real regression for 3 weeks`,
                cause: {
                  en: 'Treating AI-generated code as exempt from the team\'s normal review process because "an AI already checked it" — but Claude\'s own output was never independently verified, violating the CI/CD tab\'s team-rule discipline.',
                },
                solution: {
                  en: 'Apply the same review bar to AI-generated code as to human-written code, with no exceptions — this is exactly what the CI/CD tab\'s "no AI merges without human diff review" rule exists to prevent.',
                },
                codeWrong: `# ❌ Team rule: "if AI wrote it, no review needed" (WRONG)
git merge --no-verify claude-generated-fix`,
                codeFixed: `# ✅ Team rule: AI-generated code goes through human diff review too
git push origin claude-generated-fix
# -> a PR is opened, at least 1 human approval is required, no unreviewed merges`,
              },
            ],
          },
          riskVerificationAnimation,
          riskVerificationOrder,
          uncertaintyFlagPlayground,
          {
            type: 'quiz',
            question: `A generated assertion always passes, even when you intentionally break the feature it's supposed to test. Which risk category is this, and what habit catches it?`,
            options: [
              { id: 'a', text: 'This is a privacy risk — the assertion is leaking data' },
              { id: 'b', text: 'A tautological assertion (a "fake PASS") — the counter-habit is mutating the code to intentionally break the feature and confirming the assertion actually turns red' },
              { id: 'c', text: 'This is a copyright risk related to the assertion library' },
              { id: 'd', text: 'This cannot be detected until the feature reaches production' },
            ],
            correct: 'b',
            explanation: `A tautology (checking a value against itself, or a condition that's always true) passes regardless of real behavior — it looks identical to a working assertion until you deliberately break the thing it claims to test and watch it stay green.`,
            retryQuestion: {
              question: `A junior says: "I don't need to fully understand this fix — Claude explained it works, and the test is green." What risk does this represent, and what should a senior require before merging?`,
              options: [
                { id: 'a', text: 'No risk — a green test is sufficient proof regardless of who understands the fix' },
                { id: 'b', text: 'Over-reliance (skill atrophy) — a senior should ask the junior to explain the fix in their own words before merging, the same Feynman-style check this platform teaches for learning any concept' },
                { id: 'c', text: 'This is a hallucination risk, unrelated to the junior\'s understanding' },
                { id: 'd', text: 'This is only a problem if the test later starts failing' },
              ],
              correct: 'b',
              explanation: `A green test confirms the immediate symptom, not that the underlying cause was understood — the same distinction between "compiles" and "is correct" that runs through this whole tab. Requiring an explanation in the junior's own words is a direct, practical check against skill atrophy, not busywork.`,
            },
          },
        ],
      },
      {
        title: `💼 Interview Q&A`,
        blocks: [
          {
            type: 'interview-questions',
            relatedTopicId: 'claude-ai-interview-questions',
            topic: 'Claude AI for QA Testers',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {
                level: 'basic',
                q: { en: 'You ask Claude for 20 test cases and get them instantly. A teammate says the feature is now "fully tested". What is wrong with that claim?' },
                a: { en: 'Speed and volume are not correctness — this is the oracle problem: only your acceptance criteria and domain knowledge define what "correct" behavior actually is, and Claude only knows the rules you gave it. Java comparison: it is like assuming a class is correct because it has 20 JUnit tests, without checking whether the assertion values match the actual specification. "Fully tested" requires the cases to be verified against real requirements, not just counted.' },
              },
              {
                level: 'basic',
                q: { en: 'A junior only ever pastes error messages into claude.ai to understand them. What is the natural next skill to build toward mid-level Claude use?' },
                a: { en: 'Generating test cases and test data from user stories and acceptance criteria — moving from reactive Q&A to proactive artifact generation, while still verifying every output against the real requirements. Java comparison: this mirrors going from "I ask a senior to explain a stack trace" to "I write my own JUnit test cases from a spec". The skill that matters is not the prompt itself but the verification habit that comes with it.' },
              },
              {
                level: 'basic',
                q: { en: 'Two testers ask Claude about the same login feature. One gets a generic 3-bullet answer; the other gets a professional test case table. What is most likely missing from the first prompt?' },
                a: { en: 'The four ingredients of a strong prompt — role, context (the actual acceptance criteria), task with a constraint, and output format. A vague prompt like "write tests for login" leaves the model to guess, so it returns the safest generic answer. Java comparison: it is like calling an overloaded method with everything typed as Object — you get the most generic match instead of the precise one.' },
              },
              {
                level: 'basic',
                q: { en: 'Your first Claude answer to a bug analysis request misses an edge case you actually care about. What should you do?' },
                a: { en: 'Treat the first answer as a draft and iterate — point out exactly what is missing or wrong ("this misses the case where the session already expired") and ask again, rather than starting over or accepting it as final. Java comparison: this is red-green-refactor from TDD — the first red run is information, not failure. Iteration is the normal path to a usable answer, not a sign that the tool failed.' },
              },
              {
                level: 'basic',
                q: { en: 'You need Claude to open a specific failing test file, run it, and edit the fix in the same session. Which access method actually supports this?' },
                a: { en: 'Claude Code (the CLI) or an IDE extension wrapping the same agent — the web chat at claude.ai cannot read your repository or execute commands, it only sees what you paste. Java comparison: it is the difference between emailing a colleague a stack trace and having them sit at your keyboard with IDE and terminal access. Only an agent with real file and shell access can run the test and apply a fix directly.' },
              },
              {
                level: 'basic',
                q: { en: 'A teammate wants to verify their ANTHROPIC_API_KEY is correctly formatted by pasting it into a Claude conversation. Is this safe?' },
                a: { en: 'No — an API key should be treated exactly like a database password: never typed into any conversation, local or remote, since a model transcript is not a secure secrets store. Java comparison: this is the same discipline as keeping database credentials in a gitignored environment variable instead of hardcoding them into a Java class. If exposure is suspected, the correct response is to rotate the key, not to hope no one saw it.' },
              },
              {
                level: 'basic',
                q: { en: 'Claude generates 8 Gherkin test cases for a checkout feature without ever asking about an ambiguous "partial refund" rule in the story. What process step was skipped?' },
                a: { en: 'The ambiguity-first step — asking Claude to list every unclear or missing rule BEFORE generating any test, so a human can confirm the real answer. Skipping it means the model fills the gap with a plausible but unverified assumption. Java comparison: it is like writing a JUnit test against an interface method with no Javadoc — you compile a guess instead of testing the actual contract.' },
              },
              {
                level: 'basic',
                q: { en: 'Why ask Claude to generate test cases in Gherkin format instead of a plain bullet list of test ideas?' },
                a: { en: `Given/When/Then forces an explicit precondition, action and expected result for every scenario, which is exactly the structure needed to avoid vague output — the format itself is a forcing function for specificity. Java comparison: it works like a strongly-typed method signature that forces every parameter to be supplied before the code compiles. A bullet list leaves room for missing pieces that Gherkin's structure does not.` },
              },
              {
                level: 'basic',
                q: { en: 'You want a root-cause hypothesis for a login error, but the log contains a real customer email and a session token. What must happen before you paste it into Claude?' },
                a: { en: 'The log must be sanitized — replace the email, token and any credential-shaped value with a placeholder like <REDACTED> before pasting, regardless of how urgent the debugging feels. Java comparison: this is the same discipline as never logging a raw exception message that might contain a database connection string with a password. Once a secret leaves your terminal, you cannot revoke that exposure the way you can rotate a key you control.' },
              },
              {
                level: 'basic',
                q: { en: 'You ask Claude to "generate test data for an age field" with no further detail. What will the output most likely miss?' },
                a: { en: 'It will likely miss the actual boundary values that matter for your rule, because Claude cannot invent business rules it was never given — it needs the valid/invalid ranges and exact boundary numbers stated explicitly. Java comparison: this is like asking for equivalence-partitioning data without specifying the partitions — the generator has no rule to partition around. Naming the classes explicitly is what lets Claude produce one representative value per class instead of guessing.' },
              },
              {
                level: 'basic',
                q: { en: 'Claude generates a working XPath locator from your pasted HTML, and the test passes today. Two weeks later, after an unrelated frontend refactor, the same test fails. Why?' },
                a: { en: 'The XPath most likely encoded the DOM\'s incidental structure — element position or a generated class name — rather than a stable, developer-owned attribute like data-testid, and refactors change incidental structure freely. Java comparison: this is the same fragility as a reflection call that depends on a field\'s exact declaration order — it compiles and runs today, but the "contract" it relies on was never guaranteed. The fix is instructing Claude to prefer stable attributes up front.' },
              },
              {
                level: 'basic',
                q: { en: 'An API test suite is 100% green, but it only ever asserts on 200 OK responses. What is the real state of this suite\'s coverage?' },
                a: { en: 'It is incomplete — "100% green" only describes what was actually asserted, not what the API contract promises; the documented 4xx/5xx behaviors, which is exactly where real production incidents happen, were never exercised. Java comparison: this is like writing JUnit assertions purely from one passing run\'s captured output instead of the actual interface contract. A fully green suite with a coverage gap gives false confidence in exactly the wrong place.' },
              },
              {
                level: 'basic',
                q: { en: 'Why would a tester deliberately pick a read-only permission mode for Claude Code, even though a write-capable mode would fix a failing test faster?' },
                a: { en: 'A read-only mode is safe by construction — there is nothing to undo — while a write-capable agent on a shared branch needs the same diff-review discipline you would apply to any new team member\'s unsupervised first week. Java comparison: this is access control the same way a role-based permission system separates "can read" from "can write/execute" a resource. Speed and blast radius are separate axes, and the narrower mode trades some speed for a guarantee that nothing happens without review.' },
              },
              {
                level: 'basic',
                q: { en: 'What can an MCP-connected agent do that a code-generating request (e.g. "write me a Playwright script") cannot?' },
                a: { en: 'It can perceive real results directly — navigate a live browser, read the actual DOM, query a real database — and decide its next action in the same loop, instead of requiring you to run the generated code and report results back manually. Java comparison: this is the same leap as JDBC standardizing "any Java program can talk to any database" instead of a custom driver per vendor. Generated code keeps a human as the messenger; an MCP connection removes that hop.' },
              },
              {
                level: 'basic',
                q: { en: 'Claude confidently suggests a Selenium method name you have never seen before, and the code looks syntactically clean. What is the professional first move?' },
                a: { en: 'Verify the method actually exists — check IDE autocomplete or the official documentation — before running anything, since an LLM can hallucinate a plausible-looking API that was never real. Java comparison: this is no different from double-checking an unfamiliar library call against its Javadoc before relying on it. Confident phrasing is not evidence; only an external source (compiler, docs, IDE) is.' },
              },
              // ── INTERMEDIATE ────────────────────────────────────
              {
                level: 'intermediate',
                q: { en: 'Mechanically, how does adding "You are a senior QA engineer" to a prompt change Claude\'s output?' },
                a: { en: 'It sets the perspective and vocabulary the model predicts from — the answer starts using concepts like severity, prioritization and edge-case coverage that a generic answer would skip. It does not add new facts about your project; it narrows which style of continuation is most statistically likely. Java comparison: it is closer to selecting the right overloaded method by specifying argument types more precisely, rather than adding new data to the call.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A generated Gherkin scenario reads perfectly and uses correct syntax. Is that enough to add it to your test suite?' },
                a: { en: 'No — fluent syntax is not proof of correctness; you are the oracle, and you must check the scenario against your actual acceptance criteria before trusting it, since Claude may have filled a gap with a plausible but unconfirmed assumption. Java comparison: this is the same gap between "the code compiles" and "the code is correct" — a compiler cannot catch a wrong business rule. Review is a separate step from generation, never optional.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A test fails intermittently. You paste only the latest failure log and ask Claude for the root cause. What is missing from your approach?' },
                a: { en: 'A single run cannot reveal a pattern — flakiness is, by definition, a property across runs, not of any one run; pasting 3-5 logs lets Claude spot what actually changes between failures (timing, test order, shared state). Java comparison: debugging a flaky JUnit test from one stack trace is like debugging a race condition from one thread dump — you need multiple samples to see the pattern. One log gives the model the same blind spot it gives you.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Claude suggests "Critical" severity for a bug you described. Should you accept it as-is?' },
                a: { en: 'No — ask for the severity suggestion WITH its justification, and make the final call yourself, because severity depends on today\'s actual production impact and business context that Claude cannot see from a bug description alone. Java comparison: this is like a static analyzer flagging a "Critical" code smell — useful signal, but a human still decides real-world priority. Claude proposes; the tester with domain context disposes.' },
              },
              {
                level: 'intermediate',
                q: { en: 'You need 1,000 realistic fake customer emails for a nightly load test in CI. Should you generate them with Claude or with a library like Java Faker?' },
                a: { en: 'Use Faker — it is deterministic, fast, offline and purpose-built for bulk generic field generation, while an LLM call per CI run adds latency and cost with no design benefit for a task that has no ambiguity to resolve. Java comparison: this is exactly why Faker.name().fullName() exists — nobody hand-writes or AI-generates a thousand names when a tested utility already does it instantly. Reach for Claude when the DATA SHAPE needs judgment, not when it just needs volume.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Generated test data happens to match a real national ID number format exactly, and the check digit is valid. What is the real risk here, beyond "it looks fake"?' },
                a: { en: 'An LLM-generated ID-shaped number can, by chance, collide with a real valid identifier, especially at volume — a "make it clearly fake" instruction alone does not guarantee non-collision, and your team\'s data policy may not even allow format-valid synthetic IDs in that environment. Java comparison: this is why Faker-style tools use documented reserved ranges or prefixes instead of pure randomization for ID-shaped fields. The safer fix is a deterministic generator with a guaranteed fake range, not a "clearly fake" instruction to an LLM.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Claude generates a complete Page Object Model class with method names and locators. What must you still verify before trusting it in your suite?' },
                a: { en: 'Run it against the live page to confirm the locators actually resolve, and check that the method names match your test\'s real vocabulary rather than Claude\'s guess at it — a class that compiles is not the same as one that works. Java comparison: this mirrors reviewing a generated DAO class — the structure can be mechanically correct while the actual queries or bindings are wrong. The skeleton is where Claude is strong; the specifics still need your review.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A locator breaks. You tell Claude "this test broke, fix it" without pasting the exact error or current code. What goes wrong?' },
                a: { en: 'Claude has no way to distinguish what actually changed, so it is likely to guess a new fragile selector rather than diagnosing the real DOM change — you should paste the exact failure message and current locator, and explicitly ask it to prefer a stable attribute. Java comparison: this is like asking a colleague to fix a bug from "it broke" instead of the actual stack trace — a vague repro produces a vague, possibly wrong fix. The fix loop only works when the real error feeds back into the next attempt.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Why does pasting an OpenAPI spec into Claude tend to produce better API test assertions than describing the endpoint informally in words?' },
                a: { en: 'An OpenAPI definition is already the same Given/When/Then-style forcing function as Gherkin — it names every parameter, its required/optional flag and the response schema explicitly, removing the kind of oracle ambiguity a verbal description leaves open. Java comparison: it is the difference between generating code from an interface with full Javadoc versus a one-line description of "what it roughly does". Without a spec, expect more of the output to be flagged assumptions rather than confirmed rules.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Claude hypothesizes that a malformed email should return a 422 with a specific error body, but you have never actually triggered this response. What must happen before this assertion enters your suite?' },
                a: { en: 'You must reproduce the actual 422 response yourself by sending a malformed email, and confirm the real shape matches the hypothesis before adding the assertion — an unverified "fix it later" habit lets a suite assert on behavior that was never real. Java comparison: this is like writing a JUnit assertion for an exception you have only read about in documentation but never actually caught in a debugger. A plausible error shape is still a guess until reproduced.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Why would a team write project rules into a file the agent reads at the start of every session (like this platform\'s own CLAUDE.md), instead of repeating them in every prompt?' },
                a: { en: 'Such a file is read once per session and then silently informs every subsequent action, the same reason a team writes a CONTRIBUTING.md instead of re-explaining code style in every pull request review. It reduces repeated, error-prone manual context-setting and keeps the rules versioned alongside the code they govern. Java comparison: this is the same value as a documented style guide referenced by a linter config, rather than reviewers repeating the rules by memory each time.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A tester tells Claude Code to "fix all the tests" on the main branch with auto-approve-all permissions enabled. What is the risk, independent of whether the fixes turn out correct?' },
                a: { en: 'The scope is unbounded, so the agent can modify any number of unrelated files without review — the instruction should be scoped to a specific file or test and should ask to show the fix before applying it. Java comparison: this is like giving a new hire unrestricted commit access to main on day one instead of scoping their first task to a specific module with review. Correctness of the eventual fixes does not retroactively make the missing scope and review safe.' },
              },
              {
                level: 'intermediate',
                q: { en: 'What is the practical difference between asking Claude to generate a Playwright script and using an MCP-driven browser session for the same task?' },
                a: { en: 'With generated code, you remain the manual relay — you run it and report results back; with an MCP connection, the agent sees the actual DOM directly and decides its next action in the same conversation, which is what enables exploratory tasks with no pre-written script. Java comparison: it is the difference between a code reviewer reading a diff description versus actually running the code and seeing the output. The MCP connection closes a loop that generated code leaves open.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A teammate configures a database MCP connection with full write access and points it at the database used for production reporting, "to save setup time". What is wrong here?' },
                a: { en: 'An agent with write access to a production-adjacent database can alter real data as a side effect of pursuing its own task, regardless of whether any individual action it takes looks like a "mistake" — the fix is the narrowest permission and environment the task actually needs (read-only, a real test instance). Java comparison: this is the same risk class as a test suite accidentally pointed at a production JDBC connection string. Convenience is not a substitute for environment isolation.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A GitHub Actions workflow posts Claude\'s "✅ looks good" comment on every PR, and a junior merges based on that comment alone. What is the flaw in this workflow?' },
                a: { en: 'AI review is a first-pass supplement, not a merge decision — it lacks full visibility into the codebase, team standards and release timing that a human reviewer accounts for, so the human must still own the merge. Java comparison: this is like treating a passing linter as equivalent to a code review — useful, but it checks a narrower thing than what "safe to merge" actually means. The comment should surface obvious gaps faster, not replace judgment.' },
              },
              {
                level: 'intermediate',
                q: { en: 'If every tester on a team can already write working prompts individually, why maintain a shared team prompt library?' },
                a: { en: '"Working" and "consistently good" are different bars — without a shared, reviewed template, different testers produce different quality (some skip the ambiguity-first step, some skip PII scrubbing), and a shared library raises the floor for the whole team, not just the ceiling of the best prompt-writer. Java comparison: this is the same reasoning for extracting a repeated snippet into a reviewed shared utility method instead of trusting every future caller to copy it correctly by hand. Individual skill varies; a shared artifact does not.' },
              },
              {
                level: 'intermediate',
                q: { en: 'A test suite is green, but a bug you know is real is still reproducible manually. What risk category does this suggest, and how do you confirm it?' },
                a: { en: 'This suggests a tautological assertion (a "fake PASS") — check by intentionally mutating the code to break the feature and re-running; a real assertion should turn red on a real bug, and if it stays green, the check was never testing the real behavior. Java comparison: this is the mutation-testing idea applied manually — a test that survives every mutation you introduce was never actually verifying anything. A green suite is not evidence by itself; it is only evidence once you have watched it fail on a real defect.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Generated code calls an API that was removed in the version of the library your project actually has installed. What is the root cause, and what is the fix?' },
                a: { en: 'The model\'s training data spans years of documentation across many library versions, so without being told your exact installed version it defaults to the most commonly-seen (often older) API shape — state your exact framework/library version in the prompt and cross-check unfamiliar methods against your installed version\'s changelog. Java comparison: this is the same class of issue as code generated against an old version of a Maven dependency\'s API — the fix is always specifying the actual version in use, not assuming the model knows it.' },
              },
              {
                level: 'intermediate',
                q: { en: 'In a very long conversation, Claude starts ignoring a rule you set 40 messages ago ("base everything only on confirmed acceptance criteria"). What should you do?' },
                a: { en: 'Start a fresh conversation for the new task and re-paste the essential confirmed context, rather than continuing an old, long thread indefinitely — very long conversations can push earlier decisions out of effective focus across many topic switches. Java comparison: this is similar to why a long-lived, heavily-mutated object can drift from its original invariants — sometimes the cheaper fix is a fresh instance with the correct initial state, not patching the old one further.' },
              },
              {
                level: 'intermediate',
                q: { en: 'Should a Turkish-speaking QA team write their Claude prompts in Turkish or in English for the best results?' },
                a: { en: 'Either works functionally, but consistency with the codebase\'s vocabulary matters more than the sentence language — if the test framework and docs use English technical terms (assertion, locator, fixture), keep those terms in English inside an otherwise Turkish prompt, since a Turkified term can make the model guess which concept you mean. Java comparison: this is the same discipline as keeping API and library terminology untranslated in Turkish code comments and documentation, so nothing is lost matching a term to its real API.' },
              },
              // ── ADVANCED ────────────────────────────────────────
              {
                level: 'advanced',
                q: { en: 'Mechanically, why does adding role, context, format and constraint to a prompt improve output quality more than simply making the prompt longer?' },
                a: { en: 'An LLM predicts the most plausible continuation of text; a vague prompt leaves millions of plausible continuations, so the model returns the safest generic one, while each ingredient eliminates wrong continuations — context in particular injects project rules (like a lockout policy) that exist nowhere in the training data. Length alone adds no information; specificity narrows the prediction space. Java comparison: this is closer to method overload resolution than to verbosity — the compiler (or model) picks the right match only when the argument types (the prompt\'s specific ingredients) are precise enough, not merely more numerous.' },
              },
              {
                level: 'advanced',
                q: { en: 'Claude generates 50 test cases for a payment feature in 10 seconds. What ultimately determines whether those cases are correct?' },
                a: { en: 'Your acceptance criteria and domain knowledge — the oracle that defines expected behavior lives with the tester, not inside the model, so speed and volume are presentation qualities while correctness is a judgment only you can make against the real specification. This is the oracle problem in its purest form: testing\'s oldest question, "who decides what correct behavior is," is never answered by the AI itself. Java comparison: Claude is like a code generator that writes JUnit tests with perfect syntax — only the person who knows the expected behavior can write correct assertion values, no matter how fast the boilerplate arrives.' },
              },
              {
                level: 'advanced',
                q: { en: 'Why does pasting 3-5 runs of a flaky test\'s logs reveal more to Claude than pasting one exceptionally detailed single log?' },
                a: { en: 'Flakiness is, by definition, a property that only shows up ACROSS runs — timing differences, test order dependency, shared state — and no single log, however detailed, can expose a pattern that only exists in the variation between runs. Multiple logs let the model compare what changed between a pass and a fail, which is the actual signal. Java comparison: this is the same reasoning behind capturing multiple thread dumps to debug a race condition instead of relying on one very thorough dump — the bug lives in the difference, not in any single snapshot.' },
              },
              {
                level: 'advanced',
                q: { en: 'Design a safer approach than raw LLM output for generating 500 realistic-looking national ID numbers for a shared test database.' },
                a: { en: 'Use a deterministic generator with a documented, reserved fake-range or prefix (so every generated ID is provably fake and cannot collide with a real one), and if Claude is used at all, use it only to help DESIGN that reserved-range scheme in small batches with spot-checking, not to mass-produce the final 500 records directly. Confirm the team\'s data policy explicitly allows format-valid synthetic IDs in that environment before seeding anything. Java comparison: this mirrors how Faker-style libraries use reserved test ranges for fields like SSNs rather than pure randomization — the safety property comes from a documented, provable non-collision guarantee, not from an instruction like "make it clearly fake".' },
              },
              {
                level: 'advanced',
                q: { en: 'Compare the risk profile of a Claude-generated locator used in a single one-off test versus the same kind of locator embedded inside a shared Page Object Model.' },
                a: { en: 'A fragile locator in one test has a small, contained blast radius — it breaks one test, and the fix is local; the same fragility inside a shared POM method multiplies the impact across every test that reuses it, so review scrutiny should scale with reuse, not just with how the locator was produced. Java comparison: this is the same reasoning behind extra code-review rigor for a shared utility method versus a one-off script — a bug in shared code affects every caller, so the review bar for centralized code is inherently higher regardless of who or what wrote it.' },
              },
              {
                level: 'advanced',
                q: { en: 'Explain why writing API assertions purely from a single captured response is systematically different from writing them from an actual OpenAPI contract.' },
                a: { en: 'A captured response tells you what happened ONCE, under one set of conditions, while a contract tells you what is PROMISED across all valid and invalid conditions — assertions built only from a capture will perfectly test that one instance and silently miss required fields, optional fields, and every documented error status the capture never exercised. This is not a volume problem (more captures do not fix it) but a category difference: observation versus specification. Java comparison: this is the same gap between characterization tests (locking in current behavior, bugs included) and specification-based tests (verifying the documented contract) — useful for different purposes, but only one of them catches a violation of what the API actually promises.' },
              },
              {
                level: 'advanced',
                q: { en: 'Design a safe way to let Claude Code fix a failing test on a shared branch, balancing speed and review discipline.' },
                a: { en: 'Scope the task to the specific failing file, require the agent to show the proposed fix before applying it (even under an otherwise permissive mode), and route the resulting change through the same human diff review as any other change before it reaches the shared branch — narrowing scope and requiring a review checkpoint are two independent safeguards that should both be present. Java comparison: this mirrors how a new team member\'s first unsupervised task is deliberately scoped to a single module with a mandatory review, rather than given open write access to the whole codebase on day one, regardless of how capable they seem.' },
              },
              {
                level: 'advanced',
                q: { en: 'Explain the JDBC-to-MCP analogy in your own words, and why it matters specifically for QA automation.' },
                a: { en: 'JDBC standardized "any Java program can talk to any database" instead of requiring a custom driver per vendor; MCP standardizes "any AI agent can talk to any external tool" the same way, so a browser or a database becomes just another MCP-shaped connector instead of needing a bespoke integration. For QA specifically, this means the SAME permission and review discipline that applies to a database connection in production code — least privilege, environment scoping — must be applied to an agent\'s MCP connections, because the underlying credential is just as real. Java comparison: nobody would grant a JDBC connection full production write access "to save setup time"; an MCP database connection deserves the identical scrutiny.' },
              },
              {
                level: 'advanced',
                q: { en: 'Why can an MCP-connected agent handle an exploratory task like "log in and tell me what breaks", when a generated Playwright script cannot?' },
                a: { en: 'A generated script can only execute exactly what was written in advance — it has no branch for "something unexpected happened, investigate further" — while an MCP-connected agent perceives the real DOM after each action and can improvise its next step the way a manual tester does, because it is reasoning over live results rather than executing a fixed plan. Java comparison: this is the difference between a hardcoded test script and a human exploratory tester who adapts based on what the application actually shows them — MCP gives the agent that same live feedback loop.' },
              },
              {
                level: 'advanced',
                q: { en: 'A production incident traces back to an unreviewed, AI-generated test fix that merged with a tautological assertion masking a real regression for three weeks. Design a team rule that would have prevented it.' },
                a: { en: 'A standing rule that no AI-generated test or code change merges without a human diff review — with no exception for "an AI already checked it" — combined with a review checklist item specifically asking "does this assertion fail if the feature is intentionally broken?" for any new or modified assertion. The rule needs to be a process control, not a technical one, since the failure mode here was organizational (skipped review), not purely technical. Java comparison: this is the same reasoning behind requiring code review for auto-generated boilerplate (e.g. generated DTOs or mappers) — generation quality does not exempt code from the review process a team has for every other change.' },
              },
              {
                level: 'advanced',
                q: { en: 'Claude summarizes a large test report as "12 failures, mostly in the checkout module" for a team standup. What could go wrong if this summary is repeated in a meeting unverified, and how do you prevent it?' },
                a: { en: 'The summarized grouping could be subtly wrong — miscounting failures, misattributing a module, or missing a critical failure buried in a different category — and once repeated as fact in a meeting, that error propagates into planning decisions with no easy way to trace it back to the source. The prevention is simple: confirm the specific numbers and groupings against the actual report before stating them as fact, treating the summary as a draft, not a source of truth. Java comparison: this is the same discipline as never quoting a build log\'s tail output as the definitive failure count without checking the full CI report — a truncated or paraphrased view can hide the real picture.' },
              },
              {
                level: 'advanced',
                q: { en: 'A junior says they do not need to fully understand a Claude-generated fix because the test is green. What should a senior require before merging, and why does a green test not settle the question?' },
                a: { en: 'The senior should require the junior to explain the fix in their own words — the same Feynman-style check this platform teaches for learning any concept — because a green test confirms only the immediate symptom disappeared, not that the underlying cause was correctly understood or that a related edge case was not silently broken. Skipping this check is how over-reliance (skill atrophy) compounds: the junior never builds the independent debugging instinct needed for the next bug Claude cannot solve alone. Java comparison: this is the same gap between "the build passes" and "I understand why the build passes" — the former is necessary, never sufficient, for trusting a change.' },
              },
              {
                level: 'advanced',
                q: { en: 'A company policy restricts pasting customer code into third-party AI tools. A tester pastes a snippet with customer names and emails removed, believing that sanitization alone satisfies the policy. What is the gap?' },
                a: { en: 'Sanitizing PII addresses a privacy risk, but a company policy restricting code-pasting is very likely also about intellectual property and confidentiality of proprietary logic itself — removing names does not remove the fact that the company\'s actual business logic, algorithms or architecture were shared with a third-party service. The tester needs to know and follow the ACTUAL policy text, not substitute their own judgment about what "safe enough" means; "I sanitized it" is not automatically the same as "I complied with the policy." Java comparison: this is like assuming that removing a comment with a client\'s name from a code snippet makes it safe to post publicly — the proprietary algorithm inside is still exposed regardless of whether names are present.' },
              },
              {
                level: 'advanced',
                q: { en: 'Contrast the risk profile of Claude as a read-only web advisor versus Claude Code with full write-and-execute permissions on a shared branch.' },
                a: { en: 'A read-only advisor is safe by construction — every output must still be manually copied, reviewed and applied by a human, so there is a guaranteed human checkpoint before anything takes effect; a write-and-execute agent on a shared branch can make changes that take effect immediately and are visible to every other person building on that branch, meaning an error propagates before a human necessarily notices. The risk difference is not about the model\'s accuracy in either mode — it is entirely about how many actions occur before a human review point is reached. Java comparison: this is the same reasoning behind why "-DdryRun=true" and an actual "mvn deploy" carry very different risk even when running identical logic — the blast radius depends on what the action is permitted to actually do, not on how likely it is to be correct.' },
              },
              {
                level: 'advanced',
                q: { en: 'Across test case generation, bug analysis, UI automation and API testing, what single habit recurs as the actual safeguard against AI-generated errors?' },
                a: { en: 'Verification against an external source of truth before trusting the output — acceptance criteria for test cases, a reproduced error for bug hypotheses, the live DOM for locators, and a real triggered response for API assertions. In every case, the failure mode is the same shape: confident, syntactically correct output that has not been checked against reality, and the fix is always the same shape too: run it, reproduce it, or compare it against the actual specification before it enters your suite or your codebase. Java comparison: this is the same principle behind never trusting a compiler-clean build as proof of correctness — compiling and being correct are two different, independently-verified properties, in AI-assisted QA work exactly as in ordinary software engineering.' },
              },
            ],
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: `🤖 Tester için Claude AI`,
      subtitle: `Junior Prompt'lardan Senior Ajan İş Akışlarına`,
      intro: `Yapay zeka tester'ın yerini almayacak — ama yapay zekayı iyi kullanan tester, kullanmayanın yerini alacak. Bu sayfa bir QA mühendisinin Claude'u kariyerinin her aşamasında nasıl kullandığını uygulamalı öğretir: gerçekten çalışan prompt'lar yazmak, güvenebileceğin test case ve otomasyon kodu ürettirmek, Claude Code ve MCP tabanlı iş akışlarına yükselmek.`,
    },
    tabs: ['🎯 Giriş: AI Destekli Test', '✍️ Prompt Mühendisliği', '⚙️ Erişim & Kurulum', '📋 Test Case Üretimi', '🐛 Bug Analizi & Rapor', '🧬 Test Verisi Üretimi', '🤖 UI Otomasyonu: Selenium & Playwright', '🔌 API Testinde Claude', '💻 Claude Code: Terminalde Ajan', '🔗 MCP (Model Context Protocol)', '🏗️ CI/CD & Ekipte AI', '🚨 Riskler & Yaygın Hatalar', '💼 Mülakat Soruları & Cevapları'],
    sections: [
      {
        title: `🎯 Giriş: AI Destekli Test`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧑‍🏫',
            content: `Claude; test, programlama ve aklına gelebilecek her framework hakkında milyonlarca sayfa okumuş bir danışman gibidir — ama SENİN uygulamanı, SENİN test verini ve SENİN ekibinin "bitti" tanımını hayatında bir kez bile görmemiştir. Bu benzetmenin mekanizması birebirdir: büyük dil modeli devasa genel bilgi taşır ama projen hakkında, konuşmaya o an yapıştırdıkların dışında hiçbir şey bilmez. Üzerinde durulmaya değer soru şu: bu danışman bu kadar okumuşsa, aynı soru ("login için test yaz") neden bir tester'a işe yaramaz jenerik bir cevap, diğerine production kalitesinde bir test seti getiriyor? Java karşılaştırması: bu, method overloading çözümlemesidir — derleyici DOĞRU metodu ancak argüman tiplerin spesifikse seçer; her şeyi Object olarak geçersen en jenerik eşleşmeyi alırsın. Belirsiz prompt, Object tipli bir çağrıdır. QA tarafındaki bedel de gerçektir: jenerik AI test case'lerini olduğu gibi kabul eden tester sahte güven kazanır — suite yeşildir ama kabul kriterlerinin asıl önemsediği o tek senaryo (hesap kilitlenmesi) hiç test edilmemiştir ve production'da patlar.`,
          },
          { type: 'heading', text: `AI Destekli Test Nedir?` },
          {
            type: 'text',
            content: `AI destekli test; Claude gibi bir büyük dil modelini (LLM) QA işinin aktif bir ortağı olarak kullanmak demektir: user story'den test case üretmek, tanımadığın hataları açıklatmak, otomasyon kodu taslağı çıkartmak, log analiz ettirmek ve test planı gözden geçirtmek. LLM, devasa eğitim verisinden öğrendiği kalıplara dayanarak metnin en olası devamını tahmin eder — iyi yapılandırılmış, inandırıcı görünen çıktılar üretmekte parlak olmasının sebebi de tam olarak budur, o çıktının kendinden emin bir şekilde YANLIŞ olabilmesinin sebebi de. Araç değişir; tester'ın çekirdek becerisi değişmez: neyin test edilmeye değer olduğuna karar vermek ve bir sonucun doğru olup olmadığına hükmetmek.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: AI tester'ın yerini neden alamaz? Oracle problemi yüzünden — testin en eski sorusu: "DOĞRU davranışın ne olduğuna kim karar verir?" Claude saniyeler içinde 50 test case üretebilir ama SENİN şirketinde kilitlenen hesabın 15 dakika sonra otomatik açılması gerektiğini bilemez; çünkü o kural Claude'un eğitim verisinde değil, senin kabul kriterlerinde ve domain bilginde yaşar. Java karşılaştırması: Claude, kusursuz syntax'la JUnit testleri yazan güçlü bir kod üreticisi gibidir — ama assertion değerlerini yalnızca SEN yazabilirsin, çünkü beklenen davranışı yalnızca sen bilirsin. AI üretir; tester doğrular. Bu iş bölümü kalıcıdır.`,
          },
          { type: 'heading', text: `Junior → Senior Claude Merdiveni` },
          {
            type: 'table',
            headers: ['Seviye', 'Tipik Claude Kullanımı', 'Bu Seviyenin En Büyük Riski'],
            rows: [
              ['Junior', 'Soru-cevap ile öğrenme: kavram açıklatma, hata mesajı çözdürme, stack trace anlama', 'Cevapları doğrulamadan kullanmak'],
              ['Junior+', 'User story ve kabul kriterlerinden test case ve test verisi ürettirme', 'SENİN kabul kriterlerini ıskalayan jenerik case\'leri kabul etmek'],
              ['Mid', 'Otomasyon kodu üretme ve düzelttirme (Selenium, Playwright, API testleri)', 'Uydurulmuş metod veya kırılgan locator içeren kodu merge etmek'],
              ['Mid-Senior', 'Terminalde Claude Code: dosya okuyan, test koşan, düzeltip tekrar koşan ajan', 'Değişiklikleri incelemeden ajana geniş yetki vermek'],
              ['Senior', 'MCP entegrasyonları, CI/CD\'de AI, ekip prompt kütüphanesi ve AI kullanım standartları', 'Ekibin AI çıktısını review disiplini olmadan yayına almasına izin vermek'],
            ],
          },
          claudeDailyLoopAnimation,
          claudeWorkflowOrder,
          qaAssistantCallout,
          {
            type: 'quiz',
            question: `Claude, driver.findElementByAI("login button") kullanan bir Selenium testi üretti ve kod tertemiz görünüyor. İlk yapman gereken nedir?`,
            options: [
              { id: 'a', text: 'Merge et — Claude, Selenium dokümantasyonuyla eğitildi, metod kesin vardır' },
              { id: 'b', text: 'Hiçbir şey çalıştırmadan önce metodun gerçekten var olduğunu doğrula (IDE otomatik tamamlama, resmi dokümantasyon) — LLM\'ler gerçekte var olmayan, inandırıcı görünen API\'ler uydurabilir' },
              { id: 'c', text: 'Testi baştan elle yaz — AI üretimi kod asla kullanılamaz' },
              { id: 'd', text: 'Claude\'a "emin misin?" diye sor, evet derse merge et' },
            ],
            correct: 'b',
            explanation: `findElementByAI Selenium'da yoktur — bu bir halüsinasyondur: gerçek bir API gibi görünen, istatistiksel olarak olası bir metin. Profesyonel refleks, modelin kendinden emin ses tonuna değil dış bir kaynağa (derleyici, IDE, resmi dokümantasyon) karşı doğrulamaktır. "Emin misin?" sormak işe yaramaz; model kendi hatasını kendinden emin şekilde tekrarlayabilir.`,
            retryQuestion: {
              question: `Claude, ödeme özelliğin için 10 saniyede 20 test case üretti. Bu case'lerin DOĞRU olup olmadığını nihai olarak ne belirler?`,
              options: [
                { id: 'a', text: 'Üretilme hızı — modern modeller güvenilirdir' },
                { id: 'b', text: 'Case sayısı — 20 tanesi her özellik için fazlasıyla yeterlidir' },
                { id: 'c', text: 'Senin kabul kriterlerin ve domain bilgin — beklenen davranışı tanımlayan oracle modelin içinde değil, sende yaşar' },
                { id: 'd', text: 'Case\'lerin akıcı bir İngilizceyle yazılmış olması' },
              ],
              correct: 'c',
              explanation: `Bu, oracle problemidir: doğruluğu spesifikasyon ve domain kuralları tanımlar; Claude bunları ancak sen verirsen bilir. Hız ve akıcılık sunum kalitesidir; doğruluk ise yalnızca tester'ın kabul kriterlerine karşı verebileceği bir hükümdür.`,
            },
          },
        ],
      },
      {
        title: `✍️ Prompt Mühendisliği`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📝',
            content: `Prompt, bug raporunun "steps to reproduce" alanıdır — ve mekanizma birebir örtüşür. Belirsiz bir repro yazarsan ("login bozuk"), geliştirici "cannot reproduce" döner ve bir gün kaybedersin; adımları, tarayıcı sürümünü ve test verisini tam yazarsan düzeltme dakikalar içinde başlar. Belirsiz bir prompt ("login için test yaz") da bunun AI karşılığını alır: dünyadaki her login formuna uyan, hiçbirine yardım etmeyen jenerik bir cevap. Üzerine düşünülecek soru şu: Claude milyonlarca sayfa okuduysa, neden hâlâ SENİN beş satırlık bağlamına muhtaç? Çünkü herkesin login kurallarını okudu — senin kabul kriterlerin olmadan, binlerce olası login davranışından hangisinin seninki olduğunu bilemez. Java karşılaştırması: interface kontratı — metod imzası ne kadar spesifikse derleyici çağrıyı o kadar isabetli bağlar; prompt, modele uzattığın tip imzasıdır. QA tarafındaki bedel: prompt disiplinini atlayan ekip jenerik test seti alır, jenerik set sahte PASS güveni yaratır ve sahte güven, test edilmemiş kilitlenme kuralının bir cuma akşamı production'a çıkma şeklidir.`,
          },
          { type: 'heading', text: `Güçlü Prompt'un 4 Bileşeni` },
          {
            type: 'text',
            content: `Her güçlü QA prompt'u dört bileşen taşır. 1) ROL: "Sen kıdemli bir QA mühendisisin" — cevabın bakış açısını ve söz dağarcığını belirler. 2) BAĞLAM: user story, kabul kriterleri, kod veya log — Claude'un projen hakkında sahip olacağı TEK bilgi. 3) GÖREV + KISIT: ne üretileceği ve hangi sınırlar içinde ("6 test case, negatifler dahil"). 4) ÇIKTI FORMATI: tablo, Gherkin, JSON — sonuç elle biçimlendirme gerektirmeden doğrudan test yönetim aracına aksın diye. Eksik bileşen bir üslup sorunu değildir; her eksik, cevabı ölçülebilir şekilde bozar — birazdan aşağıdaki lab'da bizzat göreceksin.`,
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `ZAYIF PROMPT (jenerik cevap üretir):
Login için test yaz.

GÜÇLÜ PROMPT (4 bileşen işaretli):
Sen kıdemli bir QA mühendisisin.                        <- 1) ROL
Kabul kriterleri: geçerli e-posta + şifre -> dashboard;  <- 2) BAĞLAM
hatalı bilgi -> hata mesajı; 5 hatalı deneme -> kilit.
Negatif ve sınır değer senaryoları dahil test case yaz.  <- 3) GÖREV + KISIT
Çıktı: 6 adet, tablo: ID | Senaryo | Beklenen | Tip.     <- 4) FORMAT`,
              en: `WEAK PROMPT (produces a generic answer):
Write tests for login.

STRONG PROMPT (4 ingredients marked):
You are a senior QA engineer.                            <- 1) ROLE
Acceptance criteria: valid email + password -> dashboard; <- 2) CONTEXT
invalid credentials -> error message; 5 failures -> lock.
Write test cases including negative and boundary cases.   <- 3) TASK + CONSTRAINT
Output: 6 cases, table: ID | Scenario | Expected | Type.  <- 4) FORMAT`,
            },
          },
          promptIterationAnimation,
          { type: 'heading', text: `Prompt Lab — Farkı Kendin Yaşa` },
          {
            type: 'text',
            content: `Prompt kalitesi hakkında okumak pasiftir; aşağıda onu YAŞAYACAKSIN. Login senaryosu için gerçek bir prompt yaz ve simüle Claude'un cevabını izle. Önce üşengeç tek satırlık bir prompt gönder — jenerik cevabı gör. Sonra bileşenleri tek tek ekle ve aynı sorunun nasıl profesyonel, kopyalamaya hazır bir test case tablosuna dönüştüğünü izle. Bu simülasyon deterministik ve anahtar kelime tabanlıdır (bunu senden saklamıyor), ama ders gerçek Claude'a birebir taşınır.`,
          },
          promptLabBlock,
          promptFixOrder,
          promptRewritePlayground,
          {
            type: 'text',
            content: `Akıl yürütme: iterasyon neden başarısızlık değil, normal akıştır? Çünkü prompt bir spesifikasyondur ve spesifikasyonlar review ile olgunlaşır — hiçbir test planı da ilk review'undan aynen çıkmaz. Senior'lar ilk cevabı taslak sayar: yanlışı işaret eder ("TC04 kabul kriterlerimde olmayan bir kuralı test ediyor — çıkar, yerine e-posta sınır değeri ekle") ve cevabın yakınsamasına izin verir. Java karşılaştırması: bu, TDD'deki red-green-refactor döngüsüdür — ilk kırmızı koşum başarısızlık değil, bilgidir. Bir uyarı: çok uzun konuşmalarda model önceki kararların izini kaybedebilir; yeni bir özellik için yeni bir konuşma başlat ve kritik bağlamı yeniden yapıştır.`,
          },
          {
            type: 'quiz',
            question: `İki tester aynı user story için soru soruyor. Tester A: "login testi yaz" gönderiyor. Tester B: rol, kabul kriterleri, negatif case talebi ve "tablo halinde 6 adet" içeren bir prompt gönderiyor. Mekanik olarak B'nin cevabı neden dramatik şekilde daha iyi?`,
            options: [
              { id: 'a', text: 'B\'nin prompt\'u daha uzun; uzun prompt her zaman daha iyi cevap üretir' },
              { id: 'b', text: 'B, modelin tahmin uzayını daralttı: rol söz dağarcığını belirler, bağlam modelin bilemeyeceği proje kurallarını enjekte eder, format ve kısıt çıktıyı doğrulanabilir hale getirir' },
              { id: 'c', text: 'B şanslıydı — LLM cevapları rastgeledir, kalite etkilenemez' },
              { id: 'd', text: 'Model kıdemli tester\'ları tanır ve onlara daha iyi cevap verir' },
            ],
            correct: 'b',
            explanation: `LLM, olası devamları tahmin eder. Belirsiz prompt milyonlarca olası devam bırakır; model de en güvenli jenerik olanı üretir. Her bileşen yanlış devamları eler: belirleyici olan kabul kriterleridir, çünkü kilitlenme gibi proje kuralları eğitim verisinin hiçbir yerinde yoktur. Uzunluk tek başına hiçbir şey yapmaz — spesifiklik yapar.`,
            retryQuestion: {
              question: `Claude'un test case tablosunda "hesap 15 dakika sonra otomatik açılır" satırı var — ama kabul kriterlerinde açılma süresi hiç geçmiyor. Bu nedir ve senior hamle hangisidir?`,
              options: [
                { id: 'a', text: 'Faydalı bir detay — test setine olduğu gibi ekle' },
                { id: 'b', text: 'Gerçek gibi sunulmuş uydurma bir varsayım — kabul kriterlerine karşı doğrula, çıkar veya işaretle; Claude\'a "sadece verdiğim kriterlere dayan, varsayımlarını ayrı listele" talimatı ver' },
                { id: 'c', text: 'Claude\'un şirketinin iç wiki\'sini okuduğunun kanıtı' },
                { id: 'd', text: 'Test tasarımında AI kullanmayı tamamen bırakma sebebi' },
              ],
              correct: 'b',
              explanation: `Model, spesifikasyon boşluğunu inandırıcı bir uydurma değerle doldurdu — en tehlikeli hata türü, çünkü profesyonel görünür. Senior alışkanlığı çifte savunmadır: çıktıyı doğruluk kaynağına (kabul kriterleri) karşı doğrula ve prompt'u varsayımları açığa zorlayacak şekilde kur ("her varsayımını ayrı listele; yalnızca verdiğim kriterleri kullan").`,
            },
          },
        ],
      },
      {
        title: `⚙️ Erişim & Kurulum`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🚪',
            content: `Claude'ın günlük işine giren üç kapı vardır: claude.ai web sohbeti, terminalinde çalışan Claude Code CLI'ı ve VS Code veya JetBrains için IDE eklentileri — ve bu benzetmenin mekanizması birebirdir: üçü de aynı alttaki modele prompt'unu taşıyan farklı taşıyıcılardır, tıpkı ChromeDriver, FirefoxDriver ve EdgeDriver'ın aynı WebDriver API çağrılarını farklı tarayıcılara taşıyan farklı taşıyıcılar olması gibi. Üzerinde durulmaya değer soru şu: hepsi "aynı Claude"yla konuşuyorsa, bir tester neden kurulum gerektiren, PATH'i bozulabilen bir terminal aracı için rahat web sohbetini bıraksın? Çünkü web sohbeti senin repository'ni okuyamaz, test setini çalıştıramaz, diskteki bir dosyayı düzenleyemez — sadece yapıştırdığını görür. Java karşılaştırması: bu, bir stack trace'i bir meslektaşının gelen kutusuna yapıştırmakla (web sohbeti) o meslektaşı klavyene, IDE'ne ve terminaline tam erişimle oturtmak (bir CLI ajanı) arasındaki farktır — ikisi de yardımcı olabilir ama yalnızca biri gerçekten mvn test çalıştırıp başarısız olduğunu izleyebilir. QA tarafındaki bedel somuttur: sadece web sohbetine kod parçacığı yapıştıran bir junior kendi tavanını sınırlar; CLI'ı kuran bir tester eninde sonunda Claude'un başarısız bir testi aynı terminal oturumunda okumasına, çalıştırmasına ve düzeltme önermesine izin verebilir — tavsiye istemekle bir görevi devretmek arasındaki fark budur.`,
          },
          { type: 'heading', text: `Aynı Modele Üç Kapı` },
          {
            type: 'text',
            content: `claude.ai web sohbetidir: başlangıçta ücretsizdir, kullanım limitlerini yükselten ve daha uzun konuşmaların kilidini açan ücretli bir Pro katmanı vardır — Prompt Mühendisliği sekmesinde tam olarak pratik yaptığın soru-cevap öğrenme ve tek seferlik test case/test verisi üretimi için doğal başlangıç noktasıdır. Claude Code bir komut satırı ajanıdır: bir kez kurulur, herhangi bir proje klasöründe çalıştırılır ve senin iznine bağlı olarak dosya okuyabilir, test setini çalıştırabilir, kod düzenleyebilir — Claude'u bir danışmandan repository'nde aktif bir katılımcıya dönüştüren araç budur. IDE eklentileri (VS Code, JetBrains) aynı ajanı editörünün içine gömer, önerilen düzenlemeleri ayrı bir terminal penceresi yerine satır içinde gösterir — alttaki CLI iş akışına zaten alıştıysan kullanışlıdır.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: CLI kesinlikle daha güçlüyse, neden her zaman onu kullanmayalım? Çünkü güç, risk anlamına gelir — dosya düzenleyebilen ve shell komutu çalıştırabilen bir CLI ajanı açık izin ayarları gerektirir; diff'lerini incelemeden canlı bir production branch'ine karşı çalıştırmak bela aramaktır. Web sohbetinin salt-okunur doğası, sadece bir test planına ikinci bir görüş istediğinde, kod değişikliği istemediğinde bir özelliktir. Senior'lar aracı etki alanına göre seçer: tavsiye için web sohbeti, denetimli repository işi için CLI.`,
          },
          {
            type: 'table',
            headers: ['Erişim Yöntemi', 'En İyi Kullanım', 'Sınırlama'],
            rows: [
              ['claude.ai (web)', 'Soru-cevap öğrenme, hızlı test case taslakları, tek seferlik açıklamalar', 'Repository\'ni okuyamaz, komut çalıştıramaz — her şey elle yapıştırılmalı'],
              ['Claude Code (CLI)', 'Başarısız testleri okuma, seti çalıştırma, düzeltme önerme ve uygulama', 'Kurulum ve açık izin incelemesi gerektirir — daha büyük etki alanı'],
              ['IDE eklentisi (VS Code / JetBrains)', 'Otomasyon kodu yazarken satır içi öneriler', 'CLI ile aynı alttaki ajan, sadece farklı bir yüzey — ekstra yetenek yok'],
            ],
          },
          { type: 'heading', text: `Claude Code (CLI) Kurulumu` },
          {
            type: 'code',
            language: 'bash',
            label: 'Windows (PowerShell)',
            code: {
              tr: `node -v
# Beklenen çıktı: v18 veya üzeri bir sürüm numarası
# Node.js kurulu değilse: nodejs.org üzerinden LTS sürümünü indir ve kur

npm install -g @anthropic-ai/claude-code
# PowerShell'i normal kullanıcı olarak çalıştırmak genelde yeterlidir

claude --version
# Beklenen çıktı: bir sürüm numarası (örn. 1.x.x)
# Doğrulama: hata vermeden bir sürüm numarası dönerse kurulum tamamdır`,
              en: `node -v
# Expected output: v18 or higher
# If Node.js is missing, install the LTS version from nodejs.org

npm install -g @anthropic-ai/claude-code
# Running PowerShell as a regular user is usually enough

claude --version
# Expected output: a version number (e.g. 1.x.x)
# Verification: no error and a version number means the install succeeded`,
            },
          },
          {
            type: 'code',
            language: 'bash',
            label: 'macOS / Linux (Terminal)',
            code: {
              tr: `node -v
# Beklenen çıktı: v18 veya üzeri bir sürüm numarası

sudo npm install -g @anthropic-ai/claude-code
# macOS/Linux'ta global npm paketleri genelde sudo veya nvm gerektirir;
# sudo kullanmak istemiyorsan nvm ile Node kurup sudo'suz global kurulum yapabilirsin

claude --version
# Beklenen çıktı: bir sürüm numarası (örn. 1.x.x)
# Doğrulama: hata vermeden bir sürüm numarası dönerse kurulum tamamdır`,
              en: `node -v
# Expected output: v18 or higher

sudo npm install -g @anthropic-ai/claude-code
# Global npm packages on macOS/Linux usually need sudo or nvm;
# if you don't want sudo, install Node via nvm for a sudo-free global install

claude --version
# Expected output: a version number (e.g. 1.x.x)
# Verification: no error and a version number means the install succeeded`,
            },
          },
          { type: 'heading', text: `IDE Eklentileri` },
          {
            type: 'text',
            content: `VS Code ve JetBrains, kendi marketplace'lerinden birer Claude eklentisi sunar. Kurulumu editörün içine bir Claude paneli ekler ve aynı ajanı o an açık olan dosya üzerinde tetiklemene izin verir — alttaki CLI iş akışına zaten güveniyorsan kullanışlıdır, çünkü eklenti ayrı bir ürün değil, aynı alttaki aracın üzerine ince bir arayüzdür.`,
          },
          { type: 'heading', text: `API Key Kavramı ve Güvenliği` },
          {
            type: 'text',
            content: `API key, tarayıcı girişi olmadan Claude'a giden isteklerini doğrulayan gizli bir metin dizisidir — bir CI pipeline'ının veya özel bir script'in Claude'u programatik olarak çağırmasını sağlayan şey budur. Ona tam olarak bir veritabanı şifresi gibi davran: asla kaynak koduna gömme, asla bir repository'ye commit'leme ve asla "çalışıyor mu diye deneyeyim" diyerek bir Claude konuşmasına yapıştırma — bir model transkripti güvenli bir secret deposu değildir. Java karşılaştırması: bu, veritabanı kimlik bilgilerini bir Java sınıfına gömmek yerine gitignore'lanmış bir environment variable veya application.properties dosyasında tutmakla aynı disiplindir — gizli bilgi versiyon kontrolünün dışında yaşar, kod sadece onun adına referans verir.`,
          },
          {
            type: 'code',
            language: 'javascript',
            code: {
              tr: `// YANLIŞ: API key doğrudan kod içinde
const client = new Anthropic({ apiKey: 'sk-ant-api03-abc123...' })

// DOĞRU: API key ortam değişkeninden okunur, .env dosyası .gitignore'dadır
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })`,
              en: `// WRONG: API key hardcoded directly in the code
const client = new Anthropic({ apiKey: 'sk-ant-api03-abc123...' })

// CORRECT: API key read from an environment variable, .env is gitignored
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })`,
            },
          },
          { type: 'heading', text: `Prompt'u Hangi Dilde Yazmalı?` },
          {
            type: 'text',
            content: `Claude'a Türkçe veya İngilizce prompt yazabilirsin, işlevsel bir kısıtlama yoktur — model ikisini de akıcı şekilde işler. Cevap kalitesini asıl etkileyen şey, kod tabanının söz dağarcığıyla tutarlılıktır: test framework'ün, hata mesajların ve dokümantasyonun İngilizce teknik terimler kullanıyorsa (assertion, locator, fixture), cümlenin geri kalanı Türkçe olsa bile bu terimleri prompt içinde İngilizce bırak — Türkçeleştirilmiş bir terim ("doğrulayıcı" yerine "assertion") modelin hangi kavramı kastettiğini tahmin etmesine yol açabilir, bilinen bir API'ye doğrudan eşlemesi yerine. Bu, tam olarak bu platformun kendisinin uyduğu kurala paraleldir: Türkçe anlatım, değişmeyen İngilizce teknik terimler.`,
          },
          claudeCliInstallStepAnimation,
          claudeCliInstallOrder,
          claudeInstallTroubleshootPlayground,
          {
            type: 'quiz',
            question: `Claude'un başarısız bir Playwright testini okumasını, çalıştırmasını ve aynı oturumda bir kod düzeltmesi önermesini istiyorsun. Bu görev için hangi erişim yöntemi uygundur?`,
            options: [
              { id: 'a', text: 'claude.ai web sohbeti, çünkü kurulum gerektirmiyor' },
              { id: 'b', text: 'Claude Code CLI, çünkü belirli bir test dosyasını okuyup çalıştırabilecek ve düzeltmeyi yerinde düzenleyebilecek tek şey dosya ve komut erişimi olan bir ajandır' },
              { id: 'c', text: 'Bir IDE eklentisi şart — CLI bu işi yapamaz' },
              { id: 'd', text: 'Hangi yöntem olursa olsun aynı sonucu verir, çünkü hepsi aynı modeli kullanır' },
            ],
            correct: 'b',
            explanation: `Web sohbeti sadece yapıştırdığını görebilir; belirli bir dosyayı açamaz veya bir komut çalıştıramaz. CLI (ve aynı ajanı saran IDE eklentisi), "çalıştır ve düzeltmeyi yerinde öner" için ön koşul olan gerçek dosya ve shell erişimine sahip tek seçenektir.`,
            retryQuestion: {
              question: `Bir ekip arkadaşın soruyor: "ANTHROPIC_API_KEY'imi doğru formatta olup olmadığını kontrol etmek için bir Claude Code konuşmasına yapıştırmak güvenli mi?" Doğru cevap nedir?`,
              options: [
                { id: 'a', text: 'Evet, konuşma özeldir ve asla makineni terk etmez' },
                { id: 'b', text: 'Hayır — key\'e bir veritabanı şifresi gibi davran: asla hiçbir konuşmaya yapıştırma; doğrulamak için uzunluğunu/önekini yerelde kontrol et veya sızıntıdan şüpheleniyorsan key\'i döndür' },
                { id: 'c', text: 'Evet, ama sonradan mesajı silersen sorun olmaz' },
                { id: 'd', text: 'Fark etmez — API key\'ler açığa çıksa bile kötüye kullanılamaz' },
              ],
              correct: 'b',
              explanation: `Bir model transkripti (yerel veya uzak) güvenli bir secret deposu değildir ve "sonradan sil" değerin hiç işlenmediğini veya yukarı akışta loglanmadığını garanti etmez. Güvenli alışkanlık veritabanı kimlik bilgileriyle aynıdır: gizli bilgiyi secret manager'ın dışında hiçbir yere yazma; sızıntıdan şüpheleniyorsan key'i döndür.`,
            },
          },
        ],
      },
      {
        title: `📋 Test Case Üretimi`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏗️',
            content: `Claude'un eksik bir user story'den test case üretmesi, ölçüleri eksik bir kat planından inşaat yapan bir müteahhite benzer — mekanizma birebirdir: müteahhit bir duvarın uzunluğunu tahmin EDEBİLİR (istatistiksel olarak olası bir sayı), ama bina araziye sığmayabilir. Üzerinde durulmaya değer soru şu: Claude saniyeler içinde 20 test case üretebiliyorsa, ondan istediğin İLK şey neden testleri yazması değil, neyin eksik olduğunu listelemesi olmalı? Çünkü çoğu user story sınır durumlar ve eşik değerler konusunda sessizdir — boşlukları sordurmayı atlarsan Claude onları kendi eğitim verisinden gelen varsayılanlarla doldurur, senin ürününün gerçek kuralıyla değil. Java karşılaştırması: bu, Javadoc'u olmayan bir interface metoduna karşı JUnit testi yazmak gibidir — bir tahmini derleyebilirsin ama kontratın gerçek ön/son koşulları olmadan gereksinimi değil, kendi varsayımını test ediyorsundur. QA tarafındaki bedel: Claude'un sessizce doldurduğu varsayımlar üzerine kurulan bir test seti CI'da yeşil geçer ama asıl önemli kabul kriterini kaçırır — Giriş sekmesindeki oracle probleminin aynı sahte-güven tuzağı, bu sefer test tasarım aşamasında değil story-alım aşamasında.`,
          },
          { type: 'heading', text: `Üretmeden Önce Sor` },
          {
            type: 'text',
            content: `Doğrudan test istemek yerine iki adımlı bir teknik kullan. Birinci adım: user story ve kabul kriterlerini yapıştır, Claude'dan belirsiz veya eksik olan HER kuralı LİSTELEMESİNİ iste — henüz hiçbir test istemiyorsun. İkinci adım: bu listeyi product owner'ına veya ekibine götür, gerçek ve onaylanmış cevaplar al. Ancak o zaman test case iste, Claude'a SADECE onaylanmış kuralları kullanmasını açıkça söyleyerek. Bu sıralama, tek seferlik bir üretimi, oracle boşluğunun sessizce doldurulmadan önce yüzeye çıktığı kontrollü, iki aşamalı bir konuşmaya dönüştürür.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: neden düz bir madde listesi yerine özellikle Gherkin'de üretilsin? Given/When/Then, her senaryo için açık bir ön koşul, eylem ve beklenen sonuç üçlüsünü zorunlu kılar — bu da tam olarak Claude'un belirsiz çıktıdan kaçınmak için doldurması gereken şekildir; format kendisi spesifiklik için zorlayıcı bir mekanizmaya dönüşür, tıpkı güçlü tipli bir metod imzasının kod derlenmeden önce her parametreyi vermeni zorlaması gibi.`,
          },
          {
            type: 'table',
            headers: ['Adım', 'Claude\'dan Ne İstersin', 'Hâlâ Senin Sorumluluğun'],
            rows: [
              ['Belirsizlikleri listele', 'Bu story ve kabul kriterlerine göre, herhangi bir test yazmadan önce belirsiz veya eksik olan HER kuralı listele', 'Listeyi PO/ekibine götürüp gerçek cevaplar almak'],
              ['Gherkin\'de üret', 'Aşağıdaki SADECE onaylanmış kurallara dayanarak N adet Gherkin senaryosu yaz: Given/When/Then', 'Senaryo başlıklarını kabul kriterleri listene karşı gözden geçirmek'],
              ['Oracle olarak incele', '(burada Claude adımı yok)', 'Doğru/yanlış hükmünü vermek — Claude\'un akıcı sözdizimi kapsamın kanıtı değildir'],
            ],
          },
          {
            type: 'code',
            language: 'gherkin',
            code: {
              tr: `Feature: Giriş
  # Sadece onaylanmış kabul kriterlerine dayanır: AC-12, AC-13, AC-14
  Scenario: Geçerli bilgilerle giriş başarılı
    Given kullanıcı login sayfasındadır
    When geçerli e-posta ve şifre girer
    Then dashboard sayfasına yönlendirilir

  Scenario: 5 hatalı denemeden sonra hesap kilitlenir
    Given kullanıcı 4 kez hatalı şifre girmiştir
    When 5. kez hatalı şifre girer
    Then hesap 15 dakika kilitlenir`,
              en: `Feature: Login
  # Based only on confirmed acceptance criteria: AC-12, AC-13, AC-14
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When they enter a valid email and password
    Then they are redirected to the dashboard

  Scenario: Account locks after 5 failed attempts
    Given the user has entered the wrong password 4 times
    When they enter the wrong password a 5th time
    Then the account locks for 15 minutes`,
            },
          },
          promptLabCrossCallout,
          testCaseFromStoryAnimation,
          testCaseGherkinOrder,
          testCasePlayground,
          {
            type: 'quiz',
            question: `Claude bir checkout özelliği için tek seferde 8 Gherkin senaryosu üretti, story'deki belirsiz "kısmi iade" kuralını hiç sormadan. Çıktıda değil, SÜREÇTE ne yanlış gitti?`,
            options: [
              { id: 'a', text: 'Hiçbir şey — 8 senaryo zaten iyi bir kapsam' },
              { id: 'b', text: 'Tester birinci adımı atladı — üretmeden ÖNCE Claude\'dan belirsizlikleri listelemesini istemeyi — bu yüzden model kısmi iade boşluğunu olası ama doğrulanmamış bir varsayımla doldurdu' },
              { id: 'c', text: 'Sorunun sebebi Gherkin formatının kendisi' },
              { id: 'd', text: 'Claude, tam belirtilmemiş bir story ile hiçbir şey üretmeyi reddetmeliydi' },
            ],
            correct: 'b',
            explanation: `Belirsizlik-önce adımını atlamak, oracle boşluğunun (burada "kısmi iade" gerçekte ne anlama gelmeli?) hiçbir zaman bir insana ulaşmaması demektir. Claude belirsiz bir isteği reddetmez — kendinden emin okunan ama senin gerçek iş kuralınla eşleşmeyebilecek, istatistiksel olarak en olası tamamlamayı üretir.`,
            retryQuestion: {
              question: `Üretilen bir senaryoda "Then %50 kısmi iade yapılır" yazıyor ama kabul kriterlerinde hiçbir yüzde belirtilmemiş. Senior hamle nedir?`,
              options: [
                { id: 'a', text: 'Olduğu gibi bırak — %50 iade sistemlerinde yaygın bir varsayılandır' },
                { id: 'b', text: 'Onaylanmamış bir varsayım olarak işaretle, gerçek kuralı product owner ile doğrula, sadece onaylandıktan sonra sete ekle — bu, tek satırlık bir oracle problemidir' },
                { id: 'c', text: 'Senaryonun tamamını sil — iadeler AI yardımıyla test edilemez' },
                { id: 'd', text: '%100 olarak değiştir, çünkü daha güvenli bir sayıdır' },
              ],
              correct: 'b',
              explanation: `İnandırıcı görünen bir sayı, onaylanmış bir kural değildir. Senior alışkanlığı, AI çıktısındaki doğrulanmamış her detayı iki tahmin arasında yazı-tura atmak yerine, gerçek bir cevap gerektiren işaretli bir varsayım olarak ele almaktır.`,
            },
          },
        ],
      },
      {
        title: `🐛 Bug Analizi & Rapor`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧳',
            content: `Ham, temizlenmemiş bir log'u Claude'a yapıştırmak, tek bir belgeyi teslim etmesi için bir kuryeye tüm cüzdanını vermeye benzer — mekanizma birebirdir: kurye sadece belgeye (hata satırına) ihtiyaç duyuyordu, aynı zarfta (log dosyasında) tesadüfen bulunan kimlik kartına ve kredi kartlarına (session token'ları, e-postalar, IP'ler) değil. Üzerinde durulmaya değer soru şu: Claude sana yardım etmek için sadece HATA'ya ihtiyaç duyuyorsa, neden bu kadar çok tester ham log'un tamamını, müşteri e-postaları ve auth token'ları dahil, yapıştırıyor? Çünkü temizlemek fazladan bir sürtünme adımı gibi hissettiriyor — ama o sürtünme GÜVENLİK MEKANİZMASININ ta kendisidir: bir sır terminalinden herhangi bir dış servisin isteğine gittiği an, senin kontrolündeki sızmış bir API key'i döndürebildiğin gibi bu sızıntıyı geri alamazsın. Java karşılaştırması: bu, catch(Exception e) { log.error(e.getMessage()) } içinde getMessage()'ın tesadüfen şifre içeren ham bir JDBC bağlantı dizesi taşıması sınıfından bir hatadır — temizlemeyen loglama framework'leri bilinen gerçek olay kaynaklarıdır, bir AI sohbetine yapıştırmak aynı akışın bir sıçrama (bir üçüncü taraf) çıkarılmış halidir. QA tarafındaki bedel varsayımsal değildir: paylaşılan bir Claude konuşmasında sızan bir session token veya müşteri e-postası (bir ekip kanalına atılan ekran görüntüsü, kurumsal bir log-saklama politikası) gerçek bir gizlilik olayıdır — bir şeyin hassas göründüğünü FARK ETTİKTEN sonra değil, HER ZAMAN yapıştırmadan ÖNCE temizle.`,
          },
          { type: 'heading', text: `Stack Trace'den Sıralı Hipotezlere` },
          {
            type: 'text',
            content: `Temizlenmiş stack trace'i yapıştır ve Claude'dan olası kök nedenleri, her biri için gerekçesiyle birlikte olasılığa göre sıralamasını iste — tek bir "asıl" nedeni ilan etmesini değil. Cevabı, bir meslektaşının eğitimli tahmini gibi test edilecek bir hipotezler kümesi olarak ele al, bir hüküm olarak değil.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: flaky bir testin sadece en son başarısızlığı yerine son 3-5 koşumunun log'unu neden birlikte yapıştırasın? Tek bir başarısızlık log'u normal, tek seferlik bir hipotez gibi görünür: "element bulunamadı." Ama farklı aralıklı noktalardaki 3-5 log bir ÖRÜNTÜYÜ ortaya çıkarabilir — paralel çalıştırıldığında her zaman başarısız olması, ya da sadece belirli bir önceki testten sonra olması — ki bunu tek bir log gösteremez. Düzeltme örüntüde yaşar, herhangi bir tekil stack trace'te değil.`,
          },
          {
            type: 'table',
            headers: ['Yapıştırdığın Girdi', 'Ne İstersin', 'Hâlâ Senin Sorumluluğun'],
            rows: [
              ['Temizlenmiş stack trace / log', 'Olası kök nedenleri, her biri için gerekçesiyle birlikte olasılığa göre sırala', 'Hangi hipotezin gerçekten doğru olduğunu tekrar üreterek doğrulamak'],
              ['Flaky bir testin 3-5 koşumunun log\'u', 'Koşumlar arasındaki örüntüyü tespit et (zamanlama, sıra, ortam)', 'Düzeltmenin bir kod değişikliği mi yoksa bir test izolasyonu sorunu mu olduğuna karar vermek'],
              ['Repro adımları + iş etkisi', 'Gerekçeli, önerilen bir severity/priority içeren bug raporu taslağı yaz', 'Nihai severity/priority kararı — Claude bugünkü production trafiğini bilmez'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# YANLIŞ: ham log olduğu gibi yapıştırılır
[ERROR] user=ayse.yilmaz@sirket.com token=eyJhbGciOiJIUzI1NiIs... login failed at LoginService.java:42

# DOĞRU: hassas veri temizlendikten sonra yapıştırılır
[ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42`,
              en: `# WRONG: the raw log is pasted as-is
[ERROR] user=ayse.yilmaz@company.com token=eyJhbGciOiJIUzI1NiIs... login failed at LoginService.java:42

# CORRECT: sensitive data is scrubbed before pasting
[ERROR] user=<EMAIL> token=<REDACTED> login failed at LoginService.java:42`,
            },
          },
          bugAnalysisAnimation,
          bugAnalysisOrder,
          bugReportPlayground,
          {
            type: 'quiz',
            question: `Kök neden hipotezi almak için müşterinin e-postasını ve aktif bir session token'ını içeren ham bir log'u Claude'a yapıştırıyorsun. Hipotez doğru çıksa bile bu eylemde yanlış olan nedir?`,
            options: [
              { id: 'a', text: 'Hiçbir şey — konuşma özeldir' },
              { id: 'b', text: 'Kişisel olarak tanımlanabilir bilgiyi ve canlı bir kimlik bilgisini temizlemeden dış bir servise maruz bıraktın — sızmış bir API key\'i döndürebildiğin gibi geri alınamayan bir maruziyet' },
              { id: 'c', text: 'Claude zaten gerçek veri içeren logları işleyemez, o yüzden fark etmez' },
              { id: 'd', text: 'Bu sadece hipotez yanlış çıkarsa bir sorundur' },
            ],
            correct: 'b',
            explanation: `Temizleme, sonuca bağlı koşullu bir adım değildir. Kendi sistemlerinin dışında herhangi bir yere yapıştırılan canlı bir session token, gönderildiği an maruz kalmıştır — ortaya çıkan hipotezin doğruluğunun bu maruziyetin olup olmadığıyla hiçbir ilgisi yoktur.`,
            retryQuestion: {
              question: `Flaky bir test aralıklı olarak başarısız oluyor. Tek bir başarısız koşumun log'unu yapıştırıp Claude'dan kök neden istiyorsun. Yaklaşımından eksik olan nedir?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — tek bir net başarısızlık log\'u herhangi bir kök neden analizi için yeterlidir' },
                { id: 'b', text: 'Tek bir koşum bir örüntüyü ortaya çıkaramaz — 3-5 koşumu yapıştırmak Claude\'un başarısızlıklar arasında NEYİN değiştiğini (zamanlama, test sırası, paylaşılan state) görmesini sağlar, ki bunu tek bir log gösteremez' },
                { id: 'c', text: 'Kök neden yerine doğrudan düzeltmeyi istemeliydin' },
                { id: 'd', text: 'Flaky testler AI yardımıyla hiç analiz edilemez' },
              ],
              correct: 'b',
              explanation: `Flaky'lik, tanımı gereği tekil bir koşumun özelliği değil, koşumlar arası bir örüntüdür. Tek bir log, Claude'a da sana verdiği aynı kör noktayı verir: sadece neyin değişebileceği hakkında teori üretebilir, gerçekte neyin değiştiğini tespit edemez.`,
            },
          },
        ],
      },
      {
        title: `🧬 Test Verisi Üretimi`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🪆',
            content: `Claude'dan equivalence-partitioning test verisi istemek, bir terziden olası her ölçüden bir tane sipariş etmek yerine her beden kategorisinden (XS/S/M/L/XL) bir kıyafet istemeye benzer — mekanizma birebir örtüşür: equivalence partitioning sonsuz olası girdiyi zaten temsili sınıflara indirger, ve bir LLM, sınıfları isimlendirdiğin an "her sınıftan inandırıcı bir örnek" oluşturmakta mükemmeldir, ama gerçek iş kuralını (bu alan için "geçerli" sayılan aralık nedir) belirtmezsen sınıfları doğru icat edemez. Üzerinde durulmaya değer soru şu: Claude bir saniyede bin tane sahte kimlik-şeklinde sayı üretebiliyorsa, bunun yerine test için production'dan 10 GERÇEK müşteri kaydı almak neden hâlâ tehlikeli? Çünkü gerçek bir kayıt, paylaşılan bir test ortamında veya bir bug raporu ekran görüntüsünde sızarsa gerçek sonuçlar doğurur, oysa sadece geçerli GÖRÜNEN (doğru hane sayısı, doğru checksum şekli) iyi biçimlendirilmiş bir SAHTE kayıt sıfır gizlilik maruziyetiyle tamamen aynı kod yolunu çalıştırır. Java karşılaştırması: bu, Java Faker kütüphanesinin sadece test scope'unda gelmesinin, gerçek bir çalışanın adını bir unit test fixture'ına gömmek yerine Faker.name().fullName() üretmesinin ardındaki aynı akıl yürütmedir. QA tarafındaki bedel: gerçek müşteri kişisel verisiyle doldurulmuş bir test veritabanı — "test" ortamında bile olsa — bir denetimde keşfedilmeyi bekleyen bir uyumluluk olayıdır, oysa LLM veya Faker tarafından üretilmiş benzeri verilerle doldurulmuş bir tanesi sıfır düzenleyici maruziyetle aynı test kapsamını taşır.`,
          },
          { type: 'heading', text: `İstek Üzerine Sınır ve Equivalence Verisi` },
          {
            type: 'text',
            content: `Equivalence class'ları ve sınır değerlerini prompt'ta açıkça isimlendir — örneğin, "yaş alanı: 18-65 geçerli, 18'in altı ve 65'in üstü geçersiz, sınır tam olarak 18 ve 65." Claude bundan sonra daha önce hiç görmediği bir alan için hangi sınırların önemli olduğunu tahmin etmek yerine her sınıftan bir örnek üretir.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: neden her şey için Java Faker kullanmayalım? Faker deterministiktir, hızlıdır ve JENERİK alanlar (isimler, adresler, e-postalar) için savaş testinden geçmiştir — her otomatik CI koşumunda ona başvur. Claude, VERİ ŞEKLİNİN kendisinin Faker çağrının kodlamadığı bir domain hükmü gerektirdiği durumlarda daha iyidir — örneğin "belirli bir iş kuralı yüzünden %40'ın üzerinde farklı davranan bir indirim alanı için 5 satırlık sınır değer üret" gibi. Genel kural: hacim ve CI hızı için Faker, hangi değerlerin önemli olduğunun tek seferlik TASARIMI için Claude — sonra bunları Faker'a veya sabit bir veri setine bağlarsın.`,
          },
          {
            type: 'table',
            headers: ['İhtiyaç', 'Faker (Java)', 'Claude'],
            rows: [
              ['Yük testleri için toplu, gerçekçi isim/e-posta/adres', 'En iyisi — deterministik, çevrimdışı, kayıt başına sıfır API maliyeti', 'Aşırı — test satırı başına bir LLM çağrısı harcama'],
              ['Belirli bir kural için hangi sınır/edge değerlerin önemli olduğuna karar verme', 'Buna karar veremez — Faker sadece bir tip içinde rastgeleleştirir', 'En iyisi — kuralı akıl yürütür ve temsili sınıflar önerir'],
              ['Tek seferlik, gerçekçi görünen kimlik/IBAN-şekilli test değerleri', 'Bakımı yapılan bir locale eklentisiyle mümkün', 'Prototipleme için hızlı — ama güvenmeden önce checksum/format algoritmasının gerçekten geçerli olduğunu doğrula'],
            ],
          },
          {
            type: 'code',
            language: 'sql',
            code: {
              tr: `-- İstenen format: SQL INSERT, sınır değer + equivalence class'lar dahil
INSERT INTO test_users (id, age, expected_result) VALUES
  (1, 17, 'REDDEDILDI'),   -- sınırın hemen altı (geçersiz sınıf)
  (2, 18, 'KABUL'),        -- alt sınır (geçerli sınıfın başı)
  (3, 40, 'KABUL'),        -- geçerli sınıfın ortası
  (4, 65, 'KABUL'),        -- üst sınır (geçerli sınıfın sonu)
  (5, 66, 'REDDEDILDI');   -- sınırın hemen üstü (geçersiz sınıf)`,
              en: `-- Requested format: SQL INSERT, including boundary values + equivalence classes
INSERT INTO test_users (id, age, expected_result) VALUES
  (1, 17, 'REJECTED'),   -- just below the boundary (invalid class)
  (2, 18, 'ACCEPTED'),   -- lower boundary (start of the valid class)
  (3, 40, 'ACCEPTED'),   -- middle of the valid class
  (4, 65, 'ACCEPTED'),   -- upper boundary (end of the valid class)
  (5, 66, 'REJECTED');   -- just above the boundary (invalid class)`,
            },
          },
          testDataAnimation,
          testDataOrder,
          testDataPlayground,
          {
            type: 'quiz',
            question: `Her gece CI'da çalışan bir yük testi için 500 gerçekçi sahte müşteri adı ve e-postasına ihtiyacın var. Bu spesifik ihtiyaç için doğru araç hangisi?`,
            options: [
              { id: 'a', text: 'Claude\'dan tek bir prompt\'ta 500\'ünü üretmesini iste' },
              { id: 'b', text: 'Java Faker (veya eşdeğer bir kütüphane) — deterministik, hızlı, çevrimdışı ve tam olarak toplu jenerik alan üretimi için tasarlanmış; her CI koşumunda bir LLM çağrısı, hiçbir tasarım faydası olmadan maliyet ve gecikme ekler' },
              { id: 'c', text: 'Bir yedekten 500 gerçek müşteri kaydı kopyala, çünkü en gerçekçi olanlar onlardır' },
              { id: 'd', text: 'Doğruluk için 500 satırı elle yaz' },
            ],
            correct: 'b',
            explanation: `Görevde hiçbir tasarım belirsizliği yok — bu saf hacimde jenerik alan üretimi, tam olarak Faker'ın uzmanlık alanı. Burada bir LLM'e başvurmak, deterministik bir kütüphanenin zaten anında ve çevrimdışı ürettiği bir çıktı için her CI koşumuna gecikme ve maliyet ekler.`,
            retryQuestion: {
              question: `Claude, geçerli görünen bir checksum'la birlikte gerçek kimlik numaralarıyla aynı formatta sayılar içeren bir test verisi partisi üretti. Bu veri paylaşılan bir test veritabanına dokunmadan önce ne doğrulamalısın?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — Claude ürettiyse mutlaka sahtedir' },
                { id: 'b', text: 'Üretilen her değerin gerçekten kurgusal olduğunu ve tesadüfen gerçek bir kimlikle çakışmadığını, ayrıca ekibinin veri politikasının o ortamda format olarak geçerli sahte kimliklere bile izin verdiğini' },
                { id: 'c', text: 'Checksum algoritmasının kamuya açık olarak belgelendiğini' },
                { id: 'd', text: 'Bu sadece Faker\'a özgü bir endişedir, Claude veri ürettiğinde geçerli değildir' },
              ],
              correct: 'b',
              explanation: `Bir LLM, gerçek kimliklerle çakışmayacağını garanti etmez ve format olarak geçerli sahte veri bazı kurumlarda hâlâ uyumluluk kurallarına takılabilir. "Claude uydurdu" ifadesi, ekibinin gerçek veri işleme politikasının yerini tutmaz.`,
            },
          },
        ],
      },
      {
        title: `🤖 UI Otomasyonu: Selenium & Playwright`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗝️',
            content: `Claude'dan yapıştırılan bir HTML parçasından locator ürettirmek, bir çilingirden kilidin kendisi yerine bir FOTOĞRAFINDAN anahtar kesmesini istemeye benzer — mekanizma birebirdir: bir fotoğraf (statik bir HTML parçası) kilidin şeklini o anki haliyle gösterir, ama gerçek kilit (canlı DOM) sayfa bir sonraki render'da hafifçe farklı bir anahtar deliğine sahipse (yeniden sıralanmış bir class listesi, dinamik üretilmiş bir id), kesilen anahtar (üretilen locator) uymayabilir. Üzerinde durulmaya değer soru şu: Claude senin parçandan çalışan bir XPath ürettiyse, ÖZELLİK'te hiçbir şey değişmediği halde bu neden bir sonraki deploy'da kırılıyor? Çünkü kırılgan bir locator (derin bir XPath pozisyonu, framework'ün ürettiği bir class hash'i) DOM'un tesadüfi yapısını kodlar, geliştiricinin niyetini değil — ve sadece dondurulmuş bir HTML anlık görüntüsüyle çalışan Claude, hangi niteliklerin KARARLI (QA'nın sahip olduğu bir data-testid) hangilerinin TESADÜFİ (bir CSS-modül hash'i) olduğunu, ona öncelik vermesini söylemedikçe bilemez. Java karşılaştırması: bu, bir private field'a tam bildirim sırasına göre bir reflection çağrısını gömmekle aynı kırılganlık sınıfındadır — bugün derlenir ve çalışır ama aslında güvendiğin kontrat hiçbir zaman bir garanti değildi. QA tarafındaki bedel: ilgisiz her frontend refactor'ünde sessizce kıran, Claude'un ürettiği XPath locator'larla dolu bir CI seti, yerini aldığı elle yazılmış locator'lardan bakımı daha yavaştır — düzeltme, Claude'a data-testid'e öncelik vermesini prompt'lamaktır, ilk ürettiği selector'ı kabul etmek değil.`,
          },
          { type: 'heading', text: `HTML Parçasından Refactor'e Dayanıklı Bir Locator'a` },
          {
            type: 'text',
            content: `Gerçek HTML elementini yapıştır (bir açıklamasını değil) ve Claude'a pozisyonel/yapısal selector'lar (nth-child, derin XPath) yerine kararlı bir niteliğe (data-testid, aria-label, bir role) öncelik vermesini açıkça söyle. Yapıştırılan HTML'de kararlı bir nitelik yoksa, Claude'dan bu boşluğu sessizce kırılgan bir fallback uydurmak yerine açıkça bildirmesini iste.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: neden tek seferlik locator'lar yerine tam bir Page Object Model iskeleti üretilsin? Bir POM, yukarıdaki kırılganlık riskini tam olarak sayfa başına TEK bir dosyada merkezileştirir — bir locator kırılırsa, onu satır içinde tekrarlayan her testi aramak yerine tek bir yerde düzeltirsin. Claude, sayfanın HTML'ini ve ihtiyacın olan eylemleri verdiğinde MEKANİK iskelette (sınıf yapısı, constructor, kullanıcı eylemlerini yansıtan metod isimleri) iyidir — ama içindeki gerçek selector DİZİLERİ, tıpkı bir önceki noktadaki gibi, hâlâ senin kararlılık incelemene ihtiyaç duyar.`,
          },
          {
            type: 'table',
            headers: ['Görev', 'Prompt\'a Dahil Edilecek Eleman', 'Hâlâ Senin Doğrulaman Gereken'],
            rows: [
              ['Bir locator üret', 'Gerçek yapıştırılmış HTML elementi + "XPath pozisyonu yerine data-testid/aria-label\'a öncelik ver"', 'Güvenmeden önce canlı sayfaya karşı çalıştır — inandırıcı bir selector, çalışan bir selector değildir'],
              ['Bir Page Object iskeleti üret', 'Sayfanın anahtar elementleri + testlerinin yaptığı eylemler (login, gönder, gezin)', 'Metod isimlerinin Claude\'un tahmini değil, testinin gerçek söz dağarcığıyla eşleştiğini'],
              ['Kırık bir testi düzelt', 'Hatanın açıklaması değil, tam hata mesajı/stack trace + mevcut locator/kod', 'Düzeltmenin assertion\'ı sessizce susturmak yerine gerçek DOM değişikliğini ele aldığını'],
            ],
          },
          { type: 'heading', text: `Page Object Model: Java Selenium ve TypeScript Playwright` },
          {
            type: 'code',
            language: 'java',
            label: 'Java (Selenium)',
            code: {
              tr: `public class LoginPage {
    private WebDriver driver;

    // Konum yerine kararlı data-testid nitelikleri kullanılır
    private By emailInput = By.cssSelector("[data-testid='login-email']");
    private By passwordInput = By.cssSelector("[data-testid='login-password']");
    private By submitButton = By.cssSelector("[data-testid='login-submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String email, String password) {
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitButton).click();
    }
}`,
              en: `public class LoginPage {
    private WebDriver driver;

    // Stable data-testid attributes are used instead of position
    private By emailInput = By.cssSelector("[data-testid='login-email']");
    private By passwordInput = By.cssSelector("[data-testid='login-password']");
    private By submitButton = By.cssSelector("[data-testid='login-submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void login(String email, String password) {
        driver.findElement(emailInput).sendKeys(email);
        driver.findElement(passwordInput).sendKeys(password);
        driver.findElement(submitButton).click();
    }
}`,
            },
          },
          {
            type: 'code',
            language: 'typescript',
            label: 'TypeScript (Playwright)',
            code: {
              tr: `export class LoginPage {
  constructor(private page: Page) {}

  // Aynı kararlı data-testid nitelikleri, Playwright locator API'si
  private email = this.page.getByTestId('login-email');
  private password = this.page.getByTestId('login-password');
  private submit = this.page.getByTestId('login-submit');

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}`,
              en: `export class LoginPage {
  constructor(private page: Page) {}

  // Same stable data-testid attributes, Playwright locator API
  private email = this.page.getByTestId('login-email');
  private password = this.page.getByTestId('login-password');
  private submit = this.page.getByTestId('login-submit');

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}`,
            },
          },
          uiFixLoopAnimation,
          uiFixLoopOrder,
          uiLocatorFixPlayground,
          {
            type: 'quiz',
            question: `Claude, yapıştırdığın HTML'den çalışan bir XPath locator üretiyor ve test bugün geçiyor. İki hafta sonra, ilgisiz bir frontend refactor'ünün ardından aynı test başarısız oluyor. En olası açıklama nedir?`,
            options: [
              { id: 'a', text: 'Claude\'un model kalitesi iki hafta içinde düştü' },
              { id: 'b', text: 'XPath büyük olasılıkla kararlı, geliştiricinin sahip olduğu bir nitelik yerine DOM\'un tesadüfi yapısını (element pozisyonu, üretilmiş class isimleri) kodladı — refactor\'ler tesadüfi yapıyı serbestçe değiştirir' },
              { id: 'c', text: 'XPath locator\'ları nasıl yazılırsa yazılsın her zaman kırılır' },
              { id: 'd', text: 'Testin kendisinde locator\'la ilgisiz bir mantık hatası olmalı' },
            ],
            correct: 'b',
            explanation: `Pozisyon ve yapı, bir frontend ekibinin korumayı taahhüt ettiği bir kontrat asla değildir; data-testid veya aria-label ise öyledir. Dondurulmuş bir HTML anlık görüntüsünden, kararlı niteliklere öncelik verme talimatı olmadan üretilen bir locator, ikisini ayırt edecek hiçbir yola sahip değildir.`,
            retryQuestion: {
              question: `Claude, login sayfan için metod isimleri ve locator'lar dahil eksiksiz bir Page Object Model sınıfı üretti. Sete güvenmeden önce hâlâ ne yapman gerekir?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — üretilen bir POM iskeleti her zaman production\'a hazırdır' },
                { id: 'b', text: 'Locator\'ların gerçekten çözümlendiğini doğrulamak için canlı sayfaya karşı çalıştır, ve metod isimlerinin Claude\'un tahmini yerine testinin gerçek söz dağarcığıyla eşleştiğini kontrol et' },
                { id: 'c', text: 'Sınıfın tamamını elle yeniden yaz — üretilen kod asla kullanılamaz' },
                { id: 'd', text: 'Sadece sınıfın derlendiğini kontrol et — derlenen bir locator, çalışan bir locator\'dur' },
              ],
              correct: 'b',
              explanation: `Derlenmek, canlı DOM'da çözümlenmekle aynı şey değildir — inandırıcı bir selector dizesi, doğrulanmış bir selector değildir. Mekanik iskelet (yapı, isimlendirme) Claude'un güçlü olduğu yerdir; spesifik selector'ların ve metod isimlerinin gerçekten uygulamana ve ekibinin söz dağarcığına uyup uymadığı hâlâ senin kararındır.`,
            },
          },
        ],
      },
      {
        title: `🔌 API Testinde Claude`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🏢',
            content: `Claude'a yapıştırılan bir response JSON'ından API test assertion'ları yazdırmak, bir müfettişten TEK bir bitmiş odanın fotoğraflarını gördükten sonra bir yapı yönetmeliği kontrol listesi yazmasını istemeye benzer — mekanizma birebirdir: fotoğraf, yanıtın o an nasıl göründüğünü gösterir (gerçek JSON), ama iyi bir assertion seti odanın DOĞRU bitmediğinde (eksik bir alan, yanlış bir tip, bir hata durumu) ne olacağını da kapsamalıdır — bu bilgiyi mutlu yol yanıtının tek başına asla göstermediği bir şey. Üzerinde durulmaya değer soru şu: Claude senin 200 OK JSON'ını okuyup içindeki her alan için kusursuz assertion yazabiliyorsa, o set neden hâlâ eksik? Çünkü sadece mutlu yolu gördü — ona bir 422 doğrulama hatasının veya bir 500'ün neye benzediğini kimse göstermedi, o yüzden hiç görmediği hata şekilleri üzerine assertion yazamaz; bu senaryoları sen sağlamalı veya açıkça istemelisin. Java karşılaştırması: bu, gerçek API kontratından (OpenAPI spec) değil, tek bir geçen koşumun kaydedilmiş çıktısından JUnit assertion'ları yazmak gibidir — bir kere olanı kusursuzca test edersin ama kontratın edge case'ler için gerçekte vaat ettiğini kaçırırsın. QA tarafındaki bedel: %100 yeşil ama dokümante edilmiş bir 400/401/404/500 davranışını hiç doğrulamamış bir API seti, tam olarak gerçek production olaylarının (kötü girdi, auth hataları, downstream timeout'lar) yaşandığı yerde sahte güven verir.`,
          },
          { type: 'heading', text: `Response JSON'ından Gerçek Assertion'lara` },
          {
            type: 'text',
            content: `Gerçek bir yanıt yapıştır ve açık kısıtı ekle: "X geçersiz girdi için ne olacağını da sor" — Claude bundan sonra mutlu yol için alan alan assertion önerir ve istenirse, gerçek kontratı onayladıktan sonra da doğrulanacak olası 4xx/5xx şekillerini hipotez eder.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: neden endpoint'i sadece kelimelerle anlatmak yerine OpenAPI spec'ini yapıştırasın? Bir OpenAPI tanımı zaten Gherkin ile aynı Given/When/Then tarzı zorlayıcı mekanizmadır — her parametreyi, zorunlu/opsiyonel bayrağını ve response şemasını açıkça isimlendirir, tam olarak Test Case Üretimi sekmesinde tartışılan türden oracle belirsizliğini ortadan kaldırır. OpenAPI spec'in yoksa endpoint'i gayriresmi olarak anlatmak da işe yarar, ama Claude'un çıktısının daha fazlasının onaylanmış kural yerine işaretli varsayım olmasını bekle.`,
          },
          {
            type: 'table',
            headers: ['Girdi', 'Ne İstersin', 'Framework Çıktısı'],
            rows: [
              ['OpenAPI/endpoint tanımı', 'Dokümante edilmiş her status code\'u kapsayan pozitif + negatif test senaryoları üret', 'REST Assured (Java) test sınıfı YA DA Postman/Bruno test script\'i — hangisini belirt'],
              ['Gerçek bir 200 OK response body\'si', 'Alan alan assertion\'lar, artı eksik/null/yanlış-tip bir alanın NASIL görünmesi gerektiği', 'Seçtiğin framework\'te assertion kodu'],
              ['(hata yolu için gerçek yanıt yok)', 'Spec\'e dayanarak olası 4xx/5xx şeklini hipotez et, tekrar üretilene kadar onaylanmamış işaretle', 'Güvenmeden önce gerçek bir hata yanıtına karşı doğrulayacağın bir taslak assertion'],
            ],
          },
          {
            type: 'code',
            language: 'java',
            label: 'REST Assured (Java)',
            code: {
              tr: `given()
    .header("Authorization", "Bearer " + token)
.when()
    .get("/api/users/{id}", 42)
.then()
    .statusCode(200)
    .body("id", equalTo(42))
    .body("email", notNullValue())
    // Sözleşmeye göre henüz doğrulanmamış: 404 durumunda body şekli
    .body("email", containsString("@"));`,
              en: `given()
    .header("Authorization", "Bearer " + token)
.when()
    .get("/api/users/{id}", 42)
.then()
    .statusCode(200)
    .body("id", equalTo(42))
    .body("email", notNullValue())
    // Not yet confirmed against the contract: the body shape on a 404
    .body("email", containsString("@"));`,
            },
          },
          {
            type: 'code',
            language: 'javascript',
            label: 'Postman / Bruno test script',
            code: {
              tr: `// tests bloğu - Postman/Bruno ikisinde de aynı sözdizimi
pm.test("status is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("email field is valid", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.include("@");
});`,
              en: `// tests block - same syntax in both Postman and Bruno
pm.test("status is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("email field is valid", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.include("@");
});`,
            },
          },
          apiAssertionAnimation,
          apiAssertionOrder,
          apiAssertionPlayground,
          {
            type: 'quiz',
            question: `Bir API test seti %100 yeşil: 200 OK yanıtındaki her assertion geçiyor. Set, dokümante edilmiş 404 veya 422 davranışını hiç doğrulamamış. Bu setin kapsamının gerçek durumu nedir?`,
            options: [
              { id: 'a', text: 'Tam — tamamen yeşil bir set, API\'nin tam test edildiği anlamına gelir' },
              { id: 'b', text: 'Eksik — sadece mutlu yolu doğruladı; gerçek production olaylarının (kötü girdi, eksik auth) tam olarak yaşandığı yer olan dokümante edilmiş hata davranışları hiç çalıştırılmadı' },
              { id: 'c', text: 'Hata status kodları Claude yardımıyla test edilemez' },
              { id: 'd', text: 'REST Assured kullanıldığı sürece set tamdır' },
            ],
            correct: 'b',
            explanation: `"%100 yeşil", sadece gerçekten doğrulananı tanımlar, kontratın vaat ettiğini değil. Dokümante edilmiş 4xx/5xx davranışına hiç dokunmayan bir set, gerçek bir olaya yol açması en olası alanda bir kapsam boşluğuna sahiptir.`,
            retryQuestion: {
              question: `Claude, bozuk bir e-postanın { "error": "invalid_email" } içeren bir 422 döndürmesi gerektiğini hipotez ediyor ama sen bu yanıtı hiç gerçekten tetiklemedin. Bu assertion sete girmeden önce ne olmalı?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — Claude\'un hipotezi gerçek API kurallarıyla eğitilmiş, güvenmek güvenlidir' },
                { id: 'b', text: 'Gerçek 422 yanıtını bozuk bir e-posta göndererek kendin tekrar üretirsin ve assertion\'ı eklemeden önce gerçek şeklin hipotezle eşleştiğini doğrularsın' },
                { id: 'c', text: 'Hipotez atılmalı — AI hata yanıtları hakkında akıl yürütemez' },
                { id: 'd', text: 'Doğrudan ekle, yanlış çıkarsa sonra düzelt' },
              ],
              correct: 'b',
              explanation: `İnandırıcı bir hata şekli, tekrar üretilene kadar hâlâ bir tahmindir. "Sonra düzelt" diyerek doğrulanmamış bir assertion eklemek, gerçek API tesadüfen tahminle eşleşirse yanlış sebepten sessizce geçen, hiç gerçek olmamış bir davranış üzerine assertion yazan bir setle sonuçlanır.`,
            },
          },
        ],
      },
      {
        title: `💻 Claude Code: Terminalde Ajan`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧑‍💼',
            content: `Claude Code, çok yetenekli yeni bir ekip üyesine bir klavye verip "bu dosyalara dokunabilirsin, bu komutları çalıştırabilirsin, ama ŞUNU yapmadan önce sor" demeye benzer — mekanizma birebirdir: izin modları (her seferinde sor vs. salt-okunur için otomatik onay vs. tam erişim), yöneticisi yokken yeni işe alınanın izinsiz yapabileceklerinin tam sınırıdır, her commit'e onay gerektiren bir junior ile merge yetkisi olan bir senior arasındaki aynı ayrım. Üzerinde durulmaya değer soru şu: Claude Code başarısız bir testi okuyup çalıştırabiliyor ve düzeltmeyi kendisi düzenleyebiliyorsa, neden bir komutu çalıştırmadan önce SORMASINI, sadece yapması yerine istiyorsun? Çünkü özerk bir ajanın etki alanı, dokunmasına izin verilen şeyle ölçeklenir — salt-okunur bir izin modu yapısı gereği güvenlidir (geri alınacak hiçbir şey yok), oysa keyfi shell komutları çalıştırabilen veya bir branch'e push edebilen bir mod, yeni işe alınanın gözetimsiz ilk haftasına uygulayacağın aynı inceleme disiplinini gerektirir. Java karşılaştırması: bu, rol-bazlı bir izin sisteminin "bu kaynağı okuyabilir" ile "yazabilir/çalıştırabilir" arasında çizgi çekmesiyle aynı erişim kontrolüdür — dar olan iyi çalışıyor diye geniş olanı vermezsin. QA tarafındaki bedel: diff'lerini kontrol eden bir insan olmadan paylaşılan bir CI runner'a veya production'a yakın bir branch'e incelenmemiş yazma+çalıştırma erişimi verilen bir ajan, bu platformun kendi security sayfasının kapsadığı aynı kategoride bir tedarik zinciri riskidir — sadece aktör bir insan saldırgan yerine bir AI'dır.`,
          },
          { type: 'heading', text: `Oku → Çalıştır → Düzelt → Tekrar Çalıştır Döngüsü` },
          {
            type: 'text',
            content: `İzin verildiğinde Claude Code, başarısız test dosyasını okur, çalıştırır, gerçek hata çıktısını okur, bir düzenleme önerir ve tekrar çalıştırır — bir geliştiricinin elle yaptığı aynı debug döngüsü, ama ajan bunu her komutu yeniden yazmana gerek kalmadan aynı terminal oturumunda yapar.`,
          },
          {
            type: 'text',
            content: `Meta-örnek — tam olarak bu platform: bu projenin kendi repository'sinin kökünde bir CLAUDE.md dosyası vardır, ajanın her oturum başında okuduğu, aynı proje kurallarının tekrar tekrar söylenmesine gerek kalmayan yazılı bir anayasa. Aynı şekle sahip temsili bir alıntı (gerçek dosya değil, bir yer tutucu):`,
          },
          {
            type: 'code',
            language: 'markdown',
            code: {
              tr: `# CLAUDE.md (örnek özet, gerçek dosya değil)
## Kurallar
- İçerik değişikliği src/data/*.js dışına taşmaz.
- Her yeni kod bloğu bir practice/animasyon ile eşleşmeli.
- Build'i her değişiklikten sonra çalıştır.`,
              en: `# CLAUDE.md (representative summary, not the real file)
## Rules
- Content changes stay within src/data/*.js.
- Every new code block must pair with a practice/animation.
- Run the build after every change.`,
            },
          },
          {
            type: 'text',
            content: `Akıl yürütme: proje kurallarını her prompt'ta tekrarlamak yerine neden ajanın okuduğu bir dosyaya yazasın? Çünkü böyle bir dosya oturum başına BİR KEZ okunur ve sonrasında sonraki her eylemi sessizce bilgilendirir — bir ekibin kod stilini her pull request incelemesinde yeniden anlatmak yerine bir CONTRIBUTING.md yazmasıyla aynı sebep.`,
          },
          { type: 'heading', text: `İzin Modları ve Güvenli Kullanım` },
          {
            type: 'text',
            content: `Her seferinde sor, salt-okunur için otomatik onay ve tam erişim için otomatik onay, aynı etki-alanı ölçeğinde farklı noktalardır. Ajanın görevi yapmasına izin veren en dar modu seç, paylaşılan veya production'a yakın branch'lerde yazma eylemlerini kabul etmeden önce diff'leri incele — herhangi bir yeni ekip üyesinin gözetimsiz ilk haftasına uygulayacağın aynı disiplin.`,
          },
          { type: 'heading', text: `Komut Satırı Kalıpları` },
          {
            type: 'code',
            language: 'bash',
            code: {
              tr: `# İnteraktif ajan oturumu başlat
claude

# Tek seferlik, headless bir görev çalıştır (CI'da kullanışlı)
claude -p "flaky testleri bul ve nedenini raporla"

# Belirli bir görevle başlat, sonra manuel devam et
claude "son commit'teki başarısız testi düzelt"`,
              en: `# Start an interactive agent session
claude

# Run a one-off, headless task (useful in CI)
claude -p "find flaky tests and report why"

# Start with a specific task, then continue manually
claude "fix the failing test from the last commit"`,
            },
          },
          claudeCodeLoopAnimation,
          claudeCodeLoopOrder,
          claudeCodeScopedTaskPlayground,
          {
            type: 'quiz',
            question: `Tam erişim modu başarısız testi daha hızlı düzelttirecek olsa bile, bir senior tester paylaşılan bir branch'te Claude Code için neden bilinçli olarak salt-okunur izin modunu seçer?`,
            options: [
              { id: 'a', text: 'Salt-okunur mod her zaman daha yavaştır ve gerçek bir güvenlik faydası sağlamaz' },
              { id: 'b', text: 'Salt-okunur bir mod yapısı gereği güvenlidir — geri alınacak hiçbir şey yok — oysa paylaşılan bir branch\'te yazma yapabilen bir ajan, herhangi bir yeni işe alınanın gözetimsiz değişiklikleriyle aynı diff-inceleme disiplinini gerektirir' },
              { id: 'c', text: 'Claude Code salt-okunur modda test çalıştıramaz' },
              { id: 'd', text: 'İzin modları sadece hızı etkiler, riski değil' },
            ],
            correct: 'b',
            explanation: `Hız ve etki alanı ayrı eksenlerdir. Başkalarının güvendiği bir branch'te daha hızlı, yazma yapabilen bir ajan gerçek bir risk taşır (başkalarının üzerine inşa ettiği bir yere incelenmemiş bir değişiklik gitmesi); daha dar mod, senin incelemen olmadan hiçbir şeyin olmayacağı garantisi için biraz hızdan ödün verir.`,
            retryQuestion: {
              question: `Main branch'inde, otomatik-onay-tümü izinleri açıkken Claude Code'a "bütün testleri düzelt" diyorsun. Düzeltmeler doğru çıksa bile bu talimatın en olası sorunu nedir?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — daha geniş bir talimat sadece daha fazlasının daha hızlı düzeltilmesi demektir' },
                { id: 'b', text: 'Kapsam sınırsız, bu yüzden ajan senin incelemen olmadan sayısız ilgisiz dosyayı değiştirebilir — talimat belirli bir dosyaya veya teste kapsamlanmalı ve uygulamadan önce düzeltmeyi göstermesi istenmeli' },
                { id: 'c', text: 'Claude Code birden fazla dosyayı kapsayan talimatları işleyemez' },
                { id: 'd', text: 'Bu sadece testler zaten geçiyorsa bir sorundur' },
              ],
              correct: 'b',
              explanation: `Sınırsız bir talimat, otomatik-onay-tümü izinleriyle birleşince hem kapsamı HEM incelemeyi ortadan kaldırır — özerk bir ajanın etki alanını sınırlayan tam olarak iki güvenlik önlemi. Nihai düzeltmelerin doğruluğu, eksik güvenlik önlemlerini geriye dönük olarak güvenli hale getirmez.`,
            },
          },
        ],
      },
      {
        title: `🔗 MCP (Model Context Protocol)`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔌',
            content: `MCP, bir hastanenin standartlaştırılmış ekipman portuna benzer — mekanizma birebirdir: standart bir port var olmadan önce, her cihaz (bir infüzyon pompası, bir monitör) her spesifik hastane yatağı için özel yapılmış kendi konektörüne ihtiyaç duyardı; MCP, herhangi bir aracın (bir tarayıcı sürücüsü, bir veritabanı okuyucusu, bir bilet sistemi) takılabileceği TEK bir standart arayüz tanımlar ve protokolü konuşan herhangi bir AI ajanı, araç başına özel bir entegrasyon olmadan onu kullanabilir. Üzerinde durulmaya değer soru şu: Claude zaten senin çalıştırman için Selenium kodu üreterek "web'de gezinebiliyorsa", bir tarayıcıyı doğrudan kontrol etmesi için AYRI bir protokole neden ihtiyacımız var? Çünkü senin çalıştırdığın kod üretmek ile bir ajanın standart bir araç arayüzü üzerinden canlı bir tarayıcıyı doğrudan sürmesi farklı yetenek sınıflarıdır — birincisi hâlâ senin çalıştırıp sonuçları elle bildirmeni gerektirir; MCP, ajanın gerçek DOM'u veya sorgu sonucunu görmesine ve bir sonraki eylemine aynı döngüde karar vermesine izin verir, sen mesajcı olmadan. Java karşılaştırması: bu, JDBC'nin her satıcı için özel bir sürücü yazmak yerine "herhangi bir Java programı herhangi bir veritabanıyla konuşabilir" diye standartlaştırmasıyla aynı sıçramadır — MCP, "herhangi bir AI ajanı herhangi bir dış araçla konuşabilir" diye standartlaştırır ve bir tarayıcı veya veritabanı sadece başka bir JDBC-şekilli konektöre dönüşür. QA tarafındaki bedel: test veritabanını doğrudan sorgulayabilen MCP bağlantılı bir ajan, seed edilen veriyi doğrulamak için güçlüdür, ama yanlış yapılandırılırsa aynı bağlantı gerçek yazma erişimine sahip gerçek bir kimlik bilgisidir — izin sınırı, bir önceki sekmede Claude Code CLI için olduğu kadar önemlidir, sadece yerel dosya sistemin yerine dış sistemlere genişletilmiştir.`,
          },
          { type: 'heading', text: `Gerçek Tarayıcı Kontrolü vs Üretilen Kod` },
          {
            type: 'text',
            content: `MCP olmadan, Claude'dan tarayıcı otomasyonu istemek sana SENİN çalıştırıp sonuçlarını bildirmen gereken Selenium/Playwright KODU verir. Playwright-MCP tarzı bir bağlantıyla Claude gerçek bir tarayıcı oturumunu doğrudan sürebilir — gezinebilir, tıklayabilir, ortaya çıkan DOM'u okuyabilir — ve bir sonraki adımına aynı konuşmada karar verebilir, daha önce seni manuel bir aktarıcı olarak gerektiren döngüyü kapatarak.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: bir QA mühendisi neden sadece bir script ürettirmek yerine bir ajanın GERÇEK bir tarayıcıyı kontrol etmesini istesin? Çünkü bazı görevler betiklenmiş değil, keşifseldir — "giriş yap ve neyin bozulduğunu söyle" görevinin çalıştırılacak önceden yazılmış bir testi yoktur; canlı-tarayıcı-bağlantılı bir ajan, elle test eden birinin yaptığı gibi doğaçlama yapabilirken, üretilen bir script sadece önceden yazılanı olduğu gibi çalıştırabilir.`,
          },
          { type: 'heading', text: `Test Verisi Doğrulama için Veritabanı MCP` },
          {
            type: 'text',
            content: `Veritabanı bağlantılı bir MCP server, Claude'un seed edilen veriyi doğrulamak veya bir bug'ın gerçek durumunu teyit etmek için doğrudan bir test veritabanını sorgulamasına izin verir, sen sorgu sonuçlarını ileri geri kopyala-yapıştır yapmak yerine. Claude Code'la aynı önce-salt-okunur disiplini geçerlidir: salt-okunur bir DB bağlantısı yapısı gereği güvenlidir, yazma yapabilen bir tanesi ise yazma yapabilen bir CLI izin moduyla aynı inceleme disiplinini gerektirir.`,
          },
          {
            type: 'table',
            headers: ['MCP Bağlantısı', 'Neyi Mümkün Kılar', 'Belirlenecek İzin Sınırı'],
            rows: [
              ['Tarayıcı (Playwright tarzı)', 'Ajan, sonuçları sen aktarmadan doğrudan canlı bir sayfada gezinir, tıklar ve okur', 'Hangi ortamı açabileceği — varsayılan olarak asla production\'a yönlendirme'],
              ['Veritabanı', 'Ajan, seed\'i doğrulamak veya bir bug\'ı tekrar üretmek için test verisini doğrudan sorgular', 'Varsayılan olarak salt-okunur; yazma erişimi yazma yapabilen bir CLI izniyle aynı şekilde incelenir'],
              ['(herhangi bir üçüncü parti araç server\'ı)', 'Ajan, o aracın eylemlerini kendi akıl yürütme döngüsünün parçası olarak çağırır', 'Kimlik bilgilerini görevin gerçekten ihtiyaç duyduğu en dar araç/eyleme kapsamla'],
            ],
          },
          {
            type: 'code',
            language: 'bash',
            code: {
              tr: `# Örnek: bir tarayıcı MCP server'ını projeye ekle (isim/sürüm kavramsaldır)
claude mcp add playwright-browser

# Örnek: salt-okunur bir veritabanı MCP server'ı ekle
claude mcp add test-database --read-only`,
              en: `# Example: add a browser MCP server to the project (name/version is conceptual)
claude mcp add playwright-browser

# Example: add a read-only database MCP server
claude mcp add test-database --read-only`,
            },
          },
          mcpFlowAnimation,
          mcpFlowOrder,
          mcpScopedTaskPlayground,
          {
            type: 'quiz',
            question: `"Claude senin çalıştırman için Playwright kodu üretiyor" ile "Claude bir MCP bağlantısı üzerinden bir tarayıcıyı sürüyor" arasındaki temel yetenek farkı nedir?`,
            options: [
              { id: 'a', text: 'Gerçek bir fark yok — iki yaklaşım da aynı test kapsamını üretir' },
              { id: 'b', text: 'MCP ile ajan, gerçek DOM\'u/yanıtı görür ve döngüyü kapatarak bir sonraki eylemine doğrudan karar verir; üretilen kodla sen, çalıştıran ve sonuçları geri bildiren manuel aktarıcı olarak kalırsın' },
              { id: 'c', text: 'MCP sadece veritabanı erişimi için kullanışlıdır, tarayıcılar için asla' },
              { id: 'd', text: 'Üretilen kod her zaman canlı bir MCP bağlantısından daha güvenilirdir' },
            ],
            correct: 'b',
            explanation: `Kendi çalıştırman gereken kod üretmek, ajan ile gerçek sistem arasında mesajcı olarak bir insanı döngüde tutar. Bir MCP bağlantısı bu sıçramayı kaldırır — ajan gerçek sonuçları algılar ve doğrudan onlara göre hareket eder, ki bu da keşifsel, betiklenmemiş görevleri mümkün kılan şeydir.`,
            retryQuestion: {
              question: `Bir ekip arkadaşın, "ayrı bir test instance'ı kurmaktan tasarruf etmek için" tam yazma erişimli bir veritabanı MCP bağlantısını yapılandırıp production raporlaması için kullanılan aynı veritabanına yönlendiriyor. Buradaki risk nedir?`,
              options: [
                { id: 'a', text: 'Hiçbiri — MCP bağlantıları kapsamdan bağımsız olarak doğası gereği güvenlidir' },
                { id: 'b', text: 'Production\'a yakın bir veritabanına yazma erişimi olan bir ajan, kendi akıl yürütme döngüsünün parçası olarak gerçek veriyi değiştirebilir — incelenmemiş bir CLI yazma izniyle aynı etki-alanı endişesi, sadece canlı bir veritabanına genişletilmiş' },
                { id: 'c', text: 'Bu sadece ajan bir hata yaparsa bir sorundur' },
                { id: 'd', text: 'Veritabanı MCP bağlantıları tasarım gereği yazma erişimine sahip olamaz' },
              ],
              correct: 'b',
              explanation: `Buradaki güvenlik önlemi doğruluk değil, kapsamdır. Production raporlaması için kullanılan bir sisteme yazma erişimi olan bir ajan, aldığı herhangi bir eylemin "hata" olup olmadığından bağımsız olarak, görevini sürdürmenin bir yan etkisi olarak gerçek veriyi değiştirebilir. Düzeltme, Claude Code'daki ile aynıdır: görevin gerçekten ihtiyaç duyduğu en dar izni ve ortamı ver.`,
            },
          },
        ],
      },
      {
        title: `🏗️ CI/CD & Ekipte AI`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧰',
            content: `Bir ekibin paylaşılan prompt kütüphanesi, paylaşılan bir Java utility sınıfına (bir StringUtils veya DateUtils'e) benzer — mekanizma birebirdir: her geliştiricinin "Claude'a sınır değer test verisi nasıl yazdırırım"ı her seferinde sıfırdan, her defasında hafifçe farklı bir kaliteyle icat etmesi yerine, ekip BİR KEZ iyi ayarlanmış bir prompt şablonu yazar ve herkes onu tekrar kullanır — tıpkı test edilmiş bir utility zaten varken kimsenin kendi leftPad()'ini yeniden yazmaması gibi. Üzerinde durulmaya değer soru şu: ekipteki her tester zaten tek başına çalışan prompt'lar yazabiliyorsa, paylaşılan bir kütüphaneyi sürdürmeye neden zahmet edilsin? Çünkü "çalışan" ile "tutarlı şekilde iyi" farklı çıtalardır — paylaşılan bir şablon olmadan beş tester beş farklı kalitede Gherkin senaryosu veya bug raporu üretir, kimi belirsizlik-önce adımını atlar, kimi PII temizlemeyi atlar; paylaşılan, incelenmiş bir şablon sadece en iyi prompt yazarının tavanını değil, TÜM EKİBİN TABANINI yükseltir. Java karşılaştırması: bu, tekrarlanan bir kod parçasını her gelecek çağıranın elle doğru kopyalamasına güvenmek yerine, bir pull request'te bir kez incelenmiş paylaşılan bir utility metoduna çıkarmakla aynı akıl yürütmedir. QA tarafındaki bedel: paylaşılan bir prompt kütüphanesi olmayan bir ekip, aynı dersleri (negatif senaryo istemeyi unutmak, temizlenmemiş log yapıştırmak) bağımsız ve tekrar tekrar yeniden öğrenir — paylaşılan bir Page Object Model'e sahip olmamakla aynı sınıftan kaçınılabilir bir israf.`,
          },
          { type: 'heading', text: `PR Review Döngüsünde Claude` },
          {
            type: 'text',
            content: `Claude'u (GitHub Actions üzerinden veya elle) bir PR'ın ilk-geçiş incelemesi için kullanmak — bir diff'i özetletmek, bir commit/PR açıklaması taslağı yazdırmak, açıkça riskli bir değişikliği işaretletmek — insan incelemesinin YERİNE değil, ONA EK olarak yapılır. Merge kararının sahibi hâlâ insan reviewer'dır.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: "Claude bu PR'ı onayladı" neden bir kategori hatasıdır? Onay, bir değişikliğin BU kod tabanı, BU ekibin standartları ve BU release zamanlaması için güvenli olup olmadığına dair bir yargıdır — Claude'un tek bir diff'ten bunların hiçbirine tam görünürlüğü yoktur. Gerçek değeri, yorgun bir insan reviewer'ın kaçırabileceğini yüzeye çıkarmaktır (ele alınmamış bir edge case, eksik bir test) — bir ilk geçiş, nihai söz değil.`,
          },
          { type: 'heading', text: `Ekip için Test Raporlarını Özetletme` },
          {
            type: 'text',
            content: `Büyük bir test koşumunun başarısızlık özetini yapıştırıp Claude'dan bir standup veya ekip güncellemesi için kısa, okunabilir bir özet istemek gerçekten kullanışlıdır — ama "bir sayıyı tekrarlamadan önce doğrula" disiplini burada da geçerlidir: Claude "12 başarısızlık, çoğunlukla checkout modülünde" derse, bunu bir toplantıda gerçek diye tekrarlamadan önce gerçek rapora karşı doğrula.`,
          },
          { type: 'heading', text: `Ekip Prompt Kütüphanesi Kurma` },
          {
            type: 'text',
            content: `Bir prompt, Prompt Mühendisliği sekmesindeki iterasyon disipliniyle kendini kanıtladıktan sonra, onu tüm ekibin tekrar kullanıp geliştirebileceği paylaşılan, versiyon kontrollü bir dosyaya yükselt — paylaşılan bir utility metodunun inceleneceği gibi incelenir, kişiden kişiye gelişigüzel kopyala-yapıştır edilmez.`,
          },
          {
            type: 'table',
            headers: ['Ekip Pratiği', 'Neden Önemli', 'Kime Ait'],
            rows: [
              ['Paylaşılan prompt kütüphanesi (test case, bug raporu, test verisi şablonları)', 'En iyi prompt yazarının değil, tüm ekibin tabanını yükseltir', 'Paylaşılan kod gibi incelenir ve versiyonlanır, gelişigüzel kopyala-yapıştır edilmez'],
              ['AI destekli PR review (özet, ilk-geçiş risk işaretleri)', 'İnsan inceleme turundan önce açık boşlukları daha hızlı yakalar', 'Nihai merge kararının sahibi olmaya devam eden insan reviewer'],
              ['Ekip kuralı: insan diff review\'u olmadan AI üretimi test/kod merge edilemez', 'Junior tester\'ları kendinden emin ama yanlış çıktının production\'a ulaşmasından korur', 'Review çıtasını belirleyen ve uygulayan senior mühendisler'],
            ],
          },
          {
            type: 'code',
            language: 'markdown',
            label: 'prompt-templates/test-case-from-story.md',
            code: {
              tr: `Sen kıdemli bir QA mühendisisin.
Önce belirsizlikleri listele: {{user_story}}
Onaylandıktan sonra {{n}} adet Gherkin senaryosu yaz.`,
              en: `You are a senior QA engineer.
First list the ambiguities: {{user_story}}
Once confirmed, write {{n}} Gherkin scenarios.`,
            },
          },
          promptLibraryLifecycleAnimation,
          promptLibraryLifecycleOrder,
          promptTemplatePlayground,
          {
            type: 'quiz',
            question: `Bir GitHub Actions workflow'u her PR'da Claude'u çalıştırıp "✅ Sorun görünmüyor" diye bir yorum bırakıyor. Bir junior bu yorumu onay sayıp başka bir inceleme yapmadan merge ediyor. Bu workflow'un kusuru nedir?`,
            options: [
              { id: 'a', text: 'Kusur yok — bir AI yorumu bir insan onayına eşdeğerdir' },
              { id: 'b', text: 'AI review bir ilk-geçiş ekidir, bir merge kararı değildir — bir insan reviewer\'ın hesaba kattığı kod tabanı, ekip standartları ve release zamanlamasına tam görünürlüğü yoktur; merge kararının sahibi hâlâ insan olmalıdır' },
              { id: 'c', text: 'GitHub Actions AI araçlarını hiç çalıştıramaz' },
              { id: 'd', text: 'Yorum kendinden emin bir dille yazıldığı sürece workflow sorunsuzdur' },
            ],
            correct: 'b',
            explanation: `"Onaylandı", tek bir diff'ten, daha derin bir bağlam olmadan verilen, belirli bir kod tabanı ve ekip için güvenlik hakkında bir yargıdır. Bir AI yorumunu insan onayına eşdeğer saymak, onun sadece tamamlamak için var olduğu inceleme adımını ortadan kaldırır.`,
            retryQuestion: {
              question: `Bir ekipteki beş tester, bug raporu üretimi için kendi prompt'unu yazıyor ve kalite belirgin şekilde farklı — kimi severity önerisi istemeyi hatırlıyor, kimi hatırlamıyor. Herkese "daha iyi prompt yaz" demenin ötesinde bunu çözen yapısal düzeltme nedir?`,
              options: [
                { id: 'a', text: 'Hiçbir şey — prompt kalitesi standartlaştırılamayan kişisel bir beceridir' },
                { id: 'b', text: 'En iyi performans gösteren prompt\'u ekip prompt kütüphanesinde paylaşılan, incelenmiş bir şablona yükselt — bu, sadece en iyi prompt yazarının bireysel becerisini değil, herkesin tabanını yükseltir' },
                { id: 'c', text: 'Herkesi hiç özelleştirmeye izin vermeden aynı kelimeleri kullanmaya zorla' },
                { id: 'd', text: 'Farklı bir AI aracına geç — tutarsızlığın kaynağı modeldir' },
              ],
              correct: 'b',
              explanation: `Bireysel beceri değişkendir; paylaşılan, incelenmiş bir şablon, herkesin bağımsız olarak aynı kalite çıtasına ulaşmasına bağlı olmayan yapısal bir düzeltmedir — beş kişinin kendi locator'larını yazması yerine paylaşılan bir Page Object Model'i haklı çıkaran aynı akıl yürütme.`,
            },
          },
        ],
      },
      {
        title: `🚨 Riskler & Yaygın Hatalar`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎭',
            content: `Claude'un kendinden emin görünen çıktısına doğrulamadan güvenmek, şirketinde hiç çalışmamış ama tam bir özgüvenle konuşan, çok okumuş bir stajyere güvenmeye benzer — mekanizma birebirdir: stajyer her ders kitabını okumuştur (devasa bir eğitim korpüsü) ama SENİN spesifik kod tabanının tuhaflıkları hakkında hiçbir hafızası yoktur, yani kendinden emin verilmiş bir cevap ile DOĞRU bir cevap sık sık çakışan ama birbirinden BAĞIMSIZ iki özelliktir, aynı şey değildir. Üzerinde durulmaya değer soru şu: Claude çoğu zaman doğruysa, nadiren yanlış olduğu zamanlar etrafında bütün bir "riskler" sekmesi kurmaya neden zahmet edilsin? Çünkü hata modu, ortalamasını alabileceğin rastgele bir gürültü değildir — SİSTEMATİK OLARAK GÖRÜNMEZDİR: uydurulmuş bir metod gerçek bir metodla birebir aynı görünür, tautolojik bir assertion gerçek bir kontrolle birebir aynı görünür, ta ki production'da sessizce başarısız olana kadar. Java karşılaştırması: bu, bir derleyici hatası (gürültülü, build'i durdurur) ile derlenip aceleyle yapılan bir review'dan geçen bir mantık hatası (sessiz, yayına çıkar) arasındaki farktır — bu risklerin çoğu tam olarak sözdizimsel açıdan kusursuz oldukları için ikinci türdendir. QA tarafındaki bedel: bu sayfanın tamamı aktif doğrulama alışkanlıkları öğretti (çalıştır, tekrar üret, kabul kriterlerine karşı kontrol et) — bu sekme, o alışkanlıkların yakalamak için var olduğu somut hata şekillerini toplar, o yüzden bunu aracı kullanmaktan seni korkutmaya yönelik bir uyarı değil, kendine karşı tuttuğun bir referans kontrol listesi olarak ele al.`,
          },
          { type: 'heading', text: `4 Risk Kategorisi, Tek Disiplin: Doğrula` },
          {
            type: 'text',
            content: `Halüsinasyon: Claude, doğrulanmış bir gerçeği değil olası bir metni tahmin ettiği için var olmayan bir API veya metodu tam bir özgüvenle söyleyebilir — UI Otomasyonu sekmesinde ele alınan karşı önlem, çalıştırmadan önce her zaman derleyiciye, IDE'ye veya resmi dokümantasyona karşı doğrulamaktır. Gizlilik: müşteri verisini, token'ları veya kimlik bilgilerini herhangi bir AI konuşmasına yapıştırmak, gönderildiği an bir maruziyettir — Bug Analizi sekmesinde derinlemesine ele alınan karşı önlem, her seferinde yapıştırmadan önce temizlemektir.`,
          },
          {
            type: 'text',
            content: `Telif hakkı ve şirket politikası: bazı kurumlar üçüncü parti AI araçlarına ne tür kod veya verinin yapıştırılabileceğini kısıtlar veya AI destekli kodun yayına çıkmadan önce incelenmesini zorunlu kılar — karşı önlem, şirketinin gerçek AI kullanım politikasını bilmek ve ona uymaktır; "bilmiyordum" bir reviewer'ın kabul edeceği bir savunma değildir. Aşırı bağımlılık (beceri erimesi): her zaman önce Claude'a soran ve hiç kendi bağımsız debug içgüdülerini geliştirmeyen bir tester, yanlış bir assertion'ı veya kötü bir locator'ı kendi başına fark etme becerisini kaybeder — karşı önlem, Claude'u zaten anladığın işi hızlandırmak için kullanmak, henüz kurmadığın bir anlayışın yerine geçirmek için değil; önceki sekmelerdeki doğrulama alışkanlıkları pratikte tam olarak o anlayıştır.`,
          },
          {
            type: 'error-dictionary',
            relatedTopicId: 'claude-ai-risks-error-dictionary',
            framework: 'Claude AI',
            errors: [
              {
                error: 'Claude var olmayan bir Selenium metodu önerdi',
                fullMessage: `AttributeError: 'WebDriver' object has no attribute 'findElementByAI'`,
                cause: {
                  tr: 'Bir LLM, olası görünen API isimlerini tahmin eder; Selenium\'un isimlendirme kuralına uyan bir metod tamamen uydurma (bir halüsinasyon) olabilir ve kendinden emin ifade tarzında bunu gösteren hiçbir işaret yoktur.',
                },
                solution: {
                  tr: 'Önerilen her metodu çalıştırmadan önce IDE\'nin otomatik tamamlamasına veya resmi Selenium dokümantasyonuna karşı doğrula — bir metod ismine "doğru görünüyor" diye güvenme.',
                },
                codeWrong: `# ❌ findElementByAI Selenium'da yok — bir halüsinasyon
element = driver.findElementByAI("login button")`,
                codeFixed: `# ✅ Gerçek Selenium API'si, IDE otomatik tamamlamayla doğrulandı
element = driver.find_element(By.CSS_SELECTOR, "[data-testid='login-button']")`,
              },
              {
                error: 'Üretilen XPath ilk DOM değişiminde kırıldı',
                fullMessage: `NoSuchElementException: Unable to locate element: //div[3]/div[2]/button`,
                cause: {
                  tr: 'Claude, kararlı bir niteliğe öncelik vermesi söylenmeden dondurulmuş bir HTML anlık görüntüsünden pozisyonel bir XPath üretti (bkz. UI Otomasyonu sekmesi) — pozisyon, bir frontend ekibinin korumayı taahhüt ettiği bir kontrat asla değildir.',
                },
                solution: {
                  tr: 'Claude\'a her zaman pozisyonel selector\'lar yerine data-testid veya aria-label\'a öncelik vermesini söyle; markup\'ta ikisi de yoksa, tahmin etmek yerine bu boşluğu işaretlemesini iste.',
                },
                codeWrong: `# ❌ Pozisyona bağlı, kırılgan XPath
driver.find_element(By.XPATH, "//div[3]/div[2]/button")`,
                codeFixed: `# ✅ Bunun yerine kararlı bir nitelik kullanılıyor
driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-button']")`,
              },
              {
                error: 'AI\'ın yazdığı assertion her zaman true dönüyordu (sahte PASS)',
                fullMessage: `Test suite: 47 passed, 0 failed (ama login bug'ı hâlâ elle tekrar üretilebiliyor)`,
                cause: {
                  tr: 'Üretilen bir assertion, gerçek beklenen değer yerine bir değeri kendisiyle veya önemsiz derecede doğru bir koşulla karşılaştırdı — gerçek davranıştan bağımsız olarak geçen bir tautoloji.',
                },
                solution: {
                  tr: 'Üretilen her assertion\'ı oku ve özelliği kasıtlı olarak bozduğunda (kodu mutasyona uğratıp tekrar çalıştırarak) kırmızıya döndüğünü doğrula — gerçek bir assertion gerçek bir bug\'da başarısız olmalıdır.',
                },
                codeWrong: `# ❌ Tautoloji — bu assertion her zaman geçer
assert response.status_code == response.status_code`,
                codeFixed: `# ✅ Gerçek beklenen değere karşı kontrol edildi
assert response.status_code == 200`,
              },
              {
                error: `Prompt'a yapıştırılan log'da API token vardı`,
                fullMessage: `[ERROR] Authorization: Bearer eyJhbGciOiJIUzI1NiIs... request failed`,
                cause: {
                  tr: 'Ham log, önce hassas alanlar temizlenmeden yapıştırıldı — Bug Analizi sekmesinde ele alınan aynı hata, burada gerçek bir olay şekli olarak gösteriliyor.',
                },
                solution: {
                  tr: 'Yapıştırmadan önce her log veya yanıtı temizle — debug ne kadar acil hissettirirse hissettirsin, token\'ları, e-postaları ve kimlik-bilgisi-şeklindeki her değeri <REDACTED> gibi bir yer tutucuyla değiştir.',
                },
                codeWrong: `# ❌ Ham log, token temizlenmeden yapıştırıldı
[ERROR] Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`,
                codeFixed: `# ✅ Token, yapıştırmadan önce temizlendi
[ERROR] Authorization: Bearer <REDACTED>`,
              },
              {
                error: 'Üretilen test verisi gerçek bir kimlik numarası formatında ve GEÇERLİ çıktı',
                fullMessage: `Test veritabanına eklenen 500 kayıttan biri, gerçek bir vatandaşın kimlik numarasıyla birebir eşleşti (bir tesadüf, çok sonrasına kadar fark edilmedi)`,
                cause: {
                  tr: 'LLM tarafından üretilen kimlik-şeklindeki sayılar, özellikle hacimde, tesadüfen gerçek geçerli bir kimlikle çakışabilir — "açıkça sahte yap" talimatı tek başına çakışmamayı garanti etmez.',
                },
                solution: {
                  tr: 'Toplu, gerçekçi-kimlik-şeklindeki veri için ad hoc LLM çıktısı yerine, belgelenmiş bir sahte-aralık veya rezerve-önek garantisi olan deterministik bir üreticiyi tercih et; Claude kullanıyorsan küçük partiler üret ve spot-check yap, ayrıca ekibinin veri politikasının o ortamda format olarak geçerli sentetik kimliklere izin verip vermediğini doğrula.',
                },
                codeWrong: `# ❌ Rezerve aralık veya çakışma kontrolü olmadan doğrudan kullanıldı
INSERT INTO test_users (national_id) VALUES ('...LLM-üretilen sayı...');`,
                codeFixed: `# ✅ Belgelenmiş bir sahte-aralık / rezerve önekten üretildi
INSERT INTO test_users (national_id) VALUES ('00000000001'); -- rezerve test öneki`,
              },
              {
                error: 'Claude eski kütüphane sürümünün syntax\'ını kullandı',
                fullMessage: `TypeError: page.waitForSelector is not a function (üretilen kod, projenin kurulu Playwright sürümünde kaldırılmış bir API kullandı)`,
                cause: {
                  tr: 'Modelin eğitim verisi, birçok kütüphane sürümü boyunca yıllarca süren dokümantasyonu kapsar; tam olarak kurulu sürümün söylenmemesi halinde, en yaygın görülen (genellikle daha eski) API şeklini varsayar.',
                },
                solution: {
                  tr: 'Prompt\'ta tam framework/kütüphane sürümünü belirt ve tanıdık gelmeyen herhangi bir metodu güvenmeden önce kurulu sürümünün changelog\'una karşı çapraz kontrol et.',
                },
                codeWrong: `// ❌ Eski Playwright API'si (kaldırılmış)
await page.waitForSelector('[data-testid="submit"]');`,
                codeFixed: `// ✅ Güncel Playwright locator API'si
await page.getByTestId('submit').waitFor();`,
              },
              {
                error: 'Uzun konuşmada bağlam kaybolup önceki kararlar unutuldu',
                fullMessage: `Claude, 40 mesaj önce belirtilen "sadece onaylanmış kabul kriterlerine dayan" kuralını unutup tekrar varsayım uydurmaya başladı`,
                cause: {
                  tr: 'Çok uzun konuşmalar, özellikle birçok konu değişikliği boyunca, önceki bağlamı etkili odağın dışına itebilir — sert bir hafıza hatası görünmeden, önceki kararlar o zamandan beri söylenen her şeyle yarışır.',
                },
                solution: {
                  tr: 'Yeni bir özellik veya görev için, eski ve uzun bir thread\'i sonsuza dek sürdürmek yerine yeni bir konuşma başlat ve temel onaylanmış bağlamı yeniden yapıştır.',
                },
                codeWrong: `# ❌ Yeni bir özellik için 40 mesajlık ilgisiz bir thread'e devam ediliyor
(...40 mesajlık ilgisiz geçmiş...)
Şimdi ödeme özelliği için test yaz.`,
                codeFixed: `# ✅ Taze bir konuşma, onaylanmış bağlam yeniden yapıştırıldı
Sen kıdemli bir QA mühendisisin.
Ödeme özelliği kabul kriterleri: [...onaylanmış kurallar buraya...]`,
              },
              {
                error: `AI çıktısı code review'suz merge edildi`,
                fullMessage: `Production olayı: PR #482 (Claude'un ürettiği bir test düzeltmesi) otomatik-onayla merge edildi, gerçek bir regresyonu 3 hafta boyunca gizleyen tautolojik bir assertion içeriyordu`,
                cause: {
                  tr: '"Bir AI zaten kontrol etti" diyerek AI üretimi kodu ekibin normal inceleme sürecinden muaf tutmak — ama Claude\'un kendi çıktısı hiç bağımsız olarak doğrulanmadı, bu da CI/CD sekmesinin ekip-kuralı disiplinini ihlal etti.',
                },
                solution: {
                  tr: 'AI üretimi koda, istisnasız, insan yazımı kodla aynı inceleme çıtasını uygula — CI/CD sekmesinin "insan diff review\'u olmadan AI merge yok" kuralının önlemek için var olduğu tam olarak budur.',
                },
                codeWrong: `# ❌ Ekip kuralı: "AI yazdıysa review gerekmez" (YANLIŞ)
git merge --no-verify claude-generated-fix`,
                codeFixed: `# ✅ Ekip kuralı: AI üretimi kod da insan diff review'undan geçer
git push origin claude-generated-fix
# -> bir PR açılır, en az 1 insan onayı gerekir, incelenmemiş merge YOK`,
              },
            ],
          },
          riskVerificationAnimation,
          riskVerificationOrder,
          uncertaintyFlagPlayground,
          {
            type: 'quiz',
            question: `Üretilen bir assertion, test ettiği özelliği kasıtlı olarak bozsan bile her zaman geçiyor. Bu hangi risk kategorisidir ve hangi alışkanlık onu yakalar?`,
            options: [
              { id: 'a', text: 'Bu bir gizlilik riskidir — assertion veri sızdırıyor' },
              { id: 'b', text: 'Tautolojik bir assertion (bir "sahte PASS") — karşı alışkanlık, özelliği kasıtlı olarak bozmak için kodu mutasyona uğratmak ve assertion\'ın gerçekten kırmızıya döndüğünü doğrulamaktır' },
              { id: 'c', text: 'Bu, assertion kütüphanesiyle ilgili bir telif hakkı riskidir' },
              { id: 'd', text: 'Bu, özellik production\'a ulaşana kadar tespit edilemez' },
            ],
            correct: 'b',
            explanation: `Bir tautoloji (bir değeri kendisiyle veya her zaman doğru olan bir koşulla karşılaştırmak), gerçek davranıştan bağımsız olarak geçer — iddia ettiği şeyi kasıtlı olarak bozup yeşil kaldığını görene kadar çalışan bir assertion'la birebir aynı görünür.`,
            retryQuestion: {
              question: `Bir junior şöyle diyor: "Bu düzeltmeyi tam anlamama gerek yok — Claude çalıştığını açıkladı ve test yeşil." Bu hangi riski temsil eder ve bir senior merge etmeden önce ne istemelidir?`,
              options: [
                { id: 'a', text: 'Risk yok — düzeltmeyi kim anlarsa anlasın yeşil bir test yeterli kanıttır' },
                { id: 'b', text: 'Aşırı bağımlılık (beceri erimesi) — bir senior, merge etmeden önce junior\'dan düzeltmeyi kendi cümleleriyle açıklamasını istemelidir, bu platformun herhangi bir kavramı öğrenmek için öğrettiği aynı Feynman-tarzı kontrol' },
                { id: 'c', text: 'Bu, junior\'ın anlayışıyla ilgisi olmayan bir halüsinasyon riskidir' },
                { id: 'd', text: 'Bu sadece test daha sonra başarısız olmaya başlarsa bir sorundur' },
              ],
              correct: 'b',
              explanation: `Yeşil bir test, anlık semptomu doğrular, altta yatan nedenin anlaşıldığını değil — bu sekmenin tamamında geçen "derlenir" ile "doğrudur" arasındaki aynı ayrım. Junior'dan kendi cümleleriyle bir açıklama istemek, beceri erimesine karşı doğrudan, pratik bir kontroldür, angarya değil.`,
            },
          },
        ],
      },
      {
        title: `💼 Mülakat Soruları & Cevapları`,
        blocks: [
          {
            type: 'interview-questions',
            relatedTopicId: 'claude-ai-interview-questions',
            topic: 'Tester için Claude AI',
            questions: [
              // ── BASIC ──────────────────────────────────────────
              {
                level: 'basic',
                q: { tr: `Claude'dan 20 test case istiyorsun ve anında geliyor. Bir ekip arkadaşın "özellik artık tamamen test edildi" diyor. Bu iddianın sorunu nedir?` },
                a: { tr: `Hız ve hacim, doğruluk değildir — bu oracle problemidir: "doğru" davranışın ne olduğunu yalnızca senin kabul kriterlerin ve domain bilgin tanımlar, Claude ise sadece verdiğin kuralları bilir. Java karşılaştırması: bu, bir sınıfın 20 JUnit testi olduğu için doğru olduğunu varsaymak gibidir, assertion değerlerinin gerçek spesifikasyonla eşleşip eşleşmediğini kontrol etmeden. "Tamamen test edildi" demek için case'lerin gerçek gereksinimlere karşı doğrulanmış olması gerekir, sadece sayılmış olmaları değil.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir junior sadece hata mesajlarını anlamak için claude.ai'ye yapıştırıyor. Mid seviye Claude kullanımına doğru geliştirilecek doğal bir sonraki beceri nedir?` },
                a: { tr: `User story ve kabul kriterlerinden test case ve test verisi üretmek — reaktif soru-cevaptan proaktif çıktı üretimine geçmek, her çıktıyı gerçek gereksinimlere karşı doğrulamaya devam ederek. Java karşılaştırması: bu, "bir stack trace'i bir senior'a açıklattırmak"tan "bir spesifikasyondan kendi JUnit test case'lerimi yazmak"a geçmeye benzer. Önemli olan beceri prompt'un kendisi değil, onunla birlikte gelen doğrulama alışkanlığıdır.` },
              },
              {
                level: 'basic',
                q: { tr: `İki tester aynı login özelliği hakkında Claude'a soruyor. Biri jenerik 3 maddelik bir cevap alıyor, diğeri profesyonel bir test case tablosu. İlk prompt'ta muhtemelen eksik olan nedir?` },
                a: { tr: `Güçlü bir prompt'un dört bileşeni — rol, bağlam (gerçek kabul kriterleri), kısıtlı görev ve çıktı formatı. "Login için test yaz" gibi belirsiz bir prompt modelin tahmin etmesine bırakır, o da en güvenli jenerik cevabı döndürür. Java karşılaştırması: bu, her şeyi Object olarak tipleyerek overload edilmiş bir metodu çağırmak gibidir — kesin eşleşme yerine en jenerik eşleşmeyi alırsın.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir bug analizi isteğine Claude'un ilk cevabı gerçekten önemsediğin bir edge case'i kaçırıyor. Ne yapmalısın?` },
                a: { tr: `İlk cevabı bir taslak say ve iterasyon yap — tam olarak neyin eksik veya yanlış olduğunu belirt ("session zaten süresi dolmuşken durumu kaçırıyor") ve tekrar sor, baştan başlamak veya olduğu gibi kabul etmek yerine. Java karşılaştırması: bu, TDD'deki red-green-refactor döngüsüdür — ilk kırmızı koşum başarısızlık değil, bilgidir. İterasyon, kullanılabilir bir cevaba giden normal yoldur, aracın başarısız olduğunun işareti değil.` },
              },
              {
                level: 'basic',
                q: { tr: `Claude'un belirli bir başarısız test dosyasını açmasını, çalıştırmasını ve düzeltmeyi aynı oturumda düzenlemesini istiyorsun. Hangi erişim yöntemi bunu gerçekten destekler?` },
                a: { tr: `Claude Code (CLI) veya aynı ajanı saran bir IDE eklentisi — claude.ai web sohbeti repository'ni okuyamaz veya komut çalıştıramaz, sadece yapıştırdığını görür. Java karşılaştırması: bu, bir meslektaşına stack trace e-postalamak ile onu klavyene, IDE'ne ve terminaline erişimle oturtmak arasındaki farktır. Sadece gerçek dosya ve shell erişimi olan bir ajan testi çalıştırıp düzeltmeyi doğrudan uygulayabilir.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir ekip arkadaşın ANTHROPIC_API_KEY'inin doğru formatta olup olmadığını bir Claude konuşmasına yapıştırarak kontrol etmek istiyor. Bu güvenli mi?` },
                a: { tr: `Hayır — bir API key'e tam olarak bir veritabanı şifresi gibi davranılmalıdır: yerel veya uzak hiçbir konuşmaya asla yazılmamalıdır, çünkü bir model transkripti güvenli bir secret deposu değildir. Java karşılaştırması: bu, veritabanı kimlik bilgilerini bir Java sınıfına gömmek yerine gitignore'lanmış bir environment variable'da tutmakla aynı disiplindir. Sızıntıdan şüpheleniliyorsa doğru tepki kimsenin görmediğini ummak değil, key'i döndürmektir.` },
              },
              {
                level: 'basic',
                q: { tr: `Claude, story'deki belirsiz bir "kısmi iade" kuralını hiç sormadan bir checkout özelliği için tek seferde 8 Gherkin test case'i üretti. Hangi süreç adımı atlandı?` },
                a: { tr: `Belirsizlik-önce adımı — herhangi bir test üretmeden ÖNCE Claude'dan belirsiz veya eksik olan her kuralı listelemesini istemek, böylece bir insan gerçek cevabı onaylayabilir. Bunu atlamak, modelin boşluğu olası ama doğrulanmamış bir varsayımla doldurması demektir. Java karşılaştırması: bu, Javadoc'u olmayan bir interface metoduna karşı JUnit testi yazmak gibidir — gerçek kontrat yerine bir tahmini derlersin.` },
              },
              {
                level: 'basic',
                q: { tr: `Neden Claude'dan test case'leri düz bir madde listesi yerine Gherkin formatında üretmesini istersin?` },
                a: { tr: `Given/When/Then, her senaryo için açık bir ön koşul, eylem ve beklenen sonuç zorunlu kılar, ki bu belirsiz çıktıdan kaçınmak için gereken tam yapıdır — format kendisi spesifiklik için zorlayıcı bir mekanizmaya dönüşür. Java karşılaştırması: bu, kod derlenmeden önce her parametrenin verilmesini zorlayan güçlü tipli bir metod imzası gibi çalışır. Bir madde listesi, Gherkin'in yapısının bırakmadığı eksik parçalara yer bırakır.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir login hatası için kök neden hipotezi istiyorsun ama log'da gerçek bir müşteri e-postası var. Claude'a yapıştırmadan önce ne olmalı?` },
                a: { tr: `Log temizlenmelidir — debug ne kadar acil hissettirirse hissettirsin, yapıştırmadan önce e-postayı, token'ı ve kimlik-bilgisi-şeklindeki her değeri <REDACTED> gibi bir yer tutucuyla değiştir. Java karşılaştırması: bu, şifre içeren ham bir veritabanı bağlantı dizesi taşıyabilecek bir exception mesajını asla loglamamakla aynı disiplindir. Bir sır terminalinden çıktığı an, kontrolündeki bir key'i döndürebildiğin gibi bu maruziyeti geri alamazsın.` },
              },
              {
                level: 'basic',
                q: { tr: `Claude'dan "yaş alanı için test verisi üret" diye başka detay vermeden istiyorsun. Çıktı muhtemelen neyi kaçıracak?` },
                a: { tr: `Muhtemelen kuralın için önemli olan gerçek sınır değerlerini kaçıracaktır, çünkü Claude hiç verilmediği iş kurallarını icat edemez — geçerli/geçersiz aralıkların ve tam sınır sayılarının açıkça belirtilmesi gerekir. Java karşılaştırması: bu, partisyonları belirtmeden equivalence-partitioning verisi istemek gibidir — üreticinin etrafında bölecek bir kuralı yoktur. Sınıfları açıkça isimlendirmek, Claude'un tahmin etmek yerine her sınıftan bir temsilci değer üretmesini sağlayan şeydir.` },
              },
              {
                level: 'basic',
                q: { tr: `Claude, yapıştırdığın HTML'den çalışan bir XPath locator üretiyor ve test bugün geçiyor. İki hafta sonra, ilgisiz bir frontend refactor'ünün ardından aynı test başarısız oluyor. Neden?` },
                a: { tr: `XPath büyük olasılıkla data-testid gibi kararlı, geliştiricinin sahip olduğu bir nitelik yerine DOM'un tesadüfi yapısını — element pozisyonu veya üretilmiş bir class ismini — kodladı, ve refactor'ler tesadüfi yapıyı serbestçe değiştirir. Java karşılaştırması: bu, bir alanın tam bildirim sırasına bağlı bir reflection çağrısıyla aynı kırılganlıktır — bugün derlenir ve çalışır ama dayandığı "kontrat" hiçbir zaman garanti edilmemişti. Düzeltme, Claude'a baştan kararlı niteliklere öncelik vermesini söylemektir.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir API test seti %100 yeşil ama sadece 200 OK yanıtları üzerine assertion yapıyor. Bu setin kapsamının gerçek durumu nedir?` },
                a: { tr: `Eksiktir — "%100 yeşil" sadece gerçekten doğrulananı tanımlar, API kontratının vaat ettiğini değil; gerçek production olaylarının tam olarak yaşandığı yer olan dokümante edilmiş 4xx/5xx davranışları hiç çalıştırılmadı. Java karşılaştırması: bu, gerçek interface kontratı yerine tek bir geçen koşumun kaydedilmiş çıktısından JUnit assertion'ları yazmak gibidir. Tamamen yeşil ama kapsam boşluğu olan bir set, tam olarak yanlış yerde sahte güven verir.` },
              },
              {
                level: 'basic',
                q: { tr: `Tam erişimli bir mod başarısız bir testi daha hızlı düzeltecek olsa bile, bir tester Claude Code için neden bilinçli olarak salt-okunur izin modunu seçer?` },
                a: { tr: `Salt-okunur bir mod yapısı gereği güvenlidir — geri alınacak hiçbir şey yok — oysa paylaşılan bir branch'te yazma yapabilen bir ajan, herhangi bir yeni ekip üyesinin gözetimsiz ilk haftasına uygulayacağın aynı diff-inceleme disiplinini gerektirir. Java karşılaştırması: bu, rol-bazlı bir izin sisteminin bir kaynağı "okuyabilir" ile "yazabilir/çalıştırabilir" arasında ayrım yapmasıyla aynı erişim kontrolüdür. Hız ve etki alanı ayrı eksenlerdir, ve daha dar mod, incelemesiz hiçbir şeyin olmayacağı garantisi için biraz hızdan ödün verir.` },
              },
              {
                level: 'basic',
                q: { tr: `Bir kod üretme isteğinin (örn. "bana bir Playwright script'i yaz") yapamadığı neyi MCP bağlantılı bir ajan yapabilir?` },
                a: { tr: `Gerçek sonuçları doğrudan algılayabilir — canlı bir tarayıcıda gezinebilir, gerçek DOM'u okuyabilir, gerçek bir veritabanını sorgulayabilir — ve senin üretilen kodu çalıştırıp sonuçları elle bildirmen yerine bir sonraki eylemine aynı döngüde karar verebilir. Java karşılaştırması: bu, JDBC'nin her satıcı için özel bir sürücü yerine "herhangi bir Java programı herhangi bir veritabanıyla konuşabilir" diye standartlaştırmasıyla aynı sıçramadır. Üretilen kod bir insanı mesajcı olarak tutar; bir MCP bağlantısı bu sıçramayı kaldırır.` },
              },
              {
                level: 'basic',
                q: { tr: `Claude, hiç görmediğin bir Selenium metod ismini kendinden emin şekilde öneriyor ve kod sözdizimsel olarak temiz görünüyor. Profesyonel ilk hamle nedir?` },
                a: { tr: `Herhangi bir şey çalıştırmadan önce metodun gerçekten var olduğunu doğrula — IDE otomatik tamamlamasını veya resmi dokümantasyonu kontrol et — çünkü bir LLM gerçekte hiç var olmamış, inandırıcı görünen bir API uydurabilir (halüsinasyon). Java karşılaştırması: bu, tanıdık olmayan bir kütüphane çağrısına güvenmeden önce onu Javadoc'una karşı çift kontrol etmekten farklı değildir. Kendinden emin bir ifade tarzı kanıt değildir; sadece dış bir kaynak (derleyici, dokümantasyon, IDE) kanıttır.` },
              },
              // ── INTERMEDIATE ────────────────────────────────────
              {
                level: 'intermediate',
                q: { tr: `Mekanik olarak, bir prompt'a "Sen kıdemli bir QA mühendisisin" eklemek Claude'un çıktısını nasıl değiştirir?` },
                a: { tr: `Modelin tahmin ettiği bakış açısını ve söz dağarcığını belirler — cevap, jenerik bir cevabın atlayacağı severity, önceliklendirme ve edge-case kapsamı gibi kavramları kullanmaya başlar. Projen hakkında yeni bir gerçek eklemez; hangi tamamlama tarzının istatistiksel olarak en olası olduğunu daraltır. Java karşılaştırması: bu, çağrıya yeni veri eklemekten çok, argüman tiplerini daha spesifik belirterek doğru overload edilmiş metodu seçmeye benzer.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Üretilen bir Gherkin senaryosu kusursuz okunuyor ve doğru sözdizimi kullanıyor. Bunu test setine eklemek için yeterli mi?` },
                a: { tr: `Hayır — akıcı sözdizimi doğruluğun kanıtı değildir; oracle sensin, ve senaryoyu güvenmeden önce gerçek kabul kriterlerine karşı kontrol etmelisin, çünkü Claude bir boşluğu olası ama onaylanmamış bir varsayımla doldurmuş olabilir. Java karşılaştırması: bu, "kod derleniyor" ile "kod doğru" arasındaki aynı boşluktur — bir derleyici yanlış bir iş kuralını yakalayamaz. İnceleme, üretimden ayrı bir adımdır, asla opsiyonel değil.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir test aralıklı olarak başarısız oluyor. Sadece en son başarısızlık log'unu yapıştırıp Claude'dan kök neden istiyorsun. Yaklaşımından eksik olan nedir?` },
                a: { tr: `Tek bir koşum bir örüntüyü ortaya çıkaramaz — flaky'lik, tanımı gereği, herhangi bir tek koşumun değil, koşumlar arası bir özelliktir; 3-5 log yapıştırmak Claude'un başarısızlıklar arasında gerçekten neyin değiştiğini (zamanlama, test sırası, paylaşılan state) görmesini sağlar. Java karşılaştırması: flaky bir JUnit testini tek bir stack trace'ten debug etmek, bir race condition'ı tek bir thread dump'ından debug etmeye benzer — örüntüyü görmek için birden fazla örneğe ihtiyacın var. Tek bir log, modele de sana verdiği aynı kör noktayı verir.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Claude, tarif ettiğin bir bug için "Kritik" severity öneriyor. Bunu olduğu gibi kabul etmeli misin?` },
                a: { tr: `Hayır — severity önerisini GEREKÇESİYLE birlikte iste ve nihai kararı kendin ver, çünkü severity bugünkü gerçek production etkisine ve Claude'un tek bir bug açıklamasından göremeyeceği iş bağlamına bağlıdır. Java karşılaştırması: bu, statik bir analiz aracının "Kritik" bir kod kokusu işaretlemesi gibidir — kullanışlı bir sinyal, ama gerçek dünya önceliğine hâlâ bir insan karar verir. Claude önerir; domain bağlamına sahip tester karar verir.` },
              },
              {
                level: 'intermediate',
                q: { tr: `CI'da her gece çalışan bir yük testi için 1.000 gerçekçi sahte müşteri e-postasına ihtiyacın var. Bunları Claude ile mi yoksa Java Faker gibi bir kütüphaneyle mi üretmelisin?` },
                a: { tr: `Faker kullan — deterministik, hızlı, çevrimdışıdır ve tam olarak toplu jenerik alan üretimi için tasarlanmıştır, oysa her CI koşumunda bir LLM çağrısı, çözülecek bir belirsizliği olmayan bir görev için hiçbir tasarım faydası olmadan gecikme ve maliyet ekler. Java karşılaştırması: Faker.name().fullName() tam olarak bu yüzden vardır — test edilmiş bir utility zaten anında yapıyorken kimse bin ismi elle yazmaz veya AI ile ürettirmez. VERİ ŞEKLİ hüküm gerektirdiğinde Claude'a başvur, sadece hacim gerektiğinde değil.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Üretilen test verisi tesadüfen gerçek bir kimlik numarası formatıyla birebir eşleşiyor ve kontrol hanesi geçerli. "Sahte görünüyor" olmasının ötesinde buradaki gerçek risk nedir?` },
                a: { tr: `LLM tarafından üretilen kimlik-şeklindeki bir sayı, özellikle hacimde, tesadüfen gerçek geçerli bir kimlikle çakışabilir — "açıkça sahte yap" talimatı tek başına çakışmamayı garanti etmez, ve ekibinin veri politikası o ortamda format olarak geçerli sentetik kimliklere bile izin vermeyebilir. Java karşılaştırması: Faker tarzı araçların kimlik-şeklindeki alanlar için saf rastgeleleştirme yerine belgelenmiş rezerve aralıklar veya önekler kullanmasının sebebi budur. Daha güvenli düzeltme, bir LLM'e "açıkça sahte yap" talimatı değil, garantili sahte aralığa sahip deterministik bir üreticidir.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Claude, metod isimleri ve locator'lar dahil eksiksiz bir Page Object Model sınıfı üretti. Sete güvenmeden önce hâlâ ne doğrulamalısın?` },
                a: { tr: `Locator'ların gerçekten çözümlendiğini doğrulamak için canlı sayfaya karşı çalıştır, ve metod isimlerinin Claude'un tahmini yerine testinin gerçek söz dağarcığıyla eşleştiğini kontrol et — derlenen bir sınıf, çalışan bir sınıfla aynı şey değildir. Java karşılaştırması: bu, üretilen bir DAO sınıfını incelemeye benzer — yapı mekanik olarak doğru olabilirken gerçek sorgular veya binding'ler yanlış olabilir. İskelet Claude'un güçlü olduğu yerdir; detaylar hâlâ senin incelemene ihtiyaç duyar.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir locator kırılıyor. Claude'a tam hatayı veya mevcut kodu yapıştırmadan "bu test kırıldı, düzelt" diyorsun. Ne ters gider?` },
                a: { tr: `Claude'un gerçekte neyin değiştiğini ayırt edecek hiçbir yolu yoktur, bu yüzden gerçek DOM değişikliğini teşhis etmek yerine muhtemelen başka kırılgan bir selector tahmin eder — tam hata mesajını ve mevcut locator'ı yapıştırmalı ve açıkça kararlı bir niteliğe öncelik vermesini istemelisin. Java karşılaştırması: bu, bir meslektaşından "kırıldı" demekle gerçek stack trace yerine bir bug'ı düzeltmesini istemek gibidir — belirsiz bir repro belirsiz, muhtemelen yanlış bir düzeltme üretir. Düzeltme döngüsü sadece gerçek hatanın bir sonraki denemeye geri beslendiğinde çalışır.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Neden bir OpenAPI spec'ini Claude'a yapıştırmak, endpoint'i sözlerle gayriresmi olarak anlatmaktan daha iyi API test assertion'ları üretme eğilimindedir?` },
                a: { tr: `Bir OpenAPI tanımı zaten Gherkin ile aynı Given/When/Then tarzı zorlayıcı mekanizmadır — her parametreyi, zorunlu/opsiyonel bayrağını ve response şemasını açıkça isimlendirir, sözel bir açıklamanın açık bıraktığı oracle belirsizliğini ortadan kaldırır. Java karşılaştırması: bu, tam Javadoc'lu bir interface'ten kod üretmekle "kabaca ne yaptığı"nın tek satırlık bir açıklamasından üretmek arasındaki farktır. Spec olmadan, çıktının daha fazlasının onaylanmış kural yerine işaretli varsayım olmasını bekle.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Claude, bozuk bir e-postanın belirli bir hata gövdesiyle 422 döndürmesi gerektiğini hipotez ediyor ama sen bu yanıtı hiç gerçekten tetiklemedin. Bu assertion sete girmeden önce ne olmalı?` },
                a: { tr: `Bozuk bir e-posta göndererek gerçek 422 yanıtını kendin tekrar üretmeli ve assertion'ı eklemeden önce gerçek şeklin hipotezle eşleştiğini doğrulamalısın — doğrulanmamış bir "sonra düzelt" alışkanlığı, bir setin hiç gerçek olmamış bir davranış üzerine assertion yazmasına yol açar. Java karşılaştırması: bu, sadece dokümantasyonda okuduğun ama debugger'da hiç yakalamadığın bir exception için JUnit assertion'ı yazmak gibidir. İnandırıcı bir hata şekli, tekrar üretilene kadar hâlâ bir tahmindir.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir ekip, her prompt'ta tekrarlamak yerine neden proje kurallarını ajanın her oturum başında okuduğu bir dosyaya (bu platformun kendi CLAUDE.md'si gibi) yazsın?` },
                a: { tr: `Böyle bir dosya oturum başına bir kez okunur ve sonrasında sonraki her eylemi sessizce bilgilendirir, bir ekibin kod stilini her pull request incelemesinde yeniden anlatmak yerine bir CONTRIBUTING.md yazmasıyla aynı sebep. Tekrarlanan, hataya açık manuel bağlam kurmayı azaltır ve kuralları yönettikleri kodla birlikte versiyonlu tutar. Java karşılaştırması: bu, reviewer'ların kuralları her seferinde ezbere tekrarlaması yerine bir linter config'inin referans aldığı belgelenmiş bir stil kılavuzuyla aynı değeri taşır.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir tester, main branch'inde otomatik-onay-tümü izinleri açıkken Claude Code'a "bütün testleri düzelt" diyor. Düzeltmeler doğru çıksa bile risk nedir?` },
                a: { tr: `Kapsam sınırsız, bu yüzden ajan incelemeden sayısız ilgisiz dosyayı değiştirebilir — talimat belirli bir dosyaya veya teste kapsamlanmalı ve uygulamadan önce düzeltmeyi göstermesi istenmelidir. Java karşılaştırması: bu, ilk günden itibaren yeni bir işe alınana main'e sınırsız commit erişimi vermek gibidir, ilk görevini belirli bir modüle ve incelemeye kapsamlamak yerine. Nihai düzeltmelerin doğruluğu, eksik kapsam ve incelemeyi geriye dönük olarak güvenli hale getirmez.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Claude'dan bir Playwright script'i üretmesini istemekle aynı görev için MCP tabanlı bir tarayıcı oturumu kullanmak arasındaki pratik fark nedir?` },
                a: { tr: `Üretilen kodla sen manuel aktarıcı olarak kalırsın — çalıştırır ve sonuçları geri bildirirsin; bir MCP bağlantısıyla ajan gerçek DOM'u doğrudan görür ve bir sonraki eylemine aynı konuşmada karar verir, ki bu önceden yazılmış bir script'i olmayan keşifsel görevleri mümkün kılan şeydir. Java karşılaştırması: bu, bir code reviewer'ın bir diff açıklamasını okumasıyla kodu gerçekten çalıştırıp çıktıyı görmesi arasındaki farktır. MCP bağlantısı, üretilen kodun açık bıraktığı bir döngüyü kapatır.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir ekip arkadaşın, "kurulum zamanından tasarruf etmek için" tam yazma erişimli bir veritabanı MCP bağlantısını yapılandırıp production raporlaması için kullanılan veritabanına yönlendiriyor. Burada yanlış olan nedir?` },
                a: { tr: `Production'a yakın bir veritabanına yazma erişimi olan bir ajan, aldığı herhangi bir eylemin "hata" gibi görünüp görünmediğinden bağımsız olarak, kendi görevini sürdürmenin bir yan etkisi olarak gerçek veriyi değiştirebilir — düzeltme, görevin gerçekten ihtiyaç duyduğu en dar izin ve ortamdır (salt-okunur, gerçek bir test instance'ı). Java karşılaştırması: bu, bir test setinin yanlışlıkla bir production JDBC bağlantı dizesine yönlendirilmesiyle aynı risk sınıfıdır. Kolaylık, ortam izolasyonunun yerini tutmaz.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir GitHub Actions workflow'u her PR'da Claude'un "✅ sorun görünmüyor" yorumunu bırakıyor ve bir junior sadece bu yoruma dayanarak merge ediyor. Bu workflow'un kusuru nedir?` },
                a: { tr: `AI review bir ilk-geçiş ekidir, bir merge kararı değildir — bir insan reviewer'ın hesaba kattığı kod tabanı, ekip standartları ve release zamanlamasına tam görünürlüğü yoktur, bu yüzden merge kararının sahibi hâlâ insan olmalıdır. Java karşılaştırması: bu, geçen bir linter'ı bir code review'a eşdeğer saymak gibidir — kullanışlıdır ama "merge etmek güvenli" demenin gerçekte anlamından daha dar bir şeyi kontrol eder. Yorum açık boşlukları daha hızlı yüzeye çıkarmalı, hükmün yerine geçmemelidir.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir ekipteki her tester zaten tek başına çalışan prompt'lar yazabiliyorsa, paylaşılan bir ekip prompt kütüphanesini sürdürmeye neden zahmet edilsin?` },
                a: { tr: `"Çalışan" ile "tutarlı şekilde iyi" farklı çıtalardır — paylaşılan, incelenmiş bir şablon olmadan farklı tester'lar farklı kalite üretir (kimi belirsizlik-önce adımını atlar, kimi PII temizlemeyi atlar), ve paylaşılan bir kütüphane sadece en iyi prompt yazarının tavanını değil, tüm ekibin tabanını yükseltir. Java karşılaştırması: bu, tekrarlanan bir kod parçasını her gelecek çağıranın elle doğru kopyalamasına güvenmek yerine incelenmiş paylaşılan bir utility metoduna çıkarmakla aynı akıl yürütmedir. Bireysel beceri değişkendir; paylaşılan bir eser değişmez.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Bir test seti yeşil ama gerçek olduğunu bildiğin bir bug hâlâ elle tekrar üretilebiliyor. Bu hangi risk kategorisini düşündürür ve bunu nasıl doğrularsın?` },
                a: { tr: `Bu, tautolojik bir assertion (bir "sahte PASS") düşündürür — özelliği kasıtlı olarak bozmak için kodu mutasyona uğratıp tekrar çalıştırarak kontrol et; gerçek bir assertion gerçek bir bug'da kırmızıya dönmelidir, ve yeşil kalıyorsa kontrol hiçbir zaman gerçek davranışı test etmiyordu. Java karşılaştırması: bu, manuel olarak uygulanan mutation-testing fikridir — tanıttığın her mutasyona hayatta kalan bir test hiçbir zaman gerçekten bir şey doğrulamıyordu. Yeşil bir set tek başına kanıt değildir; sadece gerçek bir kusurda başarısız olduğunu gördükten sonra kanıt olur.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Üretilen kod, projenin gerçekte kurulu olan kütüphane sürümünde kaldırılmış bir API'yi çağırıyor. Kök neden nedir ve düzeltme nedir?` },
                a: { tr: `Modelin eğitim verisi birçok kütüphane sürümü boyunca yıllarca süren dokümantasyonu kapsar, bu yüzden tam olarak kurulu sürümün söylenmemesi halinde en yaygın görülen (genellikle daha eski) API şeklini varsayar — prompt'ta tam framework/kütüphane sürümünü belirt ve tanıdık gelmeyen metodları kurulu sürümünün changelog'una karşı çapraz kontrol et. Java karşılaştırması: bu, bir Maven bağımlılığının eski bir sürümünün API'sine karşı üretilen kodla aynı sorun sınıfıdır — düzeltme her zaman kullanılan gerçek sürümü belirtmektir, modelin bunu bildiğini varsaymak değil.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Çok uzun bir konuşmada, Claude 40 mesaj önce belirttiğin bir kuralı ("her şeyi sadece onaylanmış kabul kriterlerine dayandır") görmezden gelmeye başlıyor. Ne yapmalısın?` },
                a: { tr: `Yeni görev için taze bir konuşma başlat ve temel onaylanmış bağlamı yeniden yapıştır, eski ve uzun bir thread'i sonsuza dek sürdürmek yerine — çok uzun konuşmalar, birçok konu değişikliği boyunca, önceki kararları etkili odağın dışına itebilir. Java karşılaştırması: bu, uzun ömürlü, ağır mutasyona uğramış bir nesnenin orijinal değişmezlerinden sapabilmesine benzer — bazen daha ucuz düzeltme, eskisini daha fazla yamalamak değil, doğru başlangıç durumuyla taze bir örnek oluşturmaktır.` },
              },
              {
                level: 'intermediate',
                q: { tr: `Türkçe konuşan bir QA ekibi, en iyi sonuçlar için Claude prompt'larını Türkçe mi yoksa İngilizce mi yazmalı?` },
                a: { tr: `İkisi de işlevsel olarak çalışır, ama cümle diliden daha önemli olan kod tabanının söz dağarcığıyla tutarlılıktır — test framework'ü ve dokümantasyon İngilizce teknik terimler (assertion, locator, fixture) kullanıyorsa, aksi halde Türkçe olan bir prompt içinde bu terimleri İngilizce bırak, çünkü Türkçeleştirilmiş bir terim modelin hangi kavramı kastettiğini tahmin etmesine yol açabilir. Java karşılaştırması: bu, Türkçe kod yorumlarında ve dokümantasyonda API ve kütüphane terminolojisini çevirmeden bırakmakla aynı disiplindir, böylece bir terimi gerçek API'sine eşlerken hiçbir şey kaybolmaz.` },
              },
              // ── ADVANCED ────────────────────────────────────────
              {
                level: 'advanced',
                q: { tr: `Mekanik olarak, bir prompt'a rol, bağlam, format ve kısıt eklemek, prompt'u sadece uzatmaktan neden çıktı kalitesini daha çok artırır?` },
                a: { tr: `Bir LLM metnin en olası devamını tahmin eder; belirsiz bir prompt milyonlarca olası devam bırakır, bu yüzden model en güvenli jenerik olanı döndürür, oysa her bileşen yanlış devamları eler — özellikle bağlam, eğitim verisinin hiçbir yerinde olmayan proje kurallarını (bir kilitlenme politikası gibi) enjekte eder. Uzunluk tek başına bilgi eklemez; spesifiklik tahmin uzayını daraltır. Java karşılaştırması: bu, ayrıntılı olmaktan çok method overload çözümlemesine benzer — derleyici (veya model) doğru eşleşmeyi ancak argüman tipleri (prompt'un spesifik bileşenleri) yeterince kesinse seçer, sadece sayıca daha fazlaysa değil.` },
              },
              {
                level: 'advanced',
                q: { tr: `Claude, bir ödeme özelliği için 10 saniyede 50 test case üretti. Bu case'lerin doğru olup olmadığını nihai olarak ne belirler?` },
                a: { tr: `Kabul kriterlerin ve domain bilgin — beklenen davranışı tanımlayan oracle modelin içinde değil, tester'da yaşar, bu yüzden hız ve hacim sunum kaliteleridir, doğruluk ise yalnızca senin gerçek spesifikasyona karşı verebileceğin bir hükümdür. Bu, oracle probleminin en saf halidir: testin en eski sorusu, "doğru davranışa kim karar verir," hiçbir zaman AI'ın kendisi tarafından cevaplanmaz. Java karşılaştırması: Claude, kusursuz syntax'la JUnit testleri yazan bir kod üreticisi gibidir — boilerplate ne kadar hızlı gelirse gelsin, doğru assertion değerlerini yalnızca beklenen davranışı bilen kişi yazabilir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Flaky bir testin 3-5 koşumunun log'unu yapıştırmak, Claude'a olağanüstü ayrıntılı tek bir log yapıştırmaktan neden daha fazlasını gösterir?` },
                a: { tr: `Flaky'lik, tanımı gereği, sadece KOŞUMLAR ARASINDA görünen bir özelliktir — zamanlama farkları, test sırası bağımlılığı, paylaşılan state — ve tek bir log, ne kadar ayrıntılı olursa olsun, sadece koşumlar arasındaki değişimde var olan bir örüntüyü ortaya çıkaramaz. Birden fazla log, modelin geçme ile başarısızlık arasında neyin değiştiğini karşılaştırmasını sağlar, ki gerçek sinyal budur. Java karşılaştırması: bu, bir race condition'ı debug etmek için tek bir çok kapsamlı dump'a güvenmek yerine birden fazla thread dump'ı yakalamanın ardındaki aynı akıl yürütmedir — bug, herhangi bir tekil anlık görüntüde değil, farkta yaşar.` },
              },
              {
                level: 'advanced',
                q: { tr: `Paylaşılan bir test veritabanı için 500 gerçekçi görünen kimlik numarası üretmede ham LLM çıktısından daha güvenli bir yaklaşım tasarla.` },
                a: { tr: `Belgelenmiş, rezerve bir sahte-aralık veya önek kullanan deterministik bir üretici kullan (böylece üretilen her kimlik kanıtlanabilir şekilde sahte olur ve gerçek biriyle çakışamaz); Claude kullanılacaksa bile, son 500 kaydı doğrudan toplu üretmek için değil, sadece o rezerve-aralık şemasını küçük partiler halinde spot-check ile TASARLAMAYA yardım etmek için kullan. Herhangi bir şey seed etmeden önce ekibin veri politikasının o ortamda format olarak geçerli sentetik kimliklere açıkça izin verdiğini doğrula. Java karşılaştırması: bu, Faker tarzı kütüphanelerin SSN gibi alanlar için saf rastgeleleştirme yerine rezerve test aralıkları kullanmasını yansıtır — güvenlik özelliği, "açıkça sahte yap" gibi bir talimattan değil, belgelenmiş, kanıtlanabilir çakışmama garantisinden gelir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Tek seferlik bir testte kullanılan Claude tarafından üretilmiş bir locator ile paylaşılan bir Page Object Model içine gömülü aynı türden bir locator'ın risk profilini karşılaştır.` },
                a: { tr: `Bir testte kırılgan bir locator küçük, sınırlı bir etki alanına sahiptir — bir testi bozar ve düzeltme yereldir; paylaşılan bir POM metodu içindeki aynı kırılganlık etkiyi onu tekrar kullanan her teste çarpar, bu yüzden inceleme titizliği locator'ın nasıl üretildiğine değil, tekrar kullanıma göre ölçeklenmelidir. Java karşılaştırması: bu, tek seferlik bir script'e karşı paylaşılan bir utility metodu için ekstra code-review titizliğinin ardındaki aynı akıl yürütmedir — paylaşılan koddaki bir bug her çağıranı etkiler, bu yüzden merkezi kod için inceleme çıtası kimin veya neyin yazdığından bağımsız olarak doğası gereği daha yüksektir.` },
              },
              {
                level: 'advanced',
                q: { tr: `API assertion'larını sadece tek bir yakalanmış yanıttan yazmanın gerçek bir OpenAPI kontratından yazmaktan sistematik olarak neden farklı olduğunu açıkla.` },
                a: { tr: `Yakalanmış bir yanıt sana BİR KEZ, bir koşul setinde ne olduğunu söyler, oysa bir kontrat tüm geçerli ve geçersiz koşullar boyunca ne VAAT EDİLDİĞİNİ söyler — sadece bir yakalamadan kurulan assertion'lar o tek örneği kusursuzca test eder ama zorunlu alanları, opsiyonel alanları ve yakalamanın hiç çalıştırmadığı her dokümante edilmiş hata durumunu sessizce kaçırır. Bu bir hacim sorunu değildir (daha fazla yakalama bunu düzeltmez) ama bir kategori farkıdır: gözlem ile spesifikasyon. Java karşılaştırması: bu, karakterizasyon testleri (mevcut davranışı, bug'lar dahil, sabitleyen) ile spesifikasyon-tabanlı testler (dokümante edilmiş kontratı doğrulayan) arasındaki aynı boşluktur — farklı amaçlar için kullanışlıdır, ama sadece biri API'nin gerçekte vaat ettiğinin ihlalini yakalar.` },
              },
              {
                level: 'advanced',
                q: { tr: `Claude Code'un paylaşılan bir branch'te başarısız bir testi düzeltmesine izin vermenin, hız ve inceleme disiplinini dengeleyen güvenli bir yolunu tasarla.` },
                a: { tr: `Görevi belirli başarısız dosyayla kapsamla, ajanın önerilen düzeltmeyi uygulamadan önce göstermesini iste (aksi halde izinkâr bir modda bile), ve ortaya çıkan değişikliği paylaşılan branch'e ulaşmadan önce diğer her değişiklikle aynı insan diff review'undan geçir — kapsamı daraltmak ve bir inceleme kontrol noktası gerektirmek, ikisi de mevcut olması gereken bağımsız iki güvenlik önlemidir. Java karşılaştırması: bu, yeni bir ekip üyesinin ilk gözetimsiz görevinin, ne kadar yetenekli görünürse görünsün, ilk günden tüm kod tabanına açık yazma erişimi yerine bilinçli olarak tek bir modüle zorunlu incelemeyle kapsamlanmasıyla aynıdır.` },
              },
              {
                level: 'advanced',
                q: { tr: `JDBC-MCP analojisini kendi cümlelerinle açıkla ve özellikle QA otomasyonu için neden önemli olduğunu anlat.` },
                a: { tr: `JDBC, her satıcı için özel bir sürücü gerektirmek yerine "herhangi bir Java programı herhangi bir veritabanıyla konuşabilir" diye standartlaştırdı; MCP, "herhangi bir AI ajanı herhangi bir dış araçla konuşabilir" diye aynı şekilde standartlaştırır, bu yüzden bir tarayıcı veya veritabanı, özel bir entegrasyon gerektirmek yerine sadece başka bir MCP-şeklinde konektöre dönüşür. Özellikle QA için bu, production kodundaki bir veritabanı bağlantısına uygulanan AYNI izin ve inceleme disiplininin — en az ayrıcalık, ortam kapsamlama — bir ajanın MCP bağlantılarına da uygulanması gerektiği anlamına gelir, çünkü alttaki kimlik bilgisi tam olarak aynı derecede gerçektir. Java karşılaştırması: kimse "kurulum zamanından tasarruf etmek için" bir JDBC bağlantısına tam production yazma erişimi vermez; bir MCP veritabanı bağlantısı da birebir aynı titizliği hak eder.` },
              },
              {
                level: 'advanced',
                q: { tr: `Üretilen bir Playwright script'i yapamazken, MCP bağlantılı bir ajan "giriş yap ve neyin bozulduğunu söyle" gibi keşifsel bir görevi neden yapabilir?` },
                a: { tr: `Üretilen bir script sadece önceden yazılanı tam olarak çalıştırabilir — "beklenmedik bir şey oldu, daha fazla araştır" için bir dalı yoktur — oysa MCP bağlantılı bir ajan her eylemden sonra gerçek DOM'u algılar ve elle test eden birinin yaptığı gibi bir sonraki adımını doğaçlayabilir, çünkü sabit bir planı çalıştırmak yerine canlı sonuçlar üzerinde akıl yürütür. Java karşılaştırması: bu, sabit kodlanmış bir test script'i ile uygulamanın kendisine gösterdiğine göre uyum sağlayan keşifsel bir insan test uzmanı arasındaki farktır — MCP, ajana aynı canlı geri bildirim döngüsünü verir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Bir production olayı, gerçek bir regresyonu üç hafta boyunca gizleyen tautolojik bir assertion'la merge edilmiş, incelenmemiş bir AI üretimi test düzeltmesine kadar izleniyor. Bunu önleyecek bir ekip kuralı tasarla.` },
                a: { tr: `"Bir AI zaten kontrol etti" istisnası olmadan, hiçbir AI üretimi test veya kod değişikliğinin insan diff review'u olmadan merge edilemeyeceğine dair sabit bir kural, artı yeni veya değiştirilmiş her assertion için özellikle "özellik kasıtlı olarak bozulursa bu assertion başarısız oluyor mu?" diye soran bir inceleme kontrol listesi maddesiyle birleştirilmiş. Kural bir süreç kontrolü olmalıdır, teknik bir kontrol değil, çünkü buradaki hata modu organizasyoneldi (atlanan inceleme), salt teknik değil. Java karşılaştırması: bu, otomatik üretilen boilerplate için (örn. üretilen DTO'lar veya mapper'lar) code review gerektirmenin ardındaki aynı akıl yürütmedir — üretim kalitesi, kodu bir ekibin diğer her değişiklik için sahip olduğu inceleme sürecinden muaf tutmaz.` },
              },
              {
                level: 'advanced',
                q: { tr: `Claude, bir ekip standup'ı için büyük bir test raporunu "12 başarısızlık, çoğunlukla checkout modülünde" diye özetliyor. Bu özet bir toplantıda doğrulanmadan tekrarlanırsa ne ters gidebilir ve bunu nasıl önlersin?` },
                a: { tr: `Özetlenen gruplama ince bir şekilde yanlış olabilir — başarısızlıkları yanlış sayma, bir modülü yanlış atfetme veya farklı bir kategoriye gömülü kritik bir başarısızlığı kaçırma — ve bir kez toplantıda gerçek diye tekrarlandığında, bu hata, kaynağına geri izlenmesi kolay olmayan planlama kararlarına yayılır. Önleme basittir: gerçek diye ifade etmeden önce spesifik sayıları ve gruplamaları gerçek rapora karşı doğrula, özeti bir kaynak gerçek değil bir taslak olarak ele al. Java karşılaştırması: bu, tam CI raporunu kontrol etmeden bir build log'unun kuyruk çıktısını nihai başarısızlık sayısı olarak asla alıntılamamakla aynı disiplindir — kısaltılmış veya parafraze edilmiş bir görünüm gerçek tabloyu gizleyebilir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Bir junior, test yeşil olduğu için Claude'un ürettiği bir düzeltmeyi tam anlamaya gerek duymadığını söylüyor. Bir senior merge etmeden önce ne istemeli ve yeşil bir test soruyu neden çözmüyor?` },
                a: { tr: `Senior, junior'dan düzeltmeyi kendi cümleleriyle açıklamasını istemelidir — bu platformun herhangi bir kavramı öğrenmek için öğrettiği aynı Feynman-tarzı kontrol — çünkü yeşil bir test sadece anlık semptomun kaybolduğunu doğrular, altta yatan nedenin doğru anlaşıldığını veya ilgili bir edge case'in sessizce bozulmadığını değil. Bu kontrolü atlamak, aşırı bağımlılığın (beceri erimesinin) nasıl biriktiğidir: junior, Claude'un tek başına çözemeyeceği bir sonraki bug için gereken bağımsız debug içgüdüsünü asla geliştirmez. Java karşılaştırması: bu, "build geçiyor" ile "build'in neden geçtiğini anlıyorum" arasındaki aynı boşluktur — birincisi bir değişikliğe güvenmek için gereklidir ama asla yeterli değildir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Bir şirket politikası müşteri kodunu üçüncü parti AI araçlarına yapıştırmayı kısıtlıyor. Bir tester, müşteri adları ve e-postalarını kaldırılmış bir kod parçacığı yapıştırıyor, sadece bu temizlemenin politikayı karşıladığını düşünerek. Buradaki boşluk nedir?` },
                a: { tr: `Kişisel veriyi temizlemek bir gizlilik riskini ele alır, ama kod yapıştırmayı kısıtlayan bir şirket politikası çok büyük olasılıkla fikri mülkiyet ve şirketin kendi tescilli mantığının gizliliğiyle de ilgilidir — isimleri kaldırmak, şirketin gerçek iş mantığının, algoritmalarının veya mimarisinin bir üçüncü parti servisle paylaşıldığı gerçeğini ortadan kaldırmaz. Tester'ın "yeterince güvenli"nin ne anlama geldiğine dair kendi yargısını ikame etmek yerine GERÇEK politika metnini bilmesi ve ona uyması gerekir; "onu temizledim" otomatik olarak "politikaya uydum" ile aynı şey değildir. Java karşılaştırması: bu, bir kod parçacığından bir müşteri adı içeren bir yorumu kaldırmanın onu herkese açık paylaşmayı güvenli hale getirdiğini varsaymak gibidir — içindeki tescilli algoritma, isimler olsun olmasın hâlâ ifşa edilmiştir.` },
              },
              {
                level: 'advanced',
                q: { tr: `Claude'un salt-okunur bir web danışmanı olarak risk profiliyle paylaşılan bir branch'te tam yazma-ve-çalıştırma izinlerine sahip Claude Code'un risk profilini karşılaştır.` },
                a: { tr: `Salt-okunur bir danışman yapısı gereği güvenlidir — her çıktı hâlâ bir insan tarafından elle kopyalanmalı, incelenmeli ve uygulanmalıdır, bu yüzden herhangi bir şey etkili olmadan önce garantili bir insan kontrol noktası vardır; paylaşılan bir branch'te yazma-ve-çalıştırma yapan bir ajan, anında etkili olan ve o branch üzerine inşa eden diğer her kişiye görünen değişiklikler yapabilir, yani bir hata bir insan mutlaka fark etmeden önce yayılır. Risk farkı, her iki moddaki modelin doğruluğuyla ilgili değildir — tamamen bir insan inceleme noktasına ulaşılmadan önce kaç eylemin gerçekleştiğiyle ilgilidir. Java karşılaştırması: bu, "-DdryRun=true" ile gerçek bir "mvn deploy"'un aynı mantığı çalıştırsa bile çok farklı risk taşımasının ardındaki aynı akıl yürütmedir — etki alanı, eylemin ne kadar muhtemelen doğru olduğuna değil, gerçekte ne yapmasına izin verildiğine bağlıdır.` },
              },
              {
                level: 'advanced',
                q: { tr: `Test case üretimi, bug analizi, UI otomasyonu ve API testi boyunca, AI üretimi hatalara karşı gerçek güvenlik önlemi olarak tekrarlanan tek alışkanlık nedir?` },
                a: { tr: `Güvenmeden önce dış bir doğruluk kaynağına karşı doğrulama — test case'ler için kabul kriterleri, bug hipotezleri için tekrar üretilmiş bir hata, locator'lar için canlı DOM, ve API assertion'ları için gerçekten tetiklenmiş bir yanıt. Her durumda hata modu aynı şekildedir: kendinden emin, sözdizimsel olarak doğru ama gerçekliğe karşı kontrol edilmemiş çıktı, ve düzeltme de her zaman aynı şekildedir: sete veya kod tabanına girmeden önce çalıştır, tekrar üret veya gerçek spesifikasyona karşı karşılaştır. Java karşılaştırması: bu, derleyici-temiz bir build'e asla doğruluğun kanıtı olarak güvenmemenin ardındaki aynı ilkedir — derlenmek ve doğru olmak, AI destekli QA işinde tam olarak sıradan yazılım mühendisliğinde olduğu gibi, iki farklı, bağımsız olarak doğrulanması gereken özelliktir.` },
              },
            ],
          },
        ],
      },
    ],
  },
}
