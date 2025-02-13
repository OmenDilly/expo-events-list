import AnimatedPressable from '@/components/ui/AnimatedPressable';
import ThemedCard from '@/components/ui/ThemedCard';
import ThemedText from '@/components/ui/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleFavorite } from '../../store/eventsSlice';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { events, favorites } = useSelector((state: RootState) => state.events);
  const { colors } = useTheme();

  const event = events.find((e) => e.id === Number(id));
  const isFavorite = favorites.includes(Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>{t('noEvent')}</Text>
      </View>
    );
  }

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.header}>
        <AnimatedPressable
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </AnimatedPressable>
        <AnimatedPressable
          style={[styles.favoriteButton, { backgroundColor: colors.card }]}
          onPress={() => dispatch(toggleFavorite(event.id))}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.notification : colors.primary}
          />
        </AnimatedPressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 200,
          gap: 16,
        }}
      >
        <View style={styles.iconHeader}>
          <View style={[styles.iconContainer]}>
            <ThemedText style={{ fontSize: 64 }}>{event.icon}</ThemedText>
            {/* <Ionicons
              name={event.icon as any}
              size={32}
              color={colors.primary}
            /> */}
          </View>
          <ThemedText style={styles.title}>
            {i18n.language === 'ru' ? event.ruTitle : event.title}
          </ThemedText>
        </View>

        <ThemedCard>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={20} color={colors.text} />
            <ThemedText style={styles.date}>
              {dayjs(event.date).locale(i18n.language).format('MMMM D, YYYY')}
            </ThemedText>
          </View>
        </ThemedCard>

        <ThemedText style={styles.sectionTitle}>{t('description')}</ThemedText>
        <ThemedCard>
          <ThemedText>
            {i18n.language === 'ru' ? event.ruDescription : event.description}
          </ThemedText>
        </ThemedCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    position: 'absolute',
    right: 16,
    left: 16,
    top: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconHeader: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
