---
title: '[타입 챌린지] 8 - Readonly 2'
date: 2023-09-14
description: 'T에서 K 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제네릭 MyReadonly2<T, K>를 구현하세요. K가 주어지지 않으면 단순히 Readonly<T>처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md

<br/>

T에서 K 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제네릭 MyReadonly2<T, K>를 구현하세요. K가 주어지지 않으면 단순히 Readonly<T>처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.

예시:

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

<br/>

## 내 답안

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

`K`가 없을 경우 `T`의 `key`들을 모두 `readonly`로 해야하기 때문에 `= keyof T`라는 것으로 `K`의 기본 값을 설정해준다.

먼저 `K`를 `key`로 가진 모든 것을 `readonly`로 설정하고 `K`에 해당하지 않는 `key`들은 이전과 같은 타입으로 반환한다.

## 참고

https://github.com/type-challenges/type-challenges/issues/9050
