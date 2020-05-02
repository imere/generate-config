const config = require('../lib/util/config');

const Config = require('webpack-chain');

const { checkValidArgs } = require('./checkValidArgs');

const { CMD } = require('../lib/util/constant');

function init() {
  // TODO: replace this package with another
  const args = { ...require('yargs-parser')(process.argv.slice(2)) };

  const currentEnv = args[CMD.mode]
    ? [
      'production',
      'development'
    ].includes(args[CMD.mode])
      ? args[CMD.mode]
      : 'development'
    : 'none';

  const chain = new Config();

  config.setUp(chain, currentEnv, args);

  checkValidArgs(args);
}

exports.init = init;
