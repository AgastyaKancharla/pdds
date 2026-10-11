import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getLocalUserId, getAuthenticatedUserId, signOutUser, resetGuestSession } from '../auth';

describe('Authentication & User Ownership Helpers', () => {
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
    // Simulate browser window
    (globalThis as any).window = {};
    (globalThis as any).localStorage = mockLocalStorage;
  });

  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).localStorage;
  });

  it('generates and persists a local guest ID in localStorage', () => {
    const id1 = getLocalUserId();
    expect(id1).toMatch(/^guest_/);

    const id2 = getLocalUserId();
    expect(id2).toBe(id1);
    expect(mockLocalStorage.getItem('herefornature_user_id')).toBe(id1);
  });

  it('returns guest-user when window is undefined (SSR/Node mode)', () => {
    delete (globalThis as any).window;
    expect(getLocalUserId()).toBe('guest-user');
  });

  it('returns null or string from getAuthenticatedUserId without crashing', async () => {
    const authId = await getAuthenticatedUserId();
    expect(authId === null || typeof authId === 'string').toBe(true);
  });

  it('resetGuestSession regenerates guest ID and removes guest history while preserving others', () => {
    const initialGuestId = getLocalUserId();
    mockLocalStorage.setItem(`herefornature_history_${initialGuestId}`, JSON.stringify([{ id: 'g_scan_1' }]));
    mockLocalStorage.setItem('herefornature_history_guest', JSON.stringify([{ id: 'legacy_1' }]));
    mockLocalStorage.setItem('herefornature_history_user_auth_99', JSON.stringify([{ id: 'u_scan_1' }]));

    const newGuestId = resetGuestSession();

    expect(newGuestId).toMatch(/^guest_/);
    expect(newGuestId).not.toBe(initialGuestId);
    expect(mockLocalStorage.getItem('herefornature_user_id')).toBe(newGuestId);
    expect(mockLocalStorage.getItem(`herefornature_history_${initialGuestId}`)).toBeNull();
    expect(mockLocalStorage.getItem('herefornature_history_guest')).toBeNull();
    // Authenticated user history is preserved
    expect(mockLocalStorage.getItem('herefornature_history_user_auth_99')).not.toBeNull();
  });

  it('signOutUser completes cleanly and handles unauthenticated state gracefully', async () => {
    await expect(signOutUser()).resolves.not.toThrow();
  });
});
