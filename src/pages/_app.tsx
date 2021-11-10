import React from "react";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "src/styles/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/lib/createEmotionCache";

const cache = createEmotionCache();

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
