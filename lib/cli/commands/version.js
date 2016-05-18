"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cli) {
    var pkg, ui, exit;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkg = cli.pkg;
            ui = cli.ui;
            exit = cli.exit;


            ui(pkg.version);
            exit();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function version(_x) {
    return ref.apply(this, arguments);
  }

  return version;
}();