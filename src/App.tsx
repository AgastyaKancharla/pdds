import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useMatch,
} from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ensureAnonymousSession } from './lib/auth';
import { HomeScreen } from './screens/HomeScreen';
import { ScanScreen, type ScanResultData } from './screens/ScanScreen';
import { ResultScreen } from './screens/ResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { PrivacyScreen } from './screens/PrivacyScreen';
import { SAMPLE_CROP_IMAGE } from './lib/mockData';
import './App.css';

/**
 * A scan result is carried in router location state rather than in the URL. It holds the
 * farmer's own photo (a base64 data URI) and, for a live scan, an AI hypothesis — neither
 * belongs in a shareable link, and a URL could not hold them anyway. The practical
 * consequence is that /result is not deep-linkable: opening it cold (a bookmark, a reload
 * after the tab was discarded, a pasted link) has nothing to show, and is redirected home
 * rather than rendering an empty or misleading result screen.
 */
interface ResultRouteState {
  scanResult?: ScanResultData;
}

function AppFrame() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    ensureAnonymousSession().catch((err) => {
      console.warn('[HereForNature] Anonymous session init note:', err);
    });
  }, []);

  const goHome = () => navigate('/');
  const goScan = () => navigate('/scan');
  const showResult = (data: ScanResultData) =>
    navigate('/result', { state: { scanResult: data } satisfies ResultRouteState });

  const handleSelectSample = () => {
    showResult({
      imageUri: SAMPLE_CROP_IMAGE,
      detected: true,
      cropId: 'crop-rice',
      diseaseId: 'disease-rice-blast',
      cropNameEn: 'Paddy / Rice',
      cropNameTe: 'వరి',
      isDemoSample: true,
    });
  };

  // Nav highlighting is derived from the URL, so it stays correct when the farmer uses the
  // device's own back/forward gestures instead of the in-app buttons.
  const onHome = !!useMatch('/');
  const onScan = !!useMatch('/scan');
  const onHistory = !!useMatch('/history');

  const scanResult = (location.state as ResultRouteState | null)?.scanResult;

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="app-header">
        <div className="brand-wrap" onClick={goHome}>
          <img src="/assets/icon.png" alt="Logo" className="brand-icon" />
          <span className="brand-name">{t('appName')}</span>
        </div>
      </header>

      {/* Main Screen Body */}
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<HomeScreen onStartScan={goScan} onOpenPrivacy={() => navigate('/privacy')} />}
          />

          <Route path="/scan" element={<ScanScreen onScanComplete={showResult} onBack={goHome} />} />

          <Route
            path="/result"
            element={
              scanResult ? (
                <ResultScreen
                  scanData={scanResult}
                  onScanAnother={goScan}
                  onHome={goHome}
                  onSelectSample={handleSelectSample}
                />
              ) : (
                // No result in hand (cold load, reload, or pasted link) — send the farmer home
                // rather than showing a blank or stale-looking result screen.
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/history"
            element={<HistoryScreen onSelectScan={showResult} onStartScan={goScan} />}
          />

          <Route path="/privacy" element={<PrivacyScreen onBack={goHome} />} />

          {/* Unknown URL: go home instead of rendering nothing. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="app-nav">
        <button type="button" className={`nav-item ${onHome ? 'active' : ''}`} onClick={goHome}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">{t('home')}</span>
        </button>

        <button type="button" className={`nav-item ${onScan ? 'active' : ''}`} onClick={goScan}>
          <span className="nav-icon">📷</span>
          <span className="nav-label">{t('scanNow')}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${onHistory ? 'active' : ''}`}
          onClick={() => navigate('/history')}>
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
      <BrowserRouter>
        <AppFrame />
      </BrowserRouter>
    </LanguageProvider>
  );
}
