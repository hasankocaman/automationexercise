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

// ─── Sayfa verisi ─────────────────────────────────────────────────────────────

export const llmAgentsData = {
  en: {
    hero: {
      title: `🧠 LLM & AI Agents`,
      subtitle: `From Token Prediction to Your Own Test Agent`,
      intro: `You learned how to USE AI for testing on the Claude AI page — this page opens the hood. What is an LLM really doing, how is it trained, what turns it into an agent, and can a tester build and even fine-tune one alone with the OpenAI API? Everything here is hands-on and simulation-backed: you will predict tokens like a model does before you ever call one.`,
    },
    tabs: ['🎯 Intro: The AI, ML & LLM Map', '🧱 What Is an LLM: Tokens & Prediction', '🎓 How LLMs Are Trained: Pretraining', '🎯 Fine-tuning & RLHF', '🧠 Context Window & the Root of Hallucination'],
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
    ],
  },
  tr: {
    hero: {
      title: `🧠 LLM & AI Agent'lar`,
      subtitle: `Token Tahmininden Kendi Test Agent'ına`,
      intro: `Yapay zekayı test işinde KULLANMAYI /claude-ai sayfasında öğrendin — bu sayfa kaputu açıyor. Bir LLM gerçekte ne yapıyor, nasıl eğitiliyor, onu agent'a dönüştüren ne, ve bir tester OpenAI API ile tek başına agent kurabilir hatta eğitebilir mi? Buradaki her şey uygulamalı ve simülasyon destekli: daha bir modeli çağırmadan önce, token'ları bir model gibi kendin tahmin edeceksin.`,
    },
    tabs: ['🎯 Giriş: AI, ML ve LLM Haritası', '🧱 LLM Nedir: Token ve Tahmin Motoru', '🎓 LLM Nasıl Eğitilir: Pretraining', '🎯 Fine-tuning & RLHF', '🧠 Context Window & Halüsinasyonun Kökeni'],
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
    ],
  },
}
