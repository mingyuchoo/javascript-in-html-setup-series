// CommonJS (Pre-Native) Module 형태

const { sum } = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('isValidPwdRegex', () => {
  expect(true).toBe(true);
});
