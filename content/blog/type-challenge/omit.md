---
title: '[타입 챌린지] 3 - Omit'
date: 2023-09-13
description: 'T에서 K 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 Omit<T, K>를 이를 사용하지 않고 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.md

<br/>

T에서 K 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 Omit<T, K>를 이를 사용하지 않고 구현하세요.

예시:

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};
```

<br/>

## 답안

https://github.com/type-challenges/type-challenges/issues/448

```typescript
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

<br/>

### keyof

`keyof`: 객체 형태의 타입을 `key`만 모은 유니온 타입으로 만들어주는 연산자

```typescript
type Type = {
  name: string;
  age: number;
  married: boolean;
};

type Union = keyof Type;
// type Union = name | age | married
```

객체의 키값을 순환하려면 `[P in keyof T]` 처럼 keyof를 in과 함께 사용해야 한다.

<br/>

### Mapped Type

Mapped Type이란 기존에 정의되어 있는 타입을 새로운 타입으로 변환해주는 문법이다. 마치 자바스크립트 `map` API 함수를 타입에 적용한 것과 같은 효과를 가진다.

Mapped Type의 예시는 아래와 같다.

```typescript
{ [ P in K ] : T }
{ [ P in K ]? : T }
{ readonly [ P in K ] : T }
{ readonly [ P in K ]? : T }
```

<br/>

### as로 Key Remapping하기

TypeScript 4.1부터 `as`를 사용하여 Mapped Type안에 있는 `key`들을 remap할 수 있다.
예시는 아래와 같다.

```typescript
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

type LazyPerson = {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
};
```

더 자세한 내용안 아래 링크에서 확인할 수 있다.

🔗 https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as

결론적으로 문제의 답안인 `MyOmit`은 Mapped Type을 사용하는데 이때 `K`에 해당하는 `key`를 제외하기 위해 `as`로 Remap을 하여 해결했다는 것을 알 수 있다.

## 참고

🔗 https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-keyof-typeof-%EC%82%AC%EC%9A%A9%EB%B2%95

🔗 https://joshua1988.github.io/ts/usage/mapped-type.html#%EB%A7%B5%EB%93%9C-%ED%83%80%EC%9E%85-mapped-type-%EC%9D%B4%EB%9E%80
