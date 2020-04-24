const {pushImportModule} = require('../util/helper');

const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function scssModuleLoader(config, env) {
  const rule = config.module.
    rule('scss-module').
    test(/\.module\.scss$/u);

  rule.when(
    env === 'production',
    (ru) => {
      ru.use('cssextract').
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
      'implementation': require('sass')
    }).
    end();

  pushImportModule('mini-css-extract-plugin');
}

module.exports = scssModuleLoader;