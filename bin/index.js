const config = require('../lib/util/config');

const { init } = require('./init');
const { writeFile } = require('./writeFile');

const { CLI, CMD } = require('../lib/util/constant');
const { logger } = require('../lib/util/helper');

init();

const cliList = [...Object.keys(CLI)];
const cmdList = [...Object.keys(CMD)];

// eslint-disable-next-line no-lone-blocks
{
  // If no args given
  if (Object.keys(config.args).length === 1) {
    config.env = 'production';
    config.args[CLI['enable-preview']] === true;

    for (const cmd of cliList.concat(cmdList)) {
      if (CMD.mode === cmd) {
        config.args[CMD.mode] = 'production';
      } else if (CLI.help === cmd) {
        // Noop
      } else {
        config.args[cmd] = true;
      }
    }

  }
}

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
