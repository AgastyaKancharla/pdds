import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import type { RootStackParamList } from '../navigation/types';
import type { ScanHistoryWithDetails, UrgencyColor } from '../types/database';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const URGENCY_DOT: Record<UrgencyColor, string> = {
  red: '#C62828',
  yellow: '#F9A825',
  green: '#2D6A4F',
};

export default function HistoryScreen() {
  const navigation = useNavigation<Nav>();
  const { language, t } = useLanguage();
  const [rows, setRows] = useState<ScanHistoryWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!supabase) {
      console.warn('[HereForNature] Supabase not available — cannot load history.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*, crops:crop_detected_id(id, name_en, name_te), diseases:disease_detected_id(id, name_en, name_te, urgency_color)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setRows(data as unknown as ScanHistoryWithDetails[]);
      }
    } catch (err) {
      console.warn('[HereForNature] Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2D6A4F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>{t('history')}</Text>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={rows.length === 0 ? styles.emptyContent : styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('noHistory')}</Text>}
        renderItem={({ item }) => {
          const cropName = language === 'en' ? item.crops?.name_en : item.crops?.name_te;
          const diseaseName = language === 'en' ? item.diseases?.name_en : item.diseases?.name_te;
          const dotColor = item.urgency_color ? URGENCY_DOT[item.urgency_color] : '#9AA79B';

          return (
            <Pressable
              style={styles.row}
              onPress={() => {
                if (!item.crop_detected_id || !item.disease_detected_id) return;
                navigation.navigate('Result', {
                  scanId: item.id,
                  cropId: item.crop_detected_id,
                  diseaseId: item.disease_detected_id,
                  confidence: item.confidence_score ?? 0,
                  imageUri: item.image_url ?? '',
                });
              }}>
              {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]} />
              )}
              <View style={styles.rowText}>
                <Text style={styles.rowDisease}>{diseaseName ?? '—'}</Text>
                <Text style={styles.rowCrop}>{cropName ?? '—'}</Text>
                <Text style={styles.rowDate}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
              <View style={[styles.dot, { backgroundColor: dotColor }]} />
            </Pressable>
          );
        }}
      />
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
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B3A1E',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#4A6B4D',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#E1F0E3',
  },
  thumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
  },
  rowDisease: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A1E',
  },
  rowCrop: {
    fontSize: 13,
    color: '#4A6B4D',
    marginTop: 2,
  },
  rowDate: {
    fontSize: 12,
    color: '#9AA79B',
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
});
