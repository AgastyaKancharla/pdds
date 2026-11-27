import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyScreenProps {
  onBack: () => void;
}

interface Section {
  heading: { en: string; };
  body: { en: string; }[];
}

/**
 * Describes only what this app actually does, checked against the real code (src/lib/auth.ts,
 * storage.ts, supabase.ts) rather than written generically: fully anonymous accounts (no name/
 * phone/email ever collected), crop photos + scan results stored privately per account, and an
 * honest note that live AI diagnosis is currently paused. Update this file if that changes.
 */
const PRIVACY_SECTIONS: Section[] = [
  {
    heading: { en: 'What we collect', },
    body: [
      {
        en: 'Photos of crops/leaves you take or upload, and the scan result (crop, condition, date). These are stored privately, tied only to an anonymous account on your device.',
      },
      {
        en: 'We do NOT collect your name, phone number, email, or precise location. There is no sign-up form that asks for any of these.',
      },
    ],
  },
  {
    heading: { en: 'How your account works', },
    body: [
      {
        en: 'When you first open the app, an anonymous account is created automatically — just a random ID, not linked to your identity. Your scan history is tied to this ID so it can sync across the app if you reinstall on the same device.',
      },
      {
        en: 'You can reset this identity at any time from the History screen, which permanently clears that account\'s local and cloud scan history.',
      },
    ],
  },
  {
    heading: { en: 'AI photo analysis', },
    body: [
      {
        en: 'Live AI photo diagnosis is currently paused while we secure funding and measure its accuracy — your photos are not being sent for AI analysis right now. When it is active, a photo you scan is sent to our AI processing service solely to identify the crop condition, and is not used to train any model or shared for any other purpose.',
      },
    ],
  },
  {
    heading: { en: 'What we never do', },
    body: [
      {
        en: "We do not sell your data, and we do not share it with advertisers or any third party outside what's needed to run the app (our cloud database and, when active, our AI processor).",
      },
    ],
  },
  {
    heading: { en: 'Contact', },
    body: [
      {
        en: 'Questions about your data? Contact AgastyaOne at agastya@agastyaone.com.',
      },
    ],
  },
];

const TERMS_SECTIONS: Section[] = [
  {
    heading: { en: 'This is an advisory tool, not a substitute for expert advice', },
    body: [
      {
        en: 'HereForNature gives preliminary, educational guidance using a bundled agricultural knowledge catalog and (when active) AI-assisted photo analysis. It is not a certified diagnosis and is not a substitute for an in-person check by a qualified agricultural officer.',
      },
    ],
  },
  {
    heading: { en: 'Always verify before applying any chemical', },
    body: [
      {
        en: 'Before applying any pesticide or chemical treatment, verify the product, dose, and waiting period with your local agriculture extension office. Chemical doses in this app are suppressed or explicitly marked as reference-only unless backed by a verified regulatory label.',
      },
    ],
  },
  {
    heading: { en: 'No warranty', },
    body: [
      {
        en: 'The app is provided as-is, free of charge, with no warranty of accuracy, availability, or fitness for a particular purpose. AgastyaOne is not liable for crop loss or other damages arising from reliance on the app\'s guidance.',
      },
    ],
  },
  {
    heading: { en: 'The service may change', },
    body: [
      {
        en: 'Features (including live AI diagnosis) may be paused, changed, or discontinued at any time, for example due to funding or accuracy concerns.',
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
          {section.heading.en}
        </h3>
        {section.body.map((para, j) => (
          <p key={j} style={{ fontSize: '13px', lineHeight: 1.6, color: '#495057', marginBottom: '6px' }}>
            {para.en}
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
        {'Last updated: October 2026'}
      </p>

      <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>
        {'Privacy Policy'}
      </h2>
      {renderSections(PRIVACY_SECTIONS)}

      <hr style={{ border: 'none', borderTop: '1px solid #e9ecef', margin: '20px 0' }} />

      <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>
        {'Terms of Use'}
      </h2>
      {renderSections(TERMS_SECTIONS)}
    </div>
  );
};
