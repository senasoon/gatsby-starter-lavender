---
title: '[타입 챌린지] 3060 - Unshift'
date: 2023-09-10
description: 'Array.unshift의 타입 버전을 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md
<br/>
Array.unshift의 타입 버전을 구현하세요.

예시:

```typescript
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

<br/>

## 내 답안

```typescript
type Unshift<T extends unknown[], U> = [U, ...T];
```

제네릭 `U` 타입을 추가한 다음, 배열인 `T`를 스프레드 문법을 사용하여 타입을 정의하고 새로운 배열 타입을 반환한다.
