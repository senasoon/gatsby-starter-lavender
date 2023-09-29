---
title: '[타입 챌린지] 62 - Type Lookup'
date: 2023-09-29
description: '때때로 유니온 타입의 특정 속성을 기준으로 조회할 수도 있습니다.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md
<br/>
때때로 유니온 타입의 특정 속성을 기준으로 조회할 수도 있습니다.

이 챌린지에서는 유니온 타입 Cat | Dog에서 공통으로 사용하는 type 필드를 기준으로 해당하는 타입을 얻고자 합니다. 다시 말해서, 다음 예시에서는 LookUp<Cat | Dog, 'dog'>으로 Dog 타입을, LookUp<Cat | Dog, 'cat'>으로 Cat 타입을 얻을 수 있습니다.

예시:

```typescript
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDogType = LookUp<Cat | Dog, 'dog'>; // 기대되는 결과는 `Dog`입니다.
```

<br/>

## 내 답안

```typescript
type LookUp<U, T> = U extends { type: T } ? U : never;
```

interface 형식을 표현하기 위 `{type: T}`를 사용해줘서 `U`에서 type이 `T`와 같은지 확인한다.
