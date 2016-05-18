'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Soil', function () {
  var cli = new _lib2.default();

  it('should return a function', function () {
    (0, _chai.expect)(_lib2.default).to.be.a('function');
  });

  it('should run in test env', function () {
    (0, _chai.expect)(cli.environment).to.match(/test/i);
  });

  it('have a reference to the package.json', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var actualPkg, expectedPkg;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actualPkg = require('../package.json');
            expectedPkg = cli.pkg;

            (0, _chai.expect)(actualPkg).to.be.eql(expectedPkg);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));

  it('can mkdir and rmrf', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return cli.mkdir('./.example');

          case 2:
            _context2.next = 4;
            return (0, _chai.expect)('./.example').to.exist;

          case 4:
            _context2.next = 6;
            return cli.rmrf('./.example');

          case 6:
            (0, _chai.expect)('./.example').to.exist;

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));

  it('should respond to static create method', function () {
    console.log(_lib2.default.create());
    (0, _chai.expect)(_lib2.default).itself.to.respondTo('create');
  });

  it('should respond to instance methodds', function () {
    (0, _chai.expect)(cli).to.respondTo('exec');
    (0, _chai.expect)(cli).to.respondTo('batch');
    (0, _chai.expect)(cli).to.respondTo('writeFile');
    (0, _chai.expect)(cli).to.respondTo('mkdir');
    (0, _chai.expect)(cli).to.respondTo('rmrf');
    (0, _chai.expect)(cli).to.respondTo('debug');
    (0, _chai.expect)(cli).to.respondTo('exists');
    (0, _chai.expect)(cli).to.respondTo('error');
    (0, _chai.expect)(cli).to.respondTo('exit');
    (0, _chai.expect)(cli).to.respondTo('banner');
    (0, _chai.expect)(cli).to.respondTo('spinner');
  });
});
