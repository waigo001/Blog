import Document, { Head, Html, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";

import theme from "src/styles/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {process.env.NODE_ENV === "production" && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${process.env.ID_GTAG}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              />`,
              }}
            />
          )}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
