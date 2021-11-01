---
title: Next.jsでJamstackなブログを作ってみた 2.スタイル変更編
createdAt: "2021-10-30"
updatedAt: "2021-10-30"
isDraft: true
---

## 概要

MUI(旧Material-UI)を利用したブログのスタイリングについて、備忘録を残す。

## 導入

### MUIのインストール

```bash
$ npm i @mui/material @emotion/react @emotion/styled
```

### アイコンのインストール

```bash
$ npm i @mui/icons-material
```

### MUIの設定

全ページに適用させるため、`_app.tsx`に以下記述する。

```tsx:_app.tsx
import React from "react";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "src/styles/theme";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
```

`<CssBaseline />`は各種マージンの削除等、CSS Resetのように振る舞う。具体な内容は[ここ](https://mui.com/components/css-baseline/)を参照。

また`<ThemeProvider>`の中で`theme`を割り当てている。この`theme`をカスタマイズすることで、すべてのページの基本テーマ（色やフォント等）を統一できる。

```ts:theme.ts
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

```

この中で2回`createTheme`を呼び出しているが、前者はテーマの設定を使用しない部分の変更であり、後者はテーマ設定を利用した変更となる。  
コンポーネントをカスタマイズしたい場合は、後者を利用する場合が多い。
フォントはここで設定するが、webフォント（[Google Fonts](https://fonts.google.com/)）を利用する場合は、別途設定が必要なので後述する。

### Webフォントの設定

今回は「Noto Sans JP」・「Roboto」・「Josefin Sans」をGoogle Fontsを経由して利用する。  
`_document.tsx`に以下追記する。

```tsx:_document.tsx
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto&family=Josefin+Sans&display=optional"
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

重要なのは以下の部分

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto&family=Josefin+Sans&display=optional"
  rel="stylesheet"
/>;
```

- `family=`で使用したいフォント名を列挙する。
- `display=`は`optional`に設定する。（Next.jsの[ここ](https://nextjs.org/docs/messages/google-font-display)を参照）

上記のように設定することで、Next.jsでビルド時に自動的に最適化が行われる。
