const {pushImportModule} = require('../util/helper');

const Html = require('html-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function htmlPlugin(config, env) {
  const isProd = env === 'production';

  config.plugin('html').
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
