import { supabase } from './supabaseClient'

const TABLE = 'lesson_comments'

// Yorumlar herkese (üye olmayan ziyaretçiye de) açık okunur — sadece yazmak üyelik gerektirir.
export async function loadComments(pagePath, limit = 30) {
    const { data, error } = await supabase
        .from(TABLE)
        .select('id, user_id, display_name, avatar_url, avatar_emoji, comment, created_at')
        .eq('page_path', pagePath)
        .order('created_at', { ascending: false })
        .limit(limit)
    if (error) throw error
    return data || []
}

export async function submitComment({ userId, displayName, avatarUrl, avatarEmoji, pagePath, comment }) {
    const cleaned = comment.trim()
    if (cleaned.length < 2) throw new Error('Yorum en az 2 karakter olmalı.')
    const { error } = await supabase
        .from(TABLE)
        .insert({
            user_id: userId,
            display_name: displayName || null,
            avatar_url: avatarUrl || null,
            avatar_emoji: avatarEmoji || null,
            page_path: pagePath,
            comment: cleaned,
        })
    if (error) throw error
}
