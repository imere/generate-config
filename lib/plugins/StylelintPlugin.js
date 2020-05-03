const { config } = require('../util/config');
const { depend } = require('../util/depend');

function stylelintPlugin() {
  depend.addModule('stylelint-webpack-plugin');

  config.chain.plugin('stylelint').
    use(require('stylelint-webpack-plugin'), [
      {
        configFile: undefined,
        files: ['**/*.{vue,html,css,stylus,less,scss,sass}'],
        fix: false
      }
    ]);
}

module.exports = stylelintPlugin;
