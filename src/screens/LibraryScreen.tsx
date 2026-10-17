import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllSupportedCrops, getConditionsForCrop, getConditionCategory } from '../lib/knowledge';
import { getCropIcon } from '../lib/cropIcons';
import type { UrgencyColor } from '../types/database';

interface LibraryScreenProps {
  /** Opens a condition's full guidance by reusing ResultScreen's existing manual-browse
   * rendering (no photo involved) -- this is the same code path the "browse offline" chips
   * on a failed scan already use. */
  onSelectCondition: (cropId: string, diseaseId: string) => void;
}

const URGENCY_DOT: Record<UrgencyColor, string> = {
  red: '#C62828',
  yellow: '#F9A825',
  green: '#2D6A4F',
};

const CATEGORY_LABEL: Record<string, { en: string; te: string }> = {
  disease: { en: 'Disease', te: 'తెగులు' },
  pest: { en: 'Pest', te: 'పురుగు' },
  nutrient_deficiency: { en: 'Nutrient deficiency', te: 'పోషక లోపం' },
  physiological_disorder: { en: 'Physiological disorder', te: 'శారీరక లోపం' },
  abiotic_stress: { en: 'Environmental stress', te: 'పర్యావరణ ఒత్తిడి' },
};

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ onSelectCondition }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { cropId } = useParams<{ cropId: string }>();

  const crops = getAllSupportedCrops();

  if (cropId) {
    const crop = crops.find((c) => c.id === cropId);
    const conditions = getConditionsForCrop(cropId);

    if (!crop) {
      return (
        <div className="library-container">
          <button type="button" className="library-back-link" onClick={() => navigate('/library')}>
            ← {language === 'en' ? 'All crops' : 'అన్ని పంటలు'}
          </button>
          <p>{language === 'en' ? 'Crop not found.' : 'పంట కనుగొనబడలేదు.'}</p>
        </div>
      );
    }

    return (
      <div className="library-container">
        <button type="button" className="library-back-link" onClick={() => navigate('/library')}>
          ← {language === 'en' ? 'All crops' : 'అన్ని పంటలు'}
        </button>

        <div className="library-crop-detail-header">
          <div className="library-crop-detail-icon">{getCropIcon(crop.id)}</div>
          <div>
            <div className="library-crop-detail-name">{language === 'en' ? crop.name_en : crop.name_te}</div>
            <div className="library-crop-detail-sci">{crop.scientificName}</div>
          </div>
        </div>

        <div className="library-condition-list">
          {conditions.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#718774' }}>
              {language === 'en' ? 'No conditions cataloged yet for this crop.' : 'ఈ పంట కోసం ఇంకా సమస్యలు నమోదు కాలేదు.'}
            </p>
          ) : (
            conditions.map((entry) => {
              const category = getConditionCategory(entry);
              const label = CATEGORY_LABEL[category] || CATEGORY_LABEL.disease;
              return (
                <button
                  key={entry.id}
                  type="button"
                  className="library-condition-row"
                  onClick={() => onSelectCondition(crop.id, entry.id)}>
                  <span
                    className="library-condition-dot"
                    style={{ backgroundColor: URGENCY_DOT[entry.urgencyColor] }}
                  />
                  <span className="library-condition-text">
                    <span className="library-condition-name">
                      {language === 'en' ? entry.name_en : entry.name_te}
                    </span>
                    <span className="library-condition-category">
                      {language === 'en' ? label.en : label.te}
                    </span>
                  </span>
                  <span className="library-condition-chevron">›</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="library-container">
      <h2 className="library-heading">{t('cropLibrary')}</h2>
      <p className="library-subheading">{t('cropLibrarySubheading')}</p>

      <div className="library-crop-grid">
        {crops.map((crop) => {
          const count = getConditionsForCrop(crop.id).length;
          return (
            <button
              key={crop.id}
              type="button"
              className="library-crop-card"
              onClick={() => navigate(`/library/${crop.id}`)}>
              <span className="library-crop-icon">{getCropIcon(crop.id)}</span>
              <span className="library-crop-name">{language === 'en' ? crop.name_en : crop.name_te}</span>
              <span className="library-crop-count">
                {count} {language === 'en' ? (count === 1 ? 'condition' : 'conditions') : 'సమస్యలు'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
