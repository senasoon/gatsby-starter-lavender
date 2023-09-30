---
title: '[타입 챌린지] 106 - Trim Left'
date: 2023-09-30
description: '정확한 문자열 타입이고 시작 부분의 공백이 제거된 새 문자열을 반환하는 TrimLeft<T>를 구현하십시오.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md

<br/>

정확한 문자열 타입이고 시작 부분의 공백이 제거된 새 문자열을 반환하는 TrimLeft<T>를 구현하십시오.

예시:

```typescript
type trimed = TrimLeft<'  Hello World  '>; // 기대되는 결과는 'Hello World  '입니다.
```

<br/>

## 답안

https://github.com/type-challenges/type-challenges/issues/346

```typescript
type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer A}`
  ? TrimLeft<A>
  : S;
```

`infer`를 사용해서 첫 번째 문자열이 공백이라면 해당 문자열을 제외하고 다시 `TrimLeft<S>`를 적용해서 왼쪽 공백을 제거한다.
