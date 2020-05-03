const { config } = require('../util/config');
const { depend } = require('../util/depend');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

async function scssModuleLoader() {
  const { chain, env } = config;

  await depend.
    addModule('mini-css-extract-plugin').
    addImplicit('style-loader').
    addImplicit('css-loader').
    addImplicit('postcss-loader').
    addImplicit('sass-loader').
    addImplicit('sass').
    download();

  const rule = chain.module.
    rule('scss-module').
    test(/\.module\.scss$/u);

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
    });

  rule.use('postcss-loader').
    loader('postcss-loader');

  rule.use('sass-loader').
    loader('sass-loader').
    options({
      implementation: require('sass')
    });
}

module.exports = scssModuleLoader;
