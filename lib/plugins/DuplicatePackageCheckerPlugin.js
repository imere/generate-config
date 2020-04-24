const {pushImportModule} = require('../util/helper');

const DuplicatePackageChecker = require('duplicate-package-checker-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function duplicatePackageCheckerPlugin(config) {
  config.plugin('duplicate-package-checker').
    use(DuplicatePackageChecker);

  pushImportModule({
    value: 'duplicate-package-checker-webpack-plugin',
    alias: 'DuplicatePackageCheckerPlugin'
  });
}

module.exports = duplicatePackageCheckerPlugin;
