const { config } = require('../util/config');
const { depend } = require('../util/depend');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

async function lessLoader() {
  const { chain, env } = config;

  await depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('cache-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('less-loader').
    download();

  const rule = chain.module.
    rule('less').
    test(/\.less$/u);

  rule.when(
    env === 'production',
    (ru) => {
      ru.use('mini-css-extract-plugin-loader').
        loader(MiniCSSExtractWebpackPlugin.loader);
    },
    (ru) => {
      ru.use('style-loader').
        loader('style-loader');
    }
  );

  rule.use('cache-loader').
    loader('cache-loader');

  rule.use('css-loader').
    loader('css-loader').
    options({
      importLoaders: 2
    });

  rule.use('postcss-loader').
    loader('postcss-loader');

  rule.use('less-loader').
    loader('less-loader').
    options({
      javascriptEnabled: true,
      strictMath: false,
      noIeCompat: false
    });
}

module.exports = lessLoader;
