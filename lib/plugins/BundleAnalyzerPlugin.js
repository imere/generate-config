const {pushImportModule, logger} = require('../util/helper');
const {CMD} = require('../util/constant');

const {BundleAnalyzer} = require('webpack-bundle-analyzer');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function bundleAnalyzerPlugin(config, _env, args) {
  if (args[CMD['enable-preview']] && args[CMD.analyze]) {
    logger.warn('If error occurs, try to disable preview or disable webpack-bundle-analyzer');
  }

  config.plugin('bundle-analyzer').
    use(BundleAnalyzer, [
      {
        analyzerMode: 'static',
        reportFilename: 'docs/bundle-analyzer/report.html',
        openAnalyzer: false
      }
    ]);

  pushImportModule('webpack-bundle-analyzer');
}

module.exports = bundleAnalyzerPlugin;
