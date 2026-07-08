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

// ─── LC2 paylaşılan bloklar: Pretraining ─────────────────────────────────────

const pretrainingLoopAnimation = {
  type: 'step-animation',
  id: 'llm-pretraining-loop-step-01',
  title: { tr: 'Adım Adım: Ham Metinden Pretrained Modele', en: 'Step by Step: From Raw Text to a Pretrained Model' },
  steps: [
    { id: 1, icon: '📚', label: { tr: 'Devasa metni topla', en: 'Collect' }, detail: { tr: 'Kitaplar, kod, forumlar, dokümantasyon — devasa ve çeşitli bir metin dilimi bir araya getirilir.', en: 'Books, code, forums, docs — a massive, diverse slice of text is gathered.' } },
    { id: 2, icon: '🙈', label: { tr: 'Sıradaki token\'ı gizle', en: 'Mask' }, detail: { tr: 'Bir metin parçasının sıradaki token\'ı modelden saklanır — model onu tahmin etmeye zorlanır.', en: 'The next token of a passage is hidden from the model — it is forced to guess it.' } },
    { id: 3, icon: '📏', label: { tr: 'Tahmin et ve ölç', en: 'Predict & measure' }, detail: { tr: 'Model tahmin eder, tahmin gerçek token ile karşılaştırılır; fark "loss" (kayıp) olarak ölçülür.', en: 'The model guesses, the guess is compared to the real token, and the gap is measured as "loss".' } },
    { id: 4, icon: '⚙️', label: { tr: 'Ağırlıkları ayarla', en: 'Adjust' }, detail: { tr: 'Milyarlarca iç ağırlık, kaybı azaltacak yönde ÇOK küçük adımlarla güncellenir.', en: 'Billions of internal weights are nudged very slightly toward reducing that loss.' } },
    { id: 5, icon: '🔁', label: { tr: 'Ölçekte tekrarla', en: 'Repeat at scale' }, detail: { tr: '2-4. adımlar tüm veri setinde trilyonlarca kez tekrarlanır — "pretrained base model" bunun sonucudur.', en: 'Steps 2-4 repeat trillions of times across the whole dataset, producing the pretrained "base model".' } },
  ],
}

const pretrainingLoopOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-pretraining-loop-order-01',
  question: { tr: 'Pretraining döngüsünü doğru sıraya diz.', en: 'Arrange the pretraining loop in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Devasa ve çeşitli bir metin dilimi topla', en: 'Collect a massive, diverse slice of text' }, order: 1 },
    { id: '2', text: { tr: 'Bir metin parçasının sıradaki token\'ını gizle', en: 'Hide the next token of a passage' }, order: 2 },
    { id: '3', text: { tr: 'Model tahmin etsin, gerçekle karşılaştırıp kaybı ölç', en: 'Let the model predict, compare to the real token, measure the loss' }, order: 3 },
    { id: '4', text: { tr: 'Ağırlıkları kaybı azaltacak yönde çok küçük adımlarla güncelle', en: 'Adjust the weights very slightly to reduce that loss' }, order: 4 },
    { id: '5', text: { tr: 'Tüm veri setinde trilyonlarca kez tekrarla', en: 'Repeat trillions of times across the whole dataset' }, order: 5 },
  ],
  xpReward: 10,
}

const trainingCutoffPlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-training-cutoff-diagnosis-practice',
  id: 'llm-training-cutoff-diagnosis-practice',
  label: { tr: 'Pratik: "Bozuk" bir AI çıktısını mekanik bir teşhise dönüştür', en: 'Practice: Turn a "broken" AI output into a mechanistic diagnosis' },
  language: 'text',
  task: {
    tr: 'Amaç: "Model eski kod yazdı, bozuk" gibi belirsiz bir gözlemi; hangi API\'nin kaldırıldığını, kök nedeni (eğitim kesim tarihinde donmuş ağırlıklar) ve düzeltmeyi içeren mekanik bir teşhise dönüştürmek.',
    en: 'Goal: turn a vague observation like "The model wrote old code, it\'s broken" into a mechanistic diagnosis naming the removed API, the root cause (weights frozen at the training cutoff), and the fix.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: tam olarak hangi eski API kullanıldı, kök neden, düzeltme.',
    en: 'Fill in the TODO lines: exactly which old API was used, the root cause, the fix.',
  },
  code: {
    tr: `TODO (hangi eski API kullanıldı)
Model eski kod yazdı, bozuk.
TODO (kök neden + düzeltme)`,
    en: `TODO (which old API was used)
The model wrote old code, it's broken.
TODO (root cause + fix)`,
  },
  starterCode: {
    tr: `TODO (hangi eski API kullanıldı)
Model eski kod yazdı, bozuk.
TODO (kök neden + düzeltme)`,
    en: `TODO (which old API was used)
The model wrote old code, it's broken.
TODO (root cause + fix)`,
  },
  solutionCode: {
    tr: `Gözlem: Model, Playwright'ın kaldırılmış bir eski API'sini kullandı (page.waitForSelector).
Kök neden: Modelin ağırlıkları eğitim kesim tarihinde donduruldu; o tarihte bu API hâlâ yaygındı, sonradan kaldırıldı — model "dikkatsiz" değil, bilgisi o tarihte dondu.
Düzeltme: Prompt'a tam kurulu sürümü ekle ("Playwright 1.45 kullanıyorum") ve tanıdık olmayan metodları changelog'a karşı kontrol et.`,
    en: `Observation: The model used a removed Playwright API (page.waitForSelector).
Root cause: The model's weights were frozen at its training cutoff; that API was still common back then and was removed later — the model isn't "careless", its knowledge simply froze at that date.
Fix: State your exact installed version in the prompt ("I'm using Playwright 1.45") and cross-check unfamiliar methods against the changelog.`,
  },
  expected: {
    tr: `Teşhis artık "modelin hatası" yerine "donmuş ağırlıklar, eğitim kesim tarihi" mekanizmasını adlandırıyor — bu, aynı hatayı bir sonraki prompt'ta tekrar yapmamak için gereken doğru zihinsel modeldir.`,
    en: `The diagnosis now names the "frozen weights, training cutoff" mechanism instead of "the model's mistake" — this is the correct mental model for not repeating the same error in the next prompt.`,
  },
  hints: [
    { tr: '"Bozuk" demek yerine TAM olarak hangi API\'nin kaldırıldığını belirtmek, teşhisi kanıta dayalı yapar.', en: 'Saying exactly which API was removed, instead of "broken", makes the diagnosis evidence-based.' },
    { tr: '"Eğitim kesim tarihi" kavramını kök neden olarak adlandırmak, sorunu "modelin hatası" yerine "donmuş ağırlıklar" çerçevesine oturtur.', en: `Naming "training cutoff" as the root cause reframes the problem from "the model's mistake" to "frozen weights".` },
    { tr: 'Düzeltme her zaman aynı şekildedir: tam sürüm bilgisini prompt\'a ekle.', en: 'The fix is always the same shape: state your exact version in the prompt.' },
  ],
  xpReward: 15,
}

// ─── LC2 paylaşılan bloklar: Fine-tuning & RLHF ──────────────────────────────

const alignmentPipelineAnimation = {
  type: 'step-animation',
  id: 'llm-alignment-pipeline-step-01',
  title: { tr: 'Adım Adım: Base Model\'den Yardımcı Asistana', en: 'Step by Step: From Base Model to Helpful Assistant' },
  steps: [
    { id: 1, icon: '📦', label: { tr: 'Pretrained base model', en: 'Pretrained base' }, detail: { tr: 'Ham bir sıradaki-token tahmincisi — henüz "yardımcı olma" diye bir kavramı yok.', en: 'A raw next-token predictor — no notion of "helpful" yet.' } },
    { id: 2, icon: '📝', label: { tr: 'SFT ile örnek göster', en: 'SFT' }, detail: { tr: 'İstenen format ve tonu gösteren, özenle seçilmiş örnek diyaloglarla eğitilir.', en: 'Trained on curated example conversations showing the desired format and tone.' } },
    { id: 3, icon: '🔀', label: { tr: 'İki aday cevap üret', en: 'Generate candidate pairs' }, detail: { tr: 'Model aynı prompt için iki farklı cevap üretir.', en: 'The model produces two different answers to the same prompt.' } },
    { id: 4, icon: '👍', label: { tr: 'İnsan tercihi', en: 'Human preference' }, detail: { tr: 'Bir insan hangisinin daha iyi olduğunu değerlendirir; bir ödül modeli bu sinyali öğrenir.', en: 'A human rates which answer is better; a reward model learns this signal.' } },
    { id: 5, icon: '🎯', label: { tr: 'RLHF ile ince ayar', en: 'RLHF fine-tune' }, detail: { tr: 'Base model, ödül modelinin yüksek puan verdiği cevaplara doğru, ölçekte itilir.', en: 'The base model is nudged, at scale, toward answers the reward model scores highly.' } },
  ],
}

const alignmentPipelineOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-alignment-pipeline-order-01',
  question: { tr: 'Pretrained bir base model\'in yardımcı bir asistana dönüşüm sırasını diz.', en: 'Arrange the sequence turning a pretrained base model into a helpful assistant.' },
  items: [
    { id: '1', text: { tr: 'Pretrained base model ile başla (ham tahminci)', en: 'Start with the pretrained base model (raw predictor)' }, order: 1 },
    { id: '2', text: { tr: 'SFT: özenle seçilmiş örnek diyaloglarla eğit', en: 'SFT: train on curated example conversations' }, order: 2 },
    { id: '3', text: { tr: 'Aynı prompt için iki aday cevap üret', en: 'Generate two candidate answers for the same prompt' }, order: 3 },
    { id: '4', text: { tr: 'İnsan hangisinin daha iyi olduğunu değerlendirir', en: 'A human rates which one is better' }, order: 4 },
    { id: '5', text: { tr: 'RLHF: modeli ödül modelinin puanına göre ince ayar yap', en: 'RLHF: fine-tune the model according to the reward model\'s score' }, order: 5 },
  ],
  xpReward: 10,
}

const alignmentDiagnosisPlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-alignment-diagnosis-practice',
  id: 'llm-alignment-diagnosis-practice',
  label: { tr: 'Pratik: Bir model davranışını doğru eğitim aşamasına bağla', en: 'Practice: Attribute a model behavior to the correct training stage' },
  language: 'text',
  task: {
    tr: 'Amaç: gözlemlenen bir model davranışını ("model asla \'emin değilim\' demiyor") doğru aşamaya (pretraining/SFT/RLHF) bağlamak ve buna karşı QA alışkanlığını yazmak.',
    en: 'Goal: attribute an observed model behavior ("the model never says \'I\'m not sure\'") to the correct stage (pretraining/SFT/RLHF) and write the QA counter-habit for it.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: hangi aşama sorumlu, ve QA karşı alışkanlığı ne.',
    en: 'Fill in the TODO lines: which stage is responsible, and what the QA counter-habit is.',
  },
  code: {
    tr: `Davranış: Model asla "emin değilim" demiyor, hep kendinden emin cevap veriyor.
TODO (hangi aşama sorumlu ve neden)
TODO (QA karşı alışkanlığı)`,
    en: `Behavior: The model never says "I'm not sure", it always answers confidently.
TODO (which stage is responsible and why)
TODO (QA counter-habit)`,
  },
  starterCode: {
    tr: `Davranış: Model asla "emin değilim" demiyor, hep kendinden emin cevap veriyor.
TODO (hangi aşama sorumlu ve neden)
TODO (QA karşı alışkanlığı)`,
    en: `Behavior: The model never says "I'm not sure", it always answers confidently.
TODO (which stage is responsible and why)
TODO (QA counter-habit)`,
  },
  solutionCode: {
    tr: `Davranış: Model asla "emin değilim" demiyor, hep kendinden emin cevap veriyor.
Aşama: RLHF — insan değerlendiriciler kör karşılaştırmalarda genelde kendinden emin bir cevabı çekingen bir "bilmiyorum"dan daha "iyi" puanlamış olabilir, model bu tercihi öğrendi.
QA karşı alışkanlığı: Çıktıyı asla kendinden emin tonuna göre değil, dış bir kaynağa (dokümantasyon, çalıştırma, kabul kriterleri) karşı doğrula.`,
    en: `Behavior: The model never says "I'm not sure", it always answers confidently.
Stage: RLHF — human raters in blind comparisons may have rated a confident answer as "better" than a hedged "I don't know", and the model learned that preference.
QA counter-habit: Never verify output by its confident tone — verify against an external source (docs, a run, the acceptance criteria).`,
  },
  expected: {
    tr: `Teşhis, davranışı "modelin kişiliği" yerine RLHF'in ödüllendirdiği somut bir tercihe bağlıyor — bu da halüsinasyonun neden bir arıza değil, kısmen optimize edilmiş bir yan etki olduğunu açıklıyor.`,
    en: `The diagnosis ties the behavior to a concrete preference RLHF rewarded, rather than "the model's personality" — explaining why hallucination is not a malfunction but partly an optimized side effect.`,
  },
  hints: [
    { tr: 'Pretraining sadece sıradaki-token tahminini öğretir — "kendinden emin ton" pretraining\'in değil, sonraki bir aşamanın ürünüdür.', en: 'Pretraining only teaches next-token prediction — "confident tone" is a product of a later stage, not pretraining.' },
    { tr: 'RLHF, insan tercihlerinden öğrenir — insanların ne tercih ettiği (kendinden emin ton) modelin davranışına sızar.', en: 'RLHF learns from human preferences — what humans prefer (confident tone) leaks into the model\'s behavior.' },
    { tr: 'QA karşı alışkanlığı her zaman aynıdır: tona değil, dış kaynağa güven.', en: 'The QA counter-habit is always the same: trust the external source, not the tone.' },
  ],
  xpReward: 15,
}

// ─── LC2 paylaşılan bloklar: Context Window & Halüsinasyon ───────────────────

const tokenLabBackCallout = {
  type: 'callout',
  icon: '🧪',
  content: {
    tr: 'Bunu daha önce kendi ellerinle denemiştin: LLM Nedir sekmesindeki Token Lab\'da turuncu, düşük olasılıklı bir token\'a tıklayıp akıcı-ama-yanlış bir cümle üretmiştin. Halüsinasyon, tam olarak o küçük ölçekli deneyin büyük ölçekli halidir — burada NEDEN olduğunu görüyorsun.',
    en: 'You already tried this with your own hands: in the What Is an LLM tab\'s Token Lab, you clicked an orange, low-probability token and produced a fluent-but-wrong sentence. Hallucination is exactly the large-scale version of that small experiment — here you see WHY it happens.',
  },
}

const contextDriftAnimation = {
  type: 'step-animation',
  id: 'llm-context-drift-step-01',
  title: { tr: 'Adım Adım: Bir Kural Uzun Bir Konuşmada Nasıl Kaybolur', en: 'Step by Step: How a Rule Falls Out of Reach in a Long Conversation' },
  steps: [
    { id: 1, icon: '📌', label: { tr: 'Erken talimat', en: 'Early instruction' }, detail: { tr: 'Konuşmanın başında bir kural açıkça belirtilir.', en: 'A rule is stated clearly, early in the conversation.' } },
    { id: 2, icon: '💬', label: { tr: 'Konuşma büyür', en: 'Conversation grows' }, detail: { tr: 'Token limitinin hâlâ altında, birçok ilgisiz konu değişimi yaşanır.', en: 'Many unrelated exchanges follow, still within the token limit.' } },
    { id: 3, icon: '🌫️', label: { tr: 'Dikkat seyrelir', en: 'Attention dilutes' }, detail: { tr: 'Erken kural teknik olarak hâlâ orada ama o zamandan beri söylenen her şeyle yarışıyor.', en: 'The early rule is technically present but competes with everything said since.' } },
    { id: 4, icon: '↩️', label: { tr: 'Model kayar', en: 'Model drifts' }, detail: { tr: 'Sonraki bir cevap, orijinal kuralı sessizce takip etmemeye başlar.', en: 'A later answer quietly stops following the original rule.' } },
    { id: 5, icon: '🔄', label: { tr: 'Düzeltme: taze bağlam', en: 'Fix: fresh context' }, detail: { tr: 'Yeni bir konuşma başlatıp temel kuralı yeniden yapıştırmak uyumu geri getirir.', en: 'Starting a new conversation and re-stating the essential rule restores compliance.' } },
  ],
}

const contextDriftOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-context-drift-order-01',
  question: { tr: 'Bir kuralın uzun bir konuşmada odaktan düşme sürecini doğru sıraya diz.', en: 'Arrange the process of a rule falling out of focus in a long conversation in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Konuşmanın başında bir kural açıkça belirtilir', en: 'A rule is stated clearly early in the conversation' }, order: 1 },
    { id: '2', text: { tr: 'Token limitinin altında birçok ilgisiz konu değişimi olur', en: 'Many unrelated exchanges happen, still under the token limit' }, order: 2 },
    { id: '3', text: { tr: 'Erken kural o zamandan beri söylenenlerle yarışmaya başlar', en: 'The early rule starts competing with everything said since' }, order: 3 },
    { id: '4', text: { tr: 'Bir sonraki cevap orijinal kuralı sessizce takip etmez', en: 'A later answer quietly stops following the original rule' }, order: 4 },
    { id: '5', text: { tr: 'Yeni konuşma + kuralın yeniden yapıştırılması uyumu geri getirir', en: 'A new conversation + re-pasting the rule restores compliance' }, order: 5 },
  ],
  xpReward: 10,
}

const contextResetPlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-context-reset-practice',
  id: 'llm-context-reset-practice',
  label: { tr: 'Pratik: "Aynı thread\'de hatırlat" alışkanlığını "taze bağlam" alışkanlığına dönüştür', en: 'Practice: Turn the "remind in the same thread" habit into the "fresh context" habit' },
  language: 'text',
  task: {
    tr: 'Amaç: 40 mesajlık eski bir thread\'de "kuralı unuttun, tekrar hatırlat" demek yerine, yeni bir konuşma başlatıp sadece gerekli bağlamı yeniden yapıştıran bir yaklaşım yazmak.',
    en: 'Goal: instead of saying "you forgot the rule, remember it" in an old 40-message thread, write the approach of starting a fresh conversation and re-pasting only the necessary context.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: neden aynı thread\'de ısrar etmek yanlış, ve doğru yaklaşım ne.',
    en: 'Fill in the TODO lines: why insisting on the same thread is wrong, and what the correct approach is.',
  },
  code: {
    tr: `(40 mesajlık eski thread'de)
TODO (yanlış yaklaşım: neden aynı thread'de ısrar etmek işe yaramaz)
TODO (doğru yaklaşım: taze konuşma + yeniden yapıştırılan bağlam)`,
    en: `(in an old 40-message thread)
TODO (wrong approach: why insisting on the same thread doesn't work)
TODO (correct approach: fresh conversation + re-pasted context)`,
  },
  starterCode: {
    tr: `(40 mesajlık eski thread'de)
TODO (yanlış yaklaşım: neden aynı thread'de ısrar etmek işe yaramaz)
TODO (doğru yaklaşım: taze konuşma + yeniden yapıştırılan bağlam)`,
    en: `(in an old 40-message thread)
TODO (wrong approach: why insisting on the same thread doesn't work)
TODO (correct approach: fresh conversation + re-pasted context)`,
  },
  solutionCode: {
    tr: `Yanlış yaklaşım: Aynı 40 mesajlık thread'de "kuralı unuttun, tekrar hatırlat" demek — sorunun kaynağı (thread'in uzunluğu, dikkat seyrelmesi) hâlâ orada durur, daha güçlü bir hatırlatma bunu düzeltmez.
Doğru yaklaşım: Yeni bir konuşma başlat. "Ödeme özelliği kabul kriterleri: [...onaylanmış kurallar buraya...]" gibi sadece ESAS bağlamı yeniden yapıştır — thread'in tamamını değil.`,
    en: `Wrong approach: Saying "you forgot the rule, remember it" in the same 40-message thread — the source of the problem (thread length, attention dilution) is still there; a stronger reminder does not fix it.
Correct approach: Start a new conversation. Re-paste only the ESSENTIAL context, e.g. "Payment feature acceptance criteria: [...confirmed rules here...]" — not the entire old thread.`,
  },
  expected: {
    tr: `Çözüm, eski thread içinde savaşmak yerine dikkat-seyrelme sorununu TAMAMEN ortadan kaldırıyor — bu, sorunu düzeltmek ile sorunu kaçınmak arasındaki farktır.`,
    en: `The fix removes the attention-dilution problem ENTIRELY instead of fighting it inside the old thread — this is the difference between fixing a problem and avoiding it.`,
  },
  hints: [
    { tr: 'Eski thread\'in uzunluğu sorunun ta kendisidir — içinde daha güçlü bir hatırlatma bunu düzeltmez.', en: 'The old thread\'s length is the problem itself — a stronger reminder inside it doesn\'t fix that.' },
    { tr: 'Sadece ESAS bağlamı yeniden yapıştırmak, aynı seyrelme sorununu hemen yeniden yaratmaktan kaçınır.', en: 'Re-pasting only the ESSENTIAL context avoids immediately recreating the same dilution problem.' },
    { tr: 'Bu teknik, /claude-ai Riskler sekmesindeki "uzun konuşmada bağlam kaybı" hatasının doğrudan düzeltmesidir.', en: 'This technique is the direct fix for the "context loss in a long conversation" risk from the /claude-ai Risks tab.' },
  ],
  xpReward: 15,
}

// ─── LC3 paylaşılan bloklar: Agent Nedir ─────────────────────────────────────

const claudeAiAgentCrossCallout = {
  type: 'callout',
  icon: '🤖',
  content: {
    tr: 'Bu döngünün iki ticari örneğini zaten gördün: Claude AI sayfasındaki Claude Code (başarısız testi algıla → çalıştırmaya karar ver → çalıştır → gerçek hatayı gözle → tekrarla) ve MCP (görevi algıla → araç çağrısına karar ver → MCP server üzerinden çalıştır → gerçek sonucu gözle → tekrarla). Bu sekme, o iki ürünün uyguladığı genel mekanizmayı isimlendiriyor.',
    en: 'You have already seen two commercial examples of exactly this loop: Claude Code on the Claude AI page (perceive a failing test → decide to run it → act by executing → observe the real error → repeat) and MCP (perceive a task → decide a tool call is needed → act via the MCP server → observe the real result → repeat). This tab names the general mechanism those two products implement.',
  },
}

const agentLoopAnimation = {
  type: 'step-animation',
  id: 'llm-agent-loop-step-01',
  title: { tr: 'Adım Adım: Çalışırken Agent Döngüsü', en: 'Step by Step: The Agent Loop in Action' },
  steps: [
    { id: 1, icon: '👁️', label: { tr: 'Algıla', en: 'Perceive' }, detail: { tr: 'Agent mevcut durumu okur — başarısız bir test dosyası, bir kullanıcı isteği.', en: 'The agent reads the current state — a failing test file, a user request.' } },
    { id: 2, icon: '🧠', label: { tr: 'Düşün', en: 'Think' }, detail: { tr: 'LLM, o duruma dayanarak sıradaki eylemin ne olması gerektiğine karar verir.', en: 'The LLM decides the next action based on that state.' } },
    { id: 3, icon: '⚡', label: { tr: 'Eyle', en: 'Act' }, detail: { tr: 'Bir araç veya fonksiyon gerçekten çağrılır ve GERÇEKTEN çalışır.', en: 'A tool or function is actually called and executes for real.' } },
    { id: 4, icon: '📡', label: { tr: 'Gözle', en: 'Observe' }, detail: { tr: 'O eylemin gerçek sonucu geri okunur.', en: 'The real result of that action is read back.' } },
    { id: 5, icon: '🔁', label: { tr: 'Tekrarla veya bitir', en: 'Repeat or finish' }, detail: { tr: 'Döngü güncellenmiş durumla algılamaya döner, veya görev bittiyse durur.', en: 'The loop returns to perceive with updated state, or stops if the task is done.' } },
  ],
}

const agentLoopOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-agent-loop-order-01',
  question: { tr: 'Bir agent\'ın algıla-düşün-eyle-gözle döngüsünü doğru sıraya diz.', en: 'Arrange an agent\'s perceive-think-act-observe loop in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Mevcut durumu algıla (dosya, test sonucu, istek)', en: 'Perceive the current state (a file, a test result, a request)' }, order: 1 },
    { id: '2', text: { tr: 'LLM sıradaki eylemi düşünüp karar versin', en: 'Let the LLM think and decide the next action' }, order: 2 },
    { id: '3', text: { tr: 'Bir aracı gerçekten çağırıp çalıştır', en: 'Actually call and execute a tool' }, order: 3 },
    { id: '4', text: { tr: 'Eylemin gerçek sonucunu gözle', en: 'Observe the real result of the action' }, order: 4 },
    { id: '5', text: { tr: 'Görev bitene kadar güncellenmiş durumla tekrarla', en: 'Repeat with the updated state until the task is done' }, order: 5 },
  ],
  xpReward: 10,
}

const agentVsChatbotPlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-agent-vs-chatbot-diagnosis-practice',
  id: 'llm-agent-vs-chatbot-diagnosis-practice',
  label: { tr: 'Pratik: "AI agent" pazarlama iddiasını mekanik bir teşhise dönüştür', en: 'Practice: Turn an "AI agent" marketing claim into a mechanistic diagnosis' },
  language: 'text',
  task: {
    tr: 'Amaç: "Bu araç \'AI agent\' diye satılıyor, agent mı değil mi bilmiyorum" gibi belirsiz bir soruyu; döngü/araç-erişimi kriterine dayanan mekanik bir teşhise dönüştürmek.',
    en: 'Goal: turn a vague question like "This tool is marketed as an \'AI agent\', I don\'t know if it actually is one" into a mechanistic diagnosis based on the loop/tool-access criterion.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: aracın gerçekte ne yaptığının gözlemi, ve kriter + sonuç.',
    en: 'Fill in the TODO lines: the observation of what the tool actually does, and the criterion + verdict.',
  },
  code: {
    tr: `TODO (araç gerçekte ne yapıyor: dosya okuyor mu, komut çalıştırıyor mu?)
Bu araç "AI agent" diye satılıyor, agent mı değil mi bilmiyorum.
TODO (kriter + sonuç)`,
    en: `TODO (what the tool actually does: does it read files, run commands?)
This tool is marketed as an "AI agent", I don't know if it actually is one.
TODO (criterion + verdict)`,
  },
  starterCode: {
    tr: `TODO (araç gerçekte ne yapıyor: dosya okuyor mu, komut çalıştırıyor mu?)
Bu araç "AI agent" diye satılıyor, agent mı değil mi bilmiyorum.
TODO (kriter + sonuç)`,
    en: `TODO (what the tool actually does: does it read files, run commands?)
This tool is marketed as an "AI agent", I don't know if it actually is one.
TODO (criterion + verdict)`,
  },
  solutionCode: {
    tr: `Gözlem: Araç sadece bir metin kutusuna soru yazıp cevap alıyor; hiçbir dosya okumuyor, hiçbir komut çalıştırmıyor.
Kriter: Gerçek bir araç çağrısı + gözlemlenen gerçek bir sonuç + bunu tekrarlayan bir döngü var mı?
Sonuç: Yok — bu mimari olarak bir chatbot'tur. "Agent" burada bir pazarlama etiketidir, bir mekanizma değil.`,
    en: `Observation: The tool only sends a question to a text box and displays the answer; it reads no files and runs no commands.
Criterion: Is there a real tool call + an observed real result + a loop that repeats this?
Verdict: No — this is architecturally a chatbot. "Agent" here is a marketing label, not a mechanism.`,
  },
  expected: {
    tr: `Teşhis artık "agent" kelimesinin kendisine değil, döngü + gerçek araç erişimi kriterine dayanıyor — bu, bir pazarlama iddiasını doğrulanabilir bir mimari sorusuna çeviren doğru zihinsel model.`,
    en: `The diagnosis now rests on the loop + real tool-access criterion, not on the word "agent" itself — this is the correct mental model for turning a marketing claim into a verifiable architecture question.`,
  },
  hints: [
    { tr: 'Bir ürünün "agent" diye adlandırılması, onun gerçekten bir döngüde araç çalıştırdığı anlamına gelmez.', en: 'A product being called an "agent" doesn\'t mean it actually executes tools in a loop.' },
    { tr: 'Kriter her zaman aynıdır: gerçek araç çağrısı + gerçek sonuç gözlemi + tekrarlayan döngü.', en: 'The criterion is always the same: real tool call + real result observation + a repeating loop.' },
    { tr: 'Sadece metin üreten bir sistem, ne kadar akıllı görünürse görünsün, bu tanıma göre bir chatbot\'tur.', en: 'A system that only produces text, no matter how intelligent it seems, is a chatbot by this definition.' },
  ],
  xpReward: 15,
}

// ─── LC3 paylaşılan bloklar: Function Calling ────────────────────────────────

const toolExecutionAnimation = {
  type: 'step-animation',
  id: 'llm-tool-execution-step-01',
  title: { tr: 'Adım Adım: Araç İsteğinden Gerçek Çalıştırmaya', en: 'Step by Step: From Tool Request to Real Execution' },
  steps: [
    { id: 1, icon: '📋', label: { tr: 'Aracı kaydet', en: 'Register' }, detail: { tr: 'Kodun, bir aracın adını, parametrelerini ve amacını modele tanımlar.', en: 'Your code describes a tool\'s name, parameters and purpose to the model.' } },
    { id: 2, icon: '🧠', label: { tr: 'Model karar verir', en: 'Model decides' }, detail: { tr: 'Bir görev verildiğinde, model bu aracın gerekli olduğuna karar verir.', en: 'Given a task, the model decides this tool is needed.' } },
    { id: 3, icon: '📝', label: { tr: 'Model istek üretir', en: 'Model requests' }, detail: { tr: 'Model, aracı ve argüman değerlerini adlandıran YAPILANDIRILMIŞ bir istek üretir — bu hâlâ sadece metindir.', en: 'The model outputs a structured request naming the tool + arguments — this is still just text.' } },
    { id: 4, icon: '⚙️', label: { tr: 'Kodun çalıştırır', en: 'Your code executes' }, detail: { tr: 'Kodun isteği okur ve gerçek fonksiyonu GERÇEKTEN çağırır.', en: 'Your code reads the request and actually calls the real function.' } },
    { id: 5, icon: '↩️', label: { tr: 'Sonuç geri akar', en: 'Result flows back' }, detail: { tr: 'Gerçek sonuç, modelin sıradaki gözlemi olur.', en: 'The real result becomes the model\'s next observation.' } },
  ],
}

const toolExecutionOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-tool-execution-order-01',
  question: { tr: 'Bir araç isteğinin gerçek çalıştırmaya giden akışını doğru sıraya diz.', en: 'Arrange the flow from a tool request to real execution in the correct order.' },
  items: [
    { id: '1', text: { tr: 'Kod, aracın adını ve parametrelerini modele tanımlar', en: 'Code describes the tool\'s name and parameters to the model' }, order: 1 },
    { id: '2', text: { tr: 'Model bu aracın gerekli olduğuna karar verir', en: 'The model decides this tool is needed' }, order: 2 },
    { id: '3', text: { tr: 'Model aracı ve argümanları adlandıran yapılandırılmış bir istek üretir', en: 'The model outputs a structured request naming the tool and arguments' }, order: 3 },
    { id: '4', text: { tr: 'Kod isteği okuyup gerçek fonksiyonu çağırır', en: 'Code reads the request and calls the real function' }, order: 4 },
    { id: '5', text: { tr: 'Gerçek sonuç modelin sıradaki gözlemi olarak geri akar', en: 'The real result flows back as the model\'s next observation' }, order: 5 },
  ],
  xpReward: 10,
}

const functionCallGatePlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-function-calling-gate-practice',
  id: 'llm-function-calling-gate-practice',
  label: { tr: 'Pratik: Korumasız bir araç çalıştırmasını doğrulamalı hale getir', en: 'Practice: Turn an unguarded tool execution into a validated one' },
  language: 'python',
  task: {
    tr: 'Amaç: modelin istediği HERHANGİ bir aracı sorgusuzca çalıştıran kodu; sadece kayıtlı/izin verilen araçları çalıştıran bir koda dönüştürmek.',
    en: 'Goal: turn code that blindly executes WHATEVER tool the model requested into code that only executes registered/allowed tools.',
  },
  explanation: {
    tr: 'TODO satırını, kayıtlı araçlar listesine karşı doğrulama yapan kodla değiştir.',
    en: 'Replace the TODO line with code that validates against the list of registered tools.',
  },
  code: {
    tr: `istek = model.arac_cagrisi_iste(durum)
TODO (doğrulama olmadan doğrudan çalıştır)`,
    en: `request = model.request_tool_call(state)
TODO (execute directly, no validation)`,
  },
  starterCode: {
    tr: `istek = model.arac_cagrisi_iste(durum)
TODO (doğrulama olmadan doğrudan çalıştır)`,
    en: `request = model.request_tool_call(state)
TODO (execute directly, no validation)`,
  },
  solutionCode: {
    tr: `istek = model.arac_cagrisi_iste(durum)
if istek.arac_adi not in KAYITLI_ARACLAR:
    hata_dondur(f"Bilinmeyen arac: {istek.arac_adi}")
else:
    sonuc = KAYITLI_ARACLAR[istek.arac_adi].calistir(istek.parametreler)`,
    en: `request = model.request_tool_call(state)
if request.tool_name not in REGISTERED_TOOLS:
    return_error(f"Unknown tool: {request.tool_name}")
else:
    result = REGISTERED_TOOLS[request.tool_name].execute(request.parameters)`,
  },
  expected: {
    tr: `Modelin isteği artık kör güvenle çalıştırılmıyor — kayıtlı araçlar listesine karşı doğrulama, modelin hiç tanımlanmamış bir aracı "uydurmasını" (halüsinasyon) zararsız hale getirir. Bu, /claude-ai'deki izin modu disiplininin kod seviyesindeki karşılığıdır.`,
    en: `The model's request is no longer executed with blind trust — validating against the registered tools list makes it harmless if the model "invents" (hallucinates) a tool that was never defined. This is the code-level counterpart of the permission-mode discipline from the Claude AI page.`,
  },
  hints: [
    { tr: 'Model\'in "şu aracı çağır" demesi, o aracın var olduğu veya çalıştırılmasının güvenli olduğu anlamına gelmez.', en: 'The model saying "call this tool" doesn\'t mean the tool exists or is safe to run.' },
    { tr: 'Kayıtlı araçlar listesine karşı kontrol etmek, modelin hiç tanımlanmamış bir aracı uydurmasını zararsız hale getirir.', en: 'Checking against the registered tools list makes it harmless if the model invents a tool that was never defined.' },
    { tr: 'Bu tam olarak Claude AI sayfasındaki izin modu disiplininin kod seviyesindeki karşılığıdır.', en: 'This is exactly the code-level counterpart of the permission-mode discipline from the Claude AI page.' },
  ],
  xpReward: 15,
}

// ─── LC3 paylaşılan bloklar: OpenAI API ──────────────────────────────────────

const apiKeyCrossCallout = {
  type: 'callout',
  icon: '🔑',
  content: {
    tr: 'Bu disiplini Claude AI sayfasının Erişim & Kurulum sekmesinde zaten öğrendin: bir API key\'i asla koda gömme, her zaman bir ortam değişkeninden oku. Kural burada da birebir aynıdır, sadece sağlayıcı farklı.',
    en: 'You already learned this exact discipline on the Claude AI page\'s Access & Setup tab: never hardcode an API key, always read it from an environment variable. The rule is identical here, just a different provider.',
  },
}

const apiCallStepAnimation = {
  type: 'step-animation',
  id: 'llm-api-call-step-01',
  title: { tr: 'Adım Adım: pip install\'dan Yazdırılan Cevaba', en: 'Step by Step: From pip install to a Printed Response' },
  steps: [
    { id: 1, icon: '📦', label: { tr: 'Kur', en: 'Install' }, detail: { tr: 'pip install openai — resmi istemci kütüphanesi.', en: 'pip install openai — the official client library.' } },
    { id: 2, icon: '🔑', label: { tr: 'Kimlik doğrula', en: 'Authenticate' }, detail: { tr: 'İstemci, API key\'i bir ortam değişkeninden okur — asla kaynak koddan değil.', en: 'The client reads the API key from an environment variable, never from source code.' } },
    { id: 3, icon: '📝', label: { tr: 'Mesaj listesini kur', en: 'Build the messages list' }, detail: { tr: 'system rolü kalıcı davranışı belirler, user rolü isteği belirtir.', en: 'The system role sets persona, the user role states the request.' } },
    { id: 4, icon: '📤', label: { tr: 'İsteği gönder', en: 'Send the request' }, detail: { tr: 'Tek bir HTTP çağrısı, mesaj listesinin TAMAMINI API\'ye taşır.', en: 'One HTTP call carries the entire messages list to the API.' } },
    { id: 5, icon: '📥', label: { tr: 'Cevabı oku', en: 'Read the response' }, detail: { tr: 'Modelin cevabı öngörülebilir, ayrıştırılabilir bir şekilde gelir.', en: 'The model\'s reply arrives in a predictable, parseable shape.' } },
  ],
}

const apiCallOrder = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'ch-llm-api-call-order-01',
  question: { tr: 'İlk OpenAI API çağrısına giden adımları doğru sıraya diz.', en: 'Arrange the steps to your first OpenAI API call in the correct order.' },
  items: [
    { id: '1', text: { tr: 'pip install openai ile istemci kütüphanesini kur', en: 'Install the client library with pip install openai' }, order: 1 },
    { id: '2', text: { tr: 'API key\'in bir ortam değişkeninde olduğunu doğrula', en: 'Make sure the API key is in an environment variable' }, order: 2 },
    { id: '3', text: { tr: 'system + user rolleriyle mesaj listesini kur', en: 'Build the messages list with system + user roles' }, order: 3 },
    { id: '4', text: { tr: 'chat.completions.create() ile isteği gönder', en: 'Send the request with chat.completions.create()' }, order: 4 },
    { id: '5', text: { tr: 'Cevabı response.choices[0].message.content\'tan oku', en: 'Read the response from response.choices[0].message.content' }, order: 5 },
  ],
  xpReward: 10,
}

const openaiFirstCallPlayground = {
  type: 'code-playground',
  relatedTopicId: 'llm-openai-first-call-practice',
  id: 'llm-openai-first-call-practice',
  label: { tr: 'Pratik: Güvensiz bir API çağrısını düzelt', en: 'Practice: Fix an unsafe API call' },
  language: 'python',
  task: {
    tr: 'Amaç: API key\'i koda gömen ve tek bir rolsüz user mesajı gönderen bir kod parçasını; ortam değişkeni kullanan ve system+user rolleriyle kurulmuş bir koda dönüştürmek.',
    en: 'Goal: turn code that hardcodes the API key and sends a single unstructured user message into code that uses an environment variable and a proper system+user messages list.',
  },
  explanation: {
    tr: 'TODO satırlarını doldur: API key güvenliği ve mesaj listesi yapısı.',
    en: 'Fill in the TODO lines: API key security and messages list structure.',
  },
  code: {
    tr: `from openai import OpenAI
istemci = OpenAI(api_key="sk-abc123...")  # TODO: bunu düzelt
yanit = istemci.chat.completions.create(
    model="<guncel-model-adi>",
    messages=[{"role": "user", "content": "test yaz"}]  # TODO: rol yapısını iyileştir
)`,
    en: `from openai import OpenAI
client = OpenAI(api_key="sk-abc123...")  # TODO: fix this
response = client.chat.completions.create(
    model="<current-model-name>",
    messages=[{"role": "user", "content": "write tests"}]  # TODO: improve the role structure
)`,
  },
  starterCode: {
    tr: `from openai import OpenAI
istemci = OpenAI(api_key="sk-abc123...")  # TODO: bunu düzelt
yanit = istemci.chat.completions.create(
    model="<guncel-model-adi>",
    messages=[{"role": "user", "content": "test yaz"}]  # TODO: rol yapısını iyileştir
)`,
    en: `from openai import OpenAI
client = OpenAI(api_key="sk-abc123...")  # TODO: fix this
response = client.chat.completions.create(
    model="<current-model-name>",
    messages=[{"role": "user", "content": "write tests"}]  # TODO: improve the role structure
)`,
  },
  solutionCode: {
    tr: `from openai import OpenAI
istemci = OpenAI()  # API key ortam değişkeninden (OPENAI_API_KEY) otomatik okunur
yanit = istemci.chat.completions.create(
    model="<guncel-model-adi>",  # Güncel model adını resmi OpenAI docs'undan al
    messages=[
        {"role": "system", "content": "Sen kıdemli bir QA mühendisisin."},
        {"role": "user", "content": "Login özelliği için 3 sınır değer test case'i yaz."},
    ]
)`,
    en: `from openai import OpenAI
client = OpenAI()  # API key is read automatically from the OPENAI_API_KEY environment variable
response = client.chat.completions.create(
    model="<current-model-name>",  # Get the current model name from the official OpenAI docs
    messages=[
        {"role": "system", "content": "You are a senior QA engineer."},
        {"role": "user", "content": "Write 3 boundary-value test cases for the login feature."},
    ]
)`,
  },
  expected: {
    tr: `İki düzeltme de adlandırılıyor: key kaynak koddan kaldırıldı (Claude AI Erişim sekmesindeki aynı disiplin), ve system rolü eklendi — Prompt Mühendisliği sekmesindeki "rol" bileşeninin API karşılığı, tek başına bir user mesajına güvenmek yerine kalıcı davranışı belirliyor.`,
    en: `Both fixes are explicit: the key is removed from source code (the same discipline from the Claude AI Access tab), and a system role is added — the API counterpart of the "role" ingredient from the Prompt Engineering tab, setting persistent behavior instead of relying on a bare user message alone.`,
  },
  hints: [
    { tr: 'API key\'i doğrudan kodda yazmak, Claude AI Erişim & Kurulum sekmesinde öğrendiğin aynı güvenlik hatasıdır.', en: 'Hardcoding the API key is the same security mistake covered in the Claude AI Access & Setup tab.' },
    { tr: 'system rolü, Prompt Mühendisliği sekmesindeki "rol" bileşeninin API karşılığıdır — kalıcı davranışı belirler.', en: 'The system role is the API counterpart of the "role" ingredient from the Prompt Engineering tab — it sets persistent behavior.' },
    { tr: 'Bağlam ve kısıt olmadan tek bir user mesajı, jenerik bir cevap alma riskini taşır — aynı 4 bileşen kuralı burada da geçerli.', en: 'A bare user message without context or constraint risks a generic answer — the same 4-ingredient rule applies here too.' },
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
    tabs: ['🎯 Intro: The AI, ML & LLM Map', '🧱 What Is an LLM: Tokens & Prediction', '🎓 How LLMs Are Trained: Pretraining', '🎯 Fine-tuning & RLHF', '🧠 Context Window & the Root of Hallucination', '🤖 What Is an Agent: LLM + Tools + Loop', `🔧 Function Calling: The Agent's Hands`, `🐍 OpenAI API: A Tester's First Call`],
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
      {
        title: `🎓 How LLMs Are Trained: Pretraining`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: `Pretraining a model is like a photography student who studies millions of photographs without ever being told explicitly "this composition is good, this one is bad" — the mechanism is exact: instead the student is given ONE recurring drill, "given the first 90% of a photo, guess what the missing corner looks like," and doing that billions of times across millions of photos forces the student to internalize composition, lighting and subject matter without anyone hand-labeling "composition" as a concept. Here is the question worth sitting with: if nobody explicitly taught the model grammar or Python syntax, how does it end up knowing both? Because predicting the next token accurately, at internet scale, is only possible if you have implicitly absorbed the regularities underneath — grammar, syntax, factual patterns — the prediction objective forces the competence in as a side effect, never as an explicit lesson. Java comparison: this is like a compiled .class file — it carries the DISTILLED behavior of the source, not the source itself; pretrained model "weights" are the compiled artifact of billions of next-token predictions, and you can no more read the original training text back out of the weights than you can recover Java source from bytecode. The QA stake: since the model's "knowledge" is frozen at the moment its training data was collected (the training cutoff), it will confidently use syntax that was correct then but deprecated now — this is the mechanical root of the "outdated library syntax" risk covered on the Claude AI page; knowing WHY it happens (frozen weights, not carelessness) is what leads a tester to always state their exact library version in a prompt.`,
          },
          { type: 'heading', text: `The One Drill: Predict the Missing Piece` },
          {
            type: 'text',
            content: `Pretraining feeds a model enormous slices of internet text — books, code, forums, documentation — and repeats one exercise: hide the next token, ask the model to guess it, measure how wrong the guess was (this gap is called "loss"), and nudge the model's billions of internal weights very slightly toward a better guess. Repeat this drill trillions of times.`,
          },
          {
            type: 'text',
            content: `Reasoning: why does this require GPUs, months, and enormous cost, when the "exercise" sounds so simple? Because "very slightly nudge billions of weights" must happen after EVERY single prediction, across trillions of predictions, and each nudge requires enormous matrix computation. Java comparison: it is like recompiling a massive shared codebase after every single line changes, except the "codebase" has billions of parameters and this happens trillions of times — the sheer volume of repeated computation, not conceptual difficulty, is what demands specialized hardware running for months.`,
          },
          {
            type: 'table',
            headers: ['Term', 'Plain Meaning', 'Java Analogy'],
            rows: [
              ['Pretraining', 'Learning next-token prediction from massive raw text', 'Compiling from a huge shared codebase — happens once, is expensive, is not repeated per feature'],
              ['Loss', 'How wrong the model\'s guess was, measured and used to improve', 'Similar to a failing test driving a fix — but here the "fix" is an automatic, tiny weight adjustment'],
              ['Weights', 'Billions of numbers encoding learned patterns', 'The compiled .class/.jar output — carries distilled behavior, not the original source'],
              ['Training cutoff', 'The date after which the model has seen no new text', 'A dependency version frozen at build time — the app doesn\'t know about releases after that date'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# Pretraining döngüsünün basitleştirilmiş özeti (gerçek kod değil, kavramsal)
for metin_parcasi in devasa_internet_metni:
    baglam, gercek_sonraki_token = metin_parcasi.ayir()
    tahmin = model.tahmin_et(baglam)          # model bir sonraki token'ı tahmin eder
    hata = kayip_hesapla(tahmin, gercek_sonraki_token)  # "loss": tahmin ne kadar yanlış?
    model.agirliklari_hafifce_guncelle(hata)  # milyarlarca ağırlık ÇOK küçük adımlarla düzelir
# Bu döngü trilyonlarca kez tekrarlanır — aylar süren GPU hesaplaması budur`,
              en: `# Simplified summary of the pretraining loop (conceptual, not real code)
for text_chunk in massive_internet_text:
    context, real_next_token = text_chunk.split()
    prediction = model.predict(context)          # the model guesses the next token
    error = compute_loss(prediction, real_next_token)  # "loss": how wrong was the guess?
    model.nudge_weights_slightly(error)  # billions of weights shift by a tiny amount
# This loop repeats trillions of times — this is the months of GPU computation`,
            },
          },
          pretrainingLoopAnimation,
          pretrainingLoopOrder,
          trainingCutoffPlayground,
          {
            type: 'quiz',
            question: `A model confidently writes code using a method that was removed from a library two years ago. Given what pretraining actually does, what is the most accurate mechanistic explanation?`,
            options: [
              { id: 'a', text: 'The model is being lazy and not trying hard enough' },
              { id: 'b', text: 'The model\'s weights were frozen at its training cutoff; that method was common in the training data available then, and the model has no way to know about a later removal unless told' },
              { id: 'c', text: 'The model deliberately prefers old syntax because it is simpler' },
              { id: 'd', text: 'This proves LLMs cannot write code reliably at all' },
            ],
            correct: 'b',
            explanation: `Weights are a compiled artifact of the data seen up to the training cutoff — not a live connection to the internet. A method that was standard back then, later removed, has no way of being "known as removed" unless the fact is stated in the prompt.`,
            retryQuestion: {
              question: `Why does "just retrain the model on newer data every day" not solve the training-cutoff problem for most teams?`,
              options: [
                { id: 'a', text: 'It would work, but nobody has thought of doing this yet' },
                { id: 'b', text: 'Pretraining requires enormous compute, time and cost (months, specialized hardware) — it is not something a team can casually redo daily; this is exactly why prompting with current context (stating your version, or RAG) is the practical fix, not retraining' },
                { id: 'c', text: 'Training data cannot be updated once collected' },
                { id: 'd', text: 'Models are not allowed to be retrained more than once' },
              ],
              correct: 'b',
              explanation: `Pretraining's cost is precisely why it happens rarely and at a small number of organizations — daily retraining is not a scaling problem to be solved, it is economically and practically off the table. The scalable fix lives at the prompt/context layer, not at the retraining layer.`,
            },
          },
        ],
      },
      {
        title: `🎯 Fine-tuning & RLHF`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎓',
            content: `A pretrained base model fresh out of pretraining is like a brilliant new hire who has read every book in the company library but has never once been shown what a GOOD answer to a customer actually looks like — the mechanism is exact: pretraining only teaches "predict plausible next text," not "be a helpful, on-topic assistant that admits uncertainty" — those are entirely separate skills taught AFTER pretraining, through fine-tuning. Here is the question worth sitting with: if the base model already knows grammar, facts and code from pretraining, why does it need MORE training just to become a chatbot? Because a raw pretrained model, given "How do I center a div in CSS?", is just as likely to continue with "...is a common question on Stack Overflow, asked 47,000 times" (a plausible CONTINUATION) as it is to actually answer the question — pretraining never taught it "the user wants a direct helpful answer," only "predict likely next text." Java comparison: this is like the difference between a compiler that only checks syntax validity (pretraining: is this a plausible sentence?) and a code reviewer who checks whether the code actually serves the ticket's intent (fine-tuning: is this actually a HELPFUL response to what the user wanted?) — two different, sequential quality gates. The QA stake: RLHF specifically trains the model to prefer confident, complete-sounding answers, since human raters in blind comparisons tend to rate a hedgy "I don't know" as less helpful than a confident wrong answer — this is the BEHAVIORAL root of hallucination covered on the Claude AI page: the model is not malfunctioning, it was optimized, in part, toward exactly the confident tone that makes an occasional wrong answer dangerous.`,
          },
          { type: 'heading', text: `SFT: Showing, Not Just Predicting` },
          {
            type: 'text',
            content: `Supervised Fine-Tuning (SFT) takes the pretrained base model and continues training it, but now on a much smaller, curated set of example conversations — a prompt and a genuinely good, human-written or human-approved response — teaching the model the FORMAT and TONE of being a helpful assistant, not new facts.`,
          },
          {
            type: 'text',
            content: `Reasoning: why is RLHF needed on top of SFT — why isn't "show good examples" enough? Because writing enough example responses to cover every possible way a user might ask something is combinatorially impossible. RLHF instead trains the model with a cheaper signal: humans just RANK two of the model's own candidate answers ("which is better?"), a reward model learns to predict that ranking, and the base model is nudged to produce answers the reward model scores highly — turning a small amount of human JUDGMENT into a scalable training signal, instead of needing infinite hand-written examples.`,
          },
          { type: 'heading', text: `Alignment, in One Paragraph` },
          {
            type: 'text',
            content: `"Alignment" is the umbrella term for this whole post-pretraining process (SFT + RLHF + other techniques) — the goal is making the model's behavior match human intent and values (helpful, harmless, honest), not just "predicts plausible text." It is an ongoing area of research, not a solved problem, which is exactly why the risks covered later on this page — and on the Claude AI page — still exist even in well-aligned, modern models.`,
          },
          {
            type: 'table',
            headers: ['Stage', 'What It Does', 'What It Does NOT Do'],
            rows: [
              ['Pretraining', 'Learns next-token prediction from raw internet-scale text', 'Does not teach the model to be helpful, follow instructions, or refuse harmful requests'],
              ['SFT (Supervised Fine-Tuning)', 'Trains on curated example conversations (prompt + good response)', 'Does not add new facts or knowledge the base model didn\'t have from pretraining'],
              ['RLHF', 'Trains a reward model on human preference rankings, then nudges the model toward high-reward answers', 'Does not eliminate hallucination — it can inadvertently reward confident-sounding wrong answers if raters preferred them'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# RLHF döngüsünün basitleştirilmiş özeti (kavramsal, gerçek kod değil)
for prompt in ornek_promptlar:
    cevap_a, cevap_b = model.iki_farkli_cevap_uret(prompt)
    tercih = insan_degerlendirici.hangisi_daha_iyi(cevap_a, cevap_b)
    odul_modeli.bu_tercihten_ogren(cevap_a, cevap_b, tercih)
# Ödül modeli eğitildikten sonra:
for prompt in cok_daha_genis_veri:
    cevap = model.cevap_uret(prompt)
    odul = odul_modeli.puanla(cevap)          # insan olmadan otomatik puan
    model.agirliklari_odule_gore_guncelle(odul)  # yüksek puanlı cevaplara doğru it`,
              en: `# Simplified summary of the RLHF loop (conceptual, not real code)
for prompt in example_prompts:
    answer_a, answer_b = model.generate_two_different_answers(prompt)
    preference = human_rater.which_is_better(answer_a, answer_b)
    reward_model.learn_from_this_preference(answer_a, answer_b, preference)
# Once the reward model is trained:
for prompt in much_larger_dataset:
    answer = model.generate_answer(prompt)
    reward = reward_model.score(answer)          # automatic score, no human needed
    model.update_weights_toward_reward(reward)   # nudge toward high-scoring answers`,
            },
          },
          alignmentPipelineAnimation,
          alignmentPipelineOrder,
          alignmentDiagnosisPlayground,
          {
            type: 'quiz',
            question: `Why can RLHF, despite improving helpfulness, inadvertently make hallucination WORSE in some cases?`,
            options: [
              { id: 'a', text: 'RLHF has nothing to do with hallucination — only pretraining does' },
              { id: 'b', text: 'If human raters in blind comparisons rated confident-sounding wrong answers as better than hedged uncertain ones, the reward model learns to favor confidence — nudging the model toward a more assertive tone regardless of whether the underlying fact is correct' },
              { id: 'c', text: 'RLHF adds new incorrect facts to the model\'s knowledge' },
              { id: 'd', text: 'RLHF always fixes every accuracy problem completely' },
            ],
            correct: 'b',
            explanation: `RLHF optimizes toward whatever humans preferred in the ranking data — if confidence was preferred over honest hedging, the model learns confidence as a rewarded trait, independent of whether the confident answer happens to be correct.`,
            retryQuestion: {
              question: `A pretrained base model (before any fine-tuning) is given a direct question. Why is it LESS likely to give a direct helpful answer than the final fine-tuned assistant?`,
              options: [
                { id: 'a', text: 'Base models are always broken and unusable' },
                { id: 'b', text: 'Pretraining only optimizes for "plausible next text" — continuing with a plausible-sounding tangent or restating the question is just as valid a completion as answering it; SFT/RLHF are the stages that specifically teach "answer directly and helpfully"' },
                { id: 'c', text: 'Base models refuse to answer questions on purpose' },
                { id: 'd', text: 'Base models have less knowledge than fine-tuned ones' },
              ],
              correct: 'b',
              explanation: `A base model has no notion of "the user wants a direct answer" — that expectation is entirely a product of SFT and RLHF. Without them, any plausible continuation of the prompt text is an equally valid completion in the model's eyes.`,
            },
          },
        ],
      },
      {
        title: `🧠 Context Window & the Root of Hallucination`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧽',
            content: `The context window is like a whiteboard that gets erased the moment a meeting ends — the mechanism is exact: everything the model "knows" about your specific conversation lives ONLY in the text currently inside that window, and the instant the conversation ends (or scrolls past the token limit), that information is gone as completely as marker wiped off a whiteboard, no matter how important it was. Here is the question worth sitting with: if the model was trained on trillions of tokens, why does it forget something you told it 5 minutes ago in the SAME conversation? Because "trained on" and "currently remembers" are two completely different kinds of memory: training baked general patterns into permanent weights, frozen and shared across every conversation; the context window is a SEPARATE, temporary, per-conversation memory that holds only what is currently pasted in. Java comparison: this is exactly the difference between a static final field (baked in at compile time, shared everywhere) and a method-local variable (exists only for the duration of one call, then garbage collected) — confusing the two is exactly the mistake behind expecting a model to "remember" something from training that was actually only ever in one conversation's context. The QA stake: this is the precise mechanism behind the "context loss in a long conversation" risk covered on the Claude AI page — as a conversation grows past the practical attention span for older content, earlier instructions effectively fall out of reach even though they are technically still in history, which is exactly why starting a fresh conversation for a new task (with the essential context re-pasted) is the fix, not "asking the model to try harder to remember".`,
          },
          { type: 'heading', text: `The Window Has a Size, Measured in Tokens` },
          {
            type: 'text',
            content: `Every model has a maximum context window, measured in tokens, not words or messages — the total budget for everything in a conversation: your instructions, pasted code, and the model's own replies so far all count against the same limit. Once a conversation exceeds it, the oldest content must be dropped or summarized, whether or not it mattered.`,
          },
          {
            type: 'text',
            content: `Reasoning: why does an LLM sometimes seem to "forget" something well within the token limit, not just when it is actually pushed out? Because attention across a long context is not uniform — content buried in the middle of a very long conversation, surrounded by many unrelated topic switches, effectively competes for the model's limited attention with everything said since, so a rule stated once early on can be technically present in the context yet functionally deprioritized. Java comparison: this is like a variable that is technically still in scope but that a reader skimming a very long method body easily misses — being "in scope" and being "actually noticed" are not the same guarantee.`,
          },
          { type: 'heading', text: `Hallucination's Real Root Cause` },
          {
            type: 'text',
            content: `A model has no dedicated "I don't know" mechanism — every single output, including a correct fact and a fabricated one, comes from the exact same process of picking the next most probable token. When the true, correct continuation and a plausible-but-wrong continuation both have meaningful probability — because the training data was ambiguous or sparse, or the context window has lost the disambiguating detail — the sampling process can pick the wrong one just as fluently as the right one. Hallucination is not a bug in a separate "lying module"; it is the SAME single mechanism producing an unlucky draw.`,
          },
          {
            type: 'table',
            headers: ['Cause', 'Mechanism', 'QA Counter-Habit'],
            rows: [
              ['Context window overflow', 'Oldest content is dropped or summarized once the token budget is exceeded', 'Start a fresh conversation for a new task instead of extending one indefinitely'],
              ['Attention dilution in long conversations', 'An early instruction is technically present but competes with everything said since', 'Re-state critical constraints periodically in long sessions — don\'t assume saying it once is enough'],
              ['No "I don\'t know" token', 'Every output, correct or wrong, comes from the same next-token sampling process', 'Verify against an external source (docs, a run, the acceptance criteria) — confidence in the text is never evidence'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# Context window'un basitleştirilmiş modeli (kavramsal, gerçek kod değil)
context = []
TOKEN_LIMITI = 128000

def mesaj_ekle(yeni_mesaj):
    context.append(yeni_mesaj)
    while token_say(context) > TOKEN_LIMITI:
        context.pop(0)  # en eski mesaj atılır — SİLİNİR, özetlenmezse tamamen kaybolur
    return context`,
              en: `# Simplified model of the context window (conceptual, not real code)
context = []
TOKEN_LIMIT = 128000

def add_message(new_message):
    context.append(new_message)
    while count_tokens(context) > TOKEN_LIMIT:
        context.pop(0)  # the oldest message is dropped — GONE, unless summarized first
    return context`,
            },
          },
          tokenLabBackCallout,
          contextDriftAnimation,
          contextDriftOrder,
          contextResetPlayground,
          {
            type: 'quiz',
            question: `A model gives a fluent, confident, but factually wrong answer. Based on the context-window and sampling mechanism covered in this tab, what is the most accurate explanation?`,
            options: [
              { id: 'a', text: 'The model has a separate "lying" module that activated' },
              { id: 'b', text: 'There is no dedicated "I don\'t know" output — every token, correct or wrong, comes from the same next-most-probable-token process; when the training data was ambiguous or the disambiguating context was lost, an unlucky-but-plausible draw is exactly as easy to produce as a correct one' },
              { id: 'c', text: 'The model ran out of context window entirely' },
              { id: 'd', text: 'This never happens in models trained on enough data' },
            ],
            correct: 'b',
            explanation: `Correctness and hallucination are produced by the identical token-sampling mechanism — there is no separate "truth check" step. This is precisely the large-scale version of the low-probability path exercised in the Token Lab.`,
            retryQuestion: {
              question: `In a very long conversation, Claude appears to have stopped following a formatting rule you set 40 messages ago, even though the token limit was never exceeded. What is the most accurate diagnosis?`,
              options: [
                { id: 'a', text: 'The rule was technically deleted from memory once the limit was approached' },
                { id: 'b', text: 'The rule is still technically present in the context, but competes with everything said since for the model\'s limited attention — this is attention dilution, not a hard deletion; starting a fresh conversation with the rule re-stated is the practical fix' },
                { id: 'c', text: 'The model intentionally decided to stop following the rule' },
                { id: 'd', text: 'This only happens with old, less capable models' },
              ],
              correct: 'b',
              explanation: `Attention dilution is a "functionally deprioritized" problem, not a hard-deletion problem — the token limit is a separate, harder cutoff. The fix (fresh context) works by removing the dilution problem entirely rather than fighting it within an ever-growing thread.`,
            },
          },
        ],
      },
      {
        title: `🤖 What Is an Agent: LLM + Tools + Loop`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔑',
            content: `A chatbot is a brilliant consultant sitting behind a glass wall in a room full of tools; an agent is that SAME consultant handed a key to walk through the glass and actually use the tools — the mechanism is exact: the consultant's expertise (the LLM) doesn't change between the two, what changes is whether anything connects their words to actual effects in the world. Here is the question worth sitting with: if the LLM inside a chatbot and the LLM inside an agent can be the exact same model, what makes one "just answer" and the other "get things done"? Because the agent architecture wraps that same model in a LOOP with access to tools: the model perceives the current state, decides on an action, a tool actually executes and returns a real result, and the model observes that real result before deciding the next action — a chatbot stops after one turn of "decide," an agent keeps looping through "perceive → decide → act → observe" until the task is done. Java comparison: this is the Strategy design pattern living inside a while loop — the LLM is a pluggable "decide what to do next" strategy object, called repeatedly inside a loop that also calls into real APIs/tools and feeds results back as the strategy's next input; swap the strategy (a different model) and the loop architecture doesn't change, exactly like swapping a Comparator without touching the sort algorithm around it. The QA stake: you already saw two commercial examples of exactly this loop on the Claude AI page — Claude Code and MCP — this tab names the general mechanism those two specific products implement.`,
          },
          { type: 'heading', text: `Chatbot vs Agent: Answering vs Acting` },
          {
            type: 'text',
            content: `A chatbot's job ends the moment it produces a text response — even a very good one. An agent's job is not producing text, it's accomplishing a task, and text (specifically, a request to call a tool) is just one of the things it can produce along the way. The dividing line is not intelligence, it's architecture: does anything wrap the model in a loop with real tool access?`,
          },
          {
            type: 'text',
            content: `Reasoning: why can't a plain chatbot "just decide" to run a command on its own? Because a chatbot has no execution environment connected to it — it can WRITE the text of a command, but nothing in a pure chat interface takes that text and actually runs it against a real file system or terminal. An agent framework is precisely the missing wiring that connects "the model wants to do X" to "X actually happens," plus feeds the real outcome back in.`,
          },
          { type: 'heading', text: `The Loop: Perceive → Think → Act → Observe` },
          {
            type: 'text',
            content: `Every agent, regardless of product, runs the same four-step loop: 1) perceive the current state (a file, a test result, a user request), 2) think — decide the next action based on that state, 3) act — call a tool or function, 4) observe the real result of that action, then loop back to perceive with the updated state. The loop ends when the model decides the task is complete, or a safety limit is hit (covered in the Risks tab later).`,
          },
          {
            type: 'table',
            headers: ['Concept', 'Chatbot', 'Agent'],
            rows: [
              ['What it produces', 'A text response, once, per turn', 'A sequence of decide→act→observe cycles until the task is done'],
              ['Connection to the real world', 'None — output is only ever text you read', 'Tool/function calls that actually execute and return real results'],
              ['When it stops', 'After one response', 'When the task is complete or a safety limit (max steps) is reached'],
              ['Example from the Claude AI page', 'A plain claude.ai conversation', 'Claude Code (file/test loop), MCP (tool-server loop)'],
            ],
          },
          {
            type: 'code',
            language: 'python',
            code: {
              tr: `# Agent döngüsünün basitleştirilmiş özeti (kavramsal, gerçek kod değil)
gorev_tamamlandi = False
durum = ilk_durumu_algila()

while not gorev_tamamlandi:
    eylem = model.karar_ver(durum)              # LLM: sıradaki adım ne olmalı?
    if eylem.tur == "gorev_tamamlandi":
        gorev_tamamlandi = True
    else:
        sonuc = arac_calistir(eylem.arac_adi, eylem.parametreler)  # GERÇEK eylem
        durum = sonucu_guncelle(durum, sonuc)    # gözlem: gerçek sonuç geri beslenir`,
              en: `# Simplified summary of the agent loop (conceptual, not real code)
task_done = False
state = perceive_initial_state()

while not task_done:
    action = model.decide(state)                # LLM: what should the next step be?
    if action.type == "task_done":
        task_done = True
    else:
        result = run_tool(action.tool_name, action.parameters)  # a REAL action
        state = update_state(state, result)      # observation: the real result feeds back in`,
            },
          },
          claudeAiAgentCrossCallout,
          agentLoopAnimation,
          agentLoopOrder,
          agentVsChatbotPlayground,
          {
            type: 'quiz',
            question: `A product is marketed as an "AI agent" but under the hood it only sends your message to an LLM and displays the text response, with no execution environment connected. Based on the loop/tool-access criterion, is this accurately called an agent?`,
            options: [
              { id: 'a', text: 'Yes, because it uses an LLM' },
              { id: 'b', text: 'No — without a loop that actually executes a tool call and observes a real result, this is architecturally a chatbot; "agent" is a marketing label here, not a mechanism' },
              { id: 'c', text: 'Yes, because it produces confident-sounding responses' },
              { id: 'd', text: 'It depends only on how large the model is' },
            ],
            correct: 'b',
            explanation: `The defining feature of an agent is the loop with real tool execution and observation, not the model's size or confidence. A system with no execution environment connected cannot cross that architectural line no matter what it is called.`,
            retryQuestion: {
              question: `Why is the Strategy design pattern a fitting Java analogy for an agent's LLM component specifically?`,
              options: [
                { id: 'a', text: 'Because Strategy always requires exactly one implementation' },
                { id: 'b', text: 'Because the LLM plays the role of a pluggable "decide what to do next" strategy object called repeatedly inside a loop that also handles real tool execution and feedback — swapping the model doesn\'t require changing the surrounding loop, just like swapping a Strategy implementation doesn\'t require changing the algorithm that calls it' },
                { id: 'c', text: 'Because the Strategy pattern is specific to chatbots' },
                { id: 'd', text: 'Because Java agents and AI agents are the same concept' },
              ],
              correct: 'b',
              explanation: `The loop (perceive-act-observe) is the stable structure; the LLM is the interchangeable decision-making component plugged into it — exactly the separation of concerns Strategy provides between an algorithm's fixed structure and its swappable behavior.`,
            },
          },
        ],
      },
      {
        title: `🔧 Function Calling: The Agent's Hands`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '☎️',
            content: `Function calling is like a call center operator who can only fill out a request form ("please transfer $50 from account X to account Y") and hand it to a human teller — the operator NEVER touches the vault themselves, no matter how confidently they wrote the form. The mechanism is exact: the LLM, given a tool's name and expected parameters, produces a structured request (typically JSON) naming the tool and filling in argument values — that is the ENTIRE extent of what "the LLM does" in function calling; a separate piece of code (yours) reads that structured request and is the only thing that actually executes anything. Here is the question worth sitting with: if the model can write a perfectly formed request to delete a file, why is that fundamentally different from the model actually deleting the file? Because the model's output is still just TEXT (structured text, but text) — it has zero ability to touch a file system, a database, or a network socket on its own; the gap between "wrote a request" and "the file is deleted" is entirely bridged by code you wrote and chose to run, which means YOU decide whether the model's request is trustworthy enough to execute, with what permissions, and whether to ask for confirmation first. Java comparison: this is precisely an interface/implementation split — the LLM sees an interface (a tool's name, parameter types, and a description of what it should do) the same way calling code sees a Java interface, but the LLM never provides the implementation; your code is the concrete class that implements what actually happens when the "method" is called, and the model has no visibility into or control over that implementation. The QA stake: this distinction is the entire safety model behind the permission modes discussed on the Claude AI page — because the model can only ever REQUEST a tool call, never force its execution, every genuine safety boundary lives entirely in the code that decides whether to honor that request, not in the model.`,
          },
          { type: 'heading', text: `The Model Requests, Your Code Executes` },
          {
            type: 'text',
            content: `The split has exactly two steps: (1) you register a tool by describing its name, its parameters and what it does — usually as a JSON schema — so the model knows it exists and how to ask for it; (2) when the model decides that tool is needed, it does not run anything — it outputs a structured object naming the tool and the argument values it wants to use. Your code then reads that object, decides whether to actually call the real function, executes it if so, and feeds the real result back to the model as the next observation in the loop from the previous tab.`,
          },
          {
            type: 'text',
            content: `Reasoning: why go through the trouble of a rigid JSON schema instead of just letting the model describe in plain English what it wants to do? Because plain English is ambiguous and not machine-parseable at the reliability level code requires — "check the flaky test log" could mean a dozen different function calls with different parameters. A schema forces the model to commit to an exact, parseable, executable request (tool name + typed parameters) the same way a strongly-typed method signature forces a caller to commit to specific argument types instead of a vague natural-language description of intent.`,
          },
          { type: 'heading', text: `A Tool Definition, in JSON Schema` },
          {
            type: 'code',
            language: 'json',
            code: {
              tr: `{
  "name": "report_flaky_test",
  "description": "Bilinen bir flaky testi test yönetim sistemine kaydeder",
  "parameters": {
    "type": "object",
    "properties": {
      "test_name": { "type": "string", "description": "Testin tam adı" },
      "reason": { "type": "string", "description": "Neden flaky olduğuna dair kısa açıklama" }
    },
    "required": ["test_name", "reason"]
  }
}`,
              en: `{
  "name": "report_flaky_test",
  "description": "Records a known flaky test in the test management system",
  "parameters": {
    "type": "object",
    "properties": {
      "test_name": { "type": "string", "description": "The full name of the test" },
      "reason": { "type": "string", "description": "A short explanation of why it is flaky" }
    },
    "required": ["test_name", "reason"]
  }
}`,
            },
          },
          {
            type: 'table',
            headers: ['Step', 'Who Does It', 'What Happens'],
            rows: [
              ['Register the tool', 'You (in code)', 'Describe the tool\'s name, parameters and purpose so the model knows it exists'],
              ['Request the call', 'The model', 'Outputs a structured object naming the tool + argument values — this is TEXT, nothing executes yet'],
              ['Execute the call', 'Your code', 'Reads the structured request, decides whether to run it, and actually calls the real function'],
              ['Observe the result', 'The model (next turn)', 'Receives the real function\'s output as context for its next decision'],
            ],
          },
          toolExecutionAnimation,
          toolExecutionOrder,
          functionCallGatePlayground,
          {
            type: 'quiz',
            question: `The model outputs a perfectly formed request to call a delete_all_test_data tool. What happens next, mechanically?`,
            options: [
              { id: 'a', text: 'The tool is executed immediately because the model requested it' },
              { id: 'b', text: 'Nothing executes on its own — the model\'s output is still just structured text; whether the tool actually runs depends entirely on whether your code chooses to read that request and call the real function' },
              { id: 'c', text: 'The model directly modifies the database' },
              { id: 'd', text: 'The request is automatically rejected because it sounds dangerous' },
            ],
            correct: 'b',
            explanation: `The model has no execution ability of its own — a "request" is text, no matter how dangerous-sounding or well-formed. Execution is a decision made entirely by the code that reads that request, exactly like a Java interface having no runtime behavior until a concrete class implements it.`,
            retryQuestion: {
              question: `Why is a rigid JSON schema used for tool definitions instead of letting the model just describe its intent in plain English?`,
              options: [
                { id: 'a', text: 'JSON is required because models cannot understand English' },
                { id: 'b', text: 'A schema forces the model to commit to an exact, machine-parseable request (tool name + typed parameters) instead of an ambiguous natural-language description — the same reason a strongly-typed method signature forces a caller to commit to specific argument types' },
                { id: 'c', text: 'JSON schemas make the model respond faster' },
                { id: 'd', text: 'Plain English requests are always more accurate' },
              ],
              correct: 'b',
              explanation: `Code needs to reliably parse and act on the model's request — natural language is too ambiguous for that reliability bar. A schema is the type signature that makes the request machine-actionable.`,
            },
          },
        ],
      },
      {
        title: `🐍 OpenAI API: A Tester's First Call`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📞',
            content: `Calling the OpenAI API for the first time is like ordering from a restaurant menu over the phone instead of walking into the kitchen yourself — the mechanism is exact: you don't need to know how the kitchen (the model's internals) works; you send a structured order (a list of "messages" with roles) to an address (an API endpoint) with your credentials (an API key), and a response comes back in a predictable, parseable shape — the entire pretraining/fine-tuning/RLHF machinery from earlier tabs is completely hidden behind that one HTTP call. Here is the question worth sitting with: if a tester has never trained a model and never will, why does understanding pretraining and RLHF from the earlier tabs matter for using this simple API call at all? Because the API call's behavior IS the trained model's behavior — knowing that weights are frozen at a training cutoff tells you why the model won't know your newest library version regardless of how you phrase the API call; knowing RLHF taught confidence tells you why a wrong API response still reads persuasively — the mechanism explains the API's behavior, the API is just the door into it. Java comparison: this is exactly like calling a well-documented third-party library method without needing to read its internal implementation — you trust the documented contract (send messages, get a response), the same way you'd call a JDBC driver's executeQuery() without needing to understand the database engine underneath it. The QA stake: this is the FIRST tab on this page where you write real, runnable code — but the discipline from the Claude AI page's Access & Setup tab applies identically here: the API key is a credential exactly like a database password, and it must never be hardcoded or pasted anywhere outside your own environment variables.`,
          },
          { type: 'heading', text: `Installing and Authenticating` },
          {
            type: 'text',
            content: `pip install openai gets the official client library. The API key must be read from an environment variable, never hardcoded in source — this is the exact same discipline covered on the Claude AI page's Access & Setup tab.`,
          },
          apiKeyCrossCallout,
          { type: 'heading', text: `Your First Chat Completion Call` },
          {
            type: 'code',
            language: 'python',
            code: {
              tr: `from openai import OpenAI

istemci = OpenAI()  # API key'i OPENAI_API_KEY ortam değişkeninden otomatik okur

yanit = istemci.chat.completions.create(
    model="<guncel-model-adi>",  # Güncel model adını resmi OpenAI docs'undan al
    messages=[
        {"role": "system", "content": "Sen kıdemli bir QA mühendisisin."},
        {"role": "user", "content": "Login testi için 3 sınır değer senaryosu yaz."},
    ],
)

print(yanit.choices[0].message.content)`,
              en: `from openai import OpenAI

client = OpenAI()  # Reads the API key automatically from the OPENAI_API_KEY environment variable

response = client.chat.completions.create(
    model="<current-model-name>",  # Get the current model name from the official OpenAI docs
    messages=[
        {"role": "system", "content": "You are a senior QA engineer."},
        {"role": "user", "content": "Write 3 boundary-value scenarios for the login test."},
    ],
)

print(response.choices[0].message.content)`,
            },
          },
          {
            type: 'code',
            language: 'text',
            label: 'Static example output — not a live call',
            code: {
              tr: `1. Sınır: Şifre tam olarak minimum uzunlukta (8 karakter) -> kabul edilmeli
2. Sınır: Şifre minimum uzunluğun 1 eksiği (7 karakter) -> reddedilmeli
3. Sınır: E-posta alanı maksimum izin verilen karakter sayısında -> kabul edilmeli`,
              en: `1. Boundary: password at exactly the minimum length (8 chars) -> should be accepted
2. Boundary: password one character below the minimum (7 chars) -> should be rejected
3. Boundary: email field at the maximum allowed character count -> should be accepted`,
            },
          },
          { type: 'heading', text: `The Messages List: Three Roles` },
          {
            type: 'text',
            content: `system sets persistent behavior and persona — the API counterpart of the "role" ingredient from the Prompt Engineering tab. user is the actual request. assistant is used to show the model its own prior turns when continuing a multi-turn conversation. Every call is stateless by default: the ENTIRE conversation history must be resent every time — there is no server-side memory, which is the same context-window mechanism covered two tabs ago.`,
          },
          {
            type: 'text',
            content: `Reasoning: why does the API require you to resend the whole message history every single call, instead of the server just "remembering" the conversation? Because there is no persistent per-conversation memory on the server side — the "memory" IS the messages list you send. If you want a multi-turn conversation, YOUR code is responsible for accumulating and resending prior turns; if you drop a message, the model genuinely has no other way to know it happened.`,
          },
          { type: 'heading', text: `Tokens and Cost, Without a Price Tag` },
          {
            type: 'text',
            content: `Every API call is billed per token, both what you send (input) and what the model generates (output) — the tokenization concept from earlier applies directly: a longer, more verbose prompt costs more, and a huge pasted log file can be surprisingly expensive. Exact prices are deliberately not stated here since they change; check the official current pricing page before running anything at scale.`,
          },
          { type: 'heading', text: `Same Concepts, Different Provider` },
          {
            type: 'text',
            content: `The examples on this page use OpenAI's API because it is a widely used reference implementation, but every concept here — a messages list with roles, a tool/function definition, a system instruction — exists in the Anthropic API in essentially the same shape. Learning one transfers almost directly to the other.`,
          },
          {
            type: 'table',
            headers: ['Concept', 'OpenAI API', 'Anthropic API (conceptually identical)'],
            rows: [
              ['Client setup', 'OpenAI() reads OPENAI_API_KEY from env', 'Anthropic() reads ANTHROPIC_API_KEY from env'],
              ['Message roles', 'system / user / assistant', 'system (separate parameter) / user / assistant'],
              ['Tool/function definition', 'JSON schema passed as tools', 'JSON schema passed as tools (same shape)'],
              ['Conversation memory', 'None server-side — resend full history', 'None server-side — resend full history'],
            ],
          },
          apiCallStepAnimation,
          apiCallOrder,
          openaiFirstCallPlayground,
          {
            type: 'quiz',
            question: `Why must the ENTIRE conversation history be resent with every single API call, instead of the server remembering it automatically?`,
            options: [
              { id: 'a', text: 'This is just an arbitrary limitation that will be removed soon' },
              { id: 'b', text: 'There is no persistent server-side memory per conversation — the context window mechanism means the messages list you send IS the model\'s only memory of the conversation; your code is responsible for accumulating and resending it' },
              { id: 'c', text: 'Resending history makes the API cheaper' },
              { id: 'd', text: 'Only the system role needs to be resent, not user/assistant messages' },
            ],
            correct: 'b',
            explanation: `This is the direct, practical consequence of the context-window mechanism from two tabs ago: there is no hidden server memory, so the messages list you send is the entirety of what the model can know about the conversation.`,
            retryQuestion: {
              question: `A tester hardcodes their OpenAI API key directly into a Python script and commits it to a public repository. Applying the discipline from the Claude AI page, what is the correct response?`,
              options: [
                { id: 'a', text: 'Nothing, as long as the repository is deleted quickly' },
                { id: 'b', text: 'Rotate the key immediately (treat it as compromised, since it left version control) and move the real key to an environment variable that is never committed — the exact same discipline as any other credential' },
                { id: 'c', text: 'Rename the variable holding the key so it is harder to find' },
                { id: 'd', text: 'This is only a problem if someone actually uses the key' },
              ],
              correct: 'b',
              explanation: `Deleting a public repository does not un-expose a key that was already visible — the only safe response to any credential leaving version control is rotation, exactly as covered for API keys on the Claude AI page.`,
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
    tabs: ['🎯 Giriş: AI, ML ve LLM Haritası', '🧱 LLM Nedir: Token ve Tahmin Motoru', '🎓 LLM Nasıl Eğitilir: Pretraining', '🎯 Fine-tuning & RLHF', '🧠 Context Window & Halüsinasyonun Kökeni', '🤖 Agent Nedir: LLM + Araçlar + Döngü', `🔧 Function Calling: Agent'ın Elleri`, `🐍 OpenAI API: Tester'ın İlk Çağrısı`],
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
      {
        title: `🎓 LLM Nasıl Eğitilir: Pretraining`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📸',
            content: `Bir modeli pretraining'den geçirmek, milyonlarca fotoğrafı incelerken hiçbirinde açıkça "bu kompozisyon iyi, bu kötü" diye söylenmeyen bir fotoğrafçılık öğrencisine benzer — mekanizma birebirdir: öğrenciye tek bir tekrarlayan alıştırma verilir, "bir fotoğrafın ilk %90'ını gördüğünde, eksik köşesinin neye benzediğini tahmin et" — ve bunu milyonlarca fotoğrafta milyarlarca kez yapmak, öğrenciyi "kompozisyon" diye bir kavramı kimse elle etiketlemeden kompozisyonu, ışığı ve konuyu içselleştirmeye zorlar. Üzerinde durulmaya değer soru şu: modele kimse açıkça dilbilgisi veya Python sözdizimi öğretmediyse, ikisini de nasıl biliyor? Çünkü internet ölçeğinde sıradaki token'ı isabetle tahmin etmek, ancak altındaki düzenlilikleri — dilbilgisini, sözdizimini, olgusal kalıpları — zımnen özümsemişsen mümkündür; tahmin hedefi, yetkinliği bir yan etki olarak zorla içeri sokar, asla açık bir ders olarak değil. Java karşılaştırması: bu, derlenmiş bir .class dosyası gibidir — kaynağın kendisini değil, DAMITILMIŞ davranışını taşır; pretrained model "ağırlıkları", milyarlarca sıradaki-token tahmininin derlenmiş çıktısıdır, ve Java kaynağını bytecode'dan geri kazanamayacağın gibi orijinal eğitim metnini de ağırlıklardan geri okuyamazsın. QA tarafındaki bedel: modelin "bilgisi" eğitim verisinin toplandığı an (eğitim kesim tarihi) donduğu için, o zaman doğru olan ama şimdi kullanımdan kaldırılmış bir sözdizimini kendinden emin şekilde kullanır — bu, Claude AI sayfasında ele alınan "eski kütüphane syntax'ı" riskinin mekanik köküdür; NEDEN olduğunu bilmek (dikkatsizlik değil, donmuş ağırlıklar) bir tester'ı prompt'ta her zaman tam kütüphane sürümünü belirtmeye götürür.`,
          },
          { type: 'heading', text: `Tek Alıştırma: Eksik Parçayı Tahmin Et` },
          {
            type: 'text',
            content: `Pretraining, bir modele devasa internet metni dilimleri verir — kitaplar, kod, forumlar, dokümantasyon — ve tek bir alıştırmayı tekrarlar: sıradaki token'ı gizle, modelden tahmin etmesini iste, tahminin ne kadar yanlış olduğunu ölç (bu farka "loss" denir), ve modelin milyarlarca iç ağırlığını daha iyi bir tahmine doğru ÇOK küçük bir adımla it. Bu alıştırmayı trilyonlarca kez tekrarla.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: "alıştırma" bu kadar basit görünürken bu neden GPU, aylar ve devasa maliyet gerektirir? Çünkü "milyarlarca ağırlığı çok hafifçe it" işlemi HER TEK tahminden sonra, trilyonlarca tahmin boyunca gerçekleşmeli, ve her itiş devasa bir matris hesaplaması gerektirir. Java karşılaştırması: bu, her tek satır değiştiğinde devasa paylaşılan bir kod tabanını yeniden derlemek gibidir, ama "kod tabanı" milyarlarca parametreye sahiptir ve bu trilyonlarca kez olur — kavramsal zorluk değil, tekrarlanan hesaplamanın saf hacmi özel donanımı aylarca çalıştırmayı gerektirir.`,
          },
          {
            type: 'table',
            headers: ['Terim', 'Sade Anlamı', 'Java Karşılaştırması'],
            rows: [
              ['Pretraining', 'Devasa ham metinden sıradaki-token tahminini öğrenmek', 'Devasa paylaşılan bir kod tabanından derlemek — bir kez olur, pahalıdır, özellik başına tekrarlanmaz'],
              ['Loss', 'Modelin tahmininin ne kadar yanlış olduğu, ölçülüp iyileştirme için kullanılır', 'Bir düzeltmeyi tetikleyen başarısız bir teste benzer — ama buradaki "düzeltme" otomatik, minik bir ağırlık ayarıdır'],
              ['Ağırlıklar (weights)', 'Öğrenilen kalıpları kodlayan milyarlarca sayı', 'Derlenmiş .class/.jar çıktısı — damıtılmış davranışı taşır, orijinal kaynağı değil'],
              ['Eğitim kesim tarihi', 'Modelin bu tarihten sonra hiç yeni metin görmediği tarih', 'Build zamanında donmuş bir bağımlılık sürümü — uygulama o tarihten sonraki sürümlerden habersizdir'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# Pretraining döngüsünün basitleştirilmiş özeti (gerçek kod değil, kavramsal)
for metin_parcasi in devasa_internet_metni:
    baglam, gercek_sonraki_token = metin_parcasi.ayir()
    tahmin = model.tahmin_et(baglam)          # model bir sonraki token'ı tahmin eder
    hata = kayip_hesapla(tahmin, gercek_sonraki_token)  # "loss": tahmin ne kadar yanlış?
    model.agirliklari_hafifce_guncelle(hata)  # milyarlarca ağırlık ÇOK küçük adımlarla düzelir
# Bu döngü trilyonlarca kez tekrarlanır — aylar süren GPU hesaplaması budur`,
              en: `# Simplified summary of the pretraining loop (conceptual, not real code)
for text_chunk in massive_internet_text:
    context, real_next_token = text_chunk.split()
    prediction = model.predict(context)          # the model guesses the next token
    error = compute_loss(prediction, real_next_token)  # "loss": how wrong was the guess?
    model.nudge_weights_slightly(error)  # billions of weights shift by a tiny amount
# This loop repeats trillions of times — this is the months of GPU computation`,
            },
          },
          pretrainingLoopAnimation,
          pretrainingLoopOrder,
          trainingCutoffPlayground,
          {
            type: 'quiz',
            question: `Bir model, iki yıl önce bir kütüphaneden kaldırılmış bir metodu kullanarak kendinden emin şekilde kod yazıyor. Pretraining'in gerçekte ne yaptığı düşünüldüğünde, en isabetli mekanik açıklama nedir?`,
            options: [
              { id: 'a', text: 'Model tembellik ediyor, yeterince çaba göstermiyor' },
              { id: 'b', text: 'Modelin ağırlıkları eğitim kesim tarihinde donduruldu; o metod o zaman mevcut eğitim verisinde yaygındı, ve model kendisine söylenmedikçe daha sonraki bir kaldırmadan haberdar olamaz' },
              { id: 'c', text: 'Model daha basit olduğu için kasıtlı olarak eski sözdizimini tercih ediyor' },
              { id: 'd', text: 'Bu, LLM\'lerin güvenilir kod yazamayacağını kanıtlar' },
            ],
            correct: 'b',
            explanation: `Ağırlıklar, eğitim kesim tarihine kadar görülen verinin derlenmiş bir çıktısıdır — internete canlı bir bağlantı değildir. O zaman standart olan, sonradan kaldırılan bir metodun "kaldırıldığının bilinmesi" mümkün değildir, bu gerçek prompt'ta belirtilmedikçe.`,
            retryQuestion: {
              question: `"Modeli her gün daha yeni veriyle yeniden eğit" yaklaşımı çoğu ekip için eğitim-kesim-tarihi sorununu neden çözmez?`,
              options: [
                { id: 'a', text: 'Çözerdi, ama henüz kimse bunu yapmayı düşünmedi' },
                { id: 'b', text: 'Pretraining devasa hesaplama, zaman ve maliyet gerektirir (aylar, özel donanım) — bir ekibin günlük olarak rahatça tekrarlayabileceği bir şey değildir; bu tam olarak neden güncel bağlamla prompt yazmanın (sürümünü belirtmek veya RAG) pratik düzeltme olduğunun, yeniden eğitimin olmadığının sebebidir' },
                { id: 'c', text: 'Eğitim verisi bir kez toplandıktan sonra güncellenemez' },
                { id: 'd', text: 'Modellerin birden fazla kez yeniden eğitilmesine izin verilmez' },
              ],
              correct: 'b',
              explanation: `Pretraining'in maliyeti tam olarak neden nadiren ve az sayıda kurumda gerçekleştiğinin sebebidir — günlük yeniden eğitim çözülecek bir ölçekleme sorunu değil, ekonomik ve pratik olarak masada olmayan bir seçenektir. Ölçeklenebilir düzeltme yeniden-eğitim katmanında değil, prompt/bağlam katmanında yaşar.`,
            },
          },
        ],
      },
      {
        title: `🎯 Fine-tuning & RLHF`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🎓',
            content: `Pretraining'den yeni çıkmış bir base model, şirketin kütüphanesindeki her kitabı okumuş ama bir müşteriye İYİ bir cevabın gerçekte neye benzediği hiç gösterilmemiş, parlak yeni bir işe alınana benzer — mekanizma birebirdir: pretraining sadece "olası sıradaki metni tahmin et"i öğretir, "yardımcı, konuya odaklı ve belirsizliği kabul eden bir asistan ol"u değil — bunlar tamamen ayrı becerilerdir ve pretraining'den SONRA, fine-tuning yoluyla öğretilir. Üzerinde durulmaya değer soru şu: base model pretraining'den zaten dilbilgisini, olguları ve kodu biliyorsa, sadece bir chatbot olmak için neden DAHA FAZLA eğitime ihtiyaç duyar? Çünkü ham bir pretrained model, "CSS'te bir div'i nasıl ortalarım?" sorusuna, gerçekten cevap vermek kadar "...Stack Overflow'da sık sorulan bir sorudur, 47.000 kez sorulmuştur" diye devam etmeye de (olası bir DEVAM) eşit derecede eğilimlidir — pretraining ona hiçbir zaman "kullanıcı doğrudan yardımcı bir cevap istiyor"u öğretmedi, sadece "olası sıradaki metni tahmin et"i öğretti. Java karşılaştırması: bu, sadece sözdizimi geçerliliğini kontrol eden bir derleyici (pretraining: bu olası bir cümle mi?) ile kodun ticket'ın niyetine gerçekten hizmet edip etmediğini kontrol eden bir code reviewer (fine-tuning: bu gerçekten kullanıcının istediğine YARDIMCI bir cevap mı?) arasındaki farktır — iki farklı, ardışık kalite kapısı. QA tarafındaki bedel: RLHF özellikle modeli kendinden emin, tam görünen cevapları tercih etmeye eğitir, çünkü insan değerlendiriciler kör karşılaştırmalarda çekingen bir "bilmiyorum"u kendinden emin ama yanlış bir cevaptan daha az yardımcı olarak puanlama eğilimindedir — bu, Claude AI sayfasında ele alınan halüsinasyonun DAVRANIŞSAL köküdür: model arızalı değildir, kısmen tam olarak ara sıra yanlış bir cevabı tehlikeli kılan o kendinden emin tona doğru optimize edilmiştir.`,
          },
          { type: 'heading', text: `SFT: Sadece Tahmin Etmek Değil, Göstermek` },
          {
            type: 'text',
            content: `Supervised Fine-Tuning (SFT), pretrained base model'i alıp eğitime devam eder, ama artık çok daha küçük, özenle seçilmiş bir örnek konuşma setinde — bir prompt ve gerçekten iyi, insan tarafından yazılmış veya onaylanmış bir cevap — modele yardımcı bir asistan olmanın FORMATINI ve TONUNU öğretir, yeni olgular değil.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: SFT'nin üzerine RLHF neden gerekli — "iyi örnekler göster" neden yeterli değil? Çünkü bir kullanıcının bir şeyi soracağı her olası yolu kapsayacak kadar örnek cevap yazmak kombinatoryal olarak imkansızdır. RLHF bunun yerine modeli daha ucuz bir sinyalle eğitir: insanlar sadece modelin kendi iki aday cevabını SIRALAR ("hangisi daha iyi?"), bir ödül modeli bu sıralamayı tahmin etmeyi öğrenir, ve base model ödül modelinin yüksek puan verdiği cevapları üretmeye doğru itilir — küçük bir miktar insan YARGISINI, sonsuz elle yazılmış örneğe ihtiyaç duymak yerine ölçeklenebilir bir eğitim sinyaline dönüştürür.`,
          },
          { type: 'heading', text: `Alignment, Tek Paragrafta` },
          {
            type: 'text',
            content: `"Alignment", pretraining-sonrası bu sürecin tamamı (SFT + RLHF + diğer teknikler) için şemsiye terimdir — hedef, modelin davranışını insan niyeti ve değerleriyle (yardımcı, zararsız, dürüst) eşleştirmektir, sadece "olası metni tahmin eder" değil. Bu, çözülmüş bir problem değil, devam eden bir araştırma alanıdır — bu sayfanın ilerisinde ve Claude AI sayfasında ele alınan risklerin, iyi hizalanmış modern modellerde bile hâlâ var olmasının sebebi tam olarak budur.`,
          },
          {
            type: 'table',
            headers: ['Aşama', 'Ne Yapar', 'Ne YAPMAZ'],
            rows: [
              ['Pretraining', 'Ham internet-ölçeğinde metinden sıradaki-token tahminini öğrenir', 'Modele yardımcı olmayı, talimat izlemeyi veya zararlı istekleri reddetmeyi öğretmez'],
              ['SFT (Supervised Fine-Tuning)', 'Özenle seçilmiş örnek konuşmalarla (prompt + iyi cevap) eğitir', 'Base model\'in pretraining\'den sahip olmadığı yeni olgu veya bilgi eklemez'],
              ['RLHF', 'İnsan tercih sıralamalarıyla bir ödül modeli eğitir, sonra modeli yüksek-ödüllü cevaplara doğru iter', 'Halüsinasyonu ortadan kaldırmaz — değerlendiriciler tercih ettiyse kendinden emin görünen yanlış cevapları istemeden ödüllendirebilir'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# RLHF döngüsünün basitleştirilmiş özeti (kavramsal, gerçek kod değil)
for prompt in ornek_promptlar:
    cevap_a, cevap_b = model.iki_farkli_cevap_uret(prompt)
    tercih = insan_degerlendirici.hangisi_daha_iyi(cevap_a, cevap_b)
    odul_modeli.bu_tercihten_ogren(cevap_a, cevap_b, tercih)
# Ödül modeli eğitildikten sonra:
for prompt in cok_daha_genis_veri:
    cevap = model.cevap_uret(prompt)
    odul = odul_modeli.puanla(cevap)          # insan olmadan otomatik puan
    model.agirliklari_odule_gore_guncelle(odul)  # yüksek puanlı cevaplara doğru it`,
              en: `# Simplified summary of the RLHF loop (conceptual, not real code)
for prompt in example_prompts:
    answer_a, answer_b = model.generate_two_different_answers(prompt)
    preference = human_rater.which_is_better(answer_a, answer_b)
    reward_model.learn_from_this_preference(answer_a, answer_b, preference)
# Once the reward model is trained:
for prompt in much_larger_dataset:
    answer = model.generate_answer(prompt)
    reward = reward_model.score(answer)          # automatic score, no human needed
    model.update_weights_toward_reward(reward)   # nudge toward high-scoring answers`,
            },
          },
          alignmentPipelineAnimation,
          alignmentPipelineOrder,
          alignmentDiagnosisPlayground,
          {
            type: 'quiz',
            question: `RLHF, yardımcı olma becerisini artırmasına rağmen, bazı durumlarda halüsinasyonu neden İSTEMEDEN KÖTÜLEŞTİREBİLİR?`,
            options: [
              { id: 'a', text: 'RLHF\'in halüsinasyonla hiçbir ilgisi yoktur — sadece pretraining\'in vardır' },
              { id: 'b', text: 'Kör karşılaştırmalarda insan değerlendiriciler kendinden emin görünen yanlış cevapları çekingen, belirsiz olanlardan daha iyi puanladıysa, ödül modeli özgüveni tercih etmeyi öğrenir — altta yatan olgunun doğru olup olmadığından bağımsız olarak modeli daha iddialı bir tona doğru iter' },
              { id: 'c', text: 'RLHF modelin bilgisine yeni yanlış olgular ekler' },
              { id: 'd', text: 'RLHF her zaman her doğruluk sorununu tamamen düzeltir' },
            ],
            correct: 'b',
            explanation: `RLHF, sıralama verisinde insanların tercih ettiği her şeye doğru optimize eder — eğer dürüst çekingenlik yerine özgüven tercih edildiyse, model özgüveni, kendinden emin cevabın doğru olup olmadığından bağımsız olarak ödüllendirilen bir özellik olarak öğrenir.`,
            retryQuestion: {
              question: `Pretrained bir base model'e (hiçbir fine-tuning öncesi) doğrudan bir soru soruluyor. Nihai fine-tuned asistandan daha az doğrudan yardımcı bir cevap vermesi neden daha olasıdır?`,
              options: [
                { id: 'a', text: 'Base modeller her zaman bozuktur ve kullanılamaz' },
                { id: 'b', text: 'Pretraining sadece "olası sıradaki metin" için optimize eder — olası görünen bir konu dışına kaymayla veya soruyu yeniden ifade etmeyle devam etmek, ona cevap vermek kadar geçerli bir tamamlamadır; "doğrudan ve yardımcı şekilde cevap ver"i özellikle öğreten aşamalar SFT/RLHF\'dir' },
                { id: 'c', text: 'Base modeller kasıtlı olarak soruları cevaplamayı reddeder' },
                { id: 'd', text: 'Base modellerin fine-tuned olanlardan daha az bilgisi vardır' },
              ],
              correct: 'b',
              explanation: `Base bir modelin "kullanıcı doğrudan bir cevap istiyor" diye bir kavramı yoktur — bu beklenti tamamen SFT ve RLHF'in ürünüdür. Onlar olmadan, prompt metninin herhangi bir olası devamı, modelin gözünde eşit derecede geçerli bir tamamlamadır.`,
            },
          },
        ],
      },
      {
        title: `🧠 Context Window & Halüsinasyonun Kökeni`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🧽',
            content: `Context window, bir toplantı bittiği an silinen bir yazı tahtasına benzer — mekanizma birebirdir: modelin senin spesifik konuşman hakkında "bildiği" her şey SADECE o pencerenin içindeki metinde yaşar, ve konuşma bittiği (veya token limitini aşıp kaydığı) an, o bilgi ne kadar önemli olursa olsun bir tahtadan silinen kalem izi kadar tamamen kaybolur. Üzerinde durulmaya değer soru şu: model trilyonlarca token üzerinde eğitildiyse, AYNI konuşmada 5 dakika önce söylediğin bir şeyi neden unutuyor? Çünkü "üzerinde eğitildi" ile "şu an hatırlıyor" tamamen farklı iki hafıza türüdür: eğitim, genel kalıpları kalıcı ağırlıklara pişirdi, dondu ve her konuşmada paylaşıldı; context window ise sadece o an yapıştırılanı tutan AYRI, geçici, konuşma-başına bir hafızadır. Java karşılaştırması: bu, tam olarak static final bir alan (derleme zamanında pişirilmiş, her yerde paylaşılan) ile bir metod-local değişken (sadece bir çağrının süresi boyunca var olan, sonra garbage collect edilen) arasındaki farktır — ikisini karıştırmak, bir modelin aslında sadece bir konuşmanın bağlamında olan bir şeyi eğitimden "hatırlamasını" beklemenin ta kendisi olan hatadır. QA tarafındaki bedel: bu, Claude AI sayfasında ele alınan "uzun bir konuşmada bağlam kaybı" riskinin tam mekanizmasıdır — bir konuşma eski içerik için pratik dikkat süresini aştıkça, erken talimatlar teknik olarak hâlâ geçmişte olsalar bile etkili biçimde erişilemez hale gelir, bu da yeni bir görev için taze bir konuşma başlatmanın (temel bağlam yeniden yapıştırılarak) neden düzeltme olduğunun, "modelden daha çok çaba göstermesini istemenin" değil, sebebidir.`,
          },
          { type: 'heading', text: `Pencerenin Bir Boyutu Var, Token'la Ölçülür` },
          {
            type: 'text',
            content: `Her modelin, kelime veya mesaj değil TOKEN'la ölçülen maksimum bir context window'u vardır — bir konuşmadaki her şeyin toplam bütçesi: talimatların, yapıştırdığın kod ve modelin şimdiye kadarki cevapları hepsi aynı limite sayılır. Bir konuşma bunu aştığında, önemli olsun olmasın en eski içerik atılmalı veya özetlenmelidir.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: bir LLM neden bazen, gerçekten dışarı itilmeden ÇOK ÖNCE, token limitinin rahatlıkla içindeyken bile bir şeyi "unutmuş" gibi görünür? Çünkü uzun bir bağlam boyunca dikkat tekdüze değildir — çok uzun bir konuşmanın ortasına gömülü, birçok ilgisiz konu değişimiyle çevrili içerik, o zamandan beri söylenen her şeyle modelin sınırlı dikkati için etkili biçimde yarışır, bu yüzden erken bir kez belirtilen bir kural teknik olarak bağlamda hazır olsa bile işlevsel olarak öncelik dışına düşebilir. Java karşılaştırması: bu, teknik olarak hâlâ scope'ta olan ama çok uzun bir metod gövdesini göz gezdiren bir okuyucunun kolayca kaçırdığı bir değişken gibidir — "scope'ta olmak" ile "gerçekten fark edilmek" aynı garanti değildir.`,
          },
          { type: 'heading', text: `Halüsinasyonun Gerçek Kök Nedeni` },
          {
            type: 'text',
            content: `Bir modelin özel bir "bilmiyorum" mekanizması yoktur — doğru bir olgu ve uydurma bir olgu dahil her tek çıktı, sıradaki en olası token'ı seçmenin tam olarak aynı sürecinden gelir. Gerçek, doğru devam ile olası-ama-yanlış devamın ikisi de anlamlı bir olasılığa sahip olduğunda — çünkü eğitim verisi belirsizdi veya seyrekti, veya context window ayırt edici detayı kaybetti — örnekleme süreci yanlış olanı doğru olan kadar akıcı biçimde seçebilir. Halüsinasyon, ayrı bir "yalan söyleme modülü"ndeki bir hata değildir; şanssız bir çekiliş üreten AYNI tek mekanizmadır.`,
          },
          {
            type: 'table',
            headers: ['Neden', 'Mekanizma', 'QA Karşı Alışkanlığı'],
            rows: [
              ['Context window taşması', 'Token bütçesi aşılınca en eski içerik atılır veya özetlenir', 'Bir görevi sonsuza dek uzatmak yerine yeni görev için taze bir konuşma başlat'],
              ['Uzun konuşmalarda dikkat seyrelmesi', 'Erken bir talimat teknik olarak hazırdır ama o zamandan beri söylenen her şeyle yarışır', 'Uzun oturumlarda kritik kısıtları periyodik olarak yeniden belirt — bir kez söylemenin yeterli olduğunu varsayma'],
              ['"Bilmiyorum" token\'ı yok', 'Doğru veya yanlış her çıktı aynı sıradaki-token örnekleme sürecinden gelir', 'Dış bir kaynağa (dokümantasyon, bir çalıştırma, kabul kriterleri) karşı doğrula — metindeki özgüven asla kanıt değildir'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            code: {
              tr: `# Context window'un basitleştirilmiş modeli (kavramsal, gerçek kod değil)
context = []
TOKEN_LIMITI = 128000

def mesaj_ekle(yeni_mesaj):
    context.append(yeni_mesaj)
    while token_say(context) > TOKEN_LIMITI:
        context.pop(0)  # en eski mesaj atılır — SİLİNİR, özetlenmezse tamamen kaybolur
    return context`,
              en: `# Simplified model of the context window (conceptual, not real code)
context = []
TOKEN_LIMIT = 128000

def add_message(new_message):
    context.append(new_message)
    while count_tokens(context) > TOKEN_LIMIT:
        context.pop(0)  # the oldest message is dropped — GONE, unless summarized first
    return context`,
            },
          },
          tokenLabBackCallout,
          contextDriftAnimation,
          contextDriftOrder,
          contextResetPlayground,
          {
            type: 'quiz',
            question: `Bir model akıcı, kendinden emin ama olgusal olarak yanlış bir cevap veriyor. Bu sekmede ele alınan context-window ve örnekleme mekanizmasına göre en isabetli açıklama nedir?`,
            options: [
              { id: 'a', text: 'Model aktifleşen ayrı bir "yalan söyleme" modülüne sahip' },
              { id: 'b', text: 'Özel bir "bilmiyorum" çıktısı yoktur — doğru veya yanlış her token, aynı sıradaki-en-olası-token sürecinden gelir; eğitim verisi belirsizse veya ayırt edici bağlam kaybolduysa, şanssız-ama-olası bir çekiliş, doğru bir çekiliş kadar kolay üretilir' },
              { id: 'c', text: 'Modelin context window\'u tamamen doldu' },
              { id: 'd', text: 'Bu, yeterli veriyle eğitilmiş modellerde asla olmaz' },
            ],
            correct: 'b',
            explanation: `Doğruluk ve halüsinasyon, birebir aynı token-örnekleme mekanizmasından üretilir — ayrı bir "doğruluk kontrolü" adımı yoktur. Bu, tam olarak Token Lab'da çalıştırdığın düşük-olasılık yolunun büyük ölçekli halidir.`,
            retryQuestion: {
              question: `Çok uzun bir konuşmada, token limiti hiç aşılmamış olsa bile, Claude 40 mesaj önce belirlediğin bir format kuralını takip etmeyi bırakmış görünüyor. En isabetli teşhis nedir?`,
              options: [
                { id: 'a', text: 'Limite yaklaşılınca kural teknik olarak hafızadan silindi' },
                { id: 'b', text: 'Kural teknik olarak bağlamda hâlâ hazır ama o zamandan beri söylenen her şeyle modelin sınırlı dikkati için yarışıyor — bu sert bir silme değil, dikkat seyrelmesidir; kuralı yeniden belirterek taze bir konuşma başlatmak pratik düzeltmedir' },
                { id: 'c', text: 'Model kasıtlı olarak kuralı takip etmemeye karar verdi' },
                { id: 'd', text: 'Bu sadece eski, daha az yetenekli modellerde olur' },
              ],
              correct: 'b',
              explanation: `Dikkat seyrelmesi "işlevsel olarak öncelik dışına düşme" sorunudur, sert-silme sorunu değil — token limiti ayrı, daha katı bir kesimdir. Düzeltme (taze bağlam), sürekli büyüyen bir thread içinde savaşmak yerine seyrelme sorununu tamamen ortadan kaldırarak işe yarar.`,
            },
          },
        ],
      },
      {
        title: `🤖 Agent Nedir: LLM + Araçlar + Döngü`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '🔑',
            content: `Chatbot, araçlarla dolu bir odada cam duvarın arkasında oturan parlak bir danışmandır; agent ise camdan geçip araçları GERÇEKTEN kullanması için elle anahtar verilmiş AYNI danışmandır — mekanizma birebirdir: danışmanın uzmanlığı (LLM) ikisi arasında değişmez, değişen şey sözlerini dünyadaki gerçek etkilere bağlayan bir şeyin olup olmadığıdır. Üzerinde durulmaya değer soru şu: bir chatbot'un içindeki LLM ile bir agent'ın içindeki LLM birebir aynı model olabiliyorsa, birini "sadece cevap ver"e, diğerini "işi hallet"e dönüştüren nedir? Çünkü agent mimarisi o aynı modeli araç erişimi olan bir DÖNGÜYE sarar: model mevcut durumu algılar, bir eyleme karar verir, bir araç gerçekten çalışır ve gerçek bir sonuç döndürür, ve model sıradaki eyleme karar vermeden önce o gerçek sonucu gözler — bir chatbot bir "karar ver" turundan sonra durur, bir agent görev bitene kadar "algıla → karar ver → eyle → gözle" döngüsünde dönmeye devam eder. Java karşılaştırması: bu, bir while döngüsü içinde yaşayan Strategy tasarım desenidir — LLM, gerçek API'lere/araçlara da çağrı yapan ve sonuçları stratejinin sıradaki girdisi olarak geri besleyen bir döngü içinde tekrar tekrar çağrılan, takılıp çıkarılabilir bir "sıradaki ne yapılacağına karar ver" strateji nesnesidir; stratejiyi (farklı bir model) değiştir, döngü mimarisi değişmez — tıpkı etrafındaki sıralama algoritmasına dokunmadan bir Comparator'ı değiştirmek gibi. QA tarafındaki bedel: bu döngünün iki ticari örneğini Claude AI sayfasında zaten gördün — Claude Code ve MCP — bu sekme, o iki ürünün uyguladığı genel mekanizmayı isimlendiriyor.`,
          },
          { type: 'heading', text: `Chatbot vs Agent: Cevap Vermek ile Eylem Yapmak` },
          {
            type: 'text',
            content: `Bir chatbot'un işi, çok iyi olsa bile, bir metin cevabı ürettiği an biter. Bir agent'ın işi metin üretmek değildir, bir görevi başarmaktır, ve metin (özellikle bir araç çağırma isteği) yol boyunca üretebileceği şeylerden sadece biridir. Ayrım çizgisi zeka değil, mimaridir: modeli gerçek araç erişimi olan bir döngüye saran bir şey var mı?`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: sıradan bir chatbot neden "kendi başına" bir komut çalıştırmaya karar veremez? Çünkü bir chatbot'a bağlı hiçbir çalıştırma ortamı yoktur — bir komutun metnini YAZABİLİR, ama saf bir sohbet arayüzünde hiçbir şey o metni alıp gerçek bir dosya sistemine veya terminale karşı çalıştırmaz. Bir agent framework'ü tam olarak "model X'i yapmak istiyor" ile "X gerçekten oluyor"u birbirine bağlayan, artı gerçek sonucu geri besleyen eksik kablolamadır.`,
          },
          { type: 'heading', text: `Döngü: Algıla → Düşün → Eyle → Gözle` },
          {
            type: 'text',
            content: `Ürün ne olursa olsun her agent aynı dört adımlı döngüyü çalıştırır: 1) mevcut durumu algıla (bir dosya, bir test sonucu, bir kullanıcı isteği), 2) düşün — o duruma dayanarak sıradaki eyleme karar ver, 3) eyle — bir araç veya fonksiyon çağır, 4) o eylemin gerçek sonucunu gözle, sonra güncellenmiş durumla algılamaya geri dön. Döngü, model görevin tamamlandığına karar verdiğinde veya bir güvenlik sınırına (ileride Riskler sekmesinde ele alınır) ulaşıldığında biter.`,
          },
          {
            type: 'table',
            headers: ['Kavram', 'Chatbot', 'Agent'],
            rows: [
              ['Ne üretir', 'Tur başına bir kez, bir metin cevabı', 'Görev bitene kadar bir karar-ver→eyle→gözle döngü dizisi'],
              ['Gerçek dünyayla bağlantı', 'Yok — çıktı sadece okuduğun metindir', 'Gerçekten çalışan ve gerçek sonuç döndüren araç/fonksiyon çağrıları'],
              ['Ne zaman durur', 'Bir cevaptan sonra', 'Görev tamamlandığında veya bir güvenlik sınırına (maksimum adım) ulaşıldığında'],
              ['Claude AI sayfasından örnek', 'Sade bir claude.ai konuşması', 'Claude Code (dosya/test döngüsü), MCP (araç-server döngüsü)'],
            ],
          },
          {
            type: 'code',
            language: 'python',
            code: {
              tr: `# Agent döngüsünün basitleştirilmiş özeti (kavramsal, gerçek kod değil)
gorev_tamamlandi = False
durum = ilk_durumu_algila()

while not gorev_tamamlandi:
    eylem = model.karar_ver(durum)              # LLM: sıradaki adım ne olmalı?
    if eylem.tur == "gorev_tamamlandi":
        gorev_tamamlandi = True
    else:
        sonuc = arac_calistir(eylem.arac_adi, eylem.parametreler)  # GERÇEK eylem
        durum = sonucu_guncelle(durum, sonuc)    # gözlem: gerçek sonuç geri beslenir`,
              en: `# Simplified summary of the agent loop (conceptual, not real code)
task_done = False
state = perceive_initial_state()

while not task_done:
    action = model.decide(state)                # LLM: what should the next step be?
    if action.type == "task_done":
        task_done = True
    else:
        result = run_tool(action.tool_name, action.parameters)  # a REAL action
        state = update_state(state, result)      # observation: the real result feeds back in`,
            },
          },
          claudeAiAgentCrossCallout,
          agentLoopAnimation,
          agentLoopOrder,
          agentVsChatbotPlayground,
          {
            type: 'quiz',
            question: `Bir ürün "AI agent" diye pazarlanıyor ama kaputun altında sadece mesajını bir LLM'e gönderip metin cevabını gösteriyor, bağlı hiçbir çalıştırma ortamı yok. Döngü/araç-erişimi kriterine göre, buna gerçekten agent denebilir mi?`,
            options: [
              { id: 'a', text: 'Evet, çünkü bir LLM kullanıyor' },
              { id: 'b', text: 'Hayır — bir araç çağrısını gerçekten çalıştıran ve gerçek bir sonucu gözlemleyen bir döngü olmadan, bu mimari olarak bir chatbot\'tur; "agent" burada bir pazarlama etiketidir, bir mekanizma değil' },
              { id: 'c', text: 'Evet, çünkü kendinden emin görünen cevaplar üretiyor' },
              { id: 'd', text: 'Sadece modelin ne kadar büyük olduğuna bağlıdır' },
            ],
            correct: 'b',
            explanation: `Bir agent'ı tanımlayan özellik, gerçek araç çalıştırma ve gözlemle döngüdür, modelin boyutu veya özgüveni değil. Bağlı bir çalıştırma ortamı olmayan bir sistem, ne diye adlandırılırsa adlandırılsın bu mimari çizgiyi geçemez.`,
            retryQuestion: {
              question: `Strategy tasarım deseni özellikle bir agent'ın LLM bileşeni için neden uygun bir Java karşılaştırması?`,
              options: [
                { id: 'a', text: 'Çünkü Strategy her zaman tam olarak tek bir implementasyon gerektirir' },
                { id: 'b', text: 'Çünkü LLM, gerçek araç çalıştırma ve geri bildirimi de ele alan bir döngü içinde tekrar tekrar çağrılan, takılıp çıkarılabilir bir "sıradaki ne yapılacağına karar ver" strateji nesnesi rolünü oynar — modeli değiştirmek çevredeki döngüyü değiştirmeyi gerektirmez, tıpkı bir Strategy implementasyonunu değiştirmenin onu çağıran algoritmayı değiştirmeyi gerektirmemesi gibi' },
                { id: 'c', text: 'Çünkü Strategy deseni sadece chatbot\'lara özgüdür' },
                { id: 'd', text: 'Çünkü Java agent\'ları ve AI agent\'ları aynı kavramdır' },
              ],
              correct: 'b',
              explanation: `Döngü (algıla-eyle-gözle) sabit yapıdır; LLM ise ona takılan, değiştirilebilir karar-verme bileşenidir — tam olarak Strategy'nin bir algoritmanın sabit yapısı ile değiştirilebilir davranışı arasında sağladığı sorumluluk ayrımı.`,
            },
          },
        ],
      },
      {
        title: `🔧 Function Calling: Agent'ın Elleri`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '☎️',
            content: `Function calling, sadece bir talep formu doldurabilen ("lütfen X hesabından Y hesabına 50 dolar transfer et") ve bunu bir insan veznedara elden veren bir çağrı merkezi operatörüne benzer — operatör formu ne kadar kendinden emin doldurursa doldursun kasaya ASLA kendisi dokunmaz. Mekanizma birebirdir: LLM, bir aracın adı ve beklenen parametreleri verildiğinde, aracı adlandıran ve argüman değerlerini dolduran yapılandırılmış bir istek (genelde JSON) üretir — function calling'de "LLM'in yaptığı"nın TAMAMI budur; ayrı bir kod parçası (senin kodun) o yapılandırılmış isteği okur ve gerçekten bir şey çalıştıran tek şey odur. Üzerinde durulmaya değer soru şu: model bir dosyayı silmek için kusursuz biçimlendirilmiş bir istek yazabiliyorsa, bu modelin dosyayı gerçekten silmesinden neden temelde farklıdır? Çünkü modelin çıktısı hâlâ sadece METİNDİR (yapılandırılmış metin, ama metin) — bir dosya sistemine, bir veritabanına veya bir ağ soketine kendi başına dokunma yeteneği sıfırdır; "bir istek yazdı" ile "dosya silindi" arasındaki boşluk tamamen senin yazıp çalıştırmayı SEÇTİĞİN kodla köprülenir, ki bu da modelin isteğinin çalıştırılacak kadar güvenilir olup olmadığına, hangi izinlerle, ve önce onay istenip istenmeyeceğine SENİN karar verdiğin anlamına gelir. Java karşılaştırması: bu tam olarak bir interface/implementation ayrımıdır — LLM, çağıran kodun bir Java interface'i gördüğü gibi bir interface görür (bir aracın adı, parametre tipleri ve ne yapması gerektiğinin bir açıklaması), ama LLM implementasyonu asla sağlamaz; senin kodun, "metod" çağrıldığında gerçekte ne olacağını uygulayan somut sınıftır, ve modelin o implementasyona görünürlüğü veya kontrolü yoktur. QA tarafındaki bedel: bu ayrım, Claude AI sayfasında ele alınan izin modlarının arkasındaki güvenlik modelinin tamamıdır — çünkü model bir araç çağrısını sadece İSTEYEBİLİR, asla çalıştırmasını zorlayamaz, her gerçek güvenlik sınırı tamamen o isteği onaylayıp onaylamayacağına karar veren kodda yaşar, modelde değil.`,
          },
          { type: 'heading', text: `Model İster, Kodun Çalıştırır` },
          {
            type: 'text',
            content: `Ayrım tam olarak iki adımdır: (1) bir aracı adını, parametrelerini ve ne yaptığını tanımlayarak — genelde bir JSON şema olarak — kaydedersin, böylece model onun var olduğunu ve nasıl isteneceğini bilir; (2) model o aracın gerekli olduğuna karar verdiğinde, hiçbir şey çalıştırmaz — aracı ve kullanmak istediği argüman değerlerini adlandıran yapılandırılmış bir nesne üretir. Kodun sonra o nesneyi okur, gerçek fonksiyonu gerçekten çağırıp çağırmayacağına karar verir, öyleyse çalıştırır, ve gerçek sonucu bir önceki sekmedeki döngünün sıradaki gözlemi olarak modele geri besler.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: modelin ne yapmak istediğini düz İngilizce anlatmasına izin vermek yerine katı bir JSON şemasıyla uğraşmaya neden değer? Çünkü düz dil belirsizdir ve kodun gerektirdiği güvenilirlik seviyesinde makine tarafından ayrıştırılamaz — "flaky test log'unu kontrol et", farklı parametrelerle bir düzine farklı fonksiyon çağrısı anlamına gelebilir. Bir şema, modeli niyetin belirsiz bir doğal-dil açıklaması yerine kesin, ayrıştırılabilir, çalıştırılabilir bir isteğe (araç adı + tipli parametreler) angaje olmaya zorlar — tıpkı güçlü tipli bir metod imzasının çağıranı belirli argüman tiplerine angaje olmaya zorlaması gibi.`,
          },
          { type: 'heading', text: `Bir Araç Tanımı, JSON Şemasında` },
          {
            type: 'code',
            language: 'json',
            code: {
              tr: `{
  "name": "report_flaky_test",
  "description": "Bilinen bir flaky testi test yönetim sistemine kaydeder",
  "parameters": {
    "type": "object",
    "properties": {
      "test_name": { "type": "string", "description": "Testin tam adı" },
      "reason": { "type": "string", "description": "Neden flaky olduğuna dair kısa açıklama" }
    },
    "required": ["test_name", "reason"]
  }
}`,
              en: `{
  "name": "report_flaky_test",
  "description": "Records a known flaky test in the test management system",
  "parameters": {
    "type": "object",
    "properties": {
      "test_name": { "type": "string", "description": "The full name of the test" },
      "reason": { "type": "string", "description": "A short explanation of why it is flaky" }
    },
    "required": ["test_name", "reason"]
  }
}`,
            },
          },
          {
            type: 'table',
            headers: ['Adım', 'Kim Yapar', 'Ne Olur'],
            rows: [
              ['Aracı kaydet', 'Sen (kodda)', 'Modelin var olduğunu bilmesi için aracın adını, parametrelerini ve amacını tanımla'],
              ['Çağrıyı iste', 'Model', 'Aracı ve argüman değerlerini adlandıran yapılandırılmış bir nesne üretir — bu METİNDİR, henüz hiçbir şey çalışmaz'],
              ['Çağrıyı çalıştır', 'Kodun', 'Yapılandırılmış isteği okur, çalıştırıp çalıştırmayacağına karar verir, ve gerçek fonksiyonu gerçekten çağırır'],
              ['Sonucu gözle', 'Model (sıradaki tur)', 'Gerçek fonksiyonun çıktısını sıradaki kararı için bağlam olarak alır'],
            ],
          },
          toolExecutionAnimation,
          toolExecutionOrder,
          functionCallGatePlayground,
          {
            type: 'quiz',
            question: `Model, bir delete_all_test_data aracını çağırmak için kusursuz biçimlendirilmiş bir istek üretiyor. Mekanik olarak sırada ne olur?`,
            options: [
              { id: 'a', text: 'Araç, model istediği için hemen çalıştırılır' },
              { id: 'b', text: 'Kendiliğinden hiçbir şey çalışmaz — modelin çıktısı hâlâ sadece yapılandırılmış metindir; aracın gerçekten çalışıp çalışmayacağı tamamen kodun o isteği okuyup gerçek fonksiyonu çağırmayı seçip seçmediğine bağlıdır' },
              { id: 'c', text: 'Model veritabanını doğrudan değiştirir' },
              { id: 'd', text: 'İstek tehlikeli göründüğü için otomatik olarak reddedilir' },
            ],
            correct: 'b',
            explanation: `Modelin kendi başına hiçbir çalıştırma yeteneği yoktur — ne kadar tehlikeli görünürse görünsün veya ne kadar iyi biçimlendirilirse biçimlendirilsin bir "istek" metindir. Çalıştırma, tamamen o isteği okuyan kodun verdiği bir karardır — tıpkı bir Java interface'inin somut bir sınıf onu implemente edene kadar hiçbir çalışma zamanı davranışı olmaması gibi.`,
            retryQuestion: {
              question: `Araç tanımları için, modelin niyetini düz İngilizce anlatmasına izin vermek yerine neden katı bir JSON şeması kullanılır?`,
              options: [
                { id: 'a', text: 'JSON gereklidir çünkü modeller İngilizceyi anlayamaz' },
                { id: 'b', text: 'Bir şema, modeli belirsiz bir doğal-dil açıklaması yerine kesin, makine tarafından ayrıştırılabilir bir isteğe (araç adı + tipli parametreler) angaje olmaya zorlar — güçlü tipli bir metod imzasının çağıranı belirli argüman tiplerine angaje olmaya zorlamasıyla aynı sebep' },
                { id: 'c', text: 'JSON şemaları modelin daha hızlı cevap vermesini sağlar' },
                { id: 'd', text: 'Düz İngilizce istekler her zaman daha isabetlidir' },
              ],
              correct: 'b',
              explanation: `Kodun, modelin isteğini güvenilir şekilde ayrıştırıp ona göre hareket etmesi gerekir — doğal dil bu güvenilirlik çıtası için fazla belirsizdir. Bir şema, isteği makine tarafından uygulanabilir kılan tip imzasıdır.`,
            },
          },
        ],
      },
      {
        title: `🐍 OpenAI API: Tester'ın İlk Çağrısı`,
        blocks: [
          {
            type: 'simple-box',
            emoji: '📞',
            content: `OpenAI API'sini ilk kez çağırmak, mutfağa kendin girmek yerine telefonla bir restoran menüsünden sipariş vermeye benzer — mekanizma birebirdir: mutfağın (modelin iç işleyişinin) nasıl çalıştığını bilmen gerekmez; kimlik bilgilerinle (bir API key) bir adrese (bir API endpoint'i) yapılandırılmış bir sipariş (roller içeren bir "mesajlar" listesi) gönderirsin, ve öngörülebilir, ayrıştırılabilir bir şekilde bir cevap gelir — önceki sekmelerdeki tüm pretraining/fine-tuning/RLHF makinesi o tek HTTP çağrısının arkasında tamamen gizlidir. Üzerinde durulmaya değer soru şu: bir tester hiçbir zaman bir model eğitmediyse ve etmeyecekse, önceki sekmelerdeki pretraining ve RLHF'i anlamak bu basit API çağrısını kullanmak için neden önemli? Çünkü API çağrısının davranışı, eğitilmiş modelin davranışının TA KENDİSİDİR — ağırlıkların eğitim kesim tarihinde dondurulduğunu bilmek, API çağrısını nasıl ifade edersen et modelin en yeni kütüphane sürününü neden bilmeyeceğini söyler; RLHF'in özgüven öğrettiğini bilmek, yanlış bir API yanıtının neden hâlâ ikna edici okunduğunu söyler — mekanizma API'nin davranışını açıklar, API sadece ona giden kapıdır. Java karşılaştırması: bu, iyi belgelenmiş bir üçüncü parti kütüphane metodunu, iç implementasyonunu okumana gerek kalmadan çağırmakla birebir aynıdır — belgelenmiş kontrata güvenirsin (mesaj gönder, cevap al), tıpkı bir JDBC sürücüsünün executeQuery()'sini altındaki veritabanı motorunu anlamana gerek kalmadan çağırman gibi. QA tarafındaki bedel: bu, bu sayfada gerçek, çalıştırılabilir kod yazdığın İLK sekmedir — ama Claude AI sayfasının Erişim & Kurulum sekmesindeki disiplin burada da birebir geçerlidir: API key tam olarak bir veritabanı şifresi gibi bir kimlik bilgisidir, ve asla kendi ortam değişkenlerinin dışında hiçbir yere gömülmemeli veya yapıştırılmamalıdır.`,
          },
          { type: 'heading', text: `Kurulum ve Kimlik Doğrulama` },
          {
            type: 'text',
            content: `pip install openai, resmi istemci kütüphanesini kurar. API key, kaynak kodda asla gömülü olmayıp bir ortam değişkeninden okunmalıdır — bu, Claude AI sayfasının Erişim & Kurulum sekmesinde ele alınan aynı disiplindir.`,
          },
          apiKeyCrossCallout,
          { type: 'heading', text: `İlk Chat Completion Çağrın` },
          {
            type: 'code',
            language: 'python',
            code: {
              tr: `from openai import OpenAI

istemci = OpenAI()  # API key'i OPENAI_API_KEY ortam değişkeninden otomatik okur

yanit = istemci.chat.completions.create(
    model="<guncel-model-adi>",  # Güncel model adını resmi OpenAI docs'undan al
    messages=[
        {"role": "system", "content": "Sen kıdemli bir QA mühendisisin."},
        {"role": "user", "content": "Login testi için 3 sınır değer senaryosu yaz."},
    ],
)

print(yanit.choices[0].message.content)`,
              en: `from openai import OpenAI

client = OpenAI()  # Reads the API key automatically from the OPENAI_API_KEY environment variable

response = client.chat.completions.create(
    model="<current-model-name>",  # Get the current model name from the official OpenAI docs
    messages=[
        {"role": "system", "content": "You are a senior QA engineer."},
        {"role": "user", "content": "Write 3 boundary-value scenarios for the login test."},
    ],
)

print(response.choices[0].message.content)`,
            },
          },
          {
            type: 'code',
            language: 'text',
            label: 'Statik örnek çıktı — canlı bir çağrı değil',
            code: {
              tr: `1. Sınır: Şifre tam olarak minimum uzunlukta (8 karakter) -> kabul edilmeli
2. Sınır: Şifre minimum uzunluğun 1 eksiği (7 karakter) -> reddedilmeli
3. Sınır: E-posta alanı maksimum izin verilen karakter sayısında -> kabul edilmeli`,
              en: `1. Boundary: password at exactly the minimum length (8 chars) -> should be accepted
2. Boundary: password one character below the minimum (7 chars) -> should be rejected
3. Boundary: email field at the maximum allowed character count -> should be accepted`,
            },
          },
          { type: 'heading', text: `Mesajlar Listesi: Üç Rol` },
          {
            type: 'text',
            content: `system, kalıcı davranışı ve persona'yı belirler — Prompt Mühendisliği sekmesindeki "rol" bileşeninin API karşılığı. user, gerçek istektir. assistant, çok-turlu bir konuşmaya devam ederken modele kendi önceki turlarını göstermek için kullanılır. Her çağrı varsayılan olarak stateless'tır: konuşma geçmişinin TAMAMI her seferinde yeniden gönderilmelidir — sunucu tarafında bir hafıza yoktur, ki bu iki sekme önce ele alınan aynı context-window mekanizmasıdır.`,
          },
          {
            type: 'text',
            content: `Akıl yürütme: API, sunucunun konuşmayı sadece "hatırlaması" yerine her tek çağrıda tüm mesaj geçmişini yeniden göndermeni neden gerektirir? Çünkü sunucu tarafında konuşma-başına kalıcı bir hafıza yoktur — "hafıza" gönderdiğin mesajlar listesinin TA KENDİSİDİR. Çok-turlu bir konuşma istiyorsan, önceki turları biriktirip yeniden göndermekten SENİN kodun sorumludur; bir mesajı düşürürsen, modelin bunun olduğunu bilmesinin gerçekten başka bir yolu yoktur.`,
          },
          { type: 'heading', text: `Token ve Maliyet, Fiyat Etiketi Olmadan` },
          {
            type: 'text',
            content: `Her API çağrısı token başına faturalandırılır, hem gönderdiğin (girdi) hem modelin ürettiği (çıktı) — daha önceki tokenization kavramı doğrudan geçerlidir: daha uzun, daha ayrıntılı bir prompt daha pahalıya mal olur, ve devasa yapıştırılmış bir log dosyası şaşırtıcı derecede pahalı olabilir. Tam fiyatlar burada bilerek belirtilmiyor çünkü değişirler; ölçekte herhangi bir şey çalıştırmadan önce resmi güncel fiyatlandırma sayfasını kontrol et.`,
          },
          { type: 'heading', text: `Aynı Kavramlar, Farklı Sağlayıcı` },
          {
            type: 'text',
            content: `Bu sayfadaki örnekler OpenAI'ın API'sini kullanıyor çünkü yaygın kullanılan bir referans implementasyondur, ama buradaki her kavram — rollerle bir mesajlar listesi, bir araç/fonksiyon tanımı, bir sistem talimatı — Anthropic API'sinde de esasen aynı şekilde var. Birini öğrenmek neredeyse doğrudan diğerine aktarılır.`,
          },
          {
            type: 'table',
            headers: ['Kavram', 'OpenAI API', 'Anthropic API (kavramsal olarak aynı)'],
            rows: [
              ['İstemci kurulumu', 'OpenAI(), OPENAI_API_KEY\'i env\'den okur', 'Anthropic(), ANTHROPIC_API_KEY\'i env\'den okur'],
              ['Mesaj rolleri', 'system / user / assistant', 'system (ayrı bir parametre) / user / assistant'],
              ['Araç/fonksiyon tanımı', 'tools olarak geçirilen JSON şema', 'tools olarak geçirilen JSON şema (aynı şekil)'],
              ['Konuşma hafızası', 'Sunucu tarafında yok — tüm geçmişi yeniden gönder', 'Sunucu tarafında yok — tüm geçmişi yeniden gönder'],
            ],
          },
          apiCallStepAnimation,
          apiCallOrder,
          openaiFirstCallPlayground,
          {
            type: 'quiz',
            question: `Sunucu konuşmayı otomatik olarak hatırlamak yerine, her tek API çağrısında konuşma geçmişinin TAMAMININ neden yeniden gönderilmesi gerekir?`,
            options: [
              { id: 'a', text: 'Bu sadece yakında kaldırılacak keyfi bir kısıtlamadır' },
              { id: 'b', text: 'Konuşma başına kalıcı bir sunucu-tarafı hafıza yoktur — context-window mekanizması, gönderdiğin mesajlar listesinin modelin konuşma hakkındaki TEK hafızası olduğu anlamına gelir; onu biriktirip yeniden göndermek senin kodunun sorumluluğundadır' },
              { id: 'c', text: 'Geçmişi yeniden göndermek API\'yi daha ucuz yapar' },
              { id: 'd', text: 'Sadece system rolünün yeniden gönderilmesi gerekir, user/assistant mesajlarının değil' },
            ],
            correct: 'b',
            explanation: `Bu, iki sekme önceki context-window mekanizmasının doğrudan, pratik sonucudur: gizli bir sunucu hafızası yoktur, bu yüzden gönderdiğin mesajlar listesi modelin konuşma hakkında bilebileceği her şeyin tamamıdır.`,
            retryQuestion: {
              question: `Bir tester, OpenAI API key'ini doğrudan bir Python script'ine gömüyor ve public bir repository'ye commit ediyor. Claude AI sayfasındaki disiplini uygularsak, doğru tepki nedir?`,
              options: [
                { id: 'a', text: 'Repository hızlıca silinirse hiçbir şey yapmaya gerek yok' },
                { id: 'b', text: 'Key\'i hemen döndür (version control\'den çıktığı için ele geçirilmiş say) ve gerçek key\'i asla commit edilmeyen bir ortam değişkenine taşı — herhangi bir başka kimlik bilgisiyle birebir aynı disiplin' },
                { id: 'c', text: 'Key\'i tutan değişkenin adını, bulunması zor olsun diye değiştir' },
                { id: 'd', text: 'Bu sadece birisi key\'i gerçekten kullanırsa bir sorundur' },
              ],
              correct: 'b',
              explanation: `Public bir repository'yi silmek, zaten görünür olmuş bir key'in maruziyetini geri almaz — version control'den çıkan herhangi bir kimlik bilgisine karşı tek güvenli tepki, Claude AI sayfasında API key'ler için ele alınanla birebir aynı şekilde, döndürmektir.`,
            },
          },
        ],
      },
    ],
  },
}
