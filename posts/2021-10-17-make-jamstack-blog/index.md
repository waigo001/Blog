---
title: Next.jsでJamstackなブログを作ってみた
createdAt: "2021-10-17"
updatedAt: "2021-10-17"
ogpTitle: Next.jsでJamstackな<br/>ブログを作ってみた
isDraft: false
tags:
  - Jamstack
  - Next.js
---

## そもそも理論（またですか）

- Gatsbyで開発するとなんか重い。
- とはいえ記事の管理簡単（Postフォルダでそれぞれで区切ればOK）なのでGatsbyも捨てがたい。
- Next.jsはプラグインをスクラッチしないといけないのでめんどい
- 公式の[サンプル](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript) & [理想的な構成をしているブログ](https://kenzoblog.vercel.app/posts/nextjs-blog-asset)があったので、スキルアップも兼ねてまた１から組むことにした。

## 導入

### プロジェクトの作成（Next.js共通）

以下のコマンドにて、プロジェクトを作成する。

```bash
$ npx create-next-app@latest
```

`tsconfig.json`を設定する。中身は別記事で備忘録書く予定。

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "outDir": "."
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Typescript対応させるには追加で以下の作業が必要

```bash
$ npm i -D @types/react typescript
```

`pages`フォルダの配置を`src`フォルダ配下に変更。(配置変えるだけでOK)  
いろいろ追加した後のディレクトリ構成はこんな感じ。

```bash
$ tree -I node_modules -d
.
├── public
└── src
    ├── components
    ├── lib
    ├── pages
    │   ├── about
    │   └── blog
    └── types

```

### markdownの読み込み設定

`posts`配下に各種記事をフォルダ毎に`index.md`で入稿する。
treeにて表すとこんな感じ。

```sh
$ tree posts/
posts/
├── 2021-10-17-make-jamstack-blog
│   └── index.md
└── 2021-10-25-markdown-format-prettier
    ├── index.md
    └── prettier-extension.png
```

これを実現するために、以下の通り設定した。

```js
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
```

諸々デフォルトより変更はあるが、大きな変更点は`webpack`の部分。  
この記述で拡張子`md`のファイルをバンドルしている。  
このバンドルしたファイルを呼び出し、unified等で変換すればいい。

### frontmatterの読み込み設定

markdown内にfrontmatter（記事の公開日やタグ等、メタデータをmarkdownの頭にyaml形式等で記述したもの）を設定したい場合は読み込みに一工夫必要となる。

以下のパッケージをインストールする。

```bash
$ npm i gray-matter
```

`src/lib/post.ts`を作成し、以下の通り記述する。  
markdownの入ったフォルダを変更したい場合は`postsDir`の`"posts"`を変更すればよい。

```ts
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "posts");

export const getPost = (slug: string): Post => {
  const fullPath = join(postsDir, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: slug,
    isDraft: data.isDraft,
    description: data.description || null,
    content: content,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPost(slug));

  return posts.sort((post1, post2) =>
    post1.updatedAt > post2.updatedAt ? -1 : 1
  );
};

export const getPostSlugs = () => {
  return fs.readdirSync(postsDir);
};
```

また、`Post`という型を定義し、frontmatterとmarkdown本文を合わせて一つのオブジェクトとして扱っている。

```ts
type Post = {
  slug: string;

  title: string;
  isDraft: boolean;
  updatedAt: string;
  createdAt: string;
  description?: string;

  content: string;
};
```

### 画像のパス解決

Next.jsでは、`public`フォルダにファイルを配置することで、そのまま公開することができる。  
例えば、faviconを`public/favicon.png`のように配置した場合、「`サイトのURL/favicon.png`」で読み込むことができる。

しかし、Gatsbyと同じように`posts`配下のフォルダをそれぞれ1つの記事として管理し、画像を配置したい。（例えば、`posts/2021-10-28-make-jamstack-blog/sample.jpg`のパスのように画像を配置したい）ので、markdown→HTMLへの変換時に画像への相対パスを確認し`require`にてダイナミックに読み込ませるようにした。

```tsx
import Image from "next/image";

const ImgRenderer: React.FC<{ alt?: string; src?: string }> = (props) => {
  const { alt, src } = props;

  if (!src) return <></>;

  const imgSrc = require(`posts/${post.slug}/${src}`);
  return <Image src={imgSrc} alt={alt} />;
};
```

この`ImgRenderer`のコンポーネントを、markdownを変換する際に読み込み置換させる。

```tsx
const Renderer = () => {
  //　一部略

  return (
    <ReactMarkdown components={{ img: ImgRenderer }}>
      {post.content}
    </ReactMarkdown>
  );
};
```

## まとめ

Gatsbyではプラグインで解決できる部分を1から組むと、仕組みがわかってかなり勉強になった。
全体的なスタイリングとかは別途記事にする予定。
