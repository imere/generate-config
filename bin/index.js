const Config = require('webpack-chain');

const {checkValidArgs} = require('./checkValid');
const {writeFile} = require('./writeFile');

const {CLI, CMD} = require('../lib/util/constant');
const {logger} = require('../lib/util/helper');

// TODO: replace this package with another
const args = {...require('yargs-parser')(process.argv.slice(2))};

checkValidArgs(args);

let currentEnv = args[CMD.mode]
  ? [
    'production',
    'development'
  ].includes(args[CMD.mode])
    ? args[CMD.mode]
    : 'development'
  : 'none';

const config = new Config();

const cliList = [...Object.keys(CLI)];
const cmdList = [...Object.keys(CMD)];

// eslint-disable-next-line no-lone-blocks
{
  // If no args given
  if (Object.keys(args).length === 1) {
    currentEnv = 'production';
    args[CLI['enable-preview']] === true;

    for (const cmd of cliList.concat(cmdList)) {
      if (CMD.mode === cmd) {
        args[CMD.mode] = 'production';
      } else if (CLI.help === cmd) {
        // Noop
      } else {
        args[cmd] = true;
      }
    }

  }
}

if (args[CLI.help]) {
  logger.info(
    'Options:',
    cliList.concat(cmdList).
      sort((a, b) => a.localeCompare(b)).
      map((str) => `--${str}`).
      join(' ')
  );
} else {
  require('../lib/index')(
    config,
    currentEnv,
    args
  );

  if (args[CLI['enable-preview']]) {
    writeFile(config, currentEnv, args);
  }
}
