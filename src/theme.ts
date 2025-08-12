// theme.ts
import {
 colorsTuple,
 createTheme,
 DEFAULT_THEME,
 mergeMantineTheme,
} from '@mantine/core';

const themeOverride = createTheme({
 colors: {
  bannerYellow: colorsTuple('#FFD600')
 },
 primaryColor: 'bannerYellow',
 defaultRadius: 0,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);