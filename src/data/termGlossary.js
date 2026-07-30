// Kavram Sözlüğü — yazılım bilmeyen kullanıcı için inline günlük-hayat benzetmeleri
// (Documents/challenge-first-experience-plan.md §3.6, Phase 1.5)
//
// Amaç: sitede geçen yazılım terimlerinin üstüne gelince (hover) / dokununca (tap)
// küçük bir açıklama baloncuğu belirsin — teknik tanım DEĞİL, günlük hayattan basit
// bir BENZETME. Hedef kitle: sıfır yazılım bilgisi olan bir ziyaretçi.
//
// Şema:
//   termKey: {
//     term:    { tr, en },          // baloncukta gösterilen başlık
//     aliases: ['...'],             // metinde eşleşecek yüzey formları — YALNIZ ASCII
//                                    // (Türkçe-özel karakter i18n leak taramasını tetikler, §23.1)
//     short:   { tr, en },          // tek cümle sade tanım
//     analogy: { tr, en },          // GÜNLÜK-HAYAT benzetmesi (yıldız bu)
//   }
//
// Genişletme (Sonnet, P1.5-S1): buraya sitedeki TÜM kavramları ekle. `en` saf
// İngilizce; aynı benzetmeyi farklı terimde tekrarlama (§9.4); "test" gibi aşırı
// yaygın kelimeleri EKLEME (her yerde vurgulanır, gürültü olur).

export const TERM_GLOSSARY = {
  locator: {
    term: { tr: 'Locator', en: 'Locator' },
    aliases: ['locator', 'locators'],
    short: { tr: 'Bir web sayfasındaki bir elemanı (buton, kutu) bulmanın yolu.', en: 'The way to find an element (button, box) on a web page.' },
    analogy: { tr: 'Bir kütüphanede kitabı raf numarasıyla bulmak gibi: doğru numara olmadan aradığını bulamazsın.', en: 'Like finding a book in a library by its shelf number: without the right number you cannot locate it.' },
  },
  selector: {
    term: { tr: 'Selector', en: 'Selector' },
    aliases: ['selector', 'selectors', 'css selector'],
    short: { tr: 'Bir elemanı tarif eden kısa desen (genelde CSS ile).', en: 'A short pattern that describes an element (usually via CSS).' },
    analogy: { tr: 'Kalabalıkta birini "kırmızı şapkalı, gözlüklü kişi" diye tarif etmek gibi — özelliklerini söyleyerek işaret edersin.', en: 'Like describing someone in a crowd as "the person with a red hat and glasses" — you point them out by their traits.' },
  },
  assertion: {
    term: { tr: 'Assertion', en: 'Assertion' },
    aliases: ['assertion', 'assertions', 'assert'],
    short: { tr: 'Testin "şu doğru olmalı" diye yaptığı kontrol.', en: 'The check a test makes to confirm "this must be true".' },
    analogy: { tr: 'Sınav kağıdını cevap anahtarıyla karşılaştırmak gibi: beklenen ile gerçek aynı mı diye bakarsın.', en: 'Like comparing an exam paper against the answer key: you check whether the expected and the actual match.' },
  },
  fixture: {
    term: { tr: 'Fixture', en: 'Fixture' },
    aliases: ['fixture', 'fixtures'],
    short: { tr: 'Her testten önce hazırlanan ortam ya da veri.', en: 'The environment or data prepared before each test.' },
    analogy: { tr: 'Yemek yapmadan önce tüm malzemeleri tezgaha dizmek gibi: iş başlamadan her şey hazır bekler.', en: 'Like laying out all the ingredients on the counter before cooking: everything is ready before the work begins.' },
  },
  xpath: {
    term: { tr: 'XPath', en: 'XPath' },
    aliases: ['xpath'],
    short: { tr: 'Sayfadaki bir elemana giden adım adım yol tarifi.', en: 'A step-by-step path to an element on the page.' },
    analogy: { tr: 'Bir evde "ikinci kat, soldan üçüncü oda" gibi tarif vermek gibi: yolu adım adım söylersin.', en: 'Like giving directions in a house such as "second floor, third door on the left": you spell out the path step by step.' },
  },
  dom: {
    term: { tr: 'DOM', en: 'DOM' },
    aliases: ['dom'],
    short: { tr: 'Tarayıcının sayfayı ağaç gibi tuttuğu iç haritası.', en: 'The browser\'s internal map that holds the page as a tree.' },
    analogy: { tr: 'Bir binanın kat planı gibi: her oda (eleman) nerede, hangi odanın içinde belli olur.', en: 'Like the floor plan of a building: it shows where each room (element) is and which room contains it.' },
  },
  api: {
    term: { tr: 'API', en: 'API' },
    aliases: ['api', 'apis'],
    short: { tr: 'İki programın birbiriyle konuşmasını sağlayan menü.', en: 'A menu that lets two programs talk to each other.' },
    analogy: { tr: 'Restoranda garsona sipariş vermek gibi: mutfağı hiç görmeden menüden istersin, yemek gelir.', en: 'Like ordering from a waiter at a restaurant: you request from the menu without ever seeing the kitchen, and the food arrives.' },
  },
  endpoint: {
    term: { tr: 'Endpoint', en: 'Endpoint' },
    aliases: ['endpoint', 'endpoints'],
    short: { tr: 'Bir API\'de belirli bir isteğin gittiği adres.', en: 'The address a specific request goes to in an API.' },
    analogy: { tr: 'Bir şirketin farklı departman telefon numaraları gibi: her numara farklı bir işe bakar.', en: 'Like a company\'s different department phone numbers: each number handles a different job.' },
  },
  cicd: {
    term: { tr: 'CI/CD', en: 'CI/CD' },
    aliases: ['ci/cd', 'ci-cd', 'cicd'],
    short: { tr: 'Kod her değiştiğinde otomatik test edip yayınlayan hat.', en: 'A line that automatically tests and ships code whenever it changes.' },
    analogy: { tr: 'Fabrikada ürünü otomatik kontrol edip paketleyen bant gibi: insan tek tek uğraşmaz, bant halleder.', en: 'Like a factory belt that automatically checks and packages a product: no one does it by hand, the belt handles it.' },
  },
  pipeline: {
    term: { tr: 'Pipeline', en: 'Pipeline' },
    aliases: ['pipeline', 'pipelines'],
    short: { tr: 'İşlerin sırayla aktığı otomatik bir hat.', en: 'An automated line where tasks flow in order.' },
    analogy: { tr: 'Çamaşır süreci gibi: yıka, durula, sık, kurut — her adım bitince bir sonraki başlar.', en: 'Like doing laundry: wash, rinse, spin, dry — each step starts when the previous one finishes.' },
  },
  commit: {
    term: { tr: 'Commit', en: 'Commit' },
    aliases: ['commit', 'commits'],
    short: { tr: 'Yapılan değişikliği kalıcı olarak kaydetme noktası.', en: 'A point that permanently saves the changes you made.' },
    analogy: { tr: 'Bir belgeyi "kaydet" deyip tarihli bir sürüm oluşturmak gibi: istersen sonra o ana dönebilirsin.', en: 'Like clicking "save" on a document and creating a dated version: you can return to that moment later if needed.' },
  },
  merge: {
    term: { tr: 'Merge', en: 'Merge' },
    aliases: ['merge', 'merging', 'merged'],
    short: { tr: 'İki ayrı çalışmayı tek bir bütünde birleştirmek.', en: 'Combining two separate pieces of work into one whole.' },
    analogy: { tr: 'İki kişinin ayrı yazdığı bölümleri tek bir belgede toplamak gibi: parçalar tek metin olur.', en: 'Like gathering chapters written separately by two people into one document: the parts become a single text.' },
  },
  branch: {
    term: { tr: 'Branch', en: 'Branch' },
    aliases: ['branch', 'branches'],
    short: { tr: 'Ana koddan ayrılıp güvenle deneme yapılan kopya.', en: 'A copy split off from the main code where you can experiment safely.' },
    analogy: { tr: 'Bir yol ayrımı gibi: ana yoldan sapıp bir şey denersin, işe yararsa geri dönüp ana yola katarsın.', en: 'Like a fork in the road: you turn off the main road to try something, and if it works you rejoin the main road.' },
  },
  framework: {
    term: { tr: 'Framework', en: 'Framework' },
    aliases: ['framework', 'frameworks'],
    short: { tr: 'Sıfırdan yazmamak için gelen hazır iskelet/çatı.', en: 'A ready-made skeleton so you do not build from scratch.' },
    analogy: { tr: 'Hazır ev iskeleti gibi: temel ve duvarlar kurulu gelir, sen sadece boyar ve döşersin.', en: 'Like a pre-built house frame: the foundation and walls come ready, and you just paint and furnish.' },
  },
  boolean: {
    term: { tr: 'Boolean', en: 'Boolean' },
    aliases: ['boolean', 'booleans'],
    short: { tr: 'Sadece iki değeri olan tip: doğru ya da yanlış.', en: 'A type with only two values: true or false.' },
    analogy: { tr: 'Işık düğmesi gibi: ya açık ya kapalı, arası yok.', en: 'Like a light switch: either on or off, nothing in between.' },
  },
  nullValue: {
    term: { tr: 'null', en: 'null' },
    aliases: ['null'],
    short: { tr: '"Hiçbir değer yok" anlamına gelen boşluk.', en: 'An emptiness that means "no value at all".' },
    analogy: { tr: 'Boş bir kutu gibi: kutu var ama içi tamamen boş.', en: 'Like an empty box: the box exists but there is nothing inside.' },
  },
  exception: {
    term: { tr: 'Exception', en: 'Exception' },
    aliases: ['exception', 'exceptions'],
    short: { tr: 'Programın beklenmedik bir durumda "dur" diye uyarması.', en: 'The program signalling "stop" when something unexpected happens.' },
    analogy: { tr: 'Arabada uyarı ışığının yanması gibi: bir şey ters gitti, devam etmeden önce bak.', en: 'Like a warning light coming on in a car: something went wrong, look before continuing.' },
  },
  variable: {
    term: { tr: 'Variable', en: 'Variable' },
    aliases: ['variable', 'variables'],
    short: { tr: 'İçine bir değer koyduğun, isimli bir kutu.', en: 'A named box you put a value into.' },
    analogy: { tr: 'Üstünde isim yazan bir saklama kabı gibi: "maas" kabına bir sayı koyarsın, sonra o isimle çağırırsın.', en: 'Like a storage jar with a label: you put a number into the "salary" jar and later call it by that name.' },
  },
  array: {
    term: { tr: 'Array', en: 'Array' },
    aliases: ['array', 'arrays'],
    short: { tr: 'Sıralı, numaralı bir öğe listesi.', en: 'An ordered, numbered list of items.' },
    analogy: { tr: 'Yumurta kartonu gibi: her gözün bir numarası var, istediğin göze numarasıyla ulaşırsın.', en: 'Like an egg carton: each slot has a number, and you reach a slot by its number.' },
  },
  query: {
    term: { tr: 'Query', en: 'Query' },
    aliases: ['query', 'queries'],
    short: { tr: 'Bir veritabanına sorulan soru.', en: 'A question asked to a database.' },
    analogy: { tr: 'Kütüphaneciye "şu konuda kitap var mı" diye sormak gibi: sorunu söyler, sonucu geri alırsın.', en: 'Like asking a librarian "do you have books on this topic": you ask, and you get the results back.' },
  },
  flaky: {
    term: { tr: 'Flaky test', en: 'Flaky test' },
    aliases: ['flaky test', 'flaky'],
    short: { tr: 'Bazen geçen, bazen kalan; güvenilmez bir test.', en: 'A test that sometimes passes and sometimes fails; unreliable.' },
    analogy: { tr: 'Bazen çalışan bazen çalışmayan arızalı bir düğme gibi: sonucuna güvenemezsin.', en: 'Like a faulty button that sometimes works and sometimes does not: you cannot trust its result.' },
  },
  timeout: {
    term: { tr: 'Timeout', en: 'Timeout' },
    aliases: ['timeout', 'timeouts'],
    short: { tr: 'Belirli bir süre bekleyip cevap gelmezse vazgeçmek.', en: 'Waiting a set amount of time and giving up if no response comes.' },
    analogy: { tr: 'Telefonu belli süre çaldırıp açan olmazsa kapatmak gibi: sonsuza kadar beklemezsin.', en: 'Like letting a phone ring for a while and hanging up if no one answers: you do not wait forever.' },
  },
  mock: {
    term: { tr: 'Mock', en: 'Mock' },
    aliases: ['mock', 'mocks', 'mocking'],
    short: { tr: 'Gerçeğinin yerine geçen, kontrollü bir sahte/taklit.', en: 'A controlled fake that stands in for the real thing.' },
    analogy: { tr: 'Vitrin mankeni gibi: gerçek insan değil ama kıyafeti göstermek için yerini tutar.', en: 'Like a shop mannequin: not a real person, but it stands in to display the clothes.' },
  },
  regression: {
    term: { tr: 'Regression', en: 'Regression' },
    aliases: ['regression'],
    short: { tr: 'Eskiden çalışan bir şeyin yeni bir değişiklikle bozulması.', en: 'Something that used to work breaking because of a new change.' },
    analogy: { tr: 'Duvara çivi çakarken arkadaki boruyu delmek gibi: bir işi yaparken başka bir şeyi bozarsın.', en: 'Like drilling into a wall and puncturing a pipe behind it: you break something else while doing one task.' },
  },
}
