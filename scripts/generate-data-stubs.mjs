import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// ─────────────────────────────────────────────────────────────────────────────
// SEO Faz 2 — Performans (Documents/seo-phase-2-plan.md §7.1)
//
// typescriptData.js / javaData.js / sqlData.js sekme içerikleriyle BİRLİKTE
// 850KB-1.1MB'lık tek chunk'lar üretiyordu; sayfa açılışında kullanıcı tek bir
// sekme görürken TÜM sekmelerin verisi senkron olarak indiriliyordu (LCP'yi
// mobilde düşürüyordu).
//
// Bu script kaynak dosyalara HİÇ DOKUNMADAN (tek doğruluk kaynağı hâlâ
// <name>Data.js dosyalarıdır — içerik değişikliği hâlâ SADECE oralarda yapılır,
// CLAUDE.md §5/§8) her sayfa için TEK, KÜÇÜK bir "stub" üretir: sadece `hero` +
// `tabs` (sekme etiketleri) + boş `sections`. Sayfa bileşeni (ör. TypeScriptPage.jsx)
// önce bu stub'ı senkron gösterir (hızlı ilk boya), sonra useEffect içinde GERÇEK
// veri dosyasını dinamik import() ile arka planda yükleyip değiştirir. Stub sadece
// yükleme penceresinde (tipik olarak yüzlerce ms) görünür — gerçek veriyle
// DEĞİŞTİRİLDİĞİ için stub'ın bayatlaması KALICI bir hataya dönüşmez, en kötü
// ihtimalle çok yavaş bir bağlantıda kısa bir eski→yeni metin yanıp sönmesi olur.
//
// Build zincirine bağlıdır (npm run build) — her build'de GÜNCEL kaynaktan
// yeniden üretilir, elle düzenlenmez. Hero/tabs metnini değiştirdiysen dev
// modunda görmek için `npm run generate:data-stubs` çalıştır.
// ─────────────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'src', 'data')

const TARGETS = [
    { source: 'typescriptData.js', exportName: 'typescriptData', stubName: 'typescriptDataStub', outFile: 'typescriptDataStub.js' },
    { source: 'javaData.js', exportName: 'javaData', stubName: 'javaDataStub', outFile: 'javaDataStub.js' },
    { source: 'sqlData.js', exportName: 'sqlData', stubName: 'sqlDataStub', outFile: 'sqlDataStub.js' },
]

for (const target of TARGETS) {
    const modUrl = pathToFileUrl(join(dataDir, target.source))
    const mod = await import(`${modUrl}?t=${Date.now()}`)
    const data = mod[target.exportName]

    const stub = {
        tr: { hero: data.tr.hero, tabs: data.tr.tabs, sections: [] },
        en: { hero: data.en.hero, tabs: data.en.tabs, sections: [] },
    }

    const header = `// AUTO-GENERATED — elle düzenleme. Kaynak: scripts/generate-data-stubs.mjs\n` +
        `// Kaynak veri: src/data/${target.source}. Yeniden üretmek için: npm run generate:data-stubs\n` +
        `// Amaç ve tasarım gerekçesi: Documents/seo-phase-2-plan.md §7.1\n\n`

    const body = `export const ${target.stubName} = ${JSON.stringify(stub, null, 2)}\n`

    await writeFile(join(dataDir, target.outFile), header + body)
    console.log(`Generated src/data/${target.outFile} from ${target.source}.`)
}

function pathToFileUrl(path) {
    return new URL(`file://${path}`).href
}
