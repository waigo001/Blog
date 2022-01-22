import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "src/styles/theme";
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />

      <ChakraProvider theme={theme} portalZIndex={40}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
