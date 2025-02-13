import { themes } from '@/appearance';
import { useLocalTheme } from '@/hooks/useLocalTheme';
import Icon from '@expo/vector-icons/Ionicons';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme, View } from 'react-native';
import SelectOptionCard from '../ui/SelectOptionCard';
import ThemedText from '../ui/ThemedText';
import SettingsSection from './SettingsSection';

const ThemeSelector = () => {
  const { theme: localTheme, setTheme: setLocalTheme } = useLocalTheme();
  const deviceTheme = useColorScheme();

  const { colors } = useTheme();

  const currentTheme = useMemo(() => {
    return localTheme || deviceTheme;
  }, [localTheme, deviceTheme]);

  const { t } = useTranslation();

  return (
    <SettingsSection title={t('theme')}>
      {themes.map((theme) => (
        <SelectOptionCard
          key={theme.value}
          onPress={() => setLocalTheme(theme.value)}
          active={currentTheme === theme.value}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {theme.value === 'auto' ? (
              <MaterialIcon
                name="theme-light-dark"
                size={24}
                color={colors.text}
              />
            ) : (
              <Icon
                name={theme.value === 'dark' ? 'moon-outline' : 'sunny-outline'}
                size={24}
                color={colors.text}
              />
            )}
            <ThemedText>{t(theme.name)}</ThemedText>
          </View>
        </SelectOptionCard>
      ))}
    </SettingsSection>
  );
};

export default ThemeSelector;
