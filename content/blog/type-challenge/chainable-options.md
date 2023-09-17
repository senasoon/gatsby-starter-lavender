---
title: '[타입 챌린지] 12 - Chainable Options'
date: 2023-09-17
description: 'Chainable Options는 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md

<br/>

Chainable Options는 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

이 챌린지에서는 option(key, value)과 get() 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 option으로 지정된 키와 값으로 확장할 수 있고 get으로 최종 결과를 가져올 수 있어야 합니다.

예시:

```typescript
declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// 결과는 다음과 같습니다:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

key는 string만 허용하고 value는 무엇이든 될 수 있다고 가정합니다. 같은 key는 두 번 전달되지 않습니다.

<br/>

## 답안

https://github.com/type-challenges/type-challenges/issues/13951

```typescript
type Chainable<T = object> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>;
  get: () => T;
};
```

`option` 메서드를 연속적으로 체이닝하여 객체 옵션을 설정하고 마지막에 `get`을 통해 결과 객체를 가져온다.

`key`가 객체에서 중복되면 안되고 유일해야 하기 때문에 `K extends keyof T ? never : K`를 설정하여 중복된 `key`를 사용하면 에러가 뜨도록 한다.

`Omit<T, K>`로 객체에서 `key`값이 중복되지 않도록 하고 매번 새로운 `key`, `value`가 추가되도록 `Record<K, V>`를 설정한다.
