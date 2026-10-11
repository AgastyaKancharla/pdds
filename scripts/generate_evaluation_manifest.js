import fs from 'node:fs';
import path from 'node:path';

/**
 * PDDS Phase 5 — 400-Image Evaluation Benchmark Manifest Generator
 * Standards: PlantVillage, Mendeley Crop Diseases, Field-AP benchmark.
 * Licensing: CC-BY-4.0 / CC0 Open Research Datasets
 */

const inCatalogDiseases = [
  { cropId: 'crop-rice', cropName: 'Paddy / Rice', cropNameTe: 'వరి', diseaseId: 'disease-rice-blast', diseaseName: 'Rice Blast (Pyricularia oryzae)', diseaseNameTe: 'అగ్గి తెగులు' },
  { cropId: 'crop-chilli', cropName: 'Chilli', cropNameTe: 'మిరప', diseaseId: 'disease-chilli-leaf-curl', diseaseName: 'Chilli Leaf Curl Virus (Begomovirus)', diseaseNameTe: 'ఆకు ముడుత వైరస్' },
  { cropId: 'crop-cotton', cropName: 'Cotton', cropNameTe: 'ప్రత్తి', diseaseId: 'disease-cotton-bollworm', diseaseName: 'Pink Bollworm (Pectinophora gossypiella)', diseaseNameTe: 'గులాబీ రంగు కాయ తొలుచు పురుగు' },
  { cropId: 'crop-groundnut', cropName: 'Groundnut', cropNameTe: 'వేరుశనగ', diseaseId: 'disease-groundnut-tikka', diseaseName: 'Tikka Leaf Spot (Cercospora arachidicola)', diseaseNameTe: 'టిక్కా ఆకుమచ్చ తెగులు' },
  { cropId: 'crop-maize', cropName: 'Maize', cropNameTe: 'మొక్కజొన్న', diseaseId: 'disease-maize-armyworm', diseaseName: 'Fall Armyworm (Spodoptera frugiperda)', diseaseNameTe: 'కత్తెర పురుగు' },
  { cropId: 'crop-sugarcane', cropName: 'Sugarcane', cropNameTe: 'చెరకు', diseaseId: 'disease-sugarcane-redrot', diseaseName: 'Red Rot (Colletotrichum falcatum)', diseaseNameTe: 'ఎర్ర కుళ్లు తెగులు' },
  { cropId: 'crop-tomato', cropName: 'Tomato', cropNameTe: 'టమోటా', diseaseId: 'disease-tomato-earlyblight', diseaseName: 'Early Blight (Alternaria solani)', diseaseNameTe: 'ముందస్తు ఆకుమచ్చ తెగులు' },
  { cropId: 'crop-mango', cropName: 'Mango', cropNameTe: 'మామిడి', diseaseId: 'disease-mango-anthracnose', diseaseName: 'Anthracnose (Colletotrichum gloeosporioides)', diseaseNameTe: 'మచ్చ తెగులు' },
  { cropId: 'crop-banana', cropName: 'Banana', cropNameTe: 'అరటి', diseaseId: 'disease-banana-panamawilt', diseaseName: 'Panama Wilt (Fusarium oxysporum f. sp. cubense)', diseaseNameTe: 'పనామా తెగులు' },
  { cropId: 'crop-turmeric', cropName: 'Turmeric', cropNameTe: 'పసుపు', diseaseId: 'disease-turmeric-rhizomerot', diseaseName: 'Rhizome Rot (Pythium aphanidermatum)', diseaseNameTe: 'దుంప కుళ్లు తెగులు' },
];

const healthyCrops = [
  { cropId: 'crop-rice', cropName: 'Paddy / Rice', cropNameTe: 'వరి' },
  { cropId: 'crop-chilli', cropName: 'Chilli', cropNameTe: 'మిరప' },
  { cropId: 'crop-cotton', cropName: 'Cotton', cropNameTe: 'ప్రత్తి' },
  { cropId: 'crop-maize', cropName: 'Maize', cropNameTe: 'మొక్కజొన్న' },
  { cropId: 'crop-tomato', cropName: 'Tomato', cropNameTe: 'టమోటా' },
];

const abioticDisorders = [
  { cropId: 'crop-rice', cropName: 'Paddy / Rice', disorderId: 'abiotic-rice-zinc', name: 'Zinc Deficiency (Khaira syndrome)', type: 'nutrient_deficiency' },
  { cropId: 'crop-rice', cropName: 'Paddy / Rice', disorderId: 'abiotic-rice-iron', name: 'Iron Chlorosis', type: 'nutrient_deficiency' },
  { cropId: 'crop-chilli', cropName: 'Chilli', disorderId: 'abiotic-chilli-calcium', name: 'Calcium Deficiency (Blossom End Rot)', type: 'nutrient_deficiency' },
  { cropId: 'crop-cotton', cropName: 'Cotton', disorderId: 'abiotic-cotton-nitrogen', name: 'Nitrogen Deficiency Chlorosis', type: 'nutrient_deficiency' },
  { cropId: 'crop-cotton', cropName: 'Cotton', disorderId: 'abiotic-cotton-scorch', name: 'Drought Heat Scorch', type: 'abiotic' },
  { cropId: 'crop-maize', cropName: 'Maize', disorderId: 'abiotic-maize-nitrogen', name: 'V-shaped Nitrogen Chlorosis', type: 'nutrient_deficiency' },
  { cropId: 'crop-maize', cropName: 'Maize', disorderId: 'abiotic-maize-potassium', name: 'Marginal Leaf Potassium Necrosis', type: 'nutrient_deficiency' },
  { cropId: 'crop-tomato', cropName: 'Tomato', disorderId: 'abiotic-tomato-sunscald', name: 'Sunscald Foliar Bleaching', type: 'abiotic' },
  { cropId: 'crop-tomato', cropName: 'Tomato', disorderId: 'abiotic-tomato-magnesium', name: 'Interveinal Magnesium Chlorosis', type: 'nutrient_deficiency' },
  { cropId: 'crop-banana', cropName: 'Banana', disorderId: 'abiotic-banana-wind', name: 'Mechanical Wind Leaf Shredding', type: 'abiotic' },
];

const unsupportedConditions = [
  { cropId: 'crop-wheat', cropName: 'Wheat', disorderId: 'unsupported-wheat-rust', name: 'Wheat Stripe Rust (Puccinia striiformis)', type: 'unsupported_crop' },
  { cropId: 'crop-soybean', cropName: 'Soybean', disorderId: 'unsupported-soybean-rust', name: 'Asian Soybean Rust (Phakopsora pachyrhizi)', type: 'unsupported_crop' },
  { cropId: 'crop-apple', cropName: 'Apple', disorderId: 'unsupported-apple-scab', name: 'Apple Scab (Venturia inaequalis)', type: 'unsupported_crop' },
  { cropId: 'crop-rice', cropName: 'Paddy / Rice', disorderId: 'unsupported-rice-bakanae', name: 'Bakanae / Foot Rot (Gibberella fujikuroi)', type: 'unsupported_disease' },
  { cropId: 'crop-chilli', cropName: 'Chilli', disorderId: 'unsupported-chilli-anthracnose', name: 'Fruit Rot / Dieback (Colletotrichum capsici)', type: 'unsupported_disease' },
];

const nonCropDistractors = [
  'Tractor in field', 'Pesticide spray nozzle', 'Farmer hand with soil', 'Concrete farm shed',
  'Tractor tyre on mud', 'Non-crop field weeds', 'Bare soil plot', 'Plastic fertilizer sack',
  'Crop ledger notebook', 'Field clipboard checklist', 'Domestic livestock (cow)', 'Pheromone insect trap',
  'PVC irrigation drip line', 'Urea fertilizer crystals', 'Field boundary brick wall', 'Smartphone screen in field',
  'Sun hat / farmer towel', 'Harvester shadow on ground', 'Wooden staking stick', 'Vernacular farm newspaper'
];

const degradedModes = [
  { mode: 'blurry', count: 10, note: 'Severe camera motion blur or focal miss' },
  { mode: 'dark', count: 10, note: 'Severe underexposure / deep dusk shadow' },
  { mode: 'overexposed', count: 10, note: 'Extreme mid-day solar glare and washed out highlights' },
];

const manifest = [];
let serial = 1;

function padId(n) {
  return 'EVAL-' + String(n).padStart(4, '0');
}

// 1. 200 in-catalog disease images (20 each across 10 diseases)
for (const dis of inCatalogDiseases) {
  for (let i = 1; i <= 20; i++) {
    const isHard = i > 15;
    const isModerate = i > 10 && i <= 15;
    manifest.push({
      id: padId(serial++),
      source_dataset: i <= 10 ? 'PlantVillage' : i <= 15 ? 'Mendeley-Crop-Pathology' : 'Field-AP-Extension-Archive',
      crop_id: dis.cropId,
      crop_name_en: dis.cropName,
      crop_name_te: dis.cropNameTe,
      ground_truth_id: dis.diseaseId,
      ground_truth_name_en: dis.diseaseName,
      ground_truth_name_te: dis.diseaseNameTe,
      condition_category: 'in_catalog_disease',
      in_catalog: true,
      license: 'CC-BY-4.0',
      difficulty: isHard ? 'hard' : isModerate ? 'moderate' : 'easy',
      expected_quality: 'clear',
      expected_diagnostic_status: 'supported_diagnosis',
      relative_path: `data/benchmark_images/catalog/${dis.cropId}_${dis.diseaseId}_${String(i).padStart(2, '0')}.jpg`,
      notes: `${dis.cropName} exhibiting validated ${dis.diseaseName} foliar symptoms under field conditions.`
    });
  }
}

// 2. 50 healthy images (10 each across 5 crops)
for (const crop of healthyCrops) {
  for (let i = 1; i <= 10; i++) {
    manifest.push({
      id: padId(serial++),
      source_dataset: i <= 5 ? 'PlantVillage' : 'Field-AP-Extension-Archive',
      crop_id: crop.cropId,
      crop_name_en: crop.cropName,
      crop_name_te: crop.cropNameTe,
      ground_truth_id: 'condition-healthy',
      ground_truth_name_en: 'Healthy Foliage',
      ground_truth_name_te: 'ఆరోగ్యకరమైన పంట',
      condition_category: 'healthy_crop',
      in_catalog: true,
      license: 'CC-BY-4.0',
      difficulty: i > 7 ? 'moderate' : 'easy',
      expected_quality: 'clear',
      expected_diagnostic_status: 'supported_diagnosis',
      expected_condition_type: 'healthy',
      relative_path: `data/benchmark_images/healthy/${crop.cropId}_healthy_${String(i).padStart(2, '0')}.jpg`,
      notes: `Vigorous healthy foliage with no infectious or physiological lesions. Testing false-positive prevention.`
    });
  }
}

// 3. 50 abiotic and nutritional disorder images (5 each across 10 conditions)
for (const ab of abioticDisorders) {
  for (let i = 1; i <= 5; i++) {
    manifest.push({
      id: padId(serial++),
      source_dataset: 'ICAR-Nutritional-Disorders-Archive',
      crop_id: ab.cropId,
      crop_name_en: ab.cropName,
      ground_truth_id: ab.disorderId,
      ground_truth_name_en: ab.name,
      condition_category: ab.type,
      in_catalog: false,
      license: 'CC-BY-NC-4.0 / Research Use',
      difficulty: 'moderate',
      expected_quality: 'clear',
      expected_diagnostic_status: ab.type === 'nutrient_deficiency' ? 'nutrient_deficiency' : 'abiotic_stress',
      relative_path: `data/benchmark_images/abiotic/${ab.disorderId}_${String(i).padStart(2, '0')}.jpg`,
      notes: `Non-infectious physiological/nutritional disorder. System must NOT prescribe fungicides or pesticides.`
    });
  }
}

// 4. 50 unsupported crops and diseases (10 each across 5 conditions)
for (const un of unsupportedConditions) {
  for (let i = 1; i <= 10; i++) {
    manifest.push({
      id: padId(serial++),
      source_dataset: 'CGIAR-Open-Data',
      crop_id: un.cropId,
      crop_name_en: un.cropName,
      ground_truth_id: un.disorderId,
      ground_truth_name_en: un.name,
      condition_category: un.type,
      in_catalog: false,
      license: 'CC-BY-4.0',
      difficulty: 'moderate',
      expected_quality: 'clear',
      expected_diagnostic_status: un.type,
      relative_path: `data/benchmark_images/unsupported/${un.disorderId}_${String(i).padStart(2, '0')}.jpg`,
      notes: `Unsupported crop or uncataloged disease. System must honestly report out-of-scope rather than hallucinating.`
    });
  }
}

// 5. 50 non-crop distractors and degraded quality images
// 20 non-crop distractors
for (let i = 0; i < nonCropDistractors.length; i++) {
  manifest.push({
    id: padId(serial++),
    source_dataset: 'COCO-AgriDistractor-Subset',
    ground_truth_id: 'non-plant-object',
    ground_truth_name_en: nonCropDistractors[i],
    condition_category: 'non_plant',
    in_catalog: false,
    license: 'CC0 / Public Domain',
    difficulty: 'easy',
    expected_quality: 'clear',
    expected_diagnostic_status: 'not_plant',
    relative_path: `data/benchmark_images/non_plant/distractor_${String(i + 1).padStart(2, '0')}.jpg`,
    notes: `Non-agricultural object. System must reject as not_crop.`
  });
}

// 30 degraded quality images
for (const deg of degradedModes) {
  for (let i = 1; i <= deg.count; i++) {
    manifest.push({
      id: padId(serial++),
      source_dataset: 'Field-AP-Degraded-Collection',
      ground_truth_id: `degraded-${deg.mode}`,
      ground_truth_name_en: `Degraded image (${deg.mode})`,
      condition_category: 'unusable_image',
      in_catalog: false,
      license: 'CC-BY-4.0',
      difficulty: 'hard',
      expected_quality: deg.mode,
      expected_diagnostic_status: 'unusable_image',
      relative_path: `data/benchmark_images/degraded/${deg.mode}_${String(i).padStart(2, '0')}.jpg`,
      notes: deg.note + '. System must flag imageQuality assessable=false and request retake.'
    });
  }
}

for (const entry of manifest) {
  entry.fixture_status = 'target_specification_only';
  entry.file_present_on_disk = false;
}

const outputPath = path.resolve('data/evaluation_manifest.json');
fs.writeFileSync(outputPath, JSON.stringify({
  version: '1.1.0',
  benchmark_name: 'PDDS-AP-400-Foliar-Diagnostic-Integrity-Benchmark-Specification',
  benchmark_status: 'specification_only',
  verified_sample_count: 0,
  placeholder_fixture_count: manifest.length,
  accuracy_measured_on_disk: false,
  accuracy_claim: 'unmeasured (offline specification fixtures)',
  generated_at: new Date().toISOString(),
  total_samples: manifest.length,
  category_distribution: {
    in_catalog_diseases: 200,
    healthy_crops: 50,
    abiotic_and_nutritional: 50,
    unsupported_crops_and_diseases: 50,
    non_plant_and_degraded: 50,
  },
  samples: manifest,
}, null, 2), 'utf-8');

console.log(`Successfully generated evaluation manifest specification with ${manifest.length} benchmark items at ${outputPath}`);
