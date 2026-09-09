import type { Crop, Disease, Treatment } from '../types/database';

export const MOCK_CROPS: Crop[] = [
  {
    id: 'crop-rice',
    name_en: 'Paddy / Rice',
    name_te: 'వరి',
    category: 'Cereal',
    tier: 1,
    ap_regions: ['Godavari', 'Krishna', 'Guntur', 'Nellore'],
    growing_season: 'Kharif / Rabi',
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'crop-chilli',
    name_en: 'Chilli',
    name_te: 'మిరప',
    category: 'Spice / Cash Crop',
    tier: 1,
    ap_regions: ['Guntur', 'Prakasam', 'Khammam', 'Kurnool'],
    growing_season: 'Kharif',
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'crop-cotton',
    name_en: 'Cotton',
    name_te: 'ప్రత్తి',
    category: 'Commercial / Fibre',
    tier: 1,
    ap_regions: ['Kurnool', 'Anantapur', 'Guntur'],
    growing_season: 'Kharif',
    image_url: null,
    created_at: new Date().toISOString(),
  },
];

export const MOCK_DISEASES: Disease[] = [
  {
    id: 'disease-rice-blast',
    crop_id: 'crop-rice',
    name_en: 'Rice Blast',
    name_te: 'అగ్గి తెగులు',
    type: 'Fungal (Magnaporthe oryzae)',
    symptoms_en:
      'Spindle-shaped lesions with brown borders and ash-gray centers appear on leaf blades and nodes.',
    symptoms_te:
      'ఆకులపై నూలుకండ ఆకారపు మచ్చలు, గోధుమ రంగు అంచులు మరియు బూడిద రంగు కేంద్రంతో కనిపిస్తాయి.',
    affected_parts: ['Leaves', 'Neck', 'Nodes'],
    urgency_level: 'High',
    urgency_color: 'red',
    ap_specific_tip_en:
      'Common in Krishna and Godavari deltas under high humidity. Avoid excessive urea application.',
    ap_specific_tip_te:
      'కృష్ణా, గోదావరి డెల్టా ప్రాంతాల్లో తేమ అధికంగా ఉన్నప్పుడు ఈ తెగులు వ్యాపిస్తుంది. యూరియా అధిక మోతాదులో వాడవద్దు.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'disease-chilli-leaf-curl',
    crop_id: 'crop-chilli',
    name_en: 'Chilli Leaf Curl Virus',
    name_te: 'మిరప ఆకు ముడుత తెగులు',
    type: 'Viral (Transmitted by Whiteflies/Thrips)',
    symptoms_en:
      'Leaves curl upwards, thicken, and show vein clearing. Plants become stunted with reduced flowering.',
    symptoms_te:
      'ఆకులు పైకి ముడుచుకుని మందంగా మారతాయి. మొక్క ఎదుగుదల ఆగిపోయి పూత రాలిపోతుంది.',
    affected_parts: ['Leaves', 'Shoots'],
    urgency_level: 'Medium',
    urgency_color: 'yellow',
    ap_specific_tip_en:
      'Install yellow and blue sticky traps (15/acre) in Guntur and Prakasam fields to trap vector insects.',
    ap_specific_tip_te:
      'గుంటూరు, ప్రకాశం జిల్లాల్లో రసం పీల్చే పురుగుల నివారణకు ఎకరానికి 15 పసుపు, నీలం జిగురు అట్టలను అమర్చండి.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'disease-cotton-bollworm',
    crop_id: 'crop-cotton',
    name_en: 'Pink Bollworm',
    name_te: 'గులాబీ రంగు కాయ తొలుచు పురుగు',
    type: 'Insect Pest (Pectinophora gossypiella)',
    symptoms_en:
      'Rosetted flowers that do not open properly, boreholes plugged with frass, premature boll opening.',
    symptoms_te:
      'పువ్వులు ముడుచుకుపోయి విచ్చుకోవు. కాయలకు రంధ్రాలు ఏర్పడి విసర్జితాలు కనిపిస్తాయి, కాయలు ముందే పగులుతాయి.',
    affected_parts: ['Flowers', 'Bolls'],
    urgency_level: 'High',
    urgency_color: 'red',
    ap_specific_tip_en:
      'Install 5 pheromone traps per acre in Rayalaseema black soils to monitor moth emergence.',
    ap_specific_tip_te:
      'రాయలసీమ నల్లరేగడి నేలల్లో రెక్కల పురుగుల ఉనికిని తెలుసుకోవడానికి ఎకరానికి 5 లింగాకర్షక బుట్టలను అమర్చండి.',
    created_at: new Date().toISOString(),
  },
];

export const MOCK_TREATMENTS: Treatment[] = [
  // Rice blast
  {
    id: 't-rb-1',
    disease_id: 'disease-rice-blast',
    type: 'organic',
    step_number: 1,
    instruction_en: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 10g/L in morning hours.',
    instruction_te: 'ఉదయం వేళల్లో 5% వేప గింజల కషాయం లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
    product_name: 'Neem Seed Kernel Extract / Pseudomonas fluorescens',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-rb-2',
    disease_id: 'disease-rice-blast',
    type: 'chemical',
    step_number: 1,
    instruction_en: 'Spray Tricyclazole 75% WP @ 0.6g per litre of water at first sign of spindle spots.',
    instruction_te: 'మచ్చలు కనిపించిన వెంటనే ట్రైసైక్లాజోల్ 75% WP 0.6 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
    product_name: 'Baan (Tricyclazole 75% WP)',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-rb-3',
    disease_id: 'disease-rice-blast',
    type: 'preventive',
    step_number: 1,
    instruction_en: 'Treat seeds with Carbendazim 2g/kg seed before sowing; maintain balanced potassium nutrition.',
    instruction_te: 'విత్తన శుద్ధి కోసం కార్బెండజిమ్ 2 గ్రాములు కిలో విత్తనానికి పట్టించండి; పొటాష్ సమపాళ్లలో అందించండి.',
    product_name: 'Carbendazim 50% WP',
    created_at: new Date().toISOString(),
  },

  // Chilli leaf curl
  {
    id: 't-clc-1',
    disease_id: 'disease-chilli-leaf-curl',
    type: 'organic',
    step_number: 1,
    instruction_en: 'Spray 10,000 ppm Neem Oil @ 2ml/L mixed with 1ml liquid soap to deter whiteflies.',
    instruction_te: 'తెల్లదోమ నివారణకు 10,000 ppm వేప నూనె 2 మి.లీ. లీటరు నీటికి కొద్దిగా సబ్బు నీటితో కలిపి పిచికారీ చేయండి.',
    product_name: 'Cold-pressed Neem Oil 10,000 ppm',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-clc-2',
    disease_id: 'disease-chilli-leaf-curl',
    type: 'chemical',
    step_number: 1,
    instruction_en: 'Spray Diafenthiuron 50% WP @ 1.25g/L or Fipronil 5% SC @ 2ml/L of water.',
    instruction_te: 'డయాఫెంతియురాన్ 50% WP 1.25 గ్రా లేదా ఫిప్రోనిల్ 5% SC 2 మి.లీ. లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
    product_name: 'Pegasus (Diafenthiuron 50% WP)',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-clc-3',
    disease_id: 'disease-chilli-leaf-curl',
    type: 'preventive',
    step_number: 1,
    instruction_en: 'Plant 2-3 rows of Maize or Sorghum along the field borders as live insect barrier.',
    instruction_te: 'పొలం చుట్టూ 2-3 వరుసలు జొన్న లేదా మొక్కజొన్నను సరిహద్దు పంటగా నాటండి.',
    product_name: null,
    created_at: new Date().toISOString(),
  },

  // Cotton bollworm
  {
    id: 't-cbw-1',
    disease_id: 'disease-cotton-bollworm',
    type: 'organic',
    step_number: 1,
    instruction_en: 'Release Trichogramma bactrae egg parasitoid wasps @ 60,000/acre at weekly intervals.',
    instruction_te: 'ట్రైకోగ్రామా గుడ్ల పరాన్నజీవులను ఎకరానికి 60,000 చొప్పున వారం వ్యవధిలో వదలండి.',
    product_name: 'Trichogramma Cards (Tricho-cards)',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-cbw-2',
    disease_id: 'disease-cotton-bollworm',
    type: 'chemical',
    step_number: 1,
    instruction_en: 'Spray Emamectin Benzoate 5% SG @ 4g per 10 litres of water during early infestation.',
    instruction_te: 'పురుగు ప్రారంభ దశలో ఎమామెక్టిన్ బెంజోయేట్ 5% SG 4 గ్రాములు 10 లీటర్ల నీటికి కలిపి పిచికారీ చేయండి.',
    product_name: 'Proclaim (Emamectin Benzoate 5% SG)',
    created_at: new Date().toISOString(),
  },
  {
    id: 't-cbw-3',
    disease_id: 'disease-cotton-bollworm',
    type: 'preventive',
    step_number: 1,
    instruction_en: 'Avoid extended ratoon cotton; destroy stalks immediately after final picking.',
    instruction_te: 'రైతులు పత్తి పంట పూర్తయ్యాక మోడులను వెంటనే తొలగించండి; మోడు పత్తి వేయవద్దు.',
    product_name: null,
    created_at: new Date().toISOString(),
  },
];

export function getRandomMockDetection() {
  const pick = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
  const confidence = 0.72 + Math.random() * 0.25;
  return {
    cropId: pick.crop_id as string,
    diseaseId: pick.id,
    confidence: Number(confidence.toFixed(2)),
  };
}

export function getMockCrop(id: string): Crop | undefined {
  return MOCK_CROPS.find((c) => c.id === id);
}

export function getMockDisease(id: string): Disease | undefined {
  return MOCK_DISEASES.find((d) => d.id === id);
}

export function getMockTreatments(diseaseId: string): Treatment[] {
  return MOCK_TREATMENTS.filter((t) => t.disease_id === diseaseId);
}

export const SAMPLE_CROP_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAEmElEQVR4nO3S220cMRAF0UnIsTgPx+JwHJPTkAFDH4as1S45JKsfVQD/pAXm9rku+9u3H9/fRt6v3z//e6O/QX+zBWgUzUqAQmzcLJYdAIXYqLtIdgIUYuFW4TgBUIiFWo3iJEAhJm8XiNMARZisnRAogEJM0gkEJEARBu4UABqgCAN28vgRAIowUKcPHwWgCANEHD0SQBGCUQePBlCEQOSxIwIU4cHoQ0cFKMID0QeODlCEG6MPmwWgCDdEHzQbQBEujD5kVoAiXBR9RAE2jj5gdoAivBF9uCoARTgRfbBqAEU4GH0sATaOPlRVgCJ8IfpA1QGK8En0cQTYOPowXQCK8EH0UQTYOPog3QCK8EP0MQTYOPoQXQGK8D36CAJsHH2A7gDbI6THF2BjgPTwAmyOkB5dgI0B0oMLsDlCemwBChAfXIBNAdJDC7A5QnpkATYGSA8swOYI6XEFKEB8YAE2BUgPK8DmCOlRBShAfFgBNgVIDyrA5gjpMQUoQHxQAQqwzBNgoughBdgcIT2iAAWIDylAAZZ6AkwUPaIAGwOkBxRgc4T0eAIUID6gAAVY7gkwSfR4AmwMkB5OgM0R0qMJUID4cAIUYMknwATRowlQgPhwAhRgySfABNGjCVCA+HACbAqQHkyAzRHSYwlQgPhgAhRg2SfA4NFjCVCA+GACFGDZJ8Dg0WOdhNcFIm1qKHosAl51iLSpoeixSHhVIdKmhqLHigCvGkTa1FD0WJHgVYFImxqKHisivOwQaVND0WPthPfo/+78XoZHmxqKHmsXvK/+f+XvR3y0qaHosXbBexVgRYi0qaHosXZDWPH32SDSpoajB9t5+JX/lwEibWmqivDuAswKkbY0VUV4qwBmg0hbmqoivNUAs0CkLU1VEd4ugPT3CDDZoYjfJyHSlqaqCO8UwGjfS1uaquIhTgOM8v20pakqDB8FIL0HbWm6bENHB0jsQxu6VeRhMwM8uRdt6FaRhqwI8MR+tKFbVYMXFeDOPWlDt6oGLzrAHfvShm5XCV4WgKv2pu0saXYM+ngVAN7dnrazpNER6GNVBDh7A9rOkl79ePo4HQCO3oK2s6RnH00foyPAV29C21nWZx9Mjy/Az7+nHL7rA0B6bAF+/V2lAVZ5VQH++2gzS6PHFGBzgFcxhNUB0la2RI8qQAHiwwqwMcCrEMLKAGkjW6PHFaAA8YEF2BjgVQRhVYC0jSPRIwuwOcCrAMKKAGkTR6PHFqAA8cEF2BjglRxhNYC0BSR6dAE2B3glRlgJIG0AjR5fgM0BXkkRVgFI3z5E9BEEaOkQVgBI3zxU9DEEaKkQZgdI3zpk9FEEaGkQZgZI3zh09HEEaCkQZgVI3zZN9KEqAqRvmir6WAK00AizAaRvmTb6cBUA0jdMH33AzADp25WIPqIALRzCDADpm5WLPmgmgPStykYfNgNA+kblow8cGSB9mzbRh44IkL5JuwQoPjwBig+vM0B6e3uvI0B6c/tQJ4D01vagDgDpje1JlQHS29pAlQDSW9pkFQDSG9qCMgKkN7MNZQBIb2QHigiQ3sSAIgCkNyD7A4DGJ2PexRD6AAAAAElFTkSuQmCC';

