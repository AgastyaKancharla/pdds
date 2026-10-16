import React from 'react';
import { logClientError } from '../lib/errorLogging';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level catch-all for a render-time crash. Deliberately plain, bilingual, hard-coded text
 * rather than useLanguage()/t() -- this must still render correctly even if the crash happened
 * inside LanguageProvider itself, so it cannot depend on any context above it in the tree.
 */
export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    logClientError(error.message, error.stack, 'error_boundary', {
      componentStack: info.componentStack,
    });
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '24px',
            textAlign: 'center',
            gap: '12px',
          }}>
          <span style={{ fontSize: '40px' }}>🌿</span>
          <h2 style={{ margin: 0 }}>Something went wrong. / ఏదో తప్పు జరిగింది.</h2>
          <p style={{ color: '#495057', maxWidth: '320px' }}>
            Please reload the app. If this keeps happening, visit your Rythu Bharosa Kendra (RBK).
            <br />
            దయచేసి యాప్‌ను రీలోడ్ చేయండి. ఇది కొనసాగితే, మీ రైతు భరోసా కేంద్రం (RBK) ని సందర్శించండి.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: '#2D6A4F',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}>
            Reload / రీలోడ్ చేయండి
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
