import {
  createTheme as createMuiTheme,
  Palette,
  PaletteOptions,
  Theme,
} from '@mui/material/styles';
import { createThemeComponents } from './components';
import mixins from './mixins';
import { darkPalette, lightPalette } from './palette';
import shape from './shape';
import transitions from './transitions';
import typography from './typography';

export const createTheme = (direction: 'ltr' | 'rtl', mode: 'dark' | 'light') => {
  const palette: PaletteOptions = mode === 'dark' ? darkPalette : lightPalette;

  // Create base theme
  const baseTheme: Theme = createMuiTheme({
    direction,
    mixins,
    palette,
    shape,
    transitions,
    typography,
  });

  // Inject base theme to be used in components
  return createMuiTheme(
    {
      components: createThemeComponents(baseTheme),
    },
    baseTheme,
  );
};
