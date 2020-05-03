const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function miniCSSExtractPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  await depend.
    addModule('mini-css-extract-plugin').
    download();

  chain.plugin('mini-css-extract-plugin').
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
