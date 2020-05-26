/* sum */
function sum(a, b) {
  return a + b;
}

/* msg */
function msg(event) {
  alert('Hello, JavaScript!');
}

/* isValidPwdRegex */
function isValidPwdRegex(pwd) {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
}

module.exports.sum = sum;
module.exports.msg = msg;
module.exports.isValidPwdRegex = isValidPwdRegex;
