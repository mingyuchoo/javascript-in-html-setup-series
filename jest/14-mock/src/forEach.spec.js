const forEach = (items, callback) => {
  for (let index=0; index < items.length; index++) {
    callback(items[index]);
  }
}

describe('forEach test', () => {
  test('test 1', () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[0][0]).toBe(0);
    expect(mockCallback.mock.calls[1][0]).toBe(1);
    expect(mockCallback.mock.results[0].value).toBe(42);
  });

  test('test 2', () => {
    const myMock = jest.fn();
    const a = new myMock();
    const b = {};
    const bound = myMock.bind(b);
    bound();

    console.log(myMock.mock.instances);
  });

  test('test 3', () => {
    const myMock = jest.fn();
    console.log(myMock());
    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('x')
      .mockReturnValue(true);

      console.log(myMock(), myMock(), myMock(), myMock());
      // > 10, x, true, true
  });

  test('test 4', () => {
    const filterTestFn = jest.fn();
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);
    const result = [11, 12].filter(filterTestFn);
    console.log(result);
    // > [11]
    console.log(filterTestFn.mock.calls);
    // > [[11], [12]]
  })
});
