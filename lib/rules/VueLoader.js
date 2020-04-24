const {pushImportModule} = require('../util/helper');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function vueLoader(config, env) {
  const isProd = env === 'production';

  const rule = config.module.
    rule('vue').
    test(/\.vue$/u);

  rule.use('vue').
    loader('vue-loader').
    options({
      loaders: [
        {
          loader: 'vue-style-loader',
          options: {
            sourceMap: !isProd
          }
        },
        {
          loader: MiniCSSExtractWebpackPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: !isProd
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !isProd
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: !isProd
          }
        }
      ],
      transformToRequire: {
        video: [
          'src',
          'poster'
        ],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    }).
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = vueLoader;
