"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTip = exports.ConditionalWrapper = exports.Color = exports.Pattern = exports.ListItem = exports.List = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _ui = require("@sanity/ui");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var List = _styledComponents["default"].ul.withConfig({
  displayName: "components__List",
  componentId: "sc-uq8dkl-0"
})(["padding:0;margin:0 15px 0 0;border-radius:2px;", ""], function (props) {
  if (props.hasError) {
    var _props$theme;

    var _ref = (props === null || props === void 0 ? void 0 : (_props$theme = props.theme) === null || _props$theme === void 0 ? void 0 : _props$theme.sanity) || {},
        color = _ref.color;

    return (0, _styledComponents.css)(["border-left:2px solid  ", ";padding-left:15px;"], color.solid.critical.enabled.border);
  }

  return '';
});

exports.List = List;

var ListItem = _styledComponents["default"].li.withConfig({
  displayName: "components__ListItem",
  componentId: "sc-uq8dkl-1"
})(["display:inline-block;margin-right:10px;border-radius:", ";box-sizing:border-box;position:relative;height:38px;width:38px;border-color:", ";&:hover > *{width:", ";height:", ";cursor:pointer;}", ""], function (props) {
  return props.radius;
}, function (props) {
  return props.decoratorColor;
}, function (props) {
  return props.isActive ? '26px' : '34px';
}, function (props) {
  return props.isActive ? '26px' : '34px';
}, function (props) {
  return props.isActive && (0, _styledComponents.css)(["border-width:2px;border-style:solid;"]);
});

exports.ListItem = ListItem;

var Pattern = _styledComponents["default"].div.withConfig({
  displayName: "components__Pattern",
  componentId: "sc-uq8dkl-2"
})(["border-radius:100%;height:36px;width:36px;display:block;margin:0;box-sizing:border-box;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-image:linear-gradient( 45deg,rgba(156,168,189,0.15) 25%,transparent 25% ),linear-gradient(-45deg,rgba(156,168,189,0.15) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,rgba(156,168,189,0.15) 75%),linear-gradient(-45deg,transparent 75%,rgba(156,168,189,0.15) 75%);background-size:20px 20px;background-position:0 0,0 10px,10px -10px,-10px 0;background-position-x:0px,0px,10px,-10px;background-position-y:0px,10px,-10px,0px;", ""], function (props) {
  return props.isActive && (0, _styledComponents.css)(["width:28px;height:28px;"]);
});

exports.Pattern = Pattern;

var Color = _styledComponents["default"].input.withConfig({
  displayName: "components__Color",
  componentId: "sc-uq8dkl-3"
})(["border-radius:", ";appearance:none;height:36px;width:36px;display:block;margin:0;box-sizing:border-box;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:", ";&:focus{outline:none;&:before{content:'';position:absolute;height:34px;width:34px;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:", ";", "}}", " ", ""], function (props) {
  return props.radius;
}, function (props) {
  return props.fillColor;
}, function (props) {
  return props.radius;
}, function (props) {
  var _props$theme2;

  var _ref2 = (props === null || props === void 0 ? void 0 : (_props$theme2 = props.theme) === null || _props$theme2 === void 0 ? void 0 : _props$theme2.sanity) || {},
      color = _ref2.color;

  return (0, _styledComponents.css)(["box-shadow:0px 0px 0px 2px ", ";"], color.base.focusRing);
}, function (props) {
  return props.hasOutline && (0, _styledComponents.css)(["box-shadow:inset 0px 0px 0px 1px ", ";"], props.outlineColor);
}, function (props) {
  return props.isActive && (0, _styledComponents.css)(["width:28px;height:28px;"]);
});

exports.Color = Color;

var ConditionalWrapper = function ConditionalWrapper(_ref3) {
  var condition = _ref3.condition,
      wrapper = _ref3.wrapper,
      children = _ref3.children;

  if (condition) {
    return wrapper(children);
  }

  return children;
};

exports.ConditionalWrapper = ConditionalWrapper;

var ToolTip = function ToolTip(props) {
  return /*#__PURE__*/_react["default"].createElement(_ui.Tooltip, (0, _extends2["default"])({
    content: /*#__PURE__*/_react["default"].createElement(_ui.Box, {
      padding: 2
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, {
      size: 1
    }, props.title)),
    placement: "top"
  }, props));
};

exports.ToolTip = ToolTip;
//# sourceMappingURL=index.js.map