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

const CATEGORY_LABEL: Record<string, { en: string; }> = {
  disease: { en: 'Disease', },
  pest: { en: 'Pest', },
  nutrient_deficiency: { en: 'Nutrient deficiency', },
  physiological_disorder: { en: 'Physiological disorder', },
  abiotic_stress: { en: 'Environmental stress', },
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
            ← {'All crops'}
          </button>
          <p>{'Crop not found.'}</p>
        </div>
      );
    }

    return (
      <div className="library-container">
        <button type="button" className="library-back-link" onClick={() => navigate('/library')}>
          ← {'All crops'}
        </button>

        <div className="library-crop-detail-header">
          {crop.imageUrl ? (
            <img src={crop.imageUrl} alt="" className="library-crop-detail-photo" />
          ) : (
            <div className="library-crop-detail-icon">{getCropIcon(crop.id)}</div>
          )}
          <div>
            <div className="library-crop-detail-name">{crop.name_en}</div>
            <div className="library-crop-detail-sci">{crop.scientificName}</div>
          </div>
        </div>
        {crop.imageUrl && crop.imageAttribution && (
          <p className="library-image-credit">
            {'Photo'}: {crop.imageAttribution.organization} (
            {crop.imageAttribution.license})
          </p>
        )}

        <div className="library-condition-list">
          {conditions.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#718774' }}>
              {'No conditions cataloged yet for this crop.'}
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
                  {entry.imageUrl ? (
                    <img src={entry.imageUrl} alt="" className="library-condition-photo" />
                  ) : (
                    <span
                      className="library-condition-dot"
                      style={{ backgroundColor: URGENCY_DOT[entry.urgencyColor] }}
                    />
                  )}
                  <span className="library-condition-text">
                    <span className="library-condition-name">
                      {entry.name_en}
                    </span>
                    <span className="library-condition-category">
                      {label.en}
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
              {crop.imageUrl ? (
                <img src={crop.imageUrl} alt="" className="library-crop-card-photo" />
              ) : (
                <span className="library-crop-icon">{getCropIcon(crop.id)}</span>
              )}
              <span className="library-crop-name">{crop.name_en}</span>
              <span className="library-crop-count">
                {count} {(count === 1 ? 'condition' : 'conditions')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
