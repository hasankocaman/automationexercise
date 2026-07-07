# LLMCREATE.md — "LLM & AI Agents" Sayfası İş Planı

> **Bu dosya nedir:** `/llm-agents` route'unda yayınlanacak yeni öğrenme sayfasının
> ("LLM nedir, agent nedir, nasıl eğitilir, bir tester OpenAI API ile kendi
> agent'ını kurabilir mi") tasarım ve iş planı. `claudesayfa.md` /
> `contentplan.md` ile aynı format ve disiplindedir.
>
> **İş bölümü:** Her iş paketinin (LC = LLM Create) başında UYGULAYICI yazar:
> - **FABLE** — mimari/etkileşimli bileşen gibi tasarım yoğun işler.
> - **SONNET** — tasarım kararları BU DOSYADA verilmiş içerik paketleri;
>   paketin sonundaki hazır prompt Sonnet'e verilir.
>
> **Okuma sırası:** Önce `CLAUDE.md`, sonra `.claude/NEXT_SESSION.md`, sonra bu
> dosya. `CLAUDE.md` §1.1'deki 4 maddelik checklist her LC sonunda ZORUNLUDUR.

---

## Karar: Ayrı Sayfa (─ /claude-ai'ye eklenmedi)

Kullanıcının sorusu "bu içerik /claude-ai'ye mi, ayrı sayfaya mı?" idi. Karar:
**ayrı sayfa**, dört gerekçeyle:

1. **Konumlandırma farkı:** `/claude-ai` bir ARAÇ İŞ AKIŞI sayfasıdır ("Claude'u
   junior'dan senior'a nasıl kullanırsın"); bu sayfa ise araçtan bağımsız
   TEMEL BİLGİ + KENDİ ELİNLE ÜRETME sayfasıdır ("bu teknoloji içeriden nasıl
   çalışır, kendi agent'ını nasıl yazarsın"). İkisini karıştırmak /claude-ai'nin
   net junior→senior anlatı yayını bozar.
2. **SEO (CLAUDE.md §6):** Her sayfa TEK ana arama niyeti hedefler. "how to use
   Claude for testing" ile "what is an LLM / how are LLMs trained / build an AI
   agent" tamamen ayrı arama niyetleridir.
3. **Araç tarafsızlığı:** /claude-ai bilinçli olarak araç savaşına girmiyor
   (claudesayfa.md "Kapsam Dışı"). Bu sayfa OpenAI API'yi uygulamalı örnek
   olarak kullanacak (kullanıcının açık isteği) — bunu Claude sayfasının içine
   koymak konumlandırmayı bulandırırdı.
4. **Boyut:** /claude-ai zaten 13 sekme. LLM eğitimi + agent inşası ~13 sekme
   daha demek; tek sayfada 26 sekme gezilebilirliği öldürür.

**İlişki:** İki sayfa birbirine `callout` ile bağlanır: /llm-agents "pratikte
Claude'u kullanmayı öğrenmek için → /claude-ai"; ileride /claude-ai'ye de
"motorun içini merak ediyorsan → /llm-agents" callout'u eklenebilir (LC6'da).

---

## Sayfanın Konumlandırması

**Tek cümle:** "Yapay zekayı KULLANMAYI /claude-ai'de öğrendin; burada motor
kaputunu açıyoruz — token tahmininden RLHF'e, function calling'den kendi
yazdığın test agent'ına kadar, bir tester'ın anlaması ve kendi başına
üretebilmesi gereken her şey, tarayıcıdan çıkmadan deneyerek."

**Ana arama niyeti (SEO):** "LLM nedir / AI agent nedir (tester için)".
Problem odaklı alt başlıklar: how LLMs are trained, LLM fine-tuning vs RAG vs
prompting, build an AI test agent with OpenAI API, function calling for QA.

**Hedef kullanıcı farkı:** Sayfa matematik/araştırma sayfası DEĞİLDİR — hedef,
Core Java bilen bir QA mühendisinin (1) mülakatta "LLM nedir, nasıl eğitilir"
sorusuna mühendis gibi cevap verebilmesi, (2) OpenAI API ile kendi başına
küçük bir agent yazabilmesi, (3) "agent eğitilir mi?" sorusuna doğru çerçeveyle
(çoğu zaman eğitmezsin: prompt/RAG/function calling yönlendirir) yaklaşabilmesi.

---

## Nihai Sekme Mimarisi (13 sekme — temelden üretime sırası)

| # | Sekme | Paket | Durum |
|---|-------|-------|-------|
| 0 | 🎯 Giriş: AI, ML ve LLM Haritası | LC1 (FABLE) | ✅ bu oturumda yazıldı |
| 1 | 🧱 LLM Nedir: Token ve Tahmin Motoru | LC1 (FABLE) | ✅ bu oturumda yazıldı (Token Lab dahil) |
| 2 | 🎓 LLM Nasıl Eğitilir: Pretraining | LC2 (SONNET) | ⬜ |
| 3 | 🎯 Fine-tuning & RLHF | LC2 (SONNET) | ⬜ |
| 4 | 🧠 Context Window & Halüsinasyonun Kökeni | LC2 (SONNET) | ⬜ |
| 5 | 🤖 Agent Nedir: LLM + Araçlar + Döngü | LC3 (SONNET) | ⬜ |
| 6 | 🔧 Function Calling: Agent'ın Elleri | LC3 (SONNET) | ⬜ |
| 7 | 🐍 OpenAI API: Tester'ın İlk Çağrısı | LC3 (SONNET) | ⬜ |
| 8 | 🛠️ Kendi Test Agent'ını Yaz | LC4 (SONNET) | ⬜ |
| 9 | 🎓 Agent "Eğitilir mi"? Prompt vs RAG vs Fine-tune | LC4 (SONNET) | ⬜ |
| 10 | 🏭 Üretimde AI: Maliyet, Evals, Güvenlik | LC5 (SONNET) | ⬜ |
| 11 | 🚨 Riskler & Yaygın Hatalar | LC5 (SONNET) | ⬜ |
| 12 | 💼 Mülakat Soruları & Cevapları | LC6 (SONNET) | ⬜ |

**Sekme ekleme kuralı (claudesayfa.md ile aynı):** Yeni sekmeler HER ZAMAN
sona eklenir. Sayfa LC6 bitmeden **main'e merge edilmez** — `progressMigration`
gerekmez. Tüm LC paketleri `feature/llm-agents-page` branch'inde birikir.

**Branch stratejisi:** `feature/llm-agents-page`, `feature/claude-ai-page`'in
UCUNDAN açıldı (bd3c939). Sebep: iki sayfa aynı ortak dosyalara dokunuyor
(App.jsx, seo.js, generate-static-routes.mjs, test route listeleri) — claude-ai
üstüne inşa etmek merge çakışmasını sıfırlar ve /claude-ai çapraz referanslarını
geçerli kılar. Merge sırası: önce `feature/claude-ai-page` → main, sonra bu
branch → main (veya claude-ai merge edildikten sonra bu branch rebase edilmeden
doğrudan merge edilebilir — git ataları zaten doğru).

---

## Genel Kurallar (her LC paketi için geçerli)

1. **Bir oturumda bir paket.** Bitir, §1.1 checklist'i koş, kullanıcı onayıyla
   commit et, `NEXT_SESSION.md`'ye işle.
2. İçerik SADECE `src/data/llmAgentsData.js`'e yazılır (EN+TR simetrik;
   paylaşılan bilingual bloklar const olarak — dosyadaki mevcut desen).
3. **Blok formatları claudesayfa.md Genel Kurallar §3 ile birebir aynıdır**
   (simple-box §9.3 4 katman; quiz dil-başına + retryQuestion; challenge/
   step-animation/code-playground/callout bilingual-per-block; relatedTopicId
   zorunlu; code blokları {tr,en} + TR yorumlar Türkçe; benzersiz hint'ler).
4. **Kod dili:** Uygulamalı örnekler Python'dadır (OpenAI API örnekleri dahil)
   — tester kitlesi için en erişilebilir dil; her Python örneğinde kısa Java
   paraleli anlatı içinde verilir (§15 Java analojisi kuralı).
5. **Sürüm/model adı sabitleme YASAK:** "GPT'nin güncel modeli", "OpenAI'ın
   hızlı/küçük modeli", "Claude'un güçlü modeli" gibi jenerik ifadeler kullan.
   Kod örneklerinde model parametresi `model="<guncel-model-adi>"` gibi yer
   tutucuyla yazılır ve altındaki metin "güncel model adını resmi docs'tan al"
   der. API fiyatları YAZILMAZ (çabuk eskir) — "token başına ücretlendirilir,
   güncel fiyat tablosuna bak" denir.
6. **Gerçek API çağrısı sayfada YAPILMAZ** (claudesayfa.md ile aynı ilke):
   sayfadaki tüm çıktılar deterministik simülasyon/statik örnek çıktıdır.
   OpenAI API sekmeleri kullanıcının KENDİ terminalinde koşacağı kod öğretir;
   her böyle örneğin yanında maliyet/API key güvenliği uyarısı olur.
7. **OpenAI anlatımı tarafsız çerçevede:** "Bu sayfadaki API örnekleri OpenAI
   üzerinden; aynı kavramlar (mesaj listesi, tool tanımı, sistem talimatı)
   Anthropic API'de de birebir vardır" cümlesi sekme 7'de açıkça yer alır.
8. Her LC sonunda doğrulama: `node scripts/check-content-integrity.mjs` →
   `npm run build` → `npx playwright test tests/token-lab.spec.ts` (regresyon)
   → TR yorum taraması.

---

## LC1 — İskelet + Token Lab + İlk 2 Sekme
**UYGULAYICI: FABLE — ✅ BU OTURUMDA TAMAMLANDI**

Yapılanlar:
1. **Route iskeleti:** `src/App.jsx` (`/llm-agents` + lazy `LlmAgentsPage`),
   `src/utils/seo.js` (ROUTE_SEO girişi), `src/components/LlmAgentsPage.jsx`
   (TopicPage sarmalayıcı, mor/violet gradient), `scripts/generate-static-routes.mjs`
   (`DATA_MODULES` girişi).
2. **`src/components/TokenPredictorBlock.jsx` (YENİ interaktif bileşen — Token Lab):**
   Sayfanın "sandbox"ı. LLM'in çekirdek mekanizmasını (next-token prediction)
   YAŞATIR: kullanıcı 3 hazır bağlamdan birini seçer, model adayı token'ları
   olasılıklarıyla görür, tıklayarak/greedy/sample ile cümleyi token token
   kurar. Temperature slider'ı GERÇEK softmax yeniden ağırlıklandırması yapar
   (p^(1/T) normalize). "Jaguar" ikiz senaryosu bağlamın dağılımı nasıl
   değiştirdiğini, düşük olasılıklı "tuhaf" token yolu halüsinasyonun kökenini
   gösterir. 5 görev (mission). `TopicPage.jsx`'e `token-lab` tipi kaydedildi.
3. **`src/data/llmAgentsData.js`:** hero + 2 sekme (Giriş: AI/ML/LLM Haritası,
   LLM Nedir: Token ve Tahmin) EN+TR simetrik; §9.3 simple-box'lar,
   step-animation, order-sort, tokenization code bloğu, Token Lab + görevler,
   /claude-ai çapraz callout, quiz+retryQuestion.
4. **`tests/token-lab.spec.ts`:** greedy ile cümle tamamlama + görev işlenmesi,
   tuhaf-token (halüsinasyon) yolu, temperature+sample, EN mod kontrolü.

---

## LC2 — Eğitim Katmanı: Pretraining, Fine-tuning/RLHF, Context & Halüsinasyon (sekme 2-4)
**UYGULAYICI: SONNET**

Tasarım kararları (Sonnet değiştirmez):
- Sekme 2 🎓 Pretraining: internet ölçeğinde metinden next-token tahmini öğrenme;
  "loss" kavramı sezgisel (tahmin-gerçek farkı); neden GPU/aylar/milyonlarca
  dolar; "model ağırlıkları" kavramı (Java'daki derlenmiş .class dosyası
  analojisi: kaynak veriyi değil, ondan damıtılmış davranışı taşır); tester
  bağı: eğitim verisi kesim tarihi → modelin senin yeni framework sürümünü
  bilmemesi (/claude-ai Riskler sekmesindeki "eski syntax" hatasının KÖKENİ).
- Sekme 3 🎯 Fine-tuning & RLHF: pretrained "ham tamamlayıcı"dan asistana
  dönüşüm; SFT (örnek diyaloglarla süpervizyon); RLHF sezgisel ("iki cevaptan
  hangisi daha iyi" insan tercihi → ödül modeli); alignment kavramı tek
  paragraf; tester bağı: modelin "yardımcı olma" eğilimi = boşluğu doldurma
  eğilimi = halüsinasyonun davranışsal kökü.
- Sekme 4 🧠 Context Window & Halüsinasyon: context window = modelin TEK
  hafızası (Java'da method-local scope analojisi: çağrı bitince yok);
  token limiti; uzun konuşmada erken kararların "odaktan düşmesi"
  (/claude-ai'deki bağlam-kaybı hatasının mekanik açıklaması); halüsinasyonun
  KÖKENİ: model "bilmiyorum" üretmek yerine en olası devamı üretir — Token
  Lab'daki düşük-olasılık yolunun büyük ölçekli hali (sekme 1'e callout).
- Her sekme: §9.3 simple-box (İLK blok) + ≥1 step-animation + ≥1 order-sort +
  ≥1 code-playground + quiz+retryQuestion. Bu sekmelerde "kod" çoğunlukla
  kavramsal akış/pseudocode veya sayısal örnek olabilir; pseudocode TR tarafta
  Türkçe yorumlu yazılır.

**SONNET PROMPTU (LC2):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra llmcreate.md'yi (bu plan) oku.
feature/llm-agents-page branch'inde olduğunu ve LC1'in bitmiş olduğunu doğrula
(src/data/llmAgentsData.js'te 2 sekme mevcut olmalı; değilse DUR ve bildir).

GÖREV — LC2: src/data/llmAgentsData.js'e 3 yeni sekme ekle (mevcutların
ARKASINA, en+tr simetrik):
  2: '🎓 LLM Nasıl Eğitilir: Pretraining' / '🎓 How LLMs Are Trained: Pretraining'
  3: '🎯 Fine-tuning & RLHF' / '🎯 Fine-tuning & RLHF'
  4: '🧠 Context Window & Halüsinasyonun Kökeni' / '🧠 Context Window & the Root of Hallucination'
Konu kapsamı llmcreate.md LC2 bölümünde YAZILI — dışına çıkma. Matematik
derinliğine girme (gradyan formülü vb. YOK) — sezgisel mekanizma + QA bağı.

ZORUNLU FORMAT KURALLARI: llmcreate.md "Genel Kurallar" 1-8 maddeleri aynen
(özellikle: §9.3 simple-box 4 katman, her sekmede step-animation + order-sort +
code-playground + quiz+retry, relatedTopicId + benzersiz hint, TR yorumlar
Türkçe, EN section'a Türkçe karakter sızdırma — /llm-agents artık
i18n-content-toggle listesinde DEĞİL ama LC6'da eklenecek, şimdiden temiz yaz.
Sürüm/fiyat sabitleme YASAK).
Ek: Sekme 4'te Token Lab'a (sekme 1) geri referans veren bir callout ekle
("düşük olasılıklı token yolunu Token Lab'da kendin denemiştin...").

BİTİRME KRİTERİ (hepsini KENDİN koş):
  a) node scripts/check-content-integrity.mjs → 0 ihlal
  b) npm run build → PASS
  c) npx playwright test tests/token-lab.spec.ts → PASS (regresyon)
  d) Eklediğin TÜM TR metinleri tek tek oku, İngilizce açıklama cümlesi yok.
Bitince NEXT_SESSION.md'ye LC2 bölümü ekle, commit ATMA, kullanıcı onayı iste.
```

---

## LC3 — Agent Katmanı: Agent Nedir, Function Calling, OpenAI API (sekme 5-7)
**UYGULAYICI: SONNET**

Tasarım kararları:
- Sekme 5 🤖 Agent Nedir: chatbot vs agent farkı (cevap veren vs eylem yapan);
  algıla→düşün→eyle→gözle döngüsü; /claude-ai'deki Claude Code ve MCP
  sekmelerine çapraz callout ("bu döngünün ticari örneklerini orada gördün");
  Java analojisi: while döngüsü içinde strateji deseni.
- Sekme 6 🔧 Function Calling: LLM'in kendisi kod ÇALIŞTIRAMAZ — araç
  tanımlarını görür, "şu aracı şu parametrelerle çağır" diye YAPILANDIRILMIŞ
  istek üretir, çalıştıran senin kodundur (bu ayrım sınav sorusu kalitesinde
  vurgulanır); JSON şema ile araç tanımı örneği; Java analojisi: interface
  tanımı (LLM interface'i görür, implementasyonu sen sağlarsın).
- Sekme 7 🐍 OpenAI API: pip install openai; API key'i environment variable'da
  tutma (/claude-ai Erişim sekmesindeki aynı güvenlik disiplini, callout);
  ilk chat completion çağrısı (Python, TR yorumlu, model adı yer tutucu);
  messages listesi (system/user/assistant rolleri); token sayımı ve maliyet
  kavramı (fiyat YAZMADAN); "aynı kavramlar Anthropic API'de birebir var"
  paragrafı (Genel Kurallar madde 7). Statik örnek çıktı gösterilir, sayfada
  canlı çağrı yok.
- Her sekmede etkileşim zorunlulukları aynı.

**SONNET PROMPTU (LC3):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra llmcreate.md'yi oku.
feature/llm-agents-page branch'inde olduğunu ve LC2'nin bitmiş olduğunu doğrula
(sekme 2-4 mevcut; değilse DUR ve bildir).

GÖREV — LC3: src/data/llmAgentsData.js'e 3 yeni sekme ekle (en+tr simetrik):
  5: '🤖 Agent Nedir: LLM + Araçlar + Döngü' / '🤖 What Is an Agent: LLM + Tools + Loop'
  6: '🔧 Function Calling: Agent\'ın Elleri' / '🔧 Function Calling: The Agent\'s Hands'
  7: '🐍 OpenAI API: Tester\'ın İlk Çağrısı' / '🐍 OpenAI API: A Tester\'s First Call'
Konu kapsamı llmcreate.md LC3 bölümünde yazılı — dışına çıkma.

ZORUNLU FORMAT KURALLARI: llmcreate.md Genel Kurallar 1-8 aynen. Ek olarak:
- Python kod örnekleri {tr,en} bilingual, TR tarafta TÜM yorumlar Türkçe.
- Model adları yer tutucu: model="<guncel-model-adi>" + "resmi docs'tan al" notu.
- API fiyatı/limit sayısı YAZMA. Gerçek API çağrısı sayfada YOK — statik örnek
  çıktı göster, kullanıcının kendi terminalinde koşması için anlat.
- Sekme 6'da "LLM kod çalıştırmaz, çağrı İSTEĞİ üretir" ayrımı en az bir quiz
  sorusunun konusu olmalı.
- Sekme 7'de API key güvenliği için /claude-ai Erişim & Kurulum sekmesine
  callout ver (aynı disiplini tekrarlama, oraya bağla + tek cümle özetle).

BİTİRME KRİTERİ: LC2 promptundaki a-b-c-d aynen. NEXT_SESSION.md'ye LC3 bölümü
ekle, commit ATMA, kullanıcı onayı iste.
```

---

## LC4 — Üretim Katmanı: Kendi Agent'ın + "Eğitilir mi?" Gerçeği (sekme 8-9)
**UYGULAYICI: SONNET**

Tasarım kararları:
- Sekme 8 🛠️ Kendi Test Agent'ını Yaz: uçtan uca KÜÇÜK ama GERÇEK bir örnek —
  "flaky test raporu agent'ı": Python script'i (1) test log dosyasını okur,
  (2) OpenAI API'ye function calling ile verir, (3) model `report_flaky(test_name,
  reason)` aracını çağırmak isteyince script gerçek fonksiyonu çalıştırıp sonucu
  geri verir, (4) döngü final cevaba kadar döner. ~40-60 satır, parça parça
  anlatılır (kod duvarı YOK — CLAUDE.md kod duvarı kuralları), her parçada TR
  yorum. Güvenlik: agent'a dosya SİLME yetkisi verilmez, sadece okuma —
  /claude-ai izin modu disipliniyle bağ.
- Sekme 9 🎓 Agent "Eğitilir mi"?: kullanıcının sorusunun TAM cevabı. Çerçeve:
  bir tester'ın elindeki 4 seviye — (1) PROMPT (sistem talimatı; %90 ihtiyaç
  bununla çözülür, ücretsiz, anında), (2) RAG (şirket dokümanlarını bağlama
  getirme; "eğitim" değil, açık-kitap sınav), (3) FINE-TUNing (OpenAI'ın
  fine-tuning API'siyle davranış/format öğretme; veri seti hazırlamak asıl iş,
  JSONL örneği gösterilir; ne zaman GEREKMEZ listesi ne zaman gerekir
  listesinden uzun olmalı), (4) SIFIRDAN EĞİTİM (pretraining — bir tester'ın
  veya çoğu şirketin ligi değil, sekme 2'ye callout). Karar tablosu: senaryo →
  doğru seviye. "Tester kendi başına OpenAI ile agent kullanabilir mi?" → EVET
  (sekme 7-8 bunu yaptırdı); "eğitebilir mi?" → fine-tuning API'siyle davranış
  düzeyinde evet, ama çoğu QA ihtiyacında YANLIŞ ilk hamle — önce prompt/RAG.
- Her sekmede etkileşim zorunlulukları aynı.

**SONNET PROMPTU (LC4):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra llmcreate.md'yi oku.
feature/llm-agents-page branch'inde olduğunu ve LC3'ün bitmiş olduğunu doğrula
(sekme 5-7 mevcut; değilse DUR ve bildir).

GÖREV — LC4: src/data/llmAgentsData.js'e 2 yeni sekme ekle (en+tr simetrik):
  8: '🛠️ Kendi Test Agent\'ını Yaz' / '🛠️ Build Your Own Test Agent'
  9: '🎓 Agent "Eğitilir mi"? Prompt vs RAG vs Fine-tune' / '🎓 Can You "Train" an Agent? Prompt vs RAG vs Fine-tune'
Konu kapsamı ve sekme 8'deki flaky-agent örneğinin akışı llmcreate.md LC4
bölümünde yazılı — dışına çıkma.

ZORUNLU FORMAT KURALLARI: llmcreate.md Genel Kurallar 1-8 aynen. Ek olarak:
- Sekme 8'deki agent kodu TEK kod duvarı olarak verilemez — kavram başına
  parçalara böl (dosya okuma / araç tanımı / API döngüsü / güvenlik sınırı),
  her parçanın ardına CLAUDE.md §9.1 üçlüsünden uygun olanları koy.
- Sekme 9'da karar tablosu zorunlu (senaryo → prompt/RAG/fine-tune/hiçbiri).
- Fine-tuning JSONL örneği {tr,en} bilingual, TR yorumlu.
- "Ne zaman fine-tune GEREKMEZ" listesi "ne zaman gerekir"den uzun olmalı.

BİTİRME KRİTERİ: LC2 promptundaki a-b-c-d aynen. NEXT_SESSION.md'ye LC4 bölümü
ekle, commit ATMA, kullanıcı onayı iste.
```

---

## LC5 — Üretim & Riskler (sekme 10-11)
**UYGULAYICI: SONNET**

Tasarım kararları:
- Sekme 10 🏭 Üretimde AI: token maliyeti yönetimi (kısa prompt ≠ ucuz prompt
  her zaman; cache kavramı tek paragraf); evals kavramı — AI çıktısını test
  etmek de bir QA işidir (altın set + otomatik karşılaştırma; tester'ın yeni
  iş alanı olarak evals); rate limit ve retry disiplini; güvenlik: prompt
  injection kavramı TEK sekme-altı konu olarak (agent'ına gelen veri talimat
  içerirse ne olur — test log'una gömülü "ignore previous instructions"
  örneği; QA bağı: agent'ını test ETMEK de senin işin).
- Sekme 11 🚨 Riskler & Yaygın Hatalar: `error-dictionary` ≥8 senaryo —
  örnek liste: (1) API key'i koda gömüp repo'ya push etme, (2) rate limit'e
  takılıp retry'sız çökme, (3) function calling yanıtını parse etmeden
  varsayma (model bazen araç ÇAĞIRMAZ, düz metin döner), (4) agent döngüsüne
  max-adım sınırı koymama (sonsuz döngü + maliyet patlaması), (5) prompt
  injection'la agent'ın yanlış aracı çağırması, (6) fine-tune verisine gerçek
  müşteri verisi koyma, (7) temperature=0 sanıp deterministik çıktı bekleme
  (aynı girdiyle bile değişebilir), (8) token limitini aşan log dosyasını
  API'ye gönderip kesilen/başarısız yanıt alma. relatedTopicId zorunlu,
  codeWrong/codeFixed TR yorumlu.
- Ton: /claude-ai Riskler sekmesiyle aynı — korkutma değil "senior böyle korunur".

**SONNET PROMPTU (LC5):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi,
sonra .claude/NEXT_SESSION.md'yi, sonra llmcreate.md'yi oku.
feature/llm-agents-page branch'inde olduğunu ve LC4'ün bitmiş olduğunu doğrula
(sekme 8-9 mevcut; değilse DUR ve bildir).

GÖREV — LC5: src/data/llmAgentsData.js'e 2 yeni sekme ekle (en+tr simetrik):
  10: '🏭 Üretimde AI: Maliyet, Evals, Güvenlik' / '🏭 AI in Production: Cost, Evals, Security'
  11: '🚨 Riskler & Yaygın Hatalar' / '🚨 Risks & Common Mistakes'
Konu kapsamı ve 8 hata senaryosu listesi llmcreate.md LC5 bölümünde yazılı.

ZORUNLU FORMAT KURALLARI: llmcreate.md Genel Kurallar 1-8 aynen. Ek olarak:
- Sekme 11'de error-dictionary ≥8 senaryo (liste LC5'te), relatedTopicId
  zorunlu, codeWrong/codeFixed TR yorumları Türkçe.
- Prompt injection anlatımı savunma odaklı tutulur: amaç tester'ın kendi
  agent'ını bu zafiyete karşı TEST edebilmesi; saldırı tarifnamesi değil,
  tek zararsız gösterim örneği + savunma teknikleri (girdi/talimat ayrımı,
  araç yetki sınırı, çıktı doğrulama).
- Fiyat sayısı YAZMA; "token başına, güncel tabloya bak" de.

BİTİRME KRİTERİ: LC2 promptundaki a-b-c-d aynen. NEXT_SESSION.md'ye LC5 bölümü
ekle, commit ATMA, kullanıcı onayı iste.
```

---

## LC6 — Mülakat (50 soru) + Denetim/Test Entegrasyonu + Yayın Hazırlığı
**UYGULAYICI: SONNET** — **merge/push kararı kullanıcının.**

Tasarım kararları:
- Sekme 12 💼 Mülakat: `interview-questions`, §10 dağılımı (15/20/15, ≥50),
  senaryo tabanlı, her cevap 3-6 cümle + Java/klasik-otomasyon karşılaştırması,
  relatedTopicId zorunlu. Konular 12 sekmenin TAMAMINDAN (token/tahmin,
  pretraining vs fine-tune, context window, agent döngüsü, function calling
  ayrımı, RAG vs fine-tune kararı, evals, prompt injection savunması...).
- `scripts/audit-interview-questions.mjs` PAGES'e
  `{ route: '/llm-agents', file: 'llmAgentsData.js', exportName: 'llmAgentsData' }`.
- `tests/topic-pages-ui.spec.ts` + `tests/i18n-content-toggle.spec.ts` route
  listelerine `/llm-agents` eklenir (sayfa istisna DEĞİL, §22.1 kapsamına girmez).
- **Ana sayfa butonu bu pakette eklenir:** `HomePage.jsx` "Test Otomasyon"
  kategorisine, 🤖 Claude AI butonunun yanına `🧠 LLM & Agents` butonu
  (nb('violet'), data-testid="nav-llm-agents"). Claude AI butonundaki "YENİ"
  rozeti kalır; yeni butona rozet eklenmez (iki YENİ rozeti enflasyon yaratır).
- /claude-ai tarafına tek `callout` eklenir (Giriş sekmesine): "motorun içini
  merak ediyorsan → /llm-agents" (tek blok, claudeAiData.js'e dokunuşun tamamı bu).
- Mülakat gating spot-check (§22 kontrol 2 deseni, yaz-koş-sil).

**SONNET PROMPTU (LC6):**

```text
d:\ANTIGRAVITY\automationexercise projesinde çalışıyorsun. Önce CLAUDE.md'yi
(özellikle §10 ve §22), sonra .claude/NEXT_SESSION.md'yi, sonra llmcreate.md'yi
oku. feature/llm-agents-page branch'inde olduğunu ve LC5'in bitmiş olduğunu
doğrula (sekme 0-11 mevcut; değilse DUR ve bildir).

GÖREV — LC6 (5 parça):
1. src/data/llmAgentsData.js'e son sekmeyi ekle (en+tr simetrik):
   12: '💼 Mülakat Soruları & Cevapları' / '💼 Interview Q&A'
   ≥50 soru (15/20/15), senaryo tabanlı, relatedTopicId, her cevap 3-6 cümle +
   Java/klasik-otomasyon karşılaştırması, 12 sekmenin tamamından konu.
2. scripts/audit-interview-questions.mjs PAGES listesine
   { route: '/llm-agents', file: 'llmAgentsData.js', exportName: 'llmAgentsData' } ekle.
3. tests/topic-pages-ui.spec.ts ve tests/i18n-content-toggle.spec.ts route
   dizilerine '/llm-agents' ekle.
4. src/components/HomePage.jsx "Test Otomasyon" kategorisine, Claude AI
   butonunun hemen ardına şu butonu ekle (rozet YOK):
   <Link to="/llm-agents" data-testid="nav-llm-agents" className={nb('violet')}>🧠 LLM & Agents</Link>
5. src/data/claudeAiData.js Giriş sekmesine (EN+TR, mevcut qaAssistantCallout
   deseninde) /llm-agents'a yönlendiren TEK bir callout ekle — claudeAiData.js'e
   başka HİÇBİR dokunuş yapma.

ZORUNLU FORMAT KURALLARI: llmcreate.md Genel Kurallar 1-8 aynen.

BİTİRME KRİTERİ (hepsi):
  a) node scripts/check-content-integrity.mjs → 0 ihlal
  b) npm run audit:interview-questions → /llm-agents ✅ OK (≥50, 15/20/15)
  c) npm run build → PASS
  d) npx playwright test tests/topic-pages-ui.spec.ts -g llm-agents → PASS
  e) npx playwright test tests/i18n-content-toggle.spec.ts -g llm-agents → PASS
  f) npx playwright test tests/token-lab.spec.ts → PASS (regresyon)
  g) npx playwright test tests/claude-prompt-lab.spec.ts → PASS (claudeAiData
     callout dokunuşunun regresyonu)
  h) Mülakat gating spot-check: /llm-agents'ta quiz %0 iken Mülakat sekmesi
     kilitli (yaz-koş-sil, §22 kontrol 2).
Bitince NEXT_SESSION.md'ye LC6 bölümü ekle ("sayfa main'e merge'e hazır" notu
dahil), commit ATMA, kullanıcı onayı iste. Merge/push kararı kullanıcınındır.
```

---

## Kapsam Dışı (bilinçli kararlar)

- **Matematik derinliği yok:** gradyan/backprop formülleri, transformer
  mimarisinin katman detayı (attention matrisleri vb.) anlatılmaz — "sezgisel
  mekanizma + QA bağı" seviyesi korunur. Attention TEK cümlelik sezgiyle
  geçilir ("model, tahmin yaparken bağlamdaki hangi kelimelere bakacağını
  öğrenir").
- **Sayfada canlı API çağrısı yok** — tüm çıktılar statik/simüle;
  gerçek koşum kullanıcının terminalinde (maliyet + key güvenliği uyarılı).
- **Framework turu yok:** LangChain/LlamaIndex/AutoGen gibi kütüphaneler
  anlatılmaz — agent döngüsü SAF Python + API ile kurulur ki mekanizma
  görünsün; "bu kütüphaneler aynı döngüyü paketler" tek cümle yeter.
- **Görüntü/ses modelleri yok:** sayfa metin LLM'leri ve agent'larla sınırlı;
  multimodal tek paragrafta "aynı tahmin ilkesi, farklı girdi" diye geçilir.
- **Vendor karşılaştırma tablosu yok:** OpenAI örnek API'dir, Anthropic
  eşdeğerliği tek paragrafta söylenir; "hangisi daha iyi" tartışması yapılmaz.
