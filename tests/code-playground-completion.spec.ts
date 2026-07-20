import { test, expect } from '@playwright/test';

// code-playground blokları için "gerçekten kaydediliyor mu?" regresyon testi.
// Kök vaka (2026-07-20, kullanıcı bildirimi): /what-is-testing'in "Site Haritası"
// sekmesi hiçbir zaman tamamlanamıyordu çünkü tek egzersizinin (roadmapPractice)
// `id` alanı yoktu — CodePlaygroundBlock.jsx'teki awardXpOnce() `if (!block.id) return`
// ile SESSİZCE çıkıyor, UI yine de "Doğru!" mesajını gösteriyordu. Bu dosya SADECE
// UI mesajını değil, ALTINDAKİ VERİNİN (localStorage XP/completed + sekme
// tamamlanma checkbox'ı) gerçekten güncellendiğini doğrular — statik
// check-content-integrity.mjs Check (F) ile aynı bug sınıfını, ama runtime'da
// yakalar. serviceWorkers: 'block' ZORUNLU (bilinen MSW tuzağı).
//
// NOT (aynı gün, devam): Kullanıcı isteğiyle Site Haritası sekmesine SONRADAN
// bir quiz bloğu eklendi (kullanıcı gerçek text-eşleşmesi gerektiren egzersizi
// tutturmakta zorlandığı için). Bu, egzersiz-tamamlanınca-otomatik-sekme-
// tamamlama davranışını (o ÖZEL "quiz'i olmayan sekme" durumu) devre dışı
// bırakır — artık bu sekme de diğerleri gibi QUIZ ile tamamlanır. Test bunu
// iki ayrı adımda doğrular: (1) egzersiz XP/completed'a yazar ama TEK BAŞINA
// sekmeyi tamamlamaz (quiz zaten var, gate quiz'e geçti), (2) quiz doğru
// cevaplanınca sekme tamamlanır.

test.describe('code-playground XP/tamamlama kaydı — sessiz veri kaybı regresyonu', () => {
    test('/what-is-testing — "Site Haritası" egzersizi XP\'yi gerçekten kaydeder, sekme ise quiz ile tamamlanır', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/what-is-testing');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const tabButtons = page.locator('button[title]');
        const count = await tabButtons.count();
        let found = false;
        for (let i = 0; i < count; i++) {
            const title = await tabButtons.nth(i).getAttribute('title');
            if (title?.includes('Site Harita')) {
                await tabButtons.nth(i).click();
                found = true;
                break;
            }
        }
        expect(found).toBe(true);

        const checkbox = page.locator('button').filter({ hasText: 'Site Harita' }).locator('[role="checkbox"]');
        await expect(checkbox).toHaveAttribute('aria-checked', 'false');

        const textarea = page.locator('textarea').first();
        await textarea.waitFor({ state: 'visible', timeout: 10_000 });
        const solution = "// Hedef: Java bilen bir QA'nin dogru ogrenme sirasini yaz\nconst sira = [\"B\", \"C\", \"A\"];\n// B) Python temelleri -> C) pytest -> A) Selenium + POM";
        await textarea.fill(solution);
        await page.getByRole('button', { name: /Çalıştır ve Kontrol Et/i }).first().click();

        await expect(page.getByText(/Doğru! Kod beklenen çözümle eşleşti/i)).toBeVisible({ timeout: 5_000 });

        // Asıl regresyon kontrolü: UI mesajı DEĞİL, altındaki veri.
        const xpState = await page.evaluate(() => {
            const raw = localStorage.getItem('learnqa_xp_what-is-testing');
            return raw ? JSON.parse(raw) : null;
        });
        expect(xpState?.completed).toContain('wit-site-map-practice-01');

        // Sekmede artık bir quiz de var — sadece egzersiz TEK BAŞINA sekmeyi
        // tamamlamaz (gate quiz'e geçti, §9.4/handleExerciseCompleted kuralı).
        await expect(checkbox).toHaveAttribute('aria-checked', 'false');

        // Quiz'i doğru cevapla → ŞİMDİ sekme tamamlanır.
        await page.getByText('Bir QA, Python ile otomasyon yapmaya karar verip').scrollIntoViewIfNeeded();
        await page.getByText("pytest'in veya Selenium'un verdiği bir hatanın", { exact: false }).first().click();
        await page.getByRole('button', { name: /Cevabı Kontrol Et/i }).click();

        await expect(checkbox).toHaveAttribute('aria-checked', 'true', { timeout: 5_000 });

        await context.close();
    });

    test('/postman — "Kendin Dene" egzersizi çözülünce localStorage XP completed listesine gerçekten yazılır', async ({ browser }) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({ serviceWorkers: 'block' });
        const page = await context.newPage();

        await page.goto('/postman');
        await page.waitForSelector('h1', { timeout: 30_000 });

        const before = await page.evaluate(() => {
            const raw = localStorage.getItem('learnqa_xp_postman');
            return raw ? JSON.parse(raw) : null;
        });
        expect(before?.completed || []).not.toContain('postman-introduction');

        const allTextareas = page.locator('textarea');
        const total = await allTextareas.count();
        let targetIndex = -1;
        for (let i = 0; i < total; i++) {
            const val = await allTextareas.nth(i).inputValue();
            if (val.includes('Dogru metodu sec')) { targetIndex = i; break; }
        }
        expect(targetIndex).toBeGreaterThanOrEqual(0);

        const solution = '// PUT: mevcut kaynagi GUNCELLER, idempotent\'tir\nfetch("/api/users/2", { method: "PUT", body: JSON.stringify({ email: "yeni@ornek.com" }) })';
        await allTextareas.nth(targetIndex).fill(solution);
        await page.getByRole('button', { name: /Çalıştır ve Kontrol Et/i }).nth(targetIndex).click();
        await expect(page.getByText(/Doğru!/i).first()).toBeVisible({ timeout: 5_000 });

        const after = await page.evaluate(() => {
            const raw = localStorage.getItem('learnqa_xp_postman');
            return raw ? JSON.parse(raw) : null;
        });
        expect(after?.completed).toContain('postman-introduction');

        await context.close();
    });
});
