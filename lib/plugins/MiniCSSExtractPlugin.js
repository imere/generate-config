const {pushImportModule} = require('../util/helper');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function miniCSSExtractPlugin(config, env) {
  const isProd = env === 'production';

  config.plugin('css-extract').
    use(MiniCSSExtractPlugin, [
      {
        'filename': isProd
          ? 'assets/styles/[name].[contenthash:5].css'
          : 'assets/styles/[name].css',
        'chunkFilename': isProd
          ? 'assets/styles/[name].[contenthash:5].css'
          : 'assets/styles/[name].css',
        'ignoreOrder': false
      }
    ]);

  pushImportModule('mini-css-extract-plugin');
}

module.exports = miniCSSExtractPlugin;
