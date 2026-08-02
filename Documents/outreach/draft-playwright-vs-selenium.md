# Draft — dev.to / Medium — Playwright vs Selenium

**Working title:** 5 Things That Actually Differ Between Playwright and Selenium

---

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
