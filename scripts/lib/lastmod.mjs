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

/** Route'un veri dosyasının son commit tarihi (ISO) — bilinmiyorsa boş dize. */
export function lastModFor(routePath) {
    if (isShallowRepo) return ''
    if (cache.has(routePath)) return cache.get(routePath)

    const config = DATA_MODULES[routePath]
    const relativeFile = config?.file?.replace('../../', '')
    const iso = relativeFile ? gitOutput(['log', '-1', '--format=%cI', '--', relativeFile]) : ''
    cache.set(routePath, iso)
    return iso
}
