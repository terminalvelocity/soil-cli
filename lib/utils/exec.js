'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var _bluebird = require('bluebird');

var execAsync = (0, _bluebird.promisify)(_child_process.exec);

exports.default = execAsync;