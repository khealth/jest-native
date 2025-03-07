Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toHaveTextContent = toHaveTextContent;

var _jestMatcherUtils = require('jest-matcher-utils');

var _ramda = require('ramda');

var _utils = require('./utils');

function getText(child) {
  var currentValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var value = currentValue;

  if (!child) {
    return value;
  } else if (typeof child === 'object') {
    return getText((0, _ramda.path)(['props', 'children'], child), value);
  } else {
    return '' + value + child;
  }
}

function toHaveTextContent(element, checkWith) {
  var _this = this;

  (0, _utils.checkReactElement)(element, toHaveTextContent, this);
  var textContent = (0, _ramda.compose)(
    _utils.normalize,
    (0, _ramda.join)(''),
    (0, _ramda.map)(function(child) {
      return typeof child === 'object' ? getText(child) : child;
    }),
    function(child) {
      return (0, _ramda.is)(Array, child) ? child : [child];
    },
    (0, _ramda.defaultTo)([]),
    (0, _ramda.path)(['props', 'children']),
  )(element);
  return {
    pass: (0, _utils.matches)(textContent, checkWith),
    message: function message() {
      var to = _this.isNot ? 'not to' : 'to';
      return (0, _utils.getMessage)(
        (0, _jestMatcherUtils.matcherHint)(
          (_this.isNot ? '.not' : '') + '.toHaveTextContent',
          'element',
          '',
        ),
        'Expected element ' + to + ' have text content',
        checkWith,
        'Received',
        textContent,
      );
    },
  };
}
