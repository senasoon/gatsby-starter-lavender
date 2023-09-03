---
title: '[타입 챌린지] 189 - Awaited'
date: 2023-09-03
description: 'Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

### ✔️ **문제**

https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md

<br/>
Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

예시: 들어 Promise<ExampleType>이 있을 때, ExampleType을 어떻게 얻을 수 있을까요?

```typescript
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

`Awatied<T>`라는 내장 타입으로 `Promise`를 제거할 수 있지만 여기서는 내장 타입을 사용하지 않고 구현하는 것이 문제였다.

<br/>

### ✔️ **답안**

https://github.com/type-challenges/type-challenges/issues/18837

```typescript
type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer V>
    ? V extends PromiseLike<any>
      ? MyAwaited<V>
      : V
    : never;
```

**`Promise<T>`와 `PromiseLike<T>`의 차이점**

처음 `Promise` 개념이 등장했을 때는 `then`만 지원하는 라이브러리가 많았다.
이후 `catch`와 `finally`가 정식 문법으로 추가되었다.

`Promise` 타입에는 `then`, `catch`, `finally`를 모두 지원하며,
`PromiseLike`는 과거 라이브러리들과의 호환성을 위해 `then`만 지원하는 타입이 추가적으로 포함되어 있다.
따라서 `Promise`보다 넓은 타입 정의가 가능하다.

<br/>

### 참고

https://brunch.co.kr/@brunch-test/11

https://jaenny-dev.tistory.com/5#article-2-2--promiselike
