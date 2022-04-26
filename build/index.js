"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tinycolor = require("@ctrl/tinycolor");

var _ui = require("@sanity/ui");

var _lodash = require("lodash");

var _default2 = _interopRequireDefault(require("part:@sanity/components/formfields/default?"));

var _patchEvent = _interopRequireWildcard(require("part:@sanity/form-builder/patch-event?"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _components = require("./components");

var _helpers = require("./helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable complexity */
var handleChange = function handleChange(_ref) {
  var prevValue = _ref.prevValue,
      newValue = _ref.newValue,
      onChange = _ref.onChange;

  if ((0, _helpers.checkEqual)(newValue, prevValue)) {
    onChange(_patchEvent["default"].from((0, _patchEvent.unset)()));
  } else {
    onChange(_patchEvent["default"].from((0, _patchEvent.set)(newValue)));
  }
};

var AsyncFunction = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})).constructor;

var createColors = function createColors(_ref3) {
  var list = _ref3.list,
      type = _ref3.type,
      activeValue = _ref3.activeValue,
      name = _ref3.name,
      options = _ref3.options,
      _onChange = _ref3.onChange,
      onFocus = _ref3.onFocus,
      readOnly = _ref3.readOnly;

  var _ref4 = options || [],
      tooltip = _ref4.tooltip,
      borderradius = _ref4.borderradius,
      _ref4$background = _ref4.background,
      background = _ref4$background === void 0 ? '#FFFFFF' : _ref4$background,
      _ref4$contrastcutoff = _ref4.contrastcutoff,
      contrastcutoff = _ref4$contrastcutoff === void 0 ? 20 : _ref4$contrastcutoff,
      _ref4$lighten = _ref4.lighten,
      lighten = _ref4$lighten === void 0 ? 10 : _ref4$lighten,
      _ref4$darken = _ref4.darken,
      darken = _ref4$darken === void 0 ? 10 : _ref4$darken,
      _ref4$opacityThreshol = _ref4.opacityThreshold,
      opacityThreshold = _ref4$opacityThreshol === void 0 ? 0.2 : _ref4$opacityThreshol;

  var _ref5 = borderradius || {},
      _ref5$inner = _ref5.inner,
      inner = _ref5$inner === void 0 ? '100%' : _ref5$inner,
      _ref5$outer = _ref5.outer,
      outer = _ref5$outer === void 0 ? '100%' : _ref5$outer;

  var bg = new _tinycolor.TinyColor(background);
  var bgBrightness = (bg === null || bg === void 0 ? void 0 : bg.getBrightness()) || 255;
  var bgAccent = bg !== null && bg !== void 0 && bg.isLight() ? bg === null || bg === void 0 ? void 0 : bg.darken(darken) : bg === null || bg === void 0 ? void 0 : bg.lighten(lighten);
  var colorList = list;

  if (!colorList || !Array.isArray(colorList)) {
    // eslint-disable-next-line no-console
    console.warn('[color-list] No color values found, aborting.');
    return null;
  }

  return colorList === null || colorList === void 0 ? void 0 : colorList.map(function (color, i) {
    if (!color.value) {
      // eslint-disable-next-line no-console
      console.error('sanity-plugin-color-list could not find a color value. Please check your schema.');
      return null;
    }

    var currentColor = new _tinycolor.TinyColor(color.value);

    if (!currentColor.isValid) {
      // eslint-disable-next-line no-console
      console.error("sanity-plugin-color-list could not recognize the color: ".concat(color.value, ". Perhaps try another format."));
      return null;
    }

    var isLowContrast = Math.abs(bgBrightness - currentColor.getBrightness()) <= contrastcutoff;
    var isLowAlpha = currentColor.getAlpha() < opacityThreshold;
    var displayColor = (0, _helpers.getColorString)({
      tinycolor: currentColor,
      color: color.value
    });
    var isActive = (0, _helpers.checkEqual)(activeValue, color);
    var decoratorColor = currentColor.isLight() ? currentColor.darken(darken) : currentColor.lighten(lighten);
    decoratorColor = isLowAlpha ? bgAccent : decoratorColor;
    return /*#__PURE__*/_react["default"].createElement(_components.ConditionalWrapper, {
      key: (0, _helpers.getStaticKey)(displayColor + i),
      condition: tooltip,
      wrapper: function wrapper(children) {
        return /*#__PURE__*/_react["default"].createElement(_components.ToolTip, {
          title: color.title
        }, children);
      }
    }, /*#__PURE__*/_react["default"].createElement(_components.ListItem, {
      isActive: isActive,
      decoratorColor: isLowContrast || isLowAlpha ? decoratorColor : displayColor,
      radius: outer
    }, /*#__PURE__*/_react["default"].createElement(_components.Pattern, {
      isActive: isActive
    }), /*#__PURE__*/_react["default"].createElement(_components.Color, {
      type: "radio",
      role: "radio",
      name: name,
      "aria-label": color.title,
      "aria-checked": isActive,
      tabindex: isActive || !activeValue && i === 0 ? '0' : '-1',
      disabled: readOnly,
      checked: isActive,
      value: color,
      onChange: function onChange() {
        return handleChange({
          prevValue: activeValue,
          newValue: color,
          onChange: _onChange
        });
      },
      onClick: function onClick() {
        return handleChange({
          prevValue: activeValue,
          newValue: color,
          onChange: _onChange
        });
      },
      onKeyPress: function onKeyPress(event) {
        return event.key === 'Enter' && handleChange({
          prevValue: activeValue,
          newValue: color,
          onChange: _onChange
        });
      },
      onFocus: onFocus,
      isActive: isActive,
      radius: inner,
      hasOutline: isLowContrast || isLowAlpha,
      outlineColor: decoratorColor,
      fillColor: displayColor
    })));
  });
};

var ColorList = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _type$options;

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var onChange = props.onChange,
      level = props.level,
      value = props.value,
      type = props.type,
      readOnly = props.readOnly,
      markers = props.markers,
      onFocus = props.onFocus,
      presence = props.presence;
  var validation = markers.filter(function (marker) {
    return marker.type === 'validation';
  });
  var errors = validation.filter(function (marker) {
    return marker.level === 'error';
  });
  var groupName = (0, _lodash.uniqueId)('ColorList');
  var listOption = (type === null || type === void 0 ? void 0 : (_type$options = type.options) === null || _type$options === void 0 ? void 0 : _type$options.list) || [];
  (0, _react.useEffect)(function () {
    if (listOption) {
      if (listOption instanceof AsyncFunction === true) {
        listOption().then(function (v) {
          setList(v || listOption);
        })["catch"](function (error) {
          console.error("Could not get color list: ".concat(error));
        });
      } else if (listOption instanceof Function) {
        setList(listOption());
      }
    }
  }, [listOption]);
  return /*#__PURE__*/_react["default"].createElement(_default2["default"], {
    label: type.title,
    description: type.description,
    level: level,
    labelFor: groupName,
    markers: markers,
    presence: presence,
    onFocus: onFocus
  }, /*#__PURE__*/_react["default"].createElement(_ui.ThemeProvider, {
    theme: _ui.studioTheme
  }, /*#__PURE__*/_react["default"].createElement(_components.List, {
    ref: ref,
    role: "radiogroup",
    hasError: errors.length > 0
  }, createColors({
    type: type,
    activeValue: value,
    name: groupName,
    options: type.options,
    list: list || listOption,
    onChange: onChange,
    onFocus: onFocus,
    readOnly: readOnly
  }))));
});
ColorList.displayName = 'ColorList';
ColorList.propTypes = {
  type: _propTypes["default"].shape({
    title: _propTypes["default"].string,
    description: _propTypes["default"].string,
    options: _propTypes["default"].shape({
      background: _propTypes["default"].string,
      borderradius: _propTypes["default"].shape({
        outer: _propTypes["default"].string,
        inner: _propTypes["default"].string
      }),
      contrastcutoff: _propTypes["default"].number,
      lighten: _propTypes["default"].number,
      darken: _propTypes["default"].number,
      tooltip: _propTypes["default"].bool,
      list: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].shape({
        title: _propTypes["default"].string,
        value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired
      }))])
    }).isRequired
  }).isRequired,
  level: _propTypes["default"].number,
  value: _propTypes["default"].shape({
    value: _propTypes["default"].string,
    title: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func.isRequired,
  readOnly: _propTypes["default"].bool,
  onFocus: _propTypes["default"].func,
  markers: _propTypes["default"].array,
  presence: _propTypes["default"].array
};
ColorList.defaultProps = {
  level: undefined,
  value: undefined,
  onChange: undefined,
  readOnly: undefined,
  onFocus: undefined,
  onBlur: undefined,
  markers: undefined,
  presence: undefined
};
var _default = ColorList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map