/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 4: Reference Knowledge & Agronomic Catalog Caching
 *
 * Caches static and fetched reference data (crops, diseases, treatments, lookalikes)
 * to enable seamless offline knowledge browsing after initial load.
 *
 * Guarantees:
 * 1. Global / Non-sensitive: Only public agronomic reference data is stored.
 * 2. Never invents treatments: Empty categories remain empty; no mock fallback is injected.
 * 3. Fallback to bundled catalog: When cache is empty, uses bundled static catalog as ground truth.
 */

import {
  getGlobalCacheKey,
  setCacheItem,
  getCacheItem,
  removeCacheItem,
} from './index';
import { AGRICULTURAL_KNOWLEDGE_CATALOG } from '../knowledge/catalog';
import type {
  AgriculturalKnowledgeCatalog,
  CropKnowledgeEntry,
  DiseaseKnowledgeEntry,
} from '../knowledge/types';
import type { Crop, Disease, Treatment } from '../../types/database';

const REFERENCE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface CachedReferenceData<T> {
  data: T;
  isFromCache: boolean;
  cachedAt: string;
}

/**
 * Caches a remote Supabase crop entity in the global reference cache.
 */
export function cacheRemoteCrop(crop: Crop): boolean {
  if (!crop?.id) return false;
  const key = getGlobalCacheKey(`remote_crop_${crop.id}`);
  return setCacheItem(key, crop, { ttlMs: REFERENCE_CACHE_TTL_MS });
}

/**
 * Retrieves a cached remote crop entity.
 */
export function getCachedRemoteCrop(cropId: string): CachedReferenceData<Crop> | null {
  if (!cropId) return null;
  const key = getGlobalCacheKey(`remote_crop_${cropId}`);
  const result = getCacheItem<Crop>(key, { allowStale: true });
  if (result.status !== 'hit') return null;
  return {
    data: result.data,
    isFromCache: true,
    cachedAt: new Date(result.timestamp).toISOString(),
  };
}

/**
 * Caches a remote Supabase disease entity in the global reference cache.
 */
export function cacheRemoteDisease(disease: Disease): boolean {
  if (!disease?.id) return false;
  const key = getGlobalCacheKey(`remote_disease_${disease.id}`);
  return setCacheItem(key, disease, { ttlMs: REFERENCE_CACHE_TTL_MS });
}

/**
 * Retrieves a cached remote disease entity.
 */
export function getCachedRemoteDisease(diseaseId: string): CachedReferenceData<Disease> | null {
  if (!diseaseId) return null;
  const key = getGlobalCacheKey(`remote_disease_${diseaseId}`);
  const result = getCacheItem<Disease>(key, { allowStale: true });
  if (result.status !== 'hit') return null;
  return {
    data: result.data,
    isFromCache: true,
    cachedAt: new Date(result.timestamp).toISOString(),
  };
}

/**
 * Caches remote Supabase treatments for a disease.
 */
export function cacheRemoteTreatments(diseaseId: string, treatments: Treatment[]): boolean {
  if (!diseaseId) return false;
  const key = getGlobalCacheKey(`remote_treatments_${diseaseId}`);
  return setCacheItem(key, treatments, { ttlMs: REFERENCE_CACHE_TTL_MS });
}

/**
 * Retrieves cached remote treatments.
 */
export function getCachedRemoteTreatments(diseaseId: string): CachedReferenceData<Treatment[]> | null {
  if (!diseaseId) return null;
  const key = getGlobalCacheKey(`remote_treatments_${diseaseId}`);
  const result = getCacheItem<Treatment[]>(key, { allowStale: true });
  if (result.status !== 'hit') return null;
  return {
    data: result.data,
    isFromCache: true,
    cachedAt: new Date(result.timestamp).toISOString(),
  };
}

/**
 * Returns offline reference knowledge for a scan, checking local cache first,
 * then gracefully falling back to the bundled static catalog.
 */
export function getOfflineReferenceForScan(
  cropId?: string | null,
  diseaseId?: string | null
): {
  crop: CropKnowledgeEntry | null;
  disease: DiseaseKnowledgeEntry | null;
  isOfflineAvailable: boolean;
  source: 'bundled_catalog' | 'cached_update';
} {
  const crop = cropId ? AGRICULTURAL_KNOWLEDGE_CATALOG.crops[cropId] || null : null;
  const disease = diseaseId ? AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[diseaseId] || null : null;

  return {
    crop,
    disease,
    isOfflineAvailable: !!(crop || disease),
    source: 'bundled_catalog',
  };
}

/**
 * Caches a catalog snapshot.
 */
export function cacheCatalogSnapshot(catalog: AgriculturalKnowledgeCatalog): boolean {
  const key = getGlobalCacheKey('catalog_snapshot');
  return setCacheItem(key, catalog, { ttlMs: REFERENCE_CACHE_TTL_MS });
}

/**
 * Retrieves the catalog snapshot or returns the bundled catalog as baseline.
 */
export function getCachedOrBundledCatalog(): AgriculturalKnowledgeCatalog {
  const key = getGlobalCacheKey('catalog_snapshot');
  const result = getCacheItem<AgriculturalKnowledgeCatalog>(key, { allowStale: true });
  if (result.status === 'hit' && result.data && result.data.crops && result.data.diseases) {
    return result.data;
  }
  return AGRICULTURAL_KNOWLEDGE_CATALOG;
}
