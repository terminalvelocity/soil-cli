'use strict';

var spawn    = require('child-process-promise').spawn;
var exec     = require('child-process-promise').exec;
var mkdirp   = require('mkdirp-then');
var chalk    = require('chalk');
var chdir    = require('chdir');
var path     = require('path');
var exit     = require('exit');
var fs       = require('fs-extra-promise');
var ncp      = require('./helpers/copy').ncp;

class CLI {
  constructor(args, options) {
    this.args = args;
    this.ui = console.log;
    this.options = options || {};
    this.debugFlag = this.options.debug || false;
    this.commandsDir = this.options.commands || path.join(this.includedBasepath, 'lib', 'commands');
    this.colors = 'colors' in this.options ?  this.options.colors :  true;

    if (fs.existsSync(`${this.commandsDir}.js`)) {
      this.commands = require(this.commandsDir);
    } else {
      this.commands = require(`${__dirname}/commands`);
    }

    if (this.colors) {
      require('./helpers/colors');
    }
  }

  get includedBasepath() {
    return path.join(__dirname, '..', '..', '..');
  }

  get dir() {
    this.debug('dir', __dirname);
    return __dirname;
  }

  get cwd() {
    this.debug('cwd', process.cwd());
    return process.cwd();
  }

  get basepath() {
    var basepath = path.join(this.dir, '..');
    this.debug('basepath', basepath);
    return basepath;
  }

  cp(source, target, options, cb) {
    this.debug('cp', source);
    return ncp(source, target, options, cb);
  }

  rm(target) {
    this.debug('rm', target);
    return fs.remove(target);
  }

  copyTemplates(source, dest, cb) {
    this.debug('copyTemplates', source);
    return fs.copy(source, dest, cb);
  }

  mkdir(newDir) {
    this.debug('mkdir', newDir);
    return mkdirp(newDir);
  }

  chdir(dir, cb) {
    this.debug('chdir', dir);
    return chdir(dir, cb);
  }

  exec(command) {
    this.debug('exec', command);
    return exec(command);
  }

  spawn(command, args, options) {
    this.debug('spawn', command);
    return spawn(command, args, options);
  }

  command() {
    if (!Array.isArray(this.args) || !this.args.length) {
      this.args = ['help'];
    }
    this.debug('commands', this.args);
    return this.commands[this.args[0]](this);
  }

  exit(code) {
    this.debug('exit', code);
    return exit(code);
  }

  banner(bannerPath) {
    bannerPath = bannerPath || './helpers/banner';
    this.bannerPath = require(bannerPath);
    this.debug('banner', bannerPath);
    return this.ui(this.bannerPath);
  }

  error(message) {
    var key = chalk.red('Error:');
    return console.log(`${key}: ${message}`);
  }

  debug(message, obj) {
    var logTag = 'CLI';
    if (this.debugFlag === true) {
      return console.log(logTag, message, obj);
    }
  }
}

module.exports = CLI;
