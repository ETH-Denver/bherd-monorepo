import { createTheme, ThemeProvider } from '@mui/material/styles';

const ethDenverTheme = createTheme({
  palette: {
    primary: {
      main: "#ff65af",
    },
    secondary: {
      main: "#844aff",
    },
  },
  typography: {
    h5: {
      fontFamily: "Darker-Hanken-Grotesk",
    },
    h3: {
      fontFamily: "Hanken-Grotesk-Regular",
    },
    filled: {
      fontFamily: "Hanken-Grotesk-Regular",
    },
  },
});

export { ethDenverTheme };