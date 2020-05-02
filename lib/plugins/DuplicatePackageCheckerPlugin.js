const config = require('../util/config');
const { pushImportModule } = require('../util/helper');

const DuplicatePackageChecker = require('duplicate-package-checker-webpack-plugin');

function duplicatePackageCheckerPlugin() {
  config.chain.plugin('duplicate-package-checker').
    use(DuplicatePackageChecker);

  pushImportModule({
    value: 'duplicate-package-checker-webpack-plugin',
    alias: 'DuplicatePackageCheckerPlugin'
  });
}

module.exports = duplicatePackageCheckerPlugin;
