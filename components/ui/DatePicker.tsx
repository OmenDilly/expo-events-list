import { Ionicons } from '@expo/vector-icons';
import { Portal } from '@gorhom/portal';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { FC, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, useColorScheme } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import AppModal from './AppModal';
import HStack from './HStack';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

interface DatePickerProps {
  dateValue?: Date;
  title?: string;
  errorMessage?: string;
  onDateChange: (value: Date) => void;
  min?: Date;
  max?: Date;
}

const dateFormat = 'DD.MM.YYYY';
const ruDateFormat = 'ДД.ММ.ГГГГ';

const DatePicker: FC<DatePickerProps> = forwardRef(
  ({ dateValue, onDateChange, title, min, max, ...props }, ref) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const { colors } = useTheme();
    const theme = useColorScheme();
    const { t, i18n } = useTranslation();

    const minimumDate =
      min ||
      dayjs()
        .set('year', dayjs().year() - 100)
        .toDate();
    const maximumDate =
      max ||
      dayjs()
        .set('year', dayjs().year() + 100)
        .toDate();

    const onChange = (date: Date | undefined) => {
      if (!!date) {
        onDateChange(date);
        setShowDatePicker(false);
      }
    };

    const handleShowDatePicker = () => {
      if (Platform.OS === 'android') {
        DateTimePickerAndroid.open({
          value: dateValue ?? new Date(),
          onChange: (e, date) => onChange(date),
          mode: 'date',
          minimumDate: minimumDate,
          maximumDate: maximumDate,
          neutralButton: {
            label: t('cancel'),
          },
          positiveButton: {
            label: t('select'),
          },
        });
      } else {
        setShowDatePicker(true);
      }
    };

    return (
      <>
        <HStack>
          {title && <ThemedText>{title}</ThemedText>}
          <AnimatedPressable
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
            onPress={handleShowDatePicker}
          >
            <Ionicons name="calendar-outline" size={16} />
            <ThemedText>
              {dateValue
                ? dayjs(dateValue).format(dateFormat)
                : i18n.language === 'ru'
                ? ruDateFormat
                : dateFormat}
            </ThemedText>
          </AnimatedPressable>
        </HStack>
        <Portal>
          <AppModal
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}
          >
            <ThemedCard
              style={{
                margin: 16,
              }}
            >
              <DateTimePicker
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                value={dateValue ?? new Date()}
                onChange={(e, date) => onChange(date)}
                display="inline"
                locale="ru"
                themeVariant={theme || 'light'}
              />
              {/* <HStack
                style={{
                  alignSelf: 'flex-end',
                  gap: 16,
                }}
              >
                <AnimatedPressable onPress={() => setShowDatePicker(false)}>
                  <ThemedText>{t('cancel')}</ThemedText>
                </AnimatedPressable>
                <AnimatedPressable
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                  onPress={() => onChange()}
                >
                  <ThemedText
                    style={{
                      color: colors.card,
                    }}
                  >
                    {t('select')}
                  </ThemedText>
                </AnimatedPressable>
              </HStack> */}
            </ThemedCard>
          </AppModal>
        </Portal>
      </>
    );
  }
);

export default DatePicker;
