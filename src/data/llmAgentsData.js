// llmAgentsData.js - LLM & AI Agents Learning Page
// LLM nedir, agent nedir, nasıl eğitilir; tester OpenAI API ile kendi agent'ını
// nasıl kurar. Sekme mimarisi ve iş paketleri: llmcreate.md (LC1 bu dosyanın ilk 2 sekmesi).

// ─── Paylaşılan bilingual interaktif bloklar (EN + TR section'larda aynı const kullanılır) ───

const aiMapAnimation = {
  type: 'step-animation',
  id: 'llm-ai-map-step-01',
  title: { tr: 'Adım Adım: Kuraldan Agent\'a — 5 Katman', en: 'Step by Step: From Rules to Agents — 5 Layers' },
  steps: [
    { id: 1, icon: '📜', label: { tr: 'Kural tabanlı yazılım', en: 'Rule-based software' }, detail: { tr: 'Davranış elle yazılır: "if fiyat < 0 ise hata ver". Klasik test otomasyonunun dünyası — aynı girdi, her zaman aynı çıktı.', en: 'Behavior is hand-written: "if price < 0 then error". The world of classic test automation — same input, always the same output.' } },
    { id: 2, icon: '📊', label: { tr: 'Machine Learning (ML)', en: 'Machine Learning (ML)' }, detail: { tr: 'Davranış veriden ÖĞRENİLİR: etiketli binlerce e-postadan spam kalıbını çıkaran filtre gibi. Kural yazmazsın, örnek verirsin.', en: 'Behavior is LEARNED from data: like a filter that extracts the spam pattern from thousands of labeled emails. You do not write rules, you provide examples.' } },
    { id: 3, icon: '🕸️', label: { tr: 'Deep Learning (DL)', en: 'Deep Learning (DL)' }, detail: { tr: 'Öğrenme, katmanlı yapay sinir ağlarıyla yapılır — görüntüdeki bir butonu piksellerden tanıyabilen visual-regression araçlarının temeli.', en: 'Learning happens through layered neural networks — the foundation of visual-regression tools that can recognize a button from raw pixels.' } },
    { id: 4, icon: '🧱', label: { tr: 'LLM', en: 'LLM' }, detail: { tr: 'Devasa metin verisiyle eğitilmiş, TEK işi "sıradaki token\'ı tahmin etmek" olan derin ağ — bu tek beceri, ölçekte, dil/kod/test üretimine dönüşür.', en: 'A deep network trained on massive text whose ONLY job is "predict the next token" — at scale, that single skill turns into producing language, code and tests.' } },
    { id: 5, icon: '🤖', label: { tr: 'Agent', en: 'Agent' }, detail: { tr: 'LLM + araçlar + döngü: model sadece konuşmaz, dosya okur, komut çalıştırır, sonucu görüp bir sonraki adıma karar verir (Claude Code gibi).', en: 'LLM + tools + a loop: the model does not just talk — it reads files, runs commands, sees results and decides the next step (like Claude Code).' } },
  ],
}

const aiMapOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-ai-map-order-01',
  question: { tr: 'Teknolojileri "davranışın nasıl kazanıldığı" eksenine göre, elle yazılandan en özerk olana doğru sırala.', en: 'Order the technologies by how behavior is acquired, from hand-written to most autonomous.' },
  items: [
    { id: '1', text: { tr: 'Kural tabanlı yazılım — davranış elle kodlanır', en: 'Rule-based software — behavior is hand-coded' }, order: 1 },
    { id: '2', text: { tr: 'Machine Learning — davranış etiketli veriden öğrenilir', en: 'Machine Learning — behavior is learned from labeled data' }, order: 2 },
    { id: '3', text: { tr: 'Deep Learning — öğrenme katmanlı sinir ağlarıyla yapılır', en: 'Deep Learning — learning happens through layered neural networks' }, order: 3 },
    { id: '4', text: { tr: 'LLM — metinden sıradaki token\'ı tahmin etmeyi öğrenir', en: 'LLM — learns to predict the next token from text' }, order: 4 },
    { id: '5', text: { tr: 'Agent — LLM araçlarla donatılır, döngüde eyleme geçer', en: 'Agent — an LLM equipped with tools, acting in a loop' }, order: 5 },
  ],
  xpReward: 10,
}

const claudeAiCrossCallout = {
  type: 'callout',
  icon: '🤖',
  content: {
    tr: 'Bu sayfa motorun İÇİNİ anlatır. Bu motoru günlük QA işinde (test case üretimi, bug analizi, Claude Code, MCP) pratikte KULLANMAYI öğrenmek için /claude-ai sayfasına bak — iki sayfa birbirini tamamlar.',
    en: 'This page explains the INSIDE of the engine. To learn how to USE that engine in daily QA work (test case generation, bug analysis, Claude Code, MCP), see the /claude-ai page — the two pages complement each other.',
  },
}

const tokenFlowAnimation = {
  type: 'step-animation',
  id: 'llm-token-flow-step-01',
  title: { tr: 'Adım Adım: Bir LLM Cümleyi Nasıl Üretir?', en: 'Step by Step: How an LLM Generates a Sentence' },
  steps: [
    { id: 1, icon: '✂️', label: { tr: 'Metin token\'lara bölünür', en: 'Text is split into tokens' }, detail: { tr: 'Girdi cümlesi kelime değil, token denen alt parçalara ayrılır — "otomasyon" tek token olabilir, nadir bir kelime 3 parçaya bölünebilir.', en: 'The input is split not into words but into sub-pieces called tokens — a common word may be one token, a rare word may split into 3 pieces.' } },
    { id: 2, icon: '📊', label: { tr: 'Model olasılık dağılımı üretir', en: 'The model produces a probability distribution' }, detail: { tr: 'Model, sözlüğündeki BİNLERCE token için "sıradaki bu olabilir" olasılığı hesaplar — tek bir cevap değil, koca bir dağılım.', en: 'The model computes a "this could be next" probability for THOUSANDS of tokens in its vocabulary — not one answer, an entire distribution.' } },
    { id: 3, icon: '🎲', label: { tr: 'Dağılımdan bir token seçilir', en: 'One token is picked from the distribution' }, detail: { tr: 'Temperature düşükse neredeyse hep en olası token seçilir; yüksekse düşük olasılıklı token\'ların da şansı artar — aynı prompt\'un iki koşuda farklı çıkmasının sebebi tam olarak budur.', en: 'With low temperature the most likely token nearly always wins; with high temperature lower-probability tokens gain a chance — exactly why the same prompt can produce different runs.' } },
    { id: 4, icon: '➕', label: { tr: 'Token bağlama eklenir', en: 'The token is appended to the context' }, detail: { tr: 'Seçilen token girdinin sonuna eklenir ve artık bir SONRAKİ tahminin bağlamının parçasıdır — model kendi çıktısını da okuyarak ilerler.', en: 'The chosen token is appended to the input and becomes part of the context for the NEXT prediction — the model reads its own output as it goes.' } },
    { id: 5, icon: '🔁', label: { tr: 'Döngü bitene kadar tekrar', en: 'Repeat until done' }, detail: { tr: 'Adım 2-4, model "dur" token\'ı üretene veya limite ulaşana kadar döner — koca bir test planı bile tek tek token\'larla böyle yazılır.', en: 'Steps 2-4 repeat until the model emits a "stop" token or hits a limit — even an entire test plan is written this way, one token at a time.' } },
  ],
}

const tokenLabBlock = {
  type: 'token-lab',
  missions: [
    { id: 'greedy-complete', text: { tr: '🎯 "En Olasıyı Seç" butonuyla bir cümleyi baştan sona tamamla', en: 'Complete a sentence start-to-finish using only "Pick Most Likely"' } },
    { id: 'try-sample', text: { tr: '🎲 "Örnekle" butonunu en az bir kez kullan — seçimin sana değil dağılıma ait olduğunu gör', en: 'Use the "Sample" button at least once — see the pick belong to the distribution, not to you' } },
    { id: 'high-temp', text: { tr: '🌡️ Temperature\'ı 1.5 üzerine çıkarıp örnekle — dağılımın düzleştiğini izle', en: 'Raise temperature above 1.5 and sample — watch the distribution flatten' } },
    { id: 'context-shift', text: { tr: '🗺️ İki Jaguar senaryosunda da ilk token\'ı seç — aynı kelimenin bağlamla fikir değiştirdiğini gör', en: 'Pick the first token in both Jaguar scenarios — see the same word change its mind with context' } },
    { id: 'weird-path', text: { tr: '⚡ Düşük olasılıklı (turuncu) bir token\'a tıkla — akıcı ama YANLIŞ bir cümle üret: halüsinasyonun doğuşu', en: 'Click a low-probability (orange) token — produce a fluent but WRONG sentence: the birth of a hallucination' } },
  ],
}

const tokenPipelineOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-token-pipeline-order-01',
  question: { tr: 'Bir LLM\'in metin üretme döngüsünü doğru sıraya diz.', en: 'Arrange an LLM\'s text generation loop in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Girdi metni token\'lara bölünür', en: 'The input text is split into tokens' }, order: 1 },
    { id: '2', text: { tr: 'Model tüm sözlük için olasılık dağılımı hesaplar', en: 'The model computes a probability distribution over the vocabulary' }, order: 2 },
    { id: '3', text: { tr: 'Temperature\'a göre dağılımdan bir token seçilir', en: 'A token is picked from the distribution according to temperature' }, order: 3 },
    { id: '4', text: { tr: 'Seçilen token bağlamın sonuna eklenir', en: 'The chosen token is appended to the context' }, order: 4 },
    { id: '5', text: { tr: 'Döngü, dur token\'ı veya limite kadar tekrarlanır', en: 'The loop repeats until a stop token or a limit' }, order: 5 },
  ],
  xpReward: 10,
}

const tokenizePlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-tokenize-practice',
  id: 'llm-tokenize-practice',
  label: { tr: 'Pratik: Cümleyi modelin gözünden token\'lara böl', en: 'Practice: Split the sentence into tokens through the model\'s eyes' },
  language: 'text',
  task: {
    tr: 'Amaç: "model kelime okur" yanılgısını kırmak. Verilen cümleyi kabaca token\'lara bölerek yaz — yaygın kelimeler tek parça kalır, ekler ve nadir kelimeler ayrı parçalara bölünür.',
    en: 'Goal: break the "the model reads words" misconception. Rewrite the given sentence roughly split into tokens — common words stay whole, suffixes and rare words split into separate pieces.',
  },
  explanation: {
    tr: 'TODO satırını, cümlenin token bölünmüş haliyle değiştir. Parçaları | işaretiyle ayır.',
    en: 'Replace the TODO line with the token-split version of the sentence. Separate pieces with the | character.',
  },
  code: {
    tr: `Cümle: Testler gece koşulunca flaky davranıyor
TODO (cümleyi | ile token'lara bölerek yaz)`,
    en: `Sentence: The tests act flaky when running nightly
TODO (rewrite the sentence split into tokens with |)`,
  },
  starterCode: {
    tr: `Cümle: Testler gece koşulunca flaky davranıyor
TODO (cümleyi | ile token'lara bölerek yaz)`,
    en: `Sentence: The tests act flaky when running nightly
TODO (rewrite the sentence split into tokens with |)`,
  },
  solutionCode: {
    tr: `Cümle: Testler gece koşulunca flaky davranıyor
Test|ler| gece| koş|ul|unca| fl|aky| davran|ıyor`,
    en: `Sentence: The tests act flaky when running nightly
The| tests| act| fl|aky| when| running| night|ly`,
  },
  expected: {
    tr: `Birebir aynı bölme beklenmez — asıl ders şudur: "Testler" tek parça değildir (Test|ler), İngilizce kökenli "flaky" Türkçe metinde parçalanır (fl|aky), yaygın "gece" tek token kalır. Gerçek tokenizer'lar da tam olarak bu mantıkla, sıklığa göre böler.`,
    en: `An exact match is not the point — the real lesson: "tests" may stay whole while rarer "flaky" splits (fl|aky), and frequent words stay single tokens. Real tokenizers split exactly this way, by frequency.`,
  },
  hints: [
    { tr: 'Türkçe ekler (-ler, -unca, -ıyor) genelde ayrı token\'lara düşer — model dilbilgisini böyle "görür".', en: 'Suffixes like -s, -ing, -ly often fall into separate tokens — this is how the model "sees" grammar.' },
    { tr: 'İngilizce kökenli "flaky" Türkçe ağırlıklı bir metinde nadir olduğu için parçalanır — nadirlik, parça sayısını artırır.', en: 'A rarer word like "flaky" splits into pieces — rarity increases the piece count.' },
    { tr: 'Amaç doğru cevabı tutturmak değil, kelime-token farkını hissetmek: token sayısı = API maliyetinin birimi.', en: 'The goal is not an exact match but feeling the word-token difference: token count is the unit of API cost.' },
  ],
  xpReward: 15,
}

// ─── Sayfa verisi ─────────────────────────────────────────────────────────────

export const llmAgentsData = {
  en: {
    hero: {
      title: `🧠 LLM & AI Agents`,
      subtitle: `From Token Prediction to Your Own Test Agent`,
      intro: `You learned how to USE AI for testing on the Claude AI page — this page opens the hood. What is an LLM really doing, how is it trained, what turns it into an agent, and can a tester build and even fine-tune one alone with the OpenAI API? Everything here is hands-on and simulation-backed: you will predict tokens like a model does before you ever call one.`,
    },
    tabs: ['🎯 Intro: The AI, ML & LLM Map', '🧱 What Is an LLM: Tokens & Prediction'],
    sections: [
      {
        title: `🎯 Intro: The AI, ML & LLM Map`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗺️',
            content: `AI, ML, Deep Learning and LLM are not four competing things — they are one map at four zoom levels, and the zoom axis is exact: each level is defined by HOW the software acquires its behavior. Rule-based software is told what to do line by line; ML learns behavior from labeled examples; Deep Learning learns it through layered neural networks; an LLM is a deep network whose single learned skill is predicting the next token of text. Here is the question worth pausing on: why does everyone say "AI" when they almost always mean "an LLM product" — and why should a tester care about the difference? Because each layer fails DIFFERENTLY, and a tester who cannot name the layer cannot predict the failure mode: a rule-based system fails loudly and reproducibly, an LLM fails fluently and probabilistically. Java comparison: this is an inheritance hierarchy — interface AI at the top, abstract class ML under it, concrete subclasses below — and exactly like in Java, calling something by its supertype hides the behavior that only the subtype explains. The QA stake: when a vendor sells you an "AI-powered testing tool", the engineering question that cuts through the marketing is "which layer — hand-written heuristics, a trained classifier, or an LLM — and how was it trained?", because that answer tells you whether its output is deterministic enough to assert on, or probabilistic enough to need a completely different verification strategy.`,
          },
          { type: 'heading', text: `Four Terms, One Zoom Axis` },
          {
            type: 'text',
            content: `Artificial Intelligence (AI) is the umbrella: any software that shows behavior we associate with intelligence, including 1980s rule-based chess programs. Machine Learning (ML) is the subset where behavior is learned from data instead of hand-coded. Deep Learning (DL) is the subset of ML where the learning happens in many-layered neural networks. A Large Language Model (LLM) is a deep network trained on enormous amounts of text with one objective: predict the next token. An agent is not a fifth layer of the same axis — it is an LLM EQUIPPED with tools and a loop, which is why it gets its own tabs later on this page.`,
          },
          {
            type: 'table',
            headers: ['Layer', 'How Behavior Is Acquired', 'QA-World Example'],
            rows: [
              ['Rule-based (classic AI)', 'Hand-written rules and heuristics', 'Your Selenium suite: every step and assertion written by a human, fully deterministic'],
              ['Machine Learning', 'Learned from labeled examples', 'A test-failure classifier that learns "infra flake vs real bug" from past labeled failures'],
              ['Deep Learning', 'Learned via layered neural networks', 'Visual regression tools that recognize a button from pixels instead of a selector'],
              ['LLM', 'Learned next-token prediction over huge text corpora', 'Claude or GPT models generating test cases, analyzing logs, writing Playwright code'],
              ['Agent (LLM + tools)', 'An LLM deciding actions in a loop with tool access', 'Claude Code reading a failing test, running it and proposing a fix'],
            ],
          },
          {
            type: 'text',
            content: `Reasoning: why must a tester internalize the deterministic/probabilistic divide before anything else on this page? Classic automation rests on one assumption so basic it is invisible: the same input produces the same output, which is what makes assertEquals meaningful. An LLM breaks that assumption BY DESIGN — its output is sampled from a probability distribution, so the same prompt can legitimately produce different, equally valid answers. Java comparison: it is the difference between testing a pure function and testing something with an intentional random seed you cannot fix. This is not a flaw to work around; it is the property the rest of this page keeps returning to — from temperature in the Token Lab below to evals in the production tab.`,
          },
          aiMapAnimation,
          aiMapOrder,
          claudeAiCrossCallout,
          {
            type: 'quiz',
            question: `A vendor demo claims their "AI-powered test tool" will "never miss a bug". Which single engineering question best cuts through the marketing?`,
            options: [
              { id: 'a', text: 'How many customers do you have?' },
              { id: 'b', text: 'Which layer is the "AI" — hand-written heuristics, a trained classifier, or an LLM — and how was it trained? The answer determines whether its output is deterministic or probabilistic, and therefore how it can fail' },
              { id: 'c', text: 'Does it support dark mode in its dashboard?' },
              { id: 'd', text: 'Is it written in Java or Python?' },
            ],
            correct: 'b',
            explanation: `"AI-powered" spans everything from an if-else heuristic to an LLM, and each layer fails differently: rules fail loudly and reproducibly, LLMs fail fluently and probabilistically. Naming the layer tells you the failure mode, and the failure mode tells you the verification strategy — no other single question does that.`,
            retryQuestion: {
              question: `Your team runs the same LLM prompt twice and gets two differently-worded but equally correct answers. A junior files this as a bug. What is the correct assessment?`,
              options: [
                { id: 'a', text: 'It is a bug — software must always produce identical output for identical input' },
                { id: 'b', text: 'It is expected behavior — LLM output is sampled from a probability distribution, so run-to-run variation is by design; the verification strategy must target meaning and correctness, not exact strings' },
                { id: 'c', text: 'It means the model was retrained between the two runs' },
                { id: 'd', text: 'It means the prompt was too long' },
              ],
              correct: 'b',
              explanation: `Sampling is the mechanism, not a defect: the model picks from a distribution at every token. Asserting exact string equality on LLM output imports a determinism assumption from classic automation into a system that intentionally does not honor it.`,
            },
          },
        ],
      },
      {
        title: `🧱 What Is an LLM: Tokens & Prediction`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `An LLM is your phone keyboard's next-word suggestion grown to planetary scale — and the mechanism matches one-to-one, not loosely: your keyboard learned "what word usually follows" from your own typing history; an LLM learned "what token usually follows" from a huge slice of humanity's text, with billions of adjustable weights instead of a small frequency table. Here is the question worth sitting on: how does something whose ONLY skill is "predict the next piece of text" end up writing working Playwright code and structured bug reports? Because at sufficient scale, predicting the next token of code accurately REQUIRES having internalized syntax, APIs, patterns and even the shape of a good test — the prediction objective forces the competence in. Java comparison: an LLM is not a giant HashMap looking up stored answers — it is closer to a fitted function: like a regression that interpolates values it never saw, the model computes plausible continuations from weights, which is precisely why it can produce text that was never in its training data, both brilliantly and wrongly. The QA stake: everything risky and everything useful about LLMs in testing flows from this one mechanism — fluent-but-wrong hallucinations, run-to-run variation, prompt sensitivity — so a tester who has personally watched tokens being picked from a probability distribution (which you will do in the lab below) reasons about AI failures from the mechanism instead of from folklore.`,
          },
          { type: 'heading', text: `Tokens: The Model's Alphabet` },
          {
            type: 'text',
            content: `A model does not read words or letters — it reads tokens: sub-word pieces chosen by frequency. A common word is often a single token; a rare word splits into several pieces; punctuation and spaces count too. This is more than trivia for a tester: token count is the unit of context limits and of API cost, and the reason a model can struggle with character-level tasks (counting letters, reversing strings) while excelling at meaning-level tasks — it literally does not see individual characters the way you do.`,
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `Cümle:      Testler gece koşulunca flaky davranıyor
Token'lar:  Test | ler | gece | koş | ul | unca | fl | aky | davran | ıyor
Sayım:      10 token (6 kelime değil!)

Yaygın kelime  -> genelde tek token ("gece")
Ekler          -> ayrı token'lara bölünür ("-ler", "-unca", "-ıyor")
Nadir kelime   -> parçalanır ("flaky" -> "fl" + "aky")`,
              en: `Sentence:  The tests act flaky when running nightly
Tokens:    The | tests | act | fl | aky | when | running | night | ly
Count:     9 tokens (not 7 words!)

Common word -> usually one token ("when")
Suffixes    -> split into separate tokens ("-ly")
Rare word   -> breaks apart ("flaky" -> "fl" + "aky")`,
            },
          },
          tokenizePlayground,
          { type: 'heading', text: `Next-Token Prediction: The Whole Trick` },
          {
            type: 'text',
            content: `Generation is a loop, not an act of composition: the model receives the context, computes a probability for every token in its vocabulary, one token is picked from that distribution, the pick is appended to the context, and the loop repeats. Temperature is the dial on the picking step: low temperature sharpens the distribution so the most likely token nearly always wins (predictable, repetitive); high temperature flattens it so unlikely tokens get real chances (creative, riskier). There is no plan, no draft, no lookahead editing — a complete test plan comes out of this loop one token at a time.`,
          },
          tokenFlowAnimation,
          { type: 'heading', text: `Token Lab — Be the Model for a Minute` },
          {
            type: 'text',
            content: `Reading about distributions is passive; below you will BE the sampling step. Pick a context, look at the candidate tokens with their probabilities, and build the sentence yourself — greedy, sampled, or by hand. The twin Jaguar scenarios show how context alone reshapes the distribution, and the orange low-probability paths let you manufacture a fluent-but-wrong sentence with your own click: that is a hallucination, experienced from the inside. The simulation is deterministic and hand-crafted (a real model has tens of thousands of candidates, not four), but the mechanism you are exercising is the real one.`,
          },
          tokenLabBlock,
          tokenPipelineOrder,
          {
            type: 'quiz',
            question: `In the Token Lab, raising the temperature slider visibly flattened the probability bars. Mechanically, what does this mean for the model's output?`,
            options: [
              { id: 'a', text: 'The model becomes smarter and more accurate' },
              { id: 'b', text: 'Low-probability tokens gain a realistic chance of being picked, so output becomes more varied and creative — and simultaneously more likely to wander into fluent-but-wrong territory' },
              { id: 'c', text: 'The model processes the prompt faster' },
              { id: 'd', text: 'The context window becomes larger' },
            ],
            correct: 'b',
            explanation: `Temperature reshapes the picking distribution, nothing else: it trades predictability for variety. That is why the same prompt can yield different runs, and why cranking temperature up raises both creativity and the risk of the low-probability "weird" paths you clicked in the lab.`,
            retryQuestion: {
              question: `A model confidently states a wrong "fact" in perfectly fluent prose. Based on the token mechanism you exercised in the lab, what is the mechanical explanation?`,
              options: [
                { id: 'a', text: 'The model chose to lie to end the conversation faster' },
                { id: 'b', text: 'At some point in the loop, plausible-but-wrong tokens formed a high-enough probability path, and once picked they became context that the rest of the answer fluently continued — the large-scale version of the orange path you clicked in the Token Lab' },
                { id: 'c', text: 'The model ran out of memory mid-sentence' },
                { id: 'd', text: 'Fluent language proves the content is correct, so the fact must be true' },
              ],
              correct: 'b',
              explanation: `There is no "lying" and no fact-checking module in the loop — only next-token probabilities. A wrong continuation that reads plausibly can win the sampling step, and because each pick feeds the next, the error compounds fluently. Fluency and truth are produced by the same mechanism, which is exactly why fluency is never evidence.`,
            },
          },
        ],
      },
    ],
  },
  tr: {
    hero: {
      title: `🧠 LLM & AI Agent'lar`,
      subtitle: `Token Tahmininden Kendi Test Agent'ına`,
      intro: `Yapay zekayı test işinde KULLANMAYI /claude-ai sayfasında öğrendin — bu sayfa kaputu açıyor. Bir LLM gerçekte ne yapıyor, nasıl eğitiliyor, onu agent'a dönüştüren ne, ve bir tester OpenAI API ile tek başına agent kurabilir hatta eğitebilir mi? Buradaki her şey uygulamalı ve simülasyon destekli: daha bir modeli çağırmadan önce, token'ları bir model gibi kendin tahmin edeceksin.`,
    },
    tabs: ['🎯 Giriş: AI, ML ve LLM Haritası', '🧱 LLM Nedir: Token ve Tahmin Motoru'],
    sections: [
      {
        title: `🎯 Giriş: AI, ML ve LLM Haritası`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🗺️',
            content: `AI, ML, Deep Learning ve LLM birbiriyle yarışan dört ayrı şey değildir — aynı haritanın dört yakınlaştırma seviyesidir, ve yakınlaştırma ekseni nettir: her seviye, yazılımın davranışını NASIL kazandığıyla tanımlanır. Kural tabanlı yazılıma ne yapacağı satır satır söylenir; ML davranışı etiketli örneklerden öğrenir; Deep Learning bunu katmanlı sinir ağlarıyla yapar; LLM ise tek öğrenilmiş becerisi "metnin sıradaki token'ını tahmin etmek" olan derin bir ağdır. Üzerinde durulmaya değer soru şu: herkes neredeyse her zaman "bir LLM ürünü"nü kastederken neden "yapay zeka" diyor — ve bir tester bu farkı neden önemsemeli? Çünkü her katman FARKLI bozulur, ve katmanın adını koyamayan tester hata modunu öngöremez: kural tabanlı sistem gürültülü ve tekrarlanabilir bozulur, LLM ise akıcı ve olasılıksal bozulur. Java karşılaştırması: bu bir kalıtım hiyerarşisidir — en üstte interface AI, altında abstract class ML, altta somut alt sınıflar — ve tam Java'daki gibi, bir şeyi üst tipinin adıyla çağırmak, ancak alt tipin açıkladığı davranışı gizler. QA tarafındaki bedel: bir satıcı sana "AI destekli test aracı" sattığında pazarlamayı kesen mühendislik sorusu şudur: "Hangi katman — elle yazılmış sezgisel kurallar mı, eğitilmiş bir sınıflandırıcı mı, bir LLM mi — ve nasıl eğitildi?" Çünkü bu cevap, çıktısının üzerine assertion yazılacak kadar deterministik mi, yoksa bambaşka bir doğrulama stratejisi gerektirecek kadar olasılıksal mı olduğunu söyler.`,
          },
          { type: 'heading', text: `Dört Terim, Tek Yakınlaştırma Ekseni` },
          {
            type: 'text',
            content: `Yapay Zeka (AI) şemsiyedir: zekayla ilişkilendirdiğimiz davranışı gösteren her yazılım, 1980'lerin kural tabanlı satranç programları dahil. Machine Learning (ML), davranışın elle kodlanmak yerine veriden öğrenildiği alt kümedir. Deep Learning (DL), öğrenmenin çok katmanlı sinir ağlarında gerçekleştiği ML alt kümesidir. Large Language Model (LLM), devasa miktarda metinle tek bir hedefle eğitilmiş derin bir ağdır: sıradaki token'ı tahmin et. Agent ise aynı eksenin beşinci katmanı değildir — araçlarla ve bir döngüyle DONATILMIŞ bir LLM'dir; bu yüzden bu sayfanın ileriki sekmelerinde kendi başlıklarını alır.`,
          },
          {
            type: 'table',
            headers: ['Katman', 'Davranış Nasıl Kazanılır', 'QA Dünyasından Örnek'],
            rows: [
              ['Kural tabanlı (klasik AI)', 'Elle yazılmış kurallar ve sezgisel yöntemler', 'Selenium suite\'in: her adım ve assertion bir insan tarafından yazılmış, tamamen deterministik'],
              ['Machine Learning', 'Etiketli örneklerden öğrenilir', 'Geçmiş etiketli hatalardan "altyapı flake\'i mi gerçek bug mı" ayrımını öğrenen bir test-hatası sınıflandırıcısı'],
              ['Deep Learning', 'Katmanlı sinir ağlarıyla öğrenilir', 'Bir butonu selector yerine piksellerden tanıyan visual regression araçları'],
              ['LLM', 'Devasa metin üzerinde sıradaki-token tahmini öğrenilir', 'Test case üreten, log analiz eden, Playwright kodu yazan Claude veya GPT modelleri'],
              ['Agent (LLM + araçlar)', 'Araç erişimli bir döngüde eyleme karar veren LLM', 'Başarısız bir testi okuyup çalıştıran ve düzeltme öneren Claude Code'],
            ],
          },
          {
            type: 'text',
            content: `Akıl yürütme: bir tester bu sayfadaki her şeyden önce neden deterministik/olasılıksal ayrımını içselleştirmeli? Klasik otomasyon, o kadar temel ki görünmez olan tek bir varsayıma yaslanır: aynı girdi aynı çıktıyı üretir — assertEquals'ı anlamlı kılan şey budur. LLM bu varsayımı TASARIM GEREĞİ kırar — çıktısı bir olasılık dağılımından örneklenir, yani aynı prompt meşru olarak farklı ama eşit derecede geçerli cevaplar üretebilir. Java karşılaştırması: bu, saf bir fonksiyonu test etmekle sabitleyemediğin kasıtlı bir random seed içeren bir şeyi test etmek arasındaki farktır. Bu, etrafından dolaşılacak bir kusur değil; bu sayfanın tekrar tekrar döneceği özelliktir — aşağıdaki Token Lab'daki temperature'dan üretim sekmesindeki evals'a kadar.`,
          },
          aiMapAnimation,
          aiMapOrder,
          claudeAiCrossCallout,
          {
            type: 'quiz',
            question: `Bir satıcı demosunda "AI destekli test aracımız hiçbir bug'ı kaçırmaz" deniyor. Pazarlamayı kesen TEK mühendislik sorusu hangisi?`,
            options: [
              { id: 'a', text: 'Kaç müşteriniz var?' },
              { id: 'b', text: '"AI" hangi katman — elle yazılmış sezgisel kurallar mı, eğitilmiş bir sınıflandırıcı mı, bir LLM mi — ve nasıl eğitildi? Cevap, çıktının deterministik mi olasılıksal mı olduğunu, dolayısıyla NASIL bozulabileceğini belirler' },
              { id: 'c', text: 'Panelinizde karanlık mod var mı?' },
              { id: 'd', text: 'Java ile mi Python ile mi yazıldı?' },
            ],
            correct: 'b',
            explanation: `"AI destekli" ifadesi if-else sezgisellerinden LLM'e kadar her şeyi kapsar ve her katman farklı bozulur: kurallar gürültülü ve tekrarlanabilir, LLM'ler akıcı ve olasılıksal bozulur. Katmanın adını koymak hata modunu, hata modu da doğrulama stratejisini söyler — bunu başka hiçbir tek soru yapamaz.`,
            retryQuestion: {
              question: `Ekibin aynı LLM prompt'unu iki kez çalıştırıyor ve farklı kelimelerle yazılmış ama eşit derecede doğru iki cevap alıyor. Bir junior bunu bug olarak kaydediyor. Doğru değerlendirme nedir?`,
              options: [
                { id: 'a', text: 'Bug\'dır — yazılım aynı girdiye her zaman birebir aynı çıktıyı üretmelidir' },
                { id: 'b', text: 'Beklenen davranıştır — LLM çıktısı bir olasılık dağılımından örneklenir, koşudan koşuya değişim tasarım gereğidir; doğrulama stratejisi birebir string\'i değil, anlamı ve doğruluğu hedeflemelidir' },
                { id: 'c', text: 'İki koşum arasında modelin yeniden eğitildiği anlamına gelir' },
                { id: 'd', text: 'Prompt\'un fazla uzun olduğu anlamına gelir' },
              ],
              correct: 'b',
              explanation: `Örnekleme bir kusur değil mekanizmanın kendisidir: model her token'da bir dağılımdan seçim yapar. LLM çıktısına birebir string eşitliği assertion'ı yazmak, klasik otomasyonun determinizm varsayımını, bu varsayımı bilerek taşımayan bir sisteme ithal etmektir.`,
            },
          },
        ],
      },
      {
        title: `🧱 LLM Nedir: Token ve Tahmin Motoru`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧱',
            content: `LLM, telefon klavyendeki sıradaki-kelime önerisinin gezegen ölçeğine büyümüş halidir — ve mekanizma kabaca değil, birebir örtüşür: klavyen "genelde hangi kelime gelir"i SENİN yazım geçmişinden öğrendi; LLM "genelde hangi token gelir"i insanlığın devasa bir metin diliminden, küçük bir sıklık tablosu yerine milyarlarca ayarlanabilir ağırlıkla öğrendi. Üzerinde durulmaya değer soru şu: TEK becerisi "metnin sıradaki parçasını tahmin etmek" olan bir şey, nasıl oluyor da çalışan Playwright kodu ve yapılandırılmış bug raporları yazıyor? Çünkü yeterli ölçekte, kodun sıradaki token'ını İSABETLE tahmin etmek; sözdizimini, API'leri, kalıpları ve hatta iyi bir testin şeklini içselleştirmiş olmayı GEREKTİRİR — tahmin hedefi, yetkinliği zorla içeri sokar. Java karşılaştırması: LLM, kayıtlı cevapları arayan dev bir HashMap değildir — fit edilmiş bir fonksiyona daha yakındır: hiç görmediği değerleri interpolasyonla üreten bir regresyon gibi, model olası devamları ağırlıklardan HESAPLAR; eğitim verisinde hiç var olmamış metni hem parlak hem yanlış biçimde üretebilmesinin sebebi tam olarak budur. QA tarafındaki bedel: LLM'lerin test işindeki riskli ve faydalı her özelliği bu tek mekanizmadan akar — akıcı-ama-yanlış halüsinasyonlar, koşudan koşuya değişim, prompt hassasiyeti — bu yüzden token'ların bir olasılık dağılımından seçilişini KENDİ GÖZÜYLE izlemiş bir tester (aşağıdaki lab'da yapacaksın), AI hataları hakkında kulaktan dolma bilgiyle değil mekanizmayla akıl yürütür.`,
          },
          { type: 'heading', text: `Token: Modelin Alfabesi` },
          {
            type: 'text',
            content: `Model kelime veya harf okumaz — token okur: sıklığa göre seçilmiş kelime-altı parçalar. Yaygın bir kelime çoğunlukla tek token'dır; nadir bir kelime birkaç parçaya bölünür; noktalama ve boşluklar da sayılır. Bu bir tester için ansiklopedik bilgi değildir: token sayısı hem context limitinin hem API maliyetinin birimidir, ve modelin anlam-düzeyi görevlerde parlarken karakter-düzeyi görevlerde (harf saymak, string ters çevirmek) zorlanmasının sebebidir — tek tek karakterleri senin gördüğün gibi görmez.`,
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `Cümle:      Testler gece koşulunca flaky davranıyor
Token'lar:  Test | ler | gece | koş | ul | unca | fl | aky | davran | ıyor
Sayım:      10 token (6 kelime değil!)

Yaygın kelime  -> genelde tek token ("gece")
Ekler          -> ayrı token'lara bölünür ("-ler", "-unca", "-ıyor")
Nadir kelime   -> parçalanır ("flaky" -> "fl" + "aky")`,
              en: `Sentence:  The tests act flaky when running nightly
Tokens:    The | tests | act | fl | aky | when | running | night | ly
Count:     9 tokens (not 7 words!)

Common word -> usually one token ("when")
Suffixes    -> split into separate tokens ("-ly")
Rare word   -> breaks apart ("flaky" -> "fl" + "aky")`,
            },
          },
          tokenizePlayground,
          { type: 'heading', text: `Sıradaki-Token Tahmini: Numaranın Tamamı` },
          {
            type: 'text',
            content: `Üretim bir kompozisyon eylemi değil, bir döngüdür: model bağlamı alır, sözlüğündeki her token için bir olasılık hesaplar, o dağılımdan bir token seçilir, seçim bağlamın sonuna eklenir ve döngü tekrarlar. Temperature, seçim adımının ayar düğmesidir: düşük temperature dağılımı sivriltir, en olası token neredeyse hep kazanır (öngörülebilir, tekrarlı); yüksek temperature dağılımı düzleştirir, olasılığı düşük token'lar gerçek şans kazanır (yaratıcı, daha riskli). Plan yok, taslak yok, ileriye bakıp düzeltme yok — koca bir test planı bu döngüden token token çıkar.`,
          },
          tokenFlowAnimation,
          { type: 'heading', text: `Token Lab — Bir Dakikalığına Model Ol` },
          {
            type: 'text',
            content: `Dağılımlar hakkında okumak pasiftir; aşağıda örnekleme adımının KENDİSİ olacaksın. Bir bağlam seç, aday token'ları olasılıklarıyla incele ve cümleyi kendin kur — greedy ile, örnekleyerek veya elle. İkiz Jaguar senaryoları tek başına bağlamın dağılımı nasıl yeniden şekillendirdiğini gösterir; turuncu düşük-olasılık yolları ise kendi tıklamanla akıcı-ama-yanlış bir cümle üretmeni sağlar: halüsinasyon, içeriden yaşanmış haliyle budur. Simülasyon deterministik ve elle hazırlanmıştır (gerçek bir modelin dört değil, on binlerce adayı vardır), ama çalıştırdığın mekanizma gerçeğin ta kendisidir.`,
          },
          tokenLabBlock,
          tokenPipelineOrder,
          {
            type: 'quiz',
            question: `Token Lab'da temperature slider'ını yükseltmek olasılık çubuklarını gözle görülür şekilde düzleştirdi. Mekanik olarak bu, modelin çıktısı için ne anlama gelir?`,
            options: [
              { id: 'a', text: 'Model daha akıllı ve daha isabetli hale gelir' },
              { id: 'b', text: 'Düşük olasılıklı token\'lar seçilme konusunda gerçekçi bir şans kazanır; çıktı daha çeşitli ve yaratıcı olur — ve aynı anda akıcı-ama-yanlış bölgeye sapma olasılığı da artar' },
              { id: 'c', text: 'Model prompt\'u daha hızlı işler' },
              { id: 'd', text: 'Context window büyür' },
            ],
            correct: 'b',
            explanation: `Temperature yalnızca seçim dağılımını yeniden şekillendirir: öngörülebilirliği çeşitlilikle takas eder. Aynı prompt'un farklı koşular üretmesinin ve temperature'ı yükseltmenin hem yaratıcılığı hem lab'da tıkladığın düşük-olasılıklı "tuhaf" yolların riskini birlikte artırmasının sebebi budur.`,
            retryQuestion: {
              question: `Bir model, kusursuz akıcılıkta bir metinle yanlış bir "gerçeği" kendinden emin şekilde söylüyor. Lab'da çalıştırdığın token mekanizmasına göre mekanik açıklama nedir?`,
              options: [
                { id: 'a', text: 'Model konuşmayı erken bitirmek için yalan söylemeyi seçti' },
                { id: 'b', text: 'Döngünün bir noktasında olası-görünen-ama-yanlış token\'lar yeterince yüksek olasılıklı bir yol oluşturdu; bir kez seçilince bağlamın parçası oldular ve cevabın kalanı bunu akıcı şekilde sürdürdü — Token Lab\'da tıkladığın turuncu yolun büyük ölçekli hali' },
                { id: 'c', text: 'Modelin cümle ortasında belleği bitti' },
                { id: 'd', text: 'Akıcı dil içeriğin doğruluğunu kanıtlar, dolayısıyla o bilgi doğru olmalı' },
              ],
              correct: 'b',
              explanation: `Döngüde "yalan söyleme" de yoktur, bir doğruluk-kontrol modülü de — sadece sıradaki-token olasılıkları vardır. İnandırıcı okunan yanlış bir devam örnekleme adımını kazanabilir; her seçim bir sonrakini beslediği için hata akıcı biçimde birikir. Akıcılık ve doğruluk aynı mekanizmadan üretilir — akıcılığın asla kanıt olmamasının sebebi tam olarak budur.`,
            },
          },
        ],
      },
    ],
  },
}
