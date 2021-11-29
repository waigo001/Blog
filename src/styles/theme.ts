import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontFamilyCode?: string;
  }
  interface Typography {
    fontFamilyCode: string;
  }
}

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
    fontFamilyCode: [
      "Consolas",
      "Monaco",
      "Andale Mono",
      "Ubuntu Mono",
      "monospace",
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
