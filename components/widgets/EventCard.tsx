import { Event, toggleFavorite } from '@/store/eventsSlice';
import Icon from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FadeOut } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import AnimatedPressable from '../ui/AnimatedPressable';
import ThemedText from '../ui/ThemedText';

dayjs.locale(ruLocale);

const EventCard: FC<{ event: Event; isFavorite?: boolean }> = ({
  event,
  isFavorite,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const { colors } = useTheme();

  return (
    <Link href={`/event/${event.id}`} asChild>
      <AnimatedPressable
        exiting={FadeOut}
        style={{ ...styles.eventCard, backgroundColor: colors.card }}
      >
        <View style={[styles.iconContainer]}>
          <ThemedText style={{ fontSize: 32 }}>{event.icon}</ThemedText>
        </View>
        <View style={styles.eventContent}>
          <ThemedText style={styles.eventTitle}>
            {i18n.language === 'ru' ? event.ruTitle : event.title}
          </ThemedText>
          <View style={styles.dateContainer}>
            <Icon
              name="time-outline"
              size={16}
              color={colors.primary}
              style={styles.dateIcon}
            />
            <ThemedText style={styles.eventDate}>
              {dayjs(event.date).locale(i18n.language).format('MMMM D, YYYY')}
            </ThemedText>
          </View>
        </View>
        <AnimatedPressable onPress={() => dispatch(toggleFavorite(event.id))}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? colors.notification : colors.primary}
          />
        </AnimatedPressable>
        {/* <Icon name="chevron-forward" size={20} color={colors.text} /> */}
      </AnimatedPressable>
    </Link>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 4,
  },
  eventDate: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
