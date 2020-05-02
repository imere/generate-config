const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');
const { Logger } = require('../util/logger');
const { CMD } = require('../util/constant');

const { BundleAnalyzer } = require('webpack-bundle-analyzer');

function bundleAnalyzerPlugin() {
  const { chain, args } = config;

  depend.addModule('webpack-bundle-analyzer');

  if (args[CMD['enable-preview']] && args[CMD.analyze]) {
    Logger.warn('If error occurs, try to disable preview or disable webpack-bundle-analyzer');
  }

  chain.plugin('bundle-analyzer').
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
