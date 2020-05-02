const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function scssLoader() {
  const { chain, env } = config;

  depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader');

  const rule = chain.module.
    rule('scss').
    test(/(?<!.module)\.scss$/u);

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
      importLoaders: 2
    }).
    end();

  rule.use('postcss').
    loader('postcss-loader').
    end();

  rule.use('sass').
    loader('sass-loader').
    options({
      implementation: require('sass')
    }).
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = scssLoader;
