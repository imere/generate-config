const { config } = require('../util/config');
const { depend } = require('../util/depend');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

function scssModuleLoader() {
  const { chain, env } = config;

  depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader').
    addImplicit('sass');

  const rule = chain.module.
    rule('scss-module').
    test(/\.module\.scss$/u);

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
      importLoaders: 2,
      modules: {
        mode: 'local',
        localIdentName:
          env === 'production'
            ? '[hash:base64:5]'
            : '[path][name]__[local]',
        context: require('path').
          join(process.cwd(), 'src')
      }
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
}

module.exports = scssModuleLoader;
