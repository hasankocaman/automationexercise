# Bruno: Git-Native API Client - Detaylı Rehber ve Postman Karşılaştırması

**Yazar:** Grok (xAI)  
**Tarih:** Haziran 2026  
**Versiyon:** Bruno v3+ (Güncel Durum)

Bruno, Postman'a güçlü bir açık kaynak alternatifidir. **Yerel-first (local-first)**, **Git-native** ve tamamen **ücretsiz** (temel özellikler) bir API istemcisidir.

## Giriş

Bruno, geliştiricilerin API'leri test etmek, keşfetmek ve yönetmek için tasarlanmış modern bir araçtır. Postman'ın bulut bağımlılığı ve ücretli modelinden rahatsız olanlar için ideal bir çözümdür.

**Ana Felsefe:**
- Koleksiyonlar düz metin dosyaları (`.bru` - YAML tabanlı) olarak saklanır.
- Tamamen yerel çalışır, bulut senkronizasyonu zorunlu değildir.
- Git ile mükemmel entegrasyon: Değişiklikleri kod gibi versiyonlayabilirsiniz.

## Nereden İndirilir ve Kurulum

- Resmi İndirme: [https://www.usebruno.com/downloads](https://www.usebruno.com/downloads)
- GitHub: [github.com/usebruno/bruno](https://github.com/usebruno/bruno)
- macOS (Homebrew): `brew install bruno`
- CLI: `npm install -g @usebruno/cli`

## Temel Özellikler

### 1. Koleksiyon Yönetimi
- Hiyerarşik klasör yapısı
- Her istek `.bru` dosyası olarak kaydedilir
- Postman JSON'larını ve OpenAPI spec'lerini import/export desteği

### 2. İstek Türleri Desteklenenler
- HTTP / REST
- GraphQL
- gRPC
- WebSocket
- Diğer protokoller (gelişmekte)

### 3. Environment & Variables
- Farklı ortamlar (dev, staging, prod)
- `{{variable}}` syntax'ı
- Secret management ve masking

### 4. Scripting
- Pre-request ve Test script'leri (JavaScript)
- `bru.*` API'si
- Assertions, response manipulation
- npm paketleri desteği (Developer Mode)

### 5. CLI (bru CLI)
- `bru run` ile koleksiyon çalıştırma
- CI/CD entegrasyonu (GitHub Actions, Jenkins vb.)
- Raporlama: JUnit, HTML, JSON

### 6. Diğer Özellikler
- Auto-generated API Documentation (Markdown destekli)
- Git UI (Pro/Ultimate'da gelişmiş)
- Workspaces
- OpenAPI entegrasyonu
- Response visualization

## Postman ile Karşılaştırma

| Özellik                        | Bruno                                      | Postman                                      | Kazanan          |
|--------------------------------|--------------------------------------------|----------------------------------------------|------------------|
| **Depolama**                   | Yerel dosya sistemi (.bru + klasörler)    | Cloud + JSON (yerel Scratchpad sınırlı)     | **Bruno**        |
| **Git Entegrasyonu**           | Native (mükemmel)                          | Sınırlı (export/import)                     | **Bruno**        |
| **Offline Çalışma**            | Tamamen                                    | Kısmi (login gerekebiliyor)                 | **Bruno**        |
| **Fiyatlandırma**              | Açık kaynak + ücretsiz temel özellikler    | Ücretsiz sınırlı, Pro pahalı                | **Bruno**        |
| **Koleksiyon Runner**          | Sınırsız                                   | Ücretsizde sınırlı                          | **Bruno**        |
| **Mock Server**                | Temel / Yok                                | Gelişmiş                                    | **Postman**      |
| **API Monitoring**             | Yok                                        | Var                                         | **Postman**      |
| **Team Collaboration**         | Git ile (PR, review)                       | Cloud Workspace (ücretli)                   | Duruma göre      |
| **Scripting**                  | `bru.*` API'si                             | `pm.*` API'si                               | Postman (daha olgun) |
| **Performans**                 | Hafif ve hızlı                             | Daha ağır                                   | **Bruno**        |
| **Güvenlik & Gizlilik**        | Mükemmel (yerel)                           | Bulut verisi                                | **Bruno**        |
| **Documentation**              | İyi (auto-gen)                             | Çok gelişmiş hosted docs                    | **Postman**      |
| **Enterprise Özellikler**      | Git + Pro/Ultimate                         | Tam platform                                | Postman (büyük ekipler) |

### Bruno'nun Üstün Olduğu Alanlar
- **Geliştirici Odaklı**: Kodla iç içe çalışma
- **Versiyon Kontrolü**: Her değişiklik diff edilebilir
- **Maliyet**: Sıfır ek ücret (temel kullanım)
- **Güvenlik**: Verileriniz asla buluta gitmez
- **CI/CD**: Kolay entegrasyon

### Postman'ın Üstün Olduğu Alanlar
- **Kurumsal Ölçek**: Monitoring, mocks, governance
- **Ekip İşbirliği**: Non-technical kullanıcılar için cloud
- **Ek Özellikler**: AI asistan, advanced analytics
- **Ekosistem**: Daha fazla entegrasyon ve üçüncü parti araç

## Kullanım Senaryoları

**Bruno'yu Tercih Edin:**
- Küçük-orta takımlar
- Git-heavy workflow'lar
- Gizlilik odaklı projeler
- Yerel geliştirme ve CI/CD entegrasyonu

**Postman'ı Tercih Edin:**
- Büyük enterprise ekipler
- API lifecycle yönetimi (design → test → monitor)
- Hosted documentation ve public API'ler

## Başlangıç Rehberi

1. Bruno'yu indirin ve kurun.
2. Yeni Koleksiyon → Klasör seçin.
3. Request ekleyin, environment oluşturun.
4. Script yazın ve test edin.
5. Git'e commit'leyin.

Detaylı docs: [docs.usebruno.com](https://docs.usebruno.com/)

## Sonuç

Bruno, Postman'ın birçok temel ihtiyacını karşılayan, hatta bazı alanlarda daha iyi bir alternatiftir. Özellikle "API client" ihtiyacı olan geliştiriciler için Bruno ideal seçimdir. Postman ise tam bir "API platformu" arayanlar için uygundur.

Bruno'yu denemek ücretsizdir. Postman koleksiyonlarınızı kolayca import edebilirsiniz.

---

**Kaynaklar:**
- Resmi Site: https://www.usebruno.com/
- Docs: https://docs.usebruno.com/
- Karşılaştırma: https://www.usebruno.com/compare/bruno-vs-postman