Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.toBeDisabled = toBeDisabled;
exports.toBeEnabled = toBeEnabled;

var _ramda = require('ramda');

var _jestMatcherUtils = require('jest-matcher-utils');

var _utils = require('./utils');

var DISABLE_TYPES = [
  'Button',
  'Slider',
  'Switch',
  'Text',
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'TextInput',
];

function isElementDisabledByParent(parent) {
  return isElementDisabled(parent);
}

function isElementDisabled(element) {
  var propDisabled = (0, _ramda.path)(['props', 'disabled'], element);
  var hasStatesDisabled = (0, _ramda.compose)(
    (0, _ramda.includes)('disabled'),
    (0, _ramda.defaultTo)([]),
    (0, _ramda.path)(['props', 'accessibilityStates']),
  );
  var hasStateDisabled = (0, _ramda.compose)(
    (0, _ramda.propEq)('disabled', true),
    (0, _ramda.defaultTo)({}),
    (0, _ramda.path)(['props', 'accessibilityState']),
  );
  var stateDisabled = (0, _ramda.anyPass)([hasStatesDisabled, hasStateDisabled])(element);
  return (
    DISABLE_TYPES.includes((0, _utils.getType)(element)) && (Boolean(propDisabled) || stateDisabled)
  );
}

function isAncestorDisabled(element) {
  var parent = element.parent;
  return (
    Boolean(parent) && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent))
  );
}

function toBeDisabled(element) {
  var _this = this;

  (0, _utils.checkReactElement)(element, toBeDisabled, this);
  var isDisabled = isElementDisabled(element) || isAncestorDisabled(element);
  return {
    pass: isDisabled,
    message: function message() {
      var is = isDisabled ? 'is' : 'is not';
      return [
        (0, _jestMatcherUtils.matcherHint)(
          (_this.isNot ? '.not' : '') + '.toBeDisabled',
          'element',
          '',
        ),
        '',
        'Received element ' + is + ' disabled:',
        (0, _utils.printElement)(element),
      ].join('\n');
    },
  };
}

function toBeEnabled(element) {
  var _this2 = this;

  (0, _utils.checkReactElement)(element, toBeDisabled, this);
  var isEnabled = !isElementDisabled(element);
  return {
    pass: isEnabled,
    message: function message() {
      var is = isEnabled ? 'is' : 'is not';
      return [
        (0, _jestMatcherUtils.matcherHint)(
          (_this2.isNot ? '.not' : '') + '.toBeEnabled',
          'element',
          '',
        ),
        '',
        'Received element ' + is + ' enabled:',
        (0, _utils.printElement)(element),
      ].join('\n');
    },
  };
}
