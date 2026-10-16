import { supabase } from './supabase';
import { getAuthenticatedUserId, getLocalUserId } from './auth';

/**
 * Before this, an uncaught error in a farmer's browser was invisible to us -- no crash
 * reporting, no way to know the app broke for someone in the field. This logs to the
 * write-only client_errors table (migration 007) on a best-effort basis: it must never throw,
 * never block the UI, and never loop (an error while logging an error, or a render loop that
 * throws repeatedly, must not turn into a flood of network requests), so logging is capped per
 * page load and every failure is swallowed silently.
 */
const MAX_LOGS_PER_SESSION = 10;
let logCount = 0;

export type ClientErrorSource = 'error_boundary' | 'window_onerror' | 'unhandled_rejection';

export async function logClientError(
  message: string,
  stack: string | null | undefined,
  source: ClientErrorSource,
  context?: Record<string, unknown>
): Promise<void> {
  if (logCount >= MAX_LOGS_PER_SESSION) return;
  logCount += 1;

  try {
    console.error(`[HereForNature] Uncaught error (${source}):`, message, stack);

    if (!supabase) return;
    const authUserId = await getAuthenticatedUserId().catch(() => null);
    await supabase.from('client_errors').insert({
      user_id: authUserId || getLocalUserId(),
      message: String(message).slice(0, 2000),
      stack: stack ? String(stack).slice(0, 4000) : null,
      source,
      url: typeof window !== 'undefined' ? window.location.href : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      context: context ? JSON.parse(JSON.stringify(context)) : null,
    });
  } catch {
    // Never let error logging itself throw or surface to the user.
  }
}

/**
 * Catches the two classes of error a React ErrorBoundary cannot: errors thrown outside a
 * component's render/lifecycle (event handlers, timers, non-React DOM code) and rejected
 * promises nobody awaited. Call once at startup.
 */
export function initGlobalErrorLogging(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event: ErrorEvent) => {
    logClientError(event.message || 'Unknown window error', event.error?.stack, 'window_onerror', {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    logClientError(message || 'Unhandled promise rejection', stack, 'unhandled_rejection');
  });
}
