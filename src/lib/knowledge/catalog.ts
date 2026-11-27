/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 3: Agricultural Knowledge Base Catalog
 * Sources: ANGRAU (Vyavasaya Panchangam), ICAR institutes, CIBRC (Govt of India).
 */

import type { AgriculturalKnowledgeCatalog } from './types';

export const AGRICULTURAL_KNOWLEDGE_CATALOG: AgriculturalKnowledgeCatalog = {
  version: '1.0.0',
  lastReviewedDate: '2026-10-12',
  authorityStandards: [
    'Acharya N.G. Ranga Agricultural University (ANGRAU) — Vyavasaya Panchangam',
    'ICAR Crop Protection & Integrated Pest Management (IPM) Packages',
    'Central Insecticides Board & Registration Committee (CIBRC) Approved Crop Label Guidelines',
  ],
  crops: {
    'crop-rice': {
      id: 'crop-rice',
      name_en: 'Paddy / Rice',
      scientificName: 'Oryza sativa L.',
      category: 'Cereal / Staple',
      apMajorDistricts: ['East Godavari', 'West Godavari', 'Krishna', 'Guntur', 'Nellore'],
      growingSeasons: ['Kharif (Sarva)', 'Rabi (Dalva)'],
      commonDiseaseIds: [
        'disease-rice-blast',
        'disease-rice-blb',
        'disease-rice-sheathblight',
        'disease-rice-brownspot',
        'disease-rice-stemborer',
        'disease-rice-gallmidge',
        'disease-rice-zincdeficiency',
        'disease-rice-bph',
        'disease-rice-leaffolder',
        'disease-rice-falsesmut',
      ],
    },
    'crop-chilli': {
      id: 'crop-chilli',
      name_en: 'Chilli',
      scientificName: 'Capsicum annuum L.',
      category: 'Commercial / Spice',
      apMajorDistricts: ['Guntur', 'Prakasam', 'Kurnool', 'Palnadu'],
      growingSeasons: ['Kharif', 'Late Kharif'],
      commonDiseaseIds: ['disease-chilli-leaf-curl', 'disease-chilli-thrips', 'disease-chilli-anthracnose', 'disease-chilli-powderymildew'],
    },
    'crop-cotton': {
      id: 'crop-cotton',
      name_en: 'Cotton',
      scientificName: 'Gossypium hirsutum L.',
      category: 'Commercial / Fibre',
      apMajorDistricts: ['Kurnool', 'Anantapur', 'Guntur', 'YSR Kadapa'],
      growingSeasons: ['Kharif'],
      commonDiseaseIds: ['disease-cotton-bollworm', 'disease-cotton-whitefly', 'disease-cotton-jassids', 'disease-cotton-bacterialblight'],
    },
    'crop-groundnut': {
      id: 'crop-groundnut',
      name_en: 'Groundnut',
      scientificName: 'Arachis hypogaea L.',
      category: 'Oilseed / Legume',
      apMajorDistricts: ['Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Chittoor'],
      growingSeasons: ['Kharif (Rainfed)', 'Rabi (Irrigated)'],
      commonDiseaseIds: [
        'disease-groundnut-tikka',
        'disease-groundnut-rust',
        'disease-groundnut-collarrot',
        'disease-groundnut-budnecrosis',
      ],
    },
    'crop-maize': {
      id: 'crop-maize',
      name_en: 'Maize',
      scientificName: 'Zea mays L.',
      category: 'Cereal / Feed',
      apMajorDistricts: ['Guntur', 'West Godavari', 'Prakasam'],
      growingSeasons: ['Kharif', 'Rabi'],
      commonDiseaseIds: [
        'disease-maize-armyworm',
        'disease-maize-turcicumblight',
        'disease-maize-stemborer',
        'disease-maize-blsb',
      ],
    },
    'crop-sugarcane': {
      id: 'crop-sugarcane',
      name_en: 'Sugarcane',
      scientificName: 'Saccharum officinarum L.',
      category: 'Commercial / Sugar',
      apMajorDistricts: ['Visakhapatnam', 'Anakapalli', 'East Godavari'],
      growingSeasons: ['Annual (Eksali / Adsali)'],
      commonDiseaseIds: ['disease-sugarcane-redrot'],
    },
    'crop-tomato': {
      id: 'crop-tomato',
      name_en: 'Tomato',
      scientificName: 'Solanum lycopersicum L.',
      category: 'Vegetable / Solanaceous',
      apMajorDistricts: ['Chittoor', 'Annamayya', 'Kurnool'],
      growingSeasons: ['Kharif', 'Rabi', 'Summer'],
      commonDiseaseIds: ['disease-tomato-earlyblight'],
    },
    'crop-mango': {
      id: 'crop-mango',
      name_en: 'Mango',
      scientificName: 'Mangifera indica L.',
      category: 'Perennial Fruit Orchard',
      apMajorDistricts: ['Krishna', 'Chittoor', 'Vizianagaram'],
      growingSeasons: ['Flowering: Dec-Feb, Harvest: Apr-Jun'],
      commonDiseaseIds: ['disease-mango-anthracnose'],
    },
    'crop-banana': {
      id: 'crop-banana',
      name_en: 'Banana',
      scientificName: 'Musa acuminata Colla',
      category: 'Horticultural Fruit',
      apMajorDistricts: ['YSR Kadapa', 'East Godavari', 'West Godavari'],
      growingSeasons: ['Year-round (Tissue culture)'],
      commonDiseaseIds: ['disease-banana-panamawilt'],
    },
    'crop-turmeric': {
      id: 'crop-turmeric',
      name_en: 'Turmeric',
      scientificName: 'Curcuma longa L.',
      category: 'Spice / Rhizome',
      apMajorDistricts: ['Guntur', 'Prakasam', 'YSR Kadapa'],
      growingSeasons: ['Kharif (June-July to Feb)'],
      commonDiseaseIds: ['disease-turmeric-rhizomerot', 'disease-turmeric-leafspot'],
    },
    'crop-brinjal': {
      id: 'crop-brinjal',
      name_en: 'Brinjal / Eggplant',
      scientificName: 'Solanum melongena L.',
      category: 'Vegetable / Solanaceous',
      apMajorDistricts: ['Guntur', 'East Godavari', 'West Godavari', 'Kurnool', 'Chittoor'],
      growingSeasons: ['Kharif', 'Rabi', 'Summer (irrigated)'],
      commonDiseaseIds: [
        'disease-brinjal-shootfruitborer',
        'disease-brinjal-phomopsisblight',
        'disease-brinjal-wetrot',
        'disease-brinjal-fruitcracking',
      ],
    },
    'crop-okra': {
      id: 'crop-okra',
      name_en: "Okra / Lady's Finger",
      scientificName: 'Abelmoschus esculentus (L.) Moench',
      category: 'Vegetable / Malvaceous',
      apMajorDistricts: ['Krishna', 'Guntur', 'West Godavari', 'Kurnool'],
      growingSeasons: ['Kharif', 'Rabi', 'Summer (irrigated)'],
      commonDiseaseIds: [
        'disease-okra-leafcurlvirus',
        'disease-okra-downymildew',
        'disease-okra-alternarialeafspot',
        'disease-okra-cercosporaleafspot',
        'disease-okra-phyllostictaleafspot',
      ],
    },
    'crop-citrus': {
      id: 'crop-citrus',
      name_en: 'Citrus (Sweet Orange / Lime)',
      scientificName: 'Citrus spp. (e.g. Citrus sinensis — sweet orange, Citrus aurantiifolia — acid lime)',
      category: 'Fruit',
      apMajorDistricts: ['Anantapur', 'Kadapa', 'Nellore', 'Chittoor'],
      growingSeasons: ['Year-round (2-3 flowering flushes per year)'],
      commonDiseaseIds: [
        'disease-citrus-greening',
        'disease-citrus-canker',
        'disease-citrus-blackspot',
        'disease-citrus-melanose',
        'disease-citrus-scab',
      ],
    },
  },
  diseases: {
    'disease-rice-blast': {
      id: 'disease-rice-blast',
      cropId: 'crop-rice',
      name_en: 'Rice Blast',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Magnaporthe oryzae (Pyricularia oryzae)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Spindle-shaped (eye-shaped) lesions on leaf blades with pointed ends.',
        'Lesion center turns ash-gray or whitish; margins turn dark brown or reddish-brown.',
        'Neck rot causes blackening of panicle base, leading to empty or partially filled chaffy grains.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Panicle Neck', 'Nodes'],
      similarConditions: [
        {
          id: 'rice-brown-spot',
          name_en: 'Brown Spot (Bipolaris oryzae)',
          isPathological: true,
          differentiatingFactors_en:
            'Brown spot lesions are circular or oval with yellow halos; blast lesions are distinctly spindle-shaped with tapering pointed ends.',
        },
        {
          id: 'rice-zinc-deficiency',
          name_en: 'Zinc Deficiency (Khaira disease / Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Zinc deficiency causes generalized rusty brown discoloration on third/fourth leaves without defined spindle margins or gray centers.',
        },
      ],
      environmentalRiskFactors_en: [
        'High relative humidity (>90%) with cloudy weather and prolonged leaf wetness (>10 hours).',
        'Night temperatures between 19°C and 23°C.',
        'Excessive and un-split nitrogenous (urea) fertilizer applications.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Treat seed with biological agent Trichoderma asperellum @ 10g/kg seed prior to nursery sowing. Carbendazim 50% WP is sometimes used as a chemical seed-treatment alternative, but the specific dose previously listed here is suppressed (Phase 5.5A): it has not been verified against a current, authoritative Indian pesticide registration/label source. Do not use any chemical seed-treatment dose as an instruction from PDDS — confirm the currently approved product and dose with your local agriculture extension office before treating seed with any chemical.',
          targetTiming: 'Pre-sowing',
        },
        {
          stepNumber: 2,
          practice_en:
            'Apply nitrogen in 3 split doses (basal, tillering, panicle initiation). Avoid urea top-dressing during active blast flare-ups.',
          targetTiming: 'Vegetative growth',
        },
        {
          stepNumber: 3,
          practice_en:
            'Maintain clean irrigation channels and eliminate weed hosts along paddy bunds (e.g. Echinochloa colona).',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-rice-blast-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bio-fungicide Pseudomonas fluorescens and Neem Seed Kernel Extract (NSKE) sprays during early morning or late afternoon hours are commonly used organic practices against rice blast, but a specific dose is suppressed — evidence verification could not confirm an exact figure for either against a primary reference accessible from this tool.',
          activeIngredient_en: 'Pseudomonas fluorescens / Azadirachtin (organic, dose suppressed)',
          safetyCaution_en:
            'Eco-friendly biocontrol; avoid mixing with synthetic chemical bactericides, which can kill the biological agent.',
          regulatoryNotice_en:
            'Biopesticides are regulated under the Insecticides Act, 1968 and require proper dosing. Confirm the rate with your local agriculture extension office.',
        },
        {
          id: 't-rice-blast-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Tricyclazole 75% WP is registered for rice blast at 300-400 g of formulation per hectare in 500 litres of water, with a 30-day waiting period before harvest. It is typically used once leaf lesions exceed 2-5% of canopy area.',
          activeIngredient_en: 'Tricyclazole 75% WP (225-300 g a.i./ha)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Observe the full 30-day pre-harvest interval.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / blast entry. This figure replaces an earlier suppressed range: secondary sources had given conflicting figures of roughly 120-450 g per acre or hectare, and the primary registry resolves it at 300-400 g formulation per hectare. Verify against your own container label before mixing.',
        },
        {
          id: 't-rice-blast-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Isoprothiolane 40% EC is registered for rice blast at 750 ml of formulation per hectare in 500-1000 litres of water, and is commonly used as a rotational option for neck blast at the boot leaf stage. Its waiting period is 60 days.',
          activeIngredient_en: 'Isoprothiolane 40% EC (300 g a.i./ha)',
          safetyCaution_en:
            'The 60-day waiting period is long — this product is unsuitable if harvest is less than two months away. Choose Tricyclazole or consult your local agriculture extension office in that case.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / blast entry. Rotate chemical classes between sprays to prevent fungal resistance developing.',
        },
        {
          id: 't-rice-blast-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'Maintain shallow water level (2-3 cm) in fields during infection risk periods. Avoid allowing soil to dry out into deep cracks.',
          activeIngredient_en: 'Water management practice',
        },
      ],
      escalationThreshold_en:
        'If leaf blast expands rapidly to more than 10% of field hills, or if lesions appear at the panicle neck junction (neck blast) at boot leaf stage, immediately alert the local agriculture extension office.',
      captureGuidance: {
        instruction_en:
          'Photograph an affected leaf held flat against a plain background, close enough that the pointed ends and the pale centre of individual lesions are sharp. If panicles have emerged, also photograph the neck where each panicle joins the stem.',
        rationale_en:
          'Lesion shape is what separates Blast from Brown Spot, and neck blast is far more damaging than leaf blast — but the neck is not visible in a photograph of the canopy.',
      },
      fieldFollowUps: [
        {
          id: 'rice-blast-q-shape',
          question_en:
            'Are the lesions spindle or diamond shaped with pointed ends and a pale ash-grey centre, rather than round with a uniform brown colour?',
          ifYes_en: 'Pointed lesions with grey centres are characteristic of Blast.',
          ifNo_en: 'Round, evenly brown spots point to Brown Spot, which signals a soil fertility problem instead.',
          pointsTowardIds: ['disease-rice-blast'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-blast-q-neck',
          question_en:
            'If panicles have emerged and some are white and empty: is there a blackened, shrivelled band at the neck of the panicle?',
          ifYes_en: 'A blackened neck is neck blast — the most damaging form, and it needs urgent attention.',
          ifNo_en:
            'A clean neck with a bore hole in the stem means stem borer instead, which needs an insecticide, not a fungicide.',
          pointsTowardIds: ['disease-rice-blast'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Lesions on under 2% of canopy area, confined to leaves, with no neck involvement.',
          action_en:
            'Below the usual spray threshold. Stop further nitrogen, keep a shallow water level, and re-inspect in three to four days.',
        },
        {
          level: 'moderate',
          threshold_en: 'Lesions on 2-10% of canopy area and increasing day on day.',
          action_en:
            'This is the usual threshold at which a registered fungicide spray is justified. Choose the product by how near harvest is, since the two options differ by 30 days of waiting period.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% of hills affected, or any blackening at the panicle neck.',
          action_en:
            'Alert your local agriculture extension office the same day. Neck blast directly destroys grain filling and the window for useful action is short.',
        },
      ],
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Pathology & Integrated Disease Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'IPM Package for Rice — Major Diseases & Management',
          organization: 'ICAR - National Rice Research Institute (NRRI), Cuttack',
          reviewDate: '2024-11-15',
          url: 'https://icar-nrri.gov.in',
        },
        {
          title: 'Major Uses of Pesticides (Fungicides) — Registered under the Insecticides Act, 1968, as on 31.03.2024',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://ppqs.gov.in/sites/default/files/fungicides_31.03.2024.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries, target "Blast" — Tricyclazole 75% WP (225-300 g a.i./ha, 300-400 g formulation/ha, 500 L dilution, 30-day waiting period) and Isoprothiolane 40% EC (300 g a.i./ha, 750 ml formulation/ha, 500-1000 L dilution, 60-day waiting period).',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-blb': {
      id: 'disease-rice-blb',
      cropId: 'crop-rice',
      name_en: 'Bacterial Leaf Blight',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas oryzae pv. oryzae',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Water-soaked pale stripes begin at the leaf tip or along one margin and extend downwards.',
        'Stripes turn straw-yellow then greyish-white, with a wavy or rippled edge rather than a sharp border.',
        'Leaves dry from the margin inwards and roll up; whole leaves may die back.',
        'In severe early infection (kresek), young transplanted seedlings wilt and die outright.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Whole Seedling'],
      similarConditions: [
        {
          id: 'rice-blb-vs-brownspot',
          name_en: 'Brown Spot (Bipolaris oryzae / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Brown Spot produces separate oval brown spots scattered across the leaf blade. Bacterial Leaf Blight produces continuous stripes running down from the tip or margin, never isolated round spots.',
        },
        {
          id: 'rice-blb-vs-tipburn',
          name_en: 'Salinity or Fertiliser Tip Burn (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Abiotic tip burn affects nearly every leaf in a patch uniformly and has a straight, sharply defined edge. Bacterial blight spreads leaf by leaf with an irregular wavy margin, and a cut lesion releases bacterial ooze.',
        },
        {
          id: 'rice-blb-vs-sheathblight',
          name_en: 'Sheath Blight (Rhizoctonia solani / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Blight starts on the leaf sheath near the water line as oval greenish-grey blotches with a brown border, then climbs. Bacterial blight starts on the leaf blade at the tip or margin and moves down.',
        },
      ],
      environmentalRiskFactors_en: [
        'Heavy rain, strong wind and storms that wound leaves and splash bacteria between plants.',
        'Continuously flooded fields with standing water above 5 cm, and flood water moving between plots.',
        'Excessive nitrogen top-dressing, which produces soft, dense, highly susceptible foliage.',
        'Clipping of seedling leaf tips at transplanting, which creates direct entry wounds.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Sow tolerant varieties where bacterial blight is a recurring problem in your village, and use certified disease-free seed rather than saved grain from an affected field.',
          targetTiming: 'Before sowing / nursery stage',
        },
        {
          stepNumber: 2,
          practice_en:
            'Do not clip seedling leaf tips while transplanting. Every cut is an open door for the bacterium.',
          targetTiming: 'At transplanting',
        },
        {
          stepNumber: 3,
          practice_en:
            'Drain the field and keep it at shallow moisture for a few days once symptoms appear, instead of holding deep standing water that carries bacteria across the plot.',
          targetTiming: 'At first appearance of stripes',
        },
        {
          stepNumber: 4,
          practice_en:
            'Stop or delay further nitrogen top-dressing while the disease is active, and split the remaining nitrogen into smaller later doses.',
          targetTiming: 'During active infection',
        },
        {
          stepNumber: 5,
          practice_en:
            'Plough in or remove infected stubble and bunds weeds after harvest, as the bacterium survives on crop residue and grassy weed hosts between seasons.',
          targetTiming: 'Post-harvest',
        },
      ],
      treatments: [
        {
          id: 'rice-blb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Drain standing water and withhold further nitrogen as the first response. For bacterial blight these two cultural steps act faster than any spray, because the bacterium spreads through water movement and thrives on soft nitrogen-rich foliage.',
          safetyCaution_en:
            'Do not let drained water run directly into a neighbouring healthy paddy plot — it carries the bacterium.',
        },
        {
          id: 'rice-blb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper Sulphate Pentahydrate 6% SC is registered for bacterial leaf blight in rice at 1000 ml of formulation per hectare in 500 litres of water. The registered waiting period before harvest is 21 days.',
          activeIngredient_en: 'Copper Sulphate Pentahydrate 6% SC (60 g a.i./ha)',
          safetyCaution_en:
            'Wear gloves and a mask while mixing. Observe the full 21-day pre-harvest interval. Copper can scorch foliage if sprayed in peak afternoon heat — spray in the early morning or late afternoon.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / bacterial leaf blight entry. Verify the figure on your own product container label before mixing, and confirm with your local agriculture extension office.',
        },
        {
          id: 'rice-blb-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP (commonly called streptocycline) is registered for rice bacterial leaf blight as a 100-150 ppm spray at the early root stage, with a second spray before grain set if the disease continues. It is also registered as a 40 ppm seed soak for 12 hours and a 40-100 ppm seedling dip.',
          activeIngredient_en: 'Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP',
          safetyCaution_en:
            'The registry gives this product in ppm concentration, not as a per-hectare quantity, so the amount you need depends on your spray volume — ask your local agriculture extension office to work out the quantity for your tank rather than guessing. No pre-harvest waiting period is stated in the registry entry, so follow the waiting period printed on your product label.',
          regulatoryNotice_en:
            'Concentrations confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / bacterial leaf blight entry. Antibiotic sprays should be used sparingly and never as a routine calendar spray, to limit resistance development.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph a leaf showing the full stripe from the tip downwards, holding it flat against a plain background. Then cut one fresh lesion across with a clean blade, hold the cut end in a little clear water for a minute, and photograph any milky thread seeping out.',
        rationale_en:
          'The milky bacterial ooze from a cut lesion is the one field sign that separates bacterial blight from every fungal leaf disease. A photograph of the stripe alone cannot settle it.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-blb-q-ooze',
          question_en:
            'Cut a fresh lesion and dip the cut end in clear water. Does a milky or cloudy thread seep out within a minute?',
          ifYes_en: 'Bacterial ooze confirms a bacterial disease — Bacterial Leaf Blight is very likely.',
          ifNo_en: 'No ooze points away from bacterial blight and towards a fungal leaf disease such as Brown Spot.',
          pointsTowardIds: ['disease-rice-blb'],
          pointsAwayIds: ['disease-rice-brownspot', 'disease-rice-blast'],
        },
        {
          id: 'rice-blb-q-margin',
          question_en: 'Do the dried areas begin at the leaf tip or along the margin, rather than as separate spots in the middle of the leaf?',
          ifYes_en: 'Tip and margin spread is the typical bacterial blight pattern.',
          ifNo_en: 'Scattered separate spots suggest Brown Spot or Blast instead.',
          pointsTowardIds: ['disease-rice-blb'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Stripes on under 5% of leaf area, confined to a few plants at the field edge.',
          action_en:
            'Drain the water and stop nitrogen. Do not spray yet — mark the patch and re-inspect in three days.',
        },
        {
          level: 'moderate',
          threshold_en: 'Stripes on 5-25% of leaf area and spreading to new plants across several days.',
          action_en:
            'Cultural steps plus a registered copper spray is justified at this level. Confirm the product and dose with your local agriculture extension office first.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 25% of leaf area affected, or seedlings wilting and dying (kresek) soon after transplanting.',
          action_en:
            'Report to your local agriculture extension office the same day. At this stage yield loss is already occurring and the field needs direct inspection, not only a spray decision.',
        },
      ],
      escalationThreshold_en:
        'Contact your local agriculture extension office immediately if seedlings are wilting within two weeks of transplanting (kresek), if more than a quarter of the leaf area is affected, or if stripes keep spreading after draining the field and stopping nitrogen. Bacterial blight has no curative chemical — once it is widespread, management decisions need a physical field inspection.',
      claimEvidence: [
        {
          claimId: 'rice-blb-copper-dose',
          fieldRef: "treatments['rice-blb-chem-1'].instruction_en — 1000 ml/ha in 500 L water, 21-day PHI",
          verificationStatus: 'verified',
          sourceIndexes: [1],
          locator:
            'CIBRC Major Uses of Pesticides (Fungicides), rice crop section — Copper Sulphate Pentahydrate 6% SC row, target "Bacterial leaf blight": 60 g a.i./ha, 1000 ml formulation/ha, 500 L dilution, waiting period 21 days.',
          limitation_en:
            'The dose is confirmed against the CIBRC registry, which the registry itself states is compiled for guidance and not for legal purposes. Your specific product container label remains the binding instruction.',
        },
        {
          claimId: 'rice-blb-streptocycline-ppm',
          fieldRef: "treatments['rice-blb-chem-2'].instruction_en — 40 ppm soak, 40-100 ppm dip, 100-150 ppm spray",
          verificationStatus: 'verified',
          sourceIndexes: [1],
          locator:
            'CIBRC Major Uses of Pesticides (Fungicides), rice crop section — Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP row, target "Bacterial leaf blight": seed soak 40 ppm for 12 hours, seedling dip 40-100 ppm, spray 100-150 ppm at early root stage with a second spray before grain set.',
          limitation_en:
            'The registry gives no per-hectare quantity and no waiting period for this product, so the amount for your tank and the interval before harvest cannot be derived from it. Both must come from your product label and local extension advice.',
        },
      ],
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Pathology & Integrated Disease Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'Major Uses of Pesticides (Fungicides) — Registered under the Insecticides Act, 1968, as on 31.03.2024',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://ppqs.gov.in/sites/default/files/fungicides_31.03.2024.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries — Copper Sulphate Pentahydrate 6% SC and Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP rows, target "Bacterial leaf blight".',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-brownspot': {
      id: 'disease-rice-brownspot',
      cropId: 'crop-rice',
      name_en: 'Brown Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Bipolaris oryzae (syn. Helminthosporium oryzae)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Many small, separate, circular to oval brown spots scattered evenly over the leaf blade.',
        'Mature spots have a dark brown margin and a grey or pale tan centre, roughly the size and shape of a sesame seed.',
        'Spots appear first and most heavily on the older, lower leaves.',
        'On the grain, dark brown or black blotches on the husk cause discoloured, poorly filled rice.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Grain / Husk', 'Seedlings'],
      similarConditions: [
        {
          id: 'rice-brownspot-vs-blast',
          name_en: 'Rice Blast (Magnaporthe oryzae / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Blast lesions are spindle or diamond shaped with pointed ends and an ash-grey centre. Brown Spot lesions stay round or oval with blunt edges and a uniform brown colour. Blast concentrates on young upper leaves; Brown Spot on older lower leaves.',
        },
        {
          id: 'rice-brownspot-vs-nutrient',
          name_en: 'Potassium or Nitrogen Deficiency (Nutrient)',
          isPathological: false,
          differentiatingFactors_en:
            'A pure nutrient deficiency yellows or browns the leaf evenly from the tip and margins without discrete spots. Brown Spot makes defined individual spots — but the two very often occur together, because poor soil fertility is what makes the crop susceptible in the first place.',
        },
      ],
      environmentalRiskFactors_en: [
        'Poor or unamended soil fertility — especially low nitrogen, potassium and silicon. This is the single strongest predisposing factor.',
        'Unirrigated or drought-stressed rainfed fields where the crop suffers moisture stress.',
        'Sandy, saline or degraded soils with low water-holding capacity.',
        'Prolonged leaf wetness of eight hours or more with warm temperatures.',
        'Seed carried over from an affected crop, since the fungus survives on and in the seed.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Treat Brown Spot primarily as a soil fertility signal. Get a soil test and correct the nitrogen and potassium shortfall — a fungicide alone will suppress the spots but the crop will stay weak and the problem will return.',
          targetTiming: 'Before sowing, and at top-dressing',
        },
        {
          stepNumber: 2,
          practice_en:
            'Use healthy certified seed instead of grain saved from a spotted crop, since the fungus is carried on and inside the seed.',
          targetTiming: 'Before sowing',
        },
        {
          stepNumber: 3,
          practice_en:
            'Maintain steady soil moisture and avoid letting a rainfed field swing between waterlogging and drought stress.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 4,
          practice_en:
            'Where soil tests show silicon deficiency, incorporating rice straw or husk ash strengthens leaf tissue and measurably reduces Brown Spot pressure.',
          targetTiming: 'Land preparation',
        },
      ],
      treatments: [
        {
          id: 'rice-brownspot-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Correct the underlying nutrition first. Apply the nitrogen and potassium shortfall indicated by your soil test, and use well-decomposed farmyard manure or compost to rebuild soil health in degraded or sandy fields.',
          safetyCaution_en:
            'Have the quantity worked out from an actual soil test result by your local agriculture extension office — over-applying nitrogen invites Blast and Bacterial Leaf Blight instead.',
        },
        {
          id: 'rice-brownspot-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Carbendazim 25% + Mancozeb 50% WS is registered for brown spot in rice as a seed treatment: 30-35 g of formulation, applied as a slurry at roughly 0.1 litre of water per kilogram of seed.',
          activeIngredient_en: 'Carbendazim 25% + Mancozeb 50% WS (seed treatment)',
          safetyCaution_en:
            'Treated seed is poisonous and must never be eaten or fed to animals. Mix in the open wearing gloves and a mask, and keep treated seed in clearly marked bags away from food grain. The registry states no waiting period for this seed-treatment entry.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice entry listing brown spot, blast and sheath blight. Verify against your product container label and confirm with your local agriculture extension office.',
        },
        {
          id: 'rice-brownspot-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'For a standing crop with spreading spots, Hexaconazole 4% + Zineb 68% WP is registered covering brown spot, sheath blight, blast and grain discolouration at 1000-1250 g of formulation per hectare in 500 litres of water, with a 34-day waiting period before harvest.',
          activeIngredient_en: 'Hexaconazole 4% + Zineb 68% WP (720-900 g a.i./ha)',
          safetyCaution_en:
            'Wear gloves and a mask while mixing and spraying, and do not spray against the wind. Observe the full 34-day pre-harvest interval. Spraying without also correcting soil fertility will not stop the problem returning.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice crop section. Verify against your own product container label before mixing and confirm with your local agriculture extension office. Rotate fungicide classes across sprays to limit resistance.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph an older lower leaf held flat, close enough that the shape of individual spots is clear. If you can, photograph the whole plant too, and note whether the field is rainfed or has had little fertiliser.',
        rationale_en:
          'Spot shape is what separates Brown Spot from Blast, and it is only visible in a close, sharp photograph of an older leaf.',
      },
      fieldFollowUps: [
        {
          id: 'rice-brownspot-q-shape',
          question_en: 'Are the spots round or oval with blunt edges, rather than pointed at both ends like a grain of rice?',
          ifYes_en: 'Round blunt spots point to Brown Spot.',
          ifNo_en: 'Pointed spindle-shaped lesions with grey centres point to Blast instead.',
          pointsTowardIds: ['disease-rice-brownspot'],
          pointsAwayIds: ['disease-rice-blast'],
        },
        {
          id: 'rice-brownspot-q-fertility',
          question_en: 'Is this field rainfed, sandy, saline, or one where little fertiliser has been applied this season?',
          ifYes_en:
            'Low fertility strongly supports Brown Spot, and tells you the real fix is soil nutrition, not just a spray.',
          ifNo_en: 'A well-fertilised, well-watered field with spots makes Blast or another leaf disease more likely.',
          pointsTowardIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-brownspot-q-position',
          question_en: 'Are the spots worst on the older lower leaves rather than the young upper leaves?',
          ifYes_en: 'Lower-leaf concentration fits Brown Spot and nutrient stress.',
          ifNo_en: 'Damage concentrated on young upper leaves fits Blast.',
          pointsTowardIds: ['disease-rice-brownspot'],
          pointsAwayIds: ['disease-rice-blast'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Scattered spots on under 5% of leaf area, mainly on the lowest leaves.',
          action_en:
            'No spray needed. Correct soil nutrition and keep moisture steady — at this level a fungicide is not an economic use of money.',
        },
        {
          level: 'moderate',
          threshold_en: 'Spots on 5-20% of leaf area, now also on middle leaves.',
          action_en:
            'Correct nutrition and consider one registered fungicide spray, particularly if the crop is near flowering when grain discolouration risk rises.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 20% of leaf area affected, or dark blotches already appearing on the grain husk.',
          action_en:
            'Consult your local agriculture extension office. Grain discolouration directly reduces the price you get, and the field likely has a fertility problem that needs a soil test, not just another spray.',
        },
      ],
      escalationThreshold_en:
        'Consult your local agriculture extension office if spots cover more than a fifth of the leaf area, if dark blotches appear on the grain husk, or if the problem recurs season after season in the same field. Recurring Brown Spot is a soil fertility problem that a soil test should settle, and historically severe outbreaks of this disease have followed widespread soil nutrient exhaustion rather than any failure of spraying.',
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Pathology & Integrated Disease Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'Major Uses of Pesticides (Fungicides) — Registered under the Insecticides Act, 1968, as on 31.03.2024',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://ppqs.gov.in/sites/default/files/fungicides_31.03.2024.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries — Carbendazim 25% + Mancozeb 50% WS row (target "Brown spot, blast, sheath blight", 30-35 g formulation, 0.1 L slurry) and Hexaconazole 4% + Zineb 68% WP row (target "Sheath blight, brown spot, blast, grain discoloration", 1000-1250 g/ha in 500 L, 34-day waiting period).',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-sheathblight': {
      id: 'disease-rice-sheathblight',
      cropId: 'crop-rice',
      name_en: 'Sheath Blight',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Rhizoctonia solani (Thanatephorus cucumeris)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Oval, greenish-grey water-soaked blotches on the leaf sheath, starting near the water line.',
        'Lesions dry to a straw-white centre ringed by an irregular purple-brown border, giving a snakeskin pattern.',
        'Lesions climb upward from sheath to sheath and onto the leaf blades as the crop closes canopy.',
        'White cottony fungal threads and small brown-black seed-like sclerotia on the sheath surface in humid weather.',
        'Badly affected tillers lodge, and panicles fill poorly or not at all.',
      ],
      affectedParts: ['Leaf Sheath', 'Leaves', 'Tillers', 'Panicle'],
      similarConditions: [
        {
          id: 'rice-sheathblight-vs-sheathrot',
          name_en: 'Sheath Rot (Sarocladium oryzae / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Rot attacks the uppermost flag leaf sheath at booting and traps the panicle inside, often with a powdery white growth. Sheath Blight starts low near the water line and climbs upward, with snakeskin-patterned lesions.',
        },
        {
          id: 'rice-sheathblight-vs-stemborer',
          name_en: 'Stem Borer Damage (Scirpophaga incertulas / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer kills the central shoot cleanly and leaves a bore hole with frass; the dead heart pulls out easily. Sheath Blight leaves surface lesions on the sheath with no bore hole, and the tiller stays attached.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense planting and a closed canopy that traps humidity around the base of the crop.',
        'High nitrogen fertilisation producing heavy, lush tillering.',
        'Continuous standing water with relative humidity above 90% and warm temperatures of 28-32°C.',
        'Sclerotia surviving in soil and floating on irrigation water from a previously infected field.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Avoid over-dense planting. Keep the recommended spacing and leave periodic alleys so air can move through the canopy and dry the base of the crop.',
          targetTiming: 'At transplanting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Split nitrogen into several smaller doses rather than one heavy application, and do not exceed the recommended total.',
          targetTiming: 'Top-dressing stages',
        },
        {
          stepNumber: 3,
          practice_en:
            'Skim off and destroy the floating sclerotia and crop debris during land preparation, since they are the main carry-over source between seasons.',
          targetTiming: 'Land preparation',
        },
        {
          stepNumber: 4,
          practice_en:
            'Alternate wetting and drying instead of permanent deep flooding lowers humidity at the plant base and slows the fungus climbing.',
          targetTiming: 'Tillering to booting',
        },
      ],
      treatments: [
        {
          id: 'rice-sheathblight-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Open the canopy by draining the field for a few days and, where practical, removing a row to create an alley. Reducing humidity at the base of the crop slows the fungus climbing from sheath to sheath, which is how this disease causes damage.',
          safetyCaution_en:
            'Do not drain so hard that the crop suffers moisture stress at flowering — alternate wetting and drying, not complete drying out.',
        },
        {
          id: 'rice-sheathblight-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Validamycin 3% L is registered for rice sheath blight at 2000 g of formulation per hectare in 750 litres of water. Its waiting period is 14 days, the shortest among the registered options, which matters if the crop is close to harvest.',
          activeIngredient_en: 'Validamycin 3% L (60 g a.i./ha)',
          safetyCaution_en:
            'Direct the spray at the lower sheath region where the lesions actually are, not just over the top of the canopy. Wear gloves and a mask. Observe the 14-day pre-harvest interval.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / sheath blight entry. The registry notes no residues on grain or straw when applied 14 days before harvest. Verify against your own product container label before mixing and confirm with your local agriculture extension office.',
        },
        {
          id: 'rice-sheathblight-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Alternative registered options for rotation are Hexaconazole 5% EC at 1000 ml per hectare in 500 litres of water (40-day waiting period), and Propiconazole 25% EC at 500 g per hectare in 750 litres (30-day waiting period).',
          activeIngredient_en: 'Hexaconazole 5% EC (50 g a.i./ha) or Propiconazole 25% EC (125 g a.i./ha)',
          safetyCaution_en:
            'Both have much longer waiting periods than Validamycin — 40 and 30 days. Do not choose either if harvest is closer than that. Rotate between chemical classes rather than repeating the same one.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / sheath blight entries. Verify against your own container label before mixing.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Part the tillers and photograph the leaf sheath at and just above the water line, not the top of the plant. Pull back one outer sheath so the lesion and its border are clearly visible, and look for small brown seed-like bodies on the surface.',
        rationale_en:
          'Sheath Blight lives at the base of the crop. A photograph of the canopy from above will miss it entirely and may instead look like a nutrient problem.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-sheathblight-q-waterline',
          question_en: 'Did the damage begin on the sheath near the water line and move upward, rather than starting on the leaves?',
          ifYes_en: 'Upward spread from the water line is the defining Sheath Blight pattern.',
          ifNo_en: 'Damage beginning on the leaf blade points to Blast, Brown Spot or Bacterial Leaf Blight.',
          pointsTowardIds: ['disease-rice-sheathblight'],
          pointsAwayIds: ['disease-rice-blast', 'disease-rice-blb'],
        },
        {
          id: 'rice-sheathblight-q-sclerotia',
          question_en: 'Can you see small brown or black seed-like bodies, about the size of a mustard grain, loose on the sheath surface?',
          ifYes_en: 'Those are sclerotia and they effectively confirm Sheath Blight.',
          ifNo_en:
            'Their absence does not rule it out — sclerotia form mainly in humid weather and in later stages.',
          pointsTowardIds: ['disease-rice-sheathblight'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Lesions confined to the lowest sheaths, below about a quarter of the plant height.',
          action_en:
            'Drain and open the canopy. Hold off on spraying and re-inspect in four to five days.',
        },
        {
          level: 'moderate',
          threshold_en: 'Lesions have climbed to between a quarter and half the plant height, or affect more than 10-15% of tillers.',
          action_en:
            'A registered fungicide spray is justified now, directed at the lower sheath. Choose the product by how near harvest is, since waiting periods differ a lot.',
        },
        {
          level: 'severe',
          threshold_en: 'Lesions above half the plant height, reaching the flag leaf, or tillers already lodging.',
          action_en:
            'Contact your local agriculture extension office the same day. Once the fungus reaches the flag leaf, grain filling is directly at risk and spray timing becomes critical.',
        },
      ],
      escalationThreshold_en:
        'Contact your local agriculture extension office if lesions climb past half the plant height, reach the flag leaf, or if tillers begin to lodge. Sheath Blight at the flag leaf stage threatens grain filling directly, and the choice of fungicide then depends on how many days remain to harvest — a decision worth confirming in person.',
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Pathology & Integrated Disease Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'Major Uses of Pesticides (Fungicides) — Registered under the Insecticides Act, 1968, as on 31.03.2024',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://ppqs.gov.in/sites/default/files/fungicides_31.03.2024.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries, target "Sheath blight" — Validamycin 3% L (2000 g/ha, 750 L, 14 days), Hexaconazole 5% EC (1000 ml/ha, 500 L, 40 days), Propiconazole 25% EC (500 g/ha, 750 L, 30 days).',
        },
        {
          title: 'Sheath blight severity survey, Nellore and Chittoor districts, Andhra Pradesh, India, rabi 2020-21 (severity 6.11%-13.44%)',
          organization: 'South Asian Journal of Applied Sciences (sasapjas.org)',
          reviewDate: '2023-09-01',
          url: 'https://sasapjas.org/wp-content/uploads/2023/09/09-Kalavathi.pdf',
          geographicScope: 'ap_specific',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-stemborer': {
      id: 'disease-rice-stemborer',
      cropId: 'crop-rice',
      name_en: 'Yellow Stem Borer',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect pest: Scirpophaga incertulas (larva bores inside the stem)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Dead heart in the vegetative stage: the central shoot dries to straw colour while the surrounding leaves stay green, and it pulls out easily with a gentle tug.',
        'White ear in the reproductive stage: the whole panicle emerges white, erect and empty, with no filled grain.',
        'A small round bore hole near a node, often with powdery frass at the opening.',
        'Creamy-white larvae with a dark head inside a split stem.',
        'Flat, pale egg masses covered with light brown hairs on the upper leaf surface.',
      ],
      affectedParts: ['Stem / Tiller', 'Central Shoot', 'Panicle'],
      similarConditions: [
        {
          id: 'rice-stemborer-vs-gallmidge',
          name_en: 'Rice Gall Midge (Orseolia oryzae / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Gall midge turns the shoot into a hollow silvery tube like an onion leaf, and the plant stays alive and produces more tillers. Stem borer kills the shoot outright, leaving a dry dead heart that pulls out and a bore hole with frass.',
        },
        {
          id: 'rice-stemborer-vs-neckblast',
          name_en: 'Neck Blast (Magnaporthe oryzae / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Both produce white empty panicles. Neck blast leaves a blackened shrivelled lesion at the neck where the panicle bends or breaks, and no bore hole. Stem borer leaves a clean bore hole with frass and no neck lesion — this distinction decides whether you need a fungicide or an insecticide.',
        },
        {
          id: 'rice-stemborer-vs-sheathblight',
          name_en: 'Sheath Blight (Rhizoctonia solani / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Blight shows surface lesions on the sheath with no bore hole and the tiller stays firmly attached. Stem borer damage is internal, with a hole and frass, and the dead shoot lifts out.',
        },
      ],
      environmentalRiskFactors_en: [
        'Staggered or late planting next to already-infested fields, which gives moths a continuous host.',
        'Stubble left standing after harvest, where larvae overwinter and carry into the next crop.',
        'High nitrogen producing soft, lush tillers that larvae penetrate easily.',
        'Continuous rice-after-rice cropping without a break crop or fallow.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Plough in or remove stubble immediately after harvest, as larvae survive inside it and emerge into the next crop.',
          targetTiming: 'Immediately post-harvest',
        },
        {
          stepNumber: 2,
          practice_en:
            'Plant at the same time as neighbouring fields in your area. Synchronised planting denies the moth a continuous succession of young crops to lay eggs in.',
          targetTiming: 'At planting',
        },
        {
          stepNumber: 3,
          practice_en:
            'Walk the field weekly and clip off and destroy the hairy egg masses on the upper leaf surface before they hatch. This is the single cheapest control measure available.',
          targetTiming: 'Weekly from tillering',
        },
        {
          stepNumber: 4,
          practice_en:
            'Install pheromone traps to track moth activity, so that any spray is timed to egg-laying rather than applied on a fixed calendar.',
          targetTiming: 'From active tillering',
        },
      ],
      treatments: [
        {
          id: 'rice-stemborer-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Azadirachtin 0.15% EC (neem seed kernel based) is registered for rice stem borer at 1500-2500 ml of formulation per hectare in 500 litres of water, with a short 5-day waiting period. Azadirachtin 0.03% EC (neem oil based) is registered at 2000 ml per hectare in 1000 litres.',
          activeIngredient_en: 'Azadirachtin 0.15% EC or Azadirachtin 0.03% EC (neem based)',
          safetyCaution_en:
            'Neem works mainly on eggs and very young larvae, so it must be applied at egg-laying — once larvae are inside the stem no spray reaches them. Spray in the evening, as sunlight breaks azadirachtin down quickly.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides & Bio-insecticides) registry, rice / stem borer entries. Biopesticides are regulated under the Insecticides Act and must not be tank-mixed with incompatible chemical fungicides.',
        },
        {
          id: 'rice-stemborer-org-2',
          stepNumber: 2,
          category: 'organic',
          instruction_en:
            'Bacillus thuringiensis var. kurstaki is registered for rice stem borer and leaf folder at 1.50 kg per hectare in 500-750 litres of water.',
          activeIngredient_en: 'Bacillus thuringiensis var. kurstaki (strain Z-52)',
          safetyCaution_en:
            'Like neem, Bt only works on larvae that eat it before boring in, so timing at hatching is everything. The registry states no waiting period for this entry; follow your product label. Do not mix with chemical fungicides, which can kill the bacterium.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Insecticides & Bio-insecticides) registry, rice / stem borer entry.',
        },
        {
          id: 'rice-stemborer-chem-1',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Registered options for rice stem borer include Cartap Hydrochloride 50% SP at 1000 g per hectare in 500-1000 litres of water (21-day waiting period), Chlorantraniliprole 18.5% SC at 150 ml per hectare in 500 litres (47-day waiting period), and Flubendiamide 20% WG at 125 g per hectare in 500 litres (30-day waiting period).',
          activeIngredient_en:
            'Cartap Hydrochloride 50% SP (500 g a.i./ha), Chlorantraniliprole 18.5% SC (30 g a.i./ha), or Flubendiamide 20% WG (25 g a.i./ha)',
          safetyCaution_en:
            'Waiting periods differ sharply — 21, 47 and 30 days. Chlorantraniliprole at 47 days is unsuitable close to harvest. Spray only when the economic threshold is reached, not on a calendar: once larvae are inside the stem, spraying cannot reach them and only kills the natural enemies that would have helped you.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides) registry, rice / stem borer entries. Rotate between chemical groups across sprays, as stem borer develops resistance readily. Verify against your container label and confirm with your local agriculture extension office.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Pull the dried central shoot gently and photograph it next to the plant, showing whether it came away cleanly. Then split one affected tiller lengthwise with a blade and photograph the inside — a larva, a tunnel or powdery frass is the confirming evidence.',
        rationale_en:
          'A dead heart or a white panicle photographed from outside looks identical to neck blast and to gall midge damage. Only the inside of the stem shows which one it is, and that decides whether an insecticide or a fungicide is the right answer.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-stemborer-q-pullout',
          question_en: 'Does the dried central shoot pull out easily with a gentle tug, leaving the outer leaves green?',
          ifYes_en: 'A dead heart that lifts out cleanly is classic stem borer damage.',
          ifNo_en:
            'If it resists, look again at the sheath for lesions — Sheath Blight and other rots keep the tiller firmly attached.',
          pointsTowardIds: ['disease-rice-stemborer'],
          pointsAwayIds: ['disease-rice-sheathblight'],
        },
        {
          id: 'rice-stemborer-q-neck',
          question_en:
            'If panicles are white and empty: is there a blackened shrivelled patch at the neck where the panicle joins the stem?',
          ifYes_en: 'A blackened neck means neck blast, a fungal disease — an insecticide will not help.',
          ifNo_en: 'A clean neck with a bore hole somewhere on the stem points to stem borer.',
          pointsTowardIds: ['disease-rice-stemborer'],
          pointsAwayIds: ['disease-rice-blast'],
        },
        {
          id: 'rice-stemborer-q-threshold',
          question_en:
            'Count roughly 20 hills at random. Are more than one in twenty showing dead hearts, or can you find an egg mass per square metre?',
          ifYes_en: 'You are at or above the usual action threshold — an intervention decision is justified now.',
          ifNo_en:
            'Below threshold, spraying usually costs more than the damage it prevents. Keep scouting weekly and destroy egg masses by hand.',
          pointsTowardIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Under 5% of tillers showing dead hearts, with no egg masses found on a walk through the field.',
          action_en:
            'Do not spray. Clip and destroy any egg masses you find and re-scout in a week — below this level a spray costs more than it saves.',
        },
        {
          level: 'moderate',
          threshold_en: '5-10% of tillers with dead hearts, or about one egg mass per square metre.',
          action_en:
            'This is the usual action threshold. A neem or Bt application timed to egg hatch is the economical first choice; keep a registered insecticide for a rising count.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% dead hearts, or white ears appearing at the panicle stage.',
          action_en:
            'Consult your local agriculture extension office. White ears mean that grain is already lost on those tillers and no spray will recover them — the decision is about protecting the rest of the crop and the next season.',
        },
      ],
      escalationThreshold_en:
        'Contact your local agriculture extension office if dead hearts exceed roughly one tiller in ten, if white ears appear at panicle stage, or if damage continues after a correctly timed spray — continuing damage usually means either resistance or that the spray was applied after larvae were already inside the stem. Confirm whether white panicles are stem borer or neck blast before buying any product, because the two need completely different chemicals.',
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Entomology & Integrated Pest Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title:
            'Major Uses of Pesticides (Insecticides, agricultural use) — Registered under the Insecticides Act, 1968, as on 30.09.2025',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://new.jau.in/storage/document/dynamic_document//residue_insecticide_30092025_20251226_783.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries, target "Stem borer" / "Yellow stem borer" — Cartap Hydrochloride 50% SP (1000 g/ha, 500-1000 L, 21 days), Chlorantraniliprole 18.50% SC (150 ml/ha, 500 L, 47 days), Flubendiamide 20% WG (125 g/ha, 500 L, 30 days). Note: retrieved from a Junagadh Agricultural University mirror of the CIBRC document, as the ppqs.gov.in copy was unreachable; document title, issuing body and "as on" date were confirmed in the retrieved file.',
        },
        {
          title:
            'Major Uses of Pesticides (Insecticides & Bio-insecticides) — Registered under the Insecticides Act, 1968, as on 31.03.2024',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://ppqs.gov.in/sites/default/files/major_uses_of_pesticides_insecticides_bio_insecticides_as_on_31.03.2024.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop bio-insecticide entries, target "Stem borer" — Azadirachtin 0.15% EC (1500-2500 ml/ha, 500 L, 5 days), Azadirachtin 0.03% EC (2000 ml/ha, 1000 L, 5 days), Bacillus thuringiensis var. kurstaki strain Z-52 (1.50 kg/ha, 500-750 L).',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-gallmidge': {
      id: 'disease-rice-gallmidge',
      cropId: 'crop-rice',
      name_en: 'Rice Gall Midge',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect pest: Orseolia oryzae (maggot feeds at the growing point)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'The affected tiller turns into a hollow, silvery-white tube resembling an onion leaf — the characteristic silver shoot or onion shoot.',
        'The tube is pale, elongated, and produces no panicle at all.',
        'The plant stays alive and compensates by producing extra tillers, so the hill looks bushy and crowded.',
        'Affected tillers are shorter than healthy ones, with no bore hole and no frass anywhere on the stem.',
      ],
      affectedParts: ['Tiller', 'Growing Point'],
      similarConditions: [
        {
          id: 'rice-gallmidge-vs-stemborer',
          name_en: 'Yellow Stem Borer (Scirpophaga incertulas / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer kills the shoot, leaving a dry brown dead heart that pulls out, plus a bore hole and frass. Gall midge leaves a living silvery hollow tube with no hole and no frass, and the plant produces more tillers rather than dying back.',
        },
        {
          id: 'rice-gallmidge-vs-whorlmaggot',
          name_en: 'Rice Whorl Maggot (Hydrellia spp. / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Whorl maggot chews the edges of emerging leaves, leaving ragged whitish margins on otherwise normal leaves. Gall midge converts the entire shoot into a tube — the leaf blade is absent, not merely damaged.',
        },
      ],
      environmentalRiskFactors_en: [
        'Continuous cloudy, drizzly weather with high humidity during the tillering stage.',
        'Late planting, and staggered nurseries that keep young tillers available over a long window.',
        'Volunteer rice and grassy weeds such as wild rice on bunds, which host the midge between crops.',
        'High nitrogen encouraging lush, continuous tillering that gives the midge fresh growing points.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Sow early and in step with neighbouring fields. Late and staggered planting is the strongest single risk factor for gall midge.',
          targetTiming: 'At planting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Remove wild rice, volunteer rice and grassy weeds from bunds and channels, since the midge survives on them between crops.',
          targetTiming: 'Before and during the season',
        },
        {
          stepNumber: 3,
          practice_en:
            'Where gall midge recurs every year in your village, choose a resistant variety — resistance is the most reliable and cheapest control for this pest.',
          targetTiming: 'Variety selection, before sowing',
        },
        {
          stepNumber: 4,
          practice_en:
            'Set up light traps to follow adult midge activity, and count silver shoots weekly so that any treatment decision rests on an actual count.',
          targetTiming: 'Tillering stage',
        },
      ],
      treatments: [
        {
          id: 'rice-gallmidge-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Clear grassy weeds and volunteer rice from bunds and channels, and keep the field free of alternate hosts. For gall midge, host removal and resistant varieties do more than any spray, because the maggot sits protected inside the shoot where contact sprays cannot reach it.',
          safetyCaution_en:
            'Silver shoots already formed cannot be cured — those tillers will never produce a panicle. Control effort protects the tillers still forming.',
        },
        {
          id: 'rice-gallmidge-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Registered options covering rice gall midge include Fipronil 5% SC at 1000-1500 ml per hectare in 500 litres of water (32-day waiting period), Thiamethoxam 25% WG at 100 g per hectare in 500-750 litres (14-day waiting period), and Ethofenoprox 10% EC at 500-750 ml per hectare in 500 litres (15-day waiting period).',
          activeIngredient_en:
            'Fipronil 5% SC (50-75 g a.i./ha), Thiamethoxam 25% WG (25 g a.i./ha), or Ethofenoprox 10% EC (50-75 g a.i./ha)',
          safetyCaution_en:
            'Treatment only protects tillers that have not yet been attacked, so it is worth applying early in tillering and pointless once silver shoots are widespread. Waiting periods differ — 32, 14 and 15 days. Wear gloves and a mask, and do not spray against the wind.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides) registry, rice entries listing gall midge among the target pests. Carbofuran-based granules also appear in the registry for this pest but are not surfaced here, as carbofuran is acutely toxic and its use is under regulatory review in several jurisdictions — discuss it with your local agriculture extension office rather than treating it as a default.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph the silvery tube held upright beside a normal green tiller from the same hill, so the difference in shape and colour is visible. Check the stem along its whole length for a bore hole before you photograph.',
        rationale_en:
          'The side-by-side comparison is what makes the silver shoot recognisable, and confirming there is no bore hole is what rules out stem borer.',
      },
      fieldFollowUps: [
        {
          id: 'rice-gallmidge-q-tube',
          question_en: 'Is the affected shoot a pale hollow tube like an onion leaf, still alive, rather than a dry brown dead shoot?',
          ifYes_en: 'A living silvery tube is the gall midge silver shoot.',
          ifNo_en: 'A dry brown shoot that pulls out is stem borer instead.',
          pointsTowardIds: ['disease-rice-gallmidge'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
        {
          id: 'rice-gallmidge-q-borehole',
          question_en: 'Examining the stem along its length, is there no bore hole and no powdery frass anywhere?',
          ifYes_en: 'Absence of a bore hole fits gall midge, whose maggot enters at the growing point without tunnelling.',
          ifNo_en: 'A bore hole with frass means stem borer, which needs a different insecticide and a different timing.',
          pointsTowardIds: ['disease-rice-gallmidge'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Under 5% of tillers showing silver shoots.',
          action_en:
            'No spray. The plant compensates with extra tillers at this level. Clear weed hosts and keep counting weekly.',
        },
        {
          level: 'moderate',
          threshold_en: '5-10% of tillers with silver shoots, during active tillering.',
          action_en:
            'Consider a registered treatment only if tillering is still in progress and there are tillers left to protect. Confirm the count with your local agriculture extension office first.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% of tillers affected, or silver shoots still appearing after tillering has finished.',
          action_en:
            'Consult your local agriculture extension office, and plan a resistant variety for next season. After tillering ends the plant can no longer compensate, and spraying then cannot recover the lost tillers.',
        },
      ],
      escalationThreshold_en:
        'Contact your local agriculture extension office if more than one tiller in ten shows silver shoots, or if new silver shoots keep appearing after the tillering stage has ended. Because the maggot is protected inside the shoot and already-formed silver shoots can never produce a panicle, the useful conversation with an officer is about variety choice and planting date for next season, not only about which product to spray now.',
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Entomology & Integrated Pest Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title:
            'Major Uses of Pesticides (Insecticides, agricultural use) — Registered under the Insecticides Act, 1968, as on 30.09.2025',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-10-13',
          url: 'https://new.jau.in/storage/document/dynamic_document//residue_insecticide_30092025_20251226_783.pdf',
          specificDocumentVerified: true,
          pageOrSection:
            'Rice crop entries listing "Gall midge" among target pests — Fipronil 05% SC (1000-1500 ml/ha, 500 L, 32 days), Thiamethoxam 25% WG (100 g/ha, 500-750 L, 14 days), Ethofenoprox 10% EC (500-750 ml/ha, 500 L, 15 days). Note: retrieved from a Junagadh Agricultural University mirror of the CIBRC document, as the ppqs.gov.in copy was unreachable; document title, issuing body and "as on" date were confirmed in the retrieved file.',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-rice-zincdeficiency': {
      id: 'disease-rice-zincdeficiency',
      cropId: 'crop-rice',
      name_en: 'Zinc Deficiency (Khaira)',
      conditionCategory: 'nutrient_deficiency',
      pathogenOrVector_en: 'Not an infection — a soil nutrient disorder caused by low available zinc',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Appears two to four weeks after transplanting, usually in distinct patches rather than evenly across the field.',
        'Dusty rust-brown blotches develop on the lower leaves, starting near the leaf base and midrib.',
        'The midrib area turns pale or bleached while the leaf tip may stay greener.',
        'Plants are stunted with shortened internodes, giving a squat appearance, and tillering is poor.',
        'Severely affected patches show delayed maturity, so the field ripens unevenly.',
      ],
      affectedParts: ['Lower Leaves', 'Whole Plant', 'Tillers'],
      similarConditions: [
        {
          id: 'rice-zinc-vs-brownspot',
          name_en: 'Brown Spot (Bipolaris oryzae / Fungal)',
          isPathological: true,
          differentiatingFactors_en:
            'This is the critical distinction. Brown Spot makes discrete oval spots each with a defined dark margin, and the plant is otherwise normal height. Zinc deficiency makes diffuse rust-coloured blotching that runs together without clear margins, concentrated near the midrib, together with obvious stunting and poor tillering. Spraying a fungicide at zinc deficiency wastes money and leaves the real cause untouched.',
        },
        {
          id: 'rice-zinc-vs-ironmanganese',
          name_en: 'Iron Toxicity / Bronzing (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Iron toxicity bronzes the whole leaf evenly from the tip, typically in permanently waterlogged acidic patches. Zinc deficiency blotches start near the leaf base and midrib and come with marked stunting.',
        },
        {
          id: 'rice-zinc-vs-tungro',
          name_en: 'Rice Tungro Disease (Viral)',
          isPathological: true,
          differentiatingFactors_en:
            'Tungro yellows or oranges the leaves from the tip downwards with stunting, and spreads plant to plant in a widening patch following leafhopper movement. Zinc deficiency patches follow the soil — low spots, levelled cuts, high-pH areas — and do not spread outward over time.',
        },
      ],
      environmentalRiskFactors_en: [
        'Calcareous, alkaline or high-pH soils, where zinc becomes chemically unavailable to the plant even when present.',
        'Prolonged flooding and continuously submerged conditions, which reduce zinc availability.',
        'Land that has been levelled or cut, exposing subsoil with little organic matter.',
        'Intensive cropping with heavy NPK use and no micronutrient replacement over several seasons.',
        'Soils high in phosphorus, which further restricts zinc uptake.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Get a soil test before the season and ask specifically for available zinc, not only NPK. Zinc deficiency is predictable from a soil test and far cheaper to prevent than to correct mid-season.',
          targetTiming: 'Before the season',
        },
        {
          stepNumber: 2,
          practice_en:
            'Apply well-decomposed farmyard manure or compost regularly. Organic matter keeps zinc in a form the plant can take up, especially in high-pH soils.',
          targetTiming: 'Land preparation',
        },
        {
          stepNumber: 3,
          practice_en:
            'Avoid continuous deep submergence. Alternate wetting and drying improves zinc availability as well as root health.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 4,
          practice_en:
            'In fields with a known history of khaira, dip seedling roots in a zinc oxide suspension before transplanting — ask your local agriculture extension office for the preparation used locally.',
          targetTiming: 'At transplanting',
        },
      ],
      treatments: [
        {
          id: 'rice-zinc-corr-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'This is a nutrient disorder, so the correction is zinc, not a pesticide. Zinc sulphate is the standard correction, applied either to the soil at land preparation or as a foliar spray on a standing crop. A specific quantity is deliberately not stated here — see the caution below.',
          safetyCaution_en:
            'No quantity is given here because the correct zinc rate depends on your soil test reading, soil pH and whether you are applying to soil or foliage, and it varies widely between fields. Zinc sulphate is a fertiliser, not a pesticide, so it does not appear in the CIBRC registry that this app verifies doses against. Ask your local agriculture extension office for the rate matched to your soil test.',
          regulatoryNotice_en:
            'Do not apply any fungicide or insecticide for this condition. Zinc deficiency is not caused by a pest or pathogen, so a spray cannot correct it — it only adds cost and can scorch already-stressed foliage.',
        },
        {
          id: 'rice-zinc-corr-2',
          stepNumber: 2,
          category: 'preventive',
          instruction_en:
            'Alongside the zinc correction, drain the affected patches for a few days. Draining raises zinc availability in waterlogged soil and often produces visible recovery in the newer leaves within one to two weeks.',
          safetyCaution_en:
            'Recovery shows in newly emerging leaves. Already-blotched older leaves will not turn green again, so judge whether the correction worked by looking at new growth, not old leaves.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Step back and photograph the whole patch alongside a healthy area of the same field, so the stunting and the patchy pattern are visible. Then photograph one lower leaf close up, showing the blotching near the midrib and base.',
        rationale_en:
          'A close-up leaf photo alone looks very like Brown Spot. The patchy distribution and the stunting next to healthy plants are what identify this as a soil problem rather than a disease.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-zinc-q-patchy',
          question_en:
            'Is the problem confined to patches — low spots, levelled areas, or one part of the field — with clearly healthy plants nearby?',
          ifYes_en: 'A patchy pattern tied to soil position strongly indicates a nutrient or soil problem, not a disease.',
          ifNo_en:
            'Damage spread evenly or expanding plant to plant points to a disease or an insect-transmitted virus instead.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-zinc-q-stunting',
          question_en: 'Are the affected plants clearly shorter, with fewer tillers, than healthy plants in the same field?',
          ifYes_en: 'Stunting with poor tillering fits zinc deficiency. Brown Spot does not shorten the plant.',
          ifNo_en: 'Normal height with spotted leaves points to Brown Spot or another foliar disease.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-zinc-q-timing',
          question_en: 'Did this appear within about two to four weeks of transplanting?',
          ifYes_en: 'That timing is characteristic of khaira zinc deficiency.',
          ifNo_en: 'Appearance much later in the season makes a foliar disease more likely.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Faint blotching on a few lower leaves in small patches, with no noticeable stunting.',
          action_en:
            'Drain the patch and plan a soil test. A foliar zinc correction may be enough; no pesticide of any kind is appropriate.',
        },
        {
          level: 'moderate',
          threshold_en: 'Clear rust-brown blotching with visible stunting across distinct patches of the field.',
          action_en:
            'Apply the zinc correction at the rate your local agriculture extension office gives for your soil test, and drain. Expect recovery to show in new leaves within one to two weeks.',
        },
        {
          level: 'severe',
          threshold_en: 'Large patches badly stunted with very poor tillering, and maturity visibly delayed against the rest of the field.',
          action_en:
            'Consult your local agriculture extension office promptly. At this level yield is already affected, and the field needs a soil test to plan correction for next season as well as a rescue application now.',
        },
      ],
      escalationThreshold_en:
        'Consult your local agriculture extension office for the zinc rate matched to your soil test, and promptly if patches are badly stunted or maturity is clearly delayed. Importantly, if someone advises a fungicide for these symptoms, ask them to rule out zinc deficiency first — khaira is routinely mistaken for Brown Spot, and a fungicide spent on it is money lost with the crop still declining.',
      claimEvidence: [
        {
          claimId: 'rice-zinc-no-dose',
          fieldRef: "treatments['rice-zinc-corr-1'] — zinc sulphate application rate, deliberately omitted",
          verificationStatus: 'unsupported',
          locator: undefined,
          limitation_en:
            'No application rate is stated for zinc sulphate. Zinc sulphate is a fertiliser rather than a pesticide, so it is outside the scope of the CIBRC registries this catalog verifies doses against, and no primary ANGRAU or ICAR document giving a rate was accessible from this tool. A rate must come from your own soil test via your local agriculture extension office.',
        },
      ],
      sources: [
        {
          title: 'Vyavasaya Panchangam — Rice Soil Fertility & Micronutrient Management',
          organization: 'Acharya N.G. Ranga Agricultural University (ANGRAU), Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-13',
    },

    'disease-chilli-leaf-curl': {
      id: 'disease-chilli-leaf-curl',
      cropId: 'crop-chilli',
      name_en: 'Chilli Leaf Curl Virus',
      pathogenOrVector_en: 'Virus: Begomovirus transmitted by Whitefly (Bemisia tabaci)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Upward curling, puckering, and crinkling of leaf margins.',
        'Vein clearing, thickening, and brittle leathery leaves.',
        'Severe stunting of young shoots, shortened internodes, and blossom drop.',
      ],
      affectedParts: ['Leaves', 'Growing Tips', 'Buds'],
      similarConditions: [
        {
          id: 'chilli-thrips-damage',
          name_en: 'Thrips Damage (Scirtothrips dorsalis / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Thrips cause upward boat-shaped curling with silvery or bronze streaks on leaf undersides; leaf curl virus causes thickened, crinkled foliage with vein clearing.',
        },
        {
          id: 'chilli-mite-damage',
          name_en: 'Yellow Mite Damage (Polyphagotarsonemus latus / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Mites cause leaves to curl DOWNWARDS (inverted boat shape) with elongation of petioles; leaf curl virus curls leaves UPWARDS.',
        },
        {
          id: 'chilli-herbicide-drift',
          name_en: 'Auxin/Herbicide Drift Injury (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Herbicide drift causes strap-like parallel-veined leaves along field borders; viral leaf curl occurs in scattered patches where vectors feed.',
        },
      ],
      environmentalRiskFactors_en: [
        'Prolonged dry spells with high ambient temperatures favoring whitefly population bursts.',
        'Cultivation adjacent to unmanaged host crops or weed borders.',
        'Over-application of synthetic pyrethroids leading to whitefly flare-up.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Erect 2-3 border rows of tall barrier crops like Sorghum, Maize, or Pearl Millet around the chilli plot.',
          targetTiming: 'Sowing/Planting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Install yellow sticky traps (15-20 traps per acre) at canopy level to monitor and trap whitefly vectors early.',
          targetTiming: 'Transplanting to flowering',
        },
        {
          stepNumber: 3,
          practice_en:
            'Rogue and safely bury or burn virus-infected seedlings within the first 30 days after transplanting.',
          targetTiming: 'Early vegetative',
        },
      ],
      treatments: [
        {
          id: 't-chilli-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'VIRAL INFECTION CANNOT BE CURED BY CHEMICALS OR ORGANIC SPRAYS. Cold-pressed Neem Oil and NSKE sprays are commonly used organic practices to deter whitefly vector (Bemisia tabaci) feeding and oviposition — they have no viricidal action, only vector-suppression value — but a specific dose is suppressed — Phase 5.4 evidence verification could not confirm an exact figure against a primary reference accessible from this tool. Synthetic insecticides (e.g. Diafenthiuron 50% WP, Acetamiprid 20% SP) are also commonly discussed for suppressing this vector once it exceeds economic threshold (5-10 whiteflies per plant), but a specific product and dose for either is likewise suppressed: no primary CIBRC label was accessible from this tool to confirm either as a standalone product labeled for whitefly on chilli (one secondary source listed Diafenthiuron 50% WP as labeled only for mites on chilli, not whitefly — verify the target pest on the label, not just the active ingredient). Do not apply any insecticide, organic or synthetic, if whitefly vectors are absent, and consult your local agriculture extension office for current guidance before using any option.',
          activeIngredient_en:
            'Neem Oil / Azadirachtin (organic, dose suppressed); Diafenthiuron 50% WP / Acetamiprid 20% SP (synthetic vector management, targets Bemisia tabaci only — not the virus; product/dose suppressed, possible chilli-whitefly label mismatch found in secondary sources)',
          safetyCaution_en:
            'If using any insecticide once confirmed: rotate chemistry, do not repeat the same class consecutively to prevent vector resistance, observe the mandatory pre-harvest interval on the approved container label, and wear protective mask and gloves.',
          regulatoryNotice_en:
            'Statutory Warning: Insecticides (organic or synthetic) manage the whitefly vector only; they have no viricidal action. Actionable synthetic product and dose are suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment, and a secondary source suggested Diafenthiuron may be labeled for chilli mites rather than whitefly). Strictly adhere to approved CIBRC container label directions once confirmed with your local agriculture extension office.',
        },
      ],
      escalationThreshold_en:
        'If whitefly counts exceed 15-20 per plant and leaf curling advances rapidly across the main field despite barrier cropping, consult your local agriculture extension office for area-wide vector suppression advisories.',
      chemicalTabDetail_en:
        'VIRAL INFECTION CANNOT BE CURED BY CHEMICALS. Synthetic insecticides such as Diafenthiuron 50% WP and Acetamiprid 20% SP are sometimes discussed for suppressing the whitefly vector (Bemisia tabaci) once it exceeds economic threshold (5-10 whiteflies per plant) — they have no viricidal action, only vector-suppression value. A specific product and dose are suppressed: no primary CIBRC label was accessible from this tool to confirm either as a standalone product labeled for whitefly on chilli. IMPORTANT TARGET-PEST WARNING: one secondary source listed Diafenthiuron 50% WP as labeled only for mites on chilli, not whitefly — verify the target pest on the approved label, not just the active ingredient name, before any use. See the Organic tab for full safety caution and regulatory guidance; consult your local agriculture extension office.',
      sources: [
        {
          title: 'Vyavasaya Panchangam — Chilli Crop Protection & Vector Management',
          organization: 'ANGRAU, Regional Agricultural Research Station (RARS), Lam, Guntur',
          reviewDate: '2025-05-20',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'Management of Viral Diseases in Horticultural Crops',
          organization: 'ICAR - Indian Institute of Horticultural Research (IIHR), Bengaluru',
          reviewDate: '2024-09-10',
          url: 'https://iihr.res.in',
        },
        {
          title: 'Major Uses of Pesticides (Insecticides) — Approved Chilli Vector Formulations',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-03-31',
          url: 'https://ppqs.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-12',
    },

    'disease-cotton-bollworm': {
      id: 'disease-cotton-bollworm',
      cropId: 'crop-cotton',
      name_en: 'Pink Bollworm',
      pathogenOrVector_en: 'Insect Pest: Pectinophora gossypiella (Saunders)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Rosetted flowers ("rosette blooms") that fail to open normally.',
        'Prematurely opened bolls with stained, poor quality lint.',
        'Internal boreholes in maturing bolls plugged with frass, with pink larvae inside developing seeds.',
      ],
      affectedParts: ['Squares', 'Flower Buds', 'Bolls', 'Seeds'],
      similarConditions: [
        {
          id: 'cotton-spotted-bollworm',
          name_en: 'Spotted Bollworm (Earias vittella)',
          isPathological: true,
          differentiatingFactors_en:
            'Spotted bollworm causes drooping/wilting of terminal growing shoots early in the season; pink bollworm damages squares and internal seed kernels inside maturing bolls.',
        },
        {
          id: 'cotton-physiological-square-drop',
          name_en: 'Physiological Square/Boll Shedding (Abiotic Weather Stress)',
          isPathological: false,
          differentiatingFactors_en:
            'Physiological shedding occurs after heavy overcast skies, waterlogging or sudden moisture stress without bored holes, rosette flowers, or larval frass.',
        },
      ],
      environmentalRiskFactors_en: [
        'Ratooning of cotton crops or extending crop duration into summer months.',
        'Staggered sowing in neighboring fields creating continuous food sources for pest cycles.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Install pheromone traps with female sex pheromone lures @ 5 traps per acre at 45 days after sowing for adult moth monitoring.',
          targetTiming: '45-60 DAS',
        },
        {
          stepNumber: 2,
          practice_en:
            'Terminate cotton crop by December/January; avoid extending the crop to reduce overwintering diapausing larvae.',
          targetTiming: 'Crop termination',
        },
      ],
      treatments: [
        {
          id: 't-cotton-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Release egg parasitoid Trichogramma bactrae @ 60,000 eggs/acre at weekly intervals from flower initiation. When moth trap catches exceed ETL (8 moths/trap/night for 3 consecutive days) or rosette flowers exceed 10%, Chlorantraniliprole 18.5% SC and Emamectin Benzoate 5% SG are also commonly discussed insecticide classes for cotton bollworm, but a specific dose for either is suppressed: Phase 5.4 evidence verification found several differing commercial dose figures (secondary sources ranged roughly 0.3-0.4 ml/L for Chlorantraniliprole and 0.4-0.5 g/L for Emamectin Benzoate) with no primary CIBRC label accessible from this tool to confirm an exact figure. Consult your local agriculture extension office before using any chemical option.',
          activeIngredient_en:
            'Trichogramma bactrae (organic bio-control); Chlorantraniliprole 18.5% SC / Emamectin Benzoate 5% SG (chemical classes, exact dose suppressed — conflicting secondary-source figures, no primary CIBRC label accessible)',
          safetyCaution_en:
            'If using any chemical insecticide once a dose is confirmed: avoid broad-spectrum pyrethroid overuse (accelerates resistance) and follow the container label pre-harvest waiting period.',
          regulatoryNotice_en:
            'Spray any chemical option strictly based on ETL monitoring once a specific product and dose are confirmed. Actionable chemical dose suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment). Consult your local agriculture extension office for the currently approved formulation and dose.',
        },
      ],
      escalationThreshold_en:
        'When rosette flowers exceed 15% or trap catch surges above 15 moths/night, immediately consult your local agriculture officer for community-level mass trapping and coordinated spray schedules.',
      chemicalTabDetail_en:
        'Chlorantraniliprole 18.5% SC and Emamectin Benzoate 5% SG are commonly discussed insecticide classes for cotton bollworm once moth trap catches exceed ETL (8 moths/trap/night for 3 consecutive days) or rosette flowers exceed 10%. A specific dose for either is suppressed: secondary sources gave differing commercial figures (roughly 0.3-0.4 ml/L for Chlorantraniliprole and 0.4-0.5 g/L for Emamectin Benzoate) with no primary CIBRC label accessible from this tool to confirm an exact figure. See the Organic tab for full safety caution and regulatory guidance; consult your local agriculture extension office before spraying anything.',
      sources: [
        {
          title: 'Pink Bollworm Management Strategy in Cotton',
          organization: 'ICAR - Central Institute for Cotton Research (CICR), Nagpur',
          reviewDate: '2024-10-05',
          url: 'https://cicr.org.in',
        },
        {
          title: 'Vyavasaya Panchangam — Commercial Crops & Cotton IPM',
          organization: 'ANGRAU, Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'Major Uses of Pesticides (Insecticides) — Approved Cotton Bollworm Formulations',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-03-31',
          url: 'https://ppqs.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-12',
    },

    'disease-groundnut-tikka': {
      id: 'disease-groundnut-tikka',
      cropId: 'crop-groundnut',
      name_en: 'Tikka Leaf Spot',
      pathogenOrVector_en: 'Fungi: Cercospora arachidicola (Early) & Phaeoisariopsis personata (Late)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Early leaf spot: Circular reddish-brown to dark brown spots surrounded by a prominent yellow halo on upper leaf surface.',
        'Late leaf spot: Nearly circular dark black spots mostly on lower leaf surface without a distinct yellow halo.',
        'Severe infection leads to extensive defoliation, leaving bare stems.',
      ],
      affectedParts: ['Leaves', 'Petioles', 'Stems'],
      similarConditions: [
        {
          id: 'groundnut-rust',
          name_en: 'Groundnut Rust (Puccinia arachidis)',
          isPathological: true,
          differentiatingFactors_en:
            'Rust produces orange to reddish-brown raised pustules that rupture on the leaf underside; Tikka spots do not rupture into dusty spores.',
        },
        {
          id: 'groundnut-iron-chlorosis',
          name_en: 'Iron Deficiency Chlorosis (Abiotic Nutrient Stress)',
          isPathological: false,
          differentiatingFactors_en:
            'Iron deficiency causes uniform interveinal chlorosis (yellowing) on young emerging leaves without necrotic circular spots or dark rings.',
        },
      ],
      environmentalRiskFactors_en: [
        'Prolonged wet weather with relative humidity above 85% and temperatures between 25°C and 30°C.',
        'Continuous sole cropping of groundnut in rainfed red sandy soils.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Practice crop rotation with cereals like Pearl Millet (Bajra), Sorghum, or Maize in Rayalaseema rainfed belts.',
          targetTiming: 'Pre-season planning',
        },
        {
          stepNumber: 2,
          practice_en:
            'Seed treatment with bio-agent Trichoderma viride @ 10g/kg seed before sowing. Mancozeb 75% WP is sometimes used as a chemical seed-treatment alternative, but the specific dose previously listed here is suppressed (Phase 5.5C): it has not been verified against a current, authoritative Indian pesticide registration/label applicable to groundnut seed treatment. Do not rely on PDDS for any chemical seed-treatment dose — confirm the currently approved product and dose with your local agriculture extension office before treating seed with any chemical.',
          targetTiming: 'Pre-sowing',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-tikka-org-nske-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Rajasthan trial (ICAR, published on epubs.icar.org.in) found that NSKE (Neem Seed Kernel Extract) combined with a Trichoderma + Pseudomonas fluorescens bio-agent treatment reduced Tikka leaf spot incidence by 60.54% compared to untreated plots. This is real, cited evidence of effectiveness — but it is from Rajasthan, not Andhra Pradesh (geographicScope: other_state below), and the specific NSKE concentration and application interval used in that trial are suppressed here pending confirmation against a current university/CIBRC label. Do not infer an exact spray strength from the 60.54% figure — it describes an outcome, not a label rate. Consult your local agriculture extension office for the current recommended NSKE concentration and bio-agent dose for groundnut tikka in your district.',
          activeIngredient_en: 'NSKE (Neem Seed Kernel Extract) + Trichoderma / Pseudomonas fluorescens (concentration suppressed — Rajasthan trial outcome cited, not an Andhra Pradesh-confirmed label rate)',
          safetyCaution_en:
            'Eco-friendly biocontrol combination; avoid mixing with synthetic chemical fungicides in the same spray tank. Wear basic gloves during preparation and application.',
          regulatoryNotice_en:
            'The 60.54% reduction figure is a real ICAR-published trial result from Rajasthan, not Andhra Pradesh — treat it as supporting evidence that this organic combination can work, not as an Andhra Pradesh-specific or dose-confirmed recommendation. Confirm the current recommended concentration with your local agriculture extension office.',
        },
        {
          id: 't-groundnut-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'At initial spot appearance, Mancozeb 75% WP and Tebuconazole 25.9% EC are commonly used fungicide classes for groundnut leaf spot (tikka), but a specific dose is suppressed: Phase 5.4 evidence verification found a university extension source citing Mancozeb 75% WP @ 3g/L (differing from an earlier, uncorroborated 2.5g/L figure) and found no confirming source at all for a Tebuconazole 25.9% EC dose on this crop, with no primary CIBRC label accessible from this tool.',
          activeIngredient_en: 'Mancozeb 75% WP / Tebuconazole 25.9% EC (exact dose suppressed — conflicting/absent secondary-source figures, no primary CIBRC label accessible)',
          safetyCaution_en:
            'Avoid spraying during strong midday sunshine. Maintain recommended water volume (200 L/acre). Follow approved container label waiting period (PHI) before harvest; verify with your local agriculture extension office.',
          regulatoryNotice_en:
            'Statutory Safety Notice: Check approved product label. Actionable dose suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment). Verify dosage and pre-harvest interval with your local agriculture extension office.',
        },
      ],
      escalationThreshold_en:
        'If defoliation begins before pod filling stage, seek advice at your local agriculture extension office to prevent severe yield loss.',
      claimEvidence: [
        {
          claimId: 't-groundnut-chem-1-safety-caution',
          fieldRef: "treatments['t-groundnut-chem-1'].safetyCaution_en/_te",
          verificationStatus: 'unsupported',
          sourceIndexes: [0, 1, 2],
          limitation_en:
            'The spray water volume figure (200 L/acre) is a general spray-carrier convention seen in secondary agricultural sources — it is not confirmed against the current Mancozeb 75% WP / Tebuconazole 25.9% EC product label for this crop and pest (all three sources above link only to an organization homepage, not this specific figure). Confirm the current label directions with your local agriculture extension office before spraying.',
        },
        {
          claimId: 't-groundnut-tikka-org-nske-1-reduction-figure',
          fieldRef: "treatments['t-groundnut-tikka-org-nske-1'].instruction_en/_te",
          verificationStatus: 'provisional',
          sourceIndexes: [3],
          locator: 'epubs.icar.org.in — Rajasthan field trial, NSKE + Trichoderma/P. fluorescens vs. untreated control (60.54% incidence reduction)',
          limitation_en:
            'The 60.54% reduction figure is a real ICAR-published trial result, reached via a research subagent\'s search/fetch rather than a direct page read by this session, and the trial location was Rajasthan, not Andhra Pradesh. Marked provisional (not verified) because the exact NSKE concentration used in that trial was not independently confirmed, and the result has not been shown to replicate under Andhra Pradesh growing conditions. Confirm current local guidance with your local agriculture extension office.',
        },
      ],
      sources: [
        {
          title: 'Vyavasaya Panchangam — Oilseeds & Groundnut Disease Management',
          organization: 'ANGRAU, Agricultural Research Station (ARS), Kadiri, Andhra Pradesh',
          reviewDate: '2025-05-15',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'ICAR-Directorate of Groundnut Research Technical Bulletins — Foliar Diseases',
          organization: 'ICAR - DGR, Junagadh',
          reviewDate: '2024-08-12',
          url: 'https://dgr.icar.gov.in',
        },
        {
          title: 'Major Uses of Pesticides (Fungicides) — Approved Groundnut Cercospora Formulations (Mancozeb & Tebuconazole)',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-03-31',
          url: 'https://ppqs.gov.in',
        },
        {
          title: 'NSKE + Trichoderma/Pseudomonas fluorescens field trial against groundnut Tikka leaf spot (60.54% incidence reduction vs. untreated control), Rajasthan',
          organization: 'ICAR — epubs.icar.org.in open-access repository',
          reviewDate: '2024-01-01',
          url: 'https://epubs.icar.org.in',
          geographicScope: 'other_state',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-13',
    },

    // 6 Provisional entries (clearly labeled provisional)
    'disease-maize-armyworm': {
      id: 'disease-maize-armyworm',
      cropId: 'crop-maize',
      name_en: 'Fall Armyworm',
      pathogenOrVector_en: 'Invasive Pest: Spodoptera frugiperda (J.E. Smith)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Pinholes and ragged "window-pane" feeding marks on young leaves.',
        'Heavy sawdust-like fecal frass accumulation inside the leaf whorl.',
        'Destruction of growing central shoot.',
      ],
      affectedParts: ['Whorl', 'Leaves', 'Tassels', 'Cobs'],
      similarConditions: [
        {
          id: 'maize-stem-borer',
          name_en: 'Spotted Stem Borer (Chilo partellus / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer larvae bore into stems leaving neat circular entry holes and linear pinhole series across leaves; Fall Armyworm causes large ragged windowpane leaf tearing with heavy sawdust-like fecal frass deep inside the whorl.',
        },
        {
          id: 'maize-grasshopper-damage',
          name_en: 'Grasshopper / Armyworm Leaf Defoliation (Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Grasshoppers chew irregularly from outside leaf margins inward on older leaves; Fall Armyworm feeds concealed inside the central tender whorl.',
        },
      ],
      environmentalRiskFactors_en: ['Warm humid weather during early whorl vegetative stage.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Deep summer ploughing to expose pupae; install pheromone traps @ 5/acre.',
        },
      ],
      treatments: [
        {
          id: 't-maize-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Apply dry sand + slaked lime mixture (9:1 ratio) @ 10-15 g directly into central seedling whorls to mechanically abrade caterpillar cuticle and deter feeding. Chemical spray guidance is suppressed pending primary CIBRC label validation.',
          activeIngredient_en: 'Sand + Lime (9:1) Physical Deterrent (Chemical sprays suppressed)',
          safetyCaution_en:
            'Wear protective dust mask and gloves while preparing and applying lime mixture to avoid skin/eye irritation.',
          regulatoryNotice_en:
            'Actionable synthetic chemical pesticide recommendations are suppressed pending primary CIBRC registration excerpt verification. Consult your local agriculture extension office.',
        },
      ],
      escalationThreshold_en: 'Escalate to your local agriculture extension office if more than 10% of seedling plants show central whorl damage.',
      sources: [
        {
          title: 'ANGRAU Special Advisory on Fall Armyworm in Maize',
          organization: 'ANGRAU, Guntur',
          reviewDate: '2024-07-10',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'ICAR - Indian Institute of Maize Research (IIMR) FAW Technical Bulletin',
          organization: 'ICAR - IIMR, Ludhiana',
          reviewDate: '2024-08-15',
          url: 'https://iimr.icar.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-10',
    },

    'disease-sugarcane-redrot': {
      id: 'disease-sugarcane-redrot',
      cropId: 'crop-sugarcane',
      name_en: 'Red Rot',
      pathogenOrVector_en: 'Fungus: Colletotrichum falcatum',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Discoloration and drying of upper leaves/crown.',
        'Reddening of internal stalk pith with characteristic white cross-bands when cane is split longitudinally.',
        'Sour alcohol-like fermentation odor from affected canes.',
      ],
      affectedParts: ['Stalk', 'Internal Pith', 'Crown Leaves'],
      similarConditions: [
        {
          id: 'sugarcane-wilt',
          name_en: 'Sugarcane Wilt (Fusarium sacchari / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Wilt causes diffuse, uniform reddish-yellow discoloration in stalk pith without transverse white patches or alcoholic fermentation odor; Red Rot causes deep red internal pith with distinct white cross-bands and a sharp sour alcoholic odor.',
        },
        {
          id: 'sugarcane-sett-rot',
          name_en: 'Pineapple Disease / Sett Rot (Ceratocystis paradoxa / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Pineapple disease primarily rots planted seed setts turning pith sooty black with a sweet pineapple scent; Red Rot attacks standing mature cane stalks turning the internal pith red with white bands.',
        },
      ],
      environmentalRiskFactors_en: ['Waterlogged conditions, high soil moisture in coastal Andhra.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant certified disease-free setts; use resistant varieties; avoid ratoon crops in infested fields.',
        },
      ],
      treatments: [
        {
          id: 't-sugarcane-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'Uproot and burn diseased clumps immediately to prevent soil-borne spread. Use only certified disease-free setts for planting; never re-plant cane from an infested field. Chemical sett-dip dose recommendations are suppressed pending primary CIBRC label verification.',
          activeIngredient_en: 'Cultural Practice: Clump Removal + Certified Setts (Chemical sett-dip dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves when uprooting and handling diseased clumps; wash hands thoroughly afterward. Burn or bury removed material away from irrigation channels.',
          regulatoryNotice_en:
            'Red rot is internal and systemic; it cannot be cured by standing foliar chemical sprays. Actionable synthetic fungicide sett-dip dosage is suppressed until verified directly against a primary CIBRC registration label for sugarcane red rot. Consult your local agriculture extension office or sugarcane factory agriculture officer for the current approved sett-treatment product and dose.',
        },
      ],
      escalationThreshold_en: 'Report red rot outbreaks to local sugarcane factory agriculture officers and your local agriculture extension office.',
      sources: [
        {
          title: 'Sugarcane Research Station Technical Guidelines — Red Rot Management',
          organization: 'ANGRAU Regional Agricultural Research Station (RARS), Anakapalli',
          reviewDate: '2024-04-10',
          url: 'https://angrau.ac.in',
        },
        {
          title: 'ICAR - Sugarcane Breeding Institute (SBI) Red Rot Diagnostic Bulletins',
          organization: 'ICAR - SBI, Coimbatore',
          reviewDate: '2024-05-15',
          url: 'https://sugarcane.icar.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-10',
    },

    'disease-tomato-earlyblight': {
      id: 'disease-tomato-earlyblight',
      cropId: 'crop-tomato',
      name_en: 'Early Blight',
      pathogenOrVector_en: 'Fungus: Alternaria solani',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Concentric dark brown circular rings (target-board appearance) on older lower leaves.',
        'Yellowing of foliage surrounding concentric lesions followed by leaf drop.',
        'Dark sunken leathery cankers on stems and fruit calyx.',
      ],
      affectedParts: ['Lower Leaves', 'Stems', 'Fruit Calyx'],
      similarConditions: [
        {
          id: 'tomato-late-blight',
          name_en: 'Late Blight (Phytophthora infestans / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Late blight produces rapid water-soaked greenish-black irregular patches without concentric rings, developing delicate white fungal down on lower leaf surfaces in moist cool weather; Early blight produces dry brown circular lesions with distinct target-board concentric rings primarily on older lower leaves.',
        },
        {
          id: 'tomato-septoria-spot',
          name_en: 'Septoria Leaf Spot (Septoria lycopersici / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Septoria spots are small (2-3 mm) and numerous with whitish-gray centers and tiny black fruiting bodies (pycnidia); Early blight lesions are larger (5-15 mm) with pronounced target rings.',
        },
      ],
      environmentalRiskFactors_en: ['Warm humid weather alternating with dry spells in Chittoor district.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Remove lower foliage touching soil; use mulch to prevent soil splashing onto leaves.',
        },
      ],
      treatments: [
        {
          id: 't-tomato-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem-based biopesticide formulations and bio-agent Trichoderma viride are commonly used against early leaf spotting, but a specific dose is suppressed pending primary CIBRC/university label verification. Chemical fungicide spray recipes are likewise suppressed pending primary CIBRC label verification. Consult your local agriculture extension office or Horticulture Officer for the currently approved product and dose.',
          activeIngredient_en: 'Neem-based biopesticide / Trichoderma viride (dose suppressed pending verification; chemical sprays suppressed)',
          safetyCaution_en:
            'Avoid spraying during high winds or midday heat. Wear basic protective mask.',
          regulatoryNotice_en:
            'Both the biopesticide dose and the chemical fungicide recommendations for tomato early blight are suppressed until verified directly against a primary CIBRC/university registration label. Consult your local agriculture extension office.',
        },
      ],
      escalationThreshold_en: 'Consult your local agriculture extension office if blighting reaches upper leaves and fruit clusters.',
      sources: [
        {
          title: 'Horticultural Advisory on Tomato Diseases & Integrated Management',
          organization: 'Dr. YSR Horticultural University (YSRHU), Venkataramannagudem',
          reviewDate: '2024-05-18',
          url: 'https://drysrhu.ap.gov.in',
        },
        {
          title: 'ICAR - Indian Institute of Vegetable Research (IIVR) Solanaceous Disease Guidelines',
          organization: 'ICAR - IIVR, Varanasi',
          reviewDate: '2024-07-20',
          url: 'https://iivr.icar.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-10',
    },

    'disease-mango-anthracnose': {
      id: 'disease-mango-anthracnose',
      cropId: 'crop-mango',
      name_en: 'Anthracnose',
      pathogenOrVector_en: 'Fungus: Colletotrichum gloeosporioides',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Dark brown to black speckling on panicles/blossoms causing blossom blight and flower drop.',
        'Irregular dark brown leaf spots with necrotic centers.',
        'Sunken black circular lesions on maturing fruits that tear and rot during transit.',
      ],
      affectedParts: ['Inflorescence / Panicles', 'Foliage / Leaves', 'Fruits'],
      similarConditions: [
        {
          id: 'mango-powdery-mildew',
          name_en: 'Powdery Mildew (Oidium mangiferae / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Powdery mildew covers floral panicles and young leaves with white superficial powdery fungal growth causing blossom drop without lesions; Anthracnose produces distinct dark brown necrotic specks and sunken black necrotic spots on flowers and fruit without powdery white coating.',
        },
        {
          id: 'mango-bacterial-canker',
          name_en: 'Bacterial Canker (Xanthomonas citri pv. mangiferaeindicae / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Bacterial canker forms water-soaked, angular black leaf lesions with gummy exudate and star-shaped longitudinal cracks on fruit; Anthracnose produces circular, sunken tear-stain lesions without star-shaped cracks.',
        },
      ],
      environmentalRiskFactors_en: ['Unseasonal rains or heavy fog during mango flowering (Dec-Feb).'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Prune dead and interlocking branches after harvest; destroy infected fallen foliage and twigs.',
        },
      ],
      treatments: [
        {
          id: 't-mango-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bordeaux mixture (copper sulphate + lime) is a traditional pre-bloom spray used on pruned branch cuts against anthracnose, but a specific concentration/dose is suppressed pending primary CIBRC/university label verification. Synthetic chemical fungicide recipes are likewise suppressed pending primary CIBRC registration label validation. Consult your local agriculture extension office or Horticulture Officer for the currently approved concentration and timing.',
          activeIngredient_en: 'Bordeaux Mixture: Copper Sulphate + Lime (concentration suppressed pending verification; synthetic chemical sprays suppressed)',
          safetyCaution_en:
            'Do not spray during full bloom / peak pollinator bee activity to avoid bee mortality. Wear eye protection and gloves.',
          regulatoryNotice_en:
            'Both the Bordeaux mixture concentration and any synthetic chemical pesticide recommendation are suppressed pending primary CIBRC/university registration excerpt verification. Consult your local agriculture extension office or Horticulture Officer.',
        },
      ],
      escalationThreshold_en: 'Seek advice if blossom blight exceeds 20% across orchard trees.',
      sources: [
        {
          title: 'Mango Pathology Bulletin — Anthracnose Management & Blossom Blight Protection',
          organization: 'Dr. YSR Horticultural University (YSRHU), Horticultural Research Station, Anantharajupeta',
          reviewDate: '2024-03-12',
          url: 'https://drysrhu.ap.gov.in',
        },
        {
          title: 'ICAR - Central Institute for Subtropical Horticulture (CISH) Mango IPM Bulletins',
          organization: 'ICAR - CISH, Lucknow',
          reviewDate: '2024-06-18',
          url: 'https://cish.icar.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-10',
    },

    'disease-banana-panamawilt': {
      id: 'disease-banana-panamawilt',
      cropId: 'crop-banana',
      name_en: 'Panama Wilt / Fusarium Wilt',
      pathogenOrVector_en: 'Soil-borne Fungus: Fusarium oxysporum f. sp. cubense',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Yellowing of lower leaves starting at the leaf margin and advancing inward.',
        'Leaves collapse at petiole junction and hang down skirt-like around pseudostem.',
        'Longitudinal splitting of pseudostem base; reddish-brown vascular discoloration inside corm.',
      ],
      affectedParts: ['Lower Leaves', 'Pseudostem Base', 'Corm / Roots'],
      similarConditions: [
        {
          id: 'banana-moko-bacterial-wilt',
          name_en: 'Bacterial Wilt / Moko Disease (Ralstonia solanacearum / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Cut vascular strands of Moko disease ooze milky bacterial streaming when placed in clean water and infect young suckers first; Panama wilt causes reddish-brown vascular discolouration inside the corm without bacterial streaming in water and primarily wilts older outer leaves first.',
        },
        {
          id: 'banana-potassium-deficiency',
          name_en: 'Potassium Deficiency (Abiotic Nutritional Stress)',
          isPathological: false,
          differentiatingFactors_en:
            'Potassium deficiency causes rapid yellowing and necrosis of older leaf tips and margins that curl inward, but inner pseudostem and corm vascular strands remain completely clean and white without discolouration.',
        },
      ],
      environmentalRiskFactors_en: ['Acidic to neutral soil with poor drainage; flood irrigation.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant certified disease-free tissue culture plantlets; avoid suckers from infected plantations.',
        },
      ],
      treatments: [
        {
          id: 't-banana-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride / T. reesei enriched neem cake incorporated at planting is commonly used to promote competitive rhizosphere bio-suppression, but a specific dose (e.g. quantity per pit) is suppressed pending primary CIBRC/university label verification — consult your local agriculture extension office or Horticulture Officer for the currently recommended quantity. This remains secondary to biosecurity: chemical fungicide drenches (e.g. Carbendazim) are scientifically ineffective against Fusarium TR4 and are strictly suppressed regardless of dose.',
          activeIngredient_en: 'Trichoderma viride Bio-agent + Neem Cake (dose suppressed pending verification; chemical drenching suppressed as scientifically ineffective)',
          safetyCaution_en:
            'Biocontrol amendment; handle with clean gloves. Never transport soil, tools, or water from infected mats to healthy banana blocks.',
          regulatoryNotice_en:
            'Critical Quarantine Notice: There is no approved or effective chemical curative fungicide for Panama wilt (Fusarium oxysporum f. sp. cubense TR4). Chemical drenching claims are disproven. Practice mandatory roguing with lime and strict biosecurity.',
        },
      ],
      escalationThreshold_en:
        'FUNGICIDES CANNOT CURE PANAMA WILT (TR4). Chemical claims are disproven. Immediately isolate infested plot, rogue infected clumps, apply 1-2 kg agricultural lime per pit, and consult your local agriculture extension office for biosecurity boundary enforcement.',
      claimEvidence: [
        {
          claimId: 'disease-banana-panamawilt-escalation-threshold',
          fieldRef: 'escalationThreshold_en/_te',
          verificationStatus: 'unsupported',
          sourceIndexes: [0],
          limitation_en:
            'The quarantine practice of roguing infected plants and treating the pit is not in dispute, but the exact lime quantity (1-2 kg per pit) is not confirmed against a specific page/section of the cited ICAR-NRCB technical guideline — only the organization homepage is linked. Confirm the exact quantity with your local agriculture extension office or Horticulture Officer.',
        },
      ],
      sources: [
        {
          title: 'Technical Guidelines on Biosecurity and Containment of Fusarium Wilt (TR4) in Banana',
          organization: 'ICAR - National Research Centre for Banana (NRCB), Tiruchirappalli',
          reviewDate: '2024-06-25',
          url: 'https://nrcb.icar.gov.in',
        },
      ],
      evidenceStatus: 'conflicting',
      lastUpdated: '2026-10-10',
    },

    'disease-turmeric-rhizomerot': {
      id: 'disease-turmeric-rhizomerot',
      cropId: 'crop-turmeric',
      name_en: 'Rhizome Rot',
      pathogenOrVector_en: 'Fungi/Oomycete: Pythium aphanidermatum & Fusarium spp.',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Water-soaked lesions at collar region of pseudostem near ground level.',
        'Leaves turn pale yellow and dry up from tips downward along margins.',
        'Rhizomes turn soft, decay, emit a foul odor, and easily pull out of the soil.',
      ],
      affectedParts: ['Rhizome', 'Roots', 'Collar / Pseudostem'],
      similarConditions: [
        {
          id: 'turmeric-leaf-blotch',
          name_en: 'Leaf Blotch / Leaf Spot (Taphrina maculans / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf blotch forms hundreds of small rectangular or oval reddish-yellow spots on leaf blades while underground rhizomes remain firm, fibrous, and healthy; Rhizome rot attacks collar region causing decaying, foul-smelling, soft rhizomes that easily pull apart.',
        },
        {
          id: 'turmeric-waterlogging-stress',
          name_en: 'Waterlogging & Poor Drainage Stagnation (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Water stagnation causes general leaf yellowing and temporary root suffocation without water-soaked rot lesions at the collar; Rhizome rot exhibits aggressive water-soaked basal collar decay and internal rhizome rot.',
        },
      ],
      environmentalRiskFactors_en: ['Water stagnation in heavy soils during heavy southwest monsoons.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Provide raised beds (15 cm height) with adequate drainage channels; treat seed rhizomes before sowing.',
        },
      ],
      treatments: [
        {
          id: 't-turmeric-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bio-agent Trichoderma asperellum seed-rhizome coating and neem cake soil incorporation are commonly used against rhizome rot, but specific doses are suppressed pending primary CIBRC/university label verification. Chemical fungicide drench recipes are likewise suppressed pending primary CIBRC registration label validation. Consult your local agriculture extension office or Horticulture Officer for currently approved products and doses.',
          activeIngredient_en: 'Trichoderma asperellum + Neem Cake (doses suppressed pending verification; chemical drenching suppressed)',
          safetyCaution_en:
            'Eco-friendly biocontrol treatment; wear basic gloves during rhizome coating.',
          regulatoryNotice_en:
            'Both the bio-agent/neem cake doses and any synthetic chemical drenching recommendation are suppressed pending primary CIBRC/university registration excerpt verification. Consult your local agriculture extension office or Horticulture Officer.',
        },
      ],
      escalationThreshold_en: 'Contact local Horticultural Officer if rot patches appear in more than 5% of beds.',
      sources: [
        {
          title: 'Turmeric Production and Plant Protection Guidelines — Rhizome Rot Management',
          organization: 'ANGRAU & ICAR - Indian Institute of Spices Research (IISR)',
          reviewDate: '2024-07-30',
          url: 'https://spices.res.in',
        },
        {
          title: 'Vyavasaya Panchangam — Spices & Turmeric Crop Guide',
          organization: 'ANGRAU, Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-10',
    },

    // 6 entries added per the Oct 2026 market-research expansion pass (see reports/Plant diagnosis app market research.md).
    'disease-groundnut-rust': {
      id: 'disease-groundnut-rust',
      cropId: 'crop-groundnut',
      name_en: 'Groundnut Rust',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Puccinia arachidis',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, raised, orange to reddish-brown pustules (uredinia) on the lower leaf surface, which rupture and release a dusty orange spore mass that sticks to fingers when rubbed.',
        'Corresponding pale yellow spots on the upper leaf surface directly above each pustule.',
        'Severe infection causes premature drying and shedding of leaves, often together with Tikka leaf spot on the same plant.',
      ],
      affectedParts: ['Leaves (lower surface)', 'Petioles', 'Stems (severe cases)'],
      similarConditions: [
        {
          id: 'groundnut-tikka-leafspot',
          name_en: 'Tikka Leaf Spot (Cercospora/Phaeoisariopsis spp. / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Tikka spots are flat, circular, reddish-brown to black lesions that do not rupture or release powder when rubbed; rust pustules are raised, rupture under light pressure, and leave an orange powdery residue on fingers.',
        },
        {
          id: 'groundnut-spider-mite-damage',
          name_en: 'Spider Mite Damage (Tetranychus spp. / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Spider mite damage shows fine stippled yellow-bronze speckling and faint webbing on leaf undersides, with no raised pustules or spore powder; rust produces discrete raised pustules that release powder on rubbing.',
        },
      ],
      environmentalRiskFactors_en: [
        'High relative humidity with moderate temperatures (20-25°C) during the later crop growth stages.',
        'Dense canopy with poor air circulation; continuous rainfed groundnut cultivation without rotation.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Follow crop rotation with cereals (bajra, jowar, maize) rather than continuous groundnut, and use locally recommended tolerant varieties where available.',
          targetTiming: 'Pre-season planning',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid overcrowded sowing; maintain recommended plant spacing to improve canopy air circulation and reduce humidity build-up.',
          targetTiming: 'Sowing',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-rust-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'A 2024 ANGRAU/ICRISAT-linked demonstration in Nellore district (Andhra Pradesh, India) recorded rust severity at 16% under farmer practice versus 5% in fungicide-treated demonstration plots — showing that timely fungicide spraying is effective, but the source summary available to this tool did not name the specific fungicide product or its dose used in that demonstration. Mancozeb and Tebuconazole-class fungicides, already listed on the Tikka leaf spot entry for this same crop, are also commonly discussed for combined leaf-spot-and-rust control, but their dose remains suppressed there for the same reason. Do not infer a dose from the 16%-vs-5% figure — it describes an outcome, not a label rate. Consult your local agriculture extension office for the current approved product and dose before spraying.',
          activeIngredient_en: 'Mancozeb / Tebuconazole-class fungicides (same classes as Tikka leaf spot; dose suppressed — outcome data found, not a label rate)',
          safetyCaution_en:
            'Avoid spraying during peak midday heat or strong wind. Wear mask and gloves during spray preparation and application. Follow the pre-harvest interval stated on the approved product label; verify with your local agriculture extension office.',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. The 16%-vs-5% demonstration figure describes a result, not a dose — do not treat it as a spray rate. Confirm the current approved product and dose with your local agriculture extension office.',
        },
      ],
      escalationThreshold_en:
        'If rust pustules spread to the upper canopy leaves or combine with heavy Tikka leaf spot defoliation before pod-filling, contact your local agriculture extension office promptly.',
      sources: [
        {
          title: 'Groundnut foliar disease demonstration trial (rust severity, farmer practice vs. fungicide-treated plots), Nellore district, Andhra Pradesh, India, 2024',
          organization: 'ICRISAT (International Crops Research Institute for the Semi-Arid Tropics) — open access repository',
          reviewDate: '2024-01-01',
          url: 'https://oar.icrisat.org/411/1/58373.pdf',
          geographicScope: 'ap_specific',
        },
        {
          title: 'Changing Scenario of Groundnut Diseases (multi-state field survey including Andhra Pradesh, Karnataka, Tamil Nadu)',
          organization: 'ICRISAT — open access repository',
          reviewDate: '1999-01-01',
          url: 'https://oar.icrisat.org/2236',
          geographicScope: 'other_state',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-chilli-thrips': {
      id: 'disease-chilli-thrips',
      cropId: 'crop-chilli',
      name_en: 'Chilli Thrips / Murda Complex',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Thrips parvispinus (and other thrips species), part of the Murda sucking-pest complex',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Upward curling of young leaves with silvery or bronze streaking and scarring along the undersides, concentrated near growing tips.',
        'Stunted, bushy, deformed new growth ("Murda"/malformation) with shortened internodes.',
        'Flower and young fruit drop under heavy infestation.',
      ],
      affectedParts: ['Young Leaves', 'Growing Tips', 'Flowers', 'Young Fruit'],
      similarConditions: [
        {
          id: 'chilli-leafcurl-virus-lookalike',
          name_en: 'Chilli Leaf Curl Virus (Begomovirus / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Thrips/Murda damage shows visible silvery-bronze scarring streaks on leaf undersides and boat-shaped upward curling concentrated at growing tips; leaf curl virus causes thickened, crinkled, vein-cleared foliage without the silvery scarring, and spreads to older leaves as well.',
        },
        {
          id: 'chilli-nutrient-tipburn',
          name_en: 'Boron/Calcium Deficiency Tip Distortion (Abiotic Nutrient Stress)',
          isPathological: false,
          differentiatingFactors_en:
            'Nutrient-deficiency tip distortion causes brittle, thickened growing points without any silvery scarring or visible insects, and does not improve after an insecticide application; thrips damage shows the characteristic scarring and visible tiny insects when tapping affected shoots over white paper.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather with low humidity, favoring rapid thrips population buildup.',
        'Continuous chilli cultivation near other thrips-host crops (onion, cotton) without a break crop.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Install blue sticky traps (reported more attractive to thrips than yellow traps) at canopy level, in addition to yellow traps for whitefly, for early monitoring.',
          targetTiming: 'Transplanting onward',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid excess nitrogen fertilizer, which produces soft, succulent growth that is more attractive to thrips.',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-chilli-thrips-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Krishna district (Andhra Pradesh, India) IPM field study reported thrips/Murda incidence falling from 16.0% to 9.5% under an integrated management approach (combining practices such as traps, border crops, and timed sprays), and a January 2023 NBAIR survey independently documented this thrips species across Telangana and Andhra Pradesh fields. Neither source available to this tool specified the exact spray product or dose used to achieve that reduction. Neem-based (Azadirachtin) sprays are a commonly used organic option against thrips, but a specific dose is suppressed pending primary CIBRC/university label verification. Consult your local agriculture extension office for the current recommended product and dose.',
          activeIngredient_en: 'Neem-based Azadirachtin sprays (dose suppressed); IPM-combination outcome documented (16.0%→9.5%) without a named product/dose',
          safetyCaution_en:
            'Spray during early morning or late evening when thrips are most active on exposed surfaces. Wear mask and gloves. Rotate insecticide classes if synthetic options are later confirmed, to slow resistance development (thrips build resistance quickly).',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. The cited 16.0%→9.5% field outcome and the NBAIR survey both confirm thrips/Murda as a real, documented Andhra Pradesh-region problem, but neither names an actionable spray product or dose. Confirm the current approved product and dose with your local agriculture extension office.',
        },
      ],
      escalationThreshold_en:
        'If new-growth distortion ("Murda") spreads to more than 20% of plants, or flower/fruit drop becomes heavy, consult your local agriculture extension office.',
      sources: [
        {
          title: 'IPM field study on chilli thrips/Murda complex, Krishna district, Andhra Pradesh (incidence 16.0% → 9.5% under integrated management)',
          organization: 'Published in The Pharma Innovation Journal (phytojournal.com)',
          reviewDate: '2019-01-01',
          url: 'https://www.phytojournal.com/archives/2019/vol8issue4/PartAY/8-4-584-112.pdf',
          geographicScope: 'ap_specific',
        },
        {
          title: 'Chilli thrips (Thrips parvispinus) outbreak survey, Telangana and Andhra Pradesh, January 2023',
          organization: 'ICAR - National Bureau of Agricultural Insect Resources (NBAIR), Bengaluru',
          reviewDate: '2023-01-01',
          url: 'https://www.nbair.res.in/sites/default/files/2023-02/Chilli%20thrips%20survey%20report%20-%20Jan%202023.pdf',
          geographicScope: 'ap_specific',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-cotton-whitefly': {
      id: 'disease-cotton-whitefly',
      cropId: 'crop-cotton',
      name_en: 'Cotton Whitefly',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest / Virus Vector: Bemisia tabaci',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Clouds of small white adult insects flying up when the plant canopy is disturbed; nymphs visible as tiny flat scales on leaf undersides.',
        'Sticky honeydew excretion on leaves leading to black sooty mould growth, reducing photosynthesis.',
        'Yellowing, premature leaf drop, and, where whitefly acts as a virus vector, associated leaf curl symptoms on cotton and neighboring susceptible crops.',
      ],
      affectedParts: ['Leaves (undersides)', 'Whole Canopy', 'Squares/Bolls (indirectly, via sooty mould and virus transmission)'],
      similarConditions: [
        {
          id: 'cotton-jassid-hopperburn',
          name_en: 'Jassid / Leafhopper "Hopperburn" (Amrasca biguttula / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Jassid damage produces a reddish-yellow triangular "hopperburn" discoloration starting at leaf margins and tips, without visible flying white insects; whitefly produces no leaf-margin discoloration pattern but is directly visible as clouds of tiny white insects when the canopy is disturbed, along with sticky honeydew and sooty mould.',
        },
        {
          id: 'cotton-clcuv-virus',
          name_en: 'Cotton Leaf Curl Virus (CLCuV / Pathogen, whitefly-transmitted)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf curl virus symptoms (upward curling, vein thickening, leaf-like enations on the underside) are the downstream viral disease that whitefly can transmit; whitefly itself is the vector/pest being observed directly (flying insects, honeydew, sooty mould) and can be present without visible leaf curl symptoms yet showing.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather, especially August-September, favoring rapid whitefly population buildup — matching a 2023-24 Nandyal/Kurnool (Andhra Pradesh, India) district survey finding.',
        'Overuse of broad-spectrum synthetic pyrethroids, which can trigger whitefly population flare-ups by killing natural predators.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Monitor regularly: a 2023-24 ANGRAU survey in Nandyal/Kurnool (Andhra Pradesh, India) recorded whitefly counts crossing the economic threshold level (ETL) at 6.66 whitefly per 3 leaves in August — begin close monitoring from July onward in similar districts.',
          targetTiming: 'July onward (pre-ETL monitoring)',
        },
        {
          stepNumber: 2,
          practice_en: 'Install yellow sticky traps (12-15 per acre) at canopy level for early detection and mass trapping.',
          targetTiming: 'Squaring stage onward',
        },
      ],
      treatments: [
        {
          id: 't-cotton-whitefly-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'The same 2023-24 Nandyal/Kurnool (Andhra Pradesh, India) survey that documented whitefly crossing ETL, and a CICR (Central Institute for Cotton Research) advisory describing whitefly as a vector of multiple viral diseases with 15-30% yield loss potential, both establish whitefly as a serious, Andhra Pradesh-confirmed threat — but neither source available to this tool named a specific insecticide product or dose for this crop/pest combination. Diafenthiuron and Pyriproxyfen-class insecticides are commonly discussed for whitefly management once ETL is crossed, but a specific dose is suppressed pending primary CIBRC label verification. Consult your local agriculture extension office for the current approved product and dose.',
          activeIngredient_en: 'Diafenthiuron / Pyriproxyfen-class insecticides (dose suppressed — Andhra Pradesh-confirmed ETL-crossing threat, no named product/dose in sources)',
          safetyCaution_en:
            'Spray only after confirming ETL is crossed (avoid prophylactic spraying, which accelerates resistance). Avoid repeated use of the same insecticide class consecutively. Wear mask and gloves; follow the pre-harvest interval on the approved label.',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. Spray strictly based on ETL monitoring (6.66 whitefly/3 leaves was the Andhra Pradesh survey\'s crossing point, but confirm the currently applicable ETL for your area with your local agriculture extension office, as it can vary by season and advisory). Actionable product and dose are suppressed pending primary CIBRC label verification.',
        },
      ],
      escalationThreshold_en:
        'If whitefly counts exceed the locally confirmed ETL (the Andhra Pradesh survey observed crossing at 6.66/3 leaves) or sooty mould coverage becomes heavy, contact your local agriculture extension office for area-wide management advice.',
      sources: [
        {
          title: 'Whitefly and pink bollworm incidence survey, Nandyal/Kurnool districts, Andhra Pradesh, India, 2023-24 (6.66 whitefly/3 leaves at Dornipadu mandal in August, crossing ETL)',
          organization: 'South Asian Journal of Applied Sciences (sasapjas.org)',
          reviewDate: '2024-01-01',
          url: 'https://sasapjas.org/?p=5691',
          geographicScope: 'ap_specific',
        },
        {
          title: 'Whitefly Management Advisory (vector of multiple viral diseases, 500+ host plant species, 15-30% yield loss)',
          organization: 'ICAR - Central Institute for Cotton Research (CICR), Nagpur',
          reviewDate: '2024-01-01',
          url: 'https://cicr.icar.gov.in/wp-content/uploads/PA_24_Whitefly.pdf',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-turmeric-leafspot': {
      id: 'disease-turmeric-leafspot',
      cropId: 'crop-turmeric',
      name_en: 'Turmeric Leaf Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Colletotrichum capsici',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, oval to irregular dark brown spots with a yellow halo, scattered across the leaf blade (distinct from the many small rectangular spots of leaf blotch, and from the collar/rhizome rot that affects this same crop).',
        'Spots may enlarge and coalesce under heavy infection, giving leaves a blighted, scorched appearance.',
        'Premature drying of affected leaves from the margins inward; rhizomes themselves remain unaffected (this disease is foliar only).',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'turmeric-leaf-blotch-lookalike',
          name_en: 'Leaf Blotch (Taphrina maculans / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf blotch (a separate, already-catalogued disease on this crop) produces hundreds of small, numerous rectangular or oval reddish-yellow spots densely covering the leaf; this leaf spot (Colletotrichum capsici) produces comparatively fewer, larger, more irregular dark-brown lesions with a distinct yellow halo.',
        },
        {
          id: 'turmeric-sunscorch',
          name_en: 'Sun-scorch / Heat Stress Leaf Scald (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Sun-scorch produces irregular bleached, papery-white to tan patches concentrated on the sun-exposed upper canopy, with no distinct dark lesion margin or yellow halo; leaf spot produces discrete dark brown spots with a clear yellow halo distributed across the canopy regardless of sun exposure.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather during the southwest monsoon growth period, similar to conditions favoring other turmeric foliar diseases on this crop.',
        'Dense, poorly ventilated canopy from close spacing.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing to improve canopy air circulation and reduce leaf-wetness duration.',
          targetTiming: 'Sowing/Planting',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily infected leaves promptly to reduce spore spread within the field.',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-turmeric-leafspot-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'No Andhra Pradesh-specific survey or trial data for this particular leaf spot (Colletotrichum capsici, as distinct from the leaf blotch and rhizome rot already catalogued for this crop) was found during this research pass — this entry is sourced only to general ANGRAU/ICAR-IISR turmeric plant-protection guidance, in the same manner as the original catalog baseline. Bio-agent Trichoderma-based foliar sprays and neem-based options are commonly discussed for turmeric foliar diseases generally, but a specific dose is suppressed pending primary CIBRC/university label verification specific to this disease. Consult your local agriculture extension office or Horticulture Officer for current guidance.',
          activeIngredient_en: 'Trichoderma-based foliar spray / Neem-based options (dose suppressed; no Andhra Pradesh-specific source found for this particular disease)',
          safetyCaution_en:
            'Eco-friendly biocontrol option; avoid mixing with synthetic chemical fungicides. Wear basic gloves during preparation.',
          regulatoryNotice_en:
            'Both the bio-agent dose and any chemical fungicide recommendation for this specific leaf spot are suppressed pending primary CIBRC/university registration verification — this is a weaker evidence base than most other entries in this catalog (no disease-specific Andhra Pradesh survey was found), so treat all guidance here as general good practice, not a confirmed protocol. Consult your local agriculture extension office or Horticulture Officer.',
        },
      ],
      escalationThreshold_en: 'Consult your local Horticulture Officer if leaf spot coverage exceeds roughly 20% of canopy leaf area or spots begin coalescing rapidly.',
      sources: [
        {
          title: 'Turmeric Production and Plant Protection Guidelines (general foliar disease management)',
          organization: 'ANGRAU & ICAR - Indian Institute of Spices Research (IISR)',
          reviewDate: '2024-07-30',
          url: 'https://spices.res.in',
        },
        {
          title: 'Vyavasaya Panchangam — Spices & Turmeric Crop Guide',
          organization: 'ANGRAU, Guntur, Andhra Pradesh',
          reviewDate: '2025-06-01',
          url: 'https://angrau.ac.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-13',
    },

    'disease-maize-turcicumblight': {
      id: 'disease-maize-turcicumblight',
      cropId: 'crop-maize',
      name_en: 'Turcicum Leaf Blight',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Exserohilum turcicum',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Long, elliptical, cigar-shaped (boat-shaped) grayish-green to tan lesions on leaves, typically starting on lower leaves first.',
        'Lesions enlarge and run parallel to leaf veins, often coalescing to blight large sections of the leaf.',
        'Severe infection from knee-high stage onward can cause substantial premature leaf death, reducing grain fill.',
      ],
      affectedParts: ['Leaves (lower first, progressing upward)'],
      similarConditions: [
        {
          id: 'maize-southern-leaf-blight',
          name_en: 'Maydis / Southern Leaf Blight (Bipolaris maydis / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Southern leaf blight (Maydis) produces smaller, more rectangular tan lesions bounded by leaf veins, often with a reddish-brown border; Turcicum leaf blight produces larger, elongated cigar/boat-shaped lesions that are not strictly rectangular.',
        },
        {
          id: 'maize-moisture-stress-leaftip',
          name_en: 'Moisture-Stress Leaf Firing (Abiotic)',
          isPathological: false,
          differentiatingFactors_en:
            'Moisture-stress leaf firing starts at the leaf tip and margins and moves inward in a V-shaped pattern, affecting mostly upper/exposed leaves uniformly across the field regardless of plant age; Turcicum lesions appear as discrete elongated patches anywhere along the leaf blade, starting on lower leaves first.',
        },
      ],
      environmentalRiskFactors_en: [
        'Moderate temperatures (18-27°C) with high humidity and heavy dew, especially from the knee-high growth stage onward.',
        'Continuous maize monocropping without rotation in the same field.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Practice crop rotation with non-cereal crops and remove/plough in crop residue after harvest, since the fungus survives on infected debris.',
          targetTiming: 'Post-harvest / pre-season',
        },
        {
          stepNumber: 2,
          practice_en: 'Where available, choose locally recommended tolerant/resistant maize hybrids for your district.',
          targetTiming: 'Pre-sowing variety selection',
        },
      ],
      treatments: [
        {
          id: 't-maize-turcicum-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'ICAR - Indian Institute of Maize Research (IIMR) publishes a spray schedule for this disease naming Mancozeb 75% WP @ 2.5-3 g/litre at 7-10 day intervals starting from the knee-high growth stage. This is a cleaner, single-institution figure than some other entries in this catalog, but per this catalog\'s house standard, no chemical dose is ever shown as unconditionally actionable here — even a clean ICAR-IIMR institutional figure has not been independently cross-checked by this tool against a current CIBRC product label, and label-approved rates can be revised over time. Treat the 2.5-3 g/litre figure as a starting reference point only, and confirm the current approved product, concentration, and spray interval for your district with your local agriculture extension office before mixing or spraying anything.',
          activeIngredient_en: 'Mancozeb 75% WP @ 2.5-3 g/L, 7-10 day intervals from knee-high stage (ICAR-IIMR institutional figure — treat as a reference point, not an unconditional instruction; confirm with your local agriculture extension office)',
          safetyCaution_en:
            'Wear protective mask and gloves during mixing and spraying. Avoid spraying during strong wind or peak midday heat. Follow the pre-harvest interval stated on the currently approved product container label; verify with your local agriculture extension office before relying on the 2.5-3 g/L figure above.',
          regulatoryNotice_en:
            'Statutory Warning: Read the currently approved product label before use. The Mancozeb figure above comes from an ICAR-IIMR institutional source, which is stronger sourcing than a secondary/blog source, but it is still not independently cross-checked here against a current CIBRC registration label, and this catalog never presents any chemical dose as unconditionally actionable regardless of source strength. Confirm the current approved product and dose with your local agriculture extension office before use.',
        },
      ],
      escalationThreshold_en:
        'If lesions spread above the ear leaf before tasseling, or overall leaf blighting exceeds 25-30% of total leaf area, contact your local agriculture extension office promptly, as grain fill can be significantly affected.',
      claimEvidence: [
        {
          claimId: 't-maize-turcicum-chem-1-dose',
          fieldRef: "treatments['t-maize-turcicum-chem-1'].instruction_en/_te",
          verificationStatus: 'provisional',
          sourceIndexes: [0],
          locator: 'aicrpmaize.icar.gov.in/?p=1163 — ICAR-IIMR Turcicum leaf blight management page (Mancozeb spray schedule)',
          limitation_en:
            'This is a real institutional (ICAR-IIMR) figure, not a secondary/blog estimate — a stronger starting point than several other suppressed doses in this catalog. It is marked provisional rather than verified because this tool could not independently cross-check it against a current CIBRC product registration/label, and the page was reached via a research subagent\'s fetch/search rather than a direct page-and-section read by this session. Confirm with your local agriculture extension office before relying on it.',
        },
      ],
      sources: [
        {
          title: 'Turcicum Leaf Blight management guidance for Maize (Mancozeb spray schedule)',
          organization: 'ICAR - Indian Institute of Maize Research (IIMR)',
          reviewDate: '2024-01-01',
          url: 'https://aicrpmaize.icar.gov.in/?p=1163',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },
    'disease-brinjal-shootfruitborer': {
      id: 'disease-brinjal-shootfruitborer',
      cropId: 'crop-brinjal',
      name_en: 'Shoot and Fruit Borer',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Leucinodes orbonalis (brinjal shoot and fruit borer)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Young shoots wilt and droop ("dead heart") with a small bore hole and larval frass (excreta) visible at the entry point.',
        'In fruits, a small bore hole plugged with frass is visible on the surface; the fruit shows little external rot but is hollowed and tunneled inside by the larva.',
        'Infested fruits are unmarketable even though the outer skin often still looks mostly healthy.',
      ],
      affectedParts: ['Shoots', 'Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-borer',
          name_en: 'Wet Fruit Rot (Rhizopus/Choanephora)',
          isPathological: true,
          differentiatingFactors_en:
            'Borer damage always has a plugged bore hole with frass and a dry tunnel inside; wet rot has no bore hole, instead a soft, watery, foul-smelling rot that spreads rapidly across the fruit surface.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather allows multiple, overlapping pest generations through the season.',
        'Continuous brinjal cultivation on the same land without rotation builds up the local pest population.',
        'Leaving infested shoots and fruits on the plant lets larvae complete their lifecycle and re-infest.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Hand-pick and destroy (bury or burn) wilted shoots and infested/bored fruits every week throughout the season — this single practice is the most widely recommended, lowest-cost control for this pest.',
          targetTiming: 'Weekly, throughout the season',
        },
        {
          stepNumber: 2,
          practice_en:
            'Install pheromone traps (Leucinodes orbonalis-specific lure) at roughly 8-10 traps per acre for monitoring and mass trapping of male moths.',
          targetTiming: 'From transplanting onward',
        },
        {
          stepNumber: 3,
          practice_en:
            'Avoid ratooning (cutting back and regrowing) a heavily infested crop, since surviving larvae inside old stems carry the infestation into the new flush.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-sfb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem seed kernel extract (NSKE) or neem oil sprays are commonly used against early-instar larvae before they bore in, but a specific concentration/dose is not confirmed against a primary label from this session — confirm the rate with your local agriculture extension office before spraying.',
          activeIngredient_en: 'Azadirachtin (organic, dose unverified)',
          safetyCaution_en: 'Once a larva has bored into a shoot or fruit, no spray can reach it — hand-picking is the only way to remove it at that stage.',
        },
        {
          id: 't-brinjal-sfb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Insecticides such as Flubendiamide, Spinosad, or Emamectin benzoate are commonly registered against Lepidopteran shoot/fruit borers in brinjal, but a specific dose for this pest/crop combination is suppressed here — this session could not confirm a current CIBRC-registered figure, and brinjal fruit is harvested frequently (every few days), so a wrong waiting period is a real risk. Do not spray from memory.',
          activeIngredient_en: 'Flubendiamide / Spinosad / Emamectin benzoate (organic/chemical dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your product container label before spraying — brinjal is often picked every 3-5 days, so a product with a long waiting period may force skipping a harvest round.',
        },
      ],
      escalationThreshold_en:
        'If more than about 10% of shoots or fruits show borer damage despite regular hand-picking and trapping, or pheromone trap catches stay high week over week, consult your local agriculture extension office for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Brinjal Pest Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-brinjal-phomopsisblight': {
      id: 'disease-brinjal-phomopsisblight',
      cropId: 'crop-brinjal',
      name_en: 'Phomopsis Blight & Fruit Rot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phomopsis vexans',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Small circular brown spots with greyish centers on leaves, which can enlarge and merge, causing leaf drop.',
        'A girdling blight near the soil line can kill young seedlings (damping-off) in the nursery.',
        'On fruits: sunken, water-soaked spots that enlarge and turn pale brown-grey, often showing tiny black dots (fungal fruiting bodies) arranged in rings; the fruit eventually shrivels and rots.',
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-phomopsis',
          name_en: 'Wet Fruit Rot (Rhizopus/Choanephora)',
          isPathological: true,
          differentiatingFactors_en:
            'Phomopsis fruit rot shows small black dots (pycnidia) arranged in concentric rings on a firm, pale lesion; wet rot is a soft, rapidly-spreading, watery rot with no ring pattern and a stronger foul smell.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather (around 25-30°C) with frequent rain or overhead irrigation spreads spores via splash.',
        'Infected seed or nursery seedlings carry the fungus into a new planting.',
        'Continuous brinjal cultivation on the same field without rotation allows the fungus to build up in crop residue.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use disease-free seed or seedlings from a trusted nursery, and treat seed with a biological agent (Trichoderma-based) before sowing where available.',
          targetTiming: 'Pre-sowing / pre-transplanting',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy infected leaves, fallen fruit, and crop debris at the end of the season rather than leaving them in the field.',
          targetTiming: 'Throughout season and post-harvest',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-solanaceous crop (not tomato, chilli, or potato) for 2-3 years where field layout allows.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-phomopsis-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride applied to soil/root zone is a commonly documented biological approach against soil-borne Phomopsis inoculum, but a specific application rate is not confirmed from a primary source in this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Trichoderma viride (organic, dose unverified)',
        },
        {
          id: 't-brinjal-phomopsis-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb or Carbendazim foliar sprays are widely documented for Phomopsis blight management, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Mancozeb / Carbendazim (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given brinjal\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If fruit rot affects more than about 10-15% of the standing crop, or seedling damping-off appears in the nursery, consult your local agriculture extension office promptly.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Brinjal Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-brinjal-wetrot': {
      id: 'disease-brinjal-wetrot',
      cropId: 'crop-brinjal',
      name_en: 'Wet Fruit Rot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungi: Rhizopus spp. / Choanephora spp. (secondary fruit-rot fungi, often entering through wounds)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'A soft, watery rot that spreads rapidly across the fruit, often starting where the fruit touches wet soil or has an injury (including an old borer hole).',
        'The fruit becomes mushy with a distinct foul smell; whitish or grey fungal growth can appear on the surface in advanced stages.',
        'Spreads quickly to touching fruits in storage or dense foliage.',
      ],
      affectedParts: ['Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-phomopsis-2',
          name_en: 'Phomopsis Blight & Fruit Rot',
          isPathological: true,
          differentiatingFactors_en:
            'Wet rot is soft, watery, and spreads fast with a strong foul smell and no ring pattern; Phomopsis rot is firmer, paler, and shows tiny black dots in concentric rings.',
        },
      ],
      environmentalRiskFactors_en: [
        'High humidity and waterlogging around the fruiting zone.',
        'Fruit resting directly on wet soil.',
        'Mechanical injury or insect damage (including Shoot and Fruit Borer entry holes) that gives the fungus an entry wound.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Stake plants or use mulch so fruits do not rest directly on wet soil.',
        },
        {
          stepNumber: 2,
          practice_en: 'Harvest fruit promptly at maturity and avoid bruising or injuring fruit during picking and handling.',
        },
        {
          stepNumber: 3,
          practice_en: 'Control the Shoot and Fruit Borer, since its bore holes are a common entry wound for this rot.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-wetrot-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'This rot is largely a wound-and-moisture problem rather than a primary infection, so prevention (drainage, staking, prompt harvest, borer control) matters more than any spray. A copper-based fungicide (e.g. copper oxychloride) is sometimes used as a general field sanitation spray, but a specific dose is not confirmed from a primary source here — confirm with your local agriculture extension office if you choose to spray.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
        },
      ],
      escalationThreshold_en:
        'If rot spreads rapidly through the field or causes more than about 15% fruit loss despite drainage and sanitation steps, consult your local agriculture extension office.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Brinjal Post-Harvest and Fruit Rot Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-brinjal-fruitcracking': {
      id: 'disease-brinjal-fruitcracking',
      cropId: 'crop-brinjal',
      name_en: 'Fruit Cracking (Physiological)',
      conditionCategory: 'physiological_disorder',
      pathogenOrVector_en: 'Non-pathogenic: irregular soil moisture and/or calcium/boron nutrition during rapid fruit growth',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Irregular cracks or splits on the fruit skin, often radiating outward from near the stalk/calyx end.',
        'Cracks may heal over with a corky, hardened edge, or stay open and invite secondary soft rot.',
        'No bore hole, frass, or fungal ring pattern is present — the crack itself is a clean split in the skin.',
      ],
      affectedParts: ['Fruits'],
      similarConditions: [
        {
          id: 'brinjal-cracking-vs-phomopsis',
          name_en: 'Phomopsis Blight & Fruit Rot',
          isPathological: true,
          differentiatingFactors_en:
            'Cracking is a clean skin split with no rot, discoloration ring, or fungal dots unless a crack later gets secondarily infected; Phomopsis rot is a sunken, discolored lesion with pycnidia from the start.',
        },
      ],
      environmentalRiskFactors_en: [
        'A long dry spell followed by heavy irrigation or sudden rain, causing the fruit to swell faster than its skin can stretch.',
        'Inconsistent irrigation scheduling in general.',
        'Calcium or boron deficiency in the soil, and some cultivars are more prone than others.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain even, consistent soil moisture through regular irrigation — avoid long dry spells followed by heavy watering.',
          targetTiming: 'Throughout fruiting period',
        },
        {
          stepNumber: 2,
          practice_en: 'Mulch around the base of plants to conserve soil moisture and reduce swings between wet and dry.',
        },
        {
          stepNumber: 3,
          practice_en: 'If cracking persists despite consistent irrigation, have your soil tested for calcium and boron levels through your local agriculture extension office.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-cracking-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'This is a physiological disorder, not a disease or pest — there is no pesticide or fungicide for fruit cracking. Consistent irrigation scheduling and mulching are the primary corrective measures; a soil-test-guided calcium or boron correction may help if a nutrient deficiency is confirmed.',
          activeIngredient_en: 'None (agronomic correction only)',
        },
      ],
      escalationThreshold_en:
        'If a large share of fruit (roughly 20% or more) keeps cracking despite consistent irrigation and mulching, ask your local agriculture extension office about a soil nutrient test for calcium and boron.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Brinjal Fruit Quality and Physiological Disorders',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-okra-leafcurlvirus': {
      id: 'disease-okra-leafcurlvirus',
      cropId: 'crop-okra',
      name_en: 'Yellow Vein Mosaic / Leaf Curl Virus',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Virus: Bhendi Yellow Vein Mosaic Virus (BYVMV, a Begomovirus), transmitted by the whitefly Bemisia tabaci',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Veins on young leaves turn yellow first, forming a clear yellow network pattern while the tissue between veins stays green (vein-clearing/netting).',
        'As it progresses, the whole leaf may turn yellow, thicken, and curl upward; plants become visibly stunted with shortened internodes.',
        'Pods from infected plants are often small, pale, hard, and distorted ("stony"/hairy pods), with sharply reduced marketable yield; early infection (within 3-4 weeks of sowing) causes the worst loss.',
      ],
      affectedParts: ['Leaves', 'Veins', 'Pods', 'Whole Plant'],
      similarConditions: [
        {
          id: 'okra-leafcurl-vs-downymildew',
          name_en: 'Downy Mildew',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf curl virus shows a clear yellow vein network with upward leaf curling and no fungal growth; downy mildew shows angular yellow patches bound by veins with greyish-white fuzzy fungal growth visible on the leaf underside, especially in early morning, and does not curl the leaf upward.',
        },
      ],
      environmentalRiskFactors_en: [
        'High whitefly (Bemisia tabaci) population, especially in warm, dry weather following rain — the vector, not the virus itself, is what a farmer can actually target.',
        'Nearby infected okra, cotton, or other whitefly-host crops/weeds acting as a virus reservoir.',
        'Late or staggered sowing that keeps young, highly susceptible plants available to whiteflies over a longer period.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Grow a locally recommended yellow-vein-mosaic-tolerant/resistant okra variety where available — this is the single most effective and lowest-cost control, since the virus itself cannot be cured once a plant is infected.',
          targetTiming: 'At variety selection, before sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Rogue out (uproot and remove) infected plants as soon as symptoms appear, especially within the first month, to reduce the local virus source for whiteflies to pick up and spread further.',
          targetTiming: 'Throughout the first 4-6 weeks after sowing',
        },
        {
          stepNumber: 3,
          practice_en: 'Install yellow sticky traps to monitor and reduce whitefly numbers, and avoid planting okra next to or right after cotton or other whitefly-prone crops.',
        },
      ],
      treatments: [
        {
          id: 't-okra-yvmv-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem oil or neem seed kernel extract sprays are commonly used to discourage whitefly feeding and egg-laying (the vector, not the virus), but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Neem oil / NSKE (organic, dose unverified)',
          safetyCaution_en: 'No spray, organic or chemical, cures a plant already infected with the virus — treatment targets only the whitefly vector to protect still-healthy plants.',
        },
        {
          id: 't-okra-yvmv-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Diafenthiuron, Thiamethoxam, or Flonicamid are commonly used against whitefly vectors in okra, but a specific dose for this crop is suppressed here — this session could not confirm a current CIBRC-registered figure, and okra is harvested every 2-3 days, so a wrong waiting period is a real risk. Do not spray from memory.',
          activeIngredient_en: 'Diafenthiuron / Thiamethoxam / Flonicamid (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given okra\'s frequent 2-3 day harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If more than about 20-25% of plants show symptoms, or symptoms appear widely within the first month after sowing, consult your local agriculture extension office promptly about resistant varieties for the next planting and an area-wide whitefly management plan.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Okra Virus Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-okra-downymildew': {
      id: 'disease-okra-downymildew',
      cropId: 'crop-okra',
      name_en: 'Downy Mildew',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Oomycete pathogen (downy mildew group, Peronosporales) — the exact species for okra is not confirmed from a primary source this session',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Pale yellow, angular patches on the upper leaf surface, bounded by the leaf veins (a checkerboard-like pattern).',
        'A greyish-white to faintly purplish, fuzzy (downy) fungal growth appears on the corresponding underside of the leaf, most visible in early morning while dew is still present.',
        'Severely affected leaves turn brown, dry up, and drop early, starting from the lower/older leaves.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-downymildew-vs-cercospora',
          name_en: 'Cercospora Leaf Spot',
          isPathological: true,
          differentiatingFactors_en:
            'Downy mildew lesions are angular and vein-bound with fuzzy downy growth visible on the leaf underside; Cercospora spots are more rounded with a distinct reddish-brown margin and a dry, grainy texture, with no fuzzy growth.',
        },
      ],
      environmentalRiskFactors_en: [
        'Cool nights with heavy dew or morning fog followed by warm days — classic downy-mildew-favoring weather.',
        'Dense planting and poor air circulation that keeps leaf surfaces wet longer.',
        'Overhead irrigation late in the day, which keeps foliage wet overnight.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid overhead irrigation in the late afternoon/evening; water early in the day so foliage can dry before nightfall.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Maintain recommended plant spacing and avoid excessive nitrogen, both of which improve air movement through the canopy and reduce leaf wetness duration.',
        },
        {
          stepNumber: 3,
          practice_en: 'Remove and destroy heavily infected lower leaves and field debris at the end of the season rather than leaving them to carry the pathogen over.',
        },
      ],
      treatments: [
        {
          id: 't-okra-dm-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A dilute buttermilk/sour-milk spray or Trichoderma-based foliar application is sometimes used as a general phyllosphere management step against downy-mildew-type pathogens, but no specific product or rate is confirmed for okra from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Buttermilk spray / Trichoderma (organic, dose unverified)',
        },
        {
          id: 't-okra-dm-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper-based fungicides (e.g. copper oxychloride) or Metalaxyl-Mancozeb combinations are commonly used against downy mildew in vegetable crops generally, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Copper oxychloride / Metalaxyl-Mancozeb (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given okra\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows downy mildew symptoms despite irrigation and spacing adjustments, consult your local agriculture extension office for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Okra Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-okra-alternarialeafspot': {
      id: 'disease-okra-alternarialeafspot',
      cropId: 'crop-okra',
      name_en: 'Alternaria Leaf Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Alternaria spp. (e.g. Alternaria alternata / A. hibisci)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Circular to irregular brown spots, often with visible concentric rings ("target" or "bullseye" pattern), surrounded by a yellow halo.',
        'Spots are typically larger (up to 1-2 cm) than other okra leaf spots and start on the older, lower leaves first.',
        'In severe cases, spots merge, causing large areas of leaf blight and premature leaf drop, which can also affect pod quality indirectly through reduced plant vigor.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-alternaria-vs-cercospora',
          name_en: 'Cercospora Leaf Spot',
          isPathological: true,
          differentiatingFactors_en:
            'Alternaria spots are larger, show clear concentric target-like rings, and have a broad yellow halo; Cercospora spots are smaller, more angular/irregular in shape without concentric rings, and have a narrower reddish-brown margin.',
        },
        {
          id: 'okra-alternaria-vs-phyllosticta',
          name_en: 'Phyllosticta Leaf Spot',
          isPathological: true,
          differentiatingFactors_en:
            'Alternaria spots are larger with a target-ring pattern; Phyllosticta spots are small (pinhead to 5mm), with a grayish-white center and a sharp dark-brown margin, often with tiny black dots (pycnidia) visible in the center under close inspection.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm temperatures (around 25-30°C) combined with high humidity, rain, or heavy dew.',
        'Plant stress from nutrient deficiency or water stress, which makes foliage more susceptible.',
        'Infected crop debris left in the field between seasons, and continuous okra cultivation without rotation.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain balanced nutrition (avoid both nitrogen excess and deficiency) and consistent irrigation to reduce plant stress.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy severely spotted lower leaves and field debris at the end of the season.',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-Malvaceous crop (not cotton or other okra-family crops) for at least one season where field layout allows.',
        },
      ],
      treatments: [
        {
          id: 't-okra-alt-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride or Pseudomonas fluorescens-based foliar sprays are commonly documented general-purpose biologicals against leaf-spot fungi, but a specific rate for this disease/crop is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (organic, dose unverified)',
        },
        {
          id: 't-okra-alt-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb or Chlorothalonil foliar sprays are widely documented for Alternaria leaf spot management in vegetable crops, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Mancozeb / Chlorothalonil (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given okra\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows spotting or blighting despite nutrition and sanitation steps, consult your local agriculture extension office for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Okra Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-okra-cercosporaleafspot': {
      id: 'disease-okra-cercosporaleafspot',
      cropId: 'crop-okra',
      name_en: 'Cercospora Leaf Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Cercospora spp. (e.g. Cercospora abelmoschi / C. malayensis)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small to medium, roughly circular to angular grayish-brown spots on both leaf surfaces, often bound by the leaf veins.',
        'Spots have a distinct reddish-brown to purplish margin and a dry, slightly grainy-looking center, without the concentric rings seen in Alternaria spot.',
        'Heavily spotted leaves yellow and drop prematurely, reducing plant vigor and pod set over time.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-cercospora-vs-alternaria',
          name_en: 'Alternaria Leaf Spot',
          isPathological: true,
          differentiatingFactors_en:
            'Cercospora spots are smaller and angular with a narrow reddish-brown margin and no rings; Alternaria spots are larger, rounder, and show visible concentric target-like rings with a broad yellow halo.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather with frequent rain or dew, similar to other okra leaf-spot fungi.',
        'Dense canopy with poor air circulation.',
        'Infected crop debris carried over between seasons on the same field.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing for good air circulation, and avoid overhead irrigation late in the day.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily spotted leaves and field debris at the end of the season.',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-Malvaceous crop for at least one season where field layout allows.',
        },
      ],
      treatments: [
        {
          id: 't-okra-cls-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride or Pseudomonas fluorescens-based foliar sprays are commonly documented general-purpose biologicals against leaf-spot fungi, but a specific rate for this disease/crop is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (organic, dose unverified)',
        },
        {
          id: 't-okra-cls-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb-based foliar sprays are widely documented for Cercospora leaf spot management in vegetable crops, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Mancozeb (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given okra\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows spotting despite spacing and sanitation steps, consult your local agriculture extension office for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Okra Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-okra-phyllostictaleafspot': {
      id: 'disease-okra-phyllostictaleafspot',
      cropId: 'crop-okra',
      name_en: 'Phyllosticta Leaf Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phyllosticta spp.',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small (pinhead to about 5mm) circular spots with a pale grayish-white center and a sharply defined dark brown margin.',
        'Under close inspection, tiny black dots (pycnidia, the fungus\'s fruiting bodies) are often visible scattered within the pale center of older spots.',
        'Usually causes scattered, relatively mild leaf spotting rather than the large blighted patches seen with Alternaria or heavy Cercospora infection.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-phyllosticta-vs-alternaria',
          name_en: 'Alternaria Leaf Spot',
          isPathological: true,
          differentiatingFactors_en:
            'Phyllosticta spots are small, pale-centered with tiny visible black pycnidia and a sharp dark margin; Alternaria spots are larger, with visible concentric target-rings and a broad yellow halo, and no pycnidia.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid conditions with frequent rain or heavy dew, similar to other okra leaf-spot fungi.',
        'Older, more mature leaves tend to show lesions first.',
        'Infected crop debris carried over between seasons on the same field.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing for good air circulation and avoid overhead irrigation late in the day.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily spotted older leaves and field debris at the end of the season.',
        },
      ],
      treatments: [
        {
          id: 't-okra-pls-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Because this spot is usually mild and scattered, sanitation (removing affected leaves/debris) is often sufficient on its own; a Trichoderma viride or Pseudomonas fluorescens-based spray is sometimes added as a general preventive step, but a specific rate is not confirmed from a primary source this session — confirm with your local agriculture extension office if you choose to spray.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (optional, dose unverified)',
        },
        {
          id: 't-okra-pls-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A Mancozeb spray is sometimes used if spotting becomes widespread, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop, and spraying is rarely needed for this particular spot unless it is unusually severe. Do not spray from memory.',
          activeIngredient_en: 'Mancozeb (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given okra\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'This spot is usually mild; if it nonetheless spreads to more than about 20% of leaf area or appears alongside other leaf spots making field diagnosis difficult, consult your local agriculture extension office.',
      sources: [
        {
          title: 'Package of Practices for Vegetable Crops — Okra Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-citrus-greening': {
      id: 'disease-citrus-greening',
      cropId: 'crop-citrus',
      name_en: 'Citrus Greening (Huanglongbing / HLB)',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Bacterium: Candidatus Liberibacter asiaticus (most common form in Asia), transmitted by the Asian citrus psyllid, Diaphorina citri',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Blotchy, asymmetric yellow mottling on leaves — the pattern does NOT mirror across the midrib/leaf center, unlike most nutrient deficiencies.',
        'Yellowing often appears sector-by-sector on the tree (one or a few branches affected while others look normal), sometimes called "yellow shoot" symptoms.',
        'Fruit from infected branches are small, lopsided/asymmetric, stay partly green at the bottom even when ripe, taste bitter or salty, and often contain dark, aborted seeds; premature fruit drop and twig dieback follow over time.',
      ],
      affectedParts: ['Leaves', 'Shoots', 'Fruits', 'Whole Tree'],
      similarConditions: [
        {
          id: 'citrus-greening-vs-nutrient',
          name_en: 'Zinc / Manganese Deficiency',
          isPathological: false,
          differentiatingFactors_en:
            'Nutrient-deficiency mottling is usually symmetric on both sides of the leaf midrib and affects most leaves evenly across the tree; HLB mottling is blotchy and asymmetric (does not mirror across the midrib) and typically appears on only some branches/sectors of the tree while others stay green.',
        },
      ],
      environmentalRiskFactors_en: [
        'High Asian citrus psyllid (Diaphorina citri) populations nearby, especially on new flush growth where the psyllid prefers to feed and breed.',
        'Infected nursery plants or budwood brought in from an affected area.',
        'Neighboring infected trees or abandoned/untended citrus groves acting as a disease reservoir with no vector management.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Use only certified disease-free nursery plants and budwood from a known, inspected source — never propagate from an unknown or symptomatic tree. There is no cure once a tree is infected, so keeping the disease out is the only real control.',
          targetTiming: 'At planting / before bringing in new material',
        },
        {
          stepNumber: 2,
          practice_en:
            'Monitor new flush growth regularly for the Asian citrus psyllid and manage its population through the season — the vector, not the bacterium itself, is what can realistically be targeted in the field.',
          targetTiming: 'Throughout the year, especially during flush periods',
        },
        {
          stepNumber: 3,
          practice_en:
            'Rogue out (uproot and destroy) a confirmed HLB-positive tree promptly — a single infected tree is a continuing source of infection for the whole grove through the psyllid vector.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-hlb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'There is no organic or chemical cure for a tree already infected with HLB. Neem-oil-based sprays are sometimes used to suppress Asian citrus psyllid populations on healthy trees nearby, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Neem oil (organic, vector suppression only, dose unverified)',
          safetyCaution_en: 'No spray reverses HLB infection inside an already-affected tree — every treatment here only protects neighboring healthy trees by targeting the psyllid vector.',
        },
        {
          id: 't-citrus-hlb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Imidacloprid or Thiamethoxam are commonly used in area-wide Asian citrus psyllid management programs, but a specific dose for this crop/region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and report any suspected HLB-positive tree to your local agriculture extension office or Horticulture Officer, since this is treated as a serious quarantine-relevant disease.',
          activeIngredient_en: 'Imidacloprid / Thiamethoxam (vector control, dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office or Horticulture Officer and check your container label before spraying. Area-wide, coordinated vector control across neighboring groves is far more effective than one farmer spraying alone.',
        },
      ],
      escalationThreshold_en:
        'Report any tree with suspected HLB symptoms (asymmetric blotchy mottle, lopsided bitter fruit) to your local agriculture extension office or Horticulture Officer promptly, even before you are fully sure — this disease is incurable per-tree and spreads through the grove via the psyllid vector, so early reporting and removal of confirmed cases matters far more than waiting to confirm severity.',
      sources: [
        {
          title: 'Package of Practices for Fruit Crops — Citrus Greening (HLB) Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-citrus-canker': {
      id: 'disease-citrus-canker',
      cropId: 'crop-citrus',
      name_en: 'Citrus Canker',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas citri subsp. citri',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Raised, corky, crater-like ("volcano-shaped") lesions on leaves, twigs, and fruit, each typically surrounded by a yellow, water-soaked-looking halo (ring) — most visible on young, actively growing tissue.',
        'Lesions often cluster along leaf margins and areas prone to wind/thorn injury, where the bacteria enter through wounds or natural openings.',
        'Severe infection causes leaf and fruit drop, twig dieback, and heavily blemished fruit that is rejected for the fresh market even when the inner fruit is unaffected.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-canker-vs-scab',
          name_en: 'Citrus Scab',
          isPathological: true,
          differentiatingFactors_en:
            'Canker lesions are flatter craters with a distinct yellow water-soaked halo around each spot; scab lesions are more pointed, wart-like, corky outgrowths without that yellow halo, mainly on very young flush tissue.',
        },
        {
          id: 'citrus-canker-vs-melanose',
          name_en: 'Melanose',
          isPathological: true,
          differentiatingFactors_en:
            'Canker lesions are larger, crater-like, with a yellow halo and often cause leaf/fruit drop; melanose lesions are small, raised, sandpaper-textured brown pustules without a yellow halo, sometimes forming tear-streak patterns on fruit.',
        },
      ],
      environmentalRiskFactors_en: [
        'Wind-driven rain, which spreads the bacteria over distance and forces it into leaf stomata and wounds — canker typically spreads fastest after storms.',
        'Any leaf/fruit injury: thorn scratches, leaf-miner tunnels, hail damage, or pruning wounds, all of which give the bacterium an easy entry point.',
        'Working in a grove or handling tools/equipment while foliage is wet, which can spread bacteria-laden moisture between trees.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant windbreaks around the grove to reduce wind-driven rain and leaf injury, which are the main way this bacterium spreads and enters new tissue.',
          targetTiming: 'At grove establishment, or retrofit with fast-growing hedges',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid working in the grove or pruning while foliage is wet, and disinfect pruning tools between trees to avoid spreading bacteria mechanically.',
        },
        {
          stepNumber: 3,
          practice_en: 'Prune and destroy severely infected twigs and control leaf-miner insects, since their tunnels are a common entry wound for this bacterium.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-canker-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Copper-based sprays (e.g. copper oxychloride, copper hydroxide) are the standard field approach against citrus canker and are accepted in both organic and conventional programs, but a specific concentration/schedule for this region is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Copper oxychloride / Copper hydroxide (dose unverified)',
          safetyCaution_en: 'Copper sprays protect new growth from fresh infection but do not cure tissue already bearing canker lesions — sanitation (removing infected twigs) is still needed alongside spraying.',
        },
        {
          id: 't-citrus-canker-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Streptocycline (a streptomycin-based bactericide) combined with copper spray is sometimes used against severe bacterial outbreaks in citrus, but a specific dose for this crop/region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Streptocycline + Copper oxychloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying. Citrus canker is treated as a quarantine-relevant disease in several states — report a serious outbreak to your Horticulture Officer.',
        },
      ],
      escalationThreshold_en:
        'If canker affects more than about 15-20% of leaf/fruit surface across the grove despite windbreaks and sanitation, or spreads rapidly after a storm, consult your local agriculture extension office or Horticulture Officer for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Fruit Crops — Citrus Canker Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-citrus-blackspot': {
      id: 'disease-citrus-blackspot',
      cropId: 'crop-citrus',
      name_en: 'Citrus Black Spot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phyllosticta citricarpa (sexual stage: Guignardia citricarpa)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        '"Hard spot" on mature fruit: small, circular lesions with a grey-brown necrotic center and a dark margin, often with tiny black dots (pycnidia) visible in the center.',
        '"Virulent/false melanose spot" on still-green fruit: irregular, spreading dark lesions that can cover a larger area of the rind.',
        'Mainly a cosmetic/fruit-quality disease — causes little leaf damage, but spotted fruit are downgraded or rejected for the fresh market even though the inner fruit is usually unaffected.',
      ],
      affectedParts: ['Fruits', 'Leaves (less commonly)'],
      similarConditions: [
        {
          id: 'citrus-blackspot-vs-melanose',
          name_en: 'Melanose',
          isPathological: true,
          differentiatingFactors_en:
            'Black spot lesions are flat to slightly sunken with a distinct dark margin and visible black pycnidial dots in a grey center; melanose lesions are raised, sandpaper-textured brown pustules, often in tear-streak patterns from rain runoff, without the sunken grey-centered look.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, wet weather during fruit development, which favors spore release and infection.',
        'Fallen leaves and fruit left on the orchard floor, where the fungus overwinters and produces the next season\'s spores.',
        'Dense canopy with poor air circulation, which keeps fruit and leaf surfaces wet longer.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Collect and remove fallen leaves and fruit from the orchard floor regularly, since this is the fungus\'s main overwintering source.',
          targetTiming: 'Throughout season, especially post-harvest',
        },
        {
          stepNumber: 2,
          practice_en: 'Prune to open up the canopy for better air circulation and light penetration, reducing how long fruit surfaces stay wet.',
        },
        {
          stepNumber: 3,
          practice_en: 'Time protective fungicide sprays to petal fall and early fruit development where the disease is known to be active in your area — ask your local agriculture extension office for the current local spray calendar.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-cbs-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Orchard sanitation (removing fallen leaves/fruit) is the single most effective organic-compatible control, since it removes the fungus\'s main inoculum source; a copper-based spray is sometimes added, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
        },
        {
          id: 't-citrus-cbs-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Strobilurin fungicides (e.g. Azoxystrobin) are commonly used against citrus black spot internationally, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Azoxystrobin (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If more than about 10-15% of fruit show spotting despite sanitation, or the orchard supplies a market with strict cosmetic/export grading, consult your local agriculture extension office or Horticulture Officer for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Fruit Crops — Citrus Black Spot Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-citrus-melanose': {
      id: 'disease-citrus-melanose',
      cropId: 'crop-citrus',
      name_en: 'Melanose',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Diaporthe citri (asexual stage: Phomopsis citri)',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, raised, corky brown pustules with a rough, "sandpaper"-like texture on leaves, twigs, and fruit rind — usually more a cosmetic issue than a threat to tree health.',
        'On fruit, rain-splashed spores running down the surface can leave a distinctive "tear-streak" or "mudcake" pattern of raised brown specks.',
        'Severe infection on young twigs can occasionally cause dieback, since the fungus lives and multiplies mainly on dead wood.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-melanose-vs-scab',
          name_en: 'Citrus Scab',
          isPathological: true,
          differentiatingFactors_en:
            'Melanose pustules are flatter, sandpaper-textured, and appear on tissue of any age near dead wood; scab lesions are more pointed, wart-like, corky outgrowths mainly on very young flush tissue, often distorting the leaf.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dead twigs and wood left in the canopy, which is where this fungus mainly lives and produces spores.',
        'Frequent rain or overhead irrigation, which splashes spores from dead wood onto new growth and fruit.',
        'Young, actively growing flush tissue is more susceptible than older, hardened growth.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Prune out and remove dead twigs and deadwood from the canopy regularly — this is the single most effective control, since it removes the fungus\'s main source of spores.',
          targetTiming: 'Annually, especially after any storm/hail damage',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid overhead irrigation that splashes water from deadwood areas onto new growth and fruit.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-mel-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Since melanose mainly lives on dead wood, pruning out deadwood is usually sufficient on its own and is the organic-compatible first step; a copper-based spray at early fruit set is sometimes added in nurseries/young plantings, but a specific rate is not confirmed from a primary source this session — confirm with your local agriculture extension office if you choose to spray.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
        },
        {
          id: 't-citrus-mel-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A copper-based fungicide or Mancozeb spray at early fruit set is sometimes used where melanose has caused significant fruit blemishing in previous seasons, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Copper oxychloride / Mancozeb (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'Melanose is usually a cosmetic issue; if it nonetheless causes dieback on multiple young twigs or heavy fruit blemishing despite deadwood pruning, consult your local agriculture extension office.',
      sources: [
        {
          title: 'Package of Practices for Fruit Crops — Citrus Melanose Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-citrus-scab': {
      id: 'disease-citrus-scab',
      cropId: 'crop-citrus',
      name_en: 'Citrus Scab',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Elsinoe fawcettii (sour orange scab) / Elsinoe australis (sweet orange scab)',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Wart-like, raised, irregular corky scabby outgrowths on young leaves, twigs, and fruit, often pointed or conical rather than flat.',
        'Mainly affects very young, actively growing (flush) tissue; heavily affected young leaves can become twisted or distorted as they expand around the lesions.',
        'Mostly a cosmetic/fruit-grading issue on fruit rind; rarely threatens overall tree health.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-scab-vs-canker',
          name_en: 'Citrus Canker',
          isPathological: true,
          differentiatingFactors_en:
            'Scab lesions are pointed, wart-like outgrowths without a yellow water-soaked halo, mainly on very young flush tissue; canker lesions are flatter craters with a distinct yellow halo and can appear on tissue of various ages, often causing more leaf/fruit drop.',
        },
      ],
      environmentalRiskFactors_en: [
        'Frequent rain or overhead irrigation during new flush growth, which spreads spores onto susceptible young tissue.',
        'Dense canopy with poor air circulation that keeps young growth wet longer.',
        'Certain citrus varieties (e.g. some lemon and mandarin types) are more susceptible than others.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid overhead irrigation during periods of new flush growth; water at the base of the tree instead where feasible.',
          targetTiming: 'During each new flush period',
        },
        {
          stepNumber: 2,
          practice_en: 'Prune to open up the canopy for better air circulation, reducing how long young growth stays wet.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-scab-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A copper-based spray timed to new flush emergence is a commonly documented organic-compatible approach, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Copper oxychloride (organic, dose unverified)',
        },
        {
          id: 't-citrus-scab-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper-based fungicides remain the standard chemical option for citrus scab where sanitation/irrigation changes are not enough, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Copper oxychloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'Scab is usually a minor cosmetic issue; if it nonetheless distorts a large share of new flush leaves or affects more than about 15% of fruit despite irrigation changes, consult your local agriculture extension office.',
      sources: [
        {
          title: 'Package of Practices for Fruit Crops — Citrus Scab Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-rice-bph': {
      id: 'disease-rice-bph',
      cropId: 'crop-rice',
      name_en: 'Brown Planthopper (Hopperburn)',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Nilaparvata lugens (brown planthopper), also a vector for Rice Grassy Stunt and Ragged Stunt viruses',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Circular patches of plants turning orange-brown and drying up ("hopperburn"), typically starting at a low-lying spot or where planting is dense, then expanding outward day by day.',
        'Parting the base of tillers in or near a hopperburn patch reveals clusters of brown, wedge-shaped adult and nymph insects feeding at the stem base just above the waterline.',
        'Sticky honeydew excreted by the insects coats the lower stems and water surface, often with a black sooty mould growing on it — a useful early sign before plants actually start drying.',
      ],
      affectedParts: ['Stem Base', 'Tillers', 'Whole Plant'],
      similarConditions: [
        {
          id: 'rice-bph-vs-drought',
          name_en: 'Drought / Water Stress',
          isPathological: false,
          differentiatingFactors_en:
            'Hopperburn starts as a circular patch at one spot (often a low area or dense planting) and expands outward with live insects visible at the stem base when parted; drought stress tends to affect the crop more uniformly according to elevation/soil type across the field, with no insects present and no honeydew/sooty mould.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense planting, excessive nitrogen use, and continuous flooding, all of which create the warm, humid, shaded microclimate at the stem base that BPH prefers.',
        'Indiscriminate early-season insecticide spraying that kills the natural predators (spiders, mirid bugs) that normally keep BPH populations in check — a well-documented cause of later BPH outbreaks ("resurgence").',
        'Continuous rice cropping with little varietal diversity, and warm, cloudy, humid weather in general.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive nitrogen and dense planting; alternate wetting and drying (draining the field periodically) rather than continuous flooding discourages BPH buildup at the stem base.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid routine, calendar-based insecticide spraying early in the season — this is a well-documented way outbreaks get worse, since it removes the natural predators that keep BPH in check. Scout fields regularly instead and act only when hopper numbers justify it.',
        },
        {
          stepNumber: 3,
          practice_en: 'Where available, grow a locally recommended BPH-resistant/tolerant variety, especially in fields with a history of repeated outbreaks.',
        },
      ],
      treatments: [
        {
          id: 't-rice-bph-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Conserving natural enemies (spiders, mirid bugs, dragonflies) by avoiding unnecessary early sprays is the single most effective non-chemical lever against BPH; a neem-based spray is sometimes used at low hopper densities, but a specific concentration is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Neem-based spray (organic, dose unverified)',
          safetyCaution_en: 'Once hopperburn patches appear, affected tillers rarely recover — treatment at this stage targets stopping the patch from spreading, not reviving plants already dried up.',
        },
        {
          id: 't-rice-bph-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Selective insecticides such as Pymetrozine, Flonicamid, or Buprofezin are commonly recommended for BPH specifically because they spare natural enemies better than broad-spectrum products, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and avoid broad-spectrum insecticides (e.g. synthetic pyrethroids) early in the season, since they are documented to trigger BPH resurgence by killing its natural predators.',
          activeIngredient_en: 'Pymetrozine / Flonicamid / Buprofezin (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Direct the spray to the stem base/basal zone where BPH actually feeds, not just the leaf canopy.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If you find more than roughly 5-10 hoppers per tiller at the stem base, or any hopperburn patch has already appeared and is expanding, consult your local agriculture extension office immediately — BPH populations can destroy a field within days once they reach outbreak levels.',
      sources: [
        {
          title: 'Package of Practices for Cereal Crops — Rice Brown Planthopper Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-rice-leaffolder': {
      id: 'disease-rice-leaffolder',
      cropId: 'crop-rice',
      name_en: 'Rice Leaf Folder',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Cnaphalocrocis medinalis (rice leaf folder)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Leaf blades folded or rolled longitudinally and webbed shut with fine silk threads, forming a tube-like shelter the caterpillar feeds inside.',
        'Unfolding an affected leaf reveals long, white to transparent parallel streaks where the caterpillar has scraped away the green tissue from inside, leaving the leaf\'s outer skin intact.',
        'A small green caterpillar with a brown head is usually found inside the folded leaf; severely affected fields show a scorched, whitish appearance from a distance.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'rice-leaffolder-vs-blb',
          name_en: 'Bacterial Leaf Blight',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf folder damage is confined to the area inside a webbed, folded leaf, with parallel white scraping streaks and a caterpillar usually present inside; bacterial leaf blight shows continuous water-soaked yellow-to-straw stripes starting from the leaf tip/margin on an unfolded, open leaf, with milky bacterial ooze from a cut lesion and no webbing or caterpillar.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense, shaded canopy with high humidity, especially with excessive nitrogen application promoting lush, succulent leaf growth that the moth prefers for egg-laying.',
        'Continuous cropping without a break, which lets the pest build up generation after generation.',
        'Warm, cloudy, humid weather favors moth activity and egg survival.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive nitrogen application, which produces the lush, succulent foliage the moth prefers for egg-laying; apply nitrogen in split doses as recommended rather than all at once.',
          targetTiming: 'Throughout the season, at each nitrogen application',
        },
        {
          stepNumber: 2,
          practice_en: 'Conserve natural enemies (parasitic wasps, spiders) by avoiding unnecessary insecticide sprays early in the season — leaf folder damage rarely justifies spraying on its own unless folding is severe near the flowering stage.',
        },
      ],
      treatments: [
        {
          id: 't-rice-lf-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A sprayable Bacillus thuringiensis (Bt) formulation is commonly used against leaf folder caterpillars as a selective, natural-enemy-sparing option, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Bacillus thuringiensis (Bt) (organic, dose unverified)',
          safetyCaution_en: 'Rice plants tolerate a fair amount of leaf folding without real yield loss, since the flag leaf (the one just below the panicle) matters most — base the decision to spray on how many leaves are damaged, not on the presence of a few folded leaves alone.',
        },
        {
          id: 't-rice-lf-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Chlorantraniliprole or Cartap hydrochloride are commonly recommended against rice leaf folder when damage is severe, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and reserve spraying for cases where new, unfolded leaf damage is heavy near flowering, since leaf folder rarely threatens yield on its own at low levels.',
          activeIngredient_en: 'Chlorantraniliprole / Cartap hydrochloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If more than roughly 10-15% of leaves (especially new, unfolded leaves near the flag-leaf stage) show fresh folding/scraping damage, consult your local agriculture extension office about whether spraying is actually justified at your field\'s growth stage.',
      sources: [
        {
          title: 'Package of Practices for Cereal Crops — Rice Leaf Folder Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-rice-falsesmut': {
      id: 'disease-rice-falsesmut',
      cropId: 'crop-rice',
      name_en: 'False Smut',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Ustilaginoidea virens',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Individual grains within the panicle (ear head) are replaced by large velvety spore balls, much bigger than a normal rice grain, ranging from yellow-orange when young to olive-green or black as they mature.',
        'Spore balls burst through and enlarge beyond the husk, becoming clearly visible after flowering, usually scattered among otherwise normal-looking grains on the same panicle rather than affecting every grain.',
        'Affected grains are a direct yield loss and a grain-quality/marketability problem; mature spore balls also carry a mild toxin, so affected grain is generally not recommended for food or feed use.',
      ],
      affectedParts: ['Panicle', 'Grain'],
      similarConditions: [
        {
          id: 'rice-falsesmut-vs-blast',
          name_en: 'Rice Blast (Neck Blast)',
          isPathological: true,
          differentiatingFactors_en:
            'False smut replaces individual grains with large, round spore balls while the rest of the panicle and neck look normal; neck blast instead causes the neck/panicle base to rot and snap, so the whole panicle above the break turns white/empty (chaffy) rather than showing enlarged spore balls on individual grains.',
        },
      ],
      environmentalRiskFactors_en: [
        'High humidity, intermittent rain, and cloudy weather during the flowering/grain-fill stage, which favors spore germination and infection.',
        'Excessive nitrogen application, especially late top-dressing close to flowering, which is strongly associated with worse false smut outbreaks.',
        'Dense planting and continuous rice cropping on the same land, which lets spores carried in soil/straw build up over seasons.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive or late nitrogen application, especially heavy top-dressing close to the flowering stage, since this is strongly linked to worse false smut outbreaks.',
          targetTiming: 'At top-dressing, especially near panicle initiation/flowering',
        },
        {
          stepNumber: 2,
          practice_en: 'Use certified, disease-free seed where available, and avoid dense planting that keeps humidity high within the canopy during flowering.',
        },
        {
          stepNumber: 3,
          practice_en: 'Collect and destroy severely affected panicles/spore balls at harvest rather than leaving them to shed spores back onto the field for the next season.',
        },
      ],
      treatments: [
        {
          id: 't-rice-fs-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Pseudomonas fluorescens or Trichoderma-based seed/soil treatment is sometimes used as a general preventive step against false smut, but a specific rate is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Pseudomonas fluorescens / Trichoderma spp. (organic, dose unverified)',
          safetyCaution_en: 'Once spore balls have formed on the panicle, no spray reverses the damage to those grains — all treatment here is preventive, aimed at the next flowering/grain-fill window, not a cure for grain already affected.',
        },
        {
          id: 't-rice-fs-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A Propiconazole or Copper oxychloride spray timed around the booting/pre-flowering stage is commonly used against false smut in fields with a history of outbreaks, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory; timing (before the panicle emerges, not after spore balls appear) is critical for this disease.',
          activeIngredient_en: 'Propiconazole / Copper oxychloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying, since correct timing before panicle emergence matters as much as the product choice.',
        },
      ],
      escalationThreshold_en:
        'If false smut balls appear on more than about 5-10% of panicles, or your field has a history of repeated outbreaks, consult your local agriculture extension office before the next season\'s flowering stage to plan preventive nitrogen management and timely spraying.',
      sources: [
        {
          title: 'Package of Practices for Cereal Crops — Rice False Smut Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-cotton-jassids': {
      id: 'disease-cotton-jassids',
      cropId: 'crop-cotton',
      name_en: 'Cotton Jassids (Leafhoppers)',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Amrasca biguttula biguttula (cotton jassid/leafhopper)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Leaf margins turn yellow and curl downward (cupping) early on, usually noticed first on the lower/older leaves.',
        'As feeding continues, the yellowing progresses to a reddish-bronze discoloration spreading inward from the margins — a symptom pattern often called "hopperburn" or "reddening" on cotton.',
        'Severely affected leaves become brittle, curl down further, turn brick-red/bronze, and dry up; the plant shows stunted growth and reduced boll formation. Turning a leaf over usually reveals small, pale green, wedge-shaped insects that move sideways or diagonally when disturbed — a distinctive behavior for this pest.',
      ],
      affectedParts: ['Leaves', 'Whole Plant'],
      similarConditions: [
        {
          id: 'cotton-jassids-vs-potassium',
          name_en: 'Potassium Deficiency',
          isPathological: false,
          differentiatingFactors_en:
            'Jassid damage starts with downward leaf-margin curling (cupping) and yellowing before reddening, with small pale-green, sideways-moving insects visible on the leaf underside; potassium deficiency shows a more generalized interveinal/marginal yellowing-to-bronzing across the plant without the early downward cupping and without any insects present.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather with intermittent rain, and a gap between rains which favors jassid population buildup.',
        'Hairless or sparsely-haired (smooth-leaved) cotton varieties are generally more susceptible than hairy-leaved ones.',
        'Excessive nitrogen application, which promotes the lush, succulent growth jassids prefer.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Where available, grow a locally recommended hairy-leaved or jassid-tolerant variety, especially in fields with a history of repeated outbreaks.',
          targetTiming: 'At variety selection, before sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid excessive nitrogen application, and scout the undersides of leaves regularly from the seedling stage onward rather than waiting for visible reddening.',
        },
        {
          stepNumber: 3,
          practice_en: 'Conserve natural enemies (spiders, ladybird beetles) by avoiding unnecessary broad-spectrum sprays early in the season.',
        },
      ],
      treatments: [
        {
          id: 't-cotton-jassid-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem oil or Neem Seed Kernel Extract (NSKE) sprays are commonly used against jassids at early, low-density infestations, but a specific concentration is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Neem oil / NSKE (organic, dose unverified)',
          safetyCaution_en: 'Once leaves have already turned brittle and bronze-red, that damage does not reverse — treatment at that stage is about protecting the remaining healthy growth, not restoring damaged leaves.',
        },
        {
          id: 't-cotton-jassid-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Acetamiprid, Thiamethoxam, or Flonicamid are commonly recommended against cotton jassids, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Acetamiprid / Thiamethoxam / Flonicamid (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Spray coverage of the leaf underside matters, since that is where jassids actually feed.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If downward curling and yellowing/reddening spreads to more than about 2-3 leaves per plant across a large share of the field, or appears early in the season on young plants, consult your local agriculture extension office promptly.',
      sources: [
        {
          title: 'Package of Practices for Commercial Crops — Cotton Jassid Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-cotton-bacterialblight': {
      id: 'disease-cotton-bacterialblight',
      cropId: 'crop-cotton',
      name_en: 'Bacterial Blight (Angular Leaf Spot / Black Arm)',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas citri pv. malvacearum',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Small, water-soaked, angular lesions on leaves, bound by the leaf veins (giving an "angular" shape rather than round), which dry to dark brown or black as they age.',
        'On stems and branches, elongated black streaks or lesions can appear and, in severe cases, girdle the stem — a phase often called "black arm" — causing the branch or whole plant to wilt and break.',
        'On bolls, small round, water-soaked, sunken black spots appear that can enlarge and lead to boll rot, premature opening, and stained/damaged lint.',
      ],
      affectedParts: ['Leaves', 'Stems', 'Bolls'],
      similarConditions: [
        {
          id: 'cotton-bacterialblight-vs-fungalspot',
          name_en: 'Fungal Leaf Spot (e.g. Alternaria/Grey Mildew)',
          isPathological: true,
          differentiatingFactors_en:
            'Bacterial blight lesions are angular and bound tightly by leaf veins, often with stem streaking/girdling and boll spotting on the same plant; common fungal leaf spots on cotton are more rounded, not vein-bound, and typically do not girdle the stem or rot the boll in the same way.',
        },
      ],
      environmentalRiskFactors_en: [
        'Wind-driven rain, which spreads the bacteria over distance and forces it into leaf wounds/stomata — outbreaks typically worsen fastest after storms.',
        'Infected or uncertified seed, which can carry the bacterium directly into a new planting.',
        'Dense planting and continuous cotton cultivation on the same land without rotation, which lets bacteria carried in crop debris build up over seasons.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use certified, disease-free seed from a trusted source — seed-borne infection is one of the main ways this bacterium enters a new field.',
          targetTiming: 'At sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid working in the field or handling plants while foliage is wet, which can spread the bacteria mechanically between plants.',
        },
        {
          stepNumber: 3,
          practice_en: 'Remove and destroy crop debris after harvest rather than leaving it in the field, and rotate with a non-host crop for at least one season where field layout allows.',
        },
      ],
      treatments: [
        {
          id: 't-cotton-bb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A copper-based spray (e.g. copper oxychloride) is a commonly documented field approach against bacterial blight and is accepted in both organic and conventional programs, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Copper oxychloride (dose unverified)',
          safetyCaution_en: 'Copper sprays protect new growth from fresh infection but do not cure tissue already showing lesions — removing severely infected plant debris alongside spraying matters as much as the spray itself.',
        },
        {
          id: 't-cotton-bb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Streptocycline (a streptomycin-based bactericide) combined with copper spray is sometimes used against severe bacterial blight outbreaks in cotton, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Streptocycline + Copper oxychloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If stem streaking/girdling ("black arm") appears on multiple plants, or boll spotting affects more than about 10% of bolls, consult your local agriculture extension office promptly, since this disease can spread quickly after wind-driven rain.',
      sources: [
        {
          title: 'Package of Practices for Commercial Crops — Cotton Bacterial Blight Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-chilli-anthracnose': {
      id: 'disease-chilli-anthracnose',
      cropId: 'crop-chilli',
      name_en: 'Anthracnose / Fruit Rot',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Colletotrichum capsici (and related Colletotrichum species)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Sunken, circular to oval spots on ripening and ripe fruit, often with visible concentric rings within the lesion.',
        'As the spot matures, tiny orange-to-pink spore masses appear in the center, especially in humid weather — a distinguishing feature of this disease.',
        'Severely affected fruit shrivels, rots, and drops early; infection can also appear as dark lesions on stems and leaves, though fruit damage is the main economic concern.',
      ],
      affectedParts: ['Fruits', 'Stems', 'Leaves'],
      similarConditions: [
        {
          id: 'chilli-anthracnose-vs-leafcurl',
          name_en: 'Chilli Leaf Curl Virus',
          isPathological: true,
          differentiatingFactors_en:
            'Anthracnose primarily damages ripening fruit with sunken, concentric-ringed lesions and orange spore masses; leaf curl virus instead shows upward leaf curling, thickening, and vein clearing with little direct fruit lesion damage.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather with frequent rain during fruit ripening — the single biggest risk window for this disease.',
        'Infected seed or transplants carrying the fungus into a new planting.',
        'Continuous chilli cultivation on the same field without rotation, which lets the fungus build up in crop residue.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use certified, disease-free seed and treat seed with a biological agent (Trichoderma-based) before sowing where available.',
          targetTiming: 'Pre-sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Harvest fruit promptly at maturity and avoid leaving overripe fruit on the plant, since ripening fruit is most susceptible.',
        },
        {
          stepNumber: 3,
          practice_en: 'Remove and destroy infected fruit and crop debris rather than leaving them in the field, and rotate with a non-Solanaceous crop for 2-3 years where field layout allows.',
        },
      ],
      treatments: [
        {
          id: 't-chilli-anth-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Pseudomonas fluorescens or Trichoderma viride-based foliar sprays are commonly documented biologicals against anthracnose, but a specific rate is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Pseudomonas fluorescens / Trichoderma viride (organic, dose unverified)',
        },
        {
          id: 't-chilli-anth-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb or Carbendazim foliar sprays are widely documented for anthracnose/fruit rot management, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop, and chilli is harvested frequently, so a wrong waiting period is a real risk. Do not spray from memory.',
          activeIngredient_en: 'Mancozeb / Carbendazim (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying, given chilli\'s frequent harvest cycle.',
        },
      ],
      escalationThreshold_en:
        'If fruit rot affects more than about 10-15% of the standing crop despite sanitation and prompt harvest, consult your local agriculture extension office promptly.',
      sources: [
        {
          title: 'Package of Practices for Commercial Crops — Chilli Anthracnose/Fruit Rot Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-chilli-powderymildew': {
      id: 'disease-chilli-powderymildew',
      cropId: 'crop-chilli',
      name_en: 'Powdery Mildew',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Leveillula taurica',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Pale yellow, diffuse patches appear on the upper leaf surface, with a fine white to greyish powdery fungal growth visible on the corresponding leaf underside.',
        'Older, lower leaves are usually affected first, turning yellow, then brown, and dropping prematurely as the disease progresses.',
        'Unlike most powdery mildews that coat the upper leaf surface, this species grows mainly on the underside — the top of the leaf often just looks blotchy yellow until the leaf is turned over.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'chilli-powderymildew-vs-thrips',
          name_en: 'Chilli Thrips / Murda Complex',
          isPathological: true,
          differentiatingFactors_en:
            'Powdery mildew shows diffuse yellow patches on the upper leaf with white powdery fungal growth visible underneath when turned over, and no leaf curling; thrips/murda causes upward leaf curling with silvery-bronze scarring and stunted bushy new growth, with no powdery coating.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dry weather with moderate temperatures and low rainfall — unlike many fungal diseases, this one is favored by drier conditions rather than high humidity.',
        'Dense planting and a closed canopy with poor air circulation.',
        'Water-stressed or nutrient-stressed plants tend to show more severe symptoms.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain consistent irrigation to avoid water stress, and avoid overly dense planting so air can circulate through the canopy.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily affected lower leaves to reduce the spread of spores to healthy upper foliage.',
        },
      ],
      treatments: [
        {
          id: 't-chilli-pm-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A dilute wettable sulphur spray or neem oil is commonly used against powdery mildew in vegetable/spice crops generally, but a specific concentration is not confirmed from a primary source this session — confirm with your local agriculture extension office, and avoid spraying sulphur during very hot weather since it can scorch leaves.',
          activeIngredient_en: 'Wettable Sulphur / Neem oil (organic, dose unverified)',
        },
        {
          id: 't-chilli-pm-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic fungicides such as Hexaconazole or Myclobutanil are commonly used against powdery mildew when sulphur is not sufficient, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          activeIngredient_en: 'Hexaconazole / Myclobutanil (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If yellowing and leaf drop spreads to more than about 20% of the plant\'s foliage despite irrigation and sanitation steps, consult your local agriculture extension office for a tailored spray program.',
      sources: [
        {
          title: 'Package of Practices for Commercial Crops — Chilli Powdery Mildew Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-18',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-18',
    },
    'disease-groundnut-collarrot': {
      id: 'disease-groundnut-collarrot',
      cropId: 'crop-groundnut',
      name_en: 'Collar Rot (Seedling Blight)',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Aspergillus niger',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Young seedlings wilt and collapse within 2-3 weeks of sowing, often before or just after emergence.',
        'A girdling lesion forms at the collar region (stem base, right at the soil line); peeling back the soil there reveals a sooty black, powdery fungal growth coating the affected tissue — a distinctive sign for this disease.',
        'Affected seedlings pull out of the soil easily, with a rotted stem base and collar; in severe cases, seed may fail to germinate at all (pre-emergence rot), leaving visible gaps in the row.',
      ],
      affectedParts: ['Seedlings', 'Collar Region', 'Stem Base', 'Roots'],
      similarConditions: [
        {
          id: 'groundnut-collarrot-vs-termite',
          name_en: 'Termite Damage',
          isPathological: true,
          differentiatingFactors_en:
            'Collar rot shows a rotted, sooty-black fungal coating at the collar with the seedling pulling out mushy/decayed; termite damage instead shows the stem cleanly hollowed out or cut with soil particles and earthen tunnels/galleries stuck to the plant, and no black fungal growth.',
        },
      ],
      environmentalRiskFactors_en: [
        'High soil temperature combined with dry soil conditions at and after sowing — this fungus thrives in hot, dry topsoil, unlike most seedling-rot fungi that prefer wet conditions.',
        'Poor-quality, mechanically damaged, or cracked-seed-coat seed, which gives the fungus an easy entry point.',
        'Shallow sowing depth and sowing during an unusually hot, dry spell.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use bold, undamaged, high-quality seed from a trusted source, and avoid mechanically damaged or cracked-coat seed.',
          targetTiming: 'At seed selection, before sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Treat seed with Trichoderma viride or a recommended fungicide before sowing, and sow at the recommended depth with adequate soil moisture rather than into very hot, dry topsoil.',
          targetTiming: 'At sowing',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-cr-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride-based seed treatment is a commonly documented biological approach against collar rot, but a specific application rate is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Trichoderma viride (organic, dose unverified)',
          safetyCaution_en: 'Once a seedling has already collapsed, it cannot be saved — all treatment here is a pre-sowing seed/soil measure, aimed at the next sowing, not a cure for a seedling already wilting.',
        },
        {
          id: 't-groundnut-cr-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Thiram or Carbendazim seed treatment is commonly recommended against collar rot/seedling blight in groundnut, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not treat seed from memory.',
          activeIngredient_en: 'Thiram / Carbendazim (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask while treating seed, and wash hands thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product and dose with your local agriculture extension office and check your container label before treating seed.',
        },
      ],
      escalationThreshold_en:
        'If more than about 10-15% of seedlings show collar rot/wilting across the field within the first month, consult your local agriculture extension office before the next sowing to plan seed treatment and sowing-time adjustments.',
      sources: [
        {
          title: 'Package of Practices for Oilseed Crops — Groundnut Collar Rot Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-19',
    },
    'disease-groundnut-budnecrosis': {
      id: 'disease-groundnut-budnecrosis',
      cropId: 'crop-groundnut',
      name_en: 'Bud Necrosis Disease (PBNV)',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Virus: Peanut Bud Necrosis Virus (a Tospovirus), transmitted by thrips (e.g. Thrips palmi, Frankliniella schultzei)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'The central growing point (terminal bud) turns brown-black and dies — the symptom that gives this disease its name.',
        'Young leaves show chlorotic and necrotic ring spots or mottled patterns before the bud dies.',
        'With the main growing point dead, the plant loses apical dominance and develops a stunted, bushy cluster of side branches; affected plants set few or no pods, and any pods that do form are often small or malformed.',
      ],
      affectedParts: ['Terminal Bud', 'Growing Point', 'Leaves', 'Pods'],
      similarConditions: [
        {
          id: 'groundnut-budnecrosis-vs-suckingpest',
          name_en: 'General Sucking Pest Damage (Aphids/Jassids)',
          isPathological: true,
          differentiatingFactors_en:
            'Bud necrosis causes the entire terminal bud to die outright, with distinctive chlorotic/necrotic ring spots on nearby young leaves and a bushy proliferation of side branches afterward; ordinary sucking-pest damage causes generalized yellowing or curling of leaves without killing the whole growing point or producing the ring-spot pattern.',
        },
      ],
      environmentalRiskFactors_en: [
        'High thrips vector populations, typically building up in hot, dry weather following rain.',
        'Early-season infection (within the first 30-40 days) causes the most severe yield loss; later infection is comparatively less damaging.',
        'Nearby alternate host crops or weeds (e.g. tobacco, tomato, chilli can also carry Tospoviruses) acting as a virus reservoir for thrips to pick up and spread.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Sow as early as possible within the recommended window for your area — early sowing lets the crop pass its most vulnerable young stage before thrips populations peak.',
          targetTiming: 'At sowing, as early as the recommended window allows',
        },
        {
          stepNumber: 2,
          practice_en: 'Where available, grow a locally recommended bud-necrosis-tolerant variety, especially in fields/areas with a history of repeated outbreaks.',
        },
        {
          stepNumber: 3,
          practice_en: 'Rogue out and remove severely affected plants early in the season to reduce the local virus source for thrips to spread further, since there is no cure once a plant is infected.',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-bn-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem oil or Neem Seed Kernel Extract sprays are commonly used to discourage thrips feeding and egg-laying (the vector, not the virus itself), but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Neem oil / NSKE (organic, dose unverified)',
          safetyCaution_en: 'No spray, organic or chemical, cures a plant once its bud has already died — treatment targets only the thrips vector to protect still-healthy plants nearby.',
        },
        {
          id: 't-groundnut-bn-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Fipronil or Thiamethoxam seed treatment, followed by foliar sprays of Fipronil or Imidacloprid if thrips pressure remains high, are commonly recommended against the thrips vector, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not treat seed or spray from memory.',
          activeIngredient_en: 'Fipronil / Thiamethoxam / Imidacloprid (vector control, dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray/seed-treatment preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before treating seed or spraying.',
        },
      ],
      escalationThreshold_en:
        'If more than about 5-10% of plants show bud necrosis within the first 30-40 days after sowing, or thrips numbers on young leaves are high, consult your local agriculture extension office promptly about vector management and resistant varieties for the next season.',
      sources: [
        {
          title: 'Package of Practices for Oilseed Crops — Groundnut Bud Necrosis Disease Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-19',
    },
    'disease-maize-stemborer': {
      id: 'disease-maize-stemborer',
      cropId: 'crop-maize',
      name_en: 'Spotted Stem Borer',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Pest: Chilo partellus (Swinhoe)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Rows of small, neat pinhole perforations across young leaves as the newly hatched larva feeds while still on the leaf surface before boring in.',
        'Larvae bore into the central shoot/stem, producing a "deadheart" — the central whorl turns brown, dries up, and can be pulled out easily with a rotten smell, while outer leaves stay green.',
        'In older plants, visible round entry/exit holes on the stem with larval tunnels (galleries) inside when the stem is split open; weakened stems may lodge (fall over) in wind.',
      ],
      affectedParts: ['Whorl', 'Stem', 'Leaves'],
      similarConditions: [
        {
          id: 'maize-stemborer-vs-fallarmyworm',
          name_en: 'Fall Armyworm (Spodoptera frugiperda / Pest)',
          isPathological: true,
          differentiatingFactors_en:
            'Spotted Stem Borer bores deep into the stem itself, leaving neat round entry/exit holes and a dried, rotten-smelling deadheart when the whorl is pulled; Fall Armyworm stays concealed inside the whorl without boring into the stem, causing large ragged windowpane leaf tearing with heavy sawdust-like fecal frass but no deadheart or stem tunnels.',
        },
      ],
      environmentalRiskFactors_en: [
        'Continuous monocropping of maize without crop rotation, which lets larval populations build up season after season in crop residue.',
        'Warm, humid weather during the vegetative (whorl) stage favours egg-laying and larval survival.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Destroy or plough in crop residue (stubble) immediately after harvest to remove overwintering larvae/pupae before the next season.',
          targetTiming: 'Immediately after harvest',
        },
        {
          stepNumber: 2,
          practice_en:
            'Install pheromone traps @ 5/acre from the third week after sowing to monitor and trap adult moths before egg-laying peaks.',
          targetTiming: '3rd week after sowing',
        },
      ],
      treatments: [
        {
          id: 't-maize-sb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Release Trichogramma chilonis egg parasitoid cards @ 5 cards/acre at weekly intervals from the whorl stage, a commonly documented biological-control approach; a specific release schedule beyond this is not confirmed from a primary source this session.',
          activeIngredient_en: 'Trichogramma chilonis (egg parasitoid, biological control)',
          safetyCaution_en:
            'Once the central whorl has already dried into a deadheart, that plant cannot be saved — biological control here targets protecting still-healthy plants and the next generation of larvae, not reversing existing damage.',
        },
        {
          id: 't-maize-sb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Whorl application of Chlorantraniliprole or Cartap Hydrochloride granules is commonly recommended against stem borer once deadhearts appear, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not apply from memory.',
          activeIngredient_en: 'Chlorantraniliprole / Cartap Hydrochloride (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves while applying granules into the whorl, avoid inhaling dust, and wash hands thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product and dose with your local agriculture extension office and check your container label before application.',
        },
      ],
      escalationThreshold_en:
        'If more than 10% of plants show deadheart symptoms during the whorl stage, or visible stem tunnels/exit holes are found on a field scouting walk, consult your local agriculture extension office promptly about whorl-application timing.',
      sources: [
        {
          title: 'ICAR - Indian Institute of Maize Research (IIMR) Spotted Stem Borer Management Advisory',
          organization: 'ICAR - IIMR, Ludhiana',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
        {
          title: 'Package of Practices for Cereal Crops — Maize Stem Borer Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-19',
    },
    'disease-maize-blsb': {
      id: 'disease-maize-blsb',
      cropId: 'crop-maize',
      name_en: 'Banded Leaf and Sheath Blight',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Rhizoctonia solani f. sp. sasakii',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Irregular, water-soaked, grayish-brown lesions with a concentric banded (zonate) pattern appear first on the leaf sheath near the base, then spread upward onto leaves.',
        'Lesions coalesce into large necrotic patches that can girdle the leaf sheath and stalk, causing affected leaves to dry up starting from lower leaves upward.',
        'In severe cases, small brown-to-black sclerotia (resting bodies of the fungus) form on the sheath surface, and the weakened stalk/ear shank may rot and lodge (fall over) before harvest.',
      ],
      affectedParts: ['Leaf Sheath', 'Leaves', 'Stalk', 'Ear'],
      similarConditions: [
        {
          id: 'maize-blsb-vs-turcicumblight',
          name_en: 'Turcicum Leaf Blight (Exserohilum turcicum / Pathogen)',
          isPathological: true,
          differentiatingFactors_en:
            'Banded Leaf and Sheath Blight starts at the leaf sheath/stalk base with water-soaked, concentric zonate banding and can carry visible sclerotia; Turcicum Leaf Blight instead produces long, cigar-shaped, grayish-green to tan lesions scattered on the leaf blade itself, starting on lower leaves, without any banded sheath pattern or sclerotia.',
        },
      ],
      environmentalRiskFactors_en: [
        'High humidity combined with close plant spacing and dense canopy that restricts airflow, typical of the Kharif season.',
        'Continuous rice-maize or maize-maize cropping sequences, which let the soil-borne fungus (which also infects rice sheaths) build up in the field over seasons.',
        'Excessive nitrogen application leading to lush, dense vegetative growth that favours disease spread.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Avoid continuous rice-maize or maize-maize rotation in the same field where feasible; rotate with a non-host crop like pulses to break the soil-borne fungal cycle.',
          targetTiming: 'At crop planning, before sowing',
        },
        {
          stepNumber: 2,
          practice_en:
            'Avoid excessive nitrogen and maintain recommended plant spacing to keep the canopy open and reduce humidity build-up around the stalk base.',
          targetTiming: 'During crop growth / fertilizer scheduling',
        },
      ],
      treatments: [
        {
          id: 't-maize-blsb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Soil/seed application of Trichoderma viride-based bio-fungicide is a commonly documented biological approach against Rhizoctonia-complex sheath blights, but a specific application rate is not confirmed from a primary source this session — confirm with your local agriculture extension office.',
          activeIngredient_en: 'Trichoderma viride (organic, dose unverified)',
          safetyCaution_en:
            'Remove and destroy severely banded/rotted lower leaves and sheaths where feasible to reduce the local sclerotia source, rather than leaving infected residue in the field.',
        },
        {
          id: 't-maize-blsb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Foliar spray of Validamycin or Propiconazole directed at the lower stalk and sheath region is commonly recommended against banded leaf and sheath blight, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          activeIngredient_en: 'Validamycin / Propiconazole (dose suppressed)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, direct spray at the lower stalk/sheath region rather than broadcast overhead, and wash hands and equipment thoroughly afterwards.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your local agriculture extension office and check your container label before spraying.',
        },
      ],
      escalationThreshold_en:
        'If banded lesions are found on the lower stalk/sheath of more than 10-15% of plants, or any plant shows stalk rot/lodging risk, consult your local agriculture extension office promptly, especially before continuing a rice-maize rotation on the same field next season.',
      sources: [
        {
          title: 'ICAR - Indian Institute of Maize Research (IIMR) Banded Leaf and Sheath Blight Advisory',
          organization: 'ICAR - IIMR, Ludhiana',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
        {
          title: 'Package of Practices for Cereal Crops — Maize Banded Leaf and Sheath Blight Management',
          organization: 'ANGRAU (Acharya N.G. Ranga Agricultural University)',
          reviewDate: '2026-10-19',
          geographicScope: 'national',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-19',
    },
  },
};
