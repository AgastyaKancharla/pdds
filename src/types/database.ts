export type UrgencyColor = 'red' | 'yellow' | 'green';
export type TreatmentType = 'organic' | 'chemical' | 'preventive';
export type DetectionFailureReason = 'not_crop' | 'unclear' | 'unsupported_crop' | 'healthy' | 'abiotic_stress' | 'nutrient_deficiency' | 'provider_unavailable';

export interface Crop {
  id: string;
  name_en: string;
  name_te: string;
  category: string;
  tier: number;
  ap_regions: string[] | null;
  growing_season: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Disease {
  id: string;
  crop_id: string | null;
  name_en: string;
  name_te: string;
  type: string;
  symptoms_en: string;
  symptoms_te: string;
  affected_parts: string[] | null;
  urgency_level: string;
  urgency_color: UrgencyColor;
  ap_specific_tip_en: string | null;
  ap_specific_tip_te: string | null;
  created_at: string;
}

export interface Treatment {
  id: string;
  disease_id: string | null;
  type: TreatmentType;
  step_number: number;
  instruction_en: string;
  instruction_te: string;
  product_name: string | null;
  created_at: string;
}

export interface AppUser {
  id: string;
  phone: string | null;
  name: string | null;
  language_preference: string | null;
  location_district: string | null;
  created_at: string;
}

export interface ScanHistoryRow {
  id: string;
  user_id: string | null;
  image_url: string | null;
  crop_detected_id: string | null;
  disease_detected_id: string | null;
  confidence_score: number | null;
  urgency_color: UrgencyColor | null;
  is_demo_sample?: boolean | null;
  diagnostic_tier?: string | null;
  created_at: string;
}

export interface ScanHistoryWithDetails extends ScanHistoryRow {
  crops: Pick<Crop, 'id' | 'name_en' | 'name_te'> | null;
  diseases: Pick<Disease, 'id' | 'name_en' | 'name_te' | 'urgency_color'> | null;
}
