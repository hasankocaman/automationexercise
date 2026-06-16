# Java Profesyoneller İçin Notlar

**Chapter 1: Java Diline Başlangıç**

**Section 1.1: İlk Java Programınızı Oluşturma**

Metin düzenleyicinizde veya IDE'nizde HelloWorld.java adında yeni bir dosya oluşturun. Aşağıdaki kod bloğunu dosyaya yapıştırın ve kaydedin:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Java'nın bu dosyayı **public class** olarak tanıyabilmesi için dosya adının sınıf adıyla (bu örnekte HelloWorld) aynı olması ve .java uzantısına sahip olması gerekir. Ayrıca sınıfın önünde **public** erişim belirteci bulunmalıdır.

Adlandırma kurallarına göre Java sınıfları büyük harfle başlamalı ve camelCase (her kelimenin ilk harfi büyük) formatında olmalıdır.

💡 Yorum: Java, dosya adı ile sınıf adının eşleşmesini zorunlu kılar. Bu kuralı ihlal ettiğinizde derleyici size `error: class HelloWorld is public, should be declared in a file named HelloWorld.java` hatasını verir. IntelliJ veya VS Code gibi modern IDE'ler zaten dosyayı bu kurala göre oluştururlar; bu yüzden production ortamında bu hatayı nadiren görürsünüz.

Derlemek için terminal penceresini açın ve HelloWorld.java dosyasının bulunduğu dizine gidin:

```bash
cd /path/to/containing/folder/
```

Ardından javac komutunu dosya adı ve uzantısıyla şu şekilde çalıştırın:

```bash
$ javac HelloWorld.java
```

Windows'ta 'javac' tanınmayan komut hatası alıyorsanız PATH ortam değişkeni doğru ayarlanmamıştır. Bu durumu çözmek için:

Windows'ta PATH düzenleme:
- Denetim Masası → Sistem → Gelişmiş sistem ayarları
- "Gelişmiş" sekmesi → Ortam Değişkenleri
- "Sistem Değişkenleri" altında "PATH" → Düzenle

"Değişken değeri" alanına mevcut değerlerin ÖNÜNE şu formatta ekleyin:

```
Değişken adı: PATH
Değişken değeri: c:\Program Files\Java\jdk1.8.0_xx\bin;[Mevcut Girişler...]
```

⚠️ Uyarı: PATH değerini yanlış düzenlerseniz sistem komutları çalışmayı durdurabilir. Değiştirmeden önce mevcut değeri kopyalayıp bir yere not edin!

Derleyici, JVM tarafından çalıştırılabilecek HelloWorld.class adında bir bytecode dosyası üretecektir.

Programı çalıştırmak için:

```bash
$ java HelloWorld
Hello, World!
```

💡 Yorum: Burada `.class` uzantısını yazmadığımıza dikkat edin. `java HelloWorld.class` derseniz "Error: Could not find or load main class HelloWorld.class" hatası alırsınız. JVM sınıf adını bekler, dosya adını değil.

**HelloWorld Satır Satır İnceleme**

```java
public class HelloWorld {
```

**class** anahtar kelimesi, HelloWorld adlı bir sınıfın tanımını başlatır. Her Java uygulaması en az bir sınıf tanımı içerir.

💡 Yorum: Java'da her şey bir sınıfın içindedir. Fonksiyon bile yazamazsınız — o da bir sınıfın metodu olmak zorunda. Bu, Python veya JavaScript'ten gelen geliştiricilerin alışması gereken ilk farktır. Ama QA mühendisi olarak zaten Java bildiğiniz için bu mantık size tanıdık gelecektir.

```java
    public static void main(String[] args) {
```

Bu, JVM'nin programınızı çalıştırabildiği giriş noktasıdır. Anahtar kelimelerin anlamları:

- **public**: Her yerden çağrılabilir; JVM'nin dışarıdan erişebilmesi için gerekli
- **static**: Nesne oluşturmadan çalışabilir; JVM hiçbir nesne oluşturmadan main'i çağırır
- **void**: Değer döndürmez; main bittikten sonra JVM çıkar
- **main**: JVM'nin aradığı özel ad; bunu değiştiremezsiniz
- **String[] args**: Komut satırından gelen argümanlar; `java MyProgram arg1 arg2` gibi

💡 Yorum: `static` neden gerekli? Çünkü JVM sınıfı load edip nesne oluşturmadan main'i çağırır. Eğer static olmasaydı, JVM "hangi nesnenin main metodunu çağırayım?" diye sormak zorunda kalırdı. Bu soruyu çözmek için de zaten bir nesneye ihtiyaç duyardı — kısır döngü. Static bu sorunu ortadan kaldırır.

```java
        System.out.println("Hello, World!");
```

Bu ifadeyi parça parça inceleyelim:

- `System` — java.lang paketindeki System sınıfı; import gerektirmez çünkü java.lang otomatik import edilir
- `out` — System.out, standart çıktıya (konsola) yazan bir PrintStream nesnesidir
- `println` — "print line" kısaltması; metni yazdırır ve satır sonu ekler
- `"Hello, World!"` — Çift tırnak arasındaki değer bir String literalidir
- `;` — Java'da her ifade noktalı virgülle biter; unutmak en sık yapılan hata

⚠️ Sık Yapılan Hata: `System.Out.println` (büyük O) veya `system.out.println` (küçük s) yazan geliştiriciler derleme hatası alır. Java büyük/küçük harf duyarlıdır (case-sensitive).

**Nesne Yönelimli Programlama Örneği**

Şimdi bir futbol takımını modelleyen OOP örneğini inceleyelim:

```java
public class Team {
    Member member;

    public Team(Member member) {
        this.member = member;
    }
}

class Member {
    private String name;
    private String type;
    private int level;
    private int rank;

    public Member(String name, String type, int level, int rank) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.rank = rank;
    }

    public String getName() { return this.name; }
    public String getType() { return this.type; }
    public int getLevel()   { return this.level; }
    public int getRank()    { return this.rank; }
}

// Test
public static void main(String[] args) {
    Member myMember = new Member("Aurieel", "light", 10, 1);
    Team myTeam = new Team(myMember);

    System.out.println(myTeam.member.getName());  // Aurieel
    System.out.println(myTeam.member.getType());  // light
    System.out.println(myTeam.member.getLevel()); // 10
    System.out.println(myTeam.member.getRank());  // 1
}
```

Çıktı:
```
Aurieel
light
10
1
```

💡 Yorum: `private` neden kullanıyoruz? Şöyle düşünün: Birisi bankadaki paranızı öğrenmek isterse kasaya gidip kaseti açmaz, size sorar. `private` alanlar kasanız, getter metodlar ise sizi temsil eden banka görevlisidir. Bu pattern'ın test otomasyonu açısından önemi büyük: Selenium ile test yazarken test ettiğiniz uygulamanın iç state'ini doğrudan değiştirmeye çalışmayın, her zaman UI üzerinden (kullanıcı gibi) erişin.

🎯 QA İçin Not: Java'da test sınıflarını yazarken de aynı OOP prensipleri geçerlidir. JUnit ve TestNG test sınıfları public sınıflar olarak tanımlanır, test metodları ise belirli annotation'larla işaretlenir (`@Test`). HelloWorld'ü anladıysanız, test sınıfı yazmak da mantıksal olarak aynı temele dayanmaktadır.

**Chapter 2: Tip Dönüşümü (Type Conversion)**

**Section 2.1: Sayısal İlkel Tip Dönüşümü**

Sayısal ilkel tipler iki şekilde dönüştürülebilir.

💡 Yorum: Java "strongly typed" (güçlü tipli) bir dildir. Her değişkenin tipi derleme zamanında bilinmek zorundadır. Bu, Python gibi dinamik tipli dillerden farklıdır. Avantajı: çalışma zamanı tip hatalarını büyük ölçüde önler. Dezavantajı: daha fazla kod yazmanız gerekir. QA mühendisi olarak tip dönüşümlerini bilmeniz önemlidir çünkü API yanıtlarını parse ederken veya test verisi hazırlarken sıkça karşılaşırsınız.

**Örtük (Implicit) dönüşüm** — kaynak tipin aralığı hedef tipten küçük olduğunda otomatik gerçekleşir:

```java
byte byteVar = 42;
short shortVar = byteVar;    // byte → short  (otomatik, kayıpsız)
int intVar = shortVar;       // short → int   (otomatik, kayıpsız)
long longVar = intVar;       // int → long    (otomatik, kayıpsız)
float floatVar = longVar;    // long → float  (otomatik, ama precision kaybolabilir!)
double doubleVar = floatVar; // float → double (otomatik, kayıpsız)
```

💡 Yorum: "Büyük kap → küçük kap" mantığıyla düşünün. 1 litrelik kaba 2 litrelik kaptan su dökerseniz taşar (açık cast gerekir, veri kaybı olabilir). 2 litrelik kaba 1 litrelik kaptan dökerseniz sorun yok (implicit cast, kayıpsız).

**Açık (Explicit) dönüşüm** — cast operatörü ile yapılmalıdır:

```java
double doubleVar = 42.9d;
float floatVar   = (float) doubleVar; // 42.9
long longVar     = (long) floatVar;   // 42  ← ondalık kısım kesildi!
int intVar       = (int) longVar;     // 42
short shortVar   = (short) intVar;    // 42
byte byteVar     = (byte) shortVar;   // 42
```

⚠️ Uyarı: Kayan noktalı sayıları tam sayıya dönüştürürken ondalık kısım **yuvarlama değil kesme** ile atılır. `(int) 3.9` sonucu 4 değil, 3'tür! Bu, test otomasyon scriptlerinde hesaplama yaparken beklenmedik sonuçlara yol açabilir.

```java
// Gerçek hayat örneği: Yüzde hesabı
int passed = 87;
int total = 100;
double percent = (double) passed / total * 100; // 87.0
int rounded = (int) Math.round(percent);        // 87 (Math.round kullanın!)
int truncated = (int) percent;                  // 87 (bu örnekte şans, 87.5 olsaydı 87 çıkardı!)
```

**Section 2.2: Sayısal Yükseltme (Numeric Promotion)**

İki farklı sayısal ilkel tip üzerinde işlem yapılırken, Java küçük olan tipi otomatik olarak büyük tipe yükseltir:

```java
char char1 = 1, char2 = 2;
short short1 = 1, short2 = 2;
int int1 = 1, int2 = 2;
float float1 = 1.0f, float2 = 2.0f;

// char1 = char1 + char2; // DERLEME HATASI: int'i char'a atayamazsınız
// short1 = short1 + short2; // DERLEME HATASI: int'i short'a atayamazsınız

int1 = char1 + char2;     // char → int yükseltildi
int1 = short1 + short2;   // short → int yükseltildi
float1 = short1 + float2; // short → float yükseltildi
```

💡 Yorum: Bu kural başlangıçta şaşırtıcı gelebilir. "İki short'u topluyorum, neden int çıkıyor?" diye sorabilirsiniz. Bunun nedeni tarihsel olarak CPU mimarisidir: x86 işlemciler 32-bit işlemleri daha verimli yapardı. Java bu gerçekliği dile taşıdı. Pratik sonucu: `short s = 1 + 2;` yazmak sorunsuz çalışır (sabit değerler derleme zamanında hesaplanır), ama `short a = 1; short b = 2; short c = a + b;` yazmak derleme hatası verir.

**Section 2.3: Sayısal Olmayan Tip Dönüşümü**

**boolean** tipi hiçbir ilkel tipe dönüştürülemez.

```java
int badInt = (int) true; // DERLEME HATASI: uyumsuz tipler

char char1 = (char) 65;   // 'A' — 65 ASCII koduna karşılık gelir
byte byte1 = (byte) 'A';  // 65
int int1 = (int) 'A';     // 65
```

💡 Yorum: Java'da `boolean`'ı integer'a dönüştürememek bazen sinir bozucu gelebilir. C/C++'da `true == 1` ve `false == 0`'dır, ama Java bu kısayolu kapatmıştır. Bu tasarım kararının arkasında okunabilirlik yatar: `if (count)` yazıp `count` sıfır olmadığı için true saydırmak yerine `if (count > 0)` yazmak zorunda kalırsınız. QA testlerinde booleanları doğrudan yazdırmak için `String.valueOf(booleanValue)` veya `Boolean.toString(booleanValue)` kullanın.

**Section 2.4: Nesne Tip Dönüşümü**

```java
Float floatVar = new Float(42.0f);
Number n = floatVar;           // Örtük — Float, Number'dan türemekte
Float floatVar2 = (Float) n;  // Açık — güvenli çünkü nesne zaten Float
Double doubleVar = (Double) n; // ClassCastException! Nesne Double değil, Float
```

💡 Yorum: Nesne cast işlemini şöyle düşünün: Bir kişiyi (Float nesnesi) "Sayı" (Number) olarak tanımlayabilirsiniz çünkü sayıdır. Ama onu "Çift hassasiyetli sayı" (Double) olarak tanımlayamazsınız çünkü o özelliğe sahip değil. ClassCastException tam da bunu söyler: "Sen bu nesneyi Double'a cast etmeye çalışıyorsun ama o Double değil."

🎯 QA İçin Gerçek Senaryo: Rest Assured ile API testi yaparken JSON'dan gelen değerler Object tipinde gelir. Bir `List<Object>` içindeki elemanlara erişirken cast yapmak zorunda kalırsınız:

```java
// API yanıtından gelen veriyi cast etme
List<Object> items = response.jsonPath().getList("items");
for (Object item : items) {
    Map<String, Object> itemMap = (Map<String, Object>) item;  // ClassCastException riski!
    String name = (String) itemMap.get("name");
    Integer count = (Integer) itemMap.get("count");
}
```

**Section 2.5: instanceof ile Tip Kontrolü**

```java
Object obj = Calendar.getInstance();

if (obj instanceof Calendar) {
    long time = ((Calendar) obj).getTime().getTime(); // Güvenli cast
    System.out.println("Zaman: " + time);
}

if (obj instanceof Date) {
    // Bu bloğa hiç girilmez; obj Date değil, Calendar
}
```

💡 Yorum: `instanceof` hem tip kontrolü hem de null güvenliği sağlar. `obj instanceof Calendar` ifadesi `obj` null ise otomatik olarak `false` döner, NullPointerException fırlatmaz. Bu, aşağıdaki pattern'den daha güvenlidir:

```java
// Tehlikeli (obj null ise NullPointerException):
if (obj.getClass() == Calendar.class) { ... }

// Güvenli (null kontrolü içerir):
if (obj instanceof Calendar) { ... }
```

Java 16+ ile pattern matching ile daha temiz bir sözdizimi geldi:

```java
// Java 16+ pattern matching
if (obj instanceof Calendar cal) {
    long time = cal.getTime().getTime(); // cal otomatik cast edildi
}
```

**Chapter 3: Getter ve Setter Metotları**

**Section 3.1: Kısıtlama Uygulamak İçin Getter/Setter Kullanımı**

```java
public class Person {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name != null && name.length() > 2) {
            this.name = name;
        }
    }
}
```

💡 Yorum: Bu örnek getter/setter'ın gücünü güzel özetler. `person.name = "A"` diyebilseydiniz, kısıtlamayı atlayabilirdiniz. Ama `person.setName("A")` dediğinizde set işlemi sessizce başarısız olur (isim değişmez). Test yazarken bu davranışı test etmeniz gerekir:

```java
// Bu bir birim testi (JUnit) örneğidir
@Test
void testSetNameIgnoresShortName() {
    Person person = new Person();
    person.setName("AB");   // 2 karakter, reddedilmeli
    assertNull(person.getName()); // isim null olmalı
    
    person.setName("Ali");  // 3 karakter, kabul edilmeli
    assertEquals("Ali", person.getName());
}
```

Getter metoduna da kısıtlama uygulanabilir:

```java
public String getName() {
    if (name != null && name.length() > 16) {
        return name.substring(0, 13) + "..."; // Uzun isimleri kırp
    }
    return name;
}
```

**Section 3.2: Getter ve Setter Neden Kullanılır?**

```java
// 1. Sürüm: Getter/Setter ile
public class CountHolder {
    private int count = 0;
    public int getCount() { return count; }
    public void setCount(int c) { count = c; }
}

// 2. Sürüm: Public alan ile
public class CountHolder {
    public int count = 0;
}
```

💡 Yorum: İkisi de şu an aynı çalışır. Ama düşünün: 6 ay sonra `count`'un negatif olamayacağını öğrendiniz. 1. sürümde sadece `setCount` içine bir if eklersiniz — tüm sistemi değiştirmek zorunda kalmazsınız. 2. sürümde ise projenin her yerinde `count`'a doğrudan yazan satırları bulup düzeltmeniz gerekir.

Senkronizasyon örneği: Multi-thread ortamda (örneğin Selenium Grid'de paralel test çalıştırırken):

```java
// Thread-safe hale getirmek için sadece setter/getter'a synchronized eklemek yeter
public class CountHolder {
    private int count = 0;
    
    public synchronized int getCount() { return count; }
    public synchronized void setCount(int c) { count = c; }
    public synchronized void increment() { count++; } // Atomik artış
}
```

Eğer `count` public olsaydı, her erişim noktasına `synchronized` bloğu eklemeniz gerekirdi. Bu hem çok zahmetli hem de hata yapmaya açık bir süreçtir.

**Section 3.3: Getter ve Setter Ekleme**

İsimlendirme kuralı:

```java
public class Sample {
    private String name;
    private int age;
    private boolean active;

    // String → getXxx()
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // int → getXxx()
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    // boolean → isXxx()  (NOT getXxx!)
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
```

💡 Yorum: Boolean getter'lar için neden `get` yerine `is` kullanılır? Okunabilirlik! `person.isActive()` ifadesi "kişi aktif mi?" sorusunu yanıtlar; `person.getActive()` ifadesi ise "kişinin aktif özelliğini al" gibi garip gelir. Bu kural, Lombok, Jackson ve Spring gibi framework'lerin boolean alanlarını nasıl işlediğini etkiler. Boolean getter'ınız `get` ile başlarsa bazı framework'ler alanı görmeyebilir.

🎯 QA İçin Not: Selenium'da Page Object Model (POM) kullanırken elemanları encapsulate etmek için benzer bir yaklaşım kullanılır:

```java
public class LoginPage {
    private WebDriver driver;
    
    // Locator'lar private
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.cssSelector("button[type='submit']");
    
    // Action metodları public
    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public HomePage clickLogin() {
        driver.findElement(loginButton).click();
        return new HomePage(driver);
    }
    
    public boolean isLoginPageDisplayed() {
        return driver.findElement(usernameField).isDisplayed();
    }
}
```

**Chapter 4: Referans Veri Tipleri**

**Section 4.1: Referansı Çözme (Dereferencing)**

```java
Object obj = new Object();
String text = obj.toString(); // 'obj' dereference ediliyor
```

💡 Yorum: "Referans" kavramını şöyle düşünün: `obj` değişkeni bir evin adresi gibidir. Gerçek evin kendisi heap belleğinde durmaktadır. `.` operatörü o adrese gidip eve giren kapı gibidir. Dereferencing = adrese gidip kapıyı açmak.

```java
String adres = "Atatürk Caddesi No:5"; // Bu, evin adresi
// Gerçek evin (nesnenin) kendisi bellektedir
// adres.uzunluk() → adrese git, oradaki evin kaç odası var diye sor
```

Bir referansın değeri **null** olduğunda, dereferencing **NullPointerException** ile sonuçlanır:

```java
Object obj = null;
obj.toString(); // NullPointerException: obj adresine git → adres yok → hata!
```

💡 Yorum: NullPointerException, Java geliştiricilerinin en çok karşılaştığı hata türüdür. Selenium testlerinde `driver.findElement(by).click()` çağrısında `findElement` null döndürürse (element bulunamadıysa) NPE alırsınız. Bunun için her zaman:

```java
// Kötü yaklaşım:
driver.findElement(By.id("submit")).click(); // NPE riski

// İyi yaklaşım:
WebElement button = driver.findElement(By.id("submit"));
if (button != null) {
    button.click();
} else {
    System.out.println("Submit butonu bulunamadı!");
}

// Daha iyi yaklaşım: WebDriverWait kullanın
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
button.click();
```

**Section 4.2: Örneklendirme (Instantiation)**

```java
Object obj = new Object();
```

Burada olup bitenler sırasıyla:
1. JVM, heap belleğinde Object için yer ayırır
2. Object() constructor çağrılarak nesne initialize edilir
3. Bellek adresi `obj` referansına atanır

```java
// İlkel tip: değeri doğrudan tutar (stack'te)
int i = 42; // 42 sayısı i değişkeninde doğrudan durur

// Referans tip: adresi tutar (heap'teki nesneye işaret eder)
String s = new String("merhaba"); // s, heap'teki "merhaba" nesnesinin adresini tutar
```

💡 Yorum: Bu ayrım performans açısından kritiktir. İlkel tipler (int, double, boolean, vb.) stack'te tutulur; erişim hızlı ve tahmin edilebilirdir. Nesneler heap'te tutulur; Garbage Collector tarafından yönetilir ve erişim biraz daha yavaştır. Test otomasyon testlerinizde binlerce test verisi nesnesi oluşturuyorsanız bu fark önem kazanır.

🎯 Gerçek Senaryo: Selenium WebDriver'ı şu şekilde initialize edersiniz:

```java
WebDriver driver = new ChromeDriver(); // 'new' ile heap'te ChromeDriver nesnesi oluştu
driver.get("https://example.com");     // driver adresine git, get metodunu çağır
driver.quit();                          // Nesneyi kapat
driver = null;                          // Referansı sıfırla (GC artık temizleyebilir)
```

**Chapter 5: Java Derleyicisi - 'javac'**

**Section 5.1: 'javac' Komutu**

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

```bash
$ javac HelloWorld.java   # Derleme → HelloWorld.class üretilir
$ java HelloWorld          # Çalıştırma → "Hello world!"
```

💡 Yorum: `javac` (Java Compiler) kaynak kodunuzu (insan okuyabilir .java) bytecode'a (JVM'nin anlayabileceği .class) dönüştürür. Bu iki adımlı süreç Java'nın "Write Once, Run Anywhere" (bir kez yaz, her yerde çalıştır) felsefesinin temelidir. Aynı .class dosyası Windows, macOS, Linux'ta — JVM kurulu olan her yerde — çalışır.

Dikkat edilmesi gereken noktalar:
1. Kaynak dosya adı HelloWorld.java, sınıf adıyla (HelloWorld) eşleşmelidir
2. .class dosyasını yeniden adlandırırsanız `java` komutu çalışmaz
3. `java` komutuna sınıf adını verirsiniz; dosya adını değil

**Paket Kullanan Örnek**

```java
// com/example/HelloWorld.java
package com.example;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

Dizin yapısı:
```
proje/
└── com/
    └── example/
        └── HelloWorld.java
```

```bash
$ javac com/example/HelloWorld.java
$ java com.example.HelloWorld
Hello world!
```

💡 Yorum: Paketler Java'da namespace yönetiminin temelidir. `com.example` şeklindeki ters alan adı formatı, sınıf ismi çakışmalarını önler. Şirketinizin domain'i `mycompany.com` ise testlerinizi `com.mycompany.tests` gibi bir paket altında toplamalısınız. Maven ve Gradle projeleri bu paket yapısını `src/main/java` ve `src/test/java` dizinleri altında zorla uygular.

**Birden Fazla Dosyayı Derleme**

```bash
# Tek tek
$ javac Foo.java Bar.java

# Joker karakter ile
$ javac *.java
$ javac com/example/*.java

# Dosya listesi ile
$ javac @sourcefiles
```

💡 Yorum: Gerçek projelerde hiç `javac` komutunu elle yazmayacaksınız. Maven (`mvn compile`), Gradle (`gradle compileJava`) veya IDE derlemeyi otomatik yapar. Ama CI/CD pipeline'larında derleme hatalarını okuyabilmek için javac'ın ne yaptığını bilmeniz gerekir. Jenkins veya GitHub Actions'ta kırmızı build gördüğünüzde log'larda javac hata mesajlarını anlayabileceksiniz.

**Sık Kullanılan Seçenekler**

```bash
javac -d target/classes src/com/example/*.java  # .class dosyaları için hedef dizin
javac -sourcepath src -d target/classes Main.java # Kaynak yolu belirt
javac -cp lib/selenium.jar MyTest.java           # Harici jar ekle
javac -source 11 -target 11 MyClass.java        # Java 11 hedef
javac -version                                   # Derleyici versiyonu
```

**Section 5.2: Farklı Java Sürümleri için Derleme**

```bash
$ javac -source 1.8 -target 1.8 MyProgram.java
```

💡 Yorum: Bir CI ortamında JDK 17 kullanıyorsunuz ama production'da JDK 11 çalışıyor. `-source 11 -target 11` seçenekleri kodunuzun Java 11 ile uyumlu bytecode üretmesini sağlar. Selenium 4 projelerinde bu sıkça karşılaşılan bir durumdur.

Daha modern yaklaşım olan `--release` seçeneği hem `source` hem de `target`'ı aynı anda ayarlar:

```bash
$ javac --release 11 MyProgram.java
```

**Chapter 6: Java Kodunu Belgelendirme (Javadoc)**

**Section 6.1: Komut Satırından Javadoc Oluşturma**

```bash
# Tek dosya
javadoc JavaFile.java

# Paket ve tüm alt paketler için
javadoc -d docs/ -subpackages -sourcepath src/ com.example
```

💡 Yorum: Javadoc bir lüks değil, bir zorunluluktur. Özellikle test otomasyon framework'lerinde Page Object sınıflarınızı, utility metodlarınızı ve test veri modellerinizi Javadoc ile belgelerseniz, ekibinizdeki yeni QA mühendisleri API dokümantasyonu okuyarak hızla onboard olabilir. En azından her public metodun ne yaptığını, parametrelerini ve dönüş değerini belgeleyin.

**Section 6.2: Sınıf Dokümantasyonu**

```java
/**
 * Kullanıcı giriş sayfasının Page Object modeli.
 *
 * Bu sınıf, login sayfasındaki tüm elementler ve
 * kullanıcı etkileşimlerini kapsüller.
 *
 * Kullanım örneği:
 * {@code
 * LoginPage loginPage = new LoginPage(driver);
 * loginPage.enterUsername("admin");
 * loginPage.enterPassword("secret");
 * HomePage home = loginPage.clickLogin();
 * }
 *
 * @author QA Team
 * @version 2.1
 * @since 2024-01-15
 * @see HomePage
 * @see BasePage
 */
public class LoginPage extends BasePage {
    // ...
}
```

💡 Yorum: `{@code}` etiketi içindeki kod HTML olarak render edilir ama kod bloğu olarak formatlanır. Sınıfınızın kullanım örneğini buraya koymak, dokümantasyonu okuyan kişinin "bunu nasıl kullanırım?" sorusunu hemen yanıtlar.

**Section 6.3: Metot Dokümantasyonu**

```java
/**
 * Belirtilen kullanıcı adıyla giriş yapar ve başarılı olursa ana sayfaya yönlendirir.
 *
 * @param username Sistemde kayıtlı kullanıcı adı, null veya boş olamaz
 * @param password En az 8 karakter uzunluğunda şifre
 * @return Başarılı giriş sonrası oluşturulan HomePage nesnesi
 * @throws InvalidCredentialsException Kullanıcı adı veya şifre hatalıysa
 * @throws TimeoutException Sayfa 10 saniye içinde yüklenemezse
 */
public HomePage login(String username, String password) {
    enterUsername(username);
    enterPassword(password);
    return clickLogin();
}
```

**Section 6.4: Alan (Field) Dokümantasyonu**

```java
/** Tarayıcı oturumu boyunca geçerli olan default bekleme süresi (saniye). */
private static final int DEFAULT_WAIT_SECONDS = 10;

/**
 * Kullanıcı adı input elementinin locator'ı.
 * Sayfada birden fazla form varsa bu locator'ı güncellemeniz gerekebilir.
 */
private final By usernameLocator = By.id("login-username");
```

**Section 6.5: Paket Dokümantasyonu**

```java
/**
 * E-ticaret uygulaması test otomasyon framework'ünün Page Object sınıfları.
 *
 * Bu paket, tüm sayfaların Page Object Model implementasyonlarını içerir.
 * Her sınıf bir sayfayı temsil eder ve o sayfadaki etkileşimleri kapsüller.
 */
package com.mycompany.tests.pages;
```

**Chapter 7: Komut Satırı Argümanlarını İşleme**

**Section 7.1: GWT ToolBase ile Argüman İşleme**

```java
public class MyProgramHandler extends ToolBase {
    protected File dir;
    protected int port;

    public MyProgramHandler() {
        this.registerHandler(new ArgHandlerDir() {
            @Override
            public void setDir(File dir) {
                MyProgramHandler.this.dir = dir;
            }
        });
        this.registerHandler(new ArgHandlerInt() {
            @Override
            public String[] getTagArgs() {
                return new String[]{"port"};
            }
            @Override
            public void setInt(int value) {
                MyProgramHandler.this.port = value;
            }
        });
    }

    public static void main(String[] args) {
        MyProgramHandler myShell = new MyProgramHandler();
        if (myShell.processArgs(args)) {
            System.out.println(String.format("port: %d; dir: %s",
                myShell.port, myShell.dir));
        }
    }
}
```

💡 Yorum: GWT (Google Web Toolkit) kütüphanesi bu konuda kullanışlıdır ama modern projelerde komut satırı argümanları için genellikle Apache Commons CLI veya daha modern olan picocli kütüphanesi tercih edilir. TestNG veya JUnit test runner'larını CLI'dan çalıştırırken argüman işlemeye ihtiyaç duyabilirsiniz.

**Section 7.2: Argümanları Elle İşleme**

```java
public class TestRunner {
    public static void main(String[] args) {
        String browser = "chrome";    // varsayılan
        String env = "staging";       // varsayılan
        boolean headless = false;     // varsayılan

        for (int i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "--browser":
                    browser = args[++i];
                    break;
                case "--env":
                    env = args[++i];
                    break;
                case "--headless":
                    headless = true;
                    break;
                default:
                    System.err.println("Bilinmeyen parametre: " + args[i]);
            }
        }

        System.out.printf("Browser: %s, Env: %s, Headless: %b%n",
            browser, env, headless);
    }
}
```

Çalıştırma:
```bash
$ java TestRunner --browser firefox --env prod --headless
Browser: firefox, Env: prod, Headless: true
```

🎯 QA İçin Gerçek Senaryo: Jenkins pipeline'ında farklı ortamlarda Selenium testleri çalıştırmak için bu pattern kullanılır. Maven ile:

```bash
mvn test -Dbrowser=firefox -Denv=staging -Dheadless=true
```

Java kodu içinde:
```java
String browser = System.getProperty("browser", "chrome");
String env = System.getProperty("env", "staging");
boolean headless = Boolean.parseBoolean(System.getProperty("headless", "false"));
```

**Chapter 8: Java Komutu - 'java' ve 'javaw'**

**Section 8.1: Giriş Noktası Sınıfları**

Bir Java programının başlayabileceği tek nokta vardır:

```java
public static void main(String[] args)
```

💡 Yorum: Neden tam olarak bu imza? Her parça bir sebebe dayanır:
- **public**: JVM program dışından bu metodu çağırır; görebilmesi için public olmalı
- **static**: JVM sınıftan nesne oluşturmadan main'i çağırır; nesne gerektirmeyen static olmalı
- **void**: Program bittikten sonra JVM'nin alacağı bir değer yok; işletim sistemi çıkış kodu `System.exit(int)` ile ayrıca belirtilebilir
- **String[] args**: Kullanıcı komut satırından ne yazdıysa oraya gelir

Geçerli çeşitler:
```java
public static void main(String[] args)   // Standart
public static void main(String... args)  // Varargs (aynı şey, farklı sözdizimi)
static public void main(String[] args)   // Modifier sırası farklı ama geçerli
```

**JavaFX Giriş Noktaları**

```java
public class MyApp extends Application {
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Merhaba JavaFX");
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args); // JavaFX başlatma
    }
}
```

**Section 8.2: Yaygın Hatalar ve Çözümleri**

**"Command not found"**

```
java: command not found
```

Sebep: PATH'te java yok. Çözüm:
```bash
# Linux/macOS
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH

# Kalıcı yapmak için ~/.bashrc veya ~/.zshrc dosyasına ekleyin
```

**"Could not find or load main class"**

```
Error: Could not find or load main class com.example.HelloWorld
```

Olası sebepler ve çözümler:

```bash
# 1. Classpath yanlış — mevcut dizini ekleyin
java -classpath . com.example.HelloWorld

# 2. Paket adı yanlış — sınıf içindeki package ile eşleşmeli
# Sınıf: package com.example; → java com.example.HelloWorld
# Sınıf: package com.test; → java com.test.HelloWorld  (com.example değil!)

# 3. .class dosyası yanlış konumda
# com.example.HelloWorld için com/example/HelloWorld.class olmalı
```

💡 Yorum: Bu hata, özellikle Maven projelerini manuel çalıştırmaya çalışırken sık görülür. Maven projelerinde `target/classes` dizinini classpath'e eklemeniz gerekir:

```bash
java -classpath target/classes com.example.HelloWorld
```

**Section 8.3: Önemli JVM Seçenekleri**

```bash
java -version                    # JVM versiyonu
java -cp lib.jar:. MyClass       # Classpath (Linux: :, Windows: ;)
java -Xms512m -Xmx2g MyClass    # Heap: min 512MB, max 2GB
java -Dproperty=value MyClass    # Sistem özelliği
java -ea MyClass                 # Assertion'ları etkinleştir
java -verbose:gc MyClass         # GC loglarını göster
java -XX:+HeapDumpOnOutOfMemoryError MyClass  # OOM'de heap dump al
```

🎯 QA İçin Not: Selenium Grid ile büyük ölçekli paralel test çalıştırırken JVM ayarları kritiktir. OutOfMemoryError alıyorsanız `-Xmx` değerini artırın. Test süitiniz yavaşsa `-XX:+UseG1GC` GC algoritmayı deneyin.

**Chapter 9: Literaller (Sabit Değerler)**

**Section 9.1: Alt Çizgi ile Okunabilirlik**

Java 7'den itibaren sayı literallerinde alt çizgi kullanabilirsiniz:

```java
int phoneNumber = 532_123_45_67;   // Türk telefon numarası formatı
long creditCard = 1234_5678_9012_3456L;
double pi       = 3.141_592_653_589_793;
long hexRGB     = 0xFF_99_00;      // Turuncu renk (hex RGB)
int bitmask     = 0b1010_1010;     // Binary maske, 4'erli gruplar
```

💡 Yorum: Alt çizgi sadece okunabilirlik içindir — derleme zamanında kaldırılır. `532_123_45_67 == 5321234567` tamamen doğrudur. Test verisi oluştururken (özellikle telefon, TC kimlik numarası, banka kartı gibi uzun sayısal ID'lerle çalışırken) bu özelliği kullanmak hem okunabilirliği artırır hem de hata yapma olasılığını azaltır.

Alt çizgi **yasak** olan yerler:
```java
int a = _42;    // HATA: Başta olamaz (değişken adı olarak yorumlanır)
int b = 42_;    // HATA: Sonda olamaz
double c = 3._14; // HATA: Ondalık noktaya bitişik olamaz
long d = 42_L;  // HATA: L son ekinden önce olamaz
```

**Section 9.2: Onaltılık, Sekizli ve İkili Literaller**

```java
int dec = 110;       // Onluk (Decimal)   — Önek yok
int hex = 0x6E;      // Onaltılık (Hex)   — 0x veya 0X öneki
int oct = 0156;      // Sekizli (Octal)   — 0 öneki
int bin = 0b1101110; // İkili (Binary)    — 0b veya 0B öneki

// Hepsi aynı değer: 110
System.out.println(dec == hex && hex == oct && oct == bin); // true
```

⚠️ Kritik Uyarı: Başında sıfır olan bir sayı sekizli olarak yorumlanır!

```java
int normalNum = 100;  // Onluk: 100
int octalNum  = 0100; // Sekizli: 64 (8^2 = 64)
// Bu çok sinsi bir bug kaynağıdır!

// Test verisi oluştururken şehir kodları veya posta kodlarına dikkat:
int ankaraCode = 06;   // Sekizli! Değeri 6'dır (onluk 6 ile aynı, şans)
int istCode    = 034;  // Sekizli! Değeri 28, onluk 34 değil!
```

💡 Yorum: Onaltılık notasyon en çok renk kodları, bitmask'lar ve bellek adresleri için kullanılır. İkili notasyon ise flag'ler ve bitsel işlemler için idealdir. QA testlerinde bu notasyonları genellikle renk değerlerini test ederken veya binary protokolleri analiz ederken görürsünüz.

**Section 9.3: Boolean Literalleri**

```java
boolean isLoggedIn = true;
boolean hasPermission = false;

// boolean → String
String s1 = String.valueOf(isLoggedIn);    // "true"
String s2 = Boolean.toString(hasPermission); // "false"

// String → boolean
boolean b1 = Boolean.parseBoolean("true");  // true
boolean b2 = Boolean.parseBoolean("TRUE");  // true (büyük/küçük harf duyarsız)
boolean b3 = Boolean.parseBoolean("yes");   // false (sadece "true" true döner)
boolean b4 = Boolean.parseBoolean("1");     // false (Java'da 1 true değil!)
```

⚠️ Uyarı: `Boolean.parseBoolean("yes")` ve `Boolean.parseBoolean("1")` **false** döner! Java'da boolean parse ederken sadece `"true"` (büyük/küçük harf duyarsız) true olarak değerlendirilir. API'den gelen `"yes"` veya `"1"` değerlerini boolean'a çeviriyorsanız kendi dönüşüm mantığınızı yazmanız gerekir:

```java
String apiValue = "yes";  // API'den geldi
boolean result = "true".equalsIgnoreCase(apiValue) || "yes".equalsIgnoreCase(apiValue) || "1".equals(apiValue);
```

**Section 9.4: String Literalleri**

```java
String empty = "";
String hello = "Merhaba, Dünya!";
String withNewline = "Birinci satır\nİkinci satır";
String withTab = "Ad:\tAli";
String withQuote = "Dedi ki: \"Merhaba\"";
String path = "C:\\Users\\Test\\file.txt"; // Windows yolu
```

💡 Yorum: String literalleri compile-time'da oluşturulur ve String Pool'a yerleştirilir. Yani aynı String literal'i birden fazla yerde kullanırsanız, Java bunları tek bir nesneyi paylaşarak optimize eder. Bu yüzden `"hello" == "hello"` true döner, ama `new String("hello") == new String("hello")` false döner. Test yazarken String karşılaştırmasında **her zaman** `.equals()` kullanın.

Java 15+ ile çok satırlı String (Text Block):

```java
// Java 15+: Text Block — Uzun JSON/HTML için ideal
String json = """
        {
            "username": "testuser",
            "password": "secret123"
        }
        """;

String html = """
        <html>
            <body>
                <h1>Test Sayfası</h1>
            </body>
        </html>
        """;
```

**Section 9.5: Null Literal**

```java
String name = null;    // Herhangi bir nesneye işaret etmiyor
Object obj = null;
int[] arr = null;

// null kontrolü
if (name == null) {
    System.out.println("İsim belirtilmemiş");
}

// null güvenli işlemler
String result = name != null ? name.toUpperCase() : "BİLİNMİYOR";

// Java 8+: Optional ile null güvenliği
Optional<String> optName = Optional.ofNullable(name);
String upper = optName.map(String::toUpperCase).orElse("BİLİNMİYOR");
```

💡 Yorum: `null`, "değer yok" anlamına gelir. Tony Hoare (null'ı icat eden kişi) buna "billion dollar mistake" (milyar dolarlık hata) demiştir çünkü null pointer exception'lar dünya çapında sayısız sistemin çökmesine neden olmuştur. Modern Java'da `Optional` kullanmak, null kontrollerini daha güvenli ve okunabilir hale getirir.

**Section 9.6: Karakter Literalleri**

```java
char letter = 'A';
char digit  = '5';
char space  = ' ';
char tab    = '\t';
char newline = '\n';
char backslash = '\\';
char singleQuote = '\'';
char unicode = 'İ'; // İ (Büyük noktalı I — Türkçe)

// char aritmetiği
char next = (char)('A' + 1); // 'B'
int asciiValue = 'A';         // 65
```

💡 Yorum: `char` tek tırnak, `String` çift tırnak kullanır — karıştırmayın! `char c = "A"` derleme hatası verir. Türkçe karakterler için Unicode kullanmanız gerekebilir: `'İ'` = `'İ'`, `'ş'` = `'ş'`.

**Section 9.7: Tamsayı Literalleri**

```java
int max = 2_147_483_647;     // Integer.MAX_VALUE
int min = -2_147_483_648;    // Integer.MIN_VALUE
long big = 9_223_372_036_854_775_807L; // Long.MAX_VALUE

// Tam sayı taşması (overflow) — sessizce gerçekleşir, hata vermez!
int overflow = Integer.MAX_VALUE + 1; // -2147483648 (min değere döner)
System.out.println(overflow); // -2147483648 — beklenmedik!
```

⚠️ Uyarı: Java'da tamsayı taşması sessizce gerçekleşir — hata veya uyarı almıyorsunuz. Bu, test yazarken kritik bir edge case'tir. Büyük sayılarla çalışıyorsanız `Math.addExact()` kullanın:

```java
try {
    int result = Math.addExact(Integer.MAX_VALUE, 1); // ArithmeticException fırlatır
} catch (ArithmeticException e) {
    System.out.println("Taşma tespit edildi: " + e.getMessage());
}
```

**Section 9.8: Kayan Noktalı Literaller**

```java
float f1 = 3.14f;   // float (son ek zorunlu)
double d1 = 3.14;   // double (varsayılan)
double d2 = 3.14d;  // double (açık)
double sci = 1.5e6; // 1.5 × 10^6 = 1500000.0

// Precision sorunu — finansal hesaplamalarda KULLANMAYIN
double a = 0.1 + 0.2;
System.out.println(a);         // 0.30000000000000004 (!)
System.out.println(a == 0.3);  // false (!)

// Para hesapları için BigDecimal kullanın
BigDecimal ba = new BigDecimal("0.1");
BigDecimal bb = new BigDecimal("0.2");
System.out.println(ba.add(bb));    // 0.3 (doğru!)
System.out.println(ba.add(bb).compareTo(new BigDecimal("0.3")) == 0); // true
```

🎯 QA İçin Not: E-ticaret uygulamalarını test ederken fiyat doğrulaması yapıyorsanız asla `double` ile karşılaştırmayın. Tolerans kullanın veya String karşılaştırması yapın:

```java
// Kötü:
assertEquals(29.99, actualPrice); // Floating point karşılaştırma riski

// İyi (delta/epsilon ile):
assertEquals(29.99, actualPrice, 0.001); // 0.001 tolerans

// En iyi (BigDecimal veya String):
assertEquals("29.99", priceElement.getText().replaceAll("[^0-9.]", ""));
```

**Section 9.9: Kaçış Dizileri**

```java
String tab     = "Sütun1\tSütun2\tSütun3"; // Tab ile hizalama
String newline = "Satır1\nSatır2\nSatır3";  // Satır sonu
String cr      = "Windows\r\nSatır Sonu";    // Windows CRLF
String quote   = "Dedi ki: \"Güzel!\"";      // Tırnak içinde tırnak
String path    = "C:\\Users\\test\\file";    // Windows yolu
String unicode = "Hello"; // "Hello"
```

💡 Yorum: Windows ve Linux'ta farklı satır sonu karakterleri (`\r\n` vs `\n`) test sonuçlarında şaşırtıcı farklılıklara yol açabilir. Platform bağımsız satır sonu için:

```java
String separator = System.lineSeparator(); // OS'a göre \n veya \r\n
```

**Section 9.10: Literal Tipleri Özeti**

```java
// Tüm literal tipleri
byte   b = 127;           // byte
short  s = 32767;         // short
int    i = 2_147_483_647; // int (varsayılan)
long   l = 42L;           // long (L son eki)
float  f = 3.14f;         // float (f son eki)
double d = 3.14;          // double (varsayılan)
char   c = 'A';           // char (tek tırnak)
boolean bool = true;      // boolean
String str = "Merhaba";  // String (çift tırnak) — teknik olarak literal değil, nesne
```

**Chapter 10: İlkel (Primitive) Veri Tipleri**

**Section 10.1: char**

`char`, 16-bit işaretsiz Unicode karakteri temsil eder:

```java
char c1 = 'A';          // Karakter literali
char c2 = 65;           // ASCII kodu (A = 65)
char c3 = 'A';     // Unicode escape (A = 'A')
char c4 = '\n';         // Newline kaçış karakteri

System.out.println(c1);       // A
System.out.println((int)c1);  // 65 (char → int cast)
System.out.println(c1 + 1);   // 66 (otomatik int'e yükseltilir)
System.out.println((char)(c1 + 1)); // B (geri cast)
```

💡 Yorum: `char` değişkenler üzerinde aritmetik yapabilirsiniz! `'A' + 1 = 66` (int olarak). Bu, alfabetik şifreleme veya karakter dönüşümleri yaparken işe yarar. Ama dikkat: `char + int` sonucu `int`'tir; char değil. Sonucu char olarak kullanmak için tekrar cast etmeniz gerekir.

**Section 10.2: Primitive Tip Tablosu**

```
Tip      | Boyut  | Min Değer             | Maks Değer            | Varsayılan
---------|--------|----------------------|----------------------|----------
byte     | 8 bit  | -128                 | 127                  | 0
short    | 16 bit | -32,768              | 32,767               | 0
int      | 32 bit | -2,147,483,648       | 2,147,483,647        | 0
long     | 64 bit | -9.2 × 10^18         | 9.2 × 10^18          | 0L
float    | 32 bit | 1.4 × 10^-45         | 3.4 × 10^38          | 0.0f
double   | 64 bit | 4.9 × 10^-324        | 1.8 × 10^308         | 0.0d
char     | 16 bit | '' (0)         | '￿' (65,535)    | ''
boolean  | 1 bit  | false                | true                 | false
```

💡 Yorum: "Hangi tipi kullanalım?" için pratik kural:
- Tamsayı → genellikle `int`, çok büyükse `long`
- Ondalık → genellikle `double`, gerçek zamanlı sinyal işleme gibi hassasiyet gerekseyse `float`
- Para → **`BigDecimal`** (primitive hiçbirini kullanmayın!)
- Tek karakter → `char`; ama modern Java'da çoğunlukla `String` tercih edilir
- Evet/Hayır → `boolean`
- Ham byte verisi → `byte[]` (dosya, network, image)

**Section 10.3: float**

```java
float f1 = 3.14f;
float f2 = 3.14F;  // F büyük de olabilir

// float hassasiyeti ~7 basamak
float precise = 1.23456789f;
System.out.println(precise); // 1.2345679 (8. basamakta yuvarlandı)

// Karşılaştırmada tolerans kullanın
float a = 0.1f + 0.2f;
// a == 0.3f → güvenilmez!
boolean close = Math.abs(a - 0.3f) < 0.0001f; // Toleranslı karşılaştırma
```

**Section 10.4: int**

```java
int a = 2_147_483_647;  // Integer.MAX_VALUE
int b = a + 1;           // Overflow! → -2,147,483,648

// Sınır değerleri
System.out.println(Integer.MAX_VALUE);  // 2147483647
System.out.println(Integer.MIN_VALUE);  // -2147483648
System.out.println(Integer.SIZE);       // 32 (bit)
System.out.println(Integer.BYTES);      // 4 (byte)

// Faydalı Integer metodları
System.out.println(Integer.toBinaryString(42)); // "101010"
System.out.println(Integer.toHexString(255));   // "ff"
System.out.println(Integer.bitCount(42));        // 3 (42 = 101010, 3 adet 1 var)
System.out.println(Integer.reverse(1));          // -2147483648
```

💡 Yorum: `int`, Java'daki en hızlı tamsayı tipidir çünkü modern CPU'lar 32-bit operasyonlara optimize edilmiştir. `byte` veya `short` kullanmak bellekten tasarruf sağlar ama hesaplamalar gene de int'e yükseltilir. Bu yüzden büyük array'ler dışında int her zaman ilk tercihtir.

**Section 10.5: İlkel Tip Dönüşüm Örnekleri**

```java
// int ↔ String
int num = 42;
String s1 = String.valueOf(num);      // "42"
String s2 = Integer.toString(num);   // "42"
String s3 = "" + num;               // "42" (String concatenation, kaçının)

int parsed = Integer.parseInt("42");  // 42
// Integer.parseInt("abc") → NumberFormatException!

// Güvenli parse (try-catch ile)
String input = "abc";
int value = 0;
try {
    value = Integer.parseInt(input);
} catch (NumberFormatException e) {
    System.out.println("Geçersiz sayı: " + input);
}

// int ↔ double
double d = num;            // Implicit (int → double)
int back = (int) d;        // Explicit (double → int, truncation)

// Kutulama (Boxing / Unboxing)
Integer boxed = num;       // Autoboxing: int → Integer
int unboxed = boxed;       // Unboxing: Integer → int
```

🎯 QA İçin Not: Web sayfasından çekilen değerler her zaman String olarak gelir. Sayısal karşılaştırma yapılacaksa parse etmek gerekir:

```java
// Selenium'dan gelen değer
String priceText = driver.findElement(By.id("price")).getText(); // "₺ 299"
String numericOnly = priceText.replaceAll("[^0-9.]", ""); // "299"
double price = Double.parseDouble(numericOnly);
assertTrue(price > 100, "Fiyat 100'den büyük olmalı");
```

**Section 10.6: Bellek Tüketimi**

```java
// İlkel tipler (stack) — daha hızlı, daha az bellek
int i = 5;     // 4 byte
double d = 5.0; // 8 byte

// Wrapper sınıflar (heap) — daha yavaş, daha fazla bellek, ama null olabilir
Integer iObj = 5;   // ~16 byte (nesne header: 8 byte, değer: 4 byte, hizalama: 4 byte)
Double dObj = 5.0;  // ~24 byte

// Ne zaman Wrapper kullanmalısınız?
// 1. null değere ihtiyaç duyduğunuzda
Integer optional = null; // Henüz bilinmiyor
// 2. Collection'lara ekleyeceğinizde (generics ilkel tipi kabul etmez)
List<Integer> numbers = new ArrayList<>();
numbers.add(5); // Autoboxing: int → Integer
// 3. Utility metodlara ihtiyaç duyduğunuzda
Integer.parseInt("42");
Integer.MAX_VALUE;
Integer.toBinaryString(42);
```

💡 Yorum: Autoboxing gizli bir performans tuzağı olabilir. Bir döngüde milyonlarca kez Integer/Double nesnesi oluşturmak GC baskısı yaratır. Performans kritik döngülerde int/double kullanın:

```java
// Yavaş (autoboxing var):
Long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i; // Her adımda unbox + box!
}

// Hızlı (primitive):
long sum = 0L;
for (long i = 0; i < 1_000_000; i++) {
    sum += i; // Doğrudan primitive işlem
}
```

**Section 10.7: double**

```java
double d1 = 3.14;
double d2 = 3.14d;  // d son eki isteğe bağlı

// Özel değerler
double posInf = 1.0 / 0.0;          // Positive Infinity
double negInf = -1.0 / 0.0;         // Negative Infinity
double nan = 0.0 / 0.0;             // NaN (Not a Number)
double maxVal = Double.MAX_VALUE;    // ~1.8 × 10^308
double minPos = Double.MIN_VALUE;    // ~5 × 10^-324 (pozitif en küçük)

// NaN kendi kendisiyle eşit DEĞİLDİR!
System.out.println(nan == nan);          // false (!)
System.out.println(Double.isNaN(nan));   // true
System.out.println(Double.isInfinite(posInf)); // true

// Karşılaştırma
System.out.println(posInf > 1_000_000);  // true
System.out.println(negInf < -1_000_000); // true
System.out.println(posInf + negInf);     // NaN (sonsuz - sonsuz = tanımsız)
```

⚠️ NaN Tuzağı: Herhangi bir sayıyla NaN karşılaştırmak **false** döner. `if (value == Double.NaN)` her zaman false'dır! Her zaman `Double.isNaN(value)` kullanın.

**Section 10.8: long**

```java
long population = 7_800_000_000L;     // L son eki zorunlu
long maxLong = Long.MAX_VALUE;         // 9,223,372,036,854,775,807
long millisSinceEpoch = System.currentTimeMillis(); // ~1.7 × 10^12
long nanoTime = System.nanoTime();     // Performans ölçümü için

// int ile long aritmetiği
int seconds = 86400;  // Bir gündeki saniye
long nanos = (long) seconds * 1_000_000_000L; // Önce long'a cast!
// long nanos = seconds * 1_000_000_000; // YANLIŞ: int overflow (L son eki yok)
```

🎯 QA İçin Not: Test performansı ölçmek için `System.nanoTime()` kullanın:

```java
long start = System.nanoTime();
driver.findElement(By.id("submit")).click();
long end = System.nanoTime();
double elapsedMs = (end - start) / 1_000_000.0;
System.out.printf("Click süresi: %.2f ms%n", elapsedMs);
assertTrue(elapsedMs < 2000, "Tıklama 2 saniyeden uzun sürdü");
```

**Section 10.9: boolean**

```java
boolean isLoggedIn = true;
boolean hasError = false;

// Mantıksal operatörler
boolean and = isLoggedIn && !hasError;   // true AND true = true
boolean or  = isLoggedIn || hasError;    // true OR false = true
boolean not = !isLoggedIn;              // NOT true = false

// Kısa-devre (short-circuit) değerlendirme
String name = null;
// name.length() > 0 → NPE olur, ama && kısa devre yaptar:
if (name != null && name.length() > 0) {
    System.out.println("İsim: " + name);
}

// Benzer şekilde || kısa devre:
boolean valid = name == null || name.isEmpty();
// name null ise ikinci koşul değerlendirilmez
```

💡 Yorum: Kısa-devre değerlendirme (`&&` ve `||`) Java'da oldukça önemlidir. Null kontrolünü önce yaparsanız, null olan nesne üzerinde metot çağrısından kaçınırsınız. Bu pattern Selenium testlerinde sıkça kullanılır:

```java
// Element sayfada var mı ve görünür mü?
boolean isVisible = !driver.findElements(By.id("banner")).isEmpty()
                    && driver.findElement(By.id("banner")).isDisplayed();
```

**Section 10.10: byte**

```java
byte b1 = 127;    // Maks değer
byte b2 = -128;   // Min değer

// Veri akışlarında kullanım
byte[] buffer = new byte[8192]; // 8KB buffer (dosya okuma)
int bytesRead = inputStream.read(buffer);

// İkili işlemler
byte flags = 0b0000_0000;
byte READ_PERMISSION  = 0b0000_0100; // Bit 2
byte WRITE_PERMISSION = 0b0000_0010; // Bit 1
byte EXEC_PERMISSION  = 0b0000_0001; // Bit 0

flags |= READ_PERMISSION;  // READ'i set et
flags |= WRITE_PERMISSION; // WRITE'ı set et
boolean canRead  = (flags & READ_PERMISSION) != 0;  // true
boolean canExec  = (flags & EXEC_PERMISSION) != 0;  // false
```

💡 Yorum: `byte` tipi en çok dosya I/O, network soketi ve binary protokollerde kullanılır. Bir Selenium testi sırasında ekran görüntüsü almak da byte array döndürür:

```java
byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
Files.write(Path.of("screenshot.png"), screenshot);
```

**Section 10.11: İkiye Tümleyen (Two's Complement)**

Java işaretli tamsayılarda negatif sayıları iki'nin tümleyeni ile temsil eder:

```java
byte pos = 1;    // İkili: 0000 0001
byte neg = -1;   // İkili: 1111 1111 (iki'nin tümleyeni)
byte min = -128; // İkili: 1000 0000

// Bit kaydırma ile bölme ve çarpma (int'e yükseltilir)
int n = 8;
System.out.println(n >> 1);  // 4  (sağa kaydırma = 2'ye bölme)
System.out.println(n << 1);  // 16 (sola kaydırma = 2 ile çarpma)
System.out.println(n >>> 1); // 4  (işaretsiz sağa kaydırma)
System.out.println(-1 >>> 0); // 2147483647 (işaretli int'ten işaretsiz)
```

💡 Yorum: İkiye tümleyen sayesinde toplama devresi hem pozitif hem negatif sayılar için aynı çalışır. CPU'nun ekstra bir "çıkarma" devresi olmasına gerek kalmaz. Bu, modern bilgisayar mimarisinin temel taşlarından biridir.

**Section 10.12: short**

```java
short s = 32767;   // Maks değer
short min = -32768; // Min değer

// Günümüzde nadiren kullanılır; büyük array'lerde bellek tasarrufu sağlar
short[] largeArray = new short[1_000_000]; // int[]'den 2x daha az bellek (4MB vs 2MB)

// Dikkat: short aritmetiği int'e yükseltilir
short a = 100, b = 200;
// short c = a + b; // DERLEME HATASI: int'i short'a atayamazsınız
short c = (short)(a + b); // Açık cast gerekli
```

**Chapter 11: String'ler (Metinler)**

**Section 11.1: String'leri Karşılaştırma**

String'leri karşılaştırmanın doğru yolu:

```java
String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

// == referans karşılaştırması yapar (aynı nesne mi?)
System.out.println(s1 == s2);       // true  (String Pool: aynı nesne)
System.out.println(s1 == s3);       // false (s3 yeni nesne, farklı adres)

// .equals() içerik karşılaştırması yapar
System.out.println(s1.equals(s2));  // true
System.out.println(s1.equals(s3));  // true

// Null güvenli karşılaştırma
String input = getUserInput(); // null dönebilir
if ("expected".equals(input)) { } // Güvenli: input null ise false
if (input.equals("expected")) { } // Tehlikeli: input null ise NPE!
```

⚠️ En Sık Yapılan Hata: Java öğrenenlerin en büyük tuzağı `==` ile String karşılaştırmaktır. Test metodlarında `assert str == "beklenen"` yazmak bazen çalışır (String Pool'dan dolayı), bazen çalışmaz. **Her zaman `.equals()` kullanın!**

```java
// JUnit testinde
assertEquals("Beklenen", actualStr);             // Doğru
assertNotEquals("Beklenmemeli", actualStr);       // Doğru
assertTrue("expected".equalsIgnoreCase(actual)); // Büyük/küçük harf duyarsız

// Selenium testinde UI metni doğrulama
String title = driver.getTitle();
assertEquals("Ana Sayfa - Mağaza", title);  // == kullanmayın!
```

**Büyük/küçük harf duyarsız karşılaştırma:**

```java
String a = "MERHABA";
String b = "merhaba";

System.out.println(a.equals(b));           // false
System.out.println(a.equalsIgnoreCase(b)); // true

// Locale'e dikkat (Türkçe'de I/İ sorunu)
String tr1 = "istanbul";
String tr2 = "İSTANBUL";
System.out.println(tr1.equalsIgnoreCase(tr2)); // true (çoğu JVM'de)
// Ama Türkçe locale ile kesin sonuç için:
System.out.println(tr1.toUpperCase(new Locale("tr","TR"))
                      .equals(tr2)); // true (güvenli yol)
```

**Sıralama için karşılaştırma:**

```java
String a = "elma";
String b = "armut";

int cmp = a.compareTo(b);
// Negatif: a, b'den önce gelir (alfabetik sırada)
// Sıfır: eşit
// Pozitif: a, b'den sonra gelir

List<String> fruits = Arrays.asList("Üzüm", "Elma", "Armut", "Çilek");
fruits.sort(Collator.getInstance(new Locale("tr","TR"))); // Türkçe sıralama
System.out.println(fruits); // [Armut, Çilek, Elma, Üzüm]
```

💡 Yorum: Türkçe karakter sıralaması için `Collator.getInstance(Locale)` kullanmak gerekir. Normal `compareTo` Türkçe karakterleri (ğ, ş, ı, ö, ü, ç) yanlış sıralayabilir.

**Section 11.2: Büyük/Küçük Harf Dönüşümleri**

```java
String mixed = "Merhaba Dünya! 123";

String upper = mixed.toUpperCase(); // "MERHABA DÜNYA! 123"
String lower = mixed.toLowerCase(); // "merhaba dünya! 123"

// Türkçe için locale belirtin
Locale tr = new Locale("tr", "TR");
String trUpper = "istanbul".toUpperCase(tr); // "İSTANBUL" (İ ile)
String trLower = "İSTANBUL".toLowerCase(tr); // "istanbul" (i ile)

// İlk harfi büyük, geri kalanı küçük
String name = "MEHMET";
String proper = name.charAt(0) + name.substring(1).toLowerCase();
// "Mehmet"

// Java 11+: isBlank() ve strip()
"   ".isBlank();  // true (sadece boşluklar)
"  Hi  ".strip(); // "Hi" (Unicode whitespace dahil)
```

🎯 QA Tüyo: UI testlerinde içerik doğrulaması yaparken büyük/küçük harf farkını görmezden gelmek isteyebilirsiniz:

```java
String displayed = driver.findElement(By.tagName("h1")).getText();
// "Hoş GEldiNiz!" gibi tutarsız büyük harf kullanımı olabilir
assertTrue(displayed.equalsIgnoreCase("HOŞ GELDİNİZ"),
           "Başlık yanlış: " + displayed);
```

**Section 11.3: String İçinde Arama**

```java
String text = "Java ile test otomasyonu öğreniyorum";

// contains: var mı / yok mu
System.out.println(text.contains("test"));      // true
System.out.println(text.contains("selenium"));  // false

// indexOf: ilk konum (-1 = bulunamadı)
System.out.println(text.indexOf("test"));  // 10
System.out.println(text.indexOf("Java"));  // 0
System.out.println(text.indexOf("xyz"));   // -1

// indexOf(str, fromIndex): belirli konumdan itibaren ara
System.out.println(text.indexOf("o", 5)); // "ile" içindeki o

// startsWith / endsWith
System.out.println(text.startsWith("Java")); // true
System.out.println(text.endsWith("rum"));    // true

// Regex ile arama
boolean hasNumber = "abc123".matches(".*\\d+.*"); // true
boolean allDigits = "12345".matches("\\d+");       // true
```

💡 Yorum: `contains`, `indexOf`, `startsWith`, `endsWith` metodları regex kullanmaz — saf String karşılaştırması yapar. Bu onları `matches()` ve `Pattern`'den çok daha hızlı kılar. Basit aramalar için her zaman bu metodları tercih edin.

🎯 QA İçin Gerçek Kullanım: Hata mesajı doğrulaması:

```java
String errorMsg = driver.findElement(By.className("error")).getText();

// Kesin eşleşme (kırılgan):
assertEquals("Kullanıcı adı hatalı", errorMsg);

// Esnek eşleşme (daha sağlam):
assertTrue(errorMsg.contains("hatalı"), "Hata mesajı 'hatalı' içermeli: " + errorMsg);
assertTrue(errorMsg.toLowerCase().contains("kullanıcı"), "Kullanıcı adına atıf yapılmalı");
```

**Section 11.4: String Pool**

```java
String a = "merhaba";   // String Pool'a eklenir
String b = "merhaba";   // Pool'dan alınır (aynı nesne)
String c = new String("merhaba"); // Yeni heap nesnesi (Pool dışı)

System.out.println(a == b);       // true  (aynı pool nesnesi)
System.out.println(a == c);       // false (farklı heap konumu)
System.out.println(a.equals(c));  // true  (aynı içerik)

// intern() ile pool'a zorla
String d = new String("merhaba").intern();
System.out.println(a == d); // true (artık pool nesnesi)
```

💡 Yorum: String Pool, JVM'nin otomatik yaptığı bir optimizasyondur. Aynı String literalini kodunuzda 100 kez yazarsanız, sadece 1 nesne oluşturulur. Bu, belleği önemli ölçüde korur. Ama bu optimizasyon sadece literal'lar için geçerlidir — `new String()` ile oluşturulan nesneler her zaman pool dışında yeni bir nesne yaratır.

**Section 11.5: String'i Bölme**

```java
// Temel split
String csv = "elma,armut,kiraz,üzüm";
String[] meyveler = csv.split(",");
// ["elma", "armut", "kiraz", "üzüm"]

// Limit ile (en fazla N parça)
String[] ilkIki = csv.split(",", 2);
// ["elma", "armut,kiraz,üzüm"]

// Boşluğa göre (regex ile)
String cumle = "Java   test   otomasyon";
String[] kelimeler = cumle.split("\\s+"); // \\s+ = bir veya daha fazla boşluk
// ["Java", "test", "otomasyon"]

// Nokta ile (REGEX TUZAĞI!)
String versiyon = "8.0.292";
// String[] yanlis = versiyon.split("."); // Tüm karakterleri böler! (. = her karakter)
String[] dogru = versiyon.split("\\."); // Kaçış gerekli: \\. = gerçek nokta
// ["8", "0", "292"]
```

⚠️ Regex Tuzağı: `split(".")` beklediğiniz gibi nokta'dan bölmez — regex'te `.` "herhangi bir karakter" anlamına gelir ve tüm string'i boş parçalara böler. Gerçek noktadan bölmek için `split("\\.")` kullanın.

🎯 QA İçin Tablo Verisi Parse Etme:

```java
// Web sayfasından tablo satırı çekip parse etme
String tableRow = "001\tAhmet Yılmaz\t\t(212) 555-0101";
String[] cells = tableRow.split("\t");
String id      = cells[0].trim(); // "001"
String name    = cells[1].trim(); // "Ahmet Yılmaz"
String phone   = cells[3].trim(); // "(212) 555-0101"
```

**Section 11.6: String'leri Birleştirme**

```java
// String.join — Java 8+
String joined = String.join(", ", "Selenium", "Playwright", "Cypress");
// "Selenium, Playwright, Cypress"

// List ile
List<String> tools = List.of("JUnit", "TestNG", "Mockito");
String toolList = String.join(" | ", tools);
// "JUnit | TestNG | Mockito"

// StringJoiner — prefix/suffix desteği
StringJoiner sj = new StringJoiner(", ", "[", "]");
sj.add("Chrome").add("Firefox").add("Safari");
System.out.println(sj); // [Chrome, Firefox, Safari]

// Stream API — dönüşüm + birleştirme
List<String> names = List.of("ahmet", "mehmet", "ayşe");
String result = names.stream()
    .map(s -> s.substring(0,1).toUpperCase() + s.substring(1)) // İlk harf büyük
    .collect(Collectors.joining(", "));
// "Ahmet, Mehmet, Ayşe"

// StringBuilder — çok büyük birleştirmeler için
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10; i++) {
    sb.append("Satır ").append(i).append("\n");
}
String report = sb.toString();
```

💡 Yorum: Döngü içinde `+=` ile String birleştirme yapmak ciddi performans sorununa yol açar:

```java
// KÖTÜ — O(n^2) bellek karmaşıklığı
String result = "";
for (String item : bigList) {
    result += item + ", "; // Her adımda yeni String nesnesi!
}

// İYİ — O(n) amortize karmaşıklığı
StringBuilder sb = new StringBuilder();
for (String item : bigList) {
    sb.append(item).append(", ");
}
String result = sb.toString();
```

**Section 11.7: Uzunluk, Karakter Erişimi ve Alt Dize**

```java
String s = "Merhaba, Dünya!";
//          0123456789...

// Uzunluk
System.out.println(s.length()); // 15

// Karakter erişimi
System.out.println(s.charAt(0));            // 'M'
System.out.println(s.charAt(s.length()-1)); // '!'

// Alt dize
System.out.println(s.substring(9));     // "Dünya!"
System.out.println(s.substring(9, 14)); // "Dünya" (14 dahil değil)

// indexOf ile dinamik substring
int commaIdx = s.indexOf(",");
String greeting = s.substring(0, commaIdx); // "Merhaba"
String target   = s.substring(commaIdx + 2, s.length() - 1); // "Dünya"
```

💡 Yorum: `substring(start, end)` metodunda `end` indeksi **dahil değildir** (exclusive). Bu "yarı açık aralık" (half-open interval) Python'da olduğu gibi çalışır: `s[9:14]`. İndeks hatası yapmak çok kolaydır — özellikle `substring(start, start + length)` kullanırken dikkatli olun.

⚠️ StringIndexOutOfBoundsException: `charAt` veya `substring` çağrısında geçersiz indeks kullanırsanız bu hata fırlatılır. Test verisinde beklenmedik uzunluktaki String'ler bu hataya yol açabilir:

```java
String userInput = ""; // Boş input
// userInput.charAt(0) → StringIndexOutOfBoundsException!

// Güvenli yaklaşım:
if (!userInput.isEmpty()) {
    char first = userInput.charAt(0);
}
```

**Section 11.8: String'i Değiştirme**

String'ler **immutable**'dır — bir kez oluşturulunca değiştirilemez. Her "değiştirme" aslında yeni bir String nesnesi oluşturur:

```java
String original = "Merhaba Dünya";
String replaced  = original.replace("Dünya", "Java"); // Yeni nesne
System.out.println(original); // "Merhaba Dünya" — değişmedi!
System.out.println(replaced); // "Merhaba Java"

// Tek karakter değiştirme
String noSpaces = "Merhaba Dünya".replace(' ', '_'); // "Merhaba_Dünya"

// Regex ile değiştirme
String cleaned = "abc123def456".replaceAll("\\d+", ""); // "abcdef"
String first   = "a1b2c3".replaceFirst("\\d", "X");    // "aXb2c3"

// Whitespace temizleme
String input = "   \t Merhaba   \n  ";
System.out.println(input.trim());   // "Merhaba" (baş-son ASCII whitespace)
System.out.println(input.strip());  // "Merhaba" (Java 11+, Unicode whitespace)
System.out.println(input.stripLeading());  // "Merhaba   \n  " (sadece baştan)
System.out.println(input.stripTrailing()); // "   \t Merhaba" (sadece sondan)
```

💡 Yorum: Immutability (değiştirilemezlik) bir kısıtlama gibi görünse de aslında büyük avantaj sağlar: String'ler thread-safe'dir, HashMap key olarak güvenle kullanılabilir, ve String Pool optimizasyonu mümkün olur. Değiştirilmesi gereken metinler için `StringBuilder` kullanın.

🎯 QA Tüyo: UI'dan gelen metin temizleme ve normalizasyon:

```java
String rawPrice = "  ₺ 1.299,99  ";
String normalized = rawPrice
    .strip()                          // Baş-son boşlukları temizle
    .replace("₺", "")               // Para birimini kaldır
    .strip()                          // Tekrar temizle
    .replace(".", "")                // Binler ayracını kaldır
    .replace(",", ".");              // Ondalık virgülü noktaya çevir
double price = Double.parseDouble(normalized); // 1299.99
```

**Section 11.9: String ↔ char Array**

```java
String str = "merhaba";

// String → char[]
char[] chars = str.toCharArray(); // ['m','e','r','h','a','b','a']

// char[] → String
String back = new String(chars);     // "merhaba"
String back2 = String.valueOf(chars); // "merhaba"

// Karakter bazlı döngü
for (char c : str.toCharArray()) {
    System.out.print(c + " "); // m e r h a b a
}

// Java 8+ IntStream ile
str.chars()
   .filter(c -> c != 'a') // 'a' harflerini filtrele
   .forEach(c -> System.out.print((char) c + " ")); // m e r h b
```

💡 Yorum: `toCharArray()` her çağrıda yeni bir dizi oluşturur. Büyük String'leri sık sık char dizisine dönüştürmek GC baskısı yaratabilir. Sadece okumak için `charAt()` kullanmak daha verimlidir.

**Section 11.10: String Biçimlendirme**

```java
// String.format
String msg = String.format("Merhaba, %s! Bugün %d test çalıştırdın.",
    "Ahmet", 42);
// "Merhaba, Ahmet! Bugün 42 test çalıştırdın."

// Sayı formatları
String pi    = String.format("Pi = %.4f", Math.PI);        // "Pi = 3.1416"
String pct   = String.format("Başarı: %.1f%%", 87.5);      // "Başarı: 87.5%"
String hex   = String.format("Renk: #%06X", 0xFF5733);     // "Renk: #FF5733"
String pad   = String.format("|%-10s|%5d|", "Test", 42);   // "|Test      |   42|"

// Java 15+ formatted() metodu (daha okunabilir)
String report = """
        Test Raporu
        -----------
        Toplam: %d
        Geçen:  %d
        Kalan:  %d
        """.formatted(100, 87, 13);

// System.out.printf (format + println birleşimi)
System.out.printf("%-15s %-10s %s%n", "TestAdı", "Süre(ms)", "Sonuç");
System.out.printf("%-15s %-10d %s%n", "LoginTest", 234, "PASS");
System.out.printf("%-15s %-10d %s%n", "SearchTest", 891, "PASS");
System.out.printf("%-15s %-10d %s%n", "CheckoutTest", 1205, "FAIL");
```

Çıktı:
```
TestAdı         Süre(ms)   Sonuç
LoginTest       234        PASS
SearchTest      891        PASS
CheckoutTest    1205       FAIL
```

🎯 QA İçin Uygulama: Test raporları, log mesajları ve assertion mesajları hazırlarken `String.format` veya `printf` kullanmak hem okunabilirliği artırır hem de hata ayıklamayı kolaylaştırır:

```java
// İyi assertion mesajı
assertEquals(expectedTotal, actualTotal,
    String.format("Sepet toplamı yanlış. Beklenen: %.2f TL, Gerçek: %.2f TL. Test verisi: %s",
        expectedTotal, actualTotal, testData.toString()));
```


**Chapter 12: StringBuffer**

**Section 12.1: StringBuffer ile String Oluşturma ve Değiştirme**

`StringBuffer`, thread-safe (iş parçacığı güvenli) ve değiştirilebilir (mutable) bir karakter dizisi sınıfıdır. `String`'den farklı olarak, her değişiklikte yeni bir nesne oluşturmaz; mevcut nesneyi değiştirir:

```java
StringBuffer sb = new StringBuffer("Hello");
sb.append(", World"); // "Hello, World"
sb.insert(5, " Java"); // "Hello Java, World"
sb.delete(5, 10);      // "Hello, World"
sb.reverse();          // "dlroW ,olleH"
```

**Section 12.2: StringBuffer ile StringBuilder Karşılaştırması**

| Özellik | StringBuffer | StringBuilder |
|---------|-------------|--------------|
| Thread-safety | Evet (synchronized) | Hayır |
| Performans | Daha yavaş | Daha hızlı |
| Kullanım yeri | Çoklu thread ortamı | Tek thread ortamı |

**Chapter 13: StringBuilder**

**Section 13.1: StringBuffer, StringBuilder, Formatter ve StringJoiner Karşılaştırması**

`StringBuilder`, `StringBuffer`'ın thread-safe olmayan versiyonudur ve tek thread uygulamalarında tercih edilir:

```java
StringBuilder sb = new StringBuilder();
sb.append("Test").append(" ").append("Automation");
System.out.println(sb.toString()); // "Test Automation"
```

```java
// StringJoiner ile liste birleştirme
StringJoiner joiner = new StringJoiner(", ", "[", "]");
joiner.add("Chrome").add("Firefox").add("Safari");
System.out.println(joiner.toString()); // "[Chrome, Firefox, Safari]"
```

**Section 13.2: Bir String'i N Kez Tekrarlama**

```java
String repeated = "abc".repeat(3); // Java 11+: "abcabcabc"

// Eski yontem (StringBuilder ile):
String str = "abc";
int n = 3;
StringBuilder sb = new StringBuilder();
for (int i = 0; i < n; i++) {
    sb.append(str);
}
String result = sb.toString(); // "abcabcabc"
```

**Chapter 14: String Tokenizer**

**Section 14.1: StringTokenizer ile Bosluga Gore Ayirma**

`StringTokenizer`, bir String'i belirli bir ayirac kullanarak parcalara boler:

```java
StringTokenizer tokenizer = new StringTokenizer("Java Python TypeScript");
while (tokenizer.hasMoreTokens()) {
    System.out.println(tokenizer.nextToken());
}
// Cikti: Java / Python / TypeScript
```

**Section 14.2: StringTokenizer ile Virgule Gore Ayirma**

```java
StringTokenizer tokenizer = new StringTokenizer("Chrome,Firefox,Edge", ",");
while (tokenizer.hasMoreTokens()) {
    System.out.println(tokenizer.nextToken());
}
```

**Chapter 15: Bir String'i Sabit Uzunluklu Parcalara Bolme**

**Section 15.1: Sabit Uzunlukta Parcalara Bolme**

```java
String str = "HelloWorldJava";
int chunkSize = 5;
List<String> chunks = new ArrayList<>();
for (int i = 0; i < str.length(); i += chunkSize) {
    chunks.add(str.substring(i, Math.min(i + chunkSize, str.length())));
}
// ["Hello", "World", "Java"]
```

**Section 15.2: Degisken Uzunlukta Parcalara Bolme**

```java
String data = "key1=value1&key2=value2&key3=value3";
String[] pairs = data.split("&");
for (String pair : pairs) {
    String[] kv = pair.split("=");
    System.out.println("Key: " + kv[0] + ", Value: " + kv[1]);
}
```

**Chapter 16: StringJoiner**

**Section 16.1: StringJoiner ile Degerleri Birlestirme**

Java 8 ile gelen `StringJoiner`, elemanlari belirtilen ayirac, prefix ve suffix ile bilestirir:

```java
StringJoiner sj = new StringJoiner(" | ", "{", "}");
sj.add("Selenium").add("Playwright").add("Cypress");
System.out.println(sj); // {Selenium | Playwright | Cypress}
```

**Section 16.2: Stream ile StringJoiner Kullanimi**

```java
List<String> tools = Arrays.asList("JMeter", "Postman", "RestAssured");
String result = tools.stream().collect(Collectors.joining(", ", "[", "]"));
System.out.println(result); // [JMeter, Postman, RestAssured]
```

**Chapter 17: Tarih ve Zaman (java.time.*)**

**Section 17.1: Tarih Nesneleri Olusturma**

Java 8 ile gelen `java.time` paketindeki siniflar, eski `java.util.Date` yerine tercih edilir:

```java
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.JUNE, 15);
LocalDateTime now = LocalDateTime.now();
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Europe/Istanbul"));
```

**Section 17.2: Tarih Formatlama ve Ayristirma**

```java
LocalDate date = LocalDate.of(2024, 6, 15);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String formatted = date.format(fmt);   // "15/06/2024"
LocalDate parsed = LocalDate.parse("15/06/2024", fmt);
```

**Section 17.3: Tarih Hesaplamalari**

```java
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusWeeks(1);
LocalDate lastMonth = today.minusMonths(1);
long daysBetween = ChronoUnit.DAYS.between(today, nextWeek); // 7
```

**Section 17.4: Zaman Dilimleri (Time Zones)**

```java
ZoneId istanbul = ZoneId.of("Europe/Istanbul");
ZonedDateTime istanbulTime = ZonedDateTime.now(istanbul);
ZonedDateTime utcTime = istanbulTime.withZoneSameInstant(ZoneOffset.UTC);
```

**Section 17.5: Sure (Duration) ve Periyot (Period)**

```java
Duration oneHour = Duration.ofHours(1);
Period twoMonths = Period.ofMonths(2);
LocalDate start = LocalDate.of(2024, 1, 1);
LocalDate end = start.plus(twoMonths); // 2024-03-01
```

**Chapter 18: LocalTime**

**Section 18.1: LocalTime ile Zaman Olusturma ve Karsilastirma**

```java
LocalTime now = LocalTime.now();
LocalTime testStart = LocalTime.of(9, 30, 0); // 09:30:00
LocalTime testEnd = testStart.plusHours(2);    // 11:30:00
boolean isBefore = testStart.isBefore(testEnd); // true
long minutesBetween = ChronoUnit.MINUTES.between(testStart, testEnd); // 120
```

**Section 18.2: LocalTime Formatlama**

```java
LocalTime time = LocalTime.of(14, 30, 45);
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm:ss");
String formatted = time.format(fmt); // "14:30:45"
```

**Chapter 19: BigDecimal**

**Section 19.1: BigDecimal Olusturma**

`BigDecimal`, hassas ondalikli hesaplamalar icin kullanilir. Ozellikle finansal uygulamalarda `double` yerine tercih edilir:

```java
BigDecimal price = new BigDecimal("19.99");
BigDecimal tax = new BigDecimal("0.18");
BigDecimal total = price.multiply(tax).add(price);
```

**Section 19.2: Yuvarlama ve Olceklendirme**

```java
BigDecimal value = new BigDecimal("3.14159265");
BigDecimal rounded = value.setScale(2, RoundingMode.HALF_UP); // 3.14
BigDecimal rounded2 = value.setScale(4, RoundingMode.FLOOR);  // 3.1415
```

**Section 19.3: BigDecimal Karsilastirmasi**

```java
BigDecimal a = new BigDecimal("1.0");
BigDecimal b = new BigDecimal("1.00");
// .equals() olcek farkini kontrol eder: false
System.out.println(a.equals(b));
// .compareTo() sadece degeri karsilastirir: 0 (esit)
System.out.println(a.compareTo(b)); // 0
```

**Chapter 20: BigInteger**

**Section 20.1: BigInteger ile Cok Buyuk Tam Sayilar**

```java
BigInteger factorial = BigInteger.ONE;
for (int i = 2; i <= 50; i++) {
    factorial = factorial.multiply(BigInteger.valueOf(i));
}
System.out.println(factorial); // 50! hesabi
```

**Section 20.2: BigInteger Aritmetigi**

```java
BigInteger a = new BigInteger("999999999999999999");
BigInteger b = new BigInteger("111111111111111111");
System.out.println(a.add(b));
System.out.println(a.subtract(b));
System.out.println(a.multiply(b));
System.out.println(a.divide(b));
System.out.println(a.gcd(b));
```

**Chapter 21: NumberFormat**

**Section 21.1: Sayilari Formatlama**

```java
NumberFormat nf = NumberFormat.getInstance(Locale.GERMANY);
String formatted = nf.format(1234567.89); // "1.234.567,89"

NumberFormat currency = NumberFormat.getCurrencyInstance(Locale.US);
String price = currency.format(9.99); // "$9.99"
```

**Section 21.2: Yuzde Formatlama**

```java
NumberFormat percent = NumberFormat.getPercentInstance();
percent.setMaximumFractionDigits(2);
String result = percent.format(0.85); // "85%"
```

**Chapter 22: Math Sinifi**

**Section 22.1: Temel Matematik Fonksiyonlari**

```java
Math.abs(-5);        // 5
Math.pow(2, 10);     // 1024.0
Math.sqrt(16);       // 4.0
Math.ceil(4.2);      // 5.0
Math.floor(4.9);     // 4.0
Math.round(4.5);     // 5
Math.max(10, 20);    // 20
Math.min(10, 20);    // 10
Math.random();       // 0.0 ile 1.0 arasinda rastgele double
```

**Chapter 23: Operatorler**

**Section 23.1: Aritmetik Operatorler**

```java
int a = 10, b = 3;
System.out.println(a + b);  // 13
System.out.println(a - b);  // 7
System.out.println(a * b);  // 30
System.out.println(a / b);  // 3
System.out.println(a % b);  // 1
```

**Section 23.2: Karsilastirma Operatorleri**

```java
int x = 5;
System.out.println(x == 5);  // true
System.out.println(x != 5);  // false
System.out.println(x > 3);   // true
System.out.println(x < 3);   // false
```

**Section 23.3: Mantiksal Operatorler**

```java
boolean a = true, b = false;
System.out.println(a && b); // false (AND)
System.out.println(a || b); // true  (OR)
System.out.println(!a);     // false (NOT)
```

**Section 23.6: Uclu Operator (Ternary)**

```java
int a = 5, b = 10;
int max = (a > b) ? a : b;
String status = (a > 0) ? "pozitif" : "negatif veya sifir";
```

**Chapter 24: Koleksiyonlar (Collections)**

**Section 24.1: Collection Mimarisine Giris**

Java Collections Framework veri yaplarini yonetmek icin bir arayz hiyerarsisi sunar: List, Set, Queue ve Map ana kategorilerdir.

**Section 24.2: Temel Collection Kullanimi**

```java
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
list.add("d");
list.remove("b");
System.out.println(list.size()); // 3
System.out.println(list.contains("a")); // true
```

**Section 24.3: Collections Sinifinin Yardimci Metotlari**

```java
List<Integer> numbers = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5));
Collections.sort(numbers);
Collections.reverse(numbers);
Collections.shuffle(numbers);
int max = Collections.max(numbers);
int min = Collections.min(numbers);
```

**Chapter 25: Listeler (Lists)**

**Section 25.1: ArrayList**

`ArrayList`, dinamik boyutlu dizi tabanli bir listedir:

```java
ArrayList<String> browsers = new ArrayList<>();
browsers.add("Chrome");
browsers.add("Firefox");
browsers.add(1, "Edge");
System.out.println(browsers.get(0)); // Chrome
```

**Section 25.2: LinkedList**

`LinkedList`, cift yonlu bagli liste yapisidir:

```java
LinkedList<String> queue = new LinkedList<>();
queue.addFirst("first");
queue.addLast("last");
String first = queue.removeFirst();
```

**Section 25.3: List'i Kopyalama ve Donusturme**

```java
List<String> original = Arrays.asList("a", "b", "c");
List<String> copy = new ArrayList<>(original);
String[] arr = copy.toArray(new String[0]);
List<String> fromArr = new ArrayList<>(Arrays.asList(arr));
```

**Section 25.4: List Siralama**

```java
List<String> names = new ArrayList<>(Arrays.asList("Zeynep", "Ali", "Mehmet"));
Collections.sort(names);
names.sort(Comparator.reverseOrder());
names.sort(Comparator.comparingInt(String::length));
```

**Chapter 26: Kumeler (Sets)**

**Section 26.1: HashSet**

`HashSet`, benzersiz elemanlari siralanmamis olarak tutar:

```java
Set<String> testTypes = new HashSet<>();
testTypes.add("Unit");
testTypes.add("Integration");
testTypes.add("E2E");
testTypes.add("Unit"); // Tekrar ekleme - gormezden gelinir
System.out.println(testTypes.size()); // 3
```

**Section 26.2: LinkedHashSet**

`LinkedHashSet`, ekleme sirasi korunan benzersiz elemanlar icin kullanilir:

```java
Set<String> ordered = new LinkedHashSet<>();
ordered.add("Selenium");
ordered.add("Playwright");
ordered.add("Cypress");
```

**Section 26.3: TreeSet**

`TreeSet`, elemanlari sirali tutar:

```java
TreeSet<String> sorted = new TreeSet<>();
sorted.add("Zebra");
sorted.add("Apple");
sorted.add("Mango");
System.out.println(sorted.first()); // Apple
System.out.println(sorted.last());  // Zebra
```

**Section 26.4: Set Islemleri**

```java
Set<String> setA = new HashSet<>(Arrays.asList("a", "b", "c"));
Set<String> setB = new HashSet<>(Arrays.asList("b", "c", "d"));

Set<String> union = new HashSet<>(setA);
union.addAll(setB);          // Birlesim: {a, b, c, d}

Set<String> intersection = new HashSet<>(setA);
intersection.retainAll(setB); // Kesisim: {b, c}

Set<String> difference = new HashSet<>(setA);
difference.removeAll(setB);   // Fark: {a}
```

**Chapter 27: List ve Set Karsilastirmasi**

**Section 27.1: List ve Set Arasindaki Temel Farklar**

List tekrar eden elemanlara izin verirken, Set benzersizligi zorunlu kilar:

```java
List<Integer> list = Arrays.asList(1, 1, 2, 3);
System.out.println(list.size()); // 4 (tekrarlar tutulur)

Set<Integer> set = new HashSet<>(list);
System.out.println(set.size());  // 3 (tekrarlar kaldirilir)
```

**Chapter 28: Map**

**Section 28.1: Map Giris Noktalarini Etkin Itere Etme**

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Ali", 95);
scores.put("Veli", 87);
scores.put("Ayse", 92);

for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
scores.forEach((key, value) -> System.out.println(key + ": " + value));
```

**Section 28.2: HashMap Kullanimi**

```java
Map<String, String> config = new HashMap<>();
config.put("browser", "chrome");
config.put("url", "https://example.com");

String browser = config.get("browser");
String env = config.getOrDefault("env", "test");
config.putIfAbsent("browser", "firefox"); // Zaten var, degismez
```

**Section 28.3: Map'i Siralama**

```java
Map<String, Integer> sortedByKey = new TreeMap<>(scores);

scores.entrySet().stream()
    .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
    .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));
```

**Chapter 29: LinkedHashMap**

**Section 29.1: LinkedHashMap ile Sira Korunan Map**

```java
Map<String, String> env = new LinkedHashMap<>();
env.put("DEV", "http://dev.example.com");
env.put("QA", "http://qa.example.com");
env.put("PROD", "http://prod.example.com");
// Sira korunur: DEV, QA, PROD
```

**Chapter 30: WeakHashMap**

**Section 30.1: WeakHashMap Kavrami**

`WeakHashMap`, anahtarlarini zayif referanslarla (weak reference) tutar. Garbage Collector baska guclu referans yoksa bu anahtarlari temizleyebilir:

```java
WeakHashMap<Object, String> weakMap = new WeakHashMap<>();
Object key = new Object();
weakMap.put(key, "value");
key = null; // Guclu referans kaldirildi
System.gc();
```

**Chapter 31: SortedMap**

**Section 31.1: SortedMap'e Giris**

`SortedMap`, anahtarlarini sirali tutan bir Map arayuzdur. `TreeMap` bu arayuzu uygular:

```java
SortedMap<String, Integer> sortedScores = new TreeMap<>();
sortedScores.put("Zeynep", 90);
sortedScores.put("Ali", 85);
sortedScores.put("Mehmet", 92);
System.out.println(sortedScores.firstKey()); // Ali
System.out.println(sortedScores.lastKey());  // Zeynep
```

**Chapter 32: TreeMap**

**Section 32.1: TreeMap ile Sirali Key-Value Depolama**

```java
TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(3, "uc");
treeMap.put(1, "bir");
treeMap.put(2, "iki");
// {1=bir, 2=iki, 3=uc}
System.out.println(treeMap.floorKey(3));   // 3
System.out.println(treeMap.headMap(3));    // {1=bir, 2=iki}
```


**Chapter 33: Iterator ve ListIterator**

**Section 33.1: Iterator ile Koleksiyon Gezme**

`Iterator`, koleksiyonlar uzerinde ilerlemeye ve guvenli silme islemi yapmaya olanak tanir:

```java
List<String> browsers = new ArrayList<>(Arrays.asList("Chrome", "Firefox", "Edge"));
Iterator<String> it = browsers.iterator();
while (it.hasNext()) {
    String browser = it.next();
    if (browser.equals("Firefox")) {
        it.remove(); // Guvenli silme (ConcurrentModificationException olmaz)
    }
}
```

**Section 33.2: ListIterator ile Cift Yonlu Gezme**

`ListIterator`, List uzerinde ileri ve geri gitmeyi destekler:

```java
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
ListIterator<String> lit = list.listIterator(list.size());
while (lit.hasPrevious()) {
    System.out.print(lit.previous() + " "); // c b a
}
```

**Chapter 34: Iterable ve for-each Dongusu**

**Section 34.1: Iterable Arayuzu**

`Iterable` arayuzunu implement eden herhangi bir sinif, for-each dongusuyle kullanilabilir:

```java
public class NumberRange implements Iterable<Integer> {
    private int start, end;
    public NumberRange(int start, int end) {
        this.start = start; this.end = end;
    }
    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            int current = start;
            public boolean hasNext() { return current <= end; }
            public Integer next() { return current++; }
        };
    }
}

for (int n : new NumberRange(1, 5)) {
    System.out.print(n + " "); // 1 2 3 4 5
}
```

**Chapter 35: Stack (Yigin)**

**Section 35.1: Stack Sinifi**

`Stack`, LIFO (Son Giren, Ilk Cikar) veri yapisini uygular:

```java
Stack<String> stack = new Stack<>();
stack.push("Giris Sayfasi");
stack.push("Urun Listesi");
stack.push("Odeme Sayfasi");

System.out.println(stack.peek()); // "Odeme Sayfasi" (silmeden goster)
System.out.println(stack.pop());  // "Odeme Sayfasi" (cikar ve sil)
System.out.println(stack.size()); // 2
```

**Section 35.2: Deque ile Modern Stack Kullanimi**

`ArrayDeque`, Stack'in daha modern ve performansli alternatifidir:

```java
Deque<String> stack = new ArrayDeque<>();
stack.push("ilk");
stack.push("ikinci");
System.out.println(stack.pop()); // "ikinci" (LIFO)
```

**Chapter 36: EnumMap**

**Section 36.1: EnumMap Kullanimi**

`EnumMap`, Enum tipinde key kullanan ozellestirilmis bir Map implementasyonudur:

```java
enum Browser { CHROME, FIREFOX, EDGE, SAFARI }

Map<Browser, String> driverPaths = new EnumMap<>(Browser.class);
driverPaths.put(Browser.CHROME, "/path/to/chromedriver");
driverPaths.put(Browser.FIREFOX, "/path/to/geckodriver");

String chromePath = driverPaths.get(Browser.CHROME);
```

**Chapter 37: EnumSet**

**Section 37.1: EnumSet Kullanimi**

`EnumSet`, Enum degerlerini tutan yuksek performansli bir Set implementasyonudur:

```java
enum TestLevel { SMOKE, REGRESSION, PERFORMANCE, SECURITY }

Set<TestLevel> criticalTests = EnumSet.of(TestLevel.SMOKE, TestLevel.REGRESSION);
Set<TestLevel> allTests = EnumSet.allOf(TestLevel.class);
Set<TestLevel> nonCritical = EnumSet.complementOf((EnumSet<TestLevel>) criticalTests);
```

**Chapter 38: Rakamla Baslayan Enum**

**Section 38.1: Rakamla Baslayan Enum Tanimi**

Java'da enum isimleri rakamla basLayamaz. Bu durumda, enum sabitinin onune bir harf veya alt cizgi konulabilir:

```java
enum HttpStatus {
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR;
}
```

**Chapter 39: Hashtable**

**Section 39.1: Hashtable Kullanimi**

`Hashtable`, eski (legacy) bir thread-safe Map implementasyonudur. Yeni kodlarda `ConcurrentHashMap` tercih edilir:

```java
Hashtable<String, Integer> table = new Hashtable<>();
table.put("one", 1);
table.put("two", 2);
System.out.println(table.get("one")); // 1
// null key veya null value kabul etmez!
```

**Chapter 40: Queue (Kuyruk)**

**Section 40.1: Queue ile FIFO Veri Yapisi**

`Queue`, FIFO (Ilk Giren, Ilk Cikar) veri yapisini uygular:

```java
Queue<String> testQueue = new LinkedList<>();
testQueue.offer("Test1");
testQueue.offer("Test2");
testQueue.offer("Test3");

System.out.println(testQueue.poll());  // "Test1" (cikar ve sil)
System.out.println(testQueue.peek());  // "Test2" (silmeden goster)
```

**Section 40.2: PriorityQueue ile Oncelikli Kuyruk**

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
while (!pq.isEmpty()) {
    System.out.print(pq.poll() + " "); // 10 20 30 (sirali)
}
```

**Chapter 41: Deque ve ArrayDeque**

**Section 41.1: ArrayDeque Kullanimi**

`ArrayDeque`, hem Queue hem de Stack olarak kullanilabilen cift uclu bir kuyruktur:

```java
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("ilk");
deque.addLast("son");
deque.addFirst("en-ilk");

System.out.println(deque.peekFirst()); // "en-ilk"
System.out.println(deque.peekLast());  // "son"
deque.pollFirst(); // "en-ilk" cikar
deque.pollLast();  // "son" cikar
```

**Chapter 42: Kalitim (Inheritance)**

**Section 42.1: Temel Kalitim**

Kalitim, bir sinifin baska bir sinifin ozelliklerini ve metotlarini devralmasina olanak tanir:

```java
public class Animal {
    private String name;
    public Animal(String name) { this.name = name; }
    public String getName() { return name; }
    public void makeSound() { System.out.println("..."); }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public void makeSound() { System.out.println("Hav hav!"); }
}

Animal myDog = new Dog("Karabas");
myDog.makeSound(); // "Hav hav!" (polimorfizm)
```

**Section 42.2: super Anahtar Kelimesi**

`super` ile ust sinifin metotlarina ve yapici metoduna erisim saglanir:

```java
public class ElectricCar extends Car {
    private int batteryCapacity;
    public ElectricCar(String model, int batteryCapacity) {
        super(model); // Car'in constructor'ini cagir
        this.batteryCapacity = batteryCapacity;
    }
    @Override
    public String describe() {
        return super.describe() + " (Elektrikli, " + batteryCapacity + " kWh)";
    }
}
```

**Section 42.3: final, abstract ve interface Ile Kalitim Kontrolu**

```java
// final sinif: kalitim yapilamaz
public final class String { ... }

// abstract sinif: orneklendirilemez, alt siniflar tamamlar
public abstract class Shape {
    public abstract double area();
    public void printArea() {
        System.out.println("Alan: " + area());
    }
}
```

**Chapter 43: Polimorfizm (Polymorphism)**

**Section 43.1: Runtime Polimorfizm (Method Overriding)**

Ayni metot imzasina sahip farkli davranis:

```java
List<Animal> animals = Arrays.asList(new Dog("Rex"), new Cat("Whiskers"));
for (Animal a : animals) {
    a.makeSound(); // Her hayvan kendi sesini cikarir
}
```

**Section 43.2: Compile-time Polimorfizm (Method Overloading)**

Ayni isimde, farkli parametreli metotlar:

```java
public class Calculator {
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
    public int add(int a, int b, int c) { return a + b + c; }
}
```

**Chapter 44: Degistirilemez Sinif (Immutable Class)**

**Section 44.1: Immutable Sinif Ornegi**

Bir immutable sinif olusturmak icin:

```java
public final class ImmutableConfig {
    private final String browser;
    private final String url;
    private final int timeout;
    
    public ImmutableConfig(String browser, String url, int timeout) {
        this.browser = browser;
        this.url = url;
        this.timeout = timeout;
    }
    
    public String getBrowser() { return browser; }
    public String getUrl() { return url; }
    public int getTimeout() { return timeout; }
    // setter metotlari yok!
}
```

**Section 44.2: Immutability'nin Avantajlari**

Immutable nesneler thread-safe'dir ve cache'lenebilir. String sinifi Java'da immutable'in en iyi orneklerinden biridir.

**Chapter 45: Degistirilemez Nesneler (Immutable Objects)**

**Section 45.1: Immutable Object Kullanim Ornekleri**

Java'da bircok yerlesik sinif immutable'dir: `String`, `Integer`, `LocalDate`, `BigDecimal`.

```java
String s = "hello";
String upper = s.toUpperCase(); // Yeni nesne, s degismez
LocalDate date = LocalDate.of(2024, 1, 1);
LocalDate next = date.plusDays(1); // Yeni nesne, date degismez
```

**Chapter 46: Erisim Belirteçleri (Visibility / Access Modifiers)**

**Section 46.1: Erisim Belirteçleri Tablosu**

| Belirtec | Sinif ici | Paket ici | Alt sinif | Her yerden |
|----------|-----------|-----------|-----------|------------|
| `private` | Evet | Hayir | Hayir | Hayir |
| (default) | Evet | Evet | Hayir | Hayir |
| `protected` | Evet | Evet | Evet | Hayir |
| `public` | Evet | Evet | Evet | Evet |

```java
public class BankAccount {
    private double balance;         // Sadece bu siniftan
    protected String ownerName;     // Alt siniflar da erisebilir
    public String accountNumber;    // Herkes erisebilir
    String branch;                  // Ayni paketten erisebilir
}
```

**Chapter 47: Generics (Jenerikler)**

**Section 47.1: Generic Sinif**

```java
public class Pair<K, V> {
    private K key;
    private V value;
    
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    
    public K getKey() { return key; }
    public V getValue() { return value; }
}

Pair<String, Integer> pair = new Pair<>("age", 30);
```

**Section 47.2: Generic Metot**

```java
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

int maxInt = max(10, 20);       // 20
String maxStr = max("ali", "veli"); // "veli"
```

**Section 47.3: Wildcard Kullanimi**

```java
// Upper bounded wildcard
public double sumList(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}

// Lower bounded wildcard
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
```

**Chapter 48: Siniflar ve Nesneler (Classes and Objects)**

**Section 48.1: Sinif Anatomisi**

```java
public class TestCase {
    // Alan (field)
    private String name;
    private boolean passed;
    
    // Statik alan
    private static int totalCount = 0;
    
    // Constructor
    public TestCase(String name) {
        this.name = name;
        totalCount++;
    }
    
    // Metot
    public void run() {
        System.out.println("Calistiriliyor: " + name);
    }
    
    // Statik metot
    public static int getTotalCount() { return totalCount; }
    
    // toString override
    @Override
    public String toString() {
        return "TestCase{name='" + name + "', passed=" + passed + "}";
    }
}
```

**Section 48.2: Object Sinifi Metotlari**

```java
// equals() override
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof TestCase)) return false;
    TestCase tc = (TestCase) o;
    return Objects.equals(name, tc.name);
}

// hashCode() override
@Override
public int hashCode() {
    return Objects.hash(name);
}
```

**Chapter 49: Yerel Ic Sinif (Local Inner Class)**

**Section 49.1: Yerel ic Sinif Tanimlama**

```java
public void processData() {
    class DataProcessor {
        String process(String data) {
            return data.trim().toLowerCase();
        }
    }
    DataProcessor dp = new DataProcessor();
    String result = dp.process("  Hello World  ");
}
```

**Chapter 50: Ic Siniflar (Inner Classes)**

**Section 50.1: Static Ic Sinif (Static Nested Class)**

```java
public class Database {
    private String url;
    
    public static class Builder {
        private String url;
        
        public Builder url(String url) {
            this.url = url;
            return this;
        }
        
        public Database build() {
            Database db = new Database();
            db.url = this.url;
            return db;
        }
    }
}

Database db = new Database.Builder()
    .url("jdbc:mysql://localhost:3306/test")
    .build();
```

**Section 50.2: Anonim Ic Sinif (Anonymous Inner Class)**

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Test calisiyor...");
    }
};
new Thread(r).start();

// Lambda ile daha kisa yol (Java 8+)
Runnable r2 = () -> System.out.println("Test calisiyor...");
```


**Chapter 51: java.util.Objects Sinifi**

**Section 51.1: Objects Sinifi ile Null Kontrolu**

`Objects` sinifi, null-safe yardimci metotlar sunar:

```java
String name = null;
System.out.println(Objects.isNull(name));    // true
System.out.println(Objects.nonNull(name));   // false

// Null kontrolu ile hata firlatma
String validated = Objects.requireNonNull(name, "Name cannot be null");

// Null-safe toString
String str = Objects.toString(name, "default"); // "default"
```

**Section 51.2: Stream API ile Objects.nonNull Kullanimi**

```java
List<String> list = Arrays.asList("Chrome", null, "Firefox", null, "Edge");
long nonNullCount = list.stream()
    .filter(Objects::nonNull)
    .count(); // 3
```

**Chapter 52: Default Metotlar (Default Methods)**

**Section 52.1: Interface'de Default Metot**

Java 8 ile interface'lere somut metot implementasyonu eklenebilir:

```java
public interface Logger {
    void log(String message);
    
    default void logInfo(String message) {
        log("[INFO] " + message);
    }
    
    default void logError(String message) {
        log("[ERROR] " + message);
    }
}

class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println(message);
    }
    // logInfo ve logError otomatik miras alinir
}
```

**Section 52.2: Diamond Problemi ve Cozumu**

```java
interface A {
    default void hello() { System.out.println("Hello from A"); }
}
interface B extends A {
    default void hello() { System.out.println("Hello from B"); }
}
class C implements A, B {
    @Override
    public void hello() {
        B.super.hello(); // Hangi default metodun kullanilacagi belirtilir
    }
}
```

**Chapter 53: Paketler (Packages)**

**Section 53.1: Ayni Isimde Siniflar Icin Package Kullanimi**

```java
package com.qa.selenium.pages;

import com.qa.playwright.pages.LoginPage; // Farkli paket

public class LoginPage { // Ayni isimde sinif, farkli paket
    // Selenium implementasyonu
}
```

**Section 53.2: Package-Protected Erisim**

```java
package com.qa.internal;

class InternalHelper { // package-private (varsayilan erisim)
    static String generateId() {
        return UUID.randomUUID().toString();
    }
}
```

**Chapter 54: Istisna Islemleri (Exception Handling)**

**Section 54.1: try-catch-finally**

```java
public void readFile(String path) {
    FileReader reader = null;
    try {
        reader = new FileReader(path);
        // Dosya okuma islemi
    } catch (FileNotFoundException e) {
        System.err.println("Dosya bulunamadi: " + e.getMessage());
    } catch (IOException e) {
        System.err.println("IO hatasi: " + e.getMessage());
    } finally {
        if (reader != null) {
            try { reader.close(); } catch (IOException e) { }
        }
    }
}
```

**Section 54.2: try-with-resources (Java 7+)**

```java
public void readFile(String path) {
    try (FileReader reader = new FileReader(path);
         BufferedReader br = new BufferedReader(reader)) {
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    } catch (IOException e) {
        System.err.println("Hata: " + e.getMessage());
    }
    // reader ve br otomatik kapatilir
}
```

**Section 54.3: Custom Exception Olusturma**

```java
public class TestFailedException extends RuntimeException {
    private final String testName;
    
    public TestFailedException(String testName, String message) {
        super(message);
        this.testName = testName;
    }
    
    public String getTestName() { return testName; }
}

// Kullanim
throw new TestFailedException("loginTest", "Login butonu bulunamadi");
```

**Section 54.4: Multi-catch (Java 7+)**

```java
try {
    // Kod
} catch (IOException | SQLException e) {
    System.err.println("Veri hatasi: " + e.getMessage());
}
```

**Chapter 55: Referans Tipleri**

**Section 55.1: Farkli Referans Tipleri**

Java'da dort referans turu vardir:

```java
// 1. Strong Reference (Guclu Referans) - varsayilan
Object strong = new Object();

// 2. Weak Reference - GC silebilir
WeakReference<Object> weak = new WeakReference<>(new Object());

// 3. Soft Reference - bellek azalinca GC silebilir (cache icin ideal)
SoftReference<byte[]> soft = new SoftReference<>(new byte[1024 * 1024]);

// 4. Phantom Reference - finalize sonrasi bildiririm icin
ReferenceQueue<Object> queue = new ReferenceQueue<>();
PhantomReference<Object> phantom = new PhantomReference<>(new Object(), queue);
```

**Chapter 56: Java Optionals**

**Section 56.1: Optional ile Null Kacinma**

`Optional`, null degerini guvenli bicimde temsil eden bir sarmalayicidir:

```java
Optional<String> optional = Optional.of("Hello");
Optional<String> empty = Optional.empty();
Optional<String> nullable = Optional.ofNullable(null);

// Deger kontrolu
optional.isPresent();        // true
optional.isEmpty();          // false (Java 11+)
optional.get();              // "Hello"
empty.orElse("default");     // "default"
empty.orElseGet(() -> "computed"); // Lambda ile varsayilan
empty.orElseThrow(() -> new RuntimeException("Bos!"));
```

**Section 56.2: Optional ile Akis Zincirleme**

```java
Optional<String> result = Optional.ofNullable(getUserName())
    .filter(name -> !name.isEmpty())
    .map(String::toUpperCase);
result.ifPresent(name -> System.out.println("Hosgeldin: " + name));
```

**Chapter 57: Java Stream API**

**Section 57.1: Stream Temelleri**

`Stream API`, Java 8 ile gelen fonksiyonel programlama ozellikleridir:

```java
List<String> browsers = Arrays.asList("Chrome", "Firefox", "Edge", "Safari", "Opera");

// Filtreleme + donusturme + toplama
List<String> result = browsers.stream()
    .filter(b -> b.length() > 5)        // Uzunlugu > 5 olanlari sec
    .map(String::toLowerCase)           // Kucuk harfe donustur
    .sorted()                           // Sirala
    .collect(Collectors.toList());      // Listeye topla

// Her birine islem uygula
browsers.stream()
    .filter(b -> b.startsWith("C"))
    .forEach(System.out::println);      // Chrome
```

**Section 57.2: Reduce ve Collect**

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream().reduce(0, Integer::sum); // 15
int product = numbers.stream().reduce(1, (a, b) -> a * b); // 120

// Gruplama
Map<Integer, List<String>> byLength = browsers.stream()
    .collect(Collectors.groupingBy(String::length));

// String birlestirme
String joined = browsers.stream().collect(Collectors.joining(", "));
```

**Section 57.3: Sayisal Stream'ler**

```java
IntStream.range(1, 6).forEach(System.out::println); // 1-5
IntStream.rangeClosed(1, 5).sum();                  // 15

// Liste ile sayisal stream
OptionalInt max = numbers.stream()
    .mapToInt(Integer::intValue)
    .max(); // OptionalInt[5]

double avg = numbers.stream()
    .mapToInt(Integer::intValue)
    .average()
    .orElse(0.0); // 3.0
```

**Chapter 58: InputStream ve OutputStream**

**Section 58.1: Dosya Okuma (InputStream)**

```java
try (InputStream is = new FileInputStream("test-data.txt");
     BufferedInputStream bis = new BufferedInputStream(is)) {
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = bis.read(buffer)) != -1) {
        System.out.write(buffer, 0, bytesRead);
    }
}
```

**Section 58.2: Dosya Yazma (OutputStream)**

```java
try (OutputStream os = new FileOutputStream("output.txt");
     PrintStream ps = new PrintStream(os)) {
    ps.println("Test sonuclari:");
    ps.println("Gecen: 45");
    ps.println("Kalan: 5");
}
```

**Chapter 59: Reader ve Writer**

**Section 59.1: Karakter Tabanli Okuma (Reader)**

```java
try (Reader reader = new FileReader("config.properties");
     BufferedReader br = new BufferedReader(reader)) {
    br.lines().forEach(System.out::println);
}

// Java 11+ Files API
List<String> lines = Files.readAllLines(Path.of("config.properties"));
String content = Files.readString(Path.of("config.properties"));
```

**Section 59.2: Karakter Tabanli Yazma (Writer)**

```java
try (Writer writer = new FileWriter("report.txt");
     BufferedWriter bw = new BufferedWriter(writer)) {
    bw.write("Test Raporu");
    bw.newLine();
    bw.write("Tarih: " + LocalDate.now());
}

// Java 11+ Files API
Files.writeString(Path.of("report.txt"), "Test Raporu\n" + LocalDate.now());
```

**Chapter 60: Preferences (Tercihler)**

**Section 60.1: Java Preferences API**

Uygulama tercihlerini platform bagimsiz olarak saklamak icin:

```java
Preferences prefs = Preferences.userRoot().node("com/qa/tool");
prefs.put("browser", "chrome");
prefs.putInt("timeout", 30);

String browser = prefs.get("browser", "firefox"); // "chrome"
int timeout = prefs.getInt("timeout", 60);         // 30
prefs.remove("browser");
prefs.clear();
```

**Chapter 61: Java Networking (Ag Programlama)**

**Section 61.1: URL ile HTTP Istegi**

```java
URL url = new URL("https://api.example.com/users");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");
conn.setRequestProperty("Accept", "application/json");

int responseCode = conn.getResponseCode();
if (responseCode == 200) {
    try (BufferedReader br = new BufferedReader(
            new InputStreamReader(conn.getInputStream()))) {
        String line;
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null) sb.append(line);
        System.out.println(sb.toString());
    }
}
```

**Section 61.2: Socket Programlama**

```java
// Sunucu
ServerSocket server = new ServerSocket(8080);
Socket client = server.accept();
PrintWriter out = new PrintWriter(client.getOutputStream(), true);
out.println("Merhaba client!");

// Client
Socket socket = new Socket("localhost", 8080);
BufferedReader in = new BufferedReader(
    new InputStreamReader(socket.getInputStream()));
System.out.println(in.readLine()); // "Merhaba client!"
```

**Chapter 62: Serialization (Seriyalestirme)**

**Section 62.1: Serializable Interface**

Bir nesneyi dosyaya kaydetmek veya ag uzerinden gondermek icin:

```java
public class TestResult implements Serializable {
    private static final long serialVersionUID = 1L;
    private String testName;
    private boolean passed;
    
    // constructor, getters, setters
}

// Kaydetme
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("result.ser"))) {
    oos.writeObject(new TestResult("loginTest", true));
}

// Yukleme
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("result.ser"))) {
    TestResult result = (TestResult) ois.readObject();
}
```

**Chapter 63: NIO.2 - Yeni Dosya Sistemi API**

**Section 63.1: Path ve Files API**

```java
Path path = Path.of("src", "test", "resources", "config.json");
System.out.println(path.toAbsolutePath());
System.out.println(path.getFileName());  // config.json
System.out.println(path.getParent());    // src/test/resources

// Dosya islemleri
boolean exists = Files.exists(path);
Files.copy(path, Path.of("config_backup.json"), StandardCopyOption.REPLACE_EXISTING);
Files.move(path, Path.of("new_location/config.json"));
Files.delete(path);

// Dizin olusturma
Files.createDirectories(Path.of("test-reports/screenshots"));
```

**Section 63.2: Dizin Tarama**

```java
// Yuzeysel tarama
try (Stream<Path> files = Files.list(Path.of("src/test"))) {
    files.filter(Files::isRegularFile)
         .forEach(System.out::println);
}

// Derin tarama (recursive)
try (Stream<Path> walk = Files.walk(Path.of("src"))) {
    walk.filter(p -> p.toString().endsWith(".java"))
        .forEach(System.out::println);
}
```

**Chapter 64: Lambda Ifadeleri (Lambda Expressions)**

**Section 64.1: Lambda Temelleri**

Lambda ifadeleri, anonim fonksiyonlari kisa yazmanin yoludur:

```java
// Anonim ic sinif yontemi
Runnable old = new Runnable() {
    @Override
    public void run() { System.out.println("Eski yontem"); }
};

// Lambda ifadesi
Runnable lambda = () -> System.out.println("Lambda yontemi");

// Parametreli
Comparator<String> comp = (a, b) -> a.compareTo(b);

// Cok satirli
Comparator<String> multiLine = (a, b) -> {
    System.out.println("Karsilastiriliyor: " + a + " vs " + b);
    return a.compareTo(b);
};
```

**Section 64.2: Fonksiyonel Arayuzler**

```java
// Predicate<T> - boolean dondurur
Predicate<String> isLong = s -> s.length() > 10;
System.out.println(isLong.test("Hello")); // false

// Function<T, R> - T alir, R dondurur
Function<String, Integer> toLength = String::length;
System.out.println(toLength.apply("Hello")); // 5

// Consumer<T> - T alir, hicbir sey dondurmuez
Consumer<String> printer = System.out::println;
printer.accept("Merhaba!"); // Merhaba!

// Supplier<T> - hicbir sey almaz, T dondurur
Supplier<LocalDate> today = LocalDate::now;
System.out.println(today.get()); // 2024-06-16

// BiFunction<T, U, R>
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
```

**Chapter 65: Method References (Metot Referanslari)**

**Section 65.1: Dort Tur Metot Referansi**

```java
// 1. Statik metot referansi
Function<String, Integer> parseInt = Integer::parseInt;

// 2. Instance metot referansi (belirli nesne)
String str = "hello";
Supplier<String> upper = str::toUpperCase;

// 3. Instance metot referansi (tanimsiz nesne)
Function<String, String> trim = String::trim;
List<String> names = Arrays.asList("  ali  ", "  veli  ");
names.stream().map(String::trim).collect(Collectors.toList());

// 4. Constructor referansi
Supplier<ArrayList<String>> listFactory = ArrayList::new;
ArrayList<String> list = listFactory.get();
```

**Chapter 66: Annotation (Anotasyon)**

**Section 66.1: Yerlesik Anotasyonlar**

```java
@Override          // Ust sinifdaki metodu override ettigini belirtir
@Deprecated        // Kullanimi onerilmeyen metot/sinif
@SuppressWarnings("unchecked") // Derleyici uyarisini bastir
@FunctionalInterface  // Fonksiyonel arayuz oldugunu dogrular

// Ornek
@FunctionalInterface
public interface TestAction {
    void execute() throws Exception;
}
```

**Section 66.2: Custom Anotasyon**

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface TestCategory {
    String value();
    String[] tags() default {};
    boolean enabled() default true;
}

@TestCategory(value = "smoke", tags = {"login", "critical"})
public void testLogin() { ... }
```

**Section 66.3: Reflection ile Anotasyon Okuma**

```java
Method method = TestClass.class.getMethod("testLogin");
TestCategory category = method.getAnnotation(TestCategory.class);
if (category != null && category.enabled()) {
    System.out.println("Kategori: " + category.value());
    System.out.println("Etiketler: " + Arrays.toString(category.tags()));
}
```

**Chapter 67: Interface (Arayuz)**

**Section 67.1: Interface Temelleri**

```java
public interface Testable {
    void setUp();
    void execute();
    void tearDown();
    
    // Sabit
    int MAX_RETRY = 3;
    
    // Default metot
    default void logStart() {
        System.out.println("Test basliyor: " + getClass().getSimpleName());
    }
    
    // Static metot
    static Testable empty() {
        return new Testable() {
            public void setUp() {}
            public void execute() {}
            public void tearDown() {}
        };
    }
}
```

**Section 67.2: Interface vs Abstract Class**

| Ozellik | Interface | Abstract Class |
|---------|-----------|---------------|
| Coklu kalitim | Evet | Hayir |
| Constructor | Hayir | Evet |
| Instance field | Hayir | Evet |
| Erisim belirteci | public (zorunlu) | Herhangi |
| Default metot | Java 8+ | Evet |

**Chapter 68: enum (Sayim Tipi)**

**Section 68.1: Temel enum Kullanimi**

```java
public enum TestEnvironment {
    DEV, QA, STAGING, PRODUCTION;
}

TestEnvironment env = TestEnvironment.QA;
switch (env) {
    case DEV: System.out.println("Development"); break;
    case QA: System.out.println("QA ortami"); break;
    case PRODUCTION: System.out.println("DIKKAT: Production!"); break;
    default: System.out.println("Diger");
}
```

**Section 68.2: Alan ve Metotlu enum**

```java
public enum Browser {
    CHROME("ChromeDriver", 75),
    FIREFOX("GeckoDriver", 60),
    EDGE("EdgeDriver", 80);
    
    private final String driverName;
    private final int maxParallel;
    
    Browser(String driverName, int maxParallel) {
        this.driverName = driverName;
        this.maxParallel = maxParallel;
    }
    
    public String getDriverName() { return driverName; }
    public int getMaxParallel() { return maxParallel; }
}

Browser b = Browser.CHROME;
System.out.println(b.getDriverName()); // "ChromeDriver"
```

**Chapter 69: Java Reflection API**

**Section 69.1: Sinif Bilgisi Alma**

```java
Class<?> clazz = String.class;
System.out.println(clazz.getName());        // java.lang.String
System.out.println(clazz.getSimpleName());  // String
System.out.println(clazz.isInterface());    // false

// Runtime'da sinif alma
Object obj = "Hello";
Class<?> runtime = obj.getClass();
```

**Section 69.2: Metot ve Alan Inceleme**

```java
Class<?> clazz = MyService.class;
Method[] methods = clazz.getDeclaredMethods();
for (Method m : methods) {
    System.out.println(m.getName() + " -> " + m.getReturnType());
}

Field[] fields = clazz.getDeclaredFields();
for (Field f : fields) {
    f.setAccessible(true); // private alanlara erisim
    System.out.println(f.getName() + " = " + f.get(serviceInstance));
}
```

**Section 69.3: Reflection ile Nesne Olusturma**

```java
Class<?> clazz = Class.forName("com.qa.pages.LoginPage");
Constructor<?> ctor = clazz.getConstructor(WebDriver.class);
LoginPage page = (LoginPage) ctor.newInstance(driver);
```

**Chapter 70: Java Design Patterns (Tasarim Desenleri)**

**Section 70.1: Singleton Pattern**

```java
public class DriverManager {
    private static DriverManager instance;
    private WebDriver driver;
    
    private DriverManager() {}
    
    public static synchronized DriverManager getInstance() {
        if (instance == null) {
            instance = new DriverManager();
        }
        return instance;
    }
    
    public WebDriver getDriver() { return driver; }
}
```

**Section 70.2: Builder Pattern**

```java
public class TestConfig {
    private final String browser;
    private final String url;
    private final int timeout;
    private final boolean headless;
    
    private TestConfig(Builder builder) {
        this.browser = builder.browser;
        this.url = builder.url;
        this.timeout = builder.timeout;
        this.headless = builder.headless;
    }
    
    public static class Builder {
        private String browser = "chrome";
        private String url;
        private int timeout = 30;
        private boolean headless = false;
        
        public Builder url(String url) { this.url = url; return this; }
        public Builder browser(String browser) { this.browser = browser; return this; }
        public Builder timeout(int timeout) { this.timeout = timeout; return this; }
        public Builder headless() { this.headless = true; return this; }
        public TestConfig build() { return new TestConfig(this); }
    }
}

TestConfig config = new TestConfig.Builder()
    .url("https://example.com")
    .browser("firefox")
    .headless()
    .build();
```

**Section 70.3: Factory Pattern**

```java
public class DriverFactory {
    public static WebDriver create(String browserType) {
        switch (browserType.toLowerCase()) {
            case "chrome": return new ChromeDriver();
            case "firefox": return new FirefoxDriver();
            case "edge": return new EdgeDriver();
            default: throw new IllegalArgumentException("Bilinmeyen tarayici: " + browserType);
        }
    }
}
```


**Chapter 71: Java Concurrency (Eszamanlilik)**

**Section 71.1: Thread Olusturma**

```java
// 1. Thread alt sinifi
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread calisiyor: " + getName());
    }
}
new MyThread().start();

// 2. Runnable ile
Thread t = new Thread(() -> System.out.println("Runnable thread"));
t.start();

// 3. ExecutorService ile (onerilir)
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Executor thread"));
executor.shutdown();
```

**Section 71.2: synchronized Anahtar Kelimesi**

```java
public class Counter {
    private int count = 0;
    
    public synchronized void increment() { count++; }
    public synchronized int getCount() { return count; }
}

// Blok seviyesinde
public void addItem(List<String> list, String item) {
    synchronized (list) {
        list.add(item);
    }
}
```

**Section 71.3: ExecutorService ve Thread Havuzu**

```java
ExecutorService pool = Executors.newFixedThreadPool(5);
List<Future<String>> futures = new ArrayList<>();

for (int i = 0; i < 10; i++) {
    final int taskId = i;
    futures.add(pool.submit(() -> {
        Thread.sleep(100);
        return "Task " + taskId + " tamamlandi";
    }));
}

for (Future<String> f : futures) {
    System.out.println(f.get()); // Sonucu bekler
}
pool.shutdown();
```

**Section 71.4: CountDownLatch ve CyclicBarrier**

```java
// CountDownLatch - N gorev bitene kadar bekle
CountDownLatch latch = new CountDownLatch(3);
for (int i = 0; i < 3; i++) {
    pool.submit(() -> {
        doWork();
        latch.countDown();
    });
}
latch.await(); // 3 gorev bitene kadar bekle

// CyclicBarrier - tum thread'ler belli noktaya ulasana kadar bekle
CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println("Hepsi hazir!"));
```

**Chapter 72: Concurrent Collections**

**Section 72.1: ConcurrentHashMap**

`ConcurrentHashMap`, thread-safe ve yuksek performansli bir Map implementasyonudur:

```java
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("count", 0);
map.computeIfAbsent("total", k -> 0);
map.merge("count", 1, Integer::sum);
```

**Section 72.2: BlockingQueue**

```java
BlockingQueue<String> queue = new LinkedBlockingQueue<>(100);
// Producer
pool.submit(() -> {
    queue.put("item1"); // Doluysa bekler
    queue.put("item2");
});

// Consumer
pool.submit(() -> {
    String item = queue.take(); // Bosssa bekler
    process(item);
});
```

**Chapter 73: AtomicInteger ve Atomic Degiskenler**

**Section 73.1: Atomic Degiskenler ile Thread-Safe Sayac**

```java
AtomicInteger counter = new AtomicInteger(0);
// Thread-safe islemler
counter.incrementAndGet();   // ++i
counter.getAndIncrement();   // i++
counter.addAndGet(5);        // i += 5
counter.compareAndSet(5, 0); // i == 5 ise i = 0

// AtomicLong ve AtomicBoolean
AtomicLong longCounter = new AtomicLong(0L);
AtomicBoolean flag = new AtomicBoolean(false);
```

**Chapter 74: Functional Interface (Fonksiyonel Arayuz)**

**Section 74.1: java.util.function Paketi**

```java
// Predicate
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> isEmail = s -> s.contains("@");
Predicate<String> validEmail = notEmpty.and(isEmail);

// Function zincirleme
Function<String, String> trim = String::trim;
Function<String, String> toLower = String::toLowerCase;
Function<String, String> normalize = trim.andThen(toLower);

// Compose (once toLower sonra trim)
Function<String, String> reversed = trim.compose(toLower);

// BiFunction
BiFunction<List<String>, String, Boolean> contains = List::contains;
```

**Chapter 75: Optional (Opsiyonel)**

**Section 75.1: Optional Kullanim Kaliplari**

```java
// Anti-pattern: get() direkt cagirma
String name = optional.get(); // NoSuchElementException riski!

// Dogru yontem
String name = optional.orElse("anonim");
String name2 = optional.orElseGet(() -> generateDefaultName());
String name3 = optional.orElseThrow(() -> new UserNotFoundException());

// flatMap ile ic ice Optional
Optional<String> email = user
    .flatMap(User::getAddress)
    .flatMap(Address::getEmail);
```

**Chapter 76: varargs (Degisken Sayida Parametre)**

**Section 76.1: varargs Kullanimi**

```java
public int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}

sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5); // 15
sum();               // 0

// varargs ve diger parametreler
public void log(String level, Object... messages) {
    for (Object msg : messages) {
        System.out.println("[" + level + "] " + msg);
    }
}
log("INFO", "Test basliyor", "URL:", "https://example.com");
```

**Chapter 77: Arrays Sinifi**

**Section 77.1: Arrays ile Dizi Islemleri**

```java
int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

Arrays.sort(arr);                        // [1, 1, 2, 3, 4, 5, 6, 9]
int idx = Arrays.binarySearch(arr, 5);   // 5 (sirali dizide arama)
int[] copy = Arrays.copyOf(arr, 5);      // [1, 1, 2, 3, 4]
int[] range = Arrays.copyOfRange(arr, 2, 5); // [2, 3, 4]
Arrays.fill(arr, 0);                     // Tum elemanlari 0'a set et
boolean eq = Arrays.equals(arr, copy);   // Esitlik kontrolu
System.out.println(Arrays.toString(arr)); // [0, 0, 0, 0, 0, 0, 0, 0]
```

**Section 77.2: 2D Dizi Islemleri**

```java
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
System.out.println(Arrays.deepToString(matrix));
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

// Sirali dizi
int[][] sorted2D = Arrays.stream(matrix)
    .sorted(Arrays::compare)
    .toArray(int[][]::new);
```

**Chapter 78: Iterable ve Iterator Detaylari**

**Section 78.1: Iterator Ile ConcurrentModificationException Onleme**

```java
// Yanlis yontem - hata verir!
for (String s : list) {
    if (s.startsWith("a")) list.remove(s); // ConcurrentModificationException
}

// Dogru yontem 1 - Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().startsWith("a")) it.remove();
}

// Dogru yontem 2 - removeIf (Java 8+)
list.removeIf(s -> s.startsWith("a"));
```

**Chapter 79: Comparable ve Comparator**

**Section 79.1: Comparable ile Dogal Siralama**

```java
public class Employee implements Comparable<Employee> {
    private String name;
    private int salary;
    
    @Override
    public int compareTo(Employee other) {
        return this.name.compareTo(other.name); // Isme gore siralama
    }
}

List<Employee> employees = new ArrayList<>();
Collections.sort(employees); // Comparable kullaniir
```

**Section 79.2: Comparator ile Ozel Siralama**

```java
// Maasa gore siralama (azalan)
Comparator<Employee> bySalaryDesc = Comparator
    .comparingInt(Employee::getSalary)
    .reversed();

// Cok kritere gore siralama
Comparator<Employee> complex = Comparator
    .comparing(Employee::getDepartment)
    .thenComparingInt(Employee::getSalary)
    .thenComparing(Employee::getName);

employees.sort(complex);
```

**Chapter 80: Strings Sinifi - Ileri Duzey**

**Section 80.1: String.format() ile Formatlama**

```java
String report = String.format("Test: %-20s | Durum: %5s | Sure: %3dms",
    "loginTest", "PASS", 245);
// "Test: loginTest           | Durum:  PASS | Sure: 245ms"

String number = String.format("%,d", 1000000); // "1,000,000"
String hex = String.format("%08X", 255);        // "000000FF"
String padded = String.format("%010.2f", 3.14); // "0000003.14"
```

**Section 80.2: String Metotlari - Tam Liste**

```java
String s = "  Hello, World!  ";
s.trim();           // "Hello, World!" (uc bosluklari)
s.strip();          // Java 11+ unicode-aware trim
s.isBlank();        // false (Java 11+)
s.startsWith("Hel"); // true
s.endsWith("!");   // true
s.indexOf("o");    // 4
s.lastIndexOf("o"); // 8
s.substring(7);    // "World!  "
s.substring(7, 12); // "World"
s.replace(",", ";"); // "  Hello; World!  "
s.replaceAll("\\s+", "_"); // regex ile replace
"".isEmpty();      // true
"  ".isBlank();    // true (Java 11+)
s.chars().count(); // 17 (karakter sayisi)
s.toCharArray();   // char dizisine donustur
String.valueOf(42); // "42" (primitifi String'e cevir)
```

**Chapter 81: Java NIO (Yeni I/O)**

**Section 81.1: ByteBuffer Kullanimi**

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.put("Hello".getBytes());
buffer.flip(); // Okuma moduna gec

byte[] data = new byte[buffer.limit()];
buffer.get(data);
System.out.println(new String(data)); // "Hello"
```

**Section 81.2: FileChannel ile Hizli Dosya Kopyalama**

```java
try (FileChannel source = new FileInputStream("source.txt").getChannel();
     FileChannel target = new FileOutputStream("target.txt").getChannel()) {
    source.transferTo(0, source.size(), target);
}
```

**Chapter 82: JDBC (Java Database Connectivity)**

**Section 82.1: Temel JDBC Kullanimi**

```java
String url = "jdbc:mysql://localhost:3306/testdb";
String user = "root";
String password = "pass";

try (Connection conn = DriverManager.getConnection(url, user, password);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
    
    while (rs.next()) {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        System.out.println(id + ": " + name);
    }
}
```

**Section 82.2: PreparedStatement ile Parameterli Sorgu**

```java
String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "Ali Veli");
    ps.setString(2, "ali@example.com");
    int rowsInserted = ps.executeUpdate();
    System.out.println(rowsInserted + " satir eklendi");
}
```

**Section 82.3: Transaction Yonetimi**

```java
conn.setAutoCommit(false);
try {
    // Birden fazla sorgu
    ps1.executeUpdate();
    ps2.executeUpdate();
    conn.commit(); // Basarili ise kaydet
} catch (SQLException e) {
    conn.rollback(); // Hata varsa geri al
    throw e;
}
```

**Chapter 83: Java Logging**

**Section 83.1: java.util.logging**

```java
Logger logger = Logger.getLogger(MyClass.class.getName());
logger.info("Test basliyor");
logger.warning("Uyari: Eleman bulunamadi");
logger.severe("Kritik hata: Baglanti kesildi");
logger.fine("Debug mesaji");
```

**Section 83.2: SLF4J ve Logback**

```xml
<!-- pom.xml -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.4.11</version>
</dependency>
```

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestRunner {
    private static final Logger log = LoggerFactory.getLogger(TestRunner.class);
    
    public void runTest() {
        log.info("Test calisiyor: {}", testName);
        log.debug("Driver: {}", driver.getClass().getSimpleName());
        log.error("Hata olustu", exception);
    }
}
```

**Chapter 84: Java Profiling ve Performans**

**Section 84.1: System.nanoTime() ile Performans Olcumu**

```java
long start = System.nanoTime();
// Olcmek istedigimiz kod
performExpensiveOperation();
long elapsed = System.nanoTime() - start;
System.out.printf("Sure: %.2f ms%n", elapsed / 1_000_000.0);
```

**Section 84.2: JVM Parametreleri**

```bash
java -Xms256m -Xmx1g           # Min/Max heap boyutu
java -XX:+UseG1GC               # G1 GC kullan
java -verbose:gc                # GC log
java -Xss512k                   # Thread stack boyutu
```

**Chapter 85: Recursion (Ozyineleme)**

**Section 85.1: Recursive Metot Ornekleri**

```java
// Faktoriyel
public static long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci
public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Ikili arama (recursive)
public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, target, mid + 1, high);
    return binarySearch(arr, target, low, mid - 1);
}
```

**Chapter 86: Regular Expressions (Duzzenli Ifadeler)**

**Section 86.1: Pattern ve Matcher**

```java
import java.util.regex.*;

// Basit eslesme
boolean isEmail = Pattern.matches(
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    "test@example.com"
); // true

// Pattern ve Matcher kullanimi
Pattern p = Pattern.compile("\\d{4}-\\d{2}-\\d{2}"); // Tarih: YYYY-MM-DD
Matcher m = p.matcher("Tarih: 2024-06-15 ve 2024-07-01");
while (m.find()) {
    System.out.println("Tarih bulundu: " + m.group()); // 2024-06-15, 2024-07-01
}
```

**Section 86.2: String ile Regex Metotlari**

```java
String text = "Chrome Firefox Edge Safari";
String[] browsers = text.split("\\s+");       // ["Chrome", "Firefox", "Edge", "Safari"]
String replaced = text.replaceAll("[aeiou]", "*"); // "Chr*m* F*r*f*x *dg* S*f*r*"
boolean matches = text.matches(".*Firefox.*"); // true
```

**Chapter 87: Defensive Programming (Savunmaci Programlama)**

**Section 87.1: Guard Clauses (Koruyucu Maddeler)**

```java
// Kotü yöntem: derin ic ice kodul
public void processOrder(Order order) {
    if (order != null) {
        if (order.getItems() != null) {
            if (!order.getItems().isEmpty()) {
                // islem yap
            }
        }
    }
}

// Dogru yontem: guard clauses
public void processOrder(Order order) {
    Objects.requireNonNull(order, "Order cannot be null");
    if (order.getItems() == null || order.getItems().isEmpty()) {
        throw new IllegalArgumentException("Order must have items");
    }
    // islem yap
}
```

**Chapter 88: Java Memory Model**

**Section 88.1: Heap ve Stack Bellegi**

- **Stack**: Primitive degiskenler ve nesne referanslari tutulur. Thread'e ozeldir.
- **Heap**: new ile olusturulan nesneler tutulur. Tum thread'lerin erisilebilir.

```java
public void example() {
    int x = 5;             // Stack'te
    String s = "hello";    // Referans Stack'te, nesne Heap'te
    Object obj = new Object(); // Referans Stack'te, nesne Heap'te
}
```

**Section 88.2: Garbage Collection**

```java
// Nesne GC icin uygun hale gelir:
String s = new String("hello");
s = null; // Artik referans yok, GC silebilir

// finalize() yerine try-with-resources kullanin (deprecated Java 9'da)
// GC tetikleme (garanti degil)
System.gc(); // onerilmez
```

**Chapter 89: JVM Mimarisi**

**Section 89.1: JVM Bilesenleri**

JVM uc ana bilesenden olusur:

1. **Class Loader**: .class dosyalarini belleye yukler (Bootstrap, Extension, Application)
2. **Runtime Data Area**: Bellek bolgeleri (Heap, Stack, Method Area, PC Register, Native Method Stack)
3. **Execution Engine**: Bytecode'u calistirir (Interpreter, JIT Compiler, Garbage Collector)

```java
// Class loading ornek
ClassLoader loader = Thread.currentThread().getContextClassLoader();
Class<?> clazz = loader.loadClass("com.qa.pages.LoginPage");
```

**Chapter 90: Java Modüller (Java 9+)**

**Section 90.1: module-info.java**

```java
// module-info.java
module com.qa.framework {
    requires java.sql;
    requires org.selenium;
    exports com.qa.pages;
    exports com.qa.utils to com.qa.tests;
    opens com.qa.models; // reflection icin
}
```

**Section 90.2: Modul Kullanimi**

```bash
# Derleme
javac --module-path mods -d out/com.qa.framework \
    com.qa.framework/module-info.java \
    com.qa.framework/com/qa/pages/*.java

# Calistirma
java --module-path mods --module com.qa.framework/com.qa.Main
```

**Chapter 91: Records (Java 16+)**

**Section 91.1: Record ile Veri Sinifi**

```java
// Geleneksel veri sinifi yerine:
public record TestResult(String name, boolean passed, long durationMs) {
    // Otomatik: constructor, getters, equals, hashCode, toString
    
    // Compact constructor (dogrulama icin)
    public TestResult {
        if (durationMs < 0) throw new IllegalArgumentException("Sure negatif olamaz");
    }
    
    // Ek metot
    public String status() { return passed ? "PASS" : "FAIL"; }
}

TestResult result = new TestResult("loginTest", true, 245);
System.out.println(result.name());       // "loginTest"
System.out.println(result.passed());     // true
System.out.println(result.durationMs()); // 245
System.out.println(result);             // TestResult[name=loginTest, passed=true, durationMs=245]
```

**Chapter 92: Sealed Classes (Java 17+)**

**Section 92.1: Sealed Class ile Hiyerarsi Kontrolu**

```java
public sealed class TestStatus permits Passed, Failed, Skipped {}

public final class Passed extends TestStatus {
    private final long durationMs;
    public Passed(long durationMs) { this.durationMs = durationMs; }
}

public final class Failed extends TestStatus {
    private final String reason;
    public Failed(String reason) { this.reason = reason; }
}

public final class Skipped extends TestStatus {}
```

**Chapter 93: Pattern Matching (Java 16+)**

**Section 93.1: instanceof ile Pattern Matching**

```java
// Eski yontem
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Yeni yontem (Java 16+)
if (obj instanceof String s) {
    System.out.println(s.length());
}

// switch ile pattern matching (Java 21)
String result = switch (obj) {
    case Integer i -> "int: " + i;
    case String s -> "string: " + s;
    case null -> "null";
    default -> "diger: " + obj;
};
```

**Chapter 94: Text Blocks (Java 15+)**

**Section 94.1: Cok Satirli String (Text Block)**

```java
String json = """
    {
        "name": "Ali",
        "email": "ali@example.com",
        "role": "QA Engineer"
    }
    """;

String html = """
    <html>
        <body>
            <h1>Merhaba</h1>
        </body>
    </html>
    """;

String sql = """
    SELECT u.name, u.email, r.role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.active = true
    ORDER BY u.name
    """;
```

**Chapter 95: Switch Expressions (Java 14+)**

**Section 95.1: switch Expression**

```java
// Eski switch statement
int day = 3;
String dayName;
switch (day) {
    case 1: dayName = "Pazartesi"; break;
    case 2: dayName = "Sali"; break;
    default: dayName = "Diger";
}

// Yeni switch expression
String dayName2 = switch (day) {
    case 1 -> "Pazartesi";
    case 2 -> "Sali";
    case 3 -> "Carsamba";
    default -> "Diger";
};

// yield ile deger dondurmek
String result = switch (testStatus) {
    case "PASS" -> "Basarili";
    case "FAIL" -> {
        logError("Test basarisiz oldu");
        yield "Basarisiz";
    }
    default -> "Bilinmiyor";
};
```

**Chapter 96: var Anahtar Kelimesi (Java 10+)**

**Section 96.1: Local Variable Type Inference**

```java
// Eski yontem
ArrayList<HashMap<String, List<Integer>>> map = new ArrayList<>();
Iterator<Map.Entry<String, Integer>> it = scores.entrySet().iterator();

// var ile (sadece yerel degiskenler icin)
var map2 = new ArrayList<HashMap<String, List<Integer>>>();
var it2 = scores.entrySet().iterator();
var name = "Ali"; // String cikarim yapilir
var nums = new int[]{1, 2, 3}; // int[] cikarim yapilir

// Dikkat: var null'dan tip cikaramaz
var x = null; // HATA!
```

**Chapter 97: String Manipulation Ileri Duzey**

**Section 97.1: char Isleme**

```java
String s = "Hello123World";

// Karakter kontrolu
long digitCount = s.chars().filter(Character::isDigit).count(); // 3
long letterCount = s.chars().filter(Character::isLetter).count(); // 10

// Sadece harfleri al
String onlyLetters = s.chars()
    .filter(Character::isLetter)
    .collect(StringBuilder::new,
             StringBuilder::appendCodePoint,
             StringBuilder::append)
    .toString(); // "HelloWorld"
```

**Section 97.2: Palindrome Kontrolu**

```java
public static boolean isPalindrome(String s) {
    String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
    String reversed = new StringBuilder(clean).reverse().toString();
    return clean.equals(reversed);
}
isPalindrome("A man a plan a canal Panama"); // true
```

**Chapter 98: Exception Chaining ve Stack Trace**

**Section 98.1: Exception Chaining**

```java
try {
    loadConfig();
} catch (IOException e) {
    // Orijinal hatayı sarmala
    throw new TestSetupException("Konfigurasyon yuklenemedi", e);
}

// Zinciri okuma
try {
    // ...
} catch (TestSetupException e) {
    System.out.println("Hata: " + e.getMessage());
    System.out.println("Neden: " + e.getCause().getMessage()); // IOException mesaji
    e.printStackTrace();
}
```

**Chapter 99: Java 8 Yenilikleri - Ozet**

**Section 99.1: Java 8 Onemli Ozellikler**

```java
// 1. Lambda
Runnable r = () -> System.out.println("Lambda!");

// 2. Stream API
List<String> filtered = list.stream()
    .filter(s -> s.length() > 3)
    .collect(Collectors.toList());

// 3. Optional
Optional<String> opt = Optional.ofNullable(getValue());

// 4. Default Methods
interface Greetable {
    default void greet() { System.out.println("Merhaba!"); }
}

// 5. Method References
list.forEach(System.out::println);

// 6. Date/Time API
LocalDate today = LocalDate.now();

// 7. CompletableFuture
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenAccept(result -> save(result));
```

**Chapter 100: CompletableFuture ve Async Programlama**

**Section 100.1: CompletableFuture Temelleri**

```java
// Asenkron islem
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(1000);
    return "Sonuc";
});

// Zincirleme
CompletableFuture<String> chain = CompletableFuture
    .supplyAsync(() -> fetchUserFromDB(userId))
    .thenApply(user -> user.toUpperCase())
    .thenCompose(name -> fetchOrdersAsync(name))
    .exceptionally(ex -> "Hata: " + ex.getMessage());

String result = chain.get(); // Sonucu bekle
```

**Section 100.2: Birden Fazla Future'i Birlestirme**

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Sonuc1");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "Sonuc2");

// Hepsini bekle
CompletableFuture.allOf(f1, f2).thenRun(() -> {
    System.out.println(f1.join() + " + " + f2.join());
});

// Ilk biten
CompletableFuture.anyOf(f1, f2).thenAccept(System.out::println);
```


**Chapter 101: Java Swing Temelleri**

**Section 101.1: JFrame ile Pencere Olusturma**

```java
import javax.swing.*;

public class SimpleWindow extends JFrame {
    public SimpleWindow() {
        setTitle("Test Uygulamasi");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        JButton button = new JButton("Tiklandi!");
        button.addActionListener(e -> System.out.println("Buton tiklandi"));
        add(button);
        setVisible(true);
    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(SimpleWindow::new);
    }
}
```

**Chapter 102: JUnit 5 ile Test Yazma**

**Section 102.1: JUnit 5 Temel Anotasyonlar**

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calc;

    @BeforeEach
    void setUp() { calc = new Calculator(); }

    @AfterEach
    void tearDown() { calc = null; }

    @BeforeAll
    static void beforeAll() { System.out.println("Suite basladi"); }

    @AfterAll
    static void afterAll() { System.out.println("Suite bitti"); }

    @Test
    @DisplayName("Toplama testi")
    void testAdd() {
        assertEquals(5, calc.add(2, 3));
        assertNotEquals(0, calc.add(1, 1));
    }

    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void testPositive(int n) {
        assertTrue(n > 0);
    }
}
```

**Chapter 103: Mockito ile Mock Testing**

**Section 103.1: Mock Nesne Olusturma**

```java
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepo;
    @InjectMocks
    private UserService userService;

    @Test
    void testFindUser() {
        User mockUser = new User(1L, "Ali", "ali@example.com");
        when(userRepo.findById(1L)).thenReturn(Optional.of(mockUser));
        User found = userService.findById(1L);
        assertEquals("Ali", found.getName());
        verify(userRepo, times(1)).findById(1L);
        verifyNoMoreInteractions(userRepo);
    }
}
```

**Chapter 104: Java Security - Sifreleme**

**Section 104.1: SHA-256 ile Ozet Alma**

```java
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest("password123".getBytes());
String hexHash = Base64.getEncoder().encodeToString(hash);

// AES sifreleme
SecretKey key = KeyGenerator.getInstance("AES").generateKey();
Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, key);
byte[] encrypted = cipher.doFinal("Gizli veri".getBytes());
```

**Chapter 105: Collections - Ileri Konular**

**Section 105.1: Immutable Collections (Java 9+)**

```java
List<String> immutableList = List.of("a", "b", "c");
Set<Integer> immutableSet = Set.of(1, 2, 3);
Map<String, Integer> immutableMap = Map.of("a", 1, "b", 2);
Map<String, Integer> copy = Map.copyOf(mutableMap);
```

**Section 105.2: Stream Collectors Ileri Kullanim**

```java
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

Map<String, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment, Collectors.counting()));

IntSummaryStatistics stats = employees.stream()
    .collect(Collectors.summarizingInt(Employee::getSalary));
```

**Chapter 106: Design Pattern - Observer**

**Section 106.1: Observer Pattern**

```java
interface TestListener {
    void onTestStart(String testName);
    void onTestPass(String testName);
    void onTestFail(String testName, String reason);
}

class TestRunner {
    private List<TestListener> listeners = new ArrayList<>();
    public void addListener(TestListener l) { listeners.add(l); }

    public void run(String testName) {
        listeners.forEach(l -> l.onTestStart(testName));
        try {
            executeTest(testName);
            listeners.forEach(l -> l.onTestPass(testName));
        } catch (Exception e) {
            listeners.forEach(l -> l.onTestFail(testName, e.getMessage()));
        }
    }
}
```

**Chapter 107: Design Pattern - Strategy**

**Section 107.1: Strategy Pattern**

```java
interface SortStrategy { void sort(int[] arr); }
class BubbleSort implements SortStrategy { public void sort(int[] arr) { /* bubble */ } }
class QuickSort implements SortStrategy { public void sort(int[] arr) { /* quick */ } }

class Sorter {
    private SortStrategy strategy;
    public Sorter(SortStrategy s) { this.strategy = s; }
    public void sort(int[] arr) { strategy.sort(arr); }
}
Sorter sorter = new Sorter(new QuickSort());
sorter.sort(data);
```

**Chapter 108: Java ile JDBC**

**Section 108.1: Temel JDBC Kullanimi**

```java
String url = "jdbc:mysql://localhost:3306/testdb";
try (Connection conn = DriverManager.getConnection(url, "root", "pass");
     PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?")) {
    ps.setInt(1, 1);
    ResultSet rs = ps.executeQuery();
    while (rs.next()) {
        System.out.println(rs.getString("name"));
    }
}
```

**Section 108.2: Transaction Yonetimi**

```java
conn.setAutoCommit(false);
try {
    ps1.executeUpdate();
    ps2.executeUpdate();
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
    throw e;
}
```

**Chapter 109: Java Logging - SLF4J**

**Section 109.1: SLF4J ve Logback**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestRunner {
    private static final Logger log = LoggerFactory.getLogger(TestRunner.class);

    public void runTest(String testName) {
        log.info("Test calisiyor: {}", testName);
        log.debug("Driver: {}", driver.getClass().getSimpleName());
        try {
            // test
        } catch (Exception e) {
            log.error("Hata olustu: {}", e.getMessage(), e);
        }
    }
}
```

**Chapter 110: Java ile HTTP Client (Java 11+)**

**Section 110.1: HttpClient ile GET Istegi**

```java
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.statusCode());
System.out.println(response.body());
```

**Section 110.2: POST Istegi**

```java
String json = "{\"name\":\"Ali\",\"email\":\"ali@example.com\"}";
HttpRequest postRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();
HttpResponse<String> postResponse = client.send(postRequest,
    HttpResponse.BodyHandlers.ofString());
```

**Chapter 111: Java ile JSON (Jackson)**

**Section 111.1: Jackson ile JSON Parse**

```java
ObjectMapper mapper = new ObjectMapper();

// JSON'dan nesneye
String json = "{\"name\":\"Ali\",\"age\":30}";
User user = mapper.readValue(json, User.class);

// Nesneden JSON'a
String output = mapper.writerWithDefaultPrettyPrinter()
    .writeValueAsString(user);

// Liste parse
List<User> users = mapper.readValue(jsonArray,
    new TypeReference<List<User>>(){});
```

**Chapter 112: Build Araclar - Maven**

**Section 112.1: Maven ile Proje Yonetimi**

```xml
<project>
  <groupId>com.qa</groupId>
  <artifactId>test-framework</artifactId>
  <version>1.0.0</version>
  <dependencies>
    <dependency>
      <groupId>org.seleniumhq.selenium</groupId>
      <artifactId>selenium-java</artifactId>
      <version>4.15.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

**Chapter 113: Apache POI ile Excel**

**Section 113.1: Excel Okuma ve Yazma**

```java
// Excel okuma
try (Workbook wb = WorkbookFactory.create(new File("test-data.xlsx"))) {
    Sheet sheet = wb.getSheetAt(0);
    for (Row row : sheet) {
        for (Cell cell : row) {
            System.out.print(cell.getStringCellValue() + "\t");
        }
        System.out.println();
    }
}

// Excel yazma
try (Workbook wb = new XSSFWorkbook()) {
    Sheet sheet = wb.createSheet("Results");
    Row header = sheet.createRow(0);
    header.createCell(0).setCellValue("Test Adi");
    header.createCell(1).setCellValue("Sonuc");
    try (FileOutputStream fos = new FileOutputStream("results.xlsx")) {
        wb.write(fos);
    }
}
```

**Chapter 114: Regular Expressions (Regex)**

**Section 114.1: Pattern ve Matcher Kullanimi**

```java
// Email dogrulama
boolean isEmail = Pattern.matches(
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    "test@example.com");

// Tarih arama
Pattern p = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
Matcher m = p.matcher("Tarih: 2024-06-15 ve 2024-07-01");
while (m.find()) {
    System.out.println("Tarih: " + m.group());
}

// Gruplama
Pattern datePattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
Matcher dm = datePattern.matcher("2024-06-15");
if (dm.matches()) {
    String year = dm.group(1);   // "2024"
    String month = dm.group(2);  // "06"
    String day = dm.group(3);    // "15"
}
```

**Chapter 115: Sorting ve Search Algoritmalari**

**Section 115.1: Binary Search**

```java
// Arrays.binarySearch - sirali dizide
int[] sorted = {1, 3, 5, 7, 9, 11, 13};
int idx = Arrays.binarySearch(sorted, 7); // 3

// Manuel binary search
int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

**Section 115.2: Merge Sort**

```java
int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        result[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    }
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    return result;
}
```

**Chapter 116: Recursion (Ozyineleme)**

**Section 116.1: Recursive Ornekler**

```java
// Faktoriyel
public static long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci - Memoization ile
Map<Integer, Long> memo = new HashMap<>();
public long fibonacci(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fibonacci(n-1) + fibonacci(n-2);
    memo.put(n, result);
    return result;
}

// Klasor boyutu hesaplama
long folderSize(File folder) {
    if (folder.isFile()) return folder.length();
    long size = 0;
    for (File f : folder.listFiles()) size += folderSize(f);
    return size;
}
```

**Chapter 117: Java ile Properties Dosyasi**

**Section 117.1: Properties Okuma ve Yazma**

```java
Properties props = new Properties();
try (InputStream is = new FileInputStream("config.properties")) {
    props.load(is);
}
String browser = props.getProperty("browser", "chrome");
int timeout = Integer.parseInt(props.getProperty("timeout", "30"));

props.setProperty("newKey", "newValue");
try (OutputStream os = new FileOutputStream("config.properties")) {
    props.store(os, "Test Configuration");
}
```

**Chapter 118: CompletableFuture - Async**

**Section 118.1: CompletableFuture Temelleri**

```java
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    Thread.sleep(1000);
    return "Sonuc";
});

CompletableFuture<String> chain = CompletableFuture
    .supplyAsync(() -> fetchUser(userId))
    .thenApply(String::toUpperCase)
    .exceptionally(ex -> "Hata: " + ex.getMessage());

String result = chain.get();

// Paralel islemler
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "A");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "B");
CompletableFuture.allOf(f1, f2).thenRun(() ->
    System.out.println(f1.join() + f2.join()));
```

**Chapter 119: varargs ve Method Overloading**

**Section 119.1: varargs Kullanimi**

```java
public int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}
sum(1, 2, 3);        // 6
sum(1, 2, 3, 4, 5); // 15
sum();               // 0

public void log(String level, Object... messages) {
    for (Object msg : messages) {
        System.out.println("[" + level + "] " + msg);
    }
}
```

**Chapter 120: Java ile ZIP Islemleri**

**Section 120.1: ZIP Olusturma ve Acma**

```java
// ZIP olusturma
try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream("reports.zip"))) {
    File[] files = new File("test-reports").listFiles();
    for (File f : files) {
        zos.putNextEntry(new ZipEntry(f.getName()));
        Files.copy(f.toPath(), zos);
        zos.closeEntry();
    }
}

// ZIP icerigini listeleme
try (ZipFile zip = new ZipFile("reports.zip")) {
    zip.entries().asIterator().forEachRemaining(entry ->
        System.out.println(entry.getName()));
}
```


**Chapter 121: Clean Code Prensipleri**

**Section 121.1: Anlamli Isimlendirme**

```java
// Kotu
int d;
List<int[]> theList;
void genymdhms(Date d) { }

// Iyi
int daysSinceLastDeployment;
List<TestCase> failedTestCases;
void generateLastDeploymentTimestamp(Date deploymentDate) { }
```

**Section 121.2: Kucuk Fonksiyonlar ve SRP**

```java
// Kotu: Her sey tek fonksiyonda
public void runAndReport(String testName, String browser, String url) {
    // 100 satirlik kod...
}

// Iyi: Her fonksiyon tek is yapar
public TestResult runTest(String testName, String browser) {
    WebDriver driver = createDriver(browser);
    try {
        return executeTest(testName, driver);
    } finally {
        driver.quit();
    }
}
private WebDriver createDriver(String browser) { /* ... */ return null; }
private TestResult executeTest(String name, WebDriver driver) { /* ... */ return null; }
```

**Chapter 122: SOLID Prensipleri**

**Section 122.1: Single Responsibility Principle (SRP)**

```java
// Ihlal: Tek sinif her seyi yapiyor
class BadTestRunner {
    void run() { /* test */ }
    void generateReport() { /* rapor */ }
    void sendEmail() { /* email */ }
}

// Dogru: Her sinif tek sorumluluk
class TestRunner { void run() { } }
class ReportGenerator { void generate(TestResult r) { } }
class EmailNotifier { void notify(String to, TestResult r) { } }
```

**Section 122.2: Open/Closed Principle (OCP)**

```java
interface ReportFormat { String format(TestResult result); }
class HtmlReport implements ReportFormat { public String format(TestResult r) { return "<html>"; } }
class JsonReport implements ReportFormat { public String format(TestResult r) { return "{}"; } }

// Yeni format: mevcut koda dokunulmaz, yeni sinif eklenir
class PdfReport implements ReportFormat { public String format(TestResult r) { return "PDF"; } }
```

**Section 122.3: Liskov Substitution Principle (LSP)**

```java
// Alt sinif, ust sinifin yerine gecebilmeli
public class Bird { public void move() { System.out.println("Moving"); } }
public class Eagle extends Bird {
    @Override public void move() { System.out.println("Flying"); }
}
// Eagle, Bird'un yerine gececek sekilde calisir
Bird bird = new Eagle();
bird.move(); // "Flying"
```

**Section 122.4: Interface Segregation Principle (ISP)**

```java
// Ihlal: Buyuk interface
interface TestActions {
    void click();
    void type(String text);
    void screenshot();
    void measurePerformance(); // Her test buna ihtiyac duymaz
}

// Dogru: Kucuk, ozellestirilmis interface'ler
interface Clickable { void click(); }
interface Typeable { void type(String text); }
interface Screenshottable { void screenshot(); }
interface Measurable { void measurePerformance(); }
```

**Section 122.5: Dependency Inversion Principle (DIP)**

```java
// Ihlal: Ust sinif alt sinifa bagimli
class TestRunner {
    private ChromeDriver driver = new ChromeDriver(); // Somut sinif!
}

// Dogru: Soyutlamaya bagimli
class TestRunner {
    private WebDriver driver; // Arayuz!
    public TestRunner(WebDriver driver) { this.driver = driver; }
}
// DI ile ChromeDriver, FirefoxDriver vs. gecirilebilir
```

**Chapter 123: Page Object Model**

**Section 123.1: POM Tasarimi**

```java
public class LoginPage {
    private WebDriver driver;

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public LoginPage enterUsername(String username) {
        usernameField.clear();
        usernameField.sendKeys(username);
        return this;
    }

    public LoginPage enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
        return this;
    }

    public DashboardPage clickLogin() {
        loginButton.click();
        return new DashboardPage(driver);
    }

    // Fluent API
    public DashboardPage loginAs(String user, String pass) {
        return enterUsername(user).enterPassword(pass).clickLogin();
    }
}
```

**Chapter 124: Paralel Test Calistirma**

**Section 124.1: TestNG ile Paralel Test**

```xml
<!-- testng.xml -->
<suite name="Parallel Suite" parallel="tests" thread-count="4">
  <test name="Chrome Tests">
    <parameter name="browser" value="chrome"/>
    <classes><class name="com.qa.tests.LoginTest"/></classes>
  </test>
  <test name="Firefox Tests">
    <parameter name="browser" value="firefox"/>
    <classes><class name="com.qa.tests.LoginTest"/></classes>
  </test>
</suite>
```

```java
public class LoginTest {
    private WebDriver driver;
    @Parameters("browser")
    @BeforeMethod
    public void setUp(String browser) {
        driver = DriverFactory.create(browser);
    }
    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}
```

**Chapter 125: Docker ile Selenium Grid**

**Section 125.1: Docker Compose ile Grid**

```yaml
version: '3'
services:
  hub:
    image: selenium/hub:4.15.0
    ports:
      - "4444:4444"
  chrome:
    image: selenium/node-chrome:4.15.0
    depends_on:
      - hub
    environment:
      - SE_EVENT_BUS_HOST=hub
    scale: 3
  firefox:
    image: selenium/node-firefox:4.15.0
    depends_on:
      - hub
    scale: 2
```

```java
ChromeOptions options = new ChromeOptions();
WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), options);
```

**Chapter 126: Extent Reports ile Raporlama**

**Section 126.1: ExtentReports Entegrasyonu**

```java
ExtentReports extent = new ExtentReports();
ExtentSparkReporter spark = new ExtentSparkReporter("test-report.html");
extent.attachReporter(spark);

ExtentTest test = extent.createTest("loginTest");
test.assignCategory("Smoke");

try {
    test.pass("Kullanici adi girildi");
    test.pass("Parola girildi");
    test.pass(MediaEntityBuilder
        .createScreenCaptureFromPath("screenshots/login.png").build());
} catch (Exception e) {
    test.fail("Test basarisiz: " + e.getMessage());
}
extent.flush();
```

**Chapter 127: Jenkins CI/CD Entegrasyonu**

**Section 127.1: Jenkinsfile**

```groovy
pipeline {
    agent any
    tools {
        maven 'Maven 3.9'
        jdk 'JDK 17'
    }
    stages {
        stage('Build') {
            steps { sh 'mvn clean compile' }
        }
        stage('Test') {
            steps {
                sh 'mvn test -Dbrowser=chrome -Denv=qa'
            }
            post {
                always {
                    publishHTML([
                        reportDir: 'target/extent-reports',
                        reportFiles: 'index.html',
                        reportName: 'Test Report'
                    ])
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }
    }
}
```

**Chapter 128: Type System - Generics Ileri**

**Section 128.1: Type Erasure**

Generics runtime'da type erasure ile silinir. `List<String>` ve `List<Integer>` runtime'da ayni tipte gorunur:

```java
List<String> strings = new ArrayList<>();
List<Integer> ints = new ArrayList<>();
System.out.println(strings.getClass() == ints.getClass()); // true

// Unchecked cast
List rawList = new ArrayList();
rawList.add("hello");
List<String> typed = (List<String>) rawList; // Uyari ama calisir
```

**Section 128.2: Wildcard Bounds (PECS)**

```java
// Producer Extends
public double sum(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}

// Consumer Super
public void addNumbers(List<? super Integer> list) {
    list.add(1); list.add(2); list.add(3);
}

// Copy ornek (Producer + Consumer)
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (T item : src) dest.add(item);
}
```

**Chapter 129: Functional Programming - Composition**

**Section 129.1: Function Composition**

```java
Function<Integer, Integer> times2 = x -> x * 2;
Function<Integer, Integer> plus3 = x -> x + 3;

Function<Integer, Integer> times2ThenPlus3 = times2.andThen(plus3);
System.out.println(times2ThenPlus3.apply(5)); // (5*2)+3 = 13

Function<Integer, Integer> plus3ThenTimes2 = times2.compose(plus3);
System.out.println(plus3ThenTimes2.apply(5)); // (5+3)*2 = 16
```

**Section 129.2: Predicate Composition**

```java
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> isEmail = s -> s.contains("@");
Predicate<String> isValidEmail = notEmpty.and(isEmail);
Predicate<String> isEmptyOrEmail = notEmpty.negate().or(isEmail);

List<String> emails = list.stream()
    .filter(isValidEmail)
    .collect(Collectors.toList());
```

**Chapter 130: Java Memory Yonetimi**

**Section 130.1: Memory Leak Onleme**

```java
// Yaygin Memory Leak 1: Static koleksiyon
static Map<String, Object> cache = new HashMap<>(); // Buyur, temizlenmez!

// Cozum: sinirli cache
Map<String, Object> boundedCache = new LinkedHashMap<>(100, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry e) { return size() > 100; }
};

// Yaygin Memory Leak 2: Listener'lari kaldirmamak
button.addActionListener(listener);
// ...
button.removeActionListener(listener); // Temizlemek gerekir!

// Yaygin Memory Leak 3: Closeable kaynaklar
try (Connection conn = getConnection()) { // Auto-close!
    // kullan
}
```

**Section 130.2: GC Tune**

```bash
java -Xms256m -Xmx2g -XX:+UseG1GC -XX:MaxGCPauseMillis=200 MyApp
```

**Chapter 131: Java ile Graph BFS/DFS**

**Section 131.1: BFS Algoritmas**

```java
void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    queue.add(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
}
```

**Section 131.2: DFS Algoritmas**

```java
void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.print(node + " ");
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}
```

**Chapter 132: Java ile XML Isleme**

**Section 132.1: DOM ile XML Parse**

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document doc = builder.parse(new File("config.xml"));

NodeList nodes = doc.getElementsByTagName("browser");
for (int i = 0; i < nodes.getLength(); i++) {
    Element el = (Element) nodes.item(i);
    System.out.println(el.getTextContent());
}
```

**Chapter 133: Java ile Process Calistirma**

**Section 133.1: ProcessBuilder**

```java
ProcessBuilder pb = new ProcessBuilder("mvn", "clean", "test");
pb.directory(new File("/path/to/project"));
pb.redirectErrorStream(true);

Process process = pb.start();
try (BufferedReader reader = new BufferedReader(
        new InputStreamReader(process.getInputStream()))) {
    reader.lines().forEach(System.out::println);
}
int exitCode = process.waitFor();
System.out.println("Cikis kodu: " + exitCode);
```

**Chapter 134: Java ile Reflection Ileri**

**Section 134.1: Dynamic Proxy**

```java
InvocationHandler handler = (proxy, method, args) -> {
    System.out.println("Before: " + method.getName());
    Object result = method.invoke(realObject, args);
    System.out.println("After: " + method.getName());
    return result;
};

MyInterface proxyObj = (MyInterface) Proxy.newProxyInstance(
    MyInterface.class.getClassLoader(),
    new Class[]{MyInterface.class},
    handler
);
```

**Chapter 135: Java ile WatchService**

**Section 135.1: Dizin Izleme**

```java
WatchService watcher = FileSystems.getDefault().newWatchService();
Path dir = Path.of("test-reports");
dir.register(watcher,
    StandardWatchEventKinds.ENTRY_CREATE,
    StandardWatchEventKinds.ENTRY_MODIFY,
    StandardWatchEventKinds.ENTRY_DELETE);

WatchKey key = watcher.take();
for (WatchEvent<?> event : key.pollEvents()) {
    System.out.println("Olay: " + event.kind() + " - " + event.context());
}
key.reset();
```

**Chapter 136: Java Records (Java 16+)**

**Section 136.1: Record Kullanimi**

```java
public record TestResult(String name, boolean passed, long durationMs) {
    // Compact constructor (dogrulama)
    public TestResult {
        if (durationMs < 0) throw new IllegalArgumentException("Sure negatif olamaz");
        name = name.strip(); // normalize
    }
    // Ek metot
    public String status() { return passed ? "PASS" : "FAIL"; }
}

TestResult result = new TestResult("loginTest", true, 245);
System.out.println(result.name());   // "loginTest"
System.out.println(result.status()); // "PASS"
System.out.println(result); // TestResult[name=loginTest, passed=true, durationMs=245]
```

**Chapter 137: Sealed Classes (Java 17+)**

**Section 137.1: Sealed Class**

```java
public sealed class ApiResponse permits SuccessResponse, ErrorResponse, PendingResponse {}

public final class SuccessResponse extends ApiResponse {
    private final String data;
    public SuccessResponse(String data) { this.data = data; }
    public String getData() { return data; }
}

public final class ErrorResponse extends ApiResponse {
    private final int code;
    private final String message;
    public ErrorResponse(int code, String msg) { this.code = code; this.message = msg; }
}

public final class PendingResponse extends ApiResponse {}

// Pattern matching ile kullanim
String handle(ApiResponse response) {
    return switch (response) {
        case SuccessResponse s -> "Basarili: " + s.getData();
        case ErrorResponse e -> "Hata " + e.code + ": " + e.message;
        case PendingResponse p -> "Bekliyor...";
    };
}
```

**Chapter 138: Text Blocks (Java 15+)**

**Section 138.1: Text Block Kullanimi**

```java
String json = """
    {
        "name": "Ali",
        "role": "QA Engineer",
        "skills": ["Selenium", "Playwright", "JMeter"]
    }
    """;

String sql = """
    SELECT u.name, u.email
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.active = true
    ORDER BY u.name
    """;

String html = """
    <div class="card">
        <h1>%s</h1>
        <p>%s</p>
    </div>
    """.formatted(title, content);
```

**Chapter 139: Pattern Matching (Java 16+)**

**Section 139.1: instanceof ile Pattern Matching**

```java
// Eski yontem
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 16+
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}

// switch ile pattern matching (Java 21)
String result = switch (obj) {
    case Integer i when i > 0 -> "Pozitif int: " + i;
    case Integer i -> "Negatif/sifir int: " + i;
    case String s -> "String: " + s;
    case null -> "null deger";
    default -> "Baska: " + obj;
};
```

**Chapter 140: Switch Expression (Java 14+)**

**Section 140.1: Yeni Switch Syntax**

```java
// Eski switch statement
String dayName;
switch (day) {
    case 1: dayName = "Pazartesi"; break;
    case 2: dayName = "Sali"; break;
    default: dayName = "Diger";
}

// Yeni switch expression
String dayName2 = switch (day) {
    case 1 -> "Pazartesi";
    case 2 -> "Sali";
    case 3 -> "Carsamba";
    case 4 -> "Persembe";
    case 5 -> "Cuma";
    case 6, 7 -> "Hafta sonu";
    default -> "Bilinmiyor";
};

// yield ile
String result = switch (status) {
    case "PASS" -> "Basarili";
    case "FAIL" -> {
        logError("Test basarisiz");
        yield "Basarisiz";
    }
    default -> "Bilinmiyor";
};
```

**Chapter 141: var Anahtar Kelimesi (Java 10+)**

**Section 141.1: Local Variable Type Inference**

```java
// var ile tip cikarimi
var list = new ArrayList<String>();
var map = new HashMap<String, List<Integer>>();
var name = "Ali"; // String
var count = 42;   // int

// for-each ile
for (var entry : map.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}

// try-with-resources
try (var conn = getConnection(); var stmt = conn.createStatement()) {
    var rs = stmt.executeQuery("SELECT * FROM users");
}

// Dikkat: var null'dan tip cikaramaz!
// var x = null; // DERLEME HATASI
```

**Chapter 142: String Formatlama Ileri**

**Section 142.1: Formatted Strings**

```java
// String.format
String report = String.format("%-20s | %5s | %6dms", "loginTest", "PASS", 245);

// Formatted method (Java 15+)
String msg = "Kullanici: %-10s, Puan: %d".formatted("Ali", 95);

// printf
System.out.printf("Gecen: %d/%d (%.1f%%)%n", passed, total, 100.0*passed/total);
```

**Chapter 143: Annotation Processing**

**Section 143.1: Custom Annotation Olusturma**

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface TestCategory {
    String value();
    String[] tags() default {};
    boolean enabled() default true;
    int priority() default 5;
}

@TestCategory(value = "smoke", tags = {"login", "critical"}, priority = 1)
public void testLogin() { }

// Annotation okuma
Method method = getClass().getMethod("testLogin");
TestCategory cat = method.getAnnotation(TestCategory.class);
if (cat != null && cat.enabled()) {
    System.out.println("Kategori: " + cat.value());
    System.out.println("Oncelik: " + cat.priority());
}
```

**Chapter 144: Java ile Baglanti Havuzu (Connection Pool)**

**Section 144.1: HikariCP ile Database Pool**

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
config.setUsername("root");
config.setPassword("pass");
config.setMaximumPoolSize(10);
config.setMinimumIdle(2);
config.setConnectionTimeout(30000);

HikariDataSource ds = new HikariDataSource(config);

try (Connection conn = ds.getConnection();
     PreparedStatement ps = conn.prepareStatement("SELECT count(*) FROM users")) {
    ResultSet rs = ps.executeQuery();
    rs.next();
    System.out.println("Kullanici sayisi: " + rs.getInt(1));
}
```

**Chapter 145: Java ile REST API Test**

**Section 145.1: RestAssured ile API Test**

```java
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

RestAssured.baseURI = "https://api.example.com";

// GET
given()
    .header("Authorization", "Bearer " + token)
    .queryParam("page", 1)
.when()
    .get("/users")
.then()
    .statusCode(200)
    .body("data.size()", greaterThan(0))
    .body("data[0].name", notNullValue());

// POST
given()
    .contentType(ContentType.JSON)
    .body("{\"name\": \"Ali\", \"email\": \"ali@example.com\"}")
.when()
    .post("/users")
.then()
    .statusCode(201)
    .body("id", notNullValue());
```


**Chapter 146: Java ile Spring Boot Test**

**Section 146.1: Spring Boot Test Anotasyonlari**

```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getUser_ShouldReturn200() throws Exception {
        when(userService.findById(1L))
            .thenReturn(new User(1L, "Ali", "ali@example.com"));

        mockMvc.perform(get("/api/users/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Ali"));
    }
}
```

**Chapter 147: Java ile Cucumber BDD**

**Section 147.1: Cucumber Feature Dosyasi ve Step Definitions**

```gherkin
# login.feature
Feature: Login
  Scenario: Basarili giris
    Given Kullanici login sayfasindadir
    When "admin" kullanici adi ve "Admin123!" sifresi girilir
    Then Dashboard sayfasina yonlendirilir
```

```java
@Given("Kullanici login sayfasindadir")
public void kullanici_login_sayfasindadir() {
    driver.get(baseUrl + "/login");
}

@When("{string} kullanici adi ve {string} sifresi girilir")
public void giris_yap(String username, String password) {
    new LoginPage(driver).enterUsername(username).enterPassword(password);
}

@Then("Dashboard sayfasina yonlendirilir")
public void dashboard_dogrula() {
    assertEquals("Dashboard", driver.getTitle());
}
```

**Chapter 148: Java ile Playwright**

**Section 148.1: Playwright Java API**

```java
try (Playwright playwright = Playwright.create()) {
    Browser browser = playwright.chromium().launch(
        new BrowserType.LaunchOptions().setHeadless(false));
    Page page = browser.newPage();

    page.navigate("https://example.com/login");
    page.fill("#username", "admin");
    page.fill("#password", "Admin123!");
    page.click("button[type='submit']");

    assertThat(page).hasTitle("Dashboard");
    page.screenshot(new Page.ScreenshotOptions().setPath(Path.of("login.png")));

    browser.close();
}
```

**Chapter 149: Java ile Allure Reports**

**Section 149.1: Allure Anotasyonlari**

```java
@Epic("E-Commerce")
@Feature("Login")
public class LoginTest {
    @Test
    @Story("Basarili Login")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Gecerli kimlik bilgileriyle giris yapilabilmeli")
    public void successfulLogin() {
        Allure.step("Login sayfasina git", () -> {
            driver.get(baseUrl + "/login");
        });
        Allure.step("Kimlik bilgilerini gir", () -> {
            loginPage.enterUsername("admin");
            loginPage.enterPassword("Admin123!");
        });
        Allure.step("Giris yap", () -> {
            loginPage.clickLogin();
            assertThat(driver.getTitle()).isEqualTo("Dashboard");
        });
    }
}
```

**Chapter 150: Java ile API Mocking**

**Section 150.1: WireMock ile API Mock**

```java
@ExtendWith(WireMockExtension.class)
class ApiClientTest {
    @InjectWireMock
    WireMockServer wireMock;

    @Test
    void getUser_ShouldReturnMockedResponse() {
        wireMock.stubFor(get(urlEqualTo("/api/users/1"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{\"id\":1,\"name\":\"Ali\"}")));

        User user = apiClient.getUser(1L);
        assertEquals("Ali", user.getName());

        wireMock.verify(getRequestedFor(urlEqualTo("/api/users/1")));
    }
}
```

**Chapter 151: Java ile TestContainers**

**Section 151.1: TestContainers ile Entegrasyon Testi**

```java
@Testcontainers
class DatabaseIntegrationTest {
    @Container
    static MySQLContainer<?> mysql = new MySQLContainer<>("mysql:8.0")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @Test
    void shouldInsertAndRetrieveUser() {
        String url = mysql.getJdbcUrl();
        try (Connection conn = DriverManager.getConnection(url, "test", "test")) {
            // Gercek MySQL ile test
            PreparedStatement ps = conn.prepareStatement(
                "INSERT INTO users (name) VALUES (?)");
            ps.setString(1, "Ali");
            ps.executeUpdate();
            // dogrula...
        }
    }
}
```

**Chapter 152: Java ile Performance Test**

**Section 152.1: JMH ile Mikro Benchmark**

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 3)
@Measurement(iterations = 5)
@State(Scope.Thread)
public class CollectionBenchmark {
    private List<Integer> arrayList;
    private List<Integer> linkedList;

    @Setup
    public void setup() {
        arrayList = new ArrayList<>();
        linkedList = new LinkedList<>();
        for (int i = 0; i < 10000; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }
    }

    @Benchmark
    public int arrayListGet() {
        return arrayList.get(5000);
    }

    @Benchmark
    public int linkedListGet() {
        return linkedList.get(5000);
    }
}
```

**Chapter 153: Java ile Data Provider**

**Section 153.1: TestNG DataProvider**

```java
@DataProvider(name = "loginData", parallel = true)
public Object[][] loginData() {
    return new Object[][] {
        {"admin", "Admin123!", true},
        {"user", "User123!", true},
        {"invalid", "wrong", false},
        {"", "", false}
    };
}

@Test(dataProvider = "loginData")
public void testLogin(String username, String password, boolean expectedSuccess) {
    boolean actualSuccess = loginPage.login(username, password);
    assertEquals(actualSuccess, expectedSuccess,
        "Login sonucu bekleniyor: " + expectedSuccess);
}
```

**Chapter 154: Java ile Screenshot ve Video**

**Section 154.1: Selenium Screenshot**

```java
// Sayfa screenshotu
TakesScreenshot ts = (TakesScreenshot) driver;
File screenshot = ts.getScreenshotAs(OutputType.FILE);
Files.copy(screenshot.toPath(),
    Path.of("screenshots/test-" + System.currentTimeMillis() + ".png"),
    StandardCopyOption.REPLACE_EXISTING);

// Element screenshotu (Selenium 4)
WebElement element = driver.findElement(By.id("login-form"));
File elementShot = element.getScreenshotAs(OutputType.FILE);
```

**Chapter 155: Java ile Custom Exception Hierarchy**

**Section 155.1: Exception Hiyerarsisi**

```java
// Temel framework exception
public class FrameworkException extends RuntimeException {
    public FrameworkException(String message) { super(message); }
    public FrameworkException(String message, Throwable cause) { super(message, cause); }
}

// Ozel exception'lar
public class ElementNotFoundException extends FrameworkException {
    private final String locator;
    public ElementNotFoundException(String locator) {
        super("Element bulunamadi: " + locator);
        this.locator = locator;
    }
    public String getLocator() { return locator; }
}

public class PageLoadTimeoutException extends FrameworkException {
    private final int timeoutSeconds;
    public PageLoadTimeoutException(String page, int timeout) {
        super(page + " sayfasi " + timeout + " saniyede yuklenmedi");
        this.timeoutSeconds = timeout;
    }
}
```

**Chapter 156: Java ile Test Data Builder**

**Section 156.1: Test Data Builder Pattern**

```java
public class UserBuilder {
    private String name = "Test User";
    private String email = "test@example.com";
    private String role = "USER";
    private boolean active = true;

    public UserBuilder withName(String name) { this.name = name; return this; }
    public UserBuilder withEmail(String email) { this.email = email; return this; }
    public UserBuilder withRole(String role) { this.role = role; return this; }
    public UserBuilder inactive() { this.active = false; return this; }

    public User build() {
        return new User(name, email, role, active);
    }

    // Random veri
    public UserBuilder withRandomName() {
        this.name = "User_" + UUID.randomUUID().toString().substring(0, 8);
        return this;
    }
}

// Kullanim
User admin = new UserBuilder().withName("Ali").withRole("ADMIN").build();
User inactive = new UserBuilder().withRandomName().inactive().build();
```

**Chapter 157: Java ile Retry Mekanizmasi**

**Section 157.1: Test Retry Implementasyonu**

```java
public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY = 3;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            System.out.println("Test tekrar deneniyor: " + result.getName()
                + " (Deneme " + (retryCount + 1) + "/" + MAX_RETRY + ")");
            retryCount++;
            return true;
        }
        return false;
    }
}

// Kullanim
@Test(retryAnalyzer = RetryAnalyzer.class)
public void flakeyTest() { }
```

**Chapter 158: Java ile Soft Assertions**

**Section 158.1: Soft Assert Kullanimi**

```java
// TestNG SoftAssert
SoftAssert softAssert = new SoftAssert();
softAssert.assertEquals(page.getTitle(), "Ana Sayfa", "Baslik hatali");
softAssert.assertTrue(page.isLogoutButtonVisible(), "Cikis butonu gozukmuyor");
softAssert.assertEquals(user.getRole(), "ADMIN", "Rol yanlis");
softAssert.assertAll(); // Tum hatalari birlestirip raporlar

// AssertJ ile
assertSoftly(soft -> {
    soft.assertThat(response.getStatusCode()).isEqualTo(200);
    soft.assertThat(response.getBody()).contains("success");
    soft.assertThat(response.getResponseTime()).isLessThan(3000);
});
```

**Chapter 159: Java ile Configuration Management**

**Section 159.1: Config Yonetimi**

```java
public class ConfigManager {
    private static ConfigManager instance;
    private Properties props = new Properties();

    private ConfigManager() {
        String env = System.getProperty("env", "qa");
        try (InputStream is = getClass().getResourceAsStream(
                "/config/" + env + ".properties")) {
            props.load(is);
        } catch (IOException e) {
            throw new RuntimeException("Config yuklenemedi: " + env, e);
        }
        // System properties override edilebilir
        props.putAll(System.getProperties());
    }

    public static ConfigManager get() {
        if (instance == null) instance = new ConfigManager();
        return instance;
    }

    public String getBrowser() { return props.getProperty("browser", "chrome"); }
    public String getBaseUrl() { return props.getProperty("base.url"); }
    public int getTimeout() { return Integer.parseInt(props.getProperty("timeout", "30")); }
}
```

**Chapter 160: Java ile Test Kategorileri**

**Section 160.1: JUnit 5 Tags ile Test Kategorisi**

```java
@Test
@Tag("smoke")
@Tag("login")
public void smokeLoginTest() { }

@Test
@Tag("regression")
public void regressionTest() { }
```

```bash
# Sadece smoke testleri calistir
mvn test -Dgroups=smoke

# Regression'i hariÃ§ tut
mvn test -DexcludedGroups=regression
```

**Chapter 161: Java ile Test Paralel Execution**

**Section 161.1: JUnit 5 Paralel Execution**

```properties
# junit-platform.properties
junit.jupiter.execution.parallel.enabled=true
junit.jupiter.execution.parallel.mode.default=concurrent
junit.jupiter.execution.parallel.mode.classes.default=concurrent
junit.jupiter.execution.parallel.config.strategy=fixed
junit.jupiter.execution.parallel.config.fixed.parallelism=4
```

```java
@Execution(ExecutionMode.CONCURRENT)
class ParallelTest {
    @Test void test1() { }
    @Test void test2() { }
    @Test void test3() { }
}
```

**Chapter 162: Java ile Test Listener**

**Section 162.1: TestNG Listener Implementasyonu**

```java
public class TestListener implements ITestListener, ISuiteListener {
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Basladi: " + result.getName());
    }
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("PASS: " + result.getName());
    }
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("FAIL: " + result.getName());
        takeScreenshot(result.getName());
    }
    @Override
    public void onStart(ISuite suite) {
        System.out.println("Suite basliyor: " + suite.getName());
    }
    @Override
    public void onFinish(ISuite suite) {
        System.out.println("Suite bitti: " + suite.getName());
    }
}
```

**Chapter 163: Java ile Page Factory**

**Section 163.1: Genis Page Object Ornegi**

```java
public class ProductPage extends BasePage {
    @FindBy(css = ".product-title")
    private List<WebElement> productTitles;

    @FindBy(css = ".add-to-cart")
    private List<WebElement> addToCartButtons;

    @FindBy(id = "cart-count")
    private WebElement cartCount;

    @FindBy(id = "search-box")
    private WebElement searchBox;

    public ProductPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 10), this);
    }

    public void addFirstProductToCart() {
        waitForElements(addToCartButtons);
        addToCartButtons.get(0).click();
    }

    public void searchProduct(String keyword) {
        searchBox.clear();
        searchBox.sendKeys(keyword);
        searchBox.sendKeys(Keys.ENTER);
    }

    public List<String> getProductNames() {
        return productTitles.stream()
            .map(WebElement::getText)
            .collect(Collectors.toList());
    }
}
```

**Chapter 164: Java ile Zaman Asimi ve Bekleme**

**Section 164.1: WebDriverWait ile Beklemeler**

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Elementin gorunmesini bekle
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("result")));

// Elementin tiklanabilir olmasini bekle
wait.until(ExpectedConditions.elementToBeClickable(By.css("button#submit"))).click();

// URL degisimini bekle
wait.until(ExpectedConditions.urlContains("/dashboard"));

// Custom bekleme
wait.until(driver -> driver.findElements(By.css(".spinner")).isEmpty());

// FluentWait ile polling
FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);
```

**Chapter 165: Java ile Excel ile DDT**

**Section 165.1: Data-Driven Testing ile Excel**

```java
@DataProvider(name = "loginFromExcel")
public Object[][] getLoginData() throws Exception {
    List<Object[]> data = new ArrayList<>();
    try (Workbook wb = WorkbookFactory.create(new File("test-data.xlsx"))) {
        Sheet sheet = wb.getSheet("LoginData");
        for (int i = 1; i <= sheet.getLastRowNum(); i++) { // 0=header
            Row row = sheet.getRow(i);
            data.add(new Object[]{
                row.getCell(0).getStringCellValue(), // username
                row.getCell(1).getStringCellValue(), // password
                row.getCell(2).getBooleanCellValue()  // expected
            });
        }
    }
    return data.toArray(new Object[0][]);
}
```

**Chapter 166: Java ile Sinirlayici Deseni (Throttling)**

**Section 166.1: Rate Limiter ile API Istek Sinirlamasi**

```java
// Guava RateLimiter ile
RateLimiter limiter = RateLimiter.create(5.0); // Saniyede 5 istek

public Response callApi(String endpoint) {
    limiter.acquire(); // Saniyede 5'ten fazla istek gonderilmez
    return httpClient.get(endpoint);
}

// Manuel implementation
class RateLimiter {
    private final int maxRequestsPerSecond;
    private final Queue<Long> requestTimes = new LinkedList<>();

    public RateLimiter(int maxRps) { this.maxRequestsPerSecond = maxRps; }

    public synchronized void acquire() throws InterruptedException {
        long now = System.currentTimeMillis();
        requestTimes.removeIf(t -> now - t > 1000);
        if (requestTimes.size() >= maxRequestsPerSecond) {
            Thread.sleep(1000 - (now - requestTimes.peek()));
        }
        requestTimes.add(System.currentTimeMillis());
    }
}
```

**Chapter 167: Java ile Decorator ve Proxy Testler**

**Section 167.1: WebDriver Wrapper**

```java
public class LoggingWebDriver implements WebDriver {
    private final WebDriver delegate;
    private final Logger log = LoggerFactory.getLogger(LoggingWebDriver.class);

    public LoggingWebDriver(WebDriver driver) { this.delegate = driver; }

    @Override
    public void get(String url) {
        log.info("Navigating to: {}", url);
        delegate.get(url);
    }

    @Override
    public WebElement findElement(By by) {
        log.debug("Finding element: {}", by);
        return delegate.findElement(by);
    }

    @Override
    public String getTitle() { return delegate.getTitle(); }

    // Diger WebDriver metotlari delegate'e yonlendirilir
    @Override
    public void quit() {
        log.info("Closing browser");
        delegate.quit();
    }
    // ... (diger metotlar)
}
```

**Chapter 168: Java ile Paralel API Testing**

**Section 168.1: Paralel HTTP Istekleri**

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
HttpClient client = HttpClient.newHttpClient();

List<CompletableFuture<String>> futures = IntStream.range(1, 11)
    .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://api.example.com/users/" + i))
                .build();
            return client.send(req, HttpResponse.BodyHandlers.ofString()).body();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }, executor))
    .collect(Collectors.toList());

List<String> results = futures.stream()
    .map(CompletableFuture::join)
    .collect(Collectors.toList());

executor.shutdown();
```

**Chapter 169: Java ile Sinif Tasarimi**

**Section 169.1: Fluent Builder Pattern**

```java
public class ApiRequest {
    private final String method;
    private final String endpoint;
    private final Map<String, String> headers;
    private final Map<String, String> queryParams;
    private final String body;

    private ApiRequest(Builder b) {
        this.method = b.method;
        this.endpoint = b.endpoint;
        this.headers = Map.copyOf(b.headers);
        this.queryParams = Map.copyOf(b.queryParams);
        this.body = b.body;
    }

    public static class Builder {
        private String method = "GET";
        private String endpoint;
        private Map<String, String> headers = new HashMap<>();
        private Map<String, String> queryParams = new HashMap<>();
        private String body;

        public Builder get(String endpoint) { this.method = "GET"; this.endpoint = endpoint; return this; }
        public Builder post(String endpoint) { this.method = "POST"; this.endpoint = endpoint; return this; }
        public Builder header(String k, String v) { headers.put(k, v); return this; }
        public Builder param(String k, String v) { queryParams.put(k, v); return this; }
        public Builder body(String body) { this.body = body; return this; }
        public ApiRequest build() { return new ApiRequest(this); }
    }
}

// Kullanim
ApiRequest req = new ApiRequest.Builder()
    .get("/api/users")
    .header("Authorization", "Bearer " + token)
    .param("page", "1")
    .param("size", "20")
    .build();
```

**Chapter 170: Java ile Test Sonuclari Analizi**

**Section 170.1: TestNG Sonuc Analizi**

```java
public class ResultAnalyzer implements ISuiteListener {
    @Override
    public void onFinish(ISuite suite) {
        Map<String, ISuiteResult> results = suite.getResults();
        for (Map.Entry<String, ISuiteResult> entry : results.entrySet()) {
            ITestContext context = entry.getValue().getTestContext();
            int passed = context.getPassedTests().size();
            int failed = context.getFailedTests().size();
            int skipped = context.getSkippedTests().size();
            int total = passed + failed + skipped;

            System.out.printf("Sonuclar: %d/%d gecti (%.1f%%)%n",
                passed, total, 100.0 * passed / total);

            context.getFailedTests().getAllResults().forEach(r ->
                System.out.println("FAIL: " + r.getName() + " - " + r.getThrowable().getMessage()));
        }
    }
}
```

**Chapter 171: Java ile Logging Framework Entegrasyonu**

**Section 171.1: MDC (Mapped Diagnostic Context)**

```java
// Thread-specific log bilgisi ekleme
public class TestBase {
    @BeforeMethod
    public void setUp(Method method) {
        MDC.put("testName", method.getName());
        MDC.put("browser", ConfigManager.get().getBrowser());
        MDC.put("threadId", String.valueOf(Thread.currentThread().getId()));
    }

    @AfterMethod
    public void tearDown() {
        MDC.clear();
    }
}
```

```xml
<!-- logback.xml -->
<pattern>%d{HH:mm:ss} [%thread] [%X{testName}] %-5level - %msg%n</pattern>
```

**Chapter 172: Java ile Component Testing**

**Section 172.1: Spring Component Test**

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "app.feature.newFlow=false"
})
class OrderServiceIntegrationTest {
    @Autowired
    private OrderService orderService;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    @Transactional
    void createOrder_ShouldPersistAndReturn() {
        User user = entityManager.persist(new User("Ali", "ali@test.com"));
        Order order = orderService.create(user.getId(), List.of("item1", "item2"));
        assertNotNull(order.getId());
        assertEquals(2, order.getItems().size());
    }
}
```

**Chapter 173: Java ile Concurrency Testing**

**Section 173.1: Thread Safety Test**

```java
@Test
void counterShouldBeThreadSafe() throws InterruptedException {
    AtomicInteger counter = new AtomicInteger(0);
    int threadCount = 100;
    CountDownLatch latch = new CountDownLatch(threadCount);
    ExecutorService exec = Executors.newFixedThreadPool(threadCount);

    for (int i = 0; i < threadCount; i++) {
        exec.submit(() -> {
            counter.incrementAndGet();
            latch.countDown();
        });
    }

    latch.await(10, TimeUnit.SECONDS);
    exec.shutdown();
    assertEquals(threadCount, counter.get());
}
```

**Chapter 174: Java ile Input Validation**

**Section 174.1: Bean Validation (Jakarta/Javax)**

```java
public class UserRequest {
    @NotNull(message = "Ad bos olamaz")
    @Size(min = 2, max = 50)
    private String name;

    @NotNull
    @Email(message = "Gecersiz email")
    private String email;

    @Min(value = 18, message = "18 yas alti kayit yapilamaz")
    @Max(value = 120)
    private int age;

    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d).{8,}$",
             message = "Sifre en az 8 karakter, 1 buyuk harf ve 1 rakam icermeli")
    private String password;
}

// Dogrulama
Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
Set<ConstraintViolation<UserRequest>> violations = validator.validate(request);
if (!violations.isEmpty()) {
    violations.forEach(v -> System.out.println(v.getMessage()));
}
```

**Chapter 175: Java ile Ozet ve Gelismis Konular**

**Section 175.1: Java 21 Virtual Threads (Preview)**

```java
// Virtual thread ile yuksek yogunluklu concurrency
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10000).forEach(i ->
        executor.submit(() -> {
            Thread.sleep(Duration.ofMillis(100));
            return i;
        })
    );
} // executor.close() - tum goreyler biter
```

**Section 175.2: Java 21 Sequenced Collections**

```java
// SequencedCollection (Java 21)
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
list.getFirst(); // "a"
list.getLast();  // "c"
list.addFirst("z"); // ["z", "a", "b", "c"]
list.addLast("d");  // ["z", "a", "b", "c", "d"]
list.removeFirst(); // ["a", "b", "c", "d"]
list.reversed();    // ["d", "c", "b", "a"] (view)
```

**Chapter 176: Java ile Guvenlik - OWASP**

**Section 176.1: SQL Injection Onleme**

```java
// GUVENLI: PreparedStatement kullan
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, username);
ps.setString(2, hashedPassword);

// GUVENLI DEGIL: String birlestirme
String badSql = "SELECT * FROM users WHERE username = '" + username + "'";
// ' OR '1'='1 gibi injection'lara aciktir!
```

**Section 176.2: XSS Onleme**

```java
// HTML encode etme
String safe = StringEscapeUtils.escapeHtml4(userInput);

// OWASP Java Encoder
String safeHtml = Encode.forHtml(userInput);
String safeJs = Encode.forJavaScript(userInput);
String safeCss = Encode.forCssString(userInput);
```

**Chapter 177: Java ile Continuous Improvement**

**Section 177.1: Code Review Kontrol Listesi**

Iyi bir Java kodu incelerken kontrol edilmesi gerekenler:

1. **Guvenlik**: SQL injection, XSS, null pointer, BufferOverflow
2. **Performans**: N+1 query, bellek sizintisi, gereksiz nesne olusturma
3. **Okunabilirlik**: Anlamli isimler, kucuk fonksiyonlar, yorum yok (kod kendini anlatmali)
4. **Test edilebilirlik**: DI kullanimi, bagimliliklar soyutlama
5. **Exception handling**: Uygun catch'ler, kaynak temizleme
6. **Thread safety**: Paylasilan state, synchronized/volatile kullanimi
7. **API tasarimi**: Immutable, Builder, Factory desenleri

**Chapter 178: Java ile Best Practices**

**Section 178.1: Java En Iyi Uygulamalar**

```java
// 1. String birlestirmede StringBuilder kullan
// Kotu:
String result = "";
for (String s : list) result += s;
// Iyi:
StringBuilder sb = new StringBuilder();
list.forEach(sb::append);

// 2. Koleksiyonu null degil bos dondur
public List<String> getItems() {
    if (items == null) return Collections.emptyList();
    return Collections.unmodifiableList(items);
}

// 3. Checked Exception yerine RuntimeException tercih et
// API kullananlar try-catch'e zorlanmaz

// 4. Constants sinifi yerine enum kullan
enum Status { PENDING, RUNNING, PASSED, FAILED, SKIPPED }

// 5. instanceof yerine polymorphism kullan
// Kotu:
if (animal instanceof Dog) ((Dog)animal).bark();
// Iyi:
animal.makeSound(); // Polymorphism

// 6. Magic number kullanma
// Kotu:
if (timeout > 30) { }
// Iyi:
private static final int MAX_TIMEOUT_SECONDS = 30;
if (timeout > MAX_TIMEOUT_SECONDS) { }
```

**Chapter 179: Java ile Mimariler**

**Section 179.1: Katmanli Mimari**

```
+------------------+
|  Presentation    |  Controller/View
+------------------+
|  Business Logic  |  Service
+------------------+
|  Data Access     |  Repository/DAO
+------------------+
|  Database        |  MySQL/PostgreSQL
+------------------+
```

```java
// Repository katmani
@Repository
public class UserRepository {
    public User findById(Long id) { /* veritabani sorgusu */ }
    public void save(User user) { /* kaydetme */ }
}

// Service katmani
@Service
public class UserService {
    @Autowired private UserRepository repo;
    public User getUser(Long id) { return repo.findById(id); }
}

// Controller katmani
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired private UserService service;
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(service.getUser(id));
    }
}
```

**Chapter 180: Java ile Gelecek Trenleri**

**Section 180.1: Modern Java Ekosistemi**

- **GraalVM**: Java uygulamalarini native binary'e derler (cok daha hizli baslangic)
- **Project Loom**: Virtual threads ile yuksek concurrency (Java 21'de stable)
- **Project Panama**: Native kod entegrasyonu kolaylastiriliyor
- **Spring Boot 3.x**: GraalVM native image destegi
- **Quarkus**: Cloud-native, Kubernetes-first Java framework
- **Micronaut**: AOT compilation, reflection-free DI
- **Helidon**: Oracle'in cloud-native Java framework'u
- **Jakarta EE**: Java EE'nin yeni adi, aktif gelistirme surec

**Chapter 181: Credits ve Indeks**

**Section 181.1: Bu Kitap Hakkinda**

Bu kitap *Java Notes for Professionals* - Stack Overflow Documentation'dan derlenmistir. Icerik Stack Overflow katilimcilari tarafindan Creative Commons BY-SA lisansi altinda yazilmistir.

Turkce cevirisi, QA Otomasyonu Ogrenme Platformu icin hazirlanmistir. Yerlesik Ingilizce yazilim terimleri (String, class, interface, method, thread, vb.) cevrilmemistir.

**Onemli Java Kaynaklari:**
- Oracle Java Dokumantasyonu: docs.oracle.com/javase
- Stack Overflow Java Etiketi: stackoverflow.com/questions/tagged/java
- Baeldung Java Rehberleri: baeldung.com
- Java Spesifikasyonu: jcp.org
- OpenJDK: openjdk.org

**Sik Kullanilan Java Kutuphaneleri (QA Icin):**
- **Selenium**: Web tarayici otomasyonu
- **Playwright**: Modern web test framework
- **RestAssured**: REST API testi
- **JUnit 5 / TestNG**: Test framework
- **Mockito**: Mock testing
- **Allure / ExtentReports**: Test raporlama
- **WireMock**: API mocking
- **TestContainers**: Entegrasyon testi icin Docker konteyner yonetimi
- **Cucumber**: BDD framework
- **Apache POI**: Excel ile data-driven testing
- **Jackson / Gson**: JSON isleme
- **SLF4J + Logback**: Logging

