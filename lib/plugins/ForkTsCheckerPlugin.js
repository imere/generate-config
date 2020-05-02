const config = require('../util/config');
const { pushImportModule } = require('../util/helper');

const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

function bundleAnalyzerPlugin() {
  config.chain.plugin('fork-ts-checker').
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
