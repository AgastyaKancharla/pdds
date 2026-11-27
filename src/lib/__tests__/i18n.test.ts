import { describe, it, expect } from 'vitest';
import { translations, translate, type TranslationKey } from '../i18n';

describe('UI text (English-only)', () => {
  it('has a non-empty English string for every key', () => {
    const keys = Object.keys(translations) as TranslationKey[];
    expect(keys.length).toBeGreaterThan(30);

    for (const key of keys) {
      const entry = translations[key] as Record<string, string>;
      expect(typeof entry.en).toBe('string');
      expect(entry.en.trim().length).toBeGreaterThan(0);
      // English is the only language shipped.
      expect(Object.keys(entry)).toEqual(['en']);
    }
  });

  it('looks up keys in English', () => {
    expect(translate('appName', 'en')).toBe('HereForNature');
    expect(translate('scanNow', 'en')).toBe('Scan Crop');
  });

  it('falls back to the key itself for an unknown key', () => {
    expect(translate('notARealKey', 'en')).toBe('notARealKey');
  });
});
