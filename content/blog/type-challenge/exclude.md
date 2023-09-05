---
title: '[타입 챌린지] 43 - Exclude'
date: 2023-09-02
description: 'T에서 U에 할당할 수 있는 타입을 제외하는 타입을 내장 제네릭 Exclude<T, U>를 사용하지 않고 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md
<br/>
T에서 U에 할당할 수 있는 타입을 제외하는 타입을 내장 제네릭 Exclude<T, U>를 사용하지 않고 구현하세요.

<br/>

## 답안

https://github.com/type-challenges/type-challenges/issues/54

```typescript
type MyExclude<T, U> = T extends U ? never : T;
```

T에 들어온 타입이 U와 같은 타입이라면 타입을 반환하지 않고, 다른 타입이라면 T에 들어간 타입을 반환하는 것을 뜻한다.
