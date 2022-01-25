---
title: next-sitemapでsitemapとrobotsを自動生成する
createdAt: "2022-01-25"
updatedAt: "2022-01-25"
isDraft: false
tags:
  - Next.js
  - next-sitemap
---

## 概要

`Next.js`でsitemapを公開する場合、`public`フォルダに`sitemap.xml`を作成し保存すれば公開される。  
ただ、ページを作成する毎に編集する必要があるため、これを自動化したい。

幸いにも`next-sitemap`なるツールがあるため、これを利用する。

## 環境

| パッケージ   | ver      |
| ------------ | -------- |
| next         | 12.0.8   |
| next-sitemap | 2.0.2    |
| node.js      | v16.13.1 |

## インストール

プロジェクトルートにて、以下コマンドでインストールする。

```sh
$ npm install --save-dev next-sitemap
```

## 設定

`next-sitemap.js`をプロジェクトルートに生成し、以下を記載する。

`priority`や`changefreq`は設定していないサイトが多いため、デフォルトから除外するように設定している。  
また、`generateRobotsTxt`を`true`にしておくと、`robots.txt`を自動生成するので便利。

詳細な設定は[公式](https://github.com/iamvishnusankar/next-sitemap)を参照

```js:next-sitemap.js
module.exports = {
  siteUrl: "https://k-w.info",
  generateRobotsTxt: true,
  priority: undefined,
  changefreq: undefined,
  autoLastmod: false,
};
```

`.gitignore`に以下追記する。

```conf:.gitignore
/public/robots.txt
/public/sitemap*.xml
```

また、`package.json`に以下追記する。
これを記載することで、`npm run build`を実施した際に`npm run postbuild`コマンドも自動的に走る。

```json:package.json {5}
{
  ...
  "scripts": {
    ...
    "postbuild": "next-sitemap"
  }
  ...
}

```

## あとがき

`lastmod`については、はmarkdownから更新日時の読み込みを実施させたいが、未実装。  
（[この辺](https://github.com/iamvishnusankar/next-sitemap#generating-dynamicserver-side-sitemaps)を上手いことすればいけそう）  
上手いこといけば記事更新します。
