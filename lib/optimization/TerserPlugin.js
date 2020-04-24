const TerserWebpackPlugin = require('terser-webpack-plugin');
const {pushImportModule} = require('../util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function TerserPlugin(config, env) {
  const isProd = env === 'production';

  config.optimization.minimizer('terser').
    use(TerserWebpackPlugin, [
      {
        terserOptions: {
          output: {
            comments: !isProd
          }
        },
        extractComments: !isProd
      }
    ]);

  pushImportModule({
    value: 'terser-webpack-plugin',
    alias: 'TerserPlugin'
  });
}

module.exports = TerserPlugin;
