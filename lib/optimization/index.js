const optimizeCSSAssetsPlugin = require('./OptimizeCSSAssetsPlugin');
const terserPlugin = require('./TerserPlugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function configureOptimization(config, env, args) {
  const isProd = env === 'production';

  config.optimization.
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
    for (const fn of [
      terserPlugin,
      optimizeCSSAssetsPlugin
    ]) {
      fn(config, env, args);
    }

  }
}

module.exports = {
  configureOptimization
};
