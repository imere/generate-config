const {pushImportModule} = require('../util/helper');

const Copy = require('copy-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function copyPlugin(config) {
  config.plugin('copy').
    use(Copy, [
      [
        {
          from: './src/public/robots.txt',
          to: '.'
        },
        {
          from: './src/public/*.png',
          to: '.',
          flatten: true
        }
      ]
    ]);

  pushImportModule({
    value: 'copy-webpack-plugin',
    alias: 'CopyPlugin'
  });
}

module.exports = copyPlugin;
