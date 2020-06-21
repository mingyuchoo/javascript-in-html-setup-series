// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import * as main from './main';

describe('main.js', () => {
  it('sum()', () => {
    expect(main.sum(1, 2)).toBe(3);
  });

  it('greeting()', () => {
    expect(main.greeting()).toBe('Hello, Parcel!');
  });

  it('square()', () => {
    expect(main.square(3)).toBe(9);
  });

  it('makeArray()', () => {
    expect(main.makeArray()).toBe(2);
  });
});
