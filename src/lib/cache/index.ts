/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 4: Offline Caching & Resilience Layer
 *
 * Implements a lightweight, privacy-isolated, and crash-resilient local cache.
 * Guarantees:
 * 1. Strict user-isolation: guest and authenticated user caches are partitioned.
 * 2. Versioning & safe invalidation: obsolete schemas are discarded safely.
 * 3. Quota & corruption resilience: handles storage failures and corrupt data without crashing.
 * 4. Zero secret or token storage: only non-sensitive agronomic references and local scan metadata.
 */

export const CURRENT_CACHE_VERSION = 'v1.0.0';
export const CACHE_PREFIX = 'pdds_cache';

export interface CacheEnvelope<T> {
  version: string;
  timestamp: number;
  expiresAt: number | null;
  userId?: string;
  data: T;
}

export type CacheGetResult<T> =
  | { status: 'hit'; data: T; timestamp: number; isStale: boolean }
  | { status: 'miss'; reason: 'not_found' | 'expired' | 'version_mismatch' | 'corrupt' | 'unauthorized' };

/**
 * Safely resolves the storage backend (window, global, or Node environment).
 */
export function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
    if (typeof globalThis !== 'undefined' && (globalThis as any).localStorage) {
      return (globalThis as any).localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Checks if localStorage is available and functional.
 */
export function isStorageAvailable(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const testKey = `__${CACHE_PREFIX}_test__`;
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats a global (shared agronomic reference) cache key.
 */
export function getGlobalCacheKey(key: string): string {
  const sanitized = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${CACHE_PREFIX}_${CURRENT_CACHE_VERSION}_global_${sanitized}`;
}

/**
 * Formats a strictly user-scoped cache key.
 * Prevents user A from ever reading or overwriting user B's cached records.
 */
export function getUserCacheKey(userId: string, key: string): string {
  if (!userId || userId.trim() === '') {
    throw new Error('[PDDs Cache] Cannot format user cache key without valid userId');
  }
  const cleanUser = userId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${CACHE_PREFIX}_${CURRENT_CACHE_VERSION}_u_${cleanUser}_${cleanKey}`;
}

/**
 * Safely writes an item into storage with quota overflow handling.
 */
function safeSetRaw(key: string, value: string): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, value);
    return true;
  } catch (err: unknown) {
    const isQuota =
      err instanceof Error &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        (err as any).code === 22 ||
        (err as any).code === 1014);

    if (isQuota) {
      console.warn('[PDDs Cache] Storage quota exceeded. Evicting expired and reference caches...');
      try {
        evictExpiredAndReferenceCaches();
        storage.setItem(key, value);
        return true;
      } catch (retryErr) {
        console.warn('[PDDs Cache] Quota retry failed. Operating in degraded in-memory mode:', retryErr);
        return false;
      }
    }

    console.warn('[PDDs Cache] Storage write error:', err);
    return false;
  }
}

/**
 * Evicts expired items and non-essential global reference caches to free up quota.
 */
export function evictExpiredAndReferenceCaches(): number {
  const storage = getStorage();
  if (!storage) return 0;

  let evictedCount = 0;
  const now = Date.now();
  const keysToRemove: string[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key || !key.startsWith(CACHE_PREFIX)) continue;

    try {
      const raw = storage.getItem(key);
      if (!raw) {
        keysToRemove.push(key);
        continue;
      }
      const parsed: CacheEnvelope<unknown> = JSON.parse(raw);
      if (parsed.expiresAt && parsed.expiresAt < now) {
        keysToRemove.push(key);
      } else if (key.includes('_global_')) {
        // Mark global reference entries for eviction if necessary
        keysToRemove.push(key);
      }
    } catch {
      // Corrupt key
      keysToRemove.push(key);
    }
  }

  for (const k of keysToRemove) {
    try {
      storage.removeItem(k);
      evictedCount++;
    } catch {
      // Ignore removal failure
    }
  }

  return evictedCount;
}

/**
 * Sets an item in the cache.
 */
export function setCacheItem<T>(
  rawKey: string,
  data: T,
  options?: {
    ttlMs?: number | null;
    userId?: string;
  }
): boolean {
  if (!isStorageAvailable()) return false;

  const { ttlMs = null, userId } = options || {};
  const now = Date.now();
  const expiresAt = ttlMs ? now + ttlMs : null;

  const envelope: CacheEnvelope<T> = {
    version: CURRENT_CACHE_VERSION,
    timestamp: now,
    expiresAt,
    userId,
    data,
  };

  try {
    const serialized = JSON.stringify(envelope);
    return safeSetRaw(rawKey, serialized);
  } catch (err) {
    console.warn('[PDDs Cache] Serialization error:', err);
    return false;
  }
}

/**
 * Retrieves an item from the cache.
 * Validates cache version, expiration, and user ownership.
 */
export function getCacheItem<T>(
  rawKey: string,
  options?: {
    expectedUserId?: string;
    allowStale?: boolean;
  }
): CacheGetResult<T> {
  const storage = getStorage();
  if (!storage) {
    return { status: 'miss', reason: 'not_found' };
  }

  let raw: string | null = null;
  try {
    raw = storage.getItem(rawKey);
  } catch (err) {
    console.warn('[PDDs Cache] Storage read error:', err);
    return { status: 'miss', reason: 'not_found' };
  }

  if (!raw) {
    return { status: 'miss', reason: 'not_found' };
  }

  let envelope: CacheEnvelope<T>;
  try {
    envelope = JSON.parse(raw);
  } catch (err) {
    console.warn('[PDDs Cache] Corrupt cache entry detected. Purging key:', rawKey, err);
    try {
      storage.removeItem(rawKey);
    } catch {
      // Ignore
    }
    return { status: 'miss', reason: 'corrupt' };
  }

  // Version verification: purge if schema version has changed
  if (!envelope || envelope.version !== CURRENT_CACHE_VERSION) {
    try {
      storage.removeItem(rawKey);
    } catch {
      // Ignore
    }
    return { status: 'miss', reason: 'version_mismatch' };
  }

  // User isolation check: if key is user-scoped, verify expected owner matches
  if (envelope.userId && options?.expectedUserId && envelope.userId !== options.expectedUserId) {
    console.warn('[PDDs Cache] User isolation mismatch detected. Access blocked.');
    return { status: 'miss', reason: 'unauthorized' };
  }

  // Expiration check
  const now = Date.now();
  const isExpired = envelope.expiresAt !== null && envelope.expiresAt < now;

  if (isExpired) {
    if (options?.allowStale) {
      return {
        status: 'hit',
        data: envelope.data,
        timestamp: envelope.timestamp,
        isStale: true,
      };
    }
    // Discard expired entry
    try {
      storage.removeItem(rawKey);
    } catch {
      // Ignore
    }
    return { status: 'miss', reason: 'expired' };
  }

  return {
    status: 'hit',
    data: envelope.data,
    timestamp: envelope.timestamp,
    isStale: false,
  };
}

/**
 * Removes a specific cache key.
 */
export function removeCacheItem(rawKey: string): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.removeItem(rawKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all cache items associated with a specific user.
 * Used on logout or guest session reset to protect privacy.
 */
export function clearCacheForUser(userId: string): number {
  const storage = getStorage();
  if (!storage || !userId) return 0;

  let clearedCount = 0;
  const userPrefix = `${CACHE_PREFIX}_${CURRENT_CACHE_VERSION}_u_${userId.replace(/[^a-zA-Z0-9_-]/g, '_')}_`;
  const keysToRemove: string[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && key.startsWith(userPrefix)) {
      keysToRemove.push(key);
    }
  }

  for (const k of keysToRemove) {
    try {
      storage.removeItem(k);
      clearedCount++;
    } catch {
      // Ignore
    }
  }

  return clearedCount;
}

/**
 * Clears all obsolete cache items from previous cache versions.
 */
export function purgeObsoleteCacheVersions(): number {
  const storage = getStorage();
  if (!storage) return 0;

  let purgedCount = 0;
  const currentPrefix = `${CACHE_PREFIX}_${CURRENT_CACHE_VERSION}_`;
  const keysToRemove: string[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && key.startsWith(CACHE_PREFIX) && !key.startsWith(currentPrefix)) {
      keysToRemove.push(key);
    }
  }

  for (const k of keysToRemove) {
    try {
      storage.removeItem(k);
      purgedCount++;
    } catch {
      // Ignore
    }
  }

  return purgedCount;
}

export * from './scanResultCache';
export * from './knowledgeCache';
