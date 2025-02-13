import { Theme } from '@/appearance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

export const useLocalTheme = () => {
  const [theme, setTheme] = useState<Theme>('auto');
  const deviceTheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('theme').then((data) => {
      if (data) {
        setTheme(data as Theme);
        Appearance.setColorScheme(data);
      }
    });
  }, []);

  const handleSwitchTheme = (theme: Theme) => {
    if (theme === 'auto') {
      Appearance.setColorScheme(null);
      AsyncStorage.removeItem('theme');
    } else {
      AsyncStorage.setItem('theme', theme);
      Appearance.setColorScheme(theme);
    }
    setTheme(theme);
  };

  return { theme, setTheme: handleSwitchTheme };
};
