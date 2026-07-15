# learnqa.dev — Video-Animasyon (Film Bloğu) Pilot Planı & Prompt

> **Rev 2 (2026-07-14):** İlk plan repo incelemesiyle doğrulandı ve büyük ölçüde
> değiştirildi. İlk planın önerdiği 3 bileşen projede ZATEN mevcut çıktı
> (aşağıda kanıtlarıyla). Kullanıcının asıl hedefi — **"daha fazla video
> animasyon ekleyebilmek"** — doğrultusunda plan, projede gerçekten eksik olan
> tek şeye odaklandı: **video benzeri, sahne-sahne oynayan film bloğu**
> (`VideoSceneBlock`). İş bölümü: çekirdek bileşen + pilot = Fable,
> içerik yayılımı + test = Sonnet (prompt Bölüm 6'da).

---

## 1. Keşif Bulguları — İlk Plan Neden Değişti

İlk plan (Rev 1) 3 bileşen öneriyordu. Repo taraması sonucu:

| Rev 1 Önerisi | Projedeki Karşılığı | Durum |
|---|---|---|
| StepAnimator.jsx | `StepAnimationBlock.jsx` (`type: 'step-animation'`) — data-driven, bilingual, oynat/durdur | ✅ Zaten var, `/llm-agents`'ta 12× kullanılıyor |
| DragDropPuzzle.jsx | `ChallengeBlock.jsx` + `challenges/OrderSort.jsx` (`type: 'challenge'`, `variant: 'order-sort'`) — shuffle, kontrol et, XP, erişilebilir ↑/↓ fallback | ✅ Zaten var, `/llm-agents`'ta 12× kullanılıyor |
| ComparisonAnim.jsx | `DeterministicVsStochasticBlock.jsx` (`type: 'det-vs-stoch'`) — iki panel, "Tekrar Koş", senaryo quiz'i | ✅ Zaten var (Rev 1'in ilk kullanım senaryosunun ta kendisi) |
| "Yeni eklenecek RAG modülü" | `/llm-agents` 18 sekmeli; "🔍 RAG Pipeline Testing" ve "⚖️ Deterministic vs Stochastic Testing" sekmeleri + `rag-lab` bloğu mevcut | ✅ Zaten var |

**Rev 1'in yanlış varsayımları (düzeltildi):**
- ❌ `src/components/interactive/` klasörü → Projenin mimarisi: bileşen `src/components/` altında düz durur, `TopicPage.jsx` `renderBlock`'una `case` olarak kaydedilir, içerik `src/data/*Data.js`'te yaşar (CLAUDE.md §5).
- ❌ "XP muhtemelen custom event veya Supabase RPC" → Gerçek: **iki katman**. Local-first `src/lib/xp.js` (`addXP`, `markExerciseComplete`, `subscribeToXpChanges` — topic başına localStorage, üyeliksiz çalışır) + login'liyse `AuthContext.awardXp` (Supabase `increment_user_xp` RPC). Bloklar `lib/xp.js` kullanır (ChallengeBlock kalıbı).
- ❌ "Ana içerik dili İngilizce" → Default dil TR, her metin `{ tr, en }`; TR tarafında kod yorumları Türkçe (CLAUDE.md §8).
- ❌ Sabit mor tema → Sayfa başına palet; `/llm-agents` menekşe/altın (`--llm-role-*` CSS değişkenleri).
- ✅ Doğru kalanlar: GSAP/Framer Motion yok, harici DnD kütüphanesi yok, bileşenler generic + veri-güdümlü olmalı, `data-testid` + reduced-motion + bilingual zorunlu.

---

## 2. Yeni Hedef: `video-scene` — Film Bloğu

**Eksik olan yetenek:** Mevcut bloklar ya statik kutu dizisi (`step-animation`)
ya da kullanıcı-tetiklemeli lab'lar. Hiçbiri **video gibi izlenen** bir deneyim
vermiyor: sahnede hareket eden aktörler, altyazı, timeline, oynat/duraklat/sar.

**Çözüm:** `VideoSceneBlock.jsx` (`type: 'video-scene'`) — veri-güdümlü mini
film oynatıcı:

- **Sahne (stage):** Aktörler (emoji + etiket) yüzde koordinatlarla konumlanır;
  sahneden sahneye CSS transition ile **süzülerek hareket eder** (video hissi).
- **Işınlar (beams):** Aktörler arası animasyonlu SVG bağlantı çizgileri
  (veri akışını gösterir).
- **Altyazı barı:** Her sahnenin `{tr,en}` anlatım cümlesi + opsiyonel kod satırı.
- **Oynatıcı kontrolleri:** ▶/⏸, ⏮/⏭, ↺ replay, 1×/1.5×/2× hız, tıklanabilir
  bölüm pip'li timeline (seek).
- **XP:** Film sonuna ulaşınca `lib/xp.js` ile bir kez ödül (ChallengeBlock kalıbı).
- **Erişilebilirlik:** Tüm kontroller native `<button>`, `prefers-reduced-motion`
  → geçişler kapanır (slayt moduna düşer), otomatik oynatma yine çalışır.
- **Test:** `data-testid="video-scene-*"` sözleşmesi (aşağıda).

### Veri şeması (kaynak: `VideoSceneBlock.jsx` — tek doğru referans)

```javascript
{
  type: 'video-scene',
  id: 'llm-rag-pipeline-film',       // XP tekilliği için ZORUNLU
  title: { tr: '…', en: '…' },
  xpReward: 15,
  sceneDurationMs: 3200,             // 1× hızda sahne başına süre (default 3200)
  stageHeight: 260,                  // opsiyonel, px (default 260)
  actors: [
    { id: 'query', emoji: '❓', label: { tr: 'Soru', en: 'Query' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: { tr: '…', en: '…' },           // altyazı (zorunlu)
      code: { tr: '…', en: '…' },              // opsiyonel tek satır/kısa kod
      positions: {                              // sahnede görünen aktörler
        query: { x: 15, y: 50, scale: 1, opacity: 1, pulse: true },
      },                                        // positions'ta olmayan aktör görünmez
      beams: [ { from: 'query', to: 'embed' } ] // opsiyonel akış çizgileri
    },
  ],
}
```

### data-testid sözleşmesi
`video-scene-block`, `video-scene-play`, `video-scene-prev`, `video-scene-next`,
`video-scene-replay`, `video-scene-speed`, `video-scene-pip-<N>`,
`video-scene-caption`, `video-scene-done` (bitiş rozeti/XP alanı).

---

## 3. Pilot

**Pilot = `/llm-agents` → "🔍 RAG Pipeline Testing" sekmesi.**
İlk film: **"RAG Boru Hattı: Bir Sorunun Yolculuğu"** — Query → Embed →
Retrieve → Augment → Generate akışı + zehirli/alakasız doküman getirilirse
halüsinasyonun nasıl doğduğunu gösteren final sahnesi. Mevcut `rag-lab`
bloğunun ÖNÜNE konur: önce filmi izle (mekanizmayı gör), sonra lab'da dene.

**Pilot başarı kriterleri:**
- [ ] Film oynuyor: aktörler sahneler arası süzülüyor, beam'ler akıyor
- [ ] TR/EN geçişi altyazı + etiketlerde çalışıyor
- [ ] Timeline pip'leri ile seek çalışıyor; hız değişimi çalışıyor
- [ ] `prefers-reduced-motion` → geçişsiz slayt modu
- [ ] Son sahne → XP bir kez ödeniyor (sayfa yenilenince tekrar ödenmiyor)
- [ ] Mobil 380px'te taşma yok
- [ ] `check-content-integrity` + `npm run build` temiz

---

## 4. Yayılım Stratejisi (pilot sonrası — Sonnet'in işi)

Bileşen generic olduğundan yayılım = sadece `*Data.js`'e veri eklemek:

```
Faz 2 — /playwright  → "Bir Testin Yaşam Döngüsü" filmi (browser→context→page→action→assert→report)
Faz 3 — /docker      → "Dockerfile'dan Çalışan Container'a" filmi (build→image→run→container)
Faz 4 — /sql         → "SELECT'in Gerçek Sırası" filmi (FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY)
Faz 5 — /claude-ai   → "LLM-as-Judge Döngüsü" filmi
```

Her fazda: film mevcut konu anlatımının İÇİNE (ilgili kod bloğunun yanına)
yerleştirilir, `NEXT_SESSION.md`'de hangi sayfaya eklendiği işaretlenir.

---

## 5. İş Bölümü

| Kim | Ne |
|---|---|
| **Fable** (bu oturum) | `VideoSceneBlock.jsx` + `TopicPage.jsx` kaydı + `index.css` keyframe'leri + pilot film verisi (`llmAgentsData.js`) + doğrulama (§1.1 checklist) |
| **Sonnet** (sonraki oturum) | Faz 2-5 film verileri + Playwright smoke testi (`tests/video-scene.spec.ts`) + `NEXT_SESSION.md` güncellemesi |

---

## 6. SONNET MASTER PROMPT (kopyala-yapıştır)

```
Sen learnqa.dev projesinde çalışan bir senior frontend engineer'sın.
Önce CLAUDE.md'yi ve .claude/NEXT_SESSION.md'yi oku (oturum protokolü).
Sonra PILOT_PLAN_ve_PROMPT.md'yi oku — bu görev o planın "Sonnet" payıdır.

## BAĞLAM
`feature/llm-agents-interactive-pilot` branch'inde generic bir film bloğu
hazır: src/components/VideoSceneBlock.jsx, TopicPage.jsx'te
`case 'video-scene'` olarak kayıtlı. Pilot verisi llmAgentsData.js'te
`ragPipelineFilm` sabiti olarak duruyor — VERİ ŞEMASININ TEK DOĞRU REFERANSI
bu bileşen dosyası ve pilot veridir; şemayı oradan öğren, uydurma.

## GÖREV A — 4 yeni film verisi (SADECE *Data.js dosyalarına veri ekle,
bileşene DOKUNMA):
1. playwrightData.js → "Bir Testin Yaşam Döngüsü" filmi
   (browser launch → context → page → locator/action → auto-wait →
   assertion → report). Test lifecycle anlatılan sekmeye, ilgili kod
   bloğunun yakınına yerleştir.
2. dockerData.js → "Dockerfile'dan Çalışan Container'a" filmi
   (Dockerfile → build katmanları → image → run → container → port mapping).
3. sqlData.js → "SELECT'in Gerçek Çalışma Sırası" filmi
   (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT).
   DİKKAT: sqlData.js TR'si applyTr/index-override mekanizması kullanıyorsa
   önce mekanizmayı incele, TR varyantını bozmadan ekle.
4. claudeAiData.js → "LLM-as-Judge Döngüsü" filmi
   (çıktı → rubrik → judge çağrısı → skor → eşik → pass/fail).

Her film için ZORUNLU:
- 5-8 sahne; her sahnede caption {tr,en}; aktör hareketi sahneler arası
  anlamlı olmalı (veri akışını GÖSTERSİN, süs olmasın)
- id benzersiz (XP tekilliği buna bağlı), xpReward 10-15
- TR captionlarda teknik terimler İngilizce kalır (fixture, locator,
  assertion...), açıklama cümleleri Türkçe (CLAUDE.md §8 dil kuralı)
- code alanı kullanıyorsan {tr,en} bilingual yaz; TR tarafında yorum
  satırı varsa Türkçe olmalı
- Film, o sayfada konunun anlatıldığı bölümün İÇİNE konur (konudan kopuk
  bir yere değil); quiz'lerden ÖNCE gelmeli (CLAUDE.md §9.1 quiz sıralaması)

## GÖREV B — Playwright smoke testi: tests/video-scene.spec.ts
- /llm-agents'taki pilot film üzerinden (RAG sekmesine tıkla):
  1) video-scene-block render oluyor
  2) video-scene-play tıklanınca caption metni değişiyor (sahne ilerliyor)
  3) video-scene-pip-2 tıklanınca seek çalışıyor
  4) video-scene-next ile son sahneye gidilince video-scene-done görünüyor
- Mevcut test dosyalarındaki kalıpları (baseURL, beforeEach, tab tıklama
  yöntemi) örnek al. /basit-backend, /security, /backend'i teste EKLEME
  (CLAUDE.md §22.1).

## GÖREV C — Kayıt tutma
- .claude/NEXT_SESSION.md'ye: hangi sayfalara film eklendiğini, hangilerinin
  beklediğini (Faz tablosu) yaz. CLAUDE.md'ye ANLIK durum yazma.

## BİTİRMEDEN ÖNCE (CLAUDE.md §1.1 — atlanamaz):
1. node scripts/check-content-integrity.mjs → sıfır ihlal
2. Eklediğin her caption/code'un TR tarafını tek tek oku — İngilizce
   açıklama cümlesi kalmasın
3. npm run build → hatasız
4. npx playwright test tests/video-scene.spec.ts → geçiyor
Bunlar doğrulanmadan "tamamlandı" deme; şüphe varsa "şunu kontrol etmen
gerekebilir: ..." diye raporla.
```

---

## 7. Kontrol Listesi — Tümü Bitince

```
[ ] VideoSceneBlock /llm-agents'ta canlı (Fable)          ← bu oturum
[ ] 4 sayfaya film verisi eklendi (Sonnet)
[ ] tests/video-scene.spec.ts geçiyor (Sonnet)
[ ] Mobil 380px + reduced-motion + TR/EN doğrulandı
[ ] XP kazanımı çalışıyor, çift ödeme yok
[ ] NEXT_SESSION.md güncel
```
