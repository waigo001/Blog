import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "Roboto",
      "'Noto Sans JP'",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "Yu Gothic Medium",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    mode: "light",
  },
});

theme = createTheme(theme, {
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
  },
});

export default theme;
