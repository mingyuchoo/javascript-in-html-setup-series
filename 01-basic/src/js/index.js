const sum = (a, b) => {
  return a + b;
};

const hello = (name) => {
  document.getElementById('output').innerHTML = 'Hello, ' + name;
};

const msg = () => {
  alert('Hello, JavaScript');
};

function isValidPwdRegex(pwd) {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-~!@$%^&*=_+,.;':"\[\]{}\\]).{8,20}$/;
  return regex.test(pwd);
}
