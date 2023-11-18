import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { colors } from "@mui/material";

const white = "#fff";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#39CDCC",
      light: "#39cdcc14",
      contrastText: white,
    },
    secondary: {
      main: "#213F7D",
      contrastText: white,
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400],
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400],
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400],
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400],
    },
    text: {
      primary: "#545F7D",
      secondary: "#213F7D",
},
    action: {
      disabled: "#FFFFFF",
      disabledBackground: "#7EDEDE",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;