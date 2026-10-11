import { supabase } from './supabase';
import { clearCacheForUser } from './cache/index';

const LOCAL_USER_KEY = 'herefornature_user_id';
let lastKnownAuthUserId: string | null = null;

// Listen for Supabase auth state changes to clean up user cache on sign out
if (supabase) {
  try {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.id) {
        if (lastKnownAuthUserId && lastKnownAuthUserId !== session.user.id) {
          // Account switched: clean up previous user's private local cache and history to prevent data leakage
          try {
            clearCacheForUser(lastKnownAuthUserId);
            if (typeof localStorage !== 'undefined') {
              localStorage.removeItem(`herefornature_history_${lastKnownAuthUserId}`);
            }
          } catch (e) {
            console.warn('[HereForNature] Account switch cleanup note:', e);
          }
        }
        lastKnownAuthUserId = session.user.id;
      }
      if (event === 'SIGNED_OUT') {
        if (lastKnownAuthUserId) {
          try {
            clearCacheForUser(lastKnownAuthUserId);
            if (typeof localStorage !== 'undefined') {
              localStorage.removeItem(`herefornature_history_${lastKnownAuthUserId}`);
            }
          } catch (e) {
            console.warn('[HereForNature] Cache cleanup error on auth state change:', e);
          }
          lastKnownAuthUserId = null;
        }
      }
    });
  } catch {
    // Graceful initialization in non-browser or mock environments
  }
}

/**
 * Returns local guest ID for browser-only localStorage tracking.
 * This is NEVER passed to Supabase cloud database to prevent orphaned/unauthenticated records.
 */
export function getLocalUserId(): string {
  if (typeof window === 'undefined') return 'guest-user';
  let uid = localStorage.getItem(LOCAL_USER_KEY);
  if (!uid) {
    uid = 'guest_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem(LOCAL_USER_KEY, uid);
  }
  return uid;
}

/**
 * Returns the verified Supabase Auth session user UUID, or null if unauthenticated.
 */
export async function getAuthenticatedUserId(): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user?.id || null;
    if (uid) {
      lastKnownAuthUserId = uid;
    }
    return uid;
  } catch (err) {
    console.warn('[HereForNature] Error fetching authenticated user ID:', err);
    return null;
  }
}

/**
 * Signs out the currently authenticated user, cleanly purging their private cached scans
 * and private local history to prevent cross-account data leakage.
 */
export async function signOutUser(): Promise<void> {
  try {
    const currentId = await getAuthenticatedUserId();
    const targetUserId = currentId || lastKnownAuthUserId;

    if (targetUserId) {
      try {
        clearCacheForUser(targetUserId);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(`herefornature_history_${targetUserId}`);
        }
      } catch (err) {
        console.warn('[HereForNature] Cache cleanup note on signout:', err);
      }
    }
    lastKnownAuthUserId = null;

    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (err) {
    console.warn('[HereForNature] Sign out note:', err);
  }
}

/**
 * Explicitly resets the guest session, purging all guest-isolated scan caches and local history,
 * then generating a brand new guest identity.
 * Does NOT touch authenticated records or global knowledge caches.
 */
export function resetGuestSession(): string {
  try {
    const oldGuestId = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_USER_KEY) : null;
    if (oldGuestId) {
      try {
        clearCacheForUser(oldGuestId);
      } catch (err) {
        console.warn('[HereForNature] Guest cache cleanup note:', err);
      }
    }

    if (typeof localStorage !== 'undefined') {
      try {
        if (oldGuestId) {
          localStorage.removeItem(`herefornature_history_${oldGuestId}`);
        }
        localStorage.removeItem('herefornature_history_guest');
        localStorage.removeItem('herefornature_history');
      } catch (err) {
        console.warn('[HereForNature] Guest history cleanup note:', err);
      }
    }

    const newGuestId = 'guest_' + Math.random().toString(36).substring(2, 11);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_USER_KEY, newGuestId);
    }
    return newGuestId;
  } catch (err) {
    console.warn('[HereForNature] Reset guest session note:', err);
    return 'guest_' + Math.random().toString(36).substring(2, 11);
  }
}

/**
 * Ensures an active Supabase anonymous session exists, returning the session.
 */
export async function ensureAnonymousSession() {
  if (!supabase) {
    return { user: { id: getLocalUserId() } };
  }

  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      if (data.session.user?.id) {
        lastKnownAuthUserId = data.session.user.id;
      }
      return data.session;
    }

    const { data: signInData, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.warn('[HereForNature] Anonymous sign-in note:', error.message);
      return { user: { id: getLocalUserId() } };
    }
    if (signInData.session?.user?.id) {
      lastKnownAuthUserId = signInData.session.user.id;
    }
    return signInData.session;
  } catch (err) {
    console.warn('[HereForNature] Auth error, using local guest session:', err);
    return { user: { id: getLocalUserId() } };
  }
}
