---
title: next-sitemapでsitemapとrobots.txtを自動生成する
createdAt: "2022-01-25"
updatedAt: "2022-01-25"
isDraft: false
tags:
  - Next.js
  - next-sitemap
---

## 概要

`Next.js`でsitemapを追加する場合、`public`フォルダに`sitemap.xml`を作成すればよい。  
ただ、ページを作成する毎に編集する必要があるため、これを自動化したい。

幸いにも`next-sitemap`なるツールがあるため、これを利用する。

## 環境

| パッケージ   | ver      |
| ------------ | -------- |
| next         | 12.0.8   |
| next-sitemap | 2.0.2    |
| node.js      | v16.13.1 |

ホスティング先：[Vercel](https://vercel.com/)

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
  siteUrl: process.env.SITE_URL,
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
これを記載することで、`npm run build`を実施した際に`npm run postbuild`コマンドも自動的に実行される。

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

## sitemapのカスタマイズ

記事については最終更新日時を設定できるため、これを`lastmod`に記載すればクローラーが記事を更新したと認識できる。

本サイトではSSR(Server Side Rendering)限定であるが、以下でsitemapを動的に生成している。

```tsx:pages/blog-sitemap.xml.tsx
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getAllPosts } from "src/lib/post";
import { parseISO } from "date-fns";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = getAllPosts();

  const fields = posts.map((post) => {
    return {
      loc: process.env.SITE_URL + "/blog/" + post.slug,
      lastmod: parseISO(post.updatedAt).toISOString(),
    };
  });
  return getServerSideSitemap(ctx, fields);
};

//Next.jsでエラーを出さないための措置
const Page = () => null;
export default Page;
```

また、

- 動的に生成するページの除外
- `blog-sitemap.xml.tsx`自身の除外
- 自動生成される`robots.txt`に`blog-sitemap.xml`をsitemapとして追加

上記3点を実現するため、`next-sitemap.js`を以下の通り書き換える。

```js:next-sitemap.js {7-9}
module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: undefined,
  generateRobotsTxt: true,
  priority: undefined,
  autoLastmod: false,
  exclude: ["/server-sitemap.xml", "/blog/*"],
  robotsTxtOptions: {
    additionalSitemaps: [process.env.SITE_URL + "/blog-sitemap.xml"],
  },
};
```

## 備考

サーバサイドではなくSSGで更新日時を追加できれば良いが、現状の`next-sitemap`では無理そう。
