# 00 Template

이 프로젝트는 간단한 HTML5를 배울 수 있는 소스입니다.
HTML5 형태의 html 구조, ES6를 JavaScript파일 변환, SASS를 이용한 CSS3 변환을 할 수 있습니다.
추가로, 기존 ES5 형태로 작성할 때를 위해 Webpack으로 변환하기 전 원본 파일을 가져다 사용할 수 있게 public/js 아래에 복사하도록 했습니다.

## 실행 방법

우선, 터미널 3 개 엽니다.

- 터미널 하나에 `yarn sass` 실행합니다.
- 터미널 둘에 `yarn webpack` 실행합니다.
- 터미널 셋에 `yarn live`실행합니다.

## 동작 원리

- `yarn sass`를 실행했으니 src/scss/style.scss 를 직접 수정하면 바로 public/css/style.css 파일이 실시간으로 컴파일됩니다.
- `yarn webpack`을 실행했으니 src/js/index.js 를 직접 수정하면 바로 public/js/bundle.js 이 실시간으로 컴파일됩니다.
  - 추가로, src/js/index.js 를 ES5 형태로 작성할 경우 그대로 웹브라우저에 가져다 사용할 수 있기 때문에, src/js/index.js를 public/js/ 아래로 복사하도록 했습니다.
- `yarn live`는 public/index, public/html/* 파일이 변경되면 실시간으로 리로딩합니다.
