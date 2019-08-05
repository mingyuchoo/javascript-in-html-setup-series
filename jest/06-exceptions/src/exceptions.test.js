function compileAndroidCode() {
  throw new ConfigError('You are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('You are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
