import { describe, it, expect } from 'vitest';
import { isPlausibleSupabaseUrl, isPlausibleAnonKey } from '../supabase';

describe('Supabase env var sanity checks (catch misconfiguration at startup)', () => {
  it('accepts a real-looking Supabase project URL', () => {
    expect(isPlausibleSupabaseUrl('https://magxfdmhnanomqpxwzjv.supabase.co')).toBe(true);
  });

  it('rejects a non-Supabase host, http instead of https, or garbage', () => {
    expect(isPlausibleSupabaseUrl('https://example.com')).toBe(false);
    expect(isPlausibleSupabaseUrl('http://magxfdmhnanomqpxwzjv.supabase.co')).toBe(false);
    expect(isPlausibleSupabaseUrl('not a url at all')).toBe(false);
    expect(isPlausibleSupabaseUrl('')).toBe(false);
  });

  it('accepts a real-looking anon key (three-part JWT)', () => {
    expect(isPlausibleAnonKey('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYW5vbiJ9.signature')).toBe(true);
  });

  it('rejects an obviously wrong anon key', () => {
    expect(isPlausibleAnonKey('not-a-jwt')).toBe(false);
    expect(isPlausibleAnonKey('')).toBe(false);
    expect(isPlausibleAnonKey('two.parts')).toBe(false);
  });
});
