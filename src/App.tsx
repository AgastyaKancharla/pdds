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
import { type ScanResultData } from './screens/ScanScreen';
import { ResultScreen } from './screens/ResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { LibraryScreen } from './screens/LibraryScreen';
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

const HomeIcon = () => (
  <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LibraryIcon = () => (
  <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v4.5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

  /** Opens a Library condition's full guidance by reusing ResultScreen's own manual-browse
   * rendering (today's fix for the "browse offline" chips) -- no photo involved, so this is
   * tagged 'reference_lookup', never shown as an AI result. */
  const handleSelectLibraryCondition = (cropId: string, diseaseId: string) => {
    showResult({
      imageUri: '',
      detected: false,
      cropId,
      diseaseId,
      diagnosticTier: 'reference_lookup',
    });
  };

  // Nav highlighting is derived from the URL, so it stays correct when the farmer uses the
  // device's own back/forward gestures instead of the in-app buttons.
  const onHome = !!useMatch('/');
  const onLibrary = !!useMatch('/library/*');
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
            element={
              <HomeScreen
                onScanComplete={showResult}
                onOpenLibrary={() => navigate('/library')}
                onOpenPrivacy={() => navigate('/privacy')}
              />
            }
          />

          {/* Legacy bookmark/link safety net: scanning now happens on the home screen itself. */}
          <Route path="/scan" element={<Navigate to="/" replace />} />

          <Route
            path="/result"
            element={
              scanResult ? (
                <ResultScreen
                  scanData={scanResult}
                  onScanAnother={goHome}
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
            element={<HistoryScreen onSelectScan={showResult} onStartScan={goHome} />}
          />

          <Route path="/library" element={<LibraryScreen onSelectCondition={handleSelectLibraryCondition} />} />
          <Route path="/library/:cropId" element={<LibraryScreen onSelectCondition={handleSelectLibraryCondition} />} />

          <Route path="/privacy" element={<PrivacyScreen onBack={goHome} />} />

          {/* Unknown URL: go home instead of rendering nothing. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="app-nav">
        <button type="button" className={`nav-item ${onHome ? 'active' : ''}`} onClick={goHome}>
          <HomeIcon />
          <span className="nav-label">{t('home')}</span>
        </button>

        <button type="button" className={`nav-item ${onLibrary ? 'active' : ''}`} onClick={() => navigate('/library')}>
          <LibraryIcon />
          <span className="nav-label">{t('library')}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${onHistory ? 'active' : ''}`}
          onClick={() => navigate('/history')}>
          <HistoryIcon />
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
