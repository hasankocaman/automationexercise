package dev.learnqa.qashop;

import io.restassured.path.json.JsonPath;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Comparator;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Katalog — listeleme, sayfalama, sıralama, arama.
 *
 * <p>Buradaki asıl ders: <b>200 dönmesi işin doğru yapıldığı anlamına gelmez.</b>
 * Sunucu {@code sort} parametresini tamamen yok saysa bile istek yine 200
 * döner. Sıralamanın gerçekten uygulandığını görmek için dönen veriye bakmak
 * gerekir.
 */
@DisplayName("Katalog")
class CatalogTest extends BaseTest {

    @Test
    @DisplayName("Sayfalama sözleşmesi eksiksiz döner")
    void sayfalamaSozlesmesi() {
        given(anonim)
                .queryParam("page", 1)
                .queryParam("size", 5)
                .when()
                .get("/products")
                .then()
                .statusCode(200)
                .body("page", equalTo(1))
                .body("size", equalTo(5))
                .body("total", greaterThan(0))
                .body("totalPages", greaterThan(0))
                .body("hasNext", notNullValue())
                .body("items.size()", lessThanOrEqualTo(5));
    }

    @Test
    @DisplayName("Sıralama GERÇEKTEN uygulanıyor")
    void siralamaGercektenUygulaniyor() {
        List<Float> fiyatlar = given(anonim)
                .queryParam("size", 10)
                .queryParam("sort", "price")
                .queryParam("order", "desc")
                .when()
                .get("/products")
                .then()
                .statusCode(200)
                .extract().jsonPath().getList("items.price", Float.class);

        List<Float> beklenen = fiyatlar.stream()
                .sorted(Comparator.reverseOrder())
                .toList();

        assertEquals(beklenen, fiyatlar,
                "Fiyata gore azalan siralama uygulanmamis — istek yine 200 donuyor");
    }

    @Test
    @DisplayName("Pasif ürün listede görünmez")
    void pasifUrunListedeGorunmez() {
        // Soft delete edilmiş ürün listede görünmemeli AMA eski siparişlerde
        // durmalı — iki ayrı kural, iki ayrı test.
        JsonPath json = given(anonim)
                .queryParam("size", 100)
                .when()
                .get("/products")
                .then()
                .statusCode(200)
                .extract().jsonPath();

        List<Boolean> aktiflik = json.getList("items.is_active", Boolean.class);
        if (aktiflik != null && !aktiflik.isEmpty()) {
            assertTrue(aktiflik.stream().allMatch(Boolean::booleanValue),
                    "Listede pasif urun var");
        }
    }

    @Test
    @DisplayName("includeInactive ile pasif ürünler de gelir")
    void includeInactiveDavranisi() {
        int varsayilan = given(anonim)
                .queryParam("size", 1)
                .when().get("/products")
                .then().statusCode(200)
                .extract().path("total");

        int hepsi = given(anonim)
                .queryParam("size", 1)
                .queryParam("includeInactive", true)
                .when().get("/products")
                .then().statusCode(200)
                .extract().path("total");

        assertTrue(hepsi >= varsayilan,
                "includeInactive daha AZ sonuc donduremez (varsayilan=" + varsayilan
                        + ", hepsi=" + hepsi + ")");
    }

    @Test
    @DisplayName("Varyantlarda satılabilir adet = stok - rezerve")
    void satilabilirAdetHesabi() {
        JsonPath json = given(anonim)
                .when()
                .get("/products/1/variants")
                .then()
                .statusCode(200)
                .body("variants", not(empty()))
                .extract().jsonPath();

        List<Integer> stok = json.getList("variants.stock_qty", Integer.class);
        List<Integer> rezerve = json.getList("variants.reserved_qty", Integer.class);
        List<Integer> satilabilir = json.getList("variants.available", Integer.class);

        for (int i = 0; i < stok.size(); i++) {
            assertEquals(Math.max(0, stok.get(i) - rezerve.get(i)), satilabilir.get(i),
                    "Satilabilir adet hesabi tutmuyor (varyant index " + i + ")");
        }
    }

    @Test
    @DisplayName("Çok kısa arama terimi 400 ile reddedilir")
    void kisaAramaTerimiReddedilir() {
        given(anonim)
                .queryParam("q", "a")
                .when()
                .get("/search")
                .then()
                .statusCode(400);
    }

    @Test
    @DisplayName("Olmayan ürün 404 döndürür")
    void olmayanUrun404() {
        given(anonim)
                .when()
                .get("/products/99999999")
                .then()
                .statusCode(404)
                .body("error.code", equalTo("NOT_FOUND"));
    }

    @Test
    @DisplayName("Kategori ağacı döner")
    void kategoriAgaci() {
        given(anonim)
                .when()
                .get("/categories")
                .then()
                .statusCode(200)
                .body("categories", not(empty()));
    }
}
