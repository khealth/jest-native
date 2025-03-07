Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toHaveProp = toHaveProp;

var _ramda = require('ramda');

var _jestMatcherUtils = require('jest-matcher-utils');

var _utils = require('./utils');

function printAttribute(name, value) {
  return value === undefined ? name : name + '=' + (0, _jestMatcherUtils.stringify)(value);
}

function getPropComment(name, value) {
  return value === undefined
    ? 'element.hasProp(' + (0, _jestMatcherUtils.stringify)(name) + ')'
    : 'element.getAttribute(' +
        (0, _jestMatcherUtils.stringify)(name) +
        ') === ' +
        (0, _jestMatcherUtils.stringify)(value);
}

function toHaveProp(element, name, expectedValue) {
  var _element$type,
    _this = this;

  (0, _utils.checkReactElement)(element, toHaveProp, this);
  var prop = element.props[name];
  var isDefined = expectedValue !== undefined;
  var elementType =
    typeof element.type == 'string'
      ? element.type
      : (_element$type = element.type) == null
      ? void 0
      : _element$type.displayName;

  var isAllowed = _utils.VALID_ELEMENTS.includes(elementType);

  var hasProp = (0, _ramda.not)((0, _ramda.isNil)(prop));
  return {
    pass: isDefined && isAllowed ? hasProp && (0, _ramda.equals)(prop, expectedValue) : hasProp,
    message: function message() {
      var to = _this.isNot ? 'not to' : 'to';
      var receivedProp = hasProp ? printAttribute(name, prop) : null;
      var matcher = (0, _jestMatcherUtils.matcherHint)(
        (_this.isNot ? '.not' : '') + '.toHaveProp',
        'element',
        (0, _jestMatcherUtils.printExpected)(name),
        {
          secondArgument: isDefined
            ? (0, _jestMatcherUtils.printExpected)(expectedValue)
            : undefined,
          comment: getPropComment(name, expectedValue),
        },
      );
      return (0, _utils.getMessage)(
        matcher,
        'Expected the element ' + to + ' have prop',
        printAttribute(name, expectedValue),
        'Received',
        receivedProp,
      );
    },
  };
}
