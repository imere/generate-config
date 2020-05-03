const { config } = require('../util/config');
const { depend } = require('../util/depend');

function miniCSSExtractPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule('mini-css-extract-plugin');

  chain.plugin('css-extract').
    use(require('mini-css-extract-plugin'), [
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
}

module.exports = miniCSSExtractPlugin;
