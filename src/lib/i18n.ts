export type Language = 'en' | 'te';

export const translations = {
  appName: { en: 'HereForNature', te: 'హియర్‌ఫర్‌నేచర్' },
  poweredBy: { en: 'Powered by AgastyaOne', te: 'AgastyaOne ద్వారా అందించబడింది' },
  tagline: { en: 'AI crop doctor for AP farmers', te: 'AP రైతుల కోసం AI పంట వైద్యుడు' },
  scanNow: { en: 'Scan Crop', te: 'పంటను స్కాన్ చేయండి' },
  history: { en: 'History', te: 'చరిత్ర' },
  home: { en: 'Home', te: 'హోమ్' },
  english: { en: 'English', te: 'ఇంగ్లీష్' },
  telugu: { en: 'Telugu', te: 'తెలుగు' },
  takePhoto: { en: 'Take Photo', te: 'ఫోటో తీయండి' },
  chooseFromGallery: { en: 'Choose from Gallery', te: 'గ్యాలరీ నుండి ఎంచుకోండి' },
  retake: { en: 'Retake', te: 'మళ్లీ తీయండి' },
  analyzing: { en: 'Analyzing your crop…', te: 'మీ పంటను విశ్లేషిస్తోంది…' },
  cameraPermissionNeeded: {
    en: 'Camera access is needed to scan crops.',
    te: 'పంటలను స్కాన్ చేయడానికి కెమెరా అనుమతి అవసరం.',
  },
  grantPermission: { en: 'Grant Permission', te: 'అనుమతి ఇవ్వండి' },
  crop: { en: 'Crop', te: 'పంట' },
  disease: { en: 'Disease', te: 'వ్యాధి' },
  symptoms: { en: 'Symptoms', te: 'లక్షణాలు' },
  confidence: { en: 'Confidence', te: 'విశ్వసనీయత' },
  actToday: { en: 'Act Today!', te: 'ఈరోజే చర్య తీసుకోండి!' },
  monitor: { en: 'Monitor', te: 'పరిశీలించండి' },
  healthy: { en: 'Healthy', te: 'ఆరోగ్యంగా ఉంది' },
  apTip: { en: 'AP Farmer Tip', te: 'AP రైతు చిట్కా' },
  organic: { en: 'Organic', te: 'సేంద్రియ' },
  chemical: { en: 'Chemical', te: 'రసాయన' },
  preventive: { en: 'Preventive', te: 'నివారణ' },
  noTreatments: { en: 'No treatment steps found.', te: 'చికిత్స సూచనలు కనుగొనబడలేదు.' },
  saveToHistory: { en: 'Save to History', te: 'చరిత్రలో సేవ్ చేయండి' },
  saved: { en: 'Saved', te: 'సేవ్ చేయబడింది' },
  shareWhatsApp: { en: 'Share to WhatsApp', te: 'WhatsAppలో పంచుకోండి' },
  scanAnother: { en: 'Scan Another', te: 'మరొకటి స్కాన్ చేయండి' },
  noHistory: {
    en: 'No scans yet. Scan a crop to get started.',
    te: 'ఇంకా స్కాన్‌లు లేవు. ప్రారంభించడానికి ఒక పంటను స్కాన్ చేయండి.',
  },
  loading: { en: 'Loading…', te: 'లోడ్ అవుతోంది…' },
  errorGeneric: {
    en: 'Something went wrong. Please try again.',
    te: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
  },
  uploadImage: { en: 'Upload Image / File', te: 'చిత్రం / ఫైల్ అప్‌లోడ్ చేయండి' },
  testSample: { en: 'Test with Sample Crop', te: 'నమూనా పంటతో పరీక్షించండి' },
  cameraUnavailable: {
    en: 'Camera unavailable or permission needed',
    te: 'కెమెరా అందుబాటులో లేదు లేదా అనుమతి అవసరం',
  },
  cameraUnavailableDesc: {
    en: 'No camera? You can still upload a crop picture or test with our sample image instantly.',
    te: 'కెమెరా లేదా? మీరు పంట చిత్రాన్ని అప్‌లోడ్ చేయవచ్చు లేదా నమూనా చిత్రంతో వెంటనే పరీక్షించవచ్చు.',
  },
  aiScanningPausedBanner: {
    en: 'Live AI diagnosis is temporarily paused. Taking a photo below will not return a result right now — try the sample scan, or visit your Rythu Bharosa Kendra (RBK) for an in-person check.',
    te: 'ప్రత్యక్ష AI నిర్ధారణ తాత్కాలికంగా నిలిపివేయబడింది. ఇప్పుడు ఫోటో తీసినా ఫలితం రాదు — నమూనా స్కాన్ ప్రయత్నించండి, లేదా ప్రత్యక్ష తనిఖీ కోసం మీ రైతు భరోసా కేంద్రం (RBK) ని సందర్శించండి.',
  },
  backToHome: { en: 'Back to Home', te: 'హోమ్‌కి తిరిగి వెళ్ళండి' },
  privacyAndTerms: { en: 'Privacy & Terms', te: 'గోప్యత & నిబంధనలు' },
  cropNotDetected: { en: 'Crop Not Detected', te: 'పంట గుర్తించబడలేదు' },
  cropNotDetectedTitle: { en: 'No Crop or Disease Found', te: 'పంట లేదా తెగులు కనుగొనబడలేదు' },
  unrecognizedImage: { en: 'Unrecognized Image', te: 'గుర్తించబడని చిత్రం' },
  notCropDesc: {
    en: 'The uploaded image appears to be a logo, graphic, or non-crop image. HereForNature analyzes agricultural crops and plant leaves. Please upload or take a clear photo of your crop.',
    te: 'అప్‌లోడ్ చేసిన చిత్రం లోగో లేదా పంట కాని చిత్రంగా కనిపిస్తోంది. హియర్‌ఫర్‌నేచర్ వ్యవసాయ పంటలు మరియు ఆకులను మాత్రమే విశ్లేషిస్తుంది. దయచేసి పంట లేదా ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.',
  },
  unclearDesc: {
    en: 'Unable to identify any crop or plant disease from this picture. Please ensure the image is clear, focused on the leaf or plant, and taken in good lighting.',
    te: 'ఈ చిత్రం నుండి ఏ పంట లేదా తెగులును గుర్తించలేకపోయాము. దయచేసి ఆకు లేదా మొక్కపై దృష్టి పెట్టి మంచి వెలుతురులో స్పష్టమైన ఫోటో తీయండి.',
  },
  tipsTitle: { en: 'Photo Guidelines for Farmers', te: 'రైతుల కోసం ఫోటో సూచనలు' },
  tipLeaf: {
    en: 'Take a close-up photo of the affected leaf, stem, or fruit.',
    te: 'తెగులు సోకిన ఆకు, కాండం లేదా కాయను దగ్గరగా ఫోటో తీయండి.',
  },
  tipLight: {
    en: 'Use clear, natural daylight. Avoid dark, blurry, or overexposed shots.',
    te: 'మంచి సహజ వెలుతురులో తీయండి. చీకటి లేదా అస్పష్టమైన ఫోటోలను నివారించండి.',
  },
  tipNoLogos: {
    en: 'Only capture real plants. Avoid logos, documents, screens, or non-crop objects.',
    te: 'నిజమైన పంటలను మాత్రమే ఫోటో తీయండి. లోగోలు, పత్రాలు లేదా ఇతర వస్తువులను నివారించండి.',
  },
  trySampleCrop: { en: 'Test with Sample Crop', te: 'నమూనా పంటతో పరీక్షించండి' },
  switchCrop: { en: 'Switch AP Crop', te: 'AP పంటను మార్చండి' },
  selectCropHint: {
    en: 'Diagnosed another crop? Switch here to view remedies:',
    te: 'మరొక పంట కోసం నివారణలు చూడాలా? ఇక్కడ మార్చండి:',
  },
  selectConditionHint: {
    en: 'This crop has several known conditions. Compare them here:',
    te: 'ఈ పంటకు తెలిసిన సమస్యలు చాలా ఉన్నాయి. వాటిని ఇక్కడ పోల్చి చూడండి:',
  },
  nonPathogenicChipTag: { en: 'not a disease', te: 'తెగులు కాదు' },
  captureGuidanceTitle: { en: 'What to photograph for a clearer answer', te: 'స్పష్టమైన సమాధానం కోసం ఏమి ఫోటో తీయాలి' },
  captureGuidanceWhy: { en: 'Why this view:', te: 'ఈ కోణం ఎందుకు:' },
  captureRequiredNotice: {
    en: 'This condition cannot be confirmed from a normal leaf or canopy photo alone. Until the view above is photographed, treat the result as a possibility, not a confirmed diagnosis.',
    te: 'ఈ సమస్యను సాధారణ ఆకు లేదా పంట ఫోటో ద్వారా మాత్రమే నిర్ధారించలేము. పైన చెప్పిన కోణాన్ని ఫోటో తీసే వరకు, ఈ ఫలితాన్ని నిర్ధారణగా కాకుండా ఒక అవకాశంగా మాత్రమే పరిగణించండి.',
  },
  fieldFollowUpsTitle: { en: 'Check these in the field', te: 'పొలంలో వీటిని పరిశీలించండి' },
  fieldFollowUpsIntro: {
    en: 'A photograph cannot settle these. Checking them yourself is what separates this condition from the look-alikes above.',
    te: 'వీటిని ఫోటో ద్వారా తేల్చలేము. మీరే స్వయంగా పరిశీలించడం ద్వారానే ఈ సమస్యను పైన చెప్పిన పోలిక సమస్యల నుండి వేరు చేయగలరు.',
  },
  followUpIfYes: { en: 'If yes:', te: 'అవును అయితే:' },
  followUpIfNo: { en: 'If no:', te: 'కాదు అయితే:' },
  severityTitle: { en: 'How bad is it, and is treatment worth it?', te: 'ఎంత తీవ్రంగా ఉంది, చికిత్స చేయడం విలువైనదేనా?' },
  severityMild: { en: 'Mild', te: 'స్వల్పం' },
  severityModerate: { en: 'Moderate', te: 'మధ్యస్థం' },
  severitySevere: { en: 'Severe', te: 'తీవ్రం' },
  nonPathogenicNoChemicalTitle: { en: 'No pesticide applies to this condition', te: 'ఈ సమస్యకు పురుగు మందు పనికిరాదు' },
  nonPathogenicNoChemicalBody: {
    en: 'This is not caused by a pest or a pathogen, so no fungicide or insecticide can correct it. Spraying would add cost, risk scorching already-stressed leaves, and leave the real cause untreated while the crop keeps declining. See the Preventive tab for the corrective steps that do apply.',
    te: 'దీనికి కారణం పురుగు లేదా తెగులు కాదు, కాబట్టి ఏ శిలీంద్రనాశకం లేదా పురుగు మందూ దీన్ని సరిదిద్దలేదు. పిచికారీ చేస్తే ఖర్చు పెరుగుతుంది, అప్పటికే ఒత్తిడిలో ఉన్న ఆకులు మాడే ప్రమాదం ఉంది, అసలు కారణం అలాగే ఉండిపోయి పంట క్షీణిస్తూనే ఉంటుంది. వర్తించే సరిదిద్దే చర్యల కోసం నివారణ టాబ్ చూడండి.',
  },
  healthyCropTitle: { en: 'Crop Appears Healthy', te: 'పంట ఆరోగ్యంగా కనిపిస్తోంది' },
  healthyCropDesc: {
    en: 'Great news! No severe disease or pest damage was detected. Continue standard agronomic practices, balanced nutrient application, and regular field monitoring.',
    te: 'శుభవార్త! తీవ్రమైన తెగులు లేదా వ్యాధి లక్షణాలు కనిపించలేదు. ప్రామాణిక సాగు పద్ధతులు, సమతుల్య పోషకాల వినియోగం మరియు సాధారణ క్షేత్ర పర్యవేక్షణను కొనసాగించండి.',
  },
  unsupportedCropTitle: { en: 'Crop Not in Database', te: 'పంట డేటాబేస్ లో లేదు' },
  unsupportedCropDesc: {
    en: 'We detected this crop, but its disease remedies are not yet cataloged in our AP agricultural database. Please contact your local Rythu Bharosa Kendra (RBK) or agricultural extension officer.',
    te: 'మేము ఈ పంటను గుర్తించాము, కానీ దీని నివారణలు మా AP వ్యవసాయ డేటాబేస్ లో ఇంకా చేర్చబడలేదు. దయచేసి మీ స్థానిక రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ అధికారిని సంప్రదించండి.',
  },
  disclaimerTitle: { en: 'Agricultural Advisory Disclaimer', te: 'వ్యవసాయ సలహా గమనిక' },
  disclaimerText: {
    en: 'HereForNature provides AI-assisted preliminary diagnostics. Please verify dosages and local regulations with your local Rythu Bharosa Kendra (RBK) or Agricultural Extension Officer before chemical spray application.',
    te: 'హియర్‌ఫర్‌నేచర్ AI-ఆధారిత ప్రాథమిక సమాచారాన్ని అందిస్తుంది. రసాయన మందులను పిచికారీ చేయడానికి ముందు మోతాదులను మీ స్థానిక రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ అధికారితో ధృవీకరించుకోండి.',
  },
  offlineAiNotice: {
    en: 'Cloud AI diagnosis is currently running in local offline safety mode. Connect to the internet for complete multi-crop pathology analysis.',
    te: 'క్లౌడ్ AI విశ్లేషణ ప్రస్తుతం లోకల్ మోడ్‌లో నడుస్తోంది. పూర్తి బహుళ-పంట రోగ నిర్ధారణ కోసం ఇంటర్నెట్‌కి కనెక్ట్ అవ్వండి.',
  },
  lookalikesTitle: {
    en: 'Similar-Looking Conditions & Differential Diagnosis',
    te: 'సారూప్య లక్షణాలు & ఇతర కారణాలు',
  },
  lookalikeDifferentiatingFactor: {
    en: 'Key Differentiating Factor:',
    te: 'ముఖ్యమైన తేడా:',
  },
  riskFactorsTitle: {
    en: 'Environmental & Management Risk Factors',
    te: 'వాతావరణ & నిర్వహణ ముప్పులు',
  },
  preventionTitle: {
    en: 'Field Prevention & Cultural Practices',
    te: 'ముందస్తు నివారణ & సాగు పద్ధతులు',
  },
  escalationTitle: {
    en: 'Expert Escalation Advice (RBK / Extension)',
    te: 'వ్యవసాయ నిపుణుడి సలహా (రైతు భరోసా కేంద్రం)',
  },
  knowledgeSourceTitle: {
    en: 'Agricultural Authority References',
    te: 'వ్యవసాయ పరిశోధనా మూలాలు',
  },
  sourceHomepageOnlyDisclosure: {
    en: 'Links to the organization\'s website; the specific document, page, or label section has not yet been located and verified.',
    te: 'ఈ లింక్ సంస్థ వెబ్‌సైట్‌కు మాత్రమే వెళుతుంది; నిర్దిష్ట పత్రం, పేజీ లేదా లేబుల్ భాగం ఇంకా కనుగొని ధృవీకరించలేదు.',
  },
  sourceSectionLabel: {
    en: 'Section',
    te: 'భాగం',
  },
  evidenceStatusVerified: {
    en: 'Verified Agricultural Reference',
    te: 'ధృవీకరించబడిన వ్యవసాయ సమాచారం',
  },
  evidenceStatusProvisional: {
    en: 'Provisional Reference (Field Review Ongoing)',
    te: 'తాత్కాలిక పరిశీలన (క్షేత్ర సమీక్ష జరుగుతోంది)',
  },
  evidenceStatusDemo: {
    en: 'Demonstration Sample Only',
    te: 'నమూనా ప్రదర్శన మాత్రమే',
  },
  pesticideSafetyWarning: {
    en: 'Statutory Safety Notice: Check approved product label. Wear personal protective equipment (PPE) and verify dosage and waiting period with Village Agriculture Assistant / RBK.',
    te: 'చట్టబద్ధమైన హెచ్చరిక: ఉత్పత్తి లేబుల్ సూచనలను పాటించండి. రక్షణ దుస్తులు ధరించండి, మోతాదును గ్రామ వ్యవసాయ సహాయకుడు / RBK తో ధృవీకరించుకోండి.',
  },
  offlineModeBadge: {
    en: 'Offline Reference Guide',
    te: 'ఆఫ్‌లైన్ సమాచార గైడ్',
  },
  offlineModeNotice: {
    en: 'Viewing bundled agricultural knowledge guide. This is educational reference information from ANGRAU & ICAR, not an automated live image diagnosis.',
    te: 'ఆఫ్‌లైన్ వ్యవసాయ మార్గదర్శిని చూస్తున్నారు. ఇది ANGRAU & ICAR ఆధారిత సమాచారం, ప్రత్యక్ష చిత్ర విశ్లేషణ కాదు.',
  },
  pathogenLabel: {
    en: 'Causal Organism / Pathogen:',
    te: 'తెగులు కారకం:',
  },
  differentialPestDisease: {
    en: 'Pest / Pathogen',
    te: 'తెగులు / పురుగు',
  },
  differentialAbioticNutrient: {
    en: 'Nutrient / Abiotic Factor',
    te: 'పోషక లోపం / వాతావరణ కారణం',
  },
  activeIngredientLabel: {
    en: 'Active Ingredient:',
    te: 'రసాయన భాగం:',
  },
  safetyCautionLabel: {
    en: 'Safety Caution:',
    te: 'భద్రతా జాగ్రత్త:',
  },
  regulatoryGuidanceLabel: {
    en: 'Regulatory Guidance:',
    te: 'చట్టబద్ధమైన మార్గదర్శకం:',
  },
  claimEvidenceLimitationLabel: {
    en: 'Evidence Note:',
    te: 'ఆధారాల గమనిక:',
  },
  noCategoryRecommendation: {
    en: 'No specific recommendation is currently cataloged for this category. Refer to prevention practices or consult your local agricultural authority / Rythu Bharosa Kendra (RBK).',
    te: 'ఈ విభాగానికి సంబంధించి ప్రస్తుతానికి నిర్దిష్ట సిఫార్సులు నమోదు కాలేదు. క్షేత్ర నివారణ పద్ధతులను చూడండి లేదా మీ స్థానిక రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి.',
  },
  seePreventionPracticesAbove: {
    en: 'See documented Field Prevention & Cultural Practices above.',
    te: 'పైనున్న క్షేత్ర నివారణ & సాగు పద్ధతులను పరిశీలించండి.',
  },
  differentialUnderReview: {
    en: 'Differential diagnostic comparison is currently under review for this condition. Please consult your local Rythu Bharosa Kendra (RBK) or Agricultural Extension Officer for verification.',
    te: 'ఈ పరిస్థితికి సంబంధించిన సారూప్య లక్షణాల పోలిక సమీక్షలో ఉంది. నిర్ధారణ కోసం మీ స్థానిక రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
  },
  pestOrganismLabel: {
    en: 'Target Pest / Causative Agent:',
    te: 'కీటకం / పురుగు కారకం:',
  },
  insectPest: {
    en: 'Insect Pest',
    te: 'కీటక పురుగు',
  },
  plantDisease: {
    en: 'Plant Disease',
    te: 'మొక్క తెగులు',
  },
  viralDisease: {
    en: 'Viral Disease',
    te: 'వైరస్ తెగులు',
  },
  demoNotice: {
    en: 'Demonstration Sample — Illustrative Preview Only. Not a live field diagnosis or certified recommendation.',
    te: 'నమూనా ప్రదర్శన — సూచనార్థం మాత్రమే. ప్రత్యక్ష క్షేత్ర విశ్లేషణ లేదా ధృవీకరించిన సిఫార్సు కాదు.',
  },
  unsupportedTreatmentNotice: {
    en: 'This condition does not have verified treatment instructions cataloged. Please consult your local Rythu Bharosa Kendra (RBK).',
    te: 'ఈ పరిస్థితికి ధృవీకరించబడిన నివారణ మార్గదర్శకాలు నమోదు కాలేదు. దయచేసి స్థానిక రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి.',
  },
  suppressedChemicalNotice: {
    en: 'Chemical pesticide recommendations for this condition are suppressed pending primary CIBRC / University label validation. Consult your Village Agriculture Assistant (VAA) at Rythu Bharosa Kendra (RBK).',
    te: 'ఈ పరిస్థితికి సంబంధించిన రసాయన మందుల సిఫార్సులు CIBRC / విశ్వవిద్యాలయ లేబుల్ పరిశీలనలో ఉన్నందున నిలిపివేయబడ్డాయి. మీ రైతు భరోసా కేంద్రం (RBK) వ్యవసాయ సహాయకుడిని సంప్రదించండి.',
  },
  cachedResultBadge: {
    en: 'Cached Diagnosis',
    te: 'కాష్ చేయబడిన నిర్ధారణ',
  },
  cachedResultNotice: {
    en: 'Displaying previously saved diagnosis result. Not a newly completed scan.',
    te: 'గతంలో సేవ్ చేయబడిన నిర్ధారణ ఫలితం చూపబడుతోంది. ఇది కొత్తగా చేసిన స్కాన్ కాదు.',
  },
  cachedResultDate: {
    en: 'Saved on:',
    te: 'సేవ్ చేసిన సమయం:',
  },
  offlineKnowledgeNotice: {
    en: 'Viewing locally cached agricultural knowledge guide. Available offline without network connection.',
    te: 'స్థానికంగా కాష్ చేయబడిన వ్యవసాయ సమాచార గైడ్ చూపబడుతోంది. నెట్‌వర్క్ లేకుండా ఆఫ్‌లైన్‌లో అందుబాటులో ఉంది.',
  },
  offlineCacheMiss: {
    en: 'Information is not available in local cache. Please connect to the internet to load.',
    te: 'ఈ సమాచారం స్థానిక కాష్‌లో ఆఫ్‌లైన్‌లో అందుబాటులో లేదు. దయచేసి ఇంటర్నెట్‌కి కనెక్ట్ అవ్వండి.',
  },
  offlineInferenceUnavailable: {
    en: 'Live AI diagnosis requires an active network connection. Please connect to the internet or test with a sample crop.',
    te: 'ప్రత్యక్ష AI నిర్ధారణకు ఇంటర్నెట్ కనెక్షన్ అవసరం. దయచేసి ఇంటర్నెట్‌కి కనెక్ట్ అవ్వండి లేదా నమూనా పంటతో పరీక్షించండి.',
  },
  savedLocally: {
    en: 'Saved Locally (Not Uploaded)',
    te: 'స్థానికంగా సేవ్ చేయబడింది (అప్‌లోడ్ కాలేదు)',
  },
  savedLocallyDesc: {
    en: 'Saved locally on this device. This scan remains on this browser and is not automatically uploaded to cloud.',
    te: 'ఈ పరికరంలో మాత్రమే స్థానికంగా సేవ్ చేయబడింది. ఈ స్కాన్ ఈ బ్రౌజర్‌లో మాత్రమే ఉంటుంది మరియు క్లౌడ్‌కి ఆటోమేటిక్‌గా అప్‌లోడ్ చేయబడదు.',
  },
  savedCloudNoProvenance: {
    en: '✓ Saved to Cloud (Provenance Not Recorded)',
    te: '✓ క్లౌడ్‌కి సేవ్ చేయబడింది (మూల వివరాలు నమోదు కాలేదు)',
  },
  savedCloudNoProvenanceDesc: {
    en: 'This scan was uploaded to the cloud, but the server database could not store its diagnostic provenance (AI-preliminary / demo / legacy) tag. Treat this record as unverified provenance history.',
    te: 'ఈ స్కాన్ క్లౌడ్‌కి అప్‌లోడ్ చేయబడింది, కానీ సర్వర్ డేటాబేస్ దీని నిర్ధారణ మూల (AI-ప్రాథమిక / డెమో / పాత) ట్యాగ్‌ను నిల్వ చేయలేకపోయింది. ఈ రికార్డును అనిర్దిష్ట మూలంగా పరిగణించండి.',
  },
  saveFailed: {
    en: 'Save Failed — Retry',
    te: 'సేవ్ విఫలమైంది — మళ్లీ ప్రయత్నించండి',
  },
  saveFailedDesc: {
    en: 'Could not save scan to storage. Tap to try again.',
    te: 'స్కాన్‌ను నిల్వలో సేవ్ చేయడం విఫలమైంది. మళ్లీ ప్రయత్నించడానికి నొక్కండి.',
  },
  resetGuestSession: {
    en: 'Reset Guest Session',
    te: 'గెస్ట్ సెషన్‌ను రీసెట్ చేయండి',
  },
  confirmResetGuestSession: {
    en: 'Are you sure you want to clear your local guest scan history and cache? This cannot be undone.',
    te: 'మీరు ఖచ్చితంగా స్థానిక గెస్ట్ స్కాన్ చరిత్రను మరియు కాష్‌ను తొలగించాలనుకుంటున్నారా? దీన్ని రద్దు చేయలేరు.',
  },
  cancel: {
    en: 'Cancel',
    te: 'రద్దు చేయి',
  },
  confirmReset: {
    en: 'Yes, Reset Session',
    te: 'అవును, సెషన్‌ను రీసెట్ చేయి',
  },
  guestSessionResetSuccess: {
    en: 'Guest session and history have been cleared.',
    te: 'గెస్ట్ సెషన్ మరియు చరిత్ర తొలగించబడ్డాయి.',
  },
  abioticStressTitle: {
    en: 'Abiotic Stress / Environmental Disorder',
    te: 'పర్యావరణ ఒత్తిడి / వాతావరణ రుగ్మత',
  },
  abioticStressDesc: {
    en: 'Symptoms suggest environmental, weather, or physiological stress rather than an infectious pathogen. Do not apply chemical pesticides or fungicides. Review irrigation, drainage, and field management.',
    te: 'ఈ లక్షణాలు సంక్రమణ వ్యాధి కాకుండా వాతావరణ, నీటి లేదా శరీరధర్మ ఒత్తిడిని సూచిస్తున్నాయి. రసాయన మందులు లేదా శిలీంద్రనాశకాలను వాడవద్దు. నీటి పారుదల, ఎండ తీవ్రతను సమీక్షించండి.',
  },
  nutrientDeficiencyTitle: {
    en: 'Nutrient Deficiency Suspected',
    te: 'పోషక లోపం అనుమానించబడింది',
  },
  nutrientDeficiencyDesc: {
    en: 'Leaf symptoms indicate potential mineral or micronutrient deficiency rather than a fungal or bacterial infection. Chemical fungicides will not resolve this condition. Perform a soil or leaf tissue test or consult RBK for fertilizer guidance.',
    te: 'ఈ ఆకు లక్షణాలు శిలీంద్ర లేదా బ్యాక్టీరియా తెగులు కాకుండా ఖనిజ లేదా సూక్ష్మపోషక లోపాన్ని సూచిస్తున్నాయి. రసాయన శిలీంద్రనాశకాలు దీనికి పరిష్కారం కావు. నేల లేదా ఆకు పరీక్ష చేయించండి లేదా RBK ని సంప్రదించండి.',
  },
  aiPreliminaryHypothesisBadge: {
    en: 'Preliminary AI Observation',
    te: 'ప్రాథమిక AI పరిశీలన',
  },
  aiPreliminaryHypothesisNotice: {
    en: 'Automated AI visual analysis. This is a preliminary field hypothesis, not a laboratory-confirmed diagnosis.',
    te: 'ఆటోమేటెడ్ AI దృశ్య విశ్లేషణ. ఇది ప్రాథమిక క్షేత్ర అంచనా మాత్రమే, ప్రయోగశాల ద్వారా ధృవీకరించబడిన వ్యాధి నిర్ధారణ కాదు.',
  },
  curatedReferenceBadge: {
    en: 'Curated Literature Reference',
    te: 'పరిశోధనా సూచిక సమాచారం',
  },
  chemicalConsultOfficerWarning: {
    en: 'Crucial: Never apply chemical pesticides without physical symptom confirmation by your Village Agriculture Assistant (VAA) or Rythu Bharosa Kendra (RBK).',
    te: 'ముఖ్య గమనిక: గ్రామ వ్యవసాయ సహాయకుడు (VAA) లేదా రైతు భరోసా కేంద్రం (RBK) ద్వారా క్షేత్ర నిర్ధారణ లేకుండా ఎటువంటి రసాయన మందులను పిచికారీ చేయవద్దు.',
  },
  visualObservationsTitle: {
    en: 'AI Visual Symptom Observations',
    te: 'AI గుర్తించిన దృశ్య లక్షణాలు',
  },
  differentialHypothesesTitle: {
    en: 'Differential Considerations (Alternative Explanations)',
    te: 'ఇతర ప్రత్యామ్నాయ అనుమానాలు',
  },
  legacyRecordBadge: {
    en: 'Legacy Record (Unspecified Provenance)',
    te: 'పాత రికార్డు (అనిర్దిష్ట మూలం)',
  },
  legacyRecordNotice: {
    en: 'This record was saved under an earlier version without verified diagnostic provenance metadata. Treat as an unverified historical note.',
    te: 'ఈ రికార్డు నిర్ధారిత మూల డేటా లేని పాత వెర్షన్‌లో సేవ్ చేయబడింది. దీనిని ధృవీకరించబడని మునుపటి సమాచారంగా పరిగణించండి.',
  },
  expertConfirmedBadge: {
    en: 'Expert Confirmed Diagnosis',
    te: 'నిపుణులు ధృవీకరించిన రోగనిర్ధారణ',
  },
  expertConfirmedNotice: {
    en: 'This diagnosis has been physically reviewed and confirmed by an accredited agricultural scientist or extension authority.',
    te: 'ఈ రోగనిర్ధారణను గుర్తింపు పొందిన వ్యవసాయ శాస్త్రవేత్త లేదా విస్తరణ అధికారి ప్రత్యక్షంగా సమీక్షించి ధృవీకరించారు.',
  },
  healthyFoliageObservationNotice: {
    en: 'Visual foliar observation only. Image screening cannot assess root conditions, soil-borne pathogens, systemic vascular wilt, or latent viral incubation. Continue regular crop scouting.',
    te: 'దృశ్య ఆకుల పరిశీలన మాత్రమే. ఫోటో స్క్రీనింగ్ ద్వారా వేరు సమస్యలు, నేల ద్వారా వ్యాపించే తెగుళ్లు లేదా అంతర్గత సంక్రమణలను గుర్తించలేము. పంట పర్యవేక్షణ కొనసాగించండి.',
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey | string, language: Language): string {
  const item = (translations as Record<string, Record<Language, string>>)[key];
  if (!item) return String(key);
  return item[language] || item.en || String(key);
}
