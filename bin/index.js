const { ifArg } = require('../lib/util/config');

const { init } = require('./init');
const { preset } = require('./preset');
const { writeFile } = require('./writeFile');

const { CLI, CMD } = require('../lib/util/constant');
const { Logger } = require('../lib/util/logger');

init();

preset();

const cliList = [...Object.keys(CLI)];
const cmdList = [...Object.keys(CMD)];

ifArg(CLI.help, () => {
  Logger.info(
    'Options:',
    cliList.concat(cmdList).
      sort((a, b) => a.localeCompare(b)).
      map((str) => `--${str}`).
      join(' ')
  );
}, async () => {
  await require('../lib/index')();

  ifArg(CLI['enable-preview'], () => {
    writeFile();
  });
});
