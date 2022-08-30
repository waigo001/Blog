import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";

import GoogleTagManager from "src/components/GoogleTagManager";
import theme from "src/styles/theme";

import nextSeoConfig from "next-seo.config";

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
