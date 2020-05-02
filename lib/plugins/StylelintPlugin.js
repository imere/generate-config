const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

function stylelintPlugin() {
  depend.addModule('stylelint-webpack-plugin');

  config.chain.plugin('stylelint').
    use(StylelintWebpackPlugin, [
      {
        configFile: undefined,
        files: ['**/*.{vue,html,css,stylus,less,scss,sass}'],
        fix: false
      }
    ]);

  pushImportModule('stylelint-webpack-plugin');
}

module.exports = stylelintPlugin;
