import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
// `vite preview` her route için ÜRETİLEN kabuğu servis etmiyordu — testler
// production build'e taşınınca ortaya çıkan sessiz arıza.
//
// Ölçüm: `curl http://localhost:4175/docker` → ana sayfanın kabuğu geliyordu
// (canonical `https://learnqa.dev/`, hreflang `tr=https://learnqa.dev/`).
// Aynı adres sondaki eğik çizgiyle, `/docker/`, DOĞRU kabuğu veriyordu
// (canonical `.../docker`). Sebep: preview'in statik katmanı uzantısız yolu
// dosyaya çözemeyince istek SPA yedeğine düşüyor ve `dist/index.html`
// dönüyor. GitHub Pages ise `/docker` → `/docker/` yönlendirmesi yapıp
// `dist/docker/index.html`'i servis eder — yani preview, YAYINLANAN şeyi
// taklit etmiyordu.
//
// Sonucu testlerde şuydu: her sayfa, React mount olana kadar ANA SAYFANIN
// başlığını/canonical'ını/hreflang'ini taşıyordu. Bu değerleri React'ten önce
// okuyan her doğrulama, ürün doğru olduğu hâlde yanlış cevabı görüyordu; makine
// yüklendikçe pencere büyüyor ve testler "flaky" oluyordu. Süreyi uzatmak bunu
// gizlerdi — kabuğun kendisi yanlıştı.
//
// Yönlendirme değil İÇERİDEN yeniden yazma yapılıyor: tarayıcıdaki adres
// `/docker` olarak kalır (testlerin ve uygulamanın beklediği hâli), yalnızca
// gövde doğru kabuk olur.
// ─────────────────────────────────────────────────────────────────────────────
function previewDirectoryIndex() {
    return {
        name: 'preview-directory-index',
        configurePreviewServer(server) {
            const root = server.config.build.outDir || 'dist'

            server.middlewares.use((req, _res, next) => {
                if (req.method !== 'GET' && req.method !== 'HEAD') return next()

                const [pathname, query = ''] = (req.url || '/').split('?')
                // Zaten eğik çizgiyle biten, kök olan veya uzantı taşıyan
                // (asset) istekler olduğu gibi geçer.
                const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1)
                if (pathname === '/' || pathname.endsWith('/') || lastSegment.includes('.')) return next()

                const candidate = join(root, decodeURIComponent(pathname), 'index.html')
                if (existsSync(candidate) && statSync(candidate).isFile()) {
                    req.url = `${pathname}/index.html${query ? `?${query}` : ''}`
                }

                return next()
            })
        },
    }
}

export default defineConfig({
    base: '/',
    plugins: [react(), previewDirectoryIndex()],
    server: {
        port: 5173,
        open: true,
    },
})
