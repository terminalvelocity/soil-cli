module.exports = function(cli) {
  cli.banner();
  cli.ui('You must either create a commands.js file in your modules lib directory or specify an alternative path via the options hash');
};
