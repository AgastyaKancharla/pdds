/**
 * Compress an image file before upload.
 * Target: max 1280px longest edge, JPEG quality 0.8, max ~1MB output.
 */
export function compressImage(
  file: File,
  maxDimension = 1280,
  quality = 0.8
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round(height * (maxDimension / width));
            width = maxDimension;
          } else {
            width = Math.round(width * (maxDimension / height));
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Compression failed'));
              return;
            }
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve({ blob, dataUrl, width, height });
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/** Max file size in bytes (10 MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Validate image file before processing */
export function validateImageFile(file: File): { valid: boolean; errorEn?: string; errorTe?: string } {
  if (!file.type.startsWith('image/')) {
    return {
      valid: false,
      errorEn: 'Please select an image file (JPG, PNG, etc.).',
      errorTe: 'దయచేసి చిత్ర ఫైల్‌ను ఎంచుకోండి (JPG, PNG, మొదలైనవి).',
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      errorEn: 'Image is too large (max 10 MB). Please use a smaller photo.',
      errorTe: 'చిత్రం చాలా పెద్దది (గరిష్టం 10 MB). దయచేసి చిన్న ఫోటోను ఉపయోగించండి.',
    };
  }
  return { valid: true };
}

/** Convert a base64 data URL to a binary Blob */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Create a low-resolution thumbnail from a data URL or image source.
 * Target: max 160px longest edge, JPEG quality 0.6 (~5-10 KB output).
 * Gracefully falls back to empty string or safe placeholder if canvas/DOM is unavailable.
 */
export function createThumbnail(
  source: string,
  maxDimension = 160,
  quality = 0.6
): Promise<string> {
  return new Promise((resolve) => {
    if (!source) {
      resolve('');
      return;
    }
    // Remote URLs do not need local base64 thumbnailing
    if (source.startsWith('http://') || source.startsWith('https://')) {
      resolve(source);
      return;
    }
    // If not in a browser environment with canvas/image support, resolve safely
    if (typeof document === 'undefined' || typeof Image === 'undefined') {
      resolve('');
      return;
    }
    try {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width <= 0 || height <= 0) {
            resolve('');
            return;
          }
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round(height * (maxDimension / width));
              width = maxDimension;
            } else {
              width = Math.round(width * (maxDimension / height));
              height = maxDimension;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve('');
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const thumbDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(thumbDataUrl);
        } catch {
          resolve('');
        }
      };
      img.onerror = () => {
        resolve('');
      };
      img.src = source;
    } catch {
      resolve('');
    }
  });
}

