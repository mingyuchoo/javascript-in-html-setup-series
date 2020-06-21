// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import { should } from 'chai';
should();

import * as main from './main';

describe('main.js', () => {
  it('sum()', () => {
    const result = main.sum(1, 2);
    result.should.equals(3);
  });

  it('greeting()', () => {
    main.greeting().should.equal('Hello, Parcel!');
  });

  it('square()', () => {
    main.square(3).should.equal(9);
  });

  it('makeArray()', () => {
    main.makeArray().should.equal(2);
  });
});
