import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "src/styles/theme";
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";
import GoogleTagManager from "src/components/GoogleTagManager";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      {process.env.NODE_ENV === "production" && (
        <GoogleTagManager googleTagManagerId={process.env.ID_GTAG} />
      )}
      <ChakraProvider theme={theme} portalZIndex={40}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
