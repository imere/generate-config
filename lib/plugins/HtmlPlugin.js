const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const Html = require('html-webpack-plugin');

function htmlPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule('html-webpack-plugin');

  chain.plugin('html').
    use(Html, [
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

  pushImportModule('html-webpack-plugin');
}

module.exports = htmlPlugin;
