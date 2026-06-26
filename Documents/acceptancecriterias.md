---

# Proje Adı: learnqa.dev

## Doküman Amacı: Sistem Kabul Kriterleri (Acceptance Criteria)

Claude, lütfen aşağıdaki iş kurallarını ve kabul kriterlerini (Accaeptance Criterias) temel alarak sistem mimarisini, test senaryolarını veya ilgili geliştirme adımlarını yapılandır.

Sayfa: ders anlatılan her bir sayfa örneğin postman - java ve diğerleri.
---

## 1. Major (Kritik) Kabul Kriterleri

### AC 01: Navigasyon ve Temel Etkileşim

* **Kural:** Kullanıcı, ana sayfada yer alan tüm butonlara ve tıklanabilir ögelere sorunsuz şekilde tıklayabilmeli ve ilgili aksiyonlar tetiklenmelidir.

### AC 02: Quiz Mekanizması ve Hata Toleransı

* **Kural:** Kullanıcı, mülakat hazırlık sayfalarındaki sekmelerde bulunan tüm quiz sorularını yanıtlayabilmelidir.
* **Hata Durumu:** Kullanıcı bir quiz sorusuna yanlış cevap verirse, sistem **bir defaya mahsus olmak üzere** kullanıcıya farklı bir ekstra quiz sorusu göstermeli ve kullanıcı bunu cevaplayabilmelidir.

### AC 03: Çoklu Dil Desteği (Uluslararasılaştırma - i18n)

* **Koşul A: Sayfa Dili = Türkçe**
* Quiz soruları ve cevap seçenekleri Türkçe olmalıdır.
* Sektörde yerleşik olarak kullanılan İngilizce kelimeler ve kalıplaşmış yazılım terimleri doğrudan Türkçe'ye çevrilmez.
* Kalıplaşmış yazılım terimleri için format: `İngilizce Terim (Türkçe Karşılığı)` şeklinde yazılabilir.
* Kod ve komut blokları içerisindeki **yorum satırları (comments)** Türkçe olmalıdır (Kalıplaşmış terim kuralları burada da geçerlidir).


* **Koşul B: Sayfa Dili = İngilizce**
* Sistem genelinde, içeriklerde ve yorum satırlarında kesinlikle hiçbir Türkçe kelime veya cümle kullanılmamalıdır.



### AC 04: Mülakat Sorularına Erişim Bariyeri (Gatekeeping)

* **Kilit Koşulu:** Sayfadaki quiz sorularının **en az %60'ı** doğru cevaplanmadığı sürece, mülakat soruları kullanıcıya kilitli kalmalı ve gösterilmemelidir.
* **Açılma Koşulu:** Quiz başarı oranı **$\ge$ %60** olduğunda, mülakat soruları kullanıcıya görünür ve erişilebilir hale gelmelidir.

### AC 05: Yapay Zeka (AI) Destekli Quiz Açıklamaları

* **Tetikleyici:** Kullanıcı quiz sorusunu cevaplayıp "Cevabı Kontrol Et" butonuna tıkladıktan sonra, sistemde "AI'dan Ek Açıklama İste" butonu belirmelidir.
* **İçerik:** Üretilen AI cevabı doğrudan ilgili soruyla ilişkili olmalıdır.
* **Dil:** Sayfa dili Türkçe ise AI yanıtı Türkçe, İngilizce ise İngilizce olmalıdır.

### AC 06: Mülakat Sayfası İçerik ve AI Değerlendirme Döngüsü

* **Veri Seti:** Her sayfada en az 50 adet mülakat sorusu bulunmalıdır.
* **Kullanıcı Akışı:** Kullanıcı mülakat sorusunu okuduktan sonra, cevabını yazabileceği bir text input (giriş) alanı açılmalıdır.
* **AI Değerlendirmesi:** Kullanıcı cevabını gönderdiğinde, bu cevap AI tarafından değerlendirilmeli ve değerlendirme tamamlandıktan sonra kullanıcıya sorunun ideal/doğru cevabı gösterilmelidir.

### AC 07: Kurs Bitirme ve Reset (Sıfırlama) Senaryoları

* **Başarı Durumu ($\ge$ %80):**
* Kullanıcı mülakat sorularının en az %80'ini doğru cevaplarsa, başarı sonucu kullanıcıya bildirilir ve profile bir **"Bitirme Rozeti" (Completion Badge)** tanımlanır.


* **Başarısızlık Durumu (< %80):**
* Kullanıcı %80 başarı barajının altında kalırsa bitirme rozeti alamaz ve bu durum kendisine bildirilir.
* Sistem, kullanıcıya tüm cevaplarını sıfırlayarak konulara baştan başlayabileceğine dair bir bilgilendirme/uyarı gösterir.
* Kullanıcı bu sıfırlamayı onaylarsa **"Reset" butonu aktifleşir**.
* "Reset" butonuna tıklandığında; sayfadaki tüm quiz cevapları ve mülakat soru cevapları **hard-reset (tamamen sıfırlama)** edilir ve kullanıcı ilgili sayfadaki **ilk sekmeye** yönlendirilir.



---

## 2. Minor (İkincil) Kabul Kriterleri

### AC 08: UI/UX - Tema ve Erişilebilirlik

* **Aydınlık/Karanlık Mod:** Light ve Dark mode geçişlerinde, gözü yormayan arka plan ve font renk kombinasyonları seçilmelidir. Fontlar tüm ekranlarda yüksek okunabilirliğe (readability) sahip olmalıdır.
* **Özelleştirilebilir Renk Paleti:** Standart yapay zeka araçlarının tek düze UI tasarımlarından kaçınmak adına, kullanıcıya alternatif dostu renk paleti seçenekleri (temalar) sunulmalıdır. Kullanıcı bu şablonlardan birini seçtiğinde, sayfa arka planı ve font renkleri dinamik olarak değişmelidir.

### AC 09: Yol Haritası (Roadmap) ve İlerleme Takibi

* **Kural:** Kullanıcı belirli bir yol haritası (career path / roadmap) seçerek ilerliyorsa, güncel ilerleme durumu (progress bar veya checkpoint'ler) ve hangi dersleri/konuları başarıyla tamamladığı kullanıcı panelinde net bir şekilde görselleştirilmelidir.