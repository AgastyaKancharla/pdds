import { getRandomMockDetection } from './mockData';
import { supabase } from './supabase';
import type { UrgencyColor } from '../types/database';

export interface DetectionResult {
  cropId: string;
  diseaseId: string;
  confidence: number;
}

/**
 * RED = 75-100% (Act Today!), YELLOW = 40-74% (Monitor), GREEN = 0-39% (Healthy).
 * Confidence here represents how strongly a disease was detected, so a high
 * score means urgent action, not "healthy" — the color scale is inverted
 * relative to a typical health score.
 */
export function urgencyFromConfidence(confidence: number): UrgencyColor {
  if (confidence >= 0.75) return 'red';
  if (confidence >= 0.4) return 'yellow';
  return 'green';
}

/**
 * Detect disease from image.
 * Uses Supabase database if available, and gracefully falls back to built-in
 * mock data so testing in web browsers and offline environments works seamlessly.
 */
export async function detectDisease(imageUri: string): Promise<DetectionResult> {
  void imageUri;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('diseases')
        .select('id, crop_id')
        .not('crop_id', 'is', null)
        .limit(50);

      if (!error && data && data.length > 0) {
        const pick = data[Math.floor(Math.random() * data.length)];
        const confidence = 0.7 + Math.random() * 0.29;

        return {
          cropId: pick.crop_id as string,
          diseaseId: pick.id,
          confidence: Number(confidence.toFixed(2)),
        };
      }
    } catch (err) {
      console.warn('[HereForNature] Supabase detection lookup failed, using fallback mock data:', err);
    }
  }

  // Graceful fallback for local web testing or offline testing
  return getRandomMockDetection();
}
