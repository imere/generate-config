const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function duplicatePackageCheckerPlugin() {
  await depend.
    addModule({
      value: 'duplicate-package-checker-webpack-plugin',
      alias: 'DuplicatePackageCheckerPlugin'
    }).
    download();

  config.chain.plugin('duplicate-package-checker-webpack-plugin').
    use(require('duplicate-package-checker-webpack-plugin'));
}

module.exports = duplicatePackageCheckerPlugin;
