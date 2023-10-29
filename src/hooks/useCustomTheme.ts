import { Theme, createTheme, responsiveFontSizes } from "@mui/material";
import colors from "../theme/colors";

declare module "@mui/material/styles" {
  interface Palette {
    sand: Palette["primary"];
    bloody: Palette["primary"];
    red: Palette["primary"];
    blue: Palette["primary"];
    skyblue: Palette["primary"];
    lemongreen: Palette["primary"];
    green: Palette["primary"];
    dirt: Palette["primary"];
    dartdirt: Palette["primary"];
    wtf: Palette["primary"];
  }

  interface PaletteOptions {
    sand?: PaletteOptions["primary"];
    bloody?: Palette["primary"];
    red?: Palette["primary"];
    blue?: Palette["primary"];
    skyblue?: Palette["primary"];
    lemongreen?: Palette["primary"];
    green?: Palette["primary"];
    dirt?: Palette["primary"];
    dartdirt?: Palette["primary"];
    wtf?: Palette["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    sand: true;
    bloody: true;
    red: true;
    blue: true;
    skyblue: true;
    lemongreen: true;
    green: true;
    dirt: true;
    dartdirt: true;
    wtf: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    sand: true;
    bloody: true;
    red: true;
    blue: true;
    skyblue: true;
    lemongreen: true;
    green: true;
    dirt: true;
    dartdirt: true;
    wtf: true;
  }
}

declare module "@mui/material/Icon" {
  interface IconPropsColorOverrides {
    sand: true;
    bloody: true;
    red: true;
    blue: true;
    skyblue: true;
    lemongreen: true;
    green: true;
    dirt: true;
    dartdirt: true;
    wtf: true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    sand: true;
    bloody: true;
    red: true;
    blue: true;
    skyblue: true;
    lemongreen: true;
    green: true;
    dirt: true;
    dartdirt: true;
    wtf: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    sand: true;
    bloody: true;
    red: true;
    blue: true;
    skyblue: true;
    lemongreen: true;
    green: true;
    dirt: true;
    dartdirt: true;
    wtf: true;
  }
}

const createColor = (theme: Theme, color: string, name: string) =>
  theme.palette.augmentColor({
    color: {
      main: color,
    },
    name,
  });

export default function useCustomTheme() {
  let theme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.sand,
      },
    },
    typography: {
      allVariants: {
        color: colors.primary,
      },
    },
  });

  theme = createTheme(responsiveFontSizes(theme), {
    palette: {
      sand: createColor(theme, colors.sand, "sand"),
      bloody: createColor(theme, colors.bloody, "bloody"),
      red: createColor(theme, colors.red, "red"),
      blue: createColor(theme, colors.blue, "blue"),
      skyblue: createColor(theme, colors.skyblue, "skyblue"),
      lemongreen: createColor(theme, colors.lemongreen, "lemongreen"),
      green: createColor(theme, colors.green, "green"),
      dirt: createColor(theme, colors.dirt, "dirt"),
      dartdirt: createColor(theme, colors.dartdirt, "dartdirt"),
      wtf: createColor(theme, colors.wtf, "wtf"),
    },
  });

  return theme;
}
