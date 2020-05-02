const Config = require('webpack-chain');
const eol = require('eol');

const config = require('../lib/util/config');
const { flushImportModuleString, logger } = require('../lib/util/helper');

exports.writeFile = function writeFile() {
  const configString = eol.auto([
    flushImportModuleString(),
    `module.exports = ${Config.toString(config.chain.toConfig())}`
  ].join('\n'));

  const writePath = require('path').
    join(process.cwd(), 'webpack.config.preview.only.js');

  logger.info(`Create at ${writePath}`);
  logger.warn('This file is only for preview');

  require('fs').
    writeFile(
      writePath,
      configString,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          logger.error(err);
        }
      }
    );
};
