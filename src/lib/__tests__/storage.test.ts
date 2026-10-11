import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CROP_SCANS_BUCKET,
  getScanStoragePath,
  uploadScanImage,
  deleteScanImage,
  resolveScanImageUrl,
  saveScanRecord,
  isMissingColumnError,
  type SaveScanResult,
} from '../storage';
import * as authModule from '../auth';
import { supabase } from '../supabase';
import { translate } from '../i18n';

// Mock auth module
vi.mock('../auth', () => ({
  getAuthenticatedUserId: vi.fn(),
  getLocalUserId: vi.fn(() => 'guest_mock_123'),
}));

// Mock Supabase client
vi.mock('../supabase', () => {
  const mockStorageFrom = {
    upload: vi.fn(),
    remove: vi.fn(),
    createSignedUrl: vi.fn(),
  };

  const mockDbFrom = {
    insert: vi.fn(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
  };

  return {
    supabase: {
      storage: {
        from: vi.fn(() => mockStorageFrom),
      },
      from: vi.fn(() => mockDbFrom),
    },
  };
});

describe('Phase 2: Private Storage & Scan History Service', () => {
  const store: Record<string, string> = {};

  const mockLocalStorage = {
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
  };

  beforeEach(() => {
    mockLocalStorage.clear();
    mockLocalStorage.setItem = (key: string, val: string) => {
      store[key] = val;
    };
    mockLocalStorage.getItem = (key: string) => store[key] || null;
    (globalThis as any).window = {};
    (globalThis as any).localStorage = mockLocalStorage;
    vi.clearAllMocks();
  });

  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
  });

  describe('Path Formatting & Isolation', () => {
    it('generates predictable owner-isolated storage paths', () => {
      const path = getScanStoragePath('usr_abc_123', 'scan_456');
      expect(path).toBe('usr_abc_123/scan_456.jpg');
    });

    it('sanitizes unsafe characters in scanId to underscores', () => {
      const path = getScanStoragePath('usr_abc_123', 'scan/456..test$!');
      expect(path).toBe('usr_abc_123/scan_456__test__.jpg');
    });
  });

  describe('Image Upload', () => {
    it('uploads a base64 data URL to the crop-scans bucket under the isolated user path', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'u1/s1.jpg' }, error: null });

      const tinyDataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const result = await uploadScanImage('u1', 's1', tinyDataUri);

      expect(supabase?.storage.from).toHaveBeenCalledWith(CROP_SCANS_BUCKET);
      expect(storageMock.upload).toHaveBeenCalledWith(
        'u1/s1.jpg',
        expect.any(Blob),
        { contentType: 'image/jpeg', upsert: true }
      );
      expect(result.success).toBe(true);
      expect(result.path).toBe('u1/s1.jpg');
    });

    it('returns an error object on upload failure without crashing', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({
        data: null,
        error: { message: 'Storage quota exceeded' },
      });

      const tinyDataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const result = await uploadScanImage('u1', 's1', tinyDataUri);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Storage quota exceeded');
    });
  });

  describe('Storage Deletion & Rollback', () => {
    it('deletes an uploaded object by path', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.remove.mockResolvedValueOnce({ data: ['u1/s1.jpg'], error: null });

      const success = await deleteScanImage('u1/s1.jpg');
      expect(storageMock.remove).toHaveBeenCalledWith(['u1/s1.jpg']);
      expect(success).toBe(true);
    });

    it('returns false when storage deletion fails', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.remove.mockResolvedValueOnce({
        data: null,
        error: { message: 'Object not found' },
      });

      const success = await deleteScanImage('u1/s1.jpg');
      expect(success).toBe(false);
    });

    it('returns false immediately when empty path is provided', async () => {
      const success = await deleteScanImage('');
      expect(success).toBe(false);
    });
  });

  describe('URL Resolution & Signed URLs', () => {
    it('returns empty string for empty input or placeholder uploaded-crop.jpg', async () => {
      expect(await resolveScanImageUrl('')).toBe('');
      expect(await resolveScanImageUrl('uploaded-crop.jpg')).toBe('');
    });

    it('passes through base64 data URLs without invoking storage API', async () => {
      const dataUri = 'data:image/jpeg;base64,1234';
      expect(await resolveScanImageUrl(dataUri)).toBe(dataUri);
      expect(supabase?.storage.from).not.toHaveBeenCalled();
    });

    it('passes through external HTTP/HTTPS URLs without invoking storage API', async () => {
      const httpUrl = 'https://example.com/leaf.jpg';
      expect(await resolveScanImageUrl(httpUrl)).toBe(httpUrl);
      expect(supabase?.storage.from).not.toHaveBeenCalled();
    });

    it('generates a 1-hour signed URL for private storage paths', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.createSignedUrl.mockResolvedValueOnce({
        data: { signedUrl: 'https://supabase.co/storage/v1/object/sign/crop-scans/u1/s1.jpg?token=abc' },
        error: null,
      });

      const result = await resolveScanImageUrl('u1/s1.jpg');
      expect(storageMock.createSignedUrl).toHaveBeenCalledWith('u1/s1.jpg', 3600);
      expect(result).toContain('https://supabase.co/storage/v1/object/sign/crop-scans/u1/s1.jpg');
    });

    it('returns empty string if signed URL generation fails', async () => {
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.createSignedUrl.mockResolvedValueOnce({
        data: null,
        error: { message: 'Object not found or access denied' },
      });

      const result = await resolveScanImageUrl('u1/s1.jpg');
      expect(result).toBe('');
    });
  });

  describe('saveScanRecord: Guest Mode & Local Storage', () => {
    it('saves strictly to guest local storage when user is unauthenticated', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValueOnce(null);

      const result = await saveScanRecord({
        scanId: 'scan_guest_1',
        imageUri: 'data:image/jpeg;base64,abc',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);

      const guestHistory = JSON.parse(mockLocalStorage.getItem('herefornature_history_guest_mock_123') || '[]');
      expect(guestHistory).toHaveLength(1);
      expect(guestHistory[0].id).toBe('scan_guest_1');
      expect(guestHistory[0].crop_detected_id).toBe('crop-rice');
    });

    it('prevents duplicate entries in local storage on retry with the same scanId', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      const params = {
        scanId: 'scan_guest_repeat',
        imageUri: 'data:image/jpeg;base64,abc',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red' as const,
      };

      await saveScanRecord(params);
      await saveScanRecord(params);

      const guestHistory = JSON.parse(mockLocalStorage.getItem('herefornature_history_guest_mock_123') || '[]');
      expect(guestHistory).toHaveLength(1);
    });
  });

  describe('saveScanRecord: Authenticated Cloud Persistence & Atomic Rollback', () => {
    it('uploads image and inserts scan_history record when authenticated', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_cloud_1.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({ error: null });

      const result = await saveScanRecord({
        scanId: 'scan_cloud_1',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-leaf-curl',
        urgencyColor: 'yellow',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.savedLocallyOnly).toBe(false);
      expect(result.storagePath).toBe('user_auth_99/scan_cloud_1.jpg');

      // Database insert must receive the private path, not a public URL
      expect(dbMock.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'scan_cloud_1',
          user_id: 'user_auth_99',
          image_url: 'user_auth_99/scan_cloud_1.jpg',
          crop_detected_id: 'crop-cotton',
          disease_detected_id: 'disease-cotton-leaf-curl',
        })
      );

      // Account-scoped local cache must also be populated
      const userHistory = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_auth_99') || '[]');
      expect(userHistory).toHaveLength(1);
    });

    it('performs atomic rollback (deletes uploaded storage object) if database insert fails', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_fail.jpg' }, error: null });
      storageMock.remove.mockResolvedValueOnce({ data: ['user_auth_99/scan_fail.jpg'], error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { message: 'Database constraint violation: check constraint crop_id failed' },
      });

      const result = await saveScanRecord({
        scanId: 'scan_fail',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leaf-curl',
        urgencyColor: 'red',
      });

      // Storage rollback must be invoked to avoid orphaned objects
      expect(storageMock.remove).toHaveBeenCalledWith(['user_auth_99/scan_fail.jpg']);

      // Scan still preserved locally so user data is not lost
      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.rollbackAttempted).toBe(true);
      expect(result.rollbackSuccess).toBe(true);
      expect(result.error).toContain('Database constraint violation');

      const userHistory = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_auth_99') || '[]');
      expect(userHistory).toHaveLength(1);
    });

    it('falls back to local storage if image upload fails without calling database insert', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({
        data: null,
        error: { message: 'Network offline during upload' },
      });

      const dbMock = (supabase as any).from('scan_history');

      const result = await saveScanRecord({
        scanId: 'scan_upload_err',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leaf-curl',
        urgencyColor: 'red',
      });

      // Database insert should NOT be called if upload failed
      expect(dbMock.insert).not.toHaveBeenCalled();

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.error).toContain('Network offline during upload');
    });
  });

  describe('Account Cache Isolation', () => {
    it('isolates local scan history across different user accounts', async () => {
      // User A saves scan
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_AAA');
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValue({ data: { path: 'user_AAA/scan_A.jpg' }, error: null });
      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValue({ error: null });

      await saveScanRecord({
        scanId: 'scan_A',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      // User B saves scan
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_BBB');
      await saveScanRecord({
        scanId: 'scan_B',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-leaf-curl',
        urgencyColor: 'green',
      });

      const historyA = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_AAA') || '[]');
      const historyB = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_BBB') || '[]');

      expect(historyA).toHaveLength(1);
      expect(historyA[0].id).toBe('scan_A');

      expect(historyB).toHaveLength(1);
      expect(historyB[0].id).toBe('scan_B');

      // Neither user can see the other user's scans
      expect(historyA.some((item: any) => item.id === 'scan_B')).toBe(false);
      expect(historyB.some((item: any) => item.id === 'scan_A')).toBe(false);
    });
  });

  describe('Phase 2.2: Idempotent Save & Rollback Reliability', () => {
    it('1. does not delete existing image on duplicate-key retry by the same user, returning cloud success', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_retry_1.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { code: '23505', message: 'duplicate key value violates unique constraint "scan_history_pkey"' },
      });
      dbMock.maybeSingle.mockResolvedValueOnce({
        data: { id: 'scan_retry_1', user_id: 'user_auth_99', image_url: 'user_auth_99/scan_retry_1.jpg' },
        error: null,
      });

      const result = await saveScanRecord({
        scanId: 'scan_retry_1',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      // Storage rollback MUST NOT be invoked for an idempotent retry by the same owner
      expect(storageMock.remove).not.toHaveBeenCalled();

      // Successfully acknowledged as idempotent cloud save
      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.savedLocallyOnly).toBe(false);
      expect(result.storagePath).toBe('user_auth_99/scan_retry_1.jpg');
    });

    it('2. rejects duplicate insert when scan ID belongs to another user and cleans up current upload', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_other_user.jpg' }, error: null });
      storageMock.remove.mockResolvedValueOnce({ data: ['user_auth_99/scan_other_user.jpg'], error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { code: '23505', message: 'duplicate key value violates unique constraint "scan_history_pkey"' },
      });
      // RLS filters out another user's scan record, so maybeSingle returns null
      dbMock.maybeSingle.mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const result = await saveScanRecord({
        scanId: 'scan_other_user',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      // Newly uploaded object must be cleaned up to avoid orphaned invalid files
      expect(storageMock.remove).toHaveBeenCalledWith(['user_auth_99/scan_other_user.jpg']);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.rollbackAttempted).toBe(true);
      expect(result.rollbackSuccess).toBe(true);
      expect(result.error).toContain('Scan ID collision');
    });

    it('3. attempts to remove newly uploaded object on genuine database insert failure', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_genuine_fail.jpg' }, error: null });
      storageMock.remove.mockResolvedValueOnce({ data: ['user_auth_99/scan_genuine_fail.jpg'], error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { code: '42P01', message: 'relation "scan_history" does not exist' },
      });

      const result = await saveScanRecord({
        scanId: 'scan_genuine_fail',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      expect(storageMock.remove).toHaveBeenCalledWith(['user_auth_99/scan_genuine_fail.jpg']);
      expect(result.rollbackAttempted).toBe(true);
      expect(result.rollbackSuccess).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.error).toBe('relation "scan_history" does not exist');
    });

    it('4. surfaces rollback failure in structured result metadata when storage deletion fails', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_rb_fail.jpg' }, error: null });
      // Storage deletion fails
      storageMock.remove.mockResolvedValueOnce({ data: null, error: { message: 'Storage connection timeout' } });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { message: 'Database query timeout' },
      });

      const result = await saveScanRecord({
        scanId: 'scan_rb_fail',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leaf-curl',
        urgencyColor: 'yellow',
      });

      expect(storageMock.remove).toHaveBeenCalledWith(['user_auth_99/scan_rb_fail.jpg']);
      expect(result.rollbackAttempted).toBe(true);
      expect(result.rollbackSuccess).toBe(false);
      expect(result.rollbackError).toContain('Failed to delete uploaded storage object');
      expect(result.error).toBe('Database query timeout');
      expect(result.savedLocallyOnly).toBe(true);
    });

    it('5. ensures local scan data remains completely intact after cloud persistence failure', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_auth_99/scan_local_intact.jpg' }, error: null });
      storageMock.remove.mockResolvedValueOnce({ data: ['user_auth_99/scan_local_intact.jpg'], error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({
        error: { message: 'Network partition during insert' },
      });

      const dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const result = await saveScanRecord({
        scanId: 'scan_local_intact',
        imageUri: dataUri,
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
        urgencyColor: 'red',
      });

      expect(result.savedLocallyOnly).toBe(true);

      const cached = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_auth_99') || '[]');
      expect(cached).toHaveLength(1);
      expect(cached[0].id).toBe('scan_local_intact');
      expect(cached[0].crop_detected_id).toBe('crop-cotton');
      expect(cached[0].disease_detected_id).toBe('disease-cotton-bollworm');
      expect(cached[0].image_url).toBe(dataUri);
    });

    it('6. handles successful first save and subsequent repeated save without duplicates or image loss', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValue({ data: { path: 'user_auth_99/scan_repeat_ok.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      // First attempt succeeds
      dbMock.insert.mockResolvedValueOnce({ error: null });

      const params = {
        scanId: 'scan_repeat_ok',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-maize',
        diseaseId: 'disease-maize-armyworm',
        urgencyColor: 'yellow' as const,
      };

      const result1 = await saveScanRecord(params);
      expect(result1.success).toBe(true);
      expect(result1.savedCloud).toBe(true);

      // Second attempt encounters duplicate key (retry)
      dbMock.insert.mockResolvedValueOnce({
        error: { code: '23505', message: 'duplicate key value violates unique constraint' },
      });
      dbMock.maybeSingle.mockResolvedValueOnce({
        data: { id: 'scan_repeat_ok', user_id: 'user_auth_99', image_url: 'user_auth_99/scan_repeat_ok.jpg' },
        error: null,
      });

      const result2 = await saveScanRecord(params);
      expect(result2.success).toBe(true);
      expect(result2.savedCloud).toBe(true);
      expect(result2.storagePath).toBe('user_auth_99/scan_repeat_ok.jpg');

      // storage.remove should NEVER have been called in either attempt
      expect(storageMock.remove).not.toHaveBeenCalled();

      // Local storage must have only 1 entry (no duplicate rows)
      const userHistory = JSON.parse(mockLocalStorage.getItem('herefornature_history_user_auth_99') || '[]');
      expect(userHistory).toHaveLength(1);
      expect(userHistory[0].id).toBe('scan_repeat_ok');
    });
  });

  describe('Phase 4.5: Correct Local Persistence Failure Reporting & UI Save States', () => {
    it('returns explicit failure when all local-storage write attempts fail for a guest user', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      // Simulate complete localStorage failure across all write attempts
      mockLocalStorage.setItem = vi.fn(() => {
        const quotaErr = new Error('Storage quota exceeded completely');
        quotaErr.name = 'QuotaExceededError';
        throw quotaErr;
      });

      const result = await saveScanRecord({
        scanId: 'scan_guest_total_fail',
        imageUri: 'data:image/jpeg;base64,fail',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
      });

      // Must report explicit failure with clear error
      expect(result.success).toBe(false);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(false);
      expect(result.savedLocal).toBe(false);
      expect(result.error).toBe('Local storage is full or unavailable.');

      // Nothing stored
      expect(store['herefornature_history_guest_mock_123']).toBeUndefined();
    });

    it('reports successful local persistence when Tier 1 quota recovery succeeds', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      // Prepopulate with 20 items
      const initialItems = Array.from({ length: 20 }, (_, idx) => ({
        id: `scan_tier1_pre_${idx}`,
        created_at: new Date().toISOString(),
      }));
      store['herefornature_history_guest_mock_123'] = JSON.stringify(initialItems);

      let attempts = 0;
      const realSetItem = mockLocalStorage.setItem;
      mockLocalStorage.setItem = vi.fn((key: string, val: string) => {
        attempts++;
        if (attempts === 1) {
          // First attempt (30 bounded) fails with quota error
          const quotaErr = new Error('Quota exceeded on initial set');
          quotaErr.name = 'QuotaExceededError';
          throw quotaErr;
        }
        // Tier 1 retry (10 trimmed) succeeds
        return realSetItem(key, val);
      });

      const result = await saveScanRecord({
        scanId: 'scan_tier1_success',
        imageUri: 'data:image/jpeg;base64,tier1',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'yellow',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.savedLocal).toBe(true);
      expect(attempts).toBe(2);

      const saved = JSON.parse(store['herefornature_history_guest_mock_123'] || '[]');
      expect(saved.length).toBeLessThanOrEqual(10);
      expect(saved[0].id).toBe('scan_tier1_success');
    });

    it('reports successful local persistence when Tier 2 quota recovery (stripping older images) succeeds', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      const initialItems = Array.from({ length: 15 }, (_, idx) => ({
        id: `scan_tier2_pre_${idx}`,
        created_at: new Date().toISOString(),
        image_url: 'data:image/jpeg;base64,large_pre_image',
      }));
      store['herefornature_history_guest_mock_123'] = JSON.stringify(initialItems);

      let attempts = 0;
      const realSetItem = mockLocalStorage.setItem;
      mockLocalStorage.setItem = vi.fn((key: string, val: string) => {
        attempts++;
        if (attempts <= 2) {
          // Initial write and Tier 1 (trimmed) fail
          const quotaErr = new Error('Quota exceeded on initial and tier 1');
          quotaErr.name = 'QuotaExceededError';
          throw quotaErr;
        }
        // Tier 2 (compact: older image payloads stripped) succeeds
        return realSetItem(key, val);
      });

      const result = await saveScanRecord({
        scanId: 'scan_tier2_success',
        imageUri: 'data:image/jpeg;base64,new_image',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
        urgencyColor: 'red',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.savedLocal).toBe(true);
      expect(attempts).toBe(3);

      const saved = JSON.parse(store['herefornature_history_guest_mock_123'] || '[]');
      expect(saved[0].id).toBe('scan_tier2_success');
      // Older items stripped of image payloads
      expect(saved[1].image_url).toBe('');
    });

    it('reports successful local persistence when Tier 3 quota recovery (metadata-only) succeeds', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      let attempts = 0;
      const realSetItem = mockLocalStorage.setItem;
      mockLocalStorage.setItem = vi.fn((key: string, val: string) => {
        attempts++;
        if (attempts <= 3) {
          // Initial, Tier 1, and Tier 2 fail
          const quotaErr = new Error('Quota exceeded on initial, tier 1, and tier 2');
          quotaErr.name = 'QuotaExceededError';
          throw quotaErr;
        }
        // Tier 3 (metadata-only) succeeds
        return realSetItem(key, val);
      });

      const result = await saveScanRecord({
        scanId: 'scan_tier3_success',
        imageUri: 'data:image/jpeg;base64,new_image',
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leaf-curl',
        urgencyColor: 'red',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.savedLocal).toBe(true);
      expect(attempts).toBe(4);

      const saved = JSON.parse(store['herefornature_history_guest_mock_123'] || '[]');
      expect(saved).toHaveLength(1);
      expect(saved[0].id).toBe('scan_tier3_success');
      expect(saved[0].image_url).toBe(''); // Image stripped for metadata survival
      expect(saved[0].crop_detected_id).toBe('crop-chilli');
      expect(saved[0].disease_detected_id).toBe('disease-chilli-leaf-curl');
    });

    it('reports authenticated cloud persistence accurately when cloud succeeds but local write fails', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      // Local storage write fails completely
      mockLocalStorage.setItem = vi.fn(() => {
        const quotaErr = new Error('Local storage full');
        quotaErr.name = 'QuotaExceededError';
        throw quotaErr;
      });

      // Cloud storage upload and database insert succeed
      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({
        data: { path: 'user_auth_99/scan_cloud_ok_local_fail.jpg' },
        error: null,
      });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({ error: null });

      const result = await saveScanRecord({
        scanId: 'scan_cloud_ok_local_fail',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
        urgencyColor: 'red',
      });

      // Cloud persistence succeeds
      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.savedLocallyOnly).toBe(false);
      // Explicitly notes that local storage did not persist the history record
      expect(result.savedLocal).toBe(false);
      expect(result.storagePath).toBe('user_auth_99/scan_cloud_ok_local_fail.jpg');

      // DB insert was called
      expect(dbMock.insert).toHaveBeenCalledTimes(1);
    });

    it('reports failure when authenticated cloud persistence fails AND local write fails', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_auth_99');

      // Both local and cloud fail
      mockLocalStorage.setItem = vi.fn(() => {
        throw new Error('Local storage unavailable');
      });

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({
        data: null,
        error: { message: 'Cloud storage network error' },
      });

      const result = await saveScanRecord({
        scanId: 'scan_total_failure',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
        urgencyColor: 'red',
      });

      // Total failure reported
      expect(result.success).toBe(false);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(false);
      expect(result.savedLocal).toBe(false);
      expect(result.error).toContain('Cloud storage network error');
    });

    it('maps save outcomes to the correct UI save status, button classes, and localized copy', () => {
      // Helper simulating the ResultScreen saveStatus resolution logic
      function resolveUiState(saveResult: SaveScanResult, lang: 'en' | 'te') {
        let saveStatus: 'saved_cloud' | 'saved_local' | 'failed';
        if (!saveResult.success) {
          saveStatus = 'failed';
        } else if (saveResult.savedCloud) {
          saveStatus = 'saved_cloud';
        } else {
          saveStatus = 'saved_local';
        }

        const buttonClass =
          saveStatus === 'saved_cloud'
            ? 'btn-saved'
            : saveStatus === 'saved_local'
            ? 'btn-saved-local'
            : 'btn-save-failed';

        const buttonText =
          saveStatus === 'saved_cloud'
            ? `✓ ${translate('saved', lang)}`
            : saveStatus === 'saved_local'
            ? `💾 ${translate('savedLocally', lang)}`
            : `⚠️ ${translate('saveFailed', lang)}`;

        const subtext =
          saveStatus === 'saved_local'
            ? `💾 ${translate('savedLocallyDesc', lang)}`
            : saveStatus === 'failed'
            ? `⚠️ ${translate('saveFailedDesc', lang)}`
            : null;

        const disabled = saveStatus === 'saved_cloud' || saveStatus === 'saved_local';

        return { saveStatus, buttonClass, buttonText, subtext, disabled };
      }

      // 1. Total Failure (Guest or Auth with total failure)
      const failResult: SaveScanResult = {
        success: false,
        savedCloud: false,
        savedLocallyOnly: false,
        savedLocal: false,
        error: 'Local storage is full or unavailable.',
      };
      const uiFailEn = resolveUiState(failResult, 'en');
      expect(uiFailEn.saveStatus).toBe('failed');
      expect(uiFailEn.buttonClass).toBe('btn-save-failed');
      expect(uiFailEn.buttonText).toBe('⚠️ Save Failed — Retry');
      expect(uiFailEn.subtext).toBe('⚠️ Could not save scan to storage. Tap to try again.');
      expect(uiFailEn.disabled).toBe(false); // User can retry

      const uiFailTe = resolveUiState(failResult, 'te');
      expect(uiFailTe.buttonText).toBe('⚠️ సేవ్ విఫలమైంది — మళ్లీ ప్రయత్నించండి');
      expect(uiFailTe.subtext).toBe('⚠️ స్కాన్‌ను నిల్వలో సేవ్ చేయడం విఫలమైంది. మళ్లీ ప్రయత్నించడానికి నొక్కండి.');

      // 2. Successful Local Save (Guest or Cloud fallback)
      const localResult: SaveScanResult = {
        success: true,
        savedCloud: false,
        savedLocallyOnly: true,
        savedLocal: true,
      };
      const uiLocalEn = resolveUiState(localResult, 'en');
      expect(uiLocalEn.saveStatus).toBe('saved_local');
      expect(uiLocalEn.buttonClass).toBe('btn-saved-local');
      expect(uiLocalEn.buttonText).toBe('💾 Saved Locally (Not Uploaded)');
      expect(uiLocalEn.subtext).toBe(
        '💾 Saved locally on this device. This scan remains on this browser and is not automatically uploaded to cloud.'
      );
      expect(uiLocalEn.disabled).toBe(true);

      const uiLocalTe = resolveUiState(localResult, 'te');
      expect(uiLocalTe.buttonText).toBe('💾 స్థానికంగా సేవ్ చేయబడింది (అప్‌లోడ్ కాలేదు)');
      expect(uiLocalTe.subtext).toBe(
        '💾 ఈ పరికరంలో మాత్రమే స్థానికంగా సేవ్ చేయబడింది. ఈ స్కాన్ ఈ బ్రౌజర్‌లో మాత్రమే ఉంటుంది మరియు క్లౌడ్‌కి ఆటోమేటిక్‌గా అప్‌లోడ్ చేయబడదు.'
      );

      // 3. Successful Cloud Save (Authenticated)
      const cloudResult: SaveScanResult = {
        success: true,
        savedCloud: true,
        savedLocallyOnly: false,
        savedLocal: true,
      };
      const uiCloudEn = resolveUiState(cloudResult, 'en');
      expect(uiCloudEn.saveStatus).toBe('saved_cloud');
      expect(uiCloudEn.buttonClass).toBe('btn-saved');
      expect(uiCloudEn.buttonText).toBe('✓ Saved');
      expect(uiCloudEn.subtext).toBeNull();
      expect(uiCloudEn.disabled).toBe(true);

      const uiCloudTe = resolveUiState(cloudResult, 'te');
      expect(uiCloudTe.buttonText).toBe('✓ సేవ్ చేయబడింది');
      expect(uiCloudTe.subtext).toBeNull();

      // 4. Cloud save succeeds even if local write failed
      const cloudOnlyResult: SaveScanResult = {
        success: true,
        savedCloud: true,
        savedLocallyOnly: false,
        savedLocal: false,
      };
      const uiCloudOnly = resolveUiState(cloudOnlyResult, 'en');
      expect(uiCloudOnly.saveStatus).toBe('saved_cloud');
      expect(uiCloudOnly.buttonClass).toBe('btn-saved');
      expect(uiCloudOnly.subtext).toBeNull(); // No local-save confirmation displayed
    });
  });

  describe('Phase 5.3 Diagnostic Provenance Persistence & Schema Migration Fallback', () => {
    it('persists diagnostic_tier and is_demo_sample to cloud, reporting cloudProvenancePersisted: true', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_prov_1');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_prov_1/scan_prov_1.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({ error: null });

      const result = await saveScanRecord({
        scanId: 'scan_prov_1',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
        diagnosticTier: 'ai_preliminary_hypothesis',
        isDemoSample: false,
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.cloudProvenancePersisted).toBe(true);

      expect(dbMock.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'scan_prov_1',
          user_id: 'user_prov_1',
          crop_detected_id: 'crop-rice',
          disease_detected_id: 'disease-rice-blast',
          urgency_color: 'red',
          diagnostic_tier: 'ai_preliminary_hypothesis',
          is_demo_sample: false,
        })
      );
    });

    it('strictly sanitises and demotes expert_confirmed tier to ai_preliminary_hypothesis before persisting', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_prov_2');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_prov_2/scan_prov_2.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      dbMock.insert.mockResolvedValueOnce({ error: null });

      const result = await saveScanRecord({
        scanId: 'scan_prov_2',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        urgencyColor: 'red',
        diagnosticTier: 'expert_confirmed', // Strictly prohibited without real agronomist workflow
        isDemoSample: false,
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.cloudProvenancePersisted).toBe(true);

      // Must be demoted to ai_preliminary_hypothesis
      expect(dbMock.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'scan_prov_2',
          diagnostic_tier: 'ai_preliminary_hypothesis',
        })
      );
    });

    it('gracefully falls back to legacy columns if cloud schema lacks diagnostic_tier, reporting cloudProvenancePersisted: false', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue('user_prov_3');

      const storageMock = (supabase as any).storage.from(CROP_SCANS_BUCKET);
      storageMock.upload.mockResolvedValueOnce({ data: { path: 'user_prov_3/scan_fallback_1.jpg' }, error: null });

      const dbMock = (supabase as any).from('scan_history');
      // First insert attempt fails because remote schema cache lacks diagnostic_tier (e.g. migration 004 pending)
      dbMock.insert
        .mockResolvedValueOnce({
          error: {
            code: 'PGRST204',
            message: "Could not find the 'diagnostic_tier' column of 'scan_history' in the schema cache",
          },
        })
        // Second insert attempt (fallback without provenance columns) succeeds
        .mockResolvedValueOnce({ error: null });

      const result = await saveScanRecord({
        scanId: 'scan_fallback_1',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-chilli',
        diseaseId: 'disease-chilli-leaf-curl',
        urgencyColor: 'yellow',
        diagnosticTier: 'ai_preliminary_hypothesis',
        isDemoSample: false,
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(true);
      expect(result.cloudProvenancePersisted).toBe(false);

      // Verify the fallback call did NOT include diagnostic_tier or is_demo_sample
      expect(dbMock.insert).toHaveBeenNthCalledWith(
        2,
        expect.not.objectContaining({
          diagnostic_tier: expect.anything(),
        })
      );
    });

    it('correctly identifies missing column errors via isMissingColumnError helper', () => {
      expect(isMissingColumnError(null)).toBe(false);
      expect(isMissingColumnError({ code: 'PGRST204', message: 'Schema cache column missing' })).toBe(true);
      expect(isMissingColumnError({ code: '42703', message: 'column diagnostic_tier does not exist' })).toBe(true);
      expect(isMissingColumnError({ message: "Could not find the 'diagnostic_tier' column" })).toBe(true);
      expect(isMissingColumnError({ message: "Could not find the 'is_demo_sample' column" })).toBe(true);
      expect(isMissingColumnError({ message: 'column "diagnostic_tier" of relation "scan_history" does not exist' })).toBe(true);
      expect(isMissingColumnError({ code: '23505', message: 'duplicate key error' })).toBe(false);
    });

    it('ensures unauthenticated guest saves return cloudProvenancePersisted: false', async () => {
      vi.mocked(authModule.getAuthenticatedUserId).mockResolvedValue(null);

      const result = await saveScanRecord({
        scanId: 'scan_guest_prov',
        imageUri: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==',
        cropId: 'crop-groundnut',
        diseaseId: 'disease-groundnut-tikka',
        urgencyColor: 'green',
        diagnosticTier: 'ai_preliminary_hypothesis',
      });

      expect(result.success).toBe(true);
      expect(result.savedCloud).toBe(false);
      expect(result.savedLocallyOnly).toBe(true);
      expect(result.cloudProvenancePersisted).toBe(false);
    });
  });
});

