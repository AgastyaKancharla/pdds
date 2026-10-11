import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { urgencyFromConfidence } from '../lib/detection';
import { getMockCrop, getMockDisease, getMockTreatments, MOCK_CROPS, MOCK_DISEASES } from '../lib/mockData';
import { supabase } from '../lib/supabase';
import { getLocalUserId, getAuthenticatedUserId } from '../lib/auth';
import { saveScanRecord } from '../lib/storage';
import { getDiseaseKnowledge, getCropKnowledge } from '../lib/knowledge';
import {
  cacheRemoteCrop,
  getCachedRemoteCrop,
  cacheRemoteDisease,
  getCachedRemoteDisease,
  cacheRemoteTreatments,
  getCachedRemoteTreatments,
} from '../lib/cache/knowledgeCache';
import { cacheScanResult } from '../lib/cache/scanResultCache';
import type { Crop, Disease, Treatment, TreatmentType, UrgencyColor } from '../types/database';
import type { DiagnosticTier } from '../lib/ai/types';
import type { ScanResultData } from './ScanScreen';

interface ResultScreenProps {
  scanData: ScanResultData;
  onScanAnother: () => void;
  onHome: () => void;
  onSelectSample: () => void;
}

const URGENCY_STYLE: Record<UrgencyColor, { bg: string; fg: string; label: string }> = {
  red: { bg: '#FDECEA', fg: '#C62828', label: 'actToday' },
  yellow: { bg: '#FFF8E1', fg: '#F9A825', label: 'monitor' },
  green: { bg: '#E8F5E9', fg: '#2D6A4F', label: 'healthy' },
};

const TABS: TreatmentType[] = ['organic', 'chemical', 'preventive'];

const CROP_ICONS: Record<string, string> = {
  'crop-rice': '🌾',
  'crop-chilli': '🌶️',
  'crop-cotton': '☁️',
  'crop-groundnut': '🥜',
  'crop-maize': '🌽',
  'crop-sugarcane': '🎋',
  'crop-tomato': '🍅',
  'crop-mango': '🥭',
  'crop-banana': '🍌',
  'crop-turmeric': '🌿',
};

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scanData,
  onScanAnother,
  onHome,
  onSelectSample,
}) => {
  const { language, t } = useLanguage();
  const {
    imageUri,
    detected,
    cropId,
    diseaseId,
    failureReason = 'not_crop',
    messageEn,
    messageTe,
    cropNameEn,
    cropNameTe,
    isDemoSample = false,
  } = scanData;

  const [selectedCropId, setSelectedCropId] = useState<string | undefined>(cropId);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | undefined>(diseaseId);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [disease, setDisease] = useState<Disease | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeTab, setActiveTab] = useState<TreatmentType>('organic');
  const [loading, setLoading] = useState(detected && !!cropId && !!diseaseId);
  type SaveStatus = 'idle' | 'saving' | 'saved_cloud' | 'saved_local' | 'failed';
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [scanId] = useState<string>(() => 'scan_' + Date.now());

  useEffect(() => {
    setSelectedCropId(cropId);
    setSelectedDiseaseId(diseaseId);
    setSaveStatus('idle');
    setSaveError(null);
  }, [cropId, diseaseId]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (!detected || !selectedCropId || !selectedDiseaseId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      let loadedCrop: Crop | null = null;
      let loadedDisease: Disease | null = null;
      let loadedTreatments: Treatment[] = [];

      if (supabase) {
        try {
          const [cropRes, diseaseRes, treatmentsRes] = await Promise.all([
            supabase.from('crops').select('*').eq('id', selectedCropId).single(),
            supabase.from('diseases').select('*').eq('id', selectedDiseaseId).single(),
            supabase
              .from('treatments')
              .select('*')
              .eq('disease_id', selectedDiseaseId)
              .order('step_number', { ascending: true }),
          ]);

          if (cropRes.data) {
            loadedCrop = cropRes.data as Crop;
            cacheRemoteCrop(loadedCrop);
          }
          if (diseaseRes.data) {
            loadedDisease = diseaseRes.data as Disease;
            cacheRemoteDisease(loadedDisease);
          }
          if (treatmentsRes.data && treatmentsRes.data.length > 0) {
            loadedTreatments = treatmentsRes.data as Treatment[];
            cacheRemoteTreatments(selectedDiseaseId, loadedTreatments);
          }
        } catch (err) {
          console.warn('[HereForNature] Supabase load note:', err);
        }
      }

      // If remote load was unavailable (e.g. offline), query local reference cache before mock/catalog
      if (!loadedCrop && selectedCropId) {
        const cachedCrop = getCachedRemoteCrop(selectedCropId);
        loadedCrop = cachedCrop?.data || getMockCrop(selectedCropId) || null;
      }
      if (!loadedDisease && selectedDiseaseId) {
        const cachedDisease = getCachedRemoteDisease(selectedDiseaseId);
        loadedDisease = cachedDisease?.data || getMockDisease(selectedDiseaseId) || null;
      }
      if (loadedTreatments.length === 0 && selectedDiseaseId) {
        const cachedTreatments = getCachedRemoteTreatments(selectedDiseaseId);
        if (cachedTreatments) {
          loadedTreatments = cachedTreatments.data;
        }
      }
      // CRITICAL INTEGRITY FIX:
      // When a curated knowledge-base entry exists, NEVER load or fall back to MOCK_TREATMENTS.
      // Only demonstration mode samples without curated catalog entries may load demo treatments.
      if (
        loadedTreatments.length === 0 &&
        loadedDisease &&
        isDemoSample &&
        !getDiseaseKnowledge(selectedDiseaseId)
      ) {
        loadedTreatments = getMockTreatments(loadedDisease.id);
      }

      if (cancelled) return;

      setCrop(loadedCrop);
      setDisease(loadedDisease);
      setTreatments(loadedTreatments);
      setLoading(false);
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [detected, selectedCropId, selectedDiseaseId, isDemoSample]);

  const diseaseKnowledge = useMemo(
    () => (selectedDiseaseId ? getDiseaseKnowledge(selectedDiseaseId) : undefined),
    [selectedDiseaseId]
  );

  const cropKnowledge = useMemo(
    () => (selectedCropId ? getCropKnowledge(selectedCropId) : undefined),
    [selectedCropId]
  );

  const treatmentsByTab = useMemo(
    () => treatments.filter((row) => row.type === activeTab),
    [treatments, activeTab]
  );

  const displayTreatments = useMemo(() => {
    if (diseaseKnowledge) {
      // 1. Curated knowledge entry exists:
      // Strictly render ONLY curated treatments for activeTab.
      // NEVER fall back to MOCK_TREATMENTS or treatmentsByTab when a category is empty!
      const tabTreatments = diseaseKnowledge.treatments.filter((row) => row.category === activeTab);
      return tabTreatments.map((t) => ({
        id: t.id,
        step_number: t.stepNumber,
        instruction: language === 'en' ? t.instruction_en : t.instruction_te,
        active_ingredient: language === 'en' ? t.activeIngredient_en : t.activeIngredient_te,
        safety_caution: language === 'en' ? t.safetyCaution_en : t.safetyCaution_te,
        regulatory_notice: language === 'en' ? t.regulatoryNotice_en : t.regulatoryNotice_te,
      }));
    }

    // 2. Demonstration sample mode only:
    if (isDemoSample) {
      return treatmentsByTab.map((t) => ({
        id: t.id,
        step_number: t.step_number,
        instruction: language === 'en' ? t.instruction_en : t.instruction_te,
        active_ingredient: t.product_name,
        safety_caution: undefined,
        regulatory_notice: undefined,
      }));
    }

    // 3. Unsupported crops and diseases:
    // Under NO circumstances receive treatment fallback instructions!
    return [];
  }, [diseaseKnowledge, activeTab, treatmentsByTab, language, isDemoSample]);

  const urgencyColor: UrgencyColor = disease?.urgency_color || 'yellow';

  const isPest = useMemo(() => {
    if (!diseaseKnowledge) {
      const dName = disease?.name_en?.toLowerCase() || '';
      const dType = disease?.type?.toLowerCase() || '';
      return (
        dName.includes('bollworm') ||
        dName.includes('armyworm') ||
        dType.includes('pest') ||
        dType.includes('insect')
      );
    }
    const pv = diseaseKnowledge.pathogenOrVector_en.toLowerCase();
    return (
      pv.includes('pest') ||
      pv.includes('insect') ||
      pv.includes('larv') ||
      pv.includes('caterpillar') ||
      pv.includes('moth')
    );
  }, [diseaseKnowledge, disease]);

  const conditionTypeBadge = useMemo(() => {
    if (isPest) {
      return { label: t('insectPest'), icon: '🐛' };
    }
    const pv = diseaseKnowledge?.pathogenOrVector_en?.toLowerCase() || disease?.type?.toLowerCase() || '';
    if (pv.includes('virus') || pv.includes('viral')) {
      return { label: t('viralDisease'), icon: '🦠' };
    }
    return { label: t('plantDisease'), icon: '🍄' };
  }, [isPest, diseaseKnowledge, disease, t]);

  const effectiveTier: DiagnosticTier = useMemo(() => {
    const rawTier = scanData.diagnosticTier || scanData.normalizedDiagnosis?.provenance?.tier;
    if (rawTier === 'expert_confirmed') {
      return 'ai_preliminary_hypothesis';
    }
    if (rawTier) return rawTier;
    if (isDemoSample) return 'demonstration_sample';
    if (scanData.isCachedResult) return 'legacy_or_unknown';
    return 'ai_preliminary_hypothesis';
  }, [scanData.diagnosticTier, scanData.normalizedDiagnosis, isDemoSample, scanData.isCachedResult]);

  const handleSave = async () => {
    const activeCropId = crop?.id || selectedCropId;
    const activeDiseaseId = disease?.id || selectedDiseaseId;
    if (saveStatus === 'saving' || saveStatus === 'saved_cloud' || saveStatus === 'saved_local' || !activeCropId || !activeDiseaseId) return;
    setSaveStatus('saving');
    setSaveError(null);

    try {
      const saveResult = await saveScanRecord({
        scanId,
        imageUri,
        cropId: activeCropId,
        diseaseId: activeDiseaseId,
        urgencyColor,
        isDemoSample,
        diagnosticTier: effectiveTier,
        crop,
        disease,
      });

      if (!saveResult.success) {
        setSaveStatus('failed');
        setSaveError(saveResult.error || 'Save failed');
        return;
      }

      const authUserId = await getAuthenticatedUserId();
      const effectiveUserId = authUserId || getLocalUserId();
      cacheScanResult(effectiveUserId, scanId, {
        imageUri,
        detected,
        cropId: activeCropId,
        diseaseId: activeDiseaseId,
        cropNameEn,
        cropNameTe,
        isDemoSample,
        diagnosticTier: effectiveTier,
        normalizedDiagnosis: scanData.normalizedDiagnosis,
      });

      if (saveResult.savedCloud) {
        setSaveStatus('saved_cloud');
      } else {
        setSaveStatus('saved_local');
      }
    } catch (err) {
      console.warn('[HereForNature] Save scan error:', err);
      setSaveStatus('failed');
      setSaveError(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const handleShareWhatsApp = () => {
    if (!crop || !disease) return;
    const cropName = language === 'en' ? crop.name_en : crop.name_te;
    const diseaseName = language === 'en' ? disease.name_en : disease.name_te;
    const conditionFieldLabel = isPest ? (language === 'en' ? 'Pest' : 'పురుగు') : t('disease');
    const assessmentLabel =
      effectiveTier === 'demonstration_sample'
        ? (language === 'en' ? 'Demonstration Sample (Illustrative Preview)' : 'నమూనా ప్రదర్శన (సూచనార్థం మాత్రమే)')
        : effectiveTier === 'legacy_or_unknown'
        ? (language === 'en' ? 'Legacy Record (Unspecified Provenance)' : 'పాత రికార్డు (అనిర్దిష్ట మూలం)')
        : (language === 'en' ? 'Preliminary AI Observation (Confirm with RBK before spraying)' : 'ప్రాథమిక AI పరిశీలన (పిచికారీకి ముందు RBK తో ధృవీకరించుకోండి)');
    const message =
      `${t('appName')} - AP Crop Doctor\n` +
      `${t('crop')}: ${cropName}\n` +
      `${conditionFieldLabel}: ${diseaseName}\n` +
      `Assessment: ${assessmentLabel}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="result-container result-center">
        <div className="spinner" />
        <p className="loading-text">{t('loading')}</p>
      </div>
    );
  }

  // Non-detected or special failure view (healthy, unsupported crop, non-crop image, abiotic stress, nutrient deficiency, or unclear)
  if (!detected || !crop || !disease) {
    const isHealthy = failureReason === 'healthy';
    const isUnsupported = failureReason === 'unsupported_crop';
    const isUnclear = failureReason === 'unclear';
    const isOffline = failureReason === 'provider_unavailable';
    const isAbiotic = failureReason === 'abiotic_stress';
    const isNutrient = failureReason === 'nutrient_deficiency';

    let badgeClass = 'not-detected-badge';
    let dotClass = 'not-detected-dot';
    let badgeText = t('cropNotDetected');
    let titleText = t('cropNotDetectedTitle');
    let secondaryTitle = language === 'en' ? 'పంట లేదా తెగులు కనుగొనబడలేదు' : 'No Crop or Disease Found';

    if (isHealthy) {
      badgeClass = 'healthy-badge';
      dotClass = 'healthy-dot';
      badgeText = t('healthyCropTitle');
      titleText = t('healthyCropTitle');
      secondaryTitle = language === 'en' ? 'పంట ఆరోగ్యంగా ఉంది' : 'Crop Appears Healthy';
    } else if (isAbiotic) {
      badgeClass = 'unsupported-badge';
      dotClass = 'unsupported-dot';
      badgeText = t('abioticStressTitle');
      titleText = t('abioticStressTitle');
      secondaryTitle = cropNameEn || cropNameTe || (language === 'en' ? 'పర్యావరణ ఒత్తిడి' : 'Abiotic Stress');
    } else if (isNutrient) {
      badgeClass = 'unsupported-badge';
      dotClass = 'unsupported-dot';
      badgeText = t('nutrientDeficiencyTitle');
      titleText = t('nutrientDeficiencyTitle');
      secondaryTitle = cropNameEn || cropNameTe || (language === 'en' ? 'పోషక లోపం' : 'Nutrient Deficiency');
    } else if (isUnsupported) {
      badgeClass = 'unsupported-badge';
      dotClass = 'unsupported-dot';
      badgeText = t('unsupportedCropTitle');
      titleText = t('unsupportedCropTitle');
      secondaryTitle = cropNameEn || cropNameTe || (language === 'en' ? 'పంట డేటాబేస్ లో లేదు' : 'Crop Not in Database');
    } else if (isOffline) {
      badgeClass = 'unsupported-badge';
      dotClass = 'unsupported-dot';
      badgeText = t('offlineModeBadge');
      titleText = t('offlineModeBadge');
      secondaryTitle = language === 'en' ? 'ఆఫ్‌లైన్ వ్యవసాయ మార్గదర్శి' : 'Offline Agricultural Guide';
    }

    const explanationText =
      language === 'en'
        ? messageEn || (isOffline ? t('offlineAiNotice') : isHealthy ? t('healthyCropDesc') : isAbiotic ? t('abioticStressDesc') : isNutrient ? t('nutrientDeficiencyDesc') : isUnsupported ? t('unsupportedCropDesc') : isUnclear ? t('unclearDesc') : t('notCropDesc'))
        : messageTe || (isOffline ? t('offlineAiNotice') : isHealthy ? t('healthyCropDesc') : isAbiotic ? t('abioticStressDesc') : isNutrient ? t('nutrientDeficiencyDesc') : isUnsupported ? t('unsupportedCropDesc') : isUnclear ? t('unclearDesc') : t('notCropDesc'));

    return (
      <div className="result-container">
        <div className="result-content">
          {imageUri && (
            <img
              src={imageUri}
              alt="Uploaded Image"
              className="result-image"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          )}

          <div className={`urgency-badge ${badgeClass}`}>
            <span className={`dot ${dotClass}`} />
            <span className="urgency-text">{badgeText}</span>
          </div>

          <h2 className="disease-title">{titleText}</h2>
          <h3 className="disease-title-secondary">{secondaryTitle}</h3>

          <div className="card unrecognized-card">
            <h4 className="card-title">
              {isOffline
                ? '📡 ' + t('offlineModeBadge')
                : isHealthy
                ? '🌱 ' + t('healthyCropTitle')
                : isAbiotic
                ? '☀️ ' + t('abioticStressTitle')
                : isNutrient
                ? '🧪 ' + t('nutrientDeficiencyTitle')
                : isUnsupported
                ? '🌾 ' + t('unsupportedCropTitle')
                : t('unrecognizedImage')}
            </h4>
            <p className="card-body">{explanationText}</p>
          </div>

          {isHealthy && (
            <div className="card" style={{ borderLeft: '4px solid #43A047', background: '#E8F5E9' }}>
              <h4 className="card-title" style={{ color: '#2E7D32' }}>
                🌱 {language === 'en' ? 'Visual Foliar Observation Only' : 'దృశ్య ఆకుల పరిశీలన మాత్రమే'}
              </h4>
              <p className="card-body" style={{ color: '#1B5E20', fontSize: '13px', lineHeight: '1.5' }}>
                {t('healthyFoliageObservationNotice')}
              </p>
            </div>
          )}

          {(isAbiotic || isNutrient) && (
            <div className="card" style={{ borderLeft: '4px solid #F57C00', background: '#FFF8E1' }}>
              <h4 className="card-title" style={{ color: '#E65100' }}>
                ⚠️ {language === 'en' ? 'No Pesticides / Fungicides Needed' : 'పురుగు లేదా శిలీంద్ర మందులు అవసరం లేదు'}
              </h4>
              <p className="card-body" style={{ color: '#5D4037', fontSize: '13px', lineHeight: '1.5' }}>
                {language === 'en'
                  ? 'This condition is physiological or nutritional, not an infectious fungal or bacterial disease. Chemical pesticide sprays will NOT help and may cause chemical leaf burn or unnecessary financial cost. Consult your local Rythu Bharosa Kendra (RBK) or agricultural extension officer for fertilizer and irrigation management.'
                  : 'ఈ పరిస్థితి శారీరక లేదా పోషకాహార లోపానికి సంబంధించినది, సంక్రమణ తెగులు కాదు. రసాయన మందుల పిచికారీ ఎటువంటి ప్రయోజనం కలిగించదు, పైగా ఖర్చు పెరుగుతుంది. ఎరువులు మరియు నీటి నిర్వహణ కోసం స్థానిక రైతు భరోసా కేంద్రాన్ని (RBK) సంప్రదించండి.'}
              </p>
            </div>
          )}

          {(isUnsupported || isOffline) && (
            <div className="card supported-crops-card">
              <h4 className="card-title">
                🌾 {language === 'en' ? 'Browse Supported AP Crop Guides Offline:' : 'ఆఫ్‌లైన్ AP పంటల నివారణ మార్గదర్శి:'}
              </h4>
              <div className="crop-switch-chips" style={{ marginTop: '8px' }}>
                {MOCK_CROPS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="crop-switch-chip"
                    onClick={() => {
                      const matchedDis = MOCK_DISEASES.find((d) => d.crop_id === c.id);
                      setSelectedCropId(c.id);
                      setSelectedDiseaseId(matchedDis?.id);
                      setSaveStatus('idle');
                    }}>
                    {(CROP_ICONS[c.id] || '🌱') + ' '}
                    {language === 'en' ? c.name_en : c.name_te}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="card tips-card">
            <h4 className="card-title">{t('tipsTitle')}</h4>
            <div className="tip-row">
              <span className="tip-icon">🌿</span>
              <p className="tip-text">{t('tipLeaf')}</p>
            </div>
            <div className="tip-row">
              <span className="tip-icon">☀️</span>
              <p className="tip-text">{t('tipLight')}</p>
            </div>
            <div className="tip-row">
              <span className="tip-icon">🚫</span>
              <p className="tip-text">{t('tipNoLogos')}</p>
            </div>

            <button type="button" className="btn-sample-test-card" onClick={onSelectSample}>
              🧪 {t('testSample')}
            </button>
          </div>

          {/* AI Advisory Disclaimer */}
          <div className="card disclaimer-card">
            <h4 className="card-title">⚖️ {t('disclaimerTitle')}</h4>
            <p className="card-body disclaimer-text">{t('disclaimerText')}</p>
          </div>
        </div>

        <div className="result-footer">
          <button type="button" className="footer-btn secondary-btn" onClick={onScanAnother}>
            {t('scanAnother')}
          </button>
          <button type="button" className="footer-btn primary-btn" onClick={onHome}>
            {t('backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const urgency = URGENCY_STYLE[urgencyColor];

  const evidenceStatus = diseaseKnowledge?.evidenceStatus || (isDemoSample ? 'demonstration_only' : 'provisional');

  return (
    <div className="result-container">
      <div className="result-content">
        {imageUri && (
          <img
            src={imageUri}
            alt="Scanned Crop"
            className="result-image"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        )}

        {/* Status badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <div className="urgency-badge" style={{ backgroundColor: urgency.bg, color: urgency.fg, marginBottom: 0 }}>
            <span className="dot" style={{ backgroundColor: urgency.fg }} />
            <span className="urgency-text">
              {t(urgency.label as 'actToday' | 'monitor' | 'healthy')}
            </span>
          </div>

          <div
            className="condition-type-badge"
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              background: '#e9ecef',
              color: '#343a40',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: 0,
            }}>
            <span>{conditionTypeBadge.icon}</span>
            <span>{conditionTypeBadge.label}</span>
          </div>

          {/* Diagnostic Tier Badge: Explicit separation of AI preliminary hypothesis vs textbook catalog reference */}
          {effectiveTier === 'demonstration_sample' && (
            <div className="evidence-badge evidence-provisional" style={{ marginBottom: 0 }}>
              🧪 {t('evidenceStatusDemo')}
            </div>
          )}
          {effectiveTier === 'legacy_or_unknown' && (
            <div
              className="evidence-badge"
              style={{
                marginBottom: 0,
                backgroundColor: '#FFF3E0',
                color: '#E65100',
                border: '1px solid #FFE082',
              }}>
              📋 {t('legacyRecordBadge')}
            </div>
          )}
          {effectiveTier === 'ai_preliminary_hypothesis' && (
            <div
              className="evidence-badge"
              style={{
                marginBottom: 0,
                backgroundColor: '#EDE7F6',
                color: '#512DA8',
                border: '1px solid #D1C4E9',
              }}>
              🔬 {t('aiPreliminaryHypothesisBadge')}
            </div>
          )}

          {diseaseKnowledge?.evidenceStatus === 'verified_reference' && (
            <div className="evidence-badge evidence-verified" style={{ marginBottom: 0 }}>
              📚 {t('curatedReferenceBadge')}
            </div>
          )}
          {evidenceStatus === 'provisional' && !isDemoSample && (
            <div className="evidence-badge evidence-provisional" style={{ marginBottom: 0 }}>
              ⚠️ {t('evidenceStatusProvisional')}
            </div>
          )}
          {scanData.isCachedResult && (
            <div
              className="evidence-badge"
              style={{
                marginBottom: 0,
                backgroundColor: '#E3F2FD',
                color: '#1565C0',
                border: '1px solid #90CAF9',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}>
              💾 {t('cachedResultBadge')}
            </div>
          )}
        </div>

        <span className="crop-label">{language === 'en' ? crop.name_en : crop.name_te}</span>
        <h2 className="disease-title">
          {language === 'en' ? disease.name_en : disease.name_te}
        </h2>
        <h3 className="disease-title-secondary">
          {language === 'en' ? disease.name_te : disease.name_en}
        </h3>

        {diseaseKnowledge && (
          <p className="pathogen-text">
            <strong>{isPest ? t('pestOrganismLabel') : t('pathogenLabel')}</strong>{' '}
            {language === 'en' ? diseaseKnowledge.pathogenOrVector_en : diseaseKnowledge.pathogenOrVector_te}
          </p>
        )}

        {scanData.isCachedResult && (
          <div
            className="cached-notice-banner"
            style={{
              margin: '8px 0',
              padding: '10px 14px',
              background: '#e3f2fd',
              border: '1px solid #90caf9',
              borderRadius: '8px',
              color: '#0d47a1',
              fontSize: '13px',
              fontWeight: 500,
            }}>
            <div>
              <strong>💾 {t('cachedResultNotice')}</strong>
            </div>
            {scanData.cachedAt && (
              <div style={{ marginTop: '4px', fontSize: '11px', color: '#1565c0' }}>
                {t('cachedResultDate')} {new Date(scanData.cachedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {effectiveTier === 'demonstration_sample' ? (
          <div className="demo-notice-banner" style={{ margin: '8px 0', padding: '10px 14px', background: '#e8f4fd', border: '1px solid #90caf9', borderRadius: '8px', color: '#0d47a1', fontSize: '13px', fontWeight: 600 }}>
            🧪 {t('demoNotice')}
          </div>
        ) : effectiveTier === 'legacy_or_unknown' ? (
          <div
            className="legacy-notice-banner"
            style={{
              margin: '8px 0',
              padding: '10px 14px',
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderRadius: '8px',
              color: '#E65100',
              fontSize: '12px',
              fontWeight: 500,
            }}>
            📋 <strong>{t('legacyRecordBadge')}:</strong> {t('legacyRecordNotice')}
          </div>
        ) : (
          <div
            className="preliminary-notice-banner"
            style={{
              margin: '8px 0',
              padding: '8px 12px',
              background: '#F3E5F5',
              border: '1px solid #E1BEE7',
              borderRadius: '6px',
              color: '#4A148C',
              fontSize: '12px',
              fontWeight: 500,
            }}>
            🔬 <strong>{t('aiPreliminaryHypothesisBadge')}:</strong> {t('aiPreliminaryHypothesisNotice')}
          </div>
        )}

        {(isDemoSample || scanData.failureReason === 'provider_unavailable' || (typeof navigator !== 'undefined' && !navigator.onLine)) && (
          <div className="offline-notice-banner">
            <span>📡</span>
            <span>{t('offlineModeNotice')}</span>
          </div>
        )}

        {/* Farmer Crop Switcher Bar */}
        <div className="crop-switch-section">
          <span className="crop-switch-hint">{t('selectCropHint')}</span>
          <div className="crop-switch-chips">
            {MOCK_CROPS.map((c) => {
              const isActive = c.id === (crop?.id || selectedCropId);
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`crop-switch-chip ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    const matchedDis = MOCK_DISEASES.find((d) => d.crop_id === c.id);
                    setSelectedCropId(c.id);
                    setSelectedDiseaseId(matchedDis?.id);
                    setSaveStatus('idle');
                  }}>
                  {(CROP_ICONS[c.id] || '🌱') + ' '}
                  {language === 'en' ? c.name_en : c.name_te}
                </button>
              );
            })}
          </div>
        </div>

        {/* Symptoms */}
        <div className="card">
          <h4 className="card-title">{t('symptoms')}</h4>
          <p className="card-body">
            {language === 'en' ? disease.symptoms_en : disease.symptoms_te}
          </p>
        </div>

        {/* Visual symptoms observed by AI */}
        {scanData.normalizedDiagnosis?.conditionAssessment.visualSymptoms &&
          scanData.normalizedDiagnosis.conditionAssessment.visualSymptoms.length > 0 && (
            <div className="card" style={{ borderLeft: '4px solid #1976D2' }}>
              <h4 className="card-title">🔬 {t('visualObservationsTitle')}</h4>
              <ul style={{ margin: '8px 0 0 16px', padding: 0, fontSize: '13px', color: '#2C3E50' }}>
                {scanData.normalizedDiagnosis.conditionAssessment.visualSymptoms.map((sym, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{sym}</li>
                ))}
              </ul>
            </div>
          )}

        {/* AI Differential Considerations */}
        {scanData.normalizedDiagnosis?.differentialHypotheses &&
          scanData.normalizedDiagnosis.differentialHypotheses.length > 0 && (
            <div className="card" style={{ borderLeft: '4px solid #FF9800' }}>
              <h4 className="card-title">🔍 {t('differentialHypothesesTitle')}</h4>
              {scanData.normalizedDiagnosis.differentialHypotheses.map((dh, idx) => (
                <div key={idx} style={{ fontSize: '13px', marginBottom: '6px', color: '#37474F' }}>
                  <strong>{dh.conditionName}</strong>
                  {dh.likelihood && <span style={{ fontSize: '11px', color: '#78909C', marginLeft: '6px' }}>({dh.likelihood})</span>}:{' '}
                  {dh.reasoning}
                </div>
              ))}
            </div>
          )}

        {/* Lookalikes & Differential Diagnosis */}
        {diseaseKnowledge && (
          <div className="card lookalike-card">
            <h4 className="card-title">🔍 {t('lookalikesTitle')}</h4>
            <p className="card-body" style={{ marginBottom: '8px', fontSize: '12px' }}>
              {language === 'en'
                ? 'Field symptoms can resemble other pests or nutrient deficiencies. Distinguishing factors provide initial guidance, but visual field inspection alone does not guarantee conclusive identification.'
                : 'పొలంలో కనిపించే లక్షణాలు ఇతర తెగుళ్లు లేదా పోషక లోపాలతో సమానంగా ఉండవచ్చు. ఈ తేడాలు ప్రాథమిక మార్గదర్శకత్వం మాత్రమే, దృశ్య లక్షణాల ఆధారంగా మాత్రమే ఖచ్చితమైన నిర్ధారణ సాధ్యం కాదు.'}
            </p>
            {diseaseKnowledge.similarConditions.length > 0 ? (
              diseaseKnowledge.similarConditions.map((lookalike) => (
                <div key={lookalike.id} className="lookalike-item">
                  <div className="lookalike-header">
                    <span>{language === 'en' ? lookalike.name_en : lookalike.name_te}</span>
                    <span
                      className={`lookalike-tag ${
                        lookalike.isPathological ? 'lookalike-tag-pathology' : 'lookalike-tag-abiotic'
                      }`}>
                      {lookalike.isPathological ? t('differentialPestDisease') : t('differentialAbioticNutrient')}
                    </span>
                  </div>
                  <p className="lookalike-diff">
                    <strong>{t('lookalikeDifferentiatingFactor')}</strong>{' '}
                    {language === 'en' ? lookalike.differentiatingFactors_en : lookalike.differentiatingFactors_te}
                  </p>
                </div>
              ))
            ) : (
              <p className="card-body" style={{ fontStyle: 'italic', color: '#6c757d', fontSize: '13px' }}>
                {t('differentialUnderReview')}
              </p>
            )}
          </div>
        )}

        {/* Environmental & Management Risk Factors */}
        {diseaseKnowledge && diseaseKnowledge.environmentalRiskFactors_en.length > 0 && (
          <div className="card">
            <h4 className="card-title">🌦️ {t('riskFactorsTitle')}</h4>
            <ul className="risk-list">
              {(language === 'en' ? diseaseKnowledge.environmentalRiskFactors_en : diseaseKnowledge.environmentalRiskFactors_te).map(
                (risk, idx) => (
                  <li key={idx}>{risk}</li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Field Prevention & Cultural Practices */}
        {diseaseKnowledge && diseaseKnowledge.preventionGuidance.length > 0 && (
          <div className="card">
            <h4 className="card-title">🛡️ {t('preventionTitle')}</h4>
            <ol className="prevention-list">
              {diseaseKnowledge.preventionGuidance.map((prev) => (
                <li key={prev.stepNumber}>
                  {language === 'en' ? prev.practice_en : prev.practice_te}
                  {prev.targetTiming && (
                    <span style={{ fontSize: '11px', color: '#557257', display: 'block', marginTop: '2px' }}>
                      🕒 {prev.targetTiming}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* AP Specific Tip */}
        {(language === 'en' ? disease.ap_specific_tip_en : disease.ap_specific_tip_te) && (
          <div className="card tip-card">
            <h4 className="card-title">{t('apTip')}</h4>
            <p className="card-body">
              {language === 'en' ? disease.ap_specific_tip_en : disease.ap_specific_tip_te}
            </p>
          </div>
        )}

        {/* Treatments Tabs */}
        <div className="treatment-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`treatment-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}>
              {t(tab)}
            </button>
          ))}
        </div>

        {/* Treatments List with Active Ingredients & Safety Guidance */}
        <div className="treatment-list">
          {displayTreatments.length === 0 ? (
            <div
              className="card empty-category-card"
              style={{
                padding: '16px',
                background: '#f8f9fa',
                border: '1px dashed #ced4da',
                borderRadius: '8px',
                textAlign: 'center',
                margin: '8px 0',
              }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#495057', lineHeight: '1.5' }}>
                {activeTab === 'chemical' && diseaseKnowledge && diseaseKnowledge.evidenceStatus !== 'verified_reference'
                  ? t('suppressedChemicalNotice')
                  : t('noCategoryRecommendation')}
              </p>
              {diseaseKnowledge && diseaseKnowledge.preventionGuidance.length > 0 && activeTab === 'preventive' && (
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#2d6a4f', fontWeight: 500 }}>
                  🛡️ {t('seePreventionPracticesAbove')}
                </p>
              )}
            </div>
          ) : (
            displayTreatments.map((step) => (
              <div key={step.id} className="treatment-step-card">
                <span className="step-badge">{step.step_number}</span>
                <div className="step-content">
                  <p className="step-instruction">{step.instruction}</p>
                  {step.active_ingredient && (
                    <span className="step-product">
                      💊 {t('activeIngredientLabel')} {step.active_ingredient}
                    </span>
                  )}
                  {step.safety_caution && (
                    <div style={{ fontSize: '11px', color: '#c92a2a', marginTop: '4px', lineHeight: '1.4' }}>
                      ⚠️ <strong>{t('safetyCautionLabel')}</strong> {step.safety_caution}
                    </div>
                  )}
                  {step.regulatory_notice && (
                    <div style={{ fontSize: '11px', color: '#2b8a3e', marginTop: '4px', lineHeight: '1.4' }}>
                      🏛️ <strong>{t('regulatoryGuidanceLabel')}</strong> {step.regulatory_notice}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {activeTab === 'chemical' && displayTreatments.length > 0 && (
            <div className="statutory-safety-box">
              <div style={{ marginBottom: '6px' }}>
                ⚠️ <strong>{language === 'en' ? 'Statutory Warning:' : 'చట్టబద్ధమైన హెచ్చరిక:'}</strong>{' '}
                {t('pesticideSafetyWarning')}
              </div>
              <div style={{ fontSize: '12px', color: '#B71C1C', fontWeight: 600 }}>
                🛡️ {t('chemicalConsultOfficerWarning')}
              </div>
            </div>
          )}
        </div>

        {/* Expert Escalation Advice */}
        {diseaseKnowledge && (
          <div className="card escalation-card">
            <h4 className="card-title">🏛️ {t('escalationTitle')}</h4>
            <p className="card-body escalation-text">
              {language === 'en' ? diseaseKnowledge.escalationThreshold_en : diseaseKnowledge.escalationThreshold_te}
            </p>
          </div>
        )}

        {/* Agricultural Authority References */}
        {diseaseKnowledge && diseaseKnowledge.sources.length > 0 && (
          <div className="card">
            <h4 className="card-title">📚 {t('knowledgeSourceTitle')}</h4>
            {diseaseKnowledge.sources.map((src, idx) => (
              <div key={idx} className="source-attribution">
                <strong>{src.title}</strong>
                <div>{src.organization}</div>
                <div style={{ fontSize: '10px', color: '#889988', marginTop: '2px' }}>
                  Reviewed: {src.reviewDate} {src.url ? `• Reference: ${src.url}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Advisory Disclaimer */}
        <div className="card disclaimer-card">
          <h4 className="card-title">⚖️ {t('disclaimerTitle')}</h4>
          <p className="card-body disclaimer-text">{t('disclaimerText')}</p>
        </div>

        <button type="button" className="btn-whatsapp" onClick={handleShareWhatsApp}>
          <span>💬</span>
          <span>{t('shareWhatsApp')}</span>
        </button>
      </div>

      <div className="result-footer">
        <button type="button" className="footer-btn secondary-btn" onClick={onScanAnother}>
          {t('scanAnother')}
        </button>
        <button
          type="button"
          className={`footer-btn primary-btn ${
            saveStatus === 'saved_cloud'
              ? 'btn-saved'
              : saveStatus === 'saved_local'
              ? 'btn-saved-local'
              : saveStatus === 'failed'
              ? 'btn-save-failed'
              : ''
          }`}
          onClick={handleSave}
          disabled={saveStatus === 'saving' || saveStatus === 'saved_cloud' || saveStatus === 'saved_local'}>
          {saveStatus === 'saving'
            ? '…'
            : saveStatus === 'saved_cloud'
            ? `✓ ${t('saved')}`
            : saveStatus === 'saved_local'
            ? `💾 ${t('savedLocally')}`
            : saveStatus === 'failed'
            ? `⚠️ ${t('saveFailed')}`
            : t('saveToHistory')}
        </button>
      </div>

      {saveStatus === 'saved_local' && (
        <div
          className="save-status-subtext"
          style={{
            fontSize: '11px',
            color: '#2e7d32',
            backgroundColor: '#e8f5e9',
            padding: '6px 12px',
            borderRadius: '6px',
            margin: '8px 16px',
            textAlign: 'center',
            lineHeight: '1.4',
          }}>
          💾 {t('savedLocallyDesc')}
        </div>
      )}

      {saveStatus === 'failed' && (
        <div
          className="save-status-subtext"
          style={{
            fontSize: '11px',
            color: '#c62828',
            backgroundColor: '#ffebee',
            padding: '6px 12px',
            borderRadius: '6px',
            margin: '8px 16px',
            textAlign: 'center',
            lineHeight: '1.4',
          }}>
          ⚠️ {t('saveFailedDesc')}
        </div>
      )}
    </div>
  );
};
