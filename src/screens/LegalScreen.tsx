import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalScreenProps {
  onBack: () => void;
}

// Standalone Privacy Policy & Terms of Service.
// This is distinct from the in-app agricultural-advice disclaimer shown on the
// result screen: that one covers diagnostic/treatment liability; this page covers
// data handling, account/storage, and general terms of use.
export const LegalScreen: React.FC<LegalScreenProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const en = language === 'en';

  return (
    <div className="legal-container" style={{ padding: '16px', maxWidth: 680, margin: '0 auto' }}>
      <button type="button" onClick={onBack} className="back-btn" style={{ marginBottom: 16 }}>
        {en ? '← Back' : '← వెనుకకు'}
      </button>

      <h1>{en ? 'Privacy Policy & Terms of Service' : 'గోప్యతా విధానం & సేవా నిబంధనలు'}</h1>
      <p style={{ opacity: 0.7, fontSize: 13 }}>
        {en ? 'Last updated: 13 October 2026' : 'చివరి నవీకరణ: 13 అక్టోబర్ 2026'}
      </p>

      <h2>{en ? 'What we collect' : 'మేము సేకరించేది'}</h2>
      <p>
        {en
          ? 'When you scan a crop, we process the photo you take to identify the crop and any disease, pest, or nutrient condition visible in it. If you are signed in, your scan history (crop, condition, and date) is associated with your account so you can review it later. We do not collect your name, phone number, or precise location unless you choose to provide them.'
          : 'మీరు పంటను స్కాన్ చేసినప్పుడు, మీరు తీసిన ఫోటోను ప్రాసెస్ చేసి పంట మరియు కనిపించే ఏదైనా వ్యాధి, పురుగు లేదా పోషక లోపాన్ని గుర్తిస్తాము. మీరు సైన్ ఇన్ అయి ఉంటే, మీ స్కాన్ చరిత్ర (పంట, పరిస్థితి, తేదీ) మీ ఖాతాతో అనుబంధించబడుతుంది. మీరు స్వయంగా ఇచ్చితే తప్ప మీ పేరు, ఫోన్ నంబర్ లేదా ఖచ్చితమైన స్థానాన్ని మేము సేకరించము.'}
      </p>

      <h2>{en ? 'How your photo is used' : 'మీ ఫోటో ఎలా ఉపయోగించబడుతుంది'}</h2>
      <p>
        {en
          ? 'Your photo is sent securely to our AI diagnosis service to generate a result. It may be stored so you can view your scan history later, tied only to your account, not shared publicly, and not sold to any third party.'
          : 'మీ ఫోటో ఫలితాన్ని రూపొందించడానికి మా AI నిర్ధారణ సేవకు సురక్షితంగా పంపబడుతుంది. తరువాత మీ స్కాన్ చరిత్రను చూడటానికి ఇది నిల్వ చేయబడవచ్చు, ఇది మీ ఖాతాకు మాత్రమే అనుసంధానించబడి ఉంటుంది, బహిరంగంగా పంచుకోబడదు మరియు ఏ మూడవ పక్షానికి విక్రయించబడదు.'}
      </p>

      <h2>{en ? 'Deleting your data' : 'మీ డేటాను తొలగించడం'}</h2>
      <p>
        {en
          ? 'You can ask us to delete your scan history and account data at any time by contacting us through the app or at the email listed below. We will remove it within a reasonable time.'
          : 'మీరు యాప్ ద్వారా లేదా క్రింద ఇవ్వబడిన ఇమెయిల్ ద్వారా మమ్మల్ని సంప్రదించడం ద్వారా ఎప్పుడైనా మీ స్కాన్ చరిత్ర మరియు ఖాతా డేటాను తొలగించమని అడగవచ్చు. మేము దీన్ని సహేతుకమైన సమయంలో తొలగిస్తాము.'}
      </p>

      <h2>{en ? 'AI-generated guidance' : 'AI రూపొందించిన సూచనలు'}</h2>
      <p>
        {en
          ? 'Crop and disease identification is produced by an AI model and is a preliminary hypothesis, not a substitute for an agronomist or your local Rythu Bharosa Kendra (RBK). See the Agricultural Advisory Disclaimer shown with every result for full details.'
          : 'పంట మరియు వ్యాధి గుర్తింపు AI మోడల్ ద్వారా రూపొందించబడింది మరియు ఇది ప్రాథమిక అంచనా మాత్రమే, వ్యవసాయ నిపుణుడికి లేదా మీ స్థానిక రైతు భరోసా కేంద్రం (RBK)కి ప్రత్యామ్నాయం కాదు. పూర్తి వివరాల కోసం ప్రతి ఫలితంతో చూపబడే వ్యవసాయ సలహా గమనికను చూడండి.'}
      </p>

      <h2>{en ? 'Terms of use' : 'ఉపయోగ నిబంధనలు'}</h2>
      <p>
        {en
          ? 'HereForNature is provided by AgastyaOne as-is, to help you make better-informed decisions about your crops. We do not guarantee the accuracy of any diagnosis and are not liable for losses from decisions made based on the app. Do not use this app for crops intended for human or animal consumption without separately verifying any chemical treatment with a qualified agronomist.'
          : 'HereForNature ను AgastyaOne అందిస్తోంది, మీ పంటల గురించి మెరుగైన సమాచారంతో నిర్ణయాలు తీసుకోవడంలో సహాయపడటానికి. ఏదైనా నిర్ధారణ యొక్క ఖచ్చితత్వానికి మేము హామీ ఇవ్వము మరియు యాప్ ఆధారంగా తీసుకున్న నిర్ణయాల వల్ల కలిగే నష్టాలకు బాధ్యత వహించము. మానవ లేదా జంతు వినియోగం కోసం ఉద్దేశించిన పంటలపై ఏదైనా రసాయన చికిత్సను అర్హత కలిగిన వ్యవసాయ నిపుణుడితో విడిగా ధృవీకరించకుండా ఈ యాప్‌ను ఉపయోగించవద్దు.'}
      </p>

      <h2>{en ? 'Contact' : 'సంప్రదించండి'}</h2>
      <p>
        {en ? 'Questions or data requests: ' : 'ప్రశ్నలు లేదా డేటా అభ్యర్థనలు: '}
        <a href="mailto:agastya@agastyaone.com">agastya@agastyaone.com</a>
      </p>
    </div>
  );
};
