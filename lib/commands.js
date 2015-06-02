var helpCommand = require('./commands/help');

module.exports = function(cli) {
  cli.ui('args', cli.args);
};

module.exports.help = helpCommand;
