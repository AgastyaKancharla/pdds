import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { isAiLiveDiagnosisEnabled } from '../lib/detection';
import { ScanScreen, type ScanResultData } from './ScanScreen';

interface HomeScreenProps {
  onScanComplete: (data: ScanResultData) => void;
  onOpenLibrary: () => void;
  onOpenPrivacy: () => void;
}

/**
 * The home screen IS the diagnosis screen: taking a photo or uploading one is the primary
 * action here, not hidden behind a second "Scan Crop" tap. ScanScreen's capture/upload/sample
 * logic is reused as-is (embedded, no own header) rather than duplicated.
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({ onScanComplete, onOpenLibrary, onOpenPrivacy }) => {
  const { t } = useLanguage();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="logo-badge">
          <img src="/assets/icon.png" alt="HereForNature Logo" className="hero-logo" />
        </div>
        <h1 className="hero-title">{t('appName')}</h1>
        <span className="hero-subtitle">{t('poweredBy')}</span>
      </div>

      <ScanScreen onScanComplete={onScanComplete} onBack={() => {}} embedded />

      <button type="button" className="library-teaser-card" onClick={onOpenLibrary}>
        <span className="feature-icon">📖</span>
        <div>
          <strong>Browse the full Crop Library</strong>
          <p>
            {(isAiLiveDiagnosisEnabled() ? 'All 21 known conditions, with or without a photo' : 'All 21 known conditions — no photo needed')}
          </p>
        </div>
        <span className="library-teaser-arrow">→</span>
      </button>

      <button type="button" className="privacy-link-btn" onClick={onOpenPrivacy}>
        {t('privacyAndTerms')}
      </button>
    </div>
  );
};
