var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.checkReactElement = checkReactElement;
exports.getType = getType;
exports.getMessage = getMessage;
exports.matches = matches;
exports.normalize = normalize;
exports.printElement = printElement;
exports.VALID_ELEMENTS = exports.ReactElementTypeError = void 0;

var _construct2 = _interopRequireDefault(require('@babel/runtime/helpers/construct'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized'),
);

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn'),
);

var _getPrototypeOf2 = _interopRequireDefault(require('@babel/runtime/helpers/getPrototypeOf'));

var _wrapNativeSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/wrapNativeSuper'));

var _redent = _interopRequireDefault(require('redent'));

var _jestMatcherUtils = require('jest-matcher-utils');

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = (0, _getPrototypeOf2.default)(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
    return true;
  } catch (e) {
    return false;
  }
}

var _prettyFormat$plugins = _prettyFormat.default.plugins,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent,
  ReactElement = _prettyFormat$plugins.ReactElement;
var VALID_ELEMENTS = [
  'Image',
  'Text',
  'TextInput',
  'Modal',
  'View',
  'RefreshControl',
  'ScrollView',
  'ActivityIndicator',
  'ListView',
  'ListViewDataSource',
];
exports.VALID_ELEMENTS = VALID_ELEMENTS;

var ReactElementTypeError = (function(_Error) {
  (0, _inherits2.default)(ReactElementTypeError, _Error);

  var _super = _createSuper(ReactElementTypeError);

  function ReactElementTypeError(received, matcherFn, context) {
    var _this;

    (0, _classCallCheck2.default)(this, ReactElementTypeError);
    _this = _super.call(this);

    if (Error.captureStackTrace) {
      Error.captureStackTrace((0, _assertThisInitialized2.default)(_this), matcherFn);
    }

    var withType = '';

    try {
      withType = (0, _jestMatcherUtils.printWithType)(
        'Received',
        received,
        _jestMatcherUtils.printReceived,
      );
    } catch (e) {}

    _this.message = [
      (0, _jestMatcherUtils.matcherHint)(
        (context.isNot ? '.not' : '') + '.' + matcherFn.name,
        'received',
        '',
      ),
      '',
      (0, _jestMatcherUtils.RECEIVED_COLOR)('received') + ' value must be an React Element.',
      withType,
    ].join('\n');
    return _this;
  }

  return ReactElementTypeError;
})((0, _wrapNativeSuper2.default)(Error));

exports.ReactElementTypeError = ReactElementTypeError;

function checkReactElement(element) {
  if (!VALID_ELEMENTS.includes(element.type) && !element._fiber) {
    for (
      var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
      _key < _len;
      _key++
    ) {
      args[_key - 1] = arguments[_key];
    }

    throw (0, _construct2.default)(ReactElementTypeError, [element].concat(args));
  }
}

function getType(_ref) {
  var type = _ref.type;
  return type.displayName || type.name || type;
}

function printElement(_ref2) {
  var props = _ref2.props;
  return (
    '  ' +
    (0, _prettyFormat.default)(
      {
        props: props,
      },
      {
        plugins: [ReactTestComponent, ReactElement],
        printFunctionName: false,
        highlight: true,
      },
    )
  );
}

function display(value) {
  return typeof value === 'string' ? value : (0, _jestMatcherUtils.stringify)(value);
}

function getMessage(matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    matcher + '\n',
    expectedLabel +
      ':\n' +
      (0, _jestMatcherUtils.EXPECTED_COLOR)((0, _redent.default)(display(expectedValue), 2)),
    receivedLabel +
      ':\n' +
      (0, _jestMatcherUtils.RECEIVED_COLOR)((0, _redent.default)(display(receivedValue), 2)),
  ].join('\n');
}

function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}
