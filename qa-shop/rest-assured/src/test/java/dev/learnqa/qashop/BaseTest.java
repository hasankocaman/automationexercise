package dev.learnqa.qashop;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.fail;

/**
 * Tüm test sınıflarının ortak kurulumu.
 *
 * <p>TASARIM KARARI — her koşum kendi sandbox'ını açar. Alternatif, paylaşılan
 * bir veri alanını her koşumdan önce sıfırlamaktı; o yol iki testi paralel
 * koşturmayı imkânsız kılar ve "benim testim başkasının verisini bozdu"
 * sınıfından hatalar üretir. Burada izolasyon kurulumla değil TASARIMLA
 * sağlanıyor.
 *
 * <p>Java tarafında bu yapı, Postman koleksiyonundaki ortam değişkeni
 * zincirinin karşılığıdır: orada {@code pm.environment.set(...)} ile taşınan
 * değer, burada {@code static} alanlarda taşınır. İkisini yan yana koyup
 * karşılaştırmak, bu paketin öğretici amacının bir parçası.
 */
public abstract class BaseTest {

    /** Yığın adresi. CI'da farklı bir adres gerekirse sistem özelliğiyle ezilir. */
    protected static final String BASE_URL =
            System.getProperty("qashop.baseUrl", "http://localhost:4000");

    protected static final String API = BASE_URL + "/api/v1";

    /** Bu koşuma ait izole veri alanının anahtarı. */
    protected static String sandboxKey;

    /** Tohum veride hazır gelen demo hesabın kimlik bilgileri. */
    protected static String demoEmail;
    protected static String demoPassword;

    /** Anahtarı taşıyan, ama giriş yapmamış istek şablonu. */
    protected static RequestSpecification anonim;

    @BeforeAll
    static void kurulum() {
        // Bir kez kurulur: sınıflar arası tekrar açmak gereksiz sandbox üretirdi.
        if (sandboxKey != null) return;

        RestAssured.baseURI = BASE_URL;

        saglikKontrolu();
        sandboxAc();

        anonim = new RequestSpecBuilder()
                .setBaseUri(API)
                .addHeader("X-Sandbox-Key", sandboxKey)
                .setContentType(ContentType.JSON)
                .build();
    }

    /**
     * Yığın ayakta değilse paket ONLARCA anlamsız bağlantı hatasıyla dolar ve
     * asıl neden ekranın çok yukarısında kalır. Burada tek ve net bir mesajla
     * duruyoruz.
     */
    private static void saglikKontrolu() {
        try {
            Response res = given().baseUri(BASE_URL).get("/health");
            if (res.statusCode() != 200) {
                fail("Yigin ayakta ama saglikli degil (HTTP " + res.statusCode() + "): "
                        + res.asString()
                        + "\nVeritabani baglantisini kontrol et: docker compose ps");
            }
            String db = res.jsonPath().getString("database");
            if (!"up".equals(db)) {
                fail("API ayakta ama veritabanina ulasamiyor (database=" + db + ")."
                        + "\nKontrol: docker compose logs db");
            }
        } catch (Exception e) {
            fail("Yigina ulasilamadi: " + BASE_URL
                    + "\nOnce ayaga kaldir:  cd qa-shop && docker compose up -d"
                    + "\nAyrinti: " + e.getMessage());
        }
    }

    private static void sandboxAc() {
        Response res = given()
                .baseUri(API)
                .contentType(ContentType.JSON)
                .body(Map.of("label", "rest-assured"))
                .when()
                .post("/sandbox")
                .then()
                .statusCode(201)
                .body("apiKey", startsWith("qas_"))
                .extract().response();

        sandboxKey = res.jsonPath().getString("apiKey");
        demoEmail = res.jsonPath().getString("demoUser.email");
        demoPassword = res.jsonPath().getString("demoUser.password");
    }

    /**
     * Giriş yapıp token döndürür.
     *
     * <p>Her sınıf kendi oturumunu açar: token paylaşmak, {@code logout}
     * davranışını test eden bir sınıfın diğerlerini düşürmesine yol açardı.
     */
    protected static String girisYap() {
        return given(anonim)
                .body(Map.of("email", demoEmail, "password", demoPassword))
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .extract().path("token");
    }

    /**
     * Katalogdan gerçek bir ürün id'si okur.
     *
     * <p>⚠ ID SABİT YAZILAMAZ. {@code clone_sandbox} satırları aynı tablolara
     * {@code bigserial} id'lerle kopyalar; her yeni sandbox'ta id'ler KAYAR.
     * Şablonda ürünler 1-120, ilk klonda 121-240, ikincide 241-360...
     *
     * <p>Bu tuzağın sinsi yanı şu: anahtarsız istek ŞABLON sandbox'a gider ve
     * orada id 1 GERÇEKTEN vardır. Yani {@code /products/1} elle denerken
     * çalışır, ama kendi alanını açan bir test aynı adreste 404 alır. Sabit
     * id yazılmış bir paket bu yüzden "bende çalışıyordu" ile karşılaşır.
     *
     * @param spec anahtarı taşıyan istek şablonu (hangi sandbox'a bakılacağı)
     */
    protected static int birUrunId(RequestSpecification spec) {
        return given(spec)
                .queryParam("size", 1)
                .when().get("/products")
                .then().statusCode(200)
                .extract().path("items[0].id");
    }

    /** Giriş yapmış istek şablonu. */
    protected static RequestSpecification girisli(String token) {
        return new RequestSpecBuilder()
                .setBaseUri(API)
                .addHeader("X-Sandbox-Key", sandboxKey)
                .addHeader("Authorization", "Bearer " + token)
                .setContentType(ContentType.JSON)
                .build();
    }

    /**
     * Hata ayıklarken açılır: isteği ve cevabı konsola basar.
     *
     * <p>Kalıcı olarak açık BIRAKILMAZ — CI günlüğünü okunmaz hâle getirir ve
     * cevap gövdesindeki token'lar log'a düşer.
     */
    protected static RequestSpecification ayrintiliLog(RequestSpecification spec) {
        return given(spec)
                .filter(new RequestLoggingFilter())
                .filter(new ResponseLoggingFilter());
    }
}
