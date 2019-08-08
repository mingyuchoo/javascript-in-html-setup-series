const myMockFn = jest.fn(cb => cb(null, true));


describe('mockFn test', () => {
  test('test 1', () => {
    myMockFn((err, val) => console.log(val));
    // > true
  });
});
