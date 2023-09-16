---
title: '[타입 챌린지] 10 - Tuple to Union'
date: 2023-09-16
description: '튜플 값으로 유니온 타입을 생성하는 제네릭 TupleToUnion<T>를 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md

<br/>

튜플 값으로 유니온 타입을 생성하는 제네릭 TupleToUnion<T>를 구현하세요.

예시:

```typescript
type Arr = ['1', '2', '3'];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

<br/>

## 답안

```typescript
type TupleToUnion<T extends readonly unknown[]> = T[number];
```

`T[number]`로 배열 요소에 접근할 수 있고 결과는 요소들의 타입을 유니온으로 내보낸다.

## 참고

https://github.com/type-challenges/type-challenges/issues/7
