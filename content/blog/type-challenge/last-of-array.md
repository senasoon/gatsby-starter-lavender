---
title: '[타입 챌린지] 15 - Last of Array'
date: 2023-09-18
description: '배열 T를 사용하고 마지막 요소를 반환하는 제네릭 Last<T>를 구현합니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md

<br/>

배열 T를 사용하고 마지막 요소를 반환하는 제네릭 Last<T>를 구현합니다.

예시:

```typescript
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

<br/>

## 내 답안

```typescript
type Last<T extends unknown[]> = T extends [...infer Rest, infer A] ? A : never;
```

이렇게 해도 테스트는 통과하지만 `never`가 있기 때문에 좋은 답인지는 모르겠다.

## 다른 답안

https://github.com/type-challenges/type-challenges/issues/100

```typescript
type Last<T extends unknown[]> = [unknown, ...T][T['length']];
```

`T['length']`를 하면 배열의 길이를 가져올 수 있다. 하지만 산술 연산은 못하기 때문에 맨 앞에 `unknown` 타입을 넣어줘서 가장 마지막 요소가 반환되게 한다.
