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
      commonDiseaseIds: ['disease-cotton-bollworm', 'disease-cotton-whitefly', 'disease-cotton-jassids', 'disease-cotton-bacterialblight'],
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
    'crop-brinjal': {
      id: 'crop-brinjal',
      name_en: 'Brinjal / Eggplant',
      name_te: 'వంకాయ',
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
      name_te: 'బెండకాయ',
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
      name_te: 'సిట్రస్ (బత్తాయి / నిమ్మ)',
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
      name_te: 'అగ్గి తెగులు',
      conditionCategory: 'disease',
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
            'Bio-fungicide Pseudomonas fluorescens and Neem Seed Kernel Extract (NSKE) sprays during early morning or late afternoon hours are commonly used organic practices against rice blast, but a specific dose is suppressed — evidence verification could not confirm an exact figure for either against a primary reference accessible from this tool.',
          instruction_te:
            'ఉదయం లేదా సాయంత్రం వేళల్లో సూడోమోనాస్ ఫ్లోరోసెన్స్ లేదా వేప గింజల కషాయం (NSKE) పిచికారీ సాధారణ సేంద్రియ పద్ధతి, కానీ ఖచ్చితమైన మోతాదు నిలిపివేయబడింది — ఈ సాధనం ద్వారా ఈ రెండింటికీ అధికారిక మూలాన్ని పరిశీలించలేకపోయాము.',
          activeIngredient_en: 'Pseudomonas fluorescens / Azadirachtin (organic, dose suppressed)',
          activeIngredient_te: 'సూడోమోనాస్ ఫ్లోరోసెన్స్ / అజాడిరక్టిన్ (సేంద్రియ, మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Eco-friendly biocontrol; avoid mixing with synthetic chemical bactericides, which can kill the biological agent.',
          safetyCaution_te:
            'పర్యావరణ హితమైన జీవ నియంత్రణ; రసాయన బ్యాక్టీరియా నాశక మందులతో కలపవద్దు, అవి జీవ కారకాన్ని చంపేస్తాయి.',
          regulatoryNotice_en:
            'Biopesticides are regulated under the Insecticides Act, 1968 and require proper dosing. Confirm the rate with your Village Agriculture Assistant / Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'జీవ పురుగు మందులు కూడా కీటక నాశక చట్టం, 1968 పరిధిలోనే ఉంటాయి, సరైన మోతాదు అవసరం. మోతాదును గ్రామ వ్యవసాయ సహాయకుడు / రైతు భరోసా కేంద్రం (RBK) వద్ద నిర్ధారించుకోండి.',
        },
        {
          id: 't-rice-blast-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Tricyclazole 75% WP is registered for rice blast at 300-400 g of formulation per hectare in 500 litres of water, with a 30-day waiting period before harvest. It is typically used once leaf lesions exceed 2-5% of canopy area.',
          instruction_te:
            'వరిలో అగ్గి తెగులుకు ట్రైసైక్లాజోల్ 75% WP హెక్టారుకు 300-400 గ్రా. మందును 500 లీటర్ల నీటిలో కలిపి పిచికారీ చేయడానికి నమోదై ఉంది; కోతకు ముందు నిరీక్షణ వ్యవధి 30 రోజులు. సాధారణంగా ఆకులపై మచ్చలు 2-5% దాటినప్పుడు వాడతారు.',
          activeIngredient_en: 'Tricyclazole 75% WP (225-300 g a.i./ha)',
          activeIngredient_te: 'ట్రైసైక్లాజోల్ 75% WP (హెక్టారుకు 225-300 గ్రా. క్రియాశీల పదార్థం)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Observe the full 30-day pre-harvest interval.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి. కోతకు ముందు 30 రోజుల నిరీక్షణ వ్యవధిని పూర్తిగా పాటించండి.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / blast entry. This figure replaces an earlier suppressed range: secondary sources had given conflicting figures of roughly 120-450 g per acre or hectare, and the primary registry resolves it at 300-400 g formulation per hectare. Verify against your own container label before mixing.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / అగ్గి తెగులు వరుస నుండి ధృవీకరించబడింది. ఇది గతంలో నిలిపివేసిన మోతాదు స్థానంలో వచ్చింది: ఇతర మూలాలు ఎకరాకు లేదా హెక్టారుకు సుమారు 120-450 గ్రా. అని విభిన్నంగా చెప్పాయి, అధికారిక పట్టిక దీన్ని హెక్టారుకు 300-400 గ్రా. అని తేల్చింది. కలపడానికి ముందు మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకోండి.',
        },
        {
          id: 't-rice-blast-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Isoprothiolane 40% EC is registered for rice blast at 750 ml of formulation per hectare in 500-1000 litres of water, and is commonly used as a rotational option for neck blast at the boot leaf stage. Its waiting period is 60 days.',
          instruction_te:
            'వరిలో అగ్గి తెగులుకు ఐసోప్రోథియోలేన్ 40% EC హెక్టారుకు 750 మి.లీ. మందును 500-1000 లీటర్ల నీటిలో కలిపి పిచికారీ చేయడానికి నమోదై ఉంది; చిరుపొట్ట దశలో వెన్ను విరుపుకు ప్రత్యామ్నాయంగా మార్చి వాడటం సాధారణం. దీని నిరీక్షణ వ్యవధి 60 రోజులు.',
          activeIngredient_en: 'Isoprothiolane 40% EC (300 g a.i./ha)',
          activeIngredient_te: 'ఐసోప్రోథియోలేన్ 40% EC (హెక్టారుకు 300 గ్రా. క్రియాశీల పదార్థం)',
          safetyCaution_en:
            'The 60-day waiting period is long — this product is unsuitable if harvest is less than two months away. Choose Tricyclazole or consult your RBK in that case.',
          safetyCaution_te:
            '60 రోజుల నిరీక్షణ వ్యవధి చాలా ఎక్కువ — కోతకు రెండు నెలల కంటే తక్కువ సమయం ఉంటే ఈ మందు పనికిరాదు. అలాంటప్పుడు ట్రైసైక్లాజోల్ ఎంచుకోండి లేదా RBK ను సంప్రదించండి.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / blast entry. Rotate chemical classes between sprays to prevent fungal resistance developing.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / అగ్గి తెగులు వరుస నుండి ధృవీకరించబడింది. శిలీంద్రాలకు నిరోధక శక్తి రాకుండా వేర్వేరు రకాల మందులను మార్చి వాడండి.',
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
      captureGuidance: {
        instruction_en:
          'Photograph an affected leaf held flat against a plain background, close enough that the pointed ends and the pale centre of individual lesions are sharp. If panicles have emerged, also photograph the neck where each panicle joins the stem.',
        instruction_te:
          'దెబ్బతిన్న ఆకును సాదా నేపథ్యంపై చదునుగా పట్టుకుని, మచ్చల సూదిగా ఉన్న కొనలు, లోపలి పాలిపోయిన భాగం స్పష్టంగా కనిపించేంత దగ్గరగా ఫోటో తీయండి. వెన్నులు వచ్చి ఉంటే, వెన్ను కాండానికి కలిసే మెడ భాగాన్ని కూడా ఫోటో తీయండి.',
        rationale_en:
          'Lesion shape is what separates Blast from Brown Spot, and neck blast is far more damaging than leaf blast — but the neck is not visible in a photograph of the canopy.',
        rationale_te:
          'మచ్చ ఆకారమే అగ్గి తెగులును గోధుమ రంగు మచ్చల తెగులు నుండి వేరు చేస్తుంది; వెన్ను విరుపు ఆకు మచ్చల కంటే చాలా ఎక్కువ నష్టం కలిగిస్తుంది — కానీ పై నుండి తీసిన ఫోటోలో మెడ కనిపించదు.',
      },
      fieldFollowUps: [
        {
          id: 'rice-blast-q-shape',
          question_en:
            'Are the lesions spindle or diamond shaped with pointed ends and a pale ash-grey centre, rather than round with a uniform brown colour?',
          question_te:
            'మచ్చలు ఒకే గోధుమ రంగుతో గుండ్రంగా కాకుండా, రెండు కొనలు సూదిగా ఉండే కంటి ఆకారంలో, మధ్యలో పాలిపోయిన బూడిద రంగుతో ఉన్నాయా?',
          ifYes_en: 'Pointed lesions with grey centres are characteristic of Blast.',
          ifYes_te: 'సూదిగా ఉన్న కొనలు, బూడిద రంగు మధ్య భాగం అగ్గి తెగులు ప్రత్యేక లక్షణం.',
          ifNo_en: 'Round, evenly brown spots point to Brown Spot, which signals a soil fertility problem instead.',
          ifNo_te:
            'గుండ్రని, ఒకే గోధుమ రంగు మచ్చలు గోధుమ రంగు మచ్చల తెగులును సూచిస్తాయి; అది నేల సార సమస్యకు సంకేతం.',
          pointsTowardIds: ['disease-rice-blast'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-blast-q-neck',
          question_en:
            'If panicles have emerged and some are white and empty: is there a blackened, shrivelled band at the neck of the panicle?',
          question_te:
            'వెన్నులు వచ్చి కొన్ని తెల్లగా, ఖాళీగా ఉంటే: వెన్ను మెడ దగ్గర నల్లబడి ముడుచుకున్న పట్టీ ఉందా?',
          ifYes_en: 'A blackened neck is neck blast — the most damaging form, and it needs urgent attention.',
          ifYes_te:
            'మెడ నల్లబడితే అది వెన్ను విరుపు — అత్యంత నష్టదాయకమైన రూపం, వెంటనే దృష్టి పెట్టాలి.',
          ifNo_en:
            'A clean neck with a bore hole in the stem means stem borer instead, which needs an insecticide, not a fungicide.',
          ifNo_te:
            'మెడ శుభ్రంగా ఉండి కాండంలో రంధ్రం ఉంటే అది కాండం తొలుచు పురుగు; దానికి శిలీంద్రనాశకం కాదు, పురుగు మందు కావాలి.',
          pointsTowardIds: ['disease-rice-blast'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Lesions on under 2% of canopy area, confined to leaves, with no neck involvement.',
          threshold_te: 'పందిరి విస్తీర్ణంలో 2% లోపు మచ్చలు, ఆకులకే పరిమితం, మెడకు సోకలేదు.',
          action_en:
            'Below the usual spray threshold. Stop further nitrogen, keep a shallow water level, and re-inspect in three to four days.',
          action_te:
            'సాధారణ పిచికారీ స్థాయి కంటే తక్కువ. నత్రజని వేయడం ఆపి, పలుచని నీటి మట్టాన్ని ఉంచి, మూడు నాలుగు రోజుల తరువాత మళ్లీ పరిశీలించండి.',
        },
        {
          level: 'moderate',
          threshold_en: 'Lesions on 2-10% of canopy area and increasing day on day.',
          threshold_te: 'పందిరి విస్తీర్ణంలో 2-10% మచ్చలు, రోజురోజుకు పెరుగుతున్నాయి.',
          action_en:
            'This is the usual threshold at which a registered fungicide spray is justified. Choose the product by how near harvest is, since the two options differ by 30 days of waiting period.',
          action_te:
            'నమోదైన శిలీంద్రనాశకం పిచికారీ సమంజసం అయ్యే సాధారణ స్థాయి ఇదే. రెండు ఎంపికల నిరీక్షణ వ్యవధిలో 30 రోజుల తేడా ఉంది కాబట్టి కోత ఎంత దగ్గరలో ఉందో చూసి మందును ఎంచుకోండి.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% of hills affected, or any blackening at the panicle neck.',
          threshold_te: '10% పైగా దుబ్బులు దెబ్బతినడం, లేదా వెన్ను మెడ దగ్గర ఎక్కడైనా నల్లబడటం.',
          action_en:
            'Alert your RBK the same day. Neck blast directly destroys grain filling and the window for useful action is short.',
          action_te:
            'అదే రోజు RBK కు తెలియజేయండి. వెన్ను విరుపు గింజ నిండటాన్ని నేరుగా నాశనం చేస్తుంది, ఉపయోగకరమైన చర్యకు సమయం చాలా తక్కువ.',
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
      name_te: 'ఎండాకు తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas oryzae pv. oryzae',
      pathogenOrVector_te: 'బ్యాక్టీరియా: జాంథోమోనాస్ ఒరైజే పి.వి. ఒరైజే',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Water-soaked pale stripes begin at the leaf tip or along one margin and extend downwards.',
        'Stripes turn straw-yellow then greyish-white, with a wavy or rippled edge rather than a sharp border.',
        'Leaves dry from the margin inwards and roll up; whole leaves may die back.',
        'In severe early infection (kresek), young transplanted seedlings wilt and die outright.',
      ],
      observableSymptoms_te: [
        'ఆకు కొన నుండి లేదా ఒక అంచు నుండి నీటిలో నానినట్లు పాలిపోయిన చారలు మొదలై కిందికి వ్యాపిస్తాయి.',
        'చారలు గడ్డి పసుపు రంగులోకి, తరువాత బూడిద తెలుపు రంగులోకి మారి, అంచులు అలల వలె వంకరగా ఉంటాయి.',
        'ఆకులు అంచుల నుండి లోపలికి ఎండి ముడుచుకుంటాయి; ఆకు మొత్తం ఎండిపోవచ్చు.',
        'నాటిన కొత్తలో తీవ్రంగా సోకితే (క్రెసెక్) లేత మొక్కలు వాడి చనిపోతాయి.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Whole Seedling'],
      similarConditions: [
        {
          id: 'rice-blb-vs-brownspot',
          name_en: 'Brown Spot (Bipolaris oryzae / Fungal)',
          name_te: 'గోధుమ రంగు మచ్చల తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Brown Spot produces separate oval brown spots scattered across the leaf blade. Bacterial Leaf Blight produces continuous stripes running down from the tip or margin, never isolated round spots.',
          differentiatingFactors_te:
            'గోధుమ రంగు మచ్చల తెగులులో ఆకు అంతటా విడివిడిగా గుండ్రని గోధుమ మచ్చలు ఉంటాయి. ఎండాకు తెగులులో ఆకు కొన లేదా అంచు నుండి పొడవైన చారలు ఉంటాయి, విడి మచ్చలు ఉండవు.',
        },
        {
          id: 'rice-blb-vs-tipburn',
          name_en: 'Salinity or Fertiliser Tip Burn (Abiotic)',
          name_te: 'చౌడు లేదా ఎరువుల వల్ల కొన మాడిపోవడం',
          isPathological: false,
          differentiatingFactors_en:
            'Abiotic tip burn affects nearly every leaf in a patch uniformly and has a straight, sharply defined edge. Bacterial blight spreads leaf by leaf with an irregular wavy margin, and a cut lesion releases bacterial ooze.',
          differentiatingFactors_te:
            'చౌడు లేదా ఎరువుల వల్ల వచ్చే మాడు ఒక ప్రాంతంలోని అన్ని ఆకులపై ఒకేలా, నేరుగా ఉంటుంది. ఎండాకు తెగులు ఆకు నుండి ఆకుకు వ్యాపిస్తూ వంకర అంచుతో ఉంటుంది, కోసిన మచ్చ నుండి బ్యాక్టీరియా చీము కారుతుంది.',
        },
        {
          id: 'rice-blb-vs-sheathblight',
          name_en: 'Sheath Blight (Rhizoctonia solani / Fungal)',
          name_te: 'పాము పొడ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Blight starts on the leaf sheath near the water line as oval greenish-grey blotches with a brown border, then climbs. Bacterial blight starts on the leaf blade at the tip or margin and moves down.',
          differentiatingFactors_te:
            'పాము పొడ తెగులు నీటి మట్టం దగ్గర ఆకు తొడుగుపై గోధుమ అంచుతో బూడిద-పచ్చ మచ్చలుగా మొదలై పైకి ఎక్కుతుంది. ఎండాకు తెగులు ఆకు కొన లేదా అంచున మొదలై కిందికి వస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Heavy rain, strong wind and storms that wound leaves and splash bacteria between plants.',
        'Continuously flooded fields with standing water above 5 cm, and flood water moving between plots.',
        'Excessive nitrogen top-dressing, which produces soft, dense, highly susceptible foliage.',
        'Clipping of seedling leaf tips at transplanting, which creates direct entry wounds.',
      ],
      environmentalRiskFactors_te: [
        'భారీ వర్షాలు, గాలి దుమారాల వల్ల ఆకులు గాయపడి బ్యాక్టీరియా ఒక మొక్క నుండి మరొక మొక్కకు వ్యాపిస్తుంది.',
        'ఎప్పుడూ 5 సెం.మీ. పైన నీరు నిల్వ ఉండటం, పొలాల మధ్య నీరు ప్రవహించడం.',
        'నత్రజని ఎరువులు మోతాదుకు మించి వేయడం వల్ల ఆకులు మెత్తబడి తెగులు సులభంగా సోకుతుంది.',
        'నాటేటప్పుడు నారు కొనలు కత్తిరించడం వల్ల గాయాల ద్వారా బ్యాక్టీరియా లోపలికి చేరుతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Sow tolerant varieties where bacterial blight is a recurring problem in your village, and use certified disease-free seed rather than saved grain from an affected field.',
          practice_te:
            'మీ గ్రామంలో ఎండాకు తెగులు ప్రతి ఏటా వస్తుంటే తట్టుకునే రకాలను ఎంచుకోండి; తెగులు సోకిన పొలం నుండి తీసిన విత్తనం కాకుండా ధృవీకరించిన ఆరోగ్యకరమైన విత్తనం వాడండి.',
          targetTiming: 'Before sowing / nursery stage',
        },
        {
          stepNumber: 2,
          practice_en:
            'Do not clip seedling leaf tips while transplanting. Every cut is an open door for the bacterium.',
          practice_te:
            'నాటేటప్పుడు నారు ఆకుల కొనలు కత్తిరించవద్దు. ప్రతి కోత బ్యాక్టీరియా లోపలికి చేరే దారి అవుతుంది.',
          targetTiming: 'At transplanting',
        },
        {
          stepNumber: 3,
          practice_en:
            'Drain the field and keep it at shallow moisture for a few days once symptoms appear, instead of holding deep standing water that carries bacteria across the plot.',
          practice_te:
            'లక్షణాలు కనిపించిన వెంటనే పొలంలోని నీటిని తీసివేసి కొన్ని రోజులు తేమ మాత్రమే ఉంచండి; నీరు నిల్వ ఉంటే బ్యాక్టీరియా పొలమంతా వ్యాపిస్తుంది.',
          targetTiming: 'At first appearance of stripes',
        },
        {
          stepNumber: 4,
          practice_en:
            'Stop or delay further nitrogen top-dressing while the disease is active, and split the remaining nitrogen into smaller later doses.',
          practice_te:
            'తెగులు ఉధృతంగా ఉన్నప్పుడు నత్రజని ఎరువులు వేయడం ఆపండి; మిగిలిన మోతాదును తరువాత చిన్న చిన్న భాగాలుగా వేయండి.',
          targetTiming: 'During active infection',
        },
        {
          stepNumber: 5,
          practice_en:
            'Plough in or remove infected stubble and bunds weeds after harvest, as the bacterium survives on crop residue and grassy weed hosts between seasons.',
          practice_te:
            'కోత తరువాత తెగులు సోకిన మోళ్లను, గట్ల మీది గడ్డిని తీసివేయండి లేదా దున్నేయండి; బ్యాక్టీరియా వీటిపై బతికి మరుసటి పంటకు సోకుతుంది.',
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
          instruction_te:
            'మొదటి చర్యగా పొలంలోని నీటిని తీసివేసి, నత్రజని ఎరువులు ఆపండి. ఎండాకు తెగులులో ఈ రెండు పద్ధతులు ఏ పిచికారీ కంటే వేగంగా పనిచేస్తాయి, ఎందుకంటే బ్యాక్టీరియా నీటి ద్వారా వ్యాపిస్తుంది మరియు నత్రజని ఎక్కువైన మెత్తని ఆకులపై వృద్ధి చెందుతుంది.',
          safetyCaution_en:
            'Do not let drained water run directly into a neighbouring healthy paddy plot — it carries the bacterium.',
          safetyCaution_te:
            'తీసిన నీరు పక్కనున్న ఆరోగ్యకరమైన పొలంలోకి నేరుగా పారనివ్వవద్దు — ఆ నీటిలో బ్యాక్టీరియా ఉంటుంది.',
        },
        {
          id: 'rice-blb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper Sulphate Pentahydrate 6% SC is registered for bacterial leaf blight in rice at 1000 ml of formulation per hectare in 500 litres of water. The registered waiting period before harvest is 21 days.',
          instruction_te:
            'వరిలో ఎండాకు తెగులుకు కాపర్ సల్ఫేట్ పెంటాహైడ్రేట్ 6% SC హెక్టారుకు 1000 మి.లీ. మందును 500 లీటర్ల నీటిలో కలిపి పిచికారీ చేయడానికి నమోదై ఉంది. కోతకు ముందు నిరీక్షణ వ్యవధి 21 రోజులు.',
          activeIngredient_en: 'Copper Sulphate Pentahydrate 6% SC (60 g a.i./ha)',
          activeIngredient_te: 'కాపర్ సల్ఫేట్ పెంటాహైడ్రేట్ 6% SC (హెక్టారుకు 60 గ్రా. క్రియాశీల పదార్థం)',
          safetyCaution_en:
            'Wear gloves and a mask while mixing. Observe the full 21-day pre-harvest interval. Copper can scorch foliage if sprayed in peak afternoon heat — spray in the early morning or late afternoon.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి. కోతకు ముందు 21 రోజుల నిరీక్షణ వ్యవధిని తప్పక పాటించండి. మధ్యాహ్నం ఎండలో పిచికారీ చేస్తే రాగి మందు ఆకులను మాడ్చవచ్చు — ఉదయం లేదా సాయంత్రం మాత్రమే పిచికారీ చేయండి.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / bacterial leaf blight entry. Verify the figure on your own product container label before mixing, and confirm with your Rythu Bharosa Kendra (RBK).',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / ఎండాకు తెగులు వరుస నుండి ధృవీకరించబడింది. కలపడానికి ముందు మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకోండి, రైతు భరోసా కేంద్రం (RBK) వద్ద నిర్ధారించుకోండి.',
        },
        {
          id: 'rice-blb-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP (commonly called streptocycline) is registered for rice bacterial leaf blight as a 100-150 ppm spray at the early root stage, with a second spray before grain set if the disease continues. It is also registered as a 40 ppm seed soak for 12 hours and a 40-100 ppm seedling dip.',
          instruction_te:
            'స్ట్రెప్టోమైసిన్ సల్ఫేట్ 90% + టెట్రాసైక్లిన్ హైడ్రోక్లోరైడ్ 10% SP (సాధారణంగా స్ట్రెప్టోసైక్లిన్) వరిలో ఎండాకు తెగులుకు నమోదై ఉంది: వేరు దశలో 100-150 ppm పిచికారీ, తెగులు కొనసాగితే గింజ కట్టే ముందు రెండవ పిచికారీ. విత్తనాన్ని 40 ppm ద్రావణంలో 12 గంటలు నానబెట్టడం, నారును 40-100 ppm లో ముంచడం కూడా నమోదై ఉంది.',
          activeIngredient_en: 'Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP',
          activeIngredient_te: 'స్ట్రెప్టోమైసిన్ సల్ఫేట్ 90% + టెట్రాసైక్లిన్ హైడ్రోక్లోరైడ్ 10% SP',
          safetyCaution_en:
            'The registry gives this product in ppm concentration, not as a per-hectare quantity, so the amount you need depends on your spray volume — ask your RBK or Village Agriculture Assistant to work out the quantity for your tank rather than guessing. No pre-harvest waiting period is stated in the registry entry, so follow the waiting period printed on your product label.',
          safetyCaution_te:
            'ఈ మందును నమోదు పట్టికలో హెక్టారుకు కాకుండా ppm గాఢతలో ఇచ్చారు, కాబట్టి మీకు కావలసిన మొత్తం మీ పిచికారీ నీటి పరిమాణంపై ఆధారపడి ఉంటుంది — ఊహించకుండా మీ ట్యాంకుకు ఎంత కావాలో RBK లేదా గ్రామ వ్యవసాయ సహాయకుని అడిగి లెక్కించుకోండి. నమోదు పట్టికలో కోత ముందస్తు నిరీక్షణ వ్యవధి ఇవ్వలేదు, కాబట్టి మీ మందు లేబుల్‌పై ఉన్న వ్యవధిని పాటించండి.',
          regulatoryNotice_en:
            'Concentrations confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / bacterial leaf blight entry. Antibiotic sprays should be used sparingly and never as a routine calendar spray, to limit resistance development.',
          regulatoryNotice_te:
            'ఈ గాఢతలు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / ఎండాకు తెగులు వరుస నుండి ధృవీకరించబడ్డాయి. నిరోధక శక్తి పెరగకుండా ఉండాలంటే యాంటీబయాటిక్ పిచికారీలను చాలా తక్కువగా, ఎప్పుడూ అలవాటుగా కాకుండా వాడాలి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph a leaf showing the full stripe from the tip downwards, holding it flat against a plain background. Then cut one fresh lesion across with a clean blade, hold the cut end in a little clear water for a minute, and photograph any milky thread seeping out.',
        instruction_te:
          'కొన నుండి కిందికి ఉన్న చార పూర్తిగా కనిపించేలా ఒక ఆకును సాదా నేపథ్యంపై చదునుగా పట్టుకుని ఫోటో తీయండి. తరువాత శుభ్రమైన బ్లేడుతో ఒక తాజా మచ్చను అడ్డంగా కోసి, కోసిన కొనను కొద్దిగా స్వచ్ఛమైన నీటిలో ఒక నిమిషం ఉంచి, బయటకు వచ్చే పాల వంటి దారాన్ని ఫోటో తీయండి.',
        rationale_en:
          'The milky bacterial ooze from a cut lesion is the one field sign that separates bacterial blight from every fungal leaf disease. A photograph of the stripe alone cannot settle it.',
        rationale_te:
          'కోసిన మచ్చ నుండి కారే పాల వంటి బ్యాక్టీరియా చీము — ఇదే ఎండాకు తెగులును మిగతా అన్ని శిలీంద్ర ఆకు తెగుళ్ల నుండి వేరు చేసే ఏకైక గుర్తు. చార ఫోటో మాత్రమే దీన్ని నిర్ధారించలేదు.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-blb-q-ooze',
          question_en:
            'Cut a fresh lesion and dip the cut end in clear water. Does a milky or cloudy thread seep out within a minute?',
          question_te:
            'ఒక తాజా మచ్చను కోసి, కోసిన కొనను స్వచ్ఛమైన నీటిలో ముంచండి. ఒక నిమిషంలో పాల వంటి లేదా మబ్బుగా ఉన్న దారం బయటకు వస్తుందా?',
          ifYes_en: 'Bacterial ooze confirms a bacterial disease — Bacterial Leaf Blight is very likely.',
          ifYes_te: 'బ్యాక్టీరియా చీము కారితే ఇది బ్యాక్టీరియా తెగులు — ఎండాకు తెగులు అయ్యే అవకాశం చాలా ఎక్కువ.',
          ifNo_en: 'No ooze points away from bacterial blight and towards a fungal leaf disease such as Brown Spot.',
          ifNo_te: 'చీము కారకపోతే ఇది ఎండాకు తెగులు కాకపోవచ్చు; గోధుమ రంగు మచ్చల వంటి శిలీంద్ర తెగులు అయ్యే అవకాశం ఉంది.',
          pointsTowardIds: ['disease-rice-blb'],
          pointsAwayIds: ['disease-rice-brownspot', 'disease-rice-blast'],
        },
        {
          id: 'rice-blb-q-margin',
          question_en: 'Do the dried areas begin at the leaf tip or along the margin, rather than as separate spots in the middle of the leaf?',
          question_te: 'ఎండిన భాగాలు ఆకు మధ్యలో విడి మచ్చలుగా కాకుండా, ఆకు కొన లేదా అంచు నుండి మొదలవుతున్నాయా?',
          ifYes_en: 'Tip and margin spread is the typical bacterial blight pattern.',
          ifYes_te: 'కొన, అంచుల నుండి వ్యాపించడం ఎండాకు తెగులు లక్షణం.',
          ifNo_en: 'Scattered separate spots suggest Brown Spot or Blast instead.',
          ifNo_te: 'చెల్లాచెదురుగా విడి మచ్చలు ఉంటే గోధుమ రంగు మచ్చల తెగులు లేదా అగ్గి తెగులు కావచ్చు.',
          pointsTowardIds: ['disease-rice-blb'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Stripes on under 5% of leaf area, confined to a few plants at the field edge.',
          threshold_te: 'ఆకు విస్తీర్ణంలో 5% లోపు చారలు, పొలం అంచున కొన్ని మొక్కలకు మాత్రమే.',
          action_en:
            'Drain the water and stop nitrogen. Do not spray yet — mark the patch and re-inspect in three days.',
          action_te:
            'నీటిని తీసివేసి నత్రజని ఆపండి. ఇంకా పిచికారీ చేయవద్దు — ఆ ప్రాంతాన్ని గుర్తుపెట్టి మూడు రోజుల తరువాత మళ్లీ పరిశీలించండి.',
        },
        {
          level: 'moderate',
          threshold_en: 'Stripes on 5-25% of leaf area and spreading to new plants across several days.',
          threshold_te: 'ఆకు విస్తీర్ణంలో 5-25% చారలు, కొన్ని రోజులుగా కొత్త మొక్కలకు వ్యాపిస్తున్నాయి.',
          action_en:
            'Cultural steps plus a registered copper spray is justified at this level. Confirm the product and dose with your RBK first.',
          action_te:
            'ఈ స్థాయిలో సాగు పద్ధతులతో పాటు నమోదైన రాగి మందు పిచికారీ సమంజసం. ముందుగా మందు, మోతాదును RBK వద్ద నిర్ధారించుకోండి.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 25% of leaf area affected, or seedlings wilting and dying (kresek) soon after transplanting.',
          threshold_te: '25% పైగా ఆకు విస్తీర్ణం దెబ్బతినడం, లేదా నాటిన వెంటనే నారు వాడి చనిపోవడం (క్రెసెక్).',
          action_en:
            'Report to your RBK or Agriculture Officer the same day. At this stage yield loss is already occurring and the field needs direct inspection, not only a spray decision.',
          action_te:
            'అదే రోజు RBK లేదా వ్యవసాయ అధికారికి తెలియజేయండి. ఈ దశలో దిగుబడి నష్టం అప్పటికే మొదలైంది; పిచికారీ నిర్ణయం మాత్రమే కాకుండా పొలాన్ని ప్రత్యక్షంగా పరిశీలించాల్సిన అవసరం ఉంది.',
        },
      ],
      escalationThreshold_en:
        'Contact your Rythu Bharosa Kendra (RBK) or Agriculture Extension Officer immediately if seedlings are wilting within two weeks of transplanting (kresek), if more than a quarter of the leaf area is affected, or if stripes keep spreading after draining the field and stopping nitrogen. Bacterial blight has no curative chemical — once it is widespread, management decisions need a physical field inspection.',
      escalationThreshold_te:
        'నాటిన రెండు వారాలలోపు నారు వాడిపోతుంటే (క్రెసెక్), ఆకు విస్తీర్ణంలో నాలుగో వంతు కంటే ఎక్కువ దెబ్బతింటే, లేదా నీరు తీసి నత్రజని ఆపిన తరువాత కూడా చారలు వ్యాపిస్తూనే ఉంటే వెంటనే రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ విస్తరణ అధికారిని సంప్రదించండి. ఎండాకు తెగులును నయం చేసే రసాయన మందు లేదు — విస్తరించిన తరువాత నిర్ణయాలకు ప్రత్యక్ష పొల పరిశీలన అవసరం.',
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
          limitation_te:
            'ఈ మోతాదు CIBRC నమోదు పట్టిక నుండి ధృవీకరించబడింది; ఆ పట్టిక మార్గదర్శకత్వం కోసమే, చట్టపరమైన అవసరాలకు కాదని అందులోనే పేర్కొన్నారు. మీ మందు డబ్బా లేబుల్‌పై ఉన్న సూచనలే కట్టుబడి ఉండవలసినవి.',
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
          limitation_te:
            'ఈ మందుకు నమోదు పట్టికలో హెక్టారుకు మోతాదు గానీ, నిరీక్షణ వ్యవధి గానీ ఇవ్వలేదు. కాబట్టి మీ ట్యాంకుకు కావలసిన మొత్తం, కోతకు ముందు వ్యవధి రెండూ మీ మందు లేబుల్ నుండి, స్థానిక వ్యవసాయ సలహా నుండి తీసుకోవాలి.',
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
      name_te: 'గోధుమ రంగు మచ్చల తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Bipolaris oryzae (syn. Helminthosporium oryzae)',
      pathogenOrVector_te: 'శిలీంద్రం: బైపోలారిస్ ఒరైజే (హెల్మింథోస్పోరియం ఒరైజే)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Many small, separate, circular to oval brown spots scattered evenly over the leaf blade.',
        'Mature spots have a dark brown margin and a grey or pale tan centre, roughly the size and shape of a sesame seed.',
        'Spots appear first and most heavily on the older, lower leaves.',
        'On the grain, dark brown or black blotches on the husk cause discoloured, poorly filled rice.',
      ],
      observableSymptoms_te: [
        'ఆకు అంతటా సమానంగా చెల్లాచెదురుగా చిన్న చిన్న, విడివిడి, గుండ్రని లేదా అండాకార గోధుమ మచ్చలు.',
        'ముదిరిన మచ్చలకు ముదురు గోధుమ అంచు, లోపల బూడిద లేదా లేత గోధుమ రంగు ఉంటుంది; నువ్వు గింజ పరిమాణం, ఆకారంలో ఉంటాయి.',
        'మచ్చలు ముందుగా, ఎక్కువగా కింది ముదురు ఆకులపై కనిపిస్తాయి.',
        'గింజపై ముదురు గోధుమ లేదా నల్ల మచ్చలు ఏర్పడి గింజ రంగు మారి సరిగా నిండదు.',
      ],
      affectedParts: ['Leaves', 'Leaf Sheath', 'Grain / Husk', 'Seedlings'],
      similarConditions: [
        {
          id: 'rice-brownspot-vs-blast',
          name_en: 'Rice Blast (Magnaporthe oryzae / Fungal)',
          name_te: 'అగ్గి తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Blast lesions are spindle or diamond shaped with pointed ends and an ash-grey centre. Brown Spot lesions stay round or oval with blunt edges and a uniform brown colour. Blast concentrates on young upper leaves; Brown Spot on older lower leaves.',
          differentiatingFactors_te:
            'అగ్గి తెగులు మచ్చలు రెండు కొనలు సూదిగా ఉండే కంటి ఆకారంలో, మధ్యలో బూడిద రంగుతో ఉంటాయి. గోధుమ రంగు మచ్చలు గుండ్రంగా లేదా అండాకారంగా, మొద్దు అంచులతో ఒకే గోధుమ రంగులో ఉంటాయి. అగ్గి తెగులు పై లేత ఆకులపై, గోధుమ మచ్చల తెగులు కింది ముదురు ఆకులపై ఎక్కువ.',
        },
        {
          id: 'rice-brownspot-vs-nutrient',
          name_en: 'Potassium or Nitrogen Deficiency (Nutrient)',
          name_te: 'పొటాష్ లేదా నత్రజని లోపం',
          isPathological: false,
          differentiatingFactors_en:
            'A pure nutrient deficiency yellows or browns the leaf evenly from the tip and margins without discrete spots. Brown Spot makes defined individual spots — but the two very often occur together, because poor soil fertility is what makes the crop susceptible in the first place.',
          differentiatingFactors_te:
            'కేవలం పోషక లోపమైతే ఆకు కొన, అంచుల నుండి సమానంగా పసుపు లేదా గోధుమ రంగులోకి మారుతుంది, విడి మచ్చలు ఉండవు. గోధుమ మచ్చల తెగులులో స్పష్టమైన విడి మచ్చలు ఉంటాయి — అయితే ఈ రెండూ కలిసి ఉండటం చాలా సాధారణం, ఎందుకంటే నేల సారం తక్కువ ఉండటమే పంట ఈ తెగులుకు లొంగడానికి మూల కారణం.',
        },
      ],
      environmentalRiskFactors_en: [
        'Poor or unamended soil fertility — especially low nitrogen, potassium and silicon. This is the single strongest predisposing factor.',
        'Unirrigated or drought-stressed rainfed fields where the crop suffers moisture stress.',
        'Sandy, saline or degraded soils with low water-holding capacity.',
        'Prolonged leaf wetness of eight hours or more with warm temperatures.',
        'Seed carried over from an affected crop, since the fungus survives on and in the seed.',
      ],
      environmentalRiskFactors_te: [
        'నేల సారం తక్కువగా ఉండటం — ముఖ్యంగా నత్రజని, పొటాష్, సిలికాన్ లోపం. ఇదే ఈ తెగులుకు ప్రధాన కారణం.',
        'నీటి వసతి లేని, కరువు ఒత్తిడికి గురయ్యే వర్షాధార పొలాలు.',
        'ఇసుక నేలలు, చౌడు నేలలు, నీటిని నిలుపుకోలేని నిస్సారమైన నేలలు.',
        'వెచ్చని వాతావరణంలో ఎనిమిది గంటలు లేదా అంతకు మించి ఆకులు తడిగా ఉండటం.',
        'తెగులు సోకిన పంట నుండి తీసిన విత్తనం వాడటం; శిలీంద్రం విత్తనంపై, లోపల బతికి ఉంటుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Treat Brown Spot primarily as a soil fertility signal. Get a soil test and correct the nitrogen and potassium shortfall — a fungicide alone will suppress the spots but the crop will stay weak and the problem will return.',
          practice_te:
            'గోధుమ రంగు మచ్చల తెగులును ముఖ్యంగా నేల సార లోపానికి సంకేతంగా చూడండి. భూసార పరీక్ష చేయించి నత్రజని, పొటాష్ లోపాన్ని సరిదిద్దండి — కేవలం శిలీంద్రనాశకం వాడితే మచ్చలు తగ్గుతాయి కానీ పంట బలహీనంగానే ఉండి సమస్య మళ్లీ వస్తుంది.',
          targetTiming: 'Before sowing, and at top-dressing',
        },
        {
          stepNumber: 2,
          practice_en:
            'Use healthy certified seed instead of grain saved from a spotted crop, since the fungus is carried on and inside the seed.',
          practice_te:
            'మచ్చలు వచ్చిన పంట నుండి తీసిన గింజకు బదులు ఆరోగ్యకరమైన ధృవీకరించిన విత్తనం వాడండి; శిలీంద్రం విత్తనంపై, లోపల ఉంటుంది.',
          targetTiming: 'Before sowing',
        },
        {
          stepNumber: 3,
          practice_en:
            'Maintain steady soil moisture and avoid letting a rainfed field swing between waterlogging and drought stress.',
          practice_te:
            'నేలలో తేమను ఒకేలా ఉంచండి; వర్షాధార పొలం నీరు నిల్వ ఉండటం, ఎండిపోవడం మధ్య మారకుండా చూసుకోండి.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 4,
          practice_en:
            'Where soil tests show silicon deficiency, incorporating rice straw or husk ash strengthens leaf tissue and measurably reduces Brown Spot pressure.',
          practice_te:
            'భూసార పరీక్షలో సిలికాన్ లోపం ఉంటే వరి గడ్డి లేదా ఊక బూడిదను నేలలో కలపడం వల్ల ఆకు గట్టిపడి తెగులు ఉధృతి గణనీయంగా తగ్గుతుంది.',
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
          instruction_te:
            'ముందుగా పోషక లోపాన్ని సరిచేయండి. భూసార పరీక్షలో తేలిన నత్రజని, పొటాష్ లోపాన్ని భర్తీ చేయండి; నిస్సారమైన లేదా ఇసుక నేలల్లో బాగా చివికిన పశువుల ఎరువు లేదా కంపోస్టు వాడి నేల ఆరోగ్యాన్ని మెరుగుపరచండి.',
          safetyCaution_en:
            'Have the quantity worked out from an actual soil test result by your RBK — over-applying nitrogen invites Blast and Bacterial Leaf Blight instead.',
          safetyCaution_te:
            'వాస్తవ భూసార పరీక్ష ఫలితం ఆధారంగా మోతాదును RBK వద్ద లెక్కించుకోండి — నత్రజని మోతాదు మించితే అగ్గి తెగులు, ఎండాకు తెగులు వచ్చే ప్రమాదం ఉంది.',
        },
        {
          id: 'rice-brownspot-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Carbendazim 25% + Mancozeb 50% WS is registered for brown spot in rice as a seed treatment: 30-35 g of formulation, applied as a slurry at roughly 0.1 litre of water per kilogram of seed.',
          instruction_te:
            'వరిలో గోధుమ రంగు మచ్చల తెగులుకు కార్బెండాజిమ్ 25% + మాంకోజెబ్ 50% WS విత్తన శుద్ధికి నమోదై ఉంది: 30-35 గ్రా. మందును కిలో విత్తనానికి సుమారు 0.1 లీటరు నీటితో ముద్దగా కలిపి పట్టించాలి.',
          activeIngredient_en: 'Carbendazim 25% + Mancozeb 50% WS (seed treatment)',
          activeIngredient_te: 'కార్బెండాజిమ్ 25% + మాంకోజెబ్ 50% WS (విత్తన శుద్ధి)',
          safetyCaution_en:
            'Treated seed is poisonous and must never be eaten or fed to animals. Mix in the open wearing gloves and a mask, and keep treated seed in clearly marked bags away from food grain. The registry states no waiting period for this seed-treatment entry.',
          safetyCaution_te:
            'శుద్ధి చేసిన విత్తనం విషపూరితం — తినడానికి గానీ, పశువులకు గానీ ఎట్టి పరిస్థితుల్లో వాడవద్దు. ఆరుబయట చేతి తొడుగులు, మాస్క్ ధరించి కలపండి; శుద్ధి చేసిన విత్తనాన్ని స్పష్టంగా గుర్తు పెట్టిన సంచుల్లో, ఆహార ధాన్యానికి దూరంగా ఉంచండి. ఈ విత్తన శుద్ధికి నమోదు పట్టికలో నిరీక్షణ వ్యవధి ఇవ్వలేదు.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice entry listing brown spot, blast and sheath blight. Verify against your product container label and confirm with your RBK.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి వరుస (గోధుమ మచ్చ, అగ్గి తెగులు, పాము పొడ తెగులు) నుండి ధృవీకరించబడింది. మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకుని RBK వద్ద నిర్ధారించుకోండి.',
        },
        {
          id: 'rice-brownspot-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'For a standing crop with spreading spots, Hexaconazole 4% + Zineb 68% WP is registered covering brown spot, sheath blight, blast and grain discolouration at 1000-1250 g of formulation per hectare in 500 litres of water, with a 34-day waiting period before harvest.',
          instruction_te:
            'పొలంలో మచ్చలు వ్యాపిస్తుంటే హెక్సాకొనజోల్ 4% + జినెబ్ 68% WP నమోదై ఉంది (గోధుమ మచ్చ, పాము పొడ తెగులు, అగ్గి తెగులు, గింజ రంగు మారడం): హెక్టారుకు 1000-1250 గ్రా. మందును 500 లీటర్ల నీటిలో కలిపి పిచికారీ చేయాలి; కోతకు ముందు 34 రోజుల నిరీక్షణ వ్యవధి.',
          activeIngredient_en: 'Hexaconazole 4% + Zineb 68% WP (720-900 g a.i./ha)',
          activeIngredient_te: 'హెక్సాకొనజోల్ 4% + జినెబ్ 68% WP (హెక్టారుకు 720-900 గ్రా. క్రియాశీల పదార్థం)',
          safetyCaution_en:
            'Wear gloves and a mask while mixing and spraying, and do not spray against the wind. Observe the full 34-day pre-harvest interval. Spraying without also correcting soil fertility will not stop the problem returning.',
          safetyCaution_te:
            'కలిపేటప్పుడు, పిచికారీ చేసేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు. కోతకు ముందు 34 రోజుల నిరీక్షణ వ్యవధిని పూర్తిగా పాటించండి. నేల సారాన్ని సరిదిద్దకుండా కేవలం పిచికారీ చేస్తే సమస్య మళ్లీ వస్తుంది.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice crop section. Verify against your own product container label before mixing and confirm with your RBK. Rotate fungicide classes across sprays to limit resistance.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి విభాగం నుండి ధృవీకరించబడింది. కలపడానికి ముందు మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకుని RBK వద్ద నిర్ధారించుకోండి. నిరోధక శక్తి పెరగకుండా వేర్వేరు రకాల శిలీంద్రనాశకాలను మార్చి మార్చి వాడండి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph an older lower leaf held flat, close enough that the shape of individual spots is clear. If you can, photograph the whole plant too, and note whether the field is rainfed or has had little fertiliser.',
        instruction_te:
          'కింది ముదురు ఆకును చదునుగా పట్టుకుని, విడి మచ్చల ఆకారం స్పష్టంగా కనిపించేంత దగ్గరగా ఫోటో తీయండి. వీలైతే మొక్క మొత్తాన్ని కూడా ఫోటో తీసి, పొలం వర్షాధారమా లేదా ఎరువులు తక్కువగా వేశారా అనేది గుర్తుంచుకోండి.',
        rationale_en:
          'Spot shape is what separates Brown Spot from Blast, and it is only visible in a close, sharp photograph of an older leaf.',
        rationale_te:
          'మచ్చ ఆకారమే గోధుమ రంగు మచ్చల తెగులును అగ్గి తెగులు నుండి వేరు చేస్తుంది; అది ముదురు ఆకు దగ్గరగా, స్పష్టంగా తీసిన ఫోటోలో మాత్రమే కనిపిస్తుంది.',
      },
      fieldFollowUps: [
        {
          id: 'rice-brownspot-q-shape',
          question_en: 'Are the spots round or oval with blunt edges, rather than pointed at both ends like a grain of rice?',
          question_te: 'మచ్చలు రెండు కొనలు సూదిగా ఉన్న వరి గింజ ఆకారంలో కాకుండా, మొద్దు అంచులతో గుండ్రంగా లేదా అండాకారంగా ఉన్నాయా?',
          ifYes_en: 'Round blunt spots point to Brown Spot.',
          ifYes_te: 'గుండ్రని మొద్దు మచ్చలు గోధుమ రంగు మచ్చల తెగులును సూచిస్తాయి.',
          ifNo_en: 'Pointed spindle-shaped lesions with grey centres point to Blast instead.',
          ifNo_te: 'కొనలు సూదిగా, మధ్యలో బూడిద రంగుతో ఉంటే అది అగ్గి తెగులు కావచ్చు.',
          pointsTowardIds: ['disease-rice-brownspot'],
          pointsAwayIds: ['disease-rice-blast'],
        },
        {
          id: 'rice-brownspot-q-fertility',
          question_en: 'Is this field rainfed, sandy, saline, or one where little fertiliser has been applied this season?',
          question_te: 'ఈ పొలం వర్షాధారమా, ఇసుక నేలా, చౌడు నేలా, లేదా ఈ సీజన్‌లో ఎరువులు తక్కువగా వేసిన పొలమా?',
          ifYes_en:
            'Low fertility strongly supports Brown Spot, and tells you the real fix is soil nutrition, not just a spray.',
          ifYes_te:
            'నేల సారం తక్కువగా ఉండటం గోధుమ రంగు మచ్చల తెగులును బలంగా సూచిస్తుంది; అసలు పరిష్కారం పిచికారీ కాదు, నేల పోషకాలే అని దీని అర్థం.',
          ifNo_en: 'A well-fertilised, well-watered field with spots makes Blast or another leaf disease more likely.',
          ifNo_te: 'ఎరువులు, నీరు బాగా అందిన పొలంలో మచ్చలు ఉంటే అగ్గి తెగులు లేదా మరొక ఆకు తెగులు అయ్యే అవకాశం ఎక్కువ.',
          pointsTowardIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-brownspot-q-position',
          question_en: 'Are the spots worst on the older lower leaves rather than the young upper leaves?',
          question_te: 'మచ్చలు పై లేత ఆకులపై కాకుండా, కింది ముదురు ఆకులపై ఎక్కువగా ఉన్నాయా?',
          ifYes_en: 'Lower-leaf concentration fits Brown Spot and nutrient stress.',
          ifYes_te: 'కింది ఆకులపై ఎక్కువగా ఉండటం గోధుమ రంగు మచ్చల తెగులుకు, పోషక లోపానికి సరిపోతుంది.',
          ifNo_en: 'Damage concentrated on young upper leaves fits Blast.',
          ifNo_te: 'పై లేత ఆకులపై ఎక్కువ నష్టం ఉంటే అది అగ్గి తెగులుకు సరిపోతుంది.',
          pointsTowardIds: ['disease-rice-brownspot'],
          pointsAwayIds: ['disease-rice-blast'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Scattered spots on under 5% of leaf area, mainly on the lowest leaves.',
          threshold_te: 'ఆకు విస్తీర్ణంలో 5% లోపు చెల్లాచెదురు మచ్చలు, ముఖ్యంగా అట్టడుగు ఆకులపై.',
          action_en:
            'No spray needed. Correct soil nutrition and keep moisture steady — at this level a fungicide is not an economic use of money.',
          action_te:
            'పిచికారీ అవసరం లేదు. నేల పోషకాలను సరిదిద్ది తేమను ఒకేలా ఉంచండి — ఈ స్థాయిలో శిలీంద్రనాశకం వాడటం ఖర్చుకు తగిన ప్రయోజనం ఇవ్వదు.',
        },
        {
          level: 'moderate',
          threshold_en: 'Spots on 5-20% of leaf area, now also on middle leaves.',
          threshold_te: 'ఆకు విస్తీర్ణంలో 5-20% మచ్చలు, మధ్య ఆకులకు కూడా వ్యాపించాయి.',
          action_en:
            'Correct nutrition and consider one registered fungicide spray, particularly if the crop is near flowering when grain discolouration risk rises.',
          action_te:
            'పోషకాలను సరిదిద్దండి, నమోదైన శిలీంద్రనాశకంతో ఒక పిచికారీని పరిశీలించండి — ముఖ్యంగా పంట పూత దశకు దగ్గరగా ఉంటే, అప్పుడు గింజ రంగు మారే ప్రమాదం పెరుగుతుంది.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 20% of leaf area affected, or dark blotches already appearing on the grain husk.',
          threshold_te: '20% పైగా ఆకు విస్తీర్ణం దెబ్బతినడం, లేదా గింజ పొట్టుపై ముదురు మచ్చలు కనిపించడం.',
          action_en:
            'Consult your RBK. Grain discolouration directly reduces the price you get, and the field likely has a fertility problem that needs a soil test, not just another spray.',
          action_te:
            'RBK ను సంప్రదించండి. గింజ రంగు మారితే మీకు వచ్చే ధర నేరుగా తగ్గుతుంది; ఈ పొలంలో భూసార పరీక్ష అవసరమైన సార లోపం ఉండే అవకాశం ఎక్కువ, మరో పిచికారీ సరిపోదు.',
        },
      ],
      escalationThreshold_en:
        'Consult your Rythu Bharosa Kendra (RBK) if spots cover more than a fifth of the leaf area, if dark blotches appear on the grain husk, or if the problem recurs season after season in the same field. Recurring Brown Spot is a soil fertility problem that a soil test should settle, and historically severe outbreaks of this disease have followed widespread soil nutrient exhaustion rather than any failure of spraying.',
      escalationThreshold_te:
        'మచ్చలు ఆకు విస్తీర్ణంలో ఐదో వంతు కంటే ఎక్కువ ఆక్రమిస్తే, గింజ పొట్టుపై ముదురు మచ్చలు కనిపిస్తే, లేదా అదే పొలంలో ప్రతి సీజన్‌లో ఈ సమస్య పునరావృతమైతే రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి. పదే పదే వచ్చే గోధుమ రంగు మచ్చల తెగులు నేల సార సమస్య; దీన్ని భూసార పరీక్ష ద్వారా తేల్చుకోవాలి. గతంలో ఈ తెగులు తీవ్రంగా వ్యాపించిన సందర్భాలు పిచికారీ వైఫల్యం వల్ల కాక, విస్తృతమైన నేల పోషక క్షీణత వల్లే జరిగాయి.',
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
      name_te: 'పాము పొడ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Rhizoctonia solani (Thanatephorus cucumeris)',
      pathogenOrVector_te: 'శిలీంద్రం: రైజోక్టోనియా సొలాని',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Oval, greenish-grey water-soaked blotches on the leaf sheath, starting near the water line.',
        'Lesions dry to a straw-white centre ringed by an irregular purple-brown border, giving a snakeskin pattern.',
        'Lesions climb upward from sheath to sheath and onto the leaf blades as the crop closes canopy.',
        'White cottony fungal threads and small brown-black seed-like sclerotia on the sheath surface in humid weather.',
        'Badly affected tillers lodge, and panicles fill poorly or not at all.',
      ],
      observableSymptoms_te: [
        'ఆకు తొడుగుపై నీటి మట్టం దగ్గర నుండి మొదలయ్యే అండాకార, బూడిద-పచ్చ రంగు నానిన మచ్చలు.',
        'మచ్చల మధ్య భాగం ఎండి గడ్డి తెలుపు రంగులోకి మారి, చుట్టూ ఊదా-గోధుమ వంకర అంచు ఏర్పడి పాము పొడ వలె కనిపిస్తుంది.',
        'పంట దట్టంగా పెరిగే కొద్దీ మచ్చలు ఒక తొడుగు నుండి మరొక తొడుగుకు, ఆకులపైకి ఎక్కుతాయి.',
        'తేమ వాతావరణంలో తొడుగుపై తెల్లని దూది వంటి శిలీంద్ర తంతువులు, చిన్న గోధుమ-నలుపు గింజల వంటి స్క్లెరోషియా కనిపిస్తాయి.',
        'తీవ్రంగా సోకిన పిలకలు పడిపోతాయి, వెన్నులు సరిగా నిండవు.',
      ],
      affectedParts: ['Leaf Sheath', 'Leaves', 'Tillers', 'Panicle'],
      similarConditions: [
        {
          id: 'rice-sheathblight-vs-sheathrot',
          name_en: 'Sheath Rot (Sarocladium oryzae / Fungal)',
          name_te: 'తొడుగు కుళ్ళు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Rot attacks the uppermost flag leaf sheath at booting and traps the panicle inside, often with a powdery white growth. Sheath Blight starts low near the water line and climbs upward, with snakeskin-patterned lesions.',
          differentiatingFactors_te:
            'తొడుగు కుళ్ళు తెగులు చిరుపొట్ట దశలో పై కంకి ఆకు తొడుగును ఆశించి వెన్ను బయటకు రాకుండా చేస్తుంది, తరచూ తెల్లని పొడి వంటి పెరుగుదల ఉంటుంది. పాము పొడ తెగులు నీటి మట్టం దగ్గర మొదలై పైకి ఎక్కుతుంది, మచ్చలు పాము పొడ వలె ఉంటాయి.',
        },
        {
          id: 'rice-sheathblight-vs-stemborer',
          name_en: 'Stem Borer Damage (Scirpophaga incertulas / Pest)',
          name_te: 'కాండం తొలుచు పురుగు నష్టం',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer kills the central shoot cleanly and leaves a bore hole with frass; the dead heart pulls out easily. Sheath Blight leaves surface lesions on the sheath with no bore hole, and the tiller stays attached.',
          differentiatingFactors_te:
            'కాండం తొలుచు పురుగు మధ్య మొవ్వును పూర్తిగా చంపి, రంధ్రం, రెట్టలు వదులుతుంది; ఎండిన మొవ్వు సులభంగా ఊడి వస్తుంది. పాము పొడ తెగులులో తొడుగుపై పైపైన మచ్చలు ఉంటాయి, రంధ్రం ఉండదు, పిలక ఊడి రాదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense planting and a closed canopy that traps humidity around the base of the crop.',
        'High nitrogen fertilisation producing heavy, lush tillering.',
        'Continuous standing water with relative humidity above 90% and warm temperatures of 28-32°C.',
        'Sclerotia surviving in soil and floating on irrigation water from a previously infected field.',
      ],
      environmentalRiskFactors_te: [
        'మొక్కల మధ్య దూరం తక్కువగా ఉండి పంట దట్టంగా పెరగడం వల్ల మొదళ్ల దగ్గర తేమ నిలిచిపోవడం.',
        'నత్రజని ఎరువులు ఎక్కువగా వేయడం వల్ల పిలకలు దట్టంగా, మెత్తగా పెరగడం.',
        'నీరు ఎప్పుడూ నిల్వ ఉండటం, గాలిలో తేమ 90% పైన, ఉష్ణోగ్రత 28-32°C ఉండటం.',
        'గతంలో తెగులు సోకిన పొలం నుండి స్క్లెరోషియా నేలలో బతికి ఉండటం, నీటిపై తేలి రావడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Avoid over-dense planting. Keep the recommended spacing and leave periodic alleys so air can move through the canopy and dry the base of the crop.',
          practice_te:
            'మొక్కలను మరీ దట్టంగా నాటవద్దు. సిఫారసు చేసిన దూరం పాటించి, మధ్య మధ్య బాటలు వదలండి; అప్పుడు గాలి ప్రసరించి పంట మొదళ్లు ఆరుతాయి.',
          targetTiming: 'At transplanting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Split nitrogen into several smaller doses rather than one heavy application, and do not exceed the recommended total.',
          practice_te:
            'నత్రజనిని ఒకేసారి ఎక్కువగా కాకుండా పలు చిన్న మోతాదులుగా వేయండి; సిఫారసు చేసిన మొత్తాన్ని మించవద్దు.',
          targetTiming: 'Top-dressing stages',
        },
        {
          stepNumber: 3,
          practice_en:
            'Skim off and destroy the floating sclerotia and crop debris during land preparation, since they are the main carry-over source between seasons.',
          practice_te:
            'దమ్ము చేసేటప్పుడు నీటిపై తేలే స్క్లెరోషియా, పంట వ్యర్థాలను తీసి నాశనం చేయండి; మరుసటి పంటకు తెగులు చేరేది వీటి ద్వారానే.',
          targetTiming: 'Land preparation',
        },
        {
          stepNumber: 4,
          practice_en:
            'Alternate wetting and drying instead of permanent deep flooding lowers humidity at the plant base and slows the fungus climbing.',
          practice_te:
            'ఎప్పుడూ లోతుగా నీరు నిల్వ ఉంచకుండా, తడి-ఆరు పద్ధతిలో నీటిని యాజమాన్యం చేస్తే మొదళ్ల దగ్గర తేమ తగ్గి శిలీంద్రం పైకి ఎక్కడం నెమ్మదిస్తుంది.',
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
          instruction_te:
            'కొన్ని రోజులు పొలంలోని నీటిని తీసివేసి, వీలైతే ఒక వరుసను తీసి బాట ఏర్పాటు చేసి పంటలోకి గాలి ప్రసరించేలా చేయండి. మొదళ్ల దగ్గర తేమ తగ్గితే శిలీంద్రం ఒక తొడుగు నుండి మరొక తొడుగుకు ఎక్కడం నెమ్మదిస్తుంది; ఈ తెగులు నష్టం కలిగించేది అలా ఎక్కడం ద్వారానే.',
          safetyCaution_en:
            'Do not drain so hard that the crop suffers moisture stress at flowering — alternate wetting and drying, not complete drying out.',
          safetyCaution_te:
            'పూత దశలో పంటకు నీటి ఎద్దడి కలిగేంతగా నీటిని తీసివేయవద్దు — పూర్తిగా ఎండబెట్టకుండా తడి-ఆరు పద్ధతిని పాటించండి.',
        },
        {
          id: 'rice-sheathblight-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Validamycin 3% L is registered for rice sheath blight at 2000 g of formulation per hectare in 750 litres of water. Its waiting period is 14 days, the shortest among the registered options, which matters if the crop is close to harvest.',
          instruction_te:
            'వరిలో పాము పొడ తెగులుకు వాలిడామైసిన్ 3% L హెక్టారుకు 2000 గ్రా. మందును 750 లీటర్ల నీటిలో కలిపి పిచికారీ చేయడానికి నమోదై ఉంది. దీని నిరీక్షణ వ్యవధి 14 రోజులు — నమోదైన మందులలో అతి తక్కువ; కోత దగ్గరపడినప్పుడు ఇది ముఖ్యం.',
          activeIngredient_en: 'Validamycin 3% L (60 g a.i./ha)',
          activeIngredient_te: 'వాలిడామైసిన్ 3% L (హెక్టారుకు 60 గ్రా. క్రియాశీల పదార్థం)',
          safetyCaution_en:
            'Direct the spray at the lower sheath region where the lesions actually are, not just over the top of the canopy. Wear gloves and a mask. Observe the 14-day pre-harvest interval.',
          safetyCaution_te:
            'పిచికారీని పంట పైభాగంపై మాత్రమే కాకుండా, మచ్చలు ఉన్న కింది తొడుగు భాగంపై పడేలా చేయండి. చేతి తొడుగులు, మాస్క్ ధరించండి. కోతకు ముందు 14 రోజుల నిరీక్షణ వ్యవధిని పాటించండి.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / sheath blight entry. The registry notes no residues on grain or straw when applied 14 days before harvest. Verify against your own product container label before mixing and confirm with your RBK.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / పాము పొడ తెగులు వరుస నుండి ధృవీకరించబడింది. కోతకు 14 రోజుల ముందు వాడితే గింజపై, గడ్డిపై అవశేషాలు ఉండవని పట్టికలో పేర్కొన్నారు. కలపడానికి ముందు మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకుని RBK వద్ద నిర్ధారించుకోండి.',
        },
        {
          id: 'rice-sheathblight-chem-2',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Alternative registered options for rotation are Hexaconazole 5% EC at 1000 ml per hectare in 500 litres of water (40-day waiting period), and Propiconazole 25% EC at 500 g per hectare in 750 litres (30-day waiting period).',
          instruction_te:
            'మార్చి వాడటానికి నమోదైన ప్రత్యామ్నాయాలు: హెక్సాకొనజోల్ 5% EC హెక్టారుకు 1000 మి.లీ. 500 లీటర్ల నీటిలో (నిరీక్షణ 40 రోజులు), ప్రొపికొనజోల్ 25% EC హెక్టారుకు 500 గ్రా. 750 లీటర్ల నీటిలో (నిరీక్షణ 30 రోజులు).',
          activeIngredient_en: 'Hexaconazole 5% EC (50 g a.i./ha) or Propiconazole 25% EC (125 g a.i./ha)',
          activeIngredient_te: 'హెక్సాకొనజోల్ 5% EC (హెక్టారుకు 50 గ్రా.) లేదా ప్రొపికొనజోల్ 25% EC (హెక్టారుకు 125 గ్రా.)',
          safetyCaution_en:
            'Both have much longer waiting periods than Validamycin — 40 and 30 days. Do not choose either if harvest is closer than that. Rotate between chemical classes rather than repeating the same one.',
          safetyCaution_te:
            'ఈ రెండింటి నిరీక్షణ వ్యవధి వాలిడామైసిన్ కంటే చాలా ఎక్కువ — 40, 30 రోజులు. కోత అంతకంటే దగ్గరగా ఉంటే వీటిని ఎంచుకోవద్దు. ఒకే మందును పదే పదే కాకుండా వేర్వేరు రకాలను మార్చి వాడండి.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Fungicides) registry, rice / sheath blight entries. Verify against your own container label before mixing.',
          regulatoryNotice_te:
            'ఈ మోతాదులు CIBRC శిలీంద్రనాశక నమోదు పట్టికలోని వరి / పాము పొడ తెగులు వరుసల నుండి ధృవీకరించబడ్డాయి. కలపడానికి ముందు మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకోండి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Part the tillers and photograph the leaf sheath at and just above the water line, not the top of the plant. Pull back one outer sheath so the lesion and its border are clearly visible, and look for small brown seed-like bodies on the surface.',
        instruction_te:
          'పిలకలను పక్కకు జరిపి, మొక్క పైభాగాన్ని కాకుండా నీటి మట్టం దగ్గర, దాని కొద్దిగా పైన ఉన్న ఆకు తొడుగును ఫోటో తీయండి. ఒక బయటి తొడుగును కొద్దిగా విప్పి మచ్చ, దాని అంచు స్పష్టంగా కనిపించేలా చేయండి; తొడుగుపై చిన్న గోధుమ రంగు గింజల వంటి వాటిని గమనించండి.',
        rationale_en:
          'Sheath Blight lives at the base of the crop. A photograph of the canopy from above will miss it entirely and may instead look like a nutrient problem.',
        rationale_te:
          'పాము పొడ తెగులు పంట మొదళ్ల దగ్గర ఉంటుంది. పై నుండి తీసిన ఫోటోలో అది అస్సలు కనిపించదు, పైగా పోషక లోపం వలె కనిపించవచ్చు.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-sheathblight-q-waterline',
          question_en: 'Did the damage begin on the sheath near the water line and move upward, rather than starting on the leaves?',
          question_te: 'నష్టం ఆకులపై కాకుండా, నీటి మట్టం దగ్గర తొడుగుపై మొదలై పైకి వ్యాపించిందా?',
          ifYes_en: 'Upward spread from the water line is the defining Sheath Blight pattern.',
          ifYes_te: 'నీటి మట్టం నుండి పైకి వ్యాపించడం పాము పొడ తెగులు ప్రధాన లక్షణం.',
          ifNo_en: 'Damage beginning on the leaf blade points to Blast, Brown Spot or Bacterial Leaf Blight.',
          ifNo_te: 'నష్టం ఆకుపై మొదలైతే అగ్గి తెగులు, గోధుమ మచ్చల తెగులు లేదా ఎండాకు తెగులు కావచ్చు.',
          pointsTowardIds: ['disease-rice-sheathblight'],
          pointsAwayIds: ['disease-rice-blast', 'disease-rice-blb'],
        },
        {
          id: 'rice-sheathblight-q-sclerotia',
          question_en: 'Can you see small brown or black seed-like bodies, about the size of a mustard grain, loose on the sheath surface?',
          question_te: 'తొడుగు ఉపరితలంపై ఆవ గింజ పరిమాణంలో చిన్న గోధుమ లేదా నల్ల గింజల వంటివి వదులుగా కనిపిస్తున్నాయా?',
          ifYes_en: 'Those are sclerotia and they effectively confirm Sheath Blight.',
          ifYes_te: 'అవి స్క్లెరోషియా; ఇవి కనిపిస్తే పాము పొడ తెగులు దాదాపు నిర్ధారణ అయినట్లే.',
          ifNo_en:
            'Their absence does not rule it out — sclerotia form mainly in humid weather and in later stages.',
          ifNo_te:
            'అవి కనిపించకపోయినా తెగులు కాదని చెప్పలేము — స్క్లెరోషియా ఎక్కువగా తేమ వాతావరణంలో, ముదిరిన దశలో ఏర్పడతాయి.',
          pointsTowardIds: ['disease-rice-sheathblight'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Lesions confined to the lowest sheaths, below about a quarter of the plant height.',
          threshold_te: 'మచ్చలు అట్టడుగు తొడుగులకే పరిమితం, మొక్క ఎత్తులో సుమారు నాలుగో వంతు కంటే కింద.',
          action_en:
            'Drain and open the canopy. Hold off on spraying and re-inspect in four to five days.',
          action_te:
            'నీటిని తీసి పంటలోకి గాలి ప్రసరించేలా చేయండి. పిచికారీ ఆపి నాలుగైదు రోజుల తరువాత మళ్లీ పరిశీలించండి.',
        },
        {
          level: 'moderate',
          threshold_en: 'Lesions have climbed to between a quarter and half the plant height, or affect more than 10-15% of tillers.',
          threshold_te: 'మచ్చలు మొక్క ఎత్తులో నాలుగో వంతు నుండి సగం వరకు ఎక్కాయి, లేదా 10-15% పైగా పిలకలను ఆశించాయి.',
          action_en:
            'A registered fungicide spray is justified now, directed at the lower sheath. Choose the product by how near harvest is, since waiting periods differ a lot.',
          action_te:
            'ఇప్పుడు నమోదైన శిలీంద్రనాశకం పిచికారీ సమంజసం; దాన్ని కింది తొడుగుపై పడేలా చేయండి. నిరీక్షణ వ్యవధులు చాలా తేడాగా ఉంటాయి కాబట్టి కోత ఎంత దగ్గరలో ఉందో చూసి మందును ఎంచుకోండి.',
        },
        {
          level: 'severe',
          threshold_en: 'Lesions above half the plant height, reaching the flag leaf, or tillers already lodging.',
          threshold_te: 'మచ్చలు మొక్క ఎత్తులో సగం పైన, కంకి ఆకు వరకు చేరడం, లేదా పిలకలు అప్పటికే పడిపోవడం.',
          action_en:
            'Contact your RBK the same day. Once the fungus reaches the flag leaf, grain filling is directly at risk and spray timing becomes critical.',
          action_te:
            'అదే రోజు RBK ను సంప్రదించండి. శిలీంద్రం కంకి ఆకుకు చేరిన తరువాత గింజ నిండటం నేరుగా దెబ్బతింటుంది, పిచికారీ సమయం చాలా కీలకం అవుతుంది.',
        },
      ],
      escalationThreshold_en:
        'Contact your Rythu Bharosa Kendra (RBK) or Agriculture Extension Officer if lesions climb past half the plant height, reach the flag leaf, or if tillers begin to lodge. Sheath Blight at the flag leaf stage threatens grain filling directly, and the choice of fungicide then depends on how many days remain to harvest — a decision worth confirming in person.',
      escalationThreshold_te:
        'మచ్చలు మొక్క ఎత్తులో సగం దాటి ఎక్కితే, కంకి ఆకుకు చేరితే, లేదా పిలకలు పడిపోవడం మొదలైతే రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ విస్తరణ అధికారిని సంప్రదించండి. కంకి ఆకు దశలో పాము పొడ తెగులు గింజ నిండటాన్ని నేరుగా దెబ్బతీస్తుంది; కోతకు ఎన్ని రోజులు ఉన్నాయో దాన్ని బట్టి మందు ఎంపిక మారుతుంది కాబట్టి ప్రత్యక్షంగా సంప్రదించడం మేలు.',
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

    'disease-rice-stemborer': {
      id: 'disease-rice-stemborer',
      cropId: 'crop-rice',
      name_en: 'Yellow Stem Borer',
      name_te: 'కాండం తొలుచు పురుగు',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect pest: Scirpophaga incertulas (larva bores inside the stem)',
      pathogenOrVector_te: 'పురుగు: స్కిర్పోఫాగా ఇన్సర్టులాస్ (లద్దె పురుగు కాండం లోపల తొలుస్తుంది)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Dead heart in the vegetative stage: the central shoot dries to straw colour while the surrounding leaves stay green, and it pulls out easily with a gentle tug.',
        'White ear in the reproductive stage: the whole panicle emerges white, erect and empty, with no filled grain.',
        'A small round bore hole near a node, often with powdery frass at the opening.',
        'Creamy-white larvae with a dark head inside a split stem.',
        'Flat, pale egg masses covered with light brown hairs on the upper leaf surface.',
      ],
      observableSymptoms_te: [
        'ఎదుగుదల దశలో మొవ్వు చావు: చుట్టూ ఆకులు పచ్చగా ఉండగా మధ్య మొవ్వు మాత్రం ఎండి గడ్డి రంగులోకి మారుతుంది, మెల్లగా లాగితే సులభంగా ఊడి వస్తుంది.',
        'వెన్ను దశలో తెల్ల కంకి: వెన్ను మొత్తం తెల్లగా, నిటారుగా, గింజ లేకుండా వస్తుంది.',
        'కణుపు దగ్గర చిన్న గుండ్రని రంధ్రం, దాని నోటి దగ్గర పొడి వంటి రెట్టలు.',
        'కాండాన్ని చీల్చి చూస్తే లోపల నల్ల తల ఉన్న లేత తెలుపు రంగు లద్దె పురుగులు.',
        'ఆకు పైభాగంలో లేత గోధుమ రంగు వెంట్రుకలతో కప్పబడిన చదునైన గుడ్ల సముదాయం.',
      ],
      affectedParts: ['Stem / Tiller', 'Central Shoot', 'Panicle'],
      similarConditions: [
        {
          id: 'rice-stemborer-vs-gallmidge',
          name_en: 'Rice Gall Midge (Orseolia oryzae / Pest)',
          name_te: 'కాండం ఈగ',
          isPathological: true,
          differentiatingFactors_en:
            'Gall midge turns the shoot into a hollow silvery tube like an onion leaf, and the plant stays alive and produces more tillers. Stem borer kills the shoot outright, leaving a dry dead heart that pulls out and a bore hole with frass.',
          differentiatingFactors_te:
            'కాండం ఈగ మొవ్వును ఉల్లి ఆకు వలె బోలు వెండి రంగు గొట్టంగా మారుస్తుంది, మొక్క బతికి ఉండి ఎక్కువ పిలకలు వేస్తుంది. కాండం తొలుచు పురుగు మొవ్వును పూర్తిగా చంపుతుంది; ఎండిన మొవ్వు ఊడి వస్తుంది, రంధ్రం, రెట్టలు ఉంటాయి.',
        },
        {
          id: 'rice-stemborer-vs-neckblast',
          name_en: 'Neck Blast (Magnaporthe oryzae / Fungal)',
          name_te: 'వెన్ను విరుపు (అగ్గి తెగులు)',
          isPathological: true,
          differentiatingFactors_en:
            'Both produce white empty panicles. Neck blast leaves a blackened shrivelled lesion at the neck where the panicle bends or breaks, and no bore hole. Stem borer leaves a clean bore hole with frass and no neck lesion — this distinction decides whether you need a fungicide or an insecticide.',
          differentiatingFactors_te:
            'రెండూ తెల్లని ఖాళీ వెన్నులను ఇస్తాయి. వెన్ను విరుపులో వెన్ను మెడ దగ్గర నల్లబడి ముడుచుకున్న మచ్చ ఉండి అక్కడ వంగి లేదా విరిగిపోతుంది, రంధ్రం ఉండదు. కాండం తొలుచు పురుగులో శుభ్రమైన రంధ్రం, రెట్టలు ఉంటాయి, మెడ దగ్గర మచ్చ ఉండదు — ఈ తేడాయే శిలీంద్రనాశకం కావాలా, పురుగు మందు కావాలా అనేది నిర్ణయిస్తుంది.',
        },
        {
          id: 'rice-stemborer-vs-sheathblight',
          name_en: 'Sheath Blight (Rhizoctonia solani / Fungal)',
          name_te: 'పాము పొడ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Sheath Blight shows surface lesions on the sheath with no bore hole and the tiller stays firmly attached. Stem borer damage is internal, with a hole and frass, and the dead shoot lifts out.',
          differentiatingFactors_te:
            'పాము పొడ తెగులులో తొడుగుపై పైపైన మచ్చలు ఉంటాయి, రంధ్రం ఉండదు, పిలక గట్టిగా అతుక్కుని ఉంటుంది. కాండం తొలుచు పురుగు నష్టం లోపల ఉంటుంది — రంధ్రం, రెట్టలు ఉంటాయి, ఎండిన మొవ్వు పైకి ఊడి వస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Staggered or late planting next to already-infested fields, which gives moths a continuous host.',
        'Stubble left standing after harvest, where larvae overwinter and carry into the next crop.',
        'High nitrogen producing soft, lush tillers that larvae penetrate easily.',
        'Continuous rice-after-rice cropping without a break crop or fallow.',
      ],
      environmentalRiskFactors_te: [
        'ఇప్పటికే పురుగు ఉన్న పొలాల పక్కన వేర్వేరు సమయాల్లో లేదా ఆలస్యంగా నాటడం వల్ల రెక్కల పురుగులకు నిరంతరం ఆశ్రయం దొరకడం.',
        'కోత తరువాత మోళ్లను పొలంలోనే వదిలేయడం; లద్దె పురుగులు వాటిలో బతికి మరుసటి పంటకు చేరతాయి.',
        'నత్రజని ఎక్కువగా వేయడం వల్ల పిలకలు మెత్తగా పెరిగి పురుగు సులభంగా లోపలికి చొచ్చుకుపోవడం.',
        'విరామం లేకుండా వరి తరువాత వరి సాగు చేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Plough in or remove stubble immediately after harvest, as larvae survive inside it and emerge into the next crop.',
          practice_te:
            'కోత అయిన వెంటనే మోళ్లను దున్నేయండి లేదా తీసివేయండి; లద్దె పురుగులు వాటి లోపల బతికి మరుసటి పంటకు వస్తాయి.',
          targetTiming: 'Immediately post-harvest',
        },
        {
          stepNumber: 2,
          practice_en:
            'Plant at the same time as neighbouring fields in your area. Synchronised planting denies the moth a continuous succession of young crops to lay eggs in.',
          practice_te:
            'మీ ప్రాంతంలోని పక్క పొలాలతో కలిసి ఒకే సమయంలో నాటండి. అందరూ ఒకేసారి నాటితే రెక్కల పురుగుకు గుడ్లు పెట్టడానికి వరుసగా లేత పంట దొరకదు.',
          targetTiming: 'At planting',
        },
        {
          stepNumber: 3,
          practice_en:
            'Walk the field weekly and clip off and destroy the hairy egg masses on the upper leaf surface before they hatch. This is the single cheapest control measure available.',
          practice_te:
            'వారానికొకసారి పొలంలో తిరిగి, ఆకు పైభాగంలో ఉన్న వెంట్రుకల గుడ్ల సముదాయాలను పొదగక ముందే తుంచి నాశనం చేయండి. అందుబాటులో ఉన్న అతి తక్కువ ఖర్చు నివారణ ఇదే.',
          targetTiming: 'Weekly from tillering',
        },
        {
          stepNumber: 4,
          practice_en:
            'Install pheromone traps to track moth activity, so that any spray is timed to egg-laying rather than applied on a fixed calendar.',
          practice_te:
            'రెక్కల పురుగుల కదలికను గమనించడానికి ఫెరమోన్ ఎరలను అమర్చండి; అప్పుడు పిచికారీని నిర్ణీత తేదీల ప్రకారం కాకుండా గుడ్లు పెట్టే సమయానికి సరిపోల్చవచ్చు.',
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
          instruction_te:
            'వరిలో కాండం తొలుచు పురుగుకు అజాడిరక్టిన్ 0.15% EC (వేప గింజల ఆధారిత) హెక్టారుకు 1500-2500 మి.లీ. మందును 500 లీటర్ల నీటిలో కలిపి పిచికారీ చేయడానికి నమోదై ఉంది; నిరీక్షణ వ్యవధి కేవలం 5 రోజులు. అజాడిరక్టిన్ 0.03% EC (వేప నూనె ఆధారిత) హెక్టారుకు 2000 మి.లీ. 1000 లీటర్ల నీటిలో నమోదై ఉంది.',
          activeIngredient_en: 'Azadirachtin 0.15% EC or Azadirachtin 0.03% EC (neem based)',
          activeIngredient_te: 'అజాడిరక్టిన్ 0.15% EC లేదా అజాడిరక్టిన్ 0.03% EC (వేప ఆధారిత)',
          safetyCaution_en:
            'Neem works mainly on eggs and very young larvae, so it must be applied at egg-laying — once larvae are inside the stem no spray reaches them. Spray in the evening, as sunlight breaks azadirachtin down quickly.',
          safetyCaution_te:
            'వేప మందు ప్రధానంగా గుడ్లపై, చాలా లేత లద్దె పురుగులపై పనిచేస్తుంది; కాబట్టి గుడ్లు పెట్టే సమయంలోనే వాడాలి — పురుగు కాండం లోపలికి వెళ్లిన తరువాత ఏ పిచికారీ దాన్ని చేరదు. ఎండకు అజాడిరక్టిన్ త్వరగా పాడవుతుంది కాబట్టి సాయంత్రం పిచికారీ చేయండి.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides & Bio-insecticides) registry, rice / stem borer entries. Biopesticides are regulated under the Insecticides Act and must not be tank-mixed with incompatible chemical fungicides.',
          regulatoryNotice_te:
            'ఈ మోతాదులు CIBRC పురుగు మందులు మరియు జీవ పురుగు మందుల నమోదు పట్టికలోని వరి / కాండం తొలుచు పురుగు వరుసల నుండి ధృవీకరించబడ్డాయి. జీవ పురుగు మందులు కూడా కీటక నాశక చట్టం పరిధిలోనే ఉంటాయి; వాటిని సరిపడని రసాయన శిలీంద్రనాశకాలతో కలిపి వాడకూడదు.',
        },
        {
          id: 'rice-stemborer-org-2',
          stepNumber: 2,
          category: 'organic',
          instruction_en:
            'Bacillus thuringiensis var. kurstaki is registered for rice stem borer and leaf folder at 1.50 kg per hectare in 500-750 litres of water.',
          instruction_te:
            'బాసిల్లస్ తురింజియెన్సిస్ వెరైటీ కుర్‌స్టాకి వరిలో కాండం తొలుచు పురుగు, ఆకు ముడత పురుగుకు హెక్టారుకు 1.50 కిలోలు 500-750 లీటర్ల నీటిలో కలిపి వాడటానికి నమోదై ఉంది.',
          activeIngredient_en: 'Bacillus thuringiensis var. kurstaki (strain Z-52)',
          activeIngredient_te: 'బాసిల్లస్ తురింజియెన్సిస్ వెరైటీ కుర్‌స్టాకి (స్ట్రెయిన్ Z-52)',
          safetyCaution_en:
            'Like neem, Bt only works on larvae that eat it before boring in, so timing at hatching is everything. The registry states no waiting period for this entry; follow your product label. Do not mix with chemical fungicides, which can kill the bacterium.',
          safetyCaution_te:
            'వేప మందు వలెనే, Bt కూడా కాండంలోకి చొరబడక ముందు దాన్ని తిన్న లద్దె పురుగులపైనే పనిచేస్తుంది; కాబట్టి గుడ్లు పొదిగే సమయమే కీలకం. ఈ వరుసకు నమోదు పట్టికలో నిరీక్షణ వ్యవధి ఇవ్వలేదు; మీ మందు లేబుల్‌ను పాటించండి. రసాయన శిలీంద్రనాశకాలతో కలపవద్దు, అవి ఈ బ్యాక్టీరియాను చంపేస్తాయి.',
          regulatoryNotice_en:
            'Dose confirmed against the CIBRC Major Uses of Pesticides (Insecticides & Bio-insecticides) registry, rice / stem borer entry.',
          regulatoryNotice_te:
            'ఈ మోతాదు CIBRC పురుగు మందులు మరియు జీవ పురుగు మందుల నమోదు పట్టికలోని వరి / కాండం తొలుచు పురుగు వరుస నుండి ధృవీకరించబడింది.',
        },
        {
          id: 'rice-stemborer-chem-1',
          stepNumber: 3,
          category: 'chemical',
          instruction_en:
            'Registered options for rice stem borer include Cartap Hydrochloride 50% SP at 1000 g per hectare in 500-1000 litres of water (21-day waiting period), Chlorantraniliprole 18.5% SC at 150 ml per hectare in 500 litres (47-day waiting period), and Flubendiamide 20% WG at 125 g per hectare in 500 litres (30-day waiting period).',
          instruction_te:
            'వరిలో కాండం తొలుచు పురుగుకు నమోదైన మందులు: కార్టాప్ హైడ్రోక్లోరైడ్ 50% SP హెక్టారుకు 1000 గ్రా. 500-1000 లీటర్ల నీటిలో (నిరీక్షణ 21 రోజులు), క్లోరాంట్రానిలిప్రోల్ 18.5% SC హెక్టారుకు 150 మి.లీ. 500 లీటర్ల నీటిలో (నిరీక్షణ 47 రోజులు), ఫ్లూబెండమైడ్ 20% WG హెక్టారుకు 125 గ్రా. 500 లీటర్ల నీటిలో (నిరీక్షణ 30 రోజులు).',
          activeIngredient_en:
            'Cartap Hydrochloride 50% SP (500 g a.i./ha), Chlorantraniliprole 18.5% SC (30 g a.i./ha), or Flubendiamide 20% WG (25 g a.i./ha)',
          activeIngredient_te:
            'కార్టాప్ హైడ్రోక్లోరైడ్ 50% SP (హెక్టారుకు 500 గ్రా.), క్లోరాంట్రానిలిప్రోల్ 18.5% SC (హెక్టారుకు 30 గ్రా.), లేదా ఫ్లూబెండమైడ్ 20% WG (హెక్టారుకు 25 గ్రా.)',
          safetyCaution_en:
            'Waiting periods differ sharply — 21, 47 and 30 days. Chlorantraniliprole at 47 days is unsuitable close to harvest. Spray only when the economic threshold is reached, not on a calendar: once larvae are inside the stem, spraying cannot reach them and only kills the natural enemies that would have helped you.',
          safetyCaution_te:
            'నిరీక్షణ వ్యవధులు చాలా తేడాగా ఉన్నాయి — 21, 47, 30 రోజులు. 47 రోజుల క్లోరాంట్రానిలిప్రోల్ కోత దగ్గరగా ఉన్నప్పుడు పనికిరాదు. నిర్ణీత తేదీల ప్రకారం కాకుండా, నష్ట స్థాయి దాటినప్పుడు మాత్రమే పిచికారీ చేయండి: పురుగు కాండం లోపలికి వెళ్లాక పిచికారీ దాన్ని చేరదు, పైగా మీకు సాయపడే మిత్ర పురుగులను మాత్రమే చంపుతుంది.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides) registry, rice / stem borer entries. Rotate between chemical groups across sprays, as stem borer develops resistance readily. Verify against your container label and confirm with your RBK.',
          regulatoryNotice_te:
            'ఈ మోతాదులు CIBRC పురుగు మందుల నమోదు పట్టికలోని వరి / కాండం తొలుచు పురుగు వరుసల నుండి ధృవీకరించబడ్డాయి. ఈ పురుగు త్వరగా నిరోధక శక్తిని పెంచుకుంటుంది కాబట్టి వేర్వేరు రకాల మందులను మార్చి వాడండి. మీ మందు డబ్బా లేబుల్‌పై సరిచూసుకుని RBK వద్ద నిర్ధారించుకోండి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Pull the dried central shoot gently and photograph it next to the plant, showing whether it came away cleanly. Then split one affected tiller lengthwise with a blade and photograph the inside — a larva, a tunnel or powdery frass is the confirming evidence.',
        instruction_te:
          'ఎండిన మధ్య మొవ్వును మెల్లగా లాగి, అది శుభ్రంగా ఊడి వచ్చిందో లేదో కనిపించేలా మొక్క పక్కన పెట్టి ఫోటో తీయండి. తరువాత ఒక దెబ్బతిన్న పిలకను బ్లేడుతో పొడవుగా చీల్చి లోపలి భాగాన్ని ఫోటో తీయండి — లద్దె పురుగు, సొరంగం లేదా పొడి రెట్టలు కనిపిస్తే అదే నిర్ధారణ.',
        rationale_en:
          'A dead heart or a white panicle photographed from outside looks identical to neck blast and to gall midge damage. Only the inside of the stem shows which one it is, and that decides whether an insecticide or a fungicide is the right answer.',
        rationale_te:
          'బయట నుండి తీసిన ఎండిన మొవ్వు లేదా తెల్ల కంకి ఫోటో వెన్ను విరుపు, కాండం ఈగ నష్టం వలెనే కనిపిస్తుంది. ఏది అనేది కాండం లోపలి భాగం మాత్రమే చూపిస్తుంది; పురుగు మందు కావాలా, శిలీంద్రనాశకం కావాలా అనేది దీనిపైనే ఆధారపడి ఉంటుంది.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-stemborer-q-pullout',
          question_en: 'Does the dried central shoot pull out easily with a gentle tug, leaving the outer leaves green?',
          question_te: 'ఎండిన మధ్య మొవ్వు మెల్లగా లాగితే సులభంగా ఊడి వస్తుందా, బయటి ఆకులు పచ్చగానే ఉంటాయా?',
          ifYes_en: 'A dead heart that lifts out cleanly is classic stem borer damage.',
          ifYes_te: 'శుభ్రంగా ఊడి వచ్చే ఎండిన మొవ్వు కాండం తొలుచు పురుగు నష్టానికి ప్రధాన గుర్తు.',
          ifNo_en:
            'If it resists, look again at the sheath for lesions — Sheath Blight and other rots keep the tiller firmly attached.',
          ifNo_te:
            'ఊడి రాకపోతే తొడుగుపై మచ్చల కోసం మళ్లీ చూడండి — పాము పొడ తెగులు, ఇతర కుళ్ళు తెగుళ్లలో పిలక గట్టిగా అతుక్కుని ఉంటుంది.',
          pointsTowardIds: ['disease-rice-stemborer'],
          pointsAwayIds: ['disease-rice-sheathblight'],
        },
        {
          id: 'rice-stemborer-q-neck',
          question_en:
            'If panicles are white and empty: is there a blackened shrivelled patch at the neck where the panicle joins the stem?',
          question_te:
            'వెన్నులు తెల్లగా, ఖాళీగా ఉంటే: వెన్ను కాండానికి కలిసే మెడ దగ్గర నల్లబడి ముడుచుకున్న మచ్చ ఉందా?',
          ifYes_en: 'A blackened neck means neck blast, a fungal disease — an insecticide will not help.',
          ifYes_te:
            'మెడ నల్లబడితే అది వెన్ను విరుపు, శిలీంద్ర తెగులు — పురుగు మందు వాడినా ప్రయోజనం ఉండదు.',
          ifNo_en: 'A clean neck with a bore hole somewhere on the stem points to stem borer.',
          ifNo_te: 'మెడ శుభ్రంగా ఉండి కాండంపై ఎక్కడైనా రంధ్రం ఉంటే అది కాండం తొలుచు పురుగు.',
          pointsTowardIds: ['disease-rice-stemborer'],
          pointsAwayIds: ['disease-rice-blast'],
        },
        {
          id: 'rice-stemborer-q-threshold',
          question_en:
            'Count roughly 20 hills at random. Are more than one in twenty showing dead hearts, or can you find an egg mass per square metre?',
          question_te:
            'ఏవైనా 20 కుదుళ్లను లెక్కించండి. ఇరవైలో ఒకటి కంటే ఎక్కువ కుదుళ్లలో మొవ్వు చావు ఉందా, లేదా చదరపు మీటరుకు ఒక గుడ్ల సముదాయం కనిపిస్తుందా?',
          ifYes_en: 'You are at or above the usual action threshold — an intervention decision is justified now.',
          ifYes_te: 'మీరు సాధారణ చర్య స్థాయికి చేరారు లేదా దాటారు — ఇప్పుడు చర్య తీసుకునే నిర్ణయం సమంజసం.',
          ifNo_en:
            'Below threshold, spraying usually costs more than the damage it prevents. Keep scouting weekly and destroy egg masses by hand.',
          ifNo_te:
            'ఆ స్థాయి కంటే తక్కువగా ఉంటే, పిచికారీ ఖర్చు అది నివారించే నష్టం కంటే ఎక్కువ అవుతుంది. వారానికొకసారి పరిశీలిస్తూ గుడ్ల సముదాయాలను చేతితో తీసి నాశనం చేయండి.',
          pointsTowardIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Under 5% of tillers showing dead hearts, with no egg masses found on a walk through the field.',
          threshold_te: '5% లోపు పిలకల్లో మొవ్వు చావు, పొలంలో తిరిగినప్పుడు గుడ్ల సముదాయాలు కనిపించకపోవడం.',
          action_en:
            'Do not spray. Clip and destroy any egg masses you find and re-scout in a week — below this level a spray costs more than it saves.',
          action_te:
            'పిచికారీ చేయవద్దు. కనిపించిన గుడ్ల సముదాయాలను తుంచి నాశనం చేసి వారం తరువాత మళ్లీ పరిశీలించండి — ఈ స్థాయి కంటే తక్కువగా ఉంటే పిచికారీ ఖర్చు ఆదా చేసే దాని కంటే ఎక్కువ.',
        },
        {
          level: 'moderate',
          threshold_en: '5-10% of tillers with dead hearts, or about one egg mass per square metre.',
          threshold_te: '5-10% పిలకల్లో మొవ్వు చావు, లేదా చదరపు మీటరుకు సుమారు ఒక గుడ్ల సముదాయం.',
          action_en:
            'This is the usual action threshold. A neem or Bt application timed to egg hatch is the economical first choice; keep a registered insecticide for a rising count.',
          action_te:
            'ఇదే సాధారణ చర్య స్థాయి. గుడ్లు పొదిగే సమయానికి వేప లేదా Bt వాడటం ఖర్చు పరంగా మొదటి ఎంపిక; సంఖ్య పెరిగితే నమోదైన పురుగు మందును వాడండి.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% dead hearts, or white ears appearing at the panicle stage.',
          threshold_te: '10% పైగా మొవ్వు చావు, లేదా వెన్ను దశలో తెల్ల కంకులు కనిపించడం.',
          action_en:
            'Consult your RBK. White ears mean that grain is already lost on those tillers and no spray will recover them — the decision is about protecting the rest of the crop and the next season.',
          action_te:
            'RBK ను సంప్రదించండి. తెల్ల కంకులు కనిపిస్తే ఆ పిలకల్లో గింజ అప్పటికే పోయినట్లే, ఏ పిచికారీ దాన్ని తిరిగి తేలేదు — ఇప్పుడు నిర్ణయం మిగిలిన పంటను, మరుసటి సీజన్‌ను కాపాడుకోవడం గురించి.',
        },
      ],
      escalationThreshold_en:
        'Contact your Rythu Bharosa Kendra (RBK) if dead hearts exceed roughly one tiller in ten, if white ears appear at panicle stage, or if damage continues after a correctly timed spray — continuing damage usually means either resistance or that the spray was applied after larvae were already inside the stem. Confirm whether white panicles are stem borer or neck blast before buying any product, because the two need completely different chemicals.',
      escalationThreshold_te:
        'పది పిలకల్లో ఒకటి కంటే ఎక్కువ మొవ్వు చావు ఉంటే, వెన్ను దశలో తెల్ల కంకులు కనిపిస్తే, లేదా సరైన సమయంలో పిచికారీ చేసినా నష్టం కొనసాగితే రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి — నష్టం కొనసాగడం అంటే సాధారణంగా నిరోధక శక్తి పెరిగిందని, లేదా పురుగు కాండం లోపలికి వెళ్లిన తరువాత పిచికారీ చేశారని అర్థం. ఏ మందు కొనే ముందైనా తెల్ల వెన్నులు కాండం తొలుచు పురుగు వల్లనా, వెన్ను విరుపు వల్లనా అని నిర్ధారించుకోండి; ఈ రెండింటికీ పూర్తిగా వేర్వేరు మందులు కావాలి.',
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
      name_te: 'కాండం ఈగ',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect pest: Orseolia oryzae (maggot feeds at the growing point)',
      pathogenOrVector_te: 'పురుగు: ఆర్సియోలియా ఒరైజే (పిల్ల పురుగు మొవ్వు దగ్గర ఆశిస్తుంది)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'The affected tiller turns into a hollow, silvery-white tube resembling an onion leaf — the characteristic silver shoot or onion shoot.',
        'The tube is pale, elongated, and produces no panicle at all.',
        'The plant stays alive and compensates by producing extra tillers, so the hill looks bushy and crowded.',
        'Affected tillers are shorter than healthy ones, with no bore hole and no frass anywhere on the stem.',
      ],
      observableSymptoms_te: [
        'ఆశించిన పిలక ఉల్లి ఆకును పోలిన బోలు, వెండి తెలుపు గొట్టంగా మారుతుంది — ఇదే ఉల్లి కాడ లేదా వెండి కాడ లక్షణం.',
        'ఆ గొట్టం పాలిపోయి, పొడవుగా ఉండి, అస్సలు వెన్ను ఇవ్వదు.',
        'మొక్క బతికే ఉండి, భర్తీగా అదనపు పిలకలు వేస్తుంది; దాంతో కుదురు పొదలా దట్టంగా కనిపిస్తుంది.',
        'ఆశించిన పిలకలు ఆరోగ్యకరమైన వాటి కంటే పొట్టిగా ఉంటాయి; కాండంపై ఎక్కడా రంధ్రం గానీ రెట్టలు గానీ ఉండవు.',
      ],
      affectedParts: ['Tiller', 'Growing Point'],
      similarConditions: [
        {
          id: 'rice-gallmidge-vs-stemborer',
          name_en: 'Yellow Stem Borer (Scirpophaga incertulas / Pest)',
          name_te: 'కాండం తొలుచు పురుగు',
          isPathological: true,
          differentiatingFactors_en:
            'Stem borer kills the shoot, leaving a dry brown dead heart that pulls out, plus a bore hole and frass. Gall midge leaves a living silvery hollow tube with no hole and no frass, and the plant produces more tillers rather than dying back.',
          differentiatingFactors_te:
            'కాండం తొలుచు పురుగు మొవ్వును చంపి, ఊడి వచ్చే ఎండిన గోధుమ రంగు మొవ్వును, రంధ్రాన్ని, రెట్టలను వదులుతుంది. కాండం ఈగ రంధ్రం, రెట్టలు లేని బతికి ఉన్న వెండి రంగు బోలు గొట్టాన్ని వదులుతుంది; మొక్క చనిపోకుండా ఎక్కువ పిలకలు వేస్తుంది.',
        },
        {
          id: 'rice-gallmidge-vs-whorlmaggot',
          name_en: 'Rice Whorl Maggot (Hydrellia spp. / Pest)',
          name_te: 'మొవ్వు ఈగ',
          isPathological: true,
          differentiatingFactors_en:
            'Whorl maggot chews the edges of emerging leaves, leaving ragged whitish margins on otherwise normal leaves. Gall midge converts the entire shoot into a tube — the leaf blade is absent, not merely damaged.',
          differentiatingFactors_te:
            'మొవ్వు ఈగ బయటకు వస్తున్న ఆకుల అంచులను కొరికి, సాధారణంగా ఉన్న ఆకులపై చిరిగిన తెల్లని అంచులను వదులుతుంది. కాండం ఈగ మొవ్వు మొత్తాన్ని గొట్టంగా మారుస్తుంది — ఆకు దెబ్బతినడం కాదు, అసలు ఆకే ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Continuous cloudy, drizzly weather with high humidity during the tillering stage.',
        'Late planting, and staggered nurseries that keep young tillers available over a long window.',
        'Volunteer rice and grassy weeds such as wild rice on bunds, which host the midge between crops.',
        'High nitrogen encouraging lush, continuous tillering that gives the midge fresh growing points.',
      ],
      environmentalRiskFactors_te: [
        'పిలక దశలో నిరంతరం మబ్బులు, తుంపర వర్షాలు, ఎక్కువ తేమ ఉండటం.',
        'ఆలస్యంగా నాటడం, వేర్వేరు సమయాల్లో నార్లు పోయడం వల్ల చాలా కాలం లేత పిలకలు అందుబాటులో ఉండటం.',
        'గట్లపై అడవి వరి వంటి గడ్డి కలుపు, రాలిన గింజల నుండి మొలిచిన వరి — పంటల మధ్య కాలంలో ఈగకు ఇవి ఆశ్రయం.',
        'నత్రజని ఎక్కువగా వేయడం వల్ల పిలకలు వరుసగా మెత్తగా రావడం; ఈగకు కొత్త మొవ్వులు దొరుకుతాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Sow early and in step with neighbouring fields. Late and staggered planting is the strongest single risk factor for gall midge.',
          practice_te:
            'ముందుగా, పక్క పొలాలతో కలిసి ఒకే సమయంలో నాటండి. ఆలస్యంగా, వేర్వేరు సమయాల్లో నాటడమే కాండం ఈగకు అతిపెద్ద కారణం.',
          targetTiming: 'At planting',
        },
        {
          stepNumber: 2,
          practice_en:
            'Remove wild rice, volunteer rice and grassy weeds from bunds and channels, since the midge survives on them between crops.',
          practice_te:
            'గట్లు, కాలువల నుండి అడవి వరి, రాలిన గింజల వరి, గడ్డి కలుపును తీసివేయండి; పంటల మధ్య కాలంలో ఈగ వీటిపైనే బతుకుతుంది.',
          targetTiming: 'Before and during the season',
        },
        {
          stepNumber: 3,
          practice_en:
            'Where gall midge recurs every year in your village, choose a resistant variety — resistance is the most reliable and cheapest control for this pest.',
          practice_te:
            'మీ గ్రామంలో ప్రతి ఏటా కాండం ఈగ వస్తుంటే తట్టుకునే రకాన్ని ఎంచుకోండి — ఈ పురుగుకు అదే అత్యంత నమ్మదగిన, తక్కువ ఖర్చు నివారణ.',
          targetTiming: 'Variety selection, before sowing',
        },
        {
          stepNumber: 4,
          practice_en:
            'Set up light traps to follow adult midge activity, and count silver shoots weekly so that any treatment decision rests on an actual count.',
          practice_te:
            'రెక్కల ఈగల కదలికను గమనించడానికి దీపపు ఎరలను అమర్చండి; వారానికొకసారి ఉల్లి కాడలను లెక్కించండి, అప్పుడు చర్య నిర్ణయం వాస్తవ లెక్కపై ఆధారపడి ఉంటుంది.',
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
          instruction_te:
            'గట్లు, కాలువల నుండి గడ్డి కలుపును, రాలిన గింజల వరిని తీసివేసి, పొలంలో ప్రత్యామ్నాయ ఆశ్రయ మొక్కలు లేకుండా చూసుకోండి. కాండం ఈగ విషయంలో ఆశ్రయ మొక్కల తొలగింపు, తట్టుకునే రకాలు ఏ పిచికారీ కంటే ఎక్కువ పనిచేస్తాయి; ఎందుకంటే పిల్ల పురుగు మొవ్వు లోపల సురక్షితంగా ఉండి, తాకే మందులు దాన్ని చేరవు.',
          safetyCaution_en:
            'Silver shoots already formed cannot be cured — those tillers will never produce a panicle. Control effort protects the tillers still forming.',
          safetyCaution_te:
            'అప్పటికే ఏర్పడిన ఉల్లి కాడలను నయం చేయలేము — ఆ పిలకలు ఎప్పటికీ వెన్ను ఇవ్వవు. చేసే నివారణ ఇంకా ఏర్పడుతున్న పిలకలను కాపాడటం కోసమే.',
        },
        {
          id: 'rice-gallmidge-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Registered options covering rice gall midge include Fipronil 5% SC at 1000-1500 ml per hectare in 500 litres of water (32-day waiting period), Thiamethoxam 25% WG at 100 g per hectare in 500-750 litres (14-day waiting period), and Ethofenoprox 10% EC at 500-750 ml per hectare in 500 litres (15-day waiting period).',
          instruction_te:
            'వరిలో కాండం ఈగకు నమోదైన మందులు: ఫిప్రోనిల్ 5% SC హెక్టారుకు 1000-1500 మి.లీ. 500 లీటర్ల నీటిలో (నిరీక్షణ 32 రోజులు), థయామెథాక్సామ్ 25% WG హెక్టారుకు 100 గ్రా. 500-750 లీటర్ల నీటిలో (నిరీక్షణ 14 రోజులు), ఎథోఫెనోప్రాక్స్ 10% EC హెక్టారుకు 500-750 మి.లీ. 500 లీటర్ల నీటిలో (నిరీక్షణ 15 రోజులు).',
          activeIngredient_en:
            'Fipronil 5% SC (50-75 g a.i./ha), Thiamethoxam 25% WG (25 g a.i./ha), or Ethofenoprox 10% EC (50-75 g a.i./ha)',
          activeIngredient_te:
            'ఫిప్రోనిల్ 5% SC (హెక్టారుకు 50-75 గ్రా.), థయామెథాక్సామ్ 25% WG (హెక్టారుకు 25 గ్రా.), లేదా ఎథోఫెనోప్రాక్స్ 10% EC (హెక్టారుకు 50-75 గ్రా.)',
          safetyCaution_en:
            'Treatment only protects tillers that have not yet been attacked, so it is worth applying early in tillering and pointless once silver shoots are widespread. Waiting periods differ — 32, 14 and 15 days. Wear gloves and a mask, and do not spray against the wind.',
          safetyCaution_te:
            'ఈ మందులు ఇంకా ఆశించబడని పిలకలను మాత్రమే కాపాడతాయి; కాబట్టి పిలక దశ ప్రారంభంలో వాడటం ఉపయోగం, ఉల్లి కాడలు విస్తరించిన తరువాత వాడటం వృథా. నిరీక్షణ వ్యవధులు వేర్వేరు — 32, 14, 15 రోజులు. చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు.',
          regulatoryNotice_en:
            'Doses confirmed against the CIBRC Major Uses of Pesticides (Insecticides) registry, rice entries listing gall midge among the target pests. Carbofuran-based granules also appear in the registry for this pest but are not surfaced here, as carbofuran is acutely toxic and its use is under regulatory review in several jurisdictions — discuss it with your RBK rather than treating it as a default.',
          regulatoryNotice_te:
            'ఈ మోతాదులు CIBRC పురుగు మందుల నమోదు పట్టికలోని వరి వరుసల (లక్ష్య పురుగులలో కాండం ఈగ ఉన్నవి) నుండి ధృవీకరించబడ్డాయి. ఈ పురుగుకు కార్బోఫ్యూరాన్ గుళికలు కూడా నమోదు పట్టికలో ఉన్నాయి కానీ వాటిని ఇక్కడ చూపలేదు; కార్బోఫ్యూరాన్ తీవ్ర విషపూరితమైనది, పలు దేశాల్లో దాని వాడకంపై సమీక్ష జరుగుతోంది — దాన్ని సాధారణ ఎంపికగా భావించకుండా RBK తో చర్చించండి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Photograph the silvery tube held upright beside a normal green tiller from the same hill, so the difference in shape and colour is visible. Check the stem along its whole length for a bore hole before you photograph.',
        instruction_te:
          'వెండి రంగు గొట్టాన్ని అదే కుదురులోని సాధారణ పచ్చ పిలక పక్కన నిటారుగా పట్టుకుని ఫోటో తీయండి; అప్పుడు ఆకారం, రంగులోని తేడా కనిపిస్తుంది. ఫోటో తీసే ముందు కాండాన్ని పొడవునా పరిశీలించి రంధ్రం ఉందో లేదో చూడండి.',
        rationale_en:
          'The side-by-side comparison is what makes the silver shoot recognisable, and confirming there is no bore hole is what rules out stem borer.',
        rationale_te:
          'పక్కపక్కన పోల్చి చూపడం వల్లనే ఉల్లి కాడను గుర్తించగలం; రంధ్రం లేదని నిర్ధారించడం వల్లనే కాండం తొలుచు పురుగు కాదని చెప్పగలం.',
      },
      fieldFollowUps: [
        {
          id: 'rice-gallmidge-q-tube',
          question_en: 'Is the affected shoot a pale hollow tube like an onion leaf, still alive, rather than a dry brown dead shoot?',
          question_te:
            'ఆశించిన మొవ్వు ఎండిన గోధుమ రంగు మొవ్వులా కాకుండా, ఉల్లి ఆకు వంటి పాలిపోయిన బోలు గొట్టంలా, ఇంకా బతికి ఉందా?',
          ifYes_en: 'A living silvery tube is the gall midge silver shoot.',
          ifYes_te: 'బతికి ఉన్న వెండి రంగు గొట్టమే కాండం ఈగ వల్ల ఏర్పడే ఉల్లి కాడ.',
          ifNo_en: 'A dry brown shoot that pulls out is stem borer instead.',
          ifNo_te: 'ఎండిన గోధుమ రంగు మొవ్వు ఊడి వస్తే అది కాండం తొలుచు పురుగు.',
          pointsTowardIds: ['disease-rice-gallmidge'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
        {
          id: 'rice-gallmidge-q-borehole',
          question_en: 'Examining the stem along its length, is there no bore hole and no powdery frass anywhere?',
          question_te: 'కాండాన్ని పొడవునా పరిశీలిస్తే, ఎక్కడా రంధ్రం గానీ పొడి రెట్టలు గానీ లేవా?',
          ifYes_en: 'Absence of a bore hole fits gall midge, whose maggot enters at the growing point without tunnelling.',
          ifYes_te:
            'రంధ్రం లేకపోవడం కాండం ఈగకు సరిపోతుంది; దాని పిల్ల పురుగు సొరంగం తొలవకుండా మొవ్వు దగ్గర నుండే లోపలికి చేరుతుంది.',
          ifNo_en: 'A bore hole with frass means stem borer, which needs a different insecticide and a different timing.',
          ifNo_te:
            'రెట్టలతో కూడిన రంధ్రం ఉంటే అది కాండం తొలుచు పురుగు; దానికి వేరే మందు, వేరే సమయం కావాలి.',
          pointsTowardIds: ['disease-rice-gallmidge'],
          pointsAwayIds: ['disease-rice-stemborer'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Under 5% of tillers showing silver shoots.',
          threshold_te: '5% లోపు పిలకల్లో ఉల్లి కాడలు.',
          action_en:
            'No spray. The plant compensates with extra tillers at this level. Clear weed hosts and keep counting weekly.',
          action_te:
            'పిచికారీ అవసరం లేదు. ఈ స్థాయిలో మొక్క అదనపు పిలకలతో భర్తీ చేసుకుంటుంది. కలుపు ఆశ్రయ మొక్కలను తీసి, వారానికొకసారి లెక్కిస్తూ ఉండండి.',
        },
        {
          level: 'moderate',
          threshold_en: '5-10% of tillers with silver shoots, during active tillering.',
          threshold_te: 'చురుకైన పిలక దశలో 5-10% పిలకల్లో ఉల్లి కాడలు.',
          action_en:
            'Consider a registered treatment only if tillering is still in progress and there are tillers left to protect. Confirm the count with your RBK first.',
          action_te:
            'పిలక దశ ఇంకా కొనసాగుతూ, కాపాడాల్సిన పిలకలు మిగిలి ఉంటేనే నమోదైన మందును పరిశీలించండి. ముందుగా లెక్కను RBK వద్ద నిర్ధారించుకోండి.',
        },
        {
          level: 'severe',
          threshold_en: 'Over 10% of tillers affected, or silver shoots still appearing after tillering has finished.',
          threshold_te: '10% పైగా పిలకలు దెబ్బతినడం, లేదా పిలక దశ ముగిసిన తరువాత కూడా ఉల్లి కాడలు కనిపించడం.',
          action_en:
            'Consult your RBK, and plan a resistant variety for next season. After tillering ends the plant can no longer compensate, and spraying then cannot recover the lost tillers.',
          action_te:
            'RBK ను సంప్రదించండి, వచ్చే సీజన్‌కు తట్టుకునే రకాన్ని ప్లాన్ చేసుకోండి. పిలక దశ ముగిశాక మొక్క భర్తీ చేసుకోలేదు; అప్పుడు పిచికారీ చేసినా పోయిన పిలకలు తిరిగి రావు.',
        },
      ],
      escalationThreshold_en:
        'Contact your Rythu Bharosa Kendra (RBK) if more than one tiller in ten shows silver shoots, or if new silver shoots keep appearing after the tillering stage has ended. Because the maggot is protected inside the shoot and already-formed silver shoots can never produce a panicle, the useful conversation with an officer is about variety choice and planting date for next season, not only about which product to spray now.',
      escalationThreshold_te:
        'పది పిలకల్లో ఒకటి కంటే ఎక్కువ ఉల్లి కాడలు కనిపిస్తే, లేదా పిలక దశ ముగిసిన తరువాత కూడా కొత్త ఉల్లి కాడలు వస్తుంటే రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి. పిల్ల పురుగు మొవ్వు లోపల సురక్షితంగా ఉంటుంది, ఏర్పడిన ఉల్లి కాడలు ఎప్పటికీ వెన్ను ఇవ్వవు; కాబట్టి అధికారితో ఉపయోగకరమైన చర్చ ఇప్పుడు ఏ మందు కొట్టాలి అనే దాని గురించి మాత్రమే కాదు, వచ్చే సీజన్‌లో ఏ రకం వేయాలి, ఎప్పుడు నాటాలి అనే దాని గురించి.',
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
      name_te: 'జింక్ లోపం (ఖైరా)',
      conditionCategory: 'nutrient_deficiency',
      pathogenOrVector_en: 'Not an infection — a soil nutrient disorder caused by low available zinc',
      pathogenOrVector_te: 'ఇది తెగులు కాదు — నేలలో అందుబాటులో ఉన్న జింక్ తక్కువ కావడం వల్ల వచ్చే పోషక లోపం',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Appears two to four weeks after transplanting, usually in distinct patches rather than evenly across the field.',
        'Dusty rust-brown blotches develop on the lower leaves, starting near the leaf base and midrib.',
        'The midrib area turns pale or bleached while the leaf tip may stay greener.',
        'Plants are stunted with shortened internodes, giving a squat appearance, and tillering is poor.',
        'Severely affected patches show delayed maturity, so the field ripens unevenly.',
      ],
      observableSymptoms_te: [
        'నాటిన రెండు నుండి నాలుగు వారాల తరువాత కనిపిస్తుంది; పొలం అంతటా సమానంగా కాకుండా సాధారణంగా మడులు మడులుగా వస్తుంది.',
        'కింది ఆకులపై ఆకు మొదలు, ఈనె దగ్గర నుండి దుమ్ము రంగు తుప్పు మచ్చలు ఏర్పడతాయి.',
        'మధ్య ఈనె ప్రాంతం పాలిపోయి తెల్లబడుతుంది, ఆకు కొన మాత్రం కొంత పచ్చగా ఉండవచ్చు.',
        'మొక్కలు గిడసబారి, కణుపుల మధ్య దూరం తగ్గి పొట్టిగా కనిపిస్తాయి; పిలకలు సరిగా రావు.',
        'తీవ్రంగా దెబ్బతిన్న మడుల్లో పంట ఆలస్యంగా పక్వానికి వస్తుంది, దాంతో పొలం ఒకేసారి పండదు.',
      ],
      affectedParts: ['Lower Leaves', 'Whole Plant', 'Tillers'],
      similarConditions: [
        {
          id: 'rice-zinc-vs-brownspot',
          name_en: 'Brown Spot (Bipolaris oryzae / Fungal)',
          name_te: 'గోధుమ రంగు మచ్చల తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'This is the critical distinction. Brown Spot makes discrete oval spots each with a defined dark margin, and the plant is otherwise normal height. Zinc deficiency makes diffuse rust-coloured blotching that runs together without clear margins, concentrated near the midrib, together with obvious stunting and poor tillering. Spraying a fungicide at zinc deficiency wastes money and leaves the real cause untouched.',
          differentiatingFactors_te:
            'ఇదే అత్యంత కీలకమైన తేడా. గోధుమ రంగు మచ్చల తెగులులో ప్రతి మచ్చకు స్పష్టమైన ముదురు అంచు ఉండి విడివిడిగా ఉంటాయి, మొక్క ఎత్తు మామూలుగానే ఉంటుంది. జింక్ లోపంలో స్పష్టమైన అంచులు లేకుండా కలిసిపోయిన తుప్పు రంగు మరకలు ఈనె దగ్గర ఎక్కువగా ఉంటాయి, దానితో పాటు మొక్క స్పష్టంగా గిడసబారి పిలకలు తక్కువగా వస్తాయి. జింక్ లోపానికి శిలీంద్రనాశకం కొడితే డబ్బు వృథా, అసలు కారణం అలాగే ఉండిపోతుంది.',
        },
        {
          id: 'rice-zinc-vs-ironmanganese',
          name_en: 'Iron Toxicity / Bronzing (Abiotic)',
          name_te: 'ఇనుము విషతుల్యత (కంచు రంగు)',
          isPathological: false,
          differentiatingFactors_en:
            'Iron toxicity bronzes the whole leaf evenly from the tip, typically in permanently waterlogged acidic patches. Zinc deficiency blotches start near the leaf base and midrib and come with marked stunting.',
          differentiatingFactors_te:
            'ఇనుము విషతుల్యతలో ఆకు కొన నుండి మొత్తం సమానంగా కంచు రంగులోకి మారుతుంది; సాధారణంగా ఎప్పుడూ నీరు నిల్వ ఉండే ఆమ్ల నేలల్లో వస్తుంది. జింక్ లోపం మరకలు ఆకు మొదలు, ఈనె దగ్గర మొదలవుతాయి, మొక్క స్పష్టంగా గిడసబారుతుంది.',
        },
        {
          id: 'rice-zinc-vs-tungro',
          name_en: 'Rice Tungro Disease (Viral)',
          name_te: 'టుంగ్రో వైరస్ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Tungro yellows or oranges the leaves from the tip downwards with stunting, and spreads plant to plant in a widening patch following leafhopper movement. Zinc deficiency patches follow the soil — low spots, levelled cuts, high-pH areas — and do not spread outward over time.',
          differentiatingFactors_te:
            'టుంగ్రోలో ఆకులు కొన నుండి కిందికి పసుపు లేదా నారింజ రంగులోకి మారి మొక్క గిడసబారుతుంది; దోమ కదలికను అనుసరించి మొక్క నుండి మొక్కకు మడి విస్తరిస్తూ వ్యాపిస్తుంది. జింక్ లోపం మడులు నేలను అనుసరిస్తాయి — పల్లపు ప్రాంతాలు, చదును చేసిన చోట్లు, ఎక్కువ pH ఉన్న ప్రాంతాలు — కాలంతో పాటు విస్తరించవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Calcareous, alkaline or high-pH soils, where zinc becomes chemically unavailable to the plant even when present.',
        'Prolonged flooding and continuously submerged conditions, which reduce zinc availability.',
        'Land that has been levelled or cut, exposing subsoil with little organic matter.',
        'Intensive cropping with heavy NPK use and no micronutrient replacement over several seasons.',
        'Soils high in phosphorus, which further restricts zinc uptake.',
      ],
      environmentalRiskFactors_te: [
        'సున్నం ఎక్కువ ఉన్న, క్షార, ఎక్కువ pH ఉన్న నేలలు — ఇక్కడ జింక్ నేలలో ఉన్నా మొక్కకు అందుబాటులో ఉండదు.',
        'ఎక్కువ కాలం నీరు నిల్వ ఉండటం, నిరంతరం మునిగి ఉండటం వల్ల జింక్ లభ్యత తగ్గుతుంది.',
        'చదును చేసిన లేదా మట్టి తీసిన పొలాలు, ఇక్కడ సేంద్రియ పదార్థం తక్కువ ఉన్న లోపలి మట్టి బయటపడుతుంది.',
        'పలు సీజన్లుగా NPK ఎరువులు ఎక్కువగా వాడుతూ సూక్ష్మ పోషకాలను తిరిగి వేయకపోవడం.',
        'భాస్వరం ఎక్కువ ఉన్న నేలలు — ఇవి జింక్ గ్రహణను మరింత అడ్డుకుంటాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Get a soil test before the season and ask specifically for available zinc, not only NPK. Zinc deficiency is predictable from a soil test and far cheaper to prevent than to correct mid-season.',
          practice_te:
            'సీజన్‌కు ముందు భూసార పరీక్ష చేయించి, NPK మాత్రమే కాకుండా అందుబాటులో ఉన్న జింక్ గురించి ప్రత్యేకంగా అడగండి. భూసార పరీక్ష ద్వారా జింక్ లోపాన్ని ముందే ఊహించవచ్చు; సీజన్ మధ్యలో సరిదిద్దడం కంటే ముందే నివారించడం చాలా చౌక.',
          targetTiming: 'Before the season',
        },
        {
          stepNumber: 2,
          practice_en:
            'Apply well-decomposed farmyard manure or compost regularly. Organic matter keeps zinc in a form the plant can take up, especially in high-pH soils.',
          practice_te:
            'బాగా చివికిన పశువుల ఎరువు లేదా కంపోస్టును క్రమం తప్పకుండా వేయండి. సేంద్రియ పదార్థం జింక్‌ను మొక్క గ్రహించగల రూపంలో ఉంచుతుంది, ముఖ్యంగా ఎక్కువ pH ఉన్న నేలల్లో.',
          targetTiming: 'Land preparation',
        },
        {
          stepNumber: 3,
          practice_en:
            'Avoid continuous deep submergence. Alternate wetting and drying improves zinc availability as well as root health.',
          practice_te:
            'ఎప్పుడూ లోతుగా నీరు నిల్వ ఉంచవద్దు. తడి-ఆరు పద్ధతి జింక్ లభ్యతను, వేర్ల ఆరోగ్యాన్ని రెండింటినీ మెరుగుపరుస్తుంది.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 4,
          practice_en:
            'In fields with a known history of khaira, dip seedling roots in a zinc oxide suspension before transplanting — ask your RBK for the preparation used locally.',
          practice_te:
            'గతంలో ఖైరా వచ్చిన పొలాల్లో నాటే ముందు నారు వేర్లను జింక్ ఆక్సైడ్ ద్రావణంలో ముంచండి — స్థానికంగా వాడే తయారీ విధానాన్ని మీ RBK ను అడగండి.',
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
          instruction_te:
            'ఇది పోషక లోపం, కాబట్టి దీనికి పరిష్కారం జింక్, పురుగు మందు కాదు. సాధారణంగా జింక్ సల్ఫేట్ వాడతారు — దమ్ము సమయంలో నేలకు వేయడం ద్వారా, లేదా పొలంలో ఉన్న పంటపై పిచికారీ ద్వారా. ఇక్కడ నిర్దిష్ట మోతాదును ఉద్దేశపూర్వకంగా ఇవ్వలేదు — కింది హెచ్చరిక చూడండి.',
          safetyCaution_en:
            'No quantity is given here because the correct zinc rate depends on your soil test reading, soil pH and whether you are applying to soil or foliage, and it varies widely between fields. Zinc sulphate is a fertiliser, not a pesticide, so it does not appear in the CIBRC registry that this app verifies doses against. Ask your Rythu Bharosa Kendra (RBK) or Village Agriculture Assistant for the rate matched to your soil test.',
          safetyCaution_te:
            'ఇక్కడ మోతాదు ఇవ్వలేదు; ఎందుకంటే సరైన జింక్ మోతాదు మీ భూసార పరీక్ష ఫలితం, నేల pH, నేలకు వేస్తున్నారా ఆకులపై పిచికారీ చేస్తున్నారా అనే దానిపై ఆధారపడి ఉంటుంది, పొలం నుండి పొలానికి చాలా మారుతుంది. జింక్ సల్ఫేట్ ఎరువు, పురుగు మందు కాదు; కాబట్టి ఈ యాప్ మోతాదులను ధృవీకరించే CIBRC నమోదు పట్టికలో ఇది ఉండదు. మీ భూసార పరీక్షకు సరిపోయే మోతాదు కోసం రైతు భరోసా కేంద్రం (RBK) లేదా గ్రామ వ్యవసాయ సహాయకుని అడగండి.',
          regulatoryNotice_en:
            'Do not apply any fungicide or insecticide for this condition. Zinc deficiency is not caused by a pest or pathogen, so a spray cannot correct it — it only adds cost and can scorch already-stressed foliage.',
          regulatoryNotice_te:
            'ఈ సమస్యకు ఎటువంటి శిలీంద్రనాశకం లేదా పురుగు మందు వాడవద్దు. జింక్ లోపానికి కారణం పురుగు లేదా తెగులు కాదు, కాబట్టి పిచికారీ దీన్ని సరిదిద్దలేదు — ఖర్చు మాత్రమే పెరుగుతుంది, అప్పటికే ఒత్తిడిలో ఉన్న ఆకులు మాడిపోవచ్చు.',
        },
        {
          id: 'rice-zinc-corr-2',
          stepNumber: 2,
          category: 'preventive',
          instruction_en:
            'Alongside the zinc correction, drain the affected patches for a few days. Draining raises zinc availability in waterlogged soil and often produces visible recovery in the newer leaves within one to two weeks.',
          instruction_te:
            'జింక్ వేయడంతో పాటు, దెబ్బతిన్న మడుల్లో కొన్ని రోజులు నీటిని తీసివేయండి. నీరు నిల్వ ఉన్న నేలలో నీటిని తీస్తే జింక్ లభ్యత పెరుగుతుంది; తరచూ ఒకటి రెండు వారాల్లో కొత్త ఆకుల్లో మార్పు కనిపిస్తుంది.',
          safetyCaution_en:
            'Recovery shows in newly emerging leaves. Already-blotched older leaves will not turn green again, so judge whether the correction worked by looking at new growth, not old leaves.',
          safetyCaution_te:
            'కోలుకోవడం కొత్తగా వస్తున్న ఆకుల్లో కనిపిస్తుంది. అప్పటికే మరకలు పడిన ముదురు ఆకులు మళ్లీ పచ్చగా మారవు; కాబట్టి సరిదిద్దడం పనిచేసిందా లేదా అనేది ముదురు ఆకులను కాకుండా కొత్త పెరుగుదలను చూసి నిర్ణయించండి.',
        },
      ],
      captureGuidance: {
        instruction_en:
          'Step back and photograph the whole patch alongside a healthy area of the same field, so the stunting and the patchy pattern are visible. Then photograph one lower leaf close up, showing the blotching near the midrib and base.',
        instruction_te:
          'కొంత వెనక్కి వెళ్లి, అదే పొలంలోని ఆరోగ్యకరమైన ప్రాంతంతో పాటు దెబ్బతిన్న మడిని ఫోటో తీయండి; అప్పుడు మొక్కలు గిడసబారడం, మడులుగా ఉండటం కనిపిస్తాయి. తరువాత ఒక కింది ఆకును దగ్గరగా ఫోటో తీసి, ఈనె, ఆకు మొదలు దగ్గర ఉన్న మరకలను చూపండి.',
        rationale_en:
          'A close-up leaf photo alone looks very like Brown Spot. The patchy distribution and the stunting next to healthy plants are what identify this as a soil problem rather than a disease.',
        rationale_te:
          'కేవలం దగ్గరగా తీసిన ఆకు ఫోటో గోధుమ రంగు మచ్చల తెగులు వలెనే కనిపిస్తుంది. మడులుగా ఉండటం, ఆరోగ్యకరమైన మొక్కల పక్కన గిడసబారి ఉండటం — ఇవే దీన్ని తెగులు కాదు, నేల సమస్య అని చూపుతాయి.',
        requiredForConfidence: true,
      },
      fieldFollowUps: [
        {
          id: 'rice-zinc-q-patchy',
          question_en:
            'Is the problem confined to patches — low spots, levelled areas, or one part of the field — with clearly healthy plants nearby?',
          question_te:
            'సమస్య కొన్ని మడులకే పరిమితమైందా — పల్లపు ప్రాంతాలు, చదును చేసిన చోట్లు, లేదా పొలంలో ఒక భాగం — పక్కనే స్పష్టంగా ఆరోగ్యకరమైన మొక్కలు ఉన్నాయా?',
          ifYes_en: 'A patchy pattern tied to soil position strongly indicates a nutrient or soil problem, not a disease.',
          ifYes_te:
            'నేల స్థితిని అనుసరించి మడులుగా ఉండటం తెగులు కాదని, పోషక లేదా నేల సమస్య అని బలంగా సూచిస్తుంది.',
          ifNo_en:
            'Damage spread evenly or expanding plant to plant points to a disease or an insect-transmitted virus instead.',
          ifNo_te:
            'నష్టం అంతటా సమానంగా ఉంటే, లేదా మొక్క నుండి మొక్కకు విస్తరిస్తుంటే అది తెగులు లేదా పురుగు ద్వారా వ్యాపించే వైరస్ కావచ్చు.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-zinc-q-stunting',
          question_en: 'Are the affected plants clearly shorter, with fewer tillers, than healthy plants in the same field?',
          question_te:
            'దెబ్బతిన్న మొక్కలు అదే పొలంలోని ఆరోగ్యకరమైన మొక్కల కంటే స్పష్టంగా పొట్టిగా, తక్కువ పిలకలతో ఉన్నాయా?',
          ifYes_en: 'Stunting with poor tillering fits zinc deficiency. Brown Spot does not shorten the plant.',
          ifYes_te:
            'గిడసబారడం, పిలకలు తక్కువగా రావడం జింక్ లోపానికి సరిపోతుంది. గోధుమ రంగు మచ్చల తెగులు మొక్క ఎత్తును తగ్గించదు.',
          ifNo_en: 'Normal height with spotted leaves points to Brown Spot or another foliar disease.',
          ifNo_te:
            'మొక్క ఎత్తు మామూలుగా ఉండి ఆకులపై మచ్చలు ఉంటే అది గోధుమ రంగు మచ్చల తెగులు లేదా మరొక ఆకు తెగులు.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
          pointsAwayIds: ['disease-rice-brownspot'],
        },
        {
          id: 'rice-zinc-q-timing',
          question_en: 'Did this appear within about two to four weeks of transplanting?',
          question_te: 'ఇది నాటిన సుమారు రెండు నుండి నాలుగు వారాల లోపే కనిపించిందా?',
          ifYes_en: 'That timing is characteristic of khaira zinc deficiency.',
          ifYes_te: 'ఆ సమయం ఖైరా జింక్ లోపానికి ప్రత్యేక లక్షణం.',
          ifNo_en: 'Appearance much later in the season makes a foliar disease more likely.',
          ifNo_te: 'సీజన్‌లో చాలా ఆలస్యంగా కనిపిస్తే అది ఆకు తెగులు అయ్యే అవకాశం ఎక్కువ.',
          pointsTowardIds: ['disease-rice-zincdeficiency'],
        },
      ],
      severityBands: [
        {
          level: 'mild',
          threshold_en: 'Faint blotching on a few lower leaves in small patches, with no noticeable stunting.',
          threshold_te: 'చిన్న మడుల్లో కొన్ని కింది ఆకులపై మసక మరకలు, మొక్క ఎత్తులో గమనించదగిన తేడా లేదు.',
          action_en:
            'Drain the patch and plan a soil test. A foliar zinc correction may be enough; no pesticide of any kind is appropriate.',
          action_te:
            'ఆ మడిలో నీటిని తీసి భూసార పరీక్షకు ప్లాన్ చేసుకోండి. ఆకులపై జింక్ పిచికారీ సరిపోవచ్చు; ఎటువంటి పురుగు మందూ అవసరం లేదు.',
        },
        {
          level: 'moderate',
          threshold_en: 'Clear rust-brown blotching with visible stunting across distinct patches of the field.',
          threshold_te: 'పొలంలో స్పష్టమైన మడుల్లో తుప్పు రంగు మరకలు, మొక్కలు గిడసబారడం కనిపించడం.',
          action_en:
            'Apply the zinc correction at the rate your RBK gives for your soil test, and drain. Expect recovery to show in new leaves within one to two weeks.',
          action_te:
            'మీ భూసార పరీక్షకు RBK సూచించిన మోతాదులో జింక్ వేసి, నీటిని తీసివేయండి. ఒకటి రెండు వారాల్లో కొత్త ఆకుల్లో మార్పు కనిపించాలి.',
        },
        {
          level: 'severe',
          threshold_en: 'Large patches badly stunted with very poor tillering, and maturity visibly delayed against the rest of the field.',
          threshold_te:
            'పెద్ద మడులు తీవ్రంగా గిడసబారి పిలకలు చాలా తక్కువగా ఉండటం, మిగతా పొలంతో పోలిస్తే పక్వత స్పష్టంగా ఆలస్యం కావడం.',
          action_en:
            'Consult your RBK promptly. At this level yield is already affected, and the field needs a soil test to plan correction for next season as well as a rescue application now.',
          action_te:
            'వెంటనే RBK ను సంప్రదించండి. ఈ స్థాయిలో దిగుబడి అప్పటికే దెబ్బతింది; ఇప్పుడు అత్యవసర చర్యతో పాటు, వచ్చే సీజన్‌కు ప్రణాళిక కోసం భూసార పరీక్ష అవసరం.',
        },
      ],
      escalationThreshold_en:
        'Consult your Rythu Bharosa Kendra (RBK) or Village Agriculture Assistant for the zinc rate matched to your soil test, and promptly if patches are badly stunted or maturity is clearly delayed. Importantly, if someone advises a fungicide for these symptoms, ask them to rule out zinc deficiency first — khaira is routinely mistaken for Brown Spot, and a fungicide spent on it is money lost with the crop still declining.',
      escalationThreshold_te:
        'మీ భూసార పరీక్షకు సరిపోయే జింక్ మోతాదు కోసం రైతు భరోసా కేంద్రం (RBK) లేదా గ్రామ వ్యవసాయ సహాయకుని సంప్రదించండి; మడులు తీవ్రంగా గిడసబారినా, పక్వత స్పష్టంగా ఆలస్యమైనా వెంటనే సంప్రదించండి. ముఖ్యంగా, ఈ లక్షణాలకు ఎవరైనా శిలీంద్రనాశకం సూచిస్తే, ముందుగా జింక్ లోపం కాదని నిర్ధారించమని అడగండి — ఖైరాను గోధుమ రంగు మచ్చల తెగులుగా పొరబడటం సర్వసాధారణం; దానికి ఖర్చు చేసిన శిలీంద్రనాశకం వృథా అవుతుంది, పంట మాత్రం క్షీణిస్తూనే ఉంటుంది.',
      claimEvidence: [
        {
          claimId: 'rice-zinc-no-dose',
          fieldRef: "treatments['rice-zinc-corr-1'] — zinc sulphate application rate, deliberately omitted",
          verificationStatus: 'unsupported',
          locator: undefined,
          limitation_en:
            'No application rate is stated for zinc sulphate. Zinc sulphate is a fertiliser rather than a pesticide, so it is outside the scope of the CIBRC registries this catalog verifies doses against, and no primary ANGRAU or ICAR document giving a rate was accessible from this tool. A rate must come from your own soil test via your RBK.',
          limitation_te:
            'జింక్ సల్ఫేట్‌కు మోతాదు ఇవ్వలేదు. జింక్ సల్ఫేట్ ఎరువు, పురుగు మందు కాదు; కాబట్టి ఈ జాబితా మోతాదులను ధృవీకరించే CIBRC నమోదు పట్టికల పరిధిలోకి ఇది రాదు, మోతాదు ఇచ్చే ANGRAU లేదా ICAR ప్రాథమిక పత్రం ఈ సాధనం ద్వారా అందుబాటులో లేదు. మోతాదు మీ భూసార పరీక్ష ఆధారంగా RBK నుండి తీసుకోవాలి.',
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
      conditionCategory: 'disease',
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
      conditionCategory: 'pest',
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
      conditionCategory: 'pest',
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
      conditionCategory: 'disease',
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

    'disease-maize-turcicumblight': {
      id: 'disease-maize-turcicumblight',
      cropId: 'crop-maize',
      name_en: 'Turcicum Leaf Blight',
      name_te: 'మొక్కజొన్న టర్సికమ్ ఆకు ఎండు తెగులు',
      conditionCategory: 'disease',
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
    'disease-brinjal-shootfruitborer': {
      id: 'disease-brinjal-shootfruitborer',
      cropId: 'crop-brinjal',
      name_en: 'Shoot and Fruit Borer',
      name_te: 'కాండం మరియు కాయ తొలిచే పురుగు',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Leucinodes orbonalis (brinjal shoot and fruit borer)',
      pathogenOrVector_te: 'కీటకం: ల్యూసినోడిస్ ఆర్బొనాలిస్ (వంకాయ కాండం, కాయ తొలిచే పురుగు)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Young shoots wilt and droop ("dead heart") with a small bore hole and larval frass (excreta) visible at the entry point.',
        'In fruits, a small bore hole plugged with frass is visible on the surface; the fruit shows little external rot but is hollowed and tunneled inside by the larva.',
        'Infested fruits are unmarketable even though the outer skin often still looks mostly healthy.',
      ],
      observableSymptoms_te: [
        'లేత చిగుళ్లు వాడిపోయి వంగిపోతాయి; తొలిచిన రంధ్రం వద్ద పురుగు విసర్జించిన పదార్థం కనిపిస్తుంది.',
        'కాయలపై చిన్న రంధ్రం, దాని చుట్టూ పురుగు విసర్జించిన పదార్థం కనిపిస్తుంది; పైకి ఎక్కువ కుళ్ళు కనిపించకపోయినా లోపల కాయ తొలిచి ఉంటుంది.',
        'పైకి బాగానే కనిపించినా, తొలిచిన కాయలు అమ్మకానికి పనికిరావు.',
      ],
      affectedParts: ['Shoots', 'Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-borer',
          name_en: 'Wet Fruit Rot (Rhizopus/Choanephora)',
          name_te: 'తడి కాయకుళ్ళు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Borer damage always has a plugged bore hole with frass and a dry tunnel inside; wet rot has no bore hole, instead a soft, watery, foul-smelling rot that spreads rapidly across the fruit surface.',
          differentiatingFactors_te:
            'పురుగు తొలిచిన కాయలో రంధ్రం, దాని చుట్టూ విసర్జిత పదార్థం ఉంటుంది, లోపల పొడిగా తొలిచి ఉంటుంది; తడి కుళ్ళులో రంధ్రం ఉండదు, బదులుగా మెత్తని, తడి, దుర్వాసనతో కూడిన కుళ్ళు వేగంగా వ్యాపిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather allows multiple, overlapping pest generations through the season.',
        'Continuous brinjal cultivation on the same land without rotation builds up the local pest population.',
        'Leaving infested shoots and fruits on the plant lets larvae complete their lifecycle and re-infest.',
      ],
      environmentalRiskFactors_te: [
        'వెచ్చని, తేమతో కూడిన వాతావరణంలో ఈ పురుగు అనేక తరాలు వరుసగా వృద్ధి చెందుతుంది.',
        'ఒకే పొలంలో పంట మార్పిడి లేకుండా పదేపదే వంకాయ వేయడం వల్ల పురుగు సంఖ్య పెరుగుతుంది.',
        'తొలిచిన చిగుళ్లు, కాయలను మొక్కపైనే వదిలేస్తే పురుగు జీవితచక్రం పూర్తి చేసుకుని మళ్ళీ సోకుతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Hand-pick and destroy (bury or burn) wilted shoots and infested/bored fruits every week throughout the season — this single practice is the most widely recommended, lowest-cost control for this pest.',
          practice_te:
            'ప్రతి వారం వాడిన చిగుళ్లను, తొలిచిన కాయలను చేతితో ఏరి నాశనం చేయండి (పూడ్చిపెట్టండి లేదా కాల్చండి) — ఇది అతి తక్కువ ఖర్చుతో అత్యంత సిఫారసు చేయబడిన పద్ధతి.',
          targetTiming: 'Weekly, throughout the season',
        },
        {
          stepNumber: 2,
          practice_en:
            'Install pheromone traps (Leucinodes orbonalis-specific lure) at roughly 8-10 traps per acre for monitoring and mass trapping of male moths.',
          practice_te:
            'మగ శలభాలను ఆకర్షించి పట్టుకోవడానికి ఎకరానికి 8-10 ఫెరోమోన్ ఎరలను ఏర్పాటు చేయండి.',
          targetTiming: 'From transplanting onward',
        },
        {
          stepNumber: 3,
          practice_en:
            'Avoid ratooning (cutting back and regrowing) a heavily infested crop, since surviving larvae inside old stems carry the infestation into the new flush.',
          practice_te:
            'ఎక్కువగా పురుగు సోకిన పంటను మళ్ళీ కత్తిరించి పెంచవద్దు — పాత కాండంలో మిగిలిన పురుగులు కొత్త చిగుళ్లకు సోకుతాయి.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-sfb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem seed kernel extract (NSKE) or neem oil sprays are commonly used against early-instar larvae before they bore in, but a specific concentration/dose is not confirmed against a primary label from this session — confirm the rate with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) before spraying.',
          instruction_te:
            'లేత పురుగులు కాయలు తొలవకముందే వేప గింజల కషాయం లేదా వేప నూనె పిచికారీ సాధారణంగా వాడతారు, కానీ ఖచ్చితమైన గాఢత/మోతాదును ఈ సెషన్ ధృవీకరించలేదు — పిచికారీకి ముందు గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) వద్ద మోతాదును నిర్ధారించుకోండి.',
          activeIngredient_en: 'Azadirachtin (organic, dose unverified)',
          activeIngredient_te: 'అజాడిరక్టిన్ (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Once a larva has bored into a shoot or fruit, no spray can reach it — hand-picking is the only way to remove it at that stage.',
          safetyCaution_te: 'పురుగు ఒకసారి లోపలికి తొలుచుకుపోతే, ఏ పిచికారీ మందు దాన్ని చేరదు — ఆ దశలో చేతితో ఏరడమే ఏకైక మార్గం.',
        },
        {
          id: 't-brinjal-sfb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Insecticides such as Flubendiamide, Spinosad, or Emamectin benzoate are commonly registered against Lepidopteran shoot/fruit borers in brinjal, but a specific dose for this pest/crop combination is suppressed here — this session could not confirm a current CIBRC-registered figure, and brinjal fruit is harvested frequently (every few days), so a wrong waiting period is a real risk. Do not spray from memory.',
          instruction_te:
            'వంకాయలో కాండం/కాయ తొలిచే పురుగుకు ఫ్లుబెండమైడ్, స్పినోసాడ్, ఎమామెక్టిన్ బెంజోయేట్ వంటి మందులు సాధారణంగా నమోదై ఉన్నాయి, కానీ ఈ నిర్దిష్ట పురుగు/పంట కలయికకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది, వంకాయను తరచుగా (కొద్ది రోజులకోసారి) కోస్తారు కాబట్టి తప్పు నిరీక్షణ వ్యవధి నిజమైన ప్రమాదం. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Flubendiamide / Spinosad / Emamectin benzoate (organic/chemical dose suppressed)',
          activeIngredient_te: 'ఫ్లుబెండమైడ్ / స్పినోసాడ్ / ఎమామెక్టిన్ బెంజోయేట్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your Village Agriculture Assistant (VAA) / Rythu Bharosa Kendra (RBK) and check your product container label before spraying — brinjal is often picked every 3-5 days, so a product with a long waiting period may force skipping a harvest round.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని గ్రామ వ్యవసాయ సహాయకుడు (VAA) / రైతు భరోసా కేంద్రం (RBK) వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి — వంకాయను తరచుగా 3-5 రోజులకోసారి కోస్తారు కాబట్టి, ఎక్కువ నిరీక్షణ వ్యవధి ఉన్న మందు వాడితే ఒక కోత తప్పిపోవచ్చు.',
        },
      ],
      escalationThreshold_en:
        'If more than about 10% of shoots or fruits show borer damage despite regular hand-picking and trapping, or pheromone trap catches stay high week over week, consult your VAA/RBK for a tailored spray program.',
      escalationThreshold_te:
        'క్రమం తప్పకుండా ఏరివేత, ఎరలు ఏర్పాటు చేసినా 10% కంటే ఎక్కువ చిగుళ్లు లేదా కాయలు దెబ్బతింటే, లేదా ఫెరోమోన్ ఎరలలో పురుగుల సంఖ్య వారం వారం ఎక్కువగా ఉంటే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'ఫోమోప్సిస్ ఆకుమచ్చ మరియు కాయకుళ్ళు తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phomopsis vexans',
      pathogenOrVector_te: 'శిలీంద్రం: ఫోమోప్సిస్ వెక్సాన్స్',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Small circular brown spots with greyish centers on leaves, which can enlarge and merge, causing leaf drop.',
        'A girdling blight near the soil line can kill young seedlings (damping-off) in the nursery.',
        'On fruits: sunken, water-soaked spots that enlarge and turn pale brown-grey, often showing tiny black dots (fungal fruiting bodies) arranged in rings; the fruit eventually shrivels and rots.',
      ],
      observableSymptoms_te: [
        'ఆకులపై చిన్న గుండ్రని గోధుమ రంగు మచ్చలు, మధ్యలో బూడిద రంగు కేంద్రం ఉంటాయి; ఇవి పెద్దవై కలిసిపోయి ఆకు రాలుతుంది.',
        'నారుమడిలో నేల మట్టానికి దగ్గర కాండం చుట్టూ తెగులు సోకి లేత మొక్కలు చనిపోవచ్చు.',
        'కాయలపై: లోతుగా, తడిగా కనిపించే మచ్చలు పెద్దవై లేత గోధుమ-బూడిద రంగులోకి మారతాయి; తరచుగా వలయాకారంలో చిన్న నల్లని బిందువులు (శిలీంద్ర బీజకోశాలు) కనిపిస్తాయి; చివరికి కాయ ముడుచుకుని కుళ్ళిపోతుంది.',
      ],
      affectedParts: ['Leaves', 'Stems', 'Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-phomopsis',
          name_en: 'Wet Fruit Rot (Rhizopus/Choanephora)',
          name_te: 'తడి కాయకుళ్ళు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Phomopsis fruit rot shows small black dots (pycnidia) arranged in concentric rings on a firm, pale lesion; wet rot is a soft, rapidly-spreading, watery rot with no ring pattern and a stronger foul smell.',
          differentiatingFactors_te:
            'ఫోమోప్సిస్ కాయకుళ్ళులో గట్టిగా ఉండే లేత మచ్చపై వలయాకారంలో చిన్న నల్లని బిందువులు కనిపిస్తాయి; తడి కుళ్ళులో వలయాకారం ఉండదు, మెత్తని, వేగంగా వ్యాపించే, ఎక్కువ దుర్వాసన గల కుళ్ళు ఉంటుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather (around 25-30°C) with frequent rain or overhead irrigation spreads spores via splash.',
        'Infected seed or nursery seedlings carry the fungus into a new planting.',
        'Continuous brinjal cultivation on the same field without rotation allows the fungus to build up in crop residue.',
      ],
      environmentalRiskFactors_te: [
        'వెచ్చని, తేమతో కూడిన వాతావరణం (సుమారు 25-30°C), తరచుగా వర్షాలు లేదా పైనుండి తడిపే నీటిపారుదల వల్ల బీజాలు చిందరవందరగా వ్యాపిస్తాయి.',
        'తెగులు సోకిన విత్తనం లేదా నారు మొక్కల ద్వారా కొత్త పంటకు తెగులు వ్యాపిస్తుంది.',
        'పంట మార్పిడి లేకుండా అదే పొలంలో పదేపదే వంకాయ వేయడం వల్ల పంట అవశేషాల్లో శిలీంద్రం పేరుకుపోతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use disease-free seed or seedlings from a trusted nursery, and treat seed with a biological agent (Trichoderma-based) before sowing where available.',
          practice_te: 'నమ్మకమైన నారుమడి నుండి తెగులు లేని విత్తనం/నారు వాడండి, వీలైతే విత్తేముందు ట్రైకోడెర్మా ఆధారిత జీవ నియంత్రణ కారకంతో విత్తన శుద్ధి చేయండి.',
          targetTiming: 'Pre-sowing / pre-transplanting',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy infected leaves, fallen fruit, and crop debris at the end of the season rather than leaving them in the field.',
          practice_te: 'తెగులు సోకిన ఆకులు, రాలిన కాయలు, పంట అవశేషాలను పొలంలో వదలకుండా తీసి నాశనం చేయండి.',
          targetTiming: 'Throughout season and post-harvest',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-solanaceous crop (not tomato, chilli, or potato) for 2-3 years where field layout allows.',
          practice_te: 'వీలైతే 2-3 సంవత్సరాలు సోలనేసి కుటుంబానికి చెందని పంటలతో (టమాట, మిరప, బంగాళాదుంప కాకుండా) పంట మార్పిడి చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-phomopsis-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride applied to soil/root zone is a commonly documented biological approach against soil-borne Phomopsis inoculum, but a specific application rate is not confirmed from a primary source in this session — confirm with your VAA/RBK.',
          instruction_te:
            'నేలలో ఉండే ఫోమోప్సిస్ బీజాలకు వ్యతిరేకంగా ట్రైకోడెర్మా విరిడిని నేల/వేరు ప్రాంతానికి వేయడం సాధారణ సేంద్రియ పద్ధతి, కానీ ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Trichoderma viride (organic, dose unverified)',
          activeIngredient_te: 'ట్రైకోడెర్మా విరిడి (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-brinjal-phomopsis-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb or Carbendazim foliar sprays are widely documented for Phomopsis blight management, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          instruction_te:
            'ఫోమోప్సిస్ తెగులుకు మాంకోజెబ్ లేదా కార్బెండజిమ్ పిచికారీలు విస్తృతంగా వాడతారు, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Mancozeb / Carbendazim (dose suppressed)',
          activeIngredient_te: 'మాంకోజెబ్ / కార్బెండజిమ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your VAA/RBK and check your container label before spraying, given brinjal\'s frequent harvest cycle.',
          regulatoryNotice_te:
            'వంకాయను తరచుగా కోస్తారు కాబట్టి, పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If fruit rot affects more than about 10-15% of the standing crop, or seedling damping-off appears in the nursery, consult your VAA/RBK promptly.',
      escalationThreshold_te:
        'నిలబడిన పంటలో 10-15% కంటే ఎక్కువ కాయలకు కుళ్ళు తెగులు సోకినా, నారుమడిలో మొక్కలు చనిపోతున్నా, వెంటనే VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'తడి కాయకుళ్ళు తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungi: Rhizopus spp. / Choanephora spp. (secondary fruit-rot fungi, often entering through wounds)',
      pathogenOrVector_te: 'శిలీంద్రాలు: రైజోపస్ / కోయనెఫోరా జాతులు (గాయాల ద్వారా ప్రవేశించే ద్వితీయ కాయకుళ్ళు శిలీంద్రాలు)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'A soft, watery rot that spreads rapidly across the fruit, often starting where the fruit touches wet soil or has an injury (including an old borer hole).',
        'The fruit becomes mushy with a distinct foul smell; whitish or grey fungal growth can appear on the surface in advanced stages.',
        'Spreads quickly to touching fruits in storage or dense foliage.',
      ],
      observableSymptoms_te: [
        'కాయ తడి నేలను తాకిన చోట లేదా ఏదైనా గాయం (పాత పురుగు రంధ్రం సహా) ఉన్న చోట మెత్తని, తడి కుళ్ళు వేగంగా వ్యాపిస్తుంది.',
        'కాయ మెత్తగా, దుర్వాసనతో మారుతుంది; ముదిరిన దశలో తెల్లని లేదా బూడిద రంగు శిలీంద్ర పెరుగుదల కనిపించవచ్చు.',
        'నిల్వలో లేదా దట్టమైన ఆకుల మధ్య తాకుతున్న కాయలకు వేగంగా వ్యాపిస్తుంది.',
      ],
      affectedParts: ['Fruits'],
      similarConditions: [
        {
          id: 'brinjal-wetrot-vs-phomopsis-2',
          name_en: 'Phomopsis Blight & Fruit Rot',
          name_te: 'ఫోమోప్సిస్ ఆకుమచ్చ మరియు కాయకుళ్ళు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Wet rot is soft, watery, and spreads fast with a strong foul smell and no ring pattern; Phomopsis rot is firmer, paler, and shows tiny black dots in concentric rings.',
          differentiatingFactors_te:
            'తడి కుళ్ళు మెత్తగా, తడిగా, వేగంగా వ్యాపిస్తుంది, తీవ్రమైన దుర్వాసన ఉంటుంది, వలయాకారం ఉండదు; ఫోమోప్సిస్ కుళ్ళు గట్టిగా, లేత రంగులో ఉండి వలయాకారంలో నల్లని బిందువులు చూపుతుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'High humidity and waterlogging around the fruiting zone.',
        'Fruit resting directly on wet soil.',
        'Mechanical injury or insect damage (including Shoot and Fruit Borer entry holes) that gives the fungus an entry wound.',
      ],
      environmentalRiskFactors_te: [
        'కాయ ఉండే ప్రాంతంలో ఎక్కువ తేమ, నీరు నిలవడం.',
        'కాయ నేరుగా తడి నేలను తాకడం.',
        'యాంత్రిక గాయాలు లేదా కీటకాల నష్టం (కాండం/కాయ తొలిచే పురుగు రంధ్రాలతో సహా) శిలీంద్రానికి ప్రవేశ మార్గం ఇస్తాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Stake plants or use mulch so fruits do not rest directly on wet soil.',
          practice_te: 'కాయలు నేరుగా తడి నేలను తాకకుండా మొక్కలకు ఆధారం ఇవ్వండి లేదా మల్చింగ్ వాడండి.',
        },
        {
          stepNumber: 2,
          practice_en: 'Harvest fruit promptly at maturity and avoid bruising or injuring fruit during picking and handling.',
          practice_te: 'కాయలు పక్వానికి రాగానే వెంటనే కోయండి; కోసేటప్పుడు, తర్వాత నిర్వహణలో కాయలకు గాయం కాకుండా జాగ్రత్త వహించండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Control the Shoot and Fruit Borer, since its bore holes are a common entry wound for this rot.',
          practice_te: 'కాండం/కాయ తొలిచే పురుగును అదుపులో ఉంచండి — దాని రంధ్రాలు ఈ కుళ్ళుకు సాధారణ ప్రవేశ మార్గం.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-wetrot-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'This rot is largely a wound-and-moisture problem rather than a primary infection, so prevention (drainage, staking, prompt harvest, borer control) matters more than any spray. A copper-based fungicide (e.g. copper oxychloride) is sometimes used as a general field sanitation spray, but a specific dose is not confirmed from a primary source here — confirm with your VAA/RBK if you choose to spray.',
          instruction_te:
            'ఈ కుళ్ళు ఎక్కువగా గాయం మరియు తేమ వల్ల కలిగేదే తప్ప ప్రాథమిక తెగులు కాదు కాబట్టి, పిచికారీ కంటే నివారణ చర్యలే (నీటి పారుదల, ఆధారం ఇవ్వడం, వెంటనే కోత, పురుగు నియంత్రణ) ఎక్కువ ముఖ్యం. సాధారణ పొలం పరిశుభ్రత కోసం కొన్నిసార్లు రాగి ఆధారిత శిలీంద్రనాశకం (ఉదా. కాపర్ ఆక్సీక్లోరైడ్) వాడతారు, కానీ ఖచ్చితమైన మోతాదును ఇక్కడ ధృవీకరించలేదు — పిచికారీ చేయదలిస్తే VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (ఐచ్ఛికం, మోతాదు ధృవీకరించబడలేదు)',
        },
      ],
      escalationThreshold_en:
        'If rot spreads rapidly through the field or causes more than about 15% fruit loss despite drainage and sanitation steps, consult your VAA/RBK.',
      escalationThreshold_te:
        'నీటి పారుదల, పరిశుభ్రత చర్యలు తీసుకున్నా కుళ్ళు వేగంగా వ్యాపిస్తున్నా లేదా 15% కంటే ఎక్కువ కాయ నష్టం జరిగినా, VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'కాయ పగుళ్లు (పోషక/నీటి లోపం)',
      conditionCategory: 'physiological_disorder',
      pathogenOrVector_en: 'Non-pathogenic: irregular soil moisture and/or calcium/boron nutrition during rapid fruit growth',
      pathogenOrVector_te: 'తెగులు కాదు: కాయ వేగంగా పెరిగే దశలో అసమాన నేల తేమ మరియు/లేదా కాల్షియం/బోరాన్ పోషక లోపం',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Irregular cracks or splits on the fruit skin, often radiating outward from near the stalk/calyx end.',
        'Cracks may heal over with a corky, hardened edge, or stay open and invite secondary soft rot.',
        'No bore hole, frass, or fungal ring pattern is present — the crack itself is a clean split in the skin.',
      ],
      observableSymptoms_te: [
      'కాయ తొడిమ/పీచు భాగం దగ్గర నుండి బయటకు విస్తరించే అసమాన పగుళ్లు కనిపిస్తాయి.',
        'పగుళ్లు మాన్చుకుని గట్టిపడిన అంచుతో ఉండవచ్చు, లేదా తెరిచే ఉండి ద్వితీయ మెత్తని కుళ్ళుకు దారితీయవచ్చు.',
        'రంధ్రం, పురుగు విసర్జిత పదార్థం, లేదా శిలీంద్ర వలయాకారం ఉండవు — పగులు కేవలం శుభ్రమైన చీలికలా ఉంటుంది.',
      ],
      affectedParts: ['Fruits'],
      similarConditions: [
        {
          id: 'brinjal-cracking-vs-phomopsis',
          name_en: 'Phomopsis Blight & Fruit Rot',
          name_te: 'ఫోమోప్సిస్ ఆకుమచ్చ మరియు కాయకుళ్ళు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Cracking is a clean skin split with no rot, discoloration ring, or fungal dots unless a crack later gets secondarily infected; Phomopsis rot is a sunken, discolored lesion with pycnidia from the start.',
          differentiatingFactors_te:
            'పగులు అనేది శుభ్రమైన చర్మం చీలిక మాత్రమే, దానికి తర్వాత ద్వితీయ తెగులు సోకనంతవరకు కుళ్ళు, రంగు మార్పు, శిలీంద్ర బిందువులు ఉండవు; ఫోమోప్సిస్ కుళ్ళు మొదటి నుండే లోతుగా, రంగు మారిన మచ్చగా బీజకోశాలతో కనిపిస్తుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'A long dry spell followed by heavy irrigation or sudden rain, causing the fruit to swell faster than its skin can stretch.',
        'Inconsistent irrigation scheduling in general.',
        'Calcium or boron deficiency in the soil, and some cultivars are more prone than others.',
      ],
      environmentalRiskFactors_te: [
        'ఎక్కువ రోజులు నీరు లేకుండా ఉండి, తరువాత ఒకేసారి ఎక్కువ నీరు పెట్టడం లేదా భారీ వర్షం పడటం వల్ల కాయ చర్మం సాగే వేగం కంటే వేగంగా లోపల పెరుగుతుంది.',
        'నీటి పారుదలలో క్రమబద్ధత లేకపోవడం.',
        'నేలలో కాల్షియం లేదా బోరాన్ లోపం; కొన్ని రకాలు ఎక్కువగా దీనికి గురవుతాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain even, consistent soil moisture through regular irrigation — avoid long dry spells followed by heavy watering.',
          practice_te: 'క్రమం తప్పకుండా నీటిపారుదల ద్వారా నేలలో సమానమైన తేమను కాపాడండి — ఎక్కువ రోజులు ఆరబెట్టి తర్వాత ఒకేసారి ఎక్కువ నీరు పెట్టవద్దు.',
          targetTiming: 'Throughout fruiting period',
        },
        {
          stepNumber: 2,
          practice_en: 'Mulch around the base of plants to conserve soil moisture and reduce swings between wet and dry.',
          practice_te: 'నేల తేమను కాపాడటానికి, తడి-పొడి మార్పులను తగ్గించడానికి మొక్కల మొదళ్ల చుట్టూ మల్చింగ్ వేయండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'If cracking persists despite consistent irrigation, have your soil tested for calcium and boron levels through your RBK.',
          practice_te: 'స్థిరమైన నీటిపారుదల చేసినా పగుళ్లు కొనసాగితే, మీ RBK ద్వారా నేలలో కాల్షియం, బోరాన్ స్థాయిలను పరీక్షించుకోండి.',
        },
      ],
      treatments: [
        {
          id: 't-brinjal-cracking-prev-1',
          stepNumber: 1,
          category: 'preventive',
          instruction_en:
            'This is a physiological disorder, not a disease or pest — there is no pesticide or fungicide for fruit cracking. Consistent irrigation scheduling and mulching are the primary corrective measures; a soil-test-guided calcium or boron correction may help if a nutrient deficiency is confirmed.',
          instruction_te:
            'ఇది తెగులు లేదా పురుగు కాదు, శారీరక లోపం మాత్రమే — కాయ పగుళ్లకు ఏ పురుగుమందు లేదా శిలీంద్రనాశకం పనిచేయదు. స్థిరమైన నీటిపారుదల ప్రణాళిక, మల్చింగ్ ప్రధాన దిద్దుబాటు చర్యలు; నేల పరీక్షలో పోషక లోపం నిర్ధారణ అయితే కాల్షియం లేదా బోరాన్ సరిచేయడం సహాయపడవచ్చు.',
          activeIngredient_en: 'None (agronomic correction only)',
          activeIngredient_te: 'ఏదీ లేదు (వ్యవసాయ పద్ధతుల ద్వారా మాత్రమే దిద్దుబాటు)',
        },
      ],
      escalationThreshold_en:
        'If a large share of fruit (roughly 20% or more) keeps cracking despite consistent irrigation and mulching, ask your VAA/RBK about a soil nutrient test for calcium and boron.',
      escalationThreshold_te:
        'స్థిరమైన నీటిపారుదల, మల్చింగ్ చేసినా సుమారు 20% కంటే ఎక్కువ కాయలు పగులుతూనే ఉంటే, కాల్షియం, బోరాన్ కోసం నేల పోషక పరీక్ష గురించి మీ VAA/RBK ను అడగండి.',
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
      name_te: 'పసుపు ఈనె మొజాయిక్ / ఆకు ముడుత వైరస్',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Virus: Bhendi Yellow Vein Mosaic Virus (BYVMV, a Begomovirus), transmitted by the whitefly Bemisia tabaci',
      pathogenOrVector_te:
        'వైరస్: బెండ పసుపు ఈనె మొజాయిక్ వైరస్ (BYVMV, బెగోమోవైరస్), తెల్లదోమ (బెమిసియా టాబాసి) ద్వారా వ్యాపిస్తుంది',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Veins on young leaves turn yellow first, forming a clear yellow network pattern while the tissue between veins stays green (vein-clearing/netting).',
        'As it progresses, the whole leaf may turn yellow, thicken, and curl upward; plants become visibly stunted with shortened internodes.',
        'Pods from infected plants are often small, pale, hard, and distorted ("stony"/hairy pods), with sharply reduced marketable yield; early infection (within 3-4 weeks of sowing) causes the worst loss.',
      ],
      observableSymptoms_te: [
        'లేత ఆకులపై ముందుగా ఈనెలు పసుపు రంగులోకి మారి స్పష్టమైన పసుపు వల లాంటి నమూనా ఏర్పడుతుంది; ఈనెల మధ్య భాగం పచ్చగానే ఉంటుంది.',
        'తెగులు ముదిరే కొద్దీ ఆకు మొత్తం పసుపు రంగులోకి మారి మందంగా, పైకి ముడుచుకుంటుంది; మొక్క కణుపుల మధ్య దూరం తగ్గి గిడసబారుతుంది.',
        'తెగులు సోకిన మొక్కల కాయలు చిన్నవిగా, లేతరంగులో, గట్టిగా, వంకరగా (రాయిలా గట్టిపడిన/వెంట్రుకలు గల కాయలు) ఉంటాయి; మార్కెట్‌కు పనికొచ్చే దిగుబడి బాగా తగ్గుతుంది; విత్తిన 3-4 వారాల్లోపే తెగులు సోకితే నష్టం ఎక్కువ.',
      ],
      affectedParts: ['Leaves', 'Veins', 'Pods', 'Whole Plant'],
      similarConditions: [
        {
          id: 'okra-leafcurl-vs-downymildew',
          name_en: 'Downy Mildew',
          name_te: 'బూజు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf curl virus shows a clear yellow vein network with upward leaf curling and no fungal growth; downy mildew shows angular yellow patches bound by veins with greyish-white fuzzy fungal growth visible on the leaf underside, especially in early morning, and does not curl the leaf upward.',
          differentiatingFactors_te:
            'ఆకు ముడుత వైరస్‌లో స్పష్టమైన పసుపు ఈనె వల నమూనా, ఆకు పైకి ముడుచుకోవడం కనిపిస్తాయి, శిలీంద్ర పెరుగుదల ఉండదు; బూజు తెగులులో ఈనెలతో ఆగిన చతురస్ర/కోణాకార పసుపు మచ్చలు ఉండి, ఆకు అడుగు భాగాన (ముఖ్యంగా ఉదయం మంచు వేళ) బూడిద-తెలుపు బూజు పెరుగుదల కనిపిస్తుంది; ఆకు పైకి ముడుచుకోదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'High whitefly (Bemisia tabaci) population, especially in warm, dry weather following rain — the vector, not the virus itself, is what a farmer can actually target.',
        'Nearby infected okra, cotton, or other whitefly-host crops/weeds acting as a virus reservoir.',
        'Late or staggered sowing that keeps young, highly susceptible plants available to whiteflies over a longer period.',
      ],
      environmentalRiskFactors_te: [
        'వెచ్చని, పొడి వాతావరణంలో (వర్షం తర్వాత) తెల్లదోమ సంఖ్య ఎక్కువగా ఉండటం — వైరస్‌ను కాదు, ఈ వాహకాన్నే రైతు నిజంగా లక్ష్యంగా చేసుకోగలరు.',
        'దగ్గరలో తెగులు సోకిన బెండ, పత్తి లేదా ఇతర తెల్లదోమ ఆశ్రయించే పంటలు/కలుపు మొక్కలు వైరస్ నిల్వగా పనిచేస్తాయి.',
        'ఆలస్యంగా లేదా వేర్వేరు సమయాల్లో విత్తడం వల్ల లేత, ఎక్కువ తెగులు సోకే మొక్కలు ఎక్కువ కాలం తెల్లదోమలకు అందుబాటులో ఉంటాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Grow a locally recommended yellow-vein-mosaic-tolerant/resistant okra variety where available — this is the single most effective and lowest-cost control, since the virus itself cannot be cured once a plant is infected.',
          practice_te: 'అందుబాటులో ఉంటే స్థానికంగా సిఫారసు చేసిన పసుపు ఈనె తెగులును తట్టుకునే/నిరోధక బెండ రకాన్ని వేయండి — మొక్కకు ఒకసారి తెగులు సోకితే వైరస్‌ను నయం చేయలేము కాబట్టి ఇదే అత్యంత సమర్థవంతమైన, తక్కువ ఖర్చుతో కూడిన నియంత్రణ.',
          targetTiming: 'At variety selection, before sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Rogue out (uproot and remove) infected plants as soon as symptoms appear, especially within the first month, to reduce the local virus source for whiteflies to pick up and spread further.',
          practice_te: 'లక్షణాలు కనిపించిన వెంటనే, ముఖ్యంగా మొదటి నెలలో, తెగులు సోకిన మొక్కలను పీకి తీసివేయండి — దీనివల్ల తెల్లదోమలు మరింత వ్యాప్తి చేసే వైరస్ మూలం తగ్గుతుంది.',
          targetTiming: 'Throughout the first 4-6 weeks after sowing',
        },
        {
          stepNumber: 3,
          practice_en: 'Install yellow sticky traps to monitor and reduce whitefly numbers, and avoid planting okra next to or right after cotton or other whitefly-prone crops.',
          practice_te: 'తెల్లదోమల సంఖ్యను గమనించడానికి, తగ్గించడానికి పసుపు రంగు జిగురు అట్టలను అమర్చండి; పత్తి లేదా ఇతర తెల్లదోమ ఎక్కువగా ఉండే పంటలకు పక్కనే లేదా వెంటనే బెండ వేయకండి.',
        },
      ],
      treatments: [
        {
          id: 't-okra-yvmv-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem oil or neem seed kernel extract sprays are commonly used to discourage whitefly feeding and egg-laying (the vector, not the virus), but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'తెల్లదోమ (వైరస్ వాహకం) తినడం, గుడ్లు పెట్టడం తగ్గించడానికి వేప నూనె లేదా వేప గింజల కషాయం పిచికారీ సాధారణంగా వాడతారు, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Neem oil / NSKE (organic, dose unverified)',
          activeIngredient_te: 'వేప నూనె / వేప గింజల కషాయం (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'No spray, organic or chemical, cures a plant already infected with the virus — treatment targets only the whitefly vector to protect still-healthy plants.',
          safetyCaution_te: 'ఇప్పటికే వైరస్ సోకిన మొక్కను ఏ పిచికారీ (సేంద్రియమైనా, రసాయనమైనా) నయం చేయదు — చికిత్స లక్ష్యం ఆరోగ్యంగా ఉన్న మొక్కలను కాపాడటానికి తెల్లదోమ వాహకాన్ని అదుపులో ఉంచడమే.',
        },
        {
          id: 't-okra-yvmv-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Diafenthiuron, Thiamethoxam, or Flonicamid are commonly used against whitefly vectors in okra, but a specific dose for this crop is suppressed here — this session could not confirm a current CIBRC-registered figure, and okra is harvested every 2-3 days, so a wrong waiting period is a real risk. Do not spray from memory.',
          instruction_te:
            'బెండలో తెల్లదోమ వాహకాన్ని అదుపు చేయడానికి డయాఫెంతియురాన్, థయామిథాక్సామ్, ఫ్లోనికామిడ్ వంటి సిస్టమిక్ పురుగుమందులు సాధారణంగా వాడతారు, కానీ ఈ పంటకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది, బెండను ప్రతి 2-3 రోజులకు కోస్తారు కాబట్టి తప్పు నిరీక్షణ వ్యవధి నిజమైన ప్రమాదం. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Diafenthiuron / Thiamethoxam / Flonicamid (dose suppressed)',
          activeIngredient_te: 'డయాఫెంతియురాన్ / థయామిథాక్సామ్ / ఫ్లోనికామిడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying, given okra\'s frequent 2-3 day harvest cycle.',
          regulatoryNotice_te:
            'బెండను 2-3 రోజులకోసారి కోస్తారు కాబట్టి, పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than about 20-25% of plants show symptoms, or symptoms appear widely within the first month after sowing, consult your VAA/RBK promptly about resistant varieties for the next planting and an area-wide whitefly management plan.',
      escalationThreshold_te:
        '20-25% కంటే ఎక్కువ మొక్కలకు లక్షణాలు కనిపించినా, లేదా విత్తిన మొదటి నెలలోనే విస్తృతంగా లక్షణాలు కనిపించినా, తదుపరి పంటకు నిరోధక రకాలు మరియు ప్రాంతవ్యాప్త తెల్లదోమ నియంత్రణ ప్రణాళిక గురించి వెంటనే VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'బూజు తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Oomycete pathogen (downy mildew group, Peronosporales) — the exact species for okra is not confirmed from a primary source this session',
      pathogenOrVector_te:
        'ఓమైసిట్ వర్గ శిలీంద్రం (బూజు తెగులు సమూహం, పెరోనోస్పొరేల్స్) — బెండకు ఖచ్చితమైన జాతిని ఈ సెషన్ ధృవీకరించలేదు',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Pale yellow, angular patches on the upper leaf surface, bounded by the leaf veins (a checkerboard-like pattern).',
        'A greyish-white to faintly purplish, fuzzy (downy) fungal growth appears on the corresponding underside of the leaf, most visible in early morning while dew is still present.',
        'Severely affected leaves turn brown, dry up, and drop early, starting from the lower/older leaves.',
      ],
      observableSymptoms_te: [
        'ఆకు పై ఉపరితలంపై ఈనెలతో ఆగిన లేత పసుపు రంగు చతురస్ర/కోణాకార మచ్చలు (చదరంగం నమూనా వలె) కనిపిస్తాయి.',
        'ఆ మచ్చలకు సరిగ్గా అడుగున బూడిద-తెలుపు నుండి లేత ఊదా రంగు మెత్తని (బూజు వంటి) శిలీంద్ర పెరుగుదల కనిపిస్తుంది; ఉదయం మంచు ఉన్నప్పుడు బాగా కనిపిస్తుంది.',
        'తీవ్రంగా సోకిన ఆకులు గోధుమ రంగులోకి మారి ఎండి, కింది/ముదురు ఆకుల నుండి మొదలై ముందుగా రాలిపోతాయి.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-downymildew-vs-cercospora',
          name_en: 'Cercospora Leaf Spot',
          name_te: 'సెర్కోస్పోరా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Downy mildew lesions are angular and vein-bound with fuzzy downy growth visible on the leaf underside; Cercospora spots are more rounded with a distinct reddish-brown margin and a dry, grainy texture, with no fuzzy growth.',
          differentiatingFactors_te:
            'బూజు తెగులు మచ్చలు ఈనెలతో ఆగి కోణాకారంగా ఉండి, ఆకు అడుగున మెత్తని బూజు పెరుగుదల కనిపిస్తుంది; సెర్కోస్పోరా మచ్చలు గుండ్రంగా, స్పష్టమైన ఎరుపు-గోధుమ అంచుతో, పొడి, కణిక రూపంలో ఉంటాయి, బూజు పెరుగుదల ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Cool nights with heavy dew or morning fog followed by warm days — classic downy-mildew-favoring weather.',
        'Dense planting and poor air circulation that keeps leaf surfaces wet longer.',
        'Overhead irrigation late in the day, which keeps foliage wet overnight.',
      ],
      environmentalRiskFactors_te: [
        'రాత్రిపూట చల్లగా ఉండి ఎక్కువ మంచు లేదా పొగమంచు పడి, పగలు వెచ్చగా ఉండే వాతావరణం — ఇది బూజు తెగులుకు అనుకూలం.',
        'దట్టంగా నాటడం, గాలి ప్రసరణ సరిగా లేకపోవడం వల్ల ఆకు ఉపరితలం ఎక్కువసేపు తడిగా ఉంటుంది.',
        'రోజులో ఆలస్యంగా పైనుండి తడిపే నీటిపారుదల చేయడం వల్ల రాత్రంతా ఆకులు తడిగా ఉంటాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid overhead irrigation in the late afternoon/evening; water early in the day so foliage can dry before nightfall.',
          practice_te: 'మధ్యాహ్నం/సాయంత్రం పైనుండి తడిపే నీటిపారుదల చేయవద్దు; రోజు మొదట్లోనే నీరు పెట్టండి, తద్వారా చీకటి పడేలోపు ఆకులు ఆరిపోతాయి.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Maintain recommended plant spacing and avoid excessive nitrogen, both of which improve air movement through the canopy and reduce leaf wetness duration.',
          practice_te: 'సిఫారసు చేసిన మొక్కల మధ్య దూరం పాటించండి, నత్రజని ఎరువును ఎక్కువగా వేయవద్దు — ఇవి రెండూ ఆకుల మధ్య గాలి ప్రసరణను మెరుగుపరచి తడి ఉండే సమయాన్ని తగ్గిస్తాయి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Remove and destroy heavily infected lower leaves and field debris at the end of the season rather than leaving them to carry the pathogen over.',
          practice_te: 'తీవ్రంగా సోకిన కింది ఆకులను, పంట అవశేషాలను సీజన్ చివర్లో తీసివేసి నాశనం చేయండి — తెగులు తదుపరి సీజన్‌కు మిగలకుండా చూడండి.',
        },
      ],
      treatments: [
        {
          id: 't-okra-dm-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A dilute buttermilk/sour-milk spray or Trichoderma-based foliar application is sometimes used as a general phyllosphere management step against downy-mildew-type pathogens, but no specific product or rate is confirmed for okra from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'బూజు తెగులు వంటి శిలీంద్రాలకు వ్యతిరేకంగా పలుచటి మజ్జిగ/పులిసిన పాల పిచికారీ లేదా ట్రైకోడెర్మా ఆధారిత పిచికారీ కొన్నిసార్లు సాధారణ ఆకు-ఉపరితల నిర్వహణగా వాడతారు, కానీ బెండకు ఖచ్చితమైన ఉత్పత్తి లేదా మోతాదును ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Buttermilk spray / Trichoderma (organic, dose unverified)',
          activeIngredient_te: 'మజ్జిగ పిచికారీ / ట్రైకోడెర్మా (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-okra-dm-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper-based fungicides (e.g. copper oxychloride) or Metalaxyl-Mancozeb combinations are commonly used against downy mildew in vegetable crops generally, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          instruction_te:
            'కూరగాయ పంటల్లో బూజు తెగులుకు సాధారణంగా రాగి ఆధారిత శిలీంద్రనాశకాలు (ఉదా. కాపర్ ఆక్సీక్లోరైడ్) లేదా మెటాలాక్సిల్-మాంకోజెబ్ కలయిక వాడతారు, కానీ బెండకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Copper oxychloride / Metalaxyl-Mancozeb (dose suppressed)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ / మెటాలాక్సిల్-మాంకోజెబ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your VAA/RBK and check your container label before spraying, given okra\'s frequent harvest cycle.',
          regulatoryNotice_te:
            'బెండను తరచుగా కోస్తారు కాబట్టి, పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows downy mildew symptoms despite irrigation and spacing adjustments, consult your VAA/RBK for a tailored spray program.',
      escalationThreshold_te:
        'నీటిపారుదల, మొక్కల దూరం సర్దుబాటు చేసినా పొలంలో 15-20% కంటే ఎక్కువ ఆకు వైశాల్యానికి బూజు తెగులు లక్షణాలు కనిపిస్తే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'ఆల్టర్నేరియా ఆకు మచ్చ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Alternaria spp. (e.g. Alternaria alternata / A. hibisci)',
      pathogenOrVector_te: 'శిలీంద్రం: ఆల్టర్నేరియా జాతులు (ఉదా. ఆల్టర్నేరియా ఆల్టర్నేటా / A. హిబిస్కి)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Circular to irregular brown spots, often with visible concentric rings ("target" or "bullseye" pattern), surrounded by a yellow halo.',
        'Spots are typically larger (up to 1-2 cm) than other okra leaf spots and start on the older, lower leaves first.',
        'In severe cases, spots merge, causing large areas of leaf blight and premature leaf drop, which can also affect pod quality indirectly through reduced plant vigor.',
      ],
      observableSymptoms_te: [
        'గుండ్రని లేదా క్రమరహిత గోధుమ రంగు మచ్చలు, తరచుగా స్పష్టమైన వలయాకారపు గీతలతో ("లక్ష్యం" వంటి నమూనా), చుట్టూ పసుపు వలయంతో కనిపిస్తాయి.',
        'ఇతర బెండ ఆకు మచ్చల కంటే ఈ మచ్చలు సాధారణంగా పెద్దవిగా (1-2 సెం.మీ వరకు) ఉండి, మొదట ముదురు/కింది ఆకులపై కనిపిస్తాయి.',
        'తీవ్రమైన సందర్భాల్లో మచ్చలు కలిసిపోయి పెద్ద ఆకు ఎండు ప్రాంతాలుగా మారి, ఆకులు ముందుగా రాలతాయి; దీనివల్ల మొక్క శక్తి తగ్గి కాయ నాణ్యతపై పరోక్షంగా ప్రభావం పడుతుంది.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-alternaria-vs-cercospora',
          name_en: 'Cercospora Leaf Spot',
          name_te: 'సెర్కోస్పోరా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Alternaria spots are larger, show clear concentric target-like rings, and have a broad yellow halo; Cercospora spots are smaller, more angular/irregular in shape without concentric rings, and have a narrower reddish-brown margin.',
          differentiatingFactors_te:
            'ఆల్టర్నేరియా మచ్చలు పెద్దవిగా, స్పష్టమైన వలయాకారపు "లక్ష్యం" వంటి గీతలతో, విశాలమైన పసుపు వలయంతో ఉంటాయి; సెర్కోస్పోరా మచ్చలు చిన్నవిగా, కోణాకారంగా, వలయాలు లేకుండా, ఇరుకైన ఎరుపు-గోధుమ అంచుతో ఉంటాయి.',
        },
        {
          id: 'okra-alternaria-vs-phyllosticta',
          name_en: 'Phyllosticta Leaf Spot',
          name_te: 'ఫిల్లోస్టిక్టా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Alternaria spots are larger with a target-ring pattern; Phyllosticta spots are small (pinhead to 5mm), with a grayish-white center and a sharp dark-brown margin, often with tiny black dots (pycnidia) visible in the center under close inspection.',
          differentiatingFactors_te:
            'ఆల్టర్నేరియా మచ్చలు పెద్దవిగా, వలయాకారపు నమూనాతో ఉంటాయి; ఫిల్లోస్టిక్టా మచ్చలు చిన్నవిగా (సూది తల నుండి 5 మి.మీ వరకు), బూడిద-తెలుపు కేంద్రంతో, పదునైన ముదురు-గోధుమ అంచుతో ఉండి, దగ్గరగా చూస్తే కేంద్రంలో చిన్న నల్లని బిందువులు (బీజకోశాలు) కనిపించవచ్చు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm temperatures (around 25-30°C) combined with high humidity, rain, or heavy dew.',
        'Plant stress from nutrient deficiency or water stress, which makes foliage more susceptible.',
        'Infected crop debris left in the field between seasons, and continuous okra cultivation without rotation.',
      ],
      environmentalRiskFactors_te: [
        'వెచ్చని ఉష్ణోగ్రత (సుమారు 25-30°C), ఎక్కువ తేమ, వర్షం లేదా భారీ మంచుతో కలిసి ఉండటం.',
        'పోషక లోపం లేదా నీటి ఒత్తిడి వల్ల మొక్క బలహీనపడి ఆకులు ఎక్కువగా తెగులుకు గురవుతాయి.',
        'సీజన్ల మధ్య పొలంలో మిగిలిన తెగులు సోకిన పంట అవశేషాలు, పంట మార్పిడి లేకుండా పదేపదే బెండ వేయడం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain balanced nutrition (avoid both nitrogen excess and deficiency) and consistent irrigation to reduce plant stress.',
          practice_te: 'మొక్క ఒత్తిడిని తగ్గించడానికి సమతుల్య పోషకాలను (నత్రజని ఎక్కువ లేదా తక్కువ కాకుండా) అందించి, స్థిరమైన నీటిపారుదల పాటించండి.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy severely spotted lower leaves and field debris at the end of the season.',
          practice_te: 'తీవ్రంగా మచ్చలు సోకిన కింది ఆకులను, పంట అవశేషాలను సీజన్ చివర్లో తీసి నాశనం చేయండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-Malvaceous crop (not cotton or other okra-family crops) for at least one season where field layout allows.',
          practice_te: 'వీలైతే కనీసం ఒక సీజన్ మాల్వేసి కుటుంబానికి చెందని పంటలతో (పత్తి లేదా ఇతర బెండ కుటుంబ పంటలు కాకుండా) పంట మార్పిడి చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-okra-alt-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride or Pseudomonas fluorescens-based foliar sprays are commonly documented general-purpose biologicals against leaf-spot fungi, but a specific rate for this disease/crop is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'ఆకు మచ్చ శిలీంద్రాలకు వ్యతిరేకంగా ట్రైకోడెర్మా విరిడి లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ ఆధారిత పిచికారీలు సాధారణంగా వాడే జీవ నియంత్రణ పద్ధతులు, కానీ ఈ తెగులు/పంటకు ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (organic, dose unverified)',
          activeIngredient_te: 'ట్రైకోడెర్మా విరిడి / సూడోమోనాస్ ఫ్లోరోసెన్స్ (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-okra-alt-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb or Chlorothalonil foliar sprays are widely documented for Alternaria leaf spot management in vegetable crops, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          instruction_te:
            'కూరగాయ పంటల్లో ఆల్టర్నేరియా ఆకు మచ్చ తెగులుకు మాంకోజెబ్ లేదా క్లోరోథలోనిల్ పిచికారీలు విస్తృతంగా వాడతారు, కానీ బెండకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Mancozeb / Chlorothalonil (dose suppressed)',
          activeIngredient_te: 'మాంకోజెబ్ / క్లోరోథలోనిల్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your VAA/RBK and check your container label before spraying, given okra\'s frequent harvest cycle.',
          regulatoryNotice_te:
            'బెండను తరచుగా కోస్తారు కాబట్టి, పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows spotting or blighting despite nutrition and sanitation steps, consult your VAA/RBK for a tailored spray program.',
      escalationThreshold_te:
        'పోషక, పరిశుభ్రత చర్యలు తీసుకున్నా పొలంలో 15-20% కంటే ఎక్కువ ఆకు వైశాల్యానికి మచ్చలు లేదా ఎండు తెగులు కనిపిస్తే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'సెర్కోస్పోరా ఆకు మచ్చ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Cercospora spp. (e.g. Cercospora abelmoschi / C. malayensis)',
      pathogenOrVector_te: 'శిలీంద్రం: సెర్కోస్పోరా జాతులు (ఉదా. సెర్కోస్పోరా అబెల్మోష్కి / C. మలేయెన్సిస్)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small to medium, roughly circular to angular grayish-brown spots on both leaf surfaces, often bound by the leaf veins.',
        'Spots have a distinct reddish-brown to purplish margin and a dry, slightly grainy-looking center, without the concentric rings seen in Alternaria spot.',
        'Heavily spotted leaves yellow and drop prematurely, reducing plant vigor and pod set over time.',
      ],
      observableSymptoms_te: [
        'ఆకు రెండు ఉపరితలాలపై చిన్న నుండి మధ్యస్థ, గుండ్రని లేదా కోణాకార బూడిద-గోధుమ రంగు మచ్చలు కనిపిస్తాయి; తరచుగా ఈనెలతో ఆగి ఉంటాయి.',
        'మచ్చలకు స్పష్టమైన ఎరుపు-గోధుమ నుండి ఊదా రంగు అంచు, పొడిగా, కొద్దిగా కణిక రూపంలో కేంద్రం ఉంటుంది; ఆల్టర్నేరియా మచ్చలో కనిపించే వలయాలు ఉండవు.',
        'ఎక్కువగా మచ్చలు సోకిన ఆకులు పసుపు రంగులోకి మారి ముందుగా రాలతాయి; కాలక్రమేణా మొక్క శక్తి, కాయ కాపు తగ్గుతుంది.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-cercospora-vs-alternaria',
          name_en: 'Alternaria Leaf Spot',
          name_te: 'ఆల్టర్నేరియా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Cercospora spots are smaller and angular with a narrow reddish-brown margin and no rings; Alternaria spots are larger, rounder, and show visible concentric target-like rings with a broad yellow halo.',
          differentiatingFactors_te:
            'సెర్కోస్పోరా మచ్చలు చిన్నవిగా, కోణాకారంగా, ఇరుకైన ఎరుపు-గోధుమ అంచుతో, వలయాలు లేకుండా ఉంటాయి; ఆల్టర్నేరియా మచ్చలు పెద్దవిగా, గుండ్రంగా, స్పష్టమైన వలయాకారపు నమూనాతో, విశాలమైన పసుపు వలయంతో ఉంటాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid weather with frequent rain or dew, similar to other okra leaf-spot fungi.',
        'Dense canopy with poor air circulation.',
        'Infected crop debris carried over between seasons on the same field.',
      ],
      environmentalRiskFactors_te: [
        'తరచుగా వర్షం లేదా మంచుతో వెచ్చని, తేమతో కూడిన వాతావరణం — ఇతర బెండ ఆకు మచ్చ శిలీంద్రాల మాదిరిగానే.',
        'దట్టమైన ఆకుల పందిరి, సరైన గాలి ప్రసరణ లేకపోవడం.',
        'అదే పొలంలో సీజన్ల మధ్య మిగిలిన తెగులు సోకిన పంట అవశేషాలు.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing for good air circulation, and avoid overhead irrigation late in the day.',
          practice_te: 'మంచి గాలి ప్రసరణ కోసం సిఫారసు చేసిన మొక్కల దూరం పాటించండి; రోజులో ఆలస్యంగా పైనుండి తడిపే నీటిపారుదల చేయవద్దు.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily spotted leaves and field debris at the end of the season.',
          practice_te: 'ఎక్కువగా మచ్చలు సోకిన ఆకులను, పంట అవశేషాలను సీజన్ చివర్లో తీసి నాశనం చేయండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Rotate with a non-Malvaceous crop for at least one season where field layout allows.',
          practice_te: 'వీలైతే కనీసం ఒక సీజన్ మాల్వేసి కుటుంబానికి చెందని పంటలతో పంట మార్పిడి చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-okra-cls-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Trichoderma viride or Pseudomonas fluorescens-based foliar sprays are commonly documented general-purpose biologicals against leaf-spot fungi, but a specific rate for this disease/crop is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'ఆకు మచ్చ శిలీంద్రాలకు వ్యతిరేకంగా ట్రైకోడెర్మా విరిడి లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ ఆధారిత పిచికారీలు సాధారణంగా వాడే జీవ నియంత్రణ పద్ధతులు, కానీ ఈ తెగులు/పంటకు ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (organic, dose unverified)',
          activeIngredient_te: 'ట్రైకోడెర్మా విరిడి / సూడోమోనాస్ ఫ్లోరోసెన్స్ (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-okra-cls-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Mancozeb-based foliar sprays are widely documented for Cercospora leaf spot management in vegetable crops, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          instruction_te:
            'కూరగాయ పంటల్లో సెర్కోస్పోరా ఆకు మచ్చ తెగులుకు మాంకోజెబ్ ఆధారిత పిచికారీలు విస్తృతంగా వాడతారు, కానీ బెండకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Mancozeb (dose suppressed)',
          activeIngredient_te: 'మాంకోజెబ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your VAA/RBK and check your container label before spraying, given okra\'s frequent harvest cycle.',
          regulatoryNotice_te:
            'బెండను తరచుగా కోస్తారు కాబట్టి, పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than about 15-20% of leaf area across the field shows spotting despite spacing and sanitation steps, consult your VAA/RBK for a tailored spray program.',
      escalationThreshold_te:
        'దూరం, పరిశుభ్రత చర్యలు తీసుకున్నా పొలంలో 15-20% కంటే ఎక్కువ ఆకు వైశాల్యానికి మచ్చలు కనిపిస్తే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'ఫిల్లోస్టిక్టా ఆకు మచ్చ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phyllosticta spp.',
      pathogenOrVector_te: 'శిలీంద్రం: ఫిల్లోస్టిక్టా జాతులు',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small (pinhead to about 5mm) circular spots with a pale grayish-white center and a sharply defined dark brown margin.',
        'Under close inspection, tiny black dots (pycnidia, the fungus\'s fruiting bodies) are often visible scattered within the pale center of older spots.',
        'Usually causes scattered, relatively mild leaf spotting rather than the large blighted patches seen with Alternaria or heavy Cercospora infection.',
      ],
      observableSymptoms_te: [
        'సూది తల నుండి సుమారు 5 మి.మీ వరకు ఉండే చిన్న గుండ్రని మచ్చలు, లేత బూడిద-తెలుపు కేంద్రం, పదునైన ముదురు గోధుమ అంచుతో కనిపిస్తాయి.',
        'దగ్గరగా చూస్తే, ముదిరిన మచ్చల లేత కేంద్రంలో చిన్న నల్లని బిందువులు (బీజకోశాలు) చెల్లాచెదురుగా కనిపించవచ్చు.',
        'సాధారణంగా ఆల్టర్నేరియా లేదా తీవ్రమైన సెర్కోస్పోరా తెగులులో కనిపించే పెద్ద ఎండు ప్రాంతాల కంటే చెదురుమదురుగా, తేలికపాటి ఆకు మచ్చలను మాత్రమే కలిగిస్తుంది.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'okra-phyllosticta-vs-alternaria',
          name_en: 'Alternaria Leaf Spot',
          name_te: 'ఆల్టర్నేరియా ఆకు మచ్చ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Phyllosticta spots are small, pale-centered with tiny visible black pycnidia and a sharp dark margin; Alternaria spots are larger, with visible concentric target-rings and a broad yellow halo, and no pycnidia.',
          differentiatingFactors_te:
            'ఫిల్లోస్టిక్టా మచ్చలు చిన్నవిగా, లేత కేంద్రంతో, చిన్న నల్లని బీజకోశాలు కనిపించేలా, పదునైన ముదురు అంచుతో ఉంటాయి; ఆల్టర్నేరియా మచ్చలు పెద్దవిగా, స్పష్టమైన వలయాకారపు నమూనాతో, విశాలమైన పసుపు వలయంతో ఉండి, బీజకోశాలు ఉండవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, humid conditions with frequent rain or heavy dew, similar to other okra leaf-spot fungi.',
        'Older, more mature leaves tend to show lesions first.',
        'Infected crop debris carried over between seasons on the same field.',
      ],
      environmentalRiskFactors_te: [
        'తరచుగా వర్షం లేదా భారీ మంచుతో వెచ్చని, తేమతో కూడిన వాతావరణం — ఇతర బెండ ఆకు మచ్చ శిలీంద్రాల మాదిరిగానే.',
        'ముదురు, పెద్ద ఆకులపై మచ్చలు ముందుగా కనిపిస్తాయి.',
        'అదే పొలంలో సీజన్ల మధ్య మిగిలిన తెగులు సోకిన పంట అవశేషాలు.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Maintain recommended plant spacing for good air circulation and avoid overhead irrigation late in the day.',
          practice_te: 'మంచి గాలి ప్రసరణ కోసం సిఫారసు చేసిన మొక్కల దూరం పాటించండి; రోజులో ఆలస్యంగా పైనుండి తడిపే నీటిపారుదల చేయవద్దు.',
          targetTiming: 'Throughout the growing season',
        },
        {
          stepNumber: 2,
          practice_en: 'Remove and destroy heavily spotted older leaves and field debris at the end of the season.',
          practice_te: 'ఎక్కువగా మచ్చలు సోకిన ముదురు ఆకులను, పంట అవశేషాలను సీజన్ చివర్లో తీసి నాశనం చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-okra-pls-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Because this spot is usually mild and scattered, sanitation (removing affected leaves/debris) is often sufficient on its own; a Trichoderma viride or Pseudomonas fluorescens-based spray is sometimes added as a general preventive step, but a specific rate is not confirmed from a primary source this session — confirm with your VAA/RBK if you choose to spray.',
          instruction_te:
            'ఈ మచ్చ సాధారణంగా తేలికగా, చెదురుమదురుగా ఉంటుంది కాబట్టి పరిశుభ్రత (సోకిన ఆకులు/అవశేషాలు తీసివేయడం) సాధారణంగా సరిపోతుంది; సాధారణ నివారణ చర్యగా కొన్నిసార్లు ట్రైకోడెర్మా విరిడి లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ పిచికారీ కూడా జోడిస్తారు, కానీ ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — పిచికారీ చేయదలిస్తే VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Trichoderma viride / Pseudomonas fluorescens (optional, dose unverified)',
          activeIngredient_te: 'ట్రైకోడెర్మా విరిడి / సూడోమోనాస్ ఫ్లోరోసెన్స్ (ఐచ్ఛికం, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-okra-pls-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A Mancozeb spray is sometimes used if spotting becomes widespread, but a specific dose for okra is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop, and spraying is rarely needed for this particular spot unless it is unusually severe. Do not spray from memory.',
          instruction_te:
            'మచ్చలు విస్తృతంగా వ్యాపిస్తే కొన్నిసార్లు మాంకోజెబ్ పిచికారీ వాడతారు, కానీ బెండకు మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది, అసాధారణంగా తీవ్రంగా ఉంటే తప్ప ఈ మచ్చకు పిచికారీ అరుదుగానే అవసరం. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Mancozeb (dose suppressed)',
          activeIngredient_te: 'మాంకోజెబ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and the current pre-harvest interval with your VAA/RBK and check your container label before spraying, given okra\'s frequent harvest cycle.',
          regulatoryNotice_te:
            'బెండను తరచుగా కోస్తారు కాబట్టి, పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'This spot is usually mild; if it nonetheless spreads to more than about 20% of leaf area or appears alongside other leaf spots making field diagnosis difficult, consult your VAA/RBK.',
      escalationThreshold_te:
        'ఈ మచ్చ సాధారణంగా తేలికపాటిదే; అయినా 20% కంటే ఎక్కువ ఆకు వైశాల్యానికి వ్యాపించినా, లేదా ఇతర ఆకు మచ్చలతో కలిసి గుర్తించడం కష్టంగా ఉన్నా, VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'సిట్రస్ గ్రీనింగ్ (హువాంగ్లాంగ్‌బింగ్ / HLB)',
      conditionCategory: 'disease',
      pathogenOrVector_en:
        'Bacterium: Candidatus Liberibacter asiaticus (most common form in Asia), transmitted by the Asian citrus psyllid, Diaphorina citri',
      pathogenOrVector_te:
        'బ్యాక్టీరియా: కాండిడేటస్ లైబెరిబాక్టర్ ఆసియాటికస్ (ఆసియాలో సాధారణంగా కనిపించే రూపం), ఆసియన్ సిట్రస్ సైల్లిడ్ (డయాఫొరినా సిట్రి) ద్వారా వ్యాపిస్తుంది',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Blotchy, asymmetric yellow mottling on leaves — the pattern does NOT mirror across the midrib/leaf center, unlike most nutrient deficiencies.',
        'Yellowing often appears sector-by-sector on the tree (one or a few branches affected while others look normal), sometimes called "yellow shoot" symptoms.',
        'Fruit from infected branches are small, lopsided/asymmetric, stay partly green at the bottom even when ripe, taste bitter or salty, and often contain dark, aborted seeds; premature fruit drop and twig dieback follow over time.',
      ],
      observableSymptoms_te: [
        'ఆకులపై అసమాన పసుపు మచ్చలు (బ్లాచీ మొటిల్) కనిపిస్తాయి — చాలా పోషక లోపాల మాదిరిగా ఈ నమూనా ఆకు మధ్య ఈనెకు ఇరువైపులా సమానంగా ఉండదు.',
        'చెట్టుపై కొన్ని కొమ్మలు మాత్రమే పసుపు రంగులోకి మారి, మిగతా కొమ్మలు సాధారణంగా కనిపించడం ("పసుపు చిగురు" లక్షణాలు) తరచుగా కనిపిస్తుంది.',
        'సోకిన కొమ్మల కాయలు చిన్నవిగా, అసమానంగా, పండినా కింది భాగం ఆకుపచ్చగానే ఉండి, చేదు లేదా ఉప్పు రుచిగా ఉండి, లోపల ముదురు రంగు, ఎదగని గింజలు కలిగి ఉంటాయి; కాలక్రమేణా కాయలు ముందుగా రాలి, కొమ్మలు ఎండిపోతాయి.',
      ],
      affectedParts: ['Leaves', 'Shoots', 'Fruits', 'Whole Tree'],
      similarConditions: [
        {
          id: 'citrus-greening-vs-nutrient',
          name_en: 'Zinc / Manganese Deficiency',
          name_te: 'జింక్ / మాంగనీస్ లోపం',
          isPathological: false,
          differentiatingFactors_en:
            'Nutrient-deficiency mottling is usually symmetric on both sides of the leaf midrib and affects most leaves evenly across the tree; HLB mottling is blotchy and asymmetric (does not mirror across the midrib) and typically appears on only some branches/sectors of the tree while others stay green.',
          differentiatingFactors_te:
            'పోషక లోప మచ్చలు సాధారణంగా ఆకు మధ్య ఈనెకు ఇరువైపులా సమానంగా ఉండి, చెట్టు మొత్తం ఆకులపై సమానంగా కనిపిస్తాయి; HLB మచ్చలు అసమానంగా ఉండి, సాధారణంగా చెట్టులోని కొన్ని కొమ్మలు/భాగాలలో మాత్రమే కనిపిస్తాయి, మిగతా భాగాలు పచ్చగానే ఉంటాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'High Asian citrus psyllid (Diaphorina citri) populations nearby, especially on new flush growth where the psyllid prefers to feed and breed.',
        'Infected nursery plants or budwood brought in from an affected area.',
        'Neighboring infected trees or abandoned/untended citrus groves acting as a disease reservoir with no vector management.',
      ],
      environmentalRiskFactors_te: [
        'దగ్గరలో ఆసియన్ సిట్రస్ సైల్లిడ్ (డయాఫొరినా సిట్రి) సంఖ్య ఎక్కువగా ఉండటం, ముఖ్యంగా ఈ పురుగు ఇష్టపడే కొత్త చిగురుపై.',
        'తెగులు సోకిన ప్రాంతం నుండి తెచ్చిన నారు మొక్కలు లేదా అంటు కణజాలం.',
        'దగ్గరలో తెగులు సోకిన చెట్లు లేదా నిర్వహణ లేని సిట్రస్ తోటలు — వాహక నియంత్రణ లేకుండా తెగులుకు మూలంగా పనిచేస్తాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en:
            'Use only certified disease-free nursery plants and budwood from a known, inspected source — never propagate from an unknown or symptomatic tree. There is no cure once a tree is infected, so keeping the disease out is the only real control.',
          practice_te:
            'ధృవీకరించిన, తెగులు లేని నారుమడి మొక్కలు, అంటు కణజాలాన్ని మాత్రమే తెలిసిన, తనిఖీ చేసిన మూలం నుండి వాడండి — తెలియని లేదా లక్షణాలు కనిపించే చెట్టు నుండి అంటు కట్టవద్దు. ఒకసారి తెగులు సోకితే నయం చేయలేము కాబట్టి, తెగులును దూరంగా ఉంచడమే నిజమైన నియంత్రణ.',
          targetTiming: 'At planting / before bringing in new material',
        },
        {
          stepNumber: 2,
          practice_en:
            'Monitor new flush growth regularly for the Asian citrus psyllid and manage its population through the season — the vector, not the bacterium itself, is what can realistically be targeted in the field.',
          practice_te:
            'కొత్త చిగురు కోసం ఆసియన్ సిట్రస్ సైల్లిడ్‌ను క్రమం తప్పకుండా పరిశీలించి, సీజన్ అంతా దాని సంఖ్యను అదుపులో ఉంచండి — బ్యాక్టీరియాను కాదు, వాహకాన్నే పొలంలో నిజంగా లక్ష్యంగా చేసుకోగలరు.',
          targetTiming: 'Throughout the year, especially during flush periods',
        },
        {
          stepNumber: 3,
          practice_en:
            'Rogue out (uproot and destroy) a confirmed HLB-positive tree promptly — a single infected tree is a continuing source of infection for the whole grove through the psyllid vector.',
          practice_te:
            'HLB తెగులు నిర్ధారణ అయిన చెట్టును వెంటనే పీకి నాశనం చేయండి — ఒక్క సోకిన చెట్టు కూడా సైల్లిడ్ వాహకం ద్వారా మొత్తం తోటకు తెగులు మూలంగా ఉంటుంది.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-hlb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'There is no organic or chemical cure for a tree already infected with HLB. Neem-oil-based sprays are sometimes used to suppress Asian citrus psyllid populations on healthy trees nearby, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'ఇప్పటికే HLB సోకిన చెట్టుకు సేంద్రియమైనా, రసాయనమైనా ఏ చికిత్స లేదు. దగ్గరలోని ఆరోగ్యకరమైన చెట్లపై ఆసియన్ సిట్రస్ సైల్లిడ్ సంఖ్యను తగ్గించడానికి కొన్నిసార్లు వేప నూనె పిచికారీ వాడతారు, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Neem oil (organic, vector suppression only, dose unverified)',
          activeIngredient_te: 'వేప నూనె (సేంద్రియ, వాహక నియంత్రణ మాత్రమే, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'No spray reverses HLB infection inside an already-affected tree — every treatment here only protects neighboring healthy trees by targeting the psyllid vector.',
          safetyCaution_te: 'ఇప్పటికే సోకిన చెట్టులో HLB తెగులును ఏ పిచికారీ మందు తిప్పికొట్టదు — ఇక్కడి చికిత్సలన్నీ సైల్లిడ్ వాహకాన్ని లక్ష్యంగా చేసుకుని పక్కనున్న ఆరోగ్యకరమైన చెట్లను మాత్రమే కాపాడతాయి.',
        },
        {
          id: 't-citrus-hlb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Imidacloprid or Thiamethoxam are commonly used in area-wide Asian citrus psyllid management programs, but a specific dose for this crop/region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and report any suspected HLB-positive tree to your VAA/RBK/Horticulture Officer, since this is treated as a serious quarantine-relevant disease.',
          instruction_te:
            'ప్రాంతవ్యాప్త ఆసియన్ సిట్రస్ సైల్లిడ్ నిర్వహణ కార్యక్రమాలలో ఇమిడాక్లోప్రిడ్ లేదా థయామిథాక్సామ్ వంటి సిస్టమిక్ పురుగుమందులు సాధారణంగా వాడతారు, కానీ ఈ పంట/ప్రాంతానికి మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు; HLB అనుమానం ఉన్న ఏ చెట్టునైనా మీ VAA/RBK/హార్టికల్చర్ అధికారికి తెలియజేయండి — ఇది తీవ్రమైన నిర్బంధిత తెగులుగా పరిగణించబడుతుంది.',
          activeIngredient_en: 'Imidacloprid / Thiamethoxam (vector control, dose suppressed)',
          activeIngredient_te: 'ఇమిడాక్లోప్రిడ్ / థయామిథాక్సామ్ (వాహక నియంత్రణ, మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK/Horticulture Officer and check your container label before spraying. Area-wide, coordinated vector control across neighboring groves is far more effective than one farmer spraying alone.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK/హార్టికల్చర్ అధికారి వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి. ఒక్క రైతు మాత్రమే పిచికారీ చేయడం కంటే పరిసర తోటలన్నింటిలో సమన్వయంతో వాహక నియంత్రణ చేయడం చాలా ఎక్కువ ప్రభావవంతంగా ఉంటుంది.',
        },
      ],
      escalationThreshold_en:
        'Report any tree with suspected HLB symptoms (asymmetric blotchy mottle, lopsided bitter fruit) to your VAA/RBK or Horticulture Officer promptly, even before you are fully sure — this disease is incurable per-tree and spreads through the grove via the psyllid vector, so early reporting and removal of confirmed cases matters far more than waiting to confirm severity.',
      escalationThreshold_te:
        'HLB అనుమానం ఉన్న ఏ చెట్టునైనా (అసమాన పసుపు మచ్చలు, అసమాన చేదు కాయలు) పూర్తి నిర్ధారణకు ముందే మీ VAA/RBK లేదా హార్టికల్చర్ అధికారికి వెంటనే తెలియజేయండి — ఈ తెగులు చెట్టుకు నయం కాదు, సైల్లిడ్ వాహకం ద్వారా తోట అంతటికీ వ్యాపిస్తుంది కాబట్టి, తీవ్రతను నిర్ధారించుకునే వరకు వేచి ఉండటం కంటే ముందుగా తెలియజేసి నిర్ధారణ అయిన చెట్లను తొలగించడం చాలా ముఖ్యం.',
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
      name_te: 'సిట్రస్ కాంకర్ (పుండు తెగులు)',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas citri subsp. citri',
      pathogenOrVector_te: 'బ్యాక్టీరియా: జాంథోమోనాస్ సిట్రి ఉపజాతి సిట్రి',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Raised, corky, crater-like ("volcano-shaped") lesions on leaves, twigs, and fruit, each typically surrounded by a yellow, water-soaked-looking halo (ring) — most visible on young, actively growing tissue.',
        'Lesions often cluster along leaf margins and areas prone to wind/thorn injury, where the bacteria enter through wounds or natural openings.',
        'Severe infection causes leaf and fruit drop, twig dieback, and heavily blemished fruit that is rejected for the fresh market even when the inner fruit is unaffected.',
      ],
      observableSymptoms_te: [
        'ఆకులు, కొమ్మలు, కాయలపై పైకి లేచిన, గట్టిగా, బిలం వంటి ("అగ్నిపర్వతం" ఆకారంలో) మచ్చలు కనిపిస్తాయి; ప్రతి మచ్చ చుట్టూ పసుపు, నీటిలో నానినట్లు కనిపించే వలయం ఉంటుంది — లేత, చురుగ్గా పెరుగుతున్న భాగాలపై బాగా కనిపిస్తుంది.',
        'గాలి/ముళ్ల గాయాలు ఎక్కువగా జరిగే ఆకు అంచుల వద్ద, ప్రాంతాలలో మచ్చలు గుంపులుగా కనిపిస్తాయి — ఇక్కడ బ్యాక్టీరియా గాయాలు లేదా సహజ రంధ్రాల ద్వారా ప్రవేశిస్తుంది.',
        'తీవ్రమైన తెగులు వల్ల ఆకులు, కాయలు రాలడం, కొమ్మలు ఎండిపోవడం జరుగుతుంది; లోపలి కాయ బాగానే ఉన్నా, మచ్చలు ఎక్కువగా ఉన్న కాయలను తాజా మార్కెట్‌కు తిరస్కరిస్తారు.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-canker-vs-scab',
          name_en: 'Citrus Scab',
          name_te: 'సిట్రస్ గజ్జి తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Canker lesions are flatter craters with a distinct yellow water-soaked halo around each spot; scab lesions are more pointed, wart-like, corky outgrowths without that yellow halo, mainly on very young flush tissue.',
          differentiatingFactors_te:
            'కాంకర్ మచ్చలు చదునైన బిలం ఆకారంలో ఉండి, ప్రతి మచ్చ చుట్టూ స్పష్టమైన పసుపు, నీటిలో నానినట్లు కనిపించే వలయం ఉంటుంది; గజ్జి మచ్చలు మొనదేలిన, మొటిమల వంటి, గట్టి పెరుగుదలలుగా ఉండి ఆ పసుపు వలయం ఉండదు, ఎక్కువగా చాలా లేత చిగురుపై కనిపిస్తాయి.',
        },
        {
          id: 'citrus-canker-vs-melanose',
          name_en: 'Melanose',
          name_te: 'మెలనోజ్ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Canker lesions are larger, crater-like, with a yellow halo and often cause leaf/fruit drop; melanose lesions are small, raised, sandpaper-textured brown pustules without a yellow halo, sometimes forming tear-streak patterns on fruit.',
          differentiatingFactors_te:
            'కాంకర్ మచ్చలు పెద్దవిగా, బిలం ఆకారంలో, పసుపు వలయంతో ఉండి తరచుగా ఆకులు/కాయలు రాలడానికి కారణమవుతాయి; మెలనోజ్ మచ్చలు చిన్నవిగా, పైకి లేచిన, ఇసుక కాగితం వంటి ఆకృతి గల గోధుమ రంగు మొటిమలుగా ఉండి పసుపు వలయం ఉండదు, కాయలపై కన్నీటి చారల వంటి నమూనా కొన్నిసార్లు ఏర్పడుతుంది.',
        },
      ],
      environmentalRiskFactors_en: [
        'Wind-driven rain, which spreads the bacteria over distance and forces it into leaf stomata and wounds — canker typically spreads fastest after storms.',
        'Any leaf/fruit injury: thorn scratches, leaf-miner tunnels, hail damage, or pruning wounds, all of which give the bacterium an easy entry point.',
        'Working in a grove or handling tools/equipment while foliage is wet, which can spread bacteria-laden moisture between trees.',
      ],
      environmentalRiskFactors_te: [
        'గాలితో కూడిన వర్షం బ్యాక్టీరియాను దూరం వరకు వ్యాపింపజేసి, ఆకు రంధ్రాలు, గాయాల్లోకి బలవంతంగా చేరుస్తుంది — తుఫానుల తర్వాత కాంకర్ వేగంగా వ్యాపిస్తుంది.',
        'ఏదైనా ఆకు/కాయ గాయం: ముళ్ల గీతలు, లీఫ్-మైనర్ సొరంగాలు, వడగళ్ల నష్టం, లేదా కత్తిరింపు గాయాలు — ఇవన్నీ బ్యాక్టీరియాకు సులభమైన ప్రవేశ మార్గాన్ని ఇస్తాయి.',
        'ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనిచేయడం లేదా పనిముట్లు వాడటం వల్ల బ్యాక్టీరియాతో కూడిన తేమ చెట్ల మధ్య వ్యాపించవచ్చు.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Plant windbreaks around the grove to reduce wind-driven rain and leaf injury, which are the main way this bacterium spreads and enters new tissue.',
          practice_te: 'గాలితో కూడిన వర్షం, ఆకు గాయాలను తగ్గించడానికి తోట చుట్టూ గాలి అడ్డంకులను (విండ్‌బ్రేక్) పెంచండి — ఇవే ఈ బ్యాక్టీరియా వ్యాపించడానికి, కొత్త కణజాలంలోకి ప్రవేశించడానికి ప్రధాన మార్గం.',
          targetTiming: 'At grove establishment, or retrofit with fast-growing hedges',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid working in the grove or pruning while foliage is wet, and disinfect pruning tools between trees to avoid spreading bacteria mechanically.',
          practice_te: 'ఆకులు తడిగా ఉన్నప్పుడు తోటలో పనిచేయడం, కత్తిరించడం మానండి; యాంత్రికంగా బ్యాక్టీరియా వ్యాపించకుండా చెట్ల మధ్య కత్తిరింపు పరికరాలను శుభ్రం చేసుకోండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Prune and destroy severely infected twigs and control leaf-miner insects, since their tunnels are a common entry wound for this bacterium.',
          practice_te: 'తీవ్రంగా సోకిన కొమ్మలను కత్తిరించి నాశనం చేయండి; లీఫ్-మైనర్ పురుగులను అదుపులో ఉంచండి — వాటి సొరంగాలు ఈ బ్యాక్టీరియాకు సాధారణ ప్రవేశ గాయం.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-canker-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Copper-based sprays (e.g. copper oxychloride, copper hydroxide) are the standard field approach against citrus canker and are accepted in both organic and conventional programs, but a specific concentration/schedule for this region is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'సిట్రస్ కాంకర్‌కు రాగి ఆధారిత పిచికారీలు (ఉదా. కాపర్ ఆక్సీక్లోరైడ్, కాపర్ హైడ్రాక్సైడ్) ప్రామాణిక పొలం పద్ధతి, సేంద్రియ, సంప్రదాయ పద్ధతుల్లో రెండింటిలోనూ ఆమోదయోగ్యం, కానీ ఈ ప్రాంతానికి ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride / Copper hydroxide (dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ / కాపర్ హైడ్రాక్సైడ్ (మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Copper sprays protect new growth from fresh infection but do not cure tissue already bearing canker lesions — sanitation (removing infected twigs) is still needed alongside spraying.',
          safetyCaution_te: 'రాగి పిచికారీలు కొత్త పెరుగుదలను కొత్త తెగులు నుండి కాపాడతాయి కానీ ఇప్పటికే కాంకర్ మచ్చలున్న కణజాలాన్ని నయం చేయవు — పిచికారీతో పాటు పరిశుభ్రత (సోకిన కొమ్మలు తీసివేయడం) కూడా అవసరం.',
        },
        {
          id: 't-citrus-canker-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Streptocycline (a streptomycin-based bactericide) combined with copper spray is sometimes used against severe bacterial outbreaks in citrus, but a specific dose for this crop/region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          instruction_te:
            'తీవ్రమైన బ్యాక్టీరియా వ్యాప్తికి వ్యతిరేకంగా సిట్రస్‌లో కొన్నిసార్లు స్ట్రెప్టోసైక్లిన్ (స్ట్రెప్టోమైసిన్ ఆధారిత బాక్టీరిసైడ్)ను రాగి పిచికారీతో కలిపి వాడతారు, కానీ ఈ పంట/ప్రాంతానికి మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Streptocycline + Copper oxychloride (dose suppressed)',
          activeIngredient_te: 'స్ట్రెప్టోసైక్లిన్ + కాపర్ ఆక్సీక్లోరైడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying. Citrus canker is treated as a quarantine-relevant disease in several states — report a serious outbreak to your Horticulture Officer.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి. సిట్రస్ కాంకర్‌ను అనేక రాష్ట్రాల్లో నిర్బంధిత తెగులుగా పరిగణిస్తారు — తీవ్రమైన వ్యాప్తిని మీ హార్టికల్చర్ అధికారికి తెలియజేయండి.',
        },
      ],
      escalationThreshold_en:
        'If canker affects more than about 15-20% of leaf/fruit surface across the grove despite windbreaks and sanitation, or spreads rapidly after a storm, consult your VAA/RBK/Horticulture Officer for a tailored spray program.',
      escalationThreshold_te:
        'గాలి అడ్డంకులు, పరిశుభ్రత చర్యలు తీసుకున్నా తోటలో 15-20% కంటే ఎక్కువ ఆకు/కాయ ఉపరితలానికి కాంకర్ సోకినా, లేదా తుఫాను తర్వాత వేగంగా వ్యాపిస్తే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK/హార్టికల్చర్ అధికారిని సంప్రదించండి.',
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
      name_te: 'సిట్రస్ నల్ల మచ్చ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Phyllosticta citricarpa (sexual stage: Guignardia citricarpa)',
      pathogenOrVector_te: 'శిలీంద్రం: ఫిల్లోస్టిక్టా సిట్రికార్పా (లైంగిక దశ: గిగ్నార్డియా సిట్రికార్పా)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        '"Hard spot" on mature fruit: small, circular lesions with a grey-brown necrotic center and a dark margin, often with tiny black dots (pycnidia) visible in the center.',
        '"Virulent/false melanose spot" on still-green fruit: irregular, spreading dark lesions that can cover a larger area of the rind.',
        'Mainly a cosmetic/fruit-quality disease — causes little leaf damage, but spotted fruit are downgraded or rejected for the fresh market even though the inner fruit is usually unaffected.',
      ],
      observableSymptoms_te: [
        'పండిన కాయలపై "గట్టి మచ్చ": చిన్న, గుండ్రని మచ్చలు, బూడిద-గోధుమ రంగు చనిపోయిన కేంద్రం, ముదురు అంచుతో కనిపిస్తాయి; తరచుగా కేంద్రంలో చిన్న నల్లని బిందువులు (బీజకోశాలు) కనిపిస్తాయి.',
        'ఇంకా ఆకుపచ్చగా ఉన్న కాయలపై "తీవ్ర/తప్పుడు మెలనోజ్ మచ్చ": క్రమరహిత, వ్యాపించే ముదురు మచ్చలు కాయ తొక్కపై పెద్ద ప్రాంతాన్ని కప్పేయవచ్చు.',
        'ఇది ఎక్కువగా కాయ రూపం/నాణ్యతకు సంబంధించిన తెగులు — ఆకులకు పెద్దగా నష్టం కలిగించదు, కానీ మచ్చలున్న కాయలను తాజా మార్కెట్‌లో తక్కువ ధరకు అమ్మాల్సి వస్తుంది లేదా తిరస్కరిస్తారు, లోపలి కాయ సాధారణంగా బాగానే ఉంటుంది.',
      ],
      affectedParts: ['Fruits', 'Leaves (less commonly)'],
      similarConditions: [
        {
          id: 'citrus-blackspot-vs-melanose',
          name_en: 'Melanose',
          name_te: 'మెలనోజ్ తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Black spot lesions are flat to slightly sunken with a distinct dark margin and visible black pycnidial dots in a grey center; melanose lesions are raised, sandpaper-textured brown pustules, often in tear-streak patterns from rain runoff, without the sunken grey-centered look.',
          differentiatingFactors_te:
            'నల్ల మచ్చ గాయాలు చదునుగా లేదా కొద్దిగా లోతుగా ఉండి, స్పష్టమైన ముదురు అంచు, బూడిద కేంద్రంలో కనిపించే నల్లని బీజకోశపు బిందువులతో ఉంటాయి; మెలనోజ్ గాయాలు పైకి లేచి, ఇసుక కాగితం వంటి ఆకృతి గల గోధుమ రంగు మొటిమలుగా, తరచుగా వర్షపు నీటి ప్రవాహం వల్ల కన్నీటి చారల నమూనాలో ఉండి, లోతైన బూడిద కేంద్రం ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Warm, wet weather during fruit development, which favors spore release and infection.',
        'Fallen leaves and fruit left on the orchard floor, where the fungus overwinters and produces the next season\'s spores.',
        'Dense canopy with poor air circulation, which keeps fruit and leaf surfaces wet longer.',
      ],
      environmentalRiskFactors_te: [
        'కాయ పెరిగే దశలో వెచ్చని, తడి వాతావరణం బీజాలు విడుదల కావడానికి, తెగులు సోకడానికి అనుకూలంగా ఉంటుంది.',
        'తోట నేలపై పడి ఉన్న ఆకులు, కాయలు — ఇక్కడ శిలీంద్రం శీతాకాలం గడిపి తదుపరి సీజన్‌కు బీజాలను ఉత్పత్తి చేస్తుంది.',
        'దట్టమైన ఆకుల పందిరి, సరైన గాలి ప్రసరణ లేకపోవడం వల్ల కాయ, ఆకు ఉపరితలాలు ఎక్కువసేపు తడిగా ఉంటాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Collect and remove fallen leaves and fruit from the orchard floor regularly, since this is the fungus\'s main overwintering source.',
          practice_te: 'తోట నేలపై పడిన ఆకులు, కాయలను క్రమం తప్పకుండా సేకరించి తీసివేయండి — ఇదే శిలీంద్రం శీతాకాలం గడిపే ప్రధాన మూలం.',
          targetTiming: 'Throughout season, especially post-harvest',
        },
        {
          stepNumber: 2,
          practice_en: 'Prune to open up the canopy for better air circulation and light penetration, reducing how long fruit surfaces stay wet.',
          practice_te: 'మంచి గాలి ప్రసరణ, వెలుతురు కోసం ఆకుల పందిరిని తెరుచుకునేలా కత్తిరించండి — దీనివల్ల కాయ ఉపరితలాలు తడిగా ఉండే సమయం తగ్గుతుంది.',
        },
        {
          stepNumber: 3,
          practice_en: 'Time protective fungicide sprays to petal fall and early fruit development where the disease is known to be active in your area — ask your VAA/RBK for the current local spray calendar.',
          practice_te: 'మీ ప్రాంతంలో ఈ తెగులు చురుగ్గా ఉన్నట్లు తెలిస్తే, పూత రాలే సమయం, కాయ తొలిదశలో రక్షణాత్మక శిలీంద్రనాశక పిచికారీని ప్లాన్ చేయండి — ప్రస్తుత స్థానిక పిచికారీ క్యాలెండర్ కోసం మీ VAA/RBK ను అడగండి.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-cbs-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Orchard sanitation (removing fallen leaves/fruit) is the single most effective organic-compatible control, since it removes the fungus\'s main inoculum source; a copper-based spray is sometimes added, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'పొలం పరిశుభ్రత (పడిన ఆకులు/కాయలు తీసివేయడం) అత్యంత ప్రభావవంతమైన సేంద్రియ-అనుకూల నియంత్రణ — ఇది శిలీంద్రానికి ప్రధాన బీజ మూలాన్ని తొలగిస్తుంది; కొన్నిసార్లు రాగి ఆధారిత పిచికారీ కూడా జోడిస్తారు, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (ఐచ్ఛికం, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-citrus-cbs-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Strobilurin fungicides (e.g. Azoxystrobin) are commonly used against citrus black spot internationally, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure for this crop. Do not spray from memory.',
          instruction_te:
            'సిట్రస్ నల్ల మచ్చ తెగులుకు అంతర్జాతీయంగా స్ట్రోబిలురిన్ శిలీంద్రనాశకాలు (ఉదా. అజాక్సిస్ట్రోబిన్) సాధారణంగా వాడతారు, కానీ ఈ ప్రాంతానికి మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ పంటకు ప్రస్తుత CIBRC నమోదైన అంకెను ఈ సెషన్ ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Azoxystrobin (dose suppressed)',
          activeIngredient_te: 'అజాక్సిస్ట్రోబిన్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than about 10-15% of fruit show spotting despite sanitation, or the orchard supplies a market with strict cosmetic/export grading, consult your VAA/RBK/Horticulture Officer for a tailored spray program.',
      escalationThreshold_te:
        'పరిశుభ్రత చర్యలు తీసుకున్నా 10-15% కంటే ఎక్కువ కాయలకు మచ్చలు కనిపిస్తే, లేదా తోట ఖచ్చితమైన రూపం/ఎగుమతి ప్రమాణాలు ఉన్న మార్కెట్‌కు సరఫరా చేస్తే, తగిన పిచికారీ ప్రణాళిక కోసం VAA/RBK/హార్టికల్చర్ అధికారిని సంప్రదించండి.',
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
      name_te: 'మెలనోజ్ తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Diaporthe citri (asexual stage: Phomopsis citri)',
      pathogenOrVector_te: 'శిలీంద్రం: డయాపోర్తె సిట్రి (అలైంగిక దశ: ఫోమోప్సిస్ సిట్రి)',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Small, raised, corky brown pustules with a rough, "sandpaper"-like texture on leaves, twigs, and fruit rind — usually more a cosmetic issue than a threat to tree health.',
        'On fruit, rain-splashed spores running down the surface can leave a distinctive "tear-streak" or "mudcake" pattern of raised brown specks.',
        'Severe infection on young twigs can occasionally cause dieback, since the fungus lives and multiplies mainly on dead wood.',
      ],
      observableSymptoms_te: [
        'ఆకులు, కొమ్మలు, కాయ తొక్కపై చిన్న, పైకి లేచిన, గట్టి గోధుమ రంగు మొటిమలు, ఇసుక కాగితం వంటి కరుకైన ఆకృతితో కనిపిస్తాయి — సాధారణంగా చెట్టు ఆరోగ్యానికి ముప్పు కంటే రూపానికి సంబంధించిన సమస్య.',
        'కాయలపై వర్షపు నీటితో చిందిన బీజాలు కాయ ఉపరితలంపై కిందికి కారి, పైకి లేచిన గోధుమ రంగు చుక్కల "కన్నీటి చారలు" లేదా "బురద అట్ట" వంటి ప్రత్యేక నమూనాను వదలవచ్చు.',
        'లేత కొమ్మలపై తీవ్రమైన తెగులు అప్పుడప్పుడు కొమ్మలు ఎండిపోవడానికి కారణం కావచ్చు — ఈ శిలీంద్రం ప్రధానంగా చనిపోయిన కలపలో జీవించి వృద్ధి చెందుతుంది.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-melanose-vs-scab',
          name_en: 'Citrus Scab',
          name_te: 'సిట్రస్ గజ్జి తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Melanose pustules are flatter, sandpaper-textured, and appear on tissue of any age near dead wood; scab lesions are more pointed, wart-like, corky outgrowths mainly on very young flush tissue, often distorting the leaf.',
          differentiatingFactors_te:
            'మెలనోజ్ మొటిమలు చదునుగా, ఇసుక కాగితం వంటి ఆకృతితో, చనిపోయిన కలప దగ్గర ఏ వయసు కణజాలంపైనైనా కనిపిస్తాయి; గజ్జి గాయాలు మొనదేలిన, మొటిమల వంటి, గట్టి పెరుగుదలలుగా ప్రధానంగా చాలా లేత చిగురుపై కనిపించి తరచుగా ఆకును వంకరగా మారుస్తాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dead twigs and wood left in the canopy, which is where this fungus mainly lives and produces spores.',
        'Frequent rain or overhead irrigation, which splashes spores from dead wood onto new growth and fruit.',
        'Young, actively growing flush tissue is more susceptible than older, hardened growth.',
      ],
      environmentalRiskFactors_te: [
        'ఆకుల పందిరిలో మిగిలిన చనిపోయిన కొమ్మలు, కలప — ఇక్కడే ఈ శిలీంద్రం ప్రధానంగా జీవించి బీజాలను ఉత్పత్తి చేస్తుంది.',
        'తరచుగా వర్షం లేదా పైనుండి తడిపే నీటిపారుదల చనిపోయిన కలప నుండి బీజాలను కొత్త పెరుగుదల, కాయలపైకి చిందిస్తుంది.',
        'లేత, చురుగ్గా పెరుగుతున్న చిగురు కణజాలం ముదురు, గట్టిపడిన పెరుగుదల కంటే ఎక్కువగా తెగులుకు గురవుతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Prune out and remove dead twigs and deadwood from the canopy regularly — this is the single most effective control, since it removes the fungus\'s main source of spores.',
          practice_te: 'ఆకుల పందిరి నుండి చనిపోయిన కొమ్మలు, కలపను క్రమం తప్పకుండా కత్తిరించి తీసివేయండి — ఇదే అత్యంత ప్రభావవంతమైన నియంత్రణ, ఎందుకంటే ఇది శిలీంద్రానికి ప్రధాన బీజ మూలాన్ని తొలగిస్తుంది.',
          targetTiming: 'Annually, especially after any storm/hail damage',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid overhead irrigation that splashes water from deadwood areas onto new growth and fruit.',
          practice_te: 'చనిపోయిన కలప ప్రాంతాల నుండి నీటిని కొత్త పెరుగుదల, కాయలపైకి చిందించే పైనుండి తడిపే నీటిపారుదల మానండి.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-mel-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Since melanose mainly lives on dead wood, pruning out deadwood is usually sufficient on its own and is the organic-compatible first step; a copper-based spray at early fruit set is sometimes added in nurseries/young plantings, but a specific rate is not confirmed from a primary source this session — confirm with your VAA/RBK if you choose to spray.',
          instruction_te:
            'మెలనోజ్ ప్రధానంగా చనిపోయిన కలపలో జీవిస్తుంది కాబట్టి, కలపను కత్తిరించి తీసివేయడం సాధారణంగా సరిపోతుంది, ఇది సేంద్రియ-అనుకూల మొదటి చర్య; నారుమడి/లేత తోటల్లో కాయ తొలిదశలో కొన్నిసార్లు రాగి ఆధారిత పిచికారీ కూడా జోడిస్తారు, కానీ ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — పిచికారీ చేయదలిస్తే VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride (optional, dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (ఐచ్ఛికం, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-citrus-mel-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A copper-based fungicide or Mancozeb spray at early fruit set is sometimes used where melanose has caused significant fruit blemishing in previous seasons, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          instruction_te:
            'మునుపటి సీజన్లలో మెలనోజ్ వల్ల గణనీయమైన కాయ మచ్చలు వచ్చిన చోట కాయ తొలిదశలో కొన్నిసార్లు రాగి ఆధారిత శిలీంద్రనాశకం లేదా మాంకోజెబ్ పిచికారీ వాడతారు, కానీ ఈ ప్రాంతానికి మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Copper oxychloride / Mancozeb (dose suppressed)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ / మాంకోజెబ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'Melanose is usually a cosmetic issue; if it nonetheless causes dieback on multiple young twigs or heavy fruit blemishing despite deadwood pruning, consult your VAA/RBK.',
      escalationThreshold_te:
        'మెలనోజ్ సాధారణంగా రూపానికి సంబంధించిన సమస్యే; అయినా కలప కత్తిరింపు చేసినా అనేక లేత కొమ్మలు ఎండిపోతున్నా లేదా కాయలపై ఎక్కువ మచ్చలు కనిపిస్తే, VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'సిట్రస్ గజ్జి తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Elsinoe fawcettii (sour orange scab) / Elsinoe australis (sweet orange scab)',
      pathogenOrVector_te: 'శిలీంద్రం: ఎల్సినో ఫాసెట్టి (పులుపు నారింజ గజ్జి) / ఎల్సినో ఆస్ట్రాలిస్ (తీపి నారింజ గజ్జి)',
      urgencyLevel: 'Low',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Wart-like, raised, irregular corky scabby outgrowths on young leaves, twigs, and fruit, often pointed or conical rather than flat.',
        'Mainly affects very young, actively growing (flush) tissue; heavily affected young leaves can become twisted or distorted as they expand around the lesions.',
        'Mostly a cosmetic/fruit-grading issue on fruit rind; rarely threatens overall tree health.',
      ],
      observableSymptoms_te: [
        'లేత ఆకులు, కొమ్మలు, కాయలపై మొటిమల వంటి, పైకి లేచిన, క్రమరహిత, గట్టి గజ్జి పెరుగుదలలు కనిపిస్తాయి; ఇవి చదునుగా కాకుండా మొనదేలి లేదా శంకు ఆకారంలో ఉంటాయి.',
        'ప్రధానంగా చాలా లేత, చురుగ్గా పెరుగుతున్న (చిగురు) కణజాలాన్ని ఆశిస్తుంది; ఎక్కువగా సోకిన లేత ఆకులు మచ్చల చుట్టూ పెరుగుతూ వంకరగా, వికృతంగా మారవచ్చు.',
        'ఎక్కువగా కాయ తొక్కపై రూపం/గ్రేడింగ్‌కు సంబంధించిన సమస్య; చెట్టు మొత్తం ఆరోగ్యానికి అరుదుగానే ముప్పు కలిగిస్తుంది.',
      ],
      affectedParts: ['Leaves', 'Twigs', 'Fruits'],
      similarConditions: [
        {
          id: 'citrus-scab-vs-canker',
          name_en: 'Citrus Canker',
          name_te: 'సిట్రస్ కాంకర్ (పుండు తెగులు)',
          isPathological: true,
          differentiatingFactors_en:
            'Scab lesions are pointed, wart-like outgrowths without a yellow water-soaked halo, mainly on very young flush tissue; canker lesions are flatter craters with a distinct yellow halo and can appear on tissue of various ages, often causing more leaf/fruit drop.',
          differentiatingFactors_te:
            'గజ్జి గాయాలు మొనదేలిన, మొటిమల వంటి పెరుగుదలలుగా ఉండి పసుపు, నీటిలో నానినట్లు కనిపించే వలయం ఉండదు, ప్రధానంగా చాలా లేత చిగురుపై కనిపిస్తాయి; కాంకర్ గాయాలు చదునైన బిలం ఆకారంలో, స్పష్టమైన పసుపు వలయంతో ఉండి వివిధ వయసుల కణజాలంపై కనిపించి, ఎక్కువగా ఆకులు/కాయలు రాలడానికి కారణమవుతాయి.',
        },
      ],
      environmentalRiskFactors_en: [
        'Frequent rain or overhead irrigation during new flush growth, which spreads spores onto susceptible young tissue.',
        'Dense canopy with poor air circulation that keeps young growth wet longer.',
        'Certain citrus varieties (e.g. some lemon and mandarin types) are more susceptible than others.',
      ],
      environmentalRiskFactors_te: [
        'కొత్త చిగురు పెరిగే సమయంలో తరచుగా వర్షం లేదా పైనుండి తడిపే నీటిపారుదల వల్ల బీజాలు సున్నితమైన లేత కణజాలంపైకి వ్యాపిస్తాయి.',
        'దట్టమైన ఆకుల పందిరి, సరైన గాలి ప్రసరణ లేకపోవడం వల్ల లేత పెరుగుదల ఎక్కువసేపు తడిగా ఉంటుంది.',
        'కొన్ని సిట్రస్ రకాలు (ఉదా. కొన్ని నిమ్మ, కమలా రకాలు) ఇతరుల కంటే ఎక్కువగా తెగులుకు గురవుతాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid overhead irrigation during periods of new flush growth; water at the base of the tree instead where feasible.',
          practice_te: 'కొత్త చిగురు పెరిగే సమయంలో పైనుండి తడిపే నీటిపారుదల మానండి; వీలైతే చెట్టు మొదలు వద్ద నీరు పెట్టండి.',
          targetTiming: 'During each new flush period',
        },
        {
          stepNumber: 2,
          practice_en: 'Prune to open up the canopy for better air circulation, reducing how long young growth stays wet.',
          practice_te: 'మంచి గాలి ప్రసరణ కోసం ఆకుల పందిరిని తెరుచుకునేలా కత్తిరించండి — దీనివల్ల లేత పెరుగుదల తడిగా ఉండే సమయం తగ్గుతుంది.',
        },
      ],
      treatments: [
        {
          id: 't-citrus-scab-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A copper-based spray timed to new flush emergence is a commonly documented organic-compatible approach, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'కొత్త చిగురు వచ్చే సమయానికి రాగి ఆధారిత పిచికారీని ప్లాన్ చేయడం సాధారణంగా వాడే సేంద్రియ-అనుకూల పద్ధతి, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride (organic, dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
        },
        {
          id: 't-citrus-scab-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Copper-based fungicides remain the standard chemical option for citrus scab where sanitation/irrigation changes are not enough, but a specific dose for this region is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          instruction_te:
            'పరిశుభ్రత/నీటిపారుదల మార్పులు సరిపోనప్పుడు సిట్రస్ గజ్జి తెగులుకు రాగి ఆధారిత శిలీంద్రనాశకాలే ప్రామాణిక రసాయన ఎంపిక, కానీ ఈ ప్రాంతానికి మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Copper oxychloride (dose suppressed)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'Scab is usually a minor cosmetic issue; if it nonetheless distorts a large share of new flush leaves or affects more than about 15% of fruit despite irrigation changes, consult your VAA/RBK.',
      escalationThreshold_te:
        'గజ్జి సాధారణంగా చిన్న రూప సమస్యే; అయినా కొత్త చిగురు ఆకుల్లో ఎక్కువ భాగాన్ని వంకరగా మారుస్తున్నా లేదా నీటిపారుదల మార్పులు చేసినా 15% కంటే ఎక్కువ కాయలను ప్రభావితం చేస్తే, VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'గోధుమ రంగు దోమ (హాపర్‌బర్న్)',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Nilaparvata lugens (brown planthopper), also a vector for Rice Grassy Stunt and Ragged Stunt viruses',
      pathogenOrVector_te: 'కీటకం: నిలపర్వత లుజెన్స్ (గోధుమ రంగు దోమ), వరి గడ్డి కుంటు మరియు చిరిగిన కుంటు వైరస్‌లకు వాహకం కూడా',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Circular patches of plants turning orange-brown and drying up ("hopperburn"), typically starting at a low-lying spot or where planting is dense, then expanding outward day by day.',
        'Parting the base of tillers in or near a hopperburn patch reveals clusters of brown, wedge-shaped adult and nymph insects feeding at the stem base just above the waterline.',
        'Sticky honeydew excreted by the insects coats the lower stems and water surface, often with a black sooty mould growing on it — a useful early sign before plants actually start drying.',
      ],
      observableSymptoms_te: [
        'మొక్కలు గుండ్రని ప్రాంతాలుగా ఎరుపు-గోధుమ రంగులోకి మారి ఎండిపోతాయి ("హాపర్‌బర్న్"), సాధారణంగా పల్లపు ప్రదేశం లేదా దట్టంగా నాటిన చోట మొదలై, రోజురోజుకు విస్తరిస్తుంది.',
        'హాపర్‌బర్న్ ప్రాంతంలో లేదా దాని దగ్గర పిలకల మొదలును విడదీసి చూస్తే, నీటి మట్టానికి కొద్దిగా పైన కాండం మొదలు వద్ద గోధుమ రంగు, చీలిక ఆకారపు పెద్ద, లేత పురుగుల గుంపులు కనిపిస్తాయి.',
        'పురుగులు విసర్జించే జిగురు పదార్థం కింది కాండాలు, నీటి ఉపరితలంపై పేరుకుపోయి, తరచుగా దానిపై నల్ల మసి బూజు పెరుగుతుంది — మొక్కలు నిజంగా ఎండిపోవడం మొదలయ్యే ముందు కనిపించే ఉపయోగకరమైన తొలి సంకేతం.',
      ],
      affectedParts: ['Stem Base', 'Tillers', 'Whole Plant'],
      similarConditions: [
        {
          id: 'rice-bph-vs-drought',
          name_en: 'Drought / Water Stress',
          name_te: 'కరువు / నీటి ఒత్తిడి',
          isPathological: false,
          differentiatingFactors_en:
            'Hopperburn starts as a circular patch at one spot (often a low area or dense planting) and expands outward with live insects visible at the stem base when parted; drought stress tends to affect the crop more uniformly according to elevation/soil type across the field, with no insects present and no honeydew/sooty mould.',
          differentiatingFactors_te:
            'హాపర్‌బర్న్ ఒక ప్రదేశంలో (తరచుగా పల్లపు ప్రాంతం లేదా దట్టమైన నాటడం) గుండ్రని మచ్చగా మొదలై బయటికి విస్తరిస్తుంది; కాండం మొదలు విడదీస్తే పురుగులు కనిపిస్తాయి; కరువు ఒత్తిడి పొలం అంతటా ఎత్తు/నేల రకాన్ని బట్టి మరింత సమానంగా ప్రభావితం చేస్తుంది, పురుగులు లేదా జిగురు/మసి బూజు ఉండవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense planting, excessive nitrogen use, and continuous flooding, all of which create the warm, humid, shaded microclimate at the stem base that BPH prefers.',
        'Indiscriminate early-season insecticide spraying that kills the natural predators (spiders, mirid bugs) that normally keep BPH populations in check — a well-documented cause of later BPH outbreaks ("resurgence").',
        'Continuous rice cropping with little varietal diversity, and warm, cloudy, humid weather in general.',
      ],
      environmentalRiskFactors_te: [
        'దట్టంగా నాటడం, అధిక నత్రజని వాడకం, నిరంతరం నీరు నిల్వ ఉంచడం — ఇవన్నీ BPH ఇష్టపడే వెచ్చని, తేమతో కూడిన, నీడ ఉన్న కాండం మొదలు వాతావరణాన్ని సృష్టిస్తాయి.',
        'సీజన్ తొలిదశలో విచక్షణారహితంగా పురుగుమందుల పిచికారీ చేయడం వల్ల సాధారణంగా BPH సంఖ్యను అదుపులో ఉంచే సహజ శత్రువులు (సాలెపురుగులు, మిరిడ్ బగ్స్) చనిపోతాయి — దీని వల్ల తర్వాత BPH ఉధృతి ("రిసర్జెన్స్") పెరగడం బాగా నమోదైన విషయం.',
        'ఎక్కువ రకాల వైవిధ్యం లేకుండా నిరంతరం వరి పండించడం, సాధారణంగా వెచ్చని, మేఘావృతమైన, తేమతో కూడిన వాతావరణం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive nitrogen and dense planting; alternate wetting and drying (draining the field periodically) rather than continuous flooding discourages BPH buildup at the stem base.',
          practice_te: 'అధిక నత్రజని, దట్టంగా నాటడం మానండి; నిరంతరం నీరు నిల్వ ఉంచడం కంటే అడపాదడపా నీరు తీసివేయడం (ఆరుతడి పద్ధతి) వల్ల కాండం మొదలు వద్ద BPH పెరుగుదల తగ్గుతుంది.',
          targetTiming: 'Throughout the season',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid routine, calendar-based insecticide spraying early in the season — this is a well-documented way outbreaks get worse, since it removes the natural predators that keep BPH in check. Scout fields regularly instead and act only when hopper numbers justify it.',
          practice_te: 'సీజన్ తొలిదశలో క్యాలెండర్ ఆధారంగా రొటీన్‌గా పురుగుమందులు పిచికారీ చేయడం మానండి — ఇది ఉధృతిని మరింత పెంచే బాగా తెలిసిన కారణం, ఎందుకంటే ఇది BPH ని అదుపులో ఉంచే సహజ శత్రువులను తొలగిస్తుంది. బదులుగా పొలాన్ని క్రమం తప్పకుండా పరిశీలించి, దోమల సంఖ్య సమర్థించినప్పుడే చర్య తీసుకోండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Where available, grow a locally recommended BPH-resistant/tolerant variety, especially in fields with a history of repeated outbreaks.',
          practice_te: 'అందుబాటులో ఉంటే, ముఖ్యంగా పదేపదే ఉధృతి వచ్చిన పొలాల్లో, స్థానికంగా సిఫారసు చేసిన BPH తట్టుకునే రకాన్ని వేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-rice-bph-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Conserving natural enemies (spiders, mirid bugs, dragonflies) by avoiding unnecessary early sprays is the single most effective non-chemical lever against BPH; a neem-based spray is sometimes used at low hopper densities, but a specific concentration is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'అనవసర తొలిదశ పిచికారీలను నివారించడం ద్వారా సహజ శత్రువులను (సాలెపురుగులు, మిరిడ్ బగ్స్, డ్రాగన్‌ఫ్లైస్) కాపాడటం BPH కు వ్యతిరేకంగా అత్యంత ప్రభావవంతమైన రసాయనేతర చర్య; తక్కువ దోమల సాంద్రత వద్ద కొన్నిసార్లు వేప ఆధారిత పిచికారీ వాడతారు, కానీ ఖచ్చితమైన గాఢతను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Neem-based spray (organic, dose unverified)',
          activeIngredient_te: 'వేప ఆధారిత పిచికారీ (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Once hopperburn patches appear, affected tillers rarely recover — treatment at this stage targets stopping the patch from spreading, not reviving plants already dried up.',
          safetyCaution_te: 'హాపర్‌బర్న్ మచ్చలు కనిపించాక, సోకిన పిలకలు చాలా అరుదుగా కోలుకుంటాయి — ఈ దశలో చికిత్స లక్ష్యం ఇప్పటికే ఎండిన మొక్కలను బతికించడం కాదు, మచ్చ వ్యాపించకుండా ఆపడమే.',
        },
        {
          id: 't-rice-bph-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Selective insecticides such as Pymetrozine, Flonicamid, or Buprofezin are commonly recommended for BPH specifically because they spare natural enemies better than broad-spectrum products, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and avoid broad-spectrum insecticides (e.g. synthetic pyrethroids) early in the season, since they are documented to trigger BPH resurgence by killing its natural predators.',
          instruction_te:
            'పైమెట్రోజిన్, ఫ్లోనికామిడ్, లేదా బుప్రోఫెజిన్ వంటి ఎంపిక చేసిన పురుగుమందులు BPH కు ప్రత్యేకంగా సిఫారసు చేస్తారు, ఎందుకంటే ఇవి విస్తృత-శ్రేణి మందుల కంటే సహజ శత్రువులను తక్కువగా దెబ్బతీస్తాయి, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు; సీజన్ తొలిదశలో విస్తృత-శ్రేణి పురుగుమందులు (ఉదా. సింథటిక్ పైరెత్రాయిడ్స్) వాడవద్దు — ఇవి సహజ శత్రువులను చంపి BPH ఉధృతిని పెంచుతాయని నమోదైంది.',
          activeIngredient_en: 'Pymetrozine / Flonicamid / Buprofezin (dose suppressed)',
          activeIngredient_te: 'పైమెట్రోజిన్ / ఫ్లోనికామిడ్ / బుప్రోఫెజిన్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Direct the spray to the stem base/basal zone where BPH actually feeds, not just the leaf canopy.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి. BPH నిజంగా ఆహారం తీసుకునే కాండం మొదలు భాగానికి పిచికారీని లక్ష్యంగా చేసుకోండి, కేవలం ఆకుల పందిరికి కాదు.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If you find more than roughly 5-10 hoppers per tiller at the stem base, or any hopperburn patch has already appeared and is expanding, consult your VAA/RBK immediately — BPH populations can destroy a field within days once they reach outbreak levels.',
      escalationThreshold_te:
        'కాండం మొదలు వద్ద ఒక్కో పిలకకు సుమారు 5-10 కంటే ఎక్కువ దోమలు కనిపించినా, లేదా ఇప్పటికే హాపర్‌బర్న్ మచ్చ కనిపించి విస్తరిస్తున్నా, వెంటనే VAA/RBK ను సంప్రదించండి — ఉధృతి స్థాయికి చేరిన BPH కొద్ది రోజుల్లోనే పొలాన్ని నాశనం చేయగలదు.',
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
      name_te: 'వరి ఆకు చుట్టు పురుగు',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Cnaphalocrocis medinalis (rice leaf folder)',
      pathogenOrVector_te: 'కీటకం: క్నాఫలోక్రోసిస్ మెడినాలిస్ (వరి ఆకు చుట్టు పురుగు)',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Leaf blades folded or rolled longitudinally and webbed shut with fine silk threads, forming a tube-like shelter the caterpillar feeds inside.',
        'Unfolding an affected leaf reveals long, white to transparent parallel streaks where the caterpillar has scraped away the green tissue from inside, leaving the leaf\'s outer skin intact.',
        'A small green caterpillar with a brown head is usually found inside the folded leaf; severely affected fields show a scorched, whitish appearance from a distance.',
      ],
      observableSymptoms_te: [
        'ఆకు బ్లేడ్లు పొడవుగా ముడుచుకుని లేదా చుట్టుకుని సన్నని పట్టు దారాలతో అంటుకుపోయి, పురుగు లోపల ఆహారం తీసుకునే గొట్టం వంటి ఆశ్రయాన్ని ఏర్పరుస్తాయి.',
        'సోకిన ఆకును విప్పి చూస్తే, పురుగు లోపలి నుండి పచ్చని కణజాలాన్ని గీకివేయడం వల్ల ఏర్పడిన పొడవైన, తెలుపు నుండి పారదర్శక సమాంతర చారలు కనిపిస్తాయి, ఆకు బయటి పొర చెక్కుచెదరకుండా ఉంటుంది.',
        'చుట్టిన ఆకు లోపల సాధారణంగా గోధుమ రంగు తలతో చిన్న పచ్చని గొంగళి పురుగు కనిపిస్తుంది; తీవ్రంగా సోకిన పొలాలు దూరం నుండి కాలిపోయినట్లు, తెల్లగా కనిపిస్తాయి.',
      ],
      affectedParts: ['Leaves'],
      similarConditions: [
        {
          id: 'rice-leaffolder-vs-blb',
          name_en: 'Bacterial Leaf Blight',
          name_te: 'ఎండాకు తెగులు',
          isPathological: true,
          differentiatingFactors_en:
            'Leaf folder damage is confined to the area inside a webbed, folded leaf, with parallel white scraping streaks and a caterpillar usually present inside; bacterial leaf blight shows continuous water-soaked yellow-to-straw stripes starting from the leaf tip/margin on an unfolded, open leaf, with milky bacterial ooze from a cut lesion and no webbing or caterpillar.',
          differentiatingFactors_te:
            'ఆకు చుట్టు పురుగు నష్టం పట్టుతో చుట్టిన, ముడుచుకున్న ఆకు లోపలి ప్రాంతానికే పరిమితమై, సమాంతర తెలుపు గీతలు, సాధారణంగా లోపల గొంగళి పురుగుతో ఉంటుంది; ఎండాకు తెగులు విప్పి ఉన్న ఆకుపై కొన ఆకు/అంచు నుండి నిరంతర నీటిలో నానిన పసుపు-గడ్డి చారలుగా కనిపించి, కోసిన మచ్చ నుండి పాల వంటి బ్యాక్టీరియా చీము వస్తుంది, పట్టు లేదా పురుగు ఉండదు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Dense, shaded canopy with high humidity, especially with excessive nitrogen application promoting lush, succulent leaf growth that the moth prefers for egg-laying.',
        'Continuous cropping without a break, which lets the pest build up generation after generation.',
        'Warm, cloudy, humid weather favors moth activity and egg survival.',
      ],
      environmentalRiskFactors_te: [
        'దట్టమైన, నీడ ఉన్న పందిరి, ఎక్కువ తేమ, ముఖ్యంగా అధిక నత్రజని వాడకం వల్ల మొగ్గ పెట్టడానికి శలభం ఇష్టపడే మెత్తని, లేత ఆకు పెరుగుదల.',
        'విరామం లేకుండా నిరంతరం పంట వేయడం వల్ల పురుగు తరతరాలుగా పెరుగుతుంది.',
        'వెచ్చని, మేఘావృతమైన, తేమతో కూడిన వాతావరణం శలభం కార్యకలాపాలు, గుడ్ల మనుగడకు అనుకూలం.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive nitrogen application, which produces the lush, succulent foliage the moth prefers for egg-laying; apply nitrogen in split doses as recommended rather than all at once.',
          practice_te: 'శలభం మొగ్గ పెట్టడానికి ఇష్టపడే మెత్తని ఆకు పెరుగుదలను కలిగించే అధిక నత్రజని వాడకం మానండి; సిఫారసు చేసిన విధంగా నత్రజనిని విడతలుగా వేయండి, ఒకేసారి కాదు.',
          targetTiming: 'Throughout the season, at each nitrogen application',
        },
        {
          stepNumber: 2,
          practice_en: 'Conserve natural enemies (parasitic wasps, spiders) by avoiding unnecessary insecticide sprays early in the season — leaf folder damage rarely justifies spraying on its own unless folding is severe near the flowering stage.',
          practice_te: 'సీజన్ తొలిదశలో అనవసర పురుగుమందుల పిచికారీని నివారించడం ద్వారా సహజ శత్రువులను (పరాన్నజీవి కందిరీగలు, సాలెపురుగులు) కాపాడండి — పూత దశకు దగ్గరగా తీవ్రంగా ముడుచుకోకపోతే, ఆకు చుట్టు పురుగు నష్టం సాధారణంగా పిచికారీని సమర్థించదు.',
        },
      ],
      treatments: [
        {
          id: 't-rice-lf-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A sprayable Bacillus thuringiensis (Bt) formulation is commonly used against leaf folder caterpillars as a selective, natural-enemy-sparing option, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'ఆకు చుట్టు పురుగు గొంగళి పురుగులకు వ్యతిరేకంగా ఎంపిక చేసిన, సహజ శత్రువులను కాపాడే పిచికారీ చేయదగిన బాసిల్లస్ తురింజియెన్సిస్ (Bt) సాధారణంగా వాడతారు, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Bacillus thuringiensis (Bt) (organic, dose unverified)',
          activeIngredient_te: 'బాసిల్లస్ తురింజియెన్సిస్ (Bt) (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Rice plants tolerate a fair amount of leaf folding without real yield loss, since the flag leaf (the one just below the panicle) matters most — base the decision to spray on how many leaves are damaged, not on the presence of a few folded leaves alone.',
          safetyCaution_te: 'నిజమైన దిగుబడి నష్టం లేకుండా వరి మొక్కలు కొంత ఆకు ముడుచుకోవడాన్ని తట్టుకోగలవు, ఎందుకంటే వెన్ను కింద ఉండే చివరి ఆకు (ఫ్లాగ్ లీఫ్) అత్యంత ముఖ్యమైనది — కొన్ని ఆకులు ముడుచుకున్నంత మాత్రాన కాకుండా ఎన్ని ఆకులు దెబ్బతిన్నాయో చూసి పిచికారీ నిర్ణయం తీసుకోండి.',
        },
        {
          id: 't-rice-lf-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Chlorantraniliprole or Cartap hydrochloride are commonly recommended against rice leaf folder when damage is severe, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory, and reserve spraying for cases where new, unfolded leaf damage is heavy near flowering, since leaf folder rarely threatens yield on its own at low levels.',
          instruction_te:
            'నష్టం తీవ్రంగా ఉన్నప్పుడు వరి ఆకు చుట్టు పురుగుకు క్లోరాంట్రానిలిప్రోల్ లేదా కార్టాప్ హైడ్రోక్లోరైడ్ సాధారణంగా సిఫారసు చేస్తారు, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు; పూత దశకు దగ్గరగా కొత్త, విప్పని ఆకులకు నష్టం ఎక్కువగా ఉన్నప్పుడు మాత్రమే పిచికారీని ఉంచండి, ఎందుకంటే తక్కువ స్థాయిలో ఆకు చుట్టు పురుగు ఒంటరిగా దిగుబడికి అరుదుగానే ముప్పు కలిగిస్తుంది.',
          activeIngredient_en: 'Chlorantraniliprole / Cartap hydrochloride (dose suppressed)',
          activeIngredient_te: 'క్లోరాంట్రానిలిప్రోల్ / కార్టాప్ హైడ్రోక్లోరైడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If more than roughly 10-15% of leaves (especially new, unfolded leaves near the flag-leaf stage) show fresh folding/scraping damage, consult your VAA/RBK about whether spraying is actually justified at your field\'s growth stage.',
      escalationThreshold_te:
        'సుమారు 10-15% కంటే ఎక్కువ ఆకులకు (ముఖ్యంగా ఫ్లాగ్ లీఫ్ దశకు దగ్గరగా ఉన్న కొత్త, విప్పని ఆకులకు) తాజా ముడుచుకోవడం/గీకడం నష్టం కనిపిస్తే, మీ పొలం పెరుగుదల దశలో పిచికారీ నిజంగా అవసరమా అని మీ VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'వరి తప్పుడు కణుతు తెగులు',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Fungus: Ustilaginoidea virens',
      pathogenOrVector_te: 'శిలీంద్రం: ఉస్టిలాజినాయిడియా విరెన్స్',
      urgencyLevel: 'Medium',
      urgencyColor: 'yellow',
      observableSymptoms_en: [
        'Individual grains within the panicle (ear head) are replaced by large velvety spore balls, much bigger than a normal rice grain, ranging from yellow-orange when young to olive-green or black as they mature.',
        'Spore balls burst through and enlarge beyond the husk, becoming clearly visible after flowering, usually scattered among otherwise normal-looking grains on the same panicle rather than affecting every grain.',
        'Affected grains are a direct yield loss and a grain-quality/marketability problem; mature spore balls also carry a mild toxin, so affected grain is generally not recommended for food or feed use.',
      ],
      observableSymptoms_te: [
        'వెన్నులోని విడివిడి గింజలు సాధారణ వరి గింజ కంటే చాలా పెద్దగా ఉండే మెత్తని, వెల్వెట్ వంటి బీజ బంతులుగా మారతాయి; ఇవి లేత దశలో పసుపు-నారింజ రంగులో ఉండి ముదిరే కొద్దీ ఆలివ్-ఆకుపచ్చ లేదా నల్ల రంగులోకి మారతాయి.',
        'బీజ బంతులు పొట్టును చీల్చుకుని పెద్దవై, పూత తర్వాత స్పష్టంగా కనిపిస్తాయి; సాధారణంగా అదే వెన్నులో మిగతా సాధారణ గింజల మధ్య చెదురుమదురుగా కనిపిస్తాయి, ప్రతి గింజను కాదు.',
        'సోకిన గింజలు ప్రత్యక్ష దిగుబడి నష్టం మరియు గింజ నాణ్యత/అమ్మకానికి సమస్య; ముదిరిన బీజ బంతుల్లో తేలికపాటి విషపదార్థం కూడా ఉంటుంది కాబట్టి, సోకిన గింజలను సాధారణంగా ఆహారం లేదా దాణాగా వాడటం సిఫారసు చేయరు.',
      ],
      affectedParts: ['Panicle', 'Grain'],
      similarConditions: [
        {
          id: 'rice-falsesmut-vs-blast',
          name_en: 'Rice Blast (Neck Blast)',
          name_te: 'అగ్గి తెగులు (మెడ అగ్గి)',
          isPathological: true,
          differentiatingFactors_en:
            'False smut replaces individual grains with large, round spore balls while the rest of the panicle and neck look normal; neck blast instead causes the neck/panicle base to rot and snap, so the whole panicle above the break turns white/empty (chaffy) rather than showing enlarged spore balls on individual grains.',
          differentiatingFactors_te:
            'తప్పుడు కణుతులో విడివిడి గింజలు పెద్ద, గుండ్రని బీజ బంతులుగా మారతాయి, మిగతా వెన్ను, మెడ సాధారణంగానే కనిపిస్తాయి; మెడ అగ్గిలో బదులుగా వెన్ను మెడ/మొదలు కుళ్ళి విరిగిపోయి, విరిగిన చోటుకు పైన ఉన్న వెన్ను మొత్తం తెలుపు/ఖాళీ (తాలు)గా మారుతుంది, విడివిడి గింజలపై బీజ బంతులు కనిపించవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'High humidity, intermittent rain, and cloudy weather during the flowering/grain-fill stage, which favors spore germination and infection.',
        'Excessive nitrogen application, especially late top-dressing close to flowering, which is strongly associated with worse false smut outbreaks.',
        'Dense planting and continuous rice cropping on the same land, which lets spores carried in soil/straw build up over seasons.',
      ],
      environmentalRiskFactors_te: [
        'పూత/గింజ నిండే దశలో ఎక్కువ తేమ, అడపాదడపా వర్షం, మేఘావృతమైన వాతావరణం బీజాలు మొలకెత్తడానికి, తెగులు సోకడానికి అనుకూలం.',
        'అధిక నత్రజని వాడకం, ముఖ్యంగా పూతకు దగ్గరగా ఆలస్యంగా వేసే టాప్ డ్రెస్సింగ్ — ఇది తీవ్రమైన తప్పుడు కణుతు ఉధృతితో గట్టిగా ముడిపడి ఉంటుంది.',
        'దట్టంగా నాటడం, అదే భూమిలో నిరంతరం వరి పండించడం వల్ల నేల/గడ్డిలో ఉండే బీజాలు సీజన్ల తరబడి పేరుకుపోతాయి.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Avoid excessive or late nitrogen application, especially heavy top-dressing close to the flowering stage, since this is strongly linked to worse false smut outbreaks.',
          practice_te: 'అధిక లేదా ఆలస్యంగా నత్రజని వేయడం మానండి, ముఖ్యంగా పూత దశకు దగ్గరగా భారీ టాప్ డ్రెస్సింగ్ — ఇది తీవ్రమైన తప్పుడు కణుతు ఉధృతితో గట్టిగా ముడిపడి ఉంటుంది.',
          targetTiming: 'At top-dressing, especially near panicle initiation/flowering',
        },
        {
          stepNumber: 2,
          practice_en: 'Use certified, disease-free seed where available, and avoid dense planting that keeps humidity high within the canopy during flowering.',
          practice_te: 'వీలైతే ధృవీకరించిన, తెగులు లేని విత్తనాన్ని వాడండి; పూత దశలో పందిరి లోపల తేమను ఎక్కువగా ఉంచే దట్టమైన నాటడాన్ని మానండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Collect and destroy severely affected panicles/spore balls at harvest rather than leaving them to shed spores back onto the field for the next season.',
          practice_te: 'కోత సమయంలో తీవ్రంగా సోకిన వెన్నులు/బీజ బంతులను సేకరించి నాశనం చేయండి — తదుపరి సీజన్‌కు పొలంలోకి బీజాలు తిరిగి రాలకుండా చూడండి.',
        },
      ],
      treatments: [
        {
          id: 't-rice-fs-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A Pseudomonas fluorescens or Trichoderma-based seed/soil treatment is sometimes used as a general preventive step against false smut, but a specific rate is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'తప్పుడు కణుతుకు వ్యతిరేకంగా సాధారణ నివారణ చర్యగా కొన్నిసార్లు సూడోమోనాస్ ఫ్లోరోసెన్స్ లేదా ట్రైకోడెర్మా ఆధారిత విత్తన/నేల శుద్ధి వాడతారు, కానీ ఖచ్చితమైన మోతాదును ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Pseudomonas fluorescens / Trichoderma spp. (organic, dose unverified)',
          activeIngredient_te: 'సూడోమోనాస్ ఫ్లోరోసెన్స్ / ట్రైకోడెర్మా జాతులు (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Once spore balls have formed on the panicle, no spray reverses the damage to those grains — all treatment here is preventive, aimed at the next flowering/grain-fill window, not a cure for grain already affected.',
          safetyCaution_te: 'వెన్నుపై బీజ బంతులు ఏర్పడిన తర్వాత, ఏ పిచికారీ ఆ గింజలకు జరిగిన నష్టాన్ని తిప్పికొట్టదు — ఇక్కడి చికిత్స అంతా నివారణాత్మకమే, తదుపరి పూత/గింజ నిండే దశ కోసం ఉద్దేశించినది, ఇప్పటికే సోకిన గింజలకు నివారణ కాదు.',
        },
        {
          id: 't-rice-fs-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'A Propiconazole or Copper oxychloride spray timed around the booting/pre-flowering stage is commonly used against false smut in fields with a history of outbreaks, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory; timing (before the panicle emerges, not after spore balls appear) is critical for this disease.',
          instruction_te:
            'ఉధృతి చరిత్ర ఉన్న పొలాల్లో బూటింగ్/పూతకు ముందు దశలో ప్రొపికొనజోల్ లేదా కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ సాధారణంగా తప్పుడు కణుతుకు వ్యతిరేకంగా వాడతారు, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు; సమయం (వెన్ను బయటకు రాకముందే, బీజ బంతులు కనిపించాక కాదు) ఈ తెగులుకు కీలకం.',
          activeIngredient_en: 'Propiconazole / Copper oxychloride (dose suppressed)',
          activeIngredient_te: 'ప్రొపికొనజోల్ / కాపర్ ఆక్సీక్లోరైడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying, since correct timing before panicle emergence matters as much as the product choice.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి — వెన్ను బయటకు రాకముందే సరైన సమయం మందు ఎంపిక అంత ముఖ్యమైనది.',
        },
      ],
      escalationThreshold_en:
        'If false smut balls appear on more than about 5-10% of panicles, or your field has a history of repeated outbreaks, consult your VAA/RBK before the next season\'s flowering stage to plan preventive nitrogen management and timely spraying.',
      escalationThreshold_te:
        'సుమారు 5-10% కంటే ఎక్కువ వెన్నులపై తప్పుడు కణుతు బంతులు కనిపిస్తే, లేదా మీ పొలంలో పదేపదే ఉధృతి చరిత్ర ఉంటే, నివారణాత్మక నత్రజని నిర్వహణ, సకాలంలో పిచికారీని ప్లాన్ చేయడానికి తదుపరి సీజన్ పూత దశకు ముందే మీ VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'పత్తి ఆకు తీగ దోమ (జాసిడ్స్)',
      conditionCategory: 'pest',
      pathogenOrVector_en: 'Insect Pest: Amrasca biguttula biguttula (cotton jassid/leafhopper)',
      pathogenOrVector_te: 'కీటకం: అమ్రాస్కా బిగుట్టులా బిగుట్టులా (పత్తి జాసిడ్/ఆకు తీగ దోమ)',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Leaf margins turn yellow and curl downward (cupping) early on, usually noticed first on the lower/older leaves.',
        'As feeding continues, the yellowing progresses to a reddish-bronze discoloration spreading inward from the margins — a symptom pattern often called "hopperburn" or "reddening" on cotton.',
        'Severely affected leaves become brittle, curl down further, turn brick-red/bronze, and dry up; the plant shows stunted growth and reduced boll formation. Turning a leaf over usually reveals small, pale green, wedge-shaped insects that move sideways or diagonally when disturbed — a distinctive behavior for this pest.',
      ],
      observableSymptoms_te: [
        'ఆకు అంచులు మొదట పసుపు రంగులోకి మారి కిందికి ముడుచుకుంటాయి (కప్పింగ్); సాధారణంగా కింది/ముదురు ఆకులపై ముందుగా గమనించవచ్చు.',
        'ఆహారం తీసుకోవడం కొనసాగే కొద్దీ, పసుపు రంగు అంచుల నుండి లోపలికి ఎరుపు-కంచు రంగు మార్పుగా మారుతుంది — దీన్ని పత్తిలో తరచుగా "హాపర్‌బర్న్" లేదా "రెడ్నింగ్" అంటారు.',
        'తీవ్రంగా సోకిన ఆకులు పెళుసుగా మారి మరింత కిందికి ముడుచుకుని, ఇటుక-ఎరుపు/కంచు రంగులోకి మారి ఎండిపోతాయి; మొక్క గిడసబారి, కాయ కాపు తగ్గుతుంది. ఆకును తిప్పి చూస్తే సాధారణంగా చిన్న, లేత ఆకుపచ్చ, చీలిక ఆకారపు పురుగులు కనిపిస్తాయి, అవి కదిలించినప్పుడు పక్కకు లేదా వాలుగా కదులుతాయి — ఇది ఈ పురుగు ప్రత్యేక లక్షణం.',
      ],
      affectedParts: ['Leaves', 'Whole Plant'],
      similarConditions: [
        {
          id: 'cotton-jassids-vs-potassium',
          name_en: 'Potassium Deficiency',
          name_te: 'పొటాష్ లోపం',
          isPathological: false,
          differentiatingFactors_en:
            'Jassid damage starts with downward leaf-margin curling (cupping) and yellowing before reddening, with small pale-green, sideways-moving insects visible on the leaf underside; potassium deficiency shows a more generalized interveinal/marginal yellowing-to-bronzing across the plant without the early downward cupping and without any insects present.',
          differentiatingFactors_te:
            'జాసిడ్ నష్టం ఆకు అంచులు కిందికి ముడుచుకోవడం (కప్పింగ్), ఎర్రబడటానికి ముందు పసుపు రంగుతో మొదలై, ఆకు అడుగున చిన్న లేత ఆకుపచ్చ, పక్కకు కదిలే పురుగులు కనిపిస్తాయి; పొటాష్ లోపం మొక్క అంతటా ఈనెల మధ్య/అంచు పసుపు-కంచు రంగు మార్పుగా మరింత సాధారణంగా కనిపిస్తుంది, తొలి కప్పింగ్ ఉండదు, పురుగులు ఉండవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Hot, dry weather with intermittent rain, and a gap between rains which favors jassid population buildup.',
        'Hairless or sparsely-haired (smooth-leaved) cotton varieties are generally more susceptible than hairy-leaved ones.',
        'Excessive nitrogen application, which promotes the lush, succulent growth jassids prefer.',
      ],
      environmentalRiskFactors_te: [
        'వేడి, పొడి వాతావరణం, అడపాదడపా వర్షాలు, వర్షాల మధ్య ఖాళీ కాలం జాసిడ్ సంఖ్య పెరగడానికి అనుకూలం.',
        'వెంట్రుకలు లేని లేదా తక్కువ వెంట్రుకలు గల (నునుపైన ఆకుల) పత్తి రకాలు సాధారణంగా వెంట్రుకలు ఎక్కువగా ఉన్న రకాల కంటే ఎక్కువగా తెగులుకు గురవుతాయి.',
        'అధిక నత్రజని వాడకం వల్ల జాసిడ్స్ ఇష్టపడే మెత్తని, లేత పెరుగుదల కలుగుతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Where available, grow a locally recommended hairy-leaved or jassid-tolerant variety, especially in fields with a history of repeated outbreaks.',
          practice_te: 'అందుబాటులో ఉంటే, ముఖ్యంగా పదేపదే ఉధృతి వచ్చిన పొలాల్లో, వెంట్రుకలు గల ఆకులు లేదా జాసిడ్ తట్టుకునే స్థానికంగా సిఫారసు చేసిన రకాన్ని వేయండి.',
          targetTiming: 'At variety selection, before sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid excessive nitrogen application, and scout the undersides of leaves regularly from the seedling stage onward rather than waiting for visible reddening.',
          practice_te: 'అధిక నత్రజని వాడకం మానండి; ఎరుపు కనిపించే వరకు వేచి ఉండకుండా, నారు దశ నుండే ఆకుల అడుగు భాగాన్ని క్రమం తప్పకుండా పరిశీలించండి.',
        },
        {
          stepNumber: 3,
          practice_en: 'Conserve natural enemies (spiders, ladybird beetles) by avoiding unnecessary broad-spectrum sprays early in the season.',
          practice_te: 'సీజన్ తొలిదశలో అనవసర విస్తృత-శ్రేణి పిచికారీలను నివారించడం ద్వారా సహజ శత్రువులను (సాలెపురుగులు, లేడీబర్డ్ బీటిల్స్) కాపాడండి.',
        },
      ],
      treatments: [
        {
          id: 't-cotton-jassid-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'Neem oil or Neem Seed Kernel Extract (NSKE) sprays are commonly used against jassids at early, low-density infestations, but a specific concentration is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'తొలిదశలో తక్కువ సాంద్రత ఉన్నప్పుడు జాసిడ్స్‌కు వ్యతిరేకంగా వేప నూనె లేదా వేప గింజల కషాయం పిచికారీ సాధారణంగా వాడతారు, కానీ ఖచ్చితమైన గాఢతను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Neem oil / NSKE (organic, dose unverified)',
          activeIngredient_te: 'వేప నూనె / వేప గింజల కషాయం (సేంద్రియ, మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Once leaves have already turned brittle and bronze-red, that damage does not reverse — treatment at that stage is about protecting the remaining healthy growth, not restoring damaged leaves.',
          safetyCaution_te: 'ఆకులు ఇప్పటికే పెళుసుగా, కంచు-ఎరుపు రంగులోకి మారిన తర్వాత ఆ నష్టం తిరిగిరాదు — ఆ దశలో చికిత్స లక్ష్యం మిగిలిన ఆరోగ్యకరమైన పెరుగుదలను కాపాడటమే, దెబ్బతిన్న ఆకులను బాగు చేయడం కాదు.',
        },
        {
          id: 't-cotton-jassid-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Systemic insecticides such as Acetamiprid, Thiamethoxam, or Flonicamid are commonly recommended against cotton jassids, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          instruction_te:
            'పత్తి జాసిడ్స్‌కు వ్యతిరేకంగా ఎసిటామిప్రిడ్, థయామిథాక్సామ్, లేదా ఫ్లోనికామిడ్ వంటి సిస్టమిక్ పురుగుమందులు సాధారణంగా సిఫారసు చేస్తారు, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Acetamiprid / Thiamethoxam / Flonicamid (dose suppressed)',
          activeIngredient_te: 'ఎసిటామిప్రిడ్ / థయామిథాక్సామ్ / ఫ్లోనికామిడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards. Spray coverage of the leaf underside matters, since that is where jassids actually feed.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి. జాసిడ్స్ నిజంగా ఆహారం తీసుకునే ఆకు అడుగు భాగానికి పిచికారీ బాగా తగలడం ముఖ్యం.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If downward curling and yellowing/reddening spreads to more than about 2-3 leaves per plant across a large share of the field, or appears early in the season on young plants, consult your VAA/RBK promptly.',
      escalationThreshold_te:
        'పొలంలో ఎక్కువ భాగం మొక్కలకు కిందికి ముడుచుకోవడం, పసుపు/ఎరుపు రంగు మార్పు ఒక్కో మొక్కకు 2-3 కంటే ఎక్కువ ఆకులకు వ్యాపించినా, లేదా సీజన్ తొలిదశలో లేత మొక్కలపై కనిపించినా, వెంటనే VAA/RBK ను సంప్రదించండి.',
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
      name_te: 'బ్యాక్టీరియా ఆకుమచ్చ తెగులు (కోణాకార మచ్చ / నల్ల చేయి తెగులు)',
      conditionCategory: 'disease',
      pathogenOrVector_en: 'Bacterium: Xanthomonas citri pv. malvacearum',
      pathogenOrVector_te: 'బ్యాక్టీరియా: జాంథోమోనాస్ సిట్రి పివి. మాల్వేసియారం',
      urgencyLevel: 'High',
      urgencyColor: 'red',
      observableSymptoms_en: [
        'Small, water-soaked, angular lesions on leaves, bound by the leaf veins (giving an "angular" shape rather than round), which dry to dark brown or black as they age.',
        'On stems and branches, elongated black streaks or lesions can appear and, in severe cases, girdle the stem — a phase often called "black arm" — causing the branch or whole plant to wilt and break.',
        'On bolls, small round, water-soaked, sunken black spots appear that can enlarge and lead to boll rot, premature opening, and stained/damaged lint.',
      ],
      observableSymptoms_te: [
        'ఆకులపై చిన్న, నీటిలో నానినట్లు కనిపించే, కోణాకార మచ్చలు ఈనెలతో ఆగి ఉంటాయి (గుండ్రంగా కాక కోణాకారంగా); ఇవి ముదిరే కొద్దీ ముదురు గోధుమ లేదా నల్ల రంగులోకి మారి ఆరిపోతాయి.',
        'కాండం, కొమ్మలపై పొడవైన నల్లని చారలు లేదా గాయాలు కనిపించవచ్చు; తీవ్రమైన సందర్భాల్లో ఇవి కాండాన్ని చుట్టుముట్టవచ్చు — దీన్ని తరచుగా "నల్ల చేయి" దశ అంటారు — దీనివల్ల కొమ్మ లేదా మొత్తం మొక్క వాడిపోయి విరిగిపోవచ్చు.',
        'కాయలపై చిన్న గుండ్రని, నీటిలో నానినట్లు కనిపించే, లోతైన నల్ల మచ్చలు కనిపిస్తాయి; ఇవి పెద్దవై కాయ కుళ్ళు, ముందస్తు పగిలిపోవడం, మరక పడిన/దెబ్బతిన్న దూదికి దారితీయవచ్చు.',
      ],
      affectedParts: ['Leaves', 'Stems', 'Bolls'],
      similarConditions: [
        {
          id: 'cotton-bacterialblight-vs-fungalspot',
          name_en: 'Fungal Leaf Spot (e.g. Alternaria/Grey Mildew)',
          name_te: 'శిలీంద్ర ఆకు మచ్చ (ఉదా. ఆల్టర్నేరియా/బూడిద బూజు)',
          isPathological: true,
          differentiatingFactors_en:
            'Bacterial blight lesions are angular and bound tightly by leaf veins, often with stem streaking/girdling and boll spotting on the same plant; common fungal leaf spots on cotton are more rounded, not vein-bound, and typically do not girdle the stem or rot the boll in the same way.',
          differentiatingFactors_te:
            'బ్యాక్టీరియా ఆకుమచ్చలో గాయాలు కోణాకారంగా, ఈనెలతో గట్టిగా ఆగి ఉంటాయి; తరచుగా అదే మొక్కపై కాండం చారలు/చుట్టుముట్టడం, కాయ మచ్చలు కూడా కనిపిస్తాయి; పత్తిలో సాధారణ శిలీంద్ర ఆకు మచ్చలు మరింత గుండ్రంగా, ఈనెలతో ఆగకుండా ఉండి, సాధారణంగా కాండాన్ని చుట్టుముట్టవు లేదా కాయను అదే విధంగా కుళ్ళించవు.',
        },
      ],
      environmentalRiskFactors_en: [
        'Wind-driven rain, which spreads the bacteria over distance and forces it into leaf wounds/stomata — outbreaks typically worsen fastest after storms.',
        'Infected or uncertified seed, which can carry the bacterium directly into a new planting.',
        'Dense planting and continuous cotton cultivation on the same land without rotation, which lets bacteria carried in crop debris build up over seasons.',
      ],
      environmentalRiskFactors_te: [
        'గాలితో కూడిన వర్షం బ్యాక్టీరియాను దూరం వరకు వ్యాపింపజేసి, ఆకు గాయాలు/రంధ్రాల్లోకి బలవంతంగా చేరుస్తుంది — తుఫానుల తర్వాత ఉధృతి వేగంగా పెరుగుతుంది.',
        'తెగులు సోకిన లేదా ధృవీకరించని విత్తనం బ్యాక్టీరియాను నేరుగా కొత్త పంటలోకి తీసుకురావచ్చు.',
        'దట్టంగా నాటడం, పంట మార్పిడి లేకుండా అదే భూమిలో నిరంతరం పత్తి పండించడం వల్ల పంట అవశేషాల్లో బ్యాక్టీరియా సీజన్ల తరబడి పేరుకుపోతుంది.',
      ],
      preventionGuidance: [
        {
          stepNumber: 1,
          practice_en: 'Use certified, disease-free seed from a trusted source — seed-borne infection is one of the main ways this bacterium enters a new field.',
          practice_te: 'నమ్మకమైన మూలం నుండి ధృవీకరించిన, తెగులు లేని విత్తనాన్ని వాడండి — విత్తనం ద్వారా వచ్చే తెగులు ఈ బ్యాక్టీరియా కొత్త పొలంలోకి ప్రవేశించే ప్రధాన మార్గాల్లో ఒకటి.',
          targetTiming: 'At sowing',
        },
        {
          stepNumber: 2,
          practice_en: 'Avoid working in the field or handling plants while foliage is wet, which can spread the bacteria mechanically between plants.',
          practice_te: 'ఆకులు తడిగా ఉన్నప్పుడు పొలంలో పనిచేయడం, మొక్కలను తాకడం మానండి — దీనివల్ల బ్యాక్టీరియా యాంత్రికంగా మొక్కల మధ్య వ్యాపించవచ్చు.',
        },
        {
          stepNumber: 3,
          practice_en: 'Remove and destroy crop debris after harvest rather than leaving it in the field, and rotate with a non-host crop for at least one season where field layout allows.',
          practice_te: 'కోత తర్వాత పంట అవశేషాలను పొలంలో వదలకుండా తీసి నాశనం చేయండి; వీలైతే కనీసం ఒక సీజన్ ఈ బ్యాక్టీరియాకు ఆశ్రయం ఇవ్వని పంటతో పంట మార్పిడి చేయండి.',
        },
      ],
      treatments: [
        {
          id: 't-cotton-bb-org-1',
          stepNumber: 1,
          category: 'organic',
          instruction_en:
            'A copper-based spray (e.g. copper oxychloride) is a commonly documented field approach against bacterial blight and is accepted in both organic and conventional programs, but a specific concentration/schedule is not confirmed from a primary source this session — confirm with your VAA/RBK.',
          instruction_te:
            'బ్యాక్టీరియా ఆకుమచ్చకు వ్యతిరేకంగా రాగి ఆధారిత పిచికారీ (ఉదా. కాపర్ ఆక్సీక్లోరైడ్) సాధారణంగా వాడే పొలం పద్ధతి, ఇది సేంద్రియ, సంప్రదాయ పద్ధతుల్లో రెండింటిలోనూ ఆమోదయోగ్యం, కానీ ఖచ్చితమైన గాఢత/షెడ్యూల్‌ను ఈ సెషన్ ధృవీకరించలేదు — VAA/RBK వద్ద నిర్ధారించుకోండి.',
          activeIngredient_en: 'Copper oxychloride (dose unverified)',
          activeIngredient_te: 'కాపర్ ఆక్సీక్లోరైడ్ (మోతాదు ధృవీకరించబడలేదు)',
          safetyCaution_en: 'Copper sprays protect new growth from fresh infection but do not cure tissue already showing lesions — removing severely infected plant debris alongside spraying matters as much as the spray itself.',
          safetyCaution_te: 'రాగి పిచికారీలు కొత్త పెరుగుదలను కొత్త తెగులు నుండి కాపాడతాయి కానీ ఇప్పటికే గాయాలున్న కణజాలాన్ని నయం చేయవు — పిచికారీతో పాటు తీవ్రంగా సోకిన మొక్క అవశేషాలను తొలగించడం కూడా అంతే ముఖ్యం.',
        },
        {
          id: 't-cotton-bb-chem-1',
          stepNumber: 2,
          category: 'chemical',
          instruction_en:
            'Streptocycline (a streptomycin-based bactericide) combined with copper spray is sometimes used against severe bacterial blight outbreaks in cotton, but a specific dose is suppressed here — this session could not confirm a current CIBRC-registered figure. Do not spray from memory.',
          instruction_te:
            'పత్తిలో తీవ్రమైన బ్యాక్టీరియా ఆకుమచ్చ వ్యాప్తికి వ్యతిరేకంగా కొన్నిసార్లు స్ట్రెప్టోసైక్లిన్ (స్ట్రెప్టోమైసిన్ ఆధారిత బాక్టీరిసైడ్)ను రాగి పిచికారీతో కలిపి వాడతారు, కానీ మోతాదు ఇక్కడ నిలిపివేయబడింది — ఈ సెషన్ ప్రస్తుత CIBRC నమోదైన అంకెను ధృవీకరించలేకపోయింది. గుర్తు ఆధారంగా పిచికారీ చేయవద్దు.',
          activeIngredient_en: 'Streptocycline + Copper oxychloride (dose suppressed)',
          activeIngredient_te: 'స్ట్రెప్టోసైక్లిన్ + కాపర్ ఆక్సీక్లోరైడ్ (మోతాదు నిలిపివేయబడింది)',
          safetyCaution_en:
            'Wear protective gloves and a mask during spray preparation, do not spray against the wind, and wash hands and equipment thoroughly afterwards.',
          safetyCaution_te:
            'మందు కలిపేటప్పుడు చేతి తొడుగులు, మాస్క్ ధరించండి; గాలికి ఎదురుగా పిచికారీ చేయవద్దు; పని ముగిసిన తరువాత చేతులను, పరికరాలను బాగా శుభ్రం చేసుకోండి.',
          regulatoryNotice_en:
            'Confirm the exact product, dose, and current pre-harvest interval with your VAA/RBK and check your container label before spraying.',
          regulatoryNotice_te:
            'పిచికారీకి ముందు ఖచ్చితమైన మందు, మోతాదు, ప్రస్తుత నిరీక్షణ వ్యవధిని VAA/RBK వద్ద నిర్ధారించుకుని, మందు డబ్బా లేబుల్‌ను కూడా చూసుకోండి.',
        },
      ],
      escalationThreshold_en:
        'If stem streaking/girdling ("black arm") appears on multiple plants, or boll spotting affects more than about 10% of bolls, consult your VAA/RBK promptly, since this disease can spread quickly after wind-driven rain.',
      escalationThreshold_te:
        'అనేక మొక్కలపై కాండం చారలు/చుట్టుముట్టడం ("నల్ల చేయి") కనిపించినా, లేదా 10% కంటే ఎక్కువ కాయలకు మచ్చలు కనిపించినా, వెంటనే VAA/RBK ను సంప్రదించండి — గాలితో కూడిన వర్షం తర్వాత ఈ తెగులు వేగంగా వ్యాపించగలదు.',
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
  },
};
