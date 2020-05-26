import { should } from 'chai';
should();

import { sum } from './index';

describe('Given a = 1, b = 2', () => {
  it('When call sum(a, b)', () => {
    const result = sum(1, 2);
    result.should.equals(3);
  });
});
