const { config } = require('../util/config');

const optimizeCSSAssetsPlugin = require('./OptimizeCSSAssetsPlugin');
const terserPlugin = require('./TerserPlugin');

async function configureOptimization() {
  const { chain, env } = config;

  const isProd = env === 'production';

  chain.optimization.
    noEmitOnErrors(true).
    removeEmptyChunks(true).
    removeAvailableModules(true).
    minimize(isProd).
    splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/u,
          name: 'vendor',
          reuseExistingChunk: true
        },
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0
        }
      }
    }).
    runtimeChunk({
      name: (entry) => `r~${entry.name}`
    });

  if (isProd) {
    await terserPlugin();
    await optimizeCSSAssetsPlugin();
  }
}

module.exports = {
  configureOptimization
};
