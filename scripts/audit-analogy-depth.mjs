#!/usr/bin/env node
/**
 * audit-analogy-depth.mjs — CLAUDE.md Bölüm 9.3 "Düşündürücü Analoji Standardı" denetimi.
 *
 * Her `simple-box` bloğunun 4 katmanı taşıyıp taşımadığını sezgisel olarak ölçer:
 *   1. Somut analoji        (benzetme dili: "gibi", "düşün", "hayal et", "imagine", ...)
 *   2. Düşündürücü soru     (soru işareti + neden/niye/why/peki)
 *   3. Karşılaştırma/zıtlık (Java veya referans teknoloji ile yan yana koyma)
 *   4. İş dünyası/QA bağlamı (flaky, production, pipeline, bug, ekip, müşteri, ...)
 *
 * Kullanım:
 *   node scripts/audit-analogy-depth.mjs                 # tüm sayfalar, özet tablo
 *   node scripts/audit-analogy-depth.mjs --missing       # sadece eksik bloklar
 *   node scripts/audit-analogy-depth.mjs java sql        # sadece verilen sayfalar
 */

import { pathToFileURL } from 'node:url';
import path from 'node:path';

const DATA_DIR = path.resolve('src/data');

// sayfa adı -> data dosyası
const PAGES = {
  java: 'javaData.js',
  javascript: 'javascriptData.js',
  sql: 'sqlData.js',
  postman: 'postmanData.js',
  'rest-assured': 'restAssuredData.js',
  jmeter: 'jmeterData.js',
  kafka: 'kafkaData.js',
  appium: 'appiumData.js',
  browserstack: 'browserstackData.js',
  aws: 'awsData.js',
  azure: 'azureData.js',
  'git-github': 'gitGithubData.js',
  linux: 'linuxData.js',
  'what-is-testing': 'whatIsTestingData.js',
  gauge: 'gaugeData.js',
  bruno: 'brunoData.js',
  python: 'pythonData.js',
  typescript: 'typescriptData.js',
  selenium: 'seleniumData.js',
  playwright: 'playwrightData.js',
  cypress: 'cypressData.js',
  docker: 'dockerData.js',
  jenkins: 'jenkinsData.js',
  kubernetes: 'kubernetesData.js',
};

const ANALOGY_CUE = /(gibi|gibidir|düşün|dusun|hayal et|sanki|benzet|benzer|analoji|analogy|lego|imagine|think of|picture |\blike\b|as if|tıpkı|tipki|misali|kadar basit|sahne|senaryo gibi)/i;
// Metaforun KOPULA biçimi ("X, kiralık odadaki beyaz tahtadır" / "A Dockerfile is a
// recipe") benzetme sözcüğü içermez ve yalnızca ANALOGY_CUE ile aranırsa YANLIŞ
// POZİTİF verir (bkz. /docker — 10 bölümün tamamı bu yüzden bayraklanmıştı).
// Bu yüzden ikinci bir sinyal: gündelik hayattan somut "taşıyıcı" nesne/rol
// sözcükleri. Liste bilinçli olarak DAR ve teknoloji-dışıdır — teknik bir tanım
// cümlesi ("Docker bir container platformudur") bu sözcüklerin hiçbirini içermez.
const METAPHOR_VEHICLE = /(tarif|mutfak|çorba|corba|aşçı|asci|beyaz tahta|rehber|fabrika|montaj|kütüphane|kutuphane|kütüphaneci|kutuphaneci|postac|kurye|kargo|nakliye|bakkal|market|kasa|arşiv|arsiv|memur|sekreter|tercüman|tercuman|muhasebeci|müfettiş|mufettis|doktor|hastane|reçete|recete|çamaşırhane|camasirhane|gömlek|gomlek|terzi|şantiye|santiye|ekskavatör|ekskavator|trafik|otoyol|servis yolu|tabela|ehliyet|direksiyon|bisiklet|kamyon|tır\b|tir\b|araba|gösterge paneli|gosterge paneli|uyarı ışığ|uyari isig|banka|havale|nikâh|nikah|tören|toren|okul|sınıf|sinif|öğrenci|ogrenci|not defteri|ders kitab|kitabın arkas|kitabin arkas|dizin|ayraç|ayrac|adres defteri|telefon rehberi|restoran|garson|müşteri masas|musteri masas|buzdolab|yemek|kağıt bardak|kagit bardak|laboratuvar|tiyatro|yönetmen|yonetmen|orkestra|şef\b|sef\b|nakliyeci|taşınmak|tasinmak|ev sahibi|kiralık|kiralik|apartman|anket|form|kutu|zarf|dosya dolab|klasör|klasor|whiteboard|recipe|kitchen|soup|chef|cook|directory|phone book|factory|assembly line|librarian|library|postman |courier|shipping|warehouse|archive|clerk|receptionist|interpreter|accountant|inspector|doctor|hospital|prescription|laundry|shirt|tailor|construction site|excavator|traffic|highway|road sign|driving (test|licence|license)|bicycle|lorry|truck|dashboard|warning light|bank|wedding|ceremony|school|classroom|student|notebook|bookmark|index at the back|address book|restaurant|waiter|fridge|paper cup|laboratory|theatre|theater|director|orchestra|conductor|removals|moving house|landlord|rented|survey|envelope|filing cabinet|folder)/i;
const ANALOGY = { test: (t) => ANALOGY_CUE.test(t) || METAPHOR_VEHICLE.test(t) };
const QUESTION = /\?/;
const WHY = /(neden|niçin|nicin|niye|peki|why|what if|ne olur|ne olurdu|how come|hangi|nasıl|nasil|what happens|how does|how do|what makes|isn'?t|aren'?t|shouldn'?t|doesn'?t|wouldn'?t)/i;
// Soru işareti olmayan retorik "asıl soru şu ..." kalıpları da düşündürücü soru sayılır
// (referans /postman ve /kafka bölümleri bu kalıbı kullanıyor).
const RHETORICAL = /(asıl soru|asil soru|sorulabilir|şu soruyu sor|su soruyu sor|the real question|the question (that|to ask)|question to ask yourself|but here is the question|ask yourself)/i;
// Karşılaştırma katmanı: ya açık bir zıtlık bağlacı, ya da sayfanın KENDİ teknolojisi
// dışında bir referans teknolojinin (Java, Postman, Selenium...) yan yana konması.
const COMPARE_WORD = /(oysa|ama\b|fark[ıi]|farkl[ıi]|karşılaştır|karsilastir|\bvs\.?\b|versus|unlike|whereas|compared|instead of|rather than|yerine|değil\b|degil\b|iken\b|while\b|öte yandan|ote yandan)/i;
const TECH_NAMES = ['java', 'python', 'javascript', 'typescript', 'sql', 'postman', 'bruno', 'selenium', 'playwright', 'cypress', 'docker', 'jenkins', 'kubernetes', 'kafka', 'appium', 'jmeter', 'linux', 'git', 'aws', 'azure', 'rest assured', 'browserstack', 'maven', 'gradle', 'junit', 'testng', 'excel', 'curl'];
const QA_CONTEXT = /(qa\b|test|flaky|production|prod\b|pipeline|ci\/cd|\bci\b|bug|hata|regresyon|regression|müşteri|musteri|ekip|team|release|deploy|incident|mülakat|mulakat|sprint|otomasyon|automation|canlı|canli|gerçek hayat|real.world)/i;

const flatten = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(flatten).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(flatten).join(' ');
  return '';
};

/**
 * Bölüm = `blocks` dizisi taşıyan her düğüm. Hem tek ağaçlı (bilingual field)
 * hem EN+TR ayrı ağaçlı veri dosyalarında çalışır.
 */
function collectSections(node, out, seen) {
  if (!node || typeof node !== 'object') return;
  if (seen.has(node)) return;
  seen.add(node);

  if (Array.isArray(node)) {
    node.forEach((child) => collectSections(child, out, seen));
    return;
  }

  if (Array.isArray(node.blocks)) {
    out.push(node);
  }

  for (const child of Object.values(node)) {
    if (child && typeof child === 'object') collectSections(child, out, seen);
  }
}

/**
 * §9.3'ün 4 katmanı referans sayfa `/bruno`'da yalnızca simple-box içinde
 * değil, bölümün açılış blok KÜMESİNDE yaşar — düşündürücü "neden" sorusu
 * çoğu yerde komşu `heading`/`text` bloğundadır. Bu yüzden değerlendirme
 * birimi, bölümün simple-box'ı + onu izleyen anlatım bloklarıdır.
 */
function sectionOpeningText(section) {
  const blocks = section.blocks;
  const firstBoxIdx = blocks.findIndex((b) => b && b.type === 'simple-box');
  if (firstBoxIdx === -1) return null; // simple-box'ı olmayan bölüm bu denetimin konusu değil
  const opening = blocks
    .slice(firstBoxIdx, firstBoxIdx + 6)
    .filter((b) => b && ['simple-box', 'heading', 'text', 'callout'].includes(b.type));
  const boxCount = opening.filter((b) => b.type === 'simple-box').length;
  return { text: opening.map((b) => flatten(b.content ?? b.text ?? '')).join('\n'), boxCount };
}

const boxText = (box) => flatten(box.content ?? box.text ?? box);

/**
 * Referans sayfa `/bruno`'da 4 katman TEK bloğa değil, bölümün açılış
 * simple-box KÜMESİNE yayılmıştır (LEGO analojisi #1/#2 ayrı kutular).
 * Bu yüzden değerlendirme birimi tek blok değil, bölümün tüm kutularıdır.
 */
function scoreSection(texts, page) {
  const text = texts.join('\n');
  const others = TECH_NAMES.filter((t) => !page.includes(t) && !t.includes(page.split('-')[0]));
  const namesReferenced = others.filter((t) => new RegExp(`\\b${t}\\b`, 'i').test(text)).length;
  const layers = {
    analogy: ANALOGY.test(text),
    question: (QUESTION.test(text) && WHY.test(text)) || RHETORICAL.test(text),
    compare: COMPARE_WORD.test(text) || namesReferenced > 0,
    qa: QA_CONTEXT.test(text),
  };
  const passed = Object.values(layers).filter(Boolean).length;
  return { text, layers, passed, len: text.length };
}

const args = process.argv.slice(2);
const onlyMissing = args.includes('--missing');
const requested = args.filter((a) => !a.startsWith('--'));
const pages = requested.length ? requested : Object.keys(PAGES);

let totalBoxes = 0;
let totalWeak = 0;
const rows = [];

for (const page of pages) {
  const file = PAGES[page];
  if (!file) {
    console.error(`! bilinmeyen sayfa: ${page}`);
    process.exitCode = 1;
    continue;
  }
  let mod;
  try {
    mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
  } catch (err) {
    console.error(`! ${page} import edilemedi: ${err.message}`);
    process.exitCode = 1;
    continue;
  }

  const sections = [];
  collectSections(mod, sections, new Set());

  const weak = [];
  let scored = 0;
  let boxTotal = 0;
  for (const section of sections) {
    const opening = sectionOpeningText(section);
    if (!opening) continue;
    scored += 1;
    boxTotal += opening.boxCount;
    const s = scoreSection([opening.text], page);
    if (s.passed < 4) {
      const title = flatten(section.title ?? section.label ?? '(başlıksız)').slice(0, 60);
      weak.push({ section: title, count: opening.boxCount, ...s });
    }
  }

  totalBoxes += scored;
  totalWeak += weak.length;
  rows.push({ page, total: scored, boxes: boxTotal, weak: weak.length });

  if (weak.length) {
    console.log(`\n=== /${page} — ${scored} bölüm (${boxTotal} box), ${weak.length} bölüm eksik ===`);
    for (const w of weak) {
      const missing = Object.entries(w.layers)
        .filter(([, ok]) => !ok)
        .map(([k]) => k)
        .join(', ');
      const preview = w.text.replace(/\s+/g, ' ').slice(0, 100);
      console.log(`  [${w.passed}/4] eksik: ${missing} | ${w.count} box, ${w.len} char | ${w.section}`);
      console.log(`         ${preview}...`);
    }
  }
}

console.log('\n--- ÖZET ---');
for (const r of rows) {
  const mark = r.weak === 0 ? '✓' : '✗';
  console.log(`${mark} /${r.page.padEnd(16)} ${String(r.total).padStart(3)} bölüm (${String(r.boxes).padStart(3)} box), ${String(r.weak).padStart(3)} eksik`);
}
console.log(`\nToplam: ${totalBoxes} bölüm, ${totalWeak} standart altı.`);
