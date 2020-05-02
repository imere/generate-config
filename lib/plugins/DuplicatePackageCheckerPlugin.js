const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const DuplicatePackageChecker = require('duplicate-package-checker-webpack-plugin');

function duplicatePackageCheckerPlugin() {
  depend.addModule({
    value: 'duplicate-package-checker-webpack-plugin',
    alias: 'DuplicatePackageCheckerPlugin'
  });

  config.chain.plugin('duplicate-package-checker').
    use(DuplicatePackageChecker);

  pushImportModule({
    value: 'duplicate-package-checker-webpack-plugin',
    alias: 'DuplicatePackageCheckerPlugin'
  });
}

module.exports = duplicatePackageCheckerPlugin;
