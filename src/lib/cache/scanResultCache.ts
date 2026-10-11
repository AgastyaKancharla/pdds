/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 4: User-Isolated Scan Result Caching
 *
 * Caches scan result payloads locally for quick offline access and re-inspection.
 * Guarantees:
 * 1. Strict user-isolation: Never shares or leaks one user's scan cache to another.
 * 2. Unaltered agronomic diagnosis: Diagnosis, confidence, and urgency are preserved exactly.
 * 3. Explicit cached labeling: Results retrieved from cache are explicitly tagged with `isCachedResult: true`.
 * 4. Never masquerades as a new live inference: A failed live scan NEVER pulls a cached scan from another image.
 */

import {
  getUserCacheKey,
  setCacheItem,
  getCacheItem,
  removeCacheItem,
  clearCacheForUser,
} from './index';
import type { ScanResultData } from '../../screens/ScanScreen';

export interface CachedScanResultData extends ScanResultData {
  isCachedResult: boolean;
  cachedAt?: string;
  cacheSource?: 'local_cache';
}

const SCAN_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Caches a completed scan result under the authenticated or guest user's isolated partition.
 */
export function cacheScanResult(
  userId: string,
  scanId: string,
  scanData: ScanResultData
): boolean {
  if (!userId || !scanId) return false;

  const key = getUserCacheKey(userId, `scan_${scanId}`);

  // Strip transient or runtime-only states before caching.
  // ELIMINATE DUPLICATED FULL-RESOLUTION BASE64 STORAGE:
  // If imageUri is a large base64 data URI (> 20KB), omit the heavy binary payload from
  // the cache envelope to avoid duplicating 300KB+ images across history and scan cache.
  const compactImageUri =
    scanData.imageUri &&
    scanData.imageUri.startsWith('data:image/') &&
    scanData.imageUri.length > 20480
      ? ''
      : scanData.imageUri;

  const payloadToCache: ScanResultData = {
    imageUri: compactImageUri,
    detected: scanData.detected,
    cropId: scanData.cropId,
    diseaseId: scanData.diseaseId,
    failureReason: scanData.failureReason,
    messageEn: scanData.messageEn,
    messageTe: scanData.messageTe,
    cropNameEn: scanData.cropNameEn,
    cropNameTe: scanData.cropNameTe,
    isDemoSample: scanData.isDemoSample,
    diagnosticTier:
      scanData.diagnosticTier === 'expert_confirmed'
        ? 'ai_preliminary_hypothesis'
        : scanData.diagnosticTier,
    normalizedDiagnosis: scanData.normalizedDiagnosis,
  };

  return setCacheItem(key, payloadToCache, {
    ttlMs: SCAN_CACHE_TTL_MS,
    userId,
  });
}

/**
 * Retrieves a cached scan result for a specific user and scan ID.
 * Returns null if the item is missing, expired, or belongs to another user.
 */
export function getCachedScanResult(
  userId: string,
  scanId: string
): CachedScanResultData | null {
  if (!userId || !scanId) return null;

  const key = getUserCacheKey(userId, `scan_${scanId}`);
  const result = getCacheItem<ScanResultData>(key, {
    expectedUserId: userId,
    allowStale: false,
  });

  if (result.status !== 'hit') {
    return null;
  }

  return {
    ...result.data,
    isCachedResult: true,
    cachedAt: new Date(result.timestamp).toISOString(),
    cacheSource: 'local_cache',
  };
}

/**
 * Removes a specific cached scan result.
 */
export function evictCachedScanResult(userId: string, scanId: string): boolean {
  if (!userId || !scanId) return false;
  const key = getUserCacheKey(userId, `scan_${scanId}`);
  return removeCacheItem(key);
}

/**
 * Clears all cached scan results for a specific user (e.g. on logout or data wipe).
 */
export function evictAllScanResultsForUser(userId: string): number {
  return clearCacheForUser(userId);
}
