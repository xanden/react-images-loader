"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

(function() {
  var enterModule = require("react-hot-loader").enterModule;
  enterModule && enterModule(module);
})();

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var ImageLoader = /*#__PURE__*/function(_Component) {
  _inherits(ImageLoader, _Component);

  function ImageLoader() {
    var _getPrototypeOf2, _this2 = this;
    var _this;
    _classCallCheck(this, ImageLoader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isLoading: true,
      isError: false,
      src: null,
      width: null,
      height: null,
      errMsg: null
    });
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isCancelled", false);
    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "reload", function(props) {
      var _this3 = this;
      _newArrowCheck(this, _this2);// initialize
      _this.setState({ isLoading: true, isError: false, src: null, errMsg: null });
      var image = new Image;
      image.src = props.src;
      image.onload = function() {
        _newArrowCheck(this, _this3);
        !_this.isCancelled && _this.setState({
          src: image.src,
          width: image.width,
          height: image.height,
          isLoading: false,
          isError: false,
          errMsg: null
        });
        if (props.onLoad) {
          props.onLoad(image);
        }
      }.bind(this);
      image.onerror = function(err) {
        _newArrowCheck(this, _this3);
        _this.setState({
          src: null,
          width: null,
          height: null,
          isLoading: false,
          isError: true,
          errMsg: err
        });
        if (props.onError) {
          props.onError(err);
        }
      }.bind(this);
    }.bind(this));
    return _this;
  }

  _createClass(ImageLoader, [{
    key: "componentDidMount", value: function componentDidMount() {
      this.reload(this.props);
    }
  }, {
    key: "componentWillUnmount", value: function componentWillUnmount() {
      this.isCancelled = true;
    }
  }, {
    key: "render", value: function render() {
      var _this$props = this.props, loading = _this$props.loading, error = _this$props.error,
        image = _this$props.image, style = _this$props.style, className = _this$props.className,
        alt = _this$props.alt;
      var _this$state = this.state, src = _this$state.src, width = _this$state.width,
        height = _this$state.height, isLoading = _this$state.isLoading,
        isError = _this$state.isError, errMsg = _this$state.errMsg;
      if (loading && isLoading) {
        return loading();
      }
      if (error && isError && errMsg) {
        return error(errMsg);
      }
      if (src && image) {
        return image({ src: src, width: width, height: height });
      }
      if (src) {
        return _react.default.createElement("img", {
          src: src,
          style: style,
          className: className,
          width: width,
          height: height,
          alt: alt
        });
      }
      return null;
    }
  }, {
    key: "__reactstandin__regenerateByEval",// @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {// @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getDerivedStateFromProps", value: function getDerivedStateFromProps(props, state) {
      if (props.src !== state.src) {
        return props;
      }
      return null;
    }
  }]);
  return ImageLoader;
}(_react.Component);
_defineProperty(ImageLoader, "propTypes", {
  loading: _propTypes.default.func,
  error: _propTypes.default.func,
  image: _propTypes.default.func,
  style: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  src: _propTypes.default.string,
  alt: _propTypes.default.string,
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
});
var _default = ImageLoader;
var _default2 = _default;
exports.default = _default2;
;(function() {
  var reactHotLoader = require("react-hot-loader").default;
  var leaveModule = require("react-hot-loader").leaveModule;
  if (!reactHotLoader) {
    return;
  }
  reactHotLoader.register(ImageLoader, "ImageLoader", "/Users/vladimirdashko/react-image-loader/source/index.js");
  reactHotLoader.register(_default, "default", "/Users/vladimirdashko/react-image-loader/source/index.js");
  leaveModule(module);
})();
;
