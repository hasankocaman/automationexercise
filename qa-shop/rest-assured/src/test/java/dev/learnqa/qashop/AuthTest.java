package dev.learnqa.qashop;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

/**
 * Kimlik doğrulama — giriş, oturum ve NEGATİF senaryolar.
 *
 * <p>Bir ucun yalnızca mutlu yolunu test etmek, hiç test etmemekten yalnızca
 * biraz daha iyidir. Bu sınıftaki testlerin çoğunluğu bilerek reddedilme
 * senaryolarıdır.
 */
@DisplayName("Kimlik doğrulama")
class AuthTest extends BaseTest {

    @Test
    @DisplayName("Geçerli bilgilerle giriş token döndürür")
    void girisBasarili() {
        given(anonim)
                .body(Map.of("email", demoEmail, "password", demoPassword))
                .when()
                .post("/auth/login")
                .then()
                .statusCode(200)
                .body("token", not(emptyOrNullString()))
                .body("tokenType", equalTo("Bearer"))
                .body("expiresIn", greaterThan(0));
    }

    @Test
    @DisplayName("Token doğru kullanıcıyı temsil eder")
    void tokenDogruKullaniciyiTemsilEder() {
        // Yalnızca 200 kontrolü, BAŞKASININ kimliğini döndüren bir hatayı
        // yeşil geçerdi. Dönen e-postanın giriş yapanla aynı olduğu kontrol
        // edilmeli.
        String token = girisYap();

        given(girisli(token))
                .when()
                .get("/auth/me")
                .then()
                .statusCode(200)
                .body("user.email", equalTo(demoEmail));
    }

    @Test
    @DisplayName("Hatalı parola 401 döndürür")
    void hataliParolaReddedilir() {
        given(anonim)
                .body(Map.of("email", demoEmail, "password", "kesinlikle-yanlis"))
                .when()
                .post("/auth/login")
                .then()
                .statusCode(401)
                .body("error.code", equalTo("UNAUTHORIZED"));
    }

    @Test
    @DisplayName("Zayıf parolayla kayıt 422 ile reddedilir")
    void zayifParolaReddedilir() {
        given(anonim)
                .body(Map.of(
                        "email", "zayif-" + System.currentTimeMillis() + "@qashop.test",
                        "password", "123",
                        "name", "Zayif Parola"))
                .when()
                .post("/auth/register")
                .then()
                .statusCode(422)
                .body("error.code", equalTo("WEAK_PASSWORD"))
                .body("error.details.field", equalTo("password"));
    }

    @Test
    @DisplayName("Geçersiz e-posta biçimi 422 ile reddedilir")
    void gecersizEpostaReddedilir() {
        given(anonim)
                .body(Map.of(
                        "email", "bu-bir-eposta-degil",
                        "password", "GucluParola123!",
                        "name", "Test Kullanici"))
                .when()
                .post("/auth/register")
                .then()
                .statusCode(422)
                .body("error.code", equalTo("INVALID_EMAIL"));
    }

    @Test
    @DisplayName("Mükerrer e-posta 409 ile reddedilir")
    void mukerrerEpostaReddedilir() {
        // Tohum veride zaten var olan hesapla kayıt denenir.
        given(anonim)
                .body(Map.of(
                        "email", demoEmail,
                        "password", "GucluParola123!",
                        "name", "Kopya Hesap"))
                .when()
                .post("/auth/register")
                .then()
                .statusCode(409)
                .body("error.code", equalTo("EMAIL_ALREADY_EXISTS"));
    }

    @Test
    @DisplayName("Token'sız istek 401 döndürür")
    void tokensizIstekReddedilir() {
        given(anonim)
                .when()
                .get("/auth/me")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("logout oturumu GERÇEKTEN iptal eder")
    void logoutOturumuIptalEder() {
        // Stateless bir JWT kurgusunda logout sahte bir 204 döndürürdü ve bu
        // test yanlış yere yeşil geçerdi. Burada oturum kaydı iptal ediliyor,
        // yani davranış gerçekten test edilebilir.
        String token = girisYap();

        given(girisli(token)).when().get("/auth/me").then().statusCode(200);
        given(girisli(token)).when().post("/auth/logout").then().statusCode(anyOf(is(200), is(204)));
        given(girisli(token)).when().get("/auth/me").then().statusCode(401);
    }
}
