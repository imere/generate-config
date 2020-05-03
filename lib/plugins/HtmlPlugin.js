const { config } = require('../util/config');
const { depend } = require('../util/depend');

function htmlPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule('html-webpack-plugin');

  chain.plugin('html').
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
