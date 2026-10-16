import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { getAuthenticatedUserId, resetGuestSession, getLocalUserId } from '../lib/auth';
import { resolveScanImageUrl } from '../lib/storage';
import { getCropKnowledge, getDiseaseKnowledge } from '../lib/knowledge';
import { getMockCrop, getMockDisease } from '../lib/mockData';
import type { ScanHistoryRow, ScanHistoryWithDetails, UrgencyColor } from '../types/database';
import type { ScanResultData } from './ScanScreen';

/**
 * Resolves a scan row's crop/disease names from this repo's own catalog, never from a
 * database join. `crop_detected_id`/`disease_detected_id` are deliberately plain text with
 * no FK to a `crops`/`diseases` table (see supabase/migrations/006_create_scan_history_and_
 * storage_bucket.sql) -- the connected project has no such tables in this shape, so a
 * PostgREST embedded select (`crops:crop_detected_id(...)`) would error on every row.
 */
function resolveHistoryDetails(
  cropId: string | null,
  diseaseId: string | null
): Pick<ScanHistoryWithDetails, 'crops' | 'diseases'> {
  const cropKnowledge = cropId ? getCropKnowledge(cropId) : null;
  const mockCrop = cropId ? getMockCrop(cropId) : undefined;
  const crops = cropKnowledge
    ? { id: cropKnowledge.id, name_en: cropKnowledge.name_en, name_te: cropKnowledge.name_te }
    : mockCrop
      ? { id: mockCrop.id, name_en: mockCrop.name_en, name_te: mockCrop.name_te }
      : null;

  const diseaseKnowledge = diseaseId ? getDiseaseKnowledge(diseaseId) : null;
  const mockDisease = diseaseId ? getMockDisease(diseaseId) : undefined;
  const diseases = diseaseKnowledge
    ? {
        id: diseaseKnowledge.id,
        name_en: diseaseKnowledge.name_en,
        name_te: diseaseKnowledge.name_te,
        urgency_color: diseaseKnowledge.urgencyColor,
      }
    : mockDisease
      ? { id: mockDisease.id, name_en: mockDisease.name_en, name_te: mockDisease.name_te, urgency_color: mockDisease.urgency_color }
      : null;

  return { crops, diseases };
}

interface HistoryScreenProps {
  onSelectScan: (data: ScanResultData) => void;
  onStartScan: () => void;
}

const URGENCY_DOT: Record<UrgencyColor, string> = {
  red: '#C62828',
  yellow: '#F9A825',
  green: '#2D6A4F',
};

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onSelectScan, onStartScan }) => {
  const { language, t } = useLanguage();
  const [rows, setRows] = useState<ScanHistoryWithDetails[]>([]);
  const [resolvedUrls, setResolvedUrls] = useState<Record<string, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      setLoading(true);

      const authUserId = await getAuthenticatedUserId();
      const effectiveUserId = authUserId || getLocalUserId();
      if (!cancelled) {
        setIsGuest(!authUserId);
      }
      const storageKey = `herefornature_history_${effectiveUserId}`;

      // 1. Try account-scoped / guest-scoped local storage
      let localList: ScanHistoryWithDetails[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          localList = JSON.parse(stored);
        } else if (!authUserId) {
          // Check for legacy shared guest history to migrate once for the active guest
          const legacy = localStorage.getItem('herefornature_history_guest') || localStorage.getItem('herefornature_history');
          if (legacy) {
            localList = JSON.parse(legacy);
            localStorage.setItem(storageKey, legacy);
            localStorage.removeItem('herefornature_history_guest');
            localStorage.removeItem('herefornature_history');
          }
        }
      } catch (err) {
        console.warn('[HereForNature] Local history load note:', err);
      }

      // 2. Try Supabase cloud if connected and authenticated with isolated ownership
      if (supabase && authUserId) {
        try {
          const { data, error } = await supabase
            .from('scan_history')
            .select('*')
            .eq('user_id', authUserId)
            .order('created_at', { ascending: false })
            .limit(50);

          if (!error && data && data.length > 0) {
            if (!cancelled) {
              const withDetails: ScanHistoryWithDetails[] = (data as ScanHistoryRow[]).map((row) => ({
                ...row,
                ...resolveHistoryDetails(row.crop_detected_id, row.disease_detected_id),
              }));
              setRows(withDetails);
              setLoading(false);
            }
            return;
          }
        } catch (err) {
          console.warn('[HereForNature] Supabase history fetch note:', err);
        }
      }

      if (!cancelled) {
        setRows(localList);
        setLoading(false);
      }
    }

    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  // Resolve private storage paths to short-lived signed URLs for rendering
  useEffect(() => {
    let cancelled = false;

    async function resolveUrls() {
      const urlMap: Record<string, string> = {};

      for (const item of rows) {
        if (!item.image_url) continue;

        if (item.image_url.startsWith('data:image/') || item.image_url.startsWith('http://') || item.image_url.startsWith('https://')) {
          urlMap[item.id] = item.image_url;
        } else if (item.image_url !== 'uploaded-crop.jpg') {
          // Private storage path: resolve to signed URL
          try {
            const signed = await resolveScanImageUrl(item.image_url);
            if (signed) {
              urlMap[item.id] = signed;
            }
          } catch (err) {
            console.warn('[HereForNature] Error resolving image URL for scan:', item.id, err);
          }
        }
      }

      if (!cancelled) {
        setResolvedUrls(urlMap);
      }
    }

    if (rows.length > 0) {
      resolveUrls();
    }

    return () => {
      cancelled = true;
    };
  }, [rows]);

  const handleConfirmReset = () => {
    resetGuestSession();
    setRows([]);
    setResolvedUrls({});
    setShowResetConfirm(false);
    setResetNotice(t('guestSessionResetSuccess'));
    setTimeout(() => {
      setResetNotice(null);
    }, 3500);
  };

  if (loading) {
    return (
      <div className="history-container history-center">
        <div className="spinner" />
        <p className="loading-text">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div
        className="history-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
        <h2 className="history-heading" style={{ margin: 0 }}>
          {t('history')}
        </h2>
        {isGuest && (
          <button
            type="button"
            className="btn-reset-guest"
            onClick={() => setShowResetConfirm(true)}
            style={{
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #ced4da',
              background: '#f8f9fa',
              color: '#495057',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}>
            <span>🔄</span>
            <span>{t('resetGuestSession')}</span>
          </button>
        )}
      </div>

      {resetNotice && (
        <div
          className="reset-success-banner"
          style={{
            padding: '8px 12px',
            marginBottom: '12px',
            borderRadius: '6px',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            fontSize: '13px',
            textAlign: 'center',
          }}>
          ✓ {resetNotice}
        </div>
      )}

      {showResetConfirm && (
        <div
          className="reset-confirm-card"
          style={{
            padding: '14px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: '#fff3e0',
            border: '1px solid #ffe082',
            color: '#e65100',
          }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', lineHeight: '1.4', fontWeight: 500 }}>
            ⚠️ {t('confirmResetGuestSession')}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn-cancel-reset"
              onClick={() => setShowResetConfirm(false)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                background: '#fff',
                cursor: 'pointer',
              }}>
              {t('cancel')}
            </button>
            <button
              type="button"
              className="btn-confirm-reset"
              onClick={handleConfirmReset}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: '#c62828',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
              {t('confirmReset')}
            </button>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="history-empty-card">
          <span className="empty-icon">📋</span>
          <p className="empty-text">{t('noHistory')}</p>
          <button type="button" className="primary-cta-btn" onClick={onStartScan}>
            📷 {t('scanNow')}
          </button>
        </div>
      ) : (
        <div className="history-list">
          {rows.map((item) => {
            const cropName = language === 'en' ? item.crops?.name_en : item.crops?.name_te;
            const diseaseName = language === 'en' ? item.diseases?.name_en : item.diseases?.name_te;
            const dotColor = item.urgency_color ? URGENCY_DOT[item.urgency_color] : '#9AA79B';
            const displayUrl = resolvedUrls[item.id];
            const hasImageError = imageErrors[item.id];

            return (
              <div
                key={item.id}
                className="history-row"
                onClick={() => {
                  if (!item.crop_detected_id || !item.disease_detected_id) return;
                  const rawTier = item.diagnostic_tier;
                  const itemDiagnosticTier =
                    rawTier === 'expert_confirmed'
                      ? 'legacy_or_unknown'
                      : rawTier || (item.is_demo_sample ? 'demonstration_sample' : 'legacy_or_unknown');
                  onSelectScan({
                    imageUri: displayUrl || item.image_url || '',
                    detected: true,
                    cropId: item.crop_detected_id,
                    diseaseId: item.disease_detected_id,
                    cropNameEn: item.crops?.name_en,
                    cropNameTe: item.crops?.name_te,
                    isDemoSample: item.is_demo_sample ?? false,
                    isCachedResult: true,
                    cachedAt: item.created_at,
                    diagnosticTier: itemDiagnosticTier as any,
                  });
                }}>
                {displayUrl && !hasImageError ? (
                  <img
                    src={displayUrl}
                    alt="Crop Thumbnail"
                    className="history-thumb"
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [item.id]: true }));
                    }}
                  />
                ) : (
                  <div className="history-thumb history-thumb-placeholder">🌿</div>
                )}
                <div className="history-details">
                  <h4 className="history-disease">{diseaseName ?? 'Crop Diagnosis'}</h4>
                  <p className="history-crop">{cropName ?? 'Agricultural Crop'}</p>
                  <span className="history-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span className="history-dot" style={{ backgroundColor: dotColor }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
