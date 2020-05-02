const config = require('../lib/util/config');

const { init } = require('./init');
const { preset } = require('./preset');
const { writeFile } = require('./writeFile');

const { CLI, CMD } = require('../lib/util/constant');
const { logger } = require('../lib/util/logger');

init();

preset();

const cliList = [...Object.keys(CLI)];
const cmdList = [...Object.keys(CMD)];

if (config.args[CLI.help]) {
  logger.info(
    'Options:',
    cliList.concat(cmdList).
      sort((a, b) => a.localeCompare(b)).
      map((str) => `--${str}`).
      join(' ')
  );
} else {
  require('../lib/index')();

  if (config.args[CLI['enable-preview']]) {
    writeFile();
  }
}
