import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Scan: undefined;
  Result: {
    cropId: string;
    diseaseId: string;
    confidence: number;
    imageUri: string;
    scanId?: string;
  };
};
