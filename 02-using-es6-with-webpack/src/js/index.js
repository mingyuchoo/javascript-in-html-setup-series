/* sum */
export const sum = (a, b) => {
  return a + b;
};

/* msg */
export const msg = (event) => {
  alert('Hello, JavaScript!');
};

/* isValidPwdRegex */
export const isValidPwdRegex = (pwd) => {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
};
