import { supabase } from './supabaseClient'

const TABLE = 'chat_messages'
const CHANNEL = 'learnqa-chat'

export async function loadRecentMessages(limit = 50) {
    const { data, error } = await supabase
        .from(TABLE)
        .select('id, user_id, display_name, message, created_at')
        .order('created_at', { ascending: false })
        .limit(limit)
    if (error) throw error
    return (data || []).slice().reverse()
}

export async function sendChatMessage({ userId, displayName, message }) {
    const cleaned = message.trim()
    if (!cleaned) throw new Error('Mesaj boş olamaz.')
    const { error } = await supabase
        .from(TABLE)
        .insert({ user_id: userId, display_name: displayName || null, message: cleaned })
    if (error) throw error
}

// onInsert callback'i her yeni mesajda çalışır; dönen fonksiyon aboneliği kapatır.
export function subscribeToChat(onInsert) {
    const channel = supabase
        .channel(CHANNEL)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLE }, (payload) => {
            onInsert(payload.new)
        })
        .subscribe()

    return () => supabase.removeChannel(channel)
}
