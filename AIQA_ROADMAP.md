# learnqa.dev — AI QA Genişleme Yol Haritası
> Hazırlanma tarihi: Temmuz 2025  
> Kapsam: `/claude-ai` + `/llm-agents` sayfaları  
> Referans iş ilanı: AI QA Engineer — QualityKiosk Technologies  
> Tetikleyici prompt: "Prompt-Based Testing → RAG → Adversarial Testing" vizyonu

---

## 0. Mevcut Durum Fotoğrafı

> **GÜNCELLEME (2026-07-09): Bu bölümdeki durum aşağıda ✅ ile güncellendi —
> tüm modüller implemente edildi ve `main`'e commit edildi. Bu tabloların
> kendisi artık "yapılacaklar" değil, "ne zaman/nasıl yapıldığının" kaydıdır;
> hangi commit'in hangi modülü getirdiği için `.claude/NEXT_SESSION.md`'ye bak.**

### `/claude-ai` — Ne var, ne eksik?

| Mevcut Modül | Durum |
|---|---|
| Prompt Engineering | ✅ Var |
| Access & Setup | ✅ Var |
| Test Case Generation | ✅ Var |
| Bug Analysis & Reporting | ✅ Var |
| Test Data Generation | ✅ Var |
| UI Automation (Selenium/PW) | ✅ Var |
| API Testing | ✅ Var |
| **LLM-as-a-Judge / Prompt-Based Testing** | ✅ Yapıldı — Modül C-3, "⚖️ Yargıç Olarak Claude" sekmesi |
| **Claude Vision → Visual Regression** | ✅ Yapıldı — Modül C-4, "🕵️ AI Vision: Visual Regression Testing" sekmesi (Anthropic Claude Vision yerine Groq vision modeliyle, bkz. §3.1 istisna notu) |
| **Edge-case üretimi + QA değerlendirme** | ✅ Yapıldı — Modül C-5, "🏭 Edge Case Factory" sekmesi |
| **Non-deterministic davranış test etme** | ✅ Yapıldı — Modül L-2 olarak `/llm-agents` sayfasında (bu tablo `/claude-ai` için ama kapsam mantığı gereği L-2 diğer sayfaya kondu) |

### `/llm-agents` — Ne var, ne eksik?

| Mevcut Modül | Durum |
|---|---|
| AI/ML/LLM Map | ✅ Var |
| Tokens & Prediction | ✅ Var |
| Pretraining | ✅ Var |
| Fine-tuning & RLHF | ✅ Var |
| Context Window & Hallucination | ✅ Var |
| Agent = LLM + Tools + Loop | ✅ Var |
| Function Calling | ✅ Var |
| OpenAI API basics | ✅ Var |
| **Deterministik vs Stokastik Test (görsel)** | ✅ Yapıldı — Modül L-2, "⚖️ Deterministic vs Stochastic Testing" sekmesi |
| **Multi-turn Conversation Testing** | ✅ Yapıldı — Modül L-3, "📉 Multi-turn Conversation & Drift Testing" sekmesi |
| **Memory / Context Drift Testing** | ✅ Yapıldı — L-3'ün Drift Metre bileşeni içinde (ayrı bir modül olarak değil, L-3 ile birleşik) |
| **RAG Pipeline Testing (hallucination, grounding, relevance)** | ✅ Yapıldı — Modül L-4, "🔍 RAG Pipeline Testing" sekmesi |
| **Adversarial Testing & Red Teaming / Prompt Injection oyunu** | ✅ Yapıldı — Modül L-6, "🕵️‍♂️ Adversarial Testing & Red Teaming" sekmesi |
| **AI Observability (Phoenix/Giskard mantığı)** | ✅ Yapıldı — Modül L-5, "📡 AI Observability" sekmesi (mock dashboard + platform karşılaştırma tablosu) |
| **Evaluation Reports & Structured Test Summaries** | ⚠️ Kısmen — L-5'in metninde kavramsal olarak değinildi ("evaluation report nasıl yazılır" pratiği), ama Faz 3 tablosundaki ayrı "L-5: Evaluation Report Şablonu" alt-kalemi (bağımsız bir rapor-yazma şablonu/egzersizi) HENÜZ ayrı bir interaktif araç olarak yapılmadı — bkz. §8 not |

### İş İlanı Gap Analizi (QualityKiosk AI QA Engineer)

İlanın "Must-Have" kriterlerine karşı mevcut içerik örtüşmesi:

| İlan Kriteri | Mevcut Kapsam | Eklenecek |
|---|---|---|
| GenAI bots / chatbots / copilots testi | ✅ Yapıldı | Modül C-4, L-3 |
| RAG pipeline testi | ✅ Yapıldı | Modül L-4 |
| AI evaluation platforms (Arize, Phoenix…) | ✅ Yapıldı | Modül L-5 |
| Prompt-based test senaryoları | ✅ Yapıldı | Modül C-3 |
| Multi-turn conversation tests | ✅ Yapıldı | Modül L-3 |
| Hallucination / Grounding / Drift tespiti | ✅ Yapıldı | Modül L-4 |
| Adversarial evaluations | ✅ Yapıldı | Modül L-6 |
| Non-deterministic AI behavior anlayışı | ✅ Yapıldı | Modül L-2 |
| Evaluation reports / dashboards | ✅ Dashboard yapıldı (L-5) — ayrı rapor şablonu egzersizi kısmen | Modül L-5 |

---

## 1. `/claude-ai` Sayfası — Yeni Modüller

### Modül C-3: LLM-as-a-Judge & Prompt-Based Testing

**Ders Adı:** "Yargıç Olarak Claude: Yapay Zekayı Test Etmek İçin Yapay Zeka Kullanmak"

**Öğretilecek Temel Kavram:**  
Bir LLM'in çıktısını değerlendirmek için başka bir LLM kullanmak — bu tekniğe "LLM-as-a-Judge" denir. Geleneksel QA'da assertion deterministiktir: `assertEqual("Beklenen", actual)`. AI QA'da ise assertion bir rubrik olur ve başka bir model bu rubriğe göre puanlar.

**Analoji (learnqa.dev stilinde):**  
> LLM-as-a-Judge, bir sınav kağıdını öğretmenin notlamasına benzer — ama öğretmen de aynı müfredatı okumuş bir AI'dır. Mekanizma birebir örtüşür: "doğru cevap tek bir karakter" değil, "cevap şu kriterleri karşılıyor mu?" sorusudur.

**Sitede Olacak İnteraktif Element:**  
- **"Judge Playground"** — Sol panel: kullanıcı bir chatbot yanıtı yazar (veya örnek yanıt seçer). Sağ panel: Groq API üzerinden değerlendirici LLM'e gönderilir, 4 kriter üzerinden (doğruluk, alaka, güvenlik, özlülük) 1-5 arası puan döner. Puanlar anlık bar chart olarak görselleştirilir.
- **Rubrik Builder** — Kullanıcı kendi değerlendirme kriterlerini oluşturur (drag-drop ile öncelik sırası), sistem bu kriterleri sistem promptuna dönüştürür.

**QA İçin Gerçek Hayat Pratiği:**  
- Müşteri hizmetleri chatbot'ının 50 yanıtını toplu olarak LLM-judge ile değerlendirme senaryosu
- RAGAS (RAG evaluation framework) metrik mantığını anlatma
- Puanlama tutarlılığını (inter-rater reliability) test etme egzersizi

**Teknik Uygulama:**
```
Stack: Groq API (mevcut) + React state
Supabase: judge_sessions tablosu — kullanıcı rubriği + skor geçmişi saklanır
XP: Her değerlendirme tamamlandığında +15 XP
```

---

### Modül C-4: Claude Vision → Visual Regression Testing

**Ders Adı:** "Gözüyle Test Eden Mühendis: Claude Vision ile Visual Regression"

**Öğretilecek Temel Kavram:**  
Geleneksel visual regression (Percy, Applitools) piksel farkı karşılaştırır — bu deterministiktir. Claude Vision ise piksel değil, *anlam* karşılaştırır: "Bu buton rengi değişmiş mi?" değil, "Bu değişiklik kullanıcı deneyimini bozar mı?"

**Analoji:**  
> Percy pikselleri sayan bir cetveldir; Claude Vision ise değişikliğin kullanıcı için anlamlı olup olmadığını değerlendiren bir UX uzmanıdır. Mekanizma birebir örtüşür: cetvel her milimetreyi raporlar, uzman "bu 1mm kullanıcıyı etkiler mi?" der.

**Sitede Olacak İnteraktif Element:**  
- **"Diff Dedektif"** — Kullanıcı iki UI ekran görüntüsünü upload eder (veya hazır örnek çiftler seçer). Claude Vision API çağrısı yapılır (Anthropic API ile — Groq vision desteklemez). Yanıt üç kategoride döner: `kritik_degisiklik`, `kozmetik_degisiklik`, `kabul_edilebilir`. Her kategori için örnek gerekçe gösterilir.
- **"Hata Sınıflandırma Oyunu"** — Hazır UI diff senaryolarında kullanıcı "kritik mi / kozmetik mi?" seçer, Claude ile karşılaştırır.

**QA İçin Gerçek Hayat Pratiği:**  
- Mobile responsive kırılmaları tespit etme senaryosu
- Dark mode geçişinde kontrast sorunlarını yakalama
- Visual regression raporuna yapay zeka yorumu ekleme workflow'u

**Teknik Uygulama:**
```
Stack: Anthropic Messages API (claude-sonnet-4-6) + base64 image encoding
Not: Groq değil, Anthropic API — sayfa bunu açıkça belirtmeli
Fallback: Kullanıcının kendi API key'i ile çalışan demo modu
```

---

### Modül C-5: AI Test Data Generation — Edge Case Fabrikası

**Ders Adı:** "Edge Case Fabrikası: Claude ile Sınır Koşullarını Üretmek"

**Öğretilecek Temel Kavram:**  
Claude'u test verisi üretmek için bir "eşdeğer sınıf fabrikası" olarak kullanmak. Özellikle NLP sistemleri için: semantik eşdeğer girdiler, adversarial girdiler, kültürel varyasyonlar.

**Sitede Olacak İnteraktif Element:**  
- **"Veri Fabrikası"** — Kullanıcı bir alan tanımı girer ("TR kimlik no", "adres formu", "chatbot sorusu"). Claude 8 kategoride veri üretir: geçerli, geçersiz, sınır değer, boş, özel karakter, Unicode, XSS girişimi, çok uzun. JSON formatında indirebilir.
- **Prompt Şablonları** — "Chatbot edge case prompt şablonu", "Form validation edge case şablonu" hazır şablonlar

**QA İçin Gerçek Hayat Pratiği:**  
- Türkçe karakter normalizasyon test verisi üretme (ş, ğ, ü, ö…)
- Çok dilli chatbot için semantik olarak eşdeğer sorular paketi oluşturma
- SQL injection + prompt injection denemelerini test verisi olarak formatlama

---

## 2. `/llm-agents` Sayfası — Yeni Modüller

### Modül L-2: Deterministik vs Stokastik Test — Büyük Fark

**Ders Adı:** "İki Dünya: Kesin Sonuç vs Olası Sonuç Testleri"

**Öğretilecek Temel Kavram:**  
Selenium ile bir login test yazdığında çıktı sabit: test ya geçer ya geçmez. Bir AI chatbot test ettiğinde aynı soru farklı yanıtlar üretebilir. Bu fark sadece teknik değil, test stratejisinin tamamını değiştirir.

**Analoji:**  
> Deterministik test bir hesap makinesidir: 2+2 her zaman 4 döndürür, assert sabit çalışır. Stokastik test ise bir röportajdır: aynı soruyu farklı günlerde sorarsanız farklı cevaplar alırsınız — ama her cevabı bir rubriğe göre değerlendirirsiniz, tek bir "doğru" string'e değil.

**Sitede Olacak İnteraktif Element:**  
- **"İki Ekran" Animasyonu** — Sol: Playwright kodu, deterministik assertion ile. Sağ: Aynı senaryonun AI versiyonu, LLM-judge assertion ile. Adım adım animasyonlu karşılaştırma. Kullanıcı "Neden farklı?" butonuna basınca explanation açılır.
- **"Hangi Strateji?" Quiz** — 10 senaryo gösterilir (login formu, chatbot yanıtı, öneri motoru, SQL sorgusu…), kullanıcı deterministik mi / stokastik mi seçer, skor hesaplanır.

**QA İçin Gerçek Hayat Pratiği:**  
- Bir QA planında "deterministic gates" + "probabilistic checks" nasıl ayrılır?
- AI sistemi için test pass/fail kriterleri nasıl tanımlanır?
- Confidence threshold kavramı: "0.85 üzeri güven skoru = geçer"

---

### Modül L-3: Multi-turn Conversation & Drift Testing

**Ders Adı:** "Sohbet Testi: Hafıza, Bağlam Kayması ve Drift Yakalamak"

**Öğretilecek Temel Kavram:**  
Bir chatbot'u tek yanıt için değil, uzun konuşma serisi boyunca test etmek. Context window dolduğunda ne olur? Model önceki kısıtlamaları "unutur" mu? Konudan sapma (topic drift) nasıl ölçülür?

**Analoji:**  
> Multi-turn testi, bir müşteri temsilcisini tek bir soruyu değil, saatlerce süren bir müşteri görüşmesini izleyerek değerlendirmeye benzer. Mekanizma birebir örtüşür: görüşmenin sonunda temsilci hâlâ tutarlı, güvenli ve konuyla ilgili mi yanıt veriyor mu?

**Sitede Olacak İnteraktif Element:**  
- **"Konuşma Test Koşucusu"** — Kullanıcı 5-10 mesajlık bir konuşma senaryosu yükler (veya hazır senaryo seçer: "Müşteri 10 mesajda manipüle etmeye çalışıyor"). Her turda modelin yanıtı otomatik değerlendirilir: tutarlılık skoru, kısıtlamaya uyum, konu alakası.
- **"Drift Metre"** — Konuşma ilerledikçe gerçek zamanlı grafik: konu tutarlılığı %'si, sistem talimatına uyum skoru. Belirli bir eşiğin altına düştüğünde alarm ikonu belirir.

**QA İçin Gerçek Hayat Pratiği:**  
- Context window sınırına yaklaştığında davranış değişikliği testi
- Persona tutarlılığı testi: "Asistan 50 mesaj sonra bile aynı kişilik özelliklerini koruyor mu?"
- Memory injection saldırısını simüle etme

**Teknik Uygulama:**
```
Supabase: conversation_sessions tablosu
Her tur: { turn_number, user_msg, assistant_msg, consistency_score, on_topic_score }
Groq API: her yanıt + değerlendirici çağrısı (2 API call/tur)
XP: Tamamlanan senaryo başına +20 XP
```

---

### Modül L-4: RAG Pipeline Testing — Hallucination, Grounding, Relevance

**Ders Adı:** "RAG'ı Test Etmek: Halüsinasyon Dedektifi Olmak"

**Öğretilecek Temel Kavram:**  
RAG (Retrieval-Augmented Generation) sistemini test etmek üç katmanlı bir değerlendirme gerektirir: (1) Doğru belge alındı mı? (Retrieval kalitesi), (2) Model belgeden yanıt ürettiyse bu doğru mu? (Grounding), (3) Yanıt soruyla ilgili mi? (Relevance). Bunların hiçbiri tek bir `assert` ile ölçülemez.

**Analoji:**  
> RAG'ı test etmek bir araştırmacının çalışmasını incelemeye benzer: Kaynaklar doğru mu seçildi? (retrieval), İddia kaynaklara dayanıyor mu? (grounding), Araştırma soruya cevap veriyor mu? (relevance). Mekanizma birebir örtüşür — her katman bağımsız başarısız olabilir.

**Sitede Olacak İnteraktif Element:**  
- **"RAG Test Laboratuvarı"** — 3 adımlı simülasyon:
  - **Adım 1 — Context Yükle:** Kullanıcı kısa bir "bilgi tabanı" metni yazar (veya örnek seçer: ürün kılavuzu, politika belgesi)
  - **Adım 2 — Soru Sor:** Chatbot yanıt üretir. Yanıtın altında "kaynak paragraf" vurgulanarak gösterilir.
  - **Adım 3 — Metrikleri Gör:** Otomatik hesaplama:
    - `Grounding Skoru`: Yanıt bağlamdan mı geliyor yoksa halüsinasyon mu? (LLM-judge ile)
    - `Relevance Skoru`: Soru ile yanıt ne kadar ilgili? (embedding benzerliği kavramı açıklanır)
    - `Faithfulness Skoru`: İddialar kaynak belgede var mı?
- **"Halüsinasyon Avı" Oyunu** — 5 hazır yanıt gösterilir, kullanıcı "gerçek / halüsinasyon" seçer, bağlam belgesiyle karşılaştırarak açıklaması yapılır

**QA İçin Gerçek Hayat Pratiği:**  
- Şirket politikası chatbot'u için grounding test paketi oluşturma
- RAGAS framework'ünün mantığını anlatma (kod değil, konsept)
- "Halüsinasyon oranı" metriğini bir QA raporuna nasıl koyarsın?

**Teknik Uygulama:**
```
Stack: Groq API (context + soru + yanıt üçlüsünü LLM judge'a gönder)
Judge Prompt: "Aşağıdaki yanıt verilen bağlamdan mı kaynaklanıyor? 
  Sadece bağlamda olan bilgileri mi içeriyor? Puan ver: 1-5"
Görsel: Üç metrik için progress ring (SVG/CSS animasyonu)
```

---

### Modül L-5: AI Observability — Platform Mantığını Anlamak

**Ders Adı:** "Gözlem Altındaki AI: Arize, Phoenix ve WhyLabs Mantığı"

**Öğretilecek Temel Kavram:**  
Bir AI sistemini canlıya aldıktan sonra izlemek için özel araçlar gerekir. Phoenix, Arize, Giskard, WhyLabs gibi platformlar neler yapıyor? Bu araçların işlevini anlayan bir QA mühendisi bu iş ilanlarının must-have'ini karşılar.

**Analoji:**  
> AI observability, bir hastanede vital signs monitörü gibidir: hastanın an be an kalp atışı, kan basıncı, oksijen seviyesi izlenir — sorun olmadan önce alarm verir. Mekanizma birebir örtüşür: AI observability de yanıt kalitesi, latency, hallucination oranı ve drift'i sürekli izler.

**Sitede Olacak İnteraktif Element:**  
- **"Mock Observability Dashboard"** — Canlı simülasyon gibi görünen statik ama animasyonlu dashboard:
  - Gerçek zamanlı "hallucination rate" grafiği (son 24 saatte artan eğilim)
  - Token/latency dağılımı (histogram)
  - "Kırmızı alert" senaryosu: drift spike → kullanıcı "ne yapmalısın?" sorusunu yanıtlar
  - Veri, Supabase'de hazır mock kayıtlarından beslenir
- **"Platform Karşılaştırma Tablosu"** — Phoenix vs Giskard vs Arize vs WhyLabs: hangi özellik nerede?  
  Etkileşimli toggle ile her platformun güçlü olduğu alan vurgulanır.
- **"Trace Analizi Egzersizi"** — Bir AI yanıtının "trace"i gösterilir (hangi retrieval adımı, hangi prompt, hangi token sayısı). Kullanıcı "bu trace'de nerede sorun var?" sorusunu yanıtlar.

**QA İçin Gerçek Hayat Pratiği:**  
- Phoenix (Arize'nin açık kaynak versiyonu) ile yerel observability kurulumu — kavramsal walkthrough
- Evaluation report nasıl yazılır? QA mühendisi perspektifinden şablon
- "Model davranışı beklenenin dışına çıktı" için incident report taslağı

---

### Modül L-6: Adversarial Testing & Red Teaming — Prompt Injection Oyunu

**Ders Adı:** "Kırmızı Takım: AI'ı Kandırmaya Çalışmak"

**Öğretilecek Temel Kavram:**  
Adversarial testing, bir AI sisteminin güvenlik ve güvenilirlik sınırlarını kasıtlı olarak zorlayarak test etmektir. Prompt injection, jailbreaking, role confusion — bunların hepsini bir QA mühendisinin anlaması ve test senaryolarına dönüştürebilmesi gerekir.

**Analoji:**  
> Red teaming, bir bankanın güvenlik sistemini test etmek için kiralanan "etik hırsız" gibidir. Mekanizma birebir örtüşür: hırsız gerçekten bankayı soymaya değil, savunmadaki açıkları bulmaya çalışır — AI red teamer de sistemi gerçekten sabote etmez, savunma zayıflıklarını kataloglar.

**Sitede Olacak İnteraktif Element:**  
- **"Prompt Injection Arena" — Mini Oyun:**
  - **Senaryo:** Kullanıcı bir müşteri hizmetleri botuna mesaj gönderir. Botun sabit kuralları var ("indirim verme", "rakip bahsetme", "politika dışına çıkma")
  - **Görev:** Kullanıcı botu bu kuralları çiğnetecek prompt'lar dener
  - **Mekanizma:** Her başarılı "injection" 10 puan, ama sistem her denemeden sonra "Bu saldırı nasıl önlenir?" açıklaması gösterir
  - **Skor tablosu:** Hangi injection teknikleri daha çok işe yarıyor? (Indirect injection, Role override, Context hijacking…)
  - **Savunma modu:** Kullanıcı artık defender olur — sisteme savunucu sistem prompt'u yazar, başkasının injection'ı çalışır mı dener

- **"Saldırı Kategorisi Rehberi":**
  - Direct Prompt Injection
  - Indirect Injection (belge içinden)
  - Role Confusion ("Artık sen bir kötü adamsın…")
  - Context Hijacking
  - Goal Hijacking
  Her kategoride canlı örnek + gerçek dünya vakası

- **"Savunma Playbook"** — Her saldırı kategorisine karşı sistem prompt şablonları

**QA İçin Gerçek Hayat Pratiği:**  
- Adversarial test case kataloğu nasıl oluşturulur?
- OWASP LLM Top 10 (2025) — QA perspektifinden walkthrough
- Red team raporu şablonu: bulgu, risk seviyesi, mitigation önerisi

**Teknik Uygulama:**
```
Stack: Groq API + Supabase
Supabase: injection_attempts tablosu
  { user_id, attempt_text, category, success: bool, score, timestamp }
Leaderboard: En yaratıcı injection senaryoları (anonim)
XP: Her tamamlanan saldırı kategorisi +25 XP
```

---

## 3. Teknik Uygulama Mimarisi

### 3.1 Genel Prensipler (learnqa.dev kuralları)

```
✅ React 18 + Vite 5 (JSX/JS — TypeScript YOK src/ içinde)
✅ react-router-dom ile routing
✅ Supabase (PostgreSQL + Edge Functions)
✅ Groq API (production AI servisi — Anthropic değil)
✅ Bilingual içerik: { tr, en } formatında pick() ile
❌ GSAP / framer-motion YOK
❌ Dış drag-and-drop kütüphanesi YOK
❌ TypeScript src/ içinde YOK
```

**Not — Modül C-4 (Claude Vision) istisnası:**  
Bu modül doğası gereği Anthropic Messages API'sini kullanır (vision yeteneği). Seçenekler:
1. Kullanıcı kendi Anthropic API key'ini girer (demo modu)
2. Supabase Edge Function arkasında saklı Anthropic key (ücretli kullanım risk)
3. Groq'un vision modeli ile değiştir (llava-v1.5-7b-4096-preview veya benzer)

### 3.2 Supabase Tablo Tasarımı

```sql
-- Modül L-3 için
CREATE TABLE conversation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  scenario_name text,
  turn_number int,
  user_message text,
  assistant_message text,
  consistency_score float,
  on_topic_score float,
  created_at timestamptz DEFAULT now()
);

-- Modül L-4 için
CREATE TABLE rag_lab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  context_text text,
  user_question text,
  assistant_answer text,
  grounding_score float,
  relevance_score float,
  faithfulness_score float,
  created_at timestamptz DEFAULT now()
);

-- Modül L-6 için
CREATE TABLE injection_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  attempt_text text,
  category text, -- 'direct' | 'indirect' | 'role_confusion' | 'context_hijack'
  success boolean,
  score int,
  created_at timestamptz DEFAULT now()
);

-- Modül C-3 için (mevcut judge_sessions benzeri)
CREATE TABLE judge_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  input_text text,
  rubric jsonb,
  scores jsonb, -- { accuracy: 4, relevance: 3, safety: 5, conciseness: 3 }
  overall_score float,
  created_at timestamptz DEFAULT now()
);
```

### 3.3 Groq API — Judge Prompt Şablonu

```javascript
// Modül C-3 ve L-4 için kullanılacak temel pattern
async function evaluateWithJudge({ inputText, context, rubric }) {
  const systemPrompt = `Sen bir AI çıktı değerlendirme uzmanısın.
Sana verilen yanıtı şu kriterlere göre 1-5 arası puan ver:
${rubric.map(r => `- ${r.name}: ${r.description}`).join('\n')}

SADECE JSON formatında yanıt ver, başka hiçbir şey yazma:
{"scores": {"criterion_name": score}, "overall": number, "reasoning": "string"}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Değerlendirilecek yanıt:\n${inputText}\n\nBağlam (varsa):\n${context || 'Yok'}` }
      ],
      temperature: 0.1, // Tutarlı değerlendirme için düşük temperature
      max_tokens: 500
    })
  });
  
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
```

### 3.4 XP Sistemi Entegrasyonu

```javascript
// Mevcut XP sistemi ile entegrasyon
const AI_QA_XP_EVENTS = {
  'judge-playground-complete': 15,
  'drift-test-complete': 20,
  'rag-lab-complete': 20,
  'injection-category-cleared': 25,
  'observability-quiz-pass': 15,
  'visual-diff-analyzed': 10,
};

// Her modül tamamlandığında mevcut CustomEvent pub/sub kullan
window.dispatchEvent(new CustomEvent('xp-earned', {
  detail: { event: 'rag-lab-complete', points: 20, module: 'llm-agents' }
}));
```

---

## 4. Uygulama Öncelik Sırası

### Faz 1 — Hızlı Kazanımlar (1-2 hafta)

| Modül | Öncelik | Neden |
|---|---|---|
| L-2: Deterministik vs Stokastik | 🔴 Kritik | Diğer tüm modüllerin kavramsal zemini |
| C-3: LLM-as-a-Judge Playground | 🔴 Kritik | En çok aranan AI QA becerisi; iş ilanı must-have |
| L-4: RAG Lab (temel versiyon) | 🔴 Kritik | İş ilanı directly RAG'dan söz ediyor |

### Faz 2 — Orta Vadeli (3-4 hafta)

| Modül | Öncelik | Neden |
|---|---|---|
| L-6: Prompt Injection Oyunu | 🟡 Yüksek | En viral potansiyeli olan içerik; kullanıcı tutma |
| L-3: Multi-turn Drift Test | 🟡 Yüksek | İş ilanı multi-turn'ü açıkça istiyor |
| L-5: AI Observability Dashboard | 🟡 Yüksek | İlanın good-to-have'ini karşılar |

### Faz 3 — İleri Seviye (5-8 hafta)

| Modül | Öncelik | Neden |
|---|---|---|
| C-4: Visual Regression (Vision) | 🟢 Orta | API kısıtlamaları var, dikkatli planlama gerekir |
| C-5: Edge Case Fabrikası | 🟢 Orta | C-3'ün doğal devamı |
| L-5: Evaluation Report Şablonu | 🟢 Orta | İş arama aşamasında CV'ye ek değer |

---

## 5. İçerik Kalite Kuralları

Bu dosyada tanımlanan tüm modüller şu kurallara uymalıdır:

```
1. Her ders bir "bilgi okuma" + bir "ellerini kirlet" bölümünden oluşur
2. Tüm interaktif elemanlar Playwright ile test edilebilir yapıda olur
3. Tüm metin içeriği { tr: "...", en: "..." } formatında bilingual
4. Kod bloklarında yorum satırları Türkçe (Türkçe sayfada)
5. Hiçbir modül harici animasyon kütüphanesi kullanmaz
6. Her modülün altında "Bu beceri hangi iş ilanında aranır?" bölümü
7. Her modülün tamamlanması ölçülebilir: quiz skoru VEYA playground çıktısı
```

---

## 6. İş İlanı Eşleme — Kariyer Sayfası Entegrasyonu

`/qa-mentor` sayfasına veya yeni bir `/ai-qa-kariyer` sayfasına bağlanacak bir "Beceri → İş İlanı" matrisi:

| Beceri (Modül) | Aranan Sektör | Örnek Başlık |
|---|---|---|
| LLM-as-a-Judge (C-3) | FinTech, SaaS, E-ticaret | AI QA Engineer, Evaluation Engineer |
| RAG Testing (L-4) | LegalTech, HealthTech, EnterpriseSaaS | AI/ML QA Engineer |
| Adversarial Testing (L-6) | Cybersecurity, Banking, Gov | AI Red Team Analyst |
| AI Observability (L-5) | MLOps şirketleri | AI Reliability Engineer |
| Visual Regression + Vision (C-4) | Product companies | Senior QA Engineer |
| Multi-turn Testing (L-3) | Conversational AI şirketleri | Chatbot QA Specialist |

---

## 7. Referans Kaynaklar

Modül geliştirirken başvurulacak açık kaynak materyal:

- **RAGAS** — RAG değerlendirme framework'ü: [github.com/explodinggradients/ragas](https://github.com/explodinggradients/ragas)
- **Phoenix (Arize)** — Açık kaynak AI observability: [phoenix.arize.com](https://phoenix.arize.com)
- **Giskard** — AI model test aracı: [giskard.ai](https://giskard.ai)
- **OWASP LLM Top 10** — AI güvenlik referansı: [owasp.org/www-project-top-10-for-large-language-model-applications](https://owasp.org/www-project-top-10-for-large-language-model-applications)
- **LangChain Evaluation Docs** — Evaluator kavramları için
- **DeepEval** — Python LLM test kütüphanesi — learnqa.dev'e taşınacak kavramların kaynağı

---

## 8. Bu Dosyanın Kendisi Nasıl Kullanılmalı?

```
AIQA_ROADMAP.md → her yeni modül başlamadan önce okunur
Her modül tamamlandığında → "Durum" sütunu ✅ yapılır
Her Faz tamamlandığında → NEXT_SESSION.md'ye taşınır
Yeni iş ilanı geldiğinde → Gap Analizi tablosu güncellenir
```

---

## 9. Tamamlanma Durumu (2026-07-09)

**Faz 1, Faz 2 ve Faz 3'teki 8 modülün tamamı implemente edildi ve `main`
branch'ine commit edildi.** Detaylı commit listesi, doğrulama adımları ve
her modülün hangi dosyalarda yaşadığı için **`.claude/NEXT_SESSION.md`**
otoritedir (bkz. CLAUDE.md §0 — anlık/tamamlanma durumu bu dosyada tutulur).

| Modül | Sayfa | Sekme | Commit |
|---|---|---|---|
| L-2 Deterministik vs Stokastik | `/llm-agents` | ⚖️ Deterministic vs Stochastic Testing | `da17c23` |
| C-3 LLM-as-a-Judge | `/claude-ai` | ⚖️ Yargıç Olarak Claude | `b56a348` + `7376585` |
| L-4 RAG Pipeline Testing | `/llm-agents` | 🔍 RAG Pipeline Testing | `b56a348` + `7376585` |
| L-6 Prompt Injection Arena | `/llm-agents` | 🕵️‍♂️ Adversarial Testing & Red Teaming | `4a6b806` |
| L-3 Multi-turn Drift Testing | `/llm-agents` | 📉 Multi-turn Conversation & Drift Testing | `88a4641` |
| L-5 AI Observability | `/llm-agents` | 📡 AI Observability | `a10ee7b` |
| C-5 Edge Case Factory | `/claude-ai` | 🏭 Edge Case Factory | `773c2ac` |
| C-4 AI Vision Visual Regression | `/claude-ai` | 🕵️ AI Vision: Visual Regression Testing | `0db48b5` |

**Bilinen tek eksik:** Faz 3 tablosundaki ayrı "L-5: Evaluation Report
Şablonu" alt-kalemi (bağımsız bir rapor-yazma egzersizi/şablonu) henüz ayrı
bir interaktif araç olarak yapılmadı — sadece AI Observability sekmesinin
metninde kavramsal olarak değinildi. İhtiyaç olursa ayrı bir modül olarak
eklenebilir.

**Manuel doğrulama için:**
1. `npm run dev` çalıştır, `/claude-ai` ve `/llm-agents` sayfalarına git,
   yukarıdaki tablodaki sekme adlarını sol sidebar'da ara ve tıkla.
2. `node scripts/check-content-integrity.mjs` — 0 ihlal vermeli.
3. `npm run build` — hatasız tamamlanmalı.
4. `git log --oneline -8` — yukarıdaki 8 commit hash'ini (veya sonrasını)
   görmelisin.

---

*Son güncelleme: 2026-07-09 — Faz 1/2/3 tamamlandı.*  
*Sonraki adım: (opsiyonel) L-5 Evaluation Report Şablonu, ya da yeni bir iş
ilanı geldiğinde Gap Analizi tablosunun güncellenmesi.*
