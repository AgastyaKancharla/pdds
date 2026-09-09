import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '../contexts/LanguageContext';
import { detectDisease } from '../lib/detection';
import { SAMPLE_CROP_IMAGE } from '../lib/mockData';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ScanScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useLanguage();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const [forceUploadView, setForceUploadView] = useState(false);

  const runDetection = async (imageUri: string) => {
    setBusy(true);
    try {
      const result = await detectDisease(imageUri);
      navigation.navigate('Result', {
        imageUri,
        cropId: result.cropId,
        diseaseId: result.diseaseId,
        confidence: result.confidence,
      });
    } catch (err) {
      Alert.alert(t('errorGeneric'), err instanceof Error ? err.message : undefined);
    } finally {
      setBusy(false);
    }
  };

  const handleCapture = async () => {
    if (!cameraRef.current || busy) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (photo?.uri) {
        await runDetection(photo.uri);
      }
    } catch (err) {
      console.warn('[HereForNature] Camera capture failed:', err);
      Alert.alert(
        t('errorGeneric'),
        'Camera capture failed. You can upload an image or test with a sample crop instead.'
      );
      setForceUploadView(true);
    }
  };

  const handleGallery = async () => {
    if (busy) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
      });
      if (!result.canceled && result.assets[0]) {
        await runDetection(result.assets[0].uri);
      }
    } catch (err) {
      console.warn('[HereForNature] Gallery pick failed:', err);
      Alert.alert(t('errorGeneric'), 'Failed to open image picker.');
    }
  };

  const handleSampleTest = async () => {
    if (busy) return;
    await runDetection(SAMPLE_CROP_IMAGE);
  };

  // If user doesn't have camera permission, or chose upload mode, or on web without camera:
  const showUploadOnly = !permission?.granted || forceUploadView;

  if (showUploadOnly) {
    return (
      <SafeAreaView style={styles.fallbackContainer} edges={['top', 'bottom']}>
        <View style={styles.fallbackCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🌿</Text>
          </View>

          <Text style={styles.fallbackTitle}>{t('scanNow')}</Text>
          <Text style={styles.fallbackDesc}>{t('cameraUnavailableDesc')}</Text>

          <View style={styles.actionButtons}>
            {/* Primary Option: Choose / Upload Image */}
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
              onPress={handleGallery}
              disabled={busy}>
              <Text style={styles.btnIcon}>📁</Text>
              <Text style={styles.primaryBtnText}>{t('uploadImage')}</Text>
            </Pressable>

            {/* Instant Test Option: Sample Crop Image */}
            <Pressable
              style={({ pressed }) => [styles.sampleBtn, pressed && styles.btnPressed]}
              onPress={handleSampleTest}
              disabled={busy}>
              <Text style={styles.btnIcon}>🧪</Text>
              <Text style={styles.sampleBtnText}>{t('testSample')}</Text>
            </Pressable>

            {/* Request Camera Permission if user wants to try camera */}
            {!permission?.granted && (
              <Pressable
                style={({ pressed }) => [styles.cameraPermBtn, pressed && styles.btnPressed]}
                onPress={requestPermission}
                disabled={busy}>
                <Text style={styles.cameraPermText}>📷 {t('grantPermission')}</Text>
              </Pressable>
            )}

            {forceUploadView && permission?.granted && (
              <Pressable
                style={({ pressed }) => [styles.cameraPermBtn, pressed && styles.btnPressed]}
                onPress={() => setForceUploadView(false)}
                disabled={busy}>
                <Text style={styles.cameraPermText}>📷 Switch to Camera</Text>
              </Pressable>
            )}

            {/* Back button */}
            <Pressable
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              disabled={busy}>
              <Text style={styles.backBtnText}>{t('backToHome')}</Text>
            </Pressable>
          </View>
        </View>

        {busy && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.overlayText}>{t('analyzing')}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // Camera is available and permission is granted
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" mode="picture" />

      {/* Top Bar with Back & Upload Mode Buttons */}
      <SafeAreaView style={styles.topBar} edges={['top']}>
        <Pressable style={styles.topBarBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.topBarBtnText}>← Back</Text>
        </Pressable>
        <Pressable style={styles.topBarBtn} onPress={() => setForceUploadView(true)}>
          <Text style={styles.topBarBtnText}>📁 File Upload</Text>
        </Pressable>
      </SafeAreaView>

      {busy && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.overlayText}>{t('analyzing')}</Text>
        </View>
      )}

      {/* Bottom Controls */}
      <SafeAreaView style={styles.controls} edges={['bottom']}>
        <Pressable
          style={({ pressed }) => [styles.galleryButton, pressed && styles.btnPressed]}
          onPress={handleGallery}
          disabled={busy}>
          <Text style={styles.controlIcon}>📁</Text>
          <Text style={styles.galleryButtonText}>{t('chooseFromGallery')}</Text>
        </Pressable>

        <Pressable
          style={[styles.captureButton, busy && styles.captureButtonDisabled]}
          onPress={handleCapture}
          disabled={busy}>
          <View style={styles.captureButtonInner} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.sampleTestButton, pressed && styles.btnPressed]}
          onPress={handleSampleTest}
          disabled={busy}>
          <Text style={styles.controlIcon}>🧪</Text>
          <Text style={styles.sampleTestButtonText}>{t('testSample')}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  topBarBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  topBarBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controlIcon: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 4,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  galleryButton: {
    width: 95,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  sampleTestButton: {
    width: 95,
    alignItems: 'center',
  },
  sampleTestButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  btnPressed: {
    opacity: 0.8,
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: '#F2FBF3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fallbackCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E1F0E3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconEmoji: {
    fontSize: 40,
  },
  fallbackTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B3A1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  fallbackDesc: {
    fontSize: 14,
    color: '#4A6B4D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D6A4F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  btnIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sampleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1F0E3',
    borderWidth: 1.5,
    borderColor: '#2D6A4F',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  sampleBtnText: {
    color: '#2D6A4F',
    fontSize: 15,
    fontWeight: '700',
  },
  cameraPermBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  cameraPermText: {
    color: '#2D6A4F',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 4,
  },
  backBtnText: {
    color: '#718774',
    fontSize: 14,
    fontWeight: '600',
  },
});
