// CommonJS (Pre-Native) Module 형태
// Node.js에서 사용하는 형태이고, Web Browser에서는 인식 못함

/* sum */
function sum(a, b) {
  return a + b;
}

/* msg */
function msg(event) {
  alert('Good morning, JavaScript!');
}

/* isValidPwdRegex */
function isValidPwdRegex(pwd) {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
}

module.exports.sum = sum;
module.exports.msg = msg;
module.exports.isValidPwdRegex = isValidPwdRegex;
