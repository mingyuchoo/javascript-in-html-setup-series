// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import { should } from 'chai';
should();

import { sum } from './index';

describe('Given a = 1, b = 2', () => {
  it('When call sum(a, b)', () => {
    const result = sum(1, 2);
    result.should.equals(3);
  });
});
