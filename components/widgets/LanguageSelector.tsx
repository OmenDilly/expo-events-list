import { changeLanguage, languages } from '@/i18n';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import SelectOptionCard from '../ui/SelectOptionCard';
import ThemedText from '../ui/ThemedText';
import SettingsSection from './SettingsSection';

const LanguageSelector = () => {
  const { colors } = useTheme();

  const { t, i18n } = useTranslation();

  return (
    <SettingsSection title={t('language')}>
      {languages.map((language) => (
        <SelectOptionCard
          key={language.code}
          onPress={() => changeLanguage(language.code)}
          active={i18n.language === language.code}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <ThemedText>{language.icon}</ThemedText>
            <ThemedText>{language.name}</ThemedText>
          </View>
        </SelectOptionCard>
      ))}
    </SettingsSection>
  );
};

export default LanguageSelector;
