import ThemedText from '@/components/ui/ThemedText';
import EventCard from '@/components/widgets/EventCard';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { events, favorites } = useSelector((state: RootState) => state.events);
  const favoriteEvents = events.filter((event) => favorites.includes(event.id));

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventCard event={item} isFavorite />}
        getItemLayout={(data, index) => ({
          length: 65,
          offset: index * 65,
          index,
        })}
        i18nIsDynamicList
        ListEmptyComponent={() => (
          <ThemedText style={styles.noEvents}>{t('noFavEvents')}</ThemedText>
        )}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noEvents: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});
