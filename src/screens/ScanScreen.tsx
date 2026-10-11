import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { detectDisease, type DetectionResult } from '../lib/detection';
import { SAMPLE_CROP_IMAGE } from '../lib/mockData';
import { compressImage, validateImageFile } from '../lib/imageUtils';
import type { DetectionFailureReason } from '../types/database';
import type { DiagnosticTier, NormalizedDiagnosis } from '../lib/ai/types';

export interface ScanResultData {
  imageUri: string;
  detected: boolean;
  cropId?: string;
  diseaseId?: string;
  failureReason?: DetectionFailureReason | 'provider_unavailable';
  messageEn?: string;
  messageTe?: string;
  cropNameEn?: string;
  cropNameTe?: string;
  isDemoSample?: boolean;
  isCachedResult?: boolean;
  cachedAt?: string;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
}

interface ScanScreenProps {
  onScanComplete: (data: ScanResultData) => void;
  onBack: () => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({ onScanComplete, onBack }) => {
  const { language, t } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream when leaving
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCameraStream = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('[HereForNature] Live camera access error:', err);
      setCameraError(
        language === 'en'
          ? 'Live camera access not granted or unavailable. You can use standard Camera or File Upload below.'
          : 'లైవ్ కెమెరా అందుబాటులో లేదు. మీరు క్రింద ఉన్న కెమెరా లేదా ఫైల్ అప్‌లోడ్ ఉపయోగించవచ్చు.'
      );
    }
  };

  const runDetectionOnImage = async (imageUri: string, base64?: string, isDemoSample = false) => {
    setBusy(true);
    stopCameraStream();
    try {
      const result: DetectionResult = await detectDisease(imageUri, base64, { isDemoSample });
      const tier =
        result.diagnosticTier ||
        result.normalizedDiagnosis?.provenance?.tier ||
        (result.isDemoSample ? 'demonstration_sample' : 'ai_preliminary_hypothesis');

      if (!result.detected) {
        onScanComplete({
          imageUri,
          detected: false,
          failureReason: result.reason as DetectionFailureReason,
          messageEn: result.messageEn,
          messageTe: result.messageTe,
          cropNameEn: result.cropNameEn,
          cropNameTe: result.cropNameTe,
          cropId: result.cropId,
          isDemoSample: result.isDemoSample,
          diagnosticTier: tier,
          normalizedDiagnosis: result.normalizedDiagnosis,
        });
      } else {
        onScanComplete({
          imageUri,
          detected: true,
          cropId: result.cropId,
          diseaseId: result.diseaseId,
          cropNameEn: result.cropNameEn,
          cropNameTe: result.cropNameTe,
          isDemoSample: result.isDemoSample,
          diagnosticTier: tier,
          normalizedDiagnosis: result.normalizedDiagnosis,
        });
      }
    } catch (err) {
      console.warn('[HereForNature] Detection error:', err);
      onScanComplete({
        imageUri,
        detected: false,
        failureReason: 'unclear',
      });
    } finally {
      setBusy(false);
    }
  };

  const handleCaptureFromVideo = () => {
    if (!videoRef.current || busy) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        runDetectionOnImage(dataUrl, dataUrl);
      }
    } catch (err) {
      console.warn('[HereForNature] Video capture error:', err);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setCameraError(language === 'en' ? validation.errorEn || 'Invalid file' : validation.errorTe || 'చెల్లని ఫైల్');
      e.target.value = '';
      return;
    }

    try {
      // Compress client-side for mobile bandwidth efficiency
      const { dataUrl } = await compressImage(file, 1280, 0.82);
      runDetectionOnImage(dataUrl, dataUrl);
    } catch (err) {
      console.warn('[HereForNature] Image compression note, falling back to direct read:', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          runDetectionOnImage(dataUrl, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleSampleTest = () => {
    if (busy) return;
    runDetectionOnImage(SAMPLE_CROP_IMAGE, undefined, true);
  };

  return (
    <div className="scan-container">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      <div className="scan-header">
        <button type="button" className="btn-back" onClick={onBack} disabled={busy}>
          ← {t('backToHome')}
        </button>
        <h2 className="scan-title">{t('scanNow')}</h2>
        <div style={{ width: 80 }} />
      </div>

      {busy ? (
        <div className="analyzing-overlay">
          <div className="spinner" />
          <h3 className="analyzing-title">{t('analyzing')}</h3>
          <p className="analyzing-subtitle">
            {language === 'en'
              ? 'Inspecting leaf structure, colors, and disease symptoms…'
              : 'ఆకు నిర్మాణం, రంగులు మరియు తెగులు లక్షణాలను విశ్లేషిస్తోంది…'}
          </p>
        </div>
      ) : cameraActive ? (
        <div className="camera-viewfinder">
          <video ref={videoRef} autoPlay playsInline muted className="live-video" />
          <div className="viewfinder-frame">
            <div className="frame-target" />
            <p className="viewfinder-hint">
              {language === 'en' ? 'Position leaf inside box' : 'ఆకును బాక్స్‌లో ఉంచండి'}
            </p>
          </div>
          <div className="viewfinder-controls">
            <button
              type="button"
              className="btn-capture-round"
              onClick={handleCaptureFromVideo}
              title={t('takePhoto')}>
              <div className="btn-capture-inner" />
            </button>
            <button
              type="button"
              className="btn-cancel-camera"
              onClick={stopCameraStream}>
              ✕ {language === 'en' ? 'Close' : 'మూసివేయి'}
            </button>
          </div>
        </div>
      ) : (
        <div className="scan-options-card">
          <div className="scan-icon-circle">🌿</div>
          <h3 className="scan-card-heading">
            {language === 'en' ? 'Choose Image Source' : 'చిత్ర ఎంపిక మార్గం'}
          </h3>
          <p className="scan-card-desc">{t('cameraUnavailableDesc')}</p>

          {cameraError && <div className="camera-error-banner">{cameraError}</div>}

          <div className="scan-action-list">
            {/* 1. Mobile Camera Capture (Native Camera Prompt on Phones) */}
            <button
              type="button"
              className="scan-btn primary-camera-btn"
              onClick={() => cameraInputRef.current?.click()}
              disabled={busy}>
              <span className="btn-icon">📷</span>
              <div>
                <strong>{t('takePhoto')}</strong>
                <span className="btn-subtext">
                  {language === 'en' ? 'Snap photo with camera' : 'కెమెరాతో ఫోటో తీయండి'}
                </span>
              </div>
            </button>

            {/* 2. Choose from Gallery / Files */}
            <button
              type="button"
              className="scan-btn gallery-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}>
              <span className="btn-icon">📁</span>
              <div>
                <strong>{t('chooseFromGallery')}</strong>
                <span className="btn-subtext">
                  {language === 'en' ? 'Upload image file from device' : 'గ్యాలరీ నుండి చిత్రం అప్‌లోడ్ చేయండి'}
                </span>
              </div>
            </button>

            {/* 3. Live Webcam Viewfinder (for Desktop / Web) */}
            <button
              type="button"
              className="scan-btn live-btn"
              onClick={startCameraStream}
              disabled={busy}>
              <span className="btn-icon">🎥</span>
              <div>
                <strong>{language === 'en' ? 'Open Live Viewfinder' : 'లైవ్ కెమెరా తెరవండి'}</strong>
                <span className="btn-subtext">
                  {language === 'en' ? 'Stream video in browser' : 'బ్రౌజర్‌లో వీడియో చూడండి'}
                </span>
              </div>
            </button>

            {/* 4. Instant Sample Crop Test */}
            <button
              type="button"
              className="scan-btn sample-btn"
              onClick={handleSampleTest}
              disabled={busy}>
              <span className="btn-icon">🧪</span>
              <div>
                <strong>{t('testSample')}</strong>
                <span className="btn-subtext">
                  {language === 'en' ? 'Test with real crop sample' : 'నమూనా పంటతో తక్షణ పరీక్ష'}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
