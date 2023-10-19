---
title: '[Algorithm] 선택 정렬(Selection Sort)'
date: 2023-10-20
description: '선택 정렬 알고리즘에 대해 알아보기'
tags: [Algorithm]
thumbnail: /thumbnails/hello-world.jpg
---

## 선택 정렬 알고리즘

- 길이 n의 배열이 주어졌을 때 0부터 n-1까지 모든 index `i`에 대해 `i`번째 요소부터 n-1번째 요소 중 가장 작은 값을 구해 `i`에 배치하는 개념이다.
- 어떤 위치에 놓을 값을 `선택`하기 때문에 `선택 정렬(Selection Sort)`이라고 부른다.
- 성능이 좋지 않아도 코드가 간단하고 작은 수에서 효과적이다.

> 📌 **예시** <br/> [**5,1,4,3,2**] 배열을 처음부터 훑어 가장 작은 1을 앞으로 보낸다. <br/> [1,**5,4,3,2**] 5부터 2까지 훑어 가장 작은 2를 앞으로 보낸다. <br/> [1,2,**4,3,5**] 4부터 5까지 훑어 가장 작은 3을 앞으로 보낸다. <br/> [1,2,3,**4,5**] 4부터 5까지 훝어 가장 작은 수를 앞으로 가게 한다.

## 구현

```javascript
function selectionSort(array) {
  for (i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    let temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }
  return array;
}
selectionSort([5, 1, 4, 7, 2, 6, 8, 3]); // [1, 2, 3, 4, 5, 6, 7, 8]
```

- 두 개의 반복문이 필요하다.
- **내부 반복문**에서는 현재 index부터 마지막 index 중 **최소값을 찾는다.**
- **외부 반복문**에서는 최소값 index 값과 현재 index 값을 **상호 교대(swap)한다.**

## 복잡도

- 주어진 배열에서 값들의 위치만 바꾸기 때문에 `O(1)`의 공간 복잡도를 가진다.
- 외부 반복문과 내부 반복문이 사용되기 때문에 `O(N^2)`의 시간 복잡도를 가진다.

## 참고

- 🔗 https://www.algodale.com/algorithms/selection-sort/
- 🔗 https://www.zerocho.com/category/Algorithm/post/57f728c85141fc5fe4f4ca89
