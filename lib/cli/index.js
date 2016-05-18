'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _process = require('process');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('../utils/fs');

var _fs2 = _interopRequireDefault(_fs);

var _exec2 = require('../utils/exec');

var _exec3 = _interopRequireDefault(_exec2);

var _rmrf2 = require('../utils/rmrf');

var _rmrf3 = _interopRequireDefault(_rmrf2);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _banner2 = require('../helpers/banner');

var _banner3 = _interopRequireDefault(_banner2);

var _safe = require('colors/safe');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = _assign2.default;

var CLI = function () {
  function CLI() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CLI);
    this.ui = console.log;
    this.root = process.env.PWD;
    this.environment = process.env.NODE_ENV || 'development';

    this.setProps(props);
    return this;
  }

  (0, _createClass3.default)(CLI, [{
    key: 'exec',
    value: function exec(cmd) {
      var cwd = arguments.length <= 1 || arguments[1] === undefined ? this.root : arguments[1];

      var options = { cwd: cwd, encoding: 'utf8' };
      (0, _exec3.default)(cmd, options);
    }
  }, {
    key: 'batch',
    value: function batch(cmds) {
      return _bluebird2.default.all(cmds);
    }
  }, {
    key: 'writeFile',
    value: function writeFile(path, data) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? 'utf8' : arguments[2];

      return _fs2.default.writeFileAsync(path, data, options);
    }
  }, {
    key: 'mkdir',
    value: function mkdir(path) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return _fs2.default.mkdirAsync(path, options);
    }
  }, {
    key: 'rmrf',
    value: function rmrf(path) {
      return (0, _rmrf3.default)(path);
    }
  }, {
    key: 'noop',
    value: function noop() {
      return function () {};
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      var obj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (this.debugFlag) {
        return console.log((0, _safe.green)('Seeds') + ': ' + message + '\n' + obj);
      }
      return this.noop();
    }
  }, {
    key: 'error',
    value: function error(message) {
      var code = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      console.log((0, _safe.red)('Error') + ': ' + message);
      this.exit(code);
    }
  }, {
    key: 'exit',
    value: function exit(code) {
      return (0, _process.exit)(code);
    }
  }, {
    key: 'banner',
    value: function banner() {
      return this.ui(_banner3.default);
    }
  }, {
    key: 'cmd',
    value: function cmd() {
      if (this.args && this.args.length) {
        if (_commands2.default[this.args[0]]) {
          return _commands2.default[this.args[0]](this);
        }
      }
      return _commands2.default.help(this);
    }
  }, {
    key: 'spinner',
    value: function spinner(options) {
      return (0, _ora2.default)(options);
    }
  }, {
    key: 'setProps',
    value: function setProps() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      assign(this, props);
      return props;
    }
  }, {
    key: 'dir',
    get: function get() {
      return __dirname;
    }
  }, {
    key: 'cwd',
    get: function get() {
      return process.cwd();
    }
  }], [{
    key: 'create',
    value: function create(props) {
      return new this(props);
    }
  }]);
  return CLI;
}();

exports.default = CLI;