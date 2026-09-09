import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '../contexts/LanguageContext';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { language, setLanguage, t } = useLanguage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.langToggle}>
        <Pressable
          style={[styles.langOption, language === 'en' && styles.langOptionActive]}
          onPress={() => setLanguage('en')}>
          <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>
            {t('english')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.langOption, language === 'te' && styles.langOptionActive]}
          onPress={() => setLanguage('te')}>
          <Text style={[styles.langText, language === 'te' && styles.langTextActive]}>
            {t('telugu')}
          </Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>{t('appName')}</Text>
        <Text style={styles.poweredBy}>{t('poweredBy')}</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.scanButton, pressed && styles.scanButtonPressed]}
        onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.scanButtonIcon}>📷</Text>
        <Text style={styles.scanButtonText}>{t('scanNow')}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FBF3',
    paddingHorizontal: 24,
  },
  langToggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: '#E1F0E3',
    borderRadius: 999,
    padding: 4,
  },
  langOption: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  langOptionActive: {
    backgroundColor: '#2D6A4F',
  },
  langText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A1E',
    textAlign: 'center',
  },
  poweredBy: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52B788',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    color: '#4A6B4D',
    marginTop: 8,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#2D6A4F',
    borderRadius: 28,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  scanButtonPressed: {
    opacity: 0.85,
  },
  scanButtonIcon: {
    fontSize: 40,
    marginBottom: 6,
  },
  scanButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
