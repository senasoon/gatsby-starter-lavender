---
title: '[트러블 슈팅] React Native FlatList+TypeScript+styled-components renderItem Type unknown 이슈'
date: 2023-09-05
description: 'React Native FlatList와 styled-components를 함께 사용할 땐 styled-components FlatList에 data 타입을 선언해줘야 한다.'
tags: [React Native, Trouble Shooting, styled-components]
thumbnail: /thumbnails/hello-world.jpg
---

## 문제

`Animated.FlatList`와 `TypeScript`, `styled-components` 환경에서 renderItem에 타입 에러가 발생했다.

```bash
Type '({ item, index }: ListRenderItemInfo<string>) => React.JSX.Element' is not assignable to type 'ListRenderItem<unknown>'.ts(2769)
```

## 해결

`FlatList`와 `styled-components`를 함께 쓸 땐 `styled-components FlatList`에 data 타입을 선언해줘야 한다.

기존 코드는 아래와 같다.

```typescript
return (
  <StFlatList
    data={items}
    renderItem={renderItem} // error!
    itemHeight={itemHeight}
  />
);

const StFlatList = styled(Animated.FlatList)<Pick<PickerProps, 'itemHeight'>>`
  padding-top: ${(props) => props.itemHeight}px;
`;
```

찾아본 바로는 3가지 방법이 있다. 예시 코드는 내가 사용한 코드 말고 간단한 코드를 가져왔다.

### 1. styled(FlatList<데이터 타입>)

```typescript
export const UsersList = styled(FlatList<IUser>)`
  padding: 20px;
`;
```

참고: https://github.com/emotion-js/emotion/issues/2888#issuecomment-1247333222

### 2. styled(FlatList as typeof FlatList<데이터 타입>)

```typescript
export const UsersList = styled(FlatList as typeof FlatList<IUser>)`
  padding: 20px;
`;
```

참고:https://stackoverflow.com/questions/64460114/rn-flatlist-with-typescript-and-styled-components

### 3. styled(FlatList as new () => FlatList<데이터 타입>)

```typescript
export const UsersList = styled(FlatList as new () => FlatList<IUser>)`
  padding: 20px;
`;
```

찾아보면 많이 나오는 방법인데 나의 경우에는 data에 에러가 떠서 이 방법을 사용하진 않았다.

참고1: https://everaldev.medium.com/the-right-way-to-use-flatlist-typescript-styled-components-in-react-native-458e9994436

참고2: https://positiveko-til.vercel.app/til/react-native/flatlist-render-item-type.html

참고3: https://github.com/styled-components/styled-components/issues/1803#issuecomment-407332173

## 결과

가장 간단한 첫 번째 방법으로 문제를 해결했다.

```typescript
const StFlatList = styled(Animated.FlatList<string>)<
  Pick<PickerProps, 'itemHeight'>
>`
  padding-top: ${(props) => props.itemHeight}px;
`;
```
