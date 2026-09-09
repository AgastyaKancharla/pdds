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
  noHistory: { en: 'No scans yet. Scan a crop to get started.', te: 'ఇంకా స్కాన్‌లు లేవు. ప్రారంభించడానికి ఒక పంటను స్కాన్ చేయండి.' },
  loading: { en: 'Loading…', te: 'లోడ్ అవుతోంది…' },
  errorGeneric: { en: 'Something went wrong. Please try again.', te: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.' },
  uploadImage: { en: 'Upload Image / File', te: 'చిత్రం / ఫైల్ అప్‌లోడ్ చేయండి' },
  testSample: { en: 'Test with Sample Crop', te: 'నమూనా పంటతో పరీక్షించండి' },
  cameraUnavailable: { en: 'Camera unavailable or permission needed', te: 'కెమెరా అందుబాటులో లేదు లేదా అనుమతి అవసరం' },
  cameraUnavailableDesc: {
    en: 'No camera? You can still upload a crop picture or test with our sample image instantly.',
    te: 'కెమెరా లేదా? మీరు పంట చిత్రాన్ని అప్‌లోడ్ చేయవచ్చు లేదా నమూనా చిత్రంతో వెంటనే పరీక్షించవచ్చు.',
  },
  backToHome: { en: 'Back to Home', te: 'హోమ్‌కి తిరిగి వెళ్ళండి' },
} as const;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey, language: Language): string {
  return translations[key][language];
}
