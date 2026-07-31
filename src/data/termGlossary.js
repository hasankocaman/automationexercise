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

  // ── Genişletme (Sonnet, P1.5-S1, challenge-first-experience-plan.md §3.6.3) ──

  loop: {
    term: { tr: 'Loop (Döngü)', en: 'Loop' },
    aliases: ['loop', 'for loop', 'while loop', 'dongu'],
    short: { tr: 'Bir işi, bir koşul bitene kadar tekrar tekrar yaptırma yapısı.', en: 'A structure that repeats an action until a condition ends.' },
    analogy: { tr: 'Çamaşır makinesinin "durulama" adımını 3 kez tekrarlaması gibi: aynı işlemi, sayı bitene ya da koşul sağlanana kadar üst üste yapar.', en: 'Like a washing machine repeating the "rinse" step 3 times: it performs the same action over and over until the count runs out or a condition is met.' },
  },
  condition: {
    term: { tr: 'Condition (Koşul / if)', en: 'Condition (if)' },
    aliases: ['condition', 'if statement', 'kosul'],
    short: { tr: 'Programın "eğer şu doğruysa bunu yap" diye karar verdiği nokta.', en: 'The point where a program decides "if this is true, do that".' },
    analogy: { tr: 'Yağmur yağıyorsa şemsiye al, yağmıyorsa alma demek gibi: karar, bir koşulun doğru ya da yanlış olmasına göre değişir.', en: 'Like saying "take an umbrella if it is raining, otherwise don\'t": the decision changes based on whether a condition is true or false.' },
  },
  classObject: {
    term: { tr: 'Class & Object (Sınıf & Nesne)', en: 'Class & Object' },
    aliases: ['class', 'object', 'sinif', 'nesne'],
    short: { tr: 'Class bir şablon, object o şablondan üretilmiş gerçek bir örnektir.', en: 'A class is a blueprint, an object is a real instance created from that blueprint.' },
    analogy: { tr: 'Kurabiye kalıbı (class) ile o kalıptan çıkan her bir kurabiye (object) gibi: kalıp tek, kurabiye sayısı istediğin kadar.', en: 'Like a cookie cutter (class) and each individual cookie it stamps out (object): one cutter, as many cookies as you want.' },
  },
  inheritance: {
    term: { tr: 'Inheritance (Kalıtım)', en: 'Inheritance' },
    aliases: ['inheritance', 'kalitim', 'extends'],
    short: { tr: 'Bir sınıfın başka bir sınıfın özelliklerini otomatik olarak devralması.', en: 'A class automatically taking on the features of another class.' },
    analogy: { tr: 'Çocuğun ebeveynden göz rengini miras alması gibi: temel sınıf "genleri" verir, alt sınıf onları kullanır ve üstüne kendi özelliğini ekler.', en: 'Like a child inheriting eye color from a parent: the base class passes down its "genes", and the subclass uses them while adding its own traits.' },
  },
  json: {
    term: { tr: 'JSON', en: 'JSON' },
    aliases: ['json'],
    short: { tr: 'Verinin, hem insanın hem programın kolayca okuyabildiği metin formatı.', en: 'A text format for data that both humans and programs can easily read.' },
    analogy: { tr: 'Standart bir form doldurmak gibi: her alanın bir adı ve bir değeri var ("isim": "Ada"), bu yüzden hangi sistem okursa okusun aynı şekilde anlaşılır.', en: 'Like filling out a standard form: every field has a name and a value ("name": "Ada"), so whichever system reads it understands it the same way.' },
  },
  httpStatus: {
    term: { tr: 'HTTP Status Code (Durum Kodu)', en: 'HTTP Status Code' },
    aliases: ['status code', 'http status', 'durum kodu'],
    short: { tr: 'Sunucunun isteğe kısa bir sayıyla verdiği "ne oldu" cevabı.', en: 'The short numeric answer a server gives about "what happened" to a request.' },
    analogy: { tr: 'Kargo takip durumu gibi: "teslim edildi" (200), "adres bulunamadı" (404), "depoda hata" (500) — sayı tek başına neyin olduğunu özetler.', en: 'Like a package tracking status: "delivered" (200), "address not found" (404), "warehouse error" (500) — the number alone summarizes what happened.' },
  },
  cookieSession: {
    term: { tr: 'Cookie & Session', en: 'Cookie & Session' },
    aliases: ['cookie', 'session', 'oturum'],
    short: { tr: 'Sitenin seni "hatırlamak" için tarayıcında sakladığı küçük bilgi parçası.', en: 'A small piece of information a site stores in your browser to "remember" you.' },
    analogy: { tr: 'Bir etkinlikte bileğine takılan giriş bandı gibi: bir kez giriş yaptın, bant üzerinde tekrar tekrar kimliğini göstermene gerek kalmadan seni tanıtır.', en: 'Like a wristband you get at an event: you check in once, and the band identifies you every time without showing ID again.' },
  },
  container: {
    term: { tr: 'Container (Docker)', en: 'Container' },
    aliases: ['container', 'docker container', 'konteyner'],
    short: { tr: 'Bir uygulamayı, çalışması için gereken her şeyle birlikte paketleyen izole kutu.', en: 'An isolated box that packages an application together with everything it needs to run.' },
    analogy: { tr: 'Deniz taşımacılığındaki nakliye konteyneri gibi: içindekiler ne olursa olsun, hangi gemiye (bilgisayara) konursa konsun aynı şekilde çalışır.', en: 'Like a shipping container: whatever is inside, it works the same way no matter which ship (computer) it is loaded onto.' },
  },
  image: {
    term: { tr: 'Image (Docker İmajı)', en: 'Image (Docker)' },
    aliases: ['docker image', 'imaj'],
    short: { tr: 'Bir container\'ın çalıştırılmaya hazır, değişmez şablonu.', en: 'The ready-to-run, unchanging template a container is created from.' },
    analogy: { tr: 'Bir yemek tarifinin dondurulmuş, hazır hâli gibi: image\'i her çalıştırdığında AYNI tarifin taze bir kopyası (container) ortaya çıkar.', en: 'Like a frozen, ready-made version of a recipe: every time you run the image, you get a fresh copy (container) of the exact same recipe.' },
  },
  pod: {
    term: { tr: 'Pod (Kubernetes)', en: 'Pod (Kubernetes)' },
    aliases: ['pod', 'kubernetes pod'],
    short: { tr: 'Kubernetes\'in bir veya birkaç container\'ı birlikte çalıştırdığı en küçük birim.', en: 'The smallest unit Kubernetes uses to run one or more containers together.' },
    analogy: { tr: 'Aynı kutuda birlikte gönderilen, birbirine bağımlı ürünler gibi (örn. telefon + şarj aleti): pod içindeki container\'lar hep BİRLİKTE taşınır, ayrı ayrı değil.', en: 'Like interdependent products shipped together in the same box (e.g. a phone + its charger): the containers in a pod always move TOGETHER, never separately.' },
  },
  thread: {
    term: { tr: 'Thread (İş Parçacığı)', en: 'Thread' },
    aliases: ['thread', 'is parcacigi'],
    short: { tr: 'Bir programın aynı anda yürütebildiği bağımsız bir iş akışı.', en: 'An independent line of execution a program can run at the same time as others.' },
    analogy: { tr: 'Bir mutfakta aynı anda hem çorba pişiren hem salata hazırlayan iki aşçı gibi: aynı mutfağı (programı) paylaşırlar ama işleri paralel ilerler.', en: 'Like two cooks in the same kitchen, one making soup while the other preps salad at the same time: they share the same kitchen (program) but their work runs in parallel.' },
  },
  asyncAwait: {
    term: { tr: 'Async / Await', en: 'Async / Await' },
    aliases: ['async', 'await', 'asenkron'],
    short: { tr: 'Sonucu hemen gelmeyen bir işlemi, programı DURDURMADAN beklemenin yolu.', en: 'A way to wait for an operation whose result doesn\'t arrive immediately, WITHOUT freezing the program.' },
    analogy: { tr: 'Restoranda sipariş verip masana oturmak gibi: siparişi (async işlemi) beklerken kapıda dikilip durmazsın, yemek (sonuç) gelince haber verilir.', en: 'Like ordering food at a restaurant and sitting at your table: you don\'t stand at the door waiting for the order (async operation) — you get notified when the food (result) arrives.' },
  },
  promise: {
    term: { tr: 'Promise', en: 'Promise' },
    aliases: ['promise'],
    short: { tr: 'Şu an elde olmayan ama ileride gelecek bir sonucun sözü/garantisi.', en: 'A guarantee for a result that isn\'t available now but will arrive later.' },
    analogy: { tr: 'Kargo takip numarası almak gibi: ürünü (sonucu) elinde tutmuyorsun ama "geldiğinde" veya "başarısız olduğunda" ne olacağını bu numara üzerinden takip edersin.', en: 'Like getting a package tracking number: you don\'t hold the product (result) yet, but you can follow what happens "when it arrives" or "if it fails" through that number.' },
  },
  callback: {
    term: { tr: 'Callback', en: 'Callback' },
    aliases: ['callback', 'geri cagirma'],
    short: { tr: 'Bir işlem bitince otomatik olarak çalıştırılmak üzere verilen fonksiyon.', en: 'A function handed over to be run automatically once an operation finishes.' },
    analogy: { tr: 'Restoranda "masan hazır olunca beni ara" demek gibi: sen beklemeye devam edersin, iş bitince SENİ çağıran taraf olur.', en: 'Like telling a restaurant "call me when my table is ready": you keep doing other things, and the callback is what calls YOU back when it\'s done.' },
  },
  closure: {
    term: { tr: 'Closure', en: 'Closure' },
    aliases: ['closure'],
    short: { tr: 'Bir fonksiyonun, tanımlandığı ortamdaki değişkenleri "hatırlaması".', en: 'A function "remembering" the variables from the environment where it was defined.' },
    analogy: { tr: 'Evden çıkarken cebine bir anahtar koymak gibi: fonksiyon başka bir yere (başka bir çağrıya) gitse bile o "anahtarı" (dış değişkeni) yanında taşımaya devam eder.', en: 'Like putting a key in your pocket before leaving home: even when the function goes elsewhere (is called later), it keeps carrying that "key" (the outer variable) with it.' },
  },
  generic: {
    term: { tr: 'Generic', en: 'Generic' },
    aliases: ['generic', 'generics'],
    short: { tr: 'Bir kodun, hangi veri tipiyle çalışacağını sonradan belirlemesine izin veren yapı.', en: 'A structure that lets code decide later which data type it will work with.' },
    analogy: { tr: 'Farklı bedenlere göre ayarlanabilen elastik bir kemer gibi: aynı "kalıp" (fonksiyon/sınıf) String\'le de çalışır, Integer\'la da — tipi sonradan seçersin.', en: 'Like an elastic belt that adjusts to different sizes: the same "template" (function/class) works with String or Integer — you choose the type later.' },
  },
  regex: {
    term: { tr: 'Regex (Düzenli İfade)', en: 'Regex (Regular Expression)' },
    aliases: ['regex', 'regular expression', 'duzenli ifade'],
    short: { tr: 'Bir metinde belirli bir DESENİ arayan özel bir arama dili.', en: 'A special search language for finding a specific PATTERN in text.' },
    analogy: { tr: 'Bir polis eşkâl tarifi gibi: kişinin tam adını bilmesen de "1.80 boyunda, siyah ceketli" deseni eşleşen herkesi bulursun.', en: 'Like a police description of a suspect: you don\'t know the exact name, but you can find everyone matching the pattern "1.80m tall, black jacket".' },
  },
  envVariable: {
    term: { tr: 'Environment Variable (Ortam Değişkeni)', en: 'Environment Variable' },
    aliases: ['environment variable', 'env variable', 'ortam degiskeni'],
    short: { tr: 'Kodun DIŞINDA tutulan, ortama göre değişen ayar değeri (örn. şifre, URL).', en: 'A setting value kept OUTSIDE the code that changes per environment (e.g. a password, a URL).' },
    analogy: { tr: 'Bir tiyatro oyununun senaryosu aynı kalırken sahne dekorunun şehre göre değişmesi gibi: KOD (senaryo) sabittir, ortam değişkeni (dekor) test/prod\'a göre değişir.', en: 'Like a play\'s script staying the same while the stage set changes by city: the CODE (script) is fixed, the environment variable (set) changes between test/prod.' },
  },
  dependency: {
    term: { tr: 'Dependency (Bağımlılık)', en: 'Dependency' },
    aliases: ['dependency', 'bagimlilik', 'package'],
    short: { tr: 'Senin kodunun çalışması için ihtiyaç duyduğu, başkası tarafından yazılmış hazır paket.', en: 'A ready-made package written by someone else that your code needs in order to run.' },
    analogy: { tr: 'Mobilya kurarken tornavida ödünç almak gibi: kendi işini (kodunu) bitirmek için başka birinin hazır aracına (kütüphanesine) ihtiyaç duyarsın.', en: 'Like borrowing a screwdriver to assemble furniture: you need someone else\'s ready-made tool (library) to finish your own job (code).' },
  },
  repository: {
    term: { tr: 'Repository (Depo)', en: 'Repository' },
    aliases: ['repository', 'repo', 'depo'],
    short: { tr: 'Bir projenin tüm kodunun ve geçmişinin saklandığı yer.', en: 'The place where a project\'s entire code and history are stored.' },
    analogy: { tr: 'Bir kütüphanenin tüm kitapların TÜM baskılarını (eski/yeni sürümlerini) sakladığı arşiv gibi: sadece son hâli değil, geçmiş her değişikliği de tutar.', en: 'Like a library archive that keeps EVERY edition (old/new versions) of every book: it holds not just the latest version, but every past change too.' },
  },
  deploy: {
    term: { tr: 'Deploy (Yayına Alma)', en: 'Deploy' },
    aliases: ['deploy', 'deployment', 'yayina alma'],
    short: { tr: 'Yazılan kodu, gerçek kullanıcıların erişebileceği ortama taşıma işlemi.', en: 'The act of moving written code into the environment real users can access.' },
    analogy: { tr: 'Bir tiyatro provasından sahneye çıkmak gibi: kod perde arkasında (geliştirme ortamında) hazırdı, deploy ile SEYİRCİNİN (kullanıcının) önüne çıkar.', en: 'Like moving from a theater rehearsal to the actual stage: the code was ready backstage (dev environment), and deploy brings it in front of the AUDIENCE (users).' },
  },
  rollback: {
    term: { tr: 'Rollback (Geri Alma)', en: 'Rollback' },
    aliases: ['rollback', 'geri alma'],
    short: { tr: 'Yeni bir yayın sorun çıkarınca, bir önceki çalışan sürüme dönme işlemi.', en: 'Reverting to the previous working version when a new release causes problems.' },
    analogy: { tr: 'Bir belgede "Geri Al" (Ctrl+Z) tuşuna basmak gibi: yeni değişiklik bir hataya yol açtıysa, bir önceki BİLİNEN İYİ duruma anında dönersin.', en: 'Like pressing "Undo" (Ctrl+Z) in a document: if the new change caused a bug, you instantly return to the previous KNOWN GOOD state.' },
  },
  cache: {
    term: { tr: 'Cache (Önbellek)', en: 'Cache' },
    aliases: ['cache', 'onbellek'],
    short: { tr: 'Sık kullanılan bir sonucu, tekrar hesaplamamak için geçici olarak saklama.', en: 'Temporarily storing a frequently used result so it doesn\'t need to be recalculated.' },
    analogy: { tr: 'Sık aradığın bir numarayı telefonun "son aramalar" listesinde tutması gibi: rehberde baştan aramazsın, hazır kopyayı hemen kullanırsın — ama numara değişirse eski (bayat) kopyayı görme riski de vardır.', en: 'Like your phone keeping a frequently-dialed number in "recent calls": you don\'t search the contacts from scratch, you use the ready copy instantly — but if the number changes, you risk seeing the old (stale) copy.' },
  },
  latency: {
    term: { tr: 'Latency (Gecikme)', en: 'Latency' },
    aliases: ['latency', 'gecikme'],
    short: { tr: 'Bir isteğin gönderilmesi ile cevabın gelmesi arasında geçen süre.', en: 'The time between sending a request and receiving its response.' },
    analogy: { tr: 'Bir mektup gönderip cevabını beklemek gibi: mektubun ne kadar HIZLI yazıldığı değil, gidiş-dönüş yolda ne kadar SÜRDÜĞÜ önemlidir.', en: 'Like sending a letter and waiting for a reply: what matters is not how FAST the letter was written, but how long the round trip TOOK.' },
  },
  idempotent: {
    term: { tr: 'Idempotent', en: 'Idempotent' },
    aliases: ['idempotent', 'idempotency'],
    short: { tr: 'Bir isteği 1 kez ya da 10 kez göndermenin AYNI sonucu vermesi.', en: 'Sending a request once or ten times produces the SAME end result.' },
    analogy: { tr: 'Asansörde bir kat düğmesine bir kez ya da beş kez basmak gibi: sonuç değişmez, asansör yine SADECE o kata gider.', en: 'Like pressing an elevator floor button once or five times: the outcome doesn\'t change, the elevator still goes to that floor only ONCE.' },
  },
  token: {
    term: { tr: 'Token', en: 'Token' },
    aliases: ['token', 'auth token', 'access token'],
    short: { tr: 'Giriş yaptıktan sonra kimliğini kanıtlamak için taşıdığın geçici bir "anahtar" metni.', en: 'A temporary "key" text you carry to prove your identity after logging in.' },
    analogy: { tr: 'Bir otelde check-in sonrası verilen oda kartı gibi: her seferinde resepsiyona kimlik göstermezsin, kartı (token\'ı) okutursun.', en: 'Like a hotel room key card given after check-in: you don\'t show ID at the front desk every time, you swipe the card (token).' },
  },
  schema: {
    term: { tr: 'Schema (Şema)', en: 'Schema' },
    aliases: ['schema', 'sema'],
    short: { tr: 'Verinin hangi alanları, hangi tipte içermesi gerektiğinin resmi tarifi.', en: 'The formal description of which fields data must contain, and of what type.' },
    analogy: { tr: 'Bir form şablonunun hangi kutucukların zorunlu, hangilerinin sayı/metin olması gerektiğini belirtmesi gibi: gelen veri bu şablona uymuyorsa reddedilir.', en: 'Like a form template specifying which boxes are required and whether they must be numbers or text: incoming data that doesn\'t match the template gets rejected.' },
  },
  webhook: {
    term: { tr: 'Webhook', en: 'Webhook' },
    aliases: ['webhook'],
    short: { tr: 'Bir olay gerçekleştiğinde bir sistemin ANINDA başka bir sisteme haber vermesi.', en: 'One system instantly notifying another system the moment an event happens.' },
    analogy: { tr: 'Kapı zilinin çalması gibi: sen sürekli kapıyı kontrol etmezsin (sormazsın/polling), bir şey olunca (zil çalınca) sana haber gelir.', en: 'Like a doorbell ringing: you don\'t keep checking the door yourself (polling) — you get notified the moment something happens (the bell rings).' },
  },
  payload: {
    term: { tr: 'Payload', en: 'Payload' },
    aliases: ['payload'],
    short: { tr: 'Bir isteğin veya mesajın içindeki asıl, taşınan veri.', en: 'The actual data being carried inside a request or message.' },
    analogy: { tr: 'Bir kargo kutusunun içindeki ÜRÜN gibi: kutunun etiketi (header) adres bilgisidir, payload ise gerçekten teslim edilen şeydir.', en: 'Like the PRODUCT inside a shipping box: the box label (header) is address info, the payload is what\'s actually being delivered.' },
  },
  queue: {
    term: { tr: 'Queue (Kuyruk)', en: 'Queue' },
    aliases: ['queue', 'message queue', 'kuyruk'],
    short: { tr: 'İşlerin geldiği sırayla bekletilip, sırayla işlendiği yapı.', en: 'A structure where tasks wait in arrival order and get processed one by one.' },
    analogy: { tr: 'Fırında ekmek almak için sıraya girmek gibi: önce gelen önce alır (FIFO), fırıncı (sistem) her seferinde bir sonraki kişiye (işe) bakar.', en: 'Like standing in line at a bakery: first come, first served (FIFO) — the baker (system) handles one person (task) at a time, in order.' },
  },
  loadBalancer: {
    term: { tr: 'Load Balancer (Yük Dengeleyici)', en: 'Load Balancer' },
    aliases: ['load balancer', 'yuk dengeleyici'],
    short: { tr: 'Gelen istekleri, birden fazla sunucuya adil şekilde dağıtan trafik yönlendirici.', en: 'A traffic director that fairly distributes incoming requests across multiple servers.' },
    analogy: { tr: 'Bir markette birden fazla kasa açıkken müşterileri en boş kasaya yönlendiren görevli gibi: tek kasa (sunucu) tıkanmaz, yük dağılır.', en: 'Like a store employee directing customers to the emptiest checkout when multiple registers are open: no single register (server) gets overwhelmed, the load spreads out.' },
  },
  logStackTrace: {
    term: { tr: 'Log & Stack Trace', en: 'Log & Stack Trace' },
    aliases: ['log', 'logging', 'stack trace'],
    short: { tr: 'Programın çalışırken bıraktığı kayıt izi; hata olduğunda "hangi satırdan geldiği" bilgisi.', en: 'The trail of records a program leaves while running; when an error happens, the "which line it came from" information.' },
    analogy: { tr: 'Bir uçağın kara kutusu gibi: kaza (hata) olduğunda son anları geriye sararak neyin, hangi sırayla olduğunu anlarsın.', en: 'Like an airplane\'s black box: when a crash (error) happens, you rewind the final moments to understand what happened, in what order.' },
  },
  raceCondition: {
    term: { tr: 'Race Condition', en: 'Race Condition' },
    aliases: ['race condition'],
    short: { tr: 'İki işlemin aynı veriye AYNI ANDA dokunup, hangisinin önce bittiğine göre sonucun değişmesi.', en: 'Two operations touching the same data AT THE SAME TIME, so the result depends on which one finishes first.' },
    analogy: { tr: 'İki kişinin aynı anda son bileti almaya çalışması gibi: kim daha hızlıysa o kazanır, ama sistem ikisine de "aldın" derse ortalık karışır.', en: 'Like two people trying to grab the last ticket at the same instant: whoever is faster wins, but if the system tells BOTH "you got it", chaos follows.' },
  },

  // ── Genişletme (Sonnet, 2026-07-31) — sıfır bilgili bir kullanıcının SİTEYE
  // İLK GİRDİĞİ sayfalarda (Test Nedir, Manuel Test, Algoritma Temelleri,
  // Java/TypeScript/Python girişleri) yoğunluğu artırmak için eklendi.
  // Kullanıcı talebi: "ilk öğrendiği derslerde kavramları TAM anlamalı."

  bugDefect: {
    term: { tr: 'Bug / Defect (Hata)', en: 'Bug / Defect' },
    aliases: ['bug', 'defect', 'kusur'],
    short: { tr: 'Yazılımın beklenenden FARKLI davranmasına yol açan bir hata.', en: 'A flaw that makes software behave DIFFERENTLY from what was expected.' },
    analogy: { tr: 'Bir tarifte şekeri tuz sanıp koymak gibi: sonuç ortaya çıkar ama BEKLENEN tatta değildir — biri bunu fark edip düzeltmelidir.', en: 'Like mistaking salt for sugar in a recipe: something comes out, but not the EXPECTED taste — someone has to notice and fix it.' },
  },
  severity: {
    term: { tr: 'Severity (Önem Derecesi)', en: 'Severity' },
    aliases: ['severity', 'onem derecesi'],
    short: { tr: 'Bir hatanın uygulamaya ne kadar BÜYÜK zarar verdiğinin ölçüsü.', en: 'A measure of how BIG a technical impact a bug causes to the application.' },
    analogy: { tr: 'Bir arabadaki arızaların ciddiyetini derecelendirmek gibi: fren tutmaması (kritik) ile radyo sesinin çatlaması (düşük) AYNI önem derecesinde değildir.', en: 'Like rating how serious a car problem is: brakes not working (critical) and a crackling radio (low) are NOT the same severity.' },
  },
  priority: {
    term: { tr: 'Priority (Öncelik)', en: 'Priority' },
    aliases: ['priority', 'oncelik'],
    short: { tr: 'Bir hatanın NE ZAMAN düzeltilmesi gerektiğinin sırası.', en: 'The order in which a bug SHOULD be fixed.' },
    analogy: { tr: 'Acil serviste hastaların sırayla değil, aciliyete göre çağrılması gibi — severity "ne kadar kötü", priority ise "ne zaman sırada" sorusuna cevap verir; biri diğerini otomatik belirlemez.', en: 'Like an ER calling patients by urgency, not by arrival order — severity answers "how bad", priority answers "when in line"; one does not automatically determine the other.' },
  },
  testCase: {
    term: { tr: 'Test Case (Test Senaryosu)', en: 'Test Case' },
    aliases: ['test case', 'test senaryosu'],
    short: { tr: 'Belirli bir adımlar dizisi + beklenen sonuçtan oluşan, tekrar çalıştırılabilir bir kontrol.', en: 'A repeatable check made of a specific set of steps plus an expected result.' },
    analogy: { tr: 'Bir yemek tarifi gibi: hangi malzemeleri (girdi) hangi sırayla ekleyeceğini ve sonunda NE elde etmen gerektiğini (beklenen sonuç) yazar — herkes aynı tarifi izlerse aynı sonuca ulaşır.', en: 'Like a recipe: it lists which ingredients (input) to add in which order and WHAT you should end up with (expected result) — anyone following it reaches the same outcome.' },
  },
  blackBoxWhiteBox: {
    term: { tr: 'Black Box / White Box Test', en: 'Black Box / White Box Testing' },
    aliases: ['black box', 'white box', 'kara kutu', 'beyaz kutu'],
    short: { tr: 'Black box: kodu görmeden sadece girdi/çıktıya bakarak test etmek. White box: kodun içini bilerek test etmek.', en: 'Black box: testing by input/output only, without seeing the code. White box: testing while knowing the code\'s internals.' },
    analogy: { tr: 'Bir kapalı kutuya top atıp hangi renkte çıktığına bakmak (black box) ile kutunun İÇİNİ görüp mekanizmayı bilerek test etmek (white box) arasındaki fark gibi — ikisi de geçerlidir, farklı şeyleri yakalar.', en: 'Like throwing a ball into a closed box and watching what color comes out (black box) versus seeing INSIDE the box and testing with knowledge of the mechanism (white box) — both are valid, they catch different things.' },
  },
  smokeSanityTest: {
    term: { tr: 'Smoke Test / Sanity Test', en: 'Smoke Test / Sanity Test' },
    aliases: ['smoke test', 'sanity test'],
    short: { tr: 'Smoke test: uygulama hiç açılıyor mu diye hızlı bir genel kontrol. Sanity test: yeni bir değişikliğin dar bir alanda mantıklı çalıştığını doğrulama.', en: 'Smoke test: a quick, broad check that the app even starts up. Sanity test: verifying a narrow, recent change makes sense.' },
    analogy: { tr: 'Yeni aldığın bir elektrikli aleti prize takıp "yanıyor mu, duman çıkıyor mu" diye bakmak smoke test\'tir — detaylı kullanmadan önceki en hızlı, en yüzeysel kontrol.', en: 'Plugging in a new appliance and checking "does it turn on, is there smoke" is a smoke test — the fastest, most surface-level check before detailed use.' },
  },
  unitIntegrationTest: {
    term: { tr: 'Unit Test / Integration Test', en: 'Unit Test / Integration Test' },
    aliases: ['unit test', 'integration test', 'birim test'],
    short: { tr: 'Unit test: kodun EN KÜÇÜK parçasını (tek bir fonksiyon) tek başına test eder. Integration test: birden fazla parçanın BİRLİKTE doğru çalıştığını test eder.', en: 'Unit test: tests the SMALLEST piece of code (a single function) in isolation. Integration test: tests that multiple pieces work correctly TOGETHER.' },
    analogy: { tr: 'Bir arabanın her parçasını (fren, motor, far) AYRI AYRI test etmek unit test\'tir; arabayı yola çıkarıp hepsinin BİRLİKTE çalıştığını görmek integration test\'tir.', en: 'Testing each car part (brakes, engine, headlights) SEPARATELY is a unit test; taking the car onto the road to see everything work TOGETHER is an integration test.' },
  },
  requirement: {
    term: { tr: 'Requirement (Gereksinim)', en: 'Requirement' },
    aliases: ['requirement', 'gereksinim'],
    short: { tr: 'Bir yazılımın YAPMASI gereken şeyin yazılı tarifi.', en: 'A written description of what a piece of software MUST do.' },
    analogy: { tr: 'Bir ev inşa etmeden önce mimara verilen "3 yatak odası, 2 banyo olsun" listesi gibi — gereksinim netleşmezse, inşa edilen ev (yazılım) kimsenin istediği ev olmayabilir.', en: 'Like the list "3 bedrooms, 2 bathrooms" given to an architect before building a house — if the requirement is unclear, the house (software) built may not be what anyone wanted.' },
  },
  acceptanceCriteria: {
    term: { tr: 'Acceptance Criteria (Kabul Kriterleri)', en: 'Acceptance Criteria' },
    aliases: ['acceptance criteria', 'kabul kriterleri'],
    short: { tr: 'Bir özelliğin "bitti" sayılması için sağlaması gereken, net ve ölçülebilir koşullar listesi.', en: 'A clear, measurable list of conditions a feature must meet to be considered "done".' },
    analogy: { tr: 'Bir sınavı geçmek için gereken asgari puan gibi — "iyi görünüyor" sübjektiftir, ama "80 üzeri = geçti" net bir çizgidir; kabul kriterleri de "bitti mi bitmedi mi" tartışmasını ortadan kaldırır.', en: 'Like the minimum score needed to pass an exam — "looks good" is subjective, but "80+ = pass" is a clear line; acceptance criteria remove the "is it done or not" argument.' },
  },
  reproSteps: {
    term: { tr: 'Reproduction Steps (Yeniden Üretme Adımları)', en: 'Reproduction Steps' },
    aliases: ['reproduction steps', 'repro steps', 'yeniden uretme'],
    short: { tr: 'Bir hatayı BAŞKA BİRİNİN de aynı şekilde tekrar tetikleyebilmesi için yazılan adım adım tarif.', en: 'A step-by-step recipe written so ANOTHER PERSON can trigger the same bug again, exactly the same way.' },
    analogy: { tr: 'Bir tamirciye arabanın sesini tarif ederken "35 km hızda, sağa dönerken, 2. viteste" demek gibi — ne kadar NET tarif edersen, tamirci (geliştirici) o kadar hızlı bulur.', en: 'Like describing a car noise to a mechanic as "at 35 km/h, turning right, in 2nd gear" — the more PRECISE the description, the faster the mechanic (developer) finds it.' },
  },
  expectedActual: {
    term: { tr: 'Expected / Actual Result (Beklenen / Gerçek Sonuç)', en: 'Expected / Actual Result' },
    aliases: ['expected result', 'actual result', 'beklenen sonuc', 'gercek sonuc'],
    short: { tr: 'Expected: olması gereken sonuç. Actual: gerçekte gözlemlenen sonuç. İkisi FARKLIYSA bug vardır.', en: 'Expected: what should happen. Actual: what really happened. If they DIFFER, there is a bug.' },
    analogy: { tr: 'Bir teraziye "1 kg olmalı" (expected) yazıp tarttığında "980 gram" (actual) çıkması gibi — ikisi arasındaki FARK, bir sorun olduğunu gösterir.', en: 'Like writing "should be 1 kg" (expected) on a scale and getting "980 grams" (actual) — the DIFFERENCE between the two signals a problem.' },
  },
  exploratoryTesting: {
    term: { tr: 'Exploratory Testing (Keşifsel Test)', en: 'Exploratory Testing' },
    aliases: ['exploratory testing', 'kesifsel test'],
    short: { tr: 'Önceden yazılmış adımlar OLMADAN, uygulamayı özgürce gezip hata arama.', en: 'Freely exploring an application to hunt for bugs, WITHOUT pre-written steps.' },
    analogy: { tr: 'Yeni taşındığın bir eve, elindeki bir plan OLMADAN girip her kapıyı, her çekmeceyi meraklı bir çocuk gibi açman gibi — bazen planlı aramanın kaçırdığı şeyleri bu şekilde bulursun.', en: 'Like walking into a new house WITHOUT a floor plan and curiously opening every door and drawer like a child — sometimes this finds things a planned search would miss.' },
  },
  edgeBoundaryCase: {
    term: { tr: 'Edge Case / Boundary Value (Sınır Durum)', en: 'Edge Case / Boundary Value' },
    aliases: ['edge case', 'boundary value', 'sinir durum'],
    short: { tr: 'Normal kullanımın ÇOK dışında veya bir sınırın TAM üzerinde olan, unutulması kolay durumlar.', en: 'Situations FAR outside normal use, or EXACTLY on a limit — easy to forget.' },
    analogy: { tr: 'Bir asansörün "maksimum 8 kişi" sınırını test ederken tam 8 kişiyi (sınır) ve 9 kişiyi (sınırın az ötesi) denemek gibi — sorunlar genelde ORTADA değil, tam bu uç noktalarda çıkar.', en: 'Like testing an elevator\'s "max 8 people" limit by trying exactly 8 (the boundary) and 9 (just past it) — problems usually show up not in the MIDDLE, but at exactly these edges.' },
  },
  algorithm: {
    term: { tr: 'Algorithm (Algoritma)', en: 'Algorithm' },
    aliases: ['algorithm', 'algoritma'],
    short: { tr: 'Bir problemi çözmek için izlenen, adım adım net bir tarif.', en: 'A clear, step-by-step recipe for solving a problem.' },
    analogy: { tr: 'Bir yemek tarifi gibi: hangi adımı hangi sırayla yaparsan, HER SEFERİNDE aynı sonuca ulaşırsın — algoritma da bir problemi çözmenin YAZILI, tekrarlanabilir yoludur.', en: 'Like a recipe: following the same steps in the same order gets you the same result EVERY TIME — an algorithm is a WRITTEN, repeatable way to solve a problem.' },
  },
  recursion: {
    term: { tr: 'Recursion (Özyineleme)', en: 'Recursion' },
    aliases: ['recursion', 'ozyineleme'],
    short: { tr: 'Bir fonksiyonun, aynı problemin KÜÇÜLTÜLMÜŞ bir versiyonunu çözmek için KENDİNİ çağırması.', en: 'A function calling ITSELF to solve a SMALLER version of the same problem.' },
    analogy: { tr: 'İçi içe Rus matruşka bebekleri gibi: her bebeği açtığında, İÇİNDE aynı şeklin daha küçük bir kopyası çıkar — en küçük bebeğe (temel durum) ulaşana kadar bu devam eder.', en: 'Like nested Russian matryoshka dolls: opening each one reveals a smaller copy of the SAME shape INSIDE — this continues until you reach the smallest doll (the base case).' },
  },
  bigO: {
    term: { tr: 'Big O (Zaman Karmaşıklığı)', en: 'Big O (Time Complexity)' },
    aliases: ['big o', 'time complexity', 'zaman karmasikligi'],
    short: { tr: 'Bir işlemin, veri BÜYÜDÜKÇE ne kadar YAVAŞLADIĞINI gösteren kaba bir ölçü.', en: 'A rough measure of how much SLOWER an operation gets as the data GROWS.' },
    analogy: { tr: 'Bir telefon rehberinde ismi ALFABETİK sırayla aramak (hızlı, Big O(log n)) ile baştan sona TEK TEK okumak (yavaş, Big O(n)) arasındaki fark gibi — rehber ne kadar KALINLAŞIRSA, yöntem seçimi o kadar ÖNEMLİ hale gelir.', en: 'Like the difference between searching a phone book ALPHABETICALLY (fast, Big O(log n)) versus reading it page by page (slow, Big O(n)) — the THICKER the book gets, the MORE the method choice matters.' },
  },
  dataStructure: {
    term: { tr: 'Data Structure (Veri Yapısı)', en: 'Data Structure' },
    aliases: ['data structure', 'veri yapisi'],
    short: { tr: 'Veriyi, belirli bir işlemi HIZLI yapabilmek için düzenli bir şekilde saklama yöntemi.', en: 'A way of organizing data so a specific operation can be done QUICKLY.' },
    analogy: { tr: 'Bir mutfaktaki farklı saklama kapları gibi: baharatlar için raf (hızlı görme), dondurulmuş yiyecek için kutu (uzun saklama) — HER iş için doğru "kap" (veri yapısı) farklıdır.', en: 'Like different storage containers in a kitchen: a spice rack (fast visibility), a freezer box (long-term storage) — the right "container" (data structure) differs for EACH job.' },
  },
  stackQueueDs: {
    term: { tr: 'Stack / Queue (Veri Yapısı)', en: 'Stack / Queue (Data Structure)' },
    aliases: ['stack (data structure)', 'lifo', 'fifo'],
    short: { tr: 'Stack: son giren ilk çıkar (LIFO). Queue: ilk giren ilk çıkar (FIFO).', en: 'Stack: last in, first out (LIFO). Queue: first in, first out (FIFO).' },
    analogy: { tr: 'Stack, üst üste dizilmiş tabaklar yığını gibidir — en ÜSTTEKİni alırsın. Queue ise bir kuyruk gibidir — en ÖNCE gelen en ÖNCE hizmet alır.', en: 'A stack is like a pile of stacked plates — you take the one on TOP. A queue is like a line at a store — whoever arrived FIRST gets served FIRST.' },
  },
  binarySearch: {
    term: { tr: 'Binary Search (İkili Arama)', en: 'Binary Search' },
    aliases: ['binary search', 'ikili arama'],
    short: { tr: 'SIRALI bir listede, her adımda arama alanını YARIYA bölerek hızlıca eleman bulma yöntemi.', en: 'A method for finding an item in a SORTED list by cutting the search area in HALF at every step.' },
    analogy: { tr: 'Bir sözlükte kelime ararken baştan sayfa sayfa DEĞİL, ortadan açıp "aradığım bundan önce mi sonra mı" diye bölerek ilerlemen gibi — her adımda arama alanın YARIYA iner.', en: 'Like searching a dictionary not page by page from the start, but opening it in the middle and asking "is what I want before or after this" — the search area HALVES with every step.' },
  },
  syntaxError: {
    term: { tr: 'Syntax (Sözdizimi)', en: 'Syntax' },
    aliases: ['syntax', 'sozdizimi'],
    short: { tr: 'Bir programlama dilinin, kodun NASIL yazılması gerektiğine dair kuralları.', en: 'The rules a programming language has for HOW code must be written.' },
    analogy: { tr: 'Bir dildeki dilbilgisi kuralları gibi: cümlenin ANLAMI doğru olsa bile kelime sırası/noktalama yanlışsa cümle "bozuk" sayılır — kod da syntax kurallarına uymazsa çalışmaz.', en: 'Like a language\'s grammar rules: even if the MEANING is right, wrong word order/punctuation makes a sentence "broken" — code that breaks syntax rules simply does not run.' },
  },
  compileInterpret: {
    term: { tr: 'Compile / Interpret (Derleme / Yorumlama)', en: 'Compile / Interpret' },
    aliases: ['compile', 'compiler', 'interpret', 'interpreter', 'derleme'],
    short: { tr: 'Compile: kodun çalıştırılmadan ÖNCE makine diline çevrilmesi. Interpret: kodun satır satır, ÇALIŞTIRILIRKEN okunup yürütülmesi.', en: 'Compile: translating code to machine language BEFORE running it. Interpret: reading and running code line by line, WHILE it executes.' },
    analogy: { tr: 'Compile, bir kitabı BAŞTAN SONA çevirip sonra okumaya benzer (Java). Interpret ise bir tercümanın konuşmayı ANINDA, cümle cümle çevirmesi gibidir (Python) — ikisi de aynı bilgiyi taşır, sadece ZAMANLAMASI farklıdır.', en: 'Compile is like translating a whole book FIRST and then reading it (Java). Interpret is like a live interpreter translating speech sentence by sentence AS it happens (Python) — both carry the same information, just at a different TIME.' },
  },
  dataType: {
    term: { tr: 'Data Type (Veri Tipi)', en: 'Data Type' },
    aliases: ['data type', 'veri tipi'],
    short: { tr: 'Bir değerin NE ÇEŞİT bir bilgi olduğunu belirten etiket (sayı, metin, doğru/yanlış gibi).', en: 'A label that says WHAT KIND of information a value is (number, text, true/false, etc.).' },
    analogy: { tr: 'Bir depodaki kutuların üstüne "kırılabilir", "sıvı", "yiyecek" yazması gibi — kutunun tipini bilmek, onu NASIL taşıman/kullanman gerektiğini belirler.', en: 'Like labeling warehouse boxes "fragile", "liquid", "food" — knowing a box\'s type determines HOW you must handle/use it.' },
  },
  functionMethod: {
    term: { tr: 'Function / Method (Fonksiyon)', en: 'Function / Method' },
    aliases: ['function', 'fonksiyon', 'method (code)'],
    short: { tr: 'Belirli bir işi yapan, isimlendirilmiş ve TEKRAR TEKRAR çağrılabilen bir kod parçası.', en: 'A named piece of code that does a specific job and can be called AGAIN and AGAIN.' },
    analogy: { tr: 'Bir kahve makinesinin "kahve yap" düğmesi gibi: düğmeye her bastığında (çağırdığında) AYNI adımlar otomatik çalışır — o adımları her seferinde elle tekrarlaman gerekmez.', en: 'Like a coffee machine\'s "brew" button: every time you press it (call it), the SAME steps run automatically — you never have to repeat those steps by hand.' },
  },
  parameterArgument: {
    term: { tr: 'Parameter / Argument (Parametre)', en: 'Parameter / Argument' },
    aliases: ['parameter', 'argument', 'parametre'],
    short: { tr: 'Bir fonksiyona, çalışırken kullanması için verilen GİRDİ değeri.', en: 'An INPUT value handed to a function for it to use while running.' },
    analogy: { tr: 'Bir kahve makinesine "büyük boy, sütlü" seçeneğini söylemek gibi — makinenin YAPTIĞI iş aynıdır (kahve yapmak), ama verdiğin parametreye göre SONUÇ değişir.', en: 'Like telling a coffee machine "large size, with milk" — the machine\'s JOB is the same (making coffee), but the RESULT changes based on the parameters you give it.' },
  },
  ide: {
    term: { tr: 'IDE (Geliştirme Ortamı)', en: 'IDE' },
    aliases: ['ide'],
    short: { tr: 'Kod yazmak, çalıştırmak ve hata ayıklamak için tek bir programda toplanmış araç seti.', en: 'A toolset for writing, running, and debugging code, all gathered in one program.' },
    analogy: { tr: 'Bir aşçının her aletin (bıçak, tencere, fırın) AYRI AYRI bir odada olması yerine, hepsinin TEK bir mutfakta bir arada olması gibi — IDE, kod yazmanın tüm araçlarını tek bir yerde toplar.', en: 'Like a chef having every tool (knife, pot, oven) gathered in ONE kitchen instead of SEPARATE rooms — an IDE gathers all the tools for writing code in one place.' },
  },
  productionEnvironment: {
    term: { tr: 'Production (Canlı Ortam)', en: 'Production' },
    aliases: ['production', 'canli ortam', 'uretim ortami'],
    short: { tr: 'Yazılımın GERÇEK kullanıcılar tarafından kullanıldığı, "canlı" ortam.', en: 'The "live" environment where REAL users actually use the software.' },
    analogy: { tr: 'Bir tiyatro provası (test ortamı) ile gerçek gösteri gecesi (production) arasındaki fark gibi — provada hata yaparsan kimse fark etmez, ama gerçek gecede SEYİRCİ (gerçek kullanıcı) izliyordur.', en: 'Like the difference between a theater rehearsal (test environment) and the actual show night (production) — a mistake in rehearsal goes unnoticed, but on the real night the AUDIENCE (real users) is watching.' },
  },
  environment: {
    term: { tr: 'Environment (Ortam)', en: 'Environment' },
    aliases: ['test environment', 'staging', 'ortam (yazilim)'],
    short: { tr: 'Bir yazılımın çalıştığı, birbirinden AYRI kurulmuş bilgisayar/sunucu ortamlarından biri (test, staging, production gibi).', en: 'One of the SEPARATE computer/server setups a piece of software runs in (like test, staging, production).' },
    analogy: { tr: 'Bir dizinin farklı çekim setleri gibi: prova seti (test), son kontrol seti (staging) ve YAYINDAKİ gerçek bölüm (production) — AYNI senaryo ama her ortamın riski ve izleyicisi farklıdır.', en: 'Like different film sets for a TV series: the rehearsal set (test), the final-check set (staging), and the episode that actually AIRS (production) — the SAME script, but each environment has a different risk and audience.' },
  },
}
