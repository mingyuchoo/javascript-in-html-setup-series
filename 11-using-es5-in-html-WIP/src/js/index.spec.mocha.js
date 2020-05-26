// CommonJS (Pre-Native) Module 형태

require('chai/register-should');

const { sum } = require('./index');

describe('Given a = 1, b = 2', () => {
  it('When call sum(a, b)', () => {
    const result = sum(1, 2);
    result.should.equals(3);
  });
});
