import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('events'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#007AFF',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('favorites'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#FF2D55',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('language'),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
