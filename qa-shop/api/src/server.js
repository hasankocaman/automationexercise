// Giriş noktası.
import { createApp } from './app.js'
import { pool, healthCheck } from './db.js'

const PORT = Number.parseInt(process.env.PORT || '4000', 10)

// Veritabanı, API'den birkaç saniye sonra hazır olabilir (Docker'da sık).
// Beklemeden başlarsak ilk istekler 503 döner ve "API bozuk" sanılır.
async function waitForDatabase(retries = 30, delayMs = 1000) {
    for (let attempt = 1; attempt <= retries; attempt += 1) {
        try {
            await healthCheck()
            console.log(`[db] bağlantı hazır (${attempt}. deneme)`)
            return true
        } catch (err) {
            if (attempt === retries) {
                console.error(`[db] ${retries} denemede bağlanılamadı: ${err.message}`)
                return false
            }
            await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
    }
    return false
}

const ready = await waitForDatabase()
if (!ready) {
    // Çıkış kodu 1: Docker'ın restart politikası devreye girsin. Ayakta ama
    // çalışmayan bir servis, çökmüş bir servisten daha zor teşhis edilir.
    process.exit(1)
}

const app = createApp()
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`QA Shop API çalışıyor: http://localhost:${PORT}/api/v1`)
    console.log(`Sağlık kontrolü:       http://localhost:${PORT}/health`)
})

// Nazik kapanış: devam eden istekler tamamlansın, havuz düzgün kapansın.
// Bu olmadan `docker compose down` sırasında yarım kalan transaction'lar
// kilit bırakabilir.
for (const signal of ['SIGTERM', 'SIGINT']) {
    process.on(signal, () => {
        console.log(`\n[${signal}] kapanıyor...`)
        server.close(async () => {
            await pool.end()
            process.exit(0)
        })
        setTimeout(() => process.exit(1), 10_000).unref()
    })
}
