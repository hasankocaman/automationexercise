// ─── IndexNow bildirimi ───────────────────────────────────────────────────────
// Arama motorunun siteyi kendiliğinden yeniden taramasını beklemek yerine
// "şu adresler değişti" diye HABER VERİR. Bing ve Yandex bu protokolü kabul
// eder; Google etmez.
//
// Google kabul etmiyorsa neden yapıyoruz:
//   1. Bing indeksi yalnızca Bing değildir — birçok yapay zeka asistanı web
//      aramasını oradan yapar. Yeni bir sitenin oraya hızlı girmesi, Google
//      beklerken görünür olmanın tek yoludur.
//   2. Bir başka motorda hızla indekslenmek, sitenin gerçekten var olduğuna
//      dair bağımsız bir sinyaldir.
//
// Neyi bildirir: SON `--days` GÜN içinde değişmiş sayfaları. Değişmemiş URL'i
// her deploy'da yeniden bildirmek protokolün açıkça caydırdığı bir davranıştır
// ve bildirimlerin ciddiye alınma olasılığını düşürür.
//
// Bu script deploy'u ASLA kırmaz: ağ hatası, 4xx/5xx, eksik anahtar — hepsinde
// uyarı basıp 0 ile çıkar. Bir arama motoruna haber verememek yayını
// durdurmayı gerektirecek bir arıza değildir.
//
// Kullanım:
//   node scripts/ping-indexnow.mjs              # son 7 günde değişenler
//   node scripts/ping-indexnow.mjs --days 30
//   node scripts/ping-indexnow.mjs --dry-run    # istek atmaz, ne göndereceğini yazar

import { readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/utils/seo.js'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(rootDir, 'public')

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const daysArg = args.indexOf('--days')
const days = daysArg !== -1 ? Number(args[daysArg + 1]) : 7

const host = new URL(SITE_URL).host
const ENDPOINT = 'https://api.indexnow.org/indexnow'

/** `public/` altındaki IndexNow anahtar dosyası: <key>.txt, içeriği <key>. */
async function findKey() {
    const files = await readdir(publicDir)
    for (const file of files) {
        const match = /^([a-f0-9]{8,128})\.txt$/i.exec(file)
        if (!match) continue
        const content = (await readFile(join(publicDir, file), 'utf8')).trim()
        // Dosya adı ile içeriği aynı olmak ZORUNDA — motor anahtarı bu
        // dosyayı çekip doğrular. Ayrışırsa bildirim sessizce reddedilir.
        if (content === match[1]) return match[1]
        console.warn(`IndexNow: ${file} içeriği dosya adıyla eşleşmiyor, atlanıyor.`)
    }
    return ''
}

/** Sitemap indeksinin gösterdiği tüm çocuk dosyalardan URL + lastmod toplar. */
async function collectUrls() {
    const indexXml = await readFile(join(publicDir, 'sitemap.xml'), 'utf8')
    const children = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

    const urls = []
    for (const childUrl of children) {
        const file = join(publicDir, childUrl.replace(SITE_URL, ''))
        const xml = await readFile(file, 'utf8')
        for (const block of xml.split('<url>').slice(1)) {
            const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1]
            if (!loc) continue
            urls.push({ loc, lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(block)?.[1] || '' })
        }
    }
    return urls
}

const key = await findKey()
if (!key) {
    console.warn('IndexNow: public/ altında anahtar dosyası yok — bildirim atlandı.')
    process.exit(0)
}

const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
const all = await collectUrls()
// Tarihi olmayan URL atlanır: "bilinmiyor"u "değişti" saymak, her deploy'da
// tüm siteyi bildirmek anlamına gelirdi (sığ klonda tarihler boş gelir).
const changed = all.filter((u) => u.lastmod && Date.parse(u.lastmod) >= cutoff).map((u) => u.loc)

if (!changed.length) {
    console.log(`IndexNow: son ${days} günde değişen sayfa yok (${all.length} URL tarandı) — bildirim atlanıyor.`)
    process.exit(0)
}

const payload = { host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList: changed }

if (dryRun) {
    console.log(`IndexNow (dry-run): ${changed.length} URL bildirilecekti.`)
    console.log(changed.slice(0, 10).join('\n') + (changed.length > 10 ? `\n... (+${changed.length - 10})` : ''))
    process.exit(0)
}

try {
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
    })
    // 200 = kabul edildi, 202 = kabul edildi ama anahtar doğrulaması sürüyor.
    if (res.ok) console.log(`IndexNow: ${changed.length} URL bildirildi (HTTP ${res.status}).`)
    else console.warn(`IndexNow: bildirim reddedildi (HTTP ${res.status}) — deploy etkilenmedi.`)
} catch (error) {
    console.warn(`IndexNow: bildirim gönderilemedi (${error.message}) — deploy etkilenmedi.`)
}
