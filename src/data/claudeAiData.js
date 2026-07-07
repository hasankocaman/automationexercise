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

// ─── Sayfa verisi ─────────────────────────────────────────────────────────────

export const claudeAiData = {
  en: {
    hero: {
      title: `🤖 Claude AI for Testers`,
      subtitle: `From Junior Prompts to Senior Agent Workflows`,
      intro: `AI will not replace testers — but testers who use AI well will replace testers who do not. This page teaches you, hands-on, how a QA engineer uses Claude at every career stage: writing prompts that actually work, generating test cases and automation code you can trust, and graduating to Claude Code and MCP-driven workflows.`,
    },
    tabs: ['🎯 Intro: AI-Assisted Testing', '✍️ Prompt Engineering'],
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
    ],
  },
  tr: {
    hero: {
      title: `🤖 Tester için Claude AI`,
      subtitle: `Junior Prompt'lardan Senior Ajan İş Akışlarına`,
      intro: `Yapay zeka tester'ın yerini almayacak — ama yapay zekayı iyi kullanan tester, kullanmayanın yerini alacak. Bu sayfa bir QA mühendisinin Claude'u kariyerinin her aşamasında nasıl kullandığını uygulamalı öğretir: gerçekten çalışan prompt'lar yazmak, güvenebileceğin test case ve otomasyon kodu ürettirmek, Claude Code ve MCP tabanlı iş akışlarına yükselmek.`,
    },
    tabs: ['🎯 Giriş: AI Destekli Test', '✍️ Prompt Mühendisliği'],
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
    ],
  },
}
