/** Shared crop emoji map, used anywhere a crop needs a quick visual icon (Home, Library, Result). */
export const CROP_ICONS: Record<string, string> = {
  'crop-rice': '🌾',
  'crop-chilli': '🌶️',
  'crop-cotton': '☁️',
  'crop-groundnut': '🥜',
  'crop-maize': '🌽',
  'crop-sugarcane': '🎋',
  'crop-tomato': '🍅',
  'crop-mango': '🥭',
  'crop-banana': '🍌',
  'crop-turmeric': '🌿',
};

export function getCropIcon(cropId?: string | null): string {
  return (cropId && CROP_ICONS[cropId]) || '🌱';
}
