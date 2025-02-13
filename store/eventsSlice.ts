import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { generateMockEvents } from '../utils/mockDataGenerator';

export interface Event {
  id: number;
  title: string;
  ruTitle: string;
  description: string;
  ruDescription: string;
  date: string;
  icon: string;
}

export interface EventsState {
  events: Event[];
  favorites: number[];
  searchQuery: string;
  selectedDateRange: {
    startDate: string | undefined;
    endDate: string | undefined;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: generateMockEvents(100).sort((a, b) => {
    return dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1;
  }),
  favorites: [],
  searchQuery: '',
  selectedDateRange: {
    startDate: undefined,
    endDate: undefined,
  },
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const eventId = action.payload;
      const index = state.favorites.indexOf(eventId);
      if (index === -1) {
        state.favorites.push(eventId);
      } else {
        state.favorites.splice(index, 1);
      }
      // Save to AsyncStorage
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedDateRangeAtKey: (
      state,
      action: PayloadAction<{
        key: keyof EventsState['selectedDateRange'];
        value: string;
      }>
    ) => {
      state.selectedDateRange[action.payload.key] = action.payload.value;
    },
    setSelectedDateRange: (
      state,
      action: PayloadAction<EventsState['selectedDateRange']>
    ) => {
      state.selectedDateRange = action.payload;
    },
    resetSelectedDateRange: (state) => {
      state.selectedDateRange = {
        startDate: undefined,
        endDate: undefined,
      };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFavorites,
  toggleFavorite,
  setSearchQuery,
  setSelectedDateRangeAtKey,
  setSelectedDateRange,
  resetSelectedDateRange,
  setError,
} = eventsSlice.actions;

export default eventsSlice.reducer;
