---
title: '[타입 챌린지] 20 - Promise.all'
date: 2023-09-23
description: 'PromiseLike 객체들의 배열을 허용하는 PromiseAll 함수 타입을 입력합니다. 반환 값은 `Promise<T>`여야 합니다. 여기서 `T`는 resolved된 결과 배열입니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md
<br/>
PromiseLike 객체들의 배열을 허용하는 PromiseAll 함수 타입을 입력합니다. 반환 값은 `Promise<T>`여야 합니다. 여기서 `T`는 resolved된 결과 배열입니다.

예시:

```typescript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

## 답안

https://github.com/type-challenges/type-challenges/issues/508
<br/>

```typescript
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [P in keyof T]: Awaited<T[P]>;
}>;
```
