// theme.ts
import {
 createTheme,
 DEFAULT_THEME,
 mergeMantineTheme,
} from '@mantine/core';

const themeOverride = createTheme({
 colors: {
  bannerYellow: [
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
   '#FFD600',
  ],
 },
 primaryColor: 'bannerYellow',
 defaultRadius: 0,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);