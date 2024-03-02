import { createTheme, ThemeProvider } from '@mui/material/styles';

const ethDenverTheme = createTheme({
  palette: {
    ethDenverPrimary: {
      ethPink: "#ff65af",
      skyPurple: "#844aff",
      midGrey: "#C5C5C5",
      lightGrey: "#F8F8F9",
    },
    ethDenverSecondary: {
      brightRed: "#FF3254",
      blueBlue: "#00E7F2",
      goodGreen: "#27E26F",
      sweetYellow: "#FFFF4C",
    },
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
      fontFamily: "Darker-Hanken-Grotesk",
    },
    filled: {
      fontFamily: "Hanken-Grotesk-Regular",
    },
  },
});

export { ethDenverTheme };