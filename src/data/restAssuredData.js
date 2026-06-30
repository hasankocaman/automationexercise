// ─── Shared bilingual sections ────────────────────────────────────────────────
// All text fields use { tr, en } — tx() helper picks the right language.
// Code blocks never change between languages.
import { fillMissingCodeTrios, fillMissingFeynman } from './interactiveTrioFillers.js'

const sections = [

  // ── 0: Why REST Assured? ────────────────────────────────────────────────────
  {
    title: { tr: '🏠 Neden REST Assured?', en: '🏠 Why REST Assured?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '😤',
        content: {
          tr: 'Sabah 9\'da deployment var. Geliştirici "API hazır" dedi. Postman\'da 47 isteği tek tek elle test ettin, 3 saat geçti. Bir dahaki deployment\'ta yine aynı. REST Assured bu 3 saati 30 saniyeye indirir.',
          en: 'Deployment is at 9 AM. The developer said "API is ready." You manually tested 47 requests in Postman — 3 hours gone. Next deployment, same story. REST Assured cuts those 3 hours down to 30 seconds.',
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
          tr: 'Bir inşaat projesinde önce temel atılır. REST Assured projesinde temel: pom.xml bağımlılıkları + BaseTest sınıfı. Bu ikisi doğru kurulursa geri kalan test yazmak kolaylaşır.',
          en: 'Every building starts with a foundation. In a REST Assured project the foundation is: pom.xml dependencies + BaseTest class. Get these right and writing the actual tests becomes easy.',
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
          tr: 'Tüm örneklerde ücretsiz test API\'si reqres.in kullanılmıştır. Bu API\'yi gerçek projenle değiştirmek için sadece baseUri ve endpoint path\'ini değiştirmen yeterli.',
          en: 'All examples use the free test API reqres.in. To switch to your real project\'s API, just change the baseUri and endpoint path.',
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
          tr: 'Kapıcıya kimlik göstermeden binaya giremezsin. API\'de bu kimlik ya Basic Auth (kullanıcı:şifre), ya Bearer Token (JWT), ya da API Key\'dir. REST Assured üçünü de destekler.',
          en: 'You cannot enter a building without showing ID to the doorman. In an API, that ID is either Basic Auth (username:password), a Bearer Token (JWT), or an API Key. REST Assured supports all three.',
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
          tr: 'String JSON yazmak sanki şifreli mesaj göndermek gibi — typo yapsan derleme hatası vermez, runtime\'da patlar. POJO kullanmak ise IDE\'nin seni uyarması, autocomplete desteği ve tip güvenliği demektir.',
          en: 'Writing raw String JSON is like sending a message in code — a typo gives no compile error, it just blows up at runtime. Using a POJO means the IDE warns you, autocomplete works, and you get full type safety.',
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
          tr: 'Assertion, "beklediğim bu, aldığım bu, eşleşiyor mu?" sorusudur. Hamcrest matchers bu soruyu hem koda döker hem de hata olduğunda ne yanlış gittiğini net söyler.',
          en: 'An assertion asks: "I expected this, I got that — do they match?" Hamcrest matchers turn that question into code AND clearly tell you what went wrong when a test fails.',
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
          tr: '"data.users[0].address.city" — JSON Path, iç içe JSON\'da istediğin değere giden adrestir. Haritada koordinat gibi: latitude/longitude yerine nokta ve köşeli parantez kullanırsın.',
          en: '"data.users[0].address.city" — JSON Path is like a street address to the value you want inside nested JSON. Instead of latitude/longitude, you use dots and square brackets.',
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
          tr: 'Gerçek hayatta API testleri birbirinden bağımsız değildir. Önce kayıt ol, sonra giriş yap, sonra sepete ekle, sonra öde. Her adımın çıktısı bir sonrakinin girdisidir.',
          en: 'In real life, API tests are not independent of each other. First register, then login, then add to cart, then pay. The output of each step is the input of the next.',
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
          tr: 'Her deneyimli QA bu sorunlarla karşılaşmıştır. Çözümleri ezberlemek değil, sebebini anlamak önemli. Her sorunun altında "neden oluyor?" sorusunu sor.',
          en: 'Every experienced QA engineer has run into these problems. What matters is not memorizing solutions but understanding the root cause. Always ask "why is this happening?"',
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
          tr: 'Doğru araç, projenin diline ve ekibin deneyimine göre değişir. REST Assured Java projeleri için güçlüdür, Postman manuel test için hızlıdır, Karate hem teknik hem teknik olmayan kullanıcılar için uygundur.',
          en: 'The right tool depends on your project language and team experience. REST Assured is powerful for Java projects, Postman is fast for manual testing, and Karate suits both technical and non-technical users.',
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

  // ── 10: Interview Questions ───────────────────────────────────────────────────
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Questions' },
    blocks: [
      {
        type: 'interview-questions',
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
  '🔗 Test Zinciri', '🚨 Gerçek Hayat Sorunları', '🆚 Araç Karşılaştırması', '💼 Mülakat Soruları',
]

const enTabs = [
  '🏠 Why REST Assured?', '⚙️ Setup', '📡 Basic Requests', '🔐 Authentication',
  '📦 POJO & Jackson', '✅ Assertions', '🗂️ JSON Path & Schema',
  '🔗 Test Chaining', '🚨 Real-Life Issues', '🆚 Tool Comparison', '💼 Interview Q&A',
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
    sectionIndex: 10,
    promptTr: 'REST Assured mülakat sorusunda "given/when/then nedir ve neden bu yapıyı kullanıyorsunuz?" deseler ne dersin?',
    promptEn: 'In a REST Assured interview if asked "What is given/when/then and why do you use this structure?", what would you say?',
    keywords: [['given','precondition','önceden'], ['when','action','eylem'], ['then','verify','doğrula'], ['bdd','gherkin'], ['readable','okunabilir']],
    minScore: 3,
    modelAnswerTr: 'given/when/then yapısı BDD (Behavior Driven Development) yaklaşımından gelir. given() → test ön koşullarını ve request yapılandırmasını kur. when() → tetikleyici eylemi gerçekleştir (HTTP isteğini gönder). then() → beklenen sonucu doğrula. Bu yapıyı kullanmamızın sebebi: testler insan tarafından okunabilir, teknik olmayan paydaşlara bile anlaşılır ve her bölüm tek bir sorumluluğa odaklanır. Java\'nın Builder deseniyle benzer mantığı taşır.',
    modelAnswerEn: 'The given/when/then structure comes from BDD (Behavior Driven Development). given() → set up preconditions and request configuration. when() → perform the triggering action (send the HTTP request). then() → verify the expected result. We use this structure because tests are human-readable, understandable even to non-technical stakeholders, and each section focuses on a single responsibility. It mirrors the logic of Java\'s Builder pattern.',
  },
]

fillMissingFeynman(restAssuredData, restAssuredFeynmanDefs)
