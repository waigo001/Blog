---
title: Next.jsでJamstackなブログを作ってみた 2.スタイル変更編
createdAt: "2022-01-26"
updatedAt: "2022-01-27"
isDraft: true
tags:
  - Next.js
  - Jamstack
  - markdown
  - Chakra-UI
---

## 概要

Chakra UIを利用したブログについて、備忘録を残す。

## 導入

### Chakra UI

---

```bash
$ npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^5
```

### アイコン

```bash
$ npm i --save react-icons
```

## 設定

### テーマ(Theme)

全ページに適用させるため、`_app.tsx`に以下記述する。

```tsx:_app.tsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "src/styles/theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} portalZIndex={40}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
```

**ChakraProvider**はデフォルトでCSS Resetがオンになっている。オフにする場合は、`resetCSS={true}`を設定する。

また、**theme**をカスタマイズすることで、すべてのページの基本テーマ（色やフォント等）を統一できる。

```ts:theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading:
      'Roboto,"Noto Sans JP",-apple-system,"BlinkMacSystemFont","Hiragino Kaku Gothic ProN","Hiragino Sans","Segoe UI","Yu Gothic UI",Meiryo,sans-serif,"Segoe UI Emoji"',
    body: 'Roboto,"Noto Sans JP",-apple-system,"BlinkMacSystemFont","Hiragino Kaku Gothic ProN","Hiragino Sans","Segoe UI","Yu Gothic UI",Meiryo,sans-serif,"Segoe UI Emoji"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
});

export default theme;

```

Chakra UIはダークモードに対応している。また、**useSystemColorMode**を設定することで、OSのダークモードを認識し自動的に切り替えることができる。  
参考：[Dark Mode](https://chakra-ui.com/docs/comparison#dark-mode-)

フォントはここで設定するが、webフォント（[Google Fonts](https://fonts.google.com/)）を利用する場合、Next.jsの`font optimization`（最適化）を利用できる。

### Webフォント

今回は「Noto Sans JP」・「Roboto」をGoogle Fontsを経由して利用する。  
`_document.tsx`に以下追記する。

```tsx:_document.tsx {10-13}
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

```

重要なのはハイライトの部分

- `family=`で使用したいフォント名を列挙する。
- **font-weight**も併せて指定する

このように設定することで、Next.jsでビルド時に自動的に最適化が行われる。

### ディレクトリ構造

## まとめ
