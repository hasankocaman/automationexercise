import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

// supabase is null when env vars are missing (e.g. prod build before secrets are set)
// so the rest of the app can render without crashing while auth features stay disabled.
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null

export const isPremiumEnabled = import.meta.env.VITE_ENABLE_PREMIUM === 'true'
