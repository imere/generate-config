const { config } = require('../util/config');
const { depend } = require('../util/depend');
const { Logger } = require('../util/logger');
const { CMD, CLI } = require('../util/constant');

async function bundleAnalyzerPlugin() {
  const { chain, args } = config;

  await depend.
    addModule('webpack-bundle-analyzer').
    download();

  if (args[CLI['enable-preview']] && args[CMD.analyze]) {
    Logger.warn('If error occurs, try to disable preview or disable webpack-bundle-analyzer');
  }

  chain.plugin('webpack-bundle-analyzer').
    use(require('webpack-bundle-analyzer'), [
      {
        analyzerMode: 'static',
        reportFilename: 'docs/bundle-analyzer/report.html',
        openAnalyzer: false
      }
    ]);
}

module.exports = bundleAnalyzerPlugin;
