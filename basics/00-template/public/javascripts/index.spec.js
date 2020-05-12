"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('adds 1 + 2 to equal 3', function () {
  expect((0, _index["default"])(1, 2)).toBe(3);
});