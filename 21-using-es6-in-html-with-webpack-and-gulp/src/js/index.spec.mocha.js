// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import { should } from 'chai';
should();

import * as index from './index';

describe('index.js', () => {
  it('sum()', () => {
    const result = index.sum(1, 2);
    result.should.equals(3);
  });

  it('msg()', () => {
    index.msg().should.equal('Hello, JavaScript!');
  });

  it('isValidPwdRegex()', () => {
    index.isValidPwdRegex('qwe123!!').should.equal(true);
  });

  it('greeting()', () => {
    index.greeting().should.equal('Hello, Parcel!');
  });

  it('square()', () => {
    index.square(3).should.equal(9);
  });

  it('makeArray()', () => {
    index.makeArray().should.equal(2);
  });
});
