# Declarations

- var
- let
- const

# primitive (primitive value, primitive data type)

is not an object and has no methods. All primitives are immutable (cannot be changed.)

- String: '' or ""
- Number: 64bit floating point
- Boolean: true, false
- null: null
- undefined: undefined
- Symbol (new in ECMAScript 2015)

## Primitive wrapper objects

Except for null and undefined, all primitive values have object equivalents that wrap around the primitive values.

- String for the string primitive.
- Number for the number primitive.
- Boolean for the Boolean primitive.
- Symbol for the Symbol Primitive.

```HTML
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello  Javascript</title>
</head>
<body>
<script type="text/javascript" src="hello_javascript.js"></script>
</body>
</html>
```

```javascript
/**
 * hello_javascript.js
 */
var i = 0;
for (i=0;  i <= 10; i++) {
    document.write("Hello javascript!");
    document.write("<br/>");
}

// 숫자 타입
var intNum = 10;
var floatNum = 0.1;

// 문자열  타입
var singleQuoteStr = 'single quote string';
var doubleQuoteStr = "double quote string";
var singleChar = 'a';

// 불린 타입
var boolVar = true;

// undefined 타입
var emptyVar;

// null 타입
var nullVar = null;

console.log(
    typeof intNum,
    typeof floatNum,
    typeof singleQuoteStr,
    typeof doubleQuoteStr,
    typeof boolVar,
    typeof nullVar,
    typeof emptyVar
);
```