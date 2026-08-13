# Draft — dev.to / Medium — Playwright vs Selenium

**Working title:** 5 Things That Actually Differ Between Playwright and Selenium

---

## Yayınlama talimatı (canonical)

Bu yazı iki sürüm içerir: aşağıdaki **Türkçe teaser** (Medium Türkiye ve
Türkçe QA topluluklarına özel) ve altındaki **İngilizce tam metin** (dev.to /
uluslararası Medium için). Hangi platforma yayınlanırsa yayınlansın:

- Platform `canonical_url` alanı destekliyorsa (dev.to bunu destekler),
  Türkçe teaser için `https://learnqa.dev/test-frameworks`, İngilizce tam
  metin için `https://learnqa.dev/en/test-frameworks` girilmeli.
- Desteklemiyorsa (çoğu Medium hesabı desteklemez), yazının SONUNDA "asıl
  yazı burada" linkini bırakmak yeterli — TAM METNİ canonical'sız
  yayınlama, yalnızca teaser'ı yayınla.

Bu ayrım önemli: 8 haftalık yeni bir alan adı, tam metnini canonical
belirtmeden başka bir platforma kopyalarsa, o platformun otoritesi daha
yüksek olduğu için arama motoru "asıl" içeriği ORADA sanır ve
learnqa.dev'deki sürüm zarar görür.

---

## Türkçe Teaser — Medium Türkiye / Türkçe QA toplulukları

**Başlık önerisi:** Playwright ile Selenium Arasındaki Gerçek 5 Fark

Çoğu "Playwright vs Selenium" yazısı ikisinde de doğru olan ve karar
vermene yardımcı olmayan yüzeysel maddeler sıralar — çoklu dil desteği,
topluluk büyüklüğü, tarayıcı kapsamı. Aşağıdaki beş fark ise testleri
gerçekten nasıl yazıp sürdürdüğünü değiştiriyor.

**1. Auto-waiting sonradan eklenmedi, baştan içeride**

Selenium bir elementin VAR olduğunu söyler; HAZIR olduğunu söylemez. Selenium
setlerinin `WebDriverWait` çağrılarıyla, hatta daha kötüsü `Thread.sleep()`
ile dolmasının nedeni bu. Playwright'ın actionability kontrolleri her
etkileşimden ÖNCE otomatik çalışır — tıklamadan önce elementin bağlı,
görünür, stabil ve önünde engel olmadığını doğrular. Yine de iş kuralı
koşulları için (belirli bir API yanıtı, değişen bir değer) wait yazarsın,
ama tarayıcının kendi kendine yetişmesi için wait yazmayı bırakırsın.

**2. Network interception birinci sınıf bir API**

Selenium'da network çağrılarını mock'lamak veya doğrulamak, test kodunun
DIŞINDA ayrı bir proxy aracı (BrowserMob Proxy gibi) gerektirir. Playwright'ta
`page.route()` yerleşiktir:

```typescript
await page.route('**/api/orders', route =>
  route.fulfill({ status: 500, body: 'Internal Server Error' })
);
```

Bu, aynı test dosyasında yazılmış, ekstra altyapı gerektirmeyen tam bir
network seviyesi test double'ı. Gerçek backend'den tetikleyemediğin hata
durumlarını test etmek için büyük fark yaratır.

**3. Yeni tarayıcı açmadan context izolasyonu**

Selenium'un varsayılan modeli: bir tarayıcı örneği, bir session'ın state'ini
taşır. Playwright'ın `browser.newContext()`'i, ZATEN ÇALIŞAN bir tarayıcı
sürecinin İÇİNDE tamamen izole bir cookie/localStorage/cache sandbox'ı verir
— bu yüzden "A kullanıcısı olarak giriş yapmış" ile "B kullanıcısı olarak
giriş yapmış" durumlarını paralel test etmek Playwright'ta ucuz, Selenium'da
pahalıdır (birden fazla tarayıcı açılışı).

**4. Trace Viewer, CI hatasını debug edilebilir hale getirir**

CI'daki flaky bir Selenium hatası genelde bir ekran görüntüsü (yapılandırdıysan)
ve bir tahmindir. Playwright'ın Trace Viewer'ı başarısız test için DOM
anlık görüntüleri, network aktivitesi, konsol logları ve ekran görüntülerinden
oluşan tam bir zaman çizelgesi kaydeder — sonradan bir debugger gibi adım
adım izleyebilirsin.

**5. Codegen tahmin değil, gerçek bir locator üretir**

Playwright'ın `codegen`'i tıklamalarını kaydedip kendi önerdiği önceliğe
göre (rol, metin, test-id) locator üretir — bir sonraki markup değişikliğinde
kırılması muhtemel otomatik CSS/XPath yerine. Selenium'da bunun eşdeğeri
yoktur; locator stratejisi baştan sona sana kalır.

**Peki hangisini kullanmalı?** TestNG/Cucumber ile entegre, mevcut bir Grid
kurulumu olan büyük ve olgun bir Selenium + Java setini sürdürüyorsan
yeniden yazmak genelde değmez — Selenium hâlâ işini görür. Yeni bir proje
başlıyorsan veya ekibin zaten TypeScript/JavaScript'te yaşıyorsa, Playwright
tek bir test yazmadan önce zamanlama kaynaklı flaky'liğin tamamını ortadan
kaldırır.

pytest ile karşılaştırma, locator strateji farkları ve her ikisi için CI
kurulumu dahil tam karşılaştırmayı
[LearnQA.dev'deki Framework Karşılaştırması sayfasında](https://learnqa.dev/test-frameworks)
bulabilirsin — [tüm Selenium](https://learnqa.dev/selenium) ve
[Playwright](https://learnqa.dev/playwright) kursları da ücretsiz.

---

## İngilizce Tam Metin (dev.to / uluslararası Medium)

Most "Playwright vs Selenium" posts list the same surface-level bullet
points — multi-language support, community size, browser coverage — that are
true of both tools and don't help you decide anything. Here are five
differences that actually change how you write and maintain tests.

## 1. Auto-waiting is built in, not bolted on

Selenium tells you an element exists; it doesn't tell you it's *ready*.
That's why Selenium suites accumulate explicit `WebDriverWait` calls or,
worse, `Thread.sleep()`. Playwright's actionability checks run before every
interaction automatically — it waits for the element to be attached,
visible, stable, and not obstructed before clicking it. You still write waits
for *business* conditions (a specific API response, a value changing), but
you stop writing waits for the browser to simply catch up with itself.

## 2. Network interception is a first-class API

In Selenium, mocking or asserting on network calls means reaching for a
separate proxy tool (BrowserMob Proxy or similar) sitting outside your test
code. Playwright has `page.route()` built in:

```typescript
await page.route('**/api/orders', route =>
  route.fulfill({ status: 500, body: 'Internal Server Error' })
);
```

That's a full network-level test double, written in the same test file, no
extra infrastructure. This matters a lot for testing error states you can't
easily trigger from the real backend.

## 3. Browser context isolation, without launching new browsers

Selenium's default model is one browser instance holding one session's worth
of state. Playwright's `browser.newContext()` gives you a fresh, fully
isolated cookie/localStorage/cache sandbox *inside an already-running
browser process* — which is why testing "logged in as user A" and "logged in
as user B" in parallel is cheap in Playwright and expensive (multiple
browser launches) in Selenium.

## 4. Trace Viewer turns a CI failure into something you can actually debug

A flaky Selenium failure in CI usually means a screenshot, if you configured
one, and a guess. Playwright's Trace Viewer records a full timeline —
DOM snapshots, network activity, console logs, and screenshots — for the
failing test, and you can step through it after the fact like a debugger.
This alone has saved me more debugging time than any other feature on this
list.

## 5. Codegen gets you a real locator, not a guess

Playwright's `codegen` records your clicks and generates locators using its
own recommended priority (role, text, test-id) instead of an auto-generated
CSS/XPath selector likely to break on the next markup change. Selenium has no
equivalent built in — locator strategy is entirely on you from the start.

## So which one should you actually use?

If you're maintaining a large, mature Selenium + Java suite integrated with
TestNG/Cucumber and an existing Grid setup, rewriting it isn't usually worth
it — Selenium still does its job. If you're starting a new project, or your
team already lives in TypeScript/JavaScript, Playwright removes an entire
category of flakiness (timing) before you write a single test.

---

*A full side-by-side comparison — including pytest, locator strategy
differences, and CI setup for both — is available as an interactive page at
LearnQA.dev.*

Canonical / full version: `https://learnqa.dev/en/test-frameworks`
