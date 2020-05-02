const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function lessLoader() {
  const { chain, env } = config;

  depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('cache-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('less-loader');

  const rule = chain.module.
    rule('less').
    test(/\.less$/u);

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

  rule.use('cache').
    loader('cache-loader').
    end();

  rule.use('css').
    loader('css-loader').
    options({
      importLoaders: 2
    }).
    end();

  rule.use('postcss').
    loader('postcss-loader').
    end();

  rule.use('less').
    loader('less-loader').
    options({
      javascriptEnabled: true,
      strictMath: false,
      noIeCompat: false
    }).
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = lessLoader;
