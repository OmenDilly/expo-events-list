import ThemedText from '@/components/ui/ThemedText';
import EventCard from '@/components/widgets/EventCard';
import ListFilter from '@/components/widgets/ListFilter';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSearchQuery } from '../../store/eventsSlice';
dayjs.extend(isBetween);

export default function EventsScreen() {
  const dispatch = useDispatch();
  const { events, searchQuery, selectedDateRange, error, favorites } =
    useSelector((state: RootState) => state.events);
  const { t, i18n } = useTranslation();

  const { colors } = useTheme();

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const matchesSearch = (
          i18n.language === 'ru' ? event.ruTitle : event.title
        )
          .toLowerCase()
          .includes((searchQuery || '').toLowerCase());
        const matchesDate =
          selectedDateRange.startDate && !selectedDateRange.endDate
            ? dayjs(event.date).isAfter(selectedDateRange.startDate)
            : selectedDateRange.endDate && !selectedDateRange.startDate
            ? dayjs(event.date).isBefore(selectedDateRange.startDate)
            : selectedDateRange.endDate && selectedDateRange.startDate
            ? dayjs(event.date).isBetween(
                selectedDateRange.startDate,
                selectedDateRange.endDate,
                'day',
                '[]'
              )
            : true;
        return matchesSearch && matchesDate;
      }),
    [events, searchQuery, selectedDateRange, i18n.language]
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View
          style={[styles.searchInputWrapper, { backgroundColor: colors.card }]}
        >
          <Ionicons
            name="search"
            size={20}
            color={colors.text}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('search')}
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
          />
        </View>
        <ListFilter />
      </View>

      <Animated.FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        getItemLayout={(data, index) => ({
          length: 65,
          offset: index * 65,
          index,
        })}
        i18nIsDynamicList
        renderItem={({ item }) => (
          <EventCard event={item} isFavorite={favorites.includes(item.id)} />
        )}
        ListEmptyComponent={() => (
          <ThemedText style={styles.noEvents}>{t('noEvents')}</ThemedText>
        )}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  noEvents: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});
