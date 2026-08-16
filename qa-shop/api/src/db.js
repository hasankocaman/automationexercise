// PostgreSQL bağlantı havuzu.
import pg from 'pg'

// ⚠ pg sürücüsü `numeric` (OID 1700) tipini VARSAYILAN OLARAK STRING döndürür.
// Nedeni sağlam: JavaScript'in double'ı 15 haneden sonra hassasiyet kaybeder,
// sürücü sessizce para kaybettirmektense string vermeyi tercih eder.
//
// Ama bu, fark edilmediğinde şu hataya yol açar:
//     "100.00" + "29.90"  →  "100.0029.90"
// yani toplama yerine birleştirme. Tutar alanlarında bu, hiçbir yerde hata
// vermeden yanlış fatura üretir.
//
// Bu projede tutarlar en fazla birkaç bin TL — double aralığında güvenli.
// Bu yüzden sayıya çeviriyoruz VE her tutar hesabı `round2` ile kapatılıyor
// (bkz. core/pricing.js). Gerçek bir finans sisteminde doğru karar farklı
// olurdu: string bırakıp decimal kütüphanesiyle çalışmak.
pg.types.setTypeParser(1700, (value) => (value === null ? null : Number.parseFloat(value)))
// int8 (bigserial) da string döner; id'ler Number.MAX_SAFE_INTEGER'ın çok altında.
pg.types.setTypeParser(20, (value) => (value === null ? null : Number.parseInt(value, 10)))

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
        || 'postgres://qashop:qashop@localhost:5432/qashop',
    max: Number.parseInt(process.env.PG_POOL_MAX || '10', 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
})

pool.on('error', (err) => {
    console.error('[db] havuzda beklenmeyen hata:', err.message)
})

export function query(text, params) {
    return pool.query(text, params)
}

// Tek bir bağlantıda transaction. Checkout gibi çok adımlı işlemler bunu
// KULLANMAK ZORUNDA: stok düşme ile sipariş yazma arasında bir hata olursa,
// stok düşmüş ama sipariş oluşmamış bir durum kalmamalı.
export async function withTransaction(fn) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const result = await fn(client)
        await client.query('COMMIT')
        return result
    } catch (err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}

export async function healthCheck() {
    const { rows } = await pool.query('select 1 as ok')
    return rows[0]?.ok === 1
}
