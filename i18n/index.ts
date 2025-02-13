import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import ruLocale from 'dayjs/locale/ru';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

dayjs.locale(ruLocale);

const resources = {
  en: {
    translation: {
      events: 'Events',
      favorites: 'Favorites',
      search: 'Search events...',
      noEvents: 'No events found',
      noFavEvents: 'No favorite events',
      details: 'Details',
      date: 'Date',
      description: 'Description',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      filterByDate: 'Filter by Date',
      reset: 'Reset',
      select: 'Select',
      apply: 'Apply',
      cancel: 'Cancel',
      clearFilter: 'Clear Filter',
      language: 'Language',
      theme: 'Theme',
      darkTheme: 'Dark',
      lightTheme: 'Light',
      autoTheme: 'Auto',
    },
  },
  ru: {
    translation: {
      events: 'События',
      favorites: 'Избранное',
      search: 'Поиск событий...',
      noEvents: 'События не найдены',
      noFavEvents: 'Вы не добавили избранные события',
      noEvent: 'События не существует',
      details: 'Подробности',
      date: 'Дата',
      description: 'Описание',
      addToFavorites: 'Добавить в избранное',
      removeFromFavorites: 'Удалить из избранного',
      filterByDate: 'Фильтр по дате',
      reset: 'Сбросить',
      select: 'Выбрать',
      apply: 'Применить',
      cancel: 'Отмена',
      clearFilter: 'Очистить фильтр',
      language: 'Язык',
      theme: 'Тема',
      darkTheme: 'Темная',
      lightTheme: 'Светлая',
      autoTheme: 'Авто',
    },
  },
};

const LANGUAGE_KEY = 'user-language';

export const setupI18n = async () => {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

  await i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

export type LanguageCode = 'en' | 'ru';

export const languages: {
  code: LanguageCode;
  name: string;
  icon: string;
}[] = [
  { code: 'en', name: 'English', icon: '🇬🇧' },
  { code: 'ru', name: 'Русский', icon: '🇷🇺' },
];

export const changeLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  await i18n.changeLanguage(language);
};

export default i18n;
