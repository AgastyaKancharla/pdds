import { supabase } from './supabase';

/**
 * scan_history/users RLS policies key off auth.uid(), and the app has no
 * login screen. Anonymous Supabase auth gives each device a stable uid
 * without any UI, which is what makes History/save-scan work at all.
 * Requires "Anonymous Sign-Ins" enabled in Supabase Auth settings.
 */
export async function ensureAnonymousSession() {
  if (!supabase) {
    console.warn('[HereForNature] Supabase client not available — skipping anonymous session.');
    return null;
  }

  const { data } = await supabase.auth.getSession();
  if (data.session) {
    return data.session;
  }

  const { data: signInData, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.warn(
      'Anonymous sign-in failed. Enable "Anonymous Sign-Ins" in Supabase Auth settings.',
      error.message
    );
    return null;
  }
  return signInData.session;
}
