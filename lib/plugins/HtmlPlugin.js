const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function htmlPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  await depend.
    addModule('html-webpack-plugin').
    download();

  chain.plugin('html-webpack-plugin').
    use(require('html-webpack-plugin'), [
      {
        filename: 'index.html',
        template: './src/public/index.html',
        inject: true,
        favicon: './src/public/favicon.ico',
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
          removeAttributeQuotes: isProd
        },
        chunksSortMode: 'dependency'
      }
    ]);
}

module.exports = htmlPlugin;
