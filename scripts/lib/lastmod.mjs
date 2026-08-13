// ─── Sayfa son değişiklik tarihi (git) ───────────────────────────────────────
// Bir sayfanın gerçek son değişiklik tarihi, içeriğini taşıyan veri dosyasının
// son commit tarihidir. İki yerde kullanılır: sitemap `lastmod` alanı ve
// sayfaların `dateModified` şeması + görünür künyesi. Tek modülde toplandı ki
// ikisi ASLA farklı bir tarih göstermesin.
//
// İki koruma:
//   1. Shallow clone'da (CI'ın varsayılan `fetch-depth: 1`) tüm dosyalar aynı
//      tek commit'i gösterir; böyle bir durumda tarih HİÇ yazılmaz — her
//      deploy'da "her sayfa bugün değişti" demek sinyali tümden değersizleştirir.
//   2. Git yoksa/başarısızsa sessizce atlanır (tarih boş döner, çağıran taraf
//      tarihi olmayan bir künye basar).

import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DATA_MODULES } from './topicDataModules.mjs'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

function gitOutput(args) {
    try {
        return execFileSync('git', args, { cwd: rootDir, encoding: 'utf8' }).trim()
    } catch {
        return ''
    }
}

export const isShallowRepo = gitOutput(['rev-parse', '--is-shallow-repository']) !== 'false'

const cache = new Map()

// Her route'un içeriği bir `*Data.js` dosyasında durmaz. Ana sayfa bunun en
// önemli örneği: içeriği bir bileşende ve build sırasında türetilen mülakat
// vitrininde yaşıyor. Bu tablo olmadan ana sayfa sitemap'te TARİHSİZ kalıyordu
// — yani sitenin en önemli URL'i, yeniden tarama önceliği için kullanılan tek
// sinyali taşımıyordu. Birden fazla dosya verilebilir; EN YENİ tarih kazanır.
const EXTRA_SOURCES = {
    '/': [
        'src/components/HomePage.jsx',
        'src/data/generated/interviewShowcase.js',
    ],
}

function newestCommitDate(files) {
    const dates = files
        .map((file) => gitOutput(['log', '-1', '--format=%cI', '--', file]))
        .filter(Boolean)
        .sort()
    return dates.length ? dates[dates.length - 1] : ''
}

/** Route'un kaynak dosyasının son commit tarihi (ISO) — bilinmiyorsa boş dize. */
export function lastModFor(routePath) {
    if (isShallowRepo) return ''
    if (cache.has(routePath)) return cache.get(routePath)

    const config = DATA_MODULES[routePath]
    const relativeFile = config?.file?.replace('../../', '')
    const files = relativeFile ? [relativeFile] : (EXTRA_SOURCES[routePath] || [])
    const iso = newestCommitDate(files)
    cache.set(routePath, iso)
    return iso
}
