---
title: '[타입 챌린지] 9 - Deep Readonly'
date: 2023-09-15
description: '객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 DeepReadonly<T>를 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md

<br/>

객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 DeepReadonly<T>를 구현하세요.

이 챌린지에서는 타입 파라미터 T를 객체 타입으로 제한하고 있습니다. 객체뿐만 아니라 배열, 함수, 클래스 등 가능한 다양한 형태의 타입 파라미터를 사용하도록 도전해 보세요.

예시:

```typescript
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

<br/>

## 답안

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
```

`keyof`를 사용하여 `T[P]`가 객체인지 확인하는 조건문으로 객체라면 `DeepReadonly<T[P]>`가 재귀적으로 호출되도록 한다.

처음에 답을 아래와 같이 적었는데 틀린 답이었다.

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends {} ? DeepReadonly<T[P]> : T[P];
};
```

그 이유는 `{}`는 빈 객체를 의미하는 것이 아니라 **nullish가 아닌 값**을 의미하기 때문이다. `undefined`나 `null`처럼 nullish한 값만 에러가 난다.

## 참고

https://github.com/type-challenges/type-challenges/issues/187

https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
