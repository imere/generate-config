const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function ForkTsCheckerPlugin() {
  await depend.
    addModule('fork-ts-checker-webpack-plugin').
    download();

  config.chain.plugin('fork-ts-checker-webpack-plugin').
    use(require('fork-ts-checker-webpack-plugin'), [
      {
        checkSyntacticErrors: true,
        memoryLimit: 512,
        workers: 1,
        silent: false
      }
    ]);

}

module.exports = ForkTsCheckerPlugin;
