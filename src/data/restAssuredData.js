// ─── Shared bilingual sections ────────────────────────────────────────────────
// All text fields use { tr, en } — tx() helper picks the right language.
// Code blocks never change between languages.
import { fillMissingCodeTrios, fillMissingFeynman } from './interactiveTrioFillers.js'

// ── Dalga A4 (animation-per-topic §3.2): kod-bloğu-başına animasyon açıkları ──

const raPomXmlDependenciesStep = {
  type: 'step-animation',
  title: { tr: 'pom.xml\'deki 8 Bağımlılık Hangi Görevi Üstlenir?', en: 'What Role Does Each of the 8 pom.xml Dependencies Play?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'rest-assured + json-path +…', en: 'The rest-assured + json-path +…' }, detail: { tr: '`rest-assured` + `json-path` + `json-schema-validator` ÜÇLÜSÜ, sırasıyla istek/yanıt zincirini, değer çekmeyi ve kontrat doğrulamasını sağlar — hepsi `<scope>test</scope>`, production jar\'ına asla karışmaz.', en: 'The `rest-assured` + `json-path` + `json-schema-validator` TRIO handles the request/response chain, value extraction, and contract validation respectively — all `<scope>test</scope>`, never leaking into the production jar.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'junit-jupiter testleri ÇALIŞTIRIR…', en: 'junit-jupiter RUNS the tests…' }, detail: { tr: '`junit-jupiter` testleri ÇALIŞTIRIR, `hamcrest` ise assertion\'ları OKUNABİLİR yazar — ikisi farklı görev, biri olmadan diğeri anlamsız kalır.', en: '`junit-jupiter` RUNS the tests, `hamcrest` writes assertions READABLY — two different jobs, one is meaningless without the other.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'jackson-databind YORUM DEĞİL zorunludur…', en: 'jackson-databind is NOT optional…' }, detail: { tr: '`jackson-databind` YORUM DEĞİL zorunludur: POJO\'ları JSON\'a çeviren tam olarak bu kütüphanedir — eksik olursa `body(request)` çağrısı derleme geçse bile çalışma zamanında patlar.', en: '`jackson-databind` is NOT optional despite the comment saying so: it is EXACTLY the library that converts POJOs to JSON — without it, `body(request)` compiles but blows up at runtime.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'lombok <scope>provided</scope>dur…', en: 'lombok is <scope>provided</scope>…' }, detail: { tr: '`lombok` `<scope>provided</scope>`dur — sadece DERLEME sırasında getter/setter üretir, çalışan uygulamaya hiçbir kod EKLEMEZ.', en: '`lombok` is `<scope>provided</scope>` — it generates getters/setters only at COMPILE time, it ADDS no code to the running application.' } },
  ],
}

const raBaseTestStep = {
  type: 'step-animation',
  title: { tr: '@BeforeAll static Blok Cluster\'da Sadece Bir Kez Neden Çalışır?', en: 'Why Does the @BeforeAll static Block Run Only Once?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'protected static RequestSpecification spec…', en: 'protected static RequestSpecification spec…' }, detail: { tr: '`protected static RequestSpecification spec` — `static` anahtar kelimesi bu alanı SINIF seviyesinde tanımlar, her test METODUNDA değil, TÜM test SINIFI boyunca TEK bir kopyası vardır.', en: '`protected static RequestSpecification spec` — the `static` keyword defines this at the CLASS level: ONE copy exists for the WHOLE test CLASS, not per test METHOD.' } },
    { id: 2, icon: '2️⃣', label: { tr: '@BeforeAll JUnit5\'te SADECE static…', en: '@BeforeAll in JUnit5 works ONLY with…' }, detail: { tr: '`@BeforeAll` JUnit5\'te SADECE static metotlarla çalışır — bu, `spec`\'in TÜM test metotları başlamadan ÖNCE tam olarak BİR KEZ kurulmasını garanti eder.', en: '`@BeforeAll` in JUnit5 works ONLY with static methods — this guarantees `spec` is set up exactly ONCE, BEFORE all test methods begin.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'System.getProperty("baseUri"…', en: 'System.getProperty("baseUri"…' }, detail: { tr: '`System.getProperty("baseUri", "https://reqres.in")` bir GERİ DÖNÜŞ değeri sağlar — komut satırından `-DbaseUri=...` verilmezse varsayılan URL KULLANILIR, kod hiç değişmez.', en: '`System.getProperty("baseUri", "https://reqres.in")` provides a FALLBACK value — if `-DbaseUri=...` isn\'t passed on the command line, the default URL is USED, the code never changes.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'İki Filter (Request/Response Logging)…', en: 'ADDING the two Filters…' }, detail: { tr: 'İki `Filter` (Request/Response Logging) EKLENMESİ, her test çalıştığında TAM istek/yanıt içeriğinin konsola BASILMASINI sağlar — hata ayıklarken elle log satırı yazmana gerek KALMAZ.', en: 'ADDING the two `Filter`s (Request/Response Logging) makes the FULL request/response content PRINT to console on every test run — no need to hand-write log lines when debugging.' } },
  ],
}

const raGetPaginationStep = {
  type: 'step-animation',
  title: { tr: 'queryParam("page", 2) URL\'i Nasıl Değiştirir?', en: 'How Does queryParam("page", 2) Transform the URL?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '.queryParam("page"…', en: 'The .queryParam("page"…' }, detail: { tr: '`.queryParam("page", 2)` çağrısı `GET /api/users` adresine `?page=2` EKLER — URL\'i elle string birleştirerek yazmak yerine REST Assured bunu SENİN için kodlar.', en: 'The `.queryParam("page", 2)` call APPENDS `?page=2` to `GET /api/users` — instead of hand-concatenating the URL string, REST Assured encodes it FOR you.' } },
    { id: 2, icon: '2️⃣', label: { tr: '.body("data"…', en: '.body("data"…' }, detail: { tr: '`.body("data", hasSize(6))` yanıttaki `data` dizisinin TAM OLARAK 6 eleman içerdiğini doğrular — bu, `reqres.in`\'in sayfa başına 6 kullanıcı döndürdüğü VARSAYIMINI test eder.', en: '`.body("data", hasSize(6))` verifies the `data` array has EXACTLY 6 elements — this tests the ASSUMPTION that `reqres.in` returns 6 users per page.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.body("data.first_name"…', en: '.body("data.first_name"…' }, detail: { tr: '`.body("data.first_name", everyItem(notNullValue()))` dizideki HER TEK kullanıcının `first_name` alanının dolu olduğunu tek satırda doğrular — 6 ayrı assertion yazmaya GEREK kalmaz.', en: '`.body("data.first_name", everyItem(notNullValue()))` verifies EVERY SINGLE user in the array has a non-empty `first_name` in one line — no NEED to write 6 separate assertions.' } },
    { id: 4, icon: '4️⃣', label: { tr: '.time(lessThan(5000L)) performansı da…', en: '.time(lessThan(5000L)) adds performance…' }, detail: { tr: '`.time(lessThan(5000L))` performansı da AYNI zincire ekler — fonksiyonel doğruluk VE hız tek bir testte birlikte kanıtlanır.', en: '`.time(lessThan(5000L))` adds performance to the SAME chain — functional correctness AND speed are proven together in one test.' } },
  ],
}

const raGetSingleRecord404Step = {
  type: 'step-animation',
  title: { tr: 'pathParam Neden queryParam\'dan Farklı Bir URL Üretir?', en: 'Why Does pathParam Produce a Different URL Than queryParam?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '.pathParam("id"…', en: '.pathParam("id"…' }, detail: { tr: '`.pathParam("id", 2)` + `.get("/api/users/{id}")` — `{id}` yer tutucusu URL\'in İÇİNE gömülür (`/api/users/2`), `?` ile eklenen bir queryParam DEĞİLDİR.', en: '`.pathParam("id", 2)` + `.get("/api/users/{id}")` — the `{id}` placeholder is embedded INTO the URL (`/api/users/2`), it is NOT a `?`-appended queryParam.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Var olan bir ID (2) ile 200 dönerken…', en: 'An existing ID (2) returns 200…' }, detail: { tr: 'Var olan bir ID (2) ile 200 dönerken, var OLMAYAN bir ID (999) ile 404 dönmesi — AYNI endpoint\'in iki farklı davranışını tek testte yan yana kanıtlar.', en: 'An existing ID (2) returns 200, while a NON-existing ID (999) returns 404 — proving two different behaviors of the SAME endpoint side by side in one test suite.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.body(equalTo("{}")) reqres.in\'in…', en: '.body(equalTo("{}")) verifies reqres.in…' }, detail: { tr: '`.body(equalTo("{}"))` reqres.in\'in 404\'te boş bir JSON nesnesi (`{}`) döndürdüğünü doğrular — bazı API\'ler burada HTML hata sayfası döner, bu FARKI test etmeden bilemezsin.', en: '`.body(equalTo("{}"))` verifies reqres.in returns an empty JSON object (`{}`) on 404 — some APIs return an HTML error page instead, and you cannot know this DIFFERENCE without testing it.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Yorum satırındaki "Negative tests are…', en: 'The comment\'s "Negative tests are…' }, detail: { tr: 'Yorum satırındaki "Negative tests are equally important" ilkesi somutlaşır: sadece "çalışıyor mu" değil, "doğru şekilde BAŞARISIZ oluyor mu" da test kapsamına GİRER.', en: 'The comment\'s "Negative tests are equally important" principle becomes concrete: not just "does it work" but also "does it FAIL correctly" ENTERS test coverage.' } },
  ],
}

const raBasicAuthStep = {
  type: 'step-animation',
  title: { tr: 'preemptive() Olmadan İlk İstek Neden Fazladan Bir Round-Trip Yapar?', en: 'Without preemptive(), Why Does the First Request Make an Extra Round-Trip?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '.auth().basic("admin"…', en: '.auth().basic("admin"…' }, detail: { tr: '`.auth().basic("admin", "secret123")` "username:password" metnini Base64\'e ÇEVİRİR ve `Authorization: Basic ...` header\'ı olarak EKLER — bu şifreleme DEĞİL, sadece kodlamadır.', en: '`.auth().basic("admin", "secret123")` CONVERTS the "username:password" text to Base64 and ADDS it as the `Authorization: Basic ...` header — this is encoding, NOT encryption.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'NORMAL .basic() ÖNCE auth\'suz bir istek…', en: 'PLAIN .basic() sends a request WITHOUT…' }, detail: { tr: 'NORMAL `.basic()` ÖNCE auth\'suz bir istek gönderir, sunucu 401 döner, SONRA auth ile yeniden dener — bu 2 round-trip DEMEKTIR.', en: 'PLAIN `.basic()` sends a request WITHOUT auth FIRST, the server returns 401, THEN it retries WITH auth — this MEANS 2 round-trips.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.preemptive() bu bekleme oyununu ATLAR…', en: '.preemptive() SKIPS this waiting game…' }, detail: { tr: '`.preemptive()` bu bekleme oyununu ATLAR — auth header\'ı DAHA İLK istekte gönderir, sunucu asla 401 döndürmez.', en: '`.preemptive()` SKIPS this waiting game — it sends the auth header on the VERY FIRST request, the server never returns 401.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Sonuç: her testte 1 EKSİK HTTP…', en: 'Result…' }, detail: { tr: 'Sonuç: her testte 1 EKSİK HTTP round-trip = daha hızlı test suite VE sunucu loglarında gereksiz 401 gürültüsü OLMAZ.', en: 'Result: 1 FEWER HTTP round-trip per test = a faster test suite AND no unnecessary 401 noise in server logs.' } },
  ],
}

const raBearerTokenStep = {
  type: 'step-animation',
  title: { tr: 'Login Token\'ı Tüm Test Metotları Arasında Nasıl Paylaşılır?', en: 'How Is the Login Token Shared Across All Test Methods?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'private static String token…', en: 'private static String token…' }, detail: { tr: '`private static String token` — `static` olduğu için bu değişken SINIF seviyesindedir, `@BeforeAll`\'da BİR KEZ doldurulur ve TÜM `@Test` metotları bu AYNI değeri okur.', en: '`private static String token` — being `static` makes this a CLASS-level variable, filled ONCE in `@BeforeAll`, and ALL `@Test` methods read this SAME value.' } },
    { id: 2, icon: '2️⃣', label: { tr: '.extract().path("token") login…', en: '.extract().path("token") PULLS the…' }, detail: { tr: '`.extract().path("token")` login yanıtının JSON gövdesinden `token` alanını ÇEKER ve doğrudan bir `String` değişkenine ATAR — ayrı bir parse adımı YAZMAN gerekmez.', en: '`.extract().path("token")` PULLS the `token` field from the login response\'s JSON body and ASSIGNS it directly to a `String` variable — no separate parsing step to WRITE.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.auth().oauth2(token) bu token\'ı Authorization…', en: '.auth().oauth2(token) ADDS this token…' }, detail: { tr: '`.auth().oauth2(token)` bu token\'ı `Authorization: Bearer {token}` header\'ı olarak EKLER — token\'ı elle header string\'ine birleştirmene GEREK kalmaz.', en: '`.auth().oauth2(token)` ADDS this token as the `Authorization: Bearer {token}` header — no NEED to manually concatenate the token into a header string.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'İkinci test (token OLMADAN) 401 bekler…', en: 'The second test (WITHOUT a token) expects 401…' }, detail: { tr: 'İkinci test (token OLMADAN) 401 bekler — bu, "korumalı endpoint gerçekten KORUNUYOR mu" sorusunu ayrı bir test olarak KANITLAR, sadece "token ile çalışıyor" demek YETMEZ.', en: 'The second test (WITHOUT a token) expects 401 — this PROVES as a separate test that the protected endpoint is ACTUALLY protected, just saying "it works with a token" is NOT enough.' } },
  ],
}

const raRequestPojoStep = {
  type: 'step-animation',
  title: { tr: '@JsonInclude(NON_NULL) Doldurulmayan Alanları Nasıl Gizler?', en: 'How Does @JsonInclude(NON_NULL) Hide Unfilled Fields?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '@Data + @Builder Lombok anotasyonları…', en: '@Data + @Builder Lombok annotations…' }, detail: { tr: '`@Data` + `@Builder` Lombok anotasyonları, getter/setter/constructor kodunu DERLEME zamanında OTOMATİK üretir — bu kodu elle YAZMAN gerekmez, IDE\'de de GÖRÜNMEZ ama derlenmiş sınıfta VARDIR.', en: '`@Data` + `@Builder` Lombok annotations AUTO-generate getter/setter/constructor code at COMPILE time — you don\'t WRITE this code, it\'s not VISIBLE in the IDE but it EXISTS in the compiled class.' } },
    { id: 2, icon: '2️⃣', label: { tr: '@JsonInclude(NON_NULL) sayesinde…', en: 'Thanks to @JsonInclude(NON_NULL)…' }, detail: { tr: '`@JsonInclude(NON_NULL)` sayesinde `.name("Alice").job("QA").build()` çağrısı `firstName`/`lastName`\'i JSON\'a HİÇ YAZMAZ — null alanlar sessizce ATLANIR, `"firstName":null` gibi gürültü ÜRETMEZ.', en: 'Thanks to `@JsonInclude(NON_NULL)`, `.name("Alice").job("QA").build()` does NOT write `firstName`/`lastName` to JSON AT ALL — null fields are SILENTLY skipped, no `"firstName":null` noise is PRODUCED.' } },
    { id: 3, icon: '3️⃣', label: { tr: '@JsonProperty("first_name") Java\'daki…', en: '@JsonProperty("first_name") BRIDGES…' }, detail: { tr: '`@JsonProperty("first_name")` Java\'daki `firstName` (camelCase) ile API\'nin beklediği `first_name` (snake_case) arasında KÖPRÜ kurar — bu eşleme OLMASAYDI API alanı TANIMAMAZDI.', en: '`@JsonProperty("first_name")` BRIDGES Java\'s `firstName` (camelCase) with the API\'s expected `first_name` (snake_case) — WITHOUT this mapping, the API would NOT RECOGNIZE the field.' } },
    { id: 4, icon: '4️⃣', label: { tr: '.nme() gibi bir yazım hatası YAZMAYA…', en: 'If you TRY TO WRITE a typo like .nme()…' }, detail: { tr: '`.nme()` gibi bir yazım hatası YAZMAYA ÇALIŞIRSAN derleyici bunu ANINDA REDDEDER — String JSON\'daki aynı hata ise ancak çalışma zamanında, sunucu yanıtından SONRA fark edilir.', en: 'If you TRY TO WRITE a typo like `.nme()`, the compiler REJECTS it INSTANTLY — the same typo in String JSON is only noticed at runtime, AFTER the server responds.' } },
  ],
}

const raResponsePojoStep = {
  type: 'step-animation',
  title: { tr: '.as(SingleUserResponse.class) Tek Satırda Ne Yapar?', en: 'What Does .as(SingleUserResponse.class) Do in One Line?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '@JsonIgnoreProperties(ignoreUnknown =…', en: '@JsonIgnoreProperties(ignoreUnknown =…' }, detail: { tr: '`@JsonIgnoreProperties(ignoreUnknown = true)` HER response POJO\'sunda ZORUNLUDUR — API yarın yeni bir alan EKLERSE, bu anotasyon olmadan `UnrecognizedPropertyException` ile test KIRILIR.', en: '`@JsonIgnoreProperties(ignoreUnknown = true)` is MANDATORY on EVERY response POJO — if the API ADDS a new field tomorrow, without this annotation the test BREAKS with `UnrecognizedPropertyException`.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'İÇ İÇE static class UserData yapısı…', en: 'The NESTED static class UserData…' }, detail: { tr: 'İÇ İÇE `static class UserData` yapısı, JSON\'daki `data: {...}` iç içe nesnesini BİREBİR yansıtır — Java sınıf hiyerarşisi, JSON\'un ağaç yapısıyla EŞLEŞİR.', en: 'The NESTED `static class UserData` structure MIRRORS the JSON\'s nested `data: {...}` object exactly — the Java class hierarchy MATCHES the JSON\'s tree shape.' } },
    { id: 3, icon: '3️⃣', label: { tr: '…', en: '…' }, detail: { tr: '`.extract().body().as(SingleUserResponse.class)` TÜM JSON gövdesini TEK çağrıda bir Java nesnesine DÖNÜŞTÜRÜR — ayrı ayrı `.path()` çağrıları YAZMAN gerekmez.', en: '`.extract().body().as(SingleUserResponse.class)` CONVERTS the ENTIRE JSON body into a Java object in ONE call — no NEED to write separate `.path()` calls.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Sonuç response.getData().getFirstName()…', en: 'The result is read with TYPE-SAFE Java…' }, detail: { tr: 'Sonuç `response.getData().getFirstName()` gibi TİP GÜVENLİ Java metot çağrılarıyla okunur — `response.path("data.first_name")` yazarken yapabileceğin bir alan adı YAZIM HATASI burada derleme zamanında YAKALANIR.', en: 'The result is read with TYPE-SAFE Java method calls like `response.getData().getFirstName()` — a field-name TYPO you could make writing `response.path("data.first_name")` is CAUGHT at compile time here.' } },
  ],
}

const raHamcrestMatchersStep = {
  type: 'step-animation',
  title: { tr: 'Neden 6 Farklı Matcher Kategorisi Var, Tek Bir equalTo() Yetmez mi?', en: 'Why 6 Different Matcher Categories — Isn\'t equalTo() Alone Enough?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'equalTo/not/equalToIgnoringCase TAM…', en: 'equalTo/not/equalToIgnoringCase are the…' }, detail: { tr: '`equalTo`/`not`/`equalToIgnoringCase` TAM eşleşme ailesidir; `notNullValue`/`nullValue`/`emptyString` ise VARLIK kontrolüdür — biri "değer NE", diğeri "değer VAR MI" sorusuna cevap verir.', en: '`equalTo`/`not`/`equalToIgnoringCase` are the EXACT-match family; `notNullValue`/`nullValue`/`emptyString` are EXISTENCE checks — one answers "WHAT is the value", the other "DOES a value exist".' } },
    { id: 2, icon: '2️⃣', label: { tr: 'greaterThan/between/lessThan SAYISAL…', en: 'greaterThan/between/lessThan are NUMERIC…' }, detail: { tr: '`greaterThan`/`between`/`lessThan` SAYISAL aralık kontrolüdür — `age` alanının TAM OLARAK 25 olmasını değil, MANTIKLI bir aralıkta olmasını doğrularsın, bu daha GERÇEKÇİ bir testtir.', en: '`greaterThan`/`between`/`lessThan` are NUMERIC range checks — you verify `age` falls in a REASONABLE range instead of being EXACTLY 25, which is a more REALISTIC test.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'hasSize/hasItem/everyItem KOLEKSİYON…', en: 'hasSize/hasItem/everyItem are COLLECTION…' }, detail: { tr: '`hasSize`/`hasItem`/`everyItem` KOLEKSİYON matcher\'larıdır — bunlar olmadan bir diziyi doğrulamak için elle `for` döngüsü YAZMAN gerekirdi.', en: '`hasSize`/`hasItem`/`everyItem` are COLLECTION matchers — without them you would have to hand-write a `for` loop to verify an array.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'anyOf(equalTo(200)…', en: 'anyOf(equalTo(200)…' }, detail: { tr: '`anyOf(equalTo(200), equalTo(201))` TEK satırda "200 VEYA 201 kabul et" der — API bazen 200 bazen 201 dönebiliyorsa, iki AYRI test yazmak yerine bu TEK matcher yeterlidir.', en: '`anyOf(equalTo(200), equalTo(201))` says "accept 200 OR 201" in ONE line — if the API sometimes returns 200 and sometimes 201, this ONE matcher suffices instead of writing two SEPARATE tests.' } },
  ],
}

const raExtractPathStep = {
  type: 'step-animation',
  title: { tr: 'extract().path() ile extract().response() Arasındaki Fark Nedir?', en: 'What Is the Difference Between extract().path() and extract().response()?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: '.extract().path("data.email") TEK BİR…', en: '.extract().path("data.email") PULLS a…' }, detail: { tr: '`.extract().path("data.email")` TEK BİR alanı doğrudan `String`\'e ÇEKER — başka hiçbir alana ihtiyacın yoksa en KISA yoldur.', en: '`.extract().path("data.email")` PULLS a SINGLE field directly into a `String` — the SHORTEST path when you need nothing else.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'AYNI JSON Path sözdizimi…', en: 'The SAME JSON Path syntax WORKS for…' }, detail: { tr: 'AYNI JSON Path sözdizimi, tekil bir `String` için de (`data.email`) bir `List<String>` için de (`data.email` — dizi elemanlarına uygulanınca) ÇALIŞIR — REST Assured tipi OTOMATİK çıkarır.', en: 'The SAME JSON Path syntax WORKS for both a single `String` (`data.email`) and a `List<String>` (`data.email` — applied across array elements) — REST Assured infers the type AUTOMATICALLY.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.extract().response() TÜM Response…', en: '.extract().response() returns the…' }, detail: { tr: '`.extract().response()` TÜM `Response` nesnesini döndürür — birden fazla alana `res.path(...)` ile erişmen gerektiğinde, isteği TEKRAR göndermek yerine BİR kez çekip TEKRAR TEKRAR okursun.', en: '`.extract().response()` returns the ENTIRE `Response` object — when you need multiple fields via `res.path(...)`, you extract ONCE and read REPEATEDLY instead of sending the request AGAIN.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'res.asString() ham JSON metnini TAMAMEN…', en: 'res.asString() serves a COMPLETELY…' }, detail: { tr: '`res.asString()` ham JSON metnini TAMAMEN farklı bir amaç için verir: debug loglaması veya beklenmeyen bir formatı (HTML hata sayfası gibi) YAKALAMAK için.', en: '`res.asString()` serves a COMPLETELY different purpose: debug logging or CATCHING an unexpected format (like an HTML error page).' } },
  ],
}

const raGroovyFiltersStep = {
  type: 'step-animation',
  title: { tr: 'find { } ile findAll { } JSON Path\'i Nasıl SQL\'e Benzer Hale Getirir?', en: 'How Do find { } and findAll { } Make JSON Path Feel Like SQL?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'data.find { it.id == 3 }.email…', en: 'data.find { it.id == 3 }.email…' }, detail: { tr: '`data.find { it.id == 3 }.email` — `find` dizide KOŞULU sağlayan İLK elemanı bulur ve dur; SQL\'deki `WHERE id = 3 LIMIT 1` ile AYNI mantık.', en: '`data.find { it.id == 3 }.email` — `find` locates the FIRST matching element in the array and stops; the SAME logic as SQL\'s `WHERE id = 3 LIMIT 1`.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'data.findAll { it.id > 4 }.first_name…', en: 'data.findAll { it.id > 4 }.first_name…' }, detail: { tr: '`data.findAll { it.id > 4 }.first_name` — `findAll` KOŞULU sağlayan TÜM elemanları bir listeye toplar; SQL\'deki `WHERE id > 4` ile AYNI mantık, ama filtre LIMIT\'siz.', en: '`data.findAll { it.id > 4 }.first_name` — `findAll` collects ALL matching elements into a list; the SAME logic as SQL\'s `WHERE id > 4`, but without a LIMIT.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'it Groovy\'nin ÖRTÜK değişkenidir…', en: 'it is Groovy\'s IMPLICIT variable…' }, detail: { tr: '`it` Groovy\'nin ÖRTÜK değişkenidir — döngü değişkenini elle isimlendirmene GEREK kalmaz, dizideki "şu anki eleman"ı otomatik TEMSİL eder.', en: '`it` is Groovy\'s IMPLICIT variable — no NEED to manually name a loop variable, it automatically REPRESENTS "the current element" in the array.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Bu filtreler .body(...)…', en: 'These filters also work INSIDE .body(...)…' }, detail: { tr: 'Bu filtreler `.body(...)` assertion\'larının İÇİNDE de çalışır — veri ÇEKMEK ile veri DOĞRULAMAK için AYNI sözdizimini kullanırsın, iki farklı API öğrenmene gerek YOK.', en: 'These filters also work INSIDE `.body(...)` assertions — you use the SAME syntax to EXTRACT data and to VERIFY data, no NEED to learn two different APIs.' } },
  ],
}

const raSslErrorStep = {
  type: 'step-animation',
  title: { tr: 'setRelaxedHTTPSValidation() ve Health-Check Döngüsü Aynı Hatanın İki Farklı Nedenini Nasıl Çözer?', en: 'How Do setRelaxedHTTPSValidation() and the Health-Check Loop Fix Two Different Causes of the Same Error?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'SSLHandshakeException\'ın kök nedeni…', en: 'The root cause of SSLHandshakeException…' }, detail: { tr: '`SSLHandshakeException`\'ın kök nedeni self-signed sertifikadır — `.setRelaxedHTTPSValidation()` bu sertifika kontrolünü ATLAR, ama YORUMDAKİ uyarı gibi SADECE dev/test ortamında GÜVENLİDİR.', en: 'The root cause of `SSLHandshakeException` is a self-signed certificate — `.setRelaxedHTTPSValidation()` SKIPS that certificate check, but as the COMMENT warns, it is SAFE ONLY in dev/test environments.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'AYNI bölümdeki waitForService() TAMAMEN…', en: 'The waitForService() in the SAME…' }, detail: { tr: 'AYNI bölümdeki `waitForService()` TAMAMEN FARKLI bir soruna çözümdür: CI/CD\'de uygulama testlerden SONRA ayağa kalkarsa, ilk istekler bağlantı hatası ALIR.', en: 'The `waitForService()` in the SAME section solves a COMPLETELY DIFFERENT problem: if the app starts AFTER the tests in CI/CD, the first requests get connection errors.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'for (i=0; i<10; i++) + Thread.sleep(3000)…', en: 'The for (i=0; i<10; i++) +…' }, detail: { tr: '`for (i=0; i<10; i++)` + `Thread.sleep(3000)` döngüsü, servis HAZIR olana kadar EN FAZLA 30 saniye BEKLER — sabit bir `sleep(30000)` yerine, servis erken hazırsa döngü ERKEN çıkar.', en: 'The `for (i=0; i<10; i++)` + `Thread.sleep(3000)` loop WAITS AT MOST 30 seconds until the service is READY — instead of a fixed `sleep(30000)`, if the service is ready early the loop EXITS early.' } },
    { id: 4, icon: '4️⃣', label: { tr: '10 denemenin HEPSİ başarısız olursa…', en: 'If ALL 10 attempts fail…' }, detail: { tr: '10 denemenin HEPSİ başarısız olursa `throw new RuntimeException(...)` net bir hata FIRLATIR — sessizce devam edip ANLAMSIZ bir "Connection refused" ile karışık bir sonraki hatayı GÖRMEZSİN.', en: 'If ALL 10 attempts fail, `throw new RuntimeException(...)` FIRES a clear error — you don\'t silently continue and see a NEXT error confused with a MEANINGLESS "Connection refused".' } },
  ],
}

const raFlakyAwaitilityStep = {
  type: 'step-animation',
  title: { tr: 'Awaitility, Thread.sleep() ile Aynı İşi Neden Daha Güvenilir Yapar?', en: 'Why Does Awaitility Do the Same Job More Reliably Than Thread.sleep()?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'YANLIŞ örnek…', en: 'The WRONG example checks status with…' }, detail: { tr: 'YANLIŞ örnek, `POST` sonrası HEMEN `GET` ile durumu kontrol eder — 202 "kabul edildi" demektir, "işlendi" DEMEZ; sunucu arka planda hâlâ ÇALIŞIYOR olabilir.', en: 'The WRONG example checks status with `GET` IMMEDIATELY after `POST` — 202 means "accepted", it does NOT mean "processed"; the server may still be WORKING in the background.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Awaitility.await().atMost(30…', en: 'Awaitility.await().atMost(30…' }, detail: { tr: '`Awaitility.await().atMost(30, SECONDS)` sabit bir bekleme DEĞİL, bir ÜST SINIRDIR — durum 5 saniyede hazır olursa test 5 saniyede BİTER, 30 saniye beklemez.', en: '`Awaitility.await().atMost(30, SECONDS)` is NOT a fixed wait, it is an UPPER BOUND — if the status is ready in 5 seconds, the test FINISHES in 5 seconds, it doesn\'t wait 30.' } },
    { id: 3, icon: '3️⃣', label: { tr: '.pollInterval(2…', en: '.pollInterval(2…' }, detail: { tr: '`.pollInterval(2, SECONDS)` her 2 saniyede bir YENİDEN sorgular — sabit `Thread.sleep(30000)`\'e kıyasla hem daha HIZLI hem daha AZ gereksiz istek atar.', en: '`.pollInterval(2, SECONDS)` RE-QUERIES every 2 seconds — compared to a fixed `Thread.sleep(30000)`, this is both FASTER and sends FEWER unnecessary requests.' } },
    { id: 4, icon: '4️⃣', label: { tr: '.until(() ->…', en: '.until(() ->…' }, detail: { tr: '`.until(() -> "PROCESSED".equals(status))` koşul SAĞLANANA kadar döngüyü OTOMATİK tekrarlar — asenkron bir işlemi test ederken bu, tek doğru YAKLAŞIMDIR, sabit bekleme her zaman ya ÇOK KISA ya ÇOK UZUN olur.', en: '`.until(() -> "PROCESSED".equals(status))` AUTOMATICALLY repeats the loop until the condition is MET — when testing an async operation, this is the one correct APPROACH; a fixed wait is always either TOO SHORT or TOO LONG.' } },
  ],
}

const raParallelDataCollisionStep = {
  type: 'step-animation',
  title: { tr: 'UUID, Faker ve @AfterEach Cleanup Üç Farklı Sorunu mu Çözüyor, Bir mi?', en: 'Do UUID, Faker, and @AfterEach Cleanup Solve Three Different Problems, or One?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'YANLIŞ örnek SABİT bir email…', en: 'The WRONG example uses a FIXED email…' }, detail: { tr: 'YANLIŞ örnek SABİT bir email (`alice@test.com`) kullanır — testler PARALEL çalıştığında iki test AYNI ANDA aynı email\'i oluşturmaya çalışır, biri 409 Conflict ALIR.', en: 'The WRONG example uses a FIXED email (`alice@test.com`) — when tests run in PARALLEL, two tests try to create the SAME email at once, one gets a 409 Conflict.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'UUID.randomUUID() HER çalıştırmada…', en: 'UUID.randomUUID() generates a DIFFERENT…' }, detail: { tr: '`UUID.randomUUID()` HER çalıştırmada FARKLI bir string üretir — bu, çakışma OLASILIĞINI matematiksel olarak SIFIRA yaklaştırır, basit bir sayaçtan çok daha güvenlidir.', en: '`UUID.randomUUID()` generates a DIFFERENT string on EVERY run — this mathematically drives collision PROBABILITY toward ZERO, far safer than a simple counter.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Faker sadece BENZERSİZLİK değil…', en: 'Faker adds not just UNIQUENESS but REALISM…' }, detail: { tr: '`Faker` sadece BENZERSİZLİK değil, GERÇEKÇİLİK de katar — `"user1"` yerine gerçek görünen bir isim/iş unvanı, testin GERÇEK kullanım senaryosuna daha yakın veriyle çalışmasını sağlar.', en: '`Faker` adds not just UNIQUENESS but REALISM — a realistic-looking name/job title instead of `"user1"` makes the test run against data closer to a REAL usage scenario.' } },
    { id: 4, icon: '4️⃣', label: { tr: '@AfterEach cleanup() oluşturulan…', en: '@AfterEach cleanup() ensures created…' }, detail: { tr: '`@AfterEach cleanup()` oluşturulan verinin test SONRASI SİLİNMESİNİ sağlar — bu OLMADAN, her test çalıştırması veritabanında BİRİKEN çöp veri bırakır ve zamanla test ortamı YAVAŞLAR.', en: '`@AfterEach cleanup()` ensures created data is DELETED after the test — WITHOUT this, every test run leaves ACCUMULATING junk data in the database, and the test environment SLOWS DOWN over time.' } },
  ],
}

const raBddChainFilm = {
  type: 'video-scene',
  id: 'ra-bdd-chain-film',
  title: { tr: '🎬 given().when().then(): Bir Cümle, Bir HTTP İsteği', en: '🎬 given().when().then(): One Sentence, One HTTP Request' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'given', emoji: '📋', label: { tr: 'given() — hazırlık', en: 'given() — setup' }, color: '#0ea5e9' },
    { id: 'when', emoji: '🚀', label: { tr: 'when() — eylem', en: 'when() — action' }, color: '#f59e0b' },
    { id: 'then', emoji: '✅', label: { tr: 'then() — doğrulama', en: 'then() — verification' }, color: '#22c55e' },
    { id: 'httpclient', emoji: '👻', label: { tr: 'Düz HttpClient (30+ satır)', en: 'Plain HttpClient (30+ lines)' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Bir API testi yazacaksın: header ekle, isteği gönder, status kodunu ve body\'yi doğrula. Java\'nın düz `HttpClient`\'ıyla bu kaç satır tutar? REST Assured aynı işi nasıl 3 kelimeye indiriyor?', en: 'You need to write an API test: add a header, send the request, verify the status code and body. How many lines does Java\'s plain `HttpClient` take? How does REST Assured compress the same job into 3 words?' },
      positions: { given: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — given(): isteğin İÇİNDE olacak her şeyi (header, body, auth, query param) burada TANIMLARSIN — henüz hiçbir ağ isteği atılmadı, sadece bir tarif hazırlanıyor.', en: 'Step 1 — given(): you DECLARE everything that will go INSIDE the request (headers, body, auth, query params) here — no network call has fired yet, you\'re just preparing a recipe.' },
      code: { tr: `given()\n    .header("Content-Type", "application/json")\n    .body(newUser)`, en: `given()\n    .header("Content-Type", "application/json")\n    .body(newUser)` },
      positions: { given: { x: 20, y: 40, scale: 1.15, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — when(): tarif hazır, ŞİMDİ gerçek HTTP isteği atılır — GET/POST/PUT/DELETE, hangisi olursa. Bu satırdan önce hiçbir şey sunucuya ulaşmamıştı.', en: 'Step 2 — when(): the recipe is ready, NOW the real HTTP request fires — GET/POST/PUT/DELETE, whichever it is. Before this line, nothing had reached the server.' },
      code: { tr: `.when()\n    .post("/api/users")`, en: `.when()\n    .post("/api/users")` },
      positions: {
        given: { x: 18, y: 55, opacity: 0.5, scale: 0.85 },
        when: { x: 52, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'given', to: 'when', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 3 — then(): response geldi, şimdi DOĞRULA — status kodu 201 mi, body\'de "id" alanı var mı? Bu üçü ZORUNLU sırayla çalışır: given→when→then, tersi mümkün değildir.', en: 'Step 3 — then(): the response arrived, now VERIFY it — is the status 201, does the body have an "id" field? These three run in a MANDATORY order: given→when→then, never reversed.' },
      code: { tr: `.then()\n    .statusCode(201)\n    .body("id", notNullValue());`, en: `.then()\n    .statusCode(201)\n    .body("id", notNullValue());` },
      positions: {
        when: { x: 20, y: 40, opacity: 0.5, scale: 0.85 },
        then: { x: 55, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'when', to: 'then', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Kontrast — bunu düz `java.net.http.HttpClient` ile yazsaydın: `HttpRequest.newBuilder()`, `.header(...)`, `.POST(BodyPublishers...)`, `client.send(...)`, sonra manuel JSON parse ve manuel assertion — 30+ satır, ve okuyan biri "hangi kısım istek, hangi kısım doğrulama" ayrımını cümleden değil, kod bloklarından çıkarmak zorunda kalır.', en: 'The contrast — writing this with plain `java.net.http.HttpClient`: `HttpRequest.newBuilder()`, `.header(...)`, `.POST(BodyPublishers...)`, `client.send(...)`, then manual JSON parsing and manual assertions — 30+ lines, and a reader has to infer "which part is the request, which part is verification" from code blocks instead of a sentence.' },
      positions: {
        then: { x: 22, y: 40, scale: 0.9 },
        httpclient: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'then', to: 'httpclient', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Ders — given().when().then() aslında bir test literatüründeki BDD (Given-When-Then) kalıbının Java DSL\'e dönüşmüş halidir: Cucumber\'daki Gherkin cümlelerinin AYNI mantığı, ama derlenen Java kodu olarak. Kod, okunması gereken bir senaryo cümlesi gibi akar.', en: 'The lesson — given().when().then() is literally the BDD (Given-When-Then) pattern from test literature, turned into a Java DSL: the SAME logic as Gherkin sentences in Cucumber, but as compiled Java code. The code reads like a scenario sentence you\'re meant to read aloud.' },
      positions: {
        httpclient: { x: 35, y: 50, scale: 1.0, opacity: 0.5 },
        given: { x: 65, y: 50, scale: 1.1 },
      },
    },
  ],
}

const raMavenSetupFilm = {
  type: 'video-scene',
  id: 'ra-maven-setup-film',
  title: { tr: '🎬 pom.xml\'e REST Assured Eklemek: Bağımlılıktan İlk Teste', en: '🎬 Adding REST Assured to pom.xml: From Dependency to First Test' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'pom', emoji: '📄', label: { tr: 'pom.xml', en: 'pom.xml' }, color: '#0ea5e9' },
    { id: 'maven', emoji: '📦', label: { tr: 'Maven Central', en: 'Maven Central' }, color: '#f59e0b' },
    { id: 'jar', emoji: '☕', label: { tr: 'rest-assured.jar', en: 'rest-assured.jar' }, color: '#8b5cf6' },
    { id: 'test', emoji: '✅', label: { tr: 'İlk Test Çalışıyor', en: 'First Test Runs' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'REST Assured bir framework değil, sadece bir JAR — projene NASIL dahil ediyorsun ve bunu yaptıktan sonra ne değişiyor?', en: 'REST Assured isn\'t a framework, just a JAR — HOW do you pull it into your project, and what changes once you do?' },
      positions: { pom: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — pom.xml\'e `<dependency>` bloğu eklenir: groupId `io.rest-assured`, artifactId `rest-assured`, scope genelde `test` (production kodunda gerekmez).', en: 'Step 1 — a `<dependency>` block is added to pom.xml: groupId `io.rest-assured`, artifactId `rest-assured`, scope usually `test` (not needed in production code).' },
      code: { tr: `<dependency>\n    <groupId>io.rest-assured</groupId>\n    <artifactId>rest-assured</artifactId>\n    <version>5.4.0</version>\n    <scope>test</scope>\n</dependency>`, en: `<dependency>\n    <groupId>io.rest-assured</groupId>\n    <artifactId>rest-assured</artifactId>\n    <version>5.4.0</version>\n    <scope>test</scope>\n</dependency>` },
      positions: { pom: { x: 20, y: 40, scale: 1.0 }, maven: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'pom', to: 'maven', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 2 — `mvn compile` çalıştırıldığında Maven, Maven Central\'dan `rest-assured-5.4.0.jar`\'ı (ve tüm transitive bağımlılıklarını — Hamcrest, Groovy) indirir, local `.m2` önbelleğine koyar.', en: 'Step 2 — running `mvn compile`, Maven downloads `rest-assured-5.4.0.jar` (and all its transitive dependencies — Hamcrest, Groovy) from Maven Central, caching it in the local `.m2` repository.' },
      code: { tr: `mvn compile\n# Downloading rest-assured-5.4.0.jar...`, en: `mvn compile\n# Downloading rest-assured-5.4.0.jar...` },
      positions: {
        pom: { x: 18, y: 55, opacity: 0.5, scale: 0.85 },
        maven: { x: 45, y: 45, scale: 1.1 },
        jar: { x: 70, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'maven', to: 'jar', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Adım 3 — jar classpath\'e eklendikten sonra `given()`, `when()`, `then()` statik metotları IDE\'de otomatik tamamlama ile görünür — `import static io.restassured.RestAssured.*;` satırı bu köprüyü kurar.', en: 'Step 3 — once the jar is on the classpath, the static methods `given()`, `when()`, `then()` show up in IDE autocomplete — the `import static io.restassured.RestAssured.*;` line builds this bridge.' },
      code: { tr: `import static io.restassured.RestAssured.*;\nimport static org.hamcrest.Matchers.*;`, en: `import static io.restassured.RestAssured.*;\nimport static org.hamcrest.Matchers.*;` },
      positions: {
        jar: { x: 22, y: 40, scale: 0.95 },
        test: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'jar', to: 'test', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — Postman\'de "kurulum" bir uygulama indirmektir; REST Assured\'da "kurulum" bir bağımlılık satırı eklemektir — bu fark, REST Assured testlerinin CI/CD\'ye Postman\'den çok daha doğal entegre olmasının temel nedenidir: `mvn test` zaten CI pipeline\'ının bir parçasıdır, ekstra bir "Postman CLI kur" adımı gerekmez.', en: 'The lesson — in Postman, "setup" means downloading an app; in REST Assured, "setup" means adding one dependency line — this difference is the core reason REST Assured tests integrate into CI/CD far more naturally than Postman: `mvn test` is already part of the CI pipeline, no extra "install Postman CLI" step needed.' },
      positions: { test: { x: 40, y: 50, scale: 1.1 }, pom: { x: 68, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raBasicRequestFilm = {
  type: 'video-scene',
  id: 'ra-basic-request-film',
  title: { tr: '🎬 Bir GET İsteğinin Yolculuğu: URL\'den Assertion\'a', en: '🎬 The Journey of a GET Request: From URL to Assertion' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test', emoji: '🧪', label: { tr: 'Test Kodu', en: 'Test Code' }, color: '#8b5cf6' },
    { id: 'request', emoji: '📤', label: { tr: 'HTTP GET /api/users/2', en: 'HTTP GET /api/users/2' }, color: '#0ea5e9' },
    { id: 'server', emoji: '🌐', label: { tr: 'reqres.in', en: 'reqres.in' }, color: '#f59e0b' },
    { id: 'response', emoji: '📥', label: { tr: 'JSON Response', en: 'JSON Response' }, color: '#22c55e' },
    { id: 'ghost', emoji: '👻', label: { tr: '404 — Beklenmeyen', en: '404 — Unexpected' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: '`given().when().get("/api/users/2")` yazınca perde arkasında GERÇEKTEN ne oluyor — bu string bir sunucuya nasıl ulaşıyor ve JSON nasıl geri geliyor?', en: 'When you write `given().when().get("/api/users/2")`, what REALLY happens behind the curtain — how does this string reach a server, and how does JSON come back?' },
      positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — baseURI (`spec`\'te tanımlı, örn. `https://reqres.in`) + path (`/api/users/2`) birleştirilerek TAM bir URL oluşturulur.', en: 'Step 1 — the baseURI (defined in `spec`, e.g. `https://reqres.in`) + path (`/api/users/2`) are combined into a FULL URL.' },
      code: { tr: `baseURI = "https://reqres.in"\npath    = "/api/users/2"\n→ "https://reqres.in/api/users/2"`, en: `baseURI = "https://reqres.in"\npath    = "/api/users/2"\n→ "https://reqres.in/api/users/2"` },
      positions: { test: { x: 20, y: 40, scale: 1.0 }, request: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'test', to: 'request', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Adım 2 — gerçek bir HTTP GET isteği ağ üzerinden sunucuya gider — bu an, testin JVM\'in dışına çıkıp gerçek dünyaya dokunduğu tek andır.', en: 'Step 2 — a real HTTP GET request travels over the network to the server — this is the one moment the test steps outside the JVM and touches the real world.' },
      positions: { request: { x: 22, y: 40, scale: 0.95 }, server: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'request', to: 'server', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 3 (kontrast) — sunucu kaydı bulamazsa 404 döner; test bunu `statusCode(200)` ile BEKLİYORDU. `then()` burada testi FAIL eder — bu sessizce geçmez.', en: 'Step 3 (the contrast) — if the server can\'t find the record it returns 404; the test EXPECTED `statusCode(200)`. `then()` FAILS the test right here — it never passes silently.' },
      code: { tr: `.then().statusCode(200)\n// GERÇEK: 404 Not Found → test FAIL`, en: `.then().statusCode(200)\n// ACTUAL: 404 Not Found → test FAILS` },
      positions: { server: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'server', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 4 — kayıt gerçekten varsa sunucu 200 + JSON body döner; response ağ üzerinden test koduna geri gelir ve `then()` her assertion\'ı BU response üzerinde çalıştırır.', en: 'Step 4 — if the record really exists the server returns 200 + a JSON body; the response travels back over the network to the test code, and `then()` runs every assertion against THIS response.' },
      code: { tr: `{ "data": { "id": 2, "email": "janet.weaver@reqres.in" } }`, en: `{ "data": { "id": 2, "email": "janet.weaver@reqres.in" } }` },
      positions: { ghost: { x: 22, y: 40, opacity: 0.3, scale: 0.8 }, response: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'server', to: 'response', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — `.then()` her zaman GERÇEKTEN gelen response\'a bakar, senin varsaydığın bir şeye değil. Java\'daki bir mock testte sahte bir Response nesnesi enjekte edersin; REST Assured\'da gerçek ağ üzerinden gelen GERÇEK bir response\'u doğrularsın — bu, entegrasyon testinin birim testten farkının tam kalbidir.', en: 'The lesson — `.then()` always looks at what ACTUALLY came back, never at what you assumed. In a Java mock test you inject a fake Response object; in REST Assured you verify a REAL response that traveled over a real network — this is the very heart of what makes it an integration test, not a unit test.' },
      positions: { response: { x: 35, y: 50, scale: 1.1 }, test: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raAuthPreemptiveFilm = {
  type: 'video-scene',
  id: 'ra-auth-preemptive-film',
  title: { tr: '🎬 preemptive() Olmadan Basic Auth: Fazladan Bir Round-Trip', en: '🎬 Basic Auth Without preemptive(): One Extra Round-Trip' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'req1', emoji: '📤', label: { tr: 'İstek 1 — auth YOK', en: 'Request 1 — NO auth' }, color: '#94a3b8' },
    { id: 'server401', emoji: '🚫', label: { tr: '401 Unauthorized', en: '401 Unauthorized' }, color: '#ef4444' },
    { id: 'req2', emoji: '📤', label: { tr: 'İstek 2 — auth İLE (retry)', en: 'Request 2 — WITH auth (retry)' }, color: '#f59e0b' },
    { id: 'server200', emoji: '✅', label: { tr: '200 OK', en: '200 OK' }, color: '#22c55e' },
    { id: 'preemptive', emoji: '⚡', label: { tr: 'preemptive() — tek istek', en: 'preemptive() — one request' }, color: '#0ea5e9' },
  ],
  scenes: [
    {
      caption: { tr: '`.auth().basic(user, pass)` yazdın ama isteğin NORMAL (preemptive OLMADAN) çalıştığında sunucuya kaç HTTP isteği gidiyor — 1 mi, 2 mi?', en: 'You wrote `.auth().basic(user, pass)`, but when the request runs NORMALLY (without preemptive), how many HTTP requests actually hit the server — 1 or 2?' },
      positions: { req1: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — normal `.basic()` davranışı HTTP standardına SADIK kalır: önce credential OLMADAN bir istek gönderilir — bu, sunucunun GERÇEKTEN auth isteyip istemediğini "sormak" gibidir.', en: 'Step 1 — normal `.basic()` behavior FOLLOWS the HTTP standard: a request is first sent WITHOUT credentials — like "asking" whether the server actually requires auth.' },
      code: { tr: `.auth().basic("admin", "secret123")\n// 1. istek: Authorization header YOK`, en: `.auth().basic("admin", "secret123")\n// Request 1: NO Authorization header` },
      positions: { req1: { x: 22, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 — sunucu credential\'sız isteği REDDEDER: 401 Unauthorized + `WWW-Authenticate` header\'ı döner — "kimlik doğrulaman gerekiyor" der.', en: 'Step 2 — the server REJECTS the credential-less request: it returns 401 Unauthorized + a `WWW-Authenticate` header — saying "you need to authenticate".' },
      positions: { req1: { x: 20, y: 55, opacity: 0.5, scale: 0.85 }, server401: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'req1', to: 'server401', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 3 — İSTEMCİ bu 401\'i görünce, ŞİMDİ credential\'ları ekleyip AYNI isteği TEKRAR gönderir — bu 2. bir round-trip demektir, testin toplam süresine GİZLİ bir gecikme ekler.', en: 'Step 3 — upon seeing that 401, the CLIENT NOW adds credentials and sends the SAME request AGAIN — this is a 2nd round-trip, adding a HIDDEN delay to the test\'s total duration.' },
      code: { tr: `// 2. istek: Authorization: Basic YWRtaW46c2VjcmV0MTIz`, en: `// Request 2: Authorization: Basic YWRtaW46c2VjcmV0MTIz` },
      positions: { server401: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, req2: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'server401', to: 'req2', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 4 (kontrast/çözüm) — `.auth().preemptive().basic(...)` yazarsan, credential DAHA İLK istekte gönderilir — 401+retry döngüsü hiç OLMAZ, tek bir round-trip yeterlidir. Yüzlerce testin toplamında bu fark saniyeler kazandırır.', en: 'Step 4 (the contrast/fix) — with `.auth().preemptive().basic(...)`, credentials are sent on the VERY FIRST request — the 401+retry cycle NEVER happens, a single round-trip is enough. Across hundreds of tests, this difference saves real seconds.' },
      code: { tr: `.auth().preemptive().basic("admin", "secret123")\n// TEK istek, credential BAŞTAN ekli`, en: `.auth().preemptive().basic("admin", "secret123")\n// ONE request, credentials included from the start` },
      positions: { req2: { x: 20, y: 40, opacity: 0.4, scale: 0.85 }, preemptive: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'req2', to: 'preemptive', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Ders — HTTP standardı 401-sonra-retry akışını ÖNGÖRÜR (bu bir bug değil), ama otomatik test suite\'lerinde her testin performansı toplanır — preemptive auth, "standarda sadık ama testte gereksiz" bir maliyeti bilinçli olarak atlama kararıdır.', en: 'The lesson — the HTTP standard PRESCRIBES the 401-then-retry flow (it\'s not a bug), but in automated test suites every test\'s performance adds up — preemptive auth is a deliberate decision to skip a cost that\'s "standard-compliant but unnecessary in tests".' },
      positions: { preemptive: { x: 40, y: 50, scale: 1.1 }, server200: { x: 68, y: 50, scale: 1.0, opacity: 0.7 } },
    },
  ],
}

const raPojoDeserializeFilm = {
  type: 'video-scene',
  id: 'ra-pojo-deserialize-film',
  title: { tr: '🎬 JSON\'dan POJO\'ya: Jackson\'ın Sihri', en: '🎬 JSON to POJO: Jackson\'s Trick' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'json', emoji: '📄', label: { tr: 'JSON Response (metin)', en: 'JSON Response (text)' }, color: '#0ea5e9' },
    { id: 'jackson', emoji: '⚙️', label: { tr: 'Jackson (ObjectMapper)', en: 'Jackson (ObjectMapper)' }, color: '#f59e0b' },
    { id: 'pojo', emoji: '☕', label: { tr: 'User.java (POJO)', en: 'User.java (POJO)' }, color: '#22c55e' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Alan adı UYUŞMUYOR', en: 'Field name MISMATCH' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Response bir düz metin JSON string\'i — ama testte `user.getEmail()` yazabiliyorsun. Bu metin nasıl gerçek bir Java nesnesine dönüşüyor?', en: 'The response is just a plain JSON string — yet in the test you can write `user.getEmail()`. How does that text turn into a real Java object?' },
      positions: { json: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — `.as(User.class)` çağrıldığında REST Assured, Jackson kütüphanesine "bu JSON\'ı bu sınıfa dönüştür" der.', en: 'Step 1 — when `.as(User.class)` is called, REST Assured tells the Jackson library "convert this JSON into this class".' },
      code: { tr: `User user = given().spec(spec)\n    .when().get("/api/users/2")\n    .then().extract().as(User.class);`, en: `User user = given().spec(spec)\n    .when().get("/api/users/2")\n    .then().extract().as(User.class);` },
      positions: { json: { x: 20, y: 40, scale: 1.0 }, jackson: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'json', to: 'jackson', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 2 — Jackson, JSON\'daki HER alan adını (`"email"`, `"first_name"`) User sınıfındaki getter/setter\'ların isimleriyle EŞLEŞTİRİR — `"email"` alanı `setEmail(String)` metoduna gider.', en: 'Step 2 — Jackson MATCHES every field name in the JSON (`"email"`, `"first_name"`) against the getter/setter names in the User class — the `"email"` field goes to the `setEmail(String)` method.' },
      code: { tr: `public class User {\n    private String email;\n    public void setEmail(String e) { this.email = e; }\n}`, en: `public class User {\n    private String email;\n    public void setEmail(String e) { this.email = e; }\n}` },
      positions: { jackson: { x: 22, y: 40, scale: 0.95 }, pojo: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'jackson', to: 'pojo', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 3 (kontrast) — JSON\'da `"first_name"` var ama POJO\'da `firstName` (camelCase, alt çizgi yok) yazılmışsa, Jackson bu alanı EŞLEŞTİREMEZ ve sessizce `null` bırakır — test hiçbir hata FIRLATMAZ, ama veri eksiktir.', en: 'Step 3 (the contrast) — if the JSON has `"first_name"` but the POJO was written as `firstName` (camelCase, no underscore), Jackson CANNOT match that field and silently leaves it `null` — the test throws NO error, but the data is missing.' },
      code: { tr: `// JSON: "first_name": "Janet"\n// POJO: private String firstName; // EŞLEŞMEZ!\nuser.getFirstName() // → null, sessizce`, en: `// JSON: "first_name": "Janet"\n// POJO: private String firstName; // NO MATCH!\nuser.getFirstName() // → null, silently` },
      positions: { pojo: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'pojo', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Ders — çözüm `@JsonProperty("first_name")` annotasyonuyla eşlemeyi elle belirtmektir. Java\'daki bir ORM\'in (`@Column(name="first_name")`) veritabanı sütununu Java alanına eşlemesiyle BİREBİR aynı mantık — sadece kaynak veritabanı değil, JSON.', en: 'The lesson — the fix is explicitly declaring the mapping with `@JsonProperty("first_name")`. This is the EXACT same logic as a Java ORM (`@Column(name="first_name")`) mapping a database column to a Java field — just the source is JSON instead of a database.' },
      positions: { ghost: { x: 35, y: 50, scale: 1.1 }, json: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raHamcrestMatcherFilm = {
  type: 'video-scene',
  id: 'ra-hamcrest-matcher-film',
  title: { tr: '🎬 Hamcrest Matcher\'ları: assertEquals\'tan Okunabilir Cümleye', en: '🎬 Hamcrest Matchers: From assertEquals to a Readable Sentence' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'response', emoji: '📥', label: { tr: 'Response Body', en: 'Response Body' }, color: '#0ea5e9' },
    { id: 'matcher', emoji: '🔍', label: { tr: 'Hamcrest Matcher', en: 'Hamcrest Matcher' }, color: '#f59e0b' },
    { id: 'pass', emoji: '✅', label: { tr: 'PASS', en: 'PASS' }, color: '#22c55e' },
    { id: 'fail', emoji: '👻', label: { tr: 'FAIL — açıklayıcı mesaj', en: 'FAIL — descriptive message' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: '`assertEquals(3, list.size())` FAIL olduğunda "expected 3 but was 5" der — ama Hamcrest\'in `hasSize(3)` gibi matcher\'ları neden tercih edilir?', en: 'When `assertEquals(3, list.size())` fails it says "expected 3 but was 5" — so why are Hamcrest matchers like `hasSize(3)` preferred?' },
      positions: { response: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — `.body("data", hasSize(6))` yazıldığında, matcher response\'un "data" alanındaki liste boyutunu KONTROL EDER — cümle neredeyse İngilizce gibi okunur: "body\'nin data\'sı 6 boyutunda olsun".', en: 'Step 1 — writing `.body("data", hasSize(6))`, the matcher CHECKS the size of the list at the response\'s "data" field — the sentence reads almost like English: "let body\'s data have size 6".' },
      code: { tr: `.then()\n    .body("data", hasSize(6));`, en: `.then()\n    .body("data", hasSize(6));` },
      positions: { response: { x: 20, y: 40, scale: 1.0 }, matcher: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'response', to: 'matcher', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 2 — matcher\'lar ZİNCİRLENEBİLİR: `allOf(greaterThan(0), lessThan(100))` demek "0\'dan büyük VE 100\'den küçük" demektir — tek bir sayısal karşılaştırmayı ayrı ayrı iki assert yazmadan ifade edersin.', en: 'Step 2 — matchers can be CHAINED: `allOf(greaterThan(0), lessThan(100))` means "greater than 0 AND less than 100" — expressing a single numeric range without writing two separate asserts.' },
      code: { tr: `.body("data.id", allOf(greaterThan(0), lessThan(100)))`, en: `.body("data.id", allOf(greaterThan(0), lessThan(100)))` },
      positions: { matcher: { x: 22, y: 40, scale: 0.95 }, pass: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'matcher', to: 'pass', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 3 (kontrast) — matcher FAIL olursa Hamcrest\'in hata mesajı ÖZELLİKLE okunabilir kurgulanmıştır: "Expected: a collection with size <6> but: collection size was <5>" — bu, kaç elemanın eksik olduğunu ANINDA gösterir.', en: 'Step 3 (the contrast) — when a matcher FAILS, Hamcrest\'s error message is DELIBERATELY built to be readable: "Expected: a collection with size <6> but: collection size was <5>" — this shows INSTANTLY how many elements are missing.' },
      code: { tr: `java.lang.AssertionError:\nExpected: a collection with size <6>\n     but: collection size was <5>`, en: `java.lang.AssertionError:\nExpected: a collection with size <6>\n     but: collection size was <5>` },
      positions: { pass: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, fail: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'pass', to: 'fail', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Ders — düz `assertEquals` ile aynı hatayı yakalasan bile mesaj genelde "expected true but was false" gibi anlamsız kalır çünkü koşulun NE olduğunu kodun kendisine bakmadan bilemezsin. Hamcrest matcher\'ları, koşulun kendisini OKUNABİLİR bir sözcüğe (hasSize, greaterThan, containsString) dönüştürerek hata mesajını da otomatik olarak anlamlı kılar.', en: 'The lesson — even if plain `assertEquals` catches the same failure, the message often stays meaningless like "expected true but was false" because you can\'t tell WHAT the condition was without looking at the code. Hamcrest matchers turn the condition itself into a READABLE word (hasSize, greaterThan, containsString), automatically making the failure message meaningful too.' },
      positions: { fail: { x: 35, y: 50, scale: 1.1 }, response: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raJsonPathExtractFilm = {
  type: 'video-scene',
  id: 'ra-jsonpath-extract-film',
  title: { tr: '🎬 JSON Path: Sıraya Değil, Alan Adına Göre Gitmek', en: '🎬 JSON Path: Navigating by Field Name, Not Position' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'response', emoji: '📥', label: { tr: 'Nested JSON', en: 'Nested JSON' }, color: '#0ea5e9' },
    { id: 'split', emoji: '👻', label: { tr: 'String.split(",")[3]', en: 'String.split(",")[3]' }, color: '#ef4444' },
    { id: 'jsonpath', emoji: '🗺️', label: { tr: 'jsonPath().getString(...)', en: 'jsonPath().getString(...)' }, color: '#22c55e' },
    { id: 'token', emoji: '🔑', label: { tr: 'Bir Sonraki Teste Aktarılan Token', en: 'Token Passed to Next Test' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: { tr: 'Bir login response\'undan `token` alanını çekip bir sonraki isteğin header\'ına koyman gerekiyor — bunu string manipülasyonuyla mı, JSON Path ile mi yaparsın?', en: 'You need to pull the `token` field from a login response and put it in the next request\'s header — do you do it with string manipulation or JSON Path?' },
      positions: { response: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 (kontrast/tuzak) — bazı ekipler response body\'yi `.asString()` ile düz metin alıp `split(",")[3]` gibi POZİSYONA göre değer çeker — bu, alan SIRASI değişirse SESSİZCE yanlış değeri döner.', en: 'Step 1 (the contrast/trap) — some teams grab the response body as plain text with `.asString()` and extract a value by POSITION like `split(",")[3]` — this SILENTLY returns the wrong value if field order changes.' },
      code: { tr: `String body = response.asString();\nString token = body.split(",")[3]; // KIRILGAN`, en: `String body = response.asString();\nString token = body.split(",")[3]; // FRAGILE` },
      positions: { response: { x: 20, y: 40, scale: 1.0 }, split: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'response', to: 'split', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 2 — API bir gün response\'a YENİ bir alan eklerse (örn. `"requestId"` başa eklenir), `split(",")[3]` artık FARKLI bir değeri döner — test hâlâ PASS olur ama YANLIŞ token\'ı taşır.', en: 'Step 2 — if the API one day adds a NEW field to the response (e.g. `"requestId"` prepended), `split(",")[3]` now returns a DIFFERENT value — the test still PASSes but carries the WRONG token.' },
      positions: { split: { x: 22, y: 40, opacity: 0.5, scale: 0.85 }, jsonpath: { x: 58, y: 55, scale: 0.9, opacity: 0.4 } },
    },
    {
      caption: { tr: 'Adım 3 (çözüm) — `response.jsonPath().getString("token")` ALAN ADINA göre gider — JSON içinde başka kaç alan eklenirse eklensin, `"token"` adlı alanı DOĞRU şekilde bulur.', en: 'Step 3 (the fix) — `response.jsonPath().getString("token")` navigates by FIELD NAME — no matter how many other fields get added to the JSON, it CORRECTLY finds the field named `"token"`.' },
      code: { tr: `String token = response.jsonPath().getString("token");\n// Alan sırası değişse de DOĞRU sonuç`, en: `String token = response.jsonPath().getString("token");\n// Correct result even if field order changes` },
      positions: { split: { x: 20, y: 55, opacity: 0.3, scale: 0.8 }, jsonpath: { x: 55, y: 45, scale: 1.25, pulse: true } },
      beams: [{ from: 'split', to: 'jsonpath', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 4 — bu token artık bir sonraki testin `given().header("Authorization", "Bearer " + token)` satırına DOĞRUDAN aktarılabilir — zincirli senaryo (login→işlem→doğrulama) bu şekilde kurulur.', en: 'Step 4 — this token can now be DIRECTLY passed into the next test\'s `given().header("Authorization", "Bearer " + token)` line — this is how a chained scenario (login→action→verify) gets built.' },
      positions: { jsonpath: { x: 22, y: 40, scale: 0.95 }, token: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'jsonpath', to: 'token', color: '#8b5cf6' }],
    },
    {
      caption: { tr: 'Ders — Java\'da elle `JSONObject.getJSONObject("data").getJSONArray("users").getJSONObject(0).getString("email")` zincirlemek yerine, JSON Path bunu TEK bir `"data.users[0].email"` string\'ine indirger — okunabilirlik ve sağlamlık aynı anda kazanılır.', en: 'The lesson — instead of manually chaining `JSONObject.getJSONObject("data").getJSONArray("users").getJSONObject(0).getString("email")` in Java, JSON Path reduces that to a SINGLE `"data.users[0].email"` string — you gain readability and robustness at the same time.' },
      positions: { token: { x: 35, y: 50, scale: 1.1 }, response: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raTestChainFilm = {
  type: 'video-scene',
  id: 'ra-test-chain-film',
  title: { tr: '🎬 Test Zinciri: Bir Testin Çıktısı, Diğerinin Girdisi', en: '🎬 Test Chaining: One Test\'s Output, Another\'s Input' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'create', emoji: '1️⃣', label: { tr: 'POST /users (oluştur)', en: 'POST /users (create)' }, color: '#0ea5e9' },
    { id: 'id', emoji: '🆔', label: { tr: 'Yeni ID (response\'tan)', en: 'New ID (from response)' }, color: '#f59e0b' },
    { id: 'get', emoji: '2️⃣', label: { tr: 'GET /users/{id} (doğrula)', en: 'GET /users/{id} (verify)' }, color: '#8b5cf6' },
    { id: 'delete', emoji: '3️⃣', label: { tr: 'DELETE /users/{id} (temizle)', en: 'DELETE /users/{id} (cleanup)' }, color: '#22c55e' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Hardcoded ID — kırık test', en: 'Hardcoded ID — broken test' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Gerçek bir E2E senaryo: kullanıcı OLUŞTUR, sonra o kullanıcıyı GETİR, sonra SİL. Bu üç isteği birbirine nasıl bağlarsın — ID\'yi nereden alırsın?', en: 'A real E2E scenario: CREATE a user, then FETCH that user, then DELETE it. How do you chain these three requests — where does the ID come from?' },
      positions: { create: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — POST /users isteği gönderilir, sunucu YENİ bir kullanıcı oluşturur ve response body\'sinde bu kullanıcının kendine özgü `id`\'sini döner — bu ID daha önceden BİLİNEMEZ.', en: 'Step 1 — a POST /users request is sent, the server creates a NEW user and returns that user\'s unique `id` in the response body — this ID could NOT have been known beforehand.' },
      code: { tr: `int newId = given().spec(spec).body(newUser)\n    .when().post("/api/users")\n    .then().extract().path("id");`, en: `int newId = given().spec(spec).body(newUser)\n    .when().post("/api/users")\n    .then().extract().path("id");` },
      positions: { create: { x: 20, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 2 (kontrast/tuzak) — bir ekip bu ID\'yi TAHMİN ederek hardcode edebilir (`int id = 15;`) — ama sunucu her test koşumunda FARKLI bir ID üretebilir, bu test rastgele KIRILIR.', en: 'Step 2 (the contrast/trap) — a team might GUESS this ID and hardcode it (`int id = 15;`) — but the server can produce a DIFFERENT ID on every test run, so this test BREAKS randomly.' },
      code: { tr: `int id = 15; // TAHMİN — yarın 16, 23 olabilir\nget("/api/users/" + id) // rastgele FAIL`, en: `int id = 15; // GUESS — could be 16, 23 tomorrow\nget("/api/users/" + id) // fails randomly` },
      positions: { create: { x: 20, y: 55, opacity: 0.5, scale: 0.85 }, ghost: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'create', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 3 (doğru yol) — `newId` değişkeni Adım 1\'in GERÇEK response\'undan geldi, bu yüzden GET isteği HER ZAMAN doğru kullanıcıyı bulur — ID asla tahmin edilmez, her zaman ÖNCEKİ adımdan alınır.', en: 'Step 3 (the right way) — the `newId` variable came from Step 1\'s REAL response, so the GET request ALWAYS finds the right user — the ID is never guessed, always taken from the PREVIOUS step.' },
      code: { tr: `given().spec(spec)\n    .when().get("/api/users/" + newId)\n    .then().statusCode(200);`, en: `given().spec(spec)\n    .when().get("/api/users/" + newId)\n    .then().statusCode(200);` },
      positions: { ghost: { x: 20, y: 40, opacity: 0.3, scale: 0.8 }, id: { x: 45, y: 55, scale: 1.1 }, get: { x: 68, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'id', to: 'get', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Adım 4 — zincirin son adımı DELETE\'tir: aynı `newId` ile kayıt silinir, böylece bu test kendi ARDINDAN temizlik yapar ve bir sonraki test koşumunu KİRLETMEZ.', en: 'Step 4 — the chain\'s last step is DELETE: the record is removed with the same `newId`, so this test CLEANS UP AFTER ITSELF and does NOT pollute the next test run.' },
      positions: { get: { x: 22, y: 40, scale: 0.95 }, delete: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'get', to: 'delete', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — Java\'da bir test suite\'inde `@BeforeAll`/`@AfterAll` ile setup/teardown yapmanın API testindeki karşılığı budur: her adımın GERÇEK çıktısı bir sonrakinin girdisi olur, hiçbir değer varsayılmaz veya hardcode edilmez.', en: 'The lesson — this is the API-testing equivalent of setup/teardown with `@BeforeAll`/`@AfterAll` in a Java test suite: each step\'s REAL output becomes the next step\'s input, no value is ever assumed or hardcoded.' },
      positions: { delete: { x: 35, y: 50, scale: 1.1 }, create: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raFlakyTimeoutFilm = {
  type: 'video-scene',
  id: 'ra-flaky-timeout-film',
  title: { tr: '🎬 Flaky API Testi: Rate-Limit mi, Gerçek Bug mu?', en: '🎬 A Flaky API Test: Rate-Limit or a Real Bug?' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test', emoji: '🧪', label: { tr: 'CI\'da Test Suite', en: 'Test Suite in CI' }, color: '#8b5cf6' },
    { id: 'burst', emoji: '💥', label: { tr: '50 istek/saniye (paralel)', en: '50 requests/sec (parallel)' }, color: '#f59e0b' },
    { id: 'ratelimit', emoji: '🚦', label: { tr: '429 Too Many Requests', en: '429 Too Many Requests' }, color: '#ef4444' },
    { id: 'diagnosis', emoji: '🔍', label: { tr: 'Log İncelemesi', en: 'Log Inspection' }, color: '#0ea5e9' },
    { id: 'fixed', emoji: '✅', label: { tr: 'Retry + Backoff', en: 'Retry + Backoff' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'CI\'da bir API test suite bazen PASS, bazen belirli testlerde 429 hatasıyla FAIL oluyor — bu gerçek bir bug mu, yoksa test suite\'inin kendisi mi sorun yaratıyor?', en: 'An API test suite in CI sometimes PASSes, sometimes FAILs on certain tests with a 429 error — is this a real bug, or is the test suite itself causing the problem?' },
      positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — test suite paralel çalışacak şekilde ayarlanmış (`@Execution(CONCURRENT)`); 50 test AYNI ANDA aynı API\'ye istek atıyor.', en: 'Step 1 — the test suite is configured to run in parallel (`@Execution(CONCURRENT)`); 50 tests fire requests at the SAME API SIMULTANEOUSLY.' },
      code: { tr: `@Execution(CONCURRENT) // JUnit5 paralel çalıştırma`, en: `@Execution(CONCURRENT) // JUnit5 parallel execution` },
      positions: { test: { x: 20, y: 40, scale: 1.0 }, burst: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'test', to: 'burst', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 2 — API sağlayıcısının rate-limit koruması devreye girer: dakikada belirli bir istek sayısını aşan client\'lara 429 Too Many Requests döner — bu bir GÜVENLİK önlemidir, bug değil.', en: 'Step 2 — the API provider\'s rate-limit protection kicks in: clients exceeding a certain requests-per-minute threshold get 429 Too Many Requests — this is a SAFETY measure, not a bug.' },
      positions: { burst: { x: 22, y: 40, scale: 0.95 }, ratelimit: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'burst', to: 'ratelimit', color: '#ef4444' }],
    },
    {
      caption: { tr: 'Adım 3 (teşhis) — log\'da hangi testlerin fail olduğuna bakılır: FAIL eden testler HER ZAMAN farklı, ve fail mesajı hep "429" — bu, testin KENDİ mantığında değil, İSTEK HACMİNDE bir sorun olduğunu gösterir.', en: 'Step 3 (the diagnosis) — checking the logs for which tests fail: the failing tests are ALWAYS different, and the failure message is always "429" — this signals the issue is in REQUEST VOLUME, not the test\'s own logic.' },
      code: { tr: `// Log: 429 Too Many Requests (farklı testte her seferinde)`, en: `// Log: 429 Too Many Requests (a different test each time)` },
      positions: { ratelimit: { x: 22, y: 40, scale: 0.9 }, diagnosis: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'ratelimit', to: 'diagnosis', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Adım 4 (çözüm) — iki yol: (1) paralellik derecesini düşürmek, (2) 429 aldığında exponential backoff ile otomatik retry eklemek (`RestAssuredConfig` içinde bir `Filter` ile). İkincisi hem CI hızını korur hem rate-limit\'e SAYGI gösterir.', en: 'Step 4 (the fix) — two paths: (1) lower the parallelism degree, (2) add automatic retry with exponential backoff on a 429 (via a `Filter` in `RestAssuredConfig`). The second option keeps CI speed AND respects the rate limit.' },
      positions: { diagnosis: { x: 22, y: 40, scale: 0.95 }, fixed: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'diagnosis', to: 'fixed', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — "flaky" etiketi bazen testin kendi hatası değil, test suite\'inin GERÇEK dünyaya (rate-limit, network) nasıl davrandığının bir yansımasıdır. Kök nedeni bulmadan retry eklemek belirtiyi gizler, sorunu çözmez.', en: 'The lesson — "flaky" sometimes isn\'t the test\'s own fault, it\'s a reflection of how the suite behaves toward the REAL world (rate limits, networks). Adding a retry without finding the root cause hides the symptom, it doesn\'t fix the problem.' },
      positions: { fixed: { x: 35, y: 50, scale: 1.1 }, test: { x: 65, y: 50, scale: 0.9, opacity: 0.5 } },
    },
  ],
}

const raToolComparisonFilm = {
  type: 'video-scene',
  id: 'ra-tool-comparison-film',
  title: { tr: '🎬 REST Assured vs Postman: Kod mu, GUI mi?', en: '🎬 REST Assured vs Postman: Code or GUI?' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'goal', emoji: '🎯', label: { tr: 'Aynı Test: login → dashboard doğrula', en: 'Same Test: login → verify dashboard' }, color: '#8b5cf6' },
    { id: 'postman', emoji: '📮', label: { tr: 'Postman — GUI + JS script', en: 'Postman — GUI + JS script' }, color: '#f59e0b' },
    { id: 'restassured', emoji: '☕', label: { tr: 'REST Assured — Java kodu', en: 'REST Assured — Java code' }, color: '#0ea5e9' },
    { id: 'cicd', emoji: '⚙️', label: { tr: 'CI/CD Pipeline (mvn test)', en: 'CI/CD Pipeline (mvn test)' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: { tr: 'Aynı testi Postman\'da GUI ile, REST Assured\'da Java koduyla yazsan — ikisi de "çalışır", peki NEREDE gerçekten farklılaşırlar?', en: 'Write the same test in Postman\'s GUI vs REST Assured\'s Java code — both "work", so WHERE do they actually diverge?' },
      positions: { goal: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Adım 1 — Postman\'da: isteği GUI\'de tıklayarak kurarsın, "Tests" sekmesine JavaScript yazarsın — hızlı prototipleme için harikadır, tıklarken görsel geri bildirim alırsın.', en: 'Step 1 — in Postman: you build the request by clicking through the GUI, write JavaScript in the "Tests" tab — great for fast prototyping, you get visual feedback as you click.' },
      positions: { goal: { x: 20, y: 40, scale: 1.0 }, postman: { x: 55, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'goal', to: 'postman', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Adım 2 — REST Assured\'da: aynı test bir `.java` dosyasıdır — Git\'te version-control edilir, code review\'dan geçer, IDE\'nin refactor/rename araçları çalışır.', en: 'Step 2 — in REST Assured: the same test is a `.java` file — it\'s version-controlled in Git, goes through code review, and the IDE\'s refactor/rename tools work on it.' },
      positions: { postman: { x: 22, y: 40, opacity: 0.6, scale: 0.9 }, restassured: { x: 58, y: 55, scale: 1.2, pulse: true } },
      beams: [{ from: 'goal', to: 'restassured', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Adım 3 (kontrast) — Postman\'i CI\'da çalıştırmak için AYRI bir araç (Newman) + collection export/import adımı gerekir; REST Assured testleri zaten `mvn test`\'in İÇİNDEDİR — proje derleme adımının doğal bir parçası.', en: 'Step 3 (the contrast) — running Postman in CI needs a SEPARATE tool (Newman) + collection export/import step; REST Assured tests are already INSIDE `mvn test` — a natural part of the project\'s build step.' },
      code: { tr: `# Postman: ekstra adım\nnewman run collection.json\n\n# REST Assured: zaten build'in parçası\nmvn test`, en: `# Postman: extra step\nnewman run collection.json\n\n# REST Assured: already part of the build\nmvn test` },
      positions: { restassured: { x: 22, y: 40, scale: 0.95 }, cicd: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'restassured', to: 'cicd', color: '#22c55e' }],
    },
    {
      caption: { tr: 'Ders — doğru araç seçimi ekip yapısına bağlıdır: manuel/keşif odaklı QA için Postman daha hızlı başlar; Java/Selenium ekosistemine ZATEN gömülü bir otomasyon suite\'i için REST Assured daha az sürtünmeyle entegre olur. Gerçekçi ekipler genelde İKİSİNİ birden kullanır — keşif Postman\'de, regresyon REST Assured\'da.', en: 'The lesson — the right tool choice depends on team structure: for manual/exploratory QA, Postman gets started faster; for an automation suite ALREADY embedded in a Java/Selenium ecosystem, REST Assured integrates with less friction. Realistic teams often use BOTH — exploration in Postman, regression in REST Assured.' },
      positions: { cicd: { x: 35, y: 50, scale: 1.1 }, postman: { x: 60, y: 40, scale: 0.85, opacity: 0.6 }, restassured: { x: 75, y: 60, scale: 0.85, opacity: 0.6 } },
    },
  ],
}

const raInterviewSpecPatternFilm = {
  type: 'video-scene',
  id: 'ra-interview-spec-pattern-film',
  title: { tr: '🎬 Mülakatta "RequestSpecification Nedir?" Sorusuna Katmanlı Cevap', en: '🎬 A Layered Answer to "What Is RequestSpecification?" in an Interview' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'definition', emoji: '📖', label: { tr: 'Katman 1: Tanım', en: 'Layer 1: Definition' }, color: '#94a3b8' },
    { id: 'mechanism', emoji: '⚙️', label: { tr: 'Katman 2: Mekanizma', en: 'Layer 2: Mechanism' }, color: '#0ea5e9' },
    { id: 'experience', emoji: '💼', label: { tr: 'Katman 3: Deneyim', en: 'Layer 3: Experience' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: '"Sadece tanımı ezberlemiş" izlenimi', en: '"Just memorized the definition" impression' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: { tr: 'Mülakatçı sorar: "RequestSpecification nedir, neden kullanılır?" — bu soruyu tek cümlelik bir tanımla mı, yoksa katmanlı bir cevapla mı geçersin?', en: 'The interviewer asks: "What is RequestSpecification, why is it used?" — do you pass this with a one-sentence definition, or a layered answer?' },
      positions: { definition: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Katman 1 (TANIM) — "RequestSpecification, baseURI, header, auth gibi tekrar eden istek ayarlarını TEK bir yerde toplayan bir nesnedir." Doğru ama yüzeysel.', en: 'Layer 1 (DEFINITION) — "RequestSpecification is an object that collects repeated request settings like baseURI, headers, auth in ONE place." Correct but shallow.' },
      code: { tr: `RequestSpecification spec = new RequestSpecBuilder()\n    .setBaseUri("https://reqres.in").build();`, en: `RequestSpecification spec = new RequestSpecBuilder()\n    .setBaseUri("https://reqres.in").build();` },
      positions: { definition: { x: 22, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: { tr: 'Katman 2 (MEKANİZMA) — "her `given().spec(spec)` çağrısında bu ayarlar İSTEĞE otomatik olarak enjekte edilir — 50 test dosyasında `baseURI`\'yi 50 kez tekrar YAZMAZSIN."', en: 'Layer 2 (MECHANISM) — "on every `given().spec(spec)` call these settings get automatically injected INTO the request — you don\'t REPEAT `baseURI` 50 times across 50 test files."' },
      positions: { definition: { x: 20, y: 55, opacity: 0.5, scale: 0.85 }, mechanism: { x: 55, y: 45, scale: 1.2, pulse: true } },
      beams: [{ from: 'definition', to: 'mechanism', color: '#0ea5e9' }],
    },
    {
      caption: { tr: 'Katman 3 (DENEYİM) — "bir projede staging/prod URL\'lerini environment variable\'dan okuyan TEK bir `spec` nesnesi kurdum — CI\'da hangi ortama karşı koştuğumuzu tek bir yerden değiştirebiliyorduk."', en: 'Layer 3 (EXPERIENCE) — "in one project I built a SINGLE `spec` object that read staging/prod URLs from an environment variable — in CI we could switch which environment we ran against from one place."' },
      positions: { mechanism: { x: 20, y: 40, opacity: 0.5, scale: 0.85 }, experience: { x: 55, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'mechanism', to: 'experience', color: '#f59e0b' }],
    },
    {
      caption: { tr: 'Final (kontrast) — sadece Katman 1\'de kalan bir aday, mülakatçıya "bunu Google\'dan okumuş ama hiç kullanmamış" izlenimi bırakır. 3 katmanı da kapsayan bir cevap ise gerçek üretim deneyimini KANITLAR.', en: 'The final contrast — a candidate who stops at Layer 1 leaves the interviewer with the impression "they read this on Google but never used it". An answer covering all 3 layers PROVES real production experience.' },
      positions: { experience: { x: 22, y: 40, scale: 0.9 }, ghost: { x: 58, y: 55, scale: 1.25, pulse: true } },
      beams: [{ from: 'experience', to: 'ghost', color: '#ef4444' }],
    },
  ],
}

const raInterviewStep = {
  type: 'step-animation',
  title: { tr: 'REST Assured Mülakat Cevabı — 3 Katman', en: 'REST Assured Interview Answer — 3 Layers' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Katman 1…', en: 'Layer 1…' }, detail: { tr: 'Katman 1: Kavramı tek cümlede tanımla.', en: 'Layer 1: Define the concept in one sentence.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Katman 2…', en: 'Layer 2…' }, detail: { tr: 'Katman 2: NASIL çalıştığını (mekanizmayı) göster.', en: 'Layer 2: Show HOW it works (the mechanism).' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Katman 3…', en: 'Layer 3…' }, detail: { tr: 'Katman 3: Kendi projenden somut bir örnekle DENEYİM göster.', en: 'Layer 3: Show EXPERIENCE with a concrete example from your own project.' } },
  ],
}

const raInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'rest-assured-interview',
  id: 'rest-assured-interview',
  title: { tr: 'Kendin Dene: Tekrar Eden İstek Ayarlarını RequestSpecification\'a Taşı', en: 'Try It Yourself: Move Repeated Request Settings into RequestSpecification' },
  starterCode: `// Her testte tekrar eden ayarlar:
given().baseUri("https://reqres.in").header("Content-Type", "application/json")
    .when().get("/api/users/2");
given().baseUri("https://reqres.in").header("Content-Type", "application/json")
    .when().get("/api/users/3");`,
  solutionCode: `RequestSpecification spec = new RequestSpecBuilder()
    .setBaseUri("https://reqres.in")
    .addHeader("Content-Type", "application/json")
    .build();

given().spec(spec).when().get("/api/users/2");
given().spec(spec).when().get("/api/users/3");`,
  hint: { tr: '`RequestSpecBuilder` ile tekrar eden `baseUri`/`header` ayarlarını TEK bir `spec` nesnesinde topla, sonra her testte `.spec(spec)` ile kullan.', en: 'Use `RequestSpecBuilder` to collect repeated `baseUri`/`header` settings into ONE `spec` object, then use `.spec(spec)` in every test.' },
  successMessage: { tr: 'Doğru! Artık baseUri değişirse tek bir yerden güncellersin, 50 test dosyasını tek tek düzenlemezsin.', en: 'Correct! Now if baseUri changes you update one place, not 50 test files one by one.' },
}

const raWhyStep = {
  type: 'step-animation',
  title: { tr: 'Neden Bir API Test Kütüphanesine İhtiyaç Var?', en: 'Why Do You Need an API Testing Library at All?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Düz HttpClient ile…', en: 'With plain HttpClient…' }, detail: { tr: 'Düz `HttpClient` ile: istek hazırlamak, göndermek, JSON\'ı parse etmek ve assertion yazmak İÇİN 4 AYRI adım, her biri elle kodlanır.', en: 'With plain `HttpClient`: preparing the request, sending it, parsing the JSON, and writing assertions are 4 SEPARATE steps, each hand-coded.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'REST Assured ile…', en: 'With REST Assured…' }, detail: { tr: 'REST Assured ile: given/when/then TEK bir akıcı zincirde bu 4 adımı BİRLEŞTİRİR — okuyan biri hangi kısmın istek, hangi kısmın doğrulama olduğunu cümleden anlar.', en: 'With REST Assured: given/when/then MERGES these 4 steps into ONE fluent chain — a reader understands which part is the request and which is verification just from the sentence.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Sonuç: aynı test %60\'a varan daha AZ…', en: 'Result…' }, detail: { tr: 'Sonuç: aynı test %60\'a varan daha AZ kod ile yazılır ve okunabilirlik doğrudan bakım maliyetini düşürür.', en: 'Result: the same test is written with up to 60% LESS code, and readability directly lowers maintenance cost.' } },
  ],
}

const raWhyPractice = {
  type: 'java-practice',
  relatedTopicId: 'rest-assured-why',
  title: { tr: 'Kendin Dene: given/when/then Zincirini Tamamla', en: 'Try It Yourself: Complete the given/when/then Chain' },
  starterCode: `// TODO: eksik zinciri tamamla — GET /api/users/2, status 200 bekleniyor
given()
    .when().get("/api/users/2")
    // .then() eksik!`,
  solutionCode: `given()
    .when().get("/api/users/2")
    .then().statusCode(200);`,
  hint: { tr: 'Üç bölüm ZORUNLU sırayla gelir: given() (hazırlık) → when() (eylem) → then() (doğrulama). Doğrulama olmadan bir test hiçbir şey KANITLAMAZ.', en: 'The three parts come in a MANDATORY order: given() (setup) → when() (action) → then() (verification). Without verification, a test PROVES nothing.' },
  successMessage: { tr: 'Doğru! .then() olmadan istek gönderilir ama HİÇBİR ŞEY doğrulanmaz — bu, "test" olmayan bir test\'tir.', en: 'Correct! Without .then() the request is sent but NOTHING is verified — that\'s a "test" that isn\'t actually a test.' },
}

const raToolChoiceStep = {
  type: 'step-animation',
  title: { tr: 'Doğru API Test Aracını Seçme Kriterleri', en: 'Criteria for Choosing the Right API Testing Tool' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Ekip Java/Selenium ekosisteminde mi…', en: 'Does the team already work in a…' }, detail: { tr: 'Ekip Java/Selenium ekosisteminde mi çalışıyor? Evet ise → REST Assured, aynı build/CI zincirine sürtünmesiz girer.', en: 'Does the team already work in a Java/Selenium ecosystem? If yes → REST Assured integrates into the same build/CI chain with no friction.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Keşif odaklı…', en: 'Is fast…' }, detail: { tr: 'Keşif odaklı, hızlı manuel test mi gerekiyor? Evet ise → Postman/Bruno, GUI ile anında deneme sağlar.', en: 'Is fast, exploratory manual testing needed? If yes → Postman/Bruno gives instant experimentation via GUI.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'İkisi ZORUNLU olarak birbirini dışlamaz…', en: 'The two are NOT mutually exclusive…' }, detail: { tr: 'İkisi ZORUNLU olarak birbirini dışlamaz — çoğu ekip keşifte Postman/Bruno, regresyon suite\'inde REST Assured kullanır.', en: 'The two are NOT mutually exclusive — most teams use Postman/Bruno for exploration and REST Assured for the regression suite.' } },
  ],
}

const raToolChoicePractice = {
  type: 'java-practice',
  relatedTopicId: 'rest-assured-tool-comparison',
  title: { tr: 'Kendin Dene: Postman Testini REST Assured\'a Çevir', en: 'Try It Yourself: Convert a Postman Test to REST Assured' },
  starterCode: `// Postman "Tests" sekmesi:
// pm.test("Status is 200", function () {
//     pm.response.to.have.status(200);
// });
// TODO: Bunun REST Assured karsiligini yaz`,
  solutionCode: `@Test
void statusIs200() {
    given().spec(spec)
        .when().get("/api/users/2")
        .then().statusCode(200);
}`,
  hint: { tr: 'Postman\'in `pm.test(...)` bloğu, REST Assured\'da bir `@Test` metodu + `.then().statusCode(...)` assertion\'ına karşılık gelir.', en: 'Postman\'s `pm.test(...)` block corresponds to a `@Test` method + `.then().statusCode(...)` assertion in REST Assured.' },
  successMessage: { tr: 'Doğru! Aynı doğrulama mantığı, iki farklı araçta iki farklı sözdizimiyle ifade edildi.', en: 'Correct! The same verification logic, expressed with two different syntaxes in two different tools.' },
}

const sections = [

  // ── 0: Why REST Assured? ────────────────────────────────────────────────────
  {
    title: { tr: '🏠 Neden REST Assured?', en: '🏠 Why REST Assured?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '😤',
        content: {
          tr: 'REST Assured, bir müzik stüdyosundaki "ses tamponu" gibi çalışır: prodüktör (geliştirici) stüdyodan çıktıktan sonra her oturumun kaydının aynı kalitede olmasını müzisyen yerine seviyelendirici sağlar — ama buradaki "kalite" API sözleşmesidir ve ölçer senin test sınıfındır. Peki Postman zaten var; her endpoint\'i Postman\'da tıklayıp görebiliyorken neden ayrıca test kodu yazmak gerekir? Çünkü Postman\'ın "Collection Runner"ı CI/CD pipeline\'ında git hook tetiklendiğinde otomatik koşmaz; production push\'u öncesinde kimse Postman\'ı elle açıp "tümünü çalıştır" demez. Java\'da @Test annotasyonu her build\'de otomatik tetiklenir — REST Assured aynı bütünleşik çalışmayı API katmanına taşır: tek bir `mvn test` komutuyla 47 endpoint\'in hepsi 30 saniyede kontrol edilir. QA açısından gerçek risk şu: "geliştirici API\'yi hazırladım dedi, Postman\'da baktım, tamam dedim" — ama ertesi sabah başka bir endpoint\'in response şeması sessizce değişmiş, kimse fark etmemiş ve production\'a gitmiş. REST Assured bu tuzağı build pipeline\'ına entegre ederek her deployment öncesi 30 saniyede yakalar.',
          en: 'REST Assured works like a "sound buffer" in a music studio: after the producer (developer) leaves, it is the leveler — not the musician — that guarantees every session recording matches the expected quality standard. But here the quality is the API contract, and the meter is your test class. Postman already exists; if you can click every endpoint and see the response, why write test code? Because Postman\'s Collection Runner does not auto-trigger when a git hook fires in a CI/CD pipeline, and nobody opens Postman manually before every production push. In Java, a @Test annotation auto-fires on every build — REST Assured brings that same discipline to the API layer: a single `mvn test` verifies all 47 endpoints in 30 seconds. The real QA risk: "the developer said API is ready, I checked it in Postman, looked fine" — then the next morning a different endpoint\'s response schema changed silently, nobody caught it, and it went to production. REST Assured wires that check into the build pipeline so every deployment surfaces it in 30 seconds.',
        },
      },
      {
        type: 'heading',
        text: {
          tr: '🎬 Gerçek Senaryo: Postman\'dan REST Assured\'a Geçiş',
          en: '🎬 Real Scenario: Moving from Postman to REST Assured',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Bir e-ticaret projesinde çalışıyorsun. Her sprint\'te şu endpointler test edilmeli: Kullanıcı kayıt/login, Ürün listeleme/arama, Sepet ekleme/güncelleme/silme, Ödeme işlemi. Postman\'la haftada 6 saat harcıyorsun. Yeni bir geliştirici geldi, Postman collection\'ını bozdu, kimse fark etmedi, production\'a gitti. REST Assured bu senaryoyu tamamen ortadan kaldırır.',
          en: 'You\'re on an e-commerce project. Every sprint these endpoints need testing: user register/login, product listing/search, cart add/update/delete, payment flow. You spend 6 hours a week in Postman. A new developer joined, broke the collection, nobody noticed, it went to production. REST Assured eliminates this scenario entirely.',
        },
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🤖',
            label: { tr: 'Tam Otomasyon', en: 'Full Automation' },
            desc: {
              tr: 'Her git push\'ta otomatik çalışır. "Geliştirici merge etti mi?" değil, "CI testleri geçti mi?" sorusu.',
              en: 'Runs automatically on every git push. The question is not "did the developer merge?" but "did the CI tests pass?"',
            },
          },
          {
            icon: '☕',
            label: { tr: 'Saf Java Gücü', en: 'Pure Java Power' },
            desc: {
              tr: 'DB\'den kullanıcı çek, API\'ye gönder, response\'u kontrol et — hepsini tek test içinde Java ile yap.',
              en: 'Fetch a user from DB, send to API, verify the response — all in one test, all in Java.',
            },
          },
          {
            icon: '🔁',
            label: { tr: 'Sıfır Manuel İş', en: 'Zero Manual Work' },
            desc: {
              tr: '200 endpoint? Fark etmez. mvn test yaz, git. Her test saniyeler içinde biter.',
              en: '200 endpoints? No problem. Type mvn test and walk away. Every test finishes in seconds.',
            },
          },
          {
            icon: '📊',
            label: { tr: 'Allure Rapor', en: 'Allure Reporting' },
            desc: {
              tr: 'Her test için screenshot değil, request/response logu, süre, başarı/hata oranı. Yöneticiye göster.',
              en: 'Not screenshots — request/response logs, duration, pass/fail rate. Show it to your manager.',
            },
          },
          {
            icon: '🔒',
            label: { tr: 'Regresyon Kalkanı', en: 'Regression Shield' },
            desc: {
              tr: 'Yeni özellik eski endpoint\'i kırdı mı? REST Assured 30 saniyede söyler.',
              en: 'Did the new feature break an old endpoint? REST Assured tells you in 30 seconds.',
            },
          },
          {
            icon: '🧩',
            label: { tr: 'Test Veri Yönetimi', en: 'Test Data Management' },
            desc: {
              tr: 'Faker ile dinamik test verisi, DB cleanup, environment bazlı config — hepsi Java.',
              en: 'Dynamic test data with Faker, DB cleanup, environment-based config — all in Java.',
            },
          },
        ],
      },
      {
        type: 'heading',
        text: {
          tr: '📊 Gerçek Rakamlar: Ne Kadar Zaman Kazanırsın?',
          en: '📊 Real Numbers: How Much Time Do You Save?',
        },
      },
      {
        type: 'table',
        headers: ['Task', 'Postman (Manual)', 'REST Assured (Automated)'],
        rows: [
          ['Post-sprint regression test (50 endpoints)', '4–6 hours', '2–3 minutes'],
          ['New developer onboarding', '2 days (learn the collection)', '30 minutes (read the code)'],
          ['Pre-production deploy test', 'Skipped (no time)', 'Runs in the pipeline automatically'],
          ['Test result reporting', 'Screenshot', 'Allure HTML report'],
          ['Broken test detection', 'Weeks later', 'Instantly on git push'],
        ],
      },
      {
        type: 'postman-compare',
        comparisons: [
          {
            scenario: '🟢 GET — List Users',
            postman: 'Select Method: GET\nURL: {{baseUrl}}/api/users?page=1\nClick Send\n→ Check response manually\n→ Repeat for every test',
            restAssured: `given()
    .baseUri("https://reqres.in")
    .queryParam("page", 1)
.when()
    .get("/api/users")
.then()
    .statusCode(200)
    .body("page", equalTo(1))
    .body("data.size()", greaterThan(0))
    .body("data[0].email", notNullValue());
// Runs automatically in CI/CD on every push`,
          },
          {
            scenario: '🟡 POST — Create User',
            postman: 'Method: POST\nBody > raw > JSON:\n{"name":"Alice","job":"QA"}\nSend > Check result\n→ Is it 201? Is there an id?\n→ Manual inspection',
            restAssured: `UserRequest req = new UserRequest("Alice","QA");

given()
    .contentType(ContentType.JSON)
    .body(req)           // POJO → JSON automatically
.when()
    .post("https://reqres.in/api/users")
.then()
    .statusCode(201)
    .body("name", equalTo("Alice"))
    .body("id", notNullValue());
// Type-safe, IDE autocomplete supported`,
          },
          {
            scenario: '🔐 Bearer Token Auth',
            postman: 'Authorization tab → Bearer Token\nToken: {{authToken}}\n→ Did you set the variable?\n→ Has the token expired?',
            restAssured: `// Login → get token → use automatically
String token = given()
    .contentType(ContentType.JSON)
    .body(new LoginRequest("eve.holt@reqres.in","cityslicka"))
.when()
    .post("https://reqres.in/api/login")
.then()
    .statusCode(200)
    .extract().path("token");

given().auth().oauth2(token)
    .when().get("/api/users/me")
    .then().statusCode(200);`,
          },
          {
            scenario: '✅ Assertions / Tests',
            postman: `Tests tab → write JavaScript:
pm.test("Status 200", ()=>{
  pm.response.to.have.status(200);
});
pm.test("Email exists", ()=>{
  pm.expect(pm.response.json()
    .data[0].email).to.include("@");
});`,
            restAssured: `.then()
    .statusCode(200)
    .body("data[0].email", containsString("@"))
    .body("data[0].id", greaterThan(0))
    .body("total", greaterThanOrEqualTo(1))
    .body("data", hasSize(greaterThan(0)))
    .time(lessThan(3000L));
// Type-safe, compile-time checks`,
          },
          {
            scenario: '🔄 Test Chaining (Pass Values)',
            postman: `Save to variable in Tests:
pm.collectionVariables.set(
  "newUserId",
  pm.response.json().id
);
// Use in next request: {{newUserId}}
// Breaks if collection order changes`,
            restAssured: `// Safe, type-safe chaining
String id = given()
    .contentType(ContentType.JSON)
    .body(new UserRequest("Bob","Dev"))
.when()
    .post("/api/users")
.then()
    .statusCode(201)
    .extract().path("id");

given().pathParam("id", id)
    .when().delete("/api/users/{id}")
    .then().statusCode(204);`,
          },
          {
            scenario: '🌍 Environment → BaseURI Config',
            postman: 'Environments > New\nbaseUrl: https://reqres.in\nEach request uses {{baseUrl}}\n→ Forget to select env? Error.',
            restAssured: `// application.properties or BaseTest
public class BaseTest {
  @BeforeAll static void init() {
    RestAssured.baseURI =
      System.getProperty("env",
        "https://reqres.in");
    // mvn test -Denv=https://staging
    // No "forgot to select env" mistakes
  }
}`,
          },
        ],
      },
      raBddChainFilm,
      raWhyStep,
      raWhyPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Büyük bir projede REST Assured\'ın Postman\'a göre en kritik avantajı nedir?',
          en: 'What is the most critical advantage of REST Assured over Postman in a large project?',
        },
        options: [
          { id: 'a', text: { tr: 'GUI\'si daha güzel', en: 'It has a nicer GUI' } },
          { id: 'b', text: { tr: 'CI/CD\'e native entegrasyon — her push\'ta otomatik çalışma', en: 'Native CI/CD integration — runs automatically on every push' } },
          { id: 'c', text: { tr: 'Daha fazla renk teması var', en: 'It has more color themes' } },
          { id: 'd', text: { tr: 'İnternetsiz çalışır', en: 'It works offline' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'CI/CD entegrasyonu en kritik fark. Jenkins/GitHub Actions\'da mvn test komutuyla tüm API testleri otomatik çalışır, rapor üretir, hata varsa pipeline durdurur.',
          en: 'CI/CD integration is the most critical difference. In Jenkins/GitHub Actions, mvn test runs all API tests automatically, generates a report, and stops the pipeline if there are failures.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "REST Assured kullanarak yazdığımız otomasyon testlerinin büyük ölçekli kurumsal projelerde Postman'a kıyasla sunduğu en büyük avantaj nedir?",
            "en": "What is the primary advantage of REST Assured automation tests compared to Postman in large-scale enterprise projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Daha sezgisel bir arayüz sunması",
                        "en": "Providing a more intuitive UI"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Kod tabanlı olması sayesinde CI/CD süreçlerine kusursuz entegre olması",
                        "en": "Being code-based, allowing for seamless integration into CI/CD pipelines"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Daha hızlı HTTP isteği göndermesi",
                        "en": "Sending HTTP requests faster"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Dahili veritabanı bağlantısı içermesi",
                        "en": "Including built-in database connectivity"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Kod tabanlı frameworkler (REST Assured), CI/CD süreçlerinde kaynak kodun bir parçası olarak çalıştırılabilir. Bu, her commit sonrası otomatik testlerin tetiklenmesini ve kod kalitesinin korunmasını sağlar; Postman ise manuel süreçlere daha yakındır.",
            "en": "Code-based frameworks like REST Assured can be executed as part of the source code in CI/CD processes. This allows for automated test triggers after every commit to maintain quality; Postman is more oriented towards manual processes."
      }
}
},
    {
      type: 'api-traffic-chain',
      endpoint: 'GET /api/users/2',
      method: 'GET',
      statusCode: 200,
      requestHeaders: { 'Authorization': 'Bearer {{token}}', 'Accept': 'application/json' },
      responseBody: '{\n  "data": {\n    "id": 2,\n    "email": "janet@reqres.in",\n    "first_name": "Janet"\n  },\n  "support": { "url": "https://reqres.in" }\n}',
      raCode: 'given()\n  .baseUri("https://reqres.in")\n  .header("Authorization", "Bearer " + token)\n.when()\n  .get("/api/users/2")\n.then()\n  .statusCode(200)\n  .body("data.id", equalTo(2))\n  .body("data.email", notNullValue());',
    },
    ],
  },

  // ── 1: Setup ─────────────────────────────────────────────────────────────────
  {
    title: { tr: '⚙️ Kurulum ve Proje Yapısı', en: '⚙️ Setup & Project Structure' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: {
          tr: 'pom.xml + BaseTest sınıfı, bir araba fabrikasındaki "kalıp çerçevesi" gibidir: kalıp bir kez kuruldu mu her seri üretim arabası aynı çerçeveden geçer — vidalama robotunun her seferinde çerçeveyi sıfırdan yapmasına gerek kalmaz. "Zaten her testte baseUri\'yi yazabiliyorum, neden ayrı bir BaseTest\'e taşıyayım?" Çünkü baseUri, auth header ve loglama ayarlarını her test sınıfında tekrarlarsan, bir gün staging URL\'si production URL\'siyle değişince 70 test dosyasını tek tek düzeltmek zorunda kalırsın — bu 70 satır değişikliği yerine 1 satır farkıdır. Java\'da @BeforeAll ile JUnit test fixture\'ları kurarken ne hissediyorsan BaseTest\'in `RestAssured.baseURI` satırı da tam olarak aynı şeydir: bir kez yaz, hep geçerli. QA açısından kritik nokta: CI/CD pipeline\'ında staging ve production ortamları aynı kodla test edilmelidir; BaseTest\'teki tek bir `System.getenv("BASE_URL")` bu senkronizasyonu sağlar ve yanlış ortama yanlış test gitmesinin önüne geçer.',
          en: 'The pom.xml + BaseTest class is like the "jig frame" on a car assembly line: once the frame is set, every car in the production run passes through it — the welding robot does not rebuild the frame from scratch each time. "I can write baseUri directly in every test — why extract it to a separate BaseTest?" Because if you repeat the baseUri, auth header, and logging config in every test class, the day the staging URL swaps with the production URL you will have to fix 70 test files one by one — that is the difference between 70 edits and 1. In Java, when you wire up a JUnit test fixture with @BeforeAll, the `RestAssured.baseURI` line in BaseTest does the same thing: write once, always valid. The critical QA point: in a CI/CD pipeline, staging and production must be tested with the same code; a single `System.getenv("BASE_URL")` in BaseTest achieves this and prevents the wrong test hitting the wrong environment.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Maven pom.xml — Tüm Bağımlılıklar', en: 'Maven pom.xml — All Dependencies' },
      },
      {
        type: 'code',
        language: 'xml',
        code: `<dependencies>
    <!-- REST Assured core library -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JSON Path (extract values from response) -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-path</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JSON Schema validation -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-schema-validator</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JUnit 5 test framework -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>

    <!-- Hamcrest assertion matchers -->
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest</artifactId>
        <version>2.2</version>
        <scope>test</scope>
    </dependency>

    <!-- Jackson: POJO <-> JSON conversion (REQUIRED) -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.17.0</version>
    </dependency>

    <!-- Lombok: eliminates getter/setter boilerplate -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.32</version>
        <scope>provided</scope>
    </dependency>

    <!-- Allure reporting (optional but recommended) -->
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-rest-assured</artifactId>
        <version>2.25.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
      raPomXmlDependenciesStep,
      {
        type: 'heading',
        text: { tr: 'Proje Klasör Yapısı', en: 'Project Folder Structure' },
      },
      {
        type: 'file-tree',
        title: { tr: 'REST Assured Proje Yapısı (Kurumsal)', en: 'REST Assured Project Structure (Enterprise)' },
        tree: `src/
├── main/
│   └── java/com/mycompany/
│       └── models/                    ← Application POJOs (if any)
│
└── test/
    ├── java/com/mycompany/
    │   ├── config/
    │   │   ├── BaseTest.java          ← Main config, @BeforeAll
    │   │   └── ConfigReader.java      ← Read config from properties files
    │   ├── models/
    │   │   ├── request/
    │   │   │   ├── UserRequest.java   ← POST/PUT request body POJO
    │   │   │   └── LoginRequest.java
    │   │   └── response/
    │   │       ├── UserResponse.java  ← Response POJO
    │   │       └── UsersListResponse.java
    │   ├── tests/
    │   │   ├── UserApiTest.java       ← User API tests
    │   │   ├── AuthApiTest.java       ← Auth tests
    │   │   └── ProductApiTest.java    ← Product API tests
    │   └── utils/
    │       ├── TestDataBuilder.java   ← Test data factory
    │       └── AuthHelper.java        ← Token management
    └── resources/
        ├── schemas/
        │   ├── user-schema.json       ← JSON Schema files
        │   └── users-list-schema.json
        └── config/
            ├── dev.properties         ← Dev environment config
            └── staging.properties     ← Staging environment config`,
        note: {
          tr: 'config/, models/, utils/ ayrımı projeyi büyüdükçe yönetilebilir tutar.',
          en: 'The config/, models/, utils/ separation keeps the project manageable as it grows.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'BaseTest.java — Her Şeyin Temeli', en: 'BaseTest.java — The Foundation of Everything' },
      },
      {
        type: 'code',
        language: 'java',
        code: `package com.mycompany.config;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;

public class BaseTest {

    // All test classes inherit this spec
    protected static RequestSpecification spec;

    @BeforeAll
    static void globalSetup() {
        // Base URI — read from system property, fallback to default
        String baseUri = System.getProperty("baseUri", "https://reqres.in");

        spec = new RequestSpecBuilder()
            .setBaseUri(baseUri)               // All requests start from this URL
            .setContentType(ContentType.JSON)  // Every request sends/expects JSON
            .setRelaxedHTTPSValidation()       // Skip SSL cert check in dev/staging
            .addFilter(new RequestLoggingFilter())  // Log all requests
            .addFilter(new ResponseLoggingFilter()) // Log all responses
            .build();
    }
}`,
      },
      raBaseTestStep,
      {
        type: 'heading',
        text: { tr: 'ConfigReader.java — Ortam Konfigürasyonu', en: 'ConfigReader.java — Environment Configuration' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// src/test/resources/config/dev.properties:
// base.uri=https://reqres.in
// admin.email=eve.holt@reqres.in
// admin.password=cityslicka

public class ConfigReader {
    private static Properties props = new Properties();
    static {
        String env = System.getProperty("env", "dev");
        try {
            props.load(ConfigReader.class
                .getResourceAsStream("/config/" + env + ".properties"));
        } catch (IOException e) {
            throw new RuntimeException("Config file not found: " + env, e);
        }
    }
    public static String get(String key) { return props.getProperty(key); }
}

// Usage:  ConfigReader.get("base.uri")  →  "https://reqres.in"
// mvn test -Denv=staging  →  loads staging.properties`,
      },
      raMavenSetupFilm,
      {
        type: 'quiz',
        question: {
          tr: 'setRelaxedHTTPSValidation() ne işe yarar?',
          en: 'What does setRelaxedHTTPSValidation() do?',
        },
        options: [
          { id: 'a', text: { tr: 'HTTP\'yi HTTPS\'e yönlendirir', en: 'Redirects HTTP to HTTPS' } },
          { id: 'b', text: { tr: 'Self-signed veya süresi dolmuş SSL sertifikalarında hata fırlatmaz', en: 'Does not throw errors for self-signed or expired SSL certificates' } },
          { id: 'c', text: { tr: 'HTTPS isteklerini şifreler', en: 'Encrypts HTTPS requests' } },
          { id: 'd', text: { tr: 'Bağlantı timeout\'unu artırır', en: 'Increases the connection timeout' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Dev ve staging ortamlarında genellikle self-signed SSL sertifikası olur. setRelaxedHTTPSValidation() bu sertifikaları doğrulamadan geçer. Production\'da kullanma — güvenlik riski.',
          en: 'Dev and staging environments often use self-signed SSL certificates. setRelaxedHTTPSValidation() skips certificate validation. Never use it in production — it is a security risk.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonunda REST Assured kullanılırken SSL sertifika hatalarını aşmak için kullanılan yöntem hangisidir?",
            "en": "Which method is used to bypass SSL certificate errors when using REST Assured in test automation?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "trustStorePath()",
                        "en": "trustStorePath()"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "setRelaxedHTTPSValidation()",
                        "en": "setRelaxedHTTPSValidation()"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "ignoreSSLErrors()",
                        "en": "ignoreSSLErrors()"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "allowAllCertificates()",
                        "en": "allowAllCertificates()"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "setRelaxedHTTPSValidation(), test ortamlarında geçerli olmayan sertifikalardan kaynaklanan SSL hatalarını göz ardı etmek için kullanılır. Güvenlik riski taşıdığı için prod ortamlarında kesinlikle tercih edilmemelidir.",
            "en": "setRelaxedHTTPSValidation() is used to ignore SSL errors caused by invalid certificates in test environments. Since it poses a security risk, it should strictly not be used in production environments."
      }
}
},
    ],
  },

  // ── 2: Basic Requests ────────────────────────────────────────────────────────
  {
    title: { tr: '📡 Temel HTTP İstekleri (reqres.in ile)', en: '📡 Basic HTTP Requests (using reqres.in)' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📬',
        content: {
          tr: 'İlk REST Assured testini yazmak, bir telsiz alıcısının frekansını ayarlamaya benzer: doğru frekansı (baseUri + endpoint) ve doğru protokolü (HTTP verb + headers) bulduğunda cevap kendi gelir — bulmasan da statik kalır. Peki Postman\'da zaten aynı URL\'e istek atabiliyorken neden aynı işi kod olarak yazmak gerekiyor? Çünkü Postman\'daki her manuel tıklama "şu an" çalıştığını kanıtlar; REST Assured\'daki her @Test ise "her zaman" çalışmaya devam ettiğini kanıtlar. Java\'da `HttpURLConnection` veya `HttpClient` ile HTTP isteği yapabilirsin ama 15 satır boilerplate gerekir; REST Assured\'daki `given().when().get("/users").then()` zinciri aynı işi 3 satıra indirir ve assertion\'ı doğrudan bu zincire eklemene izin verir. QA açısından pratik değer: reqres.in ile yazdığın test, gerçek projenin API\'sine geçerken yalnızca baseUri değişir — auth token şeması veya request body yapısı değişmediği sürece test kodu aynı kalır ve bu "yeniden kullanılabilirlik" sana her sprint başında 2-3 saatlik adaptasyon süresini kazandırır.',
          en: 'Writing your first REST Assured test is like tuning a radio receiver: find the right frequency (baseUri + endpoint) and the right protocol (HTTP verb + headers) and the response arrives on its own — miss either and it stays silent. You can already send the same request in Postman — so why write it as code? Because every manual Postman click proves it works "right now"; every REST Assured @Test proves it keeps working "every time." In Java you can make HTTP requests with HttpURLConnection or HttpClient, but that needs 15 lines of boilerplate; REST Assured\'s `given().when().get("/users").then()` chain does the same in 3 lines and lets you attach the assertion directly in that same chain. The practical QA value: the test you write against reqres.in needs only the baseUri changed when you switch to your real project\'s API — as long as the auth token scheme and request body structure match, the test code is unchanged. That reusability saves you 2–3 hours of adaptation work at the start of every sprint.',
        },
      },
      {
        type: 'simulation',
        icon: '🧪',
        color: '#10b981',
        title: { tr: 'given/when/then — REST Assured Zinciri Canlı', en: 'given/when/then — REST Assured Chain Live' },
        scenario: 'rest-assured-chain',
        description: {
          tr: '"▶ Testi Çalıştır" butonuna bas: given() → when() → then() zincirinin adım adım nasıl çalıştığını, isteğin gönderilişini ve assertion\'ların koşmasını izle.',
          en: 'Press "▶ Run Test": watch the given() → when() → then() chain execute, the request being sent, and assertions running step by step.',
        },
        code: `// Java — REST Assured given/when/then zinciri
@Test
void getUser_shouldReturn200_withValidData() {
    given()                                    // ① Kurulum
        .baseUri("https://reqres.in")
        .header("Content-Type", "application/json")
        .queryParam("page", 2)
    .when()                                    // ② Eylem
        .get("/api/users")
    .then()                                    // ③ Doğrulama
        .statusCode(200)
        .body("page", equalTo(2))
        .body("data", hasSize(6))
        .body("data[0].email", containsString("@"))
        .time(lessThan(5000L));

// Postman ile karşılaştırma:
// given() = Postman "Pre-request Script + Headers"
// when()  = Postman "Send" butonu
// then()  = Postman "Tests" sekmesi (pm.test)`,
        language: 'java',
      },
      {
        type: 'heading',
        text: { tr: 'GET — Sayfalı Kullanıcı Listesi', en: 'GET — Paginated User List' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// GET https://reqres.in/api/users?page=2
@Test
@DisplayName("GET /api/users?page=2 → returns 6 users")
void getUsers_page2_shouldReturn6Users() {
    given()
        .spec(spec)
        .queryParam("page", 2)           // Appends ?page=2
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)
        .body("page", equalTo(2))
        .body("per_page", equalTo(6))
        .body("total", greaterThan(0))
        .body("data", hasSize(6))        // Exactly 6 users returned
        .body("data[0].id", notNullValue())
        .body("data[0].email", containsString("@"))
        .body("data.first_name", everyItem(notNullValue()))
        .time(lessThan(5000L));          // Response under 5 seconds
}`,
      },
      raGetPaginationStep,
      {
        type: 'heading',
        text: { tr: 'GET — ID ile Tek Kayıt ve 404 Testi', en: 'GET — Single Record by ID and 404 Test' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Existing user: GET /api/users/2
@Test
void getUser_existingId_shouldReturnUser() {
    given()
        .spec(spec)
        .pathParam("id", 2)
    .when()
        .get("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("data.id", equalTo(2))
        .body("data.email", equalTo("janet.weaver@reqres.in"))
        .body("data.first_name", equalTo("Janet"));
}

// Non-existing user: GET /api/users/999 → 404
@Test
void getUser_notExistingId_shouldReturn404() {
    given()
        .spec(spec)
        .pathParam("id", 999)
    .when()
        .get("/api/users/{id}")
    .then()
        .statusCode(404)
        .body(equalTo("{}")); // reqres.in returns empty JSON body

    // Negative tests are equally important!
    // Does the API handle errors correctly?
}`,
      },
      raGetSingleRecord404Step,
      {
        type: 'heading',
        text: { tr: 'POST — Yeni Kullanıcı Oluştur', en: 'POST — Create a New User' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// POST https://reqres.in/api/users
@Test
void createUser_validData_shouldReturn201() {
    UserRequest request = UserRequest.builder()
        .name("Alice Smith")
        .job("Senior QA Engineer")
        .build();

    given()
        .spec(spec)
        .body(request)                   // Jackson serializes to JSON automatically
    .when()
        .post("/api/users")
    .then()
        .statusCode(201)                 // 201 Created (not 200!)
        .body("name", equalTo("Alice Smith"))
        .body("job", equalTo("Senior QA Engineer"))
        .body("id", notNullValue())      // Server must generate an id
        .body("createdAt", notNullValue()); // Timestamp must be present
}`,
      },
      {
        type: 'heading',
        text: { tr: 'PUT & PATCH & DELETE', en: 'PUT & PATCH & DELETE' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// PUT /api/users/2 — send the complete record
@Test
void updateUser_PUT_shouldReturn200() {
    given()
        .spec(spec)
        .pathParam("id", 2)
        .body(new UserRequest("Janet Updated", "QA Lead"))
    .when()
        .put("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("name", equalTo("Janet Updated"))
        .body("updatedAt", notNullValue());
}

// PATCH /api/users/2 — send only the changed field
@Test
void updateUser_PATCH_onlyJob_shouldReturn200() {
    given()
        .spec(spec)
        .pathParam("id", 2)
        .body("{\"job\": \"Principal QA\"}")
    .when()
        .patch("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("job", equalTo("Principal QA"));
}

// DELETE /api/users/2
@Test
void deleteUser_shouldReturn204() {
    given()
        .spec(spec)
        .pathParam("id", 2)
    .when()
        .delete("/api/users/{id}")
    .then()
        .statusCode(204);  // 204 No Content — no body, just the success code
}`,
      },
      raBasicRequestFilm,
      {
        type: 'quiz',
        question: {
          tr: 'POST başarılı olduğunda hangi HTTP status code beklenir?',
          en: 'Which HTTP status code is expected when a POST is successful?',
        },
        options: [
          { id: 'a', text: '200 OK' },
          { id: 'b', text: '201 Created' },
          { id: 'c', text: '204 No Content' },
          { id: 'd', text: '202 Accepted' },
        ],
        correct: 'b',
        explanation: {
          tr: '201 Created — yeni kayıt oluşturulduğunda standart. 200 genelde GET için. 204 DELETE/PUT için (body yok). 202 ise async işlemlerde kullanılır.',
          en: '201 Created is the standard for new resource creation. 200 is typically for GET. 204 for DELETE/PUT when there is no body. 202 is for async operations.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Bir API servisinde varlık (resource) silme işlemi (DELETE) başarıyla tamamlandığında dönmesi beklenen en uygun HTTP durum kodu hangisidir?",
            "en": "Which HTTP status code is most appropriate when a resource deletion (DELETE) operation is completed successfully?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "200 OK"
            },
            {
                  "id": "b",
                  "text": "201 Created"
            },
            {
                  "id": "c",
                  "text": "204 No Content"
            },
            {
                  "id": "d",
                  "text": "202 Accepted"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "204 No Content, genellikle bir işlemin başarıyla yapıldığını ancak sunucunun dönecek bir yanıt gövdesi (body) olmadığını belirtmek için DELETE işlemlerinde standarttır.",
            "en": "204 No Content is standard for DELETE operations to indicate that the request was successful but the server does not need to return a body in the response."
      }
}
},
    {
      type: 'http-flow-animation',
      method: 'POST',
      endpoint: '/api/users',
      dbQuery: 'INSERT INTO users (name, job) VALUES (?, ?)',
      statusCode: 201,
      expectedValue: '201',
      actualValue: '201',
    },
    ],
  },

  // ── 3: Authentication ────────────────────────────────────────────────────────
  {
    title: { tr: '🔐 Kimlik Doğrulama', en: '🔐 Authentication' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔑',
        content: {
          tr: 'API kimlik doğrulaması, bir banka kasasının çift anahtarlı kilitlemesine benzer: kasayı açmak için hem banka yöneticisinin anahtarı (server secret) hem senin anahtarın (token/API key) aynı anda dönmek zorundadır — biri olmadan diğeri işe yaramaz. Peki Postman\'da zaten "Authorization" sekmesine token yazıyorum; neden REST Assured\'da ayrıca `.auth().bearer(token)` yazmak gerekiyor? Çünkü Postman\'ın auth ayarı o koleksiyona özeldir ve CI/CD\'ye entegre değildir; REST Assured\'da token BaseTest\'in `@BeforeAll` metodunda çekilen environment variable\'dan gelir ve pipeline her tetiklendiğinde güvenli şekilde rotasyona girer. Java\'da Spring Security\'nin `@WithMockUser` annotasyonuyla test ederken gerçek HTTP katmanını atlarsın — REST Assured\'daki `.auth().oauth2(token)` ise gerçek HTTP katmanında token\'ı gönderir ve API\'nin gerçek auth middleware\'ini test eder. QA açısından kritik risk: token\'ı hardcode ederek test yazarsan, token expire olduğunda tüm test suite kırılır; en kötüsü CI pipeline saat 03:00\'te çöker ve sabah ekip panikler. `System.getenv("API_TOKEN")` bu riski tamamen ortadan kaldırır.',
          en: 'API authentication is like a bank vault\'s dual-key lock: to open it, the bank manager\'s key (server secret) and your key (token/API key) must both turn simultaneously — neither works without the other. You might say you already type the token in Postman\'s Authorization tab; why write `.auth().bearer(token)` in REST Assured? Because Postman\'s auth setting is scoped to that collection and is not wired into CI/CD; in REST Assured the token comes from an environment variable fetched in `@BeforeAll` in BaseTest, and it rotates securely every time the pipeline fires. In Java, testing with Spring Security\'s `@WithMockUser` bypasses the real HTTP layer — REST Assured\'s `.auth().oauth2(token)` sends the token over actual HTTP and tests the API\'s real auth middleware. The critical QA risk: if you hardcode a token in your test, when that token expires you break the entire test suite — worse, the CI pipeline breaks at 3 AM and the team panics in the morning. `System.getenv("API_TOKEN")` eliminates that risk entirely.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Basic Authentication', en: 'Basic Authentication' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Basic Auth: "username:password" → Base64 encode → Authorization header
given()
    .spec(spec)
    .auth().preemptive().basic("admin", "secret123")
    // Adds header: Authorization: Basic YWRtaW46c2VjcmV0MTIz
.when()
    .get("/api/admin/dashboard")
.then()
    .statusCode(200);

// Why preemptive()?
// Normal .basic() → sends request without auth → gets 401 → retries with auth
// .preemptive() → sends auth from the very first request (faster, more reliable)`,
      },
      raBasicAuthStep,
      {
        type: 'heading',
        text: { tr: 'Bearer Token — Login → Token Al → Kullan', en: 'Bearer Token — Login → Get Token → Use It' },
      },
      {
        type: 'code',
        language: 'java',
        code: `public class AuthApiTest extends BaseTest {

    private static String token; // Shared across all test methods

    @BeforeAll
    static void login() {
        LoginRequest creds = new LoginRequest(
            "eve.holt@reqres.in", "cityslicka"
        );
        token = given()
            .spec(spec)
            .body(creds)
        .when()
            .post("/api/login")
        .then()
            .statusCode(200)
            .body("token", notNullValue())
            .extract().path("token");  // Extract as String
    }

    @Test
    void accessProtectedEndpoint_withToken_shouldReturn200() {
        given()
            .spec(spec)
            .auth().oauth2(token)      // Adds: Authorization: Bearer {token}
        .when()
            .get("/api/users/2")
        .then()
            .statusCode(200);
    }

    @Test
    void accessProtectedEndpoint_withoutToken_shouldReturn401() {
        given().spec(spec)             // No token — expect failure
        .when().get("/api/users/me")
        .then().statusCode(401);       // Negative test matters too!
    }
}`,
      },
      raBearerTokenStep,
      {
        type: 'heading',
        text: { tr: 'Token Auto-Refresh Filter — Gerçek Hayat Çözümü', en: 'Token Auto-Refresh Filter — Real-World Solution' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Real-world problem: token expires mid test suite
// Solution: a Filter that automatically refreshes the token on 401

public class TokenRefreshFilter implements Filter {
    private String token;
    private long tokenExpiry;

    public TokenRefreshFilter() { refreshToken(); }

    @Override
    public Response filter(FilterableRequestSpecification req,
                           FilterableResponseSpecification res,
                           FilterContext ctx) {
        if (System.currentTimeMillis() > tokenExpiry - 300_000)
            refreshToken();  // Refresh 5 minutes before expiry

        req.header("Authorization", "Bearer " + token);
        Response response = ctx.next(req, res);

        if (response.statusCode() == 401) { // Got 401? Refresh and retry
            refreshToken();
            req.header("Authorization", "Bearer " + token);
            response = ctx.next(req, res);
        }
        return response;
    }

    private void refreshToken() {
        token = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(new LoginRequest("admin@example.com", "password"))
            .post("/auth/login")
            .then().statusCode(200)
            .extract().path("access_token");
        tokenExpiry = System.currentTimeMillis() + 3600_000; // 1 hour
    }
}
// Add in BaseTest: RestAssured.filters(new TokenRefreshFilter());`,
      },
      raAuthPreemptiveFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Uzun süren test süitlerinde token yönetimi için en iyi yaklaşım nedir?',
          en: 'What is the best approach for token management in long-running test suites?',
        },
        options: [
          { id: 'a', text: { tr: 'Her test metodunda ayrı login yap', en: 'Login separately in every test method' } },
          { id: 'b', text: { tr: '@BeforeAll\'da bir kez token al', en: 'Get the token once in @BeforeAll' } },
          { id: 'c', text: { tr: 'Token refresh Filter kullan — 401\'de otomatik yeniler', en: 'Use a Token refresh Filter — automatically refreshes on 401' } },
          { id: 'd', text: { tr: 'Token\'ı sabit kodla', en: 'Hardcode the token' } },
        ],
        correct: 'c',
        explanation: {
          tr: 'Token refresh Filter en temiz çözüm: her test metoduna login kodu yazmak zorunda kalmazsın, 401 alındığında otomatik yenilenir, kod tekrarı sıfır.',
          en: 'The Token refresh Filter is the cleanest solution: no login code in every test method, automatically refreshes on 401, zero code duplication.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonunda token süresi dolduğunda testlerin başarısız olmasını önlemek için hangi yöntem daha sürdürülebilirdir?",
            "en": "Which method is more maintainable to prevent test failures when the token expires in test automation?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Her testin başında yeni bir token isteği gönder",
                        "en": "Send a new token request at the beginning of every test"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Token değerini bir ortam değişkeninde tut ve manuel güncelle",
                        "en": "Store the token in an environment variable and update it manually"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "RequestInterceptor veya Authentication Filter kullanarak token otomatik yenileme mekanizması kur",
                        "en": "Set up an automatic token refresh mechanism using a RequestInterceptor or Authentication Filter"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Testlerin süresini token ömründen daha kısa tut",
                        "en": "Keep the test duration shorter than the token lifespan"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Interceptor veya Filter kullanmak, HTTP yanıtlarını izlemenizi ve 401 hatası aldığınızda otomatik olarak yeni bir token alıp isteği tekrar etmenizi sağlar. Bu, test kodunuzu karmaşadan kurtarır ve yönetimi merkezileştirir.",
            "en": "Using an Interceptor or Filter allows you to monitor HTTP responses and automatically request a new token and retry the request upon receiving a 401 error. This declutters your test code and centralizes management."
      }
}
},
    ],
  },

  // ── 4: POJO & Jackson ────────────────────────────────────────────────────────
  {
    title: { tr: '📦 POJO & Jackson — Tip-Safe API Testi', en: '📦 POJO & Jackson — Type-Safe API Testing' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧱',
        content: {
          tr: 'Ham String JSON yazmak, bir sözleşme metnini elle kopyalayan noter gibidir: her harfi tek tek basar, yanlış yazsa imza tökezler ama kağıt kabul eder — hata ancak mahkemede ortaya çıkar. POJO kullanmak ise o sözleşme metnini bir yazılım şablonuna dönüştürmek gibidir: "ad" alanını boş bırakırsan derleme aşamasında kırmızı uyarı alırsın, imzaya gitmeden önce. Peki REST Assured `body(jsonString)` ile de çalışıyor; neden POJO\'ya geçmek gerekiyor? Çünkü `"email":"test@test.com "` (sondaki boşluk) gibi bir yazım hatası test\'i bazen geçirir bazen geçirmez — flaky test kaynağını bulmak saatler alır. Java\'da Jackson ve Lombok, `@Data @Builder` anotasyonlarıyla bunu çözer: `UserRequest.builder().email(email).build()` yaptığında IDE email alanını tamamlar ve eksik bırakırsan derleme hatası verir. QA açısından gerçek değer: POJO\'nun `@JsonProperty("email_address")` anotasyonu API\'nin snake_case field\'ını Java camelCase değişkeninle eşler — bu uyumsuzluğu String\'de yapsan `NullPointerException` alırsın; POJO\'da otomatik çözülür ve response\'dan parse edilen değer doğrudan assertion\'a akar.',
          en: 'Writing raw String JSON is like a notary copying a contract by hand, letter by letter: if a character is wrong the paper still accepts the signature, but the mistake surfaces only in court. Using a POJO is like turning that contract text into a software template: leave the "name" field empty and you get a red compile-time warning before the document ever reaches the signing stage. REST Assured works fine with `body(jsonString)` — so why switch to POJOs? Because a typo like `"email":"test@test.com "` (trailing space) makes the test pass sometimes and fail sometimes — a flaky test whose root cause takes hours to find. In Java, Jackson and Lombok solve this with `@Data @Builder`: when you write `UserRequest.builder().email(email).build()`, the IDE autocompletes the email field, and leaving it out gives a compile error. The real QA value: a POJO\'s `@JsonProperty("email_address")` annotation maps the API\'s snake_case field to your Java camelCase variable — do that mapping in a String and you get a NullPointerException; in a POJO it resolves automatically and the parsed response value flows directly into your assertion.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'POJO Nedir? — Java Analogisi', en: 'What is a POJO? — Java Analogy' },
      },
      {
        type: 'text',
        content: {
          tr: 'Java\'da HashMap ile String key/value sakladığında typo yapabilirsin, tip güvenliği yoktur. POJO (Plain Old Java Object) ise alan isimlerini ve tiplerini sınıf olarak tanımlamaktır — tıpkı HashMap\'i type-safe hale getirmek gibi.',
          en: 'When you store key/value pairs in a Java HashMap, you can make typos and there is no type safety. A POJO (Plain Old Java Object) defines field names and types as a class — it is like making a HashMap type-safe.',
        },
      },
      {
        type: 'comparison',
        left: {
          label: { tr: '❌ String JSON (Kırılgan)', en: '❌ String JSON (Fragile)' },
          code: `// Typo: "nme" should be "name"
// No compile error — blows up at runtime!
String body = "{\\"nme\\": \\"Alice\\"," +
              "\\"job\\": \\"QA\\"}";

given().body(body)
    .post("/api/users");`,
          note: { tr: 'IDE\'nin typo\'yu yakalaması imkansız.', en: 'The IDE cannot catch this typo.' },
        },
        right: {
          label: { tr: '✅ POJO (Tip-Safe)', en: '✅ POJO (Type-Safe)' },
          code: `// IDE autocomplete + compile error
UserRequest req = UserRequest.builder()
    .name("Alice")   // .nme() → compile error!
    .job("QA")
    .build();

given().body(req)
    .post("/api/users");
// Jackson auto-converts to JSON`,
          note: { tr: 'IDE anında işaretler. Refactor otomatik.', en: 'IDE flags it instantly. Refactoring is automatic.' },
        },
      },
      {
        type: 'heading',
        text: { tr: 'Request POJO — Lombok ile Temiz Kod', en: 'Request POJO — Clean Code with Lombok' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// @Data     = @Getter + @Setter + @ToString + @EqualsAndHashCode
// @Builder  = UserRequest.builder().name("Alice").build()
// @JsonInclude(NON_NULL) = null fields are excluded from JSON output
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {

    private String name;    // JSON: "name"
    private String job;     // JSON: "job"

    // API expects "first_name" but Java convention is "firstName"
    @JsonProperty("first_name") // Serialized as "first_name" in JSON
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;
}

// Build with only name and job → null fields omitted:
UserRequest req = UserRequest.builder().name("Alice").job("QA").build();
// → {"name":"Alice","job":"QA"}

// Build with all fields:
UserRequest req2 = UserRequest.builder()
    .firstName("Alice").lastName("Smith").job("Senior QA").build();
// → {"first_name":"Alice","last_name":"Smith","job":"Senior QA"}`,
      },
      raRequestPojoStep,
      {
        type: 'heading',
        text: { tr: 'Response POJO — API Cevabını Nesneye Dönüştür', en: 'Response POJO — Deserialize API Response into an Object' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// reqres.in GET /api/users/2 response:
// { "data": { "id":2, "email":"janet.weaver@reqres.in",
//             "first_name":"Janet", "last_name":"Weaver" } }

// @JsonIgnoreProperties(ignoreUnknown = true) is REQUIRED on every response POJO
// It prevents UnrecognizedPropertyException if the API adds new fields later
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SingleUserResponse {

    @JsonProperty("data")
    private UserData data;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class UserData {
        private int id;
        private String email;

        @JsonProperty("first_name")   // JSON "first_name" → Java firstName
        private String firstName;

        @JsonProperty("last_name")
        private String lastName;
    }
}

// Usage:
@Test
void getUser_shouldDeserializeCorrectly() {
    SingleUserResponse response = given().spec(spec)
        .when().get("/api/users/2")
        .then().statusCode(200)
        .extract().body().as(SingleUserResponse.class); // Auto-deserialize

    assertEquals(2, response.getData().getId());
    assertEquals("Janet", response.getData().getFirstName());
    assertTrue(response.getData().getEmail().contains("@"));
}`,
      },
      raResponsePojoStep,
      {
        type: 'heading',
        text: { tr: 'ObjectMapper — Manuel Kontrol', en: 'ObjectMapper — Manual Control' },
      },
      {
        type: 'code',
        language: 'java',
        code: `ObjectMapper mapper = new ObjectMapper()
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    // Equivalent to @JsonIgnoreProperties(ignoreUnknown = true)

// 1. POJO → JSON String  (Serialization)
String json = mapper.writeValueAsString(new UserRequest("Alice", "QA"));
// → {"name":"Alice","job":"QA"}

// 2. JSON String → POJO  (Deserialization)
String responseBody = """{"id":"456","name":"Alice","createdAt":"2024-01-15"}""";
UserResponse user = mapper.readValue(responseBody, UserResponse.class);
System.out.println(user.getName()); // Alice

// 3. Read dynamically without a POJO (ObjectNode)
String body = given().spec(spec).get("/api/users/1").asString();
ObjectNode node = mapper.readValue(body, ObjectNode.class);
String email = node.get("data").get("email").asText();
System.out.println(email); // george.bluth@reqres.in`,
      },
      raPojoDeserializeFilm,
      {
        type: 'quiz',
        question: {
          tr: '@JsonIgnoreProperties(ignoreUnknown = true) neden önemlidir?',
          en: 'Why is @JsonIgnoreProperties(ignoreUnknown = true) important?',
        },
        options: [
          { id: 'a', text: { tr: 'Performansı artırır', en: 'It improves performance' } },
          { id: 'b', text: { tr: 'API yeni alan eklediğinde testlerin patlamasını önler', en: 'It prevents tests from blowing up when the API adds a new field' } },
          { id: 'c', text: { tr: 'Null alanları JSON\'a dahil etmez', en: 'It excludes null fields from JSON' } },
          { id: 'd', text: { tr: 'Serialization\'ı hızlandırır', en: 'It speeds up serialization' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'API geliştiricisi "avatar_thumb" gibi yeni bir alan ekleyebilir. Bunu POJO\'na eklemediysen UnrecognizedPropertyException fırlar. @JsonIgnoreProperties(ignoreUnknown = true) bu alanları sessizce atlar.',
          en: 'An API developer might add a new field like "avatar_thumb". Without this annotation, an UnrecognizedPropertyException is thrown. @JsonIgnoreProperties(ignoreUnknown = true) silently ignores unknown fields.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Java'da RestAssured ile API testleri yaparken neden model sınıflarımıza @JsonIgnoreProperties(ignoreUnknown = true) eklemeliyiz?",
            "en": "Why should we add @JsonIgnoreProperties(ignoreUnknown = true) to our model classes when performing API tests with RestAssured in Java?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "API yanıtında dönen JSON verisinin boyutunu küçültmek için",
                        "en": "To reduce the size of the JSON data returned in the API response"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "JSON yanıtında model sınıfımızda tanımlanmamış yeni alanlar olduğunda hata almamak için",
                        "en": "To avoid errors when there are new fields in the JSON response that are not defined in our model class"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Tüm alanların değerinin mutlaka dolu gelmesini zorunlu kılmak için",
                        "en": "To enforce that all fields must have a value"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "API sunucusunun performansını artırmak için",
                        "en": "To improve the performance of the API server"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Varsayılan olarak, Jackson kütüphanesi model sınıfınızda bulunmayan bir alan JSON'da geldiğinde patlar. Bu ayar, modelinizde tanımlanmayan fazladan verilerin göz ardı edilmesini sağlar ve geriye dönük uyumluluğu korur.",
            "en": "By default, the Jackson library throws an exception when a field exists in the JSON but not in your model class. This setting allows extra data not defined in your model to be ignored and maintains backward compatibility."
      }
}
},
    ],
  },

  // ── 5: Assertions ────────────────────────────────────────────────────────────
  {
    title: { tr: '✅ Assertions — Hamcrest Derinlemesine', en: '✅ Assertions — Hamcrest Deep Dive' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          tr: 'Hamcrest assertion\'ı, bir kalite kontrol memurunun ürün ölçüm raporuna benzer: "ölçülen: 10.2 mm, tolerans: 10.0±0.5, GEÇER" yazmak yerine sadece "GEÇER" demek yeterli değildir — ne ölçüldüğü, neyle karşılaştırıldığı ve fark ne kadar olduğu raporun kendisinde görünmeli. Peki `assertEquals(200, response.statusCode())` yeterli olmuyor mu; neden `assertThat(statusCode, equalTo(200))` gibi daha uzun syntax kullanılıyor? Çünkü `assertEquals` başarısız olduğunda sadece "expected: 200 but was: 401" yazar — Hamcrest ise "Expected: a value equal to <200> but: was <401>" yazar ve üstelik `hasItems`, `containsString`, `greaterThan`, `hasKey` gibi ifadeleri zincirlemenize izin verdiğinden tek satırda hem HTTP statusu hem body\'nin belirli alanını hem de response süresini doğrulayabilirsiniz. Java\'da JUnit\'in `assertAll()` ile birden fazla assertion\'ı bir arada çalıştırmak gibidir — fark şu ki Hamcrest\'in hata mesajı insan diline çok daha yakın. QA açısından gerçek tehlike: `assertTrue(response.statusCode() == 200)` başarısız olduğunda yalnızca "expected true but was false" yazar; aldığın gerçek status code görünmez — bu da CI log\'larında 50 satır arasında doğru kodu bulmaya çalışmak demektir.',
          en: 'A Hamcrest assertion is like a quality-control officer\'s measurement report: saying "PASS" is not enough — the report itself must show what was measured, what it was compared to, and by how much it differed. You might ask whether `assertEquals(200, response.statusCode())` is sufficient — why use the longer `assertThat(statusCode, equalTo(200))` syntax? Because when `assertEquals` fails it only writes "expected: 200 but was: 401" — Hamcrest writes "Expected: a value equal to <200> but: was <401>", and beyond that it lets you chain `hasItems`, `containsString`, `greaterThan`, and `hasKey` so you can verify the HTTP status, a specific body field value, and response time all in a single line. In Java this is similar to JUnit\'s `assertAll()` running multiple assertions together — the difference is that Hamcrest\'s error messages read almost like natural language. The real QA danger: when `assertTrue(response.statusCode() == 200)` fails it writes only "expected true but was false" — you cannot see the actual status code. That means hunting through 50 lines of CI logs to find the relevant code.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Tüm Önemli Hamcrest Matchers', en: 'All Important Hamcrest Matchers' },
      },
      {
        type: 'code',
        language: 'java',
        code: `import static org.hamcrest.Matchers.*;

.then()
    // ─── Equality ───────────────────────────────────────────
    .body("name", equalTo("Alice"))
    .body("name", not(equalTo("Bob")))
    .body("status", equalToIgnoringCase("ok"))

    // ─── Null checks ────────────────────────────────────────
    .body("id", notNullValue())
    .body("deletedAt", nullValue())
    .body("name", not(emptyString()))
    .body("name", not(blankString()))

    // ─── Numeric ────────────────────────────────────────────
    .body("age", greaterThan(0))
    .body("age", greaterThanOrEqualTo(18))
    .body("age", lessThan(150))
    .body("age", between(18, 65))

    // ─── String ─────────────────────────────────────────────
    .body("email", containsString("@"))
    .body("url", startsWith("https://"))
    .body("file", endsWith(".json"))
    .body("code", matchesPattern("[A-Z]{3}-\\\\d{4}"))

    // ─── Collections ────────────────────────────────────────
    .body("data", hasSize(6))
    .body("data", hasSize(greaterThan(0)))
    .body("data", not(empty()))
    .body("data.id", hasItem(3))
    .body("data.id", everyItem(greaterThan(0)))
    .body("data.name", everyItem(notNullValue()))

    // ─── Performance & Headers ──────────────────────────────
    .time(lessThan(3000L))
    .header("Content-Type", containsString("application/json"))

    // ─── Status ─────────────────────────────────────────────
    .statusCode(200)
    .statusCode(anyOf(equalTo(200), equalTo(201)));`,
      },
      raHamcrestMatchersStep,
      {
        type: 'heading',
        text: { tr: 'Soft Assertions — Tüm Hataları Topla', en: 'Soft Assertions — Collect All Failures' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Problem: normal assertion stops at the first failure
// Solution: SoftAssertions — run all, report all failures at once

import org.assertj.core.api.SoftAssertions;

@Test
void userResponse_allFieldsValidation() {
    Response response = given().spec(spec)
        .when().get("/api/users/2")
        .then().extract().response();

    SoftAssertions soft = new SoftAssertions();

    soft.assertThat(response.statusCode())
        .as("HTTP Status Code")   // Label shown in error message
        .isEqualTo(200);

    soft.assertThat(response.<Integer>path("data.id"))
        .as("User ID").isGreaterThan(0);

    soft.assertThat(response.<String>path("data.email"))
        .as("Email format")
        .contains("@").doesNotContain(" ");

    soft.assertThat(response.<String>path("data.first_name"))
        .as("First name").isNotBlank().hasSizeLessThan(100);

    soft.assertAll(); // Execute all assertions, report all failures together
}`,
      },
      raHamcrestMatcherFilm,
      {
        type: 'quiz',
        question: {
          tr: '.body("data.id", everyItem(greaterThan(0))) ne doğrular?',
          en: 'What does .body("data.id", everyItem(greaterThan(0))) verify?',
        },
        options: [
          { id: 'a', text: { tr: 'data dizisinin ilk id\'si 0\'dan büyük', en: 'The first id in the data array is greater than 0' } },
          { id: 'b', text: { tr: 'data dizisindeki tüm id değerleri 0\'dan büyük', en: 'All id values in the data array are greater than 0' } },
          { id: 'c', text: { tr: 'data dizisinde en az bir id 0\'dan büyük', en: 'At least one id in the data array is greater than 0' } },
          { id: 'd', text: { tr: 'data dizisinin boyutu 0\'dan büyük', en: 'The size of the data array is greater than 0' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'everyItem() koleksiyonun HER elemanının koşulu sağlamasını test eder. hasItem() ise en az birinin sağlamasını test eder.',
          en: 'everyItem() checks that EVERY element in the collection satisfies the condition. hasItem() checks that at least one element satisfies it.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "RestAssured'da .body(\"items.price\", hasItem(greaterThan(100))) ifadesi neyi kontrol eder?",
            "en": "What does the expression .body(\"items.price\", hasItem(greaterThan(100))) check in RestAssured?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "items listesindeki tüm fiyatların 100'den büyük olduğunu",
                        "en": "That all prices in the items list are greater than 100"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "items listesindeki en az bir fiyatın 100'den büyük olduğunu",
                        "en": "That at least one price in the items list is greater than 100"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "items listesindeki ilk fiyatın tam 100 olduğunu",
                        "en": "That the first price in the items list is exactly 100"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "items listesindeki toplam fiyatın 100'den büyük olduğunu",
                        "en": "That the total price in the items list is greater than 100"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "hasItem() hamcrest matcher'ı, koleksiyon içindeki öğelerden herhangi birinin verilen koşulu (greaterThan(100)) karşılayıp karşılamadığını kontrol eder. everyItem() ise listenin tamamını doğrular.",
            "en": "The hasItem() hamcrest matcher checks if any of the items in the collection satisfy the given condition (greaterThan(100)). Conversely, everyItem() validates the entire list."
      }
}
},
    {
      type: 'feynman-checkpoint',
      promptTr: 'RestAssured\'da Hamcrest Assertion nedir ve neden salt "== ile karşılaştır"dan daha iyidir? Sektöre yeni giren bir yazılımcıya anlat.',
      promptEn: 'What is a Hamcrest Assertion in RestAssured and why is it better than just "compare with =="? Explain to a software newcomer.',
      keywords: [['matcher','eşleştirici'], ['okunabilir','readable','equalTo','is('], ['hata mesajı','error message','fail message'], ['then','assertion'], ['body','json']],
      minScore: 3,
      modelAnswerTr: 'Hamcrest matcher\'ları "beklenen == gerçek mi?" sorusunu okunabilir bir dile çevirir: .body("name", equalTo("George")) "body\'deki name alanı George\'a eşit mi?" der. Düz == ile karşılaştırınca test patlayınca sadece "false" görürsün. Hamcrest ise "Expected: George, but was: Janet" gibi net bir mesaj verir — hangi alanın neden hatalı olduğunu anında anlarsın.',
      modelAnswerEn: 'Hamcrest matchers translate "is expected == actual?" into readable English: .body("name", equalTo("George")) says "is the name field in the body equal to George?". With plain == when a test fails you only see "false". Hamcrest gives you a clear message: "Expected: George, but was: Janet" — you instantly know which field failed and why.',
    },
    {
      type: 'http-flow-animation',
      method: 'GET',
      endpoint: '/api/users/2',
      dbQuery: 'SELECT id, name, email FROM users WHERE id = 2',
      statusCode: 200,
      expectedValue: '404',
      actualValue: '200',
    },
    ],
  },

  // ── 6: JSON Path & Schema ────────────────────────────────────────────────────
  {
    title: { tr: '🗂️ JSON Path & Schema Validation', en: '🗂️ JSON Path & Schema Validation' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: 'JSON Path, derin depolanmış verilere ulaşmak için kullanılan bir depo haritası gibidir: "3. koridorun 2. rafındaki 5. kutudaki kırmızı kutuyu bul" demek yerine `data.items[2].colors[4]` yazarsın — depo görevlisi koordinatı takip eder, her kutuyu açmaz. Peki response body\'yi `response.getBody().asString()` ile alıp split veya regex ile istediğim değere ulaşabiliyorum; neden JSON Path sözdizimini ayrıca öğrenmek gerekiyor? Çünkü `String.split(",")[3]` ile yazdığın kod, API bir alan sırasını değiştirdiğinde yanlış değeri çekmeye başlar ve test yanlış PASS verir — JSON Path ise alan adına göre gider, sıradan bağımsızdır. Java\'da `JSONObject` ile elle parse ederken her iç içe nesne için `getJSONObject("data").getJSONArray("users").getJSONObject(0).getString("email")` zincirlersen; JSON Path bunu tek `"data.users[0].email"` string\'ine indirir. QA açısından kritik senaryo: login response\'undaki `token` değerini alıp bir sonraki testin bearer header\'ına koymak istiyorsun — `String token = response.jsonPath().getString("token")` tek satırda halleder; SessionToken sınıfı yazmana gerek kalmaz ve zincirli test senaryolarında her adım bir öncekinin çıktısını JSON Path ile temiz taşır.',
          en: 'JSON Path is like a warehouse map to deeply stored items: instead of saying "find the red box in the 5th container on the 2nd shelf of aisle 3," you write `data.items[2].colors[4]` — the warehouse worker follows the coordinates without opening every box along the way. You might say you can get the response body with `response.getBody().asString()` and reach the value you want using split or regex — so why learn JSON Path? Because code like `String.split(",")[3]` starts pulling the wrong value the moment an API changes a field ordering, and the test issues a false PASS. JSON Path navigates by field name, independent of order. In Java, when parsing with `JSONObject` manually you chain `getJSONObject("data").getJSONArray("users").getJSONObject(0).getString("email")` for every nested object; JSON Path reduces that to a single `"data.users[0].email"` string. The critical QA scenario: you want to take the `token` value from a login response and put it in the next test\'s bearer header — `String token = response.jsonPath().getString("token")` does it in one line, no SessionToken class needed, and each step in a chained test scenario cleanly carries the previous output via JSON Path.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'extract() — Response\'dan Değer Çekme', en: 'extract() — Pulling Values from a Response' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Extract a String value
String email = given().spec(spec)
    .when().get("/api/users/2")
    .then().statusCode(200)
    .extract().path("data.email");
// → "janet.weaver@reqres.in"

// Extract a list (all emails on page 1)
List<String> emails = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.email");

// Get the full Response object to read multiple fields
Response res = given().spec(spec)
    .when().get("/api/users/2")
    .then().statusCode(200).extract().response();

String email2    = res.path("data.email");
String firstName = res.path("data.first_name");
int    id        = res.path("data.id");
String bodyStr   = res.asString();  // Entire body as a raw String`,
      },
      raExtractPathStep,
      {
        type: 'heading',
        text: { tr: 'Gelişmiş JSON Path — Groovy Filtreler', en: 'Advanced JSON Path — Groovy Filters' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Groovy GPath — conditional search inside arrays

// Email of the user where id == 3
String email = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.find { it.id == 3 }.email");

// Names of all users with id > 4
List<String> names = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.findAll { it.id > 4 }.first_name");

// Works in assertions too:
.then()
    .body("data.find { it.id == 2 }.email",
          equalTo("janet.weaver@reqres.in"))
    .body("data.findAll { it.id > 3 }.size()", greaterThan(0));`,
      },
      raGroovyFiltersStep,
      {
        type: 'heading',
        text: { tr: 'JSON Schema Validation — Kontrat Testi', en: 'JSON Schema Validation — Contract Testing' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Schema: src/test/resources/schemas/single-user-schema.json
// Defines: required fields, types, formats

import static io.restassured.module.jsv.JsonSchemaValidator.*;

@Test
void getUser_shouldMatchJsonSchema() {
    given().spec(spec)
    .when().get("/api/users/2")
    .then()
        .statusCode(200)
        // Validates structure, types and required fields — in one line!
        .body(matchesJsonSchemaInClasspath("schemas/single-user-schema.json"));
    // Is id an integer? Is email a string? Is first_name required?
    // All checked automatically.
}`,
      },
      {
        type: 'tip',
        content: {
          tr: 'JSON Schema Validation, microservice mimarisinde "API Kontrat Testi" için idealdir. Backend ekibi yeni bir alan eklediğinde veya bir alanın tipini değiştirdiğinde testlerin otomatik olarak bozulmasını sağlar.',
          en: 'JSON Schema Validation is ideal for "API Contract Testing" in microservice architectures. When the backend team adds a new field or changes a field type, your tests automatically break — which is exactly what you want.',
        },
      },
      raJsonPathExtractFilm,
      {
        type: 'quiz',
        question: {
          tr: 'extract().path("data.find { it.id == 3 }.email") ne döner?',
          en: 'What does extract().path("data.find { it.id == 3 }.email") return?',
        },
        options: [
          { id: 'a', text: { tr: 'data dizisindeki tüm email\'ler', en: 'All emails in the data array' } },
          { id: 'b', text: { tr: 'data dizisinde id=3 olan kullanıcının email\'i', en: 'The email of the user in the data array where id=3' } },
          { id: 'c', text: { tr: 'data dizisinin 3. elemanının email\'i (index 3)', en: 'The email of the 3rd element of the data array (index 3)' } },
          { id: 'd', text: { tr: 'Hata fırlatır', en: 'Throws an error' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'find { it.id == 3 } Groovy\'de "id alanı 3\'e eşit olan elemanı bul" demektir. data[3] ise dizinin 4. elemanıdır — tamamen farklı şeyler!',
          en: 'find { it.id == 3 } in Groovy means "find the element where the id field equals 3". data[3] returns the 4th element (index 3) — two completely different things!',
        },
      
        retryQuestion: {
      "question": {
            "tr": "extract().path(\"users.findAll { it.status == 'active' }.name\") ifadesi neyi döndürür?",
            "en": "What does extract().path(\"users.findAll { it.status == 'active' }.name\") return?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece aktif olan ilk kullanıcının adı",
                        "en": "The name of only the first active user"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tüm kullanıcıların isimleri",
                        "en": "The names of all users"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Status alanı 'active' olan tüm kullanıcıların isimlerinden oluşan bir liste",
                        "en": "A list of names for all users where the status field is 'active'"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Aktif kullanıcıların sayısını",
                        "en": "The count of active users"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "findAll Groovy'de koşulu sağlayan tüm öğeleri bir koleksiyon olarak döndürür. .name ifadesi ise bu filtrelenmiş listedeki her bir öğeden name alanını çeker.",
            "en": "findAll in Groovy returns all items that match the condition as a collection. The .name expression extracts the name field from each element in that filtered list."
      }
}
},
    ],
  },

  // ── 7: Test Chaining ─────────────────────────────────────────────────────────
  {
    title: { tr: '🔗 Test Zinciri — Gerçek E2E Senaryolar', en: '🔗 Test Chaining — Real E2E Scenarios' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⛓️',
        content: {
          tr: 'Zincirli API testi, bir lokantanın sipariş zincirini takip eden "mutfak takip sistemi" gibi çalışır: masa siparişi girmeden mutfağa yemek üretme isteği atılamaz, yemek teslim edilmeden ödeme alınamaz — her adım bir öncekinin state\'ini taşımak zorundadır. Peki her testi bağımsız yazmak daha güvenli değil mi; neden bir testin çıktısını diğerine geçirmek gerekiyor? Çünkü "kullanıcı oluştur → giriş yap → sepete ekle → sipariş ver → sil" akışındaki her adım gerçek bir kullanıcı session\'ı ve gerçek veri gerektirir — bunları stub\'larla test etsen, session timeout veya foreign key constraint gibi birleşim hataları gözden kaçar. Java\'da JUnit\'in `@TestMethodOrder(OrderAnnotation.class)` ile test sıralama yaptığında benzer bir bağımlılık zinciri kurarsın; REST Assured\'da ise her adımın response\'undan `jsonPath().getString("id")` veya `jsonPath().getString("token")` ile değer taşıyıp bir sonraki isteğin header\'ına veya body\'sine doğrudan koyarsın. QA açısından en yüksek değer: bu zinciri bir kez yazarsan, her sprint sonunda tam "happy path" akışını tek `mvn test -Dtest=E2EFlow` komutuyla doğrularsın — manuel tıklama hatası sıfır, yeniden üretim süresi sıfır, CI raporunda adım adım sonuç görünür.',
          en: 'A chained API test works like a "kitchen tracking system" following a restaurant\'s order chain: you cannot send a produce-food request to the kitchen before the table order has been entered, and you cannot take payment before the food has been delivered — every step must carry the state of the previous one. Is writing each test independently safer — why pass one test\'s output to another? Because the "create user → log in → add to cart → place order → delete" flow requires a real user session and real data at every step; testing with stubs means you miss combination failures like session timeouts or foreign key constraint violations. In Java, you build a similar dependency chain with JUnit\'s `@TestMethodOrder(OrderAnnotation.class)`; in REST Assured you carry a value from each step\'s response into the next request\'s header or body using `jsonPath().getString("id")` or `jsonPath().getString("token")`. The highest QA value: once you write this chain, at the end of every sprint you verify the full "happy path" flow with a single `mvn test -Dtest=E2EFlow` — zero manual click errors, zero reproduction time, step-by-step results visible in the CI report.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Tam E2E CRUD Zinciri (reqres.in)', en: 'Full E2E CRUD Chain (reqres.in)' },
      },
      {
        type: 'code',
        language: 'java',
        code: `@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserCrudE2ETest extends BaseTest {

    private static String createdUserId;
    private static String createdUserName;

    @Test @Order(1)
    @DisplayName("1️⃣ POST: Create new user")
    void step1_createUser() {
        UserRequest req = UserRequest.builder()
            .name("E2E Test User " + System.currentTimeMillis())
            .job("QA Automation")
            .build();

        createdUserId = given().spec(spec).body(req)
            .when().post("/api/users")
            .then().statusCode(201)
            .body("id", notNullValue())
            .extract().path("id");

        createdUserName = req.getName();
        assertNotNull(createdUserId, "Failed to get user ID!");
    }

    @Test @Order(2)
    @DisplayName("2️⃣ PUT: Update the user")
    void step2_updateUser() {
        assumeTrue(createdUserId != null, "step1 failed, skipping");

        given().spec(spec)
            .pathParam("id", createdUserId)
            .body(UserRequest.builder()
                .name(createdUserName + " UPDATED")
                .job("Senior QA").build())
        .when().put("/api/users/{id}")
        .then().statusCode(200)
            .body("name", equalTo(createdUserName + " UPDATED"))
            .body("updatedAt", notNullValue());
    }

    @Test @Order(3)
    @DisplayName("3️⃣ DELETE: Delete the user")
    void step3_deleteUser() {
        assumeTrue(createdUserId != null, "step1 failed, skipping");

        given().spec(spec).pathParam("id", createdUserId)
            .when().delete("/api/users/{id}")
            .then().statusCode(204);
    }
}`,
      },
      raTestChainFilm,
      {
        type: 'quiz',
        question: {
          tr: 'JUnit 5\'te test sırasını garantilemek için ne kullanılır?',
          en: 'What is used to guarantee test execution order in JUnit 5?',
        },
        options: [
          { id: 'a', text: '@TestOrder annotation' },
          { id: 'b', text: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) + @Order(n)' },
          { id: 'c', text: { tr: 'Metot isimleri alfabetik sıralanır', en: 'Method names are sorted alphabetically' } },
          { id: 'd', text: { tr: 'JUnit 5\'te test sırası garanti edilemez', en: 'Test order cannot be guaranteed in JUnit 5' } },
        ],
        correct: 'b',
        explanation: {
          tr: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) sınıf seviyesinde, @Order(n) metot seviyesinde eklenir.',
          en: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) is added at class level, @Order(n) at method level. @Order(1) runs first, @Order(2) runs second.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "JUnit 5'te belirli test metotlarını tanımlı bir sırayla çalıştırmak için ne yapmak gerekir?",
            "en": "What is required to execute specific JUnit 5 test methods in a defined order?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "@Test(order = 1)"
            },
            {
                  "id": "b",
                  "text": "@TestMethodOrder(MethodOrderer.OrderAnnotation.class) ve her metoda @Order(n) kullanımı"
            },
            {
                  "id": "c",
                  "text": "Metotların kod içerisindeki sıralamasını değiştirmek"
            },
            {
                  "id": "d",
                  "text": "@Execution(Order.ANNOTATION)"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Sıralamayı belirlemek için sınıf üzerinde @TestMethodOrder stratejisini belirtmeli ve test metotları üzerine @Order notasyonunu kullanarak öncelik değerlerini vermelisiniz.",
            "en": "To define order, you must specify the @TestMethodOrder strategy on the class and assign priority values using the @Order annotation on individual test methods."
      }
}
},
    ],
  },

  // ── 8: Real-Life Issues ──────────────────────────────────────────────────────
  {
    title: { tr: '🚨 Gerçek Hayat Sorunları ve Çözümleri', en: '🚨 Real-Life Problems and Solutions' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔧',
        content: {
          tr: 'REST Assured hatalarını debug etmek, bir elektrikçinin kablo arızası tespitine benzer: sigortayı değiştirmek yerine önce sigorta mı yoksa kablo mu arızalandığını tespit edersin — aksi hâlde yeni sigorta da yanacak. Peki hata mesajını google\'layıp çözümü uygulayabiliyorum; neden "neden oluyor" sorusunu ayrıca sormam gerekiyor? Çünkü `SSLHandshakeException` hata mesajı dört farklı nedenden çıkabilir: self-signed sertifika, süresi dolmuş CA, corporate proxy veya yanlış keystore — bunların hepsine aynı mesaj gelir ve yanlış nedene yanlış çözümü uygulamak (örn. `.relaxedHTTPSValidation()` ile tüm SSL\'i kapatmak) test ortamında çalışır ama production\'da güvenlik açığı bırakır. Java\'da Spring\'in `NestedRuntimeException`\'larını debug ederken "caused by" zincirini sonuna kadar okumak ne kadar kritikse, REST Assured\'da da `.log().all()` ile tam request/response\'u loglamak ve 401/403/404 farkını anlamak o kadar kritiktir. QA açısından en pahalı hata: "Connection refused" alıyorsun ve servisi yeniden başlatıyorsun — ama esas neden testin yanlış base URL\'e atıyor olması. `System.out.println(RestAssured.baseURI)` ile baseURI\'yi bir kez yazdırmak seni 2 saatlik debug süresinden kurtarır.',
          en: 'Debugging REST Assured errors is like an electrician diagnosing a cable fault: instead of replacing the fuse right away, you first determine whether it is the fuse or the cable that failed — otherwise the new fuse will blow too. You might say you can google the error message and copy a solution — why ask "why is this happening" separately? Because `SSLHandshakeException` can come from four different causes: a self-signed cert, an expired CA, a corporate proxy, or the wrong keystore — they all produce the same message. Applying the wrong fix to the wrong root cause (e.g., disabling all SSL with `.relaxedHTTPSValidation()`) works in the test environment but leaves a security hole in production. In Java, reading the entire "caused by" chain in Spring\'s NestedRuntimeException is just as critical as, in REST Assured, logging the full request/response with `.log().all()` and understanding the difference between 401, 403, and 404. The most expensive QA mistake: you get "Connection refused" and restart the service — but the real cause is your test hitting the wrong base URL. A single `System.out.println(RestAssured.baseURI)` saves you 2 hours of debug time.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 1: SSL Hatası', en: '🚨 Problem 1: SSL Error' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// ERROR: javax.net.ssl.SSLHandshakeException: PKIX path building failed
// Cause: Self-signed or expired certificate in dev/staging environment
// Fix: add setRelaxedHTTPSValidation() to RequestSpecBuilder (dev/test only!)

spec = new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .setRelaxedHTTPSValidation() // Skip SSL cert check — never in production!
    .build();

// Cause: App starts after tests in CI/CD
// Fix: health check loop
@BeforeAll
static void waitForService() throws InterruptedException {
    for (int i = 0; i < 10; i++) {
        try {
            int status = given().baseUri("https://api.example.com")
                .when().get("/health").statusCode();
            if (status == 200) return; // Ready!
        } catch (Exception ignored) {}
        System.out.println("Waiting... " + (i+1) + "/10");
        Thread.sleep(3000);
    }
    throw new RuntimeException("Service did not start in 30 seconds!");
}`,
      },
      raSslErrorStep,
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 2: Flaky Test', en: '🚨 Problem 2: Flaky Test' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Cause: Async operation — API returns 202 immediately but data takes time
// ❌ WRONG — checks before data is ready
given().post("/api/orders").then().statusCode(202);
given().get("/api/orders/latest").then().body("status", equalTo("PROCESSED"));
// status might still be "PENDING" → flaky!

// ✅ CORRECT — Awaitility polling
@Test
void createOrder_shouldEventuallyBeProcessed() {
    String orderId = given().spec(spec)
        .body(new OrderRequest("ITEM-001", 2))
        .when().post("/api/orders")
        .then().statusCode(202)
        .extract().path("id");

    Awaitility.await()
        .atMost(30, TimeUnit.SECONDS)       // Max wait time
        .pollInterval(2, TimeUnit.SECONDS)  // Check every 2 seconds
        .until(() -> {
            String status = given().spec(spec)
                .pathParam("id", orderId)
                .when().get("/api/orders/{id}")
                .then().statusCode(200)
                .extract().path("status");
            return "PROCESSED".equals(status);
        });
}`,
      },
      raFlakyAwaitilityStep,
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 3: Paralel Testlerde Veri Çakışması', en: '🚨 Problem 3: Data Collision in Parallel Tests' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// ❌ WRONG — fixed test data causes collisions in parallel runs
UserRequest req = new UserRequest("alice@test.com", "QA");

// ✅ CORRECT — unique data every time
// Method 1: UUID
String email = "user_" + UUID.randomUUID() + "@example.com";

// Method 2: Faker
Faker faker = new Faker();
UserRequest uniqueReq = UserRequest.builder()
    .name(faker.name().fullName())
    .job(faker.job().title())
    .build();

// Method 3: Cleanup in @AfterEach
private List<String> createdIds = new ArrayList<>();

@AfterEach
void cleanup() {
    createdIds.forEach(id ->
        given().spec(spec).pathParam("id", id)
            .when().delete("/api/users/{id}")
            .then().statusCode(anyOf(equalTo(204), equalTo(404)))
    );
    createdIds.clear();
}`,
      },
      raParallelDataCollisionStep,
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 4: 429 Rate Limiting & JSON Parse Hatası', en: '🚨 Problem 4: 429 Rate Limiting & JSON Parse Error' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Rate limit: API returns 429 Too Many Requests
// Fix: pause between tests or use a retry Filter
@BeforeEach
void rateLimitGuard() throws InterruptedException {
    Thread.sleep(500); // Wait 500ms before each test
}

// JSON parse error: UnrecognizedPropertyException
// Fix: @JsonIgnoreProperties(ignoreUnknown = true) on every response POJO

// JSON parse error: response is HTML, not JSON (error page)
// Fix: check status code BEFORE parsing
Response res = given().spec(spec).get("/api/users").then().extract().response();
if (res.statusCode() != 200) {
    System.err.println("Error body: " + res.asString()); // Print raw body
    fail("Expected 200, got: " + res.statusCode());
}
UserResponse user = res.as(UserResponse.class); // Only parse on 200`,
      },
      {
        type: 'error-dictionary',
          relatedTopicId: 'rest-assured-errors',
        framework: 'REST Assured',
        errors: [
          {
            error: 'javax.net.ssl.SSLHandshakeException',
            fullMessage: 'PKIX path building failed: unable to find valid certification path to requested target',
            cause: {
              tr: 'SSL sertifikası self-signed, süresi dolmuş veya CA tarafından tanınmıyor.',
              en: 'SSL certificate is self-signed, expired, or not recognized by the CA.',
            },
            solution: {
              tr: 'RequestSpecBuilder\'a .setRelaxedHTTPSValidation() ekle. Production\'da kullanma!',
              en: 'Add .setRelaxedHTTPSValidation() to RequestSpecBuilder. Never use in production!',
            },
            codeWrong: `new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .build(); // SSL error!`,
            codeFixed: `new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .setRelaxedHTTPSValidation() // Skip SSL
    .build();`,
          },
          {
            error: 'com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException',
            fullMessage: 'Unrecognized field "avatar_thumb" (class UserResponse), not marked as ignorable',
            cause: {
              tr: 'API yeni bir alan ekledi ("avatar_thumb"), ama response POJO\'sunda tanımlanmamış.',
              en: 'The API added a new field ("avatar_thumb") that is not defined in your response POJO.',
            },
            solution: {
              tr: 'Response POJO\'na @JsonIgnoreProperties(ignoreUnknown = true) ekle.',
              en: 'Add @JsonIgnoreProperties(ignoreUnknown = true) to your response POJO.',
            },
            codeWrong: `public class UserResponse {
    private int id;
    private String email;
    // New API field "avatar_thumb" → EXPLODES!
}`,
            codeFixed: `@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse {
    private int id;
    private String email;
    // Unknown fields are silently ignored
}`,
          },
          {
            error: '1 expectation failed — Expected status code <200> but was <401>',
            fullMessage: 'java.lang.AssertionError: 1 expectation failed. Expected status code <200> but was <401>.',
            cause: {
              tr: 'Token eksik, süresi dolmuş veya "Bearer " prefix\'i eksik.',
              en: 'Token is missing, expired, or the "Bearer " prefix is forgotten.',
            },
            solution: {
              tr: '.auth().oauth2(token) kullan — "Bearer " prefix\'ini otomatik ekler.',
              en: 'Use .auth().oauth2(token) — it adds the "Bearer " prefix automatically.',
            },
            codeWrong: `given()
    .header("Authorization", token) // Missing "Bearer " prefix!
    .get("/api/protected");`,
            codeFixed: `given()
    .auth().oauth2(token) // Adds "Bearer " automatically
    .get("/api/protected");`,
          },
          {
            error: 'io.restassured.path.json.exception.JsonPathException',
            fullMessage: 'No results for path: $.data.users',
            cause: {
              tr: 'JSON path yanlış. API response yapısı değişmiş veya yazım hatası var.',
              en: 'Wrong JSON path. The API response structure changed or there is a typo.',
            },
            solution: {
              tr: 'Önce response.asString() ile ham body\'yi yazdır, path\'i doğrula.',
              en: 'First print the raw body with response.asString(), then verify the path.',
            },
            codeWrong: `.extract().path("data.users[0].email")
// But response is: {"data": [{"email":"..."}]}
// "users" key does not exist!`,
            codeFixed: `System.out.println(response.asString()); // Print first
.extract().path("data[0].email")       // Correct path`,
          },
        ],
      },
      raFlakyTimeoutFilm,
      {
        type: 'quiz',
        question: {
          tr: '"Flaky test" için en yaygın çözüm nedir?',
          en: 'What is the most common fix for a flaky test?',
        },
        options: [
          { id: 'a', text: { tr: 'Thread.sleep(5000) ekle', en: 'Add Thread.sleep(5000)' } },
          { id: 'b', text: { tr: 'Testi sil', en: 'Delete the test' } },
          { id: 'c', text: { tr: 'Awaitility ile polling — koşul sağlanana kadar kontrol et', en: 'Polling with Awaitility — check until the condition is met' } },
          { id: 'd', text: { tr: 'Testi tek başına çalıştır', en: 'Run the test in isolation' } },
        ],
        correct: 'c',
        explanation: {
          tr: 'Thread.sleep sabit bekler — çok az ya da çok fazla. Awaitility\'de koşul sağlandığı an geçer. Hem güvenilir hem de hızlı.',
          en: 'Thread.sleep waits a fixed amount — too little or too much. Awaitility proceeds the moment the condition is met. Both reliable and fast.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Otomasyon testlerinde 'Flaky test' (kararsız test) probleminden kaçınmak için neden Thread.sleep yerine Awaitility kullanılmalıdır?",
            "en": "Why should Awaitility be used instead of Thread.sleep to avoid 'flaky tests' in automation?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Thread.sleep derleme hatalarına yol açar",
                        "en": "Thread.sleep causes compilation errors"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Awaitility testleri daha yavaş çalıştırır",
                        "en": "Awaitility makes tests run slower"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Awaitility dinamik bekleme sağlar ve testin koşul sağlanır sağlanmaz devam etmesine olanak tanır",
                        "en": "Awaitility provides dynamic waiting and allows the test to continue as soon as the condition is met"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Thread.sleep sadece production ortamında çalışır",
                        "en": "Thread.sleep only works in production"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Sabit beklemeler ya testi gereksiz yere yavaşlatır ya da yük altında hata vermesine sebep olur. Awaitility ile test, durum gerçekleştiği an devam ederek hem güvenli hem de optimize bir çalışma sunar.",
            "en": "Fixed waits either slow down tests unnecessarily or lead to failures under load. Awaitility allows the test to resume the moment the condition is satisfied, offering both reliability and optimization."
      }
}
},
    ],
  },

  // ── 9: Tool Comparison ────────────────────────────────────────────────────────
  {
    title: { tr: '🆚 API Test Araçları Karşılaştırması', en: '🆚 API Testing Tools Comparison' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚖️',
        content: {
          tr: 'API test aracı seçmek, bir inşaat şantiyesinde alet seçmek gibidir: vida için çekiç kullanılmaz, vida için tornavida kullanılır — ama tornavidanın da düz uçlu ve yıldız uçlu tipleri vardır ve hangisini kullanacağını vidanın kafası belirler. Peki "REST Assured her şeyi yapabiliyor" deniliyorsa neden Postman veya Karate\'yi de öğrenmek gerekiyor? Çünkü REST Assured Java koduyla yazılır — bu, bir tester\'ın API testi yapabilmesi için Java bileceği anlamına gelir; ürün sahibi bir acceptance testi yazmak isterse Karate\'nin Gherkin sözdizimi çok daha uygundur. Java\'da benzer ikilemi Maven ile Gradle arasında yaşarsın: ikisi de build yönetir ama Gradle Groovy/Kotlin DSL ile konfigürasyonu kolaylaştırır — tıpkı Karate\'nin REST Assured\'a kıyasla öğrenme eğrisini azaltması gibi. QA açısından doğru seçim kriterleri şunlardır: ekip Java biliyor ve CI\'ye gömülü otomatik regression suite isteniyor → REST Assured; developer veya BA ile birlikte acceptance testi senaryoları yazılıyor → Karate; hızlı exploratory test ve mock server gerekiyor → Postman/Newman. Yanlış araç seçimi "araç iyi değil" yanılgısına değil, "ekip onu öğrenmek için çok zaman harcadı ve hâlâ yavaş" gerçeğine yol açar.',
          en: 'Choosing an API test tool is like choosing equipment on a construction site: you do not drive a screw with a hammer, you use a screwdriver — but screwdrivers also come in flat-head and Phillips varieties, and which one you need is determined by the screw head, not your preference. If "REST Assured can do everything," why learn Postman or Karate too? Because REST Assured is written in Java — which means a tester needs to know Java to write API tests; if a product owner wants to write an acceptance test, Karate\'s Gherkin syntax is a much better fit. In Java you face a similar dilemma between Maven and Gradle: both manage builds, but Gradle makes configuration easier with a Groovy/Kotlin DSL — just as Karate lowers the learning curve compared to REST Assured. The correct QA selection criteria: the team knows Java and wants an automated regression suite embedded in CI → REST Assured; writing acceptance test scenarios with a developer or BA → Karate; quick exploratory testing and mock server needed → Postman/Newman. Choosing the wrong tool does not lead to "the tool is bad" — it leads to "the team spent too much time learning it and is still slow."',
        },
      },
      {
        type: 'table',
        headers: ['Feature', 'REST Assured', 'Postman', 'Karate DSL', 'RestTemplate'],
        rows: [
          ['Language', 'Java DSL', 'GUI + JS', 'Gherkin', 'Java (Spring)'],
          ['Learning curve', 'Medium', 'Low', 'Low', 'High'],
          ['CI/CD integration', '✅ Native', '⚠️ Newman', '✅ Native', '✅ Native'],
          ['POJO / Type safety', '✅ Full', '❌ None', '⚠️ Limited', '✅ Full'],
          ['JSON Path', '✅ Groovy GPath', '✅ Yes', '✅ Yes', '❌ Manual'],
          ['JSON Schema', '✅ Yes', '✅ Yes', '✅ Yes', '❌ No'],
          ['Mock server', '❌ No', '⚠️ Limited', '✅ Yes', '❌ No'],
          ['Allure reporting', '✅ Full', '❌ GUI only', '✅ Yes', '⚠️ JUnit XML'],
          ['Best for', 'Java API automation', 'Manual exploration', 'BDD / low-code', 'Spring internals'],
        ],
      },
      {
        type: 'comparison',
        left: {
          label: '☕ REST Assured (Java DSL)',
          code: `@Test
void createAndVerifyUser() {
  String id = given()
    .spec(spec)
    .body(new UserRequest("Alice","QA"))
  .when()
    .post("/api/users")
  .then()
    .statusCode(201)
    .body("name", equalTo("Alice"))
    .extract().path("id");

  assertNotNull(id);
}`,
          note: { tr: 'IDE autocomplete, derleme kontrolü, tip güvenliği.', en: 'IDE autocomplete, compile-time checks, type safety.' },
        },
        right: {
          label: '🥋 Karate DSL (Gherkin)',
          code: `Feature: User API

Scenario: Create user with POST
  Given url 'https://reqres.in'
  And path '/api/users'
  And request {name:'Alice',job:'QA'}
  When method POST
  Then status 201
  And match response.name == 'Alice'
  And match response.id != null`,
          note: { tr: 'Java bilmeyenler okuyabilir. IDE desteği zayıf.', en: 'Readable by non-Java developers. IDE support is weaker.' },
        },
      },
      raToolComparisonFilm,
      raToolChoiceStep,
      raToolChoicePractice,
      {
        type: 'quiz',
        question: {
          tr: 'Takımda Java bilen kimse yoksa hangi API test aracı daha uygun?',
          en: 'If nobody on the team knows Java, which API testing tool is more appropriate?',
        },
        options: [
          { id: 'a', text: 'REST Assured' },
          { id: 'b', text: { tr: 'Karate DSL — Gherkin diliyle, Java bilgisi gerekmez', en: 'Karate DSL — written in Gherkin, no Java knowledge required' } },
          { id: 'c', text: 'RestTemplate' },
          { id: 'd', text: 'HttpClient' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Karate DSL, Gherkin tabanlı Given/When/Then sözdizimi kullanır. Java kodu yazmadan API testleri yazılabilir.',
          en: 'Karate DSL uses Gherkin-based Given/When/Then syntax. API tests can be written without writing Java code. Both technical and non-technical team members can read them.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Kodlama bilgisi olmayan bir ekipte API otomasyonu için hangi araç tercih edilmelidir?",
            "en": "Which tool should be preferred for API automation in a team with no coding knowledge?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Postman (Scripting ile)",
                        "en": "Postman (with scripting)"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Karate DSL — Java gerektirmeden BDD yaklaşımıyla test imkanı sağlar",
                        "en": "Karate DSL — Provides BDD approach for testing without requiring Java"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "JUnit ile REST Assured",
                        "en": "REST Assured with JUnit"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "TestNG ile Java WebClient",
                        "en": "Java WebClient with TestNG"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Karate DSL, kodlama becerisi düşük veya olmayan ekipler için tasarlanmış, Gherkin sözdizimini kullanan ve Java'ya ihtiyaç duymayan bir API otomasyon aracıdır.",
            "en": "Karate DSL is an API automation tool designed for teams with little to no coding skills, utilizing Gherkin syntax and requiring no Java programming."
      }
}
},
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 🏗️ Framework Mimarisi (SOLID + POM) — CLAUDE.md §9.6 çoklu görünüm standardı
  // Referans pilot: gaugeData.js + seleniumData.js/playwrightData.js/cypressData.js
  // "Framework Mimarisi" bölümleri. restAssuredData GAUGE İLE AYNI iskelete sahip
  // (tek ağaç, sectionIndex deseni) — ama içerik REST Assured'a özgü yeniden
  // düşünüldü: Core katmanı DriverManager/ThreadLocal DEĞİL, RequestSpecBuilder
  // ile paylaşılan RequestSpecification'dır (BaseTest @BeforeAll static, dosya
  // başındaki raBaseTestStep zaten bu deseni tanıtıyordu — burada ÜZERİNE inşa
  // edildi). "POM" karşılığı klasik PageObject değil "Service Object" (UserService).
  // ══════════════════════════════════════════════════════════════════════════
  // ── 10: Framework Mimarisi (SOLID + POM) ────────────────────────────────────
  {
    title: { tr: '🏗️ Framework Mimarisi (SOLID + POM)', en: '🏗️ Framework Architecture (SOLID + POM)' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧾',
        content: {
          tr: 'Bu sekmeye kadar öğrendiğin her parça (given/when/then, POJO, auth, JSON path, test zinciri) tek başına çalışıyor ama HENÜZ bir mimariye bağlanmadı — dosyanın en başındaki `raBaseTestStep`\'te gördüğün "@BeforeAll static RequestSpecification spec" deseni tam olarak bu sekmenin temelidir, şimdi onu tüm katmanlarıyla inşa ediyoruz. RequestSpecBuilder, bir matbaanın antetli kağıt şablonudur: her belge (her istek) aynı logoyu/adresi (baseURI, ortak header\'lar, filtreler) yeniden çizmez, TEK bir şablonu kullanır. İkinci benzetme: Selenium\'daki DriverManager/WaitFactory ile karşılaştır — orada "hangi thread hangi driver\'ı alır" sorunu vardı, burada öyle bir sorun YOK çünkü HTTP isteği state\'siz (stateless) bir çağrıdır, paylaşılacak olan tarayıcı oturumu değil sadece İSTEK YAPILANDIRMASIdır (baseURI, content-type, filtreler). Peki given().baseUri(...).header(...) zaten her testte yazılabiliyorken, neden RequestSpecBuilder\'a ihtiyaç var — dört-beş satırı kopyalamak yetmez mi? Yeter, ama SADECE bir test sınıfı için; 30 test sınıfının HER birinde bu satırları tekrar yazarsan, ortam değiştiğinde (staging→prod baseURI) 30 dosya elle taranır. Java karşılaştırması: bu, Spring\'te paylaşılan bir `RestTemplate`/`WebClient` bean\'i kurmakla AYNI motivasyon — pahalı/tekrar eden yapılandırmayı merkezileştir. QA bağlamı: RequestSpecBuilder olmadan 30 test sınıfı varken API\'ye yeni bir zorunlu header eklenirse (örn. `X-API-Version`) 30 dosya kırılır; merkezi bir spec\'te bu TEK satırlık bir değişikliktir.',
          en: 'Every piece you have learned up to this tab (given/when/then, POJO, auth, JSON path, test chaining) works on its own but has NOT yet been wired into an architecture — the "@BeforeAll static RequestSpecification spec" pattern you saw in `raBaseTestStep` at the top of this file is EXACTLY the foundation of this tab; now we build all its layers. RequestSpecBuilder is a print shop\'s letterhead template: no document (no request) redraws the same logo/address (baseURI, shared headers, filters) from scratch, they all use ONE template. Second analogy: compare it to Selenium\'s DriverManager/WaitFactory — there, the problem was "which thread gets which driver"; here that problem does NOT exist, because an HTTP request is stateless — what gets shared is not a browser session, it is the REQUEST CONFIGURATION (baseURI, content-type, filters). But since given().baseUri(...).header(...) can already be written in every test, why do you need RequestSpecBuilder — isn\'t copying those four-five lines enough? It is, but ONLY for one test class; if you rewrite those lines in EVERY one of 30 test classes, an environment change (staging→prod baseURI) means scanning 30 files by hand. Java comparison: this is the SAME motivation as setting up a shared `RestTemplate`/`WebClient` bean in Spring — centralize expensive, repeated configuration. QA context: without RequestSpecBuilder, adding a new required header to the API (e.g. `X-API-Version`) breaks 30 files; with a centralized spec, it is a ONE-line change.',
        },
      },
      {
        type: 'framework-puzzle',
        title: { tr: 'REST Assured Framework\'ünü Adım Adım İnşa Et', en: 'Build Your REST Assured Framework Step by Step' },
        intro: {
          tr: 'Aşağıdaki 4 parça, bu sekmede birazdan tek tek inşa edeceğin mimarinin BÜYÜK RESMİ. Şimdilik hepsi kilitli — her parçanın kendi adımındaki "Kendin Dene" pratiğini ilk kez doğru bitirdiğinde, o parça burada kilitliden İNŞA EDİLDİ\'ye döner.',
          en: 'The 4 pieces below are the BIG PICTURE of the architecture you are about to build piece by piece in this tab. They all start locked — the first time you correctly finish that step\'s "Try It Yourself" practice, that piece flips from locked to BUILT.',
        },
        pieces: [
          {
            id: 'core-spec',
            emoji: '🧩',
            label: { tr: 'Core / RequestSpec Katmanı', en: 'Core / RequestSpec Layer' },
            desc: {
              tr: 'RequestSpecBuilder ile TEK bir paylaşılan RequestSpecification (baseURI + header + filtreler)',
              en: 'RequestSpecBuilder builds ONE shared RequestSpecification (baseURI + headers + filters)',
            },
            exerciseId: 'restassured-arch-requestspec-practice',
          },
          {
            id: 'service-object',
            emoji: '📦',
            label: { tr: '"POM" Yerine Service Object', en: 'Service Object Instead of "POM"' },
            desc: {
              tr: 'UserService, /users endpoint\'inin TÜM detaylarını gizler — test sadece iş metodunu çağırır',
              en: 'UserService hides ALL details of the /users endpoint — the test just calls a business method',
            },
            exerciseId: 'restassured-arch-service-object-practice',
          },
          {
            id: 'solid',
            emoji: '⚖️',
            label: { tr: 'SOLID Uygulaması', en: 'Applying SOLID' },
            desc: {
              tr: '5 prensip gerçek REST Assured kodunda — örn. OCP: yeni bir AuthProvider eklemek için mevcut kodu DEĞİŞTİRMEDEN genişlet',
              en: 'The 5 principles in real REST Assured code — e.g. OCP: extend with a new AuthProvider WITHOUT modifying existing code',
            },
            exerciseId: 'restassured-arch-ocp-authprovider-practice',
          },
          {
            id: 'test-data',
            emoji: '🔗',
            label: { tr: 'Test / Data Katmanı', en: 'Test / Data Layer' },
            desc: {
              tr: '@ParameterizedTest + @MethodSource ile data-driven API testleri',
              en: 'Data-driven API tests via @ParameterizedTest + @MethodSource',
            },
            exerciseId: 'restassured-arch-dataprovider-practice',
          },
        ],
      },

      {
        type: 'heading',
        text: { tr: '🧭 Adım 1 — Büyük Resim: RequestSpec Zinciri Mindmap', en: '🧭 Step 1 — The Big Picture: The RequestSpec Chain Mindmap' },
      },
      {
        type: 'text',
        content: {
          tr: 'Aynı mimari burada beş ayrı açıdan gösteriliyor: önce ana akış (bir test çağrıldığında istek nasıl kurulur), sonra kurulum akışı (pom.xml\'den BaseTest\'e, oradan test sınıfına), sonra "paralel çalışma" (JUnit5\'te static spec\'in sınıf seviyesindeki izolasyonu Selenium\'un ThreadLocal\'ından NEDEN farklıdır), sonra veri paylaşım kapsamı (static/instance/parametre scope\'u) ve son olarak her sınıfın "yapar/yapmaz" listesi.',
          en: 'The same architecture is shown here from five angles: first the main flow (how a request gets built when a test runs), then the setup flow (from pom.xml to BaseTest, then to the test class), then "parallel execution" (why the class-level isolation of a static spec in JUnit5 DIFFERS from Selenium\'s ThreadLocal), then the data-sharing scope (static/instance/parameter scope), and finally a "does / does not" list for every class.',
        },
      },
      {
        type: 'python-flow-diagram',
        titleTr: '1️⃣ Ana Akış — Bir @Test İsteği Nasıl Kurar?',
        titleEn: '1️⃣ Main Flow — How Does a @Test Build a Request?',
        steps: [
          { type: 'action', code: '@Test getUserReturnsCorrectEmail()', desc: 'declares the scenario — orchestration ONLY, no request config', descTr: 'senaryoyu bildirir — SADECE orkestrasyon, request config içermez' },
          { type: 'action', code: 'UserService.getUser(2)', desc: 'the Service Object — knows only its own endpoint and its own POJO', descTr: 'Service Object — sadece kendi endpoint\'ini ve kendi POJO\'sunu bilir' },
          { type: 'action', code: 'given().spec(sharedSpec)', desc: 'reuses the ONE RequestSpecification built once in BaseTest', descTr: 'BaseTest\'te BİR KEZ kurulan TEK RequestSpecification\'ı yeniden kullanır' },
          { type: 'action', code: '.when().get("/users/2")', desc: 'the real HTTP call — this is where the network request actually fires', descTr: 'gerçek HTTP çağrısı — ağ isteği TAM OLARAK burada tetiklenir' },
          { type: 'end', code: '.then().extract().as(User.class)', desc: 'SRP: response deserializes into a type-safe POJO, ready for assertion', descTr: 'SRP: yanıt tip-güvenli bir POJO\'ya dönüşür, assertion\'a hazırdır' },
        ],
      },
      {
        type: 'python-flow-diagram',
        titleTr: '2️⃣ Kurulum Akışı — BaseTest Her Test Sınıfına Nasıl Ulaşır?',
        titleEn: '2️⃣ Setup Flow — How Does BaseTest Reach Every Test Class?',
        steps: [
          { type: 'action', code: 'pom.xml', desc: 'rest-assured/json-path/jackson-databind dependencies — read once at build time', descTr: 'rest-assured/json-path/jackson-databind bağımlılıkları — build zamanında bir kez okunur' },
          { type: 'action', code: 'BaseTest (@BeforeAll static)', desc: 'builds the shared RequestSpecification ONCE per test class', descTr: 'paylaşılan RequestSpecification\'ı test sınıfı başına BİR KEZ kurar' },
          { type: 'end', code: 'class UserServiceTest extends BaseTest', desc: 'every test class EXTENDS BaseTest, never rebuilds the spec itself', descTr: 'her test sınıfı BaseTest\'i EXTENDS eder, spec\'i asla kendisi yeniden kurmaz' },
        ],
      },
      {
        type: 'subheading',
        text: { tr: '3️⃣ Paralel Çalışma — static spec, Selenium\'un ThreadLocal\'ından NEDEN Farklı?', en: '3️⃣ Parallel Execution — Why Does a static spec DIFFER from Selenium\'s ThreadLocal?' },
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🧱', label: { tr: 'Sınıf Seviyesi İzolasyon', en: 'Class-Level Isolation' }, desc: { tr: 'static alan, HER test sınıfının KENDİ kopyasına sahiptir — UserServiceTest.spec, OrderServiceTest.spec\'i asla göremez', en: 'A static field belongs to EACH test class\'s OWN copy — UserServiceTest.spec can never see OrderServiceTest.spec' } },
          { icon: '🔌', label: { tr: 'Stateless İstek', en: 'Stateless Request' }, desc: { tr: 'HTTP isteği kendi başına state taşımaz — paylaşılan şey bir "oturum" değil, sadece bir yapılandırma şablonudur', en: 'An HTTP request carries no state on its own — what is shared is not a "session", just a configuration template' } },
          { icon: '🧵', label: { tr: 'JUnit5 Paralel Sınıflar', en: 'JUnit5 Parallel Classes' }, desc: { tr: 'junit-platform.properties ile paralel sınıf koşumu açılırsa her sınıf kendi @BeforeAll\'unu bağımsız çalıştırır — ThreadLocal\'a hiç GEREK yoktur', en: 'If parallel class execution is enabled via junit-platform.properties, every class runs its own @BeforeAll independently — ThreadLocal is NOT needed at all' } },
        ],
      },
      {
        type: 'text',
        content: {
          tr: 'Selenium\'da ThreadLocal\'a ihtiyaç vardı çünkü paylaşılan şey bir WebDriver OTURUMUYDU — aynı process içindeki farklı thread\'ler aynı tarayıcıyı KARIŞTIRMASIN diye izolasyon gerekiyordu. REST Assured\'da paylaşılan şey ise bir RequestSpecification YAPILANDIRMASIdır — HTTP isteği doğası gereği stateless olduğu için, aynı spec\'i aynı anda 10 farklı test metodu KULLANSA bile birbirine karışmaz (her `given().spec(spec)` çağrısı kendi bağımsız isteğini oluşturur). Bu yüzden framework mimarin AÇISINDAN önemli olan şey ThreadLocal değil, static alanın SINIF seviyesinde doğru kurulmasıdır (her sınıf kendi @BeforeAll\'unda spec\'ini kendi kurar).',
          en: 'In Selenium, ThreadLocal was needed because what was shared was a WebDriver SESSION — isolation was required so different threads in the same process would not MIX UP the same browser. In REST Assured, what is shared is a RequestSpecification CONFIGURATION — since an HTTP request is stateless by nature, even if 10 different test methods USE the same spec at the same time, they never interfere with each other (every `given().spec(spec)` call builds its own independent request). So what matters FOR your framework architecture is not ThreadLocal, but the static field being set up correctly at the CLASS level (each class builds its own spec in its own @BeforeAll).',
        },
      },
      {
        type: 'subheading',
        text: { tr: '4️⃣ Veri Paylaşım Kapsamı — Neyin Ömrü Ne Kadar?', en: '4️⃣ Data-Sharing Scope — How Long Does Each Thing Live?' },
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🏛️', label: { tr: 'static (sınıf seviyesi)', en: 'static (class level)' }, desc: { tr: 'Kapsam: TÜM test sınıfı — RequestSpecification, @BeforeAll\'da BİR KEZ kurulur, tüm @Test metotları paylaşır', en: 'Scope: the WHOLE test class — RequestSpecification is built ONCE in @BeforeAll, shared by all @Test methods' } },
          { icon: '🧪', label: { tr: 'instance (metot seviyesi)', en: 'instance (method level)' }, desc: { tr: 'Kapsam: tek bir @Test metodu — bir POJO nesnesi (örn. User) o test için yeniden oluşturulur', en: 'Scope: a single @Test method — a POJO object (e.g. User) is recreated for that test' } },
          { icon: '📋', label: { tr: '@MethodSource', en: '@MethodSource' }, desc: { tr: 'Kapsam: parametreli test — bir veri akışı (Stream) her satır için testi BİR KEZ tetikler', en: 'Scope: a parameterized test — a data stream triggers the test ONCE per row' } },
        ],
      },
      {
        type: 'subheading',
        text: { tr: '5️⃣ Kim Ne Yapar? — Sınıf Sorumlulukları', en: '5️⃣ Who Does What? — Class Responsibilities' },
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          { icon: '🧪', label: { tr: '@Test metodu', en: '@Test method' }, desc: { tr: '✔ Senaryo akışı · ✔ Assertion · ✘ RequestSpec kurulumu içermez', en: '✔ Scenario flow · ✔ Assertions · ✘ Contains no RequestSpec setup' } },
          { icon: '📦', label: { tr: 'UserService (Service Object)', en: 'UserService (Service Object)' }, desc: { tr: '✔ Endpoint bilgisi · ✔ İş metodu · ✘ Assertion içermez', en: '✔ Endpoint knowledge · ✔ Business methods · ✘ Contains no assertions' } },
          { icon: '🧱', label: { tr: 'BaseTest', en: 'BaseTest' }, desc: { tr: '✔ @BeforeAll static spec kurulumu · ✔ Filtreler', en: '✔ @BeforeAll static spec setup · ✔ Filters' } },
          { icon: '📄', label: { tr: 'POJO (User, Order...)', en: 'POJO (User, Order...)' }, desc: { tr: '✔ Alan tanımları · ✔ Jackson serialize/deserialize · ✘ Mantık İÇERMEZ', en: '✔ Field definitions · ✔ Jackson serialize/deserialize · ✘ Contains NO logic' } },
          { icon: '🔌', label: { tr: 'AuthProvider', en: 'AuthProvider' }, desc: { tr: '✔ Kimlik doğrulama stratejisi · ✔ RequestSpecification\'a auth ekler', en: '✔ Authentication strategy · ✔ Adds auth to the RequestSpecification' } },
        ],
      },
      {
        type: 'video-scene',
        id: 'restassured-arch-requestspec-chain-film',
        title: {
          tr: '🎬 Bir @Test İsteği Nasıl Kurar? (ve Sınıf Seviyesi İzolasyon Kontrastı)',
          en: '🎬 How Does a @Test Build a Request? (and the Class-Level Isolation Contrast)',
        },
        xpReward: 15,
        sceneDurationMs: 3400,
        stageHeight: 260,
        actors: [
          { id: 'test',    emoji: '🧪', label: { tr: '@Test (getUserReturnsEmail)', en: '@Test (getUserReturnsEmail)' }, color: '#0ea5e9' },
          { id: 'service', emoji: '📦', label: { tr: 'UserService (Service Object)',  en: 'UserService (Service Object)' },  color: '#f59e0b' },
          { id: 'spec',    emoji: '🧩', label: { tr: 'RequestSpecification (static)', en: 'RequestSpecification (static)' }, color: '#8b5cf6' },
          { id: 'http',    emoji: '🌐', label: { tr: 'Gerçek HTTP İsteği',            en: 'Real HTTP Request' },            color: '#22c55e' },
          { id: 'pojo',    emoji: '📄', label: { tr: 'User.class (POJO)',             en: 'User.class (POJO)' },            color: '#10b981' },
          { id: 'otherClass', emoji: '🏛️', label: { tr: 'OrderServiceTest (ayrı sınıf)', en: 'OrderServiceTest (separate class)' }, color: '#ef4444' },
        ],
        scenes: [
          {
            caption: {
              tr: '@Test metodu çalışmaya başlıyor. Bu metot SADECE senaryoyu anlatır — hiçbir RequestSpecification kurulumu veya endpoint detayı içermez.',
              en: 'The @Test method starts running. This method ONLY narrates the scenario — it contains no RequestSpecification setup or endpoint detail.',
            },
            code: { tr: 'User user = userService.getUser(2);', en: 'User user = userService.getUser(2);' },
            positions: { test: { x: 12, y: 50, scale: 1.15, pulse: true } },
          },
          {
            caption: {
              tr: 'Adım 1 — UserService (Service Object) devreye girer: kendi endpoint\'ini (/users/{id}) bilir ama RequestSpecification\'ı SIFIRDAN kurmaz, BaseTest\'te HAZIR olanı ister.',
              en: 'Step 1 — UserService (the Service Object) takes over: it knows its own endpoint (/users/{id}) but does NOT build the RequestSpecification from scratch, it asks for the one that is ALREADY ready in BaseTest.',
            },
            code: { tr: 'given().spec(BaseTest.spec)', en: 'given().spec(BaseTest.spec)' },
            positions: {
              test: { x: 10, y: 50, opacity: 0.5, scale: 0.85 },
              service: { x: 32, y: 50, scale: 1.15, pulse: true },
            },
            beams: [{ from: 'test', to: 'service' }],
          },
          {
            caption: {
              tr: 'Adım 2 — Bu spec, TESTLERİN HİÇBİRİNİN yeniden kurmadığı, sınıf başlarken @BeforeAll\'da BİR KEZ inşa edilmiş TEK bir yapılandırmadır: baseURI + ortak header\'lar + loglama filtreleri.',
              en: 'Step 2 — this spec is the ONE configuration that NONE of the tests rebuild, built ONCE in @BeforeAll when the class starts: baseURI + shared headers + logging filters.',
            },
            code: { tr: 'new RequestSpecBuilder().setBaseUri(...).build()', en: 'new RequestSpecBuilder().setBaseUri(...).build()' },
            positions: {
              service: { x: 14, y: 50, opacity: 0.5, scale: 0.85 },
              spec: { x: 38, y: 50, scale: 1.2, pulse: true },
            },
            beams: [{ from: 'service', to: 'spec', color: '#8b5cf6' }],
          },
          {
            caption: {
              tr: 'Adım 3 — Spec hazır olunca gerçek HTTP isteği tetiklenir: GET /users/2 ağa çıkar, backend\'den GERÇEK bir yanıt döner.',
              en: 'Step 3 — once the spec is ready, the real HTTP request fires: GET /users/2 goes out over the network, and a REAL response comes back from the backend.',
            },
            code: { tr: '.when().get("/users/2")', en: '.when().get("/users/2")' },
            positions: {
              spec: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
              http: { x: 46, y: 50, scale: 1.25, pulse: true },
            },
            beams: [{ from: 'spec', to: 'http', color: '#22c55e' }],
          },
          {
            caption: {
              tr: 'Adım 4 — Ham JSON yanıt, .as(User.class) ile tip-güvenli bir POJO\'ya dönüşür — test artık string parse etmez, gerçek Java alanlarıyla (user.getEmail()) çalışır.',
              en: 'Step 4 — the raw JSON response becomes a type-safe POJO via .as(User.class) — the test no longer parses strings, it works with real Java fields (user.getEmail()).',
            },
            code: { tr: '.then().extract().as(User.class)', en: '.then().extract().as(User.class)' },
            positions: {
              http: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
              pojo: { x: 52, y: 50, scale: 1.2, pulse: true },
            },
            beams: [{ from: 'http', to: 'pojo', color: '#10b981' }],
          },
          {
            caption: {
              tr: 'Final (kontrast) — AYNI paket içindeki OrderServiceTest sınıfı KENDİ static spec\'ini KENDİ @BeforeAll\'unda kurar; bu iki sınıfın spec\'leri asla birbirine karışmaz. Selenium\'da bu izolasyonu ThreadLocal sağlardı; burada bunu sağlayan şey Java\'nın static alanının SINIF seviyesinde zaten izole olmasıdır — HTTP isteği stateless olduğu için ekstra bir mekanizmaya hiç GEREK yoktur.',
              en: 'Final (the contrast) — the OrderServiceTest class in the SAME package builds ITS OWN static spec in ITS OWN @BeforeAll; the two classes\' specs never mix. In Selenium, ThreadLocal provided this isolation; here, it comes from Java\'s static field already being isolated at the CLASS level — since an HTTP request is stateless, no extra mechanism is NEEDED at all.',
            },
            positions: {
              pojo: { x: 20, y: 30, scale: 0.9 },
              spec: { x: 48, y: 50, scale: 1.05 },
              otherClass: { x: 76, y: 50, scale: 1.25, pulse: true },
            },
            beams: [{ from: 'pojo', to: 'spec' }, { from: 'spec', to: 'otherClass', color: '#ef4444' }],
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Yukarıdaki mimaride bir @Test metodu, RequestSpecification\'ı NEREDEN alır?',
          en: 'In the architecture above, where does a @Test method get its RequestSpecification FROM?',
        },
        options: [
          { id: 'a', text: { tr: 'Kendi içinde new RequestSpecBuilder() ile sıfırdan kurar', en: 'It builds it from scratch itself with new RequestSpecBuilder()' } },
          { id: 'b', text: { tr: 'BaseTest\'in @BeforeAll static alanından, Service Object aracılığıyla', en: 'From BaseTest\'s @BeforeAll static field, via the Service Object' } },
          { id: 'c', text: { tr: 'pom.xml dosyasından doğrudan okur', en: 'It reads it directly from the pom.xml file' } },
          { id: 'd', text: { tr: 'Her @Test metodunun başında elle tanımlanır', en: 'It is manually defined at the top of every @Test method' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Mimarinin can damarı budur: RequestSpecification kurulum sorumluluğu TEK bir yerde (BaseTest\'in @BeforeAll\'u) toplanır, Service Object onu SADECE kullanır — bu ayrım olmasaydı her test sınıfı kendi spec\'ini kurar ve ortam değiştiğinde onlarca dosya elle güncellenirdi.',
          en: 'This is the artery of the architecture: RequestSpecification setup responsibility lives in ONE place (BaseTest\'s @BeforeAll), and the Service Object just USES it — without this split, every test class would build its own spec, and dozens of files would need manual updates whenever the environment changed.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir RequestSpecification\'ın static olarak paylaşılması, Selenium\'daki ThreadLocal\'a kıyasla NE FARK yaratır?',
            en: 'Compared to ThreadLocal in Selenium, what DIFFERENCE does sharing a RequestSpecification as static make?',
          },
          options: [
            { id: 'a', text: { tr: 'HTTP isteği stateless olduğu için ekstra bir izolasyon mekanizmasına (ThreadLocal gibi) gerek kalmaz', en: 'Since an HTTP request is stateless, no extra isolation mechanism (like ThreadLocal) is needed' } },
            { id: 'b', text: { tr: 'Hiçbir fark yaratmaz, ikisi de aynı mekanizmadır', en: 'It makes no difference, both are the same mechanism' } },
            { id: 'c', text: { tr: 'Tüm test sınıfları AYNI static spec\'i paylaşır', en: 'All test classes share the SAME static spec' } },
            { id: 'd', text: { tr: 'Sadece CI ortamında devreye girer', en: 'It only kicks in inside a CI environment' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Selenium\'da paylaşılan şey durumlu (stateful) bir WebDriver oturumuydu, bu yüzden ThreadLocal gerekiyordu. REST Assured\'da paylaşılan şey stateless bir yapılandırmadır (RequestSpecification) — aynı anda kullanılsa bile isteklerin birbirine karışması söz konusu değildir, ayrıca her sınıfın kendi static kopyası zaten bağımsızdır.',
            en: 'In Selenium, what was shared was a stateful WebDriver session, which is why ThreadLocal was needed. In REST Assured, what is shared is a stateless configuration (RequestSpecification) — even used concurrently, requests cannot interfere with each other, and each class\'s own static copy is already independent.',
          },
        },
      },

      // ── Adım 2 — Core / RequestSpec Katmanı ──
      {
        type: 'heading',
        text: { tr: '🧩 Adım 2 — Core / RequestSpec Katmanı: RequestSpecBuilder', en: '🧩 Step 2 — Core / RequestSpec Layer: RequestSpecBuilder' },
      },
      {
        type: 'simple-box',
        emoji: '📜',
        content: {
          tr: 'RequestSpecBuilder, bir restoran zincirinin TÜM şubelerinde kullanılan standart menü şablonudur: her şube (her test sınıfı) kendi menüsünü baştan tasarlamaz, TEK bir merkezi şablonu (baseURI, ortak header\'lar, loglama filtreleri) miras alır. İkinci benzetme: bir zarfın üzerindeki HAZIR pul ve adres şablonu gibi — her mektup (her istek) aynı bilgiyi elle yazmaz, zarfın KENDİSİ bu bilgiyi zaten taşır. Peki her testte given().baseUri(...).header(...) yazmak zaten mümkünken, neden ayrı bir RequestSpecBuilder sınıfı gerekiyor? Çünkü polling aralığını değiştirmek gibi (Selenium\'daki WaitFactory örneğini hatırla), API\'nin base URL\'ini veya bir zorunlu header\'ı değiştirmek HER teste kopyalanırsa, biri bir yerde eski URL\'i unutur ve suite tutarsızlaşır. Java karşılaştırması: bu, her sınıfın kendi `HttpClient`\'ını yaratması yerine tek bir merkezi client factory kullanmasıyla AYNI motivasyondur — pahalı/tekrar eden yapılandırmayı merkezileştir. QA bağlamı: RequestSpecBuilder\'daki `addFilter(new RequestLoggingFilter())` satırı atlanırsa, bir test CI\'da fail olduğunda hangi isteğin GERÇEKTEN gönderildiğini görmek için kod tekrar tekrar debug edilir — merkezi loglama bu israfı TEK satırla önler.',
          en: 'RequestSpecBuilder is the standard menu template used at every branch of a restaurant chain: no branch (no test class) designs its own menu from scratch, they all inherit ONE central template (baseURI, shared headers, logging filters). Second analogy: like the pre-printed stamp and address template on an envelope — no letter (no request) writes that information by hand, the envelope ITSELF already carries it. But since given().baseUri(...).header(...) can already be written in every test, why do you need a separate RequestSpecBuilder class? Because — just like changing the polling interval in Selenium\'s WaitFactory example — if changing the API\'s base URL or a required header is copied into EVERY test, someone forgets the old URL somewhere and the suite drifts into inconsistency. Java comparison: this is the SAME motivation as using one central client factory instead of every class creating its own `HttpClient` — centralize expensive, repeated configuration. QA context: if the `addFilter(new RequestLoggingFilter())` line in RequestSpecBuilder is skipped, when a test fails in CI, the code gets debugged over and over just to see what request was ACTUALLY sent — centralized logging prevents this waste with ONE line.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'BaseTest ile Service Object\'lerin AYRI olmasının nedeni de Single Responsibility Principle\'dır (SRP): BaseTest sadece "istek yapılandırması NASIL kurulur" sorusuna cevap verir, Service Object\'ler ise sadece "bu endpoint HANGİ iş kuralını uygular" sorusuna cevap verir. İkisini tek sınıfta birleştirseydin, bir ortam değişikliği (yeni bir zorunlu header) iş mantığı kodunu da değiştirmeni gerektirirdi.',
          en: 'The reason BaseTest and Service Objects are SEPARATE is also the Single Responsibility Principle (SRP): BaseTest answers only "HOW is the request configuration set up", while Service Objects answer only "WHICH business rule does this endpoint apply". Had you merged them into one class, an environment change (a new required header) would also force you to touch the business logic code.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `// ─── BaseTest.java — SADECE paylasilan RequestSpecification kurulumu (SRP) ───
package tests;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;

public abstract class BaseTest {

    protected static RequestSpecification spec;   // TUM sinif icin TEK kopya

    @BeforeAll
    static void setUpSpec() {
        spec = new RequestSpecBuilder()
            .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
            .setContentType("application/json")
            .addFilter(new RequestLoggingFilter())   // her istegi konsola yaz
            .addFilter(new ResponseLoggingFilter())  // her yaniti konsola yaz
            .build();
    }
}

// ─── UserServiceTest.java — BaseTest'i extends eder, spec'i YENIDEN KURMAZ ───
package tests;

import static io.restassured.RestAssured.given;
import org.junit.jupiter.api.Test;

class UserServiceTest extends BaseTest {

    @Test
    void getUserReturns200() {
        given().spec(spec)             // paylasilan spec YENIDEN KULLANILIR
            .when().get("/api/users/2")
            .then().statusCode(200);
    }
}`,
          en: `// ─── BaseTest.java — ONLY the shared RequestSpecification setup (SRP) ───
package tests;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;

public abstract class BaseTest {

    protected static RequestSpecification spec;   // ONE copy for the WHOLE class

    @BeforeAll
    static void setUpSpec() {
        spec = new RequestSpecBuilder()
            .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
            .setContentType("application/json")
            .addFilter(new RequestLoggingFilter())   // print every request to console
            .addFilter(new ResponseLoggingFilter())  // print every response to console
            .build();
    }
}

// ─── UserServiceTest.java — extends BaseTest, NEVER rebuilds the spec ───
package tests;

import static io.restassured.RestAssured.given;
import org.junit.jupiter.api.Test;

class UserServiceTest extends BaseTest {

    @Test
    void getUserReturns200() {
        given().spec(spec)             // the shared spec is REUSED
            .when().get("/api/users/2")
            .then().statusCode(200);
    }
}`,
        },
      },
      {
        type: 'step-animation',
        id: 'restassured-arch-requestspec-steps',
        title: { tr: 'Adım Adım: setUpSpec() Kaç Kez Çalışır?', en: 'Step by Step: How Many Times Does setUpSpec() Run?' },
        steps: [
          { id: 1, icon: '🏁', label: { tr: 'JUnit5 sınıfı yüklüyor', en: 'JUnit5 loads the class' }, detail: { tr: 'UserServiceTest çalışmaya başlamadan önce JUnit5, sınıftaki @BeforeAll işaretli static metodu ARAR.', en: 'Before UserServiceTest starts running, JUnit5 SEARCHES the class for a static method marked @BeforeAll.' } },
          { id: 2, icon: '1️⃣', label: { tr: 'setUpSpec() TAM OLARAK BİR KEZ çalışır', en: 'setUpSpec() runs EXACTLY ONCE' }, detail: { tr: '@BeforeAll static olduğu için, sınıftaki KAÇ TANE @Test metodu olursa olsun setUpSpec() sadece bir kez, tüm testlerden ÖNCE çalışır.', en: 'Because @BeforeAll is static, no matter HOW MANY @Test methods the class has, setUpSpec() runs only once, BEFORE all of them.' } },
          { id: 3, icon: '🧩', label: { tr: 'spec static alana atanır', en: 'spec is assigned to the static field' }, detail: { tr: 'RequestSpecBuilder().build() sonucu, sınıf seviyesindeki static spec alanına yazılır — artık HER @Test metodu buna erişebilir.', en: 'The result of RequestSpecBuilder().build() is written into the class-level static spec field — now EVERY @Test method can access it.' } },
          { id: 4, icon: '🔁', label: { tr: 'Her @Test AYNI spec\'i kullanır', en: 'Every @Test uses the SAME spec' }, detail: { tr: 'getUserReturns200() ve deleteUserReturns204() gibi farklı testler, given().spec(spec) ile AYNI nesneyi paylaşır — hiçbiri kendi spec\'ini kurmaz.', en: 'Different tests like getUserReturns200() and deleteUserReturns204() share the SAME object via given().spec(spec) — none of them builds its own spec.' } },
          { id: 5, icon: '🏛️', label: { tr: 'Başka bir sınıf KENDİ kopyasını kurar', en: 'Another class builds ITS OWN copy' }, detail: { tr: 'OrderServiceTest de BaseTest\'i extends ederse, KENDİ @BeforeAll\'unda KENDİ spec\'ini kurar — iki sınıfın static alanları asla karışmaz.', en: 'If OrderServiceTest also extends BaseTest, it builds ITS OWN spec in ITS OWN @BeforeAll — the two classes\' static fields never mix.' } },
        ],
      },
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'ch-restassured-arch-requestspec-order',
        question: {
          tr: 'RequestSpecBuilder ile paylaşılan bir spec kurmanın adımlarını mantıklı sıraya diz.',
          en: 'Arrange the steps of building a shared spec with RequestSpecBuilder in a logical order.',
        },
        items: [
          { id: '1', text: { tr: 'BaseTest\'te protected static RequestSpecification spec alanını tanımla', en: 'Define the protected static RequestSpecification spec field in BaseTest' }, order: 1 },
          { id: '2', text: { tr: '@BeforeAll static bir metotta new RequestSpecBuilder() başlat', en: 'Start new RequestSpecBuilder() inside a @BeforeAll static method' }, order: 2 },
          { id: '3', text: { tr: 'setBaseUri(...) ve setContentType(...) ile temel ayarları ekle', en: 'Add the basics with setBaseUri(...) and setContentType(...)' }, order: 3 },
          { id: '4', text: { tr: 'addFilter(...) ile request/response loglamayı ekle', en: 'Add request/response logging with addFilter(...)' }, order: 4 },
          { id: '5', text: { tr: 'Test sınıfında given().spec(spec) ile paylaşılan spec\'i kullan', en: 'Use the shared spec in the test class with given().spec(spec)' }, order: 5 },
        ],
        xpReward: 20,
      },
      {
        type: 'code-playground',
        relatedTopicId: 'restassured-framework-requestspec',
        id: 'restassured-arch-requestspec-practice',
        label: {
          tr: 'Micro Lab: setUpSpec()\'i loglama filtreleriyle tamamla',
          en: 'Micro Lab: complete setUpSpec() with logging filters',
        },
        language: 'java',
        task: {
          tr: 'Aşağıdaki setUpSpec() metodu baseURI ve content-type\'ı ayarlıyor ama TODO satırları eksik olduğu için hiçbir request/response loglaması YAPMIYOR — bir test CI\'da fail olduğunda hangi isteğin gönderildiğini görmenin yolu yok. TODO satırlarını, RequestLoggingFilter VE ResponseLoggingFilter\'ı ekleyecek şekilde tamamla.',
          en: 'The setUpSpec() method below sets baseURI and content-type, but because the TODO lines are missing, it does NOT log any request/response — when a test fails in CI, there is no way to see which request was sent. Complete the TODO lines to add BOTH RequestLoggingFilter AND ResponseLoggingFilter.',
        },
        explanation: {
          tr: 'Bu pratik gerçek bir HTTP isteği göndermez; amaç RequestSpecBuilder\'ın filtre zincirini elle tamamlayarak, merkezi loglamanın NEDEN debug süresini kısalttığını pekiştirmektir.',
          en: 'This is not a real HTTP session; the goal is to reinforce, by completing RequestSpecBuilder\'s filter chain yourself, WHY centralized logging shortens debugging time.',
        },
        code: {
          tr: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    .addFilter(new RequestLoggingFilter())
    .addFilter(new ResponseLoggingFilter())
    .build();`,
          en: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    .addFilter(new RequestLoggingFilter())
    .addFilter(new ResponseLoggingFilter())
    .build();`,
        },
        starterCode: {
          tr: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    TODO   // istek loglamayi ekle
    TODO   // yanit loglamayi ekle
    .build();`,
          en: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    TODO   // add request logging
    TODO   // add response logging
    .build();`,
        },
        solutionCode: {
          tr: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    .addFilter(new RequestLoggingFilter())
    .addFilter(new ResponseLoggingFilter())
    .build();`,
          en: `spec = new RequestSpecBuilder()
    .setBaseUri(System.getProperty("baseUri", "https://reqres.in"))
    .setContentType("application/json")
    .addFilter(new RequestLoggingFilter())
    .addFilter(new ResponseLoggingFilter())
    .build();`,
        },
        expected: {
          tr: 'İki TODO satırı .addFilter(new RequestLoggingFilter()) ve .addFilter(new ResponseLoggingFilter()) olmalı — bu iki filtre, her isteğin/yanıtın TAM içeriğini konsola yazar.',
          en: 'The two TODO lines must be .addFilter(new RequestLoggingFilter()) and .addFilter(new ResponseLoggingFilter()) — these two filters print the FULL content of every request/response to the console.',
        },
        hints: [
          { tr: 'addFilter() metodu zincire istediğin kadar filtre EKLEYEBİLİR — her filtre, isteğin/yanıtın belirli bir anında devreye girer.', en: 'The addFilter() method lets you CHAIN as many filters as you like — each filter kicks in at a specific moment of the request/response.' },
          { tr: 'RequestLoggingFilter GİDEN isteği (URL, header, body), ResponseLoggingFilter ise DÖNEN yanıtı (statusCode, body) konsola yazar — ikisi birbirini TAMAMLAR, biri diğerinin yerini tutmaz.', en: 'RequestLoggingFilter logs the OUTGOING request (URL, headers, body), ResponseLoggingFilter logs the RETURNED response (statusCode, body) — they COMPLEMENT each other, neither replaces the other.' },
          { tr: 'Bu filtreler BaseTest\'te bir kez eklendiğinde, o sınıfı extend eden HER test sınıfı otomatik olarak loglamaya sahip olur — tekrar eklemeye gerek yoktur.', en: 'Once these filters are added in BaseTest, EVERY test class extending it automatically gets logging — no need to add them again.' },
        ],
        xpReward: 15,
      },
      {
        type: 'quiz',
        question: {
          tr: '@BeforeAll static setUpSpec() metodu, bir test sınıfındaki KAÇ TANE @Test metodu için çalışır?',
          en: 'For HOW MANY @Test methods in a test class does the @BeforeAll static setUpSpec() method run?',
        },
        options: [
          { id: 'a', text: { tr: 'Her @Test metodu için ayrı ayrı bir kez', en: 'Once separately for every @Test method' } },
          { id: 'b', text: { tr: 'Tüm sınıf için TAM OLARAK bir kez, testlerden önce', en: 'EXACTLY once for the whole class, before the tests' } },
          { id: 'c', text: { tr: 'Hiç çalışmaz, elle çağrılması gerekir', en: 'It never runs, it must be called manually' } },
          { id: 'd', text: { tr: 'Sadece ilk test fail olursa çalışır', en: 'It only runs if the first test fails' } },
        ],
        correct: 'b',
        explanation: {
          tr: '@BeforeAll, JUnit5\'te SADECE static metotlarla çalışır ve sınıftaki TÜM @Test metotları başlamadan ÖNCE tam olarak BİR KEZ tetiklenir — bu, spec\'in her testte yeniden kurulmasının ÖNÜNE geçer.',
          en: '@BeforeAll in JUnit5 works ONLY with static methods and fires EXACTLY once, BEFORE all @Test methods in the class begin — this PREVENTS the spec from being rebuilt on every test.',
        },
        retryQuestion: {
          question: {
            tr: 'BaseTest\'e bir assertion (örn. statusCode kontrolü) yazmak neden yanlış bir tasarımdır?',
            en: 'Why is writing an assertion (e.g. a statusCode check) inside BaseTest a poor design choice?',
          },
          options: [
            { id: 'a', text: { tr: 'SRP\'yi ihlal eder — BaseTest SADECE kurulum yapmalı, doğrulama testin işidir', en: 'It violates SRP — BaseTest should ONLY set things up, verification is the test\'s job' } },
            { id: 'b', text: { tr: 'Java bunu teknik olarak engeller', en: 'Java technically blocks it' } },
            { id: 'c', text: { tr: 'Hiçbir sorun yaratmaz', en: 'It causes no problem' } },
            { id: 'd', text: { tr: 'Sadece performansı yavaşlatır', en: 'It only slows down performance' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'BaseTest\'e assertion yazarsan, farklı testler farklı doğrulama isteyebilirken hepsi AYNI zorunlu kontrolden geçer. Doğrulama HER ZAMAN @Test metodunun kendi sorumluluğunda kalmalı, BaseTest sadece paylaşılan yapılandırmayı KURMALI.',
            en: 'If you put an assertion in BaseTest, every test is forced through the SAME mandatory check even though different tests may want different verification. Verification should ALWAYS stay the @Test method\'s own responsibility, BaseTest should only SET UP the shared configuration.',
          },
        },
      },

      // ── Adım 3 — "POM" Yerine Service Object ──
      {
        type: 'heading',
        text: { tr: '📦 Adım 3 — "POM" Yerine Service Object: UserService', en: '📦 Step 3 — Service Object Instead of "POM": UserService' },
      },
      {
        type: 'simple-box',
        emoji: '🗂️',
        content: {
          tr: 'Service Object, Selenium\'daki LoginPage\'in API dünyasındaki karşılığıdır: LoginPage "#email" locator\'ının nerede olduğunu gizlerken, UserService "/users/{id}" endpoint\'inin tam yolunu, HTTP metodunu ve yanıtın hangi POJO\'ya dönüşeceğini gizler — test SADECE `userService.getUser(2)` çağırır. İkinci benzetme: bir bankanın "gişe memuru" gibi — müşteri (test) bankanın hangi hesap tablosunu, hangi SQL sorgusunu kullandığını BİLMEZ, sadece "bakiyemi göster" der; gişe memuru (Service Object) arka plandaki TÜM teknik detayı yönetir. Peki given().spec(spec).get("/users/2") zaten TEK satırken, neden ayrı bir UserService sınıfı yazalım — bu satırı olduğu gibi kopyalamak yetmez mi? Yeter, ama SADECE bir test için; 40 test metodunun HER birinde bu satırı tekrar yazarsan, endpoint path\'i değiştiğinde (`/users/{id}` → `/api/v2/users/{id}`) 40 dosya elle taranır. Java karşılaştırması: bu, bir DAO (Data Access Object) sınıfının veritabanı sorgularını iş mantığından İZOLE etmesiyle AYNI motivasyondur — "nasıl erişilir" ile "ne yapılır" ayrılır. QA bağlamı: Service Object\'siz bir projede API versiyon geçişi (v1→v2) 40 test dosyasını kırar; Service Object kullanan bir projede TEK dosya (UserService.java) güncellenir, 40 test hiç değişmeden yeni endpoint\'i kullanır.',
          en: 'A Service Object is Selenium\'s LoginPage counterpart in the API world: while LoginPage hides where the "#email" locator lives, UserService hides the exact path of the "/users/{id}" endpoint, its HTTP method, and which POJO the response becomes — the test just calls `userService.getUser(2)`. Second analogy: like a bank\'s teller — the customer (the test) does NOT KNOW which account table or SQL query the bank uses, they just say "show my balance"; the teller (the Service Object) manages ALL the technical detail behind the scenes. But since given().spec(spec).get("/users/2") is already ONE line, why write a separate UserService class — isn\'t copying that line as-is enough? It is, but ONLY for one test; if you rewrite that line in EVERY one of 40 test methods, when the endpoint path changes (`/users/{id}` → `/api/v2/users/{id}`) 40 files must be scanned by hand. Java comparison: this is the SAME motivation as a DAO (Data Access Object) class ISOLATING database queries from business logic — "how to access" is separated from "what to do". QA context: without a Service Object, an API version migration (v1→v2) breaks 40 test files; with one, ONE file (UserService.java) is updated, and 40 tests pick up the new endpoint automatically, unchanged.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'UserService ile POJO\'ların (User.java) AYRI olmasının nedeni de SRP\'dir: UserService SADECE "bu endpoint\'e NASIL erişilir" sorusuna cevap verir, POJO ise SADECE "yanıt HANGİ alanlardan oluşur" sorusuna cevap verir. UserService, POJO\'yu kullanır ama onun İÇİNDE mantık taşımaz — POJO sadece veri taşıyıcısıdır (data holder).',
          en: 'The reason UserService and POJOs (User.java) are SEPARATE is also SRP: UserService answers only "HOW is this endpoint accessed", while the POJO answers only "WHAT fields does the response consist of". UserService uses the POJO but carries no logic INSIDE it — the POJO is just a data holder.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `// ─── model/User.java — SADECE alan tanimlari, mantik ICERMEZ (POJO) ───
package model;

public class User {
    private int id;
    private String email;
    private String firstName;
    // getter/setter (Lombok @Data ile otomatik uretilebilir)
}

// ─── service/UserService.java — SADECE "bu endpoint'e NASIL erisilir" (Service Object) ───
package service;

import io.restassured.specification.RequestSpecification;
import model.User;
import static io.restassured.RestAssured.given;

public class UserService {

    private final RequestSpecification spec;

    public UserService(RequestSpecification spec) {
        this.spec = spec;   // BaseTest'ten paylasilan spec ENJEKTE edilir
    }

    public User getUser(int id) {
        return given().spec(spec)
            .when().get("/api/users/" + id)
            .then().statusCode(200)
            .extract().as(User.class);   // POJO'ya donusum BURADA olur
    }

    public User createUser(User newUser) {
        return given().spec(spec).body(newUser)
            .when().post("/api/users")
            .then().statusCode(201)
            .extract().as(User.class);
    }
}

// ─── UserServiceTest.java — SADECE senaryo, endpoint detayi BILMEZ ───
class UserServiceTest extends BaseTest {
    private final UserService userService = new UserService(spec);

    @Test
    void getUserReturnsCorrectEmail() {
        User user = userService.getUser(2);         // TEK satir, detay gizli
        assertThat(user.getEmail()).contains("@");
    }
}`,
          en: `// ─── model/User.java — ONLY field definitions, contains NO logic (POJO) ───
package model;

public class User {
    private int id;
    private String email;
    private String firstName;
    // getters/setters (can be auto-generated with Lombok @Data)
}

// ─── service/UserService.java — ONLY "HOW is this endpoint accessed" (Service Object) ───
package service;

import io.restassured.specification.RequestSpecification;
import model.User;
import static io.restassured.RestAssured.given;

public class UserService {

    private final RequestSpecification spec;

    public UserService(RequestSpecification spec) {
        this.spec = spec;   // the spec shared from BaseTest is INJECTED
    }

    public User getUser(int id) {
        return given().spec(spec)
            .when().get("/api/users/" + id)
            .then().statusCode(200)
            .extract().as(User.class);   // conversion to POJO happens HERE
    }

    public User createUser(User newUser) {
        return given().spec(spec).body(newUser)
            .when().post("/api/users")
            .then().statusCode(201)
            .extract().as(User.class);
    }
}

// ─── UserServiceTest.java — ONLY the scenario, does NOT know endpoint details ───
class UserServiceTest extends BaseTest {
    private final UserService userService = new UserService(spec);

    @Test
    void getUserReturnsCorrectEmail() {
        User user = userService.getUser(2);         // ONE line, detail hidden
        assertThat(user.getEmail()).contains("@");
    }
}`,
        },
      },
      {
        type: 'step-animation',
        id: 'restassured-arch-service-object-steps',
        title: { tr: 'Adım Adım: userService.getUser(2) Ham Yanıtı POJO\'ya Nasıl Dönüştürür?', en: 'Step by Step: How Does userService.getUser(2) Turn the Raw Response into a POJO?' },
        steps: [
          { id: 1, icon: '☎️', label: { tr: 'Test getUser(2) çağırır', en: 'The test calls getUser(2)' }, detail: { tr: 'Test, userService.getUser(2) çağırır — endpoint path\'ini, HTTP metodunu veya JSON şeklini hiç BİLMEZ, sadece bir kullanıcı ID\'si verir.', en: 'The test calls userService.getUser(2) — it does not KNOW the endpoint path, HTTP method, or JSON shape, it just provides a user ID.' } },
          { id: 2, icon: '🧩', label: { tr: 'UserService paylaşılan spec\'i kullanır', en: 'UserService uses the shared spec' }, detail: { tr: 'given().spec(spec) çağrısı, constructor\'da enjekte edilen AYNI RequestSpecification\'ı kullanır — BaseTest\'in kurduğu şey burada TEKRAR KULLANILIR.', en: 'The given().spec(spec) call uses the SAME RequestSpecification injected in the constructor — what BaseTest set up gets REUSED here.' } },
          { id: 3, icon: '🌐', label: { tr: 'Gerçek GET isteği gönderilir', en: 'The real GET request is sent' }, detail: { tr: '.when().get("/api/users/2") ağa çıkar — backend GERÇEK bir JSON yanıtı döner: {"id":2,"email":"...","first_name":"..."}.', en: '.when().get("/api/users/2") goes out over the network — the backend returns a REAL JSON response: {"id":2,"email":"...","first_name":"..."}.' } },
          { id: 4, icon: '✅', label: { tr: '.then().statusCode(200) doğrulanır', en: '.then().statusCode(200) is verified' }, detail: { tr: 'UserService, POJO\'ya dönüşmeden ÖNCE statusCode\'un 200 olduğunu doğrular — yanlış bir statüde POJO dönüşümüne HİÇ geçilmez.', en: 'Before converting to a POJO, UserService verifies the statusCode is 200 — with a wrong status, POJO conversion is NEVER even attempted.' } },
          { id: 5, icon: '📄', label: { tr: '.extract().as(User.class) POJO üretir', en: '.extract().as(User.class) produces the POJO' }, detail: { tr: 'Jackson, JSON alanlarını User sınıfının alanlarına eşler — test artık user.getEmail() gibi GERÇEK Java metotlarıyla çalışır, string parse etmez.', en: 'Jackson maps the JSON fields onto the User class\'s fields — the test now works with REAL Java methods like user.getEmail(), not string parsing.' } },
        ],
      },
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'ch-restassured-arch-service-object-order',
        question: {
          tr: 'userService.getUser(id) çağrısının katmanlar arası akışını doğru sıraya diz.',
          en: 'Arrange the cross-layer flow of the userService.getUser(id) call in the correct order.',
        },
        items: [
          { id: '1', text: { tr: 'Test: userService.getUser(2) çağrılır', en: 'Test: userService.getUser(2) is called' }, order: 1 },
          { id: '2', text: { tr: 'UserService: constructor\'da enjekte edilen spec\'i given().spec() ile kullanır', en: 'UserService: uses the spec injected in the constructor via given().spec()' }, order: 2 },
          { id: '3', text: { tr: 'Gerçek GET isteği /api/users/2\'ye gönderilir', en: 'The real GET request is sent to /api/users/2' }, order: 3 },
          { id: '4', text: { tr: '.then().statusCode(200) ile yanıt doğrulanır', en: 'The response is verified with .then().statusCode(200)' }, order: 4 },
          { id: '5', text: { tr: '.extract().as(User.class) ile POJO\'ya dönüştürülür', en: 'It is converted to a POJO with .extract().as(User.class)' }, order: 5 },
        ],
        xpReward: 20,
      },
      {
        type: 'code-playground',
        relatedTopicId: 'restassured-framework-service-object',
        id: 'restassured-arch-service-object-practice',
        label: {
          tr: 'Micro Lab: UserService.createUser()\'ı POJO döndürecek şekilde tamamla',
          en: 'Micro Lab: complete UserService.createUser() so it returns a POJO',
        },
        language: 'java',
        task: {
          tr: 'Aşağıdaki createUser() metodu isteği doğru gönderiyor ama TODO satırı eksik olduğu için yanıtı hiçbir POJO\'ya DÖNÜŞTÜRMÜYOR — metot derlenmiyor çünkü User dönmesi gerekiyor. TODO satırını, yanıtı User.class\'a dönüştürecek şekilde tamamla.',
          en: 'The createUser() method below sends the request correctly, but because the TODO line is missing, it never CONVERTS the response into a POJO — the method does not compile because it must return a User. Complete the TODO line so it converts the response into User.class.',
        },
        explanation: {
          tr: 'Bu pratik gerçek bir HTTP isteği göndermez; amaç Service Object\'in "ham yanıtı tip-güvenli bir nesneye çevir" sorumluluğunu elle tamamlayarak pekiştirmektir.',
          en: 'This is not a real HTTP session; the goal is to reinforce, by completing it yourself, the Service Object\'s responsibility of "converting the raw response into a type-safe object".',
        },
        code: {
          tr: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        .extract().as(User.class);
}`,
          en: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        .extract().as(User.class);
}`,
        },
        starterCode: {
          tr: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        TODO;   // yaniti User.class'a donustur
}`,
          en: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        TODO;   // convert the response into User.class
}`,
        },
        solutionCode: {
          tr: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        .extract().as(User.class);
}`,
          en: `public User createUser(User newUser) {
    return given().spec(spec).body(newUser)
        .when().post("/api/users")
        .then().statusCode(201)
        .extract().as(User.class);
}`,
        },
        expected: {
          tr: 'TODO satırı .extract().as(User.class) olmalı — extract() yanıt gövdesini çıkarır, as(User.class) ise Jackson ile onu User nesnesine dönüştürür.',
          en: 'The TODO line must be .extract().as(User.class) — extract() pulls out the response body, and as(User.class) uses Jackson to convert it into a User object.',
        },
        hints: [
          { tr: '.extract() yanıt gövdesine erişim sağlar; .as(SinifAdi.class) ise Jackson kütüphanesini kullanarak JSON\'ı o sınıfın bir örneğine dönüştürür.', en: '.extract() gives access to the response body; .as(ClassName.class) uses the Jackson library to convert the JSON into an instance of that class.' },
          { tr: 'Metodun dönüş tipi User olduğu için, zincirin SONUNDA bir User nesnesi üretilmesi gerekir — statusCode(201) sadece doğrulama yapar, bir değer DÖNDÜRMEZ.', en: 'Since the method\'s return type is User, the chain must produce a User object at the END — statusCode(201) only verifies, it does NOT return a value.' },
          { tr: 'Jackson, JSON alan adlarını (örn. "first_name") POJO\'nun alan adlarıyla (firstName) otomatik eşler — alan adı UYUŞMAZSA dönüşüm sessizce null bırakabilir.', en: 'Jackson automatically maps JSON field names (e.g. "first_name") to the POJO\'s field names (firstName) — if the field name does NOT match, the conversion can silently leave it null.' },
        ],
        xpReward: 15,
      },
      {
        type: 'quiz',
        question: {
          tr: 'UserService.getUser() metodu neden bir POJO (User) döndürür, ham bir JSON string DEĞİL?',
          en: 'Why does the UserService.getUser() method return a POJO (User), NOT a raw JSON string?',
        },
        options: [
          { id: 'a', text: { tr: 'Test kodunun tip-güvenli Java alanlarıyla (user.getEmail()) çalışmasını sağlar, string parse etmesini ÖNLER', en: 'It lets test code work with type-safe Java fields (user.getEmail()), PREVENTING string parsing' } },
          { id: 'b', text: { tr: 'REST Assured JSON string döndürmeyi teknik olarak engeller', en: 'REST Assured technically blocks returning a JSON string' } },
          { id: 'c', text: { tr: 'Performansı artırmak için', en: 'To improve performance' } },
          { id: 'd', text: { tr: 'Sadece POST istekleri için gereklidir', en: 'It is only necessary for POST requests' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'Ham bir JSON string ile çalışsaydın, her alan adı bir string literal olurdu ve bir typo (örn. "emial") derleme zamanında YAKALANMAZDI. POJO ile IDE otomatik tamamlama sağlar ve yanlış alan adı DERLEME HATASI verir — bu, Selenium\'da @FindBy proxy\'lerinin sağladığı tip güvenliğiyle AYNI motivasyondur.',
          en: 'If you worked with a raw JSON string, every field name would be a string literal, and a typo (e.g. "emial") would NOT be CAUGHT at compile time. With a POJO, the IDE offers autocomplete and a wrong field name gives a COMPILE ERROR — this is the SAME motivation as the type safety Selenium\'s @FindBy proxies provide.',
        },
        retryQuestion: {
          question: {
            tr: 'UserService\'in RequestSpecification\'ı constructor üzerinden ENJEKTE alması (kendi başına kurmaması) hangi prensibi uygular?',
            en: 'UserService receiving its RequestSpecification via constructor INJECTION (instead of building it itself) applies which principle?',
          },
          options: [
            { id: 'a', text: { tr: 'Dependency Inversion (DIP) — yüksek seviye kod somut kuruluma değil dışarıdan verilen bir soyutlamaya bağlı olmalı', en: 'Dependency Inversion (DIP) — high-level code should depend on an externally supplied abstraction, not concrete construction' } },
            { id: 'b', text: { tr: 'Interface Segregation (ISP)', en: 'Interface Segregation (ISP)' } },
            { id: 'c', text: { tr: 'Hiçbiri', en: 'None' } },
            { id: 'd', text: { tr: 'Sadece OCP', en: 'Only OCP' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'UserService kendi RequestSpecification\'ını yaratmak yerine dışarıdan (BaseTest\'ten) alır — bu, UserService\'in test ortamına (staging, prod, mock) bağımlı olmadan, sadece "bir spec verilecek" varsayımıyla çalışmasını sağlar.',
            en: 'UserService receives its RequestSpecification from outside (from BaseTest) instead of creating it itself — this lets UserService work without depending on the test environment (staging, prod, mock), just assuming "a spec will be provided".',
          },
        },
      },

      // ── Adım 4 — SOLID Uygulaması (OCP odaklı): AuthProvider ──
      {
        type: 'heading',
        text: { tr: '⚖️ Adım 4 — SOLID Prensipleri REST Assured Kodunda', en: '⚖️ Step 4 — SOLID Principles in REST Assured Code' },
      },
      {
        type: 'simple-box',
        emoji: '🔑',
        content: {
          tr: 'SOLID beş prensip, bir otel anahtar kartı sistemidir: her kart tipi TEK bir yetki seviyesini taşır (SRP — misafir kartı sadece odaya girer), yeni bir yetki seviyesi (personel, yönetici) eklemek için mevcut kart okuyucuları SÖKMEZSİN, yeni bir kart TİPİ tanımlarsın (OCP), aynı okuyucu HER kart tipini aynı şekilde kabul eder (LSP), oda kartının arayüzü sadece kapı açmayı gösterir asansör yetkisini değil (ISP), ve kart okuyucular belirli bir kart markasına değil ORTAK bir standarda (RFID) bağlıdır (DIP). İkinci benzetme: OCP bir elektrik prizine yeni bir cihaz takmak gibidir — prizin İÇİNİ AÇMAZSIN, standart bir soketi kullanırsın. Peki testler zaten Basic Auth ile çalışıyorken, neden bu prensiplere uğraşıyoruz — proje Bearer token da destekleyecekse UserService\'e "if useBearer ise..." eklemek daha hızlı değil mi? Kısa vadede evet; ama Service Object içine her yeni auth türü için if/else eklemek, o sınıfı her değişiklikte yeniden test etmeni ve mevcut Basic Auth senaryolarını kırma riskini getirir. Java karşılaştırması: bu tam olarak bir `PaymentStrategy` arayüzüdür — `Checkout` sınıfının içini değiştirmeden yeni ödeme yöntemleri eklersin; burada da auth yöntemlerini aynı şekilde takılabilir hale getirebilirsin. QA bağlamı: OCP\'ye uyan bir auth katmanında "bu proje için OAuth2\'yi de destekleyelim" kararı, mevcut 30 Basic-Auth testinin hiçbirine dokunmadan tek bir yeni sınıfla çözülür — dokunmadığın kod, kıramadığın koddur.',
          en: 'The five SOLID principles are a hotel key card system: each card type carries ONE authority level (SRP — a guest card only opens a room), to add a new authority level (staff, manager) you do not DISMANTLE the existing card readers, you define a new card TYPE (OCP), the same reader accepts every card type the same way (LSP), a room card\'s interface shows only door access, not elevator authority (ISP), and card readers depend on a COMMON standard (RFID), not one specific card brand (DIP). Second analogy: OCP is like plugging a new device into a power outlet — you do not OPEN UP the outlet, you use a standard socket. But if the tests already work with Basic Auth, why bother with these principles — if the project needs to support Bearer tokens too, isn\'t adding "if useBearer..." to UserService faster? Short-term yes; but adding if/else inside the Service Object for every new auth type forces you to retest that class on every change and risks breaking the existing Basic Auth scenarios. Java comparison: this is exactly a `PaymentStrategy` interface — you add new payment methods without changing the inside of the `Checkout` class; here you can make auth methods just as pluggable. QA context: in an auth layer that respects OCP, the decision to "let\'s also support OAuth2 for this project" is solved with a single new class, without touching any of the existing 30 Basic-Auth tests — the code you do not touch is the code you cannot break.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Beş prensibin REST Assured karşılığı: SRP — BaseTest sadece kurulum, UserService sadece endpoint mantığı (Adım 2-3). OCP — yeni bir auth türü eklemek için mevcut kodu değiştirmeden yeni sınıf ekle (aşağıda). LSP — her AuthProvider, "isteğe kimlik ekleyen bir şey" beklenen her yerde sorunsuz kullanılabilir olmalı. ISP — bir Service Object\'e kullanmayacağı metotları içeren şişkin bir arayüz dayatma. DIP — Service Object somut bir auth mekanizmasına değil bir soyutlamaya (arayüz) bağlı olmalı. Aşağıda OCP\'yi somut bir "Anti-Pattern vs SOLID" çiftiyle inceliyoruz.',
          en: 'The REST Assured mapping of the five principles: SRP — BaseTest only sets up, UserService only holds endpoint logic (Steps 2-3). OCP — add a new auth type by adding a new class without modifying existing code (below). LSP — every AuthProvider must be usable wherever "something that adds identity to a request" is expected. ISP — do not impose a bloated interface with methods a Service Object will not use. DIP — the Service Object should depend on an abstraction (interface), not a concrete auth mechanism. Below we examine OCP through a concrete "Anti-Pattern vs SOLID" pair.',
        },
      },
      {
        type: 'comparison',
        left: {
          label: { tr: '❌ OCP İhlali (if/else şişmesi)', en: '❌ OCP Violation (if/else bloat)' },
          code: {
            tr: `// Her yeni auth turu bu metodu DEGISTIRIR
public RequestSpecification applyAuth(RequestSpecification req, String type) {
    if (type.equals("basic")) {
        return req.auth().basic("user", "pass");
    } else if (type.equals("bearer")) {
        return req.header("Authorization", "Bearer " + token);
    }
    // yeni tur = yeni else-if = eski kodu yeniden test et
    return req;
}`,
            en: `// Every new auth type MODIFIES this method
public RequestSpecification applyAuth(RequestSpecification req, String type) {
    if (type.equals("basic")) {
        return req.auth().basic("user", "pass");
    } else if (type.equals("bearer")) {
        return req.header("Authorization", "Bearer " + token);
    }
    // new type = new else-if = retest the old code
    return req;
}`,
          },
          note: { tr: 'Yeni davranış = mevcut metodu değiştir = regresyon riski.', en: 'New behavior = modify the existing method = regression risk.' },
        },
        right: {
          label: { tr: '✅ OCP Uygun (Strategy)', en: '✅ OCP-Compliant (Strategy)' },
          code: {
            tr: `// Yeni tur = mevcut kodu DEGISTIRMEDEN yeni sinif ekle
public interface AuthProvider {
    RequestSpecification apply(RequestSpecification req);
}

public class BearerAuthProvider implements AuthProvider {
    public RequestSpecification apply(RequestSpecification req) {
        return req.header("Authorization", "Bearer " + token);
    }
}`,
            en: `// New type = add a new class WITHOUT modifying existing code
public interface AuthProvider {
    RequestSpecification apply(RequestSpecification req);
}

public class BearerAuthProvider implements AuthProvider {
    public RequestSpecification apply(RequestSpecification req) {
        return req.header("Authorization", "Bearer " + token);
    }
}`,
          },
          note: { tr: 'Yeni strateji = yeni dosya; eski kod hiç açılmaz.', en: 'New strategy = new file; existing code is never opened.' },
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `// ─── auth/AuthProvider.java — OCP: davranisi arayuz uzerinden takilabilir yap ───
package auth;

import io.restassured.specification.RequestSpecification;

public interface AuthProvider {
    RequestSpecification apply(RequestSpecification request);
}

// Strateji 1 — Basic Auth (mevcut, degismedi)
public class BasicAuthProvider implements AuthProvider {
    private final String username, password;

    public BasicAuthProvider(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.auth().basic(username, password);
    }
}

// Strateji 2 — Bearer Token (YENI, eskiye HIC dokunulmadi)
public class BearerAuthProvider implements AuthProvider {
    private final String token;

    public BearerAuthProvider(String token) {
        this.token = token;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("Authorization", "Bearer " + token);
    }
}`,
          en: `// ─── auth/AuthProvider.java — OCP: make behavior pluggable via an interface ───
package auth;

import io.restassured.specification.RequestSpecification;

public interface AuthProvider {
    RequestSpecification apply(RequestSpecification request);
}

// Strategy 1 — Basic Auth (existing, unchanged)
public class BasicAuthProvider implements AuthProvider {
    private final String username, password;

    public BasicAuthProvider(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.auth().basic(username, password);
    }
}

// Strategy 2 — Bearer Token (NEW, the old one was NEVER touched)
public class BearerAuthProvider implements AuthProvider {
    private final String token;

    public BearerAuthProvider(String token) {
        this.token = token;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("Authorization", "Bearer " + token);
    }
}`,
        },
      },
      {
        type: 'step-animation',
        id: 'restassured-arch-ocp-authprovider-steps',
        title: { tr: 'Adım Adım: OCP ile Yeni Bir Auth Türü Nasıl Eklenir?', en: 'Step by Step: How a New Auth Type Is Added with OCP' },
        steps: [
          { id: 1, icon: '📐', label: { tr: 'Arayüz sözleşmeyi sabitler', en: 'The interface fixes the contract' }, detail: { tr: 'AuthProvider arayüzü tek bir metot tanımlar: apply(request). Bu sözleşme bir kez yazılır ve bir daha değişmez.', en: 'The AuthProvider interface defines one method: apply(request). This contract is written once and never changes again.' } },
          { id: 2, icon: '🧱', label: { tr: 'Her tür ayrı sınıf', en: 'Each type is its own class' }, detail: { tr: 'BasicAuthProvider ve BearerAuthProvider arayüzü ayrı ayrı uygular — biri diğerinin kodunu bilmez, birbirini kırmaz.', en: 'BasicAuthProvider and BearerAuthProvider each implement the interface separately — neither knows the other\'s code, neither can break the other.' } },
          { id: 3, icon: '➕', label: { tr: 'Yeni ihtiyaç = yeni sınıf', en: 'New need = new class' }, detail: { tr: '"OAuth2 desteği" ihtiyacı gelirse OAuth2AuthProvider adında YENİ bir dosya açarsın; mevcut iki sınıfa DOKUNMAZSIN.', en: 'If an "OAuth2 support" need arises, you open a NEW file named OAuth2AuthProvider; you do NOT touch the existing two classes.' } },
          { id: 4, icon: '🔌', label: { tr: 'Service Object stratejiyi enjekte alır', en: 'The Service Object receives the strategy injected' }, detail: { tr: 'UserService hangi somut AuthProvider\'ı kullandığını bilmez, sadece arayüze bağlıdır — istediğin stratejiyi dışarıdan verirsin (DIP ile birlikte çalışır).', en: 'UserService does not know which concrete AuthProvider it uses, it depends only on the interface — you supply the desired strategy from outside (works together with DIP).' } },
          { id: 5, icon: '🛡️', label: { tr: 'Eski testler dokunulmadan geçer', en: 'Old tests pass untouched' }, detail: { tr: 'Yeni provider eklenince mevcut 30 Basic-Auth testinin hiçbiri değişmediği için hiçbiri kırılamaz — OCP\'nin regresyon güvencesi tam olarak budur.', en: 'When the new provider is added, none of the existing 30 Basic-Auth tests changed, so none can break — this is exactly OCP\'s regression guarantee.' } },
        ],
      },
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'ch-restassured-arch-ocp-order',
        question: {
          tr: '"OAuth2 desteği ekleyelim" ihtiyacını OCP\'ye uygun şekilde çözme adımlarını sıraya diz.',
          en: 'Arrange the OCP-compliant steps for the need "let\'s add OAuth2 support".',
        },
        items: [
          { id: '1', text: { tr: 'Mevcut AuthProvider arayüzünü (sözleşmeyi) incele — değiştirme', en: 'Inspect the existing AuthProvider interface (the contract) — do not change it' }, order: 1 },
          { id: '2', text: { tr: 'Yeni bir OAuth2AuthProvider dosyası oluştur, arayüzü implement et', en: 'Create a new OAuth2AuthProvider file, implement the interface' }, order: 2 },
          { id: '3', text: { tr: 'apply() metodunu OAuth2\'ye özgü token mantığıyla doldur', en: 'Fill the apply() method with OAuth2-specific token logic' }, order: 3 },
          { id: '4', text: { tr: 'İlgili Service Object\'e bu stratejiyi dışarıdan enjekte et', en: 'Inject this strategy into the relevant Service Object from outside' }, order: 4 },
          { id: '5', text: { tr: 'Mevcut testleri çalıştır — hiçbiri değişmediği için hepsi geçer', en: 'Run the existing tests — since none changed, they all pass' }, order: 5 },
        ],
        xpReward: 20,
      },
      {
        type: 'code-playground',
        relatedTopicId: 'restassured-framework-ocp',
        id: 'restassured-arch-ocp-authprovider-practice',
        label: {
          tr: 'Micro Lab: OCP\'ye uygun yeni bir AuthProvider ekle',
          en: 'Micro Lab: add a new OCP-compliant AuthProvider',
        },
        language: 'java',
        task: {
          tr: 'Proje artık API-Key ile kimlik doğrulamayı da destekliyor. OCP kuralı gereği MEVCUT AuthProvider arayüzünü veya BasicAuthProvider sınıfını DEĞİŞTİRMEDEN, yeni bir ApiKeyAuthProvider sınıfı yaz. TODO satırlarını tamamla: sınıf AuthProvider\'ı implement etmeli ve apply() içinde "X-API-Key" header\'ını eklemeli.',
          en: 'The project now also supports API-Key authentication. Per OCP, WITHOUT modifying the existing AuthProvider interface or the BasicAuthProvider class, write a new ApiKeyAuthProvider class. Complete the TODO lines: the class must implement AuthProvider and, inside apply(), add the "X-API-Key" header.',
        },
        explanation: {
          tr: 'Bu pratik gerçek bir HTTP isteği göndermez; amaç OCP\'nin "genişlet ama değiştirme" ilkesini elle uygulayarak, yeni davranışı mevcut sınıflara dokunmadan eklemenin regresyonu nasıl önlediğini pekiştirmektir.',
          en: 'This is not a real HTTP session; the goal is to apply OCP\'s "extend but do not modify" principle by hand, reinforcing how adding new behavior without touching existing classes prevents regression.',
        },
        code: {
          tr: `public class ApiKeyAuthProvider implements AuthProvider {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("X-API-Key", apiKey);
    }
}`,
          en: `public class ApiKeyAuthProvider implements AuthProvider {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("X-API-Key", apiKey);
    }
}`,
        },
        starterCode: {
          tr: `public class ApiKeyAuthProvider TODO {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        TODO   // X-API-Key header'ini ekle
    }
}`,
          en: `public class ApiKeyAuthProvider TODO {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        TODO   // add the X-API-Key header
    }
}`,
        },
        solutionCode: {
          tr: `public class ApiKeyAuthProvider implements AuthProvider {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("X-API-Key", apiKey);
    }
}`,
          en: `public class ApiKeyAuthProvider implements AuthProvider {
    private final String apiKey;

    public ApiKeyAuthProvider(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public RequestSpecification apply(RequestSpecification request) {
        return request.header("X-API-Key", apiKey);
    }
}`,
        },
        expected: {
          tr: 'İlk TODO "implements AuthProvider" olmalı; ikinci TODO return request.header("X-API-Key", apiKey) olmalı — mevcut arayüz ve BasicAuthProvider\'a hiç dokunmadan yeni davranış eklenir.',
          en: 'The first TODO must be "implements AuthProvider"; the second TODO must be return request.header("X-API-Key", apiKey) — new behavior is added without touching the existing interface or BasicAuthProvider.',
        },
        hints: [
          { tr: 'OCP\'nin özü: yeni sınıf, mevcut arayüzü (AuthProvider) implement eder; böylece Service Object değişmeden yeni davranışı kullanabilir. Arayüzü veya eski sınıfı ASLA açma.', en: 'The essence of OCP: the new class implements the existing interface (AuthProvider); this lets the Service Object use the new behavior unchanged. NEVER open the interface or the old class.' },
          { tr: 'RequestSpecification.header(isim, değer) metodu, isteğe yeni bir HTTP header EKLER ve güncellenmiş bir RequestSpecification döner — zincirlenebilir bir yapıdır.', en: 'The RequestSpecification.header(name, value) method ADDS a new HTTP header to the request and returns an updated RequestSpecification — it is chainable.' },
          { tr: 'API-Key kimlik doğrulaması genelde özel bir header (örn. "X-API-Key") ile yapılır — Bearer token\'ın "Authorization" header\'ından FARKLI bir header adı kullanır.', en: 'API-Key authentication is usually done with a custom header (e.g. "X-API-Key") — it uses a DIFFERENT header name from Bearer token\'s "Authorization" header.' },
        ],
        xpReward: 15,
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir REST Assured yardımcı metodunda her yeni auth türü için var olan applyAuth() metoduna if/else eklemek hangi SOLID prensibini ihlal eder?',
          en: 'In a REST Assured helper method, adding an if/else to the existing applyAuth() method for every new auth type violates which SOLID principle?',
        },
        options: [
          { id: 'a', text: { tr: 'Open/Closed Principle (OCP) — metot genişlemeye açık, değişikliğe kapalı olmalı', en: 'Open/Closed Principle (OCP) — a method should be open to extension, closed to modification' } },
          { id: 'b', text: { tr: 'Sadece Single Responsibility (SRP)', en: 'Only Single Responsibility (SRP)' } },
          { id: 'c', text: { tr: 'Hiçbirini — if/else her zaman iyi pratiktir', en: 'None — if/else is always good practice' } },
          { id: 'd', text: { tr: 'Liskov Substitution (LSP)', en: 'Liskov Substitution (LSP)' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'Her yeni tür için mevcut metodu değiştirmek (yeni else-if) OCP ihlalidir: metot "değişikliğe kapalı" olmalıydı. Strategy pattern ile davranışı arayüz arkasına alırsan, yeni tür eklemek mevcut kodu değiştirmeyi değil, yeni bir sınıf eklemeyi gerektirir — eski testler dokunulmadan güvende kalır.',
          en: 'Modifying the existing method (a new else-if) for every new type violates OCP: the method should have been "closed to modification". With the Strategy pattern behind an interface, adding a new type requires adding a new class, not changing existing code — old tests stay safe, untouched.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir UserService\'in somut BasicAuthProvider yerine bir AuthProvider arayüzüne bağlı olması hangi prensibi uygular?',
            en: 'A UserService depending on an AuthProvider interface instead of the concrete BasicAuthProvider applies which principle?',
          },
          options: [
            { id: 'a', text: { tr: 'Dependency Inversion (DIP) — yüksek seviye modül soyutlamaya bağlı olmalı', en: 'Dependency Inversion (DIP) — high-level modules should depend on abstractions' } },
            { id: 'b', text: { tr: 'Interface Segregation (ISP)', en: 'Interface Segregation (ISP)' } },
            { id: 'c', text: { tr: 'Hiçbiri', en: 'None' } },
            { id: 'd', text: { tr: 'Sadece OCP', en: 'Only OCP' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'DIP, yüksek seviye kodun (Service Object) düşük seviye somut sınıfa değil, bir soyutlamaya (arayüz) bağlı olmasını söyler. Service Object bir AuthProvider arayüzüne bağlıysa, farklı implementasyonlar (Basic, Bearer, API-Key) sorunsuz değiştirilebilir.',
            en: 'DIP says high-level code (the Service Object) should depend on an abstraction (interface), not a low-level concrete class. If the Service Object depends on an AuthProvider interface, different implementations (Basic, Bearer, API-Key) can be swapped freely.',
          },
        },
      },

      // ── Adım 5 — Test / Data Katmanı: @ParameterizedTest & @MethodSource ──
      {
        type: 'heading',
        text: { tr: '🔗 Adım 5 — Test / Data Katmanı: @ParameterizedTest & @MethodSource', en: '🔗 Step 5 — Test / Data Layer: @ParameterizedTest & @MethodSource' },
      },
      {
        type: 'simple-box',
        emoji: '🎛️',
        content: {
          tr: '@ParameterizedTest + @MethodSource, bir fabrika bandıdır — tıpkı Selenium\'daki TestNG @DataProvider gibi: aynı test metodunu (aynı montaj istasyonunu) farklı parçalarla (farklı kullanıcı ID\'leriyle) tekrar tekrar besler; sen tek bir test yazarsın, JUnit5 onu N farklı veriyle N kez koşturur. İkinci benzetme: bir sınavın çoktan seçmeli soru bankası gibi — aynı SORU FORMATI (aynı doğrulama mantığı), farklı SORU İÇERİĞİYLE (farklı kullanıcı ID\'leriyle) tekrar kullanılır. Peki Playwright/Cypress\'te @DataProvider yokken düz bir for-loop yeterliydi — Java\'da neden ayrı bir annotation gerekiyor? Çünkü Java, JavaScript\'in aksine, test toplama (test discovery) işini ÇALIŞMA ZAMANINDA değil YANSIMA (reflection) ile yapar — JUnit5\'in test\'i "kaç kez, hangi veriyle" koşacağını BİLMESİ için resmi bir annotation\'a ihtiyacı vardır; JavaScript\'te ise test() çağrısının KENDİSİ zaten dosya toplanırken çalışan bir fonksiyon olduğu için düz bir for-loop yeterlidir. Java karşılaştırması: bu, TestNG\'nin @DataProvider\'ıyla AYNI ilke, sadece annotation adı ve mekanizması farklı (JUnit5 @MethodSource bir Stream/List döndüren static bir metoda işaret eder). QA bağlamı: geçerli/geçersiz/boş/SQL-injection denemesi gibi 20 senaryoyu tek bir data-driven testle kapsarsın; yeni bir sınır durumu çıkınca kod değil, sadece veri satırı eklersin.',
          en: '@ParameterizedTest + @MethodSource is a factory conveyor — just like TestNG\'s @DataProvider in Selenium: it feeds the same test method (the same assembly station) over and over with different parts (different user IDs); you write one test, and JUnit5 runs it N times with N different data sets. Second analogy: like an exam\'s multiple-choice question bank — the same QUESTION FORMAT (the same verification logic) is reused with different QUESTION CONTENT (different user IDs). But in Playwright/Cypress, without @DataProvider, a plain for-loop was enough — why does Java need a separate annotation? Because, unlike JavaScript, Java does test discovery via REFLECTION, not at RUNTIME — JUnit5 needs a formal annotation to KNOW "how many times, with what data" a test should run; in JavaScript, the test() call ITSELF is already a function that runs while the file is being collected, so a plain for-loop suffices. Java comparison: this is the SAME principle as TestNG\'s @DataProvider, just with a different annotation name and mechanism (JUnit5\'s @MethodSource points to a static method returning a Stream/List). QA context: you cover 20 scenarios like valid/invalid/empty/SQL-injection attempts with a single data-driven test; when a new edge case appears, you add a data row, not code.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Bu son katmanda tüm parçalar birleşir: BaseTest (Adım 2) paylaşılan spec\'i kurar; UserService (Adım 3) endpoint mantığını kapsüller; AuthProvider (Adım 4) kimlik doğrulamayı takılabilir hale getirir; @MethodSource ile beslenen bir test metodu, her veri satırı için AYNI Service Object çağrısını farklı ID\'lerle tekrarlar.',
          en: 'In this final layer, all pieces come together: BaseTest (Step 2) sets up the shared spec; UserService (Step 3) encapsulates endpoint logic; AuthProvider (Step 4) makes authentication pluggable; a test method fed by @MethodSource repeats the SAME Service Object call with different IDs for each data row.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `// ─── UserServiceDataTest.java — data-driven: mantik TEK, veri COK ───
package tests;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import java.util.stream.Stream;
import static org.assertj.core.api.Assertions.assertThat;

class UserServiceDataTest extends BaseTest {
    private final UserService userService = new UserService(spec);

    // ayni testi besleyecek veri satirlari — mantik TEK, veri COK
    static Stream<Integer> validUserIds() {
        return Stream.of(1, 2, 3);   // gecerli 3 kullanici ID'si
    }

    @ParameterizedTest
    @MethodSource("validUserIds")
    void getUserReturnsValidEmailForEachId(int userId) {
        User user = userService.getUser(userId);
        assertThat(user.getEmail()).contains("@");
    }
}`,
          en: `// ─── UserServiceDataTest.java — data-driven: logic ONE, data MANY ───
package tests;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import java.util.stream.Stream;
import static org.assertj.core.api.Assertions.assertThat;

class UserServiceDataTest extends BaseTest {
    private final UserService userService = new UserService(spec);

    // data rows that feed the same test — logic ONE, data MANY
    static Stream<Integer> validUserIds() {
        return Stream.of(1, 2, 3);   // 3 valid user IDs
    }

    @ParameterizedTest
    @MethodSource("validUserIds")
    void getUserReturnsValidEmailForEachId(int userId) {
        User user = userService.getUser(userId);
        assertThat(user.getEmail()).contains("@");
    }
}`,
        },
      },
      {
        type: 'step-animation',
        id: 'restassured-arch-dataprovider-steps',
        title: { tr: 'Adım Adım: @MethodSource Aynı Testi Nasıl 3 Kez Koşturur?', en: 'Step by Step: How @MethodSource Runs the Same Test 3 Times' },
        steps: [
          { id: 1, icon: '📋', label: { tr: 'validUserIds() veri akışını üretir', en: 'validUserIds() produces the data stream' }, detail: { tr: 'Bu static metot bir Stream<Integer> döner: 1, 2, 3. JUnit5 bu akışı test başlamadan önce OKUR.', en: 'This static method returns a Stream<Integer>: 1, 2, 3. JUnit5 READS this stream before the test starts.' } },
          { id: 2, icon: '🔁', label: { tr: 'Her değer için AYRI bir test örneği', en: 'A SEPARATE test instance for each value' }, detail: { tr: 'JUnit5 her değer için getUserReturnsValidEmailForEachId\'yi AYRI bir test örneği sayar — üçü de bağımsız çalışır, biri fail olsa diğerleri ETKİLENMEZ.', en: 'JUnit5 treats getUserReturnsValidEmailForEachId per value as a SEPARATE test instance — all three run independently, if one fails the others are NOT affected.' } },
          { id: 3, icon: '🎯', label: { tr: 'Değer parametreye enjekte edilir', en: 'The value is injected into the parameter' }, detail: { tr: '1. koşum: userId=1, 2. koşum: userId=2, 3. koşum: userId=3 — her koşumda tek bir int değeri metot parametresine geçirilir.', en: 'Run 1: userId=1, run 2: userId=2, run 3: userId=3 — each run injects a single int value into the method parameter.' } },
          { id: 4, icon: '🧪', label: { tr: 'Service Object + assertion çalışır', en: 'Service Object + assertion run' }, detail: { tr: 'userService.getUser(userId) çağrılır (Adım 3), sonuç assertThat ile beklenen kalıpla karşılaştırılır — mantık her koşumda AYNI.', en: 'userService.getUser(userId) is called (Step 3), and the result is compared against the expected pattern via assertThat — the logic is the SAME every run.' } },
          { id: 5, icon: '📊', label: { tr: 'Rapor: 3 ayrı sonuç', en: 'Report: 3 separate results' }, detail: { tr: 'Test raporunda tek metot 3 satır olarak görünür — biri fail olursa hangi ID\'nin patladığını net görürsün, kopyalanmış 3 testte bu netlik olmazdı.', en: 'In the report, the single method appears as 3 rows — if one fails, you clearly see which ID broke; with 3 copied tests you would not have that clarity.' } },
        ],
      },
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'ch-restassured-arch-dataprovider-order',
        question: {
          tr: '@ParameterizedTest + @MethodSource ile data-driven bir test kurmanın adımlarını doğru sıraya diz.',
          en: 'Arrange the steps of building a data-driven test with @ParameterizedTest + @MethodSource in the correct order.',
        },
        items: [
          { id: '1', text: { tr: 'static bir metotta Stream<Integer> döndüren veri kaynağını tanımla', en: 'Define the data source returning a Stream<Integer> in a static method' }, order: 1 },
          { id: '2', text: { tr: '@ParameterizedTest ile test metodunu işaretle', en: 'Mark the test method with @ParameterizedTest' }, order: 2 },
          { id: '3', text: { tr: '@MethodSource("validUserIds") ile veri kaynağına bağla', en: 'Bind it to the data source with @MethodSource("validUserIds")' }, order: 3 },
          { id: '4', text: { tr: 'Test gövdesinde userService.getUser(userId) çağır', en: 'Call userService.getUser(userId) in the test body' }, order: 4 },
          { id: '5', text: { tr: 'assertThat ile beklenen sonucu doğrula', en: 'Verify the expected result with assertThat' }, order: 5 },
        ],
        xpReward: 20,
      },
      {
        type: 'code-playground',
        relatedTopicId: 'restassured-framework-dataprovider',
        id: 'restassured-arch-dataprovider-practice',
        label: {
          tr: 'Micro Lab: testi @MethodSource veri kaynağına bağla',
          en: 'Micro Lab: bind the test to a @MethodSource data source',
        },
        language: 'java',
        task: {
          tr: 'validUserIds() metodu 3 değerlik veri akışını hazır döndürüyor ama TODO satırı eksik olduğu için test bu veriye BAĞLI DEĞİL — şu an parametresini nereden alacağını bilmiyor. TODO satırını tamamla: @MethodSource("validUserIds") annotation\'ını ekleyerek testi veri kaynağına bağla. Bağlandıktan sonra JUnit5 aynı testi 3 değer için 3 kez koşturur.',
          en: 'The validUserIds() method already returns a 3-value data stream, but the test is NOT BOUND to it because the TODO line is missing — right now it does not know where its parameter comes from. Complete the TODO line: bind the test to the data source by adding the @MethodSource("validUserIds") annotation. Once bound, JUnit5 runs the same test 3 times for the 3 values.',
        },
        explanation: {
          tr: 'Bu pratik gerçek bir HTTP isteği göndermez; amaç JUnit5\'in data-driven mekanizmasını, TestNG\'nin @DataProvider\'ına eşdeğer bir annotation zinciri olarak elle tamamlayarak pekiştirmektir.',
          en: 'This is not a real HTTP session; the goal is to reinforce, by completing it yourself, that JUnit5\'s data-driven mechanism is an annotation chain equivalent to TestNG\'s @DataProvider.',
        },
        code: {
          tr: `@ParameterizedTest
@MethodSource("validUserIds")
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
          en: `@ParameterizedTest
@MethodSource("validUserIds")
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
        },
        starterCode: {
          tr: `@ParameterizedTest
TODO   // veri kaynagina bagla
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
          en: `@ParameterizedTest
TODO   // bind to the data source
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
        },
        solutionCode: {
          tr: `@ParameterizedTest
@MethodSource("validUserIds")
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
          en: `@ParameterizedTest
@MethodSource("validUserIds")
void getUserReturnsValidEmailForEachId(int userId) {
    User user = userService.getUser(userId);
    assertThat(user.getEmail()).contains("@");
}`,
        },
        expected: {
          tr: 'TODO satırı @MethodSource("validUserIds") olmalı — bu annotation, testi validUserIds() metodunun ürettiği veri akışına BAĞLAR, JUnit5 her değer için testi bir kez koşturur.',
          en: 'The TODO line must be @MethodSource("validUserIds") — this annotation BINDS the test to the data stream produced by validUserIds(), and JUnit5 runs the test once per value.',
        },
        hints: [
          { tr: '@MethodSource, parametre olarak bir METOT ADI (string) alır — bu isim, aynı sınıftaki static bir metoda işaret etmelidir.', en: '@MethodSource takes a METHOD NAME (string) as its parameter — this name must point to a static method in the same class.' },
          { tr: '@ParameterizedTest TEK BAŞINA yeterli değildir — mutlaka bir veri kaynağı annotation\'ıyla (örn. @MethodSource, @ValueSource) EŞLEŞTİRİLMELİDİR.', en: '@ParameterizedTest is NOT enough on its own — it MUST be PAIRED with a data source annotation (e.g. @MethodSource, @ValueSource).' },
          { tr: 'validUserIds() metodunun static olması ZORUNLUDUR — JUnit5 bu metodu bir test SINIFI örneği yaratmadan, yansıma (reflection) ile çağırır.', en: 'The validUserIds() method being static is REQUIRED — JUnit5 calls this method via reflection, without creating a test class instance.' },
        ],
        xpReward: 15,
      },
      {
        type: 'quiz',
        question: {
          tr: 'Playwright/Cypress\'te data-driven test için düz bir for-loop yeterliyken, Java/JUnit5\'in NEDEN ayrı bir @MethodSource annotation\'ına ihtiyacı var?',
          en: 'While a plain for-loop is enough for data-driven testing in Playwright/Cypress, WHY does Java/JUnit5 need a separate @MethodSource annotation?',
        },
        options: [
          { id: 'a', text: { tr: 'Java test toplamayı yansıma (reflection) ile yapar; JUnit5\'in "kaç kez, hangi veriyle" koşacağını bilmesi için resmi bir annotation gerekir', en: 'Java does test discovery via reflection; JUnit5 needs a formal annotation to know "how many times, with what data" to run' } },
          { id: 'b', text: { tr: 'Java\'da döngü (for/while) sözdizimi yoktur', en: 'Java has no loop (for/while) syntax' } },
          { id: 'c', text: { tr: '@MethodSource performansı artırmak için vardır', en: '@MethodSource exists to improve performance' } },
          { id: 'd', text: { tr: 'Sadece CI ortamında gereklidir', en: 'It is only necessary in a CI environment' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'JavaScript\'te test() çağrısının kendisi dosya toplanırken (collection sırasında) çalışan bir fonksiyondur, bu yüzden düz bir for-loop yeterlidir. Java\'da ise JUnit5 testleri yansıma (reflection) ile keşfeder — bir testin "parametreli" olduğunu ve hangi veri kaynağını kullanacağını bilmesi için resmi bir annotation (@ParameterizedTest + @MethodSource) ZORUNLUDUR.',
          en: 'In JavaScript, the test() call itself is a function that runs while the file is being collected, so a plain for-loop is enough. In Java, JUnit5 discovers tests via reflection — a formal annotation (@ParameterizedTest + @MethodSource) is REQUIRED for it to know a test is "parameterized" and which data source to use.',
        },
        retryQuestion: {
          question: {
            tr: 'Aynı senaryo için 3 ayrı @Test metodu kopyalamak yerine @ParameterizedTest kullanmanın en büyük avantajı nedir?',
            en: 'What is the biggest advantage of using @ParameterizedTest instead of copying 3 separate @Test methods for the same scenario?',
          },
          options: [
            { id: 'a', text: { tr: 'Senaryo mantığı değiştiğinde TEK yer güncellenir, veri satırları ayrı kalır', en: 'When the scenario logic changes, only ONE place is updated, the data rows stay separate' } },
            { id: 'b', text: { tr: 'Testler daha hızlı çalışır', en: 'The tests run faster' } },
            { id: 'c', text: { tr: 'Jackson\'a gerek kalmaz', en: 'Jackson is no longer needed' } },
            { id: 'd', text: { tr: 'JUnit5 bunu zorunlu kılar', en: 'JUnit5 requires this' } },
          ],
          correct: 'a',
          explanation: {
            tr: '3 kopyalanmış @Test metodunda getUser çağrısı veya assertion mantığı değişirse 3 yeri elle güncellersin ve biri unutulabilir. @ParameterizedTest ile mantık TEK metotta durur, validUserIds() akışına yeni bir değer eklemek yeni bir senaryoyu kod yazmadan kapsar.',
            en: 'With 3 copied @Test methods, if the getUser call or assertion logic changes, you update 3 places by hand and one can be missed. With @ParameterizedTest, the logic lives in ONE method, and adding a new value to the validUserIds() stream covers a new scenario without writing code.',
          },
        },
      },
    ],
  },

  // ── 11: Interview Questions ───────────────────────────────────────────────────
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Questions' },
    blocks: [
      raInterviewSpecPatternFilm,
      raInterviewStep,
      raInterviewPractice,
      {
        type: 'interview-questions',
          relatedTopicId: 'rest-assured',
        topic: 'REST Assured',
        questions: [
          // ── BASIC (15) ───────────────────────────────────────────────────────
          {
            level: 'basic',
            q: { tr: 'REST Assured nedir ve ne için kullanılır?', en: 'What is REST Assured and what is it used for?' },
            a: {
              tr: 'REST Assured, Java ile REST API testleri yazmak için kullanılan açık kaynak DSL kütüphanesidir. given().when().then() sözdizimi ile HTTP istekleri gönderir, Hamcrest matchers ile doğrular. Java ekibindeki QA\'nın Postman yerine tercih etmesi gereken araçtır — çünkü testler Maven/Gradle\'a entegre olur ve CI/CD pipeline\'ında otomatik çalışır.',
              en: 'REST Assured is an open-source DSL library for writing REST API tests in Java. It sends HTTP requests with given().when().then() syntax and verifies with Hamcrest matchers. It is the Java QA\'s alternative to Postman — tests integrate with Maven/Gradle and run automatically in CI/CD pipelines.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'given(), when(), then() bloklarının görevleri nelerdir?', en: 'What are the roles of given(), when(), and then()?' },
            a: {
              tr: 'given(): Request ön koşulları — headers, params, body, auth. when(): HTTP metodu ve URL. then(): Response doğrulama — statusCode, body, header, time. BDD stilinden gelir; Java\'daki @Arrange/@Act/@Assert pattern\'ine birebir karşılık gelir.',
              en: 'given(): request pre-conditions — headers, params, body, auth. when(): HTTP method and URL. then(): response verification — statusCode, body, header, time. Comes from BDD style; directly mirrors the @Arrange/@Act/@Assert pattern in Java testing.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'POJO neden önemlidir?', en: 'Why are POJOs important?' },
            a: {
              tr: 'String JSON\'da typo yapsan runtime\'da patlar, IDE de uyarmaz. POJO ile tip güvenliği ve otomatik tamamlama kazanırsın. Jackson otomatik serialize/deserialize yapar. Java\'da Map<String,Object> yerine güçlü tip kullanan bir sınıf yazman gibi düşün — aynı mantık, aynı kazanç.',
              en: 'A typo in raw String JSON blows up at runtime with no IDE warning. With a POJO you get compile-time type safety and autocompletion. Jackson handles serialization/deserialization automatically. Think of it like using a strongly-typed class in Java instead of Map<String,Object> — same principle, same benefit.',
            },
          },
          {
            level: 'basic',
            q: { tr: '@JsonIgnoreProperties(ignoreUnknown = true) ne zaman kullanılır?', en: 'When should @JsonIgnoreProperties(ignoreUnknown = true) be used?' },
            a: {
              tr: 'Her response POJO\'suna eklenmeli. API yeni alan eklediğinde UnrecognizedPropertyException fırlatmasını önler. Geliştiricinin response\'a yeni bir field eklemesi senin testini kırmamalı — bu annotation o korumayı sağlar.',
              en: 'It should be added to every response POJO. It prevents UnrecognizedPropertyException when the API adds a new field. A developer adding a new response field should not break your test — this annotation provides that protection.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'BaseTest sınıfı neden kullanılır ve ne içermelidir?', en: 'Why is a BaseTest class used and what should it contain?' },
            a: {
              tr: 'RequestSpecification\'ı (baseUri, headers, auth) bir kez kurar; tüm test sınıfları extends ile miras alır. DRY prensibini uygular — baseUrl\'i 200 yerde değiştirmek yerine tek yerden değiştirirsin. @BeforeAll\'da RestAssured.requestSpecification atanır. Java\'daki abstract base test sınıfı kalıbıyla birebir aynıdır.',
              en: 'It configures RequestSpecification (baseUri, headers, auth) once; all test classes inherit it via extends. Applies the DRY principle — change the baseUrl in one place instead of 200 places. Assign in @BeforeAll via RestAssured.requestSpecification. Identical to the abstract base test class pattern in Java.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'pom.xml\'e REST Assured eklemek için hangi dependency\'ler gereklidir?', en: 'Which dependencies are required to add REST Assured to pom.xml?' },
            a: {
              tr: 'Minimum: io.rest-assured:rest-assured (core), io.rest-assured:json-path (JSON path desteği), com.fasterxml.jackson.core:jackson-databind (POJO serialize/deserialize). JUnit5 kullanıyorsan junit-jupiter de zorunlu. maven-surefire-plugin 3.x da gerekir — mvn test komutu REST Assured testlerini bu plugin üzerinden çalıştırır.',
              en: 'Minimum: io.rest-assured:rest-assured (core), io.rest-assured:json-path (JSON path support), com.fasterxml.jackson.core:jackson-databind (POJO serialization). If using JUnit5, junit-jupiter is also required. maven-surefire-plugin 3.x is needed — the mvn test command runs REST Assured tests through this plugin.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'statusCode() ile body() assert\'ini aynı anda kullanabilir misiniz?', en: 'Can you assert statusCode() and body() at the same time?' },
            a: {
              tr: 'Evet, then() bloğu zincir (fluent) API\'dir. then().statusCode(200).body("name", equalTo("Alice")).body("age", greaterThan(18)) şeklinde tek satırda birden fazla assertion yazılabilir. Java\'daki method chaining kalıbıyla aynı prensip. Her assertion bağımsız değerlendirilir; ilk başarısız olan testi durdurur.',
              en: 'Yes, the then() block is a fluent API. You can chain multiple assertions: then().statusCode(200).body("name", equalTo("Alice")).body("age", greaterThan(18)) in a single statement. Same principle as method chaining in Java. Each assertion is evaluated independently; the first failure stops the test.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Bir response header\'ı nasıl doğrularsınız?', en: 'How do you verify a response header?' },
            a: {
              tr: 'then().header("Content-Type", "application/json") veya then().header("Content-Type", containsString("json")) kullanılır. Birden fazla header için .headers() method\'u hem Map hem de vararg kabul eder. Java\'da HashMap ile doğrulama yapıyormuşsun gibi düşün — burada REST Assured bunu daha okunabilir hale getirir.',
              en: 'Use then().header("Content-Type", "application/json") or then().header("Content-Type", containsString("json")). For multiple headers, .headers() accepts both a Map and varargs. Think of it like checking a HashMap in Java — REST Assured makes it more readable.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Query parameter ve path parameter arasındaki fark nedir ve REST Assured\'da nasıl kullanılır?', en: 'What is the difference between query and path parameters in REST Assured?' },
            a: {
              tr: 'Path parameter URL\'nin parçasıdır: /users/{id} — given().pathParam("id", 42).when().get("/users/{id}"). Query parameter URL\'nin sonuna eklenir: /users?page=2 — given().queryParam("page", 2). Java\'da String.format ile URL oluşturmak yerine REST Assured bunları tip-safe şekilde yönetir.',
              en: 'Path parameter is part of the URL: /users/{id} — given().pathParam("id", 42).when().get("/users/{id}"). Query parameter is appended to the URL: /users?page=2 — given().queryParam("page", 2). Instead of building URLs with String.format in Java, REST Assured manages these in a type-safe way.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Basic Authentication gerektiren bir endpoint\'i REST Assured ile nasıl test edersiniz?', en: 'How do you test an endpoint requiring Basic Authentication with REST Assured?' },
            a: {
              tr: 'given().auth().basic("username", "password") — REST Assured credentials\'ı Base64 encode edip Authorization header\'ına otomatik ekler. Preemptive auth için given().auth().preemptive().basic(...) kullanılır — sunucu 401 döndürmeden önce credentials gönderir. BaseTest\'e taşıyarak tüm testlerde yeniden kullanılır.',
              en: 'Use given().auth().basic("username", "password") — REST Assured Base64-encodes credentials and adds the Authorization header automatically. For preemptive auth use given().auth().preemptive().basic(...) — sends credentials before the server challenges with 401. Move to BaseTest to reuse across all tests.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Response body\'de belirli bir string olup olmadığını nasıl kontrol edersiniz?', en: 'How do you check if a response body contains a specific string?' },
            a: {
              tr: 'then().body(containsString("Alice")) — Hamcrest\'in containsString() matcher\'ını kullanır. JSON path ile daha spesifik: then().body("data.name", containsString("Ali")). Tam eşleşme için equalTo(), kısmi için containsString(), büyük/küçük harf duyarsız için containsStringIgnoringCase(). Java\'daki String.contains() metodunun assertion versiyonu olarak düşünebilirsin.',
              en: 'Use then().body(containsString("Alice")) — uses Hamcrest\'s containsString() matcher. More specific with JSON path: then().body("data.name", containsString("Ali")). Use equalTo() for exact match, containsString() for partial, containsStringIgnoringCase() for case-insensitive. Think of it as the assertion version of Java\'s String.contains() method.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Response süresini (response time) nasıl assert edersiniz?', en: 'How do you assert response time in REST Assured?' },
            a: {
              tr: 'then().time(lessThan(2000L)) — ms cinsinden, Hamcrest matcher\'ı kullanır. SLA testleri için idealdir: "API 2 saniyenin altında cevap vermeli" gibi. Daha okunabilir: then().time(lessThan(2L), TimeUnit.SECONDS). Performance regression testi için her sprint\'te bu threshold\'ı kontrol etmek good practice\'tir.',
              en: 'Use then().time(lessThan(2000L)) — in milliseconds, uses Hamcrest matcher. Ideal for SLA tests: "API must respond in under 2 seconds." More readable: then().time(lessThan(2L), TimeUnit.SECONDS). Checking this threshold every sprint is good practice for performance regression testing.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'SSL/HTTPS sertifika hatası alıyorsunuz — ne yaparsınız?', en: 'You are getting an SSL/HTTPS certificate error — what do you do?' },
            a: {
              tr: 'Test ortamında self-signed sertifika varsa given().relaxedHTTPSValidation() kullanılır — tüm SSL doğrulamalarını bypass eder. Production\'da ASLA kullanma; yalnızca dev/staging için. BaseTest\'e eklenirse tüm testler için otomatik aktif olur. Java\'da SSLContext.getInstance("TLS") ile trust-all yapılandırması ile aynı amacı çok daha kısa kodla sağlar.',
              en: 'If the test environment has a self-signed certificate, use given().relaxedHTTPSValidation() — bypasses all SSL validation. NEVER use in production; only for dev/staging. Add to BaseTest for it to apply to all tests. Same purpose as configuring a trust-all SSLContext in Java, achieved with far less code.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Response body\'yi JSON olarak parse etmek ile String olarak almak arasındaki fark nedir?', en: 'What is the difference between parsing the response body as JSON vs getting it as a String?' },
            a: {
              tr: 'String olarak: extract().body().asString() — ham metin, JSON path kullanamaz. JSON olarak: extract().body().as(MyPojo.class) veya .jsonPath().get("field") — tip-safe erişim. String yalnızca debug veya regex gerektiren durumlarda kullanılır; normal testlerde JSON path veya POJO tercih edilir. Java\'da ham byte[] yerine typed nesne kullanmak gibi.',
              en: 'As String: extract().body().asString() — raw text, no JSON path possible. As JSON: extract().body().as(MyPojo.class) or .jsonPath().get("field") — type-safe access. Use String only for debugging or regex scenarios; prefer JSON path or POJO in normal tests. Like using a typed object instead of raw byte[] in Java.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'REST Assured\'da log() ne zaman açılmalıdır?', en: 'When should log() be enabled in REST Assured?' },
            a: {
              tr: 'Debug sırasında: given().log().all() — tüm request\'i loglar. then().log().all() — tüm response\'u loglar. CI/CD\'de sadece hata durumunda: then().log().ifError() veya .log().ifValidationFails() — çıktı kirliliğini önler. Java\'daki logger.debug() / logger.error() ayrımı gibi; production\'da verbose loglama kapatılır.',
              en: 'During debugging: given().log().all() — logs the full request. then().log().all() — logs the full response. In CI/CD, log only on failure: then().log().ifError() or .log().ifValidationFails() — avoids output noise. Like logger.debug() vs logger.error() in Java; verbose logging is turned off in production.',
            },
          },

          // ── INTERMEDIATE (20) ────────────────────────────────────────────────
          {
            level: 'intermediate',
            q: { tr: 'extract().path() ile extract().body().as() farkı nedir?', en: 'What is the difference between extract().path() and extract().body().as()?' },
            a: {
              tr: '.path("id") tek bir değeri primitive olarak alır — String, Integer, List<String> döner. .body().as(UserPojo.class) tüm body\'yi POJO\'ya dönüştürür. Birden fazla alana erişmek istiyorsan POJO daha temiz. .path() ise hızlı bir değer çekip başka istekte kullanmak için idealdir.',
              en: '.path("id") extracts a single value as a primitive — returns String, Integer, or List<String>. .body().as(UserPojo.class) converts the entire body to a POJO. Use POJO when accessing multiple fields. .path() is ideal for quickly extracting one value to use in a subsequent request.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Flaky testlerle nasıl başa çıkılır?', en: 'How do you deal with flaky tests?' },
            a: {
              tr: 'En yaygın sebep async işlem. Çözüm: Awaitility ile polling — Thread.sleep kullanma. Awaitility.await().atMost(10, SECONDS).until(() -> getStatus().equals("DONE")). Diğer sebepler: shared test data (test izolasyonu ile çöz), race condition (ThreadLocal ile çöz), network timeout (timeout değerini artır).',
              en: 'The most common cause is an async operation. Fix: use Awaitility for polling — avoid Thread.sleep. Awaitility.await().atMost(10, SECONDS).until(() -> getStatus().equals("DONE")). Other causes: shared test data (fix with test isolation), race condition (fix with ThreadLocal), network timeout (increase timeout value).',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'JSON Schema Validation ne sağlar ve nasıl implement edilir?', en: 'What does JSON Schema Validation provide and how is it implemented?' },
            a: {
              tr: 'Response yapısını (zorunlu alanlar, tipler, formatlar) tek satırda doğrular. Geliştiricinin "id" alanını silmesi veya String yerine Integer döndürmesi gibi breaking değişiklikler anında yakalanır. Kullanım: then().body(matchesJsonSchemaInClasspath("schema/user-schema.json")). Şemayı src/test/resources/schema/ altına koy. Java\'da Hibernate Validator ile sınıf düzeyinde doğrulama gibi, burada API contract düzeyinde doğrulama yapılır.',
              en: 'Validates response structure (required fields, types, formats) in one line. Catches breaking changes like a developer removing the "id" field or returning Integer instead of String. Usage: then().body(matchesJsonSchemaInClasspath("schema/user-schema.json")). Place schemas under src/test/resources/schema/. Like Hibernate Validator at the class level in Java, here it validates at the API contract level.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'RequestSpecification ve ResponseSpecification\'ı neden ve nasıl oluşturursunuz?', en: 'Why and how do you create RequestSpecification and ResponseSpecification?' },
            a: {
              tr: 'RequestSpecification: tekrar eden header/auth/baseUri\'yi tek yerde tanımlar. RequestSpecBuilder builder = new RequestSpecBuilder(); builder.setBaseUri("https://api.example.com").addHeader("Accept","application/json"); RequestSpecification spec = builder.build(). ResponseSpecification ise beklenen status ve header\'ları merkezi yönetir: ResponseSpecBuilder\'da setStatusCode(200).expectHeader(...). Her iki spec BaseTest\'te static olarak tutulur, testler given(reqSpec).when()...then(resSpec) ile kullanır.',
              en: 'RequestSpecification defines repeated headers/auth/baseUri in one place. RequestSpecBuilder builder = new RequestSpecBuilder(); builder.setBaseUri("https://api.example.com").addHeader("Accept","application/json"); RequestSpecification spec = builder.build(). ResponseSpecification centralises expected status and headers: setStatusCode(200).expectHeader(...) in ResponseSpecBuilder. Keep both specs as statics in BaseTest; tests use given(reqSpec).when()...then(resSpec).',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bearer token authentication ile korunan bir endpoint\'i nasıl test edersiniz?', en: 'How do you test a Bearer token protected endpoint?' },
            a: {
              tr: 'Önce token al: String token = given().body(credentials).post("/auth/login").then().extract().path("token"). Sonra kullan: given().header("Authorization", "Bearer " + token).when().get("/profile"). BaseTest\'te @BeforeAll içinde token al, static değişkende tut. Token expire süresi varsa Filter ile auto-refresh implement et. Java\'daki ThreadLocal<String> token pattern\'ı ile aynı yaklaşım.',
              en: 'First get the token: String token = given().body(credentials).post("/auth/login").then().extract().path("token"). Then use it: given().header("Authorization", "Bearer " + token).when().get("/profile"). Get the token in @BeforeAll in BaseTest and store in a static variable. If the token has an expiry, implement auto-refresh with a Filter. Same approach as ThreadLocal<String> token pattern in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Test chaining: POST /login\'den dönen token\'ı ve ID\'yi bir sonraki istekte nasıl kullanırsınız?', en: 'Test chaining: how do you use the token and ID from POST /login in the next request?' },
            a: {
              tr: 'extract().response() ile tüm response\'u al: Response loginResponse = given()...post("/login").then().extract().response(). Ardından: String token = loginResponse.path("token"); int userId = loginResponse.path("userId"). Sonraki istekte: given().header("Authorization","Bearer "+token).get("/users/"+userId). Java\'da bir metodu çağırıp dönüş değerini bir sonraki metoda parametre geçirmekle birebir aynı — sadece HTTP katmanında.',
              en: 'Extract the full response with extract().response(): Response loginResponse = given()...post("/login").then().extract().response(). Then: String token = loginResponse.path("token"); int userId = loginResponse.path("userId"). In the next request: given().header("Authorization","Bearer "+token).get("/users/"+userId). Exactly the same as calling a method in Java and passing the return value as a parameter to the next method — just at the HTTP layer.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Multipart/form-data ile dosya yükleme endpoint\'ini nasıl test edersiniz?', en: 'How do you test a file upload endpoint with multipart/form-data?' },
            a: {
              tr: 'given().contentType("multipart/form-data").multiPart("file", new File("src/test/resources/test.pdf")).multiPart("description", "QA report").when().post("/upload"). Sunucunun multipart header\'ını beklediğini doğrula; yanlış content-type ile 400 alırsın. Java\'da HttpEntity ile multipart body oluşturmak gibi ama REST Assured bunu builder pattern ile basitleştirir.',
              en: 'given().contentType("multipart/form-data").multiPart("file", new File("src/test/resources/test.pdf")).multiPart("description", "QA report").when().post("/upload"). Verify the server expects the multipart header; wrong content-type returns 400. Like building a multipart HttpEntity in Java, but REST Assured simplifies it with a builder pattern.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Response body\'deki bir List alanını nasıl assert edersiniz?', en: 'How do you assert a List field in the response body?' },
            a: {
              tr: 'then().body("data", hasSize(5)) — listenin boyutunu kontrol eder. .body("data.name", hasItems("Alice","Bob")) — listedeki belirli elemanları kontrol eder. .body("data[0].id", equalTo(1)) — ilk elemanın ID\'sini kontrol eder. .body("data.findAll{it.age > 18}.size()", equalTo(3)) — Groovy GPath ile filtreleme. Java\'da Stream.filter().count() ile yapılanı JSON path\'de tek satırda yaparsın.',
              en: 'then().body("data", hasSize(5)) — checks list size. .body("data.name", hasItems("Alice","Bob")) — checks specific elements. .body("data[0].id", equalTo(1)) — checks the first element\'s ID. .body("data.findAll{it.age > 18}.size()", equalTo(3)) — filter with Groovy GPath. What you\'d do with Stream.filter().count() in Java, done in one line with JSON path.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Derin iç içe geçmiş JSON\'da bir alanı nasıl doğrularsınız?', en: 'How do you verify a deeply nested field in JSON?' },
            a: {
              tr: 'Nokta notasyonu: then().body("data.address.city", equalTo("Istanbul")). Dizi içinde iç içe: then().body("orders[0].items[1].productName", equalTo("Laptop")). Wildcard: then().body("orders.items.productName.flatten()", hasItem("Laptop")) — tüm sipariş içindeki tüm ürün adlarını düzleştirir. Java\'daki JsonPath kütüphanesi veya ObjectMapper ile aynı kavram, ama REST Assured assert ile birleştirerek tek satır yapar.',
              en: 'Dot notation: then().body("data.address.city", equalTo("Istanbul")). Nested in array: then().body("orders[0].items[1].productName", equalTo("Laptop")). Wildcard: then().body("orders.items.productName.flatten()", hasItem("Laptop")) — flattens all product names across all orders. Same concept as JsonPath library or ObjectMapper in Java, but REST Assured combines assertion into a single line.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Cookie tabanlı authentication gerektiren bir API nasıl test edilir?', en: 'How do you test an API that uses cookie-based authentication?' },
            a: {
              tr: 'Login isteğinden cookie\'yi al: Response login = given().body(creds).post("/login"). Sonraki istekte: given().cookies(login.cookies()).get("/dashboard"). Cookie değerini manuel eklemek için: given().cookie("sessionId", "abc123"). RestAssured.config(config().sessionConfig(new SessionConfig().sessionIdName("JSESSIONID"))) ile session yönetimi yapılandırılabilir. Java\'daki HttpSession yönetimine benzer mantık.',
              en: 'Get the cookie from the login response: Response login = given().body(creds).post("/login"). In the next request: given().cookies(login.cookies()).get("/dashboard"). To add a cookie manually: given().cookie("sessionId", "abc123"). Configure session management with RestAssured.config(config().sessionConfig(new SessionConfig().sessionIdName("JSESSIONID"))). Similar logic to HttpSession management in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'REST Assured Filter interface\'i ne işe yarar?', en: 'What is the REST Assured Filter interface used for?' },
            a: {
              tr: 'Filter, her request/response döngüsüne müdahale eden interceptor\'dır — Java\'daki Servlet Filter veya Spring\'in OncePerRequestFilter\'ına karşılık gelir. Filter implements Filter { public Response filter(FilterableRequestSpec req, FilterableResponseSpec res, FilterContext ctx) { /* manipüle et */ return ctx.next(req, res); } }. Kullanım alanları: token auto-refresh, request loglama, rate limiting, 5xx hatalarında retry, güvenlik header\'ı ekleme.',
              en: 'A Filter is an interceptor for every request/response cycle — equivalent to a Servlet Filter or Spring\'s OncePerRequestFilter in Java. Implement: class MyFilter implements Filter { public Response filter(FilterableRequestSpec req, FilterableResponseSpec res, FilterContext ctx) { /* manipulate */ return ctx.next(req, res); } }. Use cases: token auto-refresh, request logging, rate limiting, retry on 5xx, adding security headers.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'XML response döndüren bir endpoint\'i REST Assured ile nasıl test edersiniz?', en: 'How do you test an XML response endpoint with REST Assured?' },
            a: {
              tr: 'REST Assured XML\'i de destekler. then().body("users.user[0].name", equalTo("Alice")) — XPath benzeri GPath sözdizimi. Content-Type kontrolü: then().contentType(ContentType.XML). JAXB ile POJO\'ya dönüştürmek için: given().accept("application/xml")...extract().body().as(UserList.class). JSON kadar yaygın değil ama legacy SOAP API\'leri veya bazı RSS feed servisleri için gerekli.',
              en: 'REST Assured supports XML as well. then().body("users.user[0].name", equalTo("Alice")) — XPath-like GPath syntax. Content-Type check: then().contentType(ContentType.XML). To convert to POJO with JAXB: given().accept("application/xml")...extract().body().as(UserList.class). Less common than JSON but needed for legacy SOAP APIs or some RSS feed services.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Environment-based configuration (dev/staging/prod) nasıl yönetilir?', en: 'How do you manage environment-based configuration (dev/staging/prod)?' },
            a: {
              tr: 'src/test/resources/ altında config.properties, config-staging.properties, config-prod.properties dosyaları oluştur. Maven profilleri ile çalışma zamanında seç: mvn test -P staging. ConfigReader sınıfı System.getProperty("env","dev") ile aktif profili okur. CI/CD\'de: jenkins mvn test -Denv=staging. Java\'daki Spring Profile veya @ActiveProfiles ile aynı mantık — farklı ortam için farklı konfigürasyon.',
              en: 'Create config.properties, config-staging.properties, config-prod.properties under src/test/resources/. Select at runtime using Maven profiles: mvn test -P staging. A ConfigReader class reads the active profile with System.getProperty("env","dev"). In CI/CD: mvn test -Denv=staging. Same logic as Spring Profiles or @ActiveProfiles in Java — different configuration for different environments.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir endpoint 202 Accepted döndürüyor ve işlem async tamamlanıyor. Bu durumu nasıl test edersiniz?', en: 'An endpoint returns 202 Accepted and the operation completes asynchronously. How do you test this?' },
            a: {
              tr: '202 döndükten sonra polling: String jobId = given().post("/export").then().statusCode(202).extract().path("jobId"). Ardından Awaitility ile bekle: Awaitility.await().atMost(30, SECONDS).pollInterval(2, SECONDS).until(() -> given().get("/jobs/"+jobId).then().extract().path("status").equals("COMPLETED")). Son olarak sonucu doğrula: given().get("/jobs/"+jobId+"/result").then().statusCode(200). Thread.sleep(30000) ile bekleme yapmak anti-pattern\'dır.',
              en: 'After the 202 response, poll: String jobId = given().post("/export").then().statusCode(202).extract().path("jobId"). Then wait with Awaitility: Awaitility.await().atMost(30, SECONDS).pollInterval(2, SECONDS).until(() -> given().get("/jobs/"+jobId).then().extract().path("status").equals("COMPLETED")). Finally verify the result: given().get("/jobs/"+jobId+"/result").then().statusCode(200). Using Thread.sleep(30000) is an anti-pattern.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Allure Report ile REST Assured entegrasyonu nasıl yapılır?', en: 'How do you integrate Allure Report with REST Assured?' },
            a: {
              tr: 'pom.xml\'e allure-rest-assured dependency\'si ekle. Sonra: RestAssured.filters(new AllureRestAssured()) — bu filter her request/response\'u Allure\'a otomatik loglar. @Step annotation\'ı ile test adımlarını işaretle. mvn allure:serve ile raporları görüntüle. CI\'da mvn allure:report ile HTML rapor üret. Java\'daki @ExtendWith(AllureJunit5Extension.class) ile birlikte kullanılır.',
              en: 'Add the allure-rest-assured dependency to pom.xml. Then: RestAssured.filters(new AllureRestAssured()) — this filter automatically logs every request/response to Allure. Mark test steps with @Step annotation. View reports with mvn allure:serve. Generate HTML reports in CI with mvn allure:report. Used together with @ExtendWith(AllureJunit5Extension.class) in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Soft assertion ne zaman tercih edilir ve REST Assured\'da nasıl uygulanır?', en: 'When is soft assertion preferred and how is it applied in REST Assured?' },
            a: {
              tr: 'Normal assertion ilk hata bulunca durur; soft assertion tüm hataları toplar. Kullanım: SoftAssertions softly = new SoftAssertions(); softly.assertThat(response.statusCode()).isEqualTo(200); softly.assertThat(response.path("name")).isEqualTo("Alice"); softly.assertAll(). Tercih edildiği durum: tek bir API yanıtında birden fazla alanı kontrol etmek istiyorsun ve hangi alanların hatalı olduğunu tek test çalışmasında görmek istiyorsun.',
              en: 'Normal assertions stop at the first failure; soft assertions collect all failures. Usage: SoftAssertions softly = new SoftAssertions(); softly.assertThat(response.statusCode()).isEqualTo(200); softly.assertThat(response.path("name")).isEqualTo("Alice"); softly.assertAll(). Use when: checking multiple fields in a single API response and you want to see all failing fields in a single test run.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'REST Assured ile pagination testi nasıl yapılır?', en: 'How do you test pagination with REST Assured?' },
            a: {
              tr: 'Temel: page ve size query parametre ile her sayfayı ayrı test et. given().queryParam("page",1).queryParam("size",10).get("/users").then().body("data",hasSize(10)).body("totalPages",greaterThan(1)). Sınır değerleri: son sayfa, boş sayfa (page=999), negatif page (400 beklenir). Links validation: HATEOAS API\'lerde response body\'deki "next" ve "prev" link\'lerini doğrula. Tüm sayfaları döngüyle dolaşıp toplam kayıt sayısını doğrulayan integration testi de yazılabilir.',
              en: 'Basic: test each page with page and size query params. given().queryParam("page",1).queryParam("size",10).get("/users").then().body("data",hasSize(10)).body("totalPages",greaterThan(1)). Boundary values: last page, empty page (page=999), negative page (expects 400). Links validation: verify "next" and "prev" links in the response body for HATEOAS APIs. Can also write an integration test that loops through all pages and verifies total record count.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Test verisi hazırlama ve temizleme (setup/teardown) stratejiniz nedir?', en: 'What is your test data setup/teardown strategy?' },
            a: {
              tr: '@BeforeEach\'de API üzerinden test verisi oluştur (DB\'ye direkt yazma, bağımlılık yaratır). Oluşturulan ID\'yi instance değişkende tut. @AfterEach\'de aynı API\'yi kullanarak sil. UUID ile benzersiz data: "testUser_" + UUID.randomUUID(). Paralel testlerde ThreadLocal kullan. Builder pattern ile test data factory oluştur: UserBuilder.aUser().withName("Test").build(). Java\'daki @BeforeEach/@AfterEach JUnit5 lifecycle\'ı ile birebir aynı — REST Assured sadece HTTP katmanını ekler.',
              en: '@BeforeEach: create test data via API (writing directly to DB creates a dependency). Store created IDs in instance variables. @AfterEach: delete using the same API. Unique data with UUID: "testUser_" + UUID.randomUUID(). Use ThreadLocal in parallel tests. Create a test data factory with builder pattern: UserBuilder.aUser().withName("Test").build(). Identical to @BeforeEach/@AfterEach JUnit5 lifecycle in Java — REST Assured just adds the HTTP layer.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'OAuth2 flow\'u REST Assured ile nasıl test edersiniz?', en: 'How do you test an OAuth2 flow with REST Assured?' },
            a: {
              tr: 'Client Credentials flow: given().auth().oauth2(getAccessToken()).get("/resource"). getAccessToken() metodu: given().formParam("grant_type","client_credentials").formParam("client_id","...").formParam("client_secret","...").post("/oauth/token").then().extract().path("access_token"). Authorization Code flow ise browser redirect içerdiğinden REST Assured ile tam olarak test edilemez — sadece token endpoint\'i ve resource endpoint test edilir. Token expire testini ayrıca yaz.',
              en: 'Client Credentials flow: given().auth().oauth2(getAccessToken()).get("/resource"). The getAccessToken() method: given().formParam("grant_type","client_credentials").formParam("client_id","...").formParam("client_secret","...").post("/oauth/token").then().extract().path("access_token"). Authorization Code flow cannot be fully tested with REST Assured because it involves a browser redirect — test only the token endpoint and resource endpoint. Write a separate test for token expiry.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir ekipte REST Assured projesi nasıl yapılandırılmalıdır?', en: 'How should a REST Assured project be structured for a team?' },
            a: {
              tr: 'src/test/java/ altında: base/ (BaseTest, ConfigReader), model/ (request/response POJO\'lar), api/ (endpoint wrapper sınıfları — UserApi, OrderApi gibi), tests/ (test sınıfları), utils/ (JwtUtil, TestDataFactory). src/test/resources/ altında: config dosyaları, JSON schema dosyaları, test fixture JSON\'lar. Bu yapı, Java\'daki Page Object Model\'in API katmanındaki karşılığıdır — endpoint wrapper\'lar page object\'e, test sınıfları test script\'e karşılık gelir.',
              en: 'Under src/test/java/: base/ (BaseTest, ConfigReader), model/ (request/response POJOs), api/ (endpoint wrapper classes — UserApi, OrderApi), tests/ (test classes), utils/ (JwtUtil, TestDataFactory). Under src/test/resources/: config files, JSON schema files, test fixture JSONs. This structure is the API-layer equivalent of the Page Object Model in Java — endpoint wrappers map to page objects, test classes to test scripts.',
            },
          },

          // ── ADVANCED (15) ────────────────────────────────────────────────────
          {
            level: 'advanced',
            q: { tr: 'Token auto-refresh nasıl implement edilir?', en: 'How do you implement token auto-refresh?' },
            a: {
              tr: 'REST Assured Filter arayüzünü implement et. filter() içinde: token süresi dolduysa yenile, header\'a ekle. 401 alınca da yenile ve isteği tekrar gönder (ctx.next()). RestAssured.filters(new TokenRefreshFilter()) ile global ekle. Java\'daki Servlet Filter mantığı — her istek bu interceptor\'dan geçer.',
              en: 'Implement the REST Assured Filter interface. In filter(): refresh if expired, add to header. On 401, refresh and retry with ctx.next(). Add globally via RestAssured.filters(new TokenRefreshFilter()). Servlet Filter logic in Java — every request passes through this interceptor.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Paralel testlerde test izolasyonu nasıl sağlanır?', en: 'How do you ensure test isolation in parallel tests?' },
            a: {
              tr: '(1) UUID/timestamp ile benzersiz test verisi — statik paylaşım yok. (2) Static değişken yerine ThreadLocal — her thread kendi token\'ını taşır. (3) @AfterEach\'de oluşturulan kaynakları sil. (4) pom.xml\'de maven-surefire-plugin parallel=methods forkCount=2. Test verisi çakışması en yaygın sorun; UUID ile her testin kendi benzersiz kullanıcısı/siparişi olur.',
              en: '(1) Unique test data with UUID/timestamp — no static sharing. (2) ThreadLocal instead of static variables — each thread carries its own token. (3) Delete created resources in @AfterEach. (4) In pom.xml: maven-surefire-plugin parallel=methods forkCount=2. Test data collision is the most common problem; UUID ensures each test has its own unique user/order.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Postman collection\'ını REST Assured\'a nasıl migrate edersiniz?', en: 'How would you migrate a Postman collection to REST Assured?' },
            a: {
              tr: '(1) Folder → test sınıfı. (2) Request → @Test metodu. (3) baseUrl → BaseTest/ConfigReader. (4) Environment variables → properties dosyaları. (5) Tests scripts → .then().body(). (6) Collection Runner → mvn test. Pre-request script\'ler @BeforeEach\'e dönüşür. Newman CLI\'dan Maven Surefire\'a geçiş, CI/CD entegrasyonu için çok daha güçlü bir altyapı sağlar.',
              en: '(1) Folder → test class. (2) Request → @Test method. (3) baseUrl → BaseTest/ConfigReader. (4) Environment variables → properties files. (5) Tests scripts → .then().body(). (6) Collection Runner → mvn test. Pre-request scripts become @BeforeEach. Moving from Newman CLI to Maven Surefire provides a much stronger CI/CD integration infrastructure.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Consumer-driven contract testing Pact framework ile nasıl implement edilir?', en: 'How do you implement consumer-driven contract testing with Pact?' },
            a: {
              tr: 'Consumer (frontend/başka microservice) beklediği API kontratını Pact dosyasına yazar. Provider (backend) bu kontratı REST Assured ile doğrular. @PactTestFor(providerName="UserService") ile provider testi: given(pactContext).get("/users/1").then().statusCode(200).body("id",equalTo(1)). Pact Broker\'da tüm kontratlar merkezi tutulur; her deployment\'ta "can I deploy?" kontrolü yapılır. Monolitten microservice\'e geçişte kritik güvenlik ağı.',
              en: 'The consumer (frontend/another microservice) writes the expected API contract to a Pact file. The provider (backend) verifies this contract with REST Assured. @PactTestFor(providerName="UserService") for the provider test: given(pactContext).get("/users/1").then().statusCode(200).body("id",equalTo(1)). All contracts are stored centrally in Pact Broker; a "can I deploy?" check runs on every deployment. Critical safety net when moving from monolith to microservices.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Microservice mimarisinde REST Assured ile API test stratejisi nasıl kurulur?', en: 'How do you build an API test strategy for microservices with REST Assured?' },
            a: {
              tr: '3 katmanlı strateji: (1) Unit — her servis kendi kontratını test eder (Pact). (2) Integration — servisler arası gerçek HTTP akışı (Testcontainers ile Docker\'da servisleri ayağa kaldır). (3) E2E — tam kullanıcı senaryosu. Her microservice\'e ayrı REST Assured modülü; shared-lib\'de ortak BaseTest ve POJO\'lar. Mock server (WireMock) ile bağımlı servisleri izole et. CI\'da her servis kendi testlerini bağımsız çalıştırır.',
              en: '3-layer strategy: (1) Unit — each service tests its own contract (Pact). (2) Integration — real HTTP flow between services (spin services up in Docker with Testcontainers). (3) E2E — full user scenario. A separate REST Assured module per microservice; common BaseTest and POJOs in a shared-lib. Isolate dependent services with a mock server (WireMock). In CI, each service runs its own tests independently.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Rate limiting mekanizmasını REST Assured ile nasıl test edersiniz?', en: 'How do you test a rate limiting mechanism with REST Assured?' },
            a: {
              tr: 'Rate limit genellikle N istek / dakikadır. Test: döngüde N+1 istek gönder, N\'inciye kadar 200 bekle, N+1\'incide 429 (Too Many Requests) bekle. then().statusCode(429).header("Retry-After", notNullValue()). Paralel gönderim için ExecutorService ile çoklu thread\'den eş zamanlı istek. Sonuçları ListenableFuture ile topla. Rate limit window sıfırlanmasını test etmek için: window süresini bekle (Awaitility), sonra yeniden istek gönder.',
              en: 'Rate limit is typically N requests per minute. Test: send N+1 requests in a loop, expect 200 up to N, expect 429 (Too Many Requests) on N+1. then().statusCode(429).header("Retry-After", notNullValue()). For concurrent sending: use ExecutorService to send simultaneous requests from multiple threads. Collect results with ListenableFuture. To test rate limit window reset: wait for the window to expire (Awaitility), then send again.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Retry mekanizması için REST Assured Filter nasıl implement edilir?', en: 'How do you implement a retry mechanism using a REST Assured Filter?' },
            a: {
              tr: 'public class RetryFilter implements Filter { private final int maxRetries; public Response filter(req, res, ctx) { Response response = ctx.next(req,res); int retries = 0; while ((response.statusCode()==503 || response.statusCode()==429) && retries < maxRetries) { Thread.sleep(exponentialBackoff(retries)); response = ctx.next(req,res); retries++; } return response; } }. Exponential backoff: 1s, 2s, 4s, 8s. Jitter ekle (rastgele +/- 100ms) thundering herd önlemek için. RestAssured.filters(new RetryFilter(3)) ile global uygula.',
              en: 'public class RetryFilter implements Filter { private final int maxRetries; public Response filter(req, res, ctx) { Response response = ctx.next(req,res); int retries = 0; while ((response.statusCode()==503 || response.statusCode()==429) && retries < maxRetries) { Thread.sleep(exponentialBackoff(retries)); response = ctx.next(req,res); retries++; } return response; } }. Exponential backoff: 1s, 2s, 4s, 8s. Add jitter (random +/- 100ms) to prevent thundering herd. Apply globally with RestAssured.filters(new RetryFilter(3)).',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'GraphQL API\'leri REST Assured ile nasıl test edersiniz?', en: 'How do you test GraphQL APIs with REST Assured?' },
            a: {
              tr: 'GraphQL tek endpoint\'dir (POST /graphql). Body\'de query string gönderilir: given().contentType("application/json").body("{ \\"query\\": \\"{ users { id name email } }\\" }").post("/graphql").then().statusCode(200).body("data.users", hasSize(greaterThan(0))).body("errors", nullValue()). Mutation testi: { \\"query\\": \\"mutation { createUser(name:\\"Alice\\") { id } }\\" }. GraphQL hataları HTTP 200 ile döner — errors field\'ını her zaman kontrol et. Variables için body\'de "variables" key\'ini de dahil et.',
              en: 'GraphQL has a single endpoint (POST /graphql). Send a query string in the body: given().contentType("application/json").body("{ \\"query\\": \\"{ users { id name email } }\\" }").post("/graphql").then().statusCode(200).body("data.users", hasSize(greaterThan(0))).body("errors", nullValue()). Mutation test: { \\"query\\": \\"mutation { createUser(name:\\"Alice\\") { id } }\\" }. GraphQL errors return with HTTP 200 — always check the errors field. Include the "variables" key in the body for parameterized queries.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'CI/CD pipeline\'da REST Assured testleri nasıl çalıştırılır ve raporlanır?', en: 'How are REST Assured tests run and reported in a CI/CD pipeline?' },
            a: {
              tr: 'Jenkins/GitHub Actions: mvn test -Denv=staging -Dsurefire.failIfNoSpecifiedTests=false. Maven Surefire XML raporları hedef konumda üretilir; Jenkins JUnit Publisher bu XML\'leri okur. Allure için: mvn allure:report → HTML rapor. Başarısızlıkta build fail — exit code 1. Paralel çalışma: mvn test -T 4 veya Surefire\'da forkCount=2 reuseForks=false. Environment değişkenleri Jenkins Credentials ile güvenli enjekte edilir. Test sonuçlarına Slack notification: Post-build Action + Slack notifier plugin.',
              en: 'Jenkins/GitHub Actions: mvn test -Denv=staging -Dsurefire.failIfNoSpecifiedTests=false. Maven Surefire produces XML reports at the target location; Jenkins JUnit Publisher reads these XMLs. For Allure: mvn allure:report → HTML report. Build fails on test failure — exit code 1. Parallel execution: mvn test -T 4 or forkCount=2 reuseForks=false in Surefire. Environment variables are injected securely via Jenkins Credentials. Slack notifications on results: Post-build Action + Slack notifier plugin.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Test data factory pattern REST Assured projesinde nasıl uygulanır?', en: 'How do you apply the test data factory pattern in a REST Assured project?' },
            a: {
              tr: 'Builder pattern: class UserRequestBuilder { private String name="test_"+UUID.randomUUID(); private String email=name+"@test.com"; private String role="USER"; public UserRequestBuilder withRole(String r){this.role=r; return this;} public UserRequest build(){return new UserRequest(name,email,role);} }. Kullanım: UserRequest admin = new UserRequestBuilder().withRole("ADMIN").build(). Presets: UserRequestBuilder.aDefaultUser(), .anAdminUser(), .anInactiveUser(). Bu factory\'nin sağladığı: veri değişince tek yer güncellenir; tüm testlerde tutarlı baseline data.',
              en: 'Builder pattern: class UserRequestBuilder { private String name="test_"+UUID.randomUUID(); private String email=name+"@test.com"; private String role="USER"; public UserRequestBuilder withRole(String r){this.role=r; return this;} public UserRequest build(){return new UserRequest(name,email,role);} }. Usage: UserRequest admin = new UserRequestBuilder().withRole("ADMIN").build(). Presets: UserRequestBuilder.aDefaultUser(), .anAdminUser(), .anInactiveUser(). What this factory provides: one place to update when data changes; consistent baseline data across all tests.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Performance regression testing: API response time SLA\'larını otomatik doğrulama', en: 'Performance regression testing: automatically verifying API response time SLAs' },
            a: {
              tr: 'Her kritik endpoint için SLA tanımla (ör: /users < 300ms, /search < 1000ms). Her test sonunda assert et: then().time(lessThan(300L)). Trend için: her test çalışmasında response time\'ı CSV\'ye yaz, Grafana\'da görselleştir. Percentile testi için JMeter\'la birlikte kullan (REST Assured p99 ölçemez). Regression testi: main\'e merge öncesi CI\'da SLA testi çalış. SLA ihlalinde build fail — bu, API performans gerilmesini production\'a çıkmadan önce yakalar.',
              en: 'Define an SLA for each critical endpoint (e.g., /users < 300ms, /search < 1000ms). Assert after each test: then().time(lessThan(300L)). For trends: write response time to CSV on each test run, visualize in Grafana. For percentile testing, use JMeter alongside (REST Assured cannot measure p99). Regression test: run the SLA test in CI before merging to main. Build fails on SLA breach — this catches API performance regressions before they reach production.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Security testing: API seviyesinde SQL injection ve XSS girişimlerini nasıl test edersiniz?', en: 'Security testing: how do you test SQL injection and XSS attempts at the API level?' },
            a: {
              tr: 'SQL injection: given().queryParam("id","1 OR 1=1").get("/users").then().statusCode(400) — uygulama 400 veya boş döndürmeli, 200+data ASLA döndürmemeli. XSS: given().body(new UserRequest("<script>alert(1)</script>")).post("/users").then().body("name",not(containsString("<script>"))). Path traversal: GET /files?name=../../etc/passwd → 400 beklenir. Her input validation edge case\'ini test et. OWASP Top 10 API Security checklist\'i referans al. Bu testler güvenlik duvarının arkasında da çalışmalı — WAF\'ı bypass eden iç saldırı senaryolarını yakalar.',
              en: 'SQL injection: given().queryParam("id","1 OR 1=1").get("/users").then().statusCode(400) — app must return 400 or empty, NEVER 200+data. XSS: given().body(new UserRequest("<script>alert(1)</script>")).post("/users").then().body("name",not(containsString("<script>"))). Path traversal: GET /files?name=../../etc/passwd → expect 400. Test every input validation edge case. Reference the OWASP Top 10 API Security checklist. These tests should also run behind the firewall — they catch internal attack scenarios that bypass the WAF.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'API versioning test stratejisi: v1 ve v2\'yi aynı anda nasıl kapsarsınız?', en: 'API versioning test strategy: how do you cover v1 and v2 simultaneously?' },
            a: {
              tr: 'Her version için ayrı RequestSpecification: v1Spec (baseUri=/api/v1), v2Spec (baseUri=/api/v2). Test sınıflarını parametrize et: @ParameterizedTest ile her testi hem v1 hem v2 için çalıştır. Backward compatibility: v1 endpoint\'leri v2 deploy sonrasında da çalışmalı — v1 smoke test suite\'i her deployment sonrası çalıştır. Breaking change detection: v1 response şemasını JSON Schema\'ya sabitle, v2 deploy sonrası v1 şema testini çalıştır. Deprecation schedule\'ı test planına yansıt.',
              en: 'Separate RequestSpecification per version: v1Spec (baseUri=/api/v1), v2Spec (baseUri=/api/v2). Parameterize test classes: run each test for both v1 and v2 with @ParameterizedTest. Backward compatibility: v1 endpoints must work after v2 deployment — run v1 smoke test suite after every deployment. Breaking change detection: pin v1 response schema to a JSON Schema file, run v1 schema test after v2 deployment. Reflect the deprecation schedule in the test plan.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'WireMock ile bağımlı servisleri izole ederek REST Assured testleri nasıl yazılır?', en: 'How do you write REST Assured tests by isolating dependent services with WireMock?' },
            a: {
              tr: 'WireMock sunucu ayağa kaldır: WireMockServer wireMock = new WireMockServer(8089); wireMock.start(). Stub tanımla: wireMock.stubFor(get(urlEqualTo("/payment/status")).willReturn(aResponse().withStatus(200).withBody("{\"status\":\"SUCCESS\"}")). RestAssured\'ı WireMock\'a yönlendir: RestAssured.baseURI="http://localhost:8089". @BeforeAll/@AfterAll ile başlat/durdur. Avantaj: ödeme servisi, e-posta servisi gibi dış bağımlılıklar olmadan servisini test edersin. Java\'daki Mockito ile aynı konsept — ama HTTP katmanında mock yapılır.',
              en: 'Start a WireMock server: WireMockServer wireMock = new WireMockServer(8089); wireMock.start(). Define a stub: wireMock.stubFor(get(urlEqualTo("/payment/status")).willReturn(aResponse().withStatus(200).withBody("{\"status\":\"SUCCESS\"}")). Point REST Assured to WireMock: RestAssured.baseURI="http://localhost:8089". Start/stop with @BeforeAll/@AfterAll. Benefit: test your service without external dependencies like payment or email services. Same concept as Mockito in Java — but mocking at the HTTP layer.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Production benzeri yük altında REST Assured testlerinin güvenilirliğini nasıl sağlarsınız?', en: 'How do you ensure REST Assured test reliability under production-like load?' },
            a: {
              tr: 'REST Assured yük testi için tasarlanmamıştır (bunu JMeter yapar). Ama yük altında güvenilirlik için: (1) Connection pool konfigürasyonu — RestAssured.config(config().httpClient(httpClientConfig().setParam("http.conn-mgr.max-total-connections",100))). (2) Timeout\'lar — connectTimeout ve socketTimeout\'u açıkça set et. (3) Idempotent test verisi — tekrar çalıştırılabilir (yeniden çalıştırılabilirlik). (4) Retry filter ile transient 503/429\'ları atla. (5) Test izolasyonu — her test bağımsız, shared state yok. Bu 5 kural REST Assured\'ı CI/CD\'de kararlı kılar.',
              en: 'REST Assured is not designed for load testing (that\'s JMeter\'s job). But for reliability under production-like load: (1) Connection pool config — RestAssured.config(config().httpClient(httpClientConfig().setParam("http.conn-mgr.max-total-connections",100))). (2) Timeouts — explicitly set connectTimeout and socketTimeout. (3) Idempotent test data — re-runnable. (4) Retry filter to skip transient 503/429s. (5) Test isolation — every test is independent, no shared state. These 5 rules make REST Assured stable in CI/CD.',
            },
          },
        ],
      },
      {
        type: 'glossary-section',
        terms: [
          { term: 'DSL', definition: { tr: 'Domain-Specific Language — belirli alan için özelleştirilmiş mini dil.', en: 'Domain-Specific Language — a mini-language specialized for a specific domain.' } },
          { term: 'RequestSpecification', definition: { tr: 'Tekrar kullanılabilir request ayarları: baseUri, headers, auth.', en: 'Reusable request settings: baseUri, headers, auth. Created with RequestSpecBuilder.' } },
          { term: 'Hamcrest', definition: { tr: 'Java assertion kütüphanesi. equalTo(), notNullValue(), hasSize() gibi matchers.', en: 'Java assertion library providing readable matchers like equalTo(), notNullValue(), hasSize().' } },
          { term: 'POJO', definition: { tr: 'Plain Old Java Object — request/response body\'yi tip-safe temsil eden sade Java sınıfı.', en: 'Plain Old Java Object — a simple Java class that represents request/response body in a type-safe way.' } },
          { term: 'Jackson', definition: { tr: 'Java ↔ JSON dönüşüm kütüphanesi. REST Assured otomatik kullanır.', en: 'Java ↔ JSON conversion library. REST Assured uses it automatically when it is on the classpath.' } },
          { term: 'JsonPath', definition: { tr: '"data[0].email" gibi JSON navigasyon dili.', en: 'A JSON navigation language like "data[0].email". Used with extract().path().' } },
          { term: 'extract()', definition: { tr: 'Response\'dan değer çıkarmak için kullanılır.', en: 'Used to pull values from a response: .extract().path("token") or .extract().body().as(MyClass.class)' } },
          { term: 'Filter', definition: { tr: 'Her request/response döngüsüne müdahale eden interceptor.', en: 'An interceptor that hooks into every request/response cycle. Used for token refresh, logging, rate limiting.' } },
          { term: 'Awaitility', definition: { tr: 'Async işlemleri test etmek için polling kütüphanesi.', en: 'A polling library for testing async operations. The clean alternative to Thread.sleep.' } },
          { term: 'Contract Testing', definition: { tr: 'API\'nin belirlenen kontrata uyup uymadığını doğrulama. JSON Schema ile yapılır.', en: 'Verifying that an API conforms to a defined contract. Implemented with JSON Schema validation.' } },
        ],
      },
    ],
  },
]

// ─── Hero & Tabs ──────────────────────────────────────────────────────────────

const trHero = {
  title: '🧪 REST Assured',
  subtitle: 'Java ile API Test Otomasyonu — Sıfırdan Gerçek Projeye',
  intro: 'REST Assured, Java\'da REST API testleri yazmak için kullanılan DSL kütüphanesidir. given().when().then() sözdizimi, POJO desteği, JSON Schema validation ve CI/CD entegrasyonu ile kurumsal projelerde sektör standardı haline gelmiştir.',
}

const enHero = {
  title: '🧪 REST Assured',
  subtitle: 'Java API Test Automation — Zero to Real Projects',
  intro: 'REST Assured is a DSL library for writing REST API tests in Java. With given().when().then() syntax, POJO support, JSON Schema validation, and CI/CD integration, it has become the industry standard in enterprise API testing.',
}

const trTabs = [
  '🏠 Neden REST Assured?', '⚙️ Kurulum', '📡 Temel İstekler', '🔐 Authentication',
  '📦 POJO & Jackson', '✅ Assertions', '🗂️ JSON Path & Schema',
  '🔗 Test Zinciri', '🚨 Gerçek Hayat Sorunları', '🆚 Araç Karşılaştırması',
  '🏗️ Framework Mimarisi', '💼 Mülakat Soruları',
]

const enTabs = [
  '🏠 Why REST Assured?', '⚙️ Setup', '📡 Basic Requests', '🔐 Authentication',
  '📦 POJO & Jackson', '✅ Assertions', '🗂️ JSON Path & Schema',
  '🔗 Test Chaining', '🚨 Real-Life Issues', '🆚 Tool Comparison',
  '🏗️ Framework Architecture', '💼 Interview Q&A',
]

// ─── Export ───────────────────────────────────────────────────────────────────

export const restAssuredData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}

fillMissingCodeTrios(restAssuredData, 'restassured')

// ─── Feynman checkpoints for sections missing one ────────────────────────────
const restAssuredFeynmanDefs = [
  {
    sectionIndex: 0,
    promptTr: 'REST Assured nedir ve neden Postman\'a alternatif olarak tercih edilir? Java geliştiricisi bakış açısıyla anlat.',
    promptEn: 'What is REST Assured and why is it preferred as an alternative to Postman? Explain from a Java developer perspective.',
    keywords: [['java','kod'], ['given','when','then'], ['junit','testng'], ['ci','pipeline'], ['assertion','doğrula']],
    minScore: 3,
    modelAnswerTr: 'REST Assured, Java\'da API testi yazmayı sağlayan bir kütüphanedir. Postman\'dan farkı: testlerin kaynak kodda, sürüm kontrolünde ve CI/CD pipeline\'ında yer almasını sağlar. given().when().then() zinciri, Java\'nın fluent builder desenine benzer. JUnit/TestNG ile doğrudan entegre olur; Postman\'ın Newman\'a ihtiyaç duyduğu şeyin yerini alır. Java bilen bir QA için en doğal seçimdir.',
    modelAnswerEn: 'REST Assured is a Java library for writing API tests. Unlike Postman, tests live in source code, version control, and CI/CD pipelines. The given().when().then() chain resembles Java\'s fluent builder pattern. It integrates directly with JUnit/TestNG, replacing what Postman needs Newman for. For a Java-background QA engineer it is the most natural choice.',
  },
  {
    sectionIndex: 1,
    promptTr: 'REST Assured projesini nasıl kurarsın? Maven bağımlılıkları neler? İlk testi yazıp çalıştırmak için hangi adımları izlersin?',
    promptEn: 'How do you set up a REST Assured project? What are the Maven dependencies? What steps do you follow to write and run your first test?',
    keywords: [['maven','pom','dependency'], ['hamcrest','assertion'], ['junit','testng','@test'], ['basepath','baseuri'], ['import']],
    minScore: 3,
    modelAnswerTr: 'Maven pom.xml\'e rest-assured ve hamcrest bağımlılıklarını eklersin. Test sınıfı oluşturup @Test annotasyonu ile bir metod yazarsın. RestAssured.baseURI ile base URL\'yi ayarlarsın. given().when().get("/endpoint").then().statusCode(200) şeklinde ilk testi çalıştırırsın. JUnit runner ile mvn test komutunu kullanırsın.',
    modelAnswerEn: 'You add rest-assured and hamcrest dependencies to Maven pom.xml. Create a test class and write a method with @Test annotation. Set the base URL with RestAssured.baseURI. Run your first test with given().when().get("/endpoint").then().statusCode(200). Use mvn test with the JUnit runner.',
  },
  {
    sectionIndex: 2,
    promptTr: 'REST Assured\'da GET, POST, PUT, DELETE istekleri nasıl gönderilir? given/when/then zincirini örnekle açıkla.',
    promptEn: 'How do you send GET, POST, PUT, DELETE requests in REST Assured? Explain the given/when/then chain with an example.',
    keywords: [['given','when','then'], ['get','post','put','delete'], ['body','json'], ['header','content-type'], ['response','statuscode']],
    minScore: 3,
    modelAnswerTr: 'given() → request yapılandırması (header, body, auth). when() → HTTP metodu ve endpoint (get(), post(), put(), delete()). then() → response doğrulaması (statusCode(), body() assertion). Örnek POST: given().contentType(JSON).body(payload).when().post("/users").then().statusCode(201).body("id", notNullValue()). Java Builder desenine çok benzediğinden Java bilenler için doğal hissettiriyor.',
    modelAnswerEn: 'given() → request setup (header, body, auth). when() → HTTP method and endpoint (get(), post(), put(), delete()). then() → response validation (statusCode(), body() assertions). Example POST: given().contentType(JSON).body(payload).when().post("/users").then().statusCode(201).body("id", notNullValue()). It feels natural for Java developers because it resembles the Builder pattern.',
  },
  {
    sectionIndex: 3,
    promptTr: 'REST Assured\'da API kimlik doğrulama nasıl yapılır? Basic Auth, Bearer Token ve OAuth2 arasındaki fark nedir?',
    promptEn: 'How do you handle API authentication in REST Assured? What is the difference between Basic Auth, Bearer Token, and OAuth2?',
    keywords: [['auth','authentication','doğrulama'], ['basic','bearer','token'], ['header','authorization'], ['oauth','login'], ['session','cookie']],
    minScore: 3,
    modelAnswerTr: 'Basic Auth: given().auth().basic("user","pass"). Bearer Token: given().header("Authorization","Bearer "+token). OAuth2: önce token endpoint\'ine POST at, dönen token\'ı sonraki isteklerde Bearer olarak kullan. Fark: Basic Auth kullanıcı adı/parola gönderir, Bearer bir oturum token\'ı kullanır, OAuth2 ise yetkilendirme akışıyla token üretir. QA testlerinde genelde test ortamı için sabit token kullanılır.',
    modelAnswerEn: 'Basic Auth: given().auth().basic("user","pass"). Bearer Token: given().header("Authorization","Bearer "+token). OAuth2: first POST to the token endpoint, then use the returned token as Bearer in subsequent requests. Difference: Basic Auth sends username/password, Bearer uses a session token, OAuth2 generates a token through an authorization flow. In QA tests you usually use a fixed token for test environments.',
  },
  {
    sectionIndex: 4,
    promptTr: 'REST Assured\'da POJO ve Jackson neden kullanılır? Type-safe API testi ne demektir? Örnek ver.',
    promptEn: 'Why are POJO and Jackson used in REST Assured? What does type-safe API testing mean? Give an example.',
    keywords: [['pojo','class','nesne'], ['jackson','objectmapper','serialize'], ['type','tip','dönüştür'], ['body','as'], ['null','npe']],
    minScore: 3,
    modelAnswerTr: 'POJO (Plain Old Java Object), API\'nin request/response body\'sini temsil eden Java sınıfıdır. Jackson kütüphanesi JSON ile POJO arasında dönüşüm yapar. Type-safe API testi: yanıtı string olarak işlemek yerine gerçek Java nesnesine dönüştürürsün. Örnek: .as(User.class) ile response\'u User sınıfına deserialize et, ardından assertEquals(expected.getEmail(), user.getEmail()) yap. Böylece alan adı yanlışsa derleme hatası alırsın — JSON path string\'iyle asla böyle koruma elde edemezsin.',
    modelAnswerEn: 'POJO (Plain Old Java Object) is a Java class representing the API\'s request/response body. Jackson handles conversion between JSON and POJOs. Type-safe API testing: instead of parsing strings you deserialize the response into a real Java object. Example: .as(User.class) deserializes response to User class, then assertEquals(expected.getEmail(), user.getEmail()). If a field name is wrong you get a compile error — you never get this protection with a JSON path string.',
  },
  {
    sectionIndex: 6,
    promptTr: 'REST Assured\'da JSON Path ve Schema Validation nasıl yapılır? Neden JSON şema doğrulaması önemlidir?',
    promptEn: 'How do you do JSON Path and Schema Validation in REST Assured? Why is JSON schema validation important?',
    keywords: [['jsonpath','path','$.'], ['schema','şema'], ['hamcrest','matcher'], ['contract','kontrat'], ['validate','doğrula']],
    minScore: 3,
    modelAnswerTr: 'JSON Path: body("users[0].email", equalTo("test@example.com")) ile belirli bir alanı doğrularsın. $.users[0].email gibi path notasyonu Groovy tabanlıdır. JSON Schema Validation: API yanıtının önceden tanımlanmış şemaya uyduğunu doğrular — alan tiplerini, zorunlu alanları ve format kurallarını kontrol eder. Önemi: API kontratı değişince (alan adı değişirse veya tip bozulursa) testler anında yakaladığı için sessiz kırılmaları önler.',
    modelAnswerEn: 'JSON Path: validate a specific field with body("users[0].email", equalTo("test@example.com")). Path notation like $.users[0].email is Groovy-based. JSON Schema Validation: verifies that the API response conforms to a predefined schema — checks field types, required fields, and format rules. Why it matters: if the API contract changes (field name changes or type breaks), tests catch it immediately and prevent silent failures.',
  },
  {
    sectionIndex: 7,
    promptTr: 'REST Assured\'da test zinciri (test chaining) nedir? Neden tek bir test içinde birden fazla istek zincirlersin?',
    promptEn: 'What is test chaining in REST Assured? Why would you chain multiple requests in a single test?',
    keywords: [['chain','zincir','sıra'], ['session','id','response'], ['extract','yanıt'], ['e2e','senaryo'], ['depend','bağımlı']],
    minScore: 3,
    modelAnswerTr: 'Test zinciri: bir API yanıtından alınan değeri (örn. kullanıcı ID veya token) sonraki isteğe parametre olarak geçirme işlemidir. Örnek: POST /login\'den token al → GET /users/{id}\'da kullan → DELETE /users/{id} ile temizle. .extract().path("token") veya .as(LoginResponse.class).getToken() ile değeri alırsın. Bunu yapmak zorunda olduğun durum: backend\'in durumlu (stateful) olduğu ve adımların birbirine bağlı olduğu gerçek E2E senaryoları.',
    modelAnswerEn: 'Test chaining: passing a value extracted from one API response (e.g. user ID or token) as a parameter to the next request. Example: get token from POST /login → use in GET /users/{id} → clean up with DELETE /users/{id}. Extract the value with .extract().path("token") or .as(LoginResponse.class).getToken(). You need this when the backend is stateful and steps depend on each other — real E2E scenarios.',
  },
  {
    sectionIndex: 8,
    promptTr: 'REST Assured kullanırken karşılaştığın en yaygın sorunlar neler? 401, 500, SSL ve zaman aşımı hatalarını nasıl çözersin?',
    promptEn: 'What are the most common issues when using REST Assured? How do you fix 401, 500, SSL, and timeout errors?',
    keywords: [['401','auth','token'], ['500','server','sunucu'], ['ssl','certificate','sertifika'], ['timeout','zaman'], ['debug','log']],
    minScore: 3,
    modelAnswerTr: '401 → auth header veya token hatalı, önce login endpoint\'ini kontrol et. 500 → sunucu hatası, request body\'ni ve server loglarını incele. SSL hatası → test ortamında RelaxedHTTPSValidation() ekle. Timeout → Connection/Socket timeout değerlerini artır. Debug için: .log().all() ekleyerek tüm request/response detaylarını konsola yaz. NullPointerException → response body null, önce statusCode\'u doğrula.',
    modelAnswerEn: '401 → wrong auth header or token, check the login endpoint first. 500 → server error, inspect request body and server logs. SSL error → add RelaxedHTTPSValidation() in test environment. Timeout → increase Connection/Socket timeout values. For debugging: add .log().all() to print all request/response details to console. NullPointerException → response body is null, first verify the statusCode.',
  },
  {
    sectionIndex: 9,
    promptTr: 'REST Assured, Postman ve Karate DSL arasındaki farkları özet olarak anlat. Hangi durumda hangisini seçersin?',
    promptEn: 'Summarize the differences between REST Assured, Postman, and Karate DSL. When would you choose each?',
    keywords: [['java','kod'], ['postman','gui','ui'], ['karate','dsl','gherkin'], ['ci','pipeline'], ['team','takım']],
    minScore: 3,
    modelAnswerTr: 'REST Assured: Java kod tabanlı, JUnit/TestNG entegrasyonu mükemmel, CI/CD dostu, Java bilen QA için en iyi seçim. Postman: UI tabanlı, hızlı keşif ve prototipler için ideal, Newman ile CI\'a entegre edilebilir, kod yazmayı sevmeyenler için. Karate DSL: Gherkin benzeri sözdizimi, Java bilmeden API testi yazmaya izin verir, ama bakımı zor olabilir. Seçim: Java ekibiyse REST Assured, hızlı keşif/takım iletişimiyse Postman, kod yazmak istemiyorsa Karate.',
    modelAnswerEn: 'REST Assured: Java code-based, excellent JUnit/TestNG integration, CI/CD-friendly, best choice for Java-background QA. Postman: UI-based, ideal for quick exploration and prototypes, integrates with CI via Newman, good for those who dislike coding. Karate DSL: Gherkin-like syntax, allows writing API tests without deep Java knowledge but can be hard to maintain. Choice: REST Assured for Java teams, Postman for quick discovery/team communication, Karate for non-coders.',
  },
  {
    sectionIndex: 11,
    promptTr: 'REST Assured mülakat sorusunda "given/when/then nedir ve neden bu yapıyı kullanıyorsunuz?" deseler ne dersin?',
    promptEn: 'In a REST Assured interview if asked "What is given/when/then and why do you use this structure?", what would you say?',
    keywords: [['given','precondition','önceden'], ['when','action','eylem'], ['then','verify','doğrula'], ['bdd','gherkin'], ['readable','okunabilir']],
    minScore: 3,
    modelAnswerTr: 'given/when/then yapısı BDD (Behavior Driven Development) yaklaşımından gelir. given() → test ön koşullarını ve request yapılandırmasını kur. when() → tetikleyici eylemi gerçekleştir (HTTP isteğini gönder). then() → beklenen sonucu doğrula. Bu yapıyı kullanmamızın sebebi: testler insan tarafından okunabilir, teknik olmayan paydaşlara bile anlaşılır ve her bölüm tek bir sorumluluğa odaklanır. Java\'nın Builder deseniyle benzer mantığı taşır.',
    modelAnswerEn: 'The given/when/then structure comes from BDD (Behavior Driven Development). given() → set up preconditions and request configuration. when() → perform the triggering action (send the HTTP request). then() → verify the expected result. We use this structure because tests are human-readable, understandable even to non-technical stakeholders, and each section focuses on a single responsibility. It mirrors the logic of Java\'s Builder pattern.',
  },
]

fillMissingFeynman(restAssuredData, restAssuredFeynmanDefs)
