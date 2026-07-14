# learnqa.dev — İnteraktif Bileşen Pilot Planı & Master Prompt
> 3 bileşen (Step Animator · Yap-Boz · Karşılaştırma Animasyonu)  
> Pilot sayfa → doğrula → tüm sayfalara yay

---

## 1. Sitenin DNA'sı (incelemeden çıkan kurallar)

Prompt'un neden bu şekilde yazıldığını anlamak için, siteyi taradığımda bulduğum kalıplar:

**A. İmza pedagojik desen — "Exact Analogy"**  
Her modül şu kalıpla açılıyor:  
> "X, Y'ye benzer — **ve mekanizma birebir örtüşür (the mechanism is exact)**, gevşek değil: [mekanizmanın adım adım eşleşmesi]"

Örnekler sitede:
- LLM = telefon klavyesinin sonraki kelime tahmini, "planetary scale'e büyütülmüş"
- Context window = toplantı biter bitmez silinen beyaz tahta
- Prompt = bug raporundaki "steps to reproduce" alanı
- Function calling = sadece form dolduran, kasaya asla dokunmayan çağrı merkezi operatörü

Bu **zorunlu**. Her yeni bileşen bu desene uymalı.

**B. Ton ve dil**
- Ana içerik dili İngilizce (SEO + global), ama sen bilingual (TR/EN) istiyorsun → bileşenler `{ tr, en }` yapısında
- "AI testçiyi değiştirmez — AI'ı iyi kullanan testçi, kullanmayanı değiştirir" tarzı iddialı, motive edici cümleler
- QA mühendisinin diliyle konuşuyor: locator, assertion, equivalence partitioning, edge case

**C. Yapısal iskelet (her sayfada aynı)**
```
# Emoji + Başlık
Kısa tanım (meta-description ile aynı)
Giriş paragrafı ("bu sayfada ne öğreneceksin")
## What you can learn on this page
  - Modül 1 (emoji + başlık + exact-analogy açılışı)
  - Modül 2 ...
## QA Learning Topics (global nav — tüm sayfalarda birebir aynı)
```

**D. Teknik gerçekler (bilinen stack)**
- React + Vite (JSX/JS, src/ içinde TS yok)
- Supabase (PostgreSQL + Edge Functions)
- Groq API (production AI)
- XP + Leaderboard sistemi mevcut (`/leaderboard`)
- Tema rengi: `#7c3aed` (mor) — mevcut örneklerimdeki mavi/turuncu/mor paleti buna uyumlu
- GSAP / Framer Motion YOK

**E. Her modül dört ayak üstünde duruyor**  
Senin ilk prompt'undaki format zaten sitenin ruhuyla örtüşüyor:
"Dersin Adı" · "Temel Kavram" · "İnteraktif Element" · "QA Gerçek Hayat Pratiği"

---

## 2. Üç Bileşenin Sitedeki Rolü

| Bileşen | Ne Öğretir | Hangi Modül Tipine Uyar |
|---|---|---|
| **Step Animator** (Örnek 1) | Sıralı süreç / lifecycle | "Bir şey adım adım nasıl çalışır" — pipeline, lifecycle, akış |
| **Yap-Boz** (Örnek 2) | Sıra/eşleştirme bilgisi | "Doğru sırayı biliyor musun" — pipeline sıralama, kavram eşleştirme |
| **Karşılaştırma Animasyonu** (Örnek 3) | İki dünya farkı | "X vs Y" — deterministik vs stokastik, tool A vs B |

Bu üçü birlikte **"oku → izle → dene → test et"** döngüsünü tamamlıyor. Sitenin "everything is hands-on and simulation-backed" sözünü somutlaştırıyor.

---

## 3. Pilot Sayfa Seçimi

**Pilot = `/llm-agents`**

Neden bu sayfa?
1. Zaten 8 modülü var, içerik olgun → bileşenleri boş sayfaya değil, gerçek içeriğe oturtacağız
2. Üç bileşenin de doğal yuvası var:
   - **Step Animator** → "What Is an Agent: LLM + Tools + Loop" (agent döngüsü)
   - **Yap-Boz** → yeni eklenecek "RAG Pipeline Testing" modülü (AIQA_ROADMAP L-4)
   - **Karşılaştırma** → yeni eklenecek "Deterministik vs Stokastik Test" modülü (L-2)
3. İş ilanı gap'ini de kapatıyor (RAG, non-deterministic testing)
4. Başarılı olursa `/claude-ai`, `/playwright`, `/selenium` gibi sayfalara kopyalanabilir desen çıkar

**Pilot başarı kriterleri:**
- [ ] Üç bileşen de mobilde çalışıyor (responsive)
- [ ] Klavye ile erişilebilir (Tab, Enter, focus görünür)
- [ ] `prefers-reduced-motion` destekli
- [ ] XP sistemine bağlı (tamamlama → +XP event)
- [ ] Bilingual (`{ tr, en }`)
- [ ] Playwright ile test edilebilir (`data-testid`)
- [ ] Mevcut sayfa tasarımıyla görsel uyum

---

## 4. Yayılım Stratejisi (pilot sonrası)

```
Faz 1 — PİLOT
  /llm-agents → 3 bileşen entegre + doğrula

Faz 2 — İKİZ SAYFA
  /claude-ai → aynı 3 bileşen deseni, farklı içerik
  (Visual Regression karşılaştırması, LLM-as-Judge step animator)

Faz 3 — KLASİK SAYFALAR
  /playwright → Step Animator (test lifecycle — Örnek 1 zaten bu!)
  /selenium   → Yap-Boz (WebDriver komut sırası)
  /sql        → Yap-Boz (query execution order: FROM→WHERE→GROUP BY...)
  /docker     → Step Animator (image build → container run lifecycle)

Faz 4 — BİLEŞEN KÜTÜPHANESİ
  3 bileşeni src/components/interactive/ altında generic hale getir
  Her sayfa sadece "content prop" geçerek kullanır
```

**Kritik mimari karar:** Bileşenler **generic + veri-güdümlü** olmalı. Kod bir kez yazılır, her sayfa kendi içeriğini JSON olarak besler. Böylece 30+ sayfaya kopyala-yapıştır olmadan yayılır.

---

## 5. Bileşen Veri Şeması (generic hale getirmek için)

```javascript
// StepAnimator — veri şeması
{
  id: "agent-loop",
  title: { tr: "Agent Döngüsü", en: "Agent Loop" },
  nodes: [
    { icon: "🧠", label: {tr,en}, code: "llm.think()" },
    // ...
  ],
  steps: [
    { code: "...", explanation: {tr,en} },
    // ...
  ],
  xpEvent: "agent-loop-complete",
  xpPoints: 15
}

// DragDropPuzzle — veri şeması
{
  id: "rag-pipeline",
  question: {tr,en},
  correctOrder: [
    { id, emoji, title:{tr,en}, sub, explain:{tr,en} },
    // ...
  ],
  xpEvent, xpPoints
}

// ComparisonAnim — veri şeması
{
  id: "det-vs-stochastic",
  left:  { title:{tr,en}, stage:"calculator", assertion, info:{tr,en} },
  right: { title:{tr,en}, stage:"bubbles", assertion, info:{tr,en} },
  takeaways: [...],
  quiz: { question:{tr,en}, options:[...], correctIndex }
}
```

---

## 6. MASTER PROMPT (VS Code Claude Code için)

Aşağıdaki prompt'u Claude Code'a ver. Üç bileşeni de kapsar, pilot sayfaya entegre eder, generic yapıyı kurar.

---

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Stack: React 18 + Vite 5 (JSX, src/ içinde TypeScript YOK) + Supabase + Groq API.
Mevcut kısıtlar: GSAP YOK, Framer Motion YOK, harici drag-drop kütüphanesi YOK.
Tema rengi #7c3aed (mor). Mevcut XP + Leaderboard sistemi var.

## GÖREV
/llm-agents sayfasına 3 interaktif eğitim bileşeni ekle. Bunları
src/components/interactive/ altında GENERIC (veri-güdümlü) yaz — her bileşen
bir "content" prop alır, içeriği hardcode ETME. Böylece ileride diğer
sayfalarda da tekrar kullanılabilsinler.

## BİLEŞEN 1 — StepAnimator.jsx
Sıralı bir süreci adım adım gösteren bileşen. İleri/geri butonları,
progress pip'leri, her adımda: SVG pipeline (node'lar renk değiştirir:
gri→mavi aktif→yeşil tamamlandı) + kod paneli + açıklama kutusu.
İlk kullanım: "Agent Loop" (LLM think → tool call → observe → repeat → done).

## BİLEŞEN 2 — DragDropPuzzle.jsx
HTML5 native Drag & Drop ile sıralama yap-bozu. Karışık kartlar → numaralı
slotlar. "Kontrol Et" → doğru yeşil / yanlış kırmızı. Slota tıkla → kart geri döner.
Her yenilemede kartlar shuffle. Tamamlanınca açıklamalar + XP.
İlk kullanım: "RAG Pipeline sıralama" (Query→Embed→Retrieve→Augment→Generate).

## BİLEŞEN 3 — ComparisonAnim.jsx
İki panelli yan yana karşılaştırma. Saf CSS keyframe animasyonları
(prefers-reduced-motion destekli). Altında takeaway grid + mini quiz.
İlk kullanım: "Deterministik vs Stokastik Test".

## ZORUNLU KURALLAR
1. PEDAGOJİK DESEN: Her bileşenin içeriği sitenin imza "exact analogy"
   deseniyle açılmalı: "X, Y'ye benzer — ve mekanizma birebir örtüşür:
   [adım adım eşleşme]". Bu sitenin DNA'sı, buna sadık kal.
2. BİLİNGUAL: Tüm metinler { tr: "...", en: "..." } formatında.
   Bir useLanguage() hook'u veya mevcut i18n mekanizmasını kullan
   (önce projede nasıl yapıldığına bak, ona uy).
3. ERİŞİLEBİLİRLİK: Tab ile gezinilebilir, focus görünür, Enter ile
   buton çalışır, prefers-reduced-motion animasyonları kapatır.
4. RESPONSIVE: 380px mobilde de düzgün çalışsın (grid → tek kolon).
5. TEST EDİLEBİLİR: Interaktif elementlere data-testid ekle
   (örn. data-testid="step-next-btn").
6. XP ENTEGRASYONU: Tamamlama anında mevcut XP mekanizmasını tetikle.
   Önce projede XP nasıl kazanılıyor bak (muhtemelen bir context,
   custom event veya Supabase RPC), aynısını kullan.
7. STİL: CSS Modules veya mevcut styling yaklaşımı neyse ona uy.
   Renk paleti: mor #7c3aed ana, mavi #58A6FF / yeşil #3FB950 /
   turuncu #F0883E / kırmızı #F85149 aksan. Koyu tema.

## ÇALIŞMA SIRASI
1. ÖNCE keşfet: package.json, src/ yapısı, mevcut bir sayfa bileşeni
   (örn. LlmAgents.jsx), i18n mekanizması, XP kazanma kodu, styling
   yaklaşımı. Bulgularını özetle.
2. Generic bileşen API'lerini (props şeması) öner, onayımı bekle.
3. Üç bileşeni sırayla yaz + /llm-agents'a entegre et.
4. Her bileşen için içerik verisini ayrı dosyada tut:
   src/data/interactive/agentLoop.js, ragPipeline.js, detVsStochastic.js
5. Playwright smoke testi yaz: her bileşen render oluyor + temel
   etkileşim çalışıyor mu.

Referans olarak 3 çalışan HTML prototipi var (step-animator, yapboz,
animasyon). Bunların davranışını ve görsel dilini koru, ama React +
generic + bilingual + erişilebilir hale getir.

İlk adımdan başla: repoyu keşfet ve bulgularını raporla.
Kod yazmadan önce onay için dur.
```

---

## 7. Prompt'u Kullanma Notları

- **Tek seferde her şeyi isteme.** Prompt Claude Code'a "önce keşfet, onay bekle" diyor — bu kasıtlı. Repoyu görmeden generic API tasarlamak riskli.
- **i18n ve XP mekanizmasını varsayma.** Prompt Claude'a bunları senin kodundan öğrenmesini söylüyor. Sen de bilmiyorsan, keşif adımında ortaya çıkar.
- **Pilot doğrulandıktan sonra** Faz 2 için ayrı, daha kısa bir prompt yeter: "StepAnimator'ı /claude-ai'da LLM-as-Judge içeriğiyle kullan" gibi.
- Referans HTML dosyalarını Claude Code oturumuna eklemek istersen, `ornek-1/2/3.html` dosyalarını repoya `/docs/prototypes/` altına koyup prompt'ta yolunu ver.

---

## 8. Kontrol Listesi — Pilot Bitince

```
[ ] 3 bileşen /llm-agents'ta canlı
[ ] Mobilde test edildi (380px)
[ ] Klavye navigasyonu çalışıyor
[ ] reduced-motion çalışıyor
[ ] TR/EN geçişi çalışıyor
[ ] XP kazanımı Leaderboard'a yansıyor
[ ] Playwright smoke testleri geçiyor
[ ] Generic API net → başka sayfaya kopyalanabilir
[ ] AIQA_ROADMAP.md güncellendi (L-2, L-4 modülleri ✅)
```

---

*Sonraki adım: Master Prompt'u Claude Code'a ver → keşif raporunu incele → onayla → build.*
