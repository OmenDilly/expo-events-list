export type Theme = 'auto' | 'dark' | 'light';

export const themes: {
  value: Theme;
  name: string;
}[] = [
  { value: 'auto', name: 'autoTheme' },
  { value: 'dark', name: 'darkTheme' },
  { value: 'light', name: 'lightTheme' },
];
