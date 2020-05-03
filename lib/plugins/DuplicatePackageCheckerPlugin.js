const { config } = require('../util/config');
const { depend } = require('../util/depend');

function duplicatePackageCheckerPlugin() {
  depend.addModule({
    value: 'duplicate-package-checker-webpack-plugin',
    alias: 'DuplicatePackageCheckerPlugin'
  });

  config.chain.plugin('duplicate-package-checker').
    use(require('duplicate-package-checker-webpack-plugin'));
}

module.exports = duplicatePackageCheckerPlugin;
