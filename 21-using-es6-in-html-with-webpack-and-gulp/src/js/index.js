// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 Web Browser에서 인식 가능

/* sum */
export const sum = (a, b) => {
  return a + b;
};

/* msg */
export const msg = (event) => {
  const state ='Hello, JavaScript!';
  alert(state);
  return state;
};

/* isValidPwdRegex */
export const isValidPwdRegex = (pwd) => {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
};

/* greeting */
export const greeting = () => {
  const state = 'Hello, Parcel!';
  return state;
};

/* square */
export const square = (x) => {
  return x * x;
};

/* array */
export const makeArray = () => {
  let fruits = ['Apple', 'Banana'];
  return fruits.length;
};