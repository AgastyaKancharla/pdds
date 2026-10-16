import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyScreenProps {
  onBack: () => void;
}

interface Section {
  heading: { en: string; te: string };
  body: { en: string; te: string }[];
}

/**
 * Describes only what this app actually does, checked against the real code (src/lib/auth.ts,
 * storage.ts, supabase.ts) rather than written generically: fully anonymous accounts (no name/
 * phone/email ever collected), crop photos + scan results stored privately per account, and an
 * honest note that live AI diagnosis is currently paused. Update this file if that changes.
 */
const PRIVACY_SECTIONS: Section[] = [
  {
    heading: { en: 'What we collect', te: 'మేము సేకరించే సమాచారం' },
    body: [
      {
        en: 'Photos of crops/leaves you take or upload, and the scan result (crop, condition, date). These are stored privately, tied only to an anonymous account on your device.',
        te: 'మీరు తీసిన లేదా అప్‌లోడ్ చేసిన పంట/ఆకు ఫోటోలు, మరియు స్కాన్ ఫలితం (పంట, సమస్య, తేదీ). ఇవి మీ పరికరంలోని ఒక అనామక ఖాతాకు మాత్రమే అనుసంధానించబడి, ప్రైవేట్‌గా నిల్వ చేయబడతాయి.',
      },
      {
        en: 'We do NOT collect your name, phone number, email, or precise location. There is no sign-up form that asks for any of these.',
        te: 'మేము మీ పేరు, ఫోన్ నంబర్, ఇమెయిల్ లేదా ఖచ్చితమైన స్థానాన్ని సేకరించము. వీటిలో ఏదైనా అడిగే సైన్-అప్ ఫారం లేదు.',
      },
    ],
  },
  {
    heading: { en: 'How your account works', te: 'మీ ఖాతా ఎలా పని చేస్తుంది' },
    body: [
      {
        en: 'When you first open the app, an anonymous account is created automatically — just a random ID, not linked to your identity. Your scan history is tied to this ID so it can sync across the app if you reinstall on the same device.',
        te: 'మీరు యాప్‌ను మొదటిసారి తెరిచినప్పుడు, ఒక అనామక ఖాతా స్వయంచాలకంగా సృష్టించబడుతుంది — ఇది కేవలం ఒక యాదృచ్ఛిక ID మాత్రమే, మీ వ్యక్తిత్వానికి సంబంధించినది కాదు. మీ స్కాన్ చరిత్ర ఈ IDకి అనుసంధానించబడి ఉంటుంది.',
      },
      {
        en: 'You can reset this identity at any time from the History screen, which permanently clears that account\'s local and cloud scan history.',
        te: 'మీరు చరిత్ర స్క్రీన్ నుండి ఎప్పుడైనా ఈ గుర్తింపును రీసెట్ చేయవచ్చు, ఇది ఆ ఖాతా యొక్క స్థానిక మరియు క్లౌడ్ స్కాన్ చరిత్రను శాశ్వతంగా తుడిచివేస్తుంది.',
      },
    ],
  },
  {
    heading: { en: 'AI photo analysis', te: 'AI ఫోటో విశ్లేషణ' },
    body: [
      {
        en: 'Live AI photo diagnosis is currently paused while we secure funding and measure its accuracy — your photos are not being sent for AI analysis right now. When it is active, a photo you scan is sent to our AI processing service solely to identify the crop condition, and is not used to train any model or shared for any other purpose.',
        te: 'మేము నిధులు మరియు ఖచ్చితత్వాన్ని కొలిచే వరకు, ప్రత్యక్ష AI ఫోటో నిర్ధారణ ప్రస్తుతం నిలిపివేయబడింది — మీ ఫోటోలు ఇప్పుడు AI విశ్లేషణకు పంపబడటం లేదు. ఇది యాక్టివ్‌గా ఉన్నప్పుడు, మీరు స్కాన్ చేసిన ఫోటో పంట సమస్యను గుర్తించడానికి మాత్రమే మా AI సేవకు పంపబడుతుంది, మరే ఇతర ప్రయోజనం కోసం ఉపయోగించబడదు లేదా పంచుకోబడదు.',
      },
    ],
  },
  {
    heading: { en: 'What we never do', te: 'మేము ఎప్పుడూ చేయనివి' },
    body: [
      {
        en: "We do not sell your data, and we do not share it with advertisers or any third party outside what's needed to run the app (our cloud database and, when active, our AI processor).",
        te: 'మేము మీ డేటాను విక్రయించము, మరియు యాప్‌ను నడపడానికి అవసరమైన వాటి (మా క్లౌడ్ డేటాబేస్ మరియు, యాక్టివ్‌గా ఉన్నప్పుడు, మా AI ప్రాసెసర్) కంటే ఎక్కువగా ప్రకటనదారులతో లేదా ఏ ఇతర మూడవ పక్షంతో దీన్ని పంచుకోము.',
      },
    ],
  },
  {
    heading: { en: 'Contact', te: 'సంప్రదింపు' },
    body: [
      {
        en: 'Questions about your data? Contact AgastyaOne at agastya@agastyaone.com.',
        te: 'మీ డేటాకు సంబంధించిన ప్రశ్నలు ఉన్నాయా? AgastyaOneను agastya@agastyaone.com వద్ద సంప్రదించండి.',
      },
    ],
  },
];

const TERMS_SECTIONS: Section[] = [
  {
    heading: { en: 'This is an advisory tool, not a substitute for expert advice', te: 'ఇది ఒక సలహా సాధనం, నిపుణుల సలహాకు ప్రత్యామ్నాయం కాదు' },
    body: [
      {
        en: 'HereForNature gives preliminary, educational guidance using a bundled agricultural knowledge catalog and (when active) AI-assisted photo analysis. It is not a certified diagnosis and is not a substitute for an in-person check by a qualified agricultural officer.',
        te: 'హియర్‌ఫర్‌నేచర్ ఒక సమగ్రమైన వ్యవసాయ జ్ఞాన సేకరణ మరియు (యాక్టివ్‌గా ఉన్నప్పుడు) AI-సహాయక ఫోటో విశ్లేషణను ఉపయోగించి ప్రాథమిక, విద్యాపరమైన సమాచారాన్ని అందిస్తుంది. ఇది ధృవీకరించిన నిర్ధారణ కాదు మరియు అర్హత కలిగిన వ్యవసాయ అధికారి ద్వారా ప్రత్యక్ష తనిఖీకి ప్రత్యామ్నాయం కాదు.',
      },
    ],
  },
  {
    heading: { en: 'Always verify before applying any chemical', te: 'ఏదైనా రసాయనం వాడే ముందు ఎల్లప్పుడూ ధృవీకరించుకోండి' },
    body: [
      {
        en: 'Before applying any pesticide or chemical treatment, verify the product, dose, and waiting period with your local Rythu Bharosa Kendra (RBK) or Village Agriculture Assistant (VAA). Chemical doses in this app are suppressed or explicitly marked as reference-only unless backed by a verified regulatory label.',
        te: 'ఏదైనా పురుగుమందు లేదా రసాయన చికిత్సను వాడే ముందు, ఉత్పత్తి, మోతాదు మరియు నిరీక్షణ వ్యవధిని మీ స్థానిక రైతు భరోసా కేంద్రం (RBK) లేదా గ్రామ వ్యవసాయ సహాయకుడు (VAA) తో ధృవీకరించుకోండి. ధృవీకరించిన నియంత్రణ లేబుల్ ద్వారా మద్దతు ఇవ్వకపోతే, ఈ యాప్‌లో రసాయన మోతాదులు నిలిపివేయబడ్డాయి లేదా స్పష్టంగా సూచనాత్మకమైనవిగా గుర్తించబడ్డాయి.',
      },
    ],
  },
  {
    heading: { en: 'No warranty', te: 'హామీ లేదు' },
    body: [
      {
        en: 'The app is provided as-is, free of charge, with no warranty of accuracy, availability, or fitness for a particular purpose. AgastyaOne is not liable for crop loss or other damages arising from reliance on the app\'s guidance.',
        te: 'యాప్ ఖచ్చితత్వం, లభ్యత లేదా ఒక నిర్దిష్ట ప్రయోజనానికి సరిపోతుందనే హామీ లేకుండా, ఎటువంటి ఖర్చు లేకుండా, ఉన్నది ఉన్నట్లుగా అందించబడుతుంది. యాప్ సలహాపై ఆధారపడటం వల్ల కలిగే పంట నష్టం లేదా ఇతర నష్టాలకు AgastyaOne బాధ్యత వహించదు.',
      },
    ],
  },
  {
    heading: { en: 'The service may change', te: 'సేవ మారవచ్చు' },
    body: [
      {
        en: 'Features (including live AI diagnosis) may be paused, changed, or discontinued at any time, for example due to funding or accuracy concerns.',
        te: 'లక్షణాలు (ప్రత్యక్ష AI నిర్ధారణ కూడా) నిధులు లేదా ఖచ్చితత్వ కారణాల వల్ల ఎప్పుడైనా నిలిపివేయబడవచ్చు, మార్చబడవచ్చు లేదా నిలిపివేయబడవచ్చు.',
      },
    ],
  },
];

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  const { language, t } = useLanguage();

  const renderSections = (sections: Section[]) =>
    sections.map((section, i) => (
      <div key={i} style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '8px', color: '#2D6A4F' }}>
          {language === 'en' ? section.heading.en : section.heading.te}
        </h3>
        {section.body.map((para, j) => (
          <p key={j} style={{ fontSize: '13px', lineHeight: 1.6, color: '#495057', marginBottom: '6px' }}>
            {language === 'en' ? para.en : para.te}
          </p>
        ))}
      </div>
    ));

  return (
    <div className="history-container">
      <div className="scan-header">
        <button type="button" className="btn-back" onClick={onBack}>
          ← {t('backToHome')}
        </button>
        <h2 className="scan-title">{t('privacyAndTerms')}</h2>
        <div style={{ width: 80 }} />
      </div>

      <p style={{ fontSize: '12px', color: '#868e96', marginBottom: '16px' }}>
        {language === 'en' ? 'Last updated: October 2026' : 'చివరిగా అప్‌డేట్ చేయబడింది: అక్టోబర్ 2026'}
      </p>

      <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>
        {language === 'en' ? 'Privacy Policy' : 'గోప్యతా విధానం'}
      </h2>
      {renderSections(PRIVACY_SECTIONS)}

      <hr style={{ border: 'none', borderTop: '1px solid #e9ecef', margin: '20px 0' }} />

      <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>
        {language === 'en' ? 'Terms of Use' : 'ఉపయోగ నిబంధనలు'}
      </h2>
      {renderSections(TERMS_SECTIONS)}
    </div>
  );
};
