---
title: '실행 컨텍스트'
date: 2023-09-14
description: '실행 컨텍스트와 호이스팅, 스코프를 함께 알아보자'
tags: [JavaScript]
thumbnail: /thumbnails/hello-world.jpg
---

나에게 실행 컨텍스트는 코드 실행할 때 필요한 환경 정보들을 저장해둔 것! 끝!이었다. 실행 컨텍스트를 자세히 보니 내가 알고 있던 다른 자바스크립트 개념들과 많이 연결되어 있었다. 그 중에서 호이스팅과 스코프를 함께 다루려고 한다📚

## 실행 컨텍스트(Execution Context)

> 실행 컨텍스트란 **실행할 코드에 제공할 환경 정보들을 모아놓은 객체**다. 실행 컨텍스트를 통해 **전체 코드의 환경과 순서를 보장**한다.

<br/>

## JavaScript 실행 컨텍스트 유형

전역 실행 컨텍스트, 함수 실행 컨텍스트, eval 실행 컨텍스트가 있다. eval은 자주 다뤄지지 않는 개념이라 이후부터는 `전역 실행 컨텍스트`와 `함수 실행 컨텍스트`를 살펴보겠다.

**1. 전역 실행 컨텍스트(Global Execution Context, GEC)**

자바스크립트 엔진은 스크립트 파일을 실행하기 전에 먼저 전역 코드를 평가하여 전역 실행 컨텍스트를 생성하고 실행 컨텍스트 스택에 푸시한다.

**2. 함수 실행 컨텍스트(Function Execution Context, FEC)**

함수를 호출할 때마다 생성된다.

**3. eval**

eval 함수 내부의 실행 컨텍스트

<br/>

## 실행 컨텍스트 스택 (Execution Context Stack)

### 스택(Stack)이란?

<p align="center"><img src="/javascript/stack.png"/></p>

스택은 출입구가 하나뿐인 깊은 우물 같은 데이터 구조이다. 비어있는 스택에 데이터 a, b, c, d를 저장했다면 꺼낼 때는 반대로 d, c, b, a의 순서로 꺼내지는 `후입선출(Last In First Out)` 방식이다.

<br/>

### 실행 컨텍스트 스택(Execution Context Stack)이란?

실행 컨텍스트가 생성되면 스택 자료구조로 관리되며 이를 **실행 컨텍스트 스택**이라고 부른다.

아래 이미지를 보면 더 쉽게 이해가 가능하다.

<p align="center"><img src="/javascript/execution-context.gif"/></p>

이미지의 설명은 다음과 같다.

- 전역 코드 평가 후, 실행 컨텍스트 스택에 전역 실행 컨텍스트가 푸시된다.
- 이후 `getEmployee` 함수가 호출되면 전역 코드의 실행은 일시 중단되고 코드의 제어권이 `getEmployee` 함수 내부로 이동한다. 자바스크립트 엔진이 함수 코드를 평가하고 함수 실행 컨텍스트를 생성하여 실행 컨텍스트 스택에 푸시한다.
- `getFullName` 함수가 호출되면 `getEmployee` 함수는 일시 중단되고 코드의 제어권이 `getFullName` 함수 내부로 이동한다. 자바스크립트 엔진은 함수 코드를 평가하고 함수 실행 컨텍스트를 생성하여 실행 컨텍스트 스택에 푸시한다.
- `getFullName` 함수가 종료되면 코드의 제어권은 다시 `getEmployee` 함수로 이동한다. 이때 자바스크립트 엔진은 `getFullName` 함수 실행 컨텍스트를 실행 컨텍스트 스택에서 팝하여 제거한다.
- `getEmployee` 함수가 종료되면 코드의 제어권은 다시 전역 코드로 이동한다. 이때 자바스크립트 엔진은 `getEmployee` 함수 실행 컨텍스트를 실행 컨텍스트 스택에서 팝하여 제거한다.
- 더 이상 실행할 전역 코드가 남아 있지 않으므로 전역 실행 컨텍스트도 실행 컨텍스트에서 팝되어 실행 컨텍스트 스택에는 아무것도 남아있지 않게 된다.

> 실행 컨텍스트 스택은 **코드의 실행 순서를 관리**한다. <br /> 실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행 중인 코드의 실행 컨텍스트다.

<br/>

## 실행 컨텍스트의 과정

실행 컨텍스트는 두 가지 과정을 거친다.

> 1. 생성 단계(Creation Phase)
> 2. 실행 단계(Execution Phase)

<br/>

### 생성 단계

생성 단계에서 실행 컨텍스트가 생성되며 여기에 담기는 정보는 다음과 같다.

1. `Variable Environment`: 현재 컨텍스트 내의 식별자들에 대한 정보와 외부 환경 정보를 담는다. 선언 시점의 Lexical Environment의 스냅샷으로 변경 사항은 반영되지 않는다.
2. `Lexical Environment`: 처음에는 Variable Environment와 같지만 변경 사항이 실시간으로 반영된다.
3. `this 바인딩`: this 식별자가 바라봐야 할 대상 객체

Variable Environment와 Lexical Environment의 내부는 `환경 레코드(Environment Record)`와 `외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)`로 구성되어 있다.

#### 환경 레코드(Environment Record)

스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소다. 환경 레코드는 소스코드의 타입에 따라 관리하는 내용에 차이가 있다.

#### 외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)

외부 렉시컬 환경에 대한 참조는 상위 스코프를 가리킨다. 이때 상위 스코프란 외부 렉시컬 환경, 즉 해당 실행 컨텍스트를 생성한 소스코드를 포함하는 상위 코드의 렉시컬 환경을 말한다. 외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.

🧤 이 많은 설명은 아래 간단한 이미지로 이해해도 좋을 것 같다. 출처는 하루님의 실행 컨텍스트 영상에서 가져왔다.
실행 컨텍스트에는 렉시컬 환경이 있는데 그 안에는 Record와 Outer로 구성되어 있다.

<p align="center"><img src="/javascript/record-outer.png"/></p>

<br/>

### 실행 단계

- 실행 단계에서 자바스크립트 엔진은 함수를 다시 스캔하여 실제 변수 값으로 업데이트 한 후 코드를 실행한다.
- 함수 호출에 따라 다른 실행 컨텍스트가 생성되어 실행 컨텍스트 스택에 푸시될 수 있다.

<br/>

## 환경 레코드와 호이스팅

> 생성 단계에서 변수 정보를 수집하는 과정이 끝나도 아직 코드 실행 전이다. 이처럼 자바스크립트 엔진은 식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다고 생각할 수 있고 이때 `호이스팅`의 개념이 등장한다. 호이스팅과 실행 컨텍스트의 생성 단계에서 `Lexical Environment`의 환경 레코드가 관련있다는 것을 알 수 있다.

### 호이스팅이란?

자바스크립트는 코드 실행 전에 변수 정보를 수집하는 과정을 거치기 때문에 코드가 실행되기 전임에도 이미 해당 환경에 속한 코드의 식별자 정보들을 저장하여 **마치 식별자들이 최상단으로 끌어올려진 것과 같은 현상**을 말한다.

### 변수 호이스팅

변수는 **(1)선언 단계, (2)초기화 단계, (3)할당 단계**를 거친다.

`선언 단계`: 메모리 공간을 확보하고 식별자와 연결

```javascript
{
  foo;
}
```

`초기화 단계`: 식별자에 암묵적으로 undefined 값 바인딩

```javascript
{
  foo: undefined;
}
```

`할당 단계`: 변수에 값을 할당하는 단계

```javascript
{
  foo: 1;
}
```

**var 키워드**

- 변수 선언과 초기화가 함께 이루어진다.
- 초기화를 할 때 `undefined`로 초기화된다.

📌 아래 코드의 답은 무엇일까?

```javascript
console.log(foo); // 1번 문제

foo = 123;

console.log(foo); // 2번 문제

var foo;
```

변수 호이스팅과 `var` 키워드의 초기화 단계를 고려해보자.

📌 답

```javascript
// 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
// 변수 foo는 undefined로 초기화된다(2. 초기화 단계)
console.log(foo); // 1번 답: undefined

// 변수에 값을 할당(3. 할당 단계)
foo = 123;

console.log(foo); // 2번 답: 123

// 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
var foo;
```

- 1번의 경우 `var` 키워드는 선언과 동시에 `undefined`로 초기화되므로 답은 `undefined`이다.
- 2번의 경우`123`을 `foo`에 할당을 했기 때문에 답은 `123`이다.

**let 키워드**

📌 아래 코드의 답은 무엇일까?

```javascript
console.log(foo); // 어떻게 출력될까요?
let foo;
```

📌 답

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

- `var` 키워드로 선언한 변수와 달리 `let` 키워드로 선언한 변수는 호이스팅이 발생하지만 호이스팅이 발생하지 않는 것처럼 동작한다.
- `let` 키워드로 선언한 변수는 선언 단계와 초기화 단계가 분리되어 진행된다. `let` 키워드는 **변수 선언문에서 초기화 단계가 실행된다.**

<br/>

**일시적 사각지대, TDZ(Temporal Dead Zone)**

**일시적 사각지대**(TDZ, Temporal Dead Zone)란 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 말한다.
`let` 또는 `const`로 선언했을 때, 선언 이전에 식별자를 참조할 수 없는 구역을 뜻한다.

```javascript
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

<p align="center"><img src="/javascript/tdz.png"/></p>

[이미지 출처](https://velog.io/@koseony/javaScript-%EB%BF%8C%EC%8B%9C%EA%B8%B0-var-let-const%EC%9D%98-%ED%8A%B9%EC%A7%95%EA%B3%BC-%EC%B0%A8%EC%9D%B4%EC%A0%90)

**const 키워드**

- `const` 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다. 선언만 할 수 없다는 뜻이다.
- `const` 키워드로 선언한 변수는 재할당이 금지된다.

선언만 하면 아래와 같은 에러가 발생한다.

```javascript
const foo; // SyntaxError: Missing initializer in const declaration
```

아래와 같이 반드시 선언과 동시에 초기화를 해야 한다.

```javascript
const foo = 1;
```

`const` 키워드로 선언한 변수는 `let` 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.

```javascript
{
  // 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

아래 이미지를 보면 `const`의 `TDZ`를 확인할 수 있다.

<p align="center"><img src="/javascript/tdz-const.png"/></p>

[이미지 출처](https://dmitripavlutin.com/javascript-variables-and-temporal-dead-zone/)

<br/>

### 함수 호이스팅

**함수 표현식**

자바스크립트에서는 변수에 함수를 담을 수 있다. 함수 표현식의 호이스팅은 **변수 호이스팅과 동일하게 동작**한다.

`var`

```javascript
study(); // Type Error!

var study = () => {
  // do study
};
```

변수 키워드 `var`를 사용했기 때문에 환경 레코드에 기록되어 있는 study의 값은 `undefined`이고 `undefined`라는 데이터 타입은 함수와 달리 호출될 수 없기 때문에 **Type Error**가 발생한다.

```javascript
study(); // Reference Error!

const study = () => {
  // do study
};
```

같은 함수를 `const` 키워드로 선언하면 아직 환경 레코드에 기록된 값이 없어 **Reference Error**가 발생한다.

**함수 선언문**

함수 선언문은 선언과 동시에 함수가 생성되어 **선언 전에도 함수를 사용할 수 있다.**

```javascript
study(); // 함수가 에러없이 실행된다.

function study() {
  // do study
}
```

자바스크립트 엔진이 `study` 함수 선언과 동시에 완성된 함수 객체를 생성해서 환경 레코드에 기록한다. 따라서 선언문 이전에 호출을 해도 에러없이 작동한다.

## 외부 렉시컬 환경에 대한 참조와 스코프, 스코프 체인

### 스코프, 스코프 체인이란?

- 스코프란 **식별자에 대한 유효범위**이다.
- 스코프 체인이란 **'식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것**이다.
- 그리고 스코프 체인을 가능하게 하는 것은 `Lexical Environment`의 두 번째 수집 자료인 `Outer Environment Reference`이다.

> **함수 레벨 스코프**: 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다. `var` 키워드로 선언된 것은 함수 레벨 스코프를 가진다. <br/> **블록 레벨 스코프**: 함수 몸체만이 아니라 모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프로 인정된다. `let`, `const` 키워드로 선언된 것은 블록 레벨 스코프를 가진다.

<br/>

### 스코프 체인의 특징

✔️ `Outer Environment Reference`는 현재 호출된 함수가 선언될 당시의 `Lexical Environment`를 참조한다.

다음 코드의 실행 결과를 예측해보자.

```javascript
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

위 예제의 실행 결과는 둘다 `bar` 함수의 상위 스코프가 무엇인지에 따라 결정되며, 두 가지 패턴을 예측할 수 있다.

1. **함수를 어디에서 호출**했는지에 따라 함수의 상위 스코프를 결정한다. (동적 스코프 방식)
2. **함수를 어디에서 정의**했는지에 따라 함수의 상위 스코프를 결정한다. (렉시컬 스코프 또는 정적 스코프 방식)

➡️ 자바스크립트는 **렉시컬 스코프**를 따르므로 함수를 어디에서 호출했는지가 아니라 **함수를 어디에서 정의했는지에 따라 상위 스코프를 결정**한다. 함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다. 즉, 함수의 상위 스코프는 언제나 자신이 정의된 스코프다.

따라서 위 예제를 실행하면 전역 변수 `x`의 값인 `1`을 두 번 출력한다.

✔️ 여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 **스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근이 가능**하게 된다.

코드 상에서 어떤 변수에 접근하려고 하면 현재 컨텍스트의 `Lexical Environment`를 탐색하여 발견이 되면 그 값을 반환하고 발견하지 못할 경우 다시 `Outer Environment Reference`에 담긴 `Lexical Environment`를 탐색하는 과정을 거친다. 전역 컨텍스트의 `Lexical Environment`까지 탐색해도 해당 변수를 찾지 못하면 `undefined`를 반환한다.

## 참고

- 📚 <코어 자바스크립트>, 정재남
- 📚 <모던 자바스크립트 딥다이브>, 이웅모
- 🔗 https://www.youtube.com/watch?v=EWfujNzSUmw
- 🔗 https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/execution-context.md
- 🔗 https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/hoisting.md
- 🔗 https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c
