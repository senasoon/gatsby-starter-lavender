---
title: '[타입 챌린지] 16 - Pop'
date: 2023-09-22
description: '배열 T를 사용해 마지막 요소를 제외한 배열을 반환하는 제네릭 Pop<T>를 구현합니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md
<br/>
배열 T를 사용해 마지막 요소를 제외한 배열을 반환하는 제네릭 Pop<T>를 구현합니다.

예시:

```typescript
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

<br/>

## 내 답안

```typescript
type Pop<T extends unknown[]> = T extends [...infer Rest, infer A] ? Rest : [];
```

```typescript
type Pop<T extends unknown[]> = T extends [...infer Rest, infer A]
  ? Rest
  : T extends []
  ? []
  : never;
```
