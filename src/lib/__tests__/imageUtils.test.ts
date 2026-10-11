import { describe, it, expect } from 'vitest';
import { validateImageFile, MAX_FILE_SIZE, dataUrlToBlob } from '../imageUtils';

describe('Image Utilities', () => {
  it('rejects non-image files with bilingual errors', () => {
    const textFile = new File(['hello world'], 'document.txt', { type: 'text/plain' });
    const result = validateImageFile(textFile);

    expect(result.valid).toBe(false);
    expect(result.errorEn).toContain('image file');
    expect(result.errorTe).toBeTruthy();
  });

  it('rejects files larger than MAX_FILE_SIZE (10 MB)', () => {
    const largeBlob = new Uint8Array(MAX_FILE_SIZE + 1024);
    const largeFile = new File([largeBlob], 'huge.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(largeFile);

    expect(result.valid).toBe(false);
    expect(result.errorEn).toContain('too large');
    expect(result.errorTe).toBeTruthy();
  });

  it('accepts valid JPEG and PNG files under 10 MB', () => {
    const validJpg = new File([new Uint8Array(1024)], 'leaf.jpg', { type: 'image/jpeg' });
    const validPng = new File([new Uint8Array(2048)], 'leaf.png', { type: 'image/png' });

    expect(validateImageFile(validJpg).valid).toBe(true);
    expect(validateImageFile(validPng).valid).toBe(true);
  });

  it('converts base64 data URLs to binary Blobs with matching mime types', () => {
    const sampleDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const blob = dataUrlToBlob(sampleDataUrl);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/jpeg');
    expect(blob.size).toBeGreaterThan(0);
  });
});

