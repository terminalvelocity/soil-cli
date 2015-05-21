var helpCommand = require('./commands/help');

module.exports = function(args) {
  console.log('args', args);
}

module.exports.help = helpCommand;
