---
title: '프로토타입 1'
date: 2023-10-10
description: '자바스크립트 프로토타입에 대해 알아본 첫 번째 글입니다.'
tags: [JavaScript]
thumbnail: /thumbnails/hello-world.jpg
---

## 자바스크립트 특징

자바스크립트는 **명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어**다. 자바스크립트가 객체지향 언어가 아니라는 오해를 받기도 하지만 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향 언어다.

**ES6에서 클래스**가 도입되었지만 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아니다. 사실 자바스크립트의 클래스는 함수이며, 기존 프로토타입 기반 패턴의 문법적 설탕이라고 볼 수 있지만 클래스와 생성자 함수가 정확히 동일하게 동작하진 않기 때문에 **새로운 객체 생성 매커니즘**으로 보는 것이 더 합당하다.

> 문법적 설탕(syntactic sugar)이란 내용을 더 쉽게 읽거나 표현할 수 있도록 설계된 프로그래밍 언어 내의 구문이다.

## 프로토타입

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 **연결**되어 있다. 그리고 이것은 마치 **객체 지향의 상속 개념처럼** 부모 객체의 프로퍼티 또는 메소드를 참조할 수 있게 한다. 이러한 부모 객체를 Prototype(프로토타입)이라 한다. 프로토타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

- 자바스크립트의 모든 객체는 `[[Prototype]]`이라는 인터널 슬롯(internal slot)을 가진다.
- `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.
- `[[Prototype]]`의 값이 `null`인 객체는 프로토타입이 없다.

너무 이론이 길어져서 한번 직접 콘솔에 객체를 찍어봤다.

<p align="center"><img src="/javascript/prototype-console-dir.png"/></p>

`[[Prototype]]`의 값은 Prototype 객체이며 `__proto__`로 접근할 수 있다.
`student` 객체는 `__proto__` 프로퍼티로 자신의 부모 객체(프로토타입 객체)인 `Object.prototype`을 가리킨다.

```javascript
console.log(student.__proto__ === Object.prototype); // true
```

📌 `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장되지 않는 이유

1. `__proto__`를 통한 접근은 비표준이었지만 브라우저간 호환성을 위해 ES6에서 표준이 되었다. 하지만 **권장되는 방식이 아니며**, 브라우저가 아닌 다른 환경에서는 **얼마든지 이 방식이 지원되지 않을 가능성이 있다.**
2. **모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니다.** `Object.prototype`을 상속받지 않는 객체를 생성할 수도 있기 때문이다.

✅ `__proto__` 접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 `Object.getPrototypeOf` 메서드를 사용하고 프로토타입을 교체하고 싶은 경우에는 `Object.setPrototypeOf` 메서드를 사용할 것을 권장한다.

## [[Prototype]] vs prototype 프로퍼티

- 모든 객체는 자신의 프로토타입 객체를 가리키는 `[[Prototype]]` 인터널 슬롯(internal slot)을 갖고 이는 상속을 위해 사용된다.
- 함수도 객체이므로 `[[Prototype]]` 인터널 슬롯을 갖는다.
- **함수 객체는 일반 객체와는 달리 `prototype` 프로퍼티도 소유하게 된다.** 이때, `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

  ➡️ 따라서 생성자 함수로서 호출할 수 없는 함수, 즉 `non-constructor`인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 `prototype` 프로퍼티를 소유하지 않으며 프로토 타입도 생성하지 않는다.

> 함수 객체는 `callable`이면서 `constructor`이거나 `callable`이면서 `non-constructor`다. 즉, 모든 함수 객체는 호출할 수 있지만 모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다. `non-constructor`는 생성자 함수로서 호출할 수 없으며, 대표적으로는 화살표 함수와 ES6 메서드 축약 표현이 있다.

✅ 모든 객체가 가지고 있는 (엄밀히 말하면 `Object.prototype`으로부터 상속받은) `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가리킨다. 하지만 `__proto__` 접근자 프로퍼티의 경우엔 모든 객체가 소유하고 모든 객체가 사용할 수 있는 반면, `prototype` 프로퍼티의 경우 `constructor`가 소유하고 생성자 함수가 사용할 수 있다.

## constructor 프로퍼티

- 생성자 함수의 프로퍼티인 `prototype` 객체 내부와 인스턴스의 `__proto__` 객체 내부에는 `constructor`라는 프로퍼티가 있다.
- `constructor` 프로퍼티는 원래의 생성자 함수(자기 자신)를 참조한다.

## 참고

- 📚 <코어 자바스크립트>, 정재남
- 📚 <모던 자바스크립트 딥다이브>, 이웅모
- 🔗 https://poiemaweb.com/js-prototype
- 🔗 https://en.wikipedia.org/wiki/Syntactic_sugar
- 🔗 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
