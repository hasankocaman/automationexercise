// ÜRETİLMİŞ DOSYA — ELLE DÜZENLEME.
//
// Kaynak: qa-shop/api/openapi.yaml
// Üreten: scripts/build-openapi-json.mjs  (npm run qa-shop:openapi)
//
// Sözleşme değişip bu türev yenilenmezse build kırılır. Bu bilinçli:
// sözleşme iki yerde elle tutulursa kaçınılmaz olarak ayrışır.
/* eslint-disable */

export const KAYNAK_HASH = "74545c9d9be7060ae6043ac0cfda9b0a"
export const UC_SAYISI = 46

export const OPENAPI = {
 "baslik": "QA Shop Practice API",
 "surum": "1.0.0",
 "aciklama": "Test otomasyonu pratiği için gerçek bir e-ticaret API'si. Mock değil:\nveri kalıcı, işlemler transaction içinde, stok gerçekten düşüyor.\n\n**Sandbox anahtarı göndermezsen** demo verisine salt okunur bağlanırsın —\n`GET` uçları çalışır, yazma denemeleri `401` döner. İlk denemeyi\nkolaylaştırmak için böyle.\n\n**Kendi alanını açmak için:** `POST /sandbox` → dönen `apiKey` değerini\n`X-Sandbox-Key` başlığında gönder. Alan 7 gün sonra otomatik silinir.\n\n**Her test koşumundan önce** `POST /sandbox/reset` çağır — temiz durum\notomasyonun en temel disiplinidir ve burada bir uç olarak hazır.\n\nDemo hesabı: `demo@qashop.test` / `Password123!`",
 "sunucular": [
  {
   "url": "http://localhost:4000",
   "aciklama": "Lokal Docker (docker compose up)"
  }
 ],
 "kimlikSemalari": [
  {
   "ad": "SandboxKey",
   "tip": "apiKey",
   "sema": null,
   "basligi": "X-Sandbox-Key",
   "nerede": "header",
   "aciklama": "Hangi veri alanına bağlanacağını belirler. `POST /api/v1/sandbox` ile\nalınır. Gönderilmezse demo verisine SALT OKUNUR bağlanılır."
  },
  {
   "ad": "BearerAuth",
   "tip": "http",
   "sema": "bearer",
   "basligi": "Authorization",
   "nerede": "header",
   "aciklama": "`POST /api/v1/auth/login` ile alınır. Gerçek JWT formatındadır —\njwt.io'ya yapıştırıp içindeki `sub`, `sandbox`, `jti`, `exp`\nalanlarını görebilirsin."
  }
 ],
 "etiketSirasi": [
  "Sistem",
  "Sandbox",
  "Kimlik",
  "Katalog",
  "Sepet",
  "Sipariş",
  "Adres",
  "Yorum",
  "Kusur"
 ],
 "etiketAciklamalari": {
  "Sistem": "Sağlık ve keşif",
  "Sandbox": "İzole veri alanı yönetimi — aç, durum gör, sıfırla, log oku",
  "Kimlik": "Kayıt, giriş, oturum",
  "Katalog": "Ürün, varyant, kategori, marka, arama",
  "Sepet": "Sepet ve satırları — stok rezervasyonu burada gerçekleşir",
  "Sipariş": "Checkout, listeleme, iptal, fatura, yaşam döngüsü (ödeme → kargo → teslim → iade)",
  "Adres": "Adres defteri — varsayılan adres kuralı tek satırdan fazlasını etkiler",
  "Yorum": "Ürün yorumları ve moderasyon — onaysız yorum listede ve ortalamada görünmez",
  "Kusur": "Kontrollü bug anahtarları — testinin gerçekten kırmızıya döndüğünü kanıtlamak için"
 },
 "uclar": [
  {
   "method": "GET",
   "yol": "/health",
   "etiket": "Sistem",
   "ozet": "Servis ve veritabanı sağlığı",
   "aciklama": "Sandbox çözümlemesinden ÖNCE çalışır: veritabanı ayakta değilken bile\ncevap verir. `503` dönüyorsa API ayakta ama DB'ye ulaşamıyor demektir —\n\"servis mi öldü, DB mi öldü\" ayrımını bu uç yapar.",
   "parametreler": [],
   "guvenlik": [],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Her şey çalışıyor",
     "alanlar": [
      {
       "ad": "status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: ok | degraded",
       "aciklama": ""
      },
      {
       "ad": "database",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: up | down",
       "aciklama": ""
      },
      {
       "ad": "uptimeSeconds",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "time",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "503",
     "aciklama": "Veritabanına ulaşılamıyor",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/openapi.yaml",
   "etiket": "Sistem",
   "ozet": "Bu sözleşmenin kendisi",
   "aciklama": "Sözleşme dosyadan servis edilir, koddan ÜRETİLMEZ. Postman\n\"Import > Link\" ve Swagger \"Import URL\" doğrudan bu adresi okur.\n\n`/openapi.yaml` adresi de aynı belgeyi verir (sürüm ön eki olmadan).",
   "parametreler": [],
   "guvenlik": [],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "OpenAPI belgesi (YAML)",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1",
   "etiket": "Sistem",
   "ozet": "API keşif noktası",
   "aciklama": "",
   "parametreler": [],
   "guvenlik": [],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Hızlı başlangıç adımları",
     "alanlar": [
      {
       "ad": "name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "version",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "quickStart",
       "tip": "array<string>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": "{\n  \"name\": \"QA Shop API\",\n  \"version\": \"v1\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/sandbox",
   "etiket": "Sandbox",
   "ozet": "Yeni izole veri alanı aç",
   "aciklama": "Kayıt İSTEMEZ. Şablonun birebir kopyasını alırsın: 120 ürün, 360\nvaryant, 41 kullanıcı, 150 siparişlik geçmiş. Yani SQL pratiği ilk\nsaniyeden itibaren anlamlı hacim bulur.",
   "parametreler": [],
   "guvenlik": [],
   "govdeZorunlu": false,
   "govdeAlanlari": [
    {
     "ad": "label",
     "tip": "string",
     "zorunlu": false,
     "kisit": "maxLength: 80",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"label\": \"benim-pratik-alanim\"\n}",
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Alan açıldı",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "apiKey",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "label",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "createdAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "expiresAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "howToUse",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "demoUser",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "demoUser.email",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "demoUser.password",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": "{\n  \"apiKey\": \"qas_3f9a2b...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/sandbox/state",
   "etiket": "Sandbox",
   "ozet": "Satır sayıları",
   "aciklama": "Test öncesi/sonrası kıyas için. \"Testim gerçekten bir şey değiştirdi\nmi?\" sorusunun en hızlı cevabı.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Durum özeti",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "mode",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: demo-readonly | private",
       "aciklama": ""
      },
      {
       "ad": "lastResetAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "counts",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.products",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.variants",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.users",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.carts",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.cart_items",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.orders",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.order_items",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.reviews",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "counts.audit_log",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "410",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/sandbox/reset",
   "etiket": "Sandbox",
   "ozet": "Seed veriye dön",
   "aciklama": "Tüm kullanıcı verisi silinir ve şablon yeniden kopyalanır. Açık\noturumlar da silinir — sıfırlamadan sonra tekrar `login` gerekir.\n\nTest paketinin `beforeAll` adımına konması beklenir.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sıfırlandı",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "resetAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "durationMs",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "message",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": "{\n  \"durationMs\": 340\n}"
    },
    {
     "kod": "401",
     "aciklama": "Demo (salt okunur) modda sıfırlama yapılamaz",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/sandbox/logs",
   "etiket": "Sandbox",
   "ozet": "Denetim kaydı (log analizi pratiği)",
   "aciklama": "Bir hata aldığında cevabın `correlationId` değerini buraya ver;\nisteğin tüm zincirini görürsün. Kök neden analizinin API tarafı budur.",
   "parametreler": [
    {
     "ad": "level",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "enum: INFO | WARN | ERROR",
     "aciklama": ""
    },
    {
     "ad": "action",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "correlationId",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "limit",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "maximum: 500 · default: 100",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Log satırları (en yeni önce)",
     "alanlar": [
      {
       "ad": "total",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "limit",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "logs[].level",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: INFO | WARN | ERROR",
       "aciklama": ""
      },
      {
       "ad": "logs[].actor",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].action",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].entity",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].entity_id",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].correlation_id",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "logs[].detail",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "400",
     "aciklama": "Geçersiz `level` değeri",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/auth/register",
   "etiket": "Kimlik",
   "ozet": "Yeni kullanıcı kaydı",
   "aciklama": "Token DÖNMEZ. Kayıt ile giriş ayrı işlemlerdir; birleştirmek \"kayıt\nolan herkes otomatik giriş yapar\" varsayımını dayatır ve e-posta\ndoğrulaması eklendiğinde kırılır.\n\nE-posta küçük harfe indirgenir: `Ali@x.com` ile `ali@x.com` aynı kişidir.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "email",
     "tip": "string",
     "zorunlu": true,
     "kisit": "format: email",
     "aciklama": ""
    },
    {
     "ad": "password",
     "tip": "string",
     "zorunlu": true,
     "kisit": "minLength: 8",
     "aciklama": "En az 8 karakter, en az bir harf ve bir rakam"
    },
    {
     "ad": "name",
     "tip": "string",
     "zorunlu": true,
     "kisit": "minLength: 2",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"email\": \"yeni@qashop.test\",\n  \"password\": \"Password123!\",\n  \"name\": \"Yeni Kullanıcı\"\n}",
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Kullanıcı oluşturuldu",
     "alanlar": [
      {
       "ad": "user",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "user.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "user.email",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "user.name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "user.is_active",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "user.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "E-posta zaten kayıtlı (`EMAIL_ALREADY_EXISTS`)",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    },
    {
     "kod": "422",
     "aciklama": "Doğrulama hatası. Kod alanı hangi kuralın devreye girdiğini söyler:\n`INVALID_EMAIL`, `WEAK_PASSWORD`, `INVALID_NAME`.",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/auth/login",
   "etiket": "Kimlik",
   "ozet": "Giriş yap, token al",
   "aciklama": "⚠ Kullanıcı yoksa da parola yanlışsa da **aynı** `401` ve **aynı**\nmesaj döner. Farklı mesaj vermek \"bu e-posta kayıtlı\" bilgisini\nsızdırırdı (user enumeration). Testte de bu beklenir.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "email",
     "tip": "string",
     "zorunlu": true,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "password",
     "tip": "string",
     "zorunlu": true,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"email\": \"demo@qashop.test\",\n  \"password\": \"Password123!\"\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Giriş başarılı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "400",
     "aciklama": "`email` veya `password` eksik",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    },
    {
     "kod": "401",
     "aciklama": "Bilgiler hatalı ya da hesap pasif",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/auth/me",
   "etiket": "Kimlik",
   "ozet": "🔒 Oturumdaki kullanıcı",
   "aciklama": "",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Kullanıcı bilgisi",
     "alanlar": [
      {
       "ad": "user",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/auth/logout",
   "etiket": "Kimlik",
   "ozet": "🔒 Oturumu kapat",
   "aciklama": "Oturumu GERÇEKTEN iptal eder (veritabanında işaretlenir). Stateless\nbir JWT'de logout sahte bir `204` olurdu: token hâlâ geçerli kalırdı\nve \"çıkıştan sonra eski token'la `/me` çağır\" testi yanlış yere yeşil\ngeçerdi. Burada o test doğru şekilde `401` görür.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "204",
     "aciklama": "Çıkış yapıldı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/auth/refresh",
   "etiket": "Kimlik",
   "ozet": "🔒 Token yenile",
   "aciklama": "Eski oturum iptal edilir, yeni token verilir.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Yeni token",
     "alanlar": [
      {
       "ad": "token",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "tokenType",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "expiresIn",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "expiresAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": "{\n  \"tokenType\": \"Bearer\",\n  \"expiresIn\": 3600\n}"
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/products",
   "etiket": "Katalog",
   "ozet": "Ürün listesi",
   "aciklama": "Pasif ürünler varsayılan olarak GİZLİDİR (soft delete). `includeInactive=true`\nile görünür — \"silinen ürün katalogda çıkmamalı ama eski siparişte\ndurmalı\" kuralının test edilebilir hâli.\n\nMarkası olmayan ürünler vardır (`brand` alanı `null`). Bu bilinçlidir:\nINNER JOIN ile LEFT JOIN farkını gösteren satırlar olmadan JOIN dersi\nanlatılamaz.",
   "parametreler": [
    {
     "ad": "page",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "minimum: 1 · default: 1",
     "aciklama": ""
    },
    {
     "ad": "size",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "maximum: 100 · default: 20",
     "aciklama": ""
    },
    {
     "ad": "sort",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "enum: price | name | created | sku · default: sku",
     "aciklama": ""
    },
    {
     "ad": "order",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "enum: asc | desc · default: asc",
     "aciklama": ""
    },
    {
     "ad": "category",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "brand",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "minPrice",
     "nerede": "query",
     "zorunlu": false,
     "tip": "number",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "maxPrice",
     "nerede": "query",
     "zorunlu": false,
     "tip": "number",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "q",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "includeInactive",
     "nerede": "query",
     "zorunlu": false,
     "tip": "boolean",
     "kisit": "default: false",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sayfalanmış ürün listesi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "400",
     "aciklama": "Tanımsız `sort` değeri",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/products/{id}",
   "etiket": "Katalog",
   "ozet": "Ürün detayı",
   "aciklama": "`rating_avg` YALNIZCA onaylı yorumlardan hesaplanır; bekleyen yorum\npuana etki etmemelidir. Pasif ürün `404` döner.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Ürün",
     "alanlar": [
      {
       "ad": "product",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "400",
     "aciklama": "id sayı değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Ürün yok ya da artık satışta değil",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/products/{id}/variants",
   "etiket": "Katalog",
   "ozet": "Ürünün varyantları ve stoğu",
   "aciklama": "`available = stock_qty - reserved_qty`. Yalnızca `stock_qty`'ye bakmak\nsepette bekleyen adedi görmez ve oversell üretir.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Varyant listesi",
     "alanlar": [
      {
       "ad": "productId",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "total",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].sku",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].size",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: S | M | L",
       "aciklama": ""
      },
      {
       "ad": "variants[].color",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].stock_qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].reserved_qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "variants[].available",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "stock_qty - reserved_qty. Sipariş edilebilir gerçek adet."
      }
     ],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Ürün bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/categories",
   "etiket": "Katalog",
   "ozet": "Kategori ağacı",
   "aciklama": "",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Üst kategoriler ve altları",
     "alanlar": [
      {
       "ad": "total",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].slug",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].parent_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].product_count",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].slug",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].parent_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].product_count",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "categories[].children[].children",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/categories/{id}/products",
   "etiket": "Katalog",
   "ozet": "Kategorideki ürünler (alt kategoriler dahil)",
   "aciklama": "Üst kategori istendiğinde altındaki tüm kategorilerin ürünleri döner.\nYalnızca doğrudan eşleşmeye bakan bir sorgu üst kategorilerde her zaman\nboş liste verirdi.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "page",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 1",
     "aciklama": ""
    },
    {
     "ad": "size",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 20",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sayfalanmış ürün listesi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Kategori bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/brands",
   "etiket": "Katalog",
   "ozet": "Marka listesi",
   "aciklama": "",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Markalar ve ürün sayıları",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/search",
   "etiket": "Katalog",
   "ozet": "Ürün arama",
   "aciklama": "2 karakterden kısa terim `400` döner. Boş aramayı sessizce \"her şeyi\ndöndür\"e çevirmek, arayüzde fark edilmeyen bir performans sorununa\ndönüşür.",
   "parametreler": [
    {
     "ad": "q",
     "nerede": "query",
     "zorunlu": true,
     "tip": "string",
     "kisit": "minLength: 2",
     "aciklama": ""
    },
    {
     "ad": "page",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 1",
     "aciklama": ""
    },
    {
     "ad": "size",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 20",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Arama sonuçları",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "400",
     "aciklama": "Terim çok kısa",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/carts",
   "etiket": "Sepet",
   "ozet": "Sepet aç",
   "aciklama": "Token gönderirsen sepet kullanıcıya bağlanır; göndermezsen misafir sepeti olur.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Sepet oluşturuldu",
     "alanlar": [
      {
       "ad": "cart",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.user_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.guest_token",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: open | converted | abandoned",
       "aciklama": ""
      },
      {
       "ad": "cart.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/carts/{id}",
   "etiket": "Sepet",
   "ozet": "Sepet detayı ve toplamlar",
   "aciklama": "`warnings.priceChanged` alanı, sepetteki fiyatın ürünün güncel\nfiyatından farklı olduğu satırları listeler. Sepet eski fiyatı korur —\nbu bir bug değil, bilinçli bir karardır; ama arayüzün hangisini\ngöstereceğine kendi karar verdiği için TEST EDİLMESİ gereken bir karardır.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sepet",
     "alanlar": [
      {
       "ad": "cart",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.user_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.guest_token",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: open | converted | abandoned",
       "aciklama": ""
      },
      {
       "ad": "cart.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "items",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].variant_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].variant_sku",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].product_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].product_name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].size",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].color",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].unit_price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Sepete atıldığı ANDAKİ fiyat (snapshot)."
      },
      {
       "ad": "items[].current_price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Ürünün ŞU ANKİ fiyatı. unit_price ile farklıysa uyarı üretilir."
      },
      {
       "ad": "items[].line_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].stock_qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].available",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "itemCount",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "grand_total = subtotal - discount_total + shipping_total\nKargo 500 TL ve üzeri bedava, altında 29.90."
      },
      {
       "ad": "totals.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].itemId",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].variantSku",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].cartPrice",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].currentPrice",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sepet başka bir kullanıcıya ait",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Sepet bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/carts/{id}/items",
   "etiket": "Sepet",
   "ozet": "Sepete ürün ekle",
   "aciklama": "Stok REZERVE edilir (`reserved_qty` artar). Rezervasyon olmadan iki\nkullanıcı son ürünü sepetine atar ve hata ancak ödeme sonrası çıkar.\n\nAynı varyant ikinci kez eklenirse adet artırılır, yeni satır açılmaz.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "variantId",
     "tip": "integer",
     "zorunlu": true,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "qty",
     "tip": "integer",
     "zorunlu": false,
     "kisit": "minimum: 1 · default: 1",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"variantId\": 1,\n  \"qty\": 2\n}",
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Eklendi, güncel sepet döner",
     "alanlar": [
      {
       "ad": "cart",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.user_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.guest_token",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "cart.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: open | converted | abandoned",
       "aciklama": ""
      },
      {
       "ad": "cart.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "items",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].variant_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].variant_sku",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].product_id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].product_name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].size",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].color",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].unit_price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Sepete atıldığı ANDAKİ fiyat (snapshot)."
      },
      {
       "ad": "items[].current_price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Ürünün ŞU ANKİ fiyatı. unit_price ile farklıysa uyarı üretilir."
      },
      {
       "ad": "items[].line_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].stock_qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "items[].available",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "itemCount",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "grand_total = subtotal - discount_total + shipping_total\nKargo 500 TL ve üzeri bedava, altında 29.90."
      },
      {
       "ad": "totals.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].itemId",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].variantSku",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].cartPrice",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "warnings.priceChanged[].currentPrice",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Varyant bulunamadı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`OUT_OF_STOCK` — `details.available` kaç adet kaldığını söyler.",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_VARIANT`, `INVALID_QTY` veya `PRODUCT_INACTIVE`",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "PATCH",
   "yol": "/api/v1/carts/{id}/items/{itemId}",
   "etiket": "Sepet",
   "ozet": "Satır adedini güncelle",
   "aciklama": "`qty: 0` ile silme YAPILMAZ → `422`. Silmek için `DELETE` var. Aynı işi\niki farklı yolla yapmak, iki davranışın zamanla ayrışmasına yol açar.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "itemId",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "qty",
     "tip": "integer",
     "zorunlu": true,
     "kisit": "minimum: 1",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"qty\": 3\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Güncellendi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Sepet satırı bulunamadı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`OUT_OF_STOCK`",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_QTY`",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "DELETE",
   "yol": "/api/v1/carts/{id}/items/{itemId}",
   "etiket": "Sepet",
   "ozet": "Satırı sepetten çıkar",
   "aciklama": "Rezervasyon serbest bırakılır. Bu adım atlanırsa stok sızar.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "itemId",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "204",
     "aciklama": "Silindi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Sepet satırı bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/carts/{id}/coupon",
   "etiket": "Sepet",
   "ozet": "Kupon uygula",
   "aciklama": "Reddetme nedeni AYRI bir kodla döner — \"kupon geçersiz\" demek hangi\nkuralın devreye girdiğini test edilemez kılardı:\n\n| Kod | Anlamı | Seed veride örnek |\n|---|---|---|\n| `COUPON_NOT_FOUND` | Böyle bir kupon yok | — |\n| `COUPON_NOT_STARTED` | Henüz başlamadı | `FUTURE15` |\n| `COUPON_EXPIRED` | Süresi doldu | `EXPIRED20` |\n| `COUPON_USAGE_LIMIT_REACHED` | Limit doldu | `MAXEDOUT` |\n| `COUPON_MIN_TOTAL_NOT_MET` | Alt tutar yetersiz | `VIP1000` |\n\nGeçerli örnek: `WELCOME10` (%10), `SAVE50` (50 TL, min 300).",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "code",
     "tip": "string",
     "zorunlu": true,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"code\": \"WELCOME10\"\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Kupon uygulandı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "Kupon reddedildi (kod yukarıdaki tablodan)",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders",
   "etiket": "Sipariş",
   "ozet": "🔒 Checkout — sepeti siparişe çevir",
   "aciklama": "Tek transaction içinde: stok düşer, rezervasyon serbest kalır, kupon\nsayacı artar, sepet `converted` olur.\n\n**Kupon CHECKOUT ANINDA yeniden doğrulanır.** Sepete eklendiğinde\ngeçerli olması yetmez — sepet bir hafta açık kalmış, kupon bu sürede\ndolmuş olabilir. Bu yeniden doğrulama atlanırsa \"süresi geçmiş kuponla\nindirim\" hatası doğar.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "cartId",
     "tip": "integer",
     "zorunlu": true,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"cartId\": 42\n}",
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Sipariş oluşturuldu",
     "alanlar": [
      {
       "ad": "order",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.order_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
       "aciklama": ""
      },
      {
       "ad": "order.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.coupon_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.placed_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sepet başka kullanıcıya ait",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Sepet bulunamadı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`CART_NOT_OPEN` veya `OUT_OF_STOCK`",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`EMPTY_CART`, `PRODUCT_INACTIVE`, `INVALID_CART_ID` veya kupon reddi",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/orders",
   "etiket": "Sipariş",
   "ozet": "🔒 Kendi siparişlerin",
   "aciklama": "Filtre oturumdaki kullanıcıdan gelir, istemciden DEĞİL. `?userId=`\nkabul eden bir uç başkasının siparişlerini okumaya açık olurdu.",
   "parametreler": [
    {
     "ad": "page",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 1",
     "aciklama": ""
    },
    {
     "ad": "size",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 20",
     "aciklama": ""
    },
    {
     "ad": "status",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sayfalanmış sipariş listesi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/orders/{id}",
   "etiket": "Sipariş",
   "ozet": "🔒 Sipariş detayı",
   "aciklama": "Başkasının siparişi `403` döner (`404` değil). İkisi de savunulabilir;\nburada açık davranış seçildi ki yetki testi net bir sonuç görsün.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sipariş, satırlar, ödemeler, kargolar",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Sipariş bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders/{id}/cancel",
   "etiket": "Sipariş",
   "ozet": "🔒 Siparişi iptal et",
   "aciklama": "Yalnızca `placed` ve `paid` durumundan iptal edilebilir. Kargolanmış\nsipariş iptal EDİLMEZ, iade edilir — ikisi stok ve muhasebe açısından\nfarklı işlemlerdir.\n\nİptalde stok geri yüklenir ve kupon sayacı düşürülür.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "İptal edildi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`INVALID_TRANSITION` — `details.allowed` izin verilen durumları söyler",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/orders/{id}/invoice",
   "etiket": "Sipariş",
   "ozet": "🔒 Fatura",
   "aciklama": "Fatura siparişin KAYITLI değerlerinden üretilir, ürünlerin güncel\nfiyatından değil. `reconciled` alanı satır toplamlarının başlıktaki\nara toplama eşit olduğunu beyan eder — arayüzde fark edilmesi imkânsız\nbir hatayı, faturayı okuyan test anında yakalar.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Fatura belgesi",
     "alanlar": [
      {
       "ad": "invoiceNo",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "issuedAt",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "billTo",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "billTo.name",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "billTo.email",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "lines",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "lines[].description",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "lines[].qty",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "lines[].unit_price",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "lines[].line_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "grand_total = subtotal - discount_total + shipping_total\nKargo 500 TL ve üzeri bedava, altında 29.90."
      },
      {
       "ad": "totals.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "totals.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "reconciled",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Faturanın kendi tutarlılık beyanı: satır toplamları başlıktaki ara\ntoplama eşit mi. `false` ise arayüzde görülemeyecek bir mutabakat\nhatası vardır."
      }
     ],
     "ornek": "{\n  \"invoiceNo\": \"INV-1151\"\n}"
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders/{id}/pay",
   "etiket": "Sipariş",
   "ozet": "🔒 Ödeme al",
   "aciklama": "Siparişi `placed` → `paid` durumuna taşır ve bir ödeme kaydı yazar.\n\n`simulateFailure: true` gönderildiğinde BAŞARISIZ ödeme üretilir: kayıt\nyazılır ama sipariş durumu DEĞİŞMEZ ve cevap **402** döner. \"Ödeme\ndenendi ve tutmadı\" ile \"ödeme hiç denenmedi\" farklı durumlardır; 200\ndönseydi bir test isteği geçmiş sayar ve farkı göremezdi.\n\nAynı siparişe ikinci kez başarılı ödeme alınamaz (`ALREADY_PAID`) —\nçift tıklama iki tahsilat üretmemeli.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [
    {
     "ad": "method",
     "tip": "string",
     "zorunlu": false,
     "kisit": "enum: card | transfer | cod · default: card",
     "aciklama": ""
    },
    {
     "ad": "simulateFailure",
     "tip": "boolean",
     "zorunlu": false,
     "kisit": "default: false",
     "aciklama": ""
    }
   ],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Ödeme alındı, sipariş `paid`",
     "alanlar": [
      {
       "ad": "order",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.order_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
       "aciklama": ""
      },
      {
       "ad": "order.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.coupon_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.placed_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "payment",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "payment.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "payment.method",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: card | transfer | cod",
       "aciklama": ""
      },
      {
       "ad": "payment.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: pending | success | failed | refunded",
       "aciklama": "Başarısız ödeme bir KAYIT yazar ama siparişin durumunu değiştirmez.\n\"Denendi ve tutmadı\" ile \"hiç denenmedi\" farklı durumlardır."
      },
      {
       "ad": "payment.amount",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "payment.txn_ref",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "payment.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "402",
     "aciklama": "Ödeme başarısız — kayıt yazıldı, sipariş durumu değişmedi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`ALREADY_PAID` veya `INVALID_TRANSITION`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_PAYMENT_METHOD`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders/{id}/ship",
   "etiket": "Sipariş",
   "ozet": "🔒 Kargoya ver",
   "aciklama": "`paid` → `shipped`. Ödemesi alınmamış sipariş kargolanamaz: durum geçiş\ntablosu `placed` → `shipped` geçişine izin vermez ve **409** döner. Bu,\nveri doğrulama sorgularındaki \"ödemesi yok ama kargolanmış sipariş\"\nkontrolünün uygulama tarafındaki karşılığıdır.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [
    {
     "ad": "carrier",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "trackingNo",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"carrier\": \"Yurtici\",\n  \"trackingNo\": \"TRK0000123456\"\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Kargo kaydı oluşturuldu",
     "alanlar": [
      {
       "ad": "order",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.order_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
       "aciklama": ""
      },
      {
       "ad": "order.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.coupon_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.placed_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "shipment",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.carrier",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.tracking_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: preparing | in_transit | delivered | returned",
       "aciklama": ""
      },
      {
       "ad": "shipment.shipped_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "shipment.delivered_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": "İade penceresi (14 gün) BU andan itibaren sayılır."
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`INVALID_TRANSITION` — ödemesiz sipariş kargolanamaz",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders/{id}/deliver",
   "etiket": "Sipariş",
   "ozet": "🔒 Teslim edildi işaretle",
   "aciklama": "`shipped` → `delivered`. Teslim ANI kaydedilir (`shipment.delivered_at`);\niade penceresi bu andan itibaren sayılır. Kargoya veriliş tarihinden\nsaymak, uzun süren teslimatlarda müşterinin iade hakkını sessizce\nkısaltırdı.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Sipariş teslim edildi",
     "alanlar": [
      {
       "ad": "order",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.order_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
       "aciklama": ""
      },
      {
       "ad": "order.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.coupon_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.placed_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "shipment",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.carrier",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.tracking_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "shipment.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: preparing | in_transit | delivered | returned",
       "aciklama": ""
      },
      {
       "ad": "shipment.shipped_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "shipment.delivered_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": "İade penceresi (14 gün) BU andan itibaren sayılır."
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`INVALID_TRANSITION`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/orders/{id}/return",
   "etiket": "Sipariş",
   "ozet": "🔒 İade et",
   "aciklama": "`delivered` → `returned`. İade, İPTALDEN farklı bir işlemdir: ürün\nmüşteridedir, stoğa geri döner ve **14 günlük** bir zaman penceresi\nvardır. Pencere dolmuşsa `RETURN_WINDOW_CLOSED` ile 409 döner.\n\nYan etkiler: stok geri yüklenir, başarılı ödeme `refunded` olur, kargo\nkaydı `returned` olur.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "İade tamamlandı",
     "alanlar": [
      {
       "ad": "order",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.order_no",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: placed | paid | shipped | delivered | cancelled | returned",
       "aciklama": ""
      },
      {
       "ad": "order.subtotal",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.discount_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.shipping_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.grand_total",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.coupon_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "order.placed_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "restoredItems",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Stoğa geri yüklenen satır sayısı"
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Sipariş sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "409",
     "aciklama": "`RETURN_WINDOW_CLOSED` veya `INVALID_TRANSITION`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/addresses",
   "etiket": "Adres",
   "ozet": "🔒 Adreslerim",
   "aciklama": "Varsayılan adres listenin başında döner.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Adres listesi",
     "alanlar": [
      {
       "ad": "total",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].label",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].line1",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].city",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].country",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].postal_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "addresses[].is_default",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Kullanıcı başına yalnızca BİR adres varsayılan olabilir."
      }
     ],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/addresses",
   "etiket": "Adres",
   "ozet": "🔒 Adres ekle",
   "aciklama": "İLK adres otomatik olarak varsayılan olur — kullanıcı hiç seçim yapmadan\ncheckout'a geldiğinde \"varsayılan adres yok\" durumu oluşmasın diye.\n\n`isDefault: true` gönderildiğinde diğer adreslerin varsayılanlığı DÜŞER.\nYani bu istek, gövdede adı geçmeyen satırları da değiştirir; cevaba bakan\nbir test bunu göremez, veritabanına bakan bir test görür.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "label",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "line1",
     "tip": "string",
     "zorunlu": true,
     "kisit": "minLength: 3",
     "aciklama": ""
    },
    {
     "ad": "city",
     "tip": "string",
     "zorunlu": true,
     "kisit": "minLength: 2",
     "aciklama": ""
    },
    {
     "ad": "country",
     "tip": "string",
     "zorunlu": false,
     "kisit": "pattern: ^[A-Za-z]{2}$ · default: TR",
     "aciklama": ""
    },
    {
     "ad": "postalCode",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "isDefault",
     "tip": "boolean",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"label\": \"ev\"\n}",
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Adres oluşturuldu",
     "alanlar": [
      {
       "ad": "address",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.label",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.line1",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.city",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.country",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.postal_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.is_default",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Kullanıcı başına yalnızca BİR adres varsayılan olabilir."
      }
     ],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`MISSING_FIELD`, `INVALID_FIELD` veya `INVALID_COUNTRY`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "PATCH",
   "yol": "/api/v1/addresses/{id}",
   "etiket": "Adres",
   "ozet": "🔒 Adres güncelle",
   "aciklama": "Kısmi güncelleme — yalnızca gönderilen alanlar değişir.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "label",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "line1",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "city",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "country",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "postalCode",
     "tip": "string",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "isDefault",
     "tip": "boolean",
     "zorunlu": false,
     "kisit": "",
     "aciklama": ""
    }
   ],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Güncellenmiş adres",
     "alanlar": [
      {
       "ad": "address",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.label",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.line1",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.city",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.country",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.postal_code",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "address.is_default",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Kullanıcı başına yalnızca BİR adres varsayılan olabilir."
      }
     ],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Adres sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Adres bulunamadı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`EMPTY_PATCH` — güncellenecek alan gönderilmedi",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "DELETE",
   "yol": "/api/v1/addresses/{id}",
   "etiket": "Adres",
   "ozet": "🔒 Adres sil",
   "aciklama": "Varsayılan adres silinirse kalanlardan biri varsayılan yapılır. Aksi\nhâlde kullanıcının hiç varsayılanı kalmaz ve bu ancak checkout'ta fark\nedilirdi.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "204",
     "aciklama": "Silindi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "403",
     "aciklama": "Adres sana ait değil",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Adres bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/products/{id}/reviews",
   "etiket": "Yorum",
   "ozet": "Ürün yorumları",
   "aciklama": "Varsayılan olarak YALNIZCA onaylı yorumlar döner. `?status=pending` ile\nmoderasyon kuyruğuna bakılabilir.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    },
    {
     "ad": "status",
     "nerede": "query",
     "zorunlu": false,
     "tip": "string",
     "kisit": "enum: pending | approved | rejected · default: approved",
     "aciklama": ""
    },
    {
     "ad": "page",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "default: 1",
     "aciklama": ""
    },
    {
     "ad": "size",
     "nerede": "query",
     "zorunlu": false,
     "tip": "integer",
     "kisit": "maximum: 100 · default: 20",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Yorum listesi",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Ürün bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/products/{id}/reviews",
   "etiket": "Yorum",
   "ozet": "🔒 Yorum yaz",
   "aciklama": "Yeni yorum `pending` doğar. **201 dönmesi yorumun yayınlandığı anlamına\nGELMEZ** — onaylanana kadar listede ve ortalama puanda görünmez. Bu ayrım\nburada açıkça yazılı çünkü \"yorumumu gönderdim ama görünmüyor\" en sık\nyanlış anlaşılan davranışlardan biridir.\n\nAynı kullanıcı aynı ürüne iki kez yorum yazamaz.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "rating",
     "tip": "integer",
     "zorunlu": true,
     "kisit": "minimum: 1 · maximum: 5",
     "aciklama": ""
    },
    {
     "ad": "comment",
     "tip": "string",
     "zorunlu": false,
     "kisit": "maxLength: 2000",
     "aciklama": ""
    }
   ],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "201",
     "aciklama": "Yorum alındı, moderasyon bekliyor",
     "alanlar": [
      {
       "ad": "review",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.rating",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "minimum: 1 · maximum: 5",
       "aciklama": ""
      },
      {
       "ad": "review.comment",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: pending | approved | rejected",
       "aciklama": "`pending` yorum ürün sayfasında GÖRÜNMEZ ve ortalama puana GİRMEZ —\niki ayrı iş kuralı, iki ayrı test."
      },
      {
       "ad": "review.author",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      },
      {
       "ad": "note",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_RATING` veya `REVIEW_ALREADY_EXISTS`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/products/{id}/rating",
   "etiket": "Yorum",
   "ozet": "Ortalama puan ve dağılım",
   "aciklama": "Ortalama AYRI bir uçtur: liste sayfalanır, ortalama sayfalanmaz.\nOrtalamayı listenin ilk sayfasından hesaplamak, çok yorumlu üründe\nsessizce yanlış sonuç verirdi.\n\nHesap YALNIZCA onaylı yorumlar üzerinden yapılır (`basis: approved`).",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Puan özeti",
     "alanlar": [
      {
       "ad": "productId",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "average",
       "tip": "number",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "count",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "basis",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Ortalamanın hangi yorum kümesinden hesaplandığı."
      },
      {
       "ad": "distribution",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Puan dağılımı — 5'ten 1'e yorum sayıları."
      }
     ],
     "ornek": "{\n  \"average\": 4.25,\n  \"count\": 8,\n  \"basis\": \"approved\"\n}"
    },
    {
     "kod": "404",
     "aciklama": "Ürün bulunamadı",
     "alanlar": [],
     "ornek": null
    }
   ]
  },
  {
   "method": "PATCH",
   "yol": "/api/v1/reviews/{id}",
   "etiket": "Yorum",
   "ozet": "🔒 Yorumu onayla / reddet",
   "aciklama": "Moderasyon ucu. Bu pratik ortamında rol ayrımı yoktur — girişli her\nkullanıcı moderasyon yapabilir. Amaç, onay akışını test edilebilir\nkılmak.",
   "parametreler": [
    {
     "ad": "id",
     "nerede": "path",
     "zorunlu": true,
     "tip": "integer",
     "kisit": "",
     "aciklama": ""
    }
   ],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    },
    {
     "ad": "BearerAuth",
     "basligi": "Authorization",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [
    {
     "ad": "status",
     "tip": "string",
     "zorunlu": true,
     "kisit": "enum: pending | approved | rejected",
     "aciklama": ""
    }
   ],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Güncellenmiş yorum",
     "alanlar": [
      {
       "ad": "review",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.id",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.rating",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "minimum: 1 · maximum: 5",
       "aciklama": ""
      },
      {
       "ad": "review.comment",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.status",
       "tip": "string",
       "zorunlu": false,
       "kisit": "enum: pending | approved | rejected",
       "aciklama": "`pending` yorum ürün sayfasında GÖRÜNMEZ ve ortalama puana GİRMEZ —\niki ayrı iş kuralı, iki ayrı test."
      },
      {
       "ad": "review.author",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "review.created_at",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: date-time",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "404",
     "aciklama": "Yorum bulunamadı",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_STATUS`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "GET",
   "yol": "/api/v1/sandbox/bugs",
   "etiket": "Kusur",
   "ozet": "Açılabilecek kusurların kataloğu",
   "aciklama": "Her anahtar sistemin gerçek bir yerinde gerçek bir kusur açar.\n`catchableBy` alanı, o kusuru hangi kontrolün yakalaması GEREKTİĞİNİ\nsöyler.\n\nPratiğin kendisi tam olarak şudur: anahtarı aç, testini koş, testinin\nkırmızıya dönüp dönmediğine bak. Dönmüyorsa test bir şeye bakmıyordur.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Katalog ve açık olanlar",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "active",
       "tip": "array<string>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available",
       "tip": "array<object>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].key",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].enabled",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].title",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].title.tr",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].title.en",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].breaks",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].breaks.tr",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].breaks.en",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].catchableBy",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].catchableBy.tr",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].catchableBy.en",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "available[].reconciled",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": "Satır toplamları başlıktaki ara toplama eşit mi. `false` ise\nveride mutabakat hatası var demektir."
      }
     ],
     "ornek": null
    }
   ]
  },
  {
   "method": "PATCH",
   "yol": "/api/v1/sandbox/bugs",
   "etiket": "Kusur",
   "ozet": "Kusur aç / kapat",
   "aciklama": "Kısmi güncelleme: gönderilmeyen anahtarlar olduğu gibi kalır.\n\nBilinmeyen anahtar SESSİZCE yok sayılmaz, `UNKNOWN_BUG_FLAG` ile 422\ndöner. Yok sayılsaydı yazım hatası yapan kullanıcı kusuru açtığını sanır,\ntesti yeşil kalır ve bundan \"testim çalışıyor\" sonucunu çıkarırdı — tam\nolarak önlemeye çalıştığımız yanılgı.\n\n`POST /sandbox/reset` tüm anahtarları kapatır.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": true,
   "govdeAlanlari": [],
   "ornek": "{\n  \"oversell\": true,\n  \"discount_twice\": false\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Güncel anahtar durumu",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "active",
       "tip": "array<string>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "flags",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`UNKNOWN_BUG_FLAG`, `INVALID_FLAG_VALUE` veya `EMPTY_BODY`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/sandbox/bugs/hidden",
   "etiket": "Kusur",
   "ozet": "Gizli tur başlat",
   "aciklama": "Sistem rastgele birkaç kusuru açar ve HANGİLERİ olduğunu söylemez.\n\nAdını bilerek açtığın bir kusur şu soruyu cevaplar: testim kırmızıya\ndönüyor mu? Gizli tur başka bir soru sorar: kusuru BULABİLİYOR muyum?\nSahada karşılaşılan soru ikincisidir, çünkü orada kimse hangi kusurun\naçık olduğunu söylemez.\n\nTur sürerken `GET /sandbox/bugs` cevabında `enabled` ve `active`\nalanları HİÇ bulunmaz — cevap sunucuda kalır, arayüzde saklanmaz.\nAynı sebeple `PATCH /sandbox/bugs` bu sırada `HIDDEN_ROUND_ACTIVE`\nile reddedilir: tek tek anahtar denemek cevabı deneme yanılmayla\nbulmanın yoludur.\n\nDenetim kaydına da seçilen anahtarlar YAZILMAZ, yalnızca adet yazılır.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [
    {
     "ad": "count",
     "tip": "integer",
     "zorunlu": false,
     "kisit": "minimum: 1 · maximum: 10 · default: 3",
     "aciklama": ""
    }
   ],
   "ornek": "{\n  \"count\": 3\n}",
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Tur başladı — kaç kusur açık, hangileri DEĞİL",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "hidden",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "hiddenCount",
       "tip": "integer",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "message",
       "tip": "string",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`INVALID_COUNT`",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  },
  {
   "method": "POST",
   "yol": "/api/v1/sandbox/bugs/reveal",
   "etiket": "Kusur",
   "ozet": "Gizli turun cevabını aç",
   "aciklama": "Kendini denetlemek için: bulduklarını yaz, sonra burayı çağır ve\nkaçırdığını gör. Kaçırılan her kusur, onu yakalaması gereken\nkontrolün henüz yazılmadığı anlamına gelir.\n\nKusurlar açık KALIR — artık hangileri olduğu bilinir. Kapatmak için\n`PATCH /sandbox/bugs` ya da `POST /sandbox/reset`.",
   "parametreler": [],
   "guvenlik": [
    {
     "ad": "SandboxKey",
     "basligi": "X-Sandbox-Key",
     "nerede": "header"
    }
   ],
   "govdeZorunlu": false,
   "govdeAlanlari": [],
   "ornek": null,
   "cevaplar": [
    {
     "kod": "200",
     "aciklama": "Açık olan kusurların listesi",
     "alanlar": [
      {
       "ad": "sandboxId",
       "tip": "string",
       "zorunlu": false,
       "kisit": "format: uuid",
       "aciklama": ""
      },
      {
       "ad": "hidden",
       "tip": "boolean",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "active",
       "tip": "array<string>",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      },
      {
       "ad": "flags",
       "tip": "object",
       "zorunlu": false,
       "kisit": "",
       "aciklama": ""
      }
     ],
     "ornek": null
    },
    {
     "kod": "401",
     "aciklama": "",
     "alanlar": [],
     "ornek": null
    },
    {
     "kod": "422",
     "aciklama": "`NO_HIDDEN_ROUND` — açık bir gizli tur yok",
     "alanlar": [],
     "ornek": "{\n  \"correlationId\": \"req-8f3c1e2a-...\"\n}"
    }
   ]
  }
 ]
}
