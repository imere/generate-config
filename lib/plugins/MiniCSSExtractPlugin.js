const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

function miniCSSExtractPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule('mini-css-extract-plugin');

  chain.plugin('css-extract').
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
