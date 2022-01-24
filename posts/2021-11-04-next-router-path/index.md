---
title: next/routerのuseRouterの活用について
createdAt: "2021-11-04"
updatedAt: "2021-11-04"
isDraft: true
tags:
  - Next.js
---

## 概要

Next.jsでのルーティングについては、[公式にドキュメント](https://nextjs.org/docs/routing/introduction)がある。

コンポーネントの中で、現在のパスによってスタイルを変更したい場合などがある。
その際は、`next/router`にある`useRouter`を活用する。

## 使用法

コンポーネント内では、以下のように呼び出す事ができる

```tsx
import { useRouter } from "next/router";

const Component = () => {
  const router = useRouter();
  return (...)
};
```

### useRouterを用いたルーティング判定

現在のルーティングが予期されて居るルートに含まれているかどうかを判定する場合、`router`オブジェクトを活用して判定する。オブジェクトに何が定義されているかは[ここのドキュメント](https://nextjs.org/docs/api-reference/next/router)に記載があるが、実際の使用例を示す。

```tsx
import { useRouter } from "next/router";

const Component = ({path}) => {
  const router = useRouter();
  const isMatch = router.pathname.startsWith(path)
  return (...)
};
```

`isMatch`の部分にて、`router`の`pathname`（現在のルート）を呼び出している。 `startsWith`を用いることで、文字列が引数で指定された文字列で始まるか、つまり『引数`path`が`router.pathname`に含まれるか』を判定している。
