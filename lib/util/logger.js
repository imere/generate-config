const chalk = require('chalk');

exports.Logger = {
  info(...args) {
    console.log(chalk.bgBlue.white('INFO: '), ...args);
  },
  warn(...args) {
    console.warn(chalk.bgYellow.black('WARN: '), ...args);
  },
  error(...args) {
    console.error(chalk.bgRed.black('ERROR: '), ...args);
  },
  debug(...args) {
    console.debug(chalk.bgCyan.black('DEBUG: '), ...args);
  }
};
