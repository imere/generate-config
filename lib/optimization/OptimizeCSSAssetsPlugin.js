const {pushImportModule} = require('../util/helper');

const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function optimizeCSSPlugin(config, env) {
  const isProd = env === 'production';

  config.optimization.minimizer('optimize-css-assets').
    use(OptimizeCSSAssetsWebpackPlugin, [
      {
        assetNameRegExp: /\.css$/ug,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: isProd
              }
            }
          ]
        },
        canPrint: !isProd
      }
    ]);

  pushImportModule('optimize-css-assets-webpack-plugin');
}

module.exports = optimizeCSSPlugin;
