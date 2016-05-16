'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cmd) {
        var cwd = arguments.length <= 1 || arguments[1] === undefined ? this.cwd : arguments[1];
        var options;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = { cwd: cwd, encoding: 'utf8' };
                _context.next = 3;
                return (0, _exec3.default)(cmd, options);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function exec(_x2, _x3) {
        return ref.apply(this, arguments);
      }

      return exec;
    }()
  }, {
    key: 'batch',
    value: function batch() {
      for (var _len = arguments.length, cmds = Array(_len), _key = 0; _key < _len; _key++) {
        cmds[_key] = arguments[_key];
      }

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