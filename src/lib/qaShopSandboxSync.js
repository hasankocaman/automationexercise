// QA Shop alan anahtarının üye hesabına senkronu.
//
// ── SORUN ───────────────────────────────────────────────────────────────────
// Kendi veri alanının anahtarı yalnızca tarayıcıda duruyordu. Başka bir
// makineye geçen ya da tarayıcı verisini temizleyen kişi, içinde sipariş ve
// defect geçmişi olan alanına bir daha ULAŞAMIYORDU: anahtar kaybolunca alan
// sunucuda öksüz kalıyor, kullanıcı sıfırdan yeni bir alan açıyordu.
//
// ── NEDEN SUNUCUDA DEĞİL, ÜYE PROFİLİNDE ────────────────────────────────────
// Anahtarı QA Shop API'sinin kendisinde kişiye bağlamak, o API'nin site
// üyeliğine GÜVENMESİNİ gerektirirdi — oysa pratik yığını siteden tamamen
// bağımsızdır ve kimliği doğrulayamaz. Doğrulanmamış bir e-postaya bakarak
// alan döndüren bir uç, "başkasının e-postasını yaz, alanına gir" demek olurdu.
// Bu yüzden hatırlama işi zaten kimliği doğrulanmış olan TARAFTA yapılır:
// anahtar üyenin kendi profil satırında saklanır. Yığın hiç değişmez.
//
// ── HATA TOLERANSI (bilinçli) ───────────────────────────────────────────────
// Sütun henüz eklenmemişse ya da istek düşerse burada HİÇBİR ŞEY patlamaz;
// sessizce `null` döner ve dükkân eskisi gibi tarayıcıdaki anahtarla çalışır.
// Üyelik bu deneyimin senkron katmanıdır, ön koşulu değil — anonim kullanıcı
// da her şeyi yapabilmelidir.
//
// Sütun tek seferlik olarak şöyle eklenir:
//   alter table profiles add column if not exists qa_shop_sandbox_key text;
import { supabase, isSupabaseConfigured } from './supabaseClient'

const SUTUN = 'qa_shop_sandbox_key'

function kullanilabilir(session) {
    return Boolean(isSupabaseConfigured && supabase && session?.user?.id)
}

// Üyenin kayıtlı alan anahtarı. Yoksa, okunamıyorsa ya da sütun eksikse null.
export async function uyeAlanAnahtariniOku(session) {
    if (!kullanilabilir(session)) return null
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select(SUTUN)
            .eq('id', session.user.id)
            .maybeSingle()
        if (error) {
            // Sütun yoksa PostgREST 42703/PGRST204 döner. Bu bir arıza değil,
            // "bu kurulumda senkron kapalı" demektir.
            console.debug('QA Shop alan anahtarı okunamadı (senkron kapalı):', error.message)
            return null
        }
        const anahtar = data?.[SUTUN]
        return typeof anahtar === 'string' && anahtar.trim() ? anahtar.trim() : null
    } catch (e) {
        console.debug('QA Shop alan anahtarı okunamadı:', e?.message ?? e)
        return null
    }
}

// Anahtarı üye profiline yazar. `null` göndermek kaydı siler.
// Dönüş: yazma gerçekten oldu mu — çağıran buna göre kullanıcıya bilgi verebilir.
export async function uyeAlanAnahtariniYaz(session, anahtar) {
    if (!kullanilabilir(session)) return false
    try {
        const { error } = await supabase
            .from('profiles')
            .update({ [SUTUN]: anahtar || null })
            .eq('id', session.user.id)
        if (error) {
            console.debug('QA Shop alan anahtarı yazılamadı (senkron kapalı):', error.message)
            return false
        }
        return true
    } catch (e) {
        console.debug('QA Shop alan anahtarı yazılamadı:', e?.message ?? e)
        return false
    }
}
