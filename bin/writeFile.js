const Config = require('webpack-chain');
const eol = require('eol');

const {flushImportModuleString, logger} = require('../lib/util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
exports.writeFile = function writeFile(config) {
  const configString = eol.auto([
    flushImportModuleString(),
    `module.exports = ${Config.toString(config.toConfig())}`
  ].join('\n'));

  const writePath = require('path').
    join(process.cwd(), 'webpack.config.preview.only.js');

  logger.info(`Create at ${writePath}`);
  logger.warn('This file is only for preview');

  require('fs').
    writeFileSync(
      writePath,
      configString,
      {encoding: 'utf-8'}
    );
};
