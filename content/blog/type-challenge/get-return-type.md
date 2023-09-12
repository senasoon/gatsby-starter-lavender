---
title: '[타입 챌린지] 2 - Get Return Type'
date: 2023-09-12
description: '내장 제네릭 ReturnType<T>을 사용하지 않고 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md

<br/>

내장 제네릭 ReturnType<T>을 이를 사용하지 않고 구현하세요.

```typescript
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

<br/>

## 내 답안

```typescript
type MyReturnType<T extends (...args: any) => unknown> = T extends (
  ...args: any
) => infer A
  ? A
  : never;
```
