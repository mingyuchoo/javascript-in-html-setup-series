/* sum */
function sum(a, b) {
  return a + b;
}
module.exports.sum = sum;

/* msg */
function msg(event) {
  alert('Hello, JavaScript!');
}
module.exports.msg = msg;

/* isValidPwdRegex */
function isValidPwdRegex(pwd) {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
}
module.exports.isValidPwdRegex = isValidPwdRegex;
