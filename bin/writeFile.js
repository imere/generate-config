const Config = require('webpack-chain');
const eol = require('eol');

const { config } = require('../lib/util/config');
const { depend } = require('../lib/util/depend');
const { Logger } = require('../lib/util/logger');

function writeFile() {
  const configString = eol.auto([
    depend.flushRequireString(),
    '',
    `module.exports = ${Config.toString(config.chain.toConfig())}`
  ].join('\n'));

  const filePath = require('path').
    join(process.cwd(), 'webpack.config.preview.only.js');

  Logger.info(`Create at ${filePath}`);
  Logger.warn('This file is only for preview');

  require('fs').
    writeFile(
      filePath,
      configString,
      { encoding: 'utf-8' },
      (err) => {
        if (err) {
          Logger.error(err);
        }
      }
    );
}

module.exports = {
  writeFile
};
