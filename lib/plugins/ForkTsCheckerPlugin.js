const { config } = require('../util/config');
const { depend } = require('../util/depend');

function bundleAnalyzerPlugin() {
  depend.addModule('fork-ts-checker-webpack-plugin');

  config.chain.plugin('fork-ts-checker').
    use(require('fork-ts-checker-webpack-plugin'), [
      {
        checkSyntacticErrors: true,
        memoryLimit: 512,
        workers: 1,
        silent: false
      }
    ]);

}

module.exports = bundleAnalyzerPlugin;
