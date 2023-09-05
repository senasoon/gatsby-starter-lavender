---
title: '[타입 챌린지] 268 - If'
date: 2023-09-06
description: '조건 C, 참일 때 반환하는 타입 T, 거짓일 때 반환하는 타입 F를 받는 타입 If를 구현하세요. C는 true 또는 false이고, T와 F는 아무 타입입니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md
<br/>
조건 C, 참일 때 반환하는 타입 T, 거짓일 때 반환하는 타입 F를 받는 타입 If를 구현하세요. C는 true 또는 false이고, T와 F는 아무 타입입니다.

예시:

```typescript
type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'
```

<br/>

## 내 답안

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F;
```

제네릭 `C`에는 `true`나 `false`만 올 수 있으므로 `boolean` 타입만 올 수 있게 했다.
새롭게 안 사실은 타입스크립트에서 삼항연산자를 쓸 때 조건에 `extends`를 사용해야 하는 것이다.

## 참고

🔗 https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A1%B0%EA%B1%B4%EB%B6%80-%ED%83%80%EC%9E%85-%EC%99%84%EB%B2%BD-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
