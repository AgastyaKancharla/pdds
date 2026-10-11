import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const env: Record<string, string | undefined> =
  (typeof import.meta !== 'undefined' && (import.meta.env as unknown as Record<string, string | undefined>)) ||
  {};

const supabaseUrl =
  env.VITE_SUPABASE_URL ||
  env.EXPO_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } else {
    console.warn(
      '[HereForNature] Supabase credentials not found. The app will use local storage for history.'
    );
  }
} catch (err) {
  console.error('[HereForNature] Failed to initialize Supabase client:', err);
}

export { supabase };
