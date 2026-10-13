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
      commonDiseaseIds: ['disease-rice-blast'],
    },
    'crop-chilli': {
      id: 'crop-chilli',
      name_en: 'Chilli',
      name_te: 'మిరప',
      scientificName: 'Capsicum annuum L.',
      category: 'Commercial / Spice',
      apMajorDistricts: ['Guntur', 'Prakasam', 'Kurnool', 'Palnadu'],
      growingSeasons: ['Kharif', 'Late Kharif'],
      commonDiseaseIds: ['disease-chilli-leaf-curl'],
    },
    'crop-cotton': {
      id: 'crop-cotton',
      name_en: 'Cotton',
      name_te: 'ప్రత్తి',
      scientificName: 'Gossypium hirsutum L.',
      category: 'Commercial / Fibre',
      apMajorDistricts: ['Kurnool', 'Anantapur', 'Guntur', 'YSR Kadapa'],
      growingSeasons: ['Kharif'],
      commonDiseaseIds: ['disease-cotton-bollworm'],
    },
    'crop-groundnut': {
      id: 'crop-groundnut',
      name_en: 'Groundnut',
      name_te: 'వేరుశనగ',
      scientificName: 'Arachis hypogaea L.',
      category: 'Oilseed / Legume',
      apMajorDistricts: ['Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Chittoor'],
      growingSeasons: ['Kharif (Rainfed)', 'Rabi (Irrigated)'],
      commonDiseaseIds: ['disease-groundnut-tikka'],
    },
    'crop-maize': {
      id: 'crop-maize',
      name_en: 'Maize',
      name_te: 'మొక్కజొన్న',
      scientificName: 'Zea mays L.',
      category: 'Cereal / Feed',
      apMajorDistricts: ['Guntur', 'West Godavari', 'Prakasam'],
      growingSeasons: ['Kharif', 'Rabi'],
      commonDiseaseIds: ['disease-maize-armyworm'],
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
      commonDiseaseIds: ['disease-turmeric-rhizomerot'],
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
      ],
      evidenceStatus: 'unverified',
      lastUpdated: '2026-10-12',
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
  },
};
