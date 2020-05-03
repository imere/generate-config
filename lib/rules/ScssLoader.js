const { config } = require('../util/config');
const { depend } = require('../util/depend');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

async function scssLoader() {
  const { chain, env } = config;

  await depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader').
    download();

  const rule = chain.module.
    rule('scss').
    test(/(?<!.module)\.scss$/u);

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

  rule.use('css-loader').
    loader('css-loader').
    options({
      importLoaders: 2
    });

  rule.use('postcss-loader').
    loader('postcss-loader');

  rule.use('sass-loader').
    loader('sass-loader').
    options({
      implementation: require('sass')
    });
}

module.exports = scssLoader;
