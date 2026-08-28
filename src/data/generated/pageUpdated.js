// OTOMATİK ÜRETİLDİ — elle düzenleme, npm run build sırasında yeniden yazılır.
// Kaynak: scripts/generate-seo-files.mjs (tarih: scripts/lib/lastmod.mjs)
//
// Ders sayfası → içeriğini taşıyan veri dosyasının son commit tarihi.
// Sayfadaki görünür künye ve `dateModified` şeması bunu kullanır; sitemap
// `lastmod` alanı da AYNI kaynaktan gelir, bu yüzden üçü ayrışamaz.
// Shallow clone'da güvenilir tarih üretilemediği için manifest BOŞ kalır ve
// künye tarihsiz basılır (yanlış tarih göstermektense hiç göstermemek).

export const PAGE_UPDATED = {
  "/advanced-algorithms": "2026-07-21T17:06:05+03:00",
  "/algorithms": "2026-07-21T14:21:33+03:00",
  "/api-testing": "2026-08-28T10:56:54+03:00",
  "/appium": "2026-07-21T23:21:05+03:00",
  "/aws": "2026-07-20T22:01:54+03:00",
  "/azure": "2026-07-21T19:22:10+03:00",
  "/backend": "2026-07-29T13:37:44+03:00",
  "/basit-backend": "2026-07-27T15:38:39+03:00",
  "/browserstack": "2026-07-27T16:51:51+03:00",
  "/bruno": "2026-07-21T18:22:44+03:00",
  "/claude-ai": "2026-08-01T07:49:17+03:00",
  "/cypress": "2026-08-28T10:56:54+03:00",
  "/docker": "2026-08-13T18:28:43+03:00",
  "/gauge": "2026-08-28T10:56:54+03:00",
  "/git-github": "2026-08-01T12:19:03+03:00",
  "/java": "2026-08-13T18:28:43+03:00",
  "/javascript": "2026-08-01T14:30:41+03:00",
  "/jenkins": "2026-08-02T21:23:58+03:00",
  "/jira": "2026-08-28T10:56:54+03:00",
  "/jmeter": "2026-07-27T15:38:39+03:00",
  "/kafka": "2026-07-27T15:38:39+03:00",
  "/kubernetes": "2026-07-21T19:22:10+03:00",
  "/linux": "2026-08-28T10:56:54+03:00",
  "/llm-agents": "2026-07-18T20:52:19+03:00",
  "/manual-testing": "2026-07-21T16:00:01+03:00",
  "/playwright": "2026-08-13T18:28:43+03:00",
  "/postman": "2026-08-01T13:28:21+03:00",
  "/python": "2026-08-28T10:56:54+03:00",
  "/qa-frontend": "2026-08-01T14:30:41+03:00",
  "/qa-mentor": "2026-08-28T10:56:54+03:00",
  "/rest-assured": "2026-07-31T11:27:58+03:00",
  "/security": "2026-07-27T15:38:39+03:00",
  "/selenium": "2026-08-13T18:28:43+03:00",
  "/sql": "2026-08-13T18:28:43+03:00",
  "/test-automation": "2026-08-02T21:48:34+03:00",
  "/typescript": "2026-07-28T09:55:56+03:00",
  "/what-is-testing": "2026-08-28T10:56:24+03:00"
}

export function pageUpdatedFor(routePath) {
    return PAGE_UPDATED[routePath] || ''
}
