---
title: '[타입 챌린지] 898 - Includes'
date: 2023-09-08
description: 'JavaScript의 Array.includes 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, true 또는 false를 반환해야 합니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md
<br/>
JavaScript의 Array.includes 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, true 또는 false를 반환해야 합니다.

예시:

```typescript
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
```

<br/>

## 답안

https://github.com/type-challenges/type-challenges/issues/1568

```typescript
type Includes<T extends readonly any[], U> = T extends [infer H, ...infer Rest]
  ? Equal<H, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```

easy 단계인데 갑자기 너무 복잡한 문제가...🥲

배열 안에는 유니온 타입이나 객체 타입이 있을 수 있기 때문에 삼항 연산자로 반복하며 배열 내부에 제네릭 `U`와 같은 타입이 있는지 `Equal` 내장 함수로 확인한다.
