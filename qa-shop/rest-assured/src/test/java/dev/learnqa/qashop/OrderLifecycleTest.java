package dev.learnqa.qashop;

import io.restassured.path.json.JsonPath;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;

import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Uçtan uca sipariş akışı: sepet → sipariş → ödeme → kargo → teslim → iade.
 *
 * <p>Bu sınıf bilinçli olarak SIRALI koşar ({@link TestMethodOrder}). Genel
 * kural "her test bağımsız olmalı"dır ve doğrudur; ama burada test edilen şey
 * tek tek adımlar değil, adımlar arasındaki GEÇİŞLERDİR. Bir durum makinesini
 * bağımsız testlerle doğrulamak, her testin kendi kurulumunda aynı zinciri
 * baştan kurmasını gerektirir — o zaman da asıl test edilen şey kurulum kodu
 * olur.
 *
 * <p>İzolasyon yine korunuyor: sınıf kendi sandbox'ında çalışıyor ve başka bir
 * sınıfın verisine dokunamıyor.
 */
@DisplayName("Sipariş yaşam döngüsü")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class OrderLifecycleTest extends BaseTest {

    private static RequestSpecification girisli;
    private static int variantId;
    private static int stokOncesi;
    private static int cartId;
    private static int orderId;

    @BeforeAll
    void oturumAc() {
        girisli = girisli(girisYap());
    }

    @Test
    @Order(1)
    @DisplayName("01 · Stoğu yeterli bir varyant seçilir")
    void varyantSec() {
        JsonPath json = given(anonim)
                .when().get("/products/1/variants")
                .then().statusCode(200)
                .extract().jsonPath();

        List<Map<String, Object>> varyantlar = json.getList("variants");

        // Stoğu tükenmiş bir varyanta takılırsak sonraki adımlar konu dışı bir
        // 409 ile düşer ve hata, asıl aradığımız yerde değilmiş gibi görünür.
        Map<String, Object> uygun = varyantlar.stream()
                .filter(v -> ((Number) v.get("available")).intValue() >= 2)
                .findFirst()
                .orElseThrow(() -> new AssertionError(
                        "Stogu 2'den fazla olan varyant bulunamadi — tohum veri beklenenden farkli"));

        variantId = ((Number) uygun.get("id")).intValue();
        stokOncesi = ((Number) uygun.get("available")).intValue();
    }

    @Test
    @Order(2)
    @DisplayName("02 · Sepet açılır")
    void sepetAc() {
        cartId = given(girisli)
                .when().post("/carts")
                .then().statusCode(201)
                // DİKKAT: id gövdenin kökünde DEĞİL, cart nesnesinin içinde.
                // Sözleşmeyi okumadan yazılan bir test burada null taşır.
                .extract().path("cart.id");

        assertTrue(cartId > 0);
    }

    @Test
    @Order(3)
    @DisplayName("03 · Sepete eklemek stoğu REZERVE eder")
    void sepeteEkle() {
        given(girisli)
                .body(Map.of("variantId", variantId, "qty", 2))
                .when().post("/carts/" + cartId + "/items")
                .then().statusCode(201)
                .body("items.size()", equalTo(1));

        // Yan etkinin doğrulaması: sepet cevabına bakmak yetmez, envantere
        // bakmak gerekir. `skip_reserve` kusuru tam olarak burada yakalanır.
        int simdi = satilabilirAdet(variantId);
        assertEquals(stokOncesi - 2, simdi,
                "Sepete ekleme stogu rezerve etmedi");
    }

    @Test
    @Order(4)
    @DisplayName("04 · Kupon oranı doğru hesaplanır")
    void kuponUygula() {
        JsonPath json = given(girisli)
                .body(Map.of("code", "WELCOME10"))
                .when().post("/carts/" + cartId + "/coupon")
                .then().statusCode(200)
                .extract().jsonPath();

        float araToplam = json.getFloat("totals.subtotal");
        float indirim = json.getFloat("totals.discount_total");
        float kargo = json.getFloat("totals.shipping_total");
        float genelToplam = json.getFloat("totals.grand_total");

        // "indirim > 0" demek yeterli değil: yanlış oranla hesaplanmış bir
        // indirimi de yeşil geçerdi.
        assertEquals(Math.round(araToplam * 0.10f * 100) / 100f, indirim, 0.02f,
                "Yuzde 10 kupon dogru hesaplanmamis");

        assertEquals(araToplam - indirim + kargo, genelToplam, 0.02f,
                "Genel toplam formulu tutmuyor");
    }

    @Test
    @Order(5)
    @DisplayName("05 · NEGATİF · Süresi geçmiş kupon ayrı kodla reddedilir")
    void suresiGecmisKuponReddedilir() {
        given(girisli)
                .body(Map.of("code", "EXPIRED20"))
                .when().post("/carts/" + cartId + "/coupon")
                .then().statusCode(422)
                // "Kupon gecersiz" demek, hangi is kuralinin devreye girdigini
                // test edilemez hale getirirdi.
                .body("error.code", equalTo("COUPON_EXPIRED"));
    }

    @Test
    @Order(6)
    @DisplayName("06 · Sipariş oluşur ve mutabakat tutar")
    void siparisOlustur() {
        JsonPath json = given(girisli)
                .body(Map.of("cartId", cartId))
                .when().post("/orders")
                .then().statusCode(201)
                .body("order.status", equalTo("placed"))
                .extract().jsonPath();

        orderId = json.getInt("order.id");

        float araToplam = json.getFloat("order.subtotal");
        float indirim = json.getFloat("order.discount_total");
        float kargo = json.getFloat("order.shipping_total");
        float genelToplam = json.getFloat("order.grand_total");

        // `discount_twice` kusuru burada yakalanır.
        assertEquals(araToplam - indirim + kargo, genelToplam, 0.02f,
                "Mutabakat tutmuyor: genel toplam bilesenleriyle uyusmuyor");
    }

    @Test
    @Order(7)
    @DisplayName("07 · Stok düşer, rezervasyon serbest kalır")
    void stokDuser() {
        JsonPath json = given(anonim)
                .when().get("/products/1/variants")
                .then().statusCode(200)
                .extract().jsonPath();

        List<Map<String, Object>> varyantlar = json.getList("variants");
        Map<String, Object> v = varyantlar.stream()
                .filter(x -> ((Number) x.get("id")).intValue() == variantId)
                .findFirst().orElseThrow();

        int stok = ((Number) v.get("stock_qty")).intValue();
        int rezerve = ((Number) v.get("reserved_qty")).intValue();
        int satilabilir = ((Number) v.get("available")).intValue();

        // Stok düşüp rezervasyon serbest kalmazsa ürün İKİ KEZ sayılır:
        // hem satılmış hem hâlâ sepette bekliyor görünür.
        assertEquals(Math.max(0, stok - rezerve), satilabilir,
                "Rezervasyon serbest birakilmamis");
    }

    @Test
    @Order(8)
    @DisplayName("08 · Fatura kendi tutarlılığını beyan eder")
    void faturaTutarli() {
        given(girisli)
                .when().get("/orders/" + orderId + "/invoice")
                .then().statusCode(200)
                // `wrong_line_total` kusuru burada yakalanır.
                .body("reconciled", equalTo(true));
    }

    @Test
    @Order(9)
    @DisplayName("09 · NEGATİF · Ödemesiz sipariş kargolanamaz")
    void odemesizKargoEngellenir() {
        given(girisli)
                .body(Map.of("carrier", "Yurtici"))
                .when().post("/orders/" + orderId + "/ship")
                .then().statusCode(409)
                .body("error.code", equalTo("INVALID_TRANSITION"));
    }

    @Test
    @Order(10)
    @DisplayName("10 · NEGATİF · Başarısız ödeme 402 döner ve durumu DEĞİŞTİRMEZ")
    void basarisizOdemeDurumuDegistirmez() {
        given(girisli)
                .body(Map.of("method", "card", "simulateFailure", true))
                .when().post("/orders/" + orderId + "/pay")
                .then().statusCode(402)
                .body("payment.status", equalTo("failed"));

        // "Denendi ve tutmadi" ile "hic denenmedi" farkli durumlardir; siparis
        // hala odeme bekliyor olmali.
        given(girisli)
                .when().get("/orders/" + orderId)
                .then().statusCode(200)
                .body("order.status", equalTo("placed"));
    }

    @Test
    @Order(11)
    @DisplayName("11 · Ödeme alınır")
    void odemeAl() {
        JsonPath json = given(girisli)
                .body(Map.of("method", "card"))
                .when().post("/orders/" + orderId + "/pay")
                .then().statusCode(200)
                .body("order.status", equalTo("paid"))
                .extract().jsonPath();

        assertEquals(json.getFloat("order.grand_total"), json.getFloat("payment.amount"), 0.02f,
                "Tahsil edilen tutar siparis tutarina esit degil");
    }

    @Test
    @Order(12)
    @DisplayName("12 · NEGATİF · İkinci kez ödeme alınamaz")
    void mukerrerOdemeReddedilir() {
        given(girisli)
                .body(Map.of("method", "card"))
                .when().post("/orders/" + orderId + "/pay")
                .then().statusCode(409)
                .body("error.code", equalTo("ALREADY_PAID"));
    }

    @Test
    @Order(13)
    @DisplayName("13 · Kargoya verilir")
    void kargoyaVer() {
        given(girisli)
                .body(Map.of("carrier", "Yurtici", "trackingNo", "TRK0000000042"))
                .when().post("/orders/" + orderId + "/ship")
                .then().statusCode(200)
                .body("order.status", equalTo("shipped"))
                .body("shipment.tracking_no", equalTo("TRK0000000042"));
    }

    @Test
    @Order(14)
    @DisplayName("14 · NEGATİF · Kargolanmış sipariş iptal edilemez")
    void kargolanmisSiparisIptalEdilemez() {
        // İptal ile iade farklı işlemlerdir: biri ürün hiç çıkmadan, diğeri
        // ürün müşterideyken olur. Stok ve muhasebe sonuçları da farklıdır.
        given(girisli)
                .when().post("/orders/" + orderId + "/cancel")
                .then().statusCode(409)
                .body("error.code", equalTo("INVALID_TRANSITION"));
    }

    @Test
    @Order(15)
    @DisplayName("15 · Teslim edilir ve teslim anı kaydedilir")
    void teslimEt() {
        given(girisli)
                .when().post("/orders/" + orderId + "/deliver")
                .then().statusCode(200)
                .body("order.status", equalTo("delivered"))
                // İade penceresi bu andan sayılır; boş kalırsa pencere hesabı
                // sessizce yanlış çalışır.
                .body("shipment.delivered_at", notNullValue());
    }

    @Test
    @Order(16)
    @DisplayName("16 · İade edilir ve stok geri yüklenir")
    void iadeEt() {
        int oncesi = satilabilirAdet(variantId);

        given(girisli)
                .when().post("/orders/" + orderId + "/return")
                .then().statusCode(200)
                .body("order.status", equalTo("returned"))
                .body("restoredItems", greaterThan(0));

        assertTrue(satilabilirAdet(variantId) > oncesi,
                "Iade sonrasi stok geri yuklenmemis");
    }

    /** Bir varyantın satılabilir adedini okur. */
    private int satilabilirAdet(int id) {
        List<Map<String, Object>> varyantlar = given(anonim)
                .when().get("/products/1/variants")
                .then().statusCode(200)
                .extract().jsonPath().getList("variants");

        return varyantlar.stream()
                .filter(v -> ((Number) v.get("id")).intValue() == id)
                .map(v -> ((Number) v.get("available")).intValue())
                .findFirst().orElseThrow();
    }
}
