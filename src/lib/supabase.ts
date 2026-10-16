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

/**
 * A typo'd or rotated env var doesn't throw -- createClient() happily accepts any string, and
 * every real failure then surfaces only as an opaque network/auth error deep in some unrelated
 * screen's try/catch, indistinguishable from "Supabase is just unreachable right now." These
 * checks catch the two cheapest, most common misconfigurations (wrong host, non-JWT key) at
 * startup instead, as a console diagnostic only -- never user-facing, never a thrown error, and
 * the client is still created either way so behavior for real users is unchanged.
 */
export function isPlausibleSupabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
}

export function isPlausibleAnonKey(key: string): boolean {
  return key.split('.').length === 3;
}

try {
  if (supabaseUrl && supabaseAnonKey) {
    if (!isPlausibleSupabaseUrl(supabaseUrl)) {
      console.error(
        `[HereForNature] VITE_SUPABASE_URL doesn't look like a real Supabase project URL (got "${supabaseUrl}"). Cloud sync will fail silently and fall back to local-only storage until this is fixed.`
      );
    }
    if (!isPlausibleAnonKey(supabaseAnonKey)) {
      console.error(
        "[HereForNature] VITE_SUPABASE_ANON_KEY doesn't look like a real Supabase anon key (expected a JWT). Cloud sync will fail silently and fall back to local-only storage until this is fixed."
      );
    }
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
