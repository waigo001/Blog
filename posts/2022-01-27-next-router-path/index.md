---
title: Next.jsでのルーティング判定
createdAt: "2022-01-27"
updatedAt: "2022-01-27"
isDraft: false
tags:
  - Next.js
  - next/router
---

## 概要

**Next.js**において、現在のパスによってスタイルを変更したい際のメモ

## 使用法

`next/router`にある`useRouter`を活用する。  
コンポーネント内では、以下のように呼び出す事ができる

```tsx
import { useRouter } from "next/router";

const Component = () => {
  const router = useRouter();
  return (...)
};
```

### ルーティング判定

現在のルーティングが予期されているルートに含まれているかどうかを判定する場合、`router`オブジェクトを活用して判定する。  
オブジェクトに何が定義されているかは[公式のAPIドキュメント](https://nextjs.org/docs/api-reference/next/router)に記載がある。  
実際の使用例を示す。

#### 例1 前方一致

```tsx
import { useRouter } from "next/router";

const Component = ({href}) => {
  const router = useRouter();
  const isMatch = router.pathname.startsWith(href)
  return (...)
};
```

#### 例2 部分一致

```tsx
import { useRouter } from "next/router";

const Component = ({href}) => {
  const router = useRouter();
  const [, group] = href.split("/");
  const isMatch = router.pathname.includes(group);
  return (...)
};
```

#### 例3 完全一致

```tsx
import { useRouter } from "next/router";

const Component = ({href}) => {
  const router = useRouter()
  const isMatch = router.asPath === href
  return (...)
};
```

## 参考

- [公式:ルーティングについて](https://nextjs.org/docs/routing/introduction)
- [chakra-ui-docs](https://github.com/chakra-ui/chakra-ui-docs)
