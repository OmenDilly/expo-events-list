import { useLocalTheme } from '@/hooks/useLocalTheme';
import { PortalProvider } from '@gorhom/portal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { setupI18n } from '../i18n';
import { store } from '../store';
import { setFavorites } from '../store/eventsSlice';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useLocalTheme();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const init = async () => {
      await setupI18n();
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        store.dispatch(setFavorites(JSON.parse(savedFavorites)));
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <PortalProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </PortalProvider>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
