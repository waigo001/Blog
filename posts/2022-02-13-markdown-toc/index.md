---
title: react-markdownのブログに目次(TOC)をつける
createdAt: "2022-02-13"
updatedAt: "2022-02-14"
isDraft: false
description: "react-markdownで作成したブログに、markdownから抽出した目次をつけた際のメモ。"
tags:
  - Next.js
  - markdown
  - React-Markdown
---

## 概要

**react-markdown**で作成したブログに、markdownから抽出した目次をつけた際のメモ。

## 環境

| パッケージ          | ver     |
| ------------------- | ------- |
| react-markdown      | 8.0.0   |
| rehype-slug         | 5.0.1   |
| node.js             | 16.13.1 |
| remark              | 14.0.2  |
| unist-util-visit    | 4.1.0   |
| hast-util-to-string | 2.0.0   |
| github-slugger      | 1.4.0   |

## 設定

### 見出しへのリンク

見出しにリンクを設定するには、見出し要素に`id`（ラベル）を設定する。

```html
<h2 id="見出し2">見出し2</h2>
```

この見出しへジャンプするには、アンカーリンクにて以下の通り設定する。

```html
<a href="#見出し2">見出し2へのリンク</a>
```

上記2つをmarkdownから生成する際に自動的に設定したい。  
**react-markdown**には**rehype**や**remark**のプラグインがそのまま利用できるため、これを活用する。

```tsx:Renderer.tsx {5}
const Renderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
      rehypePlugins={[rehypeSlug]}
    >
      {content}
    </ReactMarkdown>
  );
};
```

### 見出しのリスト抽出

見出しの一覧については、ファイルからの読み込み時にmarkdownから抽出する。
まずは目次の型定義から。

```ts:Toc.d.ts
type Toc = {
  text: string;
  id: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6;
};
```

`text`は見出し、`id`は見出しから変換した[Slug](https://developer.mozilla.org/ja/docs/Glossary/Slug)、`depth`は見出しの段階(h1-h6)に対応。

また、markdown本文から抽出するため、`unified`系のライブラリを活用し以下のコードを組んだ。

```ts:mdUtils.ts
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString, Node } from "hast-util-to-string";
import slugger from "github-slugger";

export const extractToc = (mdBody: string) => {
  const result: Toc[] = [];
  const ast = remark().parse(mdBody);
  visit(ast, "heading", (child) => {
    const text = toString(child as unknown as Node);
    const id = slugger.slug(text);
    const depth = child.depth;
    result.push({
      text,
      id,
      depth,
    });
  });

  return result;
};
```

`rehype-slug`で生成される**Slug**(id)と同じ**Slug**を生成する必要があるため、`rehype-slug`内部で使用しているものと同じライブラリ、`github-slugger`を用いて生成している。

あとは抽出した目次一覧のデータから表示をカスタマイズする。

```tsx:TableOfContent.tsx
import {
  chakra,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";

const TableOfContent = (props:Toc[]) => {
  return (
    <OrderedList styleType="none">
      {extractToc.map(({ text, id, depth }) => (
        <ListItem key={id} title={text}>
          <chakra.a href={`#${id}`}>{text}</chakra.a>
        </ListItem>
      ))}
    </OrderedList>
  );
};
```

## 参考

- [このBlog](https://github.com/waigo001/Blog)
- [chakra-ui-docs](https://github.com/chakra-ui/chakra-ui-docs)
