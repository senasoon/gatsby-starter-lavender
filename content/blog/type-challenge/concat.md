---
title: '[타입 챌린지] 533 - Concat'
date: 2023-09-07
description: 'JavaScript의 Array.concat 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md
<br/>
JavaScript의 `Array.concat` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.

## 답안

https://github.com/type-challenges/type-challenges/issues/538
<br/>

```typescript
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
];
```

튜플은 고정된 길이와 타입을 가진다. 일반 배열 뿐만 아니라 튜플 타입도 인수로 받을 수 있어야 하기 때문에 `readonly unknown[]`을 사용하여 일반 배열과 튜플 모두 인수로 받을 수 있도록 한다.
