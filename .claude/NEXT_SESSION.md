# NEXT SESSION — Devam Noktası

> Bu dosyayı oturum başında oku, kullanıcıdan tekrar açıklama isteme.

---

## 🎯 AKTİF FELSEFE

**"Gör, Anla, Dene ve Test Et."** — Her konu için:
1. **Animasyonlu simülasyon** (önce gör)
2. **DOM / state görselleştirme** (arka planda ne oluyor)
3. **Otomasyon kodu** (nasıl test ederim)

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-16)

| Özellik | Dosya | Durum |
|---------|-------|-------|
| `SimulationBlock` component | `TopicPage.jsx` | ✅ Tamamlandı |
| `case 'simulation':` renderBlock | `TopicPage.jsx` | ✅ Tamamlandı |
| Implicit Wait canlı demo | `seleniumData.js` | ✅ Tamamlandı |
| Explicit Wait canlı demo | `seleniumData.js` | ✅ Tamamlandı |
| **iframe tespiti + animasyon** | `seleniumData.js` | ✅ Tamamlandı |
| **Shadow DOM X-Ray simülasyonu** | `seleniumData.js` | ✅ Tamamlandı |
| Shadow DOM adım adım explorer | `seleniumData.js` | ✅ Tamamlandı |

### `simulation` Block — Mevcut Senaryolar

| Scenario ID | Açıklama | Konum |
|-------------|----------|-------|
| `implicit-wait` | Without/With wait karşılaştırması, timeline | Selenium → Wait sekmesi |
| `explicit-wait` | Spinner → DOM değişimi → element bulundu | Selenium → Wait sekmesi |
| `shadow-dom` | Adım adım host/root/target keşfi | Selenium → Frames sekmesi (eski) |
| `iframe-detection` | Sayfa taraması → iframe vurgulama → switchTo | Selenium → Frames sekmesi |
| `shadow-dom-xray` | findElement() hata → X-Ray → shadowRoot pierce | Selenium → Frames sekmesi |

---

## 📋 Sıradaki Görevler (Öncelik Sırasıyla)

### 🔴 Öncelik 1 — `animated-timeline` Block Tipi

**Neden:** "Implicit Wait vs Explicit Wait vs FluentWait" karşılaştırması için zaman çizelgesi animasyonu eksik.

**Ne yapılacak:**
- `TopicPage.jsx`'e yeni `case 'animated-timeline':` ekle
- CSS `@keyframes` ile hareketli zaman çizelgesi: her wait türü için ayrı renk, ilerleyen bar animasyonu
- `seleniumData.js` Wait sekmesine ekle

```js
{
  type: 'animated-timeline',
  title: { tr: 'Wait Türleri — Zaman Karşılaştırması', en: 'Wait Types — Time Comparison' },
  tracks: [
    { label: 'Thread.sleep(5s)', duration: 5000, color: '#ef4444', always: true },
    { label: 'Implicit Wait', duration: 2300, color: '#f59e0b', dynamic: true },
    { label: 'Explicit Wait', duration: 1800, color: '#10b981', dynamic: true, condition: 'visibility_of' },
  ]
}
```

### 🟡 Öncelik 2 — Daha Fazla Selenium Konusuna Simulation Ekle

Mevcut konular arasında simülasyon **olmayan** yüksek öncelikli konular:

| Konu | Senaryo ID önerisi | Sekme |
|------|--------------------|-------|
| Drag & Drop | `drag-drop` | Aksiyonlar |
| Multiple Windows | `multi-window` | Frames |
| Alert / Confirm / Prompt | `alert-sim` | Frames |
| JS Executor scroll | (zaten PlaywrightVisual'da var) | — |

### 🟢 Öncelik 3 — Playwright Sayfasına Simulation Blokları Ekle

Playwright sayfasında `playwright-visual` var ama `simulation` yok. Auto-wait, frameLocator, evaluate için simulation block eklenebilir.

### ⚪ Öncelik 4 — Diğer Sayfalar (Docker, Postman, K8s)

Bu sayfalar içerik açısından tamamlanmış durumda. Gerekirse simulation block eklenebilir.

---

## Teknik Notlar

### Mevcut Block Tipleri (Güncel)
```
text | code | heading | grid | table | quiz | editor | diagram | comparison |
glossary | error-dict | interview-questions | simple-box | visual | callout |
locator-visual | selenium-visual | playwright-visual | simulation | animated-timeline (YAPILACAK)
```

### Önemli Dosyalar
- `src/components/TopicPage.jsx` — `SimulationBlock` fonksiyonu satır ~1870 civarında. `renderBlock` büyük switch içinde `case 'simulation':` var.
- `src/data/seleniumData.js` — Wait sekmesi (s4 objesi) ve Frames sekmesi (s5 objesi) içinde simulation block'lar mevcut.

### `SimulationBlock` Mimarisi
```
SimulationBlock({ block, darkMode, language })
  ├── simState: string (idle | phase1 | phase2 | ...)
  ├── isRunning: boolean
  ├── timersRef: ref (temizleme için)
  ├── runSteps([[state, delay], ...]) — animasyon sekansı
  ├── resetSim() — tüm timer'ları temizle
  ├── renderXxxPlayground() — sol panel (interaktif)
  ├── renderDomVisualizer() — sağ panel (DOM/state gösterimi)
  └── Layout: header | description | grid(playground | visualizer) | code block
```

### Build Durumu
- ✅ `npm run build` başarılı (son kontrol: 2026-06-16)
- ⚠️ Bundle 3.3MB (chunk uyarısı var, kritik değil)

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
