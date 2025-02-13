import { RootState } from '@/store';
import {
  EventsState,
  resetSelectedDateRange,
  setSelectedDateRange,
} from '@/store/eventsSlice';
import Icon from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedPressable from '../ui/AnimatedPressable';
import DatePicker from '../ui/DatePicker';
import HStack from '../ui/HStack';
import ThemedText from '../ui/ThemedText';

const ListFilter = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { selectedDateRange } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch();
  const [sheetVisible, setSheetVisible] = useState(false);

  const [dateFilter, setDateFilter] = useState<
    EventsState['selectedDateRange']
  >({
    endDate: undefined,
    startDate: undefined,
  });

  useEffect(() => {
    setDateFilter(selectedDateRange);
  }, [selectedDateRange]);

  const sheetRef = useRef<BottomSheet>(null);

  const isActiveFilter = dateFilter.startDate || dateFilter.endDate;

  const insets = useSafeAreaInsets();

  return (
    <Fragment>
      <AnimatedPressable
        style={{ ...styles.filterButton, backgroundColor: colors.card }}
        onPress={() => {
          setSheetVisible(true);
          // sheetRef?.current?.expand();
        }}
      >
        {isActiveFilter && (
          <View
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              backgroundColor: colors.notification,
              height: 12,
              width: 12,
              borderRadius: 16,
            }}
          />
        )}
        <Icon name={'filter'} size={24} color={colors.primary} />
      </AnimatedPressable>
      {sheetVisible && (
        <Portal>
          <View
            style={{ ...StyleSheet.absoluteFillObject }}
            pointerEvents="box-none"
          >
            <BottomSheet
              ref={sheetRef}
              onChange={() => {
                console.log('sheet change');
              }}
              onClose={() => setSheetVisible(false)}
              snapPoints={['20%', '50%']}
              index={2}
              enablePanDownToClose
              backgroundStyle={{
                backgroundColor: colors.card,
              }}
              handleIndicatorStyle={{
                backgroundColor: colors.border,
              }}
              backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} pressBehavior={'close'} />
              )}
            >
              <BottomSheetView
                style={{
                  padding: 16,
                  gap: 16,
                  flex: 1,
                }}
              >
                <HStack
                  style={{
                    justifyContent: 'space-between',
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}
                  >
                    {t('filterByDate')}
                  </ThemedText>
                </HStack>
                <HStack>
                  <DatePicker
                    dateValue={
                      dateFilter.startDate
                        ? dayjs(dateFilter.startDate).toDate()
                        : undefined
                    }
                    onDateChange={(date) => {
                      setDateFilter((prev) => ({
                        ...prev,
                        startDate: date.toISOString(),
                      }));
                    }}
                  />
                  <ThemedText>-</ThemedText>
                  <DatePicker
                    dateValue={
                      dateFilter.endDate
                        ? dayjs(dateFilter.endDate).toDate()
                        : undefined
                    }
                    onDateChange={(date) => {
                      setDateFilter((prev) => ({
                        ...prev,
                        endDate: date.toISOString(),
                      }));
                    }}
                  />
                </HStack>
                <HStack
                  style={{
                    position: 'absolute',
                    bottom: insets.bottom,
                    right: 16,
                    left: 16,
                  }}
                >
                  {isActiveFilter && (
                    <AnimatedPressable
                      style={{
                        flex: 1,
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setDateFilter({
                          startDate: undefined,
                          endDate: undefined,
                        });
                        dispatch(resetSelectedDateRange());
                      }}
                    >
                      <ThemedText style={{}}>{t('reset')}</ThemedText>
                    </AnimatedPressable>
                  )}
                  <AnimatedPressable
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      backgroundColor: colors.primary,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      dispatch(setSelectedDateRange(dateFilter));
                      sheetRef.current.close();
                    }}
                  >
                    <ThemedText
                      style={{
                        color: colors.card,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}
                    >
                      {t('apply')}
                    </ThemedText>
                  </AnimatedPressable>
                </HStack>
              </BottomSheetView>
            </BottomSheet>
          </View>
        </Portal>
      )}
    </Fragment>
  );
};

export default ListFilter;

const styles = StyleSheet.create({
  filterButton: {
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
});
