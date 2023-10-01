---
title: '이벤트 루프'
date: 2023-10-01
description: '이벤트 루프와 비동기는 무엇인가'
tags: [JavaScript]
thumbnail: /thumbnails/hello-world.jpg
---

## 자바스크립트의 특징

자바스크립트는 **싱글 스레드** 프로그래밍 언어다. 이 말은 **하나의 콜 스택**을 가지고 있다는 말이고 **한번에 하나의 일을 할 수 있다**는 뜻이다.

## blocking

자바스크립트는 한번에 하나의 일만 할 수 있기 때문에 시간이 걸리는 일을 실행할 경우 **blocking**(블로킹, 작업중단)이 발생한다.

`setTimeout` 함수와 유사하게 일정 시간 경과 후 콜백 함수를 호출하는 sleep 함수를 봐보자.

```javascript
function sleep(func, delay) {
  // Date.now()는 현재 시간을 숫자(ms)로 반환한다.
  const delayUntil = Date.now() + delay;

  while (Date.now() < delayUntil);

  func();
}

function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

sleep(foo, 3 * 1000);

bar();
```

stackblitz 사이트에서 직접 실행해봤다.

<p align="center"><img src="/javascript/synchronous.gif"/></p>

<p align="center"><img src="/javascript/synchronous.png"/></p>

`sleep` 함수는 3초 후에 `foo` 함수를 호출하고 `bar` 함수는 `sleep` 함수의 실행이 종료된 이후 호출되므로 3초 이상(`foo` 함수 실행 시간 + 3초) 호출되지 못하고 블로킹(작업 중단)된다.
이와 같이 **현재 실행 중인 태스크가 종료할 때까지 다음 실행될 태스크가 대기하는 방식을 동기 처리**라고 한다.

동기 처리 방식은 태스크를 순서대로 하나씩 처리하므로 **실행 순서가 보장**된다는 장점이 있지만, **이전 태스크가 종료할 때까지 이후 태스크들이 블로킹**되는 단점이 있다.

오래 시간이 걸리는 태스크를 실행한 후에 사용자가 다른 동작을 실행하려고 한다면 어떻게 되는지 봐보자.

<p align="center"><img src="/javascript/synchronous-example.gif"/></p>

`Run` 버튼을 누르면 그 이후엔 오랜 시간이 걸리기 때문에 다른 버튼을 눌러도 브라우저가 멈춰있다. 그리고 `Run` 버튼에서 클릭 관련 태스크가 끝난 후에야 `Alert` 버튼 관련 태스크들이 실행된다. 이처럼 브라우저가 다른 일들을 할 수 없고 멈춘 상태가 발생한다. 이는 사용자 경험을 저해한다.

**비동기 처리 방식**인 `setTimeout`으로 `sleep` 예제를 수정해보자.

```javascript
function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

setTimeout(foo, 3 * 1000);

bar();
```

마찬가지로 실행해봤다.

<p align="center"><img src="/javascript/asynchronous.gif"/></p>

<p align="center"><img src="/javascript/asynchronous.png"/></p>

`setTimeout` 함수는 `sleep` 함수와 비슷하게 일정 시간이 경과한 이후 콜백 함수를 호출하지만 `setTimeout` 함수 이후 태스크인 `bar` 함수를 블로킹하지 않고 곧바로 실행한다.

이처럼 **현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식을 비동기 처리**라고 한다. 비동기 처리 방식은 **블로킹이 발생하지 않는다**는 장점이 있지만 태스크의 **실행 순서가 보장되지 않는다**는 단점이 있다. 자바스크립트는 싱글 스레드로 하나의 콜 스택만 가지고 있고 한번에 하나의 일만 하는데 어떻게 비동기 처리가 가능한 것일까?

## 이벤트 루프

자바스크립트는 한번에 하나의 일을 할 수 있는건 사실이다. 비동기 처리 방식이 가능한 이유는 자바스크립트를 이용하는 환경(브라우저, Node.js)에서는 여러 개의 스레드를 활용하기 때문이다. HTML 요소가 애니메이션 효과를 통해 움직이면서 이벤트를 처리하기도 하고 HTTP 요청을 통해 서버로부터 데이터를 가지고 오면서 렌더링하기도 한다. 이러한 환경을 자바스크립트 엔진과 상호 연동하기 위해 사용하는 것이 **이벤트 루프**이며 자바스크립트의 **동시성**을 지원한다고 한다.

<p align="center"><img src="/javascript/event-loop.gif"/></p>

이벤트 루프는 위 사진에 있는 시스템에서 아주 단순한 일을 하는 작은 파트이다. 이벤트 루프의 역할은 **콜 스택과 태스크 큐를 주시**하는 것이다. (위 그림에서는 콜백 큐라고 적힌 부분이 태스크 큐이다.) 스택이 비어있으면 큐의 첫 번째 콜백을 스택에 쌓아 효과적으로 실행할 수 있게 해준다.

아래 코드의 실행 결과를 예측해보자.

```javascript
console.log('Hi');

setTimeout(function cb() {
  console.log('there');
}, 0);

console.log('Hello');
```

결과는 아래와 같다.

```bash
Hi
Hello
there
```

- `console.log('Hi');`가 콜스택에 쌓이고 실행돼서 "Hi"를 출력한다.
- `setTimeout`이 실행되면 Web API는 바로 종료하고 큐에 콜백을 집어 넣는다.
- 이 사이에 `console.log('Hello')`가 콜스택에 쌓이고 실행돼서 "Hello"를 출력한다.
- 스택이 비어져있기 때문에 `setTimeout`의 콜백함수를 콜스택에 쌓고 실행시켜 "there"를 출력한다.

<br/>

✔️ 이것이 `setTimeout 0`이라는 코드 실행이 스택이 비워질 때까지 지연되는 이유이다.

✔️ 때문에 `setTimeout`이 실제로 정해진 시간과는 다르게 작동될 수 있으며, 다만 딜레이되는 최소의 시간만을 지정할 수 있다는 것을 알 수 있다.

## 태스크 큐(Task queue)와 마이크로 태스크 큐(Micro task queue)

- 태스크 큐: `setTimeout()`, `setInterval()`, UI 렌더링, `requestAnimationFrame()`
- 마이크로 태스크 큐: `Promise`, `MutationObserver`

✔️ 마이크로 태스크 큐의 콜백함수가 태스크 큐보다 우선순위를 가지고 있다.

✔️ UI 렌더링이 태스크 큐에 속하기 때문에 마이크로 태스크 큐의 태스크가 많으면 렌더링이 지연될 수 있다.

## 참고

- 📚 <모던 자바스크립트 딥다이브>, 이웅모
- 🔗 https://youtu.be/8aGhZQkoFbQ?si=VhJnBagQejYj3wxz
- 🔗 https://yceffort.kr/2019/09/06/javascript-event-loop
- 🔗 https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/event-loop.md
