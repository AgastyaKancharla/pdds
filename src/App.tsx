import React, { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ensureAnonymousSession } from './lib/auth';
import { HomeScreen } from './screens/HomeScreen';
import { ScanScreen, type ScanResultData } from './screens/ScanScreen';
import { ResultScreen } from './screens/ResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { SAMPLE_CROP_IMAGE } from './lib/mockData';
import './App.css';

type Screen = 'home' | 'scan' | 'result' | 'history';

function MainApp() {
  const { t } = useLanguage();
  const [screen, setScreen] = useState<Screen>('home');
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);

  useEffect(() => {
    ensureAnonymousSession().catch((err) => {
      console.warn('[HereForNature] Anonymous session init note:', err);
    });
  }, []);

  const handleStartScan = () => {
    setScreen('scan');
  };

  const handleScanComplete = (data: ScanResultData) => {
    setScanResult(data);
    setScreen('result');
  };

  const handleSelectSample = () => {
    setScanResult({
      imageUri: SAMPLE_CROP_IMAGE,
      detected: true,
      cropId: 'crop-rice',
      diseaseId: 'disease-rice-blast',
      cropNameEn: 'Paddy / Rice',
      cropNameTe: 'వరి',
      isDemoSample: true,
    });
    setScreen('result');
  };

  const handleSelectHistoryScan = (data: ScanResultData) => {
    setScanResult(data);
    setScreen('result');
  };

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="app-header">
        <div className="brand-wrap" onClick={() => setScreen('home')}>
          <img src="/assets/icon.png" alt="Logo" className="brand-icon" />
          <span className="brand-name">{t('appName')}</span>
        </div>
      </header>

      {/* Main Screen Body */}
      <main className="app-main">
        {screen === 'home' && <HomeScreen onStartScan={handleStartScan} />}

        {screen === 'scan' && (
          <ScanScreen
            onScanComplete={handleScanComplete}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'result' && scanResult && (
          <ResultScreen
            scanData={scanResult}
            onScanAnother={() => setScreen('scan')}
            onHome={() => setScreen('home')}
            onSelectSample={handleSelectSample}
          />
        )}

        {screen === 'history' && (
          <HistoryScreen
            onSelectScan={handleSelectHistoryScan}
            onStartScan={handleStartScan}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="app-nav">
        <button
          type="button"
          className={`nav-item ${screen === 'home' ? 'active' : ''}`}
          onClick={() => setScreen('home')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">{t('home')}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${screen === 'scan' ? 'active' : ''}`}
          onClick={() => setScreen('scan')}>
          <span className="nav-icon">📷</span>
          <span className="nav-label">{t('scanNow')}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${screen === 'history' ? 'active' : ''}`}
          onClick={() => setScreen('history')}>
          <span className="nav-icon">📜</span>
          <span className="nav-label">{t('history')}</span>
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
