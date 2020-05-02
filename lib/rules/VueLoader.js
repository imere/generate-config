const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function vueLoader() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.
    addModule('mini-css-extract-plugin').
    addImplicit('vue-loader').
    addImplicit('vue-style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader');

  const rule = chain.module.
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
