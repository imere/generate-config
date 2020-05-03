const { config } = require('../util/config');
const { depend } = require('../util/depend');

const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

function optimizeCSSPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule('optimize-css-assets-webpack-plugin');

  chain.optimization.minimizer('optimize-css-assets').
    use(OptimizeCSSAssetsWebpackPlugin, [
      {
        assetNameRegExp: /\.css$/u,
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
}

module.exports = optimizeCSSPlugin;
