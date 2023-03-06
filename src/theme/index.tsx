// https://github.com/devias-io/material-kit-react/blob/main/src/theme/index.js

import { createTheme as createMuiTheme } from "@mui/material";
import { createPalette } from "@/theme/palette";
import { createComponents } from "@/theme/components";
import { createShadows } from "@/theme/shadows";
import { createTypography } from "@/theme/typography";

// declare module "@mui/material/styles" {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

export function createTheme() {
  const palette = createPalette();
  const components: any = createComponents({ palette });
  const shadows = createShadows();
  const typography: any = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8,
    },
    typography,
  });
}
