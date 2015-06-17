'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _spawn = require('child-process-promise').spawn;
var _exec = require('child-process-promise').exec;
var mkdirp = require('mkdirp-then');
var chalk = require('chalk');
var _chdir = require('chdir');
var path = require('path');
var _exit = require('exit');
var fs = require('fs-extra-promise');
var ncp = require('./helpers/copy').ncp;

var CLI = (function () {
  function CLI(args, options) {
    _classCallCheck(this, CLI);

    this.args = args;
    this.ui = console.log;
    this.options = options || {};
    this.debugFlag = this.options.debug || false;
    this.commandsDir = this.options.commands || path.join(this.includedBasepath, 'lib', 'commands');
    this.colors = 'colors' in this.options ? this.options.colors : true;

    if (fs.existsSync('' + this.commandsDir + '.js')) {
      this.commands = require(this.commandsDir);
    } else {
      this.commands = require('' + __dirname + '/commands');
    }

    if (this.colors) {
      require('./helpers/colors');
    }
  }

  _createClass(CLI, [{
    key: 'cp',
    value: function cp(source, target, options, cb) {
      this.debug('cp', source);
      return ncp(source, target, options, cb);
    }
  }, {
    key: 'rm',
    value: function rm(target) {
      this.debug('rm', target);
      return fs.remove(target);
    }
  }, {
    key: 'copyTemplates',
    value: function copyTemplates(source, dest, cb) {
      this.debug('copyTemplates', source);
      return fs.copy(source, dest, cb);
    }
  }, {
    key: 'mkdir',
    value: function mkdir(newDir) {
      this.debug('mkdir', newDir);
      return mkdirp(newDir);
    }
  }, {
    key: 'chdir',
    value: function chdir(dir, cb) {
      this.debug('chdir', dir);
      return _chdir(dir, cb);
    }
  }, {
    key: 'exec',
    value: function exec(command) {
      this.debug('exec', command);
      return _exec(command);
    }
  }, {
    key: 'spawn',
    value: function spawn(command, args, options) {
      this.debug('spawn', command);
      return _spawn(command, args, options);
    }
  }, {
    key: 'command',
    value: function command() {
      if (!Array.isArray(this.args) || !this.args.length) {
        this.args = ['help'];
      }
      this.debug('commands', this.args);
      return this.commands[this.args[0]](this);
    }
  }, {
    key: 'exit',
    value: function exit(code) {
      this.debug('exit', code);
      return _exit(code);
    }
  }, {
    key: 'banner',
    value: function banner(bannerPath) {
      bannerPath = bannerPath || './helpers/banner';
      this.bannerPath = require(bannerPath);
      this.debug('banner', bannerPath);
      return this.ui(this.bannerPath);
    }
  }, {
    key: 'error',
    value: function error(message) {
      var key = chalk.red('Error:');
      return console.log('' + key + ': ' + message);
    }
  }, {
    key: 'debug',
    value: function debug(message, obj) {
      var logTag = 'CLI';
      if (this.debugFlag === true) {
        return console.log(logTag, message, obj);
      }
    }
  }, {
    key: 'includedBasepath',
    get: function () {
      return path.join(__dirname, '..', '..', '..');
    }
  }, {
    key: 'dir',
    get: function () {
      this.debug('dir', __dirname);
      return __dirname;
    }
  }, {
    key: 'cwd',
    get: function () {
      this.debug('cwd', process.cwd());
      return process.cwd();
    }
  }, {
    key: 'basepath',
    get: function () {
      var basepath = path.join(this.dir, '..');
      this.debug('basepath', basepath);
      return basepath;
    }
  }]);

  return CLI;
})();

module.exports = CLI;