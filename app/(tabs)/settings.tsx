import LanguageSelector from '@/components/widgets/LanguageSelector';
import ThemeSelector from '@/components/widgets/ThemeSelector';
import { ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  return (
    <ScrollView>
      <LanguageSelector />
      <ThemeSelector />
    </ScrollView>
  );
}
