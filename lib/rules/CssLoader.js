const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function cssLoader() {
  const { chain, env } = config;

  await depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    download();

  const rule = chain.module.
    rule('css').
    test(/\.css$/u);

  rule.when(
    env === 'production',
    (ru) => {
      ru.use('mini-css-extract-plugin-loader').
        loader(require('mini-css-extract-plugin').loader);
    },
    (ru) => {
      ru.use('style-loader').
        loader('style-loader');
    }
  );

  rule.use('css-loader').
    loader('css-loader').
    options({
      importLoaders: 1
    });

  rule.use('postcss-loader').
    loader('postcss-loader');
}

module.exports = cssLoader;

