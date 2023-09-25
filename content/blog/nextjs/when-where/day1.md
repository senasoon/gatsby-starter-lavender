---
title: '[Next.js] 프로젝트 1일차'
date: 2023-09-25
description: '프로젝트 진행 기록입니다.'
tags: [Next.js]
thumbnail: /thumbnails/hello-world.jpg
---

## 기술 스택 선정

`Next.js`
클라이언트와 서버를 하나로 개발할 수 있어 간편하며 다양한 기능들을 제공

`TypeScript`
에러 사전 방지와 가독성, 개발 생산성 향상

`tailwindcss`
디자인 시스템 설정과 다크 모드 구현 간편, 자동 완성과 미리 세팅된 유틸리티 클래스 활용 방식으로 빠른 개발 가능

<br/>

## tailwindcss에 figma 디자인 시스템 추가하기

<p align="center"><img src="/nextjs/day1-figma-tailwindcss.png"/></p>

기존 figma에서 설정한 `Local Styles`들을 `tailwind.config.ts`에 추가하기 위해 figma plugins 중 `Figma Tailwindcss`를 설치하여 사용했다.
plugin에 대해 자세히 보려면 아래 링크를 참고하자.

🔗 https://www.figma.com/community/plugin/785619431629077634/figma-tailwindcss

<br/>

## tailwindcss에 custom style 추가하기

tailwindcss에 custom style을 추가하는 방법은 크게 두 가지다.

> 1. css 파일에 추가
> 2. `tailwind.config.ts` 파일에 `plugins` 추가

<br/>

1. css 파일에 추가하는 방법 예시

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

2. `tailwind.config.ts` 파일에 `plugins` 추가하는 방법 예시

```javascript
import plugin from 'tailwindcss/plugin';

module.exports = {
  // ...
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.2xl'),
        },
        h2: {
          fontSize: theme('fontSize.xl'),
        },
      });
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        },
      });
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
      });
    }),
  ],
};
```

자세한 내용은 아래 링크를 참고하자.

🔗 https://tailwindcss.com/docs/adding-custom-styles#writing-plugins

**✔️ 나는 vscode 자동 완성 기능을 사용하기 위해 `tailwind.config.ts`에 `plugins`를 추가하는 방법을 선택했다.**
