Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toContainElement = toContainElement;

var _ramda = require('ramda');

var _jestMatcherUtils = require('jest-matcher-utils');

var _utils = require('./utils');

function toContainElement(container, element) {
  var _this = this;

  (0, _utils.checkReactElement)(container, toContainElement, this);

  if (element !== null) {
    (0, _utils.checkReactElement)(element, toContainElement, this);
  }

  var matches = [];

  if (element) {
    matches = container.findAll(function(node) {
      var sameType = (0, _ramda.equals)(node.type, element.type);
      var sameProps = (0, _ramda.equals)(node.props, element.props);
      return sameType && sameProps;
    });
  }

  return {
    pass: Boolean(matches.length),
    message: function message() {
      return [
        (0, _jestMatcherUtils.matcherHint)(
          (_this.isNot ? '.not' : '') + '.toContainElement',
          'element',
          'element',
        ),
        '',
        (0, _jestMatcherUtils.RECEIVED_COLOR)(
          (0, _utils.printElement)(container) +
            ' ' +
            (_this.isNot ? '\n\ncontains:\n\n' : '\n\ndoes not contain:\n\n') +
            ' ' +
            (0, _utils.printElement)(element) +
            '\n        ',
        ),
      ].join('\n');
    },
  };
}
