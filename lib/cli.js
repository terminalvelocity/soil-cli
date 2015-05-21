"use strict"

var spawn    = require('child-process-promise').spawn;
var exec     = require('child-process-promise').exec;
var banner   = require('./helpers/banner');
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
    this.included_basepath = path.join(__dirname, '..', '..', '..');
    this.ui = console.log;
    this.options = options || {}
    this.debug_flag = this.options.debug || false;
    this.commands_dir = this.options.commands || path.join(this.included_basepath, 'lib', 'commands')

    if (fs.existsSync(`${this.commands_dir}.js`)) {
      this.commands = require(this.commands_dir);
    } else {
      this.commands = require(`${__dirname}/commands`);
    }
  }

  cp(source, target, options, cb) {
    this.debug('cp', source);
    return ncp(source, target, options, cb);
  }

  rm(target) {
    this.debug('rm', target);
    return fs.remove(target);
  }

  dir() {
    this.debug('dir', __dirname);
    return __dirname;
  }

  cwd() {
    this.debug('cwd', process.cwd());
    return process.cwd();
  }

  basepath() {
    var basepath = path.join(this.dir(), '..');
    this.debug('basepath', basepath);
    return basepath;
  }

  command() {
    if (this.args === undefined || this.args.length === 0) {
      this.args = ['help'];
    }
    this.debug('commands', this.args);
    return this.commands[this.args[0]](this);
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

  exit(code) {
    this.debug('exit', code);
    return exit(code);
  }

  banner() {
    this.debug('banner', banner);
    return console.log(banner);
  }

  error(message) {
    var key = chalk.red('Error:');
    return console.log(`${key}: ${message}`);
  }

  debug(message, obj) {
    var obj = obj || undefined;
    var self = "CLI";
    if (this.debug_flag === true) {
      return console.log(self, message, obj);
    }
  }
}

module.exports = CLI;
