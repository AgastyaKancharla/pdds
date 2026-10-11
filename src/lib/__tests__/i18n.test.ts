import { describe, it, expect } from 'vitest';
import { translations, translate, type TranslationKey } from '../i18n';

describe('Internationalization (i18n)', () => {
  it('has both English and Telugu translations for every key', () => {
    const keys = Object.keys(translations) as TranslationKey[];
    expect(keys.length).toBeGreaterThan(30);

    for (const key of keys) {
      const entry = translations[key];
      expect(entry.en).toBeTruthy();
      expect(typeof entry.en).toBe('string');
      expect(entry.en.trim().length).toBeGreaterThan(0);

      expect(entry.te).toBeTruthy();
      expect(typeof entry.te).toBe('string');
      expect(entry.te.trim().length).toBeGreaterThan(0);
    }
  });

  it('correctly translates keys based on chosen language', () => {
    expect(translate('appName', 'en')).toBe('HereForNature');
    expect(translate('appName', 'te')).toBe('హియర్‌ఫర్‌నేచర్');

    expect(translate('scanNow', 'en')).toBe('Scan Crop');
    expect(translate('scanNow', 'te')).toBe('పంటను స్కాన్ చేయండి');
  });
});
