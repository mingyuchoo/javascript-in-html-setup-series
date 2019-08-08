// foo.spec.js
jest.mock('./foo');
const foo = require('./foo');

describe('foo test', () => {
  test('test 1', () => {

    foo.mockImplementation(()=>42);
    foo();
    // > 42
  });
});
