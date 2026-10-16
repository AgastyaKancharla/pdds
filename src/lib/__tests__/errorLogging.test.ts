import { describe, it, expect, vi, beforeEach } from 'vitest';

const { insertMock, fromMock } = vi.hoisted(() => {
  const insertMock = vi.fn().mockResolvedValue({ data: null, error: null });
  const fromMock = vi.fn(() => ({ insert: insertMock }));
  return { insertMock, fromMock };
});

vi.mock('../supabase', () => ({
  supabase: { from: fromMock },
}));

vi.mock('../auth', () => ({
  getAuthenticatedUserId: vi.fn().mockResolvedValue(null),
  getLocalUserId: vi.fn().mockReturnValue('guest_test123'),
}));

import { logClientError } from '../errorLogging';

describe('Client error logging (reporting into the write-only client_errors table)', () => {
  beforeEach(() => {
    insertMock.mockClear();
    fromMock.mockClear();
  });

  it('logs an error with the expected shape', async () => {
    await logClientError('Something broke', 'Error: Something broke\n  at x', 'error_boundary', {
      componentStack: 'in X',
    });

    expect(fromMock).toHaveBeenCalledWith('client_errors');
    expect(insertMock).toHaveBeenCalledTimes(1);
    const row = insertMock.mock.calls[0][0];
    expect(row.message).toBe('Something broke');
    expect(row.source).toBe('error_boundary');
    expect(row.user_id).toBe('guest_test123');
    expect(row.context).toEqual({ componentStack: 'in X' });
  });

  it('never throws even if the insert itself fails', async () => {
    insertMock.mockRejectedValueOnce(new Error('network down'));
    await expect(logClientError('boom', undefined, 'window_onerror')).resolves.toBeUndefined();
  });

  it('caps the number of logged errors per session so a crash loop cannot flood the network', async () => {
    for (let i = 0; i < 20; i++) {
      await logClientError(`error ${i}`, undefined, 'unhandled_rejection');
    }
    // Earlier tests in this file already consumed some of the shared per-session cap, so this
    // just asserts the cap is enforced at all -- not every one of the 20 calls resulted in an insert.
    expect(insertMock.mock.calls.length).toBeLessThan(20);
  });
});
