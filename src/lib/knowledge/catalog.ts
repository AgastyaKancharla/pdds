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
      name_te: 'వరి',
      scientificName: 'Oryza sativa L.',
      category: 'Cereal / Staple',
      apMajorDistricts: ['East Godavari', 'West Godavari', 'Krishna', 'Guntur', 'Nellore'],
      growingSeasons: ['Kharif (Sarva)', 'Rabi (Dalva)'],
      commonDiseaseIds: ['disease-rice-blast', 'disease-rice-sheathblight'],
    },
    'crop-chilli': {
      id: 'crop-chilli',
      name_en: 'Chilli',
      name_te: 'మిరప',
      scientificName: 'Capsicum annuum L.',
      category: 'Commercial / Spice',
      apMajorDistricts: ['Guntur', 'Prakasam', 'Kurnool', 'Palnadu'],
      growingSeasons: ['Kharif', 'Late Kharif'],
      commonDiseaseIds: ['disease-chilli-leaf-curl', 'disease-chilli-thrips'],
    },
    'crop-cotton': {
      id: 'crop-cotton',
      name_en: 'Cotton',
      name_te: 'ప్రత్తి',
      scientificName: 'Gossypium hirsutum L.',
      category: 'Commercial / Fibre',
      apMajorDistricts: ['Kurnool', 'Anantapur', 'Guntur', 'YSR Kadapa'],
      growingSeasons: ['Kharif'],
      commonDiseaseIds: ['disease-cotton-bollworm', 'disease-cotton-whitefly'],
    },
    'crop-groundnut': {
      id: 'crop-groundnut',
      name_en: 'Groundnut',
      name_te: 'వేరుశనగ',
      scientificName: 'Arachis hypogaea L.',
      category: 'Oilseed / Legume',
      apMajorDistricts: ['Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Chittoor'],
      growingSeasons: ['Kharif (Rainfed)', 'Rabi (Irrigated)'],
      commonDiseaseIds: ['disease-groundnut-tikka', 'disease-groundnut-rust'],
    },
    'crop-maize': {
      id: 'crop-maize',
      name_en: 'Maize',
      name_te: 'మొక్కజొన్న',
      scientificName: 'Zea mays L.',
      category: 'Cereal / Feed',
      apMajorDistricts: ['Guntur', 'West Godavari', 'Prakasam'],
      growingSeasons: ['Kharif', 'Rabi'],
      commonDiseaseIds: ['disease-maize-armyworm', 'disease-maize-turcicumblight'],
    },
    'crop-sugarcane': {
      id: 'crop-sugarcane',
      name_en: 'Sugarcane',
      name_te: 'చెరకు',
      scientificName: 'Saccharum officinarum L.',
      category: 'Commercial / Sugar',
      apMajorDistricts: ['Visakhapatnam', 'Anakapalli', 'East Godavari'],
      growingSeasons: ['Annual (Eksali / Adsali)'],
      commonDiseaseIds: ['disease-sugarcane-redrot'],
    },
    'crop-tomato': {
      id: 'crop-tomato',
      name_en: 'Tomato',
      name_te: 'టమాట',
      scientificName: 'Solanum lycopersicum L.',
      category: 'Vegetable / Solanaceous',
      apMajorDistricts: ['Chittoor', 'Annamayya', 'Kurnool'],
      growingSeasons: ['Kharif', 'Rabi', 'Summer'],
      commonDiseaseIds: ['disease-tomato-earlyblight'],
    },
    'crop-mango': {
      id: 'crop-mango',
      name_en: 'Mango',
      name_te: 'మామిడి',
      scientificName: 'Mangifera indica L.',
      category: 'Perennial Fruit Orchard',
      apMajorDistricts: ['Krishna', 'Chittoor', 'Vizianagaram'],
      growingSeasons: ['Flowering: Dec-Feb, Harvest: Apr-Jun'],
      commonDiseaseIds: ['disease-mango-anthracnose'],
    },
    'crop-banana': {
      id: 'crop-banana',
      name_en: 'Banana',
      name_te: 'అరటి',
      scientificName: 'Musa acuminata Colla',
      category: 'Horticultural Fruit',
      apMajorDistricts: ['YSR Kadapa', 'East Godavari', 'West Godavari'],
      growingSeasons: ['Year-round (Tissue culture)'],
      commonDiseaseIds: ['disease-banana-panamawilt'],
    },
    'crop-turmeric': {
      id: 'crop-turmeric',
      name_en: 'Turmeric',
      name_te: 'పసుపు',
      scientificName: 'Curcuma longa L.',
      category: 'Spice / Rhizome',
      apMajorDistricts: ['Guntur', 'Prakasam', 'YSR Kadapa'],
      growingSeasons: ['Kharif (June-July to Feb)'],
      commonDiseaseIds: ['disease-turmeric-rhizomerot', 'disease-turmeric-leafspot'],
    },
  },
  diseases: {
    'disease-rice-blast': {
      id: 'disease-rice-blast',
      cropId: 'crop-rice',
      name_en: 'Rice Blast',
      name_te: 'అగ్గి తెగులు',
      pathogenOrVector_en: 'Fungus: Magnaporthe oryzae (Pyricularia oryzae)',
      pathogenOrVector_te: 'శిలీంద్రం: మాగ్నాపోర్తే ఒరైజే (పైరికులారియా ఒరైజే)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Spindle-shaped (eye-shaped) lesions on leaf blades with pointed ends.',
        'Lesion center turns ash-gray or whitish; margins turn dark brown or reddish-brown.',
        'Neck rot causes blackening of panicle base, leading to empty or partially filled chaffy grains.',
      ],
      observableSymptoms_te: [
        'ఆకులపై నూలుకండ (కంటి ఆకారపు) మచ్చలు ఇరువైపులా మొనదేలి ఉంటాయి.',
        'మచ్చల మధ్యభాగం బూడిద రంగులో, అంచులు ముదురు గోధుమ లేదా ఎరుపు-గోధుమ రంగులో ఉంటాయి.',
        'మెడ విరుపు సోకినప్పుడు వెన్ను కింద నల్లబడి, గింజలు తాలుగా మారతాయి.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Panicle Neck', 'Nodes'],
      similarConditions: [
        {
          id: 'rice-brown-spot',
          name_en: 'Brown Spot (Bipolaris oryzae)',
          name_te: 'గోధుమ రంగు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Brown spot lesions are circular or oval with yellow halos; blast lesions are distinctly spindle-shaped with tapering pointed ends.',
          differentiatingFactors_te:
            'గోధుమ మచ్చలు గుండ్రంగా ఉండి చుట్టూ పసుపు వలయం ఉంటుంది; అగ్గి తెగులు మచ్చలు నూలుకండ ఆకారంలో మొనదేలి ఉంటాయి.',
        },
        {
          id: 'rice-zinc-deficiency',
          name_en: 'Zinc Deficiency (Khaira disease / Abiotic)',
          name_te: 'జింక్ లోపం (ఖైరా తెగులు / పోషక లోపం)',
          isPathological: false,
          differentiatingFactors_en:
            'Zinc deficiency causes generalized rusty brown discoloration on third/fourth leaves without defined spindle margins or gray centers.',
          differentiatingFactors_te:
            'జింక్ లోపంలో మూడవ/నాల్గవ ఆకులపై తుప్పు రంగు కనిపిస్తుంది, కానీ అగ్గి తెగులు వంటి నిర్దిష్ట బూడిద రంగు కేంద్రం ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'High relative humidity (>90%) with cloudy weather and prolonged leaf wetness (>10 hours).',
        'Night temperatures between 19°C and 23°C.',
        'Excessive and un-split nitrogenous (urea) fertilizer applications.',
      ],
      environmentalRiskFactors_te: [
        '90% పైగా గాలిలో తేమ, మేఘావృత వాతావరణం మరియు ఆకులపై ఎక్కువ సమయం తేమ ఉండటం.',
        'రాత్రి ఉష్ణోగ్రతలు 19°C నుండి 23°C మధ్య ఉండటం.',
        'యూరియా ఎరువులను అధిక మోతాదులో ఒకేసారి వేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Treat seed with biological agent Trichoderma asperellum @ 10g/kg seed prior to nursery sowing. Carbendazim 50% WP is sometimes used as a chemical seed-treatment alternative, but the specific dose previously listed here is suppressed (Phase 5.5A): it has not been verified against a current, authoritative Indian pesticide registration/label source. Do not use any chemical seed-treatment dose as an instruction from PDDS — confirm the currently approved product and dose with your local Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) before treating seed with any chemical.',
          practice_te:
            'నారుమడి విత్తేముందు కిలో విత్తనానికి 10 గ్రాముల ట్రైకోడెర్మా కలిపి విత్తన శుద్ధి చేయండి. కార్బెండజిమ్ 50% WP ను కొన్నిసార్లు రసాయన విత్తన శుద్ధి ప్రత్యామ్నాయంగా వాడతారు, కానీ ఇక్కడ ముందు పేర్కొన్న నిర్దిష్ట మోతాదు నిలిపివేయబడింది: ఇది ప్రస్తుత అధికారిక భారతీయ పురుగుమందుల నమోదు/లేబుల్ మూలంతో ధృవీకరించబడలేదు. ఏ రసాయన విత్తన శుద్ధి మోతాదును PDDS సూచనగా ఉపయోగించవద్దు — ఏదైనా రసాయనంతో విత్తన శుద్ధి చేసే ముందు మీ గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ఆమోదించిన ఉత్పత్తి మరియు మోతాదును ధృవీకరించుకోండి.',
          targetTiming: 'Pre-sowing',
        },
        {
          stepNumber: 2,
          practice_en:
            'Apply nitrogen in 3 split doses (basal, tillering, panicle initiation). Avoid urea top-dressing during active blast flare-ups.',
          practice_te:
            'నత్రజనిని మూడు దఫాలుగా వేయండి. తెగులు ఉధృతి ఉన్నప్పుడు యూరియా పైపాటుగా వేయవద్దు.',
          targetTiming: 'Vegetative growth',
        },
        {
          stepNumber: 3,
          practice_en:
            'Maintain clean irrigation channels and eliminate weed hosts along paddy bunds (e.g. Echinochloa colona).',
          practice_te:
            'గట్లపై కలుపు మొక్కలను తొలగించి, నీటి కాలువలను శుభ్రంగా ఉంచండి.',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-rice-blast-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bio-fungicide Pseudomonas fluorescens and Neem Seed Kernel Extract (NSKE) sprays during early morning or late afternoon hours are commonly used organic practices against rice blast, but a specific dose is suppressed — Phase 5.4 evidence verification could not confirm an exact figure against a primary reference accessible from this tool. Chemical fungicide classes are also commonly marketed for rice blast — Tricyclazole 75% WP (typically discussed for use once leaf lesions exceed 2-5% of canopy area) and Isoprothiolane 40% EC (discussed as a rotational option for neck blast at boot leaf stage) — but their exact doses are likewise suppressed: secondary sources gave conflicting Tricyclazole figures (roughly 120-450 g product per acre/hectare depending on source) and no verifiable dose at all for Isoprothiolane, with no primary CIBRC label accessible from this tool to confirm either. Consult local RBK for current guidance before using any organic or chemical option.',
          instruction_te:
            'ఉదయం లేదా సాయంత్రం వేళల్లో సూడోమోనాస్ ఫ్లోరోసెన్స్ లేదా వేప గింజల కషాయం (NSKE) పిచికారీ సాధారణ పద్ధతి, కానీ ఖచ్చితమైన మోతాదు నిలిపివేయబడింది — ఈ సాధనం ద్వారా అధికారిక మూలాన్ని పరిశీలించలేకపోయాము. అగ్గి తెగులు కోసం సాధారణంగా అమ్మబడే రసాయన శిలీంద్రనాశిని వర్గాలలో ట్రైసైక్లాజోల్ 75% WP (ఆకులపై 2-5% మచ్చలు గమనించినప్పుడు వాడేది) మరియు ఐసోప్రోథియోలేన్ 40% EC (వెన్ను విరుపు నివారణకు ప్రత్యామ్నాయం) ఉన్నాయి; రెండింటి ఖచ్చితమైన మోతాదులు అలాగే నిలిపివేయబడ్డాయి — వివిధ మూలాల్లో ట్రైసైక్లాజోల్‌కు విభిన్న మోతాదులు కనిపించాయి, ఐసోప్రోథియోలేన్‌కు ఏ ధృవీకరించిన మోతాదూ కనుగొనలేకపోయాము, అధికారిక CIBRC లేబుల్‌ను కూడా పరిశీలించలేకపోయాము. ఏదైనా సేంద్రీయ లేదా రసాయన ఎంపిక వాడే ముందు ప్రస్తుత సిఫార్సు కోసం RBK ని సంప్రదించండి.',
          activeIngredient_en:
            'Pseudomonas fluorescens / Azadirachtin (organic, dose suppressed); Tricyclazole 75% WP / Isoprothiolane 40% EC (chemical fungicide classes, doses suppressed — no primary CIBRC label accessible)',
          activeIngredient_te:
            'సూడోమోనాస్ ఫ్లోరోసెన్స్ / అజాడిరక్టిన్ (సేంద్రీయ, మోతాదు నిలిపివేయబడింది); ట్రైసైక్లాజోల్ 75% WP / ఐసోప్రోథియోలేన్ 40% EC (రసాయన వర్గాలు, మోతాదులు నిలిపివేయబడ్డాయి)',
          safetyCaution_en:
            'Eco-friendly biocontrol; avoid mixing with synthetic chemical bactericides. If a chemical fungicide dose is later confirmed: wear protective gloves and mask during spray preparation, do not spray against wind, and wash hands and spray equipment thoroughly afterward. Follow the pre-harvest interval (PHI) stated on the approved product container label; verify with local RBK.',
          safetyCaution_te:
            'పర్యావరణ హితమైన బయో ఏజెంట్; రసాయన మందులతో కలపవద్దు. రసాయన శిలీంద్రనాశిని మోతాదు ధృవీకరించిన తర్వాత వాడితే: మందు కలిపేటప్పుడు మాస్క్, చేతి తొడుగులు ధరించండి, గాలికి ఎదురుగా పిచికారీ చేయవద్దు, పని ముగిసిన తర్వాత చేతులను, పరికరాలను శుభ్రం చేసుకోండి. ఉత్పత్తి డబ్బా లేబుల్‌పై పేర్కొన్న కోత ముందస్తు నిరీక్షణ వ్యవధిని (PHI) పాటించండి; స్థానిక RBK వద్ద ధృవీకరించుకోండి.',
          regulatoryNotice_en:
            'Statutory Warning: Read product label before use. Rotate chemical classes to prevent fungal resistance development once a product is confirmed. Actionable chemical doses are suppressed pending primary CIBRC label verification (Phase 5.4 — direct access to ppqs.gov.in was blocked in the verifying environment; this is a tooling limitation, not a finding that either dose is wrong). Verify dosage with Village Agriculture Assistant / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు లేబుల్ చదవండి. ఉత్పత్తి ధృవీకరించిన తర్వాత శిలీంద్రాలకు రోగనిరోధకత రాకుండా మందుల వర్గాలను మారుస్తూ వాడండి. CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు రసాయన మోతాదులు నిలిపివేయబడ్డాయి. రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ అధికారితో మోతాదును ధృవీకరించుకోండి.',
        },
        {
          id: 't-rice-blast-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'Maintain shallow water level (2-3 cm) in fields during infection risk periods. Avoid allowing soil to dry out into deep cracks.',
          instruction_te:
            'తెగులు వ్యాపించే సమయంలో పొలంలో 2-3 సెం.మీ. పలుచటి నీరు ఉండేలా చూడండి. నేల బీటలు వారేలా ఆరబెట్టవద్దు.',
          activeIngredient_en: 'Water management practice',
          activeIngredient_te: 'నీటి నిర్వహణ పద్ధతి',
        },
      ],
      escalationThreshold_en:
        'If leaf blast expands rapidly to more than 10% of field hills, or if lesions appear at the panicle neck junction (neck blast) at boot leaf stage, immediately alert the Village Agriculture Assistant (VAA) at your Rythu Bharosa Kendra (RBK).',
      escalationThreshold_te:
        'పొలంలో 10% కంటే ఎక్కువ దుబ్బులకు తెగులు వ్యాపించినా లేదా వెన్ను మెడ వద్ద నల్లటి మచ్చలు కనిపిస్తే, వెంటనే మీ గ్రామ రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
      chemicalTabDetail_en:
        'Chemical fungicide classes commonly marketed for rice blast include Tricyclazole 75% WP (discussed for use once leaf lesions exceed 2-5% of canopy area) and Isoprothiolane 40% EC (discussed as a rotational option for neck blast at boot leaf stage). A specific dose for either is suppressed: secondary sources gave conflicting Tricyclazole figures (roughly 120-450 g product per acre/hectare depending on source) and no verifiable dose at all for Isoprothiolane, with no primary CIBRC label accessible from this tool to confirm either. See the Organic tab for the full safety caution and regulatory guidance that applies to any eventual chemical use, and consult your local RBK before spraying anything.',
      chemicalTabDetail_te:
        'అగ్గి తెగులు కోసం సాధారణంగా అమ్మబడే రసాయన శిలీంద్రనాశిని వర్గాలలో ట్రైసైక్లాజోల్ 75% WP (ఆకులపై 2-5% మచ్చలు గమనించినప్పుడు వాడేది) మరియు ఐసోప్రోథియోలేన్ 40% EC (వెన్ను విరుపు నివారణకు ప్రత్యామ్నాయం) ఉన్నాయి. రెండింటి ఖచ్చితమైన మోతాదులు నిలిపివేయబడ్డాయి — వివిధ మూలాల్లో ట్రైసైక్లాజోల్‌కు విభిన్న మోతాదులు కనిపించాయి, ఐసోప్రోథియోలేన్‌కు ఏ ధృవీకరించిన మోతాదూ కనుగొనలేకపోయాము, అధికారిక CIBRC లేబుల్‌ను కూడా పరిశీలించలేకపోయాము. పూర్తి భద్రతా జాగ్రత్తలు మరియు నియంత్రణ మార్గదర్శకాల కోసం ఆర్గానిక్ టాబ్ చూడండి; పిచికారీకి ముందు స్థానిక RBK ని సంప్రదించండి.',
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
          title: 'Major Uses of Pesticides (Fungicides) — Approved Rice Blast Formulations (Tricyclazole & Isoprothiolane)',
          organization: 'Central Insecticides Board & Registration Committee (CIBRC), DPPQS, Govt. of India',
          reviewDate: '2026-03-31',
          url: 'https://ppqs.gov.in',
        },
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-12',
    },

    'disease-chilli-leaf-curl': {
      id: 'disease-chilli-leaf-curl',
      cropId: 'crop-chilli',
      name_en: 'Chilli Leaf Curl Virus',
      name_te: 'మిరప ఆకు ముడుత తెగులు',
      pathogenOrVector_en: 'Virus: Begomovirus transmitted by Whitefly (Bemisia tabaci)',
      pathogenOrVector_te: 'వైరస్: బెగోమోవైరస్ (తెల్లదోమ ద్వారా వ్యాప్తి)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Upward curling, puckering, and crinkling of leaf margins.',
        'Vein clearing, thickening, and brittle leathery leaves.',
        'Severe stunting of young shoots, shortened internodes, and blossom drop.',
      ],
      observableSymptoms_te: [
        'ఆకులు పైకి ముడుచుకుని, దళసరిగా, గరకుగా మారతాయి.',
        'ఈనెలు ఉబ్బి పాలిపోతాయి, లేత కొమ్మలు గిడసబారి పూత రాలిపోతుంది.',
        'మొక్క ఎదుగుదల లోపించి పిలకలు ఎక్కువగా వస్తాయి.',
      ],
      affectedParts: ['Leaves', 'Growing Tips', 'Buds'],
      similarConditions: [
        {
          id: 'chilli-thrips-damage',
          name_en: 'Thrips Damage (Scirtothrips dorsalis / Pest)',
          name_te: 'తామర పురుగుల ఉధృతి',
          isPathological: true,
          differentiatingFactors_en:
            'Thrips cause upward boat-shaped curling with silvery or bronze streaks on leaf undersides; leaf curl virus causes thickened, crinkled foliage with vein clearing.',
          differentiatingFactors_te:
            'తామర పురుగుల వల్ల ఆకులు పడవ ఆకారంలో పైకి ముడుచుకుని కింద వెండి/గోధుమ రంగు చారలు ఉంటాయి; వైరస్ లో ఈనెలు ఉబ్బి దళసరిగా మారతాయి.',
        },
        {
          id: 'chilli-mite-damage',
          name_en: 'Yellow Mite Damage (Polyphagotarsonemus latus / Pest)',
          name_te: 'నల్లి పురుగుల నష్టం',
          isPathological: true,
          differentiatingFactors_en:
            'Mites cause leaves to curl DOWNWARDS (inverted boat shape) with elongation of petioles; leaf curl virus curls leaves UPWARDS.',
          differentiatingFactors_te:
            'నల్లి పురుగుల వల్ల ఆకులు క్రిందికి ముడుచుకుంటాయి (బోర్లించిన పడవ ఆకారం); వైరస్ వల్ల ఆకులు పైకి ముడుచుకుంటాయి.',
        },
        {
          id: 'chilli-herbicide-drift',
          name_en: 'Auxin/Herbicide Drift Injury (Abiotic)',
          name_te: 'కలుపు మందుల గాలి ప్రభావం',
          isPathological: false,
          differentiatingFactors_en:
            'Herbicide drift causes strap-like parallel-veined leaves along field borders; viral leaf curl occurs in scattered patches where vectors feed.',
          differentiatingFactors_te:
            'కలుపు మందుల ప్రభావం పొలం సరిహద్దుల్లో ఒకేసారి కనిపిస్తుంది; వైరస్ తెగులు దోమ ఉన్నచోట గుంపులుగా కనిపిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Prolonged dry spells with high ambient temperatures favoring whitefly population bursts.',
        'Cultivation adjacent to unmanaged host crops or weed borders.',
        'Over-application of synthetic pyrethroids leading to whitefly flare-up.',
      ],
      environmentalRiskFactors_te: [
        'పొడి వాతావరణం, అధిక ఉష్ణోగ్రతలు ఉన్నప్పుడు తెల్లదోమ ఉధృతి పెరుగుతుంది.',
        'పొలం చుట్టూ కలుపు మొక్కలు లేదా తెగులు సోకిన పంటలు ఉండటం.',
        'సింథటిక్ పైరెథ్రాయిడ్స్ అధికంగా వాడటం వల్ల తెల్లదోమ పునరుత్పత్తి పెరగడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Erect 2-3 border rows of tall barrier crops like Sorghum, Maize, or Pearl Millet around the chilli plot.',
          practice_te:
            'మిరప పొలం చుట్టూ 2-3 వరుసల జొన్న లేదా మొక్కజొన్నను రక్షణ పంటగా వేయండి.',
          targetTiming: 'Sowing/Planting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Install yellow sticky traps (15-20 traps per acre) at canopy level to monitor and trap whitefly vectors early.',
          practice_te:
            'తెల్లదోమ నివారణకు ఎకరానికి 15-20 పసుపు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.',
          targetTiming: 'Transplanting to flowering',
        },
        {
          stepNumber: 3,
          practice_en:
            'Rogue and safely bury or burn virus-infected seedlings within the first 30 days after transplanting.',
          practice_te:
            'నాటిన 30 రోజుల్లోపు తీవ్రంగా తెగులు సోకిన మొక్కలను పీకి నాశనం చేయండి.',
          targetTiming: 'Early vegetative',
        },
      ],
      treatments: [
        {
          id: 't-chilli-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'VIRAL INFECTION CANNOT BE CURED BY CHEMICALS OR ORGANIC SPRAYS. Cold-pressed Neem Oil and NSKE sprays are commonly used organic practices to deter whitefly vector (Bemisia tabaci) feeding and oviposition — they have no viricidal action, only vector-suppression value — but a specific dose is suppressed — Phase 5.4 evidence verification could not confirm an exact figure against a primary reference accessible from this tool. Synthetic insecticides (e.g. Diafenthiuron 50% WP, Acetamiprid 20% SP) are also commonly discussed for suppressing this vector once it exceeds economic threshold (5-10 whiteflies per plant), but a specific product and dose for either is likewise suppressed: no primary CIBRC label was accessible from this tool to confirm either as a standalone product labeled for whitefly on chilli (one secondary source listed Diafenthiuron 50% WP as labeled only for mites on chilli, not whitefly — verify the target pest on the label, not just the active ingredient). Do not apply any insecticide, organic or synthetic, if whitefly vectors are absent, and consult local RBK for current guidance before using any option.',
          instruction_te:
            'రసాయన మందులతో లేదా సేంద్రీయ కషాయాలతో వైరస్ నయం కాదు. వేప నూనె మరియు వేప కషాయం (NSKE) తెల్లదోమ (వ్యాధి కారక కీటకం) గుడ్లు పెట్టకుండా నిరోధించడానికి సాధారణంగా వాడే సేంద్రీయ పద్ధతులు — ఇవి వైరస్‌ను నయం చేయలేవు, తెల్లదోమను మాత్రమే అరికడతాయి — కానీ ఖచ్చితమైన మోతాదు నిలిపివేయబడింది. సింథటిక్ కీటకనాశినులు (ఉదా. డయాఫెంతియురాన్ 50% WP, ఎసిటామిప్రిడ్ 20% SP) తెల్లదోమ ఉధృతి పరిమితి (మొక్కకు 5-10) దాటినప్పుడు వాడటం గురించి సాధారణంగా చర్చించబడతాయి, కానీ నిర్దిష్ట ఉత్పత్తి మరియు మోతాదు నిలిపివేయబడింది: మిరపలో తెల్లదోమకు ఆమోదించబడినట్లు అధికారిక CIBRC లేబుల్ ఈ సాధనం ద్వారా కనుగొనలేకపోయాము (ఒక మూలం డయాఫెంతియురాన్ 50% WPను నల్లి మాత్రమే లక్ష్యంగా పేర్కొంది, తెల్లదోమ కాదు — లేబుల్‌పై లక్ష్య కీటకాన్ని ధృవీకరించుకోండి). తెల్లదోమ లేకపోతే సేంద్రీయ లేదా సింథటిక్ ఏదైనా కీటకనాశినీ పిచికారీ చేయవద్దు; ఏదైనా ఎంపిక వాడే ముందు ప్రస్తుత సిఫార్సు కోసం స్థానిక RBK ని సంప్రదించండి.',
          activeIngredient_en:
            'Neem Oil / Azadirachtin (organic, dose suppressed); Diafenthiuron 50% WP / Acetamiprid 20% SP (synthetic vector management, targets Bemisia tabaci only — not the virus; product/dose suppressed, possible chilli-whitefly label mismatch found in secondary sources)',
          activeIngredient_te:
            'వేప నూనె / అజాడిరక్టిన్ (సేంద్రీయ, మోతాదు నిలిపివేయబడింది); డయాఫెంతియురాన్ 50% WP / ఎసిటామిప్రిడ్ 20% SP (కీటక నివారణ, తెల్లదోమ మాత్రమే — వైరస్ కాదు; ఉత్పత్తి/మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'If using any insecticide once confirmed: rotate chemistry, do not repeat the same class consecutively to prevent vector resistance, observe the mandatory pre-harvest interval on the approved container label, and wear protective mask and gloves.',
          safetyCaution_te:
            'కీటకనాశినీ ధృవీకరించిన తర్వాత వాడితే: మందుల రకాలను మార్చండి, నిరోధకత రాకుండా ఒకే వర్గాన్ని వరుసగా వాడవద్దు, ఉత్పత్తి డబ్బా లేబుల్‌పై సూచించిన నిరీక్షణ వ్యవధిని పాటించండి; రక్షణ మాస్క్, చేతి తొడుగులు ధరించండి.',
          regulatoryNotice_en:
            'Statutory Warning: Insecticides (organic or synthetic) manage the whitefly vector only; they have no viricidal action. Actionable synthetic product and dose are suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment, and a secondary source suggested Diafenthiuron may be labeled for chilli mites rather than whitefly). Strictly adhere to approved CIBRC container label directions once confirmed with RBK.',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: కీటక నాశినులు (సేంద్రీయ లేదా సింథటిక్) తెల్లదోమను మాత్రమే అరికడతాయి, వైరస్ ను నయం చేయలేవు. CIBRC ధృవీకరణ పూర్తయ్యే వరకు నిర్దిష్ట సింథటిక్ ఉత్పత్తి మరియు మోతాదు నిలిపివేయబడ్డాయి. RBK తో ధృవీకరించుకున్న తర్వాత CIBRC లేబుల్ నిబంధనలను పాటించండి.',
        },
      ],
      escalationThreshold_en:
        'If whitefly counts exceed 15-20 per plant and leaf curling advances rapidly across the main field despite barrier cropping, consult your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra (RBK) for area-wide vector suppression advisories.',
      escalationThreshold_te:
        'మొక్కకు 15-20 కంటే ఎక్కువ తెల్లదోమలు ఉండి, ఆకు ముడుత విస్తరిస్తే, గ్రామ రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
      chemicalTabDetail_en:
        'VIRAL INFECTION CANNOT BE CURED BY CHEMICALS. Synthetic insecticides such as Diafenthiuron 50% WP and Acetamiprid 20% SP are sometimes discussed for suppressing the whitefly vector (Bemisia tabaci) once it exceeds economic threshold (5-10 whiteflies per plant) — they have no viricidal action, only vector-suppression value. A specific product and dose are suppressed: no primary CIBRC label was accessible from this tool to confirm either as a standalone product labeled for whitefly on chilli. IMPORTANT TARGET-PEST WARNING: one secondary source listed Diafenthiuron 50% WP as labeled only for mites on chilli, not whitefly — verify the target pest on the approved label, not just the active ingredient name, before any use. See the Organic tab for full safety caution and regulatory guidance; consult your local RBK.',
      chemicalTabDetail_te:
        'రసాయన మందులతో వైరస్ నయం కాదు. డయాఫెంతియురాన్ 50% WP, ఎసిటామిప్రిడ్ 20% SP వంటి సింథటిక్ కీటకనాశినులు తెల్లదోమ (వ్యాధి కారక కీటకం) ఉధృతి పరిమితి (మొక్కకు 5-10) దాటినప్పుడు వాడటం గురించి సాధారణంగా చర్చించబడతాయి — ఇవి వైరస్‌ను నయం చేయలేవు, తెల్లదోమను మాత్రమే అరికడతాయి. నిర్దిష్ట ఉత్పత్తి మరియు మోతాదు నిలిపివేయబడ్డాయి: మిరపలో తెల్లదోమకు ఆమోదించబడినట్లు అధికారిక CIBRC లేబుల్ ఈ సాధనం ద్వారా కనుగొనలేకపోయాము. ముఖ్యమైన లక్ష్య-కీటక హెచ్చరిక: ఒక మూలం డయాఫెంతియురాన్ 50% WPను నల్లి మాత్రమే లక్ష్యంగా పేర్కొంది, తెల్లదోమ కాదు — ఏదైనా వాడే ముందు లేబుల్‌పై లక్ష్య కీటకాన్ని ధృవీకరించుకోండి, యాక్టివ్ ఇన్‌గ్రీడియంట్ పేరు మాత్రమే కాదు. పూర్తి భద్రతా జాగ్రత్తలు మరియు నియంత్రణ మార్గదర్శకాల కోసం ఆర్గానిక్ టాబ్ చూడండి; స్థానిక RBK ని సంప్రదించండి.',
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
      name_te: 'గులాబీ రంగు కాయ తొలుచు పురుగు',
      pathogenOrVector_en: 'Insect Pest: Pectinophora gossypiella (Saunders)',
      pathogenOrVector_te: 'కీటకం: పెక్టినోఫోరా గాసిపియెల్లా (గులాబీ పురుగు)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Rosetted flowers ("rosette blooms") that fail to open normally.',
        'Prematurely opened bolls with stained, poor quality lint.',
        'Internal boreholes in maturing bolls plugged with frass, with pink larvae inside developing seeds.',
      ],
      observableSymptoms_te: [
        'పువ్వులు విచ్చుకోకుండా ముడుచుకుపోయి "రోజెట్" ఆకారంలో కనిపిస్తాయి.',
        'కాయలు సమయానికి ముందే పగిలి, దూది రంగు మారి నాణ్యత దెబ్బతింటుంది.',
        'కాయలలో రంధ్రాలు ఏర్పడి, లోపలి గింజలలో గులాబీ రంగు లార్వాలు ఉంటాయి.',
      ],
      affectedParts: ['Squares', 'Flower Buds', 'Bolls', 'Seeds'],
      similarConditions: [
        {
          id: 'cotton-spotted-bollworm',
          name_en: 'Spotted Bollworm (Earias vittella)',
          name_te: 'మచ్చల కాయ తొలుచు పురుగు',
          isPathological: true,
          differentiatingFactors_en:
            'Spotted bollworm causes drooping/wilting of terminal growing shoots early in the season; pink bollworm damages squares and internal seed kernels inside maturing bolls.',
          differentiatingFactors_te:
            'మచ్చల పురుగు మొదట్లో లేత కొమ్మలను తొలిచి వాడిపోయేలా చేస్తుంది; గులాబీ పురుగు కాయ లోపలి గింజలను ఆశిస్తుంది.',
        },
        {
          id: 'cotton-physiological-square-drop',
          name_en: 'Physiological Square/Boll Shedding (Abiotic Weather Stress)',
          name_te: 'వాతావరణ ఒత్తిడి వల్ల పూత, పిందె రాలడం (అబియోటిక్)',
          isPathological: false,
          differentiatingFactors_en:
            'Physiological shedding occurs after heavy overcast skies, waterlogging or sudden moisture stress without bored holes, rosette flowers, or larval frass.',
          differentiatingFactors_te:
            'వాతావరణంలో మార్పులు లేదా తేమ హెచ్చుతగ్గుల వల్ల పూత రాలుతుంది; ఇందులో పురుగు తొలిచిన రంధ్రాలు లేదా మల విసర్జన ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Ratooning of cotton crops or extending crop duration into summer months.',
        'Staggered sowing in neighboring fields creating continuous food sources for pest cycles.',
      ],
      environmentalRiskFactors_te: [
        'పత్తి పంటను తీసివేయకుండా వేసవి వరకు ఉంచడం (మోడు సాగు).',
        'పక్క పొలాల్లో విడతల వారీగా విత్తనాలు వేయడం వల్ల పురుగు సంతతి పెరగడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Install pheromone traps with female sex pheromone lures @ 5 traps per acre at 45 days after sowing for adult moth monitoring.',
          practice_te:
            'విత్తిన 45 రోజుల తర్వాత రెక్కల పురుగుల ఉనికిని కనిపెట్టడానికి ఎకరానికి 5 లింగాకర్షక బుట్టలను అమర్చండి.',
          targetTiming: '45-60 DAS',
        },
        {
          stepNumber: 2,
          practice_en:
            'Terminate cotton crop by December/January; avoid extending the crop to reduce overwintering diapausing larvae.',
          practice_te:
            'డిసెంబర్ లేదా జనవరి నాటికి పంటను ముగించండి; వేసవి వరకు పొడిగించవద్దు.',
          targetTiming: 'Crop termination',
        },
      ],
      treatments: [
        {
          id: 't-cotton-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Release egg parasitoid Trichogramma bactrae @ 60,000 eggs/acre at weekly intervals from flower initiation. When moth trap catches exceed ETL (8 moths/trap/night for 3 consecutive days) or rosette flowers exceed 10%, Chlorantraniliprole 18.5% SC and Emamectin Benzoate 5% SG are also commonly discussed insecticide classes for cotton bollworm, but a specific dose for either is suppressed: Phase 5.4 evidence verification found several differing commercial dose figures (secondary sources ranged roughly 0.3-0.4 ml/L for Chlorantraniliprole and 0.4-0.5 g/L for Emamectin Benzoate) with no primary CIBRC label accessible from this tool to confirm an exact figure. Consult local RBK before using any chemical option.',
          instruction_te:
            'పూత దశ నుండి వారానికోసారి ఎకరానికి 60,000 ట్రైకోగ్రామా బాక్ట్రే పరాన్నజీవుల గుడ్లను విడుదల చేయండి. బుట్టలో రోజుకు 8 పురుగులు వరుసగా 3 రోజులు పడినా లేదా 10% పూత ముడుచుకున్నప్పుడు, క్లోరాంట్రానిలిప్రోల్ మరియు ఎమామెక్టిన్ బెంజోయేట్ కూడా సాధారణంగా చర్చించబడే కీటకనాశిని వర్గాలు, కానీ ఖచ్చితమైన మోతాదు నిలిపివేయబడింది — వివిధ మూలాల్లో విభిన్న మోతాదులు కనిపించాయి, అధికారిక CIBRC లేబుల్‌ను ఈ సాధనం ద్వారా పరిశీలించలేకపోయాము. ఏదైనా రసాయన ఎంపిక వాడే ముందు స్థానిక RBK ని సంప్రదించండి.',
          activeIngredient_en:
            'Trichogramma bactrae (organic bio-control); Chlorantraniliprole 18.5% SC / Emamectin Benzoate 5% SG (chemical classes, exact dose suppressed — conflicting secondary-source figures, no primary CIBRC label accessible)',
          activeIngredient_te:
            'ట్రైకోగ్రామా బాక్ట్రే (సేంద్రీయ బయో-కంట్రోల్); క్లోరాంట్రానిలిప్రోల్ 18.5% SC / ఎమామెక్టిన్ బెంజోయేట్ 5% SG (రసాయన వర్గాలు, మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'If using any chemical insecticide once a dose is confirmed: avoid broad-spectrum pyrethroid overuse (accelerates resistance) and follow the container label pre-harvest waiting period.',
          safetyCaution_te:
            'రసాయన కీటకనాశినీ మోతాదు ధృవీకరించిన తర్వాత వాడితే: నిరోధకత రాకుండా పైరెథ్రాయిడ్స్ అతిగా వాడవద్దు. ఉత్పత్తి లేబుల్‌పై సూచించిన నిరీక్షణ సమయాన్ని పాటించండి.',
          regulatoryNotice_en:
            'Spray any chemical option strictly based on ETL monitoring once a specific product and dose are confirmed. Actionable chemical dose suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment). Consult local RBK for the currently approved formulation and dose.',
          regulatoryNotice_te:
            'ఏదైనా రసాయన ఎంపికను కీటక ఉధృతి స్థాయి (ETL) ఆధారంగా, నిర్దిష్ట ఉత్పత్తి మరియు మోతాదు ధృవీకరించిన తర్వాత మాత్రమే పిచికారీ చేయండి. CIBRC ధృవీకరణ పూర్తయ్యే వరకు రసాయన మోతాదు నిలిపివేయబడింది. ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం RBK ని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en:
        'When rosette flowers exceed 15% or trap catch surges above 15 moths/night, immediately consult your local RBK Agriculture Officer for community-level mass trapping and coordinated spray schedules.',
      escalationThreshold_te:
        '15% కంటే ఎక్కువ పూత దెబ్బతిన్నా లేదా బుట్టలో 15 కంటే ఎక్కువ పురుగులు పడితే, వెంటనే రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ అధికారిని సంప్రదించండి.',
      chemicalTabDetail_en:
        'Chlorantraniliprole 18.5% SC and Emamectin Benzoate 5% SG are commonly discussed insecticide classes for cotton bollworm once moth trap catches exceed ETL (8 moths/trap/night for 3 consecutive days) or rosette flowers exceed 10%. A specific dose for either is suppressed: secondary sources gave differing commercial figures (roughly 0.3-0.4 ml/L for Chlorantraniliprole and 0.4-0.5 g/L for Emamectin Benzoate) with no primary CIBRC label accessible from this tool to confirm an exact figure. See the Organic tab for full safety caution and regulatory guidance; consult your local RBK before spraying anything.',
      chemicalTabDetail_te:
        'బుట్టలో రోజుకు 8 పురుగులు వరుసగా 3 రోజులు పడినా లేదా 10% పూత ముడుచుకున్నప్పుడు, క్లోరాంట్రానిలిప్రోల్ మరియు ఎమామెక్టిన్ బెంజోయేట్ సాధారణంగా చర్చించబడే కీటకనాశిని వర్గాలు. రెండింటి ఖచ్చితమైన మోతాదు నిలిపివేయబడింది — వివిధ మూలాల్లో విభిన్న మోతాదులు కనిపించాయి, అధికారిక CIBRC లేబుల్‌ను ఈ సాధనం ద్వారా పరిశీలించలేకపోయాము. పూర్తి భద్రతా జాగ్రత్తలు మరియు నియంత్రణ మార్గదర్శకాల కోసం ఆర్గానిక్ టాబ్ చూడండి; పిచికారీకి ముందు స్థానిక RBK ని సంప్రదించండి.',
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
      name_te: 'టిక్కా ఆకు మచ్చ తెగులు',
      pathogenOrVector_en: 'Fungi: Cercospora arachidicola (Early) & Phaeoisariopsis personata (Late)',
      pathogenOrVector_te: 'శిలీంద్రాలు: సెర్కోస్పోరా అరాచిడికోలా & ఫియోఐసారియోప్సిస్ పర్సొనేటా',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Early leaf spot: Circular reddish-brown to dark brown spots surrounded by a prominent yellow halo on upper leaf surface.',
        'Late leaf spot: Nearly circular dark black spots mostly on lower leaf surface without a distinct yellow halo.',
        'Severe infection leads to extensive defoliation, leaving bare stems.',
      ],
      observableSymptoms_te: [
        'తొలి దశ మచ్చలు: ఆకుల పైభాగంలో గుండ్రని గోధుమ మచ్చలు, చుట్టూ స్పష్టమైన పసుపు వలయం ఉంటుంది.',
        'మలి దశ మచ్చలు: ఆకుల అడుగున నల్లటి గుండ్రని మచ్చలు ఏర్పడతాయి.',
        'తీవ్రత పెరిగితే ఆకులన్నీ రాలిపోయి కేవలం కాండం మాత్రమే మిగులుతుంది.',
      ],
      affectedParts: ['Leaves', 'Petioles', 'Stems'],
      similarConditions: [
        {
          id: 'groundnut-rust',
          name_en: 'Groundnut Rust (Puccinia arachidis)',
          name_te: 'తుప్పు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Rust produces orange to reddish-brown raised pustules that rupture on the leaf underside; Tikka spots do not rupture into dusty spores.',
          differentiatingFactors_te:
            'తుప్పు తెగులులో ఆకుల అడుగున చిన్న చిన్న బొబ్బలు ఏర్పడి ఎరుపు రంగు పొడి వస్తుంది; టిక్కా మచ్చలలో పొడి రాలదు.',
        },
        {
          id: 'groundnut-iron-chlorosis',
          name_en: 'Iron Deficiency Chlorosis (Abiotic Nutrient Stress)',
          name_te: 'ఇనుము లోపం (క్లోరోసిస్ / పోషక లోపం)',
          isPathological: false,
          differentiatingFactors_en:
            'Iron deficiency causes uniform interveinal chlorosis (yellowing) on young emerging leaves without necrotic circular spots or dark rings.',
          differentiatingFactors_te:
            'ఇనుము లోపంలో లేత ఆకుల ఈనెలు పచ్చగా ఉండి ఆకంతా పసుపు రంగులోకి మారుతుంది; టిక్కా వంటి గుండ్రని మచ్చలు లేదా నల్లటి వలయాలు ఉండవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Prolonged wet weather with relative humidity above 85% and temperatures between 25°C and 30°C.',
        'Continuous sole cropping of groundnut in rainfed red sandy soils.',
      ],
      environmentalRiskFactors_te: [
        'గాలిలో తేమ 85% కంటే ఎక్కువ ఉండటం, 25°C - 30°C ఉష్ణోగ్రతలు ఉండటం.',
        'ఏటా అదే నేలలో పంట మార్పిడి లేకుండా వేరుశనగ సాగు చేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Practice crop rotation with cereals like Pearl Millet (Bajra), Sorghum, or Maize in Rayalaseema rainfed belts.',
          practice_te:
            'రాయలసీమ ప్రాంతాల్లో సజ్జ, జొన్న లేదా మొక్కజొన్నతో పంట మార్పిడి చేయండి.',
          targetTiming: 'Pre-season planning',
        },
        {
          stepNumber: 2,
          practice_en:
            'Seed treatment with bio-agent Trichoderma viride @ 10g/kg seed before sowing. Mancozeb 75% WP is sometimes used as a chemical seed-treatment alternative, but the specific dose previously listed here is suppressed (Phase 5.5C): it has not been verified against a current, authoritative Indian pesticide registration/label applicable to groundnut seed treatment. Do not rely on PDDS for any chemical seed-treatment dose — confirm the currently approved product and dose with your local Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) before treating seed with any chemical.',
          practice_te:
            'విత్తేముందు కిలో విత్తనానికి 10 గ్రాముల ట్రైకోడెర్మా కలిపి విత్తన శుద్ధి చేయండి. మాంకోజెబ్ 75% WPను కొన్నిసార్లు రసాయన విత్తన శుద్ధి ప్రత్యామ్నాయంగా వాడతారు, కానీ ఇక్కడ ముందు పేర్కొన్న నిర్దిష్ట మోతాదు నిలిపివేయబడింది: ఇది వేరుశనగ విత్తన శుద్ధికి వర్తించే ప్రస్తుత అధికారిక భారతీయ పురుగుమందుల నమోదు/లేబుల్ మూలంతో ధృవీకరించబడలేదు. ఏ రసాయన విత్తన శుద్ధి మోతాదును PDDS సూచనగా ఆధారపడవద్దు — ఏదైనా రసాయనంతో విత్తన శుద్ధి చేసే ముందు మీ గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ఆమోదించిన ఉత్పత్తి మరియు మోతాదును ధృవీకరించుకోండి.',
          targetTiming: 'Pre-sowing',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-tikka-org-nske-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Rajasthan trial (ICAR, published on epubs.icar.org.in) found that NSKE (Neem Seed Kernel Extract) combined with a Trichoderma + Pseudomonas fluorescens bio-agent treatment reduced Tikka leaf spot incidence by 60.54% compared to untreated plots. This is real, cited evidence of effectiveness — but it is from Rajasthan, not Andhra Pradesh (geographicScope: other_state below), and the specific NSKE concentration and application interval used in that trial are suppressed here pending confirmation against a current university/CIBRC label. Do not infer an exact spray strength from the 60.54% figure — it describes an outcome, not a label rate. Consult your local RBK/VAA for the current recommended NSKE concentration and bio-agent dose for groundnut tikka in your district.',
          instruction_te:
            'రాజస్థాన్‌లో జరిగిన ఒక ICAR ట్రయల్ (epubs.icar.org.in లో ప్రచురితం) ప్రకారం, వేప గింజల కషాయం (NSKE) ను ట్రైకోడెర్మా + సూడోమోనాస్ ఫ్లోరోసెన్స్ బయో-ఏజెంట్ చికిత్సతో కలిపి వాడినప్పుడు, చికిత్స చేయని ప్లాట్లతో పోలిస్తే టిక్కా ఆకు మచ్చ తెగులు ఉధృతి 60.54% తగ్గింది. ఇది ప్రభావశీలతకు నిజమైన, ఉదహరించిన ఆధారమే — కానీ ఇది ఆంధ్రప్రదేశ్‌లో కాదు, రాజస్థాన్‌లో జరిగింది (క్రింద geographicScope: other_state), మరియు ఆ ట్రయల్‌లో వాడిన నిర్దిష్ట NSKE గాఢత, పిచికారీ వ్యవధి ప్రస్తుత విశ్వవిద్యాలయ/CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు ఇక్కడ నిలిపివేయబడ్డాయి. 60.54% అంకె నుండి ఖచ్చితమైన గాఢతను ఊహించవద్దు — అది ఫలితాన్ని మాత్రమే సూచిస్తుంది, లేబుల్ మోతాదును కాదు. మీ జిల్లాకు టిక్కా తెగులుకు ప్రస్తుత సిఫార్సు NSKE గాఢత మరియు బయో-ఏజెంట్ మోతాదు కోసం స్థానిక RBK/VAA ని సంప్రదించండి.',
          activeIngredient_en: 'NSKE (Neem Seed Kernel Extract) + Trichoderma / Pseudomonas fluorescens (concentration suppressed — Rajasthan trial outcome cited, not an AP-confirmed label rate)',
          activeIngredient_te: 'NSKE (వేప గింజల కషాయం) + ట్రైకోడెర్మా / సూడోమోనాస్ ఫ్లోరోసెన్స్ (గాఢత నిలిపివేయబడింది)',
          safetyCaution_en:
            'Eco-friendly biocontrol combination; avoid mixing with synthetic chemical fungicides in the same spray tank. Wear basic gloves during preparation and application.',
          safetyCaution_te:
            'పర్యావరణ హితమైన బయో-నియంత్రణ కలయిక; అదే స్ప్రే టాంక్‌లో రసాయన శిలీంద్రనాశినులతో కలపవద్దు. తయారీ మరియు పిచికారీ సమయంలో చేతి తొడుగులు ధరించండి.',
          regulatoryNotice_en:
            'The 60.54% reduction figure is a real ICAR-published trial result from Rajasthan, not Andhra Pradesh — treat it as supporting evidence that this organic combination can work, not as an AP-specific or dose-confirmed recommendation. Confirm the current recommended concentration with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            '60.54% తగ్గుదల అంకె రాజస్థాన్ నుండి వచ్చిన నిజమైన ICAR ట్రయల్ ఫలితం, ఆంధ్రప్రదేశ్‌ది కాదు — ఈ సేంద్రీయ కలయిక పనిచేయగలదనడానికి ఇది మద్దతు ఆధారంగా మాత్రమే భావించండి, AP-నిర్దిష్ట లేదా మోతాదు-ధృవీకరించిన సిఫార్సుగా కాదు. ప్రస్తుత సిఫార్సు గాఢతను గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ధృవీకరించుకోండి.',
        },
        {
          id: 't-groundnut-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'At initial spot appearance, Mancozeb 75% WP and Tebuconazole 25.9% EC are commonly used fungicide classes for groundnut leaf spot (tikka), but a specific dose is suppressed: Phase 5.4 evidence verification found a university extension source citing Mancozeb 75% WP @ 3g/L (differing from an earlier, uncorroborated 2.5g/L figure) and found no confirming source at all for a Tebuconazole 25.9% EC dose on this crop, with no primary CIBRC label accessible from this tool.',
          instruction_te:
            'మచ్చలు కనిపించిన వెంటనే మాంకోజెబ్ మరియు టెబుకొనజోల్ సాధారణంగా వాడే శిలీంద్రనాశిని వర్గాలు, కానీ ఖచ్చితమైన మోతాదు నిలిపివేయబడింది — ఒక విశ్వవిద్యాలయ మూలం వేరే మోతాదును సూచించింది, టెబుకొనజోల్ కోసం ఏ మూలం కనుగొనలేకపోయాము, అధికారిక CIBRC లేబుల్‌ను పరిశీలించలేకపోయాము.',
          activeIngredient_en: 'Mancozeb 75% WP / Tebuconazole 25.9% EC (exact dose suppressed — conflicting/absent secondary-source figures, no primary CIBRC label accessible)',
          activeIngredient_te: 'మాంకోజెబ్ 75% WP / టెబుకొనజోల్ 25.9% EC (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Avoid spraying during strong midday sunshine. Maintain recommended water volume (200 L/acre). Follow approved container label waiting period (PHI) before harvest; verify with local RBK.',
          safetyCaution_te:
            'ఎండ తీవ్రంగా ఉన్నప్పుడు పిచికారీ చేయవద్దు. ఎకరానికి 200 లీటర్ల నీటిని వాడండి. కోతకు ముందు డబ్బా లేబుల్‌పై తెలిపిన నిరీక్షణ సమయాన్ని (PHI) పాటించండి; స్థానిక RBK వద్ద ధృవీకరించుకోండి.',
          regulatoryNotice_en:
            'Statutory Safety Notice: Check approved product label. Actionable dose suppressed pending primary CIBRC label verification (Phase 5.4 — ppqs.gov.in was not accessible from the verifying environment). Verify dosage and pre-harvest interval with Village Agriculture Assistant / RBK.',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉత్పత్తి లేబుల్ చూడండి. CIBRC ధృవీకరణ పూర్తయ్యే వరకు మోతాదు నిలిపివేయబడింది. మోతాదు మరియు నిరీక్షణ సమయాన్ని RBK అధికారితో ధృవీకరించుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If defoliation begins before pod filling stage, seek advice at your local Rythu Bharosa Kendra (RBK) to prevent severe yield loss.',
      escalationThreshold_te:
        'కాయలు ఊరే దశకు ముందే ఆకులు రాలిపోవడం ప్రారంభిస్తే, రైతు భరోసా కేంద్రం (RBK) నిపుణులను సంప్రదించండి.',
      claimEvidence: [
        {
          claimId: 't-groundnut-chem-1-safety-caution',
          fieldRef: "treatments['t-groundnut-chem-1'].safetyCaution_en/_te",
          verificationStatus: 'unsupported',
          sourceIndexes: [0, 1, 2],
          limitation_en:
            'The spray water volume figure (200 L/acre) is a general spray-carrier convention seen in secondary agricultural sources — it is not confirmed against the current Mancozeb 75% WP / Tebuconazole 25.9% EC product label for this crop and pest (all three sources above link only to an organization homepage, not this specific figure). Confirm the current label directions with your local Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) before spraying.',
          limitation_te:
            'స్ప్రే నీటి పరిమాణం (200 L/acre) అనేది సాధారణ వ్యవసాయ మూలాల్లో కనిపించే సంప్రదాయ అంచనా మాత్రమే — ఇది ఈ పంట మరియు పురుగు కోసం ప్రస్తుత మాంకోజెబ్ 75% WP / టెబుకొనజోల్ 25.9% EC ఉత్పత్తి లేబుల్‌తో ధృవీకరించబడలేదు (పై మూలాలు మూడూ సంస్థ వెబ్‌సైట్‌కు మాత్రమే లింక్ అవుతాయి). పిచికారీకి ముందు స్థానిక గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ప్రస్తుత లేబుల్ సూచనలను ధృవీకరించుకోండి.',
        },
        {
          claimId: 't-groundnut-tikka-org-nske-1-reduction-figure',
          fieldRef: "treatments['t-groundnut-tikka-org-nske-1'].instruction_en/_te",
          verificationStatus: 'provisional',
          sourceIndexes: [3],
          locator: 'epubs.icar.org.in — Rajasthan field trial, NSKE + Trichoderma/P. fluorescens vs. untreated control (60.54% incidence reduction)',
          limitation_en:
            'The 60.54% reduction figure is a real ICAR-published trial result, reached via a research subagent\'s search/fetch rather than a direct page read by this session, and the trial location was Rajasthan, not Andhra Pradesh. Marked provisional (not verified) because the exact NSKE concentration used in that trial was not independently confirmed, and the result has not been shown to replicate under AP growing conditions. Confirm current local guidance with RBK/VAA.',
          limitation_te:
            '60.54% తగ్గుదల అంకె నిజమైన ICAR-ప్రచురిత ట్రయల్ ఫలితం, దీన్ని ఒక పరిశోధన సబ్ ఏజెంట్ శోధన ద్వారా చేరుకుంది, ఈ సెషన్ నేరుగా పేజీని చదవలేదు; ట్రయల్ రాజస్థాన్‌లో జరిగింది, ఆంధ్రప్రదేశ్‌లో కాదు. దీన్ని తాత్కాలికంగా (ధృవీకరించినదిగా కాకుండా) గుర్తించడానికి కారణం — ట్రయల్‌లో వాడిన ఖచ్చితమైన NSKE గాఢతను స్వతంత్రంగా ధృవీకరించలేదు, మరియు ఈ ఫలితం AP వ్యవసాయ పరిస్థితుల్లో పునరావృతమవుతుందని చూపలేదు. ప్రస్తుత స్థానిక మార్గదర్శకత్వం కోసం RBK/VAA ని సంప్రదించండి.',
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
      name_te: 'కత్తెర పురుగు',
      pathogenOrVector_en: 'Invasive Pest: Spodoptera frugiperda (J.E. Smith)',
      pathogenOrVector_te: 'కీటకం: స్పోడోప్టెరా ఫ్రూగిపెర్డా (కత్తెర పురుగు)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Pinholes and ragged "window-pane" feeding marks on young leaves.',
        'Heavy sawdust-like fecal frass accumulation inside the leaf whorl.',
        'Destruction of growing central shoot.',
      ],
      observableSymptoms_te: [
        'లేత ఆకులపై చిన్న రంధ్రాలు మరియు కిటికీల వంటి చారలు ఉంటాయి.',
        'ఆకు సుడులలో రంపపు పొట్టు వంటి పురుగు విసర్జితాలు పేరుకుపోతాయి.',
        'మధ్య మొవ్వును తిని నాశనం చేస్తుంది.',
      ],
      affectedParts: ['Whorl', 'Leaves', 'Tassels', 'Cobs'],
      similarConditions: [
        {
          id: 'maize-stem-borer',
          name_en: 'Spotted Stem Borer (Chilo partellus / Pest)',
          name_te: 'కాండం తొలిచే పురుగు (చిలో పార్టెల్లస్)',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer larvae bore into stems leaving neat circular entry holes and linear pinhole series across leaves; Fall Armyworm causes large ragged windowpane leaf tearing with heavy sawdust-like fecal frass deep inside the whorl.',
          differentiatingFactors_te:
            'కాండం తొలిచే పురుగు ఆకులపై వరుసగా గుండుసూది రంధ్రాలు, కాండంలోకి శుభ్రమైన రంధ్రాలు చేస్తుంది; లద్దె పురుగు (FAW) ఆకులను పెద్ద పెద్ద రంపపు రంధ్రాలుగా తిని, సుడిలో భారీగా రంపపు పొట్టు వంటి విసర్జితాలను వదులుతుంది.',
        },
        {
          id: 'maize-grasshopper-damage',
          name_en: 'Grasshopper / Armyworm Leaf Defoliation (Pest)',
          name_te: 'మిడతలు / సాధారణ లద్దె పురుగు ఆకు నష్టం',
          isPathological: true,
          differentiatingFactors_en:
            'Grasshoppers chew irregularly from outside leaf margins inward on older leaves; Fall Armyworm feeds concealed inside the central tender whorl.',
          differentiatingFactors_te:
            'మిడతలు పాత ఆకుల బయటి అంచుల నుండి లోపలికి తింటాయి; FAW మాత్రం లేత సుడి లోపల చేరి రక్షణ పొందుతూ తీవ్ర నష్టం కలిగిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: ['Warm humid weather during early whorl vegetative stage.'],
      environmentalRiskFactors_te: ['మొక్క లేత దశలో వెచ్చని, తేమతో కూడిన వాతావరణం.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Deep summer ploughing to expose pupae; install pheromone traps @ 5/acre.',
          practice_te: 'వేసవిలో లోతు దుక్కులు చేయండి; ఎకరానికి 5 లింగాకర్షక బుట్టలు అమర్చండి.',
        },
      ],
      treatments: [
        {
          id: 't-maize-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Apply dry sand + slaked lime mixture (9:1 ratio) @ 10-15 g directly into central seedling whorls to mechanically abrade caterpillar cuticle and deter feeding. Chemical spray guidance is suppressed pending primary CIBRC label validation.',
          instruction_te:
            'సుడిలో ఇసుక + సున్నం మిశ్రమం (9:1) వేసి పురుగులను యాంత్రికంగా అరికట్టండి. ప్రాథమిక లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు రసాయన సిఫార్సులు నిలిపివేయబడ్డాయి.',
          activeIngredient_en: 'Sand + Lime (9:1) Physical Deterrent (Chemical sprays suppressed)',
          activeIngredient_te: 'ఇసుక + సున్నం (9:1) భౌతిక నివారణ (రసాయనాలు నిలిపివేయబడ్డాయి)',
          safetyCaution_en:
            'Wear protective dust mask and gloves while preparing and applying lime mixture to avoid skin/eye irritation.',
          safetyCaution_te:
            'సున్నం కలిపేటప్పుడు చర్మం, కళ్లకు రక్షణగా చేతి తొడుగులు, మాస్క్ ధరించండి.',
          regulatoryNotice_en:
            'Actionable synthetic chemical pesticide recommendations are suppressed pending primary CIBRC registration excerpt verification. Consult local Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'రసాయన మందుల సిఫార్సులు అధికారిక CIBRC పరిశీలనలో ఉన్నాయి. స్థానిక రైతు భరోసా కేంద్రం (RBK) ని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Escalate to RBK if more than 10% of seedling plants show central whorl damage.',
      escalationThreshold_te: '10% కంటే ఎక్కువ మొక్కల సుడులు దెబ్బతింటే రైతు భరోసా కేంద్రం (RBK) ను సంప్రదించండి.',
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
      name_te: 'ఎర్ర కుళ్ళు తెగులు',
      pathogenOrVector_en: 'Fungus: Colletotrichum falcatum',
      pathogenOrVector_te: 'శిలీంద్రం: కొల్లెటోట్రైకం ఫాల్కాటం',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Discoloration and drying of upper leaves/crown.',
        'Reddening of internal stalk pith with characteristic white cross-bands when cane is split longitudinally.',
        'Sour alcohol-like fermentation odor from affected canes.',
      ],
      observableSymptoms_te: [
        'పై ఆకులు ఎండిపోయి రాలిపోతాయి.',
        'గడను నిలువుగా చీల్చినపుడు లోపలి భాగం ఎర్రబడి అడ్డంగా తెల్లటి మచ్చలు కనిపిస్తాయి.',
        'సోకిన గడల నుండి పులిసిన ఆల్కహాల్ వాసన వస్తుంది.',
      ],
      affectedParts: ['Stalk', 'Internal Pith', 'Crown Leaves'],
      similarConditions: [
        {
          id: 'sugarcane-wilt',
          name_en: 'Sugarcane Wilt (Fusarium sacchari / Pathogen)',
          name_te: 'చెరకు వడలు తెగులు (ఫ్యుసేరియం)',
          isPathological: true,
          differentiatingFactors_en:
            'Wilt causes diffuse, uniform reddish-yellow discoloration in stalk pith without transverse white patches or alcoholic fermentation odor; Red Rot causes deep red internal pith with distinct white cross-bands and a sharp sour alcoholic odor.',
          differentiatingFactors_te:
            'విల్ట్ తెగులులో కాండం లోపల అడ్డంగా తెల్లటి మచ్చలు లేదా ఆల్కహాల్ వాసన లేకుండా లేత ఎరుపు రంగు కనిపిస్తుంది; ఎర్ర కుళ్ళు తెగులులో ముదురు ఎరుపు కాండం మధ్య అడ్డంగా తెల్లటి మచ్చలు మరియు పులిసిన ఆల్కహాల్ వాసన ఉంటాయి.',
        },
        {
          id: 'sugarcane-sett-rot',
          name_en: 'Pineapple Disease / Sett Rot (Ceratocystis paradoxa / Pathogen)',
          name_te: 'పైనాపిల్ తెగులు (విత్తన ముక్కల కుళ్ళు)',
          isPathological: true,
          differentiatingFactors_en:
            'Pineapple disease primarily rots planted seed setts turning pith sooty black with a sweet pineapple scent; Red Rot attacks standing mature cane stalks turning the internal pith red with white bands.',
          differentiatingFactors_te:
            'పైనాపిల్ తెగులు విత్తన ముక్కలకు సోకి లోపల నల్లబడి పైనాపిల్ సువాసన వస్తుంది; ఎర్ర కుళ్ళు తెగులు నిలబడిన గడల లోపలి భాగంలో ఎరుపు మరియు తెలుపు చారలను కలిగిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: ['Waterlogged conditions, high soil moisture in coastal Andhra.'],
      environmentalRiskFactors_te: ['తీరప్రాంతాల్లో మురుగునీరు నిలవడం, అధిక తేమ.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant certified disease-free setts; use resistant varieties; avoid ratoon crops in infested fields.',
          practice_te: 'ఆరోగ్యకరమైన విత్తన ముక్కలను వాడండి; తెగులు సోకిన పొలాల్లో మోడు సాగు నివారించండి.',
        },
      ],
      treatments: [
        {
          id: 't-sugarcane-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'Uproot and burn diseased clumps immediately to prevent soil-borne spread. Use only certified disease-free setts for planting; never re-plant cane from an infested field. Chemical sett-dip dose recommendations are suppressed pending primary CIBRC label verification.',
          instruction_te:
            'తెగులు సోకిన దుబ్బులను వెంటనే పీకి కాల్చండి, తద్వారా నేల ద్వారా వ్యాప్తి చెందకుండా నిరోధించవచ్చు. నాటడానికి ధృవీకరించిన ఆరోగ్యకరమైన విత్తన ముక్కలను మాత్రమే వాడండి; తెగులు సోకిన పొలం నుండి తీసిన గడలను తిరిగి నాటవద్దు. రసాయన విత్తన శుద్ధి మోతాదు సిఫార్సులు CIBRC లేబుల్ పరిశీలన పూర్తయ్యే వరకు నిలిపివేయబడ్డాయి.',
          activeIngredient_en: 'Cultural Practice: Clump Removal + Certified Setts (Chemical sett-dip dose suppressed)',
          activeIngredient_te: 'సాంప్రదాయ పద్ధతి: దుబ్బు తొలగింపు + ధృవీకరించిన విత్తనం (రసాయన మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves when uprooting and handling diseased clumps; wash hands thoroughly afterward. Burn or bury removed material away from irrigation channels.',
          safetyCaution_te:
            'తెగులు సోకిన దుబ్బులను తొలగించేటప్పుడు రక్షణ చేతి తొడుగులు ధరించండి; తర్వాత చేతులను శుభ్రంగా కడుక్కోండి. తొలగించిన పదార్థాన్ని కాలువలకు దూరంగా కాల్చండి లేదా పూడ్చండి.',
          regulatoryNotice_en:
            'Red rot is internal and systemic; it cannot be cured by standing foliar chemical sprays. Actionable synthetic fungicide sett-dip dosage is suppressed until verified directly against a primary CIBRC registration label for sugarcane red rot. Consult local Rythu Bharosa Kendra (RBK) or sugarcane factory agriculture officer for the current approved sett-treatment product and dose.',
          regulatoryNotice_te:
            'ఎర్ర కుళ్ళు తెగులు అంతర్గత, సిస్టమిక్ తెగులు; పైరుపై పిచికారీతో నయం కాదు. రసాయన విత్తన శుద్ధి మోతాదు సిఫార్సు CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK లేదా చెరకు ఫ్యాక్టరీ వ్యవసాయ అధికారిని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Report red rot outbreaks to local sugarcane factory agriculture officers and RBK.',
      escalationThreshold_te: 'ఎర్ర కుళ్ళు తెగులు గమనించిన వెంటనే చెరకు ఫ్యాక్టరీ వ్యవసాయ అధికారులకు మరియు RBK కి తెలియజేయండి.',
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
      name_te: 'తొలి దశ ఆకు మచ్చ తెగులు',
      pathogenOrVector_en: 'Fungus: Alternaria solani',
      pathogenOrVector_te: 'శిలీంద్రం: ఆల్టర్నేరియా సొలాని',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Concentric dark brown circular rings (target-board appearance) on older lower leaves.',
        'Yellowing of foliage surrounding concentric lesions followed by leaf drop.',
        'Dark sunken leathery cankers on stems and fruit calyx.',
      ],
      observableSymptoms_te: [
        'క్రింది పాత ఆకులపై గుండ్రని ముదురు గోధుమ వలయాలు (టార్గెట్ బోర్డు వలె) కనిపిస్తాయి.',
        'మచ్చల చుట్టూ ఆకులు పసుపు రంగులోకి మారి రాలిపోతాయి.',
        'కాండం మరియు కాయల తొడిమల వద్ద లోతైన నల్లటి పుండ్లు ఏర్పడతాయి.',
      ],
      affectedParts: ['Lower Leaves', 'Stems', 'Fruit Calyx'],
      similarConditions: [
        {
          id: 'tomato-late-blight',
          name_en: 'Late Blight (Phytophthora infestans / Pathogen)',
          name_te: 'లేట్ బ్లైట్ (మలి దశ ఆకు మాకుడు తెగులు)',
          isPathological: true,
          differentiatingFactors_en:
            'Late blight produces rapid water-soaked greenish-black irregular patches without concentric rings, developing delicate white fungal down on lower leaf surfaces in moist cool weather; Early blight produces dry brown circular lesions with distinct target-board concentric rings primarily on older lower leaves.',
          differentiatingFactors_te:
            'లేట్ బ్లైట్ మచ్చలు నీరు పట్టినట్లు నల్లగా, వలయాలు లేకుండా ఉండి చల్లని తేమ వాతావరణంలో ఆకు వెనుక బూజు ఉంటుంది; ఎర్లీ బ్లైట్ పొడి గోధుమ రంగులో స్పష్టమైన టార్గెట్ బోర్డు వంటి ఏకకేంద్ర వలయాలను క్రింది ఆకులపై కలిగి ఉంటుంది.',
        },
        {
          id: 'tomato-septoria-spot',
          name_en: 'Septoria Leaf Spot (Septoria lycopersici / Pathogen)',
          name_te: 'సెప్టోరియా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Septoria spots are small (2-3 mm) and numerous with whitish-gray centers and tiny black fruiting bodies (pycnidia); Early blight lesions are larger (5-15 mm) with pronounced target rings.',
          differentiatingFactors_te:
            'సెప్టోరియా మచ్చలు చిన్నవిగా (2-3 మి.మీ.) బూడిద రంగు కేంద్రం మరియు నల్లటి చుక్కలతో ఉంటాయి; ఎర్లీ బ్లైట్ మచ్చలు పెద్దవిగా (5-15 మి.మీ.) ఏకకేంద్ర వలయాలతో ఉంటాయి.',
        },
      ],
      environmentalRiskFactors_en: ['Warm humid weather alternating with dry spells in Chittoor district.'],
      environmentalRiskFactors_te: ['చిత్తూరు జిల్లాలో తేమ మరియు ఎండలు మారుతూ వచ్చే వాతావరణం.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Remove lower foliage touching soil; use mulch to prevent soil splashing onto leaves.',
          practice_te: 'నేలకు తగిలే క్రింది ఆకులను తుంచండి; నేల నుండి నీరు ఎగరవకుండా మల్చింగ్ వాడండి.',
        },
      ],
      treatments: [
        {
          id: 't-tomato-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem-based biopesticide formulations and bio-agent Trichoderma viride are commonly used against early leaf spotting, but a specific dose is suppressed pending primary CIBRC/university label verification. Chemical fungicide spray recipes are likewise suppressed pending primary CIBRC label verification. Consult local Rythu Bharosa Kendra (RBK) or Horticulture Officer for the currently approved product and dose.',
          instruction_te:
            'వేప ఆధారిత బయోపెస్టిసైడ్ మరియు ట్రైకోడెర్మా విరిడె ఆకు మచ్చలకు సాధారణంగా వాడతారు, కానీ నిర్దిష్ట మోతాదు CIBRC/విశ్వవిద్యాలయ లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. రసాయన సిఫార్సులు కూడా అదే కారణంతో నిలిపివేయబడ్డాయి. ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
          activeIngredient_en: 'Neem-based biopesticide / Trichoderma viride (dose suppressed pending verification; chemical sprays suppressed)',
          activeIngredient_te: 'వేప ఆధారిత బయోపెస్టిసైడ్ / ట్రైకోడెర్మా విరిడె (మోతాదు మరియు రసాయనాలు నిలిపివేయబడ్డాయి)',
          safetyCaution_en:
            'Avoid spraying during high winds or midday heat. Wear basic protective mask.',
          safetyCaution_te:
            'ఎండ తీవ్రంగా ఉన్నప్పుడు పిచికారీ చేయవద్దు. రక్షణ మాస్క్ ధరించండి.',
          regulatoryNotice_en:
            'Both the biopesticide dose and the chemical fungicide recommendations for tomato early blight are suppressed until verified directly against a primary CIBRC/university registration label. Consult local Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'టమాట ఎర్లీ బ్లైట్ కు బయోపెస్టిసైడ్ మోతాదు మరియు రసాయన సిఫార్సులు రెండూ CIBRC/విశ్వవిద్యాలయ పరిశీలనలో ఉన్నందున నిలిపివేయబడ్డాయి. స్థానిక RBK ని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Consult RBK if blighting reaches upper leaves and fruit clusters.',
      escalationThreshold_te: 'మచ్చలు పై ఆకులకు, కాయలకు పాకినప్పుడు RBK ని సంప్రదించండి.',
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
      name_te: 'ఆంత్రాక్నోస్ (మచ్చ తెగులు)',
      pathogenOrVector_en: 'Fungus: Colletotrichum gloeosporioides',
      pathogenOrVector_te: 'శిలీంద్రం: కొల్లెటోట్రైకం గ్లోయోస్పోరియాయిడ్స్',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Dark brown to black speckling on panicles/blossoms causing blossom blight and flower drop.',
        'Irregular dark brown leaf spots with necrotic centers.',
        'Sunken black circular lesions on maturing fruits that tear and rot during transit.',
      ],
      observableSymptoms_te: [
        'పూతపై నల్లటి చిన్న మచ్చలు ఏర్పడి పూత మాడి రాలిపోతుంది.',
        'ఆకులపై క్రమరహిత ముదురు గోధుమ మచ్చలు ఏర్పడతాయి.',
        'కాయలపై నల్లటి లోతైన గుండ్రని మచ్చలు పడి కుళ్ళిపోతాయి.',
      ],
      affectedParts: ['Inflorescence / Panicles', 'Foliage / Leaves', 'Fruits'],
      similarConditions: [
        {
          id: 'mango-powdery-mildew',
          name_en: 'Powdery Mildew (Oidium mangiferae / Pathogen)',
          name_te: 'బూడిద తెగులు (ఓయిడియం మాంగిఫెరే)',
          isPathological: true,
          differentiatingFactors_en:
            'Powdery mildew covers floral panicles and young leaves with white superficial powdery fungal growth causing blossom drop without lesions; Anthracnose produces distinct dark brown necrotic specks and sunken black necrotic spots on flowers and fruit without powdery white coating.',
          differentiatingFactors_te:
            'బూడిద తెగులు పూత మరియు లేత ఆకులపై తెల్లటి బూడిద వంటి పొరను ఏర్పరుస్తుంది; ఆంత్రాక్నోస్ పూతపై నల్లటి మచ్చలు మరియు కాయలపై లోతైన నల్లటి పుండ్లను తెల్లటి బూడిద లేకుండా కలిగిస్తుంది.',
        },
        {
          id: 'mango-bacterial-canker',
          name_en: 'Bacterial Canker (Xanthomonas citri pv. mangiferaeindicae / Pathogen)',
          name_te: 'బాక్టీరియల్ కాంకర్ (నల్ల మచ్చ తెగులు)',
          isPathological: true,
          differentiatingFactors_en:
            'Bacterial canker forms water-soaked, angular black leaf lesions with gummy exudate and star-shaped longitudinal cracks on fruit; Anthracnose produces circular, sunken tear-stain lesions without star-shaped cracks.',
          differentiatingFactors_te:
            'బాక్టీరియల్ కాంకర్ ఆకులపై జిగురుతో కూడిన కోణీయ మచ్చలు మరియు కాయలపై నక్షత్ర ఆకారపు పగుళ్లను కలిగిస్తుంది; ఆంత్రాక్నోస్ కాయలపై కన్నీటి చారల వంటి గుండ్రని లోతైన మచ్చలను కలిగిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: ['Unseasonal rains or heavy fog during mango flowering (Dec-Feb).'],
      environmentalRiskFactors_te: ['మామిడి పూత దశలో (డిసెంబర్-ఫిబ్రవరి) అకాల వర్షాలు లేదా తీవ్రమైన పొగమంచు.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Prune dead and interlocking branches after harvest; destroy infected fallen foliage and twigs.',
          practice_te: 'కోత పూర్తయిన తర్వాత ఎండిన కొమ్మలను కత్తిరించండి; కింద పడిన ఆకులను నాశనం చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-mango-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bordeaux mixture (copper sulphate + lime) is a traditional pre-bloom spray used on pruned branch cuts against anthracnose, but a specific concentration/dose is suppressed pending primary CIBRC/university label verification. Synthetic chemical fungicide recipes are likewise suppressed pending primary CIBRC registration label validation. Consult local RBK or Horticulture Officer for the currently approved concentration and timing.',
          instruction_te:
            'బోర్డో మిశ్రమం (మైలుతుత్తం + సున్నం) కొమ్మలు కత్తిరించిన భాగాలపై పూతకు ముందు వాడే సంప్రదాయ పద్ధతి, కానీ నిర్దిష్ట గాఢత/మోతాదు CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. రసాయన సిఫార్సులు కూడా అదే కారణంతో నిలిపివేయబడ్డాయి. ఆమోదించిన గాఢత మరియు సమయం కోసం స్థానిక RBK లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
          activeIngredient_en: 'Bordeaux Mixture: Copper Sulphate + Lime (concentration suppressed pending verification; synthetic chemical sprays suppressed)',
          activeIngredient_te: 'బోర్డో మిశ్రమం: మైలుతుత్తం + సున్నం (గాఢత మరియు రసాయనాలు నిలిపివేయబడ్డాయి)',
          safetyCaution_en:
            'Do not spray during full bloom / peak pollinator bee activity to avoid bee mortality. Wear eye protection and gloves.',
          safetyCaution_te:
            'తేనెటీగలకు హాని కలగకుండా పూర్తి పూత దశలో పిచికారీ చేయవద్దు. కంటి రక్షణ, చేతి తొడుగులు ధరించండి.',
          regulatoryNotice_en:
            'Both the Bordeaux mixture concentration and any synthetic chemical pesticide recommendation are suppressed pending primary CIBRC/university registration excerpt verification. Consult local Rythu Bharosa Kendra (RBK) or Horticulture Officer.',
          regulatoryNotice_te:
            'బోర్డో మిశ్రమం గాఢత మరియు రసాయన మందుల సిఫార్సులు రెండూ అధికారిక CIBRC పరిశీలనలో ఉన్నందున నిలిపివేయబడ్డాయి. స్థానిక ఉద్యానవన అధికారిని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Seek advice if blossom blight exceeds 20% across orchard trees.',
      escalationThreshold_te: 'తోటలో 20% కంటే ఎక్కువ పూత మాడిపోతే వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
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
      name_te: 'పనామా వడలు తెగులు',
      pathogenOrVector_en: 'Soil-borne Fungus: Fusarium oxysporum f. sp. cubense',
      pathogenOrVector_te: 'నేల ద్వారా వ్యాపించే శిలీంద్రం: ఫ్యుసేరియం ఆక్సిస్పోరం',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Yellowing of lower leaves starting at the leaf margin and advancing inward.',
        'Leaves collapse at petiole junction and hang down skirt-like around pseudostem.',
        'Longitudinal splitting of pseudostem base; reddish-brown vascular discoloration inside corm.',
      ],
      observableSymptoms_te: [
        'క్రింది పాత ఆకుల అంచుల నుండి పసుపు రంగు ప్రారంభమై లోపలికి వ్యాపిస్తుంది.',
        'ఆకులు మొదలు వద్ద విరిగి కాండం చుట్టూ వేలాడతాయి.',
        'కాండం మొదట్లో నిలువు చీలికలు ఏర్పడతాయి, దుంప లోపలి నాళాలు ఎర్రగా/గోధుమ రంగుగా మారతాయి.',
      ],
      affectedParts: ['Lower Leaves', 'Pseudostem Base', 'Corm / Roots'],
      similarConditions: [
        {
          id: 'banana-moko-bacterial-wilt',
          name_en: 'Bacterial Wilt / Moko Disease (Ralstonia solanacearum / Pathogen)',
          name_te: 'బాక్టీరియల్ వడలు / మోకో తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Cut vascular strands of Moko disease ooze milky bacterial streaming when placed in clean water and infect young suckers first; Panama wilt causes reddish-brown vascular discolouration inside the corm without bacterial streaming in water and primarily wilts older outer leaves first.',
          differentiatingFactors_te:
            'మోకో బాక్టీరియల్ తెగులు సోకిన కాండాన్ని నీటిలో పెడితే తెల్లటి బాక్టీరియా ఊట బయటకు వస్తుంది; పనామా విల్ట్‌లో నాళాలు ఎర్రగా/గోధుమ రంగుగా మారతాయి కానీ నీటిలో బాక్టీరియా ఊట రాదు, పాత ఆకులు ముందుగా వడలిపోతాయి.',
        },
        {
          id: 'banana-potassium-deficiency',
          name_en: 'Potassium Deficiency (Abiotic Nutritional Stress)',
          name_te: 'పొటాషియం లోపం (పోషక లోపం)',
          isPathological: false,
          differentiatingFactors_en:
            'Potassium deficiency causes rapid yellowing and necrosis of older leaf tips and margins that curl inward, but inner pseudostem and corm vascular strands remain completely clean and white without discolouration.',
          differentiatingFactors_te:
            'పొటాషియం లోపం వల్ల పాత ఆకుల అంచులు పసుపు పచ్చగా మారి ఎండిపోతాయి, కానీ కాండం లోపలి నాళాలు ఆరోగ్యంగా తెల్లగానే ఉంటాయి (రంగు మారవు).',
        },
      ],
      environmentalRiskFactors_en: ['Acidic to neutral soil with poor drainage; flood irrigation.'],
      environmentalRiskFactors_te: ['మురుగునీటి సదుపాయం లేని నేలలు, వరద పద్ధతిలో నీరు పెట్టడం.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant certified disease-free tissue culture plantlets; avoid suckers from infected plantations.',
          practice_te: 'ధృవీకరించబడిన టిష్యూ కల్చర్ మొక్కలను మాత్రమే వాడండి; తెగులు సోకిన తోటల పిలకలను నాటవద్దు.',
        },
      ],
      treatments: [
        {
          id: 't-banana-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride / T. reesei enriched neem cake incorporated at planting is commonly used to promote competitive rhizosphere bio-suppression, but a specific dose (e.g. quantity per pit) is suppressed pending primary CIBRC/university label verification — consult local RBK or Horticulture Officer for the currently recommended quantity. This remains secondary to biosecurity: chemical fungicide drenches (e.g. Carbendazim) are scientifically ineffective against Fusarium TR4 and are strictly suppressed regardless of dose.',
          instruction_te:
            'నాటేటప్పుడు ట్రైకోడెర్మా కలిపిన వేప పిండిని గుంతలో వేయడం సాధారణ పద్ధతి, కానీ నిర్దిష్ట మోతాదు (గుంతకు పరిమాణం) CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది — ప్రస్తుత సిఫార్సు మోతాదు కోసం స్థానిక RBK లేదా ఉద్యానవన అధికారిని సంప్రదించండి. ఇది జీవభద్రత కంటే ద్వితీయమైనది: ఫ్యుసేరియం విల్ట్ (TR4) కు రసాయన మందులు (ఉదా. కార్బెండజిమ్) పనిచేయవు, కావున మోతాదుతో సంబంధం లేకుండా రసాయన సిఫార్సులు నిలిపివేయబడ్డాయి.',
          activeIngredient_en: 'Trichoderma viride Bio-agent + Neem Cake (dose suppressed pending verification; chemical drenching suppressed as scientifically ineffective)',
          activeIngredient_te: 'ట్రైకోడెర్మా విరిడె + వేప పిండి (మోతాదు నిలిపివేయబడింది; రసాయన తడపడం నిష్ప్రయోజనం కావున నిలిపివేయబడింది)',
          safetyCaution_en:
            'Biocontrol amendment; handle with clean gloves. Never transport soil, tools, or water from infected mats to healthy banana blocks.',
          safetyCaution_te:
            'చేతి తొడుగులు ధరించండి. తెగులు సోకిన గుంతల మట్టిని లేదా పనిముట్లను ఇతర తోటల్లోకి తీసుకెళ్లవద్దు.',
          regulatoryNotice_en:
            'Critical Quarantine Notice: There is no approved or effective chemical curative fungicide for Panama wilt (Fusarium oxysporum f. sp. cubense TR4). Chemical drenching claims are disproven. Practice mandatory roguing with lime and strict biosecurity.',
          regulatoryNotice_te:
            'కీలకమైన హెచ్చరిక: పనామా విల్ట్ (TR4) కు రసాయన నివారణ మందులు లేవు. రసాయన సిఫార్సులు నిలిపివేయబడ్డాయి. సున్నం వేసి మొక్కలను నాశనం చేయడమే ఏకైక పరిష్కారం.',
        },
      ],
      escalationThreshold_en:
        'FUNGICIDES CANNOT CURE PANAMA WILT (TR4). Chemical claims are disproven. Immediately isolate infested plot, rogue infected clumps, apply 1-2 kg agricultural lime per pit, and consult RBK for biosecurity boundary enforcement.',
      escalationThreshold_te:
        'పనామా విల్ట్ కు రసాయన మందులు లేవు. వెంటనే తోటను వేరుచేసి, వ్యాధి సోకిన చెట్లను పీకి గుంతలో 1-2 కిలోల సున్నం వేసి RBK వ్యవసాయ సహాయకుడికి తెలియజేయండి.',
      claimEvidence: [
        {
          claimId: 'disease-banana-panamawilt-escalation-threshold',
          fieldRef: 'escalationThreshold_en/_te',
          verificationStatus: 'unsupported',
          sourceIndexes: [0],
          limitation_en:
            'The quarantine practice of roguing infected plants and treating the pit is not in dispute, but the exact lime quantity (1-2 kg per pit) is not confirmed against a specific page/section of the cited ICAR-NRCB technical guideline — only the organization homepage is linked. Confirm the exact quantity with your local RBK or Horticulture Officer.',
          limitation_te:
            'తెగులు సోకిన మొక్కలను తీసివేసి గుంతకు చికిత్స చేయడం అనే పద్ధతిపై సందేహం లేదు, కానీ సున్నం ఖచ్చితమైన పరిమాణం (గుంతకు 1-2 కిలోలు) ఉదహరించిన ICAR-NRCB సాంకేతిక మార్గదర్శిని యొక్క నిర్దిష్ట పేజీ/భాగంతో ధృవీకరించబడలేదు — సంస్థ వెబ్‌సైట్‌కు మాత్రమే లింక్ ఉంది. ఖచ్చితమైన పరిమాణాన్ని స్థానిక RBK లేదా ఉద్యానవన అధికారితో ధృవీకరించుకోండి.',
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
      name_te: 'దుంప కుళ్ళు తెగులు',
      pathogenOrVector_en: 'Fungi/Oomycete: Pythium aphanidermatum & Fusarium spp.',
      pathogenOrVector_te: 'శిలీంద్రం: పైథియం అఫానిడెర్మాటం & ఫ్యుసేరియం',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Water-soaked lesions at collar region of pseudostem near ground level.',
        'Leaves turn pale yellow and dry up from tips downward along margins.',
        'Rhizomes turn soft, decay, emit a foul odor, and easily pull out of the soil.',
      ],
      observableSymptoms_te: [
        'నేల మట్టం వద్ద కాండం భాగంలో నీరు పట్టిన మచ్చలు కనిపిస్తాయి.',
        'ఆకులు పసుపు రంగులోకి మారి చివర్ల నుండి ఎండిపోతాయి.',
        'దుంపలు మెత్తబడి కుళ్ళిపోయి దుర్వాసన వస్తాయి, లాగితే సులభంగా ఊడివస్తాయి.',
      ],
      affectedParts: ['Rhizome', 'Roots', 'Collar / Pseudostem'],
      similarConditions: [
        {
          id: 'turmeric-leaf-blotch',
          name_en: 'Leaf Blotch / Leaf Spot (Taphrina maculans / Pathogen)',
          name_te: 'ఆకు మచ్చ తెగులు (టాఫ్రినా)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf blotch forms hundreds of small rectangular or oval reddish-yellow spots on leaf blades while underground rhizomes remain firm, fibrous, and healthy; Rhizome rot attacks collar region causing decaying, foul-smelling, soft rhizomes that easily pull apart.',
          differentiatingFactors_te:
            'ఆకు మచ్చ తెగులు ఆకులపై మాత్రమే ఎరుపు-పసుపు మచ్చలను కలిగిస్తుంది, భూమిలోని దుంపలు గట్టిగా ఉంటాయి; దుంప కుళ్ళు తెగులులో దుంపలు మెత్తబడి, దుర్వాసన వచ్చి సులభంగా ఊడివస్తాయి.',
        },
        {
          id: 'turmeric-waterlogging-stress',
          name_en: 'Waterlogging & Poor Drainage Stagnation (Abiotic)',
          name_te: 'మురుగునీరు నిలవడం వల్ల కలిగే నష్టం (భౌతిక ఒత్తిడి)',
          isPathological: false,
          differentiatingFactors_en:
            'Water stagnation causes general leaf yellowing and temporary root suffocation without water-soaked rot lesions at the collar; Rhizome rot exhibits aggressive water-soaked basal collar decay and internal rhizome rot.',
          differentiatingFactors_te:
            'నీరు నిల్వ ఉండటం వల్ల ఆకులు సాధారణంగా పసుపు రంగులోకి మారతాయి; దుంప కుళ్ళు తెగులులో కాండం మొదట్లో నీరు పట్టిన నల్లటి మచ్చలు మరియు దుంపల కుళ్ళు స్పష్టంగా ఉంటాయి.',
        },
      ],
      environmentalRiskFactors_en: ['Water stagnation in heavy soils during heavy southwest monsoons.'],
      environmentalRiskFactors_te: ['భారీ వర్షాల సమయంలో పొలంలో నీరు నిలవడం, నల్లరేగడి నేలలు.'],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Provide raised beds (15 cm height) with adequate drainage channels; treat seed rhizomes before sowing.',
          practice_te: '15 సెం.మీ. ఎత్తైన బోదెలు వేసి మురుగునీటి కాలువలు తీయండి; నాటేముందు విత్తన దుంపలను శుద్ధి చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-turmeric-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Bio-agent Trichoderma asperellum seed-rhizome coating and neem cake soil incorporation are commonly used against rhizome rot, but specific doses are suppressed pending primary CIBRC/university label verification. Chemical fungicide drench recipes are likewise suppressed pending primary CIBRC registration label validation. Consult local RBK or Horticulture Officer for currently approved products and doses.',
          instruction_te:
            'ట్రైకోడెర్మా అస్పెరెల్లమ్ దుంప శుద్ధి మరియు వేప పిండి నేలలో కలపడం దుంప కుళ్ళు తెగులుకు సాధారణంగా వాడతారు, కానీ నిర్దిష్ట మోతాదులు CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడ్డాయి. రసాయన సిఫార్సులు కూడా అదే కారణంతో నిలిపివేయబడ్డాయి. ఆమోదించిన ఉత్పత్తులు మరియు మోతాదుల కోసం స్థానిక RBK లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
          activeIngredient_en: 'Trichoderma asperellum + Neem Cake (doses suppressed pending verification; chemical drenching suppressed)',
          activeIngredient_te: 'ట్రైకోడెర్మా అస్పెరెల్లమ్ + వేప పిండి (మోతాదులు మరియు రసాయనాలు నిలిపివేయబడ్డాయి)',
          safetyCaution_en:
            'Eco-friendly biocontrol treatment; wear basic gloves during rhizome coating.',
          safetyCaution_te:
            'పర్యావరణ హితమైన బయో ఏజెంట్; దుంపల శుద్ధి సమయంలో చేతి తొడుగులు ధరించండి.',
          regulatoryNotice_en:
            'Both the bio-agent/neem cake doses and any synthetic chemical drenching recommendation are suppressed pending primary CIBRC/university registration excerpt verification. Consult local Rythu Bharosa Kendra (RBK) or Horticulture Officer.',
          regulatoryNotice_te:
            'బయో-ఏజెంట్/వేప పిండి మోతాదులు మరియు రసాయన మందుల సిఫార్సులు రెండూ CIBRC పరిశీలనలో ఉన్నందున నిలిపివేయబడ్డాయి. స్థానిక ఉద్యానవన అధికారిని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Contact local Horticultural Officer if rot patches appear in more than 5% of beds.',
      escalationThreshold_te: '5% కంటే ఎక్కువ మడులలో దుంప కుళ్ళు కనిపిస్తే ఉద్యానవన అధికారిని సంప్రదించండి.',
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
      name_te: 'వేరుశనగ తుప్పు తెగులు',
      pathogenOrVector_en: 'Fungus: Puccinia arachidis',
      pathogenOrVector_te: 'శిలీంద్రం: పుక్సీనియా అరాచిడిస్',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, raised, orange to reddish-brown pustules (uredinia) on the lower leaf surface, which rupture and release a dusty orange spore mass that sticks to fingers when rubbed.',
        'Corresponding pale yellow spots on the upper leaf surface directly above each pustule.',
        'Severe infection causes premature drying and shedding of leaves, often together with Tikka leaf spot on the same plant.',
      ],
      observableSymptoms_te: [
        'ఆకుల అడుగు భాగంలో చిన్న చిన్న ఎరుపు-గోధుమ రంగు బొబ్బలు (పస్ట్యూల్స్) ఏర్పడి, తాకినప్పుడు పొడి రూపంలో ఎరుపు రంగు బీజాలు చేతికి అంటుకుంటాయి.',
        'ప్రతి బొబ్బకు పైభాగాన ఆకు పై తలంపై లేత పసుపు రంగు మచ్చ కనిపిస్తుంది.',
        'తీవ్రమైతే ఆకులు ముందుగానే ఎండి రాలిపోతాయి, తరచూ టిక్కా ఆకుమచ్చ తెగులుతో కలిసి కనిపిస్తుంది.',
      ],
      affectedParts: ['Leaves (lower surface)', 'Petioles', 'Stems (severe cases)'],
      similarConditions: [
        {
          id: 'groundnut-tikka-leafspot',
          name_en: 'Tikka Leaf Spot (Cercospora/Phaeoisariopsis spp. / Pathogen)',
          name_te: 'టిక్కా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Tikka spots are flat, circular, reddish-brown to black lesions that do not rupture or release powder when rubbed; rust pustules are raised, rupture under light pressure, and leave an orange powdery residue on fingers.',
          differentiatingFactors_te:
            'టిక్కా మచ్చలు చదునుగా, గుండ్రంగా ఉండి రుద్దినా పొడి రాదు; తుప్పు తెగులు బొబ్బలు ఉబ్బెత్తుగా ఉండి తేలికగా పగిలి ఎరుపు పొడిని వదులుతాయి.',
        },
        {
          id: 'groundnut-spider-mite-damage',
          name_en: 'Spider Mite Damage (Tetranychus spp. / Pest)',
          name_te: 'సాలీడు నల్లి నష్టం (పెస్ట్)',
          isPathological: true,
          differentiatingFactors_en:
            'Spider mite damage shows fine stippled yellow-bronze speckling and faint webbing on leaf undersides, with no raised pustules or spore powder; rust produces discrete raised pustules that release powder on rubbing.',
          differentiatingFactors_te:
            'సాలీడు నల్లి సోకినప్పుడు ఆకు అడుగున సన్నని పసుపు-కంచు రంగు చుక్కలు, నూలు పోగుల వంటి గూడు కనిపిస్తాయి, బొబ్బలు ఉండవు; తుప్పు తెగులులో ప్రత్యేకమైన బొబ్బలు ఉండి పొడిని వదులుతాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'High relative humidity with moderate temperatures (20-25°C) during the later crop growth stages.',
        'Dense canopy with poor air circulation; continuous rainfed groundnut cultivation without rotation.',
      ],
      environmentalRiskFactors_te: [
        'పంట చివరి దశలో ఎక్కువ తేమ, మోస్తరు ఉష్ణోగ్రతలు (20-25°C) ఉండటం.',
        'దట్టమైన పైరు, గాలి ప్రసరణ తక్కువగా ఉండటం; పంట మార్పిడి లేకుండా వరుసగా వేరుశనగ సాగు చేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Follow crop rotation with cereals (bajra, jowar, maize) rather than continuous groundnut, and use locally recommended tolerant varieties where available.',
          practice_te: 'వరుసగా వేరుశనగ వేయకుండా సజ్జ, జొన్న లేదా మొక్కజొన్నతో పంట మార్పిడి చేయండి; అందుబాటులో ఉంటే తెగులును తట్టుకునే రకాలను వాడండి.',
          targetTiming: 'Pre-season planning',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid overcrowded sowing; maintain recommended plant spacing to improve canopy air circulation and reduce humidity build-up.',
          practice_te: 'మొక్కల మధ్య సిఫార్సు చేసిన ఎడం పాటించండి, పైరు గుంపుగా ఉండకుండా చూడండి; తద్వారా తేమ పేరుకోవడం తగ్గుతుంది.',
          targetTiming: 'Sowing',
        },
      ],
      treatments: [
        {
          id: 't-groundnut-rust-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'A 2024 ANGRAU/ICRISAT-linked demonstration in Nellore district (AP) recorded rust severity at 16% under farmer practice versus 5% in fungicide-treated demonstration plots — showing that timely fungicide spraying is effective, but the source summary available to this tool did not name the specific fungicide product or its dose used in that demonstration. Mancozeb and Tebuconazole-class fungicides, already listed on the Tikka leaf spot entry for this same crop, are also commonly discussed for combined leaf-spot-and-rust control, but their dose remains suppressed there for the same reason. Do not infer a dose from the 16%-vs-5% figure — it describes an outcome, not a label rate. Consult your local RBK/VAA for the current approved product and dose before spraying.',
          instruction_te:
            '2024లో నెల్లూరు జిల్లాలో (AP) జరిగిన ANGRAU/ICRISAT అనుబంధ ప్రదర్శనలో, రైతు పద్ధతిలో తుప్పు తెగులు తీవ్రత 16% ఉండగా, శిలీంద్రనాశిని వాడిన ప్రదర్శన ప్లాట్లలో 5% మాత్రమే ఉంది — సకాలంలో మందు పిచికారీ ప్రభావవంతంగా పనిచేస్తుందని ఇది చూపిస్తుంది, కానీ ఏ నిర్దిష్ట మందు, ఎంత మోతాదు వాడారో ఈ మూలంలో పేర్కొనలేదు. ఈ పంటకే టిక్కా ఆకు మచ్చ తెగులు విభాగంలో పేర్కొన్న మాంకోజెబ్/టెబుకొనజోల్ వర్గాలు తుప్పుకు కూడా కలిపి వాడటం సాధారణంగా చర్చించబడుతుంది, కానీ అక్కడ కూడా మోతాదు నిలిపివేయబడింది. 16%-వర్సెస్-5% అంకెల నుండి మోతాదును ఊహించవద్దు — అది ఫలితాన్ని మాత్రమే సూచిస్తుంది, లేబుల్ మోతాదును కాదు. పిచికారీకి ముందు ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK/VAA ని సంప్రదించండి.',
          activeIngredient_en: 'Mancozeb / Tebuconazole-class fungicides (same classes as Tikka leaf spot; dose suppressed — outcome data found, not a label rate)',
          activeIngredient_te: 'మాంకోజెబ్ / టెబుకొనజోల్ వర్గ శిలీంద్రనాశినులు (టిక్కా తెగులుకు వాడేవే; మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Avoid spraying during peak midday heat or strong wind. Wear mask and gloves during spray preparation and application. Follow the pre-harvest interval stated on the approved product label; verify with local RBK.',
          safetyCaution_te:
            'ఎండ తీవ్రంగా లేదా గాలి ఎక్కువగా ఉన్నప్పుడు పిచికారీ చేయవద్దు. మందు కలిపేటప్పుడు, పిచికారీ చేసేటప్పుడు మాస్క్, చేతి తొడుగులు ధరించండి. ఉత్పత్తి లేబుల్‌పై తెలిపిన కోత ముందస్తు నిరీక్షణ వ్యవధిని పాటించండి; స్థానిక RBK వద్ద ధృవీకరించుకోండి.',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. The 16%-vs-5% demonstration figure describes a result, not a dose — do not treat it as a spray rate. Confirm the current approved product and dose with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు ఆమోదించిన లేబుల్ చదవండి. 16%-వర్సెస్-5% అంకెలు ఫలితాన్ని మాత్రమే సూచిస్తాయి, మోతాదును కాదు. ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ధృవీకరించుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If rust pustules spread to the upper canopy leaves or combine with heavy Tikka leaf spot defoliation before pod-filling, contact your local Rythu Bharosa Kendra (RBK) promptly.',
      escalationThreshold_te:
        'తుప్పు తెగులు పైభాగపు ఆకులకు వ్యాపించినా, లేదా టిక్కా ఆకుమచ్చతో కలిసి కాయలు ఊరే దశకు ముందే ఆకులు రాలితే, వెంటనే స్థానిక రైతు భరోసా కేంద్రం (RBK) ని సంప్రదించండి.',
      sources: [
        {
          title: 'Groundnut foliar disease demonstration trial (rust severity, farmer practice vs. fungicide-treated plots), Nellore district, AP, 2024',
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
      name_te: 'మిరప తామర పురుగు (మోడ్చా/మర్దా తెగులు)',
      pathogenOrVector_en: 'Insect Pest: Thrips parvispinus (and other thrips species), part of the Murda sucking-pest complex',
      pathogenOrVector_te: 'కీటకం: తామర పురుగు (త్రిప్స్ పార్విస్పైనస్ తదితర జాతులు) — మోడ్చా/మర్దా రసం పీల్చే పురుగుల సముదాయంలో భాగం',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Upward curling of young leaves with silvery or bronze streaking and scarring along the undersides, concentrated near growing tips.',
        'Stunted, bushy, deformed new growth ("Murda"/malformation) with shortened internodes.',
        'Flower and young fruit drop under heavy infestation.',
      ],
      observableSymptoms_te: [
        'లేత ఆకులు పైకి ముడుచుకుని, అడుగుభాగాన వెండి/కంచు రంగు చారలతో కనిపిస్తాయి, ఇది మొగ్గల దగ్గర ఎక్కువగా ఉంటుంది.',
        'కొత్త చిగుళ్లు గిడసబారి, పొదలా మారి ("మోడ్చా/మర్దా") కణుపుల మధ్య దూరం తగ్గుతుంది.',
        'తీవ్రమైతే పూత మరియు లేత కాయలు రాలిపోతాయి.',
      ],
      affectedParts: ['Young Leaves', 'Growing Tips', 'Flowers', 'Young Fruit'],
      similarConditions: [
        {
          id: 'chilli-leafcurl-virus-lookalike',
          name_en: 'Chilli Leaf Curl Virus (Begomovirus / Pathogen)',
          name_te: 'మిరప ఆకు ముడుత వైరస్ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Thrips/Murda damage shows visible silvery-bronze scarring streaks on leaf undersides and boat-shaped upward curling concentrated at growing tips; leaf curl virus causes thickened, crinkled, vein-cleared foliage without the silvery scarring, and spreads to older leaves as well.',
          differentiatingFactors_te:
            'తామర పురుగు/మోడ్చా నష్టంలో ఆకు అడుగున వెండి-కంచు రంగు చారలు కనిపిస్తాయి, మొగ్గల దగ్గర పడవ ఆకారంలో ముడుచుకుంటాయి; వైరస్ తెగులులో ఈనెలు ఉబ్బి, దళసరిగా మారతాయి, వెండి చారలు ఉండవు, పాత ఆకులకు కూడా వ్యాపిస్తుంది.',
        },
        {
          id: 'chilli-nutrient-tipburn',
          name_en: 'Boron/Calcium Deficiency Tip Distortion (Abiotic Nutrient Stress)',
          name_te: 'బోరాన్/కాల్షియం లోపం వల్ల చిగురు వైకల్యం (పోషక లోపం)',
          isPathological: false,
          differentiatingFactors_en:
            'Nutrient-deficiency tip distortion causes brittle, thickened growing points without any silvery scarring or visible insects, and does not improve after an insecticide application; thrips damage shows the characteristic scarring and visible tiny insects when tapping affected shoots over white paper.',
          differentiatingFactors_te:
            'పోషక లోపం వల్ల చిగురు గట్టిగా, పెళుసుగా మారుతుంది, వెండి చారలు లేదా కీటకాలు కనిపించవు, కీటకనాశిని వాడినా మార్పు ఉండదు; తామర పురుగు నష్టంలో లక్షణ చారలు కనిపిస్తాయి, దెబ్బతిన్న చిగుళ్లను తెల్లకాగితంపై దులిపితే చిన్న పురుగులు కనిపిస్తాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather with low humidity, favoring rapid thrips population buildup.',
        'Continuous chilli cultivation near other thrips-host crops (onion, cotton) without a break crop.',
      ],
      environmentalRiskFactors_te: [
        'ఎండ, పొడి వాతావరణం, తక్కువ తేమ ఉండటం — తామర పురుగు సంతతి వేగంగా పెరగడానికి అనుకూలం.',
        'ఉల్లి, పత్తి వంటి తామర పురుగు ఆశ్రయించే పంటల పక్కనే వరుసగా మిరప సాగు చేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Install blue sticky traps (reported more attractive to thrips than yellow traps) at canopy level, in addition to yellow traps for whitefly, for early monitoring.',
          practice_te: 'తామర పురుగులను ముందుగానే గుర్తించడానికి తెల్లదోమకు వాడే పసుపు అట్టలతో పాటు నీలం రంగు జిగురు అట్టలను (తామరకు ఎక్కువ ఆకర్షణీయం) పైరు ఎత్తులో అమర్చండి.',
          targetTiming: 'Transplanting onward',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid excess nitrogen fertilizer, which produces soft, succulent growth that is more attractive to thrips.',
          practice_te: 'నత్రజని ఎరువు అధికంగా వేయవద్దు — ఇది మెత్తని లేత చిగురును పెంచి తామర పురుగులను ఆకర్షిస్తుంది.',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-chilli-thrips-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Krishna district (AP) IPM field study reported thrips/Murda incidence falling from 16.0% to 9.5% under an integrated management approach (combining practices such as traps, border crops, and timed sprays), and a January 2023 NBAIR survey independently documented this thrips species across Telangana and Andhra Pradesh fields. Neither source available to this tool specified the exact spray product or dose used to achieve that reduction. Neem-based (Azadirachtin) sprays are a commonly used organic option against thrips, but a specific dose is suppressed pending primary CIBRC/university label verification. Consult local RBK for the current recommended product and dose.',
          instruction_te:
            'కృష్ణా జిల్లా (AP) లో జరిగిన ఒక IPM అధ్యయనంలో, సమీకృత యాజమాన్య పద్ధతుల (బుట్టలు, రక్షణ పంటలు, సకాలంలో పిచికారీ వంటివి కలిపిన విధానం) ద్వారా తామర పురుగు/మోడ్చా ఉధృతి 16.0% నుండి 9.5%కి తగ్గినట్లు నమోదైంది; 2023 జనవరిలో NBAIR సర్వే తెలంగాణ, ఆంధ్రప్రదేశ్ పొలాల్లో ఈ తామర జాతిని స్వతంత్రంగా నమోదు చేసింది. ఈ తగ్గుదలకు ఖచ్చితంగా ఏ మందు, ఎంత మోతాదు వాడారో ఈ రెండు మూలాల్లోనూ పేర్కొనలేదు. వేప ఆధారిత (అజాడిరక్టిన్) పిచికారీ తామర పురుగులకు సాధారణంగా వాడే సేంద్రీయ ఎంపిక, కానీ నిర్దిష్ట మోతాదు CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. ప్రస్తుత సిఫార్సు ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK ని సంప్రదించండి.',
          activeIngredient_en: 'Neem-based Azadirachtin sprays (dose suppressed); IPM-combination outcome documented (16.0%→9.5%) without a named product/dose',
          activeIngredient_te: 'వేప ఆధారిత అజాడిరక్టిన్ (మోతాదు నిలిపివేయబడింది); IPM ఫలితం (16.0%→9.5%) నమోదైంది కానీ మందు పేరు లేదు',
          safetyCaution_en:
            'Spray during early morning or late evening when thrips are most active on exposed surfaces. Wear mask and gloves. Rotate insecticide classes if synthetic options are later confirmed, to slow resistance development (thrips build resistance quickly).',
          safetyCaution_te:
            'తామర పురుగులు ఎక్కువగా కనిపించే ఉదయం లేదా సాయంత్రం వేళల్లో పిచికారీ చేయండి. మాస్క్, చేతి తొడుగులు ధరించండి. సింథటిక్ ఎంపికలు ధృవీకరించిన తర్వాత వాడితే, నిరోధకత పెరగకుండా మందుల వర్గాలను మారుస్తూ వాడండి (తామర పురుగులు త్వరగా నిరోధకత పెంచుకుంటాయి).',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. The cited 16.0%→9.5% field outcome and the NBAIR survey both confirm thrips/Murda as a real, documented AP-region problem, but neither names an actionable spray product or dose. Confirm the current approved product and dose with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు ఆమోదించిన లేబుల్ చదవండి. ఉదహరించిన 16.0%→9.5% ఫలితం మరియు NBAIR సర్వే రెండూ తామర పురుగు/మోడ్చా నిజమైన సమస్య అని నిర్ధారిస్తాయి, కానీ మందు పేరు లేదా మోతాదును పేర్కొనవు. ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం VAA/RBK తో ధృవీకరించుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If new-growth distortion ("Murda") spreads to more than 20% of plants, or flower/fruit drop becomes heavy, consult your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra (RBK).',
      escalationThreshold_te:
        'మోడ్చా/మర్దా లక్షణాలు 20% కంటే ఎక్కువ మొక్కలకు వ్యాపించినా, లేదా పూత/కాయలు ఎక్కువగా రాలితే, రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
      sources: [
        {
          title: 'IPM field study on chilli thrips/Murda complex, Krishna district, AP (incidence 16.0% → 9.5% under integrated management)',
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
      name_te: 'పత్తి తెల్లదోమ',
      pathogenOrVector_en: 'Insect Pest / Virus Vector: Bemisia tabaci',
      pathogenOrVector_te: 'కీటకం / వైరస్ వాహకం: బెమిసియా టబాసి (తెల్లదోమ)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Clouds of small white adult insects flying up when the plant canopy is disturbed; nymphs visible as tiny flat scales on leaf undersides.',
        'Sticky honeydew excretion on leaves leading to black sooty mould growth, reducing photosynthesis.',
        'Yellowing, premature leaf drop, and, where whitefly acts as a virus vector, associated leaf curl symptoms on cotton and neighboring susceptible crops.',
      ],
      observableSymptoms_te: [
        'పైరును కదిలిస్తే చిన్న తెల్లటి పురుగుల గుంపు ఎగురుతూ కనిపిస్తుంది; ఆకు అడుగున చదునైన చిన్న నిమ్ఫ్‌లు కనిపిస్తాయి.',
        'ఆకులపై జిగురు లాంటి తేనెవంటి పదార్థం స్రవించి, దానిపై నల్లని మసి బూజు పెరుగుతుంది, దీనివల్ల కిరణజన్య సంయోగక్రియ తగ్గుతుంది.',
        'ఆకులు పసుపు రంగులోకి మారి ముందుగానే రాలిపోతాయి; తెల్లదోమ వైరస్ వాహకంగా పనిచేసినప్పుడు ఆకు ముడుత లక్షణాలు కూడా కనిపించవచ్చు.',
      ],
      affectedParts: ['Leaves (undersides)', 'Whole Canopy', 'Squares/Bolls (indirectly, via sooty mould and virus transmission)'],
      similarConditions: [
        {
          id: 'cotton-jassid-hopperburn',
          name_en: 'Jassid / Leafhopper "Hopperburn" (Amrasca biguttula / Pest)',
          name_te: 'ఆకుతొట్టు పురుగు నష్టం (జాసిడ్)',
          isPathological: true,
          differentiatingFactors_en:
            'Jassid damage produces a reddish-yellow triangular "hopperburn" discoloration starting at leaf margins and tips, without visible flying white insects; whitefly produces no leaf-margin discoloration pattern but is directly visible as clouds of tiny white insects when the canopy is disturbed, along with sticky honeydew and sooty mould.',
          differentiatingFactors_te:
            'జాసిడ్ పురుగు నష్టంలో ఆకు అంచులు, కొనలు ఎర్రటి-పసుపు త్రికోణాకారంలో రంగు మారతాయి, తెల్లటి పురుగులు ఎగరడం కనిపించదు; తెల్లదోమలో అలాంటి అంచు రంగు మార్పు ఉండదు, కానీ పైరు కదిలిస్తే తెల్లటి పురుగుల గుంపు నేరుగా కనిపిస్తుంది, జిగురు మరియు మసి బూజు కూడా ఉంటాయి.',
        },
        {
          id: 'cotton-clcuv-virus',
          name_en: 'Cotton Leaf Curl Virus (CLCuV / Pathogen, whitefly-transmitted)',
          name_te: 'పత్తి ఆకు ముడుత వైరస్ తెగులు (తెల్లదోమ ద్వారా వ్యాప్తి)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf curl virus symptoms (upward curling, vein thickening, leaf-like enations on the underside) are the downstream viral disease that whitefly can transmit; whitefly itself is the vector/pest being observed directly (flying insects, honeydew, sooty mould) and can be present without visible leaf curl symptoms yet showing.',
          differentiatingFactors_te:
            'ఆకు ముడుత వైరస్ లక్షణాలు (పైకి ముడుచుకోవడం, ఈనెలు ఉబ్బడం, ఆకు వంటి పెరుగుదలలు) తెల్లదోమ వ్యాప్తి చేసే వైరస్ వ్యాధి; తెల్లదోమ అనేది స్వయంగా కనిపించే పురుగు/వాహకం (ఎగిరే పురుగులు, జిగురు, మసి బూజు) — ఆకు ముడుత లక్షణాలు ఇంకా కనిపించకముందే తెల్లదోమ ఉండవచ్చు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather, especially August-September, favoring rapid whitefly population buildup — matching a 2023-24 Nandyal/Kurnool (AP) district survey finding.',
        'Overuse of broad-spectrum synthetic pyrethroids, which can trigger whitefly population flare-ups by killing natural predators.',
      ],
      environmentalRiskFactors_te: [
        'ఎండ, పొడి వాతావరణం, ముఖ్యంగా ఆగస్టు-సెప్టెంబర్ నెలల్లో తెల్లదోమ సంతతి వేగంగా పెరగడానికి అనుకూలం — ఇది 2023-24 నంద్యాల/కర్నూలు (AP) జిల్లా సర్వే ఫలితాలతో సరిపోలుతుంది.',
        'విస్తృత-స్థాయి సింథటిక్ పైరెథ్రాయిడ్స్ అతిగా వాడటం వల్ల సహజ శత్రు పురుగులు చనిపోయి తెల్లదోమ ఉధృతి పెరుగుతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Monitor regularly: a 2023-24 ANGRAU survey in Nandyal/Kurnool (AP) recorded whitefly counts crossing the economic threshold level (ETL) at 6.66 whitefly per 3 leaves in August — begin close monitoring from July onward in similar districts.',
          practice_te: 'క్రమం తప్పకుండా పరిశీలించండి: 2023-24లో నంద్యాల/కర్నూలు (AP) జిల్లాలో జరిగిన ANGRAU సర్వేలో ఆగస్టులో 3 ఆకులకు 6.66 తెల్లదోమలు నమోదై ఆర్థిక నష్టపరిమితి (ETL) దాటాయి — ఇలాంటి జిల్లాల్లో జూలై నుండే నిశిత పరిశీలన ప్రారంభించండి.',
          targetTiming: 'July onward (pre-ETL monitoring)',
        },
        {
          stepNumber: 2,
          practice_en: 'Install yellow sticky traps (12-15 per acre) at canopy level for early detection and mass trapping.',
          practice_te: 'ముందస్తు గుర్తింపు కోసం ఎకరానికి 12-15 పసుపు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.',
          targetTiming: 'Squaring stage onward',
        },
      ],
      treatments: [
        {
          id: 't-cotton-whitefly-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'The same 2023-24 Nandyal/Kurnool (AP) survey that documented whitefly crossing ETL, and a CICR (Central Institute for Cotton Research) advisory describing whitefly as a vector of multiple viral diseases with 15-30% yield loss potential, both establish whitefly as a serious, AP-confirmed threat — but neither source available to this tool named a specific insecticide product or dose for this crop/pest combination. Diafenthiuron and Pyriproxyfen-class insecticides are commonly discussed for whitefly management once ETL is crossed, but a specific dose is suppressed pending primary CIBRC label verification. Consult local RBK for the current approved product and dose.',
          instruction_te:
            'తెల్లదోమ ETL దాటినట్లు నమోదు చేసిన అదే 2023-24 నంద్యాల/కర్నూలు (AP) సర్వే, మరియు తెల్లదోమను బహుళ వైరస్ వ్యాధుల వాహకంగా, 15-30% దిగుబడి నష్టం కలిగించగలదని పేర్కొన్న CICR సలహా — రెండూ తెల్లదోమను AP లో నిజంగా ధృవీకరించిన తీవ్రమైన సమస్యగా నిర్ధారిస్తాయి, కానీ ఈ పంట/పురుగు కలయికకు నిర్దిష్ట మందు పేరు లేదా మోతాదును ఏ మూలమూ పేర్కొనలేదు. ETL దాటిన తర్వాత డయాఫెంతియురాన్, పైరిప్రాక్సిఫెన్ వర్గ కీటకనాశినులు సాధారణంగా చర్చించబడతాయి, కానీ నిర్దిష్ట మోతాదు CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK ని సంప్రదించండి.',
          activeIngredient_en: 'Diafenthiuron / Pyriproxyfen-class insecticides (dose suppressed — AP-confirmed ETL-crossing threat, no named product/dose in sources)',
          activeIngredient_te: 'డయాఫెంతియురాన్ / పైరిప్రాక్సిఫెన్ వర్గం (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Spray only after confirming ETL is crossed (avoid prophylactic spraying, which accelerates resistance). Avoid repeated use of the same insecticide class consecutively. Wear mask and gloves; follow the pre-harvest interval on the approved label.',
          safetyCaution_te:
            'ETL దాటినట్లు నిర్ధారించుకున్న తర్వాతే పిచికారీ చేయండి (ముందుజాగ్రత్తగా పిచికారీ చేయడం నిరోధకతను పెంచుతుంది). ఒకే మందుల వర్గాన్ని వరుసగా వాడవద్దు. మాస్క్, చేతి తొడుగులు ధరించండి; ఆమోదించిన లేబుల్‌పై కోత ముందస్తు నిరీక్షణ వ్యవధిని పాటించండి.',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. Spray strictly based on ETL monitoring (6.66 whitefly/3 leaves was the AP survey\'s crossing point, but confirm the currently applicable ETL for your area with RBK, as it can vary by season and advisory). Actionable product and dose are suppressed pending primary CIBRC label verification.',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు ఆమోదించిన లేబుల్ చదవండి. ETL పరిశీలన ఆధారంగానే పిచికారీ చేయండి (AP సర్వేలో 3 ఆకులకు 6.66 అనేది గమనించిన పరిమితి, కానీ మీ ప్రాంతానికి ప్రస్తుత ETL ను RBK తో ధృవీకరించుకోండి). CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు ఉత్పత్తి మరియు మోతాదు నిలిపివేయబడ్డాయి.',
        },
      ],
      escalationThreshold_en:
        'If whitefly counts exceed the locally confirmed ETL (the AP survey observed crossing at 6.66/3 leaves) or sooty mould coverage becomes heavy, contact your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra (RBK) for area-wide management advice.',
      escalationThreshold_te:
        'తెల్లదోమ సంఖ్య స్థానికంగా ధృవీకరించిన ETL దాటినా (AP సర్వేలో 3 ఆకులకు 6.66 వద్ద దాటింది) లేదా మసి బూజు తీవ్రంగా వ్యాపించినా, ప్రాంత వ్యాప్త యాజమాన్య సలహా కోసం రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
      sources: [
        {
          title: 'Whitefly and pink bollworm incidence survey, Nandyal/Kurnool districts, AP, 2023-24 (6.66 whitefly/3 leaves at Dornipadu mandal in August, crossing ETL)',
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
      name_te: 'పసుపు ఆకు మచ్చ తెగులు',
      pathogenOrVector_en: 'Fungus: Colletotrichum capsici',
      pathogenOrVector_te: 'శిలీంద్రం: కొల్లెటోట్రైకం క్యాప్సిసి',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, oval to irregular dark brown spots with a yellow halo, scattered across the leaf blade (distinct from the many small rectangular spots of leaf blotch, and from the collar/rhizome rot that affects this same crop).',
        'Spots may enlarge and coalesce under heavy infection, giving leaves a blighted, scorched appearance.',
        'Premature drying of affected leaves from the margins inward; rhizomes themselves remain unaffected (this disease is foliar only).',
      ],
      observableSymptoms_te: [
        'ఆకుపై చిన్న, గుండ్రని లేదా క్రమరహిత ముదురు గోధుమ మచ్చలు, చుట్టూ పసుపు వలయంతో చెదురుమదురుగా కనిపిస్తాయి (ఇది ఆకు మచ్చ తెగులు (బ్లాచ్)లో కనిపించే చిన్న దీర్ఘచతురస్ర మచ్చల కంటే, అలాగే ఇదే పంటలో కనిపించే దుంప కుళ్ళు తెగులు కంటే భిన్నమైనది).',
        'తీవ్రమైతే మచ్చలు పెద్దవై కలిసిపోయి ఆకు మాడిపోయినట్లు కనిపిస్తుంది.',
        'దెబ్బతిన్న ఆకులు అంచుల నుండి లోపలికి ముందుగానే ఎండిపోతాయి; ఈ తెగులు ఆకులకే పరిమితం — దుంపలపై ప్రభావం ఉండదు.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'turmeric-leaf-blotch-lookalike',
          name_en: 'Leaf Blotch (Taphrina maculans / Pathogen)',
          name_te: 'ఆకు మచ్చ తెగులు (బ్లాచ్, టాఫ్రినా)',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf blotch (a separate, already-catalogued disease on this crop) produces hundreds of small, numerous rectangular or oval reddish-yellow spots densely covering the leaf; this leaf spot (Colletotrichum capsici) produces comparatively fewer, larger, more irregular dark-brown lesions with a distinct yellow halo.',
          differentiatingFactors_te:
            'ఆకు మచ్చ తెగులు (బ్లాచ్, ఇది ఇదే పంటలో విడిగా నమోదైన తెగులు) ఆకుపై వందలాది చిన్న దీర్ఘచతురస్ర ఎరుపు-పసుపు మచ్చలను దట్టంగా కలిగిస్తుంది; ఈ ఆకు మచ్చ తెగులు (కొల్లెటోట్రైకం) పోలిస్తే తక్కువ సంఖ్యలో, పెద్దవిగా, క్రమరహితంగా ముదురు గోధుమ రంగులో పసుపు వలయంతో కనిపిస్తాయి.',
        },
        {
          id: 'turmeric-sunscorch',
          name_en: 'Sun-scorch / Heat Stress Leaf Scald (Abiotic)',
          name_te: 'ఎండ వేడిమి వల్ల ఆకు కాలిపోవడం (భౌతిక ఒత్తిడి)',
          isPathological: false,
          differentiatingFactors_en:
            'Sun-scorch produces irregular bleached, papery-white to tan patches concentrated on the sun-exposed upper canopy, with no distinct dark lesion margin or yellow halo; leaf spot produces discrete dark brown spots with a clear yellow halo distributed across the canopy regardless of sun exposure.',
          differentiatingFactors_te:
            'ఎండ వేడిమి వల్ల ఎండకు తగిలే పై ఆకులపై క్రమరహిత తెల్లటి/లేత గోధుమ రంగు మచ్చలు కనిపిస్తాయి, స్పష్టమైన ముదురు అంచు లేదా పసుపు వలయం ఉండదు; ఆకు మచ్చ తెగులులో స్పష్టమైన పసుపు వలయంతో ముదురు గోధుమ మచ్చలు ఎండ తగలని ఆకులపై కూడా కనిపిస్తాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather during the southwest monsoon growth period, similar to conditions favoring other turmeric foliar diseases on this crop.',
        'Dense, poorly ventilated canopy from close spacing.',
      ],
      environmentalRiskFactors_te: [
        'నైరుతి రుతుపవనాల సమయంలో వెచ్చని, తేమతో కూడిన వాతావరణం — ఇదే పంటలో ఇతర ఆకు తెగుళ్లకు కూడా అనుకూలమైన పరిస్థితులు.',
        'దగ్గరగా నాటడం వల్ల దట్టమైన, గాలి ప్రసరణ తక్కువగా ఉండే పైరు.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing to improve canopy air circulation and reduce leaf-wetness duration.',
          practice_te: 'గాలి ప్రసరణ మెరుగుపరచడానికి, ఆకులపై తేమ ఎక్కువసేపు ఉండకుండా ఉండటానికి సిఫార్సు చేసిన మొక్కల ఎడం పాటించండి.',
          targetTiming: 'Sowing/Planting',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily infected leaves promptly to reduce spore spread within the field.',
          practice_te: 'తెగులు తీవ్రంగా సోకిన ఆకులను వెంటనే తొలగించి నాశనం చేయండి, తద్వారా పొలంలో బీజాల వ్యాప్తి తగ్గుతుంది.',
          targetTiming: 'Throughout season',
        },
      ],
      treatments: [
        {
          id: 't-turmeric-leafspot-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'No AP-specific survey or trial data for this particular leaf spot (Colletotrichum capsici, as distinct from the leaf blotch and rhizome rot already catalogued for this crop) was found during this research pass — this entry is sourced only to general ANGRAU/ICAR-IISR turmeric plant-protection guidance, in the same manner as the original catalog baseline. Bio-agent Trichoderma-based foliar sprays and neem-based options are commonly discussed for turmeric foliar diseases generally, but a specific dose is suppressed pending primary CIBRC/university label verification specific to this disease. Consult local RBK or Horticulture Officer for current guidance.',
          instruction_te:
            'ఈ పరిశోధనలో, ఈ ప్రత్యేక ఆకు మచ్చ తెగులుకు (కొల్లెటోట్రైకం క్యాప్సిసి — ఇదే పంటలో ఇప్పటికే నమోదైన ఆకు మచ్చ బ్లాచ్ మరియు దుంప కుళ్ళు తెగుళ్ల కంటే భిన్నమైనది) ప్రత్యేకమైన AP సర్వే లేదా ట్రయల్ డేటా కనుగొనలేకపోయాము — ఈ నమోదు సాధారణ ANGRAU/ICAR-IISR పసుపు పంట రక్షణ మార్గదర్శకాలపై మాత్రమే ఆధారపడింది, ఇది అసలు కేటలాగ్ బేస్‌లైన్ తీరులోనే ఉంది. ట్రైకోడెర్మా ఆధారిత పిచికారీ మరియు వేప ఆధారిత ఎంపికలు పసుపు ఆకు తెగుళ్లకు సాధారణంగా చర్చించబడతాయి, కానీ నిర్దిష్ట మోతాదు CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. ప్రస్తుత మార్గదర్శకత్వం కోసం స్థానిక RBK లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
          activeIngredient_en: 'Trichoderma-based foliar spray / Neem-based options (dose suppressed; no AP-specific source found for this particular disease)',
          activeIngredient_te: 'ట్రైకోడెర్మా ఆధారిత పిచికారీ / వేప ఆధారిత ఎంపికలు (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Eco-friendly biocontrol option; avoid mixing with synthetic chemical fungicides. Wear basic gloves during preparation.',
          safetyCaution_te:
            'పర్యావరణ హితమైన బయో ఏజెంట్; రసాయన శిలీంద్రనాశినులతో కలపవద్దు. తయారీ సమయంలో చేతి తొడుగులు ధరించండి.',
          regulatoryNotice_en:
            'Both the bio-agent dose and any chemical fungicide recommendation for this specific leaf spot are suppressed pending primary CIBRC/university registration verification — this is a weaker evidence base than most other entries in this catalog (no disease-specific AP survey was found), so treat all guidance here as general good practice, not a confirmed protocol. Consult local Rythu Bharosa Kendra (RBK) or Horticulture Officer.',
          regulatoryNotice_te:
            'ఈ ప్రత్యేక ఆకు మచ్చ తెగులుకు బయో-ఏజెంట్ మోతాదు మరియు రసాయన శిలీంద్రనాశిని సిఫార్సులు రెండూ CIBRC/విశ్వవిద్యాలయ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడ్డాయి — ఈ కేటలాగ్‌లోని ఇతర నమోదుల కంటే ఇది బలహీనమైన ఆధారం (ఈ తెగులుకు ప్రత్యేక AP సర్వే కనుగొనలేదు), కావున ఇక్కడి మార్గదర్శకత్వాన్ని సాధారణ మంచి పద్ధతిగా మాత్రమే భావించండి, ధృవీకరించిన విధానంగా కాదు. స్థానిక రైతు భరోసా కేంద్రం (RBK) లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
        },
      ],
      escalationThreshold_en: 'Consult your local Horticulture Officer if leaf spot coverage exceeds roughly 20% of canopy leaf area or spots begin coalescing rapidly.',
      escalationThreshold_te: 'ఆకు మచ్చలు పైరులో దాదాపు 20% కంటే ఎక్కువ విస్తరించినా లేదా వేగంగా కలిసిపోతున్నా స్థానిక ఉద్యానవన అధికారిని సంప్రదించండి.',
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

    'disease-rice-sheathblight': {
      id: 'disease-rice-sheathblight',
      cropId: 'crop-rice',
      name_en: 'Sheath Blight',
      name_te: 'కాటుక/తోలు కుళ్ళు తెగులు (షీత్ బ్లైట్)',
      pathogenOrVector_en: 'Fungus: Rhizoctonia solani',
      pathogenOrVector_te: 'శిలీంద్రం: రైజోక్టోనియా సొలాని',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Oval, greenish-gray water-soaked lesions on the leaf sheath near the waterline, which enlarge and develop a straw-colored center with an irregular dark brown border.',
        'Lesions spread upward from lower sheaths to upper leaves and flag leaf under favorable conditions.',
        'White to brownish fungal mycelial growth and small round sclerotia (resembling mustard seeds) may be visible on severely affected sheaths.',
      ],
      observableSymptoms_te: [
        'నీటి మట్టానికి దగ్గరగా ఆకు కణుపు భాగంలో గుడ్డు ఆకారపు, నీరు పట్టిన ఆకుపచ్చ-బూడిద రంగు మచ్చలు ఏర్పడి, మధ్యలో గడ్డి రంగులోకి మారి అంచున ముదురు గోధుమ రంగు వలయం కలిగి ఉంటాయి.',
        'అనుకూల పరిస్థితుల్లో మచ్చలు కింది కణుపుల నుండి పై ఆకులకు, జెండా ఆకుకు వ్యాపిస్తాయి.',
        'తీవ్రంగా సోకిన కణుపులపై తెల్లటి/గోధుమ రంగు శిలీంద్ర పోగులు మరియు ఆవాల గింజల వంటి చిన్న గుండ్రని స్క్లిరోషియా కనిపించవచ్చు.',
      ],
      affectedParts: ['Leaf Sheath', 'Leaves', 'Flag Leaf', 'Culm'],
      similarConditions: [
        {
          id: 'rice-sheathrot-lookalike',
          name_en: 'Sheath Rot (Sarocladium oryzae / Pathogen)',
          name_te: 'కణుపు కుళ్ళు తెగులు (షీత్ రాట్)',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath rot occurs specifically on the uppermost (flag leaf) sheath enclosing the panicle, producing oblong brown lesions with a pinkish-white fungal growth and often preventing the panicle from fully emerging; sheath blight begins lower in the canopy near the waterline and spreads upward, with greenish-gray water-soaked lesions rather than pinkish fungal growth.',
          differentiatingFactors_te:
            'కణుపు కుళ్ళు తెగులు ప్రత్యేకంగా వెన్నును కప్పి ఉంచే పై కణుపుపై వస్తుంది, గోధుమ రంగు మచ్చలతో గులాబీ-తెలుపు శిలీంద్ర పెరుగుదల కనిపిస్తుంది, వెన్ను పూర్తిగా బయటకు రాకుండా అడ్డుకుంటుంది; షీత్ బ్లైట్ నీటి మట్టం దగ్గర కింది భాగంలో మొదలై పైకి వ్యాపిస్తుంది, ఆకుపచ్చ-బూడిద రంగు నీరు పట్టిన మచ్చలు కనిపిస్తాయి, గులాబీ రంగు శిలీంద్రం ఉండదు.',
        },
        {
          id: 'rice-waterline-abiotic-discoloration',
          name_en: 'Waterline Sheath Discoloration from Prolonged Submergence (Abiotic)',
          name_te: 'ఎక్కువ కాలం నీటిలో మునిగి ఉండటం వల్ల కణుపు రంగు మారడం (భౌతిక ఒత్తిడి)',
          isPathological: false,
          differentiatingFactors_en:
            'Prolonged submergence causes a uniform dull brown discoloration band at the waterline without the characteristic irregular dark-bordered lesion shape, and resolves once water is drained; sheath blight lesions keep their distinct oval shape with straw-colored centers and continue spreading even after drainage.',
          differentiatingFactors_te:
            'ఎక్కువ కాలం నీటిలో మునిగి ఉంటే నీటి మట్టం వద్ద ఏకరీతి నిస్తేజ గోధుమ రంగు వలయం ఏర్పడుతుంది, దానికి లక్షణమైన క్రమరహిత ముదురు అంచు ఉండదు, నీరు తీసేశాక తగ్గిపోతుంది; షీత్ బ్లైట్ మచ్చలు గుడ్డు ఆకారంలోనే ఉండి, గడ్డి రంగు మధ్యభాగంతో, నీరు తీసేసినా వ్యాపిస్తూనే ఉంటాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense crop canopy from high seeding/transplanting rates and heavy nitrogen application, consistent with the conditions behind the rabi 2020-21 Nellore/Chittoor (AP) survey findings.',
        'Continuous standing water with high humidity inside the canopy.',
      ],
      environmentalRiskFactors_te: [
        'ఎక్కువ విత్తన/నాటు రేటు, అధిక నత్రజని ఎరువు వాడకం వల్ల దట్టమైన పైరు — ఇది రబీ 2020-21 నెల్లూరు/చిత్తూరు (AP) సర్వే కనుగొన్న పరిస్థితులతో సరిపోలుతుంది.',
        'నిరంతరం నీరు నిలవడం, పైరు లోపల ఎక్కువ తేమ ఉండటం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive seeding/transplanting density and split nitrogen doses rather than applying heavy single doses, to keep the canopy less congested.',
          practice_te: 'ఎక్కువ సాంద్రతలో విత్తనాలు/నాట్లు వేయవద్దు; నత్రజనిని ఒకేసారి కాకుండా దఫాలుగా వేయండి, తద్వారా పైరు దట్టంగా మారకుండా ఉంటుంది.',
          targetTiming: 'Sowing/Transplanting and vegetative growth',
        },
        {
          stepNumber: 2,
          practice_en: 'Drain excess standing water periodically during the tillering-to-booting stage rather than maintaining continuous deep flooding.',
          practice_te: 'దుబ్బు చేసే దశ నుండి వెన్ను దశ వరకు నిరంతరం లోతు నీరు నిల్వ ఉంచకుండా, మధ్యమధ్యలో నీటిని తీసివేయండి.',
          targetTiming: 'Tillering to booting',
        },
      ],
      treatments: [
        {
          id: 't-rice-sheathblight-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'A rabi 2020-21 survey across Nellore and Chittoor districts (AP) measured sheath blight severity between 6.11% and 13.44%, with yield-loss estimates elsewhere in the literature cited at 11%-58% depending on severity and timing — confirming this as a real, AP-documented problem. The source summary available to this tool did not name a specific fungicide product or dose used in that survey. Validamycin and Hexaconazole-class fungicides are commonly discussed for sheath blight management, but a specific dose for either is suppressed pending primary CIBRC label verification. Consult local RBK for the current approved product and dose.',
          instruction_te:
            'రబీ 2020-21లో నెల్లూరు మరియు చిత్తూరు జిల్లాల్లో (AP) జరిగిన సర్వేలో షీత్ బ్లైట్ తీవ్రత 6.11% నుండి 13.44% వరకు నమోదైంది; ఇతర అధ్యయనాల్లో తీవ్రత మరియు సమయాన్ని బట్టి 11%-58% దిగుబడి నష్టం అంచనా వేయబడింది — ఇది AP లో నిజంగా నమోదైన సమస్య అని నిర్ధారిస్తుంది. ఈ సర్వేలో వాడిన నిర్దిష్ట మందు పేరు లేదా మోతాదును ఈ మూలం పేర్కొనలేదు. వాలిడామైసిన్, హెక్సాకొనజోల్ వర్గ శిలీంద్రనాశినులు షీత్ బ్లైట్ యాజమాన్యానికి సాధారణంగా చర్చించబడతాయి, కానీ రెండింటి మోతాదు CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు నిలిపివేయబడింది. ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదు కోసం స్థానిక RBK ని సంప్రదించండి.',
          activeIngredient_en: 'Validamycin / Hexaconazole-class fungicides (dose suppressed — AP survey confirms the problem, not a dose)',
          activeIngredient_te: 'వాలిడామైసిన్ / హెక్సాకొనజోల్ వర్గం (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Spray targeted at the lower canopy/sheath region where infection begins, using adequate water volume to penetrate dense canopy. Wear mask and gloves; follow the pre-harvest interval on the approved label.',
          safetyCaution_te:
            'తెగులు మొదలయ్యే కింది కణుపు భాగాన్ని లక్ష్యంగా చేసుకుని, దట్టమైన పైరులోకి మందు చేరేలా తగినంత నీటి పరిమాణంతో పిచికారీ చేయండి. మాస్క్, చేతి తొడుగులు ధరించండి; ఆమోదించిన లేబుల్‌పై కోత ముందస్తు నిరీక్షణ వ్యవధిని పాటించండి.',
          regulatoryNotice_en:
            'Statutory Warning: Read the approved product label before use. The 6.11%-13.44% severity figure and 11%-58% yield-loss range are real, cited findings describing the problem\'s scale, not a spray dose. Actionable product and dose are suppressed pending primary CIBRC label verification. Confirm with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు ఆమోదించిన లేబుల్ చదవండి. 6.11%-13.44% తీవ్రత మరియు 11%-58% దిగుబడి నష్టం అంకెలు సమస్య పరిమాణాన్ని వివరించే నిజమైన ఫలితాలు, మోతాదు కాదు. CIBRC లేబుల్ ధృవీకరణ పూర్తయ్యే వరకు ఉత్పత్తి మరియు మోతాదు నిలిపివేయబడ్డాయి. VAA/RBK తో ధృవీకరించుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If lesions reach the flag leaf or upper third of the canopy before panicle maturity, contact your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra (RBK) promptly, as yield loss accelerates sharply at this stage.',
      escalationThreshold_te:
        'వెన్ను పక్వానికి ముందే మచ్చలు జెండా ఆకుకు లేదా పైరులో పై మూడో భాగానికి చేరితే, వెంటనే రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి — ఈ దశలో దిగుబడి నష్టం వేగంగా పెరుగుతుంది.',
      sources: [
        {
          title: 'Sheath blight severity survey, Nellore and Chittoor districts, AP, rabi 2020-21 (severity 6.11%-13.44%)',
          organization: 'South Asian Journal of Applied Sciences (sasapjas.org)',
          reviewDate: '2023-09-01',
          url: 'https://sasapjas.org/wp-content/uploads/2023/09/09-Kalavathi.pdf',
          geographicScope: 'ap_specific',
        },
      ],
      evidenceStatus: 'provisional',
      lastUpdated: '2026-10-13',
    },

    'disease-maize-turcicumblight': {
      id: 'disease-maize-turcicumblight',
      cropId: 'crop-maize',
      name_en: 'Turcicum Leaf Blight',
      name_te: 'మొక్కజొన్న టర్సికమ్ ఆకు ఎండు తెగులు',
      pathogenOrVector_en: 'Fungus: Exserohilum turcicum',
      pathogenOrVector_te: 'శిలీంద్రం: ఎక్సెరోహైలం టర్సికం',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Long, elliptical, cigar-shaped (boat-shaped) grayish-green to tan lesions on leaves, typically starting on lower leaves first.',
        'Lesions enlarge and run parallel to leaf veins, often coalescing to blight large sections of the leaf.',
        'Severe infection from knee-high stage onward can cause substantial premature leaf death, reducing grain fill.',
      ],
      observableSymptoms_te: [
        'ఆకులపై పొడవాటి, దీర్ఘవృత్తాకార (సిగార్/పడవ ఆకారం) బూడిద-ఆకుపచ్చ నుండి గోధుమ రంగు మచ్చలు ఏర్పడతాయి, సాధారణంగా కింది ఆకులపై మొదట కనిపిస్తాయి.',
        'మచ్చలు ఈనెలకు సమాంతరంగా పెరిగి, తీవ్రమైతే కలిసిపోయి ఆకు పెద్ద భాగాన్ని ఆక్రమిస్తాయి.',
        'మోకాలు ఎత్తు దశ నుండి తీవ్రంగా సోకితే ఆకులు ముందుగానే చనిపోయి గింజ నిండుదల తగ్గుతుంది.',
      ],
      affectedParts: ['Leaves (lower first, progressing upward)'],
      similarConditions: [
        {
          id: 'maize-southern-leaf-blight',
          name_en: 'Maydis / Southern Leaf Blight (Bipolaris maydis / Pathogen)',
          name_te: 'దక్షిణ ఆకు ఎండు తెగులు (బైపోలారిస్ మేడిస్)',
          isPathological: true,
          differentiatingFactors_en:
            'Southern leaf blight (Maydis) produces smaller, more rectangular tan lesions bounded by leaf veins, often with a reddish-brown border; Turcicum leaf blight produces larger, elongated cigar/boat-shaped lesions that are not strictly rectangular.',
          differentiatingFactors_te:
            'దక్షిణ ఆకు ఎండు తెగులు (మేడిస్) ఈనెల మధ్య చిన్న, దీర్ఘచతురస్రాకార గోధుమ మచ్చలను ఎర్రటి-గోధుమ అంచుతో కలిగిస్తుంది; టర్సికమ్ ఆకు ఎండు తెగులు పొడవాటి సిగార్/పడవ ఆకారపు మచ్చలను కలిగిస్తుంది, ఇవి దీర్ఘచతురస్రాకారంలో ఉండవు.',
        },
        {
          id: 'maize-moisture-stress-leaftip',
          name_en: 'Moisture-Stress Leaf Firing (Abiotic)',
          name_te: 'తేమ లోపం వల్ల ఆకు కొన ఎండిపోవడం (భౌతిక ఒత్తిడి)',
          isPathological: false,
          differentiatingFactors_en:
            'Moisture-stress leaf firing starts at the leaf tip and margins and moves inward in a V-shaped pattern, affecting mostly upper/exposed leaves uniformly across the field regardless of plant age; Turcicum lesions appear as discrete elongated patches anywhere along the leaf blade, starting on lower leaves first.',
          differentiatingFactors_te:
            'తేమ లోపం వల్ల ఆకు కొన నుండి అంచుల వరకు V ఆకారంలో ఎండిపోవడం మొదలవుతుంది, ఇది పొలమంతా పై ఆకులపై ఒకేలా కనిపిస్తుంది; టర్సికమ్ తెగులు మచ్చలు ఆకుపై ఎక్కడైనా విడివిడిగా పొడవాటి ఆకారంలో కనిపిస్తాయి, కింది ఆకులపై మొదట మొదలవుతాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Moderate temperatures (18-27°C) with high humidity and heavy dew, especially from the knee-high growth stage onward.',
        'Continuous maize monocropping without rotation in the same field.',
      ],
      environmentalRiskFactors_te: [
        'మోస్తరు ఉష్ణోగ్రతలు (18-27°C), అధిక తేమ, భారీ మంచు — ముఖ్యంగా మోకాలు ఎత్తు దశ నుండి.',
        'అదే పొలంలో పంట మార్పిడి లేకుండా వరుసగా మొక్కజొన్న సాగు చేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Practice crop rotation with non-cereal crops and remove/plough in crop residue after harvest, since the fungus survives on infected debris.',
          practice_te: 'తృణధాన్యాలు కాని పంటలతో పంట మార్పిడి చేయండి; కోత తర్వాత మిగిలిన పంట వ్యర్థాలను తొలగించండి లేదా దుక్కిలో కలిపేయండి, ఎందుకంటే శిలీంద్రం సోకిన వ్యర్థాలపై జీవించి ఉంటుంది.',
          targetTiming: 'Post-harvest / pre-season',
        },
        {
          stepNumber: 2,
          practice_en: 'Where available, choose locally recommended tolerant/resistant maize hybrids for your district.',
          practice_te: 'అందుబాటులో ఉంటే, మీ జిల్లాకు సిఫార్సు చేసిన తెగులును తట్టుకునే మొక్కజొన్న హైబ్రిడ్లను ఎంచుకోండి.',
          targetTiming: 'Pre-sowing variety selection',
        },
      ],
      treatments: [
        {
          id: 't-maize-turcicum-chem-1',
          stepNumber: 1,
          category: 'chemical',
          instruction_en:
            'ICAR - Indian Institute of Maize Research (IIMR) publishes a spray schedule for this disease naming Mancozeb 75% WP @ 2.5-3 g/litre at 7-10 day intervals starting from the knee-high growth stage. This is a cleaner, single-institution figure than some other entries in this catalog, but per this catalog\'s house standard, no chemical dose is ever shown as unconditionally actionable here — even a clean ICAR-IIMR institutional figure has not been independently cross-checked by this tool against a current CIBRC product label, and label-approved rates can be revised over time. Treat the 2.5-3 g/litre figure as a starting reference point only, and confirm the current approved product, concentration, and spray interval for your district with your local RBK/VAA before mixing or spraying anything.',
          instruction_te:
            'ICAR - భారతీయ మొక్కజొన్న పరిశోధనా సంస్థ (IIMR) ఈ తెగులుకు మాంకోజెబ్ 75% WP @ లీటరుకు 2.5-3 గ్రాముల చొప్పున మోకాలు ఎత్తు దశ నుండి 7-10 రోజుల వ్యవధిలో పిచికారీ షెడ్యూల్‌ను ప్రచురించింది. ఇది ఈ కేటలాగ్‌లోని మరికొన్ని నమోదుల కంటే స్పష్టమైన, ఒకే సంస్థ నుండి వచ్చిన అంకె అయినప్పటికీ, ఈ కేటలాగ్ సూత్రం ప్రకారం — ఏ రసాయన మోతాదును కూడా ఇక్కడ షరతులు లేకుండా వాడదగినదిగా చూపించము; స్పష్టమైన ICAR-IIMR సంస్థాగత అంకె అయినా, దీన్ని ప్రస్తుత CIBRC ఉత్పత్తి లేబుల్‌తో ఈ సాధనం స్వతంత్రంగా ధృవీకరించలేదు, మరియు లేబుల్-ఆమోదిత మోతాదులు కాలానుగుణంగా మారవచ్చు. 2.5-3 గ్రాముల/లీటరు అంకెను కేవలం ఒక ప్రారంభ సూచనగా మాత్రమే పరిగణించండి; మందు కలిపేముందు లేదా పిచికారీకి ముందు మీ జిల్లాకు ప్రస్తుత ఆమోదించిన ఉత్పత్తి, గాఢత, మరియు పిచికారీ వ్యవధిని స్థానిక RBK/VAA తో ధృవీకరించుకోండి.',
          activeIngredient_en: 'Mancozeb 75% WP @ 2.5-3 g/L, 7-10 day intervals from knee-high stage (ICAR-IIMR institutional figure — treat as a reference point, not an unconditional instruction; confirm with RBK/VAA)',
          activeIngredient_te: 'మాంకోజెబ్ 75% WP @ 2.5-3 గ్రా./లీ, మోకాలు ఎత్తు నుండి 7-10 రోజుల వ్యవధిలో (ICAR-IIMR అంకె — సూచనగా మాత్రమే, RBK/VAAతో ధృవీకరించుకోండి)',
          safetyCaution_en:
            'Wear protective mask and gloves during mixing and spraying. Avoid spraying during strong wind or peak midday heat. Follow the pre-harvest interval stated on the currently approved product container label; verify with local RBK before relying on the 2.5-3 g/L figure above.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు, పిచికారీ చేసేటప్పుడు రక్షణ మాస్క్, చేతి తొడుగులు ధరించండి. గాలి ఎక్కువగా లేదా ఎండ తీవ్రంగా ఉన్నప్పుడు పిచికారీ చేయవద్దు. పైన ఇచ్చిన 2.5-3 గ్రా./లీ అంకెపై ఆధారపడే ముందు, ప్రస్తుత ఆమోదించిన ఉత్పత్తి డబ్బా లేబుల్‌పై తెలిపిన కోత ముందస్తు నిరీక్షణ వ్యవధిని స్థానిక RBK వద్ద ధృవీకరించుకోండి.',
          regulatoryNotice_en:
            'Statutory Warning: Read the currently approved product label before use. The Mancozeb figure above comes from an ICAR-IIMR institutional source, which is stronger sourcing than a secondary/blog source, but it is still not independently cross-checked here against a current CIBRC registration label, and this catalog never presents any chemical dose as unconditionally actionable regardless of source strength. Confirm the current approved product and dose with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) before use.',
          regulatoryNotice_te:
            'చట్టబద్ధమైన హెచ్చరిక: ఉపయోగించే ముందు ప్రస్తుత ఆమోదించిన ఉత్పత్తి లేబుల్ చదవండి. పై మాంకోజెబ్ అంకె ICAR-IIMR సంస్థాగత మూలం నుండి వచ్చింది, ఇది ద్వితీయ/బ్లాగ్ మూలం కంటే బలమైనదే, కానీ దీన్ని ప్రస్తుత CIBRC నమోదు లేబుల్‌తో ఈ సాధనం స్వతంత్రంగా ధృవీకరించలేదు, మరియు మూలం ఎంత బలంగా ఉన్నా ఏ రసాయన మోతాదును ఈ కేటలాగ్ షరతులు లేకుండా చూపించదు. వాడకం ముందు ప్రస్తుత ఆమోదించిన ఉత్పత్తి మరియు మోతాదును గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) తో ధృవీకరించుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If lesions spread above the ear leaf before tasseling, or overall leaf blighting exceeds 25-30% of total leaf area, contact your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra (RBK) promptly, as grain fill can be significantly affected.',
      escalationThreshold_te:
        'పూత దశకు ముందే మచ్చలు కంకి ఆకుకు పైకి వ్యాపించినా, లేదా మొత్తం ఆకు విస్తీర్ణంలో 25-30% కంటే ఎక్కువ దెబ్బతిన్నా, వెంటనే రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి — గింజ నిండుదల గణనీయంగా ప్రభావితమవుతుంది.',
      claimEvidence: [
        {
          claimId: 't-maize-turcicum-chem-1-dose',
          fieldRef: "treatments['t-maize-turcicum-chem-1'].instruction_en/_te",
          verificationStatus: 'provisional',
          sourceIndexes: [0],
          locator: 'aicrpmaize.icar.gov.in/?p=1163 — ICAR-IIMR Turcicum leaf blight management page (Mancozeb spray schedule)',
          limitation_en:
            'This is a real institutional (ICAR-IIMR) figure, not a secondary/blog estimate — a stronger starting point than several other suppressed doses in this catalog. It is marked provisional rather than verified because this tool could not independently cross-check it against a current CIBRC product registration/label, and the page was reached via a research subagent\'s fetch/search rather than a direct page-and-section read by this session. Confirm with your local RBK/VAA before relying on it.',
          limitation_te:
            'ఇది నిజమైన సంస్థాగత (ICAR-IIMR) అంకె, ద్వితీయ/బ్లాగ్ అంచనా కాదు — ఈ కేటలాగ్‌లోని మరికొన్ని నిలిపివేసిన మోతాదుల కంటే బలమైన ప్రారంభ బిందువు. దీన్ని ధృవీకరించినదిగా కాకుండా తాత్కాలికంగా గుర్తించడానికి కారణం — దీన్ని ప్రస్తుత CIBRC ఉత్పత్తి నమోదు/లేబుల్‌తో ఈ సాధనం స్వతంత్రంగా ధృవీకరించలేకపోయింది, మరియు ఈ పేజీని పరిశోధన సబ్ ఏజెంట్ శోధన ద్వారా చేరుకుంది, ఈ సెషన్ నేరుగా పేజీ/విభాగాన్ని చదవలేదు. దీనిపై ఆధారపడే ముందు స్థానిక RBK/VAA తో ధృవీకరించుకోండి.',
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
  },
};
