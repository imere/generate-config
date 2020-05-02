const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function cssLoader() {
  const { chain, env } = config;

  depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader');

  const rule = chain.module.
    rule('css').
    test(/\.css$/u);

  rule.when(
    env === 'production',
    (ru) => {
      ru.use('css-extract').
        loader(MiniCSSExtractWebpackPlugin.loader).
        end();
    },
    (ru) => {
      ru.use('style').
        loader('style-loader').
        end();
    }
  );

  rule.use('css').
    loader('css-loader').
    options({
      importLoaders: 1
    }).
    end();

  rule.use('postcss').
    loader('postcss-loader').
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = cssLoader;

