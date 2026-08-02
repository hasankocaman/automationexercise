# Draft — dev.to / Medium — Selenium Wait Strategies

**Working title:** Why `Thread.sleep()` Is Lying to Your Selenium Test Suite

---

Every Selenium test suite I've inherited has had at least one `Thread.sleep(3000)`
buried somewhere. It always started the same way: someone hit a flaky test,
added a sleep to "fix" it, the test went green, and nobody touched that line
again — until the suite got slow enough that someone had to ask why a 40-test
run takes eleven minutes.

`Thread.sleep()` doesn't wait for a condition. It waits for a clock. That
distinction matters more than it sounds like it should.

## The actual problem it's covering up

When a test needs a wait, it's almost always because the browser and your test
code are racing each other. The page has started rendering, but the specific
element you need — a button that only appears after an API call resolves, a
row that gets added to a table after a search debounce — isn't there yet.

A fixed sleep is a guess about how long that race takes. On your laptop, three
seconds is comfortable. On a loaded CI runner, three seconds might not be
enough — and now your "passing" test is flaky again, just less often. You
haven't fixed the timing problem. You've hidden it behind a number that will
eventually be wrong.

## What an explicit wait actually does differently

Selenium's `WebDriverWait` + `ExpectedConditions` doesn't wait for time to
pass — it polls for a condition to become true, and returns the instant it
does:

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit-button")));
```

If the element is ready in 200ms, the test moves on in 200ms. If it takes 8
seconds because CI is under load, the test still passes — because it isn't
racing a fixed number, it's racing a real signal from the page. That's the
whole difference: one strategy commits to a duration, the other commits to a
condition.

## The trap most people fall into next

Once someone learns explicit waits exist, the second-most-common mistake
shows up: leaving `implicit wait` and `explicit wait` configured at the same
time. Selenium's implicit wait applies to *every* element lookup globally,
and mixing it with per-call explicit waits produces inconsistent, additive
timeouts that are miserable to debug. Pick one strategy — explicit waits, on
the specific condition you actually need — and don't mix in a global implicit
wait alongside it.

## Why this is worth fixing, not just tolerating

A test suite full of `Thread.sleep()` calls has a ceiling on how fast it can
possibly run, no matter how much you parallelize it — you're always waiting
out worst-case durations even in the best case. Explicit, condition-based
waits are usually the single biggest speed-up available in an existing
Selenium suite, and they're also the fix for the specific flavor of flakiness
where "it passes locally but fails in CI half the time."

---

*I wrote a longer, interactive walkthrough of this — along with the other
common wait strategies (`FluentWait`, custom `ExpectedConditions`, and where
each one actually fits) with runnable examples — as part of a free Selenium
course at LearnQA.dev.*

Canonical / full version: `https://learnqa.dev/en/selenium/wait-strategies`
