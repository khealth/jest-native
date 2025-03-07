var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toHaveStyle = toHaveStyle;

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _extends3 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _jestMatcherUtils = require('jest-matcher-utils');

var _jestDiff = _interopRequireDefault(require('jest-diff'));

var _chalk = _interopRequireDefault(require('chalk'));

var _ramda = require('ramda');

var _utils = require('./utils');

function isSubset(expected, received) {
  return (0, _ramda.compose)(
    (0, _ramda.all)(function(_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        prop = _ref2[0],
        value = _ref2[1];

      return received[prop] === value;
    }),
    _ramda.toPairs,
  )(expected);
}

function mergeAllStyles(styles) {
  return (0, _ramda.compose)(_ramda.mergeAll, _ramda.flatten)(styles);
}

function printoutStyles(styles) {
  return Object.keys(styles)
    .sort()
    .map(function(prop) {
      return prop + ': ' + styles[prop] + ';';
    })
    .join('\n');
}

function expectedDiff(expected, elementStyles) {
  var received = Object.keys(elementStyles)
    .filter(function(prop) {
      return expected[prop];
    })
    .reduce(function(obj, prop) {
      return (0,
      _extends3.default)(obj, (0, _defineProperty2.default)({}, prop, elementStyles[prop]));
    }, {});
  var diffOutput = (0, _jestDiff.default)(printoutStyles(expected), printoutStyles(received));
  return diffOutput.replace(_chalk.default.red('+ Received') + '\n', '');
}

function toHaveStyle(element, style) {
  var _element$props$style,
    _this = this;

  (0, _utils.checkReactElement)(element, toHaveStyle, this);
  var elementStyle =
    (_element$props$style = element.props.style) != null ? _element$props$style : {};
  var expected = Array.isArray(style) ? mergeAllStyles(style) : style;
  var received = Array.isArray(elementStyle) ? mergeAllStyles(elementStyle) : elementStyle;
  return {
    pass: isSubset(expected, received),
    message: function message() {
      var matcher = (_this.isNot ? '.not' : '') + '.toHaveStyle';
      return [
        (0, _jestMatcherUtils.matcherHint)(matcher, 'element', ''),
        expectedDiff(expected, received),
      ].join('\n\n');
    },
  };
}
