# QA Shop — seed verisi gömülü PostgreSQL imajı
#
# Depodaki `docker-compose.yml` şema ve seed dosyalarını host'tan BAĞLAR
# (bind mount). Bu, repoyu klonlamış biri için en iyi seçenek: dosyayı
# değiştirip `down -v` ile yeniden yükleyebilir.
#
# Ama repoyu indirmeyen biri için o yol kapalıdır — bağlanacak dosya yok.
# Bu imaj tam bu boşluğu kapatır: şema ve seed veri İMAJIN İÇİNDE.
#
# Neden veri dizini önceden hazırlanmış olarak GÖMÜLMÜYOR (ilk açılışta
# seed verisi yükleniyor)? Çünkü resmî postgres imajı `/var/lib/postgresql/data` yolunu
# `VOLUME` olarak beyan eder; türetilmiş bir imajda o yola yazılan katman
# derleme sonunda SESSİZCE ATILIR. Yani "önceden initdb edilmiş imaj" ancak
# PGDATA'yı başka bir dizine taşıyıp runtime'da oraya işaret ederek yapılır —
# postgres sürümüne sıkı sıkıya bağlı, kırılgan bir kurgu. Tohum veri küçük
# (birkaç saniye), bu karmaşıklığa değmez.

FROM postgres:16-alpine

# ─── Bağlantı bilgileri imaja gömülü ────────────────────────────────────────
# Böylece repo istemeyen kullanıcı hiçbir ortam değişkeni yazmadan
# `docker run` diyebilir. Bunlar SIR DEĞİL: lokal bir pratik ortamının
# bilinen kimlik bilgileri, README'de de aynen yazıyor. Bu imaj internete
# açık bir sunucuda çalıştırılmak için tasarlanmadı.
ENV POSTGRES_USER=qashop
ENV POSTGRES_PASSWORD=qashop
ENV POSTGRES_DB=qashop
# Türkçe karakterli veri için: imaj varsayılanı zaten UTF-8, açıkça
# sabitlemek makineden makineye farkı ortadan kaldırır.
ENV POSTGRES_INITDB_ARGS="--encoding=UTF8 --locale=C"

# ─── İlk açılışta çalışacak dosyalar ────────────────────────────────────────
# Alfabetik sırayla koşar: önce şema, sonra seed veri. Resmî entrypoint
# bunları `psql -v ON_ERROR_STOP=1` ile çalıştırır — yani `seed.sql` içindeki
# `\set` / `:'TPL'` psql meta-komutları çalışır VE bir hata olursa konteyner
# seed verisi yarım yüklenmiş hâlde ayakta kalmaz, açılış başarısız olur.
COPY schema.sql /docker-entrypoint-initdb.d/01-schema.sql
COPY seed.sql   /docker-entrypoint-initdb.d/02-seed.sql

# ─── Repo istemeyen kullanıcı için SQL test paketi ──────────────────────────
# `validation-queries.sql` BİLEREK initdb.d dışına konuyor: o bir test
# paketidir, kurulum script'i değil. initdb.d'ye konsaydı her açılışta
# kendiliğinden koşar ve kusur enjeksiyonu bölümü seed yüklemesinin parçası gibi
# görünürdü. Buradan elle çağrılır:
#
#   docker exec -it qashop-db psql -U qashop -d qashop \
#          -f /opt/qa-shop/validation-queries.sql
#
# Şema ve seed dosyaları da okunabilirlik için buraya kopyalanıyor: repoyu
# indirmeyen biri "bu veri nereden geldi" sorusunu imajın içinde yanıtlayabilir.
COPY validation-queries.sql /opt/qa-shop/validation-queries.sql
COPY schema.sql             /opt/qa-shop/schema.sql
COPY seed.sql               /opt/qa-shop/seed.sql

# ─── Sağlık kontrolü ────────────────────────────────────────────────────────
# `-h 127.0.0.1` ŞART, atlanamaz. Varsayılan olarak `pg_isready` Unix
# socket'ine bakar; resmî entrypoint ise seed yüklemesi sırasında sunucuyu
# `listen_addresses=''` ile YALNIZCA socket üstünde açar. Yani socket'e bakan
# bir kontrol, seed yüklemesi HENÜZ SÜRERKEN "sağlıklı" der ve API'yi yarım
# doldurulmuş bir veritabanına bağlar. TCP'ye bakan kontrol ancak gerçek
# sunucu ayağa kalkınca yeşile döner.
HEALTHCHECK --interval=5s --timeout=3s --start-period=30s --retries=20 \
    CMD pg_isready -h 127.0.0.1 -U qashop -d qashop

LABEL org.opencontainers.image.title="QA Shop veritabanı"
LABEL org.opencontainers.image.description="Test otomasyonu pratiği için seed verisi gömülü PostgreSQL 16 (18 tablo, deterministic veri)"
LABEL org.opencontainers.image.source="https://github.com/hasankocaman/automationexercise"
LABEL org.opencontainers.image.licenses="MIT"
