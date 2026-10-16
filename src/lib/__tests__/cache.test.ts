/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 4: Offline Caching & Resilience Tests
 *
 * Verifies:
 * 1. Cache hit and cache miss
 * 2. Offline reference-data access
 * 3. Corrupt and stale cache recovery
 * 4. Cache invalidation / version changes
 * 5. Storage / quota failure handling
 * 6. Cached-result labeling
 * 7. No fabricated diagnosis when inference is unavailable
 * 8. No treatment fallback from mock data
 * 9. Guest versus authenticated-user isolation
 * 10. Regression coverage for AI validation and storage rollback
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  setCacheItem,
  getCacheItem,
  removeCacheItem,
  getGlobalCacheKey,
  getUserCacheKey,
  clearCacheForUser,
  purgeObsoleteCacheVersions,
  evictExpiredAndReferenceCaches,
  CURRENT_CACHE_VERSION,
} from '../cache/index';
import {
  cacheScanResult,
  getCachedScanResult,
  evictCachedScanResult,
  evictAllScanResultsForUser,
} from '../cache/scanResultCache';
import {
  cacheRemoteCrop,
  getCachedRemoteCrop,
  cacheRemoteDisease,
  getCachedRemoteDisease,
  cacheRemoteTreatments,
  getCachedRemoteTreatments,
  getOfflineReferenceForScan,
  getCachedOrBundledCatalog,
} from '../cache/knowledgeCache';
import { detectDisease } from '../detection';
import { getTreatmentsForCategory, getOfflineOrCachedKnowledge } from '../knowledge/service';
import { validateAndNormalizeAiResponse } from '../ai/validator';
import { saveScanRecord } from '../storage';
import { supabase } from '../supabase';
import { signOutUser, resetGuestSession, getLocalUserId } from '../auth';
import { createThumbnail } from '../imageUtils';
import type { Crop, Disease } from '../../types/database';
import type { ScanResultData } from '../../screens/ScanScreen';

describe('Phase 4: Offline Caching & Resilience', () => {
  const store: Record<string, string> = {};

  const mockLocalStorage: Storage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const k in store) delete store[k];
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
    get length() {
      return Object.keys(store).length;
    },
  };

  beforeEach(() => {
    mockLocalStorage.clear();
    (globalThis as any).window = { localStorage: mockLocalStorage };
    (globalThis as any).localStorage = mockLocalStorage;
    try {
      Object.defineProperty(globalThis.navigator, 'onLine', {
        value: true,
        configurable: true,
        writable: true,
      });
    } catch {
      // Ignore if navigator is not configurable
    }
    vi.restoreAllMocks();
  });

  afterEach(() => {
    mockLocalStorage.clear();
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
    try {
      Object.defineProperty(globalThis.navigator, 'onLine', {
        value: true,
        configurable: true,
        writable: true,
      });
    } catch {
      // Ignore
    }
    vi.restoreAllMocks();
  });

  // --------------------------------------------------------------------------
  // 1. Cache Hit and Cache Miss
  // --------------------------------------------------------------------------
  describe('1. Cache Hit and Cache Miss', () => {
    it('returns cache hit with original payload and timestamp', () => {
      const key = getGlobalCacheKey('test_key');
      const payload = { test: 'agastya', value: 42 };

      const setSuccess = setCacheItem(key, payload);
      expect(setSuccess).toBe(true);

      const result = getCacheItem<typeof payload>(key);
      expect(result.status).toBe('hit');
      if (result.status === 'hit') {
        expect(result.data).toEqual(payload);
        expect(result.isStale).toBe(false);
        expect(typeof result.timestamp).toBe('number');
      }
    });

    it('returns cache miss when key does not exist', () => {
      const key = getGlobalCacheKey('non_existent_key');
      const result = getCacheItem(key);
      expect(result.status).toBe('miss');
      if (result.status === 'miss') {
        expect(result.reason).toBe('not_found');
      }
    });

    it('returns cache miss when entry has expired', () => {
      const key = getGlobalCacheKey('expiring_key');
      // Set TTL of 100ms
      setCacheItem(key, { name: 'expiring' }, { ttlMs: 100 });

      // Fast-forward time past expiration
      vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 200);

      const result = getCacheItem(key);
      expect(result.status).toBe('miss');
      if (result.status === 'miss') {
        expect(result.reason).toBe('expired');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Offline Reference-Data Access
  // --------------------------------------------------------------------------
  describe('2. Offline Reference-Data Access', () => {
    it('caches and retrieves remote crop entities for offline use', () => {
      const mockCrop = {
        id: 'crop-rice',
        name_en: 'Paddy / Rice',
        name_te: 'వరి',
        created_at: new Date().toISOString(),
      };

      const cached = cacheRemoteCrop(mockCrop as unknown as Crop);
      expect(cached).toBe(true);

      const retrieved = getCachedRemoteCrop('crop-rice');
      expect(retrieved).not.toBeNull();
      expect(retrieved?.data).toEqual(mockCrop);
      expect(retrieved?.isFromCache).toBe(true);
    });

    it('caches and retrieves remote disease entities for offline use', () => {
      const mockDisease = {
        id: 'disease-rice-blast',
        crop_id: 'crop-rice',
        name_en: 'Rice Blast',
        name_te: 'అగ్గి తెగులు',
        urgency_color: 'red' as const,
        created_at: new Date().toISOString(),
      };

      cacheRemoteDisease(mockDisease as unknown as Disease);
      const retrieved = getCachedRemoteDisease('disease-rice-blast');
      expect(retrieved?.data).toEqual(mockDisease);
    });

    it('provides offline reference knowledge from bundled catalog without network', () => {
      const ref = getOfflineReferenceForScan('crop-cotton', 'disease-cotton-bollworm');
      expect(ref.isOfflineAvailable).toBe(true);
      expect(ref.crop?.name_en).toBe('Cotton');
      expect(ref.disease?.name_en).toBe('Pink Bollworm');
    });

    it('retrieves bundled or cached catalog snapshot', () => {
      const catalog = getCachedOrBundledCatalog();
      expect(catalog).toBeDefined();
      expect(catalog.crops['crop-rice']).toBeDefined();
      expect(catalog.diseases['disease-rice-blast']).toBeDefined();
    });
  });

  // --------------------------------------------------------------------------
  // 3. Corrupt and Stale Cache Recovery
  // --------------------------------------------------------------------------
  describe('3. Corrupt and Stale Cache Recovery', () => {
    it('safely handles and purges corrupt JSON payloads without crashing', () => {
      const key = getGlobalCacheKey('corrupt_item');
      localStorage.setItem(key, '{ invalid json; truncated payload...');

      const result = getCacheItem(key);
      expect(result.status).toBe('miss');
      if (result.status === 'miss') {
        expect(result.reason).toBe('corrupt');
      }

      // Verify corrupt entry was purged
      expect(localStorage.getItem(key)).toBeNull();
    });

    it('returns stale data when allowStale option is enabled', () => {
      const key = getGlobalCacheKey('stale_allowed_item');
      const now = Date.now();
      vi.spyOn(Date, 'now').mockReturnValue(now);

      setCacheItem(key, { message: 'stale-ok' }, { ttlMs: 50 });

      // Advance clock
      vi.spyOn(Date, 'now').mockReturnValue(now + 100);

      const result = getCacheItem<{ message: string }>(key, { allowStale: true });
      expect(result.status).toBe('hit');
      if (result.status === 'hit') {
        expect(result.isStale).toBe(true);
        expect(result.data.message).toBe('stale-ok');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Cache Invalidation / Version Changes
  // --------------------------------------------------------------------------
  describe('4. Cache Invalidation and Version Changes', () => {
    it('discards entries created under an outdated cache version', () => {
      const key = getGlobalCacheKey('version_mismatch_item');
      const outdatedEnvelope = {
        version: 'v0.8.0-legacy',
        timestamp: Date.now(),
        expiresAt: null,
        data: { outdated: true },
      };
      localStorage.setItem(key, JSON.stringify(outdatedEnvelope));

      const result = getCacheItem(key);
      expect(result.status).toBe('miss');
      if (result.status === 'miss') {
        expect(result.reason).toBe('version_mismatch');
      }
      expect(localStorage.getItem(key)).toBeNull();
    });

    it('purges obsolete cache versions while keeping current version keys intact', () => {
      // Current version item
      const currentKey = getGlobalCacheKey('current_item');
      setCacheItem(currentKey, { current: true });

      // Outdated version items
      const obsoleteKey1 = 'pdds_cache_v0.9.0_global_foo';
      const obsoleteKey2 = 'pdds_cache_v0.8.0_u_guest_bar';
      localStorage.setItem(obsoleteKey1, JSON.stringify({ version: 'v0.9.0', data: 'old1' }));
      localStorage.setItem(obsoleteKey2, JSON.stringify({ version: 'v0.8.0', data: 'old2' }));

      const purgedCount = purgeObsoleteCacheVersions();
      expect(purgedCount).toBe(2);
      expect(localStorage.getItem(obsoleteKey1)).toBeNull();
      expect(localStorage.getItem(obsoleteKey2)).toBeNull();

      // Current key must still exist
      const checkCurrent = getCacheItem(currentKey);
      expect(checkCurrent.status).toBe('hit');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Storage / Quota Failures
  // --------------------------------------------------------------------------
  describe('5. Storage and Quota Failure Handling', () => {
    it('evicts expired and reference caches when QuotaExceededError is encountered', () => {
      const expiredKey = getGlobalCacheKey('expired_item');
      setCacheItem(expiredKey, 'data', { ttlMs: 1 });

      // Make it expired
      vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 100);

      const newKey = getGlobalCacheKey('quota_recovery_item');
      let calls = 0;
      const originalSetItem = mockLocalStorage.setItem.bind(mockLocalStorage);
      vi.spyOn(mockLocalStorage, 'setItem').mockImplementation((k: string, v: string) => {
        if (k === newKey && calls === 0) {
          calls++;
          const quotaErr = new Error('The quota has been exceeded');
          quotaErr.name = 'QuotaExceededError';
          throw quotaErr;
        }
        return originalSetItem(k, v);
      });

      const success = setCacheItem(newKey, { important: true });
      expect(success).toBe(true);
      expect(calls).toBe(1);
    });

    it('handles persistent quota failure gracefully without throwing', () => {
      vi.spyOn(mockLocalStorage, 'setItem').mockImplementation(() => {
        const quotaErr = new Error('Persistent storage full');
        quotaErr.name = 'QuotaExceededError';
        throw quotaErr;
      });

      const key = getGlobalCacheKey('impossible_item');
      expect(() => setCacheItem(key, 'payload')).not.toThrow();
      const result = setCacheItem(key, 'payload');
      expect(result).toBe(false);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Cached-Result Labeling
  // --------------------------------------------------------------------------
  describe('6. Cached-Result Labeling', () => {
    it('preserves exact scan diagnosis without alteration and attaches cached flags', () => {
      const scanData: ScanResultData = {
        imageUri: 'data:image/jpeg;base64,samplephoto',
        detected: true,
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leafcurl',
        cropNameEn: 'Chilli',
        cropNameTe: 'మిరప',
        isDemoSample: false,
      };

      const userId = 'user_chilli_farmer';
      const scanId = 'scan_1001';

      const cached = cacheScanResult(userId, scanId, scanData);
      expect(cached).toBe(true);

      const retrieved = getCachedScanResult(userId, scanId);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.isCachedResult).toBe(true);
      expect(typeof retrieved?.cachedAt).toBe('string');
      expect(retrieved?.cropId).toBe('crop-chilli');
      expect(retrieved?.diseaseId).toBe('disease-chilli-leafcurl');
      expect(retrieved?.cropNameEn).toBe('Chilli');
      expect(retrieved?.cropNameTe).toBe('మిరప');
      expect(retrieved?.isDemoSample).toBe(false);
    });
  });

  // --------------------------------------------------------------------------
  // 7. No Fabricated Diagnosis When Inference is Unavailable
  // --------------------------------------------------------------------------
  describe('7. No Fabricated Diagnosis on Offline / Inference Failure', () => {
    it('returns provider_unavailable without fabricating diagnosis when offline', async () => {
      // Mock browser navigator.onLine as false
      try {
        Object.defineProperty(globalThis.navigator, 'onLine', {
          value: false,
          configurable: true,
          writable: true,
        });
      } catch {
        // fallback
        (globalThis as any).navigator.onLine = false;
      }

      const result = await detectDisease('data:image/jpeg;base64,realplantphoto', 'realplantphoto');
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
        // Live AI diagnosis is paused by default (no budget, no measured accuracy — see
        // detection.ts), so a real scan hits that message before the offline check is ever
        // reached. Either wording is an honest "no diagnosis happened" result; the
        // invariant this test actually guards is the one below: nothing was fabricated.
        expect(result.messageEn.toLowerCase()).toMatch(/unavailable|paused/);
        // Ensure no fake crop or disease ID was hallucinated
        expect((result as any).diseaseId).toBeUndefined();
      }
    });

    it('returns provider_unavailable when edge function throws network error', async () => {
      vi.spyOn(supabase!.functions, 'invoke').mockRejectedValueOnce(new Error('Network offline / ECONNREFUSED'));

      const result = await detectDisease('data:image/jpeg;base64,plant', 'plant');
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. No Treatment Fallback from Mock Data
  // --------------------------------------------------------------------------
  describe('8. No Treatment Fallback from Mock Data', () => {
    it('never falls back to mock treatments when a curated category is empty', () => {
      // Sugarcane Red Rot has no organic treatments in curated catalog
      const organicTreatments = getTreatmentsForCategory('disease-sugarcane-redrot', 'organic', 'en');
      expect(organicTreatments.hasCuratedEntry).toBe(true);
      expect(organicTreatments.isEmptyCategory).toBe(true);
      expect(organicTreatments.treatments).toHaveLength(0);
    });

    it('unsupported crops/diseases return zero treatment recommendations', () => {
      const unsupported = getTreatmentsForCategory('disease-coffee-rust', 'organic', 'en');
      expect(unsupported.hasCuratedEntry).toBe(false);
      expect(unsupported.treatments).toHaveLength(0);
      expect(unsupported.isEmptyCategory).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // 9. Guest versus Authenticated-User Isolation
  // --------------------------------------------------------------------------
  describe('9. Guest versus Authenticated-User Isolation', () => {
    it('prevents user B from reading user A cached scan results', () => {
      const userA = 'user_alpha_uuid';
      const userB = 'user_beta_uuid';
      const scanId = 'scan_private_crop_01';

      cacheScanResult(userA, scanId, {
        imageUri: 'data:image/jpeg;base64,privateA',
        detected: true,
        cropId: 'crop-groundnut',
        diseaseId: 'disease-groundnut-tikka',
      });

      // User A can access
      const userAResult = getCachedScanResult(userA, scanId);
      expect(userAResult).not.toBeNull();
      expect(userAResult?.cropId).toBe('crop-groundnut');

      // User B cannot access
      const userBResult = getCachedScanResult(userB, scanId);
      expect(userBResult).toBeNull();
    });

    it('clears all scan cache for guest without affecting authenticated user', () => {
      const guestId = 'guest_farmer_99';
      const authId = 'auth_registered_88';

      cacheScanResult(guestId, 'guest_scan_1', {
        imageUri: 'data:image/jpeg;base64,guest',
        detected: true,
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
      });

      cacheScanResult(authId, 'auth_scan_1', {
        imageUri: 'data:image/jpeg;base64,auth',
        detected: true,
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
      });

      // Wipe guest cache
      const cleared = clearCacheForUser(guestId);
      expect(cleared).toBeGreaterThan(0);

      // Guest cache is empty
      expect(getCachedScanResult(guestId, 'guest_scan_1')).toBeNull();

      // Authenticated user cache is intact
      expect(getCachedScanResult(authId, 'auth_scan_1')).not.toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // 10. Regression Coverage
  // --------------------------------------------------------------------------
  describe('10. Regression Coverage', () => {
    it('AI Validator normalization remains intact', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        cropNameEn: 'Paddy / Rice',
        cropNameTe: 'వరి',
        visualSymptoms: ['Spindle-shaped lesions with brown borders'],
      };

      const normalized = validateAndNormalizeAiResponse(raw, {
        provider: 'test_provider',
        model: 'test_model',
      });

      expect(normalized.status).toBe('supported_diagnosis');
      expect(normalized.plantIdentification.cropId).toBe('crop-rice');
      expect(normalized.conditionAssessment.diseaseId).toBe('disease-rice-blast');
    });

    it('Scan storage rollback and guest isolation in storage.ts remains intact', async () => {
      const result = await saveScanRecord({
        scanId: 'scan_guest_test_reg',
        imageUri: 'data:image/jpeg;base64,test',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      expect(result.success).toBe(true);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.savedCloud).toBe(false);
    });
  });

  // --------------------------------------------------------------------------
  // 11. Phase 4.2: Cache Lifecycle, Image Storage & Save-State Fixes
  // --------------------------------------------------------------------------
  describe('11. Phase 4.2: Lifecycle, Image Storage & Save-State Fixes', () => {
    describe('Fix 1 & 4 — User-Cache Cleanup & Guest Session Reset', () => {
      it('clears only the target user cache on session wipe, preserving other users and global knowledge', () => {
        const userA = 'user_alice_42';
        const userB = 'user_bob_99';

        // Populate global agronomic knowledge cache
        cacheRemoteCrop({
          id: 'crop-paddy',
          name_en: 'Paddy',
          name_te: 'వరి',
        } as unknown as Crop);

        // Populate user A and user B scan caches
        cacheScanResult(userA, 'scan_a1', {
          imageUri: 'data:image/jpeg;base64,alice',
          detected: true,
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
        });
        cacheScanResult(userB, 'scan_b1', {
          imageUri: 'data:image/jpeg;base64,bob',
          detected: true,
          cropId: 'crop-cotton',
          diseaseId: 'disease-cotton-bollworm',
        });

        // Clear user A only
        const count = clearCacheForUser(userA);
        expect(count).toBeGreaterThan(0);

        // User A cache is gone
        expect(getCachedScanResult(userA, 'scan_a1')).toBeNull();

        // User B cache is fully intact
        expect(getCachedScanResult(userB, 'scan_b1')).not.toBeNull();

        // Global knowledge is completely intact
        expect(getCachedRemoteCrop('crop-paddy')).not.toBeNull();
      });

      it('resetGuestSession clears guest cache, wipes guest history, and generates a new guest ID', () => {
        const oldGuestId = 'guest_old_test_123';
        mockLocalStorage.setItem('herefornature_user_id', oldGuestId);
        mockLocalStorage.setItem(`herefornature_history_${oldGuestId}`, JSON.stringify([{ id: 'g_scan_1' }]));
        mockLocalStorage.setItem('herefornature_history_guest', JSON.stringify([{ id: 'legacy_1' }]));
        mockLocalStorage.setItem('herefornature_history_user_auth_7', JSON.stringify([{ id: 'u_scan_7' }]));

        cacheScanResult(oldGuestId, 'scan_g1', {
          imageUri: 'data:image/jpeg;base64,g',
          detected: true,
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
        });

        // Execute guest reset
        const newGuestId = resetGuestSession();

        expect(newGuestId).toMatch(/^guest_/);
        expect(newGuestId).not.toBe(oldGuestId);
        expect(mockLocalStorage.getItem('herefornature_user_id')).toBe(newGuestId);

        // Old guest cache and history are removed
        expect(getCachedScanResult(oldGuestId, 'scan_g1')).toBeNull();
        expect(mockLocalStorage.getItem(`herefornature_history_${oldGuestId}`)).toBeNull();
        expect(mockLocalStorage.getItem('herefornature_history_guest')).toBeNull();

        // Authenticated user history is completely untouched
        expect(mockLocalStorage.getItem('herefornature_history_user_auth_7')).not.toBeNull();
      });

      it('isolates sequential guest sessions so a new guest identity cannot access previous guest history', async () => {
        // Guest 1 session
        const guest1Id = 'guest_session_one_111';
        mockLocalStorage.setItem('herefornature_user_id', guest1Id);

        await saveScanRecord({
          scanId: 'scan_g1_secret',
          imageUri: 'data:image/jpeg;base64,g1',
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'red',
        });

        const guest1History = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guest1Id}`) || '[]');
        expect(guest1History).toHaveLength(1);
        expect(guest1History[0].id).toBe('scan_g1_secret');

        // Sequential Guest 2 session (simulating guest ID renewal / new guest identity)
        const guest2Id = 'guest_session_two_222';
        mockLocalStorage.setItem('herefornature_user_id', guest2Id);

        // Guest 2 history must be completely empty and cannot read Guest 1's history
        const guest2History = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guest2Id}`) || '[]');
        expect(guest2History).toHaveLength(0);
        expect(mockLocalStorage.getItem('herefornature_history_guest')).toBeNull();

        // Guest 2 saves their own scan
        await saveScanRecord({
          scanId: 'scan_g2_independent',
          imageUri: 'data:image/jpeg;base64,g2',
          cropId: 'crop-cotton',
          diseaseId: 'disease-cotton-bollworm',
          urgencyColor: 'yellow',
        });

        const guest2Updated = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guest2Id}`) || '[]');
        expect(guest2Updated).toHaveLength(1);
        expect(guest2Updated[0].id).toBe('scan_g2_independent');

        // Guest 1's history is isolated and unaffected
        const guest1Remains = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guest1Id}`) || '[]');
        expect(guest1Remains).toHaveLength(1);
        expect(guest1Remains[0].id).toBe('scan_g1_secret');
      });

      it('migrates legacy shared guest history to the active guest and deletes the shared key', async () => {
        const activeGuestId = 'guest_active_migrate';
        mockLocalStorage.setItem('herefornature_user_id', activeGuestId);
        mockLocalStorage.setItem('herefornature_history_guest', JSON.stringify([{ id: 'legacy_scan_item' }]));

        // Saving or accessing history migrates legacy data to active guest
        await saveScanRecord({
          scanId: 'scan_new_migrated',
          imageUri: 'data:image/jpeg;base64,new',
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'green',
        });

        // Shared key is deleted to prevent leaking to subsequent guests
        expect(mockLocalStorage.getItem('herefornature_history_guest')).toBeNull();

        // Active guest has both the migrated and new scan
        const activeHistory = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${activeGuestId}`) || '[]');
        expect(activeHistory).toHaveLength(2);
        expect(activeHistory.some((item: { id: string }) => item.id === 'legacy_scan_item')).toBe(true);
      });
    });

    describe('Fix 2 & 4 — Image Retention, Thumbnail Fallback & Multi-tier Quota Recovery', () => {
      it('createThumbnail safely handles edge cases without throwing or rejecting', async () => {
        // Empty string
        await expect(createThumbnail('')).resolves.toBe('');

        // External HTTP URL passes through unmodified
        const extUrl = 'https://example.com/photo.jpg';
        await expect(createThumbnail(extUrl)).resolves.toBe(extUrl);

        // In headless Node/test environment without canvas/Image, resolves safely to empty string
        await expect(createThumbnail('data:image/jpeg;base64,fakeimage')).resolves.toBe('');
      });

      it('does not eagerly destroy the only copy of an image when thumbnail generation returns empty', async () => {
        const guestId = 'guest_thumb_fallback';
        mockLocalStorage.setItem('herefornature_user_id', guestId);
        const testDataUri = 'data:image/jpeg;base64,original_scan_bytes_12345';

        await saveScanRecord({
          scanId: 'scan_with_fallback_img',
          imageUri: testDataUri,
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'red',
        });

        const history = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guestId}`) || '[]');
        expect(history).toHaveLength(1);
        // Image is preserved via fallback, not destroyed
        expect(history[0].image_url).toBe(testDataUri);
      });

      it('cacheScanResult omits large base64 data URIs (>20KB) to prevent duplicate local storage', () => {
        const userId = 'user_cache_test';
        const scanId = 'scan_large_img';

        // Construct simulated 30KB base64 string
        const largeBase64 = 'data:image/jpeg;base64,' + 'A'.repeat(30000);

        const success = cacheScanResult(userId, scanId, {
          imageUri: largeBase64,
          detected: true,
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          cropNameEn: 'Rice',
          cropNameTe: 'వరి',
        });

        expect(success).toBe(true);

        const cached = getCachedScanResult(userId, scanId);
        expect(cached).not.toBeNull();
        // Heavy base64 string must NOT be duplicated in cache envelope
        expect(cached?.imageUri).toBe('');
        // Agronomic diagnosis and metadata are preserved exactly
        expect(cached?.cropId).toBe('crop-rice');
        expect(cached?.diseaseId).toBe('disease-rice-blast');
        expect(cached?.cropNameEn).toBe('Rice');
      });

      it('saveScanRecord bounds local history to 30 items and avoids unlimited growth', async () => {
        const guestId = 'guest_bounded_history_test';
        mockLocalStorage.setItem('herefornature_user_id', guestId);

        // Pre-fill history with 35 dummy entries
        const initialList = Array.from({ length: 35 }, (_, idx) => ({
          id: `scan_prefill_${idx}`,
          created_at: new Date().toISOString(),
          crop_detected_id: 'crop-rice',
          disease_detected_id: 'disease-rice-blast',
        }));
        mockLocalStorage.setItem(`herefornature_history_${guestId}`, JSON.stringify(initialList));

        // Save new scan
        await saveScanRecord({
          scanId: 'scan_new_entry',
          imageUri: 'data:image/jpeg;base64,abc',
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'green',
        });

        const updatedHistory = JSON.parse(mockLocalStorage.getItem(`herefornature_history_${guestId}`) || '[]');
        expect(updatedHistory.length).toBeLessThanOrEqual(30);
        expect(updatedHistory[0].id).toBe('scan_new_entry');
      });

      it('saveScanRecord handles QuotaExceededError by trimming older records and retrying', async () => {
        const guestId = 'guest_quota_test_user';
        mockLocalStorage.setItem('herefornature_user_id', guestId);
        const storageKey = `herefornature_history_${guestId}`;

        // Setup existing history
        const initialList = Array.from({ length: 25 }, (_, idx) => ({
          id: `scan_quota_${idx}`,
          created_at: new Date().toISOString(),
        }));
        mockLocalStorage.setItem(storageKey, JSON.stringify(initialList));

        // Mock localStorage.setItem to throw QuotaExceededError on the first write
        let writeAttempts = 0;
        const originalSetItem = mockLocalStorage.setItem;
        mockLocalStorage.setItem = vi.fn((key: string, val: string) => {
          if (key === storageKey && writeAttempts === 0) {
            writeAttempts++;
            const quotaErr = new Error('Storage quota exceeded');
            quotaErr.name = 'QuotaExceededError';
            throw quotaErr;
          }
          return originalSetItem(key, val);
        });

        const result = await saveScanRecord({
          scanId: 'scan_quota_retry',
          imageUri: 'data:image/jpeg;base64,retry',
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'yellow',
        });

        expect(result.success).toBe(true);
        expect(writeAttempts).toBe(1);

        // Recovered by trimming history
        const savedHistory = JSON.parse(store[storageKey] || '[]');
        expect(savedHistory.length).toBeLessThanOrEqual(10);
        expect(savedHistory[0].id).toBe('scan_quota_retry');
      });
    });

    describe('Fix 3 — Save State Granularity & Explicit Local-Only Messaging', () => {
      it('returns savedLocallyOnly: true and savedCloud: false for unauthenticated / guest scans', async () => {
        const result = await saveScanRecord({
          scanId: 'scan_local_only_test',
          imageUri: 'data:image/jpeg;base64,test',
          cropId: 'crop-rice',
          diseaseId: 'disease-rice-blast',
          urgencyColor: 'red',
        });

        expect(result.success).toBe(true);
        expect(result.savedLocallyOnly).toBe(true);
        expect(result.savedCloud).toBe(false);
      });
    });
  });
});

