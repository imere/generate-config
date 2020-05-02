const config = require('../util/config');
const { pushImportModule } = require('../util/helper');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function sassLoader() {
  const { chain, env } = config;

  const rule = chain.module.
    rule('sass').
    test(/\.sass$/u);

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
      implementation: require('sass'),
      indentedSyntax: true
    }).
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = sassLoader;
