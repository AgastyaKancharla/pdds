import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import ResultScreen from '../screens/ResultScreen';
import ScanScreen from '../screens/ScanScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: true, title: '', headerBackTitle: '' }}
      />
    </Stack.Navigator>
  );
}
