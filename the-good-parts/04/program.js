// 02 | 함수 리터럴
var add = function (a, b) {
  return a + b;
};



// 03 | 호출
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};
myObject.increment();
document.writeln(myObject.value); // 1
myObject.increment(2);
document.writeln(myObject.value); // 3


var sum = add(3, 4);  // 합은 7

// myObject에 double 메소드를 추가
myObject.double = function() {
  var that = this;
  var helper = function() {
    this.value = add(that.value, that.value);
  };
  helper();
};
myObject.double();
document.writeln(myObject.getValue()); // 6


var Quo = function(string) {
  this.status = string;
};
Quo.prototype.get_status = function() {
  return this.status;
};


var myQuo = new Quo("confused");
document.writeln(myQuo.get_status()); // confused


var arra = [3, 4];
var sum = add.apply(null, array); // sum is 7

var statusObject = {
  status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject); // status is 'A-OK'


// 04 | 인수 배열(arguments)
var sum = function () {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};
document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108


// 06 | 예외
var add = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}


var try_it = function() {
  try {
    add("seven");
  } catch (e) {
    document.writeln(e.name + ': ' + e.message);
  }
}
try_it();


// 07 | 기본 타입에 기능 추가
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

Number.method('integer', function(){
  return Math[this < 0 ? 'ceiling' : 'floor'] (this);
});
document.writeln((-10 / 3).integer()); // -3


String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + " neat ".trim() + '"');


Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

// 08 | 재귀적 호출
var hanoi = function(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
    hanoi(disc - 1, aux, src, dst);
  }
};
hanoi(3, 'Src', 'Aux', 'Dst');


var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while(node) {
    walk(node, func);
    node = node.nextSibling;
  }
};


var getElementsByAttribute = function(att, value) {
  var results = [];
  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });
  return results;
};


var factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * i);
};
document.writeln(factorial(4)); // 24


// 09 | 유효범위(Scope)
var foo = function() {
  var a = 3, b = 5;
  var bar = function() {
    var b = 7, c = 11;
    a += b + c;
  };
  bar ();
};


// 10 | 클로저(closure)
var myObject = function() {
  var value = 0;
  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {
      return value;
    }
  };
}();


var quo = function(status) {
  return {
    get_status: function() {
      return status;
    }
  };
};
var myQuo = quo("amazed");
document.writeln(myQuo.get_status());


var fade = function(node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};
fade(document.body);



var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(e) {
      alert(i);
    };
  }
};


var add_the_handlers = function(nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(i) {
      return function(e) {
        alert(i);
      };
    }(i);
  }
};


// 11 | 콜백
request = prepare_the_request();
response = send_request_synchronously(request);
display(response);


request = prepare_the_request();
send_request_synchronously(request, function(response) {
  display(response);
});


// 12 | 모듈
String.method('deentityify', function() {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return function() {
    return this.replace(/&([^&;]+);/g,
      function(a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());
document.writeln('&lt;&quot;&gt;'.deentityify()); // <">

var serial_maker = function() {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym(); // unique는 "Q1000"

// 13 | 연속 호출(Cascade)
getElement('myBoxDiv').
  move(350, 150).
  width(100).
  height(100).
  color('red').
  border('10px outset').
  padding('4px').
  appendText("Please stand by").
  on('mousedown', function(m){
    this.startDrag(m, this.getNinth(m));
  }).
  on('mousemove', 'drag').
  on('mouseup', 'stopDrag').
  later(2000, function(){
    this.color('yellow').
    setHTML("What hath God wraught?").
    slide(400, 40, 200, 200);
  }).
  tip('This box is resizeable');

// 14 | 커링(Curry)
var add1 = add.curry(1);
document.writeln(add1(6)); // 7

Function.method('curry', function() {
  var args = arguments, that = this;
  return function() {
    return that.apply(null, args.concat(arguments));
  };
});


Function.method('curry', function(){
  var slice = Array.prototype.slice,
  args = slice.apply(arguments),
  that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});



// 15 | 메모이제이션(memoization)
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i <= 10; i += 1) {
  document.writeln('// ' + i + ': ' + fibonacci(i));
}

var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();


var memoizer = function(memo, fundamental) {
  var shell = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

var fibonacci = memoizer([0, 1], function(shell, n) {
  return shell(n - 1) + shell(n - 2);
});


var factorial = memoizer([1, 1], function(shell, n){
  return n * shell(n - 1);
});
