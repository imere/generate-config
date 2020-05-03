const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function vueLoader() {
  const { chain, env } = config;

  const isProd = env === 'production';

  await depend.
    addModule('mini-css-extract-plugin').
    addImplicit('vue-loader').
    addImplicit('vue-style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader').
    download();

  const rule = chain.module.
    rule('vue').
    test(/\.vue$/u);

  const loaders = [
    {
      loader: 'vue-style-loader',
      options: {
        sourceMap: !isProd
      }
    },
    {
      loader: require('mini-css-extract-plugin').loader
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
  ];

  rule.use('vue').
    loader('vue-loader').
    options({
      loaders,
      transformToRequire: {
        video: [
          'src',
          'poster'
        ],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    });
}

module.exports = vueLoader;
