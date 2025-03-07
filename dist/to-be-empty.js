Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toBeEmpty = toBeEmpty;

var _jestMatcherUtils = require('jest-matcher-utils');

var _ramda = require('ramda');

var _utils = require('./utils');

function toBeEmpty(element) {
  var _this = this;

  (0, _utils.checkReactElement)(element, toBeEmpty, this);
  return {
    pass: (0, _ramda.compose)(
      _ramda.isEmpty,
      (0, _ramda.defaultTo)({}),
      (0, _ramda.path)(['props', 'children']),
    )(element),
    message: function message() {
      return [
        (0, _jestMatcherUtils.matcherHint)(
          (_this.isNot ? '.not' : '') + '.toBeEmpty',
          'element',
          '',
        ),
        '',
        'Received:',
        (0, _utils.printElement)(element),
      ].join('\n');
    },
  };
}
