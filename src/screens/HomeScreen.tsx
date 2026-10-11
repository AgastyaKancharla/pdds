import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeScreenProps {
  onStartScan: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartScan }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="home-container">
      <div className="lang-toggle-wrap">
        <div className="lang-toggle">
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}>
            {t('english')}
          </button>
          <button
            type="button"
            className={`lang-btn ${language === 'te' ? 'active' : ''}`}
            onClick={() => setLanguage('te')}>
            {t('telugu')}
          </button>
        </div>
      </div>

      <div className="hero-section">
        <div className="logo-badge">
          <img src="/assets/icon.png" alt="HereForNature Logo" className="hero-logo" />
        </div>
        <h1 className="hero-title">{t('appName')}</h1>
        <span className="hero-subtitle">{t('poweredBy')}</span>
        <p className="hero-tagline">{t('tagline')}</p>

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🌾</span>
            <div>
              <strong>{language === 'en' ? 'AP Crops Supported' : 'AP పంటల మద్దతు'}</strong>
              <p>{language === 'en' ? 'Paddy, Chilli, Cotton & Cash Crops' : 'వరి, మిరప, ప్రత్తి మొదలైనవి'}</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <div>
              <strong>{language === 'en' ? 'Instant AI Diagnosis' : 'తక్షణ AI నిర్ధారణ'}</strong>
              <p>{language === 'en' ? 'Identify foliar lesions, blight & pests' : 'తెగుళ్లు మరియు పురుగుల గుర్తింపు'}</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧪</span>
            <div>
              <strong>{language === 'en' ? 'Organic & Chemical' : 'సేంద్రియ & రసాయన'}</strong>
              <p>{language === 'en' ? 'Step-by-step treatment guidance' : 'స్పష్టమైన చికిత్సా సూచనలు'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-action">
        <button type="button" className="primary-cta-btn" onClick={onStartScan}>
          <span className="cta-icon">📷</span>
          <span>{t('scanNow')}</span>
        </button>
      </div>
    </div>
  );
};
