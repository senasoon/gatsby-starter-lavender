---
title: '[타입 챌린지] 3057 - Push'
date: 2023-09-09
description: 'Array.push의 제네릭 버전을 구현하세요.'
tags: [TypeScript]
thumbnail: /thumbnails/hello-world.jpg
---

<p align="center"><img src="./type-challenge.jpeg"/></p>

## 문제

https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md
<br/>
Array.push의 제네릭 버전을 구현하세요.

예시:

```typescript
type Result = Push<[1, 2], '3'>; // [1, 2, '3']
```

<br/>

## 내 답안

```typescript
type Push<T extends unknown[], U> = [...T, U];
```

배열인 T는 스프레드 문법을 사용, 제네릭 `U` 타입을 추가한 새로운 배열 타입을 반환한다.
