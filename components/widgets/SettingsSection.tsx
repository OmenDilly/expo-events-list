import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from '../ui/ThemedText';

interface SettingsSectionProps extends PropsWithChildren {
  title: string;
}

const SettingsSection: FC<SettingsSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <ThemedText style={[styles.sectionTitle]}>{title}</ThemedText>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
};

export default SettingsSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  sectionBody: {},
});
