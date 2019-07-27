# Object types

- object
  - array
  - function
  - regex

## Standard built-in objects (global objects) by category

The term "global objects" (or standard built-in objects) here is not to be confused with the global object. Here, global objects refer to objects in the global scope (but only if ECMAScript 5 strict mode is not used; in that case it returns undefined). The global object itself can be accessed using the this operator in the global scope. In fact, the global scope consists of the properties of the global object, including inherited properties, if any.


### Value properties

- Infinity
- NaN
- undefined
- null literal

### Function properties

- eval()
- uneval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
- decodeURI()
- decodeURIComponent()
- encodeURI()
- encodeURIComponent()
- escape()
- unescape()

### Fundamental objects

- Object
- Function
- Boolean
- Symbol
- Error
- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

### Numbers and dates

- Number
- Math
- Date

### Text processing

- String
- RegExp

### Indexed collections

- Array
- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array

### Keyed collections

- Map
- Set
- WeakMap
- WeakSet

### Vector collections

- SIMD
- SIMD.(Float32x4 ~ Bool64x2)

### Structured data

- ArrayBuffer
- SharedArrayBuffer
- Atomics
- DataView
- JSON

### Control abstraction objects

- Promise
- Generator
- GeneratorFunction
- AsyncFunction

### Reflection

- Reflect
- Proxy

### Internationalization

- Intl
- Intl.Collator
- Intl.DateTimeFormat
- Intl.NumberFormat

### Non-standard objects

- Iterator
- ParallelArray
- StopIteration

### Other

- arguments
