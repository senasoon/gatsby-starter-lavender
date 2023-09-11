---
title: "[타입 챌린지] 3312 - Parameters"
date: 2023-09-11
description: "내장 제네릭 Parameters<T>를 이를 사용하지 않고 구현하세요."
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md
<br/>
내장 제네릭 Parameters<T>를 이를 사용하지 않고 구현하세요.

예시:

```typescript
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

<br/>

## 내 답안

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never;
```

어떻게 parameters의 타입을 가져올 수 있을까? `infer`를 사용하여 parameters의 타입을 가져오면 된다.

`infer`

- 조건부 타입의 조건식이 참으로 평가될 때 `infer` 키워드를 사용할 수 있으며 조건식이 참이면 `infer` 키워드를 통해 타입 추론이 가능하다.

## 참고

🔗 https://stackoverflow.com/questions/51851677/how-to-get-argument-types-from-function-in-typescript
