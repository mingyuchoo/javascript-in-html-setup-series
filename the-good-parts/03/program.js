// 01 | 객체 리터럴
var empty_object = {};
var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};


// 02 | 속성값 읽기
stooge["first-name"] // "Joe"
flight.departure.IATA // "SYD"

stooge["middle-name"] // undefined
flight.status // undefined
stooge["FIRST-NAME"] // undefined

var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

flight.equipment // undefined
flight.equipment.model // throw "TypeError"
flight.equipment && flight.equipment.model // undefined

// 03 | 속성값의 갱신
stooge['first-name'] = 'Jerome';
stooge['middle-name'] = 'Lester';
stoogy.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};
flight.status = 'overdue';

// 04 | 참조
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
var a = {}, b = {}, = {}; // a, b, c는 각각 다른 빈 객체를 참조
a = b = c = {}; // a, b, c는 모두 같은 빈 객체를 참조

// 05 | 프로토타입(Prototype)
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';


stooge.profession = 'actor';
another_stooge.profession // 'actor'


// 06 | 리플렉션(reflection)
typeof flight.number // 'number'
typeof flight.status // 'string'
typeof flight.arrival // 'object'
typeof flight.manifest // 'undefined'

typeof flight.toString // 'function'
typeof flight.constructor // 'function'

flight.hasOwnProperty('number') //true
flight.hasOwnProperty('constructor') // false

// 07 | 열거(Enumeration)
var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') {
    document.writeln(name + ': ' + another_stooge[name]);
  }
}

var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
for (i = 0; i < properties.length; i += 1) {
  document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}

// 08 | 삭제
another_stooge.nickname // 'Moe'
delete another_stooge.nickname;
another_stooge.nickname // 'Curly'

// 09 | 최소한의 전역변수 사용
var MYAPP = {};
MYAPP.stooge = {
  "first-name": "Joe",
  "last-name": "Howard"
};

MYAPP.flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};
