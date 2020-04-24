const {pushImportModule} = require('../util/helper');

const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function bundleAnalyzerPlugin(config) {
  config.plugin('fork-ts-checker').
    use(ForkTsChecker, [
      {
        checkSyntacticErrors: true,
        memoryLimit: 512,
        workers: 1,
        silent: false
      }
    ]);

  pushImportModule('fork-ts-checker-webpack-plugin');
}

module.exports = bundleAnalyzerPlugin;
