package dev.learnqa.qashop;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Kontrollü kusurlar — <b>testin gerçekten baktığını kanıtlama</b>.
 *
 * <p>Bir test paketinin tamamen yeşil dönmesi iyi bir haber gibi görünür ama
 * tek başına hiçbir şey kanıtlamaz: her zaman yeşil kalan bir kontrol ile
 * hiçbir şeye bakmayan bozuk bir kontrol, rapor ekranında birbirinin
 * aynısıdır. Aradaki farkı görmenin tek yolu, kusuru bilerek üretip kontrolün
 * KIRMIZIYA döndüğünü görmektir.
 *
 * <p>Bu sınıf tam olarak bunu yapar: bir kusuru açar, o kusurun bozması
 * gereken davranışı ölçer ve gerçekten bozulduğunu doğrular. Yani buradaki
 * testler ürünü değil, <b>diğer testlerin geçerliliğini</b> sınar.
 *
 * <p>İZOLASYON: bu sınıf KENDİ sandbox'ını açar. Paylaşılan alanda kusur
 * açsaydı, koşum sırasına bağlı olarak başka sınıfları düşürür ve teşhis
 * edilmesi çok zor bir kırılganlık üretirdi.
 */
@DisplayName("Kontrollü kusurlar")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BugFlagTest extends BaseTest {

    private String kendiAnahtar;
    private String kendiEposta;
    private String kendiParola;
    private RequestSpecification kendiAnonim;
    private RequestSpecification kendiGirisli;

    /**
     * Bu sınıfın kendi sandbox'ından GÜNCEL bir ürün id'si okur.
     *
     * <p>⚠ Değer ÖNBELLEKLENEMEZ. Bu sınıfın {@code @AfterEach} adımı
     * {@code POST /sandbox/reset} çağırıyor; sıfırlama satırları silip
     * {@code clone_sandbox} ile yeniden yazıyor ve {@code bigserial} id'ler
     * HER SIFIRLAMADA yeniden kayıyor. Yani bir kez okunup alanda saklanan id
     * ilk testten sonra bayatlar ve sonraki testler 404 alır.
     *
     * <p>Sabit id yazmanın bir üst katmanı bu: id'ler yalnızca sandbox'lar
     * arasında değil, aynı sandbox'ın iki sıfırlaması arasında da değişir.
     */
    private int urunId() {
        return birUrunId(kendiAnonim);
    }

    @BeforeAll
    void kendiAlaniniAc() {
        JsonPath json = given()
                .baseUri(API)
                .contentType(ContentType.JSON)
                .body(Map.of("label", "rest-assured-kusur"))
                .when().post("/sandbox")
                .then().statusCode(201)
                .extract().jsonPath();

        kendiAnahtar = json.getString("apiKey");
        kendiEposta = json.getString("demoUser.email");
        kendiParola = json.getString("demoUser.password");

        kendiAnonim = new RequestSpecBuilder()
                .setBaseUri(API)
                .addHeader("X-Sandbox-Key", kendiAnahtar)
                .setContentType(ContentType.JSON)
                .build();

        yenidenGirisYap();
    }

    /**
     * Oturumu yeniden açar ve girişli şablonu tazeler.
     *
     * <p>⚠ TOKEN DE ÖNBELLEKLENEMEZ. {@code reset_sandbox} tabloları silerken
     * {@code sessions} tablosunu da boşaltır — yani sıfırlama, açık tüm
     * oturumları GERÇEKTEN iptal eder. Bir kez alınıp saklanan token ilk
     * sıfırlamadan sonra 401 döndürür.
     *
     * <p>Bu, {@code logout}'un sahte bir 204 dönmediği tasarımın doğal sonucu:
     * oturum gerçek bir kayıt olduğu için silinince gerçekten ölüyor.
     */
    private void yenidenGirisYap() {
        String token = given(kendiAnonim)
                .body(Map.of("email", kendiEposta, "password", kendiParola))
                .when().post("/auth/login")
                .then().statusCode(200)
                .extract().path("token");

        kendiGirisli = new RequestSpecBuilder()
                .setBaseUri(API)
                .addHeader("X-Sandbox-Key", kendiAnahtar)
                .addHeader("Authorization", "Bearer " + token)
                .setContentType(ContentType.JSON)
                .build();
    }

    @AfterEach
    void kusurlariKapat() {
        // Her testten sonra temiz duruma dön. Sıfırlama hem tohum veriyi geri
        // getirir hem TÜM kusur anahtarlarını kapatır — "temiz durum, kusursuz
        // durumdur".
        given(kendiAnonim).when().post("/sandbox/reset").then().statusCode(200);

        // Sıfırlama oturumları da iptal ettiği için token yenilenmeli; yoksa
        // bir sonraki testin ilk yazma isteği 401 alır ve hata, kusurla ilgisi
        // olmayan bir yerde patlar.
        yenidenGirisYap();
    }

    @Test
    @DisplayName("Temiz sandbox'ta hiç kusur açık değildir")
    void temizSandboxKusursuz() {
        given(kendiAnonim)
                .when().get("/sandbox/bugs")
                .then().statusCode(200)
                .body("active", empty())
                .body("available", not(empty()));
    }

    @Test
    @DisplayName("Katalogdaki her kusur nasıl yakalanacağını söyler")
    void katalogYakalamaYoluSoyler() {
        List<Map<String, Object>> kusurlar = given(kendiAnonim)
                .when().get("/sandbox/bugs")
                .then().statusCode(200)
                .extract().jsonPath().getList("available");

        for (Map<String, Object> k : kusurlar) {
            assertNotNull(k.get("catchableBy"),
                    "Kusur '" + k.get("key") + "' nasil yakalanacagini soylemiyor");
        }
    }

    @Test
    @DisplayName("NEGATİF · Uydurma anahtar sessizce yutulmaz")
    void uydurmaAnahtarReddedilir() {
        // Yok sayılsaydı, yazım hatası yapan kullanıcı kusuru açtığını sanır,
        // testi yeşil kalır ve bundan "testim çalışıyor" sonucunu çıkarırdı —
        // tam olarak önlemeye çalıştığımız yanılgı.
        given(kendiAnonim)
                .body(Map.of("boyle_bir_kusur_yok", true))
                .when().patch("/sandbox/bugs")
                .then().statusCode(422)
                .body("error.code", equalTo("UNKNOWN_BUG_FLAG"))
                .body("error.details.available", not(empty()));
    }

    @Test
    @DisplayName("KANIT · skip_stock_decrement açıkken stok DÜŞMEZ")
    void stokDusmemeKusuruGercektenCalisir() {
        int variantId = stogaSahipVaryant();
        int oncesi = stokAdedi(variantId);

        kusurAc("skip_stock_decrement");

        siparisVer(variantId, 1);

        int sonrasi = stokAdedi(variantId);

        // Kusur açıkken stok DEĞİŞMEMELİ. Değişiyorsa kusur enjeksiyonu
        // çalışmıyor demektir ve "kusuru açtım, testim yine yeşil" sonucu
        // yanıltıcı olurdu.
        assertEquals(oncesi, sonrasi,
                "Kusur acik olmasina ragmen stok dustu — kusur enjeksiyonu calismiyor");
    }

    @Test
    @DisplayName("KANIT · Kusur kapalıyken stok GERÇEKTEN düşer")
    void kusursuzDurumdaStokDuser() {
        // Yukarıdaki testin karşı kutbu. İkisi birlikte, ölçümün gerçekten
        // kusura duyarlı olduğunu gösterir: biri "kusur açıkken bozuluyor",
        // diğeri "kapalıyken çalışıyor" der.
        int variantId = stogaSahipVaryant();
        int oncesi = stokAdedi(variantId);

        siparisVer(variantId, 1);

        assertEquals(oncesi - 1, stokAdedi(variantId),
                "Kusur kapaliyken stok dusmedi — asil davranis bozuk");
    }

    @Test
    @DisplayName("KANIT · weak_password_accepted açıkken zayıf parola KABUL edilir")
    void zayifParolaKusuruGercektenCalisir() {
        // Kapalıyken reddedilmeli.
        given(kendiAnonim)
                .body(Map.of("email", "kontrol@qashop.test", "password", "123", "name", "Kontrol"))
                .when().post("/auth/register")
                .then().statusCode(422);

        kusurAc("weak_password_accepted");

        // Açıkken aynı istek geçer. AuthTest'teki negatif test bu durumda
        // KIRMIZIYA döner — yani o test gerçekten bir şeye bakıyor.
        given(kendiAnonim)
                .body(Map.of("email", "zayif@qashop.test", "password", "123", "name", "Zayif"))
                .when().post("/auth/register")
                .then().statusCode(201);
    }

    @Test
    @DisplayName("Sıfırlama tüm kusurları kapatır")
    void sifirlamaKusurlariKapatir() {
        kusurAc("oversell");

        given(kendiAnonim)
                .when().get("/sandbox/bugs")
                .then().body("active", hasItem("oversell"));

        given(kendiAnonim).when().post("/sandbox/reset").then().statusCode(200);

        given(kendiAnonim)
                .when().get("/sandbox/bugs")
                .then().body("active", empty());
    }

    // ─── yardımcılar ────────────────────────────────────────────────────────

    private void kusurAc(String anahtar) {
        given(kendiAnonim)
                .body(Map.of(anahtar, true))
                .when().patch("/sandbox/bugs")
                .then().statusCode(200)
                .body("active", hasItem(anahtar));
    }

    private int stogaSahipVaryant() {
        List<Map<String, Object>> varyantlar = given(kendiAnonim)
                .when().get("/products/" + urunId() + "/variants")
                .then().statusCode(200)
                .extract().jsonPath().getList("variants");

        return varyantlar.stream()
                .filter(v -> ((Number) v.get("available")).intValue() >= 2)
                .map(v -> ((Number) v.get("id")).intValue())
                .findFirst()
                .orElseThrow(() -> new AssertionError("Stogu yeterli varyant yok"));
    }

    private int stokAdedi(int variantId) {
        List<Map<String, Object>> varyantlar = given(kendiAnonim)
                .when().get("/products/" + urunId() + "/variants")
                .then().statusCode(200)
                .extract().jsonPath().getList("variants");

        return varyantlar.stream()
                .filter(v -> ((Number) v.get("id")).intValue() == variantId)
                .map(v -> ((Number) v.get("stock_qty")).intValue())
                .findFirst().orElseThrow();
    }

    private void siparisVer(int variantId, int adet) {
        int cartId = given(kendiGirisli)
                .when().post("/carts")
                .then().statusCode(201)
                .extract().path("cart.id");

        given(kendiGirisli)
                .body(Map.of("variantId", variantId, "qty", adet))
                .when().post("/carts/" + cartId + "/items")
                .then().statusCode(201);

        given(kendiGirisli)
                .body(Map.of("cartId", cartId))
                .when().post("/orders")
                .then().statusCode(201);
    }
}
