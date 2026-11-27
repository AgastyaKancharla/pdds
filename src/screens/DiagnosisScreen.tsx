import React, { useState } from 'react';
import {
  diagnosePlant,
  getDiagnosisView,
  CATEGORY_LABELS,
  type DiagnosisErrorKind,
  type DiagnosisCandidate,
  type PlantDiagnosis,
  type DiagnosisView,
} from '../lib/ai/plantDiagnosis';
import { getCropKnowledge, getDiseaseKnowledge } from '../lib/knowledge';
import { CROP_ICONS } from '../lib/cropIcons';

export interface DiagnosisScanData {
  imageUri: string;
  cropHint?: string;
  plantDiagnosis?: PlantDiagnosis;
  diagnosisError?: { kind: DiagnosisErrorKind; message: string; retryable: boolean };
  model?: string;
  scansRemainingToday?: number;
}

interface DiagnosisScreenProps {
  scanData: DiagnosisScanData;
  onScanAnother: () => void;
  onOpenGuide: (cropId: string, diseaseId: string, imageUri: string) => void;
  onBrowseCrop: (cropId?: string) => void;
  onTrySample: () => void;
}

const HEADLINES: Record<DiagnosisView, { icon: string; title: string; tone: string }> = {
  not_plant: { icon: '🔍', title: "We couldn't find a plant in this photo", tone: 'warn' },
  unclear_photo: { icon: '📷', title: 'The photo is not clear enough', tone: 'warn' },
  healthy: { icon: '✅', title: 'Looks healthy', tone: 'good' },
  likely: { icon: '🩺', title: 'Likely problem found', tone: 'alert' },
  possible: { icon: '🩺', title: 'Possible causes', tone: 'alert' },
  uncertain: { icon: '🤔', title: 'Not sure yet', tone: 'warn' },
};

const ERROR_TITLES: Record<DiagnosisErrorKind, string> = {
  offline: "You're offline",
  not_configured: 'The scan service is not available',
  auth: 'Could not start your session',
  daily_limit: "You've used today's scans",
  rate_limited: 'The AI is busy',
  bad_image: "This photo couldn't be read",
  timeout: 'The AI took too long',
  server: 'Something went wrong',
};

function CandidateCard({
  candidate,
  rank,
  cropId,
  onOpenGuide,
}: {
  candidate: DiagnosisCandidate;
  rank: number;
  cropId: string;
  onOpenGuide: (diseaseId: string) => void;
}) {
  const verified = candidate.catalog_condition_id ? getDiseaseKnowledge(candidate.catalog_condition_id) : null;
  return (
    <div className={`dx-candidate ${rank === 0 ? 'dx-candidate-top' : ''}`}>
      <div className="dx-candidate-head">
        <span className="dx-rank">{rank + 1}</span>
        <div className="dx-candidate-text">
          <div className="dx-candidate-name">{verified?.name_en || candidate.name}</div>
          <div className="dx-candidate-meta">
            <span className={`dx-pill ${candidate.likelihood === 'likely' ? 'dx-pill-likely' : 'dx-pill-possible'}`}>
              {candidate.likelihood === 'likely' ? 'Likely' : 'Possible'}
            </span>
            <span className="dx-pill dx-pill-cat">{CATEGORY_LABELS[candidate.category]}</span>
            {verified ? (
              <span className="dx-pill dx-pill-verified">Verified guide</span>
            ) : (
              <span className="dx-pill dx-pill-ai">AI-named, not verified</span>
            )}
          </div>
        </div>
      </div>
      {candidate.visible_evidence && <p className="dx-evidence">What we see: {candidate.visible_evidence}</p>}
      {verified && cropId && (
        <button type="button" className="dx-guide-btn" onClick={() => onOpenGuide(verified.id)}>
          Open treatment &amp; prevention guide →
        </button>
      )}
    </div>
  );
}

export const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({
  scanData,
  onScanAnother,
  onOpenGuide,
  onBrowseCrop,
  onTrySample,
}) => {
  const [state, setState] = useState<DiagnosisScanData>(scanData);
  const [retrying, setRetrying] = useState(false);

  const retry = async () => {
    if (retrying) return;
    setRetrying(true);
    const outcome = await diagnosePlant(state.imageUri, state.cropHint);
    setState(
      outcome.ok
        ? {
            imageUri: state.imageUri,
            cropHint: state.cropHint,
            plantDiagnosis: outcome.diagnosis,
            model: outcome.model,
            scansRemainingToday: outcome.quota?.scansRemainingToday,
          }
        : {
            imageUri: state.imageUri,
            cropHint: state.cropHint,
            diagnosisError: { kind: outcome.kind, message: outcome.message, retryable: outcome.retryable },
          }
    );
    setRetrying(false);
  };

  const d = state.plantDiagnosis;
  const error = state.diagnosisError;

  if (retrying) {
    return (
      <div className="result-container result-center">
        <div className="analyzing-overlay">
          <div className="spinner" />
          <h3 className="analyzing-title">Analysing again…</h3>
          <p className="analyzing-subtitle">Checking the plant and looking for signs of trouble.</p>
        </div>
      </div>
    );
  }

  // ---- Error state: always offers a way forward ----
  if (!d) {
    const kind = error?.kind ?? 'server';
    return (
      <div className="result-container">
        <div className="result-content">
          {state.imageUri && <img src={state.imageUri} alt="Your photo" className="result-image" />}
          <div className="dx-headline dx-tone-warn">
            <span className="dx-headline-icon">⚠️</span>
            <h2 className="dx-headline-title">{ERROR_TITLES[kind]}</h2>
          </div>
          <div className="card">
            <p className="card-body">{error?.message ?? 'Please try again.'}</p>
          </div>
          <div className="dx-actions">
            {(error?.retryable ?? true) && (
              <button type="button" className="dx-action dx-action-primary" onClick={retry}>
                🔄 Try again with this photo
              </button>
            )}
            <button type="button" className="dx-action" onClick={onScanAnother}>
              📷 Take a different photo
            </button>
            <button type="button" className="dx-action" onClick={() => onBrowseCrop(state.cropHint)}>
              📚 Browse the crop library
            </button>
            <button type="button" className="dx-action" onClick={onTrySample}>
              🧪 See a sample result
            </button>
          </div>
        </div>
      </div>
    );
  }

  const view = getDiagnosisView(d);
  const headline = HEADLINES[view];
  const cropId = d.plant.catalog_crop_id;
  const crop = cropId ? getCropKnowledge(cropId) : null;
  const plantLabel = crop?.name_en || d.plant.common_name;
  const showCandidates = view === 'likely' || view === 'possible' || view === 'uncertain';

  return (
    <div className="result-container">
      <div className="result-content">
        <img src={state.imageUri} alt="Your plant" className="result-image" />

        <div className={`dx-headline dx-tone-${headline.tone}`}>
          <span className="dx-headline-icon">{headline.icon}</span>
          <h2 className="dx-headline-title">
            {view === 'likely' && d.candidates[0]
              ? getDiseaseKnowledge(d.candidates[0].catalog_condition_id)?.name_en || d.candidates[0].name
              : headline.title}
          </h2>
        </div>

        {d.is_plant && plantLabel && (
          <div className="card dx-plant-card">
            <div className="dx-plant-row">
              <span className="dx-plant-icon">{(cropId && CROP_ICONS[cropId]) || '🌿'}</span>
              <div>
                <div className="dx-plant-name">{plantLabel}</div>
                {d.plant.scientific_name && <div className="dx-plant-sci">{d.plant.scientific_name}</div>}
                <div className="dx-plant-conf">
                  Plant identification: {d.plant.identification_confidence} confidence
                  {crop ? ' · in our crop library' : ''}
                </div>
              </div>
            </div>
          </div>
        )}

        {d.summary && (
          <div className="card">
            <p className="card-body">{d.summary}</p>
          </div>
        )}

        {(view === 'unclear_photo' || view === 'not_plant' || (d.retake_tip && view === 'uncertain')) && d.retake_tip && (
          <div className="card tip-card">
            <div className="card-title">📸 For a better result</div>
            <p className="card-body">{d.retake_tip}</p>
          </div>
        )}

        {showCandidates && d.candidates.length > 0 && (
          <>
            <h3 className="section-heading">{view === 'likely' ? 'Most likely, and other possibilities' : 'What it could be'}</h3>
            {d.candidates.map((c, i) => (
              <CandidateCard
                key={`${c.name}-${i}`}
                candidate={c}
                rank={i}
                cropId={cropId}
                onOpenGuide={(diseaseId) => onOpenGuide(cropId, diseaseId, state.imageUri)}
              />
            ))}
          </>
        )}

        {showCandidates && d.follow_up_question && (
          <div className="card dx-question-card">
            <div className="card-title">❓ Check this to tell them apart</div>
            <p className="card-body">{d.follow_up_question}</p>
          </div>
        )}

        {d.general_care.length > 0 && view !== 'not_plant' && (
          <>
            <h3 className="section-heading">{view === 'healthy' ? 'Keep it healthy' : 'Safe steps you can take now'}</h3>
            <div className="card">
              <ul className="dx-care-list">
                {d.general_care.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="dx-actions">
          {(view === 'not_plant' || view === 'unclear_photo' || view === 'uncertain') && (
            <button type="button" className="dx-action dx-action-primary" onClick={onScanAnother}>
              📷 Retake the photo
            </button>
          )}
          {(view === 'likely' || view === 'possible' || view === 'healthy') && (
            <button type="button" className="dx-action dx-action-primary" onClick={onScanAnother}>
              📷 Scan another plant
            </button>
          )}
          {view !== 'not_plant' && (
            <button type="button" className="dx-action" onClick={retry}>
              🔄 Analyse this photo again
            </button>
          )}
          <button type="button" className="dx-action" onClick={() => onBrowseCrop(cropId || state.cropHint)}>
            📚 {crop ? `Browse ${crop.name_en} conditions` : 'Browse the crop library'}
          </button>
          {view === 'not_plant' && (
            <button type="button" className="dx-action" onClick={onTrySample}>
              🧪 See a sample result
            </button>
          )}
        </div>

        <div className="card disclaimer-card">
          <p className="disclaimer-text">
            This is an AI-assisted first opinion from a single photo, not a confirmed diagnosis. Before using any
            pesticide or chemical, confirm with your local agriculture extension office or a plant clinic, and always
            follow the product label and local rules.
            {state.model ? ` · Analysed by ${state.model.replace(/-/g, ' ')}` : ''}
            {typeof state.scansRemainingToday === 'number' ? ` · ${state.scansRemainingToday} scans left today` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
