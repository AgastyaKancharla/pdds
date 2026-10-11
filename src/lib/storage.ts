import { supabase } from './supabase';
import { getAuthenticatedUserId, getLocalUserId } from './auth';
import { dataUrlToBlob, createThumbnail } from './imageUtils';
import type { UrgencyColor, Crop, Disease } from '../types/database';
import type { DiagnosticTier, NormalizedDiagnosis } from './ai/types';

export const CROP_SCANS_BUCKET = 'crop-scans';

export interface SaveScanParams {
  scanId: string;
  imageUri: string;
  cropId: string;
  diseaseId: string;
  urgencyColor: UrgencyColor;
  isDemoSample?: boolean;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
  crop?: Crop | null;
  disease?: Disease | null;
}

export interface SaveScanResult {
  success: boolean;
  savedCloud: boolean;
  savedLocallyOnly: boolean;
  savedLocal?: boolean;
  storagePath?: string;
  error?: string;
  rollbackAttempted?: boolean;
  rollbackSuccess?: boolean;
  rollbackError?: string;
  cloudProvenancePersisted?: boolean;
}

/**
 * Returns predictable owner-isolated storage path format: {userId}/{scanId}.jpg
 */
export function getScanStoragePath(userId: string, scanId: string): string {
  const cleanScanId = scanId.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${userId}/${cleanScanId}.jpg`;
}

/**
 * Uploads a compressed image to the private crop-scans bucket under the user's isolated folder.
 */
export async function uploadScanImage(
  userId: string,
  scanId: string,
  imageBlobOrDataUrl: Blob | string
): Promise<{ success: boolean; path?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase client not initialized.' };
  }

  try {
    const blob =
      typeof imageBlobOrDataUrl === 'string'
        ? dataUrlToBlob(imageBlobOrDataUrl)
        : imageBlobOrDataUrl;

    const path = getScanStoragePath(userId, scanId);

    const { error } = await supabase.storage
      .from(CROP_SCANS_BUCKET)
      .upload(path, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.warn('[HereForNature] Storage upload failed:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, path };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown storage upload error';
    console.warn('[HereForNature] Storage upload exception:', msg);
    return { success: false, error: msg };
  }
}

/**
 * Deletes an uploaded image from storage (used for rollback on database insert failure).
 */
export async function deleteScanImage(path: string): Promise<boolean> {
  if (!supabase || !path) return false;
  try {
    const { error } = await supabase.storage.from(CROP_SCANS_BUCKET).remove([path]);
    if (error) {
      console.warn('[HereForNature] Storage delete failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[HereForNature] Storage delete exception:', err);
    return false;
  }
}

/**
 * Resolves an image path or URL for rendering.
 * Private storage paths are resolved into short-lived signed URLs (1 hour).
 */
export async function resolveScanImageUrl(pathOrUrl: string): Promise<string> {
  if (!pathOrUrl || pathOrUrl === 'uploaded-crop.jpg') return '';

  // Already a base64 data URI or full external web URL
  if (pathOrUrl.startsWith('data:image/') || pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  // Private Supabase storage path: resolve to signed URL
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(CROP_SCANS_BUCKET)
        .createSignedUrl(pathOrUrl, 3600); // 1-hour expiration

      if (!error && data?.signedUrl) {
        return data.signedUrl;
      }
    } catch (err) {
      console.warn('[HereForNature] Signed URL resolution exception:', err);
    }
  }

  return '';
}

/**
 * Detects if a Supabase/PostgREST error indicates missing diagnostic provenance columns
 * (e.g. if remote migration 004 has not yet been applied to the cloud database).
 */
export function isMissingColumnError(error: any): boolean {
  if (!error) return false;
  const msg = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  const code = typeof error.code === 'string' ? error.code : '';
  return (
    code === 'PGRST204' ||
    code === '42703' ||
    msg.includes('diagnostic_tier') ||
    msg.includes('is_demo_sample') ||
    msg.includes('schema cache') ||
    (msg.includes('column') && msg.includes('does not exist'))
  );
}

/**
 * Saves a scan with atomic rollback, storage path isolation, duplicate prevention,
 * and graceful fallback for remote schemas lacking provenance columns.
 */
export async function saveScanRecord(params: SaveScanParams): Promise<SaveScanResult> {
  const {
    scanId,
    imageUri,
    cropId,
    diseaseId,
    urgencyColor,
    isDemoSample = false,
    diagnosticTier,
    crop,
    disease,
  } = params;

  const authUserId = await getAuthenticatedUserId();
  const effectiveUserId = authUserId || getLocalUserId();
  const storageKey = `herefornature_history_${effectiveUserId}`;

  // One-time migration of legacy guest history to active isolated guest identity
  if (!authUserId && typeof localStorage !== 'undefined') {
    try {
      const legacyGuestHistory =
        localStorage.getItem('herefornature_history_guest') || localStorage.getItem('herefornature_history');
      if (legacyGuestHistory && !localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, legacyGuestHistory);
        localStorage.removeItem('herefornature_history_guest');
        localStorage.removeItem('herefornature_history');
      }
    } catch {
      // Ignore
    }
  }

  // 1. Prepare local record (offline / local fallback with bounded thumbnail)
  let localImageUrl = imageUri;
  if (imageUri && imageUri.startsWith('data:image/')) {
    try {
      const thumb = await createThumbnail(imageUri, 160, 0.6);
      if (thumb) {
        localImageUrl = thumb;
      }
      // If thumbnail generation is unsupported or fails, do NOT eagerly destroy localImageUrl!
      // Keep imageUri as fallback. Storage quota handling will gracefully recover if storage is full.
    } catch {
      // Keep imageUri as fallback
    }
  }

  const effectiveDiagnosticTier: DiagnosticTier =
    diagnosticTier === 'expert_confirmed'
      ? 'ai_preliminary_hypothesis'
      : diagnosticTier || (isDemoSample ? 'demonstration_sample' : 'legacy_or_unknown');

  const localRecord = {
    id: scanId,
    created_at: new Date().toISOString(),
    user_id: effectiveUserId,
    image_url: localImageUrl, // Bounded thumbnail or compact reference for local history
    crop_detected_id: cropId,
    disease_detected_id: diseaseId,
    urgency_color: urgencyColor,
    is_demo_sample: isDemoSample,
    diagnostic_tier: effectiveDiagnosticTier,
    crops: crop ? { id: crop.id, name_en: crop.name_en, name_te: crop.name_te } : null,
    diseases: disease
      ? { id: disease.id, name_en: disease.name_en, name_te: disease.name_te, urgency_color: urgencyColor }
      : null,
  };

  let localWriteSuccess = false;

  // Save to localStorage with duplicate prevention, bounded item count (max 30), and multi-tier quota resilience
  try {
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const isDuplicate = existing.some((item: { id: string }) => item.id === scanId);
    if (isDuplicate) {
      localWriteSuccess = true;
    } else {
      existing.unshift(localRecord);
      const bounded = existing.slice(0, 30);
      try {
        localStorage.setItem(storageKey, JSON.stringify(bounded));
        localWriteSuccess = true;
      } catch (quotaErr) {
        console.warn('[HereForNature] Local history quota reached, trimming old entries...');
        try {
          // Attempt 1: Trim older records to 10
          const trimmed = bounded.slice(0, 10);
          localStorage.setItem(storageKey, JSON.stringify(trimmed));
          localWriteSuccess = true;
        } catch {
          try {
            // Attempt 2: If quota still exceeded, strip large image payloads from older history
            const compact = bounded.slice(0, 10).map((r: any, i: number) => (i === 0 ? r : { ...r, image_url: '' }));
            localStorage.setItem(storageKey, JSON.stringify(compact));
            localWriteSuccess = true;
          } catch {
            try {
              // Attempt 3: Preserve vital diagnosis metadata of current scan without image
              const metadataOnly = [{ ...localRecord, image_url: '' }];
              localStorage.setItem(storageKey, JSON.stringify(metadataOnly));
              localWriteSuccess = true;
            } catch {
              localWriteSuccess = false;
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[HereForNature] Local history storage error:', err);
    localWriteSuccess = false;
  }

  // 2. If unauthenticated, keep in localStorage only (Never create orphaned cloud records)
  if (!supabase || !authUserId) {
    if (!localWriteSuccess) {
      return {
        success: false,
        savedCloud: false,
        savedLocallyOnly: false,
        savedLocal: false,
        cloudProvenancePersisted: false,
        error: 'Local storage is full or unavailable.',
      };
    }
    return {
      success: true,
      savedCloud: false,
      savedLocallyOnly: true,
      savedLocal: true,
      cloudProvenancePersisted: false,
    };
  }

  // 3. Authenticated cloud persistence with atomic rollback
  let uploadedPath: string | undefined;

  // Step 3a: Upload image to private storage bucket
  const isDataUri = imageUri.startsWith('data:image/');
  if (isDataUri) {
    const uploadResult = await uploadScanImage(authUserId, scanId, imageUri);
    if (!uploadResult.success || !uploadResult.path) {
      return {
        success: localWriteSuccess,
        savedCloud: false,
        savedLocallyOnly: localWriteSuccess,
        savedLocal: localWriteSuccess,
        cloudProvenancePersisted: false,
        error: uploadResult.error || 'Failed to upload image to private storage.',
      };
    }
    uploadedPath = uploadResult.path;
  } else {
    uploadedPath = imageUri;
  }

  // Step 3b: Insert database row into scan_history
  try {
    let cloudProvenancePersisted = false;
    let dbError: any = null;

    // Primary attempt: full payload with provenance metadata
    const provenancePayload = {
      id: scanId,
      user_id: authUserId,
      image_url: uploadedPath,
      crop_detected_id: cropId,
      disease_detected_id: diseaseId,
      urgency_color: urgencyColor,
      is_demo_sample: isDemoSample,
      diagnostic_tier: effectiveDiagnosticTier,
    };

    const insertResult = await supabase.from('scan_history').insert(provenancePayload);
    dbError = insertResult.error;

    // Graceful backward compatibility fallback:
    // If the remote database schema does not yet have diagnostic_tier or is_demo_sample
    // (for example, prior to migration 004 execution), retry inserting legacy columns only.
    // This guarantees zero data loss and successful scan save, while explicitly signaling
    // cloudProvenancePersisted: false in the returned SaveScanResult.
    if (dbError && isMissingColumnError(dbError)) {
      console.warn(
        '[HereForNature] Remote scan_history schema lacks provenance columns; falling back to legacy schema columns:',
        dbError.message
      );
      const legacyPayload = {
        id: scanId,
        user_id: authUserId,
        image_url: uploadedPath,
        crop_detected_id: cropId,
        disease_detected_id: diseaseId,
        urgency_color: urgencyColor,
      };
      const fallbackResult = await supabase.from('scan_history').insert(legacyPayload);
      dbError = fallbackResult.error;
      if (!dbError) {
        cloudProvenancePersisted = false;
      }
    } else if (!dbError) {
      cloudProvenancePersisted = true;
    }

    if (dbError) {
      const isDuplicateKey =
        (dbError as any).code === '23505' ||
        (typeof dbError.message === 'string' &&
          (dbError.message.includes('duplicate key') ||
            dbError.message.includes('unique constraint') ||
            dbError.message.includes('scan_history_pkey')));

      if (isDuplicateKey) {
        // Safe Idempotent Retry Verification:
        // Check if the duplicate record belongs to the authenticated user and matches scanId
        const { data: existingRecord, error: fetchErr } = await supabase
          .from('scan_history')
          .select('id, user_id, image_url')
          .eq('id', scanId)
          .maybeSingle();

        if (!fetchErr && existingRecord && existingRecord.user_id === authUserId) {
          // Genuine retry for existing scan by the same user:
          // Do NOT delete the existing image. Return verified idempotent cloud success.
          return {
            success: true,
            savedCloud: true,
            savedLocallyOnly: false,
            savedLocal: localWriteSuccess,
            storagePath: existingRecord.image_url || uploadedPath,
            cloudProvenancePersisted,
          };
        }

        // Record belongs to another user (or RLS hid it because user_id != authUserId) or fetch failed
        console.warn(
          '[HereForNature] Scan ID duplicate collision not owned by authenticated user. Rolling back upload:',
          scanId
        );
        let rollbackAttempted = false;
        let rollbackSuccess = false;
        if (uploadedPath && uploadedPath.startsWith(authUserId)) {
          rollbackAttempted = true;
          rollbackSuccess = await deleteScanImage(uploadedPath);
        }

        const conflictMessage =
          !fetchErr && !existingRecord
            ? 'Scan ID collision: Record already exists for another user.'
            : fetchErr
            ? `Duplicate verification query failed: ${fetchErr.message}`
            : 'Scan ID collision: Ownership mismatch.';

        return {
          success: localWriteSuccess,
          savedCloud: false,
          savedLocallyOnly: localWriteSuccess,
          savedLocal: localWriteSuccess,
          cloudProvenancePersisted: false,
          error: conflictMessage,
          rollbackAttempted,
          rollbackSuccess,
          ...(rollbackAttempted && !rollbackSuccess
            ? { rollbackError: 'Failed to delete uploaded storage object during rollback.' }
            : {}),
        };
      }

      // Ordinary database failure: rollback newly uploaded storage object
      console.warn('[HereForNature] Database insert failed, attempting storage rollback:', dbError.message);
      let rollbackAttempted = false;
      let rollbackSuccess = false;
      if (uploadedPath && uploadedPath.startsWith(authUserId)) {
        rollbackAttempted = true;
        rollbackSuccess = await deleteScanImage(uploadedPath);
      }

      return {
        success: localWriteSuccess,
        savedCloud: false,
        savedLocallyOnly: localWriteSuccess,
        savedLocal: localWriteSuccess,
        cloudProvenancePersisted: false,
        error: dbError.message,
        rollbackAttempted,
        rollbackSuccess,
        ...(rollbackAttempted && !rollbackSuccess
          ? { rollbackError: 'Failed to delete uploaded storage object during rollback.' }
          : {}),
      };
    }

    return {
      success: true,
      savedCloud: true,
      savedLocallyOnly: false,
      savedLocal: localWriteSuccess,
      storagePath: uploadedPath,
      cloudProvenancePersisted,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown database insert error';
    console.warn('[HereForNature] Database insert exception, attempting storage rollback:', msg);
    let rollbackAttempted = false;
    let rollbackSuccess = false;
    if (uploadedPath && uploadedPath.startsWith(authUserId)) {
      rollbackAttempted = true;
      rollbackSuccess = await deleteScanImage(uploadedPath);
    }
    return {
      success: localWriteSuccess,
      savedCloud: false,
      savedLocallyOnly: localWriteSuccess,
      savedLocal: localWriteSuccess,
      cloudProvenancePersisted: false,
      error: msg,
      rollbackAttempted,
      rollbackSuccess,
      ...(rollbackAttempted && !rollbackSuccess
        ? { rollbackError: 'Failed to delete uploaded storage object during rollback.' }
        : {}),
    };
  }
}
