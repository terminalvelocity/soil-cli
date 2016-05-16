const { assign } = Object;
import { exit } from 'process';
import Promise from 'bluebird';
import fs from '../utils/fs';
import exec from '../utils/exec';
import rmrf from '../utils/rmrf';
import commands from './commands';
import banner from '../helpers/banner';
import { green, red } from 'colors/safe';

class CLI {
  ui = console.log;
  root = process.env.PWD;
  environment = process.env.NODE_ENV || 'development';

  constructor(props = {}) {
    this.setProps(props);
    return this;
  }

  get dir() {
    return __dirname;
  }

  get cwd() {
    return process.cwd();
  }

  async exec(cmd, cwd = this.cwd) {
    const options = { cwd: cwd, encoding: 'utf8' };
    await exec(cmd, options);
  }

  batch(...cmds) {
    return Promise.all(cmds);
  }

  writeFile(path, data, options = 'utf8') {
    return fs.writeFileAsync(path, data, options);
  }

  mkdir(path, options = {}) {
    return fs.mkdirAsync(path, options);
  }

  rmrf(path) {
    return rmrf(path);
  }

  noop() {
    return function() {};
  }

  debug(message, obj = {}) {
    if (this.debugFlag) {
      return console.log(`${green('Seeds')}: ${message}\n${obj}`);
    }
    return this.noop();
  }

  error(message, code = 1) {
    console.log(`${red('Error')}: ${message}`);
    this.exit(code);
  }

  exit(code) {
    return exit(code);
  }

  banner() {
    return this.ui(banner);
  }

  cmd() {
    if (this.args && this.args.length) {
      if (commands[this.args[0]]) {
        return commands[this.args[0]](this);
      }
    }
    return commands.help(this);
  }

  setProps(props = {}) {
    assign(this, props);
    return props;
  }

  static create(props) {
    return new this(props);
  }
}

export default CLI;
