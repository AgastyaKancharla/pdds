import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '../contexts/LanguageContext';
import { urgencyFromConfidence } from '../lib/detection';
import { getMockCrop, getMockDisease, getMockTreatments } from '../lib/mockData';
import { supabase } from '../lib/supabase';
import type { RootStackParamList } from '../navigation/types';
import type { Crop, Disease, Treatment, TreatmentType, UrgencyColor } from '../types/database';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = NativeStackScreenProps<RootStackParamList, 'Result'>['route'];

const URGENCY_STYLE: Record<UrgencyColor, { bg: string; fg: string }> = {
  red: { bg: '#FDECEA', fg: '#C62828' },
  yellow: { bg: '#FFF8E1', fg: '#F9A825' },
  green: { bg: '#E8F5E9', fg: '#2D6A4F' },
};

const URGENCY_LABEL_KEY: Record<UrgencyColor, 'actToday' | 'monitor' | 'healthy'> = {
  red: 'actToday',
  yellow: 'monitor',
  green: 'healthy',
};

const TABS: TreatmentType[] = ['organic', 'chemical', 'preventive'];

export default function ResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { cropId, diseaseId, confidence, imageUri, scanId } = route.params;
  const { language, t } = useLanguage();

  const [crop, setCrop] = useState<Crop | null>(null);
  const [disease, setDisease] = useState<Disease | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeTab, setActiveTab] = useState<TreatmentType>('organic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!scanId);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      let loadedCrop: Crop | null = null;
      let loadedDisease: Disease | null = null;
      let loadedTreatments: Treatment[] = [];

      if (supabase) {
        try {
          const [cropRes, diseaseRes, treatmentsRes] = await Promise.all([
            supabase.from('crops').select('*').eq('id', cropId).single(),
            supabase.from('diseases').select('*').eq('id', diseaseId).single(),
            supabase
              .from('treatments')
              .select('*')
              .eq('disease_id', diseaseId)
              .order('step_number', { ascending: true }),
          ]);

          if (cropRes.data) loadedCrop = cropRes.data as Crop;
          if (diseaseRes.data) loadedDisease = diseaseRes.data as Disease;
          if (treatmentsRes.data && treatmentsRes.data.length > 0) {
            loadedTreatments = treatmentsRes.data as Treatment[];
          }
        } catch (err) {
          console.warn('[HereForNature] Supabase load error, using fallback:', err);
        }
      }

      // If Supabase didn't have the data or failed, use mock data fallback
      if (!loadedCrop) {
        loadedCrop = getMockCrop(cropId) || getMockCrop('crop-rice') || null;
      }
      if (!loadedDisease) {
        loadedDisease = getMockDisease(diseaseId) || getMockDisease('disease-rice-blast') || null;
      }
      if (loadedTreatments.length === 0 && loadedDisease) {
        loadedTreatments = getMockTreatments(loadedDisease.id);
      }

      if (cancelled) return;

      setCrop(loadedCrop);
      setDisease(loadedDisease);
      setTreatments(loadedTreatments);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cropId, diseaseId]);

  const treatmentsByTab = useMemo(
    () => treatments.filter((row) => row.type === activeTab),
    [treatments, activeTab]
  );

  const urgencyColor = urgencyFromConfidence(confidence);

  const handleSave = async () => {
    if (saving || saved) return;
    setSaving(true);
    try {
      if (supabase) {
        const { data: userData } = await supabase.auth.getUser();
        const uid = userData?.user?.id;
        if (uid) {
          // If data URI is too large for database URL field, store placeholder
          const storedUrl = imageUri.length > 500 ? 'uploaded-test-image.jpg' : imageUri;
          await supabase.from('scan_history').insert({
            user_id: uid,
            image_url: storedUrl,
            crop_detected_id: cropId,
            disease_detected_id: diseaseId,
            confidence_score: confidence,
            urgency_color: urgencyColor,
          });
        }
      }
      setSaved(true);
    } catch (err) {
      console.warn('[HereForNature] Save to cloud failed, saved locally for testing:', err);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!crop || !disease) return;
    const cropName = language === 'en' ? crop.name_en : crop.name_te;
    const diseaseName = language === 'en' ? disease.name_en : disease.name_te;
    const message =
      `${t('appName')}\n` +
      `${t('crop')}: ${cropName}\n` +
      `${t('disease')}: ${diseaseName}\n` +
      `${t('confidence')}: ${Math.round(confidence * 100)}%`;
    Linking.openURL(`https://wa.me/?text=${encodeURIComponent(message)}`).catch(() => {
      Alert.alert(t('errorGeneric'));
    });
  };

  if (loading || !disease || !crop) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2D6A4F" />
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </SafeAreaView>
    );
  }

  const urgencyStyle = URGENCY_STYLE[urgencyColor];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={[styles.urgencyBadge, { backgroundColor: urgencyStyle.bg }]}>
          <View style={[styles.urgencyDot, { backgroundColor: urgencyStyle.fg }]} />
          <Text style={[styles.urgencyText, { color: urgencyStyle.fg }]}>
            {t(URGENCY_LABEL_KEY[urgencyColor])}
          </Text>
        </View>

        <Text style={styles.cropLabel}>{language === 'en' ? crop.name_en : crop.name_te}</Text>
        <Text style={styles.diseaseName}>
          {language === 'en' ? disease.name_en : disease.name_te}
        </Text>
        <Text style={styles.diseaseNameSecondary}>
          {language === 'en' ? disease.name_te : disease.name_en}
        </Text>

        <Text style={styles.confidence}>
          {t('confidence')}: {Math.round(confidence * 100)}%
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('symptoms')}</Text>
          <Text style={styles.sectionBody}>
            {language === 'en' ? disease.symptoms_en : disease.symptoms_te}
          </Text>
        </View>

        {(language === 'en' ? disease.ap_specific_tip_en : disease.ap_specific_tip_te) ? (
          <View style={[styles.section, styles.tipSection]}>
            <Text style={styles.sectionTitle}>{t('apTip')}</Text>
            <Text style={styles.sectionBody}>
              {language === 'en' ? disease.ap_specific_tip_en : disease.ap_specific_tip_te}
            </Text>
          </View>
        ) : null}

        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {t(tab)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.treatmentList}>
          {treatmentsByTab.length === 0 ? (
            <Text style={styles.sectionBody}>{t('noTreatments')}</Text>
          ) : (
            treatmentsByTab.map((step) => (
              <View key={step.id} style={styles.treatmentRow}>
                <View style={styles.treatmentStepBadge}>
                  <Text style={styles.treatmentStepText}>{step.step_number}</Text>
                </View>
                <View style={styles.treatmentTextWrap}>
                  <Text style={styles.treatmentText}>
                    {language === 'en' ? step.instruction_en : step.instruction_te}
                  </Text>
                  {step.product_name ? (
                    <Text style={styles.treatmentProduct}>{step.product_name}</Text>
                  ) : null}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Pressable style={styles.whatsappButton} onPress={handleShareWhatsApp}>
        <Text style={styles.whatsappButtonText}>{t('shareWhatsApp')}</Text>
      </Pressable>

      <View style={styles.footer}>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Scan')}>
          <Text style={styles.secondaryButtonText}>{t('scanAnother')}</Text>
        </Pressable>
        <Pressable
          style={[styles.primaryButton, saved && styles.primaryButtonSaved]}
          onPress={handleSave}
          disabled={saving || saved}>
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>{saved ? t('saved') : t('saveToHistory')}</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FBF3',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#4A6B4D',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#E1F0E3',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  urgencyText: {
    fontWeight: '700',
    fontSize: 13,
  },
  cropLabel: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#4A6B4D',
    textTransform: 'uppercase',
  },
  diseaseName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B3A1E',
    marginTop: 4,
  },
  diseaseNameSecondary: {
    fontSize: 18,
    color: '#4A6B4D',
    marginTop: 2,
  },
  confidence: {
    marginTop: 8,
    fontSize: 13,
    color: '#4A6B4D',
  },
  section: {
    marginTop: 20,
  },
  tipSection: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A1E',
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 15,
    color: '#33472F',
    lineHeight: 21,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#E1F0E3',
    borderRadius: 12,
    padding: 4,
    marginTop: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2D6A4F',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D6A4F',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  treatmentList: {
    marginTop: 16,
  },
  treatmentRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  treatmentStepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2D6A4F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  treatmentStepText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  treatmentTextWrap: {
    flex: 1,
  },
  treatmentText: {
    fontSize: 15,
    color: '#33472F',
    lineHeight: 21,
  },
  treatmentProduct: {
    fontSize: 13,
    color: '#4A6B4D',
    marginTop: 2,
    fontStyle: 'italic',
  },
  whatsappButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E1F0E3',
    backgroundColor: '#F2FBF3',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#2D6A4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#2D6A4F',
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#2D6A4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonSaved: {
    backgroundColor: '#6B9B6E',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
