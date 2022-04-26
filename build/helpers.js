"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStaticKey = getStaticKey;
exports.getColorString = exports.checkEqual = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function getStaticKey(item) {
  return JSON.stringify(item).toString(36).replace(/[^A-Za-z0-9]/g, '');
}

var checkEqual = function checkEqual(a, b) {
  return (a === null || a === void 0 ? void 0 : a.value) === (b === null || b === void 0 ? void 0 : b.value) && (a === null || a === void 0 ? void 0 : a.title) === (b === null || b === void 0 ? void 0 : b.title);
};

exports.checkEqual = checkEqual;

var getColorString = function getColorString(_ref) {
  var tinycolor = _ref.tinycolor,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? {} : _ref$color;

  if ((0, _typeof2["default"])(color) === 'object') {
    return tinycolor.toRgbString();
  }

  return color;
};

exports.getColorString = getColorString;
//# sourceMappingURL=helpers.js.map